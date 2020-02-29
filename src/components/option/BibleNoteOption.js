import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

export default class BibleNoteOption extends Component {
  state = {
    isOpenAnswer: false,
  };

  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '95%',
    top: 30,
    borderRadius: 5,
    backgroundColor: 'white',
    left: '2.5%',
    height: 200,
    borderWidth: 1
  },
});
