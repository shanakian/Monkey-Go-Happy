
var monkey , monkey_running, monkey_collided

var ground, invisibleGround;

var banana ,bananaImage, obstacle, obstacleImage

var bananaGroup, obstacleGroup

var score, survivalTime;

var gameState = 1

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided= loadAnimation("sprite_0.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  obstaclesGroup= new Group();
  bananasGroup= new Group();
 
}



function setup() {
  createCanvas(600,300);
  
  monkey= createSprite(30,240,20,20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale=0.1

  ground= createSprite(300,285,120000,10)
  ground.shapeColor= "brown"
  ground.velocityX=-5;
  invisibleGround= createSprite(300,287,1200,10);
  invisibleGround.visible= false;
  
  survivalTime=0;
  score=0;
  
}


function draw() {
  background("white");
  
  if (gameState === 1){
    
    if(monkey.isTouching(bananasGroup)){
      score=score+1
      bananasGroup.destroyEach();
    }
    
    if(frameCount%12===0){
      survivalTime=survivalTime+1
    }
    
    //why isn't the monkey jumping. I got him to jump by doing this when I tried last time.
     if(keyDown("space")&& monkey.y>250) {
        monkey.velocityY = -12;
    }
    console.log(monkey.y);
    monkey.velocityY= monkey.velocityY+0.5;
    
    monkey.collide(invisibleGround);
    
    if(ground.x>0){
       ground.x=ground.width/2;
       }
    
    obstaclesANDbananas();
    
  }
  if(monkey.isTouching(obstaclesGroup)){
    gameState=0;
  }
  
  if(gameState===0){
    
    monkey.velocityY=0
    bananasGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    ground.velocityX=0;
    
    monkey.changeAnimation("collided", monkey_collided);
    
    reset();
    
  }
  
  drawSprites();
  
  text("Survival Time:"+ survivalTime,270,20);
  text("Score:"+ score, 500,20)
}

function obstaclesANDbananas(){
  if(frameCount%80===0){
    obstacle= createSprite(600,243,20,20);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-5;
    obstaclesGroup.add(obstacle);
    obstacle.depth= ground.depth;
    ground.depth= ground.depth+1;
    
    banana= createSprite(600,180,50,50);
    banana.y=Math.round(random(140,180));
    banana.addImage("banana",bananaImage);
    banana.scale= 0.1;
    banana.velocityX=-5
    bananasGroup.add(banana);

  }
}

function reset(){
  if(keyDown("space")){
    
    gameState=1;
    bananasGroup.setDestroyEach=true;
    obstaclesGroup.setDestroyEach=true;
    score=0;
    survivalTime=0;
    
  }
}


