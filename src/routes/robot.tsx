import { createFileRoute } from "@tanstack/react-router";
import { Robot } from "@/components/site";

export const Route = createFileRoute("/robot")({
  head: () => ({
    meta: [
      { title: "Our Robot | Slingshot FTC #20240" },
      { name: "description", content: "Meet Slingshot's 2025-2026 DECODE competition robot." },
      { property: "og:title", content: "Our Robot | Slingshot FTC #20240" },
      { property: "og:description", content: "Meet Slingshot's 2025-2026 DECODE competition robot." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Robot,
});
