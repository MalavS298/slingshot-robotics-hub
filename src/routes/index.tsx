import { createFileRoute } from "@tanstack/react-router";
import { Hero, About, Robot, Contact } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Slingshot #20240 | FTC Robotics Team" },
      { name: "description", content: "Slingshot #20240 is a FIRST Tech Challenge robotics team building robots and inspiring our community." },
      { property: "og:title", content: "Slingshot #20240 | FTC Robotics Team" },
      { property: "og:description", content: "Slingshot #20240 is a FIRST Tech Challenge robotics team building robots and inspiring our community." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (<><Hero /><About /><Robot /><Contact /></>);
}
