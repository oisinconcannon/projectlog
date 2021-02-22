import * as React from 'react';
import { Button, View, Text, TextInput, Picker } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  const [value, onChangeText] = React.useState('Opponent');
    const [value1, onChangeText1] = React.useState('Venue');
    const [selectedValue, setSelectedValue] = React.useState("ryan");
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <View style={{flexDirection: 'row',padding:50, alignItems: 'center', justifyContent: 'space-between'}}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Devin Haney" value="devin" />
        <Picker.Item label="Ryan Garcia" value="ryan" />
        <Picker.Item label="Triple G" value="ggg" />
        <Picker.Item label="Canelo Alveres" value="canelo" />
        <Picker.Item label="Tank Davis" value="tank" />
      </Picker>
      <Button
        style={{ height: 50, width: 150,}}
        title="+"
        color='green'
        onPress={() => navigation.navigate('Add Fighter')}
      />
      </View>
        <View style={{padding:100, alignItems: 'center', justifyContent: 'center'}}>
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
        backgroun

        onPress={() => navigation.navigate('Stats')}
      />
      </View>
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
    <Button
      title="Add Fighter+"
      color='green'
      onPress={() => navigation.navigate('Boxing Analyser')}
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
