import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  margin: 0;
  color: ${({ theme }) => theme.primary};
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <Title>Page Not Found</Title>
      <Description>
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </Description>
      <HomeButton to="/">Back to Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;
