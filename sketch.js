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
var somDoPulo, somDaMorte, somDoCheckPoint;

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
   somDoPulo = loadSound("jump.mp3");
   somDaMorte = loadSound("die.mp3");
   somDoCheckPoint = loadSound("checkPoint.mp3");
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
   console.log("até aqui o código funcionou");
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
      //Toca o som a cada 100 pontos
      if(pontos > 0 && pontos % 100 === 0){
         somDoCheckPoint.play();
      }
      //Game over e restart ficam invisíveis
      acabouSprite.visible = false;
      restartSprite.visible = false;
      //Movimenta o solo infinito
      solo.velocityX = -(4+pontos/100);
      if(solo.x < 0){
         solo.x = solo.width/2;
      }
      //Faz o bowser pular
      if(keyDown("space") && bowser.y >= 150){
         bowser.velocityY = -12;
         somDoPulo.play();
      }
      //Sistema de gravidade
      bowser.velocityY = bowser.velocityY + 1;
      //Chama a função para criar as nuvens
      criarNuvens();
      //Chama a função para criar os cactos
      criarCactos();
      //Aumenta a pontuação do jogador
      pontos = pontos + Math.round(frameRate()/60);
      //Verifica se o dinossauro bateu no cacto
      if(grupodecactos.isTouching(bowser)){
         //Muda o estado do jogo para GAMEOVER
         estadodojogo = GAMEOVER;
         //Muda a imagem do bowser para assustado
         bowser.changeAnimation("bateu");
         //Toca o som de quando o bowser morre
         somDaMorte.play();
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
      //Faz os grupos de cactos e nuvens ficarem parados
      grupodenuvens.setVelocityXEach(0);
      grupodecactos.setVelocityXEach(0);
      //Faz os grupos de cactos e nuvens não desaparecerem
      grupodenuvens.setLifetimeEach(-1);
      grupodecactos.setLifetimeEach(-1);
      //Se o mouse aperta o botão de restart, o jogo recomeça
      if(mousePressedOver(restartSprite)){
         resetar();
      }
   }
   //Faz o bowser não sair da tela
   bowser.collide(soloInvisivel);
   //Desenha todos os sprites
   drawSprites();
   //Configura e coloca o texto dos pontos na tela
   fill("black");
   text("Pontuação: "+pontos,500,50);
}

//Função responsável por resetar o jogo
function resetar(){
   //Volta o estado do jogo para o modo PLAY
   estadodojogo = PLAY;
   //Destrói as nuvens e os cactos
   grupodenuvens.destroyEach();
   grupodecactos.destroyEach();
   //Muda a animação do Bowser para correndo novamente
   bowser.changeAnimation("correndo", bowserCorrendo);
   //Zera a pontuação
   pontos = 0;
}

//Função responsável por criar as nuvens
function criarNuvens(){
   //Cria nuvens a cada 60 frames
   if(frameCount % 60 === 0){
   //Cria o sprite da nuvem
   nuvem = createSprite(600,100,40,10);
   //Adiciona a imagem de nuvem ao sprite criado
   nuvem.addImage(nuvemImagem);
   //Faz as nuvens terem tamanhos aleatórios
   nuvem.scale = random(0.1, 1);
   //Faz as nuvens terem posições aleatórios
   nuvem.y = Math.round(random(10,120));
   //Faz as nuvens se moverem
   nuvem.velocityX = -3;
   //Ajusta a profundidade das nuvens
   nuvem.depth = bowser.depth;
   bowser.depth = bowser.depth + 1;
   //Define um tempo de vida máximo para a nuvem
   nuvem.lifetime = 200;
   //Adiciona o sprite da nuvem ao grupo
   grupodenuvens.add(nuvem);
}
}

//Função responsável por criar os cactos
function criarCactos(){
  //Faz os cactos surgirem a cada 60 frames
  if(frameCount % 60 === 0){
     //Cria o sprite dos cactos (nome: bowsermau)
     var bowsermau = createSprite(600,165,10,40);
     //Faz os cactos se moverem de acordo com os pontos
     bowsermau.velocityX = -(6+pontos/100);
     //Cria um número aleatório arredondado entre 1 e 6
     var numero = Math.round(random(1,6));
     //Muda a imagem do cacto de acordo com o número
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
     //Ajusta o tamanho do cacto
     bowsermau.scale= 0.5;
     //Define o tempo de vida máximo para o cacto
     bowsermau.lifetime = 300;
     //Adiciona o sprite do cacto ao grupo de cactos
     grupodecactos.add(bowsermau);
  }
}