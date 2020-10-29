
import { UIConf } from "./UIManager";

export enum UIID {
    UILogin,
    UIHall,
    UINotice,
    UIBag,

    GameStart,
    GameMain,
}
 
export let UICF: { [key: number]: UIConf } = {
    [UIID.UILogin]: { prefab: "Prefab/Login" },
    [UIID.UIHall]: { prefab: "Prefab/Hall" },
    [UIID.UINotice]: { prefab: "Prefab/Notice" },
    [UIID.UIBag]: { prefab: "Prefab/Bag", preventTouch: true },

    [UIID.GameStart]: { prefab: "game/prefabs/GameStart" },
    [UIID.GameMain]: { prefab: "game/prefabs/GameMain" },
}
