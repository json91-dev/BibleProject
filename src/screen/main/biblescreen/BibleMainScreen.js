import React, {Component} from 'react';
import {getArrayItemsFromAsyncStorage, setArrayItemsToAsyncStorage} from '/utils'
import {

  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput, FlatList,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Toast from 'react-native-easy-toast';

import {printIsNewOrOldBibleByBookCode, getOldBibleItems, getNewBibleItems, getSqliteDatabase} from '/utils';


export default class BibleMainScreen extends Component {
  state = {
    isOpenSearchMode: false,
    isOpenSearchWordListView: false,
    searchWordItems: [],
    searchText: "",
    searchTextPlaceHolder: '다시 읽고 싶은 말씀이 있나요?',
    isOpenCurrentWordView: false,
    currentWordText: "",
    isOpenSearchResultView: false,
    searchResultItems: [],
  };


  componentDidMount() {
    // AsyncStorage에서 최근 검색어를 가져오는 기능 구현
    getArrayItemsFromAsyncStorage('searchWordList').then((items) => {
      this.setState({
        searchWordItems: items,
      })
    });
  }

  /**
   * 함수형 컴포넌트 영역
   */
  MainView = () => {
    const isOpenSearchMode = this.state.isOpenSearchMode;

    if (isOpenSearchMode) {
      return null
    } else {
      return (
        <View style={styles.mainView}>
          <Image style={styles.todayImage} source={require('assets/ic_today_title.png')}/>
          <Text style={styles.todayWord}>너는 하나님과 화목하고 평안하라. 그리하면 복이 네게 임하리라.</Text>
          <Text style={styles.todayWordDetail}>요한복음 1장 27절</Text>
          <Text style={styles.linkLabel}>성경책 읽기</Text>
          <TouchableOpacity
            style={styles.bibleLink}
            onPress={() => this.props.navigation.navigate('BookListScreen', {bibleType: 0})}>
            <Image style={styles.bibleLinkImage} source={require('assets/btn_old_bible.png')}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bibleLink}
            onPress={() => this.props.navigation.navigate('BookListScreen', {bibleType: 1})}>
            <Image style={styles.bibleLinkImage} source={require('assets/btn_new_bible.png')}/>
          </TouchableOpacity>
        </View>
      )
    }
  };

  // 최상단의 SearchHeaderView Bar 부분을 그려줌. (상단 TextView, 왼쪽 검색버튼, 오른쪽 X버튼)
  SearchHeaderView = () => {
    // 버튼이 포커스되면 searchView를 보여줌
    const onFocus = () => {
      this.setState({
        isOpenSearchMode: true,
        isOpenSearchWordListView: true,
      })
    };

    // 버튼의 Focus가 풀렸을 시 동작함.
    const onBlur = () => {
      // this.setState({
      //   isOpenSearchMode: false
      // })
    };

    // 버튼의 Text가 변경되었을 시.
    const onChangeText = (text) => {
      console.log(text);
      this.setState({
        searchText: text,
      })
    };

    const onCancelPress = () => {
      this.setState({
        isOpenSearchMode: false,
        isOpenSearchWordListView: false,
        isOpenCurrentWordView: false,
        isOpenSearchResultView: false,
        currentWordText: "",
        searchTextPlaceHolder: "다시 읽고 싶은 말씀이 있나요?",
      });
      this.refs.textInputRef.blur();
      this.refs.textInputRef.clear();
    };


    /**
     *  왼쪽 상단 검색버튼 눌렀을때의 동작 로직.
     *  0. text가 2개 이상일때만 검색 수행
     *  1. AsyncStorage에 현재 textInput의 값 저장.
     *  2. 현재 검색 단어(searchWordList) 가 6개 이상일경우 1개의 아이템을 제거함.
     *  3. 현재 입력 단어(currentWordView)를 열어서 현재 검색한 단어를 화면에 보여줌.
     *  4. 현재 검색 단어(searchWordList)를 화면에서 없애고, 검색 결과 성경(searchResultView)에 대한 쿼리 진행
     */
    const onSearchPress = () => {
      const searchTextValue = this.state.searchText;
      this.refs.textInputRef.blur();
      this.refs.textInputRef.clear();

      if(searchTextValue.length < 2) {
        this.refs.toast.show('2자 이상으로 검색어를 입력해주세요 :)');
        return;
      }

      const pushSearchTextToSearchWordList = (text) => {
        // 최근검색어에 대한 검색단어를 새로 입력하고 5개로 갯수를 맞춰준다.
        // 이후 textInput을 clear한뒤 현재입력단어(currentWordView)를 보여준다.
        getArrayItemsFromAsyncStorage('searchWordList').then((items) => {
          let searchWordItems = items;
          searchWordItems.push(text);
          const currentWordText = text;
          // 5개가 넘어가면 searchWordItems(검색어 목록)에서 아이템 1개 삭제.
          if (searchWordItems.length > 5) {
            searchWordItems.shift();
          }
          setArrayItemsToAsyncStorage('searchWordList', searchWordItems).then(() => {
            this.setState({
              searchWordItems,
              searchText: '',
              currentWordText
            })
          });
        });
      };
      pushSearchTextToSearchWordList(searchTextValue);

      const getSearchResult = (text) => {

        getSqliteDatabase().transaction((tx) => {
          const query = `SELECT book, chapter, verse, content from bible_korHRV WHERE content LIKE '%${text}%' `;
          tx.executeSql(query, [], (tx, results) => {
            const searchResultItems = [];
            console.log(results.rows.length);
            for (let i = 0; i < results.rows.length ; i++) {
              const bookCode = results.rows.item(i).book;
              const bibleName = printIsNewOrOldBibleByBookCode(bookCode);
              const bibleItems = (bibleName === '구약') ? getOldBibleItems() : getNewBibleItems();
              const bookName = bibleItems.find((item, index) => {
                return (item.bookCode === bookCode)
              }).bookName;
              const chapterCode = results.rows.item(i).chapter;
              const verseCode = results.rows.item(i).verse;
              const content = results.rows.item(i).content;

              searchResultItems.push({
                bibleName,
                bookName,
                bookCode,
                chapterCode,
                verseCode,
                content,
              })
            }

            this.setState({
              isOpenSearchWordListView: false,
              isOpenSearchResultView: true,
              searchResultItems,
            })
          })
        });
      };

      getSearchResult(searchTextValue);



      this.setState({
        isOpenCurrentWordView: true,
        searchTextPlaceHolder: "",
      })
    };
    return (
      <View style={styles.searchView}>
        <TouchableOpacity style={styles.searchIcon} onPress={onSearchPress}>
          <Image style={styles.searchIconImage} source={require('assets/ic_search.png')}/>
        </TouchableOpacity>
        <View style={styles.searchViewInput}>
          <TextInput
            style={styles.searchTextInput}
            placeholder={this.state.searchTextPlaceHolder}
            onFocus = {onFocus}
            onBlur = {onBlur}
            onChangeText = {(value) => onChangeText(value)}
            ref="textInputRef"
          >
          </TextInput>
        </View>
        <TouchableOpacity style={styles.searchCancel} onPress={onCancelPress}>
          <Image style={styles.searchCancelImage} source={require('assets/ic_close.png')}/>
        </TouchableOpacity>
      </View>
    )
  };


  // 검색 결과를 보여주는 화면
  SearchWordListView = () => {
    const {isOpenSearchWordListView, searchWordItems} = this.state;
    const searchWordItemsReverse = JSON.parse(JSON.stringify(searchWordItems));
    searchWordItemsReverse.reverse();

    if (isOpenSearchWordListView) {
      return (
        <View style={styles.searchWord}>
          <Text style={styles.searchWordTitle}>최근검색어</Text>
          {searchWordItemsReverse.map((item, index) => {
            return (
              <TouchableOpacity key={item+index}>
                <Text style={styles.searchWordItem}>{item}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      )
    } else{
      return null;
    }
  };

  // 상단 현재 검색중인 Word를 보여주는 화면 (currentWord 버튼)
  CurrentWordView = () => {
    const removeCurrentWord = () => {
      this.setState({
        currentWordText: "",
        isOpenCurrentWordView: false,
        isOpenSearchResultView: false,
        isOpenSearchWordListView: true,
        searchTextPlaceHolder: "다시 읽고 싶은 말씀이 있나요?",
      })
    };
    const {isOpenCurrentWordView, currentWordText} = this.state;
    if(isOpenCurrentWordView) {
      return (
        <View style={styles.currentWord}>
          <Text style={styles.currentWordText}>{currentWordText}</Text>
          <TouchableOpacity style={styles.currentWordCancelImageWrapper} onPress={removeCurrentWord}>
            <Image style={styles.currentWordCancelImage} source={require('/assets/ic_close_circle.png')}/>
          </TouchableOpacity>
        </View>
      )
    }
    else {
      return null;
    }
  };

  SearchResultView = () => {
    const {isOpenSearchResultView, currentWordText} = this.state;


    if(isOpenSearchResultView)
    {
      return (
        <View style={styles.searchResultView}>
          <FlatList
            style={styles.searchResultFlat}
            data={this.state.searchResultItems}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity style={styles.searchResultFlatItem}>
                  <View style={{width: '90%'}}>
                    <Text style={styles.searchResultFlatItemTitle}>{item.bibleName}-{item.bookName} {item.chapterCode}장 {item.verseCode}절</Text>
                    <Text style={styles.searchResultFlatItemContent}>{item.content}</Text>
                  </View>
                  <Image style={styles.searchResultFlatItemImage} source={require('/assets/ic_arrow.png')} />

                </TouchableOpacity>
              )
            }}
          />
        </View>
      )
    }
    else {
      return null;
    }

  };

  render() {
    return (
      <View style={styles.container} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
        {this.SearchHeaderView()}
        <Image style={styles.searchViewBottom} source={require('assets/ic_search_bottom.png')}/>
        {/* 성경 검색 TextInput에 focus에 따라 View를 다르게 보여줌. */}
        {this.MainView()}
        {this.SearchWordListView()}
        {this.CurrentWordView()}
        {this.SearchResultView()}


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
    backgroundColor: 'white',
    height: '100%',
    flexDirection: 'column',
  },
  searchViewInput: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-start'
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
    height: 50,
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
    height: 1
  },

  mainView: {
    height: '90%',
  },

  todayImage: {
    marginTop: '5%',
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
  }
});
