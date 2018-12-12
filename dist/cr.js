/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/boot/cr.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/boot/cr.ts":
/*!************************!*\
  !*** ./src/boot/cr.ts ***!
  \************************/
/*! exports provided: CrashReporting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CrashReporting\", function() { return CrashReporting; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"./src/core/index.ts\");\n/* harmony import */ var _cr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cr */ \"./src/cr/index.ts\");\n\n\nvar CrashReporting = (function () {\n    function CrashReporting() {\n        this.core = new _core__WEBPACK_IMPORTED_MODULE_0__[\"Core\"]();\n    }\n    CrashReporting.prototype.boot = function (userConfig) {\n        this.core.init(userConfig);\n        this.cr = new _cr__WEBPACK_IMPORTED_MODULE_1__[\"CR\"](this.core);\n        return this;\n    };\n    CrashReporting.prototype.setUser = function (user) {\n        this.core.user.setUser(user);\n        return this;\n    };\n    CrashReporting.prototype.withTags = function (tags) {\n        this.core.tags.setTags(tags);\n        return this;\n    };\n    CrashReporting.prototype.send = function (error, customData, tags) {\n        if (customData === void 0) { customData = {}; }\n        if (tags === void 0) { tags = []; }\n        this.cr.send(error, customData, tags);\n    };\n    CrashReporting.noConflict = function () {\n        return new CrashReporting();\n    };\n    return CrashReporting;\n}());\n\n\n\n//# sourceURL=webpack:///./src/boot/cr.ts?");

/***/ }),

/***/ "./src/core/config.ts":
/*!****************************!*\
  !*** ./src/core/config.ts ***!
  \****************************/
/*! exports provided: assignDefaultConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"assignDefaultConfig\", function() { return assignDefaultConfig; });\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nfunction assignDefaultConfig(userConfig) {\n    return __assign({ realUserMonitoring: false, crashReporting: false, secureCookie: true, saveOfflineErrors: false, asyncErrorHandler: false, ignore3rdPartyErrors: false, excludedHostnames: [], excludedUserAgents: [], apiUrl: \"https://api.raygun.io\" }, userConfig);\n}\n\n\n//# sourceURL=webpack:///./src/core/config.ts?");

/***/ }),

/***/ "./src/core/core.ts":
/*!**************************!*\
  !*** ./src/core/core.ts ***!
  \**************************/
/*! exports provided: Core */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Core\", function() { return Core; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/core/config.ts\");\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ \"./src/core/user.ts\");\n/* harmony import */ var _tags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tags */ \"./src/core/tags.ts\");\n\n\n\nvar Core = (function () {\n    function Core() {\n    }\n    Core.prototype.init = function (userConfig) {\n        this.config = Object(_config__WEBPACK_IMPORTED_MODULE_0__[\"assignDefaultConfig\"])(userConfig);\n        this.user = new _user__WEBPACK_IMPORTED_MODULE_1__[\"User\"](this.config);\n        this.tags = new _tags__WEBPACK_IMPORTED_MODULE_2__[\"Tags\"]();\n    };\n    return Core;\n}());\n\n\n\n//# sourceURL=webpack:///./src/core/core.ts?");

/***/ }),

/***/ "./src/core/index.ts":
/*!***************************!*\
  !*** ./src/core/index.ts ***!
  \***************************/
/*! exports provided: assignDefaultConfig, Tags, convertToPayload, User, Core */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/core/config.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"assignDefaultConfig\", function() { return _config__WEBPACK_IMPORTED_MODULE_0__[\"assignDefaultConfig\"]; });\n\n/* harmony import */ var _tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tags */ \"./src/core/tags.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Tags\", function() { return _tags__WEBPACK_IMPORTED_MODULE_1__[\"Tags\"]; });\n\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user */ \"./src/core/user.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"convertToPayload\", function() { return _user__WEBPACK_IMPORTED_MODULE_2__[\"convertToPayload\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"User\", function() { return _user__WEBPACK_IMPORTED_MODULE_2__[\"User\"]; });\n\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core */ \"./src/core/core.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Core\", function() { return _core__WEBPACK_IMPORTED_MODULE_3__[\"Core\"]; });\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/core/index.ts?");

/***/ }),

/***/ "./src/core/tags.ts":
/*!**************************!*\
  !*** ./src/core/tags.ts ***!
  \**************************/
/*! exports provided: Tags */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tags\", function() { return Tags; });\nvar Tags = (function () {\n    function Tags() {\n    }\n    Tags.prototype.setTags = function (tags) {\n        this.tags = tags;\n    };\n    Tags.prototype.getTags = function () {\n        return this.tags.slice();\n    };\n    return Tags;\n}());\n\n\n\n//# sourceURL=webpack:///./src/core/tags.ts?");

/***/ }),

/***/ "./src/core/user.ts":
/*!**************************!*\
  !*** ./src/core/user.ts ***!
  \**************************/
/*! exports provided: convertToPayload, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"convertToPayload\", function() { return convertToPayload; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"User\", function() { return User; });\n/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage */ \"./src/utils/storage/index.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\nfunction convertToPayload(user) {\n    var payload = {\n        Identifier: user.identifier,\n        IsAnonymous: user.isAnonymous,\n    };\n    if (!!user.email) {\n        payload.Email = user.email;\n    }\n    if (!!user.email) {\n        payload.FullName = user.fullName;\n    }\n    if (!!user.email) {\n        payload.FirstName = user.firstName;\n    }\n    if (!!user.email) {\n        payload.UUID = user.uuid;\n    }\n    return payload;\n}\nvar USER_KEY = \"raygun4js-userid\";\nvar USER_COOKIE_TIMEOUT = 24 * 31;\nvar User = (function () {\n    function User(config, storage) {\n        if (storage === void 0) { storage = new _utils_storage__WEBPACK_IMPORTED_MODULE_0__[\"CookieStorage\"](); }\n        this.config = config;\n        this.storage = storage;\n        this.storage.updateConfig(this.config);\n        this.setUserFromStorage();\n    }\n    User.prototype.setUserFromStorage = function () {\n        var identifier = this.storage.read(USER_KEY);\n        if (identifier) {\n            this.user = {\n                identifier: identifier\n            };\n        }\n    };\n    User.prototype.setUser = function (user) {\n        this.user = convertToPayload(user);\n        this.storage.set(USER_KEY, this.user.Identifier, USER_COOKIE_TIMEOUT);\n    };\n    User.prototype.getUser = function () {\n        return __assign({}, this.user);\n    };\n    return User;\n}());\n\n\n\n//# sourceURL=webpack:///./src/core/user.ts?");

/***/ }),

/***/ "./src/cr/cr.ts":
/*!**********************!*\
  !*** ./src/cr/cr.ts ***!
  \**********************/
/*! exports provided: CR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CR\", function() { return CR; });\n/* harmony import */ var _utils_transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/transport */ \"./src/utils/transport/index.ts\");\n/* harmony import */ var _errorQueue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errorQueue */ \"./src/cr/errorQueue.ts\");\n/* harmony import */ var _discardError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./discardError */ \"./src/cr/discardError.ts\");\n/* harmony import */ var _payload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payload */ \"./src/cr/payload.ts\");\n/* harmony import */ var _tracekit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tracekit */ \"./src/cr/tracekit.ts\");\n\n\n\n\n\nvar CR = (function () {\n    function CR(core, transport) {\n        if (transport === void 0) { transport = _utils_transport__WEBPACK_IMPORTED_MODULE_0__[\"sendXHRRequest\"]; }\n        this.sending = false;\n        this.core = core;\n        this.transport = transport;\n        this.errorQueue = new _errorQueue__WEBPACK_IMPORTED_MODULE_1__[\"ErrorQueue\"](this.core.config);\n        this.processException = this.processException.bind(this);\n    }\n    CR.prototype.attach = function () {\n        _tracekit__WEBPACK_IMPORTED_MODULE_4__[\"TraceKit\"].report.subscribe(this.processException);\n        if (this.core.config.asyncErrorHandler) {\n            _tracekit__WEBPACK_IMPORTED_MODULE_4__[\"TraceKit\"].extendToAsynchronousCallbacks();\n        }\n    };\n    CR.prototype.detach = function () {\n        _tracekit__WEBPACK_IMPORTED_MODULE_4__[\"TraceKit\"].report.unsubscribe(this.processException);\n    };\n    CR.prototype.send = function (ex, customData, tags) {\n        if (!this.core.config.crashReporting) {\n            return;\n        }\n        var exception = _tracekit__WEBPACK_IMPORTED_MODULE_4__[\"TraceKit\"].computeStackTrace(ex);\n        this.processException(exception, customData, tags);\n    };\n    CR.prototype.processException = function (ex, customData, tags) {\n        if (customData === void 0) { customData = {}; }\n        if (tags === void 0) { tags = []; }\n        if (Object(_discardError__WEBPACK_IMPORTED_MODULE_2__[\"discardError\"])(this.core, ex)) {\n            return;\n        }\n        var payload = Object(_payload__WEBPACK_IMPORTED_MODULE_3__[\"createPayload\"])(this.core, ex, customData, tags);\n        this.errorQueue.add({\n            url: this.url,\n            apiKey: this.core.config.apiKey,\n            payload: payload,\n        });\n        this.postNextError();\n    };\n    Object.defineProperty(CR.prototype, \"url\", {\n        get: function () {\n            return this.core.config.apiUrl + \"/entries?apikey=\" + encodeURIComponent(this.core.config.apiKey);\n        },\n        enumerable: true,\n        configurable: true\n    });\n    CR.prototype.postNextError = function () {\n        var _this = this;\n        if (this.sending) {\n            return;\n        }\n        this.sending = true;\n        var error = this.errorQueue.removeAndGetFirstItem();\n        if (!error) {\n            this.sending = false;\n            return;\n        }\n        this.transport({\n            method: 'post',\n            url: error.url,\n            data: error.payload,\n            onSuccess: function () {\n                _this.sending = false;\n                _this.postNextError();\n            },\n            onFail: function (retry) {\n                if (retry) {\n                    _this.errorQueue.add(error, true);\n                }\n                _this.sending = false;\n            }\n        });\n    };\n    return CR;\n}());\n\n\n\n//# sourceURL=webpack:///./src/cr/cr.ts?");

/***/ }),

/***/ "./src/cr/discardError.ts":
/*!********************************!*\
  !*** ./src/cr/discardError.ts ***!
  \********************************/
/*! exports provided: discardError, discardAsThirdPartyError, discardAsAnExcludedHostname, discardAsAnExcludedUserAgent, discardAsTheInsightsCrawler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"discardError\", function() { return discardError; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"discardAsThirdPartyError\", function() { return discardAsThirdPartyError; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"discardAsAnExcludedHostname\", function() { return discardAsAnExcludedHostname; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"discardAsAnExcludedUserAgent\", function() { return discardAsAnExcludedUserAgent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"discardAsTheInsightsCrawler\", function() { return discardAsTheInsightsCrawler; });\nfunction discardError(core, exception) {\n    return checks.every(function (shouldDiscard) { return !shouldDiscard(core.config, exception); });\n}\nvar discardAsThirdPartyError = function (config, exception) {\n    if (!config.ignore3rdPartyErrors) {\n        return false;\n    }\n    return true;\n};\nvar discardAsAnExcludedHostname = function (config, exception) {\n    return false;\n};\nvar discardAsAnExcludedUserAgent = function (config, exception) {\n    return false;\n};\nvar discardAsTheInsightsCrawler = function () {\n    return navigator.userAgent.match('RaygunPulseInsightsCrawler').length > 0;\n};\nvar checks = [\n    discardAsThirdPartyError,\n    discardAsAnExcludedHostname,\n    discardAsAnExcludedUserAgent,\n    discardAsTheInsightsCrawler,\n];\n\n\n//# sourceURL=webpack:///./src/cr/discardError.ts?");

/***/ }),

/***/ "./src/cr/errorQueue.ts":
/*!******************************!*\
  !*** ./src/cr/errorQueue.ts ***!
  \******************************/
/*! exports provided: ErrorQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ErrorQueue\", function() { return ErrorQueue; });\n/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage */ \"./src/utils/storage/index.ts\");\n\nvar ERROR_STORAGE_KEY = \"raygun4js-errors\";\nvar ErrorQueue = (function () {\n    function ErrorQueue(config, storage) {\n        if (storage === void 0) { storage = new _utils_storage__WEBPACK_IMPORTED_MODULE_0__[\"LocalStorage\"](); }\n        this.errorQueue = [];\n        this.storage = storage;\n        this.config = config;\n        this.setQueueFromStorage();\n    }\n    ErrorQueue.prototype.setQueueFromStorage = function () {\n        var _this = this;\n        if (!this.config.saveOfflineErrors) {\n            return;\n        }\n        var errors = this.storage.read(ERROR_STORAGE_KEY);\n        if (errors) {\n            this.errorQueue = errors.filter(function (e) { return e.apiKey === _this.config.apiKey; });\n        }\n    };\n    ErrorQueue.prototype.saveQueueToStorage = function () {\n        if (!this.config.saveOfflineErrors) {\n            return;\n        }\n        this.storage.set(ERROR_STORAGE_KEY, this.errorQueue);\n    };\n    ErrorQueue.prototype.add = function (error, addToStart) {\n        if (addToStart) {\n            this.errorQueue.unshift(error);\n        }\n        else {\n            this.errorQueue.push(error);\n        }\n        this.saveQueueToStorage();\n    };\n    ErrorQueue.prototype.length = function () {\n        return this.errorQueue.length;\n    };\n    ErrorQueue.prototype.removeAndGetFirstItem = function () {\n        var error = this.errorQueue.shift();\n        if (error) {\n            this.saveQueueToStorage();\n            return error;\n        }\n        return null;\n    };\n    return ErrorQueue;\n}());\n\n\n\n//# sourceURL=webpack:///./src/cr/errorQueue.ts?");

/***/ }),

/***/ "./src/cr/index.ts":
/*!*************************!*\
  !*** ./src/cr/index.ts ***!
  \*************************/
/*! exports provided: CR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cr */ \"./src/cr/cr.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CR\", function() { return _cr__WEBPACK_IMPORTED_MODULE_0__[\"CR\"]; });\n\n\n\n\n//# sourceURL=webpack:///./src/cr/index.ts?");

/***/ }),

/***/ "./src/cr/payload.ts":
/*!***************************!*\
  !*** ./src/cr/payload.ts ***!
  \***************************/
/*! exports provided: createPayload, createStackTrace, createMessage, createError, createCustomData, createRequest, createEnvironment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createPayload\", function() { return createPayload; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createStackTrace\", function() { return createStackTrace; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createMessage\", function() { return createMessage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createError\", function() { return createError; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCustomData\", function() { return createCustomData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createRequest\", function() { return createRequest; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createEnvironment\", function() { return createEnvironment; });\n/* harmony import */ var _utils_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/url */ \"./src/utils/url.ts\");\n\nvar CLIENT_NAME = 'raygun-js';\nvar CLIENT_VERSION = 'test';\nfunction createPayload(core, exception, customData, tags) {\n    var payload = {\n        OccurredOn: new Date(),\n        Details: {\n            Error: createError(exception),\n            Environment: createEnvironment(),\n            User: core.user.getUser(),\n            Client: {\n                Name: CLIENT_NAME,\n                Version: CLIENT_VERSION,\n            },\n            UserCustomData: createCustomData(customData),\n            Tags: core.tags.getTags().concat(tags),\n            Request: createRequest(),\n            Version: 'Not supplied',\n        }\n    };\n    return payload;\n}\nfunction createStackTrace(stack) {\n    if (!stack || !stack.length) {\n        return [];\n    }\n    return stack.map(function (frame) { return ({\n        LineNumber: frame.line,\n        ColumnNumber: frame.column,\n        ClassName: \"line \" + frame.line + \", column \" + frame.column,\n        FileName: frame.url,\n        MethodName: frame.func || '[anonymous]'\n    }); });\n}\nfunction createMessage(exception) {\n    if (exception.message) {\n        return exception.message;\n    }\n    return \"Script error\";\n}\nfunction createError(exception) {\n    return {\n        ClassName: exception.name,\n        Message: createMessage(exception).substring(0, 512),\n        StackTrace: createStackTrace(exception.stack),\n        StackString: exception.stackString\n    };\n}\nfunction createCustomData(customData) {\n    try {\n        JSON.stringify(customData);\n    }\n    catch (e) {\n        return {\n            error: 'Cannot add custom data; may contain circular reference',\n        };\n    }\n    return customData;\n}\nfunction createRequest() {\n    return {\n        Url: window.location.protocol + \"//\" + window.location.host + window.location.pathname + window.location.hash,\n        QueryString: Object(_utils_url__WEBPACK_IMPORTED_MODULE_0__[\"getQuery\"])(),\n        Headers: {\n            'User-Agent': navigator.userAgent,\n            Referer: document.referrer,\n            Host: document.domain\n        },\n    };\n}\nfunction createEnvironment() {\n    return {\n        UtcOffset: new Date().getTimezoneOffset() / -60.0,\n        'User-Language': window.navigator.userLanguage,\n        'Document-Mode': document.documentMode,\n        'Browser-Width': window.innerWidth || document.documentElement.clientWidth,\n        'Browser-Height': window.innerHeight || document.documentElement.clientHeight,\n        'Screen-Width': screen ? window.screen.width : document.documentElement.clientWidth,\n        'Screen-Height': screen ? window.screen.height : document.documentElement.clientHeight,\n        'Color-Depth': screen ? window.screen.colorDepth : 8,\n        Browser: navigator.appCodeName,\n        'Browser-Name': navigator.appName,\n        'Browser-Version': navigator.appVersion,\n        Platform: navigator.platform,\n    };\n}\n\n\n//# sourceURL=webpack:///./src/cr/payload.ts?");

/***/ }),

/***/ "./src/cr/tracekit.ts":
/*!****************************!*\
  !*** ./src/cr/tracekit.ts ***!
  \****************************/
/*! exports provided: TraceKit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TraceKit\", function() { return TraceKit; });\n;\n;\nvar TraceKit = {\n    wrap: function () { return null; },\n    report: null,\n    computeStackTrace: null,\n    extendToAsynchronousCallbacks: function () { return null; },\n    remoteFetching: false,\n    collectWindowErrors: true,\n    linesOfContext: 11\n};\nvar _slice = [].slice;\nvar UNKNOWN_FUNCTION = '?';\nfunction has(object, key) {\n    return Object.prototype.hasOwnProperty.call(object, key);\n}\nfunction isUndefined(what) {\n    return typeof what === 'undefined';\n}\nTraceKit.wrap = function traceKitWrapper(func) {\n    function wrapped() {\n        try {\n            return func.apply(this, arguments);\n        }\n        catch (e) {\n            TraceKit.report(e);\n            throw e;\n        }\n    }\n    return wrapped;\n};\nTraceKit.report = (function reportModuleWrapper() {\n    var handlers = [], lastException = null, lastExceptionStack = null;\n    function subscribe(handler) {\n        installGlobalHandler();\n        handlers.push(handler);\n    }\n    function unsubscribe(handler) {\n        for (var i = handlers.length - 1; i >= 0; --i) {\n            if (handlers[i] === handler) {\n                handlers.splice(i, 1);\n            }\n        }\n    }\n    function notifyHandlers(stack, windowError) {\n        var exception = null;\n        if (windowError && !TraceKit.collectWindowErrors) {\n            return;\n        }\n        for (var i in handlers) {\n            if (has(handlers, i)) {\n                try {\n                    handlers[i].apply(null, [stack].concat(_slice.call(arguments, 2)));\n                }\n                catch (inner) {\n                    exception = inner;\n                }\n            }\n        }\n        if (exception) {\n            throw exception;\n        }\n    }\n    var _oldOnerrorHandler, _onErrorHandlerInstalled;\n    function traceKitWindowOnError(message, url, lineNo, columnNo, errorObj) {\n        var stack = null;\n        if (errorObj) {\n            stack = TraceKit.computeStackTrace(errorObj);\n        }\n        else {\n            if (lastExceptionStack) {\n                TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(lastExceptionStack, url, lineNo, message);\n                stack = lastExceptionStack;\n                lastExceptionStack = null;\n                lastException = null;\n            }\n            else {\n                var location_1 = {\n                    'url': url,\n                    'line': lineNo,\n                    'column': columnNo,\n                    'func': TraceKit.computeStackTrace.guessFunctionName(url, lineNo),\n                    'context': TraceKit.computeStackTrace.gatherContext(url, lineNo),\n                };\n                stack = {\n                    'mode': 'onerror',\n                    'message': message,\n                    'url': document.location.href,\n                    'stack': [location_1],\n                    'useragent': navigator.userAgent\n                };\n            }\n        }\n        notifyHandlers(stack, 'from window.onerror');\n        if (_oldOnerrorHandler) {\n            return _oldOnerrorHandler.apply(this, arguments);\n        }\n        return false;\n    }\n    function installGlobalHandler() {\n        if (_onErrorHandlerInstalled === true) {\n            return;\n        }\n        _oldOnerrorHandler = window.onerror;\n        window.onerror = traceKitWindowOnError;\n        _onErrorHandlerInstalled = true;\n    }\n    var report = function (ex) {\n        var args;\n        if (typeof document !== 'undefined') {\n            args = _slice.call(arguments, 1);\n        }\n        if (lastExceptionStack) {\n            if (lastException === ex) {\n                return;\n            }\n            else {\n                var s = lastExceptionStack;\n                lastExceptionStack = null;\n                lastException = null;\n                notifyHandlers.apply(null, [s, null].concat(args));\n            }\n        }\n        var stack = TraceKit.computeStackTrace(ex);\n        lastExceptionStack = stack;\n        lastException = ex;\n        window.setTimeout(function () {\n            if (lastException === ex) {\n                lastExceptionStack = null;\n                lastException = null;\n                notifyHandlers.apply(null, [stack, null].concat(args));\n            }\n        }, (stack.incomplete ? 2000 : 0));\n        throw ex;\n    };\n    report.subscribe = subscribe;\n    report.unsubscribe = unsubscribe;\n    return report;\n}());\nTraceKit.computeStackTrace = (function computeStackTraceWrapper() {\n    var debug = false, sourceCache = {};\n    function loadSource(url) {\n        if (typeof url !== 'string') {\n            return [];\n        }\n        return '';\n    }\n    function getSource(url) {\n        if (!has(sourceCache, url)) {\n            var source = '';\n            url = url || \"\";\n            var domain;\n            if (typeof document !== 'undefined') {\n                domain = document.domain;\n            }\n            else {\n                domain = window.location.hostname;\n            }\n            if (url.indexOf && url.indexOf(domain) !== -1) {\n                source = loadSource(url);\n            }\n            sourceCache[url] = source ? source.split('\\n') : [];\n        }\n        return sourceCache[url];\n    }\n    function guessFunctionName(url, lineNo) {\n        var reFunctionArgNames = /function ([^(]*)\\(([^)]*)\\)/, reGuessFunction = /['\"]?([0-9A-Za-z$_]+)['\"]?\\s*[:=]\\s*(function|eval|new Function)/, line = '', maxLines = 10, source = getSource(url), m;\n        if (!source.length) {\n            return UNKNOWN_FUNCTION;\n        }\n        for (var i = 0; i < maxLines; ++i) {\n            line = source[lineNo - i] + line;\n            if (!isUndefined(line)) {\n                if ((m = reGuessFunction.exec(line))) {\n                    return m[1];\n                }\n                else if ((m = reFunctionArgNames.exec(line))) {\n                    return m[1];\n                }\n            }\n        }\n        return UNKNOWN_FUNCTION;\n    }\n    function gatherContext(url, line) {\n        var source = getSource(url);\n        if (!source.length) {\n            return null;\n        }\n        var context = [], linesBefore = Math.floor(TraceKit.linesOfContext / 2), linesAfter = linesBefore + (TraceKit.linesOfContext % 2), start = Math.max(0, line - linesBefore - 1), end = Math.min(source.length, line + linesAfter - 1);\n        line -= 1;\n        for (var i = start; i < end; ++i) {\n            if (!isUndefined(source[i])) {\n                context.push(source[i]);\n            }\n        }\n        return context.length > 0 ? context : null;\n    }\n    function escapeRegExp(text) {\n        return text.replace(/[\\-\\[\\]{}()*+?.,\\\\\\^$|#]/g, '\\\\$&');\n    }\n    function escapeCodeAsRegExpForMatchingInsideHTML(body) {\n        return escapeRegExp(body).replace('<', '(?:<|&lt;)').replace('>', '(?:>|&gt;)').replace('&', '(?:&|&amp;)').replace('\"', '(?:\"|&quot;)').replace(/\\s+/g, '\\\\s+');\n    }\n    function findSourceInUrls(re, urls) {\n        var source, m;\n        for (var i = 0, j = urls.length; i < j; ++i) {\n            if ((source = getSource(urls[i])).length) {\n                source = source.join('\\n');\n                if ((m = re.exec(source))) {\n                    return {\n                        'url': urls[i],\n                        'line': source.substring(0, m.index).split('\\n').length,\n                        'column': m.index - source.lastIndexOf('\\n', m.index) - 1\n                    };\n                }\n            }\n        }\n        return null;\n    }\n    function findSourceInLine(fragment, url, line) {\n        var source = getSource(url), re = new RegExp('\\\\b' + escapeRegExp(fragment) + '\\\\b'), m;\n        line -= 1;\n        if (source && source.length > line && (m = re.exec(source[line]))) {\n            return m.index;\n        }\n        return null;\n    }\n    function findSourceByFunctionBody(func) {\n        var urls = [window.location.href], scripts = document.getElementsByTagName('script'), body, code = '' + func, codeRE = /^function(?:\\s+([\\w$]+))?\\s*\\(([\\w\\s,]*)\\)\\s*\\{\\s*(\\S[\\s\\S]*\\S)\\s*\\}\\s*$/, eventRE = /^function on([\\w$]+)\\s*\\(event\\)\\s*\\{\\s*(\\S[\\s\\S]*\\S)\\s*\\}\\s*$/, re, parts, result;\n        for (var i = 0; i < scripts.length; ++i) {\n            var script = scripts[i];\n            if (script.src) {\n                urls.push(script.src);\n            }\n        }\n        if (!(parts = codeRE.exec(code))) {\n            re = new RegExp(escapeRegExp(code).replace(/\\s+/g, '\\\\s+'));\n        }\n        else {\n            var name = parts[1] ? '\\\\s+' + parts[1] : '', args = parts[2].split(',').join('\\\\s*,\\\\s*');\n            body = escapeRegExp(parts[3]).replace(/;$/, ';?');\n            re = new RegExp('function' + name + '\\\\s*\\\\(\\\\s*' + args + '\\\\s*\\\\)\\\\s*{\\\\s*' + body + '\\\\s*}');\n        }\n        if ((result = findSourceInUrls(re, urls))) {\n            return result;\n        }\n        if ((parts = eventRE.exec(code))) {\n            var event = parts[1];\n            body = escapeCodeAsRegExpForMatchingInsideHTML(parts[2]);\n            re = new RegExp('on' + event + '=[\\\\\\'\"]\\\\s*' + body + '\\\\s*[\\\\\\'\"]', 'i');\n            if ((result = findSourceInUrls(re, urls[0]))) {\n                return result;\n            }\n            re = new RegExp(body);\n            if ((result = findSourceInUrls(re, urls))) {\n                return result;\n            }\n        }\n        return null;\n    }\n    function computeStackTraceFromStackProp(ex) {\n        var parseError;\n        if (!ex.stack) {\n            return null;\n        }\n        var chrome = /^\\s*at (.*?) ?\\(((?:file|https?|\\s*|blob|chrome-extension|native|webpack|eval|<anonymous>|\\/).*?)(?::(\\d+))?(?::(\\d+))?\\)?\\s*$/i, gecko = /^\\s*(.*?)(?:\\((.*?)\\))?(?:^|@)((?:file|https?|blob|chrome|webpack|\\[native).*?|[^@]*bundle)(?::(\\d+))?(?::(\\d+))?\\s*$/i, winjs = /^\\s*at (?:((?:\\[object object\\])?.+) )?\\(?((?:ms-appx|https?|webpack|blob):.*?):(\\d+)(?::(\\d+))?\\)?\\s*$/i, lines = ex.stack.split('\\n'), stack = [], parts, element, reference = /^(.*) is undefined$/.exec(ex.message);\n        for (var i = 0, j = lines.length; i < j; ++i) {\n            if ((parts = gecko.exec(lines[i]))) {\n                element = {\n                    'url': parts[3],\n                    'func': parts[1] || UNKNOWN_FUNCTION,\n                    'args': parts[2] ? parts[2].split(',') : '',\n                    'line': +parts[4],\n                    'column': parts[5] ? +parts[5] : null\n                };\n            }\n            else if ((parts = chrome.exec(lines[i]))) {\n                element = {\n                    'url': parts[2],\n                    'func': parts[1] || UNKNOWN_FUNCTION,\n                    'line': +parts[3],\n                    'column': parts[4] ? +parts[4] : null\n                };\n            }\n            else if ((parts = winjs.exec(lines[i]))) {\n                element = {\n                    'url': parts[2],\n                    'func': parts[1] || UNKNOWN_FUNCTION,\n                    'line': +parts[3],\n                    'column': parts[4] ? +parts[4] : null\n                };\n            }\n            else {\n                continue;\n            }\n            if (!element.func && element.line) {\n                element.func = guessFunctionName(element.url, element.line);\n            }\n            if (typeof document !== 'undefined' && element.line) {\n                element.context = gatherContext(element.url, element.line);\n            }\n            stack.push(element);\n        }\n        if (stack[0] && stack[0].line && !stack[0].column && reference) {\n            stack[0].column = findSourceInLine(reference[1], stack[0].url, stack[0].line);\n        }\n        else if (!stack[0].column && typeof ex.columnNumber !== 'undefined') {\n            stack[0].column = ex.columnNumber + 1;\n        }\n        if (!stack.length) {\n            return null;\n        }\n        var res = {\n            'mode': 'stack',\n            'name': ex ? ex.name : '',\n            'message': ex ? ex.message : '',\n            'url': typeof document !== 'undefined' ? document.location.href : '',\n            'stack': stack,\n            'useragent': navigator ? navigator.userAgent : '',\n            'stackstring': ex && ex.stack ? ex.stack.toString() : ''\n        };\n        return res;\n    }\n    function computeStackTraceFromStacktraceProp(ex) {\n        var stacktrace = ex.stacktrace;\n        var testRE = / line (\\d+), column (\\d+) in (?:<anonymous function: ([^>]+)>|([^\\)]+))\\((.*)\\) in (.*):\\s*$/i, lines = stacktrace ? stacktrace.split('\\n') : [], stack = [], parts;\n        for (var i = 0, j = lines.length; i < j; i += 2) {\n            if ((parts = testRE.exec(lines[i]))) {\n                var element = {\n                    'line': +parts[1],\n                    'column': +parts[2],\n                    'func': parts[3] || parts[4],\n                    'args': parts[5] ? parts[5].split(',') : [],\n                    'url': parts[6]\n                };\n                if (!element.func && element.line) {\n                    element.func = guessFunctionName(element.url, element.line);\n                }\n                if (element.line) {\n                    try {\n                        element.context = gatherContext(element.url, element.line);\n                    }\n                    catch (exc) { }\n                }\n                if (!element.context) {\n                    element.context = [lines[i + 1]];\n                }\n                stack.push(element);\n            }\n        }\n        if (!stack.length) {\n            return null;\n        }\n        return {\n            'mode': 'stacktrace',\n            'name': ex.name,\n            'message': ex.message,\n            'url': document.location.href,\n            'stack': stack,\n            'useragent': navigator.userAgent,\n            'stackstring': stacktrace\n        };\n    }\n    function computeStackTraceFromOperaMultiLineMessage(ex) {\n        var lines = ex.message.split('\\n');\n        if (lines.length < 4) {\n            return null;\n        }\n        var lineRE1 = /^\\s*Line (\\d+) of linked script ((?:file|http|https)\\S+)(?:: in function (\\S+))?\\s*$/i, lineRE2 = /^\\s*Line (\\d+) of inline#(\\d+) script in ((?:file|http|https)\\S+)(?:: in function (\\S+))?\\s*$/i, lineRE3 = /^\\s*Line (\\d+) of function script\\s*$/i, stack = [], scripts = document.getElementsByTagName('script'), inlineScriptBlocks = [], parts, i, len, source;\n        for (i in scripts) {\n            if (has(scripts, i) && !scripts[i].src) {\n                inlineScriptBlocks.push(scripts[i]);\n            }\n        }\n        for (i = 2, len = lines.length; i < len; i += 2) {\n            var item = null;\n            if ((parts = lineRE1.exec(lines[i]))) {\n                item = {\n                    'url': parts[2],\n                    'func': parts[3],\n                    'line': +parts[1]\n                };\n            }\n            else if ((parts = lineRE2.exec(lines[i]))) {\n                item = {\n                    'url': parts[3],\n                    'func': parts[4]\n                };\n                var relativeLine = (+parts[1]);\n                var script = inlineScriptBlocks[parts[2] - 1];\n                if (script) {\n                    source = getSource(item.url);\n                    if (source) {\n                        source = source.join('\\n');\n                        var pos = source.indexOf(script.innerText);\n                        if (pos >= 0) {\n                            item.line = relativeLine + source.substring(0, pos).split('\\n').length;\n                        }\n                    }\n                }\n            }\n            else if ((parts = lineRE3.exec(lines[i]))) {\n                var url = window.location.href.replace(/#.*$/, ''), line = parts[1];\n                var re = new RegExp(escapeCodeAsRegExpForMatchingInsideHTML(lines[i + 1]));\n                source = findSourceInUrls(re, [url]);\n                item = {\n                    'url': url,\n                    'line': source ? source.line : line,\n                    'func': ''\n                };\n            }\n            if (item) {\n                if (!item.func) {\n                    item.func = guessFunctionName(item.url, item.line);\n                }\n                var context = gatherContext(item.url, item.line);\n                var midline = (context ? context[Math.floor(context.length / 2)] : null);\n                if (context && midline.replace(/^\\s*/, '') === lines[i + 1].replace(/^\\s*/, '')) {\n                    item.context = context;\n                }\n                else {\n                    item.context = [lines[i + 1]];\n                }\n                stack.push(item);\n            }\n        }\n        if (!stack.length) {\n            return null;\n        }\n        return {\n            'mode': 'multiline',\n            'name': ex.name,\n            'message': lines[0],\n            'url': document.location.href,\n            'stack': stack,\n            'useragent': navigator.userAgent\n        };\n    }\n    function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {\n        var initial = {\n            'url': url,\n            'line': lineNo,\n            'func': undefined,\n            'context': undefined,\n            'column': undefined\n        };\n        if (initial.url && initial.line) {\n            stackInfo.incomplete = false;\n            if (!initial.func) {\n                initial.func = guessFunctionName(initial.url, initial.line);\n            }\n            if (!initial.context) {\n                initial.context = gatherContext(initial.url, initial.line);\n            }\n            var reference = / '([^']+)' /.exec(message);\n            if (reference) {\n                initial.column = findSourceInLine(reference[1], initial.url, initial.line);\n            }\n            if (stackInfo.stack.length > 0) {\n                if (stackInfo.stack[0].url === initial.url) {\n                    if (stackInfo.stack[0].line === initial.line) {\n                        return false;\n                    }\n                    else if (!stackInfo.stack[0].line && stackInfo.stack[0].func === initial.func) {\n                        stackInfo.stack[0].line = initial.line;\n                        stackInfo.stack[0].context = initial.context;\n                        return false;\n                    }\n                }\n            }\n            stackInfo.stack.unshift(initial);\n            stackInfo.partial = true;\n            return true;\n        }\n        else {\n            stackInfo.incomplete = true;\n        }\n        return false;\n    }\n    function computeStackTraceByWalkingCallerChain(ex, depth) {\n        var functionName = /function\\s+([_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*)?\\s*\\(/i, stack = [], funcs = {}, recursion = false, parts, item, source;\n        for (var curr = computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {\n            if (curr === computeStackTrace || curr === TraceKit.report) {\n                continue;\n            }\n            item = {\n                'url': null,\n                'func': UNKNOWN_FUNCTION,\n                'line': null,\n                'column': null\n            };\n            if (curr.name) {\n                item.func = curr.name;\n            }\n            else if ((parts = functionName.exec(curr.toString()))) {\n                item.func = parts[1];\n            }\n            if (typeof item.func === 'undefined') {\n                try {\n                    item.func = parts.input.substring(0, parts.input.indexOf('{'));\n                }\n                catch (e) { }\n            }\n            if ((source = findSourceByFunctionBody(curr))) {\n                item.url = source.url;\n                item.line = source.line;\n                if (item.func === UNKNOWN_FUNCTION) {\n                    item.func = guessFunctionName(item.url, item.line);\n                }\n                var reference = / '([^']+)' /.exec(ex.message || ex.description);\n                if (reference) {\n                    item.column = findSourceInLine(reference[1], source.url, source.line);\n                }\n            }\n            if (funcs['' + curr]) {\n                recursion = true;\n            }\n            else {\n                funcs['' + curr] = true;\n            }\n            stack.push(item);\n        }\n        if (depth) {\n            stack.splice(0, depth);\n        }\n        var result = {\n            'mode': 'callers',\n            'name': ex.name,\n            'message': ex.message,\n            'url': document.location.href,\n            'stack': stack,\n            'useragent': navigator.userAgent\n        };\n        augmentStackTraceWithInitialElement(result, ex.sourceURL || ex.fileName, ex.line || ex.lineNumber, ex.message || ex.description);\n        return result;\n    }\n    var computeStackTrace = function (ex, depth) {\n        var stack = null;\n        depth = (depth == null ? 0 : +depth);\n        try {\n            stack = computeStackTraceFromStacktraceProp(ex);\n            if (stack) {\n                return stack;\n            }\n        }\n        catch (e) {\n            if (debug) {\n                throw e;\n            }\n        }\n        try {\n            stack = computeStackTraceFromStackProp(ex);\n            if (stack) {\n                return stack;\n            }\n        }\n        catch (e) {\n            if (debug) {\n                throw e;\n            }\n        }\n        try {\n            stack = computeStackTraceFromOperaMultiLineMessage(ex);\n            if (stack) {\n                return stack;\n            }\n        }\n        catch (e) {\n            if (debug) {\n                throw e;\n            }\n        }\n        try {\n            stack = computeStackTraceByWalkingCallerChain(ex, depth + 1);\n            if (stack) {\n                return stack;\n            }\n        }\n        catch (e) {\n            if (debug) {\n                throw e;\n            }\n        }\n        return;\n    };\n    function computeStackTraceOfCaller(depth) {\n        depth = (depth == null ? 0 : +depth) + 1;\n        try {\n            throw new Error();\n        }\n        catch (ex) {\n            return computeStackTrace(ex, depth + 1);\n        }\n    }\n    computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;\n    computeStackTrace.guessFunctionName = guessFunctionName;\n    computeStackTrace.gatherContext = gatherContext;\n    computeStackTrace.ofCaller = computeStackTraceOfCaller;\n    return computeStackTrace;\n}());\nTraceKit.extendToAsynchronousCallbacks = function () {\n    var _helper = function _helper(fnName) {\n        var originalFn = window[fnName];\n        window[fnName] = function traceKitAsyncExtension() {\n            var args = _slice.call(arguments);\n            var originalCallback = args[0];\n            if (typeof (originalCallback) === 'function') {\n                args[0] = TraceKit.wrap(originalCallback);\n            }\n            if (originalFn.apply) {\n                return originalFn.apply(this, args);\n            }\n            else {\n                return originalFn(args[0], args[1]);\n            }\n        };\n    };\n    _helper('setTimeout');\n    _helper('setInterval');\n};\n\n\n\n//# sourceURL=webpack:///./src/cr/tracekit.ts?");

/***/ }),

/***/ "./src/utils/storage/cookie.ts":
/*!*************************************!*\
  !*** ./src/utils/storage/cookie.ts ***!
  \*************************************/
/*! exports provided: CookieStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CookieStorage\", function() { return CookieStorage; });\nvar CookieStorage = (function () {\n    function CookieStorage() {\n    }\n    CookieStorage.prototype.updateConfig = function (config) {\n        this.config = config;\n    };\n    CookieStorage.prototype.set = function (name, value, hours) {\n        var expires;\n        if (!!hours) {\n            var date = new Date();\n            date.setTime(date.getTime() + hours * 60 * 60 * 1000);\n            expires = \"; expires=\" + date.toUTCString();\n        }\n        else {\n            expires = '';\n        }\n        var secure = this.config.secureCookie ? '; secure' : '';\n        document.cookie = name + \"=\" + value + expires + \"; path=/\" + secure;\n    };\n    CookieStorage.prototype.read = function (name) {\n        var nameEQ = name + \"=\";\n        var ca = document.cookie.split(';');\n        for (var i = 0; i < ca.length; i++) {\n            var c = ca[i];\n            while (c.charAt(0) === ' ') {\n                c = c.substring(1, c.length);\n            }\n            if (c.indexOf(nameEQ) === 0) {\n                return c.substring(nameEQ.length, c.length);\n            }\n        }\n        return null;\n    };\n    CookieStorage.prototype.clear = function (name) {\n        this.set(name, \"\", -1);\n    };\n    return CookieStorage;\n}());\n\n\n\n//# sourceURL=webpack:///./src/utils/storage/cookie.ts?");

/***/ }),

/***/ "./src/utils/storage/index.ts":
/*!************************************!*\
  !*** ./src/utils/storage/index.ts ***!
  \************************************/
/*! exports provided: CookieStorage, LocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie */ \"./src/utils/storage/cookie.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CookieStorage\", function() { return _cookie__WEBPACK_IMPORTED_MODULE_0__[\"CookieStorage\"]; });\n\n/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ \"./src/utils/storage/localStorage.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"LocalStorage\", function() { return _localStorage__WEBPACK_IMPORTED_MODULE_1__[\"LocalStorage\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///./src/utils/storage/index.ts?");

/***/ }),

/***/ "./src/utils/storage/localStorage.ts":
/*!*******************************************!*\
  !*** ./src/utils/storage/localStorage.ts ***!
  \*******************************************/
/*! exports provided: LocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LocalStorage\", function() { return LocalStorage; });\n/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../time */ \"./src/utils/time.ts\");\n\nvar LocalStorage = (function () {\n    function LocalStorage() {\n    }\n    LocalStorage.prototype.updateConfig = function (config) {\n        this.config = config;\n    };\n    LocalStorage.prototype.set = function (name, value, hours) {\n        var expiryTimestamp = !hours ? null : Object(_time__WEBPACK_IMPORTED_MODULE_0__[\"timestamp\"])(hours);\n        try {\n            var item = { expiryTimestamp: expiryTimestamp, data: value };\n            var itemStringified = JSON.stringify(item);\n            localStorage.setItem(name, itemStringified);\n        }\n        catch (e) {\n        }\n    };\n    LocalStorage.prototype.read = function (name) {\n        var item = null;\n        try {\n            var val = localStorage.getItem(name);\n            if (!!val) {\n                item = JSON.parse(val);\n            }\n        }\n        catch (e) {\n        }\n        if (!item || item && item.expiryTimestamp && Object(_time__WEBPACK_IMPORTED_MODULE_0__[\"timestamp\"])(0) > item.expiryTimestamp) {\n            localStorage.removeItem(name);\n            return null;\n        }\n        return item.data;\n    };\n    LocalStorage.prototype.clear = function (name) {\n        localStorage.removeItem(name);\n    };\n    return LocalStorage;\n}());\n\n\n\n//# sourceURL=webpack:///./src/utils/storage/localStorage.ts?");

/***/ }),

/***/ "./src/utils/time.ts":
/*!***************************!*\
  !*** ./src/utils/time.ts ***!
  \***************************/
/*! exports provided: timestamp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"timestamp\", function() { return timestamp; });\nfunction timestamp(hours) {\n    return Date.now() + hours * 60 * 1000;\n}\n\n\n//# sourceURL=webpack:///./src/utils/time.ts?");

/***/ }),

/***/ "./src/utils/transport/index.ts":
/*!**************************************!*\
  !*** ./src/utils/transport/index.ts ***!
  \**************************************/
/*! exports provided: REQUEST_TIMEOUT, shouldRetryBasedOnStatus, finishTransport, failTransport, sendXHRRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transport */ \"./src/utils/transport/transport.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"REQUEST_TIMEOUT\", function() { return _transport__WEBPACK_IMPORTED_MODULE_0__[\"REQUEST_TIMEOUT\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"shouldRetryBasedOnStatus\", function() { return _transport__WEBPACK_IMPORTED_MODULE_0__[\"shouldRetryBasedOnStatus\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"finishTransport\", function() { return _transport__WEBPACK_IMPORTED_MODULE_0__[\"finishTransport\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"failTransport\", function() { return _transport__WEBPACK_IMPORTED_MODULE_0__[\"failTransport\"]; });\n\n/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xhr */ \"./src/utils/transport/xhr.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"sendXHRRequest\", function() { return _xhr__WEBPACK_IMPORTED_MODULE_1__[\"sendXHRRequest\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///./src/utils/transport/index.ts?");

/***/ }),

/***/ "./src/utils/transport/transport.ts":
/*!******************************************!*\
  !*** ./src/utils/transport/transport.ts ***!
  \******************************************/
/*! exports provided: REQUEST_TIMEOUT, shouldRetryBasedOnStatus, finishTransport, failTransport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REQUEST_TIMEOUT\", function() { return REQUEST_TIMEOUT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"shouldRetryBasedOnStatus\", function() { return shouldRetryBasedOnStatus; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"finishTransport\", function() { return finishTransport; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"failTransport\", function() { return failTransport; });\nvar REQUEST_TIMEOUT = 10000;\nfunction shouldRetryBasedOnStatus(status) {\n    return status !== 403 && status !== 400 && status !== 429;\n}\nfunction finishTransport(options, status) {\n    if (status === 202) {\n        options.onSuccess();\n    }\n    else {\n        options.onFail(shouldRetryBasedOnStatus(status));\n    }\n}\nfunction failTransport(options) {\n    options.onFail(true);\n}\n\n\n//# sourceURL=webpack:///./src/utils/transport/transport.ts?");

/***/ }),

/***/ "./src/utils/transport/xhr.ts":
/*!************************************!*\
  !*** ./src/utils/transport/xhr.ts ***!
  \************************************/
/*! exports provided: sendXHRRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sendXHRRequest\", function() { return sendXHRRequest; });\n/* harmony import */ var _transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transport */ \"./src/utils/transport/transport.ts\");\n\nvar sendXHRRequest = function (options) {\n    var xhr = new XMLHttpRequest();\n    xhr.open(options.method, options.url, true);\n    xhr.timeout = _transport__WEBPACK_IMPORTED_MODULE_0__[\"REQUEST_TIMEOUT\"];\n    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');\n    xhr.onreadystatechange = function () {\n        if (xhr.readyState !== 4) {\n            return;\n        }\n        Object(_transport__WEBPACK_IMPORTED_MODULE_0__[\"finishTransport\"])(options, xhr.status);\n    };\n    xhr.onerror = function () {\n        Object(_transport__WEBPACK_IMPORTED_MODULE_0__[\"failTransport\"])(options);\n    };\n    xhr.ontimeout = function () {\n        Object(_transport__WEBPACK_IMPORTED_MODULE_0__[\"failTransport\"])(options);\n    };\n    xhr.send(JSON.stringify(options.data));\n};\n\n\n//# sourceURL=webpack:///./src/utils/transport/xhr.ts?");

/***/ }),

/***/ "./src/utils/url.ts":
/*!**************************!*\
  !*** ./src/utils/url.ts ***!
  \**************************/
/*! exports provided: getQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getQuery\", function() { return getQuery; });\nfunction getQuery() {\n    var location = window.location.toString();\n    var query = (location.split('?')[1] || '').split('#')[0];\n    var qs = {};\n    if (query.length > 0) {\n        query.split('&').forEach(function (segment, i) {\n            var parts = segment.split('=');\n            if (parts && parts.length === 2) {\n                var key = decodeURIComponent(parts[0]);\n                qs[key] = parts[1];\n            }\n        });\n    }\n    return qs;\n}\n\n\n//# sourceURL=webpack:///./src/utils/url.ts?");

/***/ })

/******/ });