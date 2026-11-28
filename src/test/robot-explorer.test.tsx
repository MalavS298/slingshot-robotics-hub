import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { RobotExplorer, robotConfigs } from "@/components/robot-explorer";

afterEach(cleanup);

describe("Single-view robot explorers", () => {
  it("uses BIOBUZZ for the current 2026–27 robot", () => {
    expect(robotConfigs.biobuzz.game).toBe("BIOBUZZ");
    expect(robotConfigs.biobuzz.season).toBe("2026–27");
  });
  it("uses DECODE for the past 2025–26 robot with a different image", () => {
    expect(robotConfigs.decode.game).toBe("DECODE");
    expect(robotConfigs.decode.season).toBe("2025–26");
    expect(robotConfigs.decode.image).not.toBe(robotConfigs.biobuzz.image);
  });
  it("keeps a single robot image and no angle switching", () => {
    render(<RobotExplorer />);
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.queryByRole("button", { name: "Next robot angle" })).toBeNull();
    fireEvent.keyDown(screen.getByRole("application"), { key: "ArrowRight" });
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });
  it("selects each BIOBUZZ system from its callout", () => {
    render(<RobotExplorer />);
    for (const feature of robotConfigs.biobuzz.features) {
      const button = screen.getByRole("button", { name: `Learn about ${feature.name}` });
      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-pressed", "true");
    }
  });
  it("includes exactly the five supplied DECODE systems", () => {
    expect(robotConfigs.decode.features.map((feature) => feature.name)).toEqual(["Intake", "Mecanum Drivetrain", "Custom Ball Blocker", "LED Matrix", "Shooter"]);
  });
  it("selects each DECODE system independently", () => {
    render(<RobotExplorer robot="decode" />);
    for (const feature of robotConfigs.decode.features) {
      const button = screen.getByRole("button", { name: `Learn about ${feature.name}` });
      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-pressed", "true");
    }
  });
  it("zooms and resets without changing the image", () => {
    render(<RobotExplorer />);
    const image = screen.getByRole("img").getAttribute("src");
    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(screen.getByText("110%")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset view" }));
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", image);
  });
});
