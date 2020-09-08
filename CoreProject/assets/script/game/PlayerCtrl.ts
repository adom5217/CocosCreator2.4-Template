
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

    public onAttack()
    {
        cc.log("开始攻击动作");
    }

    
}
