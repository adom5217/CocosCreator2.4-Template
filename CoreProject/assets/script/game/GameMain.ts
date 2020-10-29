import { UIView } from "../core/ui/UIView";
import { UIID } from "../core/ui/UIConfig";
import App from "../core/App";



const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStart extends UIView {

    @property([cc.Node])
    bgList:cc.Node[] = [];

    @property(cc.Float)
    spend = 1.0;
    start()
    {
        //App.SoundManager.playMusic("audio/bg5");
    }
    //背景跑起来
    update (dt) 
    {
        this.bgList.forEach((it)=>{
            if(it)
            {
                let y = it.position.y-this.spend;
                if(y<-1600)//循环
                    y = 1600;
                it.setPosition(it.position.x,y);
            }
        });
    }
    
    //返回
    public onBack() {
        
        App.UIManager.replace(UIID.GameStart);
        
    }
}
