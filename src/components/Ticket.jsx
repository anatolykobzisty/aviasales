import React from 'react';
import PropTypes from 'prop-types';
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
  margin-bottom: 10px;
`;

const Ticket = ({ price, carrier }) => (
  <StyledTicket>
    <Headline>
      <Price>{price.toLocaleString()} Р</Price>
      <Logo>
        <img src={`http://pics.avs.io/110/36/${carrier}.png`} alt={carrier} />
      </Logo>
    </Headline>
    <Row />
  </StyledTicket>
);

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
};

export default Ticket;
