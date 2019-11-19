import React from 'react';
import PropTypes from 'prop-types';
import {View, Dimensions, StyleSheet} from 'react-native';
import {labelMonths, allMonths} from 'config/dates';
import {connect} from 'react-redux';
import {Charts, Header, Carousel} from 'components';
import {selectLineChartData, selectBarChartData} from 'modules/Players/selectors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    width: 400,
    alignItems: 'center',
  },
});

class ChartsScreen extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const {index} = navigation.state.params;
    this.state = {landscape: false, currentCarouselIndex: index};
  }

  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      this.setState({
        landscape: this.isLandscape(),
      });
    });
  }

  isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
  };

  getLabels = () => {
    const {landscape} = this.state;
    return landscape ? allMonths : labelMonths;
  };

  getChartType = index => {
    if (index === 0) return 'Linear';
    return 'Bar';
  };

  getTitle = () => {
    const {currentCarouselIndex} = this.state;
    if (currentCarouselIndex === 0) return 'Ranking Points';
    return 'Ranking';
  };

  renderItem = ({item, index}) => {
    const ChartType = this.getChartType(index);
    const Chart = Charts[ChartType];
    const chartsWidth = Dimensions.get('screen').width;
    const chartsHeight = 0.9 * Dimensions.get('screen').height;
    return (
      <View alignItems="center">
        <Chart
          data={item}
          labels={this.getLabels()}
          width={chartsWidth}
          height={chartsHeight}
          shadow={false}
        />
      </View>
    );
  };

  render() {
    const {navigation, lineChartData, barChartData} = this.props;
    const {index} = navigation.state.params;
    const {landscape} = this.state;

    const carouselData = [lineChartData(landscape), barChartData(landscape)];

    const screenWidth = Dimensions.get('screen').width;

    // console.log('this.carousel.currentIndex ', this.carousel.currentIndex);

    return (
      <View style={styles.container}>
        <Header onIconPress={() => navigation.goBack()} title={this.getTitle()} />
        <Carousel
          data={carouselData}
          renderItem={this.renderItem}
          width={screenWidth}
          firstItemIndex={index}
          pagination={!landscape}
          getCurrentIndex={currentCarouselIndex => this.setState({currentCarouselIndex})}
        />
      </View>
    );
  }
}

ChartsScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  lineChartData: PropTypes.func.isRequired,
  barChartData: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  const {navigation} = props;
  const {playerId} = navigation.state.params;
  return {
    lineChartData: landscape => selectLineChartData(state, {playerId, landscape}),
    barChartData: landscape => selectBarChartData(state, {playerId, landscape}),
  };
};

export default connect(
  mapStateToProps,
  null
)(ChartsScreen);
