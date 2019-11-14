import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Button} from 'components';

const styles = StyleSheet.create({
  searchButton: {
    marginTop: 10,
    width: 250,
  },
});

const Search = ({onPress}) => (
  <Button text="search ..." icon="search" onPress={onPress} style={styles.searchButton} />
);

Search.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default Search;
