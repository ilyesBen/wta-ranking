import React from 'react';
import PropTypes from 'prop-types';
import {} from 'native-base';
import {StyleSheet} from 'react-native';
import theme from 'config/theme';
import {Button} from 'components';

const styles = StyleSheet.create({
  filterButton: {
    width: 100,
    backgroundColor: theme.primary,
  },
});

const Filter = ({onPress}) => (
  <Button
    text="Filters"
    onPress={onPress}
    style={styles.filterButton}
    textColor={theme.onPrimary}
  />
);

Filter.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default Filter;
