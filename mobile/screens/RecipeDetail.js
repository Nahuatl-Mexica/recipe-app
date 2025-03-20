import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const RecipeDetail = ({ route }) => {
  // In a real app, we would get the recipe from route.params
  // For now, using mock data
  const recipe = {
    id: 1,
    title: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df',
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { name: 'Spaghetti', quantity: '400', unit: 'g' },
      { name: 'Pancetta', quantity: '150', unit: 'g' },
      { name: 'Egg yolks', quantity: '4', unit: '' },
      { name: 'Parmesan cheese', quantity: '50', unit: 'g' },
      { name: 'Black pepper', quantity: '1', unit: 'tsp' },
      { name: 'Salt', quantity: '', unit: 'to taste' }
    ],
    instructions: [
      { 
        step: 1, 
        description: 'Bring a large pot of salted water to boil and cook spaghetti according to package instructions.',
        image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77'
      },
      { 
        step: 2, 
        description: 'Meanwhile, cook pancetta in a large skillet over medium heat until crispy, about 5 minutes.',
        image: 'https://images.unsplash.com/photo-1590483736622-39da8acf7eb8'
      },
      { 
        step: 3, 
        description: 'In a bowl, whisk together egg yolks, grated parmesan, and black pepper.',
        image: 'https://images.unsplash.com/photo-1607116667981-ff148a4e534b'
      },
      { 
        step: 4, 
        description: 'Drain pasta, reserving 1/2 cup of pasta water. Add pasta to the skillet with pancetta.',
        image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41'
      },
      { 
        step: 5, 
        description: 'Remove skillet from heat and quickly stir in egg mixture, tossing constantly. Add pasta water as needed to create a creamy sauce.',
        image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df'
      }
    ],
    notes: 'For an authentic carbonara, never add cream. The creaminess comes from the eggs and cheese.'
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [showIngredients, setShowIngredients] = useState(false);

  // For step-by-step view (0 = overview, 1+ = instruction steps)
  const totalSteps = recipe.instructions.length;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  // Render overview screen
  const renderOverview = () => (
    <ScrollView>
      <Image source={{ uri: recipe.image }} style={styles.headerImage} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Prep Time</Text>
            <Text style={styles.infoValue}>{recipe.prepTime} min</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Cook Time</Text>
            <Text style={styles.infoValue}>{recipe.cookTime} min</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Servings</Text>
            <Text style={styles.infoValue}>{recipe.servings}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Difficulty</Text>
            <Text style={styles.infoValue}>{recipe.difficulty}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Text style={styles.ingredientName}>{ingredient.name}</Text>
              <Text style={styles.ingredientAmount}>
                {ingredient.quantity} {ingredient.unit}
              </Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => setCurrentStep(1)}
        >
          <Text style={styles.startButtonText}>Start Cooking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Render step-by-step instruction
  const renderStep = () => {
    const stepIndex = currentStep - 1;
    const step = recipe.instructions[stepIndex];
    
    return (
      <View style={styles.stepContainer}>
        <Image source={{ uri: step.image }} style={styles.stepImage} />
        
        <View style={styles.stepContent}>
          <View style={styles.stepHeader}>
            <Text style={styles.stepNumber}>Step {step.step}</Text>
            <TouchableOpacity 
              style={styles.ingredientsButton}
              onPress={toggleIngredients}
            >
              <Text style={styles.ingredientsButtonText}>
                {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
              </Text>
            </TouchableOpacity>
          </View>
          
          {showIngredients && (
            <View style={styles.ingredientsPanel}>
              {recipe.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.ingredientText}>
                  • {ingredient.name} ({ingredient.quantity} {ingredient.unit})
                </Text>
              ))}
            </View>
          )}
          
          <Text style={styles.stepDescription}>{step.description}</Text>
          
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(currentStep / totalSteps) * 100}%` }
              ]} 
            />
          </View>
          
          <Text style={styles.progressText}>
            {currentStep} of {totalSteps}
          </Text>
          
          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={[styles.navButton, styles.prevButton]}
              onPress={handlePrevious}
              disabled={currentStep === 1}
            >
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
            
            {currentStep < totalSteps ? (
              <TouchableOpacity 
                style={[styles.navButton, styles.nextButton]}
                onPress={handleNext}
              >
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.navButton, styles.finishButton]}
                onPress={() => setCurrentStep(0)}
              >
                <Text style={styles.navButtonText}>Finish</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentStep === 0 ? renderOverview() : renderStep()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ingredientName: {
    fontSize: 16,
  },
  ingredientAmount: {
    fontSize: 16,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContainer: {
    flex: 1,
  },
  stepImage: {
    width: '100%',
    height: 300,
  },
  stepContent: {
    flex: 1,
    padding: 20,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ingredientsButton: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 5,
  },
  ingredientsButtonText: {
    color: '#ff6b6b',
    fontWeight: '500',
  },
  ingredientsPanel: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  ingredientText: {
    fontSize: 14,
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 30,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff6b6b',
    borderRadius: 3,
  },
  progressText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
  },
  prevButton: {
    backgroundColor: '#f8f9fa',
  },
  nextButton: {
    backgroundColor: '#ff6b6b',
  },
  finishButton: {
    backgroundColor: '#4caf50',
  },
  navButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RecipeDetail;
