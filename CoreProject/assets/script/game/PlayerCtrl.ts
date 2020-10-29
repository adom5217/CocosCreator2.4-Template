import Enemy from "./Enemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerCtrl extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    start () {
        
    }

    onLoad () 
    {
    
    
    }

    public onAttack(enemy:any,self:any)
    {
        cc.log("开始攻击动作");

        enemy.getComponent(Enemy).onBeAttack(self);
    }

    
}
