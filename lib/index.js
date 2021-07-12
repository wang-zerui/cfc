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
     * 部署函数
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.handleInputs = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, props, ZipFile, protocol, endpoint, tempInputs, cfcInputs;
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
                        //TODO:这里可以进行简化
                        if (props.code.publish) {
                            tempInputs.body.Code['Publish'] = props.code.publish;
                        }
                        if (props.code.dryRun) {
                            tempInputs.body.Code['DryRun'] = props.code.dryRun;
                        }
                        if (props.environment) {
                            tempInputs['Environment'] = { 'Variables': inputs.props.environment };
                        }
                        if (props.logType) {
                            tempInputs['LogType'] = props.logType;
                        }
                        if (props.vpcConfig) {
                            tempInputs['LogType'] = props.vpcConfig;
                        }
                        if (props.deadLetterTopic) {
                            tempInputs['DeadLetterTopic'] = props.deadLetterTopic;
                        }
                        if (props.logBosDir) {
                            tempInputs['LogBosDir'] = props.logBosDir;
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
    ComponentDemo.prototype.updatecode = function (inputs) {
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
    ComponentDemo.prototype.updateconfig = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var props, FunctionName, keys, body, _i, keys_1, i, value, credentials, config, client;
            return __generator(this, function (_a) {
                props = inputs.props;
                FunctionName = props.functionName;
                if (!FunctionName) {
                    logger_1.default.error('未填写函数名');
                    return [2 /*return*/];
                }
                keys = ['Description', 'Timeout', 'Handler', 'Runtime', 'Environment'];
                body = {};
                for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    i = keys_1[_i];
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
     * 部署函数
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var scfInputs, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.handleInputs(inputs)];
                    case 1:
                        scfInputs = _a.sent();
                        reportComponent('cfc', {
                            'commands': 'deploy',
                        });
                        client = new CfcClient(scfInputs.config);
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
                        return [2 /*return*/];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0U7QUFOQSxXQUFXO0FBQ1gsV0FBVztBQUNYLGlCQUFpQjtBQUNqQixRQUFRO0FBQ1IsZ0JBQWdCO0FBQ2hCLGlCQUFpQjtBQUNqQixlQUFlLEdBQ2IsT0FBTyxDQUFDLHVCQUF1QixDQUFDLGdCQURuQixDQUNtQjtBQUNwQyx1REFBMEM7QUFDMUMsMkRBQXFDO0FBRXJDLDBDQUFtQjtBQUNuQiw4Q0FBdUI7QUFDdkIsZ0RBQXlCO0FBQ3pCLDBEQUE2QjtBQUM3QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztBQUN0QixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFHckQ7SUFBMkMsaUNBQWE7SUFDdEQsdUJBQVksS0FBSztlQUNmLGtCQUFNLEtBQUssQ0FBQztJQUNkLENBQUM7SUFDRDs7U0FFRTtJQUNVLDRDQUFvQixHQUFqQyxVQUFrQyxNQUFpQjs7Ozs7O3dCQUMxQyxXQUFXLEdBQUcsb0JBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7d0JBQ3pDLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQzt3QkFDekMsTUFBTSxHQUFHOzRCQUNiLFdBQVcsRUFBRTtnQ0FDVCxFQUFFLEVBQUUsV0FBVyxDQUFDLFdBQVc7Z0NBQzNCLEVBQUUsRUFBRSxXQUFXLENBQUMsZUFBZTs2QkFDbEM7eUJBQ0YsQ0FBQzt3QkFDRSxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBRW5DLHFCQUFNLE1BQU0sQ0FBQyxXQUFX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