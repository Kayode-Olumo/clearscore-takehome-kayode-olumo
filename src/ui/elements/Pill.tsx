import clsx from "clsx";

type PillProps = {
  tone?: "green" | "orange" | "gray";
  children: React.ReactNode;
  className?: string;
};

const base =
  "uppercase tracking-[0.4px] text-cs-12 font-normal rounded-cs-sm h-4 leading-4 px-2 inline-flex items-center text-center";

const tones = {
  green: "text-pill-green-text bg-pill-green-bg",
  orange: "text-pill-orange-text bg-pill-orange-bg",
  gray: "text-midnight/70 bg-pill-gray-bg",
};

export default function Pill({ tone = "gray", children, className }: PillProps) {
  return <span className={clsx(base, tones[tone], className)}>{children}</span>;
}