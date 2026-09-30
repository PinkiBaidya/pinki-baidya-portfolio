import Reveal from "@/components/base/Reveal";
import SectionHeading from "@/components/base/SectionHeading";
import { certifications } from "@/mocks/portfolio";

export default function Certifications() {
  return (
    <section id="certifications" className="section-anchor relative w-full py-20 md:py-28">
      <div className="pointer-events-none absolute right-1/4 top-10 h-72 w-72 rounded-full bg-primary-700/20 blur-3xl" />
      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Always Learning"
            first="Certifications"
            second="& Courses"
            description="Formal certifications and online courses I've completed to sharpen my development, database and design skills."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {certifications.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <div className="group card-surface flex h-full items-center gap-4 rounded-lg p-5 transition-colors duration-300 hover:border-accent-500/60">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-500/15 text-accent-300 transition-colors duration-300 group-hover:bg-accent-500/25">
                  <i className={`${item.icon} text-2xl`} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-semibold leading-snug text-foreground-50">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-secondary-300">{item.issuer}</p>
                </div>
                <i className="ri-verified-badge-line ml-auto hidden text-lg text-primary-400 sm:block" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}