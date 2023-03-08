/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/navigation/Navigation';




function App(): JSX.Element {
  return (
    // <SafeAreaView>
    //   <View>
    //     <Text style={{fontSize: 60}}>hestdshgllo</Text>
    //   </View>
    // </SafeAreaView>
    <Navigation/>
  );
}

export default App;
