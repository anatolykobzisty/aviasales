import React, { Component } from 'react';
import styled from 'styled-components/macro';

import SideBar from '../SideBar';
import Content from '../Content';

const StyledMain = styled.main`
  display: flex;
`;

class Main extends Component {
  state = { checked: false };

  handleCheckboxChange = event => this.setState({ checked: event.target.checked });

  render() {
    const { checked } = this.state;
    return (
      <StyledMain>
        <SideBar checked={checked} onChange={this.handleCheckboxChange} />
        <Content />
      </StyledMain>
    );
  }
}

export default Main;
