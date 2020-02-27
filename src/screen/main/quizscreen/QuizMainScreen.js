import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import QuizItem from 'components/QuizItem'


export default class QuizScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle ={{justifyContent: 'center'}}>
        <QuizItem index='1' quizVerse='요한복음 1장 27절' quizWord='나사렛' quizSentence='요셉도 다윗의 집 족속이므로 갈리리 나사렛 동네에서 유대를 향하여'/>
        <QuizItem index='2' quizVerse='요한복음 1장 27절' quizWord='유대' quizSentence='요셉도 다윗의 집 유대이므로 갈리리 나사렛 동네에서 유대를 향하여'/>

        <Image style={styles.titleImage} source={require('assets/ic_jesus.png')}/>
        <Text style={styles.titleText}>오늘의 세례문답{"\n"}퀴즈를 시작할 준비가{"\n"}되셨나요?</Text>
        <TouchableOpacity style={styles.quizButton}>
            <Text style={styles.quizButtonText}>오늘의 세례문답 시작!</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',

  },
  titleImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
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
  },
  quizButtonText: {
    fontWeight: 'bold',
    fontSize: 15
  },
});
