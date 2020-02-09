import React from 'react';

import MainScreenNavigator from './mainscreen/MainScreenNavigator';
import BibleScreen from './BibleScreen';
import QuizScreen from './QuizScreen';
import OptionScreen from './OptionScreen'


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Image } from 'react-native';

const Tab = createBottomTabNavigator();

const MainBottomTabNavigator = function() {
  return (
    <Tab.Navigator
      initialRouteName="MainScreen">
      <Tab.Screen
        name="MainScreen"
        component={MainScreenNavigator}
        options={{
          tabBarLabel: '메인',
          tabBarIcon: ({ color, size }) => (
            <Image style={{width: 25, height: 25}} source={require('../../assets/ic_heart_off.png')}/>
          ),
        }}
      />
      <Tab.Screen
        name="BibleScreen"
        component={BibleScreen}
        options={{
          tabBarLabel: '성경',
          tabBarIcon: ({focus, color, size }) => (
            <Image style={{width: 25, height: 25}} source={require('../../assets/ic_thecross_on.png')}/>
          ),
        }}
      />
      <Tab.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{
          tabBarLabel: '세례문답',
          tabBarIcon: ({ color, size }) => (
            <Image style={{width: 25, height: 25}} source={require('../../assets/ic_question_off.png')}/>
          ),
        }}
      />
      <Tab.Screen
        name="OptionScreen"
        component={OptionScreen}
        options={{
          tabBarLabel: '더보기',
          tabBarIcon: ({ color, size }) => (
            <Image style={{width: 25, height: 25}} source={require('../../assets/ic_option_off.png')}/>
          ),
        }}
      />
    </Tab.Navigator>
  )
};

export default MainBottomTabNavigator






