import { SummaryCardForm } from "@/components/forms/SummaryCardForm";
import { getSummaryById } from "@/data/loaders";
import { date } from "zod";

export default async function SummaryCardRoute({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;
  const data = await getSummaryById(videoId);

  return <SummaryCardForm item={data} />;
}
