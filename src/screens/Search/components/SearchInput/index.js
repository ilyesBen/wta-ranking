import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Item, Input, Icon, Button} from 'native-base';
import theme from 'config/theme';

const styles = StyleSheet.create({
  icon: {
    color: theme.onSurface,
  },
});

const SearchInput = ({onChangeText, goBack}) => (
  <Item>
    <Button transparent onPress={() => goBack()}>
      <Icon name="arrow-back" style={styles.icon} />
    </Button>
    <Input onChangeText={onChangeText} placeholder="search for a player" autoFocus />
  </Item>
);

SearchInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default SearchInput;
