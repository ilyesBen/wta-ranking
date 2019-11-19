import React from 'react';
import PropTypes from 'prop-types';
import theme from 'config/theme';
import {BarChart} from 'react-native-chart-kit';
import hexToRgba from 'hex-to-rgba';

const displayMonths = months =>
  months.map(month => {
    switch (month) {
      case 'January':
        return 'Jan';
      case 'December':
        return 'Dec';
      case 'September':
        return 'Sep';
      default:
        return month;
    }
  });

const displayData = data => data.map(value => (value !== 0 ? 1 / value : 0));

const Bar = props => {
  const {labels, data, height, width, shadow} = props;
  const shadowStyle = {
    shadowColor: theme.onSurface,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    elevation: 3,
  };
  return (
    <BarChart
      data={{
        labels: displayMonths(labels),
        datasets: [
          {
            data: data.length ? displayData(data) : [0],
          },
        ],
      }}
      style={{
        borderRadius: 16,
        paddingRight: 30,
        marginLeft: 30,
        ...(shadow ? shadowStyle : {}),
      }}
      width={width}
      height={height}
      withHorizontalLabels={false}
      chartConfig={{
        backgroundColor: theme.surface,
        backgroundGradientFrom: theme.surface,
        backgroundGradientTo: theme.surface,
        decimalPlaces: 0,
        color: (opacity = 0.5) => hexToRgba(theme.primary, opacity),
        labelColor: (opacity = 0.5) => hexToRgba(theme.primary, opacity),
        propsForDots: {
          r: '3',
          strokeWidth: '2',
          stroke: theme.primary,
        },
      }}
    />
  );
};

Bar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  shadow: PropTypes.bool,
};

Bar.defaultProps = {
  height: 300,
  width: 300,
  shadow: true,
};

export default Bar;
