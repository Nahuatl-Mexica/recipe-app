import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define theme colors
const lightTheme = {
  background: '#f8f9fa',
  cardBackground: '#ffffff',
  primary: '#ff6b6b',
  primaryHover: '#ff5252',
  secondary: '#4ecdc4',
  secondaryHover: '#3dbdb4',
  text: '#333333',
  textSecondary: '#666666',
  border: '#e0e0e0',
  shadow: 'rgba(0, 0, 0, 0.1)',
  success: '#4caf50',
  successHover: '#43a047',
  warning: '#ff9800',
  warningHover: '#fb8c00',
  danger: '#f44336',
  dangerHover: '#e53935',
  info: '#2196f3',
  infoHover: '#1e88e5',
  inputBackground: '#ffffff',
};

const darkTheme = {
  background: '#121212',
  cardBackground: '#1e1e1e',
  primary: '#ff6b6b',
  primaryHover: '#ff5252',
  secondary: '#4ecdc4',
  secondaryHover: '#3dbdb4',
  text: '#f5f5f5',
  textSecondary: '#b0b0b0',
  border: '#333333',
  shadow: 'rgba(0, 0, 0, 0.3)',
  success: '#4caf50',
  successHover: '#43a047',
  warning: '#ff9800',
  warningHover: '#fb8c00',
  danger: '#f44336',
  dangerHover: '#e53935',
  info: '#2196f3',
  infoHover: '#1e88e5',
  inputBackground: '#2c2c2c',
};

// Create context
export const ThemeContext = React.createContext({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [isDark, setIsDark] = useState(false);

  // Load theme preference from storage
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('darkMode');
        
        if (savedTheme !== null) {
          setIsDark(JSON.parse(savedTheme));
        } else {
          // Use device theme as default if no saved preference
          setIsDark(deviceTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
        // Fallback to device theme
        setIsDark(deviceTheme === 'dark');
      }
    };
    
    loadThemePreference();
  }, [deviceTheme]);

  // Toggle theme function
  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('darkMode', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Current theme based on dark mode state
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => React.useContext(ThemeContext);
