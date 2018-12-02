import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Number} from 'react-native';

export default class Yhteystiedot extends React.Component {
    static navigationOptions = {title: 'Autojen arvo'}
    constructor(props) {
        super(props);
        this.state = {
        }
    }

   


    render() {
        const {params} = this.props.navigation.state;
        return(
            <View>
                <Text>Autojen arvo tällä hetkellä</Text>
                <Text>{params.varat}</Text>
            </View>
            
        );
    }

}