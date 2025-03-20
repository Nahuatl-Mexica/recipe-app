const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  prepTime: {
    type: Number,
    required: true
  },
  cookTime: {
    type: Number,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  category: {
    type: String,
    required: true
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    unit: {
      type: String
    }
  }],
  instructions: [{
    step: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String
    }
  }],
  image: {
    type: String
  },
  notes: {
    type: String
  },
  tags: [{
    type: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    value: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate average rating before saving
RecipeSchema.pre('save', function(next) {
  if (this.ratings && this.ratings.length > 0) {
    this.averageRating = this.ratings.reduce((acc, curr) => acc + curr.value, 0) / this.ratings.length;
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Recipe', RecipeSchema);
