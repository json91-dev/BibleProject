import React, {Component} from 'react';
import {

  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput

} from 'react-native';




export default class BibleMainScreen extends Component {

  render() {
    return (

      <ScrollView style={styles.container}>
        <View style={styles.searchView} >
          <Image style={styles.searchIconImage} source={require('assets/ic_search.png')}/>
          <TextInput style={styles.searchTextInput}  placeholder='다시 읽고 싶은 말씀이 있나요?'></TextInput>
        </View>

        <Image style={styles.todayImage} source={require('assets/ic_today_title.png')}/>
        <Text style={styles.todayWord}>너는 하나님과 화목하고 평안하라. 그리하면 복이 네게 임하리라.</Text>
        <Text style={styles.todayWordDetail}>요한복음 1장 27절</Text>
        <Text style={styles.linkLabel}>성경책 읽기</Text>

        <TouchableOpacity
          style={[styles.bibleLink, {marginTop: 30}]}
          onPress={() => this.props.navigation.navigate('BookListScreen', {bibleType: 'old'})}>
          <Image style={styles.bibleLinkImage} source={require('assets/btn_old_bible.png')}/>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bibleLink}
          onPress={() => this.props.navigation.navigate('BookListScreen', {bibleType: 'new'})}>
          <Image style={styles.bibleLinkImage} source={require('assets/btn_new_bible.png')}/>
        </TouchableOpacity>

      </ScrollView>

    )
  }
}
//
// paddingLeft: 36,
//   paddingTop: 110,

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },
  searchIconImage: {
    borderWidth: 1,
    borderColor:'black',
    height:'100%',
    width:'20%',
    resizeMode: 'contain'
  },

  searchTextInput: {
    borderWidth: 1,
    borderColor:'black',
    width:'60%',
    height:'100%',
  },

  searchView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor:'black'
  },

  todayImage: {
    marginTop: 32,
    paddingLeft: 36,
    paddingRight: 36,
    marginLeft: 36,
    width:96,
    height:34,
  },

  todayWord: {
    paddingLeft: 36,
    paddingRight: 36,
    marginTop: 30,
    fontSize: 18,
  },
  todayWordDetail: {
    textAlign: 'right',
    paddingTop: 34,
    paddingRight: 36
  },
  linkLabel: {
    paddingLeft: 36,
    marginTop: 10,
    marginBottom: 20,
  },

  bibleLink: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20
  },

  bibleLinkImage: {
    width:327,
    height:102,
  },
});
