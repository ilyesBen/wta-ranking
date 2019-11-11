import React from 'react';
import {Provider} from 'react-redux';
import store from 'store';
import AppNavigator from './navigator';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
