module Castlevania {

    export class Boot extends Phaser.State {

        preload() {

            //this.load.image('preloadBar', 'assets/loader.png');

        }

        create() {

            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 2;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            //this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
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
                this.game.camera.bounds.setTo(0, 0, size.width, size.height);

                this.stage.width = size.width;
                this.stage.height = size.height;
            }
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setScreenSize(true);
            this.stage.backgroundColor = "#2d2d2f";
            this.game.state.start('Preloader', true, false);
        }

    }

}
