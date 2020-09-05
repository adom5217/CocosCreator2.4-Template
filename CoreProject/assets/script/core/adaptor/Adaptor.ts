
const DESIGN_SIZE = {
	width: 2560,
	height: 1440,
	crown: 2560 / 1440
}

export default class Adaptor {

	//全屏适配
	//调用时机：在监听到窗口大小变化时 + 场景onLoad时
	//场景onLoad时的调用是因为场景初始化时是用编辑器里的设计尺寸布局的，所以需要在调用一次重新布局
	//如果要优化，最简单的就是，采用全局设计尺寸的概念，忽略编辑器的设计尺寸，需要改引擎层
	public static adaptScreen(): void {
		var fs = cc.view.getFrameSize();
		var aa = DESIGN_SIZE.crown;
		var bb = fs.width / fs.height;
		//aa = bb;	//居中
		if (aa === bb) {
			cc.view.setDesignResolutionSize(DESIGN_SIZE.width, DESIGN_SIZE.height, cc.ResolutionPolicy.SHOW_ALL);
		}
		else if (aa > bb) {
			cc.view.setDesignResolutionSize(DESIGN_SIZE.width, fs.height, cc.ResolutionPolicy.FIXED_WIDTH);
		}
		else {
			cc.view.setDesignResolutionSize(fs.width, DESIGN_SIZE.height, cc.ResolutionPolicy.FIXED_HEIGHT);
		}

		//cc.log("DESIGN_SIZE.width " + DESIGN_SIZE.width)
		//cc.log("DESIGN_SIZE.height " + DESIGN_SIZE.height)
	}

	//与adaptScreen是一样的
	public static adaptScreen2(): void {
		var fs = cc.view.getFrameSize();
		var scaleX = fs.width / DESIGN_SIZE.width, scaleY = fs.height / DESIGN_SIZE.height;
		var fitScale = Math.min(scaleX, scaleY);
		var width = fs.width / fitScale;
		var height = fs.height / fitScale;
		cc.view.setDesignResolutionSize(width, height, cc.ResolutionPolicy.SHOW_ALL);
	}

	//强制 横竖屏适配 false 竖屏 true 横

	public static adaptOrientation(bLandspace: boolean): void {

		// bb.log("adaptOrientation " + bLandspace);

		//设置原生朝向
		Adaptor.setNativeOrientation(bLandspace);

		let frameSize = cc.view.getFrameSize();
		if (bLandspace) {
			DESIGN_SIZE.width = 2560;
			DESIGN_SIZE.height = 1440;
			cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);

			// if (frameSize.height > frameSize.width) {
			// 	cc.view.setFrameSize(frameSize.height, frameSize.width);
			// }
		}
		else {
			DESIGN_SIZE.width = 1440;
			DESIGN_SIZE.height = 2560;
			cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);

			// if (frameSize.width > frameSize.height) {
			// 	cc.view.setFrameSize(frameSize.height, frameSize.width);
			// }
		}

		DESIGN_SIZE.crown = DESIGN_SIZE.width / DESIGN_SIZE.height;
		Adaptor.adaptScreen();
	}

	//设置原生朝向
	public static setNativeOrientation(bLandspace) {
		// bb.log("setNativeOrientation " + bLandspace);
		var dir = "H";
		if (bLandspace) {
			dir = "H";
		}
		else {
			dir = "V";
		}

		if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
			jsb.reflection.callStaticMethod('org/cocos2dx/javascript/AppActivity', 'setOrientation', '(Ljava/lang/String;)V', dir);
		}
		else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {

			jsb.reflection.callStaticMethod('AppController', 'setOrientation:', dir);
		}
	}
	//是否是宽屏
	public static isWideScreen() {
		let frameSize = cc.view.getFrameSize();

		var ret = 0;
		//AspectRatio
		let AspectRatio: Number = parseFloat((frameSize.height / frameSize.width).toFixed(4))
		//iphone x xs pro // >= 0.5625 0.4618 0.4620  4621 iphone X
		if (AspectRatio <= 0.48) //iphone x 适配
		{
			ret = 1
		}
		else if (AspectRatio >= 0.5625)//16:9
		{
			ret = 0
		}
		else {
			ret = 2  // 16:9 <---> iphone x 
		}
		return ret
	}
	public static getAspectRatio() {
		let frameSize = cc.view.getFrameSize();
		return parseFloat((frameSize.height / frameSize.width).toFixed(4))
	}
	public static getAspectWidth(): number {
		var width = 2560
		if (cc.winSize.width >= 3118) {
			width = 3118
		}
		else {
			width = cc.winSize.width
		}
		return width / 2 //节点都是0.5的情况
	}
	//进入全屏

	public static isFullScreen(): boolean {
		return document.fullscreen;
	}
	public static setFullScreen(bFull: boolean): void {
		if (cc.sys.isNative) { return; }
		let full = document.fullscreen || document.fullscreenElement;
		if (bFull === full) {
			return;
		}

		if (!full) {
			var de = document.documentElement;
			if (de.requestFullscreen) {
				de["requestFullscreen"]();
			} else if (de["mozRequestFullScreen"]) {
				de["mozRequestFullScreen"]();
			} else if (de["webkitRequestFullScreen"]) {
				de["webkitRequestFullScreen"]();
			}
		}
		else {
			var dc = document;
			if (dc.exitFullscreen) {
				dc["exitFullscreen"]();
			} else if (dc["mozCancelFullScreen"]) {
				dc["mozCancelFullScreen"]();
			} else if (dc["webkitCancelFullScreen"]) {
				dc["webkitCancelFullScreen"]();
			}
		}
	}
}

// cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, (scene: cc.SceneAsset) => {
// 		Adaptor.adaptScreen();
// });