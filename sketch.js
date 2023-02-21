// ===============start variaveis===============
//criando variaveis "let"
//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//variaveis da velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;
// ===============end variaveis===============

//variaveis da raqueteEsquerda
let xRaqueteE = 5;
let yRaqueteE = 150;

//variaveis da raqueteDireita
let xRaqueteD = 585;
let yRaqueteD = 150;
let velocidadeYD;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//chance de errar
let chanceDeErrar = 0;


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0); //1 - Desenha o background 
  mostraBolinha(); // 2 - Desenha a bolinha
  movimentaBolinha(); // 3 - Movimenta a Bolinha
  verificaColisaoBorda(); // 4 - Verifica Colisão da bolinha
  
  mostrarRaquetes(xRaqueteE, yRaqueteE);
  movimentaRaqueteE();
  verificaColisaoRaquete(xRaqueteE, yRaqueteE);
  
  mostrarRaquetes(xRaqueteD, yRaqueteD);
  movimentacaoRaqueteD();
  verificaColisaoRaquete(xRaqueteD, yRaqueteD);
  
  incluirPlacar();
  marcarPonto();
  
  
}


// ===============start functions===============
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro); //criamos a bolinha
}

function mostrarRaquetes(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha; //movimento da bolinha
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  //se bolinha estiver tocando a borda! a largura maxima da borda "width"
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  //se bolinha estiver tocando a borda! a altura maxima da borda "height"
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function movimentaRaqueteE(){
  if (keyIsDown(UP_ARROW)){
    yRaqueteE -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaqueteE += 10;
  }
}

function verificaColisaoRaqueteE(){
  if (xBolinha - raio < xRaqueteE + raqueteComprimento && yBolinha - raio < yRaqueteE + raqueteAltura && yBolinha + raio > yRaqueteE) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y){
  colidiu =
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu ) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}


function movimentacaoRaqueteD(){
  //velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  //yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  //calculaChanceDeErrar()
  if (keyIsDown(87)){
    yRaqueteD -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteD += 10;
  }
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255)
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcarPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
// ===============end functions===============