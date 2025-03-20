import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for initial development
  const mockRecipes = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df',
      time: '30 min',
      difficulty: 'Medium',
      category: 'Dinner'
    },
    {
      id: 2,
      title: 'Chicken Tikka Masala',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
      time: '45 min',
      difficulty: 'Medium',
      category: 'Dinner'
    },
    {
      id: 3,
      title: 'Avocado Toast',
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d',
      time: '10 min',
      difficulty: 'Easy',
      category: 'Breakfast'
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
    },
    {
      id: 6,
      title: 'Pancakes',
      image: 'https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7',
      time: '20 min',
      difficulty: 'Easy',
      category: 'Breakfast'
    },
    {
      id: 7,
      title: 'Caesar Salad',
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
      time: '15 min',
      difficulty: 'Easy',
      category: 'Lunch'
    }
  ];

  // Filter categories
  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];

  useEffect(() => {
    // Simulate API call with search and filter
    const searchRecipes = () => {
      setLoading(true);
      
      // Simulate network delay
      setTimeout(() => {
        let filteredResults = [...mockRecipes];
        
        // Apply category filter
        if (activeFilter !== 'All') {
          filteredResults = filteredResults.filter(
            recipe => recipe.category === activeFilter
          );
        }
        
        // Apply search query
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          filteredResults = filteredResults.filter(
            recipe => recipe.title.toLowerCase().includes(query)
          );
        }
        
        setResults(filteredResults);
        setLoading(false);
      }, 500);
    };
    
    searchRecipes();
  }, [searchQuery, activeFilter]);

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeTime}>{item.time}</Text>
          <Text style={styles.recipeDifficulty}>{item.difficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Recipes</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === item && styles.activeFilterButton
              ]}
              onPress={() => setActiveFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === item && styles.activeFilterText
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecipeItem}
          contentContainerStyle={styles.recipesList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No recipes found</Text>
          <Text style={styles.emptySubtext}>Try a different search or filter</Text>
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
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filtersContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeFilterButton: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  filterText: {
    color: '#666',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: 'bold',
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
  },
  recipeTime: {
    fontSize: 14,
    color: '#666',
  },
  recipeDifficulty: {
    fontSize: 14,
    color: '#666',
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
  },
});

export default Search;
