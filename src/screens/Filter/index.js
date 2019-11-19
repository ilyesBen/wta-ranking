import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, StyleSheet, Picker} from 'react-native';
import {Text, H3} from 'native-base';
import {availableDates} from 'config/dates';
import {
  rankingRange,
  rankingPointsRange,
  initialRankingPoints,
  initialRanking,
} from 'config/ranking';
import {connect} from 'react-redux';
import {applyFilters} from 'modules/Feed/actions';
import {selectSearchResult} from 'modules/Search/selectors';
import {Section, Separator, Header, Button} from 'components';
import RangeSlider from 'rn-range-slider';
import theme from 'config/theme';
import {Footer} from './components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 10,
  },
  filterButton: {
    backgroundColor: theme.primary,
  },
  sectionText: {
    marginTop: 20,
  },
  slider: {
    width: 300,
    height: 50,
    marginTop: 30,
    alignSelf: 'center',
  },
});

const datesArray = availableDates.reverse();
const [minRankingPoints, maxRankingPoints] = rankingPointsRange;
const [minRanking, maxRanking] = rankingRange;

const [minInitialRankingPoints, maxInitialRankingPoints] = initialRankingPoints;
const [minInitialRanking, maxInitialRanking] = initialRanking;

class FilterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      rankingPoints: {
        low: minInitialRankingPoints,
        high: maxInitialRankingPoints,
      },
      ranking: {
        low: minInitialRanking,
        high: maxInitialRanking,
      },
      date: {
        selected: datesArray[0],
      },
    };
  }

  onRankingPointsChange = (low, high) => {
    this.setState({rankingPoints: {low, high}});
  };

  onRankingChange = (low, high) => {
    this.setState({ranking: {low, high}});
  };

  onChangeDate = itemValue => {
    this.setState({date: {selected: itemValue}});
  };

  getFilterObject = () => {
    const {ranking, rankingPoints, date} = this.state;
    return {
      ranking: [ranking.low, ranking.high],
      rankingPoints: [rankingPoints.low, rankingPoints.high],
      date: date.selected,
    };
  };

  render() {
    const {navigation, onApplyFilters} = this.props;
    const {date, rankingPoints, ranking} = this.state;

    const filters = this.getFilterObject();

    return (
      <View style={styles.container}>
        <Header title="Filters" onIconPress={() => navigation.goBack()} />
        <ScrollView style={styles.scrollView}>
          <Section>
            <H3>Ranking Points</H3>
            <Text style={styles.sectionText}>{`${rankingPoints.low} - ${rankingPoints.high}`}</Text>
            <View style={styles.sliderContainer}>
              <RangeSlider
                style={styles.slider}
                min={minRankingPoints}
                max={maxRankingPoints}
                initialLowValue={minInitialRankingPoints}
                initialHighValue={maxInitialRankingPoints}
                step={20}
                selectionColor={theme.primary}
                labelBackgroundColor={theme.primary}
                blankColor={theme.disabled}
                labelStyle="none"
                onValueChanged={this.onRankingPointsChange}
              />
            </View>
          </Section>
          <Separator marginVertical={20} />
          <Section>
            <H3>Ranking</H3>
            <Text style={styles.sectionText}>{`${ranking.low} - ${ranking.high}`}</Text>
            <RangeSlider
              style={styles.slider}
              min={minRanking}
              max={maxRanking}
              initialLowValue={minInitialRanking}
              initialHighValue={maxInitialRanking}
              step={20}
              labelStyle="none"
              selectionColor={theme.primary}
              labelBackgroundColor={theme.primary}
              blankColor={theme.disabled}
              onValueChanged={this.onRankingChange}
            />
          </Section>
          <Separator marginVertical={20} />
          <Section>
            <H3>Ranking Date</H3>
            <View alignItems="center" justifyContent="center">
              <Picker
                style={{width: 200}}
                selectedValue={date.selected}
                onValueChange={this.onChangeDate}>
                {datesArray.map(dateValue => (
                  <Picker.Item label={dateValue} value={dateValue} key={dateValue} />
                ))}
              </Picker>
            </View>
          </Section>
        </ScrollView>
        <Footer>
          <Button
            text="Filter"
            shadow={false}
            style={styles.filterButton}
            textColor={theme.onPrimary}
            onPress={() => onApplyFilters(filters)}
          />
        </Footer>
      </View>
    );
  }
}

FilterScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  onApplyFilters: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    searchResult: selectSearchResult(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onApplyFilters: filters => dispatch(applyFilters(filters)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterScreen);
