"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CfcClient = require('@baiducloud/sdk').CfcClient;
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.setCfcClient = function (endpoint, credentials) {
        var cfcClient = new CfcClient({
            endpoint: endpoint,
            credentials: {
                ak: credentials.AccessKeyID,
                sk: credentials.SecretAccessKey
            },
        });
        this.cfcClient = cfcClient;
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFFckQ7SUFBQTtJQWFBLENBQUM7SUFWUSxtQkFBWSxHQUFuQixVQUFvQixRQUFnQixFQUFFLFdBQXlCO1FBQzdELElBQU0sU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDO1lBQzlCLFFBQVEsVUFBQTtZQUNSLFdBQVcsRUFBQztnQkFDVixFQUFFLEVBQUMsV0FBVyxDQUFDLFdBQVc7Z0JBQzFCLEVBQUUsRUFBQyxXQUFXLENBQUMsZUFBZTthQUMvQjtTQUNGLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFDSCxhQUFDO0FBQUQsQ0FBQyxBQWJELElBYUMifQ==