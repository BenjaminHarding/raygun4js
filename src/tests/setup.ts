
// Support setting the userAgent on the navigator
Object.defineProperty(window.navigator, "userAgent", (function(_value){
    return {
        get: function _get() {
        return _value;
        },
        set: function _set(v) {
            _value = v;
        }
    };
})(window.navigator.userAgent));