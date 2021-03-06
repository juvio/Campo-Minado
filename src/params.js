import {Dimensions} from 'react-native';

const params = {
    blockSize: 30,
    borderSize: 4,
    fontSize: 15,
    headerRatio: 0.15, //proporção do cabeçalho (15% da tela)
    difficultLevel: 0.1,
    getColumnsAmount() { //quantidade de coluna de acordo com a tela do celular
        const width = Dimensions.get('window').width;
        return Math.floor(width / this.blockSize);
    }, 
    getRowsAmount(){
        const totalHeight = Dimensions.get('window').height;
        const boardHeight = totalHeight * (1 - this.headerRatio);
        return Math.floor(boardHeight / this.blockSize);
    }

}

export default params;