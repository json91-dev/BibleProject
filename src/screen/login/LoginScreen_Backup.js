import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import {

  StyleSheet,
  View,
  Text,
  Image,
  Button

} from 'react-native';

// import GoogleSigninButton from './GoogleSigninButton'
import { useNavigation}  from '@react-navigation/native';

export default class LoginScreen extends Component{

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
      this.setState({ userInfo: userInfo, loggedIn: true });
    } catch (error) {
      console.log(error.message)
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
      this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
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
    })
  }
// {/*<LinearGradient colors={['#F9DA4F', '#F7884F']} style={styles.linearGradient}>*/}
// {/*<View>*/}
// {/*<Image*/}
// {/*source={require('../../assets/ic_thecross.png')}*/}
// {/*style={styles.icon}*/}
// {/*/>*/}
// {/*<Text style={styles.titleText}>THE BIBLE</Text>*/}
// {/*<Text style={styles.titleInfo}>로그인해서 성경공부를 해보세요.</Text>*/}
// {/*/!*<GoogleSigninButton navigation= {navigation} test='zz' />*!/*/}
// {/*<Button title={"해해"} onPress={this.aa}/>*/}
// {/*</View>*/}
// {/*</LinearGradient>*/}
  render() {
    return (

      <View>

        <View style={styles.sectionContainer}>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress} />
        </View>

        <View style={styles.buttonContainer}>
          {!this.state.loggedIn && <Text>You are currently logged out</Text>}
          {this.state.loggedIn && <Button onPress={this.signOut}
                                          title="Signout"
                                          color="#841584">
          </Button>}
        </View>
        {
          this.state.loggedIn && <View>
          <View style={styles.listHeader}>
            <Text>User Info</Text>
          </View>
          <View style={styles.dp}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.photo }}
            />
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.title}>Name</Text>
            <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.name}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.email}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.title}>ID</Text>
            <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.age}</Text>
          </View>
        </View>
        }

    </View>


    )
  }

}

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
    fontWeight: 'normal',
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
    color: 'white'
  },
  titleInfo: {
    fontSize: 14,
    textAlign: 'center',
    margin: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
  },





  listHeader: {
    backgroundColor: '#eee',
    color: "#222",
    height: 44,
    padding: 12
  },
  detailContainer: {
    paddingHorizontal: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10
  },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  dp:{
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
