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
    }


} 