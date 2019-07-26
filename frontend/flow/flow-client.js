function client(){
  var $wnd_0 = window, $doc_0 = document, gwtOnLoad_0, bodyDone, base = '', metaProps = {}, values = [], providers = [], answers = [], softPermutationId = 0, onLoadErrorFunc, propertyErrorFunc;
  if (!$wnd_0.__gwt_stylesLoaded) {
    $wnd_0.__gwt_stylesLoaded = {};
  }
  if (!$wnd_0.__gwt_scriptsLoaded) {
    $wnd_0.__gwt_scriptsLoaded = {};
  }
  function isHostedMode(){
    var result = false;
    try {
      var query = $wnd_0.location.search;
      return (query.indexOf('gwt.codesvr=') != -1 || (query.indexOf('gwt.hosted=') != -1 || $wnd_0.external && $wnd_0.external.gwtOnLoad)) && query.indexOf('gwt.hybrid') == -1;
    }
     catch (e) {
    }
    isHostedMode = function(){
      return result;
    }
    ;
    return result;
  }

  function maybeStartModule(){
    if (gwtOnLoad_0 && bodyDone) {
      gwtOnLoad_0(onLoadErrorFunc, 'client', base, softPermutationId);
    }
  }

  function computeScriptBase(){
    function getDirectoryOfFile(path){
      var hashIndex = path.lastIndexOf('#');
      if (hashIndex == -1) {
        hashIndex = path.length;
      }
      var queryIndex = path.indexOf('?');
      if (queryIndex == -1) {
        queryIndex = path.length;
      }
      var slashIndex = path.lastIndexOf('/', Math.min(queryIndex, hashIndex));
      return slashIndex >= 0?path.substring(0, slashIndex + 1):'';
    }

    function ensureAbsoluteUrl(url_0){
      if (url_0.match(/^\w+:\/\//)) {
      }
       else {
        var img = $doc_0.createElement('img');
        img.src = url_0 + 'clear.cache.gif';
        url_0 = getDirectoryOfFile(img.src);
      }
      return url_0;
    }

    function tryMetaTag(){
      var metaVal = __gwt_getMetaProperty('baseUrl');
      if (metaVal != null) {
        return metaVal;
      }
      return '';
    }

    function tryNocacheJsTag(){
      var scriptTags = $doc_0.getElementsByTagName('script');
      for (var i = 0; i < scriptTags.length; ++i) {
        if (scriptTags[i].src.indexOf('client.nocache.js') != -1) {
          return getDirectoryOfFile(scriptTags[i].src);
        }
      }
      return '';
    }

    function tryBaseTag(){
      var baseElements = $doc_0.getElementsByTagName('base');
      if (baseElements.length > 0) {
        return baseElements[baseElements.length - 1].href;
      }
      return '';
    }

    function isLocationOk(){
      var loc = $doc_0.location;
      return loc.href == loc.protocol + '//' + loc.host + loc.pathname + loc.search + loc.hash;
    }

    var tempBase = tryMetaTag();
    if (tempBase == '') {
      tempBase = tryNocacheJsTag();
    }
    if (tempBase == '') {
      tempBase = tryBaseTag();
    }
    if (tempBase == '' && isLocationOk()) {
      tempBase = getDirectoryOfFile($doc_0.location.href);
    }
    tempBase = ensureAbsoluteUrl(tempBase);
    return tempBase;
  }

  function processMetas(){
    var metas = document.getElementsByTagName('meta');
    for (var i = 0, n = metas.length; i < n; ++i) {
      var meta = metas[i], name_0 = meta.getAttribute('name'), content_0;
      if (name_0) {
        if (name_0 == 'gwt:property') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            var value_0, eq = content_0.indexOf('=');
            if (eq >= 0) {
              name_0 = content_0.substring(0, eq);
              value_0 = content_0.substring(eq + 1);
            }
             else {
              name_0 = content_0;
              value_0 = '';
            }
            metaProps[name_0] = value_0;
          }
        }
         else if (name_0 == 'gwt:onPropertyErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {
              propertyErrorFunc = eval(content_0);
            }
             catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onPropertyErrorFn"');
            }
          }
        }
         else if (name_0 == 'gwt:onLoadErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {
              onLoadErrorFunc = eval(content_0);
            }
             catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onLoadErrorFn"');
            }
          }
        }
      }
    }
  }

  __gwt_isKnownPropertyValue = function(propName, propValue){
    return propValue in values[propName];
  }
  ;
  __gwt_getMetaProperty = function(name_0){
    var value_0 = metaProps[name_0];
    return value_0 == null?null:value_0;
  }
  ;
  function unflattenKeylistIntoAnswers(propValArray, value_0){
    var answer = answers;
    for (var i = 0, n = propValArray.length - 1; i < n; ++i) {
      answer = answer[propValArray[i]] || (answer[propValArray[i]] = []);
    }
    answer[propValArray[n]] = value_0;
  }

  function computePropValue(propName){
    var value_0 = providers[propName](), allowedValuesMap = values[propName];
    if (value_0 in allowedValuesMap) {
      return value_0;
    }
    var allowedValuesList = [];
    for (var k in allowedValuesMap) {
      allowedValuesList[allowedValuesMap[k]] = k;
    }
    if (propertyErrorFunc) {
      propertyErrorFunc(propName, allowedValuesList, value_0);
    }
    throw null;
  }

  providers['user.agent'] = function(){
    var ua = navigator.userAgent.toLowerCase();
    var docMode = $doc_0.documentMode;
    if (function(){
      return ua.indexOf('webkit') != -1;
    }
    ())
      return 'safari';
    if (function(){
      return ua.indexOf('msie') != -1 && (docMode >= 10 && docMode < 11);
    }
    ())
      return 'ie10';
    if (function(){
      return ua.indexOf('msie') != -1 && (docMode >= 9 && docMode < 11);
    }
    ())
      return 'ie9';
    if (function(){
      return ua.indexOf('msie') != -1 && (docMode >= 8 && docMode < 11);
    }
    ())
      return 'ie8';
    if (function(){
      return ua.indexOf('gecko') != -1 || docMode >= 11;
    }
    ())
      return 'gecko1_8';
    return 'safari';
  }
  ;
  values['user.agent'] = {'gecko1_8':0, 'ie10':1, 'ie8':2, 'ie9':3, 'safari':4};
  client.onScriptLoad = function(gwtOnLoadFunc){
    client = null;
    gwtOnLoad_0 = gwtOnLoadFunc;
    maybeStartModule();
  }
  ;
  if (isHostedMode()) {
    alert('Single-script hosted mode not yet implemented. See issue ' + 'http://code.google.com/p/google-web-toolkit/issues/detail?id=2079');
    return;
  }
  computeScriptBase();
  processMetas();
  try {
    var strongName;
    unflattenKeylistIntoAnswers(['gecko1_8'], '180318F1B2ADDFEA28A75BEFB2BE5D42');
    unflattenKeylistIntoAnswers(['safari'], '180318F1B2ADDFEA28A75BEFB2BE5D42' + ':1');
    strongName = answers[computePropValue('user.agent')];
    var idx = strongName.indexOf(':');
    if (idx != -1) {
      softPermutationId = Number(strongName.substring(idx + 1));
    }
  }
   catch (e) {
    return;
  }
  var onBodyDoneTimerId;
  function onBodyDone(){
    if (!bodyDone) {
      bodyDone = true;
      maybeStartModule();
      if ($doc_0.removeEventListener) {
        $doc_0.removeEventListener('DOMContentLoaded', onBodyDone, false);
      }
      if (onBodyDoneTimerId) {
        clearInterval(onBodyDoneTimerId);
      }
    }
  }

  if ($doc_0.addEventListener) {
    $doc_0.addEventListener('DOMContentLoaded', function(){
      onBodyDone();
    }
    , false);
  }
  var onBodyDoneTimerId = setInterval(function(){
    if (/loaded|complete/.test($doc_0.readyState)) {
      onBodyDone();
    }
  }
  , 50);
}

client();
(function () {var $gwt_version = "2.8.2";var $wnd = window;var $doc = $wnd.document;var $moduleName, $moduleBase;var $stats = $wnd.__gwtStatsEvent ? function(a) {$wnd.__gwtStatsEvent(a)} : null;var $strongName = '180318F1B2ADDFEA28A75BEFB2BE5D42';var $intern_0 = {4:1}, $intern_1 = {4:1, 7:1, 5:1}, $intern_2 = {48:1}, $intern_3 = {16:1}, $intern_4 = {41:1}, $intern_5 = {19:1}, $intern_6 = {13:1}, $intern_7 = {49:1}, $intern_8 = {71:1}, $intern_9 = {40:1}, $intern_10 = {70:1}, $intern_11 = {4:1, 30:1}, $intern_12 = {85:1}, $intern_13 = {29:1};
var _, prototypesByTypeId_0, initFnList_0, permutationId = -1;
function setGwtProperty(propertyName, propertyValue){
  typeof window === 'object' && typeof window['$gwt'] === 'object' && (window['$gwt'][propertyName] = propertyValue);
}

function gwtOnLoad_0(errFn, modName, modBase, softPermutationId){
  ensureModuleInit();
  var initFnList = initFnList_0;
  $moduleName = modName;
  $moduleBase = modBase;
  permutationId = softPermutationId;
  function initializeModules(){
    for (var i_0 = 0; i_0 < initFnList.length; i_0++) {
      initFnList[i_0]();
    }
  }

  if (errFn) {
    try {
      $entry(initializeModules)();
    }
     catch (e) {
      errFn(modName, e);
    }
  }
   else {
    $entry(initializeModules)();
  }
}

function ensureModuleInit(){
  initFnList_0 == null && (initFnList_0 = []);
}

function addInitFunctions(){
  ensureModuleInit();
  var initFnList = initFnList_0;
  for (var i_0 = 0; i_0 < arguments.length; i_0++) {
    initFnList.push(arguments[i_0]);
  }
}

function typeMarkerFn(){
}

function toString_2(object){
  var number;
  if (Array.isArray(object) && object.typeMarker === typeMarkerFn) {
    return $getName(getClass__Ljava_lang_Class___devirtual$(object)) + '@' + (number = hashCode__I__devirtual$(object) >>> 0 , number.toString(16));
  }
  return object.toString();
}

function portableObjCreate(obj){
  function F(){
  }

  ;
  F.prototype = obj || {};
  return new F;
}

function makeLambdaFunction(samMethod, ctor, ctorArguments){
  var lambda = function(){
    return samMethod.apply(lambda, arguments);
  }
  ;
  ctor.apply(lambda, ctorArguments);
  return lambda;
}

function emptyMethod(){
}

function defineClass(typeId, superTypeIdOrPrototype, castableTypeMap){
  var prototypesByTypeId = prototypesByTypeId_0, superPrototype;
  var prototype_0 = prototypesByTypeId[typeId];
  var clazz = prototype_0 instanceof Array?prototype_0[0]:null;
  if (prototype_0 && !clazz) {
    _ = prototype_0;
  }
   else {
    _ = (superPrototype = superTypeIdOrPrototype && superTypeIdOrPrototype.prototype , !superPrototype && (superPrototype = prototypesByTypeId_0[superTypeIdOrPrototype]) , portableObjCreate(superPrototype));
    _.castableTypeMap = castableTypeMap;
    !superTypeIdOrPrototype && (_.typeMarker = typeMarkerFn);
    prototypesByTypeId[typeId] = _;
  }
  for (var i_0 = 3; i_0 < arguments.length; ++i_0) {
    arguments[i_0].prototype = _;
  }
  clazz && (_.___clazz = clazz);
}

function bootstrap(){
  prototypesByTypeId_0 = {};
  !Array.isArray && (Array.isArray = function(vArg){
    return Object.prototype.toString.call(vArg) === '[object Array]';
  }
  );
  function now_0(){
    return (new Date).getTime();
  }

  !Date.now && (Date.now = now_0);
}

bootstrap();
function Object_0(){
}

function equals_Ljava_lang_Object__Z__devirtual$(this$static, other){
  return instanceOfString(this$static)?$equals_0(this$static, other):instanceOfDouble(this$static)?(checkCriticalNotNull(this$static) , this$static === other):instanceOfBoolean(this$static)?(checkCriticalNotNull(this$static) , this$static === other):hasJavaObjectVirtualDispatch(this$static)?this$static.equals_0(other):isJavaArray(this$static)?this$static === other:!!this$static && !!this$static.equals?this$static.equals(other):maskUndefined(this$static) === maskUndefined(other);
}

function getClass__Ljava_lang_Class___devirtual$(this$static){
  return instanceOfString(this$static)?Ljava_lang_String_2_classLit:instanceOfDouble(this$static)?Ljava_lang_Double_2_classLit:instanceOfBoolean(this$static)?Ljava_lang_Boolean_2_classLit:hasJavaObjectVirtualDispatch(this$static)?this$static.___clazz:isJavaArray(this$static)?this$static.___clazz:getClass_1(this$static);
}

function hashCode__I__devirtual$(this$static){
  return instanceOfString(this$static)?getHashCode_0(this$static):instanceOfDouble(this$static)?round_int((checkCriticalNotNull(this$static) , this$static)):instanceOfBoolean(this$static)?(checkCriticalNotNull(this$static) , this$static)?1231:1237:hasJavaObjectVirtualDispatch(this$static)?this$static.hashCode_0():isJavaArray(this$static)?getHashCode(this$static):!!this$static && !!this$static.hashCode?this$static.hashCode():getHashCode(this$static);
}

defineClass(1, null, {}, Object_0);
_.equals_0 = function equals(other){
  return this === other;
}
;
_.getClass_0 = function getClass_0(){
  return this.___clazz;
}
;
_.hashCode_0 = function hashCode_0(){
  return getHashCode(this);
}
;
_.toString_0 = function toString_0(){
  var number;
  return $getName(getClass__Ljava_lang_Class___devirtual$(this)) + '@' + (number = hashCode__I__devirtual$(this) >>> 0 , number.toString(16));
}
;
_.equals = function(other){
  return this.equals_0(other);
}
;
_.hashCode = function(){
  return this.hashCode_0();
}
;
_.toString = function(){
  return this.toString_0();
}
;
function canCast(src_0, dstId){
  if (instanceOfString(src_0)) {
    return !!stringCastMap[dstId];
  }
   else if (src_0.castableTypeMap) {
    return !!src_0.castableTypeMap[dstId];
  }
   else if (instanceOfDouble(src_0)) {
    return !!doubleCastMap[dstId];
  }
   else if (instanceOfBoolean(src_0)) {
    return !!booleanCastMap[dstId];
  }
  return false;
}

function castTo(src_0, dstId){
  checkCriticalType(src_0 == null || canCast(src_0, dstId));
  return src_0;
}

function castToBoolean(src_0){
  checkCriticalType(src_0 == null || instanceOfBoolean(src_0));
  return src_0;
}

function castToDouble(src_0){
  checkCriticalType(src_0 == null || instanceOfDouble(src_0));
  return src_0;
}

function castToFunction(src_0){
  checkCriticalType(src_0 == null || typeof src_0 === 'function');
  return src_0;
}

function castToJsArray(src_0){
  checkCriticalType(src_0 == null || Array.isArray(src_0));
  return src_0;
}

function castToJso(src_0){
  checkCriticalType(src_0 == null || isJsObjectOrFunction(src_0) && !(src_0.typeMarker === typeMarkerFn));
  return src_0;
}

function castToNative(src_0, jsType){
  checkCriticalType(src_0 == null || jsinstanceOf(src_0, jsType));
  return src_0;
}

function castToString(src_0){
  checkCriticalType(src_0 == null || instanceOfString(src_0));
  return src_0;
}

function getClass_1(array){
  return array.___clazz || Array.isArray(array) && getClassLiteralForArray(Lcom_google_gwt_core_client_JavaScriptObject_2_classLit, 1) || Lcom_google_gwt_core_client_JavaScriptObject_2_classLit;
}

function hasJavaObjectVirtualDispatch(src_0){
  return !Array.isArray(src_0) && src_0.typeMarker === typeMarkerFn;
}

function instanceOf(src_0, dstId){
  return src_0 != null && canCast(src_0, dstId);
}

function instanceOfBoolean(src_0){
  return typeof src_0 === 'boolean';
}

function instanceOfDouble(src_0){
  return typeof src_0 === 'number';
}

function instanceOfJso(src_0){
  return src_0 != null && isJsObjectOrFunction(src_0) && !(src_0.typeMarker === typeMarkerFn);
}

function instanceOfNative(src_0, jsType){
  return jsinstanceOf(src_0, jsType);
}

function instanceOfString(src_0){
  return typeof src_0 === 'string';
}

function isJsObjectOrFunction(src_0){
  return typeof src_0 === 'object' || typeof src_0 === 'function';
}

function jsinstanceOf(obj, jsType){
  return obj && jsType && obj instanceof jsType;
}

function maskUndefined(src_0){
  return src_0 == null?null:src_0;
}

function round_int(x_0){
  return Math.max(Math.min(x_0, 2147483647), -2147483648) | 0;
}

function throwClassCastExceptionUnlessNull(o){
  checkCriticalType(o == null);
  return o;
}

var booleanCastMap, doubleCastMap, stringCastMap;
function $ensureNamesAreInitialized(this$static){
  if (this$static.typeName != null) {
    return;
  }
  initializeNames(this$static);
}

function $getName(this$static){
  $ensureNamesAreInitialized(this$static);
  return this$static.typeName;
}

function Class(){
  ++nextSequentialId;
  this.typeName = null;
  this.simpleName = null;
  this.packageName = null;
  this.compoundName = null;
  this.canonicalName = null;
  this.typeId = null;
  this.arrayLiterals = null;
}

function createClassObject(packageName, compoundClassName){
  var clazz;
  clazz = new Class;
  clazz.packageName = packageName;
  clazz.compoundName = compoundClassName;
  return clazz;
}

function createForClass(packageName, compoundClassName, typeId){
  var clazz;
  clazz = createClassObject(packageName, compoundClassName);
  maybeSetClassLiteral(typeId, clazz);
  return clazz;
}

function createForEnum(packageName, compoundClassName, typeId, enumConstantsFunc){
  var clazz;
  clazz = createClassObject(packageName, compoundClassName);
  maybeSetClassLiteral(typeId, clazz);
  clazz.modifiers = enumConstantsFunc?8:0;
  return clazz;
}

function createForInterface(packageName, compoundClassName){
  var clazz;
  clazz = createClassObject(packageName, compoundClassName);
  clazz.modifiers = 2;
  return clazz;
}

function createForPrimitive(className, primitiveTypeId){
  var clazz;
  clazz = createClassObject('', className);
  clazz.typeId = primitiveTypeId;
  clazz.modifiers = 1;
  return clazz;
}

function getClassLiteralForArray_0(leafClass, dimensions){
  var arrayLiterals = leafClass.arrayLiterals = leafClass.arrayLiterals || [];
  return arrayLiterals[dimensions] || (arrayLiterals[dimensions] = leafClass.createClassLiteralForArray(dimensions));
}

function getPrototypeForClass(clazz){
  if (clazz.isPrimitive()) {
    return null;
  }
  var typeId = clazz.typeId;
  return prototypesByTypeId_0[typeId];
}

function initializeNames(clazz){
  if (clazz.isArray_0()) {
    var componentType = clazz.componentType;
    componentType.isPrimitive()?(clazz.typeName = '[' + componentType.typeId):!componentType.isArray_0()?(clazz.typeName = '[L' + componentType.getName() + ';'):(clazz.typeName = '[' + componentType.getName());
    clazz.canonicalName = componentType.getCanonicalName() + '[]';
    clazz.simpleName = componentType.getSimpleName() + '[]';
    return;
  }
  var packageName = clazz.packageName;
  var compoundName = clazz.compoundName;
  compoundName = compoundName.split('/');
  clazz.typeName = join_0('.', [packageName, join_0('$', compoundName)]);
  clazz.canonicalName = join_0('.', [packageName, join_0('.', compoundName)]);
  clazz.simpleName = compoundName[compoundName.length - 1];
}

function join_0(separator, strings){
  var i_0 = 0;
  while (!strings[i_0] || strings[i_0] == '') {
    i_0++;
  }
  var result = strings[i_0++];
  for (; i_0 < strings.length; i_0++) {
    if (!strings[i_0] || strings[i_0] == '') {
      continue;
    }
    result += separator + strings[i_0];
  }
  return result;
}

function maybeSetClassLiteral(typeId, clazz){
  var proto;
  if (!typeId) {
    return;
  }
  clazz.typeId = typeId;
  var prototype_0 = getPrototypeForClass(clazz);
  if (!prototype_0) {
    prototypesByTypeId_0[typeId] = [clazz];
    return;
  }
  prototype_0.___clazz = clazz;
}

defineClass(86, 1, {}, Class);
_.createClassLiteralForArray = function createClassLiteralForArray(dimensions){
  var clazz;
  clazz = new Class;
  clazz.modifiers = 4;
  dimensions > 1?(clazz.componentType = getClassLiteralForArray_0(this, dimensions - 1)):(clazz.componentType = this);
  return clazz;
}
;
_.getCanonicalName = function getCanonicalName(){
  $ensureNamesAreInitialized(this);
  return this.canonicalName;
}
;
_.getName = function getName(){
  return $getName(this);
}
;
_.getSimpleName = function getSimpleName(){
  $ensureNamesAreInitialized(this);
  return this.simpleName;
}
;
_.isArray_0 = function isArray(){
  return (this.modifiers & 4) != 0;
}
;
_.isPrimitive = function isPrimitive(){
  return (this.modifiers & 1) != 0;
}
;
_.toString_0 = function toString_7(){
  return ((this.modifiers & 2) != 0?'interface ':(this.modifiers & 1) != 0?'':'class ') + ($ensureNamesAreInitialized(this) , this.typeName);
}
;
_.modifiers = 0;
var nextSequentialId = 1;
var Ljava_lang_Object_2_classLit = createForClass('java.lang', 'Object', 1);
var Ljava_lang_Class_2_classLit = createForClass('java.lang', 'Class', 86);
function $elapsedMillis(this$static){
  return now_1() - this$static.start_0;
}

function Duration(){
  this.start_0 = now_1();
}

defineClass(87, 1, {}, Duration);
_.start_0 = 0;
var Lcom_google_gwt_core_client_Duration_2_classLit = createForClass('com.google.gwt.core.client', 'Duration', 87);
function setUncaughtExceptionHandler(handler){
  uncaughtExceptionHandler = handler;
  maybeInitializeWindowOnError();
}

var uncaughtExceptionHandler = null;
function $$init(this$static){
  this$static.stackTrace = initUnidimensionalArray(Ljava_lang_StackTraceElement_2_classLit, $intern_0, 26, 0, 0, 1);
}

function $fillInStackTrace(this$static){
  if (this$static.writetableStackTrace) {
    this$static.backingJsObject !== '__noinit__' && this$static.initializeBackingError();
    this$static.stackTrace = null;
  }
  return this$static;
}

function $printStackTraceImpl(this$static, out, ident){
  var t, t$array, t$index, t$max, theCause;
  $printStackTraceItems(this$static);
  for (t$array = (this$static.suppressedExceptions == null && (this$static.suppressedExceptions = initUnidimensionalArray(Ljava_lang_Throwable_2_classLit, $intern_0, 5, 0, 0, 1)) , this$static.suppressedExceptions) , t$index = 0 , t$max = t$array.length; t$index < t$max; ++t$index) {
    t = t$array[t$index];
    $printStackTraceImpl(t, out, '\t' + ident);
  }
  theCause = this$static.cause;
  !!theCause && $printStackTraceImpl(theCause, out, ident);
}

function $printStackTraceItems(this$static){
  var element$array, element$index, element$max, stackTrace;
  for (element$array = (this$static.stackTrace == null && (this$static.stackTrace = ($clinit_StackTraceCreator() , stackTrace = collector.getStackTrace(this$static) , dropInternalFrames(stackTrace))) , this$static.stackTrace) , element$index = 0 , element$max = element$array.length; element$index < element$max; ++element$index)
  ;
}

function $setBackingJsObject(this$static, backingJsObject){
  this$static.backingJsObject = backingJsObject;
  backingJsObject != null && setPropertySafe(backingJsObject, '__java$exception', this$static);
}

function $toString(this$static, message){
  var className;
  className = $getName(this$static.___clazz);
  return message == null?className:className + ': ' + message;
}

function Throwable(){
  $$init(this);
  $fillInStackTrace(this);
  this.initializeBackingError();
}

function fixIE(e){
  if (!('stack' in e)) {
    try {
      throw e;
    }
     catch (ignored) {
    }
  }
  return e;
}

function of(e){
  var throwable;
  if (e != null) {
    throwable = e['__java$exception'];
    if (throwable) {
      return throwable;
    }
  }
  return instanceOfNative(e, TypeError)?new NullPointerException_0(e):new JsException(e);
}

defineClass(5, 1, {4:1, 5:1});
_.createError = function createError(msg){
  return new Error(msg);
}
;
_.getMessage = function getMessage(){
  return this.detailMessage;
}
;
_.initializeBackingError = function initializeBackingError(){
  var className, errorMessage, message;
  message = this.detailMessage == null?null:this.detailMessage.replace(new RegExp('\n', 'g'), ' ');
  errorMessage = (className = $getName(this.___clazz) , message == null?className:className + ': ' + message);
  $setBackingJsObject(this, fixIE(this.createError(errorMessage)));
  captureStackTrace(this);
}
;
_.toString_0 = function toString_1(){
  return $toString(this, this.getMessage());
}
;
_.backingJsObject = '__noinit__';
_.writetableStackTrace = true;
var Ljava_lang_Throwable_2_classLit = createForClass('java.lang', 'Throwable', 5);
defineClass(7, 5, $intern_1);
var Ljava_lang_Exception_2_classLit = createForClass('java.lang', 'Exception', 7);
function RuntimeException(message){
  $$init(this);
  this.detailMessage = message;
  $fillInStackTrace(this);
  this.initializeBackingError();
}

function RuntimeException_0(cause){
  $$init(this);
  this.detailMessage = !cause?null:$toString(cause, cause.getMessage());
  this.cause = cause;
  $fillInStackTrace(this);
  this.initializeBackingError();
}

defineClass(20, 7, $intern_1, RuntimeException_0);
var Ljava_lang_RuntimeException_2_classLit = createForClass('java.lang', 'RuntimeException', 20);
function JsException(backingJsObject){
  $$init(this);
  $fillInStackTrace(this);
  this.backingJsObject = backingJsObject;
  backingJsObject != null && setPropertySafe(backingJsObject, '__java$exception', this);
  this.detailMessage = backingJsObject == null?'null':toString_2(backingJsObject);
}

defineClass(50, 20, $intern_1, JsException);
var Ljava_lang_JsException_2_classLit = createForClass('java.lang', 'JsException', 50);
defineClass(107, 50, $intern_1);
var Lcom_google_gwt_core_client_impl_JavaScriptExceptionBase_2_classLit = createForClass('com.google.gwt.core.client.impl', 'JavaScriptExceptionBase', 107);
function $clinit_JavaScriptException(){
  $clinit_JavaScriptException = emptyMethod;
  NOT_SET = new Object_0;
}

function $ensureInit(this$static){
  var exception;
  if (this$static.message_0 == null) {
    exception = maskUndefined(this$static.e) === maskUndefined(NOT_SET)?null:this$static.e;
    this$static.name_0 = exception == null?'null':instanceOfJso(exception)?getExceptionName0(castToJso(exception)):instanceOfString(exception)?'String':$getName(getClass__Ljava_lang_Class___devirtual$(exception));
    this$static.description = this$static.description + ': ' + (instanceOfJso(exception)?getExceptionDescription0(castToJso(exception)):exception + '');
    this$static.message_0 = '(' + this$static.name_0 + ') ' + this$static.description;
  }
}

function JavaScriptException(e){
  $clinit_JavaScriptException();
  JsException.call(this, e);
  this.description = '';
  this.e = e;
  this.description = '';
}

function getExceptionDescription0(e){
  return e == null?null:e.message;
}

function getExceptionName0(e){
  return e == null?null:e.name;
}

defineClass(28, 107, {28:1, 4:1, 7:1, 5:1}, JavaScriptException);
_.getMessage = function getMessage_0(){
  return $ensureInit(this) , this.message_0;
}
;
_.getThrown = function getThrown(){
  return maskUndefined(this.e) === maskUndefined(NOT_SET)?null:this.e;
}
;
var NOT_SET;
var Lcom_google_gwt_core_client_JavaScriptException_2_classLit = createForClass('com.google.gwt.core.client', 'JavaScriptException', 28);
function toStringVerbose(obj){
  var defined = function(m){
    return typeof m != 'undefined';
  }
  ;
  var strip = function(s){
    return s.replace(/\r\n/g, '');
  }
  ;
  if (defined(obj.outerHTML))
    return strip(obj.outerHTML);
  defined(obj.innerHTML) && obj.cloneNode && $doc.createElement('div').appendChild(obj.cloneNode(true)).innerHTML;
  if (defined(obj.nodeType) && obj.nodeType == 3) {
    return "'" + obj.data.replace(/ /g, '\u25AB').replace(/\u00A0/, '\u25AA') + "'";
  }
  if (typeof defined(obj.htmlText) && obj.collapse) {
    var html = obj.htmlText;
    if (html) {
      return 'IETextRange [' + strip(html) + ']';
    }
     else {
      var dup = obj.duplicate();
      dup.pasteHTML('|');
      var out = 'IETextRange ' + strip(obj.parentElement().outerHTML);
      dup.moveStart('character', -1);
      dup.pasteHTML('');
      return out;
    }
  }
  return obj.toString?obj.toString():'[JavaScriptObject]';
}

var Lcom_google_gwt_core_client_JavaScriptObject_2_classLit = createForClass('com.google.gwt.core.client', 'JavaScriptObject$', 0);
function now_1(){
  if (Date.now) {
    return Date.now();
  }
  return (new Date).getTime();
}

defineClass(281, 1, {});
var Lcom_google_gwt_core_client_Scheduler_2_classLit = createForClass('com.google.gwt.core.client', 'Scheduler', 281);
function $clinit_Impl(){
  $clinit_Impl = emptyMethod;
  !!($clinit_StackTraceCreator() , collector);
}

function apply_0(jsFunction, thisObj, args){
  return jsFunction.apply(thisObj, args);
  var __0;
}

function enter(){
  var now_0;
  if (entryDepth < 0) {
    debugger;
    throw toJs(new AssertionError_0('Negative entryDepth value at entry ' + entryDepth));
  }
  if (entryDepth != 0) {
    now_0 = now_1();
    if (now_0 - watchdogEntryDepthLastScheduled > 2000) {
      watchdogEntryDepthLastScheduled = now_0;
      watchdogEntryDepthTimerId = $wnd.setTimeout(watchdogEntryDepthRun, 10);
    }
  }
  if (entryDepth++ == 0) {
    $flushEntryCommands(($clinit_SchedulerImpl() , INSTANCE));
    return true;
  }
  return false;
}

function entry(jsFunction){
  $clinit_Impl();
  return function(){
    return entry0(jsFunction, this, arguments);
    var __0;
  }
  ;
}

function entry0(jsFunction, thisObj, args){
  var initialEntry, t;
  initialEntry = enter();
  try {
    if (uncaughtExceptionHandler) {
      try {
        return apply_0(jsFunction, thisObj, args);
      }
       catch ($e0) {
        $e0 = toJava($e0);
        if (instanceOf($e0, 5)) {
          t = $e0;
          reportUncaughtException(t, true);
          return undefined;
        }
         else 
          throw toJs($e0);
      }
    }
     else {
      return apply_0(jsFunction, thisObj, args);
    }
  }
   finally {
    exit(initialEntry);
  }
}

function exit(initialEntry){
  initialEntry && $flushFinallyCommands(($clinit_SchedulerImpl() , INSTANCE));
  --entryDepth;
  if (entryDepth < 0) {
    debugger;
    throw toJs(new AssertionError_0('Negative entryDepth value at exit ' + entryDepth));
  }
  if (initialEntry) {
    if (entryDepth != 0) {
      debugger;
      throw toJs(new AssertionError_0('Depth not 0' + entryDepth));
    }
    if (watchdogEntryDepthTimerId != -1) {
      watchdogEntryDepthCancel(watchdogEntryDepthTimerId);
      watchdogEntryDepthTimerId = -1;
    }
  }
}

function maybeInitializeWindowOnError(){
  $clinit_Impl();
  if (onErrorInitialized) {
    return;
  }
  onErrorInitialized = true;
  registerWindowOnError(false);
}

function registerWindowOnError(reportAlways){
  $clinit_Impl();
  function errorHandler(msg, url_0, line, column, error){
    if (!error) {
      error = msg + ' (' + url_0 + ':' + line;
      column && (error += ':' + column);
      error += ')';
    }
    var throwable = of(error);
    reportUncaughtException(throwable, false);
  }

  ;
  function addOnErrorHandler(windowRef){
    var origHandler = windowRef.onerror;
    if (origHandler && !reportAlways) {
      return;
    }
    windowRef.onerror = function(){
      errorHandler.apply(this, arguments);
      origHandler && origHandler.apply(this, arguments);
      return false;
    }
    ;
  }

  addOnErrorHandler($wnd);
  addOnErrorHandler(window);
}

function reportToBrowser(e){
  $wnd.setTimeout(function(){
    throw e;
  }
  , 0);
}

function reportUncaughtException(e, reportSwallowedExceptionToBrowser){
  $clinit_Impl();
  var handler;
  handler = uncaughtExceptionHandler;
  if (handler) {
    if (handler == uncaughtExceptionHandlerForTest) {
      return;
    }
    handler.onUncaughtException(e);
    return;
  }
  if (reportSwallowedExceptionToBrowser) {
    reportToBrowser(instanceOf(e, 28)?castTo(e, 28).getThrown():e);
  }
   else {
    $clinit_System();
    $printStackTraceImpl(e, err_0, '');
  }
}

function watchdogEntryDepthCancel(timerId){
  $wnd.clearTimeout(timerId);
}

function watchdogEntryDepthRun(){
  entryDepth != 0 && (entryDepth = 0);
  watchdogEntryDepthTimerId = -1;
}

var entryDepth = 0, onErrorInitialized = false, uncaughtExceptionHandlerForTest, watchdogEntryDepthLastScheduled = 0, watchdogEntryDepthTimerId = -1;
function $clinit_SchedulerImpl(){
  $clinit_SchedulerImpl = emptyMethod;
  INSTANCE = new TrackingScheduler;
}

function $flushEntryCommands(this$static){
  var oldQueue, rescheduled;
  if (this$static.entryCommands) {
    rescheduled = null;
    do {
      oldQueue = this$static.entryCommands;
      this$static.entryCommands = null;
      rescheduled = runScheduledTasks(oldQueue, rescheduled);
    }
     while (this$static.entryCommands);
    this$static.entryCommands = rescheduled;
  }
}

function $flushFinallyCommands(this$static){
  var oldQueue, rescheduled;
  if (this$static.finallyCommands) {
    rescheduled = null;
    do {
      oldQueue = this$static.finallyCommands;
      this$static.finallyCommands = null;
      rescheduled = runScheduledTasks(oldQueue, rescheduled);
    }
     while (this$static.finallyCommands);
    this$static.finallyCommands = rescheduled;
  }
}

function $flushPostEventPumpCommands(this$static){
  var oldDeferred;
  if (this$static.deferredCommands) {
    oldDeferred = this$static.deferredCommands;
    this$static.deferredCommands = null;
    !this$static.incrementalCommands && (this$static.incrementalCommands = []);
    runScheduledTasks(oldDeferred, this$static.incrementalCommands);
  }
  !!this$static.incrementalCommands && (this$static.incrementalCommands = $runRepeatingTasks(this$static.incrementalCommands));
}

function $isWorkQueued(this$static){
  return !!this$static.deferredCommands || !!this$static.incrementalCommands;
}

function $maybeSchedulePostEventPumpCommands(this$static){
  if (!this$static.shouldBeRunning) {
    this$static.shouldBeRunning = true;
    !this$static.flusher && (this$static.flusher = new SchedulerImpl$Flusher(this$static));
    scheduleFixedDelayImpl(this$static.flusher, 1);
    !this$static.rescue && (this$static.rescue = new SchedulerImpl$Rescuer(this$static));
    scheduleFixedDelayImpl(this$static.rescue, 50);
  }
}

function $runRepeatingTasks(tasks){
  var canceledSomeTasks, duration, executedSomeTask, i_0, length_0, newTasks, t;
  if (!tasks) {
    debugger;
    throw toJs(new AssertionError_0('tasks'));
  }
  length_0 = tasks.length;
  if (length_0 == 0) {
    return null;
  }
  canceledSomeTasks = false;
  duration = new Duration;
  while (now_1() - duration.start_0 < 16) {
    executedSomeTask = false;
    for (i_0 = 0; i_0 < length_0; i_0++) {
      if (tasks.length != length_0) {
        debugger;
        throw toJs(new AssertionError_0('Working array length changed ' + tasks.length + ' != ' + length_0));
      }
      t = tasks[i_0];
      if (!t) {
        continue;
      }
      executedSomeTask = true;
      if (!t[1]) {
        debugger;
        throw toJs(new AssertionError_0('Found a non-repeating Task'));
      }
      if (!t[0].execute()) {
        tasks[i_0] = null;
        canceledSomeTasks = true;
      }
    }
    if (!executedSomeTask) {
      break;
    }
  }
  if (canceledSomeTasks) {
    newTasks = [];
    for (i_0 = 0; i_0 < length_0; i_0++) {
      !!tasks[i_0] && (newTasks[newTasks.length] = tasks[i_0] , undefined);
    }
    if (newTasks.length >= length_0) {
      debugger;
      throw toJs(new AssertionError);
    }
    return newTasks.length == 0?null:newTasks;
  }
   else {
    return tasks;
  }
}

function $scheduleDeferred(this$static, cmd){
  this$static.deferredCommands = push_0(this$static.deferredCommands, [cmd, false]);
  $maybeSchedulePostEventPumpCommands(this$static);
}

function execute(cmd){
  return cmd.execute();
}

function push_0(queue, task){
  !queue && (queue = []);
  queue[queue.length] = task;
  return queue;
}

function runScheduledTasks(tasks, rescheduled){
  var e, i_0, j, t;
  if (!tasks) {
    debugger;
    throw toJs(new AssertionError_0('tasks'));
  }
  for (i_0 = 0 , j = tasks.length; i_0 < j; i_0++) {
    if (tasks.length != j) {
      debugger;
      throw toJs(new AssertionError_0('Working array length changed ' + tasks.length + ' != ' + j));
    }
    t = tasks[i_0];
    try {
      t[1]?t[0].execute() && (rescheduled = push_0(rescheduled, t)):t[0].execute_0();
    }
     catch ($e0) {
      $e0 = toJava($e0);
      if (instanceOf($e0, 5)) {
        e = $e0;
        $clinit_Impl();
        reportUncaughtException(e, true);
      }
       else 
        throw toJs($e0);
    }
  }
  return rescheduled;
}

function scheduleFixedDelayImpl(cmd, delayMs){
  $clinit_SchedulerImpl();
  function callback(){
    var ret = $entry(execute)(cmd);
    ret && $wnd.setTimeout(callback, delayMs);
  }

  $wnd.setTimeout(callback, delayMs);
}

function scheduleFixedPeriodImpl(cmd, delayMs){
  $clinit_SchedulerImpl();
  var intervalId = $wnd.setInterval(function(){
    var ret = $entry(execute)(cmd);
    !ret && $wnd.clearInterval(intervalId);
  }
  , delayMs);
}

defineClass(117, 281, {});
_.flushRunning = false;
_.shouldBeRunning = false;
var INSTANCE;
var Lcom_google_gwt_core_client_impl_SchedulerImpl_2_classLit = createForClass('com.google.gwt.core.client.impl', 'SchedulerImpl', 117);
function SchedulerImpl$Flusher(this$0){
  this.this$01 = this$0;
}

defineClass(118, 1, {}, SchedulerImpl$Flusher);
_.execute = function execute_0(){
  this.this$01.flushRunning = true;
  $flushPostEventPumpCommands(this.this$01);
  this.this$01.flushRunning = false;
  return this.this$01.shouldBeRunning = $isWorkQueued(this.this$01);
}
;
var Lcom_google_gwt_core_client_impl_SchedulerImpl$Flusher_2_classLit = createForClass('com.google.gwt.core.client.impl', 'SchedulerImpl/Flusher', 118);
function SchedulerImpl$Rescuer(this$0){
  this.this$01 = this$0;
}

defineClass(119, 1, {}, SchedulerImpl$Rescuer);
_.execute = function execute_1(){
  this.this$01.flushRunning && scheduleFixedDelayImpl(this.this$01.flusher, 1);
  return this.this$01.shouldBeRunning;
}
;
var Lcom_google_gwt_core_client_impl_SchedulerImpl$Rescuer_2_classLit = createForClass('com.google.gwt.core.client.impl', 'SchedulerImpl/Rescuer', 119);
function $clinit_StackTraceCreator(){
  $clinit_StackTraceCreator = emptyMethod;
  var c, enforceLegacy;
  enforceLegacy = !supportsErrorStack();
  c = new StackTraceCreator$CollectorModernNoSourceMap;
  collector = enforceLegacy?new StackTraceCreator$CollectorLegacy:c;
}

function captureStackTrace(error){
  $clinit_StackTraceCreator();
  collector.collect(error);
}

function dropInternalFrames(stackTrace){
  var dropFrameUntilFnName, dropFrameUntilFnName2, i_0, numberOfFramesToSearch;
  dropFrameUntilFnName = 'captureStackTrace';
  dropFrameUntilFnName2 = 'initializeBackingError';
  numberOfFramesToSearch = $wnd.Math.min(stackTrace.length, 5);
  for (i_0 = numberOfFramesToSearch - 1; i_0 >= 0; i_0--) {
    if ($equals_0(stackTrace[i_0].methodName, dropFrameUntilFnName) || $equals_0(stackTrace[i_0].methodName, dropFrameUntilFnName2)) {
      stackTrace.length >= i_0 + 1 && stackTrace.splice(0, i_0 + 1);
      break;
    }
  }
  return stackTrace;
}

function extractFunctionName(fnName){
  var fnRE = /function(?:\s+([\w$]+))?\s*\(/;
  var match_0 = fnRE.exec(fnName);
  return match_0 && match_0[1] || 'anonymous';
}

function parseInt_0(number){
  $clinit_StackTraceCreator();
  return parseInt(number) || -1;
}

function supportsErrorStack(){
  if (Error.stackTraceLimit > 0) {
    $wnd.Error.stackTraceLimit = Error.stackTraceLimit = 64;
    return true;
  }
  return 'stack' in new Error;
}

var collector;
defineClass(292, 1, {});
var Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/Collector', 292);
function StackTraceCreator$CollectorLegacy(){
}

defineClass(108, 292, {}, StackTraceCreator$CollectorLegacy);
_.collect = function collect(error){
  var seen = {}, name_1;
  var fnStack = [];
  error['fnStack'] = fnStack;
  var callee = arguments.callee.caller;
  while (callee) {
    var name_0 = ($clinit_StackTraceCreator() , callee.name || (callee.name = extractFunctionName(callee.toString())));
    fnStack.push(name_0);
    var keyName = ':' + name_0;
    var withThisName = seen[keyName];
    if (withThisName) {
      var i_0, j;
      for (i_0 = 0 , j = withThisName.length; i_0 < j; i_0++) {
        if (withThisName[i_0] === callee) {
          return;
        }
      }
    }
    (withThisName || (seen[keyName] = [])).push(callee);
    callee = callee.caller;
  }
}
;
_.getStackTrace = function getStackTrace(t){
  var i_0, length_0, stack_0, stackTrace;
  stack_0 = ($clinit_StackTraceCreator() , t && t['fnStack']?t['fnStack']:[]);
  length_0 = stack_0.length;
  stackTrace = initUnidimensionalArray(Ljava_lang_StackTraceElement_2_classLit, $intern_0, 26, length_0, 0, 1);
  for (i_0 = 0; i_0 < length_0; i_0++) {
    stackTrace[i_0] = new StackTraceElement(stack_0[i_0], null, -1);
  }
  return stackTrace;
}
;
var Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorLegacy_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/CollectorLegacy', 108);
function $parse(this$static, stString){
  var closeParen, col, endFileUrlIndex, fileName, index_0, lastColonIndex, line, location_0, toReturn;
  if (stString.length == 0) {
    return this$static.createSte('Unknown', 'anonymous', -1, -1);
  }
  toReturn = $trim(stString);
  $equals_0(toReturn.substr(0, 3), 'at ') && (toReturn = toReturn.substr(3));
  toReturn = toReturn.replace(/\[.*?\]/g, '');
  index_0 = toReturn.indexOf('(');
  if (index_0 == -1) {
    index_0 = toReturn.indexOf('@');
    if (index_0 == -1) {
      location_0 = toReturn;
      toReturn = '';
    }
     else {
      location_0 = $trim(toReturn.substr(index_0 + 1));
      toReturn = $trim(toReturn.substr(0, index_0));
    }
  }
   else {
    closeParen = toReturn.indexOf(')', index_0);
    location_0 = toReturn.substr(index_0 + 1, closeParen - (index_0 + 1));
    toReturn = $trim(toReturn.substr(0, index_0));
  }
  index_0 = $indexOf(toReturn, fromCodePoint(46));
  index_0 != -1 && (toReturn = toReturn.substr(index_0 + 1));
  (toReturn.length == 0 || $equals_0(toReturn, 'Anonymous function')) && (toReturn = 'anonymous');
  lastColonIndex = $lastIndexOf(location_0, fromCodePoint(58));
  endFileUrlIndex = $lastIndexOf_0(location_0, fromCodePoint(58), lastColonIndex - 1);
  line = -1;
  col = -1;
  fileName = 'Unknown';
  if (lastColonIndex != -1 && endFileUrlIndex != -1) {
    fileName = location_0.substr(0, endFileUrlIndex);
    line = parseInt_0(location_0.substr(endFileUrlIndex + 1, lastColonIndex - (endFileUrlIndex + 1)));
    col = parseInt_0(location_0.substr(lastColonIndex + 1));
  }
  return this$static.createSte(fileName, toReturn, line, col);
}

defineClass(293, 292, {});
_.collect = function collect_0(error){
}
;
_.createSte = function createSte(fileName, method, line, col){
  return new StackTraceElement(method, fileName + '@' + col, line < 0?-1:line);
}
;
_.getStackTrace = function getStackTrace_0(t){
  var addIndex, i_0, length_0, stack_0, stackTrace, ste, e;
  stack_0 = ($clinit_StackTraceCreator() , e = t.backingJsObject , e && e.stack?e.stack.split('\n'):[]);
  stackTrace = initUnidimensionalArray(Ljava_lang_StackTraceElement_2_classLit, $intern_0, 26, 0, 0, 1);
  addIndex = 0;
  length_0 = stack_0.length;
  if (length_0 == 0) {
    return stackTrace;
  }
  ste = $parse(this, stack_0[0]);
  $equals_0(ste.methodName, 'anonymous') || (stackTrace[addIndex++] = ste);
  for (i_0 = 1; i_0 < length_0; i_0++) {
    stackTrace[addIndex++] = $parse(this, stack_0[i_0]);
  }
  return stackTrace;
}
;
var Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/CollectorModern', 293);
function StackTraceCreator$CollectorModernNoSourceMap(){
}

defineClass(109, 293, {}, StackTraceCreator$CollectorModernNoSourceMap);
_.createSte = function createSte_0(fileName, method, line, col){
  return new StackTraceElement(method, fileName, -1);
}
;
var Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorModernNoSourceMap_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/CollectorModernNoSourceMap', 109);
function getClassLiteralForArray(clazz, dimensions){
  return getClassLiteralForArray_0(clazz, dimensions);
}

function initUnidimensionalArray(leafClassLiteral, castableTypeMap, elementTypeId, length_0, elementTypeCategory, dimensions){
  var result;
  result = initializeArrayElementsWithDefaults(elementTypeCategory, length_0);
  elementTypeCategory != 10 && stampJavaTypeInfo(getClassLiteralForArray(leafClassLiteral, dimensions), castableTypeMap, elementTypeId, elementTypeCategory, result);
  return result;
}

function initializeArrayElementsWithDefaults(elementTypeCategory, length_0){
  var array = new Array(length_0);
  var initValue;
  switch (elementTypeCategory) {
    case 14:
    case 15:
      initValue = 0;
      break;
    case 16:
      initValue = false;
      break;
    default:return array;
  }
  for (var i_0 = 0; i_0 < length_0; ++i_0) {
    array[i_0] = initValue;
  }
  return array;
}

function isJavaArray(src_0){
  return Array.isArray(src_0) && src_0.typeMarker === typeMarkerFn;
}

function stampJavaTypeInfo(arrayClass, castableTypeMap, elementTypeId, elementTypeCategory, array){
  array.___clazz = arrayClass;
  array.castableTypeMap = castableTypeMap;
  array.typeMarker = typeMarkerFn;
  array.__elementTypeId$ = elementTypeId;
  array.__elementTypeCategory$ = elementTypeCategory;
  return array;
}

function toJava(e){
  var javaException;
  if (instanceOf(e, 5)) {
    return e;
  }
  javaException = e && e['__java$exception'];
  if (!javaException) {
    javaException = new JavaScriptException(e);
    captureStackTrace(javaException);
  }
  return javaException;
}

function toJs(t){
  return t.backingJsObject;
}

function init_0(){
  $clinit_Bootstrapper();
  initModule();
}

function $exec(this$static, input_0){
  return this$static.exec(input_0);
}

function $cancel(this$static){
  if (!this$static.timerId) {
    return;
  }
  ++this$static.cancelCounter;
  this$static.isRepeating?clearInterval_0(this$static.timerId.value_0):clearTimeout_0(this$static.timerId.value_0);
  this$static.timerId = null;
}

function $schedule(this$static, delayMillis){
  if (delayMillis < 0) {
    throw toJs(new IllegalArgumentException('must be non-negative'));
  }
  !!this$static.timerId && $cancel(this$static);
  this$static.isRepeating = false;
  this$static.timerId = valueOf_0(setTimeout_0(createCallback(this$static, this$static.cancelCounter), delayMillis));
}

function $scheduleRepeating(this$static, periodMillis){
  if (periodMillis <= 0) {
    throw toJs(new IllegalArgumentException('must be positive'));
  }
  !!this$static.timerId && $cancel(this$static);
  this$static.isRepeating = true;
  this$static.timerId = valueOf_0(setInterval_0(createCallback(this$static, this$static.cancelCounter), periodMillis));
}

function Timer(){
}

function clearInterval_0(timerId){
  $wnd.clearInterval(timerId);
}

function clearTimeout_0(timerId){
  $wnd.clearTimeout(timerId);
}

function createCallback(timer, cancelCounter){
  return $entry(function(){
    timer.fire(cancelCounter);
  }
  );
}

function setInterval_0(func, time){
  return $wnd.setInterval(func, time);
}

function setTimeout_0(func, time){
  return $wnd.setTimeout(func, time);
}

defineClass(22, 1, {});
_.fire = function fire(scheduleCancelCounter){
  if (scheduleCancelCounter != this.cancelCounter) {
    return;
  }
  this.isRepeating || (this.timerId = null);
  this.run();
}
;
_.cancelCounter = 0;
_.isRepeating = false;
_.timerId = null;
var Lcom_google_gwt_user_client_Timer_2_classLit = createForClass('com.google.gwt.user.client', 'Timer', 22);
function $clearOnReadyStateChange(this$static){
  this$static.onreadystatechange = function(){
  }
  ;
}

function $setOnReadyStateChange(this$static, handler){
  var _this = this$static;
  this$static.onreadystatechange = $entry(function(){
    handler.onReadyStateChange(_this);
  }
  );
}

defineClass(297, 1, {});
_.toString_0 = function toString_3(){
  return 'An event type';
}
;
var Lcom_google_web_bindery_event_shared_Event_2_classLit = createForClass('com.google.web.bindery.event.shared', 'Event', 297);
function Event$Type(){
  this.index_0 = ++nextHashCode;
}

defineClass(88, 1, {}, Event$Type);
_.hashCode_0 = function hashCode_1(){
  return this.index_0;
}
;
_.toString_0 = function toString_4(){
  return 'Event type';
}
;
_.index_0 = 0;
var nextHashCode = 0;
var Lcom_google_web_bindery_event_shared_Event$Type_2_classLit = createForClass('com.google.web.bindery.event.shared', 'Event/Type', 88);
defineClass(298, 1, {});
var Lcom_google_web_bindery_event_shared_EventBus_2_classLit = createForClass('com.google.web.bindery.event.shared', 'EventBus', 298);
function $setContextRootUrl(this$static, contextRootUrl){
  var suffixlength;
  suffixlength = '/'.length;
  if (!$equals_0(contextRootUrl.substr(contextRootUrl.length - suffixlength, suffixlength), '/')) {
    debugger;
    throw toJs(new AssertionError);
  }
  this$static.contextRootUrl = contextRootUrl;
}

function $setFrontendRootUrl(this$static, frontendRootUrl){
  this$static.frontendRootUrl = frontendRootUrl;
}

function $setHeartbeatInterval(this$static, heartbeatInterval){
  this$static.heartbeatInterval = heartbeatInterval;
}

function $setProductionMode(this$static, productionMode){
  this$static.productionMode_0 = productionMode;
  shouldLogToBrowserConsole = !productionMode;
}

function $setRequestTiming(this$static, requestTiming){
  this$static.requestTiming = requestTiming;
}

function $setServiceUrl(this$static, serviceUrl){
  this$static.serviceUrl = serviceUrl;
}

function $setServletVersion(this$static, servletVersion){
  this$static.servletVersion = servletVersion;
}

function $setSessionExpiredError(this$static, sessionExpiredError){
  this$static.sessionExpiredError = sessionExpiredError;
}

function $setUIId(this$static, uiId){
  this$static.uiId = uiId;
}

function $setWebComponentMode(this$static, mode){
  this$static.webComponentMode = mode;
}

function ApplicationConfiguration(){
}

defineClass(11, 1, {11:1}, ApplicationConfiguration);
_.heartbeatInterval = 0;
_.productionMode_0 = false;
_.requestTiming = false;
_.uiId = 0;
_.webComponentMode = false;
var Lcom_vaadin_client_ApplicationConfiguration_2_classLit = createForClass('com.vaadin.client', 'ApplicationConfiguration', 11);
function $publishDevelopmentModeJavascriptMethods(this$static, applicationId, servletVersion){
  var ap = this$static;
  var client = $wnd.Vaadin.Flow.clients[applicationId];
  client.isActive = $entry(function(){
    return ap.isActive_0();
  }
  );
  client.getVersionInfo = $entry(function(parameter){
    return {'flow':servletVersion};
  }
  );
}

function $publishProductionModeJavascriptMethods(this$static, applicationId, productionMode, requestTiming){
  var ap = this$static;
  var client = {};
  client.isActive = $entry(function(){
    return ap.isActive_0();
  }
  );
  client.getByNodeId = $entry(function(nodeId){
    return ap.getDomElementByNodeId(nodeId);
  }
  );
  client.productionMode = productionMode;
  client.poll = $entry(function(){
    var poller = ap.registry.getPoller();
    poller.poll_0();
  }
  );
  requestTiming && (client.getProfilingData = $entry(function(){
    var smh = ap.registry.getMessageHandler();
    var pd = [smh.lastProcessingTime, smh.totalProcessingTime];
    null != smh.serverTimingInfo?(pd = pd.concat(smh.serverTimingInfo)):(pd = pd.concat(-1, -1));
    pd[pd.length] = smh.bootstrapTime;
    return pd;
  }
  ));
  $wnd.Vaadin.Flow.resolveUri = $entry(function(uriToResolve){
    var ur = ap.registry.getURIResolver();
    return ur.resolveVaadinUri(uriToResolve);
  }
  );
  $wnd.Vaadin.Flow.sendEventMessage = $entry(function(nodeId, eventType, eventData){
    var sc = ap.registry.getServerConnector();
    sc.sendEventMessage_0(nodeId, eventType, eventData);
  }
  );
  client.initializing = false;
  $wnd.Vaadin.Flow.clients[applicationId] = client;
}

function $start(this$static, initialUidl){
  if (!initialUidl) {
    $resynchronize(castTo($get(this$static.registry, Lcom_vaadin_client_communication_MessageSender_2_classLit), 23));
  }
   else {
    $startRequest(castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12));
    $handleMessage(castTo($get(this$static.registry, Lcom_vaadin_client_communication_MessageHandler_2_classLit), 21), initialUidl);
  }
}

function ApplicationConnection(applicationConfiguration){
  var appRootPanelName, body_0, productionMode, requestTiming, rootNode, servletVersion;
  this.registry = new DefaultRegistry(this, applicationConfiguration);
  setUncaughtExceptionHandler(new ApplicationConnection$0methodref$handleError$Type(castTo($get(this.registry, Lcom_vaadin_client_SystemErrorHandler_2_classLit), 17)));
  rootNode = castTo($get(this.registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).rootNode;
  observe_0(rootNode, castTo($get(this.registry, Lcom_vaadin_client_communication_Poller_2_classLit), 63));
  new Reactive$1(new ReconnectDialogConfiguration$lambda$0$Type(castTo($get(this.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14)));
  observe(rootNode, castTo($get(this.registry, Lcom_vaadin_client_LoadingIndicator_2_classLit), 36));
  body_0 = $doc.body;
  $setDomNode(rootNode, body_0);
  bind_1(rootNode, body_0);
  if (!applicationConfiguration.webComponentMode) {
    $bind(new PopStateHandler(this.registry));
    bind_0(this.registry, body_0);
  }
  log_0('Starting application ' + applicationConfiguration.applicationId);
  appRootPanelName = applicationConfiguration.applicationId;
  appRootPanelName = $replaceFirst(appRootPanelName, '-\\d+$', '');
  productionMode = applicationConfiguration.productionMode_0;
  requestTiming = applicationConfiguration.requestTiming;
  $publishProductionModeJavascriptMethods(this, appRootPanelName, productionMode, requestTiming);
  if (!productionMode) {
    servletVersion = applicationConfiguration.servletVersion;
    $publishDevelopmentModeJavascriptMethods(this, appRootPanelName, servletVersion);
    shouldLogToBrowserConsole && $log($wnd.console, 'Vaadin application servlet version: ' + servletVersion);
  }
  $show(castTo($get(this.registry, Lcom_vaadin_client_LoadingIndicator_2_classLit), 36));
}

defineClass(98, 1, {}, ApplicationConnection);
_.getDomElementByNodeId = function getDomElementByNodeId(id_0){
  var node;
  node = $getNode(castTo($get(this.registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9), id_0);
  return !node?null:node.domNode;
}
;
_.isActive_0 = function isActive(){
  var s;
  return castTo($get(this.registry, Lcom_vaadin_client_communication_MessageHandler_2_classLit), 21).bootstrapTime == 0 || castTo($get(this.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12).hasActiveRequest || (s = ($clinit_SchedulerImpl() , INSTANCE) , !!s && s.deferredCommandTrackers != 0);
}
;
var Lcom_vaadin_client_ApplicationConnection_2_classLit = createForClass('com.vaadin.client', 'ApplicationConnection', 98);
function ApplicationConnection$0methodref$handleError$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(123, 1, {}, ApplicationConnection$0methodref$handleError$Type);
_.onUncaughtException = function onUncaughtException(arg0){
  $handleError_1(this.$$outer_0, arg0);
}
;
var Lcom_vaadin_client_ApplicationConnection$0methodref$handleError$Type_2_classLit = createForClass('com.vaadin.client', 'ApplicationConnection/0methodref$handleError$Type', 123);
function $detectTouchDevice(){
  try {
    document.createEvent('TouchEvent');
    return true;
  }
   catch (e) {
    return false;
  }
}

function BrowserInfo(){
  this.browserDetails = new BrowserDetails($wnd.navigator.userAgent);
  this.browserDetails.isChrome?'ontouchstart' in window:this.browserDetails.isIE?!!navigator.msMaxTouchPoints:$detectTouchDevice();
}

defineClass(27, 1, {}, BrowserInfo);
var instance_0;
var Lcom_vaadin_client_BrowserInfo_2_classLit = createForClass('com.vaadin.client', 'BrowserInfo', 27);
var Lcom_vaadin_client_Command_2_classLit = createForInterface('com.vaadin.client', 'Command');
function debug(message){
  shouldLogToBrowserConsole && $debug($wnd.console, message);
}

function deferWithoutEntry(task){
  $wnd.setTimeout(function(){
    task.run();
  }
  , 0);
}

function error_0(message){
  shouldLogToBrowserConsole && $error($wnd.console, message);
}

function jsThrow(exception){
  throw exception;
}

function lambda$0(exception_0){
  var originalHandler;
  originalHandler = uncaughtExceptionHandler;
  setUncaughtExceptionHandler(new Console$lambda$1$Type(originalHandler));
  if (instanceOf(exception_0, 28)) {
    jsThrow(castTo(exception_0, 28).getThrown());
  }
   else {
    throw toJs(exception_0);
  }
}

function lambda$1(originalHandler_0){
  uncaughtExceptionHandler = originalHandler_0;
  !!originalHandler_0 && maybeInitializeWindowOnError();
}

function log_0(message){
  shouldLogToBrowserConsole && $log($wnd.console, message);
}

function warn(message){
  shouldLogToBrowserConsole && $warn($wnd.console, message);
}

var shouldLogToBrowserConsole = false;
function Console$lambda$0$Type(exception_0){
  this.exception_0 = exception_0;
}

defineClass(116, 1, {}, Console$lambda$0$Type);
_.run = function run(){
  lambda$0(this.exception_0);
}
;
var Lcom_vaadin_client_Console$lambda$0$Type_2_classLit = createForClass('com.vaadin.client', 'Console/lambda$0$Type', 116);
function Console$lambda$1$Type(originalHandler_0){
  this.originalHandler_0 = originalHandler_0;
}

defineClass(115, 1, {}, Console$lambda$1$Type);
_.onUncaughtException = function onUncaughtException_0(arg0){
  lambda$1(this.originalHandler_0);
}
;
var Lcom_vaadin_client_Console$lambda$1$Type_2_classLit = createForClass('com.vaadin.client', 'Console/lambda$1$Type', 115);
function $get(this$static, type_0){
  if (!this$static.lookupTable.has(type_0)) {
    debugger;
    throw toJs(new AssertionError_0(($ensureNamesAreInitialized(type_0) , 'Tried to lookup type ' + type_0.typeName + ' but no instance has been registered')));
  }
  return this$static.lookupTable.get(type_0);
}

function $set(this$static, type_0, instance){
  if (this$static.lookupTable.has(type_0)) {
    debugger;
    throw toJs(new AssertionError_0(($ensureNamesAreInitialized(type_0) , 'Registry already has a class of type ' + type_0.typeName + ' registered')));
  }
  this$static.lookupTable.set(type_0, instance);
}

defineClass(126, 1, {});
_.getMessageHandler = function getMessageHandler(){
  return castTo($get(this, Lcom_vaadin_client_communication_MessageHandler_2_classLit), 21);
}
;
_.getPoller = function getPoller(){
  return castTo($get(this, Lcom_vaadin_client_communication_Poller_2_classLit), 63);
}
;
_.getServerConnector = function getServerConnector(){
  return castTo($get(this, Lcom_vaadin_client_communication_ServerConnector_2_classLit), 24);
}
;
_.getURIResolver = function getURIResolver(){
  return castTo($get(this, Lcom_vaadin_client_URIResolver_2_classLit), 43);
}
;
var Lcom_vaadin_client_Registry_2_classLit = createForClass('com.vaadin.client', 'Registry', 126);
function DefaultRegistry(connection, applicationConfiguration){
  this.lookupTable = new $wnd.Map;
  $set(this, Lcom_vaadin_client_ApplicationConnection_2_classLit, connection);
  $set(this, Lcom_vaadin_client_ApplicationConfiguration_2_classLit, applicationConfiguration);
  $set(this, Lcom_vaadin_client_ResourceLoader_2_classLit, new ResourceLoader(this));
  $set(this, Lcom_vaadin_client_URIResolver_2_classLit, new URIResolver(this));
  $set(this, Lcom_vaadin_client_DependencyLoader_2_classLit, new DependencyLoader(this));
  $set(this, Lcom_vaadin_client_SystemErrorHandler_2_classLit, new SystemErrorHandler(this));
  $set(this, Lcom_vaadin_client_UILifecycle_2_classLit, new UILifecycle);
  $set(this, Lcom_vaadin_client_flow_StateTree_2_classLit, new StateTree(this));
  $set(this, Lcom_vaadin_client_LoadingIndicator_2_classLit, new LoadingIndicator);
  $set(this, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit, new RequestResponseTracker(this));
  $set(this, Lcom_vaadin_client_communication_MessageHandler_2_classLit, new MessageHandler(this));
  $set(this, Lcom_vaadin_client_communication_MessageSender_2_classLit, new MessageSender(this));
  $set(this, Lcom_vaadin_client_communication_ServerRpcQueue_2_classLit, new ServerRpcQueue(this));
  $set(this, Lcom_vaadin_client_communication_ServerConnector_2_classLit, new ServerConnector(this));
  $set(this, Lcom_vaadin_client_flow_ExecuteJavaScriptProcessor_2_classLit, new ExecuteJavaScriptProcessor(this));
  $set(this, Lcom_vaadin_client_flow_ConstantPool_2_classLit, new ConstantPool);
  $set(this, Lcom_vaadin_client_ExistingElementMap_2_classLit, new ExistingElementMap);
  $set(this, Lcom_vaadin_client_InitialPropertiesHandler_2_classLit, new InitialPropertiesHandler(this));
  $set(this, Lcom_vaadin_client_communication_Heartbeat_2_classLit, new Heartbeat(this));
  $set(this, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit, new DefaultConnectionStateHandler(this));
  $set(this, Lcom_vaadin_client_communication_XhrConnection_2_classLit, new XhrConnection(this));
  $set(this, Lcom_vaadin_client_communication_PushConfiguration_2_classLit, new PushConfiguration(this));
  $set(this, Lcom_vaadin_client_communication_ReconnectDialogConfiguration_2_classLit, new ReconnectDialogConfiguration(this));
  $set(this, Lcom_vaadin_client_ScrollPositionHandler_2_classLit, new ScrollPositionHandler(this));
  $set(this, Lcom_vaadin_client_communication_Poller_2_classLit, new Poller(this));
}

defineClass(127, 126, {}, DefaultRegistry);
var Lcom_vaadin_client_DefaultRegistry_2_classLit = createForClass('com.vaadin.client', 'DefaultRegistry', 127);
function $clinit_DependencyLoader(){
  $clinit_DependencyLoader = emptyMethod;
  callbacks = [];
  EAGER_RESOURCE_LOAD_LISTENER = new DependencyLoader$1;
  LAZY_RESOURCE_LOAD_LISTENER = new DependencyLoader$2;
}

function $extractLazyDependenciesAndLoadOthers(this$static, loadMode, dependencies){
  var dependencyJson, i_0, lazyDependencies, resourceLoader;
  lazyDependencies = new $wnd.Map;
  for (i_0 = 0; i_0 < dependencies.length; i_0++) {
    dependencyJson = dependencies[i_0];
    resourceLoader = $getResourceLoader(this$static, ($clinit_Dependency$Type() , valueOf(($clinit_Dependency$Type$Map() , $MAP), dependencyJson['type'])), loadMode);
    switch (loadMode.ordinal) {
      case 1:
        $loadEagerDependency($resolveVaadinUri_0(castTo($get(this$static.registry, Lcom_vaadin_client_URIResolver_2_classLit), 43), dependencyJson['url']), resourceLoader);
        break;
      case 2:
        lazyDependencies.set($resolveVaadinUri_0(castTo($get(this$static.registry, Lcom_vaadin_client_URIResolver_2_classLit), 43), dependencyJson['url']), resourceLoader);
        break;
      case 0:
        ++eagerDependenciesLoading;
        resourceLoader.accept(dependencyJson['contents'], EAGER_RESOURCE_LOAD_LISTENER);
        break;
      default:throw toJs(new IllegalArgumentException('Unknown load mode = ' + loadMode));
    }
  }
  return lazyDependencies;
}

function $getResourceLoader(this$static, resourceType, loadMode){
  var inline, resourceLoader;
  resourceLoader = castTo($get(this$static.registry, Lcom_vaadin_client_ResourceLoader_2_classLit), 52);
  inline = loadMode == ($clinit_LoadMode() , INLINE);
  switch (resourceType.ordinal) {
    case 0:
      if (inline) {
        return new DependencyLoader$0methodref$inlineStyleSheet$Type(resourceLoader);
      }

      return new DependencyLoader$1methodref$loadStylesheet$Type(resourceLoader);
    case 3:
      if (inline) {
        return new DependencyLoader$2methodref$inlineHtml$Type(resourceLoader);
      }

      return new DependencyLoader$lambda$2$Type(resourceLoader);
    case 1:
      if (inline) {
        return new DependencyLoader$3methodref$inlineScript$Type(resourceLoader);
      }

      return new DependencyLoader$lambda$3$Type(resourceLoader);
    case 2:
      if (inline) {
        throw toJs(new IllegalArgumentException('Inline load mode is not supported for JsModule.'));
      }

      return new DependencyLoader$lambda$4$Type(resourceLoader);
    default:throw toJs(new IllegalArgumentException('Unknown dependency type ' + resourceType));
  }
}

function $lambda$0(this$static, lazyDependencies_1, dependencies_1, mode_2){
  $extractLazyDependenciesAndLoadOthers(this$static, mode_2, dependencies_1).forEach(makeLambdaFunction(DependencyLoader$lambda$5$Type.prototype.accept, DependencyLoader$lambda$5$Type, [lazyDependencies_1]));
}

function $lambda$1(lazyDependencies_1){
  $scheduleDeferred_0(($clinit_SchedulerImpl() , INSTANCE), new DependencyLoader$lambda$6$Type(lazyDependencies_1));
}

function $lambda$6(lazyDependencies_1){
  shouldLogToBrowserConsole && ($wnd.console.log('Finished loading eager dependencies, loading lazy.') , undefined);
  lazyDependencies_1.forEach(makeLambdaFunction(DependencyLoader$lambda$7$Type.prototype.accept, DependencyLoader$lambda$7$Type, []));
}

function $loadDependencies(this$static, clientDependencies){
  var lazyDependencies;
  lazyDependencies = new $wnd.Map;
  clientDependencies.forEach(makeLambdaFunction(DependencyLoader$lambda$0$Type.prototype.accept, DependencyLoader$lambda$0$Type, [this$static, lazyDependencies]));
  lazyDependencies.size == 0 || runWhenEagerDependenciesLoaded(new DependencyLoader$lambda$1$Type(lazyDependencies));
}

function $loadEagerDependency(dependencyUrl, loader){
  ++eagerDependenciesLoading;
  loader.accept(dependencyUrl, EAGER_RESOURCE_LOAD_LISTENER);
}

function $requireHtmlImportsReady(this$static){
  ++eagerDependenciesLoading;
  $runWhenHtmlImportsReady(castTo($get(this$static.registry, Lcom_vaadin_client_ResourceLoader_2_classLit), 52), new DependencyLoader$4methodref$endEagerDependencyLoading$Type);
}

function DependencyLoader(registry){
  $clinit_DependencyLoader();
  this.registry = registry;
}

function endEagerDependencyLoading(){
  $clinit_DependencyLoader();
  var cmd, i_0;
  --eagerDependenciesLoading;
  if (eagerDependenciesLoading == 0 && callbacks.length != 0) {
    try {
      for (i_0 = 0; i_0 < callbacks.length; i_0++) {
        cmd = castTo(callbacks[i_0], 19);
        cmd.execute_0();
      }
    }
     finally {
      $clear(callbacks);
    }
  }
}

function lambda$5(lazyDependencies_0, loader_1, url_2){
  $clinit_DependencyLoader();
  return lazyDependencies_0.set(url_2, loader_1);
}

function runWhenEagerDependenciesLoaded(command){
  $clinit_DependencyLoader();
  eagerDependenciesLoading == 0?command.execute_0():callbacks.push(command);
}

defineClass(62, 1, {62:1}, DependencyLoader);
var EAGER_RESOURCE_LOAD_LISTENER, LAZY_RESOURCE_LOAD_LISTENER, callbacks, eagerDependenciesLoading = 0;
var Lcom_vaadin_client_DependencyLoader_2_classLit = createForClass('com.vaadin.client', 'DependencyLoader', 62);
function DependencyLoader$0methodref$inlineStyleSheet$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(169, 1, $intern_2, DependencyLoader$0methodref$inlineStyleSheet$Type);
_.accept = function accept(arg0, arg1){
  $inlineStyleSheet(this.$$outer_0, arg0, castTo(arg1, 16));
}
;
var Lcom_vaadin_client_DependencyLoader$0methodref$inlineStyleSheet$Type_2_classLit = createForClass('com.vaadin.client', 'DependencyLoader/0methodref$inlineStyleSheet$Type', 169);
var Lcom_vaadin_client_ResourceLoader$ResourceLoadListener_2_classLit = createForInterface('com.vaadin.client', 'ResourceLoader/ResourceLoadListener');
function DependencyLoader$1(){
}

defineClass(165, 1, $intern_3, DependencyLoader$1);
_.onError_0 = function onError(event_0){
  error_0(event_0.resourceUrl + ' could not be loaded.');
  endEagerDependencyLoading();
}
;
_.onLoad = function onLoad(event_0){
  endEagerDependencyLoading();
}
;
var Lcom_vaadin_client_DependencyLoader$1_2_classLit = createForClass('com.vaadin.client', 'DependencyLoader/1', 165);
function DependencyLoader$1methodref$loadStylesheet$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(170, 1, $intern_2, DependencyLoader$1methodref$loadStylesheet$Type);
_.accept = function accept_0(arg0, arg1){
  $loadStylesheet(this.$$outer_0, arg0, castTo(arg1, 16));
}
;
var Lcom_vaadin_client_DependencyLoader$1methodref$loadStylesheet$Type_2_classLit = createForClass('com.vaadin.client', 'DependencyLoader/1methodref$loadStylesheet$Type', 170);
function DependencyLoader$2(){
}

defineClass(166, 1, $intern_3, DependencyLoader$2);
_.onError_0 = function onError_0(event_0){
  error_0(event_0.resourceUrl + ' could not be loaded.');
}
;
_.onLoad = function onLoad_0(event_0){
}
;
var Lcom_vaadin_client_DependencyLoader$2_2_classLit = createForClass('com.vaadin.client', 'DependencyLoader/2', 166);
function DependencyLoader$2methodref$inlineHtml$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(171, 1, $intern_2, DependencyLoader$2methodref$inlineHtml$Type);
_.accept = function accept_1(arg0, arg1){
  $inlineHtml(this.$$outer_0, arg0, castTo(arg1, 16));
}
;
var Lcom_vaadin_client_DependencyLoader$2methodref$inlineHtml$Type_2_classLit = createForClass('com.vaadin.client', 'DependencyLoader/2methodref$inlineHtml$Type', 171);
function DependencyLoader$3methodref$inlineScript$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(173, 1, $intern_2, DependencyLoader$3methodref$inlineScript$Type);
_.accept = function accept_2(arg0, arg1){
  $inlineScript(this.$$outer_0, arg0, castTo(arg1, 16));
}
;
var Lcom_vaadin_client_DependencyLoader$3methodref$inlineScript$Type_2_classLit = createForClass('com.vaadin.client', 'DependencyLoader/3methodref$inlineScript$Type', 173);
function DependencyLoader$4methodref$endEagerDependencyLoading$Type(){
}

defineClass(176, 1, $intern_4, DependencyLoader$4methodref$endEagerDependencyLoading$Type);
_.run = function run_0(){
  endEagerDependencyLoading();
}
;
var Lcom_vaadin_client_DependencyLoader$4methodref$endEagerDependencyLoading$Type_2_classLit = createForClass('com.vaadin.client', 'DependencyLoader/4methodref$endEagerDependencyLoading$Type', 176);
function DependencyLoader$lambda$0$Type($$outer_0, lazyDependencies_1){
  this.$$outer_0 = $$outer_0;
  this.lazyDependencies_1 = lazyDependencies_1;
}

defineClass(307, $wnd.Function, {}, DependencyLoader$lambda$0$Type);
_.accept = function accept_3(arg0, arg1){
  $lambda$0(this.$$outer_0, this.lazyDependencies_1, arg0, arg1);
}
;
function DependencyLoader$lambda$1$Type(lazyDependencies_1){
  this.lazyDependencies_1 = lazyDependencies_1;
}

defineClass(168, 1, $intern_5, DependencyLoader$lambda$1$Type);
_.execute_0 = function execute_2(){
  $lambda$1(this.lazyDependencies_1);
}
;
var Lcom_vaadin_client_DependencyLoader$lambda$1$Type_2_classLit = createForClass('com.vaadin.client', 'DependencyLoader/lambda$1$Type', 168);
function DependencyLoader$lambda$2$Type(resourceLoader_0){
  this.resourceLoader_0 = resourceLoader_0;
}

defineClass(172, 1, $intern_2, DependencyLoader$lambda$2$Type);
_.accept = function accept_4(arg0, arg1){
  $clinit_DependencyLoader();
  $loadHtml(this.resourceLoader_0, arg0, castTo(arg1, 16));
}
;
var Lcom_vaadin_client_DependencyLoader$lambda$2$Type_2_classLit = createForClass('com.vaadin.client', 'DependencyLoader/lambda$2$Type', 172);
function DependencyLoader$lambda$3$Type(resourceLoader_0){
  this.resourceLoader_0 = resourceLoader_0;
}

defineClass(174, 1, $intern_2, DependencyLoader$lambda$3$Type);
_.accept = function accept_5(arg0, arg1){
  $clinit_DependencyLoader();
  $loadScript(this.resourceLoader_0, arg0, castTo(arg1, 16), true, 'text/javascript');
}
;
var Lcom_vaadin_client_DependencyLoader$lambda$3$Type_2_classLit = createForClass('com.vaadin.client', 'DependencyLoader/lambda$3$Type', 174);
function DependencyLoader$lambda$4$Type(resourceLoader_0){
  this.resourceLoader_0 = resourceLoader_0;
}

defineClass(175, 1, $intern_2, DependencyLoader$lambda$4$Type);
_.accept = function accept_6(arg0, arg1){
  $clinit_DependencyLoader();
  $loadScript(this.resourceLoader_0, arg0, castTo(arg1, 16), true, 'module');
}
;
var Lcom_vaadin_client_DependencyLoader$lambda$4$Type_2_classLit = createForClass('com.vaadin.client', 'DependencyLoader/lambda$4$Type', 175);
function DependencyLoader$lambda$5$Type(lazyDependencies_0){
  this.lazyDependencies_0 = lazyDependencies_0;
}

defineClass(308, $wnd.Function, {}, DependencyLoader$lambda$5$Type);
_.accept = function accept_7(arg0, arg1){
  lambda$5(this.lazyDependencies_0, arg0, arg1);
}
;
function DependencyLoader$lambda$6$Type(lazyDependencies_1){
  this.lazyDependencies_1 = lazyDependencies_1;
}

defineClass(167, 1, {}, DependencyLoader$lambda$6$Type);
_.execute_0 = function execute_3(){
  $lambda$6(this.lazyDependencies_1);
}
;
var Lcom_vaadin_client_DependencyLoader$lambda$6$Type_2_classLit = createForClass('com.vaadin.client', 'DependencyLoader/lambda$6$Type', 167);
function DependencyLoader$lambda$7$Type(){
}

defineClass(309, $wnd.Function, {}, DependencyLoader$lambda$7$Type);
_.accept = function accept_8(arg0, arg1){
  castTo(arg0, 48).accept(castToString(arg1), ($clinit_DependencyLoader() , LAZY_RESOURCE_LOAD_LISTENER));
}
;
function attachExistingElement(parent_0, previousSibling, tagName, id_0){
  var afterSibling, childIndex, childNodes, domNode, elementIndex, existingElement, existingId, i_0, i0, index_0, indices, list, node, stateNode;
  existingElement = null;
  childNodes = wrap_0(parent_0.domNode).childNodes;
  indices = new $wnd.Map;
  afterSibling = !previousSibling;
  elementIndex = -1;
  for (i0 = 0; i0 < childNodes.length; i0++) {
    node = castToJso(childNodes[i0]);
    indices.set(node, valueOf_0(i0));
    equals_Ljava_lang_Object__Z__devirtual$(node, previousSibling) && (afterSibling = true);
    if (afterSibling && !!node && $equalsIgnoreCase(tagName, node.tagName)) {
      existingElement = node;
      elementIndex = i0;
      break;
    }
  }
  if (!existingElement) {
    $sendExistingElementAttachToServer_0(parent_0.tree, parent_0, id_0, -1, tagName, -1);
  }
   else {
    list = $getList(parent_0, 2);
    existingId = null;
    childIndex = 0;
    for (i_0 = 0; i_0 < ($registerRead(list.eventRouter) , list.values.length); i_0++) {
      stateNode = castTo(list.values[i_0], 6);
      domNode = stateNode.domNode;
      index_0 = castTo(indices.get(domNode), 31);
      !!index_0 && index_0.value_0 < elementIndex && ++childIndex;
      if (equals_Ljava_lang_Object__Z__devirtual$(domNode, existingElement)) {
        existingId = valueOf_0(stateNode.id_0);
        break;
      }
    }
    existingId = getExistingIdOrUpdate(parent_0, id_0, existingElement, existingId);
    $sendExistingElementAttachToServer_0(parent_0.tree, parent_0, id_0, existingId.value_0, existingElement.tagName, childIndex);
  }
}

function getExistingIdOrUpdate(parent_0, serverSideId, existingElement, existingId){
  var fromMap, map_0;
  if (!existingId) {
    map_0 = castTo($get(parent_0.tree.registry, Lcom_vaadin_client_ExistingElementMap_2_classLit), 54);
    fromMap = castTo(map_0.elementToId.get(existingElement), 31);
    if (!fromMap) {
      map_0.idToElement[serverSideId] = existingElement;
      map_0.elementToId.set(existingElement, valueOf_0(serverSideId));
      return valueOf_0(serverSideId);
    }
    return fromMap;
  }
  return existingId;
}

function isPropertyDefined(node, property){
  return !!(node['constructor'] && node['constructor']['properties'] && node['constructor']['properties'][property]) && typeof node['constructor']['properties'][property]['value'] != 'undefined';
}

function populateModelProperties(node, properties){
  var i_0, map_0;
  map_0 = $getMap(node, 1);
  if (!node.domNode) {
    invokeWhenDefined(castToString($getValue($getProperty($getMap(node, 0), 'tag'))), new ExecuteJavaScriptElementUtils$lambda$0$Type(node, properties));
    return;
  }
  for (i_0 = 0; i_0 < properties.length; i_0++) {
    populateModelProperty(node, map_0, castToString(properties[i_0]));
  }
}

function populateModelProperty(node, map_0, property){
  var updatableProperties;
  if (isPropertyDefined(node.domNode, property)) {
    updatableProperties = castTo(node.nodeData.get(Lcom_vaadin_client_flow_model_UpdatableModelProperties_2_classLit), 68);
    if (!updatableProperties || !updatableProperties.properties.has(property)) {
      return;
    }
    $syncToServer($getProperty(map_0, property), node.domNode[property]);
  }
   else {
    $hasPropertyValue(map_0, property) || $setValue($getProperty(map_0, property), null);
  }
}

function registerUpdatableModelProperties(node, properties){
  var data_0;
  if (properties.length != 0) {
    data_0 = new UpdatableModelProperties(properties);
    node.nodeData.set(Lcom_vaadin_client_flow_model_UpdatableModelProperties_2_classLit, data_0);
  }
}

function ExecuteJavaScriptElementUtils$lambda$0$Type(node_0, properties_1){
  this.node_0 = node_0;
  this.properties_1 = properties_1;
}

defineClass(274, 1, $intern_4, ExecuteJavaScriptElementUtils$lambda$0$Type);
_.run = function run_1(){
  addPostFlushListener(new ExecuteJavaScriptElementUtils$lambda$1$Type(this.node_0, this.properties_1));
}
;
var Lcom_vaadin_client_ExecuteJavaScriptElementUtils$lambda$0$Type_2_classLit = createForClass('com.vaadin.client', 'ExecuteJavaScriptElementUtils/lambda$0$Type', 274);
var Lcom_vaadin_client_flow_reactive_FlushListener_2_classLit = createForInterface('com.vaadin.client.flow.reactive', 'FlushListener');
function ExecuteJavaScriptElementUtils$lambda$1$Type(node_0, properties_1){
  this.node_0 = node_0;
  this.properties_1 = properties_1;
}

defineClass(273, 1, $intern_6, ExecuteJavaScriptElementUtils$lambda$1$Type);
_.flush = function flush(){
  populateModelProperties(this.node_0, this.properties_1);
}
;
var Lcom_vaadin_client_ExecuteJavaScriptElementUtils$lambda$1$Type_2_classLit = createForClass('com.vaadin.client', 'ExecuteJavaScriptElementUtils/lambda$1$Type', 273);
function $getElement(this$static, id_0){
  return castToJso(this$static.idToElement[id_0]);
}

function $remove(this$static, id_0){
  var element;
  element = castToJso(this$static.idToElement[id_0]);
  if (element) {
    this$static.idToElement[id_0] = null;
    this$static.elementToId.delete(element);
  }
}

function ExistingElementMap(){
  this.elementToId = new $wnd.Map;
  this.idToElement = [];
}

defineClass(54, 1, {54:1}, ExistingElementMap);
var Lcom_vaadin_client_ExistingElementMap_2_classLit = createForClass('com.vaadin.client', 'ExistingElementMap', 54);
function $collectInitialProperties(this$static, id_0, properties){
  var map_0, node;
  node = $getNode(castTo($get(this$static.registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9), round_int((checkCriticalNotNull(id_0) , id_0)));
  if (node.features.has(1)) {
    map_0 = new $wnd.Map;
    $forEachProperty($getMap(node, 1), makeLambdaFunction(InitialPropertiesHandler$lambda$2$Type.prototype.accept, InitialPropertiesHandler$lambda$2$Type, [map_0]));
    properties.set(id_0, map_0);
  }
}

function $doFlushPropertyUpdates(this$static, properties){
  var property;
  this$static.newNodeDuringUpdate.clear();
  while (this$static.propertyUpdateQueue.length > 0) {
    property = castTo(this$static.propertyUpdateQueue.splice(0, 1)[0], 25);
    $resetProperty(property, properties) || $sendNodePropertySyncToServer(castTo($get(this$static.registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9), property);
    flush_17();
  }
}

function $flushPropertyUpdates(this$static){
  var map_0;
  if (!castTo($get(this$static.registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).updateInProgress) {
    map_0 = new $wnd.Map;
    this$static.newNodeDuringUpdate.forEach(makeLambdaFunction(InitialPropertiesHandler$lambda$0$Type.prototype.accept_0, InitialPropertiesHandler$lambda$0$Type, [this$static, map_0]));
    addPostFlushListener(new InitialPropertiesHandler$lambda$1$Type(this$static, map_0));
  }
}

function $handlePropertyUpdate(this$static, property){
  if ($isNodeNewlyCreated(this$static, property.map_0.node)) {
    this$static.propertyUpdateQueue.push(property);
    return true;
  }
  return false;
}

function $isNodeNewlyCreated(this$static, node){
  return this$static.newNodeDuringUpdate.has(node.id_0);
}

function $lambda$0_0(this$static, map_1, node_1){
  $collectInitialProperties(this$static, node_1, map_1);
}

function $nodeRegistered(this$static, node){
  this$static.newNodeDuringUpdate.add(node.id_0);
}

function $resetProperty(property, properties){
  var ignoreProperties, value_0;
  ignoreProperties = castToNative(properties.get(property.map_0.node.id_0), $wnd.Map);
  if (ignoreProperties != null && ignoreProperties.has(property.name_0)) {
    value_0 = ignoreProperties.get(property.name_0);
    $setValue(property, value_0);
    return true;
  }
  return false;
}

function InitialPropertiesHandler(registry){
  this.newNodeDuringUpdate = new $wnd.Set;
  this.propertyUpdateQueue = [];
  this.registry = registry;
}

function lambda$2(map_0, property_1, name_2){
  return map_0.set(name_2, ($registerRead(property_1.eventRouter) , property_1.value_0));
}

defineClass(44, 1, {44:1}, InitialPropertiesHandler);
var Lcom_vaadin_client_InitialPropertiesHandler_2_classLit = createForClass('com.vaadin.client', 'InitialPropertiesHandler', 44);
function InitialPropertiesHandler$lambda$0$Type($$outer_0, map_1){
  this.$$outer_0 = $$outer_0;
  this.map_1 = map_1;
}

defineClass(310, $wnd.Function, {}, InitialPropertiesHandler$lambda$0$Type);
_.accept_0 = function accept_9(arg0){
  $lambda$0_0(this.$$outer_0, this.map_1, arg0);
}
;
function InitialPropertiesHandler$lambda$1$Type($$outer_0, map_1){
  this.$$outer_0 = $$outer_0;
  this.map_1 = map_1;
}

defineClass(182, 1, $intern_6, InitialPropertiesHandler$lambda$1$Type);
_.flush = function flush_0(){
  $doFlushPropertyUpdates(this.$$outer_0, this.map_1);
}
;
var Lcom_vaadin_client_InitialPropertiesHandler$lambda$1$Type_2_classLit = createForClass('com.vaadin.client', 'InitialPropertiesHandler/lambda$1$Type', 182);
function InitialPropertiesHandler$lambda$2$Type(map_0){
  this.map_0 = map_0;
}

defineClass(311, $wnd.Function, {}, InitialPropertiesHandler$lambda$2$Type);
_.accept = function accept_10(arg0, arg1){
  lambda$2(this.map_0, arg0, arg1);
}
;
function $getElement_0(this$static){
  if (!this$static.element) {
    $setupTheming(this$static);
    this$static.element = $doc.createElement('div');
    $appendChild($doc.body, this$static.element);
  }
  return this$static.element;
}

function $hide(this$static){
  $cancel(this$static.firstTimer);
  $cancel(this$static.secondTimer);
  $cancel(this$static.thirdTimer);
  $getElement_0(this$static).style.display = 'none';
}

function $setApplyDefaultTheme(this$static, applyDefaultTheme){
  this$static.applyDefaultTheme = applyDefaultTheme;
  $setupTheming(this$static);
}

function $setFirstDelay(this$static, firstDelay){
  this$static.firstDelay = firstDelay;
}

function $setSecondDelay(this$static, secondDelay){
  this$static.secondDelay = secondDelay;
}

function $setThirdDelay(this$static, thirdDelay){
  this$static.thirdDelay = thirdDelay;
}

function $setupTheming(this$static){
  var attached;
  if (!this$static.styleElement) {
    this$static.styleElement = $doc.createElement('style');
    this$static.styleElement.setAttribute('type', 'text/css');
    this$static.styleElement.innerHTML = '@-webkit-keyframes v-progress-start {0% {width: 0%;}100% {width: 50%;}}@-moz-keyframes v-progress-start {0% {width: 0%;}100% {width: 50%;}}@keyframes v-progress-start {0% {width: 0%;}100% {width: 50%;}}@keyframes v-progress-delay {0% {width: 50%;}100% {width: 90%;}}@keyframes v-progress-wait {0% {width: 90%;height: 4px;}3% {width: 91%;height: 7px;}100% {width: 96%;height: 7px;}}@-webkit-keyframes v-progress-wait-pulse {0% {opacity: 1;}50% {opacity: 0.1;}100% {opacity: 1;}}@-moz-keyframes v-progress-wait-pulse {0% {opacity: 1;}50% {opacity: 0.1;}100% {opacity: 1;}}@keyframes v-progress-wait-pulse {0% {opacity: 1;}50% {opacity: 0.1;}100% {opacity: 1;}}.v-loading-indicator {position: fixed !important;z-index: 99999;left: 0;right: auto;top: 0;width: 50%;opacity: 1;height: 4px;background-color: var(--lumo-primary-color, blue);pointer-events: none;transition: none;animation: v-progress-start 1000ms 200ms both;}.v-loading-indicator[style*="none"] {display: block !important;width: 100% !important;opacity: 0;animation: none !important;transition: opacity 500ms 300ms, width 300ms;}.v-loading-indicator.second {width: 90%;animation: v-progress-delay 3.8s forwards;}.v-loading-indicator.third {width: 96%;animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;}';
  }
  attached = !!this$static.styleElement.parentElement;
  this$static.applyDefaultTheme && !attached?$appendChild($doc.head, this$static.styleElement):!this$static.applyDefaultTheme && attached && $removeChild(this$static.styleElement.parentElement, this$static.styleElement);
}

function $show(this$static){
  var secondTimerDelay, thirdTimerDelay;
  $getElement_0(this$static).className = 'v-loading-indicator';
  $getElement_0(this$static).classList.add('first');
  $getElement_0(this$static).style.display = 'block';
  secondTimerDelay = this$static.secondDelay - this$static.firstDelay;
  secondTimerDelay >= 0 && $schedule(this$static.secondTimer, secondTimerDelay);
  thirdTimerDelay = this$static.thirdDelay - this$static.firstDelay;
  thirdTimerDelay >= 0 && $schedule(this$static.thirdTimer, thirdTimerDelay);
}

function $trigger(this$static){
  $hide(this$static);
  $schedule(this$static.firstTimer, this$static.firstDelay);
}

function LoadingIndicator(){
  this.firstTimer = new LoadingIndicator$1(this);
  this.secondTimer = new LoadingIndicator$2(this);
  this.thirdTimer = new LoadingIndicator$3(this);
}

defineClass(36, 1, {36:1}, LoadingIndicator);
_.applyDefaultTheme = true;
_.firstDelay = 300;
_.secondDelay = 1500;
_.thirdDelay = 5000;
var Lcom_vaadin_client_LoadingIndicator_2_classLit = createForClass('com.vaadin.client', 'LoadingIndicator', 36);
function LoadingIndicator$1(this$0){
  this.this$01 = this$0;
  Timer.call(this);
}

defineClass(141, 22, {}, LoadingIndicator$1);
_.run = function run_2(){
  $show(this.this$01);
}
;
var Lcom_vaadin_client_LoadingIndicator$1_2_classLit = createForClass('com.vaadin.client', 'LoadingIndicator/1', 141);
function LoadingIndicator$2(this$0){
  this.this$01 = this$0;
  Timer.call(this);
}

defineClass(142, 22, {}, LoadingIndicator$2);
_.run = function run_3(){
  $getElement_0(this.this$01).className = 'v-loading-indicator';
  $getElement_0(this.this$01).classList.add('second');
}
;
var Lcom_vaadin_client_LoadingIndicator$2_2_classLit = createForClass('com.vaadin.client', 'LoadingIndicator/2', 142);
function LoadingIndicator$3(this$0){
  this.this$01 = this$0;
  Timer.call(this);
}

defineClass(143, 22, {}, LoadingIndicator$3);
_.run = function run_4(){
  $getElement_0(this.this$01).className = 'v-loading-indicator';
  $getElement_0(this.this$01).classList.add('third');
}
;
var Lcom_vaadin_client_LoadingIndicator$3_2_classLit = createForClass('com.vaadin.client', 'LoadingIndicator/3', 143);
function addReadyListener(polymerElement, listener){
  var set_0;
  readyListeners == null && (readyListeners = createNativeWeakMap());
  set_0 = castToNative(readyListeners.get(polymerElement), $wnd.Set);
  if (set_0 == null) {
    set_0 = new $wnd.Set;
    readyListeners.set(polymerElement, set_0);
  }
  set_0.add(listener);
}

function createModelTree(object){
  var convert, convertedObject, feature, node, property;
  if (instanceOf(object, 6)) {
    node = castTo(object, 6);
    feature = null;
    if (node.features.has(1)) {
      feature = $getMap(node, 1);
    }
     else if (node.features.has(16)) {
      feature = $getList(node, 16);
    }
     else if (node.features.has(23)) {
      return createModelTree($getProperty($getMap(node, 23), 'value'));
    }
    if (!feature) {
      debugger;
      throw toJs(new AssertionError_0("Don't know how to convert node without map or list features"));
    }
    convert = feature.convert(new PolymerUtils$0methodref$createModelTree$Type);
    if (!!convert && !('nodeId' in convert)) {
      convert['nodeId'] = createProd(node.id_0);
      registerChangeHandlers(node, feature, convert);
    }
    return convert;
  }
   else if (instanceOf(object, 25)) {
    property = castTo(object, 25);
    if (property.map_0.id_0 == 23) {
      return createModelTree(($registerRead(property.eventRouter) , property.value_0));
    }
     else {
      convertedObject = {};
      convertedObject[property.name_0] = createModelTree(($registerRead(property.eventRouter) , property.value_0));
      return convertedObject;
    }
  }
   else {
    return object;
  }
}

function doGetNotificationPath(rootNode, currentNode, path){
  var i_0, listPath, parent_0, pathBuilder, propertyPath, sep;
  parent_0 = currentNode.parent_0;
  if (parent_0.features.has(1)) {
    propertyPath = getPropertiesNotificationPath(currentNode);
    if (propertyPath == null) {
      return null;
    }
    path.push(propertyPath);
  }
   else if (parent_0.features.has(16)) {
    listPath = getListNotificationPath(currentNode);
    if (listPath == null) {
      return null;
    }
    path.push(listPath);
  }
  if (!equals_Ljava_lang_Object__Z__devirtual$(parent_0, rootNode)) {
    return doGetNotificationPath(rootNode, parent_0, path);
  }
  pathBuilder = new StringBuilder;
  sep = '';
  for (i_0 = path.length - 1; i_0 >= 0; i_0--) {
    $append_0((pathBuilder.string += sep , pathBuilder), castToString(path[i_0]));
    sep = '.';
  }
  return pathBuilder.string;
}

function doHandleListChange(event_0, value_0){
  var add_0, array, index_0, node, path, payload, remove, root;
  add_0 = event_0.add_0;
  index_0 = event_0.index_0;
  remove = event_0.remove_0.length;
  node = castTo(event_0.source, 35).node;
  root = getFirstParentWithDomNode(node);
  if (!root) {
    warn('Root node for node ' + node.id_0 + ' could not be found');
    return;
  }
  array = [];
  add_0.forEach(makeLambdaFunction(PolymerUtils$lambda$5$Type.prototype.accept_0, PolymerUtils$lambda$5$Type, [array]));
  if (isPolymerElement(root.domNode)) {
    path = getNotificationPath(root, node, null);
    if (path != null) {
      splice(root.domNode, path, index_0, remove, array);
      return;
    }
  }
  payload = castToJsArray(value_0);
  spliceArray(payload, index_0, remove, array);
}

function doHandlePropertyChange(property, value_0){
  var modelTree, node, path, propertyName, root;
  propertyName = property.name_0;
  node = property.map_0.node;
  root = getFirstParentWithDomNode(node);
  if (!root) {
    warn('Root node for node ' + node.id_0 + ' could not be found');
    return;
  }
  modelTree = createModelTree(($registerRead(property.eventRouter) , property.value_0));
  if (isPolymerElement(root.domNode)) {
    path = getNotificationPath(root, node, propertyName);
    path != null && setProperty(root.domNode, path, modelTree);
    return;
  }
  value_0[propertyName] = modelTree;
}

function fireReadyEvent(polymerElement){
  var listeners;
  if (readyListeners == null) {
    return;
  }
  listeners = castToNative(readyListeners.get(polymerElement), $wnd.Set);
  if (listeners != null) {
    readyListeners.delete(polymerElement);
    listeners.forEach(makeLambdaFunction(PolymerUtils$2methodref$run$Type.prototype.accept_0, PolymerUtils$2methodref$run$Type, []));
  }
}

function getChildIgnoringStyles(parent_0, index_0){
  var children, element, filteredIndex, i_0, next;
  children = wrap_0(parent_0).children;
  filteredIndex = -1;
  for (i_0 = 0; i_0 < children.length; i_0++) {
    next = children.item(i_0);
    if (!next) {
      debugger;
      throw toJs(new AssertionError_0('Unexpected element type in the collection of children. DomElement::getChildren is supposed to return Element chidren only, but got ' + getClass_1(next)));
    }
    element = next;
    $equalsIgnoreCase('style', element.tagName) || ++filteredIndex;
    if (filteredIndex == index_0) {
      return next;
    }
  }
  return null;
}

function getCustomElement(root, path){
  var current, i_0, value_0;
  current = root;
  for (i_0 = 0; i_0 < path.length; i_0++) {
    value_0 = path[i_0];
    current = getChildIgnoringStyles(current, round_int($asNumber(value_0)));
  }
  if (current) {
    return current;
  }
   else 
    !current?shouldLogToBrowserConsole && $warn($wnd.console, "There is no element addressed by the path '" + path + "'"):shouldLogToBrowserConsole && $warn($wnd.console, 'The node addressed by path ' + path + ' is not an Element');
  return null;
}

function getDomElementById(shadowRootParent, id_0){
  return shadowRootParent.$[id_0];
}

function getFirstParentWithDomNode(node){
  var parent_0;
  parent_0 = node.parent_0;
  while (!!parent_0 && !parent_0.domNode) {
    parent_0 = parent_0.parent_0;
  }
  return parent_0;
}

function getListNotificationPath(currentNode){
  var children, i_0, indexInTheList, object;
  indexInTheList = -1;
  children = $getList(currentNode.parent_0, 16);
  for (i_0 = 0; i_0 < ($registerRead(children.eventRouter) , children.values.length); i_0++) {
    object = children.values[i_0];
    if (equals_Ljava_lang_Object__Z__devirtual$(currentNode, object)) {
      indexInTheList = i_0;
      break;
    }
  }
  if (indexInTheList < 0) {
    return null;
  }
  return '' + indexInTheList;
}

function getNotificationPath(rootNode, currentNode, propertyName){
  var path;
  path = [];
  propertyName != null && path.push(propertyName);
  return doGetNotificationPath(rootNode, currentNode, path);
}

function getPropertiesNotificationPath(currentNode){
  var i_0, map_0, propertyName, propertyNameInTheMap, propertyNames, list;
  propertyNameInTheMap = null;
  map_0 = $getMap(currentNode.parent_0, 1);
  propertyNames = (list = [] , $forEachProperty(map_0, makeLambdaFunction(NodeMap$lambda$0$Type.prototype.accept, NodeMap$lambda$0$Type, [list])) , list);
  for (i_0 = 0; i_0 < propertyNames.length; i_0++) {
    propertyName = castToString(propertyNames[i_0]);
    if (equals_Ljava_lang_Object__Z__devirtual$(currentNode, $getValue($getProperty(map_0, propertyName)))) {
      propertyNameInTheMap = propertyName;
      break;
    }
  }
  if (propertyNameInTheMap == null) {
    return null;
  }
  return propertyNameInTheMap;
}

function invokeWhenDefined(tagName, runnable){
  $wnd.customElements.whenDefined(tagName).then(function(){
    runnable.run();
  }
  );
}

function isPolymerElement(htmlNode){
  var isP2Element = typeof $wnd.Polymer === 'function' && $wnd.Polymer.Element && htmlNode instanceof $wnd.Polymer.Element;
  var isP3Element = htmlNode.constructor.polymerElementVersion !== undefined;
  return isP2Element || isP3Element;
}

function lambda$0_0(value_0, event_1){
  addFlushListener(new PolymerUtils$lambda$4$Type(event_1, value_0));
}

function lambda$2_0(registrations_0, value_1, event_2){
  var property;
  property = event_2.property;
  registrations_0.push($addChangeListener(property, new PolymerUtils$lambda$7$Type(property, value_1)));
  addFlushListener(new PolymerUtils$lambda$6$Type(property, value_1));
}

function lambda$3(registrations_0, value_1, property_2){
  return registrations_0.push($addChangeListener(property_2, new PolymerUtils$lambda$8$Type(property_2, value_1)));
}

function mayBePolymerElement(htmlNode){
  return $wnd.customElements && htmlNode.localName.indexOf('-') > -1;
}

function registerChangeHandlers(node, feature, value_0){
  var list, map_0, registrations;
  registrations = [];
  if (node.features.has(1)) {
    if (!instanceOf(feature, 39)) {
      debugger;
      throw toJs(new AssertionError_0('Received an inconsistent NodeFeature for a node that has a ELEMENT_PROPERTIES feature. It should be NodeMap, but it is: ' + feature));
    }
    map_0 = castTo(feature, 39);
    $forEachProperty(map_0, makeLambdaFunction(PolymerUtils$lambda$3$Type.prototype.accept, PolymerUtils$lambda$3$Type, [registrations, value_0]));
    registrations.push($addPropertyAddListener(map_0, new PolymerUtils$lambda$2$Type(registrations, value_0)));
  }
   else if (node.features.has(16)) {
    if (!instanceOf(feature, 35)) {
      debugger;
      throw toJs(new AssertionError_0('Received an inconsistent NodeFeature for a node that has a TEMPLATE_MODELLIST feature. It should be NodeList, but it is: ' + feature));
    }
    list = castTo(feature, 35);
    registrations.push($addSpliceListener(list, new PolymerUtils$lambda$0$Type(value_0)));
  }
  if (registrations.length == 0) {
    debugger;
    throw toJs(new AssertionError_0('Node should have ELEMENT_PROPERTIES or TEMPLATE_MODELLIST feature'));
  }
  registrations.push($addUnregisterListener(node, new PolymerUtils$lambda$1$Type(registrations)));
}

function setProperty(element, path, value_0){
  element.set(path, value_0);
}

function splice(htmlNode, path, startIndex, deleteCount, itemsToAdd){
  htmlNode.splice.apply(htmlNode, [path, startIndex, deleteCount].concat(itemsToAdd));
}

var readyListeners;
function $apply(arg0){
  return createModelTree(arg0);
}

function PolymerUtils$0methodref$createModelTree$Type(){
}

defineClass(259, 1, {}, PolymerUtils$0methodref$createModelTree$Type);
_.apply_0 = function apply_1(arg0){
  return $apply(arg0);
}
;
var Lcom_vaadin_client_PolymerUtils$0methodref$createModelTree$Type_2_classLit = createForClass('com.vaadin.client', 'PolymerUtils/0methodref$createModelTree$Type', 259);
function PolymerUtils$1methodref$remove$Type(){
}

defineClass(331, $wnd.Function, {}, PolymerUtils$1methodref$remove$Type);
_.accept_0 = function accept_11(arg0){
  castTo(arg0, 29).remove_1();
}
;
function PolymerUtils$2methodref$run$Type(){
}

defineClass(330, $wnd.Function, {}, PolymerUtils$2methodref$run$Type);
_.accept_0 = function accept_12(arg0){
  castTo(arg0, 41).run();
}
;
function PolymerUtils$lambda$0$Type(value_0){
  this.value_0 = value_0;
}

defineClass(260, 1, $intern_7, PolymerUtils$lambda$0$Type);
_.onSplice = function onSplice(arg0){
  lambda$0_0(this.value_0, arg0);
}
;
var Lcom_vaadin_client_PolymerUtils$lambda$0$Type_2_classLit = createForClass('com.vaadin.client', 'PolymerUtils/lambda$0$Type', 260);
function PolymerUtils$lambda$1$Type(registrations_0){
  this.registrations_0 = registrations_0;
}

defineClass(261, 1, {}, PolymerUtils$lambda$1$Type);
_.onUnregister = function onUnregister(arg0){
  this.registrations_0.forEach(makeLambdaFunction(PolymerUtils$1methodref$remove$Type.prototype.accept_0, PolymerUtils$1methodref$remove$Type, []));
}
;
var Lcom_vaadin_client_PolymerUtils$lambda$1$Type_2_classLit = createForClass('com.vaadin.client', 'PolymerUtils/lambda$1$Type', 261);
function PolymerUtils$lambda$2$Type(registrations_0, value_1){
  this.registrations_0 = registrations_0;
  this.value_1 = value_1;
}

defineClass(263, 1, $intern_8, PolymerUtils$lambda$2$Type);
_.onPropertyAdd = function onPropertyAdd(arg0){
  lambda$2_0(this.registrations_0, this.value_1, arg0);
}
;
var Lcom_vaadin_client_PolymerUtils$lambda$2$Type_2_classLit = createForClass('com.vaadin.client', 'PolymerUtils/lambda$2$Type', 263);
function PolymerUtils$lambda$3$Type(registrations_0, value_1){
  this.registrations_0 = registrations_0;
  this.value_1 = value_1;
}

defineClass(328, $wnd.Function, {}, PolymerUtils$lambda$3$Type);
_.accept = function accept_13(arg0, arg1){
  lambda$3(this.registrations_0, this.value_1, arg0);
}
;
function PolymerUtils$lambda$4$Type(event_0, value_1){
  this.event_0 = event_0;
  this.value_1 = value_1;
}

defineClass(265, 1, $intern_6, PolymerUtils$lambda$4$Type);
_.flush = function flush_1(){
  doHandleListChange(this.event_0, this.value_1);
}
;
var Lcom_vaadin_client_PolymerUtils$lambda$4$Type_2_classLit = createForClass('com.vaadin.client', 'PolymerUtils/lambda$4$Type', 265);
function PolymerUtils$lambda$5$Type(array_0){
  this.array_0 = array_0;
}

defineClass(329, $wnd.Function, {}, PolymerUtils$lambda$5$Type);
_.accept_0 = function accept_14(arg0){
  this.array_0.push(createModelTree(arg0));
}
;
function PolymerUtils$lambda$6$Type(property_0, bean_1){
  this.property_0 = property_0;
  this.bean_1 = bean_1;
}

defineClass(82, 1, $intern_6, PolymerUtils$lambda$6$Type);
_.flush = function flush_2(){
  doHandlePropertyChange(this.property_0, this.bean_1);
}
;
var Lcom_vaadin_client_PolymerUtils$lambda$6$Type_2_classLit = createForClass('com.vaadin.client', 'PolymerUtils/lambda$6$Type', 82);
function PolymerUtils$lambda$7$Type(property_0, value_1){
  this.property_0 = property_0;
  this.value_1 = value_1;
}

defineClass(262, 1, $intern_9, PolymerUtils$lambda$7$Type);
_.onPropertyChange = function onPropertyChange(arg0){
  addFlushListener(new PolymerUtils$lambda$6$Type(this.property_0, this.value_1));
}
;
var Lcom_vaadin_client_PolymerUtils$lambda$7$Type_2_classLit = createForClass('com.vaadin.client', 'PolymerUtils/lambda$7$Type', 262);
function PolymerUtils$lambda$8$Type(property_0, value_1){
  this.property_0 = property_0;
  this.value_1 = value_1;
}

defineClass(264, 1, $intern_9, PolymerUtils$lambda$8$Type);
_.onPropertyChange = function onPropertyChange_0(arg0){
  addFlushListener(new PolymerUtils$lambda$6$Type(this.property_0, this.value_1));
}
;
var Lcom_vaadin_client_PolymerUtils$lambda$8$Type_2_classLit = createForClass('com.vaadin.client', 'PolymerUtils/lambda$8$Type', 264);
function $bind(this$static){
  $addResponseHandlingEndedHandler(castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12), new PopStateHandler$lambda$0$Type(this$static));
  $setOnpopstate($wnd, new PopStateHandler$0methodref$onPopStateEvent$Type(this$static));
}

function $onPopStateEvent(this$static, e){
  var location_0, path, requiresServerSideRoundtrip, stateObject, location_1, location_2;
  if (castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10).state_0 != ($clinit_UILifecycle$UIState() , RUNNING)) {
    redirect(null);
    return;
  }
  path = $wnd.location.pathname;
  if (this$static.pathAfterPreviousResponse == null) {
    debugger;
    throw toJs(new AssertionError_0('Initial response has not ended before pop state event was triggered'));
  }
  requiresServerSideRoundtrip = path != this$static.pathAfterPreviousResponse;
  $onPopStateEvent_0(castTo($get(this$static.registry, Lcom_vaadin_client_ScrollPositionHandler_2_classLit), 34), e, requiresServerSideRoundtrip);
  if (!requiresServerSideRoundtrip) {
    return;
  }
  location_0 = getBaseRelativeUri($doc.baseURI, $doc.location.href);
  location_0.indexOf('#') != -1 && (location_0 = $split(location_0, '#', 2)[0]);
  stateObject = e['state'];
  sendServerNavigationEvent(this$static.registry, location_0, stateObject, false);
}

function PopStateHandler(registry){
  this.registry = registry;
}

defineClass(145, 1, {}, PopStateHandler);
var Lcom_vaadin_client_PopStateHandler_2_classLit = createForClass('com.vaadin.client', 'PopStateHandler', 145);
function PopStateHandler$0methodref$onPopStateEvent$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(147, 1, {}, PopStateHandler$0methodref$onPopStateEvent$Type);
_.handleEvent_0 = function handleEvent(arg0){
  $onPopStateEvent(this.$$outer_0, arg0);
}
;
var Lcom_vaadin_client_PopStateHandler$0methodref$onPopStateEvent$Type_2_classLit = createForClass('com.vaadin.client', 'PopStateHandler/0methodref$onPopStateEvent$Type', 147);
function PopStateHandler$lambda$0$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(146, 1, $intern_10, PopStateHandler$lambda$0$Type);
_.onResponseHandlingEnded = function onResponseHandlingEnded(arg0){
  this.$$outer_0.pathAfterPreviousResponse = $wnd.location.pathname;
}
;
var Lcom_vaadin_client_PopStateHandler$lambda$0$Type_2_classLit = createForClass('com.vaadin.client', 'PopStateHandler/lambda$0$Type', 146);
function ensureNoLogger(){
  if (typeof $wnd.Vaadin.Flow.gwtStatsEvents == 'object') {
    delete $wnd.Vaadin.Flow.gwtStatsEvents;
    typeof $wnd.__gwtStatsEvent == 'function' && ($wnd.__gwtStatsEvent = function(){
      return true;
    }
    );
  }
}

function getRelativeTimeString(reference){
  return '' + round_0(relativeTimeSupplier.getRelativeTime() - reference, 3);
}

function round_0(num, exp_0){
  return +(Math.round(num + 'e+' + exp_0) + 'e-' + exp_0);
}

var relativeTimeSupplier;
function Profiler$DefaultRelativeTimeSupplier(){
}

defineClass(100, 1, {}, Profiler$DefaultRelativeTimeSupplier);
_.getRelativeTime = function getRelativeTime(){
  return (new Date).getTime();
}
;
var Lcom_vaadin_client_Profiler$DefaultRelativeTimeSupplier_2_classLit = createForClass('com.vaadin.client', 'Profiler/DefaultRelativeTimeSupplier', 100);
function Profiler$HighResolutionTimeSupplier(){
}

defineClass(99, 1, {}, Profiler$HighResolutionTimeSupplier);
_.getRelativeTime = function getRelativeTime_0(){
  return $wnd.performance.now();
}
;
var Lcom_vaadin_client_Profiler$HighResolutionTimeSupplier_2_classLit = createForClass('com.vaadin.client', 'Profiler/HighResolutionTimeSupplier', 99);
function $fireError(this$static, event_0){
  var i_0, listener, listeners, resource;
  $handleError(castTo($get(this$static.registry, Lcom_vaadin_client_SystemErrorHandler_2_classLit), 17), 'Error loading ' + event_0.resourceUrl);
  resource = event_0.resourceUrl;
  listeners = castToJsArray(this$static.loadListeners.get(resource));
  this$static.loadListeners.delete(resource);
  if (listeners != null && listeners.length != 0) {
    for (i_0 = 0; i_0 < listeners.length; i_0++) {
      listener = castTo(listeners[i_0], 16);
      !!listener && listener.onError_0(event_0);
    }
  }
}

function $fireLoad(this$static, event_0){
  var i_0, listener, listeners, resource;
  log_0('Loaded ' + event_0.resourceUrl);
  resource = event_0.resourceUrl;
  listeners = castToJsArray(this$static.loadListeners.get(resource));
  this$static.loadedResources.add(resource);
  this$static.loadListeners.delete(resource);
  if (listeners != null && listeners.length != 0) {
    for (i_0 = 0; i_0 < listeners.length; i_0++) {
      listener = castTo(listeners[i_0], 16);
      !!listener && listener.onLoad(event_0);
    }
  }
}

function $initLoadedResourcesFromDom(this$static){
  var document_0, element, href_0, i_0, i0, linkElement, links_0, rel_0, scripts, src_0;
  document_0 = $doc;
  scripts = document_0.getElementsByTagName('script');
  for (i0 = 0; i0 < scripts.length; i0++) {
    element = scripts.item(i0);
    src_0 = element.src;
    src_0 != null && src_0.length != 0 && this$static.loadedResources.add(src_0);
  }
  links_0 = document_0.getElementsByTagName('link');
  for (i_0 = 0; i_0 < links_0.length; i_0++) {
    linkElement = links_0.item(i_0);
    rel_0 = linkElement.rel;
    href_0 = linkElement.href;
    ($equalsIgnoreCase('stylesheet', rel_0) || $equalsIgnoreCase('import', rel_0)) && href_0 != null && href_0.length != 0 && this$static.loadedResources.add(href_0);
  }
}

function $inlineHtml(this$static, htmlContents, resourceLoadListener){
  var event_0, listener, spanElement;
  event_0 = new ResourceLoader$ResourceLoadEvent(htmlContents);
  if (this$static.loadedResources.has(htmlContents)) {
    !!resourceLoadListener && resourceLoadListener.onLoad(event_0);
    return;
  }
  if (addListener(htmlContents, resourceLoadListener, this$static.loadListeners)) {
    spanElement = $doc.createElement('span');
    spanElement.innerHTML = htmlContents;
    spanElement.setAttribute('hidden', 'true');
    listener = new ResourceLoader$HtmlLoadListener(this$static, event_0);
    $appendChild($doc, spanElement);
    addOnloadHandler(spanElement, listener, event_0);
    this$static.supportsHtmlWhenReady && addHtmlImportsReadyHandler(listener);
  }
}

function $inlineScript(this$static, scriptContents, resourceLoadListener){
  var event_0, scriptElement;
  event_0 = new ResourceLoader$ResourceLoadEvent(scriptContents);
  if (this$static.loadedResources.has(scriptContents)) {
    !!resourceLoadListener && resourceLoadListener.onLoad(event_0);
    return;
  }
  if (addListener(scriptContents, resourceLoadListener, this$static.loadListeners)) {
    scriptElement = $doc.createElement('script');
    scriptElement.textContent = scriptContents;
    scriptElement.type = 'text/javascript';
    addOnloadHandler(scriptElement, new ResourceLoader$SimpleLoadListener(this$static), event_0);
    $appendChild($doc.head, scriptElement);
  }
}

function $inlineStyleSheet(this$static, styleSheetContents, resourceLoadListener){
  var event_0, styleSheetElement;
  event_0 = new ResourceLoader$ResourceLoadEvent(styleSheetContents);
  if (this$static.loadedResources.has(styleSheetContents)) {
    !!resourceLoadListener && resourceLoadListener.onLoad(event_0);
    return;
  }
  if (addListener(styleSheetContents, resourceLoadListener, this$static.loadListeners)) {
    styleSheetElement = $doc.createElement('style');
    styleSheetElement.textContent = styleSheetContents;
    styleSheetElement.type = 'text/css';
    $isSafariOrIOS((!instance_0 && (instance_0 = new BrowserInfo) , instance_0).browserDetails) || (!instance_0 && (instance_0 = new BrowserInfo) , instance_0).browserDetails.isOpera?$schedule(new ResourceLoader$3(this$static, styleSheetContents, event_0), 5000):addOnloadHandler(styleSheetElement, new ResourceLoader$4(this$static), event_0);
    $appendChild($doc.head, styleSheetElement);
  }
}

function $loadHtml(this$static, htmlUrl, resourceLoadListener){
  var event_0, linkTag, listener, url_0;
  url_0 = getAbsoluteUrl(htmlUrl);
  event_0 = new ResourceLoader$ResourceLoadEvent(url_0);
  if (this$static.loadedResources.has(url_0)) {
    !!resourceLoadListener && resourceLoadListener.onLoad(event_0);
    return;
  }
  if (addListener(url_0, resourceLoadListener, this$static.loadListeners)) {
    linkTag = $doc.createElement('link');
    linkTag.setAttribute('rel', 'import');
    linkTag.setAttribute('href', url_0);
    listener = new ResourceLoader$HtmlLoadListener(this$static, event_0);
    addOnloadHandler(linkTag, listener, event_0);
    $appendChild($doc.head, linkTag);
    this$static.supportsHtmlWhenReady && addHtmlImportsReadyHandler(listener);
  }
}

function $loadScript(this$static, scriptUrl, resourceLoadListener, defer_0, type_0){
  var event_0, scriptTag, url_0;
  url_0 = getAbsoluteUrl(scriptUrl);
  event_0 = new ResourceLoader$ResourceLoadEvent(url_0);
  if (this$static.loadedResources.has(url_0)) {
    !!resourceLoadListener && resourceLoadListener.onLoad(event_0);
    return;
  }
  if (addListener(url_0, resourceLoadListener, this$static.loadListeners)) {
    scriptTag = $doc.createElement('script');
    scriptTag.src = url_0;
    scriptTag.type = type_0;
    scriptTag.async = false;
    scriptTag.defer = defer_0;
    addOnloadHandler(scriptTag, new ResourceLoader$SimpleLoadListener(this$static), event_0);
    $appendChild($doc.head, scriptTag);
  }
}

function $loadStylesheet(this$static, stylesheetUrl, resourceLoadListener){
  var event_0, linkElement, url_0;
  url_0 = getAbsoluteUrl(stylesheetUrl);
  event_0 = new ResourceLoader$ResourceLoadEvent(url_0);
  if (this$static.loadedResources.has(url_0)) {
    !!resourceLoadListener && resourceLoadListener.onLoad(event_0);
    return;
  }
  if (addListener(url_0, resourceLoadListener, this$static.loadListeners)) {
    linkElement = $doc.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = url_0;
    if ($isSafariOrIOS((!instance_0 && (instance_0 = new BrowserInfo) , instance_0).browserDetails)) {
      scheduleFixedPeriodImpl(($clinit_SchedulerImpl() , new ResourceLoader$1(this$static, url_0, event_0)), 10);
    }
     else {
      addOnloadHandler(linkElement, new ResourceLoader$StyleSheetLoadListener(this$static, url_0), event_0);
      (!instance_0 && (instance_0 = new BrowserInfo) , instance_0).browserDetails.isOpera && $schedule(new ResourceLoader$2(this$static, url_0, event_0), 5000);
    }
    $appendChild($doc.head, linkElement);
  }
}

function $runWhenHtmlImportsReady(this$static, task){
  this$static.supportsHtmlWhenReady?addHtmlImportsReadyHandler(task):endEagerDependencyLoading();
}

function ResourceLoader(registry){
  this.loadedResources = new $wnd.Set;
  this.loadListeners = new $wnd.Map;
  this.supportsHtmlWhenReady = !!($wnd.HTMLImports && $wnd.HTMLImports.whenReady);
  this.registry = registry;
  $initLoadedResourcesFromDom(this);
}

function addHtmlImportsReadyHandler(handler){
  $wnd.HTMLImports.whenReady($entry(function(){
    handler.run();
  }
  ));
}

function addListener(resourceId, listener, listenerMap){
  var listeners;
  listeners = castToJsArray(listenerMap.get(resourceId));
  if (listeners == null) {
    listeners = [];
    listeners.push(listener);
    listenerMap.set(resourceId, listeners);
    return true;
  }
   else {
    listeners.push(listener);
    return false;
  }
}

function addOnloadHandler(element, listener, event_0){
  element.onload = $entry(function(){
    element.onload = null;
    element.onerror = null;
    element.onreadystatechange = null;
    listener.onLoad(event_0);
  }
  );
  element.onerror = $entry(function(){
    element.onload = null;
    element.onerror = null;
    element.onreadystatechange = null;
    listener.onError_0(event_0);
  }
  );
  element.onreadystatechange = function(){
    ('loaded' === element.readyState || 'complete' === element.readyState) && element.onload(arguments[0]);
  }
  ;
}

function getStyleSheetLength(url_0){
  for (var i_0 = 0; i_0 < $doc.styleSheets.length; i_0++) {
    if ($doc.styleSheets[i_0].href === url_0) {
      var sheet_0 = $doc.styleSheets[i_0];
      try {
        var rules_0 = sheet_0.cssRules;
        rules_0 === undefined && (rules_0 = sheet_0.rules);
        if (rules_0 === null) {
          return 1;
        }
        return rules_0.length;
      }
       catch (err) {
        return 1;
      }
    }
  }
  return -1;
}

defineClass(52, 1, {52:1}, ResourceLoader);
_.supportsHtmlWhenReady = false;
var Lcom_vaadin_client_ResourceLoader_2_classLit = createForClass('com.vaadin.client', 'ResourceLoader', 52);
function ResourceLoader$1(this$0, val$url, val$event){
  this.this$01 = this$0;
  this.val$url2 = val$url;
  this.val$event3 = val$event;
  this.duration = new Duration;
}

defineClass(161, 1, {}, ResourceLoader$1);
_.execute = function execute_4(){
  var styleSheetLength;
  styleSheetLength = getStyleSheetLength(this.val$url2);
  if (getStyleSheetLength(this.val$url2) > 0) {
    $fireLoad(this.this$01, this.val$event3);
    return false;
  }
   else if (styleSheetLength == 0) {
    $fireError(this.this$01, this.val$event3);
    return true;
  }
   else if ($elapsedMillis(this.duration) > 60000) {
    $fireError(this.this$01, this.val$event3);
    return false;
  }
   else {
    return true;
  }
}
;
var Lcom_vaadin_client_ResourceLoader$1_2_classLit = createForClass('com.vaadin.client', 'ResourceLoader/1', 161);
function ResourceLoader$2(this$0, val$url, val$event){
  this.this$01 = this$0;
  this.val$url2 = val$url;
  this.val$event3 = val$event;
  Timer.call(this);
}

defineClass(162, 22, {}, ResourceLoader$2);
_.run = function run_5(){
  this.this$01.loadedResources.has(this.val$url2) || $fireError(this.this$01, this.val$event3);
}
;
var Lcom_vaadin_client_ResourceLoader$2_2_classLit = createForClass('com.vaadin.client', 'ResourceLoader/2', 162);
function ResourceLoader$3(this$0, val$styleSheetContents, val$event){
  this.this$01 = this$0;
  this.val$styleSheetContents2 = val$styleSheetContents;
  this.val$event3 = val$event;
  Timer.call(this);
}

defineClass(163, 22, {}, ResourceLoader$3);
_.run = function run_6(){
  this.this$01.loadedResources.has(this.val$styleSheetContents2)?$fireLoad(this.this$01, this.val$event3):$fireError(this.this$01, this.val$event3);
}
;
var Lcom_vaadin_client_ResourceLoader$3_2_classLit = createForClass('com.vaadin.client', 'ResourceLoader/3', 163);
function ResourceLoader$4(this$0){
  this.this$01 = this$0;
}

defineClass(164, 1, $intern_3, ResourceLoader$4);
_.onError_0 = function onError_1(event_0){
  $fireError(this.this$01, event_0);
}
;
_.onLoad = function onLoad_1(event_0){
  $fireLoad(this.this$01, event_0);
}
;
var Lcom_vaadin_client_ResourceLoader$4_2_classLit = createForClass('com.vaadin.client', 'ResourceLoader/4', 164);
function ResourceLoader$HtmlLoadListener(this$0, event_0){
  this.this$01 = this$0;
  this.event_0 = event_0;
}

defineClass(89, 1, {16:1, 41:1}, ResourceLoader$HtmlLoadListener);
_.onError_0 = function onError_2(event_0){
  if (this.errorFired) {
    debugger;
    throw toJs(new AssertionError);
  }
  this.errorFired = true;
  $fireError(this.this$01, event_0);
}
;
_.onLoad = function onLoad_2(event_0){
  if (!this.this$01.supportsHtmlWhenReady) {
    if (this.errorFired) {
      debugger;
      throw toJs(new AssertionError);
    }
    $fireLoad(this.this$01, event_0);
  }
}
;
_.run = function run_7(){
  this.errorFired || $fireLoad(this.this$01, this.event_0);
}
;
_.errorFired = false;
var Lcom_vaadin_client_ResourceLoader$HtmlLoadListener_2_classLit = createForClass('com.vaadin.client', 'ResourceLoader/HtmlLoadListener', 89);
function ResourceLoader$ResourceLoadEvent(resourceUrl){
  this.resourceUrl = resourceUrl;
}

defineClass(45, 1, {}, ResourceLoader$ResourceLoadEvent);
var Lcom_vaadin_client_ResourceLoader$ResourceLoadEvent_2_classLit = createForClass('com.vaadin.client', 'ResourceLoader/ResourceLoadEvent', 45);
function ResourceLoader$SimpleLoadListener(this$0){
  this.this$01 = this$0;
}

defineClass(90, 1, $intern_3, ResourceLoader$SimpleLoadListener);
_.onError_0 = function onError_3(event_0){
  $fireError(this.this$01, event_0);
}
;
_.onLoad = function onLoad_3(event_0){
  $fireLoad(this.this$01, event_0);
}
;
var Lcom_vaadin_client_ResourceLoader$SimpleLoadListener_2_classLit = createForClass('com.vaadin.client', 'ResourceLoader/SimpleLoadListener', 90);
function ResourceLoader$StyleSheetLoadListener(this$0, url_0){
  this.this$01 = this$0;
  this.url_0 = url_0;
}

defineClass(160, 1, $intern_3, ResourceLoader$StyleSheetLoadListener);
_.onError_0 = function onError_4(event_0){
  $fireError(this.this$01, event_0);
}
;
_.onLoad = function onLoad_4(event_0){
  var styleSheetLength;
  if ((!instance_0 && (instance_0 = new BrowserInfo) , instance_0).browserDetails.isChrome || (!instance_0 && (instance_0 = new BrowserInfo) , instance_0).browserDetails.isIE || (!instance_0 && (instance_0 = new BrowserInfo) , instance_0).browserDetails.isEdge) {
    styleSheetLength = getStyleSheetLength(this.url_0);
    if (styleSheetLength == 0) {
      $fireError(this.this$01, event_0);
      return;
    }
  }
  $fireLoad(this.this$01, event_0);
}
;
var Lcom_vaadin_client_ResourceLoader$StyleSheetLoadListener_2_classLit = createForClass('com.vaadin.client', 'ResourceLoader/StyleSheetLoadListener', 160);
function $beforeNavigation(this$static, newHref, triggersServerSideRoundtrip){
  $captureCurrentScrollPositions(this$static);
  $replaceState($wnd.history, $createStateObjectWithHistoryIndexAndToken(this$static), '', $wnd.location.href);
  newHref.indexOf('#') != -1 || (triggersServerSideRoundtrip?!this$static.resetScrollRegistration && (this$static.resetScrollRegistration = $addResponseHandlingEndedHandler(castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12), new ScrollPositionHandler$lambda$0$Type(this$static))):setScrollPosition(stampJavaTypeInfo(getClassLiteralForArray(D_classLit, 1), $intern_0, 84, 15, [0, 0])));
  ++this$static.currentHistoryIndex;
  triggersServerSideRoundtrip && $pushState($wnd.history, $createStateObjectWithHistoryIndexAndToken(this$static), '', newHref);
  this$static.xPositions.splice(this$static.currentHistoryIndex, this$static.xPositions.length - this$static.currentHistoryIndex);
  this$static.yPositions.splice(this$static.currentHistoryIndex, this$static.yPositions.length - this$static.currentHistoryIndex);
}

function $captureCurrentScrollPositions(this$static){
  var xAndYPosition;
  xAndYPosition = getScrollPosition();
  this$static.xPositions[this$static.currentHistoryIndex] = xAndYPosition[0];
  this$static.yPositions[this$static.currentHistoryIndex] = xAndYPosition[1];
}

function $createStateObjectWithHistoryIndexAndToken(this$static){
  var state;
  state = {};
  state['historyIndex'] = createProd(this$static.currentHistoryIndex);
  state['historyResetToken'] = createProd(this$static.historyResetToken);
  return state;
}

function $lambda$0_1(this$static){
  $removeHandler(this$static.resetScrollRegistration);
  this$static.resetScrollRegistration = null;
  setScrollPosition(stampJavaTypeInfo(getClassLiteralForArray(D_classLit, 1), $intern_0, 84, 15, [0, 0]));
}

function $lambda$1_0(this$static, scrollX_1, scrollY_2){
  setScrollPosition(stampJavaTypeInfo(getClassLiteralForArray(D_classLit, 1), $intern_0, 84, 15, [scrollX_1, scrollY_2]));
  $removeHandler(this$static.responseHandlingEndedHandler);
}

function $onBeforeUnload(this$static){
  var sessionStorageObject, stateObject;
  $captureCurrentScrollPositions(this$static);
  stateObject = $createStateObjectWithHistoryIndexAndToken(this$static);
  sessionStorageObject = {};
  sessionStorageObject['xPositions'] = castToJso(this$static.xPositions);
  sessionStorageObject['yPositions'] = castToJso(this$static.yPositions);
  $replaceState($wnd.history, stateObject, '', $wnd.location.href);
  $setItem($wnd.sessionStorage, 'scrollPos-' + this$static.historyResetToken, $toJson(sessionStorageObject));
}

function $onPopStateEvent_0(this$static, event_0, triggersServerSideRoundtrip){
  var state, token;
  if (this$static.ignoreScrollRestorationOnNextPopStateEvent) {
    $replaceState($wnd.history, $createStateObjectWithHistoryIndexAndToken(this$static), '', $doc.location.href);
    this$static.ignoreScrollRestorationOnNextPopStateEvent = false;
    return;
  }
  $captureCurrentScrollPositions(this$static);
  state = castToJso(event_0.state);
  if (!state || !('historyIndex' in state) || !('historyResetToken' in state)) {
    shouldLogToBrowserConsole && ($wnd.console.warn('Unable to restore scroll positions. History.state has been manipulated or user has navigated away from site in an unrecognized way.') , undefined);
    $resetScrollPositionTracking(this$static);
    return;
  }
  token = $valueProd_0(state['historyResetToken']);
  if (!equals_3(token, this$static.historyResetToken)) {
    $readAndRestoreScrollPositionsFromHistoryAndSessionStorage(this$static, triggersServerSideRoundtrip);
    return;
  }
  this$static.currentHistoryIndex = round_int($valueProd_0(state['historyIndex']));
  $restoreScrollPosition(this$static, triggersServerSideRoundtrip);
}

function $readAndRestoreScrollPositionsFromHistoryAndSessionStorage(this$static, delayAfterResponse){
  var jsonObject, jsonString, state;
  state = castToJso($wnd.history.state);
  if (!!state && 'historyIndex' in state && 'historyResetToken' in state) {
    this$static.currentHistoryIndex = round_int($valueProd_0(state['historyIndex']));
    this$static.historyResetToken = $valueProd_0(state['historyResetToken']);
    jsonString = $getItem($wnd.sessionStorage, 'scrollPos-' + this$static.historyResetToken);
    if (jsonString != null) {
      jsonObject = $parse_0(jsonString);
      this$static.xPositions = castToJsArray(jsonObject['xPositions']);
      this$static.yPositions = castToJsArray(jsonObject['yPositions']);
      $restoreScrollPosition(this$static, delayAfterResponse);
    }
     else {
      warn('History.state has scroll history index, but no scroll positions found from session storage matching token <' + this$static.historyResetToken + '>. User has navigated out of site in an unrecognized way.');
      $resetScrollPositionTracking(this$static);
    }
  }
   else {
    $resetScrollPositionTracking(this$static);
  }
}

function $resetScrollPositionTracking(this$static){
  this$static.xPositions = [];
  this$static.yPositions = [];
  this$static.currentHistoryIndex = 0;
  this$static.historyResetToken = now_1();
}

function $restoreScrollPosition(this$static, delayAfterResponse){
  var scrollX_0, scrollY_0;
  !!this$static.responseHandlingEndedHandler && $removeHandler(this$static.responseHandlingEndedHandler);
  if (this$static.xPositions.length < this$static.currentHistoryIndex || this$static.yPositions.length < this$static.currentHistoryIndex) {
    warn('No matching scroll position found (entries X:' + this$static.xPositions.length + ', Y:' + this$static.yPositions.length + ') for opened history index (' + this$static.currentHistoryIndex + '). ' + 'Unable to restore scroll positions. History.state has been manipulated or user has navigated away from site in an unrecognized way.');
    $resetScrollPositionTracking(this$static);
    return;
  }
  scrollX_0 = $intValue(castToDouble(this$static.xPositions[this$static.currentHistoryIndex]));
  scrollY_0 = $intValue(castToDouble(this$static.yPositions[this$static.currentHistoryIndex]));
  delayAfterResponse?(this$static.responseHandlingEndedHandler = $addResponseHandlingEndedHandler(castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12), new ScrollPositionHandler$lambda$1$Type(this$static, scrollX_0, scrollY_0))):setScrollPosition(stampJavaTypeInfo(getClassLiteralForArray(D_classLit, 1), $intern_0, 84, 15, [scrollX_0, scrollY_0]));
}

function ScrollPositionHandler(registry){
  this.registry = registry;
  'scrollRestoration' in history && (history.scrollRestoration = 'manual');
  $addEventListener($wnd, 'beforeunload', new ScrollPositionHandler$0methodref$onBeforeUnload$Type(this), false);
  $readAndRestoreScrollPositionsFromHistoryAndSessionStorage(this, true);
}

function getScrollPosition(){
  if ($wnd.Vaadin.Flow.getScrollPosition) {
    return $wnd.Vaadin.Flow.getScrollPosition();
  }
   else {
    return [$wnd.pageXOffset, $wnd.pageYOffset];
  }
}

function setScrollPosition(xAndYPosition){
  $wnd.Vaadin.Flow.setScrollPosition?$wnd.Vaadin.Flow.setScrollPosition(xAndYPosition):$wnd.scrollTo(xAndYPosition[0], xAndYPosition[1]);
}

defineClass(34, 1, {34:1}, ScrollPositionHandler);
_.currentHistoryIndex = 0;
_.historyResetToken = 0;
_.ignoreScrollRestorationOnNextPopStateEvent = false;
var Lcom_vaadin_client_ScrollPositionHandler_2_classLit = createForClass('com.vaadin.client', 'ScrollPositionHandler', 34);
function ScrollPositionHandler$0methodref$onBeforeUnload$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(197, 1, {}, ScrollPositionHandler$0methodref$onBeforeUnload$Type);
_.handleEvent_0 = function handleEvent_0(arg0){
  $onBeforeUnload(this.$$outer_0);
}
;
var Lcom_vaadin_client_ScrollPositionHandler$0methodref$onBeforeUnload$Type_2_classLit = createForClass('com.vaadin.client', 'ScrollPositionHandler/0methodref$onBeforeUnload$Type', 197);
function ScrollPositionHandler$lambda$0$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(198, 1, $intern_10, ScrollPositionHandler$lambda$0$Type);
_.onResponseHandlingEnded = function onResponseHandlingEnded_0(arg0){
  $lambda$0_1(this.$$outer_0);
}
;
var Lcom_vaadin_client_ScrollPositionHandler$lambda$0$Type_2_classLit = createForClass('com.vaadin.client', 'ScrollPositionHandler/lambda$0$Type', 198);
function ScrollPositionHandler$lambda$1$Type($$outer_0, scrollX_1, scrollY_2){
  this.$$outer_0 = $$outer_0;
  this.scrollX_1 = scrollX_1;
  this.scrollY_2 = scrollY_2;
}

defineClass(199, 1, $intern_10, ScrollPositionHandler$lambda$1$Type);
_.onResponseHandlingEnded = function onResponseHandlingEnded_1(arg0){
  $lambda$1_0(this.$$outer_0, this.scrollX_1, this.scrollY_2);
}
;
_.scrollX_1 = 0;
_.scrollY_2 = 0;
var Lcom_vaadin_client_ScrollPositionHandler$lambda$1$Type_2_classLit = createForClass('com.vaadin.client', 'ScrollPositionHandler/lambda$1$Type', 199);
function $handleError(this$static, errorMessage){
  var errorContainer;
  if (castTo($get(this$static.registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).productionMode_0) {
    shouldLogToBrowserConsole && $error($wnd.console, errorMessage);
    return;
  }
  errorContainer = $handleError_0(null, errorMessage, null);
  $addEventListener(errorContainer, 'click', new SystemErrorHandler$lambda$2$Type(errorContainer), false);
}

function $handleError_0(caption, message, details){
  var captionDiv, detailsDiv, document_0, messageDiv, systemErrorContainer;
  document_0 = $doc;
  systemErrorContainer = document_0.createElement('div');
  systemErrorContainer.className = 'v-system-error';
  if (caption != null) {
    captionDiv = document_0.createElement('div');
    captionDiv.className = 'caption';
    captionDiv.innerHTML = caption;
    systemErrorContainer.appendChild(captionDiv);
    shouldLogToBrowserConsole && $error($wnd.console, caption);
  }
  if (message != null) {
    messageDiv = document_0.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = message;
    systemErrorContainer.appendChild(messageDiv);
    shouldLogToBrowserConsole && $error($wnd.console, message);
  }
  if (details != null) {
    detailsDiv = document_0.createElement('div');
    detailsDiv.className = 'details';
    detailsDiv.innerHTML = details;
    systemErrorContainer.appendChild(detailsDiv);
    shouldLogToBrowserConsole && $error($wnd.console, details);
  }
  $appendChild(document_0.body, systemErrorContainer);
  return systemErrorContainer;
}

function $handleError_1(this$static, throwable){
  instanceOf(throwable, 3)?$handleError(this$static, 'Assertion error: ' + throwable.getMessage()):$handleError(this$static, throwable.getMessage());
}

function $handleSessionExpiredError(this$static, details){
  $handleUnrecoverableError(details, castTo($get(this$static.registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).sessionExpiredError);
}

function $handleUnrecoverableError(details, message){
  $handleUnrecoverableError_0(message.caption, message.message, details, message.url);
}

function $handleUnrecoverableError_0(caption, message, details, url_0){
  var systemErrorContainer;
  if (caption == null && message == null && details == null) {
    redirect(url_0);
    return;
  }
  systemErrorContainer = $handleError_0(caption, message, details);
  $addEventListener(systemErrorContainer, 'click', new SystemErrorHandler$lambda$0$Type(url_0), false);
  $addEventListener($doc, 'keydown', new SystemErrorHandler$lambda$1$Type(url_0), false);
}

function SystemErrorHandler(registry){
  this.registry = registry;
}

function lambda$1_0(url_0, e_1){
  var keyCode;
  keyCode = e_1.keyCode;
  keyCode == 27 && redirect(url_0);
}

function lambda$2_1(errorContainer_0){
  $removeChild(errorContainer_0.parentElement, errorContainer_0);
}

defineClass(17, 1, {17:1}, SystemErrorHandler);
var Lcom_vaadin_client_SystemErrorHandler_2_classLit = createForClass('com.vaadin.client', 'SystemErrorHandler', 17);
function SystemErrorHandler$lambda$0$Type(url_0){
  this.url_0 = url_0;
}

defineClass(128, 1, {}, SystemErrorHandler$lambda$0$Type);
_.handleEvent_0 = function handleEvent_1(arg0){
  redirect(this.url_0);
}
;
var Lcom_vaadin_client_SystemErrorHandler$lambda$0$Type_2_classLit = createForClass('com.vaadin.client', 'SystemErrorHandler/lambda$0$Type', 128);
function SystemErrorHandler$lambda$1$Type(url_0){
  this.url_0 = url_0;
}

defineClass(129, 1, {}, SystemErrorHandler$lambda$1$Type);
_.handleEvent_0 = function handleEvent_2(arg0){
  lambda$1_0(this.url_0, arg0);
}
;
var Lcom_vaadin_client_SystemErrorHandler$lambda$1$Type_2_classLit = createForClass('com.vaadin.client', 'SystemErrorHandler/lambda$1$Type', 129);
function SystemErrorHandler$lambda$2$Type(errorContainer_0){
  this.errorContainer_0 = errorContainer_0;
}

defineClass(130, 1, {}, SystemErrorHandler$lambda$2$Type);
_.handleEvent_0 = function handleEvent_3(arg0){
  lambda$2_1(this.errorContainer_0);
}
;
var Lcom_vaadin_client_SystemErrorHandler$lambda$2$Type_2_classLit = createForClass('com.vaadin.client', 'SystemErrorHandler/lambda$2$Type', 130);
function $scheduleDeferred_0(this$static, cmd){
  ++this$static.deferredCommandTrackers;
  this$static.deferredCommands = push_0(this$static.deferredCommands, [cmd, false]);
  $maybeSchedulePostEventPumpCommands(this$static);
  $scheduleDeferred(this$static, new TrackingScheduler$lambda$0$Type(this$static));
}

function TrackingScheduler(){
}

defineClass(120, 117, {}, TrackingScheduler);
_.deferredCommandTrackers = 0;
var Lcom_vaadin_client_TrackingScheduler_2_classLit = createForClass('com.vaadin.client', 'TrackingScheduler', 120);
function TrackingScheduler$lambda$0$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(121, 1, {}, TrackingScheduler$lambda$0$Type);
_.execute_0 = function execute_5(){
  this.$$outer_0.deferredCommandTrackers--;
}
;
var Lcom_vaadin_client_TrackingScheduler$lambda$0$Type_2_classLit = createForClass('com.vaadin.client', 'TrackingScheduler/lambda$0$Type', 121);
function $addHandler(this$static, handler){
  return $doAdd(this$static.eventBus, (!type_2 && (type_2 = new Event$Type) , type_2), handler);
}

function $setState(this$static, state){
  if (state.ordinal != this$static.state_0.ordinal + 1) {
    throw toJs(new IllegalArgumentException('Tried to move from state ' + $name(this$static.state_0) + ' to ' + (state.name_0 != null?state.name_0:'' + state.ordinal) + ' which is not allowed'));
  }
  this$static.state_0 = state;
  $doFire(this$static.eventBus, new UILifecycle$StateChangeEvent(this$static));
}

function UILifecycle(){
  this.state_0 = ($clinit_UILifecycle$UIState() , INITIALIZING);
  this.eventBus = new SimpleEventBus;
}

defineClass(10, 1, {10:1}, UILifecycle);
var Lcom_vaadin_client_UILifecycle_2_classLit = createForClass('com.vaadin.client', 'UILifecycle', 10);
function UILifecycle$StateChangeEvent(uiLifecycle){
  this.uiLifecycle = uiLifecycle;
}

defineClass(134, 297, {}, UILifecycle$StateChangeEvent);
_.dispatch = function dispatch(listener){
  castTo(listener, 85).onUIStateChanged(this);
}
;
_.getAssociatedType = function getAssociatedType(){
  return type_2;
}
;
var type_2 = null;
var Lcom_vaadin_client_UILifecycle$StateChangeEvent_2_classLit = createForClass('com.vaadin.client', 'UILifecycle/StateChangeEvent', 134);
function $name(this$static){
  return this$static.name_0 != null?this$static.name_0:'' + this$static.ordinal;
}

function Enum(name_0, ordinal){
  this.name_0 = name_0;
  this.ordinal = ordinal;
}

function createValueOfMap(enumConstants){
  var result, value_0, value$index, value$max;
  result = {};
  for (value$index = 0 , value$max = enumConstants.length; value$index < value$max; ++value$index) {
    value_0 = enumConstants[value$index];
    result[':' + (value_0.name_0 != null?value_0.name_0:'' + value_0.ordinal)] = value_0;
  }
  return result;
}

function valueOf(map_0, name_0){
  var result;
  checkCriticalNotNull(name_0);
  result = map_0[':' + name_0];
  checkCriticalArgument(!!result, stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_0, 1, 5, [name_0]));
  return result;
}

defineClass(55, 1, $intern_11);
_.equals_0 = function equals_0(other){
  return this === other;
}
;
_.hashCode_0 = function hashCode_2(){
  return getHashCode(this);
}
;
_.toString_0 = function toString_5(){
  return this.name_0 != null?this.name_0:'' + this.ordinal;
}
;
_.ordinal = 0;
var Ljava_lang_Enum_2_classLit = createForClass('java.lang', 'Enum', 55);
function $clinit_UILifecycle$UIState(){
  $clinit_UILifecycle$UIState = emptyMethod;
  INITIALIZING = new UILifecycle$UIState('INITIALIZING', 0);
  RUNNING = new UILifecycle$UIState('RUNNING', 1);
  TERMINATED = new UILifecycle$UIState('TERMINATED', 2);
}

function UILifecycle$UIState(enum$name, enum$ordinal){
  Enum.call(this, enum$name, enum$ordinal);
}

function values_0(){
  $clinit_UILifecycle$UIState();
  return stampJavaTypeInfo(getClassLiteralForArray(Lcom_vaadin_client_UILifecycle$UIState_2_classLit, 1), $intern_0, 64, 0, [INITIALIZING, RUNNING, TERMINATED]);
}

defineClass(64, 55, $intern_11, UILifecycle$UIState);
var INITIALIZING, RUNNING, TERMINATED;
var Lcom_vaadin_client_UILifecycle$UIState_2_classLit = createForEnum('com.vaadin.client', 'UILifecycle/UIState', 64, values_0);
function $processProtocol(protocol, replacement, vaadinUri){
  $equals_0(vaadinUri.substr(0, protocol.length), protocol) && (vaadinUri = replacement + ('' + $substring(vaadinUri, protocol.length)));
  return vaadinUri;
}

function $resolveVaadinUri(uri_0, frontendUrl, servletToContextRoot){
  var processedUri;
  if (uri_0 == null) {
    return null;
  }
  processedUri = $processProtocol('frontend://', frontendUrl, uri_0);
  processedUri = $processProtocol('context://', servletToContextRoot, processedUri);
  processedUri = $processProtocol('base://', '', processedUri);
  return processedUri;
}

defineClass(296, 1, $intern_0);
var Lcom_vaadin_flow_shared_VaadinUriResolver_2_classLit = createForClass('com.vaadin.flow.shared', 'VaadinUriResolver', 296);
function $getContextRootUrl(this$static){
  var root, suffixlength;
  root = castTo($get(this$static.registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).contextRootUrl;
  suffixlength = '/'.length;
  if (!$equals_0(root.substr(root.length - suffixlength, suffixlength), '/')) {
    debugger;
    throw toJs(new AssertionError);
  }
  return root;
}

function $getFrontendRootUrl(this$static){
  var root, suffixlength;
  root = castTo($get(this$static.registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).frontendRootUrl;
  suffixlength = '/'.length;
  if (!$equals_0(root.substr(root.length - suffixlength, suffixlength), '/')) {
    debugger;
    throw toJs(new AssertionError);
  }
  return root;
}

function $resolveVaadinUri_0(this$static, uri_0){
  return $resolveVaadinUri(uri_0, $getFrontendRootUrl(this$static), $getContextRootUrl(this$static));
}

function URIResolver(registry){
  this.registry = registry;
}

function getBaseRelativeUri(baseURI, uri_0){
  if ($equals_0(uri_0.substr(0, baseURI.length), baseURI)) {
    return $substring(uri_0, baseURI.length);
  }
  return uri_0;
}

defineClass(43, 296, {43:1, 4:1}, URIResolver);
_.resolveVaadinUri = function resolveVaadinUri(uri_0){
  return $resolveVaadinUri_0(this, uri_0);
}
;
var Lcom_vaadin_client_URIResolver_2_classLit = createForClass('com.vaadin.client', 'URIResolver', 43);
function getAbsoluteUrl(url_0){
  var a;
  a = $doc.createElement('a');
  a.href = url_0;
  return a.href;
}

function redirect(url_0){
  url_0?($wnd.location = url_0):$wnd.location.reload(false);
}

function stringify(payload){
  return JSON.stringify(payload, function(key, value_0){
    if (value_0 instanceof Node) {
      throw 'Message JsonObject contained a dom node reference which should not be sent to the server and can cause a cyclic dependecy.';
    }
    return value_0;
  }
  );
}

function updateAttribute(element, attribute, value_0){
  value_0 == null?wrap_0(element).removeAttribute(attribute):wrap_0(element).setAttribute(attribute, toString_2(value_0));
}

function $clinit_Bootstrapper(){
  $clinit_Bootstrapper = emptyMethod;
  runningApplications = [];
}

function deferStartApplication(applicationId){
  var callback = function(){
    doStartApplication(applicationId);
  }
  ;
  $wnd.addEventListener('WebComponentsReady', $entry(callback));
}

function doStartApplication(applicationId){
  var appConf, applicationConnection, initialUidl, conf;
  appConf = (conf = new ApplicationConfiguration , conf.applicationId = applicationId , populateApplicationConfiguration(conf, getJsoConfiguration(applicationId)) , conf);
  applicationConnection = new ApplicationConnection(appConf);
  runningApplications.push(applicationConnection);
  initialUidl = getJsoConfiguration(applicationId).getConfig('uidl');
  $start(applicationConnection, initialUidl);
}

function getJsoConfiguration(appId){
  return $wnd.Vaadin.Flow.getApp(appId);
}

function initModule(){
  $clinit_Bootstrapper();
  var url_0;
  if (moduleLoaded || !($wnd.Vaadin.Flow.bootstrap != null)) {
    shouldLogToBrowserConsole && ($wnd.console.warn('vaadinBootstrap.js was not loaded, skipping vaadin application configuration.') , undefined);
    return;
  }
  moduleLoaded = true;
  url_0 = $wnd.location.href + '?' + 'v-r' + '=' + 'init';
  request_1(new $wnd.XMLHttpRequest, url_0);
}

function lambda$0_1(applicationId_0){
  $clinit_Bootstrapper();
  !$wnd.WebComponents || $wnd.WebComponents.ready?doStartApplication(applicationId_0):deferStartApplication(applicationId_0);
}

function populateApplicationConfiguration(conf, jsoConfiguration){
  var serviceUrl, info, info_0;
  serviceUrl = $getConfigString(jsoConfiguration, 'serviceUrl');
  $setWebComponentMode(conf, $getConfigBoolean(jsoConfiguration, 'webComponentMode'));
  if (serviceUrl == null) {
    $setServiceUrl(conf, getAbsoluteUrl('.'));
    $setContextRootUrl(conf, getAbsoluteUrl($getConfigString(jsoConfiguration, 'contextRootUrl')));
  }
   else {
    conf.serviceUrl = serviceUrl;
    $setContextRootUrl(conf, getAbsoluteUrl(serviceUrl + ('' + $getConfigString(jsoConfiguration, 'contextRootUrl'))));
  }
  $isEs6Supported((!instance_0 && (instance_0 = new BrowserInfo) , instance_0).browserDetails)?$setFrontendRootUrl(conf, $getConfigString(jsoConfiguration, 'frontendUrlEs6')):$setFrontendRootUrl(conf, $getConfigString(jsoConfiguration, 'frontendUrlEs5'));
  $setUIId(conf, $getConfigInteger(jsoConfiguration, 'v-uiId').value_0);
  $setHeartbeatInterval(conf, $getConfigInteger(jsoConfiguration, 'heartbeatInterval').value_0);
  $setServletVersion(conf, (info = jsoConfiguration.getConfig('versionInfo') , info?info.vaadinVersion:null));
  info_0 = jsoConfiguration.getConfig('versionInfo');
  $getAtmosphereJSVersion();
  $setSessionExpiredError(conf, jsoConfiguration.getConfig('sessExpMsg'));
  $setProductionMode(conf, !$getConfigBoolean(jsoConfiguration, 'debug'));
  $setRequestTiming(conf, $getConfigBoolean(jsoConfiguration, 'requestTiming'));
}

function registerCallback(widgetsetName){
  $clinit_Bootstrapper();
  var callbackHandler = $entry(startApplication);
  $wnd.Vaadin.Flow.registerWidgetset(widgetsetName, callbackHandler);
}

function runBootStrap(init){
  $clinit_Bootstrapper();
  $wnd.Vaadin.Flow.bootstrap(init);
}

function startApplication(applicationId){
  $scheduleDeferred_0(($clinit_SchedulerImpl() , INSTANCE), new Bootstrapper$lambda$0$Type(applicationId));
}

var moduleLoaded = false, runningApplications;
function $onSuccess(xhr){
  if (!$equals_0('application/json', xhr.getResponseHeader('content-type'))) {
    $error($wnd.console, 'Error calling server initialisation status:' + xhr.status + ' response:' + xhr.responseText);
    return;
  }
  runBootStrap($parse_0(xhr.responseText));
  $wnd.performance && typeof $wnd.performance.now == 'function'?(relativeTimeSupplier = new Profiler$HighResolutionTimeSupplier):(relativeTimeSupplier = new Profiler$DefaultRelativeTimeSupplier);
  ensureNoLogger();
  registerCallback(($clinit_Impl() , $moduleName));
}

function Bootstrapper$lambda$0$Type(applicationId_0){
  this.applicationId_0 = applicationId_0;
}

defineClass(97, 1, {}, Bootstrapper$lambda$0$Type);
_.execute_0 = function execute_6(){
  lambda$0_1(this.applicationId_0);
}
;
var Lcom_vaadin_client_bootstrap_Bootstrapper$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.bootstrap', 'Bootstrapper/lambda$0$Type', 97);
function $getAtmosphereJSVersion(){
  if (isAtmosphereLoaded()) {
    return $wnd.vaadinPush.atmosphere.version;
  }
   else {
    return null;
  }
}

function $getConfigBoolean(this$static, name_0){
  var value_0 = this$static.getConfig(name_0);
  if (value_0 === null || value_0 === undefined) {
    return false;
  }
   else {
    return $clinit_Boolean() , value_0?true:false;
  }
}

function $getConfigInteger(this$static, name_0){
  var value_0 = this$static.getConfig(name_0);
  if (value_0 === null || value_0 === undefined) {
    return null;
  }
   else {
    return valueOf_0(value_0);
  }
}

function $getConfigString(this$static, name_0){
  var value_0 = this$static.getConfig(name_0);
  if (value_0 === null || value_0 === undefined) {
    return null;
  }
   else {
    return value_0 + '';
  }
}

function $connect(this$static){
  var pushId, pushUrl;
  pushUrl = $resolveVaadinUri_0(castTo($get(this$static.registry, Lcom_vaadin_client_URIResolver_2_classLit), 43), this$static.url_0);
  pushUrl = addGetParameters(pushUrl, 'v-r=push');
  pushUrl = addGetParameters(pushUrl, 'v-uiId=' + ('' + castTo($get(this$static.registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).uiId));
  pushId = castTo($get(this$static.registry, Lcom_vaadin_client_communication_MessageHandler_2_classLit), 21).pushId;
  pushId != null && (pushUrl = addGetParameters(pushUrl, 'v-pushId=' + pushId));
  shouldLogToBrowserConsole && ($wnd.console.log('Establishing push connection') , undefined);
  this$static.socket = $doConnect(this$static, pushUrl, this$static.config);
}

function $disconnect(this$static, command){
  if (!command) {
    debugger;
    throw toJs(new AssertionError);
  }
  switch (this$static.state_0.ordinal) {
    case 0:
      this$static.state_0 = ($clinit_AtmospherePushConnection$State() , DISCONNECT_PENDING);
      this$static.pendingDisconnectCommand = command;
      break;
    case 1:
      shouldLogToBrowserConsole && ($wnd.console.log('Closing push connection') , undefined);
      doDisconnect(this$static.uri_0);
      this$static.state_0 = ($clinit_AtmospherePushConnection$State() , DISCONNECTED);
      command.execute_0();
      break;
    case 2:
    case 3:
      throw toJs(new IllegalStateException('Can not disconnect more than once'));
  }
}

function $doConnect(this$static, uri_0, config){
  var self_0 = this$static;
  config.url = uri_0;
  config.onOpen = $entry(function(response){
    self_0.onOpen_0(response);
  }
  );
  config.onReopen = $entry(function(response){
    self_0.onReopen_0(response);
  }
  );
  config.onMessage = $entry(function(response){
    self_0.onMessage_0(response);
  }
  );
  config.onError = $entry(function(response){
    self_0.onError_1(response);
  }
  );
  config.onTransportFailure = $entry(function(reason, request){
    self_0.onTransportFailure_0(reason);
  }
  );
  config.onClose = $entry(function(response){
    self_0.onClose_0(response);
  }
  );
  config.onReconnect = $entry(function(request, response){
    self_0.onReconnect_0(request, response);
  }
  );
  config.onClientTimeout = $entry(function(request){
    self_0.onClientTimeout_0(request);
  }
  );
  return $wnd.vaadinPush.atmosphere.subscribe(config);
}

function $doPush(socket, message){
  socket.push(message);
}

function $isActive(this$static){
  switch (this$static.state_0.ordinal) {
    case 0:
    case 1:
      return true;
    default:return false;
  }
}

function $isBidirectional(this$static){
  if (this$static.transport_0 == null) {
    return false;
  }
  if (!$equals_0(this$static.transport_0, 'websocket')) {
    return false;
  }
  if ($hasPropertyValue($getMap(castTo($get(castTo($get(this$static.registry, Lcom_vaadin_client_communication_PushConfiguration_2_classLit), 37).registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).rootNode, 5), 'alwaysXhrToServer')) {
    return false;
  }
  this$static.state_0 == ($clinit_AtmospherePushConnection$State() , CONNECT_PENDING);
  return true;
}

function $lambda$0_2(this$static, event_0){
  if (event_0.uiLifecycle.state_0 == ($clinit_UILifecycle$UIState() , TERMINATED)) {
    if (this$static.state_0 == ($clinit_AtmospherePushConnection$State() , DISCONNECT_PENDING) || this$static.state_0 == DISCONNECTED) {
      return;
    }
    $disconnect(this$static, new AtmospherePushConnection$lambda$3$Type);
  }
}

function $lambda$1_1(this$static, value_0, key_1){
  $equalsIgnoreCase(value_0, 'true') || $equalsIgnoreCase(value_0, 'false')?(this$static.config[key_1] = $equalsIgnoreCase(value_0, 'true') , undefined):(this$static.config[key_1] = value_0 , undefined);
}

function $lambda$2(this$static){
  $scheduleDeferred_0(($clinit_SchedulerImpl() , INSTANCE), new AtmospherePushConnection$0methodref$connect$Type(this$static));
}

function $onConnect(this$static, response){
  this$static.transport_0 = response['transport'];
  switch (this$static.state_0.ordinal) {
    case 0:
      this$static.state_0 = ($clinit_AtmospherePushConnection$State() , CONNECTED);
      $pushOk(castTo($get(this$static.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14));
      break;
    case 2:
      this$static.state_0 = ($clinit_AtmospherePushConnection$State() , CONNECTED);
      if (!this$static.pendingDisconnectCommand) {
        debugger;
        throw toJs(new AssertionError);
      }

      $disconnect(this$static, this$static.pendingDisconnectCommand);
      break;
    case 1:
      break;
    default:throw toJs(new IllegalStateException('Got onOpen event when connection state is ' + this$static.state_0 + '. This should never happen.'));
  }
}

function $push(this$static, message){
  var fragmented, messageJson;
  if (!$isBidirectional(this$static)) {
    throw toJs(new IllegalStateException('This server to client push connection should not be used to send client to server messages'));
  }
  if (this$static.state_0 == ($clinit_AtmospherePushConnection$State() , CONNECTED)) {
    messageJson = stringify(message);
    log_0('Sending push (' + this$static.transport_0 + ') message to server: ' + messageJson);
    if ($equals_0(this$static.transport_0, 'websocket')) {
      fragmented = new AtmospherePushConnection$FragmentedMessage(messageJson);
      while (fragmented.index_0 < fragmented.message_0.length) {
        $doPush(this$static.socket, $getNextFragment(fragmented));
      }
    }
     else {
      $doPush(this$static.socket, messageJson);
    }
    return;
  }
  if (this$static.state_0 == CONNECT_PENDING) {
    $pushNotConnected(castTo($get(this$static.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14), message);
    return;
  }
  throw toJs(new IllegalStateException('Can not push after disconnecting'));
}

function $runWhenAtmosphereLoaded(this$static, command){
  var loadListener, loader, pushJs, pushJs0, pushScriptUrl;
  if (isAtmosphereLoaded()) {
    $lambda$2(command.$$outer_0);
  }
   else {
    pushJs0 = (castTo($get(this$static.registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).productionMode_0?(pushJs = 'VAADIN/static/push/vaadinPush-min.js'):(pushJs = 'VAADIN/static/push/vaadinPush.js') , pushJs);
    shouldLogToBrowserConsole && $log($wnd.console, 'Loading ' + pushJs0);
    loader = castTo($get(this$static.registry, Lcom_vaadin_client_ResourceLoader_2_classLit), 52);
    pushScriptUrl = castTo($get(this$static.registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).contextRootUrl + pushJs0;
    loadListener = new AtmospherePushConnection$1(this$static, pushJs0, command);
    $loadScript(loader, pushScriptUrl, loadListener, false, 'text/javascript');
  }
}

function AtmospherePushConnection(registry){
  this.state_0 = ($clinit_AtmospherePushConnection$State() , CONNECT_PENDING);
  this.registry = registry;
  $addHandler(castTo($get(registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10), new AtmospherePushConnection$lambda$0$Type(this));
  this.config = {transport:'websocket', maxStreamingLength:1000000, fallbackTransport:'long-polling', contentType:'application/json; charset=UTF-8', reconnectInterval:5000, timeout:-1, maxReconnectOnClose:10000000, trackMessageLength:true, enableProtocol:true, handleOnlineOffline:false, messageDelimiter:String.fromCharCode(124)};
  this.config['logLevel'] = 'debug';
  $getParameters(castTo($get(this.registry, Lcom_vaadin_client_communication_PushConfiguration_2_classLit), 37)).forEach(makeLambdaFunction(AtmospherePushConnection$lambda$1$Type.prototype.accept, AtmospherePushConnection$lambda$1$Type, [this]));
  $getPushUrl(castTo($get(this.registry, Lcom_vaadin_client_communication_PushConfiguration_2_classLit), 37)) == null?(this.url_0 = castTo($get(registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).serviceUrl):(this.url_0 = $getPushUrl(castTo($get(this.registry, Lcom_vaadin_client_communication_PushConfiguration_2_classLit), 37)));
  $runWhenAtmosphereLoaded(this, new AtmospherePushConnection$lambda$2$Type(this));
}

function doDisconnect(url_0){
  $wnd.vaadinPush.atmosphere.unsubscribeUrl(url_0);
}

function isAtmosphereLoaded(){
  return $wnd.vaadinPush && $wnd.vaadinPush.atmosphere;
}

defineClass(91, 1, {}, AtmospherePushConnection);
_.onClientTimeout_0 = function onClientTimeout(response){
  this.state_0 = ($clinit_AtmospherePushConnection$State() , DISCONNECTED);
  $handleUnrecoverableError_0((castTo($get(castTo(castTo($get(this.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14), 65).registry, Lcom_vaadin_client_SystemErrorHandler_2_classLit), 17) , ''), 'Client unexpectedly disconnected. Ensure client timeout is disabled.', '', null);
}
;
_.onClose_0 = function onClose(response){
  this.state_0 = ($clinit_AtmospherePushConnection$State() , CONNECT_PENDING);
  castTo($get(this.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14);
  shouldLogToBrowserConsole && ($wnd.console.log('Push connection closed') , undefined);
}
;
_.onError_1 = function onError_5(response){
  this.state_0 = ($clinit_AtmospherePushConnection$State() , DISCONNECTED);
  $handleCommunicationError(castTo(castTo($get(this.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14), 65), 'Push connection using ' + response['transport'] + ' failed!');
}
;
_.onMessage_0 = function onMessage(response){
  var json, message;
  message = response['responseBody'];
  json = parseJson(stripJSONWrapping(message));
  if (!json) {
    $pushInvalidContent(castTo($get(this.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14), this, message);
    return;
  }
   else {
    log_0('Received push (' + this.transport_0 + ') message: ' + message);
    $handleMessage(castTo($get(this.registry, Lcom_vaadin_client_communication_MessageHandler_2_classLit), 21), json);
  }
}
;
_.onOpen_0 = function onOpen(response){
  log_0('Push connection established using ' + response['transport']);
  $onConnect(this, response);
}
;
_.onReconnect_0 = function onReconnect(request, response){
  this.state_0 == ($clinit_AtmospherePushConnection$State() , CONNECTED) && (this.state_0 = CONNECT_PENDING);
  $pushReconnectPending(castTo($get(this.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14), this);
}
;
_.onReopen_0 = function onReopen(response){
  log_0('Push connection re-established using ' + response['transport']);
  $onConnect(this, response);
}
;
_.onTransportFailure_0 = function onTransportFailure(){
  warn('Push connection using primary method (' + this.config['transport'] + ') failed. Trying with ' + this.config['fallbackTransport']);
}
;
var Lcom_vaadin_client_communication_AtmospherePushConnection_2_classLit = createForClass('com.vaadin.client.communication', 'AtmospherePushConnection', 91);
function AtmospherePushConnection$0methodref$connect$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(215, 1, {}, AtmospherePushConnection$0methodref$connect$Type);
_.execute_0 = function execute_7(){
  $connect(this.$$outer_0);
}
;
var Lcom_vaadin_client_communication_AtmospherePushConnection$0methodref$connect$Type_2_classLit = createForClass('com.vaadin.client.communication', 'AtmospherePushConnection/0methodref$connect$Type', 215);
function AtmospherePushConnection$1(this$0, val$pushJs, val$command){
  this.this$01 = this$0;
  this.val$pushJs2 = val$pushJs;
  this.val$command3 = val$command;
}

defineClass(217, 1, $intern_3, AtmospherePushConnection$1);
_.onError_0 = function onError_6(event_0){
  $pushScriptLoadError(castTo($get(this.this$01.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14), event_0.resourceUrl);
}
;
_.onLoad = function onLoad_5(event_0){
  if (isAtmosphereLoaded()) {
    log_0(this.val$pushJs2 + ' loaded');
    $lambda$2(this.val$command3.$$outer_0);
  }
   else {
    $pushScriptLoadError(castTo($get(this.this$01.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14), event_0.resourceUrl);
  }
}
;
var Lcom_vaadin_client_communication_AtmospherePushConnection$1_2_classLit = createForClass('com.vaadin.client.communication', 'AtmospherePushConnection/1', 217);
function $getFragment(this$static, begin, end){
  return $substring_0(this$static.message_0, begin, $wnd.Math.min(this$static.message_0.length, end));
}

function $getNextFragment(this$static){
  var fragmentLen, header, result;
  if (this$static.index_0 >= this$static.message_0.length) {
    debugger;
    throw toJs(new AssertionError);
  }
  if (this$static.index_0 == 0) {
    header = '' + this$static.message_0.length + '|';
    fragmentLen = 4095 - header.length;
    result = header + $substring_0(this$static.message_0, 0, $wnd.Math.min(this$static.message_0.length, fragmentLen));
    this$static.index_0 += fragmentLen;
  }
   else {
    result = $getFragment(this$static, this$static.index_0, this$static.index_0 + 4095);
    this$static.index_0 += 4095;
  }
  return result;
}

function AtmospherePushConnection$FragmentedMessage(message){
  this.message_0 = message;
}

defineClass(212, 1, {}, AtmospherePushConnection$FragmentedMessage);
_.index_0 = 0;
var Lcom_vaadin_client_communication_AtmospherePushConnection$FragmentedMessage_2_classLit = createForClass('com.vaadin.client.communication', 'AtmospherePushConnection/FragmentedMessage', 212);
function $clinit_AtmospherePushConnection$State(){
  $clinit_AtmospherePushConnection$State = emptyMethod;
  CONNECT_PENDING = new AtmospherePushConnection$State('CONNECT_PENDING', 0);
  CONNECTED = new AtmospherePushConnection$State('CONNECTED', 1);
  DISCONNECT_PENDING = new AtmospherePushConnection$State('DISCONNECT_PENDING', 2);
  DISCONNECTED = new AtmospherePushConnection$State('DISCONNECTED', 3);
}

function AtmospherePushConnection$State(enum$name, enum$ordinal){
  Enum.call(this, enum$name, enum$ordinal);
}

function values_1(){
  $clinit_AtmospherePushConnection$State();
  return stampJavaTypeInfo(getClassLiteralForArray(Lcom_vaadin_client_communication_AtmospherePushConnection$State_2_classLit, 1), $intern_0, 57, 0, [CONNECT_PENDING, CONNECTED, DISCONNECT_PENDING, DISCONNECTED]);
}

defineClass(57, 55, $intern_11, AtmospherePushConnection$State);
var CONNECTED, CONNECT_PENDING, DISCONNECTED, DISCONNECT_PENDING;
var Lcom_vaadin_client_communication_AtmospherePushConnection$State_2_classLit = createForEnum('com.vaadin.client.communication', 'AtmospherePushConnection/State', 57, values_1);
function AtmospherePushConnection$lambda$0$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(214, 1, $intern_12, AtmospherePushConnection$lambda$0$Type);
_.onUIStateChanged = function onUIStateChanged(arg0){
  $lambda$0_2(this.$$outer_0, arg0);
}
;
var Lcom_vaadin_client_communication_AtmospherePushConnection$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'AtmospherePushConnection/lambda$0$Type', 214);
function AtmospherePushConnection$lambda$1$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(318, $wnd.Function, {}, AtmospherePushConnection$lambda$1$Type);
_.accept = function accept_15(arg0, arg1){
  $lambda$1_1(this.$$outer_0, arg0, arg1);
}
;
function AtmospherePushConnection$lambda$2$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(216, 1, $intern_5, AtmospherePushConnection$lambda$2$Type);
_.execute_0 = function execute_8(){
  $lambda$2(this.$$outer_0);
}
;
var Lcom_vaadin_client_communication_AtmospherePushConnection$lambda$2$Type_2_classLit = createForClass('com.vaadin.client.communication', 'AtmospherePushConnection/lambda$2$Type', 216);
function AtmospherePushConnection$lambda$3$Type(){
}

defineClass(213, 1, $intern_5, AtmospherePushConnection$lambda$3$Type);
_.execute_0 = function execute_9(){
}
;
var Lcom_vaadin_client_communication_AtmospherePushConnection$lambda$3$Type_2_classLit = createForClass('com.vaadin.client.communication', 'AtmospherePushConnection/lambda$3$Type', 213);
var Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit = createForInterface('com.vaadin.client.communication', 'ConnectionStateHandler');
function $configurationUpdated(this$static){
  var configurationMap;
  $setModal(this$static.reconnectDialog, $getValueOrDefault_1((configurationMap = $getMap(castTo($get(castTo($get(this$static.registry, Lcom_vaadin_client_communication_ReconnectDialogConfiguration_2_classLit), 33).registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).rootNode, 9) , $getProperty(configurationMap, 'dialogModal')), false));
}

function $doReconnect(this$static, payload){
  if (castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10).state_0 != ($clinit_UILifecycle$UIState() , RUNNING)) {
    shouldLogToBrowserConsole && ($wnd.console.warn('Trying to reconnect after application has been stopped. Giving up') , undefined);
    return;
  }
  if (payload) {
    shouldLogToBrowserConsole && ($wnd.console.log('Re-sending last message to the server...') , undefined);
    $send_1(castTo($get(this$static.registry, Lcom_vaadin_client_communication_MessageSender_2_classLit), 23), payload);
  }
   else {
    shouldLogToBrowserConsole && ($wnd.console.log('Trying to re-establish server connection...') , undefined);
    $send(castTo($get(this$static.registry, Lcom_vaadin_client_communication_Heartbeat_2_classLit), 76));
  }
}

function $getDialogText(this$static, reconnectAttempt){
  var configurationMap;
  return $replace_0($getValueOrDefault_0((configurationMap = $getMap(castTo($get(castTo($get(this$static.registry, Lcom_vaadin_client_communication_ReconnectDialogConfiguration_2_classLit), 33).registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).rootNode, 9) , $getProperty(configurationMap, 'dialogText')), 'Server connection lost, trying to reconnect...'), reconnectAttempt + '');
}

function $getDialogTextGaveUp(this$static, reconnectAttempt){
  var configurationMap;
  return $replace_0($getValueOrDefault_0((configurationMap = $getMap(castTo($get(castTo($get(this$static.registry, Lcom_vaadin_client_communication_ReconnectDialogConfiguration_2_classLit), 33).registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).rootNode, 9) , $getProperty(configurationMap, 'dialogTextGaveUp')), 'Server connection lost.'), reconnectAttempt + '');
}

function $giveUp(this$static){
  this$static.reconnectionCause = null;
  $endRequest(castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12));
  !!this$static.dialogShowTimer.timerId && $cancel(this$static.dialogShowTimer);
  !!this$static.reconnectDialog.root_0.parentElement || $showDialog(this$static);
  $setText(this$static.reconnectDialog, $getDialogTextGaveUp(this$static, this$static.reconnectAttempt));
  $setReconnecting(this$static.reconnectDialog, false);
  $setState(castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10), ($clinit_UILifecycle$UIState() , TERMINATED));
}

function $handleCommunicationError(this$static, details){
  $handleUnrecoverableError_0((castTo($get(this$static.registry, Lcom_vaadin_client_SystemErrorHandler_2_classLit), 17) , ''), details, '', null);
}

function $handleRecoverableError(this$static, type_0, payload){
  var configurationMap, configurationMap0;
  if (castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10).state_0 != ($clinit_UILifecycle$UIState() , RUNNING)) {
    return;
  }
  if (this$static.reconnectionCause) {
    if ($isHigherPriorityThan(type_0, this$static.reconnectionCause)) {
      shouldLogToBrowserConsole && $warn($wnd.console, 'Now reconnecting because of ' + type_0 + ' failure');
      this$static.reconnectionCause = type_0;
    }
  }
   else {
    this$static.reconnectionCause = type_0;
    shouldLogToBrowserConsole && $warn($wnd.console, 'Reconnecting because of ' + type_0 + ' failure');
    !!this$static.dialogShowTimer.timerId && $cancel(this$static.dialogShowTimer);
    !!this$static.reconnectDialog.root_0.parentElement && ($setReconnecting(this$static.reconnectDialog, false) , $hide_0(this$static.reconnectDialog));
    $schedule(this$static.dialogShowTimer, $getValueOrDefault((configurationMap0 = $getMap(castTo($get(castTo($get(this$static.registry, Lcom_vaadin_client_communication_ReconnectDialogConfiguration_2_classLit), 33).registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).rootNode, 9) , $getProperty(configurationMap0, 'dialogGracePeriod')), 400));
  }
  if (this$static.reconnectionCause != type_0) {
    return;
  }
  ++this$static.reconnectAttempt;
  log_0('Reconnect attempt ' + this$static.reconnectAttempt + ' for ' + type_0);
  if (this$static.reconnectAttempt >= $getValueOrDefault((configurationMap = $getMap(castTo($get(castTo($get(this$static.registry, Lcom_vaadin_client_communication_ReconnectDialogConfiguration_2_classLit), 33).registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).rootNode, 9) , $getProperty(configurationMap, 'reconnectAttempts')), 10000)) {
    $giveUp(this$static);
  }
   else {
    $setText(this$static.reconnectDialog, $getDialogText(this$static, this$static.reconnectAttempt));
    $scheduleReconnect(this$static, payload);
  }
}

function $handleUnrecoverableCommunicationError(this$static, details, xhrConnectionError){
  var xhr;
  xhrConnectionError && (xhr = xhrConnectionError.xhr);
  $handleUnrecoverableError_0((castTo($get(this$static.registry, Lcom_vaadin_client_SystemErrorHandler_2_classLit), 17) , ''), details, '', null);
  $setState(castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10), ($clinit_UILifecycle$UIState() , TERMINATED));
}

function $heartbeatException(this$static, exception){
  error_0('Heartbeat exception: ' + exception.getMessage());
  $handleRecoverableError(this$static, ($clinit_DefaultConnectionStateHandler$Type() , HEARTBEAT), null);
}

function $heartbeatInvalidStatusCode(this$static, xhr){
  var statusCode;
  statusCode = xhr.status;
  shouldLogToBrowserConsole && $warn($wnd.console, 'Heartbeat request returned ' + statusCode);
  if (statusCode == 410) {
    $handleSessionExpiredError(castTo($get(this$static.registry, Lcom_vaadin_client_SystemErrorHandler_2_classLit), 17), null);
    $setState(castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10), ($clinit_UILifecycle$UIState() , TERMINATED));
  }
   else if (statusCode == 404)
  ;
  else {
    $handleRecoverableError(this$static, ($clinit_DefaultConnectionStateHandler$Type() , HEARTBEAT), null);
  }
}

function $heartbeatOk(this$static){
  !!this$static.reconnectionCause && $resolveTemporaryError(this$static, ($clinit_DefaultConnectionStateHandler$Type() , HEARTBEAT));
}

function $lambda$0_3(this$static, e_0){
  if (e_0.uiLifecycle.state_0 == ($clinit_UILifecycle$UIState() , TERMINATED)) {
    !!this$static.reconnectionCause && $giveUp(this$static);
    !!this$static.scheduledReconnect && !!this$static.scheduledReconnect.timerId && $cancel(this$static.scheduledReconnect);
  }
}

function $pushInvalidContent(this$static, pushConnection, message){
  $isBidirectional(pushConnection) && $endRequest(castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12));
  $handleUnrecoverableCommunicationError(this$static, 'Invalid JSON from server: ' + message, null);
}

function $pushNotConnected(this$static, payload){
  $handleRecoverableError(this$static, ($clinit_DefaultConnectionStateHandler$Type() , PUSH), payload);
}

function $pushOk(this$static){
  !!this$static.reconnectionCause && $resolveTemporaryError(this$static, ($clinit_DefaultConnectionStateHandler$Type() , PUSH));
}

function $pushReconnectPending(this$static, pushConnection){
  shouldLogToBrowserConsole && ($wnd.console.log('Reopening push connection') , undefined);
  $isBidirectional(pushConnection) && $handleRecoverableError(this$static, ($clinit_DefaultConnectionStateHandler$Type() , PUSH), null);
}

function $pushScriptLoadError(this$static, resourceUrl){
  $handleUnrecoverableError_0((castTo($get(this$static.registry, Lcom_vaadin_client_SystemErrorHandler_2_classLit), 17) , ''), resourceUrl + ' could not be loaded. Push will not work.', '', null);
}

function $resolveTemporaryError(this$static, type_0){
  if (this$static.reconnectionCause != type_0) {
    return;
  }
  this$static.reconnectionCause = null;
  this$static.reconnectAttempt = 0;
  !!this$static.dialogShowTimer.timerId && $cancel(this$static.dialogShowTimer);
  $setReconnecting(this$static.reconnectDialog, false);
  $hide_0(this$static.reconnectDialog);
  shouldLogToBrowserConsole && ($wnd.console.log('Re-established connection to server') , undefined);
}

function $scheduleReconnect(this$static, payload){
  var configurationMap;
  if (this$static.reconnectAttempt == 1) {
    $doReconnect(this$static, payload);
  }
   else {
    this$static.scheduledReconnect = new DefaultConnectionStateHandler$2(this$static, payload);
    $schedule(this$static.scheduledReconnect, $getValueOrDefault((configurationMap = $getMap(castTo($get(castTo($get(this$static.registry, Lcom_vaadin_client_communication_ReconnectDialogConfiguration_2_classLit), 33).registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).rootNode, 9) , $getProperty(configurationMap, 'reconnectInterval')), 5000));
  }
}

function $showDialog(this$static){
  $setReconnecting(this$static.reconnectDialog, true);
  $show_0(this$static.reconnectDialog);
  $hide(castTo($get(this$static.registry, Lcom_vaadin_client_LoadingIndicator_2_classLit), 36));
}

function $xhrException(this$static, xhrConnectionError){
  $handleRecoverableError(this$static, ($clinit_DefaultConnectionStateHandler$Type() , XHR), xhrConnectionError.payload);
}

function $xhrInvalidContent(this$static, xhrConnectionError){
  var refreshToken, responseText;
  $endRequest(castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12));
  responseText = xhrConnectionError.xhr.responseText;
  refreshToken = $exec(new RegExp('Vaadin-Refresh(:\\s*(.*?))?(\\s|$)'), responseText);
  refreshToken?redirect(refreshToken[2]):$handleUnrecoverableCommunicationError(this$static, 'Invalid JSON response from server: ' + responseText, xhrConnectionError);
}

function $xhrInvalidStatusCode(this$static, xhrConnectionError){
  var statusCode;
  statusCode = xhrConnectionError.xhr.status;
  shouldLogToBrowserConsole && $warn($wnd.console, 'Server returned ' + statusCode + ' for xhr');
  if (statusCode == 401) {
    $endRequest(castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12));
    $handleSessionExpiredError(castTo($get(this$static.registry, Lcom_vaadin_client_SystemErrorHandler_2_classLit), 17), '');
    $setState(castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10), ($clinit_UILifecycle$UIState() , TERMINATED));
    return;
  }
   else {
    $handleRecoverableError(this$static, ($clinit_DefaultConnectionStateHandler$Type() , XHR), xhrConnectionError.payload);
  }
}

function $xhrOk(this$static){
  !!this$static.reconnectionCause && $resolveTemporaryError(this$static, ($clinit_DefaultConnectionStateHandler$Type() , XHR));
}

function DefaultConnectionStateHandler(registry){
  this.reconnectDialog = new DefaultReconnectDialog;
  this.dialogShowTimer = new DefaultConnectionStateHandler$1(this);
  this.registry = registry;
  $addHandler(castTo($get(registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10), new DefaultConnectionStateHandler$lambda$0$Type(this));
  $preload(this.reconnectDialog);
}

defineClass(65, 1, {14:1, 65:1}, DefaultConnectionStateHandler);
_.reconnectAttempt = 0;
_.reconnectionCause = null;
var Lcom_vaadin_client_communication_DefaultConnectionStateHandler_2_classLit = createForClass('com.vaadin.client.communication', 'DefaultConnectionStateHandler', 65);
function DefaultConnectionStateHandler$1(this$0){
  this.this$01 = this$0;
  Timer.call(this);
}

defineClass(187, 22, {}, DefaultConnectionStateHandler$1);
_.run = function run_8(){
  $showDialog(this.this$01);
}
;
var Lcom_vaadin_client_communication_DefaultConnectionStateHandler$1_2_classLit = createForClass('com.vaadin.client.communication', 'DefaultConnectionStateHandler/1', 187);
function DefaultConnectionStateHandler$2(this$0, val$payload){
  this.this$01 = this$0;
  this.val$payload2 = val$payload;
  Timer.call(this);
}

defineClass(189, 22, {}, DefaultConnectionStateHandler$2);
_.run = function run_9(){
  this.this$01.scheduledReconnect = null;
  $doReconnect(this.this$01, this.val$payload2);
}
;
var Lcom_vaadin_client_communication_DefaultConnectionStateHandler$2_2_classLit = createForClass('com.vaadin.client.communication', 'DefaultConnectionStateHandler/2', 189);
function $clinit_DefaultConnectionStateHandler$Type(){
  $clinit_DefaultConnectionStateHandler$Type = emptyMethod;
  HEARTBEAT = new DefaultConnectionStateHandler$Type('HEARTBEAT', 0, 0);
  PUSH = new DefaultConnectionStateHandler$Type('PUSH', 1, 1);
  XHR = new DefaultConnectionStateHandler$Type('XHR', 2, 2);
}

function $isHigherPriorityThan(this$static, type_0){
  return this$static.priority > type_0.priority;
}

function DefaultConnectionStateHandler$Type(enum$name, enum$ordinal, priority){
  Enum.call(this, enum$name, enum$ordinal);
  this.priority = priority;
}

function values_2(){
  $clinit_DefaultConnectionStateHandler$Type();
  return stampJavaTypeInfo(getClassLiteralForArray(Lcom_vaadin_client_communication_DefaultConnectionStateHandler$Type_2_classLit, 1), $intern_0, 66, 0, [HEARTBEAT, PUSH, XHR]);
}

defineClass(66, 55, $intern_11, DefaultConnectionStateHandler$Type);
_.priority = 0;
var HEARTBEAT, PUSH, XHR;
var Lcom_vaadin_client_communication_DefaultConnectionStateHandler$Type_2_classLit = createForEnum('com.vaadin.client.communication', 'DefaultConnectionStateHandler/Type', 66, values_2);
function DefaultConnectionStateHandler$lambda$0$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(188, 1, $intern_12, DefaultConnectionStateHandler$lambda$0$Type);
_.onUIStateChanged = function onUIStateChanged_0(arg0){
  $lambda$0_3(this.$$outer_0, arg0);
}
;
var Lcom_vaadin_client_communication_DefaultConnectionStateHandler$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'DefaultConnectionStateHandler/lambda$0$Type', 188);
function $hide_0(this$static){
  !!this$static.root_0.parentElement && $removeChild(this$static.root_0.parentElement, this$static.root_0);
}

function $lambda$1_2(this$static){
  this$static.root_0.style.visibility = 'visible';
  this$static.root_0.classList.remove('active');
  !!this$static.root_0.parentElement && $removeChild(this$static.root_0.parentElement, this$static.root_0);
}

function $preload(this$static){
  this$static.root_0.classList.remove('modal');
  !this$static.root_0.parentElement && $appendChild($doc.body, this$static.root_0);
  this$static.root_0.style.visibility = 'hidden';
  this$static.root_0.classList.add('active');
  $scheduleDeferred_0(($clinit_SchedulerImpl() , INSTANCE), new DefaultReconnectDialog$lambda$1$Type(this$static));
}

function $setModal(this$static, modal){
  modal?(this$static.root_0.classList.add('modal') , undefined):(this$static.root_0.classList.remove('modal') , undefined);
}

function $setReconnecting(this$static, reconnecting){
  var body_0;
  reconnecting?(this$static.root_0.classList.add('active') , undefined):(this$static.root_0.classList.remove('active') , undefined);
  body_0 = $doc.body;
  reconnecting?(body_0.classList.add('v-reconnecting') , undefined):(body_0.classList.remove('v-reconnecting') , undefined);
  if (reconnecting) {
    if (this$static.clickHandler) {
      this$static.clickHandler.remove_1();
      this$static.clickHandler = null;
    }
  }
   else {
    this$static.clickHandler = $addEventListener(this$static.root_0, 'click', new DefaultReconnectDialog$lambda$0$Type, false);
  }
}

function $setText(this$static, text_0){
  $setTextContent(this$static.label_0, text_0);
}

function $show_0(this$static){
  !this$static.root_0.parentElement && $appendChild($doc.body, this$static.root_0);
}

function DefaultReconnectDialog(){
  var spinner;
  this.root_0 = $doc.createElement('div');
  this.root_0.className = 'v-reconnect-dialog';
  spinner = $doc.createElement('div');
  spinner.className = 'spinner';
  this.label_0 = $doc.createElement('span');
  this.label_0.className = 'text';
  $appendChild(this.root_0, spinner);
  $appendChild(this.root_0, this.label_0);
}

defineClass(255, 1, {}, DefaultReconnectDialog);
_.clickHandler = null;
var Lcom_vaadin_client_communication_DefaultReconnectDialog_2_classLit = createForClass('com.vaadin.client.communication', 'DefaultReconnectDialog', 255);
function DefaultReconnectDialog$lambda$0$Type(){
}

defineClass(256, 1, {}, DefaultReconnectDialog$lambda$0$Type);
_.handleEvent_0 = function handleEvent_4(arg0){
  redirect(null);
}
;
var Lcom_vaadin_client_communication_DefaultReconnectDialog$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'DefaultReconnectDialog/lambda$0$Type', 256);
function DefaultReconnectDialog$lambda$1$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(257, 1, {}, DefaultReconnectDialog$lambda$1$Type);
_.execute_0 = function execute_10(){
  $lambda$1_2(this.$$outer_0);
}
;
var Lcom_vaadin_client_communication_DefaultReconnectDialog$lambda$1$Type_2_classLit = createForClass('com.vaadin.client.communication', 'DefaultReconnectDialog/lambda$1$Type', 257);
function $lambda$0_4(this$static, e_0){
  e_0.uiLifecycle.state_0 == ($clinit_UILifecycle$UIState() , TERMINATED) && $setInterval(this$static, -1);
}

function $schedule_0(this$static){
  if (this$static.interval > 0) {
    debug('Scheduling heartbeat in ' + this$static.interval + ' seconds');
    $schedule(this$static.timer, this$static.interval * 1000);
  }
   else {
    shouldLogToBrowserConsole && ($wnd.console.debug('Disabling heartbeat') , undefined);
    $cancel(this$static.timer);
  }
}

function $send(this$static){
  $cancel(this$static.timer);
  shouldLogToBrowserConsole && ($wnd.console.debug('Sending heartbeat request...') , undefined);
  post(this$static.uri_0, null, 'text/plain; charset=utf-8', new Heartbeat$2(this$static));
}

function $setInterval(this$static, heartbeatInterval){
  shouldLogToBrowserConsole && $log($wnd.console, 'Setting heartbeat interval to ' + heartbeatInterval + 'sec.');
  this$static.interval = heartbeatInterval;
  $schedule_0(this$static);
}

function Heartbeat(registry){
  this.timer = new Heartbeat$1(this);
  this.registry = registry;
  $setInterval(this, castTo($get(registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).heartbeatInterval);
  this.uri_0 = castTo($get(registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).serviceUrl;
  this.uri_0 = addGetParameters(this.uri_0, 'v-r=heartbeat');
  this.uri_0 = addGetParameters(this.uri_0, 'v-uiId=' + ('' + castTo($get(registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).uiId));
  $addHandler(castTo($get(registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10), new Heartbeat$lambda$0$Type(this));
}

defineClass(76, 1, {76:1}, Heartbeat);
_.interval = -1;
var Lcom_vaadin_client_communication_Heartbeat_2_classLit = createForClass('com.vaadin.client.communication', 'Heartbeat', 76);
function Heartbeat$1(this$0){
  this.this$01 = this$0;
  Timer.call(this);
}

defineClass(183, 22, {}, Heartbeat$1);
_.run = function run_10(){
  $send(this.this$01);
}
;
var Lcom_vaadin_client_communication_Heartbeat$1_2_classLit = createForClass('com.vaadin.client.communication', 'Heartbeat/1', 183);
function Heartbeat$2(this$0){
  this.this$01 = this$0;
}

defineClass(185, 1, {}, Heartbeat$2);
_.onFail = function onFail(xhr, e){
  !e?$heartbeatInvalidStatusCode(castTo($get(this.this$01.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14), xhr):$heartbeatException(castTo($get(this.this$01.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14), e);
  $schedule_0(this.this$01);
}
;
_.onSuccess = function onSuccess(xhr){
  $heartbeatOk(castTo($get(this.this$01.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14));
  $schedule_0(this.this$01);
}
;
var Lcom_vaadin_client_communication_Heartbeat$2_2_classLit = createForClass('com.vaadin.client.communication', 'Heartbeat/2', 185);
function Heartbeat$lambda$0$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(184, 1, $intern_12, Heartbeat$lambda$0$Type);
_.onUIStateChanged = function onUIStateChanged_1(arg0){
  $lambda$0_4(this.$$outer_0, arg0);
}
;
var Lcom_vaadin_client_communication_Heartbeat$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'Heartbeat/lambda$0$Type', 184);
function bindInteger(map_0, key, setter, defaultValue){
  var property;
  property = $getProperty(map_0, key);
  $addChangeListener(property, new LoadingIndicatorConfigurator$lambda$1$Type(setter, defaultValue));
}

function lambda$1_1(setter_0, defaultValue_1, e_2){
  setter_0.accept_0(valueOf_0($getValueOrDefault(castTo(e_2.source, 25), defaultValue_1)));
}

function observe(node, loadingIndicator){
  var configMap, defaultThemeProperty;
  configMap = $getMap(node, 10);
  bindInteger(configMap, 'first', new LoadingIndicatorConfigurator$0methodref$setFirstDelay$Type(loadingIndicator), 300);
  bindInteger(configMap, 'second', new LoadingIndicatorConfigurator$1methodref$setSecondDelay$Type(loadingIndicator), 1500);
  bindInteger(configMap, 'third', new LoadingIndicatorConfigurator$2methodref$setThirdDelay$Type(loadingIndicator), 5000);
  defaultThemeProperty = $getProperty(configMap, 'theme');
  $addChangeListener(defaultThemeProperty, new LoadingIndicatorConfigurator$lambda$0$Type(loadingIndicator));
}

function LoadingIndicatorConfigurator$0methodref$setFirstDelay$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(136, 1, {}, LoadingIndicatorConfigurator$0methodref$setFirstDelay$Type);
_.accept_0 = function accept_16(arg0){
  $setFirstDelay(this.$$outer_0, arg0.value_0);
}
;
var Lcom_vaadin_client_communication_LoadingIndicatorConfigurator$0methodref$setFirstDelay$Type_2_classLit = createForClass('com.vaadin.client.communication', 'LoadingIndicatorConfigurator/0methodref$setFirstDelay$Type', 136);
function LoadingIndicatorConfigurator$1methodref$setSecondDelay$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(137, 1, {}, LoadingIndicatorConfigurator$1methodref$setSecondDelay$Type);
_.accept_0 = function accept_17(arg0){
  $setSecondDelay(this.$$outer_0, arg0.value_0);
}
;
var Lcom_vaadin_client_communication_LoadingIndicatorConfigurator$1methodref$setSecondDelay$Type_2_classLit = createForClass('com.vaadin.client.communication', 'LoadingIndicatorConfigurator/1methodref$setSecondDelay$Type', 137);
function LoadingIndicatorConfigurator$2methodref$setThirdDelay$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(138, 1, {}, LoadingIndicatorConfigurator$2methodref$setThirdDelay$Type);
_.accept_0 = function accept_18(arg0){
  $setThirdDelay(this.$$outer_0, arg0.value_0);
}
;
var Lcom_vaadin_client_communication_LoadingIndicatorConfigurator$2methodref$setThirdDelay$Type_2_classLit = createForClass('com.vaadin.client.communication', 'LoadingIndicatorConfigurator/2methodref$setThirdDelay$Type', 138);
function LoadingIndicatorConfigurator$lambda$0$Type(loadingIndicator_0){
  this.loadingIndicator_0 = loadingIndicator_0;
}

defineClass(139, 1, $intern_9, LoadingIndicatorConfigurator$lambda$0$Type);
_.onPropertyChange = function onPropertyChange_1(arg0){
  $setApplyDefaultTheme(this.loadingIndicator_0, $getValueOrDefault_1(castTo(arg0.source, 25), true));
}
;
var Lcom_vaadin_client_communication_LoadingIndicatorConfigurator$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'LoadingIndicatorConfigurator/lambda$0$Type', 139);
function LoadingIndicatorConfigurator$lambda$1$Type(setter_0, defaultValue_1){
  this.setter_0 = setter_0;
  this.defaultValue_1 = defaultValue_1;
}

defineClass(140, 1, $intern_9, LoadingIndicatorConfigurator$lambda$1$Type);
_.onPropertyChange = function onPropertyChange_2(arg0){
  lambda$1_1(this.setter_0, this.defaultValue_1, arg0);
}
;
_.defaultValue_1 = 0;
var Lcom_vaadin_client_communication_LoadingIndicatorConfigurator$lambda$1$Type_2_classLit = createForClass('com.vaadin.client.communication', 'LoadingIndicatorConfigurator/lambda$1$Type', 140);
function $afterServerUpdates(node){
  node.unregistered || $callAfterServerUpdates(node.domNode);
}

function $callAfterServerUpdates(node){
  node && node.afterServerUpdate && node.afterServerUpdate();
}

function $forceMessageHandling(this$static){
  if (this$static.responseHandlingLocks.size == 0) {
    warn('Gave up waiting for message ' + (this$static.lastSeenServerSyncId + 1) + ' from the server');
  }
   else {
    shouldLogToBrowserConsole && ($wnd.console.warn('WARNING: reponse handling was never resumed, forcibly removing locks...') , undefined);
    this$static.responseHandlingLocks.clear();
  }
  if (!$handlePendingMessages(this$static) && this$static.pendingUIDLMessages.length != 0) {
    $clear(this$static.pendingUIDLMessages);
    $resynchronize(castTo($get(this$static.registry, Lcom_vaadin_client_communication_MessageSender_2_classLit), 23));
  }
}

function $getServerId(json){
  return 'syncId' in json?json['syncId']:-1;
}

function $handleDependencies(this$static, inputJson){
  var dependencies, loadMode, loadMode$array, loadMode$index, loadMode$max;
  shouldLogToBrowserConsole && ($wnd.console.log('Handling dependencies') , undefined);
  dependencies = new $wnd.Map;
  for (loadMode$array = ($clinit_LoadMode() , stampJavaTypeInfo(getClassLiteralForArray(Lcom_vaadin_flow_shared_ui_LoadMode_2_classLit, 1), $intern_0, 58, 0, [INLINE, EAGER, LAZY])) , loadMode$index = 0 , loadMode$max = loadMode$array.length; loadMode$index < loadMode$max; ++loadMode$index) {
    loadMode = loadMode$array[loadMode$index];
    $hasKey(inputJson, loadMode.name_0 != null?loadMode.name_0:'' + loadMode.ordinal) && dependencies.set(loadMode, inputJson[loadMode.name_0 != null?loadMode.name_0:'' + loadMode.ordinal]);
  }
  dependencies.size == 0 || $loadDependencies(castTo($get(this$static.registry, Lcom_vaadin_client_DependencyLoader_2_classLit), 62), dependencies);
}

function $handleJSON(this$static, valueMap){
  var lock, locked, serverId, serverNextExpected, start_0, url_0;
  serverId = 'syncId' in valueMap?valueMap['syncId']:-1;
  if ('resynchronize' in valueMap && !$isNextExpectedMessage(this$static, serverId)) {
    log_0('Received resync message with id ' + serverId + ' while waiting for ' + (this$static.lastSeenServerSyncId + 1));
    this$static.lastSeenServerSyncId = serverId - 1;
    $removeOldPendingMessages(this$static);
  }
  locked = this$static.responseHandlingLocks.size != 0;
  if (locked || !$isNextExpectedMessage(this$static, serverId)) {
    if (locked) {
      shouldLogToBrowserConsole && ($wnd.console.log('Postponing UIDL handling due to lock...') , undefined);
    }
     else {
      if (serverId <= this$static.lastSeenServerSyncId) {
        warn('Received message with server id ' + serverId + ' but have already seen ' + this$static.lastSeenServerSyncId + '. Ignoring it');
        $isResponse(valueMap) && $endRequest(castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12));
        return;
      }
      log_0('Received message with server id ' + serverId + ' but expected ' + (this$static.lastSeenServerSyncId + 1) + '. Postponing handling until the missing message(s) have been received');
    }
    this$static.pendingUIDLMessages.push(new MessageHandler$PendingUIDLMessage(valueMap));
    !!this$static.forceHandleMessage.timerId || $schedule(this$static.forceHandleMessage, 5000);
    return;
  }
  start_0 = now_1();
  lock = new Object_0;
  this$static.responseHandlingLocks.add(lock);
  shouldLogToBrowserConsole && ($wnd.console.log('Handling message from server') , undefined);
  $fireEvent(castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12), new ResponseHandlingStartedEvent);
  if ('clientId' in valueMap) {
    serverNextExpected = valueMap['clientId'];
    $setClientToServerMessageId(castTo($get(this$static.registry, Lcom_vaadin_client_communication_MessageSender_2_classLit), 23), serverNextExpected, 'resynchronize' in valueMap);
  }
  serverId != -1 && (this$static.lastSeenServerSyncId = serverId);
  if ('redirect' in valueMap) {
    url_0 = valueMap['redirect']['url'];
    shouldLogToBrowserConsole && $log($wnd.console, 'redirecting to ' + url_0);
    redirect(url_0);
    return;
  }
  'Vaadin-Security-Key' in valueMap && (this$static.csrfToken = valueMap['Vaadin-Security-Key']);
  'Vaadin-Push-ID' in valueMap && (this$static.pushId = valueMap['Vaadin-Push-ID']);
  $handleDependencies(this$static, valueMap);
  this$static.initialMessageHandled || $requireHtmlImportsReady(castTo($get(this$static.registry, Lcom_vaadin_client_DependencyLoader_2_classLit), 62));
  'timings' in valueMap && (this$static.serverTimingInfo = valueMap['timings']);
  runWhenEagerDependenciesLoaded(new MessageHandler$0methodref$updateApiImplementation$Type);
  runWhenEagerDependenciesLoaded(new MessageHandler$lambda$0$Type(this$static, valueMap, lock, start_0));
}

function $handleMessage(this$static, json){
  var state;
  if (!json) {
    throw toJs(new IllegalArgumentException('The json to handle cannot be null'));
  }
  ('syncId' in json?json['syncId']:-1) == -1 && shouldLogToBrowserConsole && ($wnd.console.error("Response didn't contain a server id. Please verify that the server is up-to-date and that the response data has not been modified in transmission.") , undefined);
  state = castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10).state_0;
  if (state == ($clinit_UILifecycle$UIState() , INITIALIZING)) {
    state = RUNNING;
    $setState(castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10), state);
  }
  state == RUNNING?$handleJSON(this$static, json):shouldLogToBrowserConsole && ($wnd.console.warn('Ignored received message because application has already been stopped') , undefined);
}

function $handlePendingMessages(this$static){
  var i_0, message, messageToHandle, toHandle;
  if (this$static.pendingUIDLMessages.length == 0) {
    return false;
  }
  toHandle = -1;
  for (i_0 = 0; i_0 < this$static.pendingUIDLMessages.length; i_0++) {
    message = castTo(this$static.pendingUIDLMessages[i_0], 56);
    if ($isNextExpectedMessage(this$static, $getServerId(message.json))) {
      toHandle = i_0;
      break;
    }
  }
  if (toHandle != -1) {
    messageToHandle = castTo(this$static.pendingUIDLMessages.splice(toHandle, 1)[0], 56);
    $handleJSON(this$static, messageToHandle.json);
    return true;
  }
   else {
    return false;
  }
}

function $isNextExpectedMessage(this$static, serverId){
  if (serverId == -1) {
    return true;
  }
  if (serverId == this$static.lastSeenServerSyncId + 1) {
    return true;
  }
  if (this$static.lastSeenServerSyncId == -1) {
    return true;
  }
  return false;
}

function $isResponse(json){
  var meta;
  meta = json['meta'];
  if (!meta || !('async' in meta)) {
    return true;
  }
  return false;
}

function $lambda$3(updatedNodes_1){
  $scheduleDeferred_0(($clinit_SchedulerImpl() , INSTANCE), new MessageHandler$lambda$5$Type(updatedNodes_1));
}

function $lambda$4(this$static, json_1){
  $execute(castTo($get(this$static.registry, Lcom_vaadin_client_flow_ExecuteJavaScriptProcessor_2_classLit), 77), json_1['execute']);
}

function $processChanges(this$static, json){
  var debugJson, e, tree, updatedNodes;
  tree = castTo($get(this$static.registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9);
  updatedNodes = processChanges(tree, json['changes']);
  if (!castTo($get(this$static.registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).productionMode_0) {
    try {
      debugJson = $getDebugJson(tree.rootNode);
      shouldLogToBrowserConsole && ($wnd.console.log('StateTree after applying changes:') , undefined);
      shouldLogToBrowserConsole && $log($wnd.console, debugJson);
    }
     catch ($e0) {
      $e0 = toJava($e0);
      if (instanceOf($e0, 7)) {
        e = $e0;
        shouldLogToBrowserConsole && ($wnd.console.error('Failed to log state tree') , undefined);
        shouldLogToBrowserConsole && $error($wnd.console, e);
      }
       else 
        throw toJs($e0);
    }
  }
  addPostFlushListener(new MessageHandler$lambda$3$Type(updatedNodes));
}

function $processMessage(this$static, valueMap, lock, start_0){
  var constantPool, constants, error, fetchStart, json, meta, processUidlStart, time;
  if (!(('syncId' in valueMap?valueMap['syncId']:-1) == -1 || ('syncId' in valueMap?valueMap['syncId']:-1) == this$static.lastSeenServerSyncId)) {
    debugger;
    throw toJs(new AssertionError);
  }
  try {
    processUidlStart = now_1();
    json = valueMap;
    if ('constants' in json) {
      constantPool = castTo($get(this$static.registry, Lcom_vaadin_client_flow_ConstantPool_2_classLit), 53);
      constants = json['constants'];
      $importFromJson(constantPool, constants);
    }
    'changes' in json && $processChanges(this$static, json);
    'execute' in json && addPostFlushListener(new MessageHandler$lambda$1$Type(this$static, json));
    log_0('handleUIDLMessage: ' + (now_1() - processUidlStart) + ' ms');
    meta = valueMap['meta'];
    if (meta) {
      if ('sessionExpired' in meta) {
        if (this$static.nextResponseSessionExpiredHandler) {
          redirect(null);
        }
         else {
          $handleSessionExpiredError(castTo($get(this$static.registry, Lcom_vaadin_client_SystemErrorHandler_2_classLit), 17), null);
          $setState(castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10), ($clinit_UILifecycle$UIState() , TERMINATED));
        }
      }
       else if ('appError' in meta) {
        error = meta['appError'];
        $handleUnrecoverableError_0((castTo($get(this$static.registry, Lcom_vaadin_client_SystemErrorHandler_2_classLit), 17) , error['caption']), error['message'], error['details'], error['url']);
        $setState(castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10), ($clinit_UILifecycle$UIState() , TERMINATED));
      }
    }
    this$static.nextResponseSessionExpiredHandler = null;
    flush_17();
    this$static.lastProcessingTime = round_int(now_1() - start_0);
    this$static.totalProcessingTime += this$static.lastProcessingTime;
    if (!this$static.initialMessageHandled) {
      this$static.initialMessageHandled = true;
      fetchStart = getFetchStartTime();
      if (fetchStart != 0) {
        time = round_int(now_1() - fetchStart);
        shouldLogToBrowserConsole && $log($wnd.console, 'First response processed ' + time + ' ms after fetchStart');
      }
      this$static.bootstrapTime = calculateBootstrapTime();
    }
  }
   finally {
    log_0(' Processing time was ' + ('' + this$static.lastProcessingTime) + 'ms');
    $isResponse(valueMap) && $endRequest(castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12));
    $resumeResponseHandling(this$static, lock);
  }
}

function $removeOldPendingMessages(this$static){
  var i_0, m, serverId;
  for (i_0 = 0; i_0 < this$static.pendingUIDLMessages.length; i_0++) {
    m = castTo(this$static.pendingUIDLMessages[i_0], 56);
    serverId = $getServerId(m.json);
    if (serverId != -1 && serverId < this$static.lastSeenServerSyncId + 1) {
      shouldLogToBrowserConsole && $log($wnd.console, 'Removing old message with id ' + serverId);
      this$static.pendingUIDLMessages.splice(i_0, 1)[0];
      --i_0;
    }
  }
}

function $resumeResponseHandling(this$static, lock){
  this$static.responseHandlingLocks.delete(lock);
  if (this$static.responseHandlingLocks.size == 0) {
    $cancel(this$static.forceHandleMessage);
    if (this$static.pendingUIDLMessages.length != 0) {
      shouldLogToBrowserConsole && ($wnd.console.log('No more response handling locks, handling pending requests.') , undefined);
      $handlePendingMessages(this$static);
    }
  }
}

function $setNextResponseSessionExpiredHandler(this$static, nextResponseSessionExpiredHandler){
  this$static.nextResponseSessionExpiredHandler = nextResponseSessionExpiredHandler;
}

function MessageHandler(registry){
  this.responseHandlingLocks = new $wnd.Set;
  this.pendingUIDLMessages = [];
  this.forceHandleMessage = new MessageHandler$1(this);
  this.registry = registry;
}

function calculateBootstrapTime(){
  if ($wnd.performance && $wnd.performance.timing) {
    return (new Date).getTime() - $wnd.performance.timing.responseStart;
  }
   else {
    return -1;
  }
}

function getFetchStartTime(){
  if ($wnd.performance && $wnd.performance.timing && $wnd.performance.timing.fetchStart) {
    return $wnd.performance.timing.fetchStart;
  }
   else {
    return 0;
  }
}

function parseJson(jsonText){
  var json, start_0;
  if (jsonText == null) {
    return null;
  }
  start_0 = relativeTimeSupplier.getRelativeTime();
  try {
    json = JSON.parse(jsonText);
    log_0('JSON parsing took ' + ('' + round_0(relativeTimeSupplier.getRelativeTime() - start_0, 3)) + 'ms');
    return json;
  }
   catch ($e0) {
    $e0 = toJava($e0);
    if (instanceOf($e0, 7)) {
      shouldLogToBrowserConsole && $error($wnd.console, 'Unable to parse JSON: ' + jsonText);
      return null;
    }
     else 
      throw toJs($e0);
  }
}

function stripJSONWrapping(jsonWithWrapping){
  var suffixlength;
  if (jsonWithWrapping == null) {
    return null;
  }
  if (!$equals_0(jsonWithWrapping.substr(0, 9), 'for(;;);[') || (suffixlength = ']'.length , !$equals_0(jsonWithWrapping.substr(jsonWithWrapping.length - suffixlength, suffixlength), ']'))) {
    return null;
  }
  return $substring_0(jsonWithWrapping, 9, jsonWithWrapping.length - 1);
}

defineClass(21, 1, {21:1}, MessageHandler);
_.bootstrapTime = 0;
_.csrfToken = 'init';
_.initialMessageHandled = false;
_.lastProcessingTime = 0;
_.lastSeenServerSyncId = -1;
_.pushId = null;
_.totalProcessingTime = 0;
var Lcom_vaadin_client_communication_MessageHandler_2_classLit = createForClass('com.vaadin.client.communication', 'MessageHandler', 21);
function MessageHandler$0methodref$updateApiImplementation$Type(){
}

defineClass(154, 1, $intern_5, MessageHandler$0methodref$updateApiImplementation$Type);
_.execute_0 = function execute_11(){
  !polymerMicroLoaded && $wnd.Polymer != null && $equals_0($wnd.Polymer.version.substr(0, '1.'.length), '1.') && (polymerMicroLoaded = true , shouldLogToBrowserConsole && ($wnd.console.log('Polymer micro is now loaded, using Polymer DOM API') , undefined) , impl = new PolymerDomApiImpl , undefined);
}
;
var Lcom_vaadin_client_communication_MessageHandler$0methodref$updateApiImplementation$Type_2_classLit = createForClass('com.vaadin.client.communication', 'MessageHandler/0methodref$updateApiImplementation$Type', 154);
function MessageHandler$1(this$0){
  this.this$01 = this$0;
  Timer.call(this);
}

defineClass(153, 22, {}, MessageHandler$1);
_.run = function run_11(){
  $forceMessageHandling(this.this$01);
}
;
var Lcom_vaadin_client_communication_MessageHandler$1_2_classLit = createForClass('com.vaadin.client.communication', 'MessageHandler/1', 153);
function MessageHandler$1methodref$afterServerUpdates$Type(){
}

defineClass(306, $wnd.Function, {}, MessageHandler$1methodref$afterServerUpdates$Type);
_.accept_0 = function accept_19(arg0){
  $afterServerUpdates(castTo(arg0, 6));
}
;
function MessageHandler$PendingUIDLMessage(json){
  this.json = json;
}

defineClass(56, 1, {56:1}, MessageHandler$PendingUIDLMessage);
var Lcom_vaadin_client_communication_MessageHandler$PendingUIDLMessage_2_classLit = createForClass('com.vaadin.client.communication', 'MessageHandler/PendingUIDLMessage', 56);
function MessageHandler$lambda$0$Type($$outer_0, valueMap_1, lock_2, start_3){
  this.$$outer_0 = $$outer_0;
  this.valueMap_1 = valueMap_1;
  this.lock_2 = lock_2;
  this.start_3 = start_3;
}

defineClass(155, 1, $intern_5, MessageHandler$lambda$0$Type);
_.execute_0 = function execute_12(){
  $processMessage(this.$$outer_0, this.valueMap_1, this.lock_2, this.start_3);
}
;
_.start_3 = 0;
var Lcom_vaadin_client_communication_MessageHandler$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'MessageHandler/lambda$0$Type', 155);
function MessageHandler$lambda$1$Type($$outer_0, json_1){
  this.$$outer_0 = $$outer_0;
  this.json_1 = json_1;
}

defineClass(157, 1, $intern_6, MessageHandler$lambda$1$Type);
_.flush = function flush_3(){
  addPostFlushListener(new MessageHandler$lambda$4$Type(this.$$outer_0, this.json_1));
}
;
var Lcom_vaadin_client_communication_MessageHandler$lambda$1$Type_2_classLit = createForClass('com.vaadin.client.communication', 'MessageHandler/lambda$1$Type', 157);
function MessageHandler$lambda$3$Type(updatedNodes_1){
  this.updatedNodes_1 = updatedNodes_1;
}

defineClass(159, 1, $intern_6, MessageHandler$lambda$3$Type);
_.flush = function flush_4(){
  $lambda$3(this.updatedNodes_1);
}
;
var Lcom_vaadin_client_communication_MessageHandler$lambda$3$Type_2_classLit = createForClass('com.vaadin.client.communication', 'MessageHandler/lambda$3$Type', 159);
function MessageHandler$lambda$4$Type($$outer_0, json_1){
  this.$$outer_0 = $$outer_0;
  this.json_1 = json_1;
}

defineClass(156, 1, $intern_6, MessageHandler$lambda$4$Type);
_.flush = function flush_5(){
  $lambda$4(this.$$outer_0, this.json_1);
}
;
var Lcom_vaadin_client_communication_MessageHandler$lambda$4$Type_2_classLit = createForClass('com.vaadin.client.communication', 'MessageHandler/lambda$4$Type', 156);
function MessageHandler$lambda$5$Type(updatedNodes_1){
  this.updatedNodes_1 = updatedNodes_1;
}

defineClass(158, 1, {}, MessageHandler$lambda$5$Type);
_.execute_0 = function execute_13(){
  this.updatedNodes_1.forEach(makeLambdaFunction(MessageHandler$1methodref$afterServerUpdates$Type.prototype.accept_0, MessageHandler$1methodref$afterServerUpdates$Type, []));
}
;
var Lcom_vaadin_client_communication_MessageHandler$lambda$5$Type_2_classLit = createForClass('com.vaadin.client.communication', 'MessageHandler/lambda$5$Type', 158);
function $doSendInvocationsToServer(this$static){
  var extraJson, reqJson, serverRpcQueue;
  serverRpcQueue = castTo($get(this$static.registry, Lcom_vaadin_client_communication_ServerRpcQueue_2_classLit), 32);
  if (serverRpcQueue.pendingInvocations.length == 0) {
    return;
  }
  reqJson = serverRpcQueue.pendingInvocations;
  serverRpcQueue.pendingInvocations = [];
  serverRpcQueue.flushPending = false;
  serverRpcQueue.doFlushStrategy = NO_OP;
  if (reqJson.length == 0) {
    shouldLogToBrowserConsole && ($wnd.console.warn('All RPCs filtered out, not sending anything to the server') , undefined);
    return;
  }
  extraJson = {};
  $trigger(castTo($get(this$static.registry, Lcom_vaadin_client_LoadingIndicator_2_classLit), 36));
  $send_0(this$static, reqJson, extraJson);
}

function $lambda$0_5(this$static){
  this$static.push_0 = null;
  isPushEnabled($getValue($getProperty($getMap(castTo($get(castTo($get(this$static.registry, Lcom_vaadin_client_communication_PushConfiguration_2_classLit), 37).registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).rootNode, 5), 'pushMode'))) && !this$static.push_0 && (this$static.push_0 = new AtmospherePushConnection(this$static.registry));
  castTo($get(this$static.registry, Lcom_vaadin_client_communication_ServerRpcQueue_2_classLit), 32).flushPending && $flush(castTo($get(this$static.registry, Lcom_vaadin_client_communication_ServerRpcQueue_2_classLit), 32));
}

function $resynchronize(this$static){
  var resyncParam;
  shouldLogToBrowserConsole && ($wnd.console.log('Resynchronizing from server') , undefined);
  resyncParam = {};
  resyncParam['resynchronize'] = Object(true);
  $send_0(this$static, [], resyncParam);
}

function $send_0(this$static, reqInvocations, extraJson){
  var csrfToken, key, key$array, key$index, key$max, payload, str, value_0;
  $startRequest(castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12));
  payload = {};
  csrfToken = castTo($get(this$static.registry, Lcom_vaadin_client_communication_MessageHandler_2_classLit), 21).csrfToken;
  $equals_0(csrfToken, 'init') || (payload['csrfToken'] = csrfToken , undefined);
  payload['rpc'] = reqInvocations;
  payload['syncId'] = createProd(castTo($get(this$static.registry, Lcom_vaadin_client_communication_MessageHandler_2_classLit), 21).lastSeenServerSyncId);
  payload['clientId'] = createProd(this$static.clientToServerMessageId++);
  if (extraJson) {
    for (key$array = (str = $keys0(extraJson) , str) , key$index = 0 , key$max = key$array.length; key$index < key$max; ++key$index) {
      key = key$array[key$index];
      value_0 = extraJson[key];
      payload[key] = value_0;
    }
  }
  !!this$static.push_0 && $isBidirectional(this$static.push_0)?$push(this$static.push_0, payload):$send_2(castTo($get(this$static.registry, Lcom_vaadin_client_communication_XhrConnection_2_classLit), 61), payload);
}

function $send_1(this$static, payload){
  !!this$static.push_0 && $isBidirectional(this$static.push_0)?$push(this$static.push_0, payload):$send_2(castTo($get(this$static.registry, Lcom_vaadin_client_communication_XhrConnection_2_classLit), 61), payload);
}

function $sendInvocationsToServer(this$static){
  if (castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10).state_0 != ($clinit_UILifecycle$UIState() , RUNNING)) {
    shouldLogToBrowserConsole && ($wnd.console.warn('Trying to send RPC from not yet started or stopped application') , undefined);
    return;
  }
  if (castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12).hasActiveRequest || !!this$static.push_0 && !$isActive(this$static.push_0))
  ;
  else {
    $doSendInvocationsToServer(this$static);
  }
}

function $setClientToServerMessageId(this$static, nextExpectedId, force){
  if (nextExpectedId == this$static.clientToServerMessageId) {
    return;
  }
  if (force) {
    log_0('Forced update of clientId to ' + this$static.clientToServerMessageId);
    this$static.clientToServerMessageId = nextExpectedId;
    return;
  }
  if (nextExpectedId > this$static.clientToServerMessageId) {
    this$static.clientToServerMessageId == 0?shouldLogToBrowserConsole && $log($wnd.console, 'Updating client-to-server id to ' + nextExpectedId + ' based on server'):warn('Server expects next client-to-server id to be ' + nextExpectedId + ' but we were going to use ' + this$static.clientToServerMessageId + '. Will use ' + nextExpectedId + '.');
    this$static.clientToServerMessageId = nextExpectedId;
  }
}

function $setPushEnabled(this$static, enabled){
  enabled && !this$static.push_0?(this$static.push_0 = new AtmospherePushConnection(this$static.registry)):!enabled && !!this$static.push_0 && $isActive(this$static.push_0) && $disconnect(this$static.push_0, new MessageSender$lambda$0$Type(this$static));
}

function MessageSender(registry){
  this.registry = registry;
}

defineClass(23, 1, {23:1}, MessageSender);
_.clientToServerMessageId = 0;
var Lcom_vaadin_client_communication_MessageSender_2_classLit = createForClass('com.vaadin.client.communication', 'MessageSender', 23);
function MessageSender$lambda$0$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(151, 1, $intern_5, MessageSender$lambda$0$Type);
_.execute_0 = function execute_14(){
  $lambda$0_5(this.$$outer_0);
}
;
var Lcom_vaadin_client_communication_MessageSender$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'MessageSender/lambda$0$Type', 151);
function lambda$0_2(poller_0, e_1){
  var interval;
  interval = round_int($doubleValue(castToDouble(e_1.newValue)));
  $setInterval_0(poller_0, interval);
}

function observe_0(node, poller){
  var configurationMap, pollIntervalProperty;
  configurationMap = $getMap(node, 8);
  pollIntervalProperty = $getProperty(configurationMap, 'pollInterval');
  $addChangeListener(pollIntervalProperty, new PollConfigurator$lambda$0$Type(poller));
}

function PollConfigurator$lambda$0$Type(poller_0){
  this.poller_0 = poller_0;
}

defineClass(131, 1, $intern_9, PollConfigurator$lambda$0$Type);
_.onPropertyChange = function onPropertyChange_3(arg0){
  lambda$0_2(this.poller_0, arg0);
}
;
var Lcom_vaadin_client_communication_PollConfigurator$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'PollConfigurator/lambda$0$Type', 131);
function $lambda$0_6(this$static, e_0){
  e_0.uiLifecycle.state_0 == ($clinit_UILifecycle$UIState() , TERMINATED) && $stop(this$static);
}

function $setInterval_0(this$static, interval){
  $stop(this$static);
  if (interval >= 0) {
    this$static.pollTimer = new Poller$1(this$static);
    $scheduleRepeating(this$static.pollTimer, interval);
  }
}

function $stop(this$static){
  if (this$static.pollTimer) {
    $cancel(this$static.pollTimer);
    this$static.pollTimer = null;
  }
}

function Poller(registry){
  this.registry = registry;
  $addHandler(castTo($get(registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10), new Poller$lambda$0$Type(this));
}

defineClass(63, 1, {63:1}, Poller);
_.poll_0 = function poll(){
  var stateTree;
  stateTree = castTo($get(this.registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9);
  $sendEventToServer(stateTree, stateTree.rootNode, 'ui-poll', null);
}
;
_.pollTimer = null;
var Lcom_vaadin_client_communication_Poller_2_classLit = createForClass('com.vaadin.client.communication', 'Poller', 63);
function Poller$1(this$0){
  this.this$01 = this$0;
  Timer.call(this);
}

defineClass(133, 22, {}, Poller$1);
_.run = function run_12(){
  var stateTree;
  stateTree = castTo($get(this.this$01.registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9);
  $sendEventToServer(stateTree, stateTree.rootNode, 'ui-poll', null);
}
;
var Lcom_vaadin_client_communication_Poller$1_2_classLit = createForClass('com.vaadin.client.communication', 'Poller/1', 133);
function Poller$lambda$0$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(132, 1, $intern_12, Poller$lambda$0$Type);
_.onUIStateChanged = function onUIStateChanged_2(arg0){
  $lambda$0_6(this.$$outer_0, arg0);
}
;
var Lcom_vaadin_client_communication_Poller$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'Poller/lambda$0$Type', 132);
function $getParameters(this$static){
  var p, parameters, parametersMap, parametersNode;
  p = $getProperty($getMap(castTo($get(this$static.registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).rootNode, 5), 'parameters');
  parametersNode = ($registerRead(p.eventRouter) , castTo(p.value_0, 6));
  parametersMap = $getMap(parametersNode, 6);
  parameters = new $wnd.Map;
  $forEachProperty(parametersMap, makeLambdaFunction(PushConfiguration$lambda$2$Type.prototype.accept, PushConfiguration$lambda$2$Type, [parameters]));
  return parameters;
}

function $getPushUrl(this$static){
  if ($hasPropertyValue($getMap(castTo($get(this$static.registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).rootNode, 5), 'pushUrl')) {
    return castToString($getValue($getProperty($getMap(castTo($get(this$static.registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).rootNode, 5), 'pushUrl')));
  }
  return null;
}

function $onPushModeChange(this$static, event_0){
  var newModeEnabled, oldModeEnabled;
  oldModeEnabled = isPushEnabled(event_0.oldValue);
  newModeEnabled = isPushEnabled(event_0.newValue);
  !oldModeEnabled && newModeEnabled?addFlushListener(new PushConfiguration$lambda$0$Type(this$static)):oldModeEnabled && !newModeEnabled && addFlushListener(new PushConfiguration$lambda$1$Type(this$static));
}

function PushConfiguration(registry){
  this.registry = registry;
  $addChangeListener($getProperty($getMap(castTo($get(this.registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9).rootNode, 5), 'pushMode'), new PushConfiguration$0methodref$onPushModeChange$Type(this));
}

function isPushEnabled(propertyValue){
  var pushMode;
  if (propertyValue == null) {
    return false;
  }
  pushMode = castToString(propertyValue);
  return !$equals_0('DISABLED', pushMode);
}

function lambda$2_2(parameters_0, property_1, key_2){
  parameters_0.set(key_2, ($registerRead(property_1.eventRouter) , castToString(property_1.value_0)));
}

defineClass(37, 1, {37:1}, PushConfiguration);
var Lcom_vaadin_client_communication_PushConfiguration_2_classLit = createForClass('com.vaadin.client.communication', 'PushConfiguration', 37);
function PushConfiguration$0methodref$onPushModeChange$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(194, 1, $intern_9, PushConfiguration$0methodref$onPushModeChange$Type);
_.onPropertyChange = function onPropertyChange_4(arg0){
  $onPushModeChange(this.$$outer_0, arg0);
}
;
var Lcom_vaadin_client_communication_PushConfiguration$0methodref$onPushModeChange$Type_2_classLit = createForClass('com.vaadin.client.communication', 'PushConfiguration/0methodref$onPushModeChange$Type', 194);
function PushConfiguration$lambda$0$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(195, 1, $intern_6, PushConfiguration$lambda$0$Type);
_.flush = function flush_6(){
  $setPushEnabled(castTo($get(this.$$outer_0.registry, Lcom_vaadin_client_communication_MessageSender_2_classLit), 23), true);
}
;
var Lcom_vaadin_client_communication_PushConfiguration$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'PushConfiguration/lambda$0$Type', 195);
function PushConfiguration$lambda$1$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(196, 1, $intern_6, PushConfiguration$lambda$1$Type);
_.flush = function flush_7(){
  $setPushEnabled(castTo($get(this.$$outer_0.registry, Lcom_vaadin_client_communication_MessageSender_2_classLit), 23), false);
}
;
var Lcom_vaadin_client_communication_PushConfiguration$lambda$1$Type_2_classLit = createForClass('com.vaadin.client.communication', 'PushConfiguration/lambda$1$Type', 196);
function PushConfiguration$lambda$2$Type(parameters_0){
  this.parameters_0 = parameters_0;
}

defineClass(312, $wnd.Function, {}, PushConfiguration$lambda$2$Type);
_.accept = function accept_20(arg0, arg1){
  lambda$2_2(this.parameters_0, arg0, arg1);
}
;
function ReconnectDialogConfiguration(registry){
  this.registry = registry;
}

defineClass(33, 1, {33:1}, ReconnectDialogConfiguration);
var Lcom_vaadin_client_communication_ReconnectDialogConfiguration_2_classLit = createForClass('com.vaadin.client.communication', 'ReconnectDialogConfiguration', 33);
function ReconnectDialogConfiguration$lambda$0$Type(connectionStateHandler_0){
  this.connectionStateHandler_0 = connectionStateHandler_0;
}

defineClass(135, 1, $intern_5, ReconnectDialogConfiguration$lambda$0$Type);
_.execute_0 = function execute_15(){
  $configurationUpdated(this.connectionStateHandler_0);
}
;
var Lcom_vaadin_client_communication_ReconnectDialogConfiguration$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'ReconnectDialogConfiguration/lambda$0$Type', 135);
function $addResponseHandlingEndedHandler(this$static, handler){
  return $doAdd(this$static.eventBus, (!type_3 && (type_3 = new Event$Type) , type_3), handler);
}

function $endRequest(this$static){
  if (!this$static.hasActiveRequest) {
    throw toJs(new IllegalStateException('endRequest called when no request is active'));
  }
  this$static.hasActiveRequest = false;
  castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10).state_0 == ($clinit_UILifecycle$UIState() , RUNNING) && castTo($get(this$static.registry, Lcom_vaadin_client_communication_ServerRpcQueue_2_classLit), 32).flushPending && $sendInvocationsToServer(castTo($get(this$static.registry, Lcom_vaadin_client_communication_MessageSender_2_classLit), 23));
  $scheduleDeferred_0(($clinit_SchedulerImpl() , INSTANCE), new RequestResponseTracker$lambda$0$Type(this$static));
  $fireEvent(this$static, new ResponseHandlingEndedEvent);
}

function $fireEvent(this$static, event_0){
  $doFire(this$static.eventBus, event_0);
}

function $lambda$0_7(this$static){
  var requestNowOrSoon, terminated;
  terminated = castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10).state_0 == ($clinit_UILifecycle$UIState() , TERMINATED);
  requestNowOrSoon = this$static.hasActiveRequest || castTo($get(this$static.registry, Lcom_vaadin_client_communication_ServerRpcQueue_2_classLit), 32).flushPending;
  (terminated || !requestNowOrSoon) && $hide(castTo($get(this$static.registry, Lcom_vaadin_client_LoadingIndicator_2_classLit), 36));
}

function $startRequest(this$static){
  if (this$static.hasActiveRequest) {
    throw toJs(new IllegalStateException('Trying to start a new request while another is active'));
  }
  this$static.hasActiveRequest = true;
  $fireEvent(this$static, new RequestStartingEvent);
}

function RequestResponseTracker(registry){
  this.eventBus = new SimpleEventBus;
  this.registry = registry;
}

defineClass(12, 1, {12:1}, RequestResponseTracker);
_.hasActiveRequest = false;
var Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit = createForClass('com.vaadin.client.communication', 'RequestResponseTracker', 12);
function RequestResponseTracker$lambda$0$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(152, 1, {}, RequestResponseTracker$lambda$0$Type);
_.execute_0 = function execute_16(){
  $lambda$0_7(this.$$outer_0);
}
;
var Lcom_vaadin_client_communication_RequestResponseTracker$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'RequestResponseTracker/lambda$0$Type', 152);
function RequestStartingEvent(){
}

defineClass(210, 297, {}, RequestStartingEvent);
_.dispatch = function dispatch_0(handler){
  throwClassCastExceptionUnlessNull(handler);
  null.$_nullMethod();
}
;
_.getAssociatedType = function getAssociatedType_0(){
  return null;
}
;
var Lcom_vaadin_client_communication_RequestStartingEvent_2_classLit = createForClass('com.vaadin.client.communication', 'RequestStartingEvent', 210);
function ResponseHandlingEndedEvent(){
}

defineClass(148, 297, {}, ResponseHandlingEndedEvent);
_.dispatch = function dispatch_1(handler){
  castTo(handler, 70).onResponseHandlingEnded(this);
}
;
_.getAssociatedType = function getAssociatedType_1(){
  return type_3;
}
;
var type_3;
var Lcom_vaadin_client_communication_ResponseHandlingEndedEvent_2_classLit = createForClass('com.vaadin.client.communication', 'ResponseHandlingEndedEvent', 148);
function ResponseHandlingStartedEvent(){
}

defineClass(251, 297, {}, ResponseHandlingStartedEvent);
_.dispatch = function dispatch_2(handler){
  throwClassCastExceptionUnlessNull(handler);
  null.$_nullMethod();
}
;
_.getAssociatedType = function getAssociatedType_2(){
  return null;
}
;
var Lcom_vaadin_client_communication_ResponseHandlingStartedEvent_2_classLit = createForClass('com.vaadin.client.communication', 'ResponseHandlingStartedEvent', 251);
function $sendEventMessage(this$static, nodeId, eventType, eventData){
  var message;
  message = {};
  message['type'] = 'event';
  message['node'] = Object(nodeId);
  message['event'] = eventType;
  !!eventData && (message['data'] = eventData , undefined);
  $sendMessage(this$static, message);
}

function $sendEventMessage_0(this$static, node, eventType, eventData){
  $sendEventMessage(this$static, node.id_0, eventType, eventData);
}

function $sendExistingElementAttachToServer(this$static, parent_0, requestedId, assignedId, tagName, index_0){
  var message;
  message = {};
  message['type'] = 'attachExistingElement';
  message['node'] = createProd(parent_0.id_0);
  message['attachReqId'] = Object(requestedId);
  message['attachAssignedId'] = Object(assignedId);
  message['attachTagName'] = tagName;
  message['attachIndex'] = Object(index_0);
  $sendMessage(this$static, message);
}

function $sendExistingElementWithIdAttachToServer(this$static, parent_0, requestedId, assignedId, id_0){
  var message;
  message = {};
  message['type'] = 'attachExistingElementById';
  message['node'] = createProd(parent_0.id_0);
  message['attachReqId'] = Object(requestedId);
  message['attachAssignedId'] = Object(assignedId);
  message['attachId'] = id_0;
  $sendMessage(this$static, message);
}

function $sendMessage(this$static, message){
  var rpcQueue;
  rpcQueue = castTo($get(this$static.registry, Lcom_vaadin_client_communication_ServerRpcQueue_2_classLit), 32);
  $add(rpcQueue, message);
  $flush(rpcQueue);
}

function $sendNavigationMessage(this$static, location_0, stateObject, routerLinkEvent){
  var message, stateJson;
  message = {};
  message['type'] = 'navigation';
  message['location'] = location_0;
  if (stateObject != null) {
    stateJson = stateObject == null?null:stateObject;
    message['state'] = stateJson;
  }
  routerLinkEvent && (message['link'] = Object(1) , undefined);
  $sendMessage(this$static, message);
}

function $sendNodeSyncMessage(this$static, node, feature, key, value_0){
  var message;
  message = {};
  message['type'] = 'mSync';
  message['node'] = createProd(node.id_0);
  message['feature'] = Object(feature);
  message['property'] = key;
  message['value'] = value_0 == null?null:value_0;
  $sendMessage(this$static, message);
}

function $sendTemplateEventMessage(this$static, node, methodName, argsArray){
  var message;
  message = {};
  message['type'] = 'publishedEventHandler';
  message['node'] = createProd(node.id_0);
  message['templateEventMethodName'] = methodName;
  message['templateEventMethodArgs'] = argsArray;
  $sendMessage(this$static, message);
}

function ServerConnector(registry){
  this.registry = registry;
}

defineClass(24, 1, {24:1}, ServerConnector);
_.sendEventMessage_0 = function sendEventMessage(nodeId, eventType, eventData){
  $sendEventMessage(this, nodeId, eventType, eventData);
}
;
_.sendReturnChannelMessage = function sendReturnChannelMessage(stateNodeId, channelId, arguments_0){
  var message;
  message = {};
  message['type'] = 'channel';
  message['node'] = Object(stateNodeId);
  message['channel'] = Object(channelId);
  message['args'] = arguments_0;
  $sendMessage(this, message);
}
;
var Lcom_vaadin_client_communication_ServerConnector_2_classLit = createForClass('com.vaadin.client.communication', 'ServerConnector', 24);
function $clinit_ServerRpcQueue(){
  $clinit_ServerRpcQueue = emptyMethod;
  NO_OP = new ServerRpcQueue$lambda$0$Type;
}

function $add(this$static, invocation){
  if (castTo($get(this$static.registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10).state_0 != ($clinit_UILifecycle$UIState() , RUNNING)) {
    shouldLogToBrowserConsole && ($wnd.console.warn('Trying to invoke method on not yet started or stopped application') , undefined);
    return;
  }
  this$static.pendingInvocations[this$static.pendingInvocations.length] = invocation;
}

function $doFlush(this$static){
  this$static.doFlushStrategy = NO_OP;
  if (!this$static.flushPending) {
    return;
  }
  $sendInvocationsToServer(castTo($get(this$static.registry, Lcom_vaadin_client_communication_MessageSender_2_classLit), 23));
}

function $flush(this$static){
  if (NO_OP != this$static.doFlushStrategy || this$static.pendingInvocations.length == 0) {
    return;
  }
  this$static.flushPending = true;
  this$static.doFlushStrategy = new ServerRpcQueue$0methodref$doFlush$Type(this$static);
  $scheduleDeferred_0(($clinit_SchedulerImpl() , INSTANCE), new ServerRpcQueue$lambda$1$Type(this$static));
}

function ServerRpcQueue(registry){
  $clinit_ServerRpcQueue();
  this.pendingInvocations = [];
  this.doFlushStrategy = NO_OP;
  this.registry = registry;
}

defineClass(32, 1, {32:1}, ServerRpcQueue);
_.flushPending = false;
var NO_OP;
var Lcom_vaadin_client_communication_ServerRpcQueue_2_classLit = createForClass('com.vaadin.client.communication', 'ServerRpcQueue', 32);
function ServerRpcQueue$0methodref$doFlush$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(178, 1, $intern_4, ServerRpcQueue$0methodref$doFlush$Type);
_.run = function run_13(){
  $doFlush(this.$$outer_0);
}
;
var Lcom_vaadin_client_communication_ServerRpcQueue$0methodref$doFlush$Type_2_classLit = createForClass('com.vaadin.client.communication', 'ServerRpcQueue/0methodref$doFlush$Type', 178);
function ServerRpcQueue$lambda$0$Type(){
}

defineClass(177, 1, $intern_4, ServerRpcQueue$lambda$0$Type);
_.run = function run_14(){
  $clinit_ServerRpcQueue();
}
;
var Lcom_vaadin_client_communication_ServerRpcQueue$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'ServerRpcQueue/lambda$0$Type', 177);
function ServerRpcQueue$lambda$1$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(179, 1, {}, ServerRpcQueue$lambda$1$Type);
_.execute_0 = function execute_17(){
  this.$$outer_0.doFlushStrategy.run();
}
;
var Lcom_vaadin_client_communication_ServerRpcQueue$lambda$1$Type_2_classLit = createForClass('com.vaadin.client.communication', 'ServerRpcQueue/lambda$1$Type', 179);
function $send_2(this$static, payload){
  var payloadJson, responseHandler, xhr;
  responseHandler = new XhrConnection$XhrResponseHandler(this$static);
  responseHandler.payload = payload;
  $setRequestStartTime(responseHandler, relativeTimeSupplier.getRelativeTime());
  payloadJson = stringify(payload);
  xhr = post((uri_0 = castTo($get(this$static.registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).serviceUrl , uri_0 = addGetParameters(uri_0, 'v-r=uidl') , addGetParameters(uri_0, 'v-uiId=' + ('' + castTo($get(this$static.registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).uiId))), payloadJson, 'application/json; charset=UTF-8', responseHandler);
  shouldLogToBrowserConsole && $log($wnd.console, 'Sending xhr message to server: ' + payloadJson);
  this$static.webkitMaybeIgnoringRequests && (!instance_0 && (instance_0 = new BrowserInfo) , instance_0).browserDetails.isWebKit && $schedule(new XhrConnection$1(this$static, xhr), 250);
}

function XhrConnection(registry){
  this.registry = registry;
  $addEventListener($wnd, 'beforeunload', new XhrConnection$lambda$0$Type(this), false);
  $addResponseHandlingEndedHandler(castTo($get(registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12), new XhrConnection$lambda$1$Type(this));
}

function resendRequest(xhr){
  if (xhr.readyState != 1) {
    return false;
  }
  try {
    xhr.send();
    return true;
  }
   catch (e) {
    return false;
  }
}

defineClass(61, 1, {61:1}, XhrConnection);
_.webkitMaybeIgnoringRequests = false;
var Lcom_vaadin_client_communication_XhrConnection_2_classLit = createForClass('com.vaadin.client.communication', 'XhrConnection', 61);
function XhrConnection$1(this$0, val$xhr){
  this.this$01 = this$0;
  this.val$xhr2 = val$xhr;
  Timer.call(this);
}

defineClass(193, 22, {}, XhrConnection$1);
_.run = function run_15(){
  resendRequest(this.val$xhr2) && this.this$01.webkitMaybeIgnoringRequests && $schedule(this, 250);
}
;
var Lcom_vaadin_client_communication_XhrConnection$1_2_classLit = createForClass('com.vaadin.client.communication', 'XhrConnection/1', 193);
function $setRequestStartTime(this$static, requestStartTime){
  this$static.requestStartTime = requestStartTime;
}

function XhrConnection$XhrResponseHandler(this$0){
  this.this$01 = this$0;
}

defineClass(190, 1, {}, XhrConnection$XhrResponseHandler);
_.onFail = function onFail_0(xhr, e){
  var errorEvent;
  errorEvent = new XhrConnectionError(xhr, this.payload);
  if (!e) {
    $xhrInvalidStatusCode(castTo($get(this.this$01.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14), errorEvent);
    return;
  }
   else {
    $xhrException(castTo($get(this.this$01.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14), errorEvent);
  }
}
;
_.onSuccess = function onSuccess_0(xhr){
  var json, responseText;
  log_0('Server visit took ' + getRelativeTimeString(this.requestStartTime) + 'ms');
  responseText = xhr.responseText;
  json = parseJson(stripJSONWrapping(responseText));
  if (!json) {
    $xhrInvalidContent(castTo($get(this.this$01.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14), new XhrConnectionError(xhr, this.payload));
    return;
  }
  $xhrOk(castTo($get(this.this$01.registry, Lcom_vaadin_client_communication_ConnectionStateHandler_2_classLit), 14));
  shouldLogToBrowserConsole && $log($wnd.console, 'Received xhr message: ' + responseText);
  $handleMessage(castTo($get(this.this$01.registry, Lcom_vaadin_client_communication_MessageHandler_2_classLit), 21), json);
}
;
_.requestStartTime = 0;
var Lcom_vaadin_client_communication_XhrConnection$XhrResponseHandler_2_classLit = createForClass('com.vaadin.client.communication', 'XhrConnection/XhrResponseHandler', 190);
function XhrConnection$lambda$0$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(191, 1, {}, XhrConnection$lambda$0$Type);
_.handleEvent_0 = function handleEvent_5(arg0){
  this.$$outer_0.webkitMaybeIgnoringRequests = true;
}
;
var Lcom_vaadin_client_communication_XhrConnection$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.communication', 'XhrConnection/lambda$0$Type', 191);
function XhrConnection$lambda$1$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(192, 1, $intern_10, XhrConnection$lambda$1$Type);
_.onResponseHandlingEnded = function onResponseHandlingEnded_2(arg0){
  this.$$outer_0.webkitMaybeIgnoringRequests = false;
}
;
var Lcom_vaadin_client_communication_XhrConnection$lambda$1$Type_2_classLit = createForClass('com.vaadin.client.communication', 'XhrConnection/lambda$1$Type', 192);
function XhrConnectionError(xhr, payload){
  this.xhr = xhr;
  this.payload = payload;
}

defineClass(94, 1, {}, XhrConnectionError);
var Lcom_vaadin_client_communication_XhrConnectionError_2_classLit = createForClass('com.vaadin.client.communication', 'XhrConnectionError', 94);
function $get_0(this$static, key){
  if (key == null) {
    debugger;
    throw toJs(new AssertionError);
  }
  return this$static.constants.get(key);
}

function $has(this$static, key){
  if (key == null) {
    debugger;
    throw toJs(new AssertionError);
  }
  return this$static.constants.has(key);
}

function $importFromJson(this$static, json){
  var key, key$array, key$index, key$max, str, value_0;
  if (!json) {
    debugger;
    throw toJs(new AssertionError);
  }
  for (key$array = (str = $keys0(json) , str) , key$index = 0 , key$max = key$array.length; key$index < key$max; ++key$index) {
    key = key$array[key$index];
    if (this$static.constants.has(key)) {
      debugger;
      throw toJs(new AssertionError);
    }
    value_0 = json[key];
    if (!(!!value_0 && $getType(value_0) != 5)) {
      debugger;
      throw toJs(new AssertionError);
    }
    this$static.constants.set(key, value_0);
  }
}

function ConstantPool(){
  this.constants = new $wnd.Map;
}

defineClass(53, 1, {53:1}, ConstantPool);
var Lcom_vaadin_client_flow_ConstantPool_2_classLit = createForClass('com.vaadin.client.flow', 'ConstantPool', 53);
function $execute(this$static, invocations){
  var i_0, invocation;
  for (i_0 = 0; i_0 < invocations.length; i_0++) {
    invocation = invocations[i_0];
    $handleInvocation(this$static, invocation);
  }
}

function $getContextExecutionObject(this$static, nodeParameters){
  var object = {};
  object.getNode = function(element){
    var node = nodeParameters.get(element);
    if (node == null) {
      throw new ReferenceError('There is no a StateNode for the given argument.');
    }
    return node;
  }
  ;
  object.$appId = this$static.getAppId().replace(/-\d+$/, '');
  object.attachExistingElement = function(parent_0, previousSibling, tagName, id_0){
    attachExistingElement(object.getNode(parent_0), previousSibling, tagName, id_0);
  }
  ;
  object.populateModelProperties = function(element, properties){
    populateModelProperties(object.getNode(element), properties);
  }
  ;
  object.registerUpdatableModelProperties = function(element, properties){
    registerUpdatableModelProperties(object.getNode(element), properties);
  }
  ;
  return object;
}

function $handleInvocation(this$static, invocation){
  var expression, i_0, map_0, parameter, parameterCount, parameterJson, parameterNamesAndCode, parameters, stateNode, tree;
  tree = castTo($get(this$static.registry, Lcom_vaadin_client_flow_StateTree_2_classLit), 9);
  parameterCount = invocation.length - 1;
  parameterNamesAndCode = initUnidimensionalArray(Ljava_lang_String_2_classLit, $intern_0, 2, parameterCount + 1, 6, 1);
  parameters = [];
  map_0 = new $wnd.Map;
  for (i_0 = 0; i_0 < parameterCount; i_0++) {
    parameterJson = invocation[i_0];
    parameter = decodeWithTypeInfo(tree, parameterJson);
    parameters.push(parameter);
    parameterNamesAndCode[i_0] = '$' + i_0;
    stateNode = decodeStateNode(tree, parameterJson);
    if (stateNode) {
      if ($isVirtualChildAwaitingInitialization(stateNode) || !$isBound(this$static, stateNode)) {
        $addDomNodeSetListener(stateNode, new ExecuteJavaScriptProcessor$lambda$0$Type(this$static, invocation));
        return;
      }
      map_0.set(parameter, stateNode);
    }
  }
  expression = invocation[invocation.length - 1];
  parameterNamesAndCode[parameterNamesAndCode.length - 1] = expression;
  $invoke(this$static, parameterNamesAndCode, parameters, map_0);
}

function $invoke(this$static, parameterNamesAndCode, parameters, nodeParameters){
  var code_0, codeBuilder, delimiter, exception, function_0, snippet, snippet$index, snippet$max;
  if (parameterNamesAndCode.length != parameters.length + 1) {
    debugger;
    throw toJs(new AssertionError);
  }
  try {
    function_0 = new ($wnd.Function.bind.apply($wnd.Function, [null].concat(parameterNamesAndCode)));
    function_0.apply($getContextExecutionObject(this$static, nodeParameters), parameters);
  }
   catch ($e0) {
    $e0 = toJava($e0);
    if (instanceOf($e0, 7)) {
      exception = $e0;
      shouldLogToBrowserConsole && deferWithoutEntry(new Console$lambda$0$Type(exception));
      shouldLogToBrowserConsole && ($wnd.console.error('Exception is thrown during JavaScript execution. Stacktrace will be dumped separately.') , undefined);
      $handleError_1(castTo($get(this$static.registry, Lcom_vaadin_client_SystemErrorHandler_2_classLit), 17), exception);
      if (!castTo($get(this$static.registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).productionMode_0) {
        codeBuilder = new StringBuilder_1;
        delimiter = '';
        for (snippet$index = 0 , snippet$max = parameterNamesAndCode.length; snippet$index < snippet$max; ++snippet$index) {
          snippet = parameterNamesAndCode[snippet$index];
          $append_0((codeBuilder.string += delimiter , codeBuilder), snippet);
          delimiter = ', ';
        }
        codeBuilder.string += ']';
        code_0 = codeBuilder.string;
        checkCriticalStringElementIndex(0, code_0.length);
        code_0.charCodeAt(0) == 91 && (code_0 = code_0.substr(1));
        $charAt(code_0, code_0.length - 1) == 93 && (code_0 = $substring_0(code_0, 0, code_0.length - 1));
        shouldLogToBrowserConsole && $warn($wnd.console, "The error has occurred in the JS code: '" + code_0 + "'");
      }
    }
     else 
      throw toJs($e0);
  }
}

function $isBound(this$static, node){
  var isNodeBound;
  isNodeBound = !!node.domNode && !$equals(($clinit_Boolean() , FALSE), $getValue($getProperty($getMap(node, 0), 'bound')));
  if (!isNodeBound || !node.parent_0) {
    return isNodeBound;
  }
  return $isBound(this$static, node.parent_0);
}

function $isVirtualChildAwaitingInitialization(node){
  var object, type_0, value_0;
  if (!!node.domNode || !$getNode(node.tree, node.id_0)) {
    return false;
  }
  if ($hasPropertyValue($getMap(node, 0), 'payload')) {
    value_0 = $getValue($getProperty($getMap(node, 0), 'payload'));
    if (instanceOfJso(value_0)) {
      object = castToJso(value_0);
      type_0 = object['type'];
      return $equals_0('@id', type_0) || $equals_0('subTemplate', type_0);
    }
  }
  return false;
}

function ExecuteJavaScriptProcessor(registry){
  this.registry = registry;
}

defineClass(77, 1, {77:1}, ExecuteJavaScriptProcessor);
_.getAppId = function getAppId(){
  return castTo($get(this.registry, Lcom_vaadin_client_ApplicationConfiguration_2_classLit), 11).applicationId;
}
;
var Lcom_vaadin_client_flow_ExecuteJavaScriptProcessor_2_classLit = createForClass('com.vaadin.client.flow', 'ExecuteJavaScriptProcessor', 77);
function ExecuteJavaScriptProcessor$lambda$0$Type($$outer_0, invocation_1){
  this.$$outer_0 = $$outer_0;
  this.invocation_1 = invocation_1;
}

defineClass(181, 1, {}, ExecuteJavaScriptProcessor$lambda$0$Type);
_.apply_0 = function apply_2(arg0){
  return addPostFlushListener(new ExecuteJavaScriptProcessor$lambda$2$Type(this.$$outer_0, this.invocation_1)) , $clinit_Boolean() , true;
}
;
var Lcom_vaadin_client_flow_ExecuteJavaScriptProcessor$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.flow', 'ExecuteJavaScriptProcessor/lambda$0$Type', 181);
function ExecuteJavaScriptProcessor$lambda$2$Type($$outer_0, invocation_1){
  this.$$outer_0 = $$outer_0;
  this.invocation_1 = invocation_1;
}

defineClass(180, 1, $intern_6, ExecuteJavaScriptProcessor$lambda$2$Type);
_.flush = function flush_8(){
  $handleInvocation(this.$$outer_0, this.invocation_1);
}
;
var Lcom_vaadin_client_flow_ExecuteJavaScriptProcessor$lambda$2$Type_2_classLit = createForClass('com.vaadin.client.flow', 'ExecuteJavaScriptProcessor/lambda$2$Type', 180);
function $bind_0(this$static){
  this$static.handlerRegistration = $addResponseHandlingEndedHandler(castTo($get(this$static.registry, Lcom_vaadin_client_communication_RequestResponseTracker_2_classLit), 12), new FragmentHandler$0methodref$onResponseHandlingEnded$Type(this$static));
}

function $onResponseHandlingEnded(this$static){
  var currentHref;
  if (!this$static.handlerRegistration) {
    debugger;
    throw toJs(new AssertionError);
  }
  currentHref = $wnd.location.href;
  if (currentHref == this$static.newHref) {
    castTo($get(this$static.registry, Lcom_vaadin_client_ScrollPositionHandler_2_classLit), 34).ignoreScrollRestorationOnNextPopStateEvent = true;
    $replace($wnd.location, this$static.newHref);
    fireHashChangeEvent(this$static.previousHref, this$static.newHref);
    castTo($get(this$static.registry, Lcom_vaadin_client_ScrollPositionHandler_2_classLit), 34).ignoreScrollRestorationOnNextPopStateEvent = false;
  }
  $removeHandler(this$static.handlerRegistration);
}

function FragmentHandler(previousHref, newHref, registry){
  if (previousHref == null) {
    debugger;
    throw toJs(new AssertionError);
  }
  if (newHref == null) {
    debugger;
    throw toJs(new AssertionError);
  }
  this.previousHref = previousHref;
  this.newHref = newHref;
  this.registry = registry;
}

function fireHashChangeEvent(oldUrl, newUrl){
  var event_0 = new HashChangeEvent('hashchange', {'view':window, 'bubbles':true, 'cancelable':false, 'oldURL':oldUrl, 'newURL':newUrl});
  window.dispatchEvent(event_0);
}

defineClass(270, 1, {}, FragmentHandler);
var Lcom_vaadin_client_flow_FragmentHandler_2_classLit = createForClass('com.vaadin.client.flow', 'FragmentHandler', 270);
function FragmentHandler$0methodref$onResponseHandlingEnded$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(271, 1, $intern_10, FragmentHandler$0methodref$onResponseHandlingEnded$Type);
_.onResponseHandlingEnded = function onResponseHandlingEnded_3(arg0){
  $onResponseHandlingEnded(this.$$outer_0);
}
;
var Lcom_vaadin_client_flow_FragmentHandler$0methodref$onResponseHandlingEnded$Type_2_classLit = createForClass('com.vaadin.client.flow', 'FragmentHandler/0methodref$onResponseHandlingEnded$Type', 271);
function NodeUnregisterEvent(){
}

defineClass(272, 1, {}, NodeUnregisterEvent);
var Lcom_vaadin_client_flow_NodeUnregisterEvent_2_classLit = createForClass('com.vaadin.client.flow', 'NodeUnregisterEvent', 272);
function bind_0(registry, element){
  $addEventListener(element, 'click', new RouterLinkHandler$lambda$0$Type(registry), false);
}

function getAnchorElement(clickEvent){
  var eventListenerElement, target;
  if (!$equals_0('click', clickEvent.type)) {
    debugger;
    throw toJs(new AssertionError);
  }
  target = getTargetElement(clickEvent);
  eventListenerElement = clickEvent.currentTarget;
  while (!!target && target != eventListenerElement) {
    if ($equalsIgnoreCase('a', target.tagName)) {
      return target;
    }
    target = target.parentElement;
  }
  return null;
}

function getTargetElement(clickEvent){
  if (clickEvent.composed) {
    return clickEvent.composedPath()[0];
  }
  return clickEvent.target;
}

function handleClick(registry, clickEvent){
  var anchor, baseURI, currentHash, href_0;
  if (hasModifierKeys(clickEvent) || castTo($get(registry, Lcom_vaadin_client_UILifecycle_2_classLit), 10).state_0 != ($clinit_UILifecycle$UIState() , RUNNING)) {
    return;
  }
  anchor = getAnchorElement(clickEvent);
  if (!anchor) {
    return;
  }
  href_0 = anchor.href;
  baseURI = clickEvent.currentTarget.ownerDocument.baseURI;
  if (!$equals_0(href_0.substr(0, baseURI.length), baseURI)) {
    return;
  }
  if (isInsidePageNavigation(anchor.pathname, anchor.href.indexOf('#') != -1)) {
    currentHash = $doc.location.hash;
    $equals_0(currentHash, anchor.hash) || $beforeNavigation(castTo($get(registry, Lcom_vaadin_client_ScrollPositionHandler_2_classLit), 34), href_0, false);
    castTo($get(registry, Lcom_vaadin_client_ScrollPositionHandler_2_classLit), 34).ignoreScrollRestorationOnNextPopStateEvent = true;
    return;
  }
  if (!anchor.hasAttribute('router-link')) {
    return;
  }
  handleRouterLinkClick(clickEvent, baseURI, href_0, registry);
}

function handleRouterLinkClick(clickEvent, baseURI, href_0, registry){
  var location_0, location_1;
  clickEvent.preventDefault();
  location_0 = getBaseRelativeUri(baseURI, href_0);
  if (location_0.indexOf('#') != -1) {
    $bind_0(new FragmentHandler($wnd.location.href, href_0, registry));
    location_0 = $split(location_0, '#', 2)[0];
  }
  $beforeNavigation(castTo($get(registry, Lcom_vaadin_client_ScrollPositionHandler_2_classLit), 34), href_0, true);
  sendServerNavigationEvent(registry, location_0, null, true);
}

function hasModifierKeys(clickEvent){
  var event_0;
  if (!$equals_0('click', clickEvent.type)) {
    debugger;
    throw toJs(new AssertionError);
  }
  event_0 = clickEvent;
  return event_0.altKey || event_0.ctrlKey || event_0.metaKey || event_0.shiftKey;
}

function isInsidePageNavigation(path, hasFragment){
  var currentPath;
  currentPath = $wnd.location.pathname;
  if (currentPath == null) {
    debugger;
    throw toJs(new AssertionError_0('window.location.path should never be null'));
  }
  if (currentPath != path) {
    return false;
  }
  return hasFragment;
}

function sendServerNavigationEvent(registry, location_0, stateObject, routerLinkEvent){
  if (!registry) {
    debugger;
    throw toJs(new AssertionError);
  }
  if (location_0 == null) {
    debugger;
    throw toJs(new AssertionError);
  }
  $setNextResponseSessionExpiredHandler(castTo($get(registry, Lcom_vaadin_client_communication_MessageHandler_2_classLit), 21), new RouterLinkHandler$lambda$1$Type);
  $sendNavigationMessage(castTo($get(registry, Lcom_vaadin_client_communication_ServerConnector_2_classLit), 24), location_0, stateObject, routerLinkEvent);
}

function RouterLinkHandler$lambda$0$Type(registry_0){
  this.registry_0 = registry_0;
}

defineClass(149, 1, {}, RouterLinkHandler$lambda$0$Type);
_.handleEvent_0 = function handleEvent_6(arg0){
  handleClick(this.registry_0, arg0);
}
;
var Lcom_vaadin_client_flow_RouterLinkHandler$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.flow', 'RouterLinkHandler/lambda$0$Type', 149);
function RouterLinkHandler$lambda$1$Type(){
}

defineClass(150, 1, $intern_5, RouterLinkHandler$lambda$1$Type);
_.execute_0 = function execute_18(){
  redirect(null);
}
;
var Lcom_vaadin_client_flow_RouterLinkHandler$lambda$1$Type_2_classLit = createForClass('com.vaadin.client.flow', 'RouterLinkHandler/lambda$1$Type', 150);
function $addDomNodeSetListener(this$static, listener){
  this$static.domNodeSetListeners.add(listener);
  return new StateNode$lambda$4$Type(this$static, listener);
}

function $addUnregisterListener(this$static, listener){
  this$static.unregisterListeners.add(listener);
  return new StateNode$lambda$2$Type(this$static, listener);
}

function $forEachFeature(this$static, callback){
  this$static.features.forEach(callback);
}

function $getDebugJson(this$static){
  var object;
  object = $wnd.Object.create(null);
  $forEachFeature(this$static, makeLambdaFunction(StateNode$lambda$0$Type.prototype.accept, StateNode$lambda$0$Type, [this$static, object]));
  return object;
}

function $getList(this$static, id_0){
  var feature, key;
  key = id_0;
  feature = castTo(this$static.features.get(key), 38);
  if (!feature) {
    feature = new NodeList_0(id_0, this$static);
    this$static.features.set(key, feature);
  }
  if (!instanceOf(feature, 35)) {
    debugger;
    throw toJs(new AssertionError);
  }
  return castTo(feature, 35);
}

function $getMap(this$static, id_0){
  var feature, key;
  key = id_0;
  feature = castTo(this$static.features.get(key), 38);
  if (!feature) {
    feature = new NodeMap(id_0, this$static);
    this$static.features.set(key, feature);
  }
  if (!instanceOf(feature, 39)) {
    debugger;
    throw toJs(new AssertionError);
  }
  return castTo(feature, 39);
}

function $getNodeData(this$static, clazz){
  return this$static.nodeData.get(clazz);
}

function $lambda$0_8(this$static, object_1, feature_1, featureId_2){
  var json;
  json = feature_1.getDebugJson();
  !!json && (object_1[$getFeatureDebugName(this$static.tree, round_int((checkCriticalNotNull(featureId_2) , featureId_2)))] = json , undefined);
}

function $lambda$2_0(this$static, listener_1){
  return this$static.unregisterListeners.delete(listener_1);
}

function $lambda$3_0(this$static, listener_0){
  maskUndefined(listener_0.apply_0(this$static)) === maskUndefined(($clinit_Boolean() , TRUE)) && this$static.domNodeSetListeners.delete(listener_0);
}

function $lambda$4_0(this$static, listener_1){
  return this$static.domNodeSetListeners.delete(listener_1);
}

function $setDomNode(this$static, node){
  var copy;
  if (!(!this$static.domNode || !node)) {
    debugger;
    throw toJs(new AssertionError_0('StateNode already has a DOM node'));
  }
  this$static.domNode = node;
  copy = set_1(this$static.domNodeSetListeners);
  copy.forEach(makeLambdaFunction(StateNode$lambda$3$Type.prototype.accept_0, StateNode$lambda$3$Type, [this$static]));
}

function $unregister(this$static){
  var copy, event_0;
  if ($getNode(this$static.tree, this$static.id_0)) {
    debugger;
    throw toJs(new AssertionError_0('Node should no longer be findable from the tree'));
  }
  if (this$static.unregistered) {
    debugger;
    throw toJs(new AssertionError_0('Node is already unregistered'));
  }
  this$static.unregistered = true;
  event_0 = new NodeUnregisterEvent;
  copy = set_1(this$static.unregisterListeners);
  copy.forEach(makeLambdaFunction(StateNode$lambda$1$Type.prototype.accept_0, StateNode$lambda$1$Type, [event_0]));
  this$static.unregisterListeners.clear();
}

function StateNode(id_0, tree){
  this.features = new $wnd.Map;
  this.unregisterListeners = new $wnd.Set;
  this.domNodeSetListeners = new $wnd.Set;
  this.nodeData = new $wnd.Map;
  this.id_0 = id_0;
  this.tree = tree;
}

function lambda$1_2(event_0, l_1){
  l_1.onUnregister(event_0);
}

defineClass(6, 1, {6:1}, StateNode);
_.getTree = function getTree(){
  return this.tree;
}
;
_.id_0 = 0;
_.unregistered = false;
var Lcom_vaadin_client_flow_StateNode_2_classLit = createForClass('com.vaadin.client.flow', 'StateNode', 6);
function StateNode$lambda$0$Type($$outer_0, object_1){
  this.$$outer_0 = $$outer_0;
  this.object_1 = object_1;
}

defineClass(303, $wnd.Function, {}, StateNode$lambda$0$Type);
_.accept = function accept_21(arg0, arg1){
  $lambda$0_8(this.$$outer_0, this.object_1, arg0, arg1);
}
;
function StateNode$lambda$1$Type(event_0){
  this.event_0 = event_0;
}

defineClass(304, $wnd.Function, {}, StateNode$lambda$1$Type);
_.accept_0 = function accept_22(arg0){
  lambda$1_2(this.event_0, arg0);
}
;
var Lelemental_events_EventRemover_2_classLit = createForInterface('elemental.events', 'EventRemover');
function StateNode$lambda$2$Type($$outer_0, listener_1){
  this.$$outer_0 = $$outer_0;
  this.listener_1 = listener_1;
}

defineClass(124, 1, $intern_13, StateNode$lambda$2$Type);
_.remove_1 = function remove_0(){
  $lambda$2_0(this.$$outer_0, this.listener_1);
}
;
var Lcom_vaadin_client_flow_StateNode$lambda$2$Type_2_classLit = createForClass('com.vaadin.client.flow', 'StateNode/lambda$2$Type', 124);
function StateNode$lambda$3$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(305, $wnd.Function, {}, StateNode$lambda$3$Type);
_.accept_0 = function accept_23(arg0){
  $lambda$3_0(this.$$outer_0, arg0);
}
;
function StateNode$lambda$4$Type($$outer_0, listener_1){
  this.$$outer_0 = $$outer_0;
  this.listener_1 = listener_1;
}

defineClass(125, 1, $intern_13, StateNode$lambda$4$Type);
_.remove_1 = function remove_1(){
  $lambda$4_0(this.$$outer_0, this.listener_1);
}
;
var Lcom_vaadin_client_flow_StateNode$lambda$4$Type_2_classLit = createForClass('com.vaadin.client.flow', 'StateNode/lambda$4$Type', 125);
function $assertValidNode(this$static, node){
  if (!node) {
    debugger;
    throw toJs(new AssertionError_0('Node is null'));
  }
  if (node.tree != this$static) {
    debugger;
    throw toJs(new AssertionError_0('Node is not created for this tree'));
  }
  if (node != $getNode(this$static, node.id_0)) {
    debugger;
    throw toJs(new AssertionError_0('Node id is not registered with this tree'));
  }
  return true;
}

function $getFeatureDebugName(this$static, id_0){
  if (this$static.nodeFeatureDebugName == null) {
    this$static.nodeFeatureDebugName = new $wnd.Map;
    this$static.nodeFeatureDebugName.set(valueOf_0(0), 'elementData');
    this$static.nodeFeatureDebugName.set(valueOf_0(1), 'elementProperties');
    this$static.nodeFeatureDebugName.set(valueOf_0(2), 'elementChildren');
    this$static.nodeFeatureDebugName.set(valueOf_0(3), 'elementAttributes');
    this$static.nodeFeatureDebugName.set(valueOf_0(4), 'elementListeners');
    this$static.nodeFeatureDebugName.set(valueOf_0(5), 'pushConfiguration');
    this$static.nodeFeatureDebugName.set(valueOf_0(6), 'pushConfigurationParameters');
    this$static.nodeFeatureDebugName.set(valueOf_0(7), 'textNode');
    this$static.nodeFeatureDebugName.set(valueOf_0(8), 'pollConfiguration');
    this$static.nodeFeatureDebugName.set(valueOf_0(9), 'reconnectDialogConfiguration');
    this$static.nodeFeatureDebugName.set(valueOf_0(10), 'loadingIndicatorConfiguration');
    this$static.nodeFeatureDebugName.set(valueOf_0(11), 'classList');
    this$static.nodeFeatureDebugName.set(valueOf_0(12), 'elementStyleProperties');
    this$static.nodeFeatureDebugName.set(valueOf_0(13), 'synchronizedProperties');
    this$static.nodeFeatureDebugName.set(valueOf_0(14), 'synchronizedPropertyEvents');
    this$static.nodeFeatureDebugName.set(valueOf_0(15), 'componentMapping');
    this$static.nodeFeatureDebugName.set(valueOf_0(16), 'modelList');
    this$static.nodeFeatureDebugName.set(valueOf_0(17), 'polymerServerEventHandlers');
    this$static.nodeFeatureDebugName.set(valueOf_0(18), 'polymerEventListenerMap');
    this$static.nodeFeatureDebugName.set(valueOf_0(19), 'clientDelegateHandlers');
    this$static.nodeFeatureDebugName.set(valueOf_0(20), 'shadowRootData');
    this$static.nodeFeatureDebugName.set(valueOf_0(21), 'shadowRootHost');
    this$static.nodeFeatureDebugName.set(valueOf_0(22), 'attachExistingElementFeature');
    this$static.nodeFeatureDebugName.set(valueOf_0(24), 'virtualChildrenList');
    this$static.nodeFeatureDebugName.set(valueOf_0(23), 'basicTypeValue');
  }
  return this$static.nodeFeatureDebugName.has(valueOf_0(id_0))?castToString(this$static.nodeFeatureDebugName.get(valueOf_0(id_0))):'Unknown node feature: ' + id_0;
}

function $getNode(this$static, id_0){
  var key;
  key = id_0;
  return castTo(this$static.idToNode.get(key), 6);
}

function $isActive_0(this$static, node){
  var isVisible;
  isVisible = $isVisible(node);
  if (!isVisible || !node.parent_0) {
    return isVisible;
  }
  return $isActive_0(this$static, node.parent_0);
}

function $isValidNode(this$static, node){
  var isValid;
  isValid = true;
  if (!node) {
    shouldLogToBrowserConsole && ($wnd.console.warn('Node is null') , undefined);
    isValid = false;
  }
   else if (equals_Ljava_lang_Object__Z__devirtual$(node.tree, this$static)) {
    if (!equals_Ljava_lang_Object__Z__devirtual$(node, $getNode(this$static, node.id_0))) {
      shouldLogToBrowserConsole && ($wnd.console.warn('Node id is not registered with this tree') , undefined);
      isValid = false;
    }
  }
   else {
    shouldLogToBrowserConsole && ($wnd.console.warn('Node is not created for this tree') , undefined);
    isValid = false;
  }
  return isValid;
}

function $isVisible(node){
  var visibility, visibilityMap;
  if (!node.features.has(0)) {
    return true;
  }
  visibilityMap = $getMap(node, 0);
  visibility = castToBoolean($getValue($getProperty(visibilityMap, 'visible')));
  return !$equals(($clinit_Boolean() , FALSE), visibility);
}

function $registerNode(this$static, node){
  var key;
  if (node.tree != this$static) {
    debugger;
    throw toJs(new AssertionError);
  }
  if (node.unregistered) {
    debugger;
    throw toJs(new AssertionError_0("Can't re-register a node"));
  }
  key = node.id_0;
  if (this$static.idToNode.has(key)) {
    debugger;
    throw toJs(new AssertionError_0('Node ' + key + ' is already registered'));
  }
  this$static.idToNode.set(key, node);
  this$static.updateInProgress && $nodeRegistered(castTo($get(this$static.registry, Lcom_vaadin_client_InitialPropertiesHandler_2_classLit), 44), node);
}

function $sendEventToServer(this$static, node, eventType, eventData){
  $isValidNode(this$static, node) && $sendEventMessage_0(castTo($get(this$static.registry, Lcom_vaadin_client_communication_ServerConnector_2_classLit), 24), node, eventType, eventData);
}

function $sendExistingElementAttachToServer_0(this$static, parent_0, requestedId, assignedId, tagName, index_0){
  if (!$assertValidNode(this$static, parent_0)) {
    debugger;
    throw toJs(new AssertionError);
  }
  $sendExistingElementAttachToServer(castTo($get(this$static.registry, Lcom_vaadin_client_communication_ServerConnector_2_classLit), 24), parent_0, requestedId, assignedId, tagName, index_0);
}

function $sendExistingElementWithIdAttachToServer_0(this$static, parent_0, requestedId, assignedId, id_0){
  if (!$assertValidNode(this$static, parent_0)) {
    debugger;
    throw toJs(new AssertionError);
  }
  $sendExistingElementWithIdAttachToServer(castTo($get(this$static.registry, Lcom_vaadin_client_communication_ServerConnector_2_classLit), 24), parent_0, requestedId, assignedId, id_0);
}

function $sendNodePropertySyncToServer(this$static, property){
  var node, nodeMap;
  if (!property) {
    debugger;
    throw toJs(new AssertionError);
  }
  nodeMap = property.map_0;
  node = nodeMap.node;
  if ($handlePropertyUpdate(castTo($get(this$static.registry, Lcom_vaadin_client_InitialPropertiesHandler_2_classLit), 44), property) || !$isValidNode(this$static, node)) {
    return;
  }
  $sendNodeSyncMessage(castTo($get(this$static.registry, Lcom_vaadin_client_communication_ServerConnector_2_classLit), 24), node, nodeMap.id_0, property.name_0, ($registerRead(property.eventRouter) , property.value_0));
}

function $setUpdateInProgress(this$static, updateInProgress){
  if (this$static.updateInProgress == updateInProgress) {
    debugger;
    throw toJs(new AssertionError_0('Inconsistent state tree updating status, expected ' + (updateInProgress?'no ':'') + ' updates in progress.'));
  }
  this$static.updateInProgress = updateInProgress;
  $flushPropertyUpdates(castTo($get(this$static.registry, Lcom_vaadin_client_InitialPropertiesHandler_2_classLit), 44));
}

function $unregisterNode(this$static, node){
  if (!$assertValidNode(this$static, node)) {
    debugger;
    throw toJs(new AssertionError);
  }
  if (node == this$static.rootNode) {
    debugger;
    throw toJs(new AssertionError_0("Root node can't be unregistered"));
  }
  this$static.idToNode.delete(node.id_0);
  $unregister(node);
}

function StateTree(registry){
  this.idToNode = new $wnd.Map;
  this.rootNode = new StateNode(1, this);
  this.registry = registry;
  $registerNode(this, this.rootNode);
}

defineClass(9, 1, {9:1}, StateTree);
_.sendTemplateEventToServer = function sendTemplateEventToServer(node, methodName, argsArray){
  var array;
  if ($isValidNode(this, node)) {
    array = castToJso(argsArray);
    $sendTemplateEventMessage(castTo($get(this.registry, Lcom_vaadin_client_communication_ServerConnector_2_classLit), 24), node, methodName, array);
  }
}
;
_.updateInProgress = false;
var Lcom_vaadin_client_flow_StateTree_2_classLit = createForClass('com.vaadin.client.flow', 'StateTree', 9);
function findProperty(change, node){
  var key, map_0, nsId;
  nsId = round_int($valueProd_0(change['feat']));
  map_0 = $getMap(node, nsId);
  key = change['key'];
  return $getProperty(map_0, key);
}

function populateFeature(change, node){
  var featureId;
  if (!('featType' in change)) {
    debugger;
    throw toJs(new AssertionError_0("Change doesn't contain feature type. Don't know how to populate feature"));
  }
  featureId = round_int($valueProd_0(change['feat']));
  $valueProd(change['featType'])?$getList(node, featureId):$getMap(node, featureId);
}

function processChange(tree, change){
  var key, node, nodeId, property, type_0, nsId, list, removed;
  type_0 = change['type'];
  nodeId = round_int($valueProd_0(change['node']));
  node = (key = nodeId , castTo(tree.idToNode.get(key), 6));
  if (!node) {
    debugger;
    throw toJs(new AssertionError);
  }
  switch (type_0) {
    case 'empty':
      populateFeature(change, node);
      break;
    case 'splice':
      processSpliceChange(change, node);
      break;
    case 'put':
      processPutChange(change, node);
      break;
    case 'remove':
      property = findProperty(change, node);
      $removeValue(property);
      break;
    case 'detach':
      $unregisterNode(node.tree, node);
      node.parent_0 = null;
      break;
    case 'clear':
      nsId = round_int($valueProd_0(change['feat']));
      list = $getList(node, nsId);
      list.hasBeenCleared = true;
      removed = list.values.splice(0, list.values.length);
      $fireEvent_0(list.eventRouter, new ListSpliceEvent(list, 0, removed, [], true));
      break;
    default:{
        debugger;
        throw toJs(new AssertionError_0('Unsupported change type: ' + type_0));
      }

  }
  return node;
}

function processChanges(tree, changes){
  var change, i_0, i0, length_0, node, nodeId, nodes;
  if (tree.updateInProgress) {
    debugger;
    throw toJs(new AssertionError_0('Previous tree change processing has not completed'));
  }
  try {
    $setUpdateInProgress(tree, true);
    length_0 = changes.length;
    nodes = new $wnd.Set;
    for (i0 = 0; i0 < length_0; i0++) {
      change = changes[i0];
      if ($equals_0('attach', change['type'])) {
        nodeId = round_int($valueProd_0(change['node']));
        node = new StateNode(nodeId, tree);
        $registerNode(tree, node);
        nodes.add(node);
      }
    }
    for (i_0 = 0; i_0 < length_0; i_0++) {
      change = changes[i_0];
      $equals_0('attach', change['type']) || nodes.add(processChange(tree, change));
    }
    return nodes;
  }
   finally {
    $setUpdateInProgress(tree, false);
  }
}

function processPutChange(change, node){
  var child, childId, jsonValue, property;
  property = findProperty(change, node);
  if ('value' in change) {
    jsonValue = change['value'];
    $setValue(property, jsonValue);
  }
   else if ('nodeValue' in change) {
    childId = round_int($valueProd_0(change['nodeValue']));
    child = $getNode(node.tree, childId);
    if (!child) {
      debugger;
      throw toJs(new AssertionError);
    }
    child.parent_0 = node;
    $setValue(property, child);
  }
   else {
    debugger;
    throw toJs(new AssertionError_0('Change should have either value or nodeValue property: ' + stringify(change)));
  }
}

function processSpliceChange(change, node){
  var add_0, addJson, addNodes, child, childId, i_0, index_0, jsArray, key, length_0, list, nsId, remove, removed, tree;
  nsId = round_int($valueProd_0(change['feat']));
  list = $getList(node, nsId);
  index_0 = round_int($valueProd_0(change['index']));
  'remove' in change?(remove = round_int($valueProd_0(change['remove']))):(remove = 0);
  if ('add' in change) {
    addJson = change['add'];
    add_0 = (jsArray = castToJsArray(addJson) , jsArray);
    $splice(list, index_0, remove, add_0);
  }
   else if ('addNodes' in change) {
    addNodes = change['addNodes'];
    length_0 = addNodes.length;
    add_0 = [];
    tree = node.tree;
    for (i_0 = 0; i_0 < length_0; i_0++) {
      childId = round_int($valueProd_0(addNodes[i_0]));
      child = (key = childId , castTo(tree.idToNode.get(key), 6));
      if (!child) {
        debugger;
        throw toJs(new AssertionError_0('No child node found with id ' + childId));
      }
      child.parent_0 = node;
      add_0[i_0] = child;
    }
    $splice(list, index_0, remove, add_0);
  }
   else {
    removed = list.values.splice(index_0, remove);
    $fireEvent_0(list.eventRouter, new ListSpliceEvent(list, index_0, removed, [], false));
  }
}

function $clinit_Binder(){
  var array;
  $clinit_Binder = emptyMethod;
  STRATEGIES = (array = [] , array.push(new SimpleElementBindingStrategy) , array.push(new TextBindingStrategy) , array);
  CONTEXT = new Binder$BinderContextImpl;
}

function bind_1(stateNode, domNode){
  $clinit_Binder();
  var applicable;
  if (stateNode.tree.updateInProgress) {
    debugger;
    throw toJs(new AssertionError_0('Binding state node while processing state tree changes'));
  }
  applicable = getApplicableStrategy(stateNode);
  applicable.bind_0(stateNode, domNode, CONTEXT);
}

function getApplicableStrategy(node){
  $clinit_Binder();
  var applicable, i_0, strategy;
  applicable = null;
  for (i_0 = 0; i_0 < STRATEGIES.length; i_0++) {
    strategy = castTo(STRATEGIES[i_0], 279);
    if (strategy.isApplicable(node)) {
      if (applicable) {
        debugger;
        throw toJs(new AssertionError_0('Found two strategies for the node : ' + getClass__Ljava_lang_Class___devirtual$(applicable) + ', ' + getClass__Ljava_lang_Class___devirtual$(strategy)));
      }
      applicable = strategy;
    }
  }
  if (!applicable) {
    throw toJs(new IllegalArgumentException('State node has no suitable binder strategy'));
  }
  return applicable;
}

var CONTEXT, STRATEGIES;
function $createAndBind(stateNode){
  var node, strategy;
  strategy = getApplicableStrategy(stateNode);
  node = stateNode.domNode;
  if (!stateNode.domNode) {
    node = strategy.create_0(stateNode);
    if (!node) {
      debugger;
      throw toJs(new AssertionError);
    }
    $setDomNode(stateNode, node);
  }
  bind_1(stateNode, node);
  return node;
}

function Binder$BinderContextImpl(){
}

defineClass(144, 1, {}, Binder$BinderContextImpl);
var Lcom_vaadin_client_flow_binding_Binder$BinderContextImpl_2_classLit = createForClass('com.vaadin.client.flow.binding', 'Binder/BinderContextImpl', 144);
var Lcom_vaadin_client_flow_binding_BindingStrategy_2_classLit = createForInterface('com.vaadin.client.flow.binding', 'BindingStrategy');
function $clinit_Debouncer(){
  $clinit_Debouncer = emptyMethod;
  debouncers = createNativeWeakMap();
}

function $trigger_0(this$static, phases, command){
  var triggerImmediately;
  this$static.lastCommand = command;
  triggerImmediately = false;
  if (!this$static.idleTimer) {
    triggerImmediately = phases.has('leading');
    this$static.idleTimer = new Debouncer$1(this$static);
  }
  $cancel_0(this$static.idleTimer);
  $schedule_1(this$static.idleTimer, round_int(this$static.timeout_0));
  if (!this$static.intermediateTimer && phases.has('intermediate')) {
    this$static.intermediateTimer = new Debouncer$2(this$static);
    $scheduleRepeating_0(this$static.intermediateTimer, round_int(this$static.timeout_0));
  }
  this$static.fireTrailing = this$static.fireTrailing | phases.has('trailing');
  return triggerImmediately;
}

function $unregister_0(this$static){
  var elementMap, identifierMap;
  elementMap = castToNative(debouncers.get(this$static.element), $wnd.Map);
  if (elementMap == null) {
    return;
  }
  identifierMap = castToNative(elementMap.get(this$static.identifier), $wnd.Map);
  if (identifierMap == null) {
    return;
  }
  identifierMap.delete(this$static.timeout_0);
  if (identifierMap.size == 0) {
    elementMap.delete(this$static.identifier);
    elementMap.size == 0 && debouncers.delete(this$static.element);
  }
}

function Debouncer(element, identifier, timeout){
  this.element = element;
  this.identifier = identifier;
  this.timeout_0 = timeout;
}

function getOrCreate(element, identifier, debounce){
  $clinit_Debouncer();
  var debouncer, elementMap, identifierMap;
  elementMap = castToNative(debouncers.get(element), $wnd.Map);
  if (elementMap == null) {
    elementMap = new $wnd.Map;
    debouncers.set(element, elementMap);
  }
  identifierMap = castToNative(elementMap.get(identifier), $wnd.Map);
  if (identifierMap == null) {
    identifierMap = new $wnd.Map;
    elementMap.set(identifier, identifierMap);
  }
  debouncer = castTo(identifierMap.get(debounce), 83);
  if (!debouncer) {
    debouncer = new Debouncer(element, identifier, debounce);
    identifierMap.set(debounce, debouncer);
  }
  return debouncer;
}

defineClass(83, 1, {83:1}, Debouncer);
_.fireTrailing = false;
_.timeout_0 = 0;
var debouncers;
var Lcom_vaadin_client_flow_binding_Debouncer_2_classLit = createForClass('com.vaadin.client.flow.binding', 'Debouncer', 83);
function $cancel_0(this$static){
  this$static.isRepeating?$clearInterval($wnd, this$static.timerId):$clearTimeout($wnd, this$static.timerId);
}

function $schedule_1(this$static, delayMillis){
  if (delayMillis < 0) {
    throw toJs(new IllegalArgumentException('must be non-negative'));
  }
  this$static.isRepeating?$clearInterval($wnd, this$static.timerId):$clearTimeout($wnd, this$static.timerId);
  this$static.isRepeating = false;
  this$static.timerId = $setTimeout($wnd, new Timer$1(this$static), delayMillis);
}

function $scheduleRepeating_0(this$static, periodMillis){
  if (periodMillis <= 0) {
    throw toJs(new IllegalArgumentException('must be positive'));
  }
  this$static.isRepeating?$clearInterval($wnd, this$static.timerId):$clearTimeout($wnd, this$static.timerId);
  this$static.isRepeating = true;
  this$static.timerId = $setInterval_1($wnd, new Timer$2(this$static), periodMillis);
}

defineClass(299, 1, {});
_.isRepeating = false;
_.timerId = 0;
var Lelemental_util_Timer_2_classLit = createForClass('elemental.util', 'Timer', 299);
function $run(this$static){
  !!this$static.this$01.intermediateTimer && $cancel_0(this$static.this$01.intermediateTimer);
  this$static.this$01.fireTrailing && $accept(this$static.this$01.lastCommand, 'trailing');
  $unregister_0(this$static.this$01);
}

function Debouncer$1(this$0){
  this.this$01 = this$0;
}

defineClass(275, 299, {}, Debouncer$1);
var Lcom_vaadin_client_flow_binding_Debouncer$1_2_classLit = createForClass('com.vaadin.client.flow.binding', 'Debouncer/1', 275);
function Debouncer$2(this$0){
  this.this$01 = this$0;
}

defineClass(276, 299, {}, Debouncer$2);
var Lcom_vaadin_client_flow_binding_Debouncer$2_2_classLit = createForClass('com.vaadin.client.flow.binding', 'Debouncer/2', 276);
function bindServerEventHandlerNames(element, node){
  return bindServerEventHandlerNames_0(new ServerEventHandlerBinder$lambda$0$Type(element), node, 19);
}

function bindServerEventHandlerNames_0(objectProvider, node, featureId){
  var i_0, object, serverEventHandlerName, serverEventHandlerNamesList;
  serverEventHandlerNamesList = $getList(node, featureId);
  $registerRead(serverEventHandlerNamesList.eventRouter);
  if (serverEventHandlerNamesList.values.length > 0) {
    object = castToJso(objectProvider.get_0());
    for (i_0 = 0; i_0 < ($registerRead(serverEventHandlerNamesList.eventRouter) , serverEventHandlerNamesList.values.length); i_0++) {
      serverEventHandlerName = castToString(serverEventHandlerNamesList.values[i_0]);
      $defineMethod(object, serverEventHandlerName, node);
    }
  }
  return $addSpliceListener(serverEventHandlerNamesList, new ServerEventHandlerBinder$lambda$1$Type(objectProvider, node));
}

function lambda$1_3(objectProvider_0, node_1, e_2){
  var add_0, i_0, i0, remove, serverObject;
  serverObject = castToJso(objectProvider_0.get_0());
  remove = e_2.remove_0;
  for (i0 = 0; i0 < remove.length; i0++) {
    $removeMethod(serverObject, castToString(remove[i0]));
  }
  add_0 = e_2.add_0;
  for (i_0 = 0; i_0 < add_0.length; i_0++) {
    $defineMethod(serverObject, castToString(add_0[i_0]), node_1);
  }
}

function ServerEventHandlerBinder$lambda$0$Type(element_0){
  this.element_0 = element_0;
}

defineClass(266, 1, {}, ServerEventHandlerBinder$lambda$0$Type);
_.get_0 = function get_0(){
  return get_1(this.element_0);
}
;
var Lcom_vaadin_client_flow_binding_ServerEventHandlerBinder$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'ServerEventHandlerBinder/lambda$0$Type', 266);
function ServerEventHandlerBinder$lambda$1$Type(objectProvider_0, node_1){
  this.objectProvider_0 = objectProvider_0;
  this.node_1 = node_1;
}

defineClass(267, 1, $intern_7, ServerEventHandlerBinder$lambda$1$Type);
_.onSplice = function onSplice_0(arg0){
  lambda$1_3(this.objectProvider_0, this.node_1, arg0);
}
;
var Lcom_vaadin_client_flow_binding_ServerEventHandlerBinder$lambda$1$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'ServerEventHandlerBinder/lambda$1$Type', 267);
function $clinit_ServerEventObject(){
  $clinit_ServerEventObject = emptyMethod;
  expressionCache = new $wnd.Map;
}

function $defineMethod(this$static, methodName, node){
  $clinit_ServerEventObject();
  this$static[methodName] = $entry(function(eventParameter){
    var prototype_0 = Object.getPrototypeOf(this);
    prototype_0[methodName] !== undefined && prototype_0[methodName].apply(this, arguments);
    var event_0 = eventParameter || $wnd.event;
    var tree = node.getTree();
    var args = $getEventData(this, event_0, methodName, node);
    args === null && (args = Array.prototype.slice.call(arguments));
    tree.sendTemplateEventToServer(node, methodName, args);
  }
  );
}

function $getEventData(this$static, event_0, methodName, node){
  var constantPool, dataArray, dataExpressions, expression, expressionConstantKey, i_0;
  if ($hasPropertyValue($getMap(node, 18), methodName)) {
    dataArray = [];
    constantPool = castTo($get(node.tree.registry, Lcom_vaadin_client_flow_ConstantPool_2_classLit), 53);
    expressionConstantKey = castToString($getValue($getProperty($getMap(node, 18), methodName)));
    dataExpressions = castToJsArray($get_0(constantPool, expressionConstantKey));
    for (i_0 = 0; i_0 < dataExpressions.length; i_0++) {
      expression = castToString(dataExpressions[i_0]);
      dataArray[i_0] = $getExpressionValue(this$static, event_0, node, expression);
    }
    return dataArray;
  }
  return null;
}

function $getExpressionValue(this$static, event_0, node, expression){
  var dataExpression, expressionValue, dataExpression_0, expressionValue_0, object;
  if (!$equals_0(expression.substr(0, 5), 'event') || $equals_0('event.model.item', expression)) {
    return $equals_0(expression.substr(0, 'event'.length), 'event')?(dataExpression_0 = getOrCreateExpression(expression) , expressionValue_0 = dataExpression_0(event_0, this$static) , object = {} , object['nodeId'] = createProd($valueProd_0(expressionValue_0['nodeId'])) , object):$getPolymerPropertyObject(node.domNode, expression);
  }
  dataExpression = getOrCreateExpression(expression);
  expressionValue = dataExpression(event_0, this$static);
  return expressionValue;
}

function $getPolymerPropertyObject(node, propertyName){
  if (typeof node.get === 'function') {
    var polymerProperty = node.get(propertyName);
    if (typeof polymerProperty === 'object' && typeof polymerProperty['nodeId'] !== 'undefined') {
      return {nodeId:polymerProperty['nodeId']};
    }
  }
  return null;
}

function $removeMethod(this$static, methodName){
  $clinit_ServerEventObject();
  delete this$static[methodName];
}

function get_1(element){
  $clinit_ServerEventObject();
  var serverObject;
  serverObject = element['$server'];
  if (!serverObject) {
    serverObject = {};
    element['$server'] = serverObject;
  }
  return serverObject;
}

function getOrCreateExpression(expressionString){
  var expression;
  expression = castToFunction(expressionCache.get(expressionString));
  if (expression == null) {
    expression = castToFunction(new $wnd.Function('event', 'element', 'return (' + expressionString + ')'));
    expressionCache.set(expressionString, expression);
  }
  return expression;
}

var expressionCache;
function $addChildren(index_0, context, add_0){
  var beforeRef, childNode, existingElementMap, i_0, newChild, newChildObject, nodeChildren, previousSibling;
  nodeChildren = $getList(context.node, 2);
  if (index_0 == 0) {
    beforeRef = getFirstNodeMappedAsStateNode(nodeChildren, context.htmlNode);
  }
   else if (index_0 <= ($registerRead(nodeChildren.eventRouter) , nodeChildren.values.length) && index_0 > 0) {
    previousSibling = $getPreviousSibling(index_0, context);
    beforeRef = !previousSibling?null:wrap_0(previousSibling.domNode).nextSibling;
  }
   else {
    beforeRef = null;
  }
  for (i_0 = 0; i_0 < add_0.length; i_0++) {
    newChildObject = add_0[i_0];
    newChild = castTo(newChildObject, 6);
    existingElementMap = castTo($get(newChild.tree.registry, Lcom_vaadin_client_ExistingElementMap_2_classLit), 54);
    childNode = $getElement(existingElementMap, newChild.id_0);
    if (childNode) {
      $remove(existingElementMap, newChild.id_0);
      $setDomNode(newChild, childNode);
      $createAndBind(newChild);
    }
     else {
      childNode = $createAndBind(newChild);
      wrap_0(context.htmlNode).insertBefore(childNode, beforeRef);
    }
    beforeRef = wrap_0(childNode).nextSibling;
  }
}

function $addEventHandler(eventType, context){
  var remover;
  if (context.listenerRemovers.has(eventType)) {
    debugger;
    throw toJs(new AssertionError);
  }
  remover = $addEventListener_0(context.htmlNode, eventType, new SimpleElementBindingStrategy$lambda$26$Type(context), false);
  context.listenerRemovers.set(eventType, remover);
}

function $appendVirtualChild(this$static, context, node, reactivePhase){
  var address, customElement, existingElement, id_0, initialPropertiesHandler, map_0, object, path, type_0;
  object = (map_0 = $getMap(node, 0) , castToJso($getValue($getProperty(map_0, 'payload'))));
  type_0 = object['type'];
  if ($equals_0('inMemory', type_0)) {
    $createAndBind(node);
    return;
  }
  initialPropertiesHandler = castTo($get(node.tree.registry, Lcom_vaadin_client_InitialPropertiesHandler_2_classLit), 44);
  if (!context.htmlNode) {
    debugger;
    throw toJs(new AssertionError_0('Unexpected html node. The node is supposed to be a custom element'));
  }
  if ($equals_0('@id', type_0)) {
    id_0 = object['payload'];
    address = "id='" + id_0 + "'";
    if (!$verifyAttachRequest(context.node, node, id_0, address)) {
      return;
    }
    if (!(typeof context.htmlNode.$ != 'undefined')) {
      addReadyListener(context.htmlNode, new SimpleElementBindingStrategy$lambda$17$Type(this$static, context, node));
      return;
    }
    existingElement = getDomElementById(context.htmlNode, id_0);
    if ($verifyAttachedElement(existingElement, node, id_0, address, context)) {
      if (!reactivePhase) {
        initialPropertiesHandler.newNodeDuringUpdate.add(node.id_0);
        $flushPropertyUpdates(initialPropertiesHandler);
      }
      $setDomNode(node, existingElement);
      $createAndBind(node);
    }
  }
   else if ($equals_0('subTemplate', type_0)) {
    path = object['payload'];
    address = "path='" + toStringVerbose(path) + "'";
    if (!$verifyAttachRequest(context.node, node, null, address)) {
      return;
    }
    if (!context.htmlNode.root) {
      addReadyListener(context.htmlNode, new SimpleElementBindingStrategy$lambda$18$Type(this$static, context, node));
      return;
    }
    customElement = getCustomElement(context.htmlNode.root, path);
    if ($verifyAttachedElement(customElement, node, null, address, context)) {
      if (!reactivePhase) {
        initialPropertiesHandler.newNodeDuringUpdate.add(node.id_0);
        $flushPropertyUpdates(initialPropertiesHandler);
      }
      $setDomNode(node, customElement);
      $createAndBind(node);
    }
  }
   else {
    debugger;
    throw toJs(new AssertionError_0('Unexpected payload type ' + type_0));
  }
  reactivePhase || flush_17();
}

function $attachShadow(context){
  var function_0, map_0, newContext, shadowRoot, shadowRootNode;
  map_0 = $getMap(context.node, 20);
  shadowRootNode = castTo($getValue($getProperty(map_0, 'shadowRoot')), 6);
  if (shadowRootNode) {
    function_0 = new $wnd.Function('element', "if ( element.shadowRoot ) { return element.shadowRoot; } else { return element.attachShadow({'mode' : 'open'});}");
    shadowRoot = castToJso(function_0.call(null, context.htmlNode));
    !shadowRootNode.domNode && $setDomNode(shadowRootNode, shadowRoot);
    newContext = new SimpleElementBindingStrategy$BindingContext(shadowRootNode, shadowRoot, context.binderContext);
    $bindChildren(newContext);
  }
}

function $bind_1(this$static, stateNode, htmlNode, nodeFactory){
  var computationsCollection, context, isVisible, listeners, nsTag, elementListeners, propertyEvents, update;
  isVisible = $isVisible(stateNode);
  nsTag = castToString($getValue($getProperty($getMap(stateNode, 0), 'tag')));
  if (!(nsTag == null || $equalsIgnoreCase(htmlNode.tagName, nsTag))) {
    debugger;
    throw toJs(new AssertionError_0("Element tag name is '" + htmlNode.tagName + "', but the required tag name is " + castToString($getValue($getProperty($getMap(stateNode, 0), 'tag')))));
  }
  boundNodes == null && (boundNodes = createNativeWeakMap());
  if (boundNodes.has(stateNode)) {
    return;
  }
  boundNodes.set(stateNode, ($clinit_Boolean() , true));
  context = new SimpleElementBindingStrategy$BindingContext(stateNode, htmlNode, nodeFactory);
  computationsCollection = [];
  listeners = [];
  if (isVisible) {
    listeners.push($bindClientCallableMethods(context));
    listeners.push(bindServerEventHandlerNames_0(new SimpleElementBindingStrategy$lambda$29$Type(context), context.node, 17));
    listeners.push((elementListeners = $getMap(context.node, 4) , $forEachProperty(elementListeners, makeLambdaFunction(SimpleElementBindingStrategy$lambda$23$Type.prototype.accept, SimpleElementBindingStrategy$lambda$23$Type, [context])) , $addPropertyAddListener(elementListeners, new SimpleElementBindingStrategy$lambda$24$Type(context))));
    listeners.push(($synchronizeEventTypesChanged(context) , propertyEvents = $getList(context.node, 14) , $addSpliceListener(propertyEvents, new SimpleElementBindingStrategy$lambda$13$Type(context))));
    listeners.push($bindVirtualChildren(this$static, context));
    listeners.push($bindChildren(context));
    listeners.push($bindShadowRoot(context));
    listeners.push($bindClassList(htmlNode, stateNode));
    listeners.push($bindMap(12, new SimpleElementBindingStrategy$lambda$0$Type(htmlNode), $createComputations(computationsCollection), stateNode));
    listeners.push($bindMap(3, new SimpleElementBindingStrategy$lambda$1$Type(htmlNode), $createComputations(computationsCollection), stateNode));
    listeners.push($bindMap(1, new SimpleElementBindingStrategy$lambda$2$Type(htmlNode), $createComputations(computationsCollection), stateNode));
    $bindPolymerModelProperties(this$static, stateNode, htmlNode);
    listeners.push($addUnregisterListener(stateNode, new SimpleElementBindingStrategy$lambda$3$Type(listeners, context, computationsCollection)));
  }
  listeners.push($bindVisibility(listeners, context, computationsCollection));
  update = new SimpleElementBindingStrategy$InitialPropertyUpdate(stateNode);
  stateNode.nodeData.set(Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$InitialPropertyUpdate_2_classLit, update);
  addPostFlushListener(new SimpleElementBindingStrategy$lambda$4$Type(stateNode));
}

function $bindChildren(context){
  var child, childNode, children, existingElementMap, i_0;
  children = $getList(context.node, 2);
  children.hasBeenCleared && $removeAllChildren(context.htmlNode);
  for (i_0 = 0; i_0 < ($registerRead(children.eventRouter) , children.values.length); i_0++) {
    childNode = castTo(children.values[i_0], 6);
    existingElementMap = castTo($get(childNode.tree.registry, Lcom_vaadin_client_ExistingElementMap_2_classLit), 54);
    child = $getElement(existingElementMap, childNode.id_0);
    if (child) {
      $remove(existingElementMap, childNode.id_0);
      $setDomNode(childNode, child);
      $createAndBind(childNode);
    }
     else {
      child = $createAndBind(childNode);
      wrap_0(context.htmlNode).appendChild(child);
    }
  }
  return $addSpliceListener(children, new SimpleElementBindingStrategy$lambda$15$Type(context));
}

function $bindClassList(element, node){
  var classNodeList, i_0;
  classNodeList = $getList(node, 11);
  for (i_0 = 0; i_0 < ($registerRead(classNodeList.eventRouter) , classNodeList.values.length); i_0++) {
    wrap_0(element).classList.add(castToString(classNodeList.values[i_0]));
  }
  return $addSpliceListener(classNodeList, new SimpleElementBindingStrategy$lambda$28$Type(element));
}

function $bindClientCallableMethods(context){
  if (!context.htmlNode) {
    debugger;
    throw toJs(new AssertionError_0('Cannot bind client delegate methods to a Node'));
  }
  return bindServerEventHandlerNames(context.htmlNode, context.node);
}

function $bindEventHandlerProperty(eventHandlerProperty, context){
  var computation, name_0;
  name_0 = eventHandlerProperty.name_0;
  if (context.listenerBindings.has(name_0)) {
    debugger;
    throw toJs(new AssertionError);
  }
  computation = new Reactive$1(new SimpleElementBindingStrategy$lambda$25$Type(eventHandlerProperty, context, name_0));
  context.listenerBindings.set(name_0, computation);
  return computation;
}

function $bindMap(featureId, user, bindings, node){
  var map_0;
  map_0 = $getMap(node, featureId);
  $forEachProperty(map_0, makeLambdaFunction(SimpleElementBindingStrategy$lambda$7$Type.prototype.accept, SimpleElementBindingStrategy$lambda$7$Type, [user, bindings]));
  return $addPropertyAddListener(map_0, new SimpleElementBindingStrategy$lambda$8$Type(user, bindings));
}

function $bindPolymerModelProperties(this$static, node, element){
  if (isPolymerElement(element)) {
    this$static.hookUpPolymerElement(node, element);
  }
   else if (mayBePolymerElement(element)) {
    var self_0 = this$static;
    try {
      $wnd.customElements.whenDefined(element.localName).then(function(){
        isPolymerElement(element) && self_0.hookUpPolymerElement(node, element);
      }
      );
    }
     catch (e) {
    }
  }
}

function $bindShadowRoot(context){
  var map_0;
  if (!context.htmlNode) {
    debugger;
    throw toJs(new AssertionError_0('Cannot bind shadow root to a Node'));
  }
  map_0 = $getMap(context.node, 20);
  $attachShadow(context);
  return $addPropertyAddListener(map_0, new SimpleElementBindingStrategy$lambda$6$Type(context));
}

function $bindVirtualChildren(this$static, context){
  var children, i_0;
  children = $getList(context.node, 24);
  for (i_0 = 0; i_0 < ($registerRead(children.eventRouter) , children.values.length); i_0++) {
    $appendVirtualChild(this$static, context, castTo(children.values[i_0], 6), true);
  }
  return $addSpliceListener(children, new SimpleElementBindingStrategy$lambda$16$Type(this$static, context));
}

function $bindVisibility(listeners, context, computationsCollection){
  var element, visibilityData;
  if (!context.htmlNode) {
    debugger;
    throw toJs(new AssertionError_0('The HTML node for the StateNode with id=' + context.node.id_0 + ' is not an Element'));
  }
  element = context.htmlNode;
  visibilityData = $getMap(context.node, 0);
  $setValue($getProperty(visibilityData, 'hidden'), element.getAttribute('hidden'));
  $setValue($getProperty(visibilityData, 'bound'), ($clinit_Boolean() , $isVisible(context.node)?true:false));
  $updateVisibility(listeners, context, computationsCollection);
  return $addChangeListener($getProperty($getMap(context.node, 0), 'visible'), new SimpleElementBindingStrategy$lambda$9$Type(listeners, context, computationsCollection));
}

function $create(node){
  var tag;
  tag = castToString($getValue($getProperty($getMap(node, 0), 'tag')));
  if (tag == null) {
    debugger;
    throw toJs(new AssertionError_0('New child must have a tag'));
  }
  return $createElement($doc, tag);
}

function $createComputations(computationsCollection){
  var computations;
  computations = new $wnd.Map;
  computationsCollection.push(computations);
  return computations;
}

function $doBind(node){
  var domNode;
  domNode = node.domNode;
  $setDomNode(node, null);
  $setDomNode(node, domNode);
  $createAndBind(node);
}

function $getPreviousSibling(index_0, context){
  var child, count, i_0, node, nodeChildren;
  nodeChildren = $getList(context.node, 2);
  count = 0;
  node = null;
  for (i_0 = 0; i_0 < ($registerRead(nodeChildren.eventRouter) , nodeChildren.values.length); i_0++) {
    if (count == index_0) {
      return node;
    }
    child = castTo(nodeChildren.values[i_0], 6);
    if (child.domNode) {
      node = child;
      ++count;
    }
  }
  return node;
}

function $handleChildrenSplice(event_0, context){
  var add_0, child, childNode, htmlNode, i_0, remove;
  htmlNode = context.htmlNode;
  if (event_0.clear_0) {
    $removeAllChildren(htmlNode);
  }
   else {
    remove = event_0.remove_0;
    for (i_0 = 0; i_0 < remove.length; i_0++) {
      childNode = castTo(remove[i_0], 6);
      child = childNode.domNode;
      if (!child) {
        debugger;
        throw toJs(new AssertionError_0("Can't find element to remove"));
      }
      wrap_0(child).parentNode == htmlNode && wrap_0(htmlNode).removeChild(child);
    }
  }
  add_0 = event_0.add_0;
  add_0.length == 0 || $addChildren(event_0.index_0, context, add_0);
}

function $handleDomEvent(event_0, context){
  var constantPool, element, eventData, expression, expressionConstantKey, expressionSettings, expressionString, expressionString$index, expressionString$max, expressionValue, expressions, listenerMap, node, property, sendCommand, sendNow, str, synchronizeProperties, type_0;
  if (!context) {
    debugger;
    throw toJs(new AssertionError);
  }
  element = context.htmlNode;
  node = context.node;
  if (!element) {
    debugger;
    throw toJs(new AssertionError_0('Cannot handle DOM event for a Node'));
  }
  type_0 = event_0.type;
  listenerMap = $getMap(node, 4);
  constantPool = castTo($get(node.tree.registry, Lcom_vaadin_client_flow_ConstantPool_2_classLit), 53);
  expressionConstantKey = castToString($getValue($getProperty(listenerMap, type_0)));
  if (expressionConstantKey == null) {
    debugger;
    throw toJs(new AssertionError);
  }
  if (!$has(constantPool, expressionConstantKey)) {
    debugger;
    throw toJs(new AssertionError);
  }
  expressionSettings = castToJso($get_0(constantPool, expressionConstantKey));
  expressions = (str = $keys0(expressionSettings) , str);
  synchronizeProperties = new $wnd.Set;
  if (expressions.length == 0) {
    eventData = null;
  }
   else {
    eventData = {};
    for (expressionString$index = 0 , expressionString$max = expressions.length; expressionString$index < expressionString$max; ++expressionString$index) {
      expressionString = expressions[expressionString$index];
      if ($equals_0(expressionString.substr(0, 1), '}')) {
        property = expressionString.substr(1);
        synchronizeProperties.add(property);
      }
       else {
        expression = getOrCreateExpression_0(expressionString);
        expressionValue = expression(event_0, element);
        eventData[expressionString] = expressionValue;
      }
    }
  }
  sendCommand = new SimpleElementBindingStrategy$lambda$27$Type(synchronizeProperties, context, node, type_0, eventData);
  sendNow = resolveFilters(element, type_0, expressionSettings, eventData, sendCommand);
  sendNow && $lambda$27(sendCommand.synchronizeProperties_1, sendCommand.context_2, sendCommand.node_3, sendCommand.type_4, sendCommand.eventData_5, null);
}

function $handlePropertyChange(fullPropertyName, valueProvider, node){
  var elementProperties, i_0, mapProperty, model, nodeValue, obj, size_0, subProperties, subProperty, subProperty$index, subProperty$max, updatableProperties;
  updatableProperties = castTo(node.nodeData.get(Lcom_vaadin_client_flow_model_UpdatableModelProperties_2_classLit), 68);
  if (!updatableProperties || !updatableProperties.properties.has(fullPropertyName)) {
    return;
  }
  subProperties = $split(fullPropertyName, '\\.', 0);
  model = node;
  mapProperty = null;
  i_0 = 0;
  size_0 = subProperties.length;
  for (subProperty$index = 0 , subProperty$max = subProperties.length; subProperty$index < subProperty$max; ++subProperty$index) {
    subProperty = subProperties[subProperty$index];
    elementProperties = $getMap(model, 1);
    if (!$hasPropertyValue(elementProperties, subProperty) && i_0 < size_0 - 1) {
      shouldLogToBrowserConsole && $debug($wnd.console, "Ignoring property change for property '" + fullPropertyName + "' which isn't defined from server");
      return;
    }
    mapProperty = $getProperty(elementProperties, subProperty);
    instanceOf(($registerRead(mapProperty.eventRouter) , mapProperty.value_0), 6) && (model = ($registerRead(mapProperty.eventRouter) , castTo(mapProperty.value_0, 6)));
    ++i_0;
  }
  if (instanceOf(($registerRead(mapProperty.eventRouter) , mapProperty.value_0), 6)) {
    nodeValue = ($registerRead(mapProperty.eventRouter) , castTo(mapProperty.value_0, 6));
    obj = castToJso(valueProvider.changedPropertyPathsToValues_0[valueProvider.propertyName_1]);
    if (!('nodeId' in obj) || nodeValue.features.has(16)) {
      return;
    }
  }
  $syncToServer(mapProperty, valueProvider.changedPropertyPathsToValues_0[valueProvider.propertyName_1]);
}

function $handlePropertySyncDomEvent(context){
  var i_0, propertiesList;
  propertiesList = $getList(context.node, 13);
  for (i_0 = 0; i_0 < ($registerRead(propertiesList.eventRouter) , propertiesList.values.length); i_0++) {
    $syncPropertyIfNeeded(toString_2(propertiesList.values[i_0]), context);
  }
}

function $lambda$0_9(htmlNode_1, property_1){
  var name_0, styleElement;
  name_0 = property_1.name_0;
  styleElement = htmlNode_1.style;
  $registerRead(property_1.eventRouter);
  property_1.hasValue?$setProperty(styleElement, name_0, ($registerRead(property_1.eventRouter) , castToString(property_1.value_0))):styleElement.removeProperty(name_0);
}

function $lambda$1_3(htmlNode_1, property_1){
  var name_0;
  name_0 = property_1.name_0;
  updateAttribute(htmlNode_1, name_0, ($registerRead(property_1.eventRouter) , property_1.value_0));
}

function $lambda$10(element_1, visibilityData_2, context_3){
  updateAttribute(element_1, 'hidden', $getValue($getProperty(visibilityData_2, 'hidden')));
  $doBind(context_3.node);
}

function $lambda$15(context_1, e_1){
  addFlushListener(new SimpleElementBindingStrategy$lambda$33$Type(e_1, context_1));
}

function $lambda$16(this$static, context_1, e_1){
  addFlushListener(new SimpleElementBindingStrategy$lambda$34$Type(this$static, e_1, context_1));
}

function $lambda$2_1(htmlNode_1, property_1){
  $updateProperty(property_1, htmlNode_1);
}

function $lambda$23(context_1, property_1){
  var computation;
  computation = $bindEventHandlerProperty(property_1, context_1);
  $recompute(computation);
}

function $lambda$24(context_1, event_1){
  return $bindEventHandlerProperty(event_1.property, context_1);
}

function $lambda$25(eventHandlerProperty_1, context_2, name_3){
  var hasListener, hasValue;
  hasValue = ($registerRead(eventHandlerProperty_1.eventRouter) , eventHandlerProperty_1.hasValue);
  hasListener = context_2.listenerRemovers.has(name_3);
  hasValue != hasListener && (hasValue?$addEventHandler(name_3, context_2):$removeEventHandler(name_3, context_2));
}

function $lambda$26(context_1, event_1){
  $handleDomEvent(event_1, context_1);
}

function $lambda$27(synchronizeProperties_1, context_2, node_3, type_4, eventData_5, debouncePhase_5){
  synchronizeProperties_1.forEach(makeLambdaFunction(SimpleElementBindingStrategy$lambda$35$Type.prototype.accept_0, SimpleElementBindingStrategy$lambda$35$Type, [context_2]));
  sendEventToServer(node_3, type_4, eventData_5, debouncePhase_5);
}

function $lambda$34(this$static, e_1, context_2){
  var add_0, i_0;
  add_0 = e_1.add_0;
  if (add_0.length != 0) {
    for (i_0 = 0; i_0 < add_0.length; i_0++) {
      $appendVirtualChild(this$static, context_2, castTo(add_0[i_0], 6), true);
    }
  }
}

function $lambda$35(context_1, name_1){
  var currentValue;
  currentValue = context_1.htmlNode[name_1];
  $syncToServer($getProperty($getMap(context_1.node, 1), name_1), currentValue);
}

function $lambda$5(keys_1, changedPropertyPathsToValues_2, node_3){
  var propertyName, propertyName$index, propertyName$max;
  for (propertyName$index = 0 , propertyName$max = keys_1.length; propertyName$index < propertyName$max; ++propertyName$index) {
    propertyName = keys_1[propertyName$index];
    $handlePropertyChange(propertyName, new SimpleElementBindingStrategy$lambda$31$Type(changedPropertyPathsToValues_2, propertyName), node_3);
  }
}

function $remove_0(listeners, context, computationsCollection){
  var computationStopper;
  computationStopper = makeLambdaFunction(SimpleElementBindingStrategy$lambda$20$Type.prototype.accept, SimpleElementBindingStrategy$lambda$20$Type, []);
  computationsCollection.forEach(makeLambdaFunction(SimpleElementBindingStrategy$lambda$21$Type.prototype.accept_0, SimpleElementBindingStrategy$lambda$21$Type, [computationStopper]));
  context.listenerBindings.forEach(computationStopper);
  context.listenerRemovers.forEach(makeLambdaFunction(SimpleElementBindingStrategy$lambda$22$Type.prototype.accept, SimpleElementBindingStrategy$lambda$22$Type, []));
  listeners.forEach(makeLambdaFunction(SimpleElementBindingStrategy$1methodref$remove$Type.prototype.accept_0, SimpleElementBindingStrategy$1methodref$remove$Type, []));
  context.synchronizedPropertyEventListeners.forEach(makeLambdaFunction(SimpleElementBindingStrategy$2methodref$remove$Type.prototype.accept_0, SimpleElementBindingStrategy$2methodref$remove$Type, []));
  if (boundNodes == null) {
    debugger;
    throw toJs(new AssertionError);
  }
  boundNodes.delete(context.node);
}

function $removeAllChildren(htmlNode){
  var wrap;
  wrap = wrap_0(htmlNode);
  while (wrap.firstChild) {
    wrap.removeChild(wrap.firstChild);
  }
}

function $removeEventHandler(eventType, context){
  var remover;
  remover = castTo(context.listenerRemovers.get(eventType), 29);
  context.listenerRemovers.delete(eventType);
  if (!remover) {
    debugger;
    throw toJs(new AssertionError);
  }
  remover.remove_1();
}

function $syncPropertyIfNeeded(propertyName, context){
  var currentValue;
  currentValue = context.htmlNode[propertyName];
  $syncToServer($getProperty($getMap(context.node, 1), propertyName), currentValue);
}

function $synchronizeEventTypesChanged(context){
  var eventType, i_0, propertyEvents, remover;
  propertyEvents = $getList(context.node, 14);
  context.synchronizedPropertyEventListeners.forEach(makeLambdaFunction(SimpleElementBindingStrategy$0methodref$remove$Type.prototype.accept_0, SimpleElementBindingStrategy$0methodref$remove$Type, []));
  context.synchronizedPropertyEventListeners.clear();
  for (i_0 = 0; i_0 < ($registerRead(propertyEvents.eventRouter) , propertyEvents.values.length); i_0++) {
    eventType = toString_2(propertyEvents.values[i_0]);
    remover = $addEventListener_0(context.htmlNode, eventType, new SimpleElementBindingStrategy$lambda$14$Type(context), false);
    context.synchronizedPropertyEventListeners.add(remover);
  }
}

function $updateProperty(mapProperty, element){
  var domValue, name_0, treeValue;
  name_0 = mapProperty.name_0;
  $registerRead(mapProperty.eventRouter);
  if (mapProperty.hasValue) {
    treeValue = ($registerRead(mapProperty.eventRouter) , mapProperty.value_0);
    domValue = element[name_0];
    (domValue === undefined || !(maskUndefined(domValue) === maskUndefined(treeValue) || domValue != null && equals_Ljava_lang_Object__Z__devirtual$(domValue, treeValue))) && runWithComputation(null, new SimpleElementBindingStrategy$lambda$12$Type(element, name_0, treeValue));
  }
   else 
    Object.prototype.hasOwnProperty.call(element, name_0)?(delete element[name_0] , undefined):(element[name_0] = null , undefined);
}

function $updateVisibility(listeners, context, computationsCollection){
  var element, visibilityData;
  if (!context.htmlNode) {
    debugger;
    throw toJs(new AssertionError_0('The HTML node for the StateNode with id=' + context.node.id_0 + ' is not an Element'));
  }
  visibilityData = $getMap(context.node, 0);
  element = context.htmlNode;
  if (needsRebind(context.node) && $isVisible(context.node)) {
    $remove_0(listeners, context, computationsCollection);
    addFlushListener(new SimpleElementBindingStrategy$lambda$10$Type(element, visibilityData, context));
  }
   else if ($isVisible(context.node)) {
    $setValue($getProperty(visibilityData, 'bound'), ($clinit_Boolean() , true));
    updateAttribute(element, 'hidden', $getValue($getProperty(visibilityData, 'hidden')));
  }
   else {
    $setValue($getProperty(visibilityData, 'hidden'), element.getAttribute('hidden'));
    updateAttribute(element, 'hidden', $toString_0(($clinit_Boolean() , TRUE)));
  }
}

function $verifyAttachRequest(parent_0, node, id_0, address){
  var child, i_0, map_0, map0, virtualChildren;
  virtualChildren = $getList(parent_0, 24);
  for (i_0 = 0; i_0 < ($registerRead(virtualChildren.eventRouter) , virtualChildren.values.length); i_0++) {
    child = castTo(virtualChildren.values[i_0], 6);
    if (child == node) {
      continue;
    }
    if ($equals_0((map0 = $getMap(node, 0) , $toJson(castToJso($getValue($getProperty(map0, 'payload'))))), (map_0 = $getMap(child, 0) , $toJson(castToJso($getValue($getProperty(map_0, 'payload'))))))) {
      warn('There is already a request to attach element addressed by the ' + address + ". The existing request's node id='" + child.id_0 + "'. Cannot attach the same element twice.");
      $sendExistingElementWithIdAttachToServer_0(node.tree, parent_0, node.id_0, child.id_0, id_0);
      return false;
    }
  }
  return true;
}

function $verifyAttachedElement(element, attachNode, id_0, address, context){
  var domNode, existingId, failure, i_0, list, map_0, node, shadowRootNode, stateNode, tag;
  node = context.node;
  tag = castToString($getValue($getProperty($getMap(attachNode, 0), 'tag')));
  failure = false;
  if (!element) {
    failure = true;
    shouldLogToBrowserConsole && $warn($wnd.console, 'Element addressed by the ' + address + " is not found. The requested tag name is '" + tag + "'");
  }
   else if (!(!!element && $equalsIgnoreCase(tag, element.tagName))) {
    failure = true;
    warn('Element addressed by the ' + address + " has the wrong tag name '" + element.tagName + "', the requested tag name is '" + tag + "'");
  }
  if (failure) {
    $sendExistingElementWithIdAttachToServer_0(node.tree, node, attachNode.id_0, -1, id_0);
    return false;
  }
  if (!node.features.has(20)) {
    return true;
  }
  map_0 = $getMap(node, 20);
  shadowRootNode = castTo($getValue($getProperty(map_0, 'shadowRoot')), 6);
  if (!shadowRootNode) {
    return true;
  }
  list = $getList(shadowRootNode, 2);
  existingId = null;
  for (i_0 = 0; i_0 < ($registerRead(list.eventRouter) , list.values.length); i_0++) {
    stateNode = castTo(list.values[i_0], 6);
    domNode = stateNode.domNode;
    if (equals_Ljava_lang_Object__Z__devirtual$(domNode, element)) {
      existingId = valueOf_0(stateNode.id_0);
      break;
    }
  }
  if (existingId) {
    shouldLogToBrowserConsole && $warn($wnd.console, 'Element addressed by the ' + address + " has been already attached previously via the node id='" + existingId + "'");
    $sendExistingElementWithIdAttachToServer_0(node.tree, node, attachNode.id_0, existingId.value_0, id_0);
    return false;
  }
  return true;
}

function SimpleElementBindingStrategy(){
}

function bindProperty(user, property, bindings){
  var computation, name_0;
  name_0 = property.name_0;
  if (bindings.has(name_0)) {
    debugger;
    throw toJs(new AssertionError_0("There's already a binding for " + name_0));
  }
  computation = new Reactive$1(new SimpleElementBindingStrategy$lambda$11$Type(user, property));
  bindings.set(name_0, computation);
  return computation;
}

function checkParent(node, supposedParent){
  var parent_0;
  parent_0 = node;
  while (true) {
    parent_0 = parent_0.parent_0;
    if (!parent_0) {
      return false;
    }
    if (equals_Ljava_lang_Object__Z__devirtual$(supposedParent, parent_0.domNode)) {
      return true;
    }
  }
}

function getFirstNodeMappedAsStateNode(mappedNodeChildren, htmlNode){
  var clientList, clientNode, i_0, j, stateNode;
  clientList = wrap_0(htmlNode).childNodes;
  for (i_0 = 0; i_0 < clientList.length; i_0++) {
    clientNode = castToJso(clientList[i_0]);
    for (j = 0; j < ($registerRead(mappedNodeChildren.eventRouter) , mappedNodeChildren.values.length); j++) {
      stateNode = castTo(mappedNodeChildren.values[j], 6);
      if (equals_Ljava_lang_Object__Z__devirtual$(clientNode, stateNode.domNode)) {
        return clientNode;
      }
    }
  }
  return null;
}

function getOrCreateExpression_0(expressionString){
  var expression;
  expressionCache_0 == null && (expressionCache_0 = new $wnd.Map);
  expression = castToFunction(expressionCache_0.get(expressionString));
  if (expression == null) {
    expression = castToFunction(new $wnd.Function('event', 'element', 'return (' + expressionString + ')'));
    expressionCache_0.set(expressionString, expression);
  }
  return expression;
}

function handleListItemPropertyChange(nodeId, host, property, value_0, tree){
  var map_0, mapProperty, node;
  node = $getNode(tree, round_int(nodeId));
  if (!node.features.has(1)) {
    return;
  }
  if (!checkParent(node, host)) {
    debugger;
    throw toJs(new AssertionError_0('Host element is not a parent of the node whose property has changed. This is an implementation error. Most likely it means that there are several StateTrees on the same page (might be possible with portlets) and the target StateTree should not be passed into the method as an argument but somehow detected from the host element. Another option is that host element is calculated incorrectly.'));
  }
  map_0 = $getMap(node, 1);
  mapProperty = $getProperty(map_0, property);
  $syncToServer(mapProperty, value_0);
}

function lambda$21(computationStopper_0, collection_1){
  collection_1.forEach(computationStopper_0);
}

function lambda$28(element_0, e_1){
  var add_0, classList, i_0, i0, remove;
  classList = wrap_0(element_0).classList;
  remove = e_1.remove_0;
  for (i0 = 0; i0 < remove.length; i0++) {
    classList.remove(castToString(remove[i0]));
  }
  add_0 = e_1.add_0;
  for (i_0 = 0; i_0 < add_0.length; i_0++) {
    classList.add(castToString(add_0[i_0]));
  }
}

function lambda$4(stateNode_0){
  $scheduleDeferred_0(($clinit_SchedulerImpl() , INSTANCE), new SimpleElementBindingStrategy$lambda$30$Type(stateNode_0));
}

function lambda$7(user_0, bindings_1, property_2){
  $recompute(bindProperty(user_0, property_2, bindings_1));
}

function lambda$8(user_0, bindings_1, e_2){
  return bindProperty(user_0, e_2.property, bindings_1);
}

function needsRebind(node){
  return $equals(($clinit_Boolean() , FALSE), $getValue($getProperty($getMap(node, 0), 'bound')));
}

function resolveDebounces(element, debouncerId, debounceList, command){
  var atLeastOneEager, debounceSettings, eager, i_0, j, phases, timeout;
  atLeastOneEager = false;
  for (i_0 = 0; i_0 < debounceList.length; i_0++) {
    debounceSettings = debounceList[i_0];
    timeout = $valueProd_0(debounceSettings[0]);
    if (timeout == 0) {
      atLeastOneEager = true;
      continue;
    }
    phases = new $wnd.Set;
    for (j = 1; j < debounceSettings.length; j++) {
      phases.add(debounceSettings[j]);
    }
    eager = $trigger_0(getOrCreate(element, debouncerId, timeout), phases, command);
    atLeastOneEager = atLeastOneEager | eager;
  }
  return atLeastOneEager;
}

function resolveFilters(element, eventType, expressionSettings, eventData, sendCommand){
  var atLeastOneFilterMatched, debouncerId, expression, expression$array, expression$index, expression$max, filterMatched, hasDebounce, noFilters, settings, str;
  noFilters = true;
  atLeastOneFilterMatched = false;
  for (expression$array = (str = $keys0(expressionSettings) , str) , expression$index = 0 , expression$max = expression$array.length; expression$index < expression$max; ++expression$index) {
    expression = expression$array[expression$index];
    settings = expressionSettings[expression];
    hasDebounce = $getType(settings) == 1;
    if (!hasDebounce && !settings) {
      continue;
    }
    noFilters = false;
    filterMatched = !!eventData && $valueProd(eventData[expression]);
    if (hasDebounce && filterMatched) {
      debouncerId = 'on-' + eventType + ':' + expression;
      filterMatched = resolveDebounces(element, debouncerId, settings, sendCommand);
    }
    atLeastOneFilterMatched = atLeastOneFilterMatched | filterMatched;
  }
  return noFilters || atLeastOneFilterMatched;
}

function sendEventToServer(node, type_0, eventData, debouncePhase){
  if (debouncePhase == null) {
    !!eventData && (delete eventData['for'] , undefined);
  }
   else {
    !eventData && (eventData = {});
    eventData['for'] = debouncePhase;
  }
  $sendEventToServer(node.tree, node, type_0, eventData);
}

defineClass(218, 1, {279:1}, SimpleElementBindingStrategy);
_.bind_0 = function bind_2(stateNode, htmlNode, nodeFactory){
  $bind_1(this, stateNode, htmlNode, nodeFactory);
}
;
_.create_0 = function create(node){
  return $create(node);
}
;
_.handlePropertiesChanged = function handlePropertiesChanged(changedPropertyPathsToValues, node){
  var initialUpdate, keys_0, runnable;
  keys_0 = Object.keys(changedPropertyPathsToValues);
  runnable = new SimpleElementBindingStrategy$lambda$5$Type(keys_0, changedPropertyPathsToValues, node);
  initialUpdate = castTo(node.nodeData.get(Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$InitialPropertyUpdate_2_classLit), 67);
  !initialUpdate?$lambda$5(runnable.keys_1, runnable.changedPropertyPathsToValues_2, runnable.node_3):(initialUpdate.command = runnable);
}
;
_.hookUpPolymerElement = function hookUpPolymerElement(node, element){
  var self_0 = this;
  var originalPropertiesChanged = element._propertiesChanged;
  originalPropertiesChanged && (element._propertiesChanged = function(currentProps, changedProps, oldProps){
    $entry(function(){
      self_0.handlePropertiesChanged(changedProps, node);
    }
    )();
    originalPropertiesChanged.apply(this, arguments);
  }
  );
  var tree = node.getTree();
  var originalReady = element.ready;
  element.ready = function(){
    originalReady.apply(this, arguments);
    fireReadyEvent(element);
    var replaceDomRepeatPropertyChange = function(){
      var domRepeat = element.root.querySelector('dom-repeat');
      if (domRepeat) {
        element.removeEventListener('dom-change', replaceDomRepeatPropertyChange);
      }
       else {
        return;
      }
      if (!domRepeat.constructor.prototype.$propChangedModified) {
        domRepeat.constructor.prototype.$propChangedModified = true;
        var changed = domRepeat.constructor.prototype._propertiesChanged;
        domRepeat.constructor.prototype._propertiesChanged = function(currentProps, changedProps, oldProps){
          changed.apply(this, arguments);
          var props = Object.getOwnPropertyNames(changedProps);
          var items = 'items.';
          for (i = 0; i < props.length; i++) {
            var index_0 = props[i].indexOf(items);
            if (index_0 == 0) {
              var prop = props[i].substr(items.length);
              index_0 = prop.indexOf('.');
              if (index_0 > 0) {
                var arrayIndex = prop.substr(0, index_0);
                var propertyName = prop.substr(index_0 + 1);
                var currentPropsItem = currentProps.items[arrayIndex];
                if (currentPropsItem && currentPropsItem.nodeId) {
                  var nodeId = currentPropsItem.nodeId;
                  var value_0 = currentPropsItem[propertyName];
                  var host = this.__dataHost;
                  while (!host.localName || host.__dataHost) {
                    host = host.__dataHost;
                  }
                  $entry(function(){
                    handleListItemPropertyChange(nodeId, host, propertyName, value_0, tree);
                  }
                  )();
                }
              }
            }
          }
        }
        ;
      }
    }
    ;
    element.root && element.root.querySelector('dom-repeat')?replaceDomRepeatPropertyChange():element.addEventListener('dom-change', replaceDomRepeatPropertyChange);
  }
  ;
}
;
_.isApplicable = function isApplicable(node){
  if (node.features.has(0)) {
    return true;
  }
  return !!node.tree && equals_Ljava_lang_Object__Z__devirtual$(node, node.tree.rootNode);
}
;
var boundNodes, expressionCache_0;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy', 218);
function SimpleElementBindingStrategy$0methodref$remove$Type(){
}

defineClass(320, $wnd.Function, {}, SimpleElementBindingStrategy$0methodref$remove$Type);
_.accept_0 = function accept_24(arg0){
  castTo(arg0, 29).remove_1();
}
;
function SimpleElementBindingStrategy$1methodref$remove$Type(){
}

defineClass(324, $wnd.Function, {}, SimpleElementBindingStrategy$1methodref$remove$Type);
_.accept_0 = function accept_25(arg0){
  castTo(arg0, 29).remove_1();
}
;
function SimpleElementBindingStrategy$2methodref$remove$Type(){
}

defineClass(325, $wnd.Function, {}, SimpleElementBindingStrategy$2methodref$remove$Type);
_.accept_0 = function accept_26(arg0){
  castTo(arg0, 29).remove_1();
}
;
function SimpleElementBindingStrategy$BindingContext(node, htmlNode, binderContext){
  this.listenerBindings = new $wnd.Map;
  this.listenerRemovers = new $wnd.Map;
  this.synchronizedPropertyEventListeners = new $wnd.Set;
  this.node = node;
  this.htmlNode = htmlNode;
  this.binderContext = binderContext;
}

defineClass(92, 1, {}, SimpleElementBindingStrategy$BindingContext);
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$BindingContext_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/BindingContext', 92);
function $execute_0(this$static){
  !!this$static.command && $run_0(this$static.command);
  this$static.node.nodeData.delete(Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$InitialPropertyUpdate_2_classLit);
}

function SimpleElementBindingStrategy$InitialPropertyUpdate(node){
  this.node = node;
}

defineClass(67, 1, {67:1}, SimpleElementBindingStrategy$InitialPropertyUpdate);
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$InitialPropertyUpdate_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/InitialPropertyUpdate', 67);
function SimpleElementBindingStrategy$lambda$0$Type(htmlNode_1){
  this.htmlNode_1 = htmlNode_1;
}

defineClass(219, 1, {}, SimpleElementBindingStrategy$lambda$0$Type);
_.use = function use(property){
  $lambda$0_9(this.htmlNode_1, property);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$0$Type', 219);
function SimpleElementBindingStrategy$lambda$1$Type(htmlNode_1){
  this.htmlNode_1 = htmlNode_1;
}

defineClass(220, 1, {}, SimpleElementBindingStrategy$lambda$1$Type);
_.use = function use_0(property){
  $lambda$1_3(this.htmlNode_1, property);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$1$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$1$Type', 220);
function SimpleElementBindingStrategy$lambda$10$Type(element_1, visibilityData_2, context_3){
  this.element_1 = element_1;
  this.visibilityData_2 = visibilityData_2;
  this.context_3 = context_3;
}

defineClass(231, 1, $intern_6, SimpleElementBindingStrategy$lambda$10$Type);
_.flush = function flush_9(){
  $lambda$10(this.element_1, this.visibilityData_2, this.context_3);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$10$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$10$Type', 231);
function SimpleElementBindingStrategy$lambda$11$Type(user_0, property_1){
  this.user_0 = user_0;
  this.property_1 = property_1;
}

defineClass(232, 1, $intern_5, SimpleElementBindingStrategy$lambda$11$Type);
_.execute_0 = function execute_19(){
  this.user_0.use(this.property_1);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$11$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$11$Type', 232);
function SimpleElementBindingStrategy$lambda$12$Type(element_0, name_1, treeValue_2){
  this.element_0 = element_0;
  this.name_1 = name_1;
  this.treeValue_2 = treeValue_2;
}

defineClass(233, 1, $intern_5, SimpleElementBindingStrategy$lambda$12$Type);
_.execute_0 = function execute_20(){
  this.element_0[this.name_1] = createModelTree(this.treeValue_2);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$12$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$12$Type', 233);
function SimpleElementBindingStrategy$lambda$13$Type(context_1){
  this.context_1 = context_1;
}

defineClass(234, 1, $intern_7, SimpleElementBindingStrategy$lambda$13$Type);
_.onSplice = function onSplice_1(arg0){
  $synchronizeEventTypesChanged(this.context_1);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$13$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$13$Type', 234);
function SimpleElementBindingStrategy$lambda$14$Type(context_1){
  this.context_1 = context_1;
}

defineClass(235, 1, {}, SimpleElementBindingStrategy$lambda$14$Type);
_.handleEvent_0 = function handleEvent_7(arg0){
  $handlePropertySyncDomEvent(this.context_1);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$14$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$14$Type', 235);
function SimpleElementBindingStrategy$lambda$15$Type(context_1){
  this.context_1 = context_1;
}

defineClass(237, 1, $intern_7, SimpleElementBindingStrategy$lambda$15$Type);
_.onSplice = function onSplice_2(arg0){
  $lambda$15(this.context_1, arg0);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$15$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$15$Type', 237);
function SimpleElementBindingStrategy$lambda$16$Type($$outer_0, context_1){
  this.$$outer_0 = $$outer_0;
  this.context_1 = context_1;
}

defineClass(239, 1, $intern_7, SimpleElementBindingStrategy$lambda$16$Type);
_.onSplice = function onSplice_3(arg0){
  $lambda$16(this.$$outer_0, this.context_1, arg0);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$16$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$16$Type', 239);
function SimpleElementBindingStrategy$lambda$17$Type($$outer_0, context_1, node_2){
  this.$$outer_0 = $$outer_0;
  this.context_1 = context_1;
  this.node_2 = node_2;
}

defineClass(240, 1, $intern_4, SimpleElementBindingStrategy$lambda$17$Type);
_.run = function run_16(){
  $appendVirtualChild(this.$$outer_0, this.context_1, this.node_2, false);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$17$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$17$Type', 240);
function SimpleElementBindingStrategy$lambda$18$Type($$outer_0, context_1, node_2){
  this.$$outer_0 = $$outer_0;
  this.context_1 = context_1;
  this.node_2 = node_2;
}

defineClass(241, 1, $intern_4, SimpleElementBindingStrategy$lambda$18$Type);
_.run = function run_17(){
  $appendVirtualChild(this.$$outer_0, this.context_1, this.node_2, false);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$18$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$18$Type', 241);
function SimpleElementBindingStrategy$lambda$2$Type(htmlNode_1){
  this.htmlNode_1 = htmlNode_1;
}

defineClass(221, 1, {}, SimpleElementBindingStrategy$lambda$2$Type);
_.use = function use_1(property){
  $lambda$2_1(this.htmlNode_1, property);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$2$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$2$Type', 221);
function SimpleElementBindingStrategy$lambda$20$Type(){
}

defineClass(321, $wnd.Function, {}, SimpleElementBindingStrategy$lambda$20$Type);
_.accept = function accept_27(arg0, arg1){
  $stop_0(castTo(arg0, 46));
}
;
function SimpleElementBindingStrategy$lambda$21$Type(computationStopper_0){
  this.computationStopper_0 = computationStopper_0;
}

defineClass(322, $wnd.Function, {}, SimpleElementBindingStrategy$lambda$21$Type);
_.accept_0 = function accept_28(arg0){
  lambda$21(this.computationStopper_0, arg0);
}
;
function SimpleElementBindingStrategy$lambda$22$Type(){
}

defineClass(323, $wnd.Function, {}, SimpleElementBindingStrategy$lambda$22$Type);
_.accept = function accept_29(arg0, arg1){
  castTo(arg0, 29).remove_1();
}
;
function SimpleElementBindingStrategy$lambda$23$Type(context_1){
  this.context_1 = context_1;
}

defineClass(326, $wnd.Function, {}, SimpleElementBindingStrategy$lambda$23$Type);
_.accept = function accept_30(arg0, arg1){
  $lambda$23(this.context_1, arg0);
}
;
function SimpleElementBindingStrategy$lambda$24$Type(context_1){
  this.context_1 = context_1;
}

defineClass(242, 1, $intern_8, SimpleElementBindingStrategy$lambda$24$Type);
_.onPropertyAdd = function onPropertyAdd_0(arg0){
  $lambda$24(this.context_1, arg0);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$24$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$24$Type', 242);
function SimpleElementBindingStrategy$lambda$25$Type(eventHandlerProperty_1, context_2, name_3){
  this.eventHandlerProperty_1 = eventHandlerProperty_1;
  this.context_2 = context_2;
  this.name_3 = name_3;
}

defineClass(243, 1, $intern_5, SimpleElementBindingStrategy$lambda$25$Type);
_.execute_0 = function execute_21(){
  $lambda$25(this.eventHandlerProperty_1, this.context_2, this.name_3);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$25$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$25$Type', 243);
function SimpleElementBindingStrategy$lambda$26$Type(context_1){
  this.context_1 = context_1;
}

defineClass(244, 1, {}, SimpleElementBindingStrategy$lambda$26$Type);
_.handleEvent_0 = function handleEvent_8(arg0){
  $lambda$26(this.context_1, arg0);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$26$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$26$Type', 244);
function $accept(this$static, arg0){
  $lambda$27(this$static.synchronizeProperties_1, this$static.context_2, this$static.node_3, this$static.type_4, this$static.eventData_5, arg0);
}

function SimpleElementBindingStrategy$lambda$27$Type(synchronizeProperties_1, context_2, node_3, type_4, eventData_5){
  this.synchronizeProperties_1 = synchronizeProperties_1;
  this.context_2 = context_2;
  this.node_3 = node_3;
  this.type_4 = type_4;
  this.eventData_5 = eventData_5;
}

defineClass(245, 1, {}, SimpleElementBindingStrategy$lambda$27$Type);
_.accept_0 = function accept_31(arg0){
  $accept(this, arg0);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$27$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$27$Type', 245);
function SimpleElementBindingStrategy$lambda$28$Type(element_0){
  this.element_0 = element_0;
}

defineClass(246, 1, $intern_7, SimpleElementBindingStrategy$lambda$28$Type);
_.onSplice = function onSplice_4(arg0){
  lambda$28(this.element_0, arg0);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$28$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$28$Type', 246);
function SimpleElementBindingStrategy$lambda$29$Type(context_0){
  this.context_0 = context_0;
}

defineClass(247, 1, {}, SimpleElementBindingStrategy$lambda$29$Type);
_.get_0 = function get_2(){
  return this.context_0.htmlNode;
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$29$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$29$Type', 247);
function SimpleElementBindingStrategy$lambda$3$Type(listeners_1, context_2, computationsCollection_3){
  this.listeners_1 = listeners_1;
  this.context_2 = context_2;
  this.computationsCollection_3 = computationsCollection_3;
}

defineClass(222, 1, {}, SimpleElementBindingStrategy$lambda$3$Type);
_.onUnregister = function onUnregister_0(arg0){
  $remove_0(this.listeners_1, this.context_2, this.computationsCollection_3);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$3$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$3$Type', 222);
function SimpleElementBindingStrategy$lambda$30$Type(stateNode_0){
  this.stateNode_0 = stateNode_0;
}

defineClass(223, 1, {}, SimpleElementBindingStrategy$lambda$30$Type);
_.execute_0 = function execute_22(){
  $execute_0(castTo($getNodeData(this.stateNode_0, Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$InitialPropertyUpdate_2_classLit), 67));
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$30$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$30$Type', 223);
function SimpleElementBindingStrategy$lambda$31$Type(changedPropertyPathsToValues_0, propertyName_1){
  this.changedPropertyPathsToValues_0 = changedPropertyPathsToValues_0;
  this.propertyName_1 = propertyName_1;
}

defineClass(225, 1, {}, SimpleElementBindingStrategy$lambda$31$Type);
_.get_0 = function get_3(){
  return this.changedPropertyPathsToValues_0[this.propertyName_1];
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$31$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$31$Type', 225);
function SimpleElementBindingStrategy$lambda$32$Type(context_1){
  this.context_1 = context_1;
}

defineClass(227, 1, $intern_6, SimpleElementBindingStrategy$lambda$32$Type);
_.flush = function flush_10(){
  $attachShadow(this.context_1);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$32$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$32$Type', 227);
function SimpleElementBindingStrategy$lambda$33$Type(e_1, context_2){
  this.e_1 = e_1;
  this.context_2 = context_2;
}

defineClass(236, 1, $intern_6, SimpleElementBindingStrategy$lambda$33$Type);
_.flush = function flush_11(){
  $handleChildrenSplice(this.e_1, this.context_2);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$33$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$33$Type', 236);
function SimpleElementBindingStrategy$lambda$34$Type($$outer_0, e_1, context_2){
  this.$$outer_0 = $$outer_0;
  this.e_1 = e_1;
  this.context_2 = context_2;
}

defineClass(238, 1, $intern_6, SimpleElementBindingStrategy$lambda$34$Type);
_.flush = function flush_12(){
  $lambda$34(this.$$outer_0, this.e_1, this.context_2);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$34$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$34$Type', 238);
function SimpleElementBindingStrategy$lambda$35$Type(context_1){
  this.context_1 = context_1;
}

defineClass(327, $wnd.Function, {}, SimpleElementBindingStrategy$lambda$35$Type);
_.accept_0 = function accept_32(arg0){
  $lambda$35(this.context_1, arg0);
}
;
function SimpleElementBindingStrategy$lambda$4$Type(stateNode_0){
  this.stateNode_0 = stateNode_0;
}

defineClass(224, 1, $intern_6, SimpleElementBindingStrategy$lambda$4$Type);
_.flush = function flush_13(){
  lambda$4(this.stateNode_0);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$4$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$4$Type', 224);
function $run_0(this$static){
  $lambda$5(this$static.keys_1, this$static.changedPropertyPathsToValues_2, this$static.node_3);
}

function SimpleElementBindingStrategy$lambda$5$Type(keys_1, changedPropertyPathsToValues_2, node_3){
  this.keys_1 = keys_1;
  this.changedPropertyPathsToValues_2 = changedPropertyPathsToValues_2;
  this.node_3 = node_3;
}

defineClass(226, 1, $intern_4, SimpleElementBindingStrategy$lambda$5$Type);
_.run = function run_18(){
  $run_0(this);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$5$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$5$Type', 226);
function SimpleElementBindingStrategy$lambda$6$Type(context_1){
  this.context_1 = context_1;
}

defineClass(228, 1, $intern_8, SimpleElementBindingStrategy$lambda$6$Type);
_.onPropertyAdd = function onPropertyAdd_1(arg0){
  addFlushListener(new SimpleElementBindingStrategy$lambda$32$Type(this.context_1));
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$6$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$6$Type', 228);
function SimpleElementBindingStrategy$lambda$7$Type(user_0, bindings_1){
  this.user_0 = user_0;
  this.bindings_1 = bindings_1;
}

defineClass(319, $wnd.Function, {}, SimpleElementBindingStrategy$lambda$7$Type);
_.accept = function accept_33(arg0, arg1){
  lambda$7(this.user_0, this.bindings_1, arg0);
}
;
function SimpleElementBindingStrategy$lambda$8$Type(user_0, bindings_1){
  this.user_0 = user_0;
  this.bindings_1 = bindings_1;
}

defineClass(229, 1, $intern_8, SimpleElementBindingStrategy$lambda$8$Type);
_.onPropertyAdd = function onPropertyAdd_2(arg0){
  lambda$8(this.user_0, this.bindings_1, arg0);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$8$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$8$Type', 229);
function SimpleElementBindingStrategy$lambda$9$Type(listeners_1, context_2, computationsCollection_3){
  this.listeners_1 = listeners_1;
  this.context_2 = context_2;
  this.computationsCollection_3 = computationsCollection_3;
}

defineClass(230, 1, $intern_9, SimpleElementBindingStrategy$lambda$9$Type);
_.onPropertyChange = function onPropertyChange_5(arg0){
  $updateVisibility(this.listeners_1, this.context_2, this.computationsCollection_3);
}
;
var Lcom_vaadin_client_flow_binding_SimpleElementBindingStrategy$lambda$9$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'SimpleElementBindingStrategy/lambda$9$Type', 230);
function $clinit_TextBindingStrategy(){
  $clinit_TextBindingStrategy = emptyMethod;
  BOUND = createNativeWeakMap();
}

function $bind_2(stateNode, htmlNode){
  var computation, textMap, textProperty;
  if (!stateNode.features.has(7)) {
    debugger;
    throw toJs(new AssertionError);
  }
  if (BOUND.has(stateNode)) {
    return;
  }
  BOUND.set(stateNode, ($clinit_Boolean() , true));
  textMap = $getMap(stateNode, 7);
  textProperty = $getProperty(textMap, 'text');
  computation = new Reactive$1(new TextBindingStrategy$lambda$0$Type(htmlNode, textProperty));
  $addUnregisterListener(stateNode, new TextBindingStrategy$lambda$1$Type(stateNode, computation));
}

function $lambda$1_4(stateNode_1, computation_2){
  $stop_0(computation_2);
  BOUND.delete(stateNode_1);
}

function TextBindingStrategy(){
  $clinit_TextBindingStrategy();
}

defineClass(248, 1, {279:1}, TextBindingStrategy);
_.bind_0 = function bind_3(stateNode, htmlNode, nodeFactory){
  $bind_2(stateNode, htmlNode);
}
;
_.create_0 = function create_0(node){
  return $doc.createTextNode('');
}
;
_.isApplicable = function isApplicable_0(node){
  return node.features.has(7);
}
;
var BOUND;
var Lcom_vaadin_client_flow_binding_TextBindingStrategy_2_classLit = createForClass('com.vaadin.client.flow.binding', 'TextBindingStrategy', 248);
function TextBindingStrategy$lambda$0$Type(htmlNode_0, textProperty_1){
  this.htmlNode_0 = htmlNode_0;
  this.textProperty_1 = textProperty_1;
}

defineClass(249, 1, $intern_5, TextBindingStrategy$lambda$0$Type);
_.execute_0 = function execute_23(){
  $clinit_TextBindingStrategy();
  $setData(this.htmlNode_0, castToString($getValue(this.textProperty_1)));
}
;
var Lcom_vaadin_client_flow_binding_TextBindingStrategy$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'TextBindingStrategy/lambda$0$Type', 249);
function TextBindingStrategy$lambda$1$Type(stateNode_1, computation_2){
  this.stateNode_1 = stateNode_1;
  this.computation_2 = computation_2;
}

defineClass(250, 1, {}, TextBindingStrategy$lambda$1$Type);
_.onUnregister = function onUnregister_1(arg0){
  $lambda$1_4(this.stateNode_1, this.computation_2);
}
;
var Lcom_vaadin_client_flow_binding_TextBindingStrategy$lambda$1$Type_2_classLit = createForClass('com.vaadin.client.flow.binding', 'TextBindingStrategy/lambda$1$Type', 250);
function $clear(this$static){
  this$static.length = 0;
  return this$static;
}

function $remove_1(this$static, toRemove){
  var i_0;
  for (i_0 = 0; i_0 < this$static.length; i_0++) {
    if (maskUndefined(this$static[i_0]) === maskUndefined(toRemove)) {
      this$static.splice(i_0, 1)[0];
      return true;
    }
  }
  return false;
}

function createNativeWeakMap(){
  return new $wnd.WeakMap;
}

function set_1(values){
  var newSet;
  newSet = new $wnd.Set;
  values.forEach(makeLambdaFunction(JsCollections$0methodref$add$Type.prototype.accept_0, JsCollections$0methodref$add$Type, [newSet]));
  return newSet;
}

function JsCollections$0methodref$add$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(302, $wnd.Function, {}, JsCollections$0methodref$add$Type);
_.accept_0 = function accept_34(value_0){
  this.$$outer_0.add(value_0);
}
;
function spliceArray(array, index_0, remove, add_0){
  return array.splice.apply(array, [index_0, remove].concat(add_0));
}

function wrap_0(node){
  if (!impl) {
    return node;
  }
  return $wnd.Polymer.dom(node);
}

var impl, polymerMicroLoaded = false;
function PolymerDomApiImpl(){
}

defineClass(258, 1, {}, PolymerDomApiImpl);
var Lcom_vaadin_client_flow_dom_PolymerDomApiImpl_2_classLit = createForClass('com.vaadin.client.flow.dom', 'PolymerDomApiImpl', 258);
function UpdatableModelProperties(properties){
  this.properties = new $wnd.Set;
  properties.forEach(makeLambdaFunction(UpdatableModelProperties$0methodref$add$Type.prototype.accept_0, UpdatableModelProperties$0methodref$add$Type, [this.properties]));
}

defineClass(68, 1, {68:1}, UpdatableModelProperties);
var Lcom_vaadin_client_flow_model_UpdatableModelProperties_2_classLit = createForClass('com.vaadin.client.flow.model', 'UpdatableModelProperties', 68);
function UpdatableModelProperties$0methodref$add$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(332, $wnd.Function, {}, UpdatableModelProperties$0methodref$add$Type);
_.accept_0 = function accept_35(arg0){
  this.$$outer_0.add(castToString(arg0));
}
;
function ReactiveValueChangeEvent(source){
  this.source = source;
}

defineClass(80, 1, {});
_.getSource = function getSource(){
  return this.source;
}
;
var Lcom_vaadin_client_flow_reactive_ReactiveValueChangeEvent_2_classLit = createForClass('com.vaadin.client.flow.reactive', 'ReactiveValueChangeEvent', 80);
function ListSpliceEvent(source, index_0, remove, add_0, clear_0){
  this.source = source;
  if (remove == null) {
    debugger;
    throw toJs(new AssertionError);
  }
  if (add_0 == null) {
    debugger;
    throw toJs(new AssertionError);
  }
  this.index_0 = index_0;
  this.remove_0 = remove;
  this.add_0 = add_0;
  this.clear_0 = clear_0;
}

defineClass(59, 80, {59:1}, ListSpliceEvent);
_.getSource = function getSource_0(){
  return castTo(this.source, 35);
}
;
_.clear_0 = false;
_.index_0 = 0;
var Lcom_vaadin_client_flow_nodefeature_ListSpliceEvent_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'ListSpliceEvent', 59);
function $addChangeListener(this$static, listener){
  return $addListener(this$static.eventRouter, listener);
}

function $doSetValue(this$static, value_0){
  if (this$static.hasValue && equals_3(value_0, this$static.value_0)) {
    return;
  }
  $updateValue(this$static, value_0, true);
}

function $getValue(this$static){
  $registerRead(this$static.eventRouter);
  return this$static.value_0;
}

function $getValueOrDefault(this$static, defaultValue){
  var v;
  $registerRead(this$static.eventRouter);
  if (this$static.hasValue) {
    v = ($registerRead(this$static.eventRouter) , this$static.value_0);
    if (v == null) {
      return defaultValue;
    }
    return $intValue(castToDouble(v));
  }
   else {
    return defaultValue;
  }
}

function $getValueOrDefault_0(this$static, defaultValue){
  var v;
  $registerRead(this$static.eventRouter);
  if (this$static.hasValue) {
    v = ($registerRead(this$static.eventRouter) , this$static.value_0);
    if (v == null) {
      return defaultValue;
    }
    return $registerRead(this$static.eventRouter) , castToString(this$static.value_0);
  }
   else {
    return defaultValue;
  }
}

function $getValueOrDefault_1(this$static, defaultValue){
  var v;
  $registerRead(this$static.eventRouter);
  if (this$static.hasValue) {
    v = ($registerRead(this$static.eventRouter) , this$static.value_0);
    if (v == null) {
      return defaultValue;
    }
    return $booleanValue(castToBoolean(v));
  }
   else {
    return defaultValue;
  }
}

function $hasValue(this$static){
  $registerRead(this$static.eventRouter);
  return this$static.hasValue;
}

function $removeValue(this$static){
  if (this$static.hasValue) {
    this$static.isServerUpdate = true;
    $updateValue(this$static, null, false);
    addPostFlushListener(new MapProperty$lambda$1$Type(this$static));
  }
}

function $setValue(this$static, value_0){
  this$static.isServerUpdate = true;
  $doSetValue(this$static, value_0);
  addPostFlushListener(new MapProperty$lambda$0$Type(this$static));
}

function $syncToServer(this$static, newValue){
  var currentValue, node, tree;
  currentValue = ($registerRead(this$static.eventRouter) , this$static.hasValue?($registerRead(this$static.eventRouter) , this$static.value_0):null);
  (maskUndefined(newValue) === maskUndefined(currentValue) || newValue != null && equals_Ljava_lang_Object__Z__devirtual$(newValue, currentValue)) && (this$static.isServerUpdate = false);
  if (!((maskUndefined(newValue) === maskUndefined(currentValue) || newValue != null && equals_Ljava_lang_Object__Z__devirtual$(newValue, currentValue)) && ($registerRead(this$static.eventRouter) , this$static.hasValue)) && !this$static.isServerUpdate) {
    node = this$static.map_0.node;
    tree = node.tree;
    if ($isActive_0(tree, node)) {
      $doSetValue(this$static, newValue);
      $sendNodePropertySyncToServer(tree, this$static);
    }
     else {
      $fireEvent_0(this$static.eventRouter, new MapPropertyChangeEvent(this$static, currentValue, currentValue));
      flush_17();
    }
  }
}

function $updateValue(this$static, value_0, hasValue){
  var oldValue;
  oldValue = this$static.value_0;
  this$static.hasValue = hasValue;
  this$static.value_0 = value_0;
  $fireEvent_0(this$static.eventRouter, new MapPropertyChangeEvent(this$static, oldValue, value_0));
}

function MapProperty(name_0, map_0){
  this.eventRouter = new MapProperty$1(this);
  this.name_0 = name_0;
  this.map_0 = map_0;
}

defineClass(25, 1, {25:1}, MapProperty);
_.addReactiveValueChangeListener = function addReactiveValueChangeListener(reactiveValueChangeListener){
  return $addReactiveListener(this.eventRouter, reactiveValueChangeListener);
}
;
_.hasValue = false;
_.isServerUpdate = false;
var Lcom_vaadin_client_flow_nodefeature_MapProperty_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'MapProperty', 25);
function $addListener(this$static, listener){
  var computation, remover;
  this$static.listeners.add(listener);
  remover = new ReactiveEventRouter$lambda$0$Type(this$static, listener);
  computation = currentComputation;
  !!computation && $onNextInvalidate(computation, new ReactiveEventRouter$lambda$1$Type(remover));
  return remover;
}

function $addReactiveListener(this$static, reactiveValueChangeListener){
  return $addListener(this$static, this$static.wrap(reactiveValueChangeListener));
}

function $fireEvent_0(this$static, event_0){
  var copy;
  if (event_0.getSource() != this$static.reactiveValue) {
    debugger;
    throw toJs(new AssertionError);
  }
  copy = set_1(this$static.listeners);
  copy.forEach(makeLambdaFunction(ReactiveEventRouter$lambda$2$Type.prototype.accept_0, ReactiveEventRouter$lambda$2$Type, [this$static, event_0]));
}

function $lambda$0_10(this$static, listener_1){
  return this$static.listeners.delete(listener_1);
}

function $lambda$2_2(this$static, event_1, listener_1){
  this$static.dispatchEvent_0(listener_1, event_1);
}

function $registerRead(this$static){
  var computation;
  computation = currentComputation;
  !!computation && $addDependency(computation, this$static.reactiveValue);
}

function ReactiveEventRouter(reactiveValue){
  this.listeners = new $wnd.Set;
  this.reactiveValue = reactiveValue;
}

defineClass(78, 1, {});
var Lcom_vaadin_client_flow_reactive_ReactiveEventRouter_2_classLit = createForClass('com.vaadin.client.flow.reactive', 'ReactiveEventRouter', 78);
function MapProperty$1($anonymous0){
  ReactiveEventRouter.call(this, $anonymous0);
}

defineClass(203, 78, {}, MapProperty$1);
_.dispatchEvent_0 = function dispatchEvent_0(listener, event_0){
  castTo(listener, 40).onPropertyChange(castTo(event_0, 69));
}
;
_.wrap = function wrap_1(listener){
  return new MapProperty$1$0methodref$onValueChange$Type(listener);
}
;
var Lcom_vaadin_client_flow_nodefeature_MapProperty$1_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'MapProperty/1', 203);
function MapProperty$1$0methodref$onValueChange$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(204, 1, $intern_9, MapProperty$1$0methodref$onValueChange$Type);
_.onPropertyChange = function onPropertyChange_6(arg0){
  $onValueChange(this.$$outer_0);
}
;
var Lcom_vaadin_client_flow_nodefeature_MapProperty$1$0methodref$onValueChange$Type_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'MapProperty/1/0methodref$onValueChange$Type', 204);
function MapProperty$lambda$0$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(205, 1, $intern_6, MapProperty$lambda$0$Type);
_.flush = function flush_14(){
  this.$$outer_0.isServerUpdate = false;
}
;
var Lcom_vaadin_client_flow_nodefeature_MapProperty$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'MapProperty/lambda$0$Type', 205);
function MapProperty$lambda$1$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(206, 1, $intern_6, MapProperty$lambda$1$Type);
_.flush = function flush_15(){
  this.$$outer_0.isServerUpdate = false;
}
;
var Lcom_vaadin_client_flow_nodefeature_MapProperty$lambda$1$Type_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'MapProperty/lambda$1$Type', 206);
function MapPropertyAddEvent(source, property){
  ReactiveValueChangeEvent.call(this, source);
  this.property = property;
}

defineClass(81, 80, {81:1}, MapPropertyAddEvent);
_.getSource = function getSource_1(){
  return castTo(this.source, 39);
}
;
var Lcom_vaadin_client_flow_nodefeature_MapPropertyAddEvent_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'MapPropertyAddEvent', 81);
function MapPropertyChangeEvent(source, oldValue, newValue){
  ReactiveValueChangeEvent.call(this, source);
  this.oldValue = oldValue;
  this.newValue = newValue;
}

defineClass(69, 80, {69:1}, MapPropertyChangeEvent);
_.getSource = function getSource_2(){
  return castTo(this.source, 25);
}
;
var Lcom_vaadin_client_flow_nodefeature_MapPropertyChangeEvent_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'MapPropertyChangeEvent', 69);
function $getAsDebugJson(value_0){
  var child;
  if (instanceOf(value_0, 6)) {
    child = castTo(value_0, 6);
    return $getDebugJson(child);
  }
   else {
    return value_0;
  }
}

function NodeFeature(id_0, node){
  this.id_0 = id_0;
  this.node = node;
}

defineClass(38, 1, {38:1});
_.id_0 = 0;
var Lcom_vaadin_client_flow_nodefeature_NodeFeature_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'NodeFeature', 38);
function $addSpliceListener(this$static, listener){
  return $addListener(this$static.eventRouter, listener);
}

function $splice(this$static, index_0, remove, add_0){
  var removed;
  removed = spliceArray(this$static.values, index_0, remove, add_0);
  $fireEvent_0(this$static.eventRouter, new ListSpliceEvent(this$static, index_0, removed, add_0, false));
}

function NodeList_0(id_0, node){
  NodeFeature.call(this, id_0, node);
  this.values = [];
  this.eventRouter = new NodeList$1(this);
}

defineClass(35, 38, {38:1, 35:1}, NodeList_0);
_.addReactiveValueChangeListener = function addReactiveValueChangeListener_0(reactiveValueChangeListener){
  return $addReactiveListener(this.eventRouter, reactiveValueChangeListener);
}
;
_.convert = function convert_0(converter){
  var i_0, json, value_0;
  json = [];
  for (i_0 = 0; i_0 < this.values.length; i_0++) {
    value_0 = this.values[i_0];
    json[json.length] = createModelTree(value_0);
  }
  return json;
}
;
_.getDebugJson = function getDebugJson(){
  var i_0, json, jsonValue, value_0;
  json = [];
  for (i_0 = 0; i_0 < this.values.length; i_0++) {
    value_0 = this.values[i_0];
    jsonValue = $getAsDebugJson(value_0);
    json[json.length] = jsonValue;
  }
  return json;
}
;
_.hasBeenCleared = false;
var Lcom_vaadin_client_flow_nodefeature_NodeList_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'NodeList', 35);
function NodeList$1($anonymous0){
  ReactiveEventRouter.call(this, $anonymous0);
}

defineClass(268, 78, {}, NodeList$1);
_.dispatchEvent_0 = function dispatchEvent_1(listener, event_0){
  castTo(listener, 49).onSplice(castTo(event_0, 59));
}
;
_.wrap = function wrap_2(reactiveValueChangeListener){
  return new NodeList$1$0methodref$onValueChange$Type(reactiveValueChangeListener);
}
;
var Lcom_vaadin_client_flow_nodefeature_NodeList$1_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'NodeList/1', 268);
function NodeList$1$0methodref$onValueChange$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(269, 1, $intern_7, NodeList$1$0methodref$onValueChange$Type);
_.onSplice = function onSplice_5(arg0){
  $onValueChange(this.$$outer_0);
}
;
var Lcom_vaadin_client_flow_nodefeature_NodeList$1$0methodref$onValueChange$Type_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'NodeList/1/0methodref$onValueChange$Type', 269);
function $addPropertyAddListener(this$static, listener){
  return $addListener(this$static.eventRouter, listener);
}

function $forEachProperty(this$static, callback){
  $registerRead(this$static.eventRouter);
  this$static.properties.forEach(callback);
}

function $getProperty(this$static, name_0){
  var property;
  property = castTo(this$static.properties.get(name_0), 25);
  if (!property) {
    property = new MapProperty(name_0, this$static);
    this$static.properties.set(name_0, property);
    $fireEvent_0(this$static.eventRouter, new MapPropertyAddEvent(this$static, property));
  }
  return property;
}

function $hasPropertyValue(this$static, name_0){
  if (!this$static.properties.has(name_0)) {
    return false;
  }
  return $hasValue(castTo(this$static.properties.get(name_0), 25));
}

function $lambda$1_5(json_1, p_1, n_2){
  $registerRead(p_1.eventRouter);
  p_1.hasValue && (json_1[n_2] = $getAsDebugJson(($registerRead(p_1.eventRouter) , p_1.value_0)) , undefined);
}

function NodeMap(id_0, node){
  NodeFeature.call(this, id_0, node);
  this.properties = new $wnd.Map;
  this.eventRouter = new NodeMap$1(this);
}

function lambda$2_3(converter_0, json_1, property_2, name_3){
  var jsonValue;
  $registerRead(property_2.eventRouter);
  if (property_2.hasValue) {
    jsonValue = $apply(($registerRead(property_2.eventRouter) , property_2.value_0));
    json_1[name_3] = jsonValue;
  }
}

defineClass(39, 38, {38:1, 39:1}, NodeMap);
_.addReactiveValueChangeListener = function addReactiveValueChangeListener_1(reactiveValueChangeListener){
  return $addReactiveListener(this.eventRouter, reactiveValueChangeListener);
}
;
_.convert = function convert_1(converter){
  var json;
  json = {};
  this.properties.forEach(makeLambdaFunction(NodeMap$lambda$2$Type.prototype.accept, NodeMap$lambda$2$Type, [converter, json]));
  return json;
}
;
_.getDebugJson = function getDebugJson_0(){
  var json, str;
  json = {};
  this.properties.forEach(makeLambdaFunction(NodeMap$lambda$1$Type.prototype.accept, NodeMap$lambda$1$Type, [json]));
  if ((str = $keys0(json) , str).length == 0) {
    return null;
  }
  return json;
}
;
var Lcom_vaadin_client_flow_nodefeature_NodeMap_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'NodeMap', 39);
function NodeMap$1($anonymous0){
  ReactiveEventRouter.call(this, $anonymous0);
}

defineClass(200, 78, {}, NodeMap$1);
_.dispatchEvent_0 = function dispatchEvent_2(listener, event_0){
  castTo(listener, 71).onPropertyAdd(castTo(event_0, 81));
}
;
_.wrap = function wrap_3(reactiveValueChangeListener){
  return new NodeMap$1$0methodref$onValueChange$Type(reactiveValueChangeListener);
}
;
var Lcom_vaadin_client_flow_nodefeature_NodeMap$1_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'NodeMap/1', 200);
function NodeMap$1$0methodref$onValueChange$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(201, 1, $intern_8, NodeMap$1$0methodref$onValueChange$Type);
_.onPropertyAdd = function onPropertyAdd_3(arg0){
  $onValueChange(this.$$outer_0);
}
;
var Lcom_vaadin_client_flow_nodefeature_NodeMap$1$0methodref$onValueChange$Type_2_classLit = createForClass('com.vaadin.client.flow.nodefeature', 'NodeMap/1/0methodref$onValueChange$Type', 201);
function NodeMap$lambda$0$Type(list_0){
  this.list_0 = list_0;
}

defineClass(313, $wnd.Function, {}, NodeMap$lambda$0$Type);
_.accept = function accept_36(arg0, arg1){
  this.list_0.push(castToString(arg1));
}
;
function NodeMap$lambda$1$Type(json_1){
  this.json_1 = json_1;
}

defineClass(314, $wnd.Function, {}, NodeMap$lambda$1$Type);
_.accept = function accept_37(arg0, arg1){
  $lambda$1_5(this.json_1, arg0, arg1);
}
;
function NodeMap$lambda$2$Type(converter_0, json_1){
  this.converter_0 = converter_0;
  this.json_1 = json_1;
}

defineClass(315, $wnd.Function, {}, NodeMap$lambda$2$Type);
_.accept = function accept_38(arg0, arg1){
  lambda$2_3(this.converter_0, this.json_1, arg0, arg1);
}
;
function $addDependency(this$static, dependency){
  var remover;
  if (!this$static.stopped) {
    remover = dependency.addReactiveValueChangeListener(this$static);
    this$static.dependencies.push(remover);
  }
}

function $clearDependencies(this$static){
  while (this$static.dependencies.length != 0) {
    castTo(this$static.dependencies.splice(0, 1)[0], 29).remove_1();
  }
}

function $invalidate(this$static){
  var oldListeners;
  this$static.invalidated = true;
  $clearDependencies(this$static);
  this$static.stopped || addFlushListener(new Computation$0methodref$recompute$Type(this$static));
  if (this$static.invalidateListeners.size != 0) {
    oldListeners = this$static.invalidateListeners;
    this$static.invalidateListeners = new $wnd.Set;
    oldListeners.forEach(makeLambdaFunction(Computation$lambda$0$Type.prototype.accept_0, Computation$lambda$0$Type, []));
  }
}

function $onNextInvalidate(this$static, listener){
  this$static.stopped || this$static.invalidateListeners.add(listener);
}

function $onValueChange(this$static){
  if (this$static.invalidated || this$static.stopped) {
    return;
  }
  $invalidate(this$static);
}

function $recompute(this$static){
  if (this$static.invalidated && !this$static.stopped) {
    try {
      runWithComputation(this$static, new Computation$1methodref$doRecompute$Type(this$static));
    }
     finally {
      this$static.invalidated = false;
    }
  }
}

function $stop_0(this$static){
  this$static.stopped = true;
  $invalidate(this$static);
  this$static.invalidateListeners.clear();
  $clearDependencies(this$static);
}

defineClass(207, 1, {});
_.invalidated = false;
_.stopped = false;
var Lcom_vaadin_client_flow_reactive_Computation_2_classLit = createForClass('com.vaadin.client.flow.reactive', 'Computation', 207);
function Computation$0methodref$recompute$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(208, 1, $intern_6, Computation$0methodref$recompute$Type);
_.flush = function flush_16(){
  $recompute(this.$$outer_0);
}
;
var Lcom_vaadin_client_flow_reactive_Computation$0methodref$recompute$Type_2_classLit = createForClass('com.vaadin.client.flow.reactive', 'Computation/0methodref$recompute$Type', 208);
function Computation$1methodref$doRecompute$Type($$outer_0){
  this.$$outer_0 = $$outer_0;
}

defineClass(209, 1, $intern_5, Computation$1methodref$doRecompute$Type);
_.execute_0 = function execute_24(){
  this.$$outer_0.val$command1.execute_0();
}
;
var Lcom_vaadin_client_flow_reactive_Computation$1methodref$doRecompute$Type_2_classLit = createForClass('com.vaadin.client.flow.reactive', 'Computation/1methodref$doRecompute$Type', 209);
function Computation$lambda$0$Type(){
}

defineClass(317, $wnd.Function, {}, Computation$lambda$0$Type);
_.accept_0 = function accept_39(arg0){
  $remove_2(castTo(arg0, 79).remover_0);
}
;
function addFlushListener(flushListener){
  flushListeners == null && (flushListeners = []);
  flushListeners.push(flushListener);
}

function addPostFlushListener(postFlushListener){
  postFlushListeners == null && (postFlushListeners = []);
  postFlushListeners.push(postFlushListener);
}

function flush_17(){
  var oldestListener;
  while (flushListeners != null && flushListeners.length != 0 || postFlushListeners != null && postFlushListeners.length != 0) {
    while (flushListeners != null && flushListeners.length != 0) {
      oldestListener = castTo(flushListeners.splice(0, 1)[0], 13);
      oldestListener.flush();
    }
    if (postFlushListeners != null && postFlushListeners.length != 0) {
      oldestListener = castTo(postFlushListeners.splice(0, 1)[0], 13);
      oldestListener.flush();
    }
  }
}

function runWithComputation(computation, command){
  var oldComputation;
  oldComputation = currentComputation;
  currentComputation = computation;
  try {
    command.execute_0();
  }
   finally {
    currentComputation = oldComputation;
  }
}

var currentComputation = null, flushListeners, postFlushListeners;
function Reactive$1(val$command){
  this.val$command1 = val$command;
  this.dependencies = [];
  this.invalidateListeners = new $wnd.Set;
  $invalidate(this);
}

defineClass(46, 207, {46:1}, Reactive$1);
var Lcom_vaadin_client_flow_reactive_Reactive$1_2_classLit = createForClass('com.vaadin.client.flow.reactive', 'Reactive/1', 46);
function $remove_2(this$static){
  $lambda$0_10(this$static.$$outer_0, this$static.listener_1);
}

function ReactiveEventRouter$lambda$0$Type($$outer_0, listener_1){
  this.$$outer_0 = $$outer_0;
  this.listener_1 = listener_1;
}

defineClass(202, 1, $intern_13, ReactiveEventRouter$lambda$0$Type);
_.remove_1 = function remove_2(){
  $remove_2(this);
}
;
var Lcom_vaadin_client_flow_reactive_ReactiveEventRouter$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.flow.reactive', 'ReactiveEventRouter/lambda$0$Type', 202);
function ReactiveEventRouter$lambda$1$Type(remover_0){
  this.remover_0 = remover_0;
}

defineClass(79, 1, {79:1}, ReactiveEventRouter$lambda$1$Type);
var Lcom_vaadin_client_flow_reactive_ReactiveEventRouter$lambda$1$Type_2_classLit = createForClass('com.vaadin.client.flow.reactive', 'ReactiveEventRouter/lambda$1$Type', 79);
function ReactiveEventRouter$lambda$2$Type($$outer_0, event_1){
  this.$$outer_0 = $$outer_0;
  this.event_1 = event_1;
}

defineClass(316, $wnd.Function, {}, ReactiveEventRouter$lambda$2$Type);
_.accept_0 = function accept_40(arg0){
  $lambda$2_2(this.$$outer_0, this.event_1, arg0);
}
;
function createReturnChannelCallback(nodeId, channelId, serverConnector){
  return $entry(function(){
    var args = Array.prototype.slice.call(arguments);
    serverConnector.sendReturnChannelMessage(nodeId, channelId, args);
  }
  );
}

function decodeStateNode(tree, json){
  var array, key, nodeId, typeId;
  if ($getType(json) == 1) {
    array = json;
    typeId = round_int($valueProd_0(array[0]));
    switch (typeId) {
      case 0:
        {
          nodeId = round_int($valueProd_0(array[1]));
          return key = nodeId , castTo(tree.idToNode.get(key), 6);
        }

      case 1:
      case 2:
        return null;
      default:throw toJs(new IllegalArgumentException('Unsupported complex type in ' + $toJson(array)));
    }
  }
   else {
    return null;
  }
}

function decodeWithTypeInfo(tree, json){
  var array, domNode, jsArray, key, nodeId, typeId;
  if ($getType(json) == 1) {
    array = json;
    typeId = round_int($valueProd_0(array[0]));
    switch (typeId) {
      case 0:
        {
          nodeId = round_int($valueProd_0(array[1]));
          domNode = (key = nodeId , castTo(tree.idToNode.get(key), 6)).domNode;
          return domNode;
        }

      case 1:
        return jsArray = castToJsArray(array[1]) , jsArray;
      case 2:
        return createReturnChannelCallback(round_int($valueProd_0(array[1])), round_int($valueProd_0(array[2])), castTo($get(tree.registry, Lcom_vaadin_client_communication_ServerConnector_2_classLit), 24));
      default:throw toJs(new IllegalArgumentException('Unsupported complex type in ' + $toJson(array)));
    }
  }
   else {
    return json;
  }
}

function $defer(this$static, command){
  this$static.deferredDeltas == null && (this$static.deferredDeltas = []);
  this$static.deferredDeltas.push(command);
}

function $doAdd(this$static, type_0, handler){
  var l;
  if (!type_0) {
    throw toJs(new NullPointerException_1('Cannot add a handler with a null type'));
  }
  this$static.firingDepth > 0?$defer(this$static, new SimpleEventBus$lambda$1$Type(this$static, type_0, handler)):(l = $ensureHandlerList(this$static, type_0, null) , l.push(handler));
  return new SimpleEventBus$lambda$0$Type(this$static, type_0, handler);
}

function $doAddNow(this$static, type_0, source, handler){
  var l;
  l = $ensureHandlerList(this$static, type_0, source);
  l.push(handler);
}

function $doFire(this$static, event_0){
  var causes, directHandlers, e, handler, handlers, i_0;
  try {
    ++this$static.firingDepth;
    handlers = (directHandlers = $getHandlerList(this$static, event_0.getAssociatedType(), null) , directHandlers);
    causes = null;
    for (i_0 = 0; i_0 < handlers.length; i_0++) {
      handler = handlers[i_0];
      try {
        event_0.dispatch(handler);
      }
       catch ($e0) {
        $e0 = toJava($e0);
        if (instanceOf($e0, 7)) {
          e = $e0;
          causes == null && (causes = []);
          causes[causes.length] = e;
        }
         else 
          throw toJs($e0);
      }
    }
    if (causes != null) {
      throw toJs(new RuntimeException_0(castTo(causes[0], 5)));
    }
  }
   finally {
    --this$static.firingDepth;
    this$static.firingDepth == 0 && $handleQueuedAddsAndRemoves(this$static);
  }
}

function $doRemove(this$static, type_0, source, handler){
  this$static.firingDepth > 0?$defer(this$static, new SimpleEventBus$lambda$2$Type(this$static, type_0, source, handler)):$doRemoveNow(this$static, type_0, source, handler);
}

function $doRemoveNow(this$static, type_0, source, handler){
  var l, removed;
  l = $getHandlerList(this$static, type_0, source);
  removed = $remove_1(l, handler);
  removed && l.length == 0 && $prune(this$static, type_0, source);
}

function $ensureHandlerList(this$static, type_0, source){
  var handlers, sourceMap;
  sourceMap = castToNative(this$static.map_0.get(type_0), $wnd.Map);
  if (sourceMap == null) {
    sourceMap = new $wnd.Map;
    this$static.map_0.set(type_0, sourceMap);
  }
  handlers = castToJsArray(sourceMap.get(source));
  if (handlers == null) {
    handlers = [];
    sourceMap.set(source, handlers);
  }
  return handlers;
}

function $getHandlerList(this$static, type_0, source){
  var handlers, sourceMap;
  sourceMap = castToNative(this$static.map_0.get(type_0), $wnd.Map);
  if (sourceMap == null) {
    return [];
  }
  handlers = castToJsArray(sourceMap.get(source));
  if (handlers == null) {
    return [];
  }
  return handlers;
}

function $handleQueuedAddsAndRemoves(this$static){
  var c, i_0;
  if (this$static.deferredDeltas != null) {
    try {
      for (i_0 = 0; i_0 < this$static.deferredDeltas.length; i_0++) {
        c = castTo(this$static.deferredDeltas[i_0], 280);
        c.execute_0();
      }
    }
     finally {
      this$static.deferredDeltas = null;
    }
  }
}

function $prune(this$static, type_0, source){
  var pruned, sourceMap;
  sourceMap = castToNative(this$static.map_0.get(type_0), $wnd.Map);
  pruned = castToJsArray(sourceMap.get(source));
  sourceMap.delete(source);
  if (pruned == null) {
    debugger;
    throw toJs(new AssertionError_0("Can't prune what wasn't there"));
  }
  if (pruned.length != 0) {
    debugger;
    throw toJs(new AssertionError_0('Pruned unempty list!'));
  }
  sourceMap.size == 0 && this$static.map_0.delete(type_0);
}

function SimpleEventBus(){
  this.map_0 = new $wnd.Map;
}

defineClass(93, 298, {}, SimpleEventBus);
_.firingDepth = 0;
var Lcom_vaadin_client_gwt_com_google_web_bindery_event_shared_SimpleEventBus_2_classLit = createForClass('com.vaadin.client.gwt.com.google.web.bindery.event.shared', 'SimpleEventBus', 93);
var Lcom_vaadin_client_gwt_com_google_web_bindery_event_shared_SimpleEventBus$Command_2_classLit = createForInterface('com.vaadin.client.gwt.com.google.web.bindery.event.shared', 'SimpleEventBus/Command');
function $removeHandler(this$static){
  $doRemove(this$static.$$outer_0, this$static.type_1, this$static.source_2, this$static.handler_3);
}

function SimpleEventBus$lambda$0$Type($$outer_0, type_1, handler_3){
  this.$$outer_0 = $$outer_0;
  this.type_1 = type_1;
  this.source_2 = null;
  this.handler_3 = handler_3;
}

defineClass(252, 1, {}, SimpleEventBus$lambda$0$Type);
var Lcom_vaadin_client_gwt_com_google_web_bindery_event_shared_SimpleEventBus$lambda$0$Type_2_classLit = createForClass('com.vaadin.client.gwt.com.google.web.bindery.event.shared', 'SimpleEventBus/lambda$0$Type', 252);
function SimpleEventBus$lambda$1$Type($$outer_0, type_1, handler_3){
  this.$$outer_0 = $$outer_0;
  this.type_1 = type_1;
  this.source_2 = null;
  this.handler_3 = handler_3;
}

defineClass(253, 1, {280:1}, SimpleEventBus$lambda$1$Type);
_.execute_0 = function execute_25(){
  $doAddNow(this.$$outer_0, this.type_1, this.source_2, this.handler_3);
}
;
var Lcom_vaadin_client_gwt_com_google_web_bindery_event_shared_SimpleEventBus$lambda$1$Type_2_classLit = createForClass('com.vaadin.client.gwt.com.google.web.bindery.event.shared', 'SimpleEventBus/lambda$1$Type', 253);
function SimpleEventBus$lambda$2$Type($$outer_0, type_1, source_2, handler_3){
  this.$$outer_0 = $$outer_0;
  this.type_1 = type_1;
  this.source_2 = source_2;
  this.handler_3 = handler_3;
}

defineClass(254, 1, {280:1}, SimpleEventBus$lambda$2$Type);
_.execute_0 = function execute_26(){
  $doRemoveNow(this.$$outer_0, this.type_1, this.source_2, this.handler_3);
}
;
var Lcom_vaadin_client_gwt_com_google_web_bindery_event_shared_SimpleEventBus$lambda$2$Type_2_classLit = createForClass('com.vaadin.client.gwt.com.google.web.bindery.event.shared', 'SimpleEventBus/lambda$2$Type', 254);
function post(url_0, requestData, contentType, callback){
  return request_0(new $wnd.XMLHttpRequest, url_0, requestData, contentType, callback);
}

function request_0(xhr, url_0, requestData, contentType, callback){
  var e;
  try {
    $setOnReadyStateChange(xhr, new Xhr$Handler(callback));
    xhr.open('POST', url_0, true);
    xhr.setRequestHeader('Content-type', contentType);
    xhr.withCredentials = true;
    xhr.send(requestData);
  }
   catch ($e0) {
    $e0 = toJava($e0);
    if (instanceOf($e0, 28)) {
      e = $e0;
      shouldLogToBrowserConsole && $error($wnd.console, e);
      callback.onFail(xhr, e);
      $clearOnReadyStateChange(xhr);
    }
     else 
      throw toJs($e0);
  }
  return xhr;
}

function Xhr$Handler(callback){
  this.callback = callback;
}

defineClass(186, 1, {}, Xhr$Handler);
_.onReadyStateChange = function onReadyStateChange(xhr){
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      this.callback.onSuccess(xhr);
      $clearOnReadyStateChange(xhr);
      return;
    }
    this.callback.onFail(xhr, null);
    $clearOnReadyStateChange(xhr);
  }
}
;
var Lcom_vaadin_client_gwt_elemental_js_util_Xhr$Handler_2_classLit = createForClass('com.vaadin.client.gwt.elemental.js.util', 'Xhr/Handler', 186);
function $isEs5AdapterNeeded(this$static){
  if (this$static.os == 4 && this$static.osMajorVersion == 10) {
    return true;
  }
  if (this$static.isSafari && this$static.browserMajorVersion == 10) {
    return true;
  }
  return false;
}

function $isEs6Supported(this$static){
  if ($isEs5AdapterNeeded(this$static)) {
    return false;
  }
  if (this$static.isWebKit && this$static.browserEngineVersion >= 604) {
    return true;
  }
  if (this$static.isSafari && this$static.browserMajorVersion >= 10) {
    return true;
  }
  if (this$static.isFirefox && this$static.browserMajorVersion >= 51) {
    return true;
  }
  if (this$static.isOpera && this$static.browserMajorVersion >= 36) {
    return true;
  }
  if (this$static.isChrome && this$static.browserMajorVersion >= 49) {
    return true;
  }
  if (this$static.isEdge && (this$static.browserMajorVersion > 15 || this$static.browserMajorVersion == 15 && this$static.browserMinorVersion >= 15063)) {
    return true;
  }
  return false;
}

function $isSafariOrIOS(this$static){
  return this$static.isSafari || this$static.os == 4;
}

function $parseAndroidVersion(this$static, userAgent){
  var osVersionString, parts;
  if (userAgent.indexOf('android') == -1) {
    return;
  }
  osVersionString = safeSubstring(userAgent, userAgent.indexOf('android ') + 8, userAgent.length);
  osVersionString = safeSubstring(osVersionString, 0, osVersionString.indexOf(';'));
  parts = $split(osVersionString, '\\.', 0);
  $parseOsVersion(this$static, parts);
}

function $parseChromeOSVersion(this$static, userAgent){
  var cur, end, osVersionString, parts, start_0;
  start_0 = userAgent.indexOf('; cros ');
  if (start_0 == -1) {
    return;
  }
  end = $indexOf_0(userAgent, fromCodePoint(41), start_0);
  if (end == -1) {
    return;
  }
  cur = end;
  while (cur >= start_0 && (checkCriticalStringElementIndex(cur, userAgent.length) , userAgent.charCodeAt(cur) != 32)) {
    --cur;
  }
  if (cur == start_0) {
    return;
  }
  osVersionString = userAgent.substr(cur + 1, end - (cur + 1));
  parts = $split(osVersionString, '\\.', 0);
  $parseChromeOsVersionParts(this$static, parts);
}

function $parseChromeOsVersionParts(this$static, parts){
  this$static.osMajorVersion = -1;
  if (parts.length > 2) {
    this$static.osMajorVersion = $parseVersionPart(parts[0], 'OS major');
    $parseVersionPart(parts[1], 'OS minor');
  }
}

function $parseChromeVersion(this$static, userAgent){
  var i_0;
  i_0 = userAgent.indexOf(' crios/');
  if (i_0 == -1) {
    i_0 = userAgent.indexOf(' chrome/');
    i_0 == -1?(i_0 = userAgent.indexOf(' headlesschrome/') + 16):(i_0 += 8);
    $parseVersionString(this$static, safeSubstring(userAgent, i_0, i_0 + 5));
  }
   else {
    i_0 += 7;
    $parseVersionString(this$static, safeSubstring(userAgent, i_0, i_0 + 6));
  }
}

function $parseIOSVersion(this$static, userAgent){
  var osVersionString, parts;
  if (userAgent.indexOf('os ') == -1 || userAgent.indexOf(' like mac') == -1) {
    return;
  }
  osVersionString = safeSubstring(userAgent, userAgent.indexOf('os ') + 3, userAgent.indexOf(' like mac'));
  parts = $split(osVersionString, '_', 0);
  $parseOsVersion(this$static, parts);
}

function $parseOsVersion(this$static, parts){
  var dashIndex, dashlessVersion;
  this$static.osMajorVersion = -1;
  parts.length >= 1 && (this$static.osMajorVersion = $parseVersionPart(parts[0], 'OS major'));
  if (parts.length >= 2) {
    dashIndex = $indexOf(parts[1], fromCodePoint(45));
    if (dashIndex > -1) {
      dashlessVersion = parts[1].substr(0, dashIndex - 0);
      $parseVersionPart(dashlessVersion, 'OS minor');
    }
     else {
      $parseVersionPart(parts[1], 'OS minor');
    }
  }
}

function $parseVersionPart(versionString, partName){
  var e;
  try {
    return __parseAndValidateInt(versionString);
  }
   catch ($e0) {
    $e0 = toJava($e0);
    if (instanceOf($e0, 7)) {
      e = $e0;
      $clinit_System();
      partName + ' version parsing failed for: ' + versionString + ' ' + e.getMessage();
    }
     else 
      throw toJs($e0);
  }
  return -1;
}

function $parseVersionString(this$static, versionString){
  var idx, idx2, majorVersionPart, minorVersionPart;
  idx = $indexOf(versionString, fromCodePoint(46));
  idx < 0 && (idx = versionString.length);
  majorVersionPart = safeSubstring(versionString, 0, idx);
  this$static.browserMajorVersion = $parseVersionPart(majorVersionPart, 'Browser major');
  idx2 = $indexOf_0(versionString, fromCodePoint(46), idx + 1);
  idx2 < 0 && (idx2 = versionString.length);
  minorVersionPart = $replaceAll(safeSubstring(versionString, idx + 1, idx2), '[^0-9].*', '');
  this$static.browserMinorVersion = $parseVersionPart(minorVersionPart, 'Browser minor');
}

function BrowserDetails(userAgent){
  var e, engineVersion, i_0, ieVersionString, rvPos, tmp;
  userAgent = userAgent.toLowerCase();
  this.isGecko = userAgent.indexOf('gecko') != -1 && userAgent.indexOf('webkit') == -1 && userAgent.indexOf('trident/') == -1;
  userAgent.indexOf(' presto/') != -1;
  this.isTrident = userAgent.indexOf('trident/') != -1;
  this.isWebKit = !this.isTrident && userAgent.indexOf('applewebkit') != -1;
  this.isChrome = userAgent.indexOf(' chrome/') != -1 || userAgent.indexOf(' crios/') != -1 || userAgent.indexOf(' headlesschrome/') != -1;
  this.isOpera = userAgent.indexOf('opera') != -1;
  this.isIE = userAgent.indexOf('msie') != -1 && !this.isOpera && userAgent.indexOf('webtv') == -1;
  this.isIE = this.isIE || this.isTrident;
  this.isSafari = !this.isChrome && !this.isIE && userAgent.indexOf('safari') != -1;
  this.isFirefox = userAgent.indexOf(' firefox/') != -1;
  if (userAgent.indexOf(' edge/') != -1) {
    this.isEdge = true;
    this.isChrome = false;
    this.isOpera = false;
    this.isIE = false;
    this.isSafari = false;
    this.isFirefox = false;
    this.isWebKit = false;
    this.isGecko = false;
  }
  try {
    if (this.isGecko) {
      rvPos = userAgent.indexOf('rv:');
      if (rvPos >= 0) {
        tmp = userAgent.substr(rvPos + 3);
        tmp = $replaceFirst(tmp, '(\\.[0-9]+).+', '$1');
        this.browserEngineVersion = parseFloat_0(tmp);
      }
    }
     else if (this.isWebKit) {
      tmp = $substring(userAgent, userAgent.indexOf('webkit/') + 7);
      tmp = $replaceFirst(tmp, '([0-9]+\\.[0-9]+).*', '$1');
      this.browserEngineVersion = parseFloat_0(tmp);
    }
     else if (this.isTrident) {
      tmp = $substring(userAgent, userAgent.indexOf('trident/') + 8);
      tmp = $replaceFirst(tmp, '([0-9]+\\.[0-9]+).*', '$1');
      this.browserEngineVersion = parseFloat_0(tmp);
      this.browserEngineVersion > 7 && (this.browserEngineVersion = 7);
    }
     else 
      this.isEdge && (this.browserEngineVersion = 0);
  }
   catch ($e0) {
    $e0 = toJava($e0);
    if (instanceOf($e0, 7)) {
      e = $e0;
      $clinit_System();
      'Browser engine version parsing failed for: ' + userAgent + ' ' + e.getMessage();
    }
     else 
      throw toJs($e0);
  }
  try {
    if (this.isIE) {
      if (userAgent.indexOf('msie') != -1) {
        if (this.isTrident) {
          this.browserMajorVersion = 4 + round_int(this.browserEngineVersion);
          this.browserMinorVersion = 0;
        }
         else {
          ieVersionString = $substring(userAgent, userAgent.indexOf('msie ') + 5);
          ieVersionString = safeSubstring(ieVersionString, 0, $indexOf(ieVersionString, fromCodePoint(59)));
          $parseVersionString(this, ieVersionString);
        }
      }
       else {
        rvPos = userAgent.indexOf('rv:');
        if (rvPos >= 0) {
          tmp = userAgent.substr(rvPos + 3);
          tmp = $replaceFirst(tmp, '(\\.[0-9]+).+', '$1');
          $parseVersionString(this, tmp);
        }
      }
    }
     else if (this.isFirefox) {
      i_0 = userAgent.indexOf(' firefox/') + 9;
      $parseVersionString(this, safeSubstring(userAgent, i_0, i_0 + 5));
    }
     else if (this.isChrome) {
      $parseChromeVersion(this, userAgent);
    }
     else if (this.isSafari) {
      i_0 = userAgent.indexOf(' version/');
      if (i_0 >= 0) {
        i_0 += 9;
        $parseVersionString(this, safeSubstring(userAgent, i_0, i_0 + 5));
      }
       else {
        engineVersion = round_int(this.browserEngineVersion * 10);
        if (engineVersion >= 6010 && engineVersion < 6015) {
          this.browserMajorVersion = 9;
          this.browserMinorVersion = 0;
        }
         else if (engineVersion >= 6015) {
          this.browserMajorVersion = 9;
          this.browserMinorVersion = 1;
        }
      }
    }
     else if (this.isOpera) {
      i_0 = userAgent.indexOf(' version/');
      i_0 != -1?(i_0 += 9):(i_0 = userAgent.indexOf('opera/') + 6);
      $parseVersionString(this, safeSubstring(userAgent, i_0, i_0 + 5));
    }
     else if (this.isEdge) {
      i_0 = userAgent.indexOf(' edge/') + 6;
      $parseVersionString(this, safeSubstring(userAgent, i_0, i_0 + 8));
    }
  }
   catch ($e1) {
    $e1 = toJava($e1);
    if (instanceOf($e1, 7)) {
      e = $e1;
      $clinit_System();
      'Browser version parsing failed for: ' + userAgent + ' ' + e.getMessage();
    }
     else 
      throw toJs($e1);
  }
  if (userAgent.indexOf('windows ') != -1) {
    this.os = 1;
    userAgent.indexOf('windows phone') != -1;
  }
   else if (userAgent.indexOf('android') != -1) {
    this.os = 5;
    $parseAndroidVersion(this, userAgent);
  }
   else if (userAgent.indexOf('linux') != -1) {
    this.os = 3;
  }
   else if (userAgent.indexOf('macintosh') != -1 || userAgent.indexOf('mac osx') != -1 || userAgent.indexOf('mac os x') != -1) {
    this.isIPad = userAgent.indexOf('ipad') != -1;
    this.isIPhone = userAgent.indexOf('iphone') != -1;
    if (this.isIPad || userAgent.indexOf('ipod') != -1 || this.isIPhone) {
      this.os = 4;
      $parseIOSVersion(this, userAgent);
    }
     else {
      this.os = 2;
    }
  }
   else if (userAgent.indexOf('; cros ') != -1) {
    this.os = 6;
    $parseChromeOSVersion(this, userAgent);
  }
}

function safeSubstring(string, beginIndex, endIndex){
  var trimmedEnd, trimmedStart;
  beginIndex < 0?(trimmedStart = 0):(trimmedStart = beginIndex);
  endIndex < 0 || endIndex > string.length?(trimmedEnd = string.length):(trimmedEnd = endIndex);
  return string.substr(trimmedStart, trimmedEnd - trimmedStart);
}

defineClass(211, 1, $intern_0, BrowserDetails);
_.browserEngineVersion = -1;
_.browserMajorVersion = -1;
_.browserMinorVersion = -1;
_.isChrome = false;
_.isEdge = false;
_.isFirefox = false;
_.isGecko = false;
_.isIE = false;
_.isIPad = false;
_.isIPhone = false;
_.isOpera = false;
_.isSafari = false;
_.isTrident = false;
_.isWebKit = false;
_.os = 0;
_.osMajorVersion = -1;
var Lcom_vaadin_flow_shared_BrowserDetails_2_classLit = createForClass('com.vaadin.flow.shared', 'BrowserDetails', 211);
function $clinit_Dependency$Type(){
  $clinit_Dependency$Type = emptyMethod;
  STYLESHEET = new Dependency$Type('STYLESHEET', 0);
  JAVASCRIPT = new Dependency$Type('JAVASCRIPT', 1);
  JS_MODULE = new Dependency$Type('JS_MODULE', 2);
  HTML_IMPORT = new Dependency$Type('HTML_IMPORT', 3);
}

function Dependency$Type(enum$name, enum$ordinal){
  Enum.call(this, enum$name, enum$ordinal);
}

function values_3(){
  $clinit_Dependency$Type();
  return stampJavaTypeInfo(getClassLiteralForArray(Lcom_vaadin_flow_shared_ui_Dependency$Type_2_classLit, 1), $intern_0, 47, 0, [STYLESHEET, JAVASCRIPT, JS_MODULE, HTML_IMPORT]);
}

defineClass(47, 55, $intern_11, Dependency$Type);
var HTML_IMPORT, JAVASCRIPT, JS_MODULE, STYLESHEET;
var Lcom_vaadin_flow_shared_ui_Dependency$Type_2_classLit = createForEnum('com.vaadin.flow.shared.ui', 'Dependency/Type', 47, values_3);
function $clinit_Dependency$Type$Map(){
  $clinit_Dependency$Type$Map = emptyMethod;
  $MAP = createValueOfMap(($clinit_Dependency$Type() , stampJavaTypeInfo(getClassLiteralForArray(Lcom_vaadin_flow_shared_ui_Dependency$Type_2_classLit, 1), $intern_0, 47, 0, [STYLESHEET, JAVASCRIPT, JS_MODULE, HTML_IMPORT])));
}

var $MAP;
function $clinit_LoadMode(){
  $clinit_LoadMode = emptyMethod;
  INLINE = new LoadMode('INLINE', 0);
  EAGER = new LoadMode('EAGER', 1);
  LAZY = new LoadMode('LAZY', 2);
}

function LoadMode(enum$name, enum$ordinal){
  Enum.call(this, enum$name, enum$ordinal);
}

function values_4(){
  $clinit_LoadMode();
  return stampJavaTypeInfo(getClassLiteralForArray(Lcom_vaadin_flow_shared_ui_LoadMode_2_classLit, 1), $intern_0, 58, 0, [INLINE, EAGER, LAZY]);
}

defineClass(58, 55, $intern_11, LoadMode);
var EAGER, INLINE, LAZY;
var Lcom_vaadin_flow_shared_ui_LoadMode_2_classLit = createForEnum('com.vaadin.flow.shared.ui', 'LoadMode', 58, values_4);
function addGetParameters(uri_0, extraParams){
  var fragment, hashPosition;
  if (extraParams.length == 0) {
    return uri_0;
  }
  fragment = null;
  hashPosition = $indexOf(uri_0, fromCodePoint(35));
  if (hashPosition != -1) {
    fragment = uri_0.substr(hashPosition);
    uri_0 = uri_0.substr(0, hashPosition);
  }
  uri_0.indexOf('?') != -1?(uri_0 += '&'):(uri_0 += '?');
  uri_0 += extraParams;
  fragment != null && (uri_0 += '' + fragment);
  return uri_0;
}

function $addEventListener(this$static, type_0, listener, useCapture){
  var handler = getHandlerFor(listener);
  this$static.addEventListener(type_0, handler, useCapture);
  return new JsElementalMixinBase$Remover(this$static, type_0, handler, useCapture);
}

function createHandler(listener){
  var handler = listener.handler;
  if (!handler) {
    handler = $entry(function(event_0){
      handleEvent_9(listener, event_0);
    }
    );
    handler.listener = listener;
    listener.handler = handler;
  }
  return handler;
}

function getHandlerFor(listener){
  return !listener?null:createHandler(listener);
}

function handleEvent_9(listener, event_0){
  hasJavaObjectVirtualDispatch(listener)?listener.handleEvent_0(event_0):(listener.handleEvent(event_0) , undefined);
}

function removeEventListener_0(target, type_0, handler, useCapture){
  target.removeEventListener(type_0, handler, useCapture);
}

function $setProperty(this$static, propertyName, value_0){
  this$static.setProperty(propertyName, value_0);
}

function $addEventListener_0(this$static, type_0, listener, useCapture){
  return $addEventListener(this$static, type_0, listener, useCapture);
}

function $appendChild(this$static, newChild){
  return this$static.appendChild(newChild);
}

function $removeChild(this$static, oldChild){
  return this$static.removeChild(oldChild);
}

function $setTextContent(this$static, param_textContent){
  this$static.textContent = param_textContent;
}

function $setData(this$static, param_data){
  this$static.data = param_data;
}

function $createElement(this$static, tagName){
  return this$static.createElement(tagName);
}

function JsElementalMixinBase$Remover(target, type_0, handler, useCapture){
  this.target_0 = target;
  this.type_0 = type_0;
  this.handler_0 = handler;
  this.useCapture = useCapture;
}

defineClass(102, 1, $intern_13, JsElementalMixinBase$Remover);
_.remove_1 = function remove_3(){
  removeEventListener_0(this.target_0, this.type_0, this.handler_0, this.useCapture);
}
;
_.useCapture = false;
var Lelemental_js_dom_JsElementalMixinBase$Remover_2_classLit = createForClass('elemental.js.dom', 'JsElementalMixinBase/Remover', 102);
function $debug(this$static, arg){
  this$static.debug(arg);
}

function $error(this$static, arg){
  this$static.error(arg);
}

function $log(this$static, arg){
  this$static.log(arg);
}

function $warn(this$static, arg){
  this$static.warn(arg);
}

function $pushState(this$static, data_0, title_0, url_0){
  this$static.pushState(data_0, title_0, url_0);
}

function $replaceState(this$static, data_0, title_0, url_0){
  this$static.replaceState(data_0, title_0, url_0);
}

function $replace(this$static, url_0){
  this$static.replace(url_0);
}

function $getItem(this$static, key){
  return this$static.getItem(key);
}

function $setItem(this$static, key, data_0){
  this$static.setItem(key, data_0);
}

function $clearInterval(this$static, handle){
  this$static.clearInterval(handle);
}

function $clearTimeout(this$static, handle){
  this$static.clearTimeout(handle);
}

function $setInterval_1(this$static, handler, timeout){
  return this$static.setInterval($entry(handler.onTimeoutHandler).bind(handler), timeout);
}

function $setOnpopstate(this$static, listener){
  this$static.onpopstate = getHandlerFor(listener);
}

function $setTimeout(this$static, handler, timeout){
  return this$static.setTimeout($entry(handler.onTimeoutHandler).bind(handler), timeout);
}

function $asNumber(this$static){
  if (this$static == null) {
    return 0;
  }
  return +this$static;
}

function $getType(this$static){
  var jsType;
  if (this$static === null) {
    return 5;
  }
  jsType = typeof this$static;
  if ($equals_0('string', jsType)) {
    return 2;
  }
   else if ($equals_0('number', jsType)) {
    return 3;
  }
   else if ($equals_0('boolean', jsType)) {
    return 4;
  }
   else if ($equals_0('object', jsType)) {
    return Object.prototype.toString.apply(this$static) === '[object Array]'?1:0;
  }
  debugger;
  throw toJs(new AssertionError_0('Unknown Json Type'));
}

function $toJson(this$static){
  return $wnd.JSON.stringify(this$static, function(keyName, value_0){
    if (keyName == '$H') {
      return undefined;
    }
    return value_0;
  }
  , 0);
}

function $valueProd(this$static){
  return this$static && this$static.valueOf();
}

function $parse_0(jsonString){
  var value_0;
  try {
    return value_0 = $wnd.JSON.parse(jsonString) , value_0;
  }
   catch ($e0) {
    $e0 = toJava($e0);
    if (instanceOf($e0, 7)) {
      throw toJs(new JsonException("Can't parse " + jsonString));
    }
     else 
      throw toJs($e0);
  }
}

function $valueProd_0(this$static){
  return this$static && this$static.valueOf();
}

function createProd(number){
  return Object(number);
}

function $hasKey(this$static, key){
  return key in this$static;
}

function $keys0(this$static){
  var keys_0 = [];
  for (var key in this$static) {
    Object.prototype.hasOwnProperty.call(this$static, key) && key != '$H' && keys_0.push(key);
  }
  return keys_0;
}

function request_1(xhr, url_0){
  try {
    $setOnReadyStateChange(xhr, new Xhr$Handler_0);
    xhr.open('GET', url_0, true);
    xhr.send(null);
  }
   catch ($e0) {
    $e0 = toJava($e0);
    if (instanceOf($e0, 28)) {
      $error($wnd.console, 'Error calling server initialisation status:' + xhr.status + ' response:' + xhr.responseText);
      $clearOnReadyStateChange(xhr);
    }
     else 
      throw toJs($e0);
  }
}

function Xhr$Handler_0(){
}

defineClass(101, 1, {}, Xhr$Handler_0);
_.onReadyStateChange = function onReadyStateChange_0(xhr){
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      $onSuccess(xhr);
      $clearOnReadyStateChange(xhr);
      return;
    }
    $error($wnd.console, 'Error calling server initialisation status:' + xhr.status + ' response:' + xhr.responseText);
    $clearOnReadyStateChange(xhr);
  }
}
;
var Lelemental_js_util_Xhr$Handler_2_classLit = createForClass('elemental.js.util', 'Xhr/Handler', 101);
function JsonException(s){
  RuntimeException.call(this, s);
}

defineClass(122, 20, $intern_1, JsonException);
var Lelemental_json_JsonException_2_classLit = createForClass('elemental.json', 'JsonException', 122);
function Timer$1(this$0){
  this.this$01 = this$0;
}

defineClass(277, 1, {}, Timer$1);
_.onTimeoutHandler = function onTimeoutHandler(){
  $run(this.this$01);
}
;
var Lelemental_util_Timer$1_2_classLit = createForClass('elemental.util', 'Timer/1', 277);
function Timer$2(this$0){
  this.this$01 = this$0;
}

defineClass(278, 1, {}, Timer$2);
_.onTimeoutHandler = function onTimeoutHandler_0(){
  $accept(this.this$01.this$01.lastCommand, 'intermediate');
}
;
var Lelemental_util_Timer$2_2_classLit = createForClass('elemental.util', 'Timer/2', 278);
defineClass(294, 1, {});
var Ljava_io_OutputStream_2_classLit = createForClass('java.io', 'OutputStream', 294);
defineClass(295, 294, {});
var Ljava_io_FilterOutputStream_2_classLit = createForClass('java.io', 'FilterOutputStream', 295);
function PrintStream(){
}

defineClass(112, 295, {}, PrintStream);
var Ljava_io_PrintStream_2_classLit = createForClass('java.io', 'PrintStream', 112);
function AbstractStringBuilder(string){
  this.string = string;
}

defineClass(74, 1, {96:1});
_.toString_0 = function toString_6(){
  return this.string;
}
;
var Ljava_lang_AbstractStringBuilder_2_classLit = createForClass('java.lang', 'AbstractStringBuilder', 74);
function Error_0(message, cause){
  $$init(this);
  this.cause = cause;
  this.detailMessage = message;
  $fillInStackTrace(this);
  this.initializeBackingError();
}

defineClass(72, 5, {4:1, 5:1});
var Ljava_lang_Error_2_classLit = createForClass('java.lang', 'Error', 72);
function AssertionError(){
  Throwable.call(this);
}

function AssertionError_0(message){
  Error_0.call(this, message == null?'null':toString_2(message), instanceOf(message, 5)?castTo(message, 5):null);
}

defineClass(3, 72, {4:1, 3:1, 5:1}, AssertionError, AssertionError_0);
var Ljava_lang_AssertionError_2_classLit = createForClass('java.lang', 'AssertionError', 3);
function $clinit_Boolean(){
  $clinit_Boolean = emptyMethod;
  FALSE = false;
  TRUE = true;
}

function $booleanValue(this$static){
  return checkCriticalNotNull(this$static) , this$static;
}

function $equals(this$static, o){
  return checkCriticalNotNull(this$static) , this$static === o;
}

function $toString_0(this$static){
  return '' + (checkCriticalNotNull(this$static) , this$static);
}

booleanCastMap = {4:1, 103:1, 30:1};
var FALSE, TRUE;
var Ljava_lang_Boolean_2_classLit = createForClass('java.lang', 'Boolean', 103);
function digit(c){
  if (c >= 48 && c < 48 + $wnd.Math.min(10, 10)) {
    return c - 48;
  }
  if (c >= 97 && c < 97) {
    return c - 97 + 10;
  }
  if (c >= 65 && c < 65) {
    return c - 65 + 10;
  }
  return -1;
}

function ClassCastException(){
  RuntimeException.call(this, null);
}

defineClass(105, 20, $intern_1, ClassCastException);
var Ljava_lang_ClassCastException_2_classLit = createForClass('java.lang', 'ClassCastException', 105);
function __parseAndValidateDouble(s){
  floatRegex == null && (floatRegex = new RegExp('^\\s*[+-]?(NaN|Infinity|((\\d+\\.?\\d*)|(\\.\\d+))([eE][+-]?\\d+)?[dDfF]?)\\s*$'));
  if (!floatRegex.test(s)) {
    throw toJs(new NumberFormatException('For input string: "' + s + '"'));
  }
  return parseFloat(s);
}

function __parseAndValidateInt(s){
  var i_0, isTooLow, length_0, startIndex, toReturn;
  if (s == null) {
    throw toJs(new NumberFormatException('null'));
  }
  length_0 = s.length;
  startIndex = length_0 > 0 && (checkCriticalStringElementIndex(0, s.length) , s.charCodeAt(0) == 45 || (checkCriticalStringElementIndex(0, s.length) , s.charCodeAt(0) == 43))?1:0;
  for (i_0 = startIndex; i_0 < length_0; i_0++) {
    if (digit((checkCriticalStringElementIndex(i_0, s.length) , s.charCodeAt(i_0))) == -1) {
      throw toJs(new NumberFormatException('For input string: "' + s + '"'));
    }
  }
  toReturn = parseInt(s, 10);
  isTooLow = toReturn < -2147483648;
  if (isNaN(toReturn)) {
    throw toJs(new NumberFormatException('For input string: "' + s + '"'));
  }
   else if (isTooLow || toReturn > 2147483647) {
    throw toJs(new NumberFormatException('For input string: "' + s + '"'));
  }
  return toReturn;
}

defineClass(291, 1, $intern_0);
var floatRegex;
var Ljava_lang_Number_2_classLit = createForClass('java.lang', 'Number', 291);
function $doubleValue(this$static){
  return checkCriticalNotNull(this$static) , this$static;
}

function $intValue(this$static){
  return round_int((checkCriticalNotNull(this$static) , this$static));
}

doubleCastMap = {4:1, 30:1, 104:1};
var Ljava_lang_Double_2_classLit = createForClass('java.lang', 'Double', 104);
function parseFloat_0(s){
  var doubleValue;
  doubleValue = __parseAndValidateDouble(s);
  if (doubleValue > 3.4028234663852886E38) {
    return Infinity;
  }
   else if (doubleValue < -3.4028234663852886E38) {
    return -Infinity;
  }
  return doubleValue;
}

function IllegalArgumentException(message){
  RuntimeException.call(this, message);
}

defineClass(15, 20, $intern_1, IllegalArgumentException);
var Ljava_lang_IllegalArgumentException_2_classLit = createForClass('java.lang', 'IllegalArgumentException', 15);
function IllegalStateException(s){
  RuntimeException.call(this, s);
}

defineClass(42, 20, $intern_1, IllegalStateException);
var Ljava_lang_IllegalStateException_2_classLit = createForClass('java.lang', 'IllegalStateException', 42);
defineClass(110, 20, $intern_1);
var Ljava_lang_IndexOutOfBoundsException_2_classLit = createForClass('java.lang', 'IndexOutOfBoundsException', 110);
function Integer(value_0){
  this.value_0 = value_0;
}

function valueOf_0(i_0){
  var rebase, result;
  if (i_0 > -129 && i_0 < 128) {
    rebase = i_0 + 128;
    result = ($clinit_Integer$BoxedValues() , boxedValues)[rebase];
    !result && (result = boxedValues[rebase] = new Integer(i_0));
    return result;
  }
  return new Integer(i_0);
}

defineClass(31, 291, {4:1, 30:1, 31:1}, Integer);
_.equals_0 = function equals_1(o){
  return instanceOf(o, 31) && castTo(o, 31).value_0 == this.value_0;
}
;
_.hashCode_0 = function hashCode_3(){
  return this.value_0;
}
;
_.toString_0 = function toString_8(){
  return '' + this.value_0;
}
;
_.value_0 = 0;
var Ljava_lang_Integer_2_classLit = createForClass('java.lang', 'Integer', 31);
function $clinit_Integer$BoxedValues(){
  $clinit_Integer$BoxedValues = emptyMethod;
  boxedValues = initUnidimensionalArray(Ljava_lang_Integer_2_classLit, $intern_0, 31, 256, 0, 1);
}

var boxedValues;
defineClass(442, 1, {});
function NullPointerException(){
  Throwable.call(this);
}

function NullPointerException_0(typeError){
  JsException.call(this, typeError);
}

function NullPointerException_1(message){
  RuntimeException.call(this, message);
}

defineClass(60, 50, $intern_1, NullPointerException, NullPointerException_0, NullPointerException_1);
_.createError = function createError_0(msg){
  return new TypeError(msg);
}
;
var Ljava_lang_NullPointerException_2_classLit = createForClass('java.lang', 'NullPointerException', 60);
function NumberFormatException(message){
  IllegalArgumentException.call(this, message);
}

defineClass(51, 15, $intern_1, NumberFormatException);
var Ljava_lang_NumberFormatException_2_classLit = createForClass('java.lang', 'NumberFormatException', 51);
function StackTraceElement(methodName, fileName, lineNumber){
  if (methodName == null) {
    debugger;
    throw toJs(new AssertionError);
  }
  this.className_0 = 'Unknown';
  this.methodName = methodName;
  this.fileName = fileName;
  this.lineNumber = lineNumber;
}

defineClass(26, 1, {4:1, 26:1}, StackTraceElement);
_.equals_0 = function equals_2(other){
  var st;
  if (instanceOf(other, 26)) {
    st = castTo(other, 26);
    return this.lineNumber == st.lineNumber && this.methodName == st.methodName && this.className_0 == st.className_0 && this.fileName == st.fileName;
  }
  return false;
}
;
_.hashCode_0 = function hashCode_4(){
  return hashCode_5(stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_0, 1, 5, [valueOf_0(this.lineNumber), this.className_0, this.methodName, this.fileName]));
}
;
_.toString_0 = function toString_9(){
  return this.className_0 + '.' + this.methodName + '(' + (this.fileName != null?this.fileName:'Unknown Source') + (this.lineNumber >= 0?':' + this.lineNumber:'') + ')';
}
;
_.lineNumber = 0;
var Ljava_lang_StackTraceElement_2_classLit = createForClass('java.lang', 'StackTraceElement', 26);
function $charAt(this$static, index_0){
  checkCriticalStringElementIndex(index_0, this$static.length);
  return this$static.charCodeAt(index_0);
}

function $equals_0(this$static, other){
  return checkCriticalNotNull(this$static) , this$static === other;
}

function $equalsIgnoreCase(this$static, other){
  checkCriticalNotNull(this$static);
  if (other == null) {
    return false;
  }
  if ($equals_0(this$static, other)) {
    return true;
  }
  return this$static.length == other.length && $equals_0(this$static.toLowerCase(), other.toLowerCase());
}

function $indexOf(this$static, str){
  return this$static.indexOf(str);
}

function $indexOf_0(this$static, str, startIndex){
  return this$static.indexOf(str, startIndex);
}

function $lastIndexOf(this$static, str){
  return this$static.lastIndexOf(str);
}

function $lastIndexOf_0(this$static, str, start_0){
  return this$static.lastIndexOf(str, start_0);
}

function $replace_0(this$static, to){
  var replacement;
  replacement = $replaceAll($replaceAll(to, '\\\\', '\\\\\\\\'), '\\$', '\\\\$');
  return $replaceAll(this$static, '\\{0\\}', replacement);
}

function $replaceAll(this$static, regex, replace){
  replace = translateReplaceString(replace);
  return this$static.replace(new RegExp(regex, 'g'), replace);
}

function $replaceFirst(this$static, regex, replace){
  var jsRegEx;
  replace = translateReplaceString(replace);
  jsRegEx = new RegExp(regex);
  return this$static.replace(jsRegEx, replace);
}

function $split(this$static, regex, maxMatch){
  var compiled, count, lastNonEmpty, lastTrail, matchIndex, matchObj, out, trail;
  compiled = new RegExp(regex, 'g');
  out = initUnidimensionalArray(Ljava_lang_String_2_classLit, $intern_0, 2, 0, 6, 1);
  count = 0;
  trail = this$static;
  lastTrail = null;
  while (true) {
    matchObj = compiled.exec(trail);
    if (matchObj == null || trail == '' || count == maxMatch - 1 && maxMatch > 0) {
      out[count] = trail;
      break;
    }
     else {
      matchIndex = matchObj.index;
      out[count] = trail.substr(0, matchIndex);
      trail = $substring_0(trail, matchIndex + matchObj[0].length, trail.length);
      compiled.lastIndex = 0;
      if (lastTrail == trail) {
        out[count] = trail.substr(0, 1);
        trail = trail.substr(1);
      }
      lastTrail = trail;
      ++count;
    }
  }
  if (maxMatch == 0 && this$static.length > 0) {
    lastNonEmpty = out.length;
    while (lastNonEmpty > 0 && out[lastNonEmpty - 1] == '') {
      --lastNonEmpty;
    }
    lastNonEmpty < out.length && (out.length = lastNonEmpty);
  }
  return out;
}

function $substring(this$static, beginIndex){
  return this$static.substr(beginIndex);
}

function $substring_0(this$static, beginIndex, endIndex){
  return this$static.substr(beginIndex, endIndex - beginIndex);
}

function $trim(this$static){
  var end, length_0, start_0;
  length_0 = this$static.length;
  start_0 = 0;
  while (start_0 < length_0 && (checkCriticalStringElementIndex(start_0, this$static.length) , this$static.charCodeAt(start_0) <= 32)) {
    ++start_0;
  }
  end = length_0;
  while (end > start_0 && (checkCriticalStringElementIndex(end - 1, this$static.length) , this$static.charCodeAt(end - 1) <= 32)) {
    --end;
  }
  return start_0 > 0 || end < length_0?this$static.substr(start_0, end - start_0):this$static;
}

function fromCodePoint(codePoint){
  var hiSurrogate, loSurrogate;
  if (codePoint >= 65536) {
    hiSurrogate = 55296 + (codePoint - 65536 >> 10 & 1023) & 65535;
    loSurrogate = 56320 + (codePoint - 65536 & 1023) & 65535;
    return String.fromCharCode(hiSurrogate) + ('' + String.fromCharCode(loSurrogate));
  }
   else {
    return String.fromCharCode(codePoint & 65535);
  }
}

function translateReplaceString(replaceStr){
  var pos;
  pos = 0;
  while (0 <= (pos = replaceStr.indexOf('\\', pos))) {
    checkCriticalStringElementIndex(pos + 1, replaceStr.length);
    replaceStr.charCodeAt(pos + 1) == 36?(replaceStr = replaceStr.substr(0, pos) + '$' + $substring(replaceStr, ++pos)):(replaceStr = replaceStr.substr(0, pos) + ('' + $substring(replaceStr, ++pos)));
  }
  return replaceStr;
}

stringCastMap = {4:1, 96:1, 30:1, 2:1};
var Ljava_lang_String_2_classLit = createForClass('java.lang', 'String', 2);
function $append(this$static, x_0){
  this$static.string += '' + x_0;
  return this$static;
}

function $append_0(this$static, x_0){
  this$static.string += '' + x_0;
  return this$static;
}

function StringBuilder(){
  AbstractStringBuilder.call(this, '');
}

function StringBuilder_0(){
  AbstractStringBuilder.call(this, '');
}

function StringBuilder_1(){
  AbstractStringBuilder.call(this, (checkCriticalNotNull('[') , '['));
}

defineClass(75, 74, {96:1}, StringBuilder, StringBuilder_0, StringBuilder_1);
var Ljava_lang_StringBuilder_2_classLit = createForClass('java.lang', 'StringBuilder', 75);
function StringIndexOutOfBoundsException(message){
  RuntimeException.call(this, message);
}

defineClass(111, 110, $intern_1, StringIndexOutOfBoundsException);
var Ljava_lang_StringIndexOutOfBoundsException_2_classLit = createForClass('java.lang', 'StringIndexOutOfBoundsException', 111);
function $clinit_System(){
  $clinit_System = emptyMethod;
  err_0 = new PrintStream;
}

defineClass(446, 1, {});
var err_0;
function hashCode_5(a){
  var e, e$index, e$max, hashCode;
  hashCode = 1;
  for (e$index = 0 , e$max = a.length; e$index < e$max; ++e$index) {
    e = a[e$index];
    hashCode = 31 * hashCode + (e != null?hashCode__I__devirtual$(e):0);
    hashCode = hashCode | 0;
  }
  return hashCode;
}

function equals_3(a, b){
  return maskUndefined(a) === maskUndefined(b) || a != null && equals_Ljava_lang_Object__Z__devirtual$(a, b);
}

defineClass(444, 1, {});
function checkCriticalArgument(expression, errorMessageArgs){
  if (!expression) {
    throw toJs(new IllegalArgumentException(format('Enum constant undefined: %s', errorMessageArgs)));
  }
}

function checkCriticalNotNull(reference){
  if (reference == null) {
    throw toJs(new NullPointerException);
  }
  return reference;
}

function checkCriticalStringElementIndex(index_0, size_0){
  if (index_0 < 0 || index_0 >= size_0) {
    throw toJs(new StringIndexOutOfBoundsException('Index: ' + index_0 + ', Size: ' + size_0));
  }
}

function checkCriticalType(expression){
  if (!expression) {
    throw toJs(new ClassCastException);
  }
}

function format(template, args){
  var builder, i_0, placeholderStart, templateStart;
  template = template;
  builder = new StringBuilder_0;
  templateStart = 0;
  i_0 = 0;
  while (i_0 < args.length) {
    placeholderStart = template.indexOf('%s', templateStart);
    if (placeholderStart == -1) {
      break;
    }
    $append_0(builder, template.substr(templateStart, placeholderStart - templateStart));
    $append(builder, args[i_0++]);
    templateStart = placeholderStart + 2;
  }
  $append_0(builder, template.substr(templateStart));
  if (i_0 < args.length) {
    builder.string += ' [';
    $append(builder, args[i_0++]);
    while (i_0 < args.length) {
      builder.string += ', ';
      $append(builder, args[i_0++]);
    }
    builder.string += ']';
  }
  return builder.string;
}

function setPropertySafe(map_0, key, value_0){
  try {
    map_0[key] = value_0;
  }
   catch (ignored) {
  }
}

defineClass(441, 1, {});
function getHashCode(o){
  return o.$H || (o.$H = ++nextHashId);
}

var nextHashId = 0;
function $clinit_StringHashCache(){
  $clinit_StringHashCache = emptyMethod;
  back_0 = new Object_0;
  front = new Object_0;
}

function compute(str){
  var hashCode, i_0, n, nBatch;
  hashCode = 0;
  n = str.length;
  nBatch = n - 4;
  i_0 = 0;
  while (i_0 < nBatch) {
    hashCode = (checkCriticalStringElementIndex(i_0 + 3, str.length) , str.charCodeAt(i_0 + 3) + (checkCriticalStringElementIndex(i_0 + 2, str.length) , 31 * (str.charCodeAt(i_0 + 2) + (checkCriticalStringElementIndex(i_0 + 1, str.length) , 31 * (str.charCodeAt(i_0 + 1) + (checkCriticalStringElementIndex(i_0, str.length) , 31 * (str.charCodeAt(i_0) + 31 * hashCode)))))));
    hashCode = hashCode | 0;
    i_0 += 4;
  }
  while (i_0 < n) {
    hashCode = hashCode * 31 + $charAt(str, i_0++);
  }
  hashCode = hashCode | 0;
  return hashCode;
}

function getHashCode_0(str){
  $clinit_StringHashCache();
  var hashCode, key, result;
  key = ':' + str;
  result = front[key];
  if (result != null) {
    return round_int((checkCriticalNotNull(result) , result));
  }
  result = back_0[key];
  hashCode = result == null?compute(str):round_int((checkCriticalNotNull(result) , result));
  increment();
  front[key] = hashCode;
  return hashCode;
}

function increment(){
  if (count_0 == 256) {
    back_0 = front;
    front = new Object_0;
    count_0 = 0;
  }
  ++count_0;
}

var back_0, count_0 = 0, front;
var D_classLit = createForPrimitive('double', 'D');
var $entry = ($clinit_Impl() , entry);
var gwtOnLoad = gwtOnLoad = gwtOnLoad_0;
addInitFunctions(init_0);
setGwtProperty('permProps', [[['user.agent', 'gecko1_8']], [['user.agent', 'safari']]]);
if (client) client.onScriptLoad(gwtOnLoad);})();