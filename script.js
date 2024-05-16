const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

if(!context) alert('Canvas - error')
else{
    //usa a altura e largura default do navegador
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //console.log(canvas);
    //console.log(context);
}

class Limite {
    static largura = 40;
    static altura = 40;
    constructor({posicao}, ) {
        this.posicao = posicao;
        this.width = 40;
        this.height = 40;
    }

    draw() {
        context.fillStyle = 'blue';
        context.fillRect(
            this.posicao.x, this.posicao.y, this.width, this.height
        );
    }
}

class Player {
    constructor({ posicao,velocidade }) {
        this.posicao = posicao
        this.velocidade = velocidade
        this.radius = 15
    }

    draw() {
        context.beginPath()
        context.arc(this.posicao.x, this.posicao.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = 'yellow'
        context.fill()
        context.closePath()
    }

}

const mapa = [
    ['-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-']
];
const limites = [];

const player = new Player({
    posicao: {
        x:Limite.largura + Limite.largura / 2,
        y:Limite.altura + Limite.altura / 2
    },
    velocidade: {
        x: 0,
        y: 0
    }
})

mapa.forEach((linha, i) => {
   linha.forEach((simbolo, j) => {
        switch(simbolo){
            case '-': 
                limites.push(new Limite({
                    posicao: {
                        x: Limite.largura * j, 
                        y: Limite.altura * i
                    }
                }))
                break;
        }
   }) 
});

limites.forEach(limite => {
    limite.draw()
});

player.draw()