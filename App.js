import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyPicker } from './MyPicker';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([ // https://reactnavigation.org/docs/troubleshooting/
  'Non-serializable values were found in the navigation state',
]);

function HomeScreen({ navigation, route }) {
  const [selectedName, setSelectedName] = React.useState('');
  const [selectedFlyFrom, setSelectedFlyFrom] = React.useState('');
  const [selectedFlyTo, setSelectedFlyTo] = React.useState('');
  const [dbData, setDbData] = React.useState('');

  useEffect(() => {
    fetch('http://192.168.1.53:8000/getAppNames/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then((response) => response.json())
    .then((json) => {
      if(json){
        setDbData(json);
      } else {
        setDbData({names: [""], flyFrom: [""], flyTo: [""]});
        alert("Bad data from backend server!");
    }
    })
    .catch((error) => {
      setDbData({names: [""], flyFrom: [""], flyTo: [""]});   // Code to check that we connected to server and, if not, create an empty array.
      alert("Can't connect to backend server!");
      console.error(error);
    });
  }, []);  // The empty array means this code only runs when the compnent is mounted

  const passSelectedData = (selectedData, dataType) => {
    if(dataType == 'name'){
      setSelectedName(selectedData);
    }
    if(dataType == 'flyFrom'){
      setSelectedFlyFrom(selectedData);
    }
    if(dataType == 'flyTo'){
      setSelectedFlyTo(selectedData);
    }
  };

  return (
    <View style={{ flex: 1,
                   alignItems: 'center',
                   justifyContent: 'center',
                   backgroundColor: '#778899',
                   paddingBottom: 50
                 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#778899' }}>
        <Image source={{uri: 'https://static01.nyt.com/images/2020/10/30/sports/30boxing01/merlin_166444809_30b6957a-ffec-4c5b-8b27-8659147ab2a7-superJumbo.jpg'}}
               style={{width: 400, height: 350}} />
        <Text style={{ margin: 10 ,color:'#fff',padding: 5,backgroundColor: '#778899',borderColor: '#fff', borderWidth: 2, borderRadius: 10}}>Boxing Analyser to allow users to monitor punch outputs. I have designed this app due to my interest in
        martial arts. I myself compete and find it very difficult to monitor output in sparring and bouts.</Text>
        <Text style={styles.displayText}>{selectedName}</Text>
        <Text style={styles.displayText}>{selectedFlyFrom}</Text>
        <Text style={styles.displayText}>{selectedFlyTo}</Text>
      </View>
      <View style={{ padding: 5, backgroundColor: '#32CD32', marginBottom: 40, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
        <Text onPress={() => navigation.navigate('LoadData', { show: true, homeCallBack: passSelectedData, theDbData: dbData })}>
          Select Fighter
        </Text>
      </View>
    </View>
  );
}

function LoadDataScreen({ navigation, route }) {
  if(route.params.show == false){
    return null;
  }

  return (
    <View style={{ flex: 1,
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: '#1e90ff',
                   paddingBottom: 50
                 }}>
      <MyPicker callBackFunction = {route.params.homeCallBack} dataToLoad = {route.params.theDbData} >
      </MyPicker>
      <View style={{ padding: 5, marginTop: 50, backgroundColor: '#c0c0c0', borderColor: '#6060ff', borderWidth: 2, borderRadius: 10, }} >
        <Text onPress={() => navigation.goBack()}>
          Done (back to Home screen)
        </Text>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'HomeScreen',
            headerStyle: {
              backgroundColor: '#708090',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="LoadData"
          component={LoadDataScreen}
          options={{
            title: 'Load server data',
            backgroundColor: '#1e90ff',
            headerStyle: {
              backgroundColor: '#000080',
              height: 50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  displayText: {
    backgroundColor: '#778899',
    borderColor: '#fff',
    color:'#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    width: 125,
    marginTop: 5,
    textAlign: 'left',
    marginLeft: 10,
    elevation: 2
  },
});
