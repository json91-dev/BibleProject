import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  Image
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import BibleScreenNavigator from './BibleScreenNavigator';

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
        const verseItems = [];
        /**
         * Item insert
         */
        for (let i = 0; i < verseItemsLength; i++) {
          const content = results.rows.item(i).content;
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
          style={styles.modal}

          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.modalItemText}>복사</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.modalItemText}>형광펜</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.modalItemText}>메모</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.modalItemText}>취소</Text>
              </TouchableOpacity>
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

        <View style={styles.footerOptionContainer}>
          <TouchableOpacity style={styles.footerOptionContainerItem}>
            <Image style={styles.footerOptionIcon} source={require('assets/ic_option_list_off.png')} />
            <Text>목차</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerOptionContainerItem}>
            <Image style={styles.footerOptionIcon} source={require('assets/ic_option_note_off.png')} />
            <Text>성경노트</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerOptionContainerItem}>
            <Image style={styles.footerOptionIcon} source={require('assets/ic_option_font_off.png')} />
            <Text>보기설정</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'white',

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
  },

  modal: {
    borderWidth: 1,
    borderColor: 'red',
  },

  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalView: {
    width: 200,
    height: 150,
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AEAEAE'
  },

  modalItem: {

  },

  modalItemText: {
    color: 'white',
    fontSize: 15
  },

  footerOptionContainer: {
    borderWidth: 1,
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: '5%',
    width: '100%',
    height: 70,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },

  footerOptionContainerItem: {
    width: '30%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },

  footerOptionIcon: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
  }

});
