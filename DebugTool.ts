class DebugTool {
    debugObg: any;
    lastObj: any;
    state: Phaser.State;
    filters: Array<any>;
    startPoint: Phaser.Point;

    public enableDebug(obj: any) {

        if (this.filters && this.filters.indexOf(obj) != -1) {
            return;
        }
        obj.inputEnabled = true;
        obj.input.enableDrag(false);
        obj.events.onInputDown.add(() => {
            console.log(obj);
            this.startPoint = null;
            this.debugObg = obj;
            this.debug();
        }, this);

        obj.events.onDragStop.add(() => {
            console.log("point:" + obj.x / this.state.world.width + "," + obj.y / this.state.world.height);
        });
    }

    public openDebugMode(state: Phaser.State, filters: Array<any> = null) {
        this.state = state;
        state.time.advancedTiming = true;
        var callback = state.game.state.onRenderCallback;
        state.game.state.onRenderCallback = () => {
            this.render();
            callback.call(state);
        };
        var updateCallback = state.game.state.onUpdateCallback;
        state.game.state.onUpdateCallback = () => {
            this.update();
            updateCallback.call(state);
        };
        this.filters = filters;
        for (var key in state) {
            if (state[key] instanceof Phaser.Sprite || state[key] instanceof Phaser.Text) {
                this.enableDebug(state[key]);
            }
            if (state[key] instanceof Phaser.Group) {
                (<Phaser.Group>state[key]).forEach(function (o) {
                    if (o instanceof Phaser.Sprite || o instanceof Phaser.Text) {
                        this.enableDebug(o);
                    }
                }, this);
            }
        }
    }

    update() {
        if (this.state.input.keyboard.isDown(Phaser.Keyboard.J)) {
            this.debugObg.angle--;
        }
        else if (this.state.input.keyboard.isDown(Phaser.Keyboard.K)) {
            this.debugObg.angle++;
        } else if (this.state.input.keyboard.isDown(Phaser.Keyboard.W)) {
            this.debugObg.anchor.y += 0.01;
        } else if (this.state.input.keyboard.isDown(Phaser.Keyboard.S)) {
            this.debugObg.anchor.y -= 0.01;
        } else if (this.state.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.debugObg.anchor.x += 0.01;
        } else if (this.state.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.debugObg.anchor.x -= 0.01;
        }
    }

    render() {
        this.state.game.debug.text('fps:' + this.state.game.time.fps, 10, 15, null, "45px");
        this.state.game.debug.text("点击对象开始调试，按 J,K 旋转对象，按 Z 打印对象信息", 10, 30, "#000000", "15px 新宋体");
        if (!this.debugObg)
            return;
        this.state.game.debug.pixel(this.debugObg.x - 2.5, this.debugObg.y - 2.5, "#000000", 5);
        this.state.game.debug.spriteBounds(this.debugObg);
    }

    debug() {
        if (!this.debugObg)
            return;
        var obj = this.debugObg;
        window.onkeydown = (ev: KeyboardEvent) => {
            var x = 0, y = 0;
            if (ev.keyCode == 90) {
                console.log(this.exportObjInfo());
                return;
            }
            if (ev.keyCode == 40) {
                y = 5;
            } else if (ev.keyCode == 37) {
                x = -5;
            } else if (ev.keyCode == 38) {
                y = -5;
            } else if (ev.keyCode == 39) {
                x = 5;
            }
            if (x || y) {
                obj.x += x;
                obj.y += y;
            }
        };

        window.onmousewheel = (ev: MouseWheelEvent) => {
            obj.scale.add(ev.wheelDelta / 10000, ev.wheelDelta / 10000);
            console.log("scale:" + obj.scale.x + "," + obj.scale.y);
        };
    }

    exportObjInfo() {
        var state = this.state;
        var str = "";
        for (var key in state) {
            if (state[key] instanceof Phaser.Sprite || state[key] instanceof Phaser.Text) {
                var objectName = "this[\"" + key + "\"]";
                if (typeof key == "string")
                    objectName = "this." + key;
                str += "\t\t\t" + this.getPointMessage(objectName, state[key]) + "\r\n";
                str += "\t\t\t" + this.getScaleMessage(objectName, state[key]) + "\r\n";
                str += "\t\t\t" + this.getAngleMessage(objectName, state[key]) + "\r\n";
                str += "\t\t\t" + this.getAnchorMessage(objectName, state[key]) + "\r\n";
            }
            if (state[key] instanceof Phaser.Group) {
                var group = (<Phaser.Group>state[key]);
                var i = 0;
                group.forEach(function (o) {
                    if (o instanceof Phaser.Sprite || o instanceof Phaser.Text) {
                        var objectName = "this[\"" + key + "\"]";
                        if (typeof key == "string")
                            objectName = "this." + key;
                        str += "\t\t\t" + this.getPointMessage(objectName + ".getAt(" + i + ")", o) + "\r\n";
                        str += "\t\t\t" + this.getScaleMessage(objectName + ".getAt(" + i + ")", o) + "\r\n";
                        str += "\t\t\t" + this.getAngleMessage(objectName + ".getAt(" + i + ")", o) + "\r\n";
                        str += "\t\t\t" + this.getAnchorMessage(objectName + ".getAt(" + i + ")", o) + "\r\n";
                    }
                    i++;
                }, this);
            }
        }
        return str;
    }

    getPointMessage(objName: string, obj: any) {
        return objName + ".position.setTo(" + parseInt(obj.x) + "," + parseInt(obj.y) + ");";
    }

    getScaleMessage(objName: string, obj: any) {
        return objName + ".scale.setTo(" + obj.scale.x + "," + obj.scale.y + ");";
    }

    getAngleMessage(objName: string, obj: any) {
        return objName + ".angle = " + obj.angle;
    }

    getAnchorMessage(objName: string, obj: any) {
        return objName + ".anchor.setTo(" + obj.anchor.x + "," + obj.anchor.y + ");";
    }
} 