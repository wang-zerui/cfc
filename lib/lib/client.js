"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CfcClient = require('@baiducloud/sdk').CfcClient;
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.setCfcClient = function (credentials, endpoint) {
        if (endpoint) {
            var cfcClient = new CfcClient({
                endpoint: endpoint,
                credentials: {
                    ak: credentials.AccessKeyID,
                    sk: credentials.SecretAccessKey
                },
            });
            this.cfcClient = cfcClient;
        }
        else {
            var cfcClient = new CfcClient({
                credentials: {
                    ak: credentials.AccessKeyID,
                    sk: credentials.SecretAccessKey
                },
            });
            this.cfcClient = cfcClient;
        }
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFFckQ7SUFBQTtJQXlCQSxDQUFDO0lBdEJRLG1CQUFZLEdBQW5CLFVBQW9CLFdBQXlCLEVBQUUsUUFBaUI7UUFDOUQsSUFBRyxRQUFRLEVBQUM7WUFDVixJQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQztnQkFDOUIsUUFBUSxVQUFBO2dCQUNSLFdBQVcsRUFBQztvQkFDVixFQUFFLEVBQUMsV0FBVyxDQUFDLFdBQVc7b0JBQzFCLEVBQUUsRUFBQyxXQUFXLENBQUMsZUFBZTtpQkFDL0I7YUFDRixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUM1QjthQUFJO1lBQ0gsSUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUM7Z0JBQzlCLFdBQVcsRUFBQztvQkFDVixFQUFFLEVBQUMsV0FBVyxDQUFDLFdBQVc7b0JBQzFCLEVBQUUsRUFBQyxXQUFXLENBQUMsZUFBZTtpQkFDL0I7YUFDRixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUM1QjtJQUdILENBQUM7SUFDSCxhQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQyJ9