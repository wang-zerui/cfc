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
        client_1.default.setCfcClient(endpoint, credentials);
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
            var protocol, postEndpoint, endpoint, functionClient;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        protocol = props.protocol || CONFIGS.defaultProtocol;
                        postEndpoint = props.endpoint || CONFIGS.defaultEndpoint;
                        endpoint = protocol + '://' + postEndpoint;
                        functionClient = new function_1.default({ endpoint: endpoint, credentials: credentials });
                        return [4 /*yield*/, functionClient.create(props)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    deploy.prototype.deploy = function (props, subCommand, credentials, inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(subCommand === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.deployFunction({ props: props, credentials: credentials })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvZGVwbG95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHFEQUErQjtBQUMvQiwwREFBOEM7QUFDOUMsK0RBQXlDO0FBQ3pDLG1EQUF1QztBQUN2Qyx3REFBaUM7QUFDakMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRW5DLElBQU0sT0FBTyxHQUFhO0lBQ3hCLEtBQUs7SUFDTCxVQUFVO0lBQ1YsU0FBUztJQUNULE1BQU07Q0FDUCxDQUFDO0FBRUYsdUJBQXVCO0FBQ3ZCLG9CQUFvQjtBQUNwQix5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCLDBCQUEwQjtBQUMxQiwyQkFBMkI7QUFDM0Isd0JBQXdCO0FBQ3hCLHdCQUF3QjtBQUN4QixzQkFBc0I7QUFDdEIsd0JBQXdCO0FBQ3hCLElBQUk7QUFFSjtJQThDRSxnQkFBWSxFQUFxRTtZQUFwRSxRQUFRLGNBQUEsRUFBRSxXQUFXLGlCQUFBO1FBQ2hDLGdCQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBL0NZLG1CQUFZLEdBQXpCLFVBQTBCLE1BQU07Ozs7Z0JBQzlCLGdCQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFpQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUcsQ0FBQyxDQUFDO2dCQUV4RCxVQUFVLEdBQXlCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO29CQUNqRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0JBQ2pCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7aUJBQ3JCLENBQUMsQ0FBQztnQkFFRyxVQUFVLEdBQUcsQ0FBQSxV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