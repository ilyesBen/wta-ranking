import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, CardItem, Text, H1, H2, Row, Col} from 'native-base';
import getCountryISO2 from 'country-iso-3-to-2';
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
  label: {
    fontWeight: '500',
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

          <Row style={styles.infoContainer}>
            <CardItem>
              <View style={styles.flagContainer}>
                <Flag code={getCountryISO2(countryCode)} size={32} />
              </View>

              <Text>{countryCode}</Text>
            </CardItem>

            <CardItem>
              <Text>
                <Text style={styles.label}>Points</Text> {rankingPoints}
              </Text>
            </CardItem>

            <CardItem>
              <Text>
                <Text style={styles.label}>Tours</Text> {tours}
              </Text>
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
