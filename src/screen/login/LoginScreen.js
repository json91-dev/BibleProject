import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import {getItemFromAsync, setItemToAsync} from '../../utils';

export default class LoginScreen extends Component {
  state = {
    pushData: [],
    // loggedIn: false,
    userInfo: null,
    errorMessage: null,
  };

  goToMainBible = () => {
    this.props.navigation.navigate('Main');
  };

  /**
   * 구글 로그인을 수행한다.
   */
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // this.setState({userInfo: userInfo, loggedIn: true});

      await setItemToAsync('userInfo', { ...userInfo, loggedIn: true});
      this.goToMainBible();

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log(error.message);

      this.setState({
        errorMessage: error.message,
      })
    }
  };

  /**
   * Google Login에 대한 Access키를 취소한뒤 로그아웃을 수행한다.
   */
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // this.setState({user: null, loggedIn: false}); // Remember to remove the user from your app's state as well
      const userInfo = await getItemFromAsync('userInfo')

      await setItemToAsync('userInfo', {
        ...userInfo,
        loggedIn: false,
      })
    }

    catch (error) {
      console.error(error);
    }
  };

  /**
   * 로그인에 대한 준비 작업 및, localStorage에서 값 체크 후 화면 이동을 수행한다.
   * 맨 처음 로그인시 (유저정보가 없을시)나 로그인 되어있지 않은 경우에는 로그인화면을 유지하고,
   * 그렇지 않으면 성경화면으로 화면을 이동시켜준다.
   */
  componentDidMount() {
    // 구글 로그인에대한 설정을 초기화합니다.
    GoogleSignin.configure({
      webClientId: '271807854923-f0si6s5dj9urd45nvdpqpeihnc3q8i57.apps.googleusercontent.com',
      offlineAccess: false,
    });

    // localStorage에서 로그인 정보를 읽은 뒤, 자동 로그인을 수행함.
    getItemFromAsync('userInfo').then((userInfo) => {
      // 유저 정보가 없는경우
      if (userInfo === null) {
        return null;
      }
      // 유저 정보가 있고, 유저가 로그인 되어있는 경우
      else if (userInfo && userInfo.loggedIn) {
        this.goToMainBible();
        return null;
      }
      // 유저 정보가 있고 유저가 로그인 되어있지 않은 경우
      else if (userInfo && !userInfo.loggedIn) {
        return null;
      }
    });
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <LinearGradient colors={['#F9DA4F', '#F7884F']} style={styles.linearGradient}>
        <View>
          <Image
            source={require('../../assets/ic_thecross.png')}
            style={styles.icon}
          />
          <Text style={styles.titleText}>THE BIBLE</Text>
          <Text style={styles.titleInfo}>로그인해서 성경공부를 해보세요.</Text>
          {/*<GoogleSigninButton navigation= {navigation} test='zz' />*/}

        </View>
        <TouchableOpacity style={styles.googleLoginButtonContainer} onPress={this._signIn}>
          <Image  style={styles.googleLoginButton} source={require('../../assets/btn_google_login.png')}/>
        </TouchableOpacity>

        {errorMessage && <Text>{errorMessage}</Text>}

        {/*로그인 로그아웃에 대한 버튼 테스트용*/}
        {/*<View style={styles.buttonContainer}>*/}
          {/*{!this.state.loggedIn && <Text>You are currently logged out</Text>}*/}
          {/*{this.state.loggedIn && <Button onPress={this.signOut}*/}
                                          {/*title="Signout"*/}
                                          {/*color="#841584">*/}
          {/*</Button>}*/}
        {/*</View>*/}
      </LinearGradient>
    );
  }

}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  icon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleText: {
    fontWeight: 'normal',
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
    color: 'white',
  },
  titleInfo: {
    fontSize: 14,
    textAlign: 'center',
    margin: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {},

  googleLoginButtonContainer: {
    marginTop: 10,
  },

  googleLoginButton: {
    width: 250,
    height: 50,
    resizeMode: 'contain',
  },
});
