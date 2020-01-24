import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const StyledOption = styled.li``;

const Label = styled.label`
  display: flex;
  height: 40px;
  align-items: center;
  &:hover {
    background-color: #f1fcff;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const VisibleCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-left: 20px;
  margin-right: 10px;
  border: 1px solid;
  border-color: ${props => (props.checked ? '#2196f3' : '#9abbce')};
  border-radius: 2px;
`;

const Icon = styled.svg`
  fill: ${props => (props.checked ? '#2196f3' : 'transparent')};
`;

const Option = ({ label, name, checked, onChange }) => (
  <StyledOption>
    <Label>
      <HiddenCheckbox name={name} checked={checked} onChange={onChange} />
      <VisibleCheckbox checked={checked}>
        <Icon width="12" height="8" viewBox="0 0 12 8" checked={checked}>
          <path d="M4.28571 8L0 4.16123L1.20857 3.0787L4.28571 5.82726L10.7914 0L12 1.09021L4.28571 8Z" />
        </Icon>
      </VisibleCheckbox>
      {label}
    </Label>
  </StyledOption>
);

Option.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Option;
