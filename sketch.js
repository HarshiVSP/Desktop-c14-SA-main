var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstacles, obstacleImage1,obstacleImage2,obstacleImage3,obstacleImage4, obstacleImage5,obstacleImage6
var gameover, gameoverImg
var restart, restartImg

var newImage;
var score=0
var Play=0
var end=1
var gamestate=Play
var cloudsGroup
var obstaclesGroup
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
 obstacleImage1=loadImage("obstacle1.png")
 obstacleImage2=loadImage ("obstacle2.png")
 obstacleImage3=loadImage ("obstacle3.png")
 obstacleImage4=loadImage ("obstacle4.png")
 obstacleImage5=loadImage ("obstacle5.png")
 obstacleImage6=loadImage ("obstacle6.png")
gameoverImg=loadImage("gameOver.png")
restartImg=loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);


  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running)
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  gameover=createSprite(300,60,20,20)
gameover.addImage("over", gameoverImg)
gameover.scale=0.5

restart=createSprite(300,90,15,15)
restart.addImage("restart",restartImg)
restart.scale=0.3
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  cloudsGroup= new Group()
  obstaclesGroup= new Group()
  trex.debug=false
  trex.setCollider("circle", 0, 0, 55)
  console.log("Hello"+ 5)
  
}

function draw() {
  background(180);
  textSize(25)
  text("Score:"+score,320,30)
  
  
  
  
  trex.collide(invisibleGround);
  
  
 
  if(gamestate===Play){
    score=score+Math.round(getFrameRate()/60)
    if(keyDown("space")&&trex.y>=145){
      trex.velocityY=-10
    }
gameover.visible=false
restart.visible=false
    trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  //spawn the clouds
  spawnClouds();
  spawnobstacles();
  if(trex.isTouching(obstaclesGroup)){
    gamestate=end
  }
  }
  
  else if(gamestate===end){
  score=0
  ground.velocityX=0
  trex.velocityY=0
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  obstaclesGroup.setLifetimeEach(-1)
  cloudsGroup.setLifetimeEach(-1)
  trex.changeAnimation("collided", trex_collided)
  gameover.visible=true
  restart.visible=true
  if(mousePressedOver(restart)){
    restartGame()
    
  } 
  }
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloudsGroup.add(cloud)
    
    //assigning lifetime to the variable

    cloud.lifetime = 200
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
  }

    function spawnobstacles(){

     
      if(frameCount%40===0){
      obstacles=createSprite(540,165,10,40)
      obstacles.velocityX=-6
      obstacles.scale=0.5
      obstacles.lifetime=90
      obstaclesGroup.add(obstacles)
      var rand=Math.round(random(1,6))
      switch(rand){
        case 1: obstacles.addImage(obstacleImage1)
        break;
        case 2: obstacles.addImage(obstacleImage2)
        break;
        case 3: obstacles.addImage(obstacleImage3)
        break;
        case 4: obstacles.addImage(obstacleImage4)
        break;
        case 5: obstacles.addImage(obstacleImage5)
        break;
        case 6: obstacles.addImage(obstacleImage6)
        break;

        default: break

      }
    }
}

function restartGame(){
  gameState=Play;
score=0
obstaclesGroup.destroyEach()
cloudsGroup.destroyEach()
trex.changeAnimation("running", trex_running)
}
