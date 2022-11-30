class Cheese {

    constructor(canvasW, playerH, playerY0, ctx) {


        this.ctx = ctx
        this.w = 35
        this.h = 35
        this.x = canvasW
        this.y = 522
        this.dx = 10

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
    //         this.ctx.drawImage(this.img, this.x, this.y);
    //     }

    // }

    move() {
        this.x -= this.dx
    }



}