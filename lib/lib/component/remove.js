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
var HELP = __importStar(require("../help/remove"));
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
var remove = /** @class */ (function () {
    function remove(_a) {
        var credentials = _a.credentials;
        client_1.default.setCfcClient(credentials);
    }
    remove.handleInputs = function (inputs) {
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
                    core.help(HELP.REMOVE);
                    return [2 /*return*/, { errorMessage: "Does not support " + subCommand + " command" }];
                }
                if (parsedData.help) {
                    rawData[0] ? core.help(HELP[("deploy_" + subCommand).toLocaleUpperCase()]) : core.help(HELP.REMOVE);
                    return [2 /*return*/, { help: true, subCommand: subCommand }];
                }
                props = inputs.props || {};
                endProps = props;
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
                    }];
            });
        });
    };
    remove.prototype.removeFunction = function (_a) {
        var endpoint = _a.endpoint, credentials = _a.credentials, functionName = _a.functionName;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new function_1.default({ endpoint: endpoint, credentials: credentials }).remove(functionName)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    remove.prototype.removeTrigger = function (_a) {
        var credentials = _a.credentials, props = _a.props, functionBrn = _a.functionBrn;
        return __awaiter(this, void 0, void 0, function () {
            var target, source, data, relationId, IProps;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        target = functionBrn;
                        source = props.trigger.source;
                        data = props.trigger.data;
                        relationId = props.trigger.relationId;
                        IProps = {
                            target: target,
                            data: data,
                            source: source,
                            relationId: relationId
                        };
                        return [4 /*yield*/, new trigger_1.default(credentials).remove(IProps)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    remove.prototype.getBrn = function (props, credentials) {
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
    remove.prototype.remove = function (endpoint, props, subCommand, credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var functionName, functionBrn, _a, functionName, functionBrn, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(subCommand === 'all')) return [3 /*break*/, 5];
                        functionName = props.functionName;
                        return [4 /*yield*/, this.removeFunction({ endpoint: endpoint, credentials: credentials, functionName: functionName })];
                    case 1:
                        _c.sent();
                        _a = props.functionBrn;
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getBrn(props, credentials)];
                    case 2:
                        _a = (_c.sent());
                        _c.label = 3;
                    case 3:
                        functionBrn = _a;
                        return [4 /*yield*/, this.removeTrigger({ credentials: credentials, props: props, functionBrn: functionBrn })];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        if (!(subCommand === 'function')) return [3 /*break*/, 7];
                        functionName = props.functionName;
                        return [4 /*yield*/, this.removeFunction({ endpoint: endpoint, credentials: credentials, functionName: functionName })];
                    case 6: return [2 /*return*/, _c.sent()];
                    case 7:
                        if (!(subCommand === 'trigger')) return [3 /*break*/, 11];
                        _b = props.functionBrn;
                        if (_b) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.getBrn(props, credentials)];
                    case 8:
                        _b = (_c.sent());
                        _c.label = 9;
                    case 9:
                        functionBrn = _b;
                        return [4 /*yield*/, this.removeTrigger({ credentials: credentials, props: props, functionBrn: functionBrn })];
                    case 10: return [2 /*return*/, _c.sent()];
                    case 11:
                        if (subCommand === 'help') {
                            core.help(HELP.REMOVE);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return remove;
}());
exports.default = remove;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvcmVtb3ZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHFEQUErQjtBQUMvQiwwREFBOEM7QUFDOUMsK0RBQXlDO0FBQ3pDLG1EQUF1QztBQUN2Qyx3REFBa0M7QUFDbEMsc0RBQWdDO0FBQ2hDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUVuQyxJQUFNLE9BQU8sR0FBYTtJQUN4QixLQUFLO0lBQ0wsVUFBVTtJQUNWLFNBQVM7SUFDVCxNQUFNO0NBQ1AsQ0FBQztBQUVGLHVCQUF1QjtBQUN2QixvQkFBb0I7QUFDcEIseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6QiwwQkFBMEI7QUFDMUIsMkJBQTJCO0FBQzNCLHdCQUF3QjtBQUN4Qix3QkFBd0I7QUFDeEIsc0JBQXNCO0FBQ3RCLHdCQUF3QjtBQUN4QixJQUFJO0FBRUo7SUF5Q0UsZ0JBQVksRUFBeUM7WUFBeEMsV0FBVyxpQkFBQTtRQUN0QixnQkFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBMUNZLG1CQUFZLEdBQXpCLFVBQTBCLE1BQU07Ozs7Z0JBQzlCLGdCQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFpQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUcsQ0FBQyxDQUFDO2dCQUV4RCxVQUFVLEdBQXlCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO29CQUNqRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0JBQ2pCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7aUJBQ3JCLENBQUMsQ0FBQztnQkFFRyxVQUFVLEdBQUcsQ0FBQSxVQUFVLGFBQVYsVUFB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