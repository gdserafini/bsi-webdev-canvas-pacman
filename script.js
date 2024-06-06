const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

if(!c) alert('Canvas - error')
else{
    //usa a height e width default do navegador
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //console.log(canvas);
    //console.log(c);
}

class Boundary {
    static width = 40;
    static height = 40;
    constructor({position, image} ) {
        this.position = position;
        this.width = 40;
        this.height = 40;
        this.image = image;
    }

    draw() {
        // c.fillStyle = 'blue';
        // c.fillRect(
        //    this.position.x, this.position.y, 
        //    this.width, this.height
        // )
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Player {
    constructor({ position,velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

const limites = [];

const player = new Player({
    position: {
        x:Boundary.width + Boundary.width / 2,
        y:Boundary.height + Boundary.height / 2
    },
    velocity: {
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

const map = [
    ['1','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','2'],
    ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
    ['|',' ','[',']',' ','^',' ',' ','^',' ',' ','^',' ','[',']',' ','|'],
    ['|',' ',' ',' ',' ','pcr',']',' ','|',' ','[','pcl',' ',' ',' ',' ','|'],
    ['|',' ','[',']',' ','cb',' ',' ','cb',' ',' ','cb',' ','[',']',' ','|'],
    ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
    ['4','-','-','-',']',' ','1','-','-','-','2',' ','[','-','-','-','3'],
    [' ',' ',' ',' ',' ',' ','|',' ',' ',' ','|',' ',' ',' ',' ',' ',' '],
    ['1','-','-','-',']',' ','4','-','-','-','3',' ','[','-','-','-','2'],
    ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
    ['|',' ','[',']',' ','^',' ',' ','^',' ',' ','^',' ','[',']',' ','|'],
    ['|',' ',' ',' ',' ','pcr',']',' ','|',' ','[','pcl',' ',' ',' ',' ','|'],
    ['|',' ','[',']',' ','cb',' ',' ','cb',' ',' ','cb',' ','[',']',' ','|'],
    ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
    ['4','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','3']
];

function createImage(src) {
    const image = new Image()
    image.src = src
    return image
}

map.forEach((linha, i) => {
   linha.forEach((symbol, j) => {
        switch(symbol){
            case '-': 
                limites.push(new Boundary({
                    position: {
                        x: Boundary.width * j, 
                        y: Boundary.height * i
                    },
                    image: createImage('./assets/pipeHorizontal.png')
                }))
                break;
            case '|':
                limites.push(new Boundary({
                    position: {
                        x: Boundary.width * j, 
                        y: Boundary.height * i
                    },
                    image: createImage('./assets/pipeVertical.png')
                }))
                break;
            case '1':
                limites.push(new Boundary({
                    position: {
                        x: Boundary.width * j, 
                        y: Boundary.height * i
                    },
                    image: createImage('./assets/pipeCorner1.png')
                }))
                break;
            case '2':
                limites.push(new Boundary({
                    position: {
                        x: Boundary.width * j, 
                        y: Boundary.height * i
                    },
                    image: createImage('./assets/pipeCorner2.png')
                }))
                break;
            case '3':
                limites.push(new Boundary({
                    position: {
                        x: Boundary.width * j, 
                        y: Boundary.height * i
                    },
                    image: createImage('./assets/pipeCorner3.png')
                }))
                break;
            case '4':
                limites.push(new Boundary({
                    position: {
                        x: Boundary.width * j, 
                        y: Boundary.height * i
                    },
                    image: createImage('./assets/pipeCorner4.png')
                }))
                break;
            case 'b':
                limites.push(new Boundary({
                    position: {
                        x: Boundary.width * j, 
                        y: Boundary.height * i
                    },
                    image: createImage('./assets/block.png')
                }))
                break;
            case '[':
                limites.push(new Boundary({
                    position: {
                        x: Boundary.width * j, 
                        y: Boundary.height * i
                    },
                    image: createImage('./assets/capLeft.png')
                }))
                break;                                   
            case ']':
                limites.push(new Boundary({
                    position: {
                        x: Boundary.width * j, 
                        y: Boundary.height * i
                    },
                    image: createImage('./assets/capRight.png')
                }))
                break;                                   
            case '^':
                limites.push(new Boundary({
                    position: {
                        x: Boundary.width * j, 
                        y: Boundary.height * i
                    },
                    image: createImage('./assets/capTop.png')
                }))
                break;                                   
            case 'cb':
                limites.push(new Boundary({
                    position: {
                        x: Boundary.width * j, 
                        y: Boundary.height * i
                    },
                    image: createImage('./assets/capBottom.png')
                }))
                break;                                   
            case 'pcr':
                limites.push(new Boundary({
                    position: {
                        x: Boundary.width * j, 
                        y: Boundary.height * i
                    },
                    image: createImage('./assets/pipeConnectorRight.png')
                }))
                break;                                   
            case 'pcl':
                limites.push(new Boundary({
                    position: {
                        x: Boundary.width * j, 
                        y: Boundary.height * i
                    },
                    image: createImage('./assets/pipeConnectorLeft.png')
                }))
                break;                                   
        }
   }) 
});

function circleCollidesWithRectangle({circle, rectangle}){
    return (
        circle.position.y - circle.radius + circle.velocity.y <= 
        rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius + circle.velocity.x >= 
        rectangle.position.x && 
        circle.position.y + circle.radius + circle.velocity.y >=
        rectangle.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <=
        rectangle.position.x + rectangle.width
    );
}

function updateVelocity(player, xVelocity=0, yVelocity=0){
    for(let i = 0; i < limites.length; i++) {
        if(circleCollidesWithRectangle({
            circle: {...player, velocity: {x: xVelocity, y: yVelocity}}, 
            rectangle: limites[i]
        })){
            player.velocity.x = 0;
            player.velocity.y = 0;
            break;
        }
        else{ 
            if(yVelocity){ player.velocity.y = yVelocity; }
            else{ player.velocity.x = xVelocity; }
        }
    };
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    if (keys.w.pressed && lastKey == 'w') {
        updateVelocity(player, 0, -5);
    } else if (keys.a.pressed && lastKey == 'a') {
        updateVelocity(player, -5, 0);
    } else if (keys.s.pressed && lastKey == 's') {
        updateVelocity(player, 0, 5);
    } else if (keys.d.pressed && lastKey == 'd') {
        updateVelocity(player, 5, 0);
    }

    limites.forEach((boundary) => {
        boundary.draw();
        if(circleCollidesWithRectangle({
            circle: player, rectangle: boundary
        })){
                player.velocity.y = 0;
                player.velocity.x = 0;
        }
    });
    
    player.update();
    player.velocity.y = 0;
    player.velocity.x = 0;
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
})