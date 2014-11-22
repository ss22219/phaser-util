module Castlevania {

    export class Preloader extends Phaser.State {
        i: number;
        addCount: number;
        progress : RectangleProgress;
        create() {
            this.i = 0;
            this.addCount = 1;
            new PointLoadProgress(this,0.65*this.world.height);
            new ArcLoadProgress(this);
            this.progress = new RectangleProgress(this, this.world.width * 0.1, this.world.height * 0.3, 8, this.world.width * 0.8, "rgb(0,151,251)", "rgb(32,77,108)");
            this.progress.length = 0;
            var text = this.add.text(this.progress.x, this.progress.y - 22, "正在获取:", { fill: "#CDCDCD", font: "16px 新宋体" });
        }

        update() {
            if (this.i > 100)
                this.addCount = -1;
            if (this.i < 0)
                this.addCount = 1;
            this.i += this.addCount;
            this.progress.length = this.i;
        }
    }

}