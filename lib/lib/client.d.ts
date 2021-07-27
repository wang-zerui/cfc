import { ICredentials } from './interface/profile';
export default class Client {
    static cfcClient: any;
    static setCfcClient(endpoint: string, credentials: ICredentials): void;
}
