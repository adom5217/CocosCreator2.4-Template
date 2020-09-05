import Singleton from "../base/Singleton";

/*
 * @Author: yanmingjie0223@qq.com
 * @Date: 2019-01-17 11:28:13
 * @Last Modified by: yanmingjie0223@qq.com
 * @Last Modified time: 2020-07-01 22:27:54
 */
export default class PathManager extends Singleton {

    public readonly root: string = '';
    // fgui地址
    public readonly fgui: string = 'fgui/'

    // ccui地址
    public readonly ccui: string = 'ccui/'

    public constructor() {
        super();
    }

    /**
     * 获取包名加载地址
     * @param pkgName 包名
     */
    public getPkgPath(pkgName: string): string {
        return `${this.root}${this.fgui}${pkgName}`;
    }

    /**
     * 获取加载地址
     * @param path 资源名
     */
    public getUIPath(path: string): string {
        return `${this.root}${this.ccui}${path}`;
    }

}