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

const mapa = [
    ['-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-']
];
const limites = [];

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