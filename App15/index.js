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
const db = SQLite.openDatabase("tarefas.db");
 
const App15 = () => {
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);
 
  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(20))`,
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
 
  const incluirTarefa = () => {
    if (!tarefa) {
      alert("Informe uma tarefa");
      return false;
    }
 
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO tarefas (nome) VALUES (?)`,
        [tarefa],
        (sqlTxn, res) => {
          console.log(`${tarefa} Tarefa adicionada com sucesso!`);
          getTarefas();
          setTarefa("");
        },
        error => {
          console.log("Erro ao inserir uma Tarefa " + error.message);
        },
      );
    });
  };

  const deletarTarefa = ( id ) => { 
    db.transaction(txn => {
      txn.executeSql(
        `DELETE FROM tarefas WHERE id=(?)`,
        [id],
        (sqlTxn, res) => {
          console.log(`Tarefa deletada com sucesso!`);
          getTarefas();
          setTarefa("");
        },
        error => {
          console.log("Erro ao deletar uma Tarefa " + error.message);
        },
      );
    });
  };
 
  const getTarefas = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM tarefas ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log("Tarefas lidas com sucesso!");
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, nome: item.nome });
            } 
            setTarefas(results);
          } else {
            setTarefas([]);
          }
        },
        error => {
          console.log("Erro ao obter Tarefas " + error.message);
        },
      );
    });
  };
 
  const renderTarefa = ({ item }) => {
    return (
      <View style={{
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
      }}>
        <Text style={{ marginRight: 9 }}>{item.id}</Text>
        <Text>{item.nome}</Text>
        <Pressable style={{padding: 5, border: '1px solid', position: 'absolute', right: 10}} onPress={() => deletarTarefa(item.id)}>
            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 10 }}>X</Text>
        </Pressable>
      </View>
    );
  };
 
  useEffect(async () => {
    await createTables();
    await getTarefas();
  }, []);

  return (
    <View>
      <StatusBar backgroundColor="#222" />
        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 'auto', paddingTop: 20, paddingBottom: 30 }}>Lista de Tarefas</Text>
      <View style={{ display: 'flex', flexDirection: 'row', height: 20, margin: 'auto' }}>
        <TextInput
            placeholder="Nova tarefa"
            value={tarefa}
            onChangeText={setTarefa}
            style={{ marginBottom: 20, borderBottom: '1px solid', marginLeft: 20, marginRight: 20, padding: 10 }}
        />
      <Pressable style={{width: 30, height: 30, borderRadius: '100%', backgroundColor: 'teal'}} onPress={incluirTarefa}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>+</Text>
        </Pressable>
      </View>
 
      <FlatList
        data={tarefas}
        renderItem={renderTarefa}
        key={t => t.id}
      />
    </View>
  );
};
 
export default App15;
