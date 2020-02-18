import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList, TouchableOpacity,
  Modal,
  TouchableHighlight,
  Alert
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

import PopoverTooltip from 'react-native-popover-tooltip';

// SQLITE 성공/실패 예외처리
const errorCallback = (e) => {
  console.log('Error');
  console.log(e.message);
};
const okCallback = (result) => {
  console.log('okay');
  console.log(result);
};

/**
 * 축약 문자열 표현을 위한 함수.
 */
function textLengthOverCut(txt, len, lastTxt) {
  if (len == "" || len == null) { // 기본값
    len = 30;
  }
  if (lastTxt == "" || lastTxt == null) { // 기본값
    lastTxt = "...";
  }
  if (txt.length > len) {
    txt = txt.substr(0, len) + lastTxt;
  }
  return txt;
}


export default class VerseListScreen extends Component {
  state = {
    bookCode: 0,
    chapterCode: 0,
    verseItems: [],
    modalVisible: false,
  };

  componentDidMount() {
    const { route } = this.props;
    this.setState({
      bookName: route.params.bookName,
      bookCode: route.params.bookCode,
      chapterCode: route.params.chapterCode,
    });

    /**
     * SQLITE LOAD
     */
    let bibleDB = SQLite.openDatabase({name : "bible.db", createFromLocation : 1}, okCallback, errorCallback);
    bibleDB.transaction((tx) => {
      //성경의 절과 내용을 모두 가져오는 쿼리를 선언
      const query = `SELECT verse, content FROM bible_korHRV where book = ${this.state.bookCode} and chapter = ${this.state.chapterCode}`;

      tx.executeSql(query, [],
        (tx, results) => {
        let verseItemsLength = results.rows.length;
        console.log(verseItemsLength +'아이템갯수');
        const verseItems = [];
        /**
         * Item insert
         */
        for (let i = 0; i < verseItemsLength; i++) {
          const content = results.rows.item(i).content;
          console.log(i + 1, content);
          verseItems.push(
            {
              bookCode: this.state.bookCode,
              bookName: this.state.bookName,
              content,
            })
        }
        this.setState({verseItems});
      })
    })
  }

  goToContentListScreen = (bookInfo) => {
    console.log(bookInfo.bookName);
    this.props.navigation.navigate('ContentListScreen',
      {
        bookName: bookInfo.bookName,
        bookCode: bookInfo.bookCode,
        chapterCode: bookInfo.chapterCode,
      });
  };

  // // ScrollTo 테스트
  // flatListRef;
  // scrollTo = () =>{
  //   console.log('scrollTo');
  //   this.flatListRef.scrollToIndex({animated: true, index: 20-1})
  // };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onLongPressButton = () => {
    this.setModalVisible(true);
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('모달 닫힘');
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>


        <FlatList
          style={styles.flatList}
          data={this.state.verseItems}
          keyExtractor={item => item.id}
          ref={(ref) => {this.flatListRef = ref;}}
          renderItem={({item, index}) => {
            let verseCode = index + 1;
            return (
              <TouchableOpacity style={styles.flatListItem} onLongPress={this.onLongPressButton.bind(this)} >
                <Text style={styles.flatListItemText}>{verseCode}.    {item.content}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white'
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
  },
  flatList: {

  },
  flatListItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 2,
    paddingRight: 2,

  },
  flatListItemText: {
    color: 'black'
  }
});
