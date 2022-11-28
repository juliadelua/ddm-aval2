import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
 
export default function Experiencia() {
const navigation = useNavigation();
 
 return (
   <View style={{ position: 'relative', padding: 10 }}>
    <TouchableOpacity style={styles.return} onPress={ () => navigation.toggleDrawer() }>
      <FontAwesome name='bars' size={25} color='#007AFF' />
    </TouchableOpacity>

     <Text style={styles.title}>Experiencia</Text>
     
     <View style={styles.alunaBox}>
        <View style={{ width: 80, backgroundColor: 'black', borderRadius: 5 }}></View>
        <View style={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }}>
          <Text style={styles.alunaName}>Alun@ Fulan@</Text>
          <Text style={styles.alunaDesc}>26 anos. São Paulo.</Text>
          <Text style={styles.alunaDesc}>Alun@ tal gosta de cozinhar, desenhar e de jogar games.</Text>
        </View>
     </View>

     <View style={styles.alunaBox}>
        <View style={{ width: 80, backgroundColor: 'black', borderRadius: 5 }}></View>
        <View style={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }}>
          <Text style={styles.alunaName}>Alun@ Siclan@</Text>
          <Text style={styles.alunaDesc}>28 anos. Curitiba.</Text>
          <Text style={styles.alunaDesc}>Alun@ tal gosta de filmes, livros e séries. Também tem interesse em isso e aquilo.</Text>
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