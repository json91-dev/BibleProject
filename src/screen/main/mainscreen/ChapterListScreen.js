import React, { Component } from 'react';
import {

  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Button,
  TouchableOpacity

} from 'react-native';

export default class ChapterListScreen extends Component {
  state = {
    bookName: '업데이트전',
    navigation: null
  };

  componentDidMount() {
    const { route } = this.props;
    this.setState({bookName: route.params.bookName});
    this.setState({navigation: this.props.navigation});

  }

  render() {
    return (
      <View>
        <Text>{this.state.bookName}</Text>
      </View>
    )
  }
}
