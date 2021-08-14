import { ICredentials } from './interface/profile';
let CfcClient = require('@baiducloud/sdk').CfcClient;

export default class Client {
  static cfcClient: any;

  static setCfcClient(credentials: ICredentials, endpoint?: string) {
    if (endpoint) {
      const cfcClient = new CfcClient({
        endpoint,
        credentials: {
          ak: credentials.AccessKeyID,
          sk: credentials.SecretAccessKey,
        },
      });
      this.cfcClient = cfcClient;
    } else {
      const cfcClient = new CfcClient({
        credentials: {
          ak: credentials.AccessKeyID,
          sk: credentials.SecretAccessKey,
        },
      });
      this.cfcClient = cfcClient;
    }
  }
}
