
const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component 
{
    @property(cc.Prefab)
    hitEffect:cc.Prefab = null;
    @property(cc.Boolean)
    boss: Boolean = false; // 是否boss

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    //碰撞反馈
    onCollisionEnter(other:any,self:any)
    {
        cc.log("onCollisionEnter enemy"+other.tag,self.tag);
        
        if(other.tag==10)
        {
              //模拟死亡
              this.playAnimation("boss3_die");
              let obj = cc.instantiate(this.hitEffect);
              obj.parent = this.node;
              obj.position = cc.v3(0,0,0);
              obj.active =true;
              this.scheduleOnce(()=>{
                obj.destroy();
                this.playAnimation("boss3_idle");
              },1);
        }
    }

    playAnimation(type)
    {
        this.node.getComponent(cc.Animation).play(type);
    }
}
