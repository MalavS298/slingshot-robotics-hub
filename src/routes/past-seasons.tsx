import { createFileRoute } from "@tanstack/react-router";
import { PastSeasons } from "@/components/site";

export const Route = createFileRoute("/past-seasons")({
  head: () => ({
    meta: [
      { title: "Past Seasons | Slingshot FTC #20240" },
      { name: "description", content: "Robots and highlights from Slingshot's previous FTC seasons." },
      { property: "og:title", content: "Past Seasons | Slingshot FTC #20240" },
      { property: "og:description", content: "Robots and highlights from Slingshot's previous FTC seasons." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PastSeasons,
});
