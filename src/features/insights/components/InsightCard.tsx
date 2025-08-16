"use client";

import { useState } from "react";
import { Card, Pill, Drawer } from "@/ui";
import type { Insight } from "../lib/types";

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
        const res = await fetch("https://api.jsonbin.io/v3/b/6128c389c5159b35ae04d4ed/1?meta=false");
        if (!res.ok) throw new Error("Failed to load details");
        const data = (await res.json()) as InsightDetails;
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
        <div className="flex items-center gap-cs-8 mb-cs-10">
          <Pill tone={isOn ? "green" : "orange"}>{insight.status}</Pill>
          <Pill tone="gray">{insight.impact}</Pill>
        </div>

        <h3 className="text-cs-16 font-bold text-midnight mb-cs-10">{insight.title}</h3>
        <p className="text-cs-14 leading-5 text-ink-muted">{insight.body}</p>

        {insight.canExpand && (
          <button
            onClick={handleExpand}
            className="self-start mt-cs-8 text-cs-14 underline underline-offset-2 decoration-1
                       text-cta hover:text-cta-hover focus:outline-none focus:ring-2 focus:ring-cta/30 rounded-cs-sm"
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            Learn more
          </button>
        )}
      </Card>

      <Drawer open={open} onClose={() => setOpen(false)} maxWidth={480}>
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

        {!loading && !error && (
          <>
            <h4 className="text-cs-16 font-bold text-midnight mb-cs-8">
              {details?.title ?? insight.title}
            </h4>
            <p className="text-cs-14 leading-5 text-ink-muted mb-cs-16">
              {details
                ? (isOn ? details.onTrackDescription : details.offTrackDescription)
                : "More information…"}
            </p>
            {details?.details?.length ? (
              <div className="space-y-cs-16">
                {details.details.map((sec, i) => (
                  <section key={i}>
                    <h5 className="text-cs-16 font-bold text-midnight mb-cs-8">{sec.title}</h5>
                    <p className="text-cs-14 leading-5 text-ink-muted">{sec.description}</p>
                  </section>
                ))}
              </div>
            ) : null}
          </>
        )}
      </Drawer>
    </>
  );
}