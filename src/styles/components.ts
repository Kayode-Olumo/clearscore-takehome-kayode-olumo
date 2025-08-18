import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cardStyles = {
  base: cn(
    "h-full bg-white rounded-cs shadow-cs p-cs-16",
    "transition hover:shadow-lg hover:-translate-y-[1px] focus-within:shadow-lg",
    "flex flex-col"
  ),
  header: "flex items-center gap-cs-8 mb-cs-16",
  title: cn(
    "text-[16px] leading-[20px] font-bold",
    "text-midnight font-clarity-bold",
    "mb-cs-10 max-w-[368px]"
  ),
  body: "text-cs-14 leading-5 pb-cs-8",
  link: cn(
    "self-start mt-cs-8 text-cs-14 no-underline hover:underline underline-offset-2 decoration-1",
    "text-cta hover:text-cta-hover focus:outline-none focus:ring-2 focus:ring-cta/30 rounded-cs-sm cursor-pointer"
  ),
};

export const insightStyles = {
  container: "min-h-screen p-cs-16 medium:p-cs-24 bg-gallery",
  title: "text-cs-20 font-bold mb-cs-16",
  grid: {
    mobile: cn(
      "flex gap-4 overflow-x-auto snap-x snap-mandatory pb-cs-8",
      "horizontal-scroll [-webkit-overflow-scrolling:touch]"
    ),
    desktop: "hidden large:grid large:grid-cols-2 xlarge:grid-cols-3 large:gap-4",
  },
  item: {
    mobile: "snap-start shrink-0 min-w-[46%] medium:min-w-[44%]",
    desktop: "h-full",
  },
};

export const drawerStyles = {
  header: "flex items-center justify-between mb-cs-16",
  closeButton: cn(
    "p-cs-4 rounded-cs-sm focus:outline-none focus:ring-2 focus:ring-cta/30 cursor-pointer"
  ),
  content: {
    title: "text-cs-16 leading-5 font-bold text-midnight mb-cs-8",
    description: "text-cs-14 leading-5 text-ink-muted mb-cs-16 pb-cs-8",
    section: "space-y-cs-16",
    sectionTitle: "text-cs-16 leading-5 font-bold text-midnight mb-cs-8",
    sectionText: "text-cs-14 leading-5 text-ink-muted",
  },
};
