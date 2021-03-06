import React from 'react';
import PropTypes from 'prop-types';
import {Button, Text, Left, Icon, Body} from 'native-base';
import {StyleSheet} from 'react-native';
import theme from 'config/theme';

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginTop: 10,
    backgroundColor: theme.surface,
  },
  shadow: {
    shadowColor: theme.onSurface,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    elevation: 3,
    shadowRadius: 5,
  },
});

const customButton = ({onPress, text, icon, textColor, iconColor, style, shadow}) => {
  const Container = icon ? Left : Body;
  return (
    <Button
      style={[styles.container, {...style, ...(shadow ? styles.shadow : {})}]}
      onPress={onPress}>
      {icon ? <Icon name={icon} style={{color: iconColor}} /> : null}
      <Container>
        <Text style={{color: textColor}}>{text}</Text>
      </Container>
    </Button>
  );
};

customButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  textColor: PropTypes.string,
  iconColor: PropTypes.string,
  shadow: PropTypes.bool,
};

customButton.defaultProps = {
  icon: '',
  style: {},
  textColor: theme.onSurface,
  iconColor: theme.onSurface,
  shadow: true,
};

export default customButton;
