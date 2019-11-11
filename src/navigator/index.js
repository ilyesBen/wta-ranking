import React from 'react';
import {SafeAreaView, createStackNavigator, createAppContainer} from 'react-navigation';
import theme from 'config/theme';
import HomeScreen from 'screens/Home';

const Screens = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(Screens);

const AppNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}} forceInset={{bottom: 'never'}} backgroundColor={theme.primary}>
      <AppContainer />
    </SafeAreaView>
  );
};

export default AppNavigator;
