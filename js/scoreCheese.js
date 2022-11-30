const ScoreCheese = {
    ctx: undefined,
    init: function (ctx) {
        this.ctx = ctx
        this.ctx.img
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "green";

        this.ctx.fillText(0, 100, 50);
    },

    update: function (cheeseCounter) {
        this.ctx.fillStyle = "gold";
        this.ctx.fillText(Math.floor(cheeseCounter), 300, 50);
        // console.log(cheeseCounter)
        this.img = new Image()
        this.img.src = "./img/Cheese.png"
        this.img.onload = () => {
            this.ctx.drawImage(this.img, 260, 23);
        }
    }
}