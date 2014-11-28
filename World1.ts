class World1 extends Phaser.State {
    point: Phaser.Point;
    point2: Phaser.Point;
    distance: number;
    topGroup: Phaser.Group;
    minScale: number;
    create() {
        this.topGroup = this.add.group();
        var background = this.add.sprite(0, 0, "background", null, this.topGroup);
        this.topGroup.width = background.width;
        this.topGroup.height = background.height;
        new ZoomAndDrawGroup(this, this.topGroup);
        var audio = this.add.audio("audio_0");
        audio.play();
        audio.onStop.add(() => {
            var audio2 = this.add.audio("audio_1");
            audio2.play();
            audio2.onStop.add(() => { audio.play()});
        });
        this.load.audio("audio_1", "audio/02.NERDHEAD - SECRET SUMMER Feat. CHIHIRO.mp3",true);
        this.load.start();
        window.addEventListener("resize", (event: UIEvent) => { this.windowResize(event) });
        this.input.onDown.add(() => {
            this.game.scale.startFullScreen(); });
    }

    windowResize(event: UIEvent) {
        var size = { width: window.innerWidth, height: window.innerHeight };
        this.game.width = size.width;
        this.game.height = size.height;
        this.game.canvas.width = size.width;
        this.game.canvas.height = size.height;

        this.game.scale.width = size.width;
        this.game.scale.height = size.width;

        (<any>this.game.renderer).resize(size.width, size.height);
        this.game.scale.setSize();

        this.game.camera.setSize(size.width, size.height);
        this.game.camera.bounds.setTo(this.game.camera.x, this.game.camera.y,size.width,size.height);

        this.stage.width = size.width;
        this.stage.height = size.height;

    }
   
} 