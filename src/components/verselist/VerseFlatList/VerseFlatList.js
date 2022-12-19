import {StackActions} from '@react-navigation/native';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import MemoIndicator from './MemoIndicator';
import HighlightText from './HighlightText';
import NextButton from './NextButton';
import PrevButton from './PrevButton';

const VerseFlatList = (props) => {
  const {navigation, verseItems ,verseItemFontSize, verseItemFontFamily, onLongPressButton} = props

  /** 하단(이전,다음) 버튼에 대한 이벤트 처리 메서드 **/
  const moveChapter = useCallback((item, index) => {
    const popAction = StackActions.pop(1);
    navigation.dispatch(popAction);
    const pushChapterList = StackActions.push('VerseListScreen', {
      bookName: item.bookName,
      bookCode: item.bookCode,
      chapterCode: index,
    });
    navigation.dispatch(pushChapterList);
  }, []);

  const VerseItemContainer = ({item, index}) => {
    let verseCodeLabel = index + 1;
    const { chapterCode, maxChapterCode } = verseItems[0];

    return (
      <View>
        {index < verseItems.length -1 && (
          <TouchableOpacity style={styles.flatList}  onLongPress={() => onLongPressButton(item)}>
            <View style={styles.flatListVerseItem}>
              <MemoIndicator item={item}/>
              <Text style={[styles.flatListItemTextLabel, {fontSize: verseItemFontSize}]}>{verseCodeLabel}. </Text>
              <HighlightText item={item} verseItemFontSize={verseItemFontSize} verseItemFontFamily={verseItemFontFamily}/>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.moveChapter}>
          {index >= verseItems.length -1 && chapterCode > 1 && (
            <PrevButton
              moveChapter={moveChapter}
              chapterCode={chapterCode}
              item={item}/>
          )}

          {index >= verseItems.length -1 && chapterCode < maxChapterCode && (
            <NextButton
              moveChapter={moveChapter}
              chapterCode={chapterCode}
              item={item}/>
          )}
        </View>
      </View>
    )
  };

  return (
    <FlatList
      style={styles.flatList}
      contentContainerStyle={{alignItems: 'center'}}
      data={verseItems}
      keyExtractor={(item, index) => index.toString()}
      // ref={(ref) => {this.flatListRef = ref;}}
      renderItem={VerseItemContainer}
    />
  )
};

export default VerseFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '95%',
    height: '75%',
    top: 30,
    borderRadius: 5,
    backgroundColor: 'white',
    left: '2.5%',
    borderWidth: 1
  },

  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingTop: 13,
    paddingBottom: 13,
    paddingRight: 5,
    paddingLeft: 5,
    height: '15%',
  },

  headerLeftImageWrapper: {
    padding: 10,
  },

  headerLeftImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  headerText: {
    marginTop: 4,
    fontSize: 18,
    marginLeft: 5,
    fontWeight: 'bold'
  },

  headerRightImageWrapper: {
    padding: 5,
  },

  headerRightImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },

  memoNone: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: '85%'
  },

  memoNoneImage: {
    width: 70,
    height: 80,
    resizeMode: 'contain',
  },

  memoNoneText: {
    marginTop: 28,
    color: '#BDBDBD',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center'
  },


  memoItem: {
    marginLeft: 14,
    paddingTop: 18,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderColor: '#AEAEAE',
    flexDirection: 'row'
  },

  memoItemIndex: {
    fontWeight: 'bold',
  },

  memoItemContent: {
    marginLeft: 14,
    marginTop: 3,
    marginRight: 16,
  },

  memoItemContentVerseText: {
    fontSize: 12,
    color: '#828282',
  },

  memoItemContentMemo: {
    fontWeight: 'bold',
    marginTop: 7
  },

  memoItemContentDate: {
    fontSize: 12,
    color: '#828282',
    marginTop: 7
  },

  memoEditHeader: {
    paddingTop: 30,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 40,
    borderBottomWidth: 1,
    borderColor: '#AEAEAE'
  },

  memoEditVerseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  memoEditContent: {
    marginTop: 11
  },

  memoEditMemo: {
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',

  },

  memoEdit: {

  },
});

