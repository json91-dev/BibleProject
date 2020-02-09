import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {

  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Button

} from 'react-native';

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
GoogleSignin.configure();

export default class LoginScreen extends Component {
  // 구글 로그인 성공시에 화면 이동.
  _navigate() {
    // this.props.navigation.navigate('')
  }

  // 시작화면 (LoginScreen)으로 이동
  // _logout() {
  //   const resetAction = StackActions.reset({
  //     index: 0,
  //     key: null,
  //     actions: [NavigationActions.navigate({ routeName: 'LoginScreen'})],
  //   });
  //   this.props.navigation.dispatch(resetAction);
  // }

  state = {
    userInfo: null,
    error: null,
  };



  getCurrentInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({userInfo});
    }
    catch (error) {
      if(error.code === statusCodes.SIGN_IN_REQUIRED) {
        // 유저가 로그인 요청 필요 (유저가 로그인 되어있지 않음)
      }
    }
  };

  // 현재 정보를 가져온다.
  componentDidMount() {
    let login = this.getCurrentInfo();
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert('회원가입 거절');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert('회원가입 진행중');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert('Play Service를 사용할 수 없음');
      } else {
        // some other error happened
      }
    }
  };

  goMain = () => {
    this.props.navigation.navigate('Main');
  };


  render() {
    return (
      <View>
      <GoogleSigninButton
        style={{ width: 250, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        // onPress={this.signIn}
        onPress={this.goMain}
        disabled={this.state.isSigninInProgress} />
      </View>
    );
  }
}
// background: linear-gradient(180deg, #F9DA4F 0%, #F7884F 100%);



const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  icon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  titleText: {
    fontWeight: '300',
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
    color: 'white'
  },
  titleInfo: {
    fontWeight: '300',
    fontSize: 14,
    textAlign: 'center',
    margin: 20,
    color: 'white'
  },
  loginButton: {

  }
});
