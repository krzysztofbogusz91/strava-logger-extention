import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';
import { Router } from 'react-router-dom';
import configureMockStore from "redux-mock-store";
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history'

const mockStore = configureMockStore();
const store = mockStore({});

afterEach(cleanup)

it('renders application login page', () => {
  const history = createMemoryHistory()
  history.push('login');

  const { getByText } = render(
    <Router history={history} >
       <Provider store={store}>
          <App />
       </Provider>
    </Router>);
  const linkElement = getByText(/Login with Strava/i);
  expect(linkElement).toBeInTheDocument();
});

