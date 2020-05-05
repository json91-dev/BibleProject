import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';

import {
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

import {getFireStore} from '../../../utils'

const SECTIONS = [
  {
    title: '테스트 1',
    content: '공지사항 1번입니다.',
  },

  {
    title: '테스트 2',
    content: '공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. ',
  },

  {
    title: '테스트 3',
    content: '공지사항 3번입니다. 공지사항 3번입니다. 공지사항 3번입니다. 공지사항 3번입니다. 공지사항 3번입니다. ',
  },
];

export default class ContentScreen extends Component {
  state = {
    activeSections: [],
    sectionDataArray: [],
  };

  readNotification(doc) {
    const zeroSet = function (i) {
      return (i < 10 ? '0' : '') + i
    };

    const getDateString = (timestamp) => {

      const date = timestamp.toDate();
      const year = date.getFullYear();
      const month = zeroSet(date.getMonth() + 1);
      const day = zeroSet(date.getDate());

      console.log(year);
      console.log(month);
      console.log(day);

      return `${year}.${month}.${day}`;
    };

    const dateString = getDateString(doc.data().timestamp);

    const sectionData = {
      dateString: dateString,
      title: doc.data().title,
      content: doc.data().content,
    };

    this.setState((prevState => {
      return {
        sectionDataArray: [...prevState.sectionDataArray, sectionData]
      }
    }))
  }

  componentDidMount() {
    // 서버로부터 데이터를 가져옵니다.
    getFireStore().collection('notification').get().then((colSnapshot) => {
      alert('서버로부터 데이터 받아옴');
      colSnapshot.docs.forEach(doc => {
        this.readNotification(doc);
      })
    })
  }

  _renderHeader = (section, index, isActive, sections) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTextLabel}>{index + 1}. </Text>
        <Text style={styles.headerText}>{section.title} </Text>
        <View style={styles.headerDateContainer}>
          <Text style={styles.headerDate}>{section.dateString}</Text>
        </View>
      </View>
    );
  };

  _renderContent = (section, index, isActive, sections) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        containerStyle={{backgroundColor: 'white', height: '100%'}}
        sections={this.state.sectionDataArray}
        activeSections={this.state.activeSections}
        // renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
        underlayColor='yellow'
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingLeft: '3%',
    paddingRight: '3%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  appVersionImage: {
    resizeMode: 'contain',
    width: '60%',
    marginBottom: '15%',
  },

  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderColor: '#EDEDED',
    paddingLeft: 20,
    paddingRight: 20,
  },

  headerText: {
    width: '69%'
  },

  headerTextLabel: {
    width: '5%',
  },

  headerDateContainer: {
    width: '20%',
  },

  content: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    paddingTop: 10,

  }
});
