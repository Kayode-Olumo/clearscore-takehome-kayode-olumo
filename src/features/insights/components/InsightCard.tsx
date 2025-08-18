"use client";

import { useState } from "react";
import { Card, Pill, Drawer } from "@/ui";
import type { Insight } from "../lib/types";
import { useInsightDetails } from "../lib/hooks";
import { cardStyles, drawerStyles } from "@/styles/components";

export default function InsightCard({ insight }: { insight: Insight }) {
  const [open, setOpen] = useState(false);
  const { details, loading, error, fetchDetails } = useInsightDetails();

  const isOn = insight.status === "On Track";

  const handleExpand = async () => {
    if (!insight.canExpand) return;
    setOpen(true);
    if (!details && insight.id === "electoralRoll") {
      await fetchDetails(insight.id);
    }
  };

  return (
    <>
      <Card>
        <div className="large:hidden flex flex-col h-full">
          <div className="flex-1">
            <div className={cardStyles.headerMobile}>
              <Pill tone={isOn ? "green" : "orange"}>{insight.status}</Pill>
            </div>

            <h3 className={cardStyles.title}>
              {insight.title}
            </h3>

            <p className={cardStyles.body} style={{ color: 'var(--color-ink-muted)' }}>
              {insight.body}
            </p>

            {insight.canExpand && (
              <button
                onClick={handleExpand}
                className={cardStyles.linkMobile}
                aria-haspopup="dialog"
                aria-expanded={open}
              >
                Learn more
              </button>
            )}
          </div>

          <div className="pt-cs-8 w-full">
            <Pill tone="gray" fullWidth>{insight.impact}</Pill>
          </div>
        </div>

        <div className="hidden large:block">
          <div className={cardStyles.headerDesktop}>
            <Pill tone={isOn ? "green" : "orange"}>{insight.status}</Pill>
            <Pill tone="gray">{insight.impact}</Pill>
          </div>

          <h3 className={cardStyles.title}>
            {insight.title}
          </h3>

          <p className={cardStyles.body} style={{ color: 'var(--color-ink-muted)' }}>
            {insight.body}
          </p>

          {insight.canExpand && (
            <button
              onClick={handleExpand}
              className={cardStyles.link}
              aria-haspopup="dialog"
              aria-expanded={open}
            >
              Learn more
            </button>
          )}
        </div>
      </Card>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <header className={drawerStyles.header}>
          <Pill tone={isOn ? "green" : "orange"}>{insight.status}</Pill>
          <button
            className={drawerStyles.closeButton}
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
            <h4 className={drawerStyles.content.title}>
              {details.title}
            </h4>
            <p className={drawerStyles.content.description}>
              {isOn ? details.onTrackDescription : details.offTrackDescription}
            </p>
            <div className={drawerStyles.content.section}>
              {details.details.map((sec, i) => (
                <section key={i}>
                  <h5 className={drawerStyles.content.sectionTitle}>
                    {sec.title}
                  </h5>
                  <p className={drawerStyles.content.sectionText}>
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