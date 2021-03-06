var back,backImg;
var monkey,monImg,mon;
var obstacle,o1;
var banana,b1;
var PLAY;
var END;
var score;
var invisibleGround;
var gameState;
var bananaGroup;
var ObstacleGroup;

function preload(){
  backImg=loadImage("jungle.jpg");
  monImg=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  o1=loadImage("obstacle.png");
  b1=loadImage("banana.png");
  mon=loadAnimation("sprite_0.png");
}


function setup() {
  createCanvas(displayWidth-500,displayHeight-300);
  back=createSprite(100,100,400,400);
  back.addImage(backImg);
 
  back.scale=1;
  
 monkey=createSprite(75,300,20,20);
  monkey.addAnimation("running",monImg);
  monkey.scale=0.3;
 
  ObstaclesGroup=createGroup;
  score=0;
  PLAY=1;
  END=0;
  gameState=PLAY;
  invisibleGround=createSprite(200,380,600,10);
  invisibleGround.visible=false;
   bananaGroup = new Group();
  ObstacleGroup=new Group();
}




function draw() {
  background("white");
  back.velocityX=-4;
  
   monkey.velocityY=monkey.velocityY+0.8;
  
  
  
if(back.x<80){
  back.x=150
}
  
  
  if(keyDown("space") && monkey.y>250){
    monkey.velocityY=-15 ;
  }
 
   monkey.collide(invisibleGround);
  
   if(gameState === PLAY){
    
   spawnObstacles();
  
  spawnBanana();
  
  

  if (monkey.isTouching(bananaGroup)) {
   score=score+1;
   bananaGroup.destroyEach();
  }
   }
   
    if(ObstacleGroup.isTouching(monkey)){
      
     gameState=END;
  
       monkey.addAnimation("running",mon);
      monkey.changeAnimation("running",mon);
      monkey.scale=0.2  ;
      monkey.velocityY=0;
     
    }
  
  

  
  monkey.setCollider("circle",10,10,200);
 
  if(gameState===END){
  back.velocityX=0;
    back.velocityY=0;
    bananaGroup.setVelocityXEach(0);
      ObstacleGroup.setVelocityXEach(0);
      ObstacleGroup.destroyEach()
      bananaGroup.destroyEach()
    
  }
 
  camera.position.y=monkey.y
  camera.position.x=monkey.x
  drawSprites();
  
  text("SCORE:"+score,400,30);

}

function spawnObstacles(){
  if(frameCount % 200 ===0){
    
   obstacle = createSprite(600,350,10,40);
    obstacle.velocityX = -6;
    
   obstacle.addImage(o1);
    
    obstacle.scale=0.15;
    ObstacleGroup.add(obstacle);
    
   
  }
}


function spawnBanana(){
  if(frameCount % 100 ===0){
    
   banana = createSprite(600,150,10,40);
    banana.velocityX = -5;
    banana.y=random(100,150);
    
   banana.addImage(b1);
    
   banana.scale=0.25;
   
     bananaGroup.add(banana);
    
   
  }
}


