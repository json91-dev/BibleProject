import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import BookListComponent from './biblelist/BookListComponent';
import ChapterListComponent from './biblelist/ChapterListComponent';
import VerseListComponent from './biblelist/VerseListComponent';

// SQLITE 성공/실패 예외처리
const errorCallback = (e) => {
  console.log('DB connection fail');
  // console.log(e.message);
};
const okCallback = (result) => {
  console.log('DB connection success');
  // console.log(result);
};


// then create a provider Component;
const BibleContext = React.createContext(
  {
    bookName: null,
    bookCode: null,
    chapterCode: null,
    pageStack: 0, // 0: BookListComponent, 1: ChapterListComponent, 2: VerseListComponent,
  }
);


export default class BibleListOption extends Component {
  state = {
    bookName: null,
    bookCode: null,
    chapterCode: null,
  };

  render() {
    return (
      <View></View>
    )
  }
}

/*
      <BibleContext.Provider style={styles.container}>
        <BookListComponent/>
        <ChapterListComponent/>
        <VerseListComponent/>
      </BibleContext.Provider>

 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '95%',
    top: 30,
    borderRadius: 5,
    backgroundColor: 'white',
    left: '2.5%',
    height: 200,
    borderWidth: 1
  },
});
