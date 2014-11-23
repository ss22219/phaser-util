module Castlevania {

    export class Game extends Phaser.Game {

        constructor() {

            super(480, 800,Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Play', Play, false);
            this.state.add('World1', World1, false);

            this.state.start('Boot');

        }

    }

}
