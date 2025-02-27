"use client";

import dynamic from "next/dynamic";

const YouTubePlayer = dynamic(() => import("./YouTubePlayer"), {
  ssr: false,
});

export default function YouTubePlayerWrapper({ videoId }: { videoId: string }) {
  return <YouTubePlayer videoId={videoId} />;
}
