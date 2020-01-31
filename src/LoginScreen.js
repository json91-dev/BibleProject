import React, {Component} from 'react';
import {

  StyleSheet,
  View,
  Text,

} from 'react-native';

export default class LoginScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>하이</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  }

})
