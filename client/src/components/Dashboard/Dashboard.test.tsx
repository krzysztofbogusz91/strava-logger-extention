import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import configureMockStore from "redux-mock-store";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore();
const store = mockStore({});

describe('About page', () => {
  let container: any = null;

  beforeEach(() => {
     container = render(
      <BrowserRouter> 
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
  });

  afterEach(cleanup)
  
  it('should show basic title', () => {
    const { getByText } = container;
    const title = getByText(/Rehab Buddy/i);
    
    expect(title).toBeInTheDocument();
  });

  it('should show error when no authenticated user', () => {
    const { getByText } = container;

    const title = getByText(/Error no user/i);
    
    expect(title).toBeInTheDocument();
  });
});



