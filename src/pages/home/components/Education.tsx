import Reveal from "@/components/base/Reveal";
import SectionHeading from "@/components/base/SectionHeading";
import { education } from "@/mocks/portfolio";

export default function Education() {
  return (
    <section id="education" className="section-anchor relative w-full bg-background-100/40 py-20 md:py-28">
      <div className="pointer-events-none absolute left-10 top-16 h-64 w-64 rounded-full bg-primary-700/20 blur-3xl" />
      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Academic Background"
            first="My"
            second="Education"
            description="A computer science degree built on a strong mathematical foundation — where theory meets practical software engineering."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {education.map((item, index) => (
            <Reveal key={item.degree} delay={index * 100}>
              <article className="card-surface flex h-full flex-col rounded-lg p-6 transition-colors duration-300 hover:border-primary-500/60 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500/30 to-accent-500/20 text-primary-200">
                    <i className="ri-graduation-cap-line text-2xl" />
                  </span>
                  <span className="rounded-full bg-accent-500/15 px-3 py-1 text-xs font-semibold text-accent-300">
                    {item.score}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-lg font-semibold leading-snug text-foreground-50 md:text-xl">
                  {item.degree}
                </h3>
                <p className="mt-2 text-sm font-medium text-primary-300">{item.school}</p>
                <p className="text-xs text-foreground-500">{item.faculty}</p>

                <p className="mt-3 text-sm leading-relaxed text-foreground-400">{item.detail}</p>

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-background-300/50 pt-4 text-xs text-foreground-400">
                  <span className="inline-flex items-center gap-1.5">
                    <i className="ri-calendar-line" />
                    {item.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <i className="ri-map-pin-line" />
                    {item.location}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}