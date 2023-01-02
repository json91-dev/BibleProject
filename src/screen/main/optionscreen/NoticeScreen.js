import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';

import {
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

import {getFireStore} from '../../../utils'
import LoadingSpinner from '../../components/LoadingSpinner'


export default class ContentScreen extends Component {
  state = {
    activeSections: [],
    sectionDataArray: [],
    isLoading: true,
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
      colSnapshot.docs.forEach(doc => {
        this.readNotification(doc);
      });

      this.setState({
        isLoading: false,
      })
     }
    )
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
    const { isLoading }= this.state;
    // return (
    //   <LoadingSpinner/>
    // )

    if(isLoading) {
      return (
        <LoadingSpinner/>
      )
    } else {
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
