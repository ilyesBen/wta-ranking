import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, CardItem, Text, H1, H2, Row, Col} from 'native-base';

import Flag from 'react-native-flags';
import theme from 'config/theme';

const styles = StyleSheet.create({
  rankingText: {
    fontWeight: '500',
    fontSize: 30,
    color: theme.primary,
  },
  flagContainer: {
    marginRight: 10,
  },
});

const PlayerCard = props => {
  const {
    ranking,
    rankingPoints,
    countryCode,
    firstName,
    lastName,
    tours,
    navigation,
    playerId,
  } = props;
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Player', {playerId})}>
      <Card>
        <Col>
          <Row>
            <CardItem style={styles.ranking}>
              <H1 style={styles.rankingText}>{ranking}</H1>
            </CardItem>

            <CardItem>
              <H2>{`${firstName} ${lastName}`}</H2>
            </CardItem>
          </Row>

          <Row>
            <CardItem>
              <View style={styles.flagContainer}>
                <Flag code={countryCode ? countryCode.slice(0, -1) : ''} size={32} />
              </View>

              <Text>{countryCode}</Text>
            </CardItem>

            <CardItem>
              <Text>Points: {rankingPoints}</Text>
            </CardItem>

            <CardItem>
              <Text>Tours: {tours}</Text>
            </CardItem>
          </Row>
        </Col>
      </Card>
    </TouchableOpacity>
  );
};

PlayerCard.propTypes = {
  ranking: PropTypes.number.isRequired,
  playerId: PropTypes.number.isRequired,
  rankingPoints: PropTypes.number.isRequired,
  countryCode: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  tours: PropTypes.number.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PlayerCard;
