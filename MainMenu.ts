module Castlevania {

    export class MainMenu extends Phaser.State {

        background: Phaser.Sprite;
        startBtn: Phaser.Sprite;
        logo: Phaser.Sprite;
        create() {
            this.background = this.add.sprite(0, 0, 'back_start');
            this.background.width = this.world.width;
            this.background.height = this.world.height;

            this.logo = this.add.sprite(this.world.centerX, this.world.height * 0.55, 'button');
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.scale.setTo(0.7, 0.7);

            this.startBtn = this.add.sprite(this.world.centerX, this.logo.y + this.logo.height, 'button_start');
            this.startBtn.anchor.setTo(0.5, 0.5);
            this.startBtn.scale.setTo(0.7, 0.7);

            this.add.tween(this.logo).to({ angle:-45 }, 2000, Phaser.Easing.Elastic.Out, true);

            this.input.onDown.addOnce(this.startGame, this);
        }

        startGame() {
            this.game.state.start('Play', true, false);
        }

    }

}