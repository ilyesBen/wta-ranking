import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Button} from 'components';
import theme from 'config/theme';

const styles = StyleSheet.create({
  searchButton: {
    marginTop: 10,
    width: 250,
  },
});

const Search = ({onPress}) => (
  <Button
    text="search ..."
    icon="search"
    onPress={onPress}
    style={styles.searchButton}
    textColor={theme.disabled}
  />
);

Search.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default Search;
