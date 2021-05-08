import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './Screens/HomeScreen/HomeScreen';
import { Round1Screen } from './Screens/Round1Screen/Round1Screen';
import { Round2Screen } from './Screens/Round2Screen/Round2Screen';
import { Round3Screen } from './Screens/Round3Screen/Round3Screen';
import { Round4Screen } from './Screens/Round4Screen/Round4Screen';
import { Round5Screen } from './Screens/Round5Screen/Round5Screen';
import { AboutScreen } from './Screens/AboutScreen/AboutScreen';
import { LoadDataScreen } from './Screens/LoadDataScreen/LoadDataScreen';
import { DetailsScreen } from './Screens/DetailsScreen/DetailsScreen';
import { ChartTheData } from './Screens/ChartScreen/ChartTheData';
import { YellowBox } from 'react-native';


YellowBox.ignoreWarnings([ // https://reactnavigation.org/docs/troubleshooting/
  'Non-serializable values were found in the navigation state',
]);

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
            title: 'Create Fighter',
            backgroundColor: '#1e90ff',
            headerStyle: {
              backgroundColor: '#778899',
              height: 50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="Round1"
          component={Round1Screen}
          options={{
            title: 'Round 1',
            backgroundColor: '#1e90ff',
            headerStyle: {
              backgroundColor: '#778899',
              height: 50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="Round2"
          component={Round2Screen}
          options={{
            title: 'Round 2',
            backgroundColor: '#1e90ff',
            headerStyle: {
              backgroundColor: '#778899',
              height: 50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="Round3"
          component={Round3Screen}
          options={{
            title: 'Round 3',
            backgroundColor: '#1e90ff',
            headerStyle: {
              backgroundColor: '#778899',
              height: 50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="Round4"
          component={Round4Screen}
          options={{
            title: 'Round 4',
            backgroundColor: '#1e90ff',
            headerStyle: {
              backgroundColor: '#778899',
              height: 50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="Round5"
          component={Round5Screen}
          options={{
            title: 'Round 5',
            backgroundColor: '#1e90ff',
            headerStyle: {
              backgroundColor: '#778899',
              height: 50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="ChartTheData"
          component={ChartTheData}
          options={{
            title: 'Chart',
            backgroundColor: '#778899',
            headerStyle: {
              backgroundColor: '#778899',
              height: 50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Details',
            backgroundColor: '#1e90ff',
            headerStyle: {
              backgroundColor: '#778899',
              height: 50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            title: 'About',
            backgroundColor: '#1e90ff',
            headerStyle: {
              backgroundColor: '#778899',
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
  fab: {
    position: 'absolute',
    margin: 16,
    backgroundColor:'#D3D3D3',
    left:"2%",
    bottom: "0%",
  },
  fab1: {
    position: 'absolute',
    backgroundColor:'#D3D3D3',
    margin: 16,
    left:'26%',
    bottom: "0%",
  },
  fab2: {
    position: 'absolute',
    backgroundColor:'#D3D3D3',
    margin: 16,
    right:"26%",
    bottom: "0%",
  },
  fab3: {
    position: 'absolute',
    backgroundColor:'#D3D3D3',
    margin: 16,
    right:'2%',
    bottom: "0%",
  },
  icons: {
   alignItems: "center",
   justifyContent:"flex-end",
   padding: 20
 },
 icontext: {
  color:'#fff'
},
centeredView: {
  //flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22,
},


});
