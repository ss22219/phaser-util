class World1 extends Phaser.State {
    point: Phaser.Point;
    point2: Phaser.Point;
    distance: number;
    topGroup: Phaser.Group;
    topGroupBounds: PIXI.Rectangle;
    create() {
        this.topGroup = this.add.group();
        var background = this.add.sprite(0, 0, "background", null, this.topGroup);
        this.topGroup.width = background.width;
        this.topGroup.height = background.height;
        this.topGroupBounds = this.topGroup.getBounds();

        this.point = new Phaser.Point();
        this.point2 = new Phaser.Point();
        this.game.world.setBounds(0, 0, background.width, background.height);
        this.input.addMoveCallback((point: Phaser.Pointer, x: number, y: number, down: boolean) => {
            if (this.input.pointer2.isDown)
                return;
            if (down == true) {
                this.point.set(x, y);
            }
            else if (point.isDown) {
                this.checkGroupPosition(x, y);
                this.point.set(x, y);
            }
        }, this);
        var text = this.add.text(this.camera.view.centerX, this.camera.view.centerY, "创幻不断", { fill: "#000000", font: "20px 新宋体" });
        text.fixedToCamera = true;
        this.input.addMoveCallback((point: Phaser.Pointer, x: number, y: number, down: boolean) => {
            if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
                if (down) {
                    this.distance = this.input.pointer1.position.distance(this.input.pointer2.position);
                    return;
                }
                var distance = this.input.pointer1.position.distance(this.input.pointer2.position);
                var scale = (distance - this.distance) / this.camera.view.width;
                this.checkGroupScale(scale);
                this.distance = distance;
            }
        }, this);

        this.input.mouse.onMouseWheel = (event: MouseWheelEvent) => {
            var scale = Math.max(this.camera.width / this.topGroup.width, this.camera.height / this.topGroup.height);
            this.checkGroupScale(event.wheelDelta / 5000);
        }
    }

    checkGroupPosition(x:number,y:number) {
        if (x > 0)
            x = 0;
        if (y > 0)
            y = 0;
        if (x + this.topGroupBounds.width < this.camera.width)
            x = this.camera.width - this.topGroupBounds.width;
        if (y + this.topGroupBounds.height < this.camera.height)
            y = this.camera.height - this.topGroupBounds.height;
        this.topGroup.position.set(x, y);
    }

    checkGroupScale(scale: number) {
        var max = Math.max(this.camera.width / this.topGroup.width, this.camera.height / this.topGroup.height);
        if (this.topGroup.scale.x + scale)
        if (this.topGroupBounds.width < this.camera.width || this.topGroupBounds.height < this.camera.height) {
            scale = Math.max(this.camera.width / this.topGroup.width, this.camera.height / this.topGroup.height);
            this.topGroup.scale.set(scale, scale);
        } else {
            this.topGroup.scale.add(scale, scale);
        }
    }
    render() {
        this.game.debug.cameraInfo(this.game.camera, 0, 20, "#000000");
        this.game.debug.spriteBounds(this.topGroup);
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