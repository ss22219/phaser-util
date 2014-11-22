class Hole extends Phaser.Sprite {
    public pengxie: Pengxie;
    public graphics: Phaser.Graphics;
    public background: Phaser.Sprite;
    public constructor(game: Phaser.Game, x: number, y: number, width: number) {
        super(game,x,y);
        this.graphics = new Phaser.Graphics(game, 0, 0);
        this.width = width;
        this.height = width;
        this.background = new Phaser.Sprite(game, 0 ,0, "hole", 0);
        this.background.scale.setTo(0.3, 0.3);
        this.background.anchor.setTo(0.5, 0.5);
        this.background.position.setTo(width * 0.3, width * 0.3);
        this.addChild(this.background);
        //this.pengxie = new Pengxie(game, 0, 0, width / 10);
        //this.addChild(this.pengxie);
    }
} 