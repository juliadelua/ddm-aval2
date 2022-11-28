import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import { api21 as api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
 
function Card({data, funcCarregarTarefas}){
  console.log(data)
  const [id, setId] = useState(data?.id)
  const [title, setTitle] = useState(data?.title)
  const [description, setDescription] = useState(data?.description)
  const [created, setCreated] = useState(data?.create_at)
  const [finished, setFinished] = useState(data?.finished)
 
  const excluirTarefa = async () => {
    const response = await api.delete(`/tasks/${id}`);
    await funcCarregarTarefas();
  }
 
  const navigation = useNavigation();
 
  async function irFormulario(){
      navigation.navigate('Formulario', { id: id, title: title, description: description, atualizarLista: funcCarregarTarefas});
  }

  const finalizarTarefa = async () => {
    const response = await api.patch(`/tasks/${id}`);
    await funcCarregarTarefas();
  }
 
 
  return(
    <View>
     
      <View style={styles.card}>
        <Text style={styles.titulo}>{title}</Text>
       
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
          <Text style={styles.descricao}>{description}</Text>
          <Text style={styles.descricao}><b>{created.slice(0,10).replaceAll('-','/')}</b></Text>

        </View>
        
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', paddingTop: 15}}>
          <TouchableOpacity style={styles.buttonEditar} onPress={irFormulario}>
            <Text style={{ fontWeight: 'bold' }}>Editar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.buttonExcluir} onPress={excluirTarefa}>
            <Text style={{ fontWeight: 'bold' }}>Excluir</Text>
          </TouchableOpacity>

          {finished ?
            <Text style={styles.finalizado}>Finalizada ✓</Text> :
            <TouchableOpacity style={styles.buttonFinalizar} onPress={finalizarTarefa}>
              <Text style={{ fontWeight: 'bold' }}>Finalizar</Text>
            </TouchableOpacity>
          }

          </View>

      </View>
 
    </View>
  );
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
    padding: 15,
  },
  titulo:{
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  descricao:{
    fontSize: 13,
    paddingTop: 15
  },
  mais: {
    color: 'darkgreen',
    marginLeft: 5,
  },
  buttonEditar: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'flex-start',
    backgroundColor: "yellow",
    padding: 5,
    border: '2px outset',
    marginVertical: 0,
  },
  buttonExcluir: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'flex-start',
    backgroundColor: "gray",
    marginVertical: 0,
    marginLeft: 10,
    backgroundColor: "tomato",
    padding: 5,
    border: '2px outset',
  },
  finalizado: {
    position: 'absolute',
    right: 0,
    fontWeight: 'bold',
    color: 'green'
  },
  buttonFinalizar: {
    position: 'absolute',
    right: 0,
    borderRadius: 5,
    padding: 5,
    border: '2px outset',
  }
});
 
export default Card;