var bowser, bowserCorrendo;
var solo, soloImagem;
var soloInvisivel;
var nuvem, nuvemImagem;

function preload(){

   bowserCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
   soloImagem = loadImage("ground2.png");
   nuvemImagem = loadImage("cloud.png");
}

function setup(){

   createCanvas(600,200);

   solo = createSprite(200,180,400,20);
   solo.addImage("chão",soloImagem);
   solo.x = solo.width/2;

   bowser = createSprite(50,160,20,50);
   bowser.addAnimation("correndo",bowserCorrendo);
   bowser.scale = 0.5;

   soloInvisivel = createSprite(200,190,400,10);
   soloInvisivel.visible = false;

   borda = createEdgeSprites();

}

function draw(){

   background("darkgrey");

   if(keyDown("space") && bowser.y >= 150){
      bowser.velocityY = -12;
   }
   bowser.velocityY = bowser.velocityY + 1;

   solo.velocityX = -2;
   if(solo.x < 0){
      solo.x = solo.width/2;
   }

   bowser.collide(soloInvisivel);

   criarNuvens();

   drawSprites();

}

function criarNuvens(){
   if(frameCount % 60 === 0){
   nuvem = createSprite(600,100,40,10);
   nuvem.addImage(nuvemImagem);
   nuvem.scale = random(0.1, 1);
   nuvem.y = Math.round(random(10,120));
   nuvem.velocityX = -3;
   nuvem.depth = bowser.depth;
   bowser.depth = bowser.depth + 1;
}
}