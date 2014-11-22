class Pengxie extends Phaser.Sprite {
    background: Phaser.Sprite;
    normalTexture: PIXI.Texture;
    downTexture: PIXI.Texture;
    tween: Phaser.Tween;
    public constructor(game:Phaser.Game,x:number,y:number,width:number) {
        super(game, x, y);
        this.width = width;
        this.height = width;
        this.background = new Phaser.Sprite(game, 0, 0,"pangxie");
        this.background.anchor.setTo(0.5, 0.5);
        this.background.scale.setTo(0.3, 0.3);
        this.background.position.setTo(width * this.background.scale.x, width * this.background.scale.y);
        this.addChild(this.background);
        //this.state = PengxieState.Hidden;

        this.tween = this.game.add.tween(this.background);
    }

    public get state(): PengxieState {
        return this._state;
    }

    public set state(state: PengxieState) {
        this._state = state;
        switch (state) {
            case PengxieState.Hidden:
                this.background.visible = false;
                this.background.loadTexture("pangxie", 0);
                this.background.y = this.width * this.background.scale.y;
                break;
            case PengxieState.Downing:
                this.background.loadTexture("pangxie_putdown", 0);
                this.background.visible = true;
                this.tween.stop();
                this.tween.to({ y: this.width * this.background.scale.y }, 300, Phaser.Easing.Linear.None, true);
                this.tween.onComplete.removeAll();
                this.tween.onComplete.add(() => {
                    this.state = PengxieState.Hidden;
                }, this);
                break;
            case PengxieState.Showing:
                this.background.visible = true;
                this.background.loadTexture("pangxie", 0);
                this.tween.stop();
                this.tween.to({y:"+10"}, 300, Phaser.Easing.Linear.None, true);
                this.tween.to({ y: "-10" }, 300, Phaser.Easing.Linear.None, true);
                this.tween.delay(500);
                this.tween.onComplete.removeAll();
                this.tween.onComplete.add(() => {
                    this.state = PengxieState.Hidden;
                },this);
                break;
        }
    }

    _state: PengxieState;
} 

enum PengxieState {
    Hidden,
    Showing,
    Downing
}