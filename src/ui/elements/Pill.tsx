import clsx from "clsx";

type PillProps = {
  tone?: "green" | "orange" | "gray";
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
};

const base = `
  inline-flex items-center justify-center text-center
  h-4 leading-4 px-2 rounded-cs-sm
  text-[12px] font-normal tracking-[0.4px] uppercase
  font-clarity
`;

const fullWidthBase = `
  flex items-center justify-center text-center w-full
  h-4 leading-4 px-2 rounded-cs-sm
  text-[12px] font-normal tracking-[0.4px] uppercase
  font-clarity
`;

const tones: Record<NonNullable<PillProps["tone"]>, string> = {
  green:  "text-pill-green-text bg-pill-green-bg",
  orange: "text-pill-orange-text bg-pill-orange-bg",
  gray:   "text-midnight/70 bg-pill-gray-bg",
};

export default function Pill({ tone = "gray", children, className, fullWidth }: PillProps) {
  const pillBase = fullWidth ? fullWidthBase : base;
  return <span className={clsx(pillBase, tones[tone], className)}>{children}</span>;
}