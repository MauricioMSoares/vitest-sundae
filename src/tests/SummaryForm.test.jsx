import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SummaryForm from "../pages/SummaryForm";
import userEvent from "@testing-library/user-event";

describe("SummaryForm", () => {
  it("checkbox is unchecked by default", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();
  });

  it("button is disabled by default", () => {
    render(<SummaryForm />);
    const button = screen.getByRole("button", { name: /confirm order/i });
    expect(button).toBeDisabled();
  });

  it("checking checkbox enables button", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });
    await user.click(checkbox);
    expect(button).toBeEnabled();
  });

  it("unchecking checkbox disables button", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });
    await user.click(checkbox);
    await user.click(checkbox);
    expect(button).toBeDisabled();
  });

  it("popover responds to hover", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    await user.unhover(termsAndConditions);
    expect(popover).not.toBeInTheDocument();
  });
});