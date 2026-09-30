import { profile, skills, stats } from "@/mocks/portfolio";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden pt-24">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=abstract%20dark%20violet%20glowing%20gradient%20waves%20on%20a%20deep%20black%20background%2C%20smooth%20flowing%20light%20streaks%20and%20soft%20particles%2C%20minimal%20elegant%20digital%20art%2C%20moody%20atmospheric%20high%20detail&width=1920&height=1080&seq=portfolio-hero-abstract-01&orientation=landscape"
          alt="Abstract violet gradient background"
          title="Portfolio hero background"
          className="h-full w-full object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-50/70 via-background-50/85 to-background-50" />
        <div className="absolute inset-0 grid-lines opacity-40" />
      </div>

      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary-600/30 blur-3xl animate-float-orb" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-accent-600/20 blur-3xl animate-float-orb-slow" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 py-16 text-center md:px-8 md:py-24">
        <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-background-300/60 bg-background-100/70 px-4 py-2 text-xs font-medium tracking-wide text-foreground-200 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse-glow" />
          {profile.availability}
        </span>

        <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
          <p className="mb-4 font-heading text-sm font-medium uppercase tracking-[0.35em] text-secondary-300">
            Hi, I&apos;m {profile.name}
          </p>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground-50 sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            {profile.heroLine1}{" "}
            <span className="text-gradient">{profile.heroLine2}</span>
            <br />
            <span className="relative inline-block">
              <span className="text-primary-400">{profile.heroLine3}</span>
              <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
            </span>
          </h1>
        </div>

        <p
          className="animate-fade-up max-w-2xl text-sm leading-relaxed text-foreground-300 md:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          {profile.tagline} I&apos;m a Computer Science student at Óbuda University in{" "}
          {profile.location.split(",")[0]}, building projects that people actually enjoy using.
        </p>

        <div
          className="animate-fade-up flex flex-col items-center gap-3 sm:flex-row"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#projects"
            className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-6 py-3.5 text-sm font-semibold text-background-50 transition-colors duration-200 hover:bg-primary-600 sm:w-auto"
          >
            View My Work
            <i className="ri-arrow-right-line text-base" />
          </a>
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-background-300/70 bg-background-100/50 px-6 py-3.5 text-sm font-semibold text-foreground-100 transition-colors duration-200 hover:bg-background-200/70 sm:w-auto"
          >
            <i className="ri-mail-send-line text-base" />
            Let&apos;s Talk
          </a>
        </div>

        <div
          className="animate-fade-up grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4"
          style={{ animationDelay: "320ms" }}
        >
          {stats.map((item) => (
            <div
              key={item.label}
              className="card-surface rounded-lg px-4 py-5 text-center"
            >
              <div className="font-heading text-2xl font-bold text-foreground-50 md:text-3xl">
                {item.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-foreground-400 md:text-xs">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <a
          href="#about"
          className="mt-2 flex flex-col items-center gap-1 text-foreground-500 transition-colors hover:text-foreground-200"
        >
          <span className="text-xs uppercase tracking-[0.25em]">Scroll</span>
          <i className="ri-arrow-down-line animate-bob text-xl" />
        </a>
      </div>

      <div className="relative w-full overflow-hidden border-y border-background-200/60 bg-background-100/40 py-4">
        <div className="flex w-max animate-marquee items-center gap-10">
          {[...skills, ...skills].map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="flex items-center gap-3 whitespace-nowrap font-heading text-sm font-medium uppercase tracking-[0.2em] text-foreground-500"
            >
              {skill}
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}