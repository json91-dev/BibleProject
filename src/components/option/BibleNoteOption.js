import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';

import {getArrayItemsFromAsyncStorage, setArrayItemsToAsyncStorage} from '/utils'
/**
 * 60분 내외 : n분전
 * 1시간 ~ 24시간 : n시간전
 * 24시간 이상 : 1일전
 * 30일 이상 1달전
 */
function getPassTimeText(oldDateString) {
  let nowDate = new Date();
  let oldDate = new Date(oldDateString);

  let now = nowDate.getTime();
  let old = oldDate.getTime();

  let min_gap = Math.floor((now - old) / 1000 / 60);
  let hour_gap = Math.floor((now - old) / 1000 / 60 / 60);
  let day_gap = Math.floor((now - old) / 1000 / 60 / 60 / 24);
  let month_gap = Math.floor((now - old) / 1000 / 60 / 60 / 24 / 30);

  if (min_gap < 5) {
    return '방금전';
  }

  if (min_gap >= 5 && min_gap < 60) {
    return min_gap + '분전';
  }

  if (hour_gap < 24) {
    return hour_gap + '시간전';
  }

  if (day_gap < 31) {
    return day_gap + "일전";
  }

  return month_gap + '달전';
}


export default class BibleNoteOption extends Component {
  state = {
    noteItems: [],
    isNoteItemUpdate: false,
    isOpenMemoEdit: false,

    memoEditObjectId: null,
    memoEditVerseText: null,
    memoEditContent: null,
    memoEditMemo: null,
    memoEditTextInput: '',
  };

  /**
   * AsyncStorage의 memoList(기록한 메모들)을 이용하여 noteItem을 만들어줌.
   * id, bookName, chapterCode, verseCode, content, date를 가져옴.
   */
  componentDidMount() {
    getArrayItemsFromAsyncStorage('memoList').then((items) => {
      let noteItems = [];
      items.forEach((memoItem) => {
        let passTimeText = getPassTimeText(memoItem.date);
        noteItems.push({objectId: memoItem.objectId, bookName: memoItem.bookName, chapterCode: memoItem.chapterCode, verseCode: memoItem.verseCode,memo: memoItem.memo ,content: memoItem.content, passTimeText: passTimeText});
      });
      this.setState({noteItems, isNoteItemUpdate: true});
    });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // 성경의 textInput이 변경되었을때는 해당 노트 컴포넌트를 리렌더링 하지 않음
    if (this.state.memoEditTextInput !== nextState.memoEditTextInput) {
      return false;
    }
    return true;
  }

  /**
   * 메모 수정 화면을 열어줌.
   * 메모 수정화면에 전달할 값들을 setState를 통해 지정
   * isOpenMemoEdit을 true로 만들어줌. (해당 값을 기준으로 화면 렌더링)
   */
  openMemoEdit = (objectId, verseText, content, memo) => () => {
    this.setState({
      memoEditObjectId: objectId,
      memoEditVerseText: verseText,
      memoEditContent: content,
      memoEditMemo: memo,
      memoEditTextInput: memo,
      isOpenMemoEdit: true,
    })
  };

  MemoNone = () => {
    if(this.state.noteItems.length === 0 && this.state.isNoteItemUpdate) {
      return (
        <View style={styles.memoNone}>
          <Image style={styles.memoNoneImage} source={require('/assets/ic_note.png')}/>
          <Text style={styles.memoNoneText}>메모한 흔적이 없어요.{'\n'}너무 소홀하셨던거 아닐까요?</Text>
        </View>
      )
    }
  };

  /**
   * 메모 리스트를 보여주는 화면
   */
  MemoList = () => {
    if(!this.state.isOpenMemoEdit) {
      // 최근에 입력한 노트가 위로오도록 array를 역순으로 바꿔줌.
      let noteItems = this.state.noteItems.reverse();
      return (
        <FlatList
          style={styles.flatList}
          data={noteItems}
          keyExtractor={item => item.id}
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          renderItem={({item, index}) => {
            const {objectId, bookName, chapterCode, verseCode, content, memo, passTimeText} = item;
            const verseText = `${bookName} ${chapterCode}장 ${verseCode}절`;
            return (
              <TouchableOpacity onPress={this.openMemoEdit(objectId, verseText, content, memo)}>
                <View style={styles.memoItem}>
                  <Text style={styles.memoItemIndex}>{index + 1}.</Text>
                  <View style={styles.memoItemContent}>
                    <Text style={styles.memoItemContentVerseText}>{verseText}</Text>
                    <Text style={styles.memoItemContentMemo}>{memo}</Text>
                    <Text style={styles.memoItemContentDate}>{passTimeText}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      )
    }
  };

  _onTextContentSizeChange(e) {

  }

  MemoEdit = () => {
    if(this.state.isOpenMemoEdit) {
      const {memoEditVerseText, memoEditContent, memoEditMemo} = this.state;
      return (
        <View style={styles.memoEdit}>
          <View style={styles.memoEditHeader}>
            <Text style={styles.memoEditVerseText}>{memoEditVerseText}</Text>
            <Text style={styles.memoEditContent}>{memoEditContent}</Text>
          </View>
          <TextInput style={styles.memoEditMemo} onContentSizeChange={this._onTextContentSizeChange} onChangeText={text => this.setState({memoEditTextInput: text})}>{memoEditMemo}</TextInput>
        </View>
      )
    }
  };

  backToMemoList = () => {
    // 바뀐 내용을 저장한다.
    // 공백이 있다면 해당 item을 메모리스트에서 삭제한다.

    getArrayItemsFromAsyncStorage('memoList').then((items) => {
      const editItemIndex = items.findIndex((item) => {
        console.log(item.objectId);
        console.log(this.state.memoEditObjectId);
        return item.objectId === this.state.memoEditObjectId;
      });
      items[editItemIndex].memo = this.state.memoEditTextInput;

      setArrayItemsToAsyncStorage('memoList', items).then(() => {
        this.setState({
          isOpenMemoEdit: false,
          noteItems: items,
        });
      });
    })
  };

  closeMemoComponent = () => {
    if(this.state.isOpenMemoEdit) {
      getArrayItemsFromAsyncStorage('memoList').then((items) => {
        const editItemIndex = items.findIndex((item) => {
          console.log(item.objectId);
          console.log(this.state.memoEditObjectId);
          return item.objectId === this.state.memoEditObjectId;
        });
        items[editItemIndex].memo = this.state.memoEditTextInput;

        setArrayItemsToAsyncStorage('memoList', items).then(() => {
          this.props.closeHandler();
        });
      })
    } else {
      this.props.closeHandler();
    }
  };

  render() {
    console.log('렌더링');
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.backToMemoList}>
            {
              this.state.isOpenMemoEdit
                ? <Image style={styles.headerLeftImage} source={require('/assets/ic_left_arrow.png')}/>
                : <View style={{marginRight: 20}}></View>
            }
          </TouchableOpacity>
          <Text style={styles.headerText}>성경노트</Text>
          <TouchableOpacity onPress={this.closeMemoComponent}>
            <Image style={styles.headerRightImage} source={require('/assets/ic_close.png')}/>
          </TouchableOpacity>
        </View>
        {this.MemoNone()}
        {this.MemoList()}
        {this.MemoEdit()}
      </View>
    )
  }
}

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

  memoNone: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: '85%'
  },

  memoNoneImage: {
    width: 70,
    height: 80,
    resizeMode: 'contain',
  },

  memoNoneText: {
    marginTop: 28,
    color: '#BDBDBD',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center'
  },


  memoItem: {
    marginLeft: 14,
    paddingTop: 18,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderColor: '#AEAEAE',
    flexDirection: 'row'
  },

  memoItemIndex: {
    fontWeight: 'bold',
  },

  memoItemContent: {
    marginLeft: 14,
    marginTop: 3,
    marginRight: 16,
  },

  memoItemContentVerseText: {
    fontSize: 12,
    color: '#828282',
  },

  memoItemContentMemo: {
    fontWeight: 'bold',
    marginTop: 7
  },

  memoItemContentDate: {
    fontSize: 12,
    color: '#828282',
    marginTop: 7
  },

  memoEditHeader: {
    paddingTop: 30,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 40,
    borderBottomWidth: 1,
    borderColor: '#AEAEAE'
  },

  memoEditVerseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  memoEditContent: {
    marginTop: 11
  },

  memoEditMemo: {
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',

  },

  memoEdit: {

  },
});
