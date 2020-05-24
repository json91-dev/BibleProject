import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-community/google-signin';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';


import {useNavigation} from '@react-navigation/native';

export default class LoginScreen extends Component {

  state = {
    pushData: [],
    loggedIn: false,
    userInfo: null,
  };

  aa = () => {
    navigation.navigate('Main');
  };

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo: userInfo, loggedIn: true});
    } catch (error) {
      console.log(error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({user: null, loggedIn: false}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };


  componentDidMount() {
    // 구글 로그인에대한 설정을 초기화합니다.
    GoogleSignin.configure({
      webClientId: '271807854923-f0si6s5dj9urd45nvdpqpeihnc3q8i57.apps.googleusercontent.com',
      offlineAccess: false,
      // forceConsentPrompt: true,
    });
  }

  render() {
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
