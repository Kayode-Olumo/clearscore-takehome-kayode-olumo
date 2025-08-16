export type Money = { amount: number };
export type Account = {
  accountCategory: string;
  overview?: { balance?: Money; limit?: Money };
};

export type CreditReport = {
  accounts?: Account[];
  personal?: {
    publicInfo?: { courtAndInsolvencies?: unknown[] };
    electoralRoll?: { current?: boolean }[];
  };
};

export type InsightStatus = "On Track" | "Off Track";

export type Insight = {
  id: "publicInfo" | "creditUtil" | "electoralRoll";
  title: string;
  body: string;
  impact: "High Impact" | "Medium Impact";
  status: InsightStatus;
  canExpand?: boolean;
};