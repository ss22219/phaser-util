module Castlevania {

    export class Game extends Phaser.Game {

        constructor() {

            super(window.innerWidth, window.innerHeight,Phaser.CANVAS, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Play', Play, false);

            this.state.start('Boot');

        }

    }

}
