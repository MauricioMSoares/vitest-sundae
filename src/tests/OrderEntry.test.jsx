import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';

import { render, screen } from '@testing-library/react';
import OrderEntry from '../pages/entry/OrderEntry';
import { test } from 'vitest';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    http.get('http://localhost:3030/scoops', (req, res, ctx) => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get('http://localhost:3030/toppings', (req, res, ctx) => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByRole("alert");
  expect(alerts).toHaveLength(2);
  expect(alerts[0]).toHaveTextContent("An unexpected error occurred. Please try again later.");
  expect(alerts[1]).toHaveTextContent("An unexpected error occurred. Please try again later.");
});