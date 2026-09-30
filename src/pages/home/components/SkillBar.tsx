import { useInView } from "@/hooks/useInView";

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export default function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -15% 0px");

  return (
    <div ref={ref}>
      <span className="block truncate text-xs font-medium text-foreground-200">{name}</span>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-background-300/50">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-[width] duration-1000 ease-out"
          style={{ width: inView ? `${level}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}