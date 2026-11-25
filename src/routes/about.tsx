import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Slingshot FTC #20240" },
      { name: "description", content: "Learn the story and values of FTC robotics team Slingshot #20240." },
      { property: "og:title", content: "About | Slingshot FTC #20240" },
      { property: "og:description", content: "Learn the story and values of FTC robotics team Slingshot #20240." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});
