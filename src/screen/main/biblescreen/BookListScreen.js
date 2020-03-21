import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import {getOldBibleItems, getNewBibleItems} from '/utils'
import { FlatGrid } from 'react-native-super-grid';

export default class BookListScreen extends Component {

  render() {
    const { route } = this.props;
    const navigation = this.props.navigation;

    const oldBibleItems = getOldBibleItems();
    const newBibleItems = getNewBibleItems();

    const item = (route.params.bibleType === 0)? oldBibleItems : newBibleItems ;
    const activeItemColor = (route.params.bibleType === 0)? '#F9DA4F' : '#F8924F' ;

    return (
      <FlatGrid
        itemDimension={80}
        items={item}
        style={styles.gridView}
        renderItem={({ item, index }) => (
          <TouchableHighlight
            style={[styles.itemContainer, { backgroundColor: '#F3F4F9'}]}
            activeOpacity={0.8}
            underlayColor={activeItemColor}
            // sqlite조회를 위한 bookId를 넘겨줍니다.
            onPress={() => this.props.navigation.navigate('ChapterListScreen',{bookName: item.bookName, bookCode: item.bookCode})}
          >
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.bookName}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  gridView: {
    backgroundColor: 'white'
  },

  itemContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    width: 70,
    aspectRatio: 1,
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5
  },
});

