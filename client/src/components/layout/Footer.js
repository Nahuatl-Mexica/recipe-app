import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.footerBackground};
  padding: 2rem;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Copyright = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <h3>Recipe App</h3>
        <Copyright>
          &copy; {new Date().getFullYear()} Recipe App. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
