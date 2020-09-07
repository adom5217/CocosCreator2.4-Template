
const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerCtrl extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

   
    start () {

    }

    onLoad () 
     {
        
        this.touchEvent();
     }

    public restart() 
    {
        
        this.touchEvent();
    }

    //触摸屏幕拖动事件
    public touchEvent()
    {
        //触摸开始
        this.node.on(cc.Node.EventType.TOUCH_START,function(event)
        {
            this.OnTouchStart();
        },this);

        
        //触摸结束
        this.node.on(cc.Node.EventType.TOUCH_END, function(){
            this.OnTouchEnd();
        }, this)

    }
    //移除拖事件
    removeEvent()
    {
        this.node.off(cc.Node.EventType.TOUCH_START);
        this.node.off(cc.Node.EventType.TOUCH_END);
    }

    OnTouchStart()
    {
        this.removeEvent();
        //缓动
        cc.tween(this.node)
        .to(0.1, { scale: 0.95 })
        .to(0.1, { scale: 1 })
        .start()
      
        //点击了
        
    }
    OnTouchEnd()
    {
        
    }
}
