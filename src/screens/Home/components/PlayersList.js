import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardItem, Text, H1, H2, Left, Row, Col, Icon, H3} from 'native-base';
import Flag from 'react-native-flags';
import {FlatList, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  ranking: {
    alignItems: 'flex-start',
  },
});

class PlayersList extends React.Component {
  renderItem = ({item}) => {
    const {firstName, lastName, hand, countryCode, ranking, rankingPoints} = item;
    return (
      <Card>
        <Row>
          <CardItem style={styles.ranking}>
            <H1>{ranking}</H1>
          </CardItem>

          <Col>
            <CardItem>
              <Left>
                <H2>{`${firstName} ${lastName}`}</H2>
              </Left>
            </CardItem>
            <Row>
              <CardItem>
                <Icon name="hand" />
                <Text>{hand}</Text>
              </CardItem>
              <CardItem>
                <Flag code={countryCode.slice(0, -1)} size={32} />
              </CardItem>
            </Row>
          </Col>

          <CardItem>
            <H3>{rankingPoints}</H3>
          </CardItem>
        </Row>
      </Card>
    );
  };

  render() {
    const {players} = this.props;
    return (
      <FlatList
        data={players}
        renderItem={this.renderItem}
        keyExtractor={player => `${player.id}}`}
      />
    );
  }
}

PlayersList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlayersList;
