import Reveal from "@/components/base/Reveal";
import SectionHeading from "@/components/base/SectionHeading";
import { experiences } from "@/mocks/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section-anchor relative w-full py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Learning Path"
            first="Training"
            second="& Experience"
            description="Certifications, structured courses and hands-on practice that shaped how I design, build and debug software."
          />
        </Reveal>

        <div className="relative mt-14 md:mt-16">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-primary-500/70 via-background-300/60 to-transparent md:left-1/2 md:block" />

          <div className="flex flex-col gap-8">
            {experiences.map((item, index) => (
              <Reveal key={item.company} delay={index * 100}>
                <div
                  className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="md:w-1/2 md:px-8">
                    <div className="card-surface rounded-lg p-5 transition-colors duration-300 hover:border-primary-500/50 md:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-primary-500/15 px-3 py-1 text-xs font-medium text-primary-300">
                          {item.period}
                        </span>
                        <span className="text-xs text-foreground-500">{item.location}</span>
                      </div>
                      <h3 className="mt-4 font-heading text-lg font-semibold text-foreground-50 md:text-xl">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-accent-400">{item.company}</p>
                      <p className="mt-3 text-sm leading-relaxed text-foreground-400">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-background-300/60 bg-background-200/40 px-2.5 py-1 text-[11px] font-medium text-foreground-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="absolute left-4 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background-50 bg-primary-500 md:left-1/2 md:block" />
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}