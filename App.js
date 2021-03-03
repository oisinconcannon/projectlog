import * as React from 'react';
import { Text, TextInput, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyPicker } from './MyPicker';

function HomeScreen({ navigation, route }) {
  const [selectedName, setSelectedName] = React.useState('');
  const [selectedFlyFrom, setSelectedFlyFrom] = React.useState('');
  const [selectedFlyTo, setSelectedFlyTo] = React.useState('');

  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#d0d0ff' }}>
       <Image
          style={{ width: '80%', height: 200 }}
        />
        <Text style={{ margin: 10 }}>Welcome to My Project, My Name is Oisin Concannon
        and I have designed a useful app for fighters across all disciplines</Text>
        <Text style={{ margin: 10 }}>{selectedName}</Text>
        <Text style={{ margin: 10 }}>{selectedFlyFrom}</Text>
        <Text style={{ margin: 10 }}>{selectedFlyTo}</Text>
      </View>
      <Button
        title="Add Fighter"
        onPress={() => navigation.navigate('LoadData', { homeCallBack: passSelectedData })}
      />
    </View>
  );
}

function LoadDataScreen({ navigation, route }) {

  return (
    <View style={{ flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
      }}>
      <MyPicker callBackFunction = {route.params.homeCallBack} >
      </MyPicker>
      <Button
        title="Done (go back to home page)"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Home Screen"
          component={HomeScreen}
          options={{
            title: 'My home',
            headerStyle: {
              backgroundColor: '#696969',
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
            title: 'Load data from node/mongoDb',
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
