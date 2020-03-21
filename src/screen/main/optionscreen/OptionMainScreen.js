import React, { Component } from 'react';
import {

  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Alert,
  Button,
  TouchableOpacity

} from 'react-native';

export default class ContentScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Image style={styles.nicknameImage} source={require('assets/ic_jesus_nickname.png')} />
        <Text style={styles.nicknameText}>하이</Text>
        <TouchableOpacity style={styles.nicknameChangeButton}>
          <Text>프로필 수정</Text>
        </TouchableOpacity>
        <View style={styles.divider}></View>

        <Text style={styles.bibleLabel}>The Bible</Text>
        <TouchableOpacity>
          <View style={styles.optionItem}>
            <Text>공지사항</Text>
            <Image style={styles.menuRightImage} source={require('/assets/ic_arrow.png')}/>
          </View>
        </TouchableOpacity>
        <View style={styles.divider}></View>

        <TouchableOpacity>
          <View style={styles.optionItem}>
            <Text>앱버전</Text>
            <View style={styles.optionItemRight}>
              <Text style={styles.optionItemRightText}>v1.0</Text>
              <Image style={styles.menuRightImage} source={require('/assets/ic_arrow.png')}/>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.divider}></View>

        <TouchableOpacity>
          <View style={styles.optionItem}>
            <Text>개인정보 취급방침 및 이용약관</Text>
            <Image style={styles.menuRightImage} source={require('/assets/ic_arrow.png')}/>
          </View>
        </TouchableOpacity>
        <View style={styles.divider}></View>

        <TouchableOpacity>
          <View style={styles.optionItem}>
            <Text>저작권</Text>
            <Image style={styles.menuRightImage} source={require('/assets/ic_arrow.png')}/>
          </View>
        </TouchableOpacity>
        <View style={[styles.divider, {marginTop: 30}]}></View>

        <Text style={styles.bibleLabel}>FEEDBACK</Text>
        <TouchableOpacity>
          <View style={styles.optionItem}>
            <Text>앱스토어 리뷰 남기기</Text>
            <Image style={styles.menuRightImage} source={require('/assets/ic_arrow.png')}/>
          </View>
        </TouchableOpacity>
        <View style={styles.divider}></View>

        <TouchableOpacity>
          <View style={styles.optionItem}>
            <Text>버그 리포트 및 피드백</Text>
            <Image style={styles.menuRightImage} source={require('/assets/ic_arrow.png')}/>
          </View>
        </TouchableOpacity>
        <View style={[styles.divider, {marginTop: 30}]}></View>

        <Text style={styles.bibleLabel}>SUPPORT</Text>
        <Text style={styles.bibleLabelSupport}>The Bible은 여러분의 후원으로 운영되고 있습니다.{'\n'}더 나은 서비스를 위해 노력하겠습니다.</Text>

        <TouchableOpacity>
          <View style={styles.optionItem}>
            <Text>아이스 아메리카노</Text>
            <View style={styles.optionItemRight}>
              <Text style={styles.optionItemRightText}>3,900</Text>
              <Image style={styles.menuRightImage} source={require('/assets/ic_arrow.png')}/>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.divider}></View>

        <TouchableOpacity>
          <View style={styles.optionItem}>
            <Text>따뜻한 국밥 한그릇</Text>
            <View style={styles.optionItemRight}>
              <Text style={styles.optionItemRightText}>8,900</Text>
              <Image style={styles.menuRightImage} source={require('/assets/ic_arrow.png')}/>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.divider}></View>

        <TouchableOpacity>
          <View style={styles.optionItem}>
            <Text>양념치킨 한 마리</Text>
            <View style={styles.optionItemRight}>
              <Text style={styles.optionItemRightText}>19,900</Text>
              <Image style={styles.menuRightImage} source={require('/assets/ic_arrow.png')}/>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.divider}></View>

        <TouchableOpacity>
          <View style={styles.optionItem}>
            <Text>정관장 홍삼 셋트</Text>
            <View style={styles.optionItemRight}>
              <Text style={styles.optionItemRightText}>49,900</Text>
              <Image style={styles.menuRightImage} source={require('/assets/ic_arrow.png')}/>
            </View>
          </View>
        </TouchableOpacity>
        <View style={[styles.divider, {marginBottom: 20,}]}></View>


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
    width: 140,
    height: 110,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  nicknameText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  nicknameChangeButton: {
    width: 100,
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    padding: 3,
    marginBottom: 22,
  },

  bibleLabel: {
    color: '#828282',
    marginTop: 32,
  },

  menuRightImage: {
    resizeMode: 'contain',
    width: 10,
    height: 30,
    marginRight: 12,
  },

  divider: {
    width: '112%',
    marginLeft: '-6%',
    borderWidth: 0.5,
    borderColor: '#EDEDED'
  },

  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },

  optionItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionItemRightText: {
    marginRight: 10,
  },

  bibleLabelSupport: {
    color: '#828282',
    marginTop: 13,
    fontSize: 12,
  }
});
