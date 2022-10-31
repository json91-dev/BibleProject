import React from 'react';
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CommandModal = (props) => {
  const { modalBibleItem, setModalVisible, actionModalCommand, openBibleNoteOptionModal } = modalBibleItem;
  const { isHighlight, isMemo } = modalBibleItem

  return (
    <Modal
      style={styles.modal}
      transparent={true}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        this.setModalVisible(false);
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>{this.state.modalBibleItem.bookName} {this.state.modalBibleItem.chapterCode}장 {this.state.modalBibleItem.verseCode}절</Text>
          <View style={styles.modalViewItems}>
            <!-- Copy 버튼 -->
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => {
                this.setModalVisible(false, 'copy');
              }}>
              <Image style={[styles.modalItemImage, {marginRight: 2}]} source={require('/assets/ic_copy.png')}/>
              <Text style={styles.modalItemText}>복사</Text>
            </TouchableOpacity>

            <!-- Highlight 버튼 -->
            {isHighlight ? (
              <TouchableOpacity
                style={styles.highlightButtonChecked}
                onPress={() => {
                  this.setModalVisible(false, 'highlight');
                }}>
                <Image style={styles.modalItemImage} source={require('/assets/ic_color_pen.png')}/>
                <Text style={styles.modalItemText}>형광펜</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.highlightButton}
                onPress={() => {
                  this.setModalVisible(false, 'highlight');
                }}>
                <Image style={styles.modalItemImage} source={require('/assets/ic_color_pen.png')}/>
                <Text style={styles.modalItemText}>형광펜</Text>
              </TouchableOpacity>
            )}

            <!-- 메모 버튼 -->
            {isMemo ? (
              <TouchableOpacity
                style={styles.memoButtonChecked}
                onPress={openBibleNoteOptionModal}>
                <Image style={[styles.modalItemImage, {marginLeft: 3}]} source={require('/assets/ic_memo.png')}/>
                <Text style={styles.modalItemText}>메모</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.memoButton}
                onPress={() => {
                  setModalVisible(false)
                  actionModalCommand('memo')
                }}>
                <Image style={[styles.modalItemImage, {marginLeft: 3}]} source={require('/assets/ic_memo.png')}/>
                <Text style={styles.modalItemText}>메모</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.modalCancel}
            onPress={() => {
              this.setModalVisible(false);
            }}>
            <Text style={styles.modalItemText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default CommandModal;


const styles = StyleSheet.create({
  highlightButtonChecked: {
    backgroundColor: '#F9DA4F',
    paddingLeft: 11,
    paddingRight: 11,
    paddingTop: 9,
    paddingBottom: 7,
    borderRadius: 20,
  },

  highlightButton: {
    paddingLeft: 11,
    paddingRight: 11,
    paddingTop: 9,
    paddingBottom: 7,
    borderRadius: 20,
  },

  modalContainer: {
    // backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalView: {
    width: 250,
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },

  modalHeader: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10
  },

  modalViewItems: {
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 25
  },

  modalItemText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },

  modalItemImage: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
  },

  modalCancel: {
    width: '100%',
    height: 50,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

});

