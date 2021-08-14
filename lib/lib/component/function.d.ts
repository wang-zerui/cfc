import { ICredentials } from '../interface/profile';
export default class Function {
    constructor({ endpoint, credentials }: {
        endpoint: string;
        credentials: ICredentials;
    });
    create(props: any): Promise<void>;
    updateCode(props: any): Promise<any>;
    updateConfig(props: any): Promise<void>;
    info(props: any): Promise<void>;
    list(table?: boolean): Promise<any>;
    remove(FunctionName: any): Promise<void>;
    getConfig(props: any): Promise<void>;
    getBrnByFunctionName(functionName: any): Promise<any>;
}
