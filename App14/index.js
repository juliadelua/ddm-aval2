import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class App14 extends Component{
	constructor(props){
		super(props);
		this.state = {
			dia: false,
			pequeno: false
		};
	}
 
	async componentDidMount(){
		await AsyncStorage.getItem('nome').then((value)=> {
			this.setState({nome: value});
		})
	}
 
	async componentDidUpdate(_, prevState){
		const nome = this.state.nome;
	 
		if(prevState !== nome){
			await AsyncStorage.setItem('nome', nome);
		}
	}
  
	render(){
	const { dia, pequeno } = this.state;
	return(
		<View style={styles.container}>			 
			<View style={{'display': 'flex', 'justifyContent': 'space-between', 'flexDirection': 'row', 'width': '100%'}}>
				<Text>Dia</Text>
				<Switch 
					value={this.state.dia}
					onValueChange={ (valorSwitch) => this.setState({dia: valorSwitch})}
					thumbColor='black'
				/>
				<Text>Pequeno</Text>
				<Switch 
					value={this.state.pequeno}
					onValueChange={ (valorSwitch) => this.setState({pequeno: valorSwitch})}
					thumbColor='black'
				/>
			</View>
			<View style={ dia ? styles.dia : styles.noite }>
				<Text style={ pequeno ? styles.pequeno : styles.grande }>"A vingança nunca é plena, mata a alma e envenena." (Seu Madruga)</Text>
			</View>
		</View>		
	);
 
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		padding: 50,
		alignItems: 'center',
	},
	dia: {
		backgroundColor: '#fff',
		height: '80%',
		padding: 20,
		margin: 10,
	},
	noite: {
		backgroundColor: '#9e9e9e',
		height: '80%',
		padding: 20,
		margin: 10,
	},
	pequeno: {
		fontSize: 10,
	},
	grande: {
		fontSize: 20,
	}
})