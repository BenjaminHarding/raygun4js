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
define("core/config", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function assignDefaultConfig(userConfig) {
        return __assign({ realUserMonitoring: false, crashReporting: false, secureCookie: true, saveOfflineErrors: false, asyncErrorHandler: false, ignore3rdPartyErrors: false, excludedHostnames: [], excludedUserAgents: [], apiUrl: "https://api.raygun.io" }, userConfig);
    }
    exports.assignDefaultConfig = assignDefaultConfig;
});
define("core/tags", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Tags = Tags;
});
define("core/user", ["require", "exports", "../utils/storage"], function (require, exports, storage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.convertToPayload = convertToPayload;
    var USER_KEY = "raygun4js-userid";
    var USER_COOKIE_TIMEOUT = 24 * 31;
    var User = (function () {
        function User(config, storage) {
            if (storage === void 0) { storage = new storage_1.CookieStorage(); }
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
    exports.User = User;
});
define("core/core", ["require", "exports", "core/config", "core/user", "core/tags"], function (require, exports, config_1, user_1, tags_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Core = (function () {
        function Core() {
        }
        Core.prototype.init = function (userConfig) {
            this.config = config_1.assignDefaultConfig(userConfig);
            this.user = new user_1.User(this.config);
            this.tags = new tags_1.Tags();
        };
        return Core;
    }());
    exports.Core = Core;
});
define("core/index", ["require", "exports", "core/config", "core/tags", "core/user", "core/core"], function (require, exports, config_2, tags_2, user_2, core_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(config_2);
    __export(tags_2);
    __export(user_2);
    __export(core_1);
});
define("cr/payload", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("cr/errorQueue", ["require", "exports", "../utils/storage"], function (require, exports, storage_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ERROR_STORAGE_KEY = "raygun4js-errors";
    var ErrorQueue = (function () {
        function ErrorQueue(config, storage) {
            if (storage === void 0) { storage = new storage_2.LocalStorage(); }
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
    exports.ErrorQueue = ErrorQueue;
});
define("cr/tracekit", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.TraceKit = TraceKit;
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
});
define("cr/discardError", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function discardError(core, exception) {
        return checks.every(function (shouldDiscard) { return !shouldDiscard(core.config, exception); });
    }
    exports.discardError = discardError;
    exports.discardAsThirdPartyError = function (config, exception) {
        if (!config.ignore3rdPartyErrors) {
            return false;
        }
        return true;
    };
    exports.discardAsAnExcludedHostname = function (config, exception) {
        return false;
    };
    exports.discardAsAnExcludedUserAgent = function (config, exception) {
        return false;
    };
    exports.discardAsTheInsightsCrawler = function () {
        return navigator.userAgent.match('RaygunPulseInsightsCrawler').length > 0;
    };
    var checks = [
        exports.discardAsThirdPartyError,
        exports.discardAsAnExcludedHostname,
        exports.discardAsAnExcludedUserAgent,
        exports.discardAsTheInsightsCrawler,
    ];
});
define("cr/cr", ["require", "exports", "../utils/transport", "cr/errorQueue", "cr/discardError", "cr/tracekit"], function (require, exports, transport_1, errorQueue_1, discardError_1, tracekit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CR = (function () {
        function CR(core, transport) {
            if (transport === void 0) { transport = transport_1.sendXHRRequest; }
            this.sending = false;
            this.core = core;
            this.transport = transport;
            this.errorQueue = new errorQueue_1.ErrorQueue(this.core.config);
            this.processException = this.processException.bind(this);
        }
        CR.prototype.attach = function () {
            tracekit_1.TraceKit.report.subscribe(this.processException);
            if (this.core.config.asyncErrorHandler) {
                tracekit_1.TraceKit.extendToAsynchronousCallbacks();
            }
        };
        CR.prototype.detach = function () {
            tracekit_1.TraceKit.report.unsubscribe(this.processException);
        };
        CR.prototype.send = function (ex, customData, tags) {
            if (!this.core.config.crashReporting) {
                return;
            }
            var exception = tracekit_1.TraceKit.computeStackTrace(ex);
            this.processException(exception, customData, tags);
        };
        CR.prototype.processException = function (ex, customData, tags) {
            if (customData === void 0) { customData = {}; }
            if (tags === void 0) { tags = []; }
            if (discardError_1.discardError(this.core, ex)) {
                return;
            }
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
                url: this.url,
                data: error,
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
    exports.CR = CR;
});
define("boot/public", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("boot/raygun", ["require", "exports", "core/index", "cr/cr"], function (require, exports, index_1, cr_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Raygun = (function () {
        function Raygun() {
            this.core = new index_1.Core();
        }
        Raygun.prototype.boot = function (userConfig) {
            this.core.init(userConfig);
            this.cr = new cr_1.CR(this.core);
            return this;
        };
        Raygun.prototype.setUser = function (user) {
            this.core.user.setUser(user);
            return this;
        };
        Raygun.prototype.withTags = function (tags) {
            this.core.tags.setTags(tags);
            return this;
        };
        Raygun.noConflict = function () {
            return new Raygun();
        };
        return Raygun;
    }());
    exports.Raygun = Raygun;
});
