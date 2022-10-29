import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

const LongClickModal = (props) => {
  const { modalBibleItem, setModalVisible, actionModalCommand } = modalBibleItem;
  const { isHighlight, isMemo } = modalBibleItem



  // return (
  //   isHighlight ? (
  //     <TouchableOpacity
  //       style={styles.highlightButtonChecked}
  //       onPress={() => {
  //         this.setModalVisible(false, 'highlight');
  //       }}>
  //       <Image style={styles.modalItemImage} source={require('/assets/ic_color_pen.png')}/>
  //       <Text style={styles.modalItemText}>형광펜</Text>
  //     </TouchableOpacity>
  //   ) : (
  //     <TouchableOpacity
  //       style={styles.highlightButton}
  //       onPress={() => {
  //         this.setModalVisible(false, 'highlight');
  //       }}>
  //       <Image style={styles.modalItemImage} source={require('/assets/ic_color_pen.png')}/>
  //       <Text style={styles.modalItemText}>형광펜</Text>
  //     </TouchableOpacity>
  //   )
  // )
}

export default LongClickModal;


const styles = StyleSheet.create({
  highlightButtonChecked: {
    backgroundColor: '#F9DA4F',
    paddingLeft: 11,
    paddingRight: 11,
    paddingTop: 9,
    paddingBottom: 7,
    borderRadius: 20,
  },

  modalItemImage: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
  },

  modalItemText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },

  highlightButton: {
    paddingLeft: 11,
    paddingRight: 11,
    paddingTop: 9,
    paddingBottom: 7,
    borderRadius: 20,
  },
});

