import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const StyledSortControl = styled.div`
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

const LeftButton = styled(Button)`
  border-radius: 5px 0 0 5px;
  border-right: 0px;
`;

const RightButton = styled(Button)`
  border-radius: 0 5px 5px 0;
  border-left: 0px;
`;

class SortControl extends PureComponent {
  handleClick = event => {
    const { handleChangeSortControl } = this.props;
    const nameButton = event.target.getAttribute('aria-label');
    handleChangeSortControl(nameButton);
  };

  render() {
    const { sortBy } = this.props;
    return (
      <>
        <StyledSortControl>
          <LeftButton
            active={sortBy === 'cheapness'}
            aria-label="cheapness"
            onClick={this.handleClick}
          >
            Самый дешевый
          </LeftButton>
          <RightButton active={sortBy === 'speed'} aria-label="speed" onClick={this.handleClick}>
            Самый быстрый
          </RightButton>
        </StyledSortControl>
      </>
    );
  }
}

SortControl.propTypes = {
  sortBy: PropTypes.string.isRequired,
  handleChangeSortControl: PropTypes.func.isRequired,
};

export default SortControl;
