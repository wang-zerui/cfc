import { ICredentials } from './interface/profile';
let CfcClient = require('@baiducloud/sdk').CfcClient;

export default class Client {
  static cfcClient: any;

  static setCfcClient(endpoint: string, credentials: ICredentials) {
    const cfcClient = new CfcClient({
      endpoint,
      credentials,
    });
    this.cfcClient = cfcClient;
  }
}
