import { type PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
  return (
    <article className="h-full bg-white rounded-cs shadow-cs p-cs-16 transition hover:shadow-lg hover:-translate-y-[1px] focus-within:shadow-lg">
      {children}
    </article>
  );
}