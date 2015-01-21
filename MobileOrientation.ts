class MobleOrientation {
    state: Phaser.State;
    body: HTMLElement;
    game: Phaser.Game;
    public constructor(state: Phaser.State) {
        this.state = state;
        this.game = state.game;
        this.body = document.body;
        this.resize();
        window.addEventListener("resize", () => {
            this.resize()
        });
    }

    resize() {
        var size = { width: window.innerWidth, height: window.innerHeight };
        if (size.height > size.width) {
            size = { height: window.innerWidth, width: window.innerHeight };
            this.body.setAttribute("style","transform:rotate(90deg);-webkit-transform:rotate(90deg);");
        } else
            this.body.setAttribute("style", "");
        this.game.width = size.width;
        this.game.height = size.height;
        this.game.canvas.width = size.width;
        this.game.canvas.height = size.height;
        this.game.canvas.style.margin = "";
        this.game.scale.width = size.width;
        this.game.scale.height = size.width;

        (<any>this.game.renderer).resize(size.width, size.height);
        this.game.scale.setSize();

        this.game.camera.setSize(size.width, size.height);
        this.game.camera.bounds.setTo(this.game.camera.x, this.game.camera.y, size.width, size.height);

        this.game.stage.width = size.width;
        this.game.stage.height = size.height;

        this.game.canvas.style.width = size.width + 'px';
        this.game.canvas.style.height = size.height + 'px';

        this.game.scale.pageAlignHorizontally = false;
        this.game.scale.pageAlignVertically = false;
        this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

        document.documentElement['style'].minHeight = "";
    }
}