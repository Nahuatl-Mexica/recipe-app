import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../src/App';

const mockStore = configureStore([thunk]);

describe('App Component', () => {
  let store;
  
  beforeEach(() => {
    store = mockStore({
      auth: {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null
      },
      alert: {
        alerts: []
      }
    });
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test('renders navbar with correct links when not authenticated', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    expect(screen.getByText(/Recipe App/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test('renders navbar with correct links when authenticated', () => {
    store = mockStore({
      auth: {
        token: 'test-token',
        isAuthenticated: true,
        loading: false,
        user: { name: 'Test User', email: 'test@example.com' },
        error: null
      },
      alert: {
        alerts: []
      }
    });
    
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    expect(screen.getByText(/Recipe App/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });
});
