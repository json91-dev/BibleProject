import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';

import QuizBallComponent from './components/QuizBallComponent';
import TodayQuizItem from './components/TodayQuizItem';
import {getItemFromAsync, setItemToAsync} from '../../../utils';
import { StackActions } from '@react-navigation/native';



export default class TodayQuizScreen extends Component {
  state = {
    currentQuizBallState: [-1, -1, -1, -1, -1],
    quizAnswerTextArray: [],
    pageState: 0,
    isFocusTextInput: false,
    textInputText: "",
    isOpenAnswer: false,
    quizData: null,
    curPageQuizData: null,
  };

  componentDidMount() {
    const data = [
      {
        quizVerse: '역대하 5장 3절',
        quizSentence: '솔로몬이 여호와의 전을 위하여 만드는 모든 것을 마친지라 이에 그 부친 다윗이 드린 은과 금과 모든 기구를 가져다가 하나님의 전 곳간에 두었더라',
        quizWord: '다윗',
      },
      {
        quizVerse: '아가 8장 11절',
        quizSentence: '솔로몬이 바알하몬에 포도원이 있어 지키는 자들에게 맡겨두고 그들로 각기 그 실과를 인하여서 은 일천을 바치게 하였구나',
        quizWord: '포도원',
      },
      {
        quizVerse: '베드로후서 3장 5절',
        quizSentence: '이는 하늘이 옛적부터 있는 것과 땅이 물에서 나와 물로 성립한 것도 하나님의 말씀으로 된 것을 저희가 부러 잊으려 함이로다',
        quizWord: '물',
      },
      {
        quizVerse: '요한계시록 6장 8절',
        quizSentence: '내가 보매 청황색 말이 나오는데 그 탄 자의 이름은 사망이니 음부가 그 뒤를 따르더라 저희가 땅 사분 일의 권세를 얻어 검과 흉년과 사망과 땅의 짐승으로써 죽이더라',
        quizWord: '사망',
      },
      {
        quizVerse: '갈라디아서 5장 13절',
        quizSentence: '형제들아 너희가 자유를 위하여 부르심을 입었으나 그러나 그 자유로 육체의 기회를 삼지 말고 오직 사랑으로 서로 종 노릇 하라',
        quizWord: '사랑',
      }
    ];


    this.setState({
      quizData: data,
      curPageQuizData: data[0],
    });

    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove()
  }

  // 키보드가 사라질때 발생하는 이벤트 선언.
  // Keyboard가 dismiss되면 자동으로 blur 호출
  _keyboardDidHide = () => {
    // this.refs.textInputRef.blur();
    Keyboard.dismiss()
  };


  render() {
    const { pageState, currentQuizBallState } = this.state;
    // 버튼이 포커스되면 searchView를 보여줌
    const onFocus = () => {
      console.log('포커스');
      this.setState((prevState) => {
        return {
          isFocusTextInput: true
        }
      })
    };

    // 버튼의 Focus가 풀렸을 시 동작함.
    const onBlur = () => {
      console.log('Blur');
      this.setState((prevState) => {
        return {
          isFocusTextInput: false,
        }
      })
    };

    /**
     * 퀴즈의 정답 여부를 체크한다.
     * 현재 입력된 Text가 현재 퀴즈의 정답과 일치하는지 여부를 판단하여 quizBallState값을 바꿔준다.
     * 현재 입력한 textInput을 quizAnswerTextArray 배열에 저장합니다.
     * 다음 단계로 이동한다.
     */
    const onAnswerSubmit = () => {
      const { curPageQuizData, pageState, textInputText, currentQuizBallState } = this.state;
      // 정답의 진위여부를 판단한다.
      const curPageQuizWord = curPageQuizData.quizWord;
      let updateQuizBallState;

      // quizBallState를 바꿔줌.
      if (curPageQuizWord === textInputText) {
        // 정답일 경우 quizBallState를 1로 바꿔준다.
        updateQuizBallState = [...currentQuizBallState];
        updateQuizBallState[pageState] = 1;
      } else {
        // 정답이 아닐경우 quizBallState를 0으로 바꿔준다.
        updateQuizBallState = [...currentQuizBallState];
        updateQuizBallState[pageState] = 0;
      }


      // 유저의 정답에 대한 입력값을 저장하기 위한 변수를 선언한다.
      // 값을 입력하지 않으면 '없음' 문자열을 써서 처리한다.
      const quizInputText = (textInputText === "") ? '없음' : textInputText ;

      this.setState((prevState) => {
        return {
          currentQuizBallState: updateQuizBallState,
          isOpenAnswer: true,
          isFocusTextInput: false,
          quizAnswerTextArray: [...prevState.quizAnswerTextArray, textInputText],
          textInputText: "",
        }
      });

      // 에외처리 해주지 않으면 오류 발생
      if(this.refs.textInputRef) {
        this.refs.textInputRef.blur();
        this.refs.textInputRef.clear();
      }
    };

    const onMoveNextQuiz = () => {
      const { pageState, quizData, curPageQuizData } = this.state;

      this.setState(prevState => {
        return {
          isOpenAnswer: false,
          curPageQuizData: quizData[pageState + 1],
          pageState: prevState.pageState + 1,
        }
      })
    };

    // TODO: quizAnswerTextArray를 AsynStorage에 저장.
    // reviewQuizDataList => 다음날이 되어 퀴즈를 시작할때 풀어야 하는 복습 문제들에 대한 정보를 저장함.
    // isCompleteTodayQuiz => 오늘의 퀴즈를 모두 풀었는지에 대한 정보를 확인함.
    // todayQuizAnswerList => 오늘의 퀴즈에 대해 유저가 입력한 정답의 정보를 저장함.
    // todayQuizBallState => 오늘의 퀴즈에 대한 정답 볼 상태 저장
    // 모두 풀었을때 => 결과창 + 타이머 + 푼 문제 복습 링크
    // 안풀었을때 => 퀴즈 시작 링크 + 이전문제 복습
    const onCompleteTodayQuiz = () => {
      const { quizData, quizAnswerTextArray } = this.state;
      const setReviewQuizDataList =  setItemToAsync('reviewQuizDataList', quizData);
      const setIsCompleteTodayQuiz =  setItemToAsync('isCompleteTodayQuiz', true);
      const setQuizAnswerList = setItemToAsync('todayQuizAnswerList', quizAnswerTextArray);
      const setQuizBallState = setItemToAsync('todayQuizBallState', currentQuizBallState);

      Promise.all([setReviewQuizDataList, setIsCompleteTodayQuiz, setQuizAnswerList, setQuizBallState]).then((result) =>  {
        console.log(result);
        const navigation = this.props.navigation;
        const popAction = StackActions.pop(1);
        navigation.dispatch(popAction);
      })
    };

    // 현재 퀴즈를 패스하는 함수.
    const passCurrentQuiz = () => {
      onAnswerSubmit();
    };

    // 오늘의 퀴즈를 포기하는 함수
    const onGiveUpTodayQuiz = () => {
      // TODO : 유저가 빈문자를 입력했을때는 '없음' // 남은문제는 빈공백으로 처리 // 입력했을때는 입력한 값을 처리함
    };

    /**
     * 컴포넌트 분리.
     */
    const TodayQuizTitleView = () => {
      const { isFocusTextInput, currentQuizBallState }  = this.state;
      if (!isFocusTextInput) {
        return (
          <View style={styles.todayQuizTitleView}>
            <Text style={styles.todayQuizTitleText}>오늘의 세례문답 {pageState + 1}/5</Text>
            <QuizBallComponent quizBallState={currentQuizBallState}/>
          </View>
        )
      } else {
        return null;
      }
    };

    // 퀴즈의 내용과 성경구절을 알려주는 퀴즈 컴포넌트.
    // data를 올바르게 받아왔을때 todayQuiz컴포넌트를 열어준다.
    // 유저가 정답을 입력한 경우 props로 정답확인을 알려준다.
    const ShowTodayQuizItemComponent = () => {
      const { curPageQuizData } = this.state;
      if(curPageQuizData) {
        return  (
          <TodayQuizItem quizData={this.state.curPageQuizData} isOpened={this.state.isOpenAnswer} />
        )
      } else {
        return null;
      }
    };

    // quiz 입력에 사용되는 textInput 컴포넌트
    const QuizTextInput = () => {
      const { isOpenAnswer } = this.state;
      if ( !isOpenAnswer ) {
        return (
          <TextInput
            onFocus={onFocus}
            onBlur={onBlur}
            ref="textInputRef"
            style={styles.answerInputText}
            placeholder="정답을 입력하세요"
            onEndEditing={onBlur}
            blurOnSubmit={true}
            onChangeText={(text) => {
              this.setState({
                textInputText: text
              });
            }}
          />
        )
      } else {
        return null
      }
    };

    // 현재 퀴즈에 대한 Pass Button을 가진 컴포넌트
    const PassCurrentQuiz = () => {
      const { isOpenAnswer } = this.state;
      if( !isOpenAnswer ) {
        return (
          <View>
            <TouchableOpacity onPress={passCurrentQuiz} style={styles.passButton}>
              <Text style={styles.passButtonText}>이 문제 패스</Text>
            </TouchableOpacity>
            <Text style={styles.passButtonLabel}>패스를 하게 되면 틀림으로 간주 합니다.</Text>
          </View>
        )
      } else {
        return null;
      }
    };

    // 정답에 대해 유저의 입력을 확인시켜주는 컴포넌트.
    const ConfirmCurrentQuizAnswer = () => {
      const { isOpenAnswer} = this.state;
      let { textInputText } = this.state;

      if (textInputText === '' || textInputText === ' ') {
        textInputText = '없음'
      }

      if ( isOpenAnswer ) {
        return (
          <View style={styles.confirmAnswerView}>
            <Text style={styles.confirmAnswerLabel}>입력하신 정답은</Text>
            <Text style={styles.confirmAnswerText}>{textInputText}</Text>
          </View>
        )
      } {
        return null;
      }
    };

    // 정답제출 버튼 및 다음 화면으로 이동 버튼에 대한 컴포넌트
    const AnswerButton = () => {
      const { isOpenAnswer, pageState } = this.state;

      // 정답 확인 전, 정답확인 버튼, 이후 다음문제 버튼 출력
      // pageState가 4이상일경우 모든 문제를 푼 상태이므로 확인버튼을 눌렀을때 오늘의 퀴즈 컴포넌트에서 빠져나가야 한다.

      if ( !isOpenAnswer ) {
        return (
          <TouchableOpacity style={styles.answerSubmitButton} onPress={onAnswerSubmit}>
            <Text style={styles.answerSubmitButtonText}>정답 제출</Text>
          </TouchableOpacity>
        )
      } else if (isOpenAnswer && pageState < 4) {
        return (
          <TouchableOpacity style={styles.answerSubmitButton} onPress={onMoveNextQuiz}>
            <Text style={styles.answerSubmitButtonText}>다음 문제</Text>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity style={styles.answerSubmitButton} onPress={onCompleteTodayQuiz}>
            <Text style={styles.answerSubmitButtonText}>완료</Text>
          </TouchableOpacity>
        )
      }
    };

    return (
      <View style={styles.container} contentContainerStyle ={{justifyContent: 'center'}}>
        <View style={styles.giveUpView}>
          <TouchableOpacity style={styles.giveUpButton} onPress={onGiveUpTodayQuiz}>
            <Text style={styles.giveUpButtonText}>포기하기</Text>
          </TouchableOpacity>
        </View>
        {TodayQuizTitleView()}
        {ShowTodayQuizItemComponent()}
        {QuizTextInput()}
        {PassCurrentQuiz()}
        {ConfirmCurrentQuizAnswer()}
        {AnswerButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  giveUpView: {
    flexDirection: 'row-reverse',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#EDEDED'
  },

  giveUpButton: {
    paddingBottom: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingLeft: 10,
  },

  giveUpButtonText: {
    fontSize: 15,
  },

  todayQuizTitleView: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
    alignItems:'center',
  },

  todayQuizTitleText: {
    fontSize: 18,
    marginTop: 20,
  },

  answerInputText: {
    width: '80%',
    borderBottomWidth: 1,
    marginLeft: '10%',
    textAlign: 'center',
    fontSize: 20,
    borderColor: '#EDEDED',
    color: '#BDBDBD',
    marginTop: '8%',
  },

  passButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  passButtonText: {
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight:10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
  },

  passButtonLabel: {
    width: '100%',
    textAlign: 'center',
    color: '#828282',
    marginTop: 15,
  },

  answerSubmitButton: {
    position:'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#F9DA4F',
  },

  answerSubmitButtonText: {
    fontWeight: 'bold',
    fontSize: 14
  },

  confirmAnswerView: {
    alignItems: 'center',
    marginTop: 40
  },

  confirmAnswerLabel: {

  },

  confirmAnswerText: {
    fontSize: 20,
    marginTop: 11
  },
});
