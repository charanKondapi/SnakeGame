// constants

Board.BORDER_COLOR = "#000";
Board.BORDER_STYLE = "solid";
Board.BORDER_WIDTH = 5;
Board.BACKGROUND_COLOR = "#efefef";
Board.CELL_BORDER_COLOR = "#efefef";
Board.CELL_WIDTH = 20;
Board.CELL_HEIGHT = 20;

function Board( width, height ){
    this.width = width;
    this.height = height;
    this.foodPosition = {};
}

Board.prototype.drawBoard = function drawBoard(){

    if( this.width % Board.CELL_WIDTH !== 0 || this.height % Board.CELL_HEIGHT !== 0 ){
        throw new Error(`width and height should devicable by ${ Board.CELL_WIDTH }, ${ Board.CELL_HEIGHT } `);
    }

    const rootElement = document.getElementById('game');

    // ADDING STYLES FOR BOARD
    const boardElement = document.createElement('div');
          boardElement.style.width = `${ this.width }px`;
          boardElement.style.height = `${ this.height }px`;
          boardElement.style.borderWidth = `${Board.BORDER_WIDTH}px`;
          boardElement.style.borderColor = Board.BORDER_COLOR;
          boardElement.style.borderStyle = Board.BORDER_STYLE;
          boardElement.style.backgroundColor = Board.BACKGROUND_COLOR;
          boardElement.style.display = "flex";
          boardElement.style.flexWrap = "wrap";
    
    const { numberOfRows,  numberOfColumns } = this.getRowsAndCols();

    for( let row = 0; row < numberOfRows; row++ ){
        for( let col = 0; col < numberOfColumns; col++ ){
            // DIVIDE THE BOARD INTO ROWS AND COLUMNS
            const cell = document.createElement('div');
            cell.style.width = `${ Board.CELL_WIDTH }px`;
            cell.style.height = `${ Board.CELL_HEIGHT }px`;
            cell.setAttribute('data-x', col );
            cell.setAttribute('data-y', row );
            cell.style.border = `1px solid ${ Board.CELL_BORDER_COLOR }`;
            cell.style.boxSizing = "border-box";

            boardElement.appendChild( cell );
        }
    }


    rootElement.appendChild( boardElement );
}

Board.prototype.placeFood = function placeFood( snakePosition ){

    const { numberOfRows : rows , numberOfColumns : cols  }  = this.getRowsAndCols();
    // const foodPosition = { x : Math.round( Math.random() * cols - 1 ), y : Math.round( Math.random() * rows - 1 ) };
    const foodPosition = this.newPlaceForFood( snakePosition, cols, rows );

    console.log( foodPosition );

    const ele = document.querySelectorAll(`[data-x="${ foodPosition.x }"][data-y="${ foodPosition.y }"]`)[0];
          if(ele) ele.style.backgroundColor = "red";

    this.foodPosition = foodPosition;
}

Board.prototype.newPlaceForFood = function newPlaceForFood( snakePosition, cols, rows ){
    const newPlace = { x : Math.abs(Math.round( Math.random() * cols - 1 )), y : Math.abs(Math.round( Math.random() * rows - 1 )) };
    return snakePosition.some( ({ Xpos, Ypos }) => Xpos === newPlace.x && Ypos === newPlace.y ) 
            ? newPlaceForFood(snakePosition, cols, rows )
            : newPlace;
}

Board.prototype.getRowsAndCols = function getRowsAndCols(){
    return {
        numberOfRows : this.height / Board.CELL_HEIGHT,
        numberOfColumns : this.width / Board.CELL_WIDTH
    }
}

Board.prototype.stopGame = function stopGame( timer ){
    clearInterval( timer );
}


export default Board;