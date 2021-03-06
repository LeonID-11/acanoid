// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // let manager = cc.director.getCollisionManager();
        // manager.enabled = true;

        cc.director.getPhysicsManager().enabled = true;
    }

    start () {

    }

    // update (dt) {}
}
