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

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return {...field}
        })
    })
}

const getNeighbors = (board, row, column) => {
    const neighbors = [];
    const rows = [row-1, row, row+1];
    const columns = [column-1, column, column+1];

    rows.forEach(r => {
        columns.forEach(c => {
            const different = r !== row || c !== column;  //para descartar o indice clicado
            const validRow = r >= 0 && r < board.length;  //para descartar um indice fora das dimensoes da matriz
            const validColumn = c >= 0 && c <board[0].length;   //o [0] é usado pois é preciso entrar na primeira linha para acessar a primeira coluna

            if(different && validColumn && validRow) {
                neighbors.push(board[r][c]);
            }
        })
    })

    return neighbors;
}

const safeNeghborhood = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined;  //result recebe true e neighbor recebe neighbors (return da funcao getNeighbors)
    
    return getNeighbors(board, row, column).reduce(safes, true);
}

const openField = (board, row, column) => {
    const field = board[row][column];

    if (!field.opened){
        field.opened = true;  //abrir o campo clicado

        if(field.mined){
            field.exploded = true;  //perdeu o jogo
        } else if (safeNeghborhood(board, row, column)){
            getNeighbors(board, row, column).forEach(n => openField(board, n.row, n.column)); //abrir a vizinhança segura enquanto ela for segura
        } else {
            const neighbors = getNeighbors(board, row, column);
            field.nearMines = neighbors.filter(n => n.mined).length;  //pegando a quantidade de campos minados que tem na vizinhança
        }
    }
}

const fields = board => [].concat(...board);  //todos os campos do tabuleiro

const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0; //para saber se existe algum campo explodido 

const pendding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened);

const wonGame = board => fields(board).filter(pendding).length === 0; //so ganha o jogo se nao houver campos pendentes

const showMines = board => fields(board).filter(field => field.mined).forEach(field => field.opened = true);  //mostrar as bombas caso o usuario perca o jogo

const invertFlag = (board, row, column) => {
    const field = board[row][column];
    field.flagged = !field.flagged;
}

const flagsUsed = board => fields(board).filter(field => field.flagged).length; //aramzena quantas flags fora utilizadas



export {createMinedBoard, cloneBoard, openField, hadExplosion, wonGame, showMines, invertFlag, flagsUsed}