import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const RecipeDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
`;

const RecipeHeader = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const RecipeInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  border-radius: 0 0 8px 8px;
`;

const RecipeTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const RecipeMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RecipeActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme, primary }) => primary ? theme.primary : 'transparent'};
  color: ${({ theme, primary }) => primary ? 'white' : theme.text};
  border: ${({ theme, primary }) => primary ? 'none' : `1px solid ${theme.border}`};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme, primary }) => primary ? theme.primaryHover : theme.border};
  }
`;

const RecipeContent = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RecipeIngredients = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
`;

const IngredientsTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IngredientsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const IngredientItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const RecipeInstructions = styled.div`
  flex: 2;
`;

const InstructionsTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StepItem = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
`;

const StepHeader = styled.div`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.5rem 1rem;
  font-weight: 500;
`;

const StepContent = styled.div`
  padding: 1.5rem;
`;

const StepImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 4px;
`;

const StepDescription = styled.p`
  line-height: 1.6;
`;

const RecipeNotes = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  margin-bottom: 2rem;
`;

const NotesTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NotesContent = styled.p`
  line-height: 1.6;
`;

// Mock data for initial development
const mockRecipeDetails = {
  id: 1,
  title: 'Spaghetti Carbonara',
  image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  time: '30 min',
  servings: 4,
  difficulty: 'Medium',
  rating: 4.8,
  isFavorite: false,
  ingredients: [
    { name: 'Spaghetti', quantity: '400', unit: 'g' },
    { name: 'Pancetta or Guanciale', quantity: '150', unit: 'g' },
    { name: 'Eggs', quantity: '3', unit: 'large' },
    { name: 'Egg Yolks', quantity: '2', unit: '' },
    { name: 'Pecorino Romano', quantity: '50', unit: 'g' },
    { name: 'Parmesan', quantity: '50', unit: 'g' },
    { name: 'Black Pepper', quantity: '2', unit: 'tsp' },
    { name: 'Salt', quantity: '', unit: 'to taste' }
  ],
  instructions: [
    {
      step: 1,
      description: 'Bring a large pot of salted water to boil. Add the spaghetti and cook until al dente according to package instructions.',
      image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
    },
    {
      step: 2,
      description: 'While the pasta is cooking, cut the pancetta into small cubes. Cook in a large skillet over medium heat until crispy, about 5-7 minutes.',
      image: 'https://images.unsplash.com/photo-1600803907087-f56d462fd26b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      step: 3,
      description: 'In a bowl, whisk together the eggs, egg yolks, grated Pecorino Romano, and Parmesan. Season with black pepper.',
      image: 'https://images.unsplash.com/photo-1607116667981-ff148a4e533c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      step: 4,
      description: 'When the pasta is done, reserve 1 cup of the pasta water, then drain the pasta.',
      image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      step: 5,
      description: 'Add the hot pasta to the skillet with the pancetta. Toss to combine.',
      image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      step: 6,
      description: 'Remove the skillet from the heat and quickly pour in the egg mixture, stirring constantly. The residual heat will cook the eggs, creating a creamy sauce. If needed, add a splash of the reserved pasta water to loosen the sauce.',
      image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      step: 7,
      description: 'Serve immediately, topped with additional grated cheese and freshly ground black pepper.',
      image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    }
  ],
  notes: 'The key to a perfect carbonara is working quickly once the pasta is done. The heat from the pasta cooks the egg mixture, but if it's too hot, the eggs will scramble. If it's not hot enough, the sauce will be too runny. Practice makes perfect!'
};

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(mockRecipeDetails);
  const [currentStep, setCurrentStep] = useState(0);
  
  const toggleFavorite = () => {
    setRecipe({
      ...recipe,
      isFavorite: !recipe.isFavorite
    });
  };
  
  return (
    <RecipeDetailContainer>
      <RecipeHeader>
        <RecipeImage src={recipe.image} alt={recipe.title} />
        <RecipeInfo>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <RecipeMeta>
            <MetaItem>
              <span>⏱️</span>
              <span>{recipe.time}</span>
            </MetaItem>
            <MetaItem>
              <span>👥</span>
              <span>{recipe.servings} servings</span>
            </MetaItem>
            <MetaItem>
              <span>🔥</span>
              <span>{recipe.difficulty}</span>
            </MetaItem>
            <MetaItem>
              <span>⭐</span>
              <span>{recipe.rating}</span>
            </MetaItem>
          </RecipeMeta>
        </RecipeInfo>
      </RecipeHeader>
      
      <RecipeActions>
        <ActionButton primary onClick={toggleFavorite}>
          <span>{recipe.isFavorite ? '❤️' : '🤍'}</span>
          <span>{recipe.isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}</span>
        </ActionButton>
        <ActionButton>
          <span>🖨️</span>
          <span>Print Recipe</span>
        </ActionButton>
        <ActionButton>
          <span>📤</span>
          <span>Share</span>
        </ActionButton>
      </RecipeActions>
      
      <RecipeContent>
        <RecipeIngredients>
          <IngredientsTitle>
            <span>🛒</span>
            <span>Ingredients</span>
          </IngredientsTitle>
          <IngredientsList>
            {recipe.ingredients.map((ingredient, index) => (
              <IngredientItem key={index}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </IngredientItem>
            ))}
          </IngredientsList>
        </RecipeIngredients>
        
        <RecipeInstructions>
          <InstructionsTitle>Instructions</InstructionsTitle>
          <StepsList>
            {recipe.instructions.map((instruction) => (
              <StepItem key={instruction.step}>
                <StepHeader>Step {instruction.step}</StepHeader>
                <StepContent>
                  <StepImage src={instruction.image} alt={`Step ${instruction.step}`} />
                  <StepDescription>{instruction.description}</StepDescription>
                </StepContent>
              </StepItem>
            ))}
          </StepsList>
        </RecipeInstructions>
      </RecipeContent>
      
      <RecipeNotes>
        <NotesTitle>
          <span>📝</span>
          <span>Chef's Notes</span>
        </NotesTitle>
        <NotesContent>{recipe.notes}</NotesContent>
      </RecipeNotes>
    </RecipeDetailContainer>
  );
};

export default RecipeDetail;
