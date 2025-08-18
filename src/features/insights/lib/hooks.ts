import { useState } from "react";
import { loadInsightDetails, type InsightDetails } from "./insights";

export function useInsightDetails() {
  const [details, setDetails] = useState<InsightDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async (insightId: string) => {
    if (details) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await loadInsightDetails(insightId);
      setDetails(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load details");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setDetails(null);
    setLoading(false);
    setError(null);
  };

  return {
    details,
    loading,
    error,
    fetchDetails,
    reset,
  };
}
