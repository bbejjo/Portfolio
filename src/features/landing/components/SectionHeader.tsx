type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignment =
    align === "center"
      ? "text-center items-center"
      : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-display font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
