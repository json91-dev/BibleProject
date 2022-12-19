import React from 'react'
import {StyleSheet, Text} from 'react-native';

const HighlightText = ({item, verseItemFontSize, verseItemFontFamily}) => {
  if (item.isHighlight) {
    return (
      <Text style={[styles.flatListItemTextHighlight, {fontSize: verseItemFontSize, fontFamily: verseItemFontFamily}]}>{item.content}</Text>
    )
  } else {
    return (
      <Text style={[styles.flatListItemText, {fontSize: verseItemFontSize, fontFamily: verseItemFontFamily},]}>{item.content}</Text>
    )
  }
};

export default HighlightText

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
