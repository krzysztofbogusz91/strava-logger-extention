import React from 'react';
import { render, cleanup } from '@testing-library/react';
import configureMockStore from "redux-mock-store";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from './NavBar';

const mockStore = configureMockStore();
const store = mockStore({});

describe('NavBar page', () => {
  afterEach(cleanup)
  
  it('should show basic title', () => {
    const { getByText, container } = render(
      <BrowserRouter> 
        <Provider store={store}>
          <NavBar />
        </Provider>
      </BrowserRouter>
    );
    const title = getByText(/Rehab Buddy/i);
    
    expect(title).toBeInTheDocument();
  });
});



