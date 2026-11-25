import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RobotExplorer } from "@/components/robot-explorer";

describe("Robot explorer", () => {
  it("shows the matching explanation when a feature is selected", () => {
    render(<RobotExplorer />);
    fireEvent.click(screen.getByRole("button", { name: "04 Drivetrain" }));
    expect(screen.getAllByText("Mecanum Drivetrain")).toHaveLength(2);
    expect(screen.getAllByText(/strafe sideways/)).toHaveLength(2);
  });

  it("moves to another robot angle with the next-angle control", () => {
    render(<RobotExplorer />);
    expect(screen.getByAltText("Slingshot #20240 robot, front three-quarter")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next robot angle" }));
    expect(screen.getByAltText("Slingshot #20240 robot, launcher side")).toBeInTheDocument();
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
