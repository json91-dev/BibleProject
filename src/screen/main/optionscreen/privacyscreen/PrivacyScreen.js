import React, { Component } from 'react';

import {
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

export default class PrivacyScreen extends Component {
  state = {
  };


  componentDidMount() {

  }

  render() {
    return (
      <View>
        <Text>My Name is Privacy</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingLeft: '3%',
    paddingRight: '3%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
