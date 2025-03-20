import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
  recipe: null,
  loading: true,
  error: null
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    getRecipes: (state, action) => {
      state.recipes = action.payload;
      state.loading = false;
    },
    getRecipe: (state, action) => {
      state.recipe = action.payload;
      state.loading = false;
    },
    addRecipe: (state, action) => {
      state.recipes = [action.payload, ...state.recipes];
      state.loading = false;
    },
    updateRecipe: (state, action) => {
      state.recipes = state.recipes.map(recipe => 
        recipe._id === action.payload._id ? action.payload : recipe
      );
      state.loading = false;
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter(recipe => recipe._id !== action.payload);
      state.loading = false;
    },
    recipeError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearRecipe: (state) => {
      state.recipe = null;
    }
  }
});

export const { 
  getRecipes, 
  getRecipe, 
  addRecipe, 
  updateRecipe, 
  deleteRecipe, 
  recipeError,
  clearRecipe
} = recipeSlice.actions;

export default recipeSlice.reducer;
