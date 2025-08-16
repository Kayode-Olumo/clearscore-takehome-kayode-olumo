import http from "./http";

const REPORT_URL = process.env.NEXT_PUBLIC_REPORT_URL!;
const INSIGHT_DETAILS_URL = process.env.NEXT_PUBLIC_INSIGHT_DETAILS_URL!;

export async function fetchCreditReport() {
  const { data } = await http.get(REPORT_URL);
  return data;
}

export async function fetchInsightDetails() {
  const { data } = await http.get(INSIGHT_DETAILS_URL);
  return data;
}