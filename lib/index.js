"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __importDefault(require("./common/base"));
var logger_1 = __importDefault(require("./common/logger"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var jszip_1 = __importDefault(require("jszip"));
var lodash_get_1 = __importDefault(require("lodash.get"));
var zip = new jszip_1.default();
var ComponentDemo = /** @class */ (function (_super) {
    __extends(ComponentDemo, _super);
    function ComponentDemo(props) {
        return _super.call(this, props) || this;
    }
    /**
       * 读取目录及文件
       * @param obj
       * @param nowPath
       */
    ComponentDemo.prototype.readDir = function (obj, nowPath, targetDir) {
        return __awaiter(this, void 0, void 0, function () {
            var pathDir, _dir, files;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    pathDir = nowPath.split('/');
                    _dir = pathDir[pathDir.length - 1];
                    if (_dir.includes('.')) {
                        obj.file(_dir, fs_1.default.readFileSync("" + nowPath));
                    }
                    else {
                        files = fs_1.default.readdirSync(nowPath);
                        files.forEach(function (fileName, index) {
                            var fillPath = nowPath + '/' + fileName;
                            var file = fs_1.default.statSync(fillPath);
                            if (file.isDirectory()) {
                                var dirlist = zip.folder(path_1.default.relative(targetDir, fillPath));
                                _this.readDir(dirlist, fillPath, targetDir);
                            }
                            else {
                                obj.file(fileName, fs_1.default.readFileSync(fillPath));
                            }
                        });
                    }
                }
                catch (e) { }
                return [2 /*return*/];
            });
        });
    };
    /**
     * 开始压缩文件
     * @param codePath
     * @returns
     */
    ComponentDemo.prototype.startZip = function (codePath) {
        return __awaiter(this, void 0, void 0, function () {
            var targetDir, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetDir = path_1.default.resolve(codePath);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.readDir(zip, targetDir, targetDir)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, zip.generateAsync({
                                type: 'nodebuffer',
                                compression: 'DEFLATE',
                            })];
                    case 3:
                        data = _a.sent();
                        fs_1.default.writeFile("hello.zip", data, function (err) { });
                        return [2 /*return*/, Buffer.from(data).toString('base64')];
                    case 4:
                        e_1 = _a.sent();
                        logger_1.default.error('File does not exist or file is invalid. please check');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * demo 实例
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var CfcClient, credentials, endpoint, environment, functionName, description, timeout, runtime, handler, memorySize, codeUri, publish, dryRun, config, client, ZipFile, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        CfcClient = require('@baiducloud/sdk').CfcClient;
                        credentials = lodash_get_1.default(inputs, "credentials");
                        endpoint = lodash_get_1.default(inputs, "props.endpoint");
                        environment = lodash_get_1.default(inputs, "props.environment");
                        functionName = lodash_get_1.default(inputs, "props.functionName");
                        description = lodash_get_1.default(inputs, "props.description");
                        timeout = lodash_get_1.default(inputs, "props.timeout");
                        runtime = lodash_get_1.default(inputs, "props.runtime");
                        handler = lodash_get_1.default(inputs, "props.handler");
                        memorySize = lodash_get_1.default(inputs, "props.memorySize");
                        codeUri = lodash_get_1.default(inputs, "props.code.codeUri");
                        publish = lodash_get_1.default(inputs, "props.code.publish");
                        dryRun = lodash_get_1.default(inputs, "props.code.dryRun");
                        config = {
                            endpoint: endpoint,
                            credentials: {
                                ak: credentials.AccessKeyID,
                                sk: credentials.SecretAccessKey,
                            }
                        };
                        logger_1.default.info(config);
                        client = new CfcClient(config);
                        return [4 /*yield*/, this.startZip(codeUri)];
                    case 1:
                        ZipFile = _a.sent();
                        body = {
                            'Code': {
                                'ZipFile': ZipFile,
                                'Publish': publish,
                                'DryRun': dryRun
                            },
                            'Description': description,
                            'Timeout': timeout,
                            'FunctionName': functionName,
                            'Handler': handler,
                            'Runtime': runtime,
                            'MemorySize': memorySize,
                            'Environment': {
                                'Variables': environment
                            }
                        };
                        logger_1.default.info(body);
                        client.createFunction(body).then(function (response) {
                            // 创建函数成功
                            logger_1.default.info("Creating Funtion");
                            logger_1.default.info(response.body);
                            return response;
                        }).catch(function (err) {
                            // 执行失败
                            logger_1.default.error(err);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQTBDO0FBQzFDLDJEQUFxQztBQUVyQywwQ0FBbUI7QUFDbkIsOENBQXVCO0FBQ3ZCLGdEQUF5QjtBQUN6QiwwREFBNkI7QUFDN0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztBQUV0QjtJQUEyQyxpQ0FBYTtJQUN0RCx1QkFBWSxLQUFLO2VBQ2Ysa0JBQU0sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNEOzs7O1NBSUU7SUFDYSwrQkFBTyxHQUF2QixVQUF3QixHQUFHLEVBQUUsT0FBTyxFQUFFLFNBQVM7Ozs7O2dCQUM5QyxJQUFJO29CQUNHLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUM1QixJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7b0JBQ3hDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDdkIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFHLE9BQVMsQ0FBQyxDQUFDLENBQUE7cUJBQzdDO3lCQUFNO3dCQUNGLEtBQUssR0FBRyxZQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO3dCQUNuQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUSxFQUFFLEtBQUs7NEJBQzdCLElBQUksUUFBUSxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFBOzRCQUN2QyxJQUFJLElBQUksR0FBRyxZQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBOzRCQUNoQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQ0FDdkIsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBRSxjQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFBO2dDQUM3RCxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUE7NkJBQzFDO2lDQUFNO2dDQUNOLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFlBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTs2QkFDN0M7d0JBQ0YsQ0FBQyxDQUFDLENBQUE7cUJBQ0Y7aUJBQ0Q7Z0JBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTs7OztLQUNkO0lBRUQ7Ozs7T0FJRztJQUNhLGdDQUFRLEdBQXhCLFVBQXlCLFFBQWdCOzs7Ozs7d0JBQ2xDLFNBQVMsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBOzs7O3dCQUV2QyxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUE7O3dCQUE3QyxTQUE2QyxDQUFBO3dCQUNoQyxxQkFBTSxHQUFHLENBQUMsYUFBYSxDQUFDO2dDQUNwQyxJQUFJLEVBQUUsWUFBWTtnQ0FDbEIsV0FBVyxFQUFFLFNBQVM7NkJBQ3RCLENBQUMsRUFBQTs7d0JBSEksSUFBSSxHQUFHLFNBR1g7d0JBQ0YsWUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLFVBQVMsR0FBRyxJQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUd4RCxzQkFBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBQTs7O3dCQUczQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFBOzs7Ozs7S0FFckU7SUFDQTs7OztPQUlHO0lBRVUsOEJBQU0sR0FBbkIsVUFBb0IsTUFBa0I7Ozs7Ozt3QkFDaEMsU0FBUyxHQUFFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFDOUMsV0FBVyxHQUFHLG9CQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QyxRQUFRLEdBQUcsb0JBQUcsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzt3QkFDekMsV0FBVyxHQUFHLG9CQUFHLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLENBQUM7d0JBQy9DLFlBQVksR0FBRyxvQkFBRyxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO3dCQUNqRCxXQUFXLEdBQUcsb0JBQUcsQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzt3QkFDL0MsT0FBTyxHQUFHLG9CQUFHLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO3dCQUN2QyxPQUFPLEdBQUcsb0JBQUcsQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUM7d0JBQ3ZDLE9BQU8sR0FBRyxvQkFBRyxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQzt3QkFDdkMsVUFBVSxHQUFHLG9CQUFHLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7d0JBQzdDLE9BQU8sR0FBRyxvQkFBRyxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO3dCQUM1QyxPQUFPLEdBQUcsb0JBQUcsQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLENBQUMsQ0FBQzt3QkFDNUMsTUFBTSxHQUFHLG9CQUFHLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLENBQUM7d0JBQzFDLE1BQU0sR0FBRzs0QkFDWCxRQUFRLEVBQUUsUUFBUTs0QkFDbEIsV0FBVyxFQUFFO2dDQUNULEVBQUUsRUFBRSxXQUFXLENBQUMsV0FBVztnQ0FDM0IsRUFBRSxFQUFFLFdBQVcsQ0FBQyxlQUFlOzZCQUNsQzt5QkFDUCxDQUFDO3dCQUNDLGdCQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNoQixNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ25CLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUF0QyxPQUFPLEdBQUcsU0FBNEI7d0JBQ3hDLElBQUksR0FDTjs0QkFDRSxNQUFNLEVBQUU7Z0NBQ04sU0FBUyxFQUFFLE9BQU87Z0NBQ2xCLFNBQVMsRUFBRSxPQUFPO2dDQUNsQixRQUFRLEVBQUUsTUFBTTs2QkFDakI7NEJBQ0QsYUFBYSxFQUFFLFdBQVc7NEJBQzFCLFNBQVMsRUFBRSxPQUFPOzRCQUNsQixjQUFjLEVBQUUsWUFBWTs0QkFDNUIsU0FBUyxFQUFFLE9BQU87NEJBQ2xCLFNBQVMsRUFBRSxPQUFPOzRCQUNsQixZQUFZLEVBQUUsVUFBVTs0QkFDeEIsYUFBYSxFQUFFO2dDQUNiLFdBQVcsRUFBRSxXQUFXOzZCQUN6Qjt5QkFDRixDQUFDO3dCQUNKLGdCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsQixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLFFBQVE7NEJBQy9DLFNBQVM7NEJBQ1QsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs0QkFDaEMsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMzQixPQUFPLFFBQVEsQ0FBQzt3QkFDcEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRzs0QkFDcEIsT0FBTzs0QkFDUCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDcEIsQ0FBQyxDQUFDLENBQUM7Ozs7O0tBQ0o7SUFDSCxvQkFBQztBQUFELENBQUMsQUEvR0QsQ0FBMkMsY0FBYSxHQStHdkQifQ==