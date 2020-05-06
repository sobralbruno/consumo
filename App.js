import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, TouchableOpacity } from 'react-native';
import PrevisaoItem from './components/PrevisaoItem';

export default function App() {

  const [cidade, setCidade] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [fellsLike, setFellsLike] = useState("");
  const [image, setImage] = useState("");



  const capturaCidade = (cidade) => {
    setCidade(cidade);
  }

  const endPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  const oneCall = "https://api.openweathermap.org/data/2.5/onecall";

  const apiKey = "19ed30394407d9b9c5453b6813297540";

  const obtemPrevisoes = () => {

    const target = endPoint + cidade + "&appid=" + apiKey;
    fetch(target)
      .then((dados) => dados.json())
      .then((dados) => {

        setLatitude(dados.coord.lat)
        setLongitude(dados.coord.lon)

        Keyboard.dismiss()

      });

  };



  const obterPrevisao = (latitude, longitude) => {

    const target = oneCall + "?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + apiKey;
    fetch(target)
      .then((dados) => dados.json())
      .then((dados) => {

        setSunrise(dados.current.sunrise)
        setSunset(dados.current.sunset)
        setFellsLike(dados.current.feels_like)
        setImage(dados.current.weather[0].icon)


      })
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.entrada}>
        <Text style={estilos.titulo}>Previsão do Tempo</Text>
        <TextInput
          style={estilos.nomeCidade}
          placeholder="Digite o nome da Cidade"
          value={cidade}
          onChangeText={capturaCidade}
        />
        <TouchableOpacity
          style={estilos.btn}
          title="Ok"
          onPress={() => { obtemPrevisoes, obterPrevisao(latitude, longitude) }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Enviar</Text>
        </TouchableOpacity>

      </View>
      <View style={estilos.previsao}>
        <PrevisaoItem
          amanhecer={sunrise}
          anoitecer={sunset}
          sensacao={fellsLike}
          imagem={image}
        />

      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: 40,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff'
  },
  nomeCidade: {
    fontSize: 20,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    padding: 1
  },
  entrada: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(230,230,230)',
    paddingBottom: 20,
  },
  previsao: {
    marginTop: 50
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#2E2EFE',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#c3c3c3',
    marginTop: 8,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#c3c3c3'
  }
});
