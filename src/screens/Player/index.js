import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions, TouchableOpacity, ScrollView} from 'react-native';
import {H3, Icon, H1, H2} from 'native-base';
import {connect} from 'react-redux';
import theme from 'config/theme';
import {labelMonths} from 'config/dates';
import {selectLineChartData, selectBarChartData, selectPlayerInfo} from 'modules/Players/selectors';
import {getPlayerDetails} from 'modules/Players/actions';
import {Section, Separator, Row, Col, Charts, Header} from 'components';
import Flag from 'react-native-flags';

const chartWidth = 0.9 * Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
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

  render() {
    const {lineChartData, playerInfo, navigation, barChartData} = this.props;
    const {birthDate, firstName, hand, lastName, countryCode} = playerInfo;
    const {playerId} = navigation.state.params;

    return (
      <>
        <Header onIconPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <Section>
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
                  <H3 style={styles.ageText}>{this.getAge(birthDate)}</H3>
                </Row>
              </Col>
            </Row>
          </Section>

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
};

const mapStateToProps = (state, props) => {
  const {navigation} = props;
  const {playerId} = navigation.state.params;
  return {
    lineChartData: selectLineChartData(state, {playerId}),
    barChartData: selectBarChartData(state, {playerId}),
    playerInfo: selectPlayerInfo(state, playerId),
  };
};

const mapDispatchToProps = dispatch => ({
  onGetPlayerDetails: playerId => dispatch(getPlayerDetails(playerId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerScreen);
