let board;
let boardWidth=360;
let boardHeight=640;
let context;

let ballWidth=40;
let ballHeight=40;
let ballX=boardWidth/2-20;
let ballY=boardHeight/2;
let ballImg;

let ball={
    x:ballX,
    y:ballY,
    width:ballWidth,
    height:ballHeight
}

let collisionleft=false;
let collisionright=false;
let collisionup=false;
let collisionb=false;
let vY=-6;
let vX=6;

let bWidth=100;
let bHeight=40;
let bX=boardWidth/2-50;
let bY=boardHeight-70; //570
let bImg;

let b={
    x:bX,
    y:bY,
    width:bWidth,
    height:bHeight
}

let move=0;

let score=0;
let gameover=false;

window.onload=function(){
    board=document.getElementById("board");
    board.height=boardHeight;
    board.width=boardWidth;
    context=board.getContext("2d");

    ballImg=new Image();
    ballImg.src="./ball.png";
    ballImg.onload=function(){
        context.drawImage(ballImg, ball.x, ball.y, ball.width,  ball.height);
    }

    bImg=new Image();
    bImg.src="./b.png";
    bImg.onload=function(){
        context.drawImage(bImg, b.x, b.y, b.width,  b.height);
    }

    requestAnimationFrame(update);
    //setInterval(ballCollision,1500);
    document.addEventListener("keydown", moveb);
}

function update(){
    requestAnimationFrame(update);
    if(gameover){
        return;
    }

    context.clearRect(0,0,board.width,board.height);

    context.fillStyle="black";
    context.font="45px sans-serif";
    context.fillText(score, 10, 45);

    context.drawImage(bImg, b.x, b.y, b.width,  b.height);

    if(!collisionleft && !collisionright){
        ball.x+=vX;
        
    }
    if (!collisionup){
        ball.y+=vY;
    }
    
    
    if (ball.x<=0){
        collisionleft=true;
        collisionright=false;
    }
    if (ball.x>=boardWidth-ballWidth){
        collisionright=true;
        collisionleft=false;
    }
    if(collisionleft){
        vX=6;
        ball.x=Math.max(ball.x+vX,0);
    }
    if(collisionright){
        vX=-6;
        ball.x=Math.min(ball.x+vX,boardWidth-ballWidth);
    }
    
    if(ball.y<=0){
        collisionup=true;
        collisionb=false;
    }
    if(collisionup){
        vY=6;
        ball.y=Math.max(ball.y+vY,0);
    }
    collisionb=ballCollision(ball,b);
    if(collisionb){
        collisionup=false;
        vY=-6;
        ball.y=Math.min(ball.y+vY,boardHeight);
        score+=1;
    }

    context.drawImage(ballImg, ball.x, ball.y, ball.width,  ball.height);

    if (ball.y>=boardHeight){
        gameover=true;
    }

    if(gameover){
        context.font="35px sans-serif";
        context.fillText("GAME OVER", boardWidth/2-110, boardHeight/2);
    }
    
}

function moveb(e){
    if(e.code=="ArrowLeft" && b.x>=5){
        move=-10;
    } 
    else if(e.code=="ArrowRight" && b.x<=boardWidth-bWidth-5){
        move=10;
    }
    else {
        move=0;
        bigger=0;
    }
    b.x+=move;

    if(gameover){
        ball.y=ballY;
        ball.x=ballX;
        b.y=bY;
        b.x=bX;
        score=0;
        gameover=false;
    }
}

function ballCollision(a,b){
    return a.x<b.x+b.width&&
           a.x+a.width>b.x&&
           a.y<b.y+b.height&&
           a.y+a.height>b.y;
}