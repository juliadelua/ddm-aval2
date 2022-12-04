import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Keyboard, Picker, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { Entypo } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default class App11 extends Component {
	render(){
		return (
			<NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Form" component={Form} />
                <Stack.Screen name="Dados" component={Dados} />
              </Stack.Navigator>
            </NavigationContainer>
		);
	}
}

class Form extends Component {
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
		this.confirmar = this.confirmar.bind(this);
	};

	mudaState(val, state) {
		this.setState({[state]: val})
	}

	confirmar() {
		const { nome, idade, sexo, escolaridade, limite, brasileiro } = this.state;
		let dados = {
			'nome': nome,
			'idade': idade,
			'sexo': sexo,
			'escolaridade': escolaridade,
			'limite': limite,
			'brasileiro': brasileiro
		}
        this.props.navigation.navigate('Dados', dados)
	}
 
	render(){
		const { nome, idade, sexo, escolaridade, limite, brasileiro } = this.state;
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Abertura de Conta</Text>
				<View>
					<Text>Nome:</Text>
					<TextInput
						style={styles.input}
						onChangeText={(texto) => this.mudaState(texto, 'nome')}
					/>
				</View>
				<View style={{marginTop: 10}}>
					<Text>Idade:</Text>
					<TextInput
						style={styles.input}
						keyboardType='numeric'
						onChangeText={(texto) => this.mudaState(texto, 'idade')}
					/>
				</View>
				<View style={{marginTop: 20}}>
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
				<View style={{marginTop: 10}}>
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
				<View style={{marginTop: 10}}>
					<Text>Limite:</Text>
					<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<Slider
							style={{ width: 80 }}
							minimumValue={0}
							maximumValue={1000}
							onValueChange={ (val) => this.setState({limite: val})}
							value={limite}
							step={100}
							minimumTrackTintColor='pink'
							thumbTintColor='pink'
						/>
						<Text style={{ marginLeft: 15 }}>R${limite},00</Text>
					</View>
				</View>
				<View style={{marginTop: 10}}>
					<Text>Brasileiro:</Text>
					<Switch 
						value={brasileiro}
						onValueChange={ (val) => this.setState({brasileiro: val})}
						thumbColor='green'
					/>
				</View>

				<Pressable onPress={this.confirmar}>
	            	<Text style={styles.confirmar}>Confirmar</Text>
	            </Pressable>
			</View>
		);
	}
}

class Dados extends Component {
	render(){
		const dados = this.props.route.params;
		return (
			<View style={styles.container}>
				<View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
					<Entypo name="arrow-bold-left" size={24} color="blue" onClick={() => this.props.navigation.goBack()}/>
					<Text style={styles.title} >Dados da Conta:</Text>
				</View>
					<Text>Nome: {dados.nome}</Text>
					<Text>Idade: {dados.idade} anos</Text>
					<Text>Sexo: {dados.sexo === 'F' ? 'Feminino' : 'Masculino'}</Text>
					<Text>Escolaridade: {dados.escolaridade}</Text>
					<Text>Limite: R${dados.limite},00</Text>
					<Text>Brasileiro: {dados.brasileiro ? 'Sim' : 'Não'}</Text>
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
	title:{
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingBottom: 10,
    },
	input:{
		width: 350,
		height: 40,
		borderColor: '#000',
		borderWidth: 1,
		padding: 10,
		backgroundColor: '#fff'
	},
	confirmar: {
		backgroundColor: '#3CB371',
		width: '100%',
		borderRadius: 5,
		padding: 10,
		marginTop: 50,
		color: '#fff',
		fontWeight: 'bold'
	}
})