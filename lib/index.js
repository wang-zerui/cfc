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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a = require('@serverless-devs/core'), 
// HLogger,
// ILogger,
// getCredential,
// help,
commandParse = _a.commandParse, spinner = _a.spinner, 
// loadComponent,
reportComponent = _a.reportComponent;
var core = __importStar(require("@serverless-devs/core"));
var base_1 = __importDefault(require("./common/base"));
var logger_1 = __importDefault(require("./common/logger"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var jszip_1 = __importDefault(require("jszip"));
var lodash_get_1 = __importDefault(require("lodash.get"));
var help_1 = require("./lib/help");
var DEPLOY_HELP = __importStar(require("./lib/help/deploy"));
// import { countReset } from 'console';
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
                            },
                            args: inputs.args
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
            var props, functionName, codeUri, vm1, ZipFile, body, credentials, config, client, vm2, functionBrn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        props = inputs.props;
                        functionName = props.functionName;
                        codeUri = props.code.codeUri || CONFIGS.codeUri;
                        vm1 = spinner('File compressing...');
                        return [4 /*yield*/, this.startZip(codeUri)];
                    case 1:
                        ZipFile = _a.sent();
                        vm1.succeed('File compression completed');
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
                        vm2 = spinner('Function deploying...');
                        functionBrn = "";
                        return [4 /*yield*/, client.updateFunctionCode(functionName, body).then(function (response) {
                                vm2.succeed('Function deployed');
                                // TODO:处理输出
                                // logger.info(response);
                                functionBrn = response.body.FunctionBrn;
                            }).catch(function (err) {
                                vm2.fail('Function deploy failed');
                                // logger.error(err);
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
            var vm, props, FunctionName, keys, body, _i, keys_2, i, value, credentials, config, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = spinner('Function configuration updating...');
                        props = inputs.props;
                        FunctionName = props.functionName;
                        if (!FunctionName) {
                            vm.fail('执行失败，未填写函数名');
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
                        return [4 /*yield*/, client.updateFunctionConfiguration(FunctionName, body).then(function (response) {
                                vm.succeed('Function configuration update completed');
                                // TODO:结果处理
                                // logger.info(response);
                            }).catch(function (err) {
                                vm.fail('Function configuration update failed');
                                logger_1.default.error(err.body);
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
            var credentials, props, config, client, Target, RelationId, Source, Data, vm, body, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        vm = spinner('Trigger deploying...');
                        if (!Source) {
                            vm.fail('Please provide the type of the trigger');
                        }
                        if (!!RelationId) return [3 /*break*/, 2];
                        body = {
                            Target: Target,
                            Source: Source,
                            Data: Data
                        };
                        return [4 /*yield*/, client.createRelation(body).then(function (response) {
                                // TODO:添加输出处理
                                vm.succeed('Trigger deployed');
                                // logger.info(response.body);
                                return response;
                            }).catch(function (response) {
                                vm.fail('Trigger deploy failed.');
                                if (response.message.Code === 'ResourceConflictException') {
                                    logger_1.default.error(response.message.Message + ', if you want to update your trigger, please provide relationId');
                                }
                                else {
                                    logger_1.default.error(response.message.Message);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        body = {
                            RelationId: RelationId,
                            Target: Target,
                            Source: Source,
                            Data: Data,
                        };
                        return [4 /*yield*/, client.updateRelation(body).then(function (response) {
                                vm.succeed('Trigger deployed');
                                // logger.info(response.body);
                            }).catch(function (err) {
                                vm.fail('Trigger deploying failed');
                                // logger.error("Updating trigger failure.");
                                logger_1.default.error(err);
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
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
            var scfInputs, parsedArgs, parsedData, rawData, commandList, subCommand, client, isCreated, _that, functionBrn, vm_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.handleInputs(inputs)];
                    case 1:
                        scfInputs = _a.sent();
                        reportComponent('cfc', {
                            'commands': 'deploy',
                        });
                        parsedArgs = commandParse(inputs, {
                            boolean: ['help'],
                            alias: { help: 'h' }
                        });
                        parsedData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                        rawData = parsedData._ || [];
                        commandList = ['all', 'function', 'trigger'];
                        subCommand = rawData[0] || 'all';
                        logger_1.default.debug("deploy sunCommand: $(subCommand)");
                        if (!commandList.includes(subCommand)) {
                            return [2 /*return*/, core.help(DEPLOY_HELP.DEPLOY)];
                        }
                        if (parsedData.help) {
                            rawData[0] ? core.help(DEPLOY_HELP["DEPLOY_$(subCommand)".toLocaleUpperCase()]) : core.help(DEPLOY_HELP.DEPLOY);
                            return [2 /*return*/];
                        }
                        client = new CfcClient(scfInputs.config);
                        return [4 /*yield*/, this.checkCreated(client, scfInputs.body.FunctionName)];
                    case 2:
                        isCreated = _a.sent();
                        _that = this;
                        if (!isCreated) return [3 /*break*/, 6];
                        return [4 /*yield*/, _that.updateCode(inputs)];
                    case 3:
                        functionBrn = _a.sent();
                        // logger.info(functionBrn);
                        return [4 /*yield*/, _that.updateConfig(inputs)];
                    case 4:
                        // logger.info(functionBrn);
                        _a.sent();
                        return [4 /*yield*/, _that.deployTrigger(inputs, functionBrn)];
                    case 5:
                        _a.sent(); // 更新触发器
                        return [3 /*break*/, 8];
                    case 6:
                        vm_1 = spinner('Function deploying...');
                        return [4 /*yield*/, client.createFunction(scfInputs.body).then(function (response) {
                                vm_1.succeed('Function deploy completed');
                                // logger.info(response.body);                                               // TODO:添加输出处理
                                return response;
                            }).then(function (response) {
                                if (inputs.props.trigger) {
                                    var functionBrn = response.body.FunctionBrn; // 从返回值获取
                                    _that.deployTrigger(inputs, functionBrn); // 部署触发器
                                }
                            }).catch(function (err) {
                                vm_1.fail('Function deploy failed');
                                if (err.message.Code === 'ResourceConflictException') {
                                    logger_1.default.error(err.message.Message);
                                }
                            })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 帮助
     * @returns
     */
    ComponentDemo.prototype.help = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, reportComponent('cfc', 'help')];
                    case 1:
                        _a.sent();
                        core.help(help_1.COMPONENT_HELP_INFO);
                        return [2 /*return*/];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FTRixPQUFPLENBQUMsdUJBQXVCLENBQUM7QUFSbEMsV0FBVztBQUNYLFdBQVc7QUFDWCxpQkFBaUI7QUFDakIsUUFBUTtBQUNSLFlBQVksa0JBQUEsRUFDWixPQUFPLGFBQUE7QUFDUCxpQkFBaUI7QUFDakIsZUFBZSxxQkFDbUIsQ0FBQztBQUNyQywwREFBOEM7QUFDOUMsdURBQTBDO0FBQzFDLDJEQUFxQztBQUVyQywwQ0FBbUI7QUFDbkIsOENBQXVCO0FBQ3ZCLGdEQUF5QjtBQUN6QiwwREFBNkI7QUFDN0IsbUNBQWlEO0FBQ2pELDZEQUFpRDtBQUNqRCx3Q0FBd0M7QUFFeEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2pDLElBQUksR0FBRyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7QUFDdEIsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsU0FBUyxDQUFDO0FBR3JEO0lBQTJDLGlDQUFhO0lBQ3RELHVCQUFZLEtBQUs7ZUFDZixrQkFBTSxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNhLCtCQUFPLEdBQXZCLFVBQXdCLEdBQUcsRUFBRSxPQUFPLEVBQUUsU0FBUzs7Ozs7Z0JBQzdDLElBQUk7b0JBQ0ksT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQzVCLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtvQkFDeEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dC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