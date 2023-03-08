import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import React, {useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {AboutData, Asteroid, RootStackParamList} from '../types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
const Home = (props: Props) => {
  const [text, setText] = useState<string>('');
  const [data, setData] = useState<AboutData | {}>({});
  const [checkRandom, setCheckRandom] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleRandomAsteroid = (): void => {
    setLoading(true);
    setError(false);

    setCheckRandom(true);
    axios
      .get<Asteroid>(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=kjzVuKO71XDwAPZ0Yq15vVqSzN6yseZethwOGpaU`,
      )
      .then((res: AxiosResponse<Asteroid>) => {
        let len: number = res.data.near_earth_objects.length;
        let randomnumber: number =
          Math.floor(Math.random() * (len - 1 - 0 + 1)) + 0;
        let nData: AboutData = res.data.near_earth_objects[randomnumber];
        setLoading(false);
        if (nData.id) {
          setText(nData.id);
        }
        setData(nData);
      })

      .catch(err => {
        setLoading(false);
        setError(true);
        setErrorMsg('Something went wrong');
        console.log(err);
      });
  };

  const handleSubmit = (): void => {
    setError(false);

    if (checkRandom) {
      props.navigation.navigate('About', {data: data});
    } else {
      setLoad(true);

      axios
        .get<AboutData>(
          `https://api.nasa.gov/neo/rest/v1/neo/${text}?api_key=kjzVuKO71XDwAPZ0Yq15vVqSzN6yseZethwOGpaU`,
        )
        .then((res: AxiosResponse<AboutData>) => {
          setLoad(false);

          setData(res.data);

          props.navigation.navigate('About', {data: res.data});
        })

        .catch(err => {
          setLoad(false);
          setError(true);
          console.log(err);
          setErrorMsg('Please enter a valid asteroid id');
        });
    }
  };

  const handleText = (val: string): void => {
    setCheckRandom(false);
    setError(false);

    setText(val);
  };
  return (
    <View style={[styles.container]}>
      <TextInput
        style={styles.inputStyle}
        keyboardType="numeric"
        mode="outlined"
        label="Enter asteroid id"
        value={text}
        placeholder="Enter asteroid id"
        onChangeText={(val: string): void => {
          handleText(val);
        }}
      />
      {error && <Text style={styles.errorStyle}>{errorMsg}</Text>}
      <TouchableOpacity
        disabled={loading}
        style={styles.buttonStyle}
        onPress={handleRandomAsteroid}>
        {(loading && (
          <ActivityIndicator animating={true} color={MD2Colors.white} />
        )) || (
          <Text style={[styles.textColor, styles.innerTextOne]}>
            Random asteroid
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={text.length == 0 ? styles.disabledColor : styles.buttonStyle}
        disabled={text.length == 0}
        onPress={handleSubmit}>
        {(load && (
          <ActivityIndicator animating={true} color={MD2Colors.white} />
        )) || (
          <Text
            style={
              text.length == 0
                ? [styles.textColor, styles.innerTextTwoDisabled]
                : [styles.textColor, styles.innerTextTwo]
            }>
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,

    padding: 10,

    backgroundColor: '#6200ee',
    width: '60%',
  },
  textColor: {
    color: '#ffffff',
  },
  disabledColor: {
    backgroundColor: '#DDDDDD',
    color: '#cbc4be',
    marginTop: 10,
    marginBottom: 10,

    padding: 10,
  },
  inputStyle: {
    width: '80%',
  },
  innerTextOne: {
    paddingLeft: 60,
    paddingRight: 50,
  },
  innerTextTwo: {
    paddingLeft: 95,
    paddingRight: 50,
  },
  innerTextTwoDisabled: {
    paddingLeft: 95,
    paddingRight: 90,
  },
  errorStyle: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
});
