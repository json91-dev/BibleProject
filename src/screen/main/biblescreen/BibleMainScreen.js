import React, {Component} from 'react';
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

export default class BibleMainScreen extends Component {
  state = {
    isOpenSearchView: false,
    searchWordItems: ['예수님','하나님','둘님','셋님','넷님'],
  };


  /**
   * 함수형 컴포넌트 영역
   */

  MainView = () => {
    const isOpenSearchView = this.state.isOpenSearchView;

    if (isOpenSearchView) {
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


  // 최상단의 SearchView Bar 부분을 그려줌.
  SearchView = () => {
    // 버튼이 포커스되면 searchView를 보여줌
    const onFocus = () => {
      this.setState({
        isOpenSearchView: true
      })
    };

    // 버튼의 Focus가 풀렸을 시 동작함.
    const onBlur = () => {
      // this.setState({
      //   isOpenSearchView: false
      // })
    };

    // 버튼의 Text가 변경되었을 시.
    const onChangeText = (text) => {
      console.log(text);
    };

    const onCancelPress = () => {
      this.setState({
        isOpenSearchView: false
      });
      this.refs.textInputRef.blur();
    };


    return (
      <View style={styles.searchView}>
        <TouchableOpacity style={styles.searchIcon}>
          <Image style={styles.searchIconImage} source={require('assets/ic_search.png')}/>
        </TouchableOpacity>
        <View style={styles.searchViewInput}>
          <TextInput
            style={styles.searchTextInput}
            placeholder='다시 읽고 싶은 말씀이 있나요?'
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

  SearchWordView = () => {

  };


  render() {
    const isOpenSearchView = this.state.isOpenSearchView;
    let searchView, mainView;
    const searchWordItems = this.state.searchWordItems;

    return (
      <View style={styles.container} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
        {this.SearchView()}
        <Image style={styles.searchViewBottom} source={require('assets/ic_search_bottom.png')}/>
        {/* 성경 검색 TextInput에 focus에 따라 View를 다르게 보여줌. */}
        {this.MainView()}
        <View style={styles.searchWord}>
          <Text style={styles.searchWordTitle}>최근검색어</Text>
          {searchWordItems.map((item, index) => {
            return (
              <TouchableOpacity>
                <Text style={styles.searchWordItem}>{item}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
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
    marginBottom: '5%',
  },

  bibleLink: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    height: '20%',
  },

  bibleLinkImage: {
    aspectRatio: 3,
    height:'100%',
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
  }
});
