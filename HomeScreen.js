import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, AsyncStorage} from 'react-native';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('Carsdb.db');

export default class HomeScreen extends React.Component {
  static navigationOptions = {title: 'Carshop!'};
  constructor(props) {
    super(props);
    this.state = {
     brand: '', color: '', price: '', CarList: [], varallisuus: 0, nykyvarallisuus: 0
    }
  }

  componentDidMount() {
    db.transaction(tx => {
        tx.executeSql('create table if not exists car (id integer primary key not null, brand text, color text, price text);');
    });
   // db.transaction(tx => {
    //    tx.executeSql('create table if not exists tuotto (id integer primary key not null, varallisuus int);');
  //  });
    this.updateList();
   this.readData();
   this.setState({varallisuus: this.state.nykyvarallisuus});
   // this.updateVarat();

  }

 // saveVarat = () => {
   //   db.transaction(tx => {
     //     tx.executeSql('insert into tuotto (varallisuus) values (?)',
       //   this.state.varallisuus
        //  );
     // }, null)
 // }


  saveCar = () => {
      db.transaction(tx => {
          tx.executeSql('insert into car (brand, color, price) values (?, ?, ?)',
          [this.state.brand, this.state.color, this.state.price]);
      }, null, this.updateList , 
      this.setState({varallisuus: parseInt(this.state.varallisuus) + parseInt(this.state.price)}), 
      this.saveData()
      )
  }

 saveData = async() => {
     try {
          let vara = this.state.varallisuus;
          this.setState({nykyvarallisuus: vara})
          await AsyncStorage.setItem('vara', JSON.stringify(vara));
      } catch (error) {
          Alert.alert('error saving data');
      }
  }

  readData = async() => {
      try {
          let vara = await AsyncStorage.getItem('vara');
          this.setState({nykyvarallisuus: parseInt(vara)});
      } catch (error) {
          Alert.alert('error getting data');
      }
  }

  updateList = () => {
      db.transaction(tx => {
          tx.executeSql('select * from car', [], (_, {rows}) =>
          this.setState({CarList: rows._array})
          );
      });
  }

 // updateVarat = () => {
   // db.transaction(tx => {
     //   tx.executeSql('select * from tuotto', [], (_, {rows}) =>
       // this.setState({varallisuus: rows._array})
       // );
   // });
 // }

  sellCar = (id) => {
    db.transaction(
      tx => { tx.executeSql('delete from car where id = ?;', [id]);}, null, this.updateList)
        Alert.alert('Car sold!')
  }


  NaytaAuto = () => {
    Alert.alert(
        'Your car is now on sale',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      this.saveCar()
}




  render() {
    const {navigate} = this.props.navigation;

    return (
    <View>
        <Text style={styles.Text}>Add Car On Sale</Text> 

    <TextInput placeholder=' Merkki'
     style=
        {{
        width:200 ,
        borderColor: 'gray',
        borderWidth:1
        }} 
        onChangeText={(brand) => 
          this.setState({brand})} 
          value={this.state.brand}/>
    <TextInput placeholder=' Väri' 
    style=
        {{
        width:200 ,
        borderColor: 'gray',
        borderWidth:1
        }} 
    onChangeText={(color) => 
          this.setState({color})} 
          value={this.state.color}/>
    <TextInput keyboardType='numeric' placeholder=' Hinta'
     style=
         {{
         width:200 ,
         borderColor: 'gray',
         borderWidth:1}} onChangeText={(price) => 
          this.setState({price})} 
          value={this.state.price}/>
      <Button color="green" title="Save car to store" onPress={this.NaytaAuto}
        />
        <View style= {{width: 300, height: 300, backgroundColor: 'white', alignItems: 'center'}}>
        <Text>Cars in the shop</Text>
            <FlatList
            
            keyExtractor={item => item.id.toString()}
            data={this.state.CarList}
            renderItem={({item}) =>
         <View>
           <Text>Merkki: {item.brand}, Väri: {item.color},  Hinta: {item.price} </Text> 
           <Text style={{color: '#0000ff'}} onPress={() => this.sellCar(item.id)
            }>Sell</Text>
         </View>}
          />
      </View>
        <Button color="green" onPress={() => navigate('Yhteystiedot')} title="Yhteystiedot" />
        <Button onPress={() => navigate('Kaupantuotto', {varat: this.state.varallisuus})} title="Yrityksen myynnit"/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
      fontSize: 30,
    
  },
  Button: {
      
  }
});