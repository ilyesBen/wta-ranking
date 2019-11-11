import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardItem, Text} from 'native-base';
import Flag from 'react-native-flags';
import {FlatList} from 'react-native';

class PlayersList extends React.Component {
  renderItem = ({item}) => {
    const {firstName, lastName, hand, countryCode} = item;
    return (
      <Card>
        <CardItem>
          <Text>{`${firstName} ${lastName}`}</Text>
        </CardItem>
        <CardItem>
          <Text>Hand: {hand}</Text>
        </CardItem>
        <CardItem>
          <Flag code={countryCode.slice(0, -1)} size={32} />
        </CardItem>
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
