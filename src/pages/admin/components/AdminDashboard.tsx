import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { supabase } from "@/lib/supabase";
import {
  deleteProject,
  fetchAllProjects,
  reorderProjects,
  setProjectStatus,
  type Project,
  type ProjectStatus,
} from "@/lib/projects";
import ProjectForm from "./ProjectForm";
import ProjectPreviewCard from "./ProjectPreviewCard";
import SortableProjectRow from "./SortableProjectRow";

interface Toast {
  message: string;
  tone: "success" | "error";
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [previewing, setPreviewing] = useState<Project | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [statusBusyId, setStatusBusyId] = useState<number | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const showToast = useCallback((message: string, tone: Toast["tone"] = "success") => {
    setToast({ message, tone });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllProjects();
      setProjects(data);
    } catch {
      setError("We couldn't load your projects. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const stats = useMemo(() => {
    const published = projects.filter((p) => p.status !== "draft").length;
    const drafts = projects.filter((p) => p.status === "draft").length;
    return { total: projects.length, published, drafts };
  }, [projects]);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setFormOpen(true);
  };

  const handleSaved = async (message: string) => {
    setFormOpen(false);
    setEditing(null);
    showToast(message);
    await load();
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((project) => project.id === active.id);
    const newIndex = projects.findIndex((project) => project.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const next = arrayMove(projects, oldIndex, newIndex);
    setProjects(next);

    try {
      await reorderProjects(next.map((project) => project.id));
      showToast("Order saved.");
    } catch {
      showToast("We couldn't save the new order.", "error");
      await load();
    }
  };

  const handleTogglePublish = async (project: Project) => {
    const nextStatus: ProjectStatus = project.status === "draft" ? "published" : "draft";
    setStatusBusyId(project.id);
    try {
      await setProjectStatus(project.id, nextStatus);
      setProjects((prev) =>
        prev.map((item) => (item.id === project.id ? { ...item, status: nextStatus } : item)),
      );
      showToast(nextStatus === "published" ? "Project published." : "Moved back to draft.");
    } catch {
      showToast("We couldn't update that project.", "error");
    } finally {
      setStatusBusyId(null);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteProject(pendingDelete.id);
      setPendingDelete(null);
      showToast("Project deleted.");
      await load();
    } catch {
      showToast("We couldn't delete that project.", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background-50">
      <header className="sticky top-0 z-30 border-b border-background-300/50 bg-background-50/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500/15 text-primary-300">
              <i className="ri-shield-keyhole-line text-lg" />
            </div>
            <div>
              <h1 className="font-heading text-base font-semibold leading-tight text-foreground-50 md:text-lg">
                Project Management
              </h1>
              <p className="hidden text-xs text-foreground-500 sm:block">Private dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-md border border-background-300/60 px-3 py-2 text-xs font-medium text-foreground-200 transition-colors hover:bg-background-200/60 sm:inline-flex"
            >
              <i className="ri-external-link-line" />
              View portfolio
            </Link>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-background-300/60 px-3 py-2 text-xs font-medium text-foreground-200 transition-colors hover:bg-background-200/60"
            >
              <i className="ri-logout-box-r-line" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground-50">Your Projects</h2>
            <p className="mt-1 text-sm text-foreground-400">
              {loading ? "Loading…" : "Add, edit, preview and publish your portfolio projects."}
            </p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-600"
          >
            <i className="ri-add-line text-base" />
            Add New Project
          </button>
        </div>

        {!loading && projects.length > 0 ? (
          <div className="mb-5 grid grid-cols-3 gap-3">
            <div className="card-surface rounded-lg px-4 py-3">
              <p className="text-xs text-foreground-500">Total</p>
              <p className="font-heading text-xl font-semibold text-foreground-50">{stats.total}</p>
            </div>
            <div className="card-surface rounded-lg px-4 py-3">
              <p className="text-xs text-foreground-500">Live</p>
              <p className="font-heading text-xl font-semibold text-primary-300">{stats.published}</p>
            </div>
            <div className="card-surface rounded-lg px-4 py-3">
              <p className="text-xs text-foreground-500">Drafts</p>
              <p className="font-heading text-xl font-semibold text-secondary-300">{stats.drafts}</p>
            </div>
          </div>
        ) : null}

        {!loading && projects.length > 1 ? (
          <p className="mb-3 flex items-center gap-2 text-xs text-foreground-500">
            <i className="ri-drag-move-2-line" />
            Drag the handle to reorder — this is exactly the order shown on your portfolio.
          </p>
        ) : null}

        {error ? (
          <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-accent-500/30 bg-accent-500/10 px-4 py-3">
            <p className="text-sm text-accent-200">{error}</p>
            <button
              type="button"
              onClick={() => void load()}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-accent-500/40 px-3 py-1.5 text-xs font-medium text-accent-200 transition-colors hover:bg-accent-500/20"
            >
              <i className="ri-refresh-line" />
              Retry
            </button>
          </div>
        ) : null}

        {loading ? (
          <div className="flex items-center justify-center py-20 text-sm text-foreground-400">
            <i className="ri-loader-4-line mr-2 animate-spin text-lg" />
            Loading your projects…
          </div>
        ) : projects.length === 0 ? (
          <div className="card-surface flex flex-col items-center justify-center gap-3 rounded-lg px-6 py-20 text-center">
            <i className="ri-folder-add-line text-3xl text-foreground-500" />
            <p className="text-sm text-foreground-400">No projects yet. Add your first one to get started.</p>
            <button
              type="button"
              onClick={openAdd}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-600"
            >
              <i className="ri-add-line" />
              Add New Project
            </button>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={projects.map((project) => project.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3">
                {projects.map((project) => (
                  <SortableProjectRow
                    key={project.id}
                    project={project}
                    onEdit={openEdit}
                    onDelete={setPendingDelete}
                    onPreview={setPreviewing}
                    onTogglePublish={handleTogglePublish}
                    statusBusy={statusBusyId === project.id}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </main>

      {formOpen ? (
        <ProjectForm initial={editing} onClose={() => setFormOpen(false)} onSaved={handleSaved} />
      ) : null}

      {previewing ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background-950/70 p-4 backdrop-blur-sm"
          onClick={() => setPreviewing(null)}
          role="presentation"
        >
          <div
            className="my-6 w-full max-w-md"
            onClick={(event) => event.stopPropagation()}
            role="presentation"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-heading text-base font-semibold text-foreground-50">
                Preview — how visitors see it
              </h2>
              <button
                type="button"
                onClick={() => setPreviewing(null)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-foreground-300 transition-colors hover:bg-background-200/60 hover:text-foreground-50"
                aria-label="Close preview"
              >
                <i className="ri-close-line text-lg" />
              </button>
            </div>
            <ProjectPreviewCard project={previewing} />
          </div>
        </div>
      ) : null}

      {pendingDelete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-950/70 p-4 backdrop-blur-sm">
          <div className="card-surface w-full max-w-sm rounded-lg p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent-500/15 text-accent-300">
              <i className="ri-delete-bin-line text-xl" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground-50">Delete project?</h3>
            <p className="mt-2 text-sm text-foreground-400">
              “{pendingDelete.title}” will be permanently removed from your portfolio. This can't be undone.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                disabled={deleting}
                className="whitespace-nowrap rounded-md border border-background-300/60 px-4 py-2 text-sm font-medium text-foreground-200 transition-colors hover:bg-background-200/60 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-background-50 transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <i className="ri-loader-4-line mr-2 animate-spin" />
                    Deleting…
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2">
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-none ${
              toast.tone === "error"
                ? "bg-accent-500 text-background-50"
                : "bg-primary-500 text-background-50"
            }`}
          >
            <i
              className={
                toast.tone === "error" ? "ri-error-warning-line" : "ri-checkbox-circle-line"
              }
            />
            {toast.message}
          </div>
        </div>
      ) : null}
    </div>
  );
}