import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class FontChangeOption extends Component {
  state = {
    isOpenAnswer: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{width: 60,}}></View>
          <Text style={styles.headerTitle}>보기 설정</Text>
          <TouchableOpacity>
            <View style={styles.headerImageWrapper}><Image style={styles.headerImage} source={require('/assets/ic_close.png')}></Image></View>
          </TouchableOpacity>
        </View>
        <Text style={styles.fontStyle}>글꼴</Text>
        <View>

        </View>
        <Text style={styles.fontSize}>글짜크기</Text>
        <View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'absolute',
    width: '95%',
    bottom: 110,
    borderRadius: 5,
    backgroundColor: 'white',
    left: '2.5%',
    height: '45%',
    borderWidth: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  headerImageWrapper: {
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },

  headerImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },

  fontStyle: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },

  fontSize: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: 'bold',

  }

});
