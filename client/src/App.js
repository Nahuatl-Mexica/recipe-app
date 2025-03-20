import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadUser } from './redux/actions/authActions';
import { setAuthToken } from './redux/actions/authActions';
import axios from 'axios';

// Set base URL for API requests
axios.defaults.baseURL = 'http://localhost:5000';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';
import AlertContainer from './components/layout/AlertContainer';

// Pages
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for token in storage
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <AlertContainer />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/create-recipe" element={
              <PrivateRoute>
                <CreateRecipe />
              </PrivateRoute>
            } />
            <Route path="/edit-recipe/:id" element={
              <PrivateRoute>
                <EditRecipe />
              </PrivateRoute>
            } />
            <Route path="/favorites" element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
