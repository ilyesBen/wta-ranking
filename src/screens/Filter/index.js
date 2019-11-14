import React from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, ScrollView, StyleSheet} from 'react-native';
import {ListItem, Text, Container, H3} from 'native-base';
import {connect} from 'react-redux';
import {applyFilters} from 'modules/Feed/actions';
import {selectSearchResult} from 'modules/Search/selectors';
import {Section, Separator, Header, Button} from 'components';
import RangeSlider from 'rn-range-slider';
import theme from 'config/theme';

/** ****** */

// Some kind of Header

// ranking => slider
// ranking points => slider
// Date => date picker or calendar

// Button to apply filter

/** **** */

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 10,
  },
});

class FilterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: {
        low: 1,
        hight: 10,
      },
      rankingPoints: {
        low: 0,
        hight: 500,
      },
    };
  }

  search = searchText => {
    const {onSearchPlayer} = this.props;
    onSearchPlayer(searchText);
  };

  renderItem = ({item}) => {
    const {firstName, lastName} = item;
    return (
      <ListItem>
        <Text>{`${firstName} ${lastName}`}</Text>
      </ListItem>
    );
  };

  render() {
    const {searchResult, navigation, onApplyFilters} = this.props;

    const testFilter = {
      ranking: [10, 20],
      rankingPoints: [],
      date: '',
    };
    return (
      <View style={style.container}>
        <Header title="Filters" />
        <ScrollView style={style.scrollView}>
          <Section>
            <H3>Ranking </H3>
            <View>
              <RangeSlider
                style={{width: 300, height: 80, alignSelf: 'center'}}
                // gravity="center"
                min={200}
                max={1000}
                step={20}
                selectionColor={theme.primary}
                labelBackgroundColor={theme.primary}
                blankColor={theme.disabled}
                onValueChanged={(low, high, fromUser) => {
                  this.setState({rangeLow: low, rangeHigh: high});
                  console.log(low, high, fromUser);
                }}
              />
            </View>
          </Section>
          <Separator marginVertical={20} />
          <Section>
            <H3>Ranking Points </H3>
            <RangeSlider
              style={{width: 300, height: 80, alignSelf: 'center'}}
              labelTailHeight={10}
              min={200}
              max={6000}
              step={20}
              selectionColor={theme.primary}
              labelBackgroundColor={theme.primary}
              blankColor={theme.disabled}
              onValueChanged={(low, high, fromUser) => {
                this.setState({rangeLow: low, rangeHigh: high});
              }}
            />
          </Section>
          <Separator marginVertical={20} />
          <Section>
            <H3>Calendar </H3>
          </Section>
        </ScrollView>
        <View
          height={80}
          backgroundColor={theme.surface}
          borderTopWidth={0.5}
          alignItems="center"
          justifyContent="center">
          <Button text="Filter" onPress={() => onApplyFilters(testFilter)} />
        </View>
      </View>
    );
  }
}

FilterScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
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
