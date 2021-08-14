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
var utils_1 = require("../utils");
var logger_1 = __importDefault(require("../../common/logger"));
// const TRIGGER_COMMAND: string[] = ['create', 'list', 'info', 'remove', 'updateCode', 'updateConfig', 'getConfig']; 
// const TRIGGER_COMMAND_HELP_KEY = {
//   create: 'FunctionCreateInputsArgs',
//   list: 'FunctionListInputsArgs',
//   info: 'FunctionInfoInputsArgs',
//   remove: 'FunctionDeleteInputsArgs',
//   updateCode: 'UpdateCodeInputsArgs',
//   updateConfig: 'UpdateCofigInputsArgs',
//   getConfig: 'GetConfigInputsArgs',
// };
var Trigger = /** @class */ (function () {
    function Trigger(credentials) {
        client_1.default.setCfcClient(credentials);
    }
    Trigger.prototype.getBrnByFunctionName = function (functionName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.cfcClient
                            .getFunction(functionName)
                            .then(function (response) {
                            return response.body.Configuration.FunctionBrn;
                        })
                            .catch(function (err) {
                            logger_1.default.error('获取brn错误');
                            logger_1.default.error(err);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Trigger.prototype.create = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var Target, Source, Data, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Target = props.target;
                        Source = props.source;
                        Data = props.data || {};
                        body = {
                            Target: Target,
                            Source: Source,
                            Data: Data,
                        };
                        return [4 /*yield*/, client_1.default.cfcClient
                                .createRelation(body)
                                .then(function (response) {
                                return { response: response.body };
                            })
                                .catch(function (err) {
                                return { error: err };
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Trigger.prototype.update = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var Target, RelationId, Source, Data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Target = props.target;
                        RelationId = props.relationId;
                        Source = props.source;
                        Data = props.data;
                        return [4 /*yield*/, client_1.default.cfcClient
                                .updateRelation({
                                Target: Target,
                                RelationId: RelationId,
                                Source: Source,
                                Data: Data
                            })
                                .then(function (response) {
                                return response.body;
                            })
                                .catch(function (err) {
                                logger_1.default.error(err.message.Message);
                                return {
                                    fail: true,
                                    error: err
                                };
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Trigger.prototype.list = function (functionBrn, table) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.default.info("Getting listFunctions");
                        return [4 /*yield*/, client_1.default.cfcClient.listRelations({ FunctionBrn: functionBrn })
                                .then(function (response) {
                                return response.body;
                            })
                                .catch(function (err) {
                                logger_1.default.error(err.message.Message);
                            })];
                    case 1:
                        data = _a.sent();
                        if (table) {
                            utils_1.tableShow(data.Relation, ['Source', 'Target', 'UpdatedAt']);
                        }
                        else {
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Trigger.prototype.remove = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, Target, Source, RelationId, options, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = core.spiner('Trigger deleting...');
                        Target = props.target;
                        Source = props.source;
                        RelationId = props.relationId;
                        options = {
                            Target: Target,
                            Source: Source,
                            RelationId: RelationId
                        };
                        message = "Trigger relationId:" + RelationId;
                        logger_1.default.info(message);
                        return [4 /*yield*/, client_1.default.cfcClient.deleteRelation(options)
                                .then(function (response) {
                                vm.succeed('Trigger deleted');
                                return response.body;
                            })
                                .catch(function (err) {
                                vm.fail('Trigger failed.');
                                logger_1.default.error(err.message.Message);
                                return err;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Trigger;
}());
exports.default = Trigger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50L3RyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLHFEQUErQjtBQUMvQixrQ0FBb0M7QUFDcEMsK0RBQXlDO0FBU3pDLHNIQUFzSDtBQUN0SCxxQ0FBcUM7QUFDckMsd0NBQXdDO0FBQ3hDLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMsd0NBQXdDO0FBQ3hDLHdDQUF3QztBQUN4QywyQ0FBMkM7QUFDM0Msc0NBQXNDO0FBQ3RDLEtBQUs7QUFFTDtJQUVFLGlCQUFhLFdBQXlCO1FBQ3BDLGdCQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFSyxzQ0FBb0IsR0FBMUIsVUFBMkIsWUFBWTs7Ozs0QkFDOUIscUJBQU0sZ0JBQU0sQ0FBQyxTQUFTOzZCQUMxQixXQUFXLENBQUMsWUFBWSxDQUFDOzZCQUN6QixJQUFJLENBQUMsVUFBVSxRQUFROzRCQUN0QixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzt3QkFDakQsQ0FBQyxDQUFDOzZCQUNELEtBQUssQ0FBQyxVQUFVLEdBQUc7NEJBQ2xCLGdCQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDcEIsQ0FBQyxDQUFDLEVBQUE7NEJBUkosc0JBQU8sU0FRSCxFQUFDOzs7O0tBQ047SUFFSyx3QkFBTSxHQUFaLFVBQWEsS0FBWTs7Ozs7O3dCQUNqQixNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3QkFDdEIsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7d0JBQ3RCLElB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