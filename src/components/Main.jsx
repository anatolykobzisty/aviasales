import React, { Component } from 'react';
import styled from 'styled-components/macro';

import Option from './Option';
import Tabs from './Tabs';
import Ticket from './Ticket';

const StyledMain = styled.main`
  display: flex;
`;

const SideBar = styled.aside``;

const Filter = styled.div`
  color: #4a4a4a;
  width: 232px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-right: 20px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Title = styled.h2`
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 0px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  font-family: Open Sans Regular;
  font-size: 13px;
  line-height: 20px;
`;

const Options = styled.ul``;

const Container = styled.div``;

const Content = styled.div``;

const Tickets = styled.ul``;

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
  border-color: ${checked => (checked ? '#2196f3' : '#9abbce')};
  border-radius: 2px;
`;

const Icon = styled.svg`
  fill: ${checked => (checked ? '#2196f3' : 'transparent')};
`;

const OPTIONS = [
  {
    name: 'withoutStops',
    key: 'withoutStops',
    label: 'Без пересадок',
  },
  {
    name: 'oneStop',
    key: 'oneStop',
    label: '1 пересадка',
  },
  {
    name: 'twoStops',
    key: 'twoStops',
    label: '2 пересадки',
  },
  {
    name: 'threeStops',
    key: 'threeStops',
    label: '3 пересадки',
  },
];

class Main extends Component {
  state = {
    checkedOptions: { withoutStops: false, oneStop: true, twoStops: false, threeStops: false },
    // checkedAllOptions: false,
  };

  // handleAllChecked = event => {};

  // handleChange = event => {};

  render() {
    const { checkedOptions } = this.state;
    return (
      <StyledMain>
        <SideBar>
          <Filter>
            <Title>Количество пересадок</Title>
            <Form>
              <Options>
                <Label>
                  <HiddenCheckbox onChange={this.handleAllChecked} />
                  <VisibleCheckbox>
                    <Icon width="12" height="8" viewBox="0 0 12 8">
                      <path d="M4.28571 8L0 4.16123L1.20857 3.0787L4.28571 5.82726L10.7914 0L12 1.09021L4.28571 8Z" />
                    </Icon>
                  </VisibleCheckbox>
                  Все
                </Label>
                {OPTIONS.map(({ key, label, name }) => (
                  <Option
                    key={key}
                    label={label}
                    name={name}
                    checked={checkedOptions[name]}
                    onChange={this.handleChange}
                  />
                ))}
              </Options>
              {/* {console.log(checkedOptions.oneStop)} */}
            </Form>
          </Filter>
        </SideBar>
        <Container>
          <Tabs />
          <Content>
            <Tickets>
              <Ticket />
            </Tickets>
          </Content>
        </Container>
      </StyledMain>
    );
  }
}

export default Main;
