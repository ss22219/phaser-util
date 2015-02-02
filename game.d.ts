declare class ArcLoadProgress {
    public state: Phaser.State;
    public add: boolean;
    public i: number;
    public timer: Phaser.Timer;
    public tween: Phaser.Tween;
    public sprite: Phaser.Sprite;
    public bitmapData: Phaser.BitmapData;
    public color: string;
    constructor(state: Phaser.State, color?: string, x?: number, y?: number, size?: number);
    public update(): void;
    public stop(): void;
    public destroy(): void;
}
declare module Castlevania {
    class Boot extends Phaser.State {
        public preload(): void;
        public create(): void;
    }
}
declare class DebugTool {
    public debugObg: any;
    public lastObj: any;
    public state: Phaser.State;
    public filters: any[];
    public startPoint: Phaser.Point;
    public enableDebug(obj: any): void;
    public openDebugMode(state: Phaser.State, filters?: any[]): void;
    public update(): void;
    public render(): void;
    public debug(): void;
    public exportObjInfo(): string;
    public getPointMessage(objName: string, obj: any): string;
    public getScaleMessage(objName: string, obj: any): string;
    public getAngleMessage(objName: string, obj: any): string;
    public getAnchorMessage(objName: string, obj: any): string;
}
declare module Castlevania {
    class Game extends Phaser.Game {
        constructor();
    }
}
declare class MobleOrientation {
    public state: Phaser.State;
    public body: HTMLElement;
    public game: Phaser.Game;
    constructor(state: Phaser.State);
    public resize(): void;
}
declare class PointLoadProgress {
    public points: any[];
    public state: Phaser.State;
    public pointCount: number;
    public stopCount: number;
    public y: number;
    public timer: Phaser.Timer;
    constructor(state: Phaser.State, y?: number, pointCount?: number);
    public destroy(): void;
    public checkAndStopPoint(): void;
    public update(): void;
    public resetPoint(): void;
    public generatePoint(): void;
    public setAcceleration(index?: number): void;
}
declare module Castlevania {
    class Preloader extends Phaser.State {
        public progress: RectangleProgress;
        public preload(): void;
        public create(): void;
        public update(): void;
    }
}
declare class RectangleProgress {
    private _x;
    private _y;
    private _height;
    private _width;
    private _progressColor;
    private _backgroundColor;
    private _length;
    private _background;
    private _process;
    private _processBitmapData;
    private _backgroundBitmapData;
    private _state;
    public length : number;
    public backgroundColor : string;
    public progressColor : string;
    public x : number;
    public y : number;
    constructor(state: Phaser.State, x: number, y: number, height: number, width: number, progressColor?: string, backgroundColor?: string);
    public draw(bitmap: Phaser.BitmapData, color: string, width?: number): void;
    public destroy(): void;
}
declare class SimpleButton {
    private _x;
    private _y;
    private _height;
    private _width;
    private _textSprite;
    private _border;
    private _text;
    private _onClick;
    private _state;
    private holded;
    public border : Phaser.Graphics;
    public textSprite : Phaser.Text;
    public x : number;
    public y : number;
    public width : number;
    public height : number;
    public text : string;
    public OnClick : Phaser.Signal;
    constructor(state: Phaser.State, x: number, y: number, text: string, fontStyle?: any);
    public onDown(): void;
    public onUp(): void;
    public draw(hold?: boolean): void;
    public destroy(): void;
}
declare class World1 extends Phaser.State {
    public point: Phaser.Point;
    public point2: Phaser.Point;
    public distance: number;
    public topGroup: Phaser.Group;
    public minScale: number;
    public create(): void;
    public windowResize(event: UIEvent): void;
}
declare class World2 extends Phaser.State {
    public preload(): void;
    public create(): void;
}
declare class ZoomAndDrawGroup {
    public point: Phaser.Point;
    public point2: Phaser.Point;
    public distance: number;
    public group: Phaser.Group;
    public minScale: number;
    public state: Phaser.State;
    public camera: Phaser.Camera;
    public game: Phaser.Game;
    public input: Phaser.Input;
    public resizeGame: boolean;
    public checkGroupPosition(x: number, y: number): void;
    public checkGroupScale(scale: number): void;
    /**
    group mast be a top object
    **/
    constructor(state: Phaser.State, group: Phaser.Group, resizeGame?: boolean);
}
