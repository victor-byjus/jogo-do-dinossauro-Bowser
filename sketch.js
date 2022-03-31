//Aqui estamos criando as variáveis
var bowser, bowserCorrendo, bowserBateu;
var solo, soloImagem;
var soloInvisivel;
var nuvem, nuvemImagem;
var bowser1, bowser2, bowser3, bowser4, bowser5, bowser6;
var pontos;
var grupodenuvens;
var grupodecactos;
var PLAY = 1;
var GAMEOVER = 0;
var estadodojogo = PLAY;
var acabouSprite, acabouImagem;
var restartSprite, restartImagem;

//Aqui estamos carregando os arquivos(imagem, animação e sons)
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
   bowserBateu = loadAnimation("trex_collided.png");
   acabouImagem = loadImage("gameOver.png");
   restartImagem = loadImage("restart.png");
}

//Essa é a função de configuração
function setup(){
   //Cria a tela
   createCanvas(600,200);
   //Cria e configura o solo
   solo = createSprite(200,180,400,20);
   solo.addImage("chão",soloImagem);
   solo.x = solo.width/2;
   //Cria e configura o dinossauro bowser
   bowser = createSprite(50,160,20,50);
   bowser.addAnimation("correndo",bowserCorrendo);
   bowser.addAnimation("bateu",bowserBateu);
   bowser.scale = 0.5;
   bowser.debug = false;
   bowser.setCollider("circle", 0, 0, 40);
   //cria e configura o solo invisível
   soloInvisivel = createSprite(200,190,400,10);
   soloInvisivel.visible = false;
   //cria as bordas da tela
   borda = createEdgeSprites();
   //pontuação inicia zerada
   pontos = 0;
   //cria os grupos de nuvens e cactos
   grupodenuvens = new Group();
   grupodecactos = new Group();
   //Cria e configura o texto de game over
   acabouSprite = createSprite(300,100);
   acabouSprite.addImage(acabouImagem);
   acabouSprite.scale = 0.5;
   //Cria e configura o botão de restart
   restartSprite = createSprite(300,140);
   restartSprite.addImage(restartImagem);
   restartSprite.scale = 0.5;

}

//Função de desenho
function draw(){
   //pinta o fundo de cinza escuro
   background("darkgrey");
   //Define as configurações para o estado PLAY
   if(estadodojogo === PLAY){
      //Game over e restart ficam invisíveis
      acabouSprite.visible = false;
      restartSprite.visible = false;
      //Movimenta o solo infinito
      solo.velocityX = -2;
      if(solo.x < 0){
         solo.x = solo.width/2;
      }
      //Faz o bowser pular
      if(keyDown("space") && bowser.y >= 150){
         bowser.velocityY = -12;
      }
      //Sistema de gravidade
      bowser.velocityY = bowser.velocityY + 1;
      //Chama a função para criar as nuvens
      criarNuvens();
      //Chama a função para criar os cactos
      criarCactos();
      //Aumenta a pontuação do jogador
      pontos = pontos + Math.round(frameCount/60);
      //Verifica se o dinossauro bateu no cacto
      if(grupodecactos.isTouching(bowser)){
         //Muda o estado do jogo para GAMEOVER
         estadodojogo = GAMEOVER;
         //Muda a imagem do bowser para assustado
         bowser.changeAnimation("bateu");
      }
   }
   //Define as configurações para o estado GAMEOVER
   else if(estadodojogo === GAMEOVER){
      //Faz o texto de gameover e o botão de restart aparecerem
      acabouSprite.visible = true;
      restartSprite.visible = true;
      //Faz o solo ficar parado
      solo.velocityX = 0;
      //Faz o bowser ficar parado no ar
      bowser.velocityY = 0;
      //Faz os grupos de cactos e nuvens ficarem parado
      grupodenuvens.setVelocityXEach(0);
      grupodecactos.setVelocityXEach(0);
      //Faz os grupos de cactos e nuvens não desaparecerem
      grupodenuvens.setLifetimeEach(-1);
      grupodecactos.setLifetimeEach(-1);
   }
   //Faz o bowser não sair da tela
   bowser.collide(soloInvisivel);
   //Desenha Todos os sprites
   drawSprites();
   //Configura e coloca o texto dos pontos na tela
   fill("black");
   text("Pontuação: "+pontos,500,50);
   

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
   grupodenuvens.add(nuvem);
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
     grupodecactos.add(bowsermau);
  }
}