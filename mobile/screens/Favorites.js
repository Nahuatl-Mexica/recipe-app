import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for initial development
  const mockFavorites = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df',
      time: '30 min',
      difficulty: 'Medium',
      category: 'Dinner'
    },
    {
      id: 4,
      title: 'Beef Wellington',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
      time: '120 min',
      difficulty: 'Hard',
      category: 'Dinner'
    },
    {
      id: 5,
      title: 'Greek Salad',
      image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74',
      time: '15 min',
      difficulty: 'Easy',
      category: 'Lunch'
    }
  ];

  useEffect(() => {
    // In a real app, we would fetch favorites from AsyncStorage and/or API
    const loadFavorites = async () => {
      setLoading(true);
      try {
        // Simulate loading from AsyncStorage
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For development, use mock data
        setFavorites(mockFavorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFavorites();
  }, []);

  const handleRemoveFavorite = (id) => {
    // In a real app, we would also update AsyncStorage and/or API
    setFavorites(favorites.filter(recipe => recipe.id !== id));
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeTime}>{item.time}</Text>
          <Text style={styles.recipeDifficulty}>{item.difficulty}</Text>
        </View>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => handleRemoveFavorite(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecipeItem}
          contentContainerStyle={styles.recipesList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>Save your favorite recipes for quick access</Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore Recipes</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#ff6b6b',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  recipesList: {
    padding: 15,
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 180,
  },
  recipeInfo: {
    padding: 15,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recipeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  recipeTime: {
    fontSize: 14,
    color: '#666',
  },
  recipeDifficulty: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Favorites;
