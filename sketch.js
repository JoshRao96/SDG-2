var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, WW, WWImage;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var bullet, bulletImg;

var bulletGroup;

var zombieGroup,WWGroup;

var hearts = [];

var life = 3;

var gameState = 0;


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")
  WWImage = loadImage("assets/WW-removebg-Preview.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4
    hearts.push(heart1);
    

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4
    hearts.push(heart2);

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
    hearts.push(heart3);
   

    //creating group for zombies    
    zombieGroup = new Group();
    WWGroup = new Group();
    bulletGroup = new Group();
}

function draw() {
  background(0); 

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  
  player.addImage(shooter_shooting)
  
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
      life -= 1;
       if (life = 2) {
         heart3.destroy();
       }
       
       if (life = 1) {
        heart2.destroy();
      }

      if (life = 0) {
        heart1.destroy();
        player.destroy();
      }
       } 
 }
}




/* if(WWGroup.isTouching(player)){
 

  for(var i=0;i<WWGroup.length;i++){     
       
   if(WWGroup[i].isTouching(player)){
        WWGroup[i].destroy()
        } 
  }
 } */

//calling the function to spawn zombies
enemy();
WWEnemy();
bulletSpawner();
handleBullets();

drawSprites();
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(Math.round(random(width/2+600,width/2+1000)),Math.round(random(height/2-600,width/2+200)),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}

function WWEnemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    WW = createSprite(Math.round(random(width/2+600,width/2+1000)),Math.round(random(height/2-600,width/2+200)),40,40)

    WW.addImage(WWImage)
    WW.scale = 0.5
    WW.velocityX = -5
    WW.debug= true
    WW.setCollider("rectangle",0,0,400,400)
   
    WW.lifetime = 400
   WWGroup.add(WW)
  }

}

function bulletSpawner(){
  if(keyWentDown("space")){

    //giving random x and y positions for zombie to appear
    bullet = createSprite(player.x + 20, player.y - 25, 20, 10)

    //zombie.addImage(zombieImg)
    //zombie.scale = 0.15
    bullet.velocityX = +3
    bullet.debug= true
    //zombie.setCollider("rectangle",0,0,400,400)
   
    bullet.lifetime = 500
   bulletGroup.add(bullet)
  }

}

function handleBullets() {
  
  bulletGroup.overlap(zombieGroup, function(bulletGroup, zombieGroup) {
    zombie.remove();
    bullet.remove();
  });
}