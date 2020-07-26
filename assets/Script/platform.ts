// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Platform extends cc.Component {

    side:number = 0;
    moving: boolean = false;
    x: number;
    maxPos: number;
    minPos: number;

    @property
    Delta: number = 20;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {        
        this.maxPos = this.node.parent.width/2 - this.node.width/2;
        this.minPos = -this.node.parent.width/2 + this.node.width/2;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        let canvas = this.node.parent;
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        canvas.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCansel, this);
    }
    onTouchCansel():any  {
        this.moving = false;
    }
    onTouchEnd():any  {
        this.moving = false;
    }
    onTouchStart(e: cc.Touch):any {
        this.moving = true;
        this.x = this.node.x;
    }
    onTouchMove(e: cc.Touch):any  {
        if(!this.moving) return;

        this.x += e.getDelta().x;
    }

    onKeyUp(e: KeyboardEvent):any {
        if(e.keyCode == cc.macro.KEY.left || e.keyCode == cc.macro.KEY.right){
            this.side = 0;
        }
    }
    onKeyDown(e: KeyboardEvent):any {
        if(e.keyCode == cc.macro.KEY.left){
            this.side = -1;
        }else if(e.keyCode == cc.macro.KEY.right){
            this.side = 1;
        }
    }

    start () {
        
    }

    setPosition(pos:number){
        let setPos = pos;

        if(setPos>this.maxPos){
            setPos = this.maxPos;
        }else if(pos<this.minPos){
            setPos = this.minPos;
        }
        this.node.x = setPos;
        this.node.emit('moved', setPos);
    }

    updateByKey(){
        if(this.side == 0) return;

        let pos:number = this.node.x + this.Delta * this.side;

        this.setPosition(pos);
    }

    updateByTouch(){
        this.setPosition(this.x);
    }
    update (dt) {

        if(this.moving){
            this.updateByTouch();
            return;
        }
        this.updateByKey();
        
    }

    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
}
