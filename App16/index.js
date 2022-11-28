import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, TextInput, FlatList, Pressable } from "react-native";
// Para React Native CLI
// import { openDatabase } from "react-native-sqlite-storage";
 
// Para Expo
import * as SQLite from 'expo-sqlite';
 
// Para React Native CLI
// const db = openDatabase({
  // name: "rn_sqlite",
// });
 
// Para Expo
const db = SQLite.openDatabase("compras.db");
 
const App16 = () => {
  const [compra, setCompra] = useState("");
  var [qt, setQt] = useState("");
  const [compras, setCompras] = useState([]);
 
  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
       `CREATE TABLE IF NOT EXISTS compras (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(20), qt INTERGER)`,
        [],
        (sqlTxn, res) => {
          console.log("Tabela criada com sucesso!");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });
  };
 
  const incluirCompra = () => {
    if (!compra) {
      alert("Informe uma compra");
      return false;
    }

    if (parseInt(qt) === 0 || !qt) {
        alert("Informe uma quantidade maior que 0!");
        return false;
    }

    qt = parseInt(qt)

    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO compras (nome, qt) VALUES (?, ?)',
        [compra, qt],
        (sqlTxn, res) => {
            console.log(sqlTxn)
            console.log(res)
          console.log(`${qt} ${compra} compra adicionada com sucesso!`);
          getCompras();
          setCompra("");
          setQt("");
        },
        error => {
          console.log("Erro ao inserir uma compra " + error.message);
        },
      );
    });
  };

  const deletarCompra = ( id ) => { 
    db.transaction(txn => {
      txn.executeSql(
        `DELETE FROM compras WHERE id=(?)`,
        [id],
        (sqlTxn, res) => {
          console.log(`compra deletada com sucesso!`);
          getCompras();
          setCompra("");
        },
        error => {
          console.log("Erro ao deletar uma compra " + error.message);
        },
      );
    });
  };
 
  const getCompras = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM compras ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log("compras lidas com sucesso!");
          let len = res.rows.length;
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, nome: item.nome, qt: item.qt });
            } 
            setCompras(results);
          } else {
            setCompras([]);
          }
        },
        error => {
          console.log("Erro ao obter compras " + error.message);
        },
      );
    });
  };
 
  const renderCompra = ({ item }) => {
    return (
      <View style={{
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
      }}>
        
        <Text>{item.nome}</Text>
        <Text style={{ marginRight: 9 }}>({item.qt})</Text>
        <Pressable style={{padding: 5, border: '1px solid', position: 'absolute', right: 10}} onPress={() => deletarCompra(item.id)}>
            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 10 }}>X</Text>
        </Pressable>
      </View>
    );
  };
 
  useEffect(async () => {
    await createTables();
    await getCompras();
  }, []);

  return (
    <View>
      <StatusBar backgroundColor="#222" />
        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 'auto', paddingTop: 20, paddingBottom: 30 }}>Lista de Compras</Text>
      <View style={{ display: 'flex', flexDirection: 'row', height: 20, margin: 'auto' }}>
        <TextInput
            placeholder="Qt"
            value={qt}
            onChangeText={setQt}
            keyboardType='numeric'
            style={{ marginBottom: 20, borderBottom: '1px solid', marginLeft: 20, marginRight: 20, padding: 10, width: 30 }}
        />
        <TextInput
            placeholder="Produto"
            value={compra}
            onChangeText={setCompra}
            style={{ marginBottom: 20, borderBottom: '1px solid', marginLeft: 20, marginRight: 20, padding: 10 }}
        />
      <Pressable style={{width: 30, height: 25, borderRadius: 5, backgroundColor: 'deeppink'}} onPress={incluirCompra}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>+</Text>
        </Pressable>
      </View>
 
      <FlatList
        data={compras}
        renderItem={renderCompra}
        key={t => t.id}
      />
    </View>
  );
};
 
export default App16;
