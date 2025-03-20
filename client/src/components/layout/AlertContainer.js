import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { removeAlert } from '../../redux/actions/authActions';

const AlertWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
`;

const Alert = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return theme.success;
      case 'danger':
        return theme.danger;
      case 'warning':
        return theme.warning;
      case 'info':
        return theme.info;
      default:
        return theme.info;
    }
  }};
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 1rem;
`;

const AlertContainer = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(state => state.alert.alerts);
  
  const handleRemoveAlert = (id) => {
    dispatch(removeAlert(id));
  };
  
  return (
    <AlertWrapper>
      {alerts.map(alert => (
        <Alert key={alert.id} type={alert.type}>
          <span>{alert.msg}</span>
          <CloseButton onClick={() => handleRemoveAlert(alert.id)}>×</CloseButton>
        </Alert>
      ))}
    </AlertWrapper>
  );
};

export default AlertContainer;
