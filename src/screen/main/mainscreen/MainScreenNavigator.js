// MainScreen에는 StackNavigator 추가한다.
// 성경책 스택을 위한 Navigator
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';;
import React from 'react';

import MainScreen from './MainScreen'
import BookListScreen from './BookListScreen';
import ChapterListScreen from './ChapterListScreen';
import VerseListScreen from './VerseListScreen';
import ContentScreen from './ContentScreen';

const Stack = createStackNavigator();


function MainScreenNavigator () {
  return (
    <Stack.Navigator initialRouteName = "MainScreen">
      <Stack.Screen name="MainScreen" options={{ headerShown: false }} component={MainScreen}/>
      <Stack.Screen name="BookListScreen" options={{ headerShown: false }} component={BookListScreen}/>
      <Stack.Screen name="ChapterListScreen" options={{ headerShown: false }} component={ChapterListScreen} />
      <Stack.Screen name="VerseListScreen" options={{ headerShown: false }} component={VerseListScreen} />
      <Stack.Screen name="ContentScreen" options={{ headerShown: false }} component={ContentScreen} />
    </Stack.Navigator>
  )
}

export default MainScreenNavigator;
