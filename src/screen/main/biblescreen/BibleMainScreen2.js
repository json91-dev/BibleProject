import React, {Component, useCallback, useEffect, useState} from 'react';
import {getItemFromAsync, setItemToAsync} from '/utils'
import {
  StyleSheet,
  View,
  SafeAreaView,

} from 'react-native';

// import Toast from 'react-native-easy-toast';
import { getDateStringByFormat, getFireStore } from '../../../utils';
import MainBibleView from '../../../components/biblemain/MainBibleView';

const BibleMainScreen = (props) => {
  const [isOpenSearchMode, setIsOpenSearchMode] = useState(false)
  const [isOpenSearchWordListView, setIsOpenSearchWordListView] = useState(false)
  const [searchWordItems, setSearchWordItems] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchTextPlaceHolder, setSearchTextPlaceHolder] = useState('다시 읽고 싶은 말씀이 있나요?')
  const [searchTextEditable, setSearchTextEditable] = useState(true)
  const [isOpenCurrentWordView, setIsOpenCurrentWordView] = useState(false)
  const [currentWordText, setCurrentWordText] = useState("")
  const [isOpenSearchResultView, setIsOpenSearchResultView] = useState(false)
  const [searchResultItems, setSearchResultItems] = useState([])
  const [isOpenLatelyReadBibleView, setIsOpenLatelyReadBibleView] = useState(false)
  const [latelyReadItem, setLatelyReadItem] = useState({})
  const [verseSentence, setVerseSentence] = useState('너는 하나님과 화목하고 평안하라, 그리하면 복이 네게 임하리라.')
  const [verseString, setVerseString] = useState('요한복음 1장 27절')

  const goToBookListScreen = useCallback((type) => {
    props.navigation.navigate('BookListScreen', {bibleType: type});
    setIsOpenLatelyReadBibleView(false)
  }, [isOpenLatelyReadBibleView]);


  useEffect(() => {
    (async () => {
      /** 검색했던 단어들에 대한 List를 Local DB에서 불러옴 **/
      let searchWordList = await getItemFromAsync('searchWordList');
      if (searchWordList === null) {
        setSearchWordItems([])
      } else {
        setSearchWordItems(searchWordList)
      }

      /** 최근 읽은 성경구절 정보를 LocalDB에서 가져옴 **/
      let latelyReadList = await getItemFromAsync('latelyReadList');
      if (latelyReadList === null) {
        setIsOpenLatelyReadBibleView(false)
      } else {
        /** 만약 최근 읽은 성경구절 정보가 있다면, 이어보기 화면을 출력 **/
        const { bibleName, bookName, bookCode, chapterCode } = latelyReadList;
        setLatelyReadItem({bibleName, bookName, bookCode, chapterCode})
        setIsOpenLatelyReadBibleView(true)
      }

      /** 서버에서 오늘의 성경을 가져와 화면에 출력. **/
      const todayDateString = getDateStringByFormat(new Date(), 'yyyy-MM-dd');
      const todayVerseDocument = await getFireStore().collection('todayVerse').doc(todayDateString).get();
      console.log(todayVerseDocument)
      // todayVerseDocument.data();
      const verseSentence = todayVerseDocument.data().sentence;
      const verseString = todayVerseDocument.data().verse;

      setVerseSentence(verseSentence)
      setVerseString(verseString)
    })()
  }, [])

  return (
    <SafeAreaView style={styles.container} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      {/*{this.SearchHeaderView()}*/}
      {/* 성경 검색 TextInput에 focus에 따라 View를 다르게 보여줌. */}

      <View style={styles.contentContainer}>
        <MainBibleView
          goToBookListScreen={goToBookListScreen}
          visible={!isOpenSearchMode}
          verseSentence={verseSentence}
          verseString={verseString}
        />
      </View>

      {/*<Toast ref="toast"*/}
      {/*       positionValue={130}*/}
      {/*       fadeInDuration={200}*/}
      {/*       fadeOutDuration={1000}*/}
      {/*/>*/}
    </SafeAreaView>
  )
}

export default BibleMainScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    justifyContent: 'flex-start',
  },

  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    justifyContent: 'center',
  },

  searchViewInput: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  searchTextInput: {
    borderColor:'red',
    height:'100%',
    width: '100%',
  },

  searchView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 60,
  },

  searchIcon: {
    width: '15%',
    height: '100%',
    position:'absolute',
    left: 1,
  },
  searchIconImage: {
    height:'100%',
    width: '100%',
    resizeMode: 'contain',
  },

  searchCancel: {
    width: '15%',
    height: '100%',
    position:'absolute',
    right: 1,
  },

  searchCancelImage: {
    height:'100%',
    width: '100%',
    resizeMode: 'contain'
  },

  searchViewBottom: {
    width: '80%',
    height: 10,
    position:'absolute',
    top: 52,
    left: 0,
  },

  mainView: {
    height: '82%',
    marginBottom: '6%',
  },

  todayImage: {
    marginTop: '3%',
    marginLeft: 36,
    aspectRatio: 2,
    height:'10%',
    resizeMode:'contain',
  },

  todayWord: {
    paddingLeft: 36,
    paddingRight: 36,
    marginTop: '5%',
    fontSize: 18,
  },

  todayWordDetail: {
    textAlign: 'right',
    paddingTop: 34,
    paddingRight: 36,
    color: '#828282',
  },

  linkLabel: {
    paddingLeft: 36,
    marginTop: '10%',
    marginBottom: '6%',
  },

  bibleLink: {
    marginBottom: 20,
    height: '20%',
    width: '100%',

  },

  bibleLinkImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  searchWord: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: '3%',
  },

  searchWordTitle: {
    marginBottom: '5%',
    color: '#BDBDBD',
  },

  searchWordItem: {
    color: 'black',
    fontSize: 24,
    marginBottom: '2%',
    fontWeight: 'bold',
  },

  currentWord: {
    position: 'absolute',
    top: 0,
    width: '70%',
    height: 50,
    marginLeft: '15%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  currentWordText: {
    fontSize: 17,
  },

  currentWordCancelImageWrapper: {
    padding: 5,
    marginLeft: 10,
  },

  currentWordCancelImage: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },

  searchResultView: {
    height: '90%',
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 15,
  },

  searchResultFlat: {
    paddingLeft: 16,
    paddingRight: 16,
  },

  searchResultFlatItem: {
    borderWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 5,
    paddingLeft: 13,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  searchResultFlatItemTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },

  searchResultFlatItemContent: {

  },

  searchResultFlatItemImage: {
    resizeMode: 'contain',
    width: 10,
    height: 30,
    marginRight: 12,
  },

  latelyReadBibleView: {
    position:'absolute',
    width: '100%',
    height: '10%',
    bottom: 0,
    borderWidth: 1,
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '3%',
  },

  latelyReadBibleViewInfo: {
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  latelyReadBibleViewInfoLabel: {
    color: 'white',
    fontSize: 12,
  },

  latelyReadBibleViewInfoText: {
    color: 'white'
  },

  latelyReadBibleViewButton: {
    color: '#F9DA4F',
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 10,
    borderWidth: 1,
  }
});
