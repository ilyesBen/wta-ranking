import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import hexToRgba from 'hex-to-rgba';
import theme from 'config/theme';

const styles = StyleSheet.create({
  Section: {
    height: 1,
  },
});

const Section = ({paddingBottom, ...props}) => <View {...props} paddingBottom={paddingBottom} />;

Section.propTypes = {
  paddingBottom: PropTypes.number,
};

Section.defaultProps = {
  paddingBottom: 20,
};

export default Section;
