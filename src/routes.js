import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main/index';
import User from './pages/User/index';

const AppStack = createStackNavigator();

export default function Routes() {
  const options = {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#7159c1',
    },
    headerTitleStyle: {
      color: '#FFF',
    },
    headerTintColor: '#FFF',
  };

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={options}>
        <AppStack.Screen name="Main" component={Main} />
        <AppStack.Screen name="User" component={User} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
