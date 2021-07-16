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
       * 获得触发器列表
       */
    ComponentDemo.prototype.listtrigger = function (inputs) {
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
     * 更新函数代码
     * @param inputs
     * @returns
    */
    ComponentDemo.prototype.updateCode = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var props, functionName, codeUri, ZipFile, body, credentials, config, client, functionBrn;
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
                        functionBrn = "";
                        return [4 /*yield*/, client.updateFunctionCode(functionName, body).then(function (response) {
                                logger_1.default.info('Update function code successfully!');
                                // TODO:处理输出
                                logger_1.default.info(response);
                                functionBrn = response.body.FunctionBrn;
                            }).catch(function (err) {
                                logger_1.default.error("Updating function code failure.");
                                logger_1.default.error(err);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, functionBrn];
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
                switch (_a.label) {
                    case 0:
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
                        return [4 /*yield*/, client.updateFunctionConfiguration(FunctionName, body).then(function (response) {
                                logger_1.default.info('Update config successfully!');
                                // TODO:结果处理
                                logger_1.default.info(response);
                            }).catch(function (err) {
                                logger_1.default.info("Updating config failure.");
                                logger_1.default.error(err);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取触发器列表
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.checkTriggers = function (inputs, functionBrn) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, config, client, FunctionBrn;
            return __generator(this, function (_a) {
                credentials = lodash_get_1.default(inputs, 'credentials');
                config = {
                    credentials: {
                        ak: credentials.AccessKeyID,
                        sk: credentials.SecretAccessKey,
                    }
                };
                client = new CfcClient(config);
                FunctionBrn = inputs.props.functionBrn;
                logger_1.default.info(FunctionBrn);
                client.listRelations({ FunctionBrn: FunctionBrn }).then(function (response) {
                    logger_1.default.info("触发器列表：");
                    logger_1.default.info(response.body);
                }).catch(function (err) {
                    logger_1.default.error("获取触发器列表失败");
                    logger_1.default.error(err);
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 更新触发器
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.deployTrigger = function (inputs, functionBrn) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, props, config, client, Target, RelationId, Source, Data, body, body;
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
                Target = functionBrn;
                RelationId = props.trigger.relationId;
                Source = props.trigger.source;
                Data = props.trigger.data || {};
                if (!Source) {
                    logger_1.default.error("请提供触发器类型");
                }
                if (!RelationId) {
                    body = {
                        Target: Target,
                        Source: Source,
                        Data: Data
                    };
                    logger_1.default.info("Creating trigger...");
                    client.createRelation(body).then(function (response) {
                        // TODO:添加输出处理
                        logger_1.default.info("Create trigger successfully!");
                        logger_1.default.info(response.body);
                        return response;
                    });
                    return [2 /*return*/];
                }
                else {
                    body = {
                        RelationId: RelationId,
                        Target: Target,
                        Source: Source,
                        Data: Data,
                    };
                    logger_1.default.info("Updating trigger");
                    client.updateRelation(body).then(function (response) {
                        logger_1.default.info("Update trigger successfully");
                        logger_1.default.info(response.body);
                    }).catch(function (err) {
                        logger_1.default.error("Updating trigger failure.");
                        logger_1.default.error(err);
                    });
                }
                return [2 /*return*/];
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
            var credentials, props, config, RelationId, Source, client, FunctionBrn, body;
            return __generator(this, function (_a) {
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
                if (inputs.props.functionName || inputs.props.functionBrn) {
                    FunctionBrn = inputs.props.functionBrn;
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
                }
                else {
                    logger_1.default.error("请提供FunctionName或FunctionBrn");
                }
                return [2 /*return*/];
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
            var scfInputs, client, isCreated, _that, functionBrn;
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
                        _that = this;
                        if (!isCreated) return [3 /*break*/, 6];
                        return [4 /*yield*/, _that.updateCode(inputs)];
                    case 3:
                        functionBrn = _a.sent();
                        logger_1.default.info(functionBrn);
                        return [4 /*yield*/, _that.updateConfig(inputs)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, _that.deployTrigger(inputs, functionBrn)];
                    case 5:
                        _a.sent(); // 更新触发器
                        return [3 /*break*/, 7];
                    case 6:
                        client.createFunction(scfInputs.body).then(function (response) {
                            logger_1.default.info('Creating Funtion...');
                            logger_1.default.info(response.body); // TODO:添加输出处理
                            return response;
                        }).then(function (response) {
                            if (inputs.props.trigger) {
                                logger_1.default.info('Creating Trigger...');
                                var functionBrn = response.body.FunctionBrn; // 从返回值获取
                                _that.deployTrigger(inputs, functionBrn); // 部署触发器
                            }
                        }).catch(function (err) {
                            // 执行失败
                            logger_1.default.error(err);
                        });
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0U7QUFOQSxXQUFXO0FBQ1gsV0FBVztBQUNYLGlCQUFpQjtBQUNqQixRQUFRO0FBQ1IsZ0JBQWdCO0FBQ2hCLGlCQUFpQjtBQUNqQixlQUFlLEdBQ2IsT0FBTyxDQUFDLHVCQUF1QixDQUFDLGdCQURuQixDQUNtQjtBQUNwQyx1REFBMEM7QUFDMUMsMkRBQXFDO0FBRXJDLDBDQUFtQjtBQUNuQiw4Q0FBdUI7QUFDdkIsZ0RBQXlCO0FBQ3pCLDBEQUE2QjtBQUM3QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztBQUN0QixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFHckQ7SUFBMkMsaUNBQWE7SUFDdEQsdUJBQVksS0FBSztlQUNmLGtCQUFNLEtBQUssQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBQ2EsK0JBQU8sR0FBdkIsVUFBd0IsR0FBRyxFQUFFLE9BQU8sRUFBRSxTQUFTOzs7OztnQkFDN0MsSUFBSTtvQkFDSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDNUIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO29CQUN4QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQUUsQ0FBQyxZQUFZLENBQUMsS0FBRyxPQUFTLENBQUMsQ0FBQyxDQUFBO3FCQUM5Qzt5QkFBTTt3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