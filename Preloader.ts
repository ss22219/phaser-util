module Castlevania {

    export class Preloader extends Phaser.State {
        i: number;
        addCount: number;
        progress : RectangleProgress;
        create() {
            this.i = 0;
            this.addCount = 1;
            var pointLoad = new PointLoadProgress(this,0.65*this.world.height);
            var arc = new ArcLoadProgress(this);
            this.progress = new RectangleProgress(this, this.world.width * 0.1, this.world.height * 0.3, 8, this.world.width * 0.8, "rgb(0,151,251)", "rgb(32,77,108)");
            this.progress.length = 0;
            var text = this.add.text(this.progress.x, this.progress.y - 24, "正在获取:", { fill: "#CDCDCD", font: "16px 新宋体" });
            var graphics = this.add.graphics(0, this.world.height * 0.85);
            graphics.beginFill(0x252526);
            graphics.drawRect(0, 0, this.world.width, this.world.height * 1.5);
            graphics.endFill();
            var button: SimpleButton = new SimpleButton(this, this.world.width * 0.85, this.world.height * 0.95, "提交", { fill: "#CDCDCD", font: "16px 新宋体"});
            button.OnClick.add(() => {
                this.progress.destroy();
            },this);
        }

        update() {
            if (this.i > 100)
                this.addCount = -1;
            if (this.i < 0)
                this.addCount = 1;
            this.i += this.addCount;
            this.progress.length = this.i;
        }

        destroy() {
            console.log("preload state destroy");
        }
    }

}