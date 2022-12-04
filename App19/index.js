import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Picker, FlatList, TextInput, Pressable, ActivityIndicator } from 'react-native';
 
import { api19 as api } from '../src/services/api';

export default class App19 extends Component {
    constructor(props){
        super(props);
        this.state = {
            valor: '',
            de_moeda: 'BRL',
            para_moeda: 'USD',
            resultado: 0
        };
    
        this.getValor = this.getValor.bind(this);
    }
    
    async getValor(){
        const { de_moeda, para_moeda, valor } = this.state;
        try {
            const response = await api.get(de_moeda + '-' + para_moeda);
            let ask = response.data[de_moeda + para_moeda].ask;
            this.setState({
                resultado: valor * ask
            });
        } catch(error) {
            console.log(error)
            this.setState({
                ask: '',
                de_moeda: 'BRL',
                para_moeda: 'USD'
            });
            alert('Erro! Tente de novo.')
        }

    }
    
    render() {
        const { resultado, valor, de_moeda, para_moeda } = this.state;
        return(
            <View style={styles.container}>
            <Text style={styles.title}>Conversor de Moedas</Text>
            <React.Fragment>
                <View style={{ display: 'flex', flexDirection: 'column', height: 20, margin: 'auto', paddingTop: 30 }}>
                    <View style={{ display: 'flex', flexDirection: 'row'}}>
                        <TextInput
                            placeholder="Digite o valor..."
                            value={valor}
                            onChangeText={(value) => this.setState({ valor: value })}
                            style={{ marginBottom: 20, border: '1px solid', marginLeft: 20, marginRight: 20, padding: 20 }}
                        />
                        <Pressable style={{width: 60, height: 60, borderRadius: 5, backgroundColor: 'lightblue', display: 'flex', justifyContent: 'center'}} onPress={this.getValor}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>✔</Text>
                        </Pressable>
                    </View>
                    <Picker
                        selectedValue={de_moeda}
                        onValueChange={ (val) => this.setState({de_moeda: val, resultado: 0}) }
                        style={{ marginBottom: 20, border: '1px solid', marginLeft: 20, marginRight: 20, padding: 10, fontWeight: 'bold' }}
                    >
                        <Picker.Item key={1} value={'BRL'} label="Real" />
                        <Picker.Item key={2} value={'USD'} label="Dólar" />
                        <Picker.Item key={3} value={'BTC'} label="Bitcoin" />
                    </Picker>

                    <Picker
                        selectedValue={para_moeda}
                        onValueChange={ (val) => this.setState({para_moeda: val, resultado: 0}) }
                        style={{ marginBottom: 20, border: '1px solid', marginLeft: 20, marginRight: 20, padding: 10, fontWeight: 'bold' }}
                    >
                        <Picker.Item key={1} value={'BRL'} label="Real" />
                        <Picker.Item key={2} value={'USD'} label="Dólar" />
                        <Picker.Item key={3} value={'BTC'} label="Bitcoin" />
                    </Picker>

                    <Text style={{ marginBottom: 20, textAlign: 'center', fontWeight: 'bold', color: 'blue', fontSize: 20}}>Valor Convertido</Text>
                    <Text style={{ marginBottom: 20, border: '1px solid blue', marginLeft: 20, marginRight: 20, padding: 10, fontWeight: 'bold', color: 'blue', textAlign: 'center', fontSize: 18  }}>
                        {para_moeda === 'BRL' && "R$"}
                        {para_moeda === 'USD' && "U$"}
                        {para_moeda === 'BTC' && "₿"}
                        {resultado}
                    </Text>
                </View>
            </React.Fragment>
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