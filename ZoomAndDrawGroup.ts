class ZoomAndDrawGroup {
    point: Phaser.Point;
    point2: Phaser.Point;
    distance: number;
    group: Phaser.Group;
    minScale: number;
    state: Phaser.State;
    camera: Phaser.Camera;
    game: Phaser.Game;
    input: Phaser.Input;

    checkGroupPosition(x: number, y: number) {
        var topGroupBounds = this.group.getBounds();
        if (x > 0)
            x = 0;
        if (y > 0)
            y = 0;
        if (x + topGroupBounds.width < this.camera.width)
            x = this.camera.width - topGroupBounds.width;
        if (y + topGroupBounds.height < this.camera.height)
            y = this.camera.height - topGroupBounds.height;
        if (x + this.group.width < this.camera.width)
            x = this.camera.width - this.group.width;
        if (y + this.group.height < this.camera.height)
            y = this.camera.height - this.group.height;
        this.group.position.set(x, y);
        if (this.camera.width > this.group.width || this.camera.height > this.group.height) {
            this.minScale += 0.1;
            this.checkGroupScale(0);
        }
    }

    checkGroupScale(scale: number) {
        if (this.group.scale.x + scale < this.minScale)
            this.group.scale.set(this.minScale, this.minScale);
        else
            this.group.scale.add(scale, scale);
        this.checkGroupPosition(this.group.x, this.group.y);
    }


    /**
        group mast be a top object
    **/
    public constructor(state: Phaser.State, group: Phaser.Group) {
        this.state = state;
        this.game = this.state.game;
        this.input = this.state.input;
        this.camera = this.state.camera;
        this.group = group;
        this.minScale = Math.max(this.camera.width / this.group.width, this.camera.height / this.group.height);
        this.point = new Phaser.Point();
        this.point2 = new Phaser.Point();
        this.input.onUp.add(() => { this.point.set(-1, -1) });
        this.input.addMoveCallback((point: Phaser.Pointer, x: number, y: number, down: boolean) => {
            if (this.input.pointer2.isDown)
                return;
            if (down) {
                this.point.set(x, y);
            }
            else if (point.isDown && this.point.x != -1) {
                this.checkGroupPosition(this.group.x + x - this.point.x, this.group.y + y - this.point.y);
                this.point.set(x, y);
            }
        }, this);

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
            this.checkGroupScale(event.wheelDelta / 5000);
        }

        window.addEventListener("resize", () => {
            this.minScale = Math.max(this.camera.width / (<any>this.group)._width, this.camera.height /( <any>this.group)._height);
            this.checkGroupScale(0);
        });
    }
} 