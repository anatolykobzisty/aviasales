import React from 'react';
import styled from 'styled-components/macro';

const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #2196f3;
  border-radius: 2px;
`;

const Icon = styled.svg`
  fill: ${props => (props.checked ? '#2196f3' : '#E5E5E5')};
  display: inline;
  vertical-align: middle;
  margin: 4px;
`;

const Checkbox = () => (
  <StyledCheckbox>
    <Icon viewBox="0 0 12 8">
      <path d="M4.28571 8L0 4.16123L1.20857 3.0787L4.28571 5.82726L10.7914 0L12 1.09021L4.28571 8Z" />
    </Icon>
  </StyledCheckbox>
);

export default Checkbox;
