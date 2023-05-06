import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import AppNavigator from './AppNavigator';

const AppContainer = () => {
  const [initializing] = useState(false);
  if (initializing) {
    return null;
  }
  return <AppNavigator /> ;
};

export default AppContainer;

const styles = StyleSheet.create({});
