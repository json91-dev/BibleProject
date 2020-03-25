// MainScreen에는 StackNavigator 추가한다.
// 성경책 스택을 위한 Navigator
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import OptionMainScreen from './OptionMainScreen'
import ProfileEditScreen from './ProfileEditScreen'

import {TouchableOpacity, Image} from 'react-native';

const Stack = createStackNavigator();

function MainScreenNavigator () {
  return (
    <Stack.Navigator initialRouteName = "OptionMainScreen">
      <Stack.Screen name="OptionMainScreen" options={{ headerShown: false}} component={OptionMainScreen}/>
      <Stack.Screen name="ProfileEditScreen" options={{title: '프로필 수정', headerTitleAlign: 'center'}} component={ProfileEditScreen}/>
    </Stack.Navigator>
  )
}

export default MainScreenNavigator;
