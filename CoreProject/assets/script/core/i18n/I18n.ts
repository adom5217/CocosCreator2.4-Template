import { I18nEnConfig, I18nZhConfig } from "../../config/I18nConfig";
import App from "../App";
import { I18nType } from "../const/CoreConst";

/*
 * @Author: yanmingjie
 * @Date: 2019-08-19 23:11:05
 * @Last Modified by: yanmingjie0223@qq.com
 * @Last Modified time: 2020-07-01 21:52:10
 */
export default class I18n {

    private _language: I18nType;

    private EnConfig: { [key: string]: string; } = { };
    private ZhConfig: { [key: string]: string; } = { };
    
    public constructor() {
        // 构造函数
    }

    /**
     * 获取对应的文本
     * @param key 文本对应key
     * @param values 对应的取代值 例如：[1] ${name}来了 结果是：1来了
     */
    public getText(key: string, values?: Array<string>): string {
        let config: any;
        let configName: string;
        switch (this.language) {
            case I18nType.EN:
                //config = I18nEnConfig;
                config = this.EnConfig;
                configName = 'I18nEnConfig';
                break;
            case I18nType.ZH:
                //config = I18nZhConfig;
                config = this.ZhConfig;
                configName = 'I18nZhConfig';
                break;
            default:
                App.Debug.error(`${this.language} 无对应语言文本配置！`);
                return '';
        }
        let value: string = config[key];
        if (!value) {
            App.Debug.error(`${configName}中无key为${key}文本配置！`);
            return '';
        }
        // 替换指定值
        if (values && values.length > 0) {
            const valueLen: number = values.length;
            const reg: RegExp = new RegExp('\\${\\w+}', 'g');
            const macths: Array<string> = value.match(reg);
            for (let i = 0, len = macths.length; i < len; i++) {
                if (valueLen > i) {
                    value = value.replace(macths[i], values[i]);
                }
            }
        }
        return value;
    }

    public get language(): I18nType {
        return this._language;
    }

    public set language(language: I18nType) {
        this._language = language;
    }
    //外部初始化配置
    public setConfig(language,config:any)
    {
        switch (language) 
        {
            case I18nType.EN:
                this.EnConfig=config;
                break;
            case I18nType.ZH:
                this.ZhConfig = config;
                break;
            default:
                App.Debug.error(`${this.language} 无对应语言文本配置！`);
                return '';
        }
    }
}