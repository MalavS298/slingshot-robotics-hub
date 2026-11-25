import { createFileRoute } from "@tanstack/react-router";
import { Sponsorship } from "@/components/site";

export const Route = createFileRoute("/sponsorship")({
  head: () => ({
    meta: [
      { title: "Sponsorship | Slingshot FTC #20240" },
      { name: "description", content: "Sponsor tiers and benefits for supporting Slingshot #20240." },
      { property: "og:title", content: "Sponsorship | Slingshot FTC #20240" },
      { property: "og:description", content: "Sponsor tiers and benefits for supporting Slingshot #20240." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sponsorship,
});
