import App from "../App";

//鼠标点击松开后触发
export function AddEvent(node: cc.Node, func: Function,tag:any,EventType:any = cc.Node.EventType.TOUCH_END)
 {
    if (!node) {
        return cc.error("AddEvent Error,node is null");
    }
    node.on(EventType, (e) => {
        
        let btn = node.getComponent(cc.Button);
        if (btn != null && btn.interactable == false) //如果是按钮禁用
            return;
            
        App.SoundManager.playEffect('audio/click_sound');
        // cc.log("AddEvent-ClickVal", node["Click"])
        // //防止暴力点击 过频繁
        // if(!!node["Click"]) {
        //     cc.log("点击过于频繁");
        //     if(node["tmrHelper"] === null || node["tmrHelper"] === undefined || node["tmrHelper"] === 0) {
        //         node["tmrHelper"] = TimerCenter.delay(0.3,()=>{
        //             node["Click"] = false;
        //             node["tmrHelper"] = 0;
        //         }, GameApp.getInstance())
        //     }
        //     return;
        // }

        // node["Click"] = true;
        // node["tmrHelper"] = 0;
        // node["tmrHelper"] = TimerCenter.delay(0.3,()=>{
        //     node["Click"] = false;
        //     node["tmrHelper"] = 0;
        // }, GameApp.getInstance())

        func(e);
    },tag)
}
export function RemoveEvent(node:cc.Node,func:Function,tag:any,EventType:any = cc.Node.EventType.TOUCH_END)
{
    node.off(EventType,func,tag);
}
