import React from 'react';
import PropTypes from 'prop-types';
import theme from 'config/theme';

import {LineChart} from 'react-native-chart-kit';
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

const shadowStyle = {
  shadowColor: theme.onSurface,
  shadowOffset: {width: 0, height: 10},
  shadowOpacity: 0.5,
  elevation: 3,
};

const Linear = props => {
  const {labels, data, width, height, shadow} = props;
  return (
    <LineChart
      data={{
        labels: displayMonths(labels),
        datasets: [
          {
            data: data.length ? data : [0],
          },
        ],
      }}
      height={height}
      width={width}
      yAxisSuffix=" pt"
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
      bezier
      style={{
        borderRadius: 16,
        ...(shadow ? shadowStyle : {}),
      }}
    />
  );
};

Linear.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  shadow: PropTypes.bool,
};

Linear.defaultProps = {
  height: 300,
  width: 300,
  shadow: true,
};

export default Linear;
