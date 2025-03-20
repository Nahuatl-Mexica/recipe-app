import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  // Mock user data for initial development
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    recipeCount: 12,
    favoriteCount: 24
  };

  useEffect(() => {
    // In a real app, we would fetch user data from AsyncStorage and/or API
    const loadUserData = async () => {
      setLoading(true);
      try {
        // Simulate loading from AsyncStorage
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Load theme preference
        const savedDarkMode = await AsyncStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
          setDarkMode(JSON.parse(savedDarkMode));
        }
        
        // Load offline mode preference
        const savedOfflineMode = await AsyncStorage.getItem('offlineMode');
        if (savedOfflineMode !== null) {
          setOfflineMode(JSON.parse(savedOfflineMode));
        }
        
        // For development, use mock data
        setUser(mockUser);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, []);

  const toggleDarkMode = async (value) => {
    setDarkMode(value);
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(value));
      // In a real app, we would also update the app's theme
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  const toggleOfflineMode = async (value) => {
    setOfflineMode(value);
    try {
      await AsyncStorage.setItem('offlineMode', JSON.stringify(value));
      // In a real app, we would also update the app's network behavior
    } catch (error) {
      console.error('Error saving offline mode preference:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // In a real app, we would clear auth token and user data
      await AsyncStorage.removeItem('token');
      // Navigate to login screen
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
      </View>
      
      <ScrollView>
        <View style={styles.profileSection}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.recipeCount}</Text>
              <Text style={styles.statLabel}>Recipes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.favoriteCount}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#e0e0e0', true: '#ff6b6b' }}
              thumbColor={darkMode ? '#fff' : '#fff'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Offline Mode</Text>
            <Switch
              value={offlineMode}
              onValueChange={toggleOfflineMode}
              trackColor={{ false: '#e0e0e0', true: '#ff6b6b' }}
              thumbColor={offlineMode ? '#fff' : '#fff'}
            />
          </View>
          
          <Text style={styles.settingDescription}>
            Offline mode will download your favorite recipes for access without internet connection.
          </Text>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  settingsSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    fontStyle: 'italic',
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Profile;
