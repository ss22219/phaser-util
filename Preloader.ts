module Castlevania {

    export class Preloader extends Phaser.State {
        progress: RectangleProgress;
        preload() {
            this.load.image("background", "assets/background.jpg", true);
            this.load.audio("audio_0", "audio/00.前言：阿保剛 - Believe me.mp3",true);
            this.progress = new RectangleProgress(this, this.world.width * 0.05, this.world.height * 0.4, 10, this.world.width * 0.9);
            var text = this.add.text(this.progress.x, this.progress.y - 24, "正在加载:", { fill: "#CDCDCD", font: "20px 新宋体" });
            this.load.onFileComplete.addOnce(() => {
                this.progress.length = this.load.progress;
            }, this);
            new PointLoadProgress(this);
        }

        create() {
            this.game.state.start("World1")
        }

        update() {
        }
    }

}