import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {

  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Button,
  TouchableOpacity,
  TouchableHighlight

} from 'react-native';

export default class QuizItem extends Component {
  render() {
    // const {index, quizVerse, quizWord, quizSentence} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.quizHeaderContainer}>
          <Text style={styles.quizIndexText}>세례문답 복습 1/5</Text>
          <Text style={styles.quizVerseText}>요한복음 1장 27절</Text>
        </View>
        <View style={styles.quizMainContainer}>
          <Text style={styles.quizSentenceText}>요셉도 다윗의 집 족속이므로 갈리리 나사렛 동네에서 유대를 향하여 ____이라하는 다윗의 동네로 요셉도 다윗의 집 족속이므로 갈리리 나사렛 동네에서 유대를 향하여 ____이라하는 다윗의 동네로</Text>
          <TouchableHighlight style={styles.answerButton}>
            <Text>정답보기</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

    marginTop: 10,
    marginBottom: 10,
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
});
