const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server/index');
const User = require('../server/models/User');
const Recipe = require('../server/models/Recipe');

let token;
let userId;
let recipeId;

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-app-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  // Clear test database
  await User.deleteMany({});
  await Recipe.deleteMany({});
});

afterAll(async () => {
  // Disconnect from test database
  await mongoose.connection.close();
});

describe('Auth API', () => {
  test('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });
  
  test('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
  
  test('should get user data with valid token', async () => {
    const res = await request(app)
      .get('/api/auth/user')
      .set('x-auth-token', token);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test User');
    expect(res.body).toHaveProperty('email', 'test@example.com');
    userId = res.body._id;
  });
  
  test('should not get user data with invalid token', async () => {
    const res = await request(app)
      .get('/api/auth/user')
      .set('x-auth-token', 'invalid-token');
    
    expect(res.statusCode).toEqual(401);
  });
});

describe('Recipe API', () => {
  test('should create a new recipe', async () => {
    const res = await request(app)
      .post('/api/recipes')
      .set('x-auth-token', token)
      .send({
        title: 'Test Recipe',
        description: 'This is a test recipe',
        prepTime: 10,
        cookTime: 20,
        servings: 4,
        difficulty: 'Easy',
        category: 'Dinner',
        ingredients: [
          { name: 'Ingredient 1', quantity: '1', unit: 'cup' },
          { name: 'Ingredient 2', quantity: '2', unit: 'tbsp' }
        ],
        instructions: [
          { step: 1, description: 'Step 1 description' },
          { step: 2, description: 'Step 2 description' }
        ]
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Test Recipe');
    expect(res.body).toHaveProperty('createdBy', userId);
    recipeId = res.body._id;
  });
  
  test('should get all recipes', async () => {
    const res = await request(app)
      .get('/api/recipes');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });
  
  test('should get recipe by ID', async () => {
    const res = await request(app)
      .get(`/api/recipes/${recipeId}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Test Recipe');
  });
  
  test('should update recipe', async () => {
    const res = await request(app)
      .put(`/api/recipes/${recipeId}`)
      .set('x-auth-token', token)
      .send({
        title: 'Updated Test Recipe',
        description: 'This is an updated test recipe'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Recipe');
    expect(res.body).toHaveProperty('description', 'This is an updated test recipe');
  });
  
  test('should rate recipe', async () => {
    const res = await request(app)
      .post(`/api/recipes/${recipeId}/rate`)
      .set('x-auth-token', token)
      .send({
        value: 5
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.ratings).toHaveLength(1);
    expect(res.body.ratings[0].value).toEqual(5);
  });
  
  test('should add recipe to favorites', async () => {
    const res = await request(app)
      .post(`/api/recipes/${recipeId}/favorite`)
      .set('x-auth-token', token);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toContain(recipeId);
  });
  
  test('should remove recipe from favorites', async () => {
    const res = await request(app)
      .delete(`/api/recipes/${recipeId}/favorite`)
      .set('x-auth-token', token);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).not.toContain(recipeId);
  });
  
  test('should delete recipe', async () => {
    const res = await request(app)
      .delete(`/api/recipes/${recipeId}`)
      .set('x-auth-token', token);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('msg', 'Recipe removed');
    
    // Verify recipe is deleted
    const checkRes = await request(app)
      .get(`/api/recipes/${recipeId}`);
    
    expect(checkRes.statusCode).toEqual(404);
  });
});

describe('User API', () => {
  test('should get user profile', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('x-auth-token', token);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test User');
  });
  
  test('should update user profile', async () => {
    const res = await request(app)
      .put('/api/users/profile')
      .set('x-auth-token', token)
      .send({
        name: 'Updated Test User'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Test User');
  });
  
  test('should get user recipes', async () => {
    // First create a new recipe
    const createRes = await request(app)
      .post('/api/recipes')
      .set('x-auth-token', token)
      .send({
        title: 'Another Test Recipe',
        description: 'This is another test recipe',
        prepTime: 15,
        cookTime: 25,
        servings: 2,
        difficulty: 'Medium',
        category: 'Lunch',
        ingredients: [
          { name: 'Ingredient 1', quantity: '1', unit: 'cup' }
        ],
        instructions: [
          { step: 1, description: 'Step 1 description' }
        ]
      });
    
    const res = await request(app)
      .get('/api/users/recipes')
      .set('x-auth-token', token);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('title', 'Another Test Recipe');
  });
});
