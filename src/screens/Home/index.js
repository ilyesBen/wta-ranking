import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {getPlayers} from 'modules/Feed/actions';
import {selectPlayers} from 'modules/Feed/selectors';

class HomeScreen extends React.Component {
  componentDidMount() {
    const {onGetPlayers} = this.props;
    onGetPlayers();
  }

  render() {
    // const {players} = this.props;
    // console.log('players ', players);
    return (
      <View>
        <Text>Home screen</Text>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  // players: PropTypes.arrayOf(PropTypes.object).isRequired,
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
