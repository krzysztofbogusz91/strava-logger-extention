import React from 'react';
import { render, queryAllByText, cleanup } from '@testing-library/react';
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

test('shows login screen', () => {
  const { getByText, container } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>);
  const stravaLogin = getByText(/Login with Strava/i);
  
  expect(stravaLogin).toBeInTheDocument();
});
