class SimpleButton {
    private _x: number;
    private _y: number;
    private _height: number;
    private _width: number;
    private _textSprite: Phaser.Text;
    private _border: Phaser.Graphics;
    private _text: string;
    private _onClick: Phaser.Signal;
    private _state: Phaser.State;
    public get border(): Phaser.Graphics {
        return this._border;
    }
    public get textSprite(): Phaser.Text {
        return this._textSprite;
    }
    public set x(x: number) {
        this._x = x;
        this._textSprite.x = x;
        this._border.x = x;
    }
    public get x(): number {
        return this._x;
    }
    public get y(): number {
        return this._y;
    }
    public set y(y: number) {
        this._y = y;
        this._textSprite.y = y;
        this._border.y = y;
    }
    public set width(width: number) {
        this._width = width;
        this.draw();
    }

    public get width(): number {
        return this._x;
    }

    public get height(): number {
        return this._y;
    }

    public set height(y: number) {
        this._y = y;
        this.draw();
    }
    public get text(): string {
        return this._text;
    }
    public set text(text: string) {
        this._text = text;
        this.draw();
    }
    public get OnClick(): Phaser.Signal {
        return this._onClick;
    }

    public constructor(state: Phaser.State, x: number, y: number, text: string) {
        this._x = x;
        this._y = y;
        this._state = state;
        this._text = text;
        this._onClick = new Phaser.Signal();
        this._border = this._state.add.graphics(0, 0);
        this._textSprite = this._state.add.text(x, y, text, { fill: "#CDCDCD", font: "12px 新宋体" });
        this._textSprite.anchor.set(0.5, 0.5);
        this.draw();
        this._state.input.onDown.add( ()=> {
            if (this._state.input.activePointer.worldX > this.border.x && this._state.input.activePointer.worldX < this.border.x + this.textSprite.width + 50) {
                if (this._state.input.activePointer.worldY > this.border.y && this._state.input.activePointer.worldY < this.border.y + this.textSprite.height + 10) {
                    this.draw(true);
                    this.holded = true;
                }
            }
        }, this);
        this._state.input.onUp.add(() => {
            if (!this.holded)
                return;
            if (this._state.input.activePointer.worldX > this.border.x && this._state.input.activePointer.worldX < this.border.x + this.textSprite.width + 50) {
                if (this._state.input.activePointer.worldY > this.border.y && this._state.input.activePointer.worldY < this.border.y + this.textSprite.height + 10) {
                    this.OnClick.dispatch();
                }
            }
            this.holded = false;
            this.draw();
        });
    }
    holded: boolean;
    draw(hold: boolean = false) {
        var color = hold ? 0x4ba8ff :0x626263 ;
        this._textSprite.x = this.x;
        this._textSprite.y = this.y;
        this._textSprite.text = this.text;

        this._border.x = this.x - this.textSprite.width / 2 - 25;
        this._border.y = this.y - this.textSprite.height / 2 - 5;
        this.border.clear();
        this.border.lineStyle(1, color, 1);
        if (hold) {
            this.border.beginFill(0x3a3a3b);
        }
        this.border.moveTo(0, 0);
        this.border.lineTo(this._textSprite.width + 50, 0);
        this.border.lineTo(this._textSprite.width + 50, this._textSprite.height + 10);
        this.border.lineTo(0, this._textSprite.height + 10);
        this.border.lineTo(0, 0);
        if (hold) {
            this.border.endFill();
        }
    }
} 