import { ICredentials } from '../interface/profile';
interface IProps {
    target: string;
    source: string;
    relationId?: string;
    data?: object;
}
export default class Trigger {
    constructor(credentials: ICredentials);
    getBrnByFunctionName(functionName: any): Promise<any>;
    create(props: IProps): Promise<any>;
    update(props: IProps): Promise<any>;
    list(functionBrn: string, table?: boolean): Promise<any>;
    remove(props: IProps): Promise<any>;
}
export {};
