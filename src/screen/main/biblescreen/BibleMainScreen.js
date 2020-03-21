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

export default class BibleMainScreen extends Component {
  state = {
    isOpenSearchHeaderView: false,
    searchWordItems: [],
    searchText: "",
    searchTextPlaceHolder: '다시 읽고 싶은 말씀이 있나요?',
    isOpenCurrentWordView: false,
    currentWordText: "",
    isOpenSearchResultView: false,
    searchResultItems: ['하이', '반가워', '오잇'],
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
    const isOpenSearchHeaderView = this.state.isOpenSearchHeaderView;

    if (isOpenSearchHeaderView) {
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
        isOpenSearchHeaderView: true
      })
    };

    // 버튼의 Focus가 풀렸을 시 동작함.
    const onBlur = () => {
      // this.setState({
      //   isOpenSearchHeaderView: false
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
        isOpenSearchHeaderView: false,
        searchTextPlaceHolder: "다시 읽고 싶은 말씀이 있나요?",
      });
      this.refs.textInputRef.blur();
      this.refs.textInputRef.clear();
    };

    /**
     *  왼쪽 상단 검색버튼 눌렀을때의 동작 로직.
     *  1. AsyncStorage에 현재 textInput의 값 저장.
     *  2. searchWordList가 6개 이상일경우 1개의 아이템을 제거함.
     *  3. currentWordView를 열어서 현재 검색한 단어를 화면에 보여줌.
     */
    const onSearchPress = () => {
      this.refs.textInputRef.blur();
      this.refs.textInputRef.clear();
      const {searchText} = this.state;

      getArrayItemsFromAsyncStorage('searchWordList').then((items) => {
        let searchWordItems = items;
        searchWordItems.push(searchText);
        const currentWordText = searchText;
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
  SearchWordView = () => {
    const {isOpenSearchHeaderView, searchWordItems} = this.state;
    const searchWordItemsReverse = JSON.parse(JSON.stringify(searchWordItems));
    searchWordItemsReverse.reverse();

    if (isOpenSearchHeaderView) {
      return (
        <View style={styles.searchWord}>
          <Text style={styles.searchWordTitle}>최근검색어</Text>
          {searchWordItemsReverse.map((item, index) => {
            return (
              <TouchableOpacity>
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


    // 성경의 장을 모두 가져오는 쿼리를 수행.
    let bibleDB = SQLite.openDatabase({name : "bible.db", createFromLocation : 1}, ()=>{}, ()=>{});
    bibleDB.transaction((tx) => {
      const query = `SELECT book, chapter, verse, content from bible_korHRV WHERE content LIKE '%${currentWordText}%' `;
      tx.executeSql(query, [], (tx, results) => {
        let chapterItemsLength = results.rows.item(0).count;
        const chapterItems = [];
        /**
         * Item insert
         */
        for (let i = 0; i < chapterItemsLength ; i++) {
          chapterItems.push(
            {
              bookCode,
              bookName,
            })
        }
        this.setState({chapterItems});
      })
    });

    // if(isOpenSearchResultView)
    if(true)
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
                    <Text style={styles.searchResultFlatItemTitle}>구약-누가복은 6장 32절</Text>
                    <Text style={styles.searchResultFlatItemContent}>그리스도가 명하느니 세계여 재창도되리라. 그리스도가 명하느니 세계여 재창도되리라. 그리스도가 명하느니 세계여 재창도되리라.</Text>
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
        {/*{this.MainView()}*/}
        {this.SearchWordView()}
        {this.CurrentWordView()}
        {this.SearchResultView()}
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
    borderColor: 'green',
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
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    height: '20%',
  },

  bibleLinkImage: {
    aspectRatio: 3,
    height:'95%',
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
    borderWidth: 1,
    borderColor: 'green',
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
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
