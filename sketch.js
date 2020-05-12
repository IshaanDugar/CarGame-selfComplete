var car, car_img;
var road, roadbg;
var gameState = 'play';
var npcCar, npcCarGrp, npcImg;
var score = 0;

function preload(){
    roadbg = loadImage('finaltest.jpeg');
    car_img = loadImage('car1.png');
    npcImg = loadImage('car2.png')
}

function setup(){
    var canvas = createCanvas(800, 800);

    npcCarGrp = createGroup();

    car = createSprite(400, 650, 50, 50);
    car.addImage('car', car_img);

    road = createSprite(400, 400, 800, 800);
    road.y = road.height/2;
    road.addImage('road', roadbg);
    road.scale = 2.5;
    road.velocityY =  (6 + 3*score/100);

}

function draw(){
    background(255, 255, 255);
  

    if(gameState === 'initial'){
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
        if(road.y > 550){
            road.y = road.height/2;
        }
        car.depth = road.depth;
        car.depth++;
        

        if(car.x > 750){
            car.x = 630;
        }
        else if(car.x < 170){
            car.x = 170;
        }
        else if(car.y < 20){
            car.y = 20;
        }
        else if(car.y > 600){
            car.y = 600;
        }
        movementOfCar();
        spawnNPC();

        if(car.isTouching(npcCarGrp)){
            gameState = 'initial'
            score = 0;
        }

        
    }


    score = score + Math.round(getFrameRate()/60);

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
    if(frameCount % 100 === 0){
        var randX = random(170, 630);
        npcCar = createSprite(randX, 0, 20, 20);
        npcCar.addImage(npcImg);
        npcCar.velocityY =  (6 + 3*score/100);
        npcCar.lifetime = 200;
        npcCar.depth = road.depth;
        npcCar.depth++;

        npcCarGrp.add(npcCar);

    }
}