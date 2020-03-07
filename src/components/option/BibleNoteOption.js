import React, {Component} from 'react';
import {
  AsyncStorage,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';


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

  };

  /**
   * AsyncStorage의 memoList(기록한 메모들)을 이용하여 noteItem을 만들어줌.
   * id, bookName, chapterCode, verseCode, content, date를 가져옴.
   */
  componentDidMount() {
    AsyncStorage.getItem('memoList', (err, result) => {
      // 메모 List 배열 획득
      if(result === null) return;

      let memoList = JSON.parse(result);
      let noteItems = [];
      memoList.forEach((memoItem) => {
        let passTimeText = getPassTimeText(memoItem.date);
        noteItems.push({id: memoItem.id, bookName: memoItem.bookName, chapterCode: memoItem.chapterCode, verseCode: memoItem.verseCode,memo: memoItem.memo ,content: memoItem.content, passTimeText: passTimeText});
      });
      this.setState({noteItems, isNoteItemUpdate: true});
    })
  }
  /**
   * Async
   */
  openMemoEdit = (objectId, verseText, content, memo) => () => {
    this.setState({
      memoEditObjectId: objectId,
      memoEditVerseText: verseText,
      memoEditContent: content,
      memoEditMemo: memo,
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

  MemoList = () => {
    if(!this.state.isOpenMemoEdit) {
      return (
        <FlatList
          style={styles.flatList}
          data={this.state.noteItems}
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
          <TextInput style={styles.memoEditMemo} onContentSizeChange={this._onTextContentSizeChange}>{memoEditMemo}</TextInput>
        </View>
      )
    }
  };


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image style={styles.headerLeftImage} source={require('/assets/ic_left_arrow.png')}/>
          </TouchableOpacity>
          <Text style={styles.headerText}>성경노트</Text>
          <TouchableOpacity onPress={this.props.closeHandler}>
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
    resizeMode: 'contain'
  },

  headerText: {
    marginTop: 4,
    fontSize: 18,
    marginLeft: 10,
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
