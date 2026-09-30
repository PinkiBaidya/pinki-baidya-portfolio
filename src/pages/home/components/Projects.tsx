import { useState } from "react";
import Reveal from "@/components/base/Reveal";
import SectionHeading from "@/components/base/SectionHeading";
import { useProjects } from "@/hooks/useProjects";
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

export default function Projects() {
  const { projects, loading, error } = useProjects();
  const [active, setActive] = useState("All");

  const categories = [
    "All",
    ...Array.from(
      new Set(projects.map((project) => project.category).filter((value): value is string => Boolean(value))),
    ),
  ];

  const visible: Project[] =
    active === "All" ? projects : projects.filter((project) => project.category === active);

  return (
    <section id="projects" className="section-anchor relative w-full py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Portfolio"
            first="Featured"
            second="Projects"
            description="Applications I've designed and built while studying — from full-stack web apps to desktop management systems."
          />
        </Reveal>

        {!loading && !error && categories.length > 1 ? (
          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200 md:text-sm ${
                    active === category
                      ? "bg-primary-500 text-background-50"
                      : "border border-background-300/60 bg-background-100/50 text-foreground-300 hover:bg-background-200/70 hover:text-foreground-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>
        ) : null}

        {loading ? (
          <div className="mt-12 flex items-center justify-center py-20 text-sm text-foreground-400">
            <i className="ri-loader-4-line mr-2 animate-spin text-lg" />
            Loading projects…
          </div>
        ) : error ? (
          <div className="mt-12 flex flex-col items-center justify-center gap-3 py-20 text-center">
            <i className="ri-error-warning-line text-3xl text-accent-400" />
            <p className="text-sm text-foreground-400">{error}</p>
          </div>
        ) : visible.length === 0 ? (
          <div className="mt-12 flex items-center justify-center py-20 text-sm text-foreground-500">
            No projects to show yet.
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {visible.map((project, index) => (
              <Reveal key={project.id} delay={index * 70}>
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
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}