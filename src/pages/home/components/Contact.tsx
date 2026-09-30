import { useState } from "react";
import Reveal from "@/components/base/Reveal";
import ContactForm from "./ContactForm";
import { profile, socialLinks, talkLinks } from "@/mocks/portfolio";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(profile.email);
      } else {
        const field = document.createElement("textarea");
        field.value = profile.email;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        document.body.removeChild(field);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="section-anchor relative w-full overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-700/25 blur-3xl animate-float-orb" />
      <div className="relative mx-auto w-full max-w-4xl px-4 text-center md:px-8">
        <Reveal>
          <div className="card-surface relative overflow-hidden rounded-xl px-6 py-12 md:px-12 md:py-16">
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
            <div className="relative flex flex-col items-center gap-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-background-300/60 bg-background-200/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-secondary-300">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                Contact Me
              </span>
              <h2 className="font-heading text-3xl font-semibold leading-tight text-foreground-50 md:text-4xl">
                Tell me about your <span className="text-gradient">next project</span>.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-foreground-400 md:text-base">
                Looking for an intern or a junior developer, or have a project in mind? Drop me a line and I&apos;ll
                get back to you within a day.
              </p>

              <div className="mt-2 flex w-full flex-col items-center gap-3 sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="group inline-flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-primary-500 px-7 py-3.5 text-sm font-semibold text-background-50 transition-colors duration-200 hover:bg-primary-600 sm:w-auto"
                >
                  <i className={`${copied ? "ri-check-line" : "ri-file-copy-line"} text-base`} />
                  {copied ? "Email Copied!" : "Copy Email"}
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm font-medium text-foreground-300 underline-offset-4 transition-colors hover:text-primary-300 hover:underline"
                >
                  {profile.email}
                </a>
                <a
                  href={`tel:${profile.phoneRaw}`}
                  className="text-sm font-medium text-foreground-400 underline-offset-4 transition-colors hover:text-primary-300 hover:underline"
                >
                  {profile.phone}
                </a>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-background-300/60 bg-background-100/50 text-foreground-200 transition-colors duration-200 hover:border-primary-500/60 hover:bg-primary-500/15 hover:text-primary-200"
                  >
                    <i className={`${link.icon} text-xl`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="card-surface mt-6 overflow-hidden rounded-xl px-6 py-10 md:px-10 md:py-12">
            <div className="mb-8 flex flex-col items-center gap-3 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-background-300/60 bg-background-200/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-secondary-300">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                Send a Message
              </span>
              <h3 className="font-heading text-2xl font-semibold leading-tight text-foreground-50 md:text-3xl">
                Drop me a message
              </h3>
              <p className="max-w-lg text-sm leading-relaxed text-foreground-400">
                Prefer a form? Fill this in and it lands straight in my inbox.
              </p>
            </div>
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {talkLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface flex items-center justify-between gap-3 rounded-lg px-5 py-4 transition-colors hover:border-primary-500/60"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-500/15 text-accent-300">
                    <i className={`${link.icon} text-lg`} />
                  </span>
                  <span className="text-sm font-medium text-foreground-100">{link.label}</span>
                </span>
                <i className="ri-arrow-right-up-line text-foreground-400" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}