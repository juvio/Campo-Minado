const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {   //ignorando o elemento do array (0) e pegando o index (row)
        return Array(columns).fill(0).map((_, column) => {  
            return {
                row,  //mesma coisa que row: row;
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadmines = (board, minesAmount) => {
    const row = board.length;
    const column = board[0].length;
    let minesPlanted = 0;

    while(minesPlanted < minesAmount){
        const rowSel = parseInt(Math.random() * row, 10); //numero aleatorio de acordo com a row, na base 10
        const columnSel = parseInt(Math.random() * column, 10);

        if( !board[rowSel][columnSel].mined){
            board[rowSel][columnSel].mined = true;
            minesPlanted++;  //se o campo selecionado nao estiver minado, ele fica minado (mined true) e incrementa o numero de minas plantadas
        }
    }
}

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns);
    spreadmines(board, minesAmount);

    return board;
}

export {createMinedBoard}