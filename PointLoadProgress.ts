class PointLoadProgress {
    points: Array<any>;
    state: Phaser.State;
    pointCount: number;
    stopCount: number;
    y: number;

    public constructor(state: Phaser.State, y?: number, pointCount: number = 4) {
        this.points = [];
        this.state = state;
        this.pointCount = pointCount;
        this.stopCount = 0;
        if (!y) {
            y = state.world.height * 0.8;
        }
        this.y = y;
        state.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.generatePoint();
        this.setAcceleration();
        var oldCallback = state.game.state.onUpdateCallback;
        var that = this;
        state.game.state.onUpdateCallback = function (game) {
            oldCallback.call(this,game);
            that.update();
        };
    }

    checkAndStopPoint() {
        if (this.points.length > 0 && this.stopCount <= this.points.length) {
            for (var i = 0; i < this.points.length; i++) {
                if (!this.points[i].stoped && this.points[i].x > this.state.world.centerX - 5 * this.points.length - (i * 4)) {
                    this.points[i].x = this.state.world.centerX - 5 * this.points.length - (i * 4);
                    this.points[i].body.velocity.x = 50;
                    this.points[i].body.acceleration.x = 10;
                    this.points[i].stoped = true;
                    this.stopCount++;
                }
            }

            if (this.stopCount == this.points.length) {
                this.stopCount++;
                this.setAcceleration();
            }
        }
    }

    update() {
        this.checkAndStopPoint();
        if (this.points.length > 0 && this.stopCount > this.points.length) {
            this.resetPoint();
        }
    }

    resetPoint() {
        var count = 0;
        for (var i = 0; i < this.points.length; i++) {
            if (this.points[i].x > this.state.world.width) {
                count++;
            }
        }

        if (count == this.points.length) {
            for (var i = 0; i < this.points.length; i++) {
                if (this.points[i].x > this.state.world.width) {
                    this.points[i].x = -100;
                    this.points[i].stoped = false;
                    this.points[i].body.velocity.x = 0;
                    this.points[i].body.acceleration.x = 0;
                }
            }
            this.setAcceleration();
            this.stopCount = 0;
        }
    }
    
    generatePoint() {
        var bmd = this.state.add.bitmapData(4, 4);
        bmd.ctx.beginPath();
        bmd.ctx.fillStyle = "rgb(0,151,251)";
        bmd.ctx.arc(bmd.width / 2, bmd.height / 2, 1.5, 0, Math.PI * 2);
        bmd.ctx.fill();
        bmd.ctx.closePath();
        for (var i = 0; i < this.pointCount; i++) {
            var sprite = this.state.add.sprite(-100, this.y, bmd);
            this.state.physics.enable(sprite);
            this.points.push(sprite);
        }
    }

    setAcceleration(index?: number) {
        if (typeof index == "undefined") {
            var timer = this.state.time.create();
            for (var i = 0; i < this.points.length; i++) {
                timer.add(i * 200, this.setAcceleration, this, i);
            }
            timer.start();
        } else {
            this.points[index].body.acceleration.x = 1000;
        }
    }
} 