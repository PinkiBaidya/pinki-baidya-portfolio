import type { Project } from "@/lib/projects";

function formatPeriod(start?: string | null, end?: string | null): string {
  const format = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    return date.toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
  };

  const startLabel = start ? format(start) : "";
  const endLabel = end ? format(end) : "";

  if (startLabel && endLabel) {
    return `${startLabel} — ${endLabel}`;
  }
  return startLabel || endLabel;
}

/**
 * Renders a project exactly like the public portfolio card, so the admin
 * "Preview" shows the true visitor-facing result.
 */
export default function ProjectPreviewCard({ project }: { project: Project }) {
  return (
    <article className="group card-surface h-full overflow-hidden rounded-lg transition-colors duration-300 hover:border-primary-500/60">
      <a
        href={project.github_url ?? project.live_url ?? undefined}
        {...(project.github_url || project.live_url
          ? { target: "_blank", rel: "noreferrer" }
          : {})}
        aria-label={`Open ${project.title} on GitHub`}
        className="block"
      >
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={project.image_url ?? project.image ?? ""}
            alt={project.title}
            title={`${project.title} project preview`}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-100 via-background-100/20 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-background-50/80 px-3 py-1 text-[11px] font-medium text-foreground-100 backdrop-blur">
            {project.category}
          </span>
        </div>
      </a>
      <div className="flex flex-col gap-3 p-5">
        <a
          href={project.github_url ?? project.live_url ?? undefined}
          {...(project.github_url || project.live_url
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
          className="flex flex-col gap-3"
        >
          <h3 className="font-heading text-lg font-semibold text-foreground-50">{project.title}</h3>
          <p className="text-xs text-foreground-500">
            <i className="ri-calendar-line mr-1.5 align-middle" />
            {formatPeriod(project.start_date, project.end_date)}
          </p>
          <p className="text-sm leading-relaxed text-foreground-400">{project.short_description}</p>
          <div className="flex flex-wrap gap-2">
            {(project.tech_stack ?? []).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-accent-500/10 px-2.5 py-1 text-[11px] font-medium text-accent-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </a>
        <div className="mt-1 flex items-center gap-4 border-t border-background-300/50 pt-4">
          {project.live_url ? (
            <a
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-300 transition-colors hover:text-primary-200"
            >
              <i className="ri-external-link-line" />
              Live Demo
            </a>
          ) : null}
          {project.github_url ? (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground-300 transition-colors hover:text-foreground-50"
            >
              <i className="ri-github-line" />
              Source
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}