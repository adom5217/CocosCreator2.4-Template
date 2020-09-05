import { UIView } from "../core/ui/UIView";

import { UIID } from "../core/ui/UIConfig";
import App from "../core/App";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHall extends UIView {

    @property({type : cc.Sprite})
    weapon: cc.Sprite = null;

    public onBag() {
        App.UIManager.open(UIID.UIBag);
    }

    public onNotice() {
        App.UIManager.open(UIID.UINotice);
    }

    public onTop(preID: number, item: cc.SpriteFrame) {
        this.weapon.spriteFrame = item;
    }
}
