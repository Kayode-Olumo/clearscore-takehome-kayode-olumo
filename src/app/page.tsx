import { fetchCreditReport } from "@/lib/api";
import { generateInsights } from "@/features/insights/lib/insights";
import InsightsSection from "@/features/insights/components/InsightsSection";
import { insightStyles } from "@/styles/components";

export default async function Page() {
  let report: any = null;
  try {
    report = await fetchCreditReport();
  } catch (e) {
    console.error("Failed to fetch credit report", e);
  }

  const insights = generateInsights(report ?? {});

  return (
    <main className={insightStyles.container}>
      <h1 className={insightStyles.title}>Insights</h1>
      <InsightsSection insights={insights} />
    </main>
  );
}