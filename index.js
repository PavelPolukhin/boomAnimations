/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'images/boom.png';
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = 'sounds/boom.wav';
    }

    update() {
        if (this.frame === 0) this.sound.play();
        this.timer++;
        if (this.timer % 20 === 0){
            this.frame++;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle)
        ctx.drawImage(this.image,
            this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight,
            0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

window.addEventListener('click', (e) => {
    createAnimation(e)
});

const createAnimation = (e) => {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    const pushElem = new Explosion(positionX, positionY);
    if(explosions.length > 10){
        explosions.splice(0, 9);
    }
    explosions.push(pushElem);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    explosions.map((item) => {
        item.update();
        item.draw();
    });
    requestAnimationFrame(animate)
}
animate();
