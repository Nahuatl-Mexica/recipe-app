import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { View, Text, StyleSheet } from 'react-native';

// Import screens
import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';
import FavoritesScreen from './screens/Favorites';
import ProfileScreen from './screens/Profile';
import RecipeDetailScreen from './screens/RecipeDetail';
import OfflineManagerScreen from './screens/OfflineManager';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home stack navigator
const HomeStack = () => {
  const { theme } = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Recipe App' }} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Recipe' }} />
    </Stack.Navigator>
  );
};

// Search stack navigator
const SearchStack = () => {
  const { theme } = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'Search' }} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Recipe' }} />
    </Stack.Navigator>
  );
};

// Favorites stack navigator
const FavoritesStack = () => {
  const { theme } = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ title: 'Favorites' }} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Recipe' }} />
    </Stack.Navigator>
  );
};

// Profile stack navigator
const ProfileStack = () => {
  const { theme } = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="OfflineManager" component={OfflineManagerScreen} options={{ title: 'Offline Access' }} />
    </Stack.Navigator>
  );
};

// Tab icon component
const TabIcon = ({ focused, color, name }) => {
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIconText, { color }]}>{name}</Text>
    </View>
  );
};

// Main app component
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

// App content with theme context
const AppContent = () => {
  const { theme } = useTheme();
  
  return (
    <NavigationContainer
      theme={{
        dark: theme === 'dark',
        colors: {
          primary: theme.primary,
          background: theme.background,
          card: theme.cardBackground,
          text: theme.text,
          border: theme.border,
          notification: theme.primary,
        },
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.cardBackground,
            borderTopColor: theme.border,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon focused={focused} color={color} name="🏠" />
            ),
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={SearchStack} 
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon focused={focused} color={color} name="🔍" />
            ),
          }}
        />
        <Tab.Screen 
          name="Favorites" 
          component={FavoritesStack} 
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon focused={focused} color={color} name="❤️" />
            ),
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileStack} 
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon focused={focused} color={color} name="👤" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconText: {
    fontSize: 20,
  },
});

export default App;
