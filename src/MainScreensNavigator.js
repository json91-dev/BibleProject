import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import MainScreen from './MainScreen';
import BibleScreen from './BibleScreen';
import QuizScreen from './QuizScreen';

export const MainScreensNavigator = createBottomTabNavigator({
    "메인": MainScreen,
    "성경": BibleScreen,
    "세례문답": QuizScreen,
    "더보기": QuizScreen,
  },
  // {
  //   defaultNavigationOptions: ({ navigation }) => {
  //     const { routeName } =navigation.state;
  //     let IconComponent =
  //   }
  // },
);

export default createAppContainer(MainScreensNavigator);

