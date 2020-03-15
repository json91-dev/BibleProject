import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text, TouchableOpacity, Image,
} from 'react-native';

import BookListComponent from './BookListComponent';
import ChapterListComponent from './ChapterListComponent';
import VerseListComponent from './VerseListComponent';

// SQLITE 성공/실패 예외처리
const errorCallback = (e) => {
  console.log('DB connection fail');
  // console.log(e.message);
};
const okCallback = (result) => {
  console.log('DB connection success');
  // console.log(result);
};



export default class BibleListOption extends Component {
  state = {
    bookName: null,
    bookCode: null,
    chapterCode: null,
    pageStack: 0,
    verseText : null,
  };

  closeMemoComponent = () => {
    this.props.closeHandler();
  };

  Header = () => {
    const pageStack = this.state.pageStack;
    const headerBackButton = () => {
      return (
        (pageStack === 0)
          ? <View style={{marginRight: 20}}></View>
          : <Image style={styles.headerLeftImage} source={require('/assets/ic_left_arrow.png')}/>
      )
    };

    const headerText = () => {
      return (
        (pageStack === 0)
          ? <Text style={styles.headerText}>목차</Text>
          : <Text style={styles.headerText}>{this.state.verseText}</Text>
      )
    };

    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={this.backToMemoList}>
          {headerBackButton()}
        </TouchableOpacity>
        {headerText()}
        <TouchableOpacity onPress={this.closeMemoComponent}>
          <Image style={styles.headerRightImage} source={require('/assets/ic_close.png')}/>
        </TouchableOpacity>
      </View>
    )
  };

  BodyComponent = () => {
    const pageStack = this.state.pageStack;
    switch (pageStack) {
      case 0:
        const bibleType = this.props.bibleType;
        return (
          <BookListComponent bibleType={bibleType} changePageHandler={this.changePage}/>
        );
        break;
      case 1:
        return (
          <ChapterListComponent changePageHandler={this.changePage} bookName={this.state.bookName} bookCode={this.state.bookCode} />
        );
        break;
      case 2:
        return (
          <VerseListComponent changeScreenHandler={this.props.changeScreenHandler} bookName={this.state.bookName} bookCode={this.state.bookCode} chapterCode={this.state.chapterCode} />
        );
        break;
    }
  };

  /**
   * 성경책 목록에서 책을 클릭하면 page와 상단 제목을 바꿔준다.
   */
  changePage = (pageStack, bookName, bookCode, chapterCode) => () => {
    let verseText;
    if (pageStack === 1) {
      verseText = bookName
    } else if (pageStack === 2) {
      verseText = `${bookName} ${chapterCode}장`;
    }

    this.setState({
      pageStack,
      bookName,
      bookCode,
      chapterCode,
      verseText,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.Header()}
        {this.BodyComponent()}
      </View>
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
    height: '75%',
    top: 30,
    borderRadius: 5,
    backgroundColor: 'white',
    left: '2.5%',
    borderWidth: 1
  },


  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingTop: 13,
    paddingBottom: 13,
    paddingRight: 5,
    paddingLeft: 5,
    height: '15%',
  },

  headerLeftImage: {
    width: 20,
    height: 20,
    marginTop: 5,
    resizeMode: 'contain',
  },

  headerText: {
    marginTop: 4,
    fontSize: 18,
    marginLeft: 5,
    fontWeight: 'bold'
  },

  headerRightImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },

});
