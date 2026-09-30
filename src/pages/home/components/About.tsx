import Reveal from "@/components/base/Reveal";
import { profile, skills } from "@/mocks/portfolio";

export default function About() {
  return (
    <section id="about" className="section-anchor relative w-full bg-background-100/40 py-20 md:py-28">
      <div className="pointer-events-none absolute right-0 top-10 h-64 w-64 rounded-full bg-primary-700/20 blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-primary-600/20 to-accent-600/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-lg border border-background-300/60">
              <img
                src="https://storage.helloreaddy.io/project_files/a2ad8dd0-0de9-40d8-ae39-f18f80b939e5/1e666588-a56c-4708-a919-92ef86e37d64_compressed_ChatGPT-Image-Sep-30-2026-12_04_18-AM.webp"
                alt="Portrait of Pinki Baidya"
                title="Pinki Baidya Full-Stack Web Developer"
                className="h-[520px] w-full object-cover object-top md:h-[660px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-50 via-transparent to-transparent" />
            </div>
            <div className="card-surface absolute -bottom-6 left-6 right-6 flex items-center justify-between gap-4 rounded-lg px-5 py-4">
              <div>
                <p className="font-heading text-lg font-semibold text-foreground-50">4.2 / 5</p>
                <p className="text-xs text-foreground-400">CGPA · Óbuda University</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent-500/20 text-accent-400">
                <i className="ri-award-line text-2xl" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-background-300/60 bg-background-100/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-secondary-300">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              About Me
            </span>
            <h2 className="font-heading text-3xl font-semibold leading-tight text-foreground-50 md:text-4xl">
              Turning ideas into <span className="text-gradient">products people love</span>
            </h2>
            <p className="text-sm leading-relaxed text-foreground-300 md:text-base">{profile.bio}</p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="card-surface flex items-center gap-3 rounded-lg px-4 py-3">
                <i className="ri-mail-line text-lg text-primary-400" />
                <span className="truncate text-sm text-foreground-200">{profile.email}</span>
              </div>
              <div className="card-surface flex items-center gap-3 rounded-lg px-4 py-3">
                <i className="ri-phone-line text-lg text-secondary-300" />
                <span className="text-sm text-foreground-200">{profile.phone}</span>
              </div>
              <div className="card-surface flex items-center gap-3 rounded-lg px-4 py-3">
                <i className="ri-map-pin-line text-lg text-accent-400" />
                <span className="text-sm text-foreground-200">{profile.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-background-300/60 bg-secondary-500/10 px-3.5 py-1.5 text-xs font-medium text-secondary-200"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-600"
              >
                <i className="ri-send-plane-line" />
                Start a Project
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-background-300/70 px-5 py-3 text-sm font-semibold text-foreground-100 transition-colors hover:bg-background-200/70"
              >
                Browse Projects
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}