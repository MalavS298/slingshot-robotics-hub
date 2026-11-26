import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RobotExplorer } from "@/components/robot-explorer";

describe("Robot explorer", () => {
  it("shows the team's exact wording for the deployable ramp", () => {
    render(<RobotExplorer />);
    fireEvent.click(screen.getByRole("button", { name: "03 Ramp" }));
    expect(screen.getAllByText("Deployable Ramp").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Deployable ramp to intake from flowers.")).toHaveLength(2);
  });

  it("shows the team's exact wording for the butterfly drivetrain", () => {
    render(<RobotExplorer />);
    fireEvent.click(screen.getByRole("button", { name: "04 Butterfly" }));
    expect(screen.getAllByText("Butterfly Drivetrain").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Butterfly drivetrain, also on the bottom.")).toHaveLength(2);
  });

  it("lists the five named systems and nothing else", () => {
    render(<RobotExplorer />);
    for (const label of ["01 Mecanum", "02 Turret", "03 Ramp", "04 Butterfly", "05 Intake"]) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
    expect(screen.queryByText("Dual Flywheel Launcher")).toBeNull();
    expect(screen.queryByText("Limelight Vision")).toBeNull();
  });

  it("moves to another robot angle with the next-angle control", () => {
    render(<RobotExplorer />);
    expect(screen.getByAltText("Slingshot #20240 robot, front three-quarter")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next robot angle" }));
    expect(screen.getByAltText("Slingshot #20240 robot, turret side")).toBeInTheDocument();
  });

  it("supports keyboard orbiting and reset", () => {
    render(<RobotExplorer />);
    const stage = screen.getByRole("application");
    fireEvent.keyDown(stage, { key: "ArrowLeft" });
    expect(screen.getByAltText("Slingshot #20240 robot, intake overview")).toBeInTheDocument();
    fireEvent.keyDown(stage, { key: "0" });
    expect(screen.getByAltText("Slingshot #20240 robot, front three-quarter")).toBeInTheDocument();
  });
});
