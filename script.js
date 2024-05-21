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
    update() {
        this.draw()
        this.posicao.x += this.velocidade.x
        this.posicao.y += this.velocidade.y
    }
}

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

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let lastKey = ''

const mapa = [
    ['-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-']
];

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

function animate() {
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    limites.forEach(limite => {
        limite.draw()
    });
    
    player.update()
    player.velocidade.y = 0
    player.velocidade.x = 0

    if (keys.w.pressed && lastKey == 'w') {
        player.velocidade.y = -5
    } else if (keys.a.pressed && lastKey == 'a') {
        player.velocidade.x = -5
    } else if (keys.s.pressed && lastKey == 's') {
        player.velocidade.y = 5
    } else if (keys.d.pressed && lastKey == 'd') {
        player.velocidade.x = 5
    }
}

animate()

addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
    console.log(keys.d.pressed)
    console.log(keys.s.pressed)
})

addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
    console.log(player.velocidade)
})