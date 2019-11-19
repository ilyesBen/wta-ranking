import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import theme from 'config/theme';

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: theme.surface,
    borderTopWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Footer = ({children}) => <View style={styles.container}>{children}</View>;

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footer;
