const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const scoreEl = document.querySelector('#scoreEl')

if(!c) alert('Canvas - error')
else{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Player {
    constructor({ position, velocity, color = 'yellow'}) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
        this.color = color
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

class Ghost {
    constructor({ position, velocity, color = 'red' }) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
        this.color = color
        this.prevCollisions = []
    }

    draw() {
        c.beginPath
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Pallet {
    constructor({ position }) {
        this.position = position
        this.radius = 3
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }
}

const pallets = [];
const boundaries = [];
const ghosts = [
    
    new Ghost({
        position: {
            x: Boundary.width * 8 + Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2
        },
        velocity: {
            x: 5,
            y: 0
        }
    })
]
const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
}

let lastKey = ''
let score = 0

addEventListener('keydown', ({ key }) => {
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

addEventListener('keyup', ({ key }) => {
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

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', 'cb', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', 'cb', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]

function createImage(src) {
    const image = new Image()
    image.src = src
    return image
}

map.forEach((linha, i) => {
    linha.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/pipeHorizontal.png')
                }))
                break;
            case '|':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/pipeVertical.png')
                }))
                break;
            case '1':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/pipeCorner1.png')
                }))
                break;
            case '2':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/pipeCorner2.png')
                }))
                break;
            case '3':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/pipeCorner3.png')
                }))
                break;
            case '4':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/pipeCorner4.png')
                }))
                break;
            case 'b':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/block.png')
                }))
                break;
            case '[':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/capLeft.png')
                }))
                break;
            case ']':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/capRight.png')
                }))
                break;
            case '^':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/capTop.png')
                }))
                break;
            case 'cb':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/capBottom.png')
                }))
                break;
            case 'pcr':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/pipeConnectorRight.png')
                }))
                break;
            case 'pcl':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/pipeConnectorLeft.png')
                }))
                break;
            case '+':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/pipeCross.png')
                }))
                break;
            case '5':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/pipeConnectorTop.png')
                }))
                break;
            case '7':
                boundaries.push(new Boundary({
                    position: { x: Boundary.width * j, y: Boundary.height * i },
                    image: createImage('./assets/pipeConnectorBottom.png')
                }))
                break;
            case '.':
                pallets.push(
                    new Pallet({
                        position: {
                            x: j * Boundary.width + Boundary.width / 2,
                            y: i * Boundary.height + Boundary.height / 2
                        }
                    })
                )
                break;
        }
    })
});

function circleCollidesWithRectangle({ circle, rectangle }) {
    const padding = Boundary.width / 2 - circle.radius - 1
    return (
        circle.position.y - circle.radius + circle.velocity.y <=
        rectangle.position.y + rectangle.height + padding &&
        circle.position.x + circle.radius + circle.velocity.x >=
        rectangle.position.x - padding &&
        circle.position.y + circle.radius + circle.velocity.y >=
        rectangle.position.y - padding &&
        circle.position.x - circle.radius + circle.velocity.x <=
        rectangle.position.x + rectangle.width + padding
    )
}

function updateVelocity(player, xVelocity = 0, yVelocity = 0) {
    for (let i = 0; i < boundaries.length; i++) {
        if (circleCollidesWithRectangle({
            circle: { ...player, velocity: { x: xVelocity, y: yVelocity } },
            rectangle: boundaries[i]
        })) {
            player.velocity.x = 0;
            player.velocity.y = 0;
            break;
        } else {
            if (yVelocity) { player.velocity.y = yVelocity; }
            else { player.velocity.x = xVelocity; }
        }
    };
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    if (keys.w.pressed && lastKey == 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: { ...player, velocity: { x: 0, y: -5 } },
                rectangle: boundary
            })) {
                player.velocity.y = 0;
                break
            } else {
                player.velocity.y = -5
            }
        }
    } else if (keys.a.pressed && lastKey == 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: { ...player, velocity: { x: -5, y: 0 } },
                rectangle: boundary
            })) {
                player.velocity.x = 0;
                break
            } else {
                player.velocity.x = -5
            }
        }
    } else if (keys.s.pressed && lastKey == 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: { ...player, velocity: { x: 0, y: 5 } },
                rectangle: boundary
            })) {
                player.velocity.y = 0;
                break
            } else {
                player.velocity.y = 5
            }
        }
    } else if (keys.d.pressed && lastKey == 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: { ...player, velocity: { x: 5, y: 0 } },
                rectangle: boundary
            })) {
                player.velocity.x = 0;
                break
            } else {
                player.velocity.x = 5
            }
        }
    }

    for (let i = pallets.length - 1; 0 < i; i--) {
        const pallet = pallets[i]
        pallet.draw();
        if (
            Math.hypot(pallet.position.x - player.position.x,
                pallet.position.y - player.position.y) < pallet.radius + player.radius) {
            pallets.splice(i, 1)
            score += 10
            scoreEl.innerHTML = score
        }
    }

    boundaries.forEach((boundary) => {
        boundary.draw();
        if (circleCollidesWithRectangle({
            circle: player, rectangle: boundary
        })) {
            player.velocity.y = 0;
            player.velocity.x = 0;
        }
    });

    player.update();

    ghosts.forEach(ghost => {
        ghost.update()

        const collisions = []
        boundaries.forEach((boundary) => {
            if (
                !collisions.includes('right') &&
                circleCollidesWithRectangle({
                    circle: { ...ghost, velocity: { x: 5, y: 0 } },
                    rectangle: boundary
                })
            ) {
                collisions.push('right')
            }
            if (
                !collisions.includes('left') &&
                circleCollidesWithRectangle({
                    circle: { ...ghost, velocity: { x: -5, y: 0 } },
                    rectangle: boundary
                })
            ) {
                collisions.push('left')
            }
            if (
                !collisions.includes('down') &&
                circleCollidesWithRectangle({
                    circle: { ...ghost, velocity: { x: 0, y: 5 } },
                    rectangle: boundary
                })
            ) {
                collisions.push('down')
            }
            if (
                !collisions.includes('up') &&
                circleCollidesWithRectangle({
                    circle: { ...ghost, velocity: { x: 0, y: -5 } },
                    rectangle: boundary
                })
            ) {
                collisions.push('up')
            }
        })

        if (collisions.length > ghost.prevCollisions.length)
            ghost.prevCollisions = collisions

        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
            if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
            else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
            else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
            else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')

            const pathways = ghost.prevCollisions.filter(collision => {
                return !collisions.includes(collision)
            })

            const direction = pathways[Math.floor(Math.random() * pathways.length)]

            switch (direction) {
                case 'down':
                    ghost.velocity.y = 5
                    ghost.velocity.x = 0
                    break
                case 'up':
                    ghost.velocity.y = -5
                    ghost.velocity.x = 0
                    break
                case 'right':
                    ghost.velocity.y = 0
                    ghost.velocity.x = 5
                    break
                case 'left':
                    ghost.velocity.y = 0
                    ghost.velocity.x = -5
                    break
            }

            ghost.prevCollisions = []
        }
    })
}

animate()
