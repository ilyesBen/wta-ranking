import React from 'react';
import {SafeAreaView, createStackNavigator, createAppContainer} from 'react-navigation';
import {fromBottom, fadeIn, fromLeft, fromRight} from 'react-navigation-transitions';
import NavigationService from 'utils/navigationService';
import theme from 'config/theme';
import HomeScreen from 'screens/Home';
import SearchScreen from 'screens/Search';
import FilterScreen from 'screens/Filter';
import PlayerScreen from 'screens/Player';

const handleCustomTransition = ({scenes}) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
  if (prevScene && prevScene.route.routeName === 'Home' && nextScene.route.routeName === 'Search') {
    return fadeIn();
  }
  if (prevScene && prevScene.route.routeName === 'Home' && nextScene.route.routeName === 'Filter') {
    return fromBottom();
  }

  if (prevScene && prevScene.route.routeName === 'Home' && nextScene.route.routeName === 'Player') {
    return fromRight();
  }
  return fromLeft();
};

const Screens = createStackNavigator(
  {
    Home: HomeScreen,
    Search: SearchScreen,
    Player: PlayerScreen,
    Filter: {
      screen: FilterScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    transitionConfig: nav => handleCustomTransition(nav),
  }
);

const AppContainer = createAppContainer(Screens);

const AppNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}} backgroundColor={theme.surface}>
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </SafeAreaView>
  );
};

export default AppNavigator;
