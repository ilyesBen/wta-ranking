import React from 'react';
import PropTypes from 'prop-types';
import {Header, Left, Body, Right, Icon, Button, Title} from 'native-base';

const MyHeader = ({title}) => (
  <Header>
    <Left>
      <Button transparent>
        <Icon name="arrow-back" />
      </Button>
    </Left>
    <Body>
      <Title>{title}</Title>
    </Body>
    <Right>
      <Button transparent>
        <Icon name="menu" />
      </Button>
    </Right>
  </Header>
);

MyHeader.propTypes = {
  title: PropTypes.string,
};

MyHeader.defaultProps = {
  title: '',
};

export default MyHeader;
