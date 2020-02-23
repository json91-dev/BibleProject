// MainScreen에는 StackNavigator 추가한다.
// 성경책 스택을 위한 Navigator
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import BibleMainScreen from './BibleMainScreen'
import BookListScreen from './BookListScreen';
import ChapterListScreen from './ChapterListScreen';
import VerseListScreen from './VerseListScreen';
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
  });

function BibleScreenNavigator ({navigation, route}) {
  /* 하단 탭바 출력 설정 */
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false})
  } else {
    navigation.setOptions({tabBarVisible: true})
  }
  return (
    <Stack.Navigator initialRouteName = "BibleMainScreen">
      <Stack.Screen name="BibleMainScreen" options={{ headerShown: false, }}  component={BibleMainScreen}/>
      <Stack.Screen name="BookListScreen" options={BookListScreenOption} component={BookListScreen}/>
      <Stack.Screen name="ChapterListScreen" options={ChapterListScreenOption} component={ChapterListScreen} />
      <Stack.Screen name="VerseListScreen" options={VerseListScreenOption} component={VerseListScreen} />
    </Stack.Navigator>
  )
}

export default BibleScreenNavigator;
