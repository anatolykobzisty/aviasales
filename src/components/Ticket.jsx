import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { format, addMinutes } from 'date-fns';
import styled from 'styled-components/macro';

const StyledTicket = styled.li`
  width: 502px;
  height: 184px;
  padding: 20px;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Headline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Price = styled.span`
  font-size: 24px;
  line-height: 24px;
  color: #2196f3;
`;

const Logo = styled.div`
  width: 110px;
  height: 36px;
  margin-right: 30px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 10px;
  :last-child {
    margin-bottom: 0;
  }
`;

const Column = styled.div`
  width: 141px;
  margin-right: 20px;
  :last-child {
    margin-right: 0;
  }
`;

const Title = styled.div`
  line-height: 18px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #a0b0b9;
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 21px;
`;

class Ticket extends PureComponent {
  getFlightDates = (date, duration) => {
    const departureDate = new Date(date);
    const departureTime = format(departureDate, 'HH:mm');
    const arrivalDate = format(addMinutes(departureDate, duration), 'HH:mm');
    return `${departureTime} - ${arrivalDate}`;
  };

  render() {
    const { price, carrier, segments } = this.props;
    return (
      <>
        <StyledTicket>
          <Headline>
            <Price>{price.toLocaleString()} Р</Price>
            <Logo>
              <img src={`http://pics.avs.io/110/36/${carrier}.png`} alt={carrier} />
            </Logo>
          </Headline>
          {segments.map(({ origin, destination, date, stops, duration }) => {
            return (
              <Row
                key={Math.random()
                  .toString(32)
                  .substr(2)}
              >
                <Column>
                  <Title>
                    {origin} – {destination}
                  </Title>
                  <Text>{this.getFlightDates(date, duration)}</Text>
                </Column>
                <Column>
                  <Title>В пути</Title>
                  <Text>
                    {Math.floor(duration / 60)} ч {duration % 60} мин
                  </Text>
                </Column>
                <Column>
                  <Title>
                    {stops.length === 0
                      ? 'без пересадок'
                      : `${stops.length} ${stops.length === 1 ? 'пересадка' : 'пересадки'}`}
                  </Title>
                  <Text>{stops.join(',')}</Text>
                </Column>
              </Row>
            );
          })}
        </StyledTicket>
      </>
    );
  }
}

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,

  segments: PropTypes.arrayOf(
    PropTypes.shape({
      origin: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      stops: PropTypes.arrayOf(PropTypes.string).isRequired,
      duration: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default Ticket;
