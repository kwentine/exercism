export default class Minesweeper {


    annotate(boardMap = []) {

        // Minimal sanity checking
        const nRows = boardMap.length;
        const nCols = nRows && boardMap[0].length;
        if (!(nRows && nCols && boardMap)) return boardMap;

        const board = (new Array(nRows)).fill(undefined).map(x => (new Array(nCols)).fill(0))

        function setMine(i, j) {
            // Place a mine at coordinates (i, j) on the board
            // Increment the mine count of adjacent locations, unless a mine is already there
            if (outOfBounds(i, j)) return;
            board[i][j] = '*';
            for (let dx of [-1, 0, +1]) {
                for (let dy of [-1, 0, +1]) {
                    if (dx || dy)
                        increment(i + dx, j + dy);
                }
            }
        }

        function increment(i, j) {
            // Increment the mine count at (i, j)
            if (outOfBounds(i,j)) return;
            board[i][j] !== '*' && board[i][j]++
        }

        function outOfBounds(i, j) {
            // Check if coordinates are on the board
            return (i < 0 || j < 0 || i >= nRows || j >= nCols)
        }

        // Parse the board map, and add the bombs on the board
        boardMap.forEach((x, i) => [...x].forEach((c, j) => {
            if (c === '*') setMine(i, j);
        }))

        return board.map(r => r.map(x => (x === 0) ? ' ' : x).join(''))
    }
}