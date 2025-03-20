import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-family: inherit;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary};
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .btn {
    display: inline-block;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    text-align: center;
    transition: all 0.3s ease;
    
    &-primary {
      background-color: ${({ theme }) => theme.primary};
      color: white;
      
      &:hover {
        background-color: ${({ theme }) => theme.primaryHover};
      }
    }
    
    &-secondary {
      background-color: ${({ theme }) => theme.secondary};
      color: white;
      
      &:hover {
        background-color: ${({ theme }) => theme.secondaryHover};
      }
    }
    
    &-danger {
      background-color: ${({ theme }) => theme.danger};
      color: white;
      
      &:hover {
        background-color: ${({ theme }) => theme.dangerHover};
      }
    }
  }

  .card {
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
  }

  .form-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    input, textarea, select {
      width: 100%;
    }
  }

  .alert {
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    
    &-success {
      background-color: ${({ theme }) => theme.success};
      color: white;
    }
    
    &-danger {
      background-color: ${({ theme }) => theme.danger};
      color: white;
    }
    
    &-warning {
      background-color: ${({ theme }) => theme.warning};
      color: white;
    }
    
    &-info {
      background-color: ${({ theme }) => theme.info};
      color: white;
    }
  }
`;
