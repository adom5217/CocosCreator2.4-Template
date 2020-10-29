import { UIView } from "../core/ui/UIView";
import { UIID } from "../core/ui/UIConfig";
import App from "../core/App";



const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStart extends UIView {

    public onLogin() {
        //去主界面
        App.UIManager.replace(UIID.GameMain);
    }
}
