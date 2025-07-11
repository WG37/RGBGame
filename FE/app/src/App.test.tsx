import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('renders RGB Game header', () => {
    render(
      <MemoryRouter>
        <MantineProvider>
          <App />
        </MantineProvider>
      </MemoryRouter>
    );

    const elements = screen.getAllByText(/RGB Game/i);
    expect(elements.length).toBeGreaterThan(0);
  });
});
