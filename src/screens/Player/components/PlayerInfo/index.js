import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {H3, Icon, H1, Text} from 'native-base';
import theme from 'config/theme';
import {Section, Row, Col} from 'components';
import Flag from 'react-native-flags';
import hexToRgba from 'hex-to-rgba';

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: hexToRgba(theme.disabled, 0.5),
    alignItems: 'center',
    justifyContent: 'center',
  },

  userIcon: {
    color: theme.surface,
    fontSize: 40,
  },

  countryCode: {
    margin: 5,
  },
  infoText: {
    color: theme.onPrimary,
    marginLeft: 4,
  },
  label: {
    fontWeight: '500',
    color: theme.onPrimary,
  },
  infoCard: {
    borderRadius: 10,
    backgroundColor: hexToRgba(theme.primary, 0.8),
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const displayPlays = hand => (hand === 'R' ? 'Right-Handed' : 'Left-Handed');

const PlayerInfo = props => {
  const {firstName, lastName, countryCode, hand, age} = props;
  return (
    <Section height={150}>
      <Col>
        <Row>
          <View style={styles.avatar}>
            <Icon name="user" type="FontAwesome" style={styles.userIcon} />
          </View>

          <Col marginLeft={10} marginTop={10}>
            <H1>{`${firstName} ${lastName}`}</H1>
            <Row marginTop={5}>
              <Flag code={countryCode ? countryCode.slice(0, -1) : ''} size={32} />
              <Text style={styles.countryCode}>{countryCode}</Text>
            </Row>
          </Col>
        </Row>

        <Row alignItems="center" marginTop={10} justifyContent="flex-start">
          <Row style={styles.infoCard}>
            <H3 style={styles.label}>Age</H3>
            <Text style={styles.infoText}>{age}</Text>
          </Row>
          <Row style={[styles.infoCard, {marginLeft: 30}]}>
            <H3 style={styles.label}>Plays</H3>
            <Text style={styles.infoText}>{displayPlays(hand)}</Text>
          </Row>
        </Row>
      </Col>
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
