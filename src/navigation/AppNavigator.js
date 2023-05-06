
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import SuperFormula from '../screens/superformula'
import Collect from '../screens/superformula/Collect';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import History from '../screens/history';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3399ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTopInsetEnabled: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={SuperFormula} />
          {/* <Stack.Screen name="TCR" component={SuperFormula} />
          <Stack.Screen name="Other" component={SuperFormula} /> */}
          <Stack.Screen name="Collect" component={Collect} />
          <Stack.Screen name="Check" component={Collect} />
          <Stack.Screen name="Cancel" component={Collect} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigator;
