import React, { Component } from 'react';
import {

  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Button, TouchableOpacity,

} from 'react-native';

import { FlatGrid } from 'react-native-super-grid';

export default class BookListScreen extends Component {

  render() {
    const items = [
      { name: '창', code: '창세기' }, { name: '출', code: '출애굽기' },
      { name: '레', code: '레위기' }, { name: '민', code: '민수기' },
      { name: '신', code: '신명기' }, { name: '수', code: '여호수아' },
      { name: '삿', code: '사사기' }, { name: '룻', code: '룻기' },
      { name: '삼상', code: '사무엘상' }, { name: '삼하', code: '사무엘하' },
      { name: '왕상', code: '열왕기상' }, { name: '왕하', code: '열왕기하' },
      { name: '대상', code: '역대상' }, { name: '대하', code: '역대하' },
      { name: '스', code: '에스라' }, { name: '느', code: '느헤미야' },
      { name: '에', code: '에스더' }, { name: '욥', code: '욥기' },
      { name: '시', code: '시편' }, { name: '잠', code: '잠언' },
      { name: '전', code: '전도서' }, { name: '아', code: '아가' },
      { name: '사', code: '이사야' }, { name: '렘', code: '예레미야' },
      { name: '애', code: '예레미아애가' }, { name: '겔', code: '에스겔' },
      { name: '단', code: '다니엘' }, { name: '호', code: '호세아' },
      { name: '욜', code: '요엘' }, { name: '암', code: '아보스' },
      { name: '미', code: '미가' }, { name: '나', code: '나훔' },
      { name: '합', code: '하박국' }, { name: '습', code: '스바냐' },
      { name: '학', code: '학개' }, { name: '슥', code: '스가랴' },
      { name: '말', code: '말라기' },
    ];

    return (
      <View style={styles.rootContainer}>
        <FlatGrid
          itemDimension={70}
          items={items}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.itemContainer, { backgroundColor: '#F3F4F9' }]}
              // sqlite조회를 위한 bookId를 넘겨줍니다.
              onPress={() => this.props.navigation.navigate('ChapterListScreen',{bookName: `${item.name}`, bookIndex: index + 1})}
            >
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.code}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 24,
    paddingRight: 24

  },

  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    width: 70,
    aspectRatio: 1
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

