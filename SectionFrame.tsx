type SectionFrameProps = {
  className?: string;
  children: React.ReactNode;
};

export function SectionFrame({ className, children }: SectionFrameProps) {
  const classes = `rounded-[56px] border border-white/10 bg-surface/60${
    className ? ` ${className}` : ""
  }`;

  return <div className={classes}>{children}</div>;
}
