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
var 
// HLogger,
// ILogger,
// getCredential,
// help,
// commandParse,
// loadComponent,
reportComponent = require('@serverless-devs/core').reportComponent;
var base_1 = __importDefault(require("./common/base"));
var logger_1 = __importDefault(require("./common/logger"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var jszip_1 = __importDefault(require("jszip"));
var lodash_get_1 = __importDefault(require("lodash.get"));
// import { type } from 'os';
var CONFIGS = require('./config');
var zip = new jszip_1.default();
var CfcClient = require('@baiducloud/sdk').CfcClient;
var ComponentDemo = /** @class */ (function (_super) {
    __extends(ComponentDemo, _super);
    function ComponentDemo(props) {
        return _super.call(this, props) || this;
    }
    /**
       * 通过函数名获取FunctionBrn
       */
    ComponentDemo.prototype.getBrnByFunctionName = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, FunctionName, config, client, functionBrn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        credentials = lodash_get_1.default(inputs, 'credentials');
                        FunctionName = inputs.props.functionName;
                        config = {
                            credentials: {
                                ak: credentials.AccessKeyID,
                                sk: credentials.SecretAccessKey,
                            }
                        };
                        client = new CfcClient(config);
                        return [4 /*yield*/, client.getFunction(FunctionName).then(function (response) {
                                functionBrn = response.body.Configuration.FunctionBrn;
                            }).catch(function (err) {
                                logger_1.default.error("获取brn错误");
                                logger_1.default.error(err);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, functionBrn];
                }
            });
        });
    };
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
                        fs_1.default.writeFile('hello.zip', data, function (err) { });
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
     * 处理输入
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.handleInputs = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, props, ZipFile, protocol, endpoint, tempInputs, keys, _i, keys_1, i, value, cfcInputs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        credentials = lodash_get_1.default(inputs, 'credentials');
                        props = inputs.props;
                        return [4 /*yield*/, this.startZip(props.code.codeUri || './')];
                    case 1:
                        ZipFile = _a.sent();
                        protocol = props.protocol || CONFIGS.defaultProtocol;
                        endpoint = props.endpoint || CONFIGS.defaultEndpoint;
                        tempInputs = {
                            config: {
                                endpoint: protocol + '://' + endpoint,
                                credentials: {
                                    ak: credentials.AccessKeyID,
                                    sk: credentials.SecretAccessKey,
                                }
                            },
                            body: {
                                Code: {
                                    ZipFile: ZipFile,
                                },
                                Description: props.description || CONFIGS.description,
                                FunctionName: props.functionName || CONFIGS.functionName,
                                Runtime: props.runtime,
                                MemorySize: props.memorySize || CONFIGS.memorySize,
                                Handler: props.handler || CONFIGS.handler(props.runtime),
                                Timeout: props.timeout || CONFIGS.timeout,
                            }
                        };
                        if (props.code.publish) {
                            tempInputs.body.Code['Publish'] = props.code.publish;
                        }
                        if (props.code.dryRun) {
                            tempInputs.body.Code['DryRun'] = props.code.dryRun;
                        }
                        keys = ['Environment', 'LogType', 'DeadLetterTopic', 'LogBosDir'];
                        for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            i = keys_1[_i];
                            value = lodash_get_1.default(props, i.toLowerCase());
                            if (value) {
                                tempInputs[i] = value;
                            }
                        }
                        cfcInputs = tempInputs;
                        return [2 /*return*/, cfcInputs];
                }
            });
        });
    };
    /**
     * 更新函数代码
     * @param inputs
     * @returns
    */
    ComponentDemo.prototype.updateCode = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var props, functionName, codeUri, ZipFile, body, credentials, config, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        props = inputs.props;
                        functionName = props.functionName;
                        codeUri = props.code.codeUri || CONFIGS.codeUri;
                        return [4 /*yield*/, this.startZip(codeUri)];
                    case 1:
                        ZipFile = _a.sent();
                        body = {
                            ZipFile: ZipFile,
                        };
                        if (props.code.publish) {
                            body['Publish'] = props.code.publish;
                        }
                        if (props.code.dryRun) {
                            body['DryRun'] = props.code.dryRun;
                        }
                        credentials = lodash_get_1.default(inputs, 'credentials');
                        config = {
                            credentials: {
                                ak: credentials.AccessKeyID,
                                sk: credentials.SecretAccessKey,
                            }
                        };
                        client = new CfcClient(config);
                        logger_1.default.info('Updating function code...');
                        client.updateFunctionCode(functionName, body).then(function (response) {
                            logger_1.default.info('Update successfully!');
                            // TODO:处理输出
                            logger_1.default.info(response);
                        }).catch(function (err) {
                            logger_1.default.error('更新代码失败');
                            logger_1.default.error(err);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新函数配置
     * @param inputs
     * @returns
    */
    ComponentDemo.prototype.updateConfig = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var props, FunctionName, keys, body, _i, keys_2, i, value, credentials, config, client;
            return __generator(this, function (_a) {
                props = inputs.props;
                FunctionName = props.functionName;
                if (!FunctionName) {
                    logger_1.default.error('未填写函数名');
                    return [2 /*return*/];
                }
                keys = ['Description', 'Timeout', 'Handler', 'Runtime', 'Environment'];
                body = {};
                for (_i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                    i = keys_2[_i];
                    value = lodash_get_1.default(props, i.toLowerCase());
                    if (value) {
                        body[i] = value;
                    }
                }
                credentials = lodash_get_1.default(inputs, 'credentials');
                config = {
                    credentials: {
                        ak: credentials.AccessKeyID,
                        sk: credentials.SecretAccessKey,
                    }
                };
                client = new CfcClient(config);
                logger_1.default.info("Updating function configuration...");
                client.updateFunctionConfiguration(FunctionName, body).then(function (response) {
                    logger_1.default.info('Update successfully!');
                    // TODO:结果处理
                    logger_1.default.info(response);
                }).catch(function (err) {
                    logger_1.default.error(err);
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 获取触发器列表
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.listtriggers = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, config, client, FunctionBrn, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        credentials = lodash_get_1.default(inputs, 'credentials');
                        config = {
                            credentials: {
                                ak: credentials.AccessKeyID,
                                sk: credentials.SecretAccessKey,
                            }
                        };
                        client = new CfcClient(config);
                        logger_1.default.info(typeof (client));
                        if (!(inputs.props.functionName || inputs.props.functionBrn)) return [3 /*break*/, 3];
                        _a = inputs.props.functionBrn;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getBrnByFunctionName(inputs)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        FunctionBrn = _a;
                        logger_1.default.info(FunctionBrn);
                        client.listRelations({ FunctionBrn: FunctionBrn }).then(function (response) {
                            logger_1.default.info("触发器列表：");
                            logger_1.default.info(response.body);
                        }).catch(function (err) {
                            logger_1.default.error("获取触发器列表失败");
                            logger_1.default.error(err);
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        logger_1.default.error("请提供FunctionName或FunctionBrn");
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新触发器
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.updatetrigger = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, props, config, RelationId, Source, Data, client, FunctionBrn, _a, body;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        credentials = lodash_get_1.default(inputs, 'credentials');
                        props = inputs.props;
                        config = {
                            credentials: {
                                ak: credentials.AccessKeyID,
                                sk: credentials.SecretAccessKey,
                            }
                        };
                        RelationId = props.trigger.relationId;
                        Source = props.trigger.source;
                        Data = props.trigger.data || {};
                        if (!RelationId) {
                            logger_1.default.error("请提供RelationId");
                            return [2 /*return*/];
                        }
                        if (!Source) {
                            logger_1.default.error("请提供Source");
                        }
                        client = new CfcClient(config);
                        if (!(inputs.props.functionName || inputs.props.functionBrn)) return [3 /*break*/, 3];
                        _a = inputs.props.functionBrn;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getBrnByFunctionName(inputs)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        FunctionBrn = _a;
                        body = {
                            RelationId: RelationId,
                            Target: FunctionBrn,
                            Source: Source,
                            Data: Data,
                        };
                        logger_1.default.info("Updating trigger");
                        client.updateRelation(body).then(function (response) {
                            logger_1.default.info("Update successfully");
                            logger_1.default.info(response.body);
                        }).catch(function (err) {
                            logger_1.default.error(err);
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        logger_1.default.error("请提供FunctionName或FunctionBrn");
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除触发器
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.deletetrigger = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, props, config, RelationId, Source, client, FunctionBrn, _a, body;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        credentials = lodash_get_1.default(inputs, 'credentials');
                        props = inputs.props;
                        config = {
                            credentials: {
                                ak: credentials.AccessKeyID,
                                sk: credentials.SecretAccessKey,
                            }
                        };
                        RelationId = props.trigger.relationId;
                        Source = props.trigger.source;
                        if (!RelationId) {
                            logger_1.default.error("请提供RelationId");
                            return [2 /*return*/];
                        }
                        if (!Source) {
                            logger_1.default.error("请提供Source");
                        }
                        client = new CfcClient(config);
                        if (!(inputs.props.functionName || inputs.props.functionBrn)) return [3 /*break*/, 3];
                        _a = inputs.props.functionBrn;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getBrnByFunctionName(inputs)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        FunctionBrn = _a;
                        body = {
                            RelationId: RelationId,
                            Target: FunctionBrn,
                            Source: Source,
                        };
                        logger_1.default.info("Deletting trigger");
                        client.deleteRelation(body).then(function (response) {
                            logger_1.default.info("Delete trigger successfully");
                            logger_1.default.info(response.body);
                        }).catch(function (err) {
                            logger_1.default.error(err);
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        logger_1.default.error("请提供FunctionName或FunctionBrn");
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除函数
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.deletefunction = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, props, config, client;
            return __generator(this, function (_a) {
                credentials = lodash_get_1.default(inputs, 'credentials');
                props = inputs.props;
                config = {
                    credentials: {
                        ak: credentials.AccessKeyID,
                        sk: credentials.SecretAccessKey,
                    }
                };
                client = new CfcClient(config);
                if (props.functionName) {
                    logger_1.default.info("Deleting function");
                    client.deleteFunction(props.functionName).then(function (response) {
                        logger_1.default.info("Delete successfully");
                        logger_1.default.info(response.body);
                    }).catch(function (err) {
                        logger_1.default.error(err);
                    });
                }
                else {
                    logger_1.default.error("请提供FunctionName");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * 检查函数是否已有
     * @param client
     * @param functionName
     * @returns
     */
    ComponentDemo.prototype.checkCreated = function (client, functionName) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = false;
                        return [4 /*yield*/, client.listFunctions().then(function (response) {
                                for (var _i = 0, _a = response.body.Functions; _i < _a.length; _i++) {
                                    var i = _a[_i];
                                    if (i.FunctionName === functionName) {
                                        result = true;
                                    }
                                }
                            }).catch(function (err) {
                                logger_1.default.error(err);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
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
            var scfInputs, client, isCreated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.handleInputs(inputs)];
                    case 1:
                        scfInputs = _a.sent();
                        reportComponent('cfc', {
                            'commands': 'deploy',
                        });
                        client = new CfcClient(scfInputs.config);
                        return [4 /*yield*/, this.checkCreated(client, scfInputs.body.FunctionName)];
                    case 2:
                        isCreated = _a.sent();
                        logger_1.default.info(isCreated);
                        if (isCreated) { // 更新代码及配置
                            this.updateCode(inputs);
                            this.updateConfig(inputs);
                        }
                        else { // 创建函数
                            client.createFunction(scfInputs.body).then(function (response) {
                                //创建函数
                                logger_1.default.info('Creating Funtion...');
                                // TODO:添加输出处理
                                logger_1.default.info(response.body);
                                return response;
                            }).then(function (response) {
                                //创建触发器
                                logger_1.default.info('Creating Trigger...');
                                var body = {
                                    'Target': response.body.FunctionBrn,
                                    'Source': inputs.props.trigger.source,
                                    'Data': inputs.props.trigger.data,
                                };
                                return client.createRelation(body);
                            }).then(function (response) {
                                // TODO:添加输出处理
                                logger_1.default.info(response.body);
                                return response;
                            }).catch(function (err) {
                                // 执行失败
                                logger_1.default.error(err);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0U7QUFOQSxXQUFXO0FBQ1gsV0FBVztBQUNYLGlCQUFpQjtBQUNqQixRQUFRO0FBQ1IsZ0JBQWdCO0FBQ2hCLGlCQUFpQjtBQUNqQixlQUFlLEdBQ2IsT0FBTyxDQUFDLHVCQUF1QixDQUFDLGdCQURuQixDQUNtQjtBQUNwQyx1REFBMEM7QUFDMUMsMkRBQXFDO0FBRXJDLDBDQUFtQjtBQUNuQiw4Q0FBdUI7QUFDdkIsZ0RBQXlCO0FBQ3pCLDBEQUE2QjtBQUM3Qiw2QkFBNkI7QUFDN0IsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2pDLElBQUksR0FBRyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7QUFDdEIsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsU0FBUyxDQUFDO0FBR3JEO0lBQTJDLGlDQUFhO0lBQ3RELHVCQUFZLEtBQUs7ZUFDZixrQkFBTSxLQUFLLENBQUM7SUFDZCxDQUFDO0lBQ0Q7O1NBRUU7SUFDVSw0Q0FBb0IsR0FBakMsVUFBa0MsTUFBaUI7Ozs7Ozt3QkFDMUMsV0FBVyxHQUFHLG9CQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QyxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7d0JBQ3pDLE1BQU0sR0FBRzs0QkFDYixXQUFXLEVBQUU7Z0NBQ1QsRUFBRSxFQUFFLFdBQVcsQ0FBQyxXQUFXO2dDQUMzQixFQUFFLEVBQUUsV0FBVyxDQUFDLGVBQWU7NkJBQ2xDO3lCQUNGLENBQUM7d0JBQ0UsTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUVuQyxxQkFBTSxN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