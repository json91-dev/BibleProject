/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';

type Props = {};

import Root from './src/screen/RootNavigator';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';


export default class App extends Component<Props> {
  state = {};

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
    });

    // // InterstitialAd 광고에 대한 테스트 아이디 지정
    // InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
    //
    // // Rewarded 광고에 대한 테스트 아이디 지정
    // RewardedAd.createForAdRequest(TestIds.REWARDED);
  }

  render() {
    return (
      Root()
    );
  }
}

const styles = StyleSheet.create({

});
