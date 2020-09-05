import { UIView } from "../core/ui/UIView";
import App from "../core/App";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UIBag extends UIView {
    private selectItem: cc.SpriteFrame = null;
    private selectNode: cc.Node = null;
    
    public init() {

    }

    public onClick(event) {
        if (this.selectNode) {
            this.selectNode.setScale(1);
        }

        let node : cc.Node = event.target;
        this.selectNode = node;
        this.selectNode.setScale(1.5);

        let sprite = node.getComponent(cc.Sprite);
        this.selectItem = sprite.spriteFrame;
    }

    public onOkClick() {
        App.UIManager.close();
    }

    public onClose(): any {
        return this.selectItem;
    }
}
