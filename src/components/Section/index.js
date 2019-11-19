import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

// eslint-disable-next-line react/jsx-props-no-spreading
const Section = ({paddingBottom, ...props}) => <View {...props} paddingBottom={paddingBottom} />;

Section.propTypes = {
  paddingBottom: PropTypes.number,
};

Section.defaultProps = {
  paddingBottom: 20,
};

export default Section;
