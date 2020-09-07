

const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchMoveEvent extends cc.Component {

     isTouchActive:boolean = false; //激活状态
     initX:any = 0;
     initY:any = 0;
     onLoad () 
     {
        this.initX = this.node.x;
        this.initY = this.node.y;
        this.restart();
     }

    public restart() 
    {
       
        this.node.x = this.initX;
        this.node.y = this.initY;
        this.touchEvent();
    }

    //触摸屏幕拖动事件
    public touchEvent()
    {
        //触摸开始
        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(event)
        {
            //getDelata()方法是获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
            let delta=event.getDelta();

            this.x += delta.x;
            this.y += delta.y;
        
        }, this.node)
 
        //触摸结束
        this.node.on(cc.Node.EventType.TOUCH_END, function(){
            this.onTouchEnd();
        }, this)

    }
    //移除拖事件
    removeEvent()
    {
        this.node.off(cc.Node.EventType.TOUCH_MOVE);
        this.node.off(cc.Node.EventType.TOUCH_END);
    }
    isCollison = false; //是否接触
    onCollisionEnter(other:any,self:any)
    {
        cc.log("onCollisionEnter"+other.tag,self.tag);
        
        this.isCollison = true;
        
    }
    onTouchEnd()
    {
        this.removeEvent();
        if(this.isCollison)
        {
            
           
        }else
        {
           
        }
        
        
    }
    onCollisionExit(other:any,self:any)
    {
        cc.log("onCollisionExit",other.tag,self.tag);
        this.isCollison = false;
    }
}
