import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.navBackground};
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin-left: 1.5rem;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ThemeToggle = styled.button`
  margin-left: 1.5rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Navbar = ({ toggleTheme, theme }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const authLinks = (
    <>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
    </>
  );

  const guestLinks = (
    <>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </>
  );

  return (
    <NavbarContainer>
      <NavContent>
        <Logo to="/">Recipe App</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          {!loading && (isAuthenticated ? authLinks : guestLinks)}
          <ThemeToggle onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </ThemeToggle>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
