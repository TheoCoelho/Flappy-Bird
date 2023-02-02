const som_punch = new Audio()
som_punch.src = './punch.wav'

let animation_frame = 0

const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('#game-canvas')
const contexto = canvas.getContext('2d')

const jogo={}
    function inicializa(){
        jogo.flappyBird = criaflappybird()
        jogo.fundo = criafundo()
        jogo.chao = criachao()
        jogo.canos = criacanos()
        jogo.placar = criaplacar()
    }


function fazColisaoObstaculo(par){
    if (jogo.flappyBird.x >= par.x){
        const alturaCabecaFlappy = jogo.flappyBird.y
        const alturaPeFlappy = jogo.flappyBird.y + jogo.flappyBird.altura
        const bocaCanoCeuY = par.y + jogo.canos.altura
        const bocaCanoChaoY = par.y + jogo.canos.altura + jogo.canos.espacamentoentrecanos
        if(alturaCabecaFlappy <=  bocaCanoCeuY){
            return true
        }
        if(alturaPeFlappy >= bocaCanoChaoY){
            return true
        }
    }
}
function criaflappybird(){
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 35,
        altura: 25, 
        x: 10,
        y: 50,
        pulo: 4.6, 
        pula() {
            flappyBird.velocidade = -flappyBird.pulo
        },

        desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
            )
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza(){
            if(fazColisao()){
                som_punch.play()
                telaAtiva = TelaGameOver
                return;
            }
            flappyBird.velocidade += flappyBird.gravidade
            flappyBird.y = flappyBird.y + flappyBird.velocidade
            flappyBird.atualizaframe()
        },
        movimentos:[
            {spriteX: 0, spriteY:0,},
            {spriteX: 0, spriteY:26,},
            {spriteX: 0, spriteY:52,},
            {spriteX: 0, spriteY:26,},

        ],
        frameatual:0,
        atualizaframe(){
            if((animation_frame % 7)===0){
            flappyBird.frameatual = flappyBird.frameatual + 1
            flappyBird.frameatual = flappyBird.frameatual % flappyBird.movimentos.length
            flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameatual].spriteX
            flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameatual].spriteY 
            }
        }
    }
    return flappyBird
}

function fazColisao(){
   if( jogo.flappyBird.y + jogo.flappyBird.altura > jogo.chao.y){
       return true
   }
   else{
       return false
   }
}
function criacanos(){
    const canos={
        largura: 52,
        altura: 400,
        ceu:{
            spriteX: 52,
            spriteY: 169,
            x: 120,
            y: -150
        },
        chao:{
            spriteX: 0,
            spriteY: 169
        },
        pares:[],
        espacamentoentrecanos:120,
        
        desenha(){
            const espacamentoentrecanos = 80;
            for(i=0;i<canos.pares.length;i++){
                canos.ceu.x =canos.pares[i].x
                canos.ceu.y = canos.pares[i].y
            
            contexto.drawImage(
                sprites,
                canos.ceu.spriteX,canos.ceu.spriteY,
                canos.largura,canos.altura,
                canos.ceu.x,canos.ceu.y,
                canos.largura,canos.altura, 
            )
            const canochaoX = canos.ceu.x
            const canochaoY = canos.altura+espacamentoentrecanos + canos.ceu.y
            contexto.drawImage(
                sprites,
                canos.chao.spriteX, canos.chao.spriteY,
                canos.largura, canos.altura,
                canochaoX, canochaoY,
                canos.largura,canos.altura
            )
        }

    },
        atualiza(){
            console.log("Numero de obstáculos: " + canos.pares.length)
            const passou100Frames = (animation_frame % 100 === 0)
            if (passou100Frames){
                const novoPar = {
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                }
                canos.pares.push(novoPar)
            }

            for(i=0;i<canos.pares.length;i++){
                const par = canos.pares[i]
                par.x = par.x -2

            if(par.x + canos.largura <= 0){
                canos.pares.shift()
            }

            if(fazColisaoObstaculo(par)){
                som_punch.play()
                telaAtiva = TelaGameOver
                return
                
            }

            }
        }

    }
    return canos
}
function criafundo(){
    const fundo = {
        spriteX: 390,
        spriteY: 0,
        largura: 276,
        altura: 204, 
        x: 0,
        y: 480 - 204,

        desenha(){
        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0,0,canvas.width, canvas.height)
        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            fundo.x, fundo.y,
            fundo.largura, fundo.altura,
            )
        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            fundo.x + fundo.largura, fundo.y,
            fundo.largura, fundo.altura,
            )
        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            fundo.x + fundo.largura, fundo.y,
            fundo.largura, fundo.altura,
            )
        },
        atualiza(){
            if((animation_frame % 10)===0){
                fundo.x = fundo.x - 0.5
                fundo.x = fundo.x %(fundo.largura /2)
            }
        }
    }
    return fundo
}

function criachao(){
    const chao = {
        spriteX: 0,
        spriteY: 613,
        largura: 224,
        altura: 109, 
        x: 0,
        y: 370,
        
        desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
            )
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x + chao.largura, chao.y,
            chao.largura, chao.altura,
                )
        },
        atualiza(){
            chao.x = chao.x -1
            chao.x = chao.x %(chao.largura /2)
        }
    }
    return chao
}
function criaplacar(){
    const placar = {
        pontos: 0,
        desenha(){
            contexto.font = '18px "Orbitron"'
            contexto.textAlign = 'right'
            contexto.fillStyle = 'white'
            contexto.fillText("Pontuação: " + placar.pontos, 145, 35)
        },
        atualiza(){
            const intervaloDeFrames = 20
            const passouIntervalo = animation_frame % intervaloDeFrames === 0
            if(passouIntervalo){
                placar.pontos = placar.pontos + 1
            }

        }

    }
    return placar
}

const gameOver ={
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: 50,
    y: 70,
    desenha(){
        contexto.drawImage(
            sprites,
            gameOver.spriteX, gameOver.spriteY,
            gameOver.largura, gameOver.altura,
            gameOver.x, gameOver.y,
            gameOver.largura, gameOver.altura
        )
    }
}

const TelaGameOver ={
    desenha(){
        gameOver.desenha()
    },
    click(){

        inicializa()
        telaAtiva = telajogo

    }
}

const inicio = {
    spriteX: 130,
    spriteY: 0,
    largura: 180,
    altura: 152, 
    x: 70,
    y: 70,
        
        desenha(){
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura,
            )
        }
}

const telainicio ={
    desenha(){
        jogo.fundo.desenha()
        jogo.chao.desenha()
        jogo.flappyBird.desenha()
        inicio.desenha()
    },
    click(){
        telaAtiva =telajogo
    }
}

const telajogo = {
    desenha(){
     
        jogo.fundo.atualiza()
        jogo.fundo.desenha()
        jogo.canos.desenha()
        jogo.canos.atualiza()
        jogo.chao.desenha()
        jogo.chao.atualiza()
        jogo.flappyBird.desenha()
        jogo.flappyBird.atualiza()
        jogo.placar.desenha()
        jogo.placar.atualiza()
   
     
    },
    click(){
        jogo.flappyBird.pula()
    }
}

var telaAtiva = telainicio

function mudatelaAtiva(){
    telaAtiva.click()
}

window.addEventListener("click", mudatelaAtiva)


function loop(){
    telaAtiva.desenha()
    requestAnimationFrame(loop)
    animation_frame = animation_frame + 1
}
inicializa()


loop();