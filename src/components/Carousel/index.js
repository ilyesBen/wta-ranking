import React from 'react';
import PropTypes from 'prop-types';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {StyleSheet, View} from 'react-native';
import theme from 'config/theme';

const styles = StyleSheet.create({
  pagination: {
    backgroundColor: 'transparent',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: theme.primary,
  },
});

class MyCarousel extends React.Component {
  constructor(props) {
    super(props);
    const {firstItemIndex} = this.props;
    this.state = {loading: true, activeIndex: firstItemIndex};
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false});
    }, 10);
  }

  get pagination() {
    const {data} = this.props;
    const {activeIndex} = this.state;
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.pagination}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    const {data, firstItemIndex, renderItem, pagination, width, getCurrentIndex} = this.props;
    const {loading} = this.state;

    if (loading) {
      return null;
    }
    return (
      <View flex={1}>
        <Carousel
          data={data}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
          firstItem={firstItemIndex}
          onSnapToItem={index => {
            this.setState({activeIndex: index});
            getCurrentIndex(index);
          }}
        />
        {pagination && this.pagination}
      </View>
    );
  }
}

MyCarousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  firstItemIndex: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  pagination: PropTypes.bool,
  width: PropTypes.number.isRequired,
  getCurrentIndex: PropTypes.func,
};

MyCarousel.defaultProps = {
  firstItemIndex: 0,
  pagination: true,
  getCurrentIndex: () => {},
};

export default MyCarousel;
