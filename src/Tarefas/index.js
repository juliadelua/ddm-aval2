import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator, Button} from 'react-native';
import { api21 as api } from '../services/api';
import Card from '../components/Card';
import { useNavigation } from '@react-navigation/native';
import { shouldUseActivityState } from 'react-native-screens';
 
export default function Tarefas() {
  const [tarefas, setTarefas] = useState([])
  const [loading, setLoading] = useState(true)
 
  useEffect(async () => {
    await carregarTarefas()
    setLoading(false)
  }, [])
 
  const carregarTarefas = async () => {
    setLoading(true)
    const response = await api.get('/tasks')
    setTarefas(response.data)
    setLoading(false)
  }
 
  const navigation = useNavigation();
 
  async function irFormulario(){
      navigation.navigate('Formulario', {atualizarLista: carregarTarefas});
  }
 
  if(loading){
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
        <ActivityIndicator color="#09A6FF" size={40}/>
      </View>
    )
  }else{
    return(
      <View style={styles.container}>
        <Button title="Incluir" onPress={irFormulario} color="#59baac" />
 
        <FlatList
        data={tarefas}
        keyExtractor={item => item.id.toString() }
        renderItem={ ({item}) => <Card data={item} funcCarregarTarefas={carregarTarefas} /> }
        />
 
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  card:{
    shadowColor: '#000',
    backgroundColor: '#FFF',
    shadowOffset: {width:0, height: 1},
    shadowOpacity: 0.8,
    margin: 15,
    shadowRadius: 5,
    borderRadius: 5,
    elevation: 3,
  },
  titulo:{
    fontSize: 18,
    padding: 15,
  },
  descricao:{
    fontSize: 10,
    padding: 15,
  },
  botaoIncluir: {
    backgroundColor: 'pink',
    background: 'pink',
    color: 'black'
  }
});
