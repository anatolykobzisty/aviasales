import React, { Component } from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';

import Option from './Option';
import Tabs from './Tabs';
import Ticket from './Ticket';
import Loader from './Loader';
import ErrorIndicator from './ErrorIndicator';

const StyledMain = styled.main`
  display: flex;
  height: 1090px;
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

const AllOptions = styled.li``;

const Label = styled.label`
  display: flex;
  height: 40px;
  align-items: center;
  cursor: pointer;
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

const Container = styled.div``;

const Content = styled.div``;

const Tickets = styled.ul``;

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
    tickets: [],
    isLoading: true,
    error: false,
    checkedOptions: ['oneStop'],
    sortBy: 'cheapness',
  };

  componentDidMount() {
    this.getAllTickets();
  }

  getSomeTickets = async () => {
    const responseSearch = await axios.get('https://front-test.beta.aviasales.ru/search');
    const { searchId } = responseSearch.data;
    const response = await axios.get(
      `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
    );
    const { tickets } = response.data;
    this.setState({
      tickets,
      isLoading: false,
      error: false,
    });
  };

  getAllTickets = async () => {
    try {
      await this.getSomeTickets();
    } catch (error) {
      this.setState({
        error: true,
        isLoading: false,
      });
    }
  };

  handleChangeOption = name => event => {
    const { checked } = event.target;
    const { checkedOptions } = this.state;
    if (checked) {
      this.setState({ checkedOptions: [...checkedOptions, name] });
    } else {
      this.setState({ checkedOptions: checkedOptions.filter(item => item !== name) });
    }
  };

  handleChangeAllOptions = event => {
    const { checked } = event.target;
    if (checked) {
      this.setState({ checkedOptions: ['withoutStops', 'oneStop', 'twoStops', 'threeStops'] });
    } else {
      this.setState({ checkedOptions: [] });
    }
  };

  handleChangeTabs = event => {
    const { value } = event.target;
    this.setState({ sortBy: value });
  };

  render() {
    const { tickets, isLoading, error, checkedOptions, sortBy } = this.state;
    const hasData = !(isLoading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const loading = isLoading ? <Loader /> : null;
    return (
      <StyledMain>
        <SideBar>
          <Filter>
            <Title>Количество пересадок</Title>
            <Form>
              <Options>
                <AllOptions>
                  <Label>
                    <HiddenCheckbox
                      name="all"
                      checked={checkedOptions.length === OPTIONS.length}
                      onChange={this.handleChangeAllOptions}
                    />
                    <VisibleCheckbox checked={checkedOptions.length === OPTIONS.length}>
                      <Icon
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        checked={checkedOptions.length === OPTIONS.length}
                      >
                        <path d="M4.28571 8L0 4.16123L1.20857 3.0787L4.28571 5.82726L10.7914 0L12 1.09021L4.28571 8Z" />
                      </Icon>
                    </VisibleCheckbox>
                    Все
                  </Label>
                </AllOptions>
                {OPTIONS.map(({ key, label, name }) => (
                  <Option
                    key={key}
                    label={label}
                    name={name}
                    checked={checkedOptions.includes(name)}
                    onChange={this.handleChangeOption(name)}
                  />
                ))}
              </Options>
            </Form>
          </Filter>
        </SideBar>
        <Container>
          <Tabs sortBy={sortBy} handleChangeTabs={this.handleChangeTabs} />
          <Content>
            <Tickets>
              {hasData
                ? tickets.slice(0, 5).map(({ price, carrier, segments }) => (
                    <Ticket
                      key={Math.random()
                        .toString(32)
                        .substr(2)}
                      price={price}
                      carrier={carrier}
                      segments={segments}
                    />
                  ))
                : null}
              {/* {console.log(tickets)} */}
            </Tickets>
            {loading}
            {errorMessage}
          </Content>
        </Container>
      </StyledMain>
    );
  }
}

export default Main;
