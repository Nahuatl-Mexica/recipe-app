const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET api/recipes
// @desc    Get all recipes
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const recipes = await Recipe.find(query)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name');
      
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/recipes/:id
// @desc    Get recipe by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('createdBy', 'name');
    
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/recipes
// @desc    Create a recipe
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
      category,
      tags,
      image,
      notes
    } = req.body;
    
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
      category,
      tags,
      image,
      notes,
      createdBy: req.user.id
    });
    
    const recipe = await newRecipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/recipes/:id
// @desc    Update a recipe
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    
    // Check user
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    const {
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
      category,
      tags,
      image,
      notes
    } = req.body;
    
    // Build recipe object
    const recipeFields = {};
    if (title) recipeFields.title = title;
    if (description) recipeFields.description = description;
    if (ingredients) recipeFields.ingredients = ingredients;
    if (instructions) recipeFields.instructions = instructions;
    if (prepTime) recipeFields.prepTime = prepTime;
    if (cookTime) recipeFields.cookTime = cookTime;
    if (servings) recipeFields.servings = servings;
    if (difficulty) recipeFields.difficulty = difficulty;
    if (category) recipeFields.category = category;
    if (tags) recipeFields.tags = tags;
    if (image) recipeFields.image = image;
    if (notes) recipeFields.notes = notes;
    recipeFields.updatedAt = Date.now();
    
    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: recipeFields },
      { new: true }
    );
    
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/recipes/:id
// @desc    Delete a recipe
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    
    // Check user
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    await Recipe.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Recipe removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/recipes/:id/rate
// @desc    Rate a recipe
// @access  Private
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const { value } = req.body;
    
    if (value < 1 || value > 5) {
      return res.status(400).json({ msg: 'Rating must be between 1 and 5' });
    }
    
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    
    // Check if user already rated
    const ratingIndex = recipe.ratings.findIndex(
      rating => rating.user.toString() === req.user.id
    );
    
    if (ratingIndex !== -1) {
      // Update existing rating
      recipe.ratings[ratingIndex].value = value;
    } else {
      // Add new rating
      recipe.ratings.push({ user: req.user.id, value });
    }
    
    await recipe.save();
    
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/recipes/:id/favorite
// @desc    Add recipe to favorites
// @access  Private
router.post('/:id/favorite', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    
    // Check if already in favorites
    if (user.favorites.includes(req.params.id)) {
      return res.status(400).json({ msg: 'Recipe already in favorites' });
    }
    
    user.favorites.push(req.params.id);
    await user.save();
    
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/recipes/:id/favorite
// @desc    Remove recipe from favorites
// @access  Private
router.delete('/:id/favorite', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Remove from favorites
    user.favorites = user.favorites.filter(
      favorite => favorite.toString() !== req.params.id
    );
    
    await user.save();
    
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
