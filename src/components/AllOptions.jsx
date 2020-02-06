import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const StyledAllOptions = styled.li``;

const Label = styled.label`
  display: flex;
  height: 40px;
  align-items: center;
  cursor: pointer;
  :hover {
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

class AllOptions extends PureComponent {
  handleChange = event => {
    const { handleChangeAllOptions } = this.props;
    const { checked } = event.target;
    handleChangeAllOptions(checked);
  };

  render() {
    const { options, checkedOptions } = this.props;
    return (
      <>
        <StyledAllOptions>
          <Label>
            <HiddenCheckbox
              name="all"
              checked={checkedOptions.length === options.length}
              onChange={this.handleChange}
            />
            <VisibleCheckbox checked={checkedOptions.length === options.length}>
              <Icon
                width="12"
                height="8"
                viewBox="0 0 12 8"
                checked={checkedOptions.length === options.length}
              >
                <path d="M4.28571 8L0 4.16123L1.20857 3.0787L4.28571 5.82726L10.7914 0L12 1.09021L4.28571 8Z" />
              </Icon>
            </VisibleCheckbox>
            Все
          </Label>
        </StyledAllOptions>
      </>
    );
  }
}

AllOptions.propTypes = {
  options: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  checkedOptions: PropTypes.PropTypes.arrayOf(PropTypes.number).isRequired,
  handleChangeAllOptions: PropTypes.func.isRequired,
};

export default AllOptions;
