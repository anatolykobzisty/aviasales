import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const StyledTabs = styled.div`
  width: 503px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  display: inline-block;
  width: ${props => (props.active ? '252px' : '251px')};
  padding: 14px 0px;
  font: inherit;
  color: ${props => (props.active ? '#ffffff' : '#4a4a4a')};
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  line-height: 20px;
  background-color: ${props => (props.active ? '#2196F3' : '#ffffff')};
  border: none;
  border: 1px solid #dfe5ec;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const LeftTab = styled(Button)`
  border-radius: 5px 0 0 5px;
  border-right: 0px;
`;

const RightTab = styled(Button)`
  border-radius: 0 5px 5px 0;
  border-left: 0px;
`;

const Tabs = ({ sortBy, handleChangeTabs }) => (
  <StyledTabs>
    <LeftTab active={sortBy === 'cheapness'} value="cheapness" onClick={handleChangeTabs}>
      Самый дешевый
    </LeftTab>
    <RightTab active={sortBy === 'speed'} value="speed" onClick={handleChangeTabs}>
      Самый быстрый
    </RightTab>
  </StyledTabs>
);

Tabs.propTypes = {
  sortBy: PropTypes.string.isRequired,
  handleChangeTabs: PropTypes.func.isRequired,
};

export default Tabs;
