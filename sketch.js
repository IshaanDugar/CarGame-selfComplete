var car, car_img;
var road, roadbg;
var gameState = 'initial';
var npcCar, npcCar2, npcCarGrp, npcImg;
var score = 0;
var gameOver, gameOverimg;
var restart, restartimg;

function preload(){
    roadbg = loadImage('finaltest.jpeg');
    car_img = loadImage('car1.png');
    npcImg = loadImage('car2.png');
    gameOverimg = loadImage('gameover.jpg');
    restartimg = loadImage('restart.png');
}

function setup(){
    var canvas = createCanvas(1000, 800);

    npcCarGrp = createGroup();

    car = createSprite(400, 650, 50, 50);
    car.addImage('car', car_img);

    road = createSprite(400, 400, 800, 800);
    road.y = road.height/2;
    road.addImage('road', roadbg);
    road.scale = 2.5;
    road.velocityY =  (6 + 3*score/100);

    gameOver = createSprite(400, 200, 50, 50);
    gameOver.addImage('over', gameOverimg);
    gameOver.visible = false;

    restart = createSprite(400, 400, 50, 50);
    restart.addImage('retry', restartimg);
    restart.scale = 0.8;
    restart.visible = false;

}

function draw(){
    background(255, 255, 255);

    textSize(40);
  

    if(gameState === 'initial'){
        score = 0;
        road.velocityY = 0;
        npcCarGrp.setVelocityYEach(0);
        npcCarGrp.setLifetimeEach(-2)
        textSize(40);
        fill("white");
        text("PRESS SPACE TO PLAY", 750, 400);
        if(keyDown("space")){
            gameState = 'play';
        }
    }

    if(gameState === 'play'){
        gameOver.visible = false;
        restart.visible = false;    
        road.velocityY =  (6 + 3*score/100);
        if(road.y > 550){
            road.y = road.height/2;
        }
        car.depth = road.depth;
        car.depth++;
        

        if(car.x > 600){
            car.x = 600;
        }
        if(car.x < 200){
            car.x = 200;
        }
        if(car.y < 20){
            car.y = 20;
        }
        if(car.y > 600){
            car.y = 600;
        }
        movementOfCar();
        spawnNPC();

        score = score + Math.round(getFrameRate()/60);

    }
    if(car.isTouching(npcCarGrp)){
        gameState = 'initial'
        score = 0;
        car.velocityX = 0;
        car.velocityY = 0;
        frameCount = 0;
        gameOver.visible = true;
        restart.visible = true;
    }

    if(mousePressedOver(restart)){
        score = 0
        gameState = 'play';
        npcCarGrp.destroyEach();
    }


    
    fill('red');    
    text('SCORE: ' + score, 700, 150);

    drawSprites();
}

function movementOfCar(){
    if(keyWentDown(RIGHT_ARROW)){
        car.velocityX = 4;
    }
    else if(keyWentDown(LEFT_ARROW)){
        car.velocityX = -4;
    }

    else if(keyWentDown(UP_ARROW)){
        car.velocityY = -4;
    }

    else if(keyWentDown(DOWN_ARROW)){
        car.velocityY = 4;
    }

    else if(keyWentUp(RIGHT_ARROW) || keyWentUp(LEFT_ARROW)){
        car.velocityX = 0;
    }
    else if(keyWentUp(UP_ARROW) || keyWentUp(DOWN_ARROW)){
        car.velocityY = 0;
    }
}

function spawnNPC(){
    if(frameCount % 100 === 0 && score < 500){
        var randX = random(170, 630);
        npcCar = createSprite(randX, 0, 20, 20);
        npcCar.addImage(npcImg);
        npcCar.velocityY =  (6 + 3*score/100);
        npcCar.lifetime = 200;
        npcCar.depth = road.depth;
        npcCar.depth++;

        npcCarGrp.add(npcCar);

    }

    else if(frameCount % 100 === 0 && score > 500){
        var randX = random(170, 630);
        npcCar = createSprite(randX, 0, 20, 20);
        npcCar2 = createSprite(randX, 0, 20, 20);
        npcCar.addImage(npcImg);
        npcCar2.addImage(npcImg);
        npcCar.velocityY =  (6 + 3*score/100);
        npcCar2.velocityY =  (6 + 3*score/150);
        npcCar.lifetime = 200;
        npcCar2.lifetime = 200
        npcCar.depth = road.depth;
        npcCar2.depth = road.depth;
        npcCar.depth++;
        npcCar2.depth++;

        npcCarGrp.add(npcCar);
        npcCarGrp.add(npcCar2);

    }
}