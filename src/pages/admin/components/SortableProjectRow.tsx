import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import type { Project, ProjectStatus } from "@/lib/projects";

interface SortableProjectRowProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onPreview: (project: Project) => void;
  onTogglePublish: (project: Project) => void;
  statusBusy: boolean;
}

const statusStyles: Record<ProjectStatus, string> = {
  draft: "bg-secondary-500/15 text-secondary-200",
  published: "bg-primary-500/20 text-primary-200",
  featured: "bg-accent-500/20 text-accent-300",
};

const statusLabels: Record<ProjectStatus, string> = {
  draft: "Draft",
  published: "Published",
  featured: "Featured",
};

export default function SortableProjectRow({
  project,
  onEdit,
  onDelete,
  onPreview,
  onTogglePublish,
  statusBusy,
}: SortableProjectRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const imageSrc = project.image_url ?? project.image ?? "";
  const isDraft = project.status === "draft";

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`card-surface flex flex-col gap-4 rounded-lg p-4 sm:flex-row sm:items-center ${
        isDragging ? "relative z-20 opacity-90 ring-1 ring-primary-500/60" : ""
      }`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className="flex h-10 w-10 shrink-0 cursor-grab items-center justify-center self-start rounded-md border border-background-300/60 text-foreground-400 transition-colors hover:bg-background-200/60 hover:text-foreground-100 active:cursor-grabbing sm:self-center"
      >
        <i className="ri-drag-move-2-line text-base" />
      </button>

      <div className="h-24 w-full shrink-0 overflow-hidden rounded-md bg-background-200 sm:h-16 sm:w-28">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={project.title}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-foreground-600">
            <i className="ri-image-line text-xl" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-base font-semibold text-foreground-50">{project.title}</h3>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusStyles[project.status]}`}
          >
            {statusLabels[project.status]}
          </span>
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-foreground-500">
          {project.project_type ? <span>{project.project_type}</span> : null}
          {project.project_type && project.category ? <span aria-hidden>·</span> : null}
          {project.category ? <span>{project.category}</span> : null}
        </p>
        <p className="mt-1 line-clamp-2 text-xs text-foreground-400">{project.short_description}</p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onPreview(project)}
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-background-300/60 px-3 py-2 text-xs font-medium text-foreground-200 transition-colors hover:bg-background-200/60"
        >
          <i className="ri-eye-line" />
          Preview
        </button>
        <button
          type="button"
          onClick={() => onTogglePublish(project)}
          disabled={statusBusy}
          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
            isDraft
              ? "bg-primary-500 text-background-50 hover:bg-primary-600"
              : "border border-primary-500/40 text-primary-200 hover:bg-primary-500/15"
          }`}
        >
          {statusBusy ? (
            <i className="ri-loader-4-line animate-spin" />
          ) : isDraft ? (
            <i className="ri-send-plane-line" />
          ) : (
            <i className="ri-eye-off-line" />
          )}
          {isDraft ? "Publish" : "Unpublish"}
        </button>
        <button
          type="button"
          onClick={() => onEdit(project)}
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-background-300/60 px-3 py-2 text-xs font-medium text-foreground-200 transition-colors hover:bg-background-200/60"
        >
          <i className="ri-edit-line" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(project)}
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-accent-500/40 px-3 py-2 text-xs font-medium text-accent-300 transition-colors hover:bg-accent-500/15"
        >
          <i className="ri-delete-bin-line" />
          Delete
        </button>
      </div>
    </article>
  );
}