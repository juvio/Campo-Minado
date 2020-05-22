import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';

import params from './params';
import MineField from './components/MineField';
import {createMinedBoard, cloneBoard, openField, hadExplosion, wonGame, showMines, invertFlag, flagsUsed} from './functions';
import Header from './components/Header';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState();  //ao criar o estado no constructor pode usar 'this.state', para alteralo depois tem que usar 'setState'
  }

  minesAmount = () => {  //para saber quantas minas devem ter no tabuleiro
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();

    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();

    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
    }
  }

  openField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if(lost){
      showMines(board);
      Alert.alert('PERDEU');
    }

    if(won){
      Alert.alert('GANHOU');
    }

    this.setState({board, lost, won});
  }

  selectField = (row, column) => {
    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column);

    const won = wonGame(board);

    if(won){
      Alert.alert('GANHOU');
    }

    this.setState({board, won});

  }

  render () {
    return (
      <View style={styles.container}>     
      <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)} onNewGame={() => this.setState(this.createState())}/>
        <View style={styles.board}>
            <MineField board={this.state.board} onOpenField={this.openField} onSelectField={this.selectField}/>
        </View>
      </View>
    );
  }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#aaa',
  }
});
