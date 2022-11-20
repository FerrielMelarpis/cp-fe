import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { NewClientFormDialog } from "./NewClientFormDialog";

describe("NewClientFormDialog", () => {
  test("shows up to screen when prop.open is true", () => {
    const noop = () => { };
    render(<NewClientFormDialog open={true} onSubmit={noop} />);
    expect(screen.getByText("Create new client")).toBeInTheDocument();
  });
  test("continue button is enabled when required fields are filled", () => {
    const noop = () => { };
    render(<NewClientFormDialog open={true} onSubmit={noop} />);
    fireEvent.change(
      screen.getByRole("textbox", { name: "First name" }),
      { target: { value: "first" } },
    );
    fireEvent.change(
      screen.getByRole("textbox", { name: "Last name" }),
      { target: { value: "last" } },
    );
    expect(screen.getByText("Continue")).toBeEnabled();
  });
  test("submit button is enabled when all form steps are completed", () => {
    const noop = () => { };
    render(<NewClientFormDialog open={true} onSubmit={noop} />);
    fireEvent.change(
      screen.getByRole("textbox", { name: "First name" }),
      { target: { value: "first" } },
    );
    fireEvent.change(
      screen.getByRole("textbox", { name: "Last name" }),
      { target: { value: "last" } },
    );
    fireEvent.click(screen.getByText("Continue"));
    fireEvent.change(
      screen.getByRole("textbox", { name: "Email" }),
      { target: { value: "user@email.com" } },
    );
    fireEvent.change(
      screen.getByRole("textbox", { name: "Phone number" }),
      { target: { value: "+639123456789" } },
    );
    expect(screen.getByText("Create client")).toBeEnabled();
  });
});
