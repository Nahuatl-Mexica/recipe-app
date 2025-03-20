import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${({ active, theme }) => active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? theme.primary : theme.text};
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
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

const CreateButton = styled(Link)`
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

// Mock data for initial development
const mockUserRecipes = [
  {
    id: 1,
    title: 'Homemade Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    time: '60 min',
    difficulty: 'Medium',
    createdAt: '2025-02-15'
  },
  {
    id: 2,
    title: 'Chocolate Chip Cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    time: '25 min',
    difficulty: 'Easy',
    createdAt: '2025-03-01'
  },
  {
    id: 3,
    title: 'Vegetable Stir Fry',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    time: '20 min',
    difficulty: 'Easy',
    createdAt: '2025-03-10'
  }
];

const mockFavoriteRecipes = [
  {
    id: 4,
    title: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    time: '30 min',
    difficulty: 'Medium',
    createdAt: '2025-01-20'
  },
  {
    id: 5,
    title: 'Beef Wellington',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80',
    time: '120 min',
    difficulty: 'Hard',
    createdAt: '2025-02-05'
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('myRecipes');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const fetchRecipes = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (activeTab === 'myRecipes') {
        setRecipes(mockUserRecipes);
      } else {
        setRecipes(mockFavoriteRecipes);
      }
      
      setLoading(false);
    };
    
    fetchRecipes();
  }, [activeTab]);
  
  const handleDeleteRecipe = (id) => {
    // This will be replaced with actual API call
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };
  
  return (
    <DashboardContainer>
      <Title>My Dashboard</Title>
      
      <StatsContainer>
        <StatCard>
          <StatIcon>📝</StatIcon>
          <StatValue>{mockUserRecipes.length}</StatValue>
          <StatLabel>My Recipes</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>❤️</StatIcon>
          <StatValue>{mockFavoriteRecipes.length}</StatValue>
          <StatLabel>Favorites</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>👁️</StatIcon>
          <StatValue>152</StatValue>
          <StatLabel>Recipe Views</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>⭐</StatIcon>
          <StatValue>4.8</StatValue>
          <StatLabel>Average Rating</StatLabel>
        </StatCard>
      </StatsContainer>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'myRecipes'} 
          onClick={() => setActiveTab('myRecipes')}
        >
          My Recipes
        </Tab>
        <Tab 
          active={activeTab === 'favorites'} 
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </Tab>
      </TabsContainer>
      
      {loading ? (
        <div>Loading...</div>
      ) : recipes.length > 0 ? (
        <RecipesGrid>
          {recipes.map(recipe => (
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
                  {activeTab === 'myRecipes' && (
                    <>
                      <ActionButton to={`/edit-recipe/${recipe.id}`}>Edit</ActionButton>
                      <ActionButton 
                        as="button" 
                        danger 
                        onClick={() => handleDeleteRecipe(recipe.id)}
                      >
                        Delete
                      </ActionButton>
                    </>
                  )}
                </RecipeActions>
              </RecipeContent>
            </RecipeCard>
          ))}
        </RecipesGrid>
      ) : (
        <EmptyState>
          <EmptyStateIcon>
            {activeTab === 'myRecipes' ? '📝' : '❤️'}
          </EmptyStateIcon>
          <EmptyStateText>
            {activeTab === 'myRecipes' 
              ? "You haven't created any recipes yet." 
              : "You haven't saved any favorites yet."}
          </EmptyStateText>
          {activeTab === 'myRecipes' && (
            <CreateButton to="/create-recipe">Create Recipe</CreateButton>
          )}
        </EmptyState>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
