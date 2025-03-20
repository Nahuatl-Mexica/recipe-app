import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const OfflineManager = () => {
  const [recipes, setRecipes] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle', 'syncing', 'success', 'error'
  const [offlineEnabled, setOfflineEnabled] = useState(false);
  const [storageInfo, setStorageInfo] = useState({ used: 0, total: 0 });

  // Mock data for initial development
  const mockRecipes = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df',
      time: '30 min',
      difficulty: 'Medium',
      category: 'Dinner',
      downloaded: true
    },
    {
      id: 2,
      title: 'Chicken Tikka Masala',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
      time: '45 min',
      difficulty: 'Medium',
      category: 'Dinner',
      downloaded: false
    },
    {
      id: 3,
      title: 'Avocado Toast',
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d',
      time: '10 min',
      difficulty: 'Easy',
      category: 'Breakfast',
      downloaded: true
    },
    {
      id: 4,
      title: 'Beef Wellington',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
      time: '120 min',
      difficulty: 'Hard',
      category: 'Dinner',
      downloaded: false
    }
  ];

  useEffect(() => {
    // Check network connectivity
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Load offline mode preference
    const loadOfflinePreference = async () => {
      try {
        const savedOfflineMode = await AsyncStorage.getItem('offlineMode');
        if (savedOfflineMode !== null) {
          setOfflineEnabled(JSON.parse(savedOfflineMode));
        }
      } catch (error) {
        console.error('Error loading offline mode preference:', error);
      }
    };

    // Load downloaded recipes
    const loadRecipes = async () => {
      try {
        // In a real app, we would load from AsyncStorage
        // For development, use mock data
        setRecipes(mockRecipes);
        
        // Simulate storage usage calculation
        setStorageInfo({
          used: 25.7, // MB
          total: 100 // MB
        });
      } catch (error) {
        console.error('Error loading recipes:', error);
      }
    };

    loadOfflinePreference();
    loadRecipes();

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleOfflineMode = async (value) => {
    setOfflineEnabled(value);
    try {
      await AsyncStorage.setItem('offlineMode', JSON.stringify(value));
      
      if (value && !isConnected) {
        Alert.alert(
          'Offline Mode Enabled',
          'You are currently offline. Recipes will be downloaded when you reconnect.'
        );
      } else if (value) {
        setSyncStatus('syncing');
        // Simulate download process
        setTimeout(() => {
          setSyncStatus('success');
        }, 2000);
      }
    } catch (error) {
      console.error('Error saving offline mode preference:', error);
    }
  };

  const toggleRecipeDownload = async (id) => {
    try {
      const updatedRecipes = recipes.map(recipe => {
        if (recipe.id === id) {
          return { ...recipe, downloaded: !recipe.downloaded };
        }
        return recipe;
      });
      
      setRecipes(updatedRecipes);
      
      // In a real app, we would update AsyncStorage
      // and download/remove the recipe data
      
      // Simulate storage recalculation
      const downloadedCount = updatedRecipes.filter(r => r.downloaded).length;
      setStorageInfo({
        used: downloadedCount * 8.5, // Simulate ~8.5MB per recipe
        total: 100
      });
    } catch (error) {
      console.error('Error toggling recipe download:', error);
    }
  };

  const syncAllRecipes = () => {
    if (!isConnected) {
      Alert.alert(
        'No Connection',
        'You are currently offline. Please connect to the internet to sync recipes.'
      );
      return;
    }
    
    setSyncStatus('syncing');
    
    // Simulate sync process
    setTimeout(() => {
      const updatedRecipes = recipes.map(recipe => ({
        ...recipe,
        downloaded: true
      }));
      
      setRecipes(updatedRecipes);
      setStorageInfo({
        used: updatedRecipes.length * 8.5,
        total: 100
      });
      
      setSyncStatus('success');
    }, 2000);
  };

  const clearAllDownloads = () => {
    Alert.alert(
      'Clear Downloads',
      'Are you sure you want to remove all downloaded recipes?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Clear',
          onPress: () => {
            const updatedRecipes = recipes.map(recipe => ({
              ...recipe,
              downloaded: false
            }));
            
            setRecipes(updatedRecipes);
            setStorageInfo({
              used: 0,
              total: 100
            });
          },
          style: 'destructive'
        }
      ]
    );
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeTime}>{item.time}</Text>
          <Text style={styles.recipeDifficulty}>{item.difficulty}</Text>
        </View>
        <TouchableOpacity 
          style={[
            styles.downloadButton,
            item.downloaded ? styles.downloadedButton : {}
          ]}
          onPress={() => toggleRecipeDownload(item.id)}
        >
          <Text style={styles.downloadButtonText}>
            {item.downloaded ? 'Remove Download' : 'Download'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Offline Access</Text>
      </View>
      
      <View style={styles.statusBar}>
        <View style={styles.connectionStatus}>
          <View style={[
            styles.statusIndicator,
            isConnected ? styles.connectedIndicator : styles.disconnectedIndicator
          ]} />
          <Text style={styles.statusText}>
            {isConnected ? 'Online' : 'Offline'}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.syncButton,
            syncStatus === 'syncing' ? styles.syncingButton : {}
          ]}
          onPress={syncAllRecipes}
          disabled={syncStatus === 'syncing' || !isConnected}
        >
          <Text style={styles.syncButtonText}>
            {syncStatus === 'syncing' ? 'Syncing...' : 'Sync All'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.storageInfo}>
        <Text style={styles.storageText}>
          Storage Used: {storageInfo.used.toFixed(1)}MB / {storageInfo.total}MB
        </Text>
        <View style={styles.storageBar}>
          <View 
            style={[
              styles.storageUsed,
              { width: `${(storageInfo.used / storageInfo.total) * 100}%` }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.offlineToggle}>
        <Text style={styles.offlineText}>Enable Offline Mode</Text>
        <TouchableOpacity 
          style={[
            styles.toggleButton,
            offlineEnabled ? styles.toggleActive : {}
          ]}
          onPress={() => toggleOfflineMode(!offlineEnabled)}
        >
          <View style={[
            styles.toggleIndicator,
            offlineEnabled ? styles.toggleIndicatorActive : {}
          ]} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.sectionTitle}>Downloaded Recipes</Text>
      
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipeItem}
        contentContainerStyle={styles.recipesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No downloaded recipes</Text>
            <Text style={styles.emptySubtext}>Download recipes for offline access</Text>
          </View>
        }
      />
      
      {recipes.some(r => r.downloaded) && (
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={clearAllDownloads}
        >
          <Text style={styles.clearButtonText}>Clear All Downloads</Text>
        </TouchableOpacity>
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
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  connectedIndicator: {
    backgroundColor: '#4caf50',
  },
  disconnectedIndicator: {
    backgroundColor: '#f44336',
  },
  statusText: {
    fontSize: 16,
  },
  syncButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  syncingButton: {
    backgroundColor: '#999',
  },
  syncButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  storageInfo: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  storageText: {
    fontSize: 14,
    marginBottom: 8,
  },
  storageBar: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
  },
  storageUsed: {
    height: '100%',
    backgroundColor: '#ff6b6b',
    borderRadius: 3,
  },
  offlineToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  offlineText: {
    fontSize: 16,
  },
  toggleButton: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#ff6b6b',
  },
  toggleIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  toggleIndicatorActive: {
    transform: [{ translateX: 22 }],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
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
    height: 150,
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
  downloadButton: {
    backgroundColor: '#ff6b6b',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  downloadedButton: {
    backgroundColor: '#4caf50',
  },
  downloadButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
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
  clearButton: {
    backgroundColor: '#f44336',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OfflineManager;
