import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { enableScreens } from 'react-native-screens'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import authReducer from './store/reducers/auth'

import AppNavigator from './navigation/AppNavigator'

enableScreens()

const rootReducer = combineReducers({
  auth: authReducer
})

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
))

export default function App() {
  return (
    <Provider store = { store }>
      <AppNavigator />
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
