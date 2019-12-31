import Board from './Board'

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

export default Snake;