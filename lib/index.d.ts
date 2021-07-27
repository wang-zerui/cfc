import BaseComponent from './common/base';
import { InputProps } from './common/entity';
export default class ComponentDemo extends BaseComponent {
    constructor(props: any);
    /**
     * 部署函数
     * @param inputs
     * @returns
     */
    deploy(inputs: InputProps): Promise<any>;
    /**
     * 帮助
     * @returns
     */
    help(): Promise<void>;
}
