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
var client_1 = __importDefault(require("../client"));
var core = __importStar(require("@serverless-devs/core"));
var logger_1 = __importDefault(require("../../common/logger"));
var HELP = __importStar(require("../help/deploy"));
var function_1 = __importDefault(require("./function"));
var trigger_1 = __importDefault(require("./trigger"));
var CONFIGS = require('../config');
var COMMAND = [
    'all',
    'function',
    'trigger',
    'help',
];
// interface EndProps {
//   region: string;
//   assumeYes?: boolean;
//   onlyLocal?: boolean;
//   serviceName?: string;
//   functionName?: string;
//   qualifier?: string;
//   layerName?: string;
//   version?: string;
//   aliasName?: string;
// }
var deploy = /** @class */ (function () {
    function deploy(_a) {
        var endpoint = _a.endpoint, credentials = _a.credentials;
        client_1.default.setCfcClient(credentials, endpoint);
    }
    deploy.handleInputs = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedArgs, parsedData, rawData, subCommand, props, endProps, credentials, protocol, postEndpoint, endpoint;
            return __generator(this, function (_a) {
                logger_1.default.debug("inputs.props: " + JSON.stringify(inputs.props));
                parsedArgs = core.commandParse(inputs, {
                    boolean: ['help'],
                    alias: { help: 'h' },
                });
                parsedData = (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.data) || {};
                rawData = parsedData._ || [];
                subCommand = rawData[0] || 'all';
                logger_1.default.debug("deploy subCommand: " + subCommand);
                if (!COMMAND.includes(subCommand)) {
                    core.help(HELP.DEPLOY);
                    return [2 /*return*/, { errorMessage: "Does not support " + subCommand + " command" }];
                }
                if (parsedData.help) {
                    rawData[0] ? core.help(HELP[("deploy_" + subCommand).toLocaleUpperCase()]) : core.help(HELP.DEPLOY);
                    return [2 /*return*/, { help: true, subCommand: subCommand }];
                }
                props = inputs.props || {};
                endProps = props;
                if (!endProps.endpoint) {
                    throw new Error('Not fount endpoint');
                }
                credentials = inputs.credentials;
                logger_1.default.debug("handler inputs props: " + JSON.stringify(endProps));
                protocol = props.protocol || CONFIGS.defaultProtocol;
                postEndpoint = props.endpoint || CONFIGS.defaultEndpoint;
                endpoint = protocol + '://' + postEndpoint;
                return [2 /*return*/, {
                        endpoint: endpoint,
                        credentials: credentials,
                        subCommand: subCommand,
                        props: endProps,
                        args: props.args,
                        table: parsedData.table,
                    }];
            });
        });
    };
    deploy.prototype.deployFunction = function (_a) {
        var props = _a.props, credentials = _a.credentials;
        return __awaiter(this, void 0, void 0, function () {
            var protocol, postEndpoint, endpoint, functionClient, functions, isCreated, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        protocol = props.protocol || CONFIGS.defaultProtocol;
                        postEndpoint = props.endpoint || CONFIGS.defaultEndpoint;
                        endpoint = protocol + '://' + postEndpoint;
                        functionClient = new function_1.default({ endpoint: endpoint, credentials: credentials });
                        return [4 /*yield*/, functionClient.list()];
                    case 1:
                        functions = _b.sent();
                        isCreated = false;
                        for (i = 0; i < 3; i++) {
                            if (functions[i].FunctionName === props.functionName) {
                                isCreated = true;
                                break;
                            }
                        }
                        if (!isCreated) return [3 /*break*/, 4];
                        return [4 /*yield*/, functionClient.updateConfig(props)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, functionClient.updateCode(props)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4: return [4 /*yield*/, functionClient.create(props)];
                    case 5: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    deploy.prototype.deployTrigger = function (functionBrn, props, credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var target, data, source, relationId, IProps, triggerClient, vm, _a, response, error, updateRes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        target = functionBrn;
                        data = props.trigger.data;
                        source = props.trigger.source;
                        relationId = props.trigger.RelationId;
                        IProps = {
                            target: target,
                            data: data,
                            source: source,
                            relationId: relationId
                        };
                        triggerClient = new trigger_1.default(credentials);
                        vm = core.spinner('Trigger deploying...');
                        return [4 /*yield*/, triggerClient.create(IProps)];
                    case 1:
                        _a = _b.sent(), response = _a.response, error = _a.error;
                        if (!error) return [3 /*break*/, 7];
                        if (!(error.message.Code === 'ResourceConflictException')) return [3 /*break*/, 5];
                        if (!relationId) return [3 /*break*/, 3];
                        return [4 /*yield*/, triggerClient.update(IProps)];
                    case 2:
                        updateRes = _b.sent();
                        if (updateRes.fail) {
                            vm.fail('Trigger deploy failed');
                            logger_1.default.error(error.message.Message);
                        }
                        else {
                            vm.succeed('Trigger deployed');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        vm.fail('Trigger deploy failed');
                        throw new Error('Provide a relationId if you want to update the trigger. Or modefy the configuration of the trigger.');
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        vm.fail('Trigger deploy failed');
                        logger_1.default.error(error.message.Message);
                        return [2 /*return*/, error];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        vm.succeed('New trigger deployed');
                        return [2 /*return*/, response];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    deploy.prototype.getBrn = function (props, credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var protocol, postEndpoint, endpoint, functionClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        protocol = props.protocol || CONFIGS.defaultProtocol;
                        postEndpoint = props.endpoint || CONFIGS.defaultEndpoint;
                        endpoint = protocol + '://' + postEndpoint;
                        functionClient = new function_1.default({ endpoint: endpoint, credentials: credentials });
                        return [4 /*yield*/, functionClient.getBrnByFunctionName(props.functionName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    deploy.prototype.deploy = function (props, subCommand, credentials, inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var deployFunctionRes, functionBrn, functionBrn, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(subCommand === 'all')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.deployFunction({ props: props, credentials: credentials })];
                    case 1:
                        deployFunctionRes = _b.sent();
                        return [4 /*yield*/, deployFunctionRes];
                    case 2:
                        functionBrn = _b.sent();
                        return [4 /*yield*/, this.deployTrigger(functionBrn, props, credentials)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!(subCommand === 'function')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.deployFunction({ props: props, credentials: credentials })];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6:
                        if (!(subCommand === 'trigger')) return [3 /*break*/, 10];
                        _a = props.functionBrn;
                        if (_a) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.getBrn(props, credentials)];
                    case 7:
                        _a = (_b.sent());
                        _b.label = 8;
                    case 8:
                        functionBrn = _a;
                        return [4 /*yield*/, this.deployTrigger(functionBrn, props, credentials)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10:
                        if (subCommand === 'help') {
                            core.help(HELP.DEPLOY);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return deploy;
}());
exports.default = deploy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvZGVwbG95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHFEQUErQjtBQUMvQiwwREFBOEM7QUFDOUMsK0RBQXlDO0FBQ3pDLG1EQUF1QztBQUN2Qyx3REFBa0M7QUFDbEMsc0RBQWdDO0FBQ2hDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUVuQyxJQUFNLE9BQU8sR0FBYTtJQUN4QixLQUFLO0lBQ0wsVUFBVTtJQUNWLFNBQVM7SUFDVCxNQUFNO0NBQ1AsQ0FBQztBQUVGLHVCQUF1QjtBQUN2QixvQkFBb0I7QUFDcEIseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6QiwwQkFBMEI7QUFDMUIsMkJBQTJCO0FBQzNCLHdCQUF3QjtBQUN4Qix3QkFBd0I7QUFDeEIsc0JBQXNCO0FBQ3RCLHdCQUF3QjtBQUN4QixJQUFJO0FBRUo7SUE4Q0UsZ0JBQVksRUFBcUU7WUFBcEUsUUFBUSxjQUFBLEVBQUUsV0FBVyxpQkFBQTtRQUNoQyxnQkFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQS9DWSxtQkFBWSxHQUF6QixVQUEwQixNQUFNOzs7O2dCQUM5QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFHLENBQUMsQ0FBQztnQkFFeEQsVUFBVSxHQUF5QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtvQkFDakUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO29CQUNqQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO2lCQUNyQixDQUFDLENBQUM7Z0JBRUcsVUFB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