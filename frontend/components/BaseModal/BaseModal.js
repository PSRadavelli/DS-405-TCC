import React from 'react'
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '70%',
    height: '35%',
    justifyContent: 'center'
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    elevation: 2,
    marginTop: 10
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textTitle: {
    fontSize: 20
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16
  }
})

export const BaseModal = ({
  title,
  text,
  isModalVisible,
  closeModal,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => { closeModal() }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.modalText, styles.textTitle]}>{title}</Text>
          <Text style={styles.modalText}>{text}</Text>
          {/* <Text style={styles.modalText}>automática da porta</Text> */}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => { closeModal() }}
          >
            <Text style={styles.textStyle}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
