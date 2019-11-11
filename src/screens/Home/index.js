import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {getPlayers} from 'modules/Feed/actions';
import {selectPlayers} from 'modules/Feed/selectors';

import {Header} from 'components';
import PlayersList from './components/PlayersList';

class HomeScreen extends React.Component {
  componentDidMount() {
    const {onGetPlayers} = this.props;
    onGetPlayers();
  }

  render() {
    const {players} = this.props;
    // console.log('players ', players);
    console.log('players ', players);
    return (
      <View flex={1}>
        <Header title="WTA Ranking" />
        <PlayersList players={players} />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGetPlayers: PropTypes.func.isRequired,
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
