import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';

import {
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

const SECTIONS = [
  {
    content: '공지사항 1번입니다.',
  },
  {
    content: '공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. 공지사항 2번입니다. ',
  },

  {
    content: '공지사항 3번입니다. 공지사항 3번입니다. 공지사항 3번입니다. 공지사항 3번입니다. 공지사항 3번입니다. ',
  },
];

export default class ContentScreen extends Component {
  state = {
    activeSections: [],
  };

  // _renderSectionTitle = (section, index, isActive, sections) => {
  //   return (
  //     <View style={styles.content}>
  //       <Text>{section.content}</Text>
  //     </View>
  //   );
  // };

  _renderHeader = (section, index, isActive, sections) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>공지사항 {index} </Text>
        <View style={styles.headerDateContainer}>
          <Text style={styles.headerDate}>2020.01.29</Text>
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
        sections={SECTIONS}
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
    paddingLeft: '6%',
    paddingRight: '6%',
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
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: '#EDEDED',
    paddingLeft: 20,
    paddingRight: 20,

  },

  content: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,

  }
});
