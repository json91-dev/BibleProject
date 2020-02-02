/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';

const instructions = Platform.select({
  ios: 'IOS 입니다.',
  android: 'android 입니다.!',
});

type Props = {};

import LoginScreen from './src/LoginScreen';
import MainScreen from './src/MainScreen';

export default class App extends Component<Props> {
  state = {};

  render() {
    return (
      <View style={{flex: 1}}>
        {/*<LoginScreen/>*/}
        <MainScreen/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
