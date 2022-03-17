var bowser, bowserCorrendo;
var solo, soloImagem;
var soloInvisivel;
var nuvem, nuvemImagem;
var bowser1, bowser2, bowser3, bowser4, bowser5, bowser6;
var pontos;

function preload(){

   bowserCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
   soloImagem = loadImage("ground2.png");
   nuvemImagem = loadImage("cloud.png");
   bowser1 = loadImage("obstacle1.png");
   bowser2 = loadImage("obstacle2.png");
   bowser3 = loadImage("obstacle3.png");
   bowser4 = loadImage("obstacle4.png");
   bowser5 = loadImage("obstacle5.png");
   bowser6 = loadImage("obstacle6.png");
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

   pontos = 0;

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

   criarCactos();

   drawSprites();

   fill("black");
   text("Pontuação: "+pontos,500,50);
   pontos = pontos + Math.round(frameCount/60);

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
   nuvem.lifetime = 200;
}
}

function criarCactos(){
  if(frameCount % 60 === 0){
     var bowsermau = createSprite(600,165,10,40);
     bowsermau.velocityX = -6;
     var numero = Math.round(random(1,6));
     switch(numero){
        case 1: bowsermau.addImage(bowser1);
        break;
        case 2: bowsermau.addImage(bowser2);
        break;
        case 3: bowsermau.addImage(bowser3);
        break;
        case 4: bowsermau.addImage(bowser4);
        break;
        case 5: bowsermau.addImage(bowser5);
        break;
        case 6: bowsermau.addImage(bowser6);
        break;
        default: break;
     }
     bowsermau.scale= 0.5;
     bowsermau.lifetime = 300;
  }
}