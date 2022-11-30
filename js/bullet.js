class Bullet {
    constructor(x, y, playerY0, playerH, ctx) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.playerY0 = playerY0
        this.playerH = playerH

        this.r = 10

        this.y0 = playerY0
        this.w = 35
        this.h = 35

        this.vy = -2
        this.vx = 10

        this.img = new Image()
        this.img.src = "./img/Cheese.png"
        this.img.frames = 1
        this.img.frameIndex = 0



    }

    draw() {
        this.ctx.drawImage(
            this.img,
            // Calcula x del fograma actual
            this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
            0,
            // Ancho de un fotograma
            Math.floor(this.img.width / this.img.frames),
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        );
    }

    // draw() {

    //     this.img = new Image()
    //     this.img.src = "./img/Cheese.png"

    //     this.img.onload = () => {
    //     this.ctx.drawImage(this.img, this.x, this.y);
    //     // this.ctx.beginPath();
    //     // this.ctx.moveTo(0, 0);
    //     // this.ctx.closePath()

    // }

    //     // this.ctx.beginPath()
    //     // // this.ctx.img = "./img/Cheese.png"
    //     // this.ctx.fillStyle = "red"
    //     // this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 4)
    //     // this.ctx.fill()
    //     // this.ctx.closePath()


    // }

    move() {
        const gravity = 0

        this.x += this.vx

        this.vy = gravity
        this.y += this.vy

        if (this.y > this.playerY0 + this.playerH) {
            this.y = this.r
            this.vy *= -1
        }
    }

}