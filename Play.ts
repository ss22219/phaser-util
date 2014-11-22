class Play extends Phaser.State {
    holeList: Array<Hole> = [];
    pengxieList: Array<Pengxie> = [];
    background: Phaser.Sprite;
    timeText: Phaser.Text;
    socreText: Phaser.Text;
    timer: Phaser.TimerEvent;
    public static score: number;
    create() {
        Play.score = 0;
        this.background = this.add.sprite(0, 0, 'back');
        this.background.height = this.world.height;
        this.background.width = this.world.width;
        var group = this.add.group();
        group.x = this.world.width * 0.1;
        group.y = this.world.height * 0.35;
        var holeW = this.world.width * 0.8 / 3;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var hole = new Hole(this.game, i * holeW, j * holeW, holeW);
                this.holeList.push(hole);
                group.add(hole);
            }
        }

        group = this.add.group();
        group.x = this.world.width * 0.1;
        group.y = this.world.height * 0.35;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var pengxie = new Pengxie(this.game, i * holeW, j * holeW, holeW);
                this.pengxieList.push(pengxie);
                group.add(pengxie);
            }
        }
        //this.timer = this.game.time.events.loop(500, this.showPengxie, this);
    }

    showPengxie() {
        for (var key in this.holeList) {
            if (this.holeList[key].pengxie.state == PengxieState.Hidden) {
                this.holeList[key].pengxie.state = PengxieState.Showing;
                return;
            }
        }
    }
    render() {
        this.holeList.forEach((value, index) => {
            if (index % 2 == 0) {
                this.game.debug.spriteBounds(value, "rgba(255,0,0,1)");
                this.game.debug.spriteBounds(value.background);
            } else {
                this.game.debug.spriteBounds(value, "rgba(255,255,255,1)");
                this.game.debug.spriteBounds(value.background);
            }
        });
    }
}