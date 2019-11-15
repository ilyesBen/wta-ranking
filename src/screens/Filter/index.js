import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, StyleSheet, Picker} from 'react-native';
import {ListItem, Text, H3, Icon} from 'native-base';
import {connect} from 'react-redux';
import {applyFilters} from 'modules/Feed/actions';
import {selectSearchResult} from 'modules/Search/selectors';
import {Section, Separator, Header, Button} from 'components';
import RangeSlider from 'rn-range-slider';
import theme from 'config/theme';
import hexToRgba from 'hex-to-rgba';

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

  render() {
    const {navigation, onApplyFilters} = this.props;

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
            <View alignItems="center">
              <Picker
                mode="dropdown"
                iosHeader="Select your SIM"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: 200}}
                // selectedValue={this.state.selected}
                // onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>
            </View>
          </Section>
        </ScrollView>
        <View
          height={80}
          backgroundColor={hexToRgba(theme.surface, 0.3)}
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
