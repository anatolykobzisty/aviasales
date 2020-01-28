import React from 'react';
import styled from 'styled-components/macro';

const StyledErrorIndicator = styled.div`
  display: flex;
  justify-content: center;
`;

const Text = styled.h3`
  margin: 0;
  color: #2196f3;
`;

const ErrorIndicator = () => (
  <StyledErrorIndicator>
    <Text>
      Извините, что-то пошло не так <>&#128542;</>
    </Text>
  </StyledErrorIndicator>
);

export default ErrorIndicator;
