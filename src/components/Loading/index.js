import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import bouncingTennisBall from 'config/lottieAnimations/bouncingTennisBall.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loading = () => {
  return (
    <View style={styles.container}>
      <LottieView source={bouncingTennisBall} autoPlay loop />
    </View>
  );
};

export default Loading;
