import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  useEffect(()=>{fetch('https://fabiooliveira.cloud/api_07/',{
    method: 'GET',
    headers:{
      "Content-Type" : "application/json",
      "Authorization" : "c6a8ea3f9c1e47b2d89f0d41b7f3c2d0"
    },
  })
  .then((resposta)=>resposta.json()) //pega a resposta como json
  .then((dados)=>{
    setJogos(dados);
    setCarregando(false);
  })
  .catch((err)=>{})
  }, []);

  if(carregando){
    return(
      <View>
        <ActivityIndicator size="large" color="grey"/>
        <Text>Carregando jogos... </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo1}>Lista de jogos</Text>
      <ScrollView>
        {jogos.map((item, index)=>(
          <View key={index} style={styles.card}>
            <Image source={{uri: item.linkImagem}} style={styles.imagem}/>
            <Text style={styles.titulo}>{item.nomeJogo}</Text>
            <Text style={styles.info}>Classificação: {item.faixaEtaria}</Text>
            <Text style={styles.info}>Categoria: {item.tipo.join(", ")}</Text>
            <Text style={styles.info}>Qtd de Jogadores: {item.qtdEstimadaGamers.toLocaleString("pt-BR")}</Text>
            <Text style={styles.preco}>Preço: {item.preco.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 30,
    backgroundColor: '#a11e1e'
  },
  imagem:{
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "contain",
    marginBottom: 10,
  },
  card:{
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 50,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  titulo1:{
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: 'center',
    color:'white'
  },
  titulo:{
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info:{
    fontSize: 14,
    color: "#555",
    marginBottom: 3,},
  preco: {
    fontSize: 16,
    color: "#008000",
    fontWeight: "bold",
    marginTop: 5,
  },
});
