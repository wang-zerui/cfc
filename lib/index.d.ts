import BaseComponent from './common/base';
import { InputProps } from './common/entity';
export default class ComponentDemo extends BaseComponent {
    constructor(props: any);
    /**
       * 通过函数名获取FunctionBrn
       */
    getBrnByFunctionName(inputs: InputProps): Promise<any>;
    /**
       * 读取目录及文件
       * @param obj
       * @param nowPath
       */
    protected readDir(obj: any, nowPath: any, targetDir: any): Promise<void>;
    /**
     * 开始压缩文件
     * @param codePath
     * @returns
     */
    protected startZip(codePath: string): Promise<string>;
    /**
     * 部署函数
     * @param inputs
     * @returns
     */
    private handleInputs;
    /**
     * 更新函数代码
     * @param inputs
     * @returns
    */
    updatecode(inputs: InputProps): Promise<void>;
    /**
     * 更新函数配置
     * @param inputs
     * @returns
    */
    updateconfig(inputs: InputProps): Promise<void>;
    /**
     * 获取触发器列表
     * @param inputs
     * @returns
     */
    listtriggers(inputs: InputProps): Promise<void>;
    /**
     * 更新触发器
     * @param inputs
     * @returns
     */
    updatetrigger(inputs: InputProps): Promise<void>;
    /**
     * 删除触发器
     * @param inputs
     * @returns
     */
    deletetrigger(inputs: InputProps): Promise<void>;
    /**
     * 删除函数
     * @param inputs
     * @returns
     */
    deletefunction(inputs: InputProps): Promise<void>;
    /**
     * 部署函数
     * @param inputs
     * @returns
     */
    deploy(inputs: InputProps): Promise<void>;
}
