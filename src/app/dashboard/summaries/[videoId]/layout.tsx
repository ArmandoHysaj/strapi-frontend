import { extractYouTubeID } from "@/lib/utils";
import { getSummaryById } from "@/data/loaders";
import { notFound } from "next/navigation";
import YouTubePlayerWrapper from "@/components/custom/YouTubePlayerWrapper";

export default async function SummarySingleRoute({
  params,
  children,
}: {
  readonly params: any;
  readonly children: React.ReactNode;
}) {
  const { videoId } = await params;
  const data = await getSummaryById(videoId);
  if (data?.error?.status === 404) return notFound();
  console.log("data===========", data);
  const id = extractYouTubeID(data.data.videoId);

  return (
    <div>
      <div className="h-full grid gap-4 grid-cols-5 p-4">
        <div className="col-span-3">{children}</div>
        <div className="col-span-2">
          <div>
            <YouTubePlayerWrapper videoId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
