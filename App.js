import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Button, Image, StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyPicker } from './MyPicker';
import { MyChart } from './MyChart';
import { YellowBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

YellowBox.ignoreWarnings([ // https://reactnavigation.org/docs/troubleshooting/
  'Non-serializable values were found in the navigation state',
]);


function HomeScreen({ navigation, route }) {
  const [selectedName, setSelectedName] = React.useState(' ');
  const [selectedFlyFrom, setSelectedFlyFrom] = React.useState(' ');
  const [selectedFlyTo, setSelectedFlyTo] = React.useState(' ');
  const [name, setName] = React.useState(' ');
  const [address, setAddress] = React.useState(' ');
  const [gym, setGym] = React.useState(' ');
  const [opponent, setOpponent] = React.useState(' ');
  const [dbData, setDbData] = React.useState('');



  useEffect(() => {
    fetch('http://192.168.1.53:8000/getAppNames', {
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
        console.log(dbData);
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
      setName(selectedData);
    }
    if(dataType == 'flyFrom'){
      setSelectedFlyFrom(selectedData);
    }
    if(dataType == 'flyTo'){
      setSelectedFlyTo(selectedData);
    }
    if(dataType == 'address'){
      setAddress(selectedData);
    }
    if(dataType == 'gym'){
      setGym(selectedData);
    }
    if(dataType == 'opponent'){
      setOpponent(selectedData);
    }


  };

  let fightData = {
          name: name,
          address: address,
          gymName: gym,
          opponentName: opponent,
          dateTime: selectedName+"-"+selectedFlyFrom+"-"+selectedFlyTo,
          punchInfo: [45, 32, 32, 25, 20]
  }
//  console.log(route.params.paramKey);
  return (
    <ScrollView style={{ flex: 1,
                   backgroundColor: '#778899',
                   paddingBottom: 50
                 }}>
    <View style={{ flex: 1,
                   alignItems: 'center',
                   justifyContent: 'center',
                   backgroundColor: '#778899',
                   paddingBottom: 50
                 }}>

                 <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#778899' }}>
      <Text style ={{fontSize:40, color:'#fff',margin:10}}>
        Boxing Analyser
      </Text>

        <Image source={require('./box4.jpg')}
               style={{width: 550, height: 350}} />
        <Text style={{ margin: 10 ,color:'#fff',padding: 5,backgroundColor: '#778899',borderColor: '#fff', borderWidth: 2, borderRadius: 10}}>Monitor your punch Output using the Boxing Analyser</Text>

      </View>

        <View style={{flexDirection:'row'}}>
      <View style={{ padding: 5, backgroundColor: '#32CD32', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
        <Text style ={{fontSize:20}} onPress={() => navigation.navigate('LoadData', { show: true, homeCallBack: passSelectedData, theDbData: dbData })}>
          Select Fighter
        </Text>
      </View>


      <View style={{ padding: 5, backgroundColor: '#ffff00', marginBottom: 10, marginTop: 10, marginLeft: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
    <Text style ={{fontSize:20}} onPress={() => navigation.navigate('Details', { show: true, homeCallBack: passSelectedData, theDbData: dbData })}>
    Search Bouts
    </Text>
    </View>
      </View>

</View>
<View style={{alignItems:'center'}}>
<View style={{flexDirection:'row', padding:5}}>
<TouchableOpacity
style={styles.icons}
onPress={navigation.navigate('Home')}>
<Icon
name="home"
size={60}
color="white"
/>
<Text style={styles.icontext}>
Home</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.icons}
onPress={() => navigation.navigate('LoadData', { show: true, homeCallBack: passSelectedData, theDbData: dbData })}>
<Icon
name="play"
size={60}
color="white"
/>
<Text style={styles.icontext}>
Start</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.icons}
onPress={() => navigation.navigate('Details')}>
<Icon
name="signal"
size={60}
color="white"
/>
<Text style={styles.icontext}>
Stats</Text>
</TouchableOpacity>
<TouchableOpacity
style={styles.icons}
onPress={() => navigation.navigate('Details')}>
<Icon
name="info"
size={60}
color="white"
/>
<Text style={styles.icontext}>
About</Text>
</TouchableOpacity>
</View>
</View>
    </ScrollView>


  );
}

function LoadDataScreen({ navigation, route }) {
const [name, setName] = React.useState('');
const [address, setAddress] = React.useState('');
const [gym, setGym] = React.useState('');
const [opponent, setOpponent] = React.useState('');
const [selectedName, setSelectedName] = React.useState(' ');
const [selectedFlyFrom, setSelectedFlyFrom] = React.useState(' ');
const [selectedFlyTo, setSelectedFlyTo] = React.useState(' ');

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
let fightData = {
        name: name,
        address: address,
        gymName: gym,
        opponentName: opponent,
        dateTime: selectedName+"-"+selectedFlyFrom+"-"+selectedFlyTo,
        punchInfo: [45, 32, 32, 25, 20]
}
  if(route.params.show == false){
    return null;
  }

  return (
    <View style={{ flex: 1,
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: '#778899',
                   paddingBottom: 50
                 }}>



      <View style={{ padding: 5, backgroundColor: '#778899', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
      <TextInput
       placeholder="Enter Name"
       onChangeText={setName}
       value={name}
      />
      </View>
      <View style={{ padding: 5, backgroundColor: '#778899', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
      <TextInput
       placeholder="Enter Hometown"
       onChangeText={setAddress}
       value={address}
     />
     </View>
     <View style={{ padding: 5, backgroundColor: '#778899', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
     <TextInput
      placeholder="Enter Name of Gym"
      onChangeText={setGym}
      value={gym}
    />
    </View>
    <View style={{ padding: 5, backgroundColor: '#778899', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
    <TextInput
     placeholder="Enter Opponent Name"
     onChangeText={setOpponent}
     value={opponent}
   />
   </View>

    <MyPicker callBackFunction = {passSelectedData} dataToLoad = {route.params.theDbData} >
    </MyPicker>

    <View style={{ padding: 5, backgroundColor: '#1E90FF', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
  <Text style ={{fontSize:20}}onPress={() => navigation.navigate('Round1',{paramKey:name,userDetails:fightData})}>
    Start Round
  </Text>
  </View>
    </View>
  );
}

function Round1Screen({ navigation, route }) {
  const [fightData, setFightData] = React.useState(route.params.userDetails);
  const [name, setName] = React.useState(route.params.paramKey);
  const [round1, setRound1] = React.useState(null);

var tempPunch=[];
  return (
    <View style={{ flex: 1,
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: '#778899',
                   paddingBottom: 50
                 }}>
                   <View style={{ padding: 5, backgroundColor: '#32CD32', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
                 <Text style ={{fontSize:20}} onPress={() => alert("Round Started")}>
                 Start Round
                 </Text>

                 </View>



                 <View style={{ padding: 5, backgroundColor: '#DC143C', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
               <Text style ={{fontSize:20}} onPress={() => {
                 fetch('http://192.168.1.53:8000/getPunchs/', {
                   method: 'POST',
                   headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify()
                 })
                 .then((response) => response.json())
                 .then((json) => {
                   console.log(json.punch);
                   setRound1(json.punch);

                 })
                 .catch((error) => {
                   console.error(error);
                 });
               }}>
               Stop Round
               </Text>
               </View>
      <View style={{ padding: 5, backgroundColor: '#1E90FF', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
        <Text style={{fontSize:20}} onPress={() => navigation.navigate('Round2', {paramName:name, round1: round1,userDetails:fightData})}>
        Next Round
        </Text>
      </View>
        <Text>{this}</Text>
    </View>
  );
}
function Round2Screen({ navigation, route }) {

const [fightData, setFightData] = React.useState(route.params.userDetails);
  const [name, setName] = React.useState(route.params.paramKey);
  const [round1, setRound1] = React.useState(route.params.round1);
  const [round2, setRound2] = React.useState(null);
  return (
    <View style={{ flex: 1,
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: '#778899',
                   paddingBottom: 50
                 }}>
                   <View style={{ padding: 5, backgroundColor: '#32CD32', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
                 <Text style ={{fontSize:20}} onPress={() => alert("Round Started")}>
                 Start Round
                 </Text>
                 </View>

                 <View style={{ padding: 5, backgroundColor: '#DC143C', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
               <Text style ={{fontSize:20}} onPress={() => {
                 fetch('http://192.168.1.53:8000/getPunchs/', {
                   method: 'POST',
                   headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify()
                 })
                 .then((response) => response.json())
                 .then((json) => {
                   console.log(json.punch);
                   setRound2(json.punch);

                 })
                 .catch((error) => {
                   console.error(error);
                 });
               }}>
               Stop Round
               </Text>
               </View>
      <View style={{ padding: 5, backgroundColor: '#1E90FF', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
        <Text style={{fontSize:20}} onPress={() => navigation.navigate('Round3', {paramName:name, round1: round1,round2: round2,userDetails:fightData})}>
        Next Round
        </Text>
      </View>
    </View>
  );
}
function Round3Screen({ navigation, route }) {

const [fightData, setFightData] = React.useState(route.params.userDetails);
  const [name, setName] = React.useState(route.params.paramKey);
  const [round1, setRound1] = React.useState(route.params.round1);
  const [round2, setRound2] = React.useState(route.params.round2);
  const [round3, setRound3] = React.useState(null);
  return (
    <View style={{ flex: 1,
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: '#778899',
                   paddingBottom: 50
                 }}>
                   <View style={{ padding: 5, backgroundColor: '#32CD32', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
                 <Text style ={{fontSize:20}} onPress={() => alert("Round Started")}>
                 Start Round
                 </Text>
                 </View>

                 <View style={{ padding: 5, backgroundColor: '#DC143C', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
               <Text style ={{fontSize:20}} onPress={() => {
                 fetch('http://192.168.1.53:8000/getPunchs/', {
                   method: 'POST',
                   headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify()
                 })
                 .then((response) => response.json())
                 .then((json) => {
                   console.log(json.punch);
                   setRound3(json.punch);

                 })
                 .catch((error) => {
                   console.error(error);
                 });
               }}>
               Stop Round
               </Text>
               </View>
      <View style={{ padding: 5, backgroundColor: '#1E90FF', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
        <Text style={{fontSize:20}} onPress={() => navigation.navigate('Round4',{paramName:name, round1: round1,round2: round2,round3:round3,userDetails:fightData})}>
        Next Round
        </Text>
      </View>
    </View>
  );
}
function Round4Screen({ navigation, route }) {

const [fightData, setFightData] = React.useState(route.params.userDetails);
    const [name, setName] = React.useState(route.params.paramKey);
    const [round1, setRound1] = React.useState(route.params.round1);
    const [round2, setRound2] = React.useState(route.params.round2);
    const [round3, setRound3] = React.useState(route.params.round3);
    const [round4, setRound4] = React.useState(null);
  return (
    <View style={{ flex: 1,
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: '#778899',
                   paddingBottom: 50
                 }}>
                   <View style={{ padding: 5, backgroundColor: '#32CD32', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
                 <Text style ={{fontSize:20}} onPress={() => alert("Round Started")}>
                 Start Round
                 </Text>
                 </View>

                 <View style={{ padding: 5, backgroundColor: '#DC143C', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
               <Text style ={{fontSize:20}} onPress={() => {
                 fetch('http://192.168.1.53:8000/getPunchs/', {
                   method: 'POST',
                   headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify()
                 })
                 .then((response) => response.json())
                 .then((json) => {
                   console.log(json.punch);
                   setRound4(json.punch);

                 })
                 .catch((error) => {
                   console.error(error);
                 });
               }}>
               Stop Round
               </Text>
               </View>
      <View style={{ padding: 5, backgroundColor: '#1E90FF', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
        <Text style={{fontSize:20}} onPress={() => navigation.navigate('Round5',{paramName:name, round1: round1,round2: round2,round3:round3,round4:round4,userDetails:fightData})}>
        Next Round
        </Text>
      </View>
    </View>
  );
}
function Round5Screen({ navigation, route }) {
  //const [fightData, setFightData] = React.useState(route.params.userDetails);
  const [name, setName] = React.useState(route.params.paramName);
  const [round1, setRound1] = React.useState(route.params.round1);
  const [round2, setRound2] = React.useState(route.params.round2);
  const [round3, setRound3] = React.useState(route.params.round3);
  const [round4, setRound4] = React.useState(route.params.round4);
  const [round5, setRound5] = React.useState(null);
  const [dbData, setDbData] = React.useState('');
  const [chartData, setChartData] = React.useState([route.params.round1,route.params.round2,route.params.round3,route.params.round4,round5]);
  let fightData = {
          name: route.params.userDetails.name,
          address: route.params.userDetails.address,
          gymName: route.params.userDetails.gymName,
          opponentName: route.params.userDetails.opponentName,
          dateTime: route.params.userDetails.dateTime,
          punchInfo: [route.params.round1,route.params.round2,route.params.round3,route.params.round4,round5]
  }
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
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: '#778899',
                   paddingBottom: 50
                 }}>
                   <View style={{ padding: 5, backgroundColor: '#32CD32', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
                 <Text style ={{fontSize:20}} onPress={() => alert("Round Started")}>
                 Start Round
                 </Text>
                 </View>

                 <View style={{ padding: 5, backgroundColor: '#DC143C', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
               <Text style ={{fontSize:20}} onPress={() => {
                 fetch('http://192.168.1.53:8000/getPunchs/', {
                   method: 'POST',
                   headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify()
                 })
                 .then((response) => response.json())
                 .then((json) => {
                   console.log(json.punch);
                   setRound5(json.punch);
                   setChartData([route.params.round1,route.params.round2,route.params.round3,route.params.round4,json.punch])
                   console.log(chartData);
                 })
                 .catch((error) => {
                   console.error(error);
                 });
               }}>
               Stop Round
               </Text>
               </View>
      <View style={{ padding: 5, backgroundColor: '#1E90FF', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
        <Text style={{fontSize:20}} onPress={() => {navigation.navigate('ChartTheData',{paramName:name, paramKey:chartData,userDetails:chartData});
        fetch('http://192.168.1.53:8000/savePostTextToMongo/', {
           method: 'POST',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(fightData)
         });}}>
        View Stats
        </Text>
      </View>

    </View>
  );
}
function DetailsScreen({ navigation, route }) {
  const [dbDataGet, setDbDataGet] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [chartData, setChartData] = React.useState('');




  return (
    <View style={{ flex: 1,
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: '#778899',
                   paddingBottom: 50
                 }}>
                 <View style={{ padding: 5, backgroundColor: '#fff', marginBottom: 10, marginTop: 10, borderColor: '#778899', borderWidth: 2, borderRadius: 10, }} >

                 <TextInput
                  placeholder="Enter Name of Fighter"
                  onChangeText={search => setSearch(search)}
                  value={search}
                />
                </View>
                   <View style={{ padding: 5, backgroundColor: '#FF8C00', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
                 <Text style ={{fontSize:20}} onPress={() => {
                   fetch('http://192.168.1.53:8000/getAppPosts/', {
                     method: 'POST',
                     headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({search})
                 })
                 .then((response) => response.json())
                 .then((json) => {
                   console.log(json.posts[0].punchInfo);
                  // var i =json.posts.length -1;
                  setChartData(json.posts[0].punchInfo);
                  // setResults(json.posts[0].opponentName]);
                  // setChartData(json.posts[0].punchInfo);
                   console.log(json.posts.length);


                  // setResults(tempArray);
                  // console.log(results);

                 })
                 .catch((error) => {
                   console.error(error);
                 });
                 navigation.navigate('ChartTheData',{ userDetails:chartData});
               }}>
                 Pull Database Details
                 </Text>

                 </View>
                 <View style={{ padding: 5, backgroundColor: '#32CD32', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
                   <Text style ={{fontSize:20}} onPress={() =>{
                   fetch('http://192.168.1.53:8000/getAppPosts/', {
                     method: 'POST',
                     headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({search})
                 })
                 .then((response) => response.json())
                 .then((json) => {
                   console.log(json.posts[0].punchInfo);
                  // var i =json.posts.length -1;
                  setChartData(json.posts[0].punchInfo);
                  // setResults(json.posts[0].opponentName]);
                  // setChartData(json.posts[0].punchInfo);
                   console.log(json.posts.length);


                  // setResults(tempArray);
                  // console.log(results);

                 })
                 .catch((error) => {
                   console.error(error);
                 });
                 navigation.navigate('ChartTheData',{ userDetails:chartData});
               }
             }>
                     View The Charts
                     </Text>
                     </View>


    </View>
  );
}
function ChartTheData({ navigation, route }) {
//  if(route.params.show == false){
  //  return null;
  //}


const [chartData, setChartData] = React.useState(route.params.userDetails);
console.log(chartData);
console.log(route.params.userDetails);
  let lineData = {interpolation: 'T', data: chartData,
                  nativeData: {
                    labels: ["Round1", "Round2", "Round3", "Round4", "Round5"],
                    datasets: [
                    {
                      data: [
                        chartData[0],
                        chartData[1],
                        chartData[2],
                        chartData[3],
                        chartData[4]
                      ]
                    }
                  ]
                }
  };
  return (
    <View style={{ flex: 1,
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: '#778899',
                   paddingBottom: 50
                 }}>
      <View style={{ backgroundColor: '#ffffff', borderColor: '#000000', borderWidth: 2, padding: 2 }} >
        <MyChart dataToChart = {lineData} > </MyChart>
      </View>
      <View style={{ padding: 5, backgroundColor: '#32CD32', marginBottom: 10, marginTop: 10, borderColor: '#fff', borderWidth: 2, borderRadius: 10, }} >
        <Text style ={{fontSize:20}} onPress={() => navigation.navigate('Home')}>
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
  icons: {
   alignItems: "center",
   justifyContent:"flex-end",
   padding: 20
 },
 icontext: {
  color:'#fff'
}
});
