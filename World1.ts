class World1 extends Phaser.State {
    point: Phaser.Point;
    point2: Phaser.Point;
    distance: number;
    create() {
        this.point = new Phaser.Point();
        this.point2 = new Phaser.Point();
        var background = this.add.sprite(0, 0, "background");
        this.game.world.setBounds(0, 0, background.width, background.height);
        this.input.addMoveCallback((point: Phaser.Pointer, x: number, y: number, down: boolean) => {
            if (this.input.pointer2.isDown && this.input.pointer1.isDown) {
                if (down) {
                    this.point2.set(x, y);
                    this.distance = this.point.distance(this.point2);
                } else {
                    var distance = this.point.distance(this.point2);
                    var scale = (this.distance - distance) / this.camera.width;
                    this.camera.scale.add(scale, scale);
                    this.distance = distance;
                }
            } else {
                if (down == true) {
                    this.point.set(x, y);
                }
                else if (point.isDown) {
                    this.camera.x -= x - this.point.x;
                    this.camera.y -= y - this.point.y;
                    this.point.set(x, y);
                }
            }
        }, this);
    }
    render() {
        this.game.debug.cameraInfo(this.game.camera, 0, 20, "#000000");
    }

    update() {
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.camera.x -= 10;
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.camera.x += 10;
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.camera.y -= 10;
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.camera.y += 10;
        }
    }
} 