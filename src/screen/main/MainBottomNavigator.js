import React from 'react';

import MainScreenNavigator from './mainscreen/MainScreenNavigator';
import BibleScreen from './BibleScreen';
import QuizScreen from './QuizScreen';
import OptionScreen from './OptionScreen'


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Image } from 'react-native';

const Tab = createBottomTabNavigator();

/**
 * Navigation 이름과 Focus 옵션에 따른 이미지 Path를 가져옴.
 * 이미지이름이나 Navigation 이름이 변경될경우 꼭 같이 수정해야 함.
 * @param navName
 * @param focused
 */

const setBottomIconImagePath = (navName, focused) => {
  const key = navName + (focused? 'Focus': '');
  console.log(key);

  const imagePath = {
    MainScreen: require('assets/ic_heart_off.png'),
    MainScreenFocus: require('assets/ic_heart_off.png'),
    BibleScreen: require('assets/ic_thecross_off.png'),
    BibleScreenFocus: require('assets/ic_thecross_on.png'),
    QuizScreen: require('assets/ic_question_off.png'),
    QuizScreenFocus: require('assets/ic_question_on.png'),
    OptionScreen: require('assets/ic_option_off.png'),
    OptionScreenFocus: require('assets/ic_option_on.png')
  };
  console.log(key);
  return imagePath[key];
};


const MainBottomTabNavigator = function() {
  return (
    <Tab.Navigator
      initialRouteName="MainScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconPath = setBottomIconImagePath(route.name, focused);
          console.log('----------');
          console.log(iconPath);
          // You can return any component that you like here!
          return <Image style={{width: 25, height: 25}} source={iconPath}/>;

        },
      })}

    >
      <Tab.Screen
        name="MainScreen"
        component={MainScreenNavigator}
        options = {({route}) => ({
          tabBarLabel: '메인',
        })}
      />
      <Tab.Screen
        name="BibleScreen"
        component={BibleScreen}
        options = {({route}) => ({
          tabBarLabel: '성경',
        })}
      />
      <Tab.Screen
        name="QuizScreen"
        component={QuizScreen}
        options = {({route}) => ({
          tabBarLabel: '세례문답',
        })}
      />
      <Tab.Screen
        name="OptionScreen"
        component={OptionScreen}
        options={{
          tabBarLabel: '더보기',
        }}
      />
    </Tab.Navigator>
  )
};

export default MainBottomTabNavigator






