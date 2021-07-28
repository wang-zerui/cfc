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
//@ts-ignore
var core = __importStar(require("@serverless-devs/core"));
var client_1 = __importDefault(require("../client"));
var lodash_get_1 = __importDefault(require("lodash.get"));
var utils_1 = require("../utils");
var logger_1 = __importDefault(require("../../common/logger"));
var CONFIGS = require('../config');
// const FUNCTION_COMMAND: string[] = ['create', 'list', 'info', 'remove', 'updateCode', 'updateConfig', 'getConfig']; 
// const FUNCTION_COMMAND_HELP_KEY = {
//   create: 'FunctionCreateInputsArgs',
//   list: 'FunctionListInputsArgs',
//   info: 'FunctionInfoInputsArgs',
//   remove: 'FunctionDeleteInputsArgs',
//   updateCode: 'UpdateCodeInputsArgs',
//   updateConfig: 'UpdateCofigInputsArgs',
//   getConfig: 'GetConfigInputsArgs',
// };
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
        client_1.default.setCfcClient(credentials, endpoint);
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
                    case 0: return [4 /*yield*/, client_1.default.cfcClient.listFunctions()
                            .then(function (response) {
                            return response.body.Functions;
                        })
                            .catch(function (err) {
                            return err.message.Message;
                        })];
                    case 1:
                        data = _a.sent();
                        if (table) {
                            utils_1.tableShow(data, ['FunctionName', 'Description', 'UpdatedAt', 'LastModified', 'Region']);
                            return [2 /*return*/, data];
                        }
                        else {
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Function.prototype.remove = function (FunctionName) {
        return __awaiter(this, void 0, void 0, function () {
            var vm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                                vm.fail('Function delete failed.');
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
    Function.prototype.getBrnByFunctionName = function (functionName) {
        return __awaiter(this, void 0, void 0, function () {
            var FunctionName, functionBrn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FunctionName = functionName;
                        return [4 /*yield*/, client_1.default.cfcClient
                                .getFunction(FunctionName)
                                .then(function (response) {
                                return response.body.Configuration.FunctionBrn;
                            })
                                .catch(function (err) {
                                logger_1.default.error('获取brn错误');
                                logger_1.default.error(err);
                            })];
                    case 1:
                        functionBrn = _a.sent();
                        return [2 /*return*/, functionBrn];
                }
            });
        });
    };
    return Function;
}());
exports.default = Function;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudC9mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxZQUFZO0FBQ1osMERBQThDO0FBRTlDLHFEQUErQjtBQUMvQiwwREFBNkI7QUFDN0Isa0NBQThDO0FBQzlDLCtEQUF5QztBQUN6QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFTbkMsdUhBQXVIO0FBQ3ZILHNDQUFzQztBQUN0Qyx3Q0FBd0M7QUFDeEMsb0NBQW9DO0FBQ3BDLG9DQUFvQztBQUNwQyx3Q0FBd0M7QUFDeEMsd0NBQXdDO0FBQ3hDLDJDQUEyQztBQUMzQyxzQ0FBc0M7QUFDdEMsS0FBSztBQUVMO0lBQ0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUE2REU7SUFFRixrQkFBWSxFQUEwRTtZQUF4RSxRQUFRLGNBQUEsRUFBRSxXQUFXLGlCQUFBO1FBQ2pDLGdCQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUsseUJBQU0sR0FBWixVQUFhLEtBQUs7Ozs7OzRCQUNBLHFCQUFNLGdCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEVBQUE7O3dCQUFwRCxPQUFPLEdBQUcsU0FBMEM7d0JBQ3RELFVBQVUsR0FBRzs0QkFDZixJQUFJLEVBQUU7Z0NBQ0osT0FBTyxTQUFBOzZCQUNSOzRCQUNELFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxXQUFXOzRCQUNyRCxZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVksSUFBSSxPQUFPLENBQUMsWUFB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