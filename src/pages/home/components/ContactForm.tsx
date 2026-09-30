import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

type Status = "idle" | "submitting" | "success" | "error";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_PUBLIC_EMAILJS_PUBLIC_KEY;

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");

  const handleChange = (field: keyof typeof initialValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);

    // Anti-spam honeypot check (must be empty)
    const honeypot = String(formData.get("website_alt") || "").trim();
    if (honeypot) {
      setStatus("success");
      setFormError("");
      setValues(initialValues);
      formEl.reset();
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus("error");
      setFormError("The email service isn't configured yet. Please try again later.");
      return;
    }

    setStatus("submitting");
    setFormError("");

    const templateParams = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      setStatus("success");
      setValues(initialValues);
      formEl.reset();
    } catch (error) {
      setStatus("error");
      const detail =
        error && typeof error === "object" && "text" in error
          ? String((error as { text?: string }).text || "")
          : "";
      setFormError(
        detail || "Something went wrong sending your message. Please try again.",
      );
    }
  };

  const inputClass =
    "w-full rounded-md border border-background-300/60 bg-background-50/70 px-4 py-3 text-sm text-foreground-100 placeholder:text-foreground-500 outline-none transition-colors duration-200 focus:border-primary-500/70 focus:ring-2 focus:ring-primary-500/25";

  return (
    <form
      id="contact-message-form"
      onSubmit={handleSubmit}
      className="text-left"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-400">Name</span>
          <input
            type="text"
            name="name"
            required
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Your full name"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-400">Email</span>
          <input
            type="email"
            name="email"
            required
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-400">Subject</span>
        <input
          type="text"
          name="subject"
          value={values.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          placeholder="Internship, project, or just say hi"
          className={inputClass}
        />
      </label>

      <label className="mt-4 flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-400">Message</span>
        <textarea
          name="message"
          required
          maxLength={500}
          rows={5}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Tell me a little about what you have in mind..."
          className={`${inputClass} resize-none`}
        />
        <span className="self-end text-xs text-foreground-500">{values.message.length} / 500</span>
      </label>

      <div className="form-supplement" aria-hidden="true">
        <input
          type="text"
          name="website_alt"
          tabIndex={-1}
          autoComplete="off"
          readOnly
        />
      </div>

      {status === "error" && formError ? (
        <p className="mt-4 flex items-center gap-2 rounded-md border border-accent-500/40 bg-accent-500/10 px-4 py-3 text-sm text-accent-200">
          <i className="ri-error-warning-line text-base" />
          {formError}
        </p>
      ) : null}

      {status === "success" ? (
        <p className="mt-4 flex items-center gap-2 rounded-md border border-primary-500/40 bg-primary-500/10 px-4 py-3 text-sm text-primary-200">
          <i className="ri-check-line text-base" />
          Thanks! Your message is on its way — I&apos;ll get back to you soon.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-primary-500 px-7 py-3.5 text-sm font-semibold text-background-50 transition-colors duration-200 hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <i className="ri-loader-4-line animate-spin text-base" />
            Sending...
          </>
        ) : (
          <>
            <i className="ri-send-plane-fill text-base" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}