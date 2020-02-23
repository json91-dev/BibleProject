// MainScreen에는 StackNavigator 추가한다.
// 성경책 스택을 위한 Navigator
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import OptionMainScreen from './OptionMainScreen'

import {TouchableOpacity, Image} from 'react-native';

const Stack = createStackNavigator();

function MainScreenNavigator () {
  return (
    <Stack.Navigator initialRouteName = "OptionMainScreen">
      <Stack.Screen name="OptionMainScreen" options={{ headerShown: false}} component={OptionMainScreen}/>
    </Stack.Navigator>
  )
}

export default MainScreenNavigator;
