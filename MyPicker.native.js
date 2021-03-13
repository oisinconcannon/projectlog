import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Picker } from 'react-native';
// https://reactnative.dev/docs/modal#visible
// https://reactnative.dev/docs/picker
export const MyPicker = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedFlyTo, setSelectedFlyTo] = useState('');
  const [selectedFlyFrom, setSelectedFlyFrom] = useState('');
  const [whichSelection, setWhichSelection] = useState('');
  const [listItems, setListItems] = useState([]);

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
            <Text style={styles.modalText}>Select Item</Text>
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
                  if(whichSelection == 'flyFrom'){
                    props.callBackFunction(selectedItem, whichSelection);
                    setSelectedFlyFrom(selectedItem);
                  }
                  if(whichSelection == 'flyTo'){
                    props.callBackFunction(selectedItem, whichSelection);
                    setSelectedFlyTo(selectedItem);
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
            var listData = [];
            listData.push(<Picker.Item label="" value="" />);
            for(var ii = 0; ii < props.dataToLoad.names.length; ii++){
              listData.push(<Picker.Item label={props.dataToLoad.names[ii]} value={props.dataToLoad.names[ii]}  key={ii} />);
            }
            setListItems(listData);
            setModalVisible(true);
            setWhichSelection('name');
          }}>
          <Text style={styles.textStyle}>Select Name</Text>
        </TouchableHighlight>
        <Text style={styles.displayText}>{selectedName}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            var listData = [];
            listData.push(<Picker.Item label="" value="" />);
            for(var ii = 0; ii < props.dataToLoad.flyFrom.length; ii++){
              listData.push(<Picker.Item label={props.dataToLoad.flyFrom[ii]} value={props.dataToLoad.flyFrom[ii]}  key={ii} />);
            }
            setListItems(listData);
            setModalVisible(true);
            setWhichSelection('flyFrom');
          }}>
          <Text style={styles.textStyle}>Select From</Text>
        </TouchableHighlight>
        <Text style={styles.displayText}>{selectedFlyFrom}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            var listData = [];
            listData.push(<Picker.Item label="" value="" />);
            for(var ii = 0; ii < props.dataToLoad.flyTo.length; ii++){
              listData.push(<Picker.Item label={props.dataToLoad.flyTo[ii]} value={props.dataToLoad.flyTo[ii]} key={ii} />);
            }
            setListItems(listData);
            setModalVisible(true);
            setWhichSelection('flyTo');
          }}>
          <Text style={styles.textStyle}>Select Gym</Text>
        </TouchableHighlight>
        <Text style={styles.displayText}>{selectedFlyTo}</Text>
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
  displayText: {
    backgroundColor: '#2196F3',
    borderColor: '#408040',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: 125,
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 10,
    elevation: 2
  },
  openButton: {
    backgroundColor: '#40a040',
    borderWidth: 2,
    borderColor: '#408040',
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
