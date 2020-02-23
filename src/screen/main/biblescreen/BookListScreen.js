import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import { FlatGrid } from 'react-native-super-grid';

export default class BookListScreen extends Component {

  render() {
    const { route } = this.props;
    const navigation = this.props.navigation;

    const oldBibleItems = [
      { name: '창', bookName: '창세기', bookCode: 1}, { name: '출', bookName: '출애굽기', bookCode: 2},
      { name: '레', bookName: '레위기', bookCode: 3}, { name: '민', bookName: '민수기' , bookCode: 4},
      { name: '신', bookName: '신명기', bookCode: 5}, { name: '수', bookName: '여호수아', bookCode: 6 },
      { name: '삿', bookName: '사사기', bookCode: 7}, { name: '룻', bookName: '룻기', bookCode: 8 },
      { name: '삼상', bookName: '사무엘상', bookCode: 9}, { name: '삼하', bookName: '사무엘하', bookCode: 10 },
      { name: '왕상', bookName: '열왕기상', bookCode: 11 }, { name: '왕하', bookName: '열왕기하', bookCode: 12 },
      { name: '대상', bookName: '역대상', bookCode: 13 }, { name: '대하', bookName: '역대하', bookCode: 14 },
      { name: '스', bookName: '에스라', bookCode: 15 }, { name: '느', bookName: '느헤미야', bookCode: 16 },
      { name: '에', bookName: '에스더', bookCode: 17 }, { name: '욥', bookName: '욥기', bookCode: 18 },
      { name: '시', bookName: '시편', bookCode: 19 }, { name: '잠', bookName: '잠언', bookCode: 20 },
      { name: '전', bookName: '전도서', bookCode: 21 }, { name: '아', bookName: '아가', bookCode: 22 },
      { name: '사', bookName: '이사야', bookCode: 23 }, { name: '렘', bookName: '예레미야', bookCode: 24 },
      { name: '애', bookName: '예레미아애가', bookCode: 25 }, { name: '겔', bookName: '에스겔', bookCode: 26 },
      { name: '단', bookName: '다니엘', bookCode: 27 }, { name: '호', bookName: '호세아', bookCode: 28 },
      { name: '욜', bookName: '요엘', bookCode: 29 }, { name: '암', bookName: '아보스', bookCode: 30 },
      { name: '옵', bookName: '오바댜', bookCode: 31 }, { name: '욘', bookName: '요나', bookCode: 32 },
      { name: '미', bookName: '미가', bookCode: 33 }, { name: '나', bookName: '나훔', bookCode: 34 },
      { name: '합', bookName: '하박국', bookCode: 35 }, { name: '습', bookName: '스바냐', bookCode: 36 },
      { name: '학', bookName: '학개', bookCode: 37 }, { name: '슥', bookName: '스가랴', bookCode: 38 },
      { name: '말', bookName: '말라기', bookCode: 39 },
    ];

    const newBibleItems = [
      { name: '마', bookName: '마태복음', bookCode: 40}, { name: '막', bookName: '마가복음', bookCode: 41},
      { name: '눅', bookName: '누가복음', bookCode: 42}, { name: '요', bookName: '요한복음' , bookCode: 43},
      { name: '행', bookName: '사도행전', bookCode: 44}, { name: '롬', bookName: '로마서', bookCode: 45 },
      { name: '고전', bookName: '고린도전서', bookCode: 46}, { name: '고후', bookName: '고린도후서', bookCode: 47 },
      { name: '갈', bookName: '갈라디아서', bookCode: 48}, { name: '엡', bookName: '에베소', bookCode: 49 },
      { name: '빌', bookName: '빌립보서', bookCode: 50}, { name: '골', bookName: '골로새서', bookCode: 51 },
      { name: '살전', bookName: '데살로전서', bookCode: 52 }, { name: '살후', bookName: '데살로후서', bookCode: 53 },
      { name: '딤전', bookName: '디모데전서', bookCode: 54 }, { name: '딤후', bookName: '디모데후서', bookCode: 55 },
      { name: '딛', bookName: '디도서', bookCode: 56 }, { name: '몬', bookName: '빌레몬서', bookCode: 57 },
      { name: '히', bookName: '히브리서', bookCode: 58 }, { name: '약', bookName: '야보고서', bookCode: 59 },
      { name: '벧전', bookName: '베드로전서', bookCode: 60 }, { name: '벧후', bookName: '베드로후서', bookCode: 61 },
      { name: '요1', bookName: '요한1서', bookCode: 62 }, { name: '요2', bookName: '요한2서', bookCode: 63 },
      { name: '요3', bookName: '요한3서', bookCode: 64 }, { name: '유', bookName: '유다서', bookCode: 65 },
      { name: '계', bookName: '요한계시록', bookCode: 66 },
    ];
    const item = (route.params.bibleType === 'old')? oldBibleItems : newBibleItems ;
    const activeItemColor = (route.params.bibleType === 'old')? '#F9DA4F' : '#F8924F' ;

    return (
      <View style={styles.rootContainer}>
        <FlatGrid
          itemDimension={70}
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

