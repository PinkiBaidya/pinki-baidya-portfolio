import Reveal from "@/components/base/Reveal";
import SectionHeading from "@/components/base/SectionHeading";
import { skillGroups } from "@/mocks/portfolio";
import SkillBar from "@/pages/home/components/SkillBar";

export default function Skills() {
  return (
    <section id="skills" className="section-anchor relative w-full bg-background-100/40 py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/3 top-0 h-64 w-64 rounded-full bg-accent-700/15 blur-3xl animate-float-orb-slow" />
      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Toolbox"
            first="Technical"
            second="Skills"
            description="The languages, frameworks and tools I use to design, build and ship software — from web front-ends to databases and the cloud."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 70}>
              <div className="group card-surface relative h-full overflow-hidden rounded-lg p-6 transition-colors duration-300 hover:border-primary-500/60">
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary-600/0 blur-2xl transition-all duration-500 group-hover:bg-primary-600/30" />
                <div className="relative flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500/30 to-accent-500/20 text-primary-200 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <i className={`${group.icon} text-xl`} />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground-50">
                    {group.title}
                  </h3>
                </div>
                <p className="relative mt-3 text-sm leading-relaxed text-foreground-400">
                  {group.description}
                </p>
                <div className="relative mt-5 space-y-3.5">
                  {group.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={index * 70 + skillIndex * 90}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}