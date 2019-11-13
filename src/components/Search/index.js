import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Left, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import theme from 'config/theme';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '60%',
    alignSelf: 'center',
    backgroundColor: theme.surface,
    borderWidth: 0.4,
    borderColor: theme.onSurface,
    shadowColor: theme.onPrimaryVariant,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    elevation: 3,
    shadowRadius: 5,
  },
  icon: {
    color: theme.onSurface,
  },
  text: {
    color: theme.onPrimaryVariant,
  },
});

const Search = ({onPress}) => (
  <Button style={styles.container} onPress={onPress}>
    <Icon name="search" style={styles.icon} />
    <Left>
      <Text styles={styles.text}>Search ...</Text>
    </Left>
  </Button>
);

Search.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default Search;
