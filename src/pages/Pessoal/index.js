import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import M from '../../images/marjorye.jpg';
import J from '../../images/julia.jpg';
 
export default function Pessoal() {
const navigation = useNavigation();
 return (
   <View style={{ position: 'relative', padding: 10 }}>
	

	 <Text style={styles.title}>Pessoal</Text>
	 
	 <View style={styles.alunaBox}>
		<Image
		  source={J}
		  style={{width: 80, height: 80, borderRadius: 5}}
		/>
		<View style={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }}>
		  <Text style={styles.alunaName}>Julia Gato</Text>
		  <Text style={styles.alunaDesc}>25 anos. Santos.</Text>
		  <Text style={styles.alunaDesc}>Durante seu tempo livre, gosta de jogar videogames, ler e desenhar.</Text>
		</View>
	 </View>

	 <View style={styles.alunaBox}>
		<Image
		  source={M}
		  style={{width: 80, height: 80, borderRadius: 5}}
		/>
		<View style={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }}>
		  <Text style={styles.alunaName}>Marjorye Ciardullo</Text>
		  <Text style={styles.alunaDesc}>24 anos. Santos.</Text>
		  <Text style={styles.alunaDesc}>Apaixonada por filmes, artes visuais e teoria musical.</Text>
		</View>
	 </View>
	
   </View>
  );
}

const styles = StyleSheet.create({
  title: {
	fontSize: 20,
	fontWeight: 'bold',
	textAlign: 'center',
	textTransform: 'uppercase',
	letterSpacing: 3,
	borderBottomWidth: 1,
	paddingBottom: 10,
	marginBottom: 10
  },
  alunaName: {
	fontSize: 15,
	fontWeight: 'bold',
	letterSpacing: 2,
	paddingBottom: 5,
  },
  alunaDesc: {
  	width: '80%',
	fontSize: 12,
	marginBottom: 5,
  },
  alunaBox: {
	display: 'flex',
	flexDirection: 'row',
	border: '1px solid',
	margin: 10,
	padding: 5,
	borderRadius: 5,
	columnGap: 10,
    background: 'white',
  },
  return:{
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'relative',
	left: 0,
	top: 0,
	width: 35,
	height: 35
  },
})