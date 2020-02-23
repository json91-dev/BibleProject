// MainScreen에는 StackNavigator 추가한다.
// 성경책 스택을 위한 Navigator
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import MainScreen from './QuizMainScreen'
const Stack = createStackNavigator();

function MainScreenNavigator () {
  return (
    <Stack.Navigator initialRouteName = "QuizMainScreen">
      <Stack.Screen name="QuizMainScreen" options={{ headerShown: false}} component={MainScreen}/>
    </Stack.Navigator>
  )
}

export default MainScreenNavigator;
