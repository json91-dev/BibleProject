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
import QuizBallComponent from './components/QuizBallComponent';
let timer = null;

export default class QuizScreen extends Component {
  state = {
    isCompleteTodayQuiz: false,
    isGiveUpTodayQuiz: false,
    reviewQuizData: [],
    timerText: 'waiting...',
  };

  componentDidMount() {
    // stackNavigation에서 pop이나 back버튼을 눌렀을때 componentDidMount가 다시 수행되지 않으므로,
    // focus이벤트를 등록시킨뒤 componentDidMount의 로직들을 onLoad 함수를 이용하여 처리한다.
    // 내부 타이머 실행
    if (timer) {
      clearInterval(timer);
    }

    let end = new Date(new Date().setHours(24, 0, 0));
    this.CountDownQuizTimer(end);
    this.onLoad();
  }


  // 언마운트 될떄 timer와 focus이벤트를 해지시켜준다.
  componentWillUnmount() {
    clearInterval(timer);
    // navigation의 focus를 해지한다.
    // 그냥 함수를 한번 호출하면 unsubscribe 되어진다.
    this.didFoucsSubscription();
  }


  // 세례문답 Screen이 처음 시작될 떄 한번만 호출된다.
  // focus 이벤트를 등록하고 focus 이벤트에서는 초기 퀴즈에 대한 state 초기화를 진행한다.
  onLoad = () => {
    this.didFoucsSubscription =  this.props.navigation.addListener('focus', () => {
      this.initialQuizState();
    })
  };


  // 초기 퀴즈 메인 컴포넌트들에 대한 State를 설정하는 함수.
  // isCompleteTodayQuiz : 오늘의 퀴즈를 풀었는지?
  // reviewQuizDataList : 복습 문제가 있는지?
  // quizAnswerList : 유저가 입력한 퀴즈의 정답 목록.
  initialQuizState = () => {
    const getIsCompleteTodayQuiz = getItemFromAsync('isCompleteTodayQuiz');
    const getReviewQuizDataList = getItemFromAsync('reviewQuizDataList');
    const getQuizAnswerTextItems = getItemFromAsync('quizAnswerList');

    Promise.all([getIsCompleteTodayQuiz, getReviewQuizDataList, getQuizAnswerTextItems]).then((result) => {
      let isCompleteTodayQuiz = result[0];
      const reviewQuizDataList = result[1];
      const quizAnswerList = result[2];
      console.log(quizAnswerList);

      // 데이터가 없을경우 []를 반환하므로 이를 예외처리하여야 함. => item.length 는 false임 .. 실수.. 0이기때문
      // 문제를 한번도 풀지 않아본 유저의 경우
      if(isCompleteTodayQuiz && isCompleteTodayQuiz.length === 0) {
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
    });
  };

  moveToScreen = (screenName) => () => {
    console.log(screenName);
    this.props.navigation.navigate(screenName);
  };

  CountDownQuizTimer = (dt) => {

    const end = new Date(dt);
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let zeroSet = function (i) {
      return (i < 10 ? '0' : '') + i
    };

    const showRemaining = () => {
      const now = new Date();
      const distance = end - now;

      // 시간 종료시
      if (distance < 0) {
        clearInterval(timer);
        // 종류 문구 선언
        return;
      }

      const days = Math.floor(distance / day);
      const hours = Math.floor((distance % day) / hour);
      const minutes = Math.floor((distance % hour) / minute);
      const seconds = Math.floor((distance % minute) / second);

      // console.log(`${days} ${hours} ${minutes} ${seconds}`)
      const _timerText = `${zeroSet(hours)}:${zeroSet(minutes)}:${zeroSet(seconds)}`;
      // console.log('timer' + new Date());

      this.setState({
        timerText: _timerText
      })
    };

    clearInterval(timer);
    timer = setInterval(showRemaining, 1000);
  };

  /**
   * 컴포넌트 구현
   */


  /**
   * 퀴즈에 대한 복습내용과, 퀴즈를 풀수 있는 링크를 제공하는 컴포넌트
   * 오늘의 퀴즈를 풀지 않았을 때 (isCompleteTodayQuiz === false)
   *  => 퀴즈 복습데이터의 존재 여부 (reviewQuizData)에 따라 퀴즈를 풀수 있는 링크를 제공함.
   */
  ReviewQuizAndTodayQuizLink = () => {
    const { isCompleteTodayQuiz, reviewQuizData } = this.state;

    // 오늘의 퀴즈를 풀지 않았을 때, 복습 문제를 보여준다.
    // 유저가 맨 처음 들어왔을때에 대한 예외처리를 length를 통해 구현함.
    // 복습퀴즈 데이터가 없으면 링크만 보여준다.
    if (!isCompleteTodayQuiz && reviewQuizData.length === 0) {
      return (
        <View style={{marginTop: 100}}>
          <Image style={styles.titleImage} source={require('assets/ic_jesus.png')}/>
          <Text style={styles.titleText}>오늘의 세례문답{"\n"}퀴즈를 시작할 준비가{"\n"}되셨나요?</Text>
          <TouchableOpacity style={styles.quizButton} onPress={this.moveToScreen('TodayQuizScreen')}>
            <Text style={styles.quizButtonText}>오늘의 세례문답 시작!</Text>
          </TouchableOpacity>
        </View>
      )
    }

    // 복습퀴즈 데이터가 있으면 복습퀴즈와 링크, 바로가기를 보여준다.
    else if (!isCompleteTodayQuiz && reviewQuizData.length > 0) {
      return (
        <View>
          <View style={{ borderBottomWidth: 1, paddingBottom: 20, alignItems: 'flex-end', paddingRight: 16, borderBottomColor: '#CCCCCC'}}>
            <TouchableOpacity onPress={this.moveToScreen('TodayQuizScreen')}>
              <Text style={{fontSize: 18}}>건너뛰기</Text>
            </TouchableOpacity>
          </View>

          <Image style={styles.todayQuizReviewImage} source={require('assets/ic_today_quiz_review.png')}/>
          {
            reviewQuizData.map((item, index) => {
              return (
                <ReviewQuizItem index={index + 1} quizVerse={item.quizVerse} quizWord={item.quizWord} quizSentence={item.quizSentence}/>
              )
            })
          }

          <Image style={styles.titleImage} source={require('assets/ic_jesus.png')}/>
          <Text style={styles.titleText}>오늘의 세례문답{"\n"}퀴즈를 시작할 준비가{"\n"}되셨나요?</Text>
          <TouchableOpacity style={styles.quizButton} onPress={this.moveToScreen('TodayQuizScreen')}>
            <Text style={styles.quizButtonText}>오늘의 세례문답 시작!</Text>
          </TouchableOpacity>
        </View>
      )
    }

    // 오늘의 퀴즈를 풀었을때는 아무것도 보여주지 않는다.
    else if (isCompleteTodayQuiz) {
      return null;
    }
  };

  TodayQuizResult = () => {
    const { isCompleteTodayQuiz, isGiveUpTodayQuiz } = this.state;

    if (isCompleteTodayQuiz && isGiveUpTodayQuiz) {
      return (
        <View>
          <TouchableOpacity>
            <Image style={styles.quizResultQuestionImage} source={require('assets/ic_question_quiz_result.png')}/>
          </TouchableOpacity>
          <Image style={styles.quizResultJesusImage} source={require('assets/ic_jesus_sad.png')}/>
          <Text style={styles.titleText}>오늘의 세례문답{"\n"}퀴즈를 포기하셨네요.{"\n"}내일의 세례문답까지.</Text>
        </View>
      )
    }

    else if (isCompleteTodayQuiz && !isGiveUpTodayQuiz) {
      return (
        <View>
          <TouchableOpacity>
            <Image style={styles.quizResultQuestionImage} source={require('assets/ic_question_quiz_result.png')}/>
          </TouchableOpacity>
          <Image style={styles.quizResultJesusImage} source={require('assets/ic_jesus_weird.png')}/>
          <Text style={styles.titleText}>오늘의 세례문답 성적은</Text>
          <QuizBallComponent quizBallState={[0,0,1,1,0]}/>
          <Text style={[styles.titleText, {marginTop: 80}]}>내일의 세례문답까지.</Text>
        </View>
      )
    }
  };

  QuizTimer = () => {
    /*
     * 타이머
     */
    const { timerText } = this.state;
    // console.log('하하');

    return (
      <Text style={{textAlign: 'center', fontSize: 44, marginTop: 20, fontWeight: 'light'}}>{timerText}</Text>
    )
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle ={{justifyContent: 'center'}}>
        {this.ReviewQuizAndTodayQuizLink()}
        {this.TodayQuizResult()}
        {this.QuizTimer()}

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

  quizResultQuestionImage: {
    width: 180,
    height: 120,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    marginBottom: -20
  },

  quizResultJesusImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
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
