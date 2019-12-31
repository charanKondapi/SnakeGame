import Board from './Board'
import Snake from './Snake'

const snakeBoard = new Board(500,500);
      snakeBoard.drawBoard();

const snake = new Snake();
      snake.drawSnake();

snakeBoard.placeFood( snake.snakePosition );


// const timer = setInterval( () => snake.move( timer, snakeBoard, snake ), 200 );


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

