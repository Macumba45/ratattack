const ScoreBoard = {
    ctx: undefined,
    init: function (ctx) {
        this.ctx = ctx
        this.ctx.font = "30px Arial";
    },

    update: function (score) {
        this.ctx.fillStyle = "green";
        this.ctx.fillText(Math.floor(score), 155, 50);
        this.ctx.fillText("Puntos:", 50, 50)
    }
}