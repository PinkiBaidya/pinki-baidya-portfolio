import { supabase } from "@/lib/supabase";

/** Lifecycle status of a project in the admin dashboard. */
export type ProjectStatus = "draft" | "published" | "featured";

export const PROJECT_TYPES = ["Web Application", "Desktop Application"] as const;

export const PROJECT_STATUSES: { value: ProjectStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "featured", label: "Featured" },
];

/** Statuses that are allowed to appear on the public portfolio. */
const PUBLIC_STATUSES: ProjectStatus[] = ["published", "featured"];

export interface Project {
  id: number;
  title: string;
  project_type: string | null;
  short_description: string | null;
  full_description: string | null;
  image: string | null;
  /** Display-ready image URL (signed when the file lives in backend storage). */
  image_url?: string | null;
  tech_stack: string[] | null;
  start_date: string | null;
  end_date: string | null;
  github_url: string | null;
  live_url: string | null;
  category: string | null;
  status: ProjectStatus;
  featured: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

/** Editable fields of a project. */
export interface ProjectFields {
  title: string;
  project_type: string | null;
  short_description: string | null;
  full_description: string | null;
  image: string | null;
  tech_stack: string[];
  start_date: string | null;
  end_date: string | null;
  github_url: string | null;
  live_url: string | null;
  category: string | null;
  status: ProjectStatus;
  display_order: number;
}

const IMAGE_BUCKET = "public";

const isExternalUrl = (value: string) =>
  /^https?:\/\//i.test(value) || value.startsWith("data:") || value.startsWith("blob:");

/**
 * Resolve a stored image value into something an <img> can render.
 * External URLs pass straight through; backend-stored files get a signed URL.
 */
export async function resolveImageUrl(value: string | null): Promise<string | null> {
  if (!value) return null;
  if (isExternalUrl(value)) return value;

  const { data, error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .createSignedUrl(value, 60 * 60);

  if (error || !data) return null;
  return data.signedUrl;
}

/** Upload an image file to backend storage and return its storage path. */
export async function uploadProjectImage(file: File): Promise<string> {
  const rawExt = file.name.includes(".") ? file.name.split(".").pop() ?? "" : "";
  const ext = /^[a-z0-9]{1,8}$/i.test(rawExt) ? rawExt.toLowerCase() : "png";
  const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "image/png",
  });

  if (error) throw error;
  return path;
}

async function attachImageUrl(rows: Project[]): Promise<Project[]> {
  return Promise.all(
    rows.map(async (row) => ({ ...row, image_url: await resolveImageUrl(row.image) })),
  );
}

/**
 * Public project list — only published/featured rows, ordered by the manual
 * drag-and-drop order (display_order ascending, newest id as tie-breaker).
 */
export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .in("status", PUBLIC_STATUSES)
    .order("display_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) throw error;

  return attachImageUrl((data as Project[]) ?? []);
}

/** Admin project list — every row regardless of status. */
export async function fetchAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) throw error;

  return attachImageUrl((data as Project[]) ?? []);
}

async function getNextDisplayOrder(): Promise<number> {
  const { data } = await supabase
    .from("projects")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (data?.display_order ?? -1) + 1;
}

export async function createProject(fields: ProjectFields): Promise<void> {
  const { display_order: requestedOrder, ...rest } = fields;
  const display_order =
    Number.isFinite(requestedOrder) && requestedOrder >= 0
      ? requestedOrder
      : await getNextDisplayOrder();

  const { error } = await supabase
    .from("projects")
    .insert({ ...rest, featured: false, display_order });

  if (error) throw error;
}

export async function updateProject(id: number, fields: ProjectFields): Promise<void> {
  const { error } = await supabase
    .from("projects")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
}

export async function setProjectStatus(id: number, status: ProjectStatus): Promise<void> {
  const { error } = await supabase
    .from("projects")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteProject(id: number): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

/** Persist a new manual order after a drag-and-drop. */
export async function reorderProjects(orderedIds: number[]): Promise<void> {
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase
        .from("projects")
        .update({ display_order: index, updated_at: new Date().toISOString() })
        .eq("id", id)
        .then(({ error }) => {
          if (error) throw error;
        }),
    ),
  );
}