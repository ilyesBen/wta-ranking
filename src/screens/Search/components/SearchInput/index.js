import React from 'react';
import PropTypes from 'prop-types';
import {Item, Input, Icon, Button} from 'native-base';

const SearchInput = ({onChangeText, goBack}) => (
  <Item>
    <Button transparent onPress={() => goBack()}>
      <Icon name="arrow-back" />
    </Button>
    <Input onChangeText={onChangeText} placeholder="search for a player" autoFocus />
  </Item>
);

SearchInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default SearchInput;
