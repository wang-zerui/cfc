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
var CONFIGS = require('./config');
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
     * 部署函数
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var CfcClient, credentials, endpoint, environment, functionName, description, timeout, runtime, handler, memorySize, codeUri, publish, config, client, ZipFile, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        CfcClient = require('@baiducloud/sdk').CfcClient;
                        credentials = lodash_get_1.default(inputs, "credentials");
                        endpoint = lodash_get_1.default(inputs, "props.endpoint") || CONFIGS.endpoint;
                        environment = lodash_get_1.default(inputs, "props.environment");
                        functionName = lodash_get_1.default(inputs, "props.functionName") || CONFIGS.functionName;
                        description = lodash_get_1.default(inputs, "props.description");
                        timeout = lodash_get_1.default(inputs, "props.timeout");
                        runtime = lodash_get_1.default(inputs, "props.runtime");
                        handler = lodash_get_1.default(inputs, "props.handler");
                        memorySize = lodash_get_1.default(inputs, "props.memorySize");
                        codeUri = lodash_get_1.default(inputs, "props.code.codeUri");
                        publish = lodash_get_1.default(inputs, "props.code.publish");
                        config = {
                            endpoint: endpoint,
                            credentials: {
                                ak: credentials.AccessKeyID,
                                sk: credentials.SecretAccessKey,
                            }
                        };
                        client = new CfcClient(config);
                        return [4 /*yield*/, this.startZip(codeUri)];
                    case 1:
                        ZipFile = _a.sent();
                        body = {
                            'Code': {
                                'ZipFile': ZipFile,
                                'Publish': publish,
                            },
                            'Description': description,
                            'Timeout': timeout,
                            'FunctionName': functionName,
                            'Handler': handler,
                            'Runtime': runtime,
                            'Environment': {
                                'Variables': environment
                            }
                        };
                        //TODO:处理非必须参数
                        if (memorySize) {
                            body["MemorySize"] = memorySize;
                        }
                        //创建函数
                        client.createFunction(body).then(function (response) {
                            logger_1.default.info("Creating Funtion");
                            logger_1.default.info(response.body);
                            return response;
                        }).then(function (response) {
                            logger_1.default.info("Creating Trigger");
                            var body = {
                                'Target': response.body.FunctionBrn,
                                'Source': inputs.props.trigger.source,
                                'Data': inputs.props.trigger.data,
                            };
                            return client.createRelation(body);
                        }).then(function (response) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQTBDO0FBQzFDLDJEQUFxQztBQUVyQywwQ0FBbUI7QUFDbkIsOENBQXVCO0FBQ3ZCLGdEQUF5QjtBQUN6QiwwREFBNkI7QUFDN0IsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2pDLElBQUksR0FBRyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7QUFFdEI7SUFBMkMsaUNBQWE7SUFDdEQsdUJBQVksS0FBSztlQUNmLGtCQUFNLEtBQUssQ0FBQztJQUNkLENBQUM7SUFDRDs7OztTQUlFO0lBQ2EsK0JBQU8sR0FBdkIsVUFBd0IsR0FBRyxFQUFFLE9BQU8sRUFBRSxTQUFTOzs7OztnQkFDOUMsSUFBSTtvQkFDRyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDNUIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO29CQUN4QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3ZCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQUUsQ0FBQyxZQUFZLENBQUMsS0FBRyxPQUFTLENBQUMsQ0FBQyxDQUFBO3FCQUM3Qzt5QkFBTTt3QkFDRixLQUFLLEdBQUcsWUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQTt3QkFDbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVEsRUFBRSxLQUFLOzRCQUM3QixJQUFJLFFBQVEsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQTs0QkFDdkMsSUFBSSxJQUFJLEdBQUcsWUFBRSxDQUFDLFFB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