var player, playerIMG;
var enemy, enemyIMG, enemyGroup;
var barrier;
var bluelaser, laserGroup, laserSound;
var hp=100;
var score=0;

var back, backIMG;

var gameState=0;
var start=0;
var play=1;
var end=2;

function preload(){
  
  playerIMG= loadImage("Spaceship.png");
  
  backIMG= loadImage("space.jpg")
  
  enemyIMG= loadImage("enemy.png");
  
  blueIMG= loadImage("bluelaser.png");
  
  laserSound= loadSound("heat-vision.mp3")
  
}

function setup() {
  createCanvas(400, 450);
 
  back=createSprite(200,200,20,20);
  back.addImage(backIMG);
  back.scale=0.8; 
  back.velocityY=2
  
  
  player=createSprite(200,400,20,20);
  player.addImage(playerIMG)
  player.scale=0.2;
  
  barrier= createSprite(200,375,500,10);
  barrier.visible=false;
  
  enemyGroup=new Group();
  laserGroup= new Group();
  

}

function draw() {
  background("white");
  
  if(back.y>400){
    back.y=200;
  }


  if(player.x<0||player.x>400){
    if(player.x<0){
      player.x=10;
    }
    if(player.x>400){
      player.x=390;
    }
    
  }
  
  if(gameState==start){
    

    
    if(keyDown("s")||keyDown("S")){
      gameState=play;
   
    }
  }else
    
  if(gameState==play){
      if(keyDown("LEFT_ARROW")){
    player.velocityX=-6;
  }
  
   if(keyDown("RIGHT_ARROW")){
    player.velocityX=6;
  }
  

  
  if(keyWentUp("LEFT_ARROW")||keyWentUp("RIGHT_ARROW")){
    player.velocityX=0;
  }

  if(enemyGroup.isTouching(laserGroup)){
    enemyGroup.destroyEach();
    laserGroup.destroyEach();
    score++;
  }

  if(enemyGroup.isTouching(barrier)){
    enemyGroup.destroyEach();
    hp=hp-20;
  }
  
    if(hp==0){
      gameState=end;
    }
  
  blueLaser();
  createEnemy();
  
  } else
    
  if(gameState==end){
    
     back. velocityY=0;
    player.velocityX=0;
    
    if(keyDown("r")||keyDown("R")){
      gameState=start;
      hp=100;
      score=0;
      player.x=200;
      back.velocityY=2;
    }
  }  
  

  
  
  drawSprites();
  
  stroke("red")
  textSize(20)
  text("score:"+score,20,20);
  text("hp:"+hp,300,20);
  
  if(gameState==start){
   stroke("red");
    textSize(20)
    text("⚠ Aliens are invading Earth ⚠",75,100);
    text("Protect your Planet",115,150)
    text("Press S to start",125,300);
    text("Use space to shoot and arrows to move",25,250);
  }
  
  if(gameState==end){
    text("Game Over!",150,100);
    text("Press R to retry",135,150);
  }
  
}

function createEnemy(){
  
  if(frameCount%100==0){
    enemy=createSprite(random(25,375),-50,20,20);
    enemy.addImage(enemyIMG);
    enemy.scale=0.3;
    
    enemy.velocityY=(3+(score/5));
    
    enemy.lifeTime=125;
    
    
    //enemy.debug=true;
    
    enemyGroup.add(enemy);
  }
}

function blueLaser(){
  
  if(keyWentDown("space")){
    bluelaser=createSprite(player.x,player.y-10,20,20);
    bluelaser.addImage(blueIMG);
    bluelaser.scale=0.15;
    
    bluelaser.velocityY=-6;
    
    laserSound.play();
    
    //bluelaser.debug=true
    bluelaser.setCollider("rectangle",0,0,30,20)
   
    laserGroup.add(bluelaser);

  }
}













