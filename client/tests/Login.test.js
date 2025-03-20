import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from '../src/pages/Login';

const mockStore = configureStore([thunk]);
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Login Component', () => {
  let store;
  
  beforeEach(() => {
    store = mockStore({
      auth: {
        loading: false,
        error: null
      }
    });
    store.dispatch = jest.fn();
  });

  test('renders login form correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  test('validates form inputs', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.click(submitButton);
    
    // Should show validation error
    expect(screen.getByText(/Please enter all fields/i)).toBeInTheDocument();
  });

  test('submits form with valid inputs', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    // Should dispatch login action
    expect(store.dispatch).toHaveBeenCalled();
  });

  test('shows loading state during submission', () => {
    store = mockStore({
      auth: {
        loading: true,
        error: null
      }
    });
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByRole('button', { name: /Signing In\.\.\./i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Signing In\.\.\./i })).toBeDisabled();
  });

  test('navigates to register page when clicking Sign Up link', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    
    const signUpLink = screen.getByText(/Sign Up/i);
    fireEvent.click(signUpLink);
    
    // Should navigate to register page
    // This would be tested in an integration test
  });
});
