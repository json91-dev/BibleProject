import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import LoginScreen from '../login/LoginScreen';
import MainScreen from './MainScreen';
import MainBibleScreen from './BibleScreen';
import MainQuizScreen from './QuizScreen';

import { createStackNavigator } from '@react-navigation/stack';

// TODO: screen 구조 진행.

// 메인화면 하단 bottomTab을 위한 Navigator
const MainBottomTabNavigator = createBottomTabNavigator({
    "메인": MainScreen,
    "성경": MainBibleScreen,
    "세례문답": MainQuizScreen,
    "더보기": MainQuizScreen,
  },
  // {
  //   defaultNavigationOptions: ({ navigation }) => {
  //     const { routeName } =navigation.state;
  //     let IconComponent =
  //   }
  // },
);





