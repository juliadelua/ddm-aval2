import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, FlatList, TextInput, Pressable, ActivityIndicator } from 'react-native';
 
import { api18 as api } from '../src/services/api';

export default class App18 extends Component { //EXERCICIO 18
constructor(props){
    super(props);
    this.state = {
    data: [],
    user: '',
    loading: false,
    };

    this.getUser = this.getUser.bind(this);
}

async getUser(){
    this.setState({ loading: true })
    try {
        const response = await api.get('/' + this.state.user);
        console.log(response.data)
        this.setState({
            data: response.data,
            loading: false
        });
    } catch(error) {
        console.log(error)
        this.setState({
            data: [],
            user: '',
            loading: false
        });
        alert('Erro! Tente de novo.')
    }
}

render() {
    const { data, user, loading } = this.state;
    return(
        <View style={styles.container}>
        <Text style={styles.title}>Perfil de Devs</Text>
        {loading &&
            <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
                <ActivityIndicator color="black" size={40}/>
            </View>
        }
        {!loading &&
        <React.Fragment>
            <Image
                source={data.avatar_url || 'https://community-assets.home-assistant.io/original/3X/c/a/ca8e8de2f60a0fd9128d9b5486accfb2cffd7d08.png'}
                style={{height: 100, width: 100, margin: 'auto'}}
            />
            <View style={{ display: 'flex', flexDirection: 'row', height: 20, margin: 'auto', paddingTop: 30 }}>
                <TextInput
                    placeholder="Digite o login git"
                    value={user}
                    onChangeText={(value) => this.setState({ user: value })}
                    style={{ marginBottom: 20, borderBottom: '1px solid', marginLeft: 20, marginRight: 20, padding: 10 }}
                />
            <Pressable style={{width: 40, height: 30, borderRadius: 5, backgroundColor: 'green'}} onPress={this.getUser}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>✔</Text>
            </Pressable>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20, marginTop: 20, paddingTop: 30 }}>
                <Text><b>ID:</b> {data.id}</Text>
                <Text><b>Nome:</b> {data.name}</Text>
                <Text><b>Repositórios:</b> <a href={data.repos_url} target="_blank">{data.repos_url ? "link" : ""}</a></Text>
                <Text><b>Criado em:</b> {data.created_at ? data.created_at.substring(0,10): ""}</Text>
                <Text><b>Seguidores:</b> {data.followers}</Text>
                <Text><b>Seguindo:</b> {data.following}</Text>
            </View>
        </React.Fragment>
        } 
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