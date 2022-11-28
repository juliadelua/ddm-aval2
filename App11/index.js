import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Keyboard, Picker } from 'react-native';
import Slider from '@react-native-community/slider';

export default class AppBanco extends Component {
	constructor(props){
		super(props);
		this.state = {
			nome: '',
			idade: 0,
			sexo: 'F',
			escolaridade: '',
			limite: 0,
			brasileiro: false,
	};

		this.mudaState = this.mudaState.bind(this);
	};

	mudaState(val, state) {
		this.setState({[state]: val})
	}
 
	render(){
		const { nome, idade, sexo, escolaridade, limite, brasileiro } = this.state;
		return (
			<View style={styles.container}>
				<Text>Abertura de Conta</Text>
				<View>
					<Text>Nome:</Text>
					<TextInput
					style={styles.input}
					onChangeText={(texto) => this.mudaState(texto, 'nome')}
					/>
				</View>

				<View>
					<Text>Idade:</Text>
					<TextInput
					style={styles.input}
					keyboardType='numeric'
					onChangeText={(texto) => this.mudaState(texto, 'idade')}
					/>
				</View>

				<View>
					<Text>Sexo:</Text>
					<Picker
					selectedValue={sexo}
					onValueChange={ (val) => this.setState({sexo: val}) }
					>
					<Picker.Item key={1} value={'F'} label="Feminino" />
					<Picker.Item key={2} value={'M'} label="Masculino" />
					<Picker.Item key={3} value={'NB'} label="Não-Binárie" />
					</Picker>
				</View>

				<View>
					<Text>Escolaridade:</Text>
					<Picker
					selectedValue={escolaridade}
					onValueChange={ (val) => this.setState({escolaridade: val}) }
					>
					<Picker.Item key={1} value={'Fundamental'} label="Fundamental" />
					<Picker.Item key={2} value={'Médio'} label="Médio" />
					<Picker.Item key={3} value={'Técnico'} label="Técnico" />
					<Picker.Item key={4} value={'Superior'} label="Superior" />
					<Picker.Item key={5} value={'Pós-Graduação'} label="Pós-Gradução" />
					<Picker.Item key={6} value={'Mestrado'} label="Mestrado" />
				</Picker>
				</View>

				<View>
					<Text>Limite:</Text>
					<Slider
					minimumValue={0}
					maximumValue={1000}
					onValueChange={ (val) => this.setState({limite: val})}
					value={this.state.valor}
					step={100}
					minimumTrackTintColor='pink'
					thumbTintColor='pink'
					/>
				</View>

				<View>
					<Text>Brasileiro:</Text>
					<Switch 
					value={brasileiro}
					onValueChange={ (val) => this.setState({brasileiro: val})}
					thumbColor='red'
					/>
				</View>

				<br></br>

				<Text>Nome: {nome}</Text>
				<Text>Idade: {idade}</Text>
				<Text>Sexo: {sexo}</Text>
				<Text>Escolaridade: {escolaridade}</Text>
				<Text>Limite: R${limite}</Text>
				<Text>Brasileiro: {brasileiro ? 'Sim' : 'Não'}</Text>

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
	input:{
		width: 350,
		height: 40,
		borderColor: '#000',
		borderWidth: 1,
		padding: 10,
	}
})