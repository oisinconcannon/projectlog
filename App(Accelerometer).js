import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';

var theCounter = 0;
var isRunning = false;
var accelDataArray = [];

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const startAccel = () => {
    Accelerometer.addListener(accelerometerData => {
//      if((accelDataArray.length % 100) == 0){
        setData(accelerometerData);
  //    }
      accelDataArray.push(accelerometerData);
      if(accelDataArray.length > 60){ // About a second of data
        sendAndReceiveJson();
        accelDataArray = [];
      }
    });
    isRunning = true;
  }

  const slow = () => {
    Accelerometer.setUpdateInterval(1000);
    if(isRunning == false){
      startAccel();
    }
  }

  const fast = () => {
    Accelerometer.setUpdateInterval(500);
    if(isRunning == false){
      startAccel();
    }
  }

  const sendAndReceiveJson = () => {
    fetch('http://54.234.192.79:8000/fetchPostExamaple/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({firstParam: 'accelDataArray.length every 60 secs approx: ' + accelDataArray.length, secondParam: accelDataArray})
    });
  }

  const { x, y, z } = data;

  return (
    <View>
      <Text style={styles.text}></Text>
      <Text style={styles.text}>Accelerometer: (in m/s^2)</Text>
      <Text style={styles.text}>
        x: {round(x)} accelDataArray.length {accelDataArray.length}
      </Text>
      <Text style={styles.text}>
        y: {round(y)}
      </Text>
      <Text style={styles.text}>
        z: {round(z)}
      </Text>
      <View>
        <Button
          onPress={slow}
          color="#f000ff"
          title="Slow, update every 1000 ms"
        />
        <Button
          onPress={fast}
          color="#f000ff"
          title="Fast, update every 500 ms"
        />
        <Button
          onPress={sendAndReceiveJson}
          color="#f000ff"
          title="Send/Receive JSON to/from Node.js"
        />
      </View>
    </View>
  );
}

function round(x) { return x*10 }

const styles = StyleSheet.create({
  text: {
    color: '#202020',
    fontSize: 24,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: '#404040',
    fontSize: 24,
    padding: 20,
  },
});
