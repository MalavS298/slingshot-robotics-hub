import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Slingshot FTC #20240" },
      { name: "description", content: "Get in touch with Slingshot #20240 to sponsor our team or say hi." },
      { property: "og:title", content: "Contact | Slingshot FTC #20240" },
      { property: "og:description", content: "Get in touch with Slingshot #20240 to sponsor our team or say hi." },
    ],
  }),
  component: Contact,
});
