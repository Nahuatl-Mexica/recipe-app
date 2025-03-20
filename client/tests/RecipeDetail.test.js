import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RecipeDetail from '../src/pages/RecipeDetail';

const mockStore = configureStore([thunk]);
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' })
}));

describe('RecipeDetail Component', () => {
  let store;
  
  beforeEach(() => {
    store = mockStore({
      recipe: {
        recipe: {
          id: 1,
          title: 'Spaghetti Carbonara',
          description: 'A delicious Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
          prepTime: 15,
          cookTime: 15,
          servings: 4,
          difficulty: 'Medium',
          image: 'https://example.com/carbonara.jpg',
          ingredients: [
            { name: 'Spaghetti', quantity: '400', unit: 'g' },
            { name: 'Pancetta', quantity: '150', unit: 'g' },
            { name: 'Eggs', quantity: '3', unit: '' },
            { name: 'Parmesan', quantity: '50', unit: 'g' },
            { name: 'Black pepper', quantity: '1', unit: 'tsp' }
          ],
          instructions: [
            { step: 1, description: 'Cook pasta according to package instructions.', image: 'https://example.com/step1.jpg' },
            { step: 2, description: 'Fry pancetta until crispy.', image: 'https://example.com/step2.jpg' },
            { step: 3, description: 'Mix eggs and cheese in a bowl.', image: 'https://example.com/step3.jpg' },
            { step: 4, description: 'Combine all ingredients.', image: 'https://example.com/step4.jpg' }
          ],
          createdBy: {
            id: 1,
            name: 'John Doe'
          },
          createdAt: '2025-03-01T12:00:00Z'
        },
        loading: false,
        error: null
      },
      auth: {
        isAuthenticated: true,
        user: {
          id: 2,
          name: 'Jane Smith'
        }
      }
    });
    store.dispatch = jest.fn();
  });

  test('renders recipe details correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipeDetail />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(screen.getByText('A delicious Italian pasta dish with eggs, cheese, pancetta, and black pepper.')).toBeInTheDocument();
    expect(screen.getByText('15 min')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  test('displays ingredients correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipeDetail />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Spaghetti')).toBeInTheDocument();
    expect(screen.getByText('400 g')).toBeInTheDocument();
    expect(screen.getByText('Pancetta')).toBeInTheDocument();
    expect(screen.getByText('150 g')).toBeInTheDocument();
    expect(screen.getByText('Eggs')).toBeInTheDocument();
    expect(screen.getByText('Black pepper')).toBeInTheDocument();
  });

  test('displays instructions correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipeDetail />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Cook pasta according to package instructions.')).toBeInTheDocument();
    expect(screen.getByText('Fry pancetta until crispy.')).toBeInTheDocument();
    expect(screen.getByText('Mix eggs and cheese in a bowl.')).toBeInTheDocument();
    expect(screen.getByText('Combine all ingredients.')).toBeInTheDocument();
  });

  test('shows favorite button when authenticated', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipeDetail />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Add to Favorites/i)).toBeInTheDocument();
  });

  test('does not show edit/delete buttons for recipes created by other users', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipeDetail />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.queryByText(/Edit Recipe/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Delete Recipe/i)).not.toBeInTheDocument();
  });

  test('shows edit/delete buttons for recipes created by current user', () => {
    store = mockStore({
      recipe: {
        recipe: {
          id: 1,
          title: 'Spaghetti Carbonara',
          description: 'A delicious Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
          prepTime: 15,
          cookTime: 15,
          servings: 4,
          difficulty: 'Medium',
          image: 'https://example.com/carbonara.jpg',
          ingredients: [
            { name: 'Spaghetti', quantity: '400', unit: 'g' },
            { name: 'Pancetta', quantity: '150', unit: 'g' }
          ],
          instructions: [
            { step: 1, description: 'Cook pasta according to package instructions.' },
            { step: 2, description: 'Fry pancetta until crispy.' }
          ],
          createdBy: {
            id: 2,
            name: 'Jane Smith'
          },
          createdAt: '2025-03-01T12:00:00Z'
        },
        loading: false,
        error: null
      },
      auth: {
        isAuthenticated: true,
        user: {
          id: 2,
          name: 'Jane Smith'
        }
      }
    });
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipeDetail />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Edit Recipe/i)).toBeInTheDocument();
    expect(screen.getByText(/Delete Recipe/i)).toBeInTheDocument();
  });
});
