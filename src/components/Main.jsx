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

const OPTIONS = [
  {
    name: 'all',
    key: 'all',
    label: 'Все',
  },
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
    checkedOptions: {
      all: false,
      withoutStops: false,
      oneStop: true,
      twoStops: false,
      threeStops: false,
    },
  };

  handleChange = event => {
    const { name } = event.target;

    this.setState(prevState => ({
      checkedOptions: {
        ...prevState.checkedOptions,
        [name]: !prevState.checkedOptions[name],
      },
    }));
  };

  render() {
    const { checkedOptions } = this.state;
    return (
      <StyledMain>
        <SideBar>
          <Filter>
            <Title>Количество пересадок</Title>
            <Form>
              <Options>
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
