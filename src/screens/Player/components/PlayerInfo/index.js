import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {H3, Icon, H1, H2} from 'native-base';
import theme from 'config/theme';
import {Section, Row, Col} from 'components';
import Flag from 'react-native-flags';

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handIcon: {
    color: theme.primary,
  },
  countryCode: {
    margin: 5,
  },
  handText: {
    margin: 5,
  },
  ageText: {
    margin: 5,
  },
  ageLabel: {
    fontWeight: '500',
  },
});

const PlayerInfo = props => {
  const {firstName, lastName, countryCode, hand, age} = props;
  return (
    <Section height={150}>
      <Row>
        <View style={styles.avatar}>
          <Icon name="person" />
        </View>
        <Col justifyContent="space-around" marginLeft={10}>
          <H1>{`${firstName} ${lastName}`}</H1>
          <Row justifyContent="space-between" alignItems="center" marginTop={10}>
            <Row alignItems="center">
              <Flag code={countryCode ? countryCode.slice(0, -1) : ''} size={48} />
              <H3 style={styles.countryCode}>{countryCode}</H3>
            </Row>
            <Row>
              <Icon name="md-hand" type="Ionicons" style={styles.handIcon} />
              <H3 style={styles.handText}>{hand}</H3>
            </Row>
          </Row>

          <Row marginTop={10}>
            <H2 style={styles.ageLabel}>Age</H2>
            <H3 style={styles.ageText}>{age}</H3>
          </Row>
        </Col>
      </Row>
    </Section>
  );
};

PlayerInfo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  hand: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

export default PlayerInfo;
