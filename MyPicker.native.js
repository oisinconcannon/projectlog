import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Picker } from 'react-native';
// https://reactnative.dev/docs/modal#visible
// https://reactnative.dev/docs/picker
export const MyPicker = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedGym, setSelectedGym] = useState('');
  const [selectedFrom, setSelectedFrom] = useState('');
  const [whichSelection, setWhichSelection] = useState('');
  const [listItems, setListItems] = useState([
    <Picker.Item label="" value="" />,
    <Picker.Item label="John" value="John" />,
    <Picker.Item label="Joe" value="Joe" />,
    <Picker.Item label="Galway" value="Galway" />,
    <Picker.Item label="Dublin" value="Dublin" />,
    <Picker.Item label="BD Galway" value="BD Galway" />,
    <Picker.Item label="SBG Dublin" value="SBG Dublin" />
  ]);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Name</Text>
            <Picker
              style={{ height: 200, width: 250 }}
              selectedValue={selectedItem}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedItem(itemValue)
              }>
            {listItems}
            </Picker>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 25 }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3', margin: 5, width: 100 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3', margin: 5, width: 100 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  if(whichSelection == 'name'){
                    // https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
                    props.callBackFunction(selectedItem, whichSelection);
                    setSelectedName(selectedItem); // deferred until next re-render, so props callback runs first
                  }
                  if(whichSelection == 'from'){
                    props.callBackFunction(selectedItem, whichSelection);
                    setSelectedFrom(selectedItem);
                  }
                  if(whichSelection == 'gym'){
                    props.callBackFunction(selectedItem, whichSelection);
                    setSelectedGym(selectedItem);
                  }
                }}>
                <Text style={styles.textStyle}>OK</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
            setWhichSelection('name');
          }}>
          <Text style={styles.textStyle}>Select Name</Text>
        </TouchableHighlight>
        <Text style={{ ...styles.openButton, backgroundColor: '#e0e0e0', width: 125, textAlign: 'left', marginLeft: 10 }}>{selectedName}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
            setWhichSelection('from');
          }}>
          <Text style={styles.textStyle}>Select where your from</Text>
        </TouchableHighlight>
        <Text style={{ ...styles.openButton, backgroundColor: '#e0e0e0', width: 125, textAlign: 'left', marginLeft: 10 }}>{selectedFrom}</Text>
      </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
            setWhichSelection('gym');
          }}>
          <Text style={styles.textStyle}>Select gym</Text>
        </TouchableHighlight>
        <Text style={{  ...styles.openButton, backgroundColor: '#e0e0e0', width: 125, textAlign: 'left', marginLeft: 10 }}>{selectedGym}</Text>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    width: 125,
    marginTop: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
