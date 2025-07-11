// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import App from './App';
import { customTheme } from './themes/theme';
import './index.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Failed to find #root element');

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <MantineProvider theme={customTheme} defaultColorScheme="dark">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
);