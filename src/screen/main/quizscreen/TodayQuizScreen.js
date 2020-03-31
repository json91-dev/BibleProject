import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';

import QuizBallComponent from './components/QuizBallComponent';
import TodayQuizItem from './components/TodayQuizItem';

export default class TodayQuizScreen extends Component {
  render() {
    return (
      <View style={styles.container} contentContainerStyle ={{justifyContent: 'center'}}>
        <View style={styles.giveUpView}>
          <TouchableOpacity style={styles.giveUpButton}>
            <Text style={styles.giveUpButtonText}>포기하기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.todayQuizTitleView}>
          <Text style={styles.todayQuizTitleText}>오늘의 세례문답 3/5</Text>
          <QuizBallComponent/>
        </View>
        <TodayQuizItem index='1' quizVerse='요한복음 1장 27절' quizWord='나사렛' quizSentence='요셉도 다윗의 집 족속이므로 갈리리 나사렛 동네에서 유대를 향하여'/>
        <TextInput style={styles.answerInputText} placeholder="정답을 입력하세요" />
        <TouchableOpacity style={styles.passButton}>
          <Text style={styles.passButtonText}>이 문제 패스</Text>
        </TouchableOpacity>
        <Text style={styles.passButtonLabel}>패스를 하게 되면 틀림으로 간주 합니다.</Text>

        <TouchableOpacity style={styles.answerSubmitButton}>
          <Text style={styles.answerSubmitButtonText}>정답 제출</Text>
        </TouchableOpacity>
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
    marginTop: '15%',
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
});
