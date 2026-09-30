import { useState } from "react";
import { navLinks, profile } from "@/mocks/portfolio";
import { useScrolled } from "@/hooks/useInView";

export default function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-background-200/60 bg-background-50/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 text-base font-bold text-background-50 transition-transform duration-300 group-hover:rotate-6">
            P
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-sm font-semibold tracking-wide text-foreground-50">
              {profile.name}
            </span>
            <span className="text-[11px] tracking-[0.18em] text-secondary-300">{profile.brand}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-medium text-foreground-300 transition-colors duration-200 hover:bg-background-200/70 hover:text-foreground-50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="hidden whitespace-nowrap rounded-md bg-primary-500 px-4 py-2.5 text-sm font-semibold text-background-50 transition-colors duration-200 hover:bg-primary-600 md:inline-flex"
          >
            Hire Me
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-background-300/60 text-foreground-100 transition-colors hover:bg-background-200/70 md:hidden"
          >
            <i className={`${open ? "ri-close-line" : "ri-menu-line"} text-xl`} />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-background-200/50 bg-background-50/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-3 text-sm font-medium text-foreground-300 transition-colors hover:bg-background-200/70 hover:text-foreground-50"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            onClick={() => setOpen(false)}
            className="mt-1 rounded-md bg-primary-500 px-4 py-3 text-center text-sm font-semibold text-background-50"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
}