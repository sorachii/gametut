let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');

const GAME_WIDTH=800;
const GAME_HEIGHT=600;


class Paddle{
    constructor(gameWidth, gameHeight){
        this.width = 30;
        this.height = 30;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.maxSpeed = 5;
        this.speed=0;

        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight - this.height - 10,
        }
    }

    stop(){
        this.speed = 0;
    }
    moveLeft(){
        this.speed = -this.maxSpeed;
    }

    moveRight(){
        this.speed = this.maxSpeed;
    }

    draw(ctx){
        ctx.fillStyle = "#fa8072";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    
    update(deltaTime){
        if (!deltaTime) return;
        this.position.x +=this.speed;
        if(this.position.x<0) this.position.x=0;
        if(this.position.x + this.width > this.gameWidth)
        this.position.x = this.gameWidth - this.width;
    }
}

class InputHandler {
    constructor(paddle){
        document.addEventListener("keydown", (event) => {
            //alert(event.keyCode);
            switch(event.keyCode){
                case 37:
                    paddle.moveLeft();
                    break;
                case 39:
                    paddle.moveRight();
                    break;
            }
        });
        document.addEventListener("keyup", (event) => {
            //alert(event.keyCode);
            switch(event.keyCode){
                case 37:
                    paddle.stop();
                    break;
                case 39:
                    paddle.stop();
                    break;
            }
        });
    }
}

function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    paddle.update(deltaTime);
    paddle.draw(ctx);

    requestAnimationFrame(gameLoop);
}

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
new InputHandler(paddle);
let lastTime=0;
paddle.draw(ctx);

gameLoop();
