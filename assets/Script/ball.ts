// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Ball extends cc.Component {

    isMoved: boolean = false;
    // spead: number = 1000;

    isTapped:boolean = false;
    tapTime:number;
    body: cc.RigidBody;

    @property(cc.Node)
    platform: cc.Node = null;
    
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.platform.on('moved', this.onPlatformMoved, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.body = this.node.getComponent(cc.RigidBody);
    }

    onTouchStart(e:cc.Event.EventTouch) {
        if(this.isMoved || e.getTouches().length !=1) return;

        let time = new Date().getTime();
        if(!this.isTapped){
            this.isTapped = true;
            this.tapTime = time;
        } else {
            let timeDelta = this.tapTime - time;
            if(timeDelta < 400){
                this.isTapped = false;
                this.runBall();
            }else{
                this.tapTime = time;
            }
        }
    }

    onKeyDown(e:KeyboardEvent) {
        if(this.isMoved) return;
        if(e.keyCode == cc.macro.KEY.enter || e.keyCode == cc.macro.KEY.space){
            this.runBall();
        }
    }

    resetBall() {
        this.body.linearVelocity = cc.v2(0, 0);
        this.isMoved = false;
        this.node.runAction(cc.moveTo(0, this.platform.x, -870));
    }

    runBall(){
        this.isMoved = true;
        this.body.linearVelocity = cc.v2(600, 1200);
    }

    onBeginContact(contact:cc.PhysicsContact, self:cc.PhysicsCollider, other: cc.PhysicsCollider){
        if(other.node.name == "bottom"){
            this.resetBall();
        }
    }
    
    onPlatformMoved(pos:number) {
        if(this.isMoved) return;

        this.node.x = pos;
    }

    start () {

    }

    update (dt) {}
}
