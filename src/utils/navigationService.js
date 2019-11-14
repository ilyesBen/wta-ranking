import {NavigationActions} from 'react-navigation';

let navigator;

const setTopLevelNavigator = navigatorRef => {
  navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};

const goBack = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.back({
      routeName,
      params,
    })
  );
};

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
};
