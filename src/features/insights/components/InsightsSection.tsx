import type { Insight } from "../lib/types";
import InsightCard from "./InsightCard";
import { insightStyles } from "@/styles/components";

export default function InsightsSection({ insights }: { insights: Insight[] }) {
  return (
    <section aria-labelledby="insights-title">
      <h2 id="insights-title" className="sr-only">Insights</h2>

      <div className="large:hidden">
        <div className={insightStyles.grid.mobile}>
          {insights.map((i) => (
            <div key={i.id} className={insightStyles.item.mobile}>
              <div className="h-full">
                <InsightCard insight={i} />
              </div>
            </div>
          ))}
        </div>
      </div>

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