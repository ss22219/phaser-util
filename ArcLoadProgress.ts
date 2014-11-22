class ArcLoadProgress {
    state: Phaser.State;
    add: boolean;
    i: number;
    timer: Phaser.Timer;
    public tween: Phaser.Tween;
    public sprite: Phaser.Sprite;
    public bitmapData: Phaser.BitmapData;
    public color: string;
    public constructor(state: Phaser.State, color: string = "rgb(0,151,251)", x?: number, y?: number, size: number = 100) {
        if (typeof x == "undefined") {
            x = state.world.centerX;
        }
        if (typeof y == "undefined") {
            y = state.world.centerY;
        }
        this.add = true;
        this.i = 0;
        this.state = state;
        this.color = color;
        this.bitmapData = this.state.add.bitmapData(size + 10, size + 10);
        this.sprite = state.add.sprite(state.world.centerX, state.world.centerY, this.bitmapData);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.x = x;
        this.sprite.y = y;
        state.add.tween(this.sprite).to({ angle: 360 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        this.timer = state.time.create();
        this.timer.loop(10, this.update, this);
        this.timer.start();
    }

    update() {
        if (this.add)
            this.i++;
        else
            this.i--;
        if (this.i >= 100)
            this.add = false;
        else if (this.i <= 0)
            this.add = true;

        var length = this.i;
        if (length <= 0)
            length = 100;
        else if (length >= 100)
            length = 0;
        var startAngle = - (Math.PI - length / 50 * Math.PI);
        this.bitmapData.clear();
        this.bitmapData.ctx.beginPath();
        this.bitmapData.ctx.strokeStyle = this.color;
        this.bitmapData.ctx.lineWidth = 2;
        this.bitmapData.ctx.arc(this.bitmapData.width / 2, this.bitmapData.height / 2, (this.bitmapData.width - 2) / 2, Math.PI, startAngle, false);
        this.bitmapData.ctx.stroke();
        this.bitmapData.ctx.closePath();
    }

    public stop() {
        this.tween.stop();
        this.timer.stop();
    }
} 