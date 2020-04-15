import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import ReviewQuizItem from './components/ReviewQuizItem'
import {getItemFromAsync, setItemToAsync} from '../../../utils';

export default class QuizScreen extends Component {
  state = {
    isCompleteTodayQuiz: false,
    reviewQuizData: [],
  };

  componentDidMount() {
    const getIsCompleteTodayQuiz = getItemFromAsync('isCompleteTodayQuiz');
    const getReviewQuizDataList = getItemFromAsync('reviewQuizDataList');

    Promise.all([getIsCompleteTodayQuiz, getReviewQuizDataList]).then((result) => {
      let isCompleteTodayQuiz = result[0];
      const reviewQuizDataList = result[1];

      // 데이터가 없을경우 []를 반환하므로 이를 예외처리하여야 함.
      // 문제를 한번도 풀지 않아본 유저의 경우
      if(isCompleteTodayQuiz.length && isCompleteTodayQuiz.length === 0) {
        this.setState({
          isCompleteTodayQuiz: false,
          reviewQuizData: reviewQuizDataList,
        })
      }
      // 오늘의 퀴즈를 모두 푼 유저의 경우
      // 퀴즈를 푼 이후 => 결과창, 타이머, 내가 푼 성경 복습
      else if(isCompleteTodayQuiz === true) {
        this.setState({
          isCompleteTodayQuiz: true,
          reviewQuizData: reviewQuizDataList,
        })
      }

      // 오늘의 퀴즈를 모두 풀지 않은 유저의 경우.
      // 퀴즈를 아직 풀기 전 => 퀴즈 시작 버튼, 이전 문제에 대한 복습.
      else if(isCompleteTodayQuiz === false) {
        this.setState({
          isCompleteTodayQuiz: false,
          reviewQuizData: reviewQuizDataList,
        })
      }
    })
  }

  moveToScreen = (screenName) => () => {
    console.log(screenName);
    this.props.navigation.navigate(screenName);
  };

  /**
   * 컴포넌트 구현
   */

  ShowReviewQuizItems = () => {
    const { isCompleteTodayQuiz, reviewQuizData } = this.state;

    if (isCompleteTodayQuiz) {
      return (
        <View>
          {/*<ReviewQuizItem index='1' quizVerse='요한복음 1장 27절' quizWord='나사렛' quizSentence='요셉도 다윗의 집 족속이므로 갈리리 나사렛 동네에서 유대를 향하여'/>*/}
          {/*<ReviewQuizItem index='2' quizVerse='요한복음 1장 27절' quizWord='유대' quizSentence='요셉도 다윗의 집 유대이므로 갈리리 나사렛 동네에서 유대를 향하여'/>*/}
          {
            reviewQuizData.map((item, index) => {
              return (
                <ReviewQuizItem index={index + 1} quizVerse={item.quizVerse} quizWord={item.quizWord} quizSentence={item.quizSentence}/>
              )
            })
          }

        </View>
      )
    }
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle ={{justifyContent: 'center'}}>
        <View style={{ borderBottomWidth: 1, paddingBottom: 20, alignItems: 'flex-end', paddingRight: 16, borderBottomColor: '#CCCCCC'}}>
          <TouchableOpacity onPress={this.moveToScreen('TodayQuizScreen')}>
            <Text style={{fontSize: 18}}>건너뛰기</Text>
          </TouchableOpacity>
        </View>

        <Image style={styles.todayQuizReviewImage} source={require('assets/ic_today_quiz_review.png')}/>

        {this.ShowReviewQuizItems()}

        <Image style={styles.titleImage} source={require('assets/ic_jesus.png')}/>
        <Text style={styles.titleText}>오늘의 세례문답{"\n"}퀴즈를 시작할 준비가{"\n"}되셨나요?</Text>
        <TouchableOpacity style={styles.quizButton} onPress={this.moveToScreen('TodayQuizScreen')}>
            <Text style={styles.quizButtonText}>오늘의 세례문답 시작!</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  titleImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
  },
  todayQuizReviewImage: {
    width: 180,
    height: 100,
    resizeMode: 'contain',
    marginTop: 38,
    marginLeft: 30,
    marginBottom: 40,
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
  quizButton: {
    width: 300,
    height: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#F9DA4F',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  quizButtonText: {
    fontWeight: 'bold',
    fontSize: 15
  },
});
