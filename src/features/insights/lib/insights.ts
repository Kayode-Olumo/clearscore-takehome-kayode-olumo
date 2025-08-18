import type { CreditReport, Insight, InsightStatus } from "./types";
import { fetchInsightDetails } from "@/lib/api";

const status = (ok: boolean): InsightStatus => (ok ? "On Track" : "Off Track");

const isPublicInfoOnTrack = (creditReport: CreditReport): boolean =>
  (creditReport?.personal?.publicInfo?.courtAndInsolvencies ?? []).length === 0;

const isCreditUtilOnTrack = (creditReport: CreditReport): boolean => {
  return (creditReport?.accounts ?? []).every(account => {
    if (account.accountCategory !== "credit_cards") return true;
    
    const balance = account.overview?.balance?.amount ?? 0;
    const limit = account.overview?.limit?.amount ?? 0;
    
    return limit === 0 || balance / limit < 0.5;
  });
};

const isElectoralRollOnTrack = (creditReport: CreditReport): boolean =>
  (creditReport?.personal?.electoralRoll ?? []).some((e) => e.current === true);

export function generateInsights(creditReport: CreditReport): Insight[] {
  return [
    {
      id: "publicInfo",
      title: "Public information",
      body: "Bankruptcies and individual voluntary arrangements can damage your score",
      impact: "High Impact",
      status: status(isPublicInfoOnTrack(creditReport)),
    },
    {
      id: "creditUtil",
      title: "Credit utilisation",
      body: "Using more than 50% of your available credit can damage your score",
      impact: "Medium Impact",
      status: status(isCreditUtilOnTrack(creditReport)),
    },
    {
      id: "electoralRoll",
      title: "Electoral roll",
      body: "Being on the electoral roll can improve your score",
      impact: "Medium Impact",
      status: status(isElectoralRollOnTrack(creditReport)),
      canExpand: true,
    },
  ];
}

export type InsightDetails = {
  title: string;
  onTrackDescription: string;
  offTrackDescription: string;
  details: { title: string; description: string }[];
};

export async function loadInsightDetails(insightId: string): Promise<InsightDetails> {
  if (insightId !== "electoralRoll") {
    throw new Error("Only electoral roll insights can be expanded");
  }
  
  const data = await fetchInsightDetails();
  return data;
}