import { navLinks, profile, socialLinks, talkLinks } from "@/mocks/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-background-200/60 bg-background-200/50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/60 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <a href="#home" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 text-base font-bold text-background-50">
                P
              </span>
              <span className="font-heading text-sm font-semibold tracking-wide text-foreground-50">
                {profile.name}
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-foreground-400">{profile.tagline}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground-100">
              <a href="#home">Navigate</a>
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground-400 transition-colors hover:text-primary-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground-100">
              <a href="#contact">Social Media</a>
            </h4>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground-400 transition-colors hover:text-primary-300"
                  >
                    {link.label}
                    <i className="ri-arrow-right-up-line text-xs" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground-100">
              <a href="#contact">Write Me &amp; We&apos;ll Talk</a>
            </h4>
            <ul className="flex flex-col gap-2">
              {talkLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground-400 transition-colors hover:text-accent-300"
                  >
                    {link.label}
                    <i className="ri-arrow-right-up-line text-xs" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-col gap-1 text-sm text-foreground-400">
              <span className="text-xs uppercase tracking-wider text-foreground-500">Email</span>
              <a
                href={`mailto:${profile.email}`}
                className="break-all transition-colors hover:text-primary-300"
              >
                {profile.email}
              </a>
              <span className="mt-2 text-xs uppercase tracking-wider text-foreground-500">Phone</span>
              <a href={`tel:${profile.phoneRaw}`} className="transition-colors hover:text-primary-300">
                {profile.phone}
              </a>
              <span className="mt-2 text-xs uppercase tracking-wider text-foreground-500">Location</span>
              <span>{profile.location}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-background-300/50 pt-6 sm:flex-row">
          <p className="text-xs text-foreground-500">
            All Rights Reserved By {profile.name} &copy; {year}
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-xs font-medium text-foreground-400 transition-colors hover:text-primary-300"
          >
            Back to top
            <i className="ri-arrow-up-line" />
          </a>
        </div>
      </div>
    </footer>
  );
}