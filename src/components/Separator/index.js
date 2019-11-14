import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import hexToRgba from 'hex-to-rgba';
import theme from 'config/theme';

const styles = StyleSheet.create({
  container: {
    height: 1,
  },
});

const Separator = ({marginHorizontal, marginVertical, color}) => (
  <View style={[styles.container, {marginHorizontal, marginVertical, backgroundColor: color}]} />
);

Separator.propTypes = {
  marginHorizontal: PropTypes.number,
  marginVertical: PropTypes.number,
  color: PropTypes.string,
};

Separator.defaultProps = {
  marginHorizontal: 0,
  marginVertical: 0,
  color: hexToRgba(theme.onSurface, 0.2),
};

export default Separator;
