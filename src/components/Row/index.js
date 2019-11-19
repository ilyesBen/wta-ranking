import React from 'react';
import {View} from 'react-native';

// eslint-disable-next-line react/jsx-props-no-spreading
const Row = ({...props}) => <View {...props} flexDirection="row" />;

export default Row;
