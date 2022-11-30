const Game = {
    canvas: undefined,
    ctx: undefined,
    scoreBoard: undefined,
    scoreCheese: undefined,
    fps: 60,
    keys: {
        TOP_KEY: 87,
        SPACE: 32,
        JUMP: 69,
    },

    init: function () {
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext('2d')


        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.start()

        this.audio = new Audio('music/musica.mp3')
        this.audio.play()
    },

    start: function () {
        this.reset()

        this.scoreBoard.init(this.ctx)
        this.scoreCheese.init(this.ctx)

        // Bucle de renderizado
        this.interval = setInterval(() => {
            this.clear()
            this.score += 0.1
            this.scoreCheese = this.player.userBullets
            // Mecanismo para generar acciones cada X frames
            this.frameCounter++;


            // Generar obstaculo cada 50 frames
            if (this.frameCounter % this.randomNumber(50, 130) === 0)
                this.generateObstacle()

            if (this.frameCounter % 300 === 0)
                this.generateObstacleDestroy()

            if (this.frameCounter % 133 === 0)
                this.generateCheese()

            // if (this.score > 50) {
            //     this.increaseSpeed()
            // }

            if (this.eatCheese())
                this.increasePlayer()


            if (this.isCollision())
                this.player.muerete()

            if (this.player.state === "muerto")
                this.gameOver()

            if (this.isCollisionDestroy())
                this.gameOver()

            this.isCollisionDestroyBullet()

            this.drawAll()
            this.moveAll()

            this.clearObstacles()
            this.clearObstaclesDestroy()
            this.clearCheese()
            // this.removeObstacle()


        }, 1000 / this.fps)
    },

    reset: function () {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx)
        this.player = new Player(this.canvas.width, this.canvas.height, this.keys, this.ctx)
        this.scoreBoard = ScoreBoard
        this.scoreCheese = ScoreCheese
        this.frameCounter = 0
        this.score = 0
        this.player.userBullets = 0
        this.obstacles = []
        this.obstaclesDestroy = []
        this.cheese = []
        this.lifes = []

    },

    clear: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    moveAll: function () {
        this.background.move(this.score)
        this.player.move()

        this.obstacles.forEach(obstacle => {
            obstacle.move()
        })

        this.obstaclesDestroy.forEach(obstacleDestroy => {
            obstacleDestroy.move()
        })

        this.cheese.forEach(cheese => {
            cheese.move()
        })
    },

    drawAll: function () {
        this.background.draw()
        this.player.draw(this.frameCounter)

        this.obstacles.forEach(obstacle => {
            obstacle.draw()
        })

        this.obstaclesDestroy.forEach(obstacleDestroy => {
            obstacleDestroy.draw(this.frameCounter)
        })

        this.cheese.forEach(cheese => {
            cheese.draw()
        })

        this.drawScore(this.score)
        this.drawCheeseCounter(this.scoreCheese)
    },

    generateObstacle: function () {
        this.obstacles.push(new Obstacle(this.canvas.width, this.player.h, this.player.y0, this.ctx))
    },
    generateObstacleDestroy: function () {
        this.obstaclesDestroy.push(new ObstacleDestroy(this.canvas.width, this.player.h, this.player.y0, this.ctx))
    },

    generateCheese: function () {
        this.cheese.push(new Cheese(this.canvas.width, this.player.h, this.player.y0, this.ctx))
    },



    clearObstacles: function () {
        this.obstacles = this.obstacles.filter((obstacle) => obstacle.x + obstacle.w >= 0)
    },

    clearObstaclesDestroy: function () {
        this.obstaclesDestroy = this.obstaclesDestroy.filter((obstacleDestroy) => obstacleDestroy.x + obstacleDestroy.w >= 0)
    },

    clearCheese: function () {
        this.cheese = this.cheese.filter((cheese) => cheese.x + cheese.w >= 0)
    },


    isCollision() {

        return this.obstacles.some((obstacle) => {

            const colisionPlayer = (
                this.player.x + this.player.w + 80 >= obstacle.x &&
                this.player.x <= obstacle.x + obstacle.w &&
                this.player.y + this.player.h - 1 >= obstacle.y &&
                this.player.y <= obstacle.y + obstacle.h
            );


            console.log(this.player.img, colisionPlayer)

            // console.log(this.player.img)

            // console.log("si, me he chocado", colisionPlayer)
            return colisionPlayer
        })
    },

    isCollisionDestroy() {
        return this.obstaclesDestroy.some((obstacleDestroy) => {
            return (
                this.player.x + this.player.w - 100 >= obstacleDestroy.x &&
                this.player.x <= obstacleDestroy.x + obstacleDestroy.w &&
                this.player.y + this.player.h - 10 >= obstacleDestroy.y &&
                this.player.y <= obstacleDestroy.y + obstacleDestroy.h
            )
        })
    },

    isCollisionDestroyBullet() {
        const currentBullets = this.player.bullets
        const hasBullets = currentBullets.length > 0

        for (const obstacleDestroy of this.obstaclesDestroy) {

            const hitsBullets = currentBullets.filter(bullet =>

                bullet.x + bullet.w - 10 >= obstacleDestroy.x &&
                bullet.x <= obstacleDestroy.x + obstacleDestroy.w &&
                bullet.y + bullet.h - 10 >= obstacleDestroy.y &&
                bullet.y <= obstacleDestroy.y + obstacleDestroy.h)

            if (hitsBullets.length >= 1) {

                this.obstaclesDestroy = this.obstaclesDestroy.filter((obstacleDestroy) => obstacleDestroy.x + obstacleDestroy.y === hitsBullets[hitsBullets.length - 1].x)

                this.player.bullets = currentBullets.filter(bullet => obstacleDestroy.x + obstacleDestroy.w === bullet.x)

            }


        }

    },

    eatCheese() {

        return this.cheese.some((cheese) => {

            const esto = (
                this.player.x + this.player.w >= cheese.x &&
                this.player.x <= cheese.x + cheese.w &&
                this.player.y + this.player.h - 1 >= cheese.y &&
                this.player.y <= cheese.y + cheese.h
            )
            if (esto) {

                // console.log("ESTE ES EL PUTO QUESO ", cheese)
                this.cheese = this.cheese.filter((cheese) => cheese.x + cheese.w == this.player.x)
                this.player.userBullets += 1



            } return esto


        })
    },

    // isDead() {

    //     this.img = new Image()
    //     this.img.src = "./img/AnimalSheetDEAD.png"

    //     this.img.onload = () => {
    //         this.ctx.drawImage(this.img, this.x, this.y)

    //     }
    // },


    increasePlayer() {

        if (this.player.w >= 60 && this.player.w < 110) {

            this.player.w *= 1.2


        }

        // console.log(this.player.w)

    },


    stop() {
        clearInterval(this.interval)
    },



    gameOver() {
        this.stop()
        this.audio.pause();
        if (confirm("Te has chocado RATA, ¿Quieres jugar de nuevo?")) {
            this.start()
            // document.getElementById('start').style.display = 'flex'
            // document.getElementById('intro').style.display = 'flex'
            // document.getElementById('intro').style.justifyContent = 'center'
            // document.getElementById('intro').style.alignContent = 'center'
            // document.getElementById('canvas').style.display = 'none'
            this.audio.play();
        } else {

            window.onload();
            this.audio.pause();
            document.getElementById('canvas').style.display = 'none'
            document.getElementById('start').style.display = 'flex'

        }

    },



    drawScore(score) {
        ScoreBoard.update(score)
    },

    drawCheeseCounter(cheeseCounter) {
        ScoreCheese.update(cheeseCounter)
    },


    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },

    increaseSpeed() {
        // this.background.dx *= 1.0001
        // console.log(this.background.dx)

        // this.obstacles.forEach(obstacle => {
        //     obstacle.dx *= 1.001
        //     console.log(obstacle.dx)
        // })

        // this.obstaclesDestroy.forEach(obstacleDestroy => {
        //     obstacleDestroy.dx *= 1.001
        //     console.log(obstacleDestroy.dx)
        // })

        // this.cheese.forEach(cheese => {
        //     cheese.dx *= 1.001
        //     console.log(cheese.dx)
        // })

    }



}

