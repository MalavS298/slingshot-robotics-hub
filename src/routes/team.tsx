import { createFileRoute } from "@tanstack/react-router";
import { Team } from "@/components/site";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Meet the Team | Slingshot FTC #20240" },
      { name: "description", content: "Meet the students behind FTC robotics team Slingshot #20240." },
      { property: "og:title", content: "Meet the Team | Slingshot FTC #20240" },
      { property: "og:description", content: "Meet the students behind FTC robotics team Slingshot #20240." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Team,
});
