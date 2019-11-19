import React from 'react';
import {View} from 'react-native';

// eslint-disable-next-line react/jsx-props-no-spreading
const Col = ({...props}) => <View {...props} flexDirection="column" />;

export default Col;
