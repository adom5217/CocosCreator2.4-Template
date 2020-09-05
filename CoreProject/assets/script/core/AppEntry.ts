import App from "./App";
import MainCtrl from "../module/main/MainCtrl";
import MainView from "../module/main/MainView";
import { ResFile, ViewShowType } from "./const/CoreConst";
import { UICF,UIID } from "./ui/UIConfig";
const {ccclass, executionOrder,property} = cc._decorator;

/*
 * 游戏入口
 */
@ccclass
@executionOrder(-1)
export default class AppEntry extends cc.Component 
{
    @property(cc.Boolean)
    useFgui: Boolean = false; //切换UI

    protected onLoad(): void 
    {
        this.loadJson();

    }
    
    protected update(dt: number): void {
        App.TimeManager.onUpdate(dt);
        App.ResManager.onUpdate(dt);
    }

    private loadJson(): void {
        const resJson: Array<ResFile> = [
            {
                url: 'data/systemConfig',
                type: cc.JsonAsset
            },
            {
                url: 'resource',
                type: cc.JsonAsset
            }
        ]
        App.LoadManager.loadArray(resJson, this.onJson, this.onJsonError, null, this);
    }

    private onJson(): void {
        App.DebugUtils.isDebug = true;
        App.DebugUtils.init();

        App.SoundManager.init();
        App.I18nManager.init();
        App.ResManager.init();
        App.LoadManager.init();
        App.PlatformManager.init();
        App.SystemManager.init();
        App.StageManager.init();
        App.LayerManager.init();
        App.ModelManager.init();
        App.ViewManager.init();

        if(this.useFgui==true)
        {
            //fgui 初始化
            App.LoadManager.loadPackage('preload', this.onPreload, null, null, this);
        }else
        {
            //ccui 初始化
            App.UIManager.initUIConf(UICF);
            App.UIManager.open(UIID.UILogin);//第一个UI
        }
        
    }

    private onJsonError(): void {
        App.DebugUtils.error('加载错误重新加载游戏！');
    }

    private onPreload(): void {
        App.FguiManager.initConfig();
        App.FguiManager.init();

        App.LoadManager.loadPackage('uiShare', this.onMain, null, null, this);
    }

    private onMain(): void {
        App.ViewManager.show(MainCtrl, null, MainView, null, ViewShowType.MULTI_VIEW);
    }

}
