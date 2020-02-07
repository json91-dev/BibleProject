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

import LoginScreen from './src/screen/login/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

export default class App extends Component<Props> {
  state = {};

  render() {
    return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName = "Login">
          <Stack.Screen  options={{ headerShown: false }} name="Login" component = {LoginScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({

});
