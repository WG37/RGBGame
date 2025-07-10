import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import App from './App';

// #1 mock test one render header 
test('renders RGB Game header', () => {
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

// #2 mock test api-handler => ./src/services/api-hander.test.ts
