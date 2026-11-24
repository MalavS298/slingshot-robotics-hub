import { describe, expect, it } from "vitest";

import { sponsorshipTiers } from "@/components/site";

describe("Sponsorship tiers", () => {
  it("offers Orange from $99–299 with website and social media logos", () => {
    expect(sponsorshipTiers[0]).toEqual({
      name: "Orange",
      price: "$99–299",
      benefits: [true, true, false, false],
    });
  });

  it("offers Silver from $300–699 and adds shirt and display logos", () => {
    expect(sponsorshipTiers[1]).toEqual({
      name: "Silver",
      price: "$300–699",
      benefits: [true, true, true, false],
    });
  });

  it("offers Amethyst from $700+ with every logo placement", () => {
    expect(sponsorshipTiers[2]).toEqual({
      name: "Amethyst",
      price: "$700+",
      benefits: [true, true, true, true],
    });
  });
});
