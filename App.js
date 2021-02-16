import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  UIManager,
  findNodeHandle,
  TouchableOpacity,
  Alert
} from 'react-native';
// import components
import DropDown from './DropDown';
import MyButton from './MyButton';

export default class App extends React.Component {

  state = {
    show: false,
    position: {}
  }

  // handle showing the dropdown
  showDropDown = () => {
    if (this.button) {
      // use the uimanager to measure the button's position in the window
      UIManager.measure(findNodeHandle(this.button), (x, y, width, height, pageX, pageY) => {
        const position = { left: pageX, top: pageY, width: width, height: height };
        // setState, which updates the props that are passed to the DropDown component
        this.setState({show: true, position: { x: pageX + (width / 2), y: pageY + (2 * height / 3) }})
      });
    }
  }

  // hide the dropdown
  hideDropDown = (item) => {
    alert(item)
    this.setState({show: false, position: {}})
  }

  render() {
    return (

      <View style={styles.container}>

        <Text style={styles.title}>Boxing Analyser</Text>

        <View style={{height: 100, width: 300, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>

            <MyButton
              ref={ref => {this.button = ref}}
              onPress={this.showDropDown}
              title={' Choose Fighter'}
            />
            <MyButton
              ref={ref => {this.button = ref}}
              onPress={this.showDropDown}
              title={'Choose Opponent'}
            />
            <MyButton
              ref={ref => {this.button = ref}}
              onPress={this.showDropDown}
              title={'Choose Venue'}
            />

          </View>

        <DropDown show={this.state.show} position={this.state.position} hide={this.hideDropDown}/>
       <View style={styles.buttonDirection}>
            <View style={styles.buttonStart}>
            <TouchableOpacity>
                <Text>Start</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonStats}>
              <TouchableOpacity>
                  <Text >Stats</Text>
                  </TouchableOpacity>
                </View>
             </View>
            </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'

  },
  buttonDirection: {
     flexDirection: 'row',
     padding: 10,
  },

  title: {
     padding: 20,
     fontSize: 50,
     fontWeight: 'bold'
  },

  buttonStart: {
   backgroundColor: "green",
   padding: 20,
   borderRadius: 5,
   borderColor: 'black',
   borderWidth: 1,

 },
 buttonStats: {
  backgroundColor: "yellow",
  padding: 20,
  borderRadius: 5,
  borderColor: 'black',
  borderWidth: 1,
},
  buttonText: {
   fontSize: 20,
   color: '#fff',
 },
 buttonTextStats: {
  fontSize: 20,
  color: '#000',
},
});
