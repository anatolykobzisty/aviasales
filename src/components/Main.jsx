import React, { Component } from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';

import AllOptions from './AllOptions';
import Option from './Option';
import SortControl from './SortControl';
import Ticket from './Ticket';
import Loader from './Loader';

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
  font-family: 'Open Sans';
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
`;

const Options = styled.ul``;

const Container = styled.div``;

const Content = styled.div``;

const Tickets = styled.ul``;

const OPTIONS = [
  {
    key: 'withoutStops',
    value: 0,
    label: 'Без пересадок',
  },
  {
    key: 'oneStop',
    value: 1,
    label: '1 пересадка',
  },
  {
    key: 'twoStops',
    value: 2,
    label: '2 пересадки',
  },
  {
    key: 'threeStops',
    value: 3,
    label: '3 пересадки',
  },
];

class Main extends Component {
  state = {
    allTickets: [],
    filteredTickets: [],
    isLoading: true,
    checkedOptions: [1],
    sortBy: 'cheapness',
  };

  async componentDidMount() {
    const res = await axios.get('https://front-test.beta.aviasales.ru/search');
    const { searchId } = res.data;
    this.searchId = searchId;
    this.getTickets(searchId);
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  getTickets = async searchId => {
    try {
      const res = await axios.get('https://front-test.beta.aviasales.ru/tickets', {
        params: { searchId },
      });
      const { stop, tickets } = res.data;
      const { allTickets } = this.state;
      this.setState({ allTickets: [...allTickets, ...tickets] }, this.filterTickets);
      if (!stop) {
        this.timerId = setTimeout(() => this.getTickets(searchId), 500);
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      this.getTickets(searchId);
    }
  };

  filterTickets = () => {
    const { checkedOptions, allTickets } = this.state;
    const filteredTickets = allTickets.filter(({ segments }) => {
      return segments.every(({ stops }) => {
        return checkedOptions.includes(stops.length);
      });
    });
    this.setState({ filteredTickets }, this.sortTickets);
  };

  sortTickets = () => {
    const { filteredTickets, sortBy } = this.state;
    let sortedTickets = [];
    if (sortBy === 'cheapness') {
      sortedTickets = filteredTickets.sort((firstTicket, secondTicket) => {
        return firstTicket.price - secondTicket.price;
      });
    } else {
      sortedTickets = filteredTickets.sort((firstTicket, secondTicket) => {
        const totalDurationFirstTicket =
          firstTicket.segments[0].duration + firstTicket.segments[1].duration;
        const totalDurationSecondTicket =
          secondTicket.segments[0].duration + secondTicket.segments[1].duration;
        return totalDurationFirstTicket - totalDurationSecondTicket;
      });
    }
    this.setState({ filteredTickets: sortedTickets });
  };

  handleChangeOption = (value, enabled) => {
    const { checkedOptions } = this.state;
    if (enabled) {
      this.setState({ checkedOptions: [...checkedOptions, value] }, this.filterTickets);
    } else {
      this.setState(
        {
          checkedOptions: checkedOptions.filter(checkedOptionValue => checkedOptionValue !== value),
        },
        this.filterTickets
      );
    }
  };

  handleChangeAllOptions = enabled => {
    if (enabled) {
      this.setState({ checkedOptions: [0, 1, 2, 3] }, this.filterTickets);
    } else {
      this.setState({ checkedOptions: [] }, this.filterTickets);
    }
  };

  handleChangeSortControl = sortBy => {
    this.setState({ sortBy }, this.sortTickets);
  };

  render() {
    const { filteredTickets, isLoading, checkedOptions, sortBy } = this.state;
    const loading = isLoading ? <Loader /> : null;
    return (
      <StyledMain>
        <SideBar>
          <Filter>
            <Title>Количество пересадок</Title>
            <Form>
              <Options>
                <AllOptions
                  options={OPTIONS}
                  checkedOptions={checkedOptions}
                  handleChangeAllOptions={this.handleChangeAllOptions}
                />
                {OPTIONS.map(({ key, label, value }) => (
                  <Option
                    key={key}
                    label={label}
                    value={value}
                    checked={checkedOptions.includes(value)}
                    handleChangeOption={this.handleChangeOption}
                  />
                ))}
              </Options>
            </Form>
          </Filter>
        </SideBar>
        <Container>
          <SortControl sortBy={sortBy} handleChangeSortControl={this.handleChangeSortControl} />
          <Content>
            {loading}
            <Tickets>
              {filteredTickets.slice(0, 5).map(({ price, carrier, segments }) => (
                <Ticket
                  key={`${price}-${carrier}-${segments[1].duration}`}
                  price={price}
                  carrier={carrier}
                  segments={segments}
                />
              ))}
            </Tickets>
          </Content>
        </Container>
      </StyledMain>
    );
  }
}

export default Main;
