import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, FlatList, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { api20 as api } from '../src/services/api';

const Stack = createStackNavigator();

export default class App20 extends Component {
    render() {
        return(
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Lista" component={List} />
                <Stack.Screen name="Filme" component={Film} />
              </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
        };

        this.getFilme = this.getFilme.bind(this);
    }

    getFilme(filme) {
        this.props.navigation.navigate('Filme', filme)
    }
    
    async componentDidMount(){
        try {
            const response = await api.get('/');
            this.setState({
                data: response.data
            });
        } catch(error) {
            console.log(error)
            this.setState({
                data: []
            });
            alert('Erro! Tente de novo.')
        }
    }
    
    render() {
        const { data } = this.state;
        return(
            <View style={styles.container}>
            <Text style={styles.title}>App de Filmes</Text>
            {data.map((filme) => (
                <View key={filme.id.toString()} style={{ display: 'flex', flexDirection: 'column', margin: 'auto', paddingBottom: 30 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={styles.nomeFilme}>{filme.nome}</Text>
                        <Pressable onPress={() => this.getFilme(filme)}>
                            <Text style={styles.more}>Leia mais ►</Text>
                        </Pressable>
                    </View>
                    <Image 
                        source={filme.foto}
                        style={{height: 100, width: 300, margin: 'auto'}}
                    />
                </View>
            ))}    
            </View>

        )
    }
}

class Film extends Component {
    render() {
        const filme = this.props.route.params;
        return(
            <View style={styles.container}>
                <Text style={styles.title}>App de Filmes</Text>
                <Text style={styles.subtitle}>{filme.nome} - Sinopse</Text>
                <View style={styles.desc}>
                    <Text>{filme.sinopse}</Text>
                </View>
                <Pressable onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.back}>◄ Voltar</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column'
    },
    title:{
        margin: 'auto',
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingBottom: 10,
    },
    subtitle: {
        margin: 'auto',
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 20,
    },
    nomeFilme: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 10,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: '75%',
    },
    more: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'right'
    },
    back: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'left',
        marginTop: 30,
        marginLeft: 20
    },
    desc:{
        margin: 20,
        padding: 15,
        border: '1px solid green',
    }
});