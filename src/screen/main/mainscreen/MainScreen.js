import React, {Component} from 'react';
import {

  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity

} from 'react-native';




export default class MainScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.t_container}>
          <Text style={styles.t_todayLabel}>오늘의 말씀</Text>
          <Text style={styles.t_todayWord}>너는 하나님과 화목하고 평안하라. 그리하면 복이 네게 임하리라.</Text>
          <Text style={styles.t_todayWordDetail}>요한복음 1장 27절</Text>
        </View>
        <View style = {{flex: 1}}>
          <Text style={styles.linkLabel}>성경책 읽기</Text>
          <View style={{flex: 9}}>
            <TouchableOpacity
              style={styles.oldBibleLink}
              onPress={() => this.props.navigation.navigate('BookListScreen')}>
              <Text> 구약 성경</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newBibleLink}
              onPress={this.onPress}>
              <Text> 신약 성경 </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
//
// paddingLeft: 36,
//   paddingTop: 110,

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'black',
  },

  t_todayLabel: {
    textAlign: 'left',
    marginTop: 110,
    fontSize: 15,
    paddingLeft: 36,
    paddingRight: 36,
  },
  t_container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
  t_todayWord: {
    paddingLeft: 36,
    paddingRight: 36,
    marginTop: 30,
    fontSize: 18,
  },
  t_todayWordDetail: {
    textAlign: 'right',
    paddingTop: 34,
    paddingRight: 36
  },
  linkLabel: {
    flex:1,
    paddingLeft: '10%'
  },

  oldBibleLink: {
    width: '80%',
    height: '30%',
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  newBibleLink: {
    width: '80%',
    height: '30%',
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%'
  },
});
