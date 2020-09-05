import { UIView } from "../core/ui/UIView";
import { UIID } from "../core/ui/UIConfig";
import App from "../core/App";



const {ccclass, property} = cc._decorator;

@ccclass
export default class UILogin extends UIView {

    public onLogin() {
        // 连续打开2个界面
        App.UIManager.replace(UIID.UIHall);
        App.UIManager.open(UIID.UINotice);
    }
}
