import { INetworkTips, DefStringProtocol, NetData } from "../core/net/NetInterface";
import { NetNode } from "../core/net/NetNode";
import { WebSock } from "../core/net/WebSock";
import App from "../core/App";




const { ccclass, property } = cc._decorator;

class NetTips implements INetworkTips {
    private getLabel(): cc.Label {
        let label = null;
        let node = cc.director.getScene().getChildByName("@net_tip_label");
        if (node) {
            label = node.getComponent(cc.Label);
        } else {
            node = new cc.Node("@net_tip_label");
            label = node.addComponent(cc.Label);
            node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        }
        return label;
    }

    connectTips(isShow: boolean): void {
        if (isShow) {
            this.getLabel().string = "Connecting";
            this.getLabel().node.active = true;
        } else {
            this.getLabel().node.active = false;
        }
    }

    reconnectTips(isShow: boolean): void {
        if (isShow) {
            this.getLabel().string = "Reconnecting";
            this.getLabel().node.active = true;
        } else {
            this.getLabel().node.active = false;
        }
    }

    requestTips(isShow: boolean): void {
        if (isShow) {
            this.getLabel().string = "Requesting";
            this.getLabel().node.active = true;
        } else {
            this.getLabel().node.active = false;
        }
    }
}

@ccclass
export default class NetExample extends cc.Component {
    @property(cc.Label)
    textLabel: cc.Label = null;
    @property(cc.Label)
    urlLabel: cc.Label = null;
    @property(cc.RichText)
    msgLabel: cc.RichText = null;
    private lineCount: number = 0;
   
    onLoad() {
        let Node = new NetNode();
        Node.init(new WebSock(), new DefStringProtocol(), new NetTips());
        Node.setResponeHandler(0, (cmd: number, data: NetData) => {
            if (this.lineCount > 5) {
                let idx = this.msgLabel.string.search("\n");
                this.msgLabel.string = this.msgLabel.string.substr(idx + 1);
            }
            this.msgLabel.string += `${data}\n`;
            ++this.lineCount;
        });
        App.NetManager.setNetNode(Node);
    }

    onConnectClick() {
        App.NetManager.connect({ url: this.urlLabel.string });
    }

    onSendClick() {
        App.NetManager.send(this.textLabel.string);
    }

    onDisconnectClick() {
        App.NetManager.close();
    }

    // update (dt) {}
}
