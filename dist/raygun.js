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
define("raygun", ["require", "exports", "core/config"], function (require, exports, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function boot(userConfig) {
        var config = config_1.assignDefaultConfig(userConfig);
        if (config.crashReporting) {
        }
        if (config.realUserMonitoring) {
        }
    }
    exports.boot = boot;
});
