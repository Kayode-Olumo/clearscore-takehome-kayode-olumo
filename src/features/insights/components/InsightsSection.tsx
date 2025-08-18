import type { Insight } from "../lib/types";
import InsightCard from "./InsightCard";
import { insightStyles } from "@/styles/components";

export default function InsightsSection({ insights }: { insights: Insight[] }) {
  return (
    <section aria-labelledby="insights-title">
      <h2 id="insights-title" className="sr-only">Insights</h2>

      {/* Mobile view (default) */}
      <div className="small:hidden">
        <div className={insightStyles.grid.mobile}>
          <div className="snap-start shrink-0 w-cs-1" />
          {insights.map((i) => (
            <div key={i.id} className={insightStyles.item.mobile}>
              <div className="h-full">
                <InsightCard insight={i} />
              </div>
            </div>
          ))}
          <div className="snap-start shrink-0 w-cs-1" />
        </div>
      </div>

      {/* Small view (375px+) */}
      <div className="hidden small:block medium:hidden">
        <div className={insightStyles.grid.small}>
          <div className="snap-start shrink-0 w-cs-1" />
          {insights.map((i) => (
            <div key={i.id} className={insightStyles.item.mobile}>
              <div className="h-full">
                <InsightCard insight={i} />
              </div>
            </div>
          ))}
          <div className="snap-start shrink-0 w-cs-1" />
        </div>
      </div>

      {/* Medium view (768px+) */}
      <div className="hidden medium:block large:hidden">
        <div className={insightStyles.grid.small}>
          <div className="snap-start shrink-0 w-cs-1" />
          {insights.map((i) => (
            <div key={i.id} className={insightStyles.item.mobile}>
              <div className="h-full">
                <InsightCard insight={i} />
              </div>
            </div>
          ))}
          <div className="snap-start shrink-0 w-cs-1" />
        </div>
      </div>

      {/* Large view (1024px+) and Extra Large view (1280px+) */}
      <div className={insightStyles.grid.desktop}>
        {insights.map((i) => (
          <div key={i.id} className={insightStyles.item.desktop}>
            <InsightCard insight={i} />
          </div>
        ))}
      </div>
    </section>
  );
}