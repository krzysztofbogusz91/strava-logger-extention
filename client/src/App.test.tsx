import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup)

test('renders application main page', () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>);
  const linkElement = getByText(/Rehab Buddy/i);
  expect(linkElement).toBeInTheDocument();
});

