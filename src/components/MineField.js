import React from 'react';
import {View, StyleSheet} from 'react-native';

import Field from  './Field';

export default props => {
    const rows = props.board.map((row, r) => { //trasnformando uma matriz de elementos para uma matriz de elementos JSX (Field)

        const columns = row.map((field, c) => {
            return <Field {... field} key={c} onOpen={() => props.onOpenField(r, c)} onSelect={e => props.onSelectField(r, c)} /> //columns armazena todos os fields de uma linha
        })

         return <View key={r} style={{flexDirection: 'row'}}>{columns}</View>
    })

    return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
    container: {       
        backgroundColor: '#eee',
    }
})