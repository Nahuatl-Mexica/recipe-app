import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hero = styled.div`
  width: 100%;
  height: 400px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const SearchBar = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

const RecipesSection = styled.section`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const RecipeGrid = styled.div`
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

const RecipeDescription = styled.p`
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const ViewButton = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

const FilterSection = styled.div`
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
const mockRecipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    time: '30 min',
    difficulty: 'Medium',
    description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.'
  },
  {
    id: 2,
    title: 'Chicken Tikka Masala',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    time: '45 min',
    difficulty: 'Medium',
    description: 'Grilled chicken chunks in a creamy sauce with Indian spices.'
  },
  {
    id: 3,
    title: 'Avocado Toast',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
    time: '10 min',
    difficulty: 'Easy',
    description: 'Simple and nutritious breakfast with mashed avocado on toasted bread.'
  },
  {
    id: 4,
    title: 'Beef Wellington',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80',
    time: '120 min',
    difficulty: 'Hard',
    description: 'A classic dish of filet steak coated with pâté and duxelles, wrapped in puff pastry.'
  },
  {
    id: 5,
    title: 'Greek Salad',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    time: '15 min',
    difficulty: 'Easy',
    description: 'Fresh salad with tomatoes, cucumber, olives, feta cheese, and olive oil.'
  },
  {
    id: 6,
    title: 'Chocolate Brownies',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
    time: '40 min',
    difficulty: 'Medium',
    description: 'Rich and fudgy chocolate brownies with a crackly top.'
  }
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Will be implemented with actual API calls
    console.log('Searching for:', searchTerm);
  };
  
  return (
    <HomeContainer>
      <Hero>
        <HeroTitle>Discover Delicious Recipes</HeroTitle>
        <HeroSubtitle>
          Find and share the best recipes from around the world
        </HeroSubtitle>
        <SearchBar>
          <SearchInput 
            type="text" 
            placeholder="Search for recipes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SearchBar>
      </Hero>
      
      <RecipesSection>
        <SectionTitle>Popular Recipes</SectionTitle>
        
        <FilterSection>
          <FilterButton 
            active={activeFilter === 'All'} 
            onClick={() => setActiveFilter('All')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'Easy'} 
            onClick={() => setActiveFilter('Easy')}
          >
            Easy
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'Medium'} 
            onClick={() => setActiveFilter('Medium')}
          >
            Medium
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'Hard'} 
            onClick={() => setActiveFilter('Hard')}
          >
            Hard
          </FilterButton>
        </FilterSection>
        
        <RecipeGrid>
          {mockRecipes
            .filter(recipe => activeFilter === 'All' || recipe.difficulty === activeFilter)
            .map(recipe => (
              <RecipeCard key={recipe.id}>
                <RecipeImage src={recipe.image} alt={recipe.title} />
                <RecipeContent>
                  <RecipeTitle>{recipe.title}</RecipeTitle>
                  <RecipeInfo>
                    <span>⏱️ {recipe.time}</span>
                    <span>🔥 {recipe.difficulty}</span>
                  </RecipeInfo>
                  <RecipeDescription>{recipe.description}</RecipeDescription>
                  <ViewButton to={`/recipe/${recipe.id}`}>View Recipe</ViewButton>
                </RecipeContent>
              </RecipeCard>
            ))}
        </RecipeGrid>
      </RecipesSection>
    </HomeContainer>
  );
};

export default Home;
