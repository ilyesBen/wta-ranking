import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions, TouchableOpacity, ScrollView} from 'react-native';
import {H2} from 'native-base';
import {connect} from 'react-redux';
import {labelMonths} from 'config/dates';
import {
  selectLineChartData,
  selectBarChartData,
  selectPlayerInfo,
  selectLoading,
  selectError,
} from 'modules/Players/selectors';
import {getPlayerDetails} from 'modules/Players/actions';
import {Section, Separator, Loading, Error, Charts, Header} from 'components';
import PlayerInfo from './components/PlayerInfo';

const chartWidth = 0.9 * Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionText: {
    marginBottom: 10,
  },
});

class PlayerScreen extends React.Component {
  componentDidMount() {
    const {onGetPlayerDetails, navigation} = this.props;
    const {playerId} = navigation.state.params;
    onGetPlayerDetails(playerId);
  }

  getAge = birthDate => {
    const date = new Date(birthDate);
    const ageDifMs = Date.now() - date.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  renderPlayerInfo = () => {
    const {playerInfo, loading, error} = this.props;
    const {birthDate, firstName, hand, lastName, countryCode} = playerInfo;
    const {onGetPlayerDetails, navigation} = this.props;
    const {playerId} = navigation.state.params;

    if (loading) {
      return (
        <Section height={150}>
          <Loading />
        </Section>
      );
    }

    if (error) {
      return (
        <Section height={150}>
          <Error errorMessage={error} onTryAgainPress={() => onGetPlayerDetails(playerId)} />
        </Section>
      );
    }

    return (
      <PlayerInfo
        firstName={firstName}
        lastName={lastName}
        hand={hand}
        countryCode={countryCode}
        age={this.getAge(birthDate)}
      />
    );
  };

  render() {
    const {lineChartData, navigation, barChartData} = this.props;
    const {playerId} = navigation.state.params;

    return (
      <>
        <Header onIconPress={() => navigation.goBack()} />
        <View style={styles.container}>
          {this.renderPlayerInfo()}

          <Separator marginVertical={10} />

          <ScrollView>
            <Section justifyContent="center" alignItems="center">
              <H2 style={styles.sectionText}>Ranking points</H2>
              <Section marginVertical={10}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Charts', {playerId, index: 0})}>
                  <Charts.Linear data={lineChartData} labels={labelMonths} width={chartWidth} />
                </TouchableOpacity>
              </Section>
              <H2 style={styles.sectionText}>Ranking</H2>
              <Section marginVertical={10}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Charts', {playerId, index: 1})}>
                  <Charts.Bar data={barChartData} labels={labelMonths} width={chartWidth} />
                </TouchableOpacity>
              </Section>
            </Section>
          </ScrollView>
        </View>
      </>
    );
  }
}

PlayerScreen.propTypes = {
  onGetPlayerDetails: PropTypes.func.isRequired,
  lineChartData: PropTypes.arrayOf(PropTypes.number).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  playerInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  barChartData: PropTypes.arrayOf(PropTypes.number).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  const {navigation} = props;
  const {playerId} = navigation.state.params;
  return {
    lineChartData: selectLineChartData(state, {playerId}),
    barChartData: selectBarChartData(state, {playerId}),
    playerInfo: selectPlayerInfo(state, playerId),
    loading: selectLoading(state),
    error: selectError(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onGetPlayerDetails: playerId => dispatch(getPlayerDetails(playerId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerScreen);
