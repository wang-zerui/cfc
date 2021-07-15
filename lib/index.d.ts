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
     * 处理输入
     * @param inputs
     * @returns
     */
    protected handleInputs(inputs: InputProps): Promise<{
        config: {
            endpoint: string;
            credentials: {
                ak: any;
                sk: any;
            };
        };
        body: {
            Code: {
                ZipFile: string;
            };
            Description: any;
            FunctionName: any;
            Runtime: any;
            MemorySize: any;
            Handler: any;
            Timeout: any;
        };
    }>;
    /**
     * 更新函数代码
     * @param inputs
     * @returns
    */
    protected updateCode(inputs: InputProps): Promise<void>;
    /**
     * 更新函数配置
     * @param inputs
     * @returns
    */
    protected updateConfig(inputs: InputProps): Promise<void>;
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
     * 检查函数是否已有
     * @param client
     * @param functionName
     * @returns
     */
    protected checkCreated(client: any, functionName: String): Promise<any>;
    /**
     * 部署函数
     * @param inputs
     * @returns
     */
    deploy(inputs: InputProps): Promise<void>;
}
