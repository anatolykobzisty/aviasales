import React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as Logo } from '../img/logo.svg';

const StyledHeader = styled.header`
  display: flex;
  height: 160px;
  justify-content: center;
  align-items: center;
`;

const Header = () => (
  <StyledHeader>
    <Logo />
  </StyledHeader>
);
export default Header;
