import { ICredentials } from './interface/profile';
let CfcClient = require('@baiducloud/sdk').CfcClient;

export default class Client {
  static cfcClient: any;

  static setCfcClient(endpoint: string, credentials: ICredentials) {
    const cfcClient = new CfcClient({
      endpoint,
      credentials:{
        ak:credentials.AccessKeyID,
        sk:credentials.SecretAccessKey
      },
    });
    this.cfcClient = cfcClient;
  }
}
