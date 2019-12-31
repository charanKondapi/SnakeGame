// Board for snake game

Board.BORDER_COLOR = "#000";
Board.BORDER_STYLE = "solid";
Board.BORDER_WIDTH = 5;
Board.BACKGROUND_COLOR = "#efefef";
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

    for( row = 0; row < numberOfRows; row++ ){
        for( col = 0; col < numberOfColumns; col++ ){
            // DIVIDE THE BOARD INTO ROWS AND COLUMNS
            const cell = document.createElement('div');
            cell.style.width = `${ Board.CELL_WIDTH }px`;
            cell.style.height = `${ Board.CELL_HEIGHT }px`;
            cell.setAttribute('data-x', col );
            cell.setAttribute('data-y', row );
            cell.style.border = "1px solid #efefef";
            cell.style.boxSizing = "border-box";

            boardElement.appendChild( cell );
        }
    }


    rootElement.appendChild( boardElement );
}

Board.prototype.placeFood = function placeFood( snakePosition ){
    const excludedPositions = [[],[]];
    snakePosition.map( val => Object.values( val ) ).forEach( val => {
        excludedPositions[0].push(val[0]);
        excludedPositions[1].push(val[1]);
    });
    const { numberOfRows : rows , numberOfColumns : cols  }  = this.getRowsAndCols();
    const foodPosition = { x : Math.round( Math.random() * cols - 1 ), y : Math.round( Math.random() * rows - 1 ) };
    const ele = document.querySelectorAll(`[data-x="${ foodPosition.x }"][data-y="${ foodPosition.y }"]`)[0];
          if(ele) ele.style.backgroundColor = "red";

    this.foodPosition = foodPosition;
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


// SNAKE
Snake.COLOR = "#666";
Snake.DIRECTION = "right";

function Snake(){
    this.snakePosition = [{ x : 0, y : 0 }, { x : 1, y : 0 }, { x : 2, y : 0 }];
    this.prevSnakePosition = [];
}

Snake.prototype.drawSnake = function drawSnake(){
    this.clearSnake();
    this.snakePosition.forEach(({ x, y }) => {
        const ele = document.querySelectorAll(`[data-x="${ x }"][data-y="${ y }"]`)[0];
                if( ele ) ele.style.backgroundColor = Snake.COLOR;
                if( ele ) ele.style.transition = "all 0.005s ease-in-out";
    })
}

Snake.prototype.clearSnake = function clearSnake(){
    this.prevSnakePosition.forEach(({ x, y}) => {
        const ele = document.querySelectorAll(`[data-x="${ x }"][data-y="${ y }"]`)[0];
              if( ele ) ele.style.backgroundColor = Board.BACKGROUND_COLOR;
              if( ele ) ele.style.transition = "all 0.005s ease-in-out";
    })
}

Snake.prototype.move = function move( timer, snakeBoard, python ){
    this.prevSnakePosition = [ ...this.snakePosition ];
    let snakeLength = this.snakePosition.length;
    let head = this.snakePosition[ snakeLength - 1 ];
    let newHead = {};

    const { numberOfRows, numberOfColumns }  = snakeBoard.getRowsAndCols();

    switch( Snake.DIRECTION ){
        case 'right' : 
            newHead = { x : head.x + 1, y : head.y };
            break;
        case 'left' : 
            newHead = { x : head.x - 1, y : head.y };
            break;
        case 'down' :
            newHead = { x : head.x, y : head.y + 1 };
            break;
        case 'up' :
            newHead = { x : head.x, y : head.y - 1 };
            break;
    };

    if( newHead.x == snakeBoard.foodPosition.x && newHead.y == snakeBoard.foodPosition.y ){
        this.snakePosition.unshift({ x: this.snakePosition[0].x - 1, y : head.y});
        snakeBoard.placeFood( python.snakePosition );
    }

    try {
        if( newHead.x >= numberOfColumns  || newHead.y >= numberOfRows ){
            throw new Error("stop");
        }
    }
    catch( e ){
        snakeBoard.stopGame( timer )
    }

    this.snakePosition.push( newHead );
    this.snakePosition.shift();
    this.drawSnake();
}




const snakeBoard = new Board( 500, 500 );
      snakeBoard.drawBoard();

const python = new Snake();

snakeBoard.placeFood( python.snakePosition );
python.drawSnake();

// const timer = setInterval( () => python.move( timer, snakeBoard, python ), 200 );



document.addEventListener('keydown',function( ev ){
    setTimeout(()=>{
        switch( ev.keyCode ){
            case 37 :
                Snake.DIRECTION = "left";
                break;
            case 38 : 
                Snake.DIRECTION = "up";
                break;
            case 39 : 
                Snake.DIRECTION = "right";
                break;
            case 40 : 
                Snake.DIRECTION = "down";
                break;
        }
    },0)
});