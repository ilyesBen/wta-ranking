import React from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, StyleSheet} from 'react-native';
import {Row} from 'native-base';
import {connect} from 'react-redux';
import {getPlayers} from 'modules/Feed/actions';
import {selectPlayers} from 'modules/Feed/selectors';

import theme from 'config/theme';
import {Search, Filter, PlayerCard} from './components';

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-around',
    backgroundColor: theme.surface,
    padding: 10,
  },
});

class HomeScreen extends React.Component {
  componentDidMount() {
    const {onGetPlayers} = this.props;
    onGetPlayers();
  }

  renderHeader = () => {
    const {navigation} = this.props;
    return (
      <Row style={styles.headerContainer}>
        <Search onPress={() => navigation.navigate('Search')} />
        <Filter onPress={() => navigation.navigate('Filter')} />
      </Row>
    );
  };

  renderItem = ({item}) => {
    const {ranking, rankingPoints, countryCode, firstName, lastName, tours} = item;
    return (
      <PlayerCard
        ranking={ranking}
        rankingPoints={rankingPoints}
        countryCode={countryCode}
        firstName={firstName}
        lastName={lastName}
        tours={tours}
      />
    );
  };

  render() {
    const {players} = this.props;

    return (
      <View flex={1}>
        <FlatList
          ListHeaderComponent={() => this.renderHeader()}
          stickyHeaderIndices={[0]}
          data={players}
          renderItem={this.renderItem}
          keyExtractor={player => `${player.id}}`}
        />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGetPlayers: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => {
  return {
    players: selectPlayers(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onGetPlayers: () => dispatch(getPlayers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
