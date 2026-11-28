import { describe, expect, it } from "vitest";

import { sponsorshipTiers, teamMembers } from "@/components/site";

describe("Team members", () => {
  it("lists all 16 members with only their assigned team category", () => {
    expect(teamMembers).toHaveLength(16);
    expect(teamMembers.filter((member) => member.category === "Hardware").map((member) => member.name)).toEqual(["Saanvi", "Anaisha", "Nihal", "Saatvik", "Kevin", "Pranay", "Srivanth"]);
    expect(teamMembers.filter((member) => member.category === "Software").map((member) => member.name)).toEqual(["Eshaann", "Malav", "Benoit", "Taheem", "Tarun", "Sai"]);
    expect(teamMembers.filter((member) => member.category === "Outreach").map((member) => member.name)).toEqual(["Evan", "Ethan", "Daiwik"]);
    expect(teamMembers.every((member) => !("bio" in member))).toBe(true);
  });
  it.each([["Sai", "Software"], ["Kevin", "Hardware"], ["Srivanth", "Hardware"]])("assigns %s to %s", (name, category) => {
    expect(teamMembers.find((member) => member.name === name)?.category).toBe(category);
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
