import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Alert,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {getItemFromAsync, setItemToAsync} from '../../../utils';

export default class ContentScreen extends Component {
  state = {
    profilePic: null,
    isImageAvailable: false,
  };

  _getImage = async() => {
    const profilePic = await getItemFromAsync("profilePic");

    if (profilePic && profilePic.length === 0) {
      // 프로필 사진이 저장되지 않았을 때,
      this.setState({
        isImageAvailable: false,
      })
    } else {
      // 프로필 사진이 localStorage에 저장되어 있을 때 해당 값을 읽어옴.
      this.setState({
        isImageAvailable: true,
        profilePic: profilePic,
      })
    }
  };

  componentDidMount() {
    this._getImage();
  }

  getProfileImage = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          profilePic: source,
          isImageAvailable: true,
        });

        const _saveImage =  async() => {
          try {
            await setItemToAsync("profilePic", source);
            console.log("이미지 저장 완료");
          } catch(err) {
            console.log(err);
          }
        };
        _saveImage();


        console.log('프로필 이미지 uri localStorage에 저장');

      }
    });


  };

  render() {
    console.log(this.state.isImageAvailable)
    return (
      <ScrollView style={styles.container}>
        {

          this.state.isImageAvailable
            ? <Image style={styles.nicknameImage} source={this.state.profilePic} />
            : <Image style={styles.nicknameImage} source={require('assets/ic_jesus_nickname.png')} />
        }
        <TouchableOpacity onPress={this.getProfileImage} style={styles.profilePhotoButton}>
          <Text style={styles.profilePhotoButtonText}>프로필 사진 변경</Text>
        </TouchableOpacity>

        <Text style={styles.nicknameLabel}>닉네임을 입력하세요.</Text>
        <TextInput placeholder="프로필 입력" style={styles.nickname}></TextInput>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>프로필 수정 완료</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingLeft: '6%',
    paddingRight: '6%',
    backgroundColor: 'white',
  },
  nicknameImage: {
    marginTop: 35,
    width: 110,
    height: 110,
    resizeMode: 'cover',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 200
  },
  profilePhotoButton: {
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 22,
    borderColor:'#828282',
  },

  profilePhotoButtonText: {
    color: '#828282',
    fontSize: 12,
  },

  nicknameLabel: {
    color: '#828282',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
  },

  nickname: {
    borderBottomWidth: 1,
    borderColor: '#EDEDED',
    marginTop: 25,
    paddingBottom: 23,
    fontSize: 22,
    textAlign: 'center'
  },

  editButton: {
    marginTop: 31,
    backgroundColor: '#F6D43F',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  editButtonText: {
    fontWeight: 'bold',
  }
});
