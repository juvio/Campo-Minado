import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextComponent} from 'react-native';

import Flag from './Flag';

export default props => {
    return(
        <View style={styles.container}>

                <TouchableOpacity onPress={props.onLevelPress} style={styles.button}>
                    <Text style={styles.buttonLabel}>Level</Text>
                </TouchableOpacity>

            <View style={styles.flagContainer}>
                <TouchableOpacity onPress={props.onFlagPress} style={styles.flagButton}>
                    <Flag bigger />
                </TouchableOpacity>
                <Text style={styles.flagsLeft}>= {props.flagsLeft}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={props.onNewGame}>               
                <Text style={styles.buttonLabel}>Novo Jogo</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#A9A9A9',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    flagContainer: {
        flexDirection: 'row',
       
    },
    flagButton: {
        marginTop: 10,
        minWidth: 30,
    },
    flagsLeft: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 5,
        marginLeft: 20,
        color: '#ddd'
    },
    button: {
        backgroundColor: '#1E90FF',
        padding: 5,
        borderRadius: 13,
    },
    buttonLabel: {
        fontSize: 20,
        color: '#ddd',
        fontWeight: 'bold',
    },

})