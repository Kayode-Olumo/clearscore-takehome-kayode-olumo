import type { CreditReport, Insight, InsightStatus } from "./types";

const status = (ok: boolean): InsightStatus => (ok ? "On Track" : "Off Track");

const isPublicInfoOnTrack = (r: CreditReport): boolean =>
  (r?.personal?.publicInfo?.courtAndInsolvencies ?? []).length === 0;

const isCreditUtilOnTrack = (r: CreditReport): boolean => {
  for (const a of r?.accounts ?? []) {
    if (a.accountCategory === "credit_cards") {
      const bal = a.overview?.balance?.amount ?? 0;
      const lim = a.overview?.limit?.amount ?? 0;
      if (lim > 0 && bal / lim >= 0.5) return false;
    }
  }
  return true;
};

const isElectoralRollOnTrack = (r: CreditReport): boolean =>
  (r?.personal?.electoralRoll ?? []).some((e) => e.current === true);

export function generateInsights(r: CreditReport): Insight[] {
  return [
    {
      id: "publicInfo",
      title: "Public information",
      body: "Bankruptcies and individual voluntary arrangements can damage your score",
      impact: "High Impact",
      status: status(isPublicInfoOnTrack(r)),
    },
    {
      id: "creditUtil",
      title: "Credit utilisation",
      body: "Using more than 50% of your available credit can damage your score",
      impact: "Medium Impact",
      status: status(isCreditUtilOnTrack(r)),
    },
    {
      id: "electoralRoll",
      title: "Electoral roll",
      body: "Being on the electoral roll can improve your score",
      impact: "Medium Impact",
      status: status(isElectoralRollOnTrack(r)),
      canExpand: true,
    },
  ];
}