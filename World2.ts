class World2 extends Phaser.State {
    preload() {
        this.load.image("img", "/assets/pangxie.png");
    }
    create() {
        var group = this.add.group();
        var background = this.add.sprite(0, 0, "background",null,group);
        group.width = background.width;
        group.height = background.height;
        //new ZoomAndDrawGroup(this, group);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        new MobleOrientation(this);
        var obj = this.add.sprite(100, 100, "img");
        this.game.physics.enable(obj, Phaser.Physics.ARCADE, true);
        obj.body.velocity.y = -100;
    }
}