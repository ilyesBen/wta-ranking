import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'native-base';
import {Button} from 'components';
import {View, StyleSheet} from 'react-native';
import theme from 'config/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    color: theme.onSurface,
  },
  text: {
    color: theme.error,
  },
  button: {
    backgroundColor: theme.primary,
  },
});

const Error = ({errorMessage, onTryAgainPress}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{errorMessage}</Text>
    {onTryAgainPress ? (
      <Button
        text="Try again"
        onPress={onTryAgainPress}
        shadow={false}
        style={styles.button}
        textColor={theme.onPrimary}
      />
    ) : null}
  </View>
);

Error.propTypes = {
  errorMessage: PropTypes.string,
  onTryAgainPress: PropTypes.func,
};

Error.defaultProps = {
  errorMessage: '',
  onTryAgainPress: null,
};

export default Error;
