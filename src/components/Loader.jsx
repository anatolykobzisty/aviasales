import React from 'react';
import styled from 'styled-components/macro';

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
`;

const Text = styled.h3`
  margin: 0;
`;

const Loader = () => (
  <StyledLoading>
    <Text>Поиск билетов...</Text>
  </StyledLoading>
);

export default Loader;
