// MainScreen에는 StackNavigator 추가한다.
// 성경책 스택을 위한 Navigator
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import MainScreen from './MainScreen'
import BookListScreen from './BookListScreen';
import ChapterListScreen from './ChapterListScreen';
import VerseListScreen from './VerseListScreen';
import ContentListScreen from './ContentListScreen';
import {TouchableOpacity, Image} from 'react-native';

const Stack = createStackNavigator();

const BookListScreenOption = {
  headerTitle: '구약성경',
  headerTitleAlign: 'center',
  headerRight: () => (
    <TouchableOpacity activeOpacity={0.5}>
      <Image
        source={require('../../../assets/ic_recentlist.png')}
        style={{width:20, height: 20, marginRight: 10}}
      />
    </TouchableOpacity>
  ),
};

const ChapterListScreenOption = ({route}) => (
  {
    title: route.params.bookName,
    headerTitleAlign: 'center',
  });
const VerseListScreenOption = ({route}) => (
  {
    title: `${route.params.bookName} ${route.params.chapterCode}장`,
    headerTitleAlign: 'center',
  });
const ContentListScreenOption = ({route}) => (
  {
    title: `${route.params.bookName}`,
    headerTitleAlign: 'center',
  }
)

function MainScreenNavigator () {
  return (
    <Stack.Navigator initialRouteName = "MainScreen">
      <Stack.Screen name="MainScreen" options={{ headerShown: false }} component={MainScreen}/>
      <Stack.Screen name="BookListScreen" options={BookListScreenOption} component={BookListScreen}/>
      <Stack.Screen name="ChapterListScreen" options={ChapterListScreenOption} component={ChapterListScreen} />
      <Stack.Screen name="VerseListScreen" options={VerseListScreenOption} component={VerseListScreen} />
      <Stack.Screen name="ContentListScreen" options={ContentListScreenOption} component={ContentListScreen} />
    </Stack.Navigator>
  )
}

export default MainScreenNavigator;
