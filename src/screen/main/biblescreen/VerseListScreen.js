import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Clipboard,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Toast, {DURATION} from 'react-native-easy-toast';
import BibleListOption from '/components/option/BibleListOption';
import BibleNoteOption from '/components/option/BibleNoteOption';
import FontChangeOption from '/components/option/FontChangeOption';
import {uuidv4, getArrayItemsFromAsyncStorage, setArrayItemsToAsyncStorage} from '/utils';

// SQLITE 성공/실패 예외처리
const errorCallback = (e) => {
  console.log('DB connection fail');
  // console.log(e.message);
};
const okCallback = (result) => {
  console.log('DB connection success');
  // console.log(result);
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
  constructor(props) {
    super(props);
    this.state = {
      verseItems: [],
      modalVisible: false,
      memoModalVisible: false,
      memoModalSaveButtonActive: false,
      bibleListOptionIconUri: require('assets/ic_option_list_off.png'),
      bibleNoteOptionIconUri: require('assets/ic_option_note_off.png'),
      fontChangeOptionIconUri: require('assets/ic_option_font_off.png'),
      optionComponentState: '',
    };

    this.modalBibleItem = {};
  }

  componentDidMount() {
    const { route } = this.props;
    const {bookName, bookCode, chapterCode}  = route.params;

    const getBibleVerseItems = () => {
      return new Promise((resolve, reject) => {
        let bibleDB = SQLite.openDatabase({name : "bible.db", createFromLocation : 1}, okCallback, errorCallback);
        bibleDB.transaction((tx) => {
          //성경의 절과 내용을 모두 가져오는 쿼리를 선언
          const query = `SELECT verse, content FROM bible_korHRV where book = ${bookCode} and chapter = ${chapterCode}`;
          tx.executeSql(query, [],
            (tx, results) => {
              let verseItemsLength = results.rows.length;
              const verseItems = [];

              for (let i = 0; i < verseItemsLength; i++) {
                const content = results.rows.item(i).content;
                const verseCode = results.rows.item(i).verse;
                verseItems.push(
                  {
                    bookName,
                    bookCode,
                    chapterCode,
                    content,
                    verseCode
                  })
              }
              resolve(verseItems);
            })
        })
      })
    };

    /**
     * VerseItem을 입력받아 isHighlight 값을 설정하는 메서드.
     * 1. Json 파싱을 통해 highlightList에서부터 하이라이트 목록을 받아온다.
     * 2. 현재 verseItems중 hightlightList에 bookCode, chapterCode, VerseCode가 일치하는 목록이 있다면 isHighlight = true인 verseItems을 return한다.
     */
    const getHighlight = (verseItems) => {
      return new Promise((resolve, reject) => {
        getArrayItemsFromAsyncStorage('highlightList').then((items) => {
          verseItems.map((verse) => {
            // || items === undefined
            if (items === null)
              items = [];
            const index = items.findIndex((highlight) => {
              return ((highlight.bookCode === verse.bookCode) && (highlight.chapterCode === verse.chapterCode) && (highlight.verseCode === verse.verseCode))
            });
            (index > -1) ? verse.isHighlight = true : verse.isHighlight = false;
            return verse;
          });
          resolve(verseItems);
        });
      })
    };

    new getBibleVerseItems()
      .then(getHighlight)
      .then((verseItems) => {
        this.setState({verseItems});
      })
  }

  // // ScrollTo 테스트
  // flatListRef;
  // scrollTo = () =>{
  //   console.log('scrollTo');
  //   this.flatListRef.scrollToIndex({animated: true, index: 20-1})
  // };

  /**
   * LongClick시 나오는 클립보드, 형광펜, 메모에대한 동작을 수행한다.
   * 클립보드 : 클립보드 복사.
   * 하이라이트 : 해당 성경의 verse를 Asynctask를 통해 highlightList에 입력.
   * 메모 : 메모 모달 화면 열기
   */
  setModalVisible(visible, modalAction) {
    this.setState({modalVisible: visible});
    const {bookName, bookCode, chapterCode, verseCode, content} = this.modalBibleItem;
    switch (modalAction) {
      case 'copy':
        Clipboard.setString(content);
        this.refs.toast.show('클립보드에 복사되었습니다.');
        break;
      case 'highlight':
        getArrayItemsFromAsyncStorage('highlightList').then((items) => {
          if (items === null) items = [];
          items.push({bookCode, chapterCode, verseCode});
          setArrayItemsToAsyncStorage('highlightList', items).then((result) => {
            console.log(result);
          })
        });

        this.componentDidMount();
        this.refs.toast.show('형광펜으로 밑줄 ^^');
        break;
      case 'memo':
        // 메모 모달 동작
        this.setMemoModalVisible(true);
        break;
    }
  }

  setMemoModalVisible(visible) {
    this.setState(
      {
        memoModalVisible: visible,
        memoModalSaveButtonActive: false,
      });
  }

  // 성경의 아이템을 길게 눌렀을때 모달 화면을 보여주는 메서드.
  // 복사, 형광펜, 메모 기능을 위해 해당 값을 전달받는다.
  onLongPressButton = (item) => () => {
    this.modalBibleItem = item;
    this.setModalVisible(true);
  };

  // 하단 3개의 옵션 버튼 클릭시 아이콘을 바꿔주고 해당 옵션에 대한 컴포넌트를 렌더링 하기 위한 state를 바꿔줌.
  switchFooterOptionButtonIconAndState = (optionType) => () => {
    switch (optionType) {
      case 'bibleList':
        this.setState({
          bibleListOptionIconUri: require('assets/ic_option_list_on.png'),
          bibleNoteOptionIconUri: require('assets/ic_option_note_off.png'),
          fontChangeOptionIconUri: require('assets/ic_option_font_off.png'),
          optionComponentState: 'bibleList',
        });
        break;
      case 'bibleNote':
        this.setState({
          bibleListOptionIconUri: require('assets/ic_option_list_off.png'),
          bibleNoteOptionIconUri: require('assets/ic_option_note_on.png'),
          fontChangeOptionIconUri: require('assets/ic_option_font_off.png'),
          optionComponentState: 'bibleNote',
        });
        break;
      case 'fontChange':
        this.setState({
          bibleListOptionIconUri: require('assets/ic_option_list_off.png'),
          bibleNoteOptionIconUri: require('assets/ic_option_note_off.png'),
          fontChangeOptionIconUri: require('assets/ic_option_font_on.png'),
          optionComponentState: 'fontChange',
        });
        break;
      case "default":
        this.setState({
          bibleListOptionIconUri: require('assets/ic_option_list_off.png'),
          bibleNoteOptionIconUri: require('assets/ic_option_note_off.png'),
          fontChangeOptionIconUri: require('assets/ic_option_font_off.png'),
          optionComponentState: 'default',
        })
    }
  };

  closeFooterOption = () => {
    let closeFunction = this.switchFooterOptionButtonIconAndState("default");
    closeFunction();
  };

  // 각 옵션에 대한 컴포넌트를 화면에 그려주는 메서드.
  showOptionComponent() {
    let visibleOptionComponent;
    switch (this.state.optionComponentState) {
      case 'bibleList':
        visibleOptionComponent = <BibleListOption/>;
        break;
      case 'bibleNote':
        visibleOptionComponent = <BibleNoteOption closeHandler={this.closeFooterOption}/>;
        break;
      case 'fontChange':
        visibleOptionComponent = <FontChangeOption/>;
        break;
      case 'default':
        visibleOptionComponent = null;
    }
    return visibleOptionComponent;
  }

  // 성경의 verse를 Long Click시에 modal을 띄워준다.
  LongClickModal = () => {
    return (
      <Modal
        style={styles.modal}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>{this.modalBibleItem.bookName} {this.modalBibleItem.chapterCode}장 {this.modalBibleItem.verseCode}절</Text>
            <View style={styles.modalViewItems}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(false, 'copy');
                }}>
                <Image style={[styles.modalItemImage, {marginRight: 2}]} source={require('/assets/ic_copy.png')}/>
                <Text style={styles.modalItemText}>복사</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(false, 'highlight');
                }}>
                <Image style={styles.modalItemImage} source={require('/assets/ic_color_pen.png')}/>
                <Text style={styles.modalItemText}>형광펜</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(false, 'memo');
                }}>
                <Image style={[styles.modalItemImage, {marginLeft: 3}]} source={require('/assets/ic_memo.png')}/>
                <Text style={styles.modalItemText}>메모</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => {
                this.setModalVisible(false);
              }}>
              <Text style={styles.modalItemText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  };

  MemoModal = () => {
    const {bookName, bookCode, chapterCode, verseCode, content} = this.modalBibleItem;
    // 메모 입력시 왼쪽 상단위의 저장버튼에 대한 활성화를 지정한다.
    // inputText의 값 0 => inactive / 1 => active
    let memo;
    const onChangeText = (text) => {
      if (text.length === 0) {
        this.setState({
          memoModalSaveButtonActive: false,
        })
      }
      // setState가 반복적으로 호출되는것을 막기 위해 memoModalSaveButtonActive 설정.
      else if (!this.state.memoModalSaveButtonActive && text.length >= 1) {
        this.setState({
          memoModalSaveButtonActive: true,
        })
      }
      memo = text;
    };

    const onPressSaveButton = () => {
      getArrayItemsFromAsyncStorage('memoList').then((items) => {
        const objectId = uuidv4();
        const date = new Date();
        items.push({objectId, bookName, chapterCode, verseCode, memo, date, content});
        setArrayItemsToAsyncStorage('memoList', items).then((result) => {
          console.log(result);
        })
      });

      this.setMemoModalVisible(false);
    };

    return (
      <Modal
        style={styles.modal}
        transparent={true}
        visible={this.state.memoModalVisible}>
        <View style={styles.memoModalContainer}>
          <View style={styles.memoModalView}>
            <View style={styles.memoModalHeader}>
              <TouchableOpacity style={styles.memoModalHeaderSave}>
                {
                  this.state.memoModalSaveButtonActive
                  ? <Text style={styles.memoModalHeaderSaveTextActive} onPress={onPressSaveButton}>저장</Text>
                  : <Text style={styles.memoModalHeaderSaveText}>저장</Text>
                }
              </TouchableOpacity>
              <Text style={styles.memoModalHeaderText}>메모</Text>
              <TouchableOpacity style={styles.memoModalHeaderCancel} onPress={() => this.setMemoModalVisible(false)}>
                <Image style={styles.memoModalHeaderCancelImage} source={require('/assets/ic_close.png')}/>
              </TouchableOpacity>
            </View>
            <View style={styles.memoModalBible}>
              <Text style={styles.memoModalBibleVerse}>{bookName} {chapterCode}장 {verseCode}절</Text>
              <Text style={styles.memoModalBibleContent}>{content}</Text>
            </View>
            <TextInput onChangeText={onChangeText.bind(this)} multiline={true} placeholder={"메모를 입력해주세요."} style={styles.memoModalTextInput}/>
          </View>
        </View>
      </Modal>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        {this.LongClickModal()}
        {this.MemoModal()}

        <FlatList
          style={styles.flatList}
          data={this.state.verseItems}
          keyExtractor={item => item.id}
          ref={(ref) => {this.flatListRef = ref;}}
          renderItem={({item, index}) => {
            let verseCode = index + 1;
            return (
              <TouchableOpacity style={styles.flatListItem} onLongPress={this.onLongPressButton(item)}>
                <Text style={styles.flatListItemTextLabel}> {verseCode}.</Text>
                {item.isHighlight ? <Text style={styles.flatListItemTextHighlight}>{item.content}</Text> : <Text style={styles.flatListItemText}>{item.content}</Text>}
              </TouchableOpacity>
            )
          }}
        />

        {/* 하단 목차, 성경노트, 보기설정에 대한 footer option */}

        <View keyboardVerticalOffset={10} contentContainerStyle={{borderColor: 'red'}} style={styles.footerOptionContainer}>
          <TouchableOpacity style={styles.footerOptionContainerItem} onPress={this.switchFooterOptionButtonIconAndState('bibleList')}>
            <Image style={styles.footerOptionIcon} source={this.state.bibleListOptionIconUri} />
            <Text>목차</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerOptionContainerItem} onPress={this.switchFooterOptionButtonIconAndState('bibleNote')}>
            <Image style={styles.footerOptionIcon} source={this.state.bibleNoteOptionIconUri} />
            <Text>성경노트</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerOptionContainerItem} onPress={this.switchFooterOptionButtonIconAndState('fontChange')}>
            <Image style={styles.footerOptionIcon} source={this.state.fontChangeOptionIconUri} />
            <Text>보기설정</Text>
          </TouchableOpacity>
        </View>

        {this.showOptionComponent()}
        <Toast ref="toast"
               positionValue={130}
               fadeInDuration={200}
               fadeOutDuration={1000}
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
    backgroundColor: 'white',
  },

  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
  },

  flatListItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 2,
    paddingRight: 2,
    flexDirection: 'row'
  },

  flatListItemTextLabel: {
    marginLeft: '2%',
    width:'6%'
  },

  flatListItemText: {
    width: '88%',
    color: 'black',
  },

  flatListItemTextHighlight: {
    width: '88%',
    color: 'black',
    textShadowColor: 'yellow',
    textShadowRadius: 15
  },
  /* 모달 뷰 */
  modal: {
    borderWidth: 1,
    borderColor: 'red',
  },

  modalContainer: {
    // backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalView: {
    width: 250,
    height: 180,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },

  modalHeader: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10
  },

  modalViewItems: {
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 25
  },

  modalItemText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },

  modalItemImage: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
  },

  modalCancel: {
    width: '100%',
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4'
  },

  /* 메모 모달 뷰 */

  memoModalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  memoModalView: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },

  memoModalHeader: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },

  memoModalHeaderSave: {},

  memoModalHeaderSaveText: {
    fontSize: 16,
    color: '#E0E0E0'
  },

  memoModalHeaderSaveTextActive: {
    fontSize: 16,
    color: '#2F80ED'
  },

  memoModalHeaderText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 1,
  },

  memoModalHeaderCancel: {},

  memoModalHeaderCancelText: {
    fontSize: 20,
  },

  memoModalHeaderCancelImage: {
    width: 25,
    height: 25,
  },

  memoModalBible: {
    width:'100%',
    backgroundColor: '#F3F4F9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },

  memoModalBibleVerse: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    fontWeight: 'bold',
  },

  memoModalBibleContent: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%'
  },

  memoModalTextInput: {
    width: '100%',
    height: 100,
    textAlignVertical: 'top',
    padding: '5%'
  },


  /* 푸터 옵션 */
  footerOptionContainer: {
    borderWidth: 1,
    position: 'absolute',
    left: '2.5%',
    bottom: '5%',
    width: '95%',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },

  footerOptionContainerItem: {
    width: '30%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerOptionIcon: {
    width: 40,
    height: 30,
    resizeMode: 'contain'
  },
});
