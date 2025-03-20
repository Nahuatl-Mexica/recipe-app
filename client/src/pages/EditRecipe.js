import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const EditRecipeContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: ${({ theme, secondary }) => secondary ? theme.secondary : theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-right: 1rem;
  
  &:hover {
    background-color: ${({ theme, secondary }) => secondary ? theme.secondaryHover : theme.primaryHover};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const IngredientsContainer = styled.div`
  margin-bottom: 1rem;
`;

const IngredientRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr auto;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.danger};
  color: white;
  border: none;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.dangerHover};
  }
`;

const AddButton = styled.button`
  background-color: ${({ theme }) => theme.success};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const InstructionsContainer = styled.div`
  margin-bottom: 1rem;
`;

const InstructionRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: start;
`;

const StepNumber = styled.div`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  border: 1px dashed ${({ theme }) => theme.border};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  background-size: cover;
  background-position: center;
  background-image: ${({ image }) => image ? `url(${image})` : 'none'};
`;

const UploadButton = styled.label`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.secondary};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondaryHover};
  }
  
  input {
    display: none;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.danger};
  color: white;
  padding: 0.8rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

// Mock data for initial development
const mockRecipeDetails = {
  id: 1,
  title: 'Homemade Pizza',
  description: 'A delicious homemade pizza with a crispy crust and your favorite toppings.',
  prepTime: 30,
  cookTime: 15,
  servings: 4,
  difficulty: 'Medium',
  category: 'Dinner',
  image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  ingredients: [
    { name: 'All-purpose flour', quantity: '2', unit: 'cups' },
    { name: 'Active dry yeast', quantity: '1', unit: 'tsp' },
    { name: 'Warm water', quantity: '3/4', unit: 'cup' },
    { name: 'Salt', quantity: '1', unit: 'tsp' },
    { name: 'Olive oil', quantity: '2', unit: 'tbsp' },
    { name: 'Tomato sauce', quantity: '1/2', unit: 'cup' },
    { name: 'Mozzarella cheese', quantity: '2', unit: 'cups' }
  ],
  instructions: [
    { 
      step: 1, 
      description: 'In a large bowl, combine flour, yeast, and salt. Add warm water and olive oil, and mix until a dough forms.',
      image: 'https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      step: 2, 
      description: 'Knead the dough on a floured surface for about 5 minutes until smooth and elastic.',
      image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      step: 3, 
      description: 'Place the dough in a greased bowl, cover, and let rise for 30 minutes.',
      image: 'https://images.unsplash.com/photo-1585478259715-4ddc6572df48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      step: 4, 
      description: 'Preheat oven to 475°F (245°C). Roll out the dough on a floured surface to your desired thickness.',
      image: 'https://images.unsplash.com/photo-1604908176997-125f7c9a1a5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      step: 5, 
      description: 'Transfer the dough to a pizza pan or baking sheet. Spread tomato sauce and sprinkle cheese on top.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    { 
      step: 6, 
      description: 'Bake for 12-15 minutes until the crust is golden and the cheese is bubbly.',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ],
  notes: 'For a crispier crust, preheat a pizza stone in the oven. You can add any toppings you like - pepperoni, mushrooms, bell peppers, or olives are great options!'
};

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // In a real app, we would fetch the recipe data based on the ID
  const [formData, setFormData] = useState(mockRecipeDetails);
  
  const { 
    title, 
    description, 
    prepTime, 
    cookTime, 
    servings, 
    difficulty, 
    category,
    image,
    ingredients, 
    instructions, 
    notes 
  } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };
  
  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...ingredients, { name: '', quantity: '', unit: '' }]
    });
  };
  
  const removeIngredient = index => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setFormData({ ...formData, ingredients: updatedIngredients });
  };
  
  const handleInstructionChange = (index, field, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index][field] = value;
    setFormData({ ...formData, instructions: updatedInstructions });
  };
  
  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...instructions, { step: instructions.length + 1, description: '', image: '' }]
    });
  };
  
  const removeInstruction = index => {
    const updatedInstructions = [...instructions];
    updatedInstructions.splice(index, 1);
    
    // Update step numbers
    updatedInstructions.forEach((instruction, i) => {
      instruction.step = i + 1;
    });
    
    setFormData({ ...formData, instructions: updatedInstructions });
  };
  
  const handleImageUpload = (e, index = null) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      if (index !== null) {
        // For instruction image
        const updatedInstructions = [...instructions];
        updatedInstructions[index].image = reader.result;
        setFormData({ ...formData, instructions: updatedInstructions });
      } else {
        // For main recipe image
        setFormData({ ...formData, image: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    
    // Validation
    if (!title || !description || !prepTime || !cookTime || !servings || !category) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (ingredients.some(ingredient => !ingredient.name || !ingredient.quantity)) {
      setError('Please fill in all ingredient fields');
      return;
    }
    
    if (instructions.some(instruction => !instruction.description)) {
      setError('Please fill in all instruction fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // This will be replaced with actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For development, just navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to update recipe');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <EditRecipeContainer>
      <Title>Edit Recipe</Title>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label htmlFor="title">Recipe Title*</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Enter recipe title"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="image">Recipe Image</Label>
          <ImagePreview image={image}>
            {!image && <span>No image selected</span>}
          </ImagePreview>
          <UploadButton>
            Upload Image
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </UploadButton>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">Description*</Label>
          <Textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            placeholder="Enter recipe description"
            required
          />
        </FormGroup>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormGroup>
            <Label htmlFor="prepTime">Preparation Time (minutes)*</Label>
            <Input
              type="number"
              id="prepTime"
              name="prepTime"
              value={prepTime}
              onChange={onChange}
              placeholder="Enter prep time"
              min="1"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="cookTime">Cooking Time (minutes)*</Label>
            <Input
              type="number"
              id="cookTime"
              name="cookTime"
              value={cookTime}
              onChange={onChange}
              placeholder="Enter cook time"
              min="0"
              required
            />
          </FormGroup>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <FormGroup>
            <Label htmlFor="servings">Servings*</Label>
            <Input
              type="number"
              id="servings"
              name="servings"
              value={servings}
              onChange={onChange}
              placeholder="Enter servings"
              min="1"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="difficulty">Difficulty*</Label>
            <Select
              id="difficulty"
              name="difficulty"
              value={difficulty}
              onChange={onChange}
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="category">Category*</Label>
            <Select
              id="category"
              name="category"
              value={category}
              onChange={onChange}
              required
            >
              <option value="">Select category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Dessert">Dessert</option>
              <option value="Snack">Snack</option>
              <option value="Drink">Drink</option>
            </Select>
          </FormGroup>
        </div>
        
        <FormGroup>
          <Label>Ingredients*</Label>
          <IngredientsContainer>
            {ingredients.map((ingredient, index) => (
              <IngredientRow key={index}>
                <Input
                  type="text"
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={e => handleIngredientChange(index, 'name', e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={e => handleIngredientChange(index, 'quantity', e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={e => handleIngredientChange(index, 'unit', e.target.value)}
                />
                {ingredients.length > 1 && (
                  <RemoveButton 
                    type="button" 
                    onClick={() => removeIngredient(index)}
                  >
                    ✕
                  </RemoveButton>
                )}
              </IngredientRow>
            ))}
          </IngredientsContainer>
          <AddButton type="button" onClick={addIngredient}>
            + Add Ingredient
          </AddButton>
        </FormGroup>
        
        <FormGroup>
          <Label>Instructions*</Label>
          <InstructionsContainer>
            {instructions.map((instruction, index) => (
              <InstructionRow key={index}>
                <StepNumber>{instruction.step}</StepNumber>
                <div>
                  <Textarea
                    placeholder="Instruction step"
                    value={instruction.description}
                    onChange={e => handleInstructionChange(index, 'description', e.target.value)}
                    required
                  />
                  <ImagePreview image={instruction.image}>
                    {!instruction.image && <span>No image selected</span>}
                  </ImagePreview>
                  <UploadButton>
                    Upload Step Image
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => handleImageUpload(e, index)} 
                    />
                  </UploadButton>
                </div>
                {instructions.length > 1 && (
                  <RemoveButton 
                    type="button" 
                    onClick={() => removeInstruction(index)}
                  >
                    ✕
                  </RemoveButton>
                )}
              </InstructionRow>
            ))}
          </InstructionsContainer>
          <AddButton type="button" onClick={addInstruction}>
            + Add Instruction
          </AddButton>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="notes">Chef's Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={onChange}
            placeholder="Enter additional notes or tips"
          />
        </FormGroup>
        
        <ButtonGroup>
          <Button 
            type="button" 
            secondary 
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Recipe'}
          </Button>
        </ButtonGroup>
      </Form>
    </EditRecipeContainer>
  );
};

export default EditRecipe;
