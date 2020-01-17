import React from 'react';
import styled from 'styled-components/macro';

import HiddenCheckbox from './HiddenCheckbox';
import Checkbox from './Checkbox';
import Text from './Text';

const StyledLabel = styled.div``;

const Label = () => (
  <StyledLabel>
    <HiddenCheckbox />
    <Checkbox />
    <Text />
  </StyledLabel>
);

export default Label;
