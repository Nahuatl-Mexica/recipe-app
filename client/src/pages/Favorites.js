import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FavoritesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const RecipeCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RecipeContent = styled.div`
  padding: 1.5rem;
`;

const RecipeTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const RecipeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const RecipeActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ActionButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: ${({ theme, danger }) => danger ? theme.danger : theme.primary};
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${({ theme, danger }) => danger ? theme.dangerHover : theme.primaryHover};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const ExploreButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  background-color: ${({ active, theme }) => active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ active, theme }) => active ? theme.primaryHover : theme.border};
  }
`;

// Mock data for initial development
const mockFavoriteRecipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    time: '30 min',
    difficulty: 'Medium',
    category: 'Dinner'
  },
  {
    id: 2,
    title: 'Chicken Tikka Masala',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    time: '45 min',
    difficulty: 'Medium',
    category: 'Dinner'
  },
  {
    id: 3,
    title: 'Avocado Toast',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
    time: '10 min',
    difficulty: 'Easy',
    category: 'Breakfast'
  },
  {
    id: 4,
    title: 'Beef Wellington',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80',
    time: '120 min',
    difficulty: 'Hard',
    category: 'Dinner'
  },
  {
    id: 5,
    title: 'Greek Salad',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    time: '15 min',
    difficulty: 'Easy',
    category: 'Lunch'
  }
];

const Favorites = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  
  useEffect(() => {
    // Simulate API call
    const fetchFavorites = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setRecipes(mockFavoriteRecipes);
      setLoading(false);
    };
    
    fetchFavorites();
  }, []);
  
  const handleRemoveFavorite = (id) => {
    // This will be replaced with actual API call
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };
  
  const filteredRecipes = activeFilter === 'All' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === activeFilter);
  
  return (
    <FavoritesContainer>
      <Title>My Favorite Recipes</Title>
      
      {loading ? (
        <div>Loading...</div>
      ) : recipes.length > 0 ? (
        <>
          <FilterContainer>
            <FilterButton 
              active={activeFilter === 'All'} 
              onClick={() => setActiveFilter('All')}
            >
              All
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'Breakfast'} 
              onClick={() => setActiveFilter('Breakfast')}
            >
              Breakfast
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'Lunch'} 
              onClick={() => setActiveFilter('Lunch')}
            >
              Lunch
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'Dinner'} 
              onClick={() => setActiveFilter('Dinner')}
            >
              Dinner
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'Dessert'} 
              onClick={() => setActiveFilter('Dessert')}
            >
              Dessert
            </FilterButton>
          </FilterContainer>
          
          <RecipesGrid>
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id}>
                <RecipeImage src={recipe.image} alt={recipe.title} />
                <RecipeContent>
                  <RecipeTitle>{recipe.title}</RecipeTitle>
                  <RecipeInfo>
                    <span>⏱️ {recipe.time}</span>
                    <span>🔥 {recipe.difficulty}</span>
                  </RecipeInfo>
                  <RecipeActions>
                    <ActionButton to={`/recipe/${recipe.id}`}>View</ActionButton>
                    <ActionButton 
                      as="button" 
                      danger 
                      onClick={() => handleRemoveFavorite(recipe.id)}
                    >
                      Remove
                    </ActionButton>
                  </RecipeActions>
                </RecipeContent>
              </RecipeCard>
            ))}
          </RecipesGrid>
        </>
      ) : (
        <EmptyState>
          <EmptyStateIcon>❤️</EmptyStateIcon>
          <EmptyStateText>
            You haven't saved any favorite recipes yet.
          </EmptyStateText>
          <ExploreButton to="/">Explore Recipes</ExploreButton>
        </EmptyState>
      )}
    </FavoritesContainer>
  );
};

export default Favorites;
