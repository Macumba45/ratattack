class ObstacleDestroy {
    constructor(canvasW, playerH, playerY0, ctx) {
        this.ctx = ctx
        this.w = 200
        this.h = 200

        this.x = canvasW
        this.y = 370

        this.dx = 10

        this.img = new Image()
        this.img.src = "./img/SkullEnemy.png"

        this.img.frames = 10
        this.img.frameIndex = 0

    }


    draw(frameCounter) {
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

        this.animateImg(frameCounter)
    }

    animateImg(frameCounter) {
        if (frameCounter % 4 === 0) {
            this.img.frameIndex++

            if (this.img.frameIndex > this.img.frames - 1)
                this.img.frameIndex = 0
        }
    }

    move() {

        this.x -= this.dx
    }
}
