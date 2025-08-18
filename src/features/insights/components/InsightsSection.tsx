import type { Insight } from "../lib/types";
import InsightCard from "./InsightCard";

export default function InsightsSection({ insights }: { insights: Insight[] }) {
  return (
    <section aria-labelledby="insights-title">
      <h2 id="insights-title" className="sr-only">Insights</h2>

      <div className="large:hidden">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-cs-8 horizontal-scroll [-webkit-overflow-scrolling:touch]">
          {insights.map((i) => (
            <div
              key={i.id}
              className="
                snap-start shrink-0
                min-w-[46%] medium:min-w-[44%] 
              "
            >
              <div className="h-full">
                <InsightCard insight={i} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden large:grid large:grid-cols-2 xlarge:grid-cols-3 large:gap-4">
        {insights.map((i) => (
          <div key={i.id} className="h-full">
            <InsightCard insight={i} />
          </div>
        ))}
      </div>
    </section>
  );
}