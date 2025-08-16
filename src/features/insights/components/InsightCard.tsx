"use client";

import { useState } from "react";
import { Card, Pill, Drawer } from "@/ui";
import type { Insight } from "../lib/types";
import { fetchInsightDetails } from "@/lib/api";

type InsightDetails = {
  title: string;
  onTrackDescription: string;
  offTrackDescription: string;
  details: { title: string; description: string }[];
};

export default function InsightCard({ insight }: { insight: Insight }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<InsightDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isOn = insight.status === "On Track";

  const handleExpand = async () => {
    if (!insight.canExpand) return;
    setOpen(true);
    if (!details && insight.id === "electoralRoll") {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchInsightDetails();
        setDetails(data);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load details");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Card>
        <div className="flex items-center gap-cs-8 mb-cs-16">
          <Pill tone={isOn ? "green" : "orange"}>{insight.status}</Pill>
          <Pill tone="gray">{insight.impact}</Pill>
        </div>

        {/* Title 16/bold/20px lh */}
        <h3
          className="
            text-[16px] leading-[20px] font-bold
            text-midnight font-clarity-bold
            mb-cs-10
            max-w-[368px]
          "
        >
          {insight.title}
        </h3>

        {/* Body 14/20px lh muted */}
        <p className="text-cs-14 leading-5 text-ink-muted">
          {insight.body}
        </p>

        {/* Optional action */}
        {insight.canExpand && (
          <button
            onClick={handleExpand}
            className="
              self-start mt-cs-8 text-cs-14 underline underline-offset-2 decoration-1
              text-cta hover:text-cta-hover focus:outline-none focus:ring-2 focus:ring-cta/30 rounded-cs-sm
            "
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            Learn more
          </button>
        )}
      </Card>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <header className="flex items-center justify-between mb-cs-16">
          <Pill tone={isOn ? "green" : "orange"}>{insight.status}</Pill>
          <button
            className="p-cs-4 rounded-cs-sm focus:outline-none focus:ring-2 focus:ring-cta/30"
            aria-label="Close details"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </header>

        {loading && <p className="text-cs-14 text-ink-muted">Loading…</p>}
        {error && <p className="text-cs-14 text-red-600">{error}</p>}

        {!loading && !error && details && (
          <>
            <h4 className="text-cs-16 leading-5 font-bold text-midnight mb-cs-8">
              {details.title}
            </h4>
            <p className="text-cs-14 leading-5 text-ink-muted mb-cs-16">
              {isOn ? details.onTrackDescription : details.offTrackDescription}
            </p>
            <div className="space-y-cs-16">
              {details.details.map((sec, i) => (
                <section key={i}>
                  <h5 className="text-cs-16 leading-5 font-bold text-midnight mb-cs-8">
                    {sec.title}
                  </h5>
                  <p className="text-cs-14 leading-5 text-ink-muted">
                    {sec.description}
                  </p>
                </section>
              ))}
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}