"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.tableShow = exports.startZip = exports.readDir = void 0;
var tty_table_1 = __importDefault(require("tty-table"));
var lodash_1 = __importDefault(require("lodash"));
// import * as core from '@serverless-devs/core';
var logger_1 = __importDefault(require("../common/logger"));
var jszip_1 = __importDefault(require("jszip"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var zip = new jszip_1.default();
function readDir(obj, nowPath, targetDir) {
    return __awaiter(this, void 0, void 0, function () {
        var pathDir, _dir, files;
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
                            readDir(dirlist, fillPath, targetDir);
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
}
exports.readDir = readDir;
function startZip(codePath) {
    return __awaiter(this, void 0, void 0, function () {
        var targetDir, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    targetDir = path_1.default.resolve(codePath);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, readDir(zip, targetDir, targetDir)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, zip.generateAsync({
                            type: 'nodebuffer',
                            compression: 'DEFLATE',
                        })];
                case 3:
                    data = _a.sent();
                    fs_1.default.writeFile('hello.zip', data, function (err) {
                        /*...*/
                    });
                    return [2 /*return*/, Buffer.from(data).toString('base64')];
                case 4:
                    e_1 = _a.sent();
                    logger_1.default.error('File does not exist or file is invalid. please check');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.startZip = startZip;
exports.tableShow = function (data, showKey) {
    var options = {
        borderStyle: 'solid',
        borderColor: 'blue',
        headerAlign: 'center',
        align: 'left',
        color: 'cyan',
        width: '100%',
    };
    var header_option = {
        headerColor: 'cyan',
        color: 'cyan',
        align: 'left',
        width: 'auto',
        formatter: function (value) { return value; },
    };
    var header = showKey.map(function (value) { return (lodash_1.default.isString(value) ? (__assign(__assign({}, header_option), { value: value })) : (__assign(__assign({}, header_option), value))); });
    console.log(tty_table_1.default(header, data, options).render());
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQThCO0FBQzlCLGtEQUF1QjtBQUN2QixpREFBaUQ7QUFDakQsNERBQXNDO0FBQ3RDLGdEQUEwQjtBQUMxQiwwQ0FBb0I7QUFDcEIsOENBQXdCO0FBQ3hCLElBQUksR0FBRyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7QUFFdEIsU0FBc0IsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsU0FBUzs7OztZQUNqRCxJQUFJO2dCQUNJLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFHLE9BQVMsQ0FBQyxDQUFDLENBQUM7aUJBQy9DO3FCQUFNO29CQUNELEtBQUssR0FBRyxZQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNwQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUSxFQUFFLEtBQUs7d0JBQzVCLElBQUksUUFBUSxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDO3dCQUN4QyxJQUFJLElBQUksR0FBRyxZQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNqQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTs0QkFDdEIsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDOzRCQUM3RCxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQzt5QkFDdkM7NkJBQU07NEJBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsWUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3lCQUMvQztvQkFDSCxDQUFDLENBQUMsQ0FBQztpQkFDSjthQUNGO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTs7OztDQUNmO0FBcEJILDBCQW9CRztBQUVILFNBQXNCLFFBQVEsQ0FBQyxRQUFnQjs7Ozs7O29CQUNyQyxTQUFTLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztvQkFFckMscUJBQU0sT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUE7O29CQUF4QyxTQUF3QyxDQUFDO29CQUM1QixxQkFBTSxHQUFHLENBQUMsYUFBYSxDQUFDOzRCQUNyQyxJQUFJLEVBQUUsWUFBWTs0QkFDbEIsV0FBVyxFQUFFLFNBQVM7eUJBQ3JCLENBQUMsRUFBQTs7b0JBSEksSUFBSSxHQUFHLFNBR1g7b0JBQ0YsWUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRzt3QkFDN0MsT0FBTztvQkFDUCxDQUFDLENBQUMsQ0FBQztvQkFFSCxzQkFBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBQzs7O29CQUU1QyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDOzs7Ozs7Q0FFNUU7QUFoQkQsNEJBZ0JDO0FBRVksUUFBQSxTQUFTLEdBQUcsVUFBQyxJQUFJLEVBQUUsT0FBTztJQUNuQyxJQUFNLE9BQU8sR0FBRztRQUNkLFdBQVcsRUFBRSxPQUFPO1FBQ3BCLFdBQVcsRUFBRSxNQUFNO1FBQ25CLFdBQVcsRUFBRSxRQUFRO1FBQ3JCLEtBQUssRUFBRSxNQUFNO1FBQ2IsS0FBSyxFQUFFLE1BQU07UUFDYixLQUFLLEVBQUUsTUFBTTtLQUNkLENBQUM7SUFDRixJQUFNLGFBQWEsR0FBRztRQUNwQixXQUFXLEVBQUUsTUFBTTtRQUNuQixLQUFLLEVBQUUsTUFBTTtRQUNiLEtBQUssRUFBRSxNQUFNO1FBQ2IsS0FBSyxFQUFFLE1BQU07UUFDYixTQUFTLEVBQUUsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLEVBQUwsQ0FBSztLQUM1QixDQUFDO0lBQ0YsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLENBQUMsZ0JBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUN0RCxhQUFhLEtBQ2hCLEtBQUssT0FBQSxJQUNMLENBQUMsQ0FBQyxDQUFDLHVCQUFNLGFBQWEsR0FBSyxLQUFLLEVBQUcsQ0FBQyxFQUhBLENBR0EsQ0FBQyxDQUFDO0lBRXhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDIn0=