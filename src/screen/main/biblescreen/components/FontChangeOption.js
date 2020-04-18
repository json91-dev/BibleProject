import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import {getItemFromAsync, setItemToAsync} from '../../../../utils';

export default class FontChangeOption extends Component {
  state = {
    isOpenAnswer: false,
    fontSize: '14px',
    fontSizeOption: null,
  };

  componentDidMount() {
    getItemFromAsync('fontSizeOption').then((item) => {
      if(item && item.length === 0) {
        this.setState({
          fontSizeOption: 1
        });
      } else {
        this.setState({
          fontSizeOption: item
        })
      }
    })
  }

  /**
   * 함수
   */

  // 0: 12pt
  // 1: 14pt
  // 2: 16px
  // 3: 18pt
  // 폰트변경 버튼이 눌렸을시 폰트사이즈를 바꿔줍니다.
  onChangeFontSize = (option) => () => {
    const { changeFontHandler } = this.props;

    switch(option) {
      case 0:
        changeFontHandler(12);
        break;
      case 1:
        changeFontHandler(14);
        break;
      case 2:
        changeFontHandler(16);
        break;
      case 3:
        changeFontHandler(18);
        break;
    }
    this.setState({
      fontSizeOption: option
    });

    setItemToAsync('fontSizeOption', option);
  };

  /**
   * 컴포넌트
   */

  FontButtonComponent = () => {

    const FontSizeButton12 = () => {
      const { fontSizeOption } = this.state;

      if (fontSizeOption === 0) {
        return (
          <TouchableOpacity style={styles.fontButtonChecked} onPress={this.onChangeFontSize(0)}>
            <Text style={{fontSize: 12}}>12pt</Text>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity style={styles.fontButton} onPress={this.onChangeFontSize(0)}>
            <Text style={{fontSize: 12}}>12pt</Text>
          </TouchableOpacity>
        )
      }
    };

    const FontSizeButton14 = () => {
      const { fontSizeOption } = this.state;

      if (fontSizeOption === 1) {
        return (
          <TouchableOpacity style={styles.fontButtonChecked} onPress={this.onChangeFontSize(1)}>
            <Text style={{fontSize: 14}}>14pt</Text>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity style={styles.fontButton} onPress={this.onChangeFontSize(1)}>
            <Text style={{fontSize: 14}}>14pt</Text>
          </TouchableOpacity>
        )
      }
    };

    const FontSizeButton16 = () => {
      const { fontSizeOption } = this.state;


      if (fontSizeOption === 2) {
        return (
          <TouchableOpacity style={styles.fontButtonChecked} onPress={this.onChangeFontSize(2)}>
            <Text style={{fontSize: 16}}>16pt</Text>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity style={styles.fontButton} onPress={this.onChangeFontSize(2)}>
            <Text style={{fontSize: 16}}>16pt</Text>
          </TouchableOpacity>
        )
      }
    };

    const FontSizeButton18 = () => {
      const { fontSizeOption } = this.state;


      if (fontSizeOption === 3) {
        return (
          <TouchableOpacity style={styles.fontButtonChecked} onPress={this.onChangeFontSize(3)}>
            <Text style={{fontSize: 18}}>18pt</Text>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity style={styles.fontButton} onPress={this.onChangeFontSize(3)}>
            <Text style={{fontSize: 18}}>18pt</Text>
          </TouchableOpacity>
        )
      }
    };

    return (
      <View style={styles.fontButtonContainer}>
        {FontSizeButton12()}
        {FontSizeButton14()}
        {FontSizeButton16()}
        {FontSizeButton18()}

      </View>
    )
  };

  render() {
    const {closeHandler} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{width: 60,}}></View>
          <Text style={styles.headerTitle}>보기 설정</Text>
          <TouchableOpacity onPress={closeHandler}>
            <View style={styles.headerImageWrapper}><Image style={styles.headerImage} source={require('/assets/ic_close.png')}></Image></View>
          </TouchableOpacity>
        </View>
        <Text style={styles.fontStyle}>글꼴</Text>
        <View style={styles.fontButtonContainer}>
          <TouchableOpacity style={styles.fontButton}>
            <Text>나눔고딕</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fontButton}>
            <Text>맑은체</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fontButton}>
            <Text>명조체</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fontButton}>
            <Text>기린</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.fontSize,{marginTop: 20}]}>글짜크기</Text>
        {this.FontButtonComponent()}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'absolute',
    width: '95%',
    bottom: 110,
    borderRadius: 5,
    backgroundColor: 'white',
    left: '2.5%',
    height: '45%',
    borderWidth: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  headerImageWrapper: {
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },

  headerImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },

  fontStyle: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },

  fontSize: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },

  fontButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingLeft: '4%',
    paddingRight: '4%',
    marginTop: 6,
  },

  fontButton: {
    borderWidth: 1,
    width: '23%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: '#595959'
  },

  fontButtonChecked: {
    width: '23%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: '#F6D440',
    borderWidth: 3,
  },
});
