import App from "./App";
import MainCtrl from "../module/main/MainCtrl";
import MainView from "../module/main/MainView";
import { GlobelEvent, ResFile, ViewShowType } from "./const/CoreConst";
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
    frameRate = 0; //帧率
    protected onLoad(): void 
    {
        
        this.frameRate = cc.game.getFrameRate();
        cc.log('帧率：'+this.frameRate);
        this.loadJson();
        //碰撞
        cc.director.getCollisionManager().enabled = true; 
        cc.director.getPhysicsManager().enabled = true;
        cc.view.enableAutoFullScreen(true);
        //切换
    　　cc.game.on(cc.game.EVENT_HIDE, function(){
            cc.log("游戏进入后台");
            App.EventManager.emitEvent(GlobelEvent.GAME_Hide);
    　　},this);
    
    
    　　cc.game.on(cc.game.EVENT_SHOW, function(){
            cc.log("游戏进入前台");
            this.frameIndex =0;
            App.EventManager.emitEvent(GlobelEvent.GAME_SHOW);
    　　},this);
            
    }
    frameIndex =0;
    protected update(dt: number): void {
        this.frameIndex++;
        if(this.frameIndex%this.frameRate==0)
        {//每秒刷一次
            App.TimeManager.onUpdate(1);
            App.ResManager.onUpdate(1);
        }
        if(this.frameIndex == this.frameRate*100000)
            this.frameIndex =0;
    }

    private loadJson(): void {
        const resJson: Array<ResFile> = [
            {
                url: 'data/systemConfig',
                type: cc.JsonAsset,
                data:''
            },
            {
                url: 'resource',
                type: cc.JsonAsset,
                data:''
            }
        ]
        App.LoadManager.loadArray(resJson, this.onJson, this.onJsonError, null, this);
    }

    private onJson(): void {
        App.Debug.isDebug = true; //log打开
        App.Debug.init();
        
        App.I18nManager.init();
        App.SoundManager.init();
        App.ResManager.init();
        App.LoadManager.init();
        App.PlatformManager.init();
        App.SystemManager.init();
        App.StageManager.init();
        App.LayerManager.init();
        App.ModelManager.init();
        App.ViewManager.init();
        App.Debug.log('加载ok开始初始化..');
        if(this.useFgui==true)
        {
            //fgui 初始化
            App.LoadManager.loadPackage('preload', this.onPreload, null, null, this);
        }else
        {
            //ccui 初始化
            App.UIManager.initUIConf(UICF);
            App.UIManager.open(UIID.UILogin);//第一个UI
            //App.UIManager.open(UIID.GameStart);//第一个UI
        }
        
    }

    private onJsonError(): void {
        App.Debug.error('加载错误重新加载游戏！');
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
