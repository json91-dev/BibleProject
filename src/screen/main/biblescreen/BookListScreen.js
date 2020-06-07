import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';

import admob, { MaxAdContentRating, InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob';

import {getOldBibleItems, getNewBibleItems} from '/utils'
import { FlatGrid } from 'react-native-super-grid';


export default class BookListScreen extends Component {

  componentDidMount() {
    admob().setRequestConfiguration({
      // 최대 광고 컨텐트 등급 지정
      maxAdContentRating: MaxAdContentRating.PG,
      // true인 경우 아동에 대한 컨텐츠 광고 올라옴.
      tagForChildDirectedTreatment: true,
      // true인 경우 동의 연령 미만 사용자에게 적합한 방식으로 광고 요청 처
      tagForUnderAgeOfConsent: true,
    }).then(() => {
      console.log("adMob 초기화 성공")
      this.setState({
        test: 'test',
      })
    });

    // // InterstitialAd 광고에 대한 테스트 아이디 지정
    // InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
    //
    // // Rewarded 광고에 대한 테스트 아이디 지정
    // RewardedAd.createForAdRequest(TestIds.REWARDED);
  }

  /**
   * 성경 목록에 대한 화면을 FlatGrid로 그려준다.
   * 이전 화면에서 입력받은 버튼이 '구약'인지 '신약'인지 확인하고,
   * 해당 값에따라 ActiveColor와, 보여주는 성경책을 다르게 표시한다.
   */
  render() {
    const { route } = this.props;

    const oldBibleItems = getOldBibleItems();
    const newBibleItems = getNewBibleItems();

    const item = (route.params.bibleType === 0)? oldBibleItems : newBibleItems ;
    const activeItemColor = (route.params.bibleType === 0)? '#F9DA4F' : '#F8924F' ;

    return (
      <SafeAreaView>
        <FlatGrid
          itemDimension={80}
          items={item}
          style={styles.gridView}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              style={[styles.itemContainer, { backgroundColor: '#F3F4F9'}]}
              activeOpacity={0.8}
              underlayColor={activeItemColor}
              // sqlite조회를 위한 bookId를 넘겨줍니다.
              onPress={() => this.props.navigation.navigate('ChapterListScreen',{bookName: item.bookName, bookCode: item.bookCode})}
            >
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCode}>{item.bookName}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
        <View style={styles.bannderView}>
          <BannerAd
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdLoaded={function() {
              console.log('Advert loaded');
            }}
            onAdFailToLoad={error => console.log(error)}
            size={BannerAdSize.FULL_BANNER}
            unitId={TestIds.BANNER} />
        </View>

      </SafeAreaView>

    )
  }
}

const styles = StyleSheet.create({
  gridView: {
    backgroundColor: 'white',
    height:'90%'
  },

  itemContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    width: 70,
    aspectRatio: 1,
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5
  },
  banner: {
    borderWidth: 1,
    height:'10%',
    width: '100%'
  },

  bannerView: {
    height: "10%",
    width: '100%'
  }
});

