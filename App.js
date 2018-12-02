import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, TextInput, FlatList} from 'react-native';
import {createStackNavigator,  createAppContainer} from 'react-navigation';
import HomeScreen from './HomeScreen';
import Yhteystiedot from './Yhteystiedot';
import Kaupantuotto from './Kaupantuotto';
export default class App extends React.Component {
// myapp
  render() {
    
    return( <MyApp/>
      );
  }
}

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Yhteystiedot: {screen: Yhteystiedot},
  Kaupantuotto: {screen: Kaupantuotto}
});
const MyApp = createAppContainer(MainNavigator);
