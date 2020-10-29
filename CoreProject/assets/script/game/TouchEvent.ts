

import App from "../core/App";
import PlayerCtrl from "./PlayerCtrl";


const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchEvent extends cc.Component {

    @property(cc.Boolean)
    isDrag: Boolean = true; //是否可以操作拖动

    
    scale = 0.1;
    onLoad () 
    {
        this.scale = this.node.scale;
        this.touchEvent();
    }
    initY = 0;
    //触摸屏幕拖动事件
    public touchEvent()
    {
        //触摸开始
        this.node.on(cc.Node.EventType.TOUCH_START,function(event)
        {
            this.OnTouchStart();
        },this);

        if(this.isDrag)
        {//触摸移动
            
            this.node.on(cc.Node.EventType.TOUCH_MOVE,function(event)
            {
                //getDelata()方法是获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
                let delta=event.getDelta();

                this.x += delta.x;
                this.y += delta.y;

            }, this.node)
        }
       
 
        //触摸结束
        this.node.on(cc.Node.EventType.TOUCH_END, function(){
            this.onTouchEnd();
        }, this)

    }
    //移除拖事件
    removeEvent()
    {
        this.node.off(cc.Node.EventType.TOUCH_START);
        if(this.isDrag)
            this.node.off(cc.Node.EventType.TOUCH_MOVE);
        this.node.off(cc.Node.EventType.TOUCH_END);
    }
    
    OnTouchStart()
    {

        //点击效果
        cc.tween(this.node)
        .to(0.1, { opacity: 200 })
        .to(0.2, { opacity: 255 })
        .start()
      
        //点击了
        
    }
    playerAnimation(type)
    {
        this.node.getComponent(cc.Animation).play(type);
    }
    movetween:cc.Tween = null;
    onTouchEnd()
    {
        cc.log("touch end");
        this.initY = this.node.y;
        this.movetween=cc.tween(this.node)
                    .tag(1)
                    .to(0.2, { y: this.initY-500,scale:this.scale+0.1}, { easing: 'backOut'})
                    .start()
    }
    
    onMoveAttack(node:any,self:any)
    {
        this.movetween.stop();
        //随机动画
        let num = App.RandomUtils.randomArray([0,1]);
        cc.log(num);
        if(num==0)
        {
            this.playerAnimation("player_attack");
        }else
        {
            this.playerAnimation("player_attack1");
        }
        this.getComponent(PlayerCtrl).onAttack(node,self);
        cc.tween(this.node)
        .to(0.3, { y: this.initY,scale:this.scale}, { easing: 'backOut'})
        .call(()=>{this.playerAnimation("player_idle"); })
        .start()
    }
    //碰撞反馈
    onCollisionEnter(other:any,self:any)
    {
        cc.log("onCollisionEnter"+other.tag,self.tag);
        
        if(self.tag == 10&& other.tag==0)
        {
            this.onMoveAttack(other,self);     
        }
    }

    onCollisionExit(other:any,self:any)
    {
        cc.log("onCollisionExit",other.tag,self.tag);
        
    }
}
