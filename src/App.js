import React, {Component} from 'react';
import { StyleSheet, Text, View,} from 'react-native';

import params from './params';
import Field from './components/Field';

export default class App extends Component {
 render () {
  return (
    <View style={styles.container}>
      <Text>Tamanho: {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
      <Field />
      <Field opened />
      <Field opened nearMines={5}/>
      <Field mined opened exploded/>
    </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
