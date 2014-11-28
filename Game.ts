module Castlevania {

    export class Game extends Phaser.Game {

        constructor() {
            super(window.innerWidth * 1.5, window.innerHeight * 1.5,Phaser.AUTO, 'content', null);
            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('World1', World1, false);

            this.state.start('Boot');

        }

    }

}
