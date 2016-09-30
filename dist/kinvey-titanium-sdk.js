/**
 * @preserve
 * kinvey-titanium-sdk v3.1.0
 * Kinvey JavaScript SDK for Titanium applications.
 * http://www.kinvey.com
 *
 * Copyright (c) 2016, Kinvey.
 * All rights reserved.
 *
 * Released under the Apache-2.0 license.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Kinvey"] = factory();
	else
		root["Kinvey"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(53);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(51);
	module.exports = __webpack_require__(8).Symbol;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(3)
	  , has            = __webpack_require__(4)
	  , DESCRIPTORS    = __webpack_require__(5)
	  , $export        = __webpack_require__(7)
	  , redefine       = __webpack_require__(17)
	  , META           = __webpack_require__(21).KEY
	  , $fails         = __webpack_require__(6)
	  , shared         = __webpack_require__(22)
	  , setToStringTag = __webpack_require__(23)
	  , uid            = __webpack_require__(18)
	  , wks            = __webpack_require__(24)
	  , wksExt         = __webpack_require__(25)
	  , wksDefine      = __webpack_require__(26)
	  , keyOf          = __webpack_require__(28)
	  , enumKeys       = __webpack_require__(41)
	  , isArray        = __webpack_require__(44)
	  , anObject       = __webpack_require__(11)
	  , toIObject      = __webpack_require__(31)
	  , toPrimitive    = __webpack_require__(15)
	  , createDesc     = __webpack_require__(16)
	  , _create        = __webpack_require__(45)
	  , gOPNExt        = __webpack_require__(48)
	  , $GOPD          = __webpack_require__(50)
	  , $DP            = __webpack_require__(10)
	  , $keys          = __webpack_require__(29)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(49).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(43).f  = $propertyIsEnumerable;
	  __webpack_require__(42).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(27)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 3 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 4 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(6)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(3)
	  , core      = __webpack_require__(8)
	  , hide      = __webpack_require__(9)
	  , redefine  = __webpack_require__(17)
	  , ctx       = __webpack_require__(19)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(10)
	  , createDesc = __webpack_require__(16);
	module.exports = __webpack_require__(5) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(11)
	  , IE8_DOM_DEFINE = __webpack_require__(13)
	  , toPrimitive    = __webpack_require__(15)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(5) && !__webpack_require__(6)(function(){
	  return Object.defineProperty(__webpack_require__(14)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12)
	  , document = __webpack_require__(3).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(12);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(3)
	  , hide      = __webpack_require__(9)
	  , has       = __webpack_require__(4)
	  , SRC       = __webpack_require__(18)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);

	__webpack_require__(8).inspectSource = function(it){
	  return $toString.call(it);
	};

	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 18 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(20);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(18)('meta')
	  , isObject = __webpack_require__(12)
	  , has      = __webpack_require__(4)
	  , setDesc  = __webpack_require__(10).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(6)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(3)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(10).f
	  , has = __webpack_require__(4)
	  , TAG = __webpack_require__(24)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(22)('wks')
	  , uid        = __webpack_require__(18)
	  , Symbol     = __webpack_require__(3).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(24);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(3)
	  , core           = __webpack_require__(8)
	  , LIBRARY        = __webpack_require__(27)
	  , wksExt         = __webpack_require__(25)
	  , defineProperty = __webpack_require__(10).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(29)
	  , toIObject = __webpack_require__(31);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(30)
	  , enumBugKeys = __webpack_require__(40);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(4)
	  , toIObject    = __webpack_require__(31)
	  , arrayIndexOf = __webpack_require__(35)(false)
	  , IE_PROTO     = __webpack_require__(39)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(32)
	  , defined = __webpack_require__(34);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(33);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(31)
	  , toLength  = __webpack_require__(36)
	  , toIndex   = __webpack_require__(38);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(37)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(37)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(22)('keys')
	  , uid    = __webpack_require__(18);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(29)
	  , gOPS    = __webpack_require__(42)
	  , pIE     = __webpack_require__(43);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 43 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(33);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(11)
	  , dPs         = __webpack_require__(46)
	  , enumBugKeys = __webpack_require__(40)
	  , IE_PROTO    = __webpack_require__(39)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(14)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(47).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(10)
	  , anObject = __webpack_require__(11)
	  , getKeys  = __webpack_require__(29);

	module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3).document && document.documentElement;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(31)
	  , gOPN      = __webpack_require__(49).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(30)
	  , hiddenKeys = __webpack_require__(40).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(43)
	  , createDesc     = __webpack_require__(16)
	  , toIObject      = __webpack_require__(31)
	  , toPrimitive    = __webpack_require__(15)
	  , has            = __webpack_require__(4)
	  , IE8_DOM_DEFINE = __webpack_require__(13)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(5) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(52)
	  , test    = {};
	test[__webpack_require__(24)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(17)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(33)
	  , TAG = __webpack_require__(24)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(54);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Export
	module.exports = _index2.default;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Kinvey = undefined;

	var _kinvey = __webpack_require__(55);

	var _kinvey2 = _interopRequireDefault(_kinvey);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Export
	exports.Kinvey = _kinvey2.default;

	// Export default

	exports.default = _kinvey2.default;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _kinveyNodeSdk = __webpack_require__(56);

	var _kinveyNodeSdk2 = _interopRequireDefault(_kinveyNodeSdk);

	var _rack = __webpack_require__(345);

	var _device = __webpack_require__(373);

	var _device2 = _interopRequireDefault(_device);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Kinvey = function (_NodeKinvey) {
	  _inherits(Kinvey, _NodeKinvey);

	  function Kinvey() {
	    _classCallCheck(this, Kinvey);

	    return _possibleConstructorReturn(this, (Kinvey.__proto__ || Object.getPrototypeOf(Kinvey)).apply(this, arguments));
	  }

	  _createClass(Kinvey, null, [{
	    key: 'init',
	    value: function init(options) {
	      options.cacheRack = new _rack.CacheRack();
	      options.networkRack = new _rack.NetworkRack();
	      options.deviceClass = _device2.default;

	      // Initialize Kinvey
	      var client = _get(Kinvey.__proto__ || Object.getPrototypeOf(Kinvey), 'init', this).call(this, options);

	      // // Add Push module to Kinvey
	      // this.Push = new Push();

	      // Return the client
	      return client;
	    }
	  }]);

	  return Kinvey;
	}(_kinveyNodeSdk2.default);

	exports.default = Kinvey;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Kinvey = undefined;

	var _kinvey = __webpack_require__(57);

	var _kinvey2 = _interopRequireDefault(_kinvey);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Kinvey = _kinvey2.default;
	exports.default = _kinvey2.default;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _client = __webpack_require__(59);

	var _endpoint = __webpack_require__(235);

	var _query = __webpack_require__(274);

	var _aggregation = __webpack_require__(288);

	var _datastore = __webpack_require__(289);

	var _entity = __webpack_require__(295);

	var _social = __webpack_require__(260);

	var _request = __webpack_require__(236);

	var _errors = __webpack_require__(183);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var appdataNamespace = process && process.env && process.env.KINVEY_DATASTORE_NAMESPACE || undefined || 'appdata';

	var Kinvey = function () {
	  function Kinvey() {
	    _classCallCheck(this, Kinvey);
	  }

	  _createClass(Kinvey, null, [{
	    key: 'init',
	    value: function init(options) {
	      if (!options.appKey) {
	        throw new _errors.KinveyError('No App Key was provided. ' + 'Unable to create a new Client without an App Key.');
	      }

	      if (!options.appSecret && !options.masterSecret) {
	        throw new _errors.KinveyError('No App Secret or Master Secret was provided. ' + 'Unable to create a new Client without an App Key.');
	      }

	      var client = _client.Client.init(options);

	      this.CustomEndpoint = _endpoint.CustomEndpoint;
	      this.DataStore = _datastore.DataStore;
	      this.Files = new _datastore.FileStore();
	      this.User = _entity.User;
	      this.UserStore = _entity.UserStore;

	      return client;
	    }
	  }, {
	    key: 'ping',
	    value: function ping() {
	      var client = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _client.Client.sharedInstance();

	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.GET,
	        authType: _request.AuthType.All,
	        url: _url2.default.format({
	          protocol: client.protocol,
	          host: client.host,
	          pathname: appdataNamespace + '/' + client.appKey
	        })
	      });

	      return request.execute().then(function (response) {
	        return response.data;
	      });
	    }
	  }, {
	    key: 'client',
	    get: function get() {
	      return _client.Client.sharedInstance();
	    }
	  }, {
	    key: 'appVersion',
	    get: function get() {
	      return this.client.appVersion;
	    },
	    set: function set(appVersion) {
	      this.client.appVersion = appVersion;
	    }
	  }]);

	  return Kinvey;
	}();

	Kinvey.Acl = _entity.Acl;
	Kinvey.Aggregation = _aggregation.Aggregation;
	Kinvey.AuthorizationGrant = _social.AuthorizationGrant;
	Kinvey.DataStoreType = _datastore.DataStoreType;
	Kinvey.Metadata = _entity.Metadata;
	Kinvey.Query = _query.Query;
	Kinvey.SocialIdentity = _social.SocialIdentity;

	exports.default = Kinvey;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 58 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Client = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _rack = __webpack_require__(60);

	var _rack2 = _interopRequireDefault(_rack);

	var _errors = __webpack_require__(183);

	var _utils = __webpack_require__(185);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	var _assign = __webpack_require__(220);

	var _assign2 = _interopRequireDefault(_assign);

	var _isString = __webpack_require__(234);

	var _isString2 = _interopRequireDefault(_isString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _sharedInstance = null;

	var Client = exports.Client = function () {
	  function Client() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Client);

	    options = (0, _assign2.default)({
	      apiHostname: 'https://baas.kinvey.com',
	      micHostname: 'https://auth.kinvey.com',
	      liveServiceHostname: 'https://kls.kinvey.com'
	    }, options);

	    if (options.apiHostname && (0, _isString2.default)(options.apiHostname)) {
	      var apiHostnameParsed = _url2.default.parse(options.apiHostname);
	      options.apiProtocol = apiHostnameParsed.protocol;
	      options.apiHost = apiHostnameParsed.host;
	    }

	    if (options.micHostname && (0, _isString2.default)(options.micHostname)) {
	      var micHostnameParsed = _url2.default.parse(options.micHostname);
	      options.micProtocol = micHostnameParsed.protocol;
	      options.micHost = micHostnameParsed.host;
	    }

	    if (options.liveServiceHostname && (0, _isString2.default)(options.liveServiceHostname)) {
	      var liveServiceHostnameParsed = _url2.default.parse(options.liveServiceHostname);
	      options.liveServiceProtocol = liveServiceHostnameParsed.protocol;
	      options.liveServiceHost = liveServiceHostnameParsed.host;
	    }

	    this.apiProtocol = options.apiProtocol;

	    this.apiHost = options.apiHost;

	    this.micProtocol = options.micProtocol;

	    this.micHost = options.micHost;

	    this.liveServiceProtocol = options.liveServiceProtocol;

	    this.liveServiceHost = options.liveServiceHost;

	    this.appKey = options.appKey;

	    this.appSecret = options.appSecret;

	    this.masterSecret = options.masterSecret;

	    this.encryptionKey = options.encryptionKey;

	    this.appVersion = options.appVersion;

	    this.cacheRack = options.cacheRack;

	    this.networkRack = options.networkRack;

	    this.deviceClass = options.deviceClass || _utils.Device;

	    this.popupClass = options.popupClass;
	  }

	  _createClass(Client, [{
	    key: 'toPlainObject',
	    value: function toPlainObject() {
	      return {
	        apiHostname: this.apiHostname,
	        apiProtocol: this.apiProtocol,
	        apiHost: this.apiHost,
	        micHostname: this.micHostname,
	        micProtocol: this.micProtocol,
	        micHost: this.micHost,
	        liveServiceHostname: this.liveServiceHostname,
	        liveServiceHost: this.liveServiceHost,
	        liveServiceProtocol: this.liveServiceProtocol,
	        appKey: this.appKey,
	        appSecret: this.appSecret,
	        masterSecret: this.masterSecret,
	        encryptionKey: this.encryptionKey,
	        appVersion: this.appVersion
	      };
	    }
	  }, {
	    key: 'apiHostname',
	    get: function get() {
	      return _url2.default.format({
	        protocol: this.apiProtocol,
	        host: this.apiHost
	      });
	    }
	  }, {
	    key: 'baseUrl',
	    get: function get() {
	      return this.apiHostname;
	    }
	  }, {
	    key: 'protocol',
	    get: function get() {
	      return this.apiProtocol;
	    }
	  }, {
	    key: 'host',
	    get: function get() {
	      return this.apiHost;
	    }
	  }, {
	    key: 'micHostname',
	    get: function get() {
	      return _url2.default.format({
	        protocol: this.micProtocol,
	        host: this.micHost
	      });
	    }
	  }, {
	    key: 'liveServiceHostname',
	    get: function get() {
	      return _url2.default.format({
	        protocol: this.liveServiceProtocol,
	        host: this.liveServiceHost
	      });
	    }
	  }, {
	    key: 'activeUser',
	    get: function get() {
	      return (0, _utils.getActiveUser)(this);
	    }
	  }, {
	    key: 'appVersion',
	    get: function get() {
	      return this._appVersion;
	    },
	    set: function set(appVersion) {
	      if (appVersion && !(0, _isString2.default)(appVersion)) {
	        appVersion = String(appVersion);
	      }

	      this._appVersion = appVersion;
	    }
	  }, {
	    key: 'cacheRack',
	    get: function get() {
	      return this._cacheRack;
	    },
	    set: function set(rack) {
	      if (rack && !(rack instanceof _rack2.default)) {
	        throw new _errors.KinveyError('rack must be an instance of the Rack class.');
	      }

	      this._cacheRack = rack;
	    }
	  }, {
	    key: 'networkRack',
	    get: function get() {
	      return this._networkRack;
	    },
	    set: function set(rack) {
	      if (rack && !(rack instanceof _rack2.default)) {
	        throw new _errors.KinveyError('rack must be an instance of the Rack class.');
	      }

	      this._networkRack = rack;
	    }
	  }], [{
	    key: 'init',
	    value: function init(options) {
	      var client = new Client(options);
	      _sharedInstance = client;
	      return client;
	    }
	  }, {
	    key: 'sharedInstance',
	    value: function sharedInstance() {
	      if (!_sharedInstance) {
	        throw new _errors.KinveyError('You have not initialized the library. ' + 'Please call Kinvey.init() to initialize the library.');
	      }

	      return _sharedInstance;
	    }
	  }]);

	  return Client;
	}();

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _rack = __webpack_require__(61);

	var _rack2 = _interopRequireDefault(_rack);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _rack2.default;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _middleware = __webpack_require__(62);

	var _middleware2 = _interopRequireDefault(_middleware);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _findIndex = __webpack_require__(66);

	var _findIndex2 = _interopRequireDefault(_findIndex);

	var _reduce = __webpack_require__(175);

	var _reduce2 = _interopRequireDefault(_reduce);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Rack = function (_Middleware) {
	  _inherits(Rack, _Middleware);

	  function Rack() {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Rack';

	    _classCallCheck(this, Rack);

	    var _this = _possibleConstructorReturn(this, (Rack.__proto__ || Object.getPrototypeOf(Rack)).call(this, name));

	    _this.middlewares = [];
	    _this.canceled = false;
	    return _this;
	  }

	  _createClass(Rack, [{
	    key: 'getMiddleware',
	    value: function getMiddleware() {
	      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

	      var middlewares = this.middlewares;

	      if (index < -1 || index >= middlewares.length) {
	        throw new Error('Index ' + index + ' is out of bounds.');
	      }

	      return middlewares[index];
	    }
	  }, {
	    key: 'use',
	    value: function use(middleware) {
	      if (middleware) {
	        if (middleware instanceof _middleware2.default) {
	          this.middlewares.push(middleware);
	          return;
	        }

	        throw new Error('Unable to use the middleware. It must be an instance of Middleware.');
	      }
	    }
	  }, {
	    key: 'useBefore',
	    value: function useBefore(middlewareClass, middleware) {
	      if (middleware) {
	        if (middleware instanceof _middleware2.default) {
	          var middlewares = this.middlewares;
	          var index = (0, _findIndex2.default)(middlewares, function (existingMiddleware) {
	            return existingMiddleware instanceof middlewareClass;
	          });

	          if (index > -1) {
	            middlewares.splice(index, 0, middleware);
	            this.middlewares = middlewares;
	          }

	          return;
	        }

	        throw new Error('Unable to use the middleware. It must be an instance of Middleware.');
	      }
	    }
	  }, {
	    key: 'useAfter',
	    value: function useAfter(middlewareClass, middleware) {
	      if (middleware) {
	        if (middleware instanceof _middleware2.default) {
	          var middlewares = this.middlewares;
	          var index = (0, _findIndex2.default)(middlewares, function (existingMiddleware) {
	            return existingMiddleware instanceof middlewareClass;
	          });

	          if (index > -1) {
	            middlewares.splice(index + 1, 0, middleware);
	            this.middlewares = middlewares;
	          }

	          return;
	        }

	        throw new Error('Unable to use the middleware. It must be an instance of Middleware.');
	      }
	    }
	  }, {
	    key: 'swap',
	    value: function swap(middlewareClass, middleware) {
	      if (middleware) {
	        if (middleware instanceof _middleware2.default) {
	          var middlewares = this.middlewares;
	          var index = (0, _findIndex2.default)(middlewares, function (existingMiddleware) {
	            return existingMiddleware instanceof middlewareClass;
	          });

	          if (index > -1) {
	            middlewares.splice(index, 1, middleware);
	            this.middlewares = middlewares;
	          }

	          return;
	        }

	        throw new Error('Unable to use the middleware. It must be an instance of Middleware.');
	      }
	    }
	  }, {
	    key: 'remove',
	    value: function remove(middlewareClass) {
	      var middlewares = this.middlewares;
	      var index = (0, _findIndex2.default)(middlewares, function (existingMiddleware) {
	        return existingMiddleware instanceof middlewareClass;
	      });

	      if (index > -1) {
	        middlewares.splice(index, 1);
	        this.middlewares = middlewares;
	        this.remove(middlewareClass);
	      }
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.middlewares = [];
	    }
	  }, {
	    key: 'execute',
	    value: function execute(req) {
	      if (!req) {
	        return _es6Promise2.default.reject(new Error('Request is undefined. Please provide a valid request.'));
	      }

	      return (0, _reduce2.default)(this.middlewares, function (promise, middleware) {
	        return promise.then(function (_ref) {
	          var request = _ref.request;
	          var response = _ref.response;
	          return middleware.handle(request || req, response);
	        });
	      }, _es6Promise2.default.resolve({ request: req })).then(function (_ref2) {
	        var response = _ref2.response;
	        return response;
	      });
	    }
	  }, {
	    key: 'cancel',
	    value: function cancel() {
	      this.canceled = true;
	    }
	  }, {
	    key: 'handle',
	    value: function handle(request) {
	      return this.execute(request);
	    }
	  }, {
	    key: 'generateTree',
	    value: function generateTree() {
	      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      var root = _get(Rack.prototype.__proto__ || Object.getPrototypeOf(Rack.prototype), 'generateTree', this).call(this, level);
	      var middlewares = this.middlewares;

	      middlewares.forEach(function (middleware) {
	        root.nodes.push(middleware.generateTree(level + 1));
	      });

	      return root;
	    }
	  }]);

	  return Rack;
	}(_middleware2.default);

	exports.default = Rack;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _asciitree = __webpack_require__(63);

	var _asciitree2 = _interopRequireDefault(_asciitree);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Middleware = function () {
	  function Middleware() {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Middleware';

	    _classCallCheck(this, Middleware);

	    this.name = name;
	  }

	  _createClass(Middleware, [{
	    key: 'handle',
	    value: function handle() {
	      return _es6Promise2.default.reject(new Error('A subclass middleware must override the handle function.'));
	    }
	  }, {
	    key: 'generateTree',
	    value: function generateTree() {
	      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      var root = {
	        value: this.name,
	        level: level,
	        nodes: []
	      };
	      return root;
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      var root = this.generateTree();
	      return _asciitree2.default.generate(root);
	    }
	  }]);

	  return Middleware;
	}();

	exports.default = Middleware;

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var levels = [];
	var c0 = String.fromCharCode(9500);
	var c1 = String.fromCharCode(9472);
	var c2 = String.fromCharCode(9492);
	var c3 = String.fromCharCode(9474);

	function compose(node, end) {
	  if (node.level === 0) {
	    return node.value;
	  }

	  var ret = '\r\n';
	  var c = end ? c2 : c0;

	  for (var i = 1; i < node.level; i += 1) {
	    ret = '' + ret + (levels[i] ? ' ' : c3);
	    ret = ret + '  ';
	  }

	  return '' + ret + c + c1 + ' ' + node.value;
	}

	var AsciiTree = function () {
	  function AsciiTree() {
	    _classCallCheck(this, AsciiTree);
	  }

	  _createClass(AsciiTree, null, [{
	    key: 'generate',
	    value: function generate() {
	      var _this = this;

	      var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var end = arguments[1];

	      var result = compose(tree, end);

	      if (tree.nodes.length > 0) {
	        (function () {
	          var last = tree.nodes.length - 1;
	          tree.nodes.forEach(function (subTree, index) {
	            levels[subTree.level] = index === last;
	            result += _this.generate(subTree, index === last);
	          });
	        })();
	      }

	      return result;
	    }
	  }]);

	  return AsciiTree;
	}();

	exports.default = AsciiTree;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.0.3+bc7e2e3c
	 */

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';

	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }

	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];

	    callback(arg);

	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(65);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;

	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }

	  var _state = parent._state;

	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(16);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var GET_THEN_ERROR = new ErrorObject();

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}

	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}

	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;

	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function ErrorObject() {
	  this.error = null;
	}

	var TRY_CATCH_ERROR = new ErrorObject();

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value = null;
	    } else {
	      succeeded = true;
	    }

	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}

	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);

	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }

	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;

	    this._result = new Array(this.length);

	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};

	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;

	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};

	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;

	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);

	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};

	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;

	  if (promise._state === PENDING) {
	    this._remaining--;

	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }

	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};

	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;

	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];

	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}

	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;

	Promise.prototype = {
	  constructor: Promise,

	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,

	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};

	function polyfill() {
	    var local = undefined;

	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }

	    var P = local.Promise;

	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }

	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }

	    local.Promise = Promise;
	}

	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;

	return Promise;

	})));
	//# sourceMappingURL=es6-promise.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58), (function() { return this; }())))

/***/ },
/* 65 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(67),
	    baseIteratee = __webpack_require__(68),
	    toInteger = __webpack_require__(172);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {Function} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.findIndex(users, function(o) { return o.user == 'barney'; });
	 * // => 0
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findIndex(users, { 'user': 'fred', 'active': false });
	 * // => 1
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findIndex(users, ['active', false]);
	 * // => 0
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findIndex(users, 'active');
	 * // => 2
	 */
	function findIndex(array, predicate, fromIndex) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return -1;
	  }
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseFindIndex(array, baseIteratee(predicate, 3), index);
	}

	module.exports = findIndex;


/***/ },
/* 67 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(69),
	    baseMatchesProperty = __webpack_require__(153),
	    identity = __webpack_require__(168),
	    isArray = __webpack_require__(133),
	    property = __webpack_require__(169);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(70),
	    getMatchData = __webpack_require__(150),
	    matchesStrictComparable = __webpack_require__(152);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(71),
	    baseIsEqual = __webpack_require__(111);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(72),
	    stackClear = __webpack_require__(80),
	    stackDelete = __webpack_require__(81),
	    stackGet = __webpack_require__(82),
	    stackHas = __webpack_require__(83),
	    stackSet = __webpack_require__(84);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(73),
	    listCacheDelete = __webpack_require__(74),
	    listCacheGet = __webpack_require__(77),
	    listCacheHas = __webpack_require__(78),
	    listCacheSet = __webpack_require__(79);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 73 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(75);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(76);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 76 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(75);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(75);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(75);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(72);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ },
/* 81 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 83 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(72),
	    Map = __webpack_require__(85),
	    MapCache = __webpack_require__(96);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(86),
	    root = __webpack_require__(92);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(87),
	    getValue = __webpack_require__(95);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(88),
	    isMasked = __webpack_require__(90),
	    isObject = __webpack_require__(89),
	    toSource = __webpack_require__(94);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(89);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(91);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(92);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(93);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 93 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 94 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 95 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(97),
	    mapCacheDelete = __webpack_require__(105),
	    mapCacheGet = __webpack_require__(108),
	    mapCacheHas = __webpack_require__(109),
	    mapCacheSet = __webpack_require__(110);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(98),
	    ListCache = __webpack_require__(72),
	    Map = __webpack_require__(85);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(99),
	    hashDelete = __webpack_require__(101),
	    hashGet = __webpack_require__(102),
	    hashHas = __webpack_require__(103),
	    hashSet = __webpack_require__(104);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(100);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(86);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 101 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(100);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(100);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(100);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(106);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(107);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(106);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(106);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(106);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(112),
	    isObject = __webpack_require__(89),
	    isObjectLike = __webpack_require__(132);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(71),
	    equalArrays = __webpack_require__(113),
	    equalByTag = __webpack_require__(119),
	    equalObjects = __webpack_require__(124),
	    getTag = __webpack_require__(139),
	    isArray = __webpack_require__(133),
	    isTypedArray = __webpack_require__(145);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(114),
	    arraySome = __webpack_require__(117),
	    cacheHas = __webpack_require__(118);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(96),
	    setCacheAdd = __webpack_require__(115),
	    setCacheHas = __webpack_require__(116);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 115 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 116 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 117 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 118 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(120),
	    Uint8Array = __webpack_require__(121),
	    eq = __webpack_require__(76),
	    equalArrays = __webpack_require__(113),
	    mapToArray = __webpack_require__(122),
	    setToArray = __webpack_require__(123);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(92);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(92);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 122 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 123 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(125);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(126),
	    baseKeys = __webpack_require__(135),
	    isArrayLike = __webpack_require__(130);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(127),
	    isArguments = __webpack_require__(128),
	    isArray = __webpack_require__(133),
	    isIndex = __webpack_require__(134);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 127 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(129);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(130),
	    isObjectLike = __webpack_require__(132);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(88),
	    isLength = __webpack_require__(131);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 131 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 132 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 133 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 134 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(136),
	    nativeKeys = __webpack_require__(137);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 136 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(138);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 138 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(140),
	    Map = __webpack_require__(85),
	    Promise = __webpack_require__(141),
	    Set = __webpack_require__(142),
	    WeakMap = __webpack_require__(143),
	    baseGetTag = __webpack_require__(144),
	    toSource = __webpack_require__(94);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(86),
	    root = __webpack_require__(92);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(86),
	    root = __webpack_require__(92);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(86),
	    root = __webpack_require__(92);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(86),
	    root = __webpack_require__(92);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 144 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(146),
	    baseUnary = __webpack_require__(147),
	    nodeUtil = __webpack_require__(148);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(131),
	    isObjectLike = __webpack_require__(132);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 147 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(93);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(149)(module)))

/***/ },
/* 149 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(151),
	    keys = __webpack_require__(125);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(89);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 152 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(111),
	    get = __webpack_require__(154),
	    hasIn = __webpack_require__(165),
	    isKey = __webpack_require__(163),
	    isStrictComparable = __webpack_require__(151),
	    matchesStrictComparable = __webpack_require__(152),
	    toKey = __webpack_require__(164);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(155);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(156),
	    isKey = __webpack_require__(163),
	    toKey = __webpack_require__(164);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(133),
	    stringToPath = __webpack_require__(157);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = castPath;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(158),
	    toString = __webpack_require__(160);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  string = toString(string);

	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(159);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(96);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(161);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(120),
	    isSymbol = __webpack_require__(162);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(132);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(133),
	    isSymbol = __webpack_require__(162);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(162);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(166),
	    hasPath = __webpack_require__(167);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 166 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(156),
	    isArguments = __webpack_require__(128),
	    isArray = __webpack_require__(133),
	    isIndex = __webpack_require__(134),
	    isKey = __webpack_require__(163),
	    isLength = __webpack_require__(131),
	    toKey = __webpack_require__(164);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ },
/* 168 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(170),
	    basePropertyDeep = __webpack_require__(171),
	    isKey = __webpack_require__(163),
	    toKey = __webpack_require__(164);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 170 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(155);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(173);

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	module.exports = toInteger;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(174);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	module.exports = toFinite;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(89),
	    isSymbol = __webpack_require__(162);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(176),
	    baseEach = __webpack_require__(177),
	    baseIteratee = __webpack_require__(68),
	    baseReduce = __webpack_require__(182),
	    isArray = __webpack_require__(133);

	/**
	 * Reduces `collection` to a value which is the accumulated result of running
	 * each element in `collection` thru `iteratee`, where each successive
	 * invocation is supplied the return value of the previous. If `accumulator`
	 * is not given, the first element of `collection` is used as the initial
	 * value. The iteratee is invoked with four arguments:
	 * (accumulator, value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.reduce`, `_.reduceRight`, and `_.transform`.
	 *
	 * The guarded methods are:
	 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	 * and `sortBy`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @returns {*} Returns the accumulated value.
	 * @see _.reduceRight
	 * @example
	 *
	 * _.reduce([1, 2], function(sum, n) {
	 *   return sum + n;
	 * }, 0);
	 * // => 3
	 *
	 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	 *   (result[value] || (result[value] = [])).push(key);
	 *   return result;
	 * }, {});
	 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	 */
	function reduce(collection, iteratee, accumulator) {
	  var func = isArray(collection) ? arrayReduce : baseReduce,
	      initAccum = arguments.length < 3;

	  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
	}

	module.exports = reduce;


/***/ },
/* 176 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(178),
	    createBaseEach = __webpack_require__(181);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(179),
	    keys = __webpack_require__(125);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(180);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 180 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(130);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 182 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.reduce` and `_.reduceRight`, without support
	 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} accumulator The initial value.
	 * @param {boolean} initAccum Specify using the first or last element of
	 *  `collection` as the initial value.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @returns {*} Returns the accumulated value.
	 */
	function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	  eachFunc(collection, function(value, index, collection) {
	    accumulator = initAccum
	      ? (initAccum = false, value)
	      : iteratee(accumulator, value, index, collection);
	  });
	  return accumulator;
	}

	module.exports = baseReduce;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SyncError = exports.ServerError = exports.QueryError = exports.ParameterValueOutOfRangeError = exports.NoResponseError = exports.NotFoundError = exports.NoActiveUserError = exports.NoNetworkConnectionError = exports.MissingRequestParameterError = exports.MissingRequestHeaderError = exports.MissingQueryError = exports.JSONParseError = exports.InvalidQuerySyntaxError = exports.InvalidIdentifierError = exports.InvalidCredentialsError = exports.InsufficientCredentialsError = exports.IncompleteRequestBodyError = exports.FeatureUnavailableError = exports.ActiveUserError = exports.KinveyError = undefined;

	var _es6Error = __webpack_require__(184);

	var _es6Error2 = _interopRequireDefault(_es6Error);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var KinveyError = exports.KinveyError = function (_ExtendableError) {
	  _inherits(KinveyError, _ExtendableError);

	  function KinveyError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'An error has occurred.';
	    var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var code = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

	    _classCallCheck(this, KinveyError);

	    var _this = _possibleConstructorReturn(this, (KinveyError.__proto__ || Object.getPrototypeOf(KinveyError)).call(this, message));

	    _this.debug = debug;
	    _this.code = code;
	    return _this;
	  }

	  return KinveyError;
	}(_es6Error2.default);

	var ActiveUserError = exports.ActiveUserError = function (_KinveyError) {
	  _inherits(ActiveUserError, _KinveyError);

	  function ActiveUserError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'An active user already exists.';
	    var debug = arguments[1];

	    _classCallCheck(this, ActiveUserError);

	    return _possibleConstructorReturn(this, (ActiveUserError.__proto__ || Object.getPrototypeOf(ActiveUserError)).call(this, message, debug));
	  }

	  return ActiveUserError;
	}(KinveyError);

	var FeatureUnavailableError = exports.FeatureUnavailableError = function (_KinveyError2) {
	  _inherits(FeatureUnavailableError, _KinveyError2);

	  function FeatureUnavailableError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Requested functionality is unavailable in this API version.';
	    var debug = arguments[1];

	    _classCallCheck(this, FeatureUnavailableError);

	    return _possibleConstructorReturn(this, (FeatureUnavailableError.__proto__ || Object.getPrototypeOf(FeatureUnavailableError)).call(this, message, debug));
	  }

	  return FeatureUnavailableError;
	}(KinveyError);

	var IncompleteRequestBodyError = exports.IncompleteRequestBodyError = function (_KinveyError3) {
	  _inherits(IncompleteRequestBodyError, _KinveyError3);

	  function IncompleteRequestBodyError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' The request body is either missing or incomplete.';
	    var debug = arguments[1];

	    _classCallCheck(this, IncompleteRequestBodyError);

	    return _possibleConstructorReturn(this, (IncompleteRequestBodyError.__proto__ || Object.getPrototypeOf(IncompleteRequestBodyError)).call(this, message, debug));
	  }

	  return IncompleteRequestBodyError;
	}(KinveyError);

	var InsufficientCredentialsError = exports.InsufficientCredentialsError = function (_KinveyError4) {
	  _inherits(InsufficientCredentialsError, _KinveyError4);

	  function InsufficientCredentialsError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'The credentials used to authenticate this request are not authorized to run ' + 'this operation. Please retry your request with appropriate credentials.';
	    var debug = arguments[1];

	    _classCallCheck(this, InsufficientCredentialsError);

	    return _possibleConstructorReturn(this, (InsufficientCredentialsError.__proto__ || Object.getPrototypeOf(InsufficientCredentialsError)).call(this, message, debug));
	  }

	  return InsufficientCredentialsError;
	}(KinveyError);

	var InvalidCredentialsError = exports.InvalidCredentialsError = function (_KinveyError5) {
	  _inherits(InvalidCredentialsError, _KinveyError5);

	  function InvalidCredentialsError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' Invalid credentials. Please retry your request with correct credentials.';
	    var debug = arguments[1];

	    _classCallCheck(this, InvalidCredentialsError);

	    return _possibleConstructorReturn(this, (InvalidCredentialsError.__proto__ || Object.getPrototypeOf(InvalidCredentialsError)).call(this, message, debug));
	  }

	  return InvalidCredentialsError;
	}(KinveyError);

	var InvalidIdentifierError = exports.InvalidIdentifierError = function (_KinveyError6) {
	  _inherits(InvalidIdentifierError, _KinveyError6);

	  function InvalidIdentifierError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'One of more identifier names in the request has an invalid format.';
	    var debug = arguments[1];

	    _classCallCheck(this, InvalidIdentifierError);

	    return _possibleConstructorReturn(this, (InvalidIdentifierError.__proto__ || Object.getPrototypeOf(InvalidIdentifierError)).call(this, message, debug));
	  }

	  return InvalidIdentifierError;
	}(KinveyError);

	var InvalidQuerySyntaxError = exports.InvalidQuerySyntaxError = function (_KinveyError7) {
	  _inherits(InvalidQuerySyntaxError, _KinveyError7);

	  function InvalidQuerySyntaxError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'The query string in the request has an invalid syntax.';
	    var debug = arguments[1];

	    _classCallCheck(this, InvalidQuerySyntaxError);

	    return _possibleConstructorReturn(this, (InvalidQuerySyntaxError.__proto__ || Object.getPrototypeOf(InvalidQuerySyntaxError)).call(this, message, debug));
	  }

	  return InvalidQuerySyntaxError;
	}(KinveyError);

	var JSONParseError = exports.JSONParseError = function (_KinveyError8) {
	  _inherits(JSONParseError, _KinveyError8);

	  function JSONParseError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Unable to parse the JSON in the request.';
	    var debug = arguments[1];

	    _classCallCheck(this, JSONParseError);

	    return _possibleConstructorReturn(this, (JSONParseError.__proto__ || Object.getPrototypeOf(JSONParseError)).call(this, message, debug));
	  }

	  return JSONParseError;
	}(KinveyError);

	var MissingQueryError = exports.MissingQueryError = function (_KinveyError9) {
	  _inherits(MissingQueryError, _KinveyError9);

	  function MissingQueryError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'The request is missing a query string.';
	    var debug = arguments[1];

	    _classCallCheck(this, MissingQueryError);

	    return _possibleConstructorReturn(this, (MissingQueryError.__proto__ || Object.getPrototypeOf(MissingQueryError)).call(this, message, debug));
	  }

	  return MissingQueryError;
	}(KinveyError);

	var MissingRequestHeaderError = exports.MissingRequestHeaderError = function (_KinveyError10) {
	  _inherits(MissingRequestHeaderError, _KinveyError10);

	  function MissingRequestHeaderError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'The request is missing a required header.';
	    var debug = arguments[1];

	    _classCallCheck(this, MissingRequestHeaderError);

	    return _possibleConstructorReturn(this, (MissingRequestHeaderError.__proto__ || Object.getPrototypeOf(MissingRequestHeaderError)).call(this, message, debug));
	  }

	  return MissingRequestHeaderError;
	}(KinveyError);

	var MissingRequestParameterError = exports.MissingRequestParameterError = function (_KinveyError11) {
	  _inherits(MissingRequestParameterError, _KinveyError11);

	  function MissingRequestParameterError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'A required parameter is missing from the request.';
	    var debug = arguments[1];

	    _classCallCheck(this, MissingRequestParameterError);

	    return _possibleConstructorReturn(this, (MissingRequestParameterError.__proto__ || Object.getPrototypeOf(MissingRequestParameterError)).call(this, message, debug));
	  }

	  return MissingRequestParameterError;
	}(KinveyError);

	var NoNetworkConnectionError = exports.NoNetworkConnectionError = function (_KinveyError12) {
	  _inherits(NoNetworkConnectionError, _KinveyError12);

	  function NoNetworkConnectionError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'You do not have a network connect.';
	    var debug = arguments[1];

	    _classCallCheck(this, NoNetworkConnectionError);

	    return _possibleConstructorReturn(this, (NoNetworkConnectionError.__proto__ || Object.getPrototypeOf(NoNetworkConnectionError)).call(this, message, debug));
	  }

	  return NoNetworkConnectionError;
	}(KinveyError);

	var NoActiveUserError = exports.NoActiveUserError = function (_KinveyError13) {
	  _inherits(NoActiveUserError, _KinveyError13);

	  function NoActiveUserError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'There is not an active user.';
	    var debug = arguments[1];

	    _classCallCheck(this, NoActiveUserError);

	    return _possibleConstructorReturn(this, (NoActiveUserError.__proto__ || Object.getPrototypeOf(NoActiveUserError)).call(this, message, debug));
	  }

	  return NoActiveUserError;
	}(KinveyError);

	var NotFoundError = exports.NotFoundError = function (_KinveyError14) {
	  _inherits(NotFoundError, _KinveyError14);

	  function NotFoundError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'The item was not found.';
	    var debug = arguments[1];

	    _classCallCheck(this, NotFoundError);

	    return _possibleConstructorReturn(this, (NotFoundError.__proto__ || Object.getPrototypeOf(NotFoundError)).call(this, message, debug));
	  }

	  return NotFoundError;
	}(KinveyError);

	var NoResponseError = exports.NoResponseError = function (_KinveyError15) {
	  _inherits(NoResponseError, _KinveyError15);

	  function NoResponseError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'No response was provided.';
	    var debug = arguments[1];

	    _classCallCheck(this, NoResponseError);

	    return _possibleConstructorReturn(this, (NoResponseError.__proto__ || Object.getPrototypeOf(NoResponseError)).call(this, message, debug));
	  }

	  return NoResponseError;
	}(KinveyError);

	var ParameterValueOutOfRangeError = exports.ParameterValueOutOfRangeError = function (_KinveyError16) {
	  _inherits(ParameterValueOutOfRangeError, _KinveyError16);

	  function ParameterValueOutOfRangeError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'The value specified for one of the request parameters is out of range.';
	    var debug = arguments[1];

	    _classCallCheck(this, ParameterValueOutOfRangeError);

	    return _possibleConstructorReturn(this, (ParameterValueOutOfRangeError.__proto__ || Object.getPrototypeOf(ParameterValueOutOfRangeError)).call(this, message, debug));
	  }

	  return ParameterValueOutOfRangeError;
	}(KinveyError);

	var QueryError = exports.QueryError = function (_KinveyError17) {
	  _inherits(QueryError, _KinveyError17);

	  function QueryError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'An error occurred on the query.';
	    var debug = arguments[1];

	    _classCallCheck(this, QueryError);

	    return _possibleConstructorReturn(this, (QueryError.__proto__ || Object.getPrototypeOf(QueryError)).call(this, message, debug));
	  }

	  return QueryError;
	}(KinveyError);

	var ServerError = exports.ServerError = function (_KinveyError18) {
	  _inherits(ServerError, _KinveyError18);

	  function ServerError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'An error occurred on the server';
	    var debug = arguments[1];

	    _classCallCheck(this, ServerError);

	    return _possibleConstructorReturn(this, (ServerError.__proto__ || Object.getPrototypeOf(ServerError)).call(this, message, debug));
	  }

	  return ServerError;
	}(KinveyError);

	var SyncError = exports.SyncError = function (_KinveyError19) {
	  _inherits(SyncError, _KinveyError19);

	  function SyncError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'An error occurred during sync';
	    var debug = arguments[1];

	    _classCallCheck(this, SyncError);

	    return _possibleConstructorReturn(this, (SyncError.__proto__ || Object.getPrototypeOf(SyncError)).call(this, message, debug));
	  }

	  return SyncError;
	}(KinveyError);

/***/ },
/* 184 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _extendableBuiltin(cls) {
	  function ExtendableBuiltin() {
	    cls.apply(this, arguments);
	  }

	  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
	    constructor: {
	      value: cls,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });

	  if (Object.setPrototypeOf) {
	    Object.setPrototypeOf(ExtendableBuiltin, cls);
	  } else {
	    ExtendableBuiltin.__proto__ = cls;
	  }

	  return ExtendableBuiltin;
	}

	var ExtendableError = function (_extendableBuiltin2) {
	  _inherits(ExtendableError, _extendableBuiltin2);

	  function ExtendableError() {
	    var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	    _classCallCheck(this, ExtendableError);

	    // extending Error is weird and does not propagate `message`

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ExtendableError).call(this, message));

	    Object.defineProperty(_this, 'message', {
	      configurable: true,
	      enumerable: false,
	      value: message,
	      writable: true
	    });

	    Object.defineProperty(_this, 'name', {
	      configurable: true,
	      enumerable: false,
	      value: _this.constructor.name,
	      writable: true
	    });

	    if (Error.hasOwnProperty('captureStackTrace')) {
	      Error.captureStackTrace(_this, _this.constructor);
	      return _possibleConstructorReturn(_this);
	    }

	    Object.defineProperty(_this, 'stack', {
	      configurable: true,
	      enumerable: false,
	      value: new Error(message).stack,
	      writable: true
	    });
	    return _this;
	  }

	  return ExtendableError;
	}(_extendableBuiltin(Error));

	exports.default = ExtendableError;
	module.exports = exports['default'];

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _device = __webpack_require__(186);

	Object.keys(_device).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _device[key];
	    }
	  });
	});

	var _log = __webpack_require__(188);

	Object.keys(_log).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _log[key];
	    }
	  });
	});

	var _object = __webpack_require__(190);

	Object.keys(_object).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _object[key];
	    }
	  });
	});

	var _observable = __webpack_require__(193);

	Object.keys(_observable).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _observable[key];
	    }
	  });
	});

	var _storage = __webpack_require__(209);

	Object.keys(_storage).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _storage[key];
	    }
	  });
	});

	var _string = __webpack_require__(213);

	Object.keys(_string).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _string[key];
	    }
	  });
	});

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Device = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _package = __webpack_require__(187);

	var _package2 = _interopRequireDefault(_package);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function deviceInformation() {
	  var platform = process.title;
	  var version = process.version;
	  var manufacturer = process.platform;

	  var parts = ['js-' + _package2.default.name + '/' + _package2.default.version];

	  return parts.concat([platform, version, manufacturer]).map(function (part) {
	    if (part) {
	      return part.toString().replace(/\s/g, '_').toLowerCase();
	    }

	    return 'unknown';
	  }).join(' ');
	}

	var Device = exports.Device = function () {
	  function Device() {
	    _classCallCheck(this, Device);
	  }

	  _createClass(Device, null, [{
	    key: 'toString',
	    value: function toString() {
	      return deviceInformation();
	    }
	  }]);

	  return Device;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 187 */
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				{
					"raw": "kinvey-node-sdk@../../Node/SDK",
					"scope": null,
					"escapedName": "kinvey-node-sdk",
					"name": "kinvey-node-sdk",
					"rawSpec": "../../Node/SDK",
					"spec": "/Users/Thomas/Documents/Kinvey/Development/SDKs/JavaScript/Node/SDK",
					"type": "directory"
				},
				"/Users/Thomas/Documents/Kinvey/Development/SDKs/JavaScript/Titanium/SDK"
			]
		],
		"_from": "../../Node/SDK",
		"_id": "kinvey-node-sdk@3.2.0",
		"_inCache": true,
		"_location": "/kinvey-node-sdk",
		"_phantomChildren": {
			"browser-stdout": "1.3.0",
			"commander": "2.9.0",
			"debug": "2.2.0",
			"diff": "1.4.0",
			"escape-string-regexp": "1.0.5",
			"fs.realpath": "1.0.0",
			"growl": "1.9.2",
			"has-flag": "1.0.0",
			"inflight": "1.0.5",
			"inherits": "2.0.3",
			"json3": "3.3.2",
			"lodash.create": "3.1.1",
			"minimatch": "3.0.3",
			"mkdirp": "0.5.1",
			"once": "1.4.0",
			"path-is-absolute": "1.0.0"
		},
		"_requested": {
			"raw": "kinvey-node-sdk@../../Node/SDK",
			"scope": null,
			"escapedName": "kinvey-node-sdk",
			"name": "kinvey-node-sdk",
			"rawSpec": "../../Node/SDK",
			"spec": "/Users/Thomas/Documents/Kinvey/Development/SDKs/JavaScript/Node/SDK",
			"type": "directory"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "file:../../Node/SDK",
		"_shasum": "bea1cd7fa7459d12816bd630a61f650145b7573c",
		"_shrinkwrap": null,
		"_spec": "kinvey-node-sdk@../../Node/SDK",
		"_where": "/Users/Thomas/Documents/Kinvey/Development/SDKs/JavaScript/Titanium/SDK",
		"author": {
			"name": "Kinvey, Inc."
		},
		"bugs": {
			"url": "https://github.com/Kinvey/kinvey-nodejs/issues"
		},
		"contributors": [
			{
				"name": "Thomas Conner",
				"email": "thomas@kinvey.com"
			}
		],
		"dependencies": {
			"append-query": "^1.1.0",
			"babel-cli": "^6.14.0",
			"babel-core": "^6.14.0",
			"babel-eslint": "^6.1.0",
			"babel-plugin-inline-dotenv": "^1.1.1",
			"babel-polyfill": "^6.9.1",
			"babel-preset-es2015": "^6.14.0",
			"babel-preset-stage-2": "^6.5.0",
			"core-js": "^2.4.1",
			"del-cli": "^0.2.0",
			"es6-error": "^3.0.0",
			"es6-promise": "git+https://git@github.com/ThomasConner/es6-promise.git",
			"esdoc": "^0.4.7",
			"esdoc-es7-plugin": "0.0.3",
			"eslint": "^3.5.0",
			"eslint-config-airbnb-base": "^7.1.0",
			"eslint-plugin-import": "^1.15.0",
			"expect": "^1.20.2",
			"fast-memory-cache": "^2.0.4",
			"hellojs": "^1.13.1",
			"istanbul": "^1.0.0-alpha.2",
			"json-loader": "^0.5.4",
			"local-storage": "^1.4.2",
			"lodash": "^4.16.0",
			"loglevel": "^1.4.1",
			"mocha": "^3.0.0",
			"nock": "^8.0.0",
			"promise-queue": "^2.2.3",
			"qs": "^6.2.0",
			"regenerator-runtime": "^0.9.5",
			"rxjs": "^5.0.0-beta.7",
			"sift": "^3.0.0",
			"uid": "0.0.2",
			"url-pattern": "^1.0.0"
		},
		"description": "Kinvey JavaScript SDK for NodeJS applications.",
		"devDependencies": {},
		"engines": {
			"node": ">=4.0"
		},
		"es6": true,
		"gitHead": "7f920c7792b0fe0527c31f0cc8a1ce5b24bc8e48",
		"homepage": "http://www.kinvey.com",
		"keywords": [
			"Kinvey",
			"NodeJS"
		],
		"license": "Apache-2.0",
		"main": "./dist/export.js",
		"name": "kinvey-node-sdk",
		"optionalDependencies": {},
		"readme": "# Kinvey NodeJS SDK [![Build Status](https://travis-ci.org/Kinvey/kinvey-nodejs.svg?branch=master)](https://travis-ci.org/Kinvey/kinvey-nodejs) [![Code Climate](https://codeclimate.com/github/Kinvey/kinvey-nodejs/badges/gpa.svg)](https://codeclimate.com/github/Kinvey/kinvey-nodejs) [![codecov](https://codecov.io/gh/Kinvey/kinvey-nodejs/branch/master/graph/badge.svg)](https://codecov.io/gh/Kinvey/kinvey-nodejs)\n\n[Kinvey](http://www.kinvey.com) (pronounced Kin-vey, like convey) makes it ridiculously easy for developers to setup, use and operate a cloud backend for their mobile apps. They don't have to worry about connecting to various cloud services, setting up servers for their backend, or maintaining and scaling them.\n\nThis node module makes it very easy to connect your NodeJS app with Kinvey.\n\n## How to use\n\n#### 1. Sign up for Kinvey\nTo use the SDK, sign up for Kinvey if you have not already done so. Go to the [sign up](https://console.kinvey.com/#signup) page, and follow the steps provided.\n\n#### 2. Install the SDK\nYou can install the module using npm:\n\n```bash\nnpm install kinvey-node-sdk --save\n```\n\n#### 3. Configure the SDK\nImport the library in your code using `require`.\n\n```javascript\nvar Kinvey = require('kinvey-node-sdk');\n```\n\nNext, use `Kinvey.init` to configure your app. Replace `<appKey>` and `<appSecret>` with your apps app key and secret. You can find these for your app using the [Kinvey Console App](https://console.kinvey.com).\n\n```javascript\nKinvey.init({\n    appKey: '<appKey>',\n    appSecret: '<appSecret>'\n});\n```\n\n#### 4. Verify Set Up\nYou can use the following snippet to verify the app credentials were entered correctly. This function will contact the backend and verify that the SDK can communicate with your app.\n\n```javascript\nKinvey.ping().then(function(response) {\n  console.log('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);\n}).catch(function(error) {\n  console.log('Kinvey Ping Failed. Response: ' + error.message);\n});\n```\n\n## What’s next?\nYou are now ready to start building your awesome apps! Next we recommend diving into the [User guide](http://devcenter.kinvey.com/node-v3.0/guides/users) or [Data store guide](http://devcenter.kinvey.com/node-v3.0/guides/datastore) to learn more about our service, or explore the [sample apps](http://devcenter.kinvey.com/node-v3.0/samples) to go straight to working projects.\n\n## Build\nExecute `npm run build` to build the package.\n\n## Release\n[TravisCI](https://travis-ci.org/Kinvey/kinvey-nodejs) will deploy the pacakge to [NPM](https://www.npmjs.com/package/kinvey-node-sdk).\n\n1. Checkout the master branch.\n2. Update the CHANGELOG.md.\n3. Execute `npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]`. See [Version Management](#version-management) for more info on incrementing the version.\n4. Done.\n\n### Version Management\nUpdating the package version should follow [Semantic Version 2.0.0](http://semver.org/):\n\n* Major (x.0.0): when making an incompatible API changes.\n* Minor (3.x.0): when adding functionality in a backwards-compatible manner.\n* Patch (3.0.x): when making backwards-compatible bug fixes or enhancements.\n\n## Test\n_Note: Before running any tests you will need to run `npm install` to install any dependencies required._\n\n### Unit Tests\nThe steps for running the unit tests is as follows:\n\n1. Open a terminal window and execute `npm test`.\n\n## License\nSee [LICENSE](LICENSE) for details.\n\n## Contributing\nSee [CONTRIBUTING.md](CONTRIBUTING.md) for details on reporting bugs and making contributions.\n",
		"readmeFilename": "README.md",
		"repository": {
			"type": "git",
			"url": "git+ssh://git@github.com/Kinvey/kinvey-nodejs.git"
		},
		"scripts": {
			"build": "npm run clean && npm run transpile",
			"clean": "del dist coverage",
			"cover": "istanbul cover _mocha -- --compilers js:babel-core/register -r babel-polyfill -s 100 --recursive test/unit/setup test/unit",
			"docs": "esdoc -c esdoc.json",
			"lint": "npm run lint:src",
			"lint:src": "eslint src/**",
			"lint:test": "eslint test/unit/**",
			"postversion": "git push && git push --tags",
			"preversion": "npm test",
			"test": "mocha --compilers js:babel-core/register -r babel-polyfill -s 100 --recursive test/unit/setup test/unit",
			"test:watch": "mocha -w --compilers js:babel-core/register -r babel-polyfill -s 100 --recursive test/unit/setup test/unit",
			"transpile": "BABEL_ENV=production babel --no-comments --out-dir dist src",
			"version": "npm run build && git add -A dist"
		},
		"version": "3.2.0"
	};

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Log = undefined;

	var _loglevel = __webpack_require__(189);

	var _loglevel2 = _interopRequireDefault(_loglevel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var originalFactory = _loglevel2.default.methodFactory;

	_loglevel2.default.methodFactory = function methodFactory(methodName, logLevel, loggerName) {
	  var rawMethod = originalFactory(methodName, logLevel, loggerName);

	  return function log(message) {
	    message = 'Kinvey: ' + message;

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    if (args.length > 0) {
	      rawMethod(message, args);
	    } else {
	      rawMethod(message);
	    }
	  };
	};

	_loglevel2.default.setDefaultLevel(_loglevel2.default.levels.SILENT);

	exports.Log = _loglevel2.default;

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	* loglevel - https://github.com/pimterry/loglevel
	*
	* Copyright (c) 2013 Tim Perry
	* Licensed under the MIT license.
	*/
	(function (root, definition) {
	    "use strict";
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module === 'object' && module.exports) {
	        module.exports = definition();
	    } else {
	        root.log = definition();
	    }
	}(this, function () {
	    "use strict";
	    var noop = function() {};
	    var undefinedType = "undefined";

	    function realMethod(methodName) {
	        if (typeof console === undefinedType) {
	            return false; // We can't build a real method without a console to log to
	        } else if (console[methodName] !== undefined) {
	            return bindMethod(console, methodName);
	        } else if (console.log !== undefined) {
	            return bindMethod(console, 'log');
	        } else {
	            return noop;
	        }
	    }

	    function bindMethod(obj, methodName) {
	        var method = obj[methodName];
	        if (typeof method.bind === 'function') {
	            return method.bind(obj);
	        } else {
	            try {
	                return Function.prototype.bind.call(method, obj);
	            } catch (e) {
	                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
	                return function() {
	                    return Function.prototype.apply.apply(method, [obj, arguments]);
	                };
	            }
	        }
	    }

	    // these private functions always need `this` to be set properly

	    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
	        return function () {
	            if (typeof console !== undefinedType) {
	                replaceLoggingMethods.call(this, level, loggerName);
	                this[methodName].apply(this, arguments);
	            }
	        };
	    }

	    function replaceLoggingMethods(level, loggerName) {
	        /*jshint validthis:true */
	        for (var i = 0; i < logMethods.length; i++) {
	            var methodName = logMethods[i];
	            this[methodName] = (i < level) ?
	                noop :
	                this.methodFactory(methodName, level, loggerName);
	        }
	    }

	    function defaultMethodFactory(methodName, level, loggerName) {
	        /*jshint validthis:true */
	        return realMethod(methodName) ||
	               enableLoggingWhenConsoleArrives.apply(this, arguments);
	    }

	    var logMethods = [
	        "trace",
	        "debug",
	        "info",
	        "warn",
	        "error"
	    ];

	    function Logger(name, defaultLevel, factory) {
	      var self = this;
	      var currentLevel;
	      var storageKey = "loglevel";
	      if (name) {
	        storageKey += ":" + name;
	      }

	      function persistLevelIfPossible(levelNum) {
	          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

	          // Use localStorage if available
	          try {
	              window.localStorage[storageKey] = levelName;
	              return;
	          } catch (ignore) {}

	          // Use session cookie as fallback
	          try {
	              window.document.cookie =
	                encodeURIComponent(storageKey) + "=" + levelName + ";";
	          } catch (ignore) {}
	      }

	      function getPersistedLevel() {
	          var storedLevel;

	          try {
	              storedLevel = window.localStorage[storageKey];
	          } catch (ignore) {}

	          if (typeof storedLevel === undefinedType) {
	              try {
	                  var cookie = window.document.cookie;
	                  var location = cookie.indexOf(
	                      encodeURIComponent(storageKey) + "=");
	                  if (location) {
	                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
	                  }
	              } catch (ignore) {}
	          }

	          // If the stored level is not valid, treat it as if nothing was stored.
	          if (self.levels[storedLevel] === undefined) {
	              storedLevel = undefined;
	          }

	          return storedLevel;
	      }

	      /*
	       *
	       * Public API
	       *
	       */

	      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
	          "ERROR": 4, "SILENT": 5};

	      self.methodFactory = factory || defaultMethodFactory;

	      self.getLevel = function () {
	          return currentLevel;
	      };

	      self.setLevel = function (level, persist) {
	          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
	              level = self.levels[level.toUpperCase()];
	          }
	          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
	              currentLevel = level;
	              if (persist !== false) {  // defaults to true
	                  persistLevelIfPossible(level);
	              }
	              replaceLoggingMethods.call(self, level, name);
	              if (typeof console === undefinedType && level < self.levels.SILENT) {
	                  return "No console available for logging";
	              }
	          } else {
	              throw "log.setLevel() called with invalid level: " + level;
	          }
	      };

	      self.setDefaultLevel = function (level) {
	          if (!getPersistedLevel()) {
	              self.setLevel(level, false);
	          }
	      };

	      self.enableAll = function(persist) {
	          self.setLevel(self.levels.TRACE, persist);
	      };

	      self.disableAll = function(persist) {
	          self.setLevel(self.levels.SILENT, persist);
	      };

	      // Initialize with the right level
	      var initialLevel = getPersistedLevel();
	      if (initialLevel == null) {
	          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
	      }
	      self.setLevel(initialLevel, false);
	    }

	    /*
	     *
	     * Package-level API
	     *
	     */

	    var defaultLogger = new Logger();

	    var _loggersByName = {};
	    defaultLogger.getLogger = function getLogger(name) {
	        if (typeof name !== "string" || name === "") {
	          throw new TypeError("You must supply a name when creating a logger.");
	        }

	        var logger = _loggersByName[name];
	        if (!logger) {
	          logger = _loggersByName[name] = new Logger(
	            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
	        }
	        return logger;
	    };

	    // Grab the current global log variable in case of overwrite
	    var _log = (typeof window !== undefinedType) ? window.log : undefined;
	    defaultLogger.noConflict = function() {
	        if (typeof window !== undefinedType &&
	               window.log === defaultLogger) {
	            window.log = _log;
	        }

	        return defaultLogger;
	    };

	    return defaultLogger;
	}));


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.nested = nested;
	exports.isDefined = isDefined;
	exports.use = use;

	var _forEach = __webpack_require__(191);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _isFunction = __webpack_require__(88);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function nested(obj, dotProperty, value) {
	  if (!dotProperty) {
	    obj = value || obj;
	    return obj;
	  }

	  var parts = dotProperty.split('.');
	  var current = parts.shift();
	  while (current && obj) {
	    obj = obj[current];
	    current = parts.shift();
	  }

	  return value || obj;
	}

	function isDefined(obj) {
	  return obj !== undefined && obj !== null;
	}

	function use(nsInterface) {
	  return function () {
	    var _this = this;

	    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    (0, _forEach2.default)(nsInterface, function (methodName) {
	      if ((0, _isFunction2.default)(adapter[methodName])) {
	        _this.prototype[methodName] = function () {
	          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }

	          return adapter[methodName].apply(this, args);
	        };
	      }
	    });
	  };
	}

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(192),
	    baseEach = __webpack_require__(177),
	    baseIteratee = __webpack_require__(68),
	    isArray = __webpack_require__(133);

	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _.forEach([1, 2], function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, baseIteratee(iteratee, 3));
	}

	module.exports = forEach;


/***/ },
/* 192 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.KinveyObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(194);

	var _toPromise2 = __webpack_require__(208);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var KinveyObservable = exports.KinveyObservable = function (_Observable) {
	  _inherits(KinveyObservable, _Observable);

	  function KinveyObservable() {
	    _classCallCheck(this, KinveyObservable);

	    return _possibleConstructorReturn(this, (KinveyObservable.__proto__ || Object.getPrototypeOf(KinveyObservable)).apply(this, arguments));
	  }

	  _createClass(KinveyObservable, [{
	    key: 'toPromise',
	    value: function toPromise() {
	      return _toPromise2.toPromise.call(this);
	    }
	  }], [{
	    key: 'create',
	    value: function create(subscriber) {
	      return new KinveyObservable(subscriber);
	    }
	  }]);

	  return KinveyObservable;
	}(_Observable2.Observable);

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(195);
	var toSubscriber_1 = __webpack_require__(196);
	var observable_1 = __webpack_require__(207);
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = (function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is  called when the Observable is
	     * initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or
	     * `complete` can be called to notify of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * Creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @return {Observable} a new observable with the Operator applied
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    /**
	     * Registers handlers for handling emitted values, error and completions from the observable, and
	     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
	     * @method subscribe
	     * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
	     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
	     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
	     *  the error will be thrown as unhandled
	     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
	     * @return {ISubscription} a subscription reference to the registered handlers
	     */
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var operator = this.operator;
	        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        if (operator) {
	            operator.call(sink, this);
	        }
	        else {
	            sink.add(this._subscribe(sink));
	        }
	        if (sink.syncErrorThrowable) {
	            sink.syncErrorThrowable = false;
	            if (sink.syncErrorThrown) {
	                throw sink.syncErrorValue;
	            }
	        }
	        return sink;
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @return {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, PromiseCtor) {
	        var _this = this;
	        if (!PromiseCtor) {
	            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	                PromiseCtor = root_1.root.Rx.config.Promise;
	            }
	            else if (root_1.root.Promise) {
	                PromiseCtor = root_1.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        return new PromiseCtor(function (resolve, reject) {
	            var subscription = _this.subscribe(function (value) {
	                if (subscription) {
	                    // if there is a subscription, then we can surmise
	                    // the next handling is asynchronous. Any errors thrown
	                    // need to be rejected explicitly and unsubscribe must be
	                    // called manually
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscription.unsubscribe();
	                    }
	                }
	                else {
	                    // if there is NO subscription, then we're getting a nexted
	                    // value synchronously during subscription. We can just call it.
	                    // If it errors, Observable's `subscribe` will ensure the
	                    // unsubscription logic is called, then synchronously rethrow the error.
	                    // After that, Promise will trap the error and send it
	                    // down the rejection path.
	                    next(value);
	                }
	            }, reject, resolve);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     * @method Symbol.observable
	     * @return {Observable} this instance of the observable
	     */
	    Observable.prototype[observable_1.$$observable] = function () {
	        return this;
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * Creates a new cold Observable by calling the Observable constructor
	     * @static true
	     * @owner Observable
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @return {Observable} a new cold observable
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	exports.Observable = Observable;
	//# sourceMappingURL=Observable.js.map

/***/ },
/* 195 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	};
	exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
	var freeGlobal = objectTypes[typeof global] && global;
	if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    exports.root = freeGlobal;
	}
	//# sourceMappingURL=root.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Subscriber_1 = __webpack_require__(197);
	var rxSubscriber_1 = __webpack_require__(206);
	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver) {
	        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
	            return nextOrObserver;
	        }
	        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
	            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
	        }
	    }
	    if (!nextOrObserver && !error && !complete) {
	        return new Subscriber_1.Subscriber();
	    }
	    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	}
	exports.toSubscriber = toSubscriber;
	//# sourceMappingURL=toSubscriber.js.map

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isFunction_1 = __webpack_require__(198);
	var Subscription_1 = __webpack_require__(199);
	var Observer_1 = __webpack_require__(205);
	var rxSubscriber_1 = __webpack_require__(206);
	/**
	 * Implements the {@link Observer} interface and extends the
	 * {@link Subscription} class. While the {@link Observer} is the public API for
	 * consuming the values of an {@link Observable}, all Observers get converted to
	 * a Subscriber, in order to provide Subscription-like capabilities such as
	 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
	 * implementing operators, but it is rarely used as a public API.
	 *
	 * @class Subscriber<T>
	 */
	var Subscriber = (function (_super) {
	    __extends(Subscriber, _super);
	    /**
	     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
	     * defined Observer or a `next` callback function.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     */
	    function Subscriber(destinationOrNext, error, complete) {
	        _super.call(this);
	        this.syncErrorValue = null;
	        this.syncErrorThrown = false;
	        this.syncErrorThrowable = false;
	        this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                this.destination = Observer_1.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    this.destination = Observer_1.empty;
	                    break;
	                }
	                if (typeof destinationOrNext === 'object') {
	                    if (destinationOrNext instanceof Subscriber) {
	                        this.destination = destinationOrNext;
	                        this.destination.add(this);
	                    }
	                    else {
	                        this.syncErrorThrowable = true;
	                        this.destination = new SafeSubscriber(this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                this.syncErrorThrowable = true;
	                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
	                break;
	        }
	    }
	    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () { return this; };
	    /**
	     * A static factory for a Subscriber, given a (potentially partial) definition
	     * of an Observer.
	     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
	     * Observer represented by the given arguments.
	     */
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber(next, error, complete);
	        subscriber.syncErrorThrowable = false;
	        return subscriber;
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `next` from
	     * the Observable, with a value. The Observable may call this method 0 or more
	     * times.
	     * @param {T} [value] The `next` value.
	     * @return {void}
	     */
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `error` from
	     * the Observable, with an attached {@link Error}. Notifies the Observer that
	     * the Observable has experienced an error condition.
	     * @param {any} [err] The `error` exception.
	     * @return {void}
	     */
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive a valueless notification of type
	     * `complete` from the Observable. Notifies the Observer that the Observable
	     * has finished sending push-based notifications.
	     * @return {void}
	     */
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.closed) {
	            return;
	        }
	        this.isStopped = true;
	        _super.prototype.unsubscribe.call(this);
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this.unsubscribe();
	    };
	    Subscriber.prototype._complete = function () {
	        this.destination.complete();
	        this.unsubscribe();
	    };
	    return Subscriber;
	}(Subscription_1.Subscription));
	exports.Subscriber = Subscriber;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SafeSubscriber = (function (_super) {
	    __extends(SafeSubscriber, _super);
	    function SafeSubscriber(_parent, observerOrNext, error, complete) {
	        _super.call(this);
	        this._parent = _parent;
	        var next;
	        var context = this;
	        if (isFunction_1.isFunction(observerOrNext)) {
	            next = observerOrNext;
	        }
	        else if (observerOrNext) {
	            context = observerOrNext;
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	            if (isFunction_1.isFunction(context.unsubscribe)) {
	                this.add(context.unsubscribe.bind(context));
	            }
	            context.unsubscribe = this.unsubscribe.bind(this);
	        }
	        this._context = context;
	        this._next = next;
	        this._error = error;
	        this._complete = complete;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            var _parent = this._parent;
	            if (!_parent.syncErrorThrowable) {
	                this.__tryOrUnsub(this._next, value);
	            }
	            else if (this.__tryOrSetError(_parent, this._next, value)) {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._error) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._error, err);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._error, err);
	                    this.unsubscribe();
	                }
	            }
	            else if (!_parent.syncErrorThrowable) {
	                this.unsubscribe();
	                throw err;
	            }
	            else {
	                _parent.syncErrorValue = err;
	                _parent.syncErrorThrown = true;
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._complete) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._complete);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._complete);
	                    this.unsubscribe();
	                }
	            }
	            else {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            this.unsubscribe();
	            throw err;
	        }
	    };
	    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            parent.syncErrorValue = err;
	            parent.syncErrorThrown = true;
	            return true;
	        }
	        return false;
	    };
	    SafeSubscriber.prototype._unsubscribe = function () {
	        var _parent = this._parent;
	        this._context = null;
	        this._parent = null;
	        _parent.unsubscribe();
	    };
	    return SafeSubscriber;
	}(Subscriber));
	//# sourceMappingURL=Subscriber.js.map

/***/ },
/* 198 */
/***/ function(module, exports) {

	"use strict";
	function isFunction(x) {
	    return typeof x === 'function';
	}
	exports.isFunction = isFunction;
	//# sourceMappingURL=isFunction.js.map

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isArray_1 = __webpack_require__(200);
	var isObject_1 = __webpack_require__(201);
	var isFunction_1 = __webpack_require__(198);
	var tryCatch_1 = __webpack_require__(202);
	var errorObject_1 = __webpack_require__(203);
	var UnsubscriptionError_1 = __webpack_require__(204);
	/**
	 * Represents a disposable resource, such as the execution of an Observable. A
	 * Subscription has one important method, `unsubscribe`, that takes no argument
	 * and just disposes the resource held by the subscription.
	 *
	 * Additionally, subscriptions may be grouped together through the `add()`
	 * method, which will attach a child Subscription to the current Subscription.
	 * When a Subscription is unsubscribed, all its children (and its grandchildren)
	 * will be unsubscribed as well.
	 *
	 * @class Subscription
	 */
	var Subscription = (function () {
	    /**
	     * @param {function(): void} [unsubscribe] A function describing how to
	     * perform the disposal of resources when the `unsubscribe` method is called.
	     */
	    function Subscription(unsubscribe) {
	        /**
	         * A flag to indicate whether this Subscription has already been unsubscribed.
	         * @type {boolean}
	         */
	        this.closed = false;
	        if (unsubscribe) {
	            this._unsubscribe = unsubscribe;
	        }
	    }
	    /**
	     * Disposes the resources held by the subscription. May, for instance, cancel
	     * an ongoing Observable execution or cancel any other type of work that
	     * started when the Subscription was created.
	     * @return {void}
	     */
	    Subscription.prototype.unsubscribe = function () {
	        var hasErrors = false;
	        var errors;
	        if (this.closed) {
	            return;
	        }
	        this.closed = true;
	        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
	        this._subscriptions = null;
	        if (isFunction_1.isFunction(_unsubscribe)) {
	            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
	            if (trial === errorObject_1.errorObject) {
	                hasErrors = true;
	                (errors = errors || []).push(errorObject_1.errorObject.e);
	            }
	        }
	        if (isArray_1.isArray(_subscriptions)) {
	            var index = -1;
	            var len = _subscriptions.length;
	            while (++index < len) {
	                var sub = _subscriptions[index];
	                if (isObject_1.isObject(sub)) {
	                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
	                    if (trial === errorObject_1.errorObject) {
	                        hasErrors = true;
	                        errors = errors || [];
	                        var err = errorObject_1.errorObject.e;
	                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                            errors = errors.concat(err.errors);
	                        }
	                        else {
	                            errors.push(err);
	                        }
	                    }
	                }
	            }
	        }
	        if (hasErrors) {
	            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	        }
	    };
	    /**
	     * Adds a tear down to be called during the unsubscribe() of this
	     * Subscription.
	     *
	     * If the tear down being added is a subscription that is already
	     * unsubscribed, is the same reference `add` is being called on, or is
	     * `Subscription.EMPTY`, it will not be added.
	     *
	     * If this subscription is already in an `closed` state, the passed
	     * tear down logic will be executed immediately.
	     *
	     * @param {TeardownLogic} teardown The additional logic to execute on
	     * teardown.
	     * @return {Subscription} Returns the Subscription used or created to be
	     * added to the inner subscriptions list. This Subscription can be used with
	     * `remove()` to remove the passed teardown logic from the inner subscriptions
	     * list.
	     */
	    Subscription.prototype.add = function (teardown) {
	        if (!teardown || (teardown === Subscription.EMPTY)) {
	            return Subscription.EMPTY;
	        }
	        if (teardown === this) {
	            return this;
	        }
	        var sub = teardown;
	        switch (typeof teardown) {
	            case 'function':
	                sub = new Subscription(teardown);
	            case 'object':
	                if (sub.closed || typeof sub.unsubscribe !== 'function') {
	                    break;
	                }
	                else if (this.closed) {
	                    sub.unsubscribe();
	                }
	                else {
	                    (this._subscriptions || (this._subscriptions = [])).push(sub);
	                }
	                break;
	            default:
	                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
	        }
	        return sub;
	    };
	    /**
	     * Removes a Subscription from the internal list of subscriptions that will
	     * unsubscribe during the unsubscribe process of this Subscription.
	     * @param {Subscription} subscription The subscription to remove.
	     * @return {void}
	     */
	    Subscription.prototype.remove = function (subscription) {
	        // HACK: This might be redundant because of the logic in `add()`
	        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
	            return;
	        }
	        var subscriptions = this._subscriptions;
	        if (subscriptions) {
	            var subscriptionIndex = subscriptions.indexOf(subscription);
	            if (subscriptionIndex !== -1) {
	                subscriptions.splice(subscriptionIndex, 1);
	            }
	        }
	    };
	    Subscription.EMPTY = (function (empty) {
	        empty.closed = true;
	        return empty;
	    }(new Subscription()));
	    return Subscription;
	}());
	exports.Subscription = Subscription;
	//# sourceMappingURL=Subscription.js.map

/***/ },
/* 200 */
/***/ function(module, exports) {

	"use strict";
	exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
	//# sourceMappingURL=isArray.js.map

/***/ },
/* 201 */
/***/ function(module, exports) {

	"use strict";
	function isObject(x) {
	    return x != null && typeof x === 'object';
	}
	exports.isObject = isObject;
	//# sourceMappingURL=isObject.js.map

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var errorObject_1 = __webpack_require__(203);
	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    }
	    catch (e) {
	        errorObject_1.errorObject.e = e;
	        return errorObject_1.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	exports.tryCatch = tryCatch;
	;
	//# sourceMappingURL=tryCatch.js.map

/***/ },
/* 203 */
/***/ function(module, exports) {

	"use strict";
	// typeof any so that it we don't have to cast when comparing a result to the error object
	exports.errorObject = { e: {} };
	//# sourceMappingURL=errorObject.js.map

/***/ },
/* 204 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when one or more errors have occurred during the
	 * `unsubscribe` of a {@link Subscription}.
	 */
	var UnsubscriptionError = (function (_super) {
	    __extends(UnsubscriptionError, _super);
	    function UnsubscriptionError(errors) {
	        _super.call(this);
	        this.errors = errors;
	        var err = Error.call(this, errors ?
	            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
	        this.name = err.name = 'UnsubscriptionError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return UnsubscriptionError;
	}(Error));
	exports.UnsubscriptionError = UnsubscriptionError;
	//# sourceMappingURL=UnsubscriptionError.js.map

/***/ },
/* 205 */
/***/ function(module, exports) {

	"use strict";
	exports.empty = {
	    closed: true,
	    next: function (value) { },
	    error: function (err) { throw err; },
	    complete: function () { }
	};
	//# sourceMappingURL=Observer.js.map

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(195);
	var Symbol = root_1.root.Symbol;
	exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
	    Symbol.for('rxSubscriber') : '@@rxSubscriber';
	//# sourceMappingURL=rxSubscriber.js.map

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(195);
	function getSymbolObservable(context) {
	    var $$observable;
	    var Symbol = context.Symbol;
	    if (typeof Symbol === 'function') {
	        if (Symbol.observable) {
	            $$observable = Symbol.observable;
	        }
	        else {
	            $$observable = Symbol('observable');
	            Symbol.observable = $$observable;
	        }
	    }
	    else {
	        $$observable = '@@observable';
	    }
	    return $$observable;
	}
	exports.getSymbolObservable = getSymbolObservable;
	exports.$$observable = getSymbolObservable(root_1.root);
	//# sourceMappingURL=observable.js.map

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(195);
	/**
	 * @param PromiseCtor
	 * @return {Promise<T>}
	 * @method toPromise
	 * @owner Observable
	 */
	function toPromise(PromiseCtor) {
	    var _this = this;
	    if (!PromiseCtor) {
	        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	            PromiseCtor = root_1.root.Rx.config.Promise;
	        }
	        else if (root_1.root.Promise) {
	            PromiseCtor = root_1.root.Promise;
	        }
	    }
	    if (!PromiseCtor) {
	        throw new Error('no Promise impl found');
	    }
	    return new PromiseCtor(function (resolve, reject) {
	        var value;
	        _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
	    });
	}
	exports.toPromise = toPromise;
	//# sourceMappingURL=toPromise.js.map

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getActiveUser = getActiveUser;
	exports.setActiveUser = setActiveUser;
	exports.getIdentitySession = getIdentitySession;
	exports.setIdentitySession = setIdentitySession;

	var _localStorage = __webpack_require__(210);

	var _localStorage2 = _interopRequireDefault(_localStorage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var userCollectionName = process && process.env && process.env.KINVEY_USER_COLLECTION_NAME || undefined || 'kinvey_user';

	function getActiveUser(client) {
	  return _localStorage2.default.get('' + client.appKey + userCollectionName);
	}

	function setActiveUser(client, data) {
	  if (data) {
	    try {
	      return _localStorage2.default.set('' + client.appKey + userCollectionName, data);
	    } catch (error) {
	      return false;
	    }
	  }

	  return _localStorage2.default.remove('' + client.appKey + userCollectionName);
	}

	function getIdentitySession(client, identity) {
	  return _localStorage2.default.get('' + client.appKey + identity);
	}

	function setIdentitySession(client, identity, session) {
	  if (session) {
	    try {
	      return _localStorage2.default.set('' + client.appKey + identity, session);
	    } catch (error) {
	      return false;
	    }
	  }

	  return _localStorage2.default.remove('' + client.appKey + identity);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var stub = __webpack_require__(211);
	var tracking = __webpack_require__(212);
	var ls = 'localStorage' in global && global.localStorage ? global.localStorage : stub;

	function accessor (key, value) {
	  if (arguments.length === 1) {
	    return get(key);
	  }
	  return set(key, value);
	}

	function get (key) {
	  return JSON.parse(ls.getItem(key));
	}

	function set (key, value) {
	  try {
	    ls.setItem(key, JSON.stringify(value));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function remove (key) {
	  return ls.removeItem(key);
	}

	function clear () {
	  return ls.clear();
	}

	accessor.set = set;
	accessor.get = get;
	accessor.remove = remove;
	accessor.clear = clear;
	accessor.on = tracking.on;
	accessor.off = tracking.off;

	module.exports = accessor;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 211 */
/***/ function(module, exports) {

	'use strict';

	var ms = {};

	function getItem (key) {
	  return key in ms ? ms[key] : null;
	}

	function setItem (key, value) {
	  ms[key] = value;
	  return true;
	}

	function removeItem (key) {
	  var found = key in ms;
	  if (found) {
	    return delete ms[key];
	  }
	  return false;
	}

	function clear () {
	  ms = {};
	  return true;
	}

	module.exports = {
	  getItem: getItem,
	  setItem: setItem,
	  removeItem: removeItem,
	  clear: clear
	};


/***/ },
/* 212 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var listeners = {};
	var listening = false;

	function listen () {
	  if (global.addEventListener) {
	    global.addEventListener('storage', change, false);
	  } else if (global.attachEvent) {
	    global.attachEvent('onstorage', change);
	  } else {
	    global.onstorage = change;
	  }
	}

	function change (e) {
	  if (!e) {
	    e = global.event;
	  }
	  var all = listeners[e.key];
	  if (all) {
	    all.forEach(fire);
	  }

	  function fire (listener) {
	    listener(JSON.parse(e.newValue), JSON.parse(e.oldValue), e.url || e.uri);
	  }
	}

	function on (key, fn) {
	  if (listeners[key]) {
	    listeners[key].push(fn);
	  } else {
	    listeners[key] = [fn];
	  }
	  if (listening === false) {
	    listen();
	  }
	}

	function off (key, fn) {
	  var ns = listeners[key];
	  if (ns.length > 1) {
	    ns.splice(ns.indexOf(fn), 1);
	  } else {
	    listeners[key] = [];
	  }
	}

	module.exports = {
	  on: on,
	  off: off
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.randomString = randomString;

	var _uid = __webpack_require__(214);

	var _uid2 = _interopRequireDefault(_uid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function randomString(size) {
	  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	  return '' + prefix + (0, _uid2.default)(size);
	}

/***/ },
/* 214 */
/***/ function(module, exports) {

	/**
	 * Export `uid`
	 */

	module.exports = uid;

	/**
	 * Create a `uid`
	 *
	 * @param {String} len
	 * @return {String} uid
	 */

	function uid(len) {
	  len = len || 7;
	  return Math.random().toString(35).substr(2, len);
	}


/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var punycode = __webpack_require__(216);

	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;

	exports.Url = Url;

	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,

	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(217);

	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;

	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}

	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }

	  var rest = url;

	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();

	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }

	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }

	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {

	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c

	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.

	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }

	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;

	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    this.parseHost();

	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';

	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }

	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }

	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
	            'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }

	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;

	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }

	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {

	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }


	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }

	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }

	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};

	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}

	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }

	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';

	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }

	  if (this.query &&
	      isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }

	  var search = this.search || (query && ('?' + query)) || '';

	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }

	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;

	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');

	  return protocol + host + pathname + search + hash;
	};

	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}

	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};

	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}

	Url.prototype.resolveObject = function(relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }

	  var result = new Url();
	  Object.keys(this).forEach(function(k) {
	    result[k] = this[k];
	  }, this);

	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;

	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }

	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function(k) {
	      if (k !== 'protocol')
	        result[k] = relative[k];
	    });

	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }

	    result.href = result.format();
	    return result;
	  }

	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function(k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }

	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }

	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];

	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }

	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }

	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }

	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host) && (last === '.' || last === '..') ||
	      last === '');

	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }

	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }

	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }

	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');

	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }

	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }

	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }

	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};

	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};

	function isString(arg) {
	  return typeof arg === "string";
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return  arg == null;
	}


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {

		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(149)(module), (function() { return this; }())))

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(218);
	exports.encode = exports.stringify = __webpack_require__(219);


/***/ },
/* 218 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};


/***/ },
/* 219 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(221),
	    copyObject = __webpack_require__(223),
	    createAssigner = __webpack_require__(224),
	    isArrayLike = __webpack_require__(130),
	    isPrototype = __webpack_require__(136),
	    keys = __webpack_require__(125);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});

	module.exports = assign;


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(222),
	    eq = __webpack_require__(76);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ },
/* 222 */
/***/ function(module, exports) {

	/** Built-in value references. */
	var defineProperty = Object.defineProperty;

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(221),
	    baseAssignValue = __webpack_require__(222);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(225),
	    isIterateeCall = __webpack_require__(233);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(168),
	    overRest = __webpack_require__(226),
	    setToString = __webpack_require__(228);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(227);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 227 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(229),
	    shortOut = __webpack_require__(232);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(230),
	    identity = __webpack_require__(168),
	    nativeDefineProperty = __webpack_require__(231);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !nativeDefineProperty ? identity : function(func, string) {
	  return nativeDefineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },
/* 230 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(86);

	/* Built-in method references that are verified to be native. */
	var nativeDefineProperty = getNative(Object, 'defineProperty');

	module.exports = nativeDefineProperty;


/***/ },
/* 232 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 500,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(76),
	    isArrayLike = __webpack_require__(130),
	    isIndex = __webpack_require__(134),
	    isObject = __webpack_require__(89);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(133),
	    isObjectLike = __webpack_require__(132);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CustomEndpoint = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _client = __webpack_require__(59);

	var _request = __webpack_require__(236);

	var _errors = __webpack_require__(183);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	var _isString = __webpack_require__(234);

	var _isString2 = _interopRequireDefault(_isString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var rpcNamespace = process && process.env && process.env.KINVEY_RPC_NAMESPACE || undefined || 'rpc';

	var CustomEndpoint = exports.CustomEndpoint = function () {
	  function CustomEndpoint() {
	    _classCallCheck(this, CustomEndpoint);

	    throw new _errors.KinveyError('Not allowed to create an instance of the `CustomEndpoint` class.', 'Please use `CustomEndpoint.execute()` function.');
	  }

	  _createClass(CustomEndpoint, null, [{
	    key: 'execute',
	    value: function execute(endpoint, args) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var client = options.client || _client.Client.sharedInstance();

	      if (!endpoint) {
	        return Promise.reject(new _errors.KinveyError('An endpoint argument is required.'));
	      }

	      if (!(0, _isString2.default)(endpoint)) {
	        return Promise.reject(new _errors.KinveyError('The endpoint argument must be a string.'));
	      }

	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.POST,
	        authType: _request.AuthType.Default,
	        url: _url2.default.format({
	          protocol: client.protocol,
	          host: client.host,
	          pathname: '/' + rpcNamespace + '/' + client.appKey + '/custom/' + endpoint
	        }),
	        properties: options.properties,
	        body: args,
	        timeout: options.timeout,
	        client: client
	      });
	      return request.execute().then(function (response) {
	        return response.data;
	      });
	    }
	  }]);

	  return CustomEndpoint;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.StatusCode = exports.Response = exports.RequestMethod = exports.Properties = exports.NetworkRequest = exports.KinveyResponse = exports.KinveyRequest = exports.Headers = exports.DeltaFetchRequest = exports.CacheRequest = exports.AuthType = undefined;

	var _cacherequest = __webpack_require__(237);

	var _cacherequest2 = _interopRequireDefault(_cacherequest);

	var _deltafetchrequest = __webpack_require__(253);

	var _deltafetchrequest2 = _interopRequireDefault(_deltafetchrequest);

	var _headers = __webpack_require__(240);

	var _headers2 = _interopRequireDefault(_headers);

	var _kinveyrequest = __webpack_require__(254);

	var _kinveyrequest2 = _interopRequireDefault(_kinveyrequest);

	var _kinveyresponse = __webpack_require__(250);

	var _kinveyresponse2 = _interopRequireDefault(_kinveyresponse);

	var _networkrequest = __webpack_require__(259);

	var _networkrequest2 = _interopRequireDefault(_networkrequest);

	var _request = __webpack_require__(238);

	var _request2 = _interopRequireDefault(_request);

	var _response = __webpack_require__(239);

	var _response2 = _interopRequireDefault(_response);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.AuthType = _kinveyrequest.AuthType;
	exports.CacheRequest = _cacherequest2.default;
	exports.DeltaFetchRequest = _deltafetchrequest2.default;
	exports.Headers = _headers2.default;
	exports.KinveyRequest = _kinveyrequest2.default;
	exports.KinveyResponse = _kinveyresponse2.default;
	exports.NetworkRequest = _networkrequest2.default;
	exports.Properties = _kinveyrequest.Properties;
	exports.RequestMethod = _request.RequestMethod;
	exports.Response = _response2.default;
	exports.StatusCode = _response.StatusCode;
	exports.default = _request2.default;

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _request = __webpack_require__(238);

	var _request2 = _interopRequireDefault(_request);

	var _kinveyresponse = __webpack_require__(250);

	var _kinveyresponse2 = _interopRequireDefault(_kinveyresponse);

	var _urlPattern = __webpack_require__(251);

	var _urlPattern2 = _interopRequireDefault(_urlPattern);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CacheRequest = function (_Request) {
	  _inherits(CacheRequest, _Request);

	  function CacheRequest() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, CacheRequest);

	    var _this = _possibleConstructorReturn(this, (CacheRequest.__proto__ || Object.getPrototypeOf(CacheRequest)).call(this, options));

	    _this.query = options.query;
	    _this.rack = _this.client.cacheRack;
	    return _this;
	  }

	  _createClass(CacheRequest, [{
	    key: 'execute',
	    value: function execute() {
	      var _this2 = this;

	      return _get(CacheRequest.prototype.__proto__ || Object.getPrototypeOf(CacheRequest.prototype), 'execute', this).call(this).then(function (response) {
	        if (!(response instanceof _kinveyresponse2.default)) {
	          response = new _kinveyresponse2.default({
	            statusCode: response.statusCode,
	            headers: response.headers,
	            data: response.data
	          });
	        }

	        if (!response.isSuccess()) {
	          throw response.error;
	        }

	        if (_this2.query) {
	          response.data = _this2.query.process(response.data);
	        }

	        return response;
	      });
	    }
	  }, {
	    key: 'toPlainObject',
	    value: function toPlainObject() {
	      var obj = _get(CacheRequest.prototype.__proto__ || Object.getPrototypeOf(CacheRequest.prototype), 'toPlainObject', this).call(this);
	      obj.appKey = this.appKey;
	      obj.collection = this.collection;
	      obj.entityId = this.entityId;
	      obj.encryptionKey = this.client ? this.client.encryptionKey : undefined;
	      return obj;
	    }
	  }, {
	    key: 'url',
	    get: function get() {
	      return _get(CacheRequest.prototype.__proto__ || Object.getPrototypeOf(CacheRequest.prototype), 'url', this);
	    },
	    set: function set(urlString) {
	      _set(CacheRequest.prototype.__proto__ || Object.getPrototypeOf(CacheRequest.prototype), 'url', urlString, this);
	      var pathname = global.escape(_url2.default.parse(urlString).pathname);
	      var pattern = new _urlPattern2.default('(/:namespace)(/)(:appKey)(/)(:collection)(/)(:entityId)(/)');

	      var _ref = pattern.match(pathname) || {};

	      var appKey = _ref.appKey;
	      var collection = _ref.collection;
	      var entityId = _ref.entityId;

	      this.appKey = appKey;
	      this.collection = collection;
	      this.entityId = entityId;
	    }
	  }]);

	  return CacheRequest;
	}(_request2.default);

	exports.default = CacheRequest;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RequestMethod = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _errors = __webpack_require__(183);

	var _client = __webpack_require__(59);

	var _response = __webpack_require__(239);

	var _response2 = _interopRequireDefault(_response);

	var _headers = __webpack_require__(240);

	var _headers2 = _interopRequireDefault(_headers);

	var _qs = __webpack_require__(243);

	var _qs2 = _interopRequireDefault(_qs);

	var _appendQuery = __webpack_require__(247);

	var _appendQuery2 = _interopRequireDefault(_appendQuery);

	var _assign = __webpack_require__(220);

	var _assign2 = _interopRequireDefault(_assign);

	var _isString = __webpack_require__(234);

	var _isString2 = _interopRequireDefault(_isString);

	var _isNumber = __webpack_require__(249);

	var _isNumber2 = _interopRequireDefault(_isNumber);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var defaultTimeout = process && process.env && process.env.KINVEY_DEFAULT_TIMEOUT || undefined || 10000;

	var RequestMethod = {
	  GET: 'GET',
	  POST: 'POST',
	  PATCH: 'PATCH',
	  PUT: 'PUT',
	  DELETE: 'DELETE'
	};
	Object.freeze(RequestMethod);
	exports.RequestMethod = RequestMethod;

	var Request = function () {
	  function Request() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Request);

	    options = (0, _assign2.default)({
	      followRedirect: true
	    }, options);

	    this.client = options.client;
	    this.method = options.method || RequestMethod.GET;
	    this.headers = options.headers || new _headers2.default();
	    this.url = options.url || '';
	    this.body = options.body || options.data;
	    this.timeout = options.timeout || defaultTimeout;
	    this.followRedirect = options.followRedirect === true;
	    this.cache = options.cache === true;
	    this.executing = false;
	  }

	  _createClass(Request, [{
	    key: 'isExecuting',
	    value: function isExecuting() {
	      return !!this.executing;
	    }
	  }, {
	    key: 'execute',
	    value: function execute() {
	      if (!this.rack) {
	        return Promise.reject(new _errors.KinveyError('Unable to execute the request. Please provide a rack to execute the request.'));
	      }

	      return this.rack.execute(this.toPlainObject()).then(function (response) {
	        if (!response) {
	          throw new _errors.NoResponseError();
	        }

	        if (!(response instanceof _response2.default)) {
	          response = new _response2.default({
	            statusCode: response.statusCode,
	            headers: response.headers,
	            data: response.data
	          });
	        }

	        return response;
	      });
	    }
	  }, {
	    key: 'cancel',
	    value: function cancel() {
	      return this.rack.cancel();
	    }
	  }, {
	    key: 'toPlainObject',
	    value: function toPlainObject() {
	      return {
	        method: this.method,
	        headers: this.headers.toPlainObject(),
	        url: this.url,
	        body: this.body,
	        timeout: this.timeout,
	        followRedirect: this.followRedirect
	      };
	    }
	  }, {
	    key: 'client',
	    get: function get() {
	      return this._client || _client.Client.sharedInstance();
	    },
	    set: function set(client) {
	      if (client) {
	        if (!(client instanceof _client.Client)) {
	          throw new _errors.KinveyError('client must be an instance of the Client class.');
	        }
	      }

	      this._client = client;
	    }
	  }, {
	    key: 'method',
	    get: function get() {
	      return this._method;
	    },
	    set: function set(method) {
	      if (!(0, _isString2.default)(method)) {
	        method = String(method);
	      }

	      method = method.toUpperCase();
	      switch (method) {
	        case RequestMethod.GET:
	        case RequestMethod.POST:
	        case RequestMethod.PATCH:
	        case RequestMethod.PUT:
	        case RequestMethod.DELETE:
	          this._method = method;
	          break;
	        default:
	          throw new Error('Invalid request method. Only GET, POST, PATCH, PUT, and DELETE are allowed.');
	      }
	    }
	  }, {
	    key: 'headers',
	    get: function get() {
	      return this._headers;
	    },
	    set: function set(headers) {
	      if (!(headers instanceof _headers2.default)) {
	        headers = new _headers2.default(headers);
	      }

	      this._headers = headers;
	    }
	  }, {
	    key: 'url',
	    get: function get() {
	      if (this.cache === true) {
	        return (0, _appendQuery2.default)(this._url, _qs2.default.stringify({
	          _: Math.random().toString(36).substr(2)
	        }));
	      }

	      return this._url;
	    },
	    set: function set(urlString) {
	      this._url = urlString;
	    }
	  }, {
	    key: 'data',
	    get: function get() {
	      return this.body;
	    },
	    set: function set(data) {
	      this.body = data;
	    }
	  }, {
	    key: 'timeout',
	    get: function get() {
	      return this._timeout;
	    },
	    set: function set(timeout) {
	      this._timeout = (0, _isNumber2.default)(timeout) ? timeout : defaultTimeout;
	    }
	  }, {
	    key: 'followRedirect',
	    get: function get() {
	      return this._followRedirect;
	    },
	    set: function set(followRedirect) {
	      this._followRedirect = !!followRedirect;
	    }
	  }, {
	    key: 'cache',
	    get: function get() {
	      return this._cache;
	    },
	    set: function set(cache) {
	      this._cache = !!cache;
	    }
	  }]);

	  return Request;
	}();

	exports.default = Request;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.StatusCode = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _headers = __webpack_require__(240);

	var _headers2 = _interopRequireDefault(_headers);

	var _errors = __webpack_require__(183);

	var _assign = __webpack_require__(220);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StatusCode = {
	  Ok: 200,
	  Created: 201,
	  Empty: 204,
	  RedirectTemporarily: 301,
	  RedirectPermanently: 302,
	  NotModified: 304,
	  ResumeIncomplete: 308,
	  NotFound: 404,
	  ServerError: 500
	};
	Object.freeze(StatusCode);
	exports.StatusCode = StatusCode;

	var Response = function () {
	  function Response() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Response);

	    options = (0, _assign2.default)({
	      statusCode: StatusCode.Empty,
	      headers: new _headers2.default(),
	      data: null
	    }, options);

	    this.statusCode = options.statusCode;
	    this.headers = options.headers;
	    this.data = options.data;
	  }

	  _createClass(Response, [{
	    key: 'isSuccess',
	    value: function isSuccess() {
	      return this.statusCode >= 200 && this.statusCode < 300 || this.statusCode === StatusCode.RedirectPermanently || this.statusCode === StatusCode.NotModified;
	    }
	  }, {
	    key: 'headers',
	    get: function get() {
	      return this._headers;
	    },
	    set: function set(headers) {
	      if (!(headers instanceof _headers2.default)) {
	        headers = new _headers2.default(headers);
	      }

	      this._headers = headers;
	    }
	  }, {
	    key: 'error',
	    get: function get() {
	      if (this.isSuccess()) {
	        return null;
	      }

	      var data = this.data || {};
	      var message = data.message || data.description;
	      var debug = data.debug;
	      var code = this.statusCode;

	      return new _errors.KinveyError(message, debug, code);
	    }
	  }]);

	  return Response;
	}();

	exports.default = Response;

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _forEach = __webpack_require__(191);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _isString = __webpack_require__(234);

	var _isString2 = _interopRequireDefault(_isString);

	var _isPlainObject = __webpack_require__(241);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Headers = function () {
	  function Headers() {
	    var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Headers);

	    this.headers = {};
	    this.addAll(headers);
	  }

	  _createClass(Headers, [{
	    key: 'get',
	    value: function get(name) {
	      if (name) {
	        if (!(0, _isString2.default)(name)) {
	          name = String(name);
	        }

	        var headers = this.headers;
	        return headers[name.toLowerCase()];
	      }

	      return undefined;
	    }
	  }, {
	    key: 'set',
	    value: function set(name, value) {
	      if (name === undefined || name === null || value === undefined || value === null) {
	        throw new Error('A name and value must be provided to set a header.');
	      }

	      if (!(0, _isString2.default)(name)) {
	        name = String(name);
	      }

	      var headers = this.headers;
	      name = name.toLowerCase();

	      if (!(0, _isString2.default)(value)) {
	        headers[name] = JSON.stringify(value);
	      } else {
	        headers[name] = value;
	      }

	      this.headers = headers;
	      return this;
	    }
	  }, {
	    key: 'has',
	    value: function has(name) {
	      return !!this.get(name);
	    }
	  }, {
	    key: 'add',
	    value: function add() {
	      var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      return this.set(header.name, header.value);
	    }
	  }, {
	    key: 'addAll',
	    value: function addAll() {
	      var _this = this;

	      var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      if (headers instanceof Headers) {
	        headers = headers.toPlainObject();
	      }

	      if (!(0, _isPlainObject2.default)(headers)) {
	        throw new Error('Headers argument must be an object.');
	      }

	      var names = Object.keys(headers);
	      (0, _forEach2.default)(names, function (name) {
	        var value = headers[name];
	        _this.set(name, value);
	      });
	      return this;
	    }
	  }, {
	    key: 'remove',
	    value: function remove(name) {
	      if (name) {
	        if (!(0, _isString2.default)(name)) {
	          name = String(name);
	        }

	        var headers = this.headers;
	        delete headers[name.toLowerCase()];
	        this.headers = headers;
	      }

	      return this;
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.headers = {};
	      return this;
	    }
	  }, {
	    key: 'toPlainObject',
	    value: function toPlainObject() {
	      return this.headers;
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return JSON.stringify(this.toPlainObject());
	    }
	  }]);

	  return Headers;
	}();

	exports.default = Headers;

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(242),
	    isObjectLike = __webpack_require__(132);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || objectToString.call(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(138);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stringify = __webpack_require__(244);
	var Parse = __webpack_require__(246);

	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Utils = __webpack_require__(245);

	var arrayPrefixGenerators = {
	    brackets: function brackets(prefix) {
	        return prefix + '[]';
	    },
	    indices: function indices(prefix, key) {
	        return prefix + '[' + key + ']';
	    },
	    repeat: function repeat(prefix) {
	        return prefix;
	    }
	};

	var defaults = {
	    delimiter: '&',
	    strictNullHandling: false,
	    skipNulls: false,
	    encode: true,
	    encoder: Utils.encode
	};

	var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots) {
	    var obj = object;
	    if (typeof filter === 'function') {
	        obj = filter(prefix, obj);
	    } else if (obj instanceof Date) {
	        obj = obj.toISOString();
	    } else if (obj === null) {
	        if (strictNullHandling) {
	            return encoder ? encoder(prefix) : prefix;
	        }

	        obj = '';
	    }

	    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || Utils.isBuffer(obj)) {
	        if (encoder) {
	            return [encoder(prefix) + '=' + encoder(obj)];
	        }
	        return [prefix + '=' + String(obj)];
	    }

	    var values = [];

	    if (typeof obj === 'undefined') {
	        return values;
	    }

	    var objKeys;
	    if (Array.isArray(filter)) {
	        objKeys = filter;
	    } else {
	        var keys = Object.keys(obj);
	        objKeys = sort ? keys.sort(sort) : keys;
	    }

	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];

	        if (skipNulls && obj[key] === null) {
	            continue;
	        }

	        if (Array.isArray(obj)) {
	            values = values.concat(stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots));
	        } else {
	            values = values.concat(stringify(obj[key], prefix + (allowDots ? '.' + key : '[' + key + ']'), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots));
	        }
	    }

	    return values;
	};

	module.exports = function (object, opts) {
	    var obj = object;
	    var options = opts || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
	    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
	    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
	    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
	    var encoder = encode ? (typeof options.encoder === 'function' ? options.encoder : defaults.encoder) : null;
	    var sort = typeof options.sort === 'function' ? options.sort : null;
	    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
	    var objKeys;
	    var filter;

	    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
	        throw new TypeError('Encoder has to be a function.');
	    }

	    if (typeof options.filter === 'function') {
	        filter = options.filter;
	        obj = filter('', obj);
	    } else if (Array.isArray(options.filter)) {
	        objKeys = filter = options.filter;
	    }

	    var keys = [];

	    if (typeof obj !== 'object' || obj === null) {
	        return '';
	    }

	    var arrayFormat;
	    if (options.arrayFormat in arrayPrefixGenerators) {
	        arrayFormat = options.arrayFormat;
	    } else if ('indices' in options) {
	        arrayFormat = options.indices ? 'indices' : 'repeat';
	    } else {
	        arrayFormat = 'indices';
	    }

	    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

	    if (!objKeys) {
	        objKeys = Object.keys(obj);
	    }

	    if (sort) {
	        objKeys.sort(sort);
	    }

	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];

	        if (skipNulls && obj[key] === null) {
	            continue;
	        }

	        keys = keys.concat(stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots));
	    }

	    return keys.join(delimiter);
	};


/***/ },
/* 245 */
/***/ function(module, exports) {

	'use strict';

	var hexTable = (function () {
	    var array = new Array(256);
	    for (var i = 0; i < 256; ++i) {
	        array[i] = '%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase();
	    }

	    return array;
	}());

	exports.arrayToObject = function (source, options) {
	    var obj = options.plainObjects ? Object.create(null) : {};
	    for (var i = 0; i < source.length; ++i) {
	        if (typeof source[i] !== 'undefined') {
	            obj[i] = source[i];
	        }
	    }

	    return obj;
	};

	exports.merge = function (target, source, options) {
	    if (!source) {
	        return target;
	    }

	    if (typeof source !== 'object') {
	        if (Array.isArray(target)) {
	            target.push(source);
	        } else if (typeof target === 'object') {
	            target[source] = true;
	        } else {
	            return [target, source];
	        }

	        return target;
	    }

	    if (typeof target !== 'object') {
	        return [target].concat(source);
	    }

	    var mergeTarget = target;
	    if (Array.isArray(target) && !Array.isArray(source)) {
	        mergeTarget = exports.arrayToObject(target, options);
	    }

	    return Object.keys(source).reduce(function (acc, key) {
	        var value = source[key];

	        if (Object.prototype.hasOwnProperty.call(acc, key)) {
	            acc[key] = exports.merge(acc[key], value, options);
	        } else {
	            acc[key] = value;
	        }
	        return acc;
	    }, mergeTarget);
	};

	exports.decode = function (str) {
	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};

	exports.encode = function (str) {
	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	    // It has been adapted here for stricter adherence to RFC 3986
	    if (str.length === 0) {
	        return str;
	    }

	    var string = typeof str === 'string' ? str : String(str);

	    var out = '';
	    for (var i = 0; i < string.length; ++i) {
	        var c = string.charCodeAt(i);

	        if (
	            c === 0x2D || // -
	            c === 0x2E || // .
	            c === 0x5F || // _
	            c === 0x7E || // ~
	            (c >= 0x30 && c <= 0x39) || // 0-9
	            (c >= 0x41 && c <= 0x5A) || // a-z
	            (c >= 0x61 && c <= 0x7A) // A-Z
	        ) {
	            out += string.charAt(i);
	            continue;
	        }

	        if (c < 0x80) {
	            out = out + hexTable[c];
	            continue;
	        }

	        if (c < 0x800) {
	            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }

	        if (c < 0xD800 || c >= 0xE000) {
	            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }

	        i += 1;
	        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
	        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)];
	    }

	    return out;
	};

	exports.compact = function (obj, references) {
	    if (typeof obj !== 'object' || obj === null) {
	        return obj;
	    }

	    var refs = references || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }

	    refs.push(obj);

	    if (Array.isArray(obj)) {
	        var compacted = [];

	        for (var i = 0; i < obj.length; ++i) {
	            if (obj[i] && typeof obj[i] === 'object') {
	                compacted.push(exports.compact(obj[i], refs));
	            } else if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }

	        return compacted;
	    }

	    var keys = Object.keys(obj);
	    for (var j = 0; j < keys.length; ++j) {
	        var key = keys[j];
	        obj[key] = exports.compact(obj[key], refs);
	    }

	    return obj;
	};

	exports.isRegExp = function (obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};

	exports.isBuffer = function (obj) {
	    if (obj === null || typeof obj === 'undefined') {
	        return false;
	    }

	    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
	};


/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Utils = __webpack_require__(245);

	var defaults = {
	    delimiter: '&',
	    depth: 5,
	    arrayLimit: 20,
	    parameterLimit: 1000,
	    strictNullHandling: false,
	    plainObjects: false,
	    allowPrototypes: false,
	    allowDots: false,
	    decoder: Utils.decode
	};

	var parseValues = function parseValues(str, options) {
	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

	    for (var i = 0; i < parts.length; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

	        if (pos === -1) {
	            obj[options.decoder(part)] = '';

	            if (options.strictNullHandling) {
	                obj[options.decoder(part)] = null;
	            }
	        } else {
	            var key = options.decoder(part.slice(0, pos));
	            var val = options.decoder(part.slice(pos + 1));

	            if (Object.prototype.hasOwnProperty.call(obj, key)) {
	                obj[key] = [].concat(obj[key]).concat(val);
	            } else {
	                obj[key] = val;
	            }
	        }
	    }

	    return obj;
	};

	var parseObject = function parseObject(chain, val, options) {
	    if (!chain.length) {
	        return val;
	    }

	    var root = chain.shift();

	    var obj;
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(parseObject(chain, val, options));
	    } else {
	        obj = options.plainObjects ? Object.create(null) : {};
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        if (
	            !isNaN(index) &&
	            root !== cleanRoot &&
	            String(index) === cleanRoot &&
	            index >= 0 &&
	            (options.parseArrays && index <= options.arrayLimit)
	        ) {
	            obj = [];
	            obj[index] = parseObject(chain, val, options);
	        } else {
	            obj[cleanRoot] = parseObject(chain, val, options);
	        }
	    }

	    return obj;
	};

	var parseKeys = function parseKeys(givenKey, val, options) {
	    if (!givenKey) {
	        return;
	    }

	    // Transform dot notation to bracket notation
	    var key = options.allowDots ? givenKey.replace(/\.([^\.\[]+)/g, '[$1]') : givenKey;

	    // The regex chunks

	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;

	    // Get the parent

	    var segment = parent.exec(key);

	    // Stash the parent if it exists

	    var keys = [];
	    if (segment[1]) {
	        // If we aren't using plain objects, optionally prefix keys
	        // that would overwrite object prototype properties
	        if (!options.plainObjects && Object.prototype.hasOwnProperty(segment[1])) {
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }

	        keys.push(segment[1]);
	    }

	    // Loop through children appending to the array until we hit depth

	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {
	        i += 1;
	        if (!options.plainObjects && Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
	            if (!options.allowPrototypes) {
	                continue;
	            }
	        }
	        keys.push(segment[1]);
	    }

	    // If there's a remainder, just add whatever is left

	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }

	    return parseObject(keys, val, options);
	};

	module.exports = function (str, opts) {
	    var options = opts || {};

	    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
	        throw new TypeError('Decoder has to be a function.');
	    }

	    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
	    options.parseArrays = options.parseArrays !== false;
	    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
	    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
	    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
	    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
	    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

	    if (str === '' || str === null || typeof str === 'undefined') {
	        return options.plainObjects ? Object.create(null) : {};
	    }

	    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
	    var obj = options.plainObjects ? Object.create(null) : {};

	    // Iterate over the keys and setup the new object

	    var keys = Object.keys(tempObj);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var newObj = parseKeys(key, tempObj[key], options);
	        obj = Utils.merge(obj, newObj, options);
	    }

	    return Utils.compact(obj);
	};


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var querystring = __webpack_require__(217)
	  , extend = __webpack_require__(248)
	  , url = __webpack_require__(215)

	module.exports = function appendQuery(uri, q) {
	  var parts = url.parse(uri, true)
	    , parsedQuery = extend(true, {}, parts.query, typeof q === 'string' ? querystring.parse(q) : q)

	  parts.search = '?' + serialize(parsedQuery)
	  return url.format(parts)
	}

	// serialize an object recursively
	function serialize(obj, prefix) {
	  var str = []
	    , useArraySyntax = false

	  // if there's a prefix, and this object is an array, use array syntax
	  // i.e., `prefix[]=foo&prefix[]=bar` instead of `prefix[0]=foo&prefix[1]=bar`
	  if (Array.isArray(obj) && prefix) {
	    useArraySyntax = true
	  }

	  Object.keys(obj).forEach(function (prop) {
	    var key, query, val = obj[prop]

	    key = prefix ?
	      prefix + '[' + (useArraySyntax ? '' : prop) + ']' :
	      prop

	    query = typeof val === 'object' ?
	      serialize(val, key) :
	      encodeURIComponent(key) + '=' + encodeURIComponent(val)

	    str.push(query)
	  })

	  return str.join('&')
	}


/***/ },
/* 248 */
/***/ function(module, exports) {

	var hasOwn = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;
	var undefined;

	var isPlainObject = function isPlainObject(obj) {
		"use strict";
		if (!obj || toString.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval) {
			return false;
		}

		var has_own_constructor = hasOwn.call(obj, 'constructor');
		var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {}

		return key === undefined || hasOwn.call(obj, key);
	};

	module.exports = function extend() {
		"use strict";
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if (typeof target !== "object" && typeof target !== "function" || target == undefined) {
				target = {};
		}

		for (; i < length; ++i) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};



/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(132);

	/** `Object#toString` result references. */
	var numberTag = '[object Number]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	 * classified as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
	 * @example
	 *
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' ||
	    (isObjectLike(value) && objectToString.call(value) == numberTag);
	}

	module.exports = isNumber;


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _errors = __webpack_require__(183);

	var _response = __webpack_require__(239);

	var _response2 = _interopRequireDefault(_response);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var KinveyResponse = function (_Response) {
	  _inherits(KinveyResponse, _Response);

	  function KinveyResponse() {
	    _classCallCheck(this, KinveyResponse);

	    return _possibleConstructorReturn(this, (KinveyResponse.__proto__ || Object.getPrototypeOf(KinveyResponse)).apply(this, arguments));
	  }

	  _createClass(KinveyResponse, [{
	    key: 'error',
	    get: function get() {
	      if (this.isSuccess()) {
	        return null;
	      }

	      var data = this.data || {};
	      var name = data.name || data.error;
	      var message = data.message || data.description;
	      var debug = data.debug;
	      var code = this.statusCode;

	      if (name === 'FeatureUnavailableError') {
	        return new _errors.FeatureUnavailableError(message, debug, code);
	      } else if (name === 'IncompleteRequestBodyError') {
	        return new _errors.IncompleteRequestBodyError(message, debug, code);
	      } else if (name === 'InsufficientCredentials') {
	        return new _errors.InsufficientCredentialsError(message, debug, code);
	      } else if (name === 'InvalidCredentials') {
	        return new _errors.InvalidCredentialsError(message, debug, code);
	      } else if (name === 'InvalidIdentifierError') {
	        return new _errors.InvalidIdentifierError(message, debug, code);
	      } else if (name === 'InvalidQuerySyntaxError') {
	        return new _errors.InvalidQuerySyntaxError(message, debug, code);
	      } else if (name === 'JSONParseError') {
	        return new _errors.JSONParseError(message, debug, code);
	      } else if (name === 'MissingQueryError') {
	        return new _errors.MissingQueryError(message, debug, code);
	      } else if (name === 'MissingRequestHeaderError') {
	        return new _errors.MissingRequestHeaderError(message, debug, code);
	      } else if (name === 'MissingRequestParameterError') {
	        return new _errors.MissingRequestParameterError(message, debug, code);
	      } else if (name === 'EntityNotFound' || name === 'CollectionNotFound' || name === 'AppNotFound' || name === 'UserNotFound' || name === 'BlobNotFound' || name === 'DocumentNotFound' || code === _response.StatusCode.NotFound) {
	        return new _errors.NotFoundError(message, debug, code);
	      } else if (name === 'ParameterValueOutOfRangeError') {
	        return new _errors.ParameterValueOutOfRangeError(message, debug, code);
	      } else if (name === 'ServerError' || code === _response.StatusCode.ServerError) {
	        return new _errors.ServerError(message, debug, code);
	      }

	      return _get(KinveyResponse.prototype.__proto__ || Object.getPrototypeOf(KinveyResponse.prototype), 'error', this);
	    }
	  }]);

	  return KinveyResponse;
	}(_response2.default);

	exports.default = KinveyResponse;

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.10.0
	var slice = [].slice;

	(function(root, factory) {
	  if (('function' === "function") && (__webpack_require__(252) != null)) {
	    return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined" && exports !== null) {
	    return module.exports = factory();
	  } else {
	    return root.UrlPattern = factory();
	  }
	})(this, function() {
	  var P, UrlPattern, astNodeContainsSegmentsForProvidedParams, astNodeToNames, astNodeToRegexString, baseAstNodeToRegexString, concatMap, defaultOptions, escapeForRegex, getParam, keysAndValuesToObject, newParser, regexGroupCount, stringConcatMap, stringify;
	  escapeForRegex = function(string) {
	    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	  };
	  concatMap = function(array, f) {
	    var i, length, results;
	    results = [];
	    i = -1;
	    length = array.length;
	    while (++i < length) {
	      results = results.concat(f(array[i]));
	    }
	    return results;
	  };
	  stringConcatMap = function(array, f) {
	    var i, length, result;
	    result = '';
	    i = -1;
	    length = array.length;
	    while (++i < length) {
	      result += f(array[i]);
	    }
	    return result;
	  };
	  regexGroupCount = function(regex) {
	    return (new RegExp(regex.toString() + '|')).exec('').length - 1;
	  };
	  keysAndValuesToObject = function(keys, values) {
	    var i, key, length, object, value;
	    object = {};
	    i = -1;
	    length = keys.length;
	    while (++i < length) {
	      key = keys[i];
	      value = values[i];
	      if (value == null) {
	        continue;
	      }
	      if (object[key] != null) {
	        if (!Array.isArray(object[key])) {
	          object[key] = [object[key]];
	        }
	        object[key].push(value);
	      } else {
	        object[key] = value;
	      }
	    }
	    return object;
	  };
	  P = {};
	  P.Result = function(value, rest) {
	    this.value = value;
	    this.rest = rest;
	  };
	  P.Tagged = function(tag, value) {
	    this.tag = tag;
	    this.value = value;
	  };
	  P.tag = function(tag, parser) {
	    return function(input) {
	      var result, tagged;
	      result = parser(input);
	      if (result == null) {
	        return;
	      }
	      tagged = new P.Tagged(tag, result.value);
	      return new P.Result(tagged, result.rest);
	    };
	  };
	  P.regex = function(regex) {
	    return function(input) {
	      var matches, result;
	      matches = regex.exec(input);
	      if (matches == null) {
	        return;
	      }
	      result = matches[0];
	      return new P.Result(result, input.slice(result.length));
	    };
	  };
	  P.sequence = function() {
	    var parsers;
	    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return function(input) {
	      var i, length, parser, rest, result, values;
	      i = -1;
	      length = parsers.length;
	      values = [];
	      rest = input;
	      while (++i < length) {
	        parser = parsers[i];
	        result = parser(rest);
	        if (result == null) {
	          return;
	        }
	        values.push(result.value);
	        rest = result.rest;
	      }
	      return new P.Result(values, rest);
	    };
	  };
	  P.pick = function() {
	    var indexes, parsers;
	    indexes = arguments[0], parsers = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return function(input) {
	      var array, result;
	      result = P.sequence.apply(P, parsers)(input);
	      if (result == null) {
	        return;
	      }
	      array = result.value;
	      result.value = array[indexes];
	      return result;
	    };
	  };
	  P.string = function(string) {
	    var length;
	    length = string.length;
	    return function(input) {
	      if (input.slice(0, length) === string) {
	        return new P.Result(string, input.slice(length));
	      }
	    };
	  };
	  P.lazy = function(fn) {
	    var cached;
	    cached = null;
	    return function(input) {
	      if (cached == null) {
	        cached = fn();
	      }
	      return cached(input);
	    };
	  };
	  P.baseMany = function(parser, end, stringResult, atLeastOneResultRequired, input) {
	    var endResult, parserResult, rest, results;
	    rest = input;
	    results = stringResult ? '' : [];
	    while (true) {
	      if (end != null) {
	        endResult = end(rest);
	        if (endResult != null) {
	          break;
	        }
	      }
	      parserResult = parser(rest);
	      if (parserResult == null) {
	        break;
	      }
	      if (stringResult) {
	        results += parserResult.value;
	      } else {
	        results.push(parserResult.value);
	      }
	      rest = parserResult.rest;
	    }
	    if (atLeastOneResultRequired && results.length === 0) {
	      return;
	    }
	    return new P.Result(results, rest);
	  };
	  P.many1 = function(parser) {
	    return function(input) {
	      return P.baseMany(parser, null, false, true, input);
	    };
	  };
	  P.concatMany1Till = function(parser, end) {
	    return function(input) {
	      return P.baseMany(parser, end, true, true, input);
	    };
	  };
	  P.firstChoice = function() {
	    var parsers;
	    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return function(input) {
	      var i, length, parser, result;
	      i = -1;
	      length = parsers.length;
	      while (++i < length) {
	        parser = parsers[i];
	        result = parser(input);
	        if (result != null) {
	          return result;
	        }
	      }
	    };
	  };
	  newParser = function(options) {
	    var U;
	    U = {};
	    U.wildcard = P.tag('wildcard', P.string(options.wildcardChar));
	    U.optional = P.tag('optional', P.pick(1, P.string(options.optionalSegmentStartChar), P.lazy(function() {
	      return U.pattern;
	    }), P.string(options.optionalSegmentEndChar)));
	    U.name = P.regex(new RegExp("^[" + options.segmentNameCharset + "]+"));
	    U.named = P.tag('named', P.pick(1, P.string(options.segmentNameStartChar), P.lazy(function() {
	      return U.name;
	    })));
	    U.escapedChar = P.pick(1, P.string(options.escapeChar), P.regex(/^./));
	    U["static"] = P.tag('static', P.concatMany1Till(P.firstChoice(P.lazy(function() {
	      return U.escapedChar;
	    }), P.regex(/^./)), P.firstChoice(P.string(options.segmentNameStartChar), P.string(options.optionalSegmentStartChar), P.string(options.optionalSegmentEndChar), U.wildcard)));
	    U.token = P.lazy(function() {
	      return P.firstChoice(U.wildcard, U.optional, U.named, U["static"]);
	    });
	    U.pattern = P.many1(P.lazy(function() {
	      return U.token;
	    }));
	    return U;
	  };
	  defaultOptions = {
	    escapeChar: '\\',
	    segmentNameStartChar: ':',
	    segmentValueCharset: 'a-zA-Z0-9-_~ %',
	    segmentNameCharset: 'a-zA-Z0-9',
	    optionalSegmentStartChar: '(',
	    optionalSegmentEndChar: ')',
	    wildcardChar: '*'
	  };
	  baseAstNodeToRegexString = function(astNode, segmentValueCharset) {
	    if (Array.isArray(astNode)) {
	      return stringConcatMap(astNode, function(node) {
	        return baseAstNodeToRegexString(node, segmentValueCharset);
	      });
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return '(.*?)';
	      case 'named':
	        return "([" + segmentValueCharset + "]+)";
	      case 'static':
	        return escapeForRegex(astNode.value);
	      case 'optional':
	        return '(?:' + baseAstNodeToRegexString(astNode.value, segmentValueCharset) + ')?';
	    }
	  };
	  astNodeToRegexString = function(astNode, segmentValueCharset) {
	    if (segmentValueCharset == null) {
	      segmentValueCharset = defaultOptions.segmentValueCharset;
	    }
	    return '^' + baseAstNodeToRegexString(astNode, segmentValueCharset) + '$';
	  };
	  astNodeToNames = function(astNode) {
	    if (Array.isArray(astNode)) {
	      return concatMap(astNode, astNodeToNames);
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return ['_'];
	      case 'named':
	        return [astNode.value];
	      case 'static':
	        return [];
	      case 'optional':
	        return astNodeToNames(astNode.value);
	    }
	  };
	  getParam = function(params, key, nextIndexes, sideEffects) {
	    var index, maxIndex, result, value;
	    if (sideEffects == null) {
	      sideEffects = false;
	    }
	    value = params[key];
	    if (value == null) {
	      if (sideEffects) {
	        throw new Error("no values provided for key `" + key + "`");
	      } else {
	        return;
	      }
	    }
	    index = nextIndexes[key] || 0;
	    maxIndex = Array.isArray(value) ? value.length - 1 : 0;
	    if (index > maxIndex) {
	      if (sideEffects) {
	        throw new Error("too few values provided for key `" + key + "`");
	      } else {
	        return;
	      }
	    }
	    result = Array.isArray(value) ? value[index] : value;
	    if (sideEffects) {
	      nextIndexes[key] = index + 1;
	    }
	    return result;
	  };
	  astNodeContainsSegmentsForProvidedParams = function(astNode, params, nextIndexes) {
	    var i, length;
	    if (Array.isArray(astNode)) {
	      i = -1;
	      length = astNode.length;
	      while (++i < length) {
	        if (astNodeContainsSegmentsForProvidedParams(astNode[i], params, nextIndexes)) {
	          return true;
	        }
	      }
	      return false;
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return getParam(params, '_', nextIndexes, false) != null;
	      case 'named':
	        return getParam(params, astNode.value, nextIndexes, false) != null;
	      case 'static':
	        return false;
	      case 'optional':
	        return astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes);
	    }
	  };
	  stringify = function(astNode, params, nextIndexes) {
	    if (Array.isArray(astNode)) {
	      return stringConcatMap(astNode, function(node) {
	        return stringify(node, params, nextIndexes);
	      });
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return getParam(params, '_', nextIndexes, true);
	      case 'named':
	        return getParam(params, astNode.value, nextIndexes, true);
	      case 'static':
	        return astNode.value;
	      case 'optional':
	        if (astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes)) {
	          return stringify(astNode.value, params, nextIndexes);
	        } else {
	          return '';
	        }
	    }
	  };
	  UrlPattern = function(arg1, arg2) {
	    var groupCount, options, parsed, parser, withoutWhitespace;
	    if (arg1 instanceof UrlPattern) {
	      this.isRegex = arg1.isRegex;
	      this.regex = arg1.regex;
	      this.ast = arg1.ast;
	      this.names = arg1.names;
	      return;
	    }
	    this.isRegex = arg1 instanceof RegExp;
	    if (!(('string' === typeof arg1) || this.isRegex)) {
	      throw new TypeError('argument must be a regex or a string');
	    }
	    if (this.isRegex) {
	      this.regex = arg1;
	      if (arg2 != null) {
	        if (!Array.isArray(arg2)) {
	          throw new Error('if first argument is a regex the second argument may be an array of group names but you provided something else');
	        }
	        groupCount = regexGroupCount(this.regex);
	        if (arg2.length !== groupCount) {
	          throw new Error("regex contains " + groupCount + " groups but array of group names contains " + arg2.length);
	        }
	        this.names = arg2;
	      }
	      return;
	    }
	    if (arg1 === '') {
	      throw new Error('argument must not be the empty string');
	    }
	    withoutWhitespace = arg1.replace(/\s+/g, '');
	    if (withoutWhitespace !== arg1) {
	      throw new Error('argument must not contain whitespace');
	    }
	    options = {
	      escapeChar: (arg2 != null ? arg2.escapeChar : void 0) || defaultOptions.escapeChar,
	      segmentNameStartChar: (arg2 != null ? arg2.segmentNameStartChar : void 0) || defaultOptions.segmentNameStartChar,
	      segmentNameCharset: (arg2 != null ? arg2.segmentNameCharset : void 0) || defaultOptions.segmentNameCharset,
	      segmentValueCharset: (arg2 != null ? arg2.segmentValueCharset : void 0) || defaultOptions.segmentValueCharset,
	      optionalSegmentStartChar: (arg2 != null ? arg2.optionalSegmentStartChar : void 0) || defaultOptions.optionalSegmentStartChar,
	      optionalSegmentEndChar: (arg2 != null ? arg2.optionalSegmentEndChar : void 0) || defaultOptions.optionalSegmentEndChar,
	      wildcardChar: (arg2 != null ? arg2.wildcardChar : void 0) || defaultOptions.wildcardChar
	    };
	    parser = newParser(options);
	    parsed = parser.pattern(arg1);
	    if (parsed == null) {
	      throw new Error("couldn't parse pattern");
	    }
	    if (parsed.rest !== '') {
	      throw new Error("could only partially parse pattern");
	    }
	    this.ast = parsed.value;
	    this.regex = new RegExp(astNodeToRegexString(this.ast, options.segmentValueCharset));
	    this.names = astNodeToNames(this.ast);
	  };
	  UrlPattern.prototype.match = function(url) {
	    var groups, match;
	    match = this.regex.exec(url);
	    if (match == null) {
	      return null;
	    }
	    groups = match.slice(1);
	    if (this.names) {
	      return keysAndValuesToObject(this.names, groups);
	    } else {
	      return groups;
	    }
	  };
	  UrlPattern.prototype.stringify = function(params) {
	    if (params == null) {
	      params = {};
	    }
	    if (this.isRegex) {
	      throw new Error("can't stringify patterns generated from a regex");
	    }
	    if (params !== Object(params)) {
	      throw new Error("argument must be an object or undefined");
	    }
	    return stringify(this.ast, params, {});
	  };
	  UrlPattern.escapeForRegex = escapeForRegex;
	  UrlPattern.concatMap = concatMap;
	  UrlPattern.stringConcatMap = stringConcatMap;
	  UrlPattern.regexGroupCount = regexGroupCount;
	  UrlPattern.keysAndValuesToObject = keysAndValuesToObject;
	  UrlPattern.P = P;
	  UrlPattern.newParser = newParser;
	  UrlPattern.defaultOptions = defaultOptions;
	  UrlPattern.astNodeToRegexString = astNodeToRegexString;
	  UrlPattern.astNodeToNames = astNodeToNames;
	  UrlPattern.getParam = getParam;
	  UrlPattern.astNodeContainsSegmentsForProvidedParams = astNodeContainsSegmentsForProvidedParams;
	  UrlPattern.stringify = stringify;
	  return UrlPattern;
	});


/***/ },
/* 252 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _kinveyrequest = __webpack_require__(254);

	var _kinveyrequest2 = _interopRequireDefault(_kinveyrequest);

	var _request2 = __webpack_require__(238);

	var _cacherequest = __webpack_require__(237);

	var _cacherequest2 = _interopRequireDefault(_cacherequest);

	var _response = __webpack_require__(239);

	var _response2 = _interopRequireDefault(_response);

	var _errors = __webpack_require__(183);

	var _query3 = __webpack_require__(274);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _keyBy = __webpack_require__(280);

	var _keyBy2 = _interopRequireDefault(_keyBy);

	var _reduce = __webpack_require__(175);

	var _reduce2 = _interopRequireDefault(_reduce);

	var _result = __webpack_require__(284);

	var _result2 = _interopRequireDefault(_result);

	var _values = __webpack_require__(285);

	var _values2 = _interopRequireDefault(_values);

	var _forEach = __webpack_require__(191);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _isArray = __webpack_require__(133);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _isString = __webpack_require__(234);

	var _isString2 = _interopRequireDefault(_isString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var idAttribute = process && process.env && process.env.KINVEY_ID_ATTRIBUTE || undefined || '_id';
	var kmdAttribute = process && process.env && process.env.KINVEY_KMD_ATTRIBUTE || undefined || '_kmd';
	var maxIdsPerRequest = 200;

	var DeltaFetchRequest = function (_KinveyRequest) {
	  _inherits(DeltaFetchRequest, _KinveyRequest);

	  function DeltaFetchRequest() {
	    _classCallCheck(this, DeltaFetchRequest);

	    return _possibleConstructorReturn(this, (DeltaFetchRequest.__proto__ || Object.getPrototypeOf(DeltaFetchRequest)).apply(this, arguments));
	  }

	  _createClass(DeltaFetchRequest, [{
	    key: 'execute',
	    value: function execute() {
	      var _this2 = this;

	      return _get(DeltaFetchRequest.prototype.__proto__ || Object.getPrototypeOf(DeltaFetchRequest.prototype), 'execute', this).call(this).then(function () {
	        var request = new _cacherequest2.default({
	          method: _request2.RequestMethod.GET,
	          url: _this2.url,
	          headers: _this2.headers,
	          query: _this2.query,
	          timeout: _this2.timeout,
	          client: _this2.client
	        });
	        return request.execute().then(function (response) {
	          return response.data;
	        });
	      }).catch(function (error) {
	        if (!(error instanceof _errors.NotFoundError)) {
	          throw error;
	        }

	        return [];
	      }).then(function (cacheData) {
	        if ((0, _isArray2.default)(cacheData) && cacheData.length > 0) {
	          var _ret = function () {
	            var cacheDocuments = (0, _keyBy2.default)(cacheData, idAttribute);
	            var query = new _query3.Query((0, _result2.default)(_this2.query, 'toJSON', _this2.query));
	            query.fields = [idAttribute, kmdAttribute + '.lmt'];
	            var request = new _kinveyrequest2.default({
	              method: _request2.RequestMethod.GET,
	              url: _this2.url,
	              headers: _this2.headers,
	              auth: _this2.auth,
	              query: query,
	              timeout: _this2.timeout,
	              client: _this2.client
	            });

	            return {
	              v: request.execute().then(function (response) {
	                return response.data;
	              }).then(function (networkData) {
	                var networkDocuments = (0, _keyBy2.default)(networkData, idAttribute);
	                var deltaSet = networkDocuments;
	                var cacheDocumentIds = Object.keys(cacheDocuments);

	                (0, _forEach2.default)(cacheDocumentIds, function (id) {
	                  var cacheDocument = cacheDocuments[id];
	                  var networkDocument = networkDocuments[id];

	                  if (networkDocument) {
	                    if (networkDocument[kmdAttribute] && cacheDocument[kmdAttribute] && networkDocument[kmdAttribute].lmt === cacheDocument[kmdAttribute].lmt) {
	                      delete deltaSet[id];
	                    } else {
	                      delete cacheDocuments[id];
	                    }
	                  } else {
	                    delete cacheDocuments[id];
	                  }
	                });

	                var deltaSetIds = Object.keys(deltaSet);
	                var promises = [];
	                var i = 0;

	                while (i < deltaSetIds.length) {
	                  var _query = new _query3.Query((0, _result2.default)(_this2.query, 'toJSON', _this2.query));
	                  var ids = deltaSetIds.slice(i, deltaSetIds.length > maxIdsPerRequest + i ? maxIdsPerRequest : deltaSetIds.length);
	                  _query.contains(idAttribute, ids);
	                  var _request = new _kinveyrequest2.default({
	                    method: _request2.RequestMethod.GET,
	                    url: _this2.url,
	                    headers: _this2.headers,
	                    auth: _this2.auth,
	                    query: _query,
	                    timeout: _this2.timeout,
	                    client: _this2.client
	                  });

	                  var promise = _request.execute();
	                  promises.push(promise);
	                  i += maxIdsPerRequest;
	                }

	                return _es6Promise2.default.all(promises);
	              }).then(function (responses) {
	                var response = (0, _reduce2.default)(responses, function (result, response) {
	                  if (response.isSuccess()) {
	                    var headers = result.headers;
	                    headers.addHeaders(response.headers);
	                    result.headers = headers;
	                    result.data = result.data.concat(response.data);
	                  }

	                  return result;
	                }, new _response2.default({
	                  statusCode: _response.StatusCode.Ok,
	                  data: []
	                }));

	                response.data = response.data.concat((0, _values2.default)(cacheDocuments));

	                if (_this2.query) {
	                  var _query2 = new _query3.Query((0, _result2.default)(_this2.query, 'toJSON', _this2.query));
	                  _query2.skip(0).limit(0);
	                  response.data = _query2.process(response.data);
	                }

	                return response;
	              })
	            };
	          }();

	          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        }

	        var request = new _kinveyrequest2.default({
	          method: _request2.RequestMethod.GET,
	          url: _this2.url,
	          headers: _this2.headers,
	          auth: _this2.auth,
	          query: _this2.query,
	          timeout: _this2.timeout,
	          client: _this2.client
	        });
	        return request.execute();
	      });
	    }
	  }, {
	    key: 'method',
	    get: function get() {
	      return _get(DeltaFetchRequest.prototype.__proto__ || Object.getPrototypeOf(DeltaFetchRequest.prototype), 'method', this);
	    },
	    set: function set(method) {
	      if (!(0, _isString2.default)(method)) {
	        method = String(method);
	      }

	      method = method.toUpperCase();

	      switch (method) {
	        case _request2.RequestMethod.GET:
	          _set(DeltaFetchRequest.prototype.__proto__ || Object.getPrototypeOf(DeltaFetchRequest.prototype), 'method', method, this);
	          break;
	        case _request2.RequestMethod.POST:
	        case _request2.RequestMethod.PATCH:
	        case _request2.RequestMethod.PUT:
	        case _request2.RequestMethod.DELETE:
	        default:
	          throw new Error('Invalid request Method. Only RequestMethod.GET is allowed.');
	      }
	    }
	  }]);

	  return DeltaFetchRequest;
	}(_kinveyrequest2.default);

	exports.default = DeltaFetchRequest;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, Buffer) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Properties = exports.AuthType = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _request = __webpack_require__(238);

	var _headers = __webpack_require__(240);

	var _headers2 = _interopRequireDefault(_headers);

	var _networkrequest = __webpack_require__(259);

	var _networkrequest2 = _interopRequireDefault(_networkrequest);

	var _kinveyresponse = __webpack_require__(250);

	var _kinveyresponse2 = _interopRequireDefault(_kinveyresponse);

	var _errors = __webpack_require__(183);

	var _social = __webpack_require__(260);

	var _utils = __webpack_require__(185);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	var _qs = __webpack_require__(243);

	var _qs2 = _interopRequireDefault(_qs);

	var _appendQuery = __webpack_require__(247);

	var _appendQuery2 = _interopRequireDefault(_appendQuery);

	var _assign = __webpack_require__(220);

	var _assign2 = _interopRequireDefault(_assign);

	var _isNumber = __webpack_require__(249);

	var _isNumber2 = _interopRequireDefault(_isNumber);

	var _isEmpty = __webpack_require__(271);

	var _isEmpty2 = _interopRequireDefault(_isEmpty);

	var _isFunction = __webpack_require__(88);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var socialIdentityAttribute = process && process.env && process.env.KINVEY_SOCIAL_IDENTITY_ATTRIBUTE || undefined || '_socialIdentity';
	var tokenPathname = process && process.env && process.env.KINVEY_MIC_TOKEN_PATHNAME || undefined || '/oauth/token';
	var usersNamespace = process && process.env && process.env.KINVEY_USERS_NAMESPACE || undefined || 'user';
	var kmdAttribute = process && process.env && process.env.KINVEY_KMD_ATTRIBUTE || undefined || '_kmd';
	var defaultApiVersion = process && process.env && process.env.KINVEY_DEFAULT_API_VERSION || undefined || 4;
	var customPropertiesMaxBytesAllowed = process && process.env && process.env.KINVEY_MAX_HEADER_BYTES || undefined || 2000;

	var AuthType = {
	  All: 'All',
	  App: 'App',
	  Basic: 'Basic',
	  Default: 'Default',
	  Master: 'Master',
	  None: 'None',
	  Session: 'Session'
	};
	Object.freeze(AuthType);
	exports.AuthType = AuthType;


	var Auth = {
	  all: function all(client) {
	    try {
	      return Auth.session(client);
	    } catch (error) {
	      return Auth.basic(client);
	    }
	  },
	  app: function app(client) {
	    if (!client.appKey || !client.appSecret) {
	      throw new Error('Missing client appKey and/or appSecret.' + ' Use Kinvey.init() to set the appKey and appSecret for the client.');
	    }

	    return {
	      scheme: 'Basic',
	      username: client.appKey,
	      password: client.appSecret
	    };
	  },
	  basic: function basic(client) {
	    try {
	      return Auth.master(client);
	    } catch (error) {
	      return Auth.app(client);
	    }
	  },
	  master: function master(client) {
	    if (!client.appKey || !client.masterSecret) {
	      throw new Error('Missing client appKey and/or appSecret.' + ' Use Kinvey.init() to set the appKey and appSecret for the client.');
	    }

	    return {
	      scheme: 'Basic',
	      username: client.appKey,
	      password: client.masterSecret
	    };
	  },
	  none: function none() {
	    return null;
	  },
	  session: function session(client) {
	    var activeUser = client.activeUser;

	    if (!activeUser) {
	      throw new _errors.NoActiveUserError('There is not an active user. Please login a user and retry the request.');
	    }

	    return {
	      scheme: 'Kinvey',
	      credentials: activeUser[kmdAttribute].authtoken
	    };
	  }
	};

	function byteCount(str) {
	  if (str) {
	    var count = 0;
	    var stringLength = str.length;
	    str = String(str || '');

	    for (var i = 0; i < stringLength; i += 1) {
	      var partCount = encodeURI(str[i]).split('%').length;
	      count += partCount === 1 ? 1 : partCount - 1;
	    }

	    return count;
	  }

	  return 0;
	}

	var Properties = exports.Properties = function (_Headers) {
	  _inherits(Properties, _Headers);

	  function Properties() {
	    _classCallCheck(this, Properties);

	    return _possibleConstructorReturn(this, (Properties.__proto__ || Object.getPrototypeOf(Properties)).apply(this, arguments));
	  }

	  return Properties;
	}(_headers2.default);

	var KinveyRequest = function (_NetworkRequest) {
	  _inherits(KinveyRequest, _NetworkRequest);

	  function KinveyRequest() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, KinveyRequest);

	    var _this2 = _possibleConstructorReturn(this, (KinveyRequest.__proto__ || Object.getPrototypeOf(KinveyRequest)).call(this, options));

	    options = (0, _assign2.default)({
	      skipBL: false,
	      trace: false
	    }, options);

	    _this2.authType = options.authType || AuthType.None;
	    _this2.query = options.query;
	    _this2.apiVersion = defaultApiVersion;
	    _this2.properties = options.properties || new Properties();
	    _this2.skipBL = options.skipBL === true;
	    _this2.trace = options.trace === true;
	    return _this2;
	  }

	  _createClass(KinveyRequest, [{
	    key: 'execute',
	    value: function execute() {
	      var _this3 = this;

	      var rawResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      return _get(KinveyRequest.prototype.__proto__ || Object.getPrototypeOf(KinveyRequest.prototype), 'execute', this).call(this).then(function (response) {
	        if (!(response instanceof _kinveyresponse2.default)) {
	          response = new _kinveyresponse2.default({
	            statusCode: response.statusCode,
	            headers: response.headers,
	            data: response.data
	          });
	        }

	        if (rawResponse === false && response.isSuccess() === false) {
	          throw response.error;
	        }

	        return response;
	      }).catch(function (error) {
	        if (error instanceof _errors.InvalidCredentialsError) {
	          var _ret = function () {
	            var micSession = (0, _utils.getIdentitySession)(_this3.client, _social.SocialIdentity.MobileIdentityConnect);

	            if (micSession) {
	              var refreshMICRequest = new KinveyRequest({
	                method: _request.RequestMethod.POST,
	                headers: {
	                  'Content-Type': 'application/x-www-form-urlencoded'
	                },
	                authType: AuthType.App,
	                url: _url2.default.format({
	                  protocol: micSession.protocol || _this3.client.micProtocol,
	                  host: micSession.host || _this3.client.micHost,
	                  pathname: tokenPathname
	                }),
	                body: {
	                  grant_type: 'refresh_token',
	                  client_id: micSession.client_id,
	                  redirect_uri: micSession.redirect_uri,
	                  refresh_token: micSession.refresh_token
	                },
	                timeout: _this3.timeout,
	                properties: _this3.properties
	              });

	              return {
	                v: refreshMICRequest.execute().then(function (response) {
	                  return response.data;
	                }).then(function (newMicSession) {
	                  micSession = (0, _assign2.default)(micSession, newMicSession);

	                  var data = {};
	                  data[socialIdentityAttribute] = {};
	                  data[socialIdentityAttribute][_social.SocialIdentity.MobileIdentityConnect] = micSession;

	                  var loginRequest = new KinveyRequest({
	                    method: _request.RequestMethod.POST,
	                    authType: AuthType.App,
	                    url: _url2.default.format({
	                      protocol: _this3.client.protocol,
	                      host: _this3.client.host,
	                      pathname: '/' + usersNamespace + '/' + _this3.client.appKey + '/login'
	                    }),
	                    properties: _this3.properties,
	                    body: data,
	                    timeout: _this3.timeout,
	                    client: _this3.client
	                  });
	                  return loginRequest.execute().then(function (response) {
	                    return response.data;
	                  });
	                }).then(function (activeUser) {
	                  (0, _utils.setActiveUser)(_this3.client, activeUser);

	                  (0, _utils.setIdentitySession)(_this3.client, _social.SocialIdentity.MobileIdentityConnect, micSession);

	                  return _this3.execute(rawResponse);
	                })
	              };
	            }
	          }();

	          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        }

	        throw error;
	      });
	    }
	  }, {
	    key: 'appVersion',
	    get: function get() {
	      return this.client.appVersion;
	    }
	  }, {
	    key: 'headers',
	    get: function get() {
	      var headers = _get(KinveyRequest.prototype.__proto__ || Object.getPrototypeOf(KinveyRequest.prototype), 'headers', this);

	      if (!headers.has('Accept')) {
	        headers.set('Accept', 'application/json; charset=utf-8');
	      }

	      if (!headers.has('Content-Type')) {
	        headers.set('Content-Type', 'application/json; charset=utf-8');
	      }

	      if (!headers.has('X-Kinvey-Api-Version')) {
	        headers.set('X-Kinvey-Api-Version', this.apiVersion);
	      }

	      if (this.skipBL === true) {
	        headers.set('X-Kinvey-Skip-Business-Logic', true);
	      } else {
	        headers.remove('X-Kinvey-Skip-Business-Logic');
	      }

	      if (this.trace === true) {
	        headers.set('X-Kinvey-Include-Headers-In-Response', 'X-Kinvey-Request-Id');
	        headers.set('X-Kinvey-ResponseWrapper', true);
	      } else {
	        headers.remove('X-Kinvey-Include-Headers-In-Response');
	        headers.remove('X-Kinvey-ResponseWrapper');
	      }

	      if (this.appVersion) {
	        headers.set('X-Kinvey-Client-App-Version', this.appVersion);
	      } else {
	        headers.remove('X-Kinvey-Client-App-Version');
	      }

	      if (this.properties) {
	        var customPropertiesHeader = this.properties.toString();

	        if (!(0, _isEmpty2.default)(customPropertiesHeader)) {
	          var customPropertiesByteCount = byteCount(customPropertiesHeader);

	          if (customPropertiesByteCount >= customPropertiesMaxBytesAllowed) {
	            throw new Error('The custom properties are ' + customPropertiesByteCount + ' bytes.' + ('It must be less then ' + customPropertiesMaxBytesAllowed + ' bytes.'), 'Please remove some custom properties.');
	          }

	          headers.set('X-Kinvey-Custom-Request-Properties', customPropertiesHeader);
	        } else {
	          headers.remove('X-Kinvey-Custom-Request-Properties');
	        }
	      } else {
	        headers.remove('X-Kinvey-Custom-Request-Properties');
	      }

	      if (this.client.device && (0, _isFunction2.default)(this.client.device, 'toString')) {
	        headers.set('X-Kinvey-Device-Information', this.client.device.toString());
	      } else {
	        headers.remove('X-Kinvey-Device-Information');
	      }

	      if (this.authType) {
	        var authInfo = void 0;

	        switch (this.authType) {
	          case AuthType.All:
	            authInfo = Auth.all(this.client);
	            break;
	          case AuthType.App:
	            authInfo = Auth.app(this.client);
	            break;
	          case AuthType.Basic:
	            authInfo = Auth.basic(this.client);
	            break;
	          case AuthType.Master:
	            authInfo = Auth.master(this.client);
	            break;
	          case AuthType.None:
	            authInfo = Auth.none(this.client);
	            break;
	          case AuthType.Session:
	            authInfo = Auth.session(this.client);
	            break;
	          default:
	            try {
	              authInfo = Auth.session(this.client);
	            } catch (error) {
	              try {
	                authInfo = Auth.master(this.client);
	              } catch (error2) {
	                throw error;
	              }
	            }
	        }

	        if (authInfo) {
	          var credentials = authInfo.credentials;

	          if (authInfo.username) {
	            credentials = new Buffer(authInfo.username + ':' + authInfo.password).toString('base64');
	          }

	          headers.set('Authorization', authInfo.scheme + ' ' + credentials);
	        }
	      } else {
	        headers.remove('Authorization');
	      }

	      return headers;
	    },
	    set: function set(headers) {
	      _set(KinveyRequest.prototype.__proto__ || Object.getPrototypeOf(KinveyRequest.prototype), 'headers', headers, this);
	    }
	  }, {
	    key: 'url',
	    get: function get() {
	      var urlString = _get(KinveyRequest.prototype.__proto__ || Object.getPrototypeOf(KinveyRequest.prototype), 'url', this);
	      var queryString = this.query ? this.query.toQueryString() : {};

	      if ((0, _isEmpty2.default)(queryString)) {
	        return urlString;
	      }

	      return (0, _appendQuery2.default)(urlString, _qs2.default.stringify(queryString));
	    },
	    set: function set(urlString) {
	      _set(KinveyRequest.prototype.__proto__ || Object.getPrototypeOf(KinveyRequest.prototype), 'url', urlString, this);
	    }
	  }, {
	    key: 'apiVersion',
	    get: function get() {
	      return this._apiVersion;
	    },
	    set: function set(apiVersion) {
	      this._apiVersion = (0, _isNumber2.default)(apiVersion) ? apiVersion : defaultApiVersion;
	    }
	  }, {
	    key: 'properties',
	    get: function get() {
	      return this._properties;
	    },
	    set: function set(properties) {
	      if (properties && !(properties instanceof Properties)) {
	        properties = new Properties(properties);
	      }

	      this._properties = properties;
	    }
	  }]);

	  return KinveyRequest;
	}(_networkrequest2.default);

	exports.default = KinveyRequest;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58), __webpack_require__(255).Buffer))

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(256)
	var ieee754 = __webpack_require__(257)
	var isArray = __webpack_require__(258)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(255).Buffer, (function() { return this; }())))

/***/ },
/* 256 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr(len * 3 / 4 - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ },
/* 257 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 258 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _request = __webpack_require__(238);

	var _request2 = _interopRequireDefault(_request);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NetworkRequest = function (_Request) {
	  _inherits(NetworkRequest, _Request);

	  function NetworkRequest() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, NetworkRequest);

	    var _this = _possibleConstructorReturn(this, (NetworkRequest.__proto__ || Object.getPrototypeOf(NetworkRequest)).call(this, options));

	    _this.rack = _this.client.networkRack;
	    return _this;
	  }

	  return NetworkRequest;
	}(_request2.default);

	exports.default = NetworkRequest;

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _enums = __webpack_require__(261);

	Object.keys(_enums).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _enums[key];
	    }
	  });
	});

	var _facebook = __webpack_require__(262);

	Object.keys(_facebook).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _facebook[key];
	    }
	  });
	});

	var _google = __webpack_require__(266);

	Object.keys(_google).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _google[key];
	    }
	  });
	});

	var _linkedin = __webpack_require__(267);

	Object.keys(_linkedin).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _linkedin[key];
	    }
	  });
	});

	var _mic = __webpack_require__(268);

	Object.keys(_mic).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _mic[key];
	    }
	  });
	});

	var _windows = __webpack_require__(270);

	Object.keys(_windows).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _windows[key];
	    }
	  });
	});

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var SocialIdentity = {
	  Facebook: 'facebook',
	  Google: 'google',
	  Kinvey: process && process.env && process.env.KINVEY_IDENTITY || undefined || 'kinvey',
	  LinkedIn: 'linkedin',
	  MobileIdentityConnect: process && process.env && process.env.KINVEY_MIC_IDENTITY || undefined || 'kinveyAuth',
	  Windows: 'windows'
	};
	Object.freeze(SocialIdentity);
	exports.SocialIdentity = SocialIdentity;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Facebook = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _social = __webpack_require__(263);

	var _enums = __webpack_require__(261);

	var _errors = __webpack_require__(183);

	var _utils = __webpack_require__(185);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _assign = __webpack_require__(220);

	var _assign2 = _interopRequireDefault(_assign);

	var _querystring = __webpack_require__(217);

	var _querystring2 = _interopRequireDefault(_querystring);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Facebook = exports.Facebook = function (_Social) {
	  _inherits(Facebook, _Social);

	  function Facebook() {
	    _classCallCheck(this, Facebook);

	    return _possibleConstructorReturn(this, (Facebook.__proto__ || Object.getPrototypeOf(Facebook)).apply(this, arguments));
	  }

	  _createClass(Facebook, [{
	    key: 'isSupported',
	    value: function isSupported() {
	      return !!_utils.Popup;
	    }
	  }, {
	    key: 'login',
	    value: function login(clientId) {
	      var _this2 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      options = (0, _assign2.default)({
	        force: false,
	        scope: 'public_profile'
	      }, options);

	      if (!this.isSupported()) {
	        return _es6Promise2.default.reject(new _errors.KinveyError('Unable to login with ' + this.identity + '. It is not supported on this platform.'));
	      }

	      var session = this.session;
	      if (session && this.isOnline(session)) {
	        return _es6Promise2.default.resolve(session);
	      }

	      if (!clientId) {
	        return _es6Promise2.default.reject(new _errors.KinveyError('Unable to login with ' + this.identity + '. No client id was provided.'));
	      }

	      var promise = new _es6Promise2.default(function (resolve, reject) {
	        var redirectUri = options.redirectUri || global.location.href;
	        var originalState = (0, _utils.randomString)();
	        var popup = new _utils.Popup();
	        var redirected = false;

	        var oauthCallback = function oauthCallback(urlString) {
	          var _url$parse = _url2.default.parse(urlString);

	          var hash = _url$parse.hash;

	          var _querystring$parse = _querystring2.default.parse(hash.substring(1));

	          var access_token = _querystring$parse.access_token;
	          var expires_in = _querystring$parse.expires_in;
	          var error = _querystring$parse.error;
	          var error_description = _querystring$parse.error_description;
	          var error_reason = _querystring$parse.error_reason;
	          var state = _querystring$parse.state;

	          var expiresIn = parseInt(expires_in, 10);
	          var expires = new Date().getTime() / 1e3 + (expiresIn || 60 * 60 * 24 * 365);

	          if (state === originalState) {
	            if (access_token) {
	              var _session = {
	                access_token: access_token,
	                expires_in: expiresIn,
	                expires: expires,
	                client_id: clientId
	              };
	              _this2.session = _session;
	              resolve(_session);
	            } else if (error) {
	              _this2.session = null;
	              reject({ reason: error_reason, error: error, description: error_description });
	            } else {
	              _this2.session = null;
	              reject({ reason: 'not_authorized', error: 'access_denied', description: 'Your app is not authorized.' });
	            }
	          } else {
	            _this2.session = null;
	            reject({ reason: 'state_mismatch', error: 'access_denied', description: 'The state did not match.' });
	          }
	        };

	        function loadCallback(event) {
	          var urlString = event.url;

	          try {
	            if (urlString && urlString.indexOf(redirectUri) === 0 && redirected === false) {
	              redirected = true;
	              popup.removeAllListeners();
	              popup.close();
	              oauthCallback(urlString);
	            }
	          } catch (error) {}
	        }

	        function errorCallback(event) {
	          var urlString = event.url;

	          try {
	            if (urlString && urlString.indexOf(redirectUri) === 0 && redirected === false) {
	              redirected = true;
	              popup.removeAllListeners();
	              popup.close();
	              oauthCallback(urlString);
	            } else if (redirected === false) {
	              popup.removeAllListeners();
	              popup.close();
	              reject(new _errors.KinveyError(event.message, '', event.code));
	            }
	          } catch (error) {}
	        }

	        function closedCallback() {
	          if (redirected === false) {
	            popup.removeAllListeners();
	            reject(new _errors.KinveyError('Facebook login has been cancelled.'));
	          }
	        }

	        popup.on('loadstart', loadCallback);
	        popup.on('loadstop', loadCallback);
	        popup.on('error', errorCallback);
	        popup.on('closed', closedCallback);
	        popup.open(_url2.default.format({
	          protocol: 'https:',
	          host: 'www.facebook.com',
	          pathname: '/dialog/oauth',
	          query: {
	            client_id: clientId,
	            redirect_uri: redirectUri,
	            response_type: 'token',
	            scope: options.scope,
	            auth_type: options.force === true ? 'rerequest' : null,
	            state: originalState
	          }
	        }));
	      });

	      return promise;
	    }
	  }, {
	    key: 'logout',
	    value: function logout() {
	      this.session = null;
	      return _es6Promise2.default.resolve();
	    }
	  }, {
	    key: 'identity',
	    get: function get() {
	      return _enums.SocialIdentity.Facebook;
	    }
	  }], [{
	    key: 'identity',
	    get: function get() {
	      return _enums.SocialIdentity.Facebook;
	    }
	  }]);

	  return Facebook;
	}(_social.Social);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Social = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _client = __webpack_require__(59);

	var _errors = __webpack_require__(183);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _localStorage = __webpack_require__(210);

	var _localStorage2 = _interopRequireDefault(_localStorage);

	var _assign = __webpack_require__(220);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var hello = void 0;

	if (typeof window !== 'undefined') {
	  hello = __webpack_require__(264);
	}

	var Social = exports.Social = function () {
	  function Social() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Social);

	    this.client = options.client || _client.Client.sharedInstance();
	  }

	  _createClass(Social, [{
	    key: 'isSupported',
	    value: function isSupported() {
	      return !!hello;
	    }
	  }, {
	    key: 'isOnline',
	    value: function isOnline(session) {
	      var currentTime = new Date().getTime() / 1000;
	      return session && session.access_token && session.expires > currentTime;
	    }
	  }, {
	    key: 'login',
	    value: function login(clientId) {
	      var _this = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      options = (0, _assign2.default)({
	        redirectUri: global.location.href,
	        scope: null,
	        force: null
	      }, options);

	      if (!this.isSupported()) {
	        return _es6Promise2.default.reject(new _errors.KinveyError('Unable to login with ' + this.identity + '. It is not supported on this platform.'));
	      }

	      var session = this.session;
	      if (session && this.isOnline(session)) {
	        return _es6Promise2.default.resolve(session);
	      }

	      if (!clientId) {
	        return _es6Promise2.default.reject(new _errors.KinveyError('Unable to login with ' + this.identity + '. No client id was provided.'));
	      }

	      var helloSettings = {};
	      helloSettings[this.identity] = clientId;
	      hello.init(helloSettings);
	      return hello(this.identity).login({
	        redirect_uri: options.redirectUri,
	        scope: options.scope,
	        force: options.force
	      }).then(function () {
	        session = hello(_this.identity).getAuthResponse();
	        session.clientId = clientId;
	        _this.session = session;
	        return session;
	      });
	    }
	  }, {
	    key: 'logout',
	    value: function logout() {
	      var _this2 = this;

	      var promise = _es6Promise2.default.resolve();

	      if (this.isSupported()) {
	        var helloSettings = {};
	        helloSettings[this.identity] = this.session.clientId;
	        hello.init(helloSettings);
	        promise = hello(this.identity).logout();
	      }

	      return promise.then(function () {
	        _this2.session = null;
	      });
	    }
	  }, {
	    key: 'identity',
	    get: function get() {
	      throw new _errors.KinveyError('A subclass must override this property.');
	    }
	  }, {
	    key: 'session',
	    get: function get() {
	      return _localStorage2.default.get('' + this.client.appKey + this.identity);
	    },
	    set: function set(session) {
	      if (session) {
	        _localStorage2.default.set('' + this.client.appKey + this.identity, session);
	      } else {
	        _localStorage2.default.remove('' + this.client.appKey + this.identity);
	      }
	    }
	  }], [{
	    key: 'login',
	    value: function login(clientId, options) {
	      var social = new this(options);
	      return social.login(clientId, options);
	    }
	  }, {
	    key: 'logout',
	    value: function logout(user, options) {
	      var social = new this();
	      return social.logout(user, options);
	    }
	  }, {
	    key: 'identity',
	    get: function get() {
	      throw new _errors.KinveyError('A subclass must override this property.');
	    }
	  }]);

	  return Social;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, setImmediate) {/*! hellojs v1.14.0 | (c) 2012-2016 Andrew Dodson | MIT https://adodson.com/hello.js/LICENSE */
	// ES5 Object.create
	if (!Object.create) {

		// Shim, Object create
		// A shim for Object.create(), it adds a prototype to a new object
		Object.create = (function() {

			function F() {}

			return function(o) {

				if (arguments.length != 1) {
					throw new Error('Object.create implementation only accepts one parameter.');
				}

				F.prototype = o;
				return new F();
			};

		})();

	}

	// ES5 Object.keys
	if (!Object.keys) {
		Object.keys = function(o, k, r) {
			r = [];
			for (k in o) {
				if (r.hasOwnProperty.call(o, k))
					r.push(k);
			}

			return r;
		};
	}

	// ES5 [].indexOf
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(s) {

			for (var j = 0; j < this.length; j++) {
				if (this[j] === s) {
					return j;
				}
			}

			return -1;
		};
	}

	// ES5 [].forEach
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(fun/*, thisArg*/) {

			if (this === void 0 || this === null) {
				throw new TypeError();
			}

			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== 'function') {
				throw new TypeError();
			}

			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++) {
				if (i in t) {
					fun.call(thisArg, t[i], i, t);
				}
			}

			return this;
		};
	}

	// ES5 [].filter
	if (!Array.prototype.filter) {
		Array.prototype.filter = function(fun, thisArg) {

			var a = [];
			this.forEach(function(val, i, t) {
				if (fun.call(thisArg || void 0, val, i, t)) {
					a.push(val);
				}
			});

			return a;
		};
	}

	// Production steps of ECMA-262, Edition 5, 15.4.4.19
	// Reference: http://es5.github.io/#x15.4.4.19
	if (!Array.prototype.map) {

		Array.prototype.map = function(fun, thisArg) {

			var a = [];
			this.forEach(function(val, i, t) {
				a.push(fun.call(thisArg || void 0, val, i, t));
			});

			return a;
		};
	}

	// ES5 isArray
	if (!Array.isArray) {

		// Function Array.isArray
		Array.isArray = function(o) {
			return Object.prototype.toString.call(o) === '[object Array]';
		};

	}

	// Test for location.assign
	if (typeof window === 'object' && typeof window.location === 'object' && !window.location.assign) {

		window.location.assign = function(url) {
			window.location = url;
		};

	}

	// Test for Function.bind
	if (!Function.prototype.bind) {

		// MDN
		// Polyfill IE8, does not support native Function.bind
		Function.prototype.bind = function(b) {

			if (typeof this !== 'function') {
				throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
			}

			function C() {}

			var a = [].slice;
			var f = a.call(arguments, 1);
			var _this = this;
			var D = function() {
				return _this.apply(this instanceof C ? this : b || window, f.concat(a.call(arguments)));
			};

			C.prototype = this.prototype;
			D.prototype = new C();

			return D;
		};

	}

	/**
	 * @hello.js
	 *
	 * HelloJS is a client side Javascript SDK for making OAuth2 logins and subsequent REST calls.
	 *
	 * @author Andrew Dodson
	 * @website https://adodson.com/hello.js/
	 *
	 * @copyright Andrew Dodson, 2012 - 2015
	 * @license MIT: You are free to use and modify this code for any use, on the condition that this copyright notice remains.
	 */

	var hello = function(name) {
		return hello.use(name);
	};

	hello.utils = {

		// Extend the first object with the properties and methods of the second
		extend: function(r /*, a[, b[, ...]] */) {

			// Get the arguments as an array but ommit the initial item
			Array.prototype.slice.call(arguments, 1).forEach(function(a) {
				if (Array.isArray(r) && Array.isArray(a)) {
					Array.prototype.push.apply(r, a);
				}
				else if (r instanceof Object && a instanceof Object && r !== a) {
					for (var x in a) {
						r[x] = hello.utils.extend(r[x], a[x]);
					}
				}
				else {

					if (Array.isArray(a)) {
						// Clone it
						a = a.slice(0);
					}

					r = a;
				}
			});

			return r;
		}
	};

	// Core library
	hello.utils.extend(hello, {

		settings: {

			// OAuth2 authentication defaults
			redirect_uri: window.location.href.split('#')[0],
			response_type: 'token',
			display: 'popup',
			state: '',

			// OAuth1 shim
			// The path to the OAuth1 server for signing user requests
			// Want to recreate your own? Checkout https://github.com/MrSwitch/node-oauth-shim
			oauth_proxy: 'https://auth-server.herokuapp.com/proxy',

			// API timeout in milliseconds
			timeout: 20000,

			// Popup Options
			popup: {
				resizable: 1,
				scrollbars: 1,
				width: 500,
				height: 550
			},

			// Default scope
			// Many services require atleast a profile scope,
			// HelloJS automatially includes the value of provider.scope_map.basic
			// If that's not required it can be removed via hello.settings.scope.length = 0;
			scope: ['basic'],

			// Scope Maps
			// This is the default module scope, these are the defaults which each service is mapped too.
			// By including them here it prevents the scope from being applied accidentally
			scope_map: {
				basic: ''
			},

			// Default service / network
			default_service: null,

			// Force authentication
			// When hello.login is fired.
			// (null): ignore current session expiry and continue with login
			// (true): ignore current session expiry and continue with login, ask for user to reauthenticate
			// (false): if the current session looks good for the request scopes return the current session.
			force: null,

			// Page URL
			// When 'display=page' this property defines where the users page should end up after redirect_uri
			// Ths could be problematic if the redirect_uri is indeed the final place,
			// Typically this circumvents the problem of the redirect_url being a dumb relay page.
			page_uri: window.location.href
		},

		// Service configuration objects
		services: {},

		// Use
		// Define a new instance of the HelloJS library with a default service
		use: function(service) {

			// Create self, which inherits from its parent
			var self = Object.create(this);

			// Inherit the prototype from its parent
			self.settings = Object.create(this.settings);

			// Define the default service
			if (service) {
				self.settings.default_service = service;
			}

			// Create an instance of Events
			self.utils.Event.call(self);

			return self;
		},

		// Initialize
		// Define the client_ids for the endpoint services
		// @param object o, contains a key value pair, service => clientId
		// @param object opts, contains a key value pair of options used for defining the authentication defaults
		// @param number timeout, timeout in seconds
		init: function(services, options) {

			var utils = this.utils;

			if (!services) {
				return this.services;
			}

			// Define provider credentials
			// Reformat the ID field
			for (var x in services) {if (services.hasOwnProperty(x)) {
				if (typeof (services[x]) !== 'object') {
					services[x] = {id: services[x]};
				}
			}}

			// Merge services if there already exists some
			utils.extend(this.services, services);

			// Update the default settings with this one.
			if (options) {
				utils.extend(this.settings, options);

				// Do this immediatly incase the browser changes the current path.
				if ('redirect_uri' in options) {
					this.settings.redirect_uri = utils.url(options.redirect_uri).href;
				}
			}

			return this;
		},

		// Login
		// Using the endpoint
		// @param network stringify       name to connect to
		// @param options object    (optional)  {display mode, is either none|popup(default)|page, scope: email,birthday,publish, .. }
		// @param callback  function  (optional)  fired on signin
		login: function() {

			// Create an object which inherits its parent as the prototype and constructs a new event chain.
			var _this = this;
			var utils = _this.utils;
			var error = utils.error;
			var promise = utils.Promise();

			// Get parameters
			var p = utils.args({network: 's', options: 'o', callback: 'f'}, arguments);

			// Local vars
			var url;

			// Get all the custom options and store to be appended to the querystring
			var qs = utils.diffKey(p.options, _this.settings);

			// Merge/override options with app defaults
			var opts = p.options = utils.merge(_this.settings, p.options || {});

			// Merge/override options with app defaults
			opts.popup = utils.merge(_this.settings.popup, p.options.popup || {});

			// Network
			p.network = p.network || _this.settings.default_service;

			// Bind callback to both reject and fulfill states
			promise.proxy.then(p.callback, p.callback);

			// Trigger an event on the global listener
			function emit(s, value) {
				hello.emit(s, value);
			}

			promise.proxy.then(emit.bind(this, 'auth.login auth'), emit.bind(this, 'auth.failed auth'));

			// Is our service valid?
			if (typeof (p.network) !== 'string' || !(p.network in _this.services)) {
				// Trigger the default login.
				// Ahh we dont have one.
				return promise.reject(error('invalid_network', 'The provided network was not recognized'));
			}

			var provider = _this.services[p.network];

			// Create a global listener to capture events triggered out of scope
			var callbackId = utils.globalEvent(function(str) {

				// The responseHandler returns a string, lets save this locally
				var obj;

				if (str) {
					obj = JSON.parse(str);
				}
				else {
					obj = error('cancelled', 'The authentication was not completed');
				}

				// Handle these response using the local
				// Trigger on the parent
				if (!obj.error) {

					// Save on the parent window the new credentials
					// This fixes an IE10 bug i think... atleast it does for me.
					utils.store(obj.network, obj);

					// Fulfill a successful login
					promise.fulfill({
						network: obj.network,
						authResponse: obj
					});
				}
				else {
					// Reject a successful login
					promise.reject(obj);
				}
			});

			var redirectUri = utils.url(opts.redirect_uri).href;

			// May be a space-delimited list of multiple, complementary types
			var responseType = provider.oauth.response_type || opts.response_type;

			// Fallback to token if the module hasn't defined a grant url
			if (/\bcode\b/.test(responseType) && !provider.oauth.grant) {
				responseType = responseType.replace(/\bcode\b/, 'token');
			}

			// Query string parameters, we may pass our own arguments to form the querystring
			p.qs = utils.merge(qs, {
				client_id: encodeURIComponent(provider.id),
				response_type: encodeURIComponent(responseType),
				redirect_uri: encodeURIComponent(redirectUri),
				state: {
					client_id: provider.id,
					network: p.network,
					display: opts.display,
					callback: callbackId,
					state: opts.state,
					redirect_uri: redirectUri
				}
			});

			// Get current session for merging scopes, and for quick auth response
			var session = utils.store(p.network);

			// Scopes (authentication permisions)
			// Ensure this is a string - IE has a problem moving Arrays between windows
			// Append the setup scope
			var SCOPE_SPLIT = /[,\s]+/;

			// Include default scope settings (cloned).
			var scope = _this.settings.scope ? [_this.settings.scope.toString()] : [];

			// Extend the providers scope list with the default
			var scopeMap = utils.merge(_this.settings.scope_map, provider.scope || {});

			// Add user defined scopes...
			if (opts.scope) {
				scope.push(opts.scope.toString());
			}

			// Append scopes from a previous session.
			// This helps keep app credentials constant,
			// Avoiding having to keep tabs on what scopes are authorized
			if (session && 'scope' in session && session.scope instanceof String) {
				scope.push(session.scope);
			}

			// Join and Split again
			scope = scope.join(',').split(SCOPE_SPLIT);

			// Format remove duplicates and empty values
			scope = utils.unique(scope).filter(filterEmpty);

			// Save the the scopes to the state with the names that they were requested with.
			p.qs.state.scope = scope.join(',');

			// Map scopes to the providers naming convention
			scope = scope.map(function(item) {
				// Does this have a mapping?
				return (item in scopeMap) ? scopeMap[item] : item;
			});

			// Stringify and Arrayify so that double mapped scopes are given the chance to be formatted
			scope = scope.join(',').split(SCOPE_SPLIT);

			// Again...
			// Format remove duplicates and empty values
			scope = utils.unique(scope).filter(filterEmpty);

			// Join with the expected scope delimiter into a string
			p.qs.scope = scope.join(provider.scope_delim || ',');

			// Is the user already signed in with the appropriate scopes, valid access_token?
			if (opts.force === false) {

				if (session && 'access_token' in session && session.access_token && 'expires' in session && session.expires > ((new Date()).getTime() / 1e3)) {
					// What is different about the scopes in the session vs the scopes in the new login?
					var diff = utils.diff((session.scope || '').split(SCOPE_SPLIT), (p.qs.state.scope || '').split(SCOPE_SPLIT));
					if (diff.length === 0) {

						// OK trigger the callback
						promise.fulfill({
							unchanged: true,
							network: p.network,
							authResponse: session
						});

						// Nothing has changed
						return promise;
					}
				}
			}

			// Page URL
			if (opts.display === 'page' && opts.page_uri) {
				// Add a page location, place to endup after session has authenticated
				p.qs.state.page_uri = utils.url(opts.page_uri).href;
			}

			// Bespoke
			// Override login querystrings from auth_options
			if ('login' in provider && typeof (provider.login) === 'function') {
				// Format the paramaters according to the providers formatting function
				provider.login(p);
			}

			// Add OAuth to state
			// Where the service is going to take advantage of the oauth_proxy
			if (!/\btoken\b/.test(responseType) ||
			parseInt(provider.oauth.version, 10) < 2 ||
			(opts.display === 'none' && provider.oauth.grant && session && session.refresh_token)) {

				// Add the oauth endpoints
				p.qs.state.oauth = provider.oauth;

				// Add the proxy url
				p.qs.state.oauth_proxy = opts.oauth_proxy;

			}

			// Convert state to a string
			p.qs.state = encodeURIComponent(JSON.stringify(p.qs.state));

			// URL
			if (parseInt(provider.oauth.version, 10) === 1) {

				// Turn the request to the OAuth Proxy for 3-legged auth
				url = utils.qs(opts.oauth_proxy, p.qs, encodeFunction);
			}

			// Refresh token
			else if (opts.display === 'none' && provider.oauth.grant && session && session.refresh_token) {

				// Add the refresh_token to the request
				p.qs.refresh_token = session.refresh_token;

				// Define the request path
				url = utils.qs(opts.oauth_proxy, p.qs, encodeFunction);
			}
			else {
				url = utils.qs(provider.oauth.auth, p.qs, encodeFunction);
			}

			// Broadcast this event as an auth:init
			emit('auth.init', p);

			// Execute
			// Trigger how we want self displayed
			if (opts.display === 'none') {
				// Sign-in in the background, iframe
				utils.iframe(url, redirectUri);
			}

			// Triggering popup?
			else if (opts.display === 'popup') {

				var popup = utils.popup(url, redirectUri, opts.popup);

				var timer = setInterval(function() {
					if (!popup || popup.closed) {
						clearInterval(timer);
						if (!promise.state) {

							var response = error('cancelled', 'Login has been cancelled');

							if (!popup) {
								response = error('blocked', 'Popup was blocked');
							}

							response.network = p.network;

							promise.reject(response);
						}
					}
				}, 100);
			}

			else {
				window.location = url;
			}

			return promise.proxy;

			function encodeFunction(s) {return s;}

			function filterEmpty(s) {return !!s;}
		},

		// Remove any data associated with a given service
		// @param string name of the service
		// @param function callback
		logout: function() {

			var _this = this;
			var utils = _this.utils;
			var error = utils.error;

			// Create a new promise
			var promise = utils.Promise();

			var p = utils.args({name:'s', options: 'o', callback: 'f'}, arguments);

			p.options = p.options || {};

			// Add callback to events
			promise.proxy.then(p.callback, p.callback);

			// Trigger an event on the global listener
			function emit(s, value) {
				hello.emit(s, value);
			}

			promise.proxy.then(emit.bind(this, 'auth.logout auth'), emit.bind(this, 'error'));

			// Network
			p.name = p.name || this.settings.default_service;
			p.authResponse = utils.store(p.name);

			if (p.name && !(p.name in _this.services)) {

				promise.reject(error('invalid_network', 'The network was unrecognized'));

			}
			else if (p.name && p.authResponse) {

				// Define the callback
				var callback = function(opts) {

					// Remove from the store
					utils.store(p.name, null);

					// Emit events by default
					promise.fulfill(hello.utils.merge({network:p.name}, opts || {}));
				};

				// Run an async operation to remove the users session
				var _opts = {};
				if (p.options.force) {
					var logout = _this.services[p.name].logout;
					if (logout) {
						// Convert logout to URL string,
						// If no string is returned, then this function will handle the logout async style
						if (typeof (logout) === 'function') {
							logout = logout(callback, p);
						}

						// If logout is a string then assume URL and open in iframe.
						if (typeof (logout) === 'string') {
							utils.iframe(logout);
							_opts.force = null;
							_opts.message = 'Logout success on providers site was indeterminate';
						}
						else if (logout === undefined) {
							// The callback function will handle the response.
							return promise.proxy;
						}
					}
				}

				// Remove local credentials
				callback(_opts);
			}
			else {
				promise.reject(error('invalid_session', 'There was no session to remove'));
			}

			return promise.proxy;
		},

		// Returns all the sessions that are subscribed too
		// @param string optional, name of the service to get information about.
		getAuthResponse: function(service) {

			// If the service doesn't exist
			service = service || this.settings.default_service;

			if (!service || !(service in this.services)) {
				return null;
			}

			return this.utils.store(service) || null;
		},

		// Events: placeholder for the events
		events: {}
	});

	// Core utilities
	hello.utils.extend(hello.utils, {

		// Error
		error: function(code, message) {
			return {
				error: {
					code: code,
					message: message
				}
			};
		},

		// Append the querystring to a url
		// @param string url
		// @param object parameters
		qs: function(url, params, formatFunction) {

			if (params) {

				// Set default formatting function
				formatFunction = formatFunction || encodeURIComponent;

				// Override the items in the URL which already exist
				for (var x in params) {
					var str = '([\\?\\&])' + x + '=[^\\&]*';
					var reg = new RegExp(str);
					if (url.match(reg)) {
						url = url.replace(reg, '$1' + x + '=' + formatFunction(params[x]));
						delete params[x];
					}
				}
			}

			if (!this.isEmpty(params)) {
				return url + (url.indexOf('?') > -1 ? '&' : '?') + this.param(params, formatFunction);
			}

			return url;
		},

		// Param
		// Explode/encode the parameters of an URL string/object
		// @param string s, string to decode
		param: function(s, formatFunction) {
			var b;
			var a = {};
			var m;

			if (typeof (s) === 'string') {

				formatFunction = formatFunction || decodeURIComponent;

				m = s.replace(/^[\#\?]/, '').match(/([^=\/\&]+)=([^\&]+)/g);
				if (m) {
					for (var i = 0; i < m.length; i++) {
						b = m[i].match(/([^=]+)=(.*)/);
						a[b[1]] = formatFunction(b[2]);
					}
				}

				return a;
			}
			else {

				formatFunction = formatFunction || encodeURIComponent;

				var o = s;

				a = [];

				for (var x in o) {if (o.hasOwnProperty(x)) {
					if (o.hasOwnProperty(x)) {
						a.push([x, o[x] === '?' ? '?' : formatFunction(o[x])].join('='));
					}
				}}

				return a.join('&');
			}
		},

		// Local storage facade
		store: (function() {

			var a = ['localStorage', 'sessionStorage'];
			var i = -1;
			var prefix = 'test';

			// Set LocalStorage
			var localStorage;

			while (a[++i]) {
				try {
					// In Chrome with cookies blocked, calling localStorage throws an error
					localStorage = window[a[i]];
					localStorage.setItem(prefix + i, i);
					localStorage.removeItem(prefix + i);
					break;
				}
				catch (e) {
					localStorage = null;
				}
			}

			if (!localStorage) {

				var cache = null;

				localStorage = {
					getItem: function(prop) {
						prop = prop + '=';
						var m = document.cookie.split(';');
						for (var i = 0; i < m.length; i++) {
							var _m = m[i].replace(/(^\s+|\s+$)/, '');
							if (_m && _m.indexOf(prop) === 0) {
								return _m.substr(prop.length);
							}
						}

						return cache;
					},

					setItem: function(prop, value) {
						cache = value;
						document.cookie = prop + '=' + value;
					}
				};

				// Fill the cache up
				cache = localStorage.getItem('hello');
			}

			function get() {
				var json = {};
				try {
					json = JSON.parse(localStorage.getItem('hello')) || {};
				}
				catch (e) {}

				return json;
			}

			function set(json) {
				localStorage.setItem('hello', JSON.stringify(json));
			}

			// Check if the browser support local storage
			return function(name, value, days) {

				// Local storage
				var json = get();

				if (name && value === undefined) {
					return json[name] || null;
				}
				else if (name && value === null) {
					try {
						delete json[name];
					}
					catch (e) {
						json[name] = null;
					}
				}
				else if (name) {
					json[name] = value;
				}
				else {
					return json;
				}

				set(json);

				return json || null;
			};

		})(),

		// Create and Append new DOM elements
		// @param node string
		// @param attr object literal
		// @param dom/string
		append: function(node, attr, target) {

			var n = typeof (node) === 'string' ? document.createElement(node) : node;

			if (typeof (attr) === 'object') {
				if ('tagName' in attr) {
					target = attr;
				}
				else {
					for (var x in attr) {if (attr.hasOwnProperty(x)) {
						if (typeof (attr[x]) === 'object') {
							for (var y in attr[x]) {if (attr[x].hasOwnProperty(y)) {
								n[x][y] = attr[x][y];
							}}
						}
						else if (x === 'html') {
							n.innerHTML = attr[x];
						}

						// IE doesn't like us setting methods with setAttribute
						else if (!/^on/.test(x)) {
							n.setAttribute(x, attr[x]);
						}
						else {
							n[x] = attr[x];
						}
					}}
				}
			}

			if (target === 'body') {
				(function self() {
					if (document.body) {
						document.body.appendChild(n);
					}
					else {
						setTimeout(self, 16);
					}
				})();
			}
			else if (typeof (target) === 'object') {
				target.appendChild(n);
			}
			else if (typeof (target) === 'string') {
				document.getElementsByTagName(target)[0].appendChild(n);
			}

			return n;
		},

		// An easy way to create a hidden iframe
		// @param string src
		iframe: function(src) {
			this.append('iframe', {src: src, style: {position:'absolute', left: '-1000px', bottom: 0, height: '1px', width: '1px'}}, 'body');
		},

		// Recursive merge two objects into one, second parameter overides the first
		// @param a array
		merge: function(/* Args: a, b, c, .. n */) {
			var args = Array.prototype.slice.call(arguments);
			args.unshift({});
			return this.extend.apply(null, args);
		},

		// Makes it easier to assign parameters, where some are optional
		// @param o object
		// @param a arguments
		args: function(o, args) {

			var p = {};
			var i = 0;
			var t = null;
			var x = null;

			// 'x' is the first key in the list of object parameters
			for (x in o) {if (o.hasOwnProperty(x)) {
				break;
			}}

			// Passing in hash object of arguments?
			// Where the first argument can't be an object
			if ((args.length === 1) && (typeof (args[0]) === 'object') && o[x] != 'o!') {

				// Could this object still belong to a property?
				// Check the object keys if they match any of the property keys
				for (x in args[0]) {if (o.hasOwnProperty(x)) {
					// Does this key exist in the property list?
					if (x in o) {
						// Yes this key does exist so its most likely this function has been invoked with an object parameter
						// Return first argument as the hash of all arguments
						return args[0];
					}
				}}
			}

			// Else loop through and account for the missing ones.
			for (x in o) {if (o.hasOwnProperty(x)) {

				t = typeof (args[i]);

				if ((typeof (o[x]) === 'function' && o[x].test(args[i])) || (typeof (o[x]) === 'string' && (
				(o[x].indexOf('s') > -1 && t === 'string') ||
				(o[x].indexOf('o') > -1 && t === 'object') ||
				(o[x].indexOf('i') > -1 && t === 'number') ||
				(o[x].indexOf('a') > -1 && t === 'object') ||
				(o[x].indexOf('f') > -1 && t === 'function')
				))
				) {
					p[x] = args[i++];
				}

				else if (typeof (o[x]) === 'string' && o[x].indexOf('!') > -1) {
					return false;
				}
			}}

			return p;
		},

		// Returns a URL instance
		url: function(path) {

			// If the path is empty
			if (!path) {
				return window.location;
			}

			// Chrome and FireFox support new URL() to extract URL objects
			else if (window.URL && URL instanceof Function && URL.length !== 0) {
				return new URL(path, window.location);
			}

			// Ugly shim, it works!
			else {
				var a = document.createElement('a');
				a.href = path;
				return a.cloneNode(false);
			}
		},

		diff: function(a, b) {
			return b.filter(function(item) {
				return a.indexOf(item) === -1;
			});
		},

		// Get the different hash of properties unique to `a`, and not in `b`
		diffKey: function(a, b) {
			if (a || !b) {
				var r = {};
				for (var x in a) {
					// Does the property not exist?
					if (!(x in b)) {
						r[x] = a[x];
					}
				}

				return r;
			}

			return a;
		},

		// Unique
		// Remove duplicate and null values from an array
		// @param a array
		unique: function(a) {
			if (!Array.isArray(a)) { return []; }

			return a.filter(function(item, index) {
				// Is this the first location of item
				return a.indexOf(item) === index;
			});
		},

		isEmpty: function(obj) {

			// Scalar
			if (!obj)
				return true;

			// Array
			if (Array.isArray(obj)) {
				return !obj.length;
			}
			else if (typeof (obj) === 'object') {
				// Object
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						return false;
					}
				}
			}

			return true;
		},

		//jscs:disable

		/*!
		 **  Thenable -- Embeddable Minimum Strictly-Compliant Promises/A+ 1.1.1 Thenable
		 **  Copyright (c) 2013-2014 Ralf S. Engelschall <http://engelschall.com>
		 **  Licensed under The MIT License <http://opensource.org/licenses/MIT>
		 **  Source-Code distributed on <http://github.com/rse/thenable>
		 */
		Promise: (function(){
			/*  promise states [Promises/A+ 2.1]  */
			var STATE_PENDING   = 0;                                         /*  [Promises/A+ 2.1.1]  */
			var STATE_FULFILLED = 1;                                         /*  [Promises/A+ 2.1.2]  */
			var STATE_REJECTED  = 2;                                         /*  [Promises/A+ 2.1.3]  */

			/*  promise object constructor  */
			var api = function (executor) {
				/*  optionally support non-constructor/plain-function call  */
				if (!(this instanceof api))
					return new api(executor);

				/*  initialize object  */
				this.id           = "Thenable/1.0.6";
				this.state        = STATE_PENDING; /*  initial state  */
				this.fulfillValue = undefined;     /*  initial value  */     /*  [Promises/A+ 1.3, 2.1.2.2]  */
				this.rejectReason = undefined;     /*  initial reason */     /*  [Promises/A+ 1.5, 2.1.3.2]  */
				this.onFulfilled  = [];            /*  initial handlers  */
				this.onRejected   = [];            /*  initial handlers  */

				/*  provide optional information-hiding proxy  */
				this.proxy = {
					then: this.then.bind(this)
				};

				/*  support optional executor function  */
				if (typeof executor === "function")
					executor.call(this, this.fulfill.bind(this), this.reject.bind(this));
			};

			/*  promise API methods  */
			api.prototype = {
				/*  promise resolving methods  */
				fulfill: function (value) { return deliver(this, STATE_FULFILLED, "fulfillValue", value); },
				reject:  function (value) { return deliver(this, STATE_REJECTED,  "rejectReason", value); },

				/*  "The then Method" [Promises/A+ 1.1, 1.2, 2.2]  */
				then: function (onFulfilled, onRejected) {
					var curr = this;
					var next = new api();                                    /*  [Promises/A+ 2.2.7]  */
					curr.onFulfilled.push(
						resolver(onFulfilled, next, "fulfill"));             /*  [Promises/A+ 2.2.2/2.2.6]  */
					curr.onRejected.push(
						resolver(onRejected,  next, "reject" ));             /*  [Promises/A+ 2.2.3/2.2.6]  */
					execute(curr);
					return next.proxy;                                       /*  [Promises/A+ 2.2.7, 3.3]  */
				}
			};

			/*  deliver an action  */
			var deliver = function (curr, state, name, value) {
				if (curr.state === STATE_PENDING) {
					curr.state = state;                                      /*  [Promises/A+ 2.1.2.1, 2.1.3.1]  */
					curr[name] = value;                                      /*  [Promises/A+ 2.1.2.2, 2.1.3.2]  */
					execute(curr);
				}
				return curr;
			};

			/*  execute all handlers  */
			var execute = function (curr) {
				if (curr.state === STATE_FULFILLED)
					execute_handlers(curr, "onFulfilled", curr.fulfillValue);
				else if (curr.state === STATE_REJECTED)
					execute_handlers(curr, "onRejected",  curr.rejectReason);
			};

			/*  execute particular set of handlers  */
			var execute_handlers = function (curr, name, value) {
				/* global process: true */
				/* global setImmediate: true */
				/* global setTimeout: true */

				/*  short-circuit processing  */
				if (curr[name].length === 0)
					return;

				/*  iterate over all handlers, exactly once  */
				var handlers = curr[name];
				curr[name] = [];                                             /*  [Promises/A+ 2.2.2.3, 2.2.3.3]  */
				var func = function () {
					for (var i = 0; i < handlers.length; i++)
						handlers[i](value);                                  /*  [Promises/A+ 2.2.5]  */
				};

				/*  execute procedure asynchronously  */                     /*  [Promises/A+ 2.2.4, 3.1]  */
				if (typeof process === "object" && typeof process.nextTick === "function")
					process.nextTick(func);
				else if (typeof setImmediate === "function")
					setImmediate(func);
				else
					setTimeout(func, 0);
			};

			/*  generate a resolver function  */
			var resolver = function (cb, next, method) {
				return function (value) {
					if (typeof cb !== "function")                            /*  [Promises/A+ 2.2.1, 2.2.7.3, 2.2.7.4]  */
						next[method].call(next, value);                      /*  [Promises/A+ 2.2.7.3, 2.2.7.4]  */
					else {
						var result;
						try { result = cb(value); }                          /*  [Promises/A+ 2.2.2.1, 2.2.3.1, 2.2.5, 3.2]  */
						catch (e) {
							next.reject(e);                                  /*  [Promises/A+ 2.2.7.2]  */
							return;
						}
						resolve(next, result);                               /*  [Promises/A+ 2.2.7.1]  */
					}
				};
			};

			/*  "Promise Resolution Procedure"  */                           /*  [Promises/A+ 2.3]  */
			var resolve = function (promise, x) {
				/*  sanity check arguments  */                               /*  [Promises/A+ 2.3.1]  */
				if (promise === x || promise.proxy === x) {
					promise.reject(new TypeError("cannot resolve promise with itself"));
					return;
				}

				/*  surgically check for a "then" method
					(mainly to just call the "getter" of "then" only once)  */
				var then;
				if ((typeof x === "object" && x !== null) || typeof x === "function") {
					try { then = x.then; }                                   /*  [Promises/A+ 2.3.3.1, 3.5]  */
					catch (e) {
						promise.reject(e);                                   /*  [Promises/A+ 2.3.3.2]  */
						return;
					}
				}

				/*  handle own Thenables    [Promises/A+ 2.3.2]
					and similar "thenables" [Promises/A+ 2.3.3]  */
				if (typeof then === "function") {
					var resolved = false;
					try {
						/*  call retrieved "then" method */                  /*  [Promises/A+ 2.3.3.3]  */
						then.call(x,
							/*  resolvePromise  */                           /*  [Promises/A+ 2.3.3.3.1]  */
							function (y) {
								if (resolved) return; resolved = true;       /*  [Promises/A+ 2.3.3.3.3]  */
								if (y === x)                                 /*  [Promises/A+ 3.6]  */
									promise.reject(new TypeError("circular thenable chain"));
								else
									resolve(promise, y);
							},

							/*  rejectPromise  */                            /*  [Promises/A+ 2.3.3.3.2]  */
							function (r) {
								if (resolved) return; resolved = true;       /*  [Promises/A+ 2.3.3.3.3]  */
								promise.reject(r);
							}
						);
					}
					catch (e) {
						if (!resolved)                                       /*  [Promises/A+ 2.3.3.3.3]  */
							promise.reject(e);                               /*  [Promises/A+ 2.3.3.3.4]  */
					}
					return;
				}

				/*  handle other values  */
				promise.fulfill(x);                                          /*  [Promises/A+ 2.3.4, 2.3.3.4]  */
			};

			/*  export API  */
			return api;
		})(),

		//jscs:enable

		// Event
		// A contructor superclass for adding event menthods, on, off, emit.
		Event: function() {

			var separator = /[\s\,]+/;

			// If this doesn't support getPrototype then we can't get prototype.events of the parent
			// So lets get the current instance events, and add those to a parent property
			this.parent = {
				events: this.events,
				findEvents: this.findEvents,
				parent: this.parent,
				utils: this.utils
			};

			this.events = {};

			// On, subscribe to events
			// @param evt   string
			// @param callback  function
			this.on = function(evt, callback) {

				if (callback && typeof (callback) === 'function') {
					var a = evt.split(separator);
					for (var i = 0; i < a.length; i++) {

						// Has this event already been fired on this instance?
						this.events[a[i]] = [callback].concat(this.events[a[i]] || []);
					}
				}

				return this;
			};

			// Off, unsubscribe to events
			// @param evt   string
			// @param callback  function
			this.off = function(evt, callback) {

				this.findEvents(evt, function(name, index) {
					if (!callback || this.events[name][index] === callback) {
						this.events[name][index] = null;
					}
				});

				return this;
			};

			// Emit
			// Triggers any subscribed events
			this.emit = function(evt /*, data, ... */) {

				// Get arguments as an Array, knock off the first one
				var args = Array.prototype.slice.call(arguments, 1);
				args.push(evt);

				// Handler
				var handler = function(name, index) {

					// Replace the last property with the event name
					args[args.length - 1] = (name === '*' ? evt : name);

					// Trigger
					this.events[name][index].apply(this, args);
				};

				// Find the callbacks which match the condition and call
				var _this = this;
				while (_this && _this.findEvents) {

					// Find events which match
					_this.findEvents(evt + ',*', handler);
					_this = _this.parent;
				}

				return this;
			};

			//
			// Easy functions
			this.emitAfter = function() {
				var _this = this;
				var args = arguments;
				setTimeout(function() {
					_this.emit.apply(_this, args);
				}, 0);

				return this;
			};

			this.findEvents = function(evt, callback) {

				var a = evt.split(separator);

				for (var name in this.events) {if (this.events.hasOwnProperty(name)) {

					if (a.indexOf(name) > -1) {

						for (var i = 0; i < this.events[name].length; i++) {

							// Does the event handler exist?
							if (this.events[name][i]) {
								// Emit on the local instance of this
								callback.call(this, name, i);
							}
						}
					}
				}}
			};

			return this;
		},

		// Global Events
		// Attach the callback to the window object
		// Return its unique reference
		globalEvent: function(callback, guid) {
			// If the guid has not been supplied then create a new one.
			guid = guid || '_hellojs_' + parseInt(Math.random() * 1e12, 10).toString(36);

			// Define the callback function
			window[guid] = function() {
				// Trigger the callback
				try {
					if (callback.apply(this, arguments)) {
						delete window[guid];
					}
				}
				catch (e) {
					console.error(e);
				}
			};

			return guid;
		},

		// Trigger a clientside popup
		// This has been augmented to support PhoneGap
		popup: function(url, redirectUri, options) {

			var documentElement = document.documentElement;

			// Multi Screen Popup Positioning (http://stackoverflow.com/a/16861050)
			// Credit: http://www.xtf.dk/2011/08/center-new-popup-window-even-on.html
			// Fixes dual-screen position                         Most browsers      Firefox

			if (options.height) {
				var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
				var height = screen.height || window.innerHeight || documentElement.clientHeight;
				options.top = parseInt((height - options.height) / 2, 10) + dualScreenTop;
			}

			if (options.width) {
				var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
				var width = screen.width || window.innerWidth || documentElement.clientWidth;
				options.left = parseInt((width - options.width) / 2, 10) + dualScreenLeft;
			}

			// Convert options into an array
			var optionsArray = [];
			Object.keys(options).forEach(function(name) {
				var value = options[name];
				optionsArray.push(name + (value !== null ? '=' + value : ''));
			});

			// Call the open() function with the initial path
			//
			// OAuth redirect, fixes URI fragments from being lost in Safari
			// (URI Fragments within 302 Location URI are lost over HTTPS)
			// Loading the redirect.html before triggering the OAuth Flow seems to fix it.
			//
			// Firefox  decodes URL fragments when calling location.hash.
			//  - This is bad if the value contains break points which are escaped
			//  - Hence the url must be encoded twice as it contains breakpoints.
			if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
				url = redirectUri + '#oauth_redirect=' + encodeURIComponent(encodeURIComponent(url));
			}

			var popup = window.open(
				url,
				'_blank',
				optionsArray.join(',')
			);

			if (popup && popup.focus) {
				popup.focus();
			}

			return popup;
		},

		// OAuth and API response handler
		responseHandler: function(window, parent) {

			var _this = this;
			var p;
			var location = window.location;

			// Is this an auth relay message which needs to call the proxy?
			p = _this.param(location.search);

			// OAuth2 or OAuth1 server response?
			if (p && p.state && (p.code || p.oauth_token)) {

				var state = JSON.parse(p.state);

				// Add this path as the redirect_uri
				p.redirect_uri = state.redirect_uri || location.href.replace(/[\?\#].*$/, '');

				// Redirect to the host
				var path = state.oauth_proxy + '?' + _this.param(p);

				location.assign(path);

				return;
			}

			// Save session, from redirected authentication
			// #access_token has come in?
			//
			// FACEBOOK is returning auth errors within as a query_string... thats a stickler for consistency.
			// SoundCloud is the state in the querystring and the token in the hashtag, so we'll mix the two together

			p = _this.merge(_this.param(location.search || ''), _this.param(location.hash || ''));

			// If p.state
			if (p && 'state' in p) {

				// Remove any addition information
				// E.g. p.state = 'facebook.page';
				try {
					var a = JSON.parse(p.state);
					_this.extend(p, a);
				}
				catch (e) {
					console.error('Could not decode state parameter');
				}

				// Access_token?
				if (('access_token' in p && p.access_token) && p.network) {

					if (!p.expires_in || parseInt(p.expires_in, 10) === 0) {
						// If p.expires_in is unset, set to 0
						p.expires_in = 0;
					}

					p.expires_in = parseInt(p.expires_in, 10);
					p.expires = ((new Date()).getTime() / 1e3) + (p.expires_in || (60 * 60 * 24 * 365));

					// Lets use the "state" to assign it to one of our networks
					authCallback(p, window, parent);
				}

				// Error=?
				// &error_description=?
				// &state=?
				else if (('error' in p && p.error) && p.network) {

					p.error = {
						code: p.error,
						message: p.error_message || p.error_description
					};

					// Let the state handler handle it
					authCallback(p, window, parent);
				}

				// API call, or a cancelled login
				// Result is serialized JSON string
				else if (p.callback && p.callback in parent) {

					// Trigger a function in the parent
					var res = 'result' in p && p.result ? JSON.parse(p.result) : false;

					// Trigger the callback on the parent
					callback(parent, p.callback)(res);
					closeWindow();
				}

				// If this page is still open
				if (p.page_uri) {
					location.assign(p.page_uri);
				}
			}

			// OAuth redirect, fixes URI fragments from being lost in Safari
			// (URI Fragments within 302 Location URI are lost over HTTPS)
			// Loading the redirect.html before triggering the OAuth Flow seems to fix it.
			else if ('oauth_redirect' in p) {

				location.assign(decodeURIComponent(p.oauth_redirect));
				return;
			}

			// Trigger a callback to authenticate
			function authCallback(obj, window, parent) {

				var cb = obj.callback;
				var network = obj.network;

				// Trigger the callback on the parent
				_this.store(network, obj);

				// If this is a page request it has no parent or opener window to handle callbacks
				if (('display' in obj) && obj.display === 'page') {
					return;
				}

				// Remove from session object
				if (parent && cb && cb in parent) {

					try {
						delete obj.callback;
					}
					catch (e) {}

					// Update store
					_this.store(network, obj);

					// Call the globalEvent function on the parent
					// It's safer to pass back a string to the parent,
					// Rather than an object/array (better for IE8)
					var str = JSON.stringify(obj);

					try {
						callback(parent, cb)(str);
					}
					catch (e) {
						// Error thrown whilst executing parent callback
					}
				}

				closeWindow();
			}

			function callback(parent, callbackID) {
				if (callbackID.indexOf('_hellojs_') !== 0) {
					return function() {
						throw 'Could not execute callback ' + callbackID;
					};
				}

				return parent[callbackID];
			}

			function closeWindow() {

				if (window.frameElement) {
					// Inside an iframe, remove from parent
					parent.document.body.removeChild(window.frameElement);
				}
				else {
					// Close this current window
					try {
						window.close();
					}
					catch (e) {}

					// IOS bug wont let us close a popup if still loading
					if (window.addEventListener) {
						window.addEventListener('load', function() {
							window.close();
						});
					}
				}

			}
		}
	});

	// Events
	// Extend the hello object with its own event instance
	hello.utils.Event.call(hello);

	///////////////////////////////////
	// Monitoring session state
	// Check for session changes
	///////////////////////////////////

	(function(hello) {

		// Monitor for a change in state and fire
		var oldSessions = {};

		// Hash of expired tokens
		var expired = {};

		// Listen to other triggers to Auth events, use these to update this
		hello.on('auth.login, auth.logout', function(auth) {
			if (auth && typeof (auth) === 'object' && auth.network) {
				oldSessions[auth.network] = hello.utils.store(auth.network) || {};
			}
		});

		(function self() {

			var CURRENT_TIME = ((new Date()).getTime() / 1e3);
			var emit = function(eventName) {
				hello.emit('auth.' + eventName, {
					network: name,
					authResponse: session
				});
			};

			// Loop through the services
			for (var name in hello.services) {if (hello.services.hasOwnProperty(name)) {

				if (!hello.services[name].id) {
					// We haven't attached an ID so dont listen.
					continue;
				}

				// Get session
				var session = hello.utils.store(name) || {};
				var provider = hello.services[name];
				var oldSess = oldSessions[name] || {};

				// Listen for globalEvents that did not get triggered from the child
				if (session && 'callback' in session) {

					// To do remove from session object...
					var cb = session.callback;
					try {
						delete session.callback;
					}
					catch (e) {}

					// Update store
					// Removing the callback
					hello.utils.store(name, session);

					// Emit global events
					try {
						window[cb](session);
					}
					catch (e) {}
				}

				// Refresh token
				if (session && ('expires' in session) && session.expires < CURRENT_TIME) {

					// If auto refresh is possible
					// Either the browser supports
					var refresh = provider.refresh || session.refresh_token;

					// Has the refresh been run recently?
					if (refresh && (!(name in expired) || expired[name] < CURRENT_TIME)) {
						// Try to resignin
						hello.emit('notice', name + ' has expired trying to resignin');
						hello.login(name, {display: 'none', force: false});

						// Update expired, every 10 minutes
						expired[name] = CURRENT_TIME + 600;
					}

					// Does this provider not support refresh
					else if (!refresh && !(name in expired)) {
						// Label the event
						emit('expired');
						expired[name] = true;
					}

					// If session has expired then we dont want to store its value until it can be established that its been updated
					continue;
				}

				// Has session changed?
				else if (oldSess.access_token === session.access_token &&
				oldSess.expires === session.expires) {
					continue;
				}

				// Access_token has been removed
				else if (!session.access_token && oldSess.access_token) {
					emit('logout');
				}

				// Access_token has been created
				else if (session.access_token && !oldSess.access_token) {
					emit('login');
				}

				// Access_token has been updated
				else if (session.expires !== oldSess.expires) {
					emit('update');
				}

				// Updated stored session
				oldSessions[name] = session;

				// Remove the expired flags
				if (name in expired) {
					delete expired[name];
				}
			}}

			// Check error events
			setTimeout(self, 1000);
		})();

	})(hello);

	// EOF CORE lib
	//////////////////////////////////

	/////////////////////////////////////////
	// API
	// @param path    string
	// @param query   object (optional)
	// @param method  string (optional)
	// @param data    object (optional)
	// @param timeout integer (optional)
	// @param callback  function (optional)

	hello.api = function() {

		// Shorthand
		var _this = this;
		var utils = _this.utils;
		var error = utils.error;

		// Construct a new Promise object
		var promise = utils.Promise();

		// Arguments
		var p = utils.args({path: 's!', query: 'o', method: 's', data: 'o', timeout: 'i', callback: 'f'}, arguments);

		// Method
		p.method = (p.method || 'get').toLowerCase();

		// Headers
		p.headers = p.headers || {};

		// Query
		p.query = p.query || {};

		// If get, put all parameters into query
		if (p.method === 'get' || p.method === 'delete') {
			utils.extend(p.query, p.data);
			p.data = {};
		}

		var data = p.data = p.data || {};

		// Completed event callback
		promise.then(p.callback, p.callback);

		// Remove the network from path, e.g. facebook:/me/friends
		// Results in { network : facebook, path : me/friends }
		if (!p.path) {
			return promise.reject(error('invalid_path', 'Missing the path parameter from the request'));
		}

		p.path = p.path.replace(/^\/+/, '');
		var a = (p.path.split(/[\/\:]/, 2) || [])[0].toLowerCase();

		if (a in _this.services) {
			p.network = a;
			var reg = new RegExp('^' + a + ':?\/?');
			p.path = p.path.replace(reg, '');
		}

		// Network & Provider
		// Define the network that this request is made for
		p.network = _this.settings.default_service = p.network || _this.settings.default_service;
		var o = _this.services[p.network];

		// INVALID
		// Is there no service by the given network name?
		if (!o) {
			return promise.reject(error('invalid_network', 'Could not match the service requested: ' + p.network));
		}

		// PATH
		// As long as the path isn't flagged as unavaiable, e.g. path == false

		if (!(!(p.method in o) || !(p.path in o[p.method]) || o[p.method][p.path] !== false)) {
			return promise.reject(error('invalid_path', 'The provided path is not available on the selected network'));
		}

		// PROXY
		// OAuth1 calls always need a proxy

		if (!p.oauth_proxy) {
			p.oauth_proxy = _this.settings.oauth_proxy;
		}

		if (!('proxy' in p)) {
			p.proxy = p.oauth_proxy && o.oauth && parseInt(o.oauth.version, 10) === 1;
		}

		// TIMEOUT
		// Adopt timeout from global settings by default

		if (!('timeout' in p)) {
			p.timeout = _this.settings.timeout;
		}

		// Format response
		// Whether to run the raw response through post processing.
		if (!('formatResponse' in p)) {
			p.formatResponse = true;
		}

		// Get the current session
		// Append the access_token to the query
		p.authResponse = _this.getAuthResponse(p.network);
		if (p.authResponse && p.authResponse.access_token) {
			p.query.access_token = p.authResponse.access_token;
		}

		var url = p.path;
		var m;

		// Store the query as options
		// This is used to populate the request object before the data is augmented by the prewrap handlers.
		p.options = utils.clone(p.query);

		// Clone the data object
		// Prevent this script overwriting the data of the incoming object.
		// Ensure that everytime we run an iteration the callbacks haven't removed some data
		p.data = utils.clone(data);

		// URL Mapping
		// Is there a map for the given URL?
		var actions = o[{'delete': 'del'}[p.method] || p.method] || {};

		// Extrapolate the QueryString
		// Provide a clean path
		// Move the querystring into the data
		if (p.method === 'get') {

			var query = url.split(/[\?#]/)[1];
			if (query) {
				utils.extend(p.query, utils.param(query));

				// Remove the query part from the URL
				url = url.replace(/\?.*?(#|$)/, '$1');
			}
		}

		// Is the hash fragment defined
		if ((m = url.match(/#(.+)/, ''))) {
			url = url.split('#')[0];
			p.path = m[1];
		}
		else if (url in actions) {
			p.path = url;
			url = actions[url];
		}
		else if ('default' in actions) {
			url = actions['default'];
		}

		// Redirect Handler
		// This defines for the Form+Iframe+Hash hack where to return the results too.
		p.redirect_uri = _this.settings.redirect_uri;

		// Define FormatHandler
		// The request can be procesed in a multitude of ways
		// Here's the options - depending on the browser and endpoint
		p.xhr = o.xhr;
		p.jsonp = o.jsonp;
		p.form = o.form;

		// Make request
		if (typeof (url) === 'function') {
			// Does self have its own callback?
			url(p, getPath);
		}
		else {
			// Else the URL is a string
			getPath(url);
		}

		return promise.proxy;

		// If url needs a base
		// Wrap everything in
		function getPath(url) {

			// Format the string if it needs it
			url = url.replace(/\@\{([a-z\_\-]+)(\|.*?)?\}/gi, function(m, key, defaults) {
				var val = defaults ? defaults.replace(/^\|/, '') : '';
				if (key in p.query) {
					val = p.query[key];
					delete p.query[key];
				}
				else if (p.data && key in p.data) {
					val = p.data[key];
					delete p.data[key];
				}
				else if (!defaults) {
					promise.reject(error('missing_attribute', 'The attribute ' + key + ' is missing from the request'));
				}

				return val;
			});

			// Add base
			if (!url.match(/^https?:\/\//)) {
				url = o.base + url;
			}

			// Define the request URL
			p.url = url;

			// Make the HTTP request with the curated request object
			// CALLBACK HANDLER
			// @ response object
			// @ statusCode integer if available
			utils.request(p, function(r, headers) {

				// Is this a raw response?
				if (!p.formatResponse) {
					// Bad request? error statusCode or otherwise contains an error response vis JSONP?
					if (typeof headers === 'object' ? (headers.statusCode >= 400) : (typeof r === 'object' && 'error' in r)) {
						promise.reject(r);
					}
					else {
						promise.fulfill(r);
					}

					return;
				}

				// Should this be an object
				if (r === true) {
					r = {success:true};
				}
				else if (!r) {
					r = {};
				}

				// The delete callback needs a better response
				if (p.method === 'delete') {
					r = (!r || utils.isEmpty(r)) ? {success:true} : r;
				}

				// FORMAT RESPONSE?
				// Does self request have a corresponding formatter
				if (o.wrap && ((p.path in o.wrap) || ('default' in o.wrap))) {
					var wrap = (p.path in o.wrap ? p.path : 'default');
					var time = (new Date()).getTime();

					// FORMAT RESPONSE
					var b = o.wrap[wrap](r, headers, p);

					// Has the response been utterly overwritten?
					// Typically self augments the existing object.. but for those rare occassions
					if (b) {
						r = b;
					}
				}

				// Is there a next_page defined in the response?
				if (r && 'paging' in r && r.paging.next) {

					// Add the relative path if it is missing from the paging/next path
					if (r.paging.next[0] === '?') {
						r.paging.next = p.path + r.paging.next;
					}

					// The relative path has been defined, lets markup the handler in the HashFragment
					else {
						r.paging.next += '#' + p.path;
					}
				}

				// Dispatch to listeners
				// Emit events which pertain to the formatted response
				if (!r || 'error' in r) {
					promise.reject(r);
				}
				else {
					promise.fulfill(r);
				}
			});
		}
	};

	// API utilities
	hello.utils.extend(hello.utils, {

		// Make an HTTP request
		request: function(p, callback) {

			var _this = this;
			var error = _this.error;

			// This has to go through a POST request
			if (!_this.isEmpty(p.data) && !('FileList' in window) && _this.hasBinary(p.data)) {

				// Disable XHR and JSONP
				p.xhr = false;
				p.jsonp = false;
			}

			// Check if the browser and service support CORS
			var cors = this.request_cors(function() {
				// If it does then run this...
				return ((p.xhr === undefined) || (p.xhr && (typeof (p.xhr) !== 'function' || p.xhr(p, p.query))));
			});

			if (cors) {

				formatUrl(p, function(url) {

					var x = _this.xhr(p.method, url, p.headers, p.data, callback);
					x.onprogress = p.onprogress || null;

					// Windows Phone does not support xhr.upload, see #74
					// Feature detect
					if (x.upload && p.onuploadprogress) {
						x.upload.onprogress = p.onuploadprogress;
					}

				});

				return;
			}

			// Clone the query object
			// Each request modifies the query object and needs to be tared after each one.
			var _query = p.query;

			p.query = _this.clone(p.query);

			// Assign a new callbackID
			p.callbackID = _this.globalEvent();

			// JSONP
			if (p.jsonp !== false) {

				// Clone the query object
				p.query.callback = p.callbackID;

				// If the JSONP is a function then run it
				if (typeof (p.jsonp) === 'function') {
					p.jsonp(p, p.query);
				}

				// Lets use JSONP if the method is 'get'
				if (p.method === 'get') {

					formatUrl(p, function(url) {
						_this.jsonp(url, callback, p.callbackID, p.timeout);
					});

					return;
				}
				else {
					// It's not compatible reset query
					p.query = _query;
				}

			}

			// Otherwise we're on to the old school, iframe hacks and JSONP
			if (p.form !== false) {

				// Add some additional query parameters to the URL
				// We're pretty stuffed if the endpoint doesn't like these
				p.query.redirect_uri = p.redirect_uri;
				p.query.state = JSON.stringify({callback:p.callbackID});

				var opts;

				if (typeof (p.form) === 'function') {

					// Format the request
					opts = p.form(p, p.query);
				}

				if (p.method === 'post' && opts !== false) {

					formatUrl(p, function(url) {
						_this.post(url, p.data, opts, callback, p.callbackID, p.timeout);
					});

					return;
				}
			}

			// None of the methods were successful throw an error
			callback(error('invalid_request', 'There was no mechanism for handling this request'));

			return;

			// Format URL
			// Constructs the request URL, optionally wraps the URL through a call to a proxy server
			// Returns the formatted URL
			function formatUrl(p, callback) {

				// Are we signing the request?
				var sign;

				// OAuth1
				// Remove the token from the query before signing
				if (p.authResponse && p.authResponse.oauth && parseInt(p.authResponse.oauth.version, 10) === 1) {

					// OAUTH SIGNING PROXY
					sign = p.query.access_token;

					// Remove the access_token
					delete p.query.access_token;

					// Enfore use of Proxy
					p.proxy = true;
				}

				// POST body to querystring
				if (p.data && (p.method === 'get' || p.method === 'delete')) {
					// Attach the p.data to the querystring.
					_this.extend(p.query, p.data);
					p.data = null;
				}

				// Construct the path
				var path = _this.qs(p.url, p.query);

				// Proxy the request through a server
				// Used for signing OAuth1
				// And circumventing services without Access-Control Headers
				if (p.proxy) {
					// Use the proxy as a path
					path = _this.qs(p.oauth_proxy, {
						path: path,
						access_token: sign || '',

						// This will prompt the request to be signed as though it is OAuth1
						then: p.proxy_response_type || (p.method.toLowerCase() === 'get' ? 'redirect' : 'proxy'),
						method: p.method.toLowerCase(),
						suppress_response_codes: true
					});
				}

				callback(path);
			}
		},

		// Test whether the browser supports the CORS response
		request_cors: function(callback) {
			return 'withCredentials' in new XMLHttpRequest() && callback();
		},

		// Return the type of DOM object
		domInstance: function(type, data) {
			var test = 'HTML' + (type || '').replace(
				/^[a-z]/,
				function(m) {
					return m.toUpperCase();
				}

			) + 'Element';

			if (!data) {
				return false;
			}

			if (window[test]) {
				return data instanceof window[test];
			}
			else if (window.Element) {
				return data instanceof window.Element && (!type || (data.tagName && data.tagName.toLowerCase() === type));
			}
			else {
				return (!(data instanceof Object || data instanceof Array || data instanceof String || data instanceof Number) && data.tagName && data.tagName.toLowerCase() === type);
			}
		},

		// Create a clone of an object
		clone: function(obj) {
			// Does not clone DOM elements, nor Binary data, e.g. Blobs, Filelists
			if (obj === null || typeof (obj) !== 'object' || obj instanceof Date || 'nodeName' in obj || this.isBinary(obj) || (typeof FormData === 'function' && obj instanceof FormData)) {
				return obj;
			}

			if (Array.isArray(obj)) {
				// Clone each item in the array
				return obj.map(this.clone.bind(this));
			}

			// But does clone everything else.
			var clone = {};
			for (var x in obj) {
				clone[x] = this.clone(obj[x]);
			}

			return clone;
		},

		// XHR: uses CORS to make requests
		xhr: function(method, url, headers, data, callback) {

			var r = new XMLHttpRequest();
			var error = this.error;

			// Binary?
			var binary = false;
			if (method === 'blob') {
				binary = method;
				method = 'GET';
			}

			method = method.toUpperCase();

			// Xhr.responseType 'json' is not supported in any of the vendors yet.
			r.onload = function(e) {
				var json = r.response;
				try {
					json = JSON.parse(r.responseText);
				}
				catch (_e) {
					if (r.status === 401) {
						json = error('access_denied', r.statusText);
					}
				}

				var headers = headersToJSON(r.getAllResponseHeaders());
				headers.statusCode = r.status;

				callback(json || (method === 'GET' ? error('empty_response', 'Could not get resource') : {}), headers);
			};

			r.onerror = function(e) {
				var json = r.responseText;
				try {
					json = JSON.parse(r.responseText);
				}
				catch (_e) {}

				callback(json || error('access_denied', 'Could not get resource'));
			};

			var x;

			// Should we add the query to the URL?
			if (method === 'GET' || method === 'DELETE') {
				data = null;
			}
			else if (data && typeof (data) !== 'string' && !(data instanceof FormData) && !(data instanceof File) && !(data instanceof Blob)) {
				// Loop through and add formData
				var f = new FormData();
				for (x in data) if (data.hasOwnProperty(x)) {
					if (data[x] instanceof HTMLInputElement) {
						if ('files' in data[x] && data[x].files.length > 0) {
							f.append(x, data[x].files[0]);
						}
					}
					else if (data[x] instanceof Blob) {
						f.append(x, data[x], data.name);
					}
					else {
						f.append(x, data[x]);
					}
				}

				data = f;
			}

			// Open the path, async
			r.open(method, url, true);

			if (binary) {
				if ('responseType' in r) {
					r.responseType = binary;
				}
				else {
					r.overrideMimeType('text/plain; charset=x-user-defined');
				}
			}

			// Set any bespoke headers
			if (headers) {
				for (x in headers) {
					r.setRequestHeader(x, headers[x]);
				}
			}

			r.send(data);

			return r;

			// Headers are returned as a string
			function headersToJSON(s) {
				var r = {};
				var reg = /([a-z\-]+):\s?(.*);?/gi;
				var m;
				while ((m = reg.exec(s))) {
					r[m[1]] = m[2];
				}

				return r;
			}
		},

		// JSONP
		// Injects a script tag into the DOM to be executed and appends a callback function to the window object
		// @param string/function pathFunc either a string of the URL or a callback function pathFunc(querystringhash, continueFunc);
		// @param function callback a function to call on completion;
		jsonp: function(url, callback, callbackID, timeout) {

			var _this = this;
			var error = _this.error;

			// Change the name of the callback
			var bool = 0;
			var head = document.getElementsByTagName('head')[0];
			var operaFix;
			var result = error('server_error', 'server_error');
			var cb = function() {
				if (!(bool++)) {
					window.setTimeout(function() {
						callback(result);
						head.removeChild(script);
					}, 0);
				}

			};

			// Add callback to the window object
			callbackID = _this.globalEvent(function(json) {
				result = json;
				return true;

				// Mark callback as done
			}, callbackID);

			// The URL is a function for some cases and as such
			// Determine its value with a callback containing the new parameters of this function.
			url = url.replace(new RegExp('=\\?(&|$)'), '=' + callbackID + '$1');

			// Build script tag
			var script = _this.append('script', {
				id: callbackID,
				name: callbackID,
				src: url,
				async: true,
				onload: cb,
				onerror: cb,
				onreadystatechange: function() {
					if (/loaded|complete/i.test(this.readyState)) {
						cb();
					}
				}
			});

			// Opera fix error
			// Problem: If an error occurs with script loading Opera fails to trigger the script.onerror handler we specified
			//
			// Fix:
			// By setting the request to synchronous we can trigger the error handler when all else fails.
			// This action will be ignored if we've already called the callback handler "cb" with a successful onload event
			if (window.navigator.userAgent.toLowerCase().indexOf('opera') > -1) {
				operaFix = _this.append('script', {
					text: 'document.getElementById(\'' + callbackID + '\').onerror();'
				});
				script.async = false;
			}

			// Add timeout
			if (timeout) {
				window.setTimeout(function() {
					result = error('timeout', 'timeout');
					cb();
				}, timeout);
			}

			// TODO: add fix for IE,
			// However: unable recreate the bug of firing off the onreadystatechange before the script content has been executed and the value of "result" has been defined.
			// Inject script tag into the head element
			head.appendChild(script);

			// Append Opera Fix to run after our script
			if (operaFix) {
				head.appendChild(operaFix);
			}
		},

		// Post
		// Send information to a remote location using the post mechanism
		// @param string uri path
		// @param object data, key value data to send
		// @param function callback, function to execute in response
		post: function(url, data, options, callback, callbackID, timeout) {

			var _this = this;
			var error = _this.error;
			var doc = document;

			// This hack needs a form
			var form = null;
			var reenableAfterSubmit = [];
			var newform;
			var i = 0;
			var x = null;
			var bool = 0;
			var cb = function(r) {
				if (!(bool++)) {
					callback(r);
				}
			};

			// What is the name of the callback to contain
			// We'll also use this to name the iframe
			_this.globalEvent(cb, callbackID);

			// Build the iframe window
			var win;
			try {
				// IE7 hack, only lets us define the name here, not later.
				win = doc.createElement('<iframe name="' + callbackID + '">');
			}
			catch (e) {
				win = doc.createElement('iframe');
			}

			win.name = callbackID;
			win.id = callbackID;
			win.style.display = 'none';

			// Override callback mechanism. Triggger a response onload/onerror
			if (options && options.callbackonload) {
				// Onload is being fired twice
				win.onload = function() {
					cb({
						response: 'posted',
						message: 'Content was posted'
					});
				};
			}

			if (timeout) {
				setTimeout(function() {
					cb(error('timeout', 'The post operation timed out'));
				}, timeout);
			}

			doc.body.appendChild(win);

			// If we are just posting a single item
			if (_this.domInstance('form', data)) {
				// Get the parent form
				form = data.form;

				// Loop through and disable all of its siblings
				for (i = 0; i < form.elements.length; i++) {
					if (form.elements[i] !== data) {
						form.elements[i].setAttribute('disabled', true);
					}
				}

				// Move the focus to the form
				data = form;
			}

			// Posting a form
			if (_this.domInstance('form', data)) {
				// This is a form element
				form = data;

				// Does this form need to be a multipart form?
				for (i = 0; i < form.elements.length; i++) {
					if (!form.elements[i].disabled && form.elements[i].type === 'file') {
						form.encoding = form.enctype = 'multipart/form-data';
						form.elements[i].setAttribute('name', 'file');
					}
				}
			}
			else {
				// Its not a form element,
				// Therefore it must be a JSON object of Key=>Value or Key=>Element
				// If anyone of those values are a input type=file we shall shall insert its siblings into the form for which it belongs.
				for (x in data) if (data.hasOwnProperty(x)) {
					// Is this an input Element?
					if (_this.domInstance('input', data[x]) && data[x].type === 'file') {
						form = data[x].form;
						form.encoding = form.enctype = 'multipart/form-data';
					}
				}

				// Do If there is no defined form element, lets create one.
				if (!form) {
					// Build form
					form = doc.createElement('form');
					doc.body.appendChild(form);
					newform = form;
				}

				var input;

				// Add elements to the form if they dont exist
				for (x in data) if (data.hasOwnProperty(x)) {

					// Is this an element?
					var el = (_this.domInstance('input', data[x]) || _this.domInstance('textArea', data[x]) || _this.domInstance('select', data[x]));

					// Is this not an input element, or one that exists outside the form.
					if (!el || data[x].form !== form) {

						// Does an element have the same name?
						var inputs = form.elements[x];
						if (input) {
							// Remove it.
							if (!(inputs instanceof NodeList)) {
								inputs = [inputs];
							}

							for (i = 0; i < inputs.length; i++) {
								inputs[i].parentNode.removeChild(inputs[i]);
							}

						}

						// Create an input element
						input = doc.createElement('input');
						input.setAttribute('type', 'hidden');
						input.setAttribute('name', x);

						// Does it have a value attribute?
						if (el) {
							input.value = data[x].value;
						}
						else if (_this.domInstance(null, data[x])) {
							input.value = data[x].innerHTML || data[x].innerText;
						}
						else {
							input.value = data[x];
						}

						form.appendChild(input);
					}

					// It is an element, which exists within the form, but the name is wrong
					else if (el && data[x].name !== x) {
						data[x].setAttribute('name', x);
						data[x].name = x;
					}
				}

				// Disable elements from within the form if they weren't specified
				for (i = 0; i < form.elements.length; i++) {

					input = form.elements[i];

					// Does the same name and value exist in the parent
					if (!(input.name in data) && input.getAttribute('disabled') !== true) {
						// Disable
						input.setAttribute('disabled', true);

						// Add re-enable to callback
						reenableAfterSubmit.push(input);
					}
				}
			}

			// Set the target of the form
			form.setAttribute('method', 'POST');
			form.setAttribute('target', callbackID);
			form.target = callbackID;

			// Update the form URL
			form.setAttribute('action', url);

			// Submit the form
			// Some reason this needs to be offset from the current window execution
			setTimeout(function() {
				form.submit();

				setTimeout(function() {
					try {
						// Remove the iframe from the page.
						//win.parentNode.removeChild(win);
						// Remove the form
						if (newform) {
							newform.parentNode.removeChild(newform);
						}
					}
					catch (e) {
						try {
							console.error('HelloJS: could not remove iframe');
						}
						catch (ee) {}
					}

					// Reenable the disabled form
					for (var i = 0; i < reenableAfterSubmit.length; i++) {
						if (reenableAfterSubmit[i]) {
							reenableAfterSubmit[i].setAttribute('disabled', false);
							reenableAfterSubmit[i].disabled = false;
						}
					}
				}, 0);
			}, 100);
		},

		// Some of the providers require that only multipart is used with non-binary forms.
		// This function checks whether the form contains binary data
		hasBinary: function(data) {
			for (var x in data) if (data.hasOwnProperty(x)) {
				if (this.isBinary(data[x])) {
					return true;
				}
			}

			return false;
		},

		// Determines if a variable Either Is or like a FormInput has the value of a Blob

		isBinary: function(data) {

			return data instanceof Object && (
			(this.domInstance('input', data) && data.type === 'file') ||
			('FileList' in window && data instanceof window.FileList) ||
			('File' in window && data instanceof window.File) ||
			('Blob' in window && data instanceof window.Blob));

		},

		// Convert Data-URI to Blob string
		toBlob: function(dataURI) {
			var reg = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i;
			var m = dataURI.match(reg);
			if (!m) {
				return dataURI;
			}

			var binary = atob(dataURI.replace(reg, ''));
			var array = [];
			for (var i = 0; i < binary.length; i++) {
				array.push(binary.charCodeAt(i));
			}

			return new Blob([new Uint8Array(array)], {type: m[1]});
		}

	});

	// EXTRA: Convert FormElement to JSON for POSTing
	// Wrappers to add additional functionality to existing functions
	(function(hello) {

		// Copy original function
		var api = hello.api;
		var utils = hello.utils;

		utils.extend(utils, {

			// DataToJSON
			// This takes a FormElement|NodeList|InputElement|MixedObjects and convers the data object to JSON.
			dataToJSON: function(p) {

				var _this = this;
				var w = window;
				var data = p.data;

				// Is data a form object
				if (_this.domInstance('form', data)) {
					data = _this.nodeListToJSON(data.elements);
				}
				else if ('NodeList' in w && data instanceof NodeList) {
					data = _this.nodeListToJSON(data);
				}
				else if (_this.domInstance('input', data)) {
					data = _this.nodeListToJSON([data]);
				}

				// Is data a blob, File, FileList?
				if (('File' in w && data instanceof w.File) ||
					('Blob' in w && data instanceof w.Blob) ||
					('FileList' in w && data instanceof w.FileList)) {
					data = {file: data};
				}

				// Loop through data if it's not form data it must now be a JSON object
				if (!('FormData' in w && data instanceof w.FormData)) {

					for (var x in data) if (data.hasOwnProperty(x)) {

						if ('FileList' in w && data[x] instanceof w.FileList) {
							if (data[x].length === 1) {
								data[x] = data[x][0];
							}
						}
						else if (_this.domInstance('input', data[x]) && data[x].type === 'file') {
							continue;
						}
						else if (_this.domInstance('input', data[x]) ||
							_this.domInstance('select', data[x]) ||
							_this.domInstance('textArea', data[x])) {
							data[x] = data[x].value;
						}
						else if (_this.domInstance(null, data[x])) {
							data[x] = data[x].innerHTML || data[x].innerText;
						}
					}
				}

				p.data = data;
				return data;
			},

			// NodeListToJSON
			// Given a list of elements extrapolate their values and return as a json object
			nodeListToJSON: function(nodelist) {

				var json = {};

				// Create a data string
				for (var i = 0; i < nodelist.length; i++) {

					var input = nodelist[i];

					// If the name of the input is empty or diabled, dont add it.
					if (input.disabled || !input.name) {
						continue;
					}

					// Is this a file, does the browser not support 'files' and 'FormData'?
					if (input.type === 'file') {
						json[input.name] = input;
					}
					else {
						json[input.name] = input.value || input.innerHTML;
					}
				}

				return json;
			}
		});

		// Replace it
		hello.api = function() {

			// Get arguments
			var p = utils.args({path: 's!', method: 's', data:'o', timeout: 'i', callback: 'f'}, arguments);

			// Change for into a data object
			if (p.data) {
				utils.dataToJSON(p);
			}

			return api.call(this, p);
		};

	})(hello);

	/////////////////////////////////////
	//
	// Save any access token that is in the current page URL
	// Handle any response solicited through iframe hash tag following an API request
	//
	/////////////////////////////////////

	hello.utils.responseHandler(window, window.opener || window.parent);

	// Script to support ChromeApps
	// This overides the hello.utils.popup method to support chrome.identity.launchWebAuthFlow
	// See https://developer.chrome.com/apps/app_identity#non

	// Is this a chrome app?

	if (typeof chrome === 'object' && typeof chrome.identity === 'object' && chrome.identity.launchWebAuthFlow) {

		(function() {

			// Swap the popup method
			hello.utils.popup = function(url) {

				return _open(url, true);

			};

			// Swap the hidden iframe method
			hello.utils.iframe = function(url) {

				_open(url, false);

			};

			// Swap the request_cors method
			hello.utils.request_cors = function(callback) {

				callback();

				// Always run as CORS

				return true;
			};

			// Swap the storage method
			var _cache = {};
			chrome.storage.local.get('hello', function(r) {
				// Update the cache
				_cache = r.hello || {};
			});

			hello.utils.store = function(name, value) {

				// Get all
				if (arguments.length === 0) {
					return _cache;
				}

				// Get
				if (arguments.length === 1) {
					return _cache[name] || null;
				}

				// Set
				if (value) {
					_cache[name] = value;
					chrome.storage.local.set({hello: _cache});
					return value;
				}

				// Delete
				if (value === null) {
					delete _cache[name];
					chrome.storage.local.set({hello: _cache});
					return null;
				}
			};

			// Open function
			function _open(url, interactive) {

				// Launch
				var ref = {
					closed: false
				};

				// Launch the webAuthFlow
				chrome.identity.launchWebAuthFlow({
					url: url,
					interactive: interactive
				}, function(responseUrl) {

					// Did the user cancel this prematurely
					if (responseUrl === undefined) {
						ref.closed = true;
						return;
					}

					// Split appart the URL
					var a = hello.utils.url(responseUrl);

					// The location can be augmented in to a location object like so...
					// We dont have window operations on the popup so lets create some
					var _popup = {
						location: {

							// Change the location of the popup
							assign: function(url) {

								// If there is a secondary reassign
								// In the case of OAuth1
								// Trigger this in non-interactive mode.
								_open(url, false);
							},

							search: a.search,
							hash: a.hash,
							href: a.href
						},
						close: function() {}
					};

					// Then this URL contains information which HelloJS must process
					// URL string
					// Window - any action such as window relocation goes here
					// Opener - the parent window which opened this, aka this script

					hello.utils.responseHandler(_popup, window);
				});

				// Return the reference
				return ref;
			}

		})();
	}

	// Phonegap override for hello.phonegap.js
	(function() {

		// Is this a phonegap implementation?
		if (!(/^file:\/{3}[^\/]/.test(window.location.href) && window.cordova)) {
			// Cordova is not included.
			return;
		}

		// Augment the hidden iframe method
		hello.utils.iframe = function(url, redirectUri) {
			hello.utils.popup(url, redirectUri, {hidden: 'yes'});
		};

		// Augment the popup
		var utilPopup = hello.utils.popup;

		// Replace popup
		hello.utils.popup = function(url, redirectUri, options) {

			// Run the standard
			var popup = utilPopup.call(this, url, redirectUri, options);

			// Create a function for reopening the popup, and assigning events to the new popup object
			// PhoneGap support
			// Add an event listener to listen to the change in the popup windows URL
			// This must appear before popup.focus();
			try {
				if (popup && popup.addEventListener) {

					// Get the origin of the redirect URI

					var a = hello.utils.url(redirectUri);
					var redirectUriOrigin = a.origin || (a.protocol + '//' + a.hostname);

					// Listen to changes in the InAppBrowser window

					popup.addEventListener('loadstart', function(e) {

						var url = e.url;

						// Is this the path, as given by the redirectUri?
						// Check the new URL agains the redirectUriOrigin.
						// According to #63 a user could click 'cancel' in some dialog boxes ....
						// The popup redirects to another page with the same origin, yet we still wish it to close.

						if (url.indexOf(redirectUriOrigin) !== 0) {
							return;
						}

						// Split appart the URL
						var a = hello.utils.url(url);

						// We dont have window operations on the popup so lets create some
						// The location can be augmented in to a location object like so...

						var _popup = {
							location: {
								// Change the location of the popup
								assign: function(location) {

									// Unfourtunatly an app is may not change the location of a InAppBrowser window.
									// So to shim this, just open a new one.
									popup.executeScript({code: 'window.location.href = "' + location + ';"'});
								},

								search: a.search,
								hash: a.hash,
								href: a.href
							},
							close: function() {
								if (popup.close) {
									popup.close();
									try {
										popup.closed = true;
									}
									catch (_e) {}
								}
							}
						};

						// Then this URL contains information which HelloJS must process
						// URL string
						// Window - any action such as window relocation goes here
						// Opener - the parent window which opened this, aka this script

						hello.utils.responseHandler(_popup, window);

					});
				}
			}
			catch (e) {}

			return popup;
		};

	})();

	(function(hello) {

		// OAuth1
		var OAuth1Settings = {
			version: '1.0',
			auth: 'https://www.dropbox.com/1/oauth/authorize',
			request: 'https://api.dropbox.com/1/oauth/request_token',
			token: 'https://api.dropbox.com/1/oauth/access_token'
		};

		// OAuth2 Settings
		var OAuth2Settings = {
			version: 2,
			auth: 'https://www.dropbox.com/1/oauth2/authorize',
			grant: 'https://api.dropbox.com/1/oauth2/token'
		};

		// Initiate the Dropbox module
		hello.init({

			dropbox: {

				name: 'Dropbox',

				oauth: OAuth2Settings,

				login: function(p) {
					// OAuth2 non-standard adjustments
					p.qs.scope = '';

					// Should this be run as OAuth1?
					// If the redirect_uri is is HTTP (non-secure) then its required to revert to the OAuth1 endpoints
					var redirect = decodeURIComponent(p.qs.redirect_uri);
					if (redirect.indexOf('http:') === 0 && redirect.indexOf('http://localhost/') !== 0) {

						// Override the dropbox OAuth settings.
						hello.services.dropbox.oauth = OAuth1Settings;
					}
					else {
						// Override the dropbox OAuth settings.
						hello.services.dropbox.oauth = OAuth2Settings;
					}

					// The dropbox login window is a different size
					p.options.popup.width = 1000;
					p.options.popup.height = 1000;
				},

				/*
					Dropbox does not allow insecure HTTP URI's in the redirect_uri field
					...otherwise I'd love to use OAuth2

					Follow request https://forums.dropbox.com/topic.php?id=106505

					p.qs.response_type = 'code';
					oauth: {
						version: 2,
						auth: 'https://www.dropbox.com/1/oauth2/authorize',
						grant: 'https://api.dropbox.com/1/oauth2/token'
					}
				*/

				// API Base URL
				base: 'https://api.dropbox.com/1/',

				// Bespoke setting: this is states whether to use the custom environment of Dropbox or to use their own environment
				// Because it's notoriously difficult for Dropbox too provide access from other webservices, this defaults to Sandbox
				root: 'sandbox',

				// Map GET requests
				get: {
					me: 'account/info',

					// Https://www.dropbox.com/developers/core/docs#metadata
					'me/files': req('metadata/auto/@{parent|}'),
					'me/folder': req('metadata/auto/@{id}'),
					'me/folders': req('metadata/auto/'),

					'default': function(p, callback) {
						if (p.path.match('https://api-content.dropbox.com/1/files/')) {
							// This is a file, return binary data
							p.method = 'blob';
						}

						callback(p.path);
					}
				},

				post: {
					'me/files': function(p, callback) {

						var path = p.data.parent;
						var fileName = p.data.name;

						p.data = {
							file: p.data.file
						};

						// Does this have a data-uri to upload as a file?
						if (typeof (p.data.file) === 'string') {
							p.data.file = hello.utils.toBlob(p.data.file);
						}

						callback('https://api-content.dropbox.com/1/files_put/auto/' + path + '/' + fileName);
					},

					'me/folders': function(p, callback) {

						var name = p.data.name;
						p.data = {};

						callback('fileops/create_folder?root=@{root|sandbox}&' + hello.utils.param({
							path: name
						}));
					}
				},

				// Map DELETE requests
				del: {
					'me/files': 'fileops/delete?root=@{root|sandbox}&path=@{id}',
					'me/folder': 'fileops/delete?root=@{root|sandbox}&path=@{id}'
				},

				wrap: {
					me: function(o) {
						formatError(o);
						if (!o.uid) {
							return o;
						}

						o.name = o.display_name;
						var m = o.name.split(' ');
						o.first_name = m.shift();
						o.last_name = m.join(' ');
						o.id = o.uid;
						delete o.uid;
						delete o.display_name;
						return o;
					},

					'default': function(o, headers, req) {
						formatError(o);
						if (o.is_dir && o.contents) {
							o.data = o.contents;
							delete o.contents;

							o.data.forEach(function(item) {
								item.root = o.root;
								formatFile(item, headers, req);
							});
						}

						formatFile(o, headers, req);

						if (o.is_deleted) {
							o.success = true;
						}

						return o;
					}
				},

				// Doesn't return the CORS headers
				xhr: function(p) {

					// The proxy supports allow-cross-origin-resource
					// Alas that's the only thing we're using.
					if (p.data && p.data.file) {
						var file = p.data.file;
						if (file) {
							if (file.files) {
								p.data = file.files[0];
							}
							else {
								p.data = file;
							}
						}
					}

					if (p.method === 'delete') {
						p.method = 'post';
					}

					return true;
				},

				form: function(p, qs) {
					delete qs.state;
					delete qs.redirect_uri;
				}
			}
		});

		function formatError(o) {
			if (o && 'error' in o) {
				o.error = {
					code: 'server_error',
					message: o.error.message || o.error
				};
			}
		}

		function formatFile(o, headers, req) {

			if (typeof o !== 'object' ||
				(typeof Blob !== 'undefined' && o instanceof Blob) ||
				(typeof ArrayBuffer !== 'undefined' && o instanceof ArrayBuffer)) {
				// This is a file, let it through unformatted
				return;
			}

			if ('error' in o) {
				return;
			}

			var path = (o.root !== 'app_folder' ? o.root : '') + o.path.replace(/\&/g, '%26');
			path = path.replace(/^\//, '');
			if (o.thumb_exists) {
				o.thumbnail = req.oauth_proxy + '?path=' +
				encodeURIComponent('https://api-content.dropbox.com/1/thumbnails/auto/' + path + '?format=jpeg&size=m') + '&access_token=' + req.options.access_token;
			}

			o.type = (o.is_dir ? 'folder' : o.mime_type);
			o.name = o.path.replace(/.*\//g, '');
			if (o.is_dir) {
				o.files = path.replace(/^\//, '');
			}
			else {
				o.downloadLink = hello.settings.oauth_proxy + '?path=' +
				encodeURIComponent('https://api-content.dropbox.com/1/files/auto/' + path) + '&access_token=' + req.options.access_token;
				o.file = 'https://api-content.dropbox.com/1/files/auto/' + path;
			}

			if (!o.id) {
				o.id = o.path.replace(/^\//, '');
			}

			// O.media = 'https://api-content.dropbox.com/1/files/' + path;
		}

		function req(str) {
			return function(p, cb) {
				delete p.query.limit;
				cb(str);
			};
		}

	})(hello);

	(function(hello) {

		hello.init({

			facebook: {

				name: 'Facebook',

				// SEE https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/v2.1
				oauth: {
					version: 2,
					auth: 'https://www.facebook.com/dialog/oauth/',
					grant: 'https://graph.facebook.com/oauth/access_token'
				},

				// Authorization scopes
				scope: {
					basic: 'public_profile',
					email: 'email',
					share: 'user_posts',
					birthday: 'user_birthday',
					events: 'user_events',
					photos: 'user_photos',
					videos: 'user_videos',
					friends: 'user_friends',
					files: 'user_photos,user_videos',
					publish_files: 'user_photos,user_videos,publish_actions',
					publish: 'publish_actions',

					// Deprecated in v2.0
					// Create_event	: 'create_event',

					offline_access: ''
				},

				// Refresh the access_token
				refresh: false,

				login: function(p) {

					// Reauthenticate
					// https://developers.facebook.com/docs/facebook-login/reauthentication
					if (p.options.force) {
						p.qs.auth_type = 'reauthenticate';
					}

					// Set the display value
					p.qs.display = p.options.display || 'popup';
				},

				logout: function(callback, options) {
					// Assign callback to a global handler
					var callbackID = hello.utils.globalEvent(callback);
					var redirect = encodeURIComponent(hello.settings.redirect_uri + '?' + hello.utils.param({callback:callbackID, result: JSON.stringify({force:true}), state: '{}'}));
					var token = (options.authResponse || {}).access_token;
					hello.utils.iframe('https://www.facebook.com/logout.php?next=' + redirect + '&access_token=' + token);

					// Possible responses:
					// String URL	- hello.logout should handle the logout
					// Undefined	- this function will handle the callback
					// True - throw a success, this callback isn't handling the callback
					// False - throw a error
					if (!token) {
						// If there isn't a token, the above wont return a response, so lets trigger a response
						return false;
					}
				},

				// API Base URL
				base: 'https://graph.facebook.com/v2.7/',

				// Map GET requests
				get: {
					me: 'me?fields=email,first_name,last_name,name,timezone,verified',
					'me/friends': 'me/friends',
					'me/following': 'me/friends',
					'me/followers': 'me/friends',
					'me/share': 'me/feed',
					'me/like': 'me/likes',
					'me/files': 'me/albums',
					'me/albums': 'me/albums?fields=cover_photo,name',
					'me/album': '@{id}/photos?fields=picture',
					'me/photos': 'me/photos',
					'me/photo': '@{id}',
					'friend/albums': '@{id}/albums',
					'friend/photos': '@{id}/photos'

					// Pagination
					// Https://developers.facebook.com/docs/reference/api/pagination/
				},

				// Map POST requests
				post: {
					'me/share': 'me/feed',
					'me/photo': '@{id}'

					// Https://developers.facebook.com/docs/graph-api/reference/v2.2/object/likes/
				},

				wrap: {
					me: formatUser,
					'me/friends': formatFriends,
					'me/following': formatFriends,
					'me/followers': formatFriends,
					'me/albums': format,
					'me/photos': format,
					'me/files': format,
					'default': format
				},

				// Special requirements for handling XHR
				xhr: function(p, qs) {
					if (p.method === 'get' || p.method === 'post') {
						qs.suppress_response_codes = true;
					}

					// Is this a post with a data-uri?
					if (p.method === 'post' && p.data && typeof (p.data.file) === 'string') {
						// Convert the Data-URI to a Blob
						p.data.file = hello.utils.toBlob(p.data.file);
					}

					return true;
				},

				// Special requirements for handling JSONP fallback
				jsonp: function(p, qs) {
					var m = p.method;
					if (m !== 'get' && !hello.utils.hasBinary(p.data)) {
						p.data.method = m;
						p.method = 'get';
					}
					else if (p.method === 'delete') {
						qs.method = 'delete';
						p.method = 'post';
					}
				},

				// Special requirements for iframe form hack
				form: function(p) {
					return {
						// Fire the callback onload
						callbackonload: true
					};
				}
			}
		});

		var base = 'https://graph.facebook.com/';

		function formatUser(o) {
			if (o.id) {
				o.thumbnail = o.picture = 'https://graph.facebook.com/' + o.id + '/picture';
			}

			return o;
		}

		function formatFriends(o) {
			if ('data' in o) {
				o.data.forEach(formatUser);
			}

			return o;
		}

		function format(o, headers, req) {
			if (typeof o === 'boolean') {
				o = {success: o};
			}

			if (o && 'data' in o) {
				var token = req.query.access_token;

				if (!(o.data instanceof Array)) {
					var data = o.data;
					delete o.data;
					o.data = [data];
				}

				o.data.forEach(function(d) {

					if (d.picture) {
						d.thumbnail = d.picture;
					}

					d.pictures = (d.images || [])
						.sort(function(a, b) {
							return a.width - b.width;
						});

					if (d.cover_photo && d.cover_photo.id) {
						d.thumbnail = base + d.cover_photo.id + '/picture?access_token=' + token;
					}

					if (d.type === 'album') {
						d.files = d.photos = base + d.id + '/photos';
					}

					if (d.can_upload) {
						d.upload_location = base + d.id + '/photos';
					}
				});
			}

			return o;
		}

	})(hello);

	(function(hello) {

		hello.init({

			flickr: {

				name: 'Flickr',

				// Ensure that you define an oauth_proxy
				oauth: {
					version: '1.0a',
					auth: 'https://www.flickr.com/services/oauth/authorize?perms=read',
					request: 'https://www.flickr.com/services/oauth/request_token',
					token: 'https://www.flickr.com/services/oauth/access_token'
				},

				// API base URL
				base: 'https://api.flickr.com/services/rest',

				// Map GET resquests
				get: {
					me: sign('flickr.people.getInfo'),
					'me/friends': sign('flickr.contacts.getList', {per_page:'@{limit|50}'}),
					'me/following': sign('flickr.contacts.getList', {per_page:'@{limit|50}'}),
					'me/followers': sign('flickr.contacts.getList', {per_page:'@{limit|50}'}),
					'me/albums': sign('flickr.photosets.getList', {per_page:'@{limit|50}'}),
					'me/album': sign('flickr.photosets.getPhotos', {photoset_id: '@{id}'}),
					'me/photos': sign('flickr.people.getPhotos', {per_page:'@{limit|50}'})
				},

				wrap: {
					me: function(o) {
						formatError(o);
						o = checkResponse(o, 'person');
						if (o.id) {
							if (o.realname) {
								o.name = o.realname._content;
								var m = o.name.split(' ');
								o.first_name = m.shift();
								o.last_name = m.join(' ');
							}

							o.thumbnail = getBuddyIcon(o, 'l');
							o.picture = getBuddyIcon(o, 'l');
						}

						return o;
					},

					'me/friends': formatFriends,
					'me/followers': formatFriends,
					'me/following': formatFriends,
					'me/albums': function(o) {
						formatError(o);
						o = checkResponse(o, 'photosets');
						paging(o);
						if (o.photoset) {
							o.data = o.photoset;
							o.data.forEach(function(item) {
								item.name = item.title._content;
								item.photos = 'https://api.flickr.com/services/rest' + getApiUrl('flickr.photosets.getPhotos', {photoset_id: item.id}, true);
							});

							delete o.photoset;
						}

						return o;
					},

					'me/photos': function(o) {
						formatError(o);
						return formatPhotos(o);
					},

					'default': function(o) {
						formatError(o);
						return formatPhotos(o);
					}
				},

				xhr: false,

				jsonp: function(p, qs) {
					if (p.method == 'get') {
						delete qs.callback;
						qs.jsoncallback = p.callbackID;
					}
				}
			}
		});

		function getApiUrl(method, extraParams, skipNetwork) {
			var url = ((skipNetwork) ? '' : 'flickr:') +
				'?method=' + method +
				'&api_key=' + hello.services.flickr.id +
				'&format=json';
			for (var param in extraParams) {
				if (extraParams.hasOwnProperty(param)) {
					url += '&' + param + '=' + extraParams[param];
				}
			}

			return url;
		}

		// This is not exactly neat but avoid to call
		// The method 'flickr.test.login' for each api call

		function withUser(cb) {
			var auth = hello.getAuthResponse('flickr');
			cb(auth && auth.user_nsid ? auth.user_nsid : null);
		}

		function sign(url, params) {
			if (!params) {
				params = {};
			}

			return function(p, callback) {
				withUser(function(userId) {
					params.user_id = userId;
					callback(getApiUrl(url, params, true));
				});
			};
		}

		function getBuddyIcon(profile, size) {
			var url = 'https://www.flickr.com/images/buddyicon.gif';
			if (profile.nsid && profile.iconserver && profile.iconfarm) {
				url = 'https://farm' + profile.iconfarm + '.staticflickr.com/' +
					profile.iconserver + '/' +
					'buddyicons/' + profile.nsid +
					((size) ? '_' + size : '') + '.jpg';
			}

			return url;
		}

		// See: https://www.flickr.com/services/api/misc.urls.html
		function createPhotoUrl(id, farm, server, secret, size) {
			size = (size) ? '_' + size : '';
			return 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + size + '.jpg';
		}

		function formatUser(o) {
		}

		function formatError(o) {
			if (o && o.stat && o.stat.toLowerCase() != 'ok') {
				o.error = {
					code: 'invalid_request',
					message: o.message
				};
			}
		}

		function formatPhotos(o) {
			if (o.photoset || o.photos) {
				var set = ('photoset' in o) ? 'photoset' : 'photos';
				o = checkResponse(o, set);
				paging(o);
				o.data = o.photo;
				delete o.photo;
				for (var i = 0; i < o.data.length; i++) {
					var photo = o.data[i];
					photo.name = photo.title;
					photo.picture = createPhotoUrl(photo.id, photo.farm, photo.server, photo.secret, '');
					photo.pictures = createPictures(photo.id, photo.farm, photo.server, photo.secret);
					photo.source = createPhotoUrl(photo.id, photo.farm, photo.server, photo.secret, 'b');
					photo.thumbnail = createPhotoUrl(photo.id, photo.farm, photo.server, photo.secret, 'm');
				}
			}

			return o;
		}

		// See: https://www.flickr.com/services/api/misc.urls.html
		function createPictures(id, farm, server, secret) {

			var NO_LIMIT = 2048;
			var sizes = [
				{id: 't', max: 100},
				{id: 'm', max: 240},
				{id: 'n', max: 320},
				{id: '', max: 500},
				{id: 'z', max: 640},
				{id: 'c', max: 800},
				{id: 'b', max: 1024},
				{id: 'h', max: 1600},
				{id: 'k', max: 2048},
				{id: 'o', max: NO_LIMIT}
			];

			return sizes.map(function(size) {
				return {
					source: createPhotoUrl(id, farm, server, secret, size.id),

					// Note: this is a guess that's almost certain to be wrong (unless square source)
					width: size.max,
					height: size.max
				};
			});
		}

		function checkResponse(o, key) {

			if (key in o) {
				o = o[key];
			}
			else if (!('error' in o)) {
				o.error = {
					code: 'invalid_request',
					message: o.message || 'Failed to get data from Flickr'
				};
			}

			return o;
		}

		function formatFriends(o) {
			formatError(o);
			if (o.contacts) {
				o = checkResponse(o, 'contacts');
				paging(o);
				o.data = o.contact;
				delete o.contact;
				for (var i = 0; i < o.data.length; i++) {
					var item = o.data[i];
					item.id = item.nsid;
					item.name = item.realname || item.username;
					item.thumbnail = getBuddyIcon(item, 'm');
				}
			}

			return o;
		}

		function paging(res) {
			if (res.page && res.pages && res.page !== res.pages) {
				res.paging = {
					next: '?page=' + (++res.page)
				};
			}
		}

	})(hello);

	(function(hello) {

		hello.init({

			foursquare: {

				name: 'Foursquare',

				oauth: {
					// See: https://developer.foursquare.com/overview/auth
					version: 2,
					auth: 'https://foursquare.com/oauth2/authenticate',
					grant: 'https://foursquare.com/oauth2/access_token'
				},

				// Refresh the access_token once expired
				refresh: true,

				base: 'https://api.foursquare.com/v2/',

				get: {
					me: 'users/self',
					'me/friends': 'users/self/friends',
					'me/followers': 'users/self/friends',
					'me/following': 'users/self/friends'
				},

				wrap: {
					me: function(o) {
						formatError(o);
						if (o && o.response) {
							o = o.response.user;
							formatUser(o);
						}

						return o;
					},

					'default': function(o) {
						formatError(o);

						// Format friends
						if (o && 'response' in o && 'friends' in o.response && 'items' in o.response.friends) {
							o.data = o.response.friends.items;
							o.data.forEach(formatUser);
							delete o.response;
						}

						return o;
					}
				},

				xhr: formatRequest,
				jsonp: formatRequest
			}
		});

		function formatError(o) {
			if (o.meta && (o.meta.code === 400 || o.meta.code === 401)) {
				o.error = {
					code: 'access_denied',
					message: o.meta.errorDetail
				};
			}
		}

		function formatUser(o) {
			if (o && o.id) {
				o.thumbnail = o.photo.prefix + '100x100' + o.photo.suffix;
				o.name = o.firstName + ' ' + o.lastName;
				o.first_name = o.firstName;
				o.last_name = o.lastName;
				if (o.contact) {
					if (o.contact.email) {
						o.email = o.contact.email;
					}
				}
			}
		}

		function formatRequest(p, qs) {
			var token = qs.access_token;
			delete qs.access_token;
			qs.oauth_token = token;
			qs.v = 20121125;
			return true;
		}

	})(hello);

	(function(hello) {

		hello.init({

			github: {

				name: 'GitHub',

				oauth: {
					version: 2,
					auth: 'https://github.com/login/oauth/authorize',
					grant: 'https://github.com/login/oauth/access_token',
					response_type: 'code'
				},

				scope: {
					email: 'user:email'
				},

				base: 'https://api.github.com/',

				get: {
					me: 'user',
					'me/friends': 'user/following?per_page=@{limit|100}',
					'me/following': 'user/following?per_page=@{limit|100}',
					'me/followers': 'user/followers?per_page=@{limit|100}',
					'me/like': 'user/starred?per_page=@{limit|100}'
				},

				wrap: {
					me: function(o, headers) {

						formatError(o, headers);
						formatUser(o);

						return o;
					},

					'default': function(o, headers, req) {

						formatError(o, headers);

						if (Array.isArray(o)) {
							o = {data:o};
						}

						if (o.data) {
							paging(o, headers, req);
							o.data.forEach(formatUser);
						}

						return o;
					}
				},

				xhr: function(p) {

					if (p.method !== 'get' && p.data) {

						// Serialize payload as JSON
						p.headers = p.headers || {};
						p.headers['Content-Type'] = 'application/json';
						if (typeof (p.data) === 'object') {
							p.data = JSON.stringify(p.data);
						}
					}

					return true;
				}
			}
		});

		function formatError(o, headers) {
			var code = headers ? headers.statusCode : (o && 'meta' in o && 'status' in o.meta && o.meta.status);
			if ((code === 401 || code === 403)) {
				o.error = {
					code: 'access_denied',
					message: o.message || (o.data ? o.data.message : 'Could not get response')
				};
				delete o.message;
			}
		}

		function formatUser(o) {
			if (o.id) {
				o.thumbnail = o.picture = o.avatar_url;
				o.name = o.login;
			}
		}

		function paging(res, headers, req) {
			if (res.data && res.data.length && headers && headers.Link) {
				var next = headers.Link.match(/<(.*?)>;\s*rel=\"next\"/);
				if (next) {
					res.paging = {
						next: next[1]
					};
				}
			}
		}

	})(hello);

	(function(hello) {

		var contactsUrl = 'https://www.google.com/m8/feeds/contacts/default/full?v=3.0&alt=json&max-results=@{limit|1000}&start-index=@{start|1}';

		hello.init({

			google: {

				name: 'Google Plus',

				// See: http://code.google.com/apis/accounts/docs/OAuth2UserAgent.html
				oauth: {
					version: 2,
					auth: 'https://accounts.google.com/o/oauth2/auth',
					grant: 'https://accounts.google.com/o/oauth2/token'
				},

				// Authorization scopes
				scope: {
					basic: 'https://www.googleapis.com/auth/plus.me profile',
					email: 'email',
					birthday: '',
					events: '',
					photos: 'https://picasaweb.google.com/data/',
					videos: 'http://gdata.youtube.com',
					friends: 'https://www.google.com/m8/feeds, https://www.googleapis.com/auth/plus.login',
					files: 'https://www.googleapis.com/auth/drive.readonly',
					publish: '',
					publish_files: 'https://www.googleapis.com/auth/drive',
					share: '',
					create_event: '',
					offline_access: ''
				},

				scope_delim: ' ',

				login: function(p) {

					if (p.qs.response_type === 'code') {

						// Let's set this to an offline access to return a refresh_token
						p.qs.access_type = 'offline';
					}

					// Reauthenticate
					// https://developers.google.com/identity/protocols/
					if (p.options.force) {
						p.qs.approval_prompt = 'force';
					}
				},

				// API base URI
				base: 'https://www.googleapis.com/',

				// Map GET requests
				get: {
					me: 'plus/v1/people/me',

					// Deprecated Sept 1, 2014
					//'me': 'oauth2/v1/userinfo?alt=json',

					// See: https://developers.google.com/+/api/latest/people/list
					'me/friends': 'plus/v1/people/me/people/visible?maxResults=@{limit|100}',
					'me/following': contactsUrl,
					'me/followers': contactsUrl,
					'me/contacts': contactsUrl,
					'me/share': 'plus/v1/people/me/activities/public?maxResults=@{limit|100}',
					'me/feed': 'plus/v1/people/me/activities/public?maxResults=@{limit|100}',
					'me/albums': 'https://picasaweb.google.com/data/feed/api/user/default?alt=json&max-results=@{limit|100}&start-index=@{start|1}',
					'me/album': function(p, callback) {
						var key = p.query.id;
						delete p.query.id;
						callback(key.replace('/entry/', '/feed/'));
					},

					'me/photos': 'https://picasaweb.google.com/data/feed/api/user/default?alt=json&kind=photo&max-results=@{limit|100}&start-index=@{start|1}',

					// See: https://developers.google.com/drive/v2/reference/files/list
					'me/file': 'drive/v2/files/@{id}',
					'me/files': 'drive/v2/files?q=%22@{parent|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}',

					// See: https://developers.google.com/drive/v2/reference/files/list
					'me/folders': 'drive/v2/files?q=%22@{id|root}%22+in+parents+and+mimeType+=+%22application/vnd.google-apps.folder%22+and+trashed=false&maxResults=@{limit|100}',

					// See: https://developers.google.com/drive/v2/reference/files/list
					'me/folder': 'drive/v2/files?q=%22@{id|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}'
				},

				// Map POST requests
				post: {

					// Google Drive
					'me/files': uploadDrive,
					'me/folders': function(p, callback) {
						p.data = {
							title: p.data.name,
							parents: [{id: p.data.parent || 'root'}],
							mimeType: 'application/vnd.google-apps.folder'
						};
						callback('drive/v2/files');
					}
				},

				// Map PUT requests
				put: {
					'me/files': uploadDrive
				},

				// Map DELETE requests
				del: {
					'me/files': 'drive/v2/files/@{id}',
					'me/folder': 'drive/v2/files/@{id}'
				},

				// Map PATCH requests
				patch: {
					'me/file': 'drive/v2/files/@{id}'
				},

				wrap: {
					me: function(o) {
						if (o.id) {
							o.last_name = o.family_name || (o.name ? o.name.familyName : null);
							o.first_name = o.given_name || (o.name ? o.name.givenName : null);

							if (o.emails && o.emails.length) {
								o.email = o.emails[0].value;
							}

							formatPerson(o);
						}

						return o;
					},

					'me/friends': function(o) {
						if (o.items) {
							paging(o);
							o.data = o.items;
							o.data.forEach(formatPerson);
							delete o.items;
						}

						return o;
					},

					'me/contacts': formatFriends,
					'me/followers': formatFriends,
					'me/following': formatFriends,
					'me/share': formatFeed,
					'me/feed': formatFeed,
					'me/albums': gEntry,
					'me/photos': formatPhotos,
					'default': gEntry
				},

				xhr: function(p) {

					if (p.method === 'post' || p.method === 'put') {
						toJSON(p);
					}
					else if (p.method === 'patch') {
						hello.utils.extend(p.query, p.data);
						p.data = null;
					}

					return true;
				},

				// Don't even try submitting via form.
				// This means no POST operations in <=IE9
				form: false
			}
		});

		function toInt(s) {
			return parseInt(s, 10);
		}

		function formatFeed(o) {
			paging(o);
			o.data = o.items;
			delete o.items;
			return o;
		}

		// Format: ensure each record contains a name, id etc.
		function formatItem(o) {
			if (o.error) {
				return;
			}

			if (!o.name) {
				o.name = o.title || o.message;
			}

			if (!o.picture) {
				o.picture = o.thumbnailLink;
			}

			if (!o.thumbnail) {
				o.thumbnail = o.thumbnailLink;
			}

			if (o.mimeType === 'application/vnd.google-apps.folder') {
				o.type = 'folder';
				o.files = 'https://www.googleapis.com/drive/v2/files?q=%22' + o.id + '%22+in+parents';
			}

			return o;
		}

		function formatImage(image) {
			return {
				source: image.url,
				width: image.width,
				height: image.height
			};
		}

		function formatPhotos(o) {
			o.data = o.feed.entry.map(formatEntry);
			delete o.feed;
		}

		// Google has a horrible JSON API
		function gEntry(o) {
			paging(o);

			if ('feed' in o && 'entry' in o.feed) {
				o.data = o.feed.entry.map(formatEntry);
				delete o.feed;
			}

			// Old style: Picasa, etc.
			else if ('entry' in o) {
				return formatEntry(o.entry);
			}

			// New style: Google Drive & Plus
			else if ('items' in o) {
				o.data = o.items.map(formatItem);
				delete o.items;
			}
			else {
				formatItem(o);
			}

			return o;
		}

		function formatPerson(o) {
			o.name = o.displayName || o.name;
			o.picture = o.picture || (o.image ? o.image.url : null);
			o.thumbnail = o.picture;
		}

		function formatFriends(o, headers, req) {
			paging(o);
			var r = [];
			if ('feed' in o && 'entry' in o.feed) {
				var token = req.query.access_token;
				for (var i = 0; i < o.feed.entry.length; i++) {
					var a = o.feed.entry[i];

					a.id	= a.id.$t;
					a.name	= a.title.$t;
					delete a.title;
					if (a.gd$email) {
						a.email	= (a.gd$email && a.gd$email.length > 0) ? a.gd$email[0].address : null;
						a.emails = a.gd$email;
						delete a.gd$email;
					}

					if (a.updated) {
						a.updated = a.updated.$t;
					}

					if (a.link) {

						var pic = (a.link.length > 0) ? a.link[0].href : null;
						if (pic && a.link[0].gd$etag) {
							pic += (pic.indexOf('?') > -1 ? '&' : '?') + 'access_token=' + token;
							a.picture = pic;
							a.thumbnail = pic;
						}

						delete a.link;
					}

					if (a.category) {
						delete a.category;
					}
				}

				o.data = o.feed.entry;
				delete o.feed;
			}

			return o;
		}

		function formatEntry(a) {

			var group = a.media$group;
			var photo = group.media$content.length ? group.media$content[0] : {};
			var mediaContent = group.media$content || [];
			var mediaThumbnail = group.media$thumbnail || [];

			var pictures = mediaContent
				.concat(mediaThumbnail)
				.map(formatImage)
				.sort(function(a, b) {
					return a.width - b.width;
				});

			var i = 0;
			var _a;
			var p = {
				id: a.id.$t,
				name: a.title.$t,
				description: a.summary.$t,
				updated_time: a.updated.$t,
				created_time: a.published.$t,
				picture: photo ? photo.url : null,
				pictures: pictures,
				images: [],
				thumbnail: photo ? photo.url : null,
				width: photo.width,
				height: photo.height
			};

			// Get feed/children
			if ('link' in a) {
				for (i = 0; i < a.link.length; i++) {
					var d = a.link[i];
					if (d.rel.match(/\#feed$/)) {
						p.upload_location = p.files = p.photos = d.href;
						break;
					}
				}
			}

			// Get images of different scales
			if ('category' in a && a.category.length) {
				_a = a.category;
				for (i = 0; i < _a.length; i++) {
					if (_a[i].scheme && _a[i].scheme.match(/\#kind$/)) {
						p.type = _a[i].term.replace(/^.*?\#/, '');
					}
				}
			}

			// Get images of different scales
			if ('media$thumbnail' in group && group.media$thumbnail.length) {
				_a = group.media$thumbnail;
				p.thumbnail = _a[0].url;
				p.images = _a.map(formatImage);
			}

			_a = group.media$content;

			if (_a && _a.length) {
				p.images.push(formatImage(_a[0]));
			}

			return p;
		}

		function paging(res) {

			// Contacts V2
			if ('feed' in res && res.feed.openSearch$itemsPerPage) {
				var limit = toInt(res.feed.openSearch$itemsPerPage.$t);
				var start = toInt(res.feed.openSearch$startIndex.$t);
				var total = toInt(res.feed.openSearch$totalResults.$t);

				if ((start + limit) < total) {
					res.paging = {
						next: '?start=' + (start + limit)
					};
				}
			}
			else if ('nextPageToken' in res) {
				res.paging = {
					next: '?pageToken=' + res.nextPageToken
				};
			}
		}

		// Construct a multipart message
		function Multipart() {

			// Internal body
			var body = [];
			var boundary = (Math.random() * 1e10).toString(32);
			var counter = 0;
			var lineBreak = '\r\n';
			var delim = lineBreak + '--' + boundary;
			var ready = function() {};

			var dataUri = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i;

			// Add file
			function addFile(item) {
				var fr = new FileReader();
				fr.onload = function(e) {
					addContent(btoa(e.target.result), item.type + lineBreak + 'Content-Transfer-Encoding: base64');
				};

				fr.readAsBinaryString(item);
			}

			// Add content
			function addContent(content, type) {
				body.push(lineBreak + 'Content-Type: ' + type + lineBreak + lineBreak + content);
				counter--;
				ready();
			}

			// Add new things to the object
			this.append = function(content, type) {

				// Does the content have an array
				if (typeof (content) === 'string' || !('length' in Object(content))) {
					// Converti to multiples
					content = [content];
				}

				for (var i = 0; i < content.length; i++) {

					counter++;

					var item = content[i];

					// Is this a file?
					// Files can be either Blobs or File types
					if (
						(typeof (File) !== 'undefined' && item instanceof File) ||
						(typeof (Blob) !== 'undefined' && item instanceof Blob)
					) {
						// Read the file in
						addFile(item);
					}

					// Data-URI?
					// Data:[<mime type>][;charset=<charset>][;base64],<encoded data>
					// /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i
					else if (typeof (item) === 'string' && item.match(dataUri)) {
						var m = item.match(dataUri);
						addContent(item.replace(dataUri, ''), m[1] + lineBreak + 'Content-Transfer-Encoding: base64');
					}

					// Regular string
					else {
						addContent(item, type);
					}
				}
			};

			this.onready = function(fn) {
				ready = function() {
					if (counter === 0) {
						// Trigger ready
						body.unshift('');
						body.push('--');
						fn(body.join(delim), boundary);
						body = [];
					}
				};

				ready();
			};
		}

		// Upload to Drive
		// If this is PUT then only augment the file uploaded
		// PUT https://developers.google.com/drive/v2/reference/files/update
		// POST https://developers.google.com/drive/manage-uploads
		function uploadDrive(p, callback) {

			var data = {};

			// Test for DOM element
			if (p.data &&
				(typeof (HTMLInputElement) !== 'undefined' && p.data instanceof HTMLInputElement)
			) {
				p.data = {file: p.data};
			}

			if (!p.data.name && Object(Object(p.data.file).files).length && p.method === 'post') {
				p.data.name = p.data.file.files[0].name;
			}

			if (p.method === 'post') {
				p.data = {
					title: p.data.name,
					parents: [{id: p.data.parent || 'root'}],
					file: p.data.file
				};
			}
			else {

				// Make a reference
				data = p.data;
				p.data = {};

				// Add the parts to change as required
				if (data.parent) {
					p.data.parents = [{id: p.data.parent || 'root'}];
				}

				if (data.file) {
					p.data.file = data.file;
				}

				if (data.name) {
					p.data.title = data.name;
				}
			}

			// Extract the file, if it exists from the data object
			// If the File is an INPUT element lets just concern ourselves with the NodeList
			var file;
			if ('file' in p.data) {
				file = p.data.file;
				delete p.data.file;

				if (typeof (file) === 'object' && 'files' in file) {
					// Assign the NodeList
					file = file.files;
				}

				if (!file || !file.length) {
					callback({
						error: {
							code: 'request_invalid',
							message: 'There were no files attached with this request to upload'
						}
					});
					return;
				}
			}

			// Set type p.data.mimeType = Object(file[0]).type || 'application/octet-stream';

			// Construct a multipart message
			var parts = new Multipart();
			parts.append(JSON.stringify(p.data), 'application/json');

			// Read the file into a  base64 string... yep a hassle, i know
			// FormData doesn't let us assign our own Multipart headers and HTTP Content-Type
			// Alas GoogleApi need these in a particular format
			if (file) {
				parts.append(file);
			}

			parts.onready(function(body, boundary) {

				p.headers['content-type'] = 'multipart/related; boundary="' + boundary + '"';
				p.data = body;

				callback('upload/drive/v2/files' + (data.id ? '/' + data.id : '') + '?uploadType=multipart');
			});

		}

		function toJSON(p) {
			if (typeof (p.data) === 'object') {
				// Convert the POST into a javascript object
				try {
					p.data = JSON.stringify(p.data);
					p.headers['content-type'] = 'application/json';
				}
				catch (e) {}
			}
		}

	})(hello);

	(function(hello) {

		hello.init({

			instagram: {

				name: 'Instagram',

				oauth: {
					// See: http://instagram.com/developer/authentication/
					version: 2,
					auth: 'https://instagram.com/oauth/authorize/',
					grant: 'https://api.instagram.com/oauth/access_token'
				},

				// Refresh the access_token once expired
				refresh: true,

				scope: {
					basic: 'basic',
					photos: '',
					friends: 'relationships',
					publish: 'likes comments',
					email: '',
					share: '',
					publish_files: '',
					files: '',
					videos: '',
					offline_access: ''
				},

				scope_delim: ' ',

				base: 'https://api.instagram.com/v1/',

				get: {
					me: 'users/self',
					'me/feed': 'users/self/feed?count=@{limit|100}',
					'me/photos': 'users/self/media/recent?min_id=0&count=@{limit|100}',
					'me/friends': 'users/self/follows?count=@{limit|100}',
					'me/following': 'users/self/follows?count=@{limit|100}',
					'me/followers': 'users/self/followed-by?count=@{limit|100}',
					'friend/photos': 'users/@{id}/media/recent?min_id=0&count=@{limit|100}'
				},

				post: {
					'me/like': function(p, callback) {
						var id = p.data.id;
						p.data = {};
						callback('media/' + id + '/likes');
					}
				},

				del: {
					'me/like': 'media/@{id}/likes'
				},

				wrap: {
					me: function(o) {

						formatError(o);

						if ('data' in o) {
							o.id = o.data.id;
							o.thumbnail = o.data.profile_picture;
							o.name = o.data.full_name || o.data.username;
						}

						return o;
					},

					'me/friends': formatFriends,
					'me/following': formatFriends,
					'me/followers': formatFriends,
					'me/photos': function(o) {

						formatError(o);
						paging(o);

						if ('data' in o) {
							o.data = o.data.filter(function(d) {
								return d.type === 'image';
							});

							o.data.forEach(function(d) {
								d.name = d.caption ? d.caption.text : null;
								d.thumbnail = d.images.thumbnail.url;
								d.picture = d.images.standard_resolution.url;
								d.pictures = Object.keys(d.images)
									.map(function(key) {
										var image = d.images[key];
										return formatImage(image);
									})
									.sort(function(a, b) {
										return a.width - b.width;
									});
							});
						}

						return o;
					},

					'default': function(o) {
						o = formatError(o);
						paging(o);
						return o;
					}
				},

				// Instagram does not return any CORS Headers
				// So besides JSONP we're stuck with proxy
				xhr: function(p, qs) {

					var method = p.method;
					var proxy = method !== 'get';

					if (proxy) {

						if ((method === 'post' || method === 'put') && p.query.access_token) {
							p.data.access_token = p.query.access_token;
							delete p.query.access_token;
						}

						// No access control headers
						// Use the proxy instead
						p.proxy = proxy;
					}

					return proxy;
				},

				// No form
				form: false
			}
		});

		function formatImage(image) {
			return {
				source: image.url,
				width: image.width,
				height: image.height
			};
		}

		function formatError(o) {
			if (typeof o === 'string') {
				return {
					error: {
						code: 'invalid_request',
						message: o
					}
				};
			}

			if (o && 'meta' in o && 'error_type' in o.meta) {
				o.error = {
					code: o.meta.error_type,
					message: o.meta.error_message
				};
			}

			return o;
		}

		function formatFriends(o) {
			paging(o);
			if (o && 'data' in o) {
				o.data.forEach(formatFriend);
			}

			return o;
		}

		function formatFriend(o) {
			if (o.id) {
				o.thumbnail = o.profile_picture;
				o.name = o.full_name || o.username;
			}
		}

		// See: http://instagram.com/developer/endpoints/
		function paging(res) {
			if ('pagination' in res) {
				res.paging = {
					next: res.pagination.next_url
				};
				delete res.pagination;
			}
		}

	})(hello);

	(function(hello) {

		hello.init({

			joinme: {

				name: 'join.me',

				oauth: {
					version: 2,
					auth: 'https://secure.join.me/api/public/v1/auth/oauth2',
					grant: 'https://secure.join.me/api/public/v1/auth/oauth2'
				},

				refresh: false,

				scope: {
					basic: 'user_info',
					user: 'user_info',
					scheduler: 'scheduler',
					start: 'start_meeting',
					email: '',
					friends: '',
					share: '',
					publish: '',
					photos: '',
					publish_files: '',
					files: '',
					videos: '',
					offline_access: ''
				},

				scope_delim: ' ',

				login: function(p) {
					p.options.popup.width = 400;
					p.options.popup.height = 700;
				},

				base: 'https://api.join.me/v1/',

				get: {
					me: 'user',
					meetings: 'meetings',
					'meetings/info': 'meetings/@{id}'
				},

				post: {
					'meetings/start/adhoc': function(p, callback) {
						callback('meetings/start');
					},

					'meetings/start/scheduled': function(p, callback) {
						var meetingId = p.data.meetingId;
						p.data = {};
						callback('meetings/' + meetingId + '/start');
					},

					'meetings/schedule': function(p, callback) {
						callback('meetings');
					}
				},

				patch: {
					'meetings/update': function(p, callback) {
						callback('meetings/' + p.data.meetingId);
					}
				},

				del: {
					'meetings/delete': 'meetings/@{id}'
				},

				wrap: {
					me: function(o, headers) {
						formatError(o, headers);

						if (!o.email) {
							return o;
						}

						o.name = o.fullName;
						o.first_name = o.name.split(' ')[0];
						o.last_name = o.name.split(' ')[1];
						o.id = o.email;

						return o;
					},

					'default': function(o, headers) {
						formatError(o, headers);

						return o;
					}
				},

				xhr: formatRequest

			}
		});

		function formatError(o, headers) {
			var errorCode;
			var message;
			var details;

			if (o && ('Message' in o)) {
				message = o.Message;
				delete o.Message;

				if ('ErrorCode' in o) {
					errorCode = o.ErrorCode;
					delete o.ErrorCode;
				}
				else {
					errorCode = getErrorCode(headers);
				}

				o.error = {
					code: errorCode,
					message: message,
					details: o
				};
			}

			return o;
		}

		function formatRequest(p, qs) {
			// Move the access token from the request body to the request header
			var token = qs.access_token;
			delete qs.access_token;
			p.headers.Authorization = 'Bearer ' + token;

			// Format non-get requests to indicate json body
			if (p.method !== 'get' && p.data) {
				p.headers['Content-Type'] = 'application/json';
				if (typeof (p.data) === 'object') {
					p.data = JSON.stringify(p.data);
				}
			}

			if (p.method === 'put') {
				p.method = 'patch';
			}

			return true;
		}

		function getErrorCode(headers) {
			switch (headers.statusCode) {
				case 400:
					return 'invalid_request';
				case 403:
					return 'stale_token';
				case 401:
					return 'invalid_token';
				case 500:
					return 'server_error';
				default:
					return 'server_error';
			}
		}

	}(hello));

	(function(hello) {

		hello.init({

			linkedin: {

				oauth: {
					version: 2,
					response_type: 'code',
					auth: 'https://www.linkedin.com/uas/oauth2/authorization',
					grant: 'https://www.linkedin.com/uas/oauth2/accessToken'
				},

				// Refresh the access_token once expired
				refresh: true,

				scope: {
					basic: 'r_basicprofile',
					email: 'r_emailaddress',
					files: '',
					friends: '',
					photos: '',
					publish: 'w_share',
					publish_files: 'w_share',
					share: '',
					videos: '',
					offline_access: ''
				},
				scope_delim: ' ',

				base: 'https://api.linkedin.com/v1/',

				get: {
					me: 'people/~:(picture-url,first-name,last-name,id,formatted-name,email-address)',

					// See: http://developer.linkedin.com/documents/get-network-updates-and-statistics-api
					'me/share': 'people/~/network/updates?count=@{limit|250}'
				},

				post: {

					// See: https://developer.linkedin.com/documents/api-requests-json
					'me/share': function(p, callback) {
						var data = {
							visibility: {
								code: 'anyone'
							}
						};

						if (p.data.id) {

							data.attribution = {
								share: {
									id: p.data.id
								}
							};

						}
						else {
							data.comment = p.data.message;
							if (p.data.picture && p.data.link) {
								data.content = {
									'submitted-url': p.data.link,
									'submitted-image-url': p.data.picture
								};
							}
						}

						p.data = JSON.stringify(data);

						callback('people/~/shares?format=json');
					},

					'me/like': like
				},

				del:{
					'me/like': like
				},

				wrap: {
					me: function(o) {
						formatError(o);
						formatUser(o);
						return o;
					},

					'me/friends': formatFriends,
					'me/following': formatFriends,
					'me/followers': formatFriends,
					'me/share': function(o) {
						formatError(o);
						paging(o);
						if (o.values) {
							o.data = o.values.map(formatUser);
							o.data.forEach(function(item) {
								item.message = item.headline;
							});

							delete o.values;
						}

						return o;
					},

					'default': function(o, headers) {
						formatError(o);
						empty(o, headers);
						paging(o);
					}
				},

				jsonp: function(p, qs) {
					formatQuery(qs);
					if (p.method === 'get') {
						qs.format = 'jsonp';
						qs['error-callback'] = p.callbackID;
					}
				},

				xhr: function(p, qs) {
					if (p.method !== 'get') {
						formatQuery(qs);
						p.headers['Content-Type'] = 'application/json';

						// Note: x-li-format ensures error responses are not returned in XML
						p.headers['x-li-format'] = 'json';
						p.proxy = true;
						return true;
					}

					return false;
				}
			}
		});

		function formatError(o) {
			if (o && 'errorCode' in o) {
				o.error = {
					code: o.status,
					message: o.message
				};
			}
		}

		function formatUser(o) {
			if (o.error) {
				return;
			}

			o.first_name = o.firstName;
			o.last_name = o.lastName;
			o.name = o.formattedName || (o.first_name + ' ' + o.last_name);
			o.thumbnail = o.pictureUrl;
			o.email = o.emailAddress;
			return o;
		}

		function formatFriends(o) {
			formatError(o);
			paging(o);
			if (o.values) {
				o.data = o.values.map(formatUser);
				delete o.values;
			}

			return o;
		}

		function paging(res) {
			if ('_count' in res && '_start' in res && (res._count + res._start) < res._total) {
				res.paging = {
					next: '?start=' + (res._start + res._count) + '&count=' + res._count
				};
			}
		}

		function empty(o, headers) {
			if (JSON.stringify(o) === '{}' && headers.statusCode === 200) {
				o.success = true;
			}
		}

		function formatQuery(qs) {
			// LinkedIn signs requests with the parameter 'oauth2_access_token'
			// ... yeah another one who thinks they should be different!
			if (qs.access_token) {
				qs.oauth2_access_token = qs.access_token;
				delete qs.access_token;
			}
		}

		function like(p, callback) {
			p.headers['x-li-format'] = 'json';
			var id = p.data.id;
			p.data = (p.method !== 'delete').toString();
			p.method = 'put';
			callback('people/~/network/updates/key=' + id + '/is-liked');
		}

	})(hello);

	// See: https://developers.soundcloud.com/docs/api/reference
	(function(hello) {

		hello.init({

			soundcloud: {
				name: 'SoundCloud',

				oauth: {
					version: 2,
					auth: 'https://soundcloud.com/connect',
					grant: 'https://soundcloud.com/oauth2/token'
				},

				// Request path translated
				base: 'https://api.soundcloud.com/',
				get: {
					me: 'me.json',

					// Http://developers.soundcloud.com/docs/api/reference#me
					'me/friends': 'me/followings.json',
					'me/followers': 'me/followers.json',
					'me/following': 'me/followings.json',

					// See: http://developers.soundcloud.com/docs/api/reference#activities
					'default': function(p, callback) {

						// Include '.json at the end of each request'
						callback(p.path + '.json');
					}
				},

				// Response handlers
				wrap: {
					me: function(o) {
						formatUser(o);
						return o;
					},

					'default': function(o) {
						if (Array.isArray(o)) {
							o = {
								data: o.map(formatUser)
							};
						}

						paging(o);
						return o;
					}
				},

				xhr: formatRequest,
				jsonp: formatRequest
			}
		});

		function formatRequest(p, qs) {
			// Alter the querystring
			var token = qs.access_token;
			delete qs.access_token;
			qs.oauth_token = token;
			qs['_status_code_map[302]'] = 200;
			return true;
		}

		function formatUser(o) {
			if (o.id) {
				o.picture = o.avatar_url;
				o.thumbnail = o.avatar_url;
				o.name = o.username || o.full_name;
			}

			return o;
		}

		// See: http://developers.soundcloud.com/docs/api/reference#activities
		function paging(res) {
			if ('next_href' in res) {
				res.paging = {
					next: res.next_href
				};
			}
		}

	})(hello);

	(function(hello) {

		var base = 'https://api.twitter.com/';

		hello.init({

			twitter: {

				// Ensure that you define an oauth_proxy
				oauth: {
					version: '1.0a',
					auth: base + 'oauth/authenticate',
					request: base + 'oauth/request_token',
					token: base + 'oauth/access_token'
				},

				login: function(p) {
					// Reauthenticate
					// https://dev.twitter.com/oauth/reference/get/oauth/authenticate
					var prefix = '?force_login=true';
					this.oauth.auth = this.oauth.auth.replace(prefix, '') + (p.options.force ? prefix : '');
				},

				base: base + '1.1/',

				get: {
					me: 'account/verify_credentials.json',
					'me/friends': 'friends/list.json?count=@{limit|200}',
					'me/following': 'friends/list.json?count=@{limit|200}',
					'me/followers': 'followers/list.json?count=@{limit|200}',

					// Https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline
					'me/share': 'statuses/user_timeline.json?count=@{limit|200}',

					// Https://dev.twitter.com/rest/reference/get/favorites/list
					'me/like': 'favorites/list.json?count=@{limit|200}'
				},

				post: {
					'me/share': function(p, callback) {

						var data = p.data;
						p.data = null;

						var status = [];

						// Change message to status
						if (data.message) {
							status.push(data.message);
							delete data.message;
						}

						// If link is given
						if (data.link) {
							status.push(data.link);
							delete data.link;
						}

						if (data.picture) {
							status.push(data.picture);
							delete data.picture;
						}

						// Compound all the components
						if (status.length) {
							data.status = status.join(' ');
						}

						// Tweet media
						if (data.file) {
							data['media[]'] = data.file;
							delete data.file;
							p.data = data;
							callback('statuses/update_with_media.json');
						}

						// Retweet?
						else if ('id' in data) {
							callback('statuses/retweet/' + data.id + '.json');
						}

						// Tweet
						else {
							// Assign the post body to the query parameters
							hello.utils.extend(p.query, data);
							callback('statuses/update.json?include_entities=1');
						}
					},

					// See: https://dev.twitter.com/rest/reference/post/favorites/create
					'me/like': function(p, callback) {
						var id = p.data.id;
						p.data = null;
						callback('favorites/create.json?id=' + id);
					}
				},

				del: {

					// See: https://dev.twitter.com/rest/reference/post/favorites/destroy
					'me/like': function() {
						p.method = 'post';
						var id = p.data.id;
						p.data = null;
						callback('favorites/destroy.json?id=' + id);
					}
				},

				wrap: {
					me: function(res) {
						formatError(res);
						formatUser(res);
						return res;
					},

					'me/friends': formatFriends,
					'me/followers': formatFriends,
					'me/following': formatFriends,

					'me/share': function(res) {
						formatError(res);
						paging(res);
						if (!res.error && 'length' in res) {
							return {data: res};
						}

						return res;
					},

					'default': function(res) {
						res = arrayToDataResponse(res);
						paging(res);
						return res;
					}
				},
				xhr: function(p) {

					// Rely on the proxy for non-GET requests.
					return (p.method !== 'get');
				}
			}
		});

		function formatUser(o) {
			if (o.id) {
				if (o.name) {
					var m = o.name.split(' ');
					o.first_name = m.shift();
					o.last_name = m.join(' ');
				}

				// See: https://dev.twitter.com/overview/general/user-profile-images-and-banners
				o.thumbnail = o.profile_image_url_https || o.profile_image_url;
			}

			return o;
		}

		function formatFriends(o) {
			formatError(o);
			paging(o);
			if (o.users) {
				o.data = o.users.map(formatUser);
				delete o.users;
			}

			return o;
		}

		function formatError(o) {
			if (o.errors) {
				var e = o.errors[0];
				o.error = {
					code: 'request_failed',
					message: e.message
				};
			}
		}

		// Take a cursor and add it to the path
		function paging(res) {
			// Does the response include a 'next_cursor_string'
			if ('next_cursor_str' in res) {
				// See: https://dev.twitter.com/docs/misc/cursoring
				res.paging = {
					next: '?cursor=' + res.next_cursor_str
				};
			}
		}

		function arrayToDataResponse(res) {
			return Array.isArray(res) ? {data: res} : res;
		}

		/**
		// The documentation says to define user in the request
		// Although its not actually required.

		var user_id;

		function withUserId(callback){
			if(user_id){
				callback(user_id);
			}
			else{
				hello.api('twitter:/me', function(o){
					user_id = o.id;
					callback(o.id);
				});
			}
		}

		function sign(url){
			return function(p, callback){
				withUserId(function(user_id){
					callback(url+'?user_id='+user_id);
				});
			};
		}
		*/

	})(hello);

	// Vkontakte (vk.com)
	(function(hello) {

		hello.init({

			vk: {
				name: 'Vk',

				// See https://vk.com/dev/oauth_dialog
				oauth: {
					version: 2,
					auth: 'https://oauth.vk.com/authorize',
					grant: 'https://oauth.vk.com/access_token'
				},

				// Authorization scopes
				// See https://vk.com/dev/permissions
				scope: {
					email: 'email',
					friends: 'friends',
					photos: 'photos',
					videos: 'video',
					share: 'share',
					offline_access: 'offline'
				},

				// Refresh the access_token
				refresh: true,

				login: function(p) {
					p.qs.display = window.navigator &&
						window.navigator.userAgent &&
						/ipad|phone|phone|android/.test(window.navigator.userAgent.toLowerCase()) ? 'mobile' : 'popup';
				},

				// API Base URL
				base: 'https://api.vk.com/method/',

				// Map GET requests
				get: {
					me: function(p, callback) {
						p.query.fields = 'id,first_name,last_name,photo_max';
						callback('users.get');
					}
				},

				wrap: {
					me: function(res, headers, req) {
						formatError(res);
						return formatUser(res, req);
					}
				},

				// No XHR
				xhr: false,

				// All requests should be JSONP as of missing CORS headers in https://api.vk.com/method/*
				jsonp: true,

				// No form
				form: false
			}
		});

		function formatUser(o, req) {

			if (o !== null && 'response' in o && o.response !== null && o.response.length) {
				o = o.response[0];
				o.id = o.uid;
				o.thumbnail = o.picture = o.photo_max;
				o.name = o.first_name + ' ' + o.last_name;

				if (req.authResponse && req.authResponse.email !== null)
					o.email = req.authResponse.email;
			}

			return o;
		}

		function formatError(o) {

			if (o.error) {
				var e = o.error;
				o.error = {
					code: e.error_code,
					message: e.error_msg
				};
			}
		}

	})(hello);

	(function(hello) {

		hello.init({
			windows: {
				name: 'Windows live',

				// REF: http://msdn.microsoft.com/en-us/library/hh243641.aspx
				oauth: {
					version: 2,
					auth: 'https://login.live.com/oauth20_authorize.srf',
					grant: 'https://login.live.com/oauth20_token.srf'
				},

				// Refresh the access_token once expired
				refresh: true,

				logout: function() {
					return 'http://login.live.com/oauth20_logout.srf?ts=' + (new Date()).getTime();
				},

				// Authorization scopes
				scope: {
					basic: 'wl.signin,wl.basic',
					email: 'wl.emails',
					birthday: 'wl.birthday',
					events: 'wl.calendars',
					photos: 'wl.photos',
					videos: 'wl.photos',
					friends: 'wl.contacts_emails',
					files: 'wl.skydrive',
					publish: 'wl.share',
					publish_files: 'wl.skydrive_update',
					share: 'wl.share',
					create_event: 'wl.calendars_update,wl.events_create',
					offline_access: 'wl.offline_access'
				},

				// API base URL
				base: 'https://apis.live.net/v5.0/',

				// Map GET requests
				get: {

					// Friends
					me: 'me',
					'me/friends': 'me/friends',
					'me/following': 'me/contacts',
					'me/followers': 'me/friends',
					'me/contacts': 'me/contacts',

					'me/albums': 'me/albums',

					// Include the data[id] in the path
					'me/album': '@{id}/files',
					'me/photo': '@{id}',

					// Files
					'me/files': '@{parent|me/skydrive}/files',
					'me/folders': '@{id|me/skydrive}/files',
					'me/folder': '@{id|me/skydrive}/files'
				},

				// Map POST requests
				post: {
					'me/albums': 'me/albums',
					'me/album': '@{id}/files/',

					'me/folders': '@{id|me/skydrive/}',
					'me/files': '@{parent|me/skydrive}/files'
				},

				// Map DELETE requests
				del: {
					// Include the data[id] in the path
					'me/album': '@{id}',
					'me/photo': '@{id}',
					'me/folder': '@{id}',
					'me/files': '@{id}'
				},

				wrap: {
					me: formatUser,

					'me/friends': formatFriends,
					'me/contacts': formatFriends,
					'me/followers': formatFriends,
					'me/following': formatFriends,
					'me/albums': formatAlbums,
					'me/photos': formatDefault,
					'default': formatDefault
				},

				xhr: function(p) {
					if (p.method !== 'get' && p.method !== 'delete' && !hello.utils.hasBinary(p.data)) {

						// Does this have a data-uri to upload as a file?
						if (typeof (p.data.file) === 'string') {
							p.data.file = hello.utils.toBlob(p.data.file);
						}
						else {
							p.data = JSON.stringify(p.data);
							p.headers = {
								'Content-Type': 'application/json'
							};
						}
					}

					return true;
				},

				jsonp: function(p) {
					if (p.method !== 'get' && !hello.utils.hasBinary(p.data)) {
						p.data.method = p.method;
						p.method = 'get';
					}
				}
			}
		});

		function formatDefault(o) {
			if ('data' in o) {
				o.data.forEach(function(d) {
					if (d.picture) {
						d.thumbnail = d.picture;
					}

					if (d.images) {
						d.pictures = d.images
							.map(formatImage)
							.sort(function(a, b) {
								return a.width - b.width;
							});
					}
				});
			}

			return o;
		}

		function formatImage(image) {
			return {
				width: image.width,
				height: image.height,
				source: image.source
			};
		}

		function formatAlbums(o) {
			if ('data' in o) {
				o.data.forEach(function(d) {
					d.photos = d.files = 'https://apis.live.net/v5.0/' + d.id + '/photos';
				});
			}

			return o;
		}

		function formatUser(o, headers, req) {
			if (o.id) {
				var token = req.query.access_token;
				if (o.emails) {
					o.email = o.emails.preferred;
				}

				// If this is not an non-network friend
				if (o.is_friend !== false) {
					// Use the id of the user_id if available
					var id = (o.user_id || o.id);
					o.thumbnail = o.picture = 'https://apis.live.net/v5.0/' + id + '/picture?access_token=' + token;
				}
			}

			return o;
		}

		function formatFriends(o, headers, req) {
			if ('data' in o) {
				o.data.forEach(function(d) {
					formatUser(d, headers, req);
				});
			}

			return o;
		}

	})(hello);

	(function(hello) {

		hello.init({

			yahoo: {

				// Ensure that you define an oauth_proxy
				oauth: {
					version: '1.0a',
					auth: 'https://api.login.yahoo.com/oauth/v2/request_auth',
					request: 'https://api.login.yahoo.com/oauth/v2/get_request_token',
					token: 'https://api.login.yahoo.com/oauth/v2/get_token'
				},

				// Login handler
				login: function(p) {
					// Change the default popup window to be at least 560
					// Yahoo does dynamically change it on the fly for the signin screen (only, what if your already signed in)
					p.options.popup.width = 560;

					// Yahoo throws an parameter error if for whatever reason the state.scope contains a comma, so lets remove scope
					try {delete p.qs.state.scope;}
					catch (e) {}
				},

				base: 'https://social.yahooapis.com/v1/',

				get: {
					me: yql('select * from social.profile(0) where guid=me'),
					'me/friends': yql('select * from social.contacts(0) where guid=me'),
					'me/following': yql('select * from social.contacts(0) where guid=me')
				},
				wrap: {
					me: formatUser,

					// Can't get IDs
					// It might be better to loop through the social.relationship table with has unique IDs of users.
					'me/friends': formatFriends,
					'me/following': formatFriends,
					'default': paging
				}
			}
		});

		/*
			// Auto-refresh fix: bug in Yahoo can't get this to work with node-oauth-shim
			login : function(o){
				// Is the user already logged in
				var auth = hello('yahoo').getAuthResponse();

				// Is this a refresh token?
				if(o.options.display==='none'&&auth&&auth.access_token&&auth.refresh_token){
					// Add the old token and the refresh token, including path to the query
					// See http://developer.yahoo.com/oauth/guide/oauth-refreshaccesstoken.html
					o.qs.access_token = auth.access_token;
					o.qs.refresh_token = auth.refresh_token;
					o.qs.token_url = 'https://api.login.yahoo.com/oauth/v2/get_token';
				}
			},
		*/

		function formatError(o) {
			if (o && 'meta' in o && 'error_type' in o.meta) {
				o.error = {
					code: o.meta.error_type,
					message: o.meta.error_message
				};
			}
		}

		function formatUser(o) {

			formatError(o);
			if (o.query && o.query.results && o.query.results.profile) {
				o = o.query.results.profile;
				o.id = o.guid;
				o.last_name = o.familyName;
				o.first_name = o.givenName || o.nickname;
				var a = [];
				if (o.first_name) {
					a.push(o.first_name);
				}

				if (o.last_name) {
					a.push(o.last_name);
				}

				o.name = a.join(' ');
				o.email = (o.emails && o.emails[0]) ? o.emails[0].handle : null;
				o.thumbnail = o.image ? o.image.imageUrl : null;
			}

			return o;
		}

		function formatFriends(o, headers, request) {
			formatError(o);
			paging(o, headers, request);
			var contact;
			var field;
			if (o.query && o.query.results && o.query.results.contact) {
				o.data = o.query.results.contact;
				delete o.query;

				if (!Array.isArray(o.data)) {
					o.data = [o.data];
				}

				o.data.forEach(formatFriend);
			}

			return o;
		}

		function formatFriend(contact) {
			contact.id = null;

			// #362: Reports of responses returning a single item, rather than an Array of items.
			// Format the contact.fields to be an array.
			if (contact.fields && !(contact.fields instanceof Array)) {
				contact.fields = [contact.fields];
			}

			(contact.fields || []).forEach(function(field) {
				if (field.type === 'email') {
					contact.email = field.value;
				}

				if (field.type === 'name') {
					contact.first_name = field.value.givenName;
					contact.last_name = field.value.familyName;
					contact.name = field.value.givenName + ' ' + field.value.familyName;
				}

				if (field.type === 'yahooid') {
					contact.id = field.value;
				}
			});
		}

		function paging(res, headers, request) {

			// See: http://developer.yahoo.com/yql/guide/paging.html#local_limits
			if (res.query && res.query.count && request.options) {
				res.paging = {
					next: '?start=' + (res.query.count + (+request.options.start || 1))
				};
			}

			return res;
		}

		function yql(q) {
			return 'https://query.yahooapis.com/v1/yql?q=' + (q + ' limit @{limit|100} offset @{start|0}').replace(/\s/g, '%20') + '&format=json';
		}

	})(hello);

	// Register as anonymous AMD module
	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return hello;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	// CommonJS module for browserify
	if (typeof module === 'object' && module.exports) {
		module.exports = hello;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58), __webpack_require__(265).setImmediate))

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(58).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(265).setImmediate, __webpack_require__(265).clearImmediate))

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Google = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _social = __webpack_require__(263);

	var _enums = __webpack_require__(261);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Google = exports.Google = function (_Social) {
	  _inherits(Google, _Social);

	  function Google() {
	    _classCallCheck(this, Google);

	    return _possibleConstructorReturn(this, (Google.__proto__ || Object.getPrototypeOf(Google)).apply(this, arguments));
	  }

	  _createClass(Google, [{
	    key: 'identity',
	    get: function get() {
	      return _enums.SocialIdentity.Google;
	    }
	  }], [{
	    key: 'identity',
	    get: function get() {
	      return _enums.SocialIdentity.Google;
	    }
	  }]);

	  return Google;
	}(_social.Social);

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LinkedIn = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _social = __webpack_require__(263);

	var _enums = __webpack_require__(261);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LinkedIn = exports.LinkedIn = function (_Social) {
	  _inherits(LinkedIn, _Social);

	  function LinkedIn() {
	    _classCallCheck(this, LinkedIn);

	    return _possibleConstructorReturn(this, (LinkedIn.__proto__ || Object.getPrototypeOf(LinkedIn)).apply(this, arguments));
	  }

	  _createClass(LinkedIn, [{
	    key: 'identity',
	    get: function get() {
	      return _enums.SocialIdentity.LinkedIn;
	    }
	  }], [{
	    key: 'identity',
	    get: function get() {
	      return _enums.SocialIdentity.LinkedIn;
	    }
	  }]);

	  return LinkedIn;
	}(_social.Social);

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MobileIdentityConnect = exports.AuthorizationGrant = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _social = __webpack_require__(263);

	var _enums = __webpack_require__(261);

	var _request = __webpack_require__(236);

	var _errors = __webpack_require__(183);

	var _utils = __webpack_require__(185);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _path = __webpack_require__(269);

	var _path2 = _interopRequireDefault(_path);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	var _isString = __webpack_require__(234);

	var _isString2 = _interopRequireDefault(_isString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var authPathname = process && process.env && process.env.KINVEY_MIC_AUTH_PATHNAME || undefined || '/oauth/auth';
	var tokenPathname = process && process.env && process.env.KINVEY_MIC_TOKEN_PATHNAME || undefined || '/oauth/token';
	var invalidatePathname = process && process.env && process.env.KINVEY_MIC_INVALIDATE_PATHNAME || undefined || '/oauth/invalidate';

	var AuthorizationGrant = {
	  AuthorizationCodeLoginPage: 'AuthorizationCodeLoginPage',
	  AuthorizationCodeAPI: 'AuthorizationCodeAPI'
	};
	Object.freeze(AuthorizationGrant);
	exports.AuthorizationGrant = AuthorizationGrant;

	var MobileIdentityConnect = exports.MobileIdentityConnect = function (_Social) {
	  _inherits(MobileIdentityConnect, _Social);

	  function MobileIdentityConnect() {
	    _classCallCheck(this, MobileIdentityConnect);

	    return _possibleConstructorReturn(this, (MobileIdentityConnect.__proto__ || Object.getPrototypeOf(MobileIdentityConnect)).apply(this, arguments));
	  }

	  _createClass(MobileIdentityConnect, [{
	    key: 'login',
	    value: function login(redirectUri) {
	      var _this2 = this;

	      var authorizationGrant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : AuthorizationGrant.AuthorizationCodeLoginPage;
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var clientId = this.client.appKey;

	      var promise = _es6Promise2.default.resolve().then(function () {
	        if (authorizationGrant === AuthorizationGrant.AuthorizationCodeLoginPage) {
	          return _this2.requestCodeWithPopup(clientId, redirectUri, options);
	        } else if (authorizationGrant === AuthorizationGrant.AuthorizationCodeAPI) {
	          return _this2.requestTempLoginUrl(clientId, redirectUri, options).then(function (url) {
	            return _this2.requestCodeWithUrl(url, clientId, redirectUri, options);
	          });
	        }

	        throw new _errors.KinveyError('The authorization grant ' + authorizationGrant + ' is unsupported. ' + 'Please use a supported authorization grant.');
	      }).then(function (code) {
	        return _this2.requestToken(code, clientId, redirectUri, options);
	      }).then(function (session) {
	        session.client_id = clientId;
	        session.redirect_uri = redirectUri;
	        session.protocol = _this2.client.micProtocol;
	        session.host = _this2.client.micHost;
	        return session;
	      });

	      return promise;
	    }
	  }, {
	    key: 'requestTempLoginUrl',
	    value: function requestTempLoginUrl(clientId, redirectUri) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var pathname = '/';

	      if (options.version) {
	        var version = options.version;

	        if (!(0, _isString2.default)(version)) {
	          version = String(version);
	        }

	        pathname = _path2.default.join(pathname, version.indexOf('v') === 0 ? version : 'v' + version);
	      }

	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.POST,
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        url: _url2.default.format({
	          protocol: this.client.micProtocol,
	          host: this.client.micHost,
	          pathname: _path2.default.join(pathname, authPathname)
	        }),
	        properties: options.properties,
	        body: {
	          client_id: clientId,
	          redirect_uri: redirectUri,
	          response_type: 'code'
	        }
	      });
	      return request.execute().then(function (response) {
	        return response.data.temp_login_uri;
	      });
	    }
	  }, {
	    key: 'requestCodeWithPopup',
	    value: function requestCodeWithPopup(clientId, redirectUri) {
	      var _this3 = this;

	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var promise = _es6Promise2.default.resolve().then(function () {
	        var pathname = '/';

	        if (options.version) {
	          var version = options.version;

	          if (!(0, _isString2.default)(version)) {
	            version = String(version);
	          }

	          pathname = _path2.default.join(pathname, version.indexOf('v') === 0 ? version : 'v' + version);
	        }

	        if (_utils.Popup) {
	          var popup = new _utils.Popup();
	          return popup.open(_url2.default.format({
	            protocol: _this3.client.micProtocol,
	            host: _this3.client.micHost,
	            pathname: _path2.default.join(pathname, authPathname),
	            query: {
	              client_id: clientId,
	              redirect_uri: redirectUri,
	              response_type: 'code'
	            }
	          }));
	        }

	        throw new _errors.KinveyError('Popup is undefined.' + (' Unable to login using authorization grant ' + AuthorizationGrant.AuthorizationCodeLoginPage + '.'));
	      }).then(function (popup) {
	        var promise = new _es6Promise2.default(function (resolve, reject) {
	          var redirected = false;

	          function loadCallback(event) {
	            try {
	              if (event.url && event.url.indexOf(redirectUri) === 0 && redirected === false) {
	                redirected = true;
	                popup.removeAllListeners();
	                popup.close();
	                resolve(_url2.default.parse(event.url, true).query.code);
	              }
	            } catch (error) {}
	          }

	          function errorCallback(event) {
	            try {
	              if (event.url && event.url.indexOf(redirectUri) === 0 && redirected === false) {
	                redirected = true;
	                popup.removeAllListeners();
	                popup.close();
	                resolve(_url2.default.parse(event.url, true).query.code);
	              } else if (redirected === false) {
	                popup.removeAllListeners();
	                popup.close();
	                reject(new _errors.KinveyError(event.message, '', event.code));
	              }
	            } catch (error) {}
	          }

	          function closedCallback() {
	            if (redirected === false) {
	              popup.removeAllListeners();
	              reject(new _errors.KinveyError('Login has been cancelled.'));
	            }
	          }

	          popup.on('loadstart', loadCallback);
	          popup.on('loadstop', loadCallback);
	          popup.on('error', errorCallback);
	          popup.on('closed', closedCallback);
	        });
	        return promise;
	      });

	      return promise;
	    }
	  }, {
	    key: 'requestCodeWithUrl',
	    value: function requestCodeWithUrl(loginUrl, clientId, redirectUri) {
	      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	      var promise = _es6Promise2.default.resolve().then(function () {
	        var request = new _request.KinveyRequest({
	          method: _request.RequestMethod.POST,
	          headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	          },
	          url: loginUrl,
	          properties: options.properties,
	          body: {
	            client_id: clientId,
	            redirect_uri: redirectUri,
	            response_type: 'code',
	            username: options.username,
	            password: options.password
	          },
	          followRedirect: false
	        });
	        return request.execute();
	      }).then(function (response) {
	        var location = response.getHeader('location');

	        if (location) {
	          return _url2.default.parse(location, true).query.code;
	        }

	        throw new _errors.KinveyError('Unable to authorize user with username ' + options.username + '.', 'A location header was not provided with a code to exchange for an auth token.');
	      });

	      return promise;
	    }
	  }, {
	    key: 'requestToken',
	    value: function requestToken(code, clientId, redirectUri) {
	      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.POST,
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        authType: _request.AuthType.App,
	        url: _url2.default.format({
	          protocol: this.client.micProtocol,
	          host: this.client.micHost,
	          pathname: tokenPathname
	        }),
	        properties: options.properties,
	        body: {
	          grant_type: 'authorization_code',
	          client_id: clientId,
	          redirect_uri: redirectUri,
	          code: code
	        }
	      });
	      var promise = request.execute().then(function (response) {
	        return response.data;
	      });
	      return promise;
	    }
	  }, {
	    key: 'logout',
	    value: function logout(user) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.GET,
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        authType: _request.AuthType.App,
	        url: _url2.default.format({
	          protocol: this.client.micProtocol,
	          host: this.client.micHost,
	          pathname: invalidatePathname,
	          query: { user: user._id }
	        }),
	        properties: options.properties
	      });
	      return request.execute().then(function (response) {
	        return response.data;
	      });
	    }
	  }, {
	    key: 'identity',
	    get: function get() {
	      return _enums.SocialIdentity.MobileIdentityConnect;
	    }
	  }], [{
	    key: 'identity',
	    get: function get() {
	      return _enums.SocialIdentity.MobileIdentityConnect;
	    }
	  }]);

	  return MobileIdentityConnect;
	}(_social.Social);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Windows = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _social = __webpack_require__(263);

	var _enums = __webpack_require__(261);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Windows = exports.Windows = function (_Social) {
	  _inherits(Windows, _Social);

	  function Windows() {
	    _classCallCheck(this, Windows);

	    return _possibleConstructorReturn(this, (Windows.__proto__ || Object.getPrototypeOf(Windows)).apply(this, arguments));
	  }

	  _createClass(Windows, [{
	    key: 'identity',
	    get: function get() {
	      return _enums.SocialIdentity.Windows;
	    }
	  }], [{
	    key: 'identity',
	    get: function get() {
	      return _enums.SocialIdentity.Windows;
	    }
	  }]);

	  return Windows;
	}(_social.Social);

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	var getTag = __webpack_require__(139),
	    isArguments = __webpack_require__(128),
	    isArray = __webpack_require__(133),
	    isArrayLike = __webpack_require__(130),
	    isBuffer = __webpack_require__(272),
	    isPrototype = __webpack_require__(136),
	    nativeKeys = __webpack_require__(137);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if `value` is an empty object, collection, map, or set.
	 *
	 * Objects are considered empty if they have no own enumerable string keyed
	 * properties.
	 *
	 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	 * jQuery-like collections are considered empty if they have a `length` of `0`.
	 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (isArrayLike(value) &&
	      (isArray(value) || typeof value == 'string' ||
	        typeof value.splice == 'function' || isBuffer(value) || isArguments(value))) {
	    return !value.length;
	  }
	  var tag = getTag(value);
	  if (tag == mapTag || tag == setTag) {
	    return !value.size;
	  }
	  if (isPrototype(value)) {
	    return !nativeKeys(value).length;
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = isEmpty;


/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(92),
	    stubFalse = __webpack_require__(273);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(149)(module)))

/***/ },
/* 273 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Query = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _errors = __webpack_require__(183);

	var _utils = __webpack_require__(185);

	var _sift = __webpack_require__(275);

	var _sift2 = _interopRequireDefault(_sift);

	var _assign = __webpack_require__(220);

	var _assign2 = _interopRequireDefault(_assign);

	var _isArray = __webpack_require__(133);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _isNumber = __webpack_require__(249);

	var _isNumber2 = _interopRequireDefault(_isNumber);

	var _isString = __webpack_require__(234);

	var _isString2 = _interopRequireDefault(_isString);

	var _isObject = __webpack_require__(89);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _isRegExp = __webpack_require__(276);

	var _isRegExp2 = _interopRequireDefault(_isRegExp);

	var _isEmpty = __webpack_require__(271);

	var _isEmpty2 = _interopRequireDefault(_isEmpty);

	var _forEach = __webpack_require__(191);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _findKey = __webpack_require__(278);

	var _findKey2 = _interopRequireDefault(_findKey);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var unsupportedFilters = ['$nearSphere'];

	var Query = function () {
	  function Query(options) {
	    _classCallCheck(this, Query);

	    options = (0, _assign2.default)({
	      fields: [],
	      filter: {},
	      sort: {},
	      limit: null,
	      skip: 0
	    }, options);

	    this.fields = options.fields;

	    this.filter = options.filter;

	    this.sort = options.sort;

	    this.limit = options.limit;

	    this.skip = options.skip;

	    this._parent = null;
	  }

	  _createClass(Query, [{
	    key: 'isSupportedOffline',
	    value: function isSupportedOffline() {
	      var _this = this;

	      var supported = true;

	      (0, _forEach2.default)(unsupportedFilters, function (filter) {
	        supported = !(0, _findKey2.default)(_this.filter, filter);
	        return supported;
	      });

	      return supported;
	    }
	  }, {
	    key: 'equalTo',
	    value: function equalTo(field, value) {
	      return this.addFilter(field, value);
	    }
	  }, {
	    key: 'contains',
	    value: function contains(field, values) {
	      if (!(0, _isArray2.default)(values)) {
	        values = [values];
	      }

	      return this.addFilter(field, '$in', values);
	    }
	  }, {
	    key: 'containsAll',
	    value: function containsAll(field, values) {
	      if (!(0, _isArray2.default)(values)) {
	        values = [values];
	      }

	      return this.addFilter(field, '$all', values);
	    }
	  }, {
	    key: 'greaterThan',
	    value: function greaterThan(field, value) {
	      if (!(0, _isNumber2.default)(value) && !(0, _isString2.default)(value)) {
	        throw new _errors.QueryError('You must supply a number or string.');
	      }

	      return this.addFilter(field, '$gt', value);
	    }
	  }, {
	    key: 'greaterThanOrEqualTo',
	    value: function greaterThanOrEqualTo(field, value) {
	      if (!(0, _isNumber2.default)(value) && !(0, _isString2.default)(value)) {
	        throw new _errors.QueryError('You must supply a number or string.');
	      }

	      return this.addFilter(field, '$gte', value);
	    }
	  }, {
	    key: 'lessThan',
	    value: function lessThan(field, value) {
	      if (!(0, _isNumber2.default)(value) && !(0, _isString2.default)(value)) {
	        throw new _errors.QueryError('You must supply a number or string.');
	      }

	      return this.addFilter(field, '$lt', value);
	    }
	  }, {
	    key: 'lessThanOrEqualTo',
	    value: function lessThanOrEqualTo(field, value) {
	      if (!(0, _isNumber2.default)(value) && !(0, _isString2.default)(value)) {
	        throw new _errors.QueryError('You must supply a number or string.');
	      }

	      return this.addFilter(field, '$lte', value);
	    }
	  }, {
	    key: 'notEqualTo',
	    value: function notEqualTo(field, value) {
	      return this.addFilter(field, '$ne', value);
	    }
	  }, {
	    key: 'notContainedIn',
	    value: function notContainedIn(field, values) {
	      if (!(0, _isArray2.default)(values)) {
	        values = [values];
	      }

	      return this.addFilter(field, '$nin', values);
	    }
	  }, {
	    key: 'and',
	    value: function and() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return this.join('$and', args);
	    }
	  }, {
	    key: 'nor',
	    value: function nor() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      if (this._parent && this._parent.filter.$and) {
	        var _parent;

	        return (_parent = this._parent).nor.apply(_parent, args);
	      }

	      return this.join('$nor', args);
	    }
	  }, {
	    key: 'or',
	    value: function or() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      if (this._parent) {
	        var _parent2;

	        return (_parent2 = this._parent).or.apply(_parent2, args);
	      }

	      return this.join('$or', args);
	    }
	  }, {
	    key: 'exists',
	    value: function exists(field, flag) {
	      flag = typeof flag === 'undefined' ? true : flag || false;
	      return this.addFilter(field, '$exists', flag);
	    }
	  }, {
	    key: 'mod',
	    value: function mod(field, divisor) {
	      var remainder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	      if ((0, _isString2.default)(divisor)) {
	        divisor = parseFloat(divisor);
	      }

	      if ((0, _isString2.default)(remainder)) {
	        remainder = parseFloat(remainder);
	      }

	      if (!(0, _isNumber2.default)(divisor)) {
	        throw new _errors.QueryError('divisor must be a number');
	      }

	      if (!(0, _isNumber2.default)(remainder)) {
	        throw new _errors.QueryError('remainder must be a number');
	      }

	      return this.addFilter(field, '$mod', [divisor, remainder]);
	    }
	  }, {
	    key: 'matches',
	    value: function matches(field, regExp) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      if (!(0, _isRegExp2.default)(regExp)) {
	        regExp = new RegExp(regExp);
	      }

	      if ((regExp.ignoreCase || options.ignoreCase) && options.ignoreCase !== false) {
	        throw new _errors.QueryError('ignoreCase glag is not supported.');
	      }

	      if (regExp.source.indexOf('^') !== 0) {
	        throw new _errors.QueryError('regExp must have `^` at the beginning of the expression ' + 'to make it an anchored expression.');
	      }

	      var flags = [];

	      if ((regExp.multiline || options.multiline) && options.multiline !== false) {
	        flags.push('m');
	      }

	      if (options.extended) {
	        flags.push('x');
	      }

	      if (options.dotMatchesAll) {
	        flags.push('s');
	      }

	      var result = this.addFilter(field, '$regex', regExp.source);

	      if (flags.length) {
	        this.addFilter(field, '$options', flags.join(''));
	      }

	      return result;
	    }
	  }, {
	    key: 'near',
	    value: function near(field, coord, maxDistance) {
	      if (!(0, _isArray2.default)(coord) || !(0, _isNumber2.default)(coord[0]) || !(0, _isNumber2.default)(coord[1])) {
	        throw new _errors.QueryError('coord must be a [number, number]');
	      }

	      var result = this.addFilter(field, '$nearSphere', [coord[0], coord[1]]);

	      if (maxDistance) {
	        this.addFilter(field, '$maxDistance', maxDistance);
	      }

	      return result;
	    }
	  }, {
	    key: 'withinBox',
	    value: function withinBox(field, bottomLeftCoord, upperRightCoord) {
	      if (!(0, _isArray2.default)(bottomLeftCoord) || !bottomLeftCoord[0] || !bottomLeftCoord[1]) {
	        throw new _errors.QueryError('bottomLeftCoord must be a [number, number]');
	      }

	      if (!(0, _isArray2.default)(upperRightCoord) || !upperRightCoord[0] || !upperRightCoord[1]) {
	        throw new _errors.QueryError('upperRightCoord must be a [number, number]');
	      }

	      bottomLeftCoord[0] = parseFloat(bottomLeftCoord[0]);
	      bottomLeftCoord[1] = parseFloat(bottomLeftCoord[1]);
	      upperRightCoord[0] = parseFloat(upperRightCoord[0]);
	      upperRightCoord[1] = parseFloat(upperRightCoord[1]);

	      var coords = [[bottomLeftCoord[0], bottomLeftCoord[1]], [upperRightCoord[0], upperRightCoord[1]]];
	      return this.addFilter(field, '$within', { $box: coords });
	    }
	  }, {
	    key: 'withinPolygon',
	    value: function withinPolygon(field, coords) {
	      if (!(0, _isArray2.default)(coords) || coords.length > 3) {
	        throw new _errors.QueryError('coords must be [[number, number]]');
	      }

	      coords = coords.map(function (coord) {
	        if (!coord[0] || !coord[1]) {
	          throw new _errors.QueryError('coords argument must be [number, number]');
	        }

	        return [parseFloat(coord[0]), parseFloat(coord[1])];
	      });

	      return this.addFilter(field, '$within', { $polygon: coords });
	    }
	  }, {
	    key: 'size',
	    value: function size(field, _size) {
	      if ((0, _isString2.default)(_size)) {
	        _size = parseFloat(_size);
	      }

	      if (!(0, _isNumber2.default)(_size)) {
	        throw new _errors.QueryError('size must be a number');
	      }

	      return this.addFilter(field, '$size', _size);
	    }
	  }, {
	    key: 'ascending',
	    value: function ascending(field) {
	      if (this._parent) {
	        this._parent.ascending(field);
	      } else {
	        this.sort[field] = 1;
	      }

	      return this;
	    }
	  }, {
	    key: 'descending',
	    value: function descending(field) {
	      if (this._parent) {
	        this._parent.descending(field);
	      } else {
	        this.sort[field] = -1;
	      }

	      return this;
	    }
	  }, {
	    key: 'addFilter',
	    value: function addFilter(field, condition, values) {
	      if (!(0, _isObject2.default)(this.filter[field])) {
	        this.filter[field] = {};
	      }

	      if (condition && values) {
	        this.filter[field][condition] = values;
	      } else {
	        this.filter[field] = condition;
	      }

	      return this;
	    }
	  }, {
	    key: 'join',
	    value: function join(operator, queries) {
	      var _this2 = this;

	      var that = this;
	      var currentQuery = {};

	      queries = queries.map(function (query) {
	        if (!(query instanceof Query)) {
	          if ((0, _isObject2.default)(query)) {
	            query = new Query(query);
	          } else {
	            throw new _errors.QueryError('query argument must be of type: Kinvey.Query[] or Object[].');
	          }
	        }

	        return query.toJSON().filter;
	      });

	      if (queries.length === 0) {
	        that = new Query();
	        queries = [that.toJSON().filter];
	        that.parent = this;
	      }

	      var members = Object.keys(this.filter);
	      (0, _forEach2.default)(members, function (member) {
	        currentQuery[member] = _this2.filter[member];
	        delete _this2.filter[member];
	      });

	      this.filter[operator] = [currentQuery].concat(queries);

	      return that;
	    }
	  }, {
	    key: 'process',
	    value: function process(data) {
	      var _this3 = this;

	      if (this.isSupportedOffline() === false) {
	        (function () {
	          var message = 'This query is not able to run locally. The following filters are not supported' + ' locally:';

	          (0, _forEach2.default)(unsupportedFilters, function (filter) {
	            message = message + ' ' + filter;
	          });

	          throw new _errors.QueryError(message);
	        })();
	      }

	      if (data) {
	        var _ret2 = function () {
	          if (!(0, _isArray2.default)(data)) {
	            throw new _errors.QueryError('data argument must be of type: Array.');
	          }

	          var json = _this3.toJSON();
	          data = (0, _sift2.default)(json.filter, data);

	          if (json.fields && json.fields.length > 0) {
	            data = data.map(function (item) {
	              var keys = Object.keys(item);
	              (0, _forEach2.default)(keys, function (key) {
	                if (json.fields.indexOf(key) === -1) {
	                  delete item[key];
	                }
	              });

	              return item;
	            });
	          }

	          data = data.sort(function (a, b) {
	            var fields = Object.keys(json.sort);
	            (0, _forEach2.default)(fields, function (field) {
	              var aField = (0, _utils.nested)(a, field);
	              var bField = (0, _utils.nested)(b, field);

	              if (aField && !bField) {
	                return -1;
	              }

	              if (bField && !aField) {
	                return 1;
	              }

	              if (aField !== bField) {
	                var modifier = json.sort[field];
	                return (aField < bField ? -1 : 1) * modifier;
	              }

	              return 0;
	            });

	            return 0;
	          });

	          if (json.limit) {
	            return {
	              v: data.slice(json.skip, json.skip + json.limit)
	            };
	          }

	          return {
	            v: data.slice(json.skip)
	          };
	        }();

	        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	      }

	      return data;
	    }
	  }, {
	    key: 'toPlainObject',
	    value: function toPlainObject() {
	      if (this._parent) {
	        return this._parent.toPlainObject();
	      }

	      var json = {
	        fields: this.fields,
	        filter: this.filter,
	        sort: this.sort,
	        skip: this.skip,
	        limit: this.limit
	      };

	      return json;
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      return this.toPlainObject();
	    }
	  }, {
	    key: 'toQueryString',
	    value: function toQueryString() {
	      var queryString = {};

	      if (!(0, _isEmpty2.default)(this.filter)) {
	        queryString.query = this.filter;
	      }

	      if (!(0, _isEmpty2.default)(this.fields)) {
	        queryString.fields = this.fields.join(',');
	      }

	      if (this.limit) {
	        queryString.limit = this.limit;
	      }

	      if (this.skip > 0) {
	        queryString.skip = this.skip;
	      }

	      if (!(0, _isEmpty2.default)(this.sort)) {
	        queryString.sort = this.sort;
	      }

	      var keys = Object.keys(queryString);
	      (0, _forEach2.default)(keys, function (key) {
	        queryString[key] = (0, _isString2.default)(queryString[key]) ? queryString[key] : JSON.stringify(queryString[key]);
	      });

	      return queryString;
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return JSON.stringify(this.toQueryString());
	    }
	  }, {
	    key: 'fields',
	    get: function get() {
	      return this._fields;
	    },
	    set: function set(fields) {
	      fields = fields || [];

	      if (!(0, _isArray2.default)(fields)) {
	        throw new _errors.QueryError('fields must be an Array');
	      }

	      if (this._parent) {
	        this._parent.fields = fields;
	      } else {
	        this._fields = fields;
	      }
	    }
	  }, {
	    key: 'filter',
	    get: function get() {
	      return this._filter;
	    },
	    set: function set(filter) {
	      this._filter = filter;
	    }
	  }, {
	    key: 'sort',
	    get: function get() {
	      return this._sort;
	    },
	    set: function set(sort) {
	      if (sort && !(0, _isObject2.default)(sort)) {
	        throw new _errors.QueryError('sort must an Object');
	      }

	      if (this._parent) {
	        this._parent.sort(sort);
	      } else {
	        this._sort = sort || {};
	      }
	    }
	  }, {
	    key: 'limit',
	    get: function get() {
	      return this._limit;
	    },
	    set: function set(limit) {
	      if ((0, _isString2.default)(limit)) {
	        limit = parseFloat(limit);
	      }

	      if (limit && !(0, _isNumber2.default)(limit)) {
	        throw new _errors.QueryError('limit must be a number');
	      }

	      if (this._parent) {
	        this._parent.limit = limit;
	      } else {
	        this._limit = limit;
	      }
	    }
	  }, {
	    key: 'skip',
	    get: function get() {
	      return this._skip;
	    },
	    set: function set() {
	      var skip = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      if ((0, _isString2.default)(skip)) {
	        skip = parseFloat(skip);
	      }

	      if (!(0, _isNumber2.default)(skip)) {
	        throw new _errors.QueryError('skip must be a number');
	      }

	      if (this._parent) {
	        this._parent.skip(skip);
	      } else {
	        this._skip = skip;
	      }
	    }
	  }]);

	  return Query;
	}();

	exports.Query = Query;

/***/ },
/* 275 */
/***/ function(module, exports) {

	/*
	 * Sift 3.x
	 *
	 * Copryright 2015, Craig Condon
	 * Licensed under MIT
	 *
	 * Filter JavaScript objects with mongodb queries
	 */

	(function() {

	  'use strict';

	  /**
	   */

	  function isFunction(value) {
	    return typeof value === 'function';
	  }

	  /**
	   */

	  function isArray(value) {
	    return Object.prototype.toString.call(value) === '[object Array]';
	  }

	  /**
	   */

	  function comparable(value) {
	    if (value instanceof Date) {
	      return value.getTime();
	    } else if (value instanceof Array) {
	      return value.map(comparable);
	    } else {
	      return value;
	    }
	  }

	  function get(obj, key) {
	    if (obj.get) return obj.get(key);
	    return obj[key];
	  }

	  /**
	   */

	  function or(validator) {
	    return function(a, b) {
	      if (!isArray(b) || !b.length) return validator(a, b);
	      for (var i = 0, n = b.length; i < n; i++) if (validator(a, get(b,i))) return true;
	      return false;
	    }
	  }

	  /**
	   */

	  function and(validator) {
	    return function(a, b) {
	      if (!isArray(b) || !b.length) return validator(a, b);
	      for (var i = 0, n = b.length; i < n; i++) if (!validator(a, get(b, i))) return false;
	      return true;
	    };
	  }

	  function validate(validator, b) {
	    return validator.v(validator.a, b);
	  }


	  var operator = {

	    /**
	     */

	    $eq: or(function(a, b) {
	      return a(b);
	    }),

	    /**
	     */

	    $ne: and(function(a, b) {
	      return !a(b);
	    }),

	    /**
	     */

	    $or: function(a, b) {
	      for (var i = 0, n = a.length; i < n; i++) if (validate(get(a, i), b)) return true;
	      return false;
	    },

	    /**
	     */

	    $gt: or(function(a, b) {
	      return sift.compare(comparable(b), a) > 0;
	    }),

	    /**
	     */

	    $gte: or(function(a, b) {
	      return sift.compare(comparable(b), a) >= 0;
	    }),

	    /**
	     */

	    $lt: or(function(a, b) {
	      return sift.compare(comparable(b), a) < 0;
	    }),

	    /**
	     */

	    $lte: or(function(a, b) {
	      return sift.compare(comparable(b), a) <= 0;
	    }),

	    /**
	     */

	    $mod: or(function(a, b) {
	      return b % a[0] == a[1];
	    }),

	    /**
	     */

	    $in: function(a, b) {

	      if (b instanceof Array) {
	        for (var i = b.length; i--;) {
	          if (~a.indexOf(comparable(get(b, i)))) return true;
	        }
	      } else {
	        return !!~a.indexOf(comparable(b));
	      }

	      return false;
	    },

	    /**
	     */

	    $nin: function(a, b) {
	      return !operator.$in(a, b);
	    },

	    /**
	     */

	    $not: function(a, b) {
	      return !validate(a, b);
	    },

	    /**
	     */

	    $type: function(a, b) {
	      return b != void 0 ? b instanceof a || b.constructor == a : false;
	     },

	    /**
	     */

	    $all: function(a, b) {
	      if (!b) b = [];
	      for (var i = a.length; i--;) {
	        if (!~comparable(b).indexOf(get(a, i))) return false;
	      }
	      return true;
	    },

	    /**
	     */

	    $size: function(a, b) {
	      return b ? a === b.length : false;
	    },

	    /**
	     */

	    $nor: function(a, b) {
	      // todo - this suffice? return !operator.$in(a)
	      for (var i = 0, n = a.length; i < n; i++) if (validate(get(a, i), b)) return false;
	      return true;
	    },

	    /**
	     */

	    $and: function(a, b) {
	      for (var i = 0, n = a.length; i < n; i++) if (!validate(get(a, i), b)) return false;
	      return true;
	    },

	    /**
	     */

	    $regex: or(function(a, b) {
	      return typeof b === 'string' && a.test(b);
	    }),

	    /**
	     */

	    $where: function(a, b) {
	      return a.call(b, b);
	    },

	    /**
	     */

	    $elemMatch: function(a, b) {
	      if (isArray(b)) return !!~search(b, a);
	      return validate(a, b);
	    },

	    /**
	     */

	    $exists: function(a, b) {
	      return (b != void 0) === a;
	    }
	  };

	  /**
	   */

	  var prepare = {

	    /**
	     */

	    $eq: function(a) {

	      if (a instanceof RegExp) {
	        return function(b) {
	          return typeof b === 'string' && a.test(b);
	        };
	      } else if (a instanceof Function) {
	        return a;
	      } else if (isArray(a) && !a.length) {
	        // Special case of a == []
	        return function(b) {
	          return (isArray(b) && !b.length);
	        };
	      } else if (a === null){
	        return function(b){
	          //will match both null and undefined
	          return b == null;
	        }
	      }

	      return function(b) {
	        return sift.compare(comparable(b), a) === 0;
	      };
	    },

	    /**
	     */

	    $ne: function(a) {
	      return prepare.$eq(a);
	    },

	    /**
	     */

	    $and: function(a) {
	      return a.map(parse);
	    },

	    /**
	     */

	    $or: function(a) {
	      return a.map(parse);
	    },

	    /**
	     */

	    $nor: function(a) {
	      return a.map(parse);
	    },

	    /**
	     */

	    $not: function(a) {
	      return parse(a);
	    },

	    /**
	     */

	    $regex: function(a, query) {
	      return new RegExp(a, query.$options);
	    },

	    /**
	     */

	    $where: function(a) {
	      return typeof a === 'string' ? new Function('obj', 'return ' + a) : a;
	    },

	    /**
	     */

	    $elemMatch: function(a) {
	      return parse(a);
	    },

	    /**
	     */

	    $exists: function(a) {
	      return !!a;
	    }
	  };

	  /**
	   */

	  function search(array, validator) {

	    for (var i = 0; i < array.length; i++) {
	      if (validate(validator, get(array, i))) {
	        return i;
	      }
	    }

	    return -1;
	  }

	  /**
	   */

	  function createValidator(a, validate) {
	    return { a: a, v: validate };
	  }

	  /**
	   */

	  function nestedValidator(a, b) {
	    var values  = [];
	    findValues(b, a.k, 0, values);

	    if (values.length === 1) {
	      return validate(a.nv, values[0]);
	    }

	    return !!~search(values, a.nv);
	  }

	  /**
	   */

	  function findValues(current, keypath, index, values) {

	    if (index === keypath.length || current == void 0) {
	      values.push(current);
	      return;
	    }

	    var k = get(keypath, index);

	    // ensure that if current is an array, that the current key
	    // is NOT an array index. This sort of thing needs to work:
	    // sift({'foo.0':42}, [{foo: [42]}]);
	    if (isArray(current) && isNaN(Number(k))) {
	      for (var i = 0, n = current.length; i < n; i++) {
	        findValues(get(current, i), keypath, index, values);
	      }
	    } else {
	      findValues(get(current, k), keypath, index + 1, values);
	    }
	  }

	  /**
	   */

	  function createNestedValidator(keypath, a) {
	    return { a: { k: keypath, nv: a }, v: nestedValidator };
	  }

	  /**
	   * flatten the query
	   */

	  function parse(query) {
	    query = comparable(query);

	    if (!query || (query.constructor.toString() !== 'Object' &&
	        query.constructor.toString().replace(/\n/g,'').replace(/ /g, '') !== 'functionObject(){[nativecode]}')) { // cross browser support
	      query = { $eq: query };
	    }

	    var validators = [];

	    for (var key in query) {
	      var a = query[key];

	      if (key === '$options') continue;

	      if (operator[key]) {
	        if (prepare[key]) a = prepare[key](a, query);
	        validators.push(createValidator(comparable(a), operator[key]));
	      } else {

	        if (key.charCodeAt(0) === 36) {
	          throw new Error('Unknown operation ' + key);
	        }

	        validators.push(createNestedValidator(key.split('.'), parse(a)));
	      }
	    }

	    return validators.length === 1 ? validators[0] : createValidator(validators, operator.$and);
	  }

	  /**
	   */

	  function createRootValidator(query, getter) {
	    var validator = parse(query);
	    if (getter) {
	      validator = {
	        a: validator,
	        v: function(a, b) {
	          return validate(a, getter(b));
	        }
	      };
	    }
	    return validator;
	  }

	  /**
	   */

	  function sift(query, array, getter) {

	    if (isFunction(array)) {
	      getter = array;
	      array  = void 0;
	    }

	    var validator = createRootValidator(query, getter);

	    function filter(b) {
	      return validate(validator, b);
	    }

	    if (array) {
	      return array.filter(filter);
	    }

	    return filter;
	  }

	  /**
	   */

	  sift.use = function(plugin) {
	    if (isFunction(plugin)) return plugin(sift);
	    for (var key in plugin) {
	      if (key.charCodeAt(0) === 36) operator[key] = plugin[key];
	    }
	  };

	  /**
	   */

	  sift.indexOf = function(query, array, getter) {
	    return search(array, createRootValidator(query, getter));
	  };

	  /**
	   */

	  sift.compare = function(a, b) {
	    if(a===b) return 0;
	    if(typeof a === typeof b) {
	      if (a > b) return 1;
	      if (a < b) return -1;
	    }
	  };

	  /* istanbul ignore next */
	  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	    module.exports = sift;
	  }

	  if (typeof window !== 'undefined') {
	    window.sift = sift;
	  }
	})();


/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsRegExp = __webpack_require__(277),
	    baseUnary = __webpack_require__(147),
	    nodeUtil = __webpack_require__(148);

	/* Node.js helper references. */
	var nodeIsRegExp = nodeUtil && nodeUtil.isRegExp;

	/**
	 * Checks if `value` is classified as a `RegExp` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
	 * @example
	 *
	 * _.isRegExp(/abc/);
	 * // => true
	 *
	 * _.isRegExp('/abc/');
	 * // => false
	 */
	var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

	module.exports = isRegExp;


/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(89);

	/** `Object#toString` result references. */
	var regexpTag = '[object RegExp]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isRegExp` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
	 */
	function baseIsRegExp(value) {
	  return isObject(value) && objectToString.call(value) == regexpTag;
	}

	module.exports = baseIsRegExp;


/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindKey = __webpack_require__(279),
	    baseForOwn = __webpack_require__(178),
	    baseIteratee = __webpack_require__(68);

	/**
	 * This method is like `_.find` except that it returns the key of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.1.0
	 * @category Object
	 * @param {Object} object The object to inspect.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {string|undefined} Returns the key of the matched element,
	 *  else `undefined`.
	 * @example
	 *
	 * var users = {
	 *   'barney':  { 'age': 36, 'active': true },
	 *   'fred':    { 'age': 40, 'active': false },
	 *   'pebbles': { 'age': 1,  'active': true }
	 * };
	 *
	 * _.findKey(users, function(o) { return o.age < 40; });
	 * // => 'barney' (iteration order is not guaranteed)
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findKey(users, { 'age': 1, 'active': true });
	 * // => 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findKey(users, ['active', false]);
	 * // => 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findKey(users, 'active');
	 * // => 'barney'
	 */
	function findKey(object, predicate) {
	  return baseFindKey(object, baseIteratee(predicate, 3), baseForOwn);
	}

	module.exports = findKey;


/***/ },
/* 279 */
/***/ function(module, exports) {

	/**
	 * The base implementation of methods like `_.findKey` and `_.findLastKey`,
	 * without support for iteratee shorthands, which iterates over `collection`
	 * using `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @returns {*} Returns the found element or its key, else `undefined`.
	 */
	function baseFindKey(collection, predicate, eachFunc) {
	  var result;
	  eachFunc(collection, function(value, key, collection) {
	    if (predicate(value, key, collection)) {
	      result = key;
	      return false;
	    }
	  });
	  return result;
	}

	module.exports = baseFindKey;


/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(222),
	    createAggregator = __webpack_require__(281);

	/**
	 * Creates an object composed of keys generated from the results of running
	 * each element of `collection` thru `iteratee`. The corresponding value of
	 * each key is the last element responsible for generating the key. The
	 * iteratee is invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity]
	 *  The iteratee to transform keys.
	 * @returns {Object} Returns the composed aggregate object.
	 * @example
	 *
	 * var array = [
	 *   { 'dir': 'left', 'code': 97 },
	 *   { 'dir': 'right', 'code': 100 }
	 * ];
	 *
	 * _.keyBy(array, function(o) {
	 *   return String.fromCharCode(o.code);
	 * });
	 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	 *
	 * _.keyBy(array, 'dir');
	 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
	 */
	var keyBy = createAggregator(function(result, value, key) {
	  baseAssignValue(result, key, value);
	});

	module.exports = keyBy;


/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	var arrayAggregator = __webpack_require__(282),
	    baseAggregator = __webpack_require__(283),
	    baseIteratee = __webpack_require__(68),
	    isArray = __webpack_require__(133);

	/**
	 * Creates a function like `_.groupBy`.
	 *
	 * @private
	 * @param {Function} setter The function to set accumulator values.
	 * @param {Function} [initializer] The accumulator object initializer.
	 * @returns {Function} Returns the new aggregator function.
	 */
	function createAggregator(setter, initializer) {
	  return function(collection, iteratee) {
	    var func = isArray(collection) ? arrayAggregator : baseAggregator,
	        accumulator = initializer ? initializer() : {};

	    return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
	  };
	}

	module.exports = createAggregator;


/***/ },
/* 282 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `baseAggregator` for arrays.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} setter The function to set `accumulator` values.
	 * @param {Function} iteratee The iteratee to transform keys.
	 * @param {Object} accumulator The initial aggregated object.
	 * @returns {Function} Returns `accumulator`.
	 */
	function arrayAggregator(array, setter, iteratee, accumulator) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    var value = array[index];
	    setter(accumulator, value, iteratee(value), array);
	  }
	  return accumulator;
	}

	module.exports = arrayAggregator;


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(177);

	/**
	 * Aggregates elements of `collection` on `accumulator` with keys transformed
	 * by `iteratee` and values set by `setter`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} setter The function to set `accumulator` values.
	 * @param {Function} iteratee The iteratee to transform keys.
	 * @param {Object} accumulator The initial aggregated object.
	 * @returns {Function} Returns `accumulator`.
	 */
	function baseAggregator(collection, setter, iteratee, accumulator) {
	  baseEach(collection, function(value, key, collection) {
	    setter(accumulator, value, iteratee(value), collection);
	  });
	  return accumulator;
	}

	module.exports = baseAggregator;


/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(156),
	    isFunction = __webpack_require__(88),
	    isKey = __webpack_require__(163),
	    toKey = __webpack_require__(164);

	/**
	 * This method is like `_.get` except that if the resolved value is a
	 * function it's invoked with the `this` binding of its parent object and
	 * its result is returned.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to resolve.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	 *
	 * _.result(object, 'a[0].b.c1');
	 * // => 3
	 *
	 * _.result(object, 'a[0].b.c2');
	 * // => 4
	 *
	 * _.result(object, 'a[0].b.c3', 'default');
	 * // => 'default'
	 *
	 * _.result(object, 'a[0].b.c3', _.constant('default'));
	 * // => 'default'
	 */
	function result(object, path, defaultValue) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = -1,
	      length = path.length;

	  // Ensure the loop is entered when path is empty.
	  if (!length) {
	    object = undefined;
	    length = 1;
	  }
	  while (++index < length) {
	    var value = object == null ? undefined : object[toKey(path[index])];
	    if (value === undefined) {
	      index = length;
	      value = defaultValue;
	    }
	    object = isFunction(value) ? value.call(object) : value;
	  }
	  return object;
	}

	module.exports = result;


/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(286),
	    keys = __webpack_require__(125);

	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object ? baseValues(object, keys(object)) : [];
	}

	module.exports = values;


/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(287);

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	module.exports = baseValues;


/***/ },
/* 287 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Aggregation = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _result = __webpack_require__(284);

	var _result2 = _interopRequireDefault(_result);

	var _assign = __webpack_require__(220);

	var _assign2 = _interopRequireDefault(_assign);

	var _forEach = __webpack_require__(191);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _isString = __webpack_require__(234);

	var _isString2 = _interopRequireDefault(_isString);

	var _isObject = __webpack_require__(89);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _isFunction = __webpack_require__(88);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	var _errors = __webpack_require__(183);

	var _query = __webpack_require__(274);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Aggregation = exports.Aggregation = function () {
	  function Aggregation(options) {
	    _classCallCheck(this, Aggregation);

	    options = (0, _assign2.default)({
	      query: null,
	      initial: {},
	      key: {},
	      reduceFn: function () {}.toString()
	    }, options);

	    this.query = options.query;
	    this.initial = options.initial;
	    this.key = options.key;
	    this.reduceFn = options.reduceFn;
	  }

	  _createClass(Aggregation, [{
	    key: 'by',
	    value: function by(field) {
	      this.key[field] = true;
	      return this;
	    }
	  }, {
	    key: 'process',
	    value: function process() {
	      var entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      var groups = {};
	      var response = [];
	      var aggregation = this.toJSON();
	      var reduceFn = aggregation.reduceFn.replace(/function[\s\S]*?\([\s\S]*?\)/, '');
	      aggregation.reduce = new Function(['doc', 'out'], reduceFn);

	      if (this.query) {
	        entities = this.query.process(entities);
	      }

	      (0, _forEach2.default)(entities, function (entity) {
	        var group = {};
	        var entityNames = Object.keys(entity);

	        (0, _forEach2.default)(entityNames, function (name) {
	          group[name] = entity[name];
	        });

	        var key = JSON.stringify(group);
	        if (!groups[key]) {
	          groups[key] = group;
	          var attributes = Object.keys(aggregation.initial);

	          (0, _forEach2.default)(attributes, function (attr) {
	            groups[key][attr] = aggregation.initial[attr];
	          });
	        }

	        aggregation.reduce(entity, groups[key]);
	      });

	      var segments = Object.keys(groups);
	      (0, _forEach2.default)(segments, function (segment) {
	        response.push(groups[segment]);
	      });

	      return response;
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      var json = {
	        key: this.key,
	        initial: this.initial,
	        reduceFn: this.reduceFn,
	        condition: this.query ? this.query.toJSON().filter : {},
	        query: this.query ? this.query.toJSON() : null
	      };

	      return json;
	    }
	  }, {
	    key: 'initial',
	    get: function get() {
	      return this.aggregationInitial;
	    },
	    set: function set(initial) {
	      if (!(0, _isObject2.default)(initial)) {
	        throw new _errors.KinveyError('initial must be an Object.');
	      }

	      this.aggregationInitial = initial;
	    }
	  }, {
	    key: 'query',
	    get: function get() {
	      return this.aggregationQuery;
	    },
	    set: function set(query) {
	      if (query && !(query instanceof _query.Query)) {
	        query = new _query.Query((0, _result2.default)(query, 'toJSON', query));
	      }

	      this.aggregationQuery = query;
	    }
	  }, {
	    key: 'reduceFn',
	    get: function get() {
	      return this.aggregationReduceFn;
	    },
	    set: function set(fn) {
	      if ((0, _isFunction2.default)(fn)) {
	        fn = fn.toString();
	      }

	      if (!(0, _isString2.default)(fn)) {
	        throw new _errors.KinveyError('fn argument must be of type function or string.');
	      }

	      this.aggregationReduceFn = fn;
	    }
	  }], [{
	    key: 'count',
	    value: function count() {
	      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      var aggregation = new Aggregation();

	      if (field) {
	        aggregation.by(field);
	      }

	      aggregation.initial = { result: 0 };
	      aggregation.reduceFn = function (doc, out) {
	        out.result += 1;
	        return out;
	      };
	      return aggregation;
	    }
	  }, {
	    key: 'sum',
	    value: function sum() {
	      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      field = field.replace('\'', '\\\'');

	      var aggregation = new Aggregation();
	      aggregation.initial = { result: 0 };
	      aggregation.reduceFn = function (doc, out) {
	        out.result += doc['\'' + field + '\''];
	      };
	      return aggregation;
	    }
	  }, {
	    key: 'min',
	    value: function min() {
	      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      field = field.replace('\'', '\\\'');

	      var aggregation = new Aggregation();
	      aggregation.initial = { result: Infinity };
	      aggregation.reduceFn = function (doc, out) {
	        out.result = Math.min(out.result, doc['\'' + field + '\'']);
	      };
	      return aggregation;
	    }
	  }, {
	    key: 'max',
	    value: function max() {
	      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      field = field.replace('\'', '\\\'');

	      var aggregation = new Aggregation();
	      aggregation.initial = { result: -Infinity };
	      aggregation.reduceFn = function (doc, out) {
	        out.result = Math.max(out.result, doc['\'' + field + '\'']);
	      };
	      return aggregation;
	    }
	  }, {
	    key: 'average',
	    value: function average() {
	      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      field = field.replace('\'', '\\\'');

	      var aggregation = new Aggregation();
	      aggregation.initial = { count: 0, result: 0 };
	      aggregation.reduceFn = function (doc, out) {
	        out.result = (out.result * out.count + doc['\'' + field + '\'']) / (out.count + 1);
	        out.count += 1;
	      };
	      return aggregation;
	    }
	  }]);

	  return Aggregation;
	}();

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cachestore = __webpack_require__(290);

	Object.keys(_cachestore).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _cachestore[key];
	    }
	  });
	});

	var _datastore = __webpack_require__(341);

	Object.keys(_datastore).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _datastore[key];
	    }
	  });
	});

	var _filestore = __webpack_require__(343);

	Object.keys(_filestore).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _filestore[key];
	    }
	  });
	});

	var _networkstore = __webpack_require__(291);

	Object.keys(_networkstore).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _networkstore[key];
	    }
	  });
	});

	var _sync = __webpack_require__(294);

	Object.keys(_sync).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _sync[key];
	    }
	  });
	});

	var _syncstore = __webpack_require__(342);

	Object.keys(_syncstore).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _syncstore[key];
	    }
	  });
	});

	var _userstore = __webpack_require__(344);

	Object.keys(_userstore).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _userstore[key];
	    }
	  });
	});

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CacheStore = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _networkstore = __webpack_require__(291);

	var _request = __webpack_require__(236);

	var _errors = __webpack_require__(183);

	var _query3 = __webpack_require__(274);

	var _sync = __webpack_require__(294);

	var _entity = __webpack_require__(295);

	var _utils = __webpack_require__(185);

	var _differenceBy = __webpack_require__(323);

	var _differenceBy2 = _interopRequireDefault(_differenceBy);

	var _assign = __webpack_require__(220);

	var _assign2 = _interopRequireDefault(_assign);

	var _keyBy = __webpack_require__(280);

	var _keyBy2 = _interopRequireDefault(_keyBy);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	var _filter = __webpack_require__(333);

	var _filter2 = _interopRequireDefault(_filter);

	var _map = __webpack_require__(292);

	var _map2 = _interopRequireDefault(_map);

	var _xorWith = __webpack_require__(336);

	var _xorWith2 = _interopRequireDefault(_xorWith);

	var _isArray = __webpack_require__(133);

	var _isArray2 = _interopRequireDefault(_isArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var idAttribute = process && process.env && process.env.KINVEY_ID_ATTRIBUTE || undefined || '_id';

	var CacheStore = exports.CacheStore = function (_NetworkStore) {
	  _inherits(CacheStore, _NetworkStore);

	  function CacheStore(collection) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, CacheStore);

	    var _this = _possibleConstructorReturn(this, (CacheStore.__proto__ || Object.getPrototypeOf(CacheStore)).call(this, collection, options));

	    _this.ttl = options.ttl || undefined;

	    _this.syncManager = new _sync.SyncManager(_this.collection, options);
	    return _this;
	  }

	  _createClass(CacheStore, [{
	    key: 'find',
	    value: function find(query) {
	      var _this2 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      options = (0, _assign2.default)({ syncAutomatically: this.syncAutomatically }, options);
	      var syncAutomatically = options.syncAutomatically === true;
	      var stream = _utils.KinveyObservable.create(function (observer) {
	        if (query && !(query instanceof _query3.Query)) {
	          return observer.error(new _errors.KinveyError('Invalid query. It must be an instance of the Query class.'));
	        }

	        var request = new _request.CacheRequest({
	          method: _request.RequestMethod.GET,
	          url: _url2.default.format({
	            protocol: _this2.client.protocol,
	            host: _this2.client.host,
	            pathname: _this2.pathname,
	            query: options.query
	          }),
	          properties: options.properties,
	          query: query,
	          timeout: options.timeout
	        });

	        return request.execute().then(function (response) {
	          return response.data;
	        }).catch(function () {
	          return [];
	        }).then(function () {
	          var cacheEntities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	          observer.next(cacheEntities);

	          if (syncAutomatically === true) {
	            return _this2.pendingSyncCount(null, options).then(function (syncCount) {
	              if (syncCount > 0) {
	                return _this2.push(null, options).then(function () {
	                  return _this2.pendingSyncCount(null, options);
	                });
	              }

	              return syncCount;
	            }).then(function (syncCount) {
	              if (syncCount > 0) {
	                throw new _errors.KinveyError('Unable to load data from the network.' + (' There are ' + syncCount + ' entities that need') + ' to be synced before data is loaded from the network.');
	              }

	              return _get(CacheStore.prototype.__proto__ || Object.getPrototypeOf(CacheStore.prototype), 'find', _this2).call(_this2, query, options).toPromise();
	            }).then(function (networkEntities) {
	              var removedEntities = (0, _differenceBy2.default)(cacheEntities, networkEntities, idAttribute);
	              var removedIds = Object.keys((0, _keyBy2.default)(removedEntities, idAttribute));
	              var removeQuery = new _query3.Query().contains(idAttribute, removedIds);
	              return _this2.clear(removeQuery, options).then(function () {
	                return networkEntities;
	              });
	            }).then(function (networkEntities) {
	              var request = new _request.CacheRequest({
	                method: _request.RequestMethod.PUT,
	                url: _url2.default.format({
	                  protocol: _this2.client.protocol,
	                  host: _this2.client.host,
	                  pathname: _this2.pathname,
	                  query: options.query
	                }),
	                properties: options.properties,
	                body: networkEntities,
	                timeout: options.timeout
	              });
	              return request.execute();
	            });
	          }

	          return cacheEntities;
	        }).then(function (entities) {
	          return observer.next(entities);
	        }).then(function () {
	          return observer.complete();
	        }).catch(function (error) {
	          return observer.error(error);
	        });
	      });

	      return stream;
	    }
	  }, {
	    key: 'findById',
	    value: function findById(id) {
	      var _this3 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      options = (0, _assign2.default)({ syncAutomatically: this.syncAutomatically }, options);
	      var syncAutomatically = options.syncAutomatically === true;
	      var stream = _utils.KinveyObservable.create(function (observer) {
	        if (!id) {
	          observer.next(undefined);
	          return observer.complete();
	        }

	        var request = new _request.CacheRequest({
	          method: _request.RequestMethod.GET,
	          url: _url2.default.format({
	            protocol: _this3.client.protocol,
	            host: _this3.client.host,
	            pathname: _this3.pathname + '/' + id,
	            query: options.query
	          }),
	          properties: options.properties,
	          timeout: options.timeout
	        });
	        return request.execute().then(function (response) {
	          return response.data;
	        }).catch(function () {
	          return undefined;
	        }).then(function (cacheEntity) {
	          observer.next(cacheEntity);

	          if (syncAutomatically === true) {
	            return _this3.pendingSyncCount(null, options).then(function (syncCount) {
	              if (syncCount > 0) {
	                return _this3.push(null, options).then(function () {
	                  return _this3.pendingSyncCount(null, options);
	                });
	              }

	              return syncCount;
	            }).then(function (syncCount) {
	              if (syncCount > 0) {
	                throw new _errors.KinveyError('Unable to load data from the network.' + (' There are ' + syncCount + ' entities that need') + ' to be synced before data is loaded from the network.');
	              }
	            }).then(function () {
	              return _get(CacheStore.prototype.__proto__ || Object.getPrototypeOf(CacheStore.prototype), 'findById', _this3).call(_this3, id, options).toPromise();
	            }).then(function (networkEntity) {
	              var request = new _request.CacheRequest({
	                method: _request.RequestMethod.PUT,
	                url: _url2.default.format({
	                  protocol: _this3.client.protocol,
	                  host: _this3.client.host,
	                  pathname: _this3.pathname,
	                  query: options.query
	                }),
	                properties: options.properties,
	                body: networkEntity,
	                timeout: options.timeout
	              });
	              return request.execute();
	            });
	          }

	          return cacheEntity;
	        }).then(function (entity) {
	          return observer.next(entity);
	        }).then(function () {
	          return observer.complete();
	        }).catch(function (error) {
	          return observer.error(error);
	        });
	      });

	      return stream;
	    }
	  }, {
	    key: 'count',
	    value: function count(query) {
	      var _this4 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      options = (0, _assign2.default)({ syncAutomatically: this.syncAutomatically }, options);
	      var syncAutomatically = options.syncAutomatically === true;
	      var stream = _utils.KinveyObservable.create(function (observer) {
	        if (query && !(query instanceof _query3.Query)) {
	          return observer.error(new _errors.KinveyError('Invalid query. It must be an instance of the Query class.'));
	        }

	        var request = new _request.CacheRequest({
	          method: _request.RequestMethod.GET,
	          url: _url2.default.format({
	            protocol: _this4.client.protocol,
	            host: _this4.client.host,
	            pathname: _this4.pathname,
	            query: options.query
	          }),
	          properties: options.properties,
	          query: query,
	          timeout: options.timeout
	        });

	        return request.execute().then(function (response) {
	          return response.data;
	        }).catch(function () {
	          return [];
	        }).then(function () {
	          var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	          return data.length;
	        }).then(function (cacheCount) {
	          observer.next(cacheCount);

	          if (syncAutomatically === true) {
	            return _this4.pendingSyncCount(null, options).then(function (syncCount) {
	              if (syncCount > 0) {
	                return _this4.push(null, options).then(function () {
	                  return _this4.pendingSyncCount(null, options);
	                });
	              }

	              return syncCount;
	            }).then(function (syncCount) {
	              if (syncCount > 0) {
	                throw new _errors.KinveyError('Unable to load data from the network.' + (' There are ' + syncCount + ' entities that need') + ' to be synced before data is loaded from the network.');
	              }
	            }).then(function () {
	              return _get(CacheStore.prototype.__proto__ || Object.getPrototypeOf(CacheStore.prototype), 'count', _this4).call(_this4, query, options).toPromise();
	            });
	          }

	          return cacheCount;
	        }).then(function (count) {
	          return observer.next(count);
	        }).then(function () {
	          return observer.complete();
	        }).catch(function (error) {
	          return observer.error(error);
	        });
	      });

	      return stream;
	    }
	  }, {
	    key: 'create',
	    value: function create(data) {
	      var _this5 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var stream = _utils.KinveyObservable.create(function (observer) {
	        if (!data) {
	          observer.next(null);
	          observer.complete();
	        }

	        var singular = false;

	        if (!(0, _isArray2.default)(data)) {
	          singular = true;
	          data = [data];
	        }

	        var request = new _request.CacheRequest({
	          method: _request.RequestMethod.POST,
	          url: _url2.default.format({
	            protocol: _this5.client.protocol,
	            host: _this5.client.host,
	            pathname: _this5.pathname,
	            query: options.query
	          }),
	          properties: options.properties,
	          body: data,
	          timeout: options.timeout
	        });

	        return request.execute().then(function (response) {
	          return response.data;
	        }).then(function (data) {
	          return _this5.syncManager.addCreateOperation(data, options).then(function () {
	            return data;
	          });
	        }).then(function (data) {
	          if (_this5.syncAutomatically === true) {
	            var ids = Object.keys((0, _keyBy2.default)(data, idAttribute));
	            var query = new _query3.Query().contains('entityId', ids);
	            return _this5.push(query, options).then(function (results) {
	              return (0, _map2.default)(results, function (result) {
	                return result.entity;
	              });
	            });
	          }

	          return data;
	        }).then(function (entities) {
	          return observer.next(singular ? entities[0] : entities);
	        }).then(function () {
	          return observer.complete();
	        }).catch(function (error) {
	          return observer.error(error);
	        });
	      });

	      return stream.toPromise();
	    }
	  }, {
	    key: 'update',
	    value: function update(data) {
	      var _this6 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var stream = _utils.KinveyObservable.create(function (observer) {
	        if (!data) {
	          observer.next(null);
	          return observer.complete();
	        }

	        var singular = false;

	        if (!(0, _isArray2.default)(data)) {
	          singular = true;
	          data = [data];
	        }

	        var request = new _request.CacheRequest({
	          method: _request.RequestMethod.PUT,
	          url: _url2.default.format({
	            protocol: _this6.client.protocol,
	            host: _this6.client.host,
	            pathname: _this6.pathname,
	            query: options.query
	          }),
	          properties: options.properties,
	          body: data,
	          timeout: options.timeout
	        });

	        return request.execute().then(function (response) {
	          return response.data;
	        }).then(function (data) {
	          return _this6.syncManager.addUpdateOperation(data, options).then(function () {
	            return data;
	          });
	        }).then(function (data) {
	          if (_this6.syncAutomatically === true) {
	            var ids = Object.keys((0, _keyBy2.default)(data, idAttribute));
	            var query = new _query3.Query().contains('entityId', ids);
	            return _this6.push(query, options).then(function (results) {
	              return (0, _map2.default)(results, function (result) {
	                return result.entity;
	              });
	            });
	          }

	          return data;
	        }).then(function (entities) {
	          return observer.next(singular ? entities[0] : entities);
	        }).then(function () {
	          return observer.complete();
	        }).catch(function (error) {
	          return observer.error(error);
	        });
	      });

	      return stream.toPromise();
	    }
	  }, {
	    key: 'remove',
	    value: function remove(query) {
	      var _this7 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var stream = _utils.KinveyObservable.create(function (observer) {
	        if (query && !(query instanceof _query3.Query)) {
	          return observer.error(new _errors.KinveyError('Invalid query. It must be an instance of the Query class.'));
	        }

	        var fetchRequest = new _request.CacheRequest({
	          method: _request.RequestMethod.GET,
	          url: _url2.default.format({
	            protocol: _this7.client.protocol,
	            host: _this7.client.host,
	            pathname: _this7.pathname,
	            query: options.query
	          }),
	          properties: options.properties,
	          query: query,
	          timeout: options.timeout
	        });

	        return fetchRequest.execute().then(function (response) {
	          return response.data;
	        }).then(function (entities) {
	          var removeRequest = new _request.CacheRequest({
	            method: _request.RequestMethod.DELETE,
	            url: _url2.default.format({
	              protocol: _this7.client.protocol,
	              host: _this7.client.host,
	              pathname: _this7.pathname,
	              query: options.query
	            }),
	            properties: options.properties,
	            body: entities,
	            timeout: options.timeout
	          });

	          return removeRequest.execute().then(function (response) {
	            return response.data;
	          });
	        }).then(function (entities) {
	          if (entities && entities.length > 0) {
	            var _ret = function () {
	              var localEntities = (0, _filter2.default)(entities, function (entity) {
	                var metadata = new _entity.Metadata(entity);
	                return metadata.isLocal();
	              });
	              var query = new _query3.Query().contains('entityId', Object.keys((0, _keyBy2.default)(localEntities, idAttribute)));
	              return {
	                v: _this7.clearSync(query, options).then(function () {
	                  var syncEntities = (0, _xorWith2.default)(entities, localEntities, function (entity, localEntity) {
	                    return entity[idAttribute] === localEntity[idAttribute];
	                  });
	                  return _this7.syncManager.addDeleteOperation(syncEntities, options);
	                }).then(function () {
	                  return entities;
	                })
	              };
	            }();

	            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	          }

	          return entities;
	        }).then(function (entities) {
	          if (_this7.syncAutomatically === true) {
	            var ids = Object.keys((0, _keyBy2.default)(entities, idAttribute));
	            var _query = new _query3.Query().contains('entityId', ids);
	            return _this7.push(_query, options).then(function () {
	              return entities;
	            });
	          }

	          return entities;
	        }).then(function (entities) {
	          return observer.next(entities);
	        }).then(function () {
	          return observer.complete();
	        }).catch(function (error) {
	          return observer.error(error);
	        });
	      });

	      return stream.toPromise();
	    }
	  }, {
	    key: 'removeById',
	    value: function removeById(id) {
	      var _this8 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var stream = _utils.KinveyObservable.create(function (observer) {
	        var request = new _request.CacheRequest({
	          method: _request.RequestMethod.DELETE,
	          url: _url2.default.format({
	            protocol: _this8.client.protocol,
	            host: _this8.client.host,
	            pathname: _this8.pathname + '/' + id,
	            query: options.query
	          }),
	          properties: options.properties,
	          authType: _request.AuthType.Default,
	          timeout: options.timeout
	        });

	        return request.execute().then(function (response) {
	          return response.data;
	        }).then(function (entity) {
	          if (entity) {
	            var metadata = new _entity.Metadata(entity);

	            if (metadata.isLocal()) {
	              var query = new _query3.Query();
	              query.equalTo('entityId', entity[idAttribute]);
	              return _this8.clearSync(query, options).then(function () {
	                return entity;
	              });
	            }

	            return _this8.syncManager.addDeleteOperation(entity, options).then(function () {
	              return entity;
	            });
	          }

	          return entity;
	        }).then(function (entity) {
	          if (_this8.syncAutomatically === true) {
	            var query = new _query3.Query().equalTo('entityId', entity[idAttribute]);
	            return _this8.push(query, options).then(function () {
	              return entity;
	            });
	          }

	          return entity;
	        }).then(function (entity) {
	          return observer.next(entity);
	        }).then(function () {
	          return observer.complete();
	        }).catch(function (error) {
	          return observer.error(error);
	        });
	      });

	      return stream.toPromise();
	    }
	  }, {
	    key: 'clear',
	    value: function clear(query) {
	      var _this9 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var stream = _utils.KinveyObservable.create(function (observer) {
	        if (query && !(query instanceof _query3.Query)) {
	          return observer.error(new _errors.KinveyError('Invalid query. It must be an instance of the Query class.'));
	        }

	        var request = new _request.CacheRequest({
	          method: _request.RequestMethod.GET,
	          url: _url2.default.format({
	            protocol: _this9.client.protocol,
	            host: _this9.client.host,
	            pathname: _this9.pathname,
	            query: options.query
	          }),
	          properties: options.properties,
	          query: query,
	          timeout: options.timeout
	        });

	        return request.execute().then(function (response) {
	          return response.data;
	        }).then(function (entities) {
	          var request = new _request.CacheRequest({
	            method: _request.RequestMethod.DELETE,
	            url: _url2.default.format({
	              protocol: _this9.client.protocol,
	              host: _this9.client.host,
	              pathname: _this9.pathname,
	              query: options.query
	            }),
	            properties: options.properties,
	            body: entities,
	            timeout: options.timeout
	          });

	          return request.execute();
	        }).then(function (response) {
	          return response.data;
	        }).then(function (entities) {
	          if (entities && entities.length > 0) {
	            var _query2 = new _query3.Query().contains('entityId', Object.keys((0, _keyBy2.default)(entities, idAttribute)));
	            return _this9.clearSync(_query2, options).then(function () {
	              return entities;
	            });
	          }

	          return entities;
	        }).then(function (entities) {
	          return observer.next(entities);
	        }).then(function () {
	          return observer.complete();
	        }).catch(function (error) {
	          return observer.error(error);
	        });
	      });

	      return stream.toPromise();
	    }
	  }, {
	    key: 'pendingSyncCount',
	    value: function pendingSyncCount(query, options) {
	      return this.syncManager.count(query, options);
	    }
	  }, {
	    key: 'syncCount',
	    value: function syncCount(query, options) {
	      return this.pendingSyncCount(query, options);
	    }
	  }, {
	    key: 'pendingSyncEntities',
	    value: function pendingSyncEntities(query, options) {
	      return this.syncManager.find(query, options);
	    }
	  }, {
	    key: 'push',
	    value: function push(query, options) {
	      return this.syncManager.push(query, options);
	    }
	  }, {
	    key: 'pull',
	    value: function pull(query) {
	      var _this10 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      return this.syncManager.pull(query, options).then(function (entities) {
	        return _this10.clear(query, options).then(function () {
	          var saveRequest = new _request.CacheRequest({
	            method: _request.RequestMethod.PUT,
	            url: _url2.default.format({
	              protocol: _this10.client.protocol,
	              host: _this10.client.host,
	              pathname: _this10.pathname,
	              query: options.query
	            }),
	            properties: options.properties,
	            body: entities,
	            timeout: options.timeout
	          });
	          return saveRequest.execute();
	        }).then(function () {
	          return entities;
	        });
	      });
	    }
	  }, {
	    key: 'sync',
	    value: function sync(query, options) {
	      return this.syncManager.sync(query, options);
	    }
	  }, {
	    key: 'clearSync',
	    value: function clearSync(query, options) {
	      return this.syncManager.clear(query, options);
	    }
	  }, {
	    key: 'purge',
	    value: function purge(query, options) {
	      return this.clearSync(query, options);
	    }
	  }, {
	    key: 'syncAutomatically',
	    get: function get() {
	      return true;
	    }
	  }]);

	  return CacheStore;
	}(_networkstore.NetworkStore);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NetworkStore = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _request = __webpack_require__(236);

	var _errors = __webpack_require__(183);

	var _query = __webpack_require__(274);

	var _client = __webpack_require__(59);

	var _utils = __webpack_require__(185);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _isString = __webpack_require__(234);

	var _isString2 = _interopRequireDefault(_isString);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	var _map = __webpack_require__(292);

	var _map2 = _interopRequireDefault(_map);

	var _isArray = __webpack_require__(133);

	var _isArray2 = _interopRequireDefault(_isArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var idAttribute = process && process.env && process.env.KINVEY_ID_ATTRIBUTE || undefined || '_id';
	var appdataNamespace = process && process.env && process.env.KINVEY_DATASTORE_NAMESPACE || undefined || 'appdata';
	var Log = console;

	var NetworkStore = exports.NetworkStore = function () {
	  function NetworkStore(collection) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, NetworkStore);

	    if (collection && !(0, _isString2.default)(collection)) {
	      throw new _errors.KinveyError('Collection must be a string.');
	    }

	    this.collection = collection;

	    this.client = options.client || _client.Client.sharedInstance();

	    this.useDeltaFetch = options.useDeltaFetch === true;
	  }

	  _createClass(NetworkStore, [{
	    key: 'find',
	    value: function find(query) {
	      var _this = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var useDeltaFetch = options.useDeltaFetch === true || this.useDeltaFetch;
	      var stream = _utils.KinveyObservable.create(function (observer) {
	        if (query && !(query instanceof _query.Query)) {
	          return observer.error(new _errors.KinveyError('Invalid query. It must be an instance of the Query class.'));
	        }

	        var config = {
	          method: _request.RequestMethod.GET,
	          authType: _request.AuthType.Default,
	          url: _url2.default.format({
	            protocol: _this.client.protocol,
	            host: _this.client.host,
	            pathname: _this.pathname,
	            query: options.query
	          }),
	          properties: options.properties,
	          query: query,
	          timeout: options.timeout,
	          client: _this.client
	        };
	        var request = new _request.KinveyRequest(config);

	        if (useDeltaFetch === true) {
	          request = new _request.DeltaFetchRequest(config);
	        }

	        return request.execute().then(function (response) {
	          return response.data;
	        }).then(function (data) {
	          return observer.next(data);
	        }).then(function () {
	          return observer.complete();
	        }).catch(function (error) {
	          return observer.error(error);
	        });
	      });
	      return stream;
	    }
	  }, {
	    key: 'findById',
	    value: function findById(id) {
	      var _this2 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var useDeltaFetch = options.useDeltaFetch || this.useDeltaFetch;
	      var stream = _utils.KinveyObservable.create(function (observer) {
	        if (!id) {
	          observer.next(undefined);
	          return observer.compelete();
	        }

	        var config = {
	          method: _request.RequestMethod.GET,
	          authType: _request.AuthType.Default,
	          url: _url2.default.format({
	            protocol: _this2.client.protocol,
	            host: _this2.client.host,
	            pathname: _this2.pathname + '/' + id,
	            query: options.query
	          }),
	          properties: options.properties,
	          timeout: options.timeout,
	          client: _this2.client
	        };
	        var request = new _request.KinveyRequest(config);

	        if (useDeltaFetch === true) {
	          request = new _request.DeltaFetchRequest(config);
	        }

	        return request.execute().then(function (response) {
	          return response.data;
	        }).then(function (data) {
	          return observer.next(data);
	        }).then(function () {
	          return observer.complete();
	        }).catch(function (error) {
	          return observer.error(error);
	        });
	      });

	      return stream;
	    }
	  }, {
	    key: 'count',
	    value: function count(query) {
	      var _this3 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var stream = _utils.KinveyObservable.create(function (observer) {
	        try {
	          if (query && !(query instanceof _query.Query)) {
	            throw new _errors.KinveyError('Invalid query. It must be an instance of the Query class.');
	          }

	          var request = new _request.KinveyRequest({
	            method: _request.RequestMethod.GET,
	            authType: _request.AuthType.Default,
	            url: _url2.default.format({
	              protocol: _this3.client.protocol,
	              host: _this3.client.host,
	              pathname: _this3.pathname + '/_count',
	              query: options.query
	            }),
	            properties: options.properties,
	            query: query,
	            timeout: options.timeout,
	            client: _this3.client
	          });

	          return request.execute().then(function (response) {
	            return response.data;
	          }).then(function (data) {
	            return observer.next(data ? data.count : 0);
	          }).then(function () {
	            return observer.complete();
	          }).catch(function (error) {
	            return observer.error(error);
	          });
	        } catch (error) {
	          return observer.error(error);
	        }
	      });

	      return stream;
	    }
	  }, {
	    key: 'create',
	    value: function create(data) {
	      var _this4 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var stream = _utils.KinveyObservable.create(function (observer) {
	        try {
	          var _ret = function () {
	            if (!data) {
	              observer.next(null);
	              return {
	                v: observer.compelete()
	              };
	            }

	            var singular = false;

	            if (!(0, _isArray2.default)(data)) {
	              singular = true;
	              data = [data];
	            }

	            return {
	              v: _es6Promise2.default.all((0, _map2.default)(data, function (entity) {
	                var request = new _request.KinveyRequest({
	                  method: _request.RequestMethod.POST,
	                  authType: _request.AuthType.Default,
	                  url: _url2.default.format({
	                    protocol: _this4.client.protocol,
	                    host: _this4.client.host,
	                    pathname: _this4.pathname,
	                    query: options.query
	                  }),
	                  properties: options.properties,
	                  data: entity,
	                  timeout: options.timeout,
	                  client: _this4.client
	                });
	                return request.execute();
	              })).then(function (responses) {
	                return (0, _map2.default)(responses, function (response) {
	                  return response.data;
	                });
	              }).then(function (data) {
	                return observer.next(singular ? data[0] : data);
	              }).then(function () {
	                return observer.complete();
	              }).catch(function (error) {
	                return observer.error(error);
	              })
	            };
	          }();

	          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        } catch (error) {
	          return observer.error(error);
	        }
	      });

	      return stream.toPromise();
	    }
	  }, {
	    key: 'update',
	    value: function update(data) {
	      var _this5 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var stream = _utils.KinveyObservable.create(function (observer) {
	        try {
	          var _ret2 = function () {
	            if (!data) {
	              observer.next(null);
	              return {
	                v: observer.compelete()
	              };
	            }

	            var singular = false;

	            if (!(0, _isArray2.default)(data)) {
	              singular = true;
	              data = [data];
	            }

	            return {
	              v: _es6Promise2.default.all((0, _map2.default)(data, function (entity) {
	                var request = new _request.KinveyRequest({
	                  method: _request.RequestMethod.PUT,
	                  authType: _request.AuthType.Default,
	                  url: _url2.default.format({
	                    protocol: _this5.client.protocol,
	                    host: _this5.client.host,
	                    pathname: _this5.pathname + '/' + entity[idAttribute],
	                    query: options.query
	                  }),
	                  properties: options.properties,
	                  data: entity,
	                  timeout: options.timeout,
	                  client: _this5.client
	                });
	                return request.execute();
	              })).then(function (responses) {
	                return (0, _map2.default)(responses, function (response) {
	                  return response.data;
	                });
	              }).then(function (data) {
	                return observer.next(singular ? data[0] : data);
	              }).then(function () {
	                return observer.complete();
	              }).catch(function (error) {
	                return observer.error(error);
	              })
	            };
	          }();

	          if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	        } catch (error) {
	          return observer.error(error);
	        }
	      });

	      return stream.toPromise();
	    }
	  }, {
	    key: 'save',
	    value: function save(data, options) {
	      if (data[idAttribute]) {
	        return this.update(data, options);
	      }

	      return this.create(data, options);
	    }
	  }, {
	    key: 'remove',
	    value: function remove(query) {
	      var _this6 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var stream = _utils.KinveyObservable.create(function (observer) {
	        try {
	          if (query && !(query instanceof _query.Query)) {
	            throw new _errors.KinveyError('Invalid query. It must be an instance of the Query class.');
	          }

	          var request = new _request.KinveyRequest({
	            method: _request.RequestMethod.DELETE,
	            authType: _request.AuthType.Default,
	            url: _url2.default.format({
	              protocol: _this6.client.protocol,
	              host: _this6.client.host,
	              pathname: _this6.pathname,
	              query: options.query
	            }),
	            properties: options.properties,
	            query: query,
	            timeout: options.timeout,
	            client: _this6.client
	          });
	          return request.execute().then(function (response) {
	            return response.data;
	          }).then(function (data) {
	            return observer.next(data);
	          }).then(function () {
	            return observer.complete();
	          }).catch(function (error) {
	            return observer.error(error);
	          });
	        } catch (error) {
	          return observer.error(error);
	        }
	      });

	      return stream.toPromise();
	    }
	  }, {
	    key: 'removeById',
	    value: function removeById(id) {
	      var _this7 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var stream = _utils.KinveyObservable.create(function (observer) {
	        try {
	          if (!id) {
	            observer.next(undefined);
	            return observer.compelete();
	          }

	          var request = new _request.KinveyRequest({
	            method: _request.RequestMethod.DELETE,
	            authType: _request.AuthType.Default,
	            url: _url2.default.format({
	              protocol: _this7.client.protocol,
	              host: _this7.client.host,
	              pathname: _this7.pathname + '/' + id,
	              query: options.query
	            }),
	            properties: options.properties,
	            timeout: options.timeout
	          });
	          return request.execute().then(function (response) {
	            return response.data;
	          }).then(function (data) {
	            return observer.next(data);
	          }).then(function () {
	            return observer.complete();
	          }).catch(function (error) {
	            return observer.error(error);
	          });
	        } catch (error) {
	          return observer.error(error);
	        }
	      });

	      return stream.toPromise();
	    }
	  }, {
	    key: 'subscribe',
	    value: function subscribe(onNext, onError, onComplete) {
	      return this.liveStream.subscribe(onNext, onError, onComplete);
	    }
	  }, {
	    key: 'pathname',
	    get: function get() {
	      var pathname = '/' + appdataNamespace + '/' + this.client.appKey;

	      if (this.collection) {
	        pathname = pathname + '/' + this.collection;
	      }

	      return pathname;
	    }
	  }, {
	    key: 'liveStream',
	    get: function get() {
	      var _this8 = this;

	      if (typeof EventSource === 'undefined') {
	        throw new _errors.KinveyError('Your environment does not support server-sent events.');
	      }

	      if (!this._liveStream) {
	        (function () {
	          var source = new EventSource(_url2.default.format({
	            protocol: _this8.client.liveServiceProtocol,
	            host: _this8.client.liveServiceHost,
	            pathname: _this8.pathname
	          }));

	          _this8._liveStream = _utils.KinveyObservable.create(function (observer) {
	            source.onopen = function (event) {
	              Log.info('Subscription to Kinvey Live Service is now open at ' + source.url + '.');
	              Log.info(event);
	            };

	            source.onmessage = function (message) {
	              try {
	                observer.next(JSON.parse(message.data));
	              } catch (error) {
	                observer.error(error);
	              }
	            };

	            source.onerror = function (error) {
	              observer.error(error);
	            };

	            return function () {
	              observer.complete();
	            };
	          }).finally(function () {
	            source.close();
	            delete _this8._liveStream;
	          });
	        })();
	      }

	      return this._liveStream;
	    }
	  }]);

	  return NetworkStore;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(287),
	    baseIteratee = __webpack_require__(68),
	    baseMap = __webpack_require__(293),
	    isArray = __webpack_require__(133);

	/**
	 * Creates an array of values by running each element in `collection` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
	 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
	 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
	 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * _.map([4, 8], square);
	 * // => [16, 64]
	 *
	 * _.map({ 'a': 4, 'b': 8 }, square);
	 * // => [16, 64] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(collection, baseIteratee(iteratee, 3));
	}

	module.exports = map;


/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(177),
	    isArrayLike = __webpack_require__(130);

	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}

	module.exports = baseMap;


/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SyncManager = exports.SyncOperation = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _request5 = __webpack_require__(236);

	var _errors = __webpack_require__(183);

	var _client = __webpack_require__(59);

	var _query = __webpack_require__(274);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	var _map = __webpack_require__(292);

	var _map2 = _interopRequireDefault(_map);

	var _result = __webpack_require__(284);

	var _result2 = _interopRequireDefault(_result);

	var _isArray = __webpack_require__(133);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _isString = __webpack_require__(234);

	var _isString2 = _interopRequireDefault(_isString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var appdataNamespace = process && process.env && process.env.KINVEY_DATASTORE_NAMESPACE || undefined || 'appdata';
	var syncCollectionName = process && process.env && process.env.KINVEY_SYNC_COLLECTION_NAME || undefined || 'kinvey_sync';
	var idAttribute = process && process.env && process.env.KINVEY_ID_ATTRIBUTE || undefined || '_id';

	var SyncOperation = {
	  Create: _request5.RequestMethod.POST,
	  Update: _request5.RequestMethod.PUT,
	  Delete: _request5.RequestMethod.DELETE
	};
	Object.freeze(SyncOperation);
	exports.SyncOperation = SyncOperation;

	var SyncManager = exports.SyncManager = function () {
	  function SyncManager(collection) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, SyncManager);

	    if (!collection) {
	      throw new _errors.SyncError('A collection is required.');
	    }

	    if (!(0, _isString2.default)(collection)) {
	      throw new _errors.SyncError('Collection must be a string.');
	    }

	    this.collection = collection;

	    this.client = options.client || _client.Client.sharedInstance();
	  }

	  _createClass(SyncManager, [{
	    key: 'find',
	    value: function find() {
	      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _query.Query();
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      if (!(query instanceof _query.Query)) {
	        query = new _query.Query((0, _result2.default)(query, 'toJSON', query));
	      }

	      query.equalTo('collection', this.collection);

	      var request = new _request5.CacheRequest({
	        method: _request5.RequestMethod.GET,
	        url: _url2.default.format({
	          protocol: this.client.protocol,
	          host: this.client.host,
	          pathname: this.pathname
	        }),
	        properties: options.properties,
	        query: query,
	        timeout: options.timeout,
	        client: this.client
	      });
	      return request.execute().then(function (response) {
	        return response.data;
	      });
	    }
	  }, {
	    key: 'count',
	    value: function count() {
	      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _query.Query();
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      return this.find(query, options).then(function (entities) {
	        return entities.length;
	      });
	    }
	  }, {
	    key: 'addCreateOperation',
	    value: function addCreateOperation(entities) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      return this.addOperation(SyncOperation.Create, entities, options);
	    }
	  }, {
	    key: 'addUpdateOperation',
	    value: function addUpdateOperation(entities) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      return this.addOperation(SyncOperation.Update, entities, options);
	    }
	  }, {
	    key: 'addDeleteOperation',
	    value: function addDeleteOperation(entities) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      return this.addOperation(SyncOperation.Delete, entities, options);
	    }
	  }, {
	    key: 'addOperation',
	    value: function addOperation() {
	      var operation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SyncOperation.Create;

	      var _this = this;

	      var entities = arguments[1];
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var singular = false;

	      if (!(0, _isArray2.default)(entities)) {
	        singular = true;
	        entities = [entities];
	      }

	      return _es6Promise2.default.all((0, _map2.default)(entities, function (entity) {
	        if (!entity) {
	          return _es6Promise2.default.resolve(null);
	        }

	        var id = entity[idAttribute];
	        if (!id) {
	          return _es6Promise2.default.reject(new _errors.SyncError('An entity is missing an _id. All entities must have an _id in order to be ' + 'added to the sync table.', entity));
	        }

	        var query = new _query.Query().equalTo('entityId', id);
	        var findRequest = new _request5.CacheRequest({
	          method: _request5.RequestMethod.GET,
	          url: _url2.default.format({
	            protocol: _this.client.protocol,
	            host: _this.client.host,
	            pathname: _this.pathname
	          }),
	          properties: options.properties,
	          query: query,
	          timeout: options.timeout
	        });
	        return findRequest.execute().then(function (response) {
	          return response.data;
	        }).then(function (entities) {
	          var syncEntity = entities.length === 1 ? entities[0] : { collection: _this.collection, state: {}, entityId: id };

	          syncEntity.state = syncEntity.state || {};
	          syncEntity.state.method = operation;

	          var request = new _request5.CacheRequest({
	            method: _request5.RequestMethod.PUT,
	            url: _url2.default.format({
	              protocol: _this.client.protocol,
	              host: _this.client.host,
	              pathname: _this.pathname
	            }),
	            properties: options.properties,
	            body: syncEntity,
	            timeout: options.timeout
	          });
	          return request.execute();
	        });
	      })).then(function () {
	        if (singular === true) {
	          return entities[0];
	        }

	        return entities;
	      });
	    }
	  }, {
	    key: 'pull',
	    value: function pull(query) {
	      var _this2 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      if (query && !(query instanceof _query.Query)) {
	        return _es6Promise2.default.reject(new _errors.SyncError('Invalid query. It must be an instance of the Query class.'));
	      }

	      return this.count().then(function (count) {
	        if (count > 0) {
	          return _this2.push().then(function () {
	            return _this2.count;
	          });
	        }

	        return count;
	      }).then(function (count) {
	        if (count > 0) {
	          throw new _errors.SyncError('Unable to pull data from the network.' + (' There are ' + count + ' entities that need') + ' to be synced before data is loaded from the network.');
	        }

	        var config = {
	          method: _request5.RequestMethod.GET,
	          authType: _request5.AuthType.Default,
	          url: _url2.default.format({
	            protocol: _this2.client.protocol,
	            host: _this2.client.host,
	            pathname: _this2.backendPathname,
	            query: options.query
	          }),
	          properties: options.properties,
	          query: query,
	          timeout: options.timeout,
	          client: _this2.client
	        };
	        var request = new _request5.KinveyRequest(config);

	        if (options.useDeltaFetch === true) {
	          request = new _request5.DeltaFetchRequest(config);
	        }

	        return request.execute();
	      }).then(function (response) {
	        return response.data;
	      });
	    }
	  }, {
	    key: 'push',
	    value: function push(query) {
	      var _this3 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var batchSize = 100;
	      var i = 0;

	      return this.find(query).then(function (syncEntities) {
	        if (syncEntities.length > 0) {
	          var _ret = function () {
	            var batchSync = function batchSync(syncResults) {
	              var promise = new _es6Promise2.default(function (resolve) {
	                var batch = syncEntities.slice(i, i + batchSize);
	                i += batchSize;

	                return _es6Promise2.default.all((0, _map2.default)(batch, function (syncEntity) {
	                  var entityId = syncEntity.entityId;
	                  var state = syncEntity.state;
	                  var method = state.method;


	                  if (method === _request5.RequestMethod.DELETE) {
	                    var request = new _request5.KinveyRequest({
	                      method: _request5.RequestMethod.DELETE,
	                      authType: _request5.AuthType.Default,
	                      url: _url2.default.format({
	                        protocol: _this3.client.protocol,
	                        host: _this3.client.host,
	                        pathname: _this3.backendPathname + '/' + entityId
	                      }),
	                      properties: options.properties,
	                      timeout: options.timeout,
	                      client: _this3.client
	                    });
	                    return request.execute().then(function () {
	                      var request = new _request5.CacheRequest({
	                        method: _request5.RequestMethod.DELETE,
	                        url: _url2.default.format({
	                          protocol: _this3.client.protocol,
	                          host: _this3.client.host,
	                          pathname: _this3.pathname + '/' + syncEntity[idAttribute]
	                        }),
	                        properties: options.properties,
	                        timeout: options.timeout
	                      });
	                      return request.execute();
	                    }).then(function () {
	                      var result = { _id: entityId };
	                      return result;
	                    }).catch(function (error) {
	                      if (error instanceof _errors.InsufficientCredentialsError) {
	                        var _request = new _request5.KinveyRequest({
	                          method: _request5.RequestMethod.GET,
	                          authType: _request5.AuthType.Default,
	                          url: _url2.default.format({
	                            protocol: _this3.client.protocol,
	                            host: _this3.client.host,
	                            pathname: _this3.backendPathname + '/' + entityId
	                          }),
	                          properties: options.properties,
	                          timeout: options.timeout,
	                          client: _this3.client
	                        });
	                        return _request.execute().then(function (response) {
	                          return response.data;
	                        }).then(function (originalEntity) {
	                          var request = new _request5.CacheRequest({
	                            method: _request5.RequestMethod.PUT,
	                            url: _url2.default.format({
	                              protocol: _this3.client.protocol,
	                              host: _this3.client.host,
	                              pathname: _this3.backendPathname + '/' + entityId
	                            }),
	                            properties: options.properties,
	                            timeout: options.timeout,
	                            body: originalEntity
	                          });
	                          return request.execute();
	                        }).then(function () {
	                          var request = new _request5.CacheRequest({
	                            method: _request5.RequestMethod.DELETE,
	                            url: _url2.default.format({
	                              protocol: _this3.client.protocol,
	                              host: _this3.client.host,
	                              pathname: _this3.pathname + '/' + syncEntity[idAttribute]
	                            }),
	                            properties: options.properties,
	                            timeout: options.timeout
	                          });
	                          return request.execute();
	                        }).catch(function () {
	                          throw error;
	                        });
	                      }

	                      throw error;
	                    }).catch(function (error) {
	                      var result = {
	                        _id: entityId,
	                        error: error
	                      };
	                      return result;
	                    });
	                  } else if (method === _request5.RequestMethod.POST || method === _request5.RequestMethod.PUT) {
	                    var _request2 = new _request5.CacheRequest({
	                      method: _request5.RequestMethod.GET,
	                      url: _url2.default.format({
	                        protocol: _this3.client.protocol,
	                        host: _this3.client.host,
	                        pathname: _this3.backendPathname + '/' + entityId
	                      }),
	                      properties: options.properties,
	                      timeout: options.timeout
	                    });
	                    return _request2.execute().then(function (response) {
	                      var entity = response.data;

	                      var request = new _request5.KinveyRequest({
	                        method: method,
	                        authType: _request5.AuthType.Default,
	                        url: _url2.default.format({
	                          protocol: _this3.client.protocol,
	                          host: _this3.client.host,
	                          pathname: _this3.backendPathname + '/' + entityId
	                        }),
	                        properties: options.properties,
	                        timeout: options.timeout,
	                        body: entity,
	                        client: _this3.client
	                      });

	                      if (method === _request5.RequestMethod.POST) {
	                        delete entity[idAttribute];
	                        request.method = _request5.RequestMethod.POST;
	                        request.url = _url2.default.format({
	                          protocol: _this3.client.protocol,
	                          host: _this3.client.host,
	                          pathname: _this3.backendPathname
	                        });
	                        request.body = entity;
	                      }

	                      return request.execute().then(function (response) {
	                        return response.data;
	                      }).then(function (entity) {
	                        var request = new _request5.CacheRequest({
	                          method: _request5.RequestMethod.DELETE,
	                          url: _url2.default.format({
	                            protocol: _this3.client.protocol,
	                            host: _this3.client.host,
	                            pathname: _this3.pathname + '/' + syncEntity[idAttribute]
	                          }),
	                          properties: options.properties,
	                          timeout: options.timeout
	                        });
	                        return request.execute().then(function () {
	                          var request = new _request5.CacheRequest({
	                            method: _request5.RequestMethod.PUT,
	                            url: _url2.default.format({
	                              protocol: _this3.client.protocol,
	                              host: _this3.client.host,
	                              pathname: _this3.backendPathname + '/' + entity[idAttribute]
	                            }),
	                            properties: options.properties,
	                            timeout: options.timeout,
	                            body: entity
	                          });
	                          return request.execute().then(function (response) {
	                            return response.data;
	                          });
	                        }).then(function (entity) {
	                          if (method === _request5.RequestMethod.POST) {
	                            var _request3 = new _request5.CacheRequest({
	                              method: _request5.RequestMethod.DELETE,
	                              url: _url2.default.format({
	                                protocol: _this3.client.protocol,
	                                host: _this3.client.host,
	                                pathname: _this3.backendPathname + '/' + entityId
	                              }),
	                              properties: options.properties,
	                              timeout: options.timeout
	                            });

	                            return _request3.execute().then(function () {
	                              return entity;
	                            });
	                          }

	                          return entity;
	                        }).then(function (entity) {
	                          var result = {
	                            _id: entityId,
	                            entity: entity
	                          };
	                          return result;
	                        });
	                      }).catch(function (error) {
	                        if (error instanceof _errors.InsufficientCredentialsError) {
	                          var _request4 = new _request5.KinveyRequest({
	                            method: _request5.RequestMethod.GET,
	                            authType: _request5.AuthType.Default,
	                            url: _url2.default.format({
	                              protocol: _this3.client.protocol,
	                              host: _this3.client.host,
	                              pathname: _this3.backendPathname + '/' + entityId
	                            }),
	                            properties: options.properties,
	                            timeout: options.timeout,
	                            client: _this3.client
	                          });
	                          return _request4.execute().then(function (response) {
	                            return response.data;
	                          }).then(function (originalEntity) {
	                            var request = new _request5.CacheRequest({
	                              method: _request5.RequestMethod.PUT,
	                              url: _url2.default.format({
	                                protocol: _this3.client.protocol,
	                                host: _this3.client.host,
	                                pathname: _this3.backendPathname + '/' + entityId
	                              }),
	                              properties: options.properties,
	                              timeout: options.timeout,
	                              body: originalEntity
	                            });
	                            return request.execute();
	                          }).then(function () {
	                            var request = new _request5.CacheRequest({
	                              method: _request5.RequestMethod.DELETE,
	                              url: _url2.default.format({
	                                protocol: _this3.client.protocol,
	                                host: _this3.client.host,
	                                pathname: _this3.pathname + '/' + syncEntity[idAttribute]
	                              }),
	                              properties: options.properties,
	                              timeout: options.timeout
	                            });
	                            return request.execute();
	                          }).catch(function () {
	                            throw error;
	                          });
	                        }

	                        throw error;
	                      }).catch(function (error) {
	                        var result = {
	                          _id: entityId,
	                          entity: entity,
	                          error: error
	                        };
	                        return result;
	                      });
	                    }).catch(function (error) {
	                      var result = {
	                        _id: entityId,
	                        entity: undefined,
	                        error: error
	                      };
	                      return result;
	                    });
	                  }

	                  return {
	                    _id: entityId,
	                    entity: undefined,
	                    error: new _errors.SyncError('Unable to sync the entity since the method was not recognized.', syncEntity)
	                  };
	                })).then(function (results) {
	                  syncResults = syncResults.concat(results);

	                  if (i < syncEntities.length) {
	                    return resolve(batchSync(syncResults));
	                  }

	                  return resolve(syncResults);
	                });
	              });
	              return promise;
	            };

	            return {
	              v: batchSync([])
	            };
	          }();

	          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        }

	        return [];
	      });
	    }
	  }, {
	    key: 'sync',
	    value: function sync(query) {
	      var _this4 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      return this.push(null, options).then(function (push) {
	        var promise = _this4.pull(query, options).then(function (pull) {
	          var result = {
	            push: push,
	            pull: pull
	          };
	          return result;
	        });
	        return promise;
	      });
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      var _this5 = this;

	      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _query.Query();
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      if (!(query instanceof _query.Query)) {
	        query = new _query.Query(query);
	      }
	      query.equalTo('collection', this.collection);

	      var request = new _request5.CacheRequest({
	        method: _request5.RequestMethod.GET,
	        url: _url2.default.format({
	          protocol: this.client.protocol,
	          host: this.client.host,
	          pathname: this.pathname
	        }),
	        properties: options.properties,
	        query: query,
	        timeout: options.timeout
	      });
	      return request.execute().then(function (response) {
	        return response.data;
	      }).then(function (entities) {
	        var request = new _request5.CacheRequest({
	          method: _request5.RequestMethod.DELETE,
	          url: _url2.default.format({
	            protocol: _this5.client.protocol,
	            host: _this5.client.host,
	            pathname: _this5.pathname
	          }),
	          properties: options.properties,
	          body: entities,
	          timeout: options.timeout
	        });
	        return request.execute().then(function (response) {
	          return response.data;
	        });
	      });
	    }
	  }, {
	    key: 'pathname',
	    get: function get() {
	      return '/' + appdataNamespace + '/' + this.client.appKey + '/' + syncCollectionName;
	    }
	  }, {
	    key: 'backendPathname',
	    get: function get() {
	      return '/' + appdataNamespace + '/' + this.client.appKey + '/' + this.collection;
	    }
	  }]);

	  return SyncManager;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _acl = __webpack_require__(296);

	Object.keys(_acl).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _acl[key];
	    }
	  });
	});

	var _metadata = __webpack_require__(321);

	Object.keys(_metadata).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _metadata[key];
	    }
	  });
	});

	var _user = __webpack_require__(322);

	Object.keys(_user).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _user[key];
	    }
	  });
	});

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Acl = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _errors = __webpack_require__(183);

	var _clone = __webpack_require__(297);

	var _clone2 = _interopRequireDefault(_clone);

	var _isPlainObject = __webpack_require__(241);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var aclAttribute = process && process.env && process.env.KINVEY_ACL_ATTRIBUTE || undefined || '_acl';

	var Acl = exports.Acl = function () {
	  function Acl() {
	    var entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Acl);

	    if (!(0, _isPlainObject2.default)(entity)) {
	      throw new _errors.KinveyError('entity argument must be an object');
	    }

	    this.acl = (0, _clone2.default)(entity[aclAttribute]);
	  }

	  _createClass(Acl, [{
	    key: 'addReader',
	    value: function addReader(user) {
	      var r = this.acl.r || [];

	      if (r.indexOf(user) === -1) {
	        r.push(user);
	      }

	      this.acl.r = r;
	      return this;
	    }
	  }, {
	    key: 'addReaderGroup',
	    value: function addReaderGroup(group) {
	      var groups = this.acl.groups || {};
	      var r = groups.r || [];

	      if (r.indexOf(group) === -1) {
	        r.push(group);
	      }

	      groups.r = r;
	      this.acl.groups = groups;
	      return this;
	    }
	  }, {
	    key: 'addWriter',
	    value: function addWriter(user) {
	      var w = this.acl.w || [];

	      if (w.indexOf(user) === -1) {
	        w.push(user);
	      }

	      this.acl.w = w;
	      return this;
	    }
	  }, {
	    key: 'addWriterGroup',
	    value: function addWriterGroup(group) {
	      var groups = this.acl.groups || {};
	      var w = groups.w || [];

	      if (w.indexOf(group) === -1) {
	        w.push(group);
	      }

	      groups.w = w;
	      this.acl.groups = groups;
	      return this;
	    }
	  }, {
	    key: 'isGloballyReadable',
	    value: function isGloballyReadable() {
	      return this.acl.gr || false;
	    }
	  }, {
	    key: 'isGloballyWritable',
	    value: function isGloballyWritable() {
	      return this.acl.gw || false;
	    }
	  }, {
	    key: 'removeReader',
	    value: function removeReader(user) {
	      var r = this.acl.r || [];
	      var pos = r.indexOf(user);

	      if (pos !== -1) {
	        r.splice(pos, 1);
	      }

	      this.acl.r = r;
	      return this;
	    }
	  }, {
	    key: 'removeReaderGroup',
	    value: function removeReaderGroup(group) {
	      var groups = this.acl.groups || {};
	      var r = groups.r || [];
	      var pos = r.indexOf(group);

	      if (pos !== -1) {
	        r.splice(pos, 1);
	      }

	      groups.r = r;
	      this.acl.groups = groups;
	      return this;
	    }
	  }, {
	    key: 'removeWriter',
	    value: function removeWriter(user) {
	      var w = this.acl.w || [];
	      var pos = w.indexOf(user);

	      if (pos !== -1) {
	        w.splice(pos, 1);
	      }

	      this.acl.w = w;
	      return this;
	    }
	  }, {
	    key: 'removeWriterGroup',
	    value: function removeWriterGroup(group) {
	      var groups = this.acl.groups || {};
	      var w = groups.w || [];
	      var pos = w.indexOf(group);

	      if (pos !== -1) {
	        w.splice(pos, 1);
	      }

	      groups.w = w;
	      this.acl.groups = groups;
	      return this;
	    }
	  }, {
	    key: 'toPlainObject',
	    value: function toPlainObject() {
	      return this.acl;
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      return this.toPlainObject();
	    }
	  }, {
	    key: 'creator',
	    get: function get() {
	      return this.acl.creator;
	    }
	  }, {
	    key: 'readers',
	    get: function get() {
	      return this.acl.r || [];
	    }
	  }, {
	    key: 'writers',
	    get: function get() {
	      return this.acl.w || [];
	    }
	  }, {
	    key: 'readerGroups',
	    get: function get() {
	      return this.acl.groups ? this.acl.groups.r : [];
	    }
	  }, {
	    key: 'writerGroups',
	    get: function get() {
	      return this.acl.groups ? this.acl.groups.w : [];
	    }
	  }, {
	    key: 'globallyReadable',
	    set: function set(gr) {
	      this.acl.gr = gr || false;
	    }
	  }, {
	    key: 'globallyWritable',
	    set: function set(gw) {
	      this.acl.gw = gw || false;
	    }
	  }]);

	  return Acl;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(298);

	/**
	 * Creates a shallow clone of `value`.
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
	 * and supports cloning arrays, array buffers, booleans, date objects, maps,
	 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
	 * arrays. The own enumerable properties of `arguments` objects are cloned
	 * as plain objects. An empty object is returned for uncloneable values such
	 * as error objects, functions, DOM nodes, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to clone.
	 * @returns {*} Returns the cloned value.
	 * @see _.cloneDeep
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var shallow = _.clone(objects);
	 * console.log(shallow[0] === objects[0]);
	 * // => true
	 */
	function clone(value) {
	  return baseClone(value, false, true);
	}

	module.exports = clone;


/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(71),
	    arrayEach = __webpack_require__(192),
	    assignValue = __webpack_require__(221),
	    baseAssign = __webpack_require__(299),
	    cloneBuffer = __webpack_require__(300),
	    copyArray = __webpack_require__(301),
	    copySymbols = __webpack_require__(302),
	    getAllKeys = __webpack_require__(305),
	    getTag = __webpack_require__(139),
	    initCloneArray = __webpack_require__(308),
	    initCloneByTag = __webpack_require__(309),
	    initCloneObject = __webpack_require__(319),
	    isArray = __webpack_require__(133),
	    isBuffer = __webpack_require__(272),
	    isObject = __webpack_require__(89),
	    keys = __webpack_require__(125);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {boolean} [isFull] Specify a clone including symbols.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (!isArr) {
	    var props = isFull ? getAllKeys(value) : keys(value);
	  }
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return result;
	}

	module.exports = baseClone;


/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(223),
	    keys = __webpack_require__(125);

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(92);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(149)(module)))

/***/ },
/* 301 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(223),
	    getSymbols = __webpack_require__(303);

	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	module.exports = copySymbols;


/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(138),
	    stubArray = __webpack_require__(304);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

	module.exports = getSymbols;


/***/ },
/* 304 */
/***/ function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;


/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(306),
	    getSymbols = __webpack_require__(303),
	    keys = __webpack_require__(125);

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	module.exports = getAllKeys;


/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(307),
	    isArray = __webpack_require__(133);

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;


/***/ },
/* 307 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 308 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;


/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(310),
	    cloneDataView = __webpack_require__(311),
	    cloneMap = __webpack_require__(312),
	    cloneRegExp = __webpack_require__(314),
	    cloneSet = __webpack_require__(315),
	    cloneSymbol = __webpack_require__(317),
	    cloneTypedArray = __webpack_require__(318);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	module.exports = initCloneByTag;


/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(121);

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;


/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(310);

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	module.exports = cloneDataView;


/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(313),
	    arrayReduce = __webpack_require__(176),
	    mapToArray = __webpack_require__(122);

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor);
	}

	module.exports = cloneMap;


/***/ },
/* 313 */
/***/ function(module, exports) {

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `map.set` because it's not chainable in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}

	module.exports = addMapEntry;


/***/ },
/* 314 */
/***/ function(module, exports) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	module.exports = cloneRegExp;


/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(316),
	    arrayReduce = __webpack_require__(176),
	    setToArray = __webpack_require__(123);

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor);
	}

	module.exports = cloneSet;


/***/ },
/* 316 */
/***/ function(module, exports) {

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  // Don't return `set.add` because it's not chainable in IE 11.
	  set.add(value);
	  return set;
	}

	module.exports = addSetEntry;


/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(120);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	module.exports = cloneSymbol;


/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(310);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;


/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(320),
	    getPrototype = __webpack_require__(242),
	    isPrototype = __webpack_require__(136);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	module.exports = initCloneObject;


/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(89);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = prototype;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	module.exports = baseCreate;


/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Metadata = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _errors = __webpack_require__(183);

	var _clone = __webpack_require__(297);

	var _clone2 = _interopRequireDefault(_clone);

	var _isPlainObject = __webpack_require__(241);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var kmdAttribute = process && process.env && process.env.KINVEY_KMD_ATTRIBUTE || undefined || '_kmd';

	var Metadata = exports.Metadata = function () {
	  function Metadata() {
	    var entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Metadata);

	    if (!(0, _isPlainObject2.default)(entity)) {
	      throw new _errors.KinveyError('entity argument must be an object');
	    }

	    this.kmd = (0, _clone2.default)(entity[kmdAttribute] || {});
	  }

	  _createClass(Metadata, [{
	    key: 'isLocal',
	    value: function isLocal() {
	      return !!this.kmd.local;
	    }
	  }, {
	    key: 'toPlainObject',
	    value: function toPlainObject() {
	      return this.kmd;
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      return this.toPlainObject();
	    }
	  }, {
	    key: 'createdAt',
	    get: function get() {
	      if (this.kmd.ect) {
	        return Date.parse(this.kmd.ect);
	      }

	      return undefined;
	    }
	  }, {
	    key: 'ect',
	    get: function get() {
	      return this.createdAt;
	    }
	  }, {
	    key: 'emailVerification',
	    get: function get() {
	      return this.kmd.emailVerification.status;
	    }
	  }, {
	    key: 'lastModified',
	    get: function get() {
	      if (this.kmd.lmt) {
	        return Date.parse(this.kmd.lmt);
	      }

	      return undefined;
	    }
	  }, {
	    key: 'lmt',
	    get: function get() {
	      return this.lastModified;
	    }
	  }, {
	    key: 'authtoken',
	    get: function get() {
	      return this.kmd.authtoken;
	    },
	    set: function set(authtoken) {
	      this.kmd.authtoken = authtoken;
	    }
	  }]);

	  return Metadata;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.User = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _client = __webpack_require__(59);

	var _acl = __webpack_require__(296);

	var _metadata = __webpack_require__(321);

	var _request = __webpack_require__(236);

	var _errors = __webpack_require__(183);

	var _datastore = __webpack_require__(289);

	var _social = __webpack_require__(260);

	var _utils = __webpack_require__(185);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	var _assign = __webpack_require__(220);

	var _assign2 = _interopRequireDefault(_assign);

	var _result = __webpack_require__(284);

	var _result2 = _interopRequireDefault(_result);

	var _isString = __webpack_require__(234);

	var _isString2 = _interopRequireDefault(_isString);

	var _isObject = __webpack_require__(89);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _isEmpty = __webpack_require__(271);

	var _isEmpty2 = _interopRequireDefault(_isEmpty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var usersNamespace = process && process.env && process.env.KINVEY_USERS_NAMESPACE || undefined || 'user';
	var rpcNamespace = process && process.env && process.env.KINVEY_RPC_NAMESPACE || undefined || 'rpc';
	var idAttribute = process && process.env && process.env.KINVEY_ID_ATTRIBUTE || undefined || '_id';
	var kmdAttribute = process && process.env && process.env.KINVEY_KMD_ATTRIBUTE || undefined || '_kmd';
	var socialIdentityAttribute = process && process.env && process.env.KINVEY_SOCIAL_IDENTITY_ATTRIBUTE || undefined || '_socialIdentity';
	var usernameAttribute = process && process.env && process.env.KINVEY_USERNAME_ATTRIBUTE || undefined || 'username';
	var emailAttribute = process && process.env && process.env.KINVEY_EMAIL_ATTRIBUTE || undefined || 'email';

	var User = exports.User = function () {
	  function User() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, User);

	    this.data = data;

	    this.client = options.client || _client.Client.sharedInstance();
	  }

	  _createClass(User, [{
	    key: 'isActive',
	    value: function isActive() {
	      var activeUser = User.getActiveUser(this.client);

	      if (activeUser && activeUser[idAttribute] === this[idAttribute]) {
	        return true;
	      }

	      return false;
	    }
	  }, {
	    key: 'isEmailVerified',
	    value: function isEmailVerified() {
	      var status = this.metadata.emailVerification;
	      return status === 'confirmed';
	    }
	  }, {
	    key: 'login',
	    value: function login(username, password) {
	      var _this = this;

	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var isActiveUser = this.isActive();
	      if (isActiveUser) {
	        return _es6Promise2.default.reject(new _errors.ActiveUserError('This user is already the active user.'));
	      }

	      var activeUser = User.getActiveUser(this.client);
	      if (activeUser) {
	        return _es6Promise2.default.reject(new _errors.ActiveUserError('An active user already exists. Please logout the active user before you login.'));
	      }

	      var credentials = username;
	      if ((0, _isObject2.default)(credentials)) {
	        options = password || {};
	      } else {
	        credentials = {
	          username: username,
	          password: password
	        };
	      }

	      if (!credentials[socialIdentityAttribute]) {
	        if (credentials.username) {
	          credentials.username = String(credentials.username).trim();
	        }

	        if (credentials.password) {
	          credentials.password = String(credentials.password).trim();
	        }
	      }

	      if ((!credentials.username || credentials.username === '' || !credentials.password || credentials.password === '') && !credentials[socialIdentityAttribute]) {
	        return _es6Promise2.default.reject(new _errors.KinveyError('Username and/or password missing. Please provide both a username and password to login.'));
	      }

	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.POST,
	        authType: _request.AuthType.App,
	        url: _url2.default.format({
	          protocol: this.client.apiProtocol,
	          host: this.client.apiHost,
	          pathname: this.pathname + '/login'
	        }),
	        body: credentials,
	        properties: options.properties,
	        timeout: options.timeout,
	        client: this.client
	      });
	      return request.execute().then(function (response) {
	        return response.data;
	      }).then(function (data) {
	        _this.data = data;
	        (0, _utils.setActiveUser)(_this.client, _this.data);
	        return _this;
	      });
	    }
	  }, {
	    key: 'loginWithMIC',
	    value: function loginWithMIC(redirectUri, authorizationGrant) {
	      var _this2 = this;

	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var isActiveUser = this.isActive();
	      if (isActiveUser) {
	        return _es6Promise2.default.reject(new _errors.ActiveUserError('This user is already the active user.'));
	      }

	      var activeUser = User.getActiveUser(this.client);
	      if (activeUser) {
	        return _es6Promise2.default.reject(new _errors.ActiveUserError('An active user already exists. Please logout the active user before you login.'));
	      }

	      var mic = new _social.MobileIdentityConnect({ client: this.client });
	      return mic.login(redirectUri, authorizationGrant, options).then(function (session) {
	        return _this2.connectIdentity(_social.MobileIdentityConnect.identity, session, options);
	      });
	    }
	  }, {
	    key: 'connectIdentity',
	    value: function connectIdentity(identity, session, options) {
	      var _this3 = this;

	      var isActive = this.isActive();
	      var data = this.data;
	      var socialIdentity = data[socialIdentityAttribute] || {};
	      socialIdentity[identity] = session;
	      data[socialIdentityAttribute] = socialIdentity;
	      this.data = data;

	      if (isActive) {
	        return this.update(data, options);
	      }

	      return this.login(data, options).then(function () {
	        (0, _utils.setIdentitySession)(_this3.client, identity, session);
	        return _this3;
	      }).catch(function (error) {
	        if (error instanceof _errors.NotFoundError) {
	          return _this3.signup(data, options).then(function () {
	            return _this3.connectIdentity(identity, session, options);
	          });
	        }

	        throw error;
	      });
	    }
	  }, {
	    key: 'connectWithIdentity',
	    value: function connectWithIdentity(identity, session, options) {
	      return this.connectIdentity(identity, session, options);
	    }
	  }, {
	    key: 'connectFacebook',
	    value: function connectFacebook(clientId, options) {
	      var _this4 = this;

	      var facebook = new _social.Facebook({ client: this.client });
	      return facebook.login(clientId, options).then(function (session) {
	        return _this4.connectIdentity(_social.Facebook.identity, session, options);
	      });
	    }
	  }, {
	    key: 'disconnectFacebook',
	    value: function disconnectFacebook(options) {
	      return this.disconnectIdentity(_social.Facebook.identity, options);
	    }
	  }, {
	    key: 'connectGoogle',
	    value: function connectGoogle(clientId, options) {
	      var _this5 = this;

	      var google = new _social.Google({ client: this.client });
	      return google.login(clientId, options).then(function (session) {
	        return _this5.connectIdentity(_social.Google.identity, session, options);
	      });
	    }
	  }, {
	    key: 'disconnectGoogle',
	    value: function disconnectGoogle(options) {
	      return this.disconnectIdentity(_social.Google.identity, options);
	    }
	  }, {
	    key: 'googleconnectLinkedIn',
	    value: function googleconnectLinkedIn(clientId, options) {
	      var _this6 = this;

	      var linkedIn = new _social.LinkedIn({ client: this.client });
	      return linkedIn.login(clientId, options).then(function (session) {
	        return _this6.connectIdentity(_social.LinkedIn.identity, session, options);
	      });
	    }
	  }, {
	    key: 'disconnectLinkedIn',
	    value: function disconnectLinkedIn(options) {
	      return this.disconnectIdentity(_social.LinkedIn.identity, options);
	    }
	  }, {
	    key: 'disconnectIdentity',
	    value: function disconnectIdentity(identity, options) {
	      var _this7 = this;

	      var promise = _es6Promise2.default.resolve();

	      if (identity === _social.Facebook.identity) {
	        promise = _social.Facebook.logout(this, options);
	      } else if (identity === _social.Google.identity) {
	        promise = _social.Google.logout(this, options);
	      } else if (identity === _social.LinkedIn.identity) {
	        promise = _social.LinkedIn.logout(this, options);
	      } else if (identity === _social.MobileIdentityConnect.identity) {
	        promise = _social.MobileIdentityConnect.logout(this, options);
	      }

	      return promise.catch(function (error) {
	        Log.error(error);
	      }).then(function () {
	        (0, _utils.setIdentitySession)(_this7.client, identity, null);
	        var data = _this7.data;
	        var socialIdentity = data[socialIdentityAttribute] || {};
	        delete socialIdentity[identity];
	        data[socialIdentityAttribute] = socialIdentity;
	        _this7.data = data;

	        if (!_this7[idAttribute]) {
	          return _this7;
	        }

	        return _this7.update(data, options);
	      }).then(function () {
	        return _this7;
	      });
	    }
	  }, {
	    key: 'logout',
	    value: function logout() {
	      var _this8 = this;

	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.POST,
	        authType: _request.AuthType.Session,
	        url: _url2.default.format({
	          protocol: this.client.apiProtocol,
	          host: this.client.apiHost,
	          pathname: this.pathname + '/_logout'
	        }),
	        properties: options.properties,
	        timeout: options.timeout,
	        client: this.client
	      });

	      return request.execute().catch(function (error) {
	        Log.error(error);
	      }).then(function () {
	        var identities = Object.keys(_this8._socialIdentity || {});
	        var promises = identities.map(function (identity) {
	          return _this8.disconnectIdentity(identity, options);
	        });
	        return _es6Promise2.default.all(promises);
	      }).catch(function (error) {
	        Log.error(error);
	      }).then(function () {
	        (0, _utils.setActiveUser)(_this8.client, null);
	        return _datastore.DataStore.clearCache({ client: _this8.client });
	      }).catch(function (error) {
	        Log.error(error);
	      }).then(function () {
	        return _this8;
	      });
	    }
	  }, {
	    key: 'signup',
	    value: function signup(data) {
	      var _this9 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      options = (0, _assign2.default)({
	        state: true
	      }, options);

	      if (options.state === true) {
	        var activeUser = User.getActiveUser(this.client);
	        if (activeUser) {
	          return _es6Promise2.default.reject(new _errors.ActiveUserError('An active user already exists. Please logout the active user before you login.'));
	        }
	      }

	      if (data instanceof User) {
	        data = data.data;
	      }

	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.POST,
	        authType: _request.AuthType.App,
	        url: _url2.default.format({
	          protocol: this.client.protocol,
	          host: this.client.host,
	          pathname: this.pathname
	        }),
	        body: (0, _isEmpty2.default)(data) ? null : data,
	        properties: options.properties,
	        timeout: options.timeout,
	        client: this.client
	      });

	      return request.execute().then(function (response) {
	        return response.data;
	      }).then(function (data) {
	        _this9.data = data;

	        if (options.state === true) {
	          (0, _utils.setActiveUser)(_this9.client, _this9.data);
	        }

	        return _this9;
	      });
	    }
	  }, {
	    key: 'signupWithIdentity',
	    value: function signupWithIdentity(identity, session, options) {
	      var data = {};
	      data[socialIdentityAttribute] = {};
	      data[socialIdentityAttribute][identity] = session;
	      return this.signup(data, options);
	    }
	  }, {
	    key: 'update',
	    value: function update(data, options) {
	      var _this10 = this;

	      data = (0, _assign2.default)(this.data, data);
	      var userStore = new _datastore.UserStore();
	      return userStore.update(data, options).then(function () {
	        if (_this10.isActive()) {
	          (0, _utils.setActiveUser)(_this10.client, _this10.data);
	        }

	        return _this10;
	      });
	    }
	  }, {
	    key: 'me',
	    value: function me() {
	      var _this11 = this;

	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.GET,
	        authType: _request.AuthType.Session,
	        url: _url2.default.format({
	          protocol: this.client.protocol,
	          host: this.client.host,
	          pathname: this.pathname + '/_me'
	        }),
	        properties: options.properties,
	        timeout: options.timeout
	      });

	      return request.execute().then(function (response) {
	        return response.data;
	      }).then(function (data) {
	        _this11.data = data;

	        if (!_this11.authtoken) {
	          var activeUser = User.getActiveUser(_this11.client);

	          if (activeUser) {
	            _this11.authtoken = activeUser.authtoken;
	          }
	        }

	        (0, _utils.setActiveUser)(_this11.client, _this11.data);
	        return _this11;
	      });
	    }
	  }, {
	    key: '_id',
	    get: function get() {
	      return this.data[idAttribute];
	    }
	  }, {
	    key: '_acl',
	    get: function get() {
	      return new _acl.Acl(this.data);
	    }
	  }, {
	    key: 'metadata',
	    get: function get() {
	      return new _metadata.Metadata(this.data);
	    },
	    set: function set(metadata) {
	      this.data[kmdAttribute] = (0, _result2.default)(metadata, 'toPlainObjecta', metadata);
	    }
	  }, {
	    key: '_kmd',
	    get: function get() {
	      return this.metadata;
	    },
	    set: function set(kmd) {
	      this.metadata = kmd;
	    }
	  }, {
	    key: '_socialIdentity',
	    get: function get() {
	      return this.data[socialIdentityAttribute];
	    }
	  }, {
	    key: 'authtoken',
	    get: function get() {
	      return this.metadata.authtoken;
	    },
	    set: function set(authtoken) {
	      var metadata = this.metadata;
	      metadata.authtoken = authtoken;
	      this.metadata = metadata;
	    }
	  }, {
	    key: 'username',
	    get: function get() {
	      return this.data[usernameAttribute];
	    }
	  }, {
	    key: 'email',
	    get: function get() {
	      return this.data[emailAttribute];
	    }
	  }, {
	    key: 'pathname',
	    get: function get() {
	      return '/' + usersNamespace + '/' + this.client.appKey;
	    }
	  }], [{
	    key: 'getActiveUser',
	    value: function getActiveUser() {
	      var client = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _client.Client.sharedInstance();

	      var data = client.activeUser;
	      var user = null;

	      if (data) {
	        user = new this(data);
	        user.client = client;
	      }

	      return user;
	    }
	  }, {
	    key: 'login',
	    value: function login(username, password, options) {
	      var user = new this({}, options);
	      return user.login(username, password, options);
	    }
	  }, {
	    key: 'loginWithMIC',
	    value: function loginWithMIC(redirectUri, authorizationGrant) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var user = new this({}, options);
	      return user.loginWithMIC(redirectUri, authorizationGrant, options);
	    }
	  }, {
	    key: 'connectIdentity',
	    value: function connectIdentity(identity, session, options) {
	      var user = new this({}, options);
	      return user.connectIdentity(identity, session, options);
	    }
	  }, {
	    key: 'connectFacebook',
	    value: function connectFacebook(clientId, options) {
	      var user = new this({}, options);
	      return user.connectFacebook(clientId, options);
	    }
	  }, {
	    key: 'connectGoogle',
	    value: function connectGoogle(clientId, options) {
	      var user = new this({}, options);
	      return user.connectGoogle(clientId, options);
	    }
	  }, {
	    key: 'connectLinkedIn',
	    value: function connectLinkedIn(clientId, options) {
	      var user = new this({}, options);
	      return user.connectLinkedIn(clientId, options);
	    }
	  }, {
	    key: 'logout',
	    value: function logout() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var user = User.getActiveUser(options.client);

	      if (user) {
	        return user.logout(options);
	      }

	      return null;
	    }
	  }, {
	    key: 'signup',
	    value: function signup(data, options) {
	      var user = new this({}, options);
	      return user.signup(data, options);
	    }
	  }, {
	    key: 'signupWithIdentity',
	    value: function signupWithIdentity(identity, session, options) {
	      var user = new this({}, options);
	      return user.signupWithIdentity(identity, session, options);
	    }
	  }, {
	    key: 'update',
	    value: function update(data, options) {
	      var user = User.getActiveUser(options.client);

	      if (user) {
	        return user.update(data, options);
	      }

	      return null;
	    }
	  }, {
	    key: 'me',
	    value: function me(options) {
	      var user = User.getActiveUser(options.client);

	      if (user) {
	        return user.me(options);
	      }

	      return null;
	    }
	  }, {
	    key: 'verifyEmail',
	    value: function verifyEmail(username) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      if (!username) {
	        return _es6Promise2.default.reject(new _errors.KinveyError('A username was not provided.', 'Please provide a username for the user that you would like to verify their email.'));
	      }

	      if (!(0, _isString2.default)(username)) {
	        return _es6Promise2.default.reject(new _errors.KinveyError('The provided username is not a string.'));
	      }

	      var client = options.client || _client.Client.sharedInstance();
	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.POST,
	        authType: _request.AuthType.App,
	        url: _url2.default.format({
	          protocol: client.protocol,
	          host: client.host,
	          pathname: '/' + rpcNamespace + '/' + client.appKey + '/' + username + '/user-email-verification-initiate'
	        }),
	        properties: options.properties,
	        timeout: options.timeout,
	        client: client
	      });
	      return request.execute().then(function (response) {
	        return response.data;
	      });
	    }
	  }, {
	    key: 'forgotUsername',
	    value: function forgotUsername(email) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      if (!email) {
	        return _es6Promise2.default.reject(new _errors.KinveyError('An email was not provided.', 'Please provide an email for the user that you would like to retrieve their username.'));
	      }

	      if (!(0, _isString2.default)(email)) {
	        return _es6Promise2.default.reject(new _errors.KinveyError('The provided email is not a string.'));
	      }

	      var client = options.client || _client.Client.sharedInstance();
	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.POST,
	        authType: _request.AuthType.App,
	        url: _url2.default.format({
	          protocol: client.protocol,
	          host: client.host,
	          pathname: '/' + rpcNamespace + '/' + client.appKey + '/user-forgot-username'
	        }),
	        properties: options.properties,
	        data: { email: email },
	        timeout: options.timeout,
	        client: client
	      });
	      return request.execute().then(function (response) {
	        return response.data;
	      });
	    }
	  }, {
	    key: 'resetPassword',
	    value: function resetPassword(username) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      if (!username) {
	        return _es6Promise2.default.reject(new _errors.KinveyError('A username was not provided.', 'Please provide a username for the user that you would like to verify their email.'));
	      }

	      if (!(0, _isString2.default)(username)) {
	        return _es6Promise2.default.reject(new _errors.KinveyError('The provided username is not a string.'));
	      }

	      var client = options.client || _client.Client.sharedInstance();
	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.POST,
	        authType: _request.AuthType.App,
	        url: _url2.default.format({
	          protocol: client.protocol,
	          host: client.host,
	          pathname: '/' + rpcNamespace + '/' + client.appKey + '/' + username + '/user-password-reset-initiate'
	        }),
	        properties: options.properties,
	        timeout: options.timeout,
	        client: client
	      });
	      return request.execute().then(function (response) {
	        return response.data;
	      });
	    }
	  }, {
	    key: 'exists',
	    value: function exists(username, options) {
	      var store = new _datastore.UserStore(options);
	      return store.exists(username, options);
	    }
	  }, {
	    key: 'restore',
	    value: function restore(id, options) {
	      var store = new _datastore.UserStore(options);
	      return store.restore(id, options);
	    }
	  }]);

	  return User;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(324),
	    baseFlatten = __webpack_require__(330),
	    baseIteratee = __webpack_require__(68),
	    baseRest = __webpack_require__(225),
	    isArrayLikeObject = __webpack_require__(129),
	    last = __webpack_require__(332);

	/**
	 * This method is like `_.difference` except that it accepts `iteratee` which
	 * is invoked for each element of `array` and `values` to generate the criterion
	 * by which they're compared. The order and references of result values are
	 * determined by the first array. The iteratee is invoked with one argument:
	 * (value).
	 *
	 * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...Array} [values] The values to exclude.
	 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 * @example
	 *
	 * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
	 * // => [1.2]
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
	 * // => [{ 'x': 2 }]
	 */
	var differenceBy = baseRest(function(array, values) {
	  var iteratee = last(values);
	  if (isArrayLikeObject(iteratee)) {
	    iteratee = undefined;
	  }
	  return isArrayLikeObject(array)
	    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), baseIteratee(iteratee, 2))
	    : [];
	});

	module.exports = differenceBy;


/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(114),
	    arrayIncludes = __webpack_require__(325),
	    arrayIncludesWith = __webpack_require__(329),
	    arrayMap = __webpack_require__(287),
	    baseUnary = __webpack_require__(147),
	    cacheHas = __webpack_require__(118);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of methods like `_.difference` without support
	 * for excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;

	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  }
	  else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;


/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(326);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;


/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(67),
	    baseIsNaN = __webpack_require__(327),
	    strictIndexOf = __webpack_require__(328);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
	}

	module.exports = baseIndexOf;


/***/ },
/* 327 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	module.exports = baseIsNaN;


/***/ },
/* 328 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;


/***/ },
/* 329 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arrayIncludesWith;


/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(307),
	    isFlattenable = __webpack_require__(331);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(120),
	    isArguments = __webpack_require__(128),
	    isArray = __webpack_require__(133);

	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	module.exports = isFlattenable;


/***/ },
/* 332 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(334),
	    baseFilter = __webpack_require__(335),
	    baseIteratee = __webpack_require__(68),
	    isArray = __webpack_require__(133);

	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * **Note:** Unlike `_.remove`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 * @see _.reject
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * _.filter(users, function(o) { return !o.active; });
	 * // => objects for ['fred']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.filter(users, { 'age': 36, 'active': true });
	 * // => objects for ['barney']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.filter(users, ['active', false]);
	 * // => objects for ['fred']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.filter(users, 'active');
	 * // => objects for ['barney']
	 */
	function filter(collection, predicate) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = filter;


/***/ },
/* 334 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(177);

	/**
	 * The base implementation of `_.filter` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function baseFilter(collection, predicate) {
	  var result = [];
	  baseEach(collection, function(value, index, collection) {
	    if (predicate(value, index, collection)) {
	      result.push(value);
	    }
	  });
	  return result;
	}

	module.exports = baseFilter;


/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(334),
	    baseRest = __webpack_require__(225),
	    baseXor = __webpack_require__(337),
	    isArrayLikeObject = __webpack_require__(129),
	    last = __webpack_require__(332);

	/**
	 * This method is like `_.xor` except that it accepts `comparator` which is
	 * invoked to compare elements of `arrays`. The order of result values is
	 * determined by the order they occur in the arrays. The comparator is invoked
	 * with two arguments: (arrVal, othVal).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 * @example
	 *
	 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
	 * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
	 *
	 * _.xorWith(objects, others, _.isEqual);
	 * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
	 */
	var xorWith = baseRest(function(arrays) {
	  var comparator = last(arrays);
	  if (isArrayLikeObject(comparator)) {
	    comparator = undefined;
	  }
	  return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
	});

	module.exports = xorWith;


/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(307),
	    baseDifference = __webpack_require__(324),
	    baseUniq = __webpack_require__(338);

	/**
	 * The base implementation of methods like `_.xor`, without support for
	 * iteratee shorthands, that accepts an array of arrays to inspect.
	 *
	 * @private
	 * @param {Array} arrays The arrays to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of values.
	 */
	function baseXor(arrays, iteratee, comparator) {
	  var index = -1,
	      length = arrays.length;

	  while (++index < length) {
	    var result = result
	      ? arrayPush(
	          baseDifference(result, arrays[index], iteratee, comparator),
	          baseDifference(arrays[index], result, iteratee, comparator)
	        )
	      : arrays[index];
	  }
	  return (result && result.length) ? baseUniq(result, iteratee, comparator) : [];
	}

	module.exports = baseXor;


/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(114),
	    arrayIncludes = __webpack_require__(325),
	    arrayIncludesWith = __webpack_require__(329),
	    cacheHas = __webpack_require__(118),
	    createSet = __webpack_require__(339),
	    setToArray = __webpack_require__(123);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function baseUniq(array, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      length = array.length,
	      isCommon = true,
	      result = [],
	      seen = result;

	  if (comparator) {
	    isCommon = false;
	    includes = arrayIncludesWith;
	  }
	  else if (length >= LARGE_ARRAY_SIZE) {
	    var set = iteratee ? null : createSet(array);
	    if (set) {
	      return setToArray(set);
	    }
	    isCommon = false;
	    includes = cacheHas;
	    seen = new SetCache;
	  }
	  else {
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	    else if (!includes(seen, computed, comparator)) {
	      if (seen !== result) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseUniq;


/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	var Set = __webpack_require__(142),
	    noop = __webpack_require__(340),
	    setToArray = __webpack_require__(123);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Creates a set object of `values`.
	 *
	 * @private
	 * @param {Array} values The values to add to the set.
	 * @returns {Object} Returns the new set.
	 */
	var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
	  return new Set(values);
	};

	module.exports = createSet;


/***/ },
/* 340 */
/***/ function(module, exports) {

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;


/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DataStore = exports.DataStoreType = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _request = __webpack_require__(236);

	var _errors = __webpack_require__(183);

	var _client = __webpack_require__(59);

	var _networkstore = __webpack_require__(291);

	var _cachestore = __webpack_require__(290);

	var _syncstore = __webpack_require__(342);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var appdataNamespace = process && process.env && process.env.KINVEY_DATASTORE_NAMESPACE || undefined || 'appdata';

	var DataStoreType = {
	  Cache: 'Cache',
	  Network: 'Network',
	  Sync: 'Sync'
	};
	Object.freeze(DataStoreType);
	exports.DataStoreType = DataStoreType;

	var DataStore = function () {
	  function DataStore() {
	    _classCallCheck(this, DataStore);

	    throw new _errors.KinveyError('Not allowed to construct a DataStore instance.' + ' Please use the collection() function to retrieve an instance of a DataStore instance.');
	  }

	  _createClass(DataStore, null, [{
	    key: 'collection',
	    value: function collection(_collection) {
	      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DataStoreType.Cache;
	      var options = arguments[2];

	      var store = void 0;

	      if (!_collection) {
	        throw new _errors.KinveyError('A collection is required.');
	      }

	      switch (type) {
	        case DataStoreType.Network:
	          store = new _networkstore.NetworkStore(_collection, options);
	          break;
	        case DataStoreType.Sync:
	          store = new _syncstore.SyncStore(_collection, options);
	          break;
	        case DataStoreType.Cache:
	        default:
	          store = new _cachestore.CacheStore(_collection, options);

	      }

	      return store;
	    }
	  }, {
	    key: 'getInstance',
	    value: function getInstance(collection, type, options) {
	      return this.collection(collection, type, options);
	    }
	  }, {
	    key: 'clearCache',
	    value: function clearCache() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var client = options.client || _client.Client.sharedInstance();
	      var pathname = '/' + appdataNamespace + '/' + client.appKey;
	      var request = new _request.CacheRequest({
	        method: _request.RequestMethod.DELETE,
	        url: _url2.default.format({
	          protocol: client.protocol,
	          host: client.host,
	          pathname: pathname,
	          query: options.query
	        }),
	        properties: options.properties,
	        timeout: options.timeout
	      });
	      return request.execute().then(function (response) {
	        return response.data;
	      });
	    }
	  }]);

	  return DataStore;
	}();

	exports.DataStore = DataStore;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SyncStore = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cachestore = __webpack_require__(290);

	var _request = __webpack_require__(236);

	var _errors = __webpack_require__(183);

	var _query = __webpack_require__(274);

	var _utils = __webpack_require__(185);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SyncStore = exports.SyncStore = function (_CacheStore) {
	  _inherits(SyncStore, _CacheStore);

	  function SyncStore() {
	    _classCallCheck(this, SyncStore);

	    return _possibleConstructorReturn(this, (SyncStore.__proto__ || Object.getPrototypeOf(SyncStore)).apply(this, arguments));
	  }

	  _createClass(SyncStore, [{
	    key: 'find',
	    value: function find(query) {
	      var _this2 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var stream = _utils.KinveyObservable.create(function (observer) {
	        if (query && !(query instanceof _query.Query)) {
	          return observer.error(new _errors.KinveyError('Invalid query. It must be an instance of the Query class.'));
	        }

	        var request = new _request.CacheRequest({
	          method: _request.RequestMethod.GET,
	          url: _url2.default.format({
	            protocol: _this2.client.protocol,
	            host: _this2.client.host,
	            pathname: _this2.pathname,
	            query: options.query
	          }),
	          properties: options.properties,
	          query: query,
	          timeout: options.timeout
	        });

	        return request.execute().then(function (response) {
	          return response.data;
	        }).then(function (data) {
	          return observer.next(data);
	        }).then(function () {
	          return observer.complete();
	        }).catch(function (error) {
	          return observer.error(error);
	        });
	      });

	      return stream;
	    }
	  }, {
	    key: 'findById',
	    value: function findById(id) {
	      var _this3 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var stream = _utils.KinveyObservable.create(function (observer) {
	        try {
	          var request = new _request.CacheRequest({
	            method: _request.RequestMethod.GET,
	            url: _url2.default.format({
	              protocol: _this3.client.protocol,
	              host: _this3.client.host,
	              pathname: _this3.pathname + '/' + id,
	              query: options.query
	            }),
	            properties: options.properties,
	            timeout: options.timeout
	          });

	          return request.execute().then(function (response) {
	            return response.data;
	          }).then(function (data) {
	            return observer.next(data);
	          }).then(function () {
	            return observer.complete();
	          }).catch(function (error) {
	            return observer.error(error);
	          });
	        } catch (error) {
	          return observer.error(error);
	        }
	      });

	      return stream;
	    }
	  }, {
	    key: 'count',
	    value: function count(query) {
	      var _this4 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var stream = _utils.KinveyObservable.create(function (observer) {
	        try {
	          if (query && !(query instanceof _query.Query)) {
	            throw new _errors.KinveyError('Invalid query. It must be an instance of the Query class.');
	          }

	          var request = new _request.CacheRequest({
	            method: _request.RequestMethod.GET,
	            url: _url2.default.format({
	              protocol: _this4.client.protocol,
	              host: _this4.client.host,
	              pathname: _this4.pathname,
	              query: options.query
	            }),
	            properties: options.properties,
	            query: query,
	            timeout: options.timeout
	          });

	          return request.execute().then(function (response) {
	            return response.data;
	          }).then(function (data) {
	            return observer.next(data ? data.length : 0);
	          }).then(function () {
	            return observer.complete();
	          }).catch(function (error) {
	            return observer.error(error);
	          });
	        } catch (error) {
	          return observer.error(error);
	        }
	      });

	      return stream;
	    }
	  }, {
	    key: 'syncAutomatically',
	    get: function get() {
	      return false;
	    }
	  }]);

	  return SyncStore;
	}(_cachestore.CacheStore);

/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FileStore = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _request = __webpack_require__(236);

	var _errors = __webpack_require__(183);

	var _networkstore = __webpack_require__(291);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	var _map = __webpack_require__(292);

	var _map2 = _interopRequireDefault(_map);

	var _assign = __webpack_require__(220);

	var _assign2 = _interopRequireDefault(_assign);

	var _isFunction = __webpack_require__(88);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	var _isNumber = __webpack_require__(249);

	var _isNumber2 = _interopRequireDefault(_isNumber);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var idAttribute = process && process.env && process.env.KINVEY_ID_ATTRIBUTE || undefined || '_id';
	var filesNamespace = process && process.env && process.env.KINVEY_FILES_NAMESPACE || undefined || 'blob';
	var MAX_BACKOFF = process && process.env && process.env.KINVEY_MAX_BACKOFF || undefined || 32 * 1000;
	var Log = console;

	function randomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	function getStartIndex(rangeHeader, max) {
	  var start = rangeHeader ? parseInt(rangeHeader.split('-')[1], 10) + 1 : 0;
	  return start >= max ? max - 1 : start;
	}

	var FileStore = exports.FileStore = function (_NetworkStore) {
	  _inherits(FileStore, _NetworkStore);

	  function FileStore() {
	    _classCallCheck(this, FileStore);

	    return _possibleConstructorReturn(this, (FileStore.__proto__ || Object.getPrototypeOf(FileStore)).apply(this, arguments));
	  }

	  _createClass(FileStore, [{
	    key: 'find',
	    value: function find(query) {
	      var _this2 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      options.query = options.query || {};
	      options.query.tls = options.tls === true;

	      if ((0, _isNumber2.default)(options.ttl)) {
	        options.query.ttl_in_seconds = options.ttl;
	      }

	      return _get(FileStore.prototype.__proto__ || Object.getPrototypeOf(FileStore.prototype), 'find', this).call(this, query, options).toPromise().then(function (files) {
	        if (options.download === true) {
	          return _es6Promise2.default.all((0, _map2.default)(files, function (file) {
	            return _this2.downloadByUrl(file._downloadURL, options);
	          }));
	        }

	        return files;
	      });
	    }
	  }, {
	    key: 'findById',
	    value: function findById(id, options) {
	      return this.download(id, options);
	    }
	  }, {
	    key: 'download',
	    value: function download(name) {
	      var _this3 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      options.query = options.query || {};
	      options.query.tls = options.tls === true;

	      if ((0, _isNumber2.default)(options.ttl)) {
	        options.query.ttl_in_seconds = options.ttl;
	      }

	      return _get(FileStore.prototype.__proto__ || Object.getPrototypeOf(FileStore.prototype), 'findById', this).call(this, name, options).toPromise().then(function (file) {
	        if (options.stream === true) {
	          return file;
	        }

	        options.mimeType = file.mimeType;
	        return _this3.downloadByUrl(file._downloadURL, options);
	      });
	    }
	  }, {
	    key: 'downloadByUrl',
	    value: function downloadByUrl(url) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var request = new _request.NetworkRequest({
	        method: _request.RequestMethod.GET,
	        url: url,
	        timeout: options.timeout
	      });
	      return request.execute().then(function (response) {
	        return response.data;
	      });
	    }
	  }, {
	    key: 'stream',
	    value: function stream(name) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      options.stream = true;
	      return this.download(name, options);
	    }
	  }, {
	    key: 'upload',
	    value: function upload(file) {
	      var _this4 = this;

	      var metadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      metadata = (0, _assign2.default)({
	        filename: file._filename || file.name,
	        public: false,
	        size: file.size || file.length,
	        mimeType: file.mimeType || file.type || 'application/octet-stream'
	      }, metadata);
	      metadata._filename = metadata.filename;
	      delete metadata.filename;
	      metadata._public = metadata.public;
	      delete metadata.public;

	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.POST,
	        authType: _request.AuthType.Default,
	        url: _url2.default.format({
	          protocol: this.client.protocol,
	          host: this.client.host,
	          pathname: this.pathname
	        }),
	        properties: options.properties,
	        timeout: options.timeout,
	        body: metadata,
	        client: this.client
	      });
	      request.headers.set('X-Kinvey-Content-Type', metadata.mimeType);

	      if (metadata[idAttribute]) {
	        request.method = _request.RequestMethod.PUT;
	        request.url = _url2.default.format({
	          protocol: this.client.protocol,
	          host: this.client.host,
	          pathname: this.pathname + '/' + metadata._id,
	          query: options.query
	        });
	      }

	      return request.execute().then(function (response) {
	        return response.data;
	      }).then(function (data) {
	        var uploadUrl = data._uploadURL;
	        var headers = new _request.Headers(data._requiredHeaders);
	        headers.set('content-type', metadata.mimeType);

	        delete data._expiresAt;
	        delete data._requiredHeaders;
	        delete data._uploadURL;

	        var statusCheckRequest = new _request.NetworkRequest({
	          method: _request.RequestMethod.PUT,
	          url: uploadUrl,
	          timeout: options.timeout
	        });
	        statusCheckRequest.headers.addAll(headers.toPlainObject());
	        statusCheckRequest.headers.set('Content-Length', '0');
	        statusCheckRequest.headers.set('Content-Range', 'bytes */' + metadata.size);
	        return statusCheckRequest.execute(true).then(function (statusCheckResponse) {
	          Log.debug('File upload status check response', statusCheckResponse);

	          if (statusCheckResponse.isSuccess() === false) {
	            if (statusCheckResponse.statusCode !== _request.StatusCode.ResumeIncomplete) {
	              throw statusCheckResponse.error;
	            }

	            options.start = getStartIndex(statusCheckResponse.headers.get('range'), metadata.size);
	            return _this4.uploadToGCS(uploadUrl, headers, file, metadata, options);
	          }

	          return file;
	        }).then(function (file) {
	          data._data = file;
	          return data;
	        });
	      });
	    }
	  }, {
	    key: 'uploadToGCS',
	    value: function uploadToGCS(uploadUrl, headers, file, metadata) {
	      var _this5 = this;

	      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

	      options = (0, _assign2.default)({
	        count: 0,
	        start: 0,
	        maxBackoff: MAX_BACKOFF
	      }, options);

	      Log.debug('Start file upload');
	      Log.debug('File upload upload url', uploadUrl);
	      Log.debug('File upload headers', headers.toPlainObject());
	      Log.debug('File upload file', file);
	      Log.debug('File upload metadata', metadata);
	      Log.debug('File upload options', options);

	      var fileSlice = (0, _isFunction2.default)(file.slice) ? file.slice(options.start) : file;
	      var fileSliceSize = fileSlice.size || fileSlice.length;

	      var request = new _request.NetworkRequest({
	        method: _request.RequestMethod.PUT,
	        url: uploadUrl,
	        body: fileSlice,
	        timeout: options.timeout
	      });
	      request.headers.addAll(headers.toPlainObject());
	      request.headers.set('Content-Length', fileSliceSize);
	      request.headers.set('Content-Range', 'bytes ' + options.start + '-' + (metadata.size - 1) + '/' + metadata.size);
	      return request.execute(true).then(function (response) {
	        Log.debug('File upload response', response);

	        if (response.isSuccess() === false) {
	          if (response.statusCode === _request.StatusCode.ResumeIncomplete) {
	            Log.debug('File upload was incomplete. Trying to upload the remaining protion of the file.');
	            options.start = getStartIndex(response.headers.get('range'), metadata.size);
	            return _this5.uploadToGCS(uploadUrl, headers, file, metadata, options);
	          } else if (response.statusCode >= 500 && response.statusCode < 600) {
	            var _ret = function () {
	              Log.debug('File upload error.', response.statusCode);

	              var backoff = Math.pow(2, options.count) + randomInt(1000, 1);

	              if (backoff >= options.maxBackoff) {
	                throw response.error;
	              }

	              Log.debug('File upload will try again in ' + backoff + ' seconds.');

	              return {
	                v: new _es6Promise2.default(function (resolve) {
	                  setTimeout(function () {
	                    options.count += 1;
	                    resolve(_this5.uploadToGCS(uploadUrl, headers, file, metadata, options));
	                  }, backoff);
	                })
	              };
	            }();

	            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	          }

	          throw response.error;
	        }

	        return file;
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(file, metadata, options) {
	      return this.upload(file, metadata, options);
	    }
	  }, {
	    key: 'update',
	    value: function update(file, metadata, options) {
	      return this.upload(file, metadata, options);
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      throw new _errors.KinveyError('Please use removeById() to remove files one by one.');
	    }
	  }, {
	    key: 'pathname',
	    get: function get() {
	      return '/' + filesNamespace + '/' + this.client.appKey;
	    }
	  }]);

	  return FileStore;
	}(_networkstore.NetworkStore);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UserStore = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _request = __webpack_require__(236);

	var _errors = __webpack_require__(183);

	var _networkstore = __webpack_require__(291);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _url = __webpack_require__(215);

	var _url2 = _interopRequireDefault(_url);

	var _isArray = __webpack_require__(133);

	var _isArray2 = _interopRequireDefault(_isArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var usersNamespace = process && process.env && process.env.KINVEY_USERS_NAMESPACE || undefined || 'user';
	var rpcNamespace = process && process.env && process.env.KINVEY_RPC_NAMESPACE || undefined || 'rpc';
	var idAttribute = process && process.env && process.env.KINVEY_ID_ATTRIBUTE || undefined || '_id';

	var UserStore = exports.UserStore = function (_NetworkStore) {
	  _inherits(UserStore, _NetworkStore);

	  function UserStore(options) {
	    _classCallCheck(this, UserStore);

	    return _possibleConstructorReturn(this, (UserStore.__proto__ || Object.getPrototypeOf(UserStore)).call(this, null, options));
	  }

	  _createClass(UserStore, [{
	    key: 'create',
	    value: function create() {
	      return _es6Promise2.default.reject(new _errors.KinveyError('Please use `User.signup()` to create a user.'));
	    }
	  }, {
	    key: 'update',
	    value: function update(data) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      if (!data) {
	        return _es6Promise2.default.reject(new _errors.KinveyError('No user was provided to be updated.'));
	      }

	      if ((0, _isArray2.default)(data)) {
	        return _es6Promise2.default.reject(new _errors.KinveyError('Only one user can be updated at one time.', data));
	      }

	      if (!data[idAttribute]) {
	        return _es6Promise2.default.ject(new _errors.KinveyError('User must have an _id.'));
	      }

	      return _get(UserStore.prototype.__proto__ || Object.getPrototypeOf(UserStore.prototype), 'update', this).call(this, data, options);
	    }
	  }, {
	    key: 'exists',
	    value: function exists(username) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.POST,
	        authType: _request.AuthType.App,
	        url: _url2.default.format({
	          protocol: this.client.protocol,
	          host: this.client.host,
	          pathname: '/' + rpcNamespace + '/' + this.client.appKey + '/check-username-exists'
	        }),
	        properties: options.properties,
	        data: { username: username },
	        timeout: options.timeout,
	        client: this.client
	      });
	      return request.execute().then(function (response) {
	        return response.data;
	      }).then(function () {
	        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        return data.usernameExists === true;
	      });
	    }
	  }, {
	    key: 'restore',
	    value: function restore(id) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var request = new _request.KinveyRequest({
	        method: _request.RequestMethod.POST,
	        authType: _request.AuthType.Master,
	        url: _url2.default.format({
	          protocol: this.client.protocol,
	          host: this.client.host,
	          pathname: this.pathname + '/' + id
	        }),
	        properties: options.properties,
	        timeout: options.timeout,
	        client: this.client
	      });
	      return request.execute().then(function (response) {
	        return response.data;
	      });
	    }
	  }, {
	    key: 'pathname',
	    get: function get() {
	      return '/' + usersNamespace + '/' + this.client.appKey;
	    }
	  }]);

	  return UserStore;
	}(_networkstore.NetworkStore);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NetworkRack = exports.CacheRack = undefined;

	var _rack = __webpack_require__(346);

	// Export
	exports.CacheRack = _rack.CacheRack;
	exports.NetworkRack = _rack.NetworkRack;

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NetworkRack = exports.CacheRack = undefined;

	var _rack = __webpack_require__(60);

	var _rack2 = _interopRequireDefault(_rack);

	var _serialize = __webpack_require__(347);

	var _serialize2 = _interopRequireDefault(_serialize);

	var _parse = __webpack_require__(348);

	var _parse2 = _interopRequireDefault(_parse);

	var _middleware = __webpack_require__(349);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CacheRack = exports.CacheRack = function (_Rack) {
	  _inherits(CacheRack, _Rack);

	  function CacheRack() {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Cache Rack';

	    _classCallCheck(this, CacheRack);

	    var _this = _possibleConstructorReturn(this, (CacheRack.__proto__ || Object.getPrototypeOf(CacheRack)).call(this, name));

	    _this.use(new _middleware.CacheMiddleware());
	    return _this;
	  }

	  return CacheRack;
	}(_rack2.default);

	var NetworkRack = exports.NetworkRack = function (_Rack2) {
	  _inherits(NetworkRack, _Rack2);

	  function NetworkRack() {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Network Rack';

	    _classCallCheck(this, NetworkRack);

	    var _this2 = _possibleConstructorReturn(this, (NetworkRack.__proto__ || Object.getPrototypeOf(NetworkRack)).call(this, name));

	    _this2.use(new _serialize2.default());
	    _this2.use(new _middleware.HttpMiddleware());
	    _this2.use(new _parse2.default());
	    return _this2;
	  }

	  return NetworkRack;
	}(_rack2.default);

/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _middleware = __webpack_require__(62);

	var _middleware2 = _interopRequireDefault(_middleware);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SerializeMiddleware = function (_Middleware) {
	  _inherits(SerializeMiddleware, _Middleware);

	  function SerializeMiddleware() {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Serialize Middleware';

	    _classCallCheck(this, SerializeMiddleware);

	    return _possibleConstructorReturn(this, (SerializeMiddleware.__proto__ || Object.getPrototypeOf(SerializeMiddleware)).call(this, name));
	  }

	  _createClass(SerializeMiddleware, [{
	    key: 'handle',
	    value: function handle(request) {
	      if (request && request.body) {
	        var contentType = request.headers['content-type'] || request.headers['Content-Type'];

	        if (contentType) {
	          if (contentType.indexOf('application/json') === 0) {
	            request.body = JSON.stringify(request.body);
	          } else if (contentType.indexOf('application/x-www-form-urlencoded') === 0) {
	            var body = request.body;
	            var keys = Object.keys(body);
	            var str = [];

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	              for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var key = _step.value;

	                str.push(global.encodeURIComponent(key) + '=' + global.encodeURIComponent(body[key]));
	              }
	            } catch (err) {
	              _didIteratorError = true;
	              _iteratorError = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                  _iterator.return();
	                }
	              } finally {
	                if (_didIteratorError) {
	                  throw _iteratorError;
	                }
	              }
	            }

	            request.body = str.join('&');
	          }
	        }
	      }

	      return _es6Promise2.default.resolve({ request: request });
	    }
	  }]);

	  return SerializeMiddleware;
	}(_middleware2.default);

	exports.default = SerializeMiddleware;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _middleware = __webpack_require__(62);

	var _middleware2 = _interopRequireDefault(_middleware);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ParseMiddleware = function (_Middleware) {
	  _inherits(ParseMiddleware, _Middleware);

	  function ParseMiddleware() {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Parse Middleware';

	    _classCallCheck(this, ParseMiddleware);

	    return _possibleConstructorReturn(this, (ParseMiddleware.__proto__ || Object.getPrototypeOf(ParseMiddleware)).call(this, name));
	  }

	  _createClass(ParseMiddleware, [{
	    key: 'handle',
	    value: function handle(request, response) {
	      if (response && response.data) {
	        var contentType = response.headers['content-type'] || response.headers['Content-Type'];

	        if (contentType) {
	          if (contentType.indexOf('application/json') === 0) {
	            try {
	              response.data = JSON.parse(response.data);
	            } catch (error) {}
	          }
	        }
	      }

	      return _es6Promise2.default.resolve({ response: response });
	    }
	  }]);

	  return ParseMiddleware;
	}(_middleware2.default);

	exports.default = ParseMiddleware;

/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HttpMiddleware = exports.CacheMiddleware = undefined;

	var _cache = __webpack_require__(350);

	var _cache2 = _interopRequireDefault(_cache);

	var _http = __webpack_require__(366);

	var _http2 = _interopRequireDefault(_http);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Export
	exports.CacheMiddleware = _cache2.default;
	exports.HttpMiddleware = _http2.default;

/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cache = __webpack_require__(351);

	var _cache2 = _interopRequireDefault(_cache);

	var _storage = __webpack_require__(362);

	var _storage2 = _interopRequireDefault(_storage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CacheMiddleware = function (_NodeCacheMiddleware) {
	  _inherits(CacheMiddleware, _NodeCacheMiddleware);

	  function CacheMiddleware() {
	    _classCallCheck(this, CacheMiddleware);

	    return _possibleConstructorReturn(this, (CacheMiddleware.__proto__ || Object.getPrototypeOf(CacheMiddleware)).apply(this, arguments));
	  }

	  _createClass(CacheMiddleware, [{
	    key: 'openStorage',
	    value: function openStorage(name) {
	      return new _storage2.default(name);
	    }
	  }]);

	  return CacheMiddleware;
	}(_cache2.default);

	exports.default = CacheMiddleware;

/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _errors = __webpack_require__(352);

	var _middleware = __webpack_require__(62);

	var _middleware2 = _interopRequireDefault(_middleware);

	var _storage = __webpack_require__(354);

	var _storage2 = _interopRequireDefault(_storage);

	var _isEmpty = __webpack_require__(271);

	var _isEmpty2 = _interopRequireDefault(_isEmpty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CacheMiddleware = function (_Middleware) {
	  _inherits(CacheMiddleware, _Middleware);

	  function CacheMiddleware() {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Cache Middleware';

	    _classCallCheck(this, CacheMiddleware);

	    return _possibleConstructorReturn(this, (CacheMiddleware.__proto__ || Object.getPrototypeOf(CacheMiddleware)).call(this, name));
	  }

	  _createClass(CacheMiddleware, [{
	    key: 'openStorage',
	    value: function openStorage(name) {
	      return new _storage2.default(name);
	    }
	  }, {
	    key: 'handle',
	    value: function handle(request) {
	      var method = request.method;
	      var body = request.body;
	      var appKey = request.appKey;
	      var collection = request.collection;
	      var entityId = request.entityId;
	      var encryptionKey = request.encryptionKey;

	      var storage = this.openStorage(appKey, encryptionKey);
	      var promise = void 0;

	      if (method === 'GET') {
	        if (entityId) {
	          promise = storage.findById(collection, entityId);
	        } else {
	          promise = storage.find(collection);
	        }
	      } else if (method === 'POST' || method === 'PUT') {
	        promise = storage.save(collection, body);
	      } else if (method === 'DELETE') {
	        if (collection && entityId) {
	          promise = storage.removeById(collection, entityId);
	        } else if (!collection) {
	          promise = storage.clear();
	        } else {
	          promise = storage.remove(collection, body);
	        }
	      }

	      return promise.then(function (data) {
	        var response = {
	          statusCode: method === 'POST' ? 201 : 200,
	          data: data
	        };

	        if (!data || (0, _isEmpty2.default)(data)) {
	          response.statusCode = 204;
	        }

	        return response;
	      }).catch(function (error) {
	        var response = {};

	        if (error instanceof _errors.NotFoundError) {
	          response.statusCode = 404;
	        } else {
	          response.statusCode = 500;
	        }

	        return response;
	      }).then(function (response) {
	        return { response: response };
	      });
	    }
	  }]);

	  return CacheMiddleware;
	}(_middleware2.default);

	exports.default = CacheMiddleware;

/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NotFoundError = undefined;

	var _notfound = __webpack_require__(353);

	var _notfound2 = _interopRequireDefault(_notfound);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.NotFoundError = _notfound2.default;

/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _es6Error = __webpack_require__(184);

	var _es6Error2 = _interopRequireDefault(_es6Error);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NotFoundError = function (_ExtendableError) {
	  _inherits(NotFoundError, _ExtendableError);

	  function NotFoundError() {
	    _classCallCheck(this, NotFoundError);

	    return _possibleConstructorReturn(this, (NotFoundError.__proto__ || Object.getPrototypeOf(NotFoundError)).apply(this, arguments));
	  }

	  return NotFoundError;
	}(_es6Error2.default);

	exports.default = NotFoundError;

/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _errors = __webpack_require__(352);

	var _memory = __webpack_require__(355);

	var _memory2 = _interopRequireDefault(_memory);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _promiseQueue = __webpack_require__(359);

	var _promiseQueue2 = _interopRequireDefault(_promiseQueue);

	var _isString = __webpack_require__(234);

	var _isString2 = _interopRequireDefault(_isString);

	var _isArray = __webpack_require__(133);

	var _isArray2 = _interopRequireDefault(_isArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var idAttribute = process && process.env && process.env.KINVEY_ID_ATTRIBUTE || undefined || '_id';
	var kmdAttribute = process && process.env && process.env.KINVEY_KMD_ATTRIBUTE || undefined || '_kmd';
	_promiseQueue2.default.configure(_es6Promise2.default);
	var queue = new _promiseQueue2.default(1, Infinity);

	var StorageAdapter = {
	  Memory: 'Memory'
	};
	Object.freeze(StorageAdapter);

	var Storage = function () {
	  function Storage(name) {
	    _classCallCheck(this, Storage);

	    if (!name) {
	      throw new Error('Unable to create a Storage instance without a name.');
	    }

	    if (!(0, _isString2.default)(name)) {
	      throw new Error('The name is not a string. A name must be a string to create a Storage instance.');
	    }

	    this.name = name;
	  }

	  _createClass(Storage, [{
	    key: 'generateObjectId',
	    value: function generateObjectId() {
	      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 24;

	      var chars = 'abcdef0123456789';
	      var objectId = '';

	      for (var i = 0, j = chars.length; i < length; i += 1) {
	        var pos = Math.floor(Math.random() * j);
	        objectId += chars.substring(pos, pos + 1);
	      }

	      return objectId;
	    }
	  }, {
	    key: 'find',
	    value: function find(collection) {
	      return this.adapter.find(collection).catch(function (error) {
	        if (error instanceof _errors.NotFoundError) {
	          return [];
	        }

	        throw error;
	      }).then(function () {
	        var entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	        return entities;
	      });
	    }
	  }, {
	    key: 'findById',
	    value: function findById(collection, id) {
	      if (!(0, _isString2.default)(id)) {
	        return _es6Promise2.default.reject(new Error('id must be a string', id));
	      }

	      return this.adapter.findById(collection, id);
	    }
	  }, {
	    key: 'save',
	    value: function save(collection) {
	      var _this = this;

	      var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      return queue.add(function () {
	        var singular = false;

	        if (!entities) {
	          return _es6Promise2.default.resolve(null);
	        }

	        if (!(0, _isArray2.default)(entities)) {
	          singular = true;
	          entities = [entities];
	        }

	        entities = entities.map(function (entity) {
	          var id = entity[idAttribute];
	          var kmd = entity[kmdAttribute] || {};

	          if (!id) {
	            id = _this.generateObjectId();
	            kmd.local = true;
	          }

	          entity[idAttribute] = id;
	          entity[kmdAttribute] = kmd;
	          return entity;
	        });

	        return _this.adapter.save(collection, entities).then(function (entities) {
	          if (singular && entities.length > 0) {
	            return entities[0];
	          }

	          return entities;
	        });
	      });
	    }
	  }, {
	    key: 'remove',
	    value: function remove(collection) {
	      var _this2 = this;

	      var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      return _es6Promise2.default.all(entities.map(function (entity) {
	        return _this2.removeById(collection, entity[idAttribute]);
	      })).then(function (responses) {
	        return responses.reduce(function (entities, entity) {
	          entities.push(entity);
	          return entities;
	        }, []);
	      });
	    }
	  }, {
	    key: 'removeById',
	    value: function removeById(collection, id) {
	      var _this3 = this;

	      return queue.add(function () {
	        if (!id) {
	          return _es6Promise2.default.resolve(undefined);
	        }

	        if (!(0, _isString2.default)(id)) {
	          return _es6Promise2.default.resolve(new Error('id must be a string', id));
	        }

	        return _this3.adapter.removeById(collection, id);
	      });
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      var _this4 = this;

	      return queue.add(function () {
	        return _this4.adapter.clear();
	      });
	    }
	  }, {
	    key: 'adapter',
	    get: function get() {
	      var _this5 = this;

	      var adapter = void 0;

	      [StorageAdapter.Memory].some(function (adapter) {
	        switch (adapter) {
	          case StorageAdapter.Memory:
	            if (_memory2.default.isSupported()) {
	              adapter = new _memory2.default(_this5.name);
	              return true;
	            }

	            break;
	          default:
	        }

	        return false;
	      });

	      return adapter;
	    }
	  }]);

	  return Storage;
	}();

	exports.default = Storage;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 355 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _errors = __webpack_require__(352);

	var _fastMemoryCache = __webpack_require__(356);

	var _fastMemoryCache2 = _interopRequireDefault(_fastMemoryCache);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _keyBy = __webpack_require__(280);

	var _keyBy2 = _interopRequireDefault(_keyBy);

	var _forEach = __webpack_require__(191);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _values = __webpack_require__(285);

	var _values2 = _interopRequireDefault(_values);

	var _find = __webpack_require__(357);

	var _find2 = _interopRequireDefault(_find);

	var _isString = __webpack_require__(234);

	var _isString2 = _interopRequireDefault(_isString);

	var _isArray = __webpack_require__(133);

	var _isArray2 = _interopRequireDefault(_isArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var idAttribute = process && process.env && process.env.KINVEY_ID_ATTRIBUTE || undefined || '_id';
	var caches = {};

	var Memory = function () {
	  function Memory(name) {
	    _classCallCheck(this, Memory);

	    if (!name) {
	      throw new Error('A name for the collection is required to use the memory persistence adapter.', name);
	    }

	    if (!(0, _isString2.default)(name)) {
	      throw new Error('The name of the collection must be a string to use the memory persistence adapter', name);
	    }

	    this.name = name;
	    this.cache = caches[name];

	    if (!this.cache) {
	      this.cache = new _fastMemoryCache2.default();
	      caches[name] = this.cache;
	    }
	  }

	  _createClass(Memory, [{
	    key: 'find',
	    value: function find(collection) {
	      try {
	        var entities = this.cache.get(collection);

	        if (entities) {
	          return _es6Promise2.default.resolve(JSON.parse(entities));
	        }

	        return _es6Promise2.default.resolve([]);
	      } catch (error) {
	        return _es6Promise2.default.reject(error);
	      }
	    }
	  }, {
	    key: 'findById',
	    value: function findById(collection, id) {
	      var _this = this;

	      return this.find(collection).then(function (entities) {
	        var entity = (0, _find2.default)(entities, function (entity) {
	          return entity[idAttribute] === id;
	        });

	        if (!entity) {
	          throw new _errors.NotFoundError('An entity with _id = ' + id + ' was not found in the ' + collection + (' collection on the ' + _this.name + ' memory database.'));
	        }

	        return entity;
	      });
	    }
	  }, {
	    key: 'save',
	    value: function save(collection, entities) {
	      var _this2 = this;

	      var singular = false;

	      if (!(0, _isArray2.default)(entities)) {
	        entities = [entities];
	        singular = true;
	      }

	      if (entities.length === 0) {
	        return _es6Promise2.default.resolve(entities);
	      }

	      return this.find(collection).then(function (existingEntities) {
	        existingEntities = (0, _keyBy2.default)(existingEntities, idAttribute);
	        entities = (0, _keyBy2.default)(entities, idAttribute);
	        var entityIds = Object.keys(entities);

	        (0, _forEach2.default)(entityIds, function (id) {
	          existingEntities[id] = entities[id];
	        });

	        _this2.cache.set(collection, JSON.stringify((0, _values2.default)(existingEntities)));

	        entities = (0, _values2.default)(entities);
	        return singular ? entities[0] : entities;
	      });
	    }
	  }, {
	    key: 'removeById',
	    value: function removeById(collection, id) {
	      var _this3 = this;

	      return this.find(collection).then(function (entities) {
	        entities = (0, _keyBy2.default)(entities, idAttribute);
	        var entity = entities[id];

	        if (!entity) {
	          throw new _errors.NotFoundError('An entity with _id = ' + id + ' was not found in the ' + collection + (' collection on the ' + _this3.name + ' memory database.'));
	        }

	        delete entities[id];
	        _this3.cache.set(collection, JSON.stringify((0, _values2.default)(entities)));

	        return entity;
	      });
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.cache.clear();
	      return _es6Promise2.default.resolve(null);
	    }
	  }], [{
	    key: 'isSupported',
	    value: function isSupported() {
	      return true;
	    }
	  }]);

	  return Memory;
	}();

	exports.default = Memory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 356 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Provides in-memory cache.
	 *
	 * @name MemoryCache
	 * @constructor
	 */
	function MemoryCache() {
	    this._cache = createMap();
	    this._timeouts = createMap();
	}

	/**
	 * Returns cache value for the specified key.
	 *
	 * @param {String} key
	 * @returns {*} Value or `undefined` if value does not exist.
	 */
	MemoryCache.prototype.get = function (key) {
	    return this._cache[key];
	};

	/**
	 * Assigns value for the specified key.
	 *
	 * @param {String} key
	 * @param {*} value
	 * @param {Number} [expireTime=0] The length of time in seconds. After this time has expired, the
	 *      value will be automatically deleted. 0 means that time never expire.
	 */
	MemoryCache.prototype.set = function (key, value, expireTime) {
	    this.delete(key);
	    this._cache[key] = value;
	    if (expireTime) {
	        this._timeouts[key] = setTimeout(this.delete.bind(this, key), expireTime * 1000);
	    }
	};

	/**
	 * Deletes value for the specified key.
	 *
	 * @param {String} key
	 */
	MemoryCache.prototype.delete = function (key) {
	    delete this._cache[key];
	    if (key in this._timeouts) {
	        clearTimeout(this._timeouts[key]);
	        delete this._timeouts[key];
	    }
	};

	/**
	 * Clears the whole cache storage.
	 */
	MemoryCache.prototype.clear = function () {
	    this._cache = createMap();
	    for (var key in this._timeouts) {
	        clearTimeout(this._timeouts[key]);
	    }
	    this._timeouts = createMap();
	};

	/**
	 * Creates a new object without a prototype. This object is useful for lookup without having to
	 * guard against prototypically inherited properties via hasOwnProperty.
	 *
	 * @returns {Object}
	 */
	function createMap() {
	    return Object.create(null);
	}

	module.exports = MemoryCache;


/***/ },
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	var createFind = __webpack_require__(358),
	    findIndex = __webpack_require__(66);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to inspect.
	 * @param {Function} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	var find = createFind(findIndex);

	module.exports = find;


/***/ },
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(68),
	    isArrayLike = __webpack_require__(130),
	    keys = __webpack_require__(125);

	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} findIndexFunc The function to find the collection index.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(findIndexFunc) {
	  return function(collection, predicate, fromIndex) {
	    var iterable = Object(collection);
	    if (!isArrayLike(collection)) {
	      var iteratee = baseIteratee(predicate, 3);
	      collection = keys(collection);
	      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
	    }
	    var index = findIndexFunc(collection, predicate, fromIndex);
	    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
	  };
	}

	module.exports = createFind;


/***/ },
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {module.exports = process.env.PROMISE_QUEUE_COVERAGE ?
	    __webpack_require__(360) :
	    __webpack_require__(361);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 360 */
/***/ function(module, exports) {

	

/***/ },
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, Promise */
	(function (root, factory) {
	    'use strict';
	    if (typeof module === 'object' && module.exports && "function" === 'function') {
	        // CommonJS
	        module.exports = factory();
	    } else if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        // Browser globals
	        root.Queue = factory();
	    }
	})
	(this, function () {
	    'use strict';

	    /**
	     * @return {Object}
	     */
	    var LocalPromise = typeof Promise !== 'undefined' ? Promise : function () {
	        return {
	            then: function () {
	                throw new Error('Queue.configure() before use Queue');
	            }
	        };
	    };

	    var noop = function () {};

	    /**
	     * @param {*} value
	     * @returns {LocalPromise}
	     */
	    var resolveWith = function (value) {
	        if (value && typeof value.then === 'function') {
	            return value;
	        }

	        return new LocalPromise(function (resolve) {
	            resolve(value);
	        });
	    };

	    /**
	     * It limits concurrently executed promises
	     *
	     * @param {Number} [maxPendingPromises=Infinity] max number of concurrently executed promises
	     * @param {Number} [maxQueuedPromises=Infinity]  max number of queued promises
	     * @constructor
	     *
	     * @example
	     *
	     * var queue = new Queue(1);
	     *
	     * queue.add(function () {
	     *     // resolve of this promise will resume next request
	     *     return downloadTarballFromGithub(url, file);
	     * })
	     * .then(function (file) {
	     *     doStuffWith(file);
	     * });
	     *
	     * queue.add(function () {
	     *     return downloadTarballFromGithub(url, file);
	     * })
	     * // This request will be paused
	     * .then(function (file) {
	     *     doStuffWith(file);
	     * });
	     */
	    function Queue(maxPendingPromises, maxQueuedPromises) {
	        this.pendingPromises = 0;
	        this.maxPendingPromises = typeof maxPendingPromises !== 'undefined' ? maxPendingPromises : Infinity;
	        this.maxQueuedPromises = typeof maxQueuedPromises !== 'undefined' ? maxQueuedPromises : Infinity;
	        this.queue = [];
	    }

	    /**
	     * Defines promise promiseFactory
	     * @param {Function} GlobalPromise
	     */
	    Queue.configure = function (GlobalPromise) {
	        LocalPromise = GlobalPromise;
	    };

	    /**
	     * @param {Function} promiseGenerator
	     * @return {LocalPromise}
	     */
	    Queue.prototype.add = function (promiseGenerator) {
	        var self = this;
	        return new LocalPromise(function (resolve, reject, notify) {
	            // Do not queue to much promises
	            if (self.queue.length >= self.maxQueuedPromises) {
	                reject(new Error('Queue limit reached'));
	                return;
	            }

	            // Add to queue
	            self.queue.push({
	                promiseGenerator: promiseGenerator,
	                resolve: resolve,
	                reject: reject,
	                notify: notify || noop
	            });

	            self._dequeue();
	        });
	    };

	    /**
	     * Number of simultaneously running promises (which are resolving)
	     *
	     * @return {number}
	     */
	    Queue.prototype.getPendingLength = function () {
	        return this.pendingPromises;
	    };

	    /**
	     * Number of queued promises (which are waiting)
	     *
	     * @return {number}
	     */
	    Queue.prototype.getQueueLength = function () {
	        return this.queue.length;
	    };

	    /**
	     * @returns {boolean} true if first item removed from queue
	     * @private
	     */
	    Queue.prototype._dequeue = function () {
	        var self = this;
	        if (this.pendingPromises >= this.maxPendingPromises) {
	            return false;
	        }

	        // Remove from queue
	        var item = this.queue.shift();
	        if (!item) {
	            return false;
	        }

	        try {
	            this.pendingPromises++;

	            resolveWith(item.promiseGenerator())
	            // Forward all stuff
	                .then(function (value) {
	                    // It is not pending now
	                    self.pendingPromises--;
	                    // It should pass values
	                    item.resolve(value);
	                    self._dequeue();
	                }, function (err) {
	                    // It is not pending now
	                    self.pendingPromises--;
	                    // It should not mask errors
	                    item.reject(err);
	                    self._dequeue();
	                }, function (message) {
	                    // It should pass notifications
	                    item.notify(message);
	                });
	        } catch (err) {
	            self.pendingPromises--;
	            item.reject(err);
	            self._dequeue();

	        }

	        return true;
	    };

	    return Queue;
	});


/***/ },
/* 362 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _storage = __webpack_require__(354);

	var _storage2 = _interopRequireDefault(_storage);

	var _memory = __webpack_require__(355);

	var _memory2 = _interopRequireDefault(_memory);

	var _titaniumdb = __webpack_require__(363);

	var _titaniumdb2 = _interopRequireDefault(_titaniumdb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var StorageAdapter = {
	  Memory: 'Memory',
	  TitaniumDB: 'TitaniumDB'
	};
	Object.freeze(StorageAdapter);

	var Storage = function (_NodeStorage) {
	  _inherits(Storage, _NodeStorage);

	  function Storage() {
	    _classCallCheck(this, Storage);

	    return _possibleConstructorReturn(this, (Storage.__proto__ || Object.getPrototypeOf(Storage)).apply(this, arguments));
	  }

	  _createClass(Storage, [{
	    key: 'adapter',
	    get: function get() {
	      var name = this.name;
	      var adapter = void 0;

	      [StorageAdapter.TitaniumDB, StorageAdapter.Memory].some(function (adapter) {
	        switch (adapter) {
	          case StorageAdapter.TitaniumDB:
	            if (_titaniumdb2.default.isSupported()) {
	              adapter = new _titaniumdb2.default(name);
	              return true;
	            }

	            break;
	          case StorageAdapter.Memory:
	            if (_memory2.default.isSupported()) {
	              adapter = new _memory2.default(name);
	              return true;
	            }

	            break;
	          default:
	        }

	        return false;
	      });

	      return adapter;
	    }
	  }]);

	  return Storage;
	}(_storage2.default);

	exports.default = Storage;

/***/ },
/* 363 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _errors = __webpack_require__(364);

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _map = __webpack_require__(292);

	var _map2 = _interopRequireDefault(_map);

	var _isArray = __webpack_require__(133);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _isFunction = __webpack_require__(88);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var idAttribute = process.env.KINVEY_ID_ATTRIBUTE || '_id';

	var TitaniumDB = function () {
	  function TitaniumDB() {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'kinvey';

	    _classCallCheck(this, TitaniumDB);

	    this.name = name;
	  }

	  _createClass(TitaniumDB, [{
	    key: 'execute',
	    value: function execute(collection, query, parameters) {
	      var _this = this;

	      var escapedCollection = '"' + collection + '"';
	      var isMulti = (0, _isArray2.default)(query);
	      query = isMulti ? query : [[query, parameters]];

	      try {
	        if (!this.db) {
	          this.db = global.Titanium.Database.open(this.name);
	        }

	        // Start a transaction
	        this.db.execute('BEGIN TRANSACTION');

	        // Create the table if it does not exist yet
	        this.db.execute('CREATE TABLE IF NOT EXISTS ' + escapedCollection + ' ' + '(key BLOB PRIMARY KEY NOT NULL, value BLOB NOT NULL)');

	        // Execute queries
	        var response = (0, _map2.default)(query, function (parts) {
	          var sql = parts[0].replace('#{collection}', escapedCollection);
	          var cursor = _this.db.execute(sql, parts[1]);
	          var response = { rowCount: _this.db.getRowsAffected(), result: null };

	          if (cursor) {
	            response.result = [];

	            while (cursor.isValidRow()) {
	              var entity = JSON.parse(cursor.fieldByName('value'));
	              response.result.push(entity);
	              cursor.next();
	            }

	            cursor.close();
	          }

	          return response;
	        });

	        // Commit the transaction
	        this.db.execute('COMMIT TRANSACTION');

	        return _es6Promise2.default.resolve(isMulti ? response : response.shift());
	      } catch (error) {
	        return _es6Promise2.default.reject(error);
	      }
	    }
	  }, {
	    key: 'find',
	    value: function find(collection) {
	      var sql = 'SELECT value FROM #{collection}';
	      var promise = this.execute(collection, sql, []).then(function (response) {
	        return response.result;
	      }).catch(function (error) {
	        if (error instanceof _errors.NotFoundError) {
	          return [];
	        }

	        throw error;
	      });
	      return promise;
	    }
	  }, {
	    key: 'findById',
	    value: function findById(collection, id) {
	      var _this2 = this;

	      var sql = 'SELECT value FROM #{collection} WHERE key = ?';
	      var promise = this.execute(collection, sql, [id]).then(function (response) {
	        var entities = response.result;

	        if (entities.length === 0) {
	          throw new _errors.NotFoundError('An entity with _id = ' + id + ' was not found in the ' + collection + ' ' + ('collection on the ' + _this2.name + ' webSQL database.'));
	        }

	        return entities[0];
	      });
	      return promise;
	    }
	  }, {
	    key: 'save',
	    value: function save(collection, entities) {
	      var queries = [];
	      entities = (0, _map2.default)(entities, function (entity) {
	        queries.push(['INSERT OR REPLACE INTO #{collection} (key, value) VALUES (?, ?)', [entity[idAttribute], JSON.stringify(entity)]]);

	        return entity;
	      });

	      var promise = this.execute(collection, queries, null).then(function () {
	        return entities;
	      });
	      return promise;
	    }
	  }, {
	    key: 'removeById',
	    value: function removeById(collection, id) {
	      var _this3 = this;

	      var promise = this.execute(collection, [['SELECT value FROM #{collection} WHERE key = ?', [id]], ['DELETE FROM #{collection} WHERE key = ?', [id]]], null).then(function (response) {
	        var entities = response[0].result;
	        var count = response[1].rowCount || entities.length;

	        if (count === 0) {
	          throw new _errors.NotFoundError('An entity with _id = ' + id + ' was not found in the ' + collection + ' ' + ('collection on the ' + _this3.name + ' webSQL database.'));
	        }

	        return {
	          count: 1,
	          entities: entities
	        };
	      });

	      return promise;
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      if (!this.db) {
	        this.db = global.Titanium.Database.open(this.name);
	      }

	      if ((0, _isFunction2.default)(this.db.remove)) {
	        // Android
	        this.db.remove();
	        return _es6Promise2.default.resolve(null);
	      }

	      if (this.db.file && this.db.file.deleteFile()) {
	        // iOS
	        return _es6Promise2.default.resolve(null);
	      }

	      return _es6Promise2.default.reject(new Error('The ability to delete the database is not implemented for this platform.'));
	    }
	  }], [{
	    key: 'isSupported',
	    value: function isSupported() {
	      return typeof global.Titanium !== 'undefined' && typeof global.Titanium.Database !== 'undefined';
	    }
	  }]);

	  return TitaniumDB;
	}();

	exports.default = TitaniumDB;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58), (function() { return this; }())))

/***/ },
/* 364 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NotFoundError = undefined;

	var _notfound = __webpack_require__(365);

	var _notfound2 = _interopRequireDefault(_notfound);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Export
	exports.NotFoundError = _notfound2.default;

/***/ },
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _es6Error = __webpack_require__(184);

	var _es6Error2 = _interopRequireDefault(_es6Error);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NotFoundError = function (_ExtendableError) {
	  _inherits(NotFoundError, _ExtendableError);

	  function NotFoundError() {
	    _classCallCheck(this, NotFoundError);

	    return _possibleConstructorReturn(this, (NotFoundError.__proto__ || Object.getPrototypeOf(NotFoundError)).apply(this, arguments));
	  }

	  return NotFoundError;
	}(_es6Error2.default);

	exports.default = NotFoundError;

/***/ },
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _middleware = __webpack_require__(62);

	var _middleware2 = _interopRequireDefault(_middleware);

	var _network = __webpack_require__(367);

	var _network2 = _interopRequireDefault(_network);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HttpMiddleware = function (_Middleware) {
	  _inherits(HttpMiddleware, _Middleware);

	  function HttpMiddleware() {
	    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Http Middleware';

	    _classCallCheck(this, HttpMiddleware);

	    return _possibleConstructorReturn(this, (HttpMiddleware.__proto__ || Object.getPrototypeOf(HttpMiddleware)).call(this, name));
	  }

	  _createClass(HttpMiddleware, [{
	    key: 'openHttp',
	    value: function openHttp() {
	      return new _network2.default();
	    }
	  }, {
	    key: 'handle',
	    value: function handle(request, response) {
	      var http = this.openHttp();
	      return http.handle(request, response);
	    }
	  }]);

	  return HttpMiddleware;
	}(_middleware2.default);

	exports.default = HttpMiddleware;

/***/ },
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _titanium = __webpack_require__(368);

	var _titanium2 = _interopRequireDefault(_titanium);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Enum for Http Adapters.
	 */
	var HttpAdapter = {
	  Titanium: 'Titanium'
	};
	Object.freeze(HttpAdapter);

	var Http = function () {
	  function Http() {
	    _classCallCheck(this, Http);
	  }

	  _createClass(Http, [{
	    key: 'handle',
	    value: function handle(request, response) {
	      if (!this.adapter) {
	        return _es6Promise2.default.reject(new Error('Unable to handle the request. An adapter is not specified.'));
	      }

	      return this.adapter.handle(request, response);
	    }
	  }, {
	    key: 'adapter',
	    get: function get() {
	      if (_titanium2.default.isSupported()) {
	        return new _titanium2.default();
	      }
	    }
	  }]);

	  return Http;
	}();

	exports.default = Http;

/***/ },
/* 368 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _es6Promise = __webpack_require__(64);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	var _parseHeaders = __webpack_require__(369);

	var _parseHeaders2 = _interopRequireDefault(_parseHeaders);

	var _isFunction = __webpack_require__(88);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var defaultTimeout = process.env.KINVEY_TITANIUM_DEFAULT_TIMEOUT || 10000;

	var TitaniumHttp = function () {
	  function TitaniumHttp() {
	    _classCallCheck(this, TitaniumHttp);
	  }

	  _createClass(TitaniumHttp, [{
	    key: 'handle',
	    value: function handle(request) {
	      var promise = new _es6Promise2.default(function (resolve, reject) {
	        var url = request.url;
	        var method = request.method;
	        var headers = request.headers;
	        var body = request.body;
	        var autoRedirect = request.autoRedirect;

	        // Create an HTTP Client

	        var client = global.Titanium.Network.createHTTPClient();

	        // Open the request
	        client.open(method, url);

	        // Set request headers
	        var keys = Object.keys(headers);
	        for (var i = 0, len = keys.length; i < len; i += 1) {
	          var key = keys[i];
	          client.setRequestHeader(key, headers[key]);
	        }

	        // Set autoRedirect flag
	        client.autoRedirect = autoRedirect || true;

	        // Set the TLS version (iOS only)
	        if ((0, _isFunction2.default)(client.setTlsVersion) && global.Titanium.Network.TLS_VERSION_1_2) {
	          client.setTlsVersion(global.Titanium.Network.TLS_VERSION_1_2);
	        }

	        // Set timeout
	        client.timeout = request.timeout || defaultTimeout;

	        // onload listener
	        client.onload = function onLoad() {
	          resolve({
	            response: {
	              statusCode: this.status,
	              headers: (0, _parseHeaders2.default)(this.allResponseHeaders),
	              data: this.responseText
	            }
	          });
	        };

	        // onerror listener
	        client.onerror = function onError(e) {
	          reject(e.error);
	        };

	        // Send request
	        client.send(body);
	      });

	      // Return the promise
	      return promise;
	    }
	  }], [{
	    key: 'isSupported',
	    value: function isSupported() {
	      return typeof global.Titanium !== 'undefined' && typeof global.Titanium.Network !== 'undefined';
	    }
	  }]);

	  return TitaniumHttp;
	}();

	exports.default = TitaniumHttp;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58), (function() { return this; }())))

/***/ },
/* 369 */
/***/ function(module, exports, __webpack_require__) {

	var trim = __webpack_require__(370)
	  , forEach = __webpack_require__(371)
	  , isArray = function(arg) {
	      return Object.prototype.toString.call(arg) === '[object Array]';
	    }

	module.exports = function (headers) {
	  if (!headers)
	    return {}

	  var result = {}

	  forEach(
	      trim(headers).split('\n')
	    , function (row) {
	        var index = row.indexOf(':')
	          , key = trim(row.slice(0, index)).toLowerCase()
	          , value = trim(row.slice(index + 1))

	        if (typeof(result[key]) === 'undefined') {
	          result[key] = value
	        } else if (isArray(result[key])) {
	          result[key].push(value)
	        } else {
	          result[key] = [ result[key], value ]
	        }
	      }
	  )

	  return result
	}

/***/ },
/* 370 */
/***/ function(module, exports) {

	
	exports = module.exports = trim;

	function trim(str){
	  return str.replace(/^\s*|\s*$/g, '');
	}

	exports.left = function(str){
	  return str.replace(/^\s*/, '');
	};

	exports.right = function(str){
	  return str.replace(/\s*$/, '');
	};


/***/ },
/* 371 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(372)

	module.exports = forEach

	var toString = Object.prototype.toString
	var hasOwnProperty = Object.prototype.hasOwnProperty

	function forEach(list, iterator, context) {
	    if (!isFunction(iterator)) {
	        throw new TypeError('iterator must be a function')
	    }

	    if (arguments.length < 3) {
	        context = this
	    }
	    
	    if (toString.call(list) === '[object Array]')
	        forEachArray(list, iterator, context)
	    else if (typeof list === 'string')
	        forEachString(list, iterator, context)
	    else
	        forEachObject(list, iterator, context)
	}

	function forEachArray(array, iterator, context) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (hasOwnProperty.call(array, i)) {
	            iterator.call(context, array[i], i, array)
	        }
	    }
	}

	function forEachString(string, iterator, context) {
	    for (var i = 0, len = string.length; i < len; i++) {
	        // no such thing as a sparse string.
	        iterator.call(context, string.charAt(i), i, string)
	    }
	}

	function forEachObject(object, iterator, context) {
	    for (var k in object) {
	        if (hasOwnProperty.call(object, k)) {
	            iterator.call(context, object[k], k, object)
	        }
	    }
	}


/***/ },
/* 372 */
/***/ function(module, exports) {

	module.exports = isFunction

	var toString = Object.prototype.toString

	function isFunction (fn) {
	  var string = toString.call(fn)
	  return string === '[object Function]' ||
	    (typeof fn === 'function' && string !== '[object RegExp]') ||
	    (typeof window !== 'undefined' &&
	     // IE8 and below
	     (fn === window.setTimeout ||
	      fn === window.alert ||
	      fn === window.confirm ||
	      fn === window.prompt))
	};


/***/ },
/* 373 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _package = __webpack_require__(374);

	var _package2 = _interopRequireDefault(_package);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// export function isTitanium() {
	//   return typeof Titanium !== 'undefined';
	// }

	// export function isiOS() {
	//   if (isTitanium()) {
	//     return Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad';
	//   }

	//   return /iPad|iPhone|iPod/.test(global.navigator.userAgent) && !window.MSStream;
	// }

	// export function isAndroid() {
	//   if (isTitanium()) {
	//     return Titanium.Platform.osname === 'android';
	//   }

	//   return /Android/.test(global.navigator.userAgent);
	// }

	// export function isBrowser() {
	//   if (isTitanium()) {
	//     return Titanium.Platform.name === 'mobileweb';
	//   }

	//   return !isiOS() && !isAndroid();
	// }

	// Helper function to detect the browser name and version.
	function browserDetect(ua) {
	  // Cast arguments.
	  ua = ua.toLowerCase();

	  // User-Agent patterns.
	  var rChrome = /(chrome)\/([\w]+)/;
	  var rFirefox = /(firefox)\/([\w.]+)/;
	  var rIE = /(msie) ([\w.]+)/i;
	  var rOpera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
	  var rSafari = /(safari)\/([\w.]+)/;

	  return rChrome.exec(ua) || rFirefox.exec(ua) || rIE.exec(ua) || rOpera.exec(ua) || rSafari.exec(ua) || [];
	}

	function deviceInformation() {
	  var id = global.Titanium.Platform.getId();
	  var browser = void 0;
	  var platform = void 0;
	  var version = void 0;
	  var manufacturer = void 0;
	  var libraries = [];

	  // Platforms.
	  libraries.push('titanium/' + global.Titanium.getVersion());

	  // If mobileweb, extract browser information.
	  if (global.Titanium.Platform.getName() === 'mobileweb') {
	    browser = browserDetect(global.Titanium.Platform.getModel());
	    platform = browser[1];
	    version = browser[2];
	    manufacturer = global.Titanium.Platform.getOstype();
	  } else {
	    platform = global.Titanium.Platform.getOsname();
	    version = global.Titanium.Platform.getVersion();
	    manufacturer = global.Titanium.Platform.getManufacturer();
	  }

	  // Return the device information string.
	  var parts = ['js-' + _package2.default.name + '/' + _package2.default.version];

	  if (libraries.length !== 0) {
	    // Add external library information.
	    parts.push('(' + libraries.sort().join(', ') + ')');
	  }

	  return parts.concat([platform, version, manufacturer, id]).map(function (part) {
	    if (part) {
	      return part.toString().replace(/\s/g, '_').toLowerCase();
	    }

	    return 'unknown';
	  }).join(' ');
	}

	var Device = function () {
	  function Device() {
	    _classCallCheck(this, Device);
	  }

	  _createClass(Device, null, [{
	    key: 'toString',
	    value: function toString() {
	      return deviceInformation();
	    }
	  }]);

	  return Device;
	}();

	exports.default = Device;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 374 */
/***/ function(module, exports) {

	module.exports = {
		"name": "kinvey-titanium-sdk",
		"version": "3.1.0",
		"description": "Kinvey JavaScript SDK for Titanium applications.",
		"homepage": "http://www.kinvey.com",
		"bugs": {
			"url": "https://github.com/Kinvey/titanium-sdk/issues"
		},
		"license": "Apache-2.0",
		"author": "Kinvey",
		"contributors": [
			"Thomas Conner <thomas@kinvey.com>"
		],
		"main": "./dist/index.js",
		"es6": true,
		"repository": {
			"type": "git",
			"url": "git@github.com:Kinvey/kinvey-titanium-sdk"
		},
		"scripts": {
			"build": "npm run clean && npm run transpile && npm run bundle && npm run minify",
			"bundle": "webpack",
			"clean": "del coverage dist s3",
			"minify": "uglifyjs --screw-ie8 --compress warnings=false --mangle --comments --output ./dist/kinvey-titanium-sdk.min.js -- ./dist/kinvey-titanium-sdk.js ",
			"cover": "istanbul cover _mocha -- --compilers js:babel-core/register -r babel-polyfill -s 100 --recursive test/unit/setup test/unit",
			"docs": "esdoc -c esdoc.json",
			"lint": "npm run lint:src",
			"lint:src": "eslint src/**",
			"lint:test": "eslint test/unit/**",
			"preversion": "npm test",
			"postversion": "git push && git push --tags",
			"s3": "shjs ./scripts/before_deploy.js",
			"test": "mocha --compilers js:babel-core/register -r babel-polyfill -s 100 --recursive test/unit/setup test/unit",
			"test:watch": "mocha -w --compilers js:babel-core/register -r babel-polyfill -s 100 --recursive test/unit/setup test/unit",
			"transpile": "babel src --out-dir dist",
			"version": "npm run build && git add -A dist"
		},
		"dependencies": {
			"babel-core": "^6.9.0",
			"babel-eslint": "^6.0.0",
			"babel-plugin-inline-dotenv": "^1.1.1",
			"babel-polyfill": "^6.9.0",
			"babel-preset-es2015": "^6.9.0",
			"babel-preset-stage-2": "^6.0.15",
			"babel-register": "^6.9.0",
			"del-cli": "^0.2.0",
			"es6-error": "^3.2.0",
			"es6-promise": "git+https://git@github.com/ThomasConner/es6-promise.git",
			"eslint": "^3.5.0",
			"eslint-config-airbnb-base": "^7.1.0",
			"eslint-plugin-import": "^1.15.0",
			"expect": "^1.20.2",
			"express": "^4.14.0",
			"istanbul": "^1.0.0-alpha.2",
			"json-loader": "^0.5.4",
			"kinvey-node-sdk": "../../Node/SDK",
			"lodash": "^4.16.2",
			"mocha": "^2.5.3",
			"nock": "^8.0.0",
			"parse-headers": "^2.0.1",
			"protractor": "^4.0.8",
			"shelljs": "^0.7.4",
			"uglify-js": "^2.7.3",
			"webdriver-manager": "^10.2.3",
			"webpack": "^1.13.0"
		},
		"peerDependencies": {
			"kinvey-node-sdk": "../../Node/SDK"
		},
		"engines": {
			"node": ">=4.0"
		},
		"keywords": [
			"Kinvey",
			"JavaScript",
			"Titanium"
		]
	};

/***/ }
/******/ ])
});
;