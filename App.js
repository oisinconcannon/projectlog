import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  const [value, onChangeText] = React.useState('Opponent');
    const [value1, onChangeText1] = React.useState('Venue');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Add Fighter+"
        onPress={() => navigation.navigate('Add Fighter')}
      />
      <TextInput
     style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
     onChangeText={text => onChangeText(text)}
     value={value}
   />
   <TextInput
  style={{ height: 40, borderColor: 'gray', borderWidth: 1  }}
  onChangeText={text => onChangeText1(text)}
  value={value1}
/>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

      <Button
        title="Start"
        color='green'
        onPress={() => navigation.navigate('Options')}
      />

      <Button
        borderColor='#fff'
        title="Stats"
        color='yellow'
        onPress={() => navigation.navigate('Stats')}
      />
      </View>
    </View>

  );
}

function OptionsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Round1"
        onPress={() => navigation.navigate('Round 1')}
      />
    </View>
  );
}
function Round1Screen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Round 1</Text>

    </View>
  );
}
function AddFighter({ navigation }) {
  const [value, onChangeText] = React.useState('Name');
    const [value1, onChangeText1] = React.useState('From');
    const [value2, onChangeText2] = React.useState('Gym');
      const [value3, onChangeText3] = React.useState('Current Record');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Fighter Details</Text>
      
       <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
    <TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    onChangeText={text => onChangeText1(text)}
    value={value1}
    />
    <TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    onChangeText={text => onChangeText2(text)}
    value={value2}
    />
    <TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    onChangeText={text => onChangeText3(text)}
    value={value3}
    />
    </View>
  );
}
function StatsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Stats Screen</Text>
      <Button
        title="ViewStats"
        onPress={() => navigation.navigate('View Stats')}
      />
    </View>
  );
}
function ViewStats({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bout Details</Text>

    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Boxing Analyser" component={HomeScreen} />
        <Stack.Screen name="Options" component={OptionsScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
        <Stack.Screen name="Round 1" component={Round1Screen} />
         <Stack.Screen name="Add Fighter" component={AddFighter} />
          <Stack.Screen name="View Stats" component={ViewStats} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
