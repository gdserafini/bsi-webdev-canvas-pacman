const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

if(!context) alert('Canvas ')
else{
    //usa a altura e largura default do navegador
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //console.log(canvas);
    //console.log(context);
}

class Limite {
    constructor({posicao}, ) {
        this.posicao = posicao
        this.width = 40
        this.height = 40
    }

    draw() {
        context.fillStyle = 'blue'
        context.fillRect(this.posicao.x, this.posicao.y, this.width, this.height)
    }
}

const limites = [
    new Limite({
        posicao: {
            x: 0,
            y: 0
        }
    }),
    new Limite({
        posicao: {
            x: 41,
            y: 0
        }
    })
]

limites.forEach(limite => {
    limite.draw()
})