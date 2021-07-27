"use strict";
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
var core = __importStar(require("@serverless-devs/core"));
var client_1 = __importDefault(require("../client"));
var lodash_get_1 = __importDefault(require("lodash.get"));
var utils_1 = require("../utils");
var logger_1 = __importDefault(require("../../common/logger"));
var CONFIGS = require('../config');
var FUNCTION_COMMAND = ['create', 'list', 'info', 'remove', 'updateCode', 'updateConfig', 'getConfig'];
var FUNCTION_COMMAND_HELP_KEY = {
    create: 'FunctionCreateInputsArgs',
    list: 'FunctionListInputsArgs',
    info: 'FunctionInfoInputsArgs',
    remove: 'FunctionDeleteInputsArgs',
    updateCode: 'UpdateCodeInputsArgs',
    updateConfig: 'UpdateCofigInputsArgs',
    getConfig: 'GetConfigInputsArgs',
};
var Function = /** @class */ (function () {
    /*
    static async handlerInputs(inputs) {
      logger.debug(`inputs.props: ${JSON.stringify(inputs.props)}`);
  
      const parsedArgs: {[key: string]: any} = core.commandParse(inputs, {
        boolean: ['help', 'table', 'y'],
        string: ['endpoint', 'function-name', 'description'],
        alias: { help: 'h'},
      });
  
      // 注意有三种不同的return方式
      const parsedData = parsedArgs?.data || {};
      const rawData = parsedData._ || [];
      // if (!rawData.length) {
      //   return { help: true, helpKey: 'FunctionInputsArgs' };
      // }
  
      const subCommand = rawData[0] || 'all';
      logger.debug(`version subCommand: ${subCommand}`);
  
      if (!FUNCTION_COMMAND.includes(subCommand)) {
        // 没有对应参数时返回
        return {
          help: true,
          helpKey: 'FunctionInputsArgs',
          errorMessage: `Does not support ${subCommand} command`,
        };
      }
  
      if (parsedData.help) {
        //
        return { help: true, helpKey: FUNCTION_COMMAND_HELP_KEY[subCommand], subCommand };
      }
  
      const props = inputs.props || {};
  
      const endProps: IProps = {
        endpoint: parsedData.endpoint || props.endpoint,
        description: parsedData.description,
        functionName: parsedData['function-name'] || props.functionName,
        // version: parsedData.id,
        // assumeYes: parsedData.y,
      };
  
      if (!endProps.endpoint) {
        throw new Error('Not fount region');
      }
      if (!endProps.functionName) {
        throw new Error('Not fount serviceName');
      }
  
      const credentials: ICredentials = inputs.credentials || await core.getCredential(inputs?.project?.access);
      logger.debug(`handler inputs props: ${JSON.stringify(endProps)}`);
  
      return {
        credentials,
        subCommand,
        endProps,
        // table: parsedData.table,
      };
    }
    */
    function Function(_a) {
        var endpoint = _a.endpoint, credentials = _a.credentials;
        client_1.default.setCfcClient(endpoint, credentials);
    }
    Function.prototype.create = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var ZipFile, tempInputs, keys, _i, keys_1, i, value, body, vm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.startZip(props.code.codeUri || './')];
                    case 1:
                        ZipFile = _a.sent();
                        tempInputs = {
                            Code: {
                                ZipFile: ZipFile,
                            },
                            Description: props.description || CONFIGS.description,
                            FunctionName: props.functionName || CONFIGS.functionName,
                            Runtime: props.runtime,
                            MemorySize: props.memorySize || CONFIGS.memorySize,
                            Handler: props.handler || CONFIGS.handler(props.runtime),
                            Timeout: props.timeout || CONFIGS.timeout,
                        };
                        if (props.code.publish) {
                            tempInputs.Code['Publish'] = props.code.publish;
                        }
                        if (props.code.dryRun) {
                            tempInputs.Code['DryRun'] = props.code.dryRun;
                        }
                        keys = ['Environment', 'LogType', 'DeadLetterTopic', 'LogBosDir'];
                        for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            i = keys_1[_i];
                            value = lodash_get_1.default(props, i.toLowerCase());
                            if (value) {
                                tempInputs[i] = value;
                            }
                        }
                        body = tempInputs;
                        vm = core.spinner('Function Creating');
                        return [4 /*yield*/, client_1.default.cfcClient
                                .createFunction(body)
                                .then(function (response) {
                                vm.succeed('Function deploy completed');
                                // logger.info(response.body);                                               // TODO:添加输出处理
                                return response;
                            })
                                .catch(function (err) {
                                vm.fail('Function deploy failed');
                                logger_1.default.error(err.message.Message);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Function.prototype.updateCode = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var functionName, codeUri, vm1, ZipFile, body, vm2, functionBrn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        functionName = props.functionName;
                        if (!functionName) {
                            throw new Error('Not found functionName');
                        }
                        codeUri = props.code.codeUri || CONFIGS.codeUri;
                        vm1 = core.spinner('File compressing...');
                        return [4 /*yield*/, utils_1.startZip(codeUri)];
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
                        vm2 = core.spinner('Function deploying...');
                        return [4 /*yield*/, client_1.default.cfcClient
                                .updateFunctionCode(functionName, body)
                                .then(function (response) {
                                vm2.succeed('Function deployed');
                                // TODO:处理输出
                                // logger.info(response);
                                functionBrn = response.body.FunctionBrn;
                            })
                                .catch(function (err) {
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
    Function.prototype.updateConfig = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, FunctionName, keys, body, _i, keys_2, i, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = core.spinner('Function configuration updating...');
                        FunctionName = props.functionName;
                        if (!FunctionName) {
                            throw new Error('Not found functionName');
                        }
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
                        return [4 /*yield*/, client_1.default.cfcClient
                                .updateFunctionConfiguration(FunctionName, body)
                                .then(function (response) {
                                vm.succeed('Function configuration update completed');
                                // TODO:结果处理
                                // logger.info(response);
                            })
                                .catch(function (err) {
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
    Function.prototype.info = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var FunctionName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FunctionName = props.functionName;
                        if (!FunctionName) {
                            throw new Error('Not found functionName');
                        }
                        return [4 /*yield*/, client_1.default.cfcClient
                                .getFunction(FunctionName)
                                .then(function (response) {
                            })
                                .catch(function (err) {
                                logger_1.default.error('获取函数信息失败');
                                logger_1.default.error(err.body);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Function.prototype.list = function (table) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.default.info("Getting listFunctions");
                        return [4 /*yield*/, client_1.default.cfcClient.listFunctions];
                    case 1:
                        data = _a.sent();
                        if (table) {
                            utils_1.tableShow(data, ['FunctionName', 'Description', 'UpdatedAt', 'LastModified', 'Region']);
                        }
                        else {
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Function.prototype.remove = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var FunctionName, vm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FunctionName = props.functionName;
                        if (!FunctionName) {
                            throw new Error('Not found functionName');
                        }
                        vm = core.spinner('Function deleting...');
                        return [4 /*yield*/, client_1.default.cfcClient
                                .deleteFunction(FunctionName)
                                .then(function (response) {
                                vm.succeed('Function deleted');
                                return response;
                            })
                                .catch(function (err) {
                                logger_1.default.error('函数删除错误');
                                logger_1.default.error(err.message.Message);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Function.prototype.getConfig = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var FunctionName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FunctionName = props.functionName;
                        if (!FunctionName) {
                            throw new Error('Not found functionName');
                        }
                        return [4 /*yield*/, client_1.default.cfcClient.getFunctionConfiguration(FunctionName)
                                .then(function (response) {
                                logger_1.default.info(response.body);
                                return response.body;
                            })
                                .catch(function (err) {
                                logger_1.default.error('函数配置获取错误');
                                logger_1.default.error(err.message.Message);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Function;
}());
exports.default = Function;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudC9mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFFOUMscURBQStCO0FBQy9CLDBEQUE2QjtBQUM3QixrQ0FBOEM7QUFDOUMsK0RBQXlDO0FBQ3pDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQVNuQyxJQUFNLGdCQUFnQixHQUFhLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDbkgsSUFBTSx5QkFBeUIsR0FBRztJQUNoQyxNQUFNLEVBQUUsMEJBQTBCO0lBQ2xDLElBQUksRUFBRSx3QkFBd0I7SUFDOUIsSUFBSSxFQUFFLHdCQUF3QjtJQUM5QixNQUFNLEVBQUUsMEJBQTBCO0lBQ2xDLFVBQVUsRUFBRSxzQkFBc0I7SUFDbEMsWUFBWSxFQUFFLHVCQUF1QjtJQUNyQyxTQUFTLEVBQUUscUJBQXFCO0NBQ2pDLENBQUM7QUFFRjtJQUNFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BNkRFO0lBRUYsa0JBQVksRUFBMEU7WUFBeEUsUUFBUSxjQUFBLEVBQUUsV0FBVyxpQkFBQTtRQUNqQyxnQkFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVLLHlCQUFNLEdBQVosVUFBYSxLQUFLOzs7Ozs0QkFDQSxxQkFBTSxnQkFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxFQUFBOzt3QkFBcEQsT0FBTyxHQUFHLFNB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