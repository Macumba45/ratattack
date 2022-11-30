class Player {
    constructor(canvasW, canvasH, keys, ctx) {
        this.ctx = ctx
        this.keys = keys

        this.canvasW = canvasW

        this.img = new Image()
        this.img.src = "./img/AnimalSheet.png"

        this.img.frames = 2
        this.img.frameIndex = 0

        this.w = 70;
        this.h = 75;

        this.x = canvasW * 0.10;

        this.y0 = canvasH - 205

        this.y = 300

        this.vy = 5
        this.vx = 1

        this.bullets = []
        this.userBullets = 0
        this.lifes = 3
        this.userLifes = 3

        this.state = "vivo"

        this.setControls()
    }

    setControls() {
        document.addEventListener('keydown', (e) => {
            // console.log(e.keyCode) // Obtener KeyCodes de tecla pulsada
            if (e.keyCode === this.keys.TOP_KEY && this.y0 === this.y) {
                this.y -= 5 // Por la condición de fin de salto (move())  
                this.vy += -10
            } else if (e.keyCode === this.keys.SPACE) {
                this.shoot()
            } else if (e.keyCode === this.keys.JUMP && this.y0 === this.y) {

                this.y -= 5
                this.vy += -15

            }

        })
    }

    shoot() {
        console.log("Disparar");
        this.decrece()

        if (this.userBullets > 0) {

            // this.bullets = []
            this.bullets.push(new Bullet(
                this.x + this.w,
                this.y + this.h / 2,
                this.y0,
                this.h,
                this.ctx))
            this.userBullets--

        }

    }


    decrece() {

        if (this.w >= 71) {

            this.w /= 1.2 / 1

        }

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

        this.bullets = this.bullets.filter((bullet) => bullet.x - bullet.r < this.canvasW)


        this.bullets.forEach((bullet) => {
            bullet.draw()
            bullet.move()

            // if(this.bullets.forEach() <= 3){
            //     console.log("NO BALAS")
            // }
        })
    }


    // cambia el fotogramas del skin cada 6 frame
    animateImg(frameCounter) {
        if (frameCounter % 6 === 0) {
            this.img.frameIndex++

            if (this.img.frameIndex > this.img.frames - 1) {
                if (this.state === "muriendo") {
                    this.state = "muerto"
                    this.img.frameIndex = 1
                    return;
                }
                this.img.frameIndex = 0
            }



        }
    }

    move() {
        let gravity = 0.6

        // Detecta el fin de salto
        if (this.y >= this.y0) {
            this.y = this.y0
            this.vy = 0.2
        } else {
            this.vy += gravity
            this.y += this.vy
        }
    }

    muerete() {

        if (this.state === "vivo") {
            this.state = "muriendo"
            this.img.src = "./img/AnimalSheetDEAD.png"
            this.img.frameIndex = 0
            this.img.frames = 2

        }

    }
}
