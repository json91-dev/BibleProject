import React, { Component } from 'react';
import {

  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Alert,
  Button,
  TouchableOpacity

} from 'react-native';

export default class ContentScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.nicknameImage} source={require('assets/ic_jesus_nickname.png')} />
        <Text style={styles.nicknameText}>하이</Text>
        <TouchableOpacity style={styles.nicknameChangeButton}>
          <Text>프로필 수정</Text>
        </TouchableOpacity>

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
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
  },
  nicknameImage: {
    width: 140,
    height: 110,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  nicknameText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  nicknameChangeButton: {
    width: 100,
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    padding: 3

  },
});
