class RectangleProgress {
    private _x: number;
    private _y: number;
    private _height: number;
    private _width: number;
    private _progressColor: string;
    private _backgroundColor: string;
    private _length: number;
    private _background: Phaser.Sprite;
    private _process: Phaser.Sprite;
    private _processBitmapData: Phaser.BitmapData;
    private _backgroundBitmapData: Phaser.BitmapData;
    private _state: Phaser.State;

    public set length(len: number) {
        this._length = len;
        this.draw(this._processBitmapData, this._progressColor, this._length/100  * this._width);
    }

    public get length(): number {
        return this._length;
    }

    public get backgroundColor(): string{
        return this._backgroundColor;
    }

    public set backgroundColor(color: string) {
        this._backgroundColor = color;
    }

    public get progressColor(): string {
        return this._progressColor;
    }

    public set progressColor(color: string) {
        this._progressColor = color;
    }
    public set x(x: number) {
        this._x = x;
        this._process.x = x;
        this._background.x = x;
    }
    public get x(): number {
        return this._x;
    }
    public get y(): number {
        return this._y;
    }
    public set y(y: number) {
        this._y = y;
        this._process.y = y;
        this._background.y = y;
    }
    public constructor(state: Phaser.State, x: number, y: number, height: number, width: number, progressColor: string = "rgb(0,151,251)", backgroundColor: string = "rgb(32,77,108)") {
        this._x = x;
        this._y = y;
        this._height = height;
        this._width = width;
        this._progressColor = progressColor;
        this._backgroundColor = backgroundColor;
        this._length = 0;
        this._state = state;

        this._processBitmapData = this._state.add.bitmapData(width, height);
        this._backgroundBitmapData = this._state.add.bitmapData(width, height);
        this.draw(this._backgroundBitmapData, backgroundColor, width);

        this._background = this._state.add.sprite(x, y, this._backgroundBitmapData);
        this._process = this._state.add.sprite(x, y, this._processBitmapData);
    }

    draw(bitmap: Phaser.BitmapData, color: string, width: number = this._width) {
        if (!bitmap)
            return;
        bitmap.clear();
        bitmap.ctx.beginPath();
        bitmap.ctx.fillStyle = color;
        bitmap.ctx.rect(0, 0, width, this._height);
        bitmap.ctx.fill();
        bitmap.ctx.closePath();
    }

    public destroy() {
        this._background.kill();
        this._process.kill();
        this._process = null;
        this._background = null;
        this._backgroundBitmapData = null;
        this._processBitmapData = null;
    }
}