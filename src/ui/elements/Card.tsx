import { type PropsWithChildren } from "react";
import { cardStyles } from "@/styles/components";

export default function Card({ children }: PropsWithChildren) {
  return (
    <article className={cardStyles.base}>
      {children}
    </article>
  );
}