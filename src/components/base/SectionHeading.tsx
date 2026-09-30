interface SectionHeadingProps {
  eyebrow?: string;
  first: string;
  second: string;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  eyebrow,
  first,
  second,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} gap-4`}>
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-background-300/60 bg-background-100/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-secondary-300">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-heading text-3xl font-semibold leading-tight text-foreground-50 sm:text-4xl md:text-5xl">
        <span className="text-gradient">{first}</span> {second}
      </h2>
      {description ? (
        <p className={`max-w-2xl text-sm leading-relaxed text-foreground-400 md:text-base ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}