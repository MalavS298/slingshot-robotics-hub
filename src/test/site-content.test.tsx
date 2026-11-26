import { describe, expect, it } from "vitest";

import { sponsorshipTiers, teamMembers } from "@/components/site";

describe("Team members", () => {
  it("lists all 16 members with only their assigned team category", () => {
    expect(teamMembers).toHaveLength(16);
    expect(teamMembers.filter((member) => member.category === "Hardware").map((member) => member.name)).toMatchObject(["Saanvi", "Anaisha", "Nihal", "Saatvik", "Sai", "Pranay"]);
    expect(teamMembers.filter((member) => member.category === "Software").map((member) => member.name)).toMatchObject(["Eshaann", "Malav", "Benoit", "Taheem", "Tarun", "Kevin"]);
    expect(teamMembers.filter((member) => member.category === "Outreach").map((member) => member.name)).toMatchObject(["Evan", "Ethan", "Daiwik", "Srivanth"]);
    expect(teamMembers.every((member) => !("bio" in member))).toBe(true);
  });
});

describe("Sponsorship tiers", () => {
  it("offers Orange from $99–299 with website and social media logos", () => {
    expect(sponsorshipTiers[0]).toMatchObject({
      name: "Orange",
      price: "$99–299",
      benefits: [true, true, false, false],
    });
  });

  it("offers Silver from $300–699 and adds shirt and display logos", () => {
    expect(sponsorshipTiers[1]).toMatchObject({
      name: "Silver",
      price: "$300–699",
      benefits: [true, true, true, false],
    });
  });

  it("offers Amethyst from $700+ with every logo placement", () => {
    expect(sponsorshipTiers[2]).toMatchObject({
      name: "Amethyst",
      price: "$700+",
      benefits: [true, true, true, true],
    });
  });
});
