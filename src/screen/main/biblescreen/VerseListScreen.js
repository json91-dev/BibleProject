import React, {Component, useCallback, useEffect, useRef, useState} from 'react';
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

import Toast, { DURATION } from 'react-native-easy-toast';
import {getBibleVerseItems, getItemFromAsync, printIsNewOrOldBibleByBookCode, setItemToAsync} from '../../../utils';
import CommandModal from '../../../components/verselist/CommandModal';



const VerseListScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [verseItems, setVerseItems] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [memoModalVisible, setMemoModalVisible] = useState(false)
  const [memoModalSaveButtonActive, setMemoModalSaveButtonActive] = useState(false)
  const [bibleListOptionIconUri, setBibleListOptionIconUri] = useState(require('assets/ic_option_list_off.png'));
  const [bibleNoteOptionIconUri, setBibleNoteOptionIconUri] = useState(require('assets/ic_option_list_off.png'));
  const [fontChangeOptionIconUri, setFontChangeOptionIconUri] = useState(require('assets/ic_option_list_off.png'));
  const [optionComponentState, setOptionComponentState] = useState('')
  const [changeVerse, setChangeVerse] = useState(false)
  const [bibleType, setBibleType] = useState(0)
  const [modalBibleItem, setModalBibleItem] = useState({})
  const [verseItemFontSize, setVerseItemFontSize] = useState(14)
  const [verseItemFontFamily, setVerseItemFontFamily] = useState('system font')
  const toastRef = useRef(null)

  useEffect(() => {
    (async () => {
      const { route } = this.props;
      const { bookName, bookCode, chapterCode }  = route.params;

      /** 1. 최근 읽은 성경 주소 저장 **/
      const bibleName = printIsNewOrOldBibleByBookCode(bookCode);
      const readItem = {
        bibleName,
        bookName,
        bookCode,
        chapterCode,
      };
      await setItemToAsync('latelyReadList', readItem)

      /** 2. 로컬 스토리지에 저장된 폰트 사이즈와 폰트 패밀리를 불러옴. **/
      const fontSizeOption = await getItemFromAsync('fontSizeOption')
      switch (fontSizeOption) {
        case null: {
          setVerseItemFontSize(14)
          break;
        }

        case 0: {
          setVerseItemFontSize(12)
          break;
        }

        case 1: {
          setVerseItemFontSize(14)
          break;
        }

        case 2: {
          setVerseItemFontSize(16)
          break;
        }

        case 3: {
          setVerseItemFontSize(18)
          break;
        }
      }

      /** 3. 초기에 로컬 스토리지에서 저장된 폰트 사이즈와 폰트 패밀리 설정 **/
      const fontFamilyOption = await getItemFromAsync('fontFamilyOption')
      switch (fontFamilyOption) {
        case null: {
          setVerseItemFontFamily('system font')
          break;
        }

        case 0: {
          setVerseItemFontFamily('system font')
          break;
        }

        case 1: {
          setVerseItemFontFamily('nanumbrush')
          break;
        }

        case 2: {
          setVerseItemFontFamily('tmonmonsori')
          break;
        }

        case 3: {
          setVerseItemFontFamily('applemyungjo')
          break;
        }
      }


      const verseItems = await getBibleVerseItems(bookName, bookCode, chapterCode)

      /**
       * 4. VerseItem을 입력받아 하이라이트 처리
       * => Json 파싱을 통해 highlightList에서부터 하이라이트 목록을 받아온다.
       * => 현재 verseItems중 hightlightList에 bookCode, chapterCode, VerseCode가 일치하는 목록이 있다면 isHighlight = true인 verseItems을 return한다.
       */
      let highlightsItems = await getItemFromAsync('highlightList')
      highlightsItems = highlightsItems? highlightsItems : [];

      verseItems.forEach((verse) => {
        const index = highlightsItems.findIndex((highlightItem) => {
          return ((highlightItem.bookCode === verse.bookCode) && (highlightItem.chapterCode === verse.chapterCode) && (highlightItem.verseCode === verse.verseCode))
        })
        (index > -1) ? verse.isHighlight = true : verse.isHighlight = false;
      })


      /** VerseItem을 입력받아 memo 처리 **/
      let memoListItems = await getItemFromAsync('memoList')
      if (memoListItems === null) memoListItems = [];
      verseItems.forEach((verse) => {
        const index = memoListItems.findIndex((memoItem) => {
          return ((memoItem.bookCode === verse.bookCode) && (memoItem.chapterCode === verse.chapterCode) && (memoItem.verseCode === verse.verseCode))
        });
        (index > -1) ? verse.isMemo = true : verse.isMemo = false;
      });

      setVerseItems(verseItems);
      setBibleType(bibleType);
      setIsLoading(false);

    })()
  }, [])


  /** 구 setModalVisible **/
  const actionModalCommand = useCallback(async (modalAction) => {
    const {bookName, bookCode, chapterCode, verseCode, content, isHighlight} = modalBibleItem;
    switch (modalAction) {
      case 'copy': {
        Clipboard.setString(content);
        toastRef.current.show('클립보드에 복사되었습니다.');
        break;
      }
      case 'highlight': {
        /** 하이라이트 => 하이라이트 제거 **/
        if (isHighlight) {
          let highlightItems = await getItemFromAsync('highlightList');
          if (highlightItems === null) highlightItems = [];
          const index = highlightItems.findIndex((item, index) => {
            return (item.bookCode === bookCode && item.chapterCode === chapterCode && item.verseCode === verseCode);
          });
          highlightItems.splice(index, 1);
          await setItemToAsync('highlightList', highlightItems)
          toastRef.current.show('형광펜 밑줄 제거 ^^');
        }

        /** 하이라이트 **/
        else {
          let highlightItems = await getItemFromAsync('highlightList');

          if (highlightItems === null) highlightItems = [];
          highlightItems.push({bookCode, chapterCode, verseCode});

          await setItemToAsync('highlightList', highlightItems)
          toastRef.current.show('형광펜으로 밑줄 ^^');
        }
        this.componentDidMount();
        break;
      }
      case 'memo': {
        // 메모 모달 동작
        setMemoModalVisible(true);
        break;
      }
    }
  }, [])

  const openBibleListOptionModal = useCallback(() => {
    setModalVisible(false);
    setOptionComponentState('bibleList')
    setBibleListOptionIconUri(require('assets/ic_option_list_on.png'))
    setBibleNoteOptionIconUri(require('assets/ic_option_note_off.png'))
    setFontChangeOptionIconUri(require('assets/ic_option_font_off.png'))
  }, []);

  const openBibleNoteOptionModal = useCallback(() => {
    setModalVisible(false);
    setOptionComponentState('bibleNote')
    setBibleListOptionIconUri(require('assets/ic_option_list_off.png'))
    setBibleNoteOptionIconUri(require('assets/ic_option_note_on.png'))
    setFontChangeOptionIconUri(require('assets/ic_option_font_off.png'))
  }, [modalVisible]);

  const openFontChangeOptionModal = useCallback(() => {
    setModalVisible(false);
    setOptionComponentState('fontChange')
    setBibleListOptionIconUri(require('assets/ic_option_list_off.png'))
    setBibleNoteOptionIconUri(require('assets/ic_option_note_off.png'))
    setFontChangeOptionIconUri(require('assets/ic_option_font_on.png'))

  }, [])

  return (
    <View style={styles.container}>
      <CommandModal
        modelBibleItem={modalBibleItem}
        setModalVisible={setModalVisible}
        actionModalCommand={actionModalCommand}
        openBibleNoteOptionModal={openBibleNoteOptionModal}
      />

      {this.MemoModal()}
      {this.VerseFlatList()}

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
      <Toast ref={toastRef}
             positionValue={130}
             fadeInDuration={200}
             fadeOutDuration={1000}
      />
    </View>
  )
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

  flatList: {
    flexDirection: 'column',
  },

  flatListVerseItem: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
  },

  flatListItemTextLabel: {
    width:'7%',
    textAlign:'center'
  },

  flatListItemText: {
    width: '86%',
    color: 'black',
    marginRight: '3%',
    paddingRight: 5,
    marginLeft: 5,

  },

  flatListItemTextHighlight: {
    width: '86%',
    color: 'black',
    marginRight: '3%',
    paddingRight: 5,
    marginLeft: 5,
    textShadowColor: 'yellow',
    textShadowRadius: 15,
  },

  memoIndicator: {
    width: '4%',
    height: 19,
    resizeMode: 'contain',
    borderColor: 'red',
  },

  memoButton: {
    paddingLeft: 11,
    paddingRight: 11,
    paddingTop: 9,
    paddingBottom: 7,
    borderRadius: 20,
  },

  memoButtonChecked: {
    backgroundColor: '#F9DA4F',
    paddingLeft: 11,
    paddingRight: 11,
    paddingTop: 9,
    paddingBottom: 7,
    borderRadius: 20,
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

  /* 성경 버튼 이동 */
  moveChapter: {
    paddingBottom: 100,
    marginTop: 20,
    width: '90%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  moveChapterBtn: {
    width: 130,
    height: 60,
    backgroundColor: '#F9DA4F',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 5,
  },

  moveChapterText: {
    fontWeight: 'bold',
  },
});
