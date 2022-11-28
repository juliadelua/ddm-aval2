import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, FlatList, TextInput, Pressable, ActivityIndicator } from 'react-native';
 
import { api20 as api } from '../src/services/api';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
        };
    
        this.getFilme = this.getFilme.bind(this);
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

    getFilme() {

    }
    
    render() {
        const { data } = this.state;
        return(
            <View style={styles.container}>
            <Text style={styles.title}>App de Filmes</Text>
            {data.map((filme) => (
                <Item data={filme} />
            ))}    
            </View>
        )
    }
}

class Item extends Component {
    render() {
        const filme = this.props.data;
        return(
            <View key={filme.id.toString()} style={{ display: 'flex', flexDirection: 'column', margin: 'auto', paddingBottom: 30 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 10 }}>{filme.nome}</Text>
                    <Pressable onPress={this.getFilme}>
                        <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 13, textAlign: 'right' }}>Leia mais</Text>
                    </Pressable>
                </View>
                <Image 
                    source={filme.foto}
                    style={{height: 100, width: 300, margin: 'auto'}}
                />
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
  }
});