import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
type Props = NativeStackScreenProps<RootStackParamList, 'About'>;
const About = (props: Props): JSX.Element => {
  const {data} = props.route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.customText}>
        <Text style={styles.colorOuter}>ID :</Text> {data.id}
      </Text>
      <Text style={styles.customText}>
        <Text style={styles.colorOuter}>Name :</Text> {data.name}
      </Text>
      <Text style={styles.customText}>
        <Text style={styles.colorOuter}>NASA JPL URL: </Text>
        {data.nasa_jpl_url}
      </Text>
      <Text style={styles.customText}>
        <Text style={styles.colorOuter}>
          Is Potentially Hazardous Asteroid:
        </Text>
        {data.is_potentially_hazardous_asteroid ? 'true' : 'false'}
      </Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    padding: 20,
    gap: 20,
  },
  customText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"#000000"
  },
  colorOuter: {
    color: '#415594',
  },
});
