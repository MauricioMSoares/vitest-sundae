import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import Options from '../pages/entry/Options';
import { renderWithContext, screen } from '../test-utils/testing-library-utils';

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  renderWithContext(<Options optionType="scoops" />);

  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect("scoopsSubtotal").toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});