var bowser, bowserCorrendo;
var solo, soloImagem;

function preload(){
  bowserCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
  soloImagem = loadImage("ground2.png");
}

function setup(){
  createCanvas(600,200)
  
  bowser = createSprite(50,160,20,50);
  bowser.addAnimation("correndo",bowserCorrendo);
  bowser.scale = 0.5;

  solo = createSprite(200,180,400,20);
  solo.addImage("chão",soloImagem);
  solo.x = solo.width/2;

  borda = createEdgeSprites();
}

function draw(){
  background("lightgrey");

  if(keyDown("space")){
    bowser.velocityY = -12;
  }
  bowser.velocityY = bowser.velocityY + 1;

  solo.velocityX = -2;

  if(solo.x < 0){
    solo.x = solo.width/2;
  }
  
  bowser.collide(solo);
  drawSprites();
}
