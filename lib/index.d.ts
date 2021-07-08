import BaseComponent from './common/base';
import { InputProps } from './common/entity';
export default class ComponentDemo extends BaseComponent {
    constructor(props: any);
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
     * demo 实例
     * @param inputs
     * @returns
     */
    deploy(inputs: InputProps): Promise<void>;
}
