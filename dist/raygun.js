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
        return __assign({ realUserMonitoring: false, crashReporting: false, secureCookie: true, saveOfflineErrors: false, apiUrl: "https://api.raygun.io" }, userConfig);
    }
    exports.assignDefaultConfig = assignDefaultConfig;
});
define("utils/storage/storage", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
});
define("utils/storage/cookie", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.CookieStorage = CookieStorage;
});
define("utils/time", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function timestamp(hours) {
        return Date.now() + hours * 60 * 1000;
    }
    exports.timestamp = timestamp;
});
define("utils/storage/localStorage", ["require", "exports", "utils/time"], function (require, exports, time_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LocalStorage = (function () {
        function LocalStorage() {
        }
        LocalStorage.prototype.updateConfig = function (config) {
            this.config = config;
        };
        LocalStorage.prototype.set = function (name, value, hours) {
            var expiryTimestamp = !hours ? null : time_1.timestamp(hours);
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
            if (!item || item && item.expiryTimestamp && time_1.timestamp(0) > item.expiryTimestamp) {
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
    exports.LocalStorage = LocalStorage;
});
define("utils/storage/index", ["require", "exports", "utils/storage/cookie", "utils/storage/localStorage"], function (require, exports, cookie_1, localStorage_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(cookie_1);
    __export(localStorage_1);
});
define("core/user", ["require", "exports", "utils/storage/index"], function (require, exports, index_1) {
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
            if (storage === void 0) { storage = new index_1.CookieStorage(); }
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
define("core/index", ["require", "exports", "core/config", "core/tags", "core/user"], function (require, exports, config_1, tags_1, user_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(config_1);
    __export(tags_1);
    __export(user_1);
});
define("cr/payload", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("cr/errorQueue", ["require", "exports", "utils/storage/index"], function (require, exports, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ERROR_STORAGE_KEY = "raygun4js-errors";
    var ErrorQueue = (function () {
        function ErrorQueue(config, storage) {
            if (storage === void 0) { storage = new index_2.LocalStorage(); }
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
define("utils/transport/transport", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.REQUEST_TIMEOUT = 10000;
    function shouldRetryBasedOnStatus(status) {
        return status !== 403 && status !== 400 && status !== 429;
    }
    exports.shouldRetryBasedOnStatus = shouldRetryBasedOnStatus;
    function finishTransport(options, status) {
        if (status === 202) {
            options.onSuccess();
        }
        else {
            options.onFail(shouldRetryBasedOnStatus(status));
        }
    }
    exports.finishTransport = finishTransport;
    function failTransport(options) {
        options.onFail(true);
    }
    exports.failTransport = failTransport;
});
define("utils/transport/xhr", ["require", "exports", "utils/transport/transport"], function (require, exports, transport_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sendXHRRequest = function (options) {
        var xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url, true);
        xhr.timeout = transport_1.REQUEST_TIMEOUT;
        xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            transport_1.finishTransport(options, xhr.status);
        };
        xhr.onerror = function () {
            transport_1.failTransport(options);
        };
        xhr.ontimeout = function () {
            transport_1.failTransport(options);
        };
        xhr.send(JSON.stringify(options.data));
    };
});
define("utils/transport/index", ["require", "exports", "utils/transport/transport", "utils/transport/xhr"], function (require, exports, transport_2, xhr_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(transport_2);
    __export(xhr_1);
});
define("cr/cr", ["require", "exports", "cr/errorQueue", "utils/transport/index"], function (require, exports, errorQueue_1, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CR = (function () {
        function CR(config, user, tags, transport) {
            if (transport === void 0) { transport = index_3.sendXHRRequest; }
            this.sending = false;
            this.config = config;
            this.user = user;
            this.tags = tags;
            this.transport = transport;
            this.errorQueue = new errorQueue_1.ErrorQueue(this.config);
        }
        CR.prototype.send = function (ex, customData, tags) {
            if (!this.config.crashReporting) {
                return;
            }
        };
        Object.defineProperty(CR.prototype, "url", {
            get: function () {
                return this.config.apiUrl + "/entries?apikey=" + encodeURIComponent(this.config.apiKey);
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
define("boot/raygun", ["require", "exports", "core/config", "core/user", "core/tags", "cr/cr"], function (require, exports, config_2, user_2, tags_2, cr_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Raygun = (function () {
        function Raygun() {
        }
        Raygun.prototype.boot = function (userConfig) {
            this.config = config_2.assignDefaultConfig(userConfig);
            this.user = new user_2.User(this.config);
            this.tags = new tags_2.Tags();
            this.cr = new cr_1.CR(this.config, this.user, this.tags);
            return this;
        };
        Raygun.prototype.setUser = function (user) {
            this.user.setUser(user);
            return this;
        };
        Raygun.prototype.withTags = function (tags) {
            this.tags.setTags(tags);
            return this;
        };
        Raygun.noConflict = function () {
            return new Raygun();
        };
        return Raygun;
    }());
    exports.Raygun = Raygun;
});
