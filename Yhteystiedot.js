import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, TextInput, FlatList} from 'react-native';

export default class Yhteystiedot extends React.Component {
    static navigationOptions = {title: 'Yhteystiedot'}
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <View>
                <Text style={styles.Text}>Otathan rohkeasti yhteyttä!</Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text>Sähköposti: autokauppa.autokauppa@gmail.com</Text>
                <Text>Puhelinnumero: 0501234567</Text>
                <Text>Osoite: Mannerheimintie 1000 </Text>
                <Text>000100 Helsinki</Text>
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
        fontSize: 30
    }
  });