import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  createProject,
  updateProject,
  uploadProjectImage,
  PROJECT_STATUSES,
  PROJECT_TYPES,
  type Project,
  type ProjectFields,
  type ProjectStatus,
} from "@/lib/projects";

interface ProjectFormProps {
  initial: Project | null;
  onClose: () => void;
  onSaved: (message: string) => void;
}

const inputClass =
  "w-full rounded-md border border-background-300/60 bg-background-50/80 px-3 py-2 text-sm text-foreground-100 outline-none transition-colors focus:border-primary-400 placeholder:text-foreground-600";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-foreground-400";

const isHttp = (value: string) => /^https?:\/\//i.test(value);

export default function ProjectForm({ initial, onClose, onSaved }: ProjectFormProps) {
  const storedImage = initial?.image ?? null;
  const storedIsUrl = storedImage ? isHttp(storedImage) : false;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [projectType, setProjectType] = useState(initial?.project_type ?? PROJECT_TYPES[0]);
  const [startDate, setStartDate] = useState(initial?.start_date ?? "");
  const [endDate, setEndDate] = useState(initial?.end_date ?? "");
  const [shortDescription, setShortDescription] = useState(initial?.short_description ?? "");
  const [fullDescription, setFullDescription] = useState(initial?.full_description ?? "");
  const [techStack, setTechStack] = useState((initial?.tech_stack ?? []).join(", "));
  const [liveUrl, setLiveUrl] = useState(initial?.live_url ?? "");
  const [githubUrl, setGithubUrl] = useState(initial?.github_url ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [status, setStatus] = useState<ProjectStatus>(initial?.status ?? "draft");
  const [displayOrder, setDisplayOrder] = useState(
    initial ? String(initial.display_order ?? 0) : "",
  );

  // Image is either a typed URL, a freshly chosen file, or a previously stored path.
  const [imageUrl, setImageUrl] = useState(storedIsUrl ? storedImage ?? "" : "");
  const [existingPath, setExistingPath] = useState<string | null>(storedIsUrl ? null : storedImage);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initial?.image_url ?? (storedIsUrl ? storedImage : null),
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep the object URL tidy.
  useEffect(() => {
    if (!imageFile) return;
    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImageUrl("");
    setExistingPath(null);
  };

  const handleUrlChange = (value: string) => {
    setImageUrl(value);
    setImageFile(null);
    setExistingPath(null);
    setPreview(value.trim() ? value.trim() : null);
  };

  const removeImage = () => {
    setImageFile(null);
    setImageUrl("");
    setExistingPath(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resolveImageValue = async (): Promise<string | null> => {
    if (imageFile) return uploadProjectImage(imageFile);
    if (imageUrl.trim()) return imageUrl.trim();
    return existingPath;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("A project title is required.");
      return;
    }

    setBusy(true);
    try {
      const image = await resolveImageValue();
      const parsedOrder = displayOrder.trim() === "" ? Number.NaN : Number(displayOrder);

      const fields: ProjectFields = {
        title: title.trim(),
        project_type: projectType,
        short_description: shortDescription.trim() || null,
        full_description: fullDescription.trim() || null,
        image,
        tech_stack: techStack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        start_date: startDate || null,
        end_date: endDate || null,
        github_url: githubUrl.trim() || null,
        live_url: liveUrl.trim() || null,
        category: category.trim() || null,
        status,
        display_order: Number.isFinite(parsedOrder) ? parsedOrder : Number.NaN,
      };

      if (initial) {
        await updateProject(initial.id, {
          ...fields,
          display_order: Number.isFinite(parsedOrder) ? parsedOrder : initial.display_order,
        });
        onSaved("Project updated.");
      } else {
        await createProject(fields);
        onSaved(status === "draft" ? "Saved as draft." : "Project published.");
      }
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "We couldn't save this project. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background-950/70 p-4 backdrop-blur-sm">
      <div className="card-surface my-6 w-full max-w-3xl rounded-lg">
        <div className="flex items-center justify-between border-b border-background-300/50 px-5 py-4 md:px-6">
          <h2 className="font-heading text-lg font-semibold text-foreground-50">
            {initial ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-foreground-400 transition-colors hover:bg-background-200/60 hover:text-foreground-100"
            aria-label="Close"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 py-5 md:px-6">
          <div>
            <label className={labelClass} htmlFor="project-title">
              Project Title
            </label>
            <input
              id="project-title"
              className={inputClass}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. STUDENTPortal"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="project-type">
                Project Type
              </label>
              <select
                id="project-type"
                className={`${inputClass} cursor-pointer`}
                value={projectType}
                onChange={(event) => setProjectType(event.target.value)}
              >
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-background-100 text-foreground-100">
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="project-category">
                Project Category
              </label>
              <input
                id="project-category"
                className={inputClass}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="e.g. Full-Stack, Data, Mobile"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="project-start">
                Project Start Date
              </label>
              <input
                id="project-start"
                type="date"
                className={inputClass}
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="project-end">
                Project End Date
              </label>
              <input
                id="project-end"
                type="date"
                className={inputClass}
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="project-short">
              Short Description
            </label>
            <textarea
              id="project-short"
              className={`${inputClass} min-h-[72px] resize-y`}
              maxLength={500}
              value={shortDescription}
              onChange={(event) => setShortDescription(event.target.value)}
              placeholder="One or two sentences shown on the project card."
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="project-full">
              Full Description
            </label>
            <textarea
              id="project-full"
              className={`${inputClass} min-h-[110px] resize-y`}
              value={fullDescription}
              onChange={(event) => setFullDescription(event.target.value)}
              placeholder="The detailed description of the project."
            />
          </div>

          <div>
            <span className={labelClass}>Project Image</span>
            <div className="flex flex-col gap-3 rounded-md border border-background-300/60 bg-background-50/60 p-3 sm:flex-row sm:items-center">
              <div className="h-28 w-full shrink-0 overflow-hidden rounded-md bg-background-200 sm:h-20 sm:w-32">
                {preview ? (
                  <img src={preview} alt="Project preview" className="h-full w-full object-cover object-top" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-foreground-600">
                    <i className="ri-image-add-line text-2xl" />
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-background-300/60 px-3 py-2 text-xs font-medium text-foreground-200 transition-colors hover:bg-background-200/60"
                  >
                    <i className="ri-upload-2-line" />
                    Upload from computer
                  </button>
                  {preview || imageUrl || existingPath || imageFile ? (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-accent-500/40 px-3 py-2 text-xs font-medium text-accent-300 transition-colors hover:bg-accent-500/15"
                    >
                      <i className="ri-delete-bin-line" />
                      Remove
                    </button>
                  ) : null}
                  {imageFile ? (
                    <span className="truncate text-[11px] text-foreground-500">{imageFile.name}</span>
                  ) : null}
                </div>
                <input
                  className={inputClass}
                  value={imageUrl}
                  onChange={(event) => handleUrlChange(event.target.value)}
                  placeholder="…or paste an image URL (https://…)"
                />
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="project-tech">
              Technologies / Tags
            </label>
            <input
              id="project-tech"
              className={inputClass}
              value={techStack}
              onChange={(event) => setTechStack(event.target.value)}
              placeholder="Comma separated, e.g. ASP.NET, C#, SQLite"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="project-live">
                Live Demo URL
              </label>
              <input
                id="project-live"
                className={inputClass}
                value={liveUrl}
                onChange={(event) => setLiveUrl(event.target.value)}
                placeholder="https://…"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="project-github">
                GitHub / Source URL
              </label>
              <input
                id="project-github"
                className={inputClass}
                value={githubUrl}
                onChange={(event) => setGithubUrl(event.target.value)}
                placeholder="https://github.com/…"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="project-order">
                Display Order
              </label>
              <input
                id="project-order"
                type="number"
                min={0}
                className={inputClass}
                value={displayOrder}
                onChange={(event) => setDisplayOrder(event.target.value)}
                placeholder="Auto"
              />
              <p className="mt-1 text-[11px] text-foreground-500">
                Lower numbers appear first. Leave blank to add to the end.
              </p>
            </div>
            <div>
              <label className={labelClass} htmlFor="project-status">
                Status
              </label>
              <select
                id="project-status"
                className={`${inputClass} cursor-pointer`}
                value={status}
                onChange={(event) => setStatus(event.target.value as ProjectStatus)}
              >
                {PROJECT_STATUSES.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-background-100 text-foreground-100"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-foreground-500">
                Draft is hidden. Published and Featured appear on your portfolio.
              </p>
            </div>
          </div>

          {error ? (
            <p className="flex items-start gap-2 rounded-md bg-accent-500/10 px-3 py-2 text-xs text-accent-300">
              <i className="ri-error-warning-line mt-0.5" />
              <span>{error}</span>
            </p>
          ) : null}

          <div className="mt-1 flex flex-col-reverse gap-3 border-t border-background-300/50 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className="whitespace-nowrap rounded-md border border-background-300/60 px-4 py-2 text-sm font-medium text-foreground-200 transition-colors hover:bg-background-200/60 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary-500 px-5 py-2 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? (
                <>
                  <i className="ri-loader-4-line mr-2 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <i className="ri-save-line mr-2" />
                  Save Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}