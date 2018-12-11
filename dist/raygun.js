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
        return __assign({ realUserMonitoring: false, crashReporting: false, secureCookie: true }, userConfig);
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
            this.set(name, '', -1);
        };
        return CookieStorage;
    }());
    exports.CookieStorage = CookieStorage;
});
define("utils/storage/index", ["require", "exports", "utils/storage/cookie"], function (require, exports, cookie_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(cookie_1);
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
            this.user = this.storage.read(USER_KEY);
        }
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
define("boot/boot", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("boot/raygun", ["require", "exports", "core/config", "core/user", "core/tags"], function (require, exports, config_1, user_1, tags_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Raygun = (function () {
        function Raygun() {
        }
        Raygun.prototype.boot = function (userConfig) {
            this.config = config_1.assignDefaultConfig(userConfig);
            this.user = new user_1.User(this.config);
            this.tags = new tags_1.Tags();
            if (this.config.crashReporting) {
            }
            if (this.config.realUserMonitoring) {
            }
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
