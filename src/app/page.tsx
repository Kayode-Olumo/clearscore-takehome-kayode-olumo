import { fetchCreditReport } from "@/lib/api";
import { generateInsights } from "@/features/insights/lib/insights";
import InsightsSection from "@/features/insights/components/InsightsSection";

export default async function Page() {
  let report: any = null;
  try {
    report = await fetchCreditReport();
  } catch (e) {
    console.error("Failed to fetch credit report", e);
  }

  const insights = generateInsights(report ?? {});

  return (
    <main className="min-h-screen p-cs-16 medium:p-cs-24 bg-gallery">
      <h1 className="text-cs-20 font-bold mb-cs-16">Insights</h1>
      <InsightsSection insights={insights} />
    </main>
  );
}