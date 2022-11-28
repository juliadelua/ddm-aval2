import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, ActivityIndicator } from 'react-native';
 
import { api17 as api } from '../src/services/api';

export default class App17 extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			cep: '',
			loading: false,
		};

		this.getCEPInfo = this.getCEPInfo.bind(this);
	}

	async getCEPInfo(){
		this.setState({ loading: true })
		try {
			const url = '/' + this.state.cep + '/json'
			const response = await api.get(url);
			this.setState({
				data: response.data,
				loading: false
			});
		} catch(error) {
			console.log(error)
			this.setState({
				data: [],
				cep: '',
				loading: false
			});
			alert('Erro! Tente de novo.')
		}
	}
	 
	render() {
		const { data, cep, loading } = this.state;
		return(
			<View style={styles.container}>
			<Text style={styles.title}>CEP x Endereço</Text>
			{loading &&
				<View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
				 <ActivityIndicator color="black" size={40}/>
				 </View>
			}
			{!loading &&
			<React.Fragment>
				<View style={{ display: 'flex', flexDirection: 'row', height: 20, margin: 'auto' }}>
					<TextInput
						placeholder="Digite seu CEP"
						value={cep}
						onChangeText={(value) => this.setState({ cep: value })}
						style={{ marginBottom: 20, borderBottom: '1px solid', marginLeft: 20, marginRight: 20, padding: 10 }}
					/>
				<Pressable style={{width: 40, height: 30, borderRadius: 5, backgroundColor: 'green'}} onPress={this.getCEPInfo}>
					<Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>✔</Text>
				</Pressable>
				</View>
				<View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20, marginTop: 20 }}>
					<Text><b>CEP:</b> {data.cep}</Text>
					<Text><b>Logradouro:</b> {data.logradouro}</Text>
					<Text><b>Bairro:</b> {data.bairro}</Text>
					<Text><b>Cidade:</b> {data.localidade}</Text>
					<Text><b>Estado:</b> {data.uf}</Text>
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