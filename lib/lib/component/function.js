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
    function Function(_a) {
        var endpoint = _a.endpoint, credentials = _a.credentials;
        client_1.default.setCfcClient(credentials, endpoint);
    }
    /**
     * 创建函数
     * @param props
     * @returns res
     * @returns functionBrn
     */
    Function.prototype.create = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var ZipFile, tempInputs, keys, _i, keys_1, i, value, body, vm, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.startZip(props.code.codeUri || './')];
                    case 1:
                        ZipFile = _a.sent();
                        logger_1.default.debug("zip to " + props.code.codeUri || './');
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
                        vm = core.spinner("Function " + props.functionName + " creating.");
                        return [4 /*yield*/, utils_1.deleteZip(props.code.codeUri + '/hello.zip')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, client_1.default.cfcClient
                                .createFunction(body)
                                .then(function (response) {
                                vm.succeed("Function " + props.functionName + " created.");
                                return response.body;
                            })
                                .catch(function (err) {
                                vm.fail("Function " + props.functionName + " creating failed.");
                                throw new Error(err.message.Message);
                            })];
                    case 3:
                        response = _a.sent();
                        // 处理返回
                        // res返回response.body
                        // 返回funcitonBrn用于创建触发器
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * 更新代码
     * @param props
     * @returns res
     * @returns functionBrn
     */
    Function.prototype.updateCode = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var functionName, codeUri, vm1, ZipFile, body, vm2, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        functionName = props.functionName;
                        if (!functionName) {
                            throw new Error('FunctionName not found.');
                        }
                        codeUri = props.code.codeUri || CONFIGS.codeUri;
                        vm1 = core.spinner('File compressing...');
                        return [4 /*yield*/, utils_1.startZip(codeUri)];
                    case 1:
                        ZipFile = _a.sent();
                        return [4 /*yield*/, utils_1.deleteZip(props.code.codeUri + '/hello.zip')];
                    case 2:
                        _a.sent();
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
                        vm2 = core.spinner('Function code updating...');
                        return [4 /*yield*/, client_1.default.cfcClient
                                .updateFunctionCode(functionName, body)
                                .then(function (response) {
                                vm2.succeed("Function " + functionName + " code updated");
                                return response.body;
                            })
                                .catch(function (err) {
                                vm2.fail('Function deploy failed');
                                throw new Error(err.message.Message);
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    /**
     * 更新配置
     * @param props
     * @returns res
     * @returns functionBrn
     */
    Function.prototype.updateConfig = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, FunctionName, keys, body, _i, keys_2, i, value, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = core.spinner('Function configuration updating...');
                        FunctionName = props.functionName;
                        if (!FunctionName) {
                            throw new Error('FunctionName not found.');
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
                                return response;
                            })
                                .catch(function (err) {
                                vm.fail('Function configuration update failed');
                                throw new Error(err.message.Message);
                            })];
                    case 1:
                        response = _a.sent();
                        // 处理返回
                        // res返回response.body
                        // 返回funcitonBrn用于创建触发器
                        return [2 /*return*/, this.handleResponse(response)];
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
                                return response.body;
                            })
                                .catch(function (err) {
                                logger_1.default.error('获取函数信息失败');
                                logger_1.default.error(err.body);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Function.prototype.list = function (table) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.cfcClient
                            .listFunctions()
                            .then(function (response) {
                            return response.body.Functions;
                        })
                            .catch(function (err) {
                            logger_1.default.info(err);
                            logger_1.default.debug("" + err);
                            throw new Error(err.message.Message);
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
                        vm = core.spinner('Function ' + FunctionName + ' deleting...');
                        return [4 /*yield*/, client_1.default.cfcClient
                                .deleteFunction(FunctionName)
                                .then(function (response) {
                                vm.succeed("Function " + FunctionName + " deleted");
                                return response;
                            })
                                .catch(function (err) {
                                vm.fail('Function delete failed.');
                                logger_1.default.error('Function remove failed. ');
                                logger_1.default.debug(JSON.stringify(err));
                                throw new Error(err.message.Message);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
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
                        return [4 /*yield*/, client_1.default.cfcClient
                                .getFunctionConfiguration(FunctionName)
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
    /**
     * 一些衍生方法
     */
    /**
     * Check function existance
     */
    Function.prototype.check = function (functionName) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, functions, isCreated, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = core.spinner('Checking if ' + functionName + ' exits...');
                        return [4 /*yield*/, this.list()];
                    case 1:
                        functions = _a.sent();
                        isCreated = false;
                        for (i = 0; i < functions.length; i++) {
                            if (functions[i].FunctionName === functionName) {
                                isCreated = true;
                                break;
                            }
                        }
                        if (isCreated) {
                            vm.succeed("Function " + functionName + " is already online.");
                        }
                        else {
                            vm.succeed("Function " + functionName + " does not exitst.");
                        }
                        return [2 /*return*/, isCreated];
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
                        logger_1.default.debug('Get functionBrn by function name:' + FunctionName);
                        return [4 /*yield*/, client_1.default.cfcClient
                                .getFunction(FunctionName)
                                .then(function (response) {
                                return response.body.Configuration.FunctionBrn;
                            })
                                .catch(function (err) {
                                logger_1.default.error('Getting functionBrn failed!');
                                throw new Error(err.message.Message);
                            })];
                    case 1:
                        functionBrn = _a.sent();
                        return [2 /*return*/, functionBrn];
                }
            });
        });
    };
    Function.prototype.handleResponse = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var content, descs, _i, descs_1, i;
            return __generator(this, function (_a) {
                logger_1.default.debug("" + response);
                content = [];
                descs = ['Description', 'Region', 'Timeout', 'Handler', 'Version', 'CodeSize', 'FunctionBrn', 'MemorySize'];
                for (_i = 0, descs_1 = descs; _i < descs_1.length; _i++) {
                    i = descs_1[_i];
                    content.push({
                        desc: i,
                        example: "" + response[i],
                    });
                }
                content.push({
                    desc: 'More',
                    example: 'https://console.bce.baidu.com/cfc/#/cfc/function/info~name=TestTriggers',
                });
                logger_1.default.debug("Calling Function response" + JSON.stringify(content));
                return [2 /*return*/, {
                        res: [
                            {
                                header: 'Function',
                                content: content,
                            },
                        ],
                        functionBrn: response.FunctionBrn,
                    }];
            });
        });
    };
    return Function;
}());
exports.default = Function;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudC9mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxZQUFZO0FBQ1osMERBQThDO0FBRTlDLHFEQUErQjtBQUMvQiwwREFBNkI7QUFDN0Isa0NBQTBEO0FBQzFELCtEQUF5QztBQUN6QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFTbkMsc0hBQXNIO0FBQ3RILHNDQUFzQztBQUN0Qyx3Q0FBd0M7QUFDeEMsb0NBQW9DO0FBQ3BDLG9DQUFvQztBQUNwQyx3Q0FBd0M7QUFDeEMsd0NBQXdDO0FBQ3hDLDJDQUEyQztBQUMzQyxzQ0FBc0M7QUFDdEMsS0FBSztBQUVMO0lBQ0Usa0JBQVksRUFBMEU7WUFBeEUsUUFBUSxjQUFBLEVBQUUsV0FBVyxpQkFBQTtRQUNqQyxnQkFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0cseUJBQU0sR0FBWixVQUFhLEtBQUs7Ozs7OzRCQUVBLHFCQUFNLGdCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEVBQUE7O3dCQUFwRCxPQUFPLEdBQUcsU0FBMEM7d0JBQzFELGdCQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQzt3QkFFakQsVUFBVSxHQUFHOzRCQUNmLElBQUksRUFBRTtnQ0FDSixPQUFPLFNBQUE7NkJBQ1I7NEJBQ0QsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLFdBQVc7NEJBQ3JELFlBQVksRUFBRSxLQUFLLENB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