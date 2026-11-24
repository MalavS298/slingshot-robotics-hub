import { createFileRoute } from "@tanstack/react-router";
import { Outreach } from "@/components/site";

export const Route = createFileRoute("/outreach")({
  head: () => ({
    meta: [
      { title: "Outreach | Slingshot FTC #20240" },
      { name: "description", content: "How Slingshot #20240 inspires young innovators through STEM outreach." },
      { property: "og:title", content: "Outreach | Slingshot FTC #20240" },
      { property: "og:description", content: "How Slingshot #20240 inspires young innovators through STEM outreach." },
    ],
  }),
  component: Outreach,
});
