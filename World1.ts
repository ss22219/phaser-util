class World1 extends Phaser.State {
    x: number; y: number;
    create() {
        var background = this.add.sprite(0, 0, "background");
        this.game.world.setBounds(0, 0, background.width, background.height);
        this.input.addMoveCallback((point: Phaser.Pointer, x: number, y: number, down: boolean) => {
            if (this.input.pointer2 != null)
                return;
            if (down == true){
                this.x = point.x;
                this.y = point.y;
            }
            if (point.isDown) {
                this.camera.x -= x - this.x;
                this.camera.y -= y - this.y;
                this.x = point.x;
                this.y = point.y;
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