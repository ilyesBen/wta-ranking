import React from 'react';
import PropTypes from 'prop-types';
import {Left, Body, Right, Icon, Button, Title} from 'native-base';
import {Row} from 'components';
import {StyleSheet} from 'react-native';
import theme from 'config/theme';
import hexToRgba from 'hex-to-rgba';

const styles = StyleSheet.create({
  header: {
    backgroundColor: hexToRgba(theme.primary, 0.2),
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: theme.onSurface,
  },
  title: {
    color: theme.onSurface,
  },
});

const Header = ({title, icon, onIconPress}) => (
  <Row style={styles.header}>
    <Left>
      <Button transparent onPress={onIconPress}>
        <Icon name={icon} style={styles.icon} />
      </Button>
    </Left>
    <Body>
      <Title style={styles.title}>{title}</Title>
    </Body>
    <Right />
  </Row>
);

Header.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  onIconPress: PropTypes.func.isRequired,
};

Header.defaultProps = {
  title: '',
  icon: 'arrow-back',
};

export default Header;
