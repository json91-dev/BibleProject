import React, {Component} from 'react';
import {

  StyleSheet,
  View,
  Text,
  TouchableOpacity,

} from 'react-native';

function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

export default class TodayQuizItem extends Component {
  state = {
    isOpenAnswer: false,
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.isOpened !== nextProps.isOpened) {
      return true
    } else {
      return false
    }
  }

  /**
   * 퀴즈의 정답제출이 끝나거나, 퀴즈화면이 이동할 떄 호출됩니다.
   * isOpened로 넘겨받은 props가 변할 때, 성경퀴즈 컴포넌트를 다시 그려줍니다.
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.isOpenAnswer !== nextProps.isOpened) {
      return {
        isOpenAnswer: nextProps.isOpened
      }
    }
  }

  // 성경 텍스트 문장에 공백을 만들어 반환하는 메서드
  makeBlankQuizSentence = (quizSentence, quizWord) => {
    let dummy = '____________________________________________________';
    let blank = dummy.substr(dummy.length - quizWord.length * 2);
    let blankQuizSentence = replaceAll(quizSentence, quizWord, blank);
    return blankQuizSentence;
  };

  // 정답을 눌렀을때 공백을 없애주고 정답 문장 <Text>를 반환하는 메서드
  highlightText = (quizSentence, quizWord) => {
    let splitTextArray;
    let resultTextArray = [];
    try{
      splitTextArray = quizSentence.split(quizWord);
      splitTextArray.map((item, index) => {
        if(index > 0 && index < splitTextArray.length)
        {
          resultTextArray.push(quizWord);
        }
        resultTextArray.push(item);
      });
    } catch(err) {
      console.log(err);
      return;
    }
    return (
      <Text style={{marginTop: 5}}>
        {
          resultTextArray.map((item) => {
            if (item === quizWord) {
              return (
                <Text style={{color: '#F9DA4F'}}>{item}</Text>
              )
            } else {
              return (
                <Text style={{color: 'white'}}>{item}</Text>
              )
            }
          })
        }
      </Text>
    )
  };

  showBlankQuiz() {
    this.setState({
      isOpenAnswer: true
    });
  }



  render() {
    // const {index, quizVerse, quizWord, quizSentence} = this.props;
    const {quizVerse, quizWord, quizSentence} = this.props.quizData;
    return (
      <View style={styles.container}>
        <View style={styles.quizHeaderContainer}>
          <Text style={styles.quizIndexText}>빈칸에 들어갈 단어는?</Text>
          <Text style={styles.quizVerseText}>{quizVerse}</Text>
        </View>
        <View style={styles.quizMainContainer}>
          {
            this.state.isOpenAnswer
              ? this.highlightText(quizSentence, quizWord)
              : <Text style={styles.quizSentenceText}>
                {this.makeBlankQuizSentence(quizSentence, quizWord)}
              </Text>
          }
          {
            this.state.isOpenAnswer
              ? <Text style={styles.answerText}>정답은 "{quizWord}" 입니다.</Text>
              : <View></View>

          }
        </View>
      </View>

    )
  }
}

{/*<TouchableOpacity*/}
  {/*style={styles.answerButton}*/}
  {/*onPress={this.showBlankQuiz.bind(this)}>*/}
  {/*<Text>정답보기</Text>*/}
{/*</TouchableOpacity>*/}


const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 10,
    width: '90%',
    marginLeft: '5%'
  },

  quizHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  quizIndexText: {
    fontSize: 14,
    fontWeight: 'bold'
  },

  quizVerseText: {
    fontSize: 14
  },

  quizMainContainer: {
    marginTop: 20,
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 10,
  },

  quizSentenceText: {
    marginTop: 5,
    color: 'white'
  },

  answerButton: {
    borderWidth: 1,
    marginTop: 30,
    backgroundColor: '#F9DA4F',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },

  answerText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 8,
    marginTop: 26,
    color: '#F9DA4F',
    fontSize: 20
  }
});
