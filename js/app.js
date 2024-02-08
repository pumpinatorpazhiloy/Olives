(() => {
    var __webpack_modules__ = {
        530: function(module, exports) {
            var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(glob) {
                var current_event, stop, version = "0.5.4", has = "hasOwnProperty", separator = /[\.\/]/, comaseparator = /\s*,\s*/, wildcard = "*", numsort = function(a, b) {
                    return a - b;
                }, events = {
                    n: {}
                }, firstDefined = function() {
                    for (var i = 0, ii = this.length; i < ii; i++) if (typeof this[i] != "undefined") return this[i];
                }, lastDefined = function() {
                    var i = this.length;
                    while (--i) if (typeof this[i] != "undefined") return this[i];
                }, objtos = Object.prototype.toString, Str = String, isArray = Array.isArray || function(ar) {
                    return ar instanceof Array || objtos.call(ar) == "[object Array]";
                }, eve = function(name, scope) {
                    var l, oldstop = stop, args = Array.prototype.slice.call(arguments, 2), listeners = eve.listeners(name), z = 0, indexed = [], queue = {}, out = [], ce = current_event;
                    out.firstDefined = firstDefined;
                    out.lastDefined = lastDefined;
                    current_event = name;
                    stop = 0;
                    for (var i = 0, ii = listeners.length; i < ii; i++) if ("zIndex" in listeners[i]) {
                        indexed.push(listeners[i].zIndex);
                        if (listeners[i].zIndex < 0) queue[listeners[i].zIndex] = listeners[i];
                    }
                    indexed.sort(numsort);
                    while (indexed[z] < 0) {
                        l = queue[indexed[z++]];
                        out.push(l.apply(scope, args));
                        if (stop) {
                            stop = oldstop;
                            return out;
                        }
                    }
                    for (i = 0; i < ii; i++) {
                        l = listeners[i];
                        if ("zIndex" in l) if (l.zIndex == indexed[z]) {
                            out.push(l.apply(scope, args));
                            if (stop) break;
                            do {
                                z++;
                                l = queue[indexed[z]];
                                l && out.push(l.apply(scope, args));
                                if (stop) break;
                            } while (l);
                        } else queue[l.zIndex] = l; else {
                            out.push(l.apply(scope, args));
                            if (stop) break;
                        }
                    }
                    stop = oldstop;
                    current_event = ce;
                    return out;
                };
                eve._events = events;
                eve.listeners = function(name) {
                    var item, items, k, i, ii, j, jj, nes, names = isArray(name) ? name : name.split(separator), e = events, es = [ e ], out = [];
                    for (i = 0, ii = names.length; i < ii; i++) {
                        nes = [];
                        for (j = 0, jj = es.length; j < jj; j++) {
                            e = es[j].n;
                            items = [ e[names[i]], e[wildcard] ];
                            k = 2;
                            while (k--) {
                                item = items[k];
                                if (item) {
                                    nes.push(item);
                                    out = out.concat(item.f || []);
                                }
                            }
                        }
                        es = nes;
                    }
                    return out;
                };
                eve.separator = function(sep) {
                    if (sep) {
                        sep = Str(sep).replace(/(?=[\.\^\]\[\-])/g, "\\");
                        sep = "[" + sep + "]";
                        separator = new RegExp(sep);
                    } else separator = /[\.\/]/;
                };
                eve.on = function(name, f) {
                    if (typeof f != "function") return function() {};
                    var names = isArray(name) ? isArray(name[0]) ? name : [ name ] : Str(name).split(comaseparator);
                    for (var i = 0, ii = names.length; i < ii; i++) (function(name) {
                        var exist, names = isArray(name) ? name : Str(name).split(separator), e = events;
                        for (var i = 0, ii = names.length; i < ii; i++) {
                            e = e.n;
                            e = e.hasOwnProperty(names[i]) && e[names[i]] || (e[names[i]] = {
                                n: {}
                            });
                        }
                        e.f = e.f || [];
                        for (i = 0, ii = e.f.length; i < ii; i++) if (e.f[i] == f) {
                            exist = true;
                            break;
                        }
                        !exist && e.f.push(f);
                    })(names[i]);
                    return function(zIndex) {
                        if (+zIndex == +zIndex) f.zIndex = +zIndex;
                    };
                };
                eve.f = function(event) {
                    var attrs = [].slice.call(arguments, 1);
                    return function() {
                        eve.apply(null, [ event, null ].concat(attrs).concat([].slice.call(arguments, 0)));
                    };
                };
                eve.stop = function() {
                    stop = 1;
                };
                eve.nt = function(subname) {
                    var cur = isArray(current_event) ? current_event.join(".") : current_event;
                    if (subname) return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(cur);
                    return cur;
                };
                eve.nts = function() {
                    return isArray(current_event) ? current_event : current_event.split(separator);
                };
                eve.off = eve.unbind = function(name, f) {
                    if (!name) {
                        eve._events = events = {
                            n: {}
                        };
                        return;
                    }
                    var names = isArray(name) ? isArray(name[0]) ? name : [ name ] : Str(name).split(comaseparator);
                    if (names.length > 1) {
                        for (var i = 0, ii = names.length; i < ii; i++) eve.off(names[i], f);
                        return;
                    }
                    names = isArray(name) ? name : Str(name).split(separator);
                    var e, key, splice, j, jj, cur = [ events ], inodes = [];
                    for (i = 0, ii = names.length; i < ii; i++) for (j = 0; j < cur.length; j += splice.length - 2) {
                        splice = [ j, 1 ];
                        e = cur[j].n;
                        if (names[i] != wildcard) {
                            if (e[names[i]]) {
                                splice.push(e[names[i]]);
                                inodes.unshift({
                                    n: e,
                                    name: names[i]
                                });
                            }
                        } else for (key in e) if (e[has](key)) {
                            splice.push(e[key]);
                            inodes.unshift({
                                n: e,
                                name: key
                            });
                        }
                        cur.splice.apply(cur, splice);
                    }
                    for (i = 0, ii = cur.length; i < ii; i++) {
                        e = cur[i];
                        while (e.n) {
                            if (f) {
                                if (e.f) {
                                    for (j = 0, jj = e.f.length; j < jj; j++) if (e.f[j] == f) {
                                        e.f.splice(j, 1);
                                        break;
                                    }
                                    !e.f.length && delete e.f;
                                }
                                for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                                    var funcs = e.n[key].f;
                                    for (j = 0, jj = funcs.length; j < jj; j++) if (funcs[j] == f) {
                                        funcs.splice(j, 1);
                                        break;
                                    }
                                    !funcs.length && delete e.n[key].f;
                                }
                            } else {
                                delete e.f;
                                for (key in e.n) if (e.n[has](key) && e.n[key].f) delete e.n[key].f;
                            }
                            e = e.n;
                        }
                    }
                    prune: for (i = 0, ii = inodes.length; i < ii; i++) {
                        e = inodes[i];
                        for (key in e.n[e.name].f) continue prune;
                        for (key in e.n[e.name].n) continue prune;
                        delete e.n[e.name];
                    }
                };
                eve.once = function(name, f) {
                    var f2 = function() {
                        eve.off(name, f2);
                        return f.apply(this, arguments);
                    };
                    return eve.on(name, f2);
                };
                eve.version = version;
                eve.toString = function() {
                    return "You are running Eve " + version;
                };
                glob.eve = eve;
                true && module.exports ? module.exports = eve : true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], 
                __WEBPACK_AMD_DEFINE_RESULT__ = function() {
                    return eve;
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
            })(typeof window != "undefined" ? window : this);
        },
        703: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            var ReactPropTypesSecret = __webpack_require__(414);
            function emptyFunction() {}
            function emptyFunctionWithReset() {}
            emptyFunctionWithReset.resetWarningCache = emptyFunction;
            module.exports = function() {
                function shim(props, propName, componentName, location, propFullName, secret) {
                    if (secret === ReactPropTypesSecret) return;
                    var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. " + "Use PropTypes.checkPropTypes() to call them. " + "Read more at http://fb.me/use-check-prop-types");
                    err.name = "Invariant Violation";
                    throw err;
                }
                shim.isRequired = shim;
                function getShim() {
                    return shim;
                }
                var ReactPropTypes = {
                    array: shim,
                    bigint: shim,
                    bool: shim,
                    func: shim,
                    number: shim,
                    object: shim,
                    string: shim,
                    symbol: shim,
                    any: shim,
                    arrayOf: getShim,
                    element: shim,
                    elementType: shim,
                    instanceOf: getShim,
                    node: shim,
                    objectOf: getShim,
                    oneOf: getShim,
                    oneOfType: getShim,
                    shape: getShim,
                    exact: getShim,
                    checkPropTypes: emptyFunctionWithReset,
                    resetWarningCache: emptyFunction
                };
                ReactPropTypes.PropTypes = ReactPropTypes;
                return ReactPropTypes;
            };
        },
        697: (module, __unused_webpack_exports, __webpack_require__) => {
            if (false) ; else module.exports = __webpack_require__(703)();
        },
        414: module => {
            "use strict";
            var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
            module.exports = ReactPropTypesSecret;
        },
        190: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports["default"] = {
                slide: __webpack_require__(432),
                stack: __webpack_require__(277),
                elastic: __webpack_require__(996),
                bubble: __webpack_require__(760),
                push: __webpack_require__(976),
                pushRotate: __webpack_require__(796),
                scaleDown: __webpack_require__(70),
                scaleRotate: __webpack_require__(1),
                fallDown: __webpack_require__(576),
                reveal: __webpack_require__(523)
            };
            module.exports = exports["default"];
        },
        510: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                }
                return target;
            };
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();
            var _get = function get(_x, _x2, _x3) {
                var _again = true;
                _function: while (_again) {
                    var object = _x, property = _x2, receiver = _x3;
                    _again = false;
                    if (object === null) object = Function.prototype;
                    var desc = Object.getOwnPropertyDescriptor(object, property);
                    if (desc === void 0) {
                        var parent = Object.getPrototypeOf(object);
                        if (parent === null) return; else {
                            _x = parent;
                            _x2 = property;
                            _x3 = receiver;
                            _again = true;
                            desc = parent = void 0;
                            continue _function;
                        }
                    } else if ("value" in desc) return desc.value; else {
                        var getter = desc.get;
                        if (getter === void 0) return;
                        return getter.call(receiver);
                    }
                }
            };
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var _react = __webpack_require__(294);
            var _react2 = _interopRequireDefault(_react);
            var _propTypes = __webpack_require__(697);
            var _propTypes2 = _interopRequireDefault(_propTypes);
            var BurgerIcon = function(_Component) {
                _inherits(BurgerIcon, _Component);
                function BurgerIcon(props) {
                    _classCallCheck(this, BurgerIcon);
                    _get(Object.getPrototypeOf(BurgerIcon.prototype), "constructor", this).call(this, props);
                    this.state = {
                        hover: false
                    };
                }
                _createClass(BurgerIcon, [ {
                    key: "getLineStyle",
                    value: function getLineStyle(index) {
                        return _extends({
                            position: "absolute",
                            height: "20%",
                            left: 0,
                            right: 0,
                            top: 20 * (index * 2) + "%",
                            opacity: this.state.hover ? .6 : 1
                        }, this.state.hover && this.props.styles.bmBurgerBarsHover);
                    }
                }, {
                    key: "render",
                    value: function render() {
                        var _this = this;
                        var icon = void 0;
                        var buttonStyle = {
                            position: "absolute",
                            left: 0,
                            top: 0,
                            zIndex: 1,
                            width: "100%",
                            height: "100%",
                            margin: 0,
                            padding: 0,
                            border: "none",
                            fontSize: 0,
                            background: "transparent",
                            cursor: "pointer"
                        };
                        if (this.props.customIcon) {
                            var extraProps = {
                                className: ("bm-icon " + (this.props.customIcon.props.className || "")).trim(),
                                style: _extends({
                                    width: "100%",
                                    height: "100%"
                                }, this.props.styles.bmIcon)
                            };
                            icon = _react2["default"].cloneElement(this.props.customIcon, extraProps);
                        } else icon = _react2["default"].createElement("span", null, [ 0, 1, 2 ].map((function(bar) {
                            return _react2["default"].createElement("span", {
                                key: bar,
                                className: ("bm-burger-bars " + _this.props.barClassName + " " + (_this.state.hover ? "bm-burger-bars-hover" : "")).trim(),
                                style: _extends({}, _this.getLineStyle(bar), _this.props.styles.bmBurgerBars)
                            });
                        })));
                        return _react2["default"].createElement("div", {
                            className: ("bm-burger-button " + this.props.className).trim(),
                            style: _extends({
                                zIndex: 1e3
                            }, this.props.styles.bmBurgerButton)
                        }, _react2["default"].createElement("button", {
                            type: "button",
                            id: "react-burger-menu-btn",
                            onClick: this.props.onClick,
                            onMouseOver: function() {
                                _this.setState({
                                    hover: true
                                });
                                if (_this.props.onIconHoverChange) _this.props.onIconHoverChange({
                                    isMouseIn: true
                                });
                            },
                            onMouseOut: function() {
                                _this.setState({
                                    hover: false
                                });
                                if (_this.props.onIconHoverChange) _this.props.onIconHoverChange({
                                    isMouseIn: false
                                });
                            },
                            style: buttonStyle
                        }, "Open Menu"), icon);
                    }
                } ]);
                return BurgerIcon;
            }(_react.Component);
            exports["default"] = BurgerIcon;
            BurgerIcon.propTypes = {
                barClassName: _propTypes2["default"].string,
                customIcon: _propTypes2["default"].element,
                styles: _propTypes2["default"].object
            };
            BurgerIcon.defaultProps = {
                barClassName: "",
                className: "",
                styles: {}
            };
            module.exports = exports["default"];
        },
        430: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                }
                return target;
            };
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();
            var _get = function get(_x, _x2, _x3) {
                var _again = true;
                _function: while (_again) {
                    var object = _x, property = _x2, receiver = _x3;
                    _again = false;
                    if (object === null) object = Function.prototype;
                    var desc = Object.getOwnPropertyDescriptor(object, property);
                    if (desc === void 0) {
                        var parent = Object.getPrototypeOf(object);
                        if (parent === null) return; else {
                            _x = parent;
                            _x2 = property;
                            _x3 = receiver;
                            _again = true;
                            desc = parent = void 0;
                            continue _function;
                        }
                    } else if ("value" in desc) return desc.value; else {
                        var getter = desc.get;
                        if (getter === void 0) return;
                        return getter.call(receiver);
                    }
                }
            };
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var _react = __webpack_require__(294);
            var _react2 = _interopRequireDefault(_react);
            var _propTypes = __webpack_require__(697);
            var _propTypes2 = _interopRequireDefault(_propTypes);
            var CrossIcon = function(_Component) {
                _inherits(CrossIcon, _Component);
                function CrossIcon() {
                    _classCallCheck(this, CrossIcon);
                    _get(Object.getPrototypeOf(CrossIcon.prototype), "constructor", this).apply(this, arguments);
                }
                _createClass(CrossIcon, [ {
                    key: "getCrossStyle",
                    value: function getCrossStyle(type) {
                        return {
                            position: "absolute",
                            width: 3,
                            height: 14,
                            transform: type === "before" ? "rotate(45deg)" : "rotate(-45deg)"
                        };
                    }
                }, {
                    key: "render",
                    value: function render() {
                        var _this = this;
                        var icon;
                        var buttonWrapperStyle = {
                            position: "absolute",
                            width: 24,
                            height: 24,
                            right: 8,
                            top: 8
                        };
                        var buttonStyle = {
                            position: "absolute",
                            left: 0,
                            top: 0,
                            zIndex: 1,
                            width: "100%",
                            height: "100%",
                            margin: 0,
                            padding: 0,
                            border: "none",
                            fontSize: 0,
                            background: "transparent",
                            cursor: "pointer"
                        };
                        if (this.props.customIcon) {
                            var extraProps = {
                                className: ("bm-cross " + (this.props.customIcon.props.className || "")).trim(),
                                style: _extends({
                                    width: "100%",
                                    height: "100%"
                                }, this.props.styles.bmCross)
                            };
                            icon = _react2["default"].cloneElement(this.props.customIcon, extraProps);
                        } else icon = _react2["default"].createElement("span", {
                            style: {
                                position: "absolute",
                                top: "6px",
                                right: "14px"
                            }
                        }, [ "before", "after" ].map((function(type, i) {
                            return _react2["default"].createElement("span", {
                                key: i,
                                className: ("bm-cross " + _this.props.crossClassName).trim(),
                                style: _extends({}, _this.getCrossStyle(type), _this.props.styles.bmCross)
                            });
                        })));
                        return _react2["default"].createElement("div", {
                            className: ("bm-cross-button " + this.props.className).trim(),
                            style: _extends({}, buttonWrapperStyle, this.props.styles.bmCrossButton)
                        }, _react2["default"].createElement("button", _extends({
                            type: "button",
                            id: "react-burger-cross-btn",
                            onClick: this.props.onClick,
                            style: buttonStyle
                        }, !this.props.isOpen && {
                            tabIndex: -1
                        }), "Close Menu"), icon);
                    }
                } ]);
                return CrossIcon;
            }(_react.Component);
            exports["default"] = CrossIcon;
            CrossIcon.propTypes = {
                crossClassName: _propTypes2["default"].string,
                customIcon: _propTypes2["default"].element,
                isOpen: _propTypes2["default"].bool,
                styles: _propTypes2["default"].object
            };
            CrossIcon.defaultProps = {
                crossClassName: "",
                className: "",
                styles: {},
                isOpen: false
            };
            module.exports = exports["default"];
        },
        661: (module, exports) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var styles = {
                overlay: function overlay(isOpen) {
                    return {
                        position: "fixed",
                        zIndex: 1e3,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.3)",
                        opacity: isOpen ? 1 : 0,
                        MozTransform: isOpen ? "" : "translate3d(100%, 0, 0)",
                        MsTransform: isOpen ? "" : "translate3d(100%, 0, 0)",
                        OTransform: isOpen ? "" : "translate3d(100%, 0, 0)",
                        WebkitTransform: isOpen ? "" : "translate3d(100%, 0, 0)",
                        transform: isOpen ? "" : "translate3d(100%, 0, 0)",
                        transition: isOpen ? "opacity 0.3s" : "opacity 0.3s, transform 0s 0.3s"
                    };
                },
                menuWrap: function menuWrap(isOpen, width, right) {
                    return {
                        position: "fixed",
                        right: right ? 0 : "inherit",
                        zIndex: 1100,
                        width,
                        height: "100%",
                        MozTransform: isOpen ? "" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        MsTransform: isOpen ? "" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        OTransform: isOpen ? "" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        WebkitTransform: isOpen ? "" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        transform: isOpen ? "" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        transition: "all 0.5s"
                    };
                },
                menu: function menu() {
                    return {
                        height: "100%",
                        boxSizing: "border-box",
                        overflow: "auto"
                    };
                },
                itemList: function itemList() {
                    return {
                        height: "100%"
                    };
                },
                item: function item() {
                    return {
                        display: "block"
                    };
                }
            };
            exports["default"] = styles;
            module.exports = exports["default"];
        },
        660: (__unused_webpack_module, exports) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.focusOnFirstMenuItem = focusOnFirstMenuItem;
            exports.focusOnLastMenuItem = focusOnLastMenuItem;
            exports.focusOnCrossButton = focusOnCrossButton;
            exports.focusOnMenuButton = focusOnMenuButton;
            exports.focusOnMenuItem = focusOnMenuItem;
            exports.focusOnNextMenuItem = focusOnNextMenuItem;
            exports.focusOnPreviousMenuItem = focusOnPreviousMenuItem;
            function focusOnFirstMenuItem() {
                var firstItem = Array.from(document.getElementsByClassName("bm-item")).shift();
                if (firstItem) firstItem.focus();
            }
            function focusOnLastMenuItem() {
                var lastItem = Array.from(document.getElementsByClassName("bm-item")).pop();
                if (lastItem) lastItem.focus();
            }
            function focusOnCrossButton() {
                var crossButton = document.getElementById("react-burger-cross-btn");
                if (crossButton) crossButton.focus();
            }
            function focusOnMenuButton() {
                var menuButton = document.getElementById("react-burger-menu-btn");
                if (menuButton) menuButton.focus();
            }
            function focusOnMenuItem(siblingType) {
                if (document.activeElement.className.includes("bm-item")) {
                    var sibling = document.activeElement[siblingType];
                    if (sibling) sibling.focus(); else focusOnCrossButton();
                } else if (siblingType === "previousElementSibling") focusOnLastMenuItem(); else focusOnFirstMenuItem();
            }
            function focusOnNextMenuItem() {
                focusOnMenuItem("nextElementSibling");
            }
            function focusOnPreviousMenuItem() {
                focusOnMenuItem("previousElementSibling");
            }
        },
        978: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports["default"] = function() {
                var Snap = void 0;
                try {
                    Snap = __webpack_require__(223);
                } finally {
                    return Snap;
                }
            };
            module.exports = exports["default"];
        },
        539: (__unused_webpack_module, exports) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var pxToNum = function pxToNum(val) {
                return parseInt(val.slice(0, -2), 10);
            };
            exports.pxToNum = pxToNum;
        },
        126: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var _slicedToArray = function() {
                function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = void 0;
                    try {
                        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
                            _arr.push(_s.value);
                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && _i["return"]) _i["return"]();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                return function(arr, i) {
                    if (Array.isArray(arr)) return arr; else if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i); else throw new TypeError("Invalid attempt to destructure non-iterable instance");
                };
            }();
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                }
                return target;
            };
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            var _react = __webpack_require__(294);
            var _react2 = _interopRequireDefault(_react);
            var _reactDom = __webpack_require__(935);
            _interopRequireDefault(_reactDom);
            var _propTypes = __webpack_require__(697);
            var _propTypes2 = _interopRequireDefault(_propTypes);
            var _helpersBaseStyles = __webpack_require__(661);
            var _helpersBaseStyles2 = _interopRequireDefault(_helpersBaseStyles);
            var _helpersDom = __webpack_require__(660);
            var _componentsBurgerIcon = __webpack_require__(510);
            var _componentsBurgerIcon2 = _interopRequireDefault(_componentsBurgerIcon);
            var _componentsCrossIcon = __webpack_require__(430);
            var _componentsCrossIcon2 = _interopRequireDefault(_componentsCrossIcon);
            exports["default"] = function(styles) {
                if (!styles) throw new Error("No styles supplied");
                var ARROW_DOWN = "ArrowDown";
                var ARROW_UP = "ArrowUp";
                var ESCAPE = "Escape";
                var SPACE = " ";
                var HOME = "Home";
                var END = "End";
                function usePrevious(value) {
                    var ref = _react2["default"].useRef(value);
                    _react2["default"].useEffect((function() {
                        ref.current = value;
                    }));
                    return ref.current;
                }
                var Menu = function Menu(props) {
                    var _React$useState = _react2["default"].useState(false);
                    var _React$useState2 = _slicedToArray(_React$useState, 2);
                    var isOpen = _React$useState2[0];
                    var setIsOpen = _React$useState2[1];
                    var timeoutId = _react2["default"].useRef();
                    var toggleOptions = _react2["default"].useRef({});
                    var prevIsOpenProp = usePrevious(props.isOpen);
                    _react2["default"].useEffect((function() {
                        if (props.isOpen) toggleMenu({
                            isOpen: true,
                            noStateChange: true
                        });
                        return function cleanup() {
                            applyWrapperStyles(false);
                            clearCurrentTimeout();
                        };
                    }), []);
                    _react2["default"].useEffect((function() {
                        var wasToggled = typeof props.isOpen !== "undefined" && props.isOpen !== isOpen && props.isOpen !== prevIsOpenProp;
                        if (wasToggled) {
                            toggleMenu();
                            return;
                        }
                        if (styles.svg) (function() {
                            var morphShape = document.getElementById("bm-morph-shape");
                            var path = styles.svg.lib(morphShape).select("path");
                            if (isOpen) styles.svg.animate(path); else setTimeout((function() {
                                path.attr("d", styles.svg.pathInitial);
                            }), 300);
                        })();
                    }));
                    _react2["default"].useEffect((function() {
                        var _toggleOptions$current = toggleOptions.current;
                        var noStateChange = _toggleOptions$current.noStateChange;
                        var focusOnLastItem = _toggleOptions$current.focusOnLastItem;
                        if (!noStateChange) props.onStateChange({
                            isOpen
                        });
                        if (!props.disableAutoFocus) if (isOpen) focusOnLastItem ? (0, _helpersDom.focusOnLastMenuItem)() : (0, 
                        _helpersDom.focusOnFirstMenuItem)(); else if (document.activeElement) document.activeElement.blur(); else document.body.blur();
                        clearCurrentTimeout();
                        timeoutId.current = setTimeout((function() {
                            timeoutId.current = null;
                            if (!isOpen) applyWrapperStyles(false);
                        }), 500);
                        var defaultOnKeyDown = isOpen ? onKeyDownOpen : onKeyDownClosed;
                        var onKeyDown = props.customOnKeyDown || defaultOnKeyDown;
                        window.addEventListener("keydown", onKeyDown);
                        return function cleanup() {
                            window.removeEventListener("keydown", onKeyDown);
                        };
                    }), [ isOpen ]);
                    function toggleMenu() {
                        var options = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];
                        toggleOptions.current = options;
                        applyWrapperStyles();
                        setTimeout((function() {
                            setIsOpen((function(open) {
                                return typeof options.isOpen !== "undefined" ? options.isOpen : !open;
                            }));
                        }));
                    }
                    function open() {
                        if (typeof props.onOpen === "function") props.onOpen(); else toggleMenu();
                    }
                    function close() {
                        if (typeof props.onClose === "function") props.onClose(); else toggleMenu();
                    }
                    function getStyle(style, index) {
                        var width = props.width;
                        var right = props.right;
                        var formattedWidth = typeof width !== "string" ? width + "px" : width;
                        return style(isOpen, formattedWidth, right, index);
                    }
                    function getStyles(el, index, inline) {
                        var propName = "bm" + el.replace(el.charAt(0), el.charAt(0).toUpperCase());
                        var output = _helpersBaseStyles2["default"][el] ? getStyle(_helpersBaseStyles2["default"][el]) : {};
                        if (styles[el]) output = _extends({}, output, getStyle(styles[el], index + 1));
                        if (props.styles[propName]) output = _extends({}, output, props.styles[propName]);
                        if (inline) output = _extends({}, output, inline);
                        if (props.noTransition) delete output.transition;
                        return output;
                    }
                    function handleExternalWrapper(id, wrapperStyles, set) {
                        var wrapper = document.getElementById(id);
                        if (!wrapper) {
                            console.error("Element with ID '" + id + "' not found");
                            return;
                        }
                        var builtStyles = getStyle(wrapperStyles);
                        for (var prop in builtStyles) if (builtStyles.hasOwnProperty(prop)) wrapper.style[prop] = set ? builtStyles[prop] : "";
                        var applyOverflow = function applyOverflow(el) {
                            return el.style["overflow-x"] = set ? "hidden" : "";
                        };
                        if (!props.htmlClassName) applyOverflow(document.querySelector("html"));
                        if (!props.bodyClassName) applyOverflow(document.querySelector("body"));
                    }
                    function applyWrapperStyles() {
                        var set = arguments.length <= 0 || arguments[0] === void 0 ? true : arguments[0];
                        var applyClass = function applyClass(el, className) {
                            return el.classList[set ? "add" : "remove"](className);
                        };
                        if (props.htmlClassName) applyClass(document.querySelector("html"), props.htmlClassName);
                        if (props.bodyClassName) applyClass(document.querySelector("body"), props.bodyClassName);
                        if (styles.pageWrap && props.pageWrapId) handleExternalWrapper(props.pageWrapId, styles.pageWrap, set);
                        if (styles.outerContainer && props.outerContainerId) handleExternalWrapper(props.outerContainerId, styles.outerContainer, set);
                        var menuWrap = document.querySelector(".bm-menu-wrap");
                        if (menuWrap) if (set) menuWrap.removeAttribute("hidden"); else menuWrap.setAttribute("hidden", true);
                    }
                    function clearCurrentTimeout() {
                        if (timeoutId.current) clearTimeout(timeoutId.current);
                    }
                    function onKeyDownOpen(e) {
                        e = e || window.event;
                        switch (e.key) {
                          case ESCAPE:
                            if (!props.disableCloseOnEsc) {
                                close();
                                (0, _helpersDom.focusOnMenuButton)();
                            }
                            break;

                          case ARROW_DOWN:
                            (0, _helpersDom.focusOnNextMenuItem)();
                            break;

                          case ARROW_UP:
                            (0, _helpersDom.focusOnPreviousMenuItem)();
                            break;

                          case HOME:
                            (0, _helpersDom.focusOnFirstMenuItem)();
                            break;

                          case END:
                            (0, _helpersDom.focusOnLastMenuItem)();
                            break;
                        }
                    }
                    function onKeyDownClosed(e) {
                        e = e || window.event;
                        if (e.target === document.getElementById("react-burger-menu-btn")) switch (e.key) {
                          case ARROW_DOWN:
                          case SPACE:
                            toggleMenu();
                            break;

                          case ARROW_UP:
                            toggleMenu({
                                focusOnLastItem: true
                            });
                            break;
                        }
                    }
                    function handleOverlayClick() {
                        if (props.disableOverlayClick === true || typeof props.disableOverlayClick === "function" && props.disableOverlayClick()) return; else close();
                    }
                    return _react2["default"].createElement("div", null, !props.noOverlay && _react2["default"].createElement("div", {
                        className: ("bm-overlay " + props.overlayClassName).trim(),
                        onClick: handleOverlayClick,
                        style: getStyles("overlay")
                    }), props.customBurgerIcon !== false && _react2["default"].createElement("div", {
                        style: getStyles("burgerIcon")
                    }, _react2["default"].createElement(_componentsBurgerIcon2["default"], {
                        onClick: open,
                        styles: props.styles,
                        customIcon: props.customBurgerIcon,
                        className: props.burgerButtonClassName,
                        barClassName: props.burgerBarClassName,
                        onIconStateChange: props.onIconStateChange
                    })), _react2["default"].createElement("div", {
                        id: props.id,
                        className: ("bm-menu-wrap " + props.className).trim(),
                        style: getStyles("menuWrap"),
                        "aria-hidden": !isOpen
                    }, styles.svg && _react2["default"].createElement("div", {
                        id: "bm-morph-shape",
                        className: ("bm-morph-shape " + props.morphShapeClassName).trim(),
                        style: getStyles("morphShape")
                    }, _react2["default"].createElement("svg", {
                        width: "100%",
                        height: "100%",
                        viewBox: "0 0 100 800",
                        preserveAspectRatio: "none"
                    }, _react2["default"].createElement("path", {
                        d: styles.svg.pathInitial
                    }))), _react2["default"].createElement("div", {
                        className: ("bm-menu " + props.menuClassName).trim(),
                        style: getStyles("menu")
                    }, _react2["default"].createElement(props.itemListElement, {
                        className: ("bm-item-list " + props.itemListClassName).trim(),
                        style: getStyles("itemList")
                    }, _react2["default"].Children.map(props.children, (function(item, index) {
                        if (item) {
                            var classList = [ "bm-item", props.itemClassName, item.props.className ].filter((function(className) {
                                return !!className;
                            })).join(" ");
                            var extraProps = _extends({
                                key: index,
                                className: classList,
                                style: getStyles("item", index, item.props.style)
                            }, !isOpen && {
                                tabIndex: -1
                            });
                            return _react2["default"].cloneElement(item, extraProps);
                        }
                    })))), props.customCrossIcon !== false && _react2["default"].createElement("div", {
                        style: getStyles("closeButton")
                    }, _react2["default"].createElement(_componentsCrossIcon2["default"], {
                        onClick: close,
                        styles: props.styles,
                        customIcon: props.customCrossIcon,
                        className: props.crossButtonClassName,
                        crossClassName: props.crossClassName,
                        isOpen
                    }))));
                };
                Menu.propTypes = {
                    bodyClassName: _propTypes2["default"].string,
                    burgerBarClassName: _propTypes2["default"].string,
                    burgerButtonClassName: _propTypes2["default"].string,
                    className: _propTypes2["default"].string,
                    crossButtonClassName: _propTypes2["default"].string,
                    crossClassName: _propTypes2["default"].string,
                    customBurgerIcon: _propTypes2["default"].oneOfType([ _propTypes2["default"].element, _propTypes2["default"].oneOf([ false ]) ]),
                    customCrossIcon: _propTypes2["default"].oneOfType([ _propTypes2["default"].element, _propTypes2["default"].oneOf([ false ]) ]),
                    customOnKeyDown: _propTypes2["default"].func,
                    disableAutoFocus: _propTypes2["default"].bool,
                    disableCloseOnEsc: _propTypes2["default"].bool,
                    disableOverlayClick: _propTypes2["default"].oneOfType([ _propTypes2["default"].bool, _propTypes2["default"].func ]),
                    htmlClassName: _propTypes2["default"].string,
                    id: _propTypes2["default"].string,
                    isOpen: _propTypes2["default"].bool,
                    itemClassName: _propTypes2["default"].string,
                    itemListClassName: _propTypes2["default"].string,
                    itemListElement: _propTypes2["default"].oneOf([ "div", "nav" ]),
                    menuClassName: _propTypes2["default"].string,
                    morphShapeClassName: _propTypes2["default"].string,
                    noOverlay: _propTypes2["default"].bool,
                    noTransition: _propTypes2["default"].bool,
                    onClose: _propTypes2["default"].func,
                    onIconHoverChange: _propTypes2["default"].func,
                    onOpen: _propTypes2["default"].func,
                    onStateChange: _propTypes2["default"].func,
                    outerContainerId: styles && styles.outerContainer ? _propTypes2["default"].string.isRequired : _propTypes2["default"].string,
                    overlayClassName: _propTypes2["default"].string,
                    pageWrapId: styles && styles.pageWrap ? _propTypes2["default"].string.isRequired : _propTypes2["default"].string,
                    right: _propTypes2["default"].bool,
                    styles: _propTypes2["default"].object,
                    width: _propTypes2["default"].oneOfType([ _propTypes2["default"].number, _propTypes2["default"].string ])
                };
                Menu.defaultProps = {
                    bodyClassName: "",
                    burgerBarClassName: "",
                    burgerButtonClassName: "",
                    className: "",
                    crossButtonClassName: "",
                    crossClassName: "",
                    disableAutoFocus: false,
                    disableCloseOnEsc: false,
                    htmlClassName: "",
                    id: "",
                    itemClassName: "",
                    itemListClassName: "",
                    menuClassName: "",
                    morphShapeClassName: "",
                    noOverlay: false,
                    noTransition: false,
                    onStateChange: function onStateChange() {},
                    outerContainerId: "",
                    overlayClassName: "",
                    pageWrapId: "",
                    styles: {},
                    width: 300,
                    onIconHoverChange: function onIconHoverChange() {},
                    itemListElement: "nav"
                };
                return Menu;
            };
            module.exports = exports["default"];
        },
        760: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            var _helpersSnapsvgImporter = __webpack_require__(978);
            var _helpersSnapsvgImporter2 = _interopRequireDefault(_helpersSnapsvgImporter);
            var _menuFactory = __webpack_require__(126);
            var _menuFactory2 = _interopRequireDefault(_menuFactory);
            var _helpersUtils = __webpack_require__(539);
            var BUBBLE_WIDTH = 140;
            var styles = {
                svg: {
                    lib: _helpersSnapsvgImporter2["default"],
                    pathInitial: "M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z",
                    pathOpen: "M-7.312,0H15c0,0,66,113.339,66,399.5C81,664.006,15,800,15,800H-7.312V0z;M-7.312,0H100c0,0,0,113.839,0,400c0,264.506,0,400,0,400H-7.312V0z",
                    animate: function animate(path) {
                        var pos = 0;
                        var steps = this.pathOpen.split(";");
                        var stepsTotal = steps.length;
                        var mina = window.mina;
                        var nextStep = function nextStep() {
                            if (pos > stepsTotal - 1) return;
                            path.animate({
                                path: steps[pos]
                            }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, (function() {
                                nextStep();
                            }));
                            pos++;
                        };
                        nextStep();
                    }
                },
                morphShape: function morphShape(isOpen, width, right) {
                    return {
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        right: right ? "inherit" : 0,
                        left: right ? 0 : "inherit",
                        MozTransform: right ? "rotateY(180deg)" : "rotateY(0deg)",
                        MsTransform: right ? "rotateY(180deg)" : "rotateY(0deg)",
                        OTransform: right ? "rotateY(180deg)" : "rotateY(0deg)",
                        WebkitTransform: right ? "rotateY(180deg)" : "rotateY(0deg)",
                        transform: right ? "rotateY(180deg)" : "rotateY(0deg)"
                    };
                },
                menuWrap: function menuWrap(isOpen, width, right) {
                    return {
                        MozTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        MsTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        OTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        WebkitTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        transform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        transition: isOpen ? "transform 0.4s 0s" : "transform 0.4s"
                    };
                },
                menu: function menu(isOpen, width, right) {
                    var finalWidth = (0, _helpersUtils.pxToNum)(width) - BUBBLE_WIDTH;
                    return {
                        position: "fixed",
                        MozTransform: isOpen ? "" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        MsTransform: isOpen ? "" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        OTransform: isOpen ? "" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        WebkitTransform: isOpen ? "" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        transform: isOpen ? "" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        transition: isOpen ? "opacity 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27)" : "opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)",
                        opacity: isOpen ? 1 : 0
                    };
                },
                item: function item(isOpen, width, right, nthChild) {
                    var finalWidth = (0, _helpersUtils.pxToNum)(width) - BUBBLE_WIDTH;
                    return {
                        MozTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        MsTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        OTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        WebkitTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        transform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        transition: isOpen ? "opacity 0.3s 0.4s, transform 0.3s 0.4s" : "opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)",
                        opacity: isOpen ? 1 : 0
                    };
                },
                closeButton: function closeButton(isOpen, width, right) {
                    var finalWidth = (0, _helpersUtils.pxToNum)(width) - BUBBLE_WIDTH;
                    return {
                        MozTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        MsTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        OTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        WebkitTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        transform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(" + finalWidth + ", 0, 0)" : "translate3d(-" + finalWidth + ", 0, 0)",
                        transition: isOpen ? "opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)" : "opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)",
                        opacity: isOpen ? 1 : 0
                    };
                }
            };
            exports["default"] = (0, _menuFactory2["default"])(styles);
            module.exports = exports["default"];
        },
        996: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            var _helpersSnapsvgImporter = __webpack_require__(978);
            var _helpersSnapsvgImporter2 = _interopRequireDefault(_helpersSnapsvgImporter);
            var _menuFactory = __webpack_require__(126);
            var _menuFactory2 = _interopRequireDefault(_menuFactory);
            var _helpersUtils = __webpack_require__(539);
            var MORPH_SHAPE_WIDTH = 120;
            var styles = {
                svg: {
                    lib: _helpersSnapsvgImporter2["default"],
                    pathInitial: "M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z",
                    pathOpen: "M-1,0h101c0,0,0-1,0,395c0,404,0,405,0,405H-1V0z",
                    animate: function animate(path) {
                        path.animate({
                            path: this.pathOpen
                        }, 400, window.mina.easeinout);
                    }
                },
                morphShape: function morphShape(isOpen, width, right) {
                    return {
                        position: "absolute",
                        width: MORPH_SHAPE_WIDTH,
                        height: "100%",
                        right: right ? "inherit" : 0,
                        left: right ? 0 : "inherit",
                        MozTransform: right ? "rotateY(180deg)" : "",
                        MsTransform: right ? "rotateY(180deg)" : "",
                        OTransform: right ? "rotateY(180deg)" : "",
                        WebkitTransform: right ? "rotateY(180deg)" : "",
                        transform: right ? "rotateY(180deg)" : ""
                    };
                },
                menuWrap: function menuWrap(isOpen, width, right) {
                    return {
                        MozTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        MsTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        OTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        WebkitTransform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        transform: isOpen ? "translate3d(0, 0, 0)" : right ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)",
                        transition: "all 0.3s"
                    };
                },
                menu: function menu(isOpen, width, right) {
                    return {
                        position: "fixed",
                        right: right ? 0 : "inherit",
                        width: (0, _helpersUtils.pxToNum)(width) - MORPH_SHAPE_WIDTH,
                        whiteSpace: "nowrap",
                        boxSizing: "border-box",
                        overflow: "visible"
                    };
                },
                itemList: function itemList(isOpen, width, right) {
                    if (right) return {
                        position: "relative",
                        left: "-110px",
                        width: "170%",
                        overflow: "auto"
                    };
                },
                pageWrap: function pageWrap(isOpen, width, right) {
                    return {
                        MozTransform: isOpen ? "" : right ? "translate3d(-100px, 0, 0)" : "translate3d(100px, 0, 0)",
                        MsTransform: isOpen ? "" : right ? "translate3d(-100px, 0, 0)" : "translate3d(100px, 0, 0)",
                        OTransform: isOpen ? "" : right ? "translate3d(-100px, 0, 0)" : "translate3d(100px, 0, 0)",
                        WebkitTransform: isOpen ? "" : right ? "translate3d(-100px, 0, 0)" : "translate3d(100px, 0, 0)",
                        transform: isOpen ? "" : right ? "translate3d(-100px, 0, 0)" : "translate3d(100px, 0, 0)",
                        transition: isOpen ? "all 0.3s" : "all 0.3s 0.1s"
                    };
                },
                outerContainer: function outerContainer(isOpen) {
                    return {
                        overflow: isOpen ? "" : "hidden"
                    };
                }
            };
            exports["default"] = (0, _menuFactory2["default"])(styles);
            module.exports = exports["default"];
        },
        576: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            var _menuFactory = __webpack_require__(126);
            var _menuFactory2 = _interopRequireDefault(_menuFactory);
            var styles = {
                menuWrap: function menuWrap(isOpen) {
                    return {
                        MozTransform: isOpen ? "" : "translate3d(0, -100%, 0)",
                        MsTransform: isOpen ? "" : "translate3d(0, -100%, 0)",
                        OTransform: isOpen ? "" : "translate3d(0, -100%, 0)",
                        WebkitTransform: isOpen ? "" : "translate3d(0, -100%, 0)",
                        transform: isOpen ? "" : "translate3d(0, -100%, 0)",
                        transition: "all 0.5s ease-in-out"
                    };
                },
                pageWrap: function pageWrap(isOpen, width, right) {
                    return {
                        MozTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        MsTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        OTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        WebkitTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        transform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        transition: "all 0.5s"
                    };
                },
                outerContainer: function outerContainer(isOpen) {
                    return {
                        perspective: "1500px",
                        perspectiveOrigin: "0% 50%",
                        overflow: isOpen ? "" : "hidden"
                    };
                }
            };
            exports["default"] = (0, _menuFactory2["default"])(styles);
            module.exports = exports["default"];
        },
        976: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            var _menuFactory = __webpack_require__(126);
            var _menuFactory2 = _interopRequireDefault(_menuFactory);
            var styles = {
                pageWrap: function pageWrap(isOpen, width, right) {
                    return {
                        MozTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        MsTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        OTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        WebkitTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        transform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        transition: "all 0.5s"
                    };
                },
                outerContainer: function outerContainer(isOpen) {
                    return {
                        overflow: isOpen ? "" : "hidden"
                    };
                }
            };
            exports["default"] = (0, _menuFactory2["default"])(styles);
            module.exports = exports["default"];
        },
        796: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            var _menuFactory = __webpack_require__(126);
            var _menuFactory2 = _interopRequireDefault(_menuFactory);
            var styles = {
                pageWrap: function pageWrap(isOpen, width, right) {
                    return {
                        MozTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0) rotateY(15deg)" : "translate3d(" + width + ", 0, 0) rotateY(-15deg)",
                        MsTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0) rotateY(15deg)" : "translate3d(" + width + ", 0, 0) rotateY(-15deg)",
                        OTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0) rotateY(15deg)" : "translate3d(" + width + ", 0, 0) rotateY(-15deg)",
                        WebkitTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0) rotateY(15deg)" : "translate3d(" + width + ", 0, 0) rotateY(-15deg)",
                        transform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0) rotateY(15deg)" : "translate3d(" + width + ", 0, 0) rotateY(-15deg)",
                        transformOrigin: right ? "100% 50%" : "0% 50%",
                        transformStyle: "preserve-3d",
                        transition: "all 0.5s"
                    };
                },
                outerContainer: function outerContainer(isOpen) {
                    return {
                        perspective: "1500px",
                        overflow: isOpen ? "" : "hidden"
                    };
                }
            };
            exports["default"] = (0, _menuFactory2["default"])(styles);
            module.exports = exports["default"];
        },
        523: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            var _menuFactory = __webpack_require__(126);
            var _menuFactory2 = _interopRequireDefault(_menuFactory);
            var styles = {
                menuWrap: function menuWrap(isOpen, width, right) {
                    return {
                        MozTransform: "translate3d(0, 0, 0)",
                        MsTransform: "translate3d(0, 0, 0)",
                        OTransform: "translate3d(0, 0, 0)",
                        WebkitTransform: "translate3d(0, 0, 0)",
                        transform: "translate3d(0, 0, 0)",
                        zIndex: isOpen ? 1e3 : -1
                    };
                },
                overlay: function overlay(isOpen, width, right) {
                    return {
                        zIndex: 1400,
                        MozTransform: isOpen ? right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)" : "translate3d(0, 0, 0)",
                        MsTransform: isOpen ? right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)" : "translate3d(0, 0, 0)",
                        OTransform: isOpen ? right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)" : "translate3d(0, 0, 0)",
                        WebkitTransform: isOpen ? right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)" : "translate3d(0, 0, 0)",
                        transform: isOpen ? right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)" : "translate3d(0, 0, 0)",
                        transition: "all 0.5s",
                        visibility: isOpen ? "visible" : "hidden"
                    };
                },
                pageWrap: function pageWrap(isOpen, width, right) {
                    return {
                        MozTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        MsTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        OTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        WebkitTransform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        transform: isOpen ? "" : right ? "translate3d(-" + width + ", 0, 0)" : "translate3d(" + width + ", 0, 0)",
                        transition: "all 0.5s",
                        zIndex: 1200,
                        position: "relative"
                    };
                },
                burgerIcon: function burgerIcon(isOpen, width, right) {
                    return {
                        MozTransform: isOpen ? right ? "translate3d(" + width + ", 0, 0)" : "translate3d(-" + width + ", 0, 0)" : "translate3d(0, 0, 0)",
                        MsTransform: isOpen ? right ? "translate3d(" + width + ", 0, 0)" : "translate3d(-" + width + ", 0, 0)" : "translate3d(0, 0, 0)",
                        OTransform: isOpen ? right ? "translate3d(" + width + ", 0, 0)" : "translate3d(-" + width + ", 0, 0)" : "translate3d(0, 0, 0)",
                        WebkitTransform: isOpen ? right ? "translate3d(" + width + ", 0, 0)" : "translate3d(-" + width + ", 0, 0)" : "translate3d(0, 0, 0)",
                        transform: isOpen ? right ? "translate3d(" + width + ", 0, 0)" : "translate3d(-" + width + ", 0, 0)" : "translate3d(0, 0, 0)",
                        transition: "all 0.1s",
                        position: "relative",
                        zIndex: 1300
                    };
                },
                outerContainer: function outerContainer(isOpen) {
                    return {
                        overflow: isOpen ? "" : "hidden"
                    };
                }
            };
            exports["default"] = (0, _menuFactory2["default"])(styles);
            module.exports = exports["default"];
        },
        70: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            var _menuFactory = __webpack_require__(126);
            var _menuFactory2 = _interopRequireDefault(_menuFactory);
            var styles = {
                pageWrap: function pageWrap(isOpen, width) {
                    return {
                        MozTransform: isOpen ? "" : "translate3d(0, 0, -" + width + ")",
                        MsTransform: isOpen ? "" : "translate3d(0, 0, -" + width + ")",
                        OTransform: isOpen ? "" : "translate3d(0, 0, -" + width + ")",
                        WebkitTransform: isOpen ? "" : "translate3d(0, 0, -" + width + ")",
                        transform: isOpen ? "" : "translate3d(0, 0, -" + width + ")",
                        transformOrigin: "100%",
                        transformStyle: "preserve-3d",
                        transition: "all 0.5s"
                    };
                },
                outerContainer: function outerContainer() {
                    return {
                        perspective: "1500px"
                    };
                }
            };
            exports["default"] = (0, _menuFactory2["default"])(styles);
            module.exports = exports["default"];
        },
        1: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            var _menuFactory = __webpack_require__(126);
            var _menuFactory2 = _interopRequireDefault(_menuFactory);
            var styles = {
                pageWrap: function pageWrap(isOpen, width, right) {
                    return {
                        MozTransform: isOpen ? "" : right ? "translate3d(-100px, 0, -600px) rotateY(20deg)" : "translate3d(100px, 0, -600px) rotateY(-20deg)",
                        MsTransform: isOpen ? "" : right ? "translate3d(-100px, 0, -600px) rotateY(20deg)" : "translate3d(100px, 0, -600px) rotateY(-20deg)",
                        OTransform: isOpen ? "" : right ? "translate3d(-100px, 0, -600px) rotateY(20deg)" : "translate3d(100px, 0, -600px) rotateY(-20deg)",
                        WebkitTransform: isOpen ? "" : right ? "translate3d(-100px, 0, -600px) rotateY(20deg)" : "translate3d(100px, 0, -600px) rotateY(-20deg)",
                        transform: isOpen ? "" : right ? "translate3d(-100px, 0, -600px) rotateY(20deg)" : "translate3d(100px, 0, -600px) rotateY(-20deg)",
                        transformStyle: "preserve-3d",
                        transition: "all 0.5s",
                        overflow: isOpen ? "" : "hidden"
                    };
                },
                outerContainer: function outerContainer(isOpen) {
                    return {
                        perspective: "1500px",
                        overflow: isOpen ? "" : "hidden"
                    };
                }
            };
            exports["default"] = (0, _menuFactory2["default"])(styles);
            module.exports = exports["default"];
        },
        432: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            var _menuFactory = __webpack_require__(126);
            var _menuFactory2 = _interopRequireDefault(_menuFactory);
            var styles = {};
            exports["default"] = (0, _menuFactory2["default"])(styles);
            module.exports = exports["default"];
        },
        277: (module, exports, __webpack_require__) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            var _menuFactory = __webpack_require__(126);
            var _menuFactory2 = _interopRequireDefault(_menuFactory);
            var styles = {
                menuWrap: function menuWrap(isOpen, width, right) {
                    return {
                        MozTransform: isOpen ? "" : right ? "translate3d(" + width + ", 0, 0)" : "translate3d(-" + width + ", 0, 0)",
                        MsTransform: isOpen ? "" : right ? "translate3d(" + width + ", 0, 0)" : "translate3d(-" + width + ", 0, 0)",
                        OTransform: isOpen ? "" : right ? "translate3d(" + width + ", 0, 0)" : "translate3d(-" + width + ", 0, 0)",
                        WebkitTransform: isOpen ? "" : right ? "translate3d(" + width + ", 0, 0)" : "translate3d(-" + width + ", 0, 0)",
                        transform: isOpen ? "" : right ? "translate3d(" + width + ", 0, 0)" : "translate3d(-" + width + ", 0, 0)",
                        transition: isOpen ? "transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)" : "transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)"
                    };
                },
                item: function item(isOpen, width, right, nthChild) {
                    return {
                        MozTransform: isOpen ? "" : "translate3d(0, " + nthChild * 500 + "px, 0)",
                        MsTransform: isOpen ? "" : "translate3d(0, " + nthChild * 500 + "px, 0)",
                        OTransform: isOpen ? "" : "translate3d(0, " + nthChild * 500 + "px, 0)",
                        WebkitTransform: isOpen ? "" : "translate3d(0, " + nthChild * 500 + "px, 0)",
                        transform: isOpen ? "" : "translate3d(0, " + nthChild * 500 + "px, 0)",
                        transition: isOpen ? "transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)" : "transform 0s 0.2s cubic-bezier(0.7, 0, 0.3, 1)"
                    };
                }
            };
            exports["default"] = (0, _menuFactory2["default"])(styles);
            module.exports = exports["default"];
        },
        448: (__unused_webpack_module, exports, __webpack_require__) => {
            "use strict";
            /**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */            var aa = __webpack_require__(294), ca = __webpack_require__(840);
            function p(a) {
                for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
                return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
            }
            var da = new Set, ea = {};
            function fa(a, b) {
                ha(a, b);
                ha(a + "Capture", b);
            }
            function ha(a, b) {
                ea[a] = b;
                for (a = 0; a < b.length; a++) da.add(b[a]);
            }
            var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
            function oa(a) {
                if (ja.call(ma, a)) return !0;
                if (ja.call(la, a)) return !1;
                if (ka.test(a)) return ma[a] = !0;
                la[a] = !0;
                return !1;
            }
            function pa(a, b, c, d) {
                if (null !== c && 0 === c.type) return !1;
                switch (typeof b) {
                  case "function":
                  case "symbol":
                    return !0;

                  case "boolean":
                    if (d) return !1;
                    if (null !== c) return !c.acceptsBooleans;
                    a = a.toLowerCase().slice(0, 5);
                    return "data-" !== a && "aria-" !== a;

                  default:
                    return !1;
                }
            }
            function qa(a, b, c, d) {
                if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return !0;
                if (d) return !1;
                if (null !== c) switch (c.type) {
                  case 3:
                    return !b;

                  case 4:
                    return !1 === b;

                  case 5:
                    return isNaN(b);

                  case 6:
                    return isNaN(b) || 1 > b;
                }
                return !1;
            }
            function v(a, b, c, d, e, f, g) {
                this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
                this.attributeName = d;
                this.attributeNamespace = e;
                this.mustUseProperty = c;
                this.propertyName = a;
                this.type = b;
                this.sanitizeURL = f;
                this.removeEmptyString = g;
            }
            var z = {};
            "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(a) {
                z[a] = new v(a, 0, !1, a, null, !1, !1);
            }));
            [ [ "acceptCharset", "accept-charset" ], [ "className", "class" ], [ "htmlFor", "for" ], [ "httpEquiv", "http-equiv" ] ].forEach((function(a) {
                var b = a[0];
                z[b] = new v(b, 1, !1, a[1], null, !1, !1);
            }));
            [ "contentEditable", "draggable", "spellCheck", "value" ].forEach((function(a) {
                z[a] = new v(a, 2, !1, a.toLowerCase(), null, !1, !1);
            }));
            [ "autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha" ].forEach((function(a) {
                z[a] = new v(a, 2, !1, a, null, !1, !1);
            }));
            "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(a) {
                z[a] = new v(a, 3, !1, a.toLowerCase(), null, !1, !1);
            }));
            [ "checked", "multiple", "muted", "selected" ].forEach((function(a) {
                z[a] = new v(a, 3, !0, a, null, !1, !1);
            }));
            [ "capture", "download" ].forEach((function(a) {
                z[a] = new v(a, 4, !1, a, null, !1, !1);
            }));
            [ "cols", "rows", "size", "span" ].forEach((function(a) {
                z[a] = new v(a, 6, !1, a, null, !1, !1);
            }));
            [ "rowSpan", "start" ].forEach((function(a) {
                z[a] = new v(a, 5, !1, a.toLowerCase(), null, !1, !1);
            }));
            var ra = /[\-:]([a-z])/g;
            function sa(a) {
                return a[1].toUpperCase();
            }
            "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(a) {
                var b = a.replace(ra, sa);
                z[b] = new v(b, 1, !1, a, null, !1, !1);
            }));
            "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(a) {
                var b = a.replace(ra, sa);
                z[b] = new v(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
            }));
            [ "xml:base", "xml:lang", "xml:space" ].forEach((function(a) {
                var b = a.replace(ra, sa);
                z[b] = new v(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
            }));
            [ "tabIndex", "crossOrigin" ].forEach((function(a) {
                z[a] = new v(a, 1, !1, a.toLowerCase(), null, !1, !1);
            }));
            z.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
            [ "src", "href", "action", "formAction" ].forEach((function(a) {
                z[a] = new v(a, 1, !1, a.toLowerCase(), null, !0, !0);
            }));
            function ta(a, b, c, d) {
                var e = z.hasOwnProperty(b) ? z[b] : null;
                if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), 
                d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, 
                d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, 
                d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
            }
            var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
            Symbol.for("react.scope");
            Symbol.for("react.debug_trace_mode");
            var Ia = Symbol.for("react.offscreen");
            Symbol.for("react.legacy_hidden");
            Symbol.for("react.cache");
            Symbol.for("react.tracing_marker");
            var Ja = Symbol.iterator;
            function Ka(a) {
                if (null === a || "object" !== typeof a) return null;
                a = Ja && a[Ja] || a["@@iterator"];
                return "function" === typeof a ? a : null;
            }
            var La, A = Object.assign;
            function Ma(a) {
                if (void 0 === La) try {
                    throw Error();
                } catch (c) {
                    var b = c.stack.trim().match(/\n( *(at )?)/);
                    La = b && b[1] || "";
                }
                return "\n" + La + a;
            }
            var Na = !1;
            function Oa(a, b) {
                if (!a || Na) return "";
                Na = !0;
                var c = Error.prepareStackTrace;
                Error.prepareStackTrace = void 0;
                try {
                    if (b) if (b = function() {
                        throw Error();
                    }, Object.defineProperty(b.prototype, "props", {
                        set: function() {
                            throw Error();
                        }
                    }), "object" === typeof Reflect && Reflect.construct) {
                        try {
                            Reflect.construct(b, []);
                        } catch (l) {
                            var d = l;
                        }
                        Reflect.construct(a, [], b);
                    } else {
                        try {
                            b.call();
                        } catch (l) {
                            d = l;
                        }
                        a.call(b.prototype);
                    } else {
                        try {
                            throw Error();
                        } catch (l) {
                            d = l;
                        }
                        a();
                    }
                } catch (l) {
                    if (l && d && "string" === typeof l.stack) {
                        for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
                        for (;1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
                            if (1 !== g || 1 !== h) do {
                                if (g--, h--, 0 > h || e[g] !== f[h]) {
                                    var k = "\n" + e[g].replace(" at new ", " at ");
                                    a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                                    return k;
                                }
                            } while (1 <= g && 0 <= h);
                            break;
                        }
                    }
                } finally {
                    Na = !1, Error.prepareStackTrace = c;
                }
                return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
            }
            function Pa(a) {
                switch (a.tag) {
                  case 5:
                    return Ma(a.type);

                  case 16:
                    return Ma("Lazy");

                  case 13:
                    return Ma("Suspense");

                  case 19:
                    return Ma("SuspenseList");

                  case 0:
                  case 2:
                  case 15:
                    return a = Oa(a.type, !1), a;

                  case 11:
                    return a = Oa(a.type.render, !1), a;

                  case 1:
                    return a = Oa(a.type, !0), a;

                  default:
                    return "";
                }
            }
            function Qa(a) {
                if (null == a) return null;
                if ("function" === typeof a) return a.displayName || a.name || null;
                if ("string" === typeof a) return a;
                switch (a) {
                  case ya:
                    return "Fragment";

                  case wa:
                    return "Portal";

                  case Aa:
                    return "Profiler";

                  case za:
                    return "StrictMode";

                  case Ea:
                    return "Suspense";

                  case Fa:
                    return "SuspenseList";
                }
                if ("object" === typeof a) switch (a.$$typeof) {
                  case Ca:
                    return (a.displayName || "Context") + ".Consumer";

                  case Ba:
                    return (a._context.displayName || "Context") + ".Provider";

                  case Da:
                    var b = a.render;
                    a = a.displayName;
                    a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
                    return a;

                  case Ga:
                    return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";

                  case Ha:
                    b = a._payload;
                    a = a._init;
                    try {
                        return Qa(a(b));
                    } catch (c) {}
                }
                return null;
            }
            function Ra(a) {
                var b = a.type;
                switch (a.tag) {
                  case 24:
                    return "Cache";

                  case 9:
                    return (b.displayName || "Context") + ".Consumer";

                  case 10:
                    return (b._context.displayName || "Context") + ".Provider";

                  case 18:
                    return "DehydratedFragment";

                  case 11:
                    return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");

                  case 7:
                    return "Fragment";

                  case 5:
                    return b;

                  case 4:
                    return "Portal";

                  case 3:
                    return "Root";

                  case 6:
                    return "Text";

                  case 16:
                    return Qa(b);

                  case 8:
                    return b === za ? "StrictMode" : "Mode";

                  case 22:
                    return "Offscreen";

                  case 12:
                    return "Profiler";

                  case 21:
                    return "Scope";

                  case 13:
                    return "Suspense";

                  case 19:
                    return "SuspenseList";

                  case 25:
                    return "TracingMarker";

                  case 1:
                  case 0:
                  case 17:
                  case 2:
                  case 14:
                  case 15:
                    if ("function" === typeof b) return b.displayName || b.name || null;
                    if ("string" === typeof b) return b;
                }
                return null;
            }
            function Sa(a) {
                switch (typeof a) {
                  case "boolean":
                  case "number":
                  case "string":
                  case "undefined":
                    return a;

                  case "object":
                    return a;

                  default:
                    return "";
                }
            }
            function Ta(a) {
                var b = a.type;
                return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
            }
            function Ua(a) {
                var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
                if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
                    var e = c.get, f = c.set;
                    Object.defineProperty(a, b, {
                        configurable: !0,
                        get: function() {
                            return e.call(this);
                        },
                        set: function(a) {
                            d = "" + a;
                            f.call(this, a);
                        }
                    });
                    Object.defineProperty(a, b, {
                        enumerable: c.enumerable
                    });
                    return {
                        getValue: function() {
                            return d;
                        },
                        setValue: function(a) {
                            d = "" + a;
                        },
                        stopTracking: function() {
                            a._valueTracker = null;
                            delete a[b];
                        }
                    };
                }
            }
            function Va(a) {
                a._valueTracker || (a._valueTracker = Ua(a));
            }
            function Wa(a) {
                if (!a) return !1;
                var b = a._valueTracker;
                if (!b) return !0;
                var c = b.getValue();
                var d = "";
                a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
                a = d;
                return a !== c ? (b.setValue(a), !0) : !1;
            }
            function Xa(a) {
                a = a || ("undefined" !== typeof document ? document : void 0);
                if ("undefined" === typeof a) return null;
                try {
                    return a.activeElement || a.body;
                } catch (b) {
                    return a.body;
                }
            }
            function Ya(a, b) {
                var c = b.checked;
                return A({}, b, {
                    defaultChecked: void 0,
                    defaultValue: void 0,
                    value: void 0,
                    checked: null != c ? c : a._wrapperState.initialChecked
                });
            }
            function Za(a, b) {
                var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
                c = Sa(null != b.value ? b.value : c);
                a._wrapperState = {
                    initialChecked: d,
                    initialValue: c,
                    controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
                };
            }
            function ab(a, b) {
                b = b.checked;
                null != b && ta(a, "checked", b, !1);
            }
            function bb(a, b) {
                ab(a, b);
                var c = Sa(b.value), d = b.type;
                if (null != c) if ("number" === d) {
                    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
                } else a.value !== "" + c && (a.value = "" + c); else if ("submit" === d || "reset" === d) {
                    a.removeAttribute("value");
                    return;
                }
                b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
                null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
            }
            function db(a, b, c) {
                if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
                    var d = b.type;
                    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
                    b = "" + a._wrapperState.initialValue;
                    c || b === a.value || (a.value = b);
                    a.defaultValue = b;
                }
                c = a.name;
                "" !== c && (a.name = "");
                a.defaultChecked = !!a._wrapperState.initialChecked;
                "" !== c && (a.name = c);
            }
            function cb(a, b, c) {
                if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
            }
            var eb = Array.isArray;
            function fb(a, b, c, d) {
                a = a.options;
                if (b) {
                    b = {};
                    for (var e = 0; e < c.length; e++) b["$" + c[e]] = !0;
                    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), 
                    e && d && (a[c].defaultSelected = !0);
                } else {
                    c = "" + Sa(c);
                    b = null;
                    for (e = 0; e < a.length; e++) {
                        if (a[e].value === c) {
                            a[e].selected = !0;
                            d && (a[e].defaultSelected = !0);
                            return;
                        }
                        null !== b || a[e].disabled || (b = a[e]);
                    }
                    null !== b && (b.selected = !0);
                }
            }
            function gb(a, b) {
                if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
                return A({}, b, {
                    value: void 0,
                    defaultValue: void 0,
                    children: "" + a._wrapperState.initialValue
                });
            }
            function hb(a, b) {
                var c = b.value;
                if (null == c) {
                    c = b.children;
                    b = b.defaultValue;
                    if (null != c) {
                        if (null != b) throw Error(p(92));
                        if (eb(c)) {
                            if (1 < c.length) throw Error(p(93));
                            c = c[0];
                        }
                        b = c;
                    }
                    null == b && (b = "");
                    c = b;
                }
                a._wrapperState = {
                    initialValue: Sa(c)
                };
            }
            function ib(a, b) {
                var c = Sa(b.value), d = Sa(b.defaultValue);
                null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
                null != d && (a.defaultValue = "" + d);
            }
            function jb(a) {
                var b = a.textContent;
                b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
            }
            function kb(a) {
                switch (a) {
                  case "svg":
                    return "http://www.w3.org/2000/svg";

                  case "math":
                    return "http://www.w3.org/1998/Math/MathML";

                  default:
                    return "http://www.w3.org/1999/xhtml";
                }
            }
            function lb(a, b) {
                return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
            }
            var mb, nb = function(a) {
                return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
                    MSApp.execUnsafeLocalFunction((function() {
                        return a(b, c, d, e);
                    }));
                } : a;
            }((function(a, b) {
                if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b; else {
                    mb = mb || document.createElement("div");
                    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
                    for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
                    for (;b.firstChild; ) a.appendChild(b.firstChild);
                }
            }));
            function ob(a, b) {
                if (b) {
                    var c = a.firstChild;
                    if (c && c === a.lastChild && 3 === c.nodeType) {
                        c.nodeValue = b;
                        return;
                    }
                }
                a.textContent = b;
            }
            var pb = {
                animationIterationCount: !0,
                aspectRatio: !0,
                borderImageOutset: !0,
                borderImageSlice: !0,
                borderImageWidth: !0,
                boxFlex: !0,
                boxFlexGroup: !0,
                boxOrdinalGroup: !0,
                columnCount: !0,
                columns: !0,
                flex: !0,
                flexGrow: !0,
                flexPositive: !0,
                flexShrink: !0,
                flexNegative: !0,
                flexOrder: !0,
                gridArea: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowSpan: !0,
                gridRowStart: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnSpan: !0,
                gridColumnStart: !0,
                fontWeight: !0,
                lineClamp: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                tabSize: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0,
                fillOpacity: !0,
                floodOpacity: !0,
                stopOpacity: !0,
                strokeDasharray: !0,
                strokeDashoffset: !0,
                strokeMiterlimit: !0,
                strokeOpacity: !0,
                strokeWidth: !0
            }, qb = [ "Webkit", "ms", "Moz", "O" ];
            Object.keys(pb).forEach((function(a) {
                qb.forEach((function(b) {
                    b = b + a.charAt(0).toUpperCase() + a.substring(1);
                    pb[b] = pb[a];
                }));
            }));
            function rb(a, b, c) {
                return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
            }
            function sb(a, b) {
                a = a.style;
                for (var c in b) if (b.hasOwnProperty(c)) {
                    var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
                    "float" === c && (c = "cssFloat");
                    d ? a.setProperty(c, e) : a[c] = e;
                }
            }
            var tb = A({
                menuitem: !0
            }, {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                embed: !0,
                hr: !0,
                img: !0,
                input: !0,
                keygen: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0
            });
            function ub(a, b) {
                if (b) {
                    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
                    if (null != b.dangerouslySetInnerHTML) {
                        if (null != b.children) throw Error(p(60));
                        if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
                    }
                    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
                }
            }
            function vb(a, b) {
                if (-1 === a.indexOf("-")) return "string" === typeof b.is;
                switch (a) {
                  case "annotation-xml":
                  case "color-profile":
                  case "font-face":
                  case "font-face-src":
                  case "font-face-uri":
                  case "font-face-format":
                  case "font-face-name":
                  case "missing-glyph":
                    return !1;

                  default:
                    return !0;
                }
            }
            var wb = null;
            function xb(a) {
                a = a.target || a.srcElement || window;
                a.correspondingUseElement && (a = a.correspondingUseElement);
                return 3 === a.nodeType ? a.parentNode : a;
            }
            var yb = null, zb = null, Ab = null;
            function Bb(a) {
                if (a = Cb(a)) {
                    if ("function" !== typeof yb) throw Error(p(280));
                    var b = a.stateNode;
                    b && (b = Db(b), yb(a.stateNode, a.type, b));
                }
            }
            function Eb(a) {
                zb ? Ab ? Ab.push(a) : Ab = [ a ] : zb = a;
            }
            function Fb() {
                if (zb) {
                    var a = zb, b = Ab;
                    Ab = zb = null;
                    Bb(a);
                    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
                }
            }
            function Gb(a, b) {
                return a(b);
            }
            function Hb() {}
            var Ib = !1;
            function Jb(a, b, c) {
                if (Ib) return a(b, c);
                Ib = !0;
                try {
                    return Gb(a, b, c);
                } finally {
                    if (Ib = !1, null !== zb || null !== Ab) Hb(), Fb();
                }
            }
            function Kb(a, b) {
                var c = a.stateNode;
                if (null === c) return null;
                var d = Db(c);
                if (null === d) return null;
                c = d[b];
                a: switch (b) {
                  case "onClick":
                  case "onClickCapture":
                  case "onDoubleClick":
                  case "onDoubleClickCapture":
                  case "onMouseDown":
                  case "onMouseDownCapture":
                  case "onMouseMove":
                  case "onMouseMoveCapture":
                  case "onMouseUp":
                  case "onMouseUpCapture":
                  case "onMouseEnter":
                    (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
                    a = !d;
                    break a;

                  default:
                    a = !1;
                }
                if (a) return null;
                if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
                return c;
            }
            var Lb = !1;
            if (ia) try {
                var Mb = {};
                Object.defineProperty(Mb, "passive", {
                    get: function() {
                        Lb = !0;
                    }
                });
                window.addEventListener("test", Mb, Mb);
                window.removeEventListener("test", Mb, Mb);
            } catch (a) {
                Lb = !1;
            }
            function Nb(a, b, c, d, e, f, g, h, k) {
                var l = Array.prototype.slice.call(arguments, 3);
                try {
                    b.apply(c, l);
                } catch (m) {
                    this.onError(m);
                }
            }
            var Ob = !1, Pb = null, Qb = !1, Rb = null, Sb = {
                onError: function(a) {
                    Ob = !0;
                    Pb = a;
                }
            };
            function Tb(a, b, c, d, e, f, g, h, k) {
                Ob = !1;
                Pb = null;
                Nb.apply(Sb, arguments);
            }
            function Ub(a, b, c, d, e, f, g, h, k) {
                Tb.apply(this, arguments);
                if (Ob) {
                    if (Ob) {
                        var l = Pb;
                        Ob = !1;
                        Pb = null;
                    } else throw Error(p(198));
                    Qb || (Qb = !0, Rb = l);
                }
            }
            function Vb(a) {
                var b = a, c = a;
                if (a.alternate) for (;b.return; ) b = b.return; else {
                    a = b;
                    do {
                        b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
                    } while (a);
                }
                return 3 === b.tag ? c : null;
            }
            function Wb(a) {
                if (13 === a.tag) {
                    var b = a.memoizedState;
                    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
                    if (null !== b) return b.dehydrated;
                }
                return null;
            }
            function Xb(a) {
                if (Vb(a) !== a) throw Error(p(188));
            }
            function Yb(a) {
                var b = a.alternate;
                if (!b) {
                    b = Vb(a);
                    if (null === b) throw Error(p(188));
                    return b !== a ? null : a;
                }
                for (var c = a, d = b; ;) {
                    var e = c.return;
                    if (null === e) break;
                    var f = e.alternate;
                    if (null === f) {
                        d = e.return;
                        if (null !== d) {
                            c = d;
                            continue;
                        }
                        break;
                    }
                    if (e.child === f.child) {
                        for (f = e.child; f; ) {
                            if (f === c) return Xb(e), a;
                            if (f === d) return Xb(e), b;
                            f = f.sibling;
                        }
                        throw Error(p(188));
                    }
                    if (c.return !== d.return) c = e, d = f; else {
                        for (var g = !1, h = e.child; h; ) {
                            if (h === c) {
                                g = !0;
                                c = e;
                                d = f;
                                break;
                            }
                            if (h === d) {
                                g = !0;
                                d = e;
                                c = f;
                                break;
                            }
                            h = h.sibling;
                        }
                        if (!g) {
                            for (h = f.child; h; ) {
                                if (h === c) {
                                    g = !0;
                                    c = f;
                                    d = e;
                                    break;
                                }
                                if (h === d) {
                                    g = !0;
                                    d = f;
                                    c = e;
                                    break;
                                }
                                h = h.sibling;
                            }
                            if (!g) throw Error(p(189));
                        }
                    }
                    if (c.alternate !== d) throw Error(p(190));
                }
                if (3 !== c.tag) throw Error(p(188));
                return c.stateNode.current === c ? a : b;
            }
            function Zb(a) {
                a = Yb(a);
                return null !== a ? $b(a) : null;
            }
            function $b(a) {
                if (5 === a.tag || 6 === a.tag) return a;
                for (a = a.child; null !== a; ) {
                    var b = $b(a);
                    if (null !== b) return b;
                    a = a.sibling;
                }
                return null;
            }
            var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
            function mc(a) {
                if (lc && "function" === typeof lc.onCommitFiberRoot) try {
                    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
                } catch (b) {}
            }
            var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
            function nc(a) {
                a >>>= 0;
                return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
            }
            var rc = 64, sc = 4194304;
            function tc(a) {
                switch (a & -a) {
                  case 1:
                    return 1;

                  case 2:
                    return 2;

                  case 4:
                    return 4;

                  case 8:
                    return 8;

                  case 16:
                    return 16;

                  case 32:
                    return 32;

                  case 64:
                  case 128:
                  case 256:
                  case 512:
                  case 1024:
                  case 2048:
                  case 4096:
                  case 8192:
                  case 16384:
                  case 32768:
                  case 65536:
                  case 131072:
                  case 262144:
                  case 524288:
                  case 1048576:
                  case 2097152:
                    return a & 4194240;

                  case 4194304:
                  case 8388608:
                  case 16777216:
                  case 33554432:
                  case 67108864:
                    return a & 130023424;

                  case 134217728:
                    return 134217728;

                  case 268435456:
                    return 268435456;

                  case 536870912:
                    return 536870912;

                  case 1073741824:
                    return 1073741824;

                  default:
                    return a;
                }
            }
            function uc(a, b) {
                var c = a.pendingLanes;
                if (0 === c) return 0;
                var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
                if (0 !== g) {
                    var h = g & ~e;
                    0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
                } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
                if (0 === d) return 0;
                if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
                0 !== (d & 4) && (d |= c & 16);
                b = a.entangledLanes;
                if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, 
                d |= a[c], b &= ~e;
                return d;
            }
            function vc(a, b) {
                switch (a) {
                  case 1:
                  case 2:
                  case 4:
                    return b + 250;

                  case 8:
                  case 16:
                  case 32:
                  case 64:
                  case 128:
                  case 256:
                  case 512:
                  case 1024:
                  case 2048:
                  case 4096:
                  case 8192:
                  case 16384:
                  case 32768:
                  case 65536:
                  case 131072:
                  case 262144:
                  case 524288:
                  case 1048576:
                  case 2097152:
                    return b + 5e3;

                  case 4194304:
                  case 8388608:
                  case 16777216:
                  case 33554432:
                  case 67108864:
                    return -1;

                  case 134217728:
                  case 268435456:
                  case 536870912:
                  case 1073741824:
                    return -1;

                  default:
                    return -1;
                }
            }
            function wc(a, b) {
                for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
                    var g = 31 - oc(f), h = 1 << g, k = e[g];
                    if (-1 === k) {
                        if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
                    } else k <= b && (a.expiredLanes |= h);
                    f &= ~h;
                }
            }
            function xc(a) {
                a = a.pendingLanes & -1073741825;
                return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
            }
            function yc() {
                var a = rc;
                rc <<= 1;
                0 === (rc & 4194240) && (rc = 64);
                return a;
            }
            function zc(a) {
                for (var b = [], c = 0; 31 > c; c++) b.push(a);
                return b;
            }
            function Ac(a, b, c) {
                a.pendingLanes |= b;
                536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
                a = a.eventTimes;
                b = 31 - oc(b);
                a[b] = c;
            }
            function Bc(a, b) {
                var c = a.pendingLanes & ~b;
                a.pendingLanes = b;
                a.suspendedLanes = 0;
                a.pingedLanes = 0;
                a.expiredLanes &= b;
                a.mutableReadLanes &= b;
                a.entangledLanes &= b;
                b = a.entanglements;
                var d = a.eventTimes;
                for (a = a.expirationTimes; 0 < c; ) {
                    var e = 31 - oc(c), f = 1 << e;
                    b[e] = 0;
                    d[e] = -1;
                    a[e] = -1;
                    c &= ~f;
                }
            }
            function Cc(a, b) {
                var c = a.entangledLanes |= b;
                for (a = a.entanglements; c; ) {
                    var d = 31 - oc(c), e = 1 << d;
                    e & b | a[d] & b && (a[d] |= b);
                    c &= ~e;
                }
            }
            var C = 0;
            function Dc(a) {
                a &= -a;
                return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
            }
            var Ec, Fc, Gc, Hc, Ic, Jc = !1, Kc = [], Lc = null, Mc = null, Nc = null, Oc = new Map, Pc = new Map, Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
            function Sc(a, b) {
                switch (a) {
                  case "focusin":
                  case "focusout":
                    Lc = null;
                    break;

                  case "dragenter":
                  case "dragleave":
                    Mc = null;
                    break;

                  case "mouseover":
                  case "mouseout":
                    Nc = null;
                    break;

                  case "pointerover":
                  case "pointerout":
                    Oc.delete(b.pointerId);
                    break;

                  case "gotpointercapture":
                  case "lostpointercapture":
                    Pc.delete(b.pointerId);
                }
            }
            function Tc(a, b, c, d, e, f) {
                if (null === a || a.nativeEvent !== f) return a = {
                    blockedOn: b,
                    domEventName: c,
                    eventSystemFlags: d,
                    nativeEvent: f,
                    targetContainers: [ e ]
                }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
                a.eventSystemFlags |= d;
                b = a.targetContainers;
                null !== e && -1 === b.indexOf(e) && b.push(e);
                return a;
            }
            function Uc(a, b, c, d, e) {
                switch (b) {
                  case "focusin":
                    return Lc = Tc(Lc, a, b, c, d, e), !0;

                  case "dragenter":
                    return Mc = Tc(Mc, a, b, c, d, e), !0;

                  case "mouseover":
                    return Nc = Tc(Nc, a, b, c, d, e), !0;

                  case "pointerover":
                    var f = e.pointerId;
                    Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
                    return !0;

                  case "gotpointercapture":
                    return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), !0;
                }
                return !1;
            }
            function Vc(a) {
                var b = Wc(a.target);
                if (null !== b) {
                    var c = Vb(b);
                    if (null !== c) if (b = c.tag, 13 === b) {
                        if (b = Wb(c), null !== b) {
                            a.blockedOn = b;
                            Ic(a.priority, (function() {
                                Gc(c);
                            }));
                            return;
                        }
                    } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
                        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
                        return;
                    }
                }
                a.blockedOn = null;
            }
            function Xc(a) {
                if (null !== a.blockedOn) return !1;
                for (var b = a.targetContainers; 0 < b.length; ) {
                    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
                    if (null === c) {
                        c = a.nativeEvent;
                        var d = new c.constructor(c.type, c);
                        wb = d;
                        c.target.dispatchEvent(d);
                        wb = null;
                    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, !1;
                    b.shift();
                }
                return !0;
            }
            function Zc(a, b, c) {
                Xc(a) && c.delete(b);
            }
            function $c() {
                Jc = !1;
                null !== Lc && Xc(Lc) && (Lc = null);
                null !== Mc && Xc(Mc) && (Mc = null);
                null !== Nc && Xc(Nc) && (Nc = null);
                Oc.forEach(Zc);
                Pc.forEach(Zc);
            }
            function ad(a, b) {
                a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = !0, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
            }
            function bd(a) {
                function b(b) {
                    return ad(b, a);
                }
                if (0 < Kc.length) {
                    ad(Kc[0], a);
                    for (var c = 1; c < Kc.length; c++) {
                        var d = Kc[c];
                        d.blockedOn === a && (d.blockedOn = null);
                    }
                }
                null !== Lc && ad(Lc, a);
                null !== Mc && ad(Mc, a);
                null !== Nc && ad(Nc, a);
                Oc.forEach(b);
                Pc.forEach(b);
                for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
                for (;0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
            }
            var cd = ua.ReactCurrentBatchConfig, dd = !0;
            function ed(a, b, c, d) {
                var e = C, f = cd.transition;
                cd.transition = null;
                try {
                    C = 1, fd(a, b, c, d);
                } finally {
                    C = e, cd.transition = f;
                }
            }
            function gd(a, b, c, d) {
                var e = C, f = cd.transition;
                cd.transition = null;
                try {
                    C = 4, fd(a, b, c, d);
                } finally {
                    C = e, cd.transition = f;
                }
            }
            function fd(a, b, c, d) {
                if (dd) {
                    var e = Yc(a, b, c, d);
                    if (null === e) hd(a, b, d, id, c), Sc(a, d); else if (Uc(e, a, b, c, d)) d.stopPropagation(); else if (Sc(a, d), 
                    b & 4 && -1 < Rc.indexOf(a)) {
                        for (;null !== e; ) {
                            var f = Cb(e);
                            null !== f && Ec(f);
                            f = Yc(a, b, c, d);
                            null === f && hd(a, b, d, id, c);
                            if (f === e) break;
                            e = f;
                        }
                        null !== e && d.stopPropagation();
                    } else hd(a, b, d, null, c);
                }
            }
            var id = null;
            function Yc(a, b, c, d) {
                id = null;
                a = xb(d);
                a = Wc(a);
                if (null !== a) if (b = Vb(a), null === b) a = null; else if (c = b.tag, 13 === c) {
                    a = Wb(b);
                    if (null !== a) return a;
                    a = null;
                } else if (3 === c) {
                    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
                    a = null;
                } else b !== a && (a = null);
                id = a;
                return null;
            }
            function jd(a) {
                switch (a) {
                  case "cancel":
                  case "click":
                  case "close":
                  case "contextmenu":
                  case "copy":
                  case "cut":
                  case "auxclick":
                  case "dblclick":
                  case "dragend":
                  case "dragstart":
                  case "drop":
                  case "focusin":
                  case "focusout":
                  case "input":
                  case "invalid":
                  case "keydown":
                  case "keypress":
                  case "keyup":
                  case "mousedown":
                  case "mouseup":
                  case "paste":
                  case "pause":
                  case "play":
                  case "pointercancel":
                  case "pointerdown":
                  case "pointerup":
                  case "ratechange":
                  case "reset":
                  case "resize":
                  case "seeked":
                  case "submit":
                  case "touchcancel":
                  case "touchend":
                  case "touchstart":
                  case "volumechange":
                  case "change":
                  case "selectionchange":
                  case "textInput":
                  case "compositionstart":
                  case "compositionend":
                  case "compositionupdate":
                  case "beforeblur":
                  case "afterblur":
                  case "beforeinput":
                  case "blur":
                  case "fullscreenchange":
                  case "focus":
                  case "hashchange":
                  case "popstate":
                  case "select":
                  case "selectstart":
                    return 1;

                  case "drag":
                  case "dragenter":
                  case "dragexit":
                  case "dragleave":
                  case "dragover":
                  case "mousemove":
                  case "mouseout":
                  case "mouseover":
                  case "pointermove":
                  case "pointerout":
                  case "pointerover":
                  case "scroll":
                  case "toggle":
                  case "touchmove":
                  case "wheel":
                  case "mouseenter":
                  case "mouseleave":
                  case "pointerenter":
                  case "pointerleave":
                    return 4;

                  case "message":
                    switch (ec()) {
                      case fc:
                        return 1;

                      case gc:
                        return 4;

                      case hc:
                      case ic:
                        return 16;

                      case jc:
                        return 536870912;

                      default:
                        return 16;
                    }

                  default:
                    return 16;
                }
            }
            var kd = null, ld = null, md = null;
            function nd() {
                if (md) return md;
                var a, d, b = ld, c = b.length, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
                for (a = 0; a < c && b[a] === e[a]; a++) ;
                var g = c - a;
                for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
                return md = e.slice(a, 1 < d ? 1 - d : void 0);
            }
            function od(a) {
                var b = a.keyCode;
                "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
                10 === a && (a = 13);
                return 32 <= a || 13 === a ? a : 0;
            }
            function pd() {
                return !0;
            }
            function qd() {
                return !1;
            }
            function rd(a) {
                function b(b, d, e, f, g) {
                    this._reactName = b;
                    this._targetInst = e;
                    this.type = d;
                    this.nativeEvent = f;
                    this.target = g;
                    this.currentTarget = null;
                    for (var c in a) a.hasOwnProperty(c) && (b = a[c], this[c] = b ? b(f) : f[c]);
                    this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : !1 === f.returnValue) ? pd : qd;
                    this.isPropagationStopped = qd;
                    return this;
                }
                A(b.prototype, {
                    preventDefault: function() {
                        this.defaultPrevented = !0;
                        var a = this.nativeEvent;
                        a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), 
                        this.isDefaultPrevented = pd);
                    },
                    stopPropagation: function() {
                        var a = this.nativeEvent;
                        a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), 
                        this.isPropagationStopped = pd);
                    },
                    persist: function() {},
                    isPersistent: pd
                });
                return b;
            }
            var wd, xd, yd, sd = {
                eventPhase: 0,
                bubbles: 0,
                cancelable: 0,
                timeStamp: function(a) {
                    return a.timeStamp || Date.now();
                },
                defaultPrevented: 0,
                isTrusted: 0
            }, td = rd(sd), ud = A({}, sd, {
                view: 0,
                detail: 0
            }), vd = rd(ud), Ad = A({}, ud, {
                screenX: 0,
                screenY: 0,
                clientX: 0,
                clientY: 0,
                pageX: 0,
                pageY: 0,
                ctrlKey: 0,
                shiftKey: 0,
                altKey: 0,
                metaKey: 0,
                getModifierState: zd,
                button: 0,
                buttons: 0,
                relatedTarget: function(a) {
                    return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
                },
                movementX: function(a) {
                    if ("movementX" in a) return a.movementX;
                    a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, 
                    yd = a);
                    return wd;
                },
                movementY: function(a) {
                    return "movementY" in a ? a.movementY : xd;
                }
            }), Bd = rd(Ad), Cd = A({}, Ad, {
                dataTransfer: 0
            }), Dd = rd(Cd), Ed = A({}, ud, {
                relatedTarget: 0
            }), Fd = rd(Ed), Gd = A({}, sd, {
                animationName: 0,
                elapsedTime: 0,
                pseudoElement: 0
            }), Hd = rd(Gd), Id = A({}, sd, {
                clipboardData: function(a) {
                    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
                }
            }), Jd = rd(Id), Kd = A({}, sd, {
                data: 0
            }), Ld = rd(Kd), Md = {
                Esc: "Escape",
                Spacebar: " ",
                Left: "ArrowLeft",
                Up: "ArrowUp",
                Right: "ArrowRight",
                Down: "ArrowDown",
                Del: "Delete",
                Win: "OS",
                Menu: "ContextMenu",
                Apps: "ContextMenu",
                Scroll: "ScrollLock",
                MozPrintableKey: "Unidentified"
            }, Nd = {
                8: "Backspace",
                9: "Tab",
                12: "Clear",
                13: "Enter",
                16: "Shift",
                17: "Control",
                18: "Alt",
                19: "Pause",
                20: "CapsLock",
                27: "Escape",
                32: " ",
                33: "PageUp",
                34: "PageDown",
                35: "End",
                36: "Home",
                37: "ArrowLeft",
                38: "ArrowUp",
                39: "ArrowRight",
                40: "ArrowDown",
                45: "Insert",
                46: "Delete",
                112: "F1",
                113: "F2",
                114: "F3",
                115: "F4",
                116: "F5",
                117: "F6",
                118: "F7",
                119: "F8",
                120: "F9",
                121: "F10",
                122: "F11",
                123: "F12",
                144: "NumLock",
                145: "ScrollLock",
                224: "Meta"
            }, Od = {
                Alt: "altKey",
                Control: "ctrlKey",
                Meta: "metaKey",
                Shift: "shiftKey"
            };
            function Pd(a) {
                var b = this.nativeEvent;
                return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : !1;
            }
            function zd() {
                return Pd;
            }
            var Qd = A({}, ud, {
                key: function(a) {
                    if (a.key) {
                        var b = Md[a.key] || a.key;
                        if ("Unidentified" !== b) return b;
                    }
                    return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
                },
                code: 0,
                location: 0,
                ctrlKey: 0,
                shiftKey: 0,
                altKey: 0,
                metaKey: 0,
                repeat: 0,
                locale: 0,
                getModifierState: zd,
                charCode: function(a) {
                    return "keypress" === a.type ? od(a) : 0;
                },
                keyCode: function(a) {
                    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
                },
                which: function(a) {
                    return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
                }
            }), Rd = rd(Qd), Sd = A({}, Ad, {
                pointerId: 0,
                width: 0,
                height: 0,
                pressure: 0,
                tangentialPressure: 0,
                tiltX: 0,
                tiltY: 0,
                twist: 0,
                pointerType: 0,
                isPrimary: 0
            }), Td = rd(Sd), Ud = A({}, ud, {
                touches: 0,
                targetTouches: 0,
                changedTouches: 0,
                altKey: 0,
                metaKey: 0,
                ctrlKey: 0,
                shiftKey: 0,
                getModifierState: zd
            }), Vd = rd(Ud), Wd = A({}, sd, {
                propertyName: 0,
                elapsedTime: 0,
                pseudoElement: 0
            }), Xd = rd(Wd), Yd = A({}, Ad, {
                deltaX: function(a) {
                    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
                },
                deltaY: function(a) {
                    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
                },
                deltaZ: 0,
                deltaMode: 0
            }), Zd = rd(Yd), $d = [ 9, 13, 27, 32 ], ae = ia && "CompositionEvent" in window, be = null;
            ia && "documentMode" in document && (be = document.documentMode);
            var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = !1;
            function ge(a, b) {
                switch (a) {
                  case "keyup":
                    return -1 !== $d.indexOf(b.keyCode);

                  case "keydown":
                    return 229 !== b.keyCode;

                  case "keypress":
                  case "mousedown":
                  case "focusout":
                    return !0;

                  default:
                    return !1;
                }
            }
            function he(a) {
                a = a.detail;
                return "object" === typeof a && "data" in a ? a.data : null;
            }
            var ie = !1;
            function je(a, b) {
                switch (a) {
                  case "compositionend":
                    return he(b);

                  case "keypress":
                    if (32 !== b.which) return null;
                    fe = !0;
                    return ee;

                  case "textInput":
                    return a = b.data, a === ee && fe ? null : a;

                  default:
                    return null;
                }
            }
            function ke(a, b) {
                if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, 
                ie = !1, a) : null;
                switch (a) {
                  case "paste":
                    return null;

                  case "keypress":
                    if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
                        if (b.char && 1 < b.char.length) return b.char;
                        if (b.which) return String.fromCharCode(b.which);
                    }
                    return null;

                  case "compositionend":
                    return de && "ko" !== b.locale ? null : b.data;

                  default:
                    return null;
                }
            }
            var le = {
                color: !0,
                date: !0,
                datetime: !0,
                "datetime-local": !0,
                email: !0,
                month: !0,
                number: !0,
                password: !0,
                range: !0,
                search: !0,
                tel: !0,
                text: !0,
                time: !0,
                url: !0,
                week: !0
            };
            function me(a) {
                var b = a && a.nodeName && a.nodeName.toLowerCase();
                return "input" === b ? !!le[a.type] : "textarea" === b ? !0 : !1;
            }
            function ne(a, b, c, d) {
                Eb(d);
                b = oe(b, "onChange");
                0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({
                    event: c,
                    listeners: b
                }));
            }
            var pe = null, qe = null;
            function re(a) {
                se(a, 0);
            }
            function te(a) {
                var b = ue(a);
                if (Wa(b)) return a;
            }
            function ve(a, b) {
                if ("change" === a) return b;
            }
            var we = !1;
            if (ia) {
                var xe;
                if (ia) {
                    var ye = "oninput" in document;
                    if (!ye) {
                        var ze = document.createElement("div");
                        ze.setAttribute("oninput", "return;");
                        ye = "function" === typeof ze.oninput;
                    }
                    xe = ye;
                } else xe = !1;
                we = xe && (!document.documentMode || 9 < document.documentMode);
            }
            function Ae() {
                pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
            }
            function Be(a) {
                if ("value" === a.propertyName && te(qe)) {
                    var b = [];
                    ne(b, qe, a, xb(a));
                    Jb(re, b);
                }
            }
            function Ce(a, b, c) {
                "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
            }
            function De(a) {
                if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
            }
            function Ee(a, b) {
                if ("click" === a) return te(b);
            }
            function Fe(a, b) {
                if ("input" === a || "change" === a) return te(b);
            }
            function Ge(a, b) {
                return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
            }
            var He = "function" === typeof Object.is ? Object.is : Ge;
            function Ie(a, b) {
                if (He(a, b)) return !0;
                if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
                var c = Object.keys(a), d = Object.keys(b);
                if (c.length !== d.length) return !1;
                for (d = 0; d < c.length; d++) {
                    var e = c[d];
                    if (!ja.call(b, e) || !He(a[e], b[e])) return !1;
                }
                return !0;
            }
            function Je(a) {
                for (;a && a.firstChild; ) a = a.firstChild;
                return a;
            }
            function Ke(a, b) {
                var c = Je(a);
                a = 0;
                for (var d; c; ) {
                    if (3 === c.nodeType) {
                        d = a + c.textContent.length;
                        if (a <= b && d >= b) return {
                            node: c,
                            offset: b - a
                        };
                        a = d;
                    }
                    a: {
                        for (;c; ) {
                            if (c.nextSibling) {
                                c = c.nextSibling;
                                break a;
                            }
                            c = c.parentNode;
                        }
                        c = void 0;
                    }
                    c = Je(c);
                }
            }
            function Le(a, b) {
                return a && b ? a === b ? !0 : a && 3 === a.nodeType ? !1 : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
            }
            function Me() {
                for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
                    try {
                        var c = "string" === typeof b.contentWindow.location.href;
                    } catch (d) {
                        c = !1;
                    }
                    if (c) a = b.contentWindow; else break;
                    b = Xa(a.document);
                }
                return b;
            }
            function Ne(a) {
                var b = a && a.nodeName && a.nodeName.toLowerCase();
                return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
            }
            function Oe(a) {
                var b = Me(), c = a.focusedElem, d = a.selectionRange;
                if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
                    if (null !== d && Ne(c)) if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, 
                    c.selectionEnd = Math.min(a, c.value.length); else if (a = (b = c.ownerDocument || document) && b.defaultView || window, 
                    a.getSelection) {
                        a = a.getSelection();
                        var e = c.textContent.length, f = Math.min(d.start, e);
                        d = void 0 === d.end ? f : Math.min(d.end, e);
                        !a.extend && f > d && (e = d, d = f, f = e);
                        e = Ke(c, f);
                        var g = Ke(c, d);
                        e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), 
                        b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), 
                        a.addRange(b)));
                    }
                    b = [];
                    for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({
                        element: a,
                        left: a.scrollLeft,
                        top: a.scrollTop
                    });
                    "function" === typeof c.focus && c.focus();
                    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
                }
            }
            var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = !1;
            function Ue(a, b, c) {
                var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
                Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = {
                    start: d.selectionStart,
                    end: d.selectionEnd
                } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), 
                d = {
                    anchorNode: d.anchorNode,
                    anchorOffset: d.anchorOffset,
                    focusNode: d.focusNode,
                    focusOffset: d.focusOffset
                }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), 
                a.push({
                    event: b,
                    listeners: d
                }), b.target = Qe)));
            }
            function Ve(a, b) {
                var c = {};
                c[a.toLowerCase()] = b.toLowerCase();
                c["Webkit" + a] = "webkit" + b;
                c["Moz" + a] = "moz" + b;
                return c;
            }
            var We = {
                animationend: Ve("Animation", "AnimationEnd"),
                animationiteration: Ve("Animation", "AnimationIteration"),
                animationstart: Ve("Animation", "AnimationStart"),
                transitionend: Ve("Transition", "TransitionEnd")
            }, Xe = {}, Ye = {};
            ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, 
            delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
            function Ze(a) {
                if (Xe[a]) return Xe[a];
                if (!We[a]) return a;
                var c, b = We[a];
                for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
                return a;
            }
            var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = new Map, ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
            function ff(a, b) {
                df.set(a, b);
                fa(b, [ a ]);
            }
            for (var gf = 0; gf < ef.length; gf++) {
                var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
                ff(jf, "on" + kf);
            }
            ff($e, "onAnimationEnd");
            ff(af, "onAnimationIteration");
            ff(bf, "onAnimationStart");
            ff("dblclick", "onDoubleClick");
            ff("focusin", "onFocus");
            ff("focusout", "onBlur");
            ff(cf, "onTransitionEnd");
            ha("onMouseEnter", [ "mouseout", "mouseover" ]);
            ha("onMouseLeave", [ "mouseout", "mouseover" ]);
            ha("onPointerEnter", [ "pointerout", "pointerover" ]);
            ha("onPointerLeave", [ "pointerout", "pointerover" ]);
            fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
            fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
            fa("onBeforeInput", [ "compositionend", "keypress", "textInput", "paste" ]);
            fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
            fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
            fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
            var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
            function nf(a, b, c) {
                var d = a.type || "unknown-event";
                a.currentTarget = c;
                Ub(d, b, void 0, a);
                a.currentTarget = null;
            }
            function se(a, b) {
                b = 0 !== (b & 4);
                for (var c = 0; c < a.length; c++) {
                    var d = a[c], e = d.event;
                    d = d.listeners;
                    a: {
                        var f = void 0;
                        if (b) for (var g = d.length - 1; 0 <= g; g--) {
                            var h = d[g], k = h.instance, l = h.currentTarget;
                            h = h.listener;
                            if (k !== f && e.isPropagationStopped()) break a;
                            nf(e, h, l);
                            f = k;
                        } else for (g = 0; g < d.length; g++) {
                            h = d[g];
                            k = h.instance;
                            l = h.currentTarget;
                            h = h.listener;
                            if (k !== f && e.isPropagationStopped()) break a;
                            nf(e, h, l);
                            f = k;
                        }
                    }
                }
                if (Qb) throw a = Rb, Qb = !1, Rb = null, a;
            }
            function D(a, b) {
                var c = b[of];
                void 0 === c && (c = b[of] = new Set);
                var d = a + "__bubble";
                c.has(d) || (pf(b, a, 2, !1), c.add(d));
            }
            function qf(a, b, c) {
                var d = 0;
                b && (d |= 4);
                pf(c, a, d, b);
            }
            var rf = "_reactListening" + Math.random().toString(36).slice(2);
            function sf(a) {
                if (!a[rf]) {
                    a[rf] = !0;
                    da.forEach((function(b) {
                        "selectionchange" !== b && (mf.has(b) || qf(b, !1, a), qf(b, !0, a));
                    }));
                    var b = 9 === a.nodeType ? a : a.ownerDocument;
                    null === b || b[rf] || (b[rf] = !0, qf("selectionchange", !1, b));
                }
            }
            function pf(a, b, c, d) {
                switch (jd(b)) {
                  case 1:
                    var e = ed;
                    break;

                  case 4:
                    e = gd;
                    break;

                  default:
                    e = fd;
                }
                c = e.bind(null, b, c, a);
                e = void 0;
                !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = !0);
                d ? void 0 !== e ? a.addEventListener(b, c, {
                    capture: !0,
                    passive: e
                }) : a.addEventListener(b, c, !0) : void 0 !== e ? a.addEventListener(b, c, {
                    passive: e
                }) : a.addEventListener(b, c, !1);
            }
            function hd(a, b, c, d, e) {
                var f = d;
                if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (;;) {
                    if (null === d) return;
                    var g = d.tag;
                    if (3 === g || 4 === g) {
                        var h = d.stateNode.containerInfo;
                        if (h === e || 8 === h.nodeType && h.parentNode === e) break;
                        if (4 === g) for (g = d.return; null !== g; ) {
                            var k = g.tag;
                            if (3 === k || 4 === k) if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
                            g = g.return;
                        }
                        for (;null !== h; ) {
                            g = Wc(h);
                            if (null === g) return;
                            k = g.tag;
                            if (5 === k || 6 === k) {
                                d = f = g;
                                continue a;
                            }
                            h = h.parentNode;
                        }
                    }
                    d = d.return;
                }
                Jb((function() {
                    var d = f, e = xb(c), g = [];
                    a: {
                        var h = df.get(a);
                        if (void 0 !== h) {
                            var k = td, n = a;
                            switch (a) {
                              case "keypress":
                                if (0 === od(c)) break a;

                              case "keydown":
                              case "keyup":
                                k = Rd;
                                break;

                              case "focusin":
                                n = "focus";
                                k = Fd;
                                break;

                              case "focusout":
                                n = "blur";
                                k = Fd;
                                break;

                              case "beforeblur":
                              case "afterblur":
                                k = Fd;
                                break;

                              case "click":
                                if (2 === c.button) break a;

                              case "auxclick":
                              case "dblclick":
                              case "mousedown":
                              case "mousemove":
                              case "mouseup":
                              case "mouseout":
                              case "mouseover":
                              case "contextmenu":
                                k = Bd;
                                break;

                              case "drag":
                              case "dragend":
                              case "dragenter":
                              case "dragexit":
                              case "dragleave":
                              case "dragover":
                              case "dragstart":
                              case "drop":
                                k = Dd;
                                break;

                              case "touchcancel":
                              case "touchend":
                              case "touchmove":
                              case "touchstart":
                                k = Vd;
                                break;

                              case $e:
                              case af:
                              case bf:
                                k = Hd;
                                break;

                              case cf:
                                k = Xd;
                                break;

                              case "scroll":
                                k = vd;
                                break;

                              case "wheel":
                                k = Zd;
                                break;

                              case "copy":
                              case "cut":
                              case "paste":
                                k = Jd;
                                break;

                              case "gotpointercapture":
                              case "lostpointercapture":
                              case "pointercancel":
                              case "pointerdown":
                              case "pointermove":
                              case "pointerout":
                              case "pointerover":
                              case "pointerup":
                                k = Td;
                            }
                            var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h ? h + "Capture" : null : h;
                            t = [];
                            for (var u, w = d; null !== w; ) {
                                u = w;
                                var F = u.stateNode;
                                5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
                                if (J) break;
                                w = w.return;
                            }
                            0 < t.length && (h = new k(h, n, null, c, e), g.push({
                                event: h,
                                listeners: t
                            }));
                        }
                    }
                    if (0 === (b & 7)) {
                        a: {
                            h = "mouseover" === a || "pointerover" === a;
                            k = "mouseout" === a || "pointerout" === a;
                            if (h && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
                            if (k || h) {
                                h = e.window === e ? e : (h = e.ownerDocument) ? h.defaultView || h.parentWindow : window;
                                if (k) {
                                    if (n = c.relatedTarget || c.toElement, k = d, n = n ? Wc(n) : null, null !== n && (J = Vb(n), 
                                    n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
                                } else k = null, n = d;
                                if (k !== n) {
                                    t = Bd;
                                    F = "onMouseLeave";
                                    x = "onMouseEnter";
                                    w = "mouse";
                                    if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", 
                                    w = "pointer";
                                    J = null == k ? h : ue(k);
                                    u = null == n ? h : ue(n);
                                    h = new t(F, w + "leave", k, c, e);
                                    h.target = J;
                                    h.relatedTarget = u;
                                    F = null;
                                    Wc(e) === d && (t = new t(x, w + "enter", n, c, e), t.target = u, t.relatedTarget = J, 
                                    F = t);
                                    J = F;
                                    if (k && n) b: {
                                        t = k;
                                        x = n;
                                        w = 0;
                                        for (u = t; u; u = vf(u)) w++;
                                        u = 0;
                                        for (F = x; F; F = vf(F)) u++;
                                        for (;0 < w - u; ) t = vf(t), w--;
                                        for (;0 < u - w; ) x = vf(x), u--;
                                        for (;w--; ) {
                                            if (t === x || null !== x && t === x.alternate) break b;
                                            t = vf(t);
                                            x = vf(x);
                                        }
                                        t = null;
                                    } else t = null;
                                    null !== k && wf(g, h, k, t, !1);
                                    null !== n && null !== J && wf(g, J, n, t, !0);
                                }
                            }
                        }
                        a: {
                            h = d ? ue(d) : window;
                            k = h.nodeName && h.nodeName.toLowerCase();
                            if ("select" === k || "input" === k && "file" === h.type) var na = ve; else if (me(h)) if (we) na = Fe; else {
                                na = De;
                                var xa = Ce;
                            } else (k = h.nodeName) && "input" === k.toLowerCase() && ("checkbox" === h.type || "radio" === h.type) && (na = Ee);
                            if (na && (na = na(a, d))) {
                                ne(g, na, c, e);
                                break a;
                            }
                            xa && xa(a, h, d);
                            "focusout" === a && (xa = h._wrapperState) && xa.controlled && "number" === h.type && cb(h, "number", h.value);
                        }
                        xa = d ? ue(d) : window;
                        switch (a) {
                          case "focusin":
                            if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d, Se = null;
                            break;

                          case "focusout":
                            Se = Re = Qe = null;
                            break;

                          case "mousedown":
                            Te = !0;
                            break;

                          case "contextmenu":
                          case "mouseup":
                          case "dragend":
                            Te = !1;
                            Ue(g, c, e);
                            break;

                          case "selectionchange":
                            if (Pe) break;

                          case "keydown":
                          case "keyup":
                            Ue(g, c, e);
                        }
                        var $a;
                        if (ae) b: {
                            switch (a) {
                              case "compositionstart":
                                var ba = "onCompositionStart";
                                break b;

                              case "compositionend":
                                ba = "onCompositionEnd";
                                break b;

                              case "compositionupdate":
                                ba = "onCompositionUpdate";
                                break b;
                            }
                            ba = void 0;
                        } else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
                        ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e, 
                        ld = "value" in kd ? kd.value : kd.textContent, ie = !0)), xa = oe(d, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e), 
                        g.push({
                            event: ba,
                            listeners: xa
                        }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
                        if ($a = ce ? je(a, c) : ke(a, c)) d = oe(d, "onBeforeInput"), 0 < d.length && (e = new Ld("onBeforeInput", "beforeinput", null, c, e), 
                        g.push({
                            event: e,
                            listeners: d
                        }), e.data = $a);
                    }
                    se(g, b);
                }));
            }
            function tf(a, b, c) {
                return {
                    instance: a,
                    listener: b,
                    currentTarget: c
                };
            }
            function oe(a, b) {
                for (var c = b + "Capture", d = []; null !== a; ) {
                    var e = a, f = e.stateNode;
                    5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), 
                    f = Kb(a, b), null != f && d.push(tf(a, f, e)));
                    a = a.return;
                }
                return d;
            }
            function vf(a) {
                if (null === a) return null;
                do {
                    a = a.return;
                } while (a && 5 !== a.tag);
                return a ? a : null;
            }
            function wf(a, b, c, d, e) {
                for (var f = b._reactName, g = []; null !== c && c !== d; ) {
                    var h = c, k = h.alternate, l = h.stateNode;
                    if (null !== k && k === d) break;
                    5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), 
                    null != k && g.push(tf(c, k, h))));
                    c = c.return;
                }
                0 !== g.length && a.push({
                    event: b,
                    listeners: g
                });
            }
            var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
            function zf(a) {
                return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
            }
            function Af(a, b, c) {
                b = zf(b);
                if (zf(a) !== b && c) throw Error(p(425));
            }
            function Bf() {}
            var Cf = null, Df = null;
            function Ef(a, b) {
                return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
            }
            var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
                return Hf.resolve(null).then(a).catch(If);
            } : Ff;
            function If(a) {
                setTimeout((function() {
                    throw a;
                }));
            }
            function Kf(a, b) {
                var c = b, d = 0;
                do {
                    var e = c.nextSibling;
                    a.removeChild(c);
                    if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
                        if (0 === d) {
                            a.removeChild(e);
                            bd(b);
                            return;
                        }
                        d--;
                    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
                    c = e;
                } while (c);
                bd(b);
            }
            function Lf(a) {
                for (;null != a; a = a.nextSibling) {
                    var b = a.nodeType;
                    if (1 === b || 3 === b) break;
                    if (8 === b) {
                        b = a.data;
                        if ("$" === b || "$!" === b || "$?" === b) break;
                        if ("/$" === b) return null;
                    }
                }
                return a;
            }
            function Mf(a) {
                a = a.previousSibling;
                for (var b = 0; a; ) {
                    if (8 === a.nodeType) {
                        var c = a.data;
                        if ("$" === c || "$!" === c || "$?" === c) {
                            if (0 === b) return a;
                            b--;
                        } else "/$" === c && b++;
                    }
                    a = a.previousSibling;
                }
                return null;
            }
            var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
            function Wc(a) {
                var b = a[Of];
                if (b) return b;
                for (var c = a.parentNode; c; ) {
                    if (b = c[uf] || c[Of]) {
                        c = b.alternate;
                        if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
                            if (c = a[Of]) return c;
                            a = Mf(a);
                        }
                        return b;
                    }
                    a = c;
                    c = a.parentNode;
                }
                return null;
            }
            function Cb(a) {
                a = a[Of] || a[uf];
                return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
            }
            function ue(a) {
                if (5 === a.tag || 6 === a.tag) return a.stateNode;
                throw Error(p(33));
            }
            function Db(a) {
                return a[Pf] || null;
            }
            var Sf = [], Tf = -1;
            function Uf(a) {
                return {
                    current: a
                };
            }
            function E(a) {
                0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
            }
            function G(a, b) {
                Tf++;
                Sf[Tf] = a.current;
                a.current = b;
            }
            var Vf = {}, H = Uf(Vf), Wf = Uf(!1), Xf = Vf;
            function Yf(a, b) {
                var c = a.type.contextTypes;
                if (!c) return Vf;
                var d = a.stateNode;
                if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
                var f, e = {};
                for (f in c) e[f] = b[f];
                d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
                return e;
            }
            function Zf(a) {
                a = a.childContextTypes;
                return null !== a && void 0 !== a;
            }
            function $f() {
                E(Wf);
                E(H);
            }
            function ag(a, b, c) {
                if (H.current !== Vf) throw Error(p(168));
                G(H, b);
                G(Wf, c);
            }
            function bg(a, b, c) {
                var d = a.stateNode;
                b = b.childContextTypes;
                if ("function" !== typeof d.getChildContext) return c;
                d = d.getChildContext();
                for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
                return A({}, c, d);
            }
            function cg(a) {
                a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
                Xf = H.current;
                G(H, a);
                G(Wf, Wf.current);
                return !0;
            }
            function dg(a, b, c) {
                var d = a.stateNode;
                if (!d) throw Error(p(169));
                c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), 
                G(H, a)) : E(Wf);
                G(Wf, c);
            }
            var eg = null, fg = !1, gg = !1;
            function hg(a) {
                null === eg ? eg = [ a ] : eg.push(a);
            }
            function ig(a) {
                fg = !0;
                hg(a);
            }
            function jg() {
                if (!gg && null !== eg) {
                    gg = !0;
                    var a = 0, b = C;
                    try {
                        var c = eg;
                        for (C = 1; a < c.length; a++) {
                            var d = c[a];
                            do {
                                d = d(!0);
                            } while (null !== d);
                        }
                        eg = null;
                        fg = !1;
                    } catch (e) {
                        throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
                    } finally {
                        C = b, gg = !1;
                    }
                }
                return null;
            }
            var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
            function tg(a, b) {
                kg[lg++] = ng;
                kg[lg++] = mg;
                mg = a;
                ng = b;
            }
            function ug(a, b, c) {
                og[pg++] = rg;
                og[pg++] = sg;
                og[pg++] = qg;
                qg = a;
                var d = rg;
                a = sg;
                var e = 32 - oc(d) - 1;
                d &= ~(1 << e);
                c += 1;
                var f = 32 - oc(b) + e;
                if (30 < f) {
                    var g = e - e % 5;
                    f = (d & (1 << g) - 1).toString(32);
                    d >>= g;
                    e -= g;
                    rg = 1 << 32 - oc(b) + e | c << e | d;
                    sg = f + a;
                } else rg = 1 << f | c << e | d, sg = a;
            }
            function vg(a) {
                null !== a.return && (tg(a, 1), ug(a, 1, 0));
            }
            function wg(a) {
                for (;a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
                for (;a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], 
                og[pg] = null;
            }
            var xg = null, yg = null, I = !1, zg = null;
            function Ag(a, b) {
                var c = Bg(5, null, null, 0);
                c.elementType = "DELETED";
                c.stateNode = b;
                c.return = a;
                b = a.deletions;
                null === b ? (a.deletions = [ c ], a.flags |= 16) : b.push(c);
            }
            function Cg(a, b) {
                switch (a.tag) {
                  case 5:
                    var c = a.type;
                    b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
                    return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), !0) : !1;

                  case 6:
                    return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, 
                    xg = a, yg = null, !0) : !1;

                  case 13:
                    return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? {
                        id: rg,
                        overflow: sg
                    } : null, a.memoizedState = {
                        dehydrated: b,
                        treeContext: c,
                        retryLane: 1073741824
                    }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, 
                    yg = null, !0) : !1;

                  default:
                    return !1;
                }
            }
            function Dg(a) {
                return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
            }
            function Eg(a) {
                if (I) {
                    var b = yg;
                    if (b) {
                        var c = b;
                        if (!Cg(a, b)) {
                            if (Dg(a)) throw Error(p(418));
                            b = Lf(c.nextSibling);
                            var d = xg;
                            b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = !1, xg = a);
                        }
                    } else {
                        if (Dg(a)) throw Error(p(418));
                        a.flags = a.flags & -4097 | 2;
                        I = !1;
                        xg = a;
                    }
                }
            }
            function Fg(a) {
                for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
                xg = a;
            }
            function Gg(a) {
                if (a !== xg) return !1;
                if (!I) return Fg(a), I = !0, !1;
                var b;
                (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
                if (b && (b = yg)) {
                    if (Dg(a)) throw Hg(), Error(p(418));
                    for (;b; ) Ag(a, b), b = Lf(b.nextSibling);
                }
                Fg(a);
                if (13 === a.tag) {
                    a = a.memoizedState;
                    a = null !== a ? a.dehydrated : null;
                    if (!a) throw Error(p(317));
                    a: {
                        a = a.nextSibling;
                        for (b = 0; a; ) {
                            if (8 === a.nodeType) {
                                var c = a.data;
                                if ("/$" === c) {
                                    if (0 === b) {
                                        yg = Lf(a.nextSibling);
                                        break a;
                                    }
                                    b--;
                                } else "$" !== c && "$!" !== c && "$?" !== c || b++;
                            }
                            a = a.nextSibling;
                        }
                        yg = null;
                    }
                } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
                return !0;
            }
            function Hg() {
                for (var a = yg; a; ) a = Lf(a.nextSibling);
            }
            function Ig() {
                yg = xg = null;
                I = !1;
            }
            function Jg(a) {
                null === zg ? zg = [ a ] : zg.push(a);
            }
            var Kg = ua.ReactCurrentBatchConfig;
            function Lg(a, b) {
                if (a && a.defaultProps) {
                    b = A({}, b);
                    a = a.defaultProps;
                    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
                    return b;
                }
                return b;
            }
            var Mg = Uf(null), Ng = null, Og = null, Pg = null;
            function Qg() {
                Pg = Og = Ng = null;
            }
            function Rg(a) {
                var b = Mg.current;
                E(Mg);
                a._currentValue = b;
            }
            function Sg(a, b, c) {
                for (;null !== a; ) {
                    var d = a.alternate;
                    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
                    if (a === c) break;
                    a = a.return;
                }
            }
            function Tg(a, b) {
                Ng = a;
                Pg = Og = null;
                a = a.dependencies;
                null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (Ug = !0), a.firstContext = null);
            }
            function Vg(a) {
                var b = a._currentValue;
                if (Pg !== a) if (a = {
                    context: a,
                    memoizedValue: b,
                    next: null
                }, null === Og) {
                    if (null === Ng) throw Error(p(308));
                    Og = a;
                    Ng.dependencies = {
                        lanes: 0,
                        firstContext: a
                    };
                } else Og = Og.next = a;
                return b;
            }
            var Wg = null;
            function Xg(a) {
                null === Wg ? Wg = [ a ] : Wg.push(a);
            }
            function Yg(a, b, c, d) {
                var e = b.interleaved;
                null === e ? (c.next = c, Xg(b)) : (c.next = e.next, e.next = c);
                b.interleaved = c;
                return Zg(a, d);
            }
            function Zg(a, b) {
                a.lanes |= b;
                var c = a.alternate;
                null !== c && (c.lanes |= b);
                c = a;
                for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), 
                c = a, a = a.return;
                return 3 === c.tag ? c.stateNode : null;
            }
            var $g = !1;
            function ah(a) {
                a.updateQueue = {
                    baseState: a.memoizedState,
                    firstBaseUpdate: null,
                    lastBaseUpdate: null,
                    shared: {
                        pending: null,
                        interleaved: null,
                        lanes: 0
                    },
                    effects: null
                };
            }
            function bh(a, b) {
                a = a.updateQueue;
                b.updateQueue === a && (b.updateQueue = {
                    baseState: a.baseState,
                    firstBaseUpdate: a.firstBaseUpdate,
                    lastBaseUpdate: a.lastBaseUpdate,
                    shared: a.shared,
                    effects: a.effects
                });
            }
            function ch(a, b) {
                return {
                    eventTime: a,
                    lane: b,
                    tag: 0,
                    payload: null,
                    callback: null,
                    next: null
                };
            }
            function dh(a, b, c) {
                var d = a.updateQueue;
                if (null === d) return null;
                d = d.shared;
                if (0 !== (K & 2)) {
                    var e = d.pending;
                    null === e ? b.next = b : (b.next = e.next, e.next = b);
                    d.pending = b;
                    return Zg(a, c);
                }
                e = d.interleaved;
                null === e ? (b.next = b, Xg(d)) : (b.next = e.next, e.next = b);
                d.interleaved = b;
                return Zg(a, c);
            }
            function eh(a, b, c) {
                b = b.updateQueue;
                if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
                    var d = b.lanes;
                    d &= a.pendingLanes;
                    c |= d;
                    b.lanes = c;
                    Cc(a, c);
                }
            }
            function fh(a, b) {
                var c = a.updateQueue, d = a.alternate;
                if (null !== d && (d = d.updateQueue, c === d)) {
                    var e = null, f = null;
                    c = c.firstBaseUpdate;
                    if (null !== c) {
                        do {
                            var g = {
                                eventTime: c.eventTime,
                                lane: c.lane,
                                tag: c.tag,
                                payload: c.payload,
                                callback: c.callback,
                                next: null
                            };
                            null === f ? e = f = g : f = f.next = g;
                            c = c.next;
                        } while (null !== c);
                        null === f ? e = f = b : f = f.next = b;
                    } else e = f = b;
                    c = {
                        baseState: d.baseState,
                        firstBaseUpdate: e,
                        lastBaseUpdate: f,
                        shared: d.shared,
                        effects: d.effects
                    };
                    a.updateQueue = c;
                    return;
                }
                a = c.lastBaseUpdate;
                null === a ? c.firstBaseUpdate = b : a.next = b;
                c.lastBaseUpdate = b;
            }
            function gh(a, b, c, d) {
                var e = a.updateQueue;
                $g = !1;
                var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
                if (null !== h) {
                    e.shared.pending = null;
                    var k = h, l = k.next;
                    k.next = null;
                    null === g ? f = l : g.next = l;
                    g = k;
                    var m = a.alternate;
                    null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, 
                    m.lastBaseUpdate = k));
                }
                if (null !== f) {
                    var q = e.baseState;
                    g = 0;
                    m = l = k = null;
                    h = f;
                    do {
                        var r = h.lane, y = h.eventTime;
                        if ((d & r) === r) {
                            null !== m && (m = m.next = {
                                eventTime: y,
                                lane: 0,
                                tag: h.tag,
                                payload: h.payload,
                                callback: h.callback,
                                next: null
                            });
                            a: {
                                var n = a, t = h;
                                r = b;
                                y = c;
                                switch (t.tag) {
                                  case 1:
                                    n = t.payload;
                                    if ("function" === typeof n) {
                                        q = n.call(y, q, r);
                                        break a;
                                    }
                                    q = n;
                                    break a;

                                  case 3:
                                    n.flags = n.flags & -65537 | 128;

                                  case 0:
                                    n = t.payload;
                                    r = "function" === typeof n ? n.call(y, q, r) : n;
                                    if (null === r || void 0 === r) break a;
                                    q = A({}, q, r);
                                    break a;

                                  case 2:
                                    $g = !0;
                                }
                            }
                            null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [ h ] : r.push(h));
                        } else y = {
                            eventTime: y,
                            lane: r,
                            tag: h.tag,
                            payload: h.payload,
                            callback: h.callback,
                            next: null
                        }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
                        h = h.next;
                        if (null === h) if (h = e.shared.pending, null === h) break; else r = h, h = r.next, 
                        r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
                    } while (1);
                    null === m && (k = q);
                    e.baseState = k;
                    e.firstBaseUpdate = l;
                    e.lastBaseUpdate = m;
                    b = e.shared.interleaved;
                    if (null !== b) {
                        e = b;
                        do {
                            g |= e.lane, e = e.next;
                        } while (e !== b);
                    } else null === f && (e.shared.lanes = 0);
                    hh |= g;
                    a.lanes = g;
                    a.memoizedState = q;
                }
            }
            function ih(a, b, c) {
                a = b.effects;
                b.effects = null;
                if (null !== a) for (b = 0; b < a.length; b++) {
                    var d = a[b], e = d.callback;
                    if (null !== e) {
                        d.callback = null;
                        d = c;
                        if ("function" !== typeof e) throw Error(p(191, e));
                        e.call(d);
                    }
                }
            }
            var jh = (new aa.Component).refs;
            function kh(a, b, c, d) {
                b = a.memoizedState;
                c = c(d, b);
                c = null === c || void 0 === c ? b : A({}, b, c);
                a.memoizedState = c;
                0 === a.lanes && (a.updateQueue.baseState = c);
            }
            var nh = {
                isMounted: function(a) {
                    return (a = a._reactInternals) ? Vb(a) === a : !1;
                },
                enqueueSetState: function(a, b, c) {
                    a = a._reactInternals;
                    var d = L(), e = lh(a), f = ch(d, e);
                    f.payload = b;
                    void 0 !== c && null !== c && (f.callback = c);
                    b = dh(a, f, e);
                    null !== b && (mh(b, a, e, d), eh(b, a, e));
                },
                enqueueReplaceState: function(a, b, c) {
                    a = a._reactInternals;
                    var d = L(), e = lh(a), f = ch(d, e);
                    f.tag = 1;
                    f.payload = b;
                    void 0 !== c && null !== c && (f.callback = c);
                    b = dh(a, f, e);
                    null !== b && (mh(b, a, e, d), eh(b, a, e));
                },
                enqueueForceUpdate: function(a, b) {
                    a = a._reactInternals;
                    var c = L(), d = lh(a), e = ch(c, d);
                    e.tag = 2;
                    void 0 !== b && null !== b && (e.callback = b);
                    b = dh(a, e, d);
                    null !== b && (mh(b, a, d, c), eh(b, a, d));
                }
            };
            function oh(a, b, c, d, e, f, g) {
                a = a.stateNode;
                return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : !0;
            }
            function ph(a, b, c) {
                var d = !1, e = Vf;
                var f = b.contextType;
                "object" === typeof f && null !== f ? f = Vg(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, 
                f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
                b = new b(c, f);
                a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
                b.updater = nh;
                a.stateNode = b;
                b._reactInternals = a;
                d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
                return b;
            }
            function qh(a, b, c, d) {
                a = b.state;
                "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
                "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
                b.state !== a && nh.enqueueReplaceState(b, b.state, null);
            }
            function rh(a, b, c, d) {
                var e = a.stateNode;
                e.props = c;
                e.state = a.memoizedState;
                e.refs = jh;
                ah(a);
                var f = b.contextType;
                "object" === typeof f && null !== f ? e.context = Vg(f) : (f = Zf(b) ? Xf : H.current, 
                e.context = Yf(a, f));
                e.state = a.memoizedState;
                f = b.getDerivedStateFromProps;
                "function" === typeof f && (kh(a, b, f, c), e.state = a.memoizedState);
                "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, 
                "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), 
                b !== e.state && nh.enqueueReplaceState(e, e.state, null), gh(a, c, e, d), e.state = a.memoizedState);
                "function" === typeof e.componentDidMount && (a.flags |= 4194308);
            }
            function sh(a, b, c) {
                a = c.ref;
                if (null !== a && "function" !== typeof a && "object" !== typeof a) {
                    if (c._owner) {
                        c = c._owner;
                        if (c) {
                            if (1 !== c.tag) throw Error(p(309));
                            var d = c.stateNode;
                        }
                        if (!d) throw Error(p(147, a));
                        var e = d, f = "" + a;
                        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
                        b = function(a) {
                            var b = e.refs;
                            b === jh && (b = e.refs = {});
                            null === a ? delete b[f] : b[f] = a;
                        };
                        b._stringRef = f;
                        return b;
                    }
                    if ("string" !== typeof a) throw Error(p(284));
                    if (!c._owner) throw Error(p(290, a));
                }
                return a;
            }
            function th(a, b) {
                a = Object.prototype.toString.call(b);
                throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
            }
            function uh(a) {
                var b = a._init;
                return b(a._payload);
            }
            function vh(a) {
                function b(b, c) {
                    if (a) {
                        var d = b.deletions;
                        null === d ? (b.deletions = [ c ], b.flags |= 16) : d.push(c);
                    }
                }
                function c(c, d) {
                    if (!a) return null;
                    for (;null !== d; ) b(c, d), d = d.sibling;
                    return null;
                }
                function d(a, b) {
                    for (a = new Map; null !== b; ) null !== b.key ? a.set(b.key, b) : a.set(b.index, b), 
                    b = b.sibling;
                    return a;
                }
                function e(a, b) {
                    a = wh(a, b);
                    a.index = 0;
                    a.sibling = null;
                    return a;
                }
                function f(b, c, d) {
                    b.index = d;
                    if (!a) return b.flags |= 1048576, c;
                    d = b.alternate;
                    if (null !== d) return d = d.index, d < c ? (b.flags |= 2, c) : d;
                    b.flags |= 2;
                    return c;
                }
                function g(b) {
                    a && null === b.alternate && (b.flags |= 2);
                    return b;
                }
                function h(a, b, c, d) {
                    if (null === b || 6 !== b.tag) return b = xh(c, a.mode, d), b.return = a, b;
                    b = e(b, c);
                    b.return = a;
                    return b;
                }
                function k(a, b, c, d) {
                    var f = c.type;
                    if (f === ya) return m(a, b, c.props.children, d, c.key);
                    if (null !== b && (b.elementType === f || "object" === typeof f && null !== f && f.$$typeof === Ha && uh(f) === b.type)) return d = e(b, c.props), 
                    d.ref = sh(a, b, c), d.return = a, d;
                    d = yh(c.type, c.key, c.props, null, a.mode, d);
                    d.ref = sh(a, b, c);
                    d.return = a;
                    return d;
                }
                function l(a, b, c, d) {
                    if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = zh(c, a.mode, d), 
                    b.return = a, b;
                    b = e(b, c.children || []);
                    b.return = a;
                    return b;
                }
                function m(a, b, c, d, f) {
                    if (null === b || 7 !== b.tag) return b = Ah(c, a.mode, d, f), b.return = a, b;
                    b = e(b, c);
                    b.return = a;
                    return b;
                }
                function q(a, b, c) {
                    if ("string" === typeof b && "" !== b || "number" === typeof b) return b = xh("" + b, a.mode, c), 
                    b.return = a, b;
                    if ("object" === typeof b && null !== b) {
                        switch (b.$$typeof) {
                          case va:
                            return c = yh(b.type, b.key, b.props, null, a.mode, c), c.ref = sh(a, null, b), 
                            c.return = a, c;

                          case wa:
                            return b = zh(b, a.mode, c), b.return = a, b;

                          case Ha:
                            var d = b._init;
                            return q(a, d(b._payload), c);
                        }
                        if (eb(b) || Ka(b)) return b = Ah(b, a.mode, c, null), b.return = a, b;
                        th(a, b);
                    }
                    return null;
                }
                function r(a, b, c, d) {
                    var e = null !== b ? b.key : null;
                    if ("string" === typeof c && "" !== c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);
                    if ("object" === typeof c && null !== c) {
                        switch (c.$$typeof) {
                          case va:
                            return c.key === e ? k(a, b, c, d) : null;

                          case wa:
                            return c.key === e ? l(a, b, c, d) : null;

                          case Ha:
                            return e = c._init, r(a, b, e(c._payload), d);
                        }
                        if (eb(c) || Ka(c)) return null !== e ? null : m(a, b, c, d, null);
                        th(a, c);
                    }
                    return null;
                }
                function y(a, b, c, d, e) {
                    if ("string" === typeof d && "" !== d || "number" === typeof d) return a = a.get(c) || null, 
                    h(b, a, "" + d, e);
                    if ("object" === typeof d && null !== d) {
                        switch (d.$$typeof) {
                          case va:
                            return a = a.get(null === d.key ? c : d.key) || null, k(b, a, d, e);

                          case wa:
                            return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);

                          case Ha:
                            var f = d._init;
                            return y(a, b, c, f(d._payload), e);
                        }
                        if (eb(d) || Ka(d)) return a = a.get(c) || null, m(b, a, d, e, null);
                        th(b, d);
                    }
                    return null;
                }
                function n(e, g, h, k) {
                    for (var l = null, m = null, u = g, w = g = 0, x = null; null !== u && w < h.length; w++) {
                        u.index > w ? (x = u, u = null) : x = u.sibling;
                        var n = r(e, u, h[w], k);
                        if (null === n) {
                            null === u && (u = x);
                            break;
                        }
                        a && u && null === n.alternate && b(e, u);
                        g = f(n, g, w);
                        null === m ? l = n : m.sibling = n;
                        m = n;
                        u = x;
                    }
                    if (w === h.length) return c(e, u), I && tg(e, w), l;
                    if (null === u) {
                        for (;w < h.length; w++) u = q(e, h[w], k), null !== u && (g = f(u, g, w), null === m ? l = u : m.sibling = u, 
                        m = u);
                        I && tg(e, w);
                        return l;
                    }
                    for (u = d(e, u); w < h.length; w++) x = y(u, e, w, h[w], k), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), 
                    g = f(x, g, w), null === m ? l = x : m.sibling = x, m = x);
                    a && u.forEach((function(a) {
                        return b(e, a);
                    }));
                    I && tg(e, w);
                    return l;
                }
                function t(e, g, h, k) {
                    var l = Ka(h);
                    if ("function" !== typeof l) throw Error(p(150));
                    h = l.call(h);
                    if (null == h) throw Error(p(151));
                    for (var u = l = null, m = g, w = g = 0, x = null, n = h.next(); null !== m && !n.done; w++, 
                    n = h.next()) {
                        m.index > w ? (x = m, m = null) : x = m.sibling;
                        var t = r(e, m, n.value, k);
                        if (null === t) {
                            null === m && (m = x);
                            break;
                        }
                        a && m && null === t.alternate && b(e, m);
                        g = f(t, g, w);
                        null === u ? l = t : u.sibling = t;
                        u = t;
                        m = x;
                    }
                    if (n.done) return c(e, m), I && tg(e, w), l;
                    if (null === m) {
                        for (;!n.done; w++, n = h.next()) n = q(e, n.value, k), null !== n && (g = f(n, g, w), 
                        null === u ? l = n : u.sibling = n, u = n);
                        I && tg(e, w);
                        return l;
                    }
                    for (m = d(e, m); !n.done; w++, n = h.next()) n = y(m, e, w, n.value, k), null !== n && (a && null !== n.alternate && m.delete(null === n.key ? w : n.key), 
                    g = f(n, g, w), null === u ? l = n : u.sibling = n, u = n);
                    a && m.forEach((function(a) {
                        return b(e, a);
                    }));
                    I && tg(e, w);
                    return l;
                }
                function J(a, d, f, h) {
                    "object" === typeof f && null !== f && f.type === ya && null === f.key && (f = f.props.children);
                    if ("object" === typeof f && null !== f) {
                        switch (f.$$typeof) {
                          case va:
                            a: {
                                for (var k = f.key, l = d; null !== l; ) {
                                    if (l.key === k) {
                                        k = f.type;
                                        if (k === ya) {
                                            if (7 === l.tag) {
                                                c(a, l.sibling);
                                                d = e(l, f.props.children);
                                                d.return = a;
                                                a = d;
                                                break a;
                                            }
                                        } else if (l.elementType === k || "object" === typeof k && null !== k && k.$$typeof === Ha && uh(k) === l.type) {
                                            c(a, l.sibling);
                                            d = e(l, f.props);
                                            d.ref = sh(a, l, f);
                                            d.return = a;
                                            a = d;
                                            break a;
                                        }
                                        c(a, l);
                                        break;
                                    } else b(a, l);
                                    l = l.sibling;
                                }
                                f.type === ya ? (d = Ah(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = yh(f.type, f.key, f.props, null, a.mode, h), 
                                h.ref = sh(a, d, f), h.return = a, a = h);
                            }
                            return g(a);

                          case wa:
                            a: {
                                for (l = f.key; null !== d; ) {
                                    if (d.key === l) if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                                        c(a, d.sibling);
                                        d = e(d, f.children || []);
                                        d.return = a;
                                        a = d;
                                        break a;
                                    } else {
                                        c(a, d);
                                        break;
                                    } else b(a, d);
                                    d = d.sibling;
                                }
                                d = zh(f, a.mode, h);
                                d.return = a;
                                a = d;
                            }
                            return g(a);

                          case Ha:
                            return l = f._init, J(a, d, l(f._payload), h);
                        }
                        if (eb(f)) return n(a, d, f, h);
                        if (Ka(f)) return t(a, d, f, h);
                        th(a, f);
                    }
                    return "string" === typeof f && "" !== f || "number" === typeof f ? (f = "" + f, 
                    null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d.return = a, a = d) : (c(a, d), 
                    d = xh(f, a.mode, h), d.return = a, a = d), g(a)) : c(a, d);
                }
                return J;
            }
            var Bh = vh(!0), Ch = vh(!1), Dh = {}, Eh = Uf(Dh), Fh = Uf(Dh), Gh = Uf(Dh);
            function Hh(a) {
                if (a === Dh) throw Error(p(174));
                return a;
            }
            function Ih(a, b) {
                G(Gh, b);
                G(Fh, a);
                G(Eh, Dh);
                a = b.nodeType;
                switch (a) {
                  case 9:
                  case 11:
                    b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
                    break;

                  default:
                    a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
                }
                E(Eh);
                G(Eh, b);
            }
            function Jh() {
                E(Eh);
                E(Fh);
                E(Gh);
            }
            function Kh(a) {
                Hh(Gh.current);
                var b = Hh(Eh.current);
                var c = lb(b, a.type);
                b !== c && (G(Fh, a), G(Eh, c));
            }
            function Lh(a) {
                Fh.current === a && (E(Eh), E(Fh));
            }
            var M = Uf(0);
            function Mh(a) {
                for (var b = a; null !== b; ) {
                    if (13 === b.tag) {
                        var c = b.memoizedState;
                        if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
                    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
                        if (0 !== (b.flags & 128)) return b;
                    } else if (null !== b.child) {
                        b.child.return = b;
                        b = b.child;
                        continue;
                    }
                    if (b === a) break;
                    for (;null === b.sibling; ) {
                        if (null === b.return || b.return === a) return null;
                        b = b.return;
                    }
                    b.sibling.return = b.return;
                    b = b.sibling;
                }
                return null;
            }
            var Nh = [];
            function Oh() {
                for (var a = 0; a < Nh.length; a++) Nh[a]._workInProgressVersionPrimary = null;
                Nh.length = 0;
            }
            var Ph = ua.ReactCurrentDispatcher, Qh = ua.ReactCurrentBatchConfig, Rh = 0, N = null, O = null, P = null, Sh = !1, Th = !1, Uh = 0, Vh = 0;
            function Q() {
                throw Error(p(321));
            }
            function Wh(a, b) {
                if (null === b) return !1;
                for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return !1;
                return !0;
            }
            function Xh(a, b, c, d, e, f) {
                Rh = f;
                N = b;
                b.memoizedState = null;
                b.updateQueue = null;
                b.lanes = 0;
                Ph.current = null === a || null === a.memoizedState ? Yh : Zh;
                a = c(d, e);
                if (Th) {
                    f = 0;
                    do {
                        Th = !1;
                        Uh = 0;
                        if (25 <= f) throw Error(p(301));
                        f += 1;
                        P = O = null;
                        b.updateQueue = null;
                        Ph.current = $h;
                        a = c(d, e);
                    } while (Th);
                }
                Ph.current = ai;
                b = null !== O && null !== O.next;
                Rh = 0;
                P = O = N = null;
                Sh = !1;
                if (b) throw Error(p(300));
                return a;
            }
            function bi() {
                var a = 0 !== Uh;
                Uh = 0;
                return a;
            }
            function ci() {
                var a = {
                    memoizedState: null,
                    baseState: null,
                    baseQueue: null,
                    queue: null,
                    next: null
                };
                null === P ? N.memoizedState = P = a : P = P.next = a;
                return P;
            }
            function di() {
                if (null === O) {
                    var a = N.alternate;
                    a = null !== a ? a.memoizedState : null;
                } else a = O.next;
                var b = null === P ? N.memoizedState : P.next;
                if (null !== b) P = b, O = a; else {
                    if (null === a) throw Error(p(310));
                    O = a;
                    a = {
                        memoizedState: O.memoizedState,
                        baseState: O.baseState,
                        baseQueue: O.baseQueue,
                        queue: O.queue,
                        next: null
                    };
                    null === P ? N.memoizedState = P = a : P = P.next = a;
                }
                return P;
            }
            function ei(a, b) {
                return "function" === typeof b ? b(a) : b;
            }
            function fi(a) {
                var b = di(), c = b.queue;
                if (null === c) throw Error(p(311));
                c.lastRenderedReducer = a;
                var d = O, e = d.baseQueue, f = c.pending;
                if (null !== f) {
                    if (null !== e) {
                        var g = e.next;
                        e.next = f.next;
                        f.next = g;
                    }
                    d.baseQueue = e = f;
                    c.pending = null;
                }
                if (null !== e) {
                    f = e.next;
                    d = d.baseState;
                    var h = g = null, k = null, l = f;
                    do {
                        var m = l.lane;
                        if ((Rh & m) === m) null !== k && (k = k.next = {
                            lane: 0,
                            action: l.action,
                            hasEagerState: l.hasEagerState,
                            eagerState: l.eagerState,
                            next: null
                        }), d = l.hasEagerState ? l.eagerState : a(d, l.action); else {
                            var q = {
                                lane: m,
                                action: l.action,
                                hasEagerState: l.hasEagerState,
                                eagerState: l.eagerState,
                                next: null
                            };
                            null === k ? (h = k = q, g = d) : k = k.next = q;
                            N.lanes |= m;
                            hh |= m;
                        }
                        l = l.next;
                    } while (null !== l && l !== f);
                    null === k ? g = d : k.next = h;
                    He(d, b.memoizedState) || (Ug = !0);
                    b.memoizedState = d;
                    b.baseState = g;
                    b.baseQueue = k;
                    c.lastRenderedState = d;
                }
                a = c.interleaved;
                if (null !== a) {
                    e = a;
                    do {
                        f = e.lane, N.lanes |= f, hh |= f, e = e.next;
                    } while (e !== a);
                } else null === e && (c.lanes = 0);
                return [ b.memoizedState, c.dispatch ];
            }
            function gi(a) {
                var b = di(), c = b.queue;
                if (null === c) throw Error(p(311));
                c.lastRenderedReducer = a;
                var d = c.dispatch, e = c.pending, f = b.memoizedState;
                if (null !== e) {
                    c.pending = null;
                    var g = e = e.next;
                    do {
                        f = a(f, g.action), g = g.next;
                    } while (g !== e);
                    He(f, b.memoizedState) || (Ug = !0);
                    b.memoizedState = f;
                    null === b.baseQueue && (b.baseState = f);
                    c.lastRenderedState = f;
                }
                return [ f, d ];
            }
            function hi() {}
            function ii(a, b) {
                var c = N, d = di(), e = b(), f = !He(d.memoizedState, e);
                f && (d.memoizedState = e, Ug = !0);
                d = d.queue;
                ji(ki.bind(null, c, d, a), [ a ]);
                if (d.getSnapshot !== b || f || null !== P && P.memoizedState.tag & 1) {
                    c.flags |= 2048;
                    li(9, mi.bind(null, c, d, e, b), void 0, null);
                    if (null === R) throw Error(p(349));
                    0 !== (Rh & 30) || ni(c, b, e);
                }
                return e;
            }
            function ni(a, b, c) {
                a.flags |= 16384;
                a = {
                    getSnapshot: b,
                    value: c
                };
                b = N.updateQueue;
                null === b ? (b = {
                    lastEffect: null,
                    stores: null
                }, N.updateQueue = b, b.stores = [ a ]) : (c = b.stores, null === c ? b.stores = [ a ] : c.push(a));
            }
            function mi(a, b, c, d) {
                b.value = c;
                b.getSnapshot = d;
                oi(b) && pi(a);
            }
            function ki(a, b, c) {
                return c((function() {
                    oi(b) && pi(a);
                }));
            }
            function oi(a) {
                var b = a.getSnapshot;
                a = a.value;
                try {
                    var c = b();
                    return !He(a, c);
                } catch (d) {
                    return !0;
                }
            }
            function pi(a) {
                var b = Zg(a, 1);
                null !== b && mh(b, a, 1, -1);
            }
            function qi(a) {
                var b = ci();
                "function" === typeof a && (a = a());
                b.memoizedState = b.baseState = a;
                a = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: ei,
                    lastRenderedState: a
                };
                b.queue = a;
                a = a.dispatch = ri.bind(null, N, a);
                return [ b.memoizedState, a ];
            }
            function li(a, b, c, d) {
                a = {
                    tag: a,
                    create: b,
                    destroy: c,
                    deps: d,
                    next: null
                };
                b = N.updateQueue;
                null === b ? (b = {
                    lastEffect: null,
                    stores: null
                }, N.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, 
                c.next = a, a.next = d, b.lastEffect = a));
                return a;
            }
            function si() {
                return di().memoizedState;
            }
            function ti(a, b, c, d) {
                var e = ci();
                N.flags |= a;
                e.memoizedState = li(1 | b, c, void 0, void 0 === d ? null : d);
            }
            function ui(a, b, c, d) {
                var e = di();
                d = void 0 === d ? null : d;
                var f = void 0;
                if (null !== O) {
                    var g = O.memoizedState;
                    f = g.destroy;
                    if (null !== d && Wh(d, g.deps)) {
                        e.memoizedState = li(b, c, f, d);
                        return;
                    }
                }
                N.flags |= a;
                e.memoizedState = li(1 | b, c, f, d);
            }
            function vi(a, b) {
                return ti(8390656, 8, a, b);
            }
            function ji(a, b) {
                return ui(2048, 8, a, b);
            }
            function wi(a, b) {
                return ui(4, 2, a, b);
            }
            function xi(a, b) {
                return ui(4, 4, a, b);
            }
            function yi(a, b) {
                if ("function" === typeof b) return a = a(), b(a), function() {
                    b(null);
                };
                if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
                    b.current = null;
                };
            }
            function zi(a, b, c) {
                c = null !== c && void 0 !== c ? c.concat([ a ]) : null;
                return ui(4, 4, yi.bind(null, b, a), c);
            }
            function Ai() {}
            function Bi(a, b) {
                var c = di();
                b = void 0 === b ? null : b;
                var d = c.memoizedState;
                if (null !== d && null !== b && Wh(b, d[1])) return d[0];
                c.memoizedState = [ a, b ];
                return a;
            }
            function Ci(a, b) {
                var c = di();
                b = void 0 === b ? null : b;
                var d = c.memoizedState;
                if (null !== d && null !== b && Wh(b, d[1])) return d[0];
                a = a();
                c.memoizedState = [ a, b ];
                return a;
            }
            function Di(a, b, c) {
                if (0 === (Rh & 21)) return a.baseState && (a.baseState = !1, Ug = !0), a.memoizedState = c;
                He(c, b) || (c = yc(), N.lanes |= c, hh |= c, a.baseState = !0);
                return b;
            }
            function Ei(a, b) {
                var c = C;
                C = 0 !== c && 4 > c ? c : 4;
                a(!0);
                var d = Qh.transition;
                Qh.transition = {};
                try {
                    a(!1), b();
                } finally {
                    C = c, Qh.transition = d;
                }
            }
            function Fi() {
                return di().memoizedState;
            }
            function Gi(a, b, c) {
                var d = lh(a);
                c = {
                    lane: d,
                    action: c,
                    hasEagerState: !1,
                    eagerState: null,
                    next: null
                };
                if (Hi(a)) Ii(b, c); else if (c = Yg(a, b, c, d), null !== c) {
                    var e = L();
                    mh(c, a, d, e);
                    Ji(c, b, d);
                }
            }
            function ri(a, b, c) {
                var d = lh(a), e = {
                    lane: d,
                    action: c,
                    hasEagerState: !1,
                    eagerState: null,
                    next: null
                };
                if (Hi(a)) Ii(b, e); else {
                    var f = a.alternate;
                    if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, 
                    null !== f)) try {
                        var g = b.lastRenderedState, h = f(g, c);
                        e.hasEagerState = !0;
                        e.eagerState = h;
                        if (He(h, g)) {
                            var k = b.interleaved;
                            null === k ? (e.next = e, Xg(b)) : (e.next = k.next, k.next = e);
                            b.interleaved = e;
                            return;
                        }
                    } catch (l) {}
                    c = Yg(a, b, e, d);
                    null !== c && (e = L(), mh(c, a, d, e), Ji(c, b, d));
                }
            }
            function Hi(a) {
                var b = a.alternate;
                return a === N || null !== b && b === N;
            }
            function Ii(a, b) {
                Th = Sh = !0;
                var c = a.pending;
                null === c ? b.next = b : (b.next = c.next, c.next = b);
                a.pending = b;
            }
            function Ji(a, b, c) {
                if (0 !== (c & 4194240)) {
                    var d = b.lanes;
                    d &= a.pendingLanes;
                    c |= d;
                    b.lanes = c;
                    Cc(a, c);
                }
            }
            var ai = {
                readContext: Vg,
                useCallback: Q,
                useContext: Q,
                useEffect: Q,
                useImperativeHandle: Q,
                useInsertionEffect: Q,
                useLayoutEffect: Q,
                useMemo: Q,
                useReducer: Q,
                useRef: Q,
                useState: Q,
                useDebugValue: Q,
                useDeferredValue: Q,
                useTransition: Q,
                useMutableSource: Q,
                useSyncExternalStore: Q,
                useId: Q,
                unstable_isNewReconciler: !1
            }, Yh = {
                readContext: Vg,
                useCallback: function(a, b) {
                    ci().memoizedState = [ a, void 0 === b ? null : b ];
                    return a;
                },
                useContext: Vg,
                useEffect: vi,
                useImperativeHandle: function(a, b, c) {
                    c = null !== c && void 0 !== c ? c.concat([ a ]) : null;
                    return ti(4194308, 4, yi.bind(null, b, a), c);
                },
                useLayoutEffect: function(a, b) {
                    return ti(4194308, 4, a, b);
                },
                useInsertionEffect: function(a, b) {
                    return ti(4, 2, a, b);
                },
                useMemo: function(a, b) {
                    var c = ci();
                    b = void 0 === b ? null : b;
                    a = a();
                    c.memoizedState = [ a, b ];
                    return a;
                },
                useReducer: function(a, b, c) {
                    var d = ci();
                    b = void 0 !== c ? c(b) : b;
                    d.memoizedState = d.baseState = b;
                    a = {
                        pending: null,
                        interleaved: null,
                        lanes: 0,
                        dispatch: null,
                        lastRenderedReducer: a,
                        lastRenderedState: b
                    };
                    d.queue = a;
                    a = a.dispatch = Gi.bind(null, N, a);
                    return [ d.memoizedState, a ];
                },
                useRef: function(a) {
                    var b = ci();
                    a = {
                        current: a
                    };
                    return b.memoizedState = a;
                },
                useState: qi,
                useDebugValue: Ai,
                useDeferredValue: function(a) {
                    return ci().memoizedState = a;
                },
                useTransition: function() {
                    var a = qi(!1), b = a[0];
                    a = Ei.bind(null, a[1]);
                    ci().memoizedState = a;
                    return [ b, a ];
                },
                useMutableSource: function() {},
                useSyncExternalStore: function(a, b, c) {
                    var d = N, e = ci();
                    if (I) {
                        if (void 0 === c) throw Error(p(407));
                        c = c();
                    } else {
                        c = b();
                        if (null === R) throw Error(p(349));
                        0 !== (Rh & 30) || ni(d, b, c);
                    }
                    e.memoizedState = c;
                    var f = {
                        value: c,
                        getSnapshot: b
                    };
                    e.queue = f;
                    vi(ki.bind(null, d, f, a), [ a ]);
                    d.flags |= 2048;
                    li(9, mi.bind(null, d, f, c, b), void 0, null);
                    return c;
                },
                useId: function() {
                    var a = ci(), b = R.identifierPrefix;
                    if (I) {
                        var c = sg;
                        var d = rg;
                        c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
                        b = ":" + b + "R" + c;
                        c = Uh++;
                        0 < c && (b += "H" + c.toString(32));
                        b += ":";
                    } else c = Vh++, b = ":" + b + "r" + c.toString(32) + ":";
                    return a.memoizedState = b;
                },
                unstable_isNewReconciler: !1
            }, Zh = {
                readContext: Vg,
                useCallback: Bi,
                useContext: Vg,
                useEffect: ji,
                useImperativeHandle: zi,
                useInsertionEffect: wi,
                useLayoutEffect: xi,
                useMemo: Ci,
                useReducer: fi,
                useRef: si,
                useState: function() {
                    return fi(ei);
                },
                useDebugValue: Ai,
                useDeferredValue: function(a) {
                    var b = di();
                    return Di(b, O.memoizedState, a);
                },
                useTransition: function() {
                    var a = fi(ei)[0], b = di().memoizedState;
                    return [ a, b ];
                },
                useMutableSource: hi,
                useSyncExternalStore: ii,
                useId: Fi,
                unstable_isNewReconciler: !1
            }, $h = {
                readContext: Vg,
                useCallback: Bi,
                useContext: Vg,
                useEffect: ji,
                useImperativeHandle: zi,
                useInsertionEffect: wi,
                useLayoutEffect: xi,
                useMemo: Ci,
                useReducer: gi,
                useRef: si,
                useState: function() {
                    return gi(ei);
                },
                useDebugValue: Ai,
                useDeferredValue: function(a) {
                    var b = di();
                    return null === O ? b.memoizedState = a : Di(b, O.memoizedState, a);
                },
                useTransition: function() {
                    var a = gi(ei)[0], b = di().memoizedState;
                    return [ a, b ];
                },
                useMutableSource: hi,
                useSyncExternalStore: ii,
                useId: Fi,
                unstable_isNewReconciler: !1
            };
            function Ki(a, b) {
                try {
                    var c = "", d = b;
                    do {
                        c += Pa(d), d = d.return;
                    } while (d);
                    var e = c;
                } catch (f) {
                    e = "\nError generating stack: " + f.message + "\n" + f.stack;
                }
                return {
                    value: a,
                    source: b,
                    stack: e,
                    digest: null
                };
            }
            function Li(a, b, c) {
                return {
                    value: a,
                    source: null,
                    stack: null != c ? c : null,
                    digest: null != b ? b : null
                };
            }
            function Mi(a, b) {
                try {
                    console.error(b.value);
                } catch (c) {
                    setTimeout((function() {
                        throw c;
                    }));
                }
            }
            var Ni = "function" === typeof WeakMap ? WeakMap : Map;
            function Oi(a, b, c) {
                c = ch(-1, c);
                c.tag = 3;
                c.payload = {
                    element: null
                };
                var d = b.value;
                c.callback = function() {
                    Pi || (Pi = !0, Qi = d);
                    Mi(a, b);
                };
                return c;
            }
            function Ri(a, b, c) {
                c = ch(-1, c);
                c.tag = 3;
                var d = a.type.getDerivedStateFromError;
                if ("function" === typeof d) {
                    var e = b.value;
                    c.payload = function() {
                        return d(e);
                    };
                    c.callback = function() {
                        Mi(a, b);
                    };
                }
                var f = a.stateNode;
                null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
                    Mi(a, b);
                    "function" !== typeof d && (null === Si ? Si = new Set([ this ]) : Si.add(this));
                    var c = b.stack;
                    this.componentDidCatch(b.value, {
                        componentStack: null !== c ? c : ""
                    });
                });
                return c;
            }
            function Ti(a, b, c) {
                var d = a.pingCache;
                if (null === d) {
                    d = a.pingCache = new Ni;
                    var e = new Set;
                    d.set(b, e);
                } else e = d.get(b), void 0 === e && (e = new Set, d.set(b, e));
                e.has(c) || (e.add(c), a = Ui.bind(null, a, b, c), b.then(a, a));
            }
            function Vi(a) {
                do {
                    var b;
                    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? !0 : !1 : !0;
                    if (b) return a;
                    a = a.return;
                } while (null !== a);
                return null;
            }
            function Wi(a, b, c, d, e) {
                if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, 
                c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = ch(-1, 1), 
                b.tag = 2, dh(c, b, 1))), c.lanes |= 1), a;
                a.flags |= 65536;
                a.lanes = e;
                return a;
            }
            var Xi = ua.ReactCurrentOwner, Ug = !1;
            function Yi(a, b, c, d) {
                b.child = null === a ? Ch(b, null, c, d) : Bh(b, a.child, c, d);
            }
            function Zi(a, b, c, d, e) {
                c = c.render;
                var f = b.ref;
                Tg(b, e);
                d = Xh(a, b, c, d, f, e);
                c = bi();
                if (null !== a && !Ug) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, 
                $i(a, b, e);
                I && c && vg(b);
                b.flags |= 1;
                Yi(a, b, d, e);
                return b.child;
            }
            function aj(a, b, c, d, e) {
                if (null === a) {
                    var f = c.type;
                    if ("function" === typeof f && !bj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, 
                    b.type = f, cj(a, b, f, d, e);
                    a = yh(c.type, null, d, b, b.mode, e);
                    a.ref = b.ref;
                    a.return = b;
                    return b.child = a;
                }
                f = a.child;
                if (0 === (a.lanes & e)) {
                    var g = f.memoizedProps;
                    c = c.compare;
                    c = null !== c ? c : Ie;
                    if (c(g, d) && a.ref === b.ref) return $i(a, b, e);
                }
                b.flags |= 1;
                a = wh(f, d);
                a.ref = b.ref;
                a.return = b;
                return b.child = a;
            }
            function cj(a, b, c, d, e) {
                if (null !== a) {
                    var f = a.memoizedProps;
                    if (Ie(f, d) && a.ref === b.ref) if (Ug = !1, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (Ug = !0); else return b.lanes = a.lanes, 
                    $i(a, b, e);
                }
                return dj(a, b, c, d, e);
            }
            function ej(a, b, c) {
                var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
                if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = {
                    baseLanes: 0,
                    cachePool: null,
                    transitions: null
                }, G(fj, gj), gj |= c; else {
                    if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, 
                    b.memoizedState = {
                        baseLanes: a,
                        cachePool: null,
                        transitions: null
                    }, b.updateQueue = null, G(fj, gj), gj |= a, null;
                    b.memoizedState = {
                        baseLanes: 0,
                        cachePool: null,
                        transitions: null
                    };
                    d = null !== f ? f.baseLanes : c;
                    G(fj, gj);
                    gj |= d;
                } else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(fj, gj), 
                gj |= d;
                Yi(a, b, e, c);
                return b.child;
            }
            function hj(a, b) {
                var c = b.ref;
                if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
            }
            function dj(a, b, c, d, e) {
                var f = Zf(c) ? Xf : H.current;
                f = Yf(b, f);
                Tg(b, e);
                c = Xh(a, b, c, d, f, e);
                d = bi();
                if (null !== a && !Ug) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, 
                $i(a, b, e);
                I && d && vg(b);
                b.flags |= 1;
                Yi(a, b, c, e);
                return b.child;
            }
            function ij(a, b, c, d, e) {
                if (Zf(c)) {
                    var f = !0;
                    cg(b);
                } else f = !1;
                Tg(b, e);
                if (null === b.stateNode) jj(a, b), ph(b, c, d), rh(b, c, d, e), d = !0; else if (null === a) {
                    var g = b.stateNode, h = b.memoizedProps;
                    g.props = h;
                    var k = g.context, l = c.contextType;
                    "object" === typeof l && null !== l ? l = Vg(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
                    var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
                    q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && qh(b, g, d, l);
                    $g = !1;
                    var r = b.memoizedState;
                    g.state = r;
                    gh(b, d, g, e);
                    k = b.memoizedState;
                    h !== d || r !== k || Wf.current || $g ? ("function" === typeof m && (kh(b, c, m, d), 
                    k = b.memoizedState), (h = $g || oh(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), 
                    "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), 
                    "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), 
                    b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, 
                    d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = !1);
                } else {
                    g = b.stateNode;
                    bh(a, b);
                    h = b.memoizedProps;
                    l = b.type === b.elementType ? h : Lg(b.type, h);
                    g.props = l;
                    q = b.pendingProps;
                    r = g.context;
                    k = c.contextType;
                    "object" === typeof k && null !== k ? k = Vg(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
                    var y = c.getDerivedStateFromProps;
                    (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && qh(b, g, d, k);
                    $g = !1;
                    r = b.memoizedState;
                    g.state = r;
                    gh(b, d, g, e);
                    var n = b.memoizedState;
                    h !== q || r !== n || Wf.current || $g ? ("function" === typeof y && (kh(b, c, y, d), 
                    n = b.memoizedState), (l = $g || oh(b, c, l, d, r, n, k) || !1) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), 
                    "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), 
                    "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), 
                    "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), 
                    b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, 
                    d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), 
                    "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), 
                    d = !1);
                }
                return kj(a, b, c, d, f, e);
            }
            function kj(a, b, c, d, e, f) {
                hj(a, b);
                var g = 0 !== (b.flags & 128);
                if (!d && !g) return e && dg(b, c, !1), $i(a, b, f);
                d = b.stateNode;
                Xi.current = b;
                var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
                b.flags |= 1;
                null !== a && g ? (b.child = Bh(b, a.child, null, f), b.child = Bh(b, null, h, f)) : Yi(a, b, h, f);
                b.memoizedState = d.state;
                e && dg(b, c, !0);
                return b.child;
            }
            function lj(a) {
                var b = a.stateNode;
                b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, !1);
                Ih(a, b.containerInfo);
            }
            function mj(a, b, c, d, e) {
                Ig();
                Jg(e);
                b.flags |= 256;
                Yi(a, b, c, d);
                return b.child;
            }
            var nj = {
                dehydrated: null,
                treeContext: null,
                retryLane: 0
            };
            function oj(a) {
                return {
                    baseLanes: a,
                    cachePool: null,
                    transitions: null
                };
            }
            function pj(a, b, c) {
                var h, d = b.pendingProps, e = M.current, f = !1, g = 0 !== (b.flags & 128);
                (h = g) || (h = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));
                if (h) f = !0, b.flags &= -129; else if (null === a || null !== a.memoizedState) e |= 1;
                G(M, e & 1);
                if (null === a) {
                    Eg(b);
                    a = b.memoizedState;
                    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, 
                    null;
                    g = d.children;
                    a = d.fallback;
                    return f ? (d = b.mode, f = b.child, g = {
                        mode: "hidden",
                        children: g
                    }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = qj(g, d, 0, null), 
                    a = Ah(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = oj(c), 
                    b.memoizedState = nj, a) : rj(b, g);
                }
                e = a.memoizedState;
                if (null !== e && (h = e.dehydrated, null !== h)) return sj(a, b, g, d, h, e, c);
                if (f) {
                    f = d.fallback;
                    g = b.mode;
                    e = a.child;
                    h = e.sibling;
                    var k = {
                        mode: "hidden",
                        children: d.children
                    };
                    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, 
                    b.deletions = null) : (d = wh(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
                    null !== h ? f = wh(h, f) : (f = Ah(f, g, c, null), f.flags |= 2);
                    f.return = b;
                    d.return = b;
                    d.sibling = f;
                    b.child = d;
                    d = f;
                    f = b.child;
                    g = a.child.memoizedState;
                    g = null === g ? oj(c) : {
                        baseLanes: g.baseLanes | c,
                        cachePool: null,
                        transitions: g.transitions
                    };
                    f.memoizedState = g;
                    f.childLanes = a.childLanes & ~c;
                    b.memoizedState = nj;
                    return d;
                }
                f = a.child;
                a = f.sibling;
                d = wh(f, {
                    mode: "visible",
                    children: d.children
                });
                0 === (b.mode & 1) && (d.lanes = c);
                d.return = b;
                d.sibling = null;
                null !== a && (c = b.deletions, null === c ? (b.deletions = [ a ], b.flags |= 16) : c.push(a));
                b.child = d;
                b.memoizedState = null;
                return d;
            }
            function rj(a, b) {
                b = qj({
                    mode: "visible",
                    children: b
                }, a.mode, 0, null);
                b.return = a;
                return a.child = b;
            }
            function tj(a, b, c, d) {
                null !== d && Jg(d);
                Bh(b, a.child, null, c);
                a = rj(b, b.pendingProps.children);
                a.flags |= 2;
                b.memoizedState = null;
                return a;
            }
            function sj(a, b, c, d, e, f, g) {
                if (c) {
                    if (b.flags & 256) return b.flags &= -257, d = Li(Error(p(422))), tj(a, b, g, d);
                    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
                    f = d.fallback;
                    e = b.mode;
                    d = qj({
                        mode: "visible",
                        children: d.children
                    }, e, 0, null);
                    f = Ah(f, e, g, null);
                    f.flags |= 2;
                    d.return = b;
                    f.return = b;
                    d.sibling = f;
                    b.child = d;
                    0 !== (b.mode & 1) && Bh(b, a.child, null, g);
                    b.child.memoizedState = oj(g);
                    b.memoizedState = nj;
                    return f;
                }
                if (0 === (b.mode & 1)) return tj(a, b, g, null);
                if ("$!" === e.data) {
                    d = e.nextSibling && e.nextSibling.dataset;
                    if (d) var h = d.dgst;
                    d = h;
                    f = Error(p(419));
                    d = Li(f, d, void 0);
                    return tj(a, b, g, d);
                }
                h = 0 !== (g & a.childLanes);
                if (Ug || h) {
                    d = R;
                    if (null !== d) {
                        switch (g & -g) {
                          case 4:
                            e = 2;
                            break;

                          case 16:
                            e = 8;
                            break;

                          case 64:
                          case 128:
                          case 256:
                          case 512:
                          case 1024:
                          case 2048:
                          case 4096:
                          case 8192:
                          case 16384:
                          case 32768:
                          case 65536:
                          case 131072:
                          case 262144:
                          case 524288:
                          case 1048576:
                          case 2097152:
                          case 4194304:
                          case 8388608:
                          case 16777216:
                          case 33554432:
                          case 67108864:
                            e = 32;
                            break;

                          case 536870912:
                            e = 268435456;
                            break;

                          default:
                            e = 0;
                        }
                        e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
                        0 !== e && e !== f.retryLane && (f.retryLane = e, Zg(a, e), mh(d, a, e, -1));
                    }
                    uj();
                    d = Li(Error(p(421)));
                    return tj(a, b, g, d);
                }
                if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = vj.bind(null, a), 
                e._reactRetry = b, null;
                a = f.treeContext;
                yg = Lf(e.nextSibling);
                xg = b;
                I = !0;
                zg = null;
                null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, 
                qg = b);
                b = rj(b, d.children);
                b.flags |= 4096;
                return b;
            }
            function wj(a, b, c) {
                a.lanes |= b;
                var d = a.alternate;
                null !== d && (d.lanes |= b);
                Sg(a.return, b, c);
            }
            function xj(a, b, c, d, e) {
                var f = a.memoizedState;
                null === f ? a.memoizedState = {
                    isBackwards: b,
                    rendering: null,
                    renderingStartTime: 0,
                    last: d,
                    tail: c,
                    tailMode: e
                } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, 
                f.tail = c, f.tailMode = e);
            }
            function yj(a, b, c) {
                var d = b.pendingProps, e = d.revealOrder, f = d.tail;
                Yi(a, b, d.children, c);
                d = M.current;
                if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128; else {
                    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
                        if (13 === a.tag) null !== a.memoizedState && wj(a, c, b); else if (19 === a.tag) wj(a, c, b); else if (null !== a.child) {
                            a.child.return = a;
                            a = a.child;
                            continue;
                        }
                        if (a === b) break a;
                        for (;null === a.sibling; ) {
                            if (null === a.return || a.return === b) break a;
                            a = a.return;
                        }
                        a.sibling.return = a.return;
                        a = a.sibling;
                    }
                    d &= 1;
                }
                G(M, d);
                if (0 === (b.mode & 1)) b.memoizedState = null; else switch (e) {
                  case "forwards":
                    c = b.child;
                    for (e = null; null !== c; ) a = c.alternate, null !== a && null === Mh(a) && (e = c), 
                    c = c.sibling;
                    c = e;
                    null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
                    xj(b, !1, e, c, f);
                    break;

                  case "backwards":
                    c = null;
                    e = b.child;
                    for (b.child = null; null !== e; ) {
                        a = e.alternate;
                        if (null !== a && null === Mh(a)) {
                            b.child = e;
                            break;
                        }
                        a = e.sibling;
                        e.sibling = c;
                        c = e;
                        e = a;
                    }
                    xj(b, !0, c, null, f);
                    break;

                  case "together":
                    xj(b, !1, null, null, void 0);
                    break;

                  default:
                    b.memoizedState = null;
                }
                return b.child;
            }
            function jj(a, b) {
                0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
            }
            function $i(a, b, c) {
                null !== a && (b.dependencies = a.dependencies);
                hh |= b.lanes;
                if (0 === (c & b.childLanes)) return null;
                if (null !== a && b.child !== a.child) throw Error(p(153));
                if (null !== b.child) {
                    a = b.child;
                    c = wh(a, a.pendingProps);
                    b.child = c;
                    for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = wh(a, a.pendingProps), 
                    c.return = b;
                    c.sibling = null;
                }
                return b.child;
            }
            function zj(a, b, c) {
                switch (b.tag) {
                  case 3:
                    lj(b);
                    Ig();
                    break;

                  case 5:
                    Kh(b);
                    break;

                  case 1:
                    Zf(b.type) && cg(b);
                    break;

                  case 4:
                    Ih(b, b.stateNode.containerInfo);
                    break;

                  case 10:
                    var d = b.type._context, e = b.memoizedProps.value;
                    G(Mg, d._currentValue);
                    d._currentValue = e;
                    break;

                  case 13:
                    d = b.memoizedState;
                    if (null !== d) {
                        if (null !== d.dehydrated) return G(M, M.current & 1), b.flags |= 128, null;
                        if (0 !== (c & b.child.childLanes)) return pj(a, b, c);
                        G(M, M.current & 1);
                        a = $i(a, b, c);
                        return null !== a ? a.sibling : null;
                    }
                    G(M, M.current & 1);
                    break;

                  case 19:
                    d = 0 !== (c & b.childLanes);
                    if (0 !== (a.flags & 128)) {
                        if (d) return yj(a, b, c);
                        b.flags |= 128;
                    }
                    e = b.memoizedState;
                    null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
                    G(M, M.current);
                    if (d) break; else return null;

                  case 22:
                  case 23:
                    return b.lanes = 0, ej(a, b, c);
                }
                return $i(a, b, c);
            }
            var Aj, Bj, Cj, Dj;
            Aj = function(a, b) {
                for (var c = b.child; null !== c; ) {
                    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode); else if (4 !== c.tag && null !== c.child) {
                        c.child.return = c;
                        c = c.child;
                        continue;
                    }
                    if (c === b) break;
                    for (;null === c.sibling; ) {
                        if (null === c.return || c.return === b) return;
                        c = c.return;
                    }
                    c.sibling.return = c.return;
                    c = c.sibling;
                }
            };
            Bj = function() {};
            Cj = function(a, b, c, d) {
                var e = a.memoizedProps;
                if (e !== d) {
                    a = b.stateNode;
                    Hh(Eh.current);
                    var f = null;
                    switch (c) {
                      case "input":
                        e = Ya(a, e);
                        d = Ya(a, d);
                        f = [];
                        break;

                      case "select":
                        e = A({}, e, {
                            value: void 0
                        });
                        d = A({}, d, {
                            value: void 0
                        });
                        f = [];
                        break;

                      case "textarea":
                        e = gb(a, e);
                        d = gb(a, d);
                        f = [];
                        break;

                      default:
                        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
                    }
                    ub(c, d);
                    var g;
                    c = null;
                    for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
                        var h = e[l];
                        for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
                    } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
                    for (l in d) {
                        var k = d[l];
                        h = null != e ? e[l] : void 0;
                        if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
                            for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), 
                            c[g] = "");
                            for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
                        } else c || (f || (f = []), f.push(l, c)), c = k; else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, 
                        h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), 
                        f || h === k || (f = [])) : (f = f || []).push(l, k));
                    }
                    c && (f = f || []).push("style", c);
                    var l = f;
                    if (b.updateQueue = l) b.flags |= 4;
                }
            };
            Dj = function(a, b, c, d) {
                c !== d && (b.flags |= 4);
            };
            function Ej(a, b) {
                if (!I) switch (a.tailMode) {
                  case "hidden":
                    b = a.tail;
                    for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
                    null === c ? a.tail = null : c.sibling = null;
                    break;

                  case "collapsed":
                    c = a.tail;
                    for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
                    null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
                }
            }
            function S(a) {
                var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
                if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, 
                d |= e.flags & 14680064, e.return = a, e = e.sibling; else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, 
                d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
                a.subtreeFlags |= d;
                a.childLanes = c;
                return b;
            }
            function Fj(a, b, c) {
                var d = b.pendingProps;
                wg(b);
                switch (b.tag) {
                  case 2:
                  case 16:
                  case 15:
                  case 0:
                  case 11:
                  case 7:
                  case 8:
                  case 12:
                  case 9:
                  case 14:
                    return S(b), null;

                  case 1:
                    return Zf(b.type) && $f(), S(b), null;

                  case 3:
                    d = b.stateNode;
                    Jh();
                    E(Wf);
                    E(H);
                    Oh();
                    d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
                    if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, 
                    null !== zg && (Gj(zg), zg = null));
                    Bj(a, b);
                    S(b);
                    return null;

                  case 5:
                    Lh(b);
                    var e = Hh(Gh.current);
                    c = b.type;
                    if (null !== a && null != b.stateNode) Cj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, 
                    b.flags |= 2097152); else {
                        if (!d) {
                            if (null === b.stateNode) throw Error(p(166));
                            S(b);
                            return null;
                        }
                        a = Hh(Eh.current);
                        if (Gg(b)) {
                            d = b.stateNode;
                            c = b.type;
                            var f = b.memoizedProps;
                            d[Of] = b;
                            d[Pf] = f;
                            a = 0 !== (b.mode & 1);
                            switch (c) {
                              case "dialog":
                                D("cancel", d);
                                D("close", d);
                                break;

                              case "iframe":
                              case "object":
                              case "embed":
                                D("load", d);
                                break;

                              case "video":
                              case "audio":
                                for (e = 0; e < lf.length; e++) D(lf[e], d);
                                break;

                              case "source":
                                D("error", d);
                                break;

                              case "img":
                              case "image":
                              case "link":
                                D("error", d);
                                D("load", d);
                                break;

                              case "details":
                                D("toggle", d);
                                break;

                              case "input":
                                Za(d, f);
                                D("invalid", d);
                                break;

                              case "select":
                                d._wrapperState = {
                                    wasMultiple: !!f.multiple
                                };
                                D("invalid", d);
                                break;

                              case "textarea":
                                hb(d, f), D("invalid", d);
                            }
                            ub(c, f);
                            e = null;
                            for (var g in f) if (f.hasOwnProperty(g)) {
                                var h = f[g];
                                "children" === g ? "string" === typeof h ? d.textContent !== h && (!0 !== f.suppressHydrationWarning && Af(d.textContent, h, a), 
                                e = [ "children", h ]) : "number" === typeof h && d.textContent !== "" + h && (!0 !== f.suppressHydrationWarning && Af(d.textContent, h, a), 
                                e = [ "children", "" + h ]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
                            }
                            switch (c) {
                              case "input":
                                Va(d);
                                db(d, f, !0);
                                break;

                              case "textarea":
                                Va(d);
                                jb(d);
                                break;

                              case "select":
                              case "option":
                                break;

                              default:
                                "function" === typeof f.onClick && (d.onclick = Bf);
                            }
                            d = e;
                            b.updateQueue = d;
                            null !== d && (b.flags |= 4);
                        } else {
                            g = 9 === e.nodeType ? e : e.ownerDocument;
                            "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
                            "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), 
                            a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, {
                                is: d.is
                            }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = !0 : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                            a[Of] = b;
                            a[Pf] = d;
                            Aj(a, b, !1, !1);
                            b.stateNode = a;
                            a: {
                                g = vb(c, d);
                                switch (c) {
                                  case "dialog":
                                    D("cancel", a);
                                    D("close", a);
                                    e = d;
                                    break;

                                  case "iframe":
                                  case "object":
                                  case "embed":
                                    D("load", a);
                                    e = d;
                                    break;

                                  case "video":
                                  case "audio":
                                    for (e = 0; e < lf.length; e++) D(lf[e], a);
                                    e = d;
                                    break;

                                  case "source":
                                    D("error", a);
                                    e = d;
                                    break;

                                  case "img":
                                  case "image":
                                  case "link":
                                    D("error", a);
                                    D("load", a);
                                    e = d;
                                    break;

                                  case "details":
                                    D("toggle", a);
                                    e = d;
                                    break;

                                  case "input":
                                    Za(a, d);
                                    e = Ya(a, d);
                                    D("invalid", a);
                                    break;

                                  case "option":
                                    e = d;
                                    break;

                                  case "select":
                                    a._wrapperState = {
                                        wasMultiple: !!d.multiple
                                    };
                                    e = A({}, d, {
                                        value: void 0
                                    });
                                    D("invalid", a);
                                    break;

                                  case "textarea":
                                    hb(a, d);
                                    e = gb(a, d);
                                    D("invalid", a);
                                    break;

                                  default:
                                    e = d;
                                }
                                ub(c, e);
                                h = e;
                                for (f in h) if (h.hasOwnProperty(f)) {
                                    var k = h[f];
                                    "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, 
                                    null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                                }
                                switch (c) {
                                  case "input":
                                    Va(a);
                                    db(a, d, !1);
                                    break;

                                  case "textarea":
                                    Va(a);
                                    jb(a);
                                    break;

                                  case "option":
                                    null != d.value && a.setAttribute("value", "" + Sa(d.value));
                                    break;

                                  case "select":
                                    a.multiple = !!d.multiple;
                                    f = d.value;
                                    null != f ? fb(a, !!d.multiple, f, !1) : null != d.defaultValue && fb(a, !!d.multiple, d.defaultValue, !0);
                                    break;

                                  default:
                                    "function" === typeof e.onClick && (a.onclick = Bf);
                                }
                                switch (c) {
                                  case "button":
                                  case "input":
                                  case "select":
                                  case "textarea":
                                    d = !!d.autoFocus;
                                    break a;

                                  case "img":
                                    d = !0;
                                    break a;

                                  default:
                                    d = !1;
                                }
                            }
                            d && (b.flags |= 4);
                        }
                        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
                    }
                    S(b);
                    return null;

                  case 6:
                    if (a && null != b.stateNode) Dj(a, b, a.memoizedProps, d); else {
                        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
                        c = Hh(Gh.current);
                        Hh(Eh.current);
                        if (Gg(b)) {
                            d = b.stateNode;
                            c = b.memoizedProps;
                            d[Of] = b;
                            if (f = d.nodeValue !== c) if (a = xg, null !== a) switch (a.tag) {
                              case 3:
                                Af(d.nodeValue, c, 0 !== (a.mode & 1));
                                break;

                              case 5:
                                !0 !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                            }
                            f && (b.flags |= 4);
                        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, 
                        b.stateNode = d;
                    }
                    S(b);
                    return null;

                  case 13:
                    E(M);
                    d = b.memoizedState;
                    if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
                        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), 
                        b.flags |= 98560, f = !1; else if (f = Gg(b), null !== d && null !== d.dehydrated) {
                            if (null === a) {
                                if (!f) throw Error(p(318));
                                f = b.memoizedState;
                                f = null !== f ? f.dehydrated : null;
                                if (!f) throw Error(p(317));
                                f[Of] = b;
                            } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
                            S(b);
                            f = !1;
                        } else null !== zg && (Gj(zg), zg = null), f = !0;
                        if (!f) return b.flags & 65536 ? b : null;
                    }
                    if (0 !== (b.flags & 128)) return b.lanes = c, b;
                    d = null !== d;
                    d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (M.current & 1) ? 0 === T && (T = 3) : uj()));
                    null !== b.updateQueue && (b.flags |= 4);
                    S(b);
                    return null;

                  case 4:
                    return Jh(), Bj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;

                  case 10:
                    return Rg(b.type._context), S(b), null;

                  case 17:
                    return Zf(b.type) && $f(), S(b), null;

                  case 19:
                    E(M);
                    f = b.memoizedState;
                    if (null === f) return S(b), null;
                    d = 0 !== (b.flags & 128);
                    g = f.rendering;
                    if (null === g) if (d) Ej(f, !1); else {
                        if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
                            g = Mh(a);
                            if (null !== g) {
                                b.flags |= 128;
                                Ej(f, !1);
                                d = g.updateQueue;
                                null !== d && (b.updateQueue = d, b.flags |= 4);
                                b.subtreeFlags = 0;
                                d = c;
                                for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 14680066, g = f.alternate, 
                                null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, 
                                f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, 
                                f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, 
                                f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, 
                                f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : {
                                    lanes: a.lanes,
                                    firstContext: a.firstContext
                                }), c = c.sibling;
                                G(M, M.current & 1 | 2);
                                return b.child;
                            }
                            a = a.sibling;
                        }
                        null !== f.tail && B() > Hj && (b.flags |= 128, d = !0, Ej(f, !1), b.lanes = 4194304);
                    } else {
                        if (!d) if (a = Mh(g), null !== a) {
                            if (b.flags |= 128, d = !0, c = a.updateQueue, null !== c && (b.updateQueue = c, 
                            b.flags |= 4), Ej(f, !0), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), 
                            null;
                        } else 2 * B() - f.renderingStartTime > Hj && 1073741824 !== c && (b.flags |= 128, 
                        d = !0, Ej(f, !1), b.lanes = 4194304);
                        f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, 
                        f.last = g);
                    }
                    if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), 
                    b.sibling = null, c = M.current, G(M, d ? c & 1 | 2 : c & 1), b;
                    S(b);
                    return null;

                  case 22:
                  case 23:
                    return Ij(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), 
                    d && 0 !== (b.mode & 1) ? 0 !== (gj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), 
                    null;

                  case 24:
                    return null;

                  case 25:
                    return null;
                }
                throw Error(p(156, b.tag));
            }
            function Jj(a, b) {
                wg(b);
                switch (b.tag) {
                  case 1:
                    return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, 
                    b) : null;

                  case 3:
                    return Jh(), E(Wf), E(H), Oh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, 
                    b) : null;

                  case 5:
                    return Lh(b), null;

                  case 13:
                    E(M);
                    a = b.memoizedState;
                    if (null !== a && null !== a.dehydrated) {
                        if (null === b.alternate) throw Error(p(340));
                        Ig();
                    }
                    a = b.flags;
                    return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;

                  case 19:
                    return E(M), null;

                  case 4:
                    return Jh(), null;

                  case 10:
                    return Rg(b.type._context), null;

                  case 22:
                  case 23:
                    return Ij(), null;

                  case 24:
                    return null;

                  default:
                    return null;
                }
            }
            var Kj = !1, U = !1, Lj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
            function Mj(a, b) {
                var c = a.ref;
                if (null !== c) if ("function" === typeof c) try {
                    c(null);
                } catch (d) {
                    W(a, b, d);
                } else c.current = null;
            }
            function Nj(a, b, c) {
                try {
                    c();
                } catch (d) {
                    W(a, b, d);
                }
            }
            var Oj = !1;
            function Pj(a, b) {
                Cf = dd;
                a = Me();
                if (Ne(a)) {
                    if ("selectionStart" in a) var c = {
                        start: a.selectionStart,
                        end: a.selectionEnd
                    }; else a: {
                        c = (c = a.ownerDocument) && c.defaultView || window;
                        var d = c.getSelection && c.getSelection();
                        if (d && 0 !== d.rangeCount) {
                            c = d.anchorNode;
                            var e = d.anchorOffset, f = d.focusNode;
                            d = d.focusOffset;
                            try {
                                c.nodeType, f.nodeType;
                            } catch (F) {
                                c = null;
                                break a;
                            }
                            var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
                            b: for (;;) {
                                for (var y; ;) {
                                    q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                                    q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                                    3 === q.nodeType && (g += q.nodeValue.length);
                                    if (null === (y = q.firstChild)) break;
                                    r = q;
                                    q = y;
                                }
                                for (;;) {
                                    if (q === a) break b;
                                    r === c && ++l === e && (h = g);
                                    r === f && ++m === d && (k = g);
                                    if (null !== (y = q.nextSibling)) break;
                                    q = r;
                                    r = q.parentNode;
                                }
                                q = y;
                            }
                            c = -1 === h || -1 === k ? null : {
                                start: h,
                                end: k
                            };
                        } else c = null;
                    }
                    c = c || {
                        start: 0,
                        end: 0
                    };
                } else c = null;
                Df = {
                    focusedElem: a,
                    selectionRange: c
                };
                dd = !1;
                for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, 
                V = a; else for (;null !== V; ) {
                    b = V;
                    try {
                        var n = b.alternate;
                        if (0 !== (b.flags & 1024)) switch (b.tag) {
                          case 0:
                          case 11:
                          case 15:
                            break;

                          case 1:
                            if (null !== n) {
                                var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Lg(b.type, t), J);
                                x.__reactInternalSnapshotBeforeUpdate = w;
                            }
                            break;

                          case 3:
                            var u = b.stateNode.containerInfo;
                            1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                            break;

                          case 5:
                          case 6:
                          case 4:
                          case 17:
                            break;

                          default:
                            throw Error(p(163));
                        }
                    } catch (F) {
                        W(b, b.return, F);
                    }
                    a = b.sibling;
                    if (null !== a) {
                        a.return = b.return;
                        V = a;
                        break;
                    }
                    V = b.return;
                }
                n = Oj;
                Oj = !1;
                return n;
            }
            function Qj(a, b, c) {
                var d = b.updateQueue;
                d = null !== d ? d.lastEffect : null;
                if (null !== d) {
                    var e = d = d.next;
                    do {
                        if ((e.tag & a) === a) {
                            var f = e.destroy;
                            e.destroy = void 0;
                            void 0 !== f && Nj(b, c, f);
                        }
                        e = e.next;
                    } while (e !== d);
                }
            }
            function Rj(a, b) {
                b = b.updateQueue;
                b = null !== b ? b.lastEffect : null;
                if (null !== b) {
                    var c = b = b.next;
                    do {
                        if ((c.tag & a) === a) {
                            var d = c.create;
                            c.destroy = d();
                        }
                        c = c.next;
                    } while (c !== b);
                }
            }
            function Sj(a) {
                var b = a.ref;
                if (null !== b) {
                    var c = a.stateNode;
                    switch (a.tag) {
                      case 5:
                        a = c;
                        break;

                      default:
                        a = c;
                    }
                    "function" === typeof b ? b(a) : b.current = a;
                }
            }
            function Tj(a) {
                var b = a.alternate;
                null !== b && (a.alternate = null, Tj(b));
                a.child = null;
                a.deletions = null;
                a.sibling = null;
                5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], 
                delete b[Qf], delete b[Rf]));
                a.stateNode = null;
                a.return = null;
                a.dependencies = null;
                a.memoizedProps = null;
                a.memoizedState = null;
                a.pendingProps = null;
                a.stateNode = null;
                a.updateQueue = null;
            }
            function Uj(a) {
                return 5 === a.tag || 3 === a.tag || 4 === a.tag;
            }
            function Vj(a) {
                a: for (;;) {
                    for (;null === a.sibling; ) {
                        if (null === a.return || Uj(a.return)) return null;
                        a = a.return;
                    }
                    a.sibling.return = a.return;
                    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
                        if (a.flags & 2) continue a;
                        if (null === a.child || 4 === a.tag) continue a; else a.child.return = a, a = a.child;
                    }
                    if (!(a.flags & 2)) return a.stateNode;
                }
            }
            function Wj(a, b, c) {
                var d = a.tag;
                if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, 
                b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf)); else if (4 !== d && (a = a.child, 
                null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
            }
            function Xj(a, b, c) {
                var d = a.tag;
                if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a); else if (4 !== d && (a = a.child, 
                null !== a)) for (Xj(a, b, c), a = a.sibling; null !== a; ) Xj(a, b, c), a = a.sibling;
            }
            var X = null, Yj = !1;
            function Zj(a, b, c) {
                for (c = c.child; null !== c; ) ak(a, b, c), c = c.sibling;
            }
            function ak(a, b, c) {
                if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
                    lc.onCommitFiberUnmount(kc, c);
                } catch (h) {}
                switch (c.tag) {
                  case 5:
                    U || Mj(c, b);

                  case 6:
                    var d = X, e = Yj;
                    X = null;
                    Zj(a, b, c);
                    X = d;
                    Yj = e;
                    null !== X && (Yj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
                    break;

                  case 18:
                    null !== X && (Yj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), 
                    bd(a)) : Kf(X, c.stateNode));
                    break;

                  case 4:
                    d = X;
                    e = Yj;
                    X = c.stateNode.containerInfo;
                    Yj = !0;
                    Zj(a, b, c);
                    X = d;
                    Yj = e;
                    break;

                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
                        e = d = d.next;
                        do {
                            var f = e, g = f.destroy;
                            f = f.tag;
                            void 0 !== g && (0 !== (f & 2) ? Nj(c, b, g) : 0 !== (f & 4) && Nj(c, b, g));
                            e = e.next;
                        } while (e !== d);
                    }
                    Zj(a, b, c);
                    break;

                  case 1:
                    if (!U && (Mj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
                        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
                    } catch (h) {
                        W(c, b, h);
                    }
                    Zj(a, b, c);
                    break;

                  case 21:
                    Zj(a, b, c);
                    break;

                  case 22:
                    c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Zj(a, b, c), U = d) : Zj(a, b, c);
                    break;

                  default:
                    Zj(a, b, c);
                }
            }
            function bk(a) {
                var b = a.updateQueue;
                if (null !== b) {
                    a.updateQueue = null;
                    var c = a.stateNode;
                    null === c && (c = a.stateNode = new Lj);
                    b.forEach((function(b) {
                        var d = ck.bind(null, a, b);
                        c.has(b) || (c.add(b), b.then(d, d));
                    }));
                }
            }
            function dk(a, b) {
                var c = b.deletions;
                if (null !== c) for (var d = 0; d < c.length; d++) {
                    var e = c[d];
                    try {
                        var f = a, g = b, h = g;
                        a: for (;null !== h; ) {
                            switch (h.tag) {
                              case 5:
                                X = h.stateNode;
                                Yj = !1;
                                break a;

                              case 3:
                                X = h.stateNode.containerInfo;
                                Yj = !0;
                                break a;

                              case 4:
                                X = h.stateNode.containerInfo;
                                Yj = !0;
                                break a;
                            }
                            h = h.return;
                        }
                        if (null === X) throw Error(p(160));
                        ak(f, g, e);
                        X = null;
                        Yj = !1;
                        var k = e.alternate;
                        null !== k && (k.return = null);
                        e.return = null;
                    } catch (l) {
                        W(e, b, l);
                    }
                }
                if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) ek(b, a), b = b.sibling;
            }
            function ek(a, b) {
                var c = a.alternate, d = a.flags;
                switch (a.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    dk(b, a);
                    fk(a);
                    if (d & 4) {
                        try {
                            Qj(3, a, a.return), Rj(3, a);
                        } catch (t) {
                            W(a, a.return, t);
                        }
                        try {
                            Qj(5, a, a.return);
                        } catch (t) {
                            W(a, a.return, t);
                        }
                    }
                    break;

                  case 1:
                    dk(b, a);
                    fk(a);
                    d & 512 && null !== c && Mj(c, c.return);
                    break;

                  case 5:
                    dk(b, a);
                    fk(a);
                    d & 512 && null !== c && Mj(c, c.return);
                    if (a.flags & 32) {
                        var e = a.stateNode;
                        try {
                            ob(e, "");
                        } catch (t) {
                            W(a, a.return, t);
                        }
                    }
                    if (d & 4 && (e = a.stateNode, null != e)) {
                        var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
                        a.updateQueue = null;
                        if (null !== k) try {
                            "input" === h && "radio" === f.type && null != f.name && ab(e, f);
                            vb(h, g);
                            var l = vb(h, f);
                            for (g = 0; g < k.length; g += 2) {
                                var m = k[g], q = k[g + 1];
                                "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
                            }
                            switch (h) {
                              case "input":
                                bb(e, f);
                                break;

                              case "textarea":
                                ib(e, f);
                                break;

                              case "select":
                                var r = e._wrapperState.wasMultiple;
                                e._wrapperState.wasMultiple = !!f.multiple;
                                var y = f.value;
                                null != y ? fb(e, !!f.multiple, y, !1) : r !== !!f.multiple && (null != f.defaultValue ? fb(e, !!f.multiple, f.defaultValue, !0) : fb(e, !!f.multiple, f.multiple ? [] : "", !1));
                            }
                            e[Pf] = f;
                        } catch (t) {
                            W(a, a.return, t);
                        }
                    }
                    break;

                  case 6:
                    dk(b, a);
                    fk(a);
                    if (d & 4) {
                        if (null === a.stateNode) throw Error(p(162));
                        e = a.stateNode;
                        f = a.memoizedProps;
                        try {
                            e.nodeValue = f;
                        } catch (t) {
                            W(a, a.return, t);
                        }
                    }
                    break;

                  case 3:
                    dk(b, a);
                    fk(a);
                    if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
                        bd(b.containerInfo);
                    } catch (t) {
                        W(a, a.return, t);
                    }
                    break;

                  case 4:
                    dk(b, a);
                    fk(a);
                    break;

                  case 13:
                    dk(b, a);
                    fk(a);
                    e = a.child;
                    e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (gk = B()));
                    d & 4 && bk(a);
                    break;

                  case 22:
                    m = null !== c && null !== c.memoizedState;
                    a.mode & 1 ? (U = (l = U) || m, dk(b, a), U = l) : dk(b, a);
                    fk(a);
                    if (d & 8192) {
                        l = null !== a.memoizedState;
                        if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m; ) {
                            for (q = V = m; null !== V; ) {
                                r = V;
                                y = r.child;
                                switch (r.tag) {
                                  case 0:
                                  case 11:
                                  case 14:
                                  case 15:
                                    Qj(4, r, r.return);
                                    break;

                                  case 1:
                                    Mj(r, r.return);
                                    var n = r.stateNode;
                                    if ("function" === typeof n.componentWillUnmount) {
                                        d = r;
                                        c = r.return;
                                        try {
                                            b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                                        } catch (t) {
                                            W(d, c, t);
                                        }
                                    }
                                    break;

                                  case 5:
                                    Mj(r, r.return);
                                    break;

                                  case 22:
                                    if (null !== r.memoizedState) {
                                        hk(q);
                                        continue;
                                    }
                                }
                                null !== y ? (y.return = r, V = y) : hk(q);
                            }
                            m = m.sibling;
                        }
                        a: for (m = null, q = a; ;) {
                            if (5 === q.tag) {
                                if (null === m) {
                                    m = q;
                                    try {
                                        e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, 
                                        k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, 
                                        h.style.display = rb("display", g));
                                    } catch (t) {
                                        W(a, a.return, t);
                                    }
                                }
                            } else if (6 === q.tag) {
                                if (null === m) try {
                                    q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                                } catch (t) {
                                    W(a, a.return, t);
                                }
                            } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                                q.child.return = q;
                                q = q.child;
                                continue;
                            }
                            if (q === a) break a;
                            for (;null === q.sibling; ) {
                                if (null === q.return || q.return === a) break a;
                                m === q && (m = null);
                                q = q.return;
                            }
                            m === q && (m = null);
                            q.sibling.return = q.return;
                            q = q.sibling;
                        }
                    }
                    break;

                  case 19:
                    dk(b, a);
                    fk(a);
                    d & 4 && bk(a);
                    break;

                  case 21:
                    break;

                  default:
                    dk(b, a), fk(a);
                }
            }
            function fk(a) {
                var b = a.flags;
                if (b & 2) {
                    try {
                        a: {
                            for (var c = a.return; null !== c; ) {
                                if (Uj(c)) {
                                    var d = c;
                                    break a;
                                }
                                c = c.return;
                            }
                            throw Error(p(160));
                        }
                        switch (d.tag) {
                          case 5:
                            var e = d.stateNode;
                            d.flags & 32 && (ob(e, ""), d.flags &= -33);
                            var f = Vj(a);
                            Xj(a, f, e);
                            break;

                          case 3:
                          case 4:
                            var g = d.stateNode.containerInfo, h = Vj(a);
                            Wj(a, h, g);
                            break;

                          default:
                            throw Error(p(161));
                        }
                    } catch (k) {
                        W(a, a.return, k);
                    }
                    a.flags &= -3;
                }
                b & 4096 && (a.flags &= -4097);
            }
            function ik(a, b, c) {
                V = a;
                jk(a, b, c);
            }
            function jk(a, b, c) {
                for (var d = 0 !== (a.mode & 1); null !== V; ) {
                    var e = V, f = e.child;
                    if (22 === e.tag && d) {
                        var g = null !== e.memoizedState || Kj;
                        if (!g) {
                            var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
                            h = Kj;
                            var l = U;
                            Kj = g;
                            if ((U = k) && !l) for (V = e; null !== V; ) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? kk(e) : null !== k ? (k.return = g, 
                            V = k) : kk(e);
                            for (;null !== f; ) V = f, jk(f, b, c), f = f.sibling;
                            V = e;
                            Kj = h;
                            U = l;
                        }
                        lk(a, b, c);
                    } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : lk(a, b, c);
                }
            }
            function lk(a) {
                for (;null !== V; ) {
                    var b = V;
                    if (0 !== (b.flags & 8772)) {
                        var c = b.alternate;
                        try {
                            if (0 !== (b.flags & 8772)) switch (b.tag) {
                              case 0:
                              case 11:
                              case 15:
                                U || Rj(5, b);
                                break;

                              case 1:
                                var d = b.stateNode;
                                if (b.flags & 4 && !U) if (null === c) d.componentDidMount(); else {
                                    var e = b.elementType === b.type ? c.memoizedProps : Lg(b.type, c.memoizedProps);
                                    d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                                }
                                var f = b.updateQueue;
                                null !== f && ih(b, f, d);
                                break;

                              case 3:
                                var g = b.updateQueue;
                                if (null !== g) {
                                    c = null;
                                    if (null !== b.child) switch (b.child.tag) {
                                      case 5:
                                        c = b.child.stateNode;
                                        break;

                                      case 1:
                                        c = b.child.stateNode;
                                    }
                                    ih(b, g, c);
                                }
                                break;

                              case 5:
                                var h = b.stateNode;
                                if (null === c && b.flags & 4) {
                                    c = h;
                                    var k = b.memoizedProps;
                                    switch (b.type) {
                                      case "button":
                                      case "input":
                                      case "select":
                                      case "textarea":
                                        k.autoFocus && c.focus();
                                        break;

                                      case "img":
                                        k.src && (c.src = k.src);
                                    }
                                }
                                break;

                              case 6:
                                break;

                              case 4:
                                break;

                              case 12:
                                break;

                              case 13:
                                if (null === b.memoizedState) {
                                    var l = b.alternate;
                                    if (null !== l) {
                                        var m = l.memoizedState;
                                        if (null !== m) {
                                            var q = m.dehydrated;
                                            null !== q && bd(q);
                                        }
                                    }
                                }
                                break;

                              case 19:
                              case 17:
                              case 21:
                              case 22:
                              case 23:
                              case 25:
                                break;

                              default:
                                throw Error(p(163));
                            }
                            U || b.flags & 512 && Sj(b);
                        } catch (r) {
                            W(b, b.return, r);
                        }
                    }
                    if (b === a) {
                        V = null;
                        break;
                    }
                    c = b.sibling;
                    if (null !== c) {
                        c.return = b.return;
                        V = c;
                        break;
                    }
                    V = b.return;
                }
            }
            function hk(a) {
                for (;null !== V; ) {
                    var b = V;
                    if (b === a) {
                        V = null;
                        break;
                    }
                    var c = b.sibling;
                    if (null !== c) {
                        c.return = b.return;
                        V = c;
                        break;
                    }
                    V = b.return;
                }
            }
            function kk(a) {
                for (;null !== V; ) {
                    var b = V;
                    try {
                        switch (b.tag) {
                          case 0:
                          case 11:
                          case 15:
                            var c = b.return;
                            try {
                                Rj(4, b);
                            } catch (k) {
                                W(b, c, k);
                            }
                            break;

                          case 1:
                            var d = b.stateNode;
                            if ("function" === typeof d.componentDidMount) {
                                var e = b.return;
                                try {
                                    d.componentDidMount();
                                } catch (k) {
                                    W(b, e, k);
                                }
                            }
                            var f = b.return;
                            try {
                                Sj(b);
                            } catch (k) {
                                W(b, f, k);
                            }
                            break;

                          case 5:
                            var g = b.return;
                            try {
                                Sj(b);
                            } catch (k) {
                                W(b, g, k);
                            }
                        }
                    } catch (k) {
                        W(b, b.return, k);
                    }
                    if (b === a) {
                        V = null;
                        break;
                    }
                    var h = b.sibling;
                    if (null !== h) {
                        h.return = b.return;
                        V = h;
                        break;
                    }
                    V = b.return;
                }
            }
            var mk = Math.ceil, nk = ua.ReactCurrentDispatcher, ok = ua.ReactCurrentOwner, pk = ua.ReactCurrentBatchConfig, K = 0, R = null, Y = null, Z = 0, gj = 0, fj = Uf(0), T = 0, qk = null, hh = 0, rk = 0, sk = 0, tk = null, uk = null, gk = 0, Hj = 1 / 0, vk = null, Pi = !1, Qi = null, Si = null, wk = !1, xk = null, yk = 0, zk = 0, Ak = null, Bk = -1, Ck = 0;
            function L() {
                return 0 !== (K & 6) ? B() : -1 !== Bk ? Bk : Bk = B();
            }
            function lh(a) {
                if (0 === (a.mode & 1)) return 1;
                if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
                if (null !== Kg.transition) return 0 === Ck && (Ck = yc()), Ck;
                a = C;
                if (0 !== a) return a;
                a = window.event;
                a = void 0 === a ? 16 : jd(a.type);
                return a;
            }
            function mh(a, b, c, d) {
                if (50 < zk) throw zk = 0, Ak = null, Error(p(185));
                Ac(a, c, d);
                if (0 === (K & 2) || a !== R) a === R && (0 === (K & 2) && (rk |= c), 4 === T && Dk(a, Z)), 
                Ek(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Hj = B() + 500, fg && jg());
            }
            function Ek(a, b) {
                var c = a.callbackNode;
                wc(a, b);
                var d = uc(a, a === R ? Z : 0);
                if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0; else if (b = d & -d, 
                a.callbackPriority !== b) {
                    null != c && bc(c);
                    if (1 === b) 0 === a.tag ? ig(Fk.bind(null, a)) : hg(Fk.bind(null, a)), Jf((function() {
                        0 === (K & 6) && jg();
                    })), c = null; else {
                        switch (Dc(d)) {
                          case 1:
                            c = fc;
                            break;

                          case 4:
                            c = gc;
                            break;

                          case 16:
                            c = hc;
                            break;

                          case 536870912:
                            c = jc;
                            break;

                          default:
                            c = hc;
                        }
                        c = Gk(c, Hk.bind(null, a));
                    }
                    a.callbackPriority = b;
                    a.callbackNode = c;
                }
            }
            function Hk(a, b) {
                Bk = -1;
                Ck = 0;
                if (0 !== (K & 6)) throw Error(p(327));
                var c = a.callbackNode;
                if (Ik() && a.callbackNode !== c) return null;
                var d = uc(a, a === R ? Z : 0);
                if (0 === d) return null;
                if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Jk(a, d); else {
                    b = d;
                    var e = K;
                    K |= 2;
                    var f = Kk();
                    if (R !== a || Z !== b) vk = null, Hj = B() + 500, Lk(a, b);
                    do {
                        try {
                            Mk();
                            break;
                        } catch (h) {
                            Nk(a, h);
                        }
                    } while (1);
                    Qg();
                    nk.current = f;
                    K = e;
                    null !== Y ? b = 0 : (R = null, Z = 0, b = T);
                }
                if (0 !== b) {
                    2 === b && (e = xc(a), 0 !== e && (d = e, b = Ok(a, e)));
                    if (1 === b) throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B()), c;
                    if (6 === b) Dk(a, d); else {
                        e = a.current.alternate;
                        if (0 === (d & 30) && !Pk(e) && (b = Jk(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, 
                        b = Ok(a, f))), 1 === b)) throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B()), c;
                        a.finishedWork = e;
                        a.finishedLanes = d;
                        switch (b) {
                          case 0:
                          case 1:
                            throw Error(p(345));

                          case 2:
                            Qk(a, uk, vk);
                            break;

                          case 3:
                            Dk(a, d);
                            if ((d & 130023424) === d && (b = gk + 500 - B(), 10 < b)) {
                                if (0 !== uc(a, 0)) break;
                                e = a.suspendedLanes;
                                if ((e & d) !== d) {
                                    L();
                                    a.pingedLanes |= a.suspendedLanes & e;
                                    break;
                                }
                                a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), b);
                                break;
                            }
                            Qk(a, uk, vk);
                            break;

                          case 4:
                            Dk(a, d);
                            if ((d & 4194240) === d) break;
                            b = a.eventTimes;
                            for (e = -1; 0 < d; ) {
                                var g = 31 - oc(d);
                                f = 1 << g;
                                g = b[g];
                                g > e && (e = g);
                                d &= ~f;
                            }
                            d = e;
                            d = B() - d;
                            d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * mk(d / 1960)) - d;
                            if (10 < d) {
                                a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), d);
                                break;
                            }
                            Qk(a, uk, vk);
                            break;

                          case 5:
                            Qk(a, uk, vk);
                            break;

                          default:
                            throw Error(p(329));
                        }
                    }
                }
                Ek(a, B());
                return a.callbackNode === c ? Hk.bind(null, a) : null;
            }
            function Ok(a, b) {
                var c = tk;
                a.current.memoizedState.isDehydrated && (Lk(a, b).flags |= 256);
                a = Jk(a, b);
                2 !== a && (b = uk, uk = c, null !== b && Gj(b));
                return a;
            }
            function Gj(a) {
                null === uk ? uk = a : uk.push.apply(uk, a);
            }
            function Pk(a) {
                for (var b = a; ;) {
                    if (b.flags & 16384) {
                        var c = b.updateQueue;
                        if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
                            var e = c[d], f = e.getSnapshot;
                            e = e.value;
                            try {
                                if (!He(f(), e)) return !1;
                            } catch (g) {
                                return !1;
                            }
                        }
                    }
                    c = b.child;
                    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c; else {
                        if (b === a) break;
                        for (;null === b.sibling; ) {
                            if (null === b.return || b.return === a) return !0;
                            b = b.return;
                        }
                        b.sibling.return = b.return;
                        b = b.sibling;
                    }
                }
                return !0;
            }
            function Dk(a, b) {
                b &= ~sk;
                b &= ~rk;
                a.suspendedLanes |= b;
                a.pingedLanes &= ~b;
                for (a = a.expirationTimes; 0 < b; ) {
                    var c = 31 - oc(b), d = 1 << c;
                    a[c] = -1;
                    b &= ~d;
                }
            }
            function Fk(a) {
                if (0 !== (K & 6)) throw Error(p(327));
                Ik();
                var b = uc(a, 0);
                if (0 === (b & 1)) return Ek(a, B()), null;
                var c = Jk(a, b);
                if (0 !== a.tag && 2 === c) {
                    var d = xc(a);
                    0 !== d && (b = d, c = Ok(a, d));
                }
                if (1 === c) throw c = qk, Lk(a, 0), Dk(a, b), Ek(a, B()), c;
                if (6 === c) throw Error(p(345));
                a.finishedWork = a.current.alternate;
                a.finishedLanes = b;
                Qk(a, uk, vk);
                Ek(a, B());
                return null;
            }
            function Rk(a, b) {
                var c = K;
                K |= 1;
                try {
                    return a(b);
                } finally {
                    K = c, 0 === K && (Hj = B() + 500, fg && jg());
                }
            }
            function Sk(a) {
                null !== xk && 0 === xk.tag && 0 === (K & 6) && Ik();
                var b = K;
                K |= 1;
                var c = pk.transition, d = C;
                try {
                    if (pk.transition = null, C = 1, a) return a();
                } finally {
                    C = d, pk.transition = c, K = b, 0 === (K & 6) && jg();
                }
            }
            function Ij() {
                gj = fj.current;
                E(fj);
            }
            function Lk(a, b) {
                a.finishedWork = null;
                a.finishedLanes = 0;
                var c = a.timeoutHandle;
                -1 !== c && (a.timeoutHandle = -1, Gf(c));
                if (null !== Y) for (c = Y.return; null !== c; ) {
                    var d = c;
                    wg(d);
                    switch (d.tag) {
                      case 1:
                        d = d.type.childContextTypes;
                        null !== d && void 0 !== d && $f();
                        break;

                      case 3:
                        Jh();
                        E(Wf);
                        E(H);
                        Oh();
                        break;

                      case 5:
                        Lh(d);
                        break;

                      case 4:
                        Jh();
                        break;

                      case 13:
                        E(M);
                        break;

                      case 19:
                        E(M);
                        break;

                      case 10:
                        Rg(d.type._context);
                        break;

                      case 22:
                      case 23:
                        Ij();
                    }
                    c = c.return;
                }
                R = a;
                Y = a = wh(a.current, null);
                Z = gj = b;
                T = 0;
                qk = null;
                sk = rk = hh = 0;
                uk = tk = null;
                if (null !== Wg) {
                    for (b = 0; b < Wg.length; b++) if (c = Wg[b], d = c.interleaved, null !== d) {
                        c.interleaved = null;
                        var e = d.next, f = c.pending;
                        if (null !== f) {
                            var g = f.next;
                            f.next = e;
                            d.next = g;
                        }
                        c.pending = d;
                    }
                    Wg = null;
                }
                return a;
            }
            function Nk(a, b) {
                do {
                    var c = Y;
                    try {
                        Qg();
                        Ph.current = ai;
                        if (Sh) {
                            for (var d = N.memoizedState; null !== d; ) {
                                var e = d.queue;
                                null !== e && (e.pending = null);
                                d = d.next;
                            }
                            Sh = !1;
                        }
                        Rh = 0;
                        P = O = N = null;
                        Th = !1;
                        Uh = 0;
                        ok.current = null;
                        if (null === c || null === c.return) {
                            T = 1;
                            qk = b;
                            Y = null;
                            break;
                        }
                        a: {
                            var f = a, g = c.return, h = c, k = b;
                            b = Z;
                            h.flags |= 32768;
                            if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                                var l = k, m = h, q = m.tag;
                                if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                                    var r = m.alternate;
                                    r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, 
                                    m.memoizedState = null);
                                }
                                var y = Vi(g);
                                if (null !== y) {
                                    y.flags &= -257;
                                    Wi(y, g, h, f, b);
                                    y.mode & 1 && Ti(f, l, b);
                                    b = y;
                                    k = l;
                                    var n = b.updateQueue;
                                    if (null === n) {
                                        var t = new Set;
                                        t.add(k);
                                        b.updateQueue = t;
                                    } else n.add(k);
                                    break a;
                                } else {
                                    if (0 === (b & 1)) {
                                        Ti(f, l, b);
                                        uj();
                                        break a;
                                    }
                                    k = Error(p(426));
                                }
                            } else if (I && h.mode & 1) {
                                var J = Vi(g);
                                if (null !== J) {
                                    0 === (J.flags & 65536) && (J.flags |= 256);
                                    Wi(J, g, h, f, b);
                                    Jg(Ki(k, h));
                                    break a;
                                }
                            }
                            f = k = Ki(k, h);
                            4 !== T && (T = 2);
                            null === tk ? tk = [ f ] : tk.push(f);
                            f = g;
                            do {
                                switch (f.tag) {
                                  case 3:
                                    f.flags |= 65536;
                                    b &= -b;
                                    f.lanes |= b;
                                    var x = Oi(f, k, b);
                                    fh(f, x);
                                    break a;

                                  case 1:
                                    h = k;
                                    var w = f.type, u = f.stateNode;
                                    if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Si || !Si.has(u)))) {
                                        f.flags |= 65536;
                                        b &= -b;
                                        f.lanes |= b;
                                        var F = Ri(f, h, b);
                                        fh(f, F);
                                        break a;
                                    }
                                }
                                f = f.return;
                            } while (null !== f);
                        }
                        Tk(c);
                    } catch (na) {
                        b = na;
                        Y === c && null !== c && (Y = c = c.return);
                        continue;
                    }
                    break;
                } while (1);
            }
            function Kk() {
                var a = nk.current;
                nk.current = ai;
                return null === a ? ai : a;
            }
            function uj() {
                if (0 === T || 3 === T || 2 === T) T = 4;
                null === R || 0 === (hh & 268435455) && 0 === (rk & 268435455) || Dk(R, Z);
            }
            function Jk(a, b) {
                var c = K;
                K |= 2;
                var d = Kk();
                if (R !== a || Z !== b) vk = null, Lk(a, b);
                do {
                    try {
                        Uk();
                        break;
                    } catch (e) {
                        Nk(a, e);
                    }
                } while (1);
                Qg();
                K = c;
                nk.current = d;
                if (null !== Y) throw Error(p(261));
                R = null;
                Z = 0;
                return T;
            }
            function Uk() {
                for (;null !== Y; ) Vk(Y);
            }
            function Mk() {
                for (;null !== Y && !cc(); ) Vk(Y);
            }
            function Vk(a) {
                var b = Wk(a.alternate, a, gj);
                a.memoizedProps = a.pendingProps;
                null === b ? Tk(a) : Y = b;
                ok.current = null;
            }
            function Tk(a) {
                var b = a;
                do {
                    var c = b.alternate;
                    a = b.return;
                    if (0 === (b.flags & 32768)) {
                        if (c = Fj(c, b, gj), null !== c) {
                            Y = c;
                            return;
                        }
                    } else {
                        c = Jj(c, b);
                        if (null !== c) {
                            c.flags &= 32767;
                            Y = c;
                            return;
                        }
                        if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null; else {
                            T = 6;
                            Y = null;
                            return;
                        }
                    }
                    b = b.sibling;
                    if (null !== b) {
                        Y = b;
                        return;
                    }
                    Y = b = a;
                } while (null !== b);
                0 === T && (T = 5);
            }
            function Qk(a, b, c) {
                var d = C, e = pk.transition;
                try {
                    pk.transition = null, C = 1, Xk(a, b, c, d);
                } finally {
                    pk.transition = e, C = d;
                }
                return null;
            }
            function Xk(a, b, c, d) {
                do {
                    Ik();
                } while (null !== xk);
                if (0 !== (K & 6)) throw Error(p(327));
                c = a.finishedWork;
                var e = a.finishedLanes;
                if (null === c) return null;
                a.finishedWork = null;
                a.finishedLanes = 0;
                if (c === a.current) throw Error(p(177));
                a.callbackNode = null;
                a.callbackPriority = 0;
                var f = c.lanes | c.childLanes;
                Bc(a, f);
                a === R && (Y = R = null, Z = 0);
                0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || wk || (wk = !0, Gk(hc, (function() {
                    Ik();
                    return null;
                })));
                f = 0 !== (c.flags & 15990);
                if (0 !== (c.subtreeFlags & 15990) || f) {
                    f = pk.transition;
                    pk.transition = null;
                    var g = C;
                    C = 1;
                    var h = K;
                    K |= 4;
                    ok.current = null;
                    Pj(a, c);
                    ek(c, a);
                    Oe(Df);
                    dd = !!Cf;
                    Df = Cf = null;
                    a.current = c;
                    ik(c, a, e);
                    dc();
                    K = h;
                    C = g;
                    pk.transition = f;
                } else a.current = c;
                wk && (wk = !1, xk = a, yk = e);
                f = a.pendingLanes;
                0 === f && (Si = null);
                mc(c.stateNode, d);
                Ek(a, B());
                if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], 
                d(e.value, {
                    componentStack: e.stack,
                    digest: e.digest
                });
                if (Pi) throw Pi = !1, a = Qi, Qi = null, a;
                0 !== (yk & 1) && 0 !== a.tag && Ik();
                f = a.pendingLanes;
                0 !== (f & 1) ? a === Ak ? zk++ : (zk = 0, Ak = a) : zk = 0;
                jg();
                return null;
            }
            function Ik() {
                if (null !== xk) {
                    var a = Dc(yk), b = pk.transition, c = C;
                    try {
                        pk.transition = null;
                        C = 16 > a ? 16 : a;
                        if (null === xk) var d = !1; else {
                            a = xk;
                            xk = null;
                            yk = 0;
                            if (0 !== (K & 6)) throw Error(p(331));
                            var e = K;
                            K |= 4;
                            for (V = a.current; null !== V; ) {
                                var f = V, g = f.child;
                                if (0 !== (V.flags & 16)) {
                                    var h = f.deletions;
                                    if (null !== h) {
                                        for (var k = 0; k < h.length; k++) {
                                            var l = h[k];
                                            for (V = l; null !== V; ) {
                                                var m = V;
                                                switch (m.tag) {
                                                  case 0:
                                                  case 11:
                                                  case 15:
                                                    Qj(8, m, f);
                                                }
                                                var q = m.child;
                                                if (null !== q) q.return = m, V = q; else for (;null !== V; ) {
                                                    m = V;
                                                    var r = m.sibling, y = m.return;
                                                    Tj(m);
                                                    if (m === l) {
                                                        V = null;
                                                        break;
                                                    }
                                                    if (null !== r) {
                                                        r.return = y;
                                                        V = r;
                                                        break;
                                                    }
                                                    V = y;
                                                }
                                            }
                                        }
                                        var n = f.alternate;
                                        if (null !== n) {
                                            var t = n.child;
                                            if (null !== t) {
                                                n.child = null;
                                                do {
                                                    var J = t.sibling;
                                                    t.sibling = null;
                                                    t = J;
                                                } while (null !== t);
                                            }
                                        }
                                        V = f;
                                    }
                                }
                                if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g; else b: for (;null !== V; ) {
                                    f = V;
                                    if (0 !== (f.flags & 2048)) switch (f.tag) {
                                      case 0:
                                      case 11:
                                      case 15:
                                        Qj(9, f, f.return);
                                    }
                                    var x = f.sibling;
                                    if (null !== x) {
                                        x.return = f.return;
                                        V = x;
                                        break b;
                                    }
                                    V = f.return;
                                }
                            }
                            var w = a.current;
                            for (V = w; null !== V; ) {
                                g = V;
                                var u = g.child;
                                if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u; else b: for (g = w; null !== V; ) {
                                    h = V;
                                    if (0 !== (h.flags & 2048)) try {
                                        switch (h.tag) {
                                          case 0:
                                          case 11:
                                          case 15:
                                            Rj(9, h);
                                        }
                                    } catch (na) {
                                        W(h, h.return, na);
                                    }
                                    if (h === g) {
                                        V = null;
                                        break b;
                                    }
                                    var F = h.sibling;
                                    if (null !== F) {
                                        F.return = h.return;
                                        V = F;
                                        break b;
                                    }
                                    V = h.return;
                                }
                            }
                            K = e;
                            jg();
                            if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
                                lc.onPostCommitFiberRoot(kc, a);
                            } catch (na) {}
                            d = !0;
                        }
                        return d;
                    } finally {
                        C = c, pk.transition = b;
                    }
                }
                return !1;
            }
            function Yk(a, b, c) {
                b = Ki(c, b);
                b = Oi(a, b, 1);
                a = dh(a, b, 1);
                b = L();
                null !== a && (Ac(a, 1, b), Ek(a, b));
            }
            function W(a, b, c) {
                if (3 === a.tag) Yk(a, a, c); else for (;null !== b; ) {
                    if (3 === b.tag) {
                        Yk(b, a, c);
                        break;
                    } else if (1 === b.tag) {
                        var d = b.stateNode;
                        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Si || !Si.has(d))) {
                            a = Ki(c, a);
                            a = Ri(b, a, 1);
                            b = dh(b, a, 1);
                            a = L();
                            null !== b && (Ac(b, 1, a), Ek(b, a));
                            break;
                        }
                    }
                    b = b.return;
                }
            }
            function Ui(a, b, c) {
                var d = a.pingCache;
                null !== d && d.delete(b);
                b = L();
                a.pingedLanes |= a.suspendedLanes & c;
                R === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - gk ? Lk(a, 0) : sk |= c);
                Ek(a, b);
            }
            function Zk(a, b) {
                0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
                var c = L();
                a = Zg(a, b);
                null !== a && (Ac(a, b, c), Ek(a, c));
            }
            function vj(a) {
                var b = a.memoizedState, c = 0;
                null !== b && (c = b.retryLane);
                Zk(a, c);
            }
            function ck(a, b) {
                var c = 0;
                switch (a.tag) {
                  case 13:
                    var d = a.stateNode;
                    var e = a.memoizedState;
                    null !== e && (c = e.retryLane);
                    break;

                  case 19:
                    d = a.stateNode;
                    break;

                  default:
                    throw Error(p(314));
                }
                null !== d && d.delete(b);
                Zk(a, c);
            }
            var Wk;
            Wk = function(a, b, c) {
                if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) Ug = !0; else {
                    if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return Ug = !1, zj(a, b, c);
                    Ug = 0 !== (a.flags & 131072) ? !0 : !1;
                } else Ug = !1, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
                b.lanes = 0;
                switch (b.tag) {
                  case 2:
                    var d = b.type;
                    jj(a, b);
                    a = b.pendingProps;
                    var e = Yf(b, H.current);
                    Tg(b, c);
                    e = Xh(null, b, d, a, e, c);
                    var f = bi();
                    b.flags |= 1;
                    "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, 
                    b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = !0, cg(b)) : f = !1, 
                    b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, ah(b), 
                    e.updater = nh, b.stateNode = e, e._reactInternals = b, rh(b, d, a, c), b = kj(null, b, d, !0, f, c)) : (b.tag = 0, 
                    I && f && vg(b), Yi(null, b, e, c), b = b.child);
                    return b;

                  case 16:
                    d = b.elementType;
                    a: {
                        jj(a, b);
                        a = b.pendingProps;
                        e = d._init;
                        d = e(d._payload);
                        b.type = d;
                        e = b.tag = $k(d);
                        a = Lg(d, a);
                        switch (e) {
                          case 0:
                            b = dj(null, b, d, a, c);
                            break a;

                          case 1:
                            b = ij(null, b, d, a, c);
                            break a;

                          case 11:
                            b = Zi(null, b, d, a, c);
                            break a;

                          case 14:
                            b = aj(null, b, d, Lg(d.type, a), c);
                            break a;
                        }
                        throw Error(p(306, d, ""));
                    }
                    return b;

                  case 0:
                    return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), dj(a, b, d, e, c);

                  case 1:
                    return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), ij(a, b, d, e, c);

                  case 3:
                    a: {
                        lj(b);
                        if (null === a) throw Error(p(387));
                        d = b.pendingProps;
                        f = b.memoizedState;
                        e = f.element;
                        bh(a, b);
                        gh(b, d, null, c);
                        var g = b.memoizedState;
                        d = g.element;
                        if (f.isDehydrated) if (f = {
                            element: d,
                            isDehydrated: !1,
                            cache: g.cache,
                            pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
                            transitions: g.transitions
                        }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
                            e = Ki(Error(p(423)), b);
                            b = mj(a, b, d, c, e);
                            break a;
                        } else if (d !== e) {
                            e = Ki(Error(p(424)), b);
                            b = mj(a, b, d, c, e);
                            break a;
                        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = !0, zg = null, 
                        c = Ch(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling; else {
                            Ig();
                            if (d === e) {
                                b = $i(a, b, c);
                                break a;
                            }
                            Yi(a, b, d, c);
                        }
                        b = b.child;
                    }
                    return b;

                  case 5:
                    return Kh(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, 
                    g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), 
                    hj(a, b), Yi(a, b, g, c), b.child;

                  case 6:
                    return null === a && Eg(b), null;

                  case 13:
                    return pj(a, b, c);

                  case 4:
                    return Ih(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Bh(b, null, d, c) : Yi(a, b, d, c), 
                    b.child;

                  case 11:
                    return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), Zi(a, b, d, e, c);

                  case 7:
                    return Yi(a, b, b.pendingProps, c), b.child;

                  case 8:
                    return Yi(a, b, b.pendingProps.children, c), b.child;

                  case 12:
                    return Yi(a, b, b.pendingProps.children, c), b.child;

                  case 10:
                    a: {
                        d = b.type._context;
                        e = b.pendingProps;
                        f = b.memoizedProps;
                        g = e.value;
                        G(Mg, d._currentValue);
                        d._currentValue = g;
                        if (null !== f) if (He(f.value, g)) {
                            if (f.children === e.children && !Wf.current) {
                                b = $i(a, b, c);
                                break a;
                            }
                        } else for (f = b.child, null !== f && (f.return = b); null !== f; ) {
                            var h = f.dependencies;
                            if (null !== h) {
                                g = f.child;
                                for (var k = h.firstContext; null !== k; ) {
                                    if (k.context === d) {
                                        if (1 === f.tag) {
                                            k = ch(-1, c & -c);
                                            k.tag = 2;
                                            var l = f.updateQueue;
                                            if (null !== l) {
                                                l = l.shared;
                                                var m = l.pending;
                                                null === m ? k.next = k : (k.next = m.next, m.next = k);
                                                l.pending = k;
                                            }
                                        }
                                        f.lanes |= c;
                                        k = f.alternate;
                                        null !== k && (k.lanes |= c);
                                        Sg(f.return, c, b);
                                        h.lanes |= c;
                                        break;
                                    }
                                    k = k.next;
                                }
                            } else if (10 === f.tag) g = f.type === b.type ? null : f.child; else if (18 === f.tag) {
                                g = f.return;
                                if (null === g) throw Error(p(341));
                                g.lanes |= c;
                                h = g.alternate;
                                null !== h && (h.lanes |= c);
                                Sg(g, c, b);
                                g = f.sibling;
                            } else g = f.child;
                            if (null !== g) g.return = f; else for (g = f; null !== g; ) {
                                if (g === b) {
                                    g = null;
                                    break;
                                }
                                f = g.sibling;
                                if (null !== f) {
                                    f.return = g.return;
                                    g = f;
                                    break;
                                }
                                g = g.return;
                            }
                            f = g;
                        }
                        Yi(a, b, e.children, c);
                        b = b.child;
                    }
                    return b;

                  case 9:
                    return e = b.type, d = b.pendingProps.children, Tg(b, c), e = Vg(e), d = d(e), b.flags |= 1, 
                    Yi(a, b, d, c), b.child;

                  case 14:
                    return d = b.type, e = Lg(d, b.pendingProps), e = Lg(d.type, e), aj(a, b, d, e, c);

                  case 15:
                    return cj(a, b, b.type, b.pendingProps, c);

                  case 17:
                    return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), jj(a, b), 
                    b.tag = 1, Zf(d) ? (a = !0, cg(b)) : a = !1, Tg(b, c), ph(b, d, e), rh(b, d, e, c), 
                    kj(null, b, d, !0, a, c);

                  case 19:
                    return yj(a, b, c);

                  case 22:
                    return ej(a, b, c);
                }
                throw Error(p(156, b.tag));
            };
            function Gk(a, b) {
                return ac(a, b);
            }
            function al(a, b, c, d) {
                this.tag = a;
                this.key = c;
                this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
                this.index = 0;
                this.ref = null;
                this.pendingProps = b;
                this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
                this.mode = d;
                this.subtreeFlags = this.flags = 0;
                this.deletions = null;
                this.childLanes = this.lanes = 0;
                this.alternate = null;
            }
            function Bg(a, b, c, d) {
                return new al(a, b, c, d);
            }
            function bj(a) {
                a = a.prototype;
                return !(!a || !a.isReactComponent);
            }
            function $k(a) {
                if ("function" === typeof a) return bj(a) ? 1 : 0;
                if (void 0 !== a && null !== a) {
                    a = a.$$typeof;
                    if (a === Da) return 11;
                    if (a === Ga) return 14;
                }
                return 2;
            }
            function wh(a, b) {
                var c = a.alternate;
                null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, 
                c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, 
                c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
                c.flags = a.flags & 14680064;
                c.childLanes = a.childLanes;
                c.lanes = a.lanes;
                c.child = a.child;
                c.memoizedProps = a.memoizedProps;
                c.memoizedState = a.memoizedState;
                c.updateQueue = a.updateQueue;
                b = a.dependencies;
                c.dependencies = null === b ? null : {
                    lanes: b.lanes,
                    firstContext: b.firstContext
                };
                c.sibling = a.sibling;
                c.index = a.index;
                c.ref = a.ref;
                return c;
            }
            function yh(a, b, c, d, e, f) {
                var g = 2;
                d = a;
                if ("function" === typeof a) bj(a) && (g = 1); else if ("string" === typeof a) g = 5; else a: switch (a) {
                  case ya:
                    return Ah(c.children, e, f, b);

                  case za:
                    g = 8;
                    e |= 8;
                    break;

                  case Aa:
                    return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;

                  case Ea:
                    return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;

                  case Fa:
                    return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;

                  case Ia:
                    return qj(c, e, f, b);

                  default:
                    if ("object" === typeof a && null !== a) switch (a.$$typeof) {
                      case Ba:
                        g = 10;
                        break a;

                      case Ca:
                        g = 9;
                        break a;

                      case Da:
                        g = 11;
                        break a;

                      case Ga:
                        g = 14;
                        break a;

                      case Ha:
                        g = 16;
                        d = null;
                        break a;
                    }
                    throw Error(p(130, null == a ? a : typeof a, ""));
                }
                b = Bg(g, c, b, e);
                b.elementType = a;
                b.type = d;
                b.lanes = f;
                return b;
            }
            function Ah(a, b, c, d) {
                a = Bg(7, a, d, b);
                a.lanes = c;
                return a;
            }
            function qj(a, b, c, d) {
                a = Bg(22, a, d, b);
                a.elementType = Ia;
                a.lanes = c;
                a.stateNode = {
                    isHidden: !1
                };
                return a;
            }
            function xh(a, b, c) {
                a = Bg(6, a, null, b);
                a.lanes = c;
                return a;
            }
            function zh(a, b, c) {
                b = Bg(4, null !== a.children ? a.children : [], a.key, b);
                b.lanes = c;
                b.stateNode = {
                    containerInfo: a.containerInfo,
                    pendingChildren: null,
                    implementation: a.implementation
                };
                return b;
            }
            function bl(a, b, c, d, e) {
                this.tag = b;
                this.containerInfo = a;
                this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
                this.timeoutHandle = -1;
                this.callbackNode = this.pendingContext = this.context = null;
                this.callbackPriority = 0;
                this.eventTimes = zc(0);
                this.expirationTimes = zc(-1);
                this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
                this.entanglements = zc(0);
                this.identifierPrefix = d;
                this.onRecoverableError = e;
                this.mutableSourceEagerHydrationData = null;
            }
            function cl(a, b, c, d, e, f, g, h, k) {
                a = new bl(a, b, c, h, k);
                1 === b ? (b = 1, !0 === f && (b |= 8)) : b = 0;
                f = Bg(3, null, null, b);
                a.current = f;
                f.stateNode = a;
                f.memoizedState = {
                    element: d,
                    isDehydrated: c,
                    cache: null,
                    transitions: null,
                    pendingSuspenseBoundaries: null
                };
                ah(f);
                return a;
            }
            function dl(a, b, c) {
                var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
                return {
                    $$typeof: wa,
                    key: null == d ? null : "" + d,
                    children: a,
                    containerInfo: b,
                    implementation: c
                };
            }
            function el(a) {
                if (!a) return Vf;
                a = a._reactInternals;
                a: {
                    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
                    var b = a;
                    do {
                        switch (b.tag) {
                          case 3:
                            b = b.stateNode.context;
                            break a;

                          case 1:
                            if (Zf(b.type)) {
                                b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                                break a;
                            }
                        }
                        b = b.return;
                    } while (null !== b);
                    throw Error(p(171));
                }
                if (1 === a.tag) {
                    var c = a.type;
                    if (Zf(c)) return bg(a, c, b);
                }
                return b;
            }
            function fl(a, b, c, d, e, f, g, h, k) {
                a = cl(c, d, !0, a, e, f, g, h, k);
                a.context = el(null);
                c = a.current;
                d = L();
                e = lh(c);
                f = ch(d, e);
                f.callback = void 0 !== b && null !== b ? b : null;
                dh(c, f, e);
                a.current.lanes = e;
                Ac(a, e, d);
                Ek(a, d);
                return a;
            }
            function gl(a, b, c, d) {
                var e = b.current, f = L(), g = lh(e);
                c = el(c);
                null === b.context ? b.context = c : b.pendingContext = c;
                b = ch(f, g);
                b.payload = {
                    element: a
                };
                d = void 0 === d ? null : d;
                null !== d && (b.callback = d);
                a = dh(e, b, g);
                null !== a && (mh(a, e, g, f), eh(a, e, g));
                return g;
            }
            function hl(a) {
                a = a.current;
                if (!a.child) return null;
                switch (a.child.tag) {
                  case 5:
                    return a.child.stateNode;

                  default:
                    return a.child.stateNode;
                }
            }
            function il(a, b) {
                a = a.memoizedState;
                if (null !== a && null !== a.dehydrated) {
                    var c = a.retryLane;
                    a.retryLane = 0 !== c && c < b ? c : b;
                }
            }
            function jl(a, b) {
                il(a, b);
                (a = a.alternate) && il(a, b);
            }
            function kl() {
                return null;
            }
            var ll = "function" === typeof reportError ? reportError : function(a) {
                console.error(a);
            };
            function ml(a) {
                this._internalRoot = a;
            }
            nl.prototype.render = ml.prototype.render = function(a) {
                var b = this._internalRoot;
                if (null === b) throw Error(p(409));
                gl(a, b, null, null);
            };
            nl.prototype.unmount = ml.prototype.unmount = function() {
                var a = this._internalRoot;
                if (null !== a) {
                    this._internalRoot = null;
                    var b = a.containerInfo;
                    Sk((function() {
                        gl(null, a, null, null);
                    }));
                    b[uf] = null;
                }
            };
            function nl(a) {
                this._internalRoot = a;
            }
            nl.prototype.unstable_scheduleHydration = function(a) {
                if (a) {
                    var b = Hc();
                    a = {
                        blockedOn: null,
                        target: a,
                        priority: b
                    };
                    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
                    Qc.splice(c, 0, a);
                    0 === c && Vc(a);
                }
            };
            function ol(a) {
                return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
            }
            function pl(a) {
                return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
            }
            function ql() {}
            function rl(a, b, c, d, e) {
                if (e) {
                    if ("function" === typeof d) {
                        var f = d;
                        d = function() {
                            var a = hl(g);
                            f.call(a);
                        };
                    }
                    var g = fl(b, d, a, 0, null, !1, !1, "", ql);
                    a._reactRootContainer = g;
                    a[uf] = g.current;
                    sf(8 === a.nodeType ? a.parentNode : a);
                    Sk();
                    return g;
                }
                for (;e = a.lastChild; ) a.removeChild(e);
                if ("function" === typeof d) {
                    var h = d;
                    d = function() {
                        var a = hl(k);
                        h.call(a);
                    };
                }
                var k = cl(a, 0, !1, null, null, !1, !1, "", ql);
                a._reactRootContainer = k;
                a[uf] = k.current;
                sf(8 === a.nodeType ? a.parentNode : a);
                Sk((function() {
                    gl(b, k, c, d);
                }));
                return k;
            }
            function sl(a, b, c, d, e) {
                var f = c._reactRootContainer;
                if (f) {
                    var g = f;
                    if ("function" === typeof e) {
                        var h = e;
                        e = function() {
                            var a = hl(g);
                            h.call(a);
                        };
                    }
                    gl(b, g, a, e);
                } else g = rl(c, b, a, e, d);
                return hl(g);
            }
            Ec = function(a) {
                switch (a.tag) {
                  case 3:
                    var b = a.stateNode;
                    if (b.current.memoizedState.isDehydrated) {
                        var c = tc(b.pendingLanes);
                        0 !== c && (Cc(b, c | 1), Ek(b, B()), 0 === (K & 6) && (Hj = B() + 500, jg()));
                    }
                    break;

                  case 13:
                    Sk((function() {
                        var b = Zg(a, 1);
                        if (null !== b) {
                            var c = L();
                            mh(b, a, 1, c);
                        }
                    })), jl(a, 1);
                }
            };
            Fc = function(a) {
                if (13 === a.tag) {
                    var b = Zg(a, 134217728);
                    if (null !== b) {
                        var c = L();
                        mh(b, a, 134217728, c);
                    }
                    jl(a, 134217728);
                }
            };
            Gc = function(a) {
                if (13 === a.tag) {
                    var b = lh(a), c = Zg(a, b);
                    if (null !== c) {
                        var d = L();
                        mh(c, a, b, d);
                    }
                    jl(a, b);
                }
            };
            Hc = function() {
                return C;
            };
            Ic = function(a, b) {
                var c = C;
                try {
                    return C = a, b();
                } finally {
                    C = c;
                }
            };
            yb = function(a, b, c) {
                switch (b) {
                  case "input":
                    bb(a, c);
                    b = c.name;
                    if ("radio" === c.type && null != b) {
                        for (c = a; c.parentNode; ) c = c.parentNode;
                        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
                        for (b = 0; b < c.length; b++) {
                            var d = c[b];
                            if (d !== a && d.form === a.form) {
                                var e = Db(d);
                                if (!e) throw Error(p(90));
                                Wa(d);
                                bb(d, e);
                            }
                        }
                    }
                    break;

                  case "textarea":
                    ib(a, c);
                    break;

                  case "select":
                    b = c.value, null != b && fb(a, !!c.multiple, b, !1);
                }
            };
            Gb = Rk;
            Hb = Sk;
            var tl = {
                usingClientEntryPoint: !1,
                Events: [ Cb, ue, Db, Eb, Fb, Rk ]
            }, ul = {
                findFiberByHostInstance: Wc,
                bundleType: 0,
                version: "18.2.0",
                rendererPackageName: "react-dom"
            };
            var vl = {
                bundleType: ul.bundleType,
                version: ul.version,
                rendererPackageName: ul.rendererPackageName,
                rendererConfig: ul.rendererConfig,
                overrideHookState: null,
                overrideHookStateDeletePath: null,
                overrideHookStateRenamePath: null,
                overrideProps: null,
                overridePropsDeletePath: null,
                overridePropsRenamePath: null,
                setErrorHandler: null,
                setSuspenseHandler: null,
                scheduleUpdate: null,
                currentDispatcherRef: ua.ReactCurrentDispatcher,
                findHostInstanceByFiber: function(a) {
                    a = Zb(a);
                    return null === a ? null : a.stateNode;
                },
                findFiberByHostInstance: ul.findFiberByHostInstance || kl,
                findHostInstancesForRefresh: null,
                scheduleRefresh: null,
                scheduleRoot: null,
                setRefreshHandler: null,
                getCurrentFiber: null,
                reconcilerVersion: "18.2.0-next-9e3b772b8-20220608"
            };
            if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
                var wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
                if (!wl.isDisabled && wl.supportsFiber) try {
                    kc = wl.inject(vl), lc = wl;
                } catch (a) {}
            }
            exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tl;
            exports.createPortal = function(a, b) {
                var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
                if (!ol(b)) throw Error(p(200));
                return dl(a, b, null, c);
            };
            exports.createRoot = function(a, b) {
                if (!ol(a)) throw Error(p(299));
                var c = !1, d = "", e = ll;
                null !== b && void 0 !== b && (!0 === b.unstable_strictMode && (c = !0), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), 
                void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
                b = cl(a, 1, !1, null, null, c, !1, d, e);
                a[uf] = b.current;
                sf(8 === a.nodeType ? a.parentNode : a);
                return new ml(b);
            };
            exports.findDOMNode = function(a) {
                if (null == a) return null;
                if (1 === a.nodeType) return a;
                var b = a._reactInternals;
                if (void 0 === b) {
                    if ("function" === typeof a.render) throw Error(p(188));
                    a = Object.keys(a).join(",");
                    throw Error(p(268, a));
                }
                a = Zb(b);
                a = null === a ? null : a.stateNode;
                return a;
            };
            exports.flushSync = function(a) {
                return Sk(a);
            };
            exports.hydrate = function(a, b, c) {
                if (!pl(b)) throw Error(p(200));
                return sl(null, a, b, !0, c);
            };
            exports.hydrateRoot = function(a, b, c) {
                if (!ol(a)) throw Error(p(405));
                var d = null != c && c.hydratedSources || null, e = !1, f = "", g = ll;
                null !== c && void 0 !== c && (!0 === c.unstable_strictMode && (e = !0), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), 
                void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
                b = fl(b, null, a, 1, null != c ? c : null, e, !1, f, g);
                a[uf] = b.current;
                sf(a);
                if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), 
                null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [ c, e ] : b.mutableSourceEagerHydrationData.push(c, e);
                return new nl(b);
            };
            exports.render = function(a, b, c) {
                if (!pl(b)) throw Error(p(200));
                return sl(null, a, b, !1, c);
            };
            exports.unmountComponentAtNode = function(a) {
                if (!pl(a)) throw Error(p(40));
                return a._reactRootContainer ? (Sk((function() {
                    sl(null, null, a, !1, (function() {
                        a._reactRootContainer = null;
                        a[uf] = null;
                    }));
                })), !0) : !1;
            };
            exports.unstable_batchedUpdates = Rk;
            exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
                if (!pl(c)) throw Error(p(200));
                if (null == a || void 0 === a._reactInternals) throw Error(p(38));
                return sl(a, b, c, !1, d);
            };
            exports.version = "18.2.0-next-9e3b772b8-20220608";
        },
        745: (__unused_webpack_module, exports, __webpack_require__) => {
            "use strict";
            var m = __webpack_require__(935);
            if (true) {
                exports.createRoot = m.createRoot;
                exports.hydrateRoot = m.hydrateRoot;
            } else ;
        },
        935: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            function checkDCE() {
                if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
                if (false) ;
                try {
                    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
                } catch (err) {
                    console.error(err);
                }
            }
            if (true) {
                checkDCE();
                module.exports = __webpack_require__(448);
            }
        },
        408: (__unused_webpack_module, exports) => {
            "use strict";
            /**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */            var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
            function A(a) {
                if (null === a || "object" !== typeof a) return null;
                a = z && a[z] || a["@@iterator"];
                return "function" === typeof a ? a : null;
            }
            var B = {
                isMounted: function() {
                    return !1;
                },
                enqueueForceUpdate: function() {},
                enqueueReplaceState: function() {},
                enqueueSetState: function() {}
            }, C = Object.assign, D = {};
            function E(a, b, e) {
                this.props = a;
                this.context = b;
                this.refs = D;
                this.updater = e || B;
            }
            E.prototype.isReactComponent = {};
            E.prototype.setState = function(a, b) {
                if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
                this.updater.enqueueSetState(this, a, b, "setState");
            };
            E.prototype.forceUpdate = function(a) {
                this.updater.enqueueForceUpdate(this, a, "forceUpdate");
            };
            function F() {}
            F.prototype = E.prototype;
            function G(a, b, e) {
                this.props = a;
                this.context = b;
                this.refs = D;
                this.updater = e || B;
            }
            var H = G.prototype = new F;
            H.constructor = G;
            C(H, E.prototype);
            H.isPureReactComponent = !0;
            var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = {
                current: null
            }, L = {
                key: !0,
                ref: !0,
                __self: !0,
                __source: !0
            };
            function M(a, b, e) {
                var d, c = {}, k = null, h = null;
                if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), 
                b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
                var g = arguments.length - 2;
                if (1 === g) c.children = e; else if (1 < g) {
                    for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
                    c.children = f;
                }
                if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
                return {
                    $$typeof: l,
                    type: a,
                    key: k,
                    ref: h,
                    props: c,
                    _owner: K.current
                };
            }
            function N(a, b) {
                return {
                    $$typeof: l,
                    type: a.type,
                    key: b,
                    ref: a.ref,
                    props: a.props,
                    _owner: a._owner
                };
            }
            function O(a) {
                return "object" === typeof a && null !== a && a.$$typeof === l;
            }
            function escape(a) {
                var b = {
                    "=": "=0",
                    ":": "=2"
                };
                return "$" + a.replace(/[=:]/g, (function(a) {
                    return b[a];
                }));
            }
            var P = /\/+/g;
            function Q(a, b) {
                return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
            }
            function R(a, b, e, d, c) {
                var k = typeof a;
                if ("undefined" === k || "boolean" === k) a = null;
                var h = !1;
                if (null === a) h = !0; else switch (k) {
                  case "string":
                  case "number":
                    h = !0;
                    break;

                  case "object":
                    switch (a.$$typeof) {
                      case l:
                      case n:
                        h = !0;
                    }
                }
                if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", 
                null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", (function(a) {
                    return a;
                }))) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), 
                b.push(c)), 1;
                h = 0;
                d = "" === d ? "." : d + ":";
                if (I(a)) for (var g = 0; g < a.length; g++) {
                    k = a[g];
                    var f = d + Q(k, g);
                    h += R(k, b, e, f, c);
                } else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, 
                f = d + Q(k, g++), h += R(k, b, e, f, c); else if ("object" === k) throw b = String(a), 
                Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
                return h;
            }
            function S(a, b, e) {
                if (null == a) return a;
                var d = [], c = 0;
                R(a, d, "", "", (function(a) {
                    return b.call(e, a, c++);
                }));
                return d;
            }
            function T(a) {
                if (-1 === a._status) {
                    var b = a._result;
                    b = b();
                    b.then((function(b) {
                        if (0 === a._status || -1 === a._status) a._status = 1, a._result = b;
                    }), (function(b) {
                        if (0 === a._status || -1 === a._status) a._status = 2, a._result = b;
                    }));
                    -1 === a._status && (a._status = 0, a._result = b);
                }
                if (1 === a._status) return a._result.default;
                throw a._result;
            }
            var U = {
                current: null
            }, V = {
                transition: null
            }, W = {
                ReactCurrentDispatcher: U,
                ReactCurrentBatchConfig: V,
                ReactCurrentOwner: K
            };
            exports.Children = {
                map: S,
                forEach: function(a, b, e) {
                    S(a, (function() {
                        b.apply(this, arguments);
                    }), e);
                },
                count: function(a) {
                    var b = 0;
                    S(a, (function() {
                        b++;
                    }));
                    return b;
                },
                toArray: function(a) {
                    return S(a, (function(a) {
                        return a;
                    })) || [];
                },
                only: function(a) {
                    if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
                    return a;
                }
            };
            exports.Component = E;
            exports.Fragment = p;
            exports.Profiler = r;
            exports.PureComponent = G;
            exports.StrictMode = q;
            exports.Suspense = w;
            exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
            exports.cloneElement = function(a, b, e) {
                if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
                var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
                if (null != b) {
                    void 0 !== b.ref && (k = b.ref, h = K.current);
                    void 0 !== b.key && (c = "" + b.key);
                    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
                    for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
                }
                var f = arguments.length - 2;
                if (1 === f) d.children = e; else if (1 < f) {
                    g = Array(f);
                    for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
                    d.children = g;
                }
                return {
                    $$typeof: l,
                    type: a.type,
                    key: c,
                    ref: k,
                    props: d,
                    _owner: h
                };
            };
            exports.createContext = function(a) {
                a = {
                    $$typeof: u,
                    _currentValue: a,
                    _currentValue2: a,
                    _threadCount: 0,
                    Provider: null,
                    Consumer: null,
                    _defaultValue: null,
                    _globalName: null
                };
                a.Provider = {
                    $$typeof: t,
                    _context: a
                };
                return a.Consumer = a;
            };
            exports.createElement = M;
            exports.createFactory = function(a) {
                var b = M.bind(null, a);
                b.type = a;
                return b;
            };
            exports.createRef = function() {
                return {
                    current: null
                };
            };
            exports.forwardRef = function(a) {
                return {
                    $$typeof: v,
                    render: a
                };
            };
            exports.isValidElement = O;
            exports.lazy = function(a) {
                return {
                    $$typeof: y,
                    _payload: {
                        _status: -1,
                        _result: a
                    },
                    _init: T
                };
            };
            exports.memo = function(a, b) {
                return {
                    $$typeof: x,
                    type: a,
                    compare: void 0 === b ? null : b
                };
            };
            exports.startTransition = function(a) {
                var b = V.transition;
                V.transition = {};
                try {
                    a();
                } finally {
                    V.transition = b;
                }
            };
            exports.unstable_act = function() {
                throw Error("act(...) is not supported in production builds of React.");
            };
            exports.useCallback = function(a, b) {
                return U.current.useCallback(a, b);
            };
            exports.useContext = function(a) {
                return U.current.useContext(a);
            };
            exports.useDebugValue = function() {};
            exports.useDeferredValue = function(a) {
                return U.current.useDeferredValue(a);
            };
            exports.useEffect = function(a, b) {
                return U.current.useEffect(a, b);
            };
            exports.useId = function() {
                return U.current.useId();
            };
            exports.useImperativeHandle = function(a, b, e) {
                return U.current.useImperativeHandle(a, b, e);
            };
            exports.useInsertionEffect = function(a, b) {
                return U.current.useInsertionEffect(a, b);
            };
            exports.useLayoutEffect = function(a, b) {
                return U.current.useLayoutEffect(a, b);
            };
            exports.useMemo = function(a, b) {
                return U.current.useMemo(a, b);
            };
            exports.useReducer = function(a, b, e) {
                return U.current.useReducer(a, b, e);
            };
            exports.useRef = function(a) {
                return U.current.useRef(a);
            };
            exports.useState = function(a) {
                return U.current.useState(a);
            };
            exports.useSyncExternalStore = function(a, b, e) {
                return U.current.useSyncExternalStore(a, b, e);
            };
            exports.useTransition = function() {
                return U.current.useTransition();
            };
            exports.version = "18.2.0";
        },
        294: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            if (true) module.exports = __webpack_require__(408);
        },
        53: (__unused_webpack_module, exports) => {
            "use strict";
            /**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */            function f(a, b) {
                var c = a.length;
                a.push(b);
                a: for (;0 < c; ) {
                    var d = c - 1 >>> 1, e = a[d];
                    if (0 < g(e, b)) a[d] = b, a[c] = e, c = d; else break a;
                }
            }
            function h(a) {
                return 0 === a.length ? null : a[0];
            }
            function k(a) {
                if (0 === a.length) return null;
                var b = a[0], c = a.pop();
                if (c !== b) {
                    a[0] = c;
                    a: for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
                        var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
                        if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, 
                        a[m] = c, d = m); else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n; else break a;
                    }
                }
                return b;
            }
            function g(a, b) {
                var c = a.sortIndex - b.sortIndex;
                return 0 !== c ? c : a.id - b.id;
            }
            if ("object" === typeof performance && "function" === typeof performance.now) {
                var l = performance;
                exports.unstable_now = function() {
                    return l.now();
                };
            } else {
                var p = Date, q = p.now();
                exports.unstable_now = function() {
                    return p.now() - q;
                };
            }
            var r = [], t = [], u = 1, v = null, y = 3, z = !1, A = !1, B = !1, D = "function" === typeof setTimeout ? setTimeout : null, E = "function" === typeof clearTimeout ? clearTimeout : null, F = "undefined" !== typeof setImmediate ? setImmediate : null;
            "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
            function G(a) {
                for (var b = h(t); null !== b; ) {
                    if (null === b.callback) k(t); else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, 
                    f(r, b); else break;
                    b = h(t);
                }
            }
            function H(a) {
                B = !1;
                G(a);
                if (!A) if (null !== h(r)) A = !0, I(J); else {
                    var b = h(t);
                    null !== b && K(H, b.startTime - a);
                }
            }
            function J(a, b) {
                A = !1;
                B && (B = !1, E(L), L = -1);
                z = !0;
                var c = y;
                try {
                    G(b);
                    for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
                        var d = v.callback;
                        if ("function" === typeof d) {
                            v.callback = null;
                            y = v.priorityLevel;
                            var e = d(v.expirationTime <= b);
                            b = exports.unstable_now();
                            "function" === typeof e ? v.callback = e : v === h(r) && k(r);
                            G(b);
                        } else k(r);
                        v = h(r);
                    }
                    if (null !== v) var w = !0; else {
                        var m = h(t);
                        null !== m && K(H, m.startTime - b);
                        w = !1;
                    }
                    return w;
                } finally {
                    v = null, y = c, z = !1;
                }
            }
            var N = !1, O = null, L = -1, P = 5, Q = -1;
            function M() {
                return exports.unstable_now() - Q < P ? !1 : !0;
            }
            function R() {
                if (null !== O) {
                    var a = exports.unstable_now();
                    Q = a;
                    var b = !0;
                    try {
                        b = O(!0, a);
                    } finally {
                        b ? S() : (N = !1, O = null);
                    }
                } else N = !1;
            }
            var S;
            if ("function" === typeof F) S = function() {
                F(R);
            }; else if ("undefined" !== typeof MessageChannel) {
                var T = new MessageChannel, U = T.port2;
                T.port1.onmessage = R;
                S = function() {
                    U.postMessage(null);
                };
            } else S = function() {
                D(R, 0);
            };
            function I(a) {
                O = a;
                N || (N = !0, S());
            }
            function K(a, b) {
                L = D((function() {
                    a(exports.unstable_now());
                }), b);
            }
            exports.unstable_IdlePriority = 5;
            exports.unstable_ImmediatePriority = 1;
            exports.unstable_LowPriority = 4;
            exports.unstable_NormalPriority = 3;
            exports.unstable_Profiling = null;
            exports.unstable_UserBlockingPriority = 2;
            exports.unstable_cancelCallback = function(a) {
                a.callback = null;
            };
            exports.unstable_continueExecution = function() {
                A || z || (A = !0, I(J));
            };
            exports.unstable_forceFrameRate = function(a) {
                0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
            };
            exports.unstable_getCurrentPriorityLevel = function() {
                return y;
            };
            exports.unstable_getFirstCallbackNode = function() {
                return h(r);
            };
            exports.unstable_next = function(a) {
                switch (y) {
                  case 1:
                  case 2:
                  case 3:
                    var b = 3;
                    break;

                  default:
                    b = y;
                }
                var c = y;
                y = b;
                try {
                    return a();
                } finally {
                    y = c;
                }
            };
            exports.unstable_pauseExecution = function() {};
            exports.unstable_requestPaint = function() {};
            exports.unstable_runWithPriority = function(a, b) {
                switch (a) {
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                  case 5:
                    break;

                  default:
                    a = 3;
                }
                var c = y;
                y = a;
                try {
                    return b();
                } finally {
                    y = c;
                }
            };
            exports.unstable_scheduleCallback = function(a, b, c) {
                var d = exports.unstable_now();
                "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
                switch (a) {
                  case 1:
                    var e = -1;
                    break;

                  case 2:
                    e = 250;
                    break;

                  case 5:
                    e = 1073741823;
                    break;

                  case 4:
                    e = 1e4;
                    break;

                  default:
                    e = 5e3;
                }
                e = c + e;
                a = {
                    id: u++,
                    callback: b,
                    priorityLevel: a,
                    startTime: c,
                    expirationTime: e,
                    sortIndex: -1
                };
                c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = !0, 
                K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = !0, I(J)));
                return a;
            };
            exports.unstable_shouldYield = M;
            exports.unstable_wrapCallback = function(a) {
                var b = y;
                return function() {
                    var c = y;
                    y = b;
                    try {
                        return a.apply(this, arguments);
                    } finally {
                        y = c;
                    }
                };
            };
        },
        840: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            if (true) module.exports = __webpack_require__(53);
        },
        223: function(module, __unused_webpack_exports, __webpack_require__) {
            window.eve = __webpack_require__(530);
            var mina = function(eve) {
                var requestID, animations = {}, requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                    setTimeout(callback, 16, (new Date).getTime());
                    return true;
                }, isArray = Array.isArray || function(a) {
                    return a instanceof Array || Object.prototype.toString.call(a) == "[object Array]";
                }, idgen = 0, idprefix = "M" + (+new Date).toString(36), ID = function() {
                    return idprefix + (idgen++).toString(36);
                }, timer = Date.now || function() {
                    return +new Date;
                }, sta = function(val) {
                    var a = this;
                    if (val == null) return a.s;
                    var ds = a.s - val;
                    a.b += a.dur * ds;
                    a.B += a.dur * ds;
                    a.s = val;
                }, speed = function(val) {
                    var a = this;
                    if (val == null) return a.spd;
                    a.spd = val;
                }, duration = function(val) {
                    var a = this;
                    if (val == null) return a.dur;
                    a.s = a.s * val / a.dur;
                    a.dur = val;
                }, stopit = function() {
                    var a = this;
                    delete animations[a.id];
                    a.update();
                    eve("mina.stop." + a.id, a);
                }, pause = function() {
                    var a = this;
                    if (a.pdif) return;
                    delete animations[a.id];
                    a.update();
                    a.pdif = a.get() - a.b;
                }, resume = function() {
                    var a = this;
                    if (!a.pdif) return;
                    a.b = a.get() - a.pdif;
                    delete a.pdif;
                    animations[a.id] = a;
                    frame();
                }, update = function() {
                    var res, a = this;
                    if (isArray(a.start)) {
                        res = [];
                        for (var j = 0, jj = a.start.length; j < jj; j++) res[j] = +a.start[j] + (a.end[j] - a.start[j]) * a.easing(a.s);
                    } else res = +a.start + (a.end - a.start) * a.easing(a.s);
                    a.set(res);
                }, frame = function(timeStamp) {
                    if (!timeStamp) {
                        if (!requestID) requestID = requestAnimFrame(frame);
                        return;
                    }
                    var len = 0;
                    for (var i in animations) if (animations.hasOwnProperty(i)) {
                        var a = animations[i], b = a.get();
                        len++;
                        a.s = (b - a.b) / (a.dur / a.spd);
                        if (a.s >= 1) {
                            delete animations[i];
                            a.s = 1;
                            len--;
                            (function(a) {
                                setTimeout((function() {
                                    eve("mina.finish." + a.id, a);
                                }));
                            })(a);
                        }
                        a.update();
                    }
                    requestID = len ? requestAnimFrame(frame) : false;
                }, mina = function(a, A, b, B, get, set, easing) {
                    var anim = {
                        id: ID(),
                        start: a,
                        end: A,
                        b,
                        s: 0,
                        dur: B - b,
                        spd: 1,
                        get,
                        set,
                        easing: easing || mina.linear,
                        status: sta,
                        speed,
                        duration,
                        stop: stopit,
                        pause,
                        resume,
                        update
                    };
                    animations[anim.id] = anim;
                    var i, len = 0;
                    for (i in animations) if (animations.hasOwnProperty(i)) {
                        len++;
                        if (len == 2) break;
                    }
                    len == 1 && frame();
                    return anim;
                };
                mina.time = timer;
                mina.getById = function(id) {
                    return animations[id] || null;
                };
                mina.linear = function(n) {
                    return n;
                };
                mina.easeout = function(n) {
                    return Math.pow(n, 1.7);
                };
                mina.easein = function(n) {
                    return Math.pow(n, .48);
                };
                mina.easeinout = function(n) {
                    if (n == 1) return 1;
                    if (n == 0) return 0;
                    var q = .48 - n / 1.04, Q = Math.sqrt(.1734 + q * q), x = Q - q, X = Math.pow(Math.abs(x), 1 / 3) * (x < 0 ? -1 : 1), y = -Q - q, Y = Math.pow(Math.abs(y), 1 / 3) * (y < 0 ? -1 : 1), t = X + Y + .5;
                    return (1 - t) * 3 * t * t + t * t * t;
                };
                mina.backin = function(n) {
                    if (n == 1) return 1;
                    var s = 1.70158;
                    return n * n * ((s + 1) * n - s);
                };
                mina.backout = function(n) {
                    if (n == 0) return 0;
                    n -= 1;
                    var s = 1.70158;
                    return n * n * ((s + 1) * n + s) + 1;
                };
                mina.elastic = function(n) {
                    if (n == !!n) return n;
                    return Math.pow(2, -10 * n) * Math.sin((n - .075) * (2 * Math.PI) / .3) + 1;
                };
                mina.bounce = function(n) {
                    var l, s = 7.5625, p = 2.75;
                    if (n < 1 / p) l = s * n * n; else if (n < 2 / p) {
                        n -= 1.5 / p;
                        l = s * n * n + .75;
                    } else if (n < 2.5 / p) {
                        n -= 2.25 / p;
                        l = s * n * n + .9375;
                    } else {
                        n -= 2.625 / p;
                        l = s * n * n + .984375;
                    }
                    return l;
                };
                window.mina = mina;
                return mina;
            }(typeof eve == "undefined" ? function() {} : eve);
            var Snap = function(root) {
                Snap.version = "0.5.1";
                function Snap(w, h) {
                    if (w) {
                        if (w.nodeType) return wrap(w);
                        if (is(w, "array") && Snap.set) return Snap.set.apply(Snap, w);
                        if (w instanceof Element) return w;
                        if (h == null) try {
                            w = glob.doc.querySelector(String(w));
                            return wrap(w);
                        } catch (e) {
                            return null;
                        }
                    }
                    w = w == null ? "100%" : w;
                    h = h == null ? "100%" : h;
                    return new Paper(w, h);
                }
                Snap.toString = function() {
                    return "Snap v" + this.version;
                };
                Snap._ = {};
                var glob = {
                    win: root.window,
                    doc: root.window.document
                };
                Snap._.glob = glob;
                var has = "hasOwnProperty", Str = String, toFloat = parseFloat, toInt = parseInt, math = Math, mmax = math.max, mmin = math.min, abs = math.abs, PI = (math.pow, 
                math.PI), E = (math.round, ""), objectToString = Object.prototype.toString, colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i, commaSpaces = (Snap._.separator = /[,\s]+/, 
                /[\s]*,[\s]*/), hsrg = {
                    hs: 1,
                    rg: 1
                }, pathCommand = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi, tCommand = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi, pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\s]*,?[\s]*/gi, idgen = 0, idprefix = "S" + (+new Date).toString(36), ID = function(el) {
                    return (el && el.type ? el.type : E) + idprefix + (idgen++).toString(36);
                }, xlink = "http://www.w3.org/1999/xlink", xmlns = "http://www.w3.org/2000/svg", hub = {};
                Snap.url = function(url) {
                    return "url('#" + url + "')";
                };
                function $(el, attr) {
                    if (attr) {
                        if (el == "#text") el = glob.doc.createTextNode(attr.text || attr["#text"] || "");
                        if (el == "#comment") el = glob.doc.createComment(attr.text || attr["#text"] || "");
                        if (typeof el == "string") el = $(el);
                        if (typeof attr == "string") if (el.nodeType == 1) {
                            if (attr.substring(0, 6) == "xlink:") return el.getAttributeNS(xlink, attr.substring(6));
                            if (attr.substring(0, 4) == "xml:") return el.getAttributeNS(xmlns, attr.substring(4));
                            return el.getAttribute(attr);
                        } else if (attr == "text") return el.nodeValue; else return null;
                        if (el.nodeType == 1) {
                            for (var key in attr) if (attr[has](key)) {
                                var val = Str(attr[key]);
                                if (val) if (key.substring(0, 6) == "xlink:") el.setAttributeNS(xlink, key.substring(6), val); else if (key.substring(0, 4) == "xml:") el.setAttributeNS(xmlns, key.substring(4), val); else el.setAttribute(key, val); else el.removeAttribute(key);
                            }
                        } else if ("text" in attr) el.nodeValue = attr.text;
                    } else el = glob.doc.createElementNS(xmlns, el);
                    return el;
                }
                Snap._.$ = $;
                Snap._.id = ID;
                function is(o, type) {
                    type = Str.prototype.toLowerCase.call(type);
                    if (type == "finite") return isFinite(o);
                    if (type == "array" && (o instanceof Array || Array.isArray && Array.isArray(o))) return true;
                    return type == "null" && o === null || type == typeof o && o !== null || type == "object" && o === Object(o) || objectToString.call(o).slice(8, -1).toLowerCase() == type;
                }
                Snap.format = function() {
                    var tokenRegex = /\{([^\}]+)\}/g, objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, replacer = function(all, key, obj) {
                        var res = obj;
                        key.replace(objNotationRegex, (function(all, name, quote, quotedName, isFunc) {
                            name = name || quotedName;
                            if (res) {
                                if (name in res) res = res[name];
                                typeof res == "function" && isFunc && (res = res());
                            }
                        }));
                        res = (res == null || res == obj ? all : res) + "";
                        return res;
                    };
                    return function(str, obj) {
                        return Str(str).replace(tokenRegex, (function(all, key) {
                            return replacer(all, key, obj);
                        }));
                    };
                }();
                function clone(obj) {
                    if (typeof obj == "function" || Object(obj) !== obj) return obj;
                    var res = new obj.constructor;
                    for (var key in obj) if (obj[has](key)) res[key] = clone(obj[key]);
                    return res;
                }
                Snap._.clone = clone;
                function repush(array, item) {
                    for (var i = 0, ii = array.length; i < ii; i++) if (array[i] === item) return array.push(array.splice(i, 1)[0]);
                }
                function cacher(f, scope, postprocessor) {
                    function newf() {
                        var arg = Array.prototype.slice.call(arguments, 0), args = arg.join("␀"), cache = newf.cache = newf.cache || {}, count = newf.count = newf.count || [];
                        if (cache[has](args)) {
                            repush(count, args);
                            return postprocessor ? postprocessor(cache[args]) : cache[args];
                        }
                        count.length >= 1e3 && delete cache[count.shift()];
                        count.push(args);
                        cache[args] = f.apply(scope, arg);
                        return postprocessor ? postprocessor(cache[args]) : cache[args];
                    }
                    return newf;
                }
                Snap._.cacher = cacher;
                function angle(x1, y1, x2, y2, x3, y3) {
                    if (x3 == null) {
                        var x = x1 - x2, y = y1 - y2;
                        if (!x && !y) return 0;
                        return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
                    } else return angle(x1, y1, x3, y3) - angle(x2, y2, x3, y3);
                }
                function rad(deg) {
                    return deg % 360 * PI / 180;
                }
                function deg(rad) {
                    return rad * 180 / PI % 360;
                }
                Snap.rad = rad;
                Snap.deg = deg;
                Snap.sin = function(angle) {
                    return math.sin(Snap.rad(angle));
                };
                Snap.tan = function(angle) {
                    return math.tan(Snap.rad(angle));
                };
                Snap.cos = function(angle) {
                    return math.cos(Snap.rad(angle));
                };
                Snap.asin = function(num) {
                    return Snap.deg(math.asin(num));
                };
                Snap.acos = function(num) {
                    return Snap.deg(math.acos(num));
                };
                Snap.atan = function(num) {
                    return Snap.deg(math.atan(num));
                };
                Snap.atan2 = function(num) {
                    return Snap.deg(math.atan2(num));
                };
                Snap.angle = angle;
                Snap.len = function(x1, y1, x2, y2) {
                    return Math.sqrt(Snap.len2(x1, y1, x2, y2));
                };
                Snap.len2 = function(x1, y1, x2, y2) {
                    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
                };
                Snap.closestPoint = function(path, x, y) {
                    function distance2(p) {
                        var dx = p.x - x, dy = p.y - y;
                        return dx * dx + dy * dy;
                    }
                    var best, bestLength, pathNode = path.node, pathLength = pathNode.getTotalLength(), precision = pathLength / pathNode.pathSegList.numberOfItems * .125, bestDistance = 1 / 0;
                    for (var scan, scanDistance, scanLength = 0; scanLength <= pathLength; scanLength += precision) if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
                        best = scan;
                        bestLength = scanLength;
                        bestDistance = scanDistance;
                    }
                    precision *= .5;
                    while (precision > .5) {
                        var before, after, beforeLength, afterLength, beforeDistance, afterDistance;
                        if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
                            best = before;
                            bestLength = beforeLength;
                            bestDistance = beforeDistance;
                        } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
                            best = after;
                            bestLength = afterLength;
                            bestDistance = afterDistance;
                        } else precision *= .5;
                    }
                    best = {
                        x: best.x,
                        y: best.y,
                        length: bestLength,
                        distance: Math.sqrt(bestDistance)
                    };
                    return best;
                };
                Snap.is = is;
                Snap.snapTo = function(values, value, tolerance) {
                    tolerance = is(tolerance, "finite") ? tolerance : 10;
                    if (is(values, "array")) {
                        var i = values.length;
                        while (i--) if (abs(values[i] - value) <= tolerance) return values[i];
                    } else {
                        values = +values;
                        var rem = value % values;
                        if (rem < tolerance) return value - rem;
                        if (rem > values - tolerance) return value - rem + values;
                    }
                    return value;
                };
                Snap.getRGB = cacher((function(colour) {
                    if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        error: 1,
                        toString: rgbtoString
                    };
                    if (colour == "none") return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        toString: rgbtoString
                    };
                    !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
                    if (!colour) return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        error: 1,
                        toString: rgbtoString
                    };
                    var red, green, blue, opacity, t, values, rgb = colour.match(colourRegExp);
                    if (rgb) {
                        if (rgb[2]) {
                            blue = toInt(rgb[2].substring(5), 16);
                            green = toInt(rgb[2].substring(3, 5), 16);
                            red = toInt(rgb[2].substring(1, 3), 16);
                        }
                        if (rgb[3]) {
                            blue = toInt((t = rgb[3].charAt(3)) + t, 16);
                            green = toInt((t = rgb[3].charAt(2)) + t, 16);
                            red = toInt((t = rgb[3].charAt(1)) + t, 16);
                        }
                        if (rgb[4]) {
                            values = rgb[4].split(commaSpaces);
                            red = toFloat(values[0]);
                            values[0].slice(-1) == "%" && (red *= 2.55);
                            green = toFloat(values[1]);
                            values[1].slice(-1) == "%" && (green *= 2.55);
                            blue = toFloat(values[2]);
                            values[2].slice(-1) == "%" && (blue *= 2.55);
                            rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
                            values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                        }
                        if (rgb[5]) {
                            values = rgb[5].split(commaSpaces);
                            red = toFloat(values[0]);
                            values[0].slice(-1) == "%" && (red /= 100);
                            green = toFloat(values[1]);
                            values[1].slice(-1) == "%" && (green /= 100);
                            blue = toFloat(values[2]);
                            values[2].slice(-1) == "%" && (blue /= 100);
                            (values[0].slice(-3) == "deg" || values[0].slice(-1) == "°") && (red /= 360);
                            rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
                            values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                            return Snap.hsb2rgb(red, green, blue, opacity);
                        }
                        if (rgb[6]) {
                            values = rgb[6].split(commaSpaces);
                            red = toFloat(values[0]);
                            values[0].slice(-1) == "%" && (red /= 100);
                            green = toFloat(values[1]);
                            values[1].slice(-1) == "%" && (green /= 100);
                            blue = toFloat(values[2]);
                            values[2].slice(-1) == "%" && (blue /= 100);
                            (values[0].slice(-3) == "deg" || values[0].slice(-1) == "°") && (red /= 360);
                            rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
                            values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                            return Snap.hsl2rgb(red, green, blue, opacity);
                        }
                        red = mmin(math.round(red), 255);
                        green = mmin(math.round(green), 255);
                        blue = mmin(math.round(blue), 255);
                        opacity = mmin(mmax(opacity, 0), 1);
                        rgb = {
                            r: red,
                            g: green,
                            b: blue,
                            toString: rgbtoString
                        };
                        rgb.hex = "#" + (16777216 | blue | green << 8 | red << 16).toString(16).slice(1);
                        rgb.opacity = is(opacity, "finite") ? opacity : 1;
                        return rgb;
                    }
                    return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        error: 1,
                        toString: rgbtoString
                    };
                }), Snap);
                Snap.hsb = cacher((function(h, s, b) {
                    return Snap.hsb2rgb(h, s, b).hex;
                }));
                Snap.hsl = cacher((function(h, s, l) {
                    return Snap.hsl2rgb(h, s, l).hex;
                }));
                Snap.rgb = cacher((function(r, g, b, o) {
                    if (is(o, "finite")) {
                        var round = math.round;
                        return "rgba(" + [ round(r), round(g), round(b), +o.toFixed(2) ] + ")";
                    }
                    return "#" + (16777216 | b | g << 8 | r << 16).toString(16).slice(1);
                }));
                var toHex = function(color) {
                    var i = glob.doc.getElementsByTagName("head")[0] || glob.doc.getElementsByTagName("svg")[0], red = "rgb(255, 0, 0)";
                    toHex = cacher((function(color) {
                        if (color.toLowerCase() == "red") return red;
                        i.style.color = red;
                        i.style.color = color;
                        var out = glob.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
                        return out == red ? null : out;
                    }));
                    return toHex(color);
                }, hsbtoString = function() {
                    return "hsb(" + [ this.h, this.s, this.b ] + ")";
                }, hsltoString = function() {
                    return "hsl(" + [ this.h, this.s, this.l ] + ")";
                }, rgbtoString = function() {
                    return this.opacity == 1 || this.opacity == null ? this.hex : "rgba(" + [ this.r, this.g, this.b, this.opacity ] + ")";
                }, prepareRGB = function(r, g, b) {
                    if (g == null && is(r, "object") && "r" in r && "g" in r && "b" in r) {
                        b = r.b;
                        g = r.g;
                        r = r.r;
                    }
                    if (g == null && is(r, string)) {
                        var clr = Snap.getRGB(r);
                        r = clr.r;
                        g = clr.g;
                        b = clr.b;
                    }
                    if (r > 1 || g > 1 || b > 1) {
                        r /= 255;
                        g /= 255;
                        b /= 255;
                    }
                    return [ r, g, b ];
                }, packageRGB = function(r, g, b, o) {
                    r = math.round(r * 255);
                    g = math.round(g * 255);
                    b = math.round(b * 255);
                    var rgb = {
                        r,
                        g,
                        b,
                        opacity: is(o, "finite") ? o : 1,
                        hex: Snap.rgb(r, g, b),
                        toString: rgbtoString
                    };
                    is(o, "finite") && (rgb.opacity = o);
                    return rgb;
                };
                Snap.color = function(clr) {
                    var rgb;
                    if (is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
                        rgb = Snap.hsb2rgb(clr);
                        clr.r = rgb.r;
                        clr.g = rgb.g;
                        clr.b = rgb.b;
                        clr.opacity = 1;
                        clr.hex = rgb.hex;
                    } else if (is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
                        rgb = Snap.hsl2rgb(clr);
                        clr.r = rgb.r;
                        clr.g = rgb.g;
                        clr.b = rgb.b;
                        clr.opacity = 1;
                        clr.hex = rgb.hex;
                    } else {
                        if (is(clr, "string")) clr = Snap.getRGB(clr);
                        if (is(clr, "object") && "r" in clr && "g" in clr && "b" in clr && !("error" in clr)) {
                            rgb = Snap.rgb2hsl(clr);
                            clr.h = rgb.h;
                            clr.s = rgb.s;
                            clr.l = rgb.l;
                            rgb = Snap.rgb2hsb(clr);
                            clr.v = rgb.b;
                        } else {
                            clr = {
                                hex: "none"
                            };
                            clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
                            clr.error = 1;
                        }
                    }
                    clr.toString = rgbtoString;
                    return clr;
                };
                Snap.hsb2rgb = function(h, s, v, o) {
                    if (is(h, "object") && "h" in h && "s" in h && "b" in h) {
                        v = h.b;
                        s = h.s;
                        o = h.o;
                        h = h.h;
                    }
                    h *= 360;
                    var R, G, B, X, C;
                    h = h % 360 / 60;
                    C = v * s;
                    X = C * (1 - abs(h % 2 - 1));
                    R = G = B = v - C;
                    h = ~~h;
                    R += [ C, X, 0, 0, X, C ][h];
                    G += [ X, C, C, X, 0, 0 ][h];
                    B += [ 0, 0, X, C, C, X ][h];
                    return packageRGB(R, G, B, o);
                };
                Snap.hsl2rgb = function(h, s, l, o) {
                    if (is(h, "object") && "h" in h && "s" in h && "l" in h) {
                        l = h.l;
                        s = h.s;
                        h = h.h;
                    }
                    if (h > 1 || s > 1 || l > 1) {
                        h /= 360;
                        s /= 100;
                        l /= 100;
                    }
                    h *= 360;
                    var R, G, B, X, C;
                    h = h % 360 / 60;
                    C = 2 * s * (l < .5 ? l : 1 - l);
                    X = C * (1 - abs(h % 2 - 1));
                    R = G = B = l - C / 2;
                    h = ~~h;
                    R += [ C, X, 0, 0, X, C ][h];
                    G += [ X, C, C, X, 0, 0 ][h];
                    B += [ 0, 0, X, C, C, X ][h];
                    return packageRGB(R, G, B, o);
                };
                Snap.rgb2hsb = function(r, g, b) {
                    b = prepareRGB(r, g, b);
                    r = b[0];
                    g = b[1];
                    b = b[2];
                    var H, S, V, C;
                    V = mmax(r, g, b);
                    C = V - mmin(r, g, b);
                    H = C == 0 ? null : V == r ? (g - b) / C : V == g ? (b - r) / C + 2 : (r - g) / C + 4;
                    H = (H + 360) % 6 * 60 / 360;
                    S = C == 0 ? 0 : C / V;
                    return {
                        h: H,
                        s: S,
                        b: V,
                        toString: hsbtoString
                    };
                };
                Snap.rgb2hsl = function(r, g, b) {
                    b = prepareRGB(r, g, b);
                    r = b[0];
                    g = b[1];
                    b = b[2];
                    var H, S, L, M, m, C;
                    M = mmax(r, g, b);
                    m = mmin(r, g, b);
                    C = M - m;
                    H = C == 0 ? null : M == r ? (g - b) / C : M == g ? (b - r) / C + 2 : (r - g) / C + 4;
                    H = (H + 360) % 6 * 60 / 360;
                    L = (M + m) / 2;
                    S = C == 0 ? 0 : L < .5 ? C / (2 * L) : C / (2 - 2 * L);
                    return {
                        h: H,
                        s: S,
                        l: L,
                        toString: hsltoString
                    };
                };
                Snap.parsePathString = function(pathString) {
                    if (!pathString) return null;
                    var pth = Snap.path(pathString);
                    if (pth.arr) return Snap.path.clone(pth.arr);
                    var paramCounts = {
                        a: 7,
                        c: 6,
                        o: 2,
                        h: 1,
                        l: 2,
                        m: 2,
                        r: 4,
                        q: 4,
                        s: 4,
                        t: 2,
                        v: 1,
                        u: 3,
                        z: 0
                    }, data = [];
                    if (is(pathString, "array") && is(pathString[0], "array")) data = Snap.path.clone(pathString);
                    if (!data.length) Str(pathString).replace(pathCommand, (function(a, b, c) {
                        var params = [], name = b.toLowerCase();
                        c.replace(pathValues, (function(a, b) {
                            b && params.push(+b);
                        }));
                        if (name == "m" && params.length > 2) {
                            data.push([ b ].concat(params.splice(0, 2)));
                            name = "l";
                            b = b == "m" ? "l" : "L";
                        }
                        if (name == "o" && params.length == 1) data.push([ b, params[0] ]);
                        if (name == "r") data.push([ b ].concat(params)); else while (params.length >= paramCounts[name]) {
                            data.push([ b ].concat(params.splice(0, paramCounts[name])));
                            if (!paramCounts[name]) break;
                        }
                    }));
                    data.toString = Snap.path.toString;
                    pth.arr = Snap.path.clone(data);
                    return data;
                };
                var parseTransformString = Snap.parseTransformString = function(TString) {
                    if (!TString) return null;
                    var data = [];
                    if (is(TString, "array") && is(TString[0], "array")) data = Snap.path.clone(TString);
                    if (!data.length) Str(TString).replace(tCommand, (function(a, b, c) {
                        var params = [];
                        b.toLowerCase();
                        c.replace(pathValues, (function(a, b) {
                            b && params.push(+b);
                        }));
                        data.push([ b ].concat(params));
                    }));
                    data.toString = Snap.path.toString;
                    return data;
                };
                function svgTransform2string(tstr) {
                    var res = [];
                    tstr = tstr.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, (function(all, name, params) {
                        params = params.split(/\s*,\s*|\s+/);
                        if (name == "rotate" && params.length == 1) params.push(0, 0);
                        if (name == "scale") {
                            if (params.length > 2) params = params.slice(0, 2); else if (params.length == 2) params.push(0, 0);
                            if (params.length == 1) params.push(params[0], 0, 0);
                        }
                        if (name == "skewX") res.push([ "m", 1, 0, math.tan(rad(params[0])), 1, 0, 0 ]); else if (name == "skewY") res.push([ "m", 1, math.tan(rad(params[0])), 0, 1, 0, 0 ]); else res.push([ name.charAt(0) ].concat(params));
                        return all;
                    }));
                    return res;
                }
                Snap._.svgTransform2string = svgTransform2string;
                Snap._.rgTransform = /^[a-z][\s]*-?\.?\d/i;
                function transform2matrix(tstr, bbox) {
                    var tdata = parseTransformString(tstr), m = new Snap.Matrix;
                    if (tdata) for (var i = 0, ii = tdata.length; i < ii; i++) {
                        var x1, y1, x2, y2, bb, t = tdata[i], tlen = t.length, command = Str(t[0]).toLowerCase(), absolute = t[0] != command, inver = absolute ? m.invert() : 0;
                        if (command == "t" && tlen == 2) m.translate(t[1], 0); else if (command == "t" && tlen == 3) if (absolute) {
                            x1 = inver.x(0, 0);
                            y1 = inver.y(0, 0);
                            x2 = inver.x(t[1], t[2]);
                            y2 = inver.y(t[1], t[2]);
                            m.translate(x2 - x1, y2 - y1);
                        } else m.translate(t[1], t[2]); else if (command == "r") {
                            if (tlen == 2) {
                                bb = bb || bbox;
                                m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            } else if (tlen == 4) if (absolute) {
                                x2 = inver.x(t[2], t[3]);
                                y2 = inver.y(t[2], t[3]);
                                m.rotate(t[1], x2, y2);
                            } else m.rotate(t[1], t[2], t[3]);
                        } else if (command == "s") {
                            if (tlen == 2 || tlen == 3) {
                                bb = bb || bbox;
                                m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            } else if (tlen == 4) if (absolute) {
                                x2 = inver.x(t[2], t[3]);
                                y2 = inver.y(t[2], t[3]);
                                m.scale(t[1], t[1], x2, y2);
                            } else m.scale(t[1], t[1], t[2], t[3]); else if (tlen == 5) if (absolute) {
                                x2 = inver.x(t[3], t[4]);
                                y2 = inver.y(t[3], t[4]);
                                m.scale(t[1], t[2], x2, y2);
                            } else m.scale(t[1], t[2], t[3], t[4]);
                        } else if (command == "m" && tlen == 7) m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
                    }
                    return m;
                }
                Snap._.transform2matrix = transform2matrix;
                Snap._unit2px = unit2px;
                glob.doc.contains || glob.doc.compareDocumentPosition;
                function getSomeDefs(el) {
                    var p = el.node.ownerSVGElement && wrap(el.node.ownerSVGElement) || el.node.parentNode && wrap(el.node.parentNode) || Snap.select("svg") || Snap(0, 0), pdefs = p.select("defs"), defs = pdefs == null ? false : pdefs.node;
                    if (!defs) defs = make("defs", p.node).node;
                    return defs;
                }
                function getSomeSVG(el) {
                    return el.node.ownerSVGElement && wrap(el.node.ownerSVGElement) || Snap.select("svg");
                }
                Snap._.getSomeDefs = getSomeDefs;
                Snap._.getSomeSVG = getSomeSVG;
                function unit2px(el, name, value) {
                    var svg = getSomeSVG(el).node, out = {}, mgr = svg.querySelector(".svg---mgr");
                    if (!mgr) {
                        mgr = $("rect");
                        $(mgr, {
                            x: -9e9,
                            y: -9e9,
                            width: 10,
                            height: 10,
                            class: "svg---mgr",
                            fill: "none"
                        });
                        svg.appendChild(mgr);
                    }
                    function getW(val) {
                        if (val == null) return E;
                        if (val == +val) return val;
                        $(mgr, {
                            width: val
                        });
                        try {
                            return mgr.getBBox().width;
                        } catch (e) {
                            return 0;
                        }
                    }
                    function getH(val) {
                        if (val == null) return E;
                        if (val == +val) return val;
                        $(mgr, {
                            height: val
                        });
                        try {
                            return mgr.getBBox().height;
                        } catch (e) {
                            return 0;
                        }
                    }
                    function set(nam, f) {
                        if (name == null) out[nam] = f(el.attr(nam) || 0); else if (nam == name) out = f(value == null ? el.attr(nam) || 0 : value);
                    }
                    switch (el.type) {
                      case "rect":
                        set("rx", getW);
                        set("ry", getH);

                      case "image":
                        set("width", getW);
                        set("height", getH);

                      case "text":
                        set("x", getW);
                        set("y", getH);
                        break;

                      case "circle":
                        set("cx", getW);
                        set("cy", getH);
                        set("r", getW);
                        break;

                      case "ellipse":
                        set("cx", getW);
                        set("cy", getH);
                        set("rx", getW);
                        set("ry", getH);
                        break;

                      case "line":
                        set("x1", getW);
                        set("x2", getW);
                        set("y1", getH);
                        set("y2", getH);
                        break;

                      case "marker":
                        set("refX", getW);
                        set("markerWidth", getW);
                        set("refY", getH);
                        set("markerHeight", getH);
                        break;

                      case "radialGradient":
                        set("fx", getW);
                        set("fy", getH);
                        break;

                      case "tspan":
                        set("dx", getW);
                        set("dy", getH);
                        break;

                      default:
                        set(name, getW);
                    }
                    svg.removeChild(mgr);
                    return out;
                }
                Snap.select = function(query) {
                    query = Str(query).replace(/([^\\]):/g, "$1\\:");
                    return wrap(glob.doc.querySelector(query));
                };
                Snap.selectAll = function(query) {
                    var nodelist = glob.doc.querySelectorAll(query), set = (Snap.set || Array)();
                    for (var i = 0; i < nodelist.length; i++) set.push(wrap(nodelist[i]));
                    return set;
                };
                function add2group(list) {
                    if (!is(list, "array")) list = Array.prototype.slice.call(arguments, 0);
                    var i = 0, j = 0, node = this.node;
                    while (this[i]) delete this[i++];
                    for (i = 0; i < list.length; i++) if (list[i].type == "set") list[i].forEach((function(el) {
                        node.appendChild(el.node);
                    })); else node.appendChild(list[i].node);
                    var children = node.childNodes;
                    for (i = 0; i < children.length; i++) this[j++] = wrap(children[i]);
                    return this;
                }
                setInterval((function() {
                    for (var key in hub) if (hub[has](key)) {
                        var el = hub[key], node = el.node;
                        if (el.type != "svg" && !node.ownerSVGElement || el.type == "svg" && (!node.parentNode || "ownerSVGElement" in node.parentNode && !node.ownerSVGElement)) delete hub[key];
                    }
                }), 1e4);
                function Element(el) {
                    if (el.snap in hub) return hub[el.snap];
                    var svg;
                    try {
                        svg = el.ownerSVGElement;
                    } catch (e) {}
                    this.node = el;
                    if (svg) this.paper = new Paper(svg);
                    this.type = el.tagName || el.nodeName;
                    var id = this.id = ID(this);
                    this.anims = {};
                    this._ = {
                        transform: []
                    };
                    el.snap = id;
                    hub[id] = this;
                    if (this.type == "g") this.add = add2group;
                    if (this.type in {
                        g: 1,
                        mask: 1,
                        pattern: 1,
                        symbol: 1
                    }) for (var method in Paper.prototype) if (Paper.prototype[has](method)) this[method] = Paper.prototype[method];
                }
                Element.prototype.attr = function(params, value) {
                    var el = this, node = el.node;
                    if (!params) {
                        if (node.nodeType != 1) return {
                            text: node.nodeValue
                        };
                        var attr = node.attributes, out = {};
                        for (var i = 0, ii = attr.length; i < ii; i++) out[attr[i].nodeName] = attr[i].nodeValue;
                        return out;
                    }
                    if (is(params, "string")) if (arguments.length > 1) {
                        var json = {};
                        json[params] = value;
                        params = json;
                    } else return eve("snap.util.getattr." + params, el).firstDefined();
                    for (var att in params) if (params[has](att)) eve("snap.util.attr." + att, el, params[att]);
                    return el;
                };
                Snap.parse = function(svg) {
                    var f = glob.doc.createDocumentFragment(), full = true, div = glob.doc.createElement("div");
                    svg = Str(svg);
                    if (!svg.match(/^\s*<\s*svg(?:\s|>)/)) {
                        svg = "<svg>" + svg + "</svg>";
                        full = false;
                    }
                    div.innerHTML = svg;
                    svg = div.getElementsByTagName("svg")[0];
                    if (svg) if (full) f = svg; else while (svg.firstChild) f.appendChild(svg.firstChild);
                    return new Fragment(f);
                };
                function Fragment(frag) {
                    this.node = frag;
                }
                Snap.fragment = function() {
                    var args = Array.prototype.slice.call(arguments, 0), f = glob.doc.createDocumentFragment();
                    for (var i = 0, ii = args.length; i < ii; i++) {
                        var item = args[i];
                        if (item.node && item.node.nodeType) f.appendChild(item.node);
                        if (item.nodeType) f.appendChild(item);
                        if (typeof item == "string") f.appendChild(Snap.parse(item).node);
                    }
                    return new Fragment(f);
                };
                function make(name, parent) {
                    var res = $(name);
                    parent.appendChild(res);
                    var el = wrap(res);
                    return el;
                }
                function Paper(w, h) {
                    var res, desc, defs, proto = Paper.prototype;
                    if (w && w.tagName && w.tagName.toLowerCase() == "svg") {
                        if (w.snap in hub) return hub[w.snap];
                        var doc = w.ownerDocument;
                        res = new Element(w);
                        desc = w.getElementsByTagName("desc")[0];
                        defs = w.getElementsByTagName("defs")[0];
                        if (!desc) {
                            desc = $("desc");
                            desc.appendChild(doc.createTextNode("Created with Snap"));
                            res.node.appendChild(desc);
                        }
                        if (!defs) {
                            defs = $("defs");
                            res.node.appendChild(defs);
                        }
                        res.defs = defs;
                        for (var key in proto) if (proto[has](key)) res[key] = proto[key];
                        res.paper = res.root = res;
                    } else {
                        res = make("svg", glob.doc.body);
                        $(res.node, {
                            height: h,
                            version: 1.1,
                            width: w,
                            xmlns
                        });
                    }
                    return res;
                }
                function wrap(dom) {
                    if (!dom) return dom;
                    if (dom instanceof Element || dom instanceof Fragment) return dom;
                    if (dom.tagName && dom.tagName.toLowerCase() == "svg") return new Paper(dom);
                    if (dom.tagName && dom.tagName.toLowerCase() == "object" && dom.type == "image/svg+xml") return new Paper(dom.contentDocument.getElementsByTagName("svg")[0]);
                    return new Element(dom);
                }
                Snap._.make = make;
                Snap._.wrap = wrap;
                Paper.prototype.el = function(name, attr) {
                    var el = make(name, this.node);
                    attr && el.attr(attr);
                    return el;
                };
                Element.prototype.children = function() {
                    var out = [], ch = this.node.childNodes;
                    for (var i = 0, ii = ch.length; i < ii; i++) out[i] = Snap(ch[i]);
                    return out;
                };
                function jsonFiller(root, o) {
                    for (var i = 0, ii = root.length; i < ii; i++) {
                        var item = {
                            type: root[i].type,
                            attr: root[i].attr()
                        }, children = root[i].children();
                        o.push(item);
                        if (children.length) jsonFiller(children, item.childNodes = []);
                    }
                }
                Element.prototype.toJSON = function() {
                    var out = [];
                    jsonFiller([ this ], out);
                    return out[0];
                };
                eve.on("snap.util.getattr", (function() {
                    var att = eve.nt();
                    att = att.substring(att.lastIndexOf(".") + 1);
                    var css = att.replace(/[A-Z]/g, (function(letter) {
                        return "-" + letter.toLowerCase();
                    }));
                    if (cssAttr[has](css)) return this.node.ownerDocument.defaultView.getComputedStyle(this.node, null).getPropertyValue(css); else return $(this.node, att);
                }));
                var cssAttr = {
                    "alignment-baseline": 0,
                    "baseline-shift": 0,
                    clip: 0,
                    "clip-path": 0,
                    "clip-rule": 0,
                    color: 0,
                    "color-interpolation": 0,
                    "color-interpolation-filters": 0,
                    "color-profile": 0,
                    "color-rendering": 0,
                    cursor: 0,
                    direction: 0,
                    display: 0,
                    "dominant-baseline": 0,
                    "enable-background": 0,
                    fill: 0,
                    "fill-opacity": 0,
                    "fill-rule": 0,
                    filter: 0,
                    "flood-color": 0,
                    "flood-opacity": 0,
                    font: 0,
                    "font-family": 0,
                    "font-size": 0,
                    "font-size-adjust": 0,
                    "font-stretch": 0,
                    "font-style": 0,
                    "font-variant": 0,
                    "font-weight": 0,
                    "glyph-orientation-horizontal": 0,
                    "glyph-orientation-vertical": 0,
                    "image-rendering": 0,
                    kerning: 0,
                    "letter-spacing": 0,
                    "lighting-color": 0,
                    marker: 0,
                    "marker-end": 0,
                    "marker-mid": 0,
                    "marker-start": 0,
                    mask: 0,
                    opacity: 0,
                    overflow: 0,
                    "pointer-events": 0,
                    "shape-rendering": 0,
                    "stop-color": 0,
                    "stop-opacity": 0,
                    stroke: 0,
                    "stroke-dasharray": 0,
                    "stroke-dashoffset": 0,
                    "stroke-linecap": 0,
                    "stroke-linejoin": 0,
                    "stroke-miterlimit": 0,
                    "stroke-opacity": 0,
                    "stroke-width": 0,
                    "text-anchor": 0,
                    "text-decoration": 0,
                    "text-rendering": 0,
                    "unicode-bidi": 0,
                    visibility: 0,
                    "word-spacing": 0,
                    "writing-mode": 0
                };
                eve.on("snap.util.attr", (function(value) {
                    var att = eve.nt(), attr = {};
                    att = att.substring(att.lastIndexOf(".") + 1);
                    attr[att] = value;
                    var style = att.replace(/-(\w)/gi, (function(all, letter) {
                        return letter.toUpperCase();
                    })), css = att.replace(/[A-Z]/g, (function(letter) {
                        return "-" + letter.toLowerCase();
                    }));
                    if (cssAttr[has](css)) this.node.style[style] = value == null ? E : value; else $(this.node, attr);
                }));
                (function(proto) {})(Paper.prototype);
                Snap.ajax = function(url, postData, callback, scope) {
                    var req = new XMLHttpRequest, id = ID();
                    if (req) {
                        if (is(postData, "function")) {
                            scope = callback;
                            callback = postData;
                            postData = null;
                        } else if (is(postData, "object")) {
                            var pd = [];
                            for (var key in postData) if (postData.hasOwnProperty(key)) pd.push(encodeURIComponent(key) + "=" + encodeURIComponent(postData[key]));
                            postData = pd.join("&");
                        }
                        req.open(postData ? "POST" : "GET", url, true);
                        if (postData) {
                            req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        }
                        if (callback) {
                            eve.once("snap.ajax." + id + ".0", callback);
                            eve.once("snap.ajax." + id + ".200", callback);
                            eve.once("snap.ajax." + id + ".304", callback);
                        }
                        req.onreadystatechange = function() {
                            if (req.readyState != 4) return;
                            eve("snap.ajax." + id + "." + req.status, scope, req);
                        };
                        if (req.readyState == 4) return req;
                        req.send(postData);
                        return req;
                    }
                };
                Snap.load = function(url, callback, scope) {
                    Snap.ajax(url, (function(req) {
                        var f = Snap.parse(req.responseText);
                        scope ? callback.call(scope, f) : callback(f);
                    }));
                };
                var getOffset = function(elem) {
                    var box = elem.getBoundingClientRect(), doc = elem.ownerDocument, body = doc.body, docElem = doc.documentElement, clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, top = box.top + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop) - clientTop, left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
                    return {
                        y: top,
                        x: left
                    };
                };
                Snap.getElementByPoint = function(x, y) {
                    var paper = this, target = (paper.canvas, glob.doc.elementFromPoint(x, y));
                    if (glob.win.opera && target.tagName == "svg") {
                        var so = getOffset(target), sr = target.createSVGRect();
                        sr.x = x - so.x;
                        sr.y = y - so.y;
                        sr.width = sr.height = 1;
                        var hits = target.getIntersectionList(sr, null);
                        if (hits.length) target = hits[hits.length - 1];
                    }
                    if (!target) return null;
                    return wrap(target);
                };
                Snap.plugin = function(f) {
                    f(Snap, Element, Paper, glob, Fragment);
                };
                glob.win.Snap = Snap;
                return Snap;
            }(window || this);
            Snap.plugin((function(Snap, Element, Paper, glob, Fragment) {
                var elproto = Element.prototype, is = Snap.is, Str = String, unit2px = Snap._unit2px, $ = Snap._.$, make = Snap._.make, getSomeDefs = Snap._.getSomeDefs, has = "hasOwnProperty", wrap = Snap._.wrap;
                elproto.getBBox = function(isWithoutTransform) {
                    if (this.type == "tspan") return Snap._.box(this.node.getClientRects().item(0));
                    if (!Snap.Matrix || !Snap.path) return this.node.getBBox();
                    var el = this, m = new Snap.Matrix;
                    if (el.removed) return Snap._.box();
                    while (el.type == "use") {
                        if (!isWithoutTransform) m = m.add(el.transform().localMatrix.translate(el.attr("x") || 0, el.attr("y") || 0));
                        if (el.original) el = el.original; else {
                            var href = el.attr("xlink:href");
                            el = el.original = el.node.ownerDocument.getElementById(href.substring(href.indexOf("#") + 1));
                        }
                    }
                    var _ = el._, pathfinder = Snap.path.get[el.type] || Snap.path.get.deflt;
                    try {
                        if (isWithoutTransform) {
                            _.bboxwt = pathfinder ? Snap.path.getBBox(el.realPath = pathfinder(el)) : Snap._.box(el.node.getBBox());
                            return Snap._.box(_.bboxwt);
                        } else {
                            el.realPath = pathfinder(el);
                            el.matrix = el.transform().localMatrix;
                            _.bbox = Snap.path.getBBox(Snap.path.map(el.realPath, m.add(el.matrix)));
                            return Snap._.box(_.bbox);
                        }
                    } catch (e) {
                        return Snap._.box();
                    }
                };
                var propString = function() {
                    return this.string;
                };
                function extractTransform(el, tstr) {
                    if (tstr == null) {
                        var doReturn = true;
                        if (el.type == "linearGradient" || el.type == "radialGradient") tstr = el.node.getAttribute("gradientTransform"); else if (el.type == "pattern") tstr = el.node.getAttribute("patternTransform"); else tstr = el.node.getAttribute("transform");
                        if (!tstr) return new Snap.Matrix;
                        tstr = Snap._.svgTransform2string(tstr);
                    } else {
                        if (!Snap._.rgTransform.test(tstr)) tstr = Snap._.svgTransform2string(tstr); else tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || "");
                        if (is(tstr, "array")) tstr = Snap.path ? Snap.path.toString.call(tstr) : Str(tstr);
                        el._.transform = tstr;
                    }
                    var m = Snap._.transform2matrix(tstr, el.getBBox(1));
                    if (doReturn) return m; else el.matrix = m;
                }
                elproto.transform = function(tstr) {
                    var _ = this._;
                    if (tstr == null) {
                        var i, papa = this, global = new Snap.Matrix(this.node.getCTM()), local = extractTransform(this), ms = [ local ], m = new Snap.Matrix, localString = local.toTransformString(), string = Str(local) == Str(this.matrix) ? Str(_.transform) : localString;
                        while (papa.type != "svg" && (papa = papa.parent())) ms.push(extractTransform(papa));
                        i = ms.length;
                        while (i--) m.add(ms[i]);
                        return {
                            string,
                            globalMatrix: global,
                            totalMatrix: m,
                            localMatrix: local,
                            diffMatrix: global.clone().add(local.invert()),
                            global: global.toTransformString(),
                            total: m.toTransformString(),
                            local: localString,
                            toString: propString
                        };
                    }
                    if (tstr instanceof Snap.Matrix) {
                        this.matrix = tstr;
                        this._.transform = tstr.toTransformString();
                    } else extractTransform(this, tstr);
                    if (this.node) if (this.type == "linearGradient" || this.type == "radialGradient") $(this.node, {
                        gradientTransform: this.matrix
                    }); else if (this.type == "pattern") $(this.node, {
                        patternTransform: this.matrix
                    }); else $(this.node, {
                        transform: this.matrix
                    });
                    return this;
                };
                elproto.parent = function() {
                    return wrap(this.node.parentNode);
                };
                elproto.append = elproto.add = function(el) {
                    if (el) {
                        if (el.type == "set") {
                            var it = this;
                            el.forEach((function(el) {
                                it.add(el);
                            }));
                            return this;
                        }
                        el = wrap(el);
                        this.node.appendChild(el.node);
                        el.paper = this.paper;
                    }
                    return this;
                };
                elproto.appendTo = function(el) {
                    if (el) {
                        el = wrap(el);
                        el.append(this);
                    }
                    return this;
                };
                elproto.prepend = function(el) {
                    if (el) {
                        if (el.type == "set") {
                            var first, it = this;
                            el.forEach((function(el) {
                                if (first) first.after(el); else it.prepend(el);
                                first = el;
                            }));
                            return this;
                        }
                        el = wrap(el);
                        var parent = el.parent();
                        this.node.insertBefore(el.node, this.node.firstChild);
                        this.add && this.add();
                        el.paper = this.paper;
                        this.parent() && this.parent().add();
                        parent && parent.add();
                    }
                    return this;
                };
                elproto.prependTo = function(el) {
                    el = wrap(el);
                    el.prepend(this);
                    return this;
                };
                elproto.before = function(el) {
                    if (el.type == "set") {
                        var it = this;
                        el.forEach((function(el) {
                            var parent = el.parent();
                            it.node.parentNode.insertBefore(el.node, it.node);
                            parent && parent.add();
                        }));
                        this.parent().add();
                        return this;
                    }
                    el = wrap(el);
                    var parent = el.parent();
                    this.node.parentNode.insertBefore(el.node, this.node);
                    this.parent() && this.parent().add();
                    parent && parent.add();
                    el.paper = this.paper;
                    return this;
                };
                elproto.after = function(el) {
                    el = wrap(el);
                    var parent = el.parent();
                    if (this.node.nextSibling) this.node.parentNode.insertBefore(el.node, this.node.nextSibling); else this.node.parentNode.appendChild(el.node);
                    this.parent() && this.parent().add();
                    parent && parent.add();
                    el.paper = this.paper;
                    return this;
                };
                elproto.insertBefore = function(el) {
                    el = wrap(el);
                    var parent = this.parent();
                    el.node.parentNode.insertBefore(this.node, el.node);
                    this.paper = el.paper;
                    parent && parent.add();
                    el.parent() && el.parent().add();
                    return this;
                };
                elproto.insertAfter = function(el) {
                    el = wrap(el);
                    var parent = this.parent();
                    el.node.parentNode.insertBefore(this.node, el.node.nextSibling);
                    this.paper = el.paper;
                    parent && parent.add();
                    el.parent() && el.parent().add();
                    return this;
                };
                elproto.remove = function() {
                    var parent = this.parent();
                    this.node.parentNode && this.node.parentNode.removeChild(this.node);
                    delete this.paper;
                    this.removed = true;
                    parent && parent.add();
                    return this;
                };
                elproto.select = function(query) {
                    return wrap(this.node.querySelector(query));
                };
                elproto.selectAll = function(query) {
                    var nodelist = this.node.querySelectorAll(query), set = (Snap.set || Array)();
                    for (var i = 0; i < nodelist.length; i++) set.push(wrap(nodelist[i]));
                    return set;
                };
                elproto.asPX = function(attr, value) {
                    if (value == null) value = this.attr(attr);
                    return +unit2px(this, attr, value);
                };
                elproto.use = function() {
                    var use, id = this.node.id;
                    if (!id) {
                        id = this.id;
                        $(this.node, {
                            id
                        });
                    }
                    if (this.type == "linearGradient" || this.type == "radialGradient" || this.type == "pattern") use = make(this.type, this.node.parentNode); else use = make("use", this.node.parentNode);
                    $(use.node, {
                        "xlink:href": "#" + id
                    });
                    use.original = this;
                    return use;
                };
                function fixids(el) {
                    var it, els = el.selectAll("*"), url = /^\s*url\(("|'|)(.*)\1\)\s*$/, ids = [], uses = {};
                    function urltest(it, name) {
                        var val = $(it.node, name);
                        val = val && val.match(url);
                        val = val && val[2];
                        if (val && val.charAt() == "#") val = val.substring(1); else return;
                        if (val) uses[val] = (uses[val] || []).concat((function(id) {
                            var attr = {};
                            attr[name] = Snap.url(id);
                            $(it.node, attr);
                        }));
                    }
                    function linktest(it) {
                        var val = $(it.node, "xlink:href");
                        if (val && val.charAt() == "#") val = val.substring(1); else return;
                        if (val) uses[val] = (uses[val] || []).concat((function(id) {
                            it.attr("xlink:href", "#" + id);
                        }));
                    }
                    for (var i = 0, ii = els.length; i < ii; i++) {
                        it = els[i];
                        urltest(it, "fill");
                        urltest(it, "stroke");
                        urltest(it, "filter");
                        urltest(it, "mask");
                        urltest(it, "clip-path");
                        linktest(it);
                        var oldid = $(it.node, "id");
                        if (oldid) {
                            $(it.node, {
                                id: it.id
                            });
                            ids.push({
                                old: oldid,
                                id: it.id
                            });
                        }
                    }
                    for (i = 0, ii = ids.length; i < ii; i++) {
                        var fs = uses[ids[i].old];
                        if (fs) for (var j = 0, jj = fs.length; j < jj; j++) fs[j](ids[i].id);
                    }
                }
                elproto.clone = function() {
                    var clone = wrap(this.node.cloneNode(true));
                    if ($(clone.node, "id")) $(clone.node, {
                        id: clone.id
                    });
                    fixids(clone);
                    clone.insertAfter(this);
                    return clone;
                };
                elproto.toDefs = function() {
                    var defs = getSomeDefs(this);
                    defs.appendChild(this.node);
                    return this;
                };
                elproto.pattern = elproto.toPattern = function(x, y, width, height) {
                    var p = make("pattern", getSomeDefs(this));
                    if (x == null) x = this.getBBox();
                    if (is(x, "object") && "x" in x) {
                        y = x.y;
                        width = x.width;
                        height = x.height;
                        x = x.x;
                    }
                    $(p.node, {
                        x,
                        y,
                        width,
                        height,
                        patternUnits: "userSpaceOnUse",
                        id: p.id,
                        viewBox: [ x, y, width, height ].join(" ")
                    });
                    p.node.appendChild(this.node);
                    return p;
                };
                elproto.marker = function(x, y, width, height, refX, refY) {
                    var p = make("marker", getSomeDefs(this));
                    if (x == null) x = this.getBBox();
                    if (is(x, "object") && "x" in x) {
                        y = x.y;
                        width = x.width;
                        height = x.height;
                        refX = x.refX || x.cx;
                        refY = x.refY || x.cy;
                        x = x.x;
                    }
                    $(p.node, {
                        viewBox: [ x, y, width, height ].join(" "),
                        markerWidth: width,
                        markerHeight: height,
                        orient: "auto",
                        refX: refX || 0,
                        refY: refY || 0,
                        id: p.id
                    });
                    p.node.appendChild(this.node);
                    return p;
                };
                var eldata = {};
                elproto.data = function(key, value) {
                    var data = eldata[this.id] = eldata[this.id] || {};
                    if (arguments.length == 0) {
                        eve("snap.data.get." + this.id, this, data, null);
                        return data;
                    }
                    if (arguments.length == 1) {
                        if (Snap.is(key, "object")) {
                            for (var i in key) if (key[has](i)) this.data(i, key[i]);
                            return this;
                        }
                        eve("snap.data.get." + this.id, this, data[key], key);
                        return data[key];
                    }
                    data[key] = value;
                    eve("snap.data.set." + this.id, this, value, key);
                    return this;
                };
                elproto.removeData = function(key) {
                    if (key == null) eldata[this.id] = {}; else eldata[this.id] && delete eldata[this.id][key];
                    return this;
                };
                elproto.outerSVG = elproto.toString = toString(1);
                elproto.innerSVG = toString();
                function toString(type) {
                    return function() {
                        var res = type ? "<" + this.type : "", attr = this.node.attributes, chld = this.node.childNodes;
                        if (type) for (var i = 0, ii = attr.length; i < ii; i++) res += " " + attr[i].name + '="' + attr[i].value.replace(/"/g, '\\"') + '"';
                        if (chld.length) {
                            type && (res += ">");
                            for (i = 0, ii = chld.length; i < ii; i++) if (chld[i].nodeType == 3) res += chld[i].nodeValue; else if (chld[i].nodeType == 1) res += wrap(chld[i]).toString();
                            type && (res += "</" + this.type + ">");
                        } else type && (res += "/>");
                        return res;
                    };
                }
                elproto.toDataURL = function() {
                    if (window && window.btoa) {
                        var bb = this.getBBox(), svg = Snap.format('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}</svg>', {
                            x: +bb.x.toFixed(3),
                            y: +bb.y.toFixed(3),
                            width: +bb.width.toFixed(3),
                            height: +bb.height.toFixed(3),
                            contents: this.outerSVG()
                        });
                        return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
                    }
                };
                Fragment.prototype.select = elproto.select;
                Fragment.prototype.selectAll = elproto.selectAll;
            }));
            Snap.plugin((function(Snap, Element, Paper, glob, Fragment) {
                var objectToString = Object.prototype.toString, Str = String, math = Math, E = "";
                function Matrix(a, b, c, d, e, f) {
                    if (b == null && objectToString.call(a) == "[object SVGMatrix]") {
                        this.a = a.a;
                        this.b = a.b;
                        this.c = a.c;
                        this.d = a.d;
                        this.e = a.e;
                        this.f = a.f;
                        return;
                    }
                    if (a != null) {
                        this.a = +a;
                        this.b = +b;
                        this.c = +c;
                        this.d = +d;
                        this.e = +e;
                        this.f = +f;
                    } else {
                        this.a = 1;
                        this.b = 0;
                        this.c = 0;
                        this.d = 1;
                        this.e = 0;
                        this.f = 0;
                    }
                }
                (function(matrixproto) {
                    matrixproto.add = function(a, b, c, d, e, f) {
                        if (a && a instanceof Matrix) return this.add(a.a, a.b, a.c, a.d, a.e, a.f);
                        var aNew = a * this.a + b * this.c, bNew = a * this.b + b * this.d;
                        this.e += e * this.a + f * this.c;
                        this.f += e * this.b + f * this.d;
                        this.c = c * this.a + d * this.c;
                        this.d = c * this.b + d * this.d;
                        this.a = aNew;
                        this.b = bNew;
                        return this;
                    };
                    Matrix.prototype.multLeft = function(a, b, c, d, e, f) {
                        if (a && a instanceof Matrix) return this.multLeft(a.a, a.b, a.c, a.d, a.e, a.f);
                        var aNew = a * this.a + c * this.b, cNew = a * this.c + c * this.d, eNew = a * this.e + c * this.f + e;
                        this.b = b * this.a + d * this.b;
                        this.d = b * this.c + d * this.d;
                        this.f = b * this.e + d * this.f + f;
                        this.a = aNew;
                        this.c = cNew;
                        this.e = eNew;
                        return this;
                    };
                    matrixproto.invert = function() {
                        var me = this, x = me.a * me.d - me.b * me.c;
                        return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
                    };
                    matrixproto.clone = function() {
                        return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
                    };
                    matrixproto.translate = function(x, y) {
                        this.e += x * this.a + y * this.c;
                        this.f += x * this.b + y * this.d;
                        return this;
                    };
                    matrixproto.scale = function(x, y, cx, cy) {
                        y == null && (y = x);
                        (cx || cy) && this.translate(cx, cy);
                        this.a *= x;
                        this.b *= x;
                        this.c *= y;
                        this.d *= y;
                        (cx || cy) && this.translate(-cx, -cy);
                        return this;
                    };
                    matrixproto.rotate = function(a, x, y) {
                        a = Snap.rad(a);
                        x = x || 0;
                        y = y || 0;
                        var cos = +math.cos(a).toFixed(9), sin = +math.sin(a).toFixed(9);
                        this.add(cos, sin, -sin, cos, x, y);
                        return this.add(1, 0, 0, 1, -x, -y);
                    };
                    matrixproto.skewX = function(x) {
                        return this.skew(x, 0);
                    };
                    matrixproto.skewY = function(y) {
                        return this.skew(0, y);
                    };
                    matrixproto.skew = function(x, y) {
                        x = x || 0;
                        y = y || 0;
                        x = Snap.rad(x);
                        y = Snap.rad(y);
                        var c = math.tan(x).toFixed(9);
                        var b = math.tan(y).toFixed(9);
                        return this.add(1, b, c, 1, 0, 0);
                    };
                    matrixproto.x = function(x, y) {
                        return x * this.a + y * this.c + this.e;
                    };
                    matrixproto.y = function(x, y) {
                        return x * this.b + y * this.d + this.f;
                    };
                    matrixproto.get = function(i) {
                        return +this[Str.fromCharCode(97 + i)].toFixed(4);
                    };
                    matrixproto.toString = function() {
                        return "matrix(" + [ this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5) ].join() + ")";
                    };
                    matrixproto.offset = function() {
                        return [ this.e.toFixed(4), this.f.toFixed(4) ];
                    };
                    function norm(a) {
                        return a[0] * a[0] + a[1] * a[1];
                    }
                    function normalize(a) {
                        var mag = math.sqrt(norm(a));
                        a[0] && (a[0] /= mag);
                        a[1] && (a[1] /= mag);
                    }
                    matrixproto.determinant = function() {
                        return this.a * this.d - this.b * this.c;
                    };
                    matrixproto.split = function() {
                        var out = {};
                        out.dx = this.e;
                        out.dy = this.f;
                        var row = [ [ this.a, this.b ], [ this.c, this.d ] ];
                        out.scalex = math.sqrt(norm(row[0]));
                        normalize(row[0]);
                        out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
                        row[1] = [ row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear ];
                        out.scaley = math.sqrt(norm(row[1]));
                        normalize(row[1]);
                        out.shear /= out.scaley;
                        if (this.determinant() < 0) out.scalex = -out.scalex;
                        var sin = row[0][1], cos = row[1][1];
                        if (cos < 0) {
                            out.rotate = Snap.deg(math.acos(cos));
                            if (sin < 0) out.rotate = 360 - out.rotate;
                        } else out.rotate = Snap.deg(math.asin(sin));
                        out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
                        out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
                        out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
                        return out;
                    };
                    matrixproto.toTransformString = function(shorter) {
                        var s = shorter || this.split();
                        if (!+s.shear.toFixed(9)) {
                            s.scalex = +s.scalex.toFixed(4);
                            s.scaley = +s.scaley.toFixed(4);
                            s.rotate = +s.rotate.toFixed(4);
                            return (s.dx || s.dy ? "t" + [ +s.dx.toFixed(4), +s.dy.toFixed(4) ] : E) + (s.rotate ? "r" + [ +s.rotate.toFixed(4), 0, 0 ] : E) + (s.scalex != 1 || s.scaley != 1 ? "s" + [ s.scalex, s.scaley, 0, 0 ] : E);
                        } else return "m" + [ this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5) ];
                    };
                })(Matrix.prototype);
                Snap.Matrix = Matrix;
                Snap.matrix = function(a, b, c, d, e, f) {
                    return new Matrix(a, b, c, d, e, f);
                };
            }));
            Snap.plugin((function(Snap, Element, Paper, glob, Fragment) {
                var make = Snap._.make, wrap = Snap._.wrap, is = Snap.is, getSomeDefs = Snap._.getSomeDefs, reURLValue = /^url\((['"]?)([^)]+)\1\)$/, $ = Snap._.$, URL = Snap.url, Str = String, separator = Snap._.separator, E = "";
                Snap.deurl = function(value) {
                    var res = String(value).match(reURLValue);
                    return res ? res[2] : value;
                };
                eve.on("snap.util.attr.mask", (function(value) {
                    if (value instanceof Element || value instanceof Fragment) {
                        eve.stop();
                        if (value instanceof Fragment && value.node.childNodes.length == 1) {
                            value = value.node.firstChild;
                            getSomeDefs(this).appendChild(value);
                            value = wrap(value);
                        }
                        if (value.type == "mask") var mask = value; else {
                            mask = make("mask", getSomeDefs(this));
                            mask.node.appendChild(value.node);
                        }
                        !mask.node.id && $(mask.node, {
                            id: mask.id
                        });
                        $(this.node, {
                            mask: URL(mask.id)
                        });
                    }
                }));
                (function(clipIt) {
                    eve.on("snap.util.attr.clip", clipIt);
                    eve.on("snap.util.attr.clip-path", clipIt);
                    eve.on("snap.util.attr.clipPath", clipIt);
                })((function(value) {
                    if (value instanceof Element || value instanceof Fragment) {
                        eve.stop();
                        var clip, node = value.node;
                        while (node) {
                            if (node.nodeName === "clipPath") {
                                clip = new Element(node);
                                break;
                            }
                            if (node.nodeName === "svg") {
                                clip = void 0;
                                break;
                            }
                            node = node.parentNode;
                        }
                        if (!clip) {
                            clip = make("clipPath", getSomeDefs(this));
                            clip.node.appendChild(value.node);
                            !clip.node.id && $(clip.node, {
                                id: clip.id
                            });
                        }
                        $(this.node, {
                            "clip-path": URL(clip.node.id || clip.id)
                        });
                    }
                }));
                function fillStroke(name) {
                    return function(value) {
                        eve.stop();
                        if (value instanceof Fragment && value.node.childNodes.length == 1 && (value.node.firstChild.tagName == "radialGradient" || value.node.firstChild.tagName == "linearGradient" || value.node.firstChild.tagName == "pattern")) {
                            value = value.node.firstChild;
                            getSomeDefs(this).appendChild(value);
                            value = wrap(value);
                        }
                        if (value instanceof Element) if (value.type == "radialGradient" || value.type == "linearGradient" || value.type == "pattern") {
                            if (!value.node.id) $(value.node, {
                                id: value.id
                            });
                            var fill = URL(value.node.id);
                        } else fill = value.attr(name); else {
                            fill = Snap.color(value);
                            if (fill.error) {
                                var grad = Snap(getSomeDefs(this).ownerSVGElement).gradient(value);
                                if (grad) {
                                    if (!grad.node.id) $(grad.node, {
                                        id: grad.id
                                    });
                                    fill = URL(grad.node.id);
                                } else fill = value;
                            } else fill = Str(fill);
                        }
                        var attrs = {};
                        attrs[name] = fill;
                        $(this.node, attrs);
                        this.node.style[name] = E;
                    };
                }
                eve.on("snap.util.attr.fill", fillStroke("fill"));
                eve.on("snap.util.attr.stroke", fillStroke("stroke"));
                var gradrg = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
                eve.on("snap.util.grad.parse", (function parseGrad(string) {
                    string = Str(string);
                    var tokens = string.match(gradrg);
                    if (!tokens) return null;
                    var type = tokens[1], params = tokens[2], stops = tokens[3];
                    params = params.split(/\s*,\s*/).map((function(el) {
                        return +el == el ? +el : el;
                    }));
                    if (params.length == 1 && params[0] == 0) params = [];
                    stops = stops.split("-");
                    stops = stops.map((function(el) {
                        el = el.split(":");
                        var out = {
                            color: el[0]
                        };
                        if (el[1]) out.offset = parseFloat(el[1]);
                        return out;
                    }));
                    var len = stops.length, start = 0, j = 0;
                    function seed(i, end) {
                        var step = (end - start) / (i - j);
                        for (var k = j; k < i; k++) stops[k].offset = +(+start + step * (k - j)).toFixed(2);
                        j = i;
                        start = end;
                    }
                    len--;
                    for (var i = 0; i < len; i++) if ("offset" in stops[i]) seed(i, stops[i].offset);
                    stops[len].offset = stops[len].offset || 100;
                    seed(len, stops[len].offset);
                    return {
                        type,
                        params,
                        stops
                    };
                }));
                eve.on("snap.util.attr.d", (function(value) {
                    eve.stop();
                    if (is(value, "array") && is(value[0], "array")) value = Snap.path.toString.call(value);
                    value = Str(value);
                    if (value.match(/[ruo]/i)) value = Snap.path.toAbsolute(value);
                    $(this.node, {
                        d: value
                    });
                }))(-1);
                eve.on("snap.util.attr.#text", (function(value) {
                    eve.stop();
                    value = Str(value);
                    var txt = glob.doc.createTextNode(value);
                    while (this.node.firstChild) this.node.removeChild(this.node.firstChild);
                    this.node.appendChild(txt);
                }))(-1);
                eve.on("snap.util.attr.path", (function(value) {
                    eve.stop();
                    this.attr({
                        d: value
                    });
                }))(-1);
                eve.on("snap.util.attr.class", (function(value) {
                    eve.stop();
                    this.node.className.baseVal = value;
                }))(-1);
                eve.on("snap.util.attr.viewBox", (function(value) {
                    var vb;
                    if (is(value, "object") && "x" in value) vb = [ value.x, value.y, value.width, value.height ].join(" "); else if (is(value, "array")) vb = value.join(" "); else vb = value;
                    $(this.node, {
                        viewBox: vb
                    });
                    eve.stop();
                }))(-1);
                eve.on("snap.util.attr.transform", (function(value) {
                    this.transform(value);
                    eve.stop();
                }))(-1);
                eve.on("snap.util.attr.r", (function(value) {
                    if (this.type == "rect") {
                        eve.stop();
                        $(this.node, {
                            rx: value,
                            ry: value
                        });
                    }
                }))(-1);
                eve.on("snap.util.attr.textpath", (function(value) {
                    eve.stop();
                    if (this.type == "text") {
                        var id, tp, node;
                        if (!value && this.textPath) {
                            tp = this.textPath;
                            while (tp.node.firstChild) this.node.appendChild(tp.node.firstChild);
                            tp.remove();
                            delete this.textPath;
                            return;
                        }
                        if (is(value, "string")) {
                            var defs = getSomeDefs(this), path = wrap(defs.parentNode).path(value);
                            defs.appendChild(path.node);
                            id = path.id;
                            path.attr({
                                id
                            });
                        } else {
                            value = wrap(value);
                            if (value instanceof Element) {
                                id = value.attr("id");
                                if (!id) {
                                    id = value.id;
                                    value.attr({
                                        id
                                    });
                                }
                            }
                        }
                        if (id) {
                            tp = this.textPath;
                            node = this.node;
                            if (tp) tp.attr({
                                "xlink:href": "#" + id
                            }); else {
                                tp = $("textPath", {
                                    "xlink:href": "#" + id
                                });
                                while (node.firstChild) tp.appendChild(node.firstChild);
                                node.appendChild(tp);
                                this.textPath = wrap(tp);
                            }
                        }
                    }
                }))(-1);
                eve.on("snap.util.attr.text", (function(value) {
                    if (this.type == "text") {
                        var node = this.node, tuner = function(chunk) {
                            var out = $("tspan");
                            if (is(chunk, "array")) for (var i = 0; i < chunk.length; i++) out.appendChild(tuner(chunk[i])); else out.appendChild(glob.doc.createTextNode(chunk));
                            out.normalize && out.normalize();
                            return out;
                        };
                        while (node.firstChild) node.removeChild(node.firstChild);
                        var tuned = tuner(value);
                        while (tuned.firstChild) node.appendChild(tuned.firstChild);
                    }
                    eve.stop();
                }))(-1);
                function setFontSize(value) {
                    eve.stop();
                    if (value == +value) value += "px";
                    this.node.style.fontSize = value;
                }
                eve.on("snap.util.attr.fontSize", setFontSize)(-1);
                eve.on("snap.util.attr.font-size", setFontSize)(-1);
                eve.on("snap.util.getattr.transform", (function() {
                    eve.stop();
                    return this.transform();
                }))(-1);
                eve.on("snap.util.getattr.textpath", (function() {
                    eve.stop();
                    return this.textPath;
                }))(-1);
                (function() {
                    function getter(end) {
                        return function() {
                            eve.stop();
                            var style = glob.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue("marker-" + end);
                            if (style == "none") return style; else return Snap(glob.doc.getElementById(style.match(reURLValue)[1]));
                        };
                    }
                    function setter(end) {
                        return function(value) {
                            eve.stop();
                            var name = "marker" + end.charAt(0).toUpperCase() + end.substring(1);
                            if (value == "" || !value) {
                                this.node.style[name] = "none";
                                return;
                            }
                            if (value.type == "marker") {
                                var id = value.node.id;
                                if (!id) $(value.node, {
                                    id: value.id
                                });
                                this.node.style[name] = URL(id);
                                return;
                            }
                        };
                    }
                    eve.on("snap.util.getattr.marker-end", getter("end"))(-1);
                    eve.on("snap.util.getattr.markerEnd", getter("end"))(-1);
                    eve.on("snap.util.getattr.marker-start", getter("start"))(-1);
                    eve.on("snap.util.getattr.markerStart", getter("start"))(-1);
                    eve.on("snap.util.getattr.marker-mid", getter("mid"))(-1);
                    eve.on("snap.util.getattr.markerMid", getter("mid"))(-1);
                    eve.on("snap.util.attr.marker-end", setter("end"))(-1);
                    eve.on("snap.util.attr.markerEnd", setter("end"))(-1);
                    eve.on("snap.util.attr.marker-start", setter("start"))(-1);
                    eve.on("snap.util.attr.markerStart", setter("start"))(-1);
                    eve.on("snap.util.attr.marker-mid", setter("mid"))(-1);
                    eve.on("snap.util.attr.markerMid", setter("mid"))(-1);
                })();
                eve.on("snap.util.getattr.r", (function() {
                    if (this.type == "rect" && $(this.node, "rx") == $(this.node, "ry")) {
                        eve.stop();
                        return $(this.node, "rx");
                    }
                }))(-1);
                function textExtract(node) {
                    var out = [];
                    var children = node.childNodes;
                    for (var i = 0, ii = children.length; i < ii; i++) {
                        var chi = children[i];
                        if (chi.nodeType == 3) out.push(chi.nodeValue);
                        if (chi.tagName == "tspan") if (chi.childNodes.length == 1 && chi.firstChild.nodeType == 3) out.push(chi.firstChild.nodeValue); else out.push(textExtract(chi));
                    }
                    return out;
                }
                eve.on("snap.util.getattr.text", (function() {
                    if (this.type == "text" || this.type == "tspan") {
                        eve.stop();
                        var out = textExtract(this.node);
                        return out.length == 1 ? out[0] : out;
                    }
                }))(-1);
                eve.on("snap.util.getattr.#text", (function() {
                    return this.node.textContent;
                }))(-1);
                eve.on("snap.util.getattr.fill", (function(internal) {
                    if (internal) return;
                    eve.stop();
                    var value = eve("snap.util.getattr.fill", this, true).firstDefined();
                    return Snap(Snap.deurl(value)) || value;
                }))(-1);
                eve.on("snap.util.getattr.stroke", (function(internal) {
                    if (internal) return;
                    eve.stop();
                    var value = eve("snap.util.getattr.stroke", this, true).firstDefined();
                    return Snap(Snap.deurl(value)) || value;
                }))(-1);
                eve.on("snap.util.getattr.viewBox", (function() {
                    eve.stop();
                    var vb = $(this.node, "viewBox");
                    if (vb) {
                        vb = vb.split(separator);
                        return Snap._.box(+vb[0], +vb[1], +vb[2], +vb[3]);
                    } else return;
                }))(-1);
                eve.on("snap.util.getattr.points", (function() {
                    var p = $(this.node, "points");
                    eve.stop();
                    if (p) return p.split(separator); else return;
                }))(-1);
                eve.on("snap.util.getattr.path", (function() {
                    var p = $(this.node, "d");
                    eve.stop();
                    return p;
                }))(-1);
                eve.on("snap.util.getattr.class", (function() {
                    return this.node.className.baseVal;
                }))(-1);
                function getFontSize() {
                    eve.stop();
                    return this.node.style.fontSize;
                }
                eve.on("snap.util.getattr.fontSize", getFontSize)(-1);
                eve.on("snap.util.getattr.font-size", getFontSize)(-1);
            }));
            Snap.plugin((function(Snap, Element, Paper, glob, Fragment) {
                var rgNotSpace = /\S+/g, Str = String, elproto = Element.prototype;
                elproto.addClass = function(value) {
                    var j, pos, clazz, finalValue, classes = Str(value || "").match(rgNotSpace) || [], elem = this.node, className = elem.className.baseVal, curClasses = className.match(rgNotSpace) || [];
                    if (classes.length) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            pos = curClasses.indexOf(clazz);
                            if (!~pos) curClasses.push(clazz);
                        }
                        finalValue = curClasses.join(" ");
                        if (className != finalValue) elem.className.baseVal = finalValue;
                    }
                    return this;
                };
                elproto.removeClass = function(value) {
                    var j, pos, clazz, finalValue, classes = Str(value || "").match(rgNotSpace) || [], elem = this.node, className = elem.className.baseVal, curClasses = className.match(rgNotSpace) || [];
                    if (curClasses.length) {
                        j = 0;
                        while (clazz = classes[j++]) {
                            pos = curClasses.indexOf(clazz);
                            if (~pos) curClasses.splice(pos, 1);
                        }
                        finalValue = curClasses.join(" ");
                        if (className != finalValue) elem.className.baseVal = finalValue;
                    }
                    return this;
                };
                elproto.hasClass = function(value) {
                    var elem = this.node, className = elem.className.baseVal, curClasses = className.match(rgNotSpace) || [];
                    return !!~curClasses.indexOf(value);
                };
                elproto.toggleClass = function(value, flag) {
                    if (flag != null) if (flag) return this.addClass(value); else return this.removeClass(value);
                    var j, pos, clazz, finalValue, classes = (value || "").match(rgNotSpace) || [], elem = this.node, className = elem.className.baseVal, curClasses = className.match(rgNotSpace) || [];
                    j = 0;
                    while (clazz = classes[j++]) {
                        pos = curClasses.indexOf(clazz);
                        if (~pos) curClasses.splice(pos, 1); else curClasses.push(clazz);
                    }
                    finalValue = curClasses.join(" ");
                    if (className != finalValue) elem.className.baseVal = finalValue;
                    return this;
                };
            }));
            Snap.plugin((function(Snap, Element, Paper, glob, Fragment) {
                var operators = {
                    "+": function(x, y) {
                        return x + y;
                    },
                    "-": function(x, y) {
                        return x - y;
                    },
                    "/": function(x, y) {
                        return x / y;
                    },
                    "*": function(x, y) {
                        return x * y;
                    }
                }, Str = String, reUnit = /[a-z]+$/i, reAddon = /^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;
                function getNumber(val) {
                    return val;
                }
                function getUnit(unit) {
                    return function(val) {
                        return +val.toFixed(3) + unit;
                    };
                }
                eve.on("snap.util.attr", (function(val) {
                    var plus = Str(val).match(reAddon);
                    if (plus) {
                        var evnt = eve.nt(), name = evnt.substring(evnt.lastIndexOf(".") + 1), a = this.attr(name), atr = {};
                        eve.stop();
                        var unit = plus[3] || "", aUnit = a.match(reUnit), op = operators[plus[1]];
                        if (aUnit && aUnit == unit) val = op(parseFloat(a), +plus[2]); else {
                            a = this.asPX(name);
                            val = op(this.asPX(name), this.asPX(name, plus[2] + unit));
                        }
                        if (isNaN(a) || isNaN(val)) return;
                        atr[name] = val;
                        this.attr(atr);
                    }
                }))(-10);
                eve.on("snap.util.equal", (function(name, b) {
                    var a = Str(this.attr(name) || ""), bplus = Str(b).match(reAddon);
                    if (bplus) {
                        eve.stop();
                        var unit = bplus[3] || "", aUnit = a.match(reUnit), op = operators[bplus[1]];
                        if (aUnit && aUnit == unit) return {
                            from: parseFloat(a),
                            to: op(parseFloat(a), +bplus[2]),
                            f: getUnit(aUnit)
                        }; else {
                            a = this.asPX(name);
                            return {
                                from: a,
                                to: op(a, this.asPX(name, bplus[2] + unit)),
                                f: getNumber
                            };
                        }
                    }
                }))(-10);
            }));
            Snap.plugin((function(Snap, Element, Paper, glob, Fragment) {
                var proto = Paper.prototype, is = Snap.is;
                proto.rect = function(x, y, w, h, rx, ry) {
                    var attr;
                    if (ry == null) ry = rx;
                    if (is(x, "object") && x == "[object Object]") attr = x; else if (x != null) {
                        attr = {
                            x,
                            y,
                            width: w,
                            height: h
                        };
                        if (rx != null) {
                            attr.rx = rx;
                            attr.ry = ry;
                        }
                    }
                    return this.el("rect", attr);
                };
                proto.circle = function(cx, cy, r) {
                    var attr;
                    if (is(cx, "object") && cx == "[object Object]") attr = cx; else if (cx != null) attr = {
                        cx,
                        cy,
                        r
                    };
                    return this.el("circle", attr);
                };
                var preload = function() {
                    function onerror() {
                        this.parentNode.removeChild(this);
                    }
                    return function(src, f) {
                        var img = glob.doc.createElement("img"), body = glob.doc.body;
                        img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
                        img.onload = function() {
                            f.call(img);
                            img.onload = img.onerror = null;
                            body.removeChild(img);
                        };
                        img.onerror = onerror;
                        body.appendChild(img);
                        img.src = src;
                    };
                }();
                proto.image = function(src, x, y, width, height) {
                    var el = this.el("image");
                    if (is(src, "object") && "src" in src) el.attr(src); else if (src != null) {
                        var set = {
                            "xlink:href": src,
                            preserveAspectRatio: "none"
                        };
                        if (x != null && y != null) {
                            set.x = x;
                            set.y = y;
                        }
                        if (width != null && height != null) {
                            set.width = width;
                            set.height = height;
                        } else preload(src, (function() {
                            Snap._.$(el.node, {
                                width: this.offsetWidth,
                                height: this.offsetHeight
                            });
                        }));
                        Snap._.$(el.node, set);
                    }
                    return el;
                };
                proto.ellipse = function(cx, cy, rx, ry) {
                    var attr;
                    if (is(cx, "object") && cx == "[object Object]") attr = cx; else if (cx != null) attr = {
                        cx,
                        cy,
                        rx,
                        ry
                    };
                    return this.el("ellipse", attr);
                };
                proto.path = function(d) {
                    var attr;
                    if (is(d, "object") && !is(d, "array")) attr = d; else if (d) attr = {
                        d
                    };
                    return this.el("path", attr);
                };
                proto.group = proto.g = function(first) {
                    var el = this.el("g");
                    if (arguments.length == 1 && first && !first.type) el.attr(first); else if (arguments.length) el.add(Array.prototype.slice.call(arguments, 0));
                    return el;
                };
                proto.svg = function(x, y, width, height, vbx, vby, vbw, vbh) {
                    var attrs = {};
                    if (is(x, "object") && y == null) attrs = x; else {
                        if (x != null) attrs.x = x;
                        if (y != null) attrs.y = y;
                        if (width != null) attrs.width = width;
                        if (height != null) attrs.height = height;
                        if (vbx != null && vby != null && vbw != null && vbh != null) attrs.viewBox = [ vbx, vby, vbw, vbh ];
                    }
                    return this.el("svg", attrs);
                };
                proto.mask = function(first) {
                    var el = this.el("mask");
                    if (arguments.length == 1 && first && !first.type) el.attr(first); else if (arguments.length) el.add(Array.prototype.slice.call(arguments, 0));
                    return el;
                };
                proto.ptrn = function(x, y, width, height, vx, vy, vw, vh) {
                    if (is(x, "object")) var attr = x; else {
                        attr = {
                            patternUnits: "userSpaceOnUse"
                        };
                        if (x) attr.x = x;
                        if (y) attr.y = y;
                        if (width != null) attr.width = width;
                        if (height != null) attr.height = height;
                        if (vx != null && vy != null && vw != null && vh != null) attr.viewBox = [ vx, vy, vw, vh ]; else attr.viewBox = [ x || 0, y || 0, width || 0, height || 0 ];
                    }
                    return this.el("pattern", attr);
                };
                proto.use = function(id) {
                    if (id != null) {
                        if (id instanceof Element) {
                            if (!id.attr("id")) id.attr({
                                id: Snap._.id(id)
                            });
                            id = id.attr("id");
                        }
                        if (String(id).charAt() == "#") id = id.substring(1);
                        return this.el("use", {
                            "xlink:href": "#" + id
                        });
                    } else return Element.prototype.use.call(this);
                };
                proto.symbol = function(vx, vy, vw, vh) {
                    var attr = {};
                    if (vx != null && vy != null && vw != null && vh != null) attr.viewBox = [ vx, vy, vw, vh ];
                    return this.el("symbol", attr);
                };
                proto.text = function(x, y, text) {
                    var attr = {};
                    if (is(x, "object")) attr = x; else if (x != null) attr = {
                        x,
                        y,
                        text: text || ""
                    };
                    return this.el("text", attr);
                };
                proto.line = function(x1, y1, x2, y2) {
                    var attr = {};
                    if (is(x1, "object")) attr = x1; else if (x1 != null) attr = {
                        x1,
                        x2,
                        y1,
                        y2
                    };
                    return this.el("line", attr);
                };
                proto.polyline = function(points) {
                    if (arguments.length > 1) points = Array.prototype.slice.call(arguments, 0);
                    var attr = {};
                    if (is(points, "object") && !is(points, "array")) attr = points; else if (points != null) attr = {
                        points
                    };
                    return this.el("polyline", attr);
                };
                proto.polygon = function(points) {
                    if (arguments.length > 1) points = Array.prototype.slice.call(arguments, 0);
                    var attr = {};
                    if (is(points, "object") && !is(points, "array")) attr = points; else if (points != null) attr = {
                        points
                    };
                    return this.el("polygon", attr);
                };
                (function() {
                    var $ = Snap._.$;
                    function Gstops() {
                        return this.selectAll("stop");
                    }
                    function GaddStop(color, offset) {
                        var stop = $("stop"), attr = {
                            offset: +offset + "%"
                        };
                        color = Snap.color(color);
                        attr["stop-color"] = color.hex;
                        if (color.opacity < 1) attr["stop-opacity"] = color.opacity;
                        $(stop, attr);
                        var inserted, stops = this.stops();
                        for (var i = 0; i < stops.length; i++) {
                            var stopOffset = parseFloat(stops[i].attr("offset"));
                            if (stopOffset > offset) {
                                this.node.insertBefore(stop, stops[i].node);
                                inserted = true;
                                break;
                            }
                        }
                        if (!inserted) this.node.appendChild(stop);
                        return this;
                    }
                    function GgetBBox() {
                        if (this.type == "linearGradient") {
                            var x1 = $(this.node, "x1") || 0, x2 = $(this.node, "x2") || 1, y1 = $(this.node, "y1") || 0, y2 = $(this.node, "y2") || 0;
                            return Snap._.box(x1, y1, math.abs(x2 - x1), math.abs(y2 - y1));
                        } else {
                            var cx = this.node.cx || .5, cy = this.node.cy || .5, r = this.node.r || 0;
                            return Snap._.box(cx - r, cy - r, r * 2, r * 2);
                        }
                    }
                    function GsetStops(str) {
                        var grad = str, stops = this.stops();
                        if (typeof str == "string") grad = eve("snap.util.grad.parse", null, "l(0,0,0,1)" + str).firstDefined().stops;
                        if (!Snap.is(grad, "array")) return;
                        for (var i = 0; i < stops.length; i++) if (grad[i]) {
                            var color = Snap.color(grad[i].color), attr = {
                                offset: grad[i].offset + "%"
                            };
                            attr["stop-color"] = color.hex;
                            if (color.opacity < 1) attr["stop-opacity"] = color.opacity;
                            stops[i].attr(attr);
                        } else stops[i].remove();
                        for (i = stops.length; i < grad.length; i++) this.addStop(grad[i].color, grad[i].offset);
                        return this;
                    }
                    function gradient(defs, str) {
                        var el, grad = eve("snap.util.grad.parse", null, str).firstDefined();
                        if (!grad) return null;
                        grad.params.unshift(defs);
                        if (grad.type.toLowerCase() == "l") el = gradientLinear.apply(0, grad.params); else el = gradientRadial.apply(0, grad.params);
                        if (grad.type != grad.type.toLowerCase()) $(el.node, {
                            gradientUnits: "userSpaceOnUse"
                        });
                        var stops = grad.stops, len = stops.length;
                        for (var i = 0; i < len; i++) {
                            var stop = stops[i];
                            el.addStop(stop.color, stop.offset);
                        }
                        return el;
                    }
                    function gradientLinear(defs, x1, y1, x2, y2) {
                        var el = Snap._.make("linearGradient", defs);
                        el.stops = Gstops;
                        el.addStop = GaddStop;
                        el.getBBox = GgetBBox;
                        el.setStops = GsetStops;
                        if (x1 != null) $(el.node, {
                            x1,
                            y1,
                            x2,
                            y2
                        });
                        return el;
                    }
                    function gradientRadial(defs, cx, cy, r, fx, fy) {
                        var el = Snap._.make("radialGradient", defs);
                        el.stops = Gstops;
                        el.addStop = GaddStop;
                        el.getBBox = GgetBBox;
                        if (cx != null) $(el.node, {
                            cx,
                            cy,
                            r
                        });
                        if (fx != null && fy != null) $(el.node, {
                            fx,
                            fy
                        });
                        return el;
                    }
                    proto.gradient = function(str) {
                        return gradient(this.defs, str);
                    };
                    proto.gradientLinear = function(x1, y1, x2, y2) {
                        return gradientLinear(this.defs, x1, y1, x2, y2);
                    };
                    proto.gradientRadial = function(cx, cy, r, fx, fy) {
                        return gradientRadial(this.defs, cx, cy, r, fx, fy);
                    };
                    proto.toString = function() {
                        var res, doc = this.node.ownerDocument, f = doc.createDocumentFragment(), d = doc.createElement("div"), svg = this.node.cloneNode(true);
                        f.appendChild(d);
                        d.appendChild(svg);
                        Snap._.$(svg, {
                            xmlns: "http://www.w3.org/2000/svg"
                        });
                        res = d.innerHTML;
                        f.removeChild(f.firstChild);
                        return res;
                    };
                    proto.toDataURL = function() {
                        if (window && window.btoa) return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this)));
                    };
                    proto.clear = function() {
                        var next, node = this.node.firstChild;
                        while (node) {
                            next = node.nextSibling;
                            if (node.tagName != "defs") node.parentNode.removeChild(node); else proto.clear.call({
                                node
                            });
                            node = next;
                        }
                    };
                })();
            }));
            Snap.plugin((function(Snap, Element, Paper, glob) {
                var elproto = Element.prototype, is = Snap.is, clone = Snap._.clone, has = "hasOwnProperty", p2s = /,?([a-z]),?/gi, toFloat = parseFloat, math = Math, PI = math.PI, mmin = math.min, mmax = math.max, pow = math.pow, abs = math.abs;
                function paths(ps) {
                    var p = paths.ps = paths.ps || {};
                    if (p[ps]) p[ps].sleep = 100; else p[ps] = {
                        sleep: 100
                    };
                    setTimeout((function() {
                        for (var key in p) if (p[has](key) && key != ps) {
                            p[key].sleep--;
                            !p[key].sleep && delete p[key];
                        }
                    }));
                    return p[ps];
                }
                function box(x, y, width, height) {
                    if (x == null) x = y = width = height = 0;
                    if (y == null) {
                        y = x.y;
                        width = x.width;
                        height = x.height;
                        x = x.x;
                    }
                    return {
                        x,
                        y,
                        width,
                        w: width,
                        height,
                        h: height,
                        x2: x + width,
                        y2: y + height,
                        cx: x + width / 2,
                        cy: y + height / 2,
                        r1: math.min(width, height) / 2,
                        r2: math.max(width, height) / 2,
                        r0: math.sqrt(width * width + height * height) / 2,
                        path: rectPath(x, y, width, height),
                        vb: [ x, y, width, height ].join(" ")
                    };
                }
                function toString() {
                    return this.join(",").replace(p2s, "$1");
                }
                function pathClone(pathArray) {
                    var res = clone(pathArray);
                    res.toString = toString;
                    return res;
                }
                function getPointAtSegmentLength(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
                    if (length == null) return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y); else return findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTotLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
                }
                function getLengthFactory(istotal, subpath) {
                    function O(val) {
                        return +(+val).toFixed(3);
                    }
                    return Snap._.cacher((function(path, length, onlystart) {
                        if (path instanceof Element) path = path.attr("d");
                        path = path2curve(path);
                        var x, y, p, l, point, sp = "", subpaths = {}, len = 0;
                        for (var i = 0, ii = path.length; i < ii; i++) {
                            p = path[i];
                            if (p[0] == "M") {
                                x = +p[1];
                                y = +p[2];
                            } else {
                                l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                                if (len + l > length) {
                                    if (subpath && !subpaths.start) {
                                        point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                                        sp += [ "C" + O(point.start.x), O(point.start.y), O(point.m.x), O(point.m.y), O(point.x), O(point.y) ];
                                        if (onlystart) return sp;
                                        subpaths.start = sp;
                                        sp = [ "M" + O(point.x), O(point.y) + "C" + O(point.n.x), O(point.n.y), O(point.end.x), O(point.end.y), O(p[5]), O(p[6]) ].join();
                                        len += l;
                                        x = +p[5];
                                        y = +p[6];
                                        continue;
                                    }
                                    if (!istotal && !subpath) {
                                        point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                                        return point;
                                    }
                                }
                                len += l;
                                x = +p[5];
                                y = +p[6];
                            }
                            sp += p.shift() + p;
                        }
                        subpaths.end = sp;
                        point = istotal ? len : subpath ? subpaths : findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
                        return point;
                    }), null, Snap._.clone);
                }
                var getTotalLength = getLengthFactory(1), getPointAtLength = getLengthFactory(), getSubpathsAtLength = getLengthFactory(0, 1);
                function findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
                    var t1 = 1 - t, t13 = pow(t1, 3), t12 = pow(t1, 2), t2 = t * t, t3 = t2 * t, x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x, y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y, mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x), my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y), nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x), ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y), ax = t1 * p1x + t * c1x, ay = t1 * p1y + t * c1y, cx = t1 * c2x + t * p2x, cy = t1 * c2y + t * p2y, alpha = 90 - math.atan2(mx - nx, my - ny) * 180 / PI;
                    return {
                        x,
                        y,
                        m: {
                            x: mx,
                            y: my
                        },
                        n: {
                            x: nx,
                            y: ny
                        },
                        start: {
                            x: ax,
                            y: ay
                        },
                        end: {
                            x: cx,
                            y: cy
                        },
                        alpha
                    };
                }
                function bezierBBox(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
                    if (!Snap.is(p1x, "array")) p1x = [ p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y ];
                    var bbox = curveDim.apply(null, p1x);
                    return box(bbox.min.x, bbox.min.y, bbox.max.x - bbox.min.x, bbox.max.y - bbox.min.y);
                }
                function isPointInsideBBox(bbox, x, y) {
                    return x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height;
                }
                function isBBoxIntersect(bbox1, bbox2) {
                    bbox1 = box(bbox1);
                    bbox2 = box(bbox2);
                    return isPointInsideBBox(bbox2, bbox1.x, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x, bbox1.y2) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y2) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y2) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
                }
                function base3(t, p1, p2, p3, p4) {
                    var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4, t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
                    return t * t2 - 3 * p1 + 3 * p2;
                }
                function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
                    if (z == null) z = 1;
                    z = z > 1 ? 1 : z < 0 ? 0 : z;
                    var z2 = z / 2, n = 12, Tvalues = [ -.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816 ], Cvalues = [ .2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472 ], sum = 0;
                    for (var i = 0; i < n; i++) {
                        var ct = z2 * Tvalues[i] + z2, xbase = base3(ct, x1, x2, x3, x4), ybase = base3(ct, y1, y2, y3, y4), comb = xbase * xbase + ybase * ybase;
                        sum += Cvalues[i] * math.sqrt(comb);
                    }
                    return z2 * sum;
                }
                function getTotLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
                    if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) return;
                    var l, t = 1, step = t / 2, t2 = t - step, e = .01;
                    l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
                    while (abs(l - ll) > e) {
                        step /= 2;
                        t2 += (l < ll ? 1 : -1) * step;
                        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
                    }
                    return t2;
                }
                function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
                    if (mmax(x1, x2) < mmin(x3, x4) || mmin(x1, x2) > mmax(x3, x4) || mmax(y1, y2) < mmin(y3, y4) || mmin(y1, y2) > mmax(y3, y4)) return;
                    var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
                    if (!denominator) return;
                    var px = nx / denominator, py = ny / denominator, px2 = +px.toFixed(2), py2 = +py.toFixed(2);
                    if (px2 < +mmin(x1, x2).toFixed(2) || px2 > +mmax(x1, x2).toFixed(2) || px2 < +mmin(x3, x4).toFixed(2) || px2 > +mmax(x3, x4).toFixed(2) || py2 < +mmin(y1, y2).toFixed(2) || py2 > +mmax(y1, y2).toFixed(2) || py2 < +mmin(y3, y4).toFixed(2) || py2 > +mmax(y3, y4).toFixed(2)) return;
                    return {
                        x: px,
                        y: py
                    };
                }
                function interHelper(bez1, bez2, justCount) {
                    var bbox1 = bezierBBox(bez1), bbox2 = bezierBBox(bez2);
                    if (!isBBoxIntersect(bbox1, bbox2)) return justCount ? 0 : [];
                    var l1 = bezlen.apply(0, bez1), l2 = bezlen.apply(0, bez2), n1 = ~~(l1 / 8), n2 = ~~(l2 / 8), dots1 = [], dots2 = [], xy = {}, res = justCount ? 0 : [];
                    for (var i = 0; i < n1 + 1; i++) {
                        var p = findDotsAtSegment.apply(0, bez1.concat(i / n1));
                        dots1.push({
                            x: p.x,
                            y: p.y,
                            t: i / n1
                        });
                    }
                    for (i = 0; i < n2 + 1; i++) {
                        p = findDotsAtSegment.apply(0, bez2.concat(i / n2));
                        dots2.push({
                            x: p.x,
                            y: p.y,
                            t: i / n2
                        });
                    }
                    for (i = 0; i < n1; i++) for (var j = 0; j < n2; j++) {
                        var di = dots1[i], di1 = dots1[i + 1], dj = dots2[j], dj1 = dots2[j + 1], ci = abs(di1.x - di.x) < .001 ? "y" : "x", cj = abs(dj1.x - dj.x) < .001 ? "y" : "x", is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
                        if (is) {
                            if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) continue;
                            xy[is.x.toFixed(4)] = is.y.toFixed(4);
                            var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t), t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
                            if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) if (justCount) res++; else res.push({
                                x: is.x,
                                y: is.y,
                                t1,
                                t2
                            });
                        }
                    }
                    return res;
                }
                function pathIntersection(path1, path2) {
                    return interPathHelper(path1, path2);
                }
                function pathIntersectionNumber(path1, path2) {
                    return interPathHelper(path1, path2, 1);
                }
                function interPathHelper(path1, path2, justCount) {
                    path1 = path2curve(path1);
                    path2 = path2curve(path2);
                    var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2, res = justCount ? 0 : [];
                    for (var i = 0, ii = path1.length; i < ii; i++) {
                        var pi = path1[i];
                        if (pi[0] == "M") {
                            x1 = x1m = pi[1];
                            y1 = y1m = pi[2];
                        } else {
                            if (pi[0] == "C") {
                                bez1 = [ x1, y1 ].concat(pi.slice(1));
                                x1 = bez1[6];
                                y1 = bez1[7];
                            } else {
                                bez1 = [ x1, y1, x1, y1, x1m, y1m, x1m, y1m ];
                                x1 = x1m;
                                y1 = y1m;
                            }
                            for (var j = 0, jj = path2.length; j < jj; j++) {
                                var pj = path2[j];
                                if (pj[0] == "M") {
                                    x2 = x2m = pj[1];
                                    y2 = y2m = pj[2];
                                } else {
                                    if (pj[0] == "C") {
                                        bez2 = [ x2, y2 ].concat(pj.slice(1));
                                        x2 = bez2[6];
                                        y2 = bez2[7];
                                    } else {
                                        bez2 = [ x2, y2, x2, y2, x2m, y2m, x2m, y2m ];
                                        x2 = x2m;
                                        y2 = y2m;
                                    }
                                    var intr = interHelper(bez1, bez2, justCount);
                                    if (justCount) res += intr; else {
                                        for (var k = 0, kk = intr.length; k < kk; k++) {
                                            intr[k].segment1 = i;
                                            intr[k].segment2 = j;
                                            intr[k].bez1 = bez1;
                                            intr[k].bez2 = bez2;
                                        }
                                        res = res.concat(intr);
                                    }
                                }
                            }
                        }
                    }
                    return res;
                }
                function isPointInsidePath(path, x, y) {
                    var bbox = pathBBox(path);
                    return isPointInsideBBox(bbox, x, y) && interPathHelper(path, [ [ "M", x, y ], [ "H", bbox.x2 + 10 ] ], 1) % 2 == 1;
                }
                function pathBBox(path) {
                    var pth = paths(path);
                    if (pth.bbox) return clone(pth.bbox);
                    if (!path) return box();
                    path = path2curve(path);
                    var p, x = 0, y = 0, X = [], Y = [];
                    for (var i = 0, ii = path.length; i < ii; i++) {
                        p = path[i];
                        if (p[0] == "M") {
                            x = p[1];
                            y = p[2];
                            X.push(x);
                            Y.push(y);
                        } else {
                            var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                            X = X.concat(dim.min.x, dim.max.x);
                            Y = Y.concat(dim.min.y, dim.max.y);
                            x = p[5];
                            y = p[6];
                        }
                    }
                    var xmin = mmin.apply(0, X), ymin = mmin.apply(0, Y), xmax = mmax.apply(0, X), ymax = mmax.apply(0, Y), bb = box(xmin, ymin, xmax - xmin, ymax - ymin);
                    pth.bbox = clone(bb);
                    return bb;
                }
                function rectPath(x, y, w, h, r) {
                    if (r) return [ [ "M", +x + +r, y ], [ "l", w - r * 2, 0 ], [ "a", r, r, 0, 0, 1, r, r ], [ "l", 0, h - r * 2 ], [ "a", r, r, 0, 0, 1, -r, r ], [ "l", r * 2 - w, 0 ], [ "a", r, r, 0, 0, 1, -r, -r ], [ "l", 0, r * 2 - h ], [ "a", r, r, 0, 0, 1, r, -r ], [ "z" ] ];
                    var res = [ [ "M", x, y ], [ "l", w, 0 ], [ "l", 0, h ], [ "l", -w, 0 ], [ "z" ] ];
                    res.toString = toString;
                    return res;
                }
                function ellipsePath(x, y, rx, ry, a) {
                    if (a == null && ry == null) ry = rx;
                    x = +x;
                    y = +y;
                    rx = +rx;
                    ry = +ry;
                    if (a != null) var rad = Math.PI / 180, x1 = x + rx * Math.cos(-ry * rad), x2 = x + rx * Math.cos(-a * rad), y1 = y + rx * Math.sin(-ry * rad), y2 = y + rx * Math.sin(-a * rad), res = [ [ "M", x1, y1 ], [ "A", rx, rx, 0, +(a - ry > 180), 0, x2, y2 ] ]; else res = [ [ "M", x, y ], [ "m", 0, -ry ], [ "a", rx, ry, 0, 1, 1, 0, 2 * ry ], [ "a", rx, ry, 0, 1, 1, 0, -2 * ry ], [ "z" ] ];
                    res.toString = toString;
                    return res;
                }
                var unit2px = Snap._unit2px, getPath = {
                    path: function(el) {
                        return el.attr("path");
                    },
                    circle: function(el) {
                        var attr = unit2px(el);
                        return ellipsePath(attr.cx, attr.cy, attr.r);
                    },
                    ellipse: function(el) {
                        var attr = unit2px(el);
                        return ellipsePath(attr.cx || 0, attr.cy || 0, attr.rx, attr.ry);
                    },
                    rect: function(el) {
                        var attr = unit2px(el);
                        return rectPath(attr.x || 0, attr.y || 0, attr.width, attr.height, attr.rx, attr.ry);
                    },
                    image: function(el) {
                        var attr = unit2px(el);
                        return rectPath(attr.x || 0, attr.y || 0, attr.width, attr.height);
                    },
                    line: function(el) {
                        return "M" + [ el.attr("x1") || 0, el.attr("y1") || 0, el.attr("x2"), el.attr("y2") ];
                    },
                    polyline: function(el) {
                        return "M" + el.attr("points");
                    },
                    polygon: function(el) {
                        return "M" + el.attr("points") + "z";
                    },
                    deflt: function(el) {
                        var bbox = el.node.getBBox();
                        return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
                    }
                };
                function pathToRelative(pathArray) {
                    var pth = paths(pathArray), lowerCase = String.prototype.toLowerCase;
                    if (pth.rel) return pathClone(pth.rel);
                    if (!Snap.is(pathArray, "array") || !Snap.is(pathArray && pathArray[0], "array")) pathArray = Snap.parsePathString(pathArray);
                    var res = [], x = 0, y = 0, mx = 0, my = 0, start = 0;
                    if (pathArray[0][0] == "M") {
                        x = pathArray[0][1];
                        y = pathArray[0][2];
                        mx = x;
                        my = y;
                        start++;
                        res.push([ "M", x, y ]);
                    }
                    for (var i = start, ii = pathArray.length; i < ii; i++) {
                        var r = res[i] = [], pa = pathArray[i];
                        if (pa[0] != lowerCase.call(pa[0])) {
                            r[0] = lowerCase.call(pa[0]);
                            switch (r[0]) {
                              case "a":
                                r[1] = pa[1];
                                r[2] = pa[2];
                                r[3] = pa[3];
                                r[4] = pa[4];
                                r[5] = pa[5];
                                r[6] = +(pa[6] - x).toFixed(3);
                                r[7] = +(pa[7] - y).toFixed(3);
                                break;

                              case "v":
                                r[1] = +(pa[1] - y).toFixed(3);
                                break;

                              case "m":
                                mx = pa[1];
                                my = pa[2];

                              default:
                                for (var j = 1, jj = pa.length; j < jj; j++) r[j] = +(pa[j] - (j % 2 ? x : y)).toFixed(3);
                            }
                        } else {
                            r = res[i] = [];
                            if (pa[0] == "m") {
                                mx = pa[1] + x;
                                my = pa[2] + y;
                            }
                            for (var k = 0, kk = pa.length; k < kk; k++) res[i][k] = pa[k];
                        }
                        var len = res[i].length;
                        switch (res[i][0]) {
                          case "z":
                            x = mx;
                            y = my;
                            break;

                          case "h":
                            x += +res[i][len - 1];
                            break;

                          case "v":
                            y += +res[i][len - 1];
                            break;

                          default:
                            x += +res[i][len - 2];
                            y += +res[i][len - 1];
                        }
                    }
                    res.toString = toString;
                    pth.rel = pathClone(res);
                    return res;
                }
                function pathToAbsolute(pathArray) {
                    var pth = paths(pathArray);
                    if (pth.abs) return pathClone(pth.abs);
                    if (!is(pathArray, "array") || !is(pathArray && pathArray[0], "array")) pathArray = Snap.parsePathString(pathArray);
                    if (!pathArray || !pathArray.length) return [ [ "M", 0, 0 ] ];
                    var pa0, res = [], x = 0, y = 0, mx = 0, my = 0, start = 0;
                    if (pathArray[0][0] == "M") {
                        x = +pathArray[0][1];
                        y = +pathArray[0][2];
                        mx = x;
                        my = y;
                        start++;
                        res[0] = [ "M", x, y ];
                    }
                    var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
                    for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
                        res.push(r = []);
                        pa = pathArray[i];
                        pa0 = pa[0];
                        if (pa0 != pa0.toUpperCase()) {
                            r[0] = pa0.toUpperCase();
                            switch (r[0]) {
                              case "A":
                                r[1] = pa[1];
                                r[2] = pa[2];
                                r[3] = pa[3];
                                r[4] = pa[4];
                                r[5] = pa[5];
                                r[6] = +pa[6] + x;
                                r[7] = +pa[7] + y;
                                break;

                              case "V":
                                r[1] = +pa[1] + y;
                                break;

                              case "H":
                                r[1] = +pa[1] + x;
                                break;

                              case "R":
                                var dots = [ x, y ].concat(pa.slice(1));
                                for (var j = 2, jj = dots.length; j < jj; j++) {
                                    dots[j] = +dots[j] + x;
                                    dots[++j] = +dots[j] + y;
                                }
                                res.pop();
                                res = res.concat(catmullRom2bezier(dots, crz));
                                break;

                              case "O":
                                res.pop();
                                dots = ellipsePath(x, y, pa[1], pa[2]);
                                dots.push(dots[0]);
                                res = res.concat(dots);
                                break;

                              case "U":
                                res.pop();
                                res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
                                r = [ "U" ].concat(res[res.length - 1].slice(-2));
                                break;

                              case "M":
                                mx = +pa[1] + x;
                                my = +pa[2] + y;

                              default:
                                for (j = 1, jj = pa.length; j < jj; j++) r[j] = +pa[j] + (j % 2 ? x : y);
                            }
                        } else if (pa0 == "R") {
                            dots = [ x, y ].concat(pa.slice(1));
                            res.pop();
                            res = res.concat(catmullRom2bezier(dots, crz));
                            r = [ "R" ].concat(pa.slice(-2));
                        } else if (pa0 == "O") {
                            res.pop();
                            dots = ellipsePath(x, y, pa[1], pa[2]);
                            dots.push(dots[0]);
                            res = res.concat(dots);
                        } else if (pa0 == "U") {
                            res.pop();
                            res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
                            r = [ "U" ].concat(res[res.length - 1].slice(-2));
                        } else for (var k = 0, kk = pa.length; k < kk; k++) r[k] = pa[k];
                        pa0 = pa0.toUpperCase();
                        if (pa0 != "O") switch (r[0]) {
                          case "Z":
                            x = +mx;
                            y = +my;
                            break;

                          case "H":
                            x = r[1];
                            break;

                          case "V":
                            y = r[1];
                            break;

                          case "M":
                            mx = r[r.length - 2];
                            my = r[r.length - 1];

                          default:
                            x = r[r.length - 2];
                            y = r[r.length - 1];
                        }
                    }
                    res.toString = toString;
                    pth.abs = pathClone(res);
                    return res;
                }
                function l2c(x1, y1, x2, y2) {
                    return [ x1, y1, x2, y2, x2, y2 ];
                }
                function q2c(x1, y1, ax, ay, x2, y2) {
                    var _13 = 1 / 3, _23 = 2 / 3;
                    return [ _13 * x1 + _23 * ax, _13 * y1 + _23 * ay, _13 * x2 + _23 * ax, _13 * y2 + _23 * ay, x2, y2 ];
                }
                function a2c(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
                    var xy, _120 = PI * 120 / 180, rad = PI / 180 * (+angle || 0), res = [], rotate = Snap._.cacher((function(x, y, rad) {
                        var X = x * math.cos(rad) - y * math.sin(rad), Y = x * math.sin(rad) + y * math.cos(rad);
                        return {
                            x: X,
                            y: Y
                        };
                    }));
                    if (!rx || !ry) return [ x1, y1, x2, y2, x2, y2 ];
                    if (!recursive) {
                        xy = rotate(x1, y1, -rad);
                        x1 = xy.x;
                        y1 = xy.y;
                        xy = rotate(x2, y2, -rad);
                        x2 = xy.x;
                        y2 = xy.y;
                        math.cos(PI / 180 * angle), math.sin(PI / 180 * angle);
                        var x = (x1 - x2) / 2, y = (y1 - y2) / 2;
                        var h = x * x / (rx * rx) + y * y / (ry * ry);
                        if (h > 1) {
                            h = math.sqrt(h);
                            rx *= h;
                            ry *= h;
                        }
                        var rx2 = rx * rx, ry2 = ry * ry, k = (large_arc_flag == sweep_flag ? -1 : 1) * math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))), cx = k * rx * y / ry + (x1 + x2) / 2, cy = k * -ry * x / rx + (y1 + y2) / 2, f1 = math.asin(((y1 - cy) / ry).toFixed(9)), f2 = math.asin(((y2 - cy) / ry).toFixed(9));
                        f1 = x1 < cx ? PI - f1 : f1;
                        f2 = x2 < cx ? PI - f2 : f2;
                        f1 < 0 && (f1 = PI * 2 + f1);
                        f2 < 0 && (f2 = PI * 2 + f2);
                        if (sweep_flag && f1 > f2) f1 -= PI * 2;
                        if (!sweep_flag && f2 > f1) f2 -= PI * 2;
                    } else {
                        f1 = recursive[0];
                        f2 = recursive[1];
                        cx = recursive[2];
                        cy = recursive[3];
                    }
                    var df = f2 - f1;
                    if (abs(df) > _120) {
                        var f2old = f2, x2old = x2, y2old = y2;
                        f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
                        x2 = cx + rx * math.cos(f2);
                        y2 = cy + ry * math.sin(f2);
                        res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [ f2, f2old, cx, cy ]);
                    }
                    df = f2 - f1;
                    var c1 = math.cos(f1), s1 = math.sin(f1), c2 = math.cos(f2), s2 = math.sin(f2), t = math.tan(df / 4), hx = 4 / 3 * rx * t, hy = 4 / 3 * ry * t, m1 = [ x1, y1 ], m2 = [ x1 + hx * s1, y1 - hy * c1 ], m3 = [ x2 + hx * s2, y2 - hy * c2 ], m4 = [ x2, y2 ];
                    m2[0] = 2 * m1[0] - m2[0];
                    m2[1] = 2 * m1[1] - m2[1];
                    if (recursive) return [ m2, m3, m4 ].concat(res); else {
                        res = [ m2, m3, m4 ].concat(res).join().split(",");
                        var newres = [];
                        for (var i = 0, ii = res.length; i < ii; i++) newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
                        return newres;
                    }
                }
                function curveDim(x0, y0, x1, y1, x2, y2, x3, y3) {
                    var a, b, c, t, t1, t2, b2ac, sqrtb2ac, tvalues = [], bounds = [ [], [] ];
                    for (var i = 0; i < 2; ++i) {
                        if (i == 0) {
                            b = 6 * x0 - 12 * x1 + 6 * x2;
                            a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
                            c = 3 * x1 - 3 * x0;
                        } else {
                            b = 6 * y0 - 12 * y1 + 6 * y2;
                            a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
                            c = 3 * y1 - 3 * y0;
                        }
                        if (abs(a) < 1e-12) {
                            if (abs(b) < 1e-12) continue;
                            t = -c / b;
                            if (0 < t && t < 1) tvalues.push(t);
                            continue;
                        }
                        b2ac = b * b - 4 * c * a;
                        sqrtb2ac = math.sqrt(b2ac);
                        if (b2ac < 0) continue;
                        t1 = (-b + sqrtb2ac) / (2 * a);
                        if (0 < t1 && t1 < 1) tvalues.push(t1);
                        t2 = (-b - sqrtb2ac) / (2 * a);
                        if (0 < t2 && t2 < 1) tvalues.push(t2);
                    }
                    var mt, j = tvalues.length, jlen = j;
                    while (j--) {
                        t = tvalues[j];
                        mt = 1 - t;
                        bounds[0][j] = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
                        bounds[1][j] = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
                    }
                    bounds[0][jlen] = x0;
                    bounds[1][jlen] = y0;
                    bounds[0][jlen + 1] = x3;
                    bounds[1][jlen + 1] = y3;
                    bounds[0].length = bounds[1].length = jlen + 2;
                    return {
                        min: {
                            x: mmin.apply(0, bounds[0]),
                            y: mmin.apply(0, bounds[1])
                        },
                        max: {
                            x: mmax.apply(0, bounds[0]),
                            y: mmax.apply(0, bounds[1])
                        }
                    };
                }
                function path2curve(path, path2) {
                    var pth = !path2 && paths(path);
                    if (!path2 && pth.curve) return pathClone(pth.curve);
                    var p = pathToAbsolute(path), p2 = path2 && pathToAbsolute(path2), attrs = {
                        x: 0,
                        y: 0,
                        bx: 0,
                        by: 0,
                        X: 0,
                        Y: 0,
                        qx: null,
                        qy: null
                    }, attrs2 = {
                        x: 0,
                        y: 0,
                        bx: 0,
                        by: 0,
                        X: 0,
                        Y: 0,
                        qx: null,
                        qy: null
                    }, processPath = function(path, d, pcom) {
                        var nx, ny;
                        if (!path) return [ "C", d.x, d.y, d.x, d.y, d.x, d.y ];
                        !(path[0] in {
                            T: 1,
                            Q: 1
                        }) && (d.qx = d.qy = null);
                        switch (path[0]) {
                          case "M":
                            d.X = path[1];
                            d.Y = path[2];
                            break;

                          case "A":
                            path = [ "C" ].concat(a2c.apply(0, [ d.x, d.y ].concat(path.slice(1))));
                            break;

                          case "S":
                            if (pcom == "C" || pcom == "S") {
                                nx = d.x * 2 - d.bx;
                                ny = d.y * 2 - d.by;
                            } else {
                                nx = d.x;
                                ny = d.y;
                            }
                            path = [ "C", nx, ny ].concat(path.slice(1));
                            break;

                          case "T":
                            if (pcom == "Q" || pcom == "T") {
                                d.qx = d.x * 2 - d.qx;
                                d.qy = d.y * 2 - d.qy;
                            } else {
                                d.qx = d.x;
                                d.qy = d.y;
                            }
                            path = [ "C" ].concat(q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
                            break;

                          case "Q":
                            d.qx = path[1];
                            d.qy = path[2];
                            path = [ "C" ].concat(q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
                            break;

                          case "L":
                            path = [ "C" ].concat(l2c(d.x, d.y, path[1], path[2]));
                            break;

                          case "H":
                            path = [ "C" ].concat(l2c(d.x, d.y, path[1], d.y));
                            break;

                          case "V":
                            path = [ "C" ].concat(l2c(d.x, d.y, d.x, path[1]));
                            break;

                          case "Z":
                            path = [ "C" ].concat(l2c(d.x, d.y, d.X, d.Y));
                            break;
                        }
                        return path;
                    }, fixArc = function(pp, i) {
                        if (pp[i].length > 7) {
                            pp[i].shift();
                            var pi = pp[i];
                            while (pi.length) {
                                pcoms1[i] = "A";
                                p2 && (pcoms2[i] = "A");
                                pp.splice(i++, 0, [ "C" ].concat(pi.splice(0, 6)));
                            }
                            pp.splice(i, 1);
                            ii = mmax(p.length, p2 && p2.length || 0);
                        }
                    }, fixM = function(path1, path2, a1, a2, i) {
                        if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                            path2.splice(i, 0, [ "M", a2.x, a2.y ]);
                            a1.bx = 0;
                            a1.by = 0;
                            a1.x = path1[i][1];
                            a1.y = path1[i][2];
                            ii = mmax(p.length, p2 && p2.length || 0);
                        }
                    }, pcoms1 = [], pcoms2 = [], pfirst = "", pcom = "";
                    for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
                        p[i] && (pfirst = p[i][0]);
                        if (pfirst != "C") {
                            pcoms1[i] = pfirst;
                            i && (pcom = pcoms1[i - 1]);
                        }
                        p[i] = processPath(p[i], attrs, pcom);
                        if (pcoms1[i] != "A" && pfirst == "C") pcoms1[i] = "C";
                        fixArc(p, i);
                        if (p2) {
                            p2[i] && (pfirst = p2[i][0]);
                            if (pfirst != "C") {
                                pcoms2[i] = pfirst;
                                i && (pcom = pcoms2[i - 1]);
                            }
                            p2[i] = processPath(p2[i], attrs2, pcom);
                            if (pcoms2[i] != "A" && pfirst == "C") pcoms2[i] = "C";
                            fixArc(p2, i);
                        }
                        fixM(p, p2, attrs, attrs2, i);
                        fixM(p2, p, attrs2, attrs, i);
                        var seg = p[i], seg2 = p2 && p2[i], seglen = seg.length, seg2len = p2 && seg2.length;
                        attrs.x = seg[seglen - 2];
                        attrs.y = seg[seglen - 1];
                        attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
                        attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
                        attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
                        attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
                        attrs2.x = p2 && seg2[seg2len - 2];
                        attrs2.y = p2 && seg2[seg2len - 1];
                    }
                    if (!p2) pth.curve = pathClone(p);
                    return p2 ? [ p, p2 ] : p;
                }
                function mapPath(path, matrix) {
                    if (!matrix) return path;
                    var x, y, i, j, ii, jj, pathi;
                    path = path2curve(path);
                    for (i = 0, ii = path.length; i < ii; i++) {
                        pathi = path[i];
                        for (j = 1, jj = pathi.length; j < jj; j += 2) {
                            x = matrix.x(pathi[j], pathi[j + 1]);
                            y = matrix.y(pathi[j], pathi[j + 1]);
                            pathi[j] = x;
                            pathi[j + 1] = y;
                        }
                    }
                    return path;
                }
                function catmullRom2bezier(crp, z) {
                    var d = [];
                    for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
                        var p = [ {
                            x: +crp[i - 2],
                            y: +crp[i - 1]
                        }, {
                            x: +crp[i],
                            y: +crp[i + 1]
                        }, {
                            x: +crp[i + 2],
                            y: +crp[i + 3]
                        }, {
                            x: +crp[i + 4],
                            y: +crp[i + 5]
                        } ];
                        if (z) {
                            if (!i) p[0] = {
                                x: +crp[iLen - 2],
                                y: +crp[iLen - 1]
                            }; else if (iLen - 4 == i) p[3] = {
                                x: +crp[0],
                                y: +crp[1]
                            }; else if (iLen - 2 == i) {
                                p[2] = {
                                    x: +crp[0],
                                    y: +crp[1]
                                };
                                p[3] = {
                                    x: +crp[2],
                                    y: +crp[3]
                                };
                            }
                        } else if (iLen - 4 == i) p[3] = p[2]; else if (!i) p[0] = {
                            x: +crp[i],
                            y: +crp[i + 1]
                        };
                        d.push([ "C", (-p[0].x + 6 * p[1].x + p[2].x) / 6, (-p[0].y + 6 * p[1].y + p[2].y) / 6, (p[1].x + 6 * p[2].x - p[3].x) / 6, (p[1].y + 6 * p[2].y - p[3].y) / 6, p[2].x, p[2].y ]);
                    }
                    return d;
                }
                Snap.path = paths;
                Snap.path.getTotalLength = getTotalLength;
                Snap.path.getPointAtLength = getPointAtLength;
                Snap.path.getSubpath = function(path, from, to) {
                    if (this.getTotalLength(path) - to < 1e-6) return getSubpathsAtLength(path, from).end;
                    var a = getSubpathsAtLength(path, to, 1);
                    return from ? getSubpathsAtLength(a, from).end : a;
                };
                elproto.getTotalLength = function() {
                    if (this.node.getTotalLength) return this.node.getTotalLength();
                };
                elproto.getPointAtLength = function(length) {
                    return getPointAtLength(this.attr("d"), length);
                };
                elproto.getSubpath = function(from, to) {
                    return Snap.path.getSubpath(this.attr("d"), from, to);
                };
                Snap._.box = box;
                Snap.path.findDotsAtSegment = findDotsAtSegment;
                Snap.path.bezierBBox = bezierBBox;
                Snap.path.isPointInsideBBox = isPointInsideBBox;
                Snap.closest = function(x, y, X, Y) {
                    var r = 100, b = box(x - r / 2, y - r / 2, r, r), inside = [], getter = X[0].hasOwnProperty("x") ? function(i) {
                        return {
                            x: X[i].x,
                            y: X[i].y
                        };
                    } : function(i) {
                        return {
                            x: X[i],
                            y: Y[i]
                        };
                    }, found = 0;
                    while (r <= 1e6 && !found) {
                        for (var i = 0, ii = X.length; i < ii; i++) {
                            var xy = getter(i);
                            if (isPointInsideBBox(b, xy.x, xy.y)) {
                                found++;
                                inside.push(xy);
                                break;
                            }
                        }
                        if (!found) {
                            r *= 2;
                            b = box(x - r / 2, y - r / 2, r, r);
                        }
                    }
                    if (r == 1e6) return;
                    var res, len = 1 / 0;
                    for (i = 0, ii = inside.length; i < ii; i++) {
                        var l = Snap.len(x, y, inside[i].x, inside[i].y);
                        if (len > l) {
                            len = l;
                            inside[i].len = l;
                            res = inside[i];
                        }
                    }
                    return res;
                };
                Snap.path.isBBoxIntersect = isBBoxIntersect;
                Snap.path.intersection = pathIntersection;
                Snap.path.intersectionNumber = pathIntersectionNumber;
                Snap.path.isPointInside = isPointInsidePath;
                Snap.path.getBBox = pathBBox;
                Snap.path.get = getPath;
                Snap.path.toRelative = pathToRelative;
                Snap.path.toAbsolute = pathToAbsolute;
                Snap.path.toCubic = path2curve;
                Snap.path.map = mapPath;
                Snap.path.toString = toString;
                Snap.path.clone = pathClone;
            }));
            Snap.plugin((function(Snap, Element, Paper, glob) {
                var mmax = Math.max, mmin = Math.min;
                var Set = function(items) {
                    this.items = [];
                    this.bindings = {};
                    this.length = 0;
                    this.type = "set";
                    if (items) for (var i = 0, ii = items.length; i < ii; i++) if (items[i]) {
                        this[this.items.length] = this.items[this.items.length] = items[i];
                        this.length++;
                    }
                }, setproto = Set.prototype;
                setproto.push = function() {
                    var item, len;
                    for (var i = 0, ii = arguments.length; i < ii; i++) {
                        item = arguments[i];
                        if (item) {
                            len = this.items.length;
                            this[len] = this.items[len] = item;
                            this.length++;
                        }
                    }
                    return this;
                };
                setproto.pop = function() {
                    this.length && delete this[this.length--];
                    return this.items.pop();
                };
                setproto.forEach = function(callback, thisArg) {
                    for (var i = 0, ii = this.items.length; i < ii; i++) if (callback.call(thisArg, this.items[i], i) === false) return this;
                    return this;
                };
                setproto.animate = function(attrs, ms, easing, callback) {
                    if (typeof easing == "function" && !easing.length) {
                        callback = easing;
                        easing = mina.linear;
                    }
                    if (attrs instanceof Snap._.Animation) {
                        callback = attrs.callback;
                        easing = attrs.easing;
                        ms = easing.dur;
                        attrs = attrs.attr;
                    }
                    var args = arguments;
                    if (Snap.is(attrs, "array") && Snap.is(args[args.length - 1], "array")) var each = true;
                    var begin, handler = function() {
                        if (begin) this.b = begin; else begin = this.b;
                    }, cb = 0, set = this, callbacker = callback && function() {
                        if (++cb == set.length) callback.call(this);
                    };
                    return this.forEach((function(el, i) {
                        eve.once("snap.animcreated." + el.id, handler);
                        if (each) args[i] && el.animate.apply(el, args[i]); else el.animate(attrs, ms, easing, callbacker);
                    }));
                };
                setproto.remove = function() {
                    while (this.length) this.pop().remove();
                    return this;
                };
                setproto.bind = function(attr, a, b) {
                    var data = {};
                    if (typeof a == "function") this.bindings[attr] = a; else {
                        var aname = b || attr;
                        this.bindings[attr] = function(v) {
                            data[aname] = v;
                            a.attr(data);
                        };
                    }
                    return this;
                };
                setproto.attr = function(value) {
                    var unbound = {};
                    for (var k in value) if (this.bindings[k]) this.bindings[k](value[k]); else unbound[k] = value[k];
                    for (var i = 0, ii = this.items.length; i < ii; i++) this.items[i].attr(unbound);
                    return this;
                };
                setproto.clear = function() {
                    while (this.length) this.pop();
                };
                setproto.splice = function(index, count, insertion) {
                    index = index < 0 ? mmax(this.length + index, 0) : index;
                    count = mmax(0, mmin(this.length - index, count));
                    var i, tail = [], todel = [], args = [];
                    for (i = 2; i < arguments.length; i++) args.push(arguments[i]);
                    for (i = 0; i < count; i++) todel.push(this[index + i]);
                    for (;i < this.length - index; i++) tail.push(this[index + i]);
                    var arglen = args.length;
                    for (i = 0; i < arglen + tail.length; i++) this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
                    i = this.items.length = this.length -= count - arglen;
                    while (this[i]) delete this[i++];
                    return new Set(todel);
                };
                setproto.exclude = function(el) {
                    for (var i = 0, ii = this.length; i < ii; i++) if (this[i] == el) {
                        this.splice(i, 1);
                        return true;
                    }
                    return false;
                };
                setproto.insertAfter = function(el) {
                    var i = this.items.length;
                    while (i--) this.items[i].insertAfter(el);
                    return this;
                };
                setproto.getBBox = function() {
                    var x = [], y = [], x2 = [], y2 = [];
                    for (var i = this.items.length; i--; ) if (!this.items[i].removed) {
                        var box = this.items[i].getBBox();
                        x.push(box.x);
                        y.push(box.y);
                        x2.push(box.x + box.width);
                        y2.push(box.y + box.height);
                    }
                    x = mmin.apply(0, x);
                    y = mmin.apply(0, y);
                    x2 = mmax.apply(0, x2);
                    y2 = mmax.apply(0, y2);
                    return {
                        x,
                        y,
                        x2,
                        y2,
                        width: x2 - x,
                        height: y2 - y,
                        cx: x + (x2 - x) / 2,
                        cy: y + (y2 - y) / 2
                    };
                };
                setproto.clone = function(s) {
                    s = new Set;
                    for (var i = 0, ii = this.items.length; i < ii; i++) s.push(this.items[i].clone());
                    return s;
                };
                setproto.toString = function() {
                    return "Snap‘s set";
                };
                setproto.type = "set";
                Snap.Set = Set;
                Snap.set = function() {
                    var set = new Set;
                    if (arguments.length) set.push.apply(set, Array.prototype.slice.call(arguments, 0));
                    return set;
                };
            }));
            Snap.plugin((function(Snap, Element, Paper, glob) {
                var names = {}, reUnit = /[%a-z]+$/i, Str = String;
                names.stroke = names.fill = "colour";
                function getEmpty(item) {
                    var l = item[0];
                    switch (l.toLowerCase()) {
                      case "t":
                        return [ l, 0, 0 ];

                      case "m":
                        return [ l, 1, 0, 0, 1, 0, 0 ];

                      case "r":
                        if (item.length == 4) return [ l, 0, item[2], item[3] ]; else return [ l, 0 ];

                      case "s":
                        if (item.length == 5) return [ l, 1, 1, item[3], item[4] ]; else if (item.length == 3) return [ l, 1, 1 ]; else return [ l, 1 ];
                    }
                }
                function equaliseTransform(t1, t2, getBBox) {
                    t1 = t1 || new Snap.Matrix;
                    t2 = t2 || new Snap.Matrix;
                    t1 = Snap.parseTransformString(t1.toTransformString()) || [];
                    t2 = Snap.parseTransformString(t2.toTransformString()) || [];
                    var j, jj, tt1, tt2, maxlength = Math.max(t1.length, t2.length), from = [], to = [], i = 0;
                    for (;i < maxlength; i++) {
                        tt1 = t1[i] || getEmpty(t2[i]);
                        tt2 = t2[i] || getEmpty(tt1);
                        if (tt1[0] != tt2[0] || tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3]) || tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4])) {
                            t1 = Snap._.transform2matrix(t1, getBBox());
                            t2 = Snap._.transform2matrix(t2, getBBox());
                            from = [ [ "m", t1.a, t1.b, t1.c, t1.d, t1.e, t1.f ] ];
                            to = [ [ "m", t2.a, t2.b, t2.c, t2.d, t2.e, t2.f ] ];
                            break;
                        }
                        from[i] = [];
                        to[i] = [];
                        for (j = 0, jj = Math.max(tt1.length, tt2.length); j < jj; j++) {
                            j in tt1 && (from[i][j] = tt1[j]);
                            j in tt2 && (to[i][j] = tt2[j]);
                        }
                    }
                    return {
                        from: path2array(from),
                        to: path2array(to),
                        f: getPath(from)
                    };
                }
                function getNumber(val) {
                    return val;
                }
                function getUnit(unit) {
                    return function(val) {
                        return +val.toFixed(3) + unit;
                    };
                }
                function getViewBox(val) {
                    return val.join(" ");
                }
                function getColour(clr) {
                    return Snap.rgb(clr[0], clr[1], clr[2], clr[3]);
                }
                function getPath(path) {
                    var i, ii, j, jj, out, a, k = 0, b = [];
                    for (i = 0, ii = path.length; i < ii; i++) {
                        out = "[";
                        a = [ '"' + path[i][0] + '"' ];
                        for (j = 1, jj = path[i].length; j < jj; j++) a[j] = "val[" + k++ + "]";
                        out += a + "]";
                        b[i] = out;
                    }
                    return Function("val", "return Snap.path.toString.call([" + b + "])");
                }
                function path2array(path) {
                    var out = [];
                    for (var i = 0, ii = path.length; i < ii; i++) for (var j = 1, jj = path[i].length; j < jj; j++) out.push(path[i][j]);
                    return out;
                }
                function isNumeric(obj) {
                    return isFinite(obj);
                }
                function arrayEqual(arr1, arr2) {
                    if (!Snap.is(arr1, "array") || !Snap.is(arr2, "array")) return false;
                    return arr1.toString() == arr2.toString();
                }
                Element.prototype.equal = function(name, b) {
                    return eve("snap.util.equal", this, name, b).firstDefined();
                };
                eve.on("snap.util.equal", (function(name, b) {
                    var A, B, a = Str(this.attr(name) || ""), el = this;
                    if (names[name] == "colour") {
                        A = Snap.color(a);
                        B = Snap.color(b);
                        return {
                            from: [ A.r, A.g, A.b, A.opacity ],
                            to: [ B.r, B.g, B.b, B.opacity ],
                            f: getColour
                        };
                    }
                    if (name == "viewBox") {
                        A = this.attr(name).vb.split(" ").map(Number);
                        B = b.split(" ").map(Number);
                        return {
                            from: A,
                            to: B,
                            f: getViewBox
                        };
                    }
                    if (name == "transform" || name == "gradientTransform" || name == "patternTransform") {
                        if (typeof b == "string") b = Str(b).replace(/\.{3}|\u2026/g, a);
                        a = this.matrix;
                        if (!Snap._.rgTransform.test(b)) b = Snap._.transform2matrix(Snap._.svgTransform2string(b), this.getBBox()); else b = Snap._.transform2matrix(b, this.getBBox());
                        return equaliseTransform(a, b, (function() {
                            return el.getBBox(1);
                        }));
                    }
                    if (name == "d" || name == "path") {
                        A = Snap.path.toCubic(a, b);
                        return {
                            from: path2array(A[0]),
                            to: path2array(A[1]),
                            f: getPath(A[0])
                        };
                    }
                    if (name == "points") {
                        A = Str(a).split(Snap._.separator);
                        B = Str(b).split(Snap._.separator);
                        return {
                            from: A,
                            to: B,
                            f: function(val) {
                                return val;
                            }
                        };
                    }
                    if (isNumeric(a) && isNumeric(b)) return {
                        from: parseFloat(a),
                        to: parseFloat(b),
                        f: getNumber
                    };
                    var aUnit = a.match(reUnit), bUnit = Str(b).match(reUnit);
                    if (aUnit && arrayEqual(aUnit, bUnit)) return {
                        from: parseFloat(a),
                        to: parseFloat(b),
                        f: getUnit(aUnit)
                    }; else return {
                        from: this.asPX(name),
                        to: this.asPX(name, b),
                        f: getNumber
                    };
                }));
            }));
            Snap.plugin((function(Snap, Element, Paper, glob) {
                var elproto = Element.prototype, has = "hasOwnProperty", supportsTouch = "createTouch" in glob.doc, events = [ "click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel" ], touchMap = {
                    mousedown: "touchstart",
                    mousemove: "touchmove",
                    mouseup: "touchend"
                }, getScroll = function(xy, el) {
                    var name = xy == "y" ? "scrollTop" : "scrollLeft", doc = el && el.node ? el.node.ownerDocument : glob.doc;
                    return doc[name in doc.documentElement ? "documentElement" : "body"][name];
                }, preventTouch = function() {
                    return this.originalEvent.preventDefault();
                }, stopTouch = function() {
                    return this.originalEvent.stopPropagation();
                }, addEvent = function(obj, type, fn, element) {
                    var realName = supportsTouch && touchMap[type] ? touchMap[type] : type, f = function(e) {
                        var scrollY = getScroll("y", element), scrollX = getScroll("x", element);
                        if (supportsTouch && touchMap[has](type)) for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) if (e.targetTouches[i].target == obj || obj.contains(e.targetTouches[i].target)) {
                            var olde = e;
                            e = e.targetTouches[i];
                            e.originalEvent = olde;
                            e.preventDefault = preventTouch;
                            e.stopPropagation = stopTouch;
                            break;
                        }
                        var x = e.clientX + scrollX, y = e.clientY + scrollY;
                        return fn.call(element, e, x, y);
                    };
                    if (type !== realName) obj.addEventListener(type, f, false);
                    obj.addEventListener(realName, f, false);
                    return function() {
                        if (type !== realName) obj.removeEventListener(type, f, false);
                        obj.removeEventListener(realName, f, false);
                        return true;
                    };
                }, drag = [], dragMove = function(e) {
                    var dragi, x = e.clientX, y = e.clientY, scrollY = getScroll("y"), scrollX = getScroll("x"), j = drag.length;
                    while (j--) {
                        dragi = drag[j];
                        if (supportsTouch) {
                            var touch, i = e.touches && e.touches.length;
                            while (i--) {
                                touch = e.touches[i];
                                if (touch.identifier == dragi.el._drag.id || dragi.el.node.contains(touch.target)) {
                                    x = touch.clientX;
                                    y = touch.clientY;
                                    (e.originalEvent ? e.originalEvent : e).preventDefault();
                                    break;
                                }
                            }
                        } else e.preventDefault();
                        var node = dragi.el.node;
                        node.nextSibling, node.parentNode, node.style.display;
                        x += scrollX;
                        y += scrollY;
                        eve("snap.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
                    }
                }, dragUp = function(e) {
                    Snap.unmousemove(dragMove).unmouseup(dragUp);
                    var dragi, i = drag.length;
                    while (i--) {
                        dragi = drag[i];
                        dragi.el._drag = {};
                        eve("snap.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
                        eve.off("snap.drag.*." + dragi.el.id);
                    }
                    drag = [];
                };
                for (var i = events.length; i--; ) (function(eventName) {
                    Snap[eventName] = elproto[eventName] = function(fn, scope) {
                        if (Snap.is(fn, "function")) {
                            this.events = this.events || [];
                            this.events.push({
                                name: eventName,
                                f: fn,
                                unbind: addEvent(this.node || document, eventName, fn, scope || this)
                            });
                        } else for (var i = 0, ii = this.events.length; i < ii; i++) if (this.events[i].name == eventName) try {
                            this.events[i].f.call(this);
                        } catch (e) {}
                        return this;
                    };
                    Snap["un" + eventName] = elproto["un" + eventName] = function(fn) {
                        var events = this.events || [], l = events.length;
                        while (l--) if (events[l].name == eventName && (events[l].f == fn || !fn)) {
                            events[l].unbind();
                            events.splice(l, 1);
                            !events.length && delete this.events;
                            return this;
                        }
                        return this;
                    };
                })(events[i]);
                elproto.hover = function(f_in, f_out, scope_in, scope_out) {
                    return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
                };
                elproto.unhover = function(f_in, f_out) {
                    return this.unmouseover(f_in).unmouseout(f_out);
                };
                var draggable = [];
                elproto.drag = function(onmove, onstart, onend, move_scope, start_scope, end_scope) {
                    var el = this;
                    if (!arguments.length) {
                        var origTransform;
                        return el.drag((function(dx, dy) {
                            this.attr({
                                transform: origTransform + (origTransform ? "T" : "t") + [ dx, dy ]
                            });
                        }), (function() {
                            origTransform = this.transform().local;
                        }));
                    }
                    function start(e, x, y) {
                        (e.originalEvent || e).preventDefault();
                        el._drag.x = x;
                        el._drag.y = y;
                        el._drag.id = e.identifier;
                        !drag.length && Snap.mousemove(dragMove).mouseup(dragUp);
                        drag.push({
                            el,
                            move_scope,
                            start_scope,
                            end_scope
                        });
                        onstart && eve.on("snap.drag.start." + el.id, onstart);
                        onmove && eve.on("snap.drag.move." + el.id, onmove);
                        onend && eve.on("snap.drag.end." + el.id, onend);
                        eve("snap.drag.start." + el.id, start_scope || move_scope || el, x, y, e);
                    }
                    function init(e, x, y) {
                        eve("snap.draginit." + el.id, el, e, x, y);
                    }
                    eve.on("snap.draginit." + el.id, start);
                    el._drag = {};
                    draggable.push({
                        el,
                        start,
                        init
                    });
                    el.mousedown(init);
                    return el;
                };
                elproto.undrag = function() {
                    var i = draggable.length;
                    while (i--) if (draggable[i].el == this) {
                        this.unmousedown(draggable[i].init);
                        draggable.splice(i, 1);
                        eve.unbind("snap.drag.*." + this.id);
                        eve.unbind("snap.draginit." + this.id);
                    }
                    !draggable.length && Snap.unmousemove(dragMove).unmouseup(dragUp);
                    return this;
                };
            }));
            Snap.plugin((function(Snap, Element, Paper, glob) {
                Element.prototype;
                var pproto = Paper.prototype, rgurl = /^\s*url\((.+)\)/, Str = String, $ = Snap._.$;
                Snap.filter = {};
                pproto.filter = function(filstr) {
                    var paper = this;
                    if (paper.type != "svg") paper = paper.paper;
                    var f = Snap.parse(Str(filstr)), id = Snap._.id(), filter = (paper.node.offsetWidth, 
                    paper.node.offsetHeight, $("filter"));
                    $(filter, {
                        id,
                        filterUnits: "userSpaceOnUse"
                    });
                    filter.appendChild(f.node);
                    paper.defs.appendChild(filter);
                    return new Element(filter);
                };
                eve.on("snap.util.getattr.filter", (function() {
                    eve.stop();
                    var p = $(this.node, "filter");
                    if (p) {
                        var match = Str(p).match(rgurl);
                        return match && Snap.select(match[1]);
                    }
                }));
                eve.on("snap.util.attr.filter", (function(value) {
                    if (value instanceof Element && value.type == "filter") {
                        eve.stop();
                        var id = value.node.id;
                        if (!id) {
                            $(value.node, {
                                id: value.id
                            });
                            id = value.id;
                        }
                        $(this.node, {
                            filter: Snap.url(id)
                        });
                    }
                    if (!value || value == "none") {
                        eve.stop();
                        this.node.removeAttribute("filter");
                    }
                }));
                Snap.filter.blur = function(x, y) {
                    if (x == null) x = 2;
                    var def = y == null ? x : [ x, y ];
                    return Snap.format('<feGaussianBlur stdDeviation="{def}"/>', {
                        def
                    });
                };
                Snap.filter.blur.toString = function() {
                    return this();
                };
                Snap.filter.shadow = function(dx, dy, blur, color, opacity) {
                    if (opacity == null) if (color == null) {
                        opacity = blur;
                        blur = 4;
                        color = "#000";
                    } else {
                        opacity = color;
                        color = blur;
                        blur = 4;
                    }
                    if (blur == null) blur = 4;
                    if (opacity == null) opacity = 1;
                    if (dx == null) {
                        dx = 0;
                        dy = 2;
                    }
                    if (dy == null) dy = dx;
                    color = Snap.color(color);
                    return Snap.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>', {
                        color,
                        dx,
                        dy,
                        blur,
                        opacity
                    });
                };
                Snap.filter.shadow.toString = function() {
                    return this();
                };
                Snap.filter.grayscale = function(amount) {
                    if (amount == null) amount = 1;
                    return Snap.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>', {
                        a: .2126 + .7874 * (1 - amount),
                        b: .7152 - .7152 * (1 - amount),
                        c: .0722 - .0722 * (1 - amount),
                        d: .2126 - .2126 * (1 - amount),
                        e: .7152 + .2848 * (1 - amount),
                        f: .0722 - .0722 * (1 - amount),
                        g: .2126 - .2126 * (1 - amount),
                        h: .0722 + .9278 * (1 - amount)
                    });
                };
                Snap.filter.grayscale.toString = function() {
                    return this();
                };
                Snap.filter.sepia = function(amount) {
                    if (amount == null) amount = 1;
                    return Snap.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>', {
                        a: .393 + .607 * (1 - amount),
                        b: .769 - .769 * (1 - amount),
                        c: .189 - .189 * (1 - amount),
                        d: .349 - .349 * (1 - amount),
                        e: .686 + .314 * (1 - amount),
                        f: .168 - .168 * (1 - amount),
                        g: .272 - .272 * (1 - amount),
                        h: .534 - .534 * (1 - amount),
                        i: .131 + .869 * (1 - amount)
                    });
                };
                Snap.filter.sepia.toString = function() {
                    return this();
                };
                Snap.filter.saturate = function(amount) {
                    if (amount == null) amount = 1;
                    return Snap.format('<feColorMatrix type="saturate" values="{amount}"/>', {
                        amount: 1 - amount
                    });
                };
                Snap.filter.saturate.toString = function() {
                    return this();
                };
                Snap.filter.hueRotate = function(angle) {
                    angle = angle || 0;
                    return Snap.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {
                        angle
                    });
                };
                Snap.filter.hueRotate.toString = function() {
                    return this();
                };
                Snap.filter.invert = function(amount) {
                    if (amount == null) amount = 1;
                    return Snap.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>', {
                        amount,
                        amount2: 1 - amount
                    });
                };
                Snap.filter.invert.toString = function() {
                    return this();
                };
                Snap.filter.brightness = function(amount) {
                    if (amount == null) amount = 1;
                    return Snap.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>', {
                        amount
                    });
                };
                Snap.filter.brightness.toString = function() {
                    return this();
                };
                Snap.filter.contrast = function(amount) {
                    if (amount == null) amount = 1;
                    return Snap.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>', {
                        amount,
                        amount2: .5 - amount / 2
                    });
                };
                Snap.filter.contrast.toString = function() {
                    return this();
                };
            }));
            Snap.plugin((function(Snap, Element, Paper, glob, Fragment) {
                var box = Snap._.box, is = Snap.is, firstLetter = /^[^a-z]*([tbmlrc])/i, toString = function() {
                    return "T" + this.dx + "," + this.dy;
                };
                Element.prototype.getAlign = function(el, way) {
                    if (way == null && is(el, "string")) {
                        way = el;
                        el = null;
                    }
                    el = el || this.paper;
                    var bx = el.getBBox ? el.getBBox() : box(el), bb = this.getBBox(), out = {};
                    way = way && way.match(firstLetter);
                    way = way ? way[1].toLowerCase() : "c";
                    switch (way) {
                      case "t":
                        out.dx = 0;
                        out.dy = bx.y - bb.y;
                        break;

                      case "b":
                        out.dx = 0;
                        out.dy = bx.y2 - bb.y2;
                        break;

                      case "m":
                        out.dx = 0;
                        out.dy = bx.cy - bb.cy;
                        break;

                      case "l":
                        out.dx = bx.x - bb.x;
                        out.dy = 0;
                        break;

                      case "r":
                        out.dx = bx.x2 - bb.x2;
                        out.dy = 0;
                        break;

                      default:
                        out.dx = bx.cx - bb.cx;
                        out.dy = 0;
                        break;
                    }
                    out.toString = toString;
                    return out;
                };
                Element.prototype.align = function(el, way) {
                    return this.transform("..." + this.getAlign(el, way));
                };
            }));
            Snap.plugin((function(Snap, Element, Paper, glob, Fragment) {
                var elproto = Element.prototype, is = Snap.is, Str = String, has = "hasOwnProperty";
                function slice(from, to, f) {
                    return function(arr) {
                        var res = arr.slice(from, to);
                        if (res.length == 1) res = res[0];
                        return f ? f(res) : res;
                    };
                }
                var Animation = function(attr, ms, easing, callback) {
                    if (typeof easing == "function" && !easing.length) {
                        callback = easing;
                        easing = mina.linear;
                    }
                    this.attr = attr;
                    this.dur = ms;
                    easing && (this.easing = easing);
                    callback && (this.callback = callback);
                };
                Snap._.Animation = Animation;
                Snap.animation = function(attr, ms, easing, callback) {
                    return new Animation(attr, ms, easing, callback);
                };
                elproto.inAnim = function() {
                    var el = this, res = [];
                    for (var id in el.anims) if (el.anims[has](id)) (function(a) {
                        res.push({
                            anim: new Animation(a._attrs, a.dur, a.easing, a._callback),
                            mina: a,
                            curStatus: a.status(),
                            status: function(val) {
                                return a.status(val);
                            },
                            stop: function() {
                                a.stop();
                            }
                        });
                    })(el.anims[id]);
                    return res;
                };
                Snap.animate = function(from, to, setter, ms, easing, callback) {
                    if (typeof easing == "function" && !easing.length) {
                        callback = easing;
                        easing = mina.linear;
                    }
                    var now = mina.time(), anim = mina(from, to, now, now + ms, mina.time, setter, easing);
                    callback && eve.once("mina.finish." + anim.id, callback);
                    return anim;
                };
                elproto.stop = function() {
                    var anims = this.inAnim();
                    for (var i = 0, ii = anims.length; i < ii; i++) anims[i].stop();
                    return this;
                };
                elproto.animate = function(attrs, ms, easing, callback) {
                    if (typeof easing == "function" && !easing.length) {
                        callback = easing;
                        easing = mina.linear;
                    }
                    if (attrs instanceof Animation) {
                        callback = attrs.callback;
                        easing = attrs.easing;
                        ms = attrs.dur;
                        attrs = attrs.attr;
                    }
                    var from, to, f, eq, fkeys = [], tkeys = [], keys = {}, el = this;
                    for (var key in attrs) if (attrs[has](key)) {
                        if (el.equal) {
                            eq = el.equal(key, Str(attrs[key]));
                            from = eq.from;
                            to = eq.to;
                            f = eq.f;
                        } else {
                            from = +el.attr(key);
                            to = +attrs[key];
                        }
                        var len = is(from, "array") ? from.length : 1;
                        keys[key] = slice(fkeys.length, fkeys.length + len, f);
                        fkeys = fkeys.concat(from);
                        tkeys = tkeys.concat(to);
                    }
                    var now = mina.time(), anim = mina(fkeys, tkeys, now, now + ms, mina.time, (function(val) {
                        var attr = {};
                        for (var key in keys) if (keys[has](key)) attr[key] = keys[key](val);
                        el.attr(attr);
                    }), easing);
                    el.anims[anim.id] = anim;
                    anim._attrs = attrs;
                    anim._callback = callback;
                    eve("snap.animcreated." + el.id, anim);
                    eve.once("mina.finish." + anim.id, (function() {
                        eve.off("mina.*." + anim.id);
                        delete el.anims[anim.id];
                        callback && callback.call(el);
                    }));
                    eve.once("mina.stop." + anim.id, (function() {
                        eve.off("mina.*." + anim.id);
                        delete el.anims[anim.id];
                    }));
                    return el;
                };
            }));
            Snap.plugin((function(Snap, Element, Paper, glob) {
                var red = "#ffebee#ffcdd2#ef9a9a#e57373#ef5350#f44336#e53935#d32f2f#c62828#b71c1c#ff8a80#ff5252#ff1744#d50000", pink = "#FCE4EC#F8BBD0#F48FB1#F06292#EC407A#E91E63#D81B60#C2185B#AD1457#880E4F#FF80AB#FF4081#F50057#C51162", purple = "#F3E5F5#E1BEE7#CE93D8#BA68C8#AB47BC#9C27B0#8E24AA#7B1FA2#6A1B9A#4A148C#EA80FC#E040FB#D500F9#AA00FF", deeppurple = "#EDE7F6#D1C4E9#B39DDB#9575CD#7E57C2#673AB7#5E35B1#512DA8#4527A0#311B92#B388FF#7C4DFF#651FFF#6200EA", indigo = "#E8EAF6#C5CAE9#9FA8DA#7986CB#5C6BC0#3F51B5#3949AB#303F9F#283593#1A237E#8C9EFF#536DFE#3D5AFE#304FFE", blue = "#E3F2FD#BBDEFB#90CAF9#64B5F6#64B5F6#2196F3#1E88E5#1976D2#1565C0#0D47A1#82B1FF#448AFF#2979FF#2962FF", lightblue = "#E1F5FE#B3E5FC#81D4FA#4FC3F7#29B6F6#03A9F4#039BE5#0288D1#0277BD#01579B#80D8FF#40C4FF#00B0FF#0091EA", cyan = "#E0F7FA#B2EBF2#80DEEA#4DD0E1#26C6DA#00BCD4#00ACC1#0097A7#00838F#006064#84FFFF#18FFFF#00E5FF#00B8D4", teal = "#E0F2F1#B2DFDB#80CBC4#4DB6AC#26A69A#009688#00897B#00796B#00695C#004D40#A7FFEB#64FFDA#1DE9B6#00BFA5", green = "#E8F5E9#C8E6C9#A5D6A7#81C784#66BB6A#4CAF50#43A047#388E3C#2E7D32#1B5E20#B9F6CA#69F0AE#00E676#00C853", lightgreen = "#F1F8E9#DCEDC8#C5E1A5#AED581#9CCC65#8BC34A#7CB342#689F38#558B2F#33691E#CCFF90#B2FF59#76FF03#64DD17", lime = "#F9FBE7#F0F4C3#E6EE9C#DCE775#D4E157#CDDC39#C0CA33#AFB42B#9E9D24#827717#F4FF81#EEFF41#C6FF00#AEEA00", yellow = "#FFFDE7#FFF9C4#FFF59D#FFF176#FFEE58#FFEB3B#FDD835#FBC02D#F9A825#F57F17#FFFF8D#FFFF00#FFEA00#FFD600", amber = "#FFF8E1#FFECB3#FFE082#FFD54F#FFCA28#FFC107#FFB300#FFA000#FF8F00#FF6F00#FFE57F#FFD740#FFC400#FFAB00", orange = "#FFF3E0#FFE0B2#FFCC80#FFB74D#FFA726#FF9800#FB8C00#F57C00#EF6C00#E65100#FFD180#FFAB40#FF9100#FF6D00", deeporange = "#FBE9E7#FFCCBC#FFAB91#FF8A65#FF7043#FF5722#F4511E#E64A19#D84315#BF360C#FF9E80#FF6E40#FF3D00#DD2C00", brown = "#EFEBE9#D7CCC8#BCAAA4#A1887F#8D6E63#795548#6D4C41#5D4037#4E342E#3E2723", grey = "#FAFAFA#F5F5F5#EEEEEE#E0E0E0#BDBDBD#9E9E9E#757575#616161#424242#212121", bluegrey = "#ECEFF1#CFD8DC#B0BEC5#90A4AE#78909C#607D8B#546E7A#455A64#37474F#263238";
                Snap.mui = {};
                Snap.flat = {};
                function saveColor(colors) {
                    colors = colors.split(/(?=#)/);
                    var color = new String(colors[5]);
                    color[50] = colors[0];
                    color[100] = colors[1];
                    color[200] = colors[2];
                    color[300] = colors[3];
                    color[400] = colors[4];
                    color[500] = colors[5];
                    color[600] = colors[6];
                    color[700] = colors[7];
                    color[800] = colors[8];
                    color[900] = colors[9];
                    if (colors[10]) {
                        color.A100 = colors[10];
                        color.A200 = colors[11];
                        color.A400 = colors[12];
                        color.A700 = colors[13];
                    }
                    return color;
                }
                Snap.mui.red = saveColor(red);
                Snap.mui.pink = saveColor(pink);
                Snap.mui.purple = saveColor(purple);
                Snap.mui.deeppurple = saveColor(deeppurple);
                Snap.mui.indigo = saveColor(indigo);
                Snap.mui.blue = saveColor(blue);
                Snap.mui.lightblue = saveColor(lightblue);
                Snap.mui.cyan = saveColor(cyan);
                Snap.mui.teal = saveColor(teal);
                Snap.mui.green = saveColor(green);
                Snap.mui.lightgreen = saveColor(lightgreen);
                Snap.mui.lime = saveColor(lime);
                Snap.mui.yellow = saveColor(yellow);
                Snap.mui.amber = saveColor(amber);
                Snap.mui.orange = saveColor(orange);
                Snap.mui.deeporange = saveColor(deeporange);
                Snap.mui.brown = saveColor(brown);
                Snap.mui.grey = saveColor(grey);
                Snap.mui.bluegrey = saveColor(bluegrey);
                Snap.flat.turquoise = "#1abc9c";
                Snap.flat.greensea = "#16a085";
                Snap.flat.sunflower = "#f1c40f";
                Snap.flat.orange = "#f39c12";
                Snap.flat.emerland = "#2ecc71";
                Snap.flat.nephritis = "#27ae60";
                Snap.flat.carrot = "#e67e22";
                Snap.flat.pumpkin = "#d35400";
                Snap.flat.peterriver = "#3498db";
                Snap.flat.belizehole = "#2980b9";
                Snap.flat.alizarin = "#e74c3c";
                Snap.flat.pomegranate = "#c0392b";
                Snap.flat.amethyst = "#9b59b6";
                Snap.flat.wisteria = "#8e44ad";
                Snap.flat.clouds = "#ecf0f1";
                Snap.flat.silver = "#bdc3c7";
                Snap.flat.wetasphalt = "#34495e";
                Snap.flat.midnightblue = "#2c3e50";
                Snap.flat.concrete = "#95a5a6";
                Snap.flat.asbestos = "#7f8c8d";
                Snap.importMUIColors = function() {
                    for (var color in Snap.mui) if (Snap.mui.hasOwnProperty(color)) window[color] = Snap.mui[color];
                };
            }));
            module.exports = Snap;
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        var react = __webpack_require__(294);
        var client = __webpack_require__(745);
        const SignUpPopup = ({setOpen}) => react.createElement(react.Fragment, null, react.createElement("div", {
            className: "signUpPopup"
        }, react.createElement("span", {
            className: "signUpPopup__text"
        }, "Sign up for free newsletters and get more Green Olives delivered to your inbox"), react.createElement("button", {
            className: "signUpPopup__button",
            type: "button",
            onClick: () => setOpen(false)
        }, react.createElement("img", {
            src: "img/header&main/closeBtn.svg",
            alt: "close button"
        }))));
        const popup_SignUpPopup = SignUpPopup;
        var BurgerMenu = __webpack_require__(190);
        const Header = () => {
            const [isOpen, setIsOpen] = (0, react.useState)(false);
            const scrollLock = () => {
                const html = document.querySelector("html");
                setIsOpen(!isOpen);
                isOpen ? html.classList.add("lock") : html.classList.remove("lock");
            };
            return react.createElement(react.Fragment, null, react.createElement("div", {
                className: "header"
            }, react.createElement(BurgerMenu.slide, {
                onStateChange: scrollLock
            }, react.createElement("a", {
                id: "who",
                className: "menu-item",
                href: "/"
            }, "Who we are"), react.createElement("a", {
                id: "what",
                className: "menu-item",
                href: "/"
            }, "What we do"), react.createElement("a", {
                id: "product",
                className: "menu-item",
                href: "/about"
            }, "The product"), react.createElement("a", {
                id: "health",
                className: "menu-item",
                href: "/health"
            }, "Health"), react.createElement("a", {
                id: "contact",
                className: "menu-item",
                href: "/contact"
            }, "Contact us"), react.createElement("button", {
                type: "button",
                className: "menu__button_mob"
            }, react.createElement("span", null, "LET’S DO BUSINESS"))), react.createElement("div", {
                className: "header__container"
            }, react.createElement("div", {
                className: "header__menu menu"
            }, react.createElement("div", {
                className: "menu__logo"
            }, react.createElement("a", {
                href: "#"
            }, react.createElement("img", {
                src: "img/header&main/logo.svg",
                alt: "logo"
            }))), react.createElement("nav", {
                className: "menu__body"
            }, react.createElement("ul", {
                className: "menu__list"
            }, react.createElement("li", {
                className: "menu__item"
            }, react.createElement("a", {
                href: "#",
                className: "menu__link"
            }, "Who we are")), react.createElement("li", {
                className: "menu__item"
            }, react.createElement("a", {
                href: "#",
                className: "menu__link"
            }, "What we do")), react.createElement("li", {
                className: "menu__item"
            }, react.createElement("a", {
                href: "#",
                className: "menu__link"
            }, "The product")), react.createElement("li", {
                className: "menu__item"
            }, react.createElement("a", {
                href: "#",
                className: "menu__link"
            }, "Health")), react.createElement("li", {
                className: "menu__item"
            }, react.createElement("a", {
                href: "#",
                className: "menu__link"
            }, "Contact us")))), react.createElement("button", {
                type: "button",
                className: "menu__button"
            }, react.createElement("span", null, "LET’S DO BUSINESS"))))));
        };
        const header_Header = Header;
        const Main = ({clazz}) => react.createElement(react.Fragment, null, react.createElement("section", {
            className: "main"
        }, react.createElement("section", {
            className: "hero"
        }, react.createElement("div", {
            className: "hero__container"
        }, react.createElement("div", {
            className: "hero__text"
        }, react.createElement("div", {
            className: "hero__label"
        }, "natural product"), react.createElement("h1", {
            className: "hero__title"
        }, react.createElement("span", null, "Let’s do business"), " together!"), react.createElement("p", {
            className: "hero__description"
        }, "It is a long established fact that a reader ", react.createElement("br", null), " will be distracted by the readable content of a pag when looking at its layout."))))));
        const main_Main = Main;
        const Title = ({title}) => react.createElement(react.Fragment, null, react.createElement("h2", {
            className: "who-text__title"
        }, title));
        const title_Title = Title;
        const SectionTemplate = ({folder, img, title, p, clazz}) => react.createElement(react.Fragment, null, react.createElement("section", {
            className: `${clazz}`
        }, react.createElement("div", {
            className: `${clazz}__container`
        }, react.createElement("div", {
            className: `${clazz}-section`
        }, react.createElement("div", {
            className: `${clazz}-section__image`
        }, react.createElement("img", {
            src: `img/${folder}/${img}`,
            alt: "img"
        })), react.createElement("div", {
            className: `${clazz}-section__text ${clazz}-text`
        }, react.createElement(title_Title, {
            title
        }), react.createElement("p", {
            className: `${clazz}-text__paragraph`
        }, p), react.createElement("a", {
            href: "#",
            className: `${clazz}-text__link`
        }, react.createElement("span", null, "READ MORE")))))));
        const SectionTemplate_SectionTemplate = SectionTemplate;
        const WhatWeDo = () => react.createElement(react.Fragment, null, react.createElement("div", {
            className: "whoWeDo"
        }, react.createElement("div", {
            className: "whoWeDo__container"
        }, react.createElement("div", {
            className: "whoWeDo__title"
        }, "WHAT WE DO"), react.createElement("div", {
            className: "whoWeDo__video"
        }, react.createElement("video", {
            controls: true,
            src: "img/whatWeDo/oilVideo.mp4"
        })))));
        const whatWeDo_WhatWeDo = WhatWeDo;
        const HealthBanner = () => react.createElement(react.Fragment, null, react.createElement("section", {
            className: "health-bunner"
        }, react.createElement("div", {
            className: "health-bunner__container"
        }, react.createElement("div", {
            className: "health-bunner__text"
        }, react.createElement("h2", {
            className: "health-bunner__title"
        }, '"Health is wealth, ', react.createElement("br", null), ' it is always better when it is natural"'), react.createElement("a", {
            href: "#",
            className: "health-bunner__link"
        }, "@crestodina")), react.createElement("a", {
            href: "#",
            className: "health-bunner__readmore"
        }, "READ MORE"))));
        const healthBanner_HealthBanner = HealthBanner;
        const LetsBusiness = () => react.createElement(react.Fragment, null, react.createElement("section", {
            className: "business"
        }, react.createElement("div", {
            className: "business__container"
        }, react.createElement("div", {
            className: "business__content"
        }, react.createElement("div", {
            className: "business__text"
        }, react.createElement("p", {
            className: "business__label"
        }, "natural product"), react.createElement("h2", {
            className: "business__title"
        }, react.createElement("span", null, "Let’s do business"), " together!"), react.createElement("p", {
            className: "business__description"
        }, react.createElement("span", null, "It is a long established fact that a reader ", react.createElement("br", null), " will be distracted by the readable content of a pag when looking at its layout.")), react.createElement("button", {
            type: "button",
            className: "business__button"
        }, react.createElement("span", null, "CONTACT US")))))));
        const letsBusiness_LetsBusiness = LetsBusiness;
        const Footer = () => react.createElement(react.Fragment, null, react.createElement("footer", {
            className: "footer"
        }, react.createElement("div", {
            className: "footer__container"
        }, react.createElement("div", {
            className: "footer-top"
        }, react.createElement("div", {
            className: "footer-top__columns"
        }, react.createElement("div", {
            className: "footer-top__column"
        }, react.createElement("a", {
            href: "#",
            className: "footer-top__link"
        }, react.createElement("span", null, "Subscribe to LOGO PRO")), react.createElement("a", {
            href: "#",
            className: "footer-top__link"
        }, react.createElement("span", null, "Digital Products")), react.createElement("a", {
            href: "#",
            className: "footer-top__link"
        }, react.createElement("span", null, "Corrections")), react.createElement("a", {
            href: "#",
            className: "footer-top__link"
        }, react.createElement("span", null, "Licensing & Reprints")), react.createElement("a", {
            href: "#",
            className: "footer-top__link"
        }, react.createElement("span", null, "Site Map")), react.createElement("a", {
            href: "#",
            className: "footer-top__link"
        }, react.createElement("span", null, "Help"))), react.createElement("div", {
            className: "footer-top__column"
        }, react.createElement("a", {
            href: "#",
            className: "footer-top__link"
        }, react.createElement("span", null, "News Releases")), react.createElement("a", {
            href: "#",
            className: "footer-top__link"
        }, react.createElement("span", null, "Advertise With Us")), react.createElement("a", {
            href: "#",
            className: "footer-top__link"
        }, react.createElement("span", null, "AdChoices")), react.createElement("a", {
            href: "#",
            className: "footer-top__link"
        }, react.createElement("span", null, "Careers")), react.createElement("a", {
            href: "#",
            className: "footer-top__link"
        }, react.createElement("span", null, "About LOGO")), react.createElement("a", {
            href: "#",
            className: "footer-top__link"
        }, react.createElement("span", null, "Contact"))), react.createElement("div", {
            className: "footer-top__column"
        }, react.createElement("h3", {
            className: "footer-top__title"
        }, react.createElement("span", null, "News Tips")), react.createElement("p", {
            className: "footer-top__text"
        }, "Got a confidential news tip? We want to hear from you."), react.createElement("button", {
            type: "button",
            className: "footer-top__button"
        }, react.createElement("span", null, "GET IN TOUCH"))), react.createElement("div", {
            className: "footer-top__column"
        }, react.createElement("h3", {
            className: "footer-top__title"
        }, react.createElement("span", null, "LOGO Newsletters")), react.createElement("p", {
            className: "footer-top__text"
        }, react.createElement("span", null, "Sign Up for free newsletters and get more LOGO delivered to your inbox")), react.createElement("button", {
            type: "button",
            className: "footer-top__button"
        }, react.createElement("span", null, "SIGN UP NOW")), react.createElement("p", {
            className: "footer-top__text_s"
        }, react.createElement("span", null, "Get this delivered to your inbox, and more info about oue products and services")))), react.createElement("p", {
            className: "footer-top__data"
        }, react.createElement("span", null, "Data is a real-time snapshot *Data is delayed at least 15 minutes. Global Olives and Natural product, Market and Analysis.")))), react.createElement("div", {
            className: "footer-bottom"
        }, react.createElement("div", {
            className: "footer-bottom__wrapper"
        }, react.createElement("div", {
            className: "footer-bottom__terms"
        }, react.createElement("div", {
            href: "#",
            className: "footer-bottom__item"
        }, react.createElement("span", null, react.createElement("a", {
            className: "footer-bottom__link_1",
            href: "#"
        }, "Privacy Policy")), " /", react.createElement("span", null, react.createElement("a", {
            className: "footer-bottom__link_2",
            href: "#"
        }, " Personal Information")), " /", react.createElement("span", null, react.createElement("a", {
            className: "footer-bottom__link_3",
            href: "#"
        }, " Terms of Service")))), react.createElement("div", {
            className: "footer-bottom__logo"
        }, react.createElement("img", {
            src: "img/footer/logo.png",
            alt: "logo"
        })), react.createElement("div", {
            className: "footer-bottom__social"
        }, react.createElement("div", {
            className: "footer-bottom__olives"
        }, react.createElement("span", null, "2024 Green olives")), react.createElement("div", {
            className: "footer-bottom__inst"
        }, react.createElement("img", {
            src: "img/footer/inst.svg",
            alt: "fb"
        })), react.createElement("div", {
            className: "footer-bottom__fb"
        }, react.createElement("img", {
            src: "img/footer/fb.svg",
            alt: "fb"
        })))))));
        const footer_Footer = Footer;
        var __defProp = Object.defineProperty;
        var __export = (target, all) => {
            for (var name in all) __defProp(target, name, {
                get: all[name],
                enumerable: true
            });
        };
        var globals_exports = {};
        __export(globals_exports, {
            assign: () => react_spring_shared_modern_assign,
            colors: () => colors,
            createStringInterpolator: () => createStringInterpolator,
            skipAnimation: () => skipAnimation,
            to: () => to,
            willAdvance: () => willAdvance
        });
        var updateQueue = makeQueue();
        var raf = fn => schedule(fn, updateQueue);
        var writeQueue = makeQueue();
        raf.write = fn => schedule(fn, writeQueue);
        var onStartQueue = makeQueue();
        raf.onStart = fn => schedule(fn, onStartQueue);
        var onFrameQueue = makeQueue();
        raf.onFrame = fn => schedule(fn, onFrameQueue);
        var onFinishQueue = makeQueue();
        raf.onFinish = fn => schedule(fn, onFinishQueue);
        var timeouts = [];
        raf.setTimeout = (handler, ms) => {
            const time = raf.now() + ms;
            const cancel = () => {
                const i = timeouts.findIndex((t => t.cancel == cancel));
                if (~i) timeouts.splice(i, 1);
                pendingCount -= ~i ? 1 : 0;
            };
            const timeout = {
                time,
                handler,
                cancel
            };
            timeouts.splice(findTimeout(time), 0, timeout);
            pendingCount += 1;
            start();
            return timeout;
        };
        var findTimeout = time => ~(~timeouts.findIndex((t => t.time > time)) || ~timeouts.length);
        raf.cancel = fn => {
            onStartQueue.delete(fn);
            onFrameQueue.delete(fn);
            onFinishQueue.delete(fn);
            updateQueue.delete(fn);
            writeQueue.delete(fn);
        };
        raf.sync = fn => {
            sync = true;
            raf.batchedUpdates(fn);
            sync = false;
        };
        raf.throttle = fn => {
            let lastArgs;
            function queuedFn() {
                try {
                    fn(...lastArgs);
                } finally {
                    lastArgs = null;
                }
            }
            function throttled(...args) {
                lastArgs = args;
                raf.onStart(queuedFn);
            }
            throttled.handler = fn;
            throttled.cancel = () => {
                onStartQueue.delete(queuedFn);
                lastArgs = null;
            };
            return throttled;
        };
        var nativeRaf = typeof window != "undefined" ? window.requestAnimationFrame : () => {};
        raf.use = impl => nativeRaf = impl;
        raf.now = typeof performance != "undefined" ? () => performance.now() : Date.now;
        raf.batchedUpdates = fn => fn();
        raf.catch = console.error;
        raf.frameLoop = "always";
        raf.advance = () => {
            if (raf.frameLoop !== "demand") console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand"); else update();
        };
        var ts = -1;
        var pendingCount = 0;
        var sync = false;
        function schedule(fn, queue) {
            if (sync) {
                queue.delete(fn);
                fn(0);
            } else {
                queue.add(fn);
                start();
            }
        }
        function start() {
            if (ts < 0) {
                ts = 0;
                if (raf.frameLoop !== "demand") nativeRaf(loop);
            }
        }
        function stop() {
            ts = -1;
        }
        function loop() {
            if (~ts) {
                nativeRaf(loop);
                raf.batchedUpdates(update);
            }
        }
        function update() {
            const prevTs = ts;
            ts = raf.now();
            const count = findTimeout(ts);
            if (count) {
                eachSafely(timeouts.splice(0, count), (t => t.handler()));
                pendingCount -= count;
            }
            if (!pendingCount) {
                stop();
                return;
            }
            onStartQueue.flush();
            updateQueue.flush(prevTs ? Math.min(64, ts - prevTs) : 16.667);
            onFrameQueue.flush();
            writeQueue.flush();
            onFinishQueue.flush();
        }
        function makeQueue() {
            let next = new Set;
            let current = next;
            return {
                add(fn) {
                    pendingCount += current == next && !next.has(fn) ? 1 : 0;
                    next.add(fn);
                },
                delete(fn) {
                    pendingCount -= current == next && next.has(fn) ? 1 : 0;
                    return next.delete(fn);
                },
                flush(arg) {
                    if (current.size) {
                        next = new Set;
                        pendingCount -= current.size;
                        eachSafely(current, (fn => fn(arg) && next.add(fn)));
                        pendingCount += next.size;
                        current = next;
                    }
                }
            };
        }
        function eachSafely(values, each2) {
            values.forEach((value => {
                try {
                    each2(value);
                } catch (e) {
                    raf.catch(e);
                }
            }));
        }
        function noop() {}
        var defineHidden = (obj, key, value) => Object.defineProperty(obj, key, {
            value,
            writable: true,
            configurable: true
        });
        var is = {
            arr: Array.isArray,
            obj: a => !!a && a.constructor.name === "Object",
            fun: a => typeof a === "function",
            str: a => typeof a === "string",
            num: a => typeof a === "number",
            und: a => a === void 0
        };
        function isEqual(a, b) {
            if (is.arr(a)) {
                if (!is.arr(b) || a.length !== b.length) return false;
                for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
                return true;
            }
            return a === b;
        }
        var react_spring_shared_modern_each = (obj, fn) => obj.forEach(fn);
        function eachProp(obj, fn, ctx) {
            if (is.arr(obj)) {
                for (let i = 0; i < obj.length; i++) fn.call(ctx, obj[i], `${i}`);
                return;
            }
            for (const key in obj) if (obj.hasOwnProperty(key)) fn.call(ctx, obj[key], key);
        }
        var toArray = a => is.und(a) ? [] : is.arr(a) ? a : [ a ];
        function flush(queue, iterator) {
            if (queue.size) {
                const items = Array.from(queue);
                queue.clear();
                react_spring_shared_modern_each(items, iterator);
            }
        }
        var flushCalls = (queue, ...args) => flush(queue, (fn => fn(...args)));
        var isSSR = () => typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
        var createStringInterpolator;
        var to;
        var colors = null;
        var skipAnimation = false;
        var willAdvance = noop;
        var react_spring_shared_modern_assign = globals => {
            if (globals.to) to = globals.to;
            if (globals.now) raf.now = globals.now;
            if (globals.colors !== void 0) colors = globals.colors;
            if (globals.skipAnimation != null) skipAnimation = globals.skipAnimation;
            if (globals.createStringInterpolator) createStringInterpolator = globals.createStringInterpolator;
            if (globals.requestAnimationFrame) raf.use(globals.requestAnimationFrame);
            if (globals.batchedUpdates) raf.batchedUpdates = globals.batchedUpdates;
            if (globals.willAdvance) willAdvance = globals.willAdvance;
            if (globals.frameLoop) raf.frameLoop = globals.frameLoop;
        };
        var startQueue = new Set;
        var currentFrame = [];
        var prevFrame = [];
        var priority = 0;
        var frameLoop = {
            get idle() {
                return !startQueue.size && !currentFrame.length;
            },
            start(animation) {
                if (priority > animation.priority) {
                    startQueue.add(animation);
                    raf.onStart(flushStartQueue);
                } else {
                    startSafely(animation);
                    raf(advance);
                }
            },
            advance,
            sort(animation) {
                if (priority) raf.onFrame((() => frameLoop.sort(animation))); else {
                    const prevIndex = currentFrame.indexOf(animation);
                    if (~prevIndex) {
                        currentFrame.splice(prevIndex, 1);
                        startUnsafely(animation);
                    }
                }
            },
            clear() {
                currentFrame = [];
                startQueue.clear();
            }
        };
        function flushStartQueue() {
            startQueue.forEach(startSafely);
            startQueue.clear();
            raf(advance);
        }
        function startSafely(animation) {
            if (!currentFrame.includes(animation)) startUnsafely(animation);
        }
        function startUnsafely(animation) {
            currentFrame.splice(findIndex(currentFrame, (other => other.priority > animation.priority)), 0, animation);
        }
        function advance(dt) {
            const nextFrame = prevFrame;
            for (let i = 0; i < currentFrame.length; i++) {
                const animation = currentFrame[i];
                priority = animation.priority;
                if (!animation.idle) {
                    willAdvance(animation);
                    animation.advance(dt);
                    if (!animation.idle) nextFrame.push(animation);
                }
            }
            priority = 0;
            prevFrame = currentFrame;
            prevFrame.length = 0;
            currentFrame = nextFrame;
            return currentFrame.length > 0;
        }
        function findIndex(arr, test) {
            const index = arr.findIndex(test);
            return index < 0 ? arr.length : index;
        }
        var clamp = (min, max, v) => Math.min(Math.max(v, min), max);
        var colors2 = {
            transparent: 0,
            aliceblue: 4042850303,
            antiquewhite: 4209760255,
            aqua: 16777215,
            aquamarine: 2147472639,
            azure: 4043309055,
            beige: 4126530815,
            bisque: 4293182719,
            black: 255,
            blanchedalmond: 4293643775,
            blue: 65535,
            blueviolet: 2318131967,
            brown: 2771004159,
            burlywood: 3736635391,
            burntsienna: 3934150143,
            cadetblue: 1604231423,
            chartreuse: 2147418367,
            chocolate: 3530104575,
            coral: 4286533887,
            cornflowerblue: 1687547391,
            cornsilk: 4294499583,
            crimson: 3692313855,
            cyan: 16777215,
            darkblue: 35839,
            darkcyan: 9145343,
            darkgoldenrod: 3095792639,
            darkgray: 2846468607,
            darkgreen: 6553855,
            darkgrey: 2846468607,
            darkkhaki: 3182914559,
            darkmagenta: 2332068863,
            darkolivegreen: 1433087999,
            darkorange: 4287365375,
            darkorchid: 2570243327,
            darkred: 2332033279,
            darksalmon: 3918953215,
            darkseagreen: 2411499519,
            darkslateblue: 1211993087,
            darkslategray: 793726975,
            darkslategrey: 793726975,
            darkturquoise: 13554175,
            darkviolet: 2483082239,
            deeppink: 4279538687,
            deepskyblue: 12582911,
            dimgray: 1768516095,
            dimgrey: 1768516095,
            dodgerblue: 512819199,
            firebrick: 2988581631,
            floralwhite: 4294635775,
            forestgreen: 579543807,
            fuchsia: 4278255615,
            gainsboro: 3705462015,
            ghostwhite: 4177068031,
            gold: 4292280575,
            goldenrod: 3668254975,
            gray: 2155905279,
            green: 8388863,
            greenyellow: 2919182335,
            grey: 2155905279,
            honeydew: 4043305215,
            hotpink: 4285117695,
            indianred: 3445382399,
            indigo: 1258324735,
            ivory: 4294963455,
            khaki: 4041641215,
            lavender: 3873897215,
            lavenderblush: 4293981695,
            lawngreen: 2096890111,
            lemonchiffon: 4294626815,
            lightblue: 2916673279,
            lightcoral: 4034953471,
            lightcyan: 3774873599,
            lightgoldenrodyellow: 4210742015,
            lightgray: 3553874943,
            lightgreen: 2431553791,
            lightgrey: 3553874943,
            lightpink: 4290167295,
            lightsalmon: 4288707327,
            lightseagreen: 548580095,
            lightskyblue: 2278488831,
            lightslategray: 2005441023,
            lightslategrey: 2005441023,
            lightsteelblue: 2965692159,
            lightyellow: 4294959359,
            lime: 16711935,
            limegreen: 852308735,
            linen: 4210091775,
            magenta: 4278255615,
            maroon: 2147483903,
            mediumaquamarine: 1724754687,
            mediumblue: 52735,
            mediumorchid: 3126187007,
            mediumpurple: 2473647103,
            mediumseagreen: 1018393087,
            mediumslateblue: 2070474495,
            mediumspringgreen: 16423679,
            mediumturquoise: 1221709055,
            mediumvioletred: 3340076543,
            midnightblue: 421097727,
            mintcream: 4127193855,
            mistyrose: 4293190143,
            moccasin: 4293178879,
            navajowhite: 4292783615,
            navy: 33023,
            oldlace: 4260751103,
            olive: 2155872511,
            olivedrab: 1804477439,
            orange: 4289003775,
            orangered: 4282712319,
            orchid: 3664828159,
            palegoldenrod: 4008225535,
            palegreen: 2566625535,
            paleturquoise: 2951671551,
            palevioletred: 3681588223,
            papayawhip: 4293907967,
            peachpuff: 4292524543,
            peru: 3448061951,
            pink: 4290825215,
            plum: 3718307327,
            powderblue: 2967529215,
            purple: 2147516671,
            rebeccapurple: 1714657791,
            red: 4278190335,
            rosybrown: 3163525119,
            royalblue: 1097458175,
            saddlebrown: 2336560127,
            salmon: 4202722047,
            sandybrown: 4104413439,
            seagreen: 780883967,
            seashell: 4294307583,
            sienna: 2689740287,
            silver: 3233857791,
            skyblue: 2278484991,
            slateblue: 1784335871,
            slategray: 1887473919,
            slategrey: 1887473919,
            snow: 4294638335,
            springgreen: 16744447,
            steelblue: 1182971135,
            tan: 3535047935,
            teal: 8421631,
            thistle: 3636451583,
            tomato: 4284696575,
            turquoise: 1088475391,
            violet: 4001558271,
            wheat: 4125012991,
            white: 4294967295,
            whitesmoke: 4126537215,
            yellow: 4294902015,
            yellowgreen: 2597139199
        };
        var NUMBER = "[-+]?\\d*\\.?\\d+";
        var PERCENTAGE = NUMBER + "%";
        function call(...parts) {
            return "\\(\\s*(" + parts.join(")\\s*,\\s*(") + ")\\s*\\)";
        }
        var rgb = new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER));
        var rgba = new RegExp("rgba" + call(NUMBER, NUMBER, NUMBER, NUMBER));
        var hsl = new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE));
        var hsla = new RegExp("hsla" + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
        var hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
        var hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
        var hex6 = /^#([0-9a-fA-F]{6})$/;
        var hex8 = /^#([0-9a-fA-F]{8})$/;
        function normalizeColor(color) {
            let match;
            if (typeof color === "number") return color >>> 0 === color && color >= 0 && color <= 4294967295 ? color : null;
            if (match = hex6.exec(color)) return parseInt(match[1] + "ff", 16) >>> 0;
            if (colors && colors[color] !== void 0) return colors[color];
            if (match = rgb.exec(color)) return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | 255) >>> 0;
            if (match = rgba.exec(color)) return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | parse1(match[4])) >>> 0;
            if (match = hex3.exec(color)) return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + "ff", 16) >>> 0;
            if (match = hex8.exec(color)) return parseInt(match[1], 16) >>> 0;
            if (match = hex4.exec(color)) return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + match[4] + match[4], 16) >>> 0;
            if (match = hsl.exec(color)) return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | 255) >>> 0;
            if (match = hsla.exec(color)) return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | parse1(match[4])) >>> 0;
            return null;
        }
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        function hslToRgb(h, s, l) {
            const q = l < .5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            const r = hue2rgb(p, q, h + 1 / 3);
            const g = hue2rgb(p, q, h);
            const b = hue2rgb(p, q, h - 1 / 3);
            return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
        }
        function parse255(str) {
            const int = parseInt(str, 10);
            if (int < 0) return 0;
            if (int > 255) return 255;
            return int;
        }
        function parse360(str) {
            const int = parseFloat(str);
            return (int % 360 + 360) % 360 / 360;
        }
        function parse1(str) {
            const num = parseFloat(str);
            if (num < 0) return 0;
            if (num > 1) return 255;
            return Math.round(num * 255);
        }
        function parsePercentage(str) {
            const int = parseFloat(str);
            if (int < 0) return 0;
            if (int > 100) return 1;
            return int / 100;
        }
        function colorToRgba(input) {
            let int32Color = normalizeColor(input);
            if (int32Color === null) return input;
            int32Color = int32Color || 0;
            const r = (int32Color & 4278190080) >>> 24;
            const g = (int32Color & 16711680) >>> 16;
            const b = (int32Color & 65280) >>> 8;
            const a = (int32Color & 255) / 255;
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }
        var createInterpolator = (range, output, extrapolate) => {
            if (is.fun(range)) return range;
            if (is.arr(range)) return createInterpolator({
                range,
                output,
                extrapolate
            });
            if (is.str(range.output[0])) return createStringInterpolator(range);
            const config = range;
            const outputRange = config.output;
            const inputRange = config.range || [ 0, 1 ];
            const extrapolateLeft = config.extrapolateLeft || config.extrapolate || "extend";
            const extrapolateRight = config.extrapolateRight || config.extrapolate || "extend";
            const easing = config.easing || (t => t);
            return input => {
                const range2 = findRange(input, inputRange);
                return interpolate(input, inputRange[range2], inputRange[range2 + 1], outputRange[range2], outputRange[range2 + 1], easing, extrapolateLeft, extrapolateRight, config.map);
            };
        };
        function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map) {
            let result = map ? map(input) : input;
            if (result < inputMin) if (extrapolateLeft === "identity") return result; else if (extrapolateLeft === "clamp") result = inputMin;
            if (result > inputMax) if (extrapolateRight === "identity") return result; else if (extrapolateRight === "clamp") result = inputMax;
            if (outputMin === outputMax) return outputMin;
            if (inputMin === inputMax) return input <= inputMin ? outputMin : outputMax;
            if (inputMin === -1 / 0) result = -result; else if (inputMax === 1 / 0) result -= inputMin; else result = (result - inputMin) / (inputMax - inputMin);
            result = easing(result);
            if (outputMin === -1 / 0) result = -result; else if (outputMax === 1 / 0) result += outputMin; else result = result * (outputMax - outputMin) + outputMin;
            return result;
        }
        function findRange(input, inputRange) {
            for (var i = 1; i < inputRange.length - 1; ++i) if (inputRange[i] >= input) break;
            return i - 1;
        }
        var steps = (steps2, direction = "end") => progress2 => {
            progress2 = direction === "end" ? Math.min(progress2, .999) : Math.max(progress2, .001);
            const expanded = progress2 * steps2;
            const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
            return clamp(0, 1, rounded / steps2);
        };
        var c1 = 1.70158;
        var c2 = c1 * 1.525;
        var c3 = c1 + 1;
        var c4 = 2 * Math.PI / 3;
        var c5 = 2 * Math.PI / 4.5;
        var bounceOut = x => {
            const n1 = 7.5625;
            const d1 = 2.75;
            if (x < 1 / d1) return n1 * x * x; else if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + .75; else if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + .9375; else return n1 * (x -= 2.625 / d1) * x + .984375;
        };
        var easings = {
            linear: x => x,
            easeInQuad: x => x * x,
            easeOutQuad: x => 1 - (1 - x) * (1 - x),
            easeInOutQuad: x => x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2,
            easeInCubic: x => x * x * x,
            easeOutCubic: x => 1 - Math.pow(1 - x, 3),
            easeInOutCubic: x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
            easeInQuart: x => x * x * x * x,
            easeOutQuart: x => 1 - Math.pow(1 - x, 4),
            easeInOutQuart: x => x < .5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2,
            easeInQuint: x => x * x * x * x * x,
            easeOutQuint: x => 1 - Math.pow(1 - x, 5),
            easeInOutQuint: x => x < .5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2,
            easeInSine: x => 1 - Math.cos(x * Math.PI / 2),
            easeOutSine: x => Math.sin(x * Math.PI / 2),
            easeInOutSine: x => -(Math.cos(Math.PI * x) - 1) / 2,
            easeInExpo: x => x === 0 ? 0 : Math.pow(2, 10 * x - 10),
            easeOutExpo: x => x === 1 ? 1 : 1 - Math.pow(2, -10 * x),
            easeInOutExpo: x => x === 0 ? 0 : x === 1 ? 1 : x < .5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2,
            easeInCirc: x => 1 - Math.sqrt(1 - Math.pow(x, 2)),
            easeOutCirc: x => Math.sqrt(1 - Math.pow(x - 1, 2)),
            easeInOutCirc: x => x < .5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2,
            easeInBack: x => c3 * x * x * x - c1 * x * x,
            easeOutBack: x => 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2),
            easeInOutBack: x => x < .5 ? Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2,
            easeInElastic: x => x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4),
            easeOutElastic: x => x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - .75) * c4) + 1,
            easeInOutElastic: x => x === 0 ? 0 : x === 1 ? 1 : x < .5 ? -Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5) / 2 : Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5) / 2 + 1,
            easeInBounce: x => 1 - bounceOut(1 - x),
            easeOutBounce: bounceOut,
            easeInOutBounce: x => x < .5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2,
            steps
        };
        var $get = Symbol.for("FluidValue.get");
        var $observers = Symbol.for("FluidValue.observers");
        var hasFluidValue = arg => Boolean(arg && arg[$get]);
        var getFluidValue = arg => arg && arg[$get] ? arg[$get]() : arg;
        var getFluidObservers = target => target[$observers] || null;
        function callFluidObserver(observer2, event) {
            if (observer2.eventObserved) observer2.eventObserved(event); else observer2(event);
        }
        function callFluidObservers(target, event) {
            const observers = target[$observers];
            if (observers) observers.forEach((observer2 => {
                callFluidObserver(observer2, event);
            }));
        }
        var FluidValue = class {
            constructor(get) {
                if (!get && !(get = this.get)) throw Error("Unknown getter");
                setFluidGetter(this, get);
            }
        };
        $get, $observers;
        var setFluidGetter = (target, get) => setHidden(target, $get, get);
        function addFluidObserver(target, observer2) {
            if (target[$get]) {
                let observers = target[$observers];
                if (!observers) setHidden(target, $observers, observers = new Set);
                if (!observers.has(observer2)) {
                    observers.add(observer2);
                    if (target.observerAdded) target.observerAdded(observers.size, observer2);
                }
            }
            return observer2;
        }
        function removeFluidObserver(target, observer2) {
            const observers = target[$observers];
            if (observers && observers.has(observer2)) {
                const count = observers.size - 1;
                if (count) observers.delete(observer2); else target[$observers] = null;
                if (target.observerRemoved) target.observerRemoved(count, observer2);
            }
        }
        var setHidden = (target, key, value) => Object.defineProperty(target, key, {
            value,
            writable: true,
            configurable: true
        });
        var numberRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
        var colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
        var unitRegex = new RegExp(`(${numberRegex.source})(%|[a-z]+)`, "i");
        var rgbaRegex = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi;
        var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
        var variableToRgba = input => {
            const [token, fallback] = parseCSSVariable(input);
            if (!token || isSSR()) return input;
            const value = window.getComputedStyle(document.documentElement).getPropertyValue(token);
            if (value) return value.trim(); else if (fallback && fallback.startsWith("--")) {
                const value2 = window.getComputedStyle(document.documentElement).getPropertyValue(fallback);
                if (value2) return value2; else return input;
            } else if (fallback && cssVariableRegex.test(fallback)) return variableToRgba(fallback); else if (fallback) return fallback;
            return input;
        };
        var parseCSSVariable = current => {
            const match = cssVariableRegex.exec(current);
            if (!match) return [ ,  ];
            const [, token, fallback] = match;
            return [ token, fallback ];
        };
        var namedColorRegex;
        var rgbaRound = (_, p1, p2, p3, p4) => `rgba(${Math.round(p1)}, ${Math.round(p2)}, ${Math.round(p3)}, ${p4})`;
        var createStringInterpolator2 = config => {
            if (!namedColorRegex) namedColorRegex = colors ? new RegExp(`(${Object.keys(colors).join("|")})(?!\\w)`, "g") : /^\b$/;
            const output = config.output.map((value => getFluidValue(value).replace(cssVariableRegex, variableToRgba).replace(colorRegex, colorToRgba).replace(namedColorRegex, colorToRgba)));
            const keyframes = output.map((value => value.match(numberRegex).map(Number)));
            const outputRanges = keyframes[0].map(((_, i) => keyframes.map((values => {
                if (!(i in values)) throw Error('The arity of each "output" value must be equal');
                return values[i];
            }))));
            const interpolators = outputRanges.map((output2 => createInterpolator({
                ...config,
                output: output2
            })));
            return input => {
                const missingUnit = !unitRegex.test(output[0]) && output.find((value => unitRegex.test(value)))?.replace(numberRegex, "");
                let i = 0;
                return output[0].replace(numberRegex, (() => `${interpolators[i++](input)}${missingUnit || ""}`)).replace(rgbaRegex, rgbaRound);
            };
        };
        var prefix = "react-spring: ";
        var once = fn => {
            const func = fn;
            let called = false;
            if (typeof func != "function") throw new TypeError(`${prefix}once requires a function parameter`);
            return (...args) => {
                if (!called) {
                    func(...args);
                    called = true;
                }
            };
        };
        var warnInterpolate = once(console.warn);
        function deprecateInterpolate() {
            warnInterpolate(`${prefix}The "interpolate" function is deprecated in v9 (use "to" instead)`);
        }
        var warnDirectCall = once(console.warn);
        function deprecateDirectCall() {
            warnDirectCall(`${prefix}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
        }
        function isAnimatedString(value) {
            return is.str(value) && (value[0] == "#" || /\d/.test(value) || !isSSR() && cssVariableRegex.test(value) || value in (colors || {}));
        }
        new WeakMap;
        new Set;
        new WeakMap;
        new WeakMap;
        new WeakMap;
        var react_spring_shared_modern_useIsomorphicLayoutEffect = isSSR() ? react.useEffect : react.useLayoutEffect;
        var useIsMounted = () => {
            const isMounted = (0, react.useRef)(false);
            react_spring_shared_modern_useIsomorphicLayoutEffect((() => {
                isMounted.current = true;
                return () => {
                    isMounted.current = false;
                };
            }), []);
            return isMounted;
        };
        function useForceUpdate() {
            const update2 = (0, react.useState)()[1];
            const isMounted = useIsMounted();
            return () => {
                if (isMounted.current) update2(Math.random());
            };
        }
        function useMemoOne(getResult, inputs) {
            const [initial] = (0, react.useState)((() => ({
                inputs,
                result: getResult()
            })));
            const committed = (0, react.useRef)();
            const prevCache = committed.current;
            let cache = prevCache;
            if (cache) {
                const useCache = Boolean(inputs && cache.inputs && areInputsEqual(inputs, cache.inputs));
                if (!useCache) cache = {
                    inputs,
                    result: getResult()
                };
            } else cache = initial;
            (0, react.useEffect)((() => {
                committed.current = cache;
                if (prevCache == initial) initial.inputs = initial.result = void 0;
            }), [ cache ]);
            return cache.result;
        }
        function areInputsEqual(next, prev) {
            if (next.length !== prev.length) return false;
            for (let i = 0; i < next.length; i++) if (next[i] !== prev[i]) return false;
            return true;
        }
        var useOnce = effect => (0, react.useEffect)(effect, emptyDeps);
        var emptyDeps = [];
        function usePrev(value) {
            const prevRef = (0, react.useRef)();
            (0, react.useEffect)((() => {
                prevRef.current = value;
            }));
            return prevRef.current;
        }
        var $node = Symbol.for("Animated:node");
        var isAnimated = value => !!value && value[$node] === value;
        var getAnimated = owner => owner && owner[$node];
        var setAnimated = (owner, node) => defineHidden(owner, $node, node);
        var getPayload = owner => owner && owner[$node] && owner[$node].getPayload();
        var Animated = class {
            constructor() {
                setAnimated(this, this);
            }
            getPayload() {
                return this.payload || [];
            }
        };
        var AnimatedValue = class extends Animated {
            constructor(_value) {
                super();
                this._value = _value;
                this.done = true;
                this.durationProgress = 0;
                if (is.num(this._value)) this.lastPosition = this._value;
            }
            static create(value) {
                return new AnimatedValue(value);
            }
            getPayload() {
                return [ this ];
            }
            getValue() {
                return this._value;
            }
            setValue(value, step) {
                if (is.num(value)) {
                    this.lastPosition = value;
                    if (step) {
                        value = Math.round(value / step) * step;
                        if (this.done) this.lastPosition = value;
                    }
                }
                if (this._value === value) return false;
                this._value = value;
                return true;
            }
            reset() {
                const {done} = this;
                this.done = false;
                if (is.num(this._value)) {
                    this.elapsedTime = 0;
                    this.durationProgress = 0;
                    this.lastPosition = this._value;
                    if (done) this.lastVelocity = null;
                    this.v0 = null;
                }
            }
        };
        var AnimatedString = class extends AnimatedValue {
            constructor(value) {
                super(0);
                this._string = null;
                this._toString = createInterpolator({
                    output: [ value, value ]
                });
            }
            static create(value) {
                return new AnimatedString(value);
            }
            getValue() {
                const value = this._string;
                return value == null ? this._string = this._toString(this._value) : value;
            }
            setValue(value) {
                if (is.str(value)) {
                    if (value == this._string) return false;
                    this._string = value;
                    this._value = 1;
                } else if (super.setValue(value)) this._string = null; else return false;
                return true;
            }
            reset(goal) {
                if (goal) this._toString = createInterpolator({
                    output: [ this.getValue(), goal ]
                });
                this._value = 0;
                super.reset();
            }
        };
        var TreeContext = {
            dependencies: null
        };
        var AnimatedObject = class extends Animated {
            constructor(source) {
                super();
                this.source = source;
                this.setValue(source);
            }
            getValue(animated) {
                const values = {};
                eachProp(this.source, ((source, key) => {
                    if (isAnimated(source)) values[key] = source.getValue(animated); else if (hasFluidValue(source)) values[key] = getFluidValue(source); else if (!animated) values[key] = source;
                }));
                return values;
            }
            setValue(source) {
                this.source = source;
                this.payload = this._makePayload(source);
            }
            reset() {
                if (this.payload) react_spring_shared_modern_each(this.payload, (node => node.reset()));
            }
            _makePayload(source) {
                if (source) {
                    const payload = new Set;
                    eachProp(source, this._addToPayload, payload);
                    return Array.from(payload);
                }
            }
            _addToPayload(source) {
                if (TreeContext.dependencies && hasFluidValue(source)) TreeContext.dependencies.add(source);
                const payload = getPayload(source);
                if (payload) react_spring_shared_modern_each(payload, (node => this.add(node)));
            }
        };
        var AnimatedArray = class extends AnimatedObject {
            constructor(source) {
                super(source);
            }
            static create(source) {
                return new AnimatedArray(source);
            }
            getValue() {
                return this.source.map((node => node.getValue()));
            }
            setValue(source) {
                const payload = this.getPayload();
                if (source.length == payload.length) return payload.map(((node, i) => node.setValue(source[i]))).some(Boolean);
                super.setValue(source.map(makeAnimated));
                return true;
            }
        };
        function makeAnimated(value) {
            const nodeType = isAnimatedString(value) ? AnimatedString : AnimatedValue;
            return nodeType.create(value);
        }
        function getAnimatedType(value) {
            const parentNode = getAnimated(value);
            return parentNode ? parentNode.constructor : is.arr(value) ? AnimatedArray : isAnimatedString(value) ? AnimatedString : AnimatedValue;
        }
        var withAnimated = (Component, host) => {
            const hasInstance = !is.fun(Component) || Component.prototype && Component.prototype.isReactComponent;
            return (0, react.forwardRef)(((givenProps, givenRef) => {
                const instanceRef = (0, react.useRef)(null);
                const ref = hasInstance && (0, react.useCallback)((value => {
                    instanceRef.current = updateRef(givenRef, value);
                }), [ givenRef ]);
                const [props, deps] = getAnimatedState(givenProps, host);
                const forceUpdate = useForceUpdate();
                const callback = () => {
                    const instance = instanceRef.current;
                    if (hasInstance && !instance) return;
                    const didUpdate = instance ? host.applyAnimatedValues(instance, props.getValue(true)) : false;
                    if (didUpdate === false) forceUpdate();
                };
                const observer = new PropsObserver(callback, deps);
                const observerRef = (0, react.useRef)();
                react_spring_shared_modern_useIsomorphicLayoutEffect((() => {
                    observerRef.current = observer;
                    react_spring_shared_modern_each(deps, (dep => addFluidObserver(dep, observer)));
                    return () => {
                        if (observerRef.current) {
                            react_spring_shared_modern_each(observerRef.current.deps, (dep => removeFluidObserver(dep, observerRef.current)));
                            raf.cancel(observerRef.current.update);
                        }
                    };
                }));
                (0, react.useEffect)(callback, []);
                useOnce((() => () => {
                    const observer2 = observerRef.current;
                    react_spring_shared_modern_each(observer2.deps, (dep => removeFluidObserver(dep, observer2)));
                }));
                const usedProps = host.getComponentProps(props.getValue());
                return react.createElement(Component, {
                    ...usedProps,
                    ref
                });
            }));
        };
        var PropsObserver = class {
            constructor(update, deps) {
                this.update = update;
                this.deps = deps;
            }
            eventObserved(event) {
                if (event.type == "change") raf.write(this.update);
            }
        };
        function getAnimatedState(props, host) {
            const dependencies = new Set;
            TreeContext.dependencies = dependencies;
            if (props.style) props = {
                ...props,
                style: host.createAnimatedStyle(props.style)
            };
            props = new AnimatedObject(props);
            TreeContext.dependencies = null;
            return [ props, dependencies ];
        }
        function updateRef(ref, value) {
            if (ref) if (is.fun(ref)) ref(value); else ref.current = value;
            return value;
        }
        var cacheKey = Symbol.for("AnimatedComponent");
        var createHost = (components, {applyAnimatedValues = () => false, createAnimatedStyle = style => new AnimatedObject(style), getComponentProps = props => props} = {}) => {
            const hostConfig = {
                applyAnimatedValues,
                createAnimatedStyle,
                getComponentProps
            };
            const animated = Component => {
                const displayName = getDisplayName(Component) || "Anonymous";
                if (is.str(Component)) Component = animated[Component] || (animated[Component] = withAnimated(Component, hostConfig)); else Component = Component[cacheKey] || (Component[cacheKey] = withAnimated(Component, hostConfig));
                Component.displayName = `Animated(${displayName})`;
                return Component;
            };
            eachProp(components, ((Component, key) => {
                if (is.arr(components)) key = getDisplayName(Component);
                animated[key] = animated(Component);
            }));
            return {
                animated
            };
        };
        var getDisplayName = arg => is.str(arg) ? arg : arg && is.str(arg.displayName) ? arg.displayName : is.fun(arg) && arg.name || null;
        function callProp(value, ...args) {
            return is.fun(value) ? value(...args) : value;
        }
        var matchProp = (value, key) => value === true || !!(key && value && (is.fun(value) ? value(key) : toArray(value).includes(key)));
        var resolveProp = (prop, key) => is.obj(prop) ? key && prop[key] : prop;
        var getDefaultProp = (props, key) => props.default === true ? props[key] : props.default ? props.default[key] : void 0;
        var noopTransform = value => value;
        var getDefaultProps = (props, transform = noopTransform) => {
            let keys = DEFAULT_PROPS;
            if (props.default && props.default !== true) {
                props = props.default;
                keys = Object.keys(props);
            }
            const defaults2 = {};
            for (const key of keys) {
                const value = transform(props[key], key);
                if (!is.und(value)) defaults2[key] = value;
            }
            return defaults2;
        };
        var DEFAULT_PROPS = [ "config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest" ];
        var RESERVED_PROPS = {
            config: 1,
            from: 1,
            to: 1,
            ref: 1,
            loop: 1,
            reset: 1,
            pause: 1,
            cancel: 1,
            reverse: 1,
            immediate: 1,
            default: 1,
            delay: 1,
            onProps: 1,
            onStart: 1,
            onChange: 1,
            onPause: 1,
            onResume: 1,
            onRest: 1,
            onResolve: 1,
            items: 1,
            trail: 1,
            sort: 1,
            expires: 1,
            initial: 1,
            enter: 1,
            update: 1,
            leave: 1,
            children: 1,
            onDestroyed: 1,
            keys: 1,
            callId: 1,
            parentId: 1
        };
        function getForwardProps(props) {
            const forward = {};
            let count = 0;
            eachProp(props, ((value, prop) => {
                if (!RESERVED_PROPS[prop]) {
                    forward[prop] = value;
                    count++;
                }
            }));
            if (count) return forward;
        }
        function inferTo(props) {
            const to2 = getForwardProps(props);
            if (to2) {
                const out = {
                    to: to2
                };
                eachProp(props, ((val, key) => key in to2 || (out[key] = val)));
                return out;
            }
            return {
                ...props
            };
        }
        function computeGoal(value) {
            value = getFluidValue(value);
            return is.arr(value) ? value.map(computeGoal) : isAnimatedString(value) ? globals_exports.createStringInterpolator({
                range: [ 0, 1 ],
                output: [ value, value ]
            })(1) : value;
        }
        function hasProps(props) {
            for (const _ in props) return true;
            return false;
        }
        function isAsyncTo(to2) {
            return is.fun(to2) || is.arr(to2) && is.obj(to2[0]);
        }
        function detachRefs(ctrl, ref) {
            ctrl.ref?.delete(ctrl);
            ref?.delete(ctrl);
        }
        function replaceRef(ctrl, ref) {
            if (ref && ctrl.ref !== ref) {
                ctrl.ref?.delete(ctrl);
                ref.add(ctrl);
                ctrl.ref = ref;
            }
        }
        var config = {
            default: {
                tension: 170,
                friction: 26
            },
            gentle: {
                tension: 120,
                friction: 14
            },
            wobbly: {
                tension: 180,
                friction: 12
            },
            stiff: {
                tension: 210,
                friction: 20
            },
            slow: {
                tension: 280,
                friction: 60
            },
            molasses: {
                tension: 280,
                friction: 120
            }
        };
        var defaults = {
            ...config.default,
            mass: 1,
            damping: 1,
            easing: easings.linear,
            clamp: false
        };
        var AnimationConfig = class {
            constructor() {
                this.velocity = 0;
                Object.assign(this, defaults);
            }
        };
        function mergeConfig(config2, newConfig, defaultConfig) {
            if (defaultConfig) {
                defaultConfig = {
                    ...defaultConfig
                };
                sanitizeConfig(defaultConfig, newConfig);
                newConfig = {
                    ...defaultConfig,
                    ...newConfig
                };
            }
            sanitizeConfig(config2, newConfig);
            Object.assign(config2, newConfig);
            for (const key in defaults) if (config2[key] == null) config2[key] = defaults[key];
            let {frequency, damping} = config2;
            const {mass} = config2;
            if (!is.und(frequency)) {
                if (frequency < .01) frequency = .01;
                if (damping < 0) damping = 0;
                config2.tension = Math.pow(2 * Math.PI / frequency, 2) * mass;
                config2.friction = 4 * Math.PI * damping * mass / frequency;
            }
            return config2;
        }
        function sanitizeConfig(config2, props) {
            if (!is.und(props.decay)) config2.duration = void 0; else {
                const isTensionConfig = !is.und(props.tension) || !is.und(props.friction);
                if (isTensionConfig || !is.und(props.frequency) || !is.und(props.damping) || !is.und(props.mass)) {
                    config2.duration = void 0;
                    config2.decay = void 0;
                }
                if (isTensionConfig) config2.frequency = void 0;
            }
        }
        var emptyArray = [];
        var Animation = class {
            constructor() {
                this.changed = false;
                this.values = emptyArray;
                this.toValues = null;
                this.fromValues = emptyArray;
                this.config = new AnimationConfig;
                this.immediate = false;
            }
        };
        function scheduleProps(callId, {key, props, defaultProps, state, actions}) {
            return new Promise(((resolve, reject) => {
                let delay;
                let timeout;
                let cancel = matchProp(props.cancel ?? defaultProps?.cancel, key);
                if (cancel) onStart(); else {
                    if (!is.und(props.pause)) state.paused = matchProp(props.pause, key);
                    let pause = defaultProps?.pause;
                    if (pause !== true) pause = state.paused || matchProp(pause, key);
                    delay = callProp(props.delay || 0, key);
                    if (pause) {
                        state.resumeQueue.add(onResume);
                        actions.pause();
                    } else {
                        actions.resume();
                        onResume();
                    }
                }
                function onPause() {
                    state.resumeQueue.add(onResume);
                    state.timeouts.delete(timeout);
                    timeout.cancel();
                    delay = timeout.time - raf.now();
                }
                function onResume() {
                    if (delay > 0 && !globals_exports.skipAnimation) {
                        state.delayed = true;
                        timeout = raf.setTimeout(onStart, delay);
                        state.pauseQueue.add(onPause);
                        state.timeouts.add(timeout);
                    } else onStart();
                }
                function onStart() {
                    if (state.delayed) state.delayed = false;
                    state.pauseQueue.delete(onPause);
                    state.timeouts.delete(timeout);
                    if (callId <= (state.cancelId || 0)) cancel = true;
                    try {
                        actions.start({
                            ...props,
                            callId,
                            cancel
                        }, resolve);
                    } catch (err) {
                        reject(err);
                    }
                }
            }));
        }
        var getCombinedResult = (target, results) => results.length == 1 ? results[0] : results.some((result => result.cancelled)) ? getCancelledResult(target.get()) : results.every((result => result.noop)) ? getNoopResult(target.get()) : getFinishedResult(target.get(), results.every((result => result.finished)));
        var getNoopResult = value => ({
            value,
            noop: true,
            finished: true,
            cancelled: false
        });
        var getFinishedResult = (value, finished, cancelled = false) => ({
            value,
            finished,
            cancelled
        });
        var getCancelledResult = value => ({
            value,
            cancelled: true,
            finished: false
        });
        function runAsync(to2, props, state, target) {
            const {callId, parentId, onRest} = props;
            const {asyncTo: prevTo, promise: prevPromise} = state;
            if (!parentId && to2 === prevTo && !props.reset) return prevPromise;
            return state.promise = (async () => {
                state.asyncId = callId;
                state.asyncTo = to2;
                const defaultProps = getDefaultProps(props, ((value, key) => key === "onRest" ? void 0 : value));
                let preventBail;
                let bail;
                const bailPromise = new Promise(((resolve, reject) => (preventBail = resolve, bail = reject)));
                const bailIfEnded = bailSignal => {
                    const bailResult = callId <= (state.cancelId || 0) && getCancelledResult(target) || callId !== state.asyncId && getFinishedResult(target, false);
                    if (bailResult) {
                        bailSignal.result = bailResult;
                        bail(bailSignal);
                        throw bailSignal;
                    }
                };
                const animate = (arg1, arg2) => {
                    const bailSignal = new BailSignal;
                    const skipAnimationSignal = new SkipAnimationSignal;
                    return (async () => {
                        if (globals_exports.skipAnimation) {
                            stopAsync(state);
                            skipAnimationSignal.result = getFinishedResult(target, false);
                            bail(skipAnimationSignal);
                            throw skipAnimationSignal;
                        }
                        bailIfEnded(bailSignal);
                        const props2 = is.obj(arg1) ? {
                            ...arg1
                        } : {
                            ...arg2,
                            to: arg1
                        };
                        props2.parentId = callId;
                        eachProp(defaultProps, ((value, key) => {
                            if (is.und(props2[key])) props2[key] = value;
                        }));
                        const result2 = await target.start(props2);
                        bailIfEnded(bailSignal);
                        if (state.paused) await new Promise((resume => {
                            state.resumeQueue.add(resume);
                        }));
                        return result2;
                    })();
                };
                let result;
                if (globals_exports.skipAnimation) {
                    stopAsync(state);
                    return getFinishedResult(target, false);
                }
                try {
                    let animating;
                    if (is.arr(to2)) animating = (async queue => {
                        for (const props2 of queue) await animate(props2);
                    })(to2); else animating = Promise.resolve(to2(animate, target.stop.bind(target)));
                    await Promise.all([ animating.then(preventBail), bailPromise ]);
                    result = getFinishedResult(target.get(), true, false);
                } catch (err) {
                    if (err instanceof BailSignal) result = err.result; else if (err instanceof SkipAnimationSignal) result = err.result; else throw err;
                } finally {
                    if (callId == state.asyncId) {
                        state.asyncId = parentId;
                        state.asyncTo = parentId ? prevTo : void 0;
                        state.promise = parentId ? prevPromise : void 0;
                    }
                }
                if (is.fun(onRest)) raf.batchedUpdates((() => {
                    onRest(result, target, target.item);
                }));
                return result;
            })();
        }
        function stopAsync(state, cancelId) {
            flush(state.timeouts, (t => t.cancel()));
            state.pauseQueue.clear();
            state.resumeQueue.clear();
            state.asyncId = state.asyncTo = state.promise = void 0;
            if (cancelId) state.cancelId = cancelId;
        }
        var BailSignal = class extends Error {
            constructor() {
                super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise.");
            }
        };
        var SkipAnimationSignal = class extends Error {
            constructor() {
                super("SkipAnimationSignal");
            }
        };
        var isFrameValue = value => value instanceof FrameValue;
        var nextId = 1;
        var FrameValue = class extends FluidValue {
            constructor() {
                super(...arguments);
                this.id = nextId++;
                this._priority = 0;
            }
            get priority() {
                return this._priority;
            }
            set priority(priority) {
                if (this._priority != priority) {
                    this._priority = priority;
                    this._onPriorityChange(priority);
                }
            }
            get() {
                const node = getAnimated(this);
                return node && node.getValue();
            }
            to(...args) {
                return globals_exports.to(this, args);
            }
            interpolate(...args) {
                deprecateInterpolate();
                return globals_exports.to(this, args);
            }
            toJSON() {
                return this.get();
            }
            observerAdded(count) {
                if (count == 1) this._attach();
            }
            observerRemoved(count) {
                if (count == 0) this._detach();
            }
            _attach() {}
            _detach() {}
            _onChange(value, idle = false) {
                callFluidObservers(this, {
                    type: "change",
                    parent: this,
                    value,
                    idle
                });
            }
            _onPriorityChange(priority) {
                if (!this.idle) frameLoop.sort(this);
                callFluidObservers(this, {
                    type: "priority",
                    parent: this,
                    priority
                });
            }
        };
        var $P = Symbol.for("SpringPhase");
        var HAS_ANIMATED = 1;
        var IS_ANIMATING = 2;
        var IS_PAUSED = 4;
        var hasAnimated = target => (target[$P] & HAS_ANIMATED) > 0;
        var isAnimating = target => (target[$P] & IS_ANIMATING) > 0;
        var isPaused = target => (target[$P] & IS_PAUSED) > 0;
        var setActiveBit = (target, active) => active ? target[$P] |= IS_ANIMATING | HAS_ANIMATED : target[$P] &= ~IS_ANIMATING;
        var setPausedBit = (target, paused) => paused ? target[$P] |= IS_PAUSED : target[$P] &= ~IS_PAUSED;
        var SpringValue = class extends FrameValue {
            constructor(arg1, arg2) {
                super();
                this.animation = new Animation;
                this.defaultProps = {};
                this._state = {
                    paused: false,
                    delayed: false,
                    pauseQueue: new Set,
                    resumeQueue: new Set,
                    timeouts: new Set
                };
                this._pendingCalls = new Set;
                this._lastCallId = 0;
                this._lastToId = 0;
                this._memoizedDuration = 0;
                if (!is.und(arg1) || !is.und(arg2)) {
                    const props = is.obj(arg1) ? {
                        ...arg1
                    } : {
                        ...arg2,
                        from: arg1
                    };
                    if (is.und(props.default)) props.default = true;
                    this.start(props);
                }
            }
            get idle() {
                return !(isAnimating(this) || this._state.asyncTo) || isPaused(this);
            }
            get goal() {
                return getFluidValue(this.animation.to);
            }
            get velocity() {
                const node = getAnimated(this);
                return node instanceof AnimatedValue ? node.lastVelocity || 0 : node.getPayload().map((node2 => node2.lastVelocity || 0));
            }
            get hasAnimated() {
                return hasAnimated(this);
            }
            get isAnimating() {
                return isAnimating(this);
            }
            get isPaused() {
                return isPaused(this);
            }
            get isDelayed() {
                return this._state.delayed;
            }
            advance(dt) {
                let idle = true;
                let changed = false;
                const anim = this.animation;
                let {toValues} = anim;
                const {config: config2} = anim;
                const payload = getPayload(anim.to);
                if (!payload && hasFluidValue(anim.to)) toValues = toArray(getFluidValue(anim.to));
                anim.values.forEach(((node2, i) => {
                    if (node2.done) return;
                    const to2 = node2.constructor == AnimatedString ? 1 : payload ? payload[i].lastPosition : toValues[i];
                    let finished = anim.immediate;
                    let position = to2;
                    if (!finished) {
                        position = node2.lastPosition;
                        if (config2.tension <= 0) {
                            node2.done = true;
                            return;
                        }
                        let elapsed = node2.elapsedTime += dt;
                        const from = anim.fromValues[i];
                        const v0 = node2.v0 != null ? node2.v0 : node2.v0 = is.arr(config2.velocity) ? config2.velocity[i] : config2.velocity;
                        let velocity;
                        const precision = config2.precision || (from == to2 ? .005 : Math.min(1, Math.abs(to2 - from) * .001));
                        if (!is.und(config2.duration)) {
                            let p = 1;
                            if (config2.duration > 0) {
                                if (this._memoizedDuration !== config2.duration) {
                                    this._memoizedDuration = config2.duration;
                                    if (node2.durationProgress > 0) {
                                        node2.elapsedTime = config2.duration * node2.durationProgress;
                                        elapsed = node2.elapsedTime += dt;
                                    }
                                }
                                p = (config2.progress || 0) + elapsed / this._memoizedDuration;
                                p = p > 1 ? 1 : p < 0 ? 0 : p;
                                node2.durationProgress = p;
                            }
                            position = from + config2.easing(p) * (to2 - from);
                            velocity = (position - node2.lastPosition) / dt;
                            finished = p == 1;
                        } else if (config2.decay) {
                            const decay = config2.decay === true ? .998 : config2.decay;
                            const e = Math.exp(-(1 - decay) * elapsed);
                            position = from + v0 / (1 - decay) * (1 - e);
                            finished = Math.abs(node2.lastPosition - position) <= precision;
                            velocity = v0 * e;
                        } else {
                            velocity = node2.lastVelocity == null ? v0 : node2.lastVelocity;
                            const restVelocity = config2.restVelocity || precision / 10;
                            const bounceFactor = config2.clamp ? 0 : config2.bounce;
                            const canBounce = !is.und(bounceFactor);
                            const isGrowing = from == to2 ? node2.v0 > 0 : from < to2;
                            let isMoving;
                            let isBouncing = false;
                            const step = 1;
                            const numSteps = Math.ceil(dt / step);
                            for (let n = 0; n < numSteps; ++n) {
                                isMoving = Math.abs(velocity) > restVelocity;
                                if (!isMoving) {
                                    finished = Math.abs(to2 - position) <= precision;
                                    if (finished) break;
                                }
                                if (canBounce) {
                                    isBouncing = position == to2 || position > to2 == isGrowing;
                                    if (isBouncing) {
                                        velocity = -velocity * bounceFactor;
                                        position = to2;
                                    }
                                }
                                const springForce = -config2.tension * 1e-6 * (position - to2);
                                const dampingForce = -config2.friction * .001 * velocity;
                                const acceleration = (springForce + dampingForce) / config2.mass;
                                velocity += acceleration * step;
                                position += velocity * step;
                            }
                        }
                        node2.lastVelocity = velocity;
                        if (Number.isNaN(position)) {
                            console.warn(`Got NaN while animating:`, this);
                            finished = true;
                        }
                    }
                    if (payload && !payload[i].done) finished = false;
                    if (finished) node2.done = true; else idle = false;
                    if (node2.setValue(position, config2.round)) changed = true;
                }));
                const node = getAnimated(this);
                const currVal = node.getValue();
                if (idle) {
                    const finalVal = getFluidValue(anim.to);
                    if ((currVal !== finalVal || changed) && !config2.decay) {
                        node.setValue(finalVal);
                        this._onChange(finalVal);
                    } else if (changed && config2.decay) this._onChange(currVal);
                    this._stop();
                } else if (changed) this._onChange(currVal);
            }
            set(value) {
                raf.batchedUpdates((() => {
                    this._stop();
                    this._focus(value);
                    this._set(value);
                }));
                return this;
            }
            pause() {
                this._update({
                    pause: true
                });
            }
            resume() {
                this._update({
                    pause: false
                });
            }
            finish() {
                if (isAnimating(this)) {
                    const {to: to2, config: config2} = this.animation;
                    raf.batchedUpdates((() => {
                        this._onStart();
                        if (!config2.decay) this._set(to2, false);
                        this._stop();
                    }));
                }
                return this;
            }
            update(props) {
                const queue = this.queue || (this.queue = []);
                queue.push(props);
                return this;
            }
            start(to2, arg2) {
                let queue;
                if (!is.und(to2)) queue = [ is.obj(to2) ? to2 : {
                    ...arg2,
                    to: to2
                } ]; else {
                    queue = this.queue || [];
                    this.queue = [];
                }
                return Promise.all(queue.map((props => {
                    const up = this._update(props);
                    return up;
                }))).then((results => getCombinedResult(this, results)));
            }
            stop(cancel) {
                const {to: to2} = this.animation;
                this._focus(this.get());
                stopAsync(this._state, cancel && this._lastCallId);
                raf.batchedUpdates((() => this._stop(to2, cancel)));
                return this;
            }
            reset() {
                this._update({
                    reset: true
                });
            }
            eventObserved(event) {
                if (event.type == "change") this._start(); else if (event.type == "priority") this.priority = event.priority + 1;
            }
            _prepareNode(props) {
                const key = this.key || "";
                let {to: to2, from} = props;
                to2 = is.obj(to2) ? to2[key] : to2;
                if (to2 == null || isAsyncTo(to2)) to2 = void 0;
                from = is.obj(from) ? from[key] : from;
                if (from == null) from = void 0;
                const range = {
                    to: to2,
                    from
                };
                if (!hasAnimated(this)) {
                    if (props.reverse) [to2, from] = [ from, to2 ];
                    from = getFluidValue(from);
                    if (!is.und(from)) this._set(from); else if (!getAnimated(this)) this._set(to2);
                }
                return range;
            }
            _update({...props}, isLoop) {
                const {key, defaultProps} = this;
                if (props.default) Object.assign(defaultProps, getDefaultProps(props, ((value, prop) => /^on/.test(prop) ? resolveProp(value, key) : value)));
                mergeActiveFn(this, props, "onProps");
                sendEvent(this, "onProps", props, this);
                const range = this._prepareNode(props);
                if (Object.isFrozen(this)) throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
                const state = this._state;
                return scheduleProps(++this._lastCallId, {
                    key,
                    props,
                    defaultProps,
                    state,
                    actions: {
                        pause: () => {
                            if (!isPaused(this)) {
                                setPausedBit(this, true);
                                flushCalls(state.pauseQueue);
                                sendEvent(this, "onPause", getFinishedResult(this, checkFinished(this, this.animation.to)), this);
                            }
                        },
                        resume: () => {
                            if (isPaused(this)) {
                                setPausedBit(this, false);
                                if (isAnimating(this)) this._resume();
                                flushCalls(state.resumeQueue);
                                sendEvent(this, "onResume", getFinishedResult(this, checkFinished(this, this.animation.to)), this);
                            }
                        },
                        start: this._merge.bind(this, range)
                    }
                }).then((result => {
                    if (props.loop && result.finished && !(isLoop && result.noop)) {
                        const nextProps = createLoopUpdate(props);
                        if (nextProps) return this._update(nextProps, true);
                    }
                    return result;
                }));
            }
            _merge(range, props, resolve) {
                if (props.cancel) {
                    this.stop(true);
                    return resolve(getCancelledResult(this));
                }
                const hasToProp = !is.und(range.to);
                const hasFromProp = !is.und(range.from);
                if (hasToProp || hasFromProp) if (props.callId > this._lastToId) this._lastToId = props.callId; else return resolve(getCancelledResult(this));
                const {key, defaultProps, animation: anim} = this;
                const {to: prevTo, from: prevFrom} = anim;
                let {to: to2 = prevTo, from = prevFrom} = range;
                if (hasFromProp && !hasToProp && (!props.default || is.und(to2))) to2 = from;
                if (props.reverse) [to2, from] = [ from, to2 ];
                const hasFromChanged = !isEqual(from, prevFrom);
                if (hasFromChanged) anim.from = from;
                from = getFluidValue(from);
                const hasToChanged = !isEqual(to2, prevTo);
                if (hasToChanged) this._focus(to2);
                const hasAsyncTo = isAsyncTo(props.to);
                const {config: config2} = anim;
                const {decay, velocity} = config2;
                if (hasToProp || hasFromProp) config2.velocity = 0;
                if (props.config && !hasAsyncTo) mergeConfig(config2, callProp(props.config, key), props.config !== defaultProps.config ? callProp(defaultProps.config, key) : void 0);
                let node = getAnimated(this);
                if (!node || is.und(to2)) return resolve(getFinishedResult(this, true));
                const reset = is.und(props.reset) ? hasFromProp && !props.default : !is.und(from) && matchProp(props.reset, key);
                const value = reset ? from : this.get();
                const goal = computeGoal(to2);
                const isAnimatable = is.num(goal) || is.arr(goal) || isAnimatedString(goal);
                const immediate = !hasAsyncTo && (!isAnimatable || matchProp(defaultProps.immediate || props.immediate, key));
                if (hasToChanged) {
                    const nodeType = getAnimatedType(to2);
                    if (nodeType !== node.constructor) if (immediate) node = this._set(goal); else throw Error(`Cannot animate between ${node.constructor.name} and ${nodeType.name}, as the "to" prop suggests`);
                }
                const goalType = node.constructor;
                let started = hasFluidValue(to2);
                let finished = false;
                if (!started) {
                    const hasValueChanged = reset || !hasAnimated(this) && hasFromChanged;
                    if (hasToChanged || hasValueChanged) {
                        finished = isEqual(computeGoal(value), goal);
                        started = !finished;
                    }
                    if (!isEqual(anim.immediate, immediate) && !immediate || !isEqual(config2.decay, decay) || !isEqual(config2.velocity, velocity)) started = true;
                }
                if (finished && isAnimating(this)) if (anim.changed && !reset) started = true; else if (!started) this._stop(prevTo);
                if (!hasAsyncTo) {
                    if (started || hasFluidValue(prevTo)) {
                        anim.values = node.getPayload();
                        anim.toValues = hasFluidValue(to2) ? null : goalType == AnimatedString ? [ 1 ] : toArray(goal);
                    }
                    if (anim.immediate != immediate) {
                        anim.immediate = immediate;
                        if (!immediate && !reset) this._set(prevTo);
                    }
                    if (started) {
                        const {onRest} = anim;
                        react_spring_shared_modern_each(ACTIVE_EVENTS, (type => mergeActiveFn(this, props, type)));
                        const result = getFinishedResult(this, checkFinished(this, prevTo));
                        flushCalls(this._pendingCalls, result);
                        this._pendingCalls.add(resolve);
                        if (anim.changed) raf.batchedUpdates((() => {
                            anim.changed = !reset;
                            onRest?.(result, this);
                            if (reset) callProp(defaultProps.onRest, result); else anim.onStart?.(result, this);
                        }));
                    }
                }
                if (reset) this._set(value);
                if (hasAsyncTo) resolve(runAsync(props.to, props, this._state, this)); else if (started) this._start(); else if (isAnimating(this) && !hasToChanged) this._pendingCalls.add(resolve); else resolve(getNoopResult(value));
            }
            _focus(value) {
                const anim = this.animation;
                if (value !== anim.to) {
                    if (getFluidObservers(this)) this._detach();
                    anim.to = value;
                    if (getFluidObservers(this)) this._attach();
                }
            }
            _attach() {
                let priority = 0;
                const {to: to2} = this.animation;
                if (hasFluidValue(to2)) {
                    addFluidObserver(to2, this);
                    if (isFrameValue(to2)) priority = to2.priority + 1;
                }
                this.priority = priority;
            }
            _detach() {
                const {to: to2} = this.animation;
                if (hasFluidValue(to2)) removeFluidObserver(to2, this);
            }
            _set(arg, idle = true) {
                const value = getFluidValue(arg);
                if (!is.und(value)) {
                    const oldNode = getAnimated(this);
                    if (!oldNode || !isEqual(value, oldNode.getValue())) {
                        const nodeType = getAnimatedType(value);
                        if (!oldNode || oldNode.constructor != nodeType) setAnimated(this, nodeType.create(value)); else oldNode.setValue(value);
                        if (oldNode) raf.batchedUpdates((() => {
                            this._onChange(value, idle);
                        }));
                    }
                }
                return getAnimated(this);
            }
            _onStart() {
                const anim = this.animation;
                if (!anim.changed) {
                    anim.changed = true;
                    sendEvent(this, "onStart", getFinishedResult(this, checkFinished(this, anim.to)), this);
                }
            }
            _onChange(value, idle) {
                if (!idle) {
                    this._onStart();
                    callProp(this.animation.onChange, value, this);
                }
                callProp(this.defaultProps.onChange, value, this);
                super._onChange(value, idle);
            }
            _start() {
                const anim = this.animation;
                getAnimated(this).reset(getFluidValue(anim.to));
                if (!anim.immediate) anim.fromValues = anim.values.map((node => node.lastPosition));
                if (!isAnimating(this)) {
                    setActiveBit(this, true);
                    if (!isPaused(this)) this._resume();
                }
            }
            _resume() {
                if (globals_exports.skipAnimation) this.finish(); else frameLoop.start(this);
            }
            _stop(goal, cancel) {
                if (isAnimating(this)) {
                    setActiveBit(this, false);
                    const anim = this.animation;
                    react_spring_shared_modern_each(anim.values, (node => {
                        node.done = true;
                    }));
                    if (anim.toValues) anim.onChange = anim.onPause = anim.onResume = void 0;
                    callFluidObservers(this, {
                        type: "idle",
                        parent: this
                    });
                    const result = cancel ? getCancelledResult(this.get()) : getFinishedResult(this.get(), checkFinished(this, goal ?? anim.to));
                    flushCalls(this._pendingCalls, result);
                    if (anim.changed) {
                        anim.changed = false;
                        sendEvent(this, "onRest", result, this);
                    }
                }
            }
        };
        function checkFinished(target, to2) {
            const goal = computeGoal(to2);
            const value = computeGoal(target.get());
            return isEqual(value, goal);
        }
        function createLoopUpdate(props, loop = props.loop, to2 = props.to) {
            const loopRet = callProp(loop);
            if (loopRet) {
                const overrides = loopRet !== true && inferTo(loopRet);
                const reverse = (overrides || props).reverse;
                const reset = !overrides || overrides.reset;
                return createUpdate({
                    ...props,
                    loop,
                    default: false,
                    pause: void 0,
                    to: !reverse || isAsyncTo(to2) ? to2 : void 0,
                    from: reset ? props.from : void 0,
                    reset,
                    ...overrides
                });
            }
        }
        function createUpdate(props) {
            const {to: to2, from} = props = inferTo(props);
            const keys = new Set;
            if (is.obj(to2)) findDefined(to2, keys);
            if (is.obj(from)) findDefined(from, keys);
            props.keys = keys.size ? Array.from(keys) : null;
            return props;
        }
        function declareUpdate(props) {
            const update2 = createUpdate(props);
            if (is.und(update2.default)) update2.default = getDefaultProps(update2);
            return update2;
        }
        function findDefined(values, keys) {
            eachProp(values, ((value, key) => value != null && keys.add(key)));
        }
        var ACTIVE_EVENTS = [ "onStart", "onRest", "onChange", "onPause", "onResume" ];
        function mergeActiveFn(target, props, type) {
            target.animation[type] = props[type] !== getDefaultProp(props, type) ? resolveProp(props[type], target.key) : void 0;
        }
        function sendEvent(target, type, ...args) {
            target.animation[type]?.(...args);
            target.defaultProps[type]?.(...args);
        }
        var BATCHED_EVENTS = [ "onStart", "onChange", "onRest" ];
        var nextId2 = 1;
        var Controller = class {
            constructor(props, flush3) {
                this.id = nextId2++;
                this.springs = {};
                this.queue = [];
                this._lastAsyncId = 0;
                this._active = new Set;
                this._changed = new Set;
                this._started = false;
                this._state = {
                    paused: false,
                    pauseQueue: new Set,
                    resumeQueue: new Set,
                    timeouts: new Set
                };
                this._events = {
                    onStart: new Map,
                    onChange: new Map,
                    onRest: new Map
                };
                this._onFrame = this._onFrame.bind(this);
                if (flush3) this._flush = flush3;
                if (props) this.start({
                    default: true,
                    ...props
                });
            }
            get idle() {
                return !this._state.asyncTo && Object.values(this.springs).every((spring => spring.idle && !spring.isDelayed && !spring.isPaused));
            }
            get item() {
                return this._item;
            }
            set item(item) {
                this._item = item;
            }
            get() {
                const values = {};
                this.each(((spring, key) => values[key] = spring.get()));
                return values;
            }
            set(values) {
                for (const key in values) {
                    const value = values[key];
                    if (!is.und(value)) this.springs[key].set(value);
                }
            }
            update(props) {
                if (props) this.queue.push(createUpdate(props));
                return this;
            }
            start(props) {
                let {queue} = this;
                if (props) queue = toArray(props).map(createUpdate); else this.queue = [];
                if (this._flush) return this._flush(this, queue);
                prepareKeys(this, queue);
                return flushUpdateQueue(this, queue);
            }
            stop(arg, keys) {
                if (arg !== !!arg) keys = arg;
                if (keys) {
                    const springs = this.springs;
                    react_spring_shared_modern_each(toArray(keys), (key => springs[key].stop(!!arg)));
                } else {
                    stopAsync(this._state, this._lastAsyncId);
                    this.each((spring => spring.stop(!!arg)));
                }
                return this;
            }
            pause(keys) {
                if (is.und(keys)) this.start({
                    pause: true
                }); else {
                    const springs = this.springs;
                    react_spring_shared_modern_each(toArray(keys), (key => springs[key].pause()));
                }
                return this;
            }
            resume(keys) {
                if (is.und(keys)) this.start({
                    pause: false
                }); else {
                    const springs = this.springs;
                    react_spring_shared_modern_each(toArray(keys), (key => springs[key].resume()));
                }
                return this;
            }
            each(iterator) {
                eachProp(this.springs, iterator);
            }
            _onFrame() {
                const {onStart, onChange, onRest} = this._events;
                const active = this._active.size > 0;
                const changed = this._changed.size > 0;
                if (active && !this._started || changed && !this._started) {
                    this._started = true;
                    flush(onStart, (([onStart2, result]) => {
                        result.value = this.get();
                        onStart2(result, this, this._item);
                    }));
                }
                const idle = !active && this._started;
                const values = changed || idle && onRest.size ? this.get() : null;
                if (changed && onChange.size) flush(onChange, (([onChange2, result]) => {
                    result.value = values;
                    onChange2(result, this, this._item);
                }));
                if (idle) {
                    this._started = false;
                    flush(onRest, (([onRest2, result]) => {
                        result.value = values;
                        onRest2(result, this, this._item);
                    }));
                }
            }
            eventObserved(event) {
                if (event.type == "change") {
                    this._changed.add(event.parent);
                    if (!event.idle) this._active.add(event.parent);
                } else if (event.type == "idle") this._active.delete(event.parent); else return;
                raf.onFrame(this._onFrame);
            }
        };
        function flushUpdateQueue(ctrl, queue) {
            return Promise.all(queue.map((props => flushUpdate(ctrl, props)))).then((results => getCombinedResult(ctrl, results)));
        }
        async function flushUpdate(ctrl, props, isLoop) {
            const {keys, to: to2, from, loop, onRest, onResolve} = props;
            const defaults2 = is.obj(props.default) && props.default;
            if (loop) props.loop = false;
            if (to2 === false) props.to = null;
            if (from === false) props.from = null;
            const asyncTo = is.arr(to2) || is.fun(to2) ? to2 : void 0;
            if (asyncTo) {
                props.to = void 0;
                props.onRest = void 0;
                if (defaults2) defaults2.onRest = void 0;
            } else react_spring_shared_modern_each(BATCHED_EVENTS, (key => {
                const handler = props[key];
                if (is.fun(handler)) {
                    const queue = ctrl["_events"][key];
                    props[key] = ({finished, cancelled}) => {
                        const result2 = queue.get(handler);
                        if (result2) {
                            if (!finished) result2.finished = false;
                            if (cancelled) result2.cancelled = true;
                        } else queue.set(handler, {
                            value: null,
                            finished: finished || false,
                            cancelled: cancelled || false
                        });
                    };
                    if (defaults2) defaults2[key] = props[key];
                }
            }));
            const state = ctrl["_state"];
            if (props.pause === !state.paused) {
                state.paused = props.pause;
                flushCalls(props.pause ? state.pauseQueue : state.resumeQueue);
            } else if (state.paused) props.pause = true;
            const promises = (keys || Object.keys(ctrl.springs)).map((key => ctrl.springs[key].start(props)));
            const cancel = props.cancel === true || getDefaultProp(props, "cancel") === true;
            if (asyncTo || cancel && state.asyncId) promises.push(scheduleProps(++ctrl["_lastAsyncId"], {
                props,
                state,
                actions: {
                    pause: noop,
                    resume: noop,
                    start(props2, resolve) {
                        if (cancel) {
                            stopAsync(state, ctrl["_lastAsyncId"]);
                            resolve(getCancelledResult(ctrl));
                        } else {
                            props2.onRest = onRest;
                            resolve(runAsync(asyncTo, props2, state, ctrl));
                        }
                    }
                }
            }));
            if (state.paused) await new Promise((resume => {
                state.resumeQueue.add(resume);
            }));
            const result = getCombinedResult(ctrl, await Promise.all(promises));
            if (loop && result.finished && !(isLoop && result.noop)) {
                const nextProps = createLoopUpdate(props, loop, to2);
                if (nextProps) {
                    prepareKeys(ctrl, [ nextProps ]);
                    return flushUpdate(ctrl, nextProps, true);
                }
            }
            if (onResolve) raf.batchedUpdates((() => onResolve(result, ctrl, ctrl.item)));
            return result;
        }
        function getSprings(ctrl, props) {
            const springs = {
                ...ctrl.springs
            };
            if (props) react_spring_shared_modern_each(toArray(props), (props2 => {
                if (is.und(props2.keys)) props2 = createUpdate(props2);
                if (!is.obj(props2.to)) props2 = {
                    ...props2,
                    to: void 0
                };
                prepareSprings(springs, props2, (key => createSpring(key)));
            }));
            setSprings(ctrl, springs);
            return springs;
        }
        function setSprings(ctrl, springs) {
            eachProp(springs, ((spring, key) => {
                if (!ctrl.springs[key]) {
                    ctrl.springs[key] = spring;
                    addFluidObserver(spring, ctrl);
                }
            }));
        }
        function createSpring(key, observer) {
            const spring = new SpringValue;
            spring.key = key;
            if (observer) addFluidObserver(spring, observer);
            return spring;
        }
        function prepareSprings(springs, props, create) {
            if (props.keys) react_spring_shared_modern_each(props.keys, (key => {
                const spring = springs[key] || (springs[key] = create(key));
                spring["_prepareNode"](props);
            }));
        }
        function prepareKeys(ctrl, queue) {
            react_spring_shared_modern_each(queue, (props => {
                prepareSprings(ctrl.springs, props, (key => createSpring(key, ctrl)));
            }));
        }
        var SpringContext = ({children, ...props}) => {
            const inherited = (0, react.useContext)(ctx);
            const pause = props.pause || !!inherited.pause, immediate = props.immediate || !!inherited.immediate;
            props = useMemoOne((() => ({
                pause,
                immediate
            })), [ pause, immediate ]);
            const {Provider} = ctx;
            return react.createElement(Provider, {
                value: props
            }, children);
        };
        var ctx = makeContext(SpringContext, {});
        SpringContext.Provider = ctx.Provider;
        SpringContext.Consumer = ctx.Consumer;
        function makeContext(target, init) {
            Object.assign(target, react.createContext(init));
            target.Provider._context = target;
            target.Consumer._context = target;
            return target;
        }
        var SpringRef = () => {
            const current = [];
            const SpringRef2 = function(props) {
                deprecateDirectCall();
                const results = [];
                react_spring_shared_modern_each(current, ((ctrl, i) => {
                    if (is.und(props)) results.push(ctrl.start()); else {
                        const update2 = _getProps(props, ctrl, i);
                        if (update2) results.push(ctrl.start(update2));
                    }
                }));
                return results;
            };
            SpringRef2.current = current;
            SpringRef2.add = function(ctrl) {
                if (!current.includes(ctrl)) current.push(ctrl);
            };
            SpringRef2.delete = function(ctrl) {
                const i = current.indexOf(ctrl);
                if (~i) current.splice(i, 1);
            };
            SpringRef2.pause = function() {
                react_spring_shared_modern_each(current, (ctrl => ctrl.pause(...arguments)));
                return this;
            };
            SpringRef2.resume = function() {
                react_spring_shared_modern_each(current, (ctrl => ctrl.resume(...arguments)));
                return this;
            };
            SpringRef2.set = function(values) {
                react_spring_shared_modern_each(current, ((ctrl, i) => {
                    const update2 = is.fun(values) ? values(i, ctrl) : values;
                    if (update2) ctrl.set(update2);
                }));
            };
            SpringRef2.start = function(props) {
                const results = [];
                react_spring_shared_modern_each(current, ((ctrl, i) => {
                    if (is.und(props)) results.push(ctrl.start()); else {
                        const update2 = this._getProps(props, ctrl, i);
                        if (update2) results.push(ctrl.start(update2));
                    }
                }));
                return results;
            };
            SpringRef2.stop = function() {
                react_spring_shared_modern_each(current, (ctrl => ctrl.stop(...arguments)));
                return this;
            };
            SpringRef2.update = function(props) {
                react_spring_shared_modern_each(current, ((ctrl, i) => ctrl.update(this._getProps(props, ctrl, i))));
                return this;
            };
            const _getProps = function(arg, ctrl, index) {
                return is.fun(arg) ? arg(index, ctrl) : arg;
            };
            SpringRef2._getProps = _getProps;
            return SpringRef2;
        };
        function useSprings(length, props, deps) {
            const propsFn = is.fun(props) && props;
            if (propsFn && !deps) deps = [];
            const ref = (0, react.useMemo)((() => propsFn || arguments.length == 3 ? SpringRef() : void 0), []);
            const layoutId = (0, react.useRef)(0);
            const forceUpdate = useForceUpdate();
            const state = (0, react.useMemo)((() => ({
                ctrls: [],
                queue: [],
                flush(ctrl, updates2) {
                    const springs2 = getSprings(ctrl, updates2);
                    const canFlushSync = layoutId.current > 0 && !state.queue.length && !Object.keys(springs2).some((key => !ctrl.springs[key]));
                    return canFlushSync ? flushUpdateQueue(ctrl, updates2) : new Promise((resolve => {
                        setSprings(ctrl, springs2);
                        state.queue.push((() => {
                            resolve(flushUpdateQueue(ctrl, updates2));
                        }));
                        forceUpdate();
                    }));
                }
            })), []);
            const ctrls = (0, react.useRef)([ ...state.ctrls ]);
            const updates = [];
            const prevLength = usePrev(length) || 0;
            (0, react.useMemo)((() => {
                react_spring_shared_modern_each(ctrls.current.slice(length, prevLength), (ctrl => {
                    detachRefs(ctrl, ref);
                    ctrl.stop(true);
                }));
                ctrls.current.length = length;
                declareUpdates(prevLength, length);
            }), [ length ]);
            (0, react.useMemo)((() => {
                declareUpdates(0, Math.min(prevLength, length));
            }), deps);
            function declareUpdates(startIndex, endIndex) {
                for (let i = startIndex; i < endIndex; i++) {
                    const ctrl = ctrls.current[i] || (ctrls.current[i] = new Controller(null, state.flush));
                    const update2 = propsFn ? propsFn(i, ctrl) : props[i];
                    if (update2) updates[i] = declareUpdate(update2);
                }
            }
            const springs = ctrls.current.map(((ctrl, i) => getSprings(ctrl, updates[i])));
            const context = (0, react.useContext)(SpringContext);
            const prevContext = usePrev(context);
            const hasContext = context !== prevContext && hasProps(context);
            react_spring_shared_modern_useIsomorphicLayoutEffect((() => {
                layoutId.current++;
                state.ctrls = ctrls.current;
                const {queue} = state;
                if (queue.length) {
                    state.queue = [];
                    react_spring_shared_modern_each(queue, (cb => cb()));
                }
                react_spring_shared_modern_each(ctrls.current, ((ctrl, i) => {
                    ref?.add(ctrl);
                    if (hasContext) ctrl.start({
                        default: context
                    });
                    const update2 = updates[i];
                    if (update2) {
                        replaceRef(ctrl, update2.ref);
                        if (ctrl.ref) ctrl.queue.push(update2); else ctrl.start(update2);
                    }
                }));
            }));
            useOnce((() => () => {
                react_spring_shared_modern_each(state.ctrls, (ctrl => ctrl.stop(true)));
            }));
            const values = springs.map((x => ({
                ...x
            })));
            return ref ? [ values, ref ] : values;
        }
        function useSpring(props, deps) {
            const isFn = is.fun(props);
            const [[values], ref] = useSprings(1, isFn ? props : [ props ], isFn ? deps || [] : deps);
            return isFn || arguments.length == 2 ? [ values, ref ] : values;
        }
        var Interpolation = class extends FrameValue {
            constructor(source, args) {
                super();
                this.source = source;
                this.idle = true;
                this._active = new Set;
                this.calc = createInterpolator(...args);
                const value = this._get();
                const nodeType = getAnimatedType(value);
                setAnimated(this, nodeType.create(value));
            }
            advance(_dt) {
                const value = this._get();
                const oldValue = this.get();
                if (!isEqual(value, oldValue)) {
                    getAnimated(this).setValue(value);
                    this._onChange(value, this.idle);
                }
                if (!this.idle && checkIdle(this._active)) becomeIdle(this);
            }
            _get() {
                const inputs = is.arr(this.source) ? this.source.map(getFluidValue) : toArray(getFluidValue(this.source));
                return this.calc(...inputs);
            }
            _start() {
                if (this.idle && !checkIdle(this._active)) {
                    this.idle = false;
                    react_spring_shared_modern_each(getPayload(this), (node => {
                        node.done = false;
                    }));
                    if (globals_exports.skipAnimation) {
                        raf.batchedUpdates((() => this.advance()));
                        becomeIdle(this);
                    } else frameLoop.start(this);
                }
            }
            _attach() {
                let priority = 1;
                react_spring_shared_modern_each(toArray(this.source), (source => {
                    if (hasFluidValue(source)) addFluidObserver(source, this);
                    if (isFrameValue(source)) {
                        if (!source.idle) this._active.add(source);
                        priority = Math.max(priority, source.priority + 1);
                    }
                }));
                this.priority = priority;
                this._start();
            }
            _detach() {
                react_spring_shared_modern_each(toArray(this.source), (source => {
                    if (hasFluidValue(source)) removeFluidObserver(source, this);
                }));
                this._active.clear();
                becomeIdle(this);
            }
            eventObserved(event) {
                if (event.type == "change") if (event.idle) this.advance(); else {
                    this._active.add(event.parent);
                    this._start();
                } else if (event.type == "idle") this._active.delete(event.parent); else if (event.type == "priority") this.priority = toArray(this.source).reduce(((highest, parent) => Math.max(highest, (isFrameValue(parent) ? parent.priority : 0) + 1)), 0);
            }
        };
        function isIdle(source) {
            return source.idle !== false;
        }
        function checkIdle(active) {
            return !active.size || Array.from(active).every(isIdle);
        }
        function becomeIdle(self) {
            if (!self.idle) {
                self.idle = true;
                react_spring_shared_modern_each(getPayload(self), (node => {
                    node.done = true;
                }));
                callFluidObservers(self, {
                    type: "idle",
                    parent: self
                });
            }
        }
        globals_exports.assign({
            createStringInterpolator: createStringInterpolator2,
            to: (source, args) => new Interpolation(source, args)
        });
        frameLoop.advance;
        var react_dom = __webpack_require__(935);
        var isCustomPropRE = /^--/;
        function dangerousStyleValue(name, value) {
            if (value == null || typeof value === "boolean" || value === "") return "";
            if (typeof value === "number" && value !== 0 && !isCustomPropRE.test(name) && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) return value + "px";
            return ("" + value).trim();
        }
        var attributeCache = {};
        function applyAnimatedValues(instance, props) {
            if (!instance.nodeType || !instance.setAttribute) return false;
            const isFilterElement = instance.nodeName === "filter" || instance.parentNode && instance.parentNode.nodeName === "filter";
            const {style, children, scrollTop, scrollLeft, viewBox, ...attributes} = props;
            const values = Object.values(attributes);
            const names = Object.keys(attributes).map((name => isFilterElement || instance.hasAttribute(name) ? name : attributeCache[name] || (attributeCache[name] = name.replace(/([A-Z])/g, (n => "-" + n.toLowerCase())))));
            if (children !== void 0) instance.textContent = children;
            for (const name in style) if (style.hasOwnProperty(name)) {
                const value = dangerousStyleValue(name, style[name]);
                if (isCustomPropRE.test(name)) instance.style.setProperty(name, value); else instance.style[name] = value;
            }
            names.forEach(((name, i) => {
                instance.setAttribute(name, values[i]);
            }));
            if (scrollTop !== void 0) instance.scrollTop = scrollTop;
            if (scrollLeft !== void 0) instance.scrollLeft = scrollLeft;
            if (viewBox !== void 0) instance.setAttribute("viewBox", viewBox);
        }
        var isUnitlessNumber = {
            animationIterationCount: true,
            borderImageOutset: true,
            borderImageSlice: true,
            borderImageWidth: true,
            boxFlex: true,
            boxFlexGroup: true,
            boxOrdinalGroup: true,
            columnCount: true,
            columns: true,
            flex: true,
            flexGrow: true,
            flexPositive: true,
            flexShrink: true,
            flexNegative: true,
            flexOrder: true,
            gridRow: true,
            gridRowEnd: true,
            gridRowSpan: true,
            gridRowStart: true,
            gridColumn: true,
            gridColumnEnd: true,
            gridColumnSpan: true,
            gridColumnStart: true,
            fontWeight: true,
            lineClamp: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            tabSize: true,
            widows: true,
            zIndex: true,
            zoom: true,
            fillOpacity: true,
            floodOpacity: true,
            stopOpacity: true,
            strokeDasharray: true,
            strokeDashoffset: true,
            strokeMiterlimit: true,
            strokeOpacity: true,
            strokeWidth: true
        };
        var prefixKey = (prefix, key) => prefix + key.charAt(0).toUpperCase() + key.substring(1);
        var prefixes = [ "Webkit", "Ms", "Moz", "O" ];
        isUnitlessNumber = Object.keys(isUnitlessNumber).reduce(((acc, prop) => {
            prefixes.forEach((prefix => acc[prefixKey(prefix, prop)] = acc[prop]));
            return acc;
        }), isUnitlessNumber);
        var domTransforms = /^(matrix|translate|scale|rotate|skew)/;
        var pxTransforms = /^(translate)/;
        var degTransforms = /^(rotate|skew)/;
        var addUnit = (value, unit) => is.num(value) && value !== 0 ? value + unit : value;
        var isValueIdentity = (value, id) => is.arr(value) ? value.every((v => isValueIdentity(v, id))) : is.num(value) ? value === id : parseFloat(value) === id;
        var AnimatedStyle = class extends AnimatedObject {
            constructor({x, y, z, ...style}) {
                const inputs = [];
                const transforms = [];
                if (x || y || z) {
                    inputs.push([ x || 0, y || 0, z || 0 ]);
                    transforms.push((xyz => [ `translate3d(${xyz.map((v => addUnit(v, "px"))).join(",")})`, isValueIdentity(xyz, 0) ]));
                }
                eachProp(style, ((value, key) => {
                    if (key === "transform") {
                        inputs.push([ value || "" ]);
                        transforms.push((transform => [ transform, transform === "" ]));
                    } else if (domTransforms.test(key)) {
                        delete style[key];
                        if (is.und(value)) return;
                        const unit = pxTransforms.test(key) ? "px" : degTransforms.test(key) ? "deg" : "";
                        inputs.push(toArray(value));
                        transforms.push(key === "rotate3d" ? ([x2, y2, z2, deg]) => [ `rotate3d(${x2},${y2},${z2},${addUnit(deg, unit)})`, isValueIdentity(deg, 0) ] : input => [ `${key}(${input.map((v => addUnit(v, unit))).join(",")})`, isValueIdentity(input, key.startsWith("scale") ? 1 : 0) ]);
                    }
                }));
                if (inputs.length) style.transform = new FluidTransform(inputs, transforms);
                super(style);
            }
        };
        var FluidTransform = class extends FluidValue {
            constructor(inputs, transforms) {
                super();
                this.inputs = inputs;
                this.transforms = transforms;
                this._value = null;
            }
            get() {
                return this._value || (this._value = this._get());
            }
            _get() {
                let transform = "";
                let identity = true;
                react_spring_shared_modern_each(this.inputs, ((input, i) => {
                    const arg1 = getFluidValue(input[0]);
                    const [t, id] = this.transforms[i](is.arr(arg1) ? arg1 : input.map(getFluidValue));
                    transform += " " + t;
                    identity = identity && id;
                }));
                return identity ? "none" : transform;
            }
            observerAdded(count) {
                if (count == 1) react_spring_shared_modern_each(this.inputs, (input => react_spring_shared_modern_each(input, (value => hasFluidValue(value) && addFluidObserver(value, this)))));
            }
            observerRemoved(count) {
                if (count == 0) react_spring_shared_modern_each(this.inputs, (input => react_spring_shared_modern_each(input, (value => hasFluidValue(value) && removeFluidObserver(value, this)))));
            }
            eventObserved(event) {
                if (event.type == "change") this._value = null;
                callFluidObservers(this, event);
            }
        };
        var primitives = [ "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan" ];
        globals_exports.assign({
            batchedUpdates: react_dom.unstable_batchedUpdates,
            createStringInterpolator: createStringInterpolator2,
            colors: colors2
        });
        var host = createHost(primitives, {
            applyAnimatedValues,
            createAnimatedStyle: style => new AnimatedStyle(style),
            getComponentProps: ({scrollTop, scrollLeft, ...props}) => props
        });
        var animated = host.animated;
        const App = () => {
            const [open, setOpen] = (0, react.useState)(true);
            const fade = useSpring({
                from: {
                    opacity: 0
                },
                opacity: 1,
                config: {
                    duration: 500
                }
            });
            return react.createElement(react.Fragment, null, react.createElement(animated.div, {
                className: "wrapper",
                style: fade
            }, open ? react.createElement(popup_SignUpPopup, {
                setOpen
            }) : null, react.createElement("div", {
                className: "main-wrapper"
            }, react.createElement(header_Header, null), react.createElement(main_Main, {
                clazz: "main"
            })), react.createElement(SectionTemplate_SectionTemplate, {
                clazz: "who",
                folder: "whoWeAre",
                img: "oliveOil.jpg",
                title: "WHO WE ARE",
                p: "Company we are proud to deliver hight quality standarts. In natural enviroment production, delivery and flexibility. organic bio oil a special production from our farm."
            }), react.createElement(whatWeDo_WhatWeDo, null), react.createElement(healthBanner_HealthBanner, null), react.createElement(SectionTemplate_SectionTemplate, {
                folder: "product",
                img: "product.jpeg",
                title: "PRODUCT",
                p: "Company we are proud to deliver hight quality standarts. In natural enviroment production, delivery and flexibility. organic bio oil a special production from our farm.",
                clazz: "product"
            }), react.createElement(letsBusiness_LetsBusiness, null), react.createElement(footer_Footer, null)));
        };
        const app_App = App;
        const root = document.querySelector("#root");
        client.createRoot(root).render(react.createElement(react.StrictMode, null, react.createElement(app_App, null)));
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(webP.height == 2);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = support === true ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    for (let index = 0; index < lock_padding.length; index++) {
                        const el = lock_padding[index];
                        el.style.paddingRight = "0px";
                    }
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                }
                body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        let addWindowScrollEvent = false;
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        window["FLS"] = true;
        isWebp();
        menuInit();
    })();
})();