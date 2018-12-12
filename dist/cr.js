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
/*! exports provided: RaygunCrashReporting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RaygunCrashReporting", function() { return RaygunCrashReporting; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core/index.ts");
/* harmony import */ var _cr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cr */ "./src/cr/index.ts");


var RaygunCrashReporting = (function () {
    function RaygunCrashReporting() {
        this.core = new _core__WEBPACK_IMPORTED_MODULE_0__["Core"]();
    }
    RaygunCrashReporting.prototype.boot = function (userConfig) {
        this.core.init(userConfig);
        this.cr = new _cr__WEBPACK_IMPORTED_MODULE_1__["CR"](this.core);
        return this;
    };
    RaygunCrashReporting.prototype.setUser = function (user) {
        this.core.user.setUser(user);
        return this;
    };
    RaygunCrashReporting.prototype.withTags = function (tags) {
        this.core.tags.setTags(tags);
        return this;
    };
    RaygunCrashReporting.prototype.send = function (error, customData, tags) {
        if (customData === void 0) { customData = {}; }
        if (tags === void 0) { tags = []; }
        this.cr.send(error, customData, tags);
    };
    RaygunCrashReporting.noConflict = function () {
        return new RaygunCrashReporting();
    };
    return RaygunCrashReporting;
}());

window.Raygun = new RaygunCrashReporting();


/***/ }),

/***/ "./src/core/config.ts":
/*!****************************!*\
  !*** ./src/core/config.ts ***!
  \****************************/
/*! exports provided: assignDefaultConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignDefaultConfig", function() { return assignDefaultConfig; });
var __assign = (undefined && undefined.__assign) || function () {
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
function assignDefaultConfig(userConfig) {
    return __assign({ realUserMonitoring: false, crashReporting: false, secureCookie: true, saveOfflineErrors: false, asyncErrorHandler: false, ignore3rdPartyErrors: false, excludedHostnames: [], excludedUserAgents: [], apiUrl: "https://api.raygun.io" }, userConfig);
}


/***/ }),

/***/ "./src/core/core.ts":
/*!**************************!*\
  !*** ./src/core/core.ts ***!
  \**************************/
/*! exports provided: Core */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Core", function() { return Core; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/core/config.ts");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ "./src/core/user.ts");
/* harmony import */ var _tags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tags */ "./src/core/tags.ts");



var Core = (function () {
    function Core() {
    }
    Core.prototype.init = function (userConfig) {
        this.config = Object(_config__WEBPACK_IMPORTED_MODULE_0__["assignDefaultConfig"])(userConfig);
        this.user = new _user__WEBPACK_IMPORTED_MODULE_1__["User"](this.config);
        this.tags = new _tags__WEBPACK_IMPORTED_MODULE_2__["Tags"]();
    };
    return Core;
}());



/***/ }),

/***/ "./src/core/index.ts":
/*!***************************!*\
  !*** ./src/core/index.ts ***!
  \***************************/
/*! exports provided: assignDefaultConfig, Tags, convertToPayload, User, Core */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/core/config.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assignDefaultConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["assignDefaultConfig"]; });

/* harmony import */ var _tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tags */ "./src/core/tags.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tags", function() { return _tags__WEBPACK_IMPORTED_MODULE_1__["Tags"]; });

/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user */ "./src/core/user.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "convertToPayload", function() { return _user__WEBPACK_IMPORTED_MODULE_2__["convertToPayload"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _user__WEBPACK_IMPORTED_MODULE_2__["User"]; });

/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core */ "./src/core/core.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Core", function() { return _core__WEBPACK_IMPORTED_MODULE_3__["Core"]; });







/***/ }),

/***/ "./src/core/tags.ts":
/*!**************************!*\
  !*** ./src/core/tags.ts ***!
  \**************************/
/*! exports provided: Tags */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tags", function() { return Tags; });
var Tags = (function () {
    function Tags() {
    }
    Tags.prototype.setTags = function (tags) {
        this.tags = tags;
    };
    Tags.prototype.getTags = function () {
        return this.tags.slice();
    };
    return Tags;
}());



/***/ }),

/***/ "./src/core/user.ts":
/*!**************************!*\
  !*** ./src/core/user.ts ***!
  \**************************/
/*! exports provided: convertToPayload, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToPayload", function() { return convertToPayload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage */ "./src/utils/storage/index.ts");
var __assign = (undefined && undefined.__assign) || function () {
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

function convertToPayload(user) {
    var payload = {
        Identifier: user.identifier,
        IsAnonymous: user.isAnonymous,
    };
    if (!!user.email) {
        payload.Email = user.email;
    }
    if (!!user.email) {
        payload.FullName = user.fullName;
    }
    if (!!user.email) {
        payload.FirstName = user.firstName;
    }
    if (!!user.email) {
        payload.UUID = user.uuid;
    }
    return payload;
}
var USER_KEY = "raygun4js-userid";
var USER_COOKIE_TIMEOUT = 24 * 31;
var User = (function () {
    function User(config, storage) {
        if (storage === void 0) { storage = new _utils_storage__WEBPACK_IMPORTED_MODULE_0__["CookieStorage"](); }
        this.config = config;
        this.storage = storage;
        this.storage.updateConfig(this.config);
        this.setUserFromStorage();
    }
    User.prototype.setUserFromStorage = function () {
        var identifier = this.storage.read(USER_KEY);
        if (identifier) {
            this.user = {
                identifier: identifier
            };
        }
    };
    User.prototype.setUser = function (user) {
        this.user = convertToPayload(user);
        this.storage.set(USER_KEY, this.user.Identifier, USER_COOKIE_TIMEOUT);
    };
    User.prototype.getUser = function () {
        return __assign({}, this.user);
    };
    return User;
}());



/***/ }),

/***/ "./src/cr/cr.ts":
/*!**********************!*\
  !*** ./src/cr/cr.ts ***!
  \**********************/
/*! exports provided: CR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CR", function() { return CR; });
/* harmony import */ var _utils_transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/transport */ "./src/utils/transport/index.ts");
/* harmony import */ var _errorQueue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errorQueue */ "./src/cr/errorQueue.ts");
/* harmony import */ var _discardError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./discardError */ "./src/cr/discardError.ts");
/* harmony import */ var _payload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payload */ "./src/cr/payload.ts");
/* harmony import */ var _tracekit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tracekit */ "./src/cr/tracekit.ts");





var CR = (function () {
    function CR(core, transport) {
        if (transport === void 0) { transport = _utils_transport__WEBPACK_IMPORTED_MODULE_0__["sendXHRRequest"]; }
        this.sending = false;
        this.core = core;
        this.transport = transport;
        this.errorQueue = new _errorQueue__WEBPACK_IMPORTED_MODULE_1__["ErrorQueue"](this.core.config);
        this.processException = this.processException.bind(this);
        this.attach();
    }
    CR.prototype.attach = function () {
        _tracekit__WEBPACK_IMPORTED_MODULE_4__["TraceKit"].report.subscribe(this.processException);
        if (this.core.config.asyncErrorHandler) {
            _tracekit__WEBPACK_IMPORTED_MODULE_4__["TraceKit"].extendToAsynchronousCallbacks();
        }
    };
    CR.prototype.detach = function () {
        _tracekit__WEBPACK_IMPORTED_MODULE_4__["TraceKit"].report.unsubscribe(this.processException);
    };
    CR.prototype.send = function (ex, customData, tags) {
        if (!this.core.config.crashReporting) {
            return;
        }
        var exception = _tracekit__WEBPACK_IMPORTED_MODULE_4__["TraceKit"].computeStackTrace(ex);
        this.processException(exception, customData, tags);
    };
    CR.prototype.processException = function (ex, customData, tags) {
        if (customData === void 0) { customData = {}; }
        if (tags === void 0) { tags = []; }
        if (Object(_discardError__WEBPACK_IMPORTED_MODULE_2__["discardError"])(this.core, ex)) {
            return;
        }
        var payload = Object(_payload__WEBPACK_IMPORTED_MODULE_3__["createPayload"])(this.core, ex, customData, tags);
        this.errorQueue.add({
            url: this.url,
            apiKey: this.core.config.apiKey,
            payload: payload,
        });
        this.postNextError();
    };
    Object.defineProperty(CR.prototype, "url", {
        get: function () {
            return this.core.config.apiUrl + "/entries?apikey=" + encodeURIComponent(this.core.config.apiKey);
        },
        enumerable: true,
        configurable: true
    });
    CR.prototype.postNextError = function () {
        var _this = this;
        if (this.sending) {
            return;
        }
        this.sending = true;
        var error = this.errorQueue.removeAndGetFirstItem();
        if (!error) {
            this.sending = false;
            return;
        }
        this.transport({
            method: 'post',
            url: error.url,
            data: error.payload,
            onSuccess: function () {
                _this.sending = false;
                _this.postNextError();
            },
            onFail: function (retry) {
                if (retry) {
                    _this.errorQueue.add(error, true);
                }
                _this.sending = false;
            }
        });
    };
    return CR;
}());



/***/ }),

/***/ "./src/cr/discardError.ts":
/*!********************************!*\
  !*** ./src/cr/discardError.ts ***!
  \********************************/
/*! exports provided: discardError, discardAsThirdPartyError, discardAsAnExcludedHostname, discardAsAnExcludedUserAgent, discardAsTheInsightsCrawler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "discardError", function() { return discardError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "discardAsThirdPartyError", function() { return discardAsThirdPartyError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "discardAsAnExcludedHostname", function() { return discardAsAnExcludedHostname; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "discardAsAnExcludedUserAgent", function() { return discardAsAnExcludedUserAgent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "discardAsTheInsightsCrawler", function() { return discardAsTheInsightsCrawler; });
function discardError(core, exception) {
    return checks.every(function (discard) { return discard(core.config, exception); });
}
var discardAsThirdPartyError = function (config, exception) {
    if (!config.ignore3rdPartyErrors) {
        return false;
    }
    return false;
};
var discardAsAnExcludedHostname = function (config, exception) {
    return false;
};
var discardAsAnExcludedUserAgent = function (config, exception) {
    return false;
};
var discardAsTheInsightsCrawler = function () {
    return navigator.userAgent.indexOf('RaygunPulseInsightsCrawler') > -1;
};
var checks = [
    discardAsThirdPartyError,
    discardAsAnExcludedHostname,
    discardAsAnExcludedUserAgent,
    discardAsTheInsightsCrawler,
];


/***/ }),

/***/ "./src/cr/errorQueue.ts":
/*!******************************!*\
  !*** ./src/cr/errorQueue.ts ***!
  \******************************/
/*! exports provided: ErrorQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorQueue", function() { return ErrorQueue; });
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage */ "./src/utils/storage/index.ts");

var ERROR_STORAGE_KEY = "raygun4js-errors";
var ErrorQueue = (function () {
    function ErrorQueue(config, storage) {
        if (storage === void 0) { storage = new _utils_storage__WEBPACK_IMPORTED_MODULE_0__["LocalStorage"](); }
        this.errorQueue = [];
        this.storage = storage;
        this.config = config;
        this.setQueueFromStorage();
    }
    ErrorQueue.prototype.setQueueFromStorage = function () {
        var _this = this;
        if (!this.config.saveOfflineErrors) {
            return;
        }
        var errors = this.storage.read(ERROR_STORAGE_KEY);
        if (errors) {
            this.errorQueue = errors.filter(function (e) { return e.apiKey === _this.config.apiKey; });
        }
    };
    ErrorQueue.prototype.saveQueueToStorage = function () {
        if (!this.config.saveOfflineErrors) {
            return;
        }
        this.storage.set(ERROR_STORAGE_KEY, this.errorQueue);
    };
    ErrorQueue.prototype.add = function (error, addToStart) {
        if (addToStart) {
            this.errorQueue.unshift(error);
        }
        else {
            this.errorQueue.push(error);
        }
        this.saveQueueToStorage();
    };
    ErrorQueue.prototype.length = function () {
        return this.errorQueue.length;
    };
    ErrorQueue.prototype.removeAndGetFirstItem = function () {
        var error = this.errorQueue.shift();
        if (error) {
            this.saveQueueToStorage();
            return error;
        }
        return null;
    };
    return ErrorQueue;
}());



/***/ }),

/***/ "./src/cr/index.ts":
/*!*************************!*\
  !*** ./src/cr/index.ts ***!
  \*************************/
/*! exports provided: CR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cr */ "./src/cr/cr.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CR", function() { return _cr__WEBPACK_IMPORTED_MODULE_0__["CR"]; });




/***/ }),

/***/ "./src/cr/payload.ts":
/*!***************************!*\
  !*** ./src/cr/payload.ts ***!
  \***************************/
/*! exports provided: createPayload, createStackTrace, createMessage, createError, createCustomData, createRequest, createEnvironment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPayload", function() { return createPayload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStackTrace", function() { return createStackTrace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMessage", function() { return createMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createError", function() { return createError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCustomData", function() { return createCustomData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRequest", function() { return createRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEnvironment", function() { return createEnvironment; });
/* harmony import */ var _utils_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/url */ "./src/utils/url.ts");

var CLIENT_NAME = 'raygun-js';
var CLIENT_VERSION = 'test';
function createPayload(core, exception, customData, tags) {
    var payload = {
        OccurredOn: new Date(),
        Details: {
            Error: createError(exception),
            Environment: createEnvironment(),
            User: core.user.getUser(),
            Client: {
                Name: CLIENT_NAME,
                Version: CLIENT_VERSION,
            },
            UserCustomData: createCustomData(customData),
            Tags: core.tags.getTags().concat(tags),
            Request: createRequest(),
            Version: 'Not supplied',
        }
    };
    return payload;
}
function createStackTrace(stack) {
    if (!stack || !stack.length) {
        return [];
    }
    return stack.map(function (frame) { return ({
        LineNumber: frame.line,
        ColumnNumber: frame.column,
        ClassName: "line " + frame.line + ", column " + frame.column,
        FileName: frame.url,
        MethodName: frame.func || '[anonymous]'
    }); });
}
function createMessage(exception) {
    if (exception.message) {
        return exception.message;
    }
    return "Script error";
}
function createError(exception) {
    return {
        ClassName: exception.name,
        Message: createMessage(exception).substring(0, 512),
        StackTrace: createStackTrace(exception.stack),
        StackString: exception.stackString
    };
}
function createCustomData(customData) {
    try {
        JSON.stringify(customData);
    }
    catch (e) {
        return {
            error: 'Cannot add custom data; may contain circular reference',
        };
    }
    return customData;
}
function createRequest() {
    return {
        Url: window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash,
        QueryString: Object(_utils_url__WEBPACK_IMPORTED_MODULE_0__["getQuery"])(),
        Headers: {
            'User-Agent': navigator.userAgent,
            Referer: document.referrer,
            Host: document.domain
        },
    };
}
function createEnvironment() {
    return {
        UtcOffset: new Date().getTimezoneOffset() / -60.0,
        'User-Language': window.navigator.userLanguage,
        'Document-Mode': document.documentMode,
        'Browser-Width': window.innerWidth || document.documentElement.clientWidth,
        'Browser-Height': window.innerHeight || document.documentElement.clientHeight,
        'Screen-Width': screen ? window.screen.width : document.documentElement.clientWidth,
        'Screen-Height': screen ? window.screen.height : document.documentElement.clientHeight,
        'Color-Depth': screen ? window.screen.colorDepth : 8,
        Browser: navigator.appCodeName,
        'Browser-Name': navigator.appName,
        'Browser-Version': navigator.appVersion,
        Platform: navigator.platform,
    };
}


/***/ }),

/***/ "./src/cr/tracekit.ts":
/*!****************************!*\
  !*** ./src/cr/tracekit.ts ***!
  \****************************/
/*! exports provided: TraceKit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TraceKit", function() { return TraceKit; });
;
;
var TraceKit = {
    wrap: function () { return null; },
    report: null,
    computeStackTrace: null,
    extendToAsynchronousCallbacks: function () { return null; },
    remoteFetching: false,
    collectWindowErrors: true,
    linesOfContext: 11
};
var _slice = [].slice;
var UNKNOWN_FUNCTION = '?';
function has(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
}
function isUndefined(what) {
    return typeof what === 'undefined';
}
TraceKit.wrap = function traceKitWrapper(func) {
    function wrapped() {
        try {
            return func.apply(this, arguments);
        }
        catch (e) {
            TraceKit.report(e);
            throw e;
        }
    }
    return wrapped;
};
TraceKit.report = (function reportModuleWrapper() {
    var handlers = [], lastException = null, lastExceptionStack = null;
    function subscribe(handler) {
        installGlobalHandler();
        handlers.push(handler);
    }
    function unsubscribe(handler) {
        for (var i = handlers.length - 1; i >= 0; --i) {
            if (handlers[i] === handler) {
                handlers.splice(i, 1);
            }
        }
    }
    function notifyHandlers(stack, windowError) {
        var exception = null;
        if (windowError && !TraceKit.collectWindowErrors) {
            return;
        }
        for (var i in handlers) {
            if (has(handlers, i)) {
                try {
                    handlers[i].apply(null, [stack].concat(_slice.call(arguments, 2)));
                }
                catch (inner) {
                    exception = inner;
                }
            }
        }
        if (exception) {
            throw exception;
        }
    }
    var _oldOnerrorHandler, _onErrorHandlerInstalled;
    function traceKitWindowOnError(message, url, lineNo, columnNo, errorObj) {
        var stack = null;
        if (errorObj) {
            stack = TraceKit.computeStackTrace(errorObj);
        }
        else {
            if (lastExceptionStack) {
                TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(lastExceptionStack, url, lineNo, message);
                stack = lastExceptionStack;
                lastExceptionStack = null;
                lastException = null;
            }
            else {
                var location_1 = {
                    'url': url,
                    'line': lineNo,
                    'column': columnNo,
                    'func': TraceKit.computeStackTrace.guessFunctionName(url, lineNo),
                    'context': TraceKit.computeStackTrace.gatherContext(url, lineNo),
                };
                stack = {
                    'mode': 'onerror',
                    'message': message,
                    'url': document.location.href,
                    'stack': [location_1],
                    'useragent': navigator.userAgent
                };
            }
        }
        notifyHandlers(stack, 'from window.onerror');
        if (_oldOnerrorHandler) {
            return _oldOnerrorHandler.apply(this, arguments);
        }
        return false;
    }
    function installGlobalHandler() {
        if (_onErrorHandlerInstalled === true) {
            return;
        }
        _oldOnerrorHandler = window.onerror;
        window.onerror = traceKitWindowOnError;
        _onErrorHandlerInstalled = true;
    }
    var report = function (ex) {
        var args;
        if (typeof document !== 'undefined') {
            args = _slice.call(arguments, 1);
        }
        if (lastExceptionStack) {
            if (lastException === ex) {
                return;
            }
            else {
                var s = lastExceptionStack;
                lastExceptionStack = null;
                lastException = null;
                notifyHandlers.apply(null, [s, null].concat(args));
            }
        }
        var stack = TraceKit.computeStackTrace(ex);
        lastExceptionStack = stack;
        lastException = ex;
        window.setTimeout(function () {
            if (lastException === ex) {
                lastExceptionStack = null;
                lastException = null;
                notifyHandlers.apply(null, [stack, null].concat(args));
            }
        }, (stack.incomplete ? 2000 : 0));
        throw ex;
    };
    report.subscribe = subscribe;
    report.unsubscribe = unsubscribe;
    return report;
}());
TraceKit.computeStackTrace = (function computeStackTraceWrapper() {
    var debug = false, sourceCache = {};
    function loadSource(url) {
        if (typeof url !== 'string') {
            return [];
        }
        return '';
    }
    function getSource(url) {
        if (!has(sourceCache, url)) {
            var source = '';
            url = url || "";
            var domain;
            if (typeof document !== 'undefined') {
                domain = document.domain;
            }
            else {
                domain = window.location.hostname;
            }
            if (url.indexOf && url.indexOf(domain) !== -1) {
                source = loadSource(url);
            }
            sourceCache[url] = source ? source.split('\n') : [];
        }
        return sourceCache[url];
    }
    function guessFunctionName(url, lineNo) {
        var reFunctionArgNames = /function ([^(]*)\(([^)]*)\)/, reGuessFunction = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/, line = '', maxLines = 10, source = getSource(url), m;
        if (!source.length) {
            return UNKNOWN_FUNCTION;
        }
        for (var i = 0; i < maxLines; ++i) {
            line = source[lineNo - i] + line;
            if (!isUndefined(line)) {
                if ((m = reGuessFunction.exec(line))) {
                    return m[1];
                }
                else if ((m = reFunctionArgNames.exec(line))) {
                    return m[1];
                }
            }
        }
        return UNKNOWN_FUNCTION;
    }
    function gatherContext(url, line) {
        var source = getSource(url);
        if (!source.length) {
            return null;
        }
        var context = [], linesBefore = Math.floor(TraceKit.linesOfContext / 2), linesAfter = linesBefore + (TraceKit.linesOfContext % 2), start = Math.max(0, line - linesBefore - 1), end = Math.min(source.length, line + linesAfter - 1);
        line -= 1;
        for (var i = start; i < end; ++i) {
            if (!isUndefined(source[i])) {
                context.push(source[i]);
            }
        }
        return context.length > 0 ? context : null;
    }
    function escapeRegExp(text) {
        return text.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, '\\$&');
    }
    function escapeCodeAsRegExpForMatchingInsideHTML(body) {
        return escapeRegExp(body).replace('<', '(?:<|&lt;)').replace('>', '(?:>|&gt;)').replace('&', '(?:&|&amp;)').replace('"', '(?:"|&quot;)').replace(/\s+/g, '\\s+');
    }
    function findSourceInUrls(re, urls) {
        var source, m;
        for (var i = 0, j = urls.length; i < j; ++i) {
            if ((source = getSource(urls[i])).length) {
                source = source.join('\n');
                if ((m = re.exec(source))) {
                    return {
                        'url': urls[i],
                        'line': source.substring(0, m.index).split('\n').length,
                        'column': m.index - source.lastIndexOf('\n', m.index) - 1
                    };
                }
            }
        }
        return null;
    }
    function findSourceInLine(fragment, url, line) {
        var source = getSource(url), re = new RegExp('\\b' + escapeRegExp(fragment) + '\\b'), m;
        line -= 1;
        if (source && source.length > line && (m = re.exec(source[line]))) {
            return m.index;
        }
        return null;
    }
    function findSourceByFunctionBody(func) {
        var urls = [window.location.href], scripts = document.getElementsByTagName('script'), body, code = '' + func, codeRE = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, eventRE = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, re, parts, result;
        for (var i = 0; i < scripts.length; ++i) {
            var script = scripts[i];
            if (script.src) {
                urls.push(script.src);
            }
        }
        if (!(parts = codeRE.exec(code))) {
            re = new RegExp(escapeRegExp(code).replace(/\s+/g, '\\s+'));
        }
        else {
            var name = parts[1] ? '\\s+' + parts[1] : '', args = parts[2].split(',').join('\\s*,\\s*');
            body = escapeRegExp(parts[3]).replace(/;$/, ';?');
            re = new RegExp('function' + name + '\\s*\\(\\s*' + args + '\\s*\\)\\s*{\\s*' + body + '\\s*}');
        }
        if ((result = findSourceInUrls(re, urls))) {
            return result;
        }
        if ((parts = eventRE.exec(code))) {
            var event = parts[1];
            body = escapeCodeAsRegExpForMatchingInsideHTML(parts[2]);
            re = new RegExp('on' + event + '=[\\\'"]\\s*' + body + '\\s*[\\\'"]', 'i');
            if ((result = findSourceInUrls(re, urls[0]))) {
                return result;
            }
            re = new RegExp(body);
            if ((result = findSourceInUrls(re, urls))) {
                return result;
            }
        }
        return null;
    }
    function computeStackTraceFromStackProp(ex) {
        var parseError;
        if (!ex.stack) {
            return null;
        }
        var chrome = /^\s*at (.*?) ?\(((?:file|https?|\s*|blob|chrome-extension|native|webpack|eval|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, lines = ex.stack.split('\n'), stack = [], parts, element, reference = /^(.*) is undefined$/.exec(ex.message);
        for (var i = 0, j = lines.length; i < j; ++i) {
            if ((parts = gecko.exec(lines[i]))) {
                element = {
                    'url': parts[3],
                    'func': parts[1] || UNKNOWN_FUNCTION,
                    'args': parts[2] ? parts[2].split(',') : '',
                    'line': +parts[4],
                    'column': parts[5] ? +parts[5] : null
                };
            }
            else if ((parts = chrome.exec(lines[i]))) {
                element = {
                    'url': parts[2],
                    'func': parts[1] || UNKNOWN_FUNCTION,
                    'line': +parts[3],
                    'column': parts[4] ? +parts[4] : null
                };
            }
            else if ((parts = winjs.exec(lines[i]))) {
                element = {
                    'url': parts[2],
                    'func': parts[1] || UNKNOWN_FUNCTION,
                    'line': +parts[3],
                    'column': parts[4] ? +parts[4] : null
                };
            }
            else {
                continue;
            }
            if (!element.func && element.line) {
                element.func = guessFunctionName(element.url, element.line);
            }
            if (typeof document !== 'undefined' && element.line) {
                element.context = gatherContext(element.url, element.line);
            }
            stack.push(element);
        }
        if (stack[0] && stack[0].line && !stack[0].column && reference) {
            stack[0].column = findSourceInLine(reference[1], stack[0].url, stack[0].line);
        }
        else if (!stack[0].column && typeof ex.columnNumber !== 'undefined') {
            stack[0].column = ex.columnNumber + 1;
        }
        if (!stack.length) {
            return null;
        }
        var res = {
            'mode': 'stack',
            'name': ex ? ex.name : '',
            'message': ex ? ex.message : '',
            'url': typeof document !== 'undefined' ? document.location.href : '',
            'stack': stack,
            'useragent': navigator ? navigator.userAgent : '',
            'stackstring': ex && ex.stack ? ex.stack.toString() : ''
        };
        return res;
    }
    function computeStackTraceFromStacktraceProp(ex) {
        var stacktrace = ex.stacktrace;
        var testRE = / line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i, lines = stacktrace ? stacktrace.split('\n') : [], stack = [], parts;
        for (var i = 0, j = lines.length; i < j; i += 2) {
            if ((parts = testRE.exec(lines[i]))) {
                var element = {
                    'line': +parts[1],
                    'column': +parts[2],
                    'func': parts[3] || parts[4],
                    'args': parts[5] ? parts[5].split(',') : [],
                    'url': parts[6]
                };
                if (!element.func && element.line) {
                    element.func = guessFunctionName(element.url, element.line);
                }
                if (element.line) {
                    try {
                        element.context = gatherContext(element.url, element.line);
                    }
                    catch (exc) { }
                }
                if (!element.context) {
                    element.context = [lines[i + 1]];
                }
                stack.push(element);
            }
        }
        if (!stack.length) {
            return null;
        }
        return {
            'mode': 'stacktrace',
            'name': ex.name,
            'message': ex.message,
            'url': document.location.href,
            'stack': stack,
            'useragent': navigator.userAgent,
            'stackstring': stacktrace
        };
    }
    function computeStackTraceFromOperaMultiLineMessage(ex) {
        var lines = ex.message.split('\n');
        if (lines.length < 4) {
            return null;
        }
        var lineRE1 = /^\s*Line (\d+) of linked script ((?:file|http|https)\S+)(?:: in function (\S+))?\s*$/i, lineRE2 = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|http|https)\S+)(?:: in function (\S+))?\s*$/i, lineRE3 = /^\s*Line (\d+) of function script\s*$/i, stack = [], scripts = document.getElementsByTagName('script'), inlineScriptBlocks = [], parts, i, len, source;
        for (i in scripts) {
            if (has(scripts, i) && !scripts[i].src) {
                inlineScriptBlocks.push(scripts[i]);
            }
        }
        for (i = 2, len = lines.length; i < len; i += 2) {
            var item = null;
            if ((parts = lineRE1.exec(lines[i]))) {
                item = {
                    'url': parts[2],
                    'func': parts[3],
                    'line': +parts[1]
                };
            }
            else if ((parts = lineRE2.exec(lines[i]))) {
                item = {
                    'url': parts[3],
                    'func': parts[4]
                };
                var relativeLine = (+parts[1]);
                var script = inlineScriptBlocks[parts[2] - 1];
                if (script) {
                    source = getSource(item.url);
                    if (source) {
                        source = source.join('\n');
                        var pos = source.indexOf(script.innerText);
                        if (pos >= 0) {
                            item.line = relativeLine + source.substring(0, pos).split('\n').length;
                        }
                    }
                }
            }
            else if ((parts = lineRE3.exec(lines[i]))) {
                var url = window.location.href.replace(/#.*$/, ''), line = parts[1];
                var re = new RegExp(escapeCodeAsRegExpForMatchingInsideHTML(lines[i + 1]));
                source = findSourceInUrls(re, [url]);
                item = {
                    'url': url,
                    'line': source ? source.line : line,
                    'func': ''
                };
            }
            if (item) {
                if (!item.func) {
                    item.func = guessFunctionName(item.url, item.line);
                }
                var context = gatherContext(item.url, item.line);
                var midline = (context ? context[Math.floor(context.length / 2)] : null);
                if (context && midline.replace(/^\s*/, '') === lines[i + 1].replace(/^\s*/, '')) {
                    item.context = context;
                }
                else {
                    item.context = [lines[i + 1]];
                }
                stack.push(item);
            }
        }
        if (!stack.length) {
            return null;
        }
        return {
            'mode': 'multiline',
            'name': ex.name,
            'message': lines[0],
            'url': document.location.href,
            'stack': stack,
            'useragent': navigator.userAgent
        };
    }
    function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
        var initial = {
            'url': url,
            'line': lineNo,
            'func': undefined,
            'context': undefined,
            'column': undefined
        };
        if (initial.url && initial.line) {
            stackInfo.incomplete = false;
            if (!initial.func) {
                initial.func = guessFunctionName(initial.url, initial.line);
            }
            if (!initial.context) {
                initial.context = gatherContext(initial.url, initial.line);
            }
            var reference = / '([^']+)' /.exec(message);
            if (reference) {
                initial.column = findSourceInLine(reference[1], initial.url, initial.line);
            }
            if (stackInfo.stack.length > 0) {
                if (stackInfo.stack[0].url === initial.url) {
                    if (stackInfo.stack[0].line === initial.line) {
                        return false;
                    }
                    else if (!stackInfo.stack[0].line && stackInfo.stack[0].func === initial.func) {
                        stackInfo.stack[0].line = initial.line;
                        stackInfo.stack[0].context = initial.context;
                        return false;
                    }
                }
            }
            stackInfo.stack.unshift(initial);
            stackInfo.partial = true;
            return true;
        }
        else {
            stackInfo.incomplete = true;
        }
        return false;
    }
    function computeStackTraceByWalkingCallerChain(ex, depth) {
        var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, stack = [], funcs = {}, recursion = false, parts, item, source;
        for (var curr = computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {
            if (curr === computeStackTrace || curr === TraceKit.report) {
                continue;
            }
            item = {
                'url': null,
                'func': UNKNOWN_FUNCTION,
                'line': null,
                'column': null
            };
            if (curr.name) {
                item.func = curr.name;
            }
            else if ((parts = functionName.exec(curr.toString()))) {
                item.func = parts[1];
            }
            if (typeof item.func === 'undefined') {
                try {
                    item.func = parts.input.substring(0, parts.input.indexOf('{'));
                }
                catch (e) { }
            }
            if ((source = findSourceByFunctionBody(curr))) {
                item.url = source.url;
                item.line = source.line;
                if (item.func === UNKNOWN_FUNCTION) {
                    item.func = guessFunctionName(item.url, item.line);
                }
                var reference = / '([^']+)' /.exec(ex.message || ex.description);
                if (reference) {
                    item.column = findSourceInLine(reference[1], source.url, source.line);
                }
            }
            if (funcs['' + curr]) {
                recursion = true;
            }
            else {
                funcs['' + curr] = true;
            }
            stack.push(item);
        }
        if (depth) {
            stack.splice(0, depth);
        }
        var result = {
            'mode': 'callers',
            'name': ex.name,
            'message': ex.message,
            'url': document.location.href,
            'stack': stack,
            'useragent': navigator.userAgent
        };
        augmentStackTraceWithInitialElement(result, ex.sourceURL || ex.fileName, ex.line || ex.lineNumber, ex.message || ex.description);
        return result;
    }
    var computeStackTrace = function (ex, depth) {
        var stack = null;
        depth = (depth == null ? 0 : +depth);
        try {
            stack = computeStackTraceFromStacktraceProp(ex);
            if (stack) {
                return stack;
            }
        }
        catch (e) {
            if (debug) {
                throw e;
            }
        }
        try {
            stack = computeStackTraceFromStackProp(ex);
            if (stack) {
                return stack;
            }
        }
        catch (e) {
            if (debug) {
                throw e;
            }
        }
        try {
            stack = computeStackTraceFromOperaMultiLineMessage(ex);
            if (stack) {
                return stack;
            }
        }
        catch (e) {
            if (debug) {
                throw e;
            }
        }
        try {
            stack = computeStackTraceByWalkingCallerChain(ex, depth + 1);
            if (stack) {
                return stack;
            }
        }
        catch (e) {
            if (debug) {
                throw e;
            }
        }
        return;
    };
    function computeStackTraceOfCaller(depth) {
        depth = (depth == null ? 0 : +depth) + 1;
        try {
            throw new Error();
        }
        catch (ex) {
            return computeStackTrace(ex, depth + 1);
        }
    }
    computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
    computeStackTrace.guessFunctionName = guessFunctionName;
    computeStackTrace.gatherContext = gatherContext;
    computeStackTrace.ofCaller = computeStackTraceOfCaller;
    return computeStackTrace;
}());
TraceKit.extendToAsynchronousCallbacks = function () {
    var _helper = function _helper(fnName) {
        var originalFn = window[fnName];
        window[fnName] = function traceKitAsyncExtension() {
            var args = _slice.call(arguments);
            var originalCallback = args[0];
            if (typeof (originalCallback) === 'function') {
                args[0] = TraceKit.wrap(originalCallback);
            }
            if (originalFn.apply) {
                return originalFn.apply(this, args);
            }
            else {
                return originalFn(args[0], args[1]);
            }
        };
    };
    _helper('setTimeout');
    _helper('setInterval');
};



/***/ }),

/***/ "./src/utils/storage/cookie.ts":
/*!*************************************!*\
  !*** ./src/utils/storage/cookie.ts ***!
  \*************************************/
/*! exports provided: CookieStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieStorage", function() { return CookieStorage; });
var CookieStorage = (function () {
    function CookieStorage() {
    }
    CookieStorage.prototype.updateConfig = function (config) {
        this.config = config;
    };
    CookieStorage.prototype.set = function (name, value, hours) {
        var expires;
        if (!!hours) {
            var date = new Date();
            date.setTime(date.getTime() + hours * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        else {
            expires = '';
        }
        var secure = this.config.secureCookie ? '; secure' : '';
        document.cookie = name + "=" + value + expires + "; path=/" + secure;
    };
    CookieStorage.prototype.read = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    };
    CookieStorage.prototype.clear = function (name) {
        this.set(name, "", -1);
    };
    return CookieStorage;
}());



/***/ }),

/***/ "./src/utils/storage/index.ts":
/*!************************************!*\
  !*** ./src/utils/storage/index.ts ***!
  \************************************/
/*! exports provided: CookieStorage, LocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie */ "./src/utils/storage/cookie.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CookieStorage", function() { return _cookie__WEBPACK_IMPORTED_MODULE_0__["CookieStorage"]; });

/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ "./src/utils/storage/localStorage.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocalStorage", function() { return _localStorage__WEBPACK_IMPORTED_MODULE_1__["LocalStorage"]; });





/***/ }),

/***/ "./src/utils/storage/localStorage.ts":
/*!*******************************************!*\
  !*** ./src/utils/storage/localStorage.ts ***!
  \*******************************************/
/*! exports provided: LocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStorage", function() { return LocalStorage; });
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../time */ "./src/utils/time.ts");

var LocalStorage = (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.updateConfig = function (config) {
        this.config = config;
    };
    LocalStorage.prototype.set = function (name, value, hours) {
        var expiryTimestamp = !hours ? null : Object(_time__WEBPACK_IMPORTED_MODULE_0__["timestamp"])(hours);
        try {
            var item = { expiryTimestamp: expiryTimestamp, data: value };
            var itemStringified = JSON.stringify(item);
            localStorage.setItem(name, itemStringified);
        }
        catch (e) {
        }
    };
    LocalStorage.prototype.read = function (name) {
        var item = null;
        try {
            var val = localStorage.getItem(name);
            if (!!val) {
                item = JSON.parse(val);
            }
        }
        catch (e) {
        }
        if (!item || item && item.expiryTimestamp && Object(_time__WEBPACK_IMPORTED_MODULE_0__["timestamp"])(0) > item.expiryTimestamp) {
            localStorage.removeItem(name);
            return null;
        }
        return item.data;
    };
    LocalStorage.prototype.clear = function (name) {
        localStorage.removeItem(name);
    };
    return LocalStorage;
}());



/***/ }),

/***/ "./src/utils/time.ts":
/*!***************************!*\
  !*** ./src/utils/time.ts ***!
  \***************************/
/*! exports provided: timestamp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timestamp", function() { return timestamp; });
function timestamp(hours) {
    return Date.now() + hours * 60 * 1000;
}


/***/ }),

/***/ "./src/utils/transport/index.ts":
/*!**************************************!*\
  !*** ./src/utils/transport/index.ts ***!
  \**************************************/
/*! exports provided: REQUEST_TIMEOUT, shouldRetryBasedOnStatus, finishTransport, failTransport, sendXHRRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transport */ "./src/utils/transport/transport.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "REQUEST_TIMEOUT", function() { return _transport__WEBPACK_IMPORTED_MODULE_0__["REQUEST_TIMEOUT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shouldRetryBasedOnStatus", function() { return _transport__WEBPACK_IMPORTED_MODULE_0__["shouldRetryBasedOnStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "finishTransport", function() { return _transport__WEBPACK_IMPORTED_MODULE_0__["finishTransport"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "failTransport", function() { return _transport__WEBPACK_IMPORTED_MODULE_0__["failTransport"]; });

/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xhr */ "./src/utils/transport/xhr.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sendXHRRequest", function() { return _xhr__WEBPACK_IMPORTED_MODULE_1__["sendXHRRequest"]; });





/***/ }),

/***/ "./src/utils/transport/transport.ts":
/*!******************************************!*\
  !*** ./src/utils/transport/transport.ts ***!
  \******************************************/
/*! exports provided: REQUEST_TIMEOUT, shouldRetryBasedOnStatus, finishTransport, failTransport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_TIMEOUT", function() { return REQUEST_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldRetryBasedOnStatus", function() { return shouldRetryBasedOnStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "finishTransport", function() { return finishTransport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "failTransport", function() { return failTransport; });
var REQUEST_TIMEOUT = 10000;
function shouldRetryBasedOnStatus(status) {
    return status !== 403 && status !== 400 && status !== 429;
}
function finishTransport(options, status) {
    if (status === 202) {
        options.onSuccess();
    }
    else {
        options.onFail(shouldRetryBasedOnStatus(status));
    }
}
function failTransport(options) {
    options.onFail(true);
}


/***/ }),

/***/ "./src/utils/transport/xhr.ts":
/*!************************************!*\
  !*** ./src/utils/transport/xhr.ts ***!
  \************************************/
/*! exports provided: sendXHRRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendXHRRequest", function() { return sendXHRRequest; });
/* harmony import */ var _transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transport */ "./src/utils/transport/transport.ts");

var sendXHRRequest = function (options) {
    var xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url, true);
    xhr.timeout = _transport__WEBPACK_IMPORTED_MODULE_0__["REQUEST_TIMEOUT"];
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        Object(_transport__WEBPACK_IMPORTED_MODULE_0__["finishTransport"])(options, xhr.status);
    };
    xhr.onerror = function () {
        Object(_transport__WEBPACK_IMPORTED_MODULE_0__["failTransport"])(options);
    };
    xhr.ontimeout = function () {
        Object(_transport__WEBPACK_IMPORTED_MODULE_0__["failTransport"])(options);
    };
    xhr.send(JSON.stringify(options.data));
};


/***/ }),

/***/ "./src/utils/url.ts":
/*!**************************!*\
  !*** ./src/utils/url.ts ***!
  \**************************/
/*! exports provided: getQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQuery", function() { return getQuery; });
function getQuery() {
    var location = window.location.toString();
    var query = (location.split('?')[1] || '').split('#')[0];
    var qs = {};
    if (query.length > 0) {
        query.split('&').forEach(function (segment, i) {
            var parts = segment.split('=');
            if (parts && parts.length === 2) {
                var key = decodeURIComponent(parts[0]);
                qs[key] = parts[1];
            }
        });
    }
    return qs;
}


/***/ })

/******/ });