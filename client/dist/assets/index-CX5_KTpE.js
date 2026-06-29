function kv(s,e){for(var t=0;t<e.length;t++){const r=e[t];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in s)){const l=Object.getOwnPropertyDescriptor(r,o);l&&Object.defineProperty(s,o,l.get?l:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function Bv(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var ed={exports:{}},Ja={},td={exports:{}},vt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dm;function zv(){if(Dm)return vt;Dm=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.iterator;function g(O){return O===null||typeof O!="object"?null:(O=x&&O[x]||O["@@iterator"],typeof O=="function"?O:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,b={};function _(O,ee,Oe){this.props=O,this.context=ee,this.refs=b,this.updater=Oe||S}_.prototype.isReactComponent={},_.prototype.setState=function(O,ee){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,ee,"setState")},_.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function y(){}y.prototype=_.prototype;function C(O,ee,Oe){this.props=O,this.context=ee,this.refs=b,this.updater=Oe||S}var L=C.prototype=new y;L.constructor=C,M(L,_.prototype),L.isPureReactComponent=!0;var P=Array.isArray,k=Object.prototype.hasOwnProperty,I={current:null},z={key:!0,ref:!0,__self:!0,__source:!0};function T(O,ee,Oe){var Ge,Ie={},oe=null,Se=null;if(ee!=null)for(Ge in ee.ref!==void 0&&(Se=ee.ref),ee.key!==void 0&&(oe=""+ee.key),ee)k.call(ee,Ge)&&!z.hasOwnProperty(Ge)&&(Ie[Ge]=ee[Ge]);var me=arguments.length-2;if(me===1)Ie.children=Oe;else if(1<me){for(var Ue=Array(me),Je=0;Je<me;Je++)Ue[Je]=arguments[Je+2];Ie.children=Ue}if(O&&O.defaultProps)for(Ge in me=O.defaultProps,me)Ie[Ge]===void 0&&(Ie[Ge]=me[Ge]);return{$$typeof:s,type:O,key:oe,ref:Se,props:Ie,_owner:I.current}}function D(O,ee){return{$$typeof:s,type:O.type,key:ee,ref:O.ref,props:O.props,_owner:O._owner}}function B(O){return typeof O=="object"&&O!==null&&O.$$typeof===s}function F(O){var ee={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(Oe){return ee[Oe]})}var q=/\/+/g;function ae(O,ee){return typeof O=="object"&&O!==null&&O.key!=null?F(""+O.key):ee.toString(36)}function de(O,ee,Oe,Ge,Ie){var oe=typeof O;(oe==="undefined"||oe==="boolean")&&(O=null);var Se=!1;if(O===null)Se=!0;else switch(oe){case"string":case"number":Se=!0;break;case"object":switch(O.$$typeof){case s:case e:Se=!0}}if(Se)return Se=O,Ie=Ie(Se),O=Ge===""?"."+ae(Se,0):Ge,P(Ie)?(Oe="",O!=null&&(Oe=O.replace(q,"$&/")+"/"),de(Ie,ee,Oe,"",function(Je){return Je})):Ie!=null&&(B(Ie)&&(Ie=D(Ie,Oe+(!Ie.key||Se&&Se.key===Ie.key?"":(""+Ie.key).replace(q,"$&/")+"/")+O)),ee.push(Ie)),1;if(Se=0,Ge=Ge===""?".":Ge+":",P(O))for(var me=0;me<O.length;me++){oe=O[me];var Ue=Ge+ae(oe,me);Se+=de(oe,ee,Oe,Ue,Ie)}else if(Ue=g(O),typeof Ue=="function")for(O=Ue.call(O),me=0;!(oe=O.next()).done;)oe=oe.value,Ue=Ge+ae(oe,me++),Se+=de(oe,ee,Oe,Ue,Ie);else if(oe==="object")throw ee=String(O),Error("Objects are not valid as a React child (found: "+(ee==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":ee)+"). If you meant to render a collection of children, use an array instead.");return Se}function j(O,ee,Oe){if(O==null)return O;var Ge=[],Ie=0;return de(O,Ge,"","",function(oe){return ee.call(Oe,oe,Ie++)}),Ge}function ie(O){if(O._status===-1){var ee=O._result;ee=ee(),ee.then(function(Oe){(O._status===0||O._status===-1)&&(O._status=1,O._result=Oe)},function(Oe){(O._status===0||O._status===-1)&&(O._status=2,O._result=Oe)}),O._status===-1&&(O._status=0,O._result=ee)}if(O._status===1)return O._result.default;throw O._result}var Y={current:null},K={transition:null},ce={ReactCurrentDispatcher:Y,ReactCurrentBatchConfig:K,ReactCurrentOwner:I};function le(){throw Error("act(...) is not supported in production builds of React.")}return vt.Children={map:j,forEach:function(O,ee,Oe){j(O,function(){ee.apply(this,arguments)},Oe)},count:function(O){var ee=0;return j(O,function(){ee++}),ee},toArray:function(O){return j(O,function(ee){return ee})||[]},only:function(O){if(!B(O))throw Error("React.Children.only expected to receive a single React element child.");return O}},vt.Component=_,vt.Fragment=t,vt.Profiler=o,vt.PureComponent=C,vt.StrictMode=r,vt.Suspense=h,vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ce,vt.act=le,vt.cloneElement=function(O,ee,Oe){if(O==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+O+".");var Ge=M({},O.props),Ie=O.key,oe=O.ref,Se=O._owner;if(ee!=null){if(ee.ref!==void 0&&(oe=ee.ref,Se=I.current),ee.key!==void 0&&(Ie=""+ee.key),O.type&&O.type.defaultProps)var me=O.type.defaultProps;for(Ue in ee)k.call(ee,Ue)&&!z.hasOwnProperty(Ue)&&(Ge[Ue]=ee[Ue]===void 0&&me!==void 0?me[Ue]:ee[Ue])}var Ue=arguments.length-2;if(Ue===1)Ge.children=Oe;else if(1<Ue){me=Array(Ue);for(var Je=0;Je<Ue;Je++)me[Je]=arguments[Je+2];Ge.children=me}return{$$typeof:s,type:O.type,key:Ie,ref:oe,props:Ge,_owner:Se}},vt.createContext=function(O){return O={$$typeof:u,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},O.Provider={$$typeof:l,_context:O},O.Consumer=O},vt.createElement=T,vt.createFactory=function(O){var ee=T.bind(null,O);return ee.type=O,ee},vt.createRef=function(){return{current:null}},vt.forwardRef=function(O){return{$$typeof:f,render:O}},vt.isValidElement=B,vt.lazy=function(O){return{$$typeof:v,_payload:{_status:-1,_result:O},_init:ie}},vt.memo=function(O,ee){return{$$typeof:p,type:O,compare:ee===void 0?null:ee}},vt.startTransition=function(O){var ee=K.transition;K.transition={};try{O()}finally{K.transition=ee}},vt.unstable_act=le,vt.useCallback=function(O,ee){return Y.current.useCallback(O,ee)},vt.useContext=function(O){return Y.current.useContext(O)},vt.useDebugValue=function(){},vt.useDeferredValue=function(O){return Y.current.useDeferredValue(O)},vt.useEffect=function(O,ee){return Y.current.useEffect(O,ee)},vt.useId=function(){return Y.current.useId()},vt.useImperativeHandle=function(O,ee,Oe){return Y.current.useImperativeHandle(O,ee,Oe)},vt.useInsertionEffect=function(O,ee){return Y.current.useInsertionEffect(O,ee)},vt.useLayoutEffect=function(O,ee){return Y.current.useLayoutEffect(O,ee)},vt.useMemo=function(O,ee){return Y.current.useMemo(O,ee)},vt.useReducer=function(O,ee,Oe){return Y.current.useReducer(O,ee,Oe)},vt.useRef=function(O){return Y.current.useRef(O)},vt.useState=function(O){return Y.current.useState(O)},vt.useSyncExternalStore=function(O,ee,Oe){return Y.current.useSyncExternalStore(O,ee,Oe)},vt.useTransition=function(){return Y.current.useTransition()},vt.version="18.3.1",vt}var Nm;function Hf(){return Nm||(Nm=1,td.exports=zv()),td.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Im;function Hv(){if(Im)return Ja;Im=1;var s=Hf(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,o=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(f,h,p){var v,x={},g=null,S=null;p!==void 0&&(g=""+p),h.key!==void 0&&(g=""+h.key),h.ref!==void 0&&(S=h.ref);for(v in h)r.call(h,v)&&!l.hasOwnProperty(v)&&(x[v]=h[v]);if(f&&f.defaultProps)for(v in h=f.defaultProps,h)x[v]===void 0&&(x[v]=h[v]);return{$$typeof:e,type:f,key:g,ref:S,props:x,_owner:o.current}}return Ja.Fragment=t,Ja.jsx=u,Ja.jsxs=u,Ja}var Um;function Vv(){return Um||(Um=1,ed.exports=Hv()),ed.exports}var R=Vv(),ge=Hf();const Gv=Bv(ge),Wv=kv({__proto__:null,default:Gv},[ge]);var Sl={},nd={exports:{}},zn={},id={exports:{}},rd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fm;function jv(){return Fm||(Fm=1,(function(s){function e(K,ce){var le=K.length;K.push(ce);e:for(;0<le;){var O=le-1>>>1,ee=K[O];if(0<o(ee,ce))K[O]=ce,K[le]=ee,le=O;else break e}}function t(K){return K.length===0?null:K[0]}function r(K){if(K.length===0)return null;var ce=K[0],le=K.pop();if(le!==ce){K[0]=le;e:for(var O=0,ee=K.length,Oe=ee>>>1;O<Oe;){var Ge=2*(O+1)-1,Ie=K[Ge],oe=Ge+1,Se=K[oe];if(0>o(Ie,le))oe<ee&&0>o(Se,Ie)?(K[O]=Se,K[oe]=le,O=oe):(K[O]=Ie,K[Ge]=le,O=Ge);else if(oe<ee&&0>o(Se,le))K[O]=Se,K[oe]=le,O=oe;else break e}}return ce}function o(K,ce){var le=K.sortIndex-ce.sortIndex;return le!==0?le:K.id-ce.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var u=Date,f=u.now();s.unstable_now=function(){return u.now()-f}}var h=[],p=[],v=1,x=null,g=3,S=!1,M=!1,b=!1,_=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,C=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function L(K){for(var ce=t(p);ce!==null;){if(ce.callback===null)r(p);else if(ce.startTime<=K)r(p),ce.sortIndex=ce.expirationTime,e(h,ce);else break;ce=t(p)}}function P(K){if(b=!1,L(K),!M)if(t(h)!==null)M=!0,ie(k);else{var ce=t(p);ce!==null&&Y(P,ce.startTime-K)}}function k(K,ce){M=!1,b&&(b=!1,y(T),T=-1),S=!0;var le=g;try{for(L(ce),x=t(h);x!==null&&(!(x.expirationTime>ce)||K&&!F());){var O=x.callback;if(typeof O=="function"){x.callback=null,g=x.priorityLevel;var ee=O(x.expirationTime<=ce);ce=s.unstable_now(),typeof ee=="function"?x.callback=ee:x===t(h)&&r(h),L(ce)}else r(h);x=t(h)}if(x!==null)var Oe=!0;else{var Ge=t(p);Ge!==null&&Y(P,Ge.startTime-ce),Oe=!1}return Oe}finally{x=null,g=le,S=!1}}var I=!1,z=null,T=-1,D=5,B=-1;function F(){return!(s.unstable_now()-B<D)}function q(){if(z!==null){var K=s.unstable_now();B=K;var ce=!0;try{ce=z(!0,K)}finally{ce?ae():(I=!1,z=null)}}else I=!1}var ae;if(typeof C=="function")ae=function(){C(q)};else if(typeof MessageChannel<"u"){var de=new MessageChannel,j=de.port2;de.port1.onmessage=q,ae=function(){j.postMessage(null)}}else ae=function(){_(q,0)};function ie(K){z=K,I||(I=!0,ae())}function Y(K,ce){T=_(function(){K(s.unstable_now())},ce)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(K){K.callback=null},s.unstable_continueExecution=function(){M||S||(M=!0,ie(k))},s.unstable_forceFrameRate=function(K){0>K||125<K?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<K?Math.floor(1e3/K):5},s.unstable_getCurrentPriorityLevel=function(){return g},s.unstable_getFirstCallbackNode=function(){return t(h)},s.unstable_next=function(K){switch(g){case 1:case 2:case 3:var ce=3;break;default:ce=g}var le=g;g=ce;try{return K()}finally{g=le}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(K,ce){switch(K){case 1:case 2:case 3:case 4:case 5:break;default:K=3}var le=g;g=K;try{return ce()}finally{g=le}},s.unstable_scheduleCallback=function(K,ce,le){var O=s.unstable_now();switch(typeof le=="object"&&le!==null?(le=le.delay,le=typeof le=="number"&&0<le?O+le:O):le=O,K){case 1:var ee=-1;break;case 2:ee=250;break;case 5:ee=1073741823;break;case 4:ee=1e4;break;default:ee=5e3}return ee=le+ee,K={id:v++,callback:ce,priorityLevel:K,startTime:le,expirationTime:ee,sortIndex:-1},le>O?(K.sortIndex=le,e(p,K),t(h)===null&&K===t(p)&&(b?(y(T),T=-1):b=!0,Y(P,le-O))):(K.sortIndex=ee,e(h,K),M||S||(M=!0,ie(k))),K},s.unstable_shouldYield=F,s.unstable_wrapCallback=function(K){var ce=g;return function(){var le=g;g=ce;try{return K.apply(this,arguments)}finally{g=le}}}})(rd)),rd}var Om;function Xv(){return Om||(Om=1,id.exports=jv()),id.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var km;function Yv(){if(km)return zn;km=1;var s=Hf(),e=Xv();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,o={};function l(n,i){u(n,i),u(n+"Capture",i)}function u(n,i){for(o[n]=i,n=0;n<i.length;n++)r.add(i[n])}var f=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,v={},x={};function g(n){return h.call(x,n)?!0:h.call(v,n)?!1:p.test(n)?x[n]=!0:(v[n]=!0,!1)}function S(n,i,a,c){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function M(n,i,a,c){if(i===null||typeof i>"u"||S(n,i,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function b(n,i,a,c,d,m,w){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=m,this.removeEmptyString=w}var _={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){_[n]=new b(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];_[i]=new b(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){_[n]=new b(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){_[n]=new b(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){_[n]=new b(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){_[n]=new b(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){_[n]=new b(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){_[n]=new b(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){_[n]=new b(n,5,!1,n.toLowerCase(),null,!1,!1)});var y=/[\-:]([a-z])/g;function C(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(y,C);_[i]=new b(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(y,C);_[i]=new b(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(y,C);_[i]=new b(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){_[n]=new b(n,1,!1,n.toLowerCase(),null,!1,!1)}),_.xlinkHref=new b("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){_[n]=new b(n,1,!1,n.toLowerCase(),null,!0,!0)});function L(n,i,a,c){var d=_.hasOwnProperty(i)?_[i]:null;(d!==null?d.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(M(i,a,d,c)&&(a=null),c||d===null?g(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):d.mustUseProperty?n[d.propertyName]=a===null?d.type===3?!1:"":a:(i=d.attributeName,c=d.attributeNamespace,a===null?n.removeAttribute(i):(d=d.type,a=d===3||d===4&&a===!0?"":""+a,c?n.setAttributeNS(c,i,a):n.setAttribute(i,a))))}var P=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,k=Symbol.for("react.element"),I=Symbol.for("react.portal"),z=Symbol.for("react.fragment"),T=Symbol.for("react.strict_mode"),D=Symbol.for("react.profiler"),B=Symbol.for("react.provider"),F=Symbol.for("react.context"),q=Symbol.for("react.forward_ref"),ae=Symbol.for("react.suspense"),de=Symbol.for("react.suspense_list"),j=Symbol.for("react.memo"),ie=Symbol.for("react.lazy"),Y=Symbol.for("react.offscreen"),K=Symbol.iterator;function ce(n){return n===null||typeof n!="object"?null:(n=K&&n[K]||n["@@iterator"],typeof n=="function"?n:null)}var le=Object.assign,O;function ee(n){if(O===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);O=i&&i[1]||""}return`
`+O+n}var Oe=!1;function Ge(n,i){if(!n||Oe)return"";Oe=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(se){var c=se}Reflect.construct(n,[],i)}else{try{i.call()}catch(se){c=se}n.call(i.prototype)}else{try{throw Error()}catch(se){c=se}n()}}catch(se){if(se&&c&&typeof se.stack=="string"){for(var d=se.stack.split(`
`),m=c.stack.split(`
`),w=d.length-1,U=m.length-1;1<=w&&0<=U&&d[w]!==m[U];)U--;for(;1<=w&&0<=U;w--,U--)if(d[w]!==m[U]){if(w!==1||U!==1)do if(w--,U--,0>U||d[w]!==m[U]){var H=`
`+d[w].replace(" at new "," at ");return n.displayName&&H.includes("<anonymous>")&&(H=H.replace("<anonymous>",n.displayName)),H}while(1<=w&&0<=U);break}}}finally{Oe=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?ee(n):""}function Ie(n){switch(n.tag){case 5:return ee(n.type);case 16:return ee("Lazy");case 13:return ee("Suspense");case 19:return ee("SuspenseList");case 0:case 2:case 15:return n=Ge(n.type,!1),n;case 11:return n=Ge(n.type.render,!1),n;case 1:return n=Ge(n.type,!0),n;default:return""}}function oe(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case z:return"Fragment";case I:return"Portal";case D:return"Profiler";case T:return"StrictMode";case ae:return"Suspense";case de:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case F:return(n.displayName||"Context")+".Consumer";case B:return(n._context.displayName||"Context")+".Provider";case q:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case j:return i=n.displayName||null,i!==null?i:oe(n.type)||"Memo";case ie:i=n._payload,n=n._init;try{return oe(n(i))}catch{}}return null}function Se(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return oe(i);case 8:return i===T?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function me(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Ue(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Je(n){var i=Ue(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var d=a.get,m=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return d.call(this)},set:function(w){c=""+w,m.call(this,w)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(w){c=""+w},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function Qe(n){n._valueTracker||(n._valueTracker=Je(n))}function Ft(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),c="";return n&&(c=Ue(n)?n.checked?"true":"false":n.value),n=c,n!==a?(i.setValue(n),!0):!1}function dt(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function wt(n,i){var a=i.checked;return le({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Nt(n,i){var a=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;a=me(i.value!=null?i.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function ft(n,i){i=i.checked,i!=null&&L(n,"checked",i,!1)}function Yt(n,i){ft(n,i);var a=me(i.value),c=i.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?mn(n,i.type,a):i.hasOwnProperty("defaultValue")&&mn(n,i.type,me(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function Ot(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function mn(n,i,a){(i!=="number"||dt(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var G=Array.isArray;function kt(n,i,a,c){if(n=n.options,i){i={};for(var d=0;d<a.length;d++)i["$"+a[d]]=!0;for(a=0;a<n.length;a++)d=i.hasOwnProperty("$"+n[a].value),n[a].selected!==d&&(n[a].selected=d),d&&c&&(n[a].defaultSelected=!0)}else{for(a=""+me(a),i=null,d=0;d<n.length;d++){if(n[d].value===a){n[d].selected=!0,c&&(n[d].defaultSelected=!0);return}i!==null||n[d].disabled||(i=n[d])}i!==null&&(i.selected=!0)}}function ht(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return le({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Ct(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(G(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:me(a)}}function De(n,i){var a=me(i.value),c=me(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function Ht(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function N(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function E(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?N(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Z,he=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,c,d){MSApp.execUnsafeLocalFunction(function(){return n(i,a,c,d)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Z=Z||document.createElement("div"),Z.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Z.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function _e(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var Ee={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Le=["Webkit","ms","Moz","O"];Object.keys(Ee).forEach(function(n){Le.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),Ee[i]=Ee[n]})});function ue(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||Ee.hasOwnProperty(n)&&Ee[n]?(""+i).trim():i+"px"}function pe(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var c=a.indexOf("--")===0,d=ue(a,i[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,d):n[a]=d}}var Fe=le({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Be(n,i){if(i){if(Fe[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function Ae(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Te=null;function it(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var st=null,mt=null,V=null;function be(n){if(n=Oa(n)){if(typeof st!="function")throw Error(t(280));var i=n.stateNode;i&&(i=Fo(i),st(n.stateNode,n.type,i))}}function fe(n){mt?V?V.push(n):V=[n]:mt=n}function ke(){if(mt){var n=mt,i=V;if(V=mt=null,be(n),i)for(n=0;n<i.length;n++)be(i[n])}}function Ce(n,i){return n(i)}function ve(){}var Xe=!1;function at(n,i,a){if(Xe)return n(i,a);Xe=!0;try{return Ce(n,i,a)}finally{Xe=!1,(mt!==null||V!==null)&&(ve(),ke())}}function Ut(n,i){var a=n.stateNode;if(a===null)return null;var c=Fo(a);if(c===null)return null;a=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var bt=!1;if(f)try{var Rn={};Object.defineProperty(Rn,"passive",{get:function(){bt=!0}}),window.addEventListener("test",Rn,Rn),window.removeEventListener("test",Rn,Rn)}catch{bt=!1}function ei(n,i,a,c,d,m,w,U,H){var se=Array.prototype.slice.call(arguments,3);try{i.apply(a,se)}catch(ye){this.onError(ye)}}var Hi=!1,_s=null,jr=!1,vs=null,Vi={onError:function(n){Hi=!0,_s=n}};function ga(n,i,a,c,d,m,w,U,H){Hi=!1,_s=null,ei.apply(Vi,arguments)}function xo(n,i,a,c,d,m,w,U,H){if(ga.apply(this,arguments),Hi){if(Hi){var se=_s;Hi=!1,_s=null}else throw Error(t(198));jr||(jr=!0,vs=se)}}function bi(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function Xr(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function _a(n){if(bi(n)!==n)throw Error(t(188))}function xs(n){var i=n.alternate;if(!i){if(i=bi(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,c=i;;){var d=a.return;if(d===null)break;var m=d.alternate;if(m===null){if(c=d.return,c!==null){a=c;continue}break}if(d.child===m.child){for(m=d.child;m;){if(m===a)return _a(d),n;if(m===c)return _a(d),i;m=m.sibling}throw Error(t(188))}if(a.return!==c.return)a=d,c=m;else{for(var w=!1,U=d.child;U;){if(U===a){w=!0,a=d,c=m;break}if(U===c){w=!0,c=d,a=m;break}U=U.sibling}if(!w){for(U=m.child;U;){if(U===a){w=!0,a=m,c=d;break}if(U===c){w=!0,c=m,a=d;break}U=U.sibling}if(!w)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function va(n){return n=xs(n),n!==null?xa(n):null}function xa(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=xa(n);if(i!==null)return i;n=n.sibling}return null}var yo=e.unstable_scheduleCallback,So=e.unstable_cancelCallback,Ec=e.unstable_shouldYield,Tc=e.unstable_requestPaint,qt=e.unstable_now,wc=e.unstable_getCurrentPriorityLevel,ya=e.unstable_ImmediatePriority,A=e.unstable_UserBlockingPriority,X=e.unstable_NormalPriority,re=e.unstable_LowPriority,te=e.unstable_IdlePriority,Q=null,Pe=null;function Ve(n){if(Pe&&typeof Pe.onCommitFiberRoot=="function")try{Pe.onCommitFiberRoot(Q,n,void 0,(n.current.flags&128)===128)}catch{}}var Re=Math.clz32?Math.clz32:ot,Ye=Math.log,Ze=Math.LN2;function ot(n){return n>>>=0,n===0?32:31-(Ye(n)/Ze|0)|0}var lt=64,$e=4194304;function Mt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Bt(n,i){var a=n.pendingLanes;if(a===0)return 0;var c=0,d=n.suspendedLanes,m=n.pingedLanes,w=a&268435455;if(w!==0){var U=w&~d;U!==0?c=Mt(U):(m&=w,m!==0&&(c=Mt(m)))}else w=a&~d,w!==0?c=Mt(w):m!==0&&(c=Mt(m));if(c===0)return 0;if(i!==0&&i!==c&&(i&d)===0&&(d=c&-c,m=i&-i,d>=m||d===16&&(m&4194240)!==0))return i;if((c&4)!==0&&(c|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)a=31-Re(i),d=1<<a,c|=n[a],i&=~d;return c}function jt(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Pt(n,i){for(var a=n.suspendedLanes,c=n.pingedLanes,d=n.expirationTimes,m=n.pendingLanes;0<m;){var w=31-Re(m),U=1<<w,H=d[w];H===-1?((U&a)===0||(U&c)!==0)&&(d[w]=jt(U,i)):H<=i&&(n.expiredLanes|=U),m&=~U}}function tn(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function ze(){var n=lt;return lt<<=1,(lt&4194240)===0&&(lt=64),n}function gn(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function gt(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-Re(i),n[i]=a}function Nn(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var d=31-Re(a),m=1<<d;i[d]=0,c[d]=-1,n[d]=-1,a&=~m}}function In(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var c=31-Re(a),d=1<<c;d&i|n[c]&i&&(n[c]|=i),a&=~d}}var _t=0;function Gi(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var Rt,Vt,di,Lt,fi,Ai=!1,Yr=[],cr=null,ur=null,dr=null,Sa=new Map,Ma=new Map,fr=[],a0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function mh(n,i){switch(n){case"focusin":case"focusout":cr=null;break;case"dragenter":case"dragleave":ur=null;break;case"mouseover":case"mouseout":dr=null;break;case"pointerover":case"pointerout":Sa.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ma.delete(i.pointerId)}}function Ea(n,i,a,c,d,m){return n===null||n.nativeEvent!==m?(n={blockedOn:i,domEventName:a,eventSystemFlags:c,nativeEvent:m,targetContainers:[d]},i!==null&&(i=Oa(i),i!==null&&Vt(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,d!==null&&i.indexOf(d)===-1&&i.push(d),n)}function o0(n,i,a,c,d){switch(i){case"focusin":return cr=Ea(cr,n,i,a,c,d),!0;case"dragenter":return ur=Ea(ur,n,i,a,c,d),!0;case"mouseover":return dr=Ea(dr,n,i,a,c,d),!0;case"pointerover":var m=d.pointerId;return Sa.set(m,Ea(Sa.get(m)||null,n,i,a,c,d)),!0;case"gotpointercapture":return m=d.pointerId,Ma.set(m,Ea(Ma.get(m)||null,n,i,a,c,d)),!0}return!1}function gh(n){var i=qr(n.target);if(i!==null){var a=bi(i);if(a!==null){if(i=a.tag,i===13){if(i=Xr(a),i!==null){n.blockedOn=i,fi(n.priority,function(){di(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Mo(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=Ac(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);Te=c,a.target.dispatchEvent(c),Te=null}else return i=Oa(a),i!==null&&Vt(i),n.blockedOn=a,!1;i.shift()}return!0}function _h(n,i,a){Mo(n)&&a.delete(i)}function l0(){Ai=!1,cr!==null&&Mo(cr)&&(cr=null),ur!==null&&Mo(ur)&&(ur=null),dr!==null&&Mo(dr)&&(dr=null),Sa.forEach(_h),Ma.forEach(_h)}function Ta(n,i){n.blockedOn===i&&(n.blockedOn=null,Ai||(Ai=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,l0)))}function wa(n){function i(d){return Ta(d,n)}if(0<Yr.length){Ta(Yr[0],n);for(var a=1;a<Yr.length;a++){var c=Yr[a];c.blockedOn===n&&(c.blockedOn=null)}}for(cr!==null&&Ta(cr,n),ur!==null&&Ta(ur,n),dr!==null&&Ta(dr,n),Sa.forEach(i),Ma.forEach(i),a=0;a<fr.length;a++)c=fr[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<fr.length&&(a=fr[0],a.blockedOn===null);)gh(a),a.blockedOn===null&&fr.shift()}var ys=P.ReactCurrentBatchConfig,Eo=!0;function c0(n,i,a,c){var d=_t,m=ys.transition;ys.transition=null;try{_t=1,bc(n,i,a,c)}finally{_t=d,ys.transition=m}}function u0(n,i,a,c){var d=_t,m=ys.transition;ys.transition=null;try{_t=4,bc(n,i,a,c)}finally{_t=d,ys.transition=m}}function bc(n,i,a,c){if(Eo){var d=Ac(n,i,a,c);if(d===null)Wc(n,i,c,To,a),mh(n,c);else if(o0(d,n,i,a,c))c.stopPropagation();else if(mh(n,c),i&4&&-1<a0.indexOf(n)){for(;d!==null;){var m=Oa(d);if(m!==null&&Rt(m),m=Ac(n,i,a,c),m===null&&Wc(n,i,c,To,a),m===d)break;d=m}d!==null&&c.stopPropagation()}else Wc(n,i,c,null,a)}}var To=null;function Ac(n,i,a,c){if(To=null,n=it(c),n=qr(n),n!==null)if(i=bi(n),i===null)n=null;else if(a=i.tag,a===13){if(n=Xr(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return To=n,null}function vh(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(wc()){case ya:return 1;case A:return 4;case X:case re:return 16;case te:return 536870912;default:return 16}default:return 16}}var hr=null,Rc=null,wo=null;function xh(){if(wo)return wo;var n,i=Rc,a=i.length,c,d="value"in hr?hr.value:hr.textContent,m=d.length;for(n=0;n<a&&i[n]===d[n];n++);var w=a-n;for(c=1;c<=w&&i[a-c]===d[m-c];c++);return wo=d.slice(n,1<c?1-c:void 0)}function bo(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Ao(){return!0}function yh(){return!1}function jn(n){function i(a,c,d,m,w){this._reactName=a,this._targetInst=d,this.type=c,this.nativeEvent=m,this.target=w,this.currentTarget=null;for(var U in n)n.hasOwnProperty(U)&&(a=n[U],this[U]=a?a(m):m[U]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?Ao:yh,this.isPropagationStopped=yh,this}return le(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ao)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ao)},persist:function(){},isPersistent:Ao}),i}var Ss={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Cc=jn(Ss),ba=le({},Ss,{view:0,detail:0}),d0=jn(ba),Pc,Lc,Aa,Ro=le({},ba,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Nc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Aa&&(Aa&&n.type==="mousemove"?(Pc=n.screenX-Aa.screenX,Lc=n.screenY-Aa.screenY):Lc=Pc=0,Aa=n),Pc)},movementY:function(n){return"movementY"in n?n.movementY:Lc}}),Sh=jn(Ro),f0=le({},Ro,{dataTransfer:0}),h0=jn(f0),p0=le({},ba,{relatedTarget:0}),Dc=jn(p0),m0=le({},Ss,{animationName:0,elapsedTime:0,pseudoElement:0}),g0=jn(m0),_0=le({},Ss,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),v0=jn(_0),x0=le({},Ss,{data:0}),Mh=jn(x0),y0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},S0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},M0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function E0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=M0[n])?!!i[n]:!1}function Nc(){return E0}var T0=le({},ba,{key:function(n){if(n.key){var i=y0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=bo(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?S0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Nc,charCode:function(n){return n.type==="keypress"?bo(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?bo(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),w0=jn(T0),b0=le({},Ro,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Eh=jn(b0),A0=le({},ba,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Nc}),R0=jn(A0),C0=le({},Ss,{propertyName:0,elapsedTime:0,pseudoElement:0}),P0=jn(C0),L0=le({},Ro,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),D0=jn(L0),N0=[9,13,27,32],Ic=f&&"CompositionEvent"in window,Ra=null;f&&"documentMode"in document&&(Ra=document.documentMode);var I0=f&&"TextEvent"in window&&!Ra,Th=f&&(!Ic||Ra&&8<Ra&&11>=Ra),wh=" ",bh=!1;function Ah(n,i){switch(n){case"keyup":return N0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Rh(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Ms=!1;function U0(n,i){switch(n){case"compositionend":return Rh(i);case"keypress":return i.which!==32?null:(bh=!0,wh);case"textInput":return n=i.data,n===wh&&bh?null:n;default:return null}}function F0(n,i){if(Ms)return n==="compositionend"||!Ic&&Ah(n,i)?(n=xh(),wo=Rc=hr=null,Ms=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Th&&i.locale!=="ko"?null:i.data;default:return null}}var O0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ch(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!O0[n.type]:i==="textarea"}function Ph(n,i,a,c){fe(c),i=No(i,"onChange"),0<i.length&&(a=new Cc("onChange","change",null,a,c),n.push({event:a,listeners:i}))}var Ca=null,Pa=null;function k0(n){qh(n,0)}function Co(n){var i=As(n);if(Ft(i))return n}function B0(n,i){if(n==="change")return i}var Lh=!1;if(f){var Uc;if(f){var Fc="oninput"in document;if(!Fc){var Dh=document.createElement("div");Dh.setAttribute("oninput","return;"),Fc=typeof Dh.oninput=="function"}Uc=Fc}else Uc=!1;Lh=Uc&&(!document.documentMode||9<document.documentMode)}function Nh(){Ca&&(Ca.detachEvent("onpropertychange",Ih),Pa=Ca=null)}function Ih(n){if(n.propertyName==="value"&&Co(Pa)){var i=[];Ph(i,Pa,n,it(n)),at(k0,i)}}function z0(n,i,a){n==="focusin"?(Nh(),Ca=i,Pa=a,Ca.attachEvent("onpropertychange",Ih)):n==="focusout"&&Nh()}function H0(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Co(Pa)}function V0(n,i){if(n==="click")return Co(i)}function G0(n,i){if(n==="input"||n==="change")return Co(i)}function W0(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var hi=typeof Object.is=="function"?Object.is:W0;function La(n,i){if(hi(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),c=Object.keys(i);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var d=a[c];if(!h.call(i,d)||!hi(n[d],i[d]))return!1}return!0}function Uh(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Fh(n,i){var a=Uh(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=i&&c>=i)return{node:a,offset:i-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Uh(a)}}function Oh(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?Oh(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function kh(){for(var n=window,i=dt();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=dt(n.document)}return i}function Oc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function j0(n){var i=kh(),a=n.focusedElem,c=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&Oh(a.ownerDocument.documentElement,a)){if(c!==null&&Oc(a)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var d=a.textContent.length,m=Math.min(c.start,d);c=c.end===void 0?m:Math.min(c.end,d),!n.extend&&m>c&&(d=c,c=m,m=d),d=Fh(a,m);var w=Fh(a,c);d&&w&&(n.rangeCount!==1||n.anchorNode!==d.node||n.anchorOffset!==d.offset||n.focusNode!==w.node||n.focusOffset!==w.offset)&&(i=i.createRange(),i.setStart(d.node,d.offset),n.removeAllRanges(),m>c?(n.addRange(i),n.extend(w.node,w.offset)):(i.setEnd(w.node,w.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var X0=f&&"documentMode"in document&&11>=document.documentMode,Es=null,kc=null,Da=null,Bc=!1;function Bh(n,i,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Bc||Es==null||Es!==dt(c)||(c=Es,"selectionStart"in c&&Oc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),Da&&La(Da,c)||(Da=c,c=No(kc,"onSelect"),0<c.length&&(i=new Cc("onSelect","select",null,i,a),n.push({event:i,listeners:c}),i.target=Es)))}function Po(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var Ts={animationend:Po("Animation","AnimationEnd"),animationiteration:Po("Animation","AnimationIteration"),animationstart:Po("Animation","AnimationStart"),transitionend:Po("Transition","TransitionEnd")},zc={},zh={};f&&(zh=document.createElement("div").style,"AnimationEvent"in window||(delete Ts.animationend.animation,delete Ts.animationiteration.animation,delete Ts.animationstart.animation),"TransitionEvent"in window||delete Ts.transitionend.transition);function Lo(n){if(zc[n])return zc[n];if(!Ts[n])return n;var i=Ts[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in zh)return zc[n]=i[a];return n}var Hh=Lo("animationend"),Vh=Lo("animationiteration"),Gh=Lo("animationstart"),Wh=Lo("transitionend"),jh=new Map,Xh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function pr(n,i){jh.set(n,i),l(i,[n])}for(var Hc=0;Hc<Xh.length;Hc++){var Vc=Xh[Hc],Y0=Vc.toLowerCase(),q0=Vc[0].toUpperCase()+Vc.slice(1);pr(Y0,"on"+q0)}pr(Hh,"onAnimationEnd"),pr(Vh,"onAnimationIteration"),pr(Gh,"onAnimationStart"),pr("dblclick","onDoubleClick"),pr("focusin","onFocus"),pr("focusout","onBlur"),pr(Wh,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Na="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),$0=new Set("cancel close invalid load scroll toggle".split(" ").concat(Na));function Yh(n,i,a){var c=n.type||"unknown-event";n.currentTarget=a,xo(c,i,void 0,n),n.currentTarget=null}function qh(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],d=c.event;c=c.listeners;e:{var m=void 0;if(i)for(var w=c.length-1;0<=w;w--){var U=c[w],H=U.instance,se=U.currentTarget;if(U=U.listener,H!==m&&d.isPropagationStopped())break e;Yh(d,U,se),m=H}else for(w=0;w<c.length;w++){if(U=c[w],H=U.instance,se=U.currentTarget,U=U.listener,H!==m&&d.isPropagationStopped())break e;Yh(d,U,se),m=H}}}if(jr)throw n=vs,jr=!1,vs=null,n}function Gt(n,i){var a=i[Kc];a===void 0&&(a=i[Kc]=new Set);var c=n+"__bubble";a.has(c)||($h(i,n,2,!1),a.add(c))}function Gc(n,i,a){var c=0;i&&(c|=4),$h(a,n,c,i)}var Do="_reactListening"+Math.random().toString(36).slice(2);function Ia(n){if(!n[Do]){n[Do]=!0,r.forEach(function(a){a!=="selectionchange"&&($0.has(a)||Gc(a,!1,n),Gc(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[Do]||(i[Do]=!0,Gc("selectionchange",!1,i))}}function $h(n,i,a,c){switch(vh(i)){case 1:var d=c0;break;case 4:d=u0;break;default:d=bc}a=d.bind(null,i,a,n),d=void 0,!bt||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(d=!0),c?d!==void 0?n.addEventListener(i,a,{capture:!0,passive:d}):n.addEventListener(i,a,!0):d!==void 0?n.addEventListener(i,a,{passive:d}):n.addEventListener(i,a,!1)}function Wc(n,i,a,c,d){var m=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var w=c.tag;if(w===3||w===4){var U=c.stateNode.containerInfo;if(U===d||U.nodeType===8&&U.parentNode===d)break;if(w===4)for(w=c.return;w!==null;){var H=w.tag;if((H===3||H===4)&&(H=w.stateNode.containerInfo,H===d||H.nodeType===8&&H.parentNode===d))return;w=w.return}for(;U!==null;){if(w=qr(U),w===null)return;if(H=w.tag,H===5||H===6){c=m=w;continue e}U=U.parentNode}}c=c.return}at(function(){var se=m,ye=it(a),Me=[];e:{var xe=jh.get(n);if(xe!==void 0){var He=Cc,je=n;switch(n){case"keypress":if(bo(a)===0)break e;case"keydown":case"keyup":He=w0;break;case"focusin":je="focus",He=Dc;break;case"focusout":je="blur",He=Dc;break;case"beforeblur":case"afterblur":He=Dc;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":He=Sh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":He=h0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":He=R0;break;case Hh:case Vh:case Gh:He=g0;break;case Wh:He=P0;break;case"scroll":He=d0;break;case"wheel":He=D0;break;case"copy":case"cut":case"paste":He=v0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":He=Eh}var qe=(i&4)!==0,en=!qe&&n==="scroll",J=qe?xe!==null?xe+"Capture":null:xe;qe=[];for(var W=se,ne;W!==null;){ne=W;var we=ne.stateNode;if(ne.tag===5&&we!==null&&(ne=we,J!==null&&(we=Ut(W,J),we!=null&&qe.push(Ua(W,we,ne)))),en)break;W=W.return}0<qe.length&&(xe=new He(xe,je,null,a,ye),Me.push({event:xe,listeners:qe}))}}if((i&7)===0){e:{if(xe=n==="mouseover"||n==="pointerover",He=n==="mouseout"||n==="pointerout",xe&&a!==Te&&(je=a.relatedTarget||a.fromElement)&&(qr(je)||je[Wi]))break e;if((He||xe)&&(xe=ye.window===ye?ye:(xe=ye.ownerDocument)?xe.defaultView||xe.parentWindow:window,He?(je=a.relatedTarget||a.toElement,He=se,je=je?qr(je):null,je!==null&&(en=bi(je),je!==en||je.tag!==5&&je.tag!==6)&&(je=null)):(He=null,je=se),He!==je)){if(qe=Sh,we="onMouseLeave",J="onMouseEnter",W="mouse",(n==="pointerout"||n==="pointerover")&&(qe=Eh,we="onPointerLeave",J="onPointerEnter",W="pointer"),en=He==null?xe:As(He),ne=je==null?xe:As(je),xe=new qe(we,W+"leave",He,a,ye),xe.target=en,xe.relatedTarget=ne,we=null,qr(ye)===se&&(qe=new qe(J,W+"enter",je,a,ye),qe.target=ne,qe.relatedTarget=en,we=qe),en=we,He&&je)t:{for(qe=He,J=je,W=0,ne=qe;ne;ne=ws(ne))W++;for(ne=0,we=J;we;we=ws(we))ne++;for(;0<W-ne;)qe=ws(qe),W--;for(;0<ne-W;)J=ws(J),ne--;for(;W--;){if(qe===J||J!==null&&qe===J.alternate)break t;qe=ws(qe),J=ws(J)}qe=null}else qe=null;He!==null&&Kh(Me,xe,He,qe,!1),je!==null&&en!==null&&Kh(Me,en,je,qe,!0)}}e:{if(xe=se?As(se):window,He=xe.nodeName&&xe.nodeName.toLowerCase(),He==="select"||He==="input"&&xe.type==="file")var Ke=B0;else if(Ch(xe))if(Lh)Ke=G0;else{Ke=H0;var et=z0}else(He=xe.nodeName)&&He.toLowerCase()==="input"&&(xe.type==="checkbox"||xe.type==="radio")&&(Ke=V0);if(Ke&&(Ke=Ke(n,se))){Ph(Me,Ke,a,ye);break e}et&&et(n,xe,se),n==="focusout"&&(et=xe._wrapperState)&&et.controlled&&xe.type==="number"&&mn(xe,"number",xe.value)}switch(et=se?As(se):window,n){case"focusin":(Ch(et)||et.contentEditable==="true")&&(Es=et,kc=se,Da=null);break;case"focusout":Da=kc=Es=null;break;case"mousedown":Bc=!0;break;case"contextmenu":case"mouseup":case"dragend":Bc=!1,Bh(Me,a,ye);break;case"selectionchange":if(X0)break;case"keydown":case"keyup":Bh(Me,a,ye)}var tt;if(Ic)e:{switch(n){case"compositionstart":var rt="onCompositionStart";break e;case"compositionend":rt="onCompositionEnd";break e;case"compositionupdate":rt="onCompositionUpdate";break e}rt=void 0}else Ms?Ah(n,a)&&(rt="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(rt="onCompositionStart");rt&&(Th&&a.locale!=="ko"&&(Ms||rt!=="onCompositionStart"?rt==="onCompositionEnd"&&Ms&&(tt=xh()):(hr=ye,Rc="value"in hr?hr.value:hr.textContent,Ms=!0)),et=No(se,rt),0<et.length&&(rt=new Mh(rt,n,null,a,ye),Me.push({event:rt,listeners:et}),tt?rt.data=tt:(tt=Rh(a),tt!==null&&(rt.data=tt)))),(tt=I0?U0(n,a):F0(n,a))&&(se=No(se,"onBeforeInput"),0<se.length&&(ye=new Mh("onBeforeInput","beforeinput",null,a,ye),Me.push({event:ye,listeners:se}),ye.data=tt))}qh(Me,i)})}function Ua(n,i,a){return{instance:n,listener:i,currentTarget:a}}function No(n,i){for(var a=i+"Capture",c=[];n!==null;){var d=n,m=d.stateNode;d.tag===5&&m!==null&&(d=m,m=Ut(n,a),m!=null&&c.unshift(Ua(n,m,d)),m=Ut(n,i),m!=null&&c.push(Ua(n,m,d))),n=n.return}return c}function ws(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Kh(n,i,a,c,d){for(var m=i._reactName,w=[];a!==null&&a!==c;){var U=a,H=U.alternate,se=U.stateNode;if(H!==null&&H===c)break;U.tag===5&&se!==null&&(U=se,d?(H=Ut(a,m),H!=null&&w.unshift(Ua(a,H,U))):d||(H=Ut(a,m),H!=null&&w.push(Ua(a,H,U)))),a=a.return}w.length!==0&&n.push({event:i,listeners:w})}var K0=/\r\n?/g,Z0=/\u0000|\uFFFD/g;function Zh(n){return(typeof n=="string"?n:""+n).replace(K0,`
`).replace(Z0,"")}function Io(n,i,a){if(i=Zh(i),Zh(n)!==i&&a)throw Error(t(425))}function Uo(){}var jc=null,Xc=null;function Yc(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var qc=typeof setTimeout=="function"?setTimeout:void 0,J0=typeof clearTimeout=="function"?clearTimeout:void 0,Jh=typeof Promise=="function"?Promise:void 0,Q0=typeof queueMicrotask=="function"?queueMicrotask:typeof Jh<"u"?function(n){return Jh.resolve(null).then(n).catch(ev)}:qc;function ev(n){setTimeout(function(){throw n})}function $c(n,i){var a=i,c=0;do{var d=a.nextSibling;if(n.removeChild(a),d&&d.nodeType===8)if(a=d.data,a==="/$"){if(c===0){n.removeChild(d),wa(i);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=d}while(a);wa(i)}function mr(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function Qh(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var bs=Math.random().toString(36).slice(2),Ri="__reactFiber$"+bs,Fa="__reactProps$"+bs,Wi="__reactContainer$"+bs,Kc="__reactEvents$"+bs,tv="__reactListeners$"+bs,nv="__reactHandles$"+bs;function qr(n){var i=n[Ri];if(i)return i;for(var a=n.parentNode;a;){if(i=a[Wi]||a[Ri]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=Qh(n);n!==null;){if(a=n[Ri])return a;n=Qh(n)}return i}n=a,a=n.parentNode}return null}function Oa(n){return n=n[Ri]||n[Wi],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function As(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Fo(n){return n[Fa]||null}var Zc=[],Rs=-1;function gr(n){return{current:n}}function Wt(n){0>Rs||(n.current=Zc[Rs],Zc[Rs]=null,Rs--)}function zt(n,i){Rs++,Zc[Rs]=n.current,n.current=i}var _r={},Sn=gr(_r),Un=gr(!1),$r=_r;function Cs(n,i){var a=n.type.contextTypes;if(!a)return _r;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var d={},m;for(m in a)d[m]=i[m];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=d),d}function Fn(n){return n=n.childContextTypes,n!=null}function Oo(){Wt(Un),Wt(Sn)}function ep(n,i,a){if(Sn.current!==_r)throw Error(t(168));zt(Sn,i),zt(Un,a)}function tp(n,i,a){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var d in c)if(!(d in i))throw Error(t(108,Se(n)||"Unknown",d));return le({},a,c)}function ko(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||_r,$r=Sn.current,zt(Sn,n),zt(Un,Un.current),!0}function np(n,i,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=tp(n,i,$r),c.__reactInternalMemoizedMergedChildContext=n,Wt(Un),Wt(Sn),zt(Sn,n)):Wt(Un),zt(Un,a)}var ji=null,Bo=!1,Jc=!1;function ip(n){ji===null?ji=[n]:ji.push(n)}function iv(n){Bo=!0,ip(n)}function vr(){if(!Jc&&ji!==null){Jc=!0;var n=0,i=_t;try{var a=ji;for(_t=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}ji=null,Bo=!1}catch(d){throw ji!==null&&(ji=ji.slice(n+1)),yo(ya,vr),d}finally{_t=i,Jc=!1}}return null}var Ps=[],Ls=0,zo=null,Ho=0,ti=[],ni=0,Kr=null,Xi=1,Yi="";function Zr(n,i){Ps[Ls++]=Ho,Ps[Ls++]=zo,zo=n,Ho=i}function rp(n,i,a){ti[ni++]=Xi,ti[ni++]=Yi,ti[ni++]=Kr,Kr=n;var c=Xi;n=Yi;var d=32-Re(c)-1;c&=~(1<<d),a+=1;var m=32-Re(i)+d;if(30<m){var w=d-d%5;m=(c&(1<<w)-1).toString(32),c>>=w,d-=w,Xi=1<<32-Re(i)+d|a<<d|c,Yi=m+n}else Xi=1<<m|a<<d|c,Yi=n}function Qc(n){n.return!==null&&(Zr(n,1),rp(n,1,0))}function eu(n){for(;n===zo;)zo=Ps[--Ls],Ps[Ls]=null,Ho=Ps[--Ls],Ps[Ls]=null;for(;n===Kr;)Kr=ti[--ni],ti[ni]=null,Yi=ti[--ni],ti[ni]=null,Xi=ti[--ni],ti[ni]=null}var Xn=null,Yn=null,Xt=!1,pi=null;function sp(n,i){var a=ai(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function ap(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Xn=n,Yn=mr(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Xn=n,Yn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=Kr!==null?{id:Xi,overflow:Yi}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=ai(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,Xn=n,Yn=null,!0):!1;default:return!1}}function tu(n){return(n.mode&1)!==0&&(n.flags&128)===0}function nu(n){if(Xt){var i=Yn;if(i){var a=i;if(!ap(n,i)){if(tu(n))throw Error(t(418));i=mr(a.nextSibling);var c=Xn;i&&ap(n,i)?sp(c,a):(n.flags=n.flags&-4097|2,Xt=!1,Xn=n)}}else{if(tu(n))throw Error(t(418));n.flags=n.flags&-4097|2,Xt=!1,Xn=n}}}function op(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Xn=n}function Vo(n){if(n!==Xn)return!1;if(!Xt)return op(n),Xt=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!Yc(n.type,n.memoizedProps)),i&&(i=Yn)){if(tu(n))throw lp(),Error(t(418));for(;i;)sp(n,i),i=mr(i.nextSibling)}if(op(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){Yn=mr(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}Yn=null}}else Yn=Xn?mr(n.stateNode.nextSibling):null;return!0}function lp(){for(var n=Yn;n;)n=mr(n.nextSibling)}function Ds(){Yn=Xn=null,Xt=!1}function iu(n){pi===null?pi=[n]:pi.push(n)}var rv=P.ReactCurrentBatchConfig;function ka(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var d=c,m=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===m?i.ref:(i=function(w){var U=d.refs;w===null?delete U[m]:U[m]=w},i._stringRef=m,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Go(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function cp(n){var i=n._init;return i(n._payload)}function up(n){function i(J,W){if(n){var ne=J.deletions;ne===null?(J.deletions=[W],J.flags|=16):ne.push(W)}}function a(J,W){if(!n)return null;for(;W!==null;)i(J,W),W=W.sibling;return null}function c(J,W){for(J=new Map;W!==null;)W.key!==null?J.set(W.key,W):J.set(W.index,W),W=W.sibling;return J}function d(J,W){return J=br(J,W),J.index=0,J.sibling=null,J}function m(J,W,ne){return J.index=ne,n?(ne=J.alternate,ne!==null?(ne=ne.index,ne<W?(J.flags|=2,W):ne):(J.flags|=2,W)):(J.flags|=1048576,W)}function w(J){return n&&J.alternate===null&&(J.flags|=2),J}function U(J,W,ne,we){return W===null||W.tag!==6?(W=qu(ne,J.mode,we),W.return=J,W):(W=d(W,ne),W.return=J,W)}function H(J,W,ne,we){var Ke=ne.type;return Ke===z?ye(J,W,ne.props.children,we,ne.key):W!==null&&(W.elementType===Ke||typeof Ke=="object"&&Ke!==null&&Ke.$$typeof===ie&&cp(Ke)===W.type)?(we=d(W,ne.props),we.ref=ka(J,W,ne),we.return=J,we):(we=hl(ne.type,ne.key,ne.props,null,J.mode,we),we.ref=ka(J,W,ne),we.return=J,we)}function se(J,W,ne,we){return W===null||W.tag!==4||W.stateNode.containerInfo!==ne.containerInfo||W.stateNode.implementation!==ne.implementation?(W=$u(ne,J.mode,we),W.return=J,W):(W=d(W,ne.children||[]),W.return=J,W)}function ye(J,W,ne,we,Ke){return W===null||W.tag!==7?(W=ss(ne,J.mode,we,Ke),W.return=J,W):(W=d(W,ne),W.return=J,W)}function Me(J,W,ne){if(typeof W=="string"&&W!==""||typeof W=="number")return W=qu(""+W,J.mode,ne),W.return=J,W;if(typeof W=="object"&&W!==null){switch(W.$$typeof){case k:return ne=hl(W.type,W.key,W.props,null,J.mode,ne),ne.ref=ka(J,null,W),ne.return=J,ne;case I:return W=$u(W,J.mode,ne),W.return=J,W;case ie:var we=W._init;return Me(J,we(W._payload),ne)}if(G(W)||ce(W))return W=ss(W,J.mode,ne,null),W.return=J,W;Go(J,W)}return null}function xe(J,W,ne,we){var Ke=W!==null?W.key:null;if(typeof ne=="string"&&ne!==""||typeof ne=="number")return Ke!==null?null:U(J,W,""+ne,we);if(typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case k:return ne.key===Ke?H(J,W,ne,we):null;case I:return ne.key===Ke?se(J,W,ne,we):null;case ie:return Ke=ne._init,xe(J,W,Ke(ne._payload),we)}if(G(ne)||ce(ne))return Ke!==null?null:ye(J,W,ne,we,null);Go(J,ne)}return null}function He(J,W,ne,we,Ke){if(typeof we=="string"&&we!==""||typeof we=="number")return J=J.get(ne)||null,U(W,J,""+we,Ke);if(typeof we=="object"&&we!==null){switch(we.$$typeof){case k:return J=J.get(we.key===null?ne:we.key)||null,H(W,J,we,Ke);case I:return J=J.get(we.key===null?ne:we.key)||null,se(W,J,we,Ke);case ie:var et=we._init;return He(J,W,ne,et(we._payload),Ke)}if(G(we)||ce(we))return J=J.get(ne)||null,ye(W,J,we,Ke,null);Go(W,we)}return null}function je(J,W,ne,we){for(var Ke=null,et=null,tt=W,rt=W=0,hn=null;tt!==null&&rt<ne.length;rt++){tt.index>rt?(hn=tt,tt=null):hn=tt.sibling;var At=xe(J,tt,ne[rt],we);if(At===null){tt===null&&(tt=hn);break}n&&tt&&At.alternate===null&&i(J,tt),W=m(At,W,rt),et===null?Ke=At:et.sibling=At,et=At,tt=hn}if(rt===ne.length)return a(J,tt),Xt&&Zr(J,rt),Ke;if(tt===null){for(;rt<ne.length;rt++)tt=Me(J,ne[rt],we),tt!==null&&(W=m(tt,W,rt),et===null?Ke=tt:et.sibling=tt,et=tt);return Xt&&Zr(J,rt),Ke}for(tt=c(J,tt);rt<ne.length;rt++)hn=He(tt,J,rt,ne[rt],we),hn!==null&&(n&&hn.alternate!==null&&tt.delete(hn.key===null?rt:hn.key),W=m(hn,W,rt),et===null?Ke=hn:et.sibling=hn,et=hn);return n&&tt.forEach(function(Ar){return i(J,Ar)}),Xt&&Zr(J,rt),Ke}function qe(J,W,ne,we){var Ke=ce(ne);if(typeof Ke!="function")throw Error(t(150));if(ne=Ke.call(ne),ne==null)throw Error(t(151));for(var et=Ke=null,tt=W,rt=W=0,hn=null,At=ne.next();tt!==null&&!At.done;rt++,At=ne.next()){tt.index>rt?(hn=tt,tt=null):hn=tt.sibling;var Ar=xe(J,tt,At.value,we);if(Ar===null){tt===null&&(tt=hn);break}n&&tt&&Ar.alternate===null&&i(J,tt),W=m(Ar,W,rt),et===null?Ke=Ar:et.sibling=Ar,et=Ar,tt=hn}if(At.done)return a(J,tt),Xt&&Zr(J,rt),Ke;if(tt===null){for(;!At.done;rt++,At=ne.next())At=Me(J,At.value,we),At!==null&&(W=m(At,W,rt),et===null?Ke=At:et.sibling=At,et=At);return Xt&&Zr(J,rt),Ke}for(tt=c(J,tt);!At.done;rt++,At=ne.next())At=He(tt,J,rt,At.value,we),At!==null&&(n&&At.alternate!==null&&tt.delete(At.key===null?rt:At.key),W=m(At,W,rt),et===null?Ke=At:et.sibling=At,et=At);return n&&tt.forEach(function(Ov){return i(J,Ov)}),Xt&&Zr(J,rt),Ke}function en(J,W,ne,we){if(typeof ne=="object"&&ne!==null&&ne.type===z&&ne.key===null&&(ne=ne.props.children),typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case k:e:{for(var Ke=ne.key,et=W;et!==null;){if(et.key===Ke){if(Ke=ne.type,Ke===z){if(et.tag===7){a(J,et.sibling),W=d(et,ne.props.children),W.return=J,J=W;break e}}else if(et.elementType===Ke||typeof Ke=="object"&&Ke!==null&&Ke.$$typeof===ie&&cp(Ke)===et.type){a(J,et.sibling),W=d(et,ne.props),W.ref=ka(J,et,ne),W.return=J,J=W;break e}a(J,et);break}else i(J,et);et=et.sibling}ne.type===z?(W=ss(ne.props.children,J.mode,we,ne.key),W.return=J,J=W):(we=hl(ne.type,ne.key,ne.props,null,J.mode,we),we.ref=ka(J,W,ne),we.return=J,J=we)}return w(J);case I:e:{for(et=ne.key;W!==null;){if(W.key===et)if(W.tag===4&&W.stateNode.containerInfo===ne.containerInfo&&W.stateNode.implementation===ne.implementation){a(J,W.sibling),W=d(W,ne.children||[]),W.return=J,J=W;break e}else{a(J,W);break}else i(J,W);W=W.sibling}W=$u(ne,J.mode,we),W.return=J,J=W}return w(J);case ie:return et=ne._init,en(J,W,et(ne._payload),we)}if(G(ne))return je(J,W,ne,we);if(ce(ne))return qe(J,W,ne,we);Go(J,ne)}return typeof ne=="string"&&ne!==""||typeof ne=="number"?(ne=""+ne,W!==null&&W.tag===6?(a(J,W.sibling),W=d(W,ne),W.return=J,J=W):(a(J,W),W=qu(ne,J.mode,we),W.return=J,J=W),w(J)):a(J,W)}return en}var Ns=up(!0),dp=up(!1),Wo=gr(null),jo=null,Is=null,ru=null;function su(){ru=Is=jo=null}function au(n){var i=Wo.current;Wt(Wo),n._currentValue=i}function ou(n,i,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===a)break;n=n.return}}function Us(n,i){jo=n,ru=Is=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(On=!0),n.firstContext=null)}function ii(n){var i=n._currentValue;if(ru!==n)if(n={context:n,memoizedValue:i,next:null},Is===null){if(jo===null)throw Error(t(308));Is=n,jo.dependencies={lanes:0,firstContext:n}}else Is=Is.next=n;return i}var Jr=null;function lu(n){Jr===null?Jr=[n]:Jr.push(n)}function fp(n,i,a,c){var d=i.interleaved;return d===null?(a.next=a,lu(i)):(a.next=d.next,d.next=a),i.interleaved=a,qi(n,c)}function qi(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var xr=!1;function cu(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function hp(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function $i(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function yr(n,i,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(Tt&2)!==0){var d=c.pending;return d===null?i.next=i:(i.next=d.next,d.next=i),c.pending=i,qi(n,a)}return d=c.interleaved,d===null?(i.next=i,lu(c)):(i.next=d.next,d.next=i),c.interleaved=i,qi(n,a)}function Xo(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,In(n,a)}}function pp(n,i){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var d=null,m=null;if(a=a.firstBaseUpdate,a!==null){do{var w={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};m===null?d=m=w:m=m.next=w,a=a.next}while(a!==null);m===null?d=m=i:m=m.next=i}else d=m=i;a={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:m,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function Yo(n,i,a,c){var d=n.updateQueue;xr=!1;var m=d.firstBaseUpdate,w=d.lastBaseUpdate,U=d.shared.pending;if(U!==null){d.shared.pending=null;var H=U,se=H.next;H.next=null,w===null?m=se:w.next=se,w=H;var ye=n.alternate;ye!==null&&(ye=ye.updateQueue,U=ye.lastBaseUpdate,U!==w&&(U===null?ye.firstBaseUpdate=se:U.next=se,ye.lastBaseUpdate=H))}if(m!==null){var Me=d.baseState;w=0,ye=se=H=null,U=m;do{var xe=U.lane,He=U.eventTime;if((c&xe)===xe){ye!==null&&(ye=ye.next={eventTime:He,lane:0,tag:U.tag,payload:U.payload,callback:U.callback,next:null});e:{var je=n,qe=U;switch(xe=i,He=a,qe.tag){case 1:if(je=qe.payload,typeof je=="function"){Me=je.call(He,Me,xe);break e}Me=je;break e;case 3:je.flags=je.flags&-65537|128;case 0:if(je=qe.payload,xe=typeof je=="function"?je.call(He,Me,xe):je,xe==null)break e;Me=le({},Me,xe);break e;case 2:xr=!0}}U.callback!==null&&U.lane!==0&&(n.flags|=64,xe=d.effects,xe===null?d.effects=[U]:xe.push(U))}else He={eventTime:He,lane:xe,tag:U.tag,payload:U.payload,callback:U.callback,next:null},ye===null?(se=ye=He,H=Me):ye=ye.next=He,w|=xe;if(U=U.next,U===null){if(U=d.shared.pending,U===null)break;xe=U,U=xe.next,xe.next=null,d.lastBaseUpdate=xe,d.shared.pending=null}}while(!0);if(ye===null&&(H=Me),d.baseState=H,d.firstBaseUpdate=se,d.lastBaseUpdate=ye,i=d.shared.interleaved,i!==null){d=i;do w|=d.lane,d=d.next;while(d!==i)}else m===null&&(d.shared.lanes=0);ts|=w,n.lanes=w,n.memoizedState=Me}}function mp(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],d=c.callback;if(d!==null){if(c.callback=null,c=a,typeof d!="function")throw Error(t(191,d));d.call(c)}}}var Ba={},Ci=gr(Ba),za=gr(Ba),Ha=gr(Ba);function Qr(n){if(n===Ba)throw Error(t(174));return n}function uu(n,i){switch(zt(Ha,i),zt(za,n),zt(Ci,Ba),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:E(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=E(i,n)}Wt(Ci),zt(Ci,i)}function Fs(){Wt(Ci),Wt(za),Wt(Ha)}function gp(n){Qr(Ha.current);var i=Qr(Ci.current),a=E(i,n.type);i!==a&&(zt(za,n),zt(Ci,a))}function du(n){za.current===n&&(Wt(Ci),Wt(za))}var $t=gr(0);function qo(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var fu=[];function hu(){for(var n=0;n<fu.length;n++)fu[n]._workInProgressVersionPrimary=null;fu.length=0}var $o=P.ReactCurrentDispatcher,pu=P.ReactCurrentBatchConfig,es=0,Kt=null,an=null,dn=null,Ko=!1,Va=!1,Ga=0,sv=0;function Mn(){throw Error(t(321))}function mu(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!hi(n[a],i[a]))return!1;return!0}function gu(n,i,a,c,d,m){if(es=m,Kt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,$o.current=n===null||n.memoizedState===null?cv:uv,n=a(c,d),Va){m=0;do{if(Va=!1,Ga=0,25<=m)throw Error(t(301));m+=1,dn=an=null,i.updateQueue=null,$o.current=dv,n=a(c,d)}while(Va)}if($o.current=Qo,i=an!==null&&an.next!==null,es=0,dn=an=Kt=null,Ko=!1,i)throw Error(t(300));return n}function _u(){var n=Ga!==0;return Ga=0,n}function Pi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return dn===null?Kt.memoizedState=dn=n:dn=dn.next=n,dn}function ri(){if(an===null){var n=Kt.alternate;n=n!==null?n.memoizedState:null}else n=an.next;var i=dn===null?Kt.memoizedState:dn.next;if(i!==null)dn=i,an=n;else{if(n===null)throw Error(t(310));an=n,n={memoizedState:an.memoizedState,baseState:an.baseState,baseQueue:an.baseQueue,queue:an.queue,next:null},dn===null?Kt.memoizedState=dn=n:dn=dn.next=n}return dn}function Wa(n,i){return typeof i=="function"?i(n):i}function vu(n){var i=ri(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=an,d=c.baseQueue,m=a.pending;if(m!==null){if(d!==null){var w=d.next;d.next=m.next,m.next=w}c.baseQueue=d=m,a.pending=null}if(d!==null){m=d.next,c=c.baseState;var U=w=null,H=null,se=m;do{var ye=se.lane;if((es&ye)===ye)H!==null&&(H=H.next={lane:0,action:se.action,hasEagerState:se.hasEagerState,eagerState:se.eagerState,next:null}),c=se.hasEagerState?se.eagerState:n(c,se.action);else{var Me={lane:ye,action:se.action,hasEagerState:se.hasEagerState,eagerState:se.eagerState,next:null};H===null?(U=H=Me,w=c):H=H.next=Me,Kt.lanes|=ye,ts|=ye}se=se.next}while(se!==null&&se!==m);H===null?w=c:H.next=U,hi(c,i.memoizedState)||(On=!0),i.memoizedState=c,i.baseState=w,i.baseQueue=H,a.lastRenderedState=c}if(n=a.interleaved,n!==null){d=n;do m=d.lane,Kt.lanes|=m,ts|=m,d=d.next;while(d!==n)}else d===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function xu(n){var i=ri(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,d=a.pending,m=i.memoizedState;if(d!==null){a.pending=null;var w=d=d.next;do m=n(m,w.action),w=w.next;while(w!==d);hi(m,i.memoizedState)||(On=!0),i.memoizedState=m,i.baseQueue===null&&(i.baseState=m),a.lastRenderedState=m}return[m,c]}function _p(){}function vp(n,i){var a=Kt,c=ri(),d=i(),m=!hi(c.memoizedState,d);if(m&&(c.memoizedState=d,On=!0),c=c.queue,yu(Sp.bind(null,a,c,n),[n]),c.getSnapshot!==i||m||dn!==null&&dn.memoizedState.tag&1){if(a.flags|=2048,ja(9,yp.bind(null,a,c,d,i),void 0,null),fn===null)throw Error(t(349));(es&30)!==0||xp(a,i,d)}return d}function xp(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=Kt.updateQueue,i===null?(i={lastEffect:null,stores:null},Kt.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function yp(n,i,a,c){i.value=a,i.getSnapshot=c,Mp(i)&&Ep(n)}function Sp(n,i,a){return a(function(){Mp(i)&&Ep(n)})}function Mp(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!hi(n,a)}catch{return!0}}function Ep(n){var i=qi(n,1);i!==null&&vi(i,n,1,-1)}function Tp(n){var i=Pi();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Wa,lastRenderedState:n},i.queue=n,n=n.dispatch=lv.bind(null,Kt,n),[i.memoizedState,n]}function ja(n,i,a,c){return n={tag:n,create:i,destroy:a,deps:c,next:null},i=Kt.updateQueue,i===null?(i={lastEffect:null,stores:null},Kt.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,i.lastEffect=n)),n}function wp(){return ri().memoizedState}function Zo(n,i,a,c){var d=Pi();Kt.flags|=n,d.memoizedState=ja(1|i,a,void 0,c===void 0?null:c)}function Jo(n,i,a,c){var d=ri();c=c===void 0?null:c;var m=void 0;if(an!==null){var w=an.memoizedState;if(m=w.destroy,c!==null&&mu(c,w.deps)){d.memoizedState=ja(i,a,m,c);return}}Kt.flags|=n,d.memoizedState=ja(1|i,a,m,c)}function bp(n,i){return Zo(8390656,8,n,i)}function yu(n,i){return Jo(2048,8,n,i)}function Ap(n,i){return Jo(4,2,n,i)}function Rp(n,i){return Jo(4,4,n,i)}function Cp(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function Pp(n,i,a){return a=a!=null?a.concat([n]):null,Jo(4,4,Cp.bind(null,i,n),a)}function Su(){}function Lp(n,i){var a=ri();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&mu(i,c[1])?c[0]:(a.memoizedState=[n,i],n)}function Dp(n,i){var a=ri();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&mu(i,c[1])?c[0]:(n=n(),a.memoizedState=[n,i],n)}function Np(n,i,a){return(es&21)===0?(n.baseState&&(n.baseState=!1,On=!0),n.memoizedState=a):(hi(a,i)||(a=ze(),Kt.lanes|=a,ts|=a,n.baseState=!0),i)}function av(n,i){var a=_t;_t=a!==0&&4>a?a:4,n(!0);var c=pu.transition;pu.transition={};try{n(!1),i()}finally{_t=a,pu.transition=c}}function Ip(){return ri().memoizedState}function ov(n,i,a){var c=Tr(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},Up(n))Fp(i,a);else if(a=fp(n,i,a,c),a!==null){var d=Pn();vi(a,n,c,d),Op(a,i,c)}}function lv(n,i,a){var c=Tr(n),d={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(Up(n))Fp(i,d);else{var m=n.alternate;if(n.lanes===0&&(m===null||m.lanes===0)&&(m=i.lastRenderedReducer,m!==null))try{var w=i.lastRenderedState,U=m(w,a);if(d.hasEagerState=!0,d.eagerState=U,hi(U,w)){var H=i.interleaved;H===null?(d.next=d,lu(i)):(d.next=H.next,H.next=d),i.interleaved=d;return}}catch{}finally{}a=fp(n,i,d,c),a!==null&&(d=Pn(),vi(a,n,c,d),Op(a,i,c))}}function Up(n){var i=n.alternate;return n===Kt||i!==null&&i===Kt}function Fp(n,i){Va=Ko=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function Op(n,i,a){if((a&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,In(n,a)}}var Qo={readContext:ii,useCallback:Mn,useContext:Mn,useEffect:Mn,useImperativeHandle:Mn,useInsertionEffect:Mn,useLayoutEffect:Mn,useMemo:Mn,useReducer:Mn,useRef:Mn,useState:Mn,useDebugValue:Mn,useDeferredValue:Mn,useTransition:Mn,useMutableSource:Mn,useSyncExternalStore:Mn,useId:Mn,unstable_isNewReconciler:!1},cv={readContext:ii,useCallback:function(n,i){return Pi().memoizedState=[n,i===void 0?null:i],n},useContext:ii,useEffect:bp,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,Zo(4194308,4,Cp.bind(null,i,n),a)},useLayoutEffect:function(n,i){return Zo(4194308,4,n,i)},useInsertionEffect:function(n,i){return Zo(4,2,n,i)},useMemo:function(n,i){var a=Pi();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var c=Pi();return i=a!==void 0?a(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=ov.bind(null,Kt,n),[c.memoizedState,n]},useRef:function(n){var i=Pi();return n={current:n},i.memoizedState=n},useState:Tp,useDebugValue:Su,useDeferredValue:function(n){return Pi().memoizedState=n},useTransition:function(){var n=Tp(!1),i=n[0];return n=av.bind(null,n[1]),Pi().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var c=Kt,d=Pi();if(Xt){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),fn===null)throw Error(t(349));(es&30)!==0||xp(c,i,a)}d.memoizedState=a;var m={value:a,getSnapshot:i};return d.queue=m,bp(Sp.bind(null,c,m,n),[n]),c.flags|=2048,ja(9,yp.bind(null,c,m,a,i),void 0,null),a},useId:function(){var n=Pi(),i=fn.identifierPrefix;if(Xt){var a=Yi,c=Xi;a=(c&~(1<<32-Re(c)-1)).toString(32)+a,i=":"+i+"R"+a,a=Ga++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=sv++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},uv={readContext:ii,useCallback:Lp,useContext:ii,useEffect:yu,useImperativeHandle:Pp,useInsertionEffect:Ap,useLayoutEffect:Rp,useMemo:Dp,useReducer:vu,useRef:wp,useState:function(){return vu(Wa)},useDebugValue:Su,useDeferredValue:function(n){var i=ri();return Np(i,an.memoizedState,n)},useTransition:function(){var n=vu(Wa)[0],i=ri().memoizedState;return[n,i]},useMutableSource:_p,useSyncExternalStore:vp,useId:Ip,unstable_isNewReconciler:!1},dv={readContext:ii,useCallback:Lp,useContext:ii,useEffect:yu,useImperativeHandle:Pp,useInsertionEffect:Ap,useLayoutEffect:Rp,useMemo:Dp,useReducer:xu,useRef:wp,useState:function(){return xu(Wa)},useDebugValue:Su,useDeferredValue:function(n){var i=ri();return an===null?i.memoizedState=n:Np(i,an.memoizedState,n)},useTransition:function(){var n=xu(Wa)[0],i=ri().memoizedState;return[n,i]},useMutableSource:_p,useSyncExternalStore:vp,useId:Ip,unstable_isNewReconciler:!1};function mi(n,i){if(n&&n.defaultProps){i=le({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function Mu(n,i,a,c){i=n.memoizedState,a=a(c,i),a=a==null?i:le({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var el={isMounted:function(n){return(n=n._reactInternals)?bi(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var c=Pn(),d=Tr(n),m=$i(c,d);m.payload=i,a!=null&&(m.callback=a),i=yr(n,m,d),i!==null&&(vi(i,n,d,c),Xo(i,n,d))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var c=Pn(),d=Tr(n),m=$i(c,d);m.tag=1,m.payload=i,a!=null&&(m.callback=a),i=yr(n,m,d),i!==null&&(vi(i,n,d,c),Xo(i,n,d))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=Pn(),c=Tr(n),d=$i(a,c);d.tag=2,i!=null&&(d.callback=i),i=yr(n,d,c),i!==null&&(vi(i,n,c,a),Xo(i,n,c))}};function kp(n,i,a,c,d,m,w){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,m,w):i.prototype&&i.prototype.isPureReactComponent?!La(a,c)||!La(d,m):!0}function Bp(n,i,a){var c=!1,d=_r,m=i.contextType;return typeof m=="object"&&m!==null?m=ii(m):(d=Fn(i)?$r:Sn.current,c=i.contextTypes,m=(c=c!=null)?Cs(n,d):_r),i=new i(a,m),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=el,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=d,n.__reactInternalMemoizedMaskedChildContext=m),i}function zp(n,i,a,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,c),i.state!==n&&el.enqueueReplaceState(i,i.state,null)}function Eu(n,i,a,c){var d=n.stateNode;d.props=a,d.state=n.memoizedState,d.refs={},cu(n);var m=i.contextType;typeof m=="object"&&m!==null?d.context=ii(m):(m=Fn(i)?$r:Sn.current,d.context=Cs(n,m)),d.state=n.memoizedState,m=i.getDerivedStateFromProps,typeof m=="function"&&(Mu(n,i,m,a),d.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(i=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),i!==d.state&&el.enqueueReplaceState(d,d.state,null),Yo(n,a,d,c),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308)}function Os(n,i){try{var a="",c=i;do a+=Ie(c),c=c.return;while(c);var d=a}catch(m){d=`
Error generating stack: `+m.message+`
`+m.stack}return{value:n,source:i,stack:d,digest:null}}function Tu(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function wu(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var fv=typeof WeakMap=="function"?WeakMap:Map;function Hp(n,i,a){a=$i(-1,a),a.tag=3,a.payload={element:null};var c=i.value;return a.callback=function(){ol||(ol=!0,zu=c),wu(n,i)},a}function Vp(n,i,a){a=$i(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;a.payload=function(){return c(d)},a.callback=function(){wu(n,i)}}var m=n.stateNode;return m!==null&&typeof m.componentDidCatch=="function"&&(a.callback=function(){wu(n,i),typeof c!="function"&&(Mr===null?Mr=new Set([this]):Mr.add(this));var w=i.stack;this.componentDidCatch(i.value,{componentStack:w!==null?w:""})}),a}function Gp(n,i,a){var c=n.pingCache;if(c===null){c=n.pingCache=new fv;var d=new Set;c.set(i,d)}else d=c.get(i),d===void 0&&(d=new Set,c.set(i,d));d.has(a)||(d.add(a),n=bv.bind(null,n,i,a),i.then(n,n))}function Wp(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function jp(n,i,a,c,d){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=$i(-1,1),i.tag=2,yr(a,i,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=d,n)}var hv=P.ReactCurrentOwner,On=!1;function Cn(n,i,a,c){i.child=n===null?dp(i,null,a,c):Ns(i,n.child,a,c)}function Xp(n,i,a,c,d){a=a.render;var m=i.ref;return Us(i,d),c=gu(n,i,a,c,m,d),a=_u(),n!==null&&!On?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,Ki(n,i,d)):(Xt&&a&&Qc(i),i.flags|=1,Cn(n,i,c,d),i.child)}function Yp(n,i,a,c,d){if(n===null){var m=a.type;return typeof m=="function"&&!Yu(m)&&m.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=m,qp(n,i,m,c,d)):(n=hl(a.type,null,c,i,i.mode,d),n.ref=i.ref,n.return=i,i.child=n)}if(m=n.child,(n.lanes&d)===0){var w=m.memoizedProps;if(a=a.compare,a=a!==null?a:La,a(w,c)&&n.ref===i.ref)return Ki(n,i,d)}return i.flags|=1,n=br(m,c),n.ref=i.ref,n.return=i,i.child=n}function qp(n,i,a,c,d){if(n!==null){var m=n.memoizedProps;if(La(m,c)&&n.ref===i.ref)if(On=!1,i.pendingProps=c=m,(n.lanes&d)!==0)(n.flags&131072)!==0&&(On=!0);else return i.lanes=n.lanes,Ki(n,i,d)}return bu(n,i,a,c,d)}function $p(n,i,a){var c=i.pendingProps,d=c.children,m=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},zt(Bs,qn),qn|=a;else{if((a&1073741824)===0)return n=m!==null?m.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,zt(Bs,qn),qn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=m!==null?m.baseLanes:a,zt(Bs,qn),qn|=c}else m!==null?(c=m.baseLanes|a,i.memoizedState=null):c=a,zt(Bs,qn),qn|=c;return Cn(n,i,d,a),i.child}function Kp(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function bu(n,i,a,c,d){var m=Fn(a)?$r:Sn.current;return m=Cs(i,m),Us(i,d),a=gu(n,i,a,c,m,d),c=_u(),n!==null&&!On?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,Ki(n,i,d)):(Xt&&c&&Qc(i),i.flags|=1,Cn(n,i,a,d),i.child)}function Zp(n,i,a,c,d){if(Fn(a)){var m=!0;ko(i)}else m=!1;if(Us(i,d),i.stateNode===null)nl(n,i),Bp(i,a,c),Eu(i,a,c,d),c=!0;else if(n===null){var w=i.stateNode,U=i.memoizedProps;w.props=U;var H=w.context,se=a.contextType;typeof se=="object"&&se!==null?se=ii(se):(se=Fn(a)?$r:Sn.current,se=Cs(i,se));var ye=a.getDerivedStateFromProps,Me=typeof ye=="function"||typeof w.getSnapshotBeforeUpdate=="function";Me||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(U!==c||H!==se)&&zp(i,w,c,se),xr=!1;var xe=i.memoizedState;w.state=xe,Yo(i,c,w,d),H=i.memoizedState,U!==c||xe!==H||Un.current||xr?(typeof ye=="function"&&(Mu(i,a,ye,c),H=i.memoizedState),(U=xr||kp(i,a,U,c,xe,H,se))?(Me||typeof w.UNSAFE_componentWillMount!="function"&&typeof w.componentWillMount!="function"||(typeof w.componentWillMount=="function"&&w.componentWillMount(),typeof w.UNSAFE_componentWillMount=="function"&&w.UNSAFE_componentWillMount()),typeof w.componentDidMount=="function"&&(i.flags|=4194308)):(typeof w.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=H),w.props=c,w.state=H,w.context=se,c=U):(typeof w.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{w=i.stateNode,hp(n,i),U=i.memoizedProps,se=i.type===i.elementType?U:mi(i.type,U),w.props=se,Me=i.pendingProps,xe=w.context,H=a.contextType,typeof H=="object"&&H!==null?H=ii(H):(H=Fn(a)?$r:Sn.current,H=Cs(i,H));var He=a.getDerivedStateFromProps;(ye=typeof He=="function"||typeof w.getSnapshotBeforeUpdate=="function")||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(U!==Me||xe!==H)&&zp(i,w,c,H),xr=!1,xe=i.memoizedState,w.state=xe,Yo(i,c,w,d);var je=i.memoizedState;U!==Me||xe!==je||Un.current||xr?(typeof He=="function"&&(Mu(i,a,He,c),je=i.memoizedState),(se=xr||kp(i,a,se,c,xe,je,H)||!1)?(ye||typeof w.UNSAFE_componentWillUpdate!="function"&&typeof w.componentWillUpdate!="function"||(typeof w.componentWillUpdate=="function"&&w.componentWillUpdate(c,je,H),typeof w.UNSAFE_componentWillUpdate=="function"&&w.UNSAFE_componentWillUpdate(c,je,H)),typeof w.componentDidUpdate=="function"&&(i.flags|=4),typeof w.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof w.componentDidUpdate!="function"||U===n.memoizedProps&&xe===n.memoizedState||(i.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||U===n.memoizedProps&&xe===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=je),w.props=c,w.state=je,w.context=H,c=se):(typeof w.componentDidUpdate!="function"||U===n.memoizedProps&&xe===n.memoizedState||(i.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||U===n.memoizedProps&&xe===n.memoizedState||(i.flags|=1024),c=!1)}return Au(n,i,a,c,m,d)}function Au(n,i,a,c,d,m){Kp(n,i);var w=(i.flags&128)!==0;if(!c&&!w)return d&&np(i,a,!1),Ki(n,i,m);c=i.stateNode,hv.current=i;var U=w&&typeof a.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&w?(i.child=Ns(i,n.child,null,m),i.child=Ns(i,null,U,m)):Cn(n,i,U,m),i.memoizedState=c.state,d&&np(i,a,!0),i.child}function Jp(n){var i=n.stateNode;i.pendingContext?ep(n,i.pendingContext,i.pendingContext!==i.context):i.context&&ep(n,i.context,!1),uu(n,i.containerInfo)}function Qp(n,i,a,c,d){return Ds(),iu(d),i.flags|=256,Cn(n,i,a,c),i.child}var Ru={dehydrated:null,treeContext:null,retryLane:0};function Cu(n){return{baseLanes:n,cachePool:null,transitions:null}}function em(n,i,a){var c=i.pendingProps,d=$t.current,m=!1,w=(i.flags&128)!==0,U;if((U=w)||(U=n!==null&&n.memoizedState===null?!1:(d&2)!==0),U?(m=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(d|=1),zt($t,d&1),n===null)return nu(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(w=c.children,n=c.fallback,m?(c=i.mode,m=i.child,w={mode:"hidden",children:w},(c&1)===0&&m!==null?(m.childLanes=0,m.pendingProps=w):m=pl(w,c,0,null),n=ss(n,c,a,null),m.return=i,n.return=i,m.sibling=n,i.child=m,i.child.memoizedState=Cu(a),i.memoizedState=Ru,n):Pu(i,w));if(d=n.memoizedState,d!==null&&(U=d.dehydrated,U!==null))return pv(n,i,w,c,U,d,a);if(m){m=c.fallback,w=i.mode,d=n.child,U=d.sibling;var H={mode:"hidden",children:c.children};return(w&1)===0&&i.child!==d?(c=i.child,c.childLanes=0,c.pendingProps=H,i.deletions=null):(c=br(d,H),c.subtreeFlags=d.subtreeFlags&14680064),U!==null?m=br(U,m):(m=ss(m,w,a,null),m.flags|=2),m.return=i,c.return=i,c.sibling=m,i.child=c,c=m,m=i.child,w=n.child.memoizedState,w=w===null?Cu(a):{baseLanes:w.baseLanes|a,cachePool:null,transitions:w.transitions},m.memoizedState=w,m.childLanes=n.childLanes&~a,i.memoizedState=Ru,c}return m=n.child,n=m.sibling,c=br(m,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=a),c.return=i,c.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=c,i.memoizedState=null,c}function Pu(n,i){return i=pl({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function tl(n,i,a,c){return c!==null&&iu(c),Ns(i,n.child,null,a),n=Pu(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function pv(n,i,a,c,d,m,w){if(a)return i.flags&256?(i.flags&=-257,c=Tu(Error(t(422))),tl(n,i,w,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(m=c.fallback,d=i.mode,c=pl({mode:"visible",children:c.children},d,0,null),m=ss(m,d,w,null),m.flags|=2,c.return=i,m.return=i,c.sibling=m,i.child=c,(i.mode&1)!==0&&Ns(i,n.child,null,w),i.child.memoizedState=Cu(w),i.memoizedState=Ru,m);if((i.mode&1)===0)return tl(n,i,w,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var U=c.dgst;return c=U,m=Error(t(419)),c=Tu(m,c,void 0),tl(n,i,w,c)}if(U=(w&n.childLanes)!==0,On||U){if(c=fn,c!==null){switch(w&-w){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|w))!==0?0:d,d!==0&&d!==m.retryLane&&(m.retryLane=d,qi(n,d),vi(c,n,d,-1))}return Xu(),c=Tu(Error(t(421))),tl(n,i,w,c)}return d.data==="$?"?(i.flags|=128,i.child=n.child,i=Av.bind(null,n),d._reactRetry=i,null):(n=m.treeContext,Yn=mr(d.nextSibling),Xn=i,Xt=!0,pi=null,n!==null&&(ti[ni++]=Xi,ti[ni++]=Yi,ti[ni++]=Kr,Xi=n.id,Yi=n.overflow,Kr=i),i=Pu(i,c.children),i.flags|=4096,i)}function tm(n,i,a){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),ou(n.return,i,a)}function Lu(n,i,a,c,d){var m=n.memoizedState;m===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:d}:(m.isBackwards=i,m.rendering=null,m.renderingStartTime=0,m.last=c,m.tail=a,m.tailMode=d)}function nm(n,i,a){var c=i.pendingProps,d=c.revealOrder,m=c.tail;if(Cn(n,i,c.children,a),c=$t.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&tm(n,a,i);else if(n.tag===19)tm(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(zt($t,c),(i.mode&1)===0)i.memoizedState=null;else switch(d){case"forwards":for(a=i.child,d=null;a!==null;)n=a.alternate,n!==null&&qo(n)===null&&(d=a),a=a.sibling;a=d,a===null?(d=i.child,i.child=null):(d=a.sibling,a.sibling=null),Lu(i,!1,d,a,m);break;case"backwards":for(a=null,d=i.child,i.child=null;d!==null;){if(n=d.alternate,n!==null&&qo(n)===null){i.child=d;break}n=d.sibling,d.sibling=a,a=d,d=n}Lu(i,!0,a,null,m);break;case"together":Lu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function nl(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Ki(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),ts|=i.lanes,(a&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=br(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=br(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function mv(n,i,a){switch(i.tag){case 3:Jp(i),Ds();break;case 5:gp(i);break;case 1:Fn(i.type)&&ko(i);break;case 4:uu(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,d=i.memoizedProps.value;zt(Wo,c._currentValue),c._currentValue=d;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(zt($t,$t.current&1),i.flags|=128,null):(a&i.child.childLanes)!==0?em(n,i,a):(zt($t,$t.current&1),n=Ki(n,i,a),n!==null?n.sibling:null);zt($t,$t.current&1);break;case 19:if(c=(a&i.childLanes)!==0,(n.flags&128)!==0){if(c)return nm(n,i,a);i.flags|=128}if(d=i.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),zt($t,$t.current),c)break;return null;case 22:case 23:return i.lanes=0,$p(n,i,a)}return Ki(n,i,a)}var im,Du,rm,sm;im=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},Du=function(){},rm=function(n,i,a,c){var d=n.memoizedProps;if(d!==c){n=i.stateNode,Qr(Ci.current);var m=null;switch(a){case"input":d=wt(n,d),c=wt(n,c),m=[];break;case"select":d=le({},d,{value:void 0}),c=le({},c,{value:void 0}),m=[];break;case"textarea":d=ht(n,d),c=ht(n,c),m=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=Uo)}Be(a,c);var w;a=null;for(se in d)if(!c.hasOwnProperty(se)&&d.hasOwnProperty(se)&&d[se]!=null)if(se==="style"){var U=d[se];for(w in U)U.hasOwnProperty(w)&&(a||(a={}),a[w]="")}else se!=="dangerouslySetInnerHTML"&&se!=="children"&&se!=="suppressContentEditableWarning"&&se!=="suppressHydrationWarning"&&se!=="autoFocus"&&(o.hasOwnProperty(se)?m||(m=[]):(m=m||[]).push(se,null));for(se in c){var H=c[se];if(U=d!=null?d[se]:void 0,c.hasOwnProperty(se)&&H!==U&&(H!=null||U!=null))if(se==="style")if(U){for(w in U)!U.hasOwnProperty(w)||H&&H.hasOwnProperty(w)||(a||(a={}),a[w]="");for(w in H)H.hasOwnProperty(w)&&U[w]!==H[w]&&(a||(a={}),a[w]=H[w])}else a||(m||(m=[]),m.push(se,a)),a=H;else se==="dangerouslySetInnerHTML"?(H=H?H.__html:void 0,U=U?U.__html:void 0,H!=null&&U!==H&&(m=m||[]).push(se,H)):se==="children"?typeof H!="string"&&typeof H!="number"||(m=m||[]).push(se,""+H):se!=="suppressContentEditableWarning"&&se!=="suppressHydrationWarning"&&(o.hasOwnProperty(se)?(H!=null&&se==="onScroll"&&Gt("scroll",n),m||U===H||(m=[])):(m=m||[]).push(se,H))}a&&(m=m||[]).push("style",a);var se=m;(i.updateQueue=se)&&(i.flags|=4)}},sm=function(n,i,a,c){a!==c&&(i.flags|=4)};function Xa(n,i){if(!Xt)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function En(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(i)for(var d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=n,d=d.sibling;else for(d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=n,d=d.sibling;return n.subtreeFlags|=c,n.childLanes=a,i}function gv(n,i,a){var c=i.pendingProps;switch(eu(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return En(i),null;case 1:return Fn(i.type)&&Oo(),En(i),null;case 3:return c=i.stateNode,Fs(),Wt(Un),Wt(Sn),hu(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(Vo(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,pi!==null&&(Gu(pi),pi=null))),Du(n,i),En(i),null;case 5:du(i);var d=Qr(Ha.current);if(a=i.type,n!==null&&i.stateNode!=null)rm(n,i,a,c,d),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return En(i),null}if(n=Qr(Ci.current),Vo(i)){c=i.stateNode,a=i.type;var m=i.memoizedProps;switch(c[Ri]=i,c[Fa]=m,n=(i.mode&1)!==0,a){case"dialog":Gt("cancel",c),Gt("close",c);break;case"iframe":case"object":case"embed":Gt("load",c);break;case"video":case"audio":for(d=0;d<Na.length;d++)Gt(Na[d],c);break;case"source":Gt("error",c);break;case"img":case"image":case"link":Gt("error",c),Gt("load",c);break;case"details":Gt("toggle",c);break;case"input":Nt(c,m),Gt("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!m.multiple},Gt("invalid",c);break;case"textarea":Ct(c,m),Gt("invalid",c)}Be(a,m),d=null;for(var w in m)if(m.hasOwnProperty(w)){var U=m[w];w==="children"?typeof U=="string"?c.textContent!==U&&(m.suppressHydrationWarning!==!0&&Io(c.textContent,U,n),d=["children",U]):typeof U=="number"&&c.textContent!==""+U&&(m.suppressHydrationWarning!==!0&&Io(c.textContent,U,n),d=["children",""+U]):o.hasOwnProperty(w)&&U!=null&&w==="onScroll"&&Gt("scroll",c)}switch(a){case"input":Qe(c),Ot(c,m,!0);break;case"textarea":Qe(c),Ht(c);break;case"select":case"option":break;default:typeof m.onClick=="function"&&(c.onclick=Uo)}c=d,i.updateQueue=c,c!==null&&(i.flags|=4)}else{w=d.nodeType===9?d:d.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=N(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=w.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=w.createElement(a,{is:c.is}):(n=w.createElement(a),a==="select"&&(w=n,c.multiple?w.multiple=!0:c.size&&(w.size=c.size))):n=w.createElementNS(n,a),n[Ri]=i,n[Fa]=c,im(n,i,!1,!1),i.stateNode=n;e:{switch(w=Ae(a,c),a){case"dialog":Gt("cancel",n),Gt("close",n),d=c;break;case"iframe":case"object":case"embed":Gt("load",n),d=c;break;case"video":case"audio":for(d=0;d<Na.length;d++)Gt(Na[d],n);d=c;break;case"source":Gt("error",n),d=c;break;case"img":case"image":case"link":Gt("error",n),Gt("load",n),d=c;break;case"details":Gt("toggle",n),d=c;break;case"input":Nt(n,c),d=wt(n,c),Gt("invalid",n);break;case"option":d=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},d=le({},c,{value:void 0}),Gt("invalid",n);break;case"textarea":Ct(n,c),d=ht(n,c),Gt("invalid",n);break;default:d=c}Be(a,d),U=d;for(m in U)if(U.hasOwnProperty(m)){var H=U[m];m==="style"?pe(n,H):m==="dangerouslySetInnerHTML"?(H=H?H.__html:void 0,H!=null&&he(n,H)):m==="children"?typeof H=="string"?(a!=="textarea"||H!=="")&&_e(n,H):typeof H=="number"&&_e(n,""+H):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(o.hasOwnProperty(m)?H!=null&&m==="onScroll"&&Gt("scroll",n):H!=null&&L(n,m,H,w))}switch(a){case"input":Qe(n),Ot(n,c,!1);break;case"textarea":Qe(n),Ht(n);break;case"option":c.value!=null&&n.setAttribute("value",""+me(c.value));break;case"select":n.multiple=!!c.multiple,m=c.value,m!=null?kt(n,!!c.multiple,m,!1):c.defaultValue!=null&&kt(n,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(n.onclick=Uo)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return En(i),null;case 6:if(n&&i.stateNode!=null)sm(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(a=Qr(Ha.current),Qr(Ci.current),Vo(i)){if(c=i.stateNode,a=i.memoizedProps,c[Ri]=i,(m=c.nodeValue!==a)&&(n=Xn,n!==null))switch(n.tag){case 3:Io(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Io(c.nodeValue,a,(n.mode&1)!==0)}m&&(i.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[Ri]=i,i.stateNode=c}return En(i),null;case 13:if(Wt($t),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Xt&&Yn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)lp(),Ds(),i.flags|=98560,m=!1;else if(m=Vo(i),c!==null&&c.dehydrated!==null){if(n===null){if(!m)throw Error(t(318));if(m=i.memoizedState,m=m!==null?m.dehydrated:null,!m)throw Error(t(317));m[Ri]=i}else Ds(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;En(i),m=!1}else pi!==null&&(Gu(pi),pi=null),m=!0;if(!m)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=a,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||($t.current&1)!==0?on===0&&(on=3):Xu())),i.updateQueue!==null&&(i.flags|=4),En(i),null);case 4:return Fs(),Du(n,i),n===null&&Ia(i.stateNode.containerInfo),En(i),null;case 10:return au(i.type._context),En(i),null;case 17:return Fn(i.type)&&Oo(),En(i),null;case 19:if(Wt($t),m=i.memoizedState,m===null)return En(i),null;if(c=(i.flags&128)!==0,w=m.rendering,w===null)if(c)Xa(m,!1);else{if(on!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(w=qo(n),w!==null){for(i.flags|=128,Xa(m,!1),c=w.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=a,a=i.child;a!==null;)m=a,n=c,m.flags&=14680066,w=m.alternate,w===null?(m.childLanes=0,m.lanes=n,m.child=null,m.subtreeFlags=0,m.memoizedProps=null,m.memoizedState=null,m.updateQueue=null,m.dependencies=null,m.stateNode=null):(m.childLanes=w.childLanes,m.lanes=w.lanes,m.child=w.child,m.subtreeFlags=0,m.deletions=null,m.memoizedProps=w.memoizedProps,m.memoizedState=w.memoizedState,m.updateQueue=w.updateQueue,m.type=w.type,n=w.dependencies,m.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return zt($t,$t.current&1|2),i.child}n=n.sibling}m.tail!==null&&qt()>zs&&(i.flags|=128,c=!0,Xa(m,!1),i.lanes=4194304)}else{if(!c)if(n=qo(w),n!==null){if(i.flags|=128,c=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),Xa(m,!0),m.tail===null&&m.tailMode==="hidden"&&!w.alternate&&!Xt)return En(i),null}else 2*qt()-m.renderingStartTime>zs&&a!==1073741824&&(i.flags|=128,c=!0,Xa(m,!1),i.lanes=4194304);m.isBackwards?(w.sibling=i.child,i.child=w):(a=m.last,a!==null?a.sibling=w:i.child=w,m.last=w)}return m.tail!==null?(i=m.tail,m.rendering=i,m.tail=i.sibling,m.renderingStartTime=qt(),i.sibling=null,a=$t.current,zt($t,c?a&1|2:a&1),i):(En(i),null);case 22:case 23:return ju(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(qn&1073741824)!==0&&(En(i),i.subtreeFlags&6&&(i.flags|=8192)):En(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function _v(n,i){switch(eu(i),i.tag){case 1:return Fn(i.type)&&Oo(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Fs(),Wt(Un),Wt(Sn),hu(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return du(i),null;case 13:if(Wt($t),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));Ds()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Wt($t),null;case 4:return Fs(),null;case 10:return au(i.type._context),null;case 22:case 23:return ju(),null;case 24:return null;default:return null}}var il=!1,Tn=!1,vv=typeof WeakSet=="function"?WeakSet:Set,We=null;function ks(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){Jt(n,i,c)}else a.current=null}function Nu(n,i,a){try{a()}catch(c){Jt(n,i,c)}}var am=!1;function xv(n,i){if(jc=Eo,n=kh(),Oc(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var d=c.anchorOffset,m=c.focusNode;c=c.focusOffset;try{a.nodeType,m.nodeType}catch{a=null;break e}var w=0,U=-1,H=-1,se=0,ye=0,Me=n,xe=null;t:for(;;){for(var He;Me!==a||d!==0&&Me.nodeType!==3||(U=w+d),Me!==m||c!==0&&Me.nodeType!==3||(H=w+c),Me.nodeType===3&&(w+=Me.nodeValue.length),(He=Me.firstChild)!==null;)xe=Me,Me=He;for(;;){if(Me===n)break t;if(xe===a&&++se===d&&(U=w),xe===m&&++ye===c&&(H=w),(He=Me.nextSibling)!==null)break;Me=xe,xe=Me.parentNode}Me=He}a=U===-1||H===-1?null:{start:U,end:H}}else a=null}a=a||{start:0,end:0}}else a=null;for(Xc={focusedElem:n,selectionRange:a},Eo=!1,We=i;We!==null;)if(i=We,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,We=n;else for(;We!==null;){i=We;try{var je=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(je!==null){var qe=je.memoizedProps,en=je.memoizedState,J=i.stateNode,W=J.getSnapshotBeforeUpdate(i.elementType===i.type?qe:mi(i.type,qe),en);J.__reactInternalSnapshotBeforeUpdate=W}break;case 3:var ne=i.stateNode.containerInfo;ne.nodeType===1?ne.textContent="":ne.nodeType===9&&ne.documentElement&&ne.removeChild(ne.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(we){Jt(i,i.return,we)}if(n=i.sibling,n!==null){n.return=i.return,We=n;break}We=i.return}return je=am,am=!1,je}function Ya(n,i,a){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&n)===n){var m=d.destroy;d.destroy=void 0,m!==void 0&&Nu(i,a,m)}d=d.next}while(d!==c)}}function rl(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==i)}}function Iu(n){var i=n.ref;if(i!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof i=="function"?i(n):i.current=n}}function om(n){var i=n.alternate;i!==null&&(n.alternate=null,om(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[Ri],delete i[Fa],delete i[Kc],delete i[tv],delete i[nv])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function lm(n){return n.tag===5||n.tag===3||n.tag===4}function cm(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||lm(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Uu(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=Uo));else if(c!==4&&(n=n.child,n!==null))for(Uu(n,i,a),n=n.sibling;n!==null;)Uu(n,i,a),n=n.sibling}function Fu(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(Fu(n,i,a),n=n.sibling;n!==null;)Fu(n,i,a),n=n.sibling}var _n=null,gi=!1;function Sr(n,i,a){for(a=a.child;a!==null;)um(n,i,a),a=a.sibling}function um(n,i,a){if(Pe&&typeof Pe.onCommitFiberUnmount=="function")try{Pe.onCommitFiberUnmount(Q,a)}catch{}switch(a.tag){case 5:Tn||ks(a,i);case 6:var c=_n,d=gi;_n=null,Sr(n,i,a),_n=c,gi=d,_n!==null&&(gi?(n=_n,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):_n.removeChild(a.stateNode));break;case 18:_n!==null&&(gi?(n=_n,a=a.stateNode,n.nodeType===8?$c(n.parentNode,a):n.nodeType===1&&$c(n,a),wa(n)):$c(_n,a.stateNode));break;case 4:c=_n,d=gi,_n=a.stateNode.containerInfo,gi=!0,Sr(n,i,a),_n=c,gi=d;break;case 0:case 11:case 14:case 15:if(!Tn&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var m=d,w=m.destroy;m=m.tag,w!==void 0&&((m&2)!==0||(m&4)!==0)&&Nu(a,i,w),d=d.next}while(d!==c)}Sr(n,i,a);break;case 1:if(!Tn&&(ks(a,i),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(U){Jt(a,i,U)}Sr(n,i,a);break;case 21:Sr(n,i,a);break;case 22:a.mode&1?(Tn=(c=Tn)||a.memoizedState!==null,Sr(n,i,a),Tn=c):Sr(n,i,a);break;default:Sr(n,i,a)}}function dm(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new vv),i.forEach(function(c){var d=Rv.bind(null,n,c);a.has(c)||(a.add(c),c.then(d,d))})}}function _i(n,i){var a=i.deletions;if(a!==null)for(var c=0;c<a.length;c++){var d=a[c];try{var m=n,w=i,U=w;e:for(;U!==null;){switch(U.tag){case 5:_n=U.stateNode,gi=!1;break e;case 3:_n=U.stateNode.containerInfo,gi=!0;break e;case 4:_n=U.stateNode.containerInfo,gi=!0;break e}U=U.return}if(_n===null)throw Error(t(160));um(m,w,d),_n=null,gi=!1;var H=d.alternate;H!==null&&(H.return=null),d.return=null}catch(se){Jt(d,i,se)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)fm(i,n),i=i.sibling}function fm(n,i){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(_i(i,n),Li(n),c&4){try{Ya(3,n,n.return),rl(3,n)}catch(qe){Jt(n,n.return,qe)}try{Ya(5,n,n.return)}catch(qe){Jt(n,n.return,qe)}}break;case 1:_i(i,n),Li(n),c&512&&a!==null&&ks(a,a.return);break;case 5:if(_i(i,n),Li(n),c&512&&a!==null&&ks(a,a.return),n.flags&32){var d=n.stateNode;try{_e(d,"")}catch(qe){Jt(n,n.return,qe)}}if(c&4&&(d=n.stateNode,d!=null)){var m=n.memoizedProps,w=a!==null?a.memoizedProps:m,U=n.type,H=n.updateQueue;if(n.updateQueue=null,H!==null)try{U==="input"&&m.type==="radio"&&m.name!=null&&ft(d,m),Ae(U,w);var se=Ae(U,m);for(w=0;w<H.length;w+=2){var ye=H[w],Me=H[w+1];ye==="style"?pe(d,Me):ye==="dangerouslySetInnerHTML"?he(d,Me):ye==="children"?_e(d,Me):L(d,ye,Me,se)}switch(U){case"input":Yt(d,m);break;case"textarea":De(d,m);break;case"select":var xe=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!m.multiple;var He=m.value;He!=null?kt(d,!!m.multiple,He,!1):xe!==!!m.multiple&&(m.defaultValue!=null?kt(d,!!m.multiple,m.defaultValue,!0):kt(d,!!m.multiple,m.multiple?[]:"",!1))}d[Fa]=m}catch(qe){Jt(n,n.return,qe)}}break;case 6:if(_i(i,n),Li(n),c&4){if(n.stateNode===null)throw Error(t(162));d=n.stateNode,m=n.memoizedProps;try{d.nodeValue=m}catch(qe){Jt(n,n.return,qe)}}break;case 3:if(_i(i,n),Li(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{wa(i.containerInfo)}catch(qe){Jt(n,n.return,qe)}break;case 4:_i(i,n),Li(n);break;case 13:_i(i,n),Li(n),d=n.child,d.flags&8192&&(m=d.memoizedState!==null,d.stateNode.isHidden=m,!m||d.alternate!==null&&d.alternate.memoizedState!==null||(Bu=qt())),c&4&&dm(n);break;case 22:if(ye=a!==null&&a.memoizedState!==null,n.mode&1?(Tn=(se=Tn)||ye,_i(i,n),Tn=se):_i(i,n),Li(n),c&8192){if(se=n.memoizedState!==null,(n.stateNode.isHidden=se)&&!ye&&(n.mode&1)!==0)for(We=n,ye=n.child;ye!==null;){for(Me=We=ye;We!==null;){switch(xe=We,He=xe.child,xe.tag){case 0:case 11:case 14:case 15:Ya(4,xe,xe.return);break;case 1:ks(xe,xe.return);var je=xe.stateNode;if(typeof je.componentWillUnmount=="function"){c=xe,a=xe.return;try{i=c,je.props=i.memoizedProps,je.state=i.memoizedState,je.componentWillUnmount()}catch(qe){Jt(c,a,qe)}}break;case 5:ks(xe,xe.return);break;case 22:if(xe.memoizedState!==null){mm(Me);continue}}He!==null?(He.return=xe,We=He):mm(Me)}ye=ye.sibling}e:for(ye=null,Me=n;;){if(Me.tag===5){if(ye===null){ye=Me;try{d=Me.stateNode,se?(m=d.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none"):(U=Me.stateNode,H=Me.memoizedProps.style,w=H!=null&&H.hasOwnProperty("display")?H.display:null,U.style.display=ue("display",w))}catch(qe){Jt(n,n.return,qe)}}}else if(Me.tag===6){if(ye===null)try{Me.stateNode.nodeValue=se?"":Me.memoizedProps}catch(qe){Jt(n,n.return,qe)}}else if((Me.tag!==22&&Me.tag!==23||Me.memoizedState===null||Me===n)&&Me.child!==null){Me.child.return=Me,Me=Me.child;continue}if(Me===n)break e;for(;Me.sibling===null;){if(Me.return===null||Me.return===n)break e;ye===Me&&(ye=null),Me=Me.return}ye===Me&&(ye=null),Me.sibling.return=Me.return,Me=Me.sibling}}break;case 19:_i(i,n),Li(n),c&4&&dm(n);break;case 21:break;default:_i(i,n),Li(n)}}function Li(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(lm(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(_e(d,""),c.flags&=-33);var m=cm(n);Fu(n,m,d);break;case 3:case 4:var w=c.stateNode.containerInfo,U=cm(n);Uu(n,U,w);break;default:throw Error(t(161))}}catch(H){Jt(n,n.return,H)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function yv(n,i,a){We=n,hm(n)}function hm(n,i,a){for(var c=(n.mode&1)!==0;We!==null;){var d=We,m=d.child;if(d.tag===22&&c){var w=d.memoizedState!==null||il;if(!w){var U=d.alternate,H=U!==null&&U.memoizedState!==null||Tn;U=il;var se=Tn;if(il=w,(Tn=H)&&!se)for(We=d;We!==null;)w=We,H=w.child,w.tag===22&&w.memoizedState!==null?gm(d):H!==null?(H.return=w,We=H):gm(d);for(;m!==null;)We=m,hm(m),m=m.sibling;We=d,il=U,Tn=se}pm(n)}else(d.subtreeFlags&8772)!==0&&m!==null?(m.return=d,We=m):pm(n)}}function pm(n){for(;We!==null;){var i=We;if((i.flags&8772)!==0){var a=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:Tn||rl(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!Tn)if(a===null)c.componentDidMount();else{var d=i.elementType===i.type?a.memoizedProps:mi(i.type,a.memoizedProps);c.componentDidUpdate(d,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var m=i.updateQueue;m!==null&&mp(i,m,c);break;case 3:var w=i.updateQueue;if(w!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}mp(i,w,a)}break;case 5:var U=i.stateNode;if(a===null&&i.flags&4){a=U;var H=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":H.autoFocus&&a.focus();break;case"img":H.src&&(a.src=H.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var se=i.alternate;if(se!==null){var ye=se.memoizedState;if(ye!==null){var Me=ye.dehydrated;Me!==null&&wa(Me)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}Tn||i.flags&512&&Iu(i)}catch(xe){Jt(i,i.return,xe)}}if(i===n){We=null;break}if(a=i.sibling,a!==null){a.return=i.return,We=a;break}We=i.return}}function mm(n){for(;We!==null;){var i=We;if(i===n){We=null;break}var a=i.sibling;if(a!==null){a.return=i.return,We=a;break}We=i.return}}function gm(n){for(;We!==null;){var i=We;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{rl(4,i)}catch(H){Jt(i,a,H)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var d=i.return;try{c.componentDidMount()}catch(H){Jt(i,d,H)}}var m=i.return;try{Iu(i)}catch(H){Jt(i,m,H)}break;case 5:var w=i.return;try{Iu(i)}catch(H){Jt(i,w,H)}}}catch(H){Jt(i,i.return,H)}if(i===n){We=null;break}var U=i.sibling;if(U!==null){U.return=i.return,We=U;break}We=i.return}}var Sv=Math.ceil,sl=P.ReactCurrentDispatcher,Ou=P.ReactCurrentOwner,si=P.ReactCurrentBatchConfig,Tt=0,fn=null,nn=null,vn=0,qn=0,Bs=gr(0),on=0,qa=null,ts=0,al=0,ku=0,$a=null,kn=null,Bu=0,zs=1/0,Zi=null,ol=!1,zu=null,Mr=null,ll=!1,Er=null,cl=0,Ka=0,Hu=null,ul=-1,dl=0;function Pn(){return(Tt&6)!==0?qt():ul!==-1?ul:ul=qt()}function Tr(n){return(n.mode&1)===0?1:(Tt&2)!==0&&vn!==0?vn&-vn:rv.transition!==null?(dl===0&&(dl=ze()),dl):(n=_t,n!==0||(n=window.event,n=n===void 0?16:vh(n.type)),n)}function vi(n,i,a,c){if(50<Ka)throw Ka=0,Hu=null,Error(t(185));gt(n,a,c),((Tt&2)===0||n!==fn)&&(n===fn&&((Tt&2)===0&&(al|=a),on===4&&wr(n,vn)),Bn(n,c),a===1&&Tt===0&&(i.mode&1)===0&&(zs=qt()+500,Bo&&vr()))}function Bn(n,i){var a=n.callbackNode;Pt(n,i);var c=Bt(n,n===fn?vn:0);if(c===0)a!==null&&So(a),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(a!=null&&So(a),i===1)n.tag===0?iv(vm.bind(null,n)):ip(vm.bind(null,n)),Q0(function(){(Tt&6)===0&&vr()}),a=null;else{switch(Gi(c)){case 1:a=ya;break;case 4:a=A;break;case 16:a=X;break;case 536870912:a=te;break;default:a=X}a=bm(a,_m.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function _m(n,i){if(ul=-1,dl=0,(Tt&6)!==0)throw Error(t(327));var a=n.callbackNode;if(Hs()&&n.callbackNode!==a)return null;var c=Bt(n,n===fn?vn:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=fl(n,c);else{i=c;var d=Tt;Tt|=2;var m=ym();(fn!==n||vn!==i)&&(Zi=null,zs=qt()+500,is(n,i));do try{Tv();break}catch(U){xm(n,U)}while(!0);su(),sl.current=m,Tt=d,nn!==null?i=0:(fn=null,vn=0,i=on)}if(i!==0){if(i===2&&(d=tn(n),d!==0&&(c=d,i=Vu(n,d))),i===1)throw a=qa,is(n,0),wr(n,c),Bn(n,qt()),a;if(i===6)wr(n,c);else{if(d=n.current.alternate,(c&30)===0&&!Mv(d)&&(i=fl(n,c),i===2&&(m=tn(n),m!==0&&(c=m,i=Vu(n,m))),i===1))throw a=qa,is(n,0),wr(n,c),Bn(n,qt()),a;switch(n.finishedWork=d,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:rs(n,kn,Zi);break;case 3:if(wr(n,c),(c&130023424)===c&&(i=Bu+500-qt(),10<i)){if(Bt(n,0)!==0)break;if(d=n.suspendedLanes,(d&c)!==c){Pn(),n.pingedLanes|=n.suspendedLanes&d;break}n.timeoutHandle=qc(rs.bind(null,n,kn,Zi),i);break}rs(n,kn,Zi);break;case 4:if(wr(n,c),(c&4194240)===c)break;for(i=n.eventTimes,d=-1;0<c;){var w=31-Re(c);m=1<<w,w=i[w],w>d&&(d=w),c&=~m}if(c=d,c=qt()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*Sv(c/1960))-c,10<c){n.timeoutHandle=qc(rs.bind(null,n,kn,Zi),c);break}rs(n,kn,Zi);break;case 5:rs(n,kn,Zi);break;default:throw Error(t(329))}}}return Bn(n,qt()),n.callbackNode===a?_m.bind(null,n):null}function Vu(n,i){var a=$a;return n.current.memoizedState.isDehydrated&&(is(n,i).flags|=256),n=fl(n,i),n!==2&&(i=kn,kn=a,i!==null&&Gu(i)),n}function Gu(n){kn===null?kn=n:kn.push.apply(kn,n)}function Mv(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var d=a[c],m=d.getSnapshot;d=d.value;try{if(!hi(m(),d))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function wr(n,i){for(i&=~ku,i&=~al,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-Re(i),c=1<<a;n[a]=-1,i&=~c}}function vm(n){if((Tt&6)!==0)throw Error(t(327));Hs();var i=Bt(n,0);if((i&1)===0)return Bn(n,qt()),null;var a=fl(n,i);if(n.tag!==0&&a===2){var c=tn(n);c!==0&&(i=c,a=Vu(n,c))}if(a===1)throw a=qa,is(n,0),wr(n,i),Bn(n,qt()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,rs(n,kn,Zi),Bn(n,qt()),null}function Wu(n,i){var a=Tt;Tt|=1;try{return n(i)}finally{Tt=a,Tt===0&&(zs=qt()+500,Bo&&vr())}}function ns(n){Er!==null&&Er.tag===0&&(Tt&6)===0&&Hs();var i=Tt;Tt|=1;var a=si.transition,c=_t;try{if(si.transition=null,_t=1,n)return n()}finally{_t=c,si.transition=a,Tt=i,(Tt&6)===0&&vr()}}function ju(){qn=Bs.current,Wt(Bs)}function is(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,J0(a)),nn!==null)for(a=nn.return;a!==null;){var c=a;switch(eu(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Oo();break;case 3:Fs(),Wt(Un),Wt(Sn),hu();break;case 5:du(c);break;case 4:Fs();break;case 13:Wt($t);break;case 19:Wt($t);break;case 10:au(c.type._context);break;case 22:case 23:ju()}a=a.return}if(fn=n,nn=n=br(n.current,null),vn=qn=i,on=0,qa=null,ku=al=ts=0,kn=$a=null,Jr!==null){for(i=0;i<Jr.length;i++)if(a=Jr[i],c=a.interleaved,c!==null){a.interleaved=null;var d=c.next,m=a.pending;if(m!==null){var w=m.next;m.next=d,c.next=w}a.pending=c}Jr=null}return n}function xm(n,i){do{var a=nn;try{if(su(),$o.current=Qo,Ko){for(var c=Kt.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}Ko=!1}if(es=0,dn=an=Kt=null,Va=!1,Ga=0,Ou.current=null,a===null||a.return===null){on=1,qa=i,nn=null;break}e:{var m=n,w=a.return,U=a,H=i;if(i=vn,U.flags|=32768,H!==null&&typeof H=="object"&&typeof H.then=="function"){var se=H,ye=U,Me=ye.tag;if((ye.mode&1)===0&&(Me===0||Me===11||Me===15)){var xe=ye.alternate;xe?(ye.updateQueue=xe.updateQueue,ye.memoizedState=xe.memoizedState,ye.lanes=xe.lanes):(ye.updateQueue=null,ye.memoizedState=null)}var He=Wp(w);if(He!==null){He.flags&=-257,jp(He,w,U,m,i),He.mode&1&&Gp(m,se,i),i=He,H=se;var je=i.updateQueue;if(je===null){var qe=new Set;qe.add(H),i.updateQueue=qe}else je.add(H);break e}else{if((i&1)===0){Gp(m,se,i),Xu();break e}H=Error(t(426))}}else if(Xt&&U.mode&1){var en=Wp(w);if(en!==null){(en.flags&65536)===0&&(en.flags|=256),jp(en,w,U,m,i),iu(Os(H,U));break e}}m=H=Os(H,U),on!==4&&(on=2),$a===null?$a=[m]:$a.push(m),m=w;do{switch(m.tag){case 3:m.flags|=65536,i&=-i,m.lanes|=i;var J=Hp(m,H,i);pp(m,J);break e;case 1:U=H;var W=m.type,ne=m.stateNode;if((m.flags&128)===0&&(typeof W.getDerivedStateFromError=="function"||ne!==null&&typeof ne.componentDidCatch=="function"&&(Mr===null||!Mr.has(ne)))){m.flags|=65536,i&=-i,m.lanes|=i;var we=Vp(m,U,i);pp(m,we);break e}}m=m.return}while(m!==null)}Mm(a)}catch(Ke){i=Ke,nn===a&&a!==null&&(nn=a=a.return);continue}break}while(!0)}function ym(){var n=sl.current;return sl.current=Qo,n===null?Qo:n}function Xu(){(on===0||on===3||on===2)&&(on=4),fn===null||(ts&268435455)===0&&(al&268435455)===0||wr(fn,vn)}function fl(n,i){var a=Tt;Tt|=2;var c=ym();(fn!==n||vn!==i)&&(Zi=null,is(n,i));do try{Ev();break}catch(d){xm(n,d)}while(!0);if(su(),Tt=a,sl.current=c,nn!==null)throw Error(t(261));return fn=null,vn=0,on}function Ev(){for(;nn!==null;)Sm(nn)}function Tv(){for(;nn!==null&&!Ec();)Sm(nn)}function Sm(n){var i=wm(n.alternate,n,qn);n.memoizedProps=n.pendingProps,i===null?Mm(n):nn=i,Ou.current=null}function Mm(n){var i=n;do{var a=i.alternate;if(n=i.return,(i.flags&32768)===0){if(a=gv(a,i,qn),a!==null){nn=a;return}}else{if(a=_v(a,i),a!==null){a.flags&=32767,nn=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{on=6,nn=null;return}}if(i=i.sibling,i!==null){nn=i;return}nn=i=n}while(i!==null);on===0&&(on=5)}function rs(n,i,a){var c=_t,d=si.transition;try{si.transition=null,_t=1,wv(n,i,a,c)}finally{si.transition=d,_t=c}return null}function wv(n,i,a,c){do Hs();while(Er!==null);if((Tt&6)!==0)throw Error(t(327));a=n.finishedWork;var d=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var m=a.lanes|a.childLanes;if(Nn(n,m),n===fn&&(nn=fn=null,vn=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||ll||(ll=!0,bm(X,function(){return Hs(),null})),m=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||m){m=si.transition,si.transition=null;var w=_t;_t=1;var U=Tt;Tt|=4,Ou.current=null,xv(n,a),fm(a,n),j0(Xc),Eo=!!jc,Xc=jc=null,n.current=a,yv(a),Tc(),Tt=U,_t=w,si.transition=m}else n.current=a;if(ll&&(ll=!1,Er=n,cl=d),m=n.pendingLanes,m===0&&(Mr=null),Ve(a.stateNode),Bn(n,qt()),i!==null)for(c=n.onRecoverableError,a=0;a<i.length;a++)d=i[a],c(d.value,{componentStack:d.stack,digest:d.digest});if(ol)throw ol=!1,n=zu,zu=null,n;return(cl&1)!==0&&n.tag!==0&&Hs(),m=n.pendingLanes,(m&1)!==0?n===Hu?Ka++:(Ka=0,Hu=n):Ka=0,vr(),null}function Hs(){if(Er!==null){var n=Gi(cl),i=si.transition,a=_t;try{if(si.transition=null,_t=16>n?16:n,Er===null)var c=!1;else{if(n=Er,Er=null,cl=0,(Tt&6)!==0)throw Error(t(331));var d=Tt;for(Tt|=4,We=n.current;We!==null;){var m=We,w=m.child;if((We.flags&16)!==0){var U=m.deletions;if(U!==null){for(var H=0;H<U.length;H++){var se=U[H];for(We=se;We!==null;){var ye=We;switch(ye.tag){case 0:case 11:case 15:Ya(8,ye,m)}var Me=ye.child;if(Me!==null)Me.return=ye,We=Me;else for(;We!==null;){ye=We;var xe=ye.sibling,He=ye.return;if(om(ye),ye===se){We=null;break}if(xe!==null){xe.return=He,We=xe;break}We=He}}}var je=m.alternate;if(je!==null){var qe=je.child;if(qe!==null){je.child=null;do{var en=qe.sibling;qe.sibling=null,qe=en}while(qe!==null)}}We=m}}if((m.subtreeFlags&2064)!==0&&w!==null)w.return=m,We=w;else e:for(;We!==null;){if(m=We,(m.flags&2048)!==0)switch(m.tag){case 0:case 11:case 15:Ya(9,m,m.return)}var J=m.sibling;if(J!==null){J.return=m.return,We=J;break e}We=m.return}}var W=n.current;for(We=W;We!==null;){w=We;var ne=w.child;if((w.subtreeFlags&2064)!==0&&ne!==null)ne.return=w,We=ne;else e:for(w=W;We!==null;){if(U=We,(U.flags&2048)!==0)try{switch(U.tag){case 0:case 11:case 15:rl(9,U)}}catch(Ke){Jt(U,U.return,Ke)}if(U===w){We=null;break e}var we=U.sibling;if(we!==null){we.return=U.return,We=we;break e}We=U.return}}if(Tt=d,vr(),Pe&&typeof Pe.onPostCommitFiberRoot=="function")try{Pe.onPostCommitFiberRoot(Q,n)}catch{}c=!0}return c}finally{_t=a,si.transition=i}}return!1}function Em(n,i,a){i=Os(a,i),i=Hp(n,i,1),n=yr(n,i,1),i=Pn(),n!==null&&(gt(n,1,i),Bn(n,i))}function Jt(n,i,a){if(n.tag===3)Em(n,n,a);else for(;i!==null;){if(i.tag===3){Em(i,n,a);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(Mr===null||!Mr.has(c))){n=Os(a,n),n=Vp(i,n,1),i=yr(i,n,1),n=Pn(),i!==null&&(gt(i,1,n),Bn(i,n));break}}i=i.return}}function bv(n,i,a){var c=n.pingCache;c!==null&&c.delete(i),i=Pn(),n.pingedLanes|=n.suspendedLanes&a,fn===n&&(vn&a)===a&&(on===4||on===3&&(vn&130023424)===vn&&500>qt()-Bu?is(n,0):ku|=a),Bn(n,i)}function Tm(n,i){i===0&&((n.mode&1)===0?i=1:(i=$e,$e<<=1,($e&130023424)===0&&($e=4194304)));var a=Pn();n=qi(n,i),n!==null&&(gt(n,i,a),Bn(n,a))}function Av(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),Tm(n,a)}function Rv(n,i){var a=0;switch(n.tag){case 13:var c=n.stateNode,d=n.memoizedState;d!==null&&(a=d.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),Tm(n,a)}var wm;wm=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||Un.current)On=!0;else{if((n.lanes&a)===0&&(i.flags&128)===0)return On=!1,mv(n,i,a);On=(n.flags&131072)!==0}else On=!1,Xt&&(i.flags&1048576)!==0&&rp(i,Ho,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;nl(n,i),n=i.pendingProps;var d=Cs(i,Sn.current);Us(i,a),d=gu(null,i,c,n,d,a);var m=_u();return i.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Fn(c)?(m=!0,ko(i)):m=!1,i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,cu(i),d.updater=el,i.stateNode=d,d._reactInternals=i,Eu(i,c,n,a),i=Au(null,i,c,!0,m,a)):(i.tag=0,Xt&&m&&Qc(i),Cn(null,i,d,a),i=i.child),i;case 16:c=i.elementType;e:{switch(nl(n,i),n=i.pendingProps,d=c._init,c=d(c._payload),i.type=c,d=i.tag=Pv(c),n=mi(c,n),d){case 0:i=bu(null,i,c,n,a);break e;case 1:i=Zp(null,i,c,n,a);break e;case 11:i=Xp(null,i,c,n,a);break e;case 14:i=Yp(null,i,c,mi(c.type,n),a);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:mi(c,d),bu(n,i,c,d,a);case 1:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:mi(c,d),Zp(n,i,c,d,a);case 3:e:{if(Jp(i),n===null)throw Error(t(387));c=i.pendingProps,m=i.memoizedState,d=m.element,hp(n,i),Yo(i,c,null,a);var w=i.memoizedState;if(c=w.element,m.isDehydrated)if(m={element:c,isDehydrated:!1,cache:w.cache,pendingSuspenseBoundaries:w.pendingSuspenseBoundaries,transitions:w.transitions},i.updateQueue.baseState=m,i.memoizedState=m,i.flags&256){d=Os(Error(t(423)),i),i=Qp(n,i,c,a,d);break e}else if(c!==d){d=Os(Error(t(424)),i),i=Qp(n,i,c,a,d);break e}else for(Yn=mr(i.stateNode.containerInfo.firstChild),Xn=i,Xt=!0,pi=null,a=dp(i,null,c,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Ds(),c===d){i=Ki(n,i,a);break e}Cn(n,i,c,a)}i=i.child}return i;case 5:return gp(i),n===null&&nu(i),c=i.type,d=i.pendingProps,m=n!==null?n.memoizedProps:null,w=d.children,Yc(c,d)?w=null:m!==null&&Yc(c,m)&&(i.flags|=32),Kp(n,i),Cn(n,i,w,a),i.child;case 6:return n===null&&nu(i),null;case 13:return em(n,i,a);case 4:return uu(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=Ns(i,null,c,a):Cn(n,i,c,a),i.child;case 11:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:mi(c,d),Xp(n,i,c,d,a);case 7:return Cn(n,i,i.pendingProps,a),i.child;case 8:return Cn(n,i,i.pendingProps.children,a),i.child;case 12:return Cn(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(c=i.type._context,d=i.pendingProps,m=i.memoizedProps,w=d.value,zt(Wo,c._currentValue),c._currentValue=w,m!==null)if(hi(m.value,w)){if(m.children===d.children&&!Un.current){i=Ki(n,i,a);break e}}else for(m=i.child,m!==null&&(m.return=i);m!==null;){var U=m.dependencies;if(U!==null){w=m.child;for(var H=U.firstContext;H!==null;){if(H.context===c){if(m.tag===1){H=$i(-1,a&-a),H.tag=2;var se=m.updateQueue;if(se!==null){se=se.shared;var ye=se.pending;ye===null?H.next=H:(H.next=ye.next,ye.next=H),se.pending=H}}m.lanes|=a,H=m.alternate,H!==null&&(H.lanes|=a),ou(m.return,a,i),U.lanes|=a;break}H=H.next}}else if(m.tag===10)w=m.type===i.type?null:m.child;else if(m.tag===18){if(w=m.return,w===null)throw Error(t(341));w.lanes|=a,U=w.alternate,U!==null&&(U.lanes|=a),ou(w,a,i),w=m.sibling}else w=m.child;if(w!==null)w.return=m;else for(w=m;w!==null;){if(w===i){w=null;break}if(m=w.sibling,m!==null){m.return=w.return,w=m;break}w=w.return}m=w}Cn(n,i,d.children,a),i=i.child}return i;case 9:return d=i.type,c=i.pendingProps.children,Us(i,a),d=ii(d),c=c(d),i.flags|=1,Cn(n,i,c,a),i.child;case 14:return c=i.type,d=mi(c,i.pendingProps),d=mi(c.type,d),Yp(n,i,c,d,a);case 15:return qp(n,i,i.type,i.pendingProps,a);case 17:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:mi(c,d),nl(n,i),i.tag=1,Fn(c)?(n=!0,ko(i)):n=!1,Us(i,a),Bp(i,c,d),Eu(i,c,d,a),Au(null,i,c,!0,n,a);case 19:return nm(n,i,a);case 22:return $p(n,i,a)}throw Error(t(156,i.tag))};function bm(n,i){return yo(n,i)}function Cv(n,i,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ai(n,i,a,c){return new Cv(n,i,a,c)}function Yu(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Pv(n){if(typeof n=="function")return Yu(n)?1:0;if(n!=null){if(n=n.$$typeof,n===q)return 11;if(n===j)return 14}return 2}function br(n,i){var a=n.alternate;return a===null?(a=ai(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function hl(n,i,a,c,d,m){var w=2;if(c=n,typeof n=="function")Yu(n)&&(w=1);else if(typeof n=="string")w=5;else e:switch(n){case z:return ss(a.children,d,m,i);case T:w=8,d|=8;break;case D:return n=ai(12,a,i,d|2),n.elementType=D,n.lanes=m,n;case ae:return n=ai(13,a,i,d),n.elementType=ae,n.lanes=m,n;case de:return n=ai(19,a,i,d),n.elementType=de,n.lanes=m,n;case Y:return pl(a,d,m,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case B:w=10;break e;case F:w=9;break e;case q:w=11;break e;case j:w=14;break e;case ie:w=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=ai(w,a,i,d),i.elementType=n,i.type=c,i.lanes=m,i}function ss(n,i,a,c){return n=ai(7,n,c,i),n.lanes=a,n}function pl(n,i,a,c){return n=ai(22,n,c,i),n.elementType=Y,n.lanes=a,n.stateNode={isHidden:!1},n}function qu(n,i,a){return n=ai(6,n,null,i),n.lanes=a,n}function $u(n,i,a){return i=ai(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function Lv(n,i,a,c,d){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=gn(0),this.expirationTimes=gn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gn(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function Ku(n,i,a,c,d,m,w,U,H){return n=new Lv(n,i,a,U,H),i===1?(i=1,m===!0&&(i|=8)):i=0,m=ai(3,null,null,i),n.current=m,m.stateNode=n,m.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},cu(m),n}function Dv(n,i,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:I,key:c==null?null:""+c,children:n,containerInfo:i,implementation:a}}function Am(n){if(!n)return _r;n=n._reactInternals;e:{if(bi(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Fn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(Fn(a))return tp(n,a,i)}return i}function Rm(n,i,a,c,d,m,w,U,H){return n=Ku(a,c,!0,n,d,m,w,U,H),n.context=Am(null),a=n.current,c=Pn(),d=Tr(a),m=$i(c,d),m.callback=i??null,yr(a,m,d),n.current.lanes=d,gt(n,d,c),Bn(n,c),n}function ml(n,i,a,c){var d=i.current,m=Pn(),w=Tr(d);return a=Am(a),i.context===null?i.context=a:i.pendingContext=a,i=$i(m,w),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=yr(d,i,w),n!==null&&(vi(n,d,w,m),Xo(n,d,w)),w}function gl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Cm(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function Zu(n,i){Cm(n,i),(n=n.alternate)&&Cm(n,i)}function Nv(){return null}var Pm=typeof reportError=="function"?reportError:function(n){console.error(n)};function Ju(n){this._internalRoot=n}_l.prototype.render=Ju.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));ml(n,i,null,null)},_l.prototype.unmount=Ju.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;ns(function(){ml(null,n,null,null)}),i[Wi]=null}};function _l(n){this._internalRoot=n}_l.prototype.unstable_scheduleHydration=function(n){if(n){var i=Lt();n={blockedOn:null,target:n,priority:i};for(var a=0;a<fr.length&&i!==0&&i<fr[a].priority;a++);fr.splice(a,0,n),a===0&&gh(n)}};function Qu(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function vl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Lm(){}function Iv(n,i,a,c,d){if(d){if(typeof c=="function"){var m=c;c=function(){var se=gl(w);m.call(se)}}var w=Rm(i,c,n,0,null,!1,!1,"",Lm);return n._reactRootContainer=w,n[Wi]=w.current,Ia(n.nodeType===8?n.parentNode:n),ns(),w}for(;d=n.lastChild;)n.removeChild(d);if(typeof c=="function"){var U=c;c=function(){var se=gl(H);U.call(se)}}var H=Ku(n,0,!1,null,null,!1,!1,"",Lm);return n._reactRootContainer=H,n[Wi]=H.current,Ia(n.nodeType===8?n.parentNode:n),ns(function(){ml(i,H,a,c)}),H}function xl(n,i,a,c,d){var m=a._reactRootContainer;if(m){var w=m;if(typeof d=="function"){var U=d;d=function(){var H=gl(w);U.call(H)}}ml(i,w,n,d)}else w=Iv(a,i,n,d,c);return gl(w)}Rt=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=Mt(i.pendingLanes);a!==0&&(In(i,a|1),Bn(i,qt()),(Tt&6)===0&&(zs=qt()+500,vr()))}break;case 13:ns(function(){var c=qi(n,1);if(c!==null){var d=Pn();vi(c,n,1,d)}}),Zu(n,1)}},Vt=function(n){if(n.tag===13){var i=qi(n,134217728);if(i!==null){var a=Pn();vi(i,n,134217728,a)}Zu(n,134217728)}},di=function(n){if(n.tag===13){var i=Tr(n),a=qi(n,i);if(a!==null){var c=Pn();vi(a,n,i,c)}Zu(n,i)}},Lt=function(){return _t},fi=function(n,i){var a=_t;try{return _t=n,i()}finally{_t=a}},st=function(n,i,a){switch(i){case"input":if(Yt(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var c=a[i];if(c!==n&&c.form===n.form){var d=Fo(c);if(!d)throw Error(t(90));Ft(c),Yt(c,d)}}}break;case"textarea":De(n,a);break;case"select":i=a.value,i!=null&&kt(n,!!a.multiple,i,!1)}},Ce=Wu,ve=ns;var Uv={usingClientEntryPoint:!1,Events:[Oa,As,Fo,fe,ke,Wu]},Za={findFiberByHostInstance:qr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Fv={bundleType:Za.bundleType,version:Za.version,rendererPackageName:Za.rendererPackageName,rendererConfig:Za.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:P.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=va(n),n===null?null:n.stateNode},findFiberByHostInstance:Za.findFiberByHostInstance||Nv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var yl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yl.isDisabled&&yl.supportsFiber)try{Q=yl.inject(Fv),Pe=yl}catch{}}return zn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Uv,zn.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Qu(i))throw Error(t(200));return Dv(n,i,null,a)},zn.createRoot=function(n,i){if(!Qu(n))throw Error(t(299));var a=!1,c="",d=Pm;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(d=i.onRecoverableError)),i=Ku(n,1,!1,null,null,a,!1,c,d),n[Wi]=i.current,Ia(n.nodeType===8?n.parentNode:n),new Ju(i)},zn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=va(i),n=n===null?null:n.stateNode,n},zn.flushSync=function(n){return ns(n)},zn.hydrate=function(n,i,a){if(!vl(i))throw Error(t(200));return xl(null,n,i,!0,a)},zn.hydrateRoot=function(n,i,a){if(!Qu(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,d=!1,m="",w=Pm;if(a!=null&&(a.unstable_strictMode===!0&&(d=!0),a.identifierPrefix!==void 0&&(m=a.identifierPrefix),a.onRecoverableError!==void 0&&(w=a.onRecoverableError)),i=Rm(i,null,n,1,a??null,d,!1,m,w),n[Wi]=i.current,Ia(n),c)for(n=0;n<c.length;n++)a=c[n],d=a._getVersion,d=d(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,d]:i.mutableSourceEagerHydrationData.push(a,d);return new _l(i)},zn.render=function(n,i,a){if(!vl(i))throw Error(t(200));return xl(null,n,i,!1,a)},zn.unmountComponentAtNode=function(n){if(!vl(n))throw Error(t(40));return n._reactRootContainer?(ns(function(){xl(null,null,n,!1,function(){n._reactRootContainer=null,n[Wi]=null})}),!0):!1},zn.unstable_batchedUpdates=Wu,zn.unstable_renderSubtreeIntoContainer=function(n,i,a,c){if(!vl(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return xl(n,i,a,!1,c)},zn.version="18.3.1-next-f1338f8080-20240426",zn}var Bm;function l_(){if(Bm)return nd.exports;Bm=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),nd.exports=Yv(),nd.exports}var zm;function qv(){if(zm)return Sl;zm=1;var s=l_();return Sl.createRoot=s.createRoot,Sl.hydrateRoot=s.hydrateRoot,Sl}var $v=qv();l_();/**
 * @remix-run/router v1.23.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function uo(){return uo=Object.assign?Object.assign.bind():function(s){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(s[r]=t[r])}return s},uo.apply(null,arguments)}var Fr;(function(s){s.Pop="POP",s.Push="PUSH",s.Replace="REPLACE"})(Fr||(Fr={}));const Hm="popstate";function Kv(s){s===void 0&&(s={});function e(r,o){let{pathname:l,search:u,hash:f}=r.location;return Gd("",{pathname:l,search:u,hash:f},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function t(r,o){return typeof o=="string"?o:rc(o)}return Jv(e,t,null,s)}function sn(s,e){if(s===!1||s===null||typeof s>"u")throw new Error(e)}function Vf(s,e){if(!s){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function Zv(){return Math.random().toString(36).substr(2,8)}function Vm(s,e){return{usr:s.state,key:s.key,idx:e}}function Gd(s,e,t,r){return t===void 0&&(t=null),uo({pathname:typeof s=="string"?s:s.pathname,search:"",hash:""},typeof e=="string"?fa(e):e,{state:t,key:e&&e.key||r||Zv()})}function rc(s){let{pathname:e="/",search:t="",hash:r=""}=s;return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function fa(s){let e={};if(s){let t=s.indexOf("#");t>=0&&(e.hash=s.substr(t),s=s.substr(0,t));let r=s.indexOf("?");r>=0&&(e.search=s.substr(r),s=s.substr(0,r)),s&&(e.pathname=s)}return e}function Jv(s,e,t,r){r===void 0&&(r={});let{window:o=document.defaultView,v5Compat:l=!1}=r,u=o.history,f=Fr.Pop,h=null,p=v();p==null&&(p=0,u.replaceState(uo({},u.state,{idx:p}),""));function v(){return(u.state||{idx:null}).idx}function x(){f=Fr.Pop;let _=v(),y=_==null?null:_-p;p=_,h&&h({action:f,location:b.location,delta:y})}function g(_,y){f=Fr.Push;let C=Gd(b.location,_,y);p=v()+1;let L=Vm(C,p),P=b.createHref(C);try{u.pushState(L,"",P)}catch(k){if(k instanceof DOMException&&k.name==="DataCloneError")throw k;o.location.assign(P)}l&&h&&h({action:f,location:b.location,delta:1})}function S(_,y){f=Fr.Replace;let C=Gd(b.location,_,y);p=v();let L=Vm(C,p),P=b.createHref(C);u.replaceState(L,"",P),l&&h&&h({action:f,location:b.location,delta:0})}function M(_){let y=o.location.origin!=="null"?o.location.origin:o.location.href,C=typeof _=="string"?_:rc(_);return C=C.replace(/ $/,"%20"),sn(y,"No window.location.(origin|href) available to create URL for href: "+C),new URL(C,y)}let b={get action(){return f},get location(){return s(o,u)},listen(_){if(h)throw new Error("A history only accepts one active listener");return o.addEventListener(Hm,x),h=_,()=>{o.removeEventListener(Hm,x),h=null}},createHref(_){return e(o,_)},createURL:M,encodeLocation(_){let y=M(_);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:g,replace:S,go(_){return u.go(_)}};return b}var Gm;(function(s){s.data="data",s.deferred="deferred",s.redirect="redirect",s.error="error"})(Gm||(Gm={}));function Qv(s,e,t){return t===void 0&&(t="/"),ex(s,e,t)}function ex(s,e,t,r){let o=typeof e=="string"?fa(e):e,l=Gf(o.pathname||"/",t);if(l==null)return null;let u=c_(s);tx(u);let f=null,h=hx(l);for(let p=0;f==null&&p<u.length;++p)f=ux(u[p],h);return f}function c_(s,e,t,r){e===void 0&&(e=[]),t===void 0&&(t=[]),r===void 0&&(r="");let o=(l,u,f)=>{let h={relativePath:f===void 0?l.path||"":f,caseSensitive:l.caseSensitive===!0,childrenIndex:u,route:l};h.relativePath.startsWith("/")&&(sn(h.relativePath.startsWith(r),'Absolute route path "'+h.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),h.relativePath=h.relativePath.slice(r.length));let p=kr([r,h.relativePath]),v=t.concat(h);l.children&&l.children.length>0&&(sn(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+p+'".')),c_(l.children,e,v,p)),!(l.path==null&&!l.index)&&e.push({path:p,score:lx(p,l.index),routesMeta:v})};return s.forEach((l,u)=>{var f;if(l.path===""||!((f=l.path)!=null&&f.includes("?")))o(l,u);else for(let h of u_(l.path))o(l,u,h)}),e}function u_(s){let e=s.split("/");if(e.length===0)return[];let[t,...r]=e,o=t.endsWith("?"),l=t.replace(/\?$/,"");if(r.length===0)return o?[l,""]:[l];let u=u_(r.join("/")),f=[];return f.push(...u.map(h=>h===""?l:[l,h].join("/"))),o&&f.push(...u),f.map(h=>s.startsWith("/")&&h===""?"/":h)}function tx(s){s.sort((e,t)=>e.score!==t.score?t.score-e.score:cx(e.routesMeta.map(r=>r.childrenIndex),t.routesMeta.map(r=>r.childrenIndex)))}const nx=/^:[\w-]+$/,ix=3,rx=2,sx=1,ax=10,ox=-2,Wm=s=>s==="*";function lx(s,e){let t=s.split("/"),r=t.length;return t.some(Wm)&&(r+=ox),e&&(r+=rx),t.filter(o=>!Wm(o)).reduce((o,l)=>o+(nx.test(l)?ix:l===""?sx:ax),r)}function cx(s,e){return s.length===e.length&&s.slice(0,-1).every((r,o)=>r===e[o])?s[s.length-1]-e[e.length-1]:0}function ux(s,e,t){let{routesMeta:r}=s,o={},l="/",u=[];for(let f=0;f<r.length;++f){let h=r[f],p=f===r.length-1,v=l==="/"?e:e.slice(l.length)||"/",x=dx({path:h.relativePath,caseSensitive:h.caseSensitive,end:p},v),g=h.route;if(!x)return null;Object.assign(o,x.params),u.push({params:o,pathname:kr([l,x.pathname]),pathnameBase:vx(kr([l,x.pathnameBase])),route:g}),x.pathnameBase!=="/"&&(l=kr([l,x.pathnameBase]))}return u}function dx(s,e){typeof s=="string"&&(s={path:s,caseSensitive:!1,end:!0});let[t,r]=fx(s.path,s.caseSensitive,s.end),o=e.match(t);if(!o)return null;let l=o[0],u=l.replace(/(.)\/+$/,"$1"),f=o.slice(1);return{params:r.reduce((p,v,x)=>{let{paramName:g,isOptional:S}=v;if(g==="*"){let b=f[x]||"";u=l.slice(0,l.length-b.length).replace(/(.)\/+$/,"$1")}const M=f[x];return S&&!M?p[g]=void 0:p[g]=(M||"").replace(/%2F/g,"/"),p},{}),pathname:l,pathnameBase:u,pattern:s}}function fx(s,e,t){e===void 0&&(e=!1),t===void 0&&(t=!0),Vf(s==="*"||!s.endsWith("*")||s.endsWith("/*"),'Route path "'+s+'" will be treated as if it were '+('"'+s.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+s.replace(/\*$/,"/*")+'".'));let r=[],o="^"+s.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(u,f,h)=>(r.push({paramName:f,isOptional:h!=null}),h?"/?([^\\/]+)?":"/([^\\/]+)"));return s.endsWith("*")?(r.push({paramName:"*"}),o+=s==="*"||s==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?o+="\\/*$":s!==""&&s!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,e?void 0:"i"),r]}function hx(s){try{return s.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Vf(!1,'The URL path "'+s+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),s}}function Gf(s,e){if(e==="/")return s;if(!s.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,r=s.charAt(t);return r&&r!=="/"?null:s.slice(t)||"/"}const px=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,mx=s=>px.test(s);function gx(s,e){e===void 0&&(e="/");let{pathname:t,search:r="",hash:o=""}=typeof s=="string"?fa(s):s,l;if(t)if(mx(t))l=t;else{if(t.includes("//")){let u=t;t=h_(t),Vf(!1,"Pathnames cannot have embedded double slashes - normalizing "+(u+" -> "+t))}t.startsWith("/")?l=jm(t.substring(1),"/"):l=jm(t,e)}else l=e;return{pathname:l,search:xx(r),hash:yx(o)}}function jm(s,e){let t=e.replace(/\/+$/,"").split("/");return s.split("/").forEach(o=>{o===".."?t.length>1&&t.pop():o!=="."&&t.push(o)}),t.length>1?t.join("/"):"/"}function sd(s,e,t,r){return"Cannot include a '"+s+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function _x(s){return s.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function d_(s,e){let t=_x(s);return e?t.map((r,o)=>o===t.length-1?r.pathname:r.pathnameBase):t.map(r=>r.pathnameBase)}function f_(s,e,t,r){r===void 0&&(r=!1);let o;typeof s=="string"?o=fa(s):(o=uo({},s),sn(!o.pathname||!o.pathname.includes("?"),sd("?","pathname","search",o)),sn(!o.pathname||!o.pathname.includes("#"),sd("#","pathname","hash",o)),sn(!o.search||!o.search.includes("#"),sd("#","search","hash",o)));let l=s===""||o.pathname==="",u=l?"/":o.pathname,f;if(u==null)f=t;else{let x=e.length-1;if(!r&&u.startsWith("..")){let g=u.split("/");for(;g[0]==="..";)g.shift(),x-=1;o.pathname=g.join("/")}f=x>=0?e[x]:"/"}let h=gx(o,f),p=u&&u!=="/"&&u.endsWith("/"),v=(l||u===".")&&t.endsWith("/");return!h.pathname.endsWith("/")&&(p||v)&&(h.pathname+="/"),h}const h_=s=>s.replace(/\/\/+/g,"/"),kr=s=>h_(s.join("/")),vx=s=>s.replace(/\/+$/,"").replace(/^\/*/,"/"),xx=s=>!s||s==="?"?"":s.startsWith("?")?s:"?"+s,yx=s=>!s||s==="#"?"":s.startsWith("#")?s:"#"+s;function Sx(s){return s!=null&&typeof s.status=="number"&&typeof s.statusText=="string"&&typeof s.internal=="boolean"&&"data"in s}const p_=["post","put","patch","delete"];new Set(p_);const Mx=["get",...p_];new Set(Mx);/**
 * React Router v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function fo(){return fo=Object.assign?Object.assign.bind():function(s){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(s[r]=t[r])}return s},fo.apply(null,arguments)}const Wf=ge.createContext(null),Ex=ge.createContext(null),gs=ge.createContext(null),gc=ge.createContext(null),Gr=ge.createContext({outlet:null,matches:[],isDataRoute:!1}),m_=ge.createContext(null);function Tx(s,e){let{relative:t}=e===void 0?{}:e;go()||sn(!1);let{basename:r,navigator:o}=ge.useContext(gs),{hash:l,pathname:u,search:f}=__(s,{relative:t}),h=u;return r!=="/"&&(h=u==="/"?r:kr([r,u])),o.createHref({pathname:h,search:f,hash:l})}function go(){return ge.useContext(gc)!=null}function ha(){return go()||sn(!1),ge.useContext(gc).location}function g_(s){ge.useContext(gs).static||ge.useLayoutEffect(s)}function jf(){let{isDataRoute:s}=ge.useContext(Gr);return s?Bx():wx()}function wx(){go()||sn(!1);let s=ge.useContext(Wf),{basename:e,future:t,navigator:r}=ge.useContext(gs),{matches:o}=ge.useContext(Gr),{pathname:l}=ha(),u=JSON.stringify(d_(o,t.v7_relativeSplatPath)),f=ge.useRef(!1);return g_(()=>{f.current=!0}),ge.useCallback(function(p,v){if(v===void 0&&(v={}),!f.current)return;if(typeof p=="number"){r.go(p);return}let x=f_(p,JSON.parse(u),l,v.relative==="path");s==null&&e!=="/"&&(x.pathname=x.pathname==="/"?e:kr([e,x.pathname])),(v.replace?r.replace:r.push)(x,v.state,v)},[e,r,u,l,s])}const bx=ge.createContext(null);function Ax(s){let e=ge.useContext(Gr).outlet;return e&&ge.createElement(bx.Provider,{value:s},e)}function __(s,e){let{relative:t}=e===void 0?{}:e,{future:r}=ge.useContext(gs),{matches:o}=ge.useContext(Gr),{pathname:l}=ha(),u=JSON.stringify(d_(o,r.v7_relativeSplatPath));return ge.useMemo(()=>f_(s,JSON.parse(u),l,t==="path"),[s,u,l,t])}function Rx(s,e){return Cx(s,e)}function Cx(s,e,t,r){go()||sn(!1);let{navigator:o}=ge.useContext(gs),{matches:l}=ge.useContext(Gr),u=l[l.length-1],f=u?u.params:{};u&&u.pathname;let h=u?u.pathnameBase:"/";u&&u.route;let p=ha(),v;if(e){var x;let _=typeof e=="string"?fa(e):e;h==="/"||(x=_.pathname)!=null&&x.startsWith(h)||sn(!1),v=_}else v=p;let g=v.pathname||"/",S=g;if(h!=="/"){let _=h.replace(/^\//,"").split("/");S="/"+g.replace(/^\//,"").split("/").slice(_.length).join("/")}let M=Qv(s,{pathname:S}),b=Ix(M&&M.map(_=>Object.assign({},_,{params:Object.assign({},f,_.params),pathname:kr([h,o.encodeLocation?o.encodeLocation(_.pathname).pathname:_.pathname]),pathnameBase:_.pathnameBase==="/"?h:kr([h,o.encodeLocation?o.encodeLocation(_.pathnameBase).pathname:_.pathnameBase])})),l,t,r);return e&&b?ge.createElement(gc.Provider,{value:{location:fo({pathname:"/",search:"",hash:"",state:null,key:"default"},v),navigationType:Fr.Pop}},b):b}function Px(){let s=kx(),e=Sx(s)?s.status+" "+s.statusText:s instanceof Error?s.message:JSON.stringify(s),t=s instanceof Error?s.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return ge.createElement(ge.Fragment,null,ge.createElement("h2",null,"Unexpected Application Error!"),ge.createElement("h3",{style:{fontStyle:"italic"}},e),t?ge.createElement("pre",{style:o},t):null,null)}const Lx=ge.createElement(Px,null);class Dx extends ge.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?ge.createElement(Gr.Provider,{value:this.props.routeContext},ge.createElement(m_.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Nx(s){let{routeContext:e,match:t,children:r}=s,o=ge.useContext(Wf);return o&&o.static&&o.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=t.route.id),ge.createElement(Gr.Provider,{value:e},r)}function Ix(s,e,t,r){var o;if(e===void 0&&(e=[]),t===void 0&&(t=null),r===void 0&&(r=null),s==null){var l;if(!t)return null;if(t.errors)s=t.matches;else if((l=r)!=null&&l.v7_partialHydration&&e.length===0&&!t.initialized&&t.matches.length>0)s=t.matches;else return null}let u=s,f=(o=t)==null?void 0:o.errors;if(f!=null){let v=u.findIndex(x=>x.route.id&&(f==null?void 0:f[x.route.id])!==void 0);v>=0||sn(!1),u=u.slice(0,Math.min(u.length,v+1))}let h=!1,p=-1;if(t&&r&&r.v7_partialHydration)for(let v=0;v<u.length;v++){let x=u[v];if((x.route.HydrateFallback||x.route.hydrateFallbackElement)&&(p=v),x.route.id){let{loaderData:g,errors:S}=t,M=x.route.loader&&g[x.route.id]===void 0&&(!S||S[x.route.id]===void 0);if(x.route.lazy||M){h=!0,p>=0?u=u.slice(0,p+1):u=[u[0]];break}}}return u.reduceRight((v,x,g)=>{let S,M=!1,b=null,_=null;t&&(S=f&&x.route.id?f[x.route.id]:void 0,b=x.route.errorElement||Lx,h&&(p<0&&g===0?(zx("route-fallback"),M=!0,_=null):p===g&&(M=!0,_=x.route.hydrateFallbackElement||null)));let y=e.concat(u.slice(0,g+1)),C=()=>{let L;return S?L=b:M?L=_:x.route.Component?L=ge.createElement(x.route.Component,null):x.route.element?L=x.route.element:L=v,ge.createElement(Nx,{match:x,routeContext:{outlet:v,matches:y,isDataRoute:t!=null},children:L})};return t&&(x.route.ErrorBoundary||x.route.errorElement||g===0)?ge.createElement(Dx,{location:t.location,revalidation:t.revalidation,component:b,error:S,children:C(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):C()},null)}var v_=(function(s){return s.UseBlocker="useBlocker",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s})(v_||{}),x_=(function(s){return s.UseBlocker="useBlocker",s.UseLoaderData="useLoaderData",s.UseActionData="useActionData",s.UseRouteError="useRouteError",s.UseNavigation="useNavigation",s.UseRouteLoaderData="useRouteLoaderData",s.UseMatches="useMatches",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s.UseRouteId="useRouteId",s})(x_||{});function Ux(s){let e=ge.useContext(Wf);return e||sn(!1),e}function Fx(s){let e=ge.useContext(Ex);return e||sn(!1),e}function Ox(s){let e=ge.useContext(Gr);return e||sn(!1),e}function y_(s){let e=Ox(),t=e.matches[e.matches.length-1];return t.route.id||sn(!1),t.route.id}function kx(){var s;let e=ge.useContext(m_),t=Fx(),r=y_();return e!==void 0?e:(s=t.errors)==null?void 0:s[r]}function Bx(){let{router:s}=Ux(v_.UseNavigateStable),e=y_(x_.UseNavigateStable),t=ge.useRef(!1);return g_(()=>{t.current=!0}),ge.useCallback(function(o,l){l===void 0&&(l={}),t.current&&(typeof o=="number"?s.navigate(o):s.navigate(o,fo({fromRouteId:e},l)))},[s,e])}const Xm={};function zx(s,e,t){Xm[s]||(Xm[s]=!0)}function Hx(s,e){s==null||s.v7_startTransition,s==null||s.v7_relativeSplatPath}function Vx(s){return Ax(s.context)}function Mi(s){sn(!1)}function Gx(s){let{basename:e="/",children:t=null,location:r,navigationType:o=Fr.Pop,navigator:l,static:u=!1,future:f}=s;go()&&sn(!1);let h=e.replace(/^\/*/,"/"),p=ge.useMemo(()=>({basename:h,navigator:l,static:u,future:fo({v7_relativeSplatPath:!1},f)}),[h,f,l,u]);typeof r=="string"&&(r=fa(r));let{pathname:v="/",search:x="",hash:g="",state:S=null,key:M="default"}=r,b=ge.useMemo(()=>{let _=Gf(v,h);return _==null?null:{location:{pathname:_,search:x,hash:g,state:S,key:M},navigationType:o}},[h,v,x,g,S,M,o]);return b==null?null:ge.createElement(gs.Provider,{value:p},ge.createElement(gc.Provider,{children:t,value:b}))}function Wx(s){let{children:e,location:t}=s;return Rx(Wd(e),t)}new Promise(()=>{});function Wd(s,e){e===void 0&&(e=[]);let t=[];return ge.Children.forEach(s,(r,o)=>{if(!ge.isValidElement(r))return;let l=[...e,o];if(r.type===ge.Fragment){t.push.apply(t,Wd(r.props.children,l));return}r.type!==Mi&&sn(!1),!r.props.index||!r.props.children||sn(!1);let u={id:r.props.id||l.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(u.children=Wd(r.props.children,l)),t.push(u)}),t}/**
 * React Router DOM v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function jd(){return jd=Object.assign?Object.assign.bind():function(s){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(s[r]=t[r])}return s},jd.apply(null,arguments)}function jx(s,e){if(s==null)return{};var t={};for(var r in s)if({}.hasOwnProperty.call(s,r)){if(e.indexOf(r)!==-1)continue;t[r]=s[r]}return t}function Xx(s){return!!(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey)}function Yx(s,e){return s.button===0&&(!e||e==="_self")&&!Xx(s)}function Xd(s){return s===void 0&&(s=""),new URLSearchParams(typeof s=="string"||Array.isArray(s)||s instanceof URLSearchParams?s:Object.keys(s).reduce((e,t)=>{let r=s[t];return e.concat(Array.isArray(r)?r.map(o=>[t,o]):[[t,r]])},[]))}function qx(s,e){let t=Xd(s);return e&&e.forEach((r,o)=>{t.has(o)||e.getAll(o).forEach(l=>{t.append(o,l)})}),t}const $x=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Kx="6";try{window.__reactRouterVersion=Kx}catch{}const Zx="startTransition",Ym=Wv[Zx];function Jx(s){let{basename:e,children:t,future:r,window:o}=s,l=ge.useRef();l.current==null&&(l.current=Kv({window:o,v5Compat:!0}));let u=l.current,[f,h]=ge.useState({action:u.action,location:u.location}),{v7_startTransition:p}=r||{},v=ge.useCallback(x=>{p&&Ym?Ym(()=>h(x)):h(x)},[h,p]);return ge.useLayoutEffect(()=>u.listen(v),[u,v]),ge.useEffect(()=>Hx(r),[r]),ge.createElement(Gx,{basename:e,children:t,location:f.location,navigationType:f.action,navigator:u,future:r})}const Qx=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",ey=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,sc=ge.forwardRef(function(e,t){let{onClick:r,relative:o,reloadDocument:l,replace:u,state:f,target:h,to:p,preventScrollReset:v,viewTransition:x}=e,g=jx(e,$x),{basename:S}=ge.useContext(gs),M,b=!1;if(typeof p=="string"&&ey.test(p)&&(M=p,Qx))try{let L=new URL(window.location.href),P=p.startsWith("//")?new URL(L.protocol+p):new URL(p),k=Gf(P.pathname,S);P.origin===L.origin&&k!=null?p=k+P.search+P.hash:b=!0}catch{}let _=Tx(p,{relative:o}),y=ty(p,{replace:u,state:f,target:h,preventScrollReset:v,relative:o,viewTransition:x});function C(L){r&&r(L),L.defaultPrevented||y(L)}return ge.createElement("a",jd({},g,{href:M||_,onClick:b||l?r:C,ref:t,target:h}))});var qm;(function(s){s.UseScrollRestoration="useScrollRestoration",s.UseSubmit="useSubmit",s.UseSubmitFetcher="useSubmitFetcher",s.UseFetcher="useFetcher",s.useViewTransitionState="useViewTransitionState"})(qm||(qm={}));var $m;(function(s){s.UseFetcher="useFetcher",s.UseFetchers="useFetchers",s.UseScrollRestoration="useScrollRestoration"})($m||($m={}));function ty(s,e){let{target:t,replace:r,state:o,preventScrollReset:l,relative:u,viewTransition:f}=e===void 0?{}:e,h=jf(),p=ha(),v=__(s,{relative:u});return ge.useCallback(x=>{if(Yx(x,t)){x.preventDefault();let g=r!==void 0?r:rc(p)===rc(v);h(s,{replace:g,state:o,preventScrollReset:l,relative:u,viewTransition:f})}},[p,h,v,r,o,t,s,l,u,f])}function _c(s){let e=ge.useRef(Xd(s)),t=ge.useRef(!1),r=ha(),o=ge.useMemo(()=>qx(r.search,t.current?null:e.current),[r.search]),l=jf(),u=ge.useCallback((f,h)=>{const p=Xd(typeof f=="function"?f(o):f);t.current=!0,l("?"+p,h)},[l,o]);return[o,u]}function ny(){return ge.useEffect(()=>{const s=document.createElement("link");s.rel="stylesheet",s.href="/style.css",document.head.appendChild(s);const e=["/socket.io/socket.io.js","/worldmap.js","/battlemap.js","/game.js"],t=[];return e.forEach((r,o)=>{const l=document.createElement("script");l.src=r,l.async=!1,document.body.appendChild(l),t.push(l)}),()=>{t.forEach(r=>document.body.removeChild(r)),document.head.removeChild(s)}},[]),R.jsxs(R.Fragment,{children:[R.jsx("canvas",{id:"map-canvas"}),R.jsxs("div",{id:"event-panel",style:{display:"none"},children:[R.jsx("div",{id:"event-placeholder",children:"Take a step to discover what lies ahead..."}),R.jsxs("div",{id:"current-event",style:{display:"none"},children:[R.jsxs("div",{className:"event-header",children:[R.jsx("span",{id:"event-badge",className:"event-badge"}),R.jsx("span",{id:"event-biome-tag",className:"event-biome-tag"})]}),R.jsx("div",{id:"event-title",className:"event-title"}),R.jsx("div",{id:"event-desc",className:"event-desc"})]}),R.jsxs("div",{id:"event-log-section",style:{display:"none"},children:[R.jsx("div",{className:"event-log-divider"}),R.jsx("div",{id:"event-log-list"})]})]}),R.jsxs("div",{id:"players-panel",style:{display:"none"},children:[R.jsx("h3",{children:"Party"}),R.jsx("div",{id:"party-list"})]}),R.jsxs("div",{id:"hud",children:[R.jsx("span",{id:"player-count"}),R.jsx("span",{id:"world-time"}),R.jsx("span",{id:"current-biome"}),R.jsx("span",{id:"step-count"}),R.jsx("span",{id:"vote-status"}),R.jsx("span",{id:"status"}),R.jsx("button",{id:"gm-toggle",style:{display:"none",marginLeft:20,padding:"5px 10px",background:"#555",color:"#fff",border:"1px solid #888",borderRadius:3,cursor:"pointer"},children:"GM View: OFF"}),R.jsx("button",{id:"new-game-btn",style:{display:"none",marginLeft:8,padding:"5px 10px",background:"#3a2a4a",color:"#fff",border:"1px solid #888",borderRadius:3,cursor:"pointer"},children:"New Game"})]}),R.jsx("div",{id:"hex-tooltip"}),R.jsx("div",{id:"settlement-card"}),R.jsx("div",{id:"mode-select",children:R.jsxs("div",{id:"mode-select-box",children:[R.jsx("h1",{children:"Hexcrawl"}),R.jsx("p",{className:"mode-subtitle",children:"Choose your path"}),R.jsxs("div",{id:"mode-grid",children:[R.jsxs("div",{className:"mode-card","data-mode":"expedition",children:[R.jsx("span",{className:"mode-icon",children:"🗺️"}),R.jsx("span",{className:"mode-name",children:"Expedition"}),R.jsx("span",{className:"mode-desc",children:"The world is forged around you. Explore procedurally generated lands, discover settlements, and face the unknown."})]}),R.jsxs("div",{className:"mode-card","data-mode":"creative",children:[R.jsx("span",{className:"mode-icon",children:"✍️"}),R.jsx("span",{className:"mode-name",children:"Creative"}),R.jsx("span",{className:"mode-desc",children:"Shape the world as Dungeon Master. Place settlements, design hex maps, and craft your story."})]})]})]})}),R.jsx("div",{id:"lobby",style:{display:"none"},children:R.jsxs("div",{id:"lobby-box",children:[R.jsx("p",{className:"lobby-label",children:"Your Name"}),R.jsx("input",{type:"text",id:"player-name",maxLength:20,placeholder:"Enter adventurer name...",autoComplete:"off"}),R.jsx("p",{className:"lobby-label",children:"Choose Your Class"}),R.jsxs("div",{id:"class-grid",children:[R.jsxs("div",{className:"class-card","data-class":"warrior",children:[R.jsx("span",{className:"class-icon",children:"⚔️"}),R.jsx("span",{className:"class-name",children:"Warrior"}),R.jsx("span",{className:"class-desc",children:"Hardy fighter and shield-bearer of the realm"})]}),R.jsxs("div",{className:"class-card","data-class":"ranger",children:[R.jsx("span",{className:"class-icon",children:"🏹"}),R.jsx("span",{className:"class-name",children:"Ranger"}),R.jsx("span",{className:"class-desc",children:"Scout, archer, wilderness survivalist"})]}),R.jsxs("div",{className:"class-card","data-class":"mage",children:[R.jsx("span",{className:"class-icon",children:"🔮"}),R.jsx("span",{className:"class-name",children:"Mage"}),R.jsx("span",{className:"class-desc",children:"Arcane power, keeper of ancient spells"})]}),R.jsxs("div",{className:"class-card","data-class":"rogue",children:[R.jsx("span",{className:"class-icon",children:"🗡️"}),R.jsx("span",{className:"class-name",children:"Rogue"}),R.jsx("span",{className:"class-desc",children:"Stealthy, cunning, strikes from shadows"})]})]}),R.jsx("div",{id:"lobby-error"}),R.jsx("button",{id:"join-btn",disabled:!0,children:"Enter the Realm"})]})})]})}function iy(){return R.jsx("div",{style:{background:"#111",minHeight:"100vh",fontFamily:"Georgia, serif",paddingTop:60},children:R.jsxs("div",{style:{margin:"40px auto",maxWidth:900,padding:"32px 40px",background:"rgba(0,0,0,0.6)",border:"1px solid #3a3a50",borderRadius:8},children:[R.jsx("h1",{style:{color:"#c9a84c",letterSpacing:"0.15em",marginBottom:24},children:"Battlemap"}),R.jsx("p",{style:{color:"#888",fontSize:"0.85rem"},children:"Battlemap tools coming soon."})]})})}const Xf="hx_content";function aa(){try{return JSON.parse(localStorage.getItem(Xf))||[]}catch{return[]}}function S_(s){return aa().filter(e=>e.type===s)}function Yf(s){return aa().find(e=>e.id===s)??null}function M_(s){var l;const e=aa(),t=new Date().toISOString(),r=e.findIndex(u=>u.id===s.id),o={...s,updatedAt:t,createdAt:((l=e[r])==null?void 0:l.createdAt)??t};return r>=0?e[r]=o:e.unshift(o),localStorage.setItem(Xf,JSON.stringify(e)),o}function ry(s){localStorage.setItem(Xf,JSON.stringify(aa().filter(e=>e.id!==s)))}function Km(s){return((s==null?void 0:s.innerText)||"").trim().split(/\s+/).filter(Boolean).length}const sy=[{label:"B",cls:"art-bold",title:"Bold (Ctrl+B)",cmd:"bold"},{label:"I",cls:"art-italic",title:"Italic (Ctrl+I)",cmd:"italic"},null,{label:"H1",title:"Heading 1",cmd:"formatBlock",val:"h1"},{label:"H2",title:"Heading 2",cmd:"formatBlock",val:"h2"},{label:"H3",title:"Heading 3",cmd:"formatBlock",val:"h3"},{label:"P",title:"Normal paragraph",cmd:"formatBlock",val:"p"},null,{label:'"',title:"Block quote",cmd:"formatBlock",val:"blockquote"},{label:"•",title:"Bullet list",cmd:"insertUnorderedList"},{label:"1.",title:"Numbered list",cmd:"insertOrderedList"},null,{label:"—",title:"Horizontal rule",cmd:"insertHorizontalRule"}];function Zm(){const[s]=_c(),e=s.get("id")||null,[t,r]=ge.useState("Untitled Article"),[o,l]=ge.useState(!0),[u,f]=ge.useState(0),h=ge.useRef(null),p=ge.useRef(e);ge.useEffect(()=>{var b;if(!e)return;const M=Yf(e);M&&(r(M.name||"Untitled Article"),h.current&&((b=M.data)!=null&&b.html)&&(h.current.innerHTML=M.data.html,f(Km(h.current))))},[e]);function v(){const M=h.current;if(!M)return;const b=p.current||crypto.randomUUID();p.current=b,M_({id:b,type:"article",name:t,data:{html:M.innerHTML,text:M.innerText}}),l(!0)}function x(){var y;const M=((y=h.current)==null?void 0:y.innerText)||"",b=new Blob([M],{type:"text/plain"}),_=document.createElement("a");_.href=URL.createObjectURL(b),_.download=(t||"article")+".txt",_.click()}function g(){l(!1),f(Km(h.current))}function S(M,b){var _;document.execCommand(M,!1,b??null),(_=h.current)==null||_.focus(),l(!1)}return R.jsxs("div",{id:"article-root",children:[R.jsxs("div",{id:"art-header",children:[R.jsx("h1",{children:"Article Editor"}),R.jsx("div",{className:"art-sep"}),R.jsx("span",{className:"art-label",children:"Title"}),R.jsx("input",{id:"art-input-title",type:"text",value:t,onChange:M=>{r(M.target.value),l(!1)},maxLength:120,spellCheck:!1}),R.jsx("div",{className:"art-sep"}),R.jsx("button",{className:"art-btn primary",onClick:v,children:"Save"}),R.jsx("button",{className:"art-btn",onClick:x,children:"Export .txt"})]}),R.jsx("div",{id:"art-toolbar",children:sy.map((M,b)=>M===null?R.jsx("div",{className:"art-tbsep"},b):R.jsx("button",{className:`art-tool-btn${M.cls?" "+M.cls:""}`,title:M.title,onMouseDown:_=>{_.preventDefault(),S(M.cmd,M.val)},children:M.label},b))}),R.jsx("div",{id:"art-content",children:R.jsx("div",{id:"art-editor",ref:h,contentEditable:!0,suppressContentEditableWarning:!0,"data-placeholder":"Begin writing your article...",onInput:g,onKeyDown:M=>{(M.ctrlKey||M.metaKey)&&M.key==="s"&&(M.preventDefault(),v())}})}),R.jsxs("div",{id:"art-statusbar",children:[R.jsxs("span",{children:[u," ",u===1?"word":"words"]}),R.jsx("span",{className:"art-sbsep",children:"|"}),R.jsx("span",{style:{color:o?"#3a3830":"#c9a84c"},children:o?"Saved":"Unsaved changes"}),R.jsx("span",{id:"art-status-hint",children:"Ctrl+S to save · Ctrl+B bold · Ctrl+I italic"})]})]})}function ay(){const[s]=_c(),e=s.get("id")||null,[t,r]=ge.useState([{id:"init",name:"Layer 1",height:10}]),[o,l]=ge.useState(0),[u,f]=ge.useState(!1),[h,p]=ge.useState(!1),[v,x]=ge.useState(!1),g=ge.useRef(null);ge.useEffect(()=>{window.__editorContentId=e,window.__editorOnLevelsChanged=(P,k)=>{r(P.map(I=>({id:I.id,name:I.name,height:I.height??10}))),l(k)};const L=document.createElement("script");return L.src="/editor.js",L.async=!1,document.body.appendChild(L),()=>{window.cleanupEditor&&window.cleanupEditor(),window.__editorContentId=null,window.__editorOnLevelsChanged=null;const P=document.querySelector('script[src="/editor.js"]');P&&document.body.removeChild(P)}},[e]),ge.useEffect(()=>{var L,P;v&&g.current?(L=window.editorInitSection)==null||L.call(window,g.current):v||(P=window.editorInitSection)==null||P.call(window,null)},[v]);function S(){var P;const L=(P=window.editorToggleGhostAbove)==null?void 0:P.call(window);L!==void 0&&f(L)}function M(){var P;const L=(P=window.editorToggleGhostBelow)==null?void 0:P.call(window);L!==void 0&&p(L)}function b(){var P;const L=(P=window.editorToggleSection)==null?void 0:P.call(window);L!==void 0&&x(L)}function _(L,P){var I;const k=prompt("Rename layer:",P);k!=null&&k.trim()&&((I=window.editorRenameLevel)==null||I.call(window,L,k.trim()))}function y(L,P){var z;const k=prompt(`Height for "${t[L].name}" (feet):`,P),I=parseInt(k,10);!isNaN(I)&&I>0&&((z=window.editorSetLayerHeight)==null||z.call(window,L,I))}function C(L){return{draggable:!0,onDragStart:P=>{P.dataTransfer.effectAllowed="move",P.dataTransfer.setData("text/plain",String(L)),P.currentTarget.classList.add("lv-dragging")},onDragOver:P=>{P.preventDefault(),P.dataTransfer.dropEffect="move",P.currentTarget.classList.add("lv-dragover")},onDragLeave:P=>P.currentTarget.classList.remove("lv-dragover"),onDrop:P=>{var I;P.preventDefault(),P.currentTarget.classList.remove("lv-dragover");const k=parseInt(P.dataTransfer.getData("text/plain"),10);!isNaN(k)&&k!==L&&((I=window.editorReorderLevel)==null||I.call(window,k,L))},onDragEnd:P=>P.currentTarget.classList.remove("lv-dragging","lv-dragover")}}return R.jsxs("div",{id:"editor-root",children:[R.jsxs("div",{id:"header",children:[R.jsx("h1",{children:"Dungeon Editor"}),R.jsx("div",{className:"sep"}),R.jsx("span",{className:"hdr-label",children:"Name"}),R.jsx("input",{type:"text",id:"input-name",defaultValue:"Untitled Dungeon",maxLength:60,spellCheck:!1}),R.jsx("div",{className:"sep"}),R.jsx("button",{id:"btn-new",className:"hdr-btn warn",children:"New"}),R.jsx("button",{id:"btn-load",className:"hdr-btn",children:"Load JSON"}),R.jsx("button",{id:"btn-save",className:"hdr-btn primary",children:"Save"}),R.jsx("button",{id:"btn-export",className:"hdr-btn",children:"Export JSON"}),R.jsx("button",{id:"btn-fit",className:"hdr-btn",children:"Fit View"}),R.jsx("input",{type:"file",id:"file-input",accept:".json",style:{display:"none"}})]}),R.jsxs("div",{id:"toolbar",children:[R.jsxs("button",{className:"tool-btn","data-tool":"rect",children:["Rect ",R.jsx("span",{className:"key",children:"R"})]}),R.jsxs("button",{className:"tool-btn","data-tool":"paint",children:["Paint ",R.jsx("span",{className:"key",children:"B"})]}),R.jsxs("button",{className:"tool-btn","data-tool":"erase",children:["Erase ",R.jsx("span",{className:"key",children:"E"})]}),R.jsxs("button",{className:"tool-btn","data-tool":"fill",children:["Fill ",R.jsx("span",{className:"key",children:"F"})]}),R.jsxs("button",{className:"tool-btn","data-tool":"pick",children:["Pick ",R.jsx("span",{className:"key",children:"P"})]}),R.jsxs("button",{className:"tool-btn","data-tool":"wall",children:["Wall ",R.jsx("span",{className:"key",children:"W"})]}),R.jsxs("button",{className:"tool-btn","data-tool":"door",children:["Door ",R.jsx("span",{className:"key",children:"D"})]}),R.jsx("div",{className:"tbsep"}),R.jsx("button",{id:"btn-undo",className:"icon-btn",children:"↩ Undo"}),R.jsx("button",{id:"btn-redo",className:"icon-btn",children:"↪ Redo"}),R.jsx("div",{className:"tbsep"}),R.jsx("button",{id:"btn-section",className:`icon-btn${v?" active":""}`,onClick:b,title:"Toggle cross-section side view",children:"⊟ Section"}),R.jsxs("div",{id:"selected-info",children:["Selected: ",R.jsx("span",{id:"selected-tile-swatch"}),R.jsx("span",{id:"selected-tile-name",children:"Floor"})]})]}),R.jsxs("div",{id:"main",children:[R.jsxs("div",{id:"layers-panel",children:[R.jsx("div",{className:"layers-header",children:"Layers"}),R.jsx("div",{className:"layers-list",children:t.map((L,P)=>R.jsxs("button",{className:`layer-tab${P===o?" active":""}`,...C(P),onClick:()=>{var k;return(k=window.editorSwitchLevel)==null?void 0:k.call(window,P)},onDoubleClick:()=>_(P,L.name),title:"Drag to reorder · Double-click to rename",children:[R.jsx("span",{className:"layer-tab-name",children:L.name}),R.jsxs("span",{className:"layer-tab-actions",children:[v&&R.jsxs("span",{className:"level-height",onClick:k=>{k.stopPropagation(),y(P,L.height)},title:"Click to edit layer height",children:[L.height,"ft"]}),t.length>1&&R.jsx("span",{className:"layer-tab-close",onClick:k=>{var I;k.stopPropagation(),(I=window.editorDeleteLevel)==null||I.call(window,P)},children:"×"})]})]},L.id))}),R.jsxs("div",{className:"layers-footer",children:[R.jsx("button",{className:"layer-add",onClick:()=>{var L;return(L=window.editorAddLevel)==null?void 0:L.call(window)},children:"+ Layer"}),o>0&&R.jsx("button",{className:`layer-ghost${u?" active":""}`,onClick:S,title:"Show all layers above as ghost overlay",children:"▲ Ghost"}),o<t.length-1&&R.jsx("button",{className:`layer-ghost${h?" active":""}`,onClick:M,title:"Show all layers below as ghost overlay",children:"▼ Ghost"})]})]}),R.jsx("div",{id:"palette"}),R.jsxs("div",{id:"main-right",children:[R.jsx("div",{id:"canvas-wrap",children:R.jsx("canvas",{id:"editor-canvas",tabIndex:0})}),v&&R.jsx("div",{id:"section-panel",children:R.jsx("canvas",{id:"section-canvas",ref:g})})]})]}),R.jsxs("div",{id:"statusbar",children:[R.jsx("span",{id:"status-pos"}),R.jsx("span",{id:"status-tile"}),R.jsx("span",{className:"sbsep",children:"|"}),R.jsx("span",{id:"status-tool",children:"Tool: rect"}),R.jsx("span",{id:"status-hint",children:"Space or middle-drag to pan · Scroll to zoom · Ctrl+Z undo"})]})]})}const oy=[{key:"battlemap",title:"Battlemap",icon:"⚔️",href:"/create/battlemap",desc:"Design dungeon encounters tile by tile. Place walls, doors, traps, and features for your players to discover."},{key:"voxel3d",title:"3D Battlemap",icon:"🧱",href:"/create/voxel3d",desc:"Build dungeons in three dimensions. Stack voxel blocks to sculpt multi-level rooms, towers, and caverns."},{key:"article",title:"Article",icon:"📜",href:"/create/article",desc:"Write lore, campaign notes, faction histories, and world-building entries for your setting."},{key:"hexmap",title:"Hex Map",icon:"🗺️",href:"/create/hexmap",desc:"Chart the wilds. Place biomes, settlements, dungeons, and points of interest across your world."}],ly={display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",background:"#0d0d18",border:"1px solid #2a2a3a",borderRadius:10,padding:"36px 28px",cursor:"pointer",transition:"border-color 0.15s, background 0.15s",textDecoration:"none",gap:10};function cy(){return R.jsx("div",{style:{background:"#111",minHeight:"100vh",fontFamily:"Georgia, serif",paddingTop:80},children:R.jsxs("div",{style:{maxWidth:760,margin:"0 auto",padding:"40px 24px"},children:[R.jsx("h1",{style:{color:"#c9a84c",fontSize:"1.3rem",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:6},children:"Create"}),R.jsx("p",{style:{color:"#3a3830",fontSize:"0.8rem",letterSpacing:"0.1em",marginBottom:40},children:"What would you like to build?"}),R.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:16},children:oy.map(s=>{const e=S_(s.key).length;return R.jsxs(sc,{to:s.href,style:ly,onMouseEnter:t=>{t.currentTarget.style.borderColor="#c9a84c",t.currentTarget.style.background="#181828"},onMouseLeave:t=>{t.currentTarget.style.borderColor="#2a2a3a",t.currentTarget.style.background="#0d0d18"},children:[R.jsx("span",{style:{fontSize:"2.4rem"},children:s.icon}),R.jsx("span",{style:{color:"#c9a84c",fontWeight:"bold",fontSize:"0.95rem",letterSpacing:"0.06em"},children:s.title}),R.jsx("span",{style:{color:"#4a4540",fontSize:"0.74rem",lineHeight:1.6,flex:1},children:s.desc}),e>0&&R.jsxs("span",{style:{color:"#5a5040",fontSize:"0.68rem",marginTop:8},children:[e," saved"]})]},s.key)})})]})})}const uy={battlemap:"Battlemap",article:"Article",hexmap:"Hex Map"},dy={battlemap:"⚔️",article:"📜",hexmap:"🗺️"},fy={battlemap:"/create/battlemap",article:"/create/article",hexmap:"/create/hexmap"},hy=["All","Battlemap","Article","Hex Map"],py={All:null,Battlemap:"battlemap",Article:"article","Hex Map":"hexmap"};function my(s){return s?new Date(s).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):""}function gy(){const[s,e]=ge.useState([]),[t,r]=ge.useState("All"),o=jf();ge.useEffect(()=>{e(aa())},[]);function l(h,p){confirm(`Delete "${p}"?`)&&(ry(h),e(aa()))}const u=py[t],f=u?s.filter(h=>h.type===u):s;return R.jsx("div",{style:{background:"#111",minHeight:"100vh",fontFamily:"Georgia, serif",paddingTop:80},children:R.jsxs("div",{style:{maxWidth:900,margin:"0 auto",padding:"40px 24px"},children:[R.jsxs("div",{style:{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:6},children:[R.jsx("h1",{style:{color:"#c9a84c",fontSize:"1.3rem",letterSpacing:"0.2em",textTransform:"uppercase"},children:"Library"}),R.jsx(sc,{to:"/create",style:{color:"#c9a84c",fontSize:"0.78rem",border:"1px solid #3a3020",borderRadius:4,padding:"4px 14px",textDecoration:"none"},children:"+ Create"})]}),R.jsxs("p",{style:{color:"#3a3830",fontSize:"0.8rem",letterSpacing:"0.1em",marginBottom:32},children:[s.length," item",s.length!==1?"s":""," saved"]}),R.jsx("div",{style:{display:"flex",gap:6,marginBottom:28},children:hy.map(h=>R.jsx("button",{onClick:()=>r(h),style:{background:t===h?"#1e1a0c":"transparent",border:`1px solid ${t===h?"#c9a84c":"#2a2a3a"}`,borderRadius:4,color:t===h?"#c9a84c":"#4a4540",fontFamily:"Georgia, serif",fontSize:"0.76rem",padding:"4px 14px",cursor:"pointer"},children:h},h))}),f.length===0&&R.jsx("div",{style:{color:"#2a2a2a",textAlign:"center",paddingTop:80,fontSize:"0.85rem"},children:s.length===0?R.jsxs(R.Fragment,{children:[R.jsx("p",{style:{marginBottom:16},children:"Nothing saved yet."}),R.jsx(sc,{to:"/create",style:{color:"#c9a84c",fontSize:"0.78rem"},children:"Start creating →"})]}):R.jsxs("p",{children:["No ",t.toLowerCase()," items yet."]})}),R.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:14},children:f.map(h=>R.jsxs("div",{style:{background:"#0d0d18",border:"1px solid #2a2a3a",borderRadius:8,padding:"18px 20px",display:"flex",flexDirection:"column",gap:8},children:[R.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[R.jsx("span",{style:{fontSize:"1.1rem"},children:dy[h.type]??"📄"}),R.jsx("span",{style:{fontSize:"0.6rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"#5a5040",border:"1px solid #2a2520",borderRadius:3,padding:"1px 6px"},children:uy[h.type]??h.type})]}),R.jsx("div",{style:{color:"#e0d8c8",fontSize:"0.92rem",fontWeight:"bold",lineHeight:1.3},children:h.name||"Untitled"}),R.jsxs("div",{style:{color:"#3a3830",fontSize:"0.7rem",flex:1},children:["Updated ",my(h.updatedAt)]}),R.jsxs("div",{style:{display:"flex",gap:8,marginTop:6},children:[R.jsx("button",{onClick:()=>o(`${fy[h.type]??"/create"}?id=${h.id}`),style:{flex:1,background:"#181510",border:"1px solid #3a3020",borderRadius:4,color:"#c9a84c",fontFamily:"Georgia, serif",fontSize:"0.74rem",padding:"5px 0",cursor:"pointer"},children:"Edit"}),R.jsx("button",{onClick:()=>l(h.id,h.name),style:{background:"transparent",border:"1px solid #2a1a1a",borderRadius:4,color:"#5a3030",fontFamily:"Georgia, serif",fontSize:"0.74rem",padding:"5px 12px",cursor:"pointer"},children:"Delete"})]})]},h.id))})]})})}const _y={ocean:{label:"Ocean",color:"#1a4a6e"},coast:{label:"Coast",color:"#3a8abf"},plains:{label:"Plains",color:"#7eb05a"},forest:{label:"Forest",color:"#2d6a4f"},hills:{label:"Hills",color:"#7a9c52"},highland:{label:"Highland",color:"#8a9e72"},mountain:{label:"Mountain",color:"#7a7a8a"},desert:{label:"Desert",color:"#c9a84c"},swamp:{label:"Swamp",color:"#4a6741"},settlement:{label:"Settlement",color:"#8a6030"}},vy={ocean:5,coast:8,plains:30,forest:22,hills:15,highland:10,mountain:5,desert:3,swamp:2,settlement:0};function xy(s){let e=Math.abs(s|0)%2147483647||1;return()=>(e=e*16807%2147483647,(e-1)/2147483646)}function yy(s,e,t,r){const o=xy(e),l=r.q-(r.r-(r.r&1))/2,u=r.r,f=[];for(let g=-s;g<=s;g++)for(let S=Math.max(-s,-g-s);S<=Math.min(s,-g+s);S++)f.push({aq:l+g,ar:u+S});const h=Object.entries(t).filter(([,g])=>g>0),p=h.reduce((g,[,S])=>g+S,0);if(p===0)return f.map(({aq:g,ar:S})=>({q:g+(S-(S&1))/2,r:S,biome:"plains"}));const v=Math.max(6,Math.floor(f.length/6)),x=Array.from({length:v},()=>{let g=o()*p,S=0,M=h[0][0];for(const[_,y]of h)if(S+=y,g<=S){M=_;break}const b=f[Math.floor(o()*f.length)];return{aq:b.aq,ar:b.ar,biome:M}});return f.map(({aq:g,ar:S})=>{let M=x[0].biome,b=1/0;for(const _ of x){const y=g-_.aq,C=S-_.ar,L=(Math.abs(y)+Math.abs(C)+Math.abs(y+C))/2;L<b&&(b=L,M=_.biome)}return{q:g+(S-(S&1))/2,r:S,biome:M}})}function Ml({children:s}){return R.jsx("div",{style:{fontSize:"0.6rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"#3a3530",marginBottom:5},children:s})}function Sy(){const[s]=_c(),e=s.get("id")||null,[t,r]=ge.useState("biomes"),[o,l]=ge.useState(8),[u,f]=ge.useState(()=>Math.floor(Math.random()*99999)+1),[h,p]=ge.useState(vy),[v,x]=ge.useState(null),[g,S]=ge.useState(!1),[M,b]=ge.useState([]),[_,y]=ge.useState([]),[C,L]=ge.useState(null);ge.useEffect(()=>{window.__hexmapContentId=e,window.__hexmapOnLinksChanged=()=>{window.hexmapGetAllLinks&&y(window.hexmapGetAllLinks())},window.__hexmapOnHexHover=(B,F,q)=>{var ie,Y;if(!q||B===null){L(null);return}const ae=(ie=window.hexmapGetHexScreenPos)==null?void 0:ie.call(window,B,F);if(!ae){L(null);return}const de=Yf(q.id),j=(((Y=de==null?void 0:de.data)==null?void 0:Y.text)||"").replace(/\s+/g," ").trim().slice(0,200);L({name:q.name,preview:j,x:ae.x,y:ae.y,size:ae.size})};const D=document.createElement("script");return D.src="/hexmap.js",D.async=!1,document.body.appendChild(D),()=>{window.cleanupHexmap&&window.cleanupHexmap(),window.__hexmapContentId=null;const B=document.querySelector('script[src="/hexmap.js"]');B&&document.body.removeChild(B)}},[e]),ge.useEffect(()=>{t==="links"&&(b(S_("article")),window.hexmapGetAllLinks&&y(window.hexmapGetAllLinks()))},[t]),ge.useEffect(()=>{t!=="generate"&&g&&(S(!1),window.hexmapCancelPickCenter&&window.hexmapCancelPickCenter())},[t,g]);const P=ge.useCallback(()=>{window.hexmapStartPickCenter&&(S(!0),window.hexmapStartPickCenter(({q:D,r:B})=>{x({q:D,r:B}),S(!1)}))},[]),k=ge.useCallback(()=>{S(!1),window.hexmapCancelPickCenter&&window.hexmapCancelPickCenter()},[]);function I(D){if(!v)return;const F=yy(o,D??u,h,v);window.hexmapLoadHexes&&window.hexmapLoadHexes(F)}function z(){const D=Math.floor(Math.random()*99999)+1;f(D),I(D)}const T=v?`(${v.q}, ${v.r})`:"None";return R.jsxs("div",{id:"hexmap-root",children:[R.jsxs("div",{id:"hx-header",children:[R.jsx("h1",{children:"Hex Map Editor"}),R.jsx("div",{className:"hx-sep"}),R.jsx("span",{className:"hx-label",children:"Name"}),R.jsx("input",{type:"text",id:"hx-input-name",defaultValue:"Untitled Hex Map",maxLength:60,spellCheck:!1}),R.jsx("div",{className:"hx-sep"}),R.jsx("button",{id:"btn-hx-save",className:"hx-btn primary",children:"Save"}),R.jsx("button",{id:"btn-hx-export",className:"hx-btn",children:"Export JSON"}),R.jsx("button",{id:"btn-hx-fit",className:"hx-btn",children:"Fit View"})]}),R.jsxs("div",{id:"hx-toolbar",children:[R.jsxs("button",{className:"hx-tool-btn","data-tool":"paint",children:["Paint ",R.jsx("span",{className:"hx-key",children:"B"})]}),R.jsxs("button",{className:"hx-tool-btn","data-tool":"erase",children:["Erase ",R.jsx("span",{className:"hx-key",children:"E"})]}),R.jsxs("button",{className:"hx-tool-btn","data-tool":"fill",children:["Fill ",R.jsx("span",{className:"hx-key",children:"F"})]}),R.jsxs("button",{className:"hx-tool-btn","data-tool":"pick",children:["Pick ",R.jsx("span",{className:"hx-key",children:"P"})]}),R.jsxs("button",{className:"hx-tool-btn","data-tool":"pan",children:["Pan ",R.jsx("span",{className:"hx-key",children:"H"})]}),R.jsx("div",{className:"hx-tbsep"}),R.jsx("button",{id:"btn-hx-undo",className:"hx-tool-btn",children:"↩ Undo"}),R.jsx("button",{id:"btn-hx-redo",className:"hx-tool-btn",children:"↪ Redo"}),R.jsxs("div",{id:"hx-selected-info",children:["Selected: ",R.jsx("span",{id:"hx-selected-tile-swatch"}),R.jsx("span",{id:"hx-selected-tile-name",children:"Plains"})]})]}),R.jsxs("div",{id:"hx-main",children:[R.jsxs("div",{id:"hx-sidebar",children:[R.jsxs("div",{id:"hx-sidebar-tabs",children:[R.jsx("button",{className:`hx-stab${t==="biomes"?" active":""}`,onClick:()=>r("biomes"),children:"Biomes"}),R.jsx("button",{className:`hx-stab${t==="generate"?" active":""}`,onClick:()=>r("generate"),children:"Generate"}),R.jsx("button",{className:`hx-stab${t==="links"?" active":""}`,onClick:()=>r("links"),children:"Links"})]}),R.jsx("div",{id:"hx-palette",style:{display:t==="biomes"?"flex":"none"}}),t==="links"&&R.jsxs("div",{id:"hx-links-panel",children:[_.length>0&&R.jsxs("div",{className:"hx-links-section",children:[R.jsx("div",{className:"hx-links-label",children:"On this map"}),_.map(D=>R.jsxs("div",{className:"hx-link-row",children:[R.jsx("span",{className:"hx-link-badge",children:"A"}),R.jsx("span",{className:"hx-link-name",title:D.name,children:D.name}),R.jsxs("span",{className:"hx-link-coord",children:["(",D.q,",",D.r,")"]}),R.jsx("button",{className:"hx-link-unlink",title:"Remove link",onClick:()=>{window.hexmapUnlinkArticle&&window.hexmapUnlinkArticle(D.q,D.r)},children:"×"})]},`${D.q},${D.r}`))]}),R.jsxs("div",{className:"hx-links-section",children:[R.jsx("div",{className:"hx-links-label",children:"Drag to a hex"}),M.length===0?R.jsxs("div",{className:"hx-links-empty",children:["No articles saved yet.",R.jsx("br",{}),"Create one in the Article Editor."]}):M.map(D=>R.jsxs("div",{className:"hx-draggable-article",draggable:!0,onDragStart:B=>{B.dataTransfer.setData("application/hexmap-article",JSON.stringify({id:D.id,name:D.name})),B.dataTransfer.effectAllowed="link"},children:[R.jsx("span",{className:"hx-link-badge",children:"A"}),R.jsx("span",{className:"hx-link-name",title:D.name,children:D.name})]},D.id))]})]}),R.jsxs("div",{id:"hx-gen-panel",style:{display:t==="generate"?"flex":"none"},children:[R.jsxs("div",{children:[R.jsx(Ml,{children:"Center hex"}),g?R.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[R.jsx("div",{style:{fontSize:"0.66rem",color:"#c9a84c",lineHeight:1.5},children:"Click any hex on the canvas. Esc to cancel."}),R.jsx("button",{className:"hx-gen-btn",onClick:k,children:"Cancel"})]}):R.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[R.jsx("div",{style:{fontSize:"0.72rem",color:v?"#a09060":"#3a3530",fontFamily:"Georgia, serif"},children:T}),R.jsx("button",{className:"hx-gen-btn",onClick:P,children:v?"Change center":"Pick on map"})]})]}),R.jsxs("div",{children:[R.jsxs(Ml,{children:["Radius — ",o," hexes"]}),R.jsx("input",{type:"range",min:1,max:20,value:o,onChange:D=>l(+D.target.value),className:"hx-gen-slider"})]}),R.jsxs("div",{children:[R.jsx(Ml,{children:"Seed"}),R.jsx("input",{type:"number",className:"hx-gen-input",value:u,onChange:D=>f(+D.target.value||1)})]}),R.jsxs("div",{children:[R.jsx(Ml,{children:"Biome Weights"}),Object.entries(_y).map(([D,{label:B,color:F}])=>R.jsxs("div",{style:{marginBottom:6},children:[R.jsxs("div",{className:"hx-gen-biome-row",children:[R.jsx("span",{className:"hx-gen-biome-swatch",style:{background:F}}),R.jsx("span",{className:"hx-gen-biome-name",children:B}),R.jsx("span",{className:"hx-gen-biome-val",children:h[D]})]}),R.jsx("input",{type:"range",min:0,max:60,value:h[D],onChange:q=>p(ae=>({...ae,[D]:+q.target.value})),className:"hx-gen-slider"})]},D))]}),R.jsxs("div",{className:"hx-gen-actions",children:[!v&&R.jsx("div",{style:{fontSize:"0.64rem",color:"#3a3530",textAlign:"center",marginBottom:4},children:"Pick a center hex first"}),R.jsx("button",{className:"hx-gen-btn primary",onClick:()=>I(),disabled:!v||g,children:"Apply to canvas"}),R.jsx("button",{className:"hx-gen-btn",onClick:z,disabled:!v||g,children:"Random seed + apply"})]})]})]}),R.jsxs("div",{id:"hx-canvas-wrap",children:[R.jsx("canvas",{id:"hx-canvas",tabIndex:0}),R.jsx("div",{id:"hx-toast"}),g&&R.jsx("div",{style:{position:"absolute",top:10,left:"50%",transform:"translateX(-50%)",background:"rgba(10,8,6,0.9)",border:"1px solid #c9a84c",borderRadius:6,color:"#c9a84c",fontSize:"0.75rem",padding:"6px 16px",pointerEvents:"none",whiteSpace:"nowrap"},children:"Click a hex to set the generation center · Esc to cancel"})]}),C&&R.jsxs("div",{id:"hx-article-card",style:{left:Math.max(8,Math.min(C.x-120,window.innerWidth-264)),top:C.y-C.size*1.4,transform:"translateY(-100%)"},children:[R.jsxs("div",{className:"hx-ac-header",children:[R.jsx("span",{className:"hx-ac-name",children:C.name}),R.jsx("span",{className:"hx-ac-tag",children:"Article"})]}),C.preview&&R.jsxs("p",{className:"hx-ac-preview",children:[C.preview,C.preview.length>=200?"…":""]})]})]}),R.jsxs("div",{id:"hx-statusbar",children:[R.jsx("span",{id:"hx-status-pos"}),R.jsx("span",{id:"hx-status-tile"}),R.jsx("span",{id:"hx-status-article",style:{color:"#c9a84c"}}),R.jsx("span",{className:"sbsep",children:"|"}),R.jsx("span",{id:"hx-status-tool",children:"Tool: paint"}),R.jsx("span",{id:"hx-status-hint",children:"Hold Space to pan · Scroll to zoom · Ctrl+Z undo · Drag articles from Links tab"})]})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qf="184",Br={ROTATE:0,DOLLY:1,PAN:2},na={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},My=0,Jm=1,Ey=2,Jl=1,E_=2,oo=3,zr=0,Gn=1,Ei=2,sr=0,ia=1,Qm=2,eg=3,tg=4,Ty=5,us=100,wy=101,by=102,Ay=103,Ry=104,Cy=200,Py=201,Ly=202,Dy=203,Yd=204,qd=205,Ny=206,Iy=207,Uy=208,Fy=209,Oy=210,ky=211,By=212,zy=213,Hy=214,$d=0,Kd=1,Zd=2,oa=3,Jd=4,Qd=5,ef=6,tf=7,$f=0,Vy=1,Gy=2,Oi=0,T_=1,w_=2,b_=3,A_=4,R_=5,C_=6,P_=7,L_=300,ps=301,la=302,ad=303,od=304,vc=306,nf=1e3,ir=1001,rf=1002,xn=1003,Wy=1004,El=1005,An=1006,ld=1007,fs=1008,Zn=1009,D_=1010,N_=1011,ho=1012,Kf=1013,Bi=1014,Ui=1015,or=1016,Zf=1017,Jf=1018,po=1020,I_=35902,U_=35899,F_=1021,O_=1022,Ti=1023,lr=1026,hs=1027,k_=1028,Qf=1029,ms=1030,eh=1031,th=1033,Ql=33776,ec=33777,tc=33778,nc=33779,sf=35840,af=35841,of=35842,lf=35843,cf=36196,uf=37492,df=37496,ff=37488,hf=37489,ac=37490,pf=37491,mf=37808,gf=37809,_f=37810,vf=37811,xf=37812,yf=37813,Sf=37814,Mf=37815,Ef=37816,Tf=37817,wf=37818,bf=37819,Af=37820,Rf=37821,Cf=36492,Pf=36494,Lf=36495,Df=36283,Nf=36284,oc=36285,If=36286,jy=3200,Uf=0,Xy=1,Ur="",li="srgb",lc="srgb-linear",cc="linear",Dt="srgb",Vs=7680,ng=519,Yy=512,qy=513,$y=514,nh=515,Ky=516,Zy=517,ih=518,Jy=519,ig=35044,rg="300 es",Fi=2e3,mo=2001;function Qy(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function uc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function eS(){const s=uc("canvas");return s.style.display="block",s}const sg={};function ag(...s){const e="THREE."+s.shift();console.log(e,...s)}function B_(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function nt(...s){s=B_(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Et(...s){s=B_(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function Ff(...s){const e=s.join(" ");e in sg||(sg[e]=!0,nt(...s))}function tS(s,e,t){return new Promise(function(r,o){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:o();break;case s.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:r()}}setTimeout(l,t)})}const nS={[$d]:Kd,[Zd]:ef,[Jd]:tf,[oa]:Qd,[Kd]:$d,[ef]:Zd,[tf]:Jd,[Qd]:oa};class Wr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){const r=this._listeners;if(r===void 0)return;const o=r[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const r=t[e.type];if(r!==void 0){e.target=this;const o=r.slice(0);for(let l=0,u=o.length;l<u;l++)o[l].call(this,e);e.target=null}}}const wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],co=Math.PI/180,Of=180/Math.PI;function _o(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(wn[s&255]+wn[s>>8&255]+wn[s>>16&255]+wn[s>>24&255]+"-"+wn[e&255]+wn[e>>8&255]+"-"+wn[e>>16&15|64]+wn[e>>24&255]+"-"+wn[t&63|128]+wn[t>>8&255]+"-"+wn[t>>16&255]+wn[t>>24&255]+wn[r&255]+wn[r>>8&255]+wn[r>>16&255]+wn[r>>24&255]).toLowerCase()}function xt(s,e,t){return Math.max(e,Math.min(t,s))}function iS(s,e){return(s%e+e)%e}function cd(s,e,t){return(1-t)*s+t*e}function Qa(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Hn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const rS={DEG2RAD:co},uh=class uh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,o=e.elements;return this.x=o[0]*t+o[3]*r+o[6],this.y=o[1]*t+o[4]*r+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(xt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(xt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),o=Math.sin(t),l=this.x-e.x,u=this.y-e.y;return this.x=l*r-u*o+e.x,this.y=l*o+u*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};uh.prototype.isVector2=!0;let ut=uh;class Hr{constructor(e=0,t=0,r=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=o}static slerpFlat(e,t,r,o,l,u,f){let h=r[o+0],p=r[o+1],v=r[o+2],x=r[o+3],g=l[u+0],S=l[u+1],M=l[u+2],b=l[u+3];if(x!==b||h!==g||p!==S||v!==M){let _=h*g+p*S+v*M+x*b;_<0&&(g=-g,S=-S,M=-M,b=-b,_=-_);let y=1-f;if(_<.9995){const C=Math.acos(_),L=Math.sin(C);y=Math.sin(y*C)/L,f=Math.sin(f*C)/L,h=h*y+g*f,p=p*y+S*f,v=v*y+M*f,x=x*y+b*f}else{h=h*y+g*f,p=p*y+S*f,v=v*y+M*f,x=x*y+b*f;const C=1/Math.sqrt(h*h+p*p+v*v+x*x);h*=C,p*=C,v*=C,x*=C}}e[t]=h,e[t+1]=p,e[t+2]=v,e[t+3]=x}static multiplyQuaternionsFlat(e,t,r,o,l,u){const f=r[o],h=r[o+1],p=r[o+2],v=r[o+3],x=l[u],g=l[u+1],S=l[u+2],M=l[u+3];return e[t]=f*M+v*x+h*S-p*g,e[t+1]=h*M+v*g+p*x-f*S,e[t+2]=p*M+v*S+f*g-h*x,e[t+3]=v*M-f*x-h*g-p*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,o){return this._x=e,this._y=t,this._z=r,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,o=e._y,l=e._z,u=e._order,f=Math.cos,h=Math.sin,p=f(r/2),v=f(o/2),x=f(l/2),g=h(r/2),S=h(o/2),M=h(l/2);switch(u){case"XYZ":this._x=g*v*x+p*S*M,this._y=p*S*x-g*v*M,this._z=p*v*M+g*S*x,this._w=p*v*x-g*S*M;break;case"YXZ":this._x=g*v*x+p*S*M,this._y=p*S*x-g*v*M,this._z=p*v*M-g*S*x,this._w=p*v*x+g*S*M;break;case"ZXY":this._x=g*v*x-p*S*M,this._y=p*S*x+g*v*M,this._z=p*v*M+g*S*x,this._w=p*v*x-g*S*M;break;case"ZYX":this._x=g*v*x-p*S*M,this._y=p*S*x+g*v*M,this._z=p*v*M-g*S*x,this._w=p*v*x+g*S*M;break;case"YZX":this._x=g*v*x+p*S*M,this._y=p*S*x+g*v*M,this._z=p*v*M-g*S*x,this._w=p*v*x-g*S*M;break;case"XZY":this._x=g*v*x-p*S*M,this._y=p*S*x-g*v*M,this._z=p*v*M+g*S*x,this._w=p*v*x+g*S*M;break;default:nt("Quaternion: .setFromEuler() encountered an unknown order: "+u)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,o=Math.sin(r);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],o=t[4],l=t[8],u=t[1],f=t[5],h=t[9],p=t[2],v=t[6],x=t[10],g=r+f+x;if(g>0){const S=.5/Math.sqrt(g+1);this._w=.25/S,this._x=(v-h)*S,this._y=(l-p)*S,this._z=(u-o)*S}else if(r>f&&r>x){const S=2*Math.sqrt(1+r-f-x);this._w=(v-h)/S,this._x=.25*S,this._y=(o+u)/S,this._z=(l+p)/S}else if(f>x){const S=2*Math.sqrt(1+f-r-x);this._w=(l-p)/S,this._x=(o+u)/S,this._y=.25*S,this._z=(h+v)/S}else{const S=2*Math.sqrt(1+x-r-f);this._w=(u-o)/S,this._x=(l+p)/S,this._y=(h+v)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xt(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const o=Math.min(1,t/r);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,o=e._y,l=e._z,u=e._w,f=t._x,h=t._y,p=t._z,v=t._w;return this._x=r*v+u*f+o*p-l*h,this._y=o*v+u*h+l*f-r*p,this._z=l*v+u*p+r*h-o*f,this._w=u*v-r*f-o*h-l*p,this._onChangeCallback(),this}slerp(e,t){let r=e._x,o=e._y,l=e._z,u=e._w,f=this.dot(e);f<0&&(r=-r,o=-o,l=-l,u=-u,f=-f);let h=1-t;if(f<.9995){const p=Math.acos(f),v=Math.sin(p);h=Math.sin(h*p)/v,t=Math.sin(t*p)/v,this._x=this._x*h+r*t,this._y=this._y*h+o*t,this._z=this._z*h+l*t,this._w=this._w*h+u*t,this._onChangeCallback()}else this._x=this._x*h+r*t,this._y=this._y*h+o*t,this._z=this._z*h+l*t,this._w=this._w*h+u*t,this.normalize();return this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),o=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(o*Math.sin(e),o*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const dh=class dh{constructor(e=0,t=0,r=0){this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(og.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(og.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*o,this.y=l[1]*t+l[4]*r+l[7]*o,this.z=l[2]*t+l[5]*r+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=e.elements,u=1/(l[3]*t+l[7]*r+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*o+l[12])*u,this.y=(l[1]*t+l[5]*r+l[9]*o+l[13])*u,this.z=(l[2]*t+l[6]*r+l[10]*o+l[14])*u,this}applyQuaternion(e){const t=this.x,r=this.y,o=this.z,l=e.x,u=e.y,f=e.z,h=e.w,p=2*(u*o-f*r),v=2*(f*t-l*o),x=2*(l*r-u*t);return this.x=t+h*p+u*x-f*v,this.y=r+h*v+f*p-l*x,this.z=o+h*x+l*v-u*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*o,this.y=l[1]*t+l[5]*r+l[9]*o,this.z=l[2]*t+l[6]*r+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(xt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,o=e.y,l=e.z,u=t.x,f=t.y,h=t.z;return this.x=o*h-l*f,this.y=l*u-r*h,this.z=r*f-o*u,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return ud.copy(this).projectOnVector(e),this.sub(ud)}reflect(e){return this.sub(ud.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(xt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,o=this.z-e.z;return t*t+r*r+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const o=Math.sin(t)*e;return this.x=o*Math.sin(r),this.y=Math.cos(t)*e,this.z=o*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};dh.prototype.isVector3=!0;let $=dh;const ud=new $,og=new Hr,fh=class fh{constructor(e,t,r,o,l,u,f,h,p){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,u,f,h,p)}set(e,t,r,o,l,u,f,h,p){const v=this.elements;return v[0]=e,v[1]=o,v[2]=f,v[3]=t,v[4]=l,v[5]=h,v[6]=r,v[7]=u,v[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,u=r[0],f=r[3],h=r[6],p=r[1],v=r[4],x=r[7],g=r[2],S=r[5],M=r[8],b=o[0],_=o[3],y=o[6],C=o[1],L=o[4],P=o[7],k=o[2],I=o[5],z=o[8];return l[0]=u*b+f*C+h*k,l[3]=u*_+f*L+h*I,l[6]=u*y+f*P+h*z,l[1]=p*b+v*C+x*k,l[4]=p*_+v*L+x*I,l[7]=p*y+v*P+x*z,l[2]=g*b+S*C+M*k,l[5]=g*_+S*L+M*I,l[8]=g*y+S*P+M*z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],u=e[4],f=e[5],h=e[6],p=e[7],v=e[8];return t*u*v-t*f*p-r*l*v+r*f*h+o*l*p-o*u*h}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],u=e[4],f=e[5],h=e[6],p=e[7],v=e[8],x=v*u-f*p,g=f*h-v*l,S=p*l-u*h,M=t*x+r*g+o*S;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/M;return e[0]=x*b,e[1]=(o*p-v*r)*b,e[2]=(f*r-o*u)*b,e[3]=g*b,e[4]=(v*t-o*h)*b,e[5]=(o*l-f*t)*b,e[6]=S*b,e[7]=(r*h-p*t)*b,e[8]=(u*t-r*l)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,o,l,u,f){const h=Math.cos(l),p=Math.sin(l);return this.set(r*h,r*p,-r*(h*u+p*f)+u+e,-o*p,o*h,-o*(-p*u+h*f)+f+t,0,0,1),this}scale(e,t){return this.premultiply(dd.makeScale(e,t)),this}rotate(e){return this.premultiply(dd.makeRotation(-e)),this}translate(e,t){return this.premultiply(dd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<9;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}};fh.prototype.isMatrix3=!0;let ct=fh;const dd=new ct,lg=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cg=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sS(){const s={enabled:!0,workingColorSpace:lc,spaces:{},convert:function(o,l,u){return this.enabled===!1||l===u||!l||!u||(this.spaces[l].transfer===Dt&&(o.r=ar(o.r),o.g=ar(o.g),o.b=ar(o.b)),this.spaces[l].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[l].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===Dt&&(o.r=ra(o.r),o.g=ra(o.g),o.b=ra(o.b))),o},workingToColorSpace:function(o,l){return this.convert(o,this.workingColorSpace,l)},colorSpaceToWorking:function(o,l){return this.convert(o,l,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Ur?cc:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,l=this.workingColorSpace){return o.fromArray(this.spaces[l].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,l,u){return o.copy(this.spaces[l].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,l){return Ff("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(o,l)},toWorkingColorSpace:function(o,l){return Ff("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(o,l)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[lc]:{primaries:e,whitePoint:r,transfer:cc,toXYZ:lg,fromXYZ:cg,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:li},outputColorSpaceConfig:{drawingBufferColorSpace:li}},[li]:{primaries:e,whitePoint:r,transfer:Dt,toXYZ:lg,fromXYZ:cg,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:li}}}),s}const St=sS();function ar(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ra(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Gs;class aS{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{Gs===void 0&&(Gs=uc("canvas")),Gs.width=e.width,Gs.height=e.height;const o=Gs.getContext("2d");e instanceof ImageData?o.putImageData(e,0,0):o.drawImage(e,0,0,e.width,e.height),r=Gs}return r.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=uc("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const o=r.getImageData(0,0,e.width,e.height),l=o.data;for(let u=0;u<l.length;u++)l[u]=ar(l[u]/255)*255;return r.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(ar(t[r]/255)*255):t[r]=ar(t[r]);return{data:t,width:e.width,height:e.height}}else return nt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let oS=0;class rh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:oS++}),this.uuid=_o(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let u=0,f=o.length;u<f;u++)o[u].isDataTexture?l.push(fd(o[u].image)):l.push(fd(o[u]))}else l=fd(o);r.url=l}return t||(e.images[this.uuid]=r),r}}function fd(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?aS.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(nt("Texture: Unable to serialize Texture."),{})}let lS=0;const hd=new $;class Dn extends Wr{constructor(e=Dn.DEFAULT_IMAGE,t=Dn.DEFAULT_MAPPING,r=ir,o=ir,l=An,u=fs,f=Ti,h=Zn,p=Dn.DEFAULT_ANISOTROPY,v=Ur){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lS++}),this.uuid=_o(),this.name="",this.source=new rh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=o,this.magFilter=l,this.minFilter=u,this.anisotropy=p,this.format=f,this.internalFormat=null,this.type=h,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(hd).x}get height(){return this.source.getSize(hd).y}get depth(){return this.source.getSize(hd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const r=e[t];if(r===void 0){nt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){nt(`Texture.setValues(): property '${t}' does not exist.`);continue}o&&r&&o.isVector2&&r.isVector2||o&&r&&o.isVector3&&r.isVector3||o&&r&&o.isMatrix3&&r.isMatrix3?o.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==L_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case nf:e.x=e.x-Math.floor(e.x);break;case ir:e.x=e.x<0?0:1;break;case rf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case nf:e.y=e.y-Math.floor(e.y);break;case ir:e.y=e.y<0?0:1;break;case rf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dn.DEFAULT_IMAGE=null;Dn.DEFAULT_MAPPING=L_;Dn.DEFAULT_ANISOTROPY=1;const hh=class hh{constructor(e=0,t=0,r=0,o=1){this.x=e,this.y=t,this.z=r,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,o){return this.x=e,this.y=t,this.z=r,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,o=this.z,l=this.w,u=e.elements;return this.x=u[0]*t+u[4]*r+u[8]*o+u[12]*l,this.y=u[1]*t+u[5]*r+u[9]*o+u[13]*l,this.z=u[2]*t+u[6]*r+u[10]*o+u[14]*l,this.w=u[3]*t+u[7]*r+u[11]*o+u[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,o,l;const h=e.elements,p=h[0],v=h[4],x=h[8],g=h[1],S=h[5],M=h[9],b=h[2],_=h[6],y=h[10];if(Math.abs(v-g)<.01&&Math.abs(x-b)<.01&&Math.abs(M-_)<.01){if(Math.abs(v+g)<.1&&Math.abs(x+b)<.1&&Math.abs(M+_)<.1&&Math.abs(p+S+y-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const L=(p+1)/2,P=(S+1)/2,k=(y+1)/2,I=(v+g)/4,z=(x+b)/4,T=(M+_)/4;return L>P&&L>k?L<.01?(r=0,o=.707106781,l=.707106781):(r=Math.sqrt(L),o=I/r,l=z/r):P>k?P<.01?(r=.707106781,o=0,l=.707106781):(o=Math.sqrt(P),r=I/o,l=T/o):k<.01?(r=.707106781,o=.707106781,l=0):(l=Math.sqrt(k),r=z/l,o=T/l),this.set(r,o,l,t),this}let C=Math.sqrt((_-M)*(_-M)+(x-b)*(x-b)+(g-v)*(g-v));return Math.abs(C)<.001&&(C=1),this.x=(_-M)/C,this.y=(x-b)/C,this.z=(g-v)/C,this.w=Math.acos((p+S+y-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this.w=xt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this.w=xt(this.w,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(xt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};hh.prototype.isVector4=!0;let Qt=hh;class cS extends Wr{constructor(e=1,t=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:An,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=r.depth,this.scissor=new Qt(0,0,e,t),this.scissorTest=!1,this.viewport=new Qt(0,0,e,t),this.textures=[];const o={width:e,height:t,depth:r.depth},l=new Dn(o),u=r.count;for(let f=0;f<u;f++)this.textures[f]=l.clone(),this.textures[f].isRenderTargetTexture=!0,this.textures[f].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(e={}){const t={minFilter:An,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let o=0,l=this.textures.length;o<l;o++)this.textures[o].image.width=e,this.textures[o].image.height=t,this.textures[o].image.depth=r,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,r=e.textures.length;t<r;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const o=Object.assign({},e.textures[t].image);this.textures[t].source=new rh(o)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ki extends cS{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class z_ extends Dn{constructor(e=null,t=1,r=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=xn,this.minFilter=xn,this.wrapR=ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class uS extends Dn{constructor(e=null,t=1,r=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:o},this.magFilter=xn,this.minFilter=xn,this.wrapR=ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const mc=class mc{constructor(e,t,r,o,l,u,f,h,p,v,x,g,S,M,b,_){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,o,l,u,f,h,p,v,x,g,S,M,b,_)}set(e,t,r,o,l,u,f,h,p,v,x,g,S,M,b,_){const y=this.elements;return y[0]=e,y[4]=t,y[8]=r,y[12]=o,y[1]=l,y[5]=u,y[9]=f,y[13]=h,y[2]=p,y[6]=v,y[10]=x,y[14]=g,y[3]=S,y[7]=M,y[11]=b,y[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mc().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),r.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,r=e.elements,o=1/Ws.setFromMatrixColumn(e,0).length(),l=1/Ws.setFromMatrixColumn(e,1).length(),u=1/Ws.setFromMatrixColumn(e,2).length();return t[0]=r[0]*o,t[1]=r[1]*o,t[2]=r[2]*o,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*u,t[9]=r[9]*u,t[10]=r[10]*u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,o=e.y,l=e.z,u=Math.cos(r),f=Math.sin(r),h=Math.cos(o),p=Math.sin(o),v=Math.cos(l),x=Math.sin(l);if(e.order==="XYZ"){const g=u*v,S=u*x,M=f*v,b=f*x;t[0]=h*v,t[4]=-h*x,t[8]=p,t[1]=S+M*p,t[5]=g-b*p,t[9]=-f*h,t[2]=b-g*p,t[6]=M+S*p,t[10]=u*h}else if(e.order==="YXZ"){const g=h*v,S=h*x,M=p*v,b=p*x;t[0]=g+b*f,t[4]=M*f-S,t[8]=u*p,t[1]=u*x,t[5]=u*v,t[9]=-f,t[2]=S*f-M,t[6]=b+g*f,t[10]=u*h}else if(e.order==="ZXY"){const g=h*v,S=h*x,M=p*v,b=p*x;t[0]=g-b*f,t[4]=-u*x,t[8]=M+S*f,t[1]=S+M*f,t[5]=u*v,t[9]=b-g*f,t[2]=-u*p,t[6]=f,t[10]=u*h}else if(e.order==="ZYX"){const g=u*v,S=u*x,M=f*v,b=f*x;t[0]=h*v,t[4]=M*p-S,t[8]=g*p+b,t[1]=h*x,t[5]=b*p+g,t[9]=S*p-M,t[2]=-p,t[6]=f*h,t[10]=u*h}else if(e.order==="YZX"){const g=u*h,S=u*p,M=f*h,b=f*p;t[0]=h*v,t[4]=b-g*x,t[8]=M*x+S,t[1]=x,t[5]=u*v,t[9]=-f*v,t[2]=-p*v,t[6]=S*x+M,t[10]=g-b*x}else if(e.order==="XZY"){const g=u*h,S=u*p,M=f*h,b=f*p;t[0]=h*v,t[4]=-x,t[8]=p*v,t[1]=g*x+b,t[5]=u*v,t[9]=S*x-M,t[2]=M*x-S,t[6]=f*v,t[10]=b*x+g}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(dS,e,fS)}lookAt(e,t,r){const o=this.elements;return $n.subVectors(e,t),$n.lengthSq()===0&&($n.z=1),$n.normalize(),Rr.crossVectors(r,$n),Rr.lengthSq()===0&&(Math.abs(r.z)===1?$n.x+=1e-4:$n.z+=1e-4,$n.normalize(),Rr.crossVectors(r,$n)),Rr.normalize(),Tl.crossVectors($n,Rr),o[0]=Rr.x,o[4]=Tl.x,o[8]=$n.x,o[1]=Rr.y,o[5]=Tl.y,o[9]=$n.y,o[2]=Rr.z,o[6]=Tl.z,o[10]=$n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,o=t.elements,l=this.elements,u=r[0],f=r[4],h=r[8],p=r[12],v=r[1],x=r[5],g=r[9],S=r[13],M=r[2],b=r[6],_=r[10],y=r[14],C=r[3],L=r[7],P=r[11],k=r[15],I=o[0],z=o[4],T=o[8],D=o[12],B=o[1],F=o[5],q=o[9],ae=o[13],de=o[2],j=o[6],ie=o[10],Y=o[14],K=o[3],ce=o[7],le=o[11],O=o[15];return l[0]=u*I+f*B+h*de+p*K,l[4]=u*z+f*F+h*j+p*ce,l[8]=u*T+f*q+h*ie+p*le,l[12]=u*D+f*ae+h*Y+p*O,l[1]=v*I+x*B+g*de+S*K,l[5]=v*z+x*F+g*j+S*ce,l[9]=v*T+x*q+g*ie+S*le,l[13]=v*D+x*ae+g*Y+S*O,l[2]=M*I+b*B+_*de+y*K,l[6]=M*z+b*F+_*j+y*ce,l[10]=M*T+b*q+_*ie+y*le,l[14]=M*D+b*ae+_*Y+y*O,l[3]=C*I+L*B+P*de+k*K,l[7]=C*z+L*F+P*j+k*ce,l[11]=C*T+L*q+P*ie+k*le,l[15]=C*D+L*ae+P*Y+k*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],o=e[8],l=e[12],u=e[1],f=e[5],h=e[9],p=e[13],v=e[2],x=e[6],g=e[10],S=e[14],M=e[3],b=e[7],_=e[11],y=e[15],C=h*S-p*g,L=f*S-p*x,P=f*g-h*x,k=u*S-p*v,I=u*g-h*v,z=u*x-f*v;return t*(b*C-_*L+y*P)-r*(M*C-_*k+y*I)+o*(M*L-b*k+y*z)-l*(M*P-b*I+_*z)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],o=e[2],l=e[3],u=e[4],f=e[5],h=e[6],p=e[7],v=e[8],x=e[9],g=e[10],S=e[11],M=e[12],b=e[13],_=e[14],y=e[15],C=t*f-r*u,L=t*h-o*u,P=t*p-l*u,k=r*h-o*f,I=r*p-l*f,z=o*p-l*h,T=v*b-x*M,D=v*_-g*M,B=v*y-S*M,F=x*_-g*b,q=x*y-S*b,ae=g*y-S*_,de=C*ae-L*q+P*F+k*B-I*D+z*T;if(de===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const j=1/de;return e[0]=(f*ae-h*q+p*F)*j,e[1]=(o*q-r*ae-l*F)*j,e[2]=(b*z-_*I+y*k)*j,e[3]=(g*I-x*z-S*k)*j,e[4]=(h*B-u*ae-p*D)*j,e[5]=(t*ae-o*B+l*D)*j,e[6]=(_*P-M*z-y*L)*j,e[7]=(v*z-g*P+S*L)*j,e[8]=(u*q-f*B+p*T)*j,e[9]=(r*B-t*q-l*T)*j,e[10]=(M*I-b*P+y*C)*j,e[11]=(x*P-v*I-S*C)*j,e[12]=(f*D-u*F-h*T)*j,e[13]=(t*F-r*D+o*T)*j,e[14]=(b*L-M*k-_*C)*j,e[15]=(v*k-x*L+g*C)*j,this}scale(e){const t=this.elements,r=e.x,o=e.y,l=e.z;return t[0]*=r,t[4]*=o,t[8]*=l,t[1]*=r,t[5]*=o,t[9]*=l,t[2]*=r,t[6]*=o,t[10]*=l,t[3]*=r,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,o))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),o=Math.sin(t),l=1-r,u=e.x,f=e.y,h=e.z,p=l*u,v=l*f;return this.set(p*u+r,p*f-o*h,p*h+o*f,0,p*f+o*h,v*f+r,v*h-o*u,0,p*h-o*f,v*h+o*u,l*h*h+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,o,l,u){return this.set(1,r,l,0,e,1,u,0,t,o,1,0,0,0,0,1),this}compose(e,t,r){const o=this.elements,l=t._x,u=t._y,f=t._z,h=t._w,p=l+l,v=u+u,x=f+f,g=l*p,S=l*v,M=l*x,b=u*v,_=u*x,y=f*x,C=h*p,L=h*v,P=h*x,k=r.x,I=r.y,z=r.z;return o[0]=(1-(b+y))*k,o[1]=(S+P)*k,o[2]=(M-L)*k,o[3]=0,o[4]=(S-P)*I,o[5]=(1-(g+y))*I,o[6]=(_+C)*I,o[7]=0,o[8]=(M+L)*z,o[9]=(_-C)*z,o[10]=(1-(g+b))*z,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,r){const o=this.elements;e.x=o[12],e.y=o[13],e.z=o[14];const l=this.determinant();if(l===0)return r.set(1,1,1),t.identity(),this;let u=Ws.set(o[0],o[1],o[2]).length();const f=Ws.set(o[4],o[5],o[6]).length(),h=Ws.set(o[8],o[9],o[10]).length();l<0&&(u=-u),xi.copy(this);const p=1/u,v=1/f,x=1/h;return xi.elements[0]*=p,xi.elements[1]*=p,xi.elements[2]*=p,xi.elements[4]*=v,xi.elements[5]*=v,xi.elements[6]*=v,xi.elements[8]*=x,xi.elements[9]*=x,xi.elements[10]*=x,t.setFromRotationMatrix(xi),r.x=u,r.y=f,r.z=h,this}makePerspective(e,t,r,o,l,u,f=Fi,h=!1){const p=this.elements,v=2*l/(t-e),x=2*l/(r-o),g=(t+e)/(t-e),S=(r+o)/(r-o);let M,b;if(h)M=l/(u-l),b=u*l/(u-l);else if(f===Fi)M=-(u+l)/(u-l),b=-2*u*l/(u-l);else if(f===mo)M=-u/(u-l),b=-u*l/(u-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+f);return p[0]=v,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=x,p[9]=S,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=b,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,t,r,o,l,u,f=Fi,h=!1){const p=this.elements,v=2/(t-e),x=2/(r-o),g=-(t+e)/(t-e),S=-(r+o)/(r-o);let M,b;if(h)M=1/(u-l),b=u/(u-l);else if(f===Fi)M=-2/(u-l),b=-(u+l)/(u-l);else if(f===mo)M=-1/(u-l),b=-l/(u-l);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+f);return p[0]=v,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=x,p[9]=0,p[13]=S,p[2]=0,p[6]=0,p[10]=M,p[14]=b,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let o=0;o<16;o++)if(t[o]!==r[o])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}};mc.prototype.isMatrix4=!0;let Zt=mc;const Ws=new $,xi=new Zt,dS=new $(0,0,0),fS=new $(1,1,1),Rr=new $,Tl=new $,$n=new $,ug=new Zt,dg=new Hr;class Vr{constructor(e=0,t=0,r=0,o=Vr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,o=this._order){return this._x=e,this._y=t,this._z=r,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const o=e.elements,l=o[0],u=o[4],f=o[8],h=o[1],p=o[5],v=o[9],x=o[2],g=o[6],S=o[10];switch(t){case"XYZ":this._y=Math.asin(xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-v,S),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-xt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(f,S),this._z=Math.atan2(h,p)):(this._y=Math.atan2(-x,l),this._z=0);break;case"ZXY":this._x=Math.asin(xt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-x,S),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-xt(x,-1,1)),Math.abs(x)<.9999999?(this._x=Math.atan2(g,S),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(xt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-v,p),this._y=Math.atan2(-x,l)):(this._x=0,this._y=Math.atan2(f,S));break;case"XZY":this._z=Math.asin(-xt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(f,l)):(this._x=Math.atan2(-v,S),this._y=0);break;default:nt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return ug.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ug,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dg.setFromEuler(this),this.setFromQuaternion(dg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vr.DEFAULT_ORDER="XYZ";class sh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let hS=0;const fg=new $,js=new Hr,Ji=new Zt,wl=new $,eo=new $,pS=new $,mS=new Hr,hg=new $(1,0,0),pg=new $(0,1,0),mg=new $(0,0,1),gg={type:"added"},gS={type:"removed"},Xs={type:"childadded",child:null},pd={type:"childremoved",child:null};class yn extends Wr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hS++}),this.uuid=_o(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yn.DEFAULT_UP.clone();const e=new $,t=new Vr,r=new Hr,o=new $(1,1,1);function l(){r.setFromEuler(t,!1)}function u(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Zt},normalMatrix:{value:new ct}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=yn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return js.setFromAxisAngle(e,t),this.quaternion.multiply(js),this}rotateOnWorldAxis(e,t){return js.setFromAxisAngle(e,t),this.quaternion.premultiply(js),this}rotateX(e){return this.rotateOnAxis(hg,e)}rotateY(e){return this.rotateOnAxis(pg,e)}rotateZ(e){return this.rotateOnAxis(mg,e)}translateOnAxis(e,t){return fg.copy(e).applyQuaternion(this.quaternion),this.position.add(fg.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hg,e)}translateY(e){return this.translateOnAxis(pg,e)}translateZ(e){return this.translateOnAxis(mg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ji.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?wl.copy(e):wl.set(e,t,r);const o=this.parent;this.updateWorldMatrix(!0,!1),eo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ji.lookAt(eo,wl,this.up):Ji.lookAt(wl,eo,this.up),this.quaternion.setFromRotationMatrix(Ji),o&&(Ji.extractRotation(o.matrixWorld),js.setFromRotationMatrix(Ji),this.quaternion.premultiply(js.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gg),Xs.child=e,this.dispatchEvent(Xs),Xs.child=null):Et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gS),pd.child=e,this.dispatchEvent(pd),pd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ji.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ji.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ji),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gg),Xs.child=e,this.dispatchEvent(Xs),Xs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,o=this.children.length;r<o;r++){const u=this.children[r].getObjectByProperty(e,t);if(u!==void 0)return u}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const o=this.children;for(let l=0,u=o.length;l<u;l++)o[l].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eo,e,pS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eo,mS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,r=e.y,o=e.z,l=this.matrix.elements;l[12]+=t-l[0]*t-l[4]*r-l[8]*o,l[13]+=r-l[1]*t-l[5]*r-l[9]*o,l[14]+=o-l[2]*t-l[6]*r-l[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,o=t.length;r<o;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const o=this.children;for(let l=0,u=o.length;l<u;l++)o[l].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),this.static!==!1&&(o.static=this.static),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(f=>({...f,boundingBox:f.boundingBox?f.boundingBox.toJSON():void 0,boundingSphere:f.boundingSphere?f.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(f=>({...f})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(e),o.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function l(f,h){return f[h.uuid]===void 0&&(f[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const f=this.geometry.parameters;if(f!==void 0&&f.shapes!==void 0){const h=f.shapes;if(Array.isArray(h))for(let p=0,v=h.length;p<v;p++){const x=h[p];l(e.shapes,x)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const f=[];for(let h=0,p=this.material.length;h<p;h++)f.push(l(e.materials,this.material[h]));o.material=f}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let f=0;f<this.children.length;f++)o.children.push(this.children[f].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let f=0;f<this.animations.length;f++){const h=this.animations[f];o.animations.push(l(e.animations,h))}}if(t){const f=u(e.geometries),h=u(e.materials),p=u(e.textures),v=u(e.images),x=u(e.shapes),g=u(e.skeletons),S=u(e.animations),M=u(e.nodes);f.length>0&&(r.geometries=f),h.length>0&&(r.materials=h),p.length>0&&(r.textures=p),v.length>0&&(r.images=v),x.length>0&&(r.shapes=x),g.length>0&&(r.skeletons=g),S.length>0&&(r.animations=S),M.length>0&&(r.nodes=M)}return r.object=o,r;function u(f){const h=[];for(const p in f){const v=f[p];delete v.metadata,h.push(v)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const o=e.children[r];this.add(o.clone())}return this}}yn.DEFAULT_UP=new $(0,1,0);yn.DEFAULT_MATRIX_AUTO_UPDATE=!0;yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class bl extends yn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _S={type:"move"};class md{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let o=null,l=null,u=null;const f=this._targetRay,h=this._grip,p=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(p&&e.hand){u=!0;for(const b of e.hand.values()){const _=t.getJointPose(b,r),y=this._getHandJoint(p,b);_!==null&&(y.matrix.fromArray(_.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=_.radius),y.visible=_!==null}const v=p.joints["index-finger-tip"],x=p.joints["thumb-tip"],g=v.position.distanceTo(x.position),S=.02,M=.005;p.inputState.pinching&&g>S+M?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&g<=S-M&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,h.eventsEnabled&&h.dispatchEvent({type:"gripUpdated",data:e,target:this})));f!==null&&(o=t.getPose(e.targetRaySpace,r),o===null&&l!==null&&(o=l),o!==null&&(f.matrix.fromArray(o.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,o.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(o.linearVelocity)):f.hasLinearVelocity=!1,o.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(o.angularVelocity)):f.hasAngularVelocity=!1,this.dispatchEvent(_S)))}return f!==null&&(f.visible=o!==null),h!==null&&(h.visible=l!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new bl;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}const H_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cr={h:0,s:0,l:0},Al={h:0,s:0,l:0};function gd(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class yt{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=li){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,St.colorSpaceToWorking(this,t),this}setRGB(e,t,r,o=St.workingColorSpace){return this.r=e,this.g=t,this.b=r,St.colorSpaceToWorking(this,o),this}setHSL(e,t,r,o=St.workingColorSpace){if(e=iS(e,1),t=xt(t,0,1),r=xt(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,u=2*r-l;this.r=gd(u,l,e+1/3),this.g=gd(u,l,e),this.b=gd(u,l,e-1/3)}return St.colorSpaceToWorking(this,o),this}setStyle(e,t=li){function r(l){l!==void 0&&parseFloat(l)<1&&nt("Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const u=o[1],f=o[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:nt("Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],u=l.length;if(u===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(u===6)return this.setHex(parseInt(l,16),t);nt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=li){const r=H_[e.toLowerCase()];return r!==void 0?this.setHex(r,t):nt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ar(e.r),this.g=ar(e.g),this.b=ar(e.b),this}copyLinearToSRGB(e){return this.r=ra(e.r),this.g=ra(e.g),this.b=ra(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=li){return St.workingToColorSpace(bn.copy(this),e),Math.round(xt(bn.r*255,0,255))*65536+Math.round(xt(bn.g*255,0,255))*256+Math.round(xt(bn.b*255,0,255))}getHexString(e=li){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=St.workingColorSpace){St.workingToColorSpace(bn.copy(this),t);const r=bn.r,o=bn.g,l=bn.b,u=Math.max(r,o,l),f=Math.min(r,o,l);let h,p;const v=(f+u)/2;if(f===u)h=0,p=0;else{const x=u-f;switch(p=v<=.5?x/(u+f):x/(2-u-f),u){case r:h=(o-l)/x+(o<l?6:0);break;case o:h=(l-r)/x+2;break;case l:h=(r-o)/x+4;break}h/=6}return e.h=h,e.s=p,e.l=v,e}getRGB(e,t=St.workingColorSpace){return St.workingToColorSpace(bn.copy(this),t),e.r=bn.r,e.g=bn.g,e.b=bn.b,e}getStyle(e=li){St.workingToColorSpace(bn.copy(this),e);const t=bn.r,r=bn.g,o=bn.b;return e!==li?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(o*255)})`}offsetHSL(e,t,r){return this.getHSL(Cr),this.setHSL(Cr.h+e,Cr.s+t,Cr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Cr),e.getHSL(Al);const r=cd(Cr.h,Al.h,t),o=cd(Cr.s,Al.s,t),l=cd(Cr.l,Al.l,t);return this.setHSL(r,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*r+l[6]*o,this.g=l[1]*t+l[4]*r+l[7]*o,this.b=l[2]*t+l[5]*r+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bn=new yt;yt.NAMES=H_;class ah{constructor(e,t=1,r=1e3){this.isFog=!0,this.name="",this.color=new yt(e),this.near=t,this.far=r}clone(){return new ah(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class vS extends yn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vr,this.environmentIntensity=1,this.environmentRotation=new Vr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const yi=new $,Qi=new $,_d=new $,er=new $,Ys=new $,qs=new $,_g=new $,vd=new $,xd=new $,yd=new $,Sd=new Qt,Md=new Qt,Ed=new Qt;class ui{constructor(e=new $,t=new $,r=new $){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,o){o.subVectors(r,t),yi.subVectors(e,t),o.cross(yi);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,r,o,l){yi.subVectors(o,t),Qi.subVectors(r,t),_d.subVectors(e,t);const u=yi.dot(yi),f=yi.dot(Qi),h=yi.dot(_d),p=Qi.dot(Qi),v=Qi.dot(_d),x=u*p-f*f;if(x===0)return l.set(0,0,0),null;const g=1/x,S=(p*h-f*v)*g,M=(u*v-f*h)*g;return l.set(1-S-M,M,S)}static containsPoint(e,t,r,o){return this.getBarycoord(e,t,r,o,er)===null?!1:er.x>=0&&er.y>=0&&er.x+er.y<=1}static getInterpolation(e,t,r,o,l,u,f,h){return this.getBarycoord(e,t,r,o,er)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,er.x),h.addScaledVector(u,er.y),h.addScaledVector(f,er.z),h)}static getInterpolatedAttribute(e,t,r,o,l,u){return Sd.setScalar(0),Md.setScalar(0),Ed.setScalar(0),Sd.fromBufferAttribute(e,t),Md.fromBufferAttribute(e,r),Ed.fromBufferAttribute(e,o),u.setScalar(0),u.addScaledVector(Sd,l.x),u.addScaledVector(Md,l.y),u.addScaledVector(Ed,l.z),u}static isFrontFacing(e,t,r,o){return yi.subVectors(r,t),Qi.subVectors(e,t),yi.cross(Qi).dot(o)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,o){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,r,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return yi.subVectors(this.c,this.b),Qi.subVectors(this.a,this.b),yi.cross(Qi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ui.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ui.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,o,l){return ui.getInterpolation(e,this.a,this.b,this.c,t,r,o,l)}containsPoint(e){return ui.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ui.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,o=this.b,l=this.c;let u,f;Ys.subVectors(o,r),qs.subVectors(l,r),vd.subVectors(e,r);const h=Ys.dot(vd),p=qs.dot(vd);if(h<=0&&p<=0)return t.copy(r);xd.subVectors(e,o);const v=Ys.dot(xd),x=qs.dot(xd);if(v>=0&&x<=v)return t.copy(o);const g=h*x-v*p;if(g<=0&&h>=0&&v<=0)return u=h/(h-v),t.copy(r).addScaledVector(Ys,u);yd.subVectors(e,l);const S=Ys.dot(yd),M=qs.dot(yd);if(M>=0&&S<=M)return t.copy(l);const b=S*p-h*M;if(b<=0&&p>=0&&M<=0)return f=p/(p-M),t.copy(r).addScaledVector(qs,f);const _=v*M-S*x;if(_<=0&&x-v>=0&&S-M>=0)return _g.subVectors(l,o),f=(x-v)/(x-v+(S-M)),t.copy(o).addScaledVector(_g,f);const y=1/(_+b+g);return u=b*y,f=g*y,t.copy(r).addScaledVector(Ys,u).addScaledVector(qs,f)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class vo{constructor(e=new $(1/0,1/0,1/0),t=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(Si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(Si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=Si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let u=0,f=l.count;u<f;u++)e.isMesh===!0?e.getVertexPosition(u,Si):Si.fromBufferAttribute(l,u),Si.applyMatrix4(e.matrixWorld),this.expandByPoint(Si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Rl.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Rl.copy(r.boundingBox)),Rl.applyMatrix4(e.matrixWorld),this.union(Rl)}const o=e.children;for(let l=0,u=o.length;l<u;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Si),Si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(to),Cl.subVectors(this.max,to),$s.subVectors(e.a,to),Ks.subVectors(e.b,to),Zs.subVectors(e.c,to),Pr.subVectors(Ks,$s),Lr.subVectors(Zs,Ks),as.subVectors($s,Zs);let t=[0,-Pr.z,Pr.y,0,-Lr.z,Lr.y,0,-as.z,as.y,Pr.z,0,-Pr.x,Lr.z,0,-Lr.x,as.z,0,-as.x,-Pr.y,Pr.x,0,-Lr.y,Lr.x,0,-as.y,as.x,0];return!Td(t,$s,Ks,Zs,Cl)||(t=[1,0,0,0,1,0,0,0,1],!Td(t,$s,Ks,Zs,Cl))?!1:(Pl.crossVectors(Pr,Lr),t=[Pl.x,Pl.y,Pl.z],Td(t,$s,Ks,Zs,Cl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(tr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),tr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),tr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),tr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),tr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),tr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),tr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),tr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(tr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const tr=[new $,new $,new $,new $,new $,new $,new $,new $],Si=new $,Rl=new vo,$s=new $,Ks=new $,Zs=new $,Pr=new $,Lr=new $,as=new $,to=new $,Cl=new $,Pl=new $,os=new $;function Td(s,e,t,r,o){for(let l=0,u=s.length-3;l<=u;l+=3){os.fromArray(s,l);const f=o.x*Math.abs(os.x)+o.y*Math.abs(os.y)+o.z*Math.abs(os.z),h=e.dot(os),p=t.dot(os),v=r.dot(os);if(Math.max(-Math.max(h,p,v),Math.min(h,p,v))>f)return!1}return!0}const rn=new $,Ll=new ut;let xS=0;class wi extends Wr{constructor(e,t,r=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xS++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=ig,this.updateRanges=[],this.gpuType=Ui,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[r+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)Ll.fromBufferAttribute(this,t),Ll.applyMatrix3(e),this.setXY(t,Ll.x,Ll.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix3(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=Qa(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Hn(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qa(t,this.array)),t}setX(e,t){return this.normalized&&(t=Hn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qa(t,this.array)),t}setY(e,t){return this.normalized&&(t=Hn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qa(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Hn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qa(t,this.array)),t}setW(e,t){return this.normalized&&(t=Hn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=Hn(t,this.array),r=Hn(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,o){return e*=this.itemSize,this.normalized&&(t=Hn(t,this.array),r=Hn(r,this.array),o=Hn(o,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this}setXYZW(e,t,r,o,l){return e*=this.itemSize,this.normalized&&(t=Hn(t,this.array),r=Hn(r,this.array),o=Hn(o,this.array),l=Hn(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ig&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class V_ extends wi{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class G_ extends wi{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class Wn extends wi{constructor(e,t,r){super(new Float32Array(e),t,r)}}const yS=new vo,no=new $,wd=new $;class xc{constructor(e=new $,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):yS.setFromPoints(e).getCenter(r);let o=0;for(let l=0,u=e.length;l<u;l++)o=Math.max(o,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;no.subVectors(e,this.center);const t=no.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),o=(r-this.radius)*.5;this.center.addScaledVector(no,o/r),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(no.copy(e.center).add(wd)),this.expandByPoint(no.copy(e.center).sub(wd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let SS=0;const oi=new Zt,bd=new yn,Js=new $,Kn=new vo,io=new vo,pn=new $;class Qn extends Wr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:SS++}),this.uuid=_o(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qy(e)?G_:V_)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new ct().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return oi.makeRotationFromQuaternion(e),this.applyMatrix4(oi),this}rotateX(e){return oi.makeRotationX(e),this.applyMatrix4(oi),this}rotateY(e){return oi.makeRotationY(e),this.applyMatrix4(oi),this}rotateZ(e){return oi.makeRotationZ(e),this.applyMatrix4(oi),this}translate(e,t,r){return oi.makeTranslation(e,t,r),this.applyMatrix4(oi),this}scale(e,t,r){return oi.makeScale(e,t,r),this.applyMatrix4(oi),this}lookAt(e){return bd.lookAt(e),bd.updateMatrix(),this.applyMatrix4(bd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let o=0,l=e.length;o<l;o++){const u=e[o];r.push(u.x,u.y,u.z||0)}this.setAttribute("position",new Wn(r,3))}else{const r=Math.min(e.length,t.count);for(let o=0;o<r;o++){const l=e[o];t.setXYZ(o,l.x,l.y,l.z||0)}e.length>t.count&&nt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const l=t[r];Kn.setFromBufferAttribute(l),this.morphTargetsRelative?(pn.addVectors(this.boundingBox.min,Kn.min),this.boundingBox.expandByPoint(pn),pn.addVectors(this.boundingBox.max,Kn.max),this.boundingBox.expandByPoint(pn)):(this.boundingBox.expandByPoint(Kn.min),this.boundingBox.expandByPoint(Kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(e){const r=this.boundingSphere.center;if(Kn.setFromBufferAttribute(e),t)for(let l=0,u=t.length;l<u;l++){const f=t[l];io.setFromBufferAttribute(f),this.morphTargetsRelative?(pn.addVectors(Kn.min,io.min),Kn.expandByPoint(pn),pn.addVectors(Kn.max,io.max),Kn.expandByPoint(pn)):(Kn.expandByPoint(io.min),Kn.expandByPoint(io.max))}Kn.getCenter(r);let o=0;for(let l=0,u=e.count;l<u;l++)pn.fromBufferAttribute(e,l),o=Math.max(o,r.distanceToSquared(pn));if(t)for(let l=0,u=t.length;l<u;l++){const f=t[l],h=this.morphTargetsRelative;for(let p=0,v=f.count;p<v;p++)pn.fromBufferAttribute(f,p),h&&(Js.fromBufferAttribute(e,p),pn.add(Js)),o=Math.max(o,r.distanceToSquared(pn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&Et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,o=t.normal,l=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wi(new Float32Array(4*r.count),4));const u=this.getAttribute("tangent"),f=[],h=[];for(let T=0;T<r.count;T++)f[T]=new $,h[T]=new $;const p=new $,v=new $,x=new $,g=new ut,S=new ut,M=new ut,b=new $,_=new $;function y(T,D,B){p.fromBufferAttribute(r,T),v.fromBufferAttribute(r,D),x.fromBufferAttribute(r,B),g.fromBufferAttribute(l,T),S.fromBufferAttribute(l,D),M.fromBufferAttribute(l,B),v.sub(p),x.sub(p),S.sub(g),M.sub(g);const F=1/(S.x*M.y-M.x*S.y);isFinite(F)&&(b.copy(v).multiplyScalar(M.y).addScaledVector(x,-S.y).multiplyScalar(F),_.copy(x).multiplyScalar(S.x).addScaledVector(v,-M.x).multiplyScalar(F),f[T].add(b),f[D].add(b),f[B].add(b),h[T].add(_),h[D].add(_),h[B].add(_))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let T=0,D=C.length;T<D;++T){const B=C[T],F=B.start,q=B.count;for(let ae=F,de=F+q;ae<de;ae+=3)y(e.getX(ae+0),e.getX(ae+1),e.getX(ae+2))}const L=new $,P=new $,k=new $,I=new $;function z(T){k.fromBufferAttribute(o,T),I.copy(k);const D=f[T];L.copy(D),L.sub(k.multiplyScalar(k.dot(D))).normalize(),P.crossVectors(I,D);const F=P.dot(h[T])<0?-1:1;u.setXYZW(T,L.x,L.y,L.z,F)}for(let T=0,D=C.length;T<D;++T){const B=C[T],F=B.start,q=B.count;for(let ae=F,de=F+q;ae<de;ae+=3)z(e.getX(ae+0)),z(e.getX(ae+1)),z(e.getX(ae+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new wi(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let g=0,S=r.count;g<S;g++)r.setXYZ(g,0,0,0);const o=new $,l=new $,u=new $,f=new $,h=new $,p=new $,v=new $,x=new $;if(e)for(let g=0,S=e.count;g<S;g+=3){const M=e.getX(g+0),b=e.getX(g+1),_=e.getX(g+2);o.fromBufferAttribute(t,M),l.fromBufferAttribute(t,b),u.fromBufferAttribute(t,_),v.subVectors(u,l),x.subVectors(o,l),v.cross(x),f.fromBufferAttribute(r,M),h.fromBufferAttribute(r,b),p.fromBufferAttribute(r,_),f.add(v),h.add(v),p.add(v),r.setXYZ(M,f.x,f.y,f.z),r.setXYZ(b,h.x,h.y,h.z),r.setXYZ(_,p.x,p.y,p.z)}else for(let g=0,S=t.count;g<S;g+=3)o.fromBufferAttribute(t,g+0),l.fromBufferAttribute(t,g+1),u.fromBufferAttribute(t,g+2),v.subVectors(u,l),x.subVectors(o,l),v.cross(x),r.setXYZ(g+0,v.x,v.y,v.z),r.setXYZ(g+1,v.x,v.y,v.z),r.setXYZ(g+2,v.x,v.y,v.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)pn.fromBufferAttribute(e,t),pn.normalize(),e.setXYZ(t,pn.x,pn.y,pn.z)}toNonIndexed(){function e(f,h){const p=f.array,v=f.itemSize,x=f.normalized,g=new p.constructor(h.length*v);let S=0,M=0;for(let b=0,_=h.length;b<_;b++){f.isInterleavedBufferAttribute?S=h[b]*f.data.stride+f.offset:S=h[b]*v;for(let y=0;y<v;y++)g[M++]=p[S++]}return new wi(g,v,x)}if(this.index===null)return nt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Qn,r=this.index.array,o=this.attributes;for(const f in o){const h=o[f],p=e(h,r);t.setAttribute(f,p)}const l=this.morphAttributes;for(const f in l){const h=[],p=l[f];for(let v=0,x=p.length;v<x;v++){const g=p[v],S=e(g,r);h.push(S)}t.morphAttributes[f]=h}t.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let f=0,h=u.length;f<h;f++){const p=u[f];t.addGroup(p.start,p.count,p.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const p in h)h[p]!==void 0&&(e[p]=h[p]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const h in r){const p=r[h];e.data.attributes[h]=p.toJSON(e.data)}const o={};let l=!1;for(const h in this.morphAttributes){const p=this.morphAttributes[h],v=[];for(let x=0,g=p.length;x<g;x++){const S=p[x];v.push(S.toJSON(e.data))}v.length>0&&(o[h]=v,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const f=this.boundingSphere;return f!==null&&(e.data.boundingSphere=f.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const o=e.attributes;for(const p in o){const v=o[p];this.setAttribute(p,v.clone(t))}const l=e.morphAttributes;for(const p in l){const v=[],x=l[p];for(let g=0,S=x.length;g<S;g++)v.push(x[g].clone(t));this.morphAttributes[p]=v}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let p=0,v=u.length;p<v;p++){const x=u[p];this.addGroup(x.start,x.count,x.materialIndex)}const f=e.boundingBox;f!==null&&(this.boundingBox=f.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let MS=0;class pa extends Wr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:MS++}),this.uuid=_o(),this.name="",this.type="Material",this.blending=ia,this.side=zr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yd,this.blendDst=qd,this.blendEquation=us,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=oa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ng,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vs,this.stencilZFail=Vs,this.stencilZPass=Vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){nt(`Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){nt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(r):o&&o.isVector3&&r&&r.isVector3?o.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==ia&&(r.blending=this.blending),this.side!==zr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Yd&&(r.blendSrc=this.blendSrc),this.blendDst!==qd&&(r.blendDst=this.blendDst),this.blendEquation!==us&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==oa&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ng&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vs&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Vs&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Vs&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.allowOverride===!1&&(r.allowOverride=!1),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function o(l){const u=[];for(const f in l){const h=l[f];delete h.metadata,u.push(h)}return u}if(t){const l=o(e.textures),u=o(e.images);l.length>0&&(r.textures=l),u.length>0&&(r.images=u)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const o=t.length;r=new Array(o);for(let l=0;l!==o;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const nr=new $,Ad=new $,Dl=new $,Dr=new $,Rd=new $,Nl=new $,Cd=new $;class yc{constructor(e=new $,t=new $(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,nr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=nr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(nr.copy(this.origin).addScaledVector(this.direction,t),nr.distanceToSquared(e))}distanceSqToSegment(e,t,r,o){Ad.copy(e).add(t).multiplyScalar(.5),Dl.copy(t).sub(e).normalize(),Dr.copy(this.origin).sub(Ad);const l=e.distanceTo(t)*.5,u=-this.direction.dot(Dl),f=Dr.dot(this.direction),h=-Dr.dot(Dl),p=Dr.lengthSq(),v=Math.abs(1-u*u);let x,g,S,M;if(v>0)if(x=u*h-f,g=u*f-h,M=l*v,x>=0)if(g>=-M)if(g<=M){const b=1/v;x*=b,g*=b,S=x*(x+u*g+2*f)+g*(u*x+g+2*h)+p}else g=l,x=Math.max(0,-(u*g+f)),S=-x*x+g*(g+2*h)+p;else g=-l,x=Math.max(0,-(u*g+f)),S=-x*x+g*(g+2*h)+p;else g<=-M?(x=Math.max(0,-(-u*l+f)),g=x>0?-l:Math.min(Math.max(-l,-h),l),S=-x*x+g*(g+2*h)+p):g<=M?(x=0,g=Math.min(Math.max(-l,-h),l),S=g*(g+2*h)+p):(x=Math.max(0,-(u*l+f)),g=x>0?l:Math.min(Math.max(-l,-h),l),S=-x*x+g*(g+2*h)+p);else g=u>0?-l:l,x=Math.max(0,-(u*g+f)),S=-x*x+g*(g+2*h)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,x),o&&o.copy(Ad).addScaledVector(Dl,g),S}intersectSphere(e,t){nr.subVectors(e.center,this.origin);const r=nr.dot(this.direction),o=nr.dot(nr)-r*r,l=e.radius*e.radius;if(o>l)return null;const u=Math.sqrt(l-o),f=r-u,h=r+u;return h<0?null:f<0?this.at(h,t):this.at(f,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,o,l,u,f,h;const p=1/this.direction.x,v=1/this.direction.y,x=1/this.direction.z,g=this.origin;return p>=0?(r=(e.min.x-g.x)*p,o=(e.max.x-g.x)*p):(r=(e.max.x-g.x)*p,o=(e.min.x-g.x)*p),v>=0?(l=(e.min.y-g.y)*v,u=(e.max.y-g.y)*v):(l=(e.max.y-g.y)*v,u=(e.min.y-g.y)*v),r>u||l>o||((l>r||isNaN(r))&&(r=l),(u<o||isNaN(o))&&(o=u),x>=0?(f=(e.min.z-g.z)*x,h=(e.max.z-g.z)*x):(f=(e.max.z-g.z)*x,h=(e.min.z-g.z)*x),r>h||f>o)||((f>r||r!==r)&&(r=f),(h<o||o!==o)&&(o=h),o<0)?null:this.at(r>=0?r:o,t)}intersectsBox(e){return this.intersectBox(e,nr)!==null}intersectTriangle(e,t,r,o,l){Rd.subVectors(t,e),Nl.subVectors(r,e),Cd.crossVectors(Rd,Nl);let u=this.direction.dot(Cd),f;if(u>0){if(o)return null;f=1}else if(u<0)f=-1,u=-u;else return null;Dr.subVectors(this.origin,e);const h=f*this.direction.dot(Nl.crossVectors(Dr,Nl));if(h<0)return null;const p=f*this.direction.dot(Rd.cross(Dr));if(p<0||h+p>u)return null;const v=-f*Dr.dot(Cd);return v<0?null:this.at(v/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class dc extends pa{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vr,this.combine=$f,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vg=new Zt,ls=new yc,Il=new xc,xg=new $,Ul=new $,Fl=new $,Ol=new $,Pd=new $,kl=new $,yg=new $,Bl=new $;class Jn extends yn{constructor(e=new Qn,t=new dc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const o=t[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=o.length;l<u;l++){const f=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}getVertexPosition(e,t){const r=this.geometry,o=r.attributes.position,l=r.morphAttributes.position,u=r.morphTargetsRelative;t.fromBufferAttribute(o,e);const f=this.morphTargetInfluences;if(l&&f){kl.set(0,0,0);for(let h=0,p=l.length;h<p;h++){const v=f[h],x=l[h];v!==0&&(Pd.fromBufferAttribute(x,e),u?kl.addScaledVector(Pd,v):kl.addScaledVector(Pd.sub(t),v))}t.add(kl)}return t}raycast(e,t){const r=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Il.copy(r.boundingSphere),Il.applyMatrix4(l),ls.copy(e.ray).recast(e.near),!(Il.containsPoint(ls.origin)===!1&&(ls.intersectSphere(Il,xg)===null||ls.origin.distanceToSquared(xg)>(e.far-e.near)**2))&&(vg.copy(l).invert(),ls.copy(e.ray).applyMatrix4(vg),!(r.boundingBox!==null&&ls.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,ls)))}_computeIntersections(e,t,r){let o;const l=this.geometry,u=this.material,f=l.index,h=l.attributes.position,p=l.attributes.uv,v=l.attributes.uv1,x=l.attributes.normal,g=l.groups,S=l.drawRange;if(f!==null)if(Array.isArray(u))for(let M=0,b=g.length;M<b;M++){const _=g[M],y=u[_.materialIndex],C=Math.max(_.start,S.start),L=Math.min(f.count,Math.min(_.start+_.count,S.start+S.count));for(let P=C,k=L;P<k;P+=3){const I=f.getX(P),z=f.getX(P+1),T=f.getX(P+2);o=zl(this,y,e,r,p,v,x,I,z,T),o&&(o.faceIndex=Math.floor(P/3),o.face.materialIndex=_.materialIndex,t.push(o))}}else{const M=Math.max(0,S.start),b=Math.min(f.count,S.start+S.count);for(let _=M,y=b;_<y;_+=3){const C=f.getX(_),L=f.getX(_+1),P=f.getX(_+2);o=zl(this,u,e,r,p,v,x,C,L,P),o&&(o.faceIndex=Math.floor(_/3),t.push(o))}}else if(h!==void 0)if(Array.isArray(u))for(let M=0,b=g.length;M<b;M++){const _=g[M],y=u[_.materialIndex],C=Math.max(_.start,S.start),L=Math.min(h.count,Math.min(_.start+_.count,S.start+S.count));for(let P=C,k=L;P<k;P+=3){const I=P,z=P+1,T=P+2;o=zl(this,y,e,r,p,v,x,I,z,T),o&&(o.faceIndex=Math.floor(P/3),o.face.materialIndex=_.materialIndex,t.push(o))}}else{const M=Math.max(0,S.start),b=Math.min(h.count,S.start+S.count);for(let _=M,y=b;_<y;_+=3){const C=_,L=_+1,P=_+2;o=zl(this,u,e,r,p,v,x,C,L,P),o&&(o.faceIndex=Math.floor(_/3),t.push(o))}}}}function ES(s,e,t,r,o,l,u,f){let h;if(e.side===Gn?h=r.intersectTriangle(u,l,o,!0,f):h=r.intersectTriangle(o,l,u,e.side===zr,f),h===null)return null;Bl.copy(f),Bl.applyMatrix4(s.matrixWorld);const p=t.ray.origin.distanceTo(Bl);return p<t.near||p>t.far?null:{distance:p,point:Bl.clone(),object:s}}function zl(s,e,t,r,o,l,u,f,h,p){s.getVertexPosition(f,Ul),s.getVertexPosition(h,Fl),s.getVertexPosition(p,Ol);const v=ES(s,e,t,r,Ul,Fl,Ol,yg);if(v){const x=new $;ui.getBarycoord(yg,Ul,Fl,Ol,x),o&&(v.uv=ui.getInterpolatedAttribute(o,f,h,p,x,new ut)),l&&(v.uv1=ui.getInterpolatedAttribute(l,f,h,p,x,new ut)),u&&(v.normal=ui.getInterpolatedAttribute(u,f,h,p,x,new $),v.normal.dot(r.direction)>0&&v.normal.multiplyScalar(-1));const g={a:f,b:h,c:p,normal:new $,materialIndex:0};ui.getNormal(Ul,Fl,Ol,g.normal),v.face=g,v.barycoord=x}return v}class TS extends Dn{constructor(e=null,t=1,r=1,o,l,u,f,h,p=xn,v=xn,x,g){super(null,u,f,h,p,v,o,l,x,g),this.isDataTexture=!0,this.image={data:e,width:t,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ld=new $,wS=new $,bS=new ct;class Ir{constructor(e=new $(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,o){return this.normal.set(e,t,r),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const o=Ld.subVectors(r,t).cross(wS.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,r=!0){const o=e.delta(Ld),l=this.normal.dot(o);if(l===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const u=-(e.start.dot(this.normal)+this.constant)/l;return r===!0&&(u<0||u>1)?null:t.copy(e.start).addScaledVector(o,u)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||bS.getNormalMatrix(e),o=this.coplanarPoint(Ld).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const cs=new xc,AS=new ut(.5,.5),Hl=new $;class oh{constructor(e=new Ir,t=new Ir,r=new Ir,o=new Ir,l=new Ir,u=new Ir){this.planes=[e,t,r,o,l,u]}set(e,t,r,o,l,u){const f=this.planes;return f[0].copy(e),f[1].copy(t),f[2].copy(r),f[3].copy(o),f[4].copy(l),f[5].copy(u),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=Fi,r=!1){const o=this.planes,l=e.elements,u=l[0],f=l[1],h=l[2],p=l[3],v=l[4],x=l[5],g=l[6],S=l[7],M=l[8],b=l[9],_=l[10],y=l[11],C=l[12],L=l[13],P=l[14],k=l[15];if(o[0].setComponents(p-u,S-v,y-M,k-C).normalize(),o[1].setComponents(p+u,S+v,y+M,k+C).normalize(),o[2].setComponents(p+f,S+x,y+b,k+L).normalize(),o[3].setComponents(p-f,S-x,y-b,k-L).normalize(),r)o[4].setComponents(h,g,_,P).normalize(),o[5].setComponents(p-h,S-g,y-_,k-P).normalize();else if(o[4].setComponents(p-h,S-g,y-_,k-P).normalize(),t===Fi)o[5].setComponents(p+h,S+g,y+_,k+P).normalize();else if(t===mo)o[5].setComponents(h,g,_,P).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),cs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),cs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(cs)}intersectsSprite(e){cs.center.set(0,0,0);const t=AS.distanceTo(e.center);return cs.radius=.7071067811865476+t,cs.applyMatrix4(e.matrixWorld),this.intersectsSphere(cs)}intersectsSphere(e){const t=this.planes,r=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const o=t[r];if(Hl.x=o.normal.x>0?e.max.x:e.min.x,Hl.y=o.normal.y>0?e.max.y:e.min.y,Hl.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(Hl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class fc extends pa{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const hc=new $,pc=new $,Sg=new Zt,ro=new yc,Vl=new xc,Dd=new $,Mg=new $;class W_ extends yn{constructor(e=new Qn,t=new fc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let o=1,l=t.count;o<l;o++)hc.fromBufferAttribute(t,o-1),pc.fromBufferAttribute(t,o),r[o]=r[o-1],r[o]+=hc.distanceTo(pc);e.setAttribute("lineDistance",new Wn(r,1))}else nt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,o=this.matrixWorld,l=e.params.Line.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Vl.copy(r.boundingSphere),Vl.applyMatrix4(o),Vl.radius+=l,e.ray.intersectsSphere(Vl)===!1)return;Sg.copy(o).invert(),ro.copy(e.ray).applyMatrix4(Sg);const f=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=f*f,p=this.isLineSegments?2:1,v=r.index,g=r.attributes.position;if(v!==null){const S=Math.max(0,u.start),M=Math.min(v.count,u.start+u.count);for(let b=S,_=M-1;b<_;b+=p){const y=v.getX(b),C=v.getX(b+1),L=Gl(this,e,ro,h,y,C,b);L&&t.push(L)}if(this.isLineLoop){const b=v.getX(M-1),_=v.getX(S),y=Gl(this,e,ro,h,b,_,M-1);y&&t.push(y)}}else{const S=Math.max(0,u.start),M=Math.min(g.count,u.start+u.count);for(let b=S,_=M-1;b<_;b+=p){const y=Gl(this,e,ro,h,b,b+1,b);y&&t.push(y)}if(this.isLineLoop){const b=Gl(this,e,ro,h,M-1,S,M-1);b&&t.push(b)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const o=t[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=o.length;l<u;l++){const f=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}}function Gl(s,e,t,r,o,l,u){const f=s.geometry.attributes.position;if(hc.fromBufferAttribute(f,o),pc.fromBufferAttribute(f,l),t.distanceSqToSegment(hc,pc,Dd,Mg)>r)return;Dd.applyMatrix4(s.matrixWorld);const p=e.ray.origin.distanceTo(Dd);if(!(p<e.near||p>e.far))return{distance:p,point:Mg.clone().applyMatrix4(s.matrixWorld),index:u,face:null,faceIndex:null,barycoord:null,object:s}}const Eg=new $,Tg=new $;class j_ extends W_{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[];for(let o=0,l=t.count;o<l;o+=2)Eg.fromBufferAttribute(t,o),Tg.fromBufferAttribute(t,o+1),r[o]=o===0?0:r[o-1],r[o+1]=r[o]+Eg.distanceTo(Tg);e.setAttribute("lineDistance",new Wn(r,1))}else nt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class RS extends W_{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class X_ extends Dn{constructor(e=[],t=ps,r,o,l,u,f,h,p,v){super(e,t,r,o,l,u,f,h,p,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ca extends Dn{constructor(e,t,r=Bi,o,l,u,f=xn,h=xn,p,v=lr,x=1){if(v!==lr&&v!==hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:t,depth:x};super(g,o,l,u,f,h,v,r,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class CS extends ca{constructor(e,t=Bi,r=ps,o,l,u=xn,f=xn,h,p=lr){const v={width:e,height:e,depth:1},x=[v,v,v,v,v,v];super(e,e,t,r,o,l,u,f,h,p),this.image=x,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Y_ extends Dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class rr extends Qn{constructor(e=1,t=1,r=1,o=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:o,heightSegments:l,depthSegments:u};const f=this;o=Math.floor(o),l=Math.floor(l),u=Math.floor(u);const h=[],p=[],v=[],x=[];let g=0,S=0;M("z","y","x",-1,-1,r,t,e,u,l,0),M("z","y","x",1,-1,r,t,-e,u,l,1),M("x","z","y",1,1,e,r,t,o,u,2),M("x","z","y",1,-1,e,r,-t,o,u,3),M("x","y","z",1,-1,e,t,r,o,l,4),M("x","y","z",-1,-1,e,t,-r,o,l,5),this.setIndex(h),this.setAttribute("position",new Wn(p,3)),this.setAttribute("normal",new Wn(v,3)),this.setAttribute("uv",new Wn(x,2));function M(b,_,y,C,L,P,k,I,z,T,D){const B=P/z,F=k/T,q=P/2,ae=k/2,de=I/2,j=z+1,ie=T+1;let Y=0,K=0;const ce=new $;for(let le=0;le<ie;le++){const O=le*F-ae;for(let ee=0;ee<j;ee++){const Oe=ee*B-q;ce[b]=Oe*C,ce[_]=O*L,ce[y]=de,p.push(ce.x,ce.y,ce.z),ce[b]=0,ce[_]=0,ce[y]=I>0?1:-1,v.push(ce.x,ce.y,ce.z),x.push(ee/z),x.push(1-le/T),Y+=1}}for(let le=0;le<T;le++)for(let O=0;O<z;O++){const ee=g+O+j*le,Oe=g+O+j*(le+1),Ge=g+(O+1)+j*(le+1),Ie=g+(O+1)+j*le;h.push(ee,Oe,Ie),h.push(Oe,Ge,Ie),K+=6}f.addGroup(S,K,D),S+=K,g+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}const Wl=new $,jl=new $,Nd=new $,Xl=new ui;class PS extends Qn{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const o=Math.pow(10,4),l=Math.cos(co*t),u=e.getIndex(),f=e.getAttribute("position"),h=u?u.count:f.count,p=[0,0,0],v=["a","b","c"],x=new Array(3),g={},S=[];for(let M=0;M<h;M+=3){u?(p[0]=u.getX(M),p[1]=u.getX(M+1),p[2]=u.getX(M+2)):(p[0]=M,p[1]=M+1,p[2]=M+2);const{a:b,b:_,c:y}=Xl;if(b.fromBufferAttribute(f,p[0]),_.fromBufferAttribute(f,p[1]),y.fromBufferAttribute(f,p[2]),Xl.getNormal(Nd),x[0]=`${Math.round(b.x*o)},${Math.round(b.y*o)},${Math.round(b.z*o)}`,x[1]=`${Math.round(_.x*o)},${Math.round(_.y*o)},${Math.round(_.z*o)}`,x[2]=`${Math.round(y.x*o)},${Math.round(y.y*o)},${Math.round(y.z*o)}`,!(x[0]===x[1]||x[1]===x[2]||x[2]===x[0]))for(let C=0;C<3;C++){const L=(C+1)%3,P=x[C],k=x[L],I=Xl[v[C]],z=Xl[v[L]],T=`${P}_${k}`,D=`${k}_${P}`;D in g&&g[D]?(Nd.dot(g[D].normal)<=l&&(S.push(I.x,I.y,I.z),S.push(z.x,z.y,z.z)),g[D]=null):T in g||(g[T]={index0:p[C],index1:p[L],normal:Nd.clone()})}}for(const M in g)if(g[M]){const{index0:b,index1:_}=g[M];Wl.fromBufferAttribute(f,b),jl.fromBufferAttribute(f,_),S.push(Wl.x,Wl.y,Wl.z),S.push(jl.x,jl.y,jl.z)}this.setAttribute("position",new Wn(S,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ua extends Qn{constructor(e=1,t=1,r=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:o};const l=e/2,u=t/2,f=Math.floor(r),h=Math.floor(o),p=f+1,v=h+1,x=e/f,g=t/h,S=[],M=[],b=[],_=[];for(let y=0;y<v;y++){const C=y*g-u;for(let L=0;L<p;L++){const P=L*x-l;M.push(P,-C,0),b.push(0,0,1),_.push(L/f),_.push(1-y/h)}}for(let y=0;y<h;y++)for(let C=0;C<f;C++){const L=C+p*y,P=C+p*(y+1),k=C+1+p*(y+1),I=C+1+p*y;S.push(L,P,I),S.push(P,k,I)}this.setIndex(S),this.setAttribute("position",new Wn(M,3)),this.setAttribute("normal",new Wn(b,3)),this.setAttribute("uv",new Wn(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ua(e.width,e.height,e.widthSegments,e.heightSegments)}}function da(s){const e={};for(const t in s){e[t]={};for(const r in s[t]){const o=s[t][r];if(wg(o))o.isRenderTargetTexture?(nt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=o.clone();else if(Array.isArray(o))if(wg(o[0])){const l=[];for(let u=0,f=o.length;u<f;u++)l[u]=o[u].clone();e[t][r]=l}else e[t][r]=o.slice();else e[t][r]=o}}return e}function Ln(s){const e={};for(let t=0;t<s.length;t++){const r=da(s[t]);for(const o in r)e[o]=r[o]}return e}function wg(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function LS(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function q_(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:St.workingColorSpace}const DS={clone:da,merge:Ln};var NS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,IS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zi extends pa{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=NS,this.fragmentShader=IS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=da(e.uniforms),this.uniformsGroups=LS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?t.uniforms[o]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?t.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?t.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?t.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?t.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?t.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?t.uniforms[o]={type:"m4",value:u.toArray()}:t.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const o in this.extensions)this.extensions[o]===!0&&(r[o]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class US extends zi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class bg extends pa{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Uf,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vr,this.combine=$f,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class FS extends pa{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class OS extends pa{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class $_ extends yn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new yt(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Id=new Zt,Ag=new $,Rg=new $;class kS{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.mapType=Zn,this.map=null,this.mapPass=null,this.matrix=new Zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new oh,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new Qt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;Ag.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ag),Rg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Rg),t.updateMatrixWorld(),Id.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Id,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===mo||t.reversedDepth?r.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Id)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Yl=new $,ql=new Hr,Di=new $;class K_ extends yn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=Fi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Yl,ql,Di),Di.x===1&&Di.y===1&&Di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Yl,ql,Di.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Yl,ql,Di),Di.x===1&&Di.y===1&&Di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Yl,ql,Di.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Nr=new $,Cg=new ut,Pg=new ut;class ci extends K_{constructor(e=50,t=1,r=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Of*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(co*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Of*2*Math.atan(Math.tan(co*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){Nr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Nr.x,Nr.y).multiplyScalar(-e/Nr.z),Nr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Nr.x,Nr.y).multiplyScalar(-e/Nr.z)}getViewSize(e,t){return this.getViewBounds(e,Cg,Pg),t.subVectors(Pg,Cg)}setViewOffset(e,t,r,o,l,u){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(co*.5*this.fov)/this.zoom,r=2*t,o=this.aspect*r,l=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const h=u.fullWidth,p=u.fullHeight;l+=u.offsetX*o/h,t-=u.offsetY*r/p,o*=u.width/h,r*=u.height/p}const f=this.filmOffset;f!==0&&(l+=e*f/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class lh extends K_{constructor(e=-1,t=1,r=1,o=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=o,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,o,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=r-e,u=r+e,f=o+t,h=o-t;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=p*this.view.offsetX,u=l+p*this.view.width,f-=v*this.view.offsetY,h=f-v*this.view.height}this.projectionMatrix.makeOrthographic(l,u,f,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class BS extends kS{constructor(){super(new lh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Lg extends $_{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yn.DEFAULT_UP),this.updateMatrix(),this.target=new yn,this.shadow=new BS}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class zS extends $_{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Qs=-90,ea=1;class HS extends yn{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new ci(Qs,ea,e,t);o.layers=this.layers,this.add(o);const l=new ci(Qs,ea,e,t);l.layers=this.layers,this.add(l);const u=new ci(Qs,ea,e,t);u.layers=this.layers,this.add(u);const f=new ci(Qs,ea,e,t);f.layers=this.layers,this.add(f);const h=new ci(Qs,ea,e,t);h.layers=this.layers,this.add(h);const p=new ci(Qs,ea,e,t);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,o,l,u,f,h]=t;for(const p of t)this.remove(p);if(e===Fi)r.up.set(0,1,0),r.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),f.up.set(0,1,0),f.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===mo)r.up.set(0,-1,0),r.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),f.up.set(0,-1,0),f.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of t)this.add(p),p.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,u,f,h,p,v]=this.children,x=e.getRenderTarget(),g=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const b=r.texture.generateMipmaps;r.texture.generateMipmaps=!1;let _=!1;e.isWebGLRenderer===!0?_=e.state.buffers.depth.getReversed():_=e.reversedDepthBuffer,e.setRenderTarget(r,0,o),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(r,1,o),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(r,2,o),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(r,3,o),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(r,4,o),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,p),r.texture.generateMipmaps=b,e.setRenderTarget(r,5,o),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,v),e.setRenderTarget(x,g,S),e.xr.enabled=M,r.texture.needsPMREMUpdate=!0}}class VS extends ci{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Dg=new Zt;class GS{constructor(e,t,r=0,o=1/0){this.ray=new yc(e,t),this.near=r,this.far=o,this.camera=null,this.layers=new sh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Et("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Dg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Dg),this}intersectObject(e,t=!0,r=[]){return kf(e,this,r,t),r.sort(Ng),r}intersectObjects(e,t=!0,r=[]){for(let o=0,l=e.length;o<l;o++)kf(e[o],this,r,t);return r.sort(Ng),r}}function Ng(s,e){return s.distance-e.distance}function kf(s,e,t,r){let o=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(o=!1),o===!0&&r===!0){const l=s.children;for(let u=0,f=l.length;u<f;u++)kf(l[u],e,t,!0)}}class Ig{constructor(e=1,t=0,r=0){this.radius=e,this.phi=t,this.theta=r}set(e,t,r){return this.radius=e,this.phi=t,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=xt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,r){return this.radius=Math.sqrt(e*e+t*t+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(xt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const ph=class ph{constructor(e,t,r,o){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,r,o)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let r=0;r<4;r++)this.elements[r]=e[r+t];return this}set(e,t,r,o){const l=this.elements;return l[0]=e,l[2]=t,l[1]=r,l[3]=o,this}};ph.prototype.isMatrix2=!0;let Ug=ph;class WS extends j_{constructor(e=10,t=10,r=4473924,o=8947848){r=new yt(r),o=new yt(o);const l=t/2,u=e/t,f=e/2,h=[],p=[];for(let g=0,S=0,M=-f;g<=t;g++,M+=u){h.push(-f,0,M,f,0,M),h.push(M,0,-f,M,0,f);const b=g===l?r:o;b.toArray(p,S),S+=3,b.toArray(p,S),S+=3,b.toArray(p,S),S+=3,b.toArray(p,S),S+=3}const v=new Qn;v.setAttribute("position",new Wn(h,3)),v.setAttribute("color",new Wn(p,3));const x=new fc({vertexColors:!0,toneMapped:!1});super(v,x),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class jS extends Wr{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){nt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Fg(s,e,t,r){const o=XS(r);switch(t){case F_:return s*e;case k_:return s*e/o.components*o.byteLength;case Qf:return s*e/o.components*o.byteLength;case ms:return s*e*2/o.components*o.byteLength;case eh:return s*e*2/o.components*o.byteLength;case O_:return s*e*3/o.components*o.byteLength;case Ti:return s*e*4/o.components*o.byteLength;case th:return s*e*4/o.components*o.byteLength;case Ql:case ec:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case tc:case nc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case af:case lf:return Math.max(s,16)*Math.max(e,8)/4;case sf:case of:return Math.max(s,8)*Math.max(e,8)/2;case cf:case uf:case ff:case hf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case df:case ac:case pf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case mf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case gf:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case _f:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case vf:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case xf:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case yf:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Sf:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Mf:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Ef:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Tf:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case wf:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case bf:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Af:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Rf:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Cf:case Pf:case Lf:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Df:case Nf:return Math.ceil(s/4)*Math.ceil(e/4)*8;case oc:case If:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function XS(s){switch(s){case Zn:case D_:return{byteLength:1,components:1};case ho:case N_:case or:return{byteLength:2,components:1};case Zf:case Jf:return{byteLength:2,components:4};case Bi:case Kf:case Ui:return{byteLength:4,components:1};case I_:case U_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qf}}));typeof window<"u"&&(window.__THREE__?nt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qf);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Z_(){let s=null,e=!1,t=null,r=null;function o(l,u){t(l,u),r=s.requestAnimationFrame(o)}return{start:function(){e!==!0&&t!==null&&s!==null&&(r=s.requestAnimationFrame(o),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function YS(s){const e=new WeakMap;function t(f,h){const p=f.array,v=f.usage,x=p.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,p,v),f.onUploadCallback();let S;if(p instanceof Float32Array)S=s.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)S=s.HALF_FLOAT;else if(p instanceof Uint16Array)f.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=s.SHORT;else if(p instanceof Uint32Array)S=s.UNSIGNED_INT;else if(p instanceof Int32Array)S=s.INT;else if(p instanceof Int8Array)S=s.BYTE;else if(p instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:f.version,size:x}}function r(f,h,p){const v=h.array,x=h.updateRanges;if(s.bindBuffer(p,f),x.length===0)s.bufferSubData(p,0,v);else{x.sort((S,M)=>S.start-M.start);let g=0;for(let S=1;S<x.length;S++){const M=x[g],b=x[S];b.start<=M.start+M.count+1?M.count=Math.max(M.count,b.start+b.count-M.start):(++g,x[g]=b)}x.length=g+1;for(let S=0,M=x.length;S<M;S++){const b=x[S];s.bufferSubData(p,b.start*v.BYTES_PER_ELEMENT,v,b.start,b.count)}h.clearUpdateRanges()}h.onUploadCallback()}function o(f){return f.isInterleavedBufferAttribute&&(f=f.data),e.get(f)}function l(f){f.isInterleavedBufferAttribute&&(f=f.data);const h=e.get(f);h&&(s.deleteBuffer(h.buffer),e.delete(f))}function u(f,h){if(f.isInterleavedBufferAttribute&&(f=f.data),f.isGLBufferAttribute){const v=e.get(f);(!v||v.version<f.version)&&e.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}const p=e.get(f);if(p===void 0)e.set(f,t(f,h));else if(p.version<f.version){if(p.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,f,h),p.version=f.version}}return{get:o,remove:l,update:u}}var qS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$S=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,KS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ZS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,JS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,QS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,eM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,tM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,iM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,aM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,oM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,cM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,uM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,pM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,mM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,gM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,_M=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,yM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,SM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,MM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,EM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,TM="gl_FragColor = linearToOutputTexel( gl_FragColor );",wM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,AM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,RM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,CM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,PM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,LM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,DM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,NM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,IM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,UM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,FM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,OM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,BM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,zM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,HM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,VM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,GM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,WM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,XM=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,YM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$M=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,KM=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,ZM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,JM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,QM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,iE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,aE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,oE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,hE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_E=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,vE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,SE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ME=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,EE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,TE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,AE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,RE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,CE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,PE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,LE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,DE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,NE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,IE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,UE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,FE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,OE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,kE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,BE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,HE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,VE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,GE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,WE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,XE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,YE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$E=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ZE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,JE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,QE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,tT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,nT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,iT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,rT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,oT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,cT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,mT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,gT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_T=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ST=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ET=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,TT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,AT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pt={alphahash_fragment:qS,alphahash_pars_fragment:$S,alphamap_fragment:KS,alphamap_pars_fragment:ZS,alphatest_fragment:JS,alphatest_pars_fragment:QS,aomap_fragment:eM,aomap_pars_fragment:tM,batching_pars_vertex:nM,batching_vertex:iM,begin_vertex:rM,beginnormal_vertex:sM,bsdfs:aM,iridescence_fragment:oM,bumpmap_pars_fragment:lM,clipping_planes_fragment:cM,clipping_planes_pars_fragment:uM,clipping_planes_pars_vertex:dM,clipping_planes_vertex:fM,color_fragment:hM,color_pars_fragment:pM,color_pars_vertex:mM,color_vertex:gM,common:_M,cube_uv_reflection_fragment:vM,defaultnormal_vertex:xM,displacementmap_pars_vertex:yM,displacementmap_vertex:SM,emissivemap_fragment:MM,emissivemap_pars_fragment:EM,colorspace_fragment:TM,colorspace_pars_fragment:wM,envmap_fragment:bM,envmap_common_pars_fragment:AM,envmap_pars_fragment:RM,envmap_pars_vertex:CM,envmap_physical_pars_fragment:zM,envmap_vertex:PM,fog_vertex:LM,fog_pars_vertex:DM,fog_fragment:NM,fog_pars_fragment:IM,gradientmap_pars_fragment:UM,lightmap_pars_fragment:FM,lights_lambert_fragment:OM,lights_lambert_pars_fragment:kM,lights_pars_begin:BM,lights_toon_fragment:HM,lights_toon_pars_fragment:VM,lights_phong_fragment:GM,lights_phong_pars_fragment:WM,lights_physical_fragment:jM,lights_physical_pars_fragment:XM,lights_fragment_begin:YM,lights_fragment_maps:qM,lights_fragment_end:$M,lightprobes_pars_fragment:KM,logdepthbuf_fragment:ZM,logdepthbuf_pars_fragment:JM,logdepthbuf_pars_vertex:QM,logdepthbuf_vertex:eE,map_fragment:tE,map_pars_fragment:nE,map_particle_fragment:iE,map_particle_pars_fragment:rE,metalnessmap_fragment:sE,metalnessmap_pars_fragment:aE,morphinstance_vertex:oE,morphcolor_vertex:lE,morphnormal_vertex:cE,morphtarget_pars_vertex:uE,morphtarget_vertex:dE,normal_fragment_begin:fE,normal_fragment_maps:hE,normal_pars_fragment:pE,normal_pars_vertex:mE,normal_vertex:gE,normalmap_pars_fragment:_E,clearcoat_normal_fragment_begin:vE,clearcoat_normal_fragment_maps:xE,clearcoat_pars_fragment:yE,iridescence_pars_fragment:SE,opaque_fragment:ME,packing:EE,premultiplied_alpha_fragment:TE,project_vertex:wE,dithering_fragment:bE,dithering_pars_fragment:AE,roughnessmap_fragment:RE,roughnessmap_pars_fragment:CE,shadowmap_pars_fragment:PE,shadowmap_pars_vertex:LE,shadowmap_vertex:DE,shadowmask_pars_fragment:NE,skinbase_vertex:IE,skinning_pars_vertex:UE,skinning_vertex:FE,skinnormal_vertex:OE,specularmap_fragment:kE,specularmap_pars_fragment:BE,tonemapping_fragment:zE,tonemapping_pars_fragment:HE,transmission_fragment:VE,transmission_pars_fragment:GE,uv_pars_fragment:WE,uv_pars_vertex:jE,uv_vertex:XE,worldpos_vertex:YE,background_vert:qE,background_frag:$E,backgroundCube_vert:KE,backgroundCube_frag:ZE,cube_vert:JE,cube_frag:QE,depth_vert:eT,depth_frag:tT,distance_vert:nT,distance_frag:iT,equirect_vert:rT,equirect_frag:sT,linedashed_vert:aT,linedashed_frag:oT,meshbasic_vert:lT,meshbasic_frag:cT,meshlambert_vert:uT,meshlambert_frag:dT,meshmatcap_vert:fT,meshmatcap_frag:hT,meshnormal_vert:pT,meshnormal_frag:mT,meshphong_vert:gT,meshphong_frag:_T,meshphysical_vert:vT,meshphysical_frag:xT,meshtoon_vert:yT,meshtoon_frag:ST,points_vert:MT,points_frag:ET,shadow_vert:TT,shadow_frag:wT,sprite_vert:bT,sprite_frag:AT},Ne={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new $},probesMax:{value:new $},probesResolution:{value:new $}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},Ii={basic:{uniforms:Ln([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:Ln([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new yt(0)},envMapIntensity:{value:1}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:Ln([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:Ln([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:Ln([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new yt(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:Ln([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:Ln([Ne.points,Ne.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:Ln([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:Ln([Ne.common,Ne.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:Ln([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:Ln([Ne.sprite,Ne.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distance:{uniforms:Ln([Ne.common,Ne.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distance_vert,fragmentShader:pt.distance_frag},shadow:{uniforms:Ln([Ne.lights,Ne.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};Ii.physical={uniforms:Ln([Ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};const $l={r:0,b:0,g:0},RT=new Zt,J_=new ct;J_.set(-1,0,0,0,1,0,0,0,1);function CT(s,e,t,r,o,l){const u=new yt(0);let f=o===!0?0:1,h,p,v=null,x=0,g=null;function S(C){let L=C.isScene===!0?C.background:null;if(L&&L.isTexture){const P=C.backgroundBlurriness>0;L=e.get(L,P)}return L}function M(C){let L=!1;const P=S(C);P===null?_(u,f):P&&P.isColor&&(_(P,1),L=!0);const k=s.xr.getEnvironmentBlendMode();k==="additive"?t.buffers.color.setClear(0,0,0,1,l):k==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,l),(s.autoClear||L)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function b(C,L){const P=S(L);P&&(P.isCubeTexture||P.mapping===vc)?(p===void 0&&(p=new Jn(new rr(1,1,1),new zi({name:"BackgroundCubeMaterial",uniforms:da(Ii.backgroundCube.uniforms),vertexShader:Ii.backgroundCube.vertexShader,fragmentShader:Ii.backgroundCube.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(k,I,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(p)),p.material.uniforms.envMap.value=P,p.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(RT.makeRotationFromEuler(L.backgroundRotation)).transpose(),P.isCubeTexture&&P.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(J_),p.material.toneMapped=St.getTransfer(P.colorSpace)!==Dt,(v!==P||x!==P.version||g!==s.toneMapping)&&(p.material.needsUpdate=!0,v=P,x=P.version,g=s.toneMapping),p.layers.enableAll(),C.unshift(p,p.geometry,p.material,0,0,null)):P&&P.isTexture&&(h===void 0&&(h=new Jn(new ua(2,2),new zi({name:"BackgroundMaterial",uniforms:da(Ii.background.uniforms),vertexShader:Ii.background.vertexShader,fragmentShader:Ii.background.fragmentShader,side:zr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(h)),h.material.uniforms.t2D.value=P,h.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,h.material.toneMapped=St.getTransfer(P.colorSpace)!==Dt,P.matrixAutoUpdate===!0&&P.updateMatrix(),h.material.uniforms.uvTransform.value.copy(P.matrix),(v!==P||x!==P.version||g!==s.toneMapping)&&(h.material.needsUpdate=!0,v=P,x=P.version,g=s.toneMapping),h.layers.enableAll(),C.unshift(h,h.geometry,h.material,0,0,null))}function _(C,L){C.getRGB($l,q_(s)),t.buffers.color.setClear($l.r,$l.g,$l.b,L,l)}function y(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return u},setClearColor:function(C,L=1){u.set(C),f=L,_(u,f)},getClearAlpha:function(){return f},setClearAlpha:function(C){f=C,_(u,f)},render:M,addToRenderList:b,dispose:y}}function PT(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},o=g(null);let l=o,u=!1;function f(F,q,ae,de,j){let ie=!1;const Y=x(F,de,ae,q);l!==Y&&(l=Y,p(l.object)),ie=S(F,de,ae,j),ie&&M(F,de,ae,j),j!==null&&e.update(j,s.ELEMENT_ARRAY_BUFFER),(ie||u)&&(u=!1,P(F,q,ae,de),j!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function h(){return s.createVertexArray()}function p(F){return s.bindVertexArray(F)}function v(F){return s.deleteVertexArray(F)}function x(F,q,ae,de){const j=de.wireframe===!0;let ie=r[q.id];ie===void 0&&(ie={},r[q.id]=ie);const Y=F.isInstancedMesh===!0?F.id:0;let K=ie[Y];K===void 0&&(K={},ie[Y]=K);let ce=K[ae.id];ce===void 0&&(ce={},K[ae.id]=ce);let le=ce[j];return le===void 0&&(le=g(h()),ce[j]=le),le}function g(F){const q=[],ae=[],de=[];for(let j=0;j<t;j++)q[j]=0,ae[j]=0,de[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:ae,attributeDivisors:de,object:F,attributes:{},index:null}}function S(F,q,ae,de){const j=l.attributes,ie=q.attributes;let Y=0;const K=ae.getAttributes();for(const ce in K)if(K[ce].location>=0){const O=j[ce];let ee=ie[ce];if(ee===void 0&&(ce==="instanceMatrix"&&F.instanceMatrix&&(ee=F.instanceMatrix),ce==="instanceColor"&&F.instanceColor&&(ee=F.instanceColor)),O===void 0||O.attribute!==ee||ee&&O.data!==ee.data)return!0;Y++}return l.attributesNum!==Y||l.index!==de}function M(F,q,ae,de){const j={},ie=q.attributes;let Y=0;const K=ae.getAttributes();for(const ce in K)if(K[ce].location>=0){let O=ie[ce];O===void 0&&(ce==="instanceMatrix"&&F.instanceMatrix&&(O=F.instanceMatrix),ce==="instanceColor"&&F.instanceColor&&(O=F.instanceColor));const ee={};ee.attribute=O,O&&O.data&&(ee.data=O.data),j[ce]=ee,Y++}l.attributes=j,l.attributesNum=Y,l.index=de}function b(){const F=l.newAttributes;for(let q=0,ae=F.length;q<ae;q++)F[q]=0}function _(F){y(F,0)}function y(F,q){const ae=l.newAttributes,de=l.enabledAttributes,j=l.attributeDivisors;ae[F]=1,de[F]===0&&(s.enableVertexAttribArray(F),de[F]=1),j[F]!==q&&(s.vertexAttribDivisor(F,q),j[F]=q)}function C(){const F=l.newAttributes,q=l.enabledAttributes;for(let ae=0,de=q.length;ae<de;ae++)q[ae]!==F[ae]&&(s.disableVertexAttribArray(ae),q[ae]=0)}function L(F,q,ae,de,j,ie,Y){Y===!0?s.vertexAttribIPointer(F,q,ae,j,ie):s.vertexAttribPointer(F,q,ae,de,j,ie)}function P(F,q,ae,de){b();const j=de.attributes,ie=ae.getAttributes(),Y=q.defaultAttributeValues;for(const K in ie){const ce=ie[K];if(ce.location>=0){let le=j[K];if(le===void 0&&(K==="instanceMatrix"&&F.instanceMatrix&&(le=F.instanceMatrix),K==="instanceColor"&&F.instanceColor&&(le=F.instanceColor)),le!==void 0){const O=le.normalized,ee=le.itemSize,Oe=e.get(le);if(Oe===void 0)continue;const Ge=Oe.buffer,Ie=Oe.type,oe=Oe.bytesPerElement,Se=Ie===s.INT||Ie===s.UNSIGNED_INT||le.gpuType===Kf;if(le.isInterleavedBufferAttribute){const me=le.data,Ue=me.stride,Je=le.offset;if(me.isInstancedInterleavedBuffer){for(let Qe=0;Qe<ce.locationSize;Qe++)y(ce.location+Qe,me.meshPerAttribute);F.isInstancedMesh!==!0&&de._maxInstanceCount===void 0&&(de._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Qe=0;Qe<ce.locationSize;Qe++)_(ce.location+Qe);s.bindBuffer(s.ARRAY_BUFFER,Ge);for(let Qe=0;Qe<ce.locationSize;Qe++)L(ce.location+Qe,ee/ce.locationSize,Ie,O,Ue*oe,(Je+ee/ce.locationSize*Qe)*oe,Se)}else{if(le.isInstancedBufferAttribute){for(let me=0;me<ce.locationSize;me++)y(ce.location+me,le.meshPerAttribute);F.isInstancedMesh!==!0&&de._maxInstanceCount===void 0&&(de._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let me=0;me<ce.locationSize;me++)_(ce.location+me);s.bindBuffer(s.ARRAY_BUFFER,Ge);for(let me=0;me<ce.locationSize;me++)L(ce.location+me,ee/ce.locationSize,Ie,O,ee*oe,ee/ce.locationSize*me*oe,Se)}}else if(Y!==void 0){const O=Y[K];if(O!==void 0)switch(O.length){case 2:s.vertexAttrib2fv(ce.location,O);break;case 3:s.vertexAttrib3fv(ce.location,O);break;case 4:s.vertexAttrib4fv(ce.location,O);break;default:s.vertexAttrib1fv(ce.location,O)}}}}C()}function k(){D();for(const F in r){const q=r[F];for(const ae in q){const de=q[ae];for(const j in de){const ie=de[j];for(const Y in ie)v(ie[Y].object),delete ie[Y];delete de[j]}}delete r[F]}}function I(F){if(r[F.id]===void 0)return;const q=r[F.id];for(const ae in q){const de=q[ae];for(const j in de){const ie=de[j];for(const Y in ie)v(ie[Y].object),delete ie[Y];delete de[j]}}delete r[F.id]}function z(F){for(const q in r){const ae=r[q];for(const de in ae){const j=ae[de];if(j[F.id]===void 0)continue;const ie=j[F.id];for(const Y in ie)v(ie[Y].object),delete ie[Y];delete j[F.id]}}}function T(F){for(const q in r){const ae=r[q],de=F.isInstancedMesh===!0?F.id:0,j=ae[de];if(j!==void 0){for(const ie in j){const Y=j[ie];for(const K in Y)v(Y[K].object),delete Y[K];delete j[ie]}delete ae[de],Object.keys(ae).length===0&&delete r[q]}}}function D(){B(),u=!0,l!==o&&(l=o,p(l.object))}function B(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:f,reset:D,resetDefaultState:B,dispose:k,releaseStatesOfGeometry:I,releaseStatesOfObject:T,releaseStatesOfProgram:z,initAttributes:b,enableAttribute:_,disableUnusedAttributes:C}}function LT(s,e,t){let r;function o(h){r=h}function l(h,p){s.drawArrays(r,h,p),t.update(p,r,1)}function u(h,p,v){v!==0&&(s.drawArraysInstanced(r,h,p,v),t.update(p,r,v))}function f(h,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,h,0,p,0,v);let g=0;for(let S=0;S<v;S++)g+=p[S];t.update(g,r,1)}this.setMode=o,this.render=l,this.renderInstances=u,this.renderMultiDraw=f}function DT(s,e,t,r){let o;function l(){if(o!==void 0)return o;if(e.has("EXT_texture_filter_anisotropic")===!0){const z=e.get("EXT_texture_filter_anisotropic");o=s.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(z){return!(z!==Ti&&r.convert(z)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function f(z){const T=z===or&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(z!==Zn&&r.convert(z)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&z!==Ui&&!T)}function h(z){if(z==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";z="mediump"}return z==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=t.precision!==void 0?t.precision:"highp";const v=h(p);v!==p&&(nt("WebGLRenderer:",p,"not supported, using",v,"instead."),p=v);const x=t.logarithmicDepthBuffer===!0,g=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&g===!1&&nt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),M=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),y=s.getParameter(s.MAX_VERTEX_ATTRIBS),C=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),L=s.getParameter(s.MAX_VARYING_VECTORS),P=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),k=s.getParameter(s.MAX_SAMPLES),I=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:h,textureFormatReadable:u,textureTypeReadable:f,precision:p,logarithmicDepthBuffer:x,reversedDepthBuffer:g,maxTextures:S,maxVertexTextures:M,maxTextureSize:b,maxCubemapSize:_,maxAttributes:y,maxVertexUniforms:C,maxVaryings:L,maxFragmentUniforms:P,maxSamples:k,samples:I}}function NT(s){const e=this;let t=null,r=0,o=!1,l=!1;const u=new Ir,f=new ct,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(x,g){const S=x.length!==0||g||r!==0||o;return o=g,r=x.length,S},this.beginShadows=function(){l=!0,v(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(x,g){t=v(x,g,0)},this.setState=function(x,g,S){const M=x.clippingPlanes,b=x.clipIntersection,_=x.clipShadows,y=s.get(x);if(!o||M===null||M.length===0||l&&!_)l?v(null):p();else{const C=l?0:r,L=C*4;let P=y.clippingState||null;h.value=P,P=v(M,g,L,S);for(let k=0;k!==L;++k)P[k]=t[k];y.clippingState=P,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=C}};function p(){h.value!==t&&(h.value=t,h.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function v(x,g,S,M){const b=x!==null?x.length:0;let _=null;if(b!==0){if(_=h.value,M!==!0||_===null){const y=S+b*4,C=g.matrixWorldInverse;f.getNormalMatrix(C),(_===null||_.length<y)&&(_=new Float32Array(y));for(let L=0,P=S;L!==b;++L,P+=4)u.copy(x[L]).applyMatrix4(C,f),u.normal.toArray(_,P),_[P+3]=u.constant}h.value=_,h.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,_}}const Or=4,Og=[.125,.215,.35,.446,.526,.582],ds=20,IT=256,so=new lh,kg=new yt;let Ud=null,Fd=0,Od=0,kd=!1;const UT=new $;class Bg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,r=.1,o=100,l={}){const{size:u=256,position:f=UT}=l;Ud=this._renderer.getRenderTarget(),Fd=this._renderer.getActiveCubeFace(),Od=this._renderer.getActiveMipmapLevel(),kd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,r,o,h,f),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ud,Fd,Od),this._renderer.xr.enabled=kd,e.scissorTest=!1,ta(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ps||e.mapping===la?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ud=this._renderer.getRenderTarget(),Fd=this._renderer.getActiveCubeFace(),Od=this._renderer.getActiveMipmapLevel(),kd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:An,minFilter:An,generateMipmaps:!1,type:or,format:Ti,colorSpace:lc,depthBuffer:!1},o=zg(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zg(e,t,r);const{_lodMax:l}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=FT(l)),this._blurMaterial=kT(l,e,t),this._ggxMaterial=OT(l,e,t)}return o}_compileMaterial(e){const t=new Jn(new Qn,e);this._renderer.compile(t,so)}_sceneToCubeUV(e,t,r,o,l){const h=new ci(90,1,t,r),p=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],x=this._renderer,g=x.autoClear,S=x.toneMapping;x.getClearColor(kg),x.toneMapping=Oi,x.autoClear=!1,x.state.buffers.depth.getReversed()&&(x.setRenderTarget(o),x.clearDepth(),x.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Jn(new rr,new dc({name:"PMREM.Background",side:Gn,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,_=b.material;let y=!1;const C=e.background;C?C.isColor&&(_.color.copy(C),e.background=null,y=!0):(_.color.copy(kg),y=!0);for(let L=0;L<6;L++){const P=L%3;P===0?(h.up.set(0,p[L],0),h.position.set(l.x,l.y,l.z),h.lookAt(l.x+v[L],l.y,l.z)):P===1?(h.up.set(0,0,p[L]),h.position.set(l.x,l.y,l.z),h.lookAt(l.x,l.y+v[L],l.z)):(h.up.set(0,p[L],0),h.position.set(l.x,l.y,l.z),h.lookAt(l.x,l.y,l.z+v[L]));const k=this._cubeSize;ta(o,P*k,L>2?k:0,k,k),x.setRenderTarget(o),y&&x.render(b,h),x.render(e,h)}x.toneMapping=S,x.autoClear=g,e.background=C}_textureToCubeUV(e,t){const r=this._renderer,o=e.mapping===ps||e.mapping===la;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hg());const l=o?this._cubemapMaterial:this._equirectMaterial,u=this._lodMeshes[0];u.material=l;const f=l.uniforms;f.envMap.value=e;const h=this._cubeSize;ta(t,0,0,3*h,2*h),r.setRenderTarget(t),r.render(u,so)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const o=this._lodMeshes.length;for(let l=1;l<o;l++)this._applyGGXFilter(e,l-1,l);t.autoClear=r}_applyGGXFilter(e,t,r){const o=this._renderer,l=this._pingPongRenderTarget,u=this._ggxMaterial,f=this._lodMeshes[r];f.material=u;const h=u.uniforms,p=r/(this._lodMeshes.length-1),v=t/(this._lodMeshes.length-1),x=Math.sqrt(p*p-v*v),g=0+p*1.25,S=x*g,{_lodMax:M}=this,b=this._sizeLods[r],_=3*b*(r>M-Or?r-M+Or:0),y=4*(this._cubeSize-b);h.envMap.value=e.texture,h.roughness.value=S,h.mipInt.value=M-t,ta(l,_,y,3*b,2*b),o.setRenderTarget(l),o.render(f,so),h.envMap.value=l.texture,h.roughness.value=0,h.mipInt.value=M-r,ta(e,_,y,3*b,2*b),o.setRenderTarget(e),o.render(f,so)}_blur(e,t,r,o,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,t,r,o,"latitudinal",l),this._halfBlur(u,e,r,r,o,"longitudinal",l)}_halfBlur(e,t,r,o,l,u,f){const h=this._renderer,p=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&Et("blur direction must be either latitudinal or longitudinal!");const v=3,x=this._lodMeshes[o];x.material=p;const g=p.uniforms,S=this._sizeLods[r]-1,M=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*ds-1),b=l/M,_=isFinite(l)?1+Math.floor(v*b):ds;_>ds&&nt(`sigmaRadians, ${l}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${ds}`);const y=[];let C=0;for(let z=0;z<ds;++z){const T=z/b,D=Math.exp(-T*T/2);y.push(D),z===0?C+=D:z<_&&(C+=2*D)}for(let z=0;z<y.length;z++)y[z]=y[z]/C;g.envMap.value=e.texture,g.samples.value=_,g.weights.value=y,g.latitudinal.value=u==="latitudinal",f&&(g.poleAxis.value=f);const{_lodMax:L}=this;g.dTheta.value=M,g.mipInt.value=L-r;const P=this._sizeLods[o],k=3*P*(o>L-Or?o-L+Or:0),I=4*(this._cubeSize-P);ta(t,k,I,3*P,2*P),h.setRenderTarget(t),h.render(x,so)}}function FT(s){const e=[],t=[],r=[];let o=s;const l=s-Or+1+Og.length;for(let u=0;u<l;u++){const f=Math.pow(2,o);e.push(f);let h=1/f;u>s-Or?h=Og[u-s+Or-1]:u===0&&(h=0),t.push(h);const p=1/(f-2),v=-p,x=1+p,g=[v,v,x,v,x,x,v,v,x,x,v,x],S=6,M=6,b=3,_=2,y=1,C=new Float32Array(b*M*S),L=new Float32Array(_*M*S),P=new Float32Array(y*M*S);for(let I=0;I<S;I++){const z=I%3*2/3-1,T=I>2?0:-1,D=[z,T,0,z+2/3,T,0,z+2/3,T+1,0,z,T,0,z+2/3,T+1,0,z,T+1,0];C.set(D,b*M*I),L.set(g,_*M*I);const B=[I,I,I,I,I,I];P.set(B,y*M*I)}const k=new Qn;k.setAttribute("position",new wi(C,b)),k.setAttribute("uv",new wi(L,_)),k.setAttribute("faceIndex",new wi(P,y)),r.push(new Jn(k,null)),o>Or&&o--}return{lodMeshes:r,sizeLods:e,sigmas:t}}function zg(s,e,t){const r=new ki(s,e,t);return r.texture.mapping=vc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function ta(s,e,t,r,o){s.viewport.set(e,t,r,o),s.scissor.set(e,t,r,o)}function OT(s,e,t){return new zi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:IT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Sc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:sr,depthTest:!1,depthWrite:!1})}function kT(s,e,t){const r=new Float32Array(ds),o=new $(0,1,0);return new zi({name:"SphericalGaussianBlur",defines:{n:ds,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:Sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:sr,depthTest:!1,depthWrite:!1})}function Hg(){return new zi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:sr,depthTest:!1,depthWrite:!1})}function Vg(){return new zi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:sr,depthTest:!1,depthWrite:!1})}function Sc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Q_ extends ki{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},o=[r,r,r,r,r,r];this.texture=new X_(o),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new rr(5,5,5),l=new zi({name:"CubemapFromEquirect",uniforms:da(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Gn,blending:sr});l.uniforms.tEquirect.value=t;const u=new Jn(o,l),f=t.minFilter;return t.minFilter===fs&&(t.minFilter=An),new HS(1,10,this).update(e,u),t.minFilter=f,u.geometry.dispose(),u.material.dispose(),this}clear(e,t=!0,r=!0,o=!0){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(t,r,o);e.setRenderTarget(l)}}function BT(s){let e=new WeakMap,t=new WeakMap,r=null;function o(g,S=!1){return g==null?null:S?u(g):l(g)}function l(g){if(g&&g.isTexture){const S=g.mapping;if(S===ad||S===od)if(e.has(g)){const M=e.get(g).texture;return f(M,g.mapping)}else{const M=g.image;if(M&&M.height>0){const b=new Q_(M.height);return b.fromEquirectangularTexture(s,g),e.set(g,b),g.addEventListener("dispose",p),f(b.texture,g.mapping)}else return null}}return g}function u(g){if(g&&g.isTexture){const S=g.mapping,M=S===ad||S===od,b=S===ps||S===la;if(M||b){let _=t.get(g);const y=_!==void 0?_.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==y)return r===null&&(r=new Bg(s)),_=M?r.fromEquirectangular(g,_):r.fromCubemap(g,_),_.texture.pmremVersion=g.pmremVersion,t.set(g,_),_.texture;if(_!==void 0)return _.texture;{const C=g.image;return M&&C&&C.height>0||b&&C&&h(C)?(r===null&&(r=new Bg(s)),_=M?r.fromEquirectangular(g):r.fromCubemap(g),_.texture.pmremVersion=g.pmremVersion,t.set(g,_),g.addEventListener("dispose",v),_.texture):null}}}return g}function f(g,S){return S===ad?g.mapping=ps:S===od&&(g.mapping=la),g}function h(g){let S=0;const M=6;for(let b=0;b<M;b++)g[b]!==void 0&&S++;return S===M}function p(g){const S=g.target;S.removeEventListener("dispose",p);const M=e.get(S);M!==void 0&&(e.delete(S),M.dispose())}function v(g){const S=g.target;S.removeEventListener("dispose",v);const M=t.get(S);M!==void 0&&(t.delete(S),M.dispose())}function x(){e=new WeakMap,t=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:o,dispose:x}}function zT(s){const e={};function t(r){if(e[r]!==void 0)return e[r];const o=s.getExtension(r);return e[r]=o,o}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const o=t(r);return o===null&&Ff("WebGLRenderer: "+r+" extension not supported."),o}}}function HT(s,e,t,r){const o={},l=new WeakMap;function u(x){const g=x.target;g.index!==null&&e.remove(g.index);for(const M in g.attributes)e.remove(g.attributes[M]);g.removeEventListener("dispose",u),delete o[g.id];const S=l.get(g);S&&(e.remove(S),l.delete(g)),r.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function f(x,g){return o[g.id]===!0||(g.addEventListener("dispose",u),o[g.id]=!0,t.memory.geometries++),g}function h(x){const g=x.attributes;for(const S in g)e.update(g[S],s.ARRAY_BUFFER)}function p(x){const g=[],S=x.index,M=x.attributes.position;let b=0;if(M===void 0)return;if(S!==null){const C=S.array;b=S.version;for(let L=0,P=C.length;L<P;L+=3){const k=C[L+0],I=C[L+1],z=C[L+2];g.push(k,I,I,z,z,k)}}else{const C=M.array;b=M.version;for(let L=0,P=C.length/3-1;L<P;L+=3){const k=L+0,I=L+1,z=L+2;g.push(k,I,I,z,z,k)}}const _=new(M.count>=65535?G_:V_)(g,1);_.version=b;const y=l.get(x);y&&e.remove(y),l.set(x,_)}function v(x){const g=l.get(x);if(g){const S=x.index;S!==null&&g.version<S.version&&p(x)}else p(x);return l.get(x)}return{get:f,update:h,getWireframeAttribute:v}}function VT(s,e,t){let r;function o(x){r=x}let l,u;function f(x){l=x.type,u=x.bytesPerElement}function h(x,g){s.drawElements(r,g,l,x*u),t.update(g,r,1)}function p(x,g,S){S!==0&&(s.drawElementsInstanced(r,g,l,x*u,S),t.update(g,r,S))}function v(x,g,S){if(S===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,g,0,l,x,0,S);let b=0;for(let _=0;_<S;_++)b+=g[_];t.update(b,r,1)}this.setMode=o,this.setIndex=f,this.render=h,this.renderInstances=p,this.renderMultiDraw=v}function GT(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,u,f){switch(t.calls++,u){case s.TRIANGLES:t.triangles+=f*(l/3);break;case s.LINES:t.lines+=f*(l/2);break;case s.LINE_STRIP:t.lines+=f*(l-1);break;case s.LINE_LOOP:t.lines+=f*l;break;case s.POINTS:t.points+=f*l;break;default:Et("WebGLInfo: Unknown draw mode:",u);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:r}}function WT(s,e,t){const r=new WeakMap,o=new Qt;function l(u,f,h){const p=u.morphTargetInfluences,v=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,x=v!==void 0?v.length:0;let g=r.get(f);if(g===void 0||g.count!==x){let B=function(){T.dispose(),r.delete(f),f.removeEventListener("dispose",B)};var S=B;g!==void 0&&g.texture.dispose();const M=f.morphAttributes.position!==void 0,b=f.morphAttributes.normal!==void 0,_=f.morphAttributes.color!==void 0,y=f.morphAttributes.position||[],C=f.morphAttributes.normal||[],L=f.morphAttributes.color||[];let P=0;M===!0&&(P=1),b===!0&&(P=2),_===!0&&(P=3);let k=f.attributes.position.count*P,I=1;k>e.maxTextureSize&&(I=Math.ceil(k/e.maxTextureSize),k=e.maxTextureSize);const z=new Float32Array(k*I*4*x),T=new z_(z,k,I,x);T.type=Ui,T.needsUpdate=!0;const D=P*4;for(let F=0;F<x;F++){const q=y[F],ae=C[F],de=L[F],j=k*I*4*F;for(let ie=0;ie<q.count;ie++){const Y=ie*D;M===!0&&(o.fromBufferAttribute(q,ie),z[j+Y+0]=o.x,z[j+Y+1]=o.y,z[j+Y+2]=o.z,z[j+Y+3]=0),b===!0&&(o.fromBufferAttribute(ae,ie),z[j+Y+4]=o.x,z[j+Y+5]=o.y,z[j+Y+6]=o.z,z[j+Y+7]=0),_===!0&&(o.fromBufferAttribute(de,ie),z[j+Y+8]=o.x,z[j+Y+9]=o.y,z[j+Y+10]=o.z,z[j+Y+11]=de.itemSize===4?o.w:1)}}g={count:x,texture:T,size:new ut(k,I)},r.set(f,g),f.addEventListener("dispose",B)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",u.morphTexture,t);else{let M=0;for(let _=0;_<p.length;_++)M+=p[_];const b=f.morphTargetsRelative?1:1-M;h.getUniforms().setValue(s,"morphTargetBaseInfluence",b),h.getUniforms().setValue(s,"morphTargetInfluences",p)}h.getUniforms().setValue(s,"morphTargetsTexture",g.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}return{update:l}}function jT(s,e,t,r,o){let l=new WeakMap;function u(p){const v=o.render.frame,x=p.geometry,g=e.get(p,x);if(l.get(g)!==v&&(e.update(g),l.set(g,v)),p.isInstancedMesh&&(p.hasEventListener("dispose",h)===!1&&p.addEventListener("dispose",h),l.get(p)!==v&&(t.update(p.instanceMatrix,s.ARRAY_BUFFER),p.instanceColor!==null&&t.update(p.instanceColor,s.ARRAY_BUFFER),l.set(p,v))),p.isSkinnedMesh){const S=p.skeleton;l.get(S)!==v&&(S.update(),l.set(S,v))}return g}function f(){l=new WeakMap}function h(p){const v=p.target;v.removeEventListener("dispose",h),r.releaseStatesOfObject(v),t.remove(v.instanceMatrix),v.instanceColor!==null&&t.remove(v.instanceColor)}return{update:u,dispose:f}}const XT={[T_]:"LINEAR_TONE_MAPPING",[w_]:"REINHARD_TONE_MAPPING",[b_]:"CINEON_TONE_MAPPING",[A_]:"ACES_FILMIC_TONE_MAPPING",[C_]:"AGX_TONE_MAPPING",[P_]:"NEUTRAL_TONE_MAPPING",[R_]:"CUSTOM_TONE_MAPPING"};function YT(s,e,t,r,o){const l=new ki(e,t,{type:s,depthBuffer:r,stencilBuffer:o,depthTexture:r?new ca(e,t):void 0}),u=new ki(e,t,{type:or,depthBuffer:!1,stencilBuffer:!1}),f=new Qn;f.setAttribute("position",new Wn([-1,3,0,-1,-1,0,3,-1,0],3)),f.setAttribute("uv",new Wn([0,2,0,0,2,0],2));const h=new US({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new Jn(f,h),v=new lh(-1,1,1,-1,0,1);let x=null,g=null,S=!1,M,b=null,_=[],y=!1;this.setSize=function(C,L){l.setSize(C,L),u.setSize(C,L);for(let P=0;P<_.length;P++){const k=_[P];k.setSize&&k.setSize(C,L)}},this.setEffects=function(C){_=C,y=_.length>0&&_[0].isRenderPass===!0;const L=l.width,P=l.height;for(let k=0;k<_.length;k++){const I=_[k];I.setSize&&I.setSize(L,P)}},this.begin=function(C,L){if(S||C.toneMapping===Oi&&_.length===0)return!1;if(b=L,L!==null){const P=L.width,k=L.height;(l.width!==P||l.height!==k)&&this.setSize(P,k)}return y===!1&&C.setRenderTarget(l),M=C.toneMapping,C.toneMapping=Oi,!0},this.hasRenderPass=function(){return y},this.end=function(C,L){C.toneMapping=M,S=!0;let P=l,k=u;for(let I=0;I<_.length;I++){const z=_[I];if(z.enabled!==!1&&(z.render(C,k,P,L),z.needsSwap!==!1)){const T=P;P=k,k=T}}if(x!==C.outputColorSpace||g!==C.toneMapping){x=C.outputColorSpace,g=C.toneMapping,h.defines={},St.getTransfer(x)===Dt&&(h.defines.SRGB_TRANSFER="");const I=XT[g];I&&(h.defines[I]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=P.texture,C.setRenderTarget(b),C.render(p,v),b=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){l.depthTexture&&l.depthTexture.dispose(),l.dispose(),u.dispose(),f.dispose(),h.dispose()}}const e0=new Dn,Bf=new ca(1,1),t0=new z_,n0=new uS,i0=new X_,Gg=[],Wg=[],jg=new Float32Array(16),Xg=new Float32Array(9),Yg=new Float32Array(4);function ma(s,e,t){const r=s[0];if(r<=0||r>0)return s;const o=e*t;let l=Gg[o];if(l===void 0&&(l=new Float32Array(o),Gg[o]=l),e!==0){r.toArray(l,0);for(let u=1,f=0;u!==e;++u)f+=t,s[u].toArray(l,f)}return l}function cn(s,e){if(s.length!==e.length)return!1;for(let t=0,r=s.length;t<r;t++)if(s[t]!==e[t])return!1;return!0}function un(s,e){for(let t=0,r=e.length;t<r;t++)s[t]=e[t]}function Mc(s,e){let t=Wg[e];t===void 0&&(t=new Int32Array(e),Wg[e]=t);for(let r=0;r!==e;++r)t[r]=s.allocateTextureUnit();return t}function qT(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function $T(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;s.uniform2fv(this.addr,e),un(t,e)}}function KT(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(cn(t,e))return;s.uniform3fv(this.addr,e),un(t,e)}}function ZT(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;s.uniform4fv(this.addr,e),un(t,e)}}function JT(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(cn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),un(t,e)}else{if(cn(t,r))return;Yg.set(r),s.uniformMatrix2fv(this.addr,!1,Yg),un(t,r)}}function QT(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(cn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),un(t,e)}else{if(cn(t,r))return;Xg.set(r),s.uniformMatrix3fv(this.addr,!1,Xg),un(t,r)}}function ew(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(cn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),un(t,e)}else{if(cn(t,r))return;jg.set(r),s.uniformMatrix4fv(this.addr,!1,jg),un(t,r)}}function tw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function nw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;s.uniform2iv(this.addr,e),un(t,e)}}function iw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(cn(t,e))return;s.uniform3iv(this.addr,e),un(t,e)}}function rw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;s.uniform4iv(this.addr,e),un(t,e)}}function sw(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function aw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;s.uniform2uiv(this.addr,e),un(t,e)}}function ow(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(cn(t,e))return;s.uniform3uiv(this.addr,e),un(t,e)}}function lw(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;s.uniform4uiv(this.addr,e),un(t,e)}}function cw(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o);let l;this.type===s.SAMPLER_2D_SHADOW?(Bf.compareFunction=t.isReversedDepthBuffer()?ih:nh,l=Bf):l=e0,t.setTexture2D(e||l,o)}function uw(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture3D(e||n0,o)}function dw(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTextureCube(e||i0,o)}function fw(s,e,t){const r=this.cache,o=t.allocateTextureUnit();r[0]!==o&&(s.uniform1i(this.addr,o),r[0]=o),t.setTexture2DArray(e||t0,o)}function hw(s){switch(s){case 5126:return qT;case 35664:return $T;case 35665:return KT;case 35666:return ZT;case 35674:return JT;case 35675:return QT;case 35676:return ew;case 5124:case 35670:return tw;case 35667:case 35671:return nw;case 35668:case 35672:return iw;case 35669:case 35673:return rw;case 5125:return sw;case 36294:return aw;case 36295:return ow;case 36296:return lw;case 35678:case 36198:case 36298:case 36306:case 35682:return cw;case 35679:case 36299:case 36307:return uw;case 35680:case 36300:case 36308:case 36293:return dw;case 36289:case 36303:case 36311:case 36292:return fw}}function pw(s,e){s.uniform1fv(this.addr,e)}function mw(s,e){const t=ma(e,this.size,2);s.uniform2fv(this.addr,t)}function gw(s,e){const t=ma(e,this.size,3);s.uniform3fv(this.addr,t)}function _w(s,e){const t=ma(e,this.size,4);s.uniform4fv(this.addr,t)}function vw(s,e){const t=ma(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function xw(s,e){const t=ma(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function yw(s,e){const t=ma(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Sw(s,e){s.uniform1iv(this.addr,e)}function Mw(s,e){s.uniform2iv(this.addr,e)}function Ew(s,e){s.uniform3iv(this.addr,e)}function Tw(s,e){s.uniform4iv(this.addr,e)}function ww(s,e){s.uniform1uiv(this.addr,e)}function bw(s,e){s.uniform2uiv(this.addr,e)}function Aw(s,e){s.uniform3uiv(this.addr,e)}function Rw(s,e){s.uniform4uiv(this.addr,e)}function Cw(s,e,t){const r=this.cache,o=e.length,l=Mc(t,o);cn(r,l)||(s.uniform1iv(this.addr,l),un(r,l));let u;this.type===s.SAMPLER_2D_SHADOW?u=Bf:u=e0;for(let f=0;f!==o;++f)t.setTexture2D(e[f]||u,l[f])}function Pw(s,e,t){const r=this.cache,o=e.length,l=Mc(t,o);cn(r,l)||(s.uniform1iv(this.addr,l),un(r,l));for(let u=0;u!==o;++u)t.setTexture3D(e[u]||n0,l[u])}function Lw(s,e,t){const r=this.cache,o=e.length,l=Mc(t,o);cn(r,l)||(s.uniform1iv(this.addr,l),un(r,l));for(let u=0;u!==o;++u)t.setTextureCube(e[u]||i0,l[u])}function Dw(s,e,t){const r=this.cache,o=e.length,l=Mc(t,o);cn(r,l)||(s.uniform1iv(this.addr,l),un(r,l));for(let u=0;u!==o;++u)t.setTexture2DArray(e[u]||t0,l[u])}function Nw(s){switch(s){case 5126:return pw;case 35664:return mw;case 35665:return gw;case 35666:return _w;case 35674:return vw;case 35675:return xw;case 35676:return yw;case 5124:case 35670:return Sw;case 35667:case 35671:return Mw;case 35668:case 35672:return Ew;case 35669:case 35673:return Tw;case 5125:return ww;case 36294:return bw;case 36295:return Aw;case 36296:return Rw;case 35678:case 36198:case 36298:case 36306:case 35682:return Cw;case 35679:case 36299:case 36307:return Pw;case 35680:case 36300:case 36308:case 36293:return Lw;case 36289:case 36303:case 36311:case 36292:return Dw}}class Iw{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=hw(t.type)}}class Uw{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Nw(t.type)}}class Fw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const o=this.seq;for(let l=0,u=o.length;l!==u;++l){const f=o[l];f.setValue(e,t[f.id],r)}}}const Bd=/(\w+)(\])?(\[|\.)?/g;function qg(s,e){s.seq.push(e),s.map[e.id]=e}function Ow(s,e,t){const r=s.name,o=r.length;for(Bd.lastIndex=0;;){const l=Bd.exec(r),u=Bd.lastIndex;let f=l[1];const h=l[2]==="]",p=l[3];if(h&&(f=f|0),p===void 0||p==="["&&u+2===o){qg(t,p===void 0?new Iw(f,s,e):new Uw(f,s,e));break}else{let x=t.map[f];x===void 0&&(x=new Fw(f),qg(t,x)),t=x}}}class ic{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let u=0;u<r;++u){const f=e.getActiveUniform(t,u),h=e.getUniformLocation(t,f.name);Ow(f,h,this)}const o=[],l=[];for(const u of this.seq)u.type===e.SAMPLER_2D_SHADOW||u.type===e.SAMPLER_CUBE_SHADOW||u.type===e.SAMPLER_2D_ARRAY_SHADOW?o.push(u):l.push(u);o.length>0&&(this.seq=o.concat(l))}setValue(e,t,r,o){const l=this.map[t];l!==void 0&&l.setValue(e,r,o)}setOptional(e,t,r){const o=t[r];o!==void 0&&this.setValue(e,r,o)}static upload(e,t,r,o){for(let l=0,u=t.length;l!==u;++l){const f=t[l],h=r[f.id];h.needsUpdate!==!1&&f.setValue(e,h.value,o)}}static seqWithValue(e,t){const r=[];for(let o=0,l=e.length;o!==l;++o){const u=e[o];u.id in t&&r.push(u)}return r}}function $g(s,e,t){const r=s.createShader(e);return s.shaderSource(r,t),s.compileShader(r),r}const kw=37297;let Bw=0;function zw(s,e){const t=s.split(`
`),r=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let u=o;u<l;u++){const f=u+1;r.push(`${f===e?">":" "} ${f}: ${t[u]}`)}return r.join(`
`)}const Kg=new ct;function Hw(s){St._getMatrix(Kg,St.workingColorSpace,s);const e=`mat3( ${Kg.elements.map(t=>t.toFixed(4))} )`;switch(St.getTransfer(s)){case cc:return[e,"LinearTransferOETF"];case Dt:return[e,"sRGBTransferOETF"];default:return nt("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Zg(s,e,t){const r=s.getShaderParameter(e,s.COMPILE_STATUS),l=(s.getShaderInfoLog(e)||"").trim();if(r&&l==="")return"";const u=/ERROR: 0:(\d+)/.exec(l);if(u){const f=parseInt(u[1]);return t.toUpperCase()+`

`+l+`

`+zw(s.getShaderSource(e),f)}else return l}function Vw(s,e){const t=Hw(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Gw={[T_]:"Linear",[w_]:"Reinhard",[b_]:"Cineon",[A_]:"ACESFilmic",[C_]:"AgX",[P_]:"Neutral",[R_]:"Custom"};function Ww(s,e){const t=Gw[e];return t===void 0?(nt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Kl=new $;function jw(){St.getLuminanceCoefficients(Kl);const s=Kl.x.toFixed(4),e=Kl.y.toFixed(4),t=Kl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Xw(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lo).join(`
`)}function Yw(s){const e=[];for(const t in s){const r=s[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function qw(s,e){const t={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let o=0;o<r;o++){const l=s.getActiveAttrib(e,o),u=l.name;let f=1;l.type===s.FLOAT_MAT2&&(f=2),l.type===s.FLOAT_MAT3&&(f=3),l.type===s.FLOAT_MAT4&&(f=4),t[u]={type:l.type,location:s.getAttribLocation(e,u),locationSize:f}}return t}function lo(s){return s!==""}function Jg(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qg(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $w=/^[ \t]*#include +<([\w\d./]+)>/gm;function zf(s){return s.replace($w,Zw)}const Kw=new Map;function Zw(s,e){let t=pt[e];if(t===void 0){const r=Kw.get(e);if(r!==void 0)t=pt[r],nt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return zf(t)}const Jw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function e_(s){return s.replace(Jw,Qw)}function Qw(s,e,t,r){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function t_(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const e1={[Jl]:"SHADOWMAP_TYPE_PCF",[oo]:"SHADOWMAP_TYPE_VSM"};function t1(s){return e1[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const n1={[ps]:"ENVMAP_TYPE_CUBE",[la]:"ENVMAP_TYPE_CUBE",[vc]:"ENVMAP_TYPE_CUBE_UV"};function i1(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":n1[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const r1={[la]:"ENVMAP_MODE_REFRACTION"};function s1(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":r1[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const a1={[$f]:"ENVMAP_BLENDING_MULTIPLY",[Vy]:"ENVMAP_BLENDING_MIX",[Gy]:"ENVMAP_BLENDING_ADD"};function o1(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":a1[s.combine]||"ENVMAP_BLENDING_NONE"}function l1(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:r,maxMip:t}}function c1(s,e,t,r){const o=s.getContext(),l=t.defines;let u=t.vertexShader,f=t.fragmentShader;const h=t1(t),p=i1(t),v=s1(t),x=o1(t),g=l1(t),S=Xw(t),M=Yw(l),b=o.createProgram();let _,y,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(lo).join(`
`),_.length>0&&(_+=`
`),y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(lo).join(`
`),y.length>0&&(y+=`
`)):(_=[t_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+v:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lo).join(`
`),y=[t_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.envMap?"#define "+v:"",t.envMap?"#define "+x:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Oi?"#define TONE_MAPPING":"",t.toneMapping!==Oi?pt.tonemapping_pars_fragment:"",t.toneMapping!==Oi?Ww("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,Vw("linearToOutputTexel",t.outputColorSpace),jw(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(lo).join(`
`)),u=zf(u),u=Jg(u,t),u=Qg(u,t),f=zf(f),f=Jg(f,t),f=Qg(f,t),u=e_(u),f=e_(f),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,_=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,y=["#define varying in",t.glslVersion===rg?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const L=C+_+u,P=C+y+f,k=$g(o,o.VERTEX_SHADER,L),I=$g(o,o.FRAGMENT_SHADER,P);o.attachShader(b,k),o.attachShader(b,I),t.index0AttributeName!==void 0?o.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(b,0,"position"),o.linkProgram(b);function z(F){if(s.debug.checkShaderErrors){const q=o.getProgramInfoLog(b)||"",ae=o.getShaderInfoLog(k)||"",de=o.getShaderInfoLog(I)||"",j=q.trim(),ie=ae.trim(),Y=de.trim();let K=!0,ce=!0;if(o.getProgramParameter(b,o.LINK_STATUS)===!1)if(K=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(o,b,k,I);else{const le=Zg(o,k,"vertex"),O=Zg(o,I,"fragment");Et("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(b,o.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+j+`
`+le+`
`+O)}else j!==""?nt("WebGLProgram: Program Info Log:",j):(ie===""||Y==="")&&(ce=!1);ce&&(F.diagnostics={runnable:K,programLog:j,vertexShader:{log:ie,prefix:_},fragmentShader:{log:Y,prefix:y}})}o.deleteShader(k),o.deleteShader(I),T=new ic(o,b),D=qw(o,b)}let T;this.getUniforms=function(){return T===void 0&&z(this),T};let D;this.getAttributes=function(){return D===void 0&&z(this),D};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=o.getProgramParameter(b,kw)),B},this.destroy=function(){r.releaseStatesOfProgram(this),o.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Bw++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=k,this.fragmentShader=I,this}let u1=0;class d1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,o=this._getShaderStage(t),l=this._getShaderStage(r),u=this._getShaderCacheForMaterial(e);return u.has(o)===!1&&(u.add(o),o.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new f1(e),t.set(e,r)),r}}class f1{constructor(e){this.id=u1++,this.code=e,this.usedTimes=0}}function h1(s){return s===ms||s===ac||s===oc}function p1(s,e,t,r,o,l){const u=new sh,f=new d1,h=new Set,p=[],v=new Map,x=r.logarithmicDepthBuffer;let g=r.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(T){return h.add(T),T===0?"uv":`uv${T}`}function b(T,D,B,F,q,ae){const de=F.fog,j=q.geometry,ie=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?F.environment:null,Y=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,K=e.get(T.envMap||ie,Y),ce=K&&K.mapping===vc?K.image.height:null,le=S[T.type];T.precision!==null&&(g=r.getMaxPrecision(T.precision),g!==T.precision&&nt("WebGLProgram.getParameters:",T.precision,"not supported, using",g,"instead."));const O=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ee=O!==void 0?O.length:0;let Oe=0;j.morphAttributes.position!==void 0&&(Oe=1),j.morphAttributes.normal!==void 0&&(Oe=2),j.morphAttributes.color!==void 0&&(Oe=3);let Ge,Ie,oe,Se;if(le){const at=Ii[le];Ge=at.vertexShader,Ie=at.fragmentShader}else Ge=T.vertexShader,Ie=T.fragmentShader,f.update(T),oe=f.getVertexShaderID(T),Se=f.getFragmentShaderID(T);const me=s.getRenderTarget(),Ue=s.state.buffers.depth.getReversed(),Je=q.isInstancedMesh===!0,Qe=q.isBatchedMesh===!0,Ft=!!T.map,dt=!!T.matcap,wt=!!K,Nt=!!T.aoMap,ft=!!T.lightMap,Yt=!!T.bumpMap,Ot=!!T.normalMap,mn=!!T.displacementMap,G=!!T.emissiveMap,kt=!!T.metalnessMap,ht=!!T.roughnessMap,Ct=T.anisotropy>0,De=T.clearcoat>0,Ht=T.dispersion>0,N=T.iridescence>0,E=T.sheen>0,Z=T.transmission>0,he=Ct&&!!T.anisotropyMap,_e=De&&!!T.clearcoatMap,Ee=De&&!!T.clearcoatNormalMap,Le=De&&!!T.clearcoatRoughnessMap,ue=N&&!!T.iridescenceMap,pe=N&&!!T.iridescenceThicknessMap,Fe=E&&!!T.sheenColorMap,Be=E&&!!T.sheenRoughnessMap,Ae=!!T.specularMap,Te=!!T.specularColorMap,it=!!T.specularIntensityMap,st=Z&&!!T.transmissionMap,mt=Z&&!!T.thicknessMap,V=!!T.gradientMap,be=!!T.alphaMap,fe=T.alphaTest>0,ke=!!T.alphaHash,Ce=!!T.extensions;let ve=Oi;T.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(ve=s.toneMapping);const Xe={shaderID:le,shaderType:T.type,shaderName:T.name,vertexShader:Ge,fragmentShader:Ie,defines:T.defines,customVertexShaderID:oe,customFragmentShaderID:Se,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:g,batching:Qe,batchingColor:Qe&&q._colorsTexture!==null,instancing:Je,instancingColor:Je&&q.instanceColor!==null,instancingMorph:Je&&q.morphTexture!==null,outputColorSpace:me===null?s.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:St.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:Ft,matcap:dt,envMap:wt,envMapMode:wt&&K.mapping,envMapCubeUVHeight:ce,aoMap:Nt,lightMap:ft,bumpMap:Yt,normalMap:Ot,displacementMap:mn,emissiveMap:G,normalMapObjectSpace:Ot&&T.normalMapType===Xy,normalMapTangentSpace:Ot&&T.normalMapType===Uf,packedNormalMap:Ot&&T.normalMapType===Uf&&h1(T.normalMap.format),metalnessMap:kt,roughnessMap:ht,anisotropy:Ct,anisotropyMap:he,clearcoat:De,clearcoatMap:_e,clearcoatNormalMap:Ee,clearcoatRoughnessMap:Le,dispersion:Ht,iridescence:N,iridescenceMap:ue,iridescenceThicknessMap:pe,sheen:E,sheenColorMap:Fe,sheenRoughnessMap:Be,specularMap:Ae,specularColorMap:Te,specularIntensityMap:it,transmission:Z,transmissionMap:st,thicknessMap:mt,gradientMap:V,opaque:T.transparent===!1&&T.blending===ia&&T.alphaToCoverage===!1,alphaMap:be,alphaTest:fe,alphaHash:ke,combine:T.combine,mapUv:Ft&&M(T.map.channel),aoMapUv:Nt&&M(T.aoMap.channel),lightMapUv:ft&&M(T.lightMap.channel),bumpMapUv:Yt&&M(T.bumpMap.channel),normalMapUv:Ot&&M(T.normalMap.channel),displacementMapUv:mn&&M(T.displacementMap.channel),emissiveMapUv:G&&M(T.emissiveMap.channel),metalnessMapUv:kt&&M(T.metalnessMap.channel),roughnessMapUv:ht&&M(T.roughnessMap.channel),anisotropyMapUv:he&&M(T.anisotropyMap.channel),clearcoatMapUv:_e&&M(T.clearcoatMap.channel),clearcoatNormalMapUv:Ee&&M(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Le&&M(T.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&M(T.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&M(T.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&M(T.sheenColorMap.channel),sheenRoughnessMapUv:Be&&M(T.sheenRoughnessMap.channel),specularMapUv:Ae&&M(T.specularMap.channel),specularColorMapUv:Te&&M(T.specularColorMap.channel),specularIntensityMapUv:it&&M(T.specularIntensityMap.channel),transmissionMapUv:st&&M(T.transmissionMap.channel),thicknessMapUv:mt&&M(T.thicknessMap.channel),alphaMapUv:be&&M(T.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Ot||Ct),vertexNormals:!!j.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!j.attributes.uv&&(Ft||be),fog:!!de,useFog:T.fog===!0,fogExp2:!!de&&de.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||j.attributes.normal===void 0&&Ot===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:x,reversedDepthBuffer:Ue,skinning:q.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:Oe,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numLightProbeGrids:ae.length,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:T.dithering,shadowMapEnabled:s.shadowMap.enabled&&B.length>0,shadowMapType:s.shadowMap.type,toneMapping:ve,decodeVideoTexture:Ft&&T.map.isVideoTexture===!0&&St.getTransfer(T.map.colorSpace)===Dt,decodeVideoTextureEmissive:G&&T.emissiveMap.isVideoTexture===!0&&St.getTransfer(T.emissiveMap.colorSpace)===Dt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Ei,flipSided:T.side===Gn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Ce&&T.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ce&&T.extensions.multiDraw===!0||Qe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Xe.vertexUv1s=h.has(1),Xe.vertexUv2s=h.has(2),Xe.vertexUv3s=h.has(3),h.clear(),Xe}function _(T){const D=[];if(T.shaderID?D.push(T.shaderID):(D.push(T.customVertexShaderID),D.push(T.customFragmentShaderID)),T.defines!==void 0)for(const B in T.defines)D.push(B),D.push(T.defines[B]);return T.isRawShaderMaterial===!1&&(y(D,T),C(D,T),D.push(s.outputColorSpace)),D.push(T.customProgramCacheKey),D.join()}function y(T,D){T.push(D.precision),T.push(D.outputColorSpace),T.push(D.envMapMode),T.push(D.envMapCubeUVHeight),T.push(D.mapUv),T.push(D.alphaMapUv),T.push(D.lightMapUv),T.push(D.aoMapUv),T.push(D.bumpMapUv),T.push(D.normalMapUv),T.push(D.displacementMapUv),T.push(D.emissiveMapUv),T.push(D.metalnessMapUv),T.push(D.roughnessMapUv),T.push(D.anisotropyMapUv),T.push(D.clearcoatMapUv),T.push(D.clearcoatNormalMapUv),T.push(D.clearcoatRoughnessMapUv),T.push(D.iridescenceMapUv),T.push(D.iridescenceThicknessMapUv),T.push(D.sheenColorMapUv),T.push(D.sheenRoughnessMapUv),T.push(D.specularMapUv),T.push(D.specularColorMapUv),T.push(D.specularIntensityMapUv),T.push(D.transmissionMapUv),T.push(D.thicknessMapUv),T.push(D.combine),T.push(D.fogExp2),T.push(D.sizeAttenuation),T.push(D.morphTargetsCount),T.push(D.morphAttributeCount),T.push(D.numDirLights),T.push(D.numPointLights),T.push(D.numSpotLights),T.push(D.numSpotLightMaps),T.push(D.numHemiLights),T.push(D.numRectAreaLights),T.push(D.numDirLightShadows),T.push(D.numPointLightShadows),T.push(D.numSpotLightShadows),T.push(D.numSpotLightShadowsWithMaps),T.push(D.numLightProbes),T.push(D.shadowMapType),T.push(D.toneMapping),T.push(D.numClippingPlanes),T.push(D.numClipIntersection),T.push(D.depthPacking)}function C(T,D){u.disableAll(),D.instancing&&u.enable(0),D.instancingColor&&u.enable(1),D.instancingMorph&&u.enable(2),D.matcap&&u.enable(3),D.envMap&&u.enable(4),D.normalMapObjectSpace&&u.enable(5),D.normalMapTangentSpace&&u.enable(6),D.clearcoat&&u.enable(7),D.iridescence&&u.enable(8),D.alphaTest&&u.enable(9),D.vertexColors&&u.enable(10),D.vertexAlphas&&u.enable(11),D.vertexUv1s&&u.enable(12),D.vertexUv2s&&u.enable(13),D.vertexUv3s&&u.enable(14),D.vertexTangents&&u.enable(15),D.anisotropy&&u.enable(16),D.alphaHash&&u.enable(17),D.batching&&u.enable(18),D.dispersion&&u.enable(19),D.batchingColor&&u.enable(20),D.gradientMap&&u.enable(21),D.packedNormalMap&&u.enable(22),D.vertexNormals&&u.enable(23),T.push(u.mask),u.disableAll(),D.fog&&u.enable(0),D.useFog&&u.enable(1),D.flatShading&&u.enable(2),D.logarithmicDepthBuffer&&u.enable(3),D.reversedDepthBuffer&&u.enable(4),D.skinning&&u.enable(5),D.morphTargets&&u.enable(6),D.morphNormals&&u.enable(7),D.morphColors&&u.enable(8),D.premultipliedAlpha&&u.enable(9),D.shadowMapEnabled&&u.enable(10),D.doubleSided&&u.enable(11),D.flipSided&&u.enable(12),D.useDepthPacking&&u.enable(13),D.dithering&&u.enable(14),D.transmission&&u.enable(15),D.sheen&&u.enable(16),D.opaque&&u.enable(17),D.pointsUvs&&u.enable(18),D.decodeVideoTexture&&u.enable(19),D.decodeVideoTextureEmissive&&u.enable(20),D.alphaToCoverage&&u.enable(21),D.numLightProbeGrids>0&&u.enable(22),T.push(u.mask)}function L(T){const D=S[T.type];let B;if(D){const F=Ii[D];B=DS.clone(F.uniforms)}else B=T.uniforms;return B}function P(T,D){let B=v.get(D);return B!==void 0?++B.usedTimes:(B=new c1(s,D,T,o),p.push(B),v.set(D,B)),B}function k(T){if(--T.usedTimes===0){const D=p.indexOf(T);p[D]=p[p.length-1],p.pop(),v.delete(T.cacheKey),T.destroy()}}function I(T){f.remove(T)}function z(){f.dispose()}return{getParameters:b,getProgramCacheKey:_,getUniforms:L,acquireProgram:P,releaseProgram:k,releaseShaderCache:I,programs:p,dispose:z}}function m1(){let s=new WeakMap;function e(u){return s.has(u)}function t(u){let f=s.get(u);return f===void 0&&(f={},s.set(u,f)),f}function r(u){s.delete(u)}function o(u,f,h){s.get(u)[f]=h}function l(){s=new WeakMap}return{has:e,get:t,remove:r,update:o,dispose:l}}function g1(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function n_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function i_(){const s=[];let e=0;const t=[],r=[],o=[];function l(){e=0,t.length=0,r.length=0,o.length=0}function u(g){let S=0;return g.isInstancedMesh&&(S+=2),g.isSkinnedMesh&&(S+=1),S}function f(g,S,M,b,_,y){let C=s[e];return C===void 0?(C={id:g.id,object:g,geometry:S,material:M,materialVariant:u(g),groupOrder:b,renderOrder:g.renderOrder,z:_,group:y},s[e]=C):(C.id=g.id,C.object=g,C.geometry=S,C.material=M,C.materialVariant=u(g),C.groupOrder=b,C.renderOrder=g.renderOrder,C.z=_,C.group=y),e++,C}function h(g,S,M,b,_,y){const C=f(g,S,M,b,_,y);M.transmission>0?r.push(C):M.transparent===!0?o.push(C):t.push(C)}function p(g,S,M,b,_,y){const C=f(g,S,M,b,_,y);M.transmission>0?r.unshift(C):M.transparent===!0?o.unshift(C):t.unshift(C)}function v(g,S){t.length>1&&t.sort(g||g1),r.length>1&&r.sort(S||n_),o.length>1&&o.sort(S||n_)}function x(){for(let g=e,S=s.length;g<S;g++){const M=s[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:t,transmissive:r,transparent:o,init:l,push:h,unshift:p,finish:x,sort:v}}function _1(){let s=new WeakMap;function e(r,o){const l=s.get(r);let u;return l===void 0?(u=new i_,s.set(r,[u])):o>=l.length?(u=new i_,l.push(u)):u=l[o],u}function t(){s=new WeakMap}return{get:e,dispose:t}}function v1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new $,color:new yt};break;case"SpotLight":t={position:new $,direction:new $,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new $,color:new yt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new $,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":t={color:new yt,position:new $,halfWidth:new $,halfHeight:new $};break}return s[e.id]=t,t}}}function x1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let y1=0;function S1(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function M1(s){const e=new v1,t=x1(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new $);const o=new $,l=new Zt,u=new Zt;function f(p){let v=0,x=0,g=0;for(let D=0;D<9;D++)r.probe[D].set(0,0,0);let S=0,M=0,b=0,_=0,y=0,C=0,L=0,P=0,k=0,I=0,z=0;p.sort(S1);for(let D=0,B=p.length;D<B;D++){const F=p[D],q=F.color,ae=F.intensity,de=F.distance;let j=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===ms?j=F.shadow.map.texture:j=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)v+=q.r*ae,x+=q.g*ae,g+=q.b*ae;else if(F.isLightProbe){for(let ie=0;ie<9;ie++)r.probe[ie].addScaledVector(F.sh.coefficients[ie],ae);z++}else if(F.isDirectionalLight){const ie=e.get(F);if(ie.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const Y=F.shadow,K=t.get(F);K.shadowIntensity=Y.intensity,K.shadowBias=Y.bias,K.shadowNormalBias=Y.normalBias,K.shadowRadius=Y.radius,K.shadowMapSize=Y.mapSize,r.directionalShadow[S]=K,r.directionalShadowMap[S]=j,r.directionalShadowMatrix[S]=F.shadow.matrix,C++}r.directional[S]=ie,S++}else if(F.isSpotLight){const ie=e.get(F);ie.position.setFromMatrixPosition(F.matrixWorld),ie.color.copy(q).multiplyScalar(ae),ie.distance=de,ie.coneCos=Math.cos(F.angle),ie.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),ie.decay=F.decay,r.spot[b]=ie;const Y=F.shadow;if(F.map&&(r.spotLightMap[k]=F.map,k++,Y.updateMatrices(F),F.castShadow&&I++),r.spotLightMatrix[b]=Y.matrix,F.castShadow){const K=t.get(F);K.shadowIntensity=Y.intensity,K.shadowBias=Y.bias,K.shadowNormalBias=Y.normalBias,K.shadowRadius=Y.radius,K.shadowMapSize=Y.mapSize,r.spotShadow[b]=K,r.spotShadowMap[b]=j,P++}b++}else if(F.isRectAreaLight){const ie=e.get(F);ie.color.copy(q).multiplyScalar(ae),ie.halfWidth.set(F.width*.5,0,0),ie.halfHeight.set(0,F.height*.5,0),r.rectArea[_]=ie,_++}else if(F.isPointLight){const ie=e.get(F);if(ie.color.copy(F.color).multiplyScalar(F.intensity),ie.distance=F.distance,ie.decay=F.decay,F.castShadow){const Y=F.shadow,K=t.get(F);K.shadowIntensity=Y.intensity,K.shadowBias=Y.bias,K.shadowNormalBias=Y.normalBias,K.shadowRadius=Y.radius,K.shadowMapSize=Y.mapSize,K.shadowCameraNear=Y.camera.near,K.shadowCameraFar=Y.camera.far,r.pointShadow[M]=K,r.pointShadowMap[M]=j,r.pointShadowMatrix[M]=F.shadow.matrix,L++}r.point[M]=ie,M++}else if(F.isHemisphereLight){const ie=e.get(F);ie.skyColor.copy(F.color).multiplyScalar(ae),ie.groundColor.copy(F.groundColor).multiplyScalar(ae),r.hemi[y]=ie,y++}}_>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ne.LTC_FLOAT_1,r.rectAreaLTC2=Ne.LTC_FLOAT_2):(r.rectAreaLTC1=Ne.LTC_HALF_1,r.rectAreaLTC2=Ne.LTC_HALF_2)),r.ambient[0]=v,r.ambient[1]=x,r.ambient[2]=g;const T=r.hash;(T.directionalLength!==S||T.pointLength!==M||T.spotLength!==b||T.rectAreaLength!==_||T.hemiLength!==y||T.numDirectionalShadows!==C||T.numPointShadows!==L||T.numSpotShadows!==P||T.numSpotMaps!==k||T.numLightProbes!==z)&&(r.directional.length=S,r.spot.length=b,r.rectArea.length=_,r.point.length=M,r.hemi.length=y,r.directionalShadow.length=C,r.directionalShadowMap.length=C,r.pointShadow.length=L,r.pointShadowMap.length=L,r.spotShadow.length=P,r.spotShadowMap.length=P,r.directionalShadowMatrix.length=C,r.pointShadowMatrix.length=L,r.spotLightMatrix.length=P+k-I,r.spotLightMap.length=k,r.numSpotLightShadowsWithMaps=I,r.numLightProbes=z,T.directionalLength=S,T.pointLength=M,T.spotLength=b,T.rectAreaLength=_,T.hemiLength=y,T.numDirectionalShadows=C,T.numPointShadows=L,T.numSpotShadows=P,T.numSpotMaps=k,T.numLightProbes=z,r.version=y1++)}function h(p,v){let x=0,g=0,S=0,M=0,b=0;const _=v.matrixWorldInverse;for(let y=0,C=p.length;y<C;y++){const L=p[y];if(L.isDirectionalLight){const P=r.directional[x];P.direction.setFromMatrixPosition(L.matrixWorld),o.setFromMatrixPosition(L.target.matrixWorld),P.direction.sub(o),P.direction.transformDirection(_),x++}else if(L.isSpotLight){const P=r.spot[S];P.position.setFromMatrixPosition(L.matrixWorld),P.position.applyMatrix4(_),P.direction.setFromMatrixPosition(L.matrixWorld),o.setFromMatrixPosition(L.target.matrixWorld),P.direction.sub(o),P.direction.transformDirection(_),S++}else if(L.isRectAreaLight){const P=r.rectArea[M];P.position.setFromMatrixPosition(L.matrixWorld),P.position.applyMatrix4(_),u.identity(),l.copy(L.matrixWorld),l.premultiply(_),u.extractRotation(l),P.halfWidth.set(L.width*.5,0,0),P.halfHeight.set(0,L.height*.5,0),P.halfWidth.applyMatrix4(u),P.halfHeight.applyMatrix4(u),M++}else if(L.isPointLight){const P=r.point[g];P.position.setFromMatrixPosition(L.matrixWorld),P.position.applyMatrix4(_),g++}else if(L.isHemisphereLight){const P=r.hemi[b];P.direction.setFromMatrixPosition(L.matrixWorld),P.direction.transformDirection(_),b++}}}return{setup:f,setupView:h,state:r}}function r_(s){const e=new M1(s),t=[],r=[],o=[];function l(g){x.camera=g,t.length=0,r.length=0,o.length=0}function u(g){t.push(g)}function f(g){r.push(g)}function h(g){o.push(g)}function p(){e.setup(t)}function v(g){e.setupView(t,g)}const x={lightsArray:t,shadowsArray:r,lightProbeGridArray:o,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:l,state:x,setupLights:p,setupLightsView:v,pushLight:u,pushShadow:f,pushLightProbeGrid:h}}function E1(s){let e=new WeakMap;function t(o,l=0){const u=e.get(o);let f;return u===void 0?(f=new r_(s),e.set(o,[f])):l>=u.length?(f=new r_(s),u.push(f)):f=u[l],f}function r(){e=new WeakMap}return{get:t,dispose:r}}const T1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,w1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,b1=[new $(1,0,0),new $(-1,0,0),new $(0,1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1)],A1=[new $(0,-1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1),new $(0,-1,0),new $(0,-1,0)],s_=new Zt,ao=new $,zd=new $;function R1(s,e,t){let r=new oh;const o=new ut,l=new ut,u=new Qt,f=new FS,h=new OS,p={},v=t.maxTextureSize,x={[zr]:Gn,[Gn]:zr,[Ei]:Ei},g=new zi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:T1,fragmentShader:w1}),S=g.clone();S.defines.HORIZONTAL_PASS=1;const M=new Qn;M.setAttribute("position",new wi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Jn(M,g),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jl;let y=this.type;this.render=function(I,z,T){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||I.length===0)return;this.type===E_&&(nt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Jl);const D=s.getRenderTarget(),B=s.getActiveCubeFace(),F=s.getActiveMipmapLevel(),q=s.state;q.setBlending(sr),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const ae=y!==this.type;ae&&z.traverse(function(de){de.material&&(Array.isArray(de.material)?de.material.forEach(j=>j.needsUpdate=!0):de.material.needsUpdate=!0)});for(let de=0,j=I.length;de<j;de++){const ie=I[de],Y=ie.shadow;if(Y===void 0){nt("WebGLShadowMap:",ie,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;o.copy(Y.mapSize);const K=Y.getFrameExtents();o.multiply(K),l.copy(Y.mapSize),(o.x>v||o.y>v)&&(o.x>v&&(l.x=Math.floor(v/K.x),o.x=l.x*K.x,Y.mapSize.x=l.x),o.y>v&&(l.y=Math.floor(v/K.y),o.y=l.y*K.y,Y.mapSize.y=l.y));const ce=s.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=ce,Y.map===null||ae===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===oo){if(ie.isPointLight){nt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new ki(o.x,o.y,{format:ms,type:or,minFilter:An,magFilter:An,generateMipmaps:!1}),Y.map.texture.name=ie.name+".shadowMap",Y.map.depthTexture=new ca(o.x,o.y,Ui),Y.map.depthTexture.name=ie.name+".shadowMapDepth",Y.map.depthTexture.format=lr,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=xn,Y.map.depthTexture.magFilter=xn}else ie.isPointLight?(Y.map=new Q_(o.x),Y.map.depthTexture=new CS(o.x,Bi)):(Y.map=new ki(o.x,o.y),Y.map.depthTexture=new ca(o.x,o.y,Bi)),Y.map.depthTexture.name=ie.name+".shadowMap",Y.map.depthTexture.format=lr,this.type===Jl?(Y.map.depthTexture.compareFunction=ce?ih:nh,Y.map.depthTexture.minFilter=An,Y.map.depthTexture.magFilter=An):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=xn,Y.map.depthTexture.magFilter=xn);Y.camera.updateProjectionMatrix()}const le=Y.map.isWebGLCubeRenderTarget?6:1;for(let O=0;O<le;O++){if(Y.map.isWebGLCubeRenderTarget)s.setRenderTarget(Y.map,O),s.clear();else{O===0&&(s.setRenderTarget(Y.map),s.clear());const ee=Y.getViewport(O);u.set(l.x*ee.x,l.y*ee.y,l.x*ee.z,l.y*ee.w),q.viewport(u)}if(ie.isPointLight){const ee=Y.camera,Oe=Y.matrix,Ge=ie.distance||ee.far;Ge!==ee.far&&(ee.far=Ge,ee.updateProjectionMatrix()),ao.setFromMatrixPosition(ie.matrixWorld),ee.position.copy(ao),zd.copy(ee.position),zd.add(b1[O]),ee.up.copy(A1[O]),ee.lookAt(zd),ee.updateMatrixWorld(),Oe.makeTranslation(-ao.x,-ao.y,-ao.z),s_.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(s_,ee.coordinateSystem,ee.reversedDepth)}else Y.updateMatrices(ie);r=Y.getFrustum(),P(z,T,Y.camera,ie,this.type)}Y.isPointLightShadow!==!0&&this.type===oo&&C(Y,T),Y.needsUpdate=!1}y=this.type,_.needsUpdate=!1,s.setRenderTarget(D,B,F)};function C(I,z){const T=e.update(b);g.defines.VSM_SAMPLES!==I.blurSamples&&(g.defines.VSM_SAMPLES=I.blurSamples,S.defines.VSM_SAMPLES=I.blurSamples,g.needsUpdate=!0,S.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new ki(o.x,o.y,{format:ms,type:or})),g.uniforms.shadow_pass.value=I.map.depthTexture,g.uniforms.resolution.value=I.mapSize,g.uniforms.radius.value=I.radius,s.setRenderTarget(I.mapPass),s.clear(),s.renderBufferDirect(z,null,T,g,b,null),S.uniforms.shadow_pass.value=I.mapPass.texture,S.uniforms.resolution.value=I.mapSize,S.uniforms.radius.value=I.radius,s.setRenderTarget(I.map),s.clear(),s.renderBufferDirect(z,null,T,S,b,null)}function L(I,z,T,D){let B=null;const F=T.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(F!==void 0)B=F;else if(B=T.isPointLight===!0?h:f,s.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0||z.alphaToCoverage===!0){const q=B.uuid,ae=z.uuid;let de=p[q];de===void 0&&(de={},p[q]=de);let j=de[ae];j===void 0&&(j=B.clone(),de[ae]=j,z.addEventListener("dispose",k)),B=j}if(B.visible=z.visible,B.wireframe=z.wireframe,D===oo?B.side=z.shadowSide!==null?z.shadowSide:z.side:B.side=z.shadowSide!==null?z.shadowSide:x[z.side],B.alphaMap=z.alphaMap,B.alphaTest=z.alphaToCoverage===!0?.5:z.alphaTest,B.map=z.map,B.clipShadows=z.clipShadows,B.clippingPlanes=z.clippingPlanes,B.clipIntersection=z.clipIntersection,B.displacementMap=z.displacementMap,B.displacementScale=z.displacementScale,B.displacementBias=z.displacementBias,B.wireframeLinewidth=z.wireframeLinewidth,B.linewidth=z.linewidth,T.isPointLight===!0&&B.isMeshDistanceMaterial===!0){const q=s.properties.get(B);q.light=T}return B}function P(I,z,T,D,B){if(I.visible===!1)return;if(I.layers.test(z.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&B===oo)&&(!I.frustumCulled||r.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,I.matrixWorld);const ae=e.update(I),de=I.material;if(Array.isArray(de)){const j=ae.groups;for(let ie=0,Y=j.length;ie<Y;ie++){const K=j[ie],ce=de[K.materialIndex];if(ce&&ce.visible){const le=L(I,ce,D,B);I.onBeforeShadow(s,I,z,T,ae,le,K),s.renderBufferDirect(T,null,ae,le,I,K),I.onAfterShadow(s,I,z,T,ae,le,K)}}}else if(de.visible){const j=L(I,de,D,B);I.onBeforeShadow(s,I,z,T,ae,j,null),s.renderBufferDirect(T,null,ae,j,I,null),I.onAfterShadow(s,I,z,T,ae,j,null)}}const q=I.children;for(let ae=0,de=q.length;ae<de;ae++)P(q[ae],z,T,D,B)}function k(I){I.target.removeEventListener("dispose",k);for(const T in p){const D=p[T],B=I.target.uuid;B in D&&(D[B].dispose(),delete D[B])}}}function C1(s,e){function t(){let V=!1;const be=new Qt;let fe=null;const ke=new Qt(0,0,0,0);return{setMask:function(Ce){fe!==Ce&&!V&&(s.colorMask(Ce,Ce,Ce,Ce),fe=Ce)},setLocked:function(Ce){V=Ce},setClear:function(Ce,ve,Xe,at,Ut){Ut===!0&&(Ce*=at,ve*=at,Xe*=at),be.set(Ce,ve,Xe,at),ke.equals(be)===!1&&(s.clearColor(Ce,ve,Xe,at),ke.copy(be))},reset:function(){V=!1,fe=null,ke.set(-1,0,0,0)}}}function r(){let V=!1,be=!1,fe=null,ke=null,Ce=null;return{setReversed:function(ve){if(be!==ve){const Xe=e.get("EXT_clip_control");ve?Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.ZERO_TO_ONE_EXT):Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.NEGATIVE_ONE_TO_ONE_EXT),be=ve;const at=Ce;Ce=null,this.setClear(at)}},getReversed:function(){return be},setTest:function(ve){ve?me(s.DEPTH_TEST):Ue(s.DEPTH_TEST)},setMask:function(ve){fe!==ve&&!V&&(s.depthMask(ve),fe=ve)},setFunc:function(ve){if(be&&(ve=nS[ve]),ke!==ve){switch(ve){case $d:s.depthFunc(s.NEVER);break;case Kd:s.depthFunc(s.ALWAYS);break;case Zd:s.depthFunc(s.LESS);break;case oa:s.depthFunc(s.LEQUAL);break;case Jd:s.depthFunc(s.EQUAL);break;case Qd:s.depthFunc(s.GEQUAL);break;case ef:s.depthFunc(s.GREATER);break;case tf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ke=ve}},setLocked:function(ve){V=ve},setClear:function(ve){Ce!==ve&&(Ce=ve,be&&(ve=1-ve),s.clearDepth(ve))},reset:function(){V=!1,fe=null,ke=null,Ce=null,be=!1}}}function o(){let V=!1,be=null,fe=null,ke=null,Ce=null,ve=null,Xe=null,at=null,Ut=null;return{setTest:function(bt){V||(bt?me(s.STENCIL_TEST):Ue(s.STENCIL_TEST))},setMask:function(bt){be!==bt&&!V&&(s.stencilMask(bt),be=bt)},setFunc:function(bt,Rn,ei){(fe!==bt||ke!==Rn||Ce!==ei)&&(s.stencilFunc(bt,Rn,ei),fe=bt,ke=Rn,Ce=ei)},setOp:function(bt,Rn,ei){(ve!==bt||Xe!==Rn||at!==ei)&&(s.stencilOp(bt,Rn,ei),ve=bt,Xe=Rn,at=ei)},setLocked:function(bt){V=bt},setClear:function(bt){Ut!==bt&&(s.clearStencil(bt),Ut=bt)},reset:function(){V=!1,be=null,fe=null,ke=null,Ce=null,ve=null,Xe=null,at=null,Ut=null}}}const l=new t,u=new r,f=new o,h=new WeakMap,p=new WeakMap;let v={},x={},g={},S=new WeakMap,M=[],b=null,_=!1,y=null,C=null,L=null,P=null,k=null,I=null,z=null,T=new yt(0,0,0),D=0,B=!1,F=null,q=null,ae=null,de=null,j=null;const ie=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,K=0;const ce=s.getParameter(s.VERSION);ce.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(ce)[1]),Y=K>=1):ce.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(ce)[1]),Y=K>=2);let le=null,O={};const ee=s.getParameter(s.SCISSOR_BOX),Oe=s.getParameter(s.VIEWPORT),Ge=new Qt().fromArray(ee),Ie=new Qt().fromArray(Oe);function oe(V,be,fe,ke){const Ce=new Uint8Array(4),ve=s.createTexture();s.bindTexture(V,ve),s.texParameteri(V,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(V,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Xe=0;Xe<fe;Xe++)V===s.TEXTURE_3D||V===s.TEXTURE_2D_ARRAY?s.texImage3D(be,0,s.RGBA,1,1,ke,0,s.RGBA,s.UNSIGNED_BYTE,Ce):s.texImage2D(be+Xe,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ce);return ve}const Se={};Se[s.TEXTURE_2D]=oe(s.TEXTURE_2D,s.TEXTURE_2D,1),Se[s.TEXTURE_CUBE_MAP]=oe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[s.TEXTURE_2D_ARRAY]=oe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Se[s.TEXTURE_3D]=oe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),u.setClear(1),f.setClear(0),me(s.DEPTH_TEST),u.setFunc(oa),Yt(!1),Ot(Jm),me(s.CULL_FACE),Nt(sr);function me(V){v[V]!==!0&&(s.enable(V),v[V]=!0)}function Ue(V){v[V]!==!1&&(s.disable(V),v[V]=!1)}function Je(V,be){return g[V]!==be?(s.bindFramebuffer(V,be),g[V]=be,V===s.DRAW_FRAMEBUFFER&&(g[s.FRAMEBUFFER]=be),V===s.FRAMEBUFFER&&(g[s.DRAW_FRAMEBUFFER]=be),!0):!1}function Qe(V,be){let fe=M,ke=!1;if(V){fe=S.get(be),fe===void 0&&(fe=[],S.set(be,fe));const Ce=V.textures;if(fe.length!==Ce.length||fe[0]!==s.COLOR_ATTACHMENT0){for(let ve=0,Xe=Ce.length;ve<Xe;ve++)fe[ve]=s.COLOR_ATTACHMENT0+ve;fe.length=Ce.length,ke=!0}}else fe[0]!==s.BACK&&(fe[0]=s.BACK,ke=!0);ke&&s.drawBuffers(fe)}function Ft(V){return b!==V?(s.useProgram(V),b=V,!0):!1}const dt={[us]:s.FUNC_ADD,[wy]:s.FUNC_SUBTRACT,[by]:s.FUNC_REVERSE_SUBTRACT};dt[Ay]=s.MIN,dt[Ry]=s.MAX;const wt={[Cy]:s.ZERO,[Py]:s.ONE,[Ly]:s.SRC_COLOR,[Yd]:s.SRC_ALPHA,[Oy]:s.SRC_ALPHA_SATURATE,[Uy]:s.DST_COLOR,[Ny]:s.DST_ALPHA,[Dy]:s.ONE_MINUS_SRC_COLOR,[qd]:s.ONE_MINUS_SRC_ALPHA,[Fy]:s.ONE_MINUS_DST_COLOR,[Iy]:s.ONE_MINUS_DST_ALPHA,[ky]:s.CONSTANT_COLOR,[By]:s.ONE_MINUS_CONSTANT_COLOR,[zy]:s.CONSTANT_ALPHA,[Hy]:s.ONE_MINUS_CONSTANT_ALPHA};function Nt(V,be,fe,ke,Ce,ve,Xe,at,Ut,bt){if(V===sr){_===!0&&(Ue(s.BLEND),_=!1);return}if(_===!1&&(me(s.BLEND),_=!0),V!==Ty){if(V!==y||bt!==B){if((C!==us||k!==us)&&(s.blendEquation(s.FUNC_ADD),C=us,k=us),bt)switch(V){case ia:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qm:s.blendFunc(s.ONE,s.ONE);break;case eg:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case tg:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Et("WebGLState: Invalid blending: ",V);break}else switch(V){case ia:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qm:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case eg:Et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case tg:Et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Et("WebGLState: Invalid blending: ",V);break}L=null,P=null,I=null,z=null,T.set(0,0,0),D=0,y=V,B=bt}return}Ce=Ce||be,ve=ve||fe,Xe=Xe||ke,(be!==C||Ce!==k)&&(s.blendEquationSeparate(dt[be],dt[Ce]),C=be,k=Ce),(fe!==L||ke!==P||ve!==I||Xe!==z)&&(s.blendFuncSeparate(wt[fe],wt[ke],wt[ve],wt[Xe]),L=fe,P=ke,I=ve,z=Xe),(at.equals(T)===!1||Ut!==D)&&(s.blendColor(at.r,at.g,at.b,Ut),T.copy(at),D=Ut),y=V,B=!1}function ft(V,be){V.side===Ei?Ue(s.CULL_FACE):me(s.CULL_FACE);let fe=V.side===Gn;be&&(fe=!fe),Yt(fe),V.blending===ia&&V.transparent===!1?Nt(sr):Nt(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),u.setFunc(V.depthFunc),u.setTest(V.depthTest),u.setMask(V.depthWrite),l.setMask(V.colorWrite);const ke=V.stencilWrite;f.setTest(ke),ke&&(f.setMask(V.stencilWriteMask),f.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),f.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),G(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?me(s.SAMPLE_ALPHA_TO_COVERAGE):Ue(s.SAMPLE_ALPHA_TO_COVERAGE)}function Yt(V){F!==V&&(V?s.frontFace(s.CW):s.frontFace(s.CCW),F=V)}function Ot(V){V!==My?(me(s.CULL_FACE),V!==q&&(V===Jm?s.cullFace(s.BACK):V===Ey?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ue(s.CULL_FACE),q=V}function mn(V){V!==ae&&(Y&&s.lineWidth(V),ae=V)}function G(V,be,fe){V?(me(s.POLYGON_OFFSET_FILL),(de!==be||j!==fe)&&(de=be,j=fe,u.getReversed()&&(be=-be),s.polygonOffset(be,fe))):Ue(s.POLYGON_OFFSET_FILL)}function kt(V){V?me(s.SCISSOR_TEST):Ue(s.SCISSOR_TEST)}function ht(V){V===void 0&&(V=s.TEXTURE0+ie-1),le!==V&&(s.activeTexture(V),le=V)}function Ct(V,be,fe){fe===void 0&&(le===null?fe=s.TEXTURE0+ie-1:fe=le);let ke=O[fe];ke===void 0&&(ke={type:void 0,texture:void 0},O[fe]=ke),(ke.type!==V||ke.texture!==be)&&(le!==fe&&(s.activeTexture(fe),le=fe),s.bindTexture(V,be||Se[V]),ke.type=V,ke.texture=be)}function De(){const V=O[le];V!==void 0&&V.type!==void 0&&(s.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function Ht(){try{s.compressedTexImage2D(...arguments)}catch(V){Et("WebGLState:",V)}}function N(){try{s.compressedTexImage3D(...arguments)}catch(V){Et("WebGLState:",V)}}function E(){try{s.texSubImage2D(...arguments)}catch(V){Et("WebGLState:",V)}}function Z(){try{s.texSubImage3D(...arguments)}catch(V){Et("WebGLState:",V)}}function he(){try{s.compressedTexSubImage2D(...arguments)}catch(V){Et("WebGLState:",V)}}function _e(){try{s.compressedTexSubImage3D(...arguments)}catch(V){Et("WebGLState:",V)}}function Ee(){try{s.texStorage2D(...arguments)}catch(V){Et("WebGLState:",V)}}function Le(){try{s.texStorage3D(...arguments)}catch(V){Et("WebGLState:",V)}}function ue(){try{s.texImage2D(...arguments)}catch(V){Et("WebGLState:",V)}}function pe(){try{s.texImage3D(...arguments)}catch(V){Et("WebGLState:",V)}}function Fe(V){return x[V]!==void 0?x[V]:s.getParameter(V)}function Be(V,be){x[V]!==be&&(s.pixelStorei(V,be),x[V]=be)}function Ae(V){Ge.equals(V)===!1&&(s.scissor(V.x,V.y,V.z,V.w),Ge.copy(V))}function Te(V){Ie.equals(V)===!1&&(s.viewport(V.x,V.y,V.z,V.w),Ie.copy(V))}function it(V,be){let fe=p.get(be);fe===void 0&&(fe=new WeakMap,p.set(be,fe));let ke=fe.get(V);ke===void 0&&(ke=s.getUniformBlockIndex(be,V.name),fe.set(V,ke))}function st(V,be){const ke=p.get(be).get(V);h.get(be)!==ke&&(s.uniformBlockBinding(be,ke,V.__bindingPointIndex),h.set(be,ke))}function mt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),u.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),v={},x={},le=null,O={},g={},S=new WeakMap,M=[],b=null,_=!1,y=null,C=null,L=null,P=null,k=null,I=null,z=null,T=new yt(0,0,0),D=0,B=!1,F=null,q=null,ae=null,de=null,j=null,Ge.set(0,0,s.canvas.width,s.canvas.height),Ie.set(0,0,s.canvas.width,s.canvas.height),l.reset(),u.reset(),f.reset()}return{buffers:{color:l,depth:u,stencil:f},enable:me,disable:Ue,bindFramebuffer:Je,drawBuffers:Qe,useProgram:Ft,setBlending:Nt,setMaterial:ft,setFlipSided:Yt,setCullFace:Ot,setLineWidth:mn,setPolygonOffset:G,setScissorTest:kt,activeTexture:ht,bindTexture:Ct,unbindTexture:De,compressedTexImage2D:Ht,compressedTexImage3D:N,texImage2D:ue,texImage3D:pe,pixelStorei:Be,getParameter:Fe,updateUBOMapping:it,uniformBlockBinding:st,texStorage2D:Ee,texStorage3D:Le,texSubImage2D:E,texSubImage3D:Z,compressedTexSubImage2D:he,compressedTexSubImage3D:_e,scissor:Ae,viewport:Te,reset:mt}}function P1(s,e,t,r,o,l,u){const f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new ut,v=new WeakMap,x=new Set;let g;const S=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(N,E){return M?new OffscreenCanvas(N,E):uc("canvas")}function _(N,E,Z){let he=1;const _e=Ht(N);if((_e.width>Z||_e.height>Z)&&(he=Z/Math.max(_e.width,_e.height)),he<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const Ee=Math.floor(he*_e.width),Le=Math.floor(he*_e.height);g===void 0&&(g=b(Ee,Le));const ue=E?b(Ee,Le):g;return ue.width=Ee,ue.height=Le,ue.getContext("2d").drawImage(N,0,0,Ee,Le),nt("WebGLRenderer: Texture has been resized from ("+_e.width+"x"+_e.height+") to ("+Ee+"x"+Le+")."),ue}else return"data"in N&&nt("WebGLRenderer: Image in DataTexture is too big ("+_e.width+"x"+_e.height+")."),N;return N}function y(N){return N.generateMipmaps}function C(N){s.generateMipmap(N)}function L(N){return N.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?s.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function P(N,E,Z,he,_e,Ee=!1){if(N!==null){if(s[N]!==void 0)return s[N];nt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let Le;he&&(Le=e.get("EXT_texture_norm16"),Le||nt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ue=E;if(E===s.RED&&(Z===s.FLOAT&&(ue=s.R32F),Z===s.HALF_FLOAT&&(ue=s.R16F),Z===s.UNSIGNED_BYTE&&(ue=s.R8),Z===s.UNSIGNED_SHORT&&Le&&(ue=Le.R16_EXT),Z===s.SHORT&&Le&&(ue=Le.R16_SNORM_EXT)),E===s.RED_INTEGER&&(Z===s.UNSIGNED_BYTE&&(ue=s.R8UI),Z===s.UNSIGNED_SHORT&&(ue=s.R16UI),Z===s.UNSIGNED_INT&&(ue=s.R32UI),Z===s.BYTE&&(ue=s.R8I),Z===s.SHORT&&(ue=s.R16I),Z===s.INT&&(ue=s.R32I)),E===s.RG&&(Z===s.FLOAT&&(ue=s.RG32F),Z===s.HALF_FLOAT&&(ue=s.RG16F),Z===s.UNSIGNED_BYTE&&(ue=s.RG8),Z===s.UNSIGNED_SHORT&&Le&&(ue=Le.RG16_EXT),Z===s.SHORT&&Le&&(ue=Le.RG16_SNORM_EXT)),E===s.RG_INTEGER&&(Z===s.UNSIGNED_BYTE&&(ue=s.RG8UI),Z===s.UNSIGNED_SHORT&&(ue=s.RG16UI),Z===s.UNSIGNED_INT&&(ue=s.RG32UI),Z===s.BYTE&&(ue=s.RG8I),Z===s.SHORT&&(ue=s.RG16I),Z===s.INT&&(ue=s.RG32I)),E===s.RGB_INTEGER&&(Z===s.UNSIGNED_BYTE&&(ue=s.RGB8UI),Z===s.UNSIGNED_SHORT&&(ue=s.RGB16UI),Z===s.UNSIGNED_INT&&(ue=s.RGB32UI),Z===s.BYTE&&(ue=s.RGB8I),Z===s.SHORT&&(ue=s.RGB16I),Z===s.INT&&(ue=s.RGB32I)),E===s.RGBA_INTEGER&&(Z===s.UNSIGNED_BYTE&&(ue=s.RGBA8UI),Z===s.UNSIGNED_SHORT&&(ue=s.RGBA16UI),Z===s.UNSIGNED_INT&&(ue=s.RGBA32UI),Z===s.BYTE&&(ue=s.RGBA8I),Z===s.SHORT&&(ue=s.RGBA16I),Z===s.INT&&(ue=s.RGBA32I)),E===s.RGB&&(Z===s.UNSIGNED_SHORT&&Le&&(ue=Le.RGB16_EXT),Z===s.SHORT&&Le&&(ue=Le.RGB16_SNORM_EXT),Z===s.UNSIGNED_INT_5_9_9_9_REV&&(ue=s.RGB9_E5),Z===s.UNSIGNED_INT_10F_11F_11F_REV&&(ue=s.R11F_G11F_B10F)),E===s.RGBA){const pe=Ee?cc:St.getTransfer(_e);Z===s.FLOAT&&(ue=s.RGBA32F),Z===s.HALF_FLOAT&&(ue=s.RGBA16F),Z===s.UNSIGNED_BYTE&&(ue=pe===Dt?s.SRGB8_ALPHA8:s.RGBA8),Z===s.UNSIGNED_SHORT&&Le&&(ue=Le.RGBA16_EXT),Z===s.SHORT&&Le&&(ue=Le.RGBA16_SNORM_EXT),Z===s.UNSIGNED_SHORT_4_4_4_4&&(ue=s.RGBA4),Z===s.UNSIGNED_SHORT_5_5_5_1&&(ue=s.RGB5_A1)}return(ue===s.R16F||ue===s.R32F||ue===s.RG16F||ue===s.RG32F||ue===s.RGBA16F||ue===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function k(N,E){let Z;return N?E===null||E===Bi||E===po?Z=s.DEPTH24_STENCIL8:E===Ui?Z=s.DEPTH32F_STENCIL8:E===ho&&(Z=s.DEPTH24_STENCIL8,nt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Bi||E===po?Z=s.DEPTH_COMPONENT24:E===Ui?Z=s.DEPTH_COMPONENT32F:E===ho&&(Z=s.DEPTH_COMPONENT16),Z}function I(N,E){return y(N)===!0||N.isFramebufferTexture&&N.minFilter!==xn&&N.minFilter!==An?Math.log2(Math.max(E.width,E.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?E.mipmaps.length:1}function z(N){const E=N.target;E.removeEventListener("dispose",z),D(E),E.isVideoTexture&&v.delete(E),E.isHTMLTexture&&x.delete(E)}function T(N){const E=N.target;E.removeEventListener("dispose",T),F(E)}function D(N){const E=r.get(N);if(E.__webglInit===void 0)return;const Z=N.source,he=S.get(Z);if(he){const _e=he[E.__cacheKey];_e.usedTimes--,_e.usedTimes===0&&B(N),Object.keys(he).length===0&&S.delete(Z)}r.remove(N)}function B(N){const E=r.get(N);s.deleteTexture(E.__webglTexture);const Z=N.source,he=S.get(Z);delete he[E.__cacheKey],u.memory.textures--}function F(N){const E=r.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),r.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let he=0;he<6;he++){if(Array.isArray(E.__webglFramebuffer[he]))for(let _e=0;_e<E.__webglFramebuffer[he].length;_e++)s.deleteFramebuffer(E.__webglFramebuffer[he][_e]);else s.deleteFramebuffer(E.__webglFramebuffer[he]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[he])}else{if(Array.isArray(E.__webglFramebuffer))for(let he=0;he<E.__webglFramebuffer.length;he++)s.deleteFramebuffer(E.__webglFramebuffer[he]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let he=0;he<E.__webglColorRenderbuffer.length;he++)E.__webglColorRenderbuffer[he]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[he]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const Z=N.textures;for(let he=0,_e=Z.length;he<_e;he++){const Ee=r.get(Z[he]);Ee.__webglTexture&&(s.deleteTexture(Ee.__webglTexture),u.memory.textures--),r.remove(Z[he])}r.remove(N)}let q=0;function ae(){q=0}function de(){return q}function j(N){q=N}function ie(){const N=q;return N>=o.maxTextures&&nt("WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+o.maxTextures),q+=1,N}function Y(N){const E=[];return E.push(N.wrapS),E.push(N.wrapT),E.push(N.wrapR||0),E.push(N.magFilter),E.push(N.minFilter),E.push(N.anisotropy),E.push(N.internalFormat),E.push(N.format),E.push(N.type),E.push(N.generateMipmaps),E.push(N.premultiplyAlpha),E.push(N.flipY),E.push(N.unpackAlignment),E.push(N.colorSpace),E.join()}function K(N,E){const Z=r.get(N);if(N.isVideoTexture&&Ct(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&Z.__version!==N.version){const he=N.image;if(he===null)nt("WebGLRenderer: Texture marked for update but no image data found.");else if(he.complete===!1)nt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ue(Z,N,E);return}}else N.isExternalTexture&&(Z.__webglTexture=N.sourceTexture?N.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,Z.__webglTexture,s.TEXTURE0+E)}function ce(N,E){const Z=r.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Z.__version!==N.version){Ue(Z,N,E);return}else N.isExternalTexture&&(Z.__webglTexture=N.sourceTexture?N.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,Z.__webglTexture,s.TEXTURE0+E)}function le(N,E){const Z=r.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Z.__version!==N.version){Ue(Z,N,E);return}t.bindTexture(s.TEXTURE_3D,Z.__webglTexture,s.TEXTURE0+E)}function O(N,E){const Z=r.get(N);if(N.isCubeDepthTexture!==!0&&N.version>0&&Z.__version!==N.version){Je(Z,N,E);return}t.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture,s.TEXTURE0+E)}const ee={[nf]:s.REPEAT,[ir]:s.CLAMP_TO_EDGE,[rf]:s.MIRRORED_REPEAT},Oe={[xn]:s.NEAREST,[Wy]:s.NEAREST_MIPMAP_NEAREST,[El]:s.NEAREST_MIPMAP_LINEAR,[An]:s.LINEAR,[ld]:s.LINEAR_MIPMAP_NEAREST,[fs]:s.LINEAR_MIPMAP_LINEAR},Ge={[Yy]:s.NEVER,[Jy]:s.ALWAYS,[qy]:s.LESS,[nh]:s.LEQUAL,[$y]:s.EQUAL,[ih]:s.GEQUAL,[Ky]:s.GREATER,[Zy]:s.NOTEQUAL};function Ie(N,E){if(E.type===Ui&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===An||E.magFilter===ld||E.magFilter===El||E.magFilter===fs||E.minFilter===An||E.minFilter===ld||E.minFilter===El||E.minFilter===fs)&&nt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(N,s.TEXTURE_WRAP_S,ee[E.wrapS]),s.texParameteri(N,s.TEXTURE_WRAP_T,ee[E.wrapT]),(N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY)&&s.texParameteri(N,s.TEXTURE_WRAP_R,ee[E.wrapR]),s.texParameteri(N,s.TEXTURE_MAG_FILTER,Oe[E.magFilter]),s.texParameteri(N,s.TEXTURE_MIN_FILTER,Oe[E.minFilter]),E.compareFunction&&(s.texParameteri(N,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(N,s.TEXTURE_COMPARE_FUNC,Ge[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===xn||E.minFilter!==El&&E.minFilter!==fs||E.type===Ui&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||r.get(E).__currentAnisotropy){const Z=e.get("EXT_texture_filter_anisotropic");s.texParameterf(N,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,o.getMaxAnisotropy())),r.get(E).__currentAnisotropy=E.anisotropy}}}function oe(N,E){let Z=!1;N.__webglInit===void 0&&(N.__webglInit=!0,E.addEventListener("dispose",z));const he=E.source;let _e=S.get(he);_e===void 0&&(_e={},S.set(he,_e));const Ee=Y(E);if(Ee!==N.__cacheKey){_e[Ee]===void 0&&(_e[Ee]={texture:s.createTexture(),usedTimes:0},u.memory.textures++,Z=!0),_e[Ee].usedTimes++;const Le=_e[N.__cacheKey];Le!==void 0&&(_e[N.__cacheKey].usedTimes--,Le.usedTimes===0&&B(E)),N.__cacheKey=Ee,N.__webglTexture=_e[Ee].texture}return Z}function Se(N,E,Z){return Math.floor(Math.floor(N/Z)/E)}function me(N,E,Z,he){const Ee=N.updateRanges;if(Ee.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,E.width,E.height,Z,he,E.data);else{Ee.sort((Be,Ae)=>Be.start-Ae.start);let Le=0;for(let Be=1;Be<Ee.length;Be++){const Ae=Ee[Le],Te=Ee[Be],it=Ae.start+Ae.count,st=Se(Te.start,E.width,4),mt=Se(Ae.start,E.width,4);Te.start<=it+1&&st===mt&&Se(Te.start+Te.count-1,E.width,4)===st?Ae.count=Math.max(Ae.count,Te.start+Te.count-Ae.start):(++Le,Ee[Le]=Te)}Ee.length=Le+1;const ue=t.getParameter(s.UNPACK_ROW_LENGTH),pe=t.getParameter(s.UNPACK_SKIP_PIXELS),Fe=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,E.width);for(let Be=0,Ae=Ee.length;Be<Ae;Be++){const Te=Ee[Be],it=Math.floor(Te.start/4),st=Math.ceil(Te.count/4),mt=it%E.width,V=Math.floor(it/E.width),be=st,fe=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,mt),t.pixelStorei(s.UNPACK_SKIP_ROWS,V),t.texSubImage2D(s.TEXTURE_2D,0,mt,V,be,fe,Z,he,E.data)}N.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,ue),t.pixelStorei(s.UNPACK_SKIP_PIXELS,pe),t.pixelStorei(s.UNPACK_SKIP_ROWS,Fe)}}function Ue(N,E,Z){let he=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(he=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(he=s.TEXTURE_3D);const _e=oe(N,E),Ee=E.source;t.bindTexture(he,N.__webglTexture,s.TEXTURE0+Z);const Le=r.get(Ee);if(Ee.version!==Le.__version||_e===!0){if(t.activeTexture(s.TEXTURE0+Z),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const fe=St.getPrimaries(St.workingColorSpace),ke=E.colorSpace===Ur?null:St.getPrimaries(E.colorSpace),Ce=E.colorSpace===Ur||fe===ke?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce)}t.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment);let pe=_(E.image,!1,o.maxTextureSize);pe=De(E,pe);const Fe=l.convert(E.format,E.colorSpace),Be=l.convert(E.type);let Ae=P(E.internalFormat,Fe,Be,E.normalized,E.colorSpace,E.isVideoTexture);Ie(he,E);let Te;const it=E.mipmaps,st=E.isVideoTexture!==!0,mt=Le.__version===void 0||_e===!0,V=Ee.dataReady,be=I(E,pe);if(E.isDepthTexture)Ae=k(E.format===hs,E.type),mt&&(st?t.texStorage2D(s.TEXTURE_2D,1,Ae,pe.width,pe.height):t.texImage2D(s.TEXTURE_2D,0,Ae,pe.width,pe.height,0,Fe,Be,null));else if(E.isDataTexture)if(it.length>0){st&&mt&&t.texStorage2D(s.TEXTURE_2D,be,Ae,it[0].width,it[0].height);for(let fe=0,ke=it.length;fe<ke;fe++)Te=it[fe],st?V&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,Te.width,Te.height,Fe,Be,Te.data):t.texImage2D(s.TEXTURE_2D,fe,Ae,Te.width,Te.height,0,Fe,Be,Te.data);E.generateMipmaps=!1}else st?(mt&&t.texStorage2D(s.TEXTURE_2D,be,Ae,pe.width,pe.height),V&&me(E,pe,Fe,Be)):t.texImage2D(s.TEXTURE_2D,0,Ae,pe.width,pe.height,0,Fe,Be,pe.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){st&&mt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,be,Ae,it[0].width,it[0].height,pe.depth);for(let fe=0,ke=it.length;fe<ke;fe++)if(Te=it[fe],E.format!==Ti)if(Fe!==null)if(st){if(V)if(E.layerUpdates.size>0){const Ce=Fg(Te.width,Te.height,E.format,E.type);for(const ve of E.layerUpdates){const Xe=Te.data.subarray(ve*Ce/Te.data.BYTES_PER_ELEMENT,(ve+1)*Ce/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,ve,Te.width,Te.height,1,Fe,Xe)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,0,Te.width,Te.height,pe.depth,Fe,Te.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,fe,Ae,Te.width,Te.height,pe.depth,0,Te.data,0,0);else nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else st?V&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,0,Te.width,Te.height,pe.depth,Fe,Be,Te.data):t.texImage3D(s.TEXTURE_2D_ARRAY,fe,Ae,Te.width,Te.height,pe.depth,0,Fe,Be,Te.data)}else{st&&mt&&t.texStorage2D(s.TEXTURE_2D,be,Ae,it[0].width,it[0].height);for(let fe=0,ke=it.length;fe<ke;fe++)Te=it[fe],E.format!==Ti?Fe!==null?st?V&&t.compressedTexSubImage2D(s.TEXTURE_2D,fe,0,0,Te.width,Te.height,Fe,Te.data):t.compressedTexImage2D(s.TEXTURE_2D,fe,Ae,Te.width,Te.height,0,Te.data):nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):st?V&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,Te.width,Te.height,Fe,Be,Te.data):t.texImage2D(s.TEXTURE_2D,fe,Ae,Te.width,Te.height,0,Fe,Be,Te.data)}else if(E.isDataArrayTexture)if(st){if(mt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,be,Ae,pe.width,pe.height,pe.depth),V)if(E.layerUpdates.size>0){const fe=Fg(pe.width,pe.height,E.format,E.type);for(const ke of E.layerUpdates){const Ce=pe.data.subarray(ke*fe/pe.data.BYTES_PER_ELEMENT,(ke+1)*fe/pe.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ke,pe.width,pe.height,1,Fe,Be,Ce)}E.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,Fe,Be,pe.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ae,pe.width,pe.height,pe.depth,0,Fe,Be,pe.data);else if(E.isData3DTexture)st?(mt&&t.texStorage3D(s.TEXTURE_3D,be,Ae,pe.width,pe.height,pe.depth),V&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,Fe,Be,pe.data)):t.texImage3D(s.TEXTURE_3D,0,Ae,pe.width,pe.height,pe.depth,0,Fe,Be,pe.data);else if(E.isFramebufferTexture){if(mt)if(st)t.texStorage2D(s.TEXTURE_2D,be,Ae,pe.width,pe.height);else{let fe=pe.width,ke=pe.height;for(let Ce=0;Ce<be;Ce++)t.texImage2D(s.TEXTURE_2D,Ce,Ae,fe,ke,0,Fe,Be,null),fe>>=1,ke>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in s){const fe=s.canvas;if(fe.hasAttribute("layoutsubtree")||fe.setAttribute("layoutsubtree","true"),pe.parentNode!==fe){fe.appendChild(pe),x.add(E),fe.onpaint=at=>{const Ut=at.changedElements;for(const bt of x)Ut.includes(bt.image)&&(bt.needsUpdate=!0)},fe.requestPaint();return}const ke=0,Ce=s.RGBA,ve=s.RGBA,Xe=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,ke,Ce,ve,Xe,pe),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(it.length>0){if(st&&mt){const fe=Ht(it[0]);t.texStorage2D(s.TEXTURE_2D,be,Ae,fe.width,fe.height)}for(let fe=0,ke=it.length;fe<ke;fe++)Te=it[fe],st?V&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,Fe,Be,Te):t.texImage2D(s.TEXTURE_2D,fe,Ae,Fe,Be,Te);E.generateMipmaps=!1}else if(st){if(mt){const fe=Ht(pe);t.texStorage2D(s.TEXTURE_2D,be,Ae,fe.width,fe.height)}V&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Fe,Be,pe)}else t.texImage2D(s.TEXTURE_2D,0,Ae,Fe,Be,pe);y(E)&&C(he),Le.__version=Ee.version,E.onUpdate&&E.onUpdate(E)}N.__version=E.version}function Je(N,E,Z){if(E.image.length!==6)return;const he=oe(N,E),_e=E.source;t.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+Z);const Ee=r.get(_e);if(_e.version!==Ee.__version||he===!0){t.activeTexture(s.TEXTURE0+Z);const Le=St.getPrimaries(St.workingColorSpace),ue=E.colorSpace===Ur?null:St.getPrimaries(E.colorSpace),pe=E.colorSpace===Ur||Le===ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Fe=E.isCompressedTexture||E.image[0].isCompressedTexture,Be=E.image[0]&&E.image[0].isDataTexture,Ae=[];for(let ve=0;ve<6;ve++)!Fe&&!Be?Ae[ve]=_(E.image[ve],!0,o.maxCubemapSize):Ae[ve]=Be?E.image[ve].image:E.image[ve],Ae[ve]=De(E,Ae[ve]);const Te=Ae[0],it=l.convert(E.format,E.colorSpace),st=l.convert(E.type),mt=P(E.internalFormat,it,st,E.normalized,E.colorSpace),V=E.isVideoTexture!==!0,be=Ee.__version===void 0||he===!0,fe=_e.dataReady;let ke=I(E,Te);Ie(s.TEXTURE_CUBE_MAP,E);let Ce;if(Fe){V&&be&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ke,mt,Te.width,Te.height);for(let ve=0;ve<6;ve++){Ce=Ae[ve].mipmaps;for(let Xe=0;Xe<Ce.length;Xe++){const at=Ce[Xe];E.format!==Ti?it!==null?V?fe&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Xe,0,0,at.width,at.height,it,at.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Xe,mt,at.width,at.height,0,at.data):nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Xe,0,0,at.width,at.height,it,st,at.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Xe,mt,at.width,at.height,0,it,st,at.data)}}}else{if(Ce=E.mipmaps,V&&be){Ce.length>0&&ke++;const ve=Ht(Ae[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ke,mt,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(Be){V?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,Ae[ve].width,Ae[ve].height,it,st,Ae[ve].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,mt,Ae[ve].width,Ae[ve].height,0,it,st,Ae[ve].data);for(let Xe=0;Xe<Ce.length;Xe++){const Ut=Ce[Xe].image[ve].image;V?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Xe+1,0,0,Ut.width,Ut.height,it,st,Ut.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Xe+1,mt,Ut.width,Ut.height,0,it,st,Ut.data)}}else{V?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,it,st,Ae[ve]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,mt,it,st,Ae[ve]);for(let Xe=0;Xe<Ce.length;Xe++){const at=Ce[Xe];V?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Xe+1,0,0,it,st,at.image[ve]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Xe+1,mt,it,st,at.image[ve])}}}y(E)&&C(s.TEXTURE_CUBE_MAP),Ee.__version=_e.version,E.onUpdate&&E.onUpdate(E)}N.__version=E.version}function Qe(N,E,Z,he,_e,Ee){const Le=l.convert(Z.format,Z.colorSpace),ue=l.convert(Z.type),pe=P(Z.internalFormat,Le,ue,Z.normalized,Z.colorSpace),Fe=r.get(E),Be=r.get(Z);if(Be.__renderTarget=E,!Fe.__hasExternalTextures){const Ae=Math.max(1,E.width>>Ee),Te=Math.max(1,E.height>>Ee);_e===s.TEXTURE_3D||_e===s.TEXTURE_2D_ARRAY?t.texImage3D(_e,Ee,pe,Ae,Te,E.depth,0,Le,ue,null):t.texImage2D(_e,Ee,pe,Ae,Te,0,Le,ue,null)}t.bindFramebuffer(s.FRAMEBUFFER,N),ht(E)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,he,_e,Be.__webglTexture,0,kt(E)):(_e===s.TEXTURE_2D||_e>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&_e<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,he,_e,Be.__webglTexture,Ee),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ft(N,E,Z){if(s.bindRenderbuffer(s.RENDERBUFFER,N),E.depthBuffer){const he=E.depthTexture,_e=he&&he.isDepthTexture?he.type:null,Ee=k(E.stencilBuffer,_e),Le=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;ht(E)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,kt(E),Ee,E.width,E.height):Z?s.renderbufferStorageMultisample(s.RENDERBUFFER,kt(E),Ee,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,Ee,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Le,s.RENDERBUFFER,N)}else{const he=E.textures;for(let _e=0;_e<he.length;_e++){const Ee=he[_e],Le=l.convert(Ee.format,Ee.colorSpace),ue=l.convert(Ee.type),pe=P(Ee.internalFormat,Le,ue,Ee.normalized,Ee.colorSpace);ht(E)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,kt(E),pe,E.width,E.height):Z?s.renderbufferStorageMultisample(s.RENDERBUFFER,kt(E),pe,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,pe,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function dt(N,E,Z){const he=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,N),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const _e=r.get(E.depthTexture);if(_e.__renderTarget=E,(!_e.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),he){if(_e.__webglInit===void 0&&(_e.__webglInit=!0,E.depthTexture.addEventListener("dispose",z)),_e.__webglTexture===void 0){_e.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,_e.__webglTexture),Ie(s.TEXTURE_CUBE_MAP,E.depthTexture);const Fe=l.convert(E.depthTexture.format),Be=l.convert(E.depthTexture.type);let Ae;E.depthTexture.format===lr?Ae=s.DEPTH_COMPONENT24:E.depthTexture.format===hs&&(Ae=s.DEPTH24_STENCIL8);for(let Te=0;Te<6;Te++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Ae,E.width,E.height,0,Fe,Be,null)}}else K(E.depthTexture,0);const Ee=_e.__webglTexture,Le=kt(E),ue=he?s.TEXTURE_CUBE_MAP_POSITIVE_X+Z:s.TEXTURE_2D,pe=E.depthTexture.format===hs?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(E.depthTexture.format===lr)ht(E)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pe,ue,Ee,0,Le):s.framebufferTexture2D(s.FRAMEBUFFER,pe,ue,Ee,0);else if(E.depthTexture.format===hs)ht(E)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,pe,ue,Ee,0,Le):s.framebufferTexture2D(s.FRAMEBUFFER,pe,ue,Ee,0);else throw new Error("Unknown depthTexture format")}function wt(N){const E=r.get(N),Z=N.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==N.depthTexture){const he=N.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),he){const _e=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,he.removeEventListener("dispose",_e)};he.addEventListener("dispose",_e),E.__depthDisposeCallback=_e}E.__boundDepthTexture=he}if(N.depthTexture&&!E.__autoAllocateDepthBuffer)if(Z)for(let he=0;he<6;he++)dt(E.__webglFramebuffer[he],N,he);else{const he=N.texture.mipmaps;he&&he.length>0?dt(E.__webglFramebuffer[0],N,0):dt(E.__webglFramebuffer,N,0)}else if(Z){E.__webglDepthbuffer=[];for(let he=0;he<6;he++)if(t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[he]),E.__webglDepthbuffer[he]===void 0)E.__webglDepthbuffer[he]=s.createRenderbuffer(),Ft(E.__webglDepthbuffer[he],N,!1);else{const _e=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ee=E.__webglDepthbuffer[he];s.bindRenderbuffer(s.RENDERBUFFER,Ee),s.framebufferRenderbuffer(s.FRAMEBUFFER,_e,s.RENDERBUFFER,Ee)}}else{const he=N.texture.mipmaps;if(he&&he.length>0?t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),Ft(E.__webglDepthbuffer,N,!1);else{const _e=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ee=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Ee),s.framebufferRenderbuffer(s.FRAMEBUFFER,_e,s.RENDERBUFFER,Ee)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Nt(N,E,Z){const he=r.get(N);E!==void 0&&Qe(he.__webglFramebuffer,N,N.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Z!==void 0&&wt(N)}function ft(N){const E=N.texture,Z=r.get(N),he=r.get(E);N.addEventListener("dispose",T);const _e=N.textures,Ee=N.isWebGLCubeRenderTarget===!0,Le=_e.length>1;if(Le||(he.__webglTexture===void 0&&(he.__webglTexture=s.createTexture()),he.__version=E.version,u.memory.textures++),Ee){Z.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(E.mipmaps&&E.mipmaps.length>0){Z.__webglFramebuffer[ue]=[];for(let pe=0;pe<E.mipmaps.length;pe++)Z.__webglFramebuffer[ue][pe]=s.createFramebuffer()}else Z.__webglFramebuffer[ue]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){Z.__webglFramebuffer=[];for(let ue=0;ue<E.mipmaps.length;ue++)Z.__webglFramebuffer[ue]=s.createFramebuffer()}else Z.__webglFramebuffer=s.createFramebuffer();if(Le)for(let ue=0,pe=_e.length;ue<pe;ue++){const Fe=r.get(_e[ue]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=s.createTexture(),u.memory.textures++)}if(N.samples>0&&ht(N)===!1){Z.__webglMultisampledFramebuffer=s.createFramebuffer(),Z.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let ue=0;ue<_e.length;ue++){const pe=_e[ue];Z.__webglColorRenderbuffer[ue]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Z.__webglColorRenderbuffer[ue]);const Fe=l.convert(pe.format,pe.colorSpace),Be=l.convert(pe.type),Ae=P(pe.internalFormat,Fe,Be,pe.normalized,pe.colorSpace,N.isXRRenderTarget===!0),Te=kt(N);s.renderbufferStorageMultisample(s.RENDERBUFFER,Te,Ae,N.width,N.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,Z.__webglColorRenderbuffer[ue])}s.bindRenderbuffer(s.RENDERBUFFER,null),N.depthBuffer&&(Z.__webglDepthRenderbuffer=s.createRenderbuffer(),Ft(Z.__webglDepthRenderbuffer,N,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Ee){t.bindTexture(s.TEXTURE_CUBE_MAP,he.__webglTexture),Ie(s.TEXTURE_CUBE_MAP,E);for(let ue=0;ue<6;ue++)if(E.mipmaps&&E.mipmaps.length>0)for(let pe=0;pe<E.mipmaps.length;pe++)Qe(Z.__webglFramebuffer[ue][pe],N,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,pe);else Qe(Z.__webglFramebuffer[ue],N,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);y(E)&&C(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Le){for(let ue=0,pe=_e.length;ue<pe;ue++){const Fe=_e[ue],Be=r.get(Fe);let Ae=s.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Ae=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Ae,Be.__webglTexture),Ie(Ae,Fe),Qe(Z.__webglFramebuffer,N,Fe,s.COLOR_ATTACHMENT0+ue,Ae,0),y(Fe)&&C(Ae)}t.unbindTexture()}else{let ue=s.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(ue=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ue,he.__webglTexture),Ie(ue,E),E.mipmaps&&E.mipmaps.length>0)for(let pe=0;pe<E.mipmaps.length;pe++)Qe(Z.__webglFramebuffer[pe],N,E,s.COLOR_ATTACHMENT0,ue,pe);else Qe(Z.__webglFramebuffer,N,E,s.COLOR_ATTACHMENT0,ue,0);y(E)&&C(ue),t.unbindTexture()}N.depthBuffer&&wt(N)}function Yt(N){const E=N.textures;for(let Z=0,he=E.length;Z<he;Z++){const _e=E[Z];if(y(_e)){const Ee=L(N),Le=r.get(_e).__webglTexture;t.bindTexture(Ee,Le),C(Ee),t.unbindTexture()}}}const Ot=[],mn=[];function G(N){if(N.samples>0){if(ht(N)===!1){const E=N.textures,Z=N.width,he=N.height;let _e=s.COLOR_BUFFER_BIT;const Ee=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Le=r.get(N),ue=E.length>1;if(ue)for(let Fe=0;Fe<E.length;Fe++)t.bindFramebuffer(s.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer);const pe=N.texture.mipmaps;pe&&pe.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Le.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let Fe=0;Fe<E.length;Fe++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(_e|=s.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(_e|=s.STENCIL_BUFFER_BIT)),ue){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Le.__webglColorRenderbuffer[Fe]);const Be=r.get(E[Fe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Be,0)}s.blitFramebuffer(0,0,Z,he,0,0,Z,he,_e,s.NEAREST),h===!0&&(Ot.length=0,mn.length=0,Ot.push(s.COLOR_ATTACHMENT0+Fe),N.depthBuffer&&N.resolveDepthBuffer===!1&&(Ot.push(Ee),mn.push(Ee),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,mn)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ot))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ue)for(let Fe=0;Fe<E.length;Fe++){t.bindFramebuffer(s.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,Le.__webglColorRenderbuffer[Fe]);const Be=r.get(E[Fe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,Be,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&h){const E=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function kt(N){return Math.min(o.maxSamples,N.samples)}function ht(N){const E=r.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ct(N){const E=u.render.frame;v.get(N)!==E&&(v.set(N,E),N.update())}function De(N,E){const Z=N.colorSpace,he=N.format,_e=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||Z!==lc&&Z!==Ur&&(St.getTransfer(Z)===Dt?(he!==Ti||_e!==Zn)&&nt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Et("WebGLTextures: Unsupported texture color space:",Z)),E}function Ht(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(p.width=N.naturalWidth||N.width,p.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(p.width=N.displayWidth,p.height=N.displayHeight):(p.width=N.width,p.height=N.height),p}this.allocateTextureUnit=ie,this.resetTextureUnits=ae,this.getTextureUnits=de,this.setTextureUnits=j,this.setTexture2D=K,this.setTexture2DArray=ce,this.setTexture3D=le,this.setTextureCube=O,this.rebindTextures=Nt,this.setupRenderTarget=ft,this.updateRenderTargetMipmap=Yt,this.updateMultisampleRenderTarget=G,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=Qe,this.useMultisampledRTT=ht,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function L1(s,e){function t(r,o=Ur){let l;const u=St.getTransfer(o);if(r===Zn)return s.UNSIGNED_BYTE;if(r===Zf)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Jf)return s.UNSIGNED_SHORT_5_5_5_1;if(r===I_)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===U_)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===D_)return s.BYTE;if(r===N_)return s.SHORT;if(r===ho)return s.UNSIGNED_SHORT;if(r===Kf)return s.INT;if(r===Bi)return s.UNSIGNED_INT;if(r===Ui)return s.FLOAT;if(r===or)return s.HALF_FLOAT;if(r===F_)return s.ALPHA;if(r===O_)return s.RGB;if(r===Ti)return s.RGBA;if(r===lr)return s.DEPTH_COMPONENT;if(r===hs)return s.DEPTH_STENCIL;if(r===k_)return s.RED;if(r===Qf)return s.RED_INTEGER;if(r===ms)return s.RG;if(r===eh)return s.RG_INTEGER;if(r===th)return s.RGBA_INTEGER;if(r===Ql||r===ec||r===tc||r===nc)if(u===Dt)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===Ql)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ec)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===tc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===nc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===Ql)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ec)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===tc)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===nc)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===sf||r===af||r===of||r===lf)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===sf)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===af)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===of)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===lf)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===cf||r===uf||r===df||r===ff||r===hf||r===ac||r===pf)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===cf||r===uf)return u===Dt?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===df)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC;if(r===ff)return l.COMPRESSED_R11_EAC;if(r===hf)return l.COMPRESSED_SIGNED_R11_EAC;if(r===ac)return l.COMPRESSED_RG11_EAC;if(r===pf)return l.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===mf||r===gf||r===_f||r===vf||r===xf||r===yf||r===Sf||r===Mf||r===Ef||r===Tf||r===wf||r===bf||r===Af||r===Rf)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===mf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===gf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===_f)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===vf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===xf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===yf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Sf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Mf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Ef)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Tf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===wf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===bf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Af)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Rf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Cf||r===Pf||r===Lf)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===Cf)return u===Dt?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Pf)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Lf)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Df||r===Nf||r===oc||r===If)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===Df)return l.COMPRESSED_RED_RGTC1_EXT;if(r===Nf)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===oc)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===If)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===po?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:t}}const D1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,N1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class I1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const r=new Y_(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new zi({vertexShader:D1,fragmentShader:N1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Jn(new ua(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class U1 extends Wr{constructor(e,t){super();const r=this;let o=null,l=1,u=null,f="local-floor",h=1,p=null,v=null,x=null,g=null,S=null,M=null;const b=typeof XRWebGLBinding<"u",_=new I1,y={},C=t.getContextAttributes();let L=null,P=null;const k=[],I=[],z=new ut;let T=null;const D=new ci;D.viewport=new Qt;const B=new ci;B.viewport=new Qt;const F=[D,B],q=new VS;let ae=null,de=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let Se=k[oe];return Se===void 0&&(Se=new md,k[oe]=Se),Se.getTargetRaySpace()},this.getControllerGrip=function(oe){let Se=k[oe];return Se===void 0&&(Se=new md,k[oe]=Se),Se.getGripSpace()},this.getHand=function(oe){let Se=k[oe];return Se===void 0&&(Se=new md,k[oe]=Se),Se.getHandSpace()};function j(oe){const Se=I.indexOf(oe.inputSource);if(Se===-1)return;const me=k[Se];me!==void 0&&(me.update(oe.inputSource,oe.frame,p||u),me.dispatchEvent({type:oe.type,data:oe.inputSource}))}function ie(){o.removeEventListener("select",j),o.removeEventListener("selectstart",j),o.removeEventListener("selectend",j),o.removeEventListener("squeeze",j),o.removeEventListener("squeezestart",j),o.removeEventListener("squeezeend",j),o.removeEventListener("end",ie),o.removeEventListener("inputsourceschange",Y);for(let oe=0;oe<k.length;oe++){const Se=I[oe];Se!==null&&(I[oe]=null,k[oe].disconnect(Se))}ae=null,de=null,_.reset();for(const oe in y)delete y[oe];e.setRenderTarget(L),S=null,g=null,x=null,o=null,P=null,Ie.stop(),r.isPresenting=!1,e.setPixelRatio(T),e.setSize(z.width,z.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(oe){l=oe,r.isPresenting===!0&&nt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){f=oe,r.isPresenting===!0&&nt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(oe){p=oe},this.getBaseLayer=function(){return g!==null?g:S},this.getBinding=function(){return x===null&&b&&(x=new XRWebGLBinding(o,t)),x},this.getFrame=function(){return M},this.getSession=function(){return o},this.setSession=async function(oe){if(o=oe,o!==null){if(L=e.getRenderTarget(),o.addEventListener("select",j),o.addEventListener("selectstart",j),o.addEventListener("selectend",j),o.addEventListener("squeeze",j),o.addEventListener("squeezestart",j),o.addEventListener("squeezeend",j),o.addEventListener("end",ie),o.addEventListener("inputsourceschange",Y),C.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(z),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Ue=null,Je=null;C.depth&&(Je=C.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=C.stencil?hs:lr,Ue=C.stencil?po:Bi);const Qe={colorFormat:t.RGBA8,depthFormat:Je,scaleFactor:l};x=this.getBinding(),g=x.createProjectionLayer(Qe),o.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),P=new ki(g.textureWidth,g.textureHeight,{format:Ti,type:Zn,depthTexture:new ca(g.textureWidth,g.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const me={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(o,t,me),o.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),P=new ki(S.framebufferWidth,S.framebufferHeight,{format:Ti,type:Zn,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}P.isXRRenderTarget=!0,this.setFoveation(h),p=null,u=await o.requestReferenceSpace(f),Ie.setContext(o),Ie.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y(oe){for(let Se=0;Se<oe.removed.length;Se++){const me=oe.removed[Se],Ue=I.indexOf(me);Ue>=0&&(I[Ue]=null,k[Ue].disconnect(me))}for(let Se=0;Se<oe.added.length;Se++){const me=oe.added[Se];let Ue=I.indexOf(me);if(Ue===-1){for(let Qe=0;Qe<k.length;Qe++)if(Qe>=I.length){I.push(me),Ue=Qe;break}else if(I[Qe]===null){I[Qe]=me,Ue=Qe;break}if(Ue===-1)break}const Je=k[Ue];Je&&Je.connect(me)}}const K=new $,ce=new $;function le(oe,Se,me){K.setFromMatrixPosition(Se.matrixWorld),ce.setFromMatrixPosition(me.matrixWorld);const Ue=K.distanceTo(ce),Je=Se.projectionMatrix.elements,Qe=me.projectionMatrix.elements,Ft=Je[14]/(Je[10]-1),dt=Je[14]/(Je[10]+1),wt=(Je[9]+1)/Je[5],Nt=(Je[9]-1)/Je[5],ft=(Je[8]-1)/Je[0],Yt=(Qe[8]+1)/Qe[0],Ot=Ft*ft,mn=Ft*Yt,G=Ue/(-ft+Yt),kt=G*-ft;if(Se.matrixWorld.decompose(oe.position,oe.quaternion,oe.scale),oe.translateX(kt),oe.translateZ(G),oe.matrixWorld.compose(oe.position,oe.quaternion,oe.scale),oe.matrixWorldInverse.copy(oe.matrixWorld).invert(),Je[10]===-1)oe.projectionMatrix.copy(Se.projectionMatrix),oe.projectionMatrixInverse.copy(Se.projectionMatrixInverse);else{const ht=Ft+G,Ct=dt+G,De=Ot-kt,Ht=mn+(Ue-kt),N=wt*dt/Ct*ht,E=Nt*dt/Ct*ht;oe.projectionMatrix.makePerspective(De,Ht,N,E,ht,Ct),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert()}}function O(oe,Se){Se===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(Se.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(o===null)return;let Se=oe.near,me=oe.far;_.texture!==null&&(_.depthNear>0&&(Se=_.depthNear),_.depthFar>0&&(me=_.depthFar)),q.near=B.near=D.near=Se,q.far=B.far=D.far=me,(ae!==q.near||de!==q.far)&&(o.updateRenderState({depthNear:q.near,depthFar:q.far}),ae=q.near,de=q.far),q.layers.mask=oe.layers.mask|6,D.layers.mask=q.layers.mask&-5,B.layers.mask=q.layers.mask&-3;const Ue=oe.parent,Je=q.cameras;O(q,Ue);for(let Qe=0;Qe<Je.length;Qe++)O(Je[Qe],Ue);Je.length===2?le(q,D,B):q.projectionMatrix.copy(D.projectionMatrix),ee(oe,q,Ue)};function ee(oe,Se,me){me===null?oe.matrix.copy(Se.matrixWorld):(oe.matrix.copy(me.matrixWorld),oe.matrix.invert(),oe.matrix.multiply(Se.matrixWorld)),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.updateMatrixWorld(!0),oe.projectionMatrix.copy(Se.projectionMatrix),oe.projectionMatrixInverse.copy(Se.projectionMatrixInverse),oe.isPerspectiveCamera&&(oe.fov=Of*2*Math.atan(1/oe.projectionMatrix.elements[5]),oe.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(g===null&&S===null))return h},this.setFoveation=function(oe){h=oe,g!==null&&(g.fixedFoveation=oe),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=oe)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(q)},this.getCameraTexture=function(oe){return y[oe]};let Oe=null;function Ge(oe,Se){if(v=Se.getViewerPose(p||u),M=Se,v!==null){const me=v.views;S!==null&&(e.setRenderTargetFramebuffer(P,S.framebuffer),e.setRenderTarget(P));let Ue=!1;me.length!==q.cameras.length&&(q.cameras.length=0,Ue=!0);for(let dt=0;dt<me.length;dt++){const wt=me[dt];let Nt=null;if(S!==null)Nt=S.getViewport(wt);else{const Yt=x.getViewSubImage(g,wt);Nt=Yt.viewport,dt===0&&(e.setRenderTargetTextures(P,Yt.colorTexture,Yt.depthStencilTexture),e.setRenderTarget(P))}let ft=F[dt];ft===void 0&&(ft=new ci,ft.layers.enable(dt),ft.viewport=new Qt,F[dt]=ft),ft.matrix.fromArray(wt.transform.matrix),ft.matrix.decompose(ft.position,ft.quaternion,ft.scale),ft.projectionMatrix.fromArray(wt.projectionMatrix),ft.projectionMatrixInverse.copy(ft.projectionMatrix).invert(),ft.viewport.set(Nt.x,Nt.y,Nt.width,Nt.height),dt===0&&(q.matrix.copy(ft.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),Ue===!0&&q.cameras.push(ft)}const Je=o.enabledFeatures;if(Je&&Je.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&b){x=r.getBinding();const dt=x.getDepthInformation(me[0]);dt&&dt.isValid&&dt.texture&&_.init(dt,o.renderState)}if(Je&&Je.includes("camera-access")&&b){e.state.unbindTexture(),x=r.getBinding();for(let dt=0;dt<me.length;dt++){const wt=me[dt].camera;if(wt){let Nt=y[wt];Nt||(Nt=new Y_,y[wt]=Nt);const ft=x.getCameraImage(wt);Nt.sourceTexture=ft}}}}for(let me=0;me<k.length;me++){const Ue=I[me],Je=k[me];Ue!==null&&Je!==void 0&&Je.update(Ue,Se,p||u)}Oe&&Oe(oe,Se),Se.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:Se}),M=null}const Ie=new Z_;Ie.setAnimationLoop(Ge),this.setAnimationLoop=function(oe){Oe=oe},this.dispose=function(){}}}const F1=new Zt,r0=new ct;r0.set(-1,0,0,0,1,0,0,0,1);function O1(s,e){function t(_,y){_.matrixAutoUpdate===!0&&_.updateMatrix(),y.value.copy(_.matrix)}function r(_,y){y.color.getRGB(_.fogColor.value,q_(s)),y.isFog?(_.fogNear.value=y.near,_.fogFar.value=y.far):y.isFogExp2&&(_.fogDensity.value=y.density)}function o(_,y,C,L,P){y.isNodeMaterial?y.uniformsNeedUpdate=!1:y.isMeshBasicMaterial?l(_,y):y.isMeshLambertMaterial?(l(_,y),y.envMap&&(_.envMapIntensity.value=y.envMapIntensity)):y.isMeshToonMaterial?(l(_,y),x(_,y)):y.isMeshPhongMaterial?(l(_,y),v(_,y),y.envMap&&(_.envMapIntensity.value=y.envMapIntensity)):y.isMeshStandardMaterial?(l(_,y),g(_,y),y.isMeshPhysicalMaterial&&S(_,y,P)):y.isMeshMatcapMaterial?(l(_,y),M(_,y)):y.isMeshDepthMaterial?l(_,y):y.isMeshDistanceMaterial?(l(_,y),b(_,y)):y.isMeshNormalMaterial?l(_,y):y.isLineBasicMaterial?(u(_,y),y.isLineDashedMaterial&&f(_,y)):y.isPointsMaterial?h(_,y,C,L):y.isSpriteMaterial?p(_,y):y.isShadowMaterial?(_.color.value.copy(y.color),_.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function l(_,y){_.opacity.value=y.opacity,y.color&&_.diffuse.value.copy(y.color),y.emissive&&_.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(_.map.value=y.map,t(y.map,_.mapTransform)),y.alphaMap&&(_.alphaMap.value=y.alphaMap,t(y.alphaMap,_.alphaMapTransform)),y.bumpMap&&(_.bumpMap.value=y.bumpMap,t(y.bumpMap,_.bumpMapTransform),_.bumpScale.value=y.bumpScale,y.side===Gn&&(_.bumpScale.value*=-1)),y.normalMap&&(_.normalMap.value=y.normalMap,t(y.normalMap,_.normalMapTransform),_.normalScale.value.copy(y.normalScale),y.side===Gn&&_.normalScale.value.negate()),y.displacementMap&&(_.displacementMap.value=y.displacementMap,t(y.displacementMap,_.displacementMapTransform),_.displacementScale.value=y.displacementScale,_.displacementBias.value=y.displacementBias),y.emissiveMap&&(_.emissiveMap.value=y.emissiveMap,t(y.emissiveMap,_.emissiveMapTransform)),y.specularMap&&(_.specularMap.value=y.specularMap,t(y.specularMap,_.specularMapTransform)),y.alphaTest>0&&(_.alphaTest.value=y.alphaTest);const C=e.get(y),L=C.envMap,P=C.envMapRotation;L&&(_.envMap.value=L,_.envMapRotation.value.setFromMatrix4(F1.makeRotationFromEuler(P)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&_.envMapRotation.value.premultiply(r0),_.reflectivity.value=y.reflectivity,_.ior.value=y.ior,_.refractionRatio.value=y.refractionRatio),y.lightMap&&(_.lightMap.value=y.lightMap,_.lightMapIntensity.value=y.lightMapIntensity,t(y.lightMap,_.lightMapTransform)),y.aoMap&&(_.aoMap.value=y.aoMap,_.aoMapIntensity.value=y.aoMapIntensity,t(y.aoMap,_.aoMapTransform))}function u(_,y){_.diffuse.value.copy(y.color),_.opacity.value=y.opacity,y.map&&(_.map.value=y.map,t(y.map,_.mapTransform))}function f(_,y){_.dashSize.value=y.dashSize,_.totalSize.value=y.dashSize+y.gapSize,_.scale.value=y.scale}function h(_,y,C,L){_.diffuse.value.copy(y.color),_.opacity.value=y.opacity,_.size.value=y.size*C,_.scale.value=L*.5,y.map&&(_.map.value=y.map,t(y.map,_.uvTransform)),y.alphaMap&&(_.alphaMap.value=y.alphaMap,t(y.alphaMap,_.alphaMapTransform)),y.alphaTest>0&&(_.alphaTest.value=y.alphaTest)}function p(_,y){_.diffuse.value.copy(y.color),_.opacity.value=y.opacity,_.rotation.value=y.rotation,y.map&&(_.map.value=y.map,t(y.map,_.mapTransform)),y.alphaMap&&(_.alphaMap.value=y.alphaMap,t(y.alphaMap,_.alphaMapTransform)),y.alphaTest>0&&(_.alphaTest.value=y.alphaTest)}function v(_,y){_.specular.value.copy(y.specular),_.shininess.value=Math.max(y.shininess,1e-4)}function x(_,y){y.gradientMap&&(_.gradientMap.value=y.gradientMap)}function g(_,y){_.metalness.value=y.metalness,y.metalnessMap&&(_.metalnessMap.value=y.metalnessMap,t(y.metalnessMap,_.metalnessMapTransform)),_.roughness.value=y.roughness,y.roughnessMap&&(_.roughnessMap.value=y.roughnessMap,t(y.roughnessMap,_.roughnessMapTransform)),y.envMap&&(_.envMapIntensity.value=y.envMapIntensity)}function S(_,y,C){_.ior.value=y.ior,y.sheen>0&&(_.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),_.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(_.sheenColorMap.value=y.sheenColorMap,t(y.sheenColorMap,_.sheenColorMapTransform)),y.sheenRoughnessMap&&(_.sheenRoughnessMap.value=y.sheenRoughnessMap,t(y.sheenRoughnessMap,_.sheenRoughnessMapTransform))),y.clearcoat>0&&(_.clearcoat.value=y.clearcoat,_.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(_.clearcoatMap.value=y.clearcoatMap,t(y.clearcoatMap,_.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,t(y.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(_.clearcoatNormalMap.value=y.clearcoatNormalMap,t(y.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===Gn&&_.clearcoatNormalScale.value.negate())),y.dispersion>0&&(_.dispersion.value=y.dispersion),y.iridescence>0&&(_.iridescence.value=y.iridescence,_.iridescenceIOR.value=y.iridescenceIOR,_.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(_.iridescenceMap.value=y.iridescenceMap,t(y.iridescenceMap,_.iridescenceMapTransform)),y.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=y.iridescenceThicknessMap,t(y.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),y.transmission>0&&(_.transmission.value=y.transmission,_.transmissionSamplerMap.value=C.texture,_.transmissionSamplerSize.value.set(C.width,C.height),y.transmissionMap&&(_.transmissionMap.value=y.transmissionMap,t(y.transmissionMap,_.transmissionMapTransform)),_.thickness.value=y.thickness,y.thicknessMap&&(_.thicknessMap.value=y.thicknessMap,t(y.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=y.attenuationDistance,_.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(_.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(_.anisotropyMap.value=y.anisotropyMap,t(y.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=y.specularIntensity,_.specularColor.value.copy(y.specularColor),y.specularColorMap&&(_.specularColorMap.value=y.specularColorMap,t(y.specularColorMap,_.specularColorMapTransform)),y.specularIntensityMap&&(_.specularIntensityMap.value=y.specularIntensityMap,t(y.specularIntensityMap,_.specularIntensityMapTransform))}function M(_,y){y.matcap&&(_.matcap.value=y.matcap)}function b(_,y){const C=e.get(y).light;_.referencePosition.value.setFromMatrixPosition(C.matrixWorld),_.nearDistance.value=C.shadow.camera.near,_.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:o}}function k1(s,e,t,r){let o={},l={},u=[];const f=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(C,L){const P=L.program;r.uniformBlockBinding(C,P)}function p(C,L){let P=o[C.id];P===void 0&&(M(C),P=v(C),o[C.id]=P,C.addEventListener("dispose",_));const k=L.program;r.updateUBOMapping(C,k);const I=e.render.frame;l[C.id]!==I&&(g(C),l[C.id]=I)}function v(C){const L=x();C.__bindingPointIndex=L;const P=s.createBuffer(),k=C.__size,I=C.usage;return s.bindBuffer(s.UNIFORM_BUFFER,P),s.bufferData(s.UNIFORM_BUFFER,k,I),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,L,P),P}function x(){for(let C=0;C<f;C++)if(u.indexOf(C)===-1)return u.push(C),C;return Et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(C){const L=o[C.id],P=C.uniforms,k=C.__cache;s.bindBuffer(s.UNIFORM_BUFFER,L);for(let I=0,z=P.length;I<z;I++){const T=Array.isArray(P[I])?P[I]:[P[I]];for(let D=0,B=T.length;D<B;D++){const F=T[D];if(S(F,I,D,k)===!0){const q=F.__offset,ae=Array.isArray(F.value)?F.value:[F.value];let de=0;for(let j=0;j<ae.length;j++){const ie=ae[j],Y=b(ie);typeof ie=="number"||typeof ie=="boolean"?(F.__data[0]=ie,s.bufferSubData(s.UNIFORM_BUFFER,q+de,F.__data)):ie.isMatrix3?(F.__data[0]=ie.elements[0],F.__data[1]=ie.elements[1],F.__data[2]=ie.elements[2],F.__data[3]=0,F.__data[4]=ie.elements[3],F.__data[5]=ie.elements[4],F.__data[6]=ie.elements[5],F.__data[7]=0,F.__data[8]=ie.elements[6],F.__data[9]=ie.elements[7],F.__data[10]=ie.elements[8],F.__data[11]=0):ArrayBuffer.isView(ie)?F.__data.set(new ie.constructor(ie.buffer,ie.byteOffset,F.__data.length)):(ie.toArray(F.__data,de),de+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,q,F.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(C,L,P,k){const I=C.value,z=L+"_"+P;if(k[z]===void 0)return typeof I=="number"||typeof I=="boolean"?k[z]=I:ArrayBuffer.isView(I)?k[z]=I.slice():k[z]=I.clone(),!0;{const T=k[z];if(typeof I=="number"||typeof I=="boolean"){if(T!==I)return k[z]=I,!0}else{if(ArrayBuffer.isView(I))return!0;if(T.equals(I)===!1)return T.copy(I),!0}}return!1}function M(C){const L=C.uniforms;let P=0;const k=16;for(let z=0,T=L.length;z<T;z++){const D=Array.isArray(L[z])?L[z]:[L[z]];for(let B=0,F=D.length;B<F;B++){const q=D[B],ae=Array.isArray(q.value)?q.value:[q.value];for(let de=0,j=ae.length;de<j;de++){const ie=ae[de],Y=b(ie),K=P%k,ce=K%Y.boundary,le=K+ce;P+=ce,le!==0&&k-le<Y.storage&&(P+=k-le),q.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=P,P+=Y.storage}}}const I=P%k;return I>0&&(P+=k-I),C.__size=P,C.__cache={},this}function b(C){const L={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(L.boundary=4,L.storage=4):C.isVector2?(L.boundary=8,L.storage=8):C.isVector3||C.isColor?(L.boundary=16,L.storage=12):C.isVector4?(L.boundary=16,L.storage=16):C.isMatrix3?(L.boundary=48,L.storage=48):C.isMatrix4?(L.boundary=64,L.storage=64):C.isTexture?nt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(C)?(L.boundary=16,L.storage=C.byteLength):nt("WebGLRenderer: Unsupported uniform value type.",C),L}function _(C){const L=C.target;L.removeEventListener("dispose",_);const P=u.indexOf(L.__bindingPointIndex);u.splice(P,1),s.deleteBuffer(o[L.id]),delete o[L.id],delete l[L.id]}function y(){for(const C in o)s.deleteBuffer(o[C]);u=[],o={},l={}}return{bind:h,update:p,dispose:y}}const B1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ni=null;function z1(){return Ni===null&&(Ni=new TS(B1,16,16,ms,or),Ni.name="DFG_LUT",Ni.minFilter=An,Ni.magFilter=An,Ni.wrapS=ir,Ni.wrapT=ir,Ni.generateMipmaps=!1,Ni.needsUpdate=!0),Ni}class H1{constructor(e={}){const{canvas:t=eS(),context:r=null,depth:o=!0,stencil:l=!1,alpha:u=!1,antialias:f=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:p=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:x=!1,reversedDepthBuffer:g=!1,outputBufferType:S=Zn}=e;this.isWebGLRenderer=!0;let M;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=r.getContextAttributes().alpha}else M=u;const b=S,_=new Set([th,eh,Qf]),y=new Set([Zn,Bi,ho,po,Zf,Jf]),C=new Uint32Array(4),L=new Int32Array(4),P=new $;let k=null,I=null;const z=[],T=[];let D=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const B=this;let F=!1,q=null;this._outputColorSpace=li;let ae=0,de=0,j=null,ie=-1,Y=null;const K=new Qt,ce=new Qt;let le=null;const O=new yt(0);let ee=0,Oe=t.width,Ge=t.height,Ie=1,oe=null,Se=null;const me=new Qt(0,0,Oe,Ge),Ue=new Qt(0,0,Oe,Ge);let Je=!1;const Qe=new oh;let Ft=!1,dt=!1;const wt=new Zt,Nt=new $,ft=new Qt,Yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ot=!1;function mn(){return j===null?Ie:1}let G=r;function kt(A,X){return t.getContext(A,X)}try{const A={alpha:!0,depth:o,stencil:l,antialias:f,premultipliedAlpha:h,preserveDrawingBuffer:p,powerPreference:v,failIfMajorPerformanceCaveat:x};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qf}`),t.addEventListener("webglcontextlost",ve,!1),t.addEventListener("webglcontextrestored",Xe,!1),t.addEventListener("webglcontextcreationerror",at,!1),G===null){const X="webgl2";if(G=kt(X,A),G===null)throw kt(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw Et("WebGLRenderer: "+A.message),A}let ht,Ct,De,Ht,N,E,Z,he,_e,Ee,Le,ue,pe,Fe,Be,Ae,Te,it,st,mt,V,be,fe;function ke(){ht=new zT(G),ht.init(),V=new L1(G,ht),Ct=new DT(G,ht,e,V),De=new C1(G,ht),Ct.reversedDepthBuffer&&g&&De.buffers.depth.setReversed(!0),Ht=new GT(G),N=new m1,E=new P1(G,ht,De,N,Ct,V,Ht),Z=new BT(B),he=new YS(G),be=new PT(G,he),_e=new HT(G,he,Ht,be),Ee=new jT(G,_e,he,be,Ht),it=new WT(G,Ct,E),Be=new NT(N),Le=new p1(B,Z,ht,Ct,be,Be),ue=new O1(B,N),pe=new _1,Fe=new E1(ht),Te=new CT(B,Z,De,Ee,M,h),Ae=new R1(B,Ee,Ct),fe=new k1(G,Ht,Ct,De),st=new LT(G,ht,Ht),mt=new VT(G,ht,Ht),Ht.programs=Le.programs,B.capabilities=Ct,B.extensions=ht,B.properties=N,B.renderLists=pe,B.shadowMap=Ae,B.state=De,B.info=Ht}ke(),b!==Zn&&(D=new YT(b,t.width,t.height,o,l));const Ce=new U1(B,G);this.xr=Ce,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const A=ht.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ht.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Ie},this.setPixelRatio=function(A){A!==void 0&&(Ie=A,this.setSize(Oe,Ge,!1))},this.getSize=function(A){return A.set(Oe,Ge)},this.setSize=function(A,X,re=!0){if(Ce.isPresenting){nt("WebGLRenderer: Can't change size while VR device is presenting.");return}Oe=A,Ge=X,t.width=Math.floor(A*Ie),t.height=Math.floor(X*Ie),re===!0&&(t.style.width=A+"px",t.style.height=X+"px"),D!==null&&D.setSize(t.width,t.height),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(Oe*Ie,Ge*Ie).floor()},this.setDrawingBufferSize=function(A,X,re){Oe=A,Ge=X,Ie=re,t.width=Math.floor(A*re),t.height=Math.floor(X*re),this.setViewport(0,0,A,X)},this.setEffects=function(A){if(b===Zn){Et("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let X=0;X<A.length;X++)if(A[X].isOutputPass===!0){nt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(K)},this.getViewport=function(A){return A.copy(me)},this.setViewport=function(A,X,re,te){A.isVector4?me.set(A.x,A.y,A.z,A.w):me.set(A,X,re,te),De.viewport(K.copy(me).multiplyScalar(Ie).round())},this.getScissor=function(A){return A.copy(Ue)},this.setScissor=function(A,X,re,te){A.isVector4?Ue.set(A.x,A.y,A.z,A.w):Ue.set(A,X,re,te),De.scissor(ce.copy(Ue).multiplyScalar(Ie).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(A){De.setScissorTest(Je=A)},this.setOpaqueSort=function(A){oe=A},this.setTransparentSort=function(A){Se=A},this.getClearColor=function(A){return A.copy(Te.getClearColor())},this.setClearColor=function(){Te.setClearColor(...arguments)},this.getClearAlpha=function(){return Te.getClearAlpha()},this.setClearAlpha=function(){Te.setClearAlpha(...arguments)},this.clear=function(A=!0,X=!0,re=!0){let te=0;if(A){let Q=!1;if(j!==null){const Pe=j.texture.format;Q=_.has(Pe)}if(Q){const Pe=j.texture.type,Ve=y.has(Pe),Re=Te.getClearColor(),Ye=Te.getClearAlpha(),Ze=Re.r,ot=Re.g,lt=Re.b;Ve?(C[0]=Ze,C[1]=ot,C[2]=lt,C[3]=Ye,G.clearBufferuiv(G.COLOR,0,C)):(L[0]=Ze,L[1]=ot,L[2]=lt,L[3]=Ye,G.clearBufferiv(G.COLOR,0,L))}else te|=G.COLOR_BUFFER_BIT}X&&(te|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),re&&(te|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),te!==0&&G.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),q=A},this.dispose=function(){t.removeEventListener("webglcontextlost",ve,!1),t.removeEventListener("webglcontextrestored",Xe,!1),t.removeEventListener("webglcontextcreationerror",at,!1),Te.dispose(),pe.dispose(),Fe.dispose(),N.dispose(),Z.dispose(),Ee.dispose(),be.dispose(),fe.dispose(),Le.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",jr),Ce.removeEventListener("sessionend",vs),Vi.stop()};function ve(A){A.preventDefault(),ag("WebGLRenderer: Context Lost."),F=!0}function Xe(){ag("WebGLRenderer: Context Restored."),F=!1;const A=Ht.autoReset,X=Ae.enabled,re=Ae.autoUpdate,te=Ae.needsUpdate,Q=Ae.type;ke(),Ht.autoReset=A,Ae.enabled=X,Ae.autoUpdate=re,Ae.needsUpdate=te,Ae.type=Q}function at(A){Et("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ut(A){const X=A.target;X.removeEventListener("dispose",Ut),bt(X)}function bt(A){Rn(A),N.remove(A)}function Rn(A){const X=N.get(A).programs;X!==void 0&&(X.forEach(function(re){Le.releaseProgram(re)}),A.isShaderMaterial&&Le.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,re,te,Q,Pe){X===null&&(X=Yt);const Ve=Q.isMesh&&Q.matrixWorld.determinant()<0,Re=So(A,X,re,te,Q);De.setMaterial(te,Ve);let Ye=re.index,Ze=1;if(te.wireframe===!0){if(Ye=_e.getWireframeAttribute(re),Ye===void 0)return;Ze=2}const ot=re.drawRange,lt=re.attributes.position;let $e=ot.start*Ze,Mt=(ot.start+ot.count)*Ze;Pe!==null&&($e=Math.max($e,Pe.start*Ze),Mt=Math.min(Mt,(Pe.start+Pe.count)*Ze)),Ye!==null?($e=Math.max($e,0),Mt=Math.min(Mt,Ye.count)):lt!=null&&($e=Math.max($e,0),Mt=Math.min(Mt,lt.count));const Bt=Mt-$e;if(Bt<0||Bt===1/0)return;be.setup(Q,te,Re,re,Ye);let jt,Pt=st;if(Ye!==null&&(jt=he.get(Ye),Pt=mt,Pt.setIndex(jt)),Q.isMesh)te.wireframe===!0?(De.setLineWidth(te.wireframeLinewidth*mn()),Pt.setMode(G.LINES)):Pt.setMode(G.TRIANGLES);else if(Q.isLine){let tn=te.linewidth;tn===void 0&&(tn=1),De.setLineWidth(tn*mn()),Q.isLineSegments?Pt.setMode(G.LINES):Q.isLineLoop?Pt.setMode(G.LINE_LOOP):Pt.setMode(G.LINE_STRIP)}else Q.isPoints?Pt.setMode(G.POINTS):Q.isSprite&&Pt.setMode(G.TRIANGLES);if(Q.isBatchedMesh)if(ht.get("WEBGL_multi_draw"))Pt.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const tn=Q._multiDrawStarts,ze=Q._multiDrawCounts,gn=Q._multiDrawCount,gt=Ye?he.get(Ye).bytesPerElement:1,Nn=N.get(te).currentProgram.getUniforms();for(let In=0;In<gn;In++)Nn.setValue(G,"_gl_DrawID",In),Pt.render(tn[In]/gt,ze[In])}else if(Q.isInstancedMesh)Pt.renderInstances($e,Bt,Q.count);else if(re.isInstancedBufferGeometry){const tn=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,ze=Math.min(re.instanceCount,tn);Pt.renderInstances($e,Bt,ze)}else Pt.render($e,Bt)};function ei(A,X,re){A.transparent===!0&&A.side===Ei&&A.forceSinglePass===!1?(A.side=Gn,A.needsUpdate=!0,xs(A,X,re),A.side=zr,A.needsUpdate=!0,xs(A,X,re),A.side=Ei):xs(A,X,re)}this.compile=function(A,X,re=null){re===null&&(re=A),I=Fe.get(re),I.init(X),T.push(I),re.traverseVisible(function(Q){Q.isLight&&Q.layers.test(X.layers)&&(I.pushLight(Q),Q.castShadow&&I.pushShadow(Q))}),A!==re&&A.traverseVisible(function(Q){Q.isLight&&Q.layers.test(X.layers)&&(I.pushLight(Q),Q.castShadow&&I.pushShadow(Q))}),I.setupLights();const te=new Set;return A.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const Pe=Q.material;if(Pe)if(Array.isArray(Pe))for(let Ve=0;Ve<Pe.length;Ve++){const Re=Pe[Ve];ei(Re,re,Q),te.add(Re)}else ei(Pe,re,Q),te.add(Pe)}),I=T.pop(),te},this.compileAsync=function(A,X,re=null){const te=this.compile(A,X,re);return new Promise(Q=>{function Pe(){if(te.forEach(function(Ve){N.get(Ve).currentProgram.isReady()&&te.delete(Ve)}),te.size===0){Q(A);return}setTimeout(Pe,10)}ht.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let Hi=null;function _s(A){Hi&&Hi(A)}function jr(){Vi.stop()}function vs(){Vi.start()}const Vi=new Z_;Vi.setAnimationLoop(_s),typeof self<"u"&&Vi.setContext(self),this.setAnimationLoop=function(A){Hi=A,Ce.setAnimationLoop(A),A===null?Vi.stop():Vi.start()},Ce.addEventListener("sessionstart",jr),Ce.addEventListener("sessionend",vs),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){Et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;q!==null&&q.renderStart(A,X);const re=Ce.enabled===!0&&Ce.isPresenting===!0,te=D!==null&&(j===null||re)&&D.begin(B,j);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(X),X=Ce.getCamera()),A.isScene===!0&&A.onBeforeRender(B,A,X,j),I=Fe.get(A,T.length),I.init(X),I.state.textureUnits=E.getTextureUnits(),T.push(I),wt.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Qe.setFromProjectionMatrix(wt,Fi,X.reversedDepth),dt=this.localClippingEnabled,Ft=Be.init(this.clippingPlanes,dt),k=pe.get(A,z.length),k.init(),z.push(k),Ce.enabled===!0&&Ce.isPresenting===!0){const Ve=B.xr.getDepthSensingMesh();Ve!==null&&ga(Ve,X,-1/0,B.sortObjects)}ga(A,X,0,B.sortObjects),k.finish(),B.sortObjects===!0&&k.sort(oe,Se),Ot=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,Ot&&Te.addToRenderList(k,A),this.info.render.frame++,Ft===!0&&Be.beginShadows();const Q=I.state.shadowsArray;if(Ae.render(Q,A,X),Ft===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),(te&&D.hasRenderPass())===!1){const Ve=k.opaque,Re=k.transmissive;if(I.setupLights(),X.isArrayCamera){const Ye=X.cameras;if(Re.length>0)for(let Ze=0,ot=Ye.length;Ze<ot;Ze++){const lt=Ye[Ze];bi(Ve,Re,A,lt)}Ot&&Te.render(A);for(let Ze=0,ot=Ye.length;Ze<ot;Ze++){const lt=Ye[Ze];xo(k,A,lt,lt.viewport)}}else Re.length>0&&bi(Ve,Re,A,X),Ot&&Te.render(A),xo(k,A,X)}j!==null&&de===0&&(E.updateMultisampleRenderTarget(j),E.updateRenderTargetMipmap(j)),te&&D.end(B),A.isScene===!0&&A.onAfterRender(B,A,X),be.resetDefaultState(),ie=-1,Y=null,T.pop(),T.length>0?(I=T[T.length-1],E.setTextureUnits(I.state.textureUnits),Ft===!0&&Be.setGlobalState(B.clippingPlanes,I.state.camera)):I=null,z.pop(),z.length>0?k=z[z.length-1]:k=null,q!==null&&q.renderEnd()};function ga(A,X,re,te){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)re=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLightProbeGrid)I.pushLightProbeGrid(A);else if(A.isLight)I.pushLight(A),A.castShadow&&I.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Qe.intersectsSprite(A)){te&&ft.setFromMatrixPosition(A.matrixWorld).applyMatrix4(wt);const Ve=Ee.update(A),Re=A.material;Re.visible&&k.push(A,Ve,Re,re,ft.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Qe.intersectsObject(A))){const Ve=Ee.update(A),Re=A.material;if(te&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ft.copy(A.boundingSphere.center)):(Ve.boundingSphere===null&&Ve.computeBoundingSphere(),ft.copy(Ve.boundingSphere.center)),ft.applyMatrix4(A.matrixWorld).applyMatrix4(wt)),Array.isArray(Re)){const Ye=Ve.groups;for(let Ze=0,ot=Ye.length;Ze<ot;Ze++){const lt=Ye[Ze],$e=Re[lt.materialIndex];$e&&$e.visible&&k.push(A,Ve,$e,re,ft.z,lt)}}else Re.visible&&k.push(A,Ve,Re,re,ft.z,null)}}const Pe=A.children;for(let Ve=0,Re=Pe.length;Ve<Re;Ve++)ga(Pe[Ve],X,re,te)}function xo(A,X,re,te){const{opaque:Q,transmissive:Pe,transparent:Ve}=A;I.setupLightsView(re),Ft===!0&&Be.setGlobalState(B.clippingPlanes,re),te&&De.viewport(K.copy(te)),Q.length>0&&Xr(Q,X,re),Pe.length>0&&Xr(Pe,X,re),Ve.length>0&&Xr(Ve,X,re),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function bi(A,X,re,te){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[te.id]===void 0){const $e=ht.has("EXT_color_buffer_half_float")||ht.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[te.id]=new ki(1,1,{generateMipmaps:!0,type:$e?or:Zn,minFilter:fs,samples:Math.max(4,Ct.samples),stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:St.workingColorSpace})}const Pe=I.state.transmissionRenderTarget[te.id],Ve=te.viewport||K;Pe.setSize(Ve.z*B.transmissionResolutionScale,Ve.w*B.transmissionResolutionScale);const Re=B.getRenderTarget(),Ye=B.getActiveCubeFace(),Ze=B.getActiveMipmapLevel();B.setRenderTarget(Pe),B.getClearColor(O),ee=B.getClearAlpha(),ee<1&&B.setClearColor(16777215,.5),B.clear(),Ot&&Te.render(re);const ot=B.toneMapping;B.toneMapping=Oi;const lt=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),I.setupLightsView(te),Ft===!0&&Be.setGlobalState(B.clippingPlanes,te),Xr(A,re,te),E.updateMultisampleRenderTarget(Pe),E.updateRenderTargetMipmap(Pe),ht.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let Mt=0,Bt=X.length;Mt<Bt;Mt++){const jt=X[Mt],{object:Pt,geometry:tn,material:ze,group:gn}=jt;if(ze.side===Ei&&Pt.layers.test(te.layers)){const gt=ze.side;ze.side=Gn,ze.needsUpdate=!0,_a(Pt,re,te,tn,ze,gn),ze.side=gt,ze.needsUpdate=!0,$e=!0}}$e===!0&&(E.updateMultisampleRenderTarget(Pe),E.updateRenderTargetMipmap(Pe))}B.setRenderTarget(Re,Ye,Ze),B.setClearColor(O,ee),lt!==void 0&&(te.viewport=lt),B.toneMapping=ot}function Xr(A,X,re){const te=X.isScene===!0?X.overrideMaterial:null;for(let Q=0,Pe=A.length;Q<Pe;Q++){const Ve=A[Q],{object:Re,geometry:Ye,group:Ze}=Ve;let ot=Ve.material;ot.allowOverride===!0&&te!==null&&(ot=te),Re.layers.test(re.layers)&&_a(Re,X,re,Ye,ot,Ze)}}function _a(A,X,re,te,Q,Pe){A.onBeforeRender(B,X,re,te,Q,Pe),A.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Q.onBeforeRender(B,X,re,te,A,Pe),Q.transparent===!0&&Q.side===Ei&&Q.forceSinglePass===!1?(Q.side=Gn,Q.needsUpdate=!0,B.renderBufferDirect(re,X,te,Q,A,Pe),Q.side=zr,Q.needsUpdate=!0,B.renderBufferDirect(re,X,te,Q,A,Pe),Q.side=Ei):B.renderBufferDirect(re,X,te,Q,A,Pe),A.onAfterRender(B,X,re,te,Q,Pe)}function xs(A,X,re){X.isScene!==!0&&(X=Yt);const te=N.get(A),Q=I.state.lights,Pe=I.state.shadowsArray,Ve=Q.state.version,Re=Le.getParameters(A,Q.state,Pe,X,re,I.state.lightProbeGridArray),Ye=Le.getProgramCacheKey(Re);let Ze=te.programs;te.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?X.environment:null,te.fog=X.fog;const ot=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;te.envMap=Z.get(A.envMap||te.environment,ot),te.envMapRotation=te.environment!==null&&A.envMap===null?X.environmentRotation:A.envMapRotation,Ze===void 0&&(A.addEventListener("dispose",Ut),Ze=new Map,te.programs=Ze);let lt=Ze.get(Ye);if(lt!==void 0){if(te.currentProgram===lt&&te.lightsStateVersion===Ve)return xa(A,Re),lt}else Re.uniforms=Le.getUniforms(A),q!==null&&A.isNodeMaterial&&q.build(A,re,Re),A.onBeforeCompile(Re,B),lt=Le.acquireProgram(Re,Ye),Ze.set(Ye,lt),te.uniforms=Re.uniforms;const $e=te.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&($e.clippingPlanes=Be.uniform),xa(A,Re),te.needsLights=Tc(A),te.lightsStateVersion=Ve,te.needsLights&&($e.ambientLightColor.value=Q.state.ambient,$e.lightProbe.value=Q.state.probe,$e.directionalLights.value=Q.state.directional,$e.directionalLightShadows.value=Q.state.directionalShadow,$e.spotLights.value=Q.state.spot,$e.spotLightShadows.value=Q.state.spotShadow,$e.rectAreaLights.value=Q.state.rectArea,$e.ltc_1.value=Q.state.rectAreaLTC1,$e.ltc_2.value=Q.state.rectAreaLTC2,$e.pointLights.value=Q.state.point,$e.pointLightShadows.value=Q.state.pointShadow,$e.hemisphereLights.value=Q.state.hemi,$e.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,$e.spotLightMatrix.value=Q.state.spotLightMatrix,$e.spotLightMap.value=Q.state.spotLightMap,$e.pointShadowMatrix.value=Q.state.pointShadowMatrix),te.lightProbeGrid=I.state.lightProbeGridArray.length>0,te.currentProgram=lt,te.uniformsList=null,lt}function va(A){if(A.uniformsList===null){const X=A.currentProgram.getUniforms();A.uniformsList=ic.seqWithValue(X.seq,A.uniforms)}return A.uniformsList}function xa(A,X){const re=N.get(A);re.outputColorSpace=X.outputColorSpace,re.batching=X.batching,re.batchingColor=X.batchingColor,re.instancing=X.instancing,re.instancingColor=X.instancingColor,re.instancingMorph=X.instancingMorph,re.skinning=X.skinning,re.morphTargets=X.morphTargets,re.morphNormals=X.morphNormals,re.morphColors=X.morphColors,re.morphTargetsCount=X.morphTargetsCount,re.numClippingPlanes=X.numClippingPlanes,re.numIntersection=X.numClipIntersection,re.vertexAlphas=X.vertexAlphas,re.vertexTangents=X.vertexTangents,re.toneMapping=X.toneMapping}function yo(A,X){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;P.setFromMatrixPosition(X.matrixWorld);for(let re=0,te=A.length;re<te;re++){const Q=A[re];if(Q.texture!==null&&Q.boundingBox.containsPoint(P))return Q}return null}function So(A,X,re,te,Q){X.isScene!==!0&&(X=Yt),E.resetTextureUnits();const Pe=X.fog,Ve=te.isMeshStandardMaterial||te.isMeshLambertMaterial||te.isMeshPhongMaterial?X.environment:null,Re=j===null?B.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:St.workingColorSpace,Ye=te.isMeshStandardMaterial||te.isMeshLambertMaterial&&!te.envMap||te.isMeshPhongMaterial&&!te.envMap,Ze=Z.get(te.envMap||Ve,Ye),ot=te.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,lt=!!re.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),$e=!!re.morphAttributes.position,Mt=!!re.morphAttributes.normal,Bt=!!re.morphAttributes.color;let jt=Oi;te.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(jt=B.toneMapping);const Pt=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,tn=Pt!==void 0?Pt.length:0,ze=N.get(te),gn=I.state.lights;if(Ft===!0&&(dt===!0||A!==Y)){const Lt=A===Y&&te.id===ie;Be.setState(te,A,Lt)}let gt=!1;te.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==gn.state.version||ze.outputColorSpace!==Re||Q.isBatchedMesh&&ze.batching===!1||!Q.isBatchedMesh&&ze.batching===!0||Q.isBatchedMesh&&ze.batchingColor===!0&&Q.colorTexture===null||Q.isBatchedMesh&&ze.batchingColor===!1&&Q.colorTexture!==null||Q.isInstancedMesh&&ze.instancing===!1||!Q.isInstancedMesh&&ze.instancing===!0||Q.isSkinnedMesh&&ze.skinning===!1||!Q.isSkinnedMesh&&ze.skinning===!0||Q.isInstancedMesh&&ze.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&ze.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&ze.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&ze.instancingMorph===!1&&Q.morphTexture!==null||ze.envMap!==Ze||te.fog===!0&&ze.fog!==Pe||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==Be.numPlanes||ze.numIntersection!==Be.numIntersection)||ze.vertexAlphas!==ot||ze.vertexTangents!==lt||ze.morphTargets!==$e||ze.morphNormals!==Mt||ze.morphColors!==Bt||ze.toneMapping!==jt||ze.morphTargetsCount!==tn||!!ze.lightProbeGrid!=I.state.lightProbeGridArray.length>0)&&(gt=!0):(gt=!0,ze.__version=te.version);let Nn=ze.currentProgram;gt===!0&&(Nn=xs(te,X,Q),q&&te.isNodeMaterial&&q.onUpdateProgram(te,Nn,ze));let In=!1,_t=!1,Gi=!1;const Rt=Nn.getUniforms(),Vt=ze.uniforms;if(De.useProgram(Nn.program)&&(In=!0,_t=!0,Gi=!0),te.id!==ie&&(ie=te.id,_t=!0),ze.needsLights){const Lt=yo(I.state.lightProbeGridArray,Q);ze.lightProbeGrid!==Lt&&(ze.lightProbeGrid=Lt,_t=!0)}if(In||Y!==A){De.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Rt.setValue(G,"projectionMatrix",A.projectionMatrix),Rt.setValue(G,"viewMatrix",A.matrixWorldInverse);const fi=Rt.map.cameraPosition;fi!==void 0&&fi.setValue(G,Nt.setFromMatrixPosition(A.matrixWorld)),Ct.logarithmicDepthBuffer&&Rt.setValue(G,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&Rt.setValue(G,"isOrthographic",A.isOrthographicCamera===!0),Y!==A&&(Y=A,_t=!0,Gi=!0)}if(ze.needsLights&&(gn.state.directionalShadowMap.length>0&&Rt.setValue(G,"directionalShadowMap",gn.state.directionalShadowMap,E),gn.state.spotShadowMap.length>0&&Rt.setValue(G,"spotShadowMap",gn.state.spotShadowMap,E),gn.state.pointShadowMap.length>0&&Rt.setValue(G,"pointShadowMap",gn.state.pointShadowMap,E)),Q.isSkinnedMesh){Rt.setOptional(G,Q,"bindMatrix"),Rt.setOptional(G,Q,"bindMatrixInverse");const Lt=Q.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),Rt.setValue(G,"boneTexture",Lt.boneTexture,E))}Q.isBatchedMesh&&(Rt.setOptional(G,Q,"batchingTexture"),Rt.setValue(G,"batchingTexture",Q._matricesTexture,E),Rt.setOptional(G,Q,"batchingIdTexture"),Rt.setValue(G,"batchingIdTexture",Q._indirectTexture,E),Rt.setOptional(G,Q,"batchingColorTexture"),Q._colorsTexture!==null&&Rt.setValue(G,"batchingColorTexture",Q._colorsTexture,E));const di=re.morphAttributes;if((di.position!==void 0||di.normal!==void 0||di.color!==void 0)&&it.update(Q,re,Nn),(_t||ze.receiveShadow!==Q.receiveShadow)&&(ze.receiveShadow=Q.receiveShadow,Rt.setValue(G,"receiveShadow",Q.receiveShadow)),(te.isMeshStandardMaterial||te.isMeshLambertMaterial||te.isMeshPhongMaterial)&&te.envMap===null&&X.environment!==null&&(Vt.envMapIntensity.value=X.environmentIntensity),Vt.dfgLUT!==void 0&&(Vt.dfgLUT.value=z1()),_t){if(Rt.setValue(G,"toneMappingExposure",B.toneMappingExposure),ze.needsLights&&Ec(Vt,Gi),Pe&&te.fog===!0&&ue.refreshFogUniforms(Vt,Pe),ue.refreshMaterialUniforms(Vt,te,Ie,Ge,I.state.transmissionRenderTarget[A.id]),ze.needsLights&&ze.lightProbeGrid){const Lt=ze.lightProbeGrid;Vt.probesSH.value=Lt.texture,Vt.probesMin.value.copy(Lt.boundingBox.min),Vt.probesMax.value.copy(Lt.boundingBox.max),Vt.probesResolution.value.copy(Lt.resolution)}ic.upload(G,va(ze),Vt,E)}if(te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(ic.upload(G,va(ze),Vt,E),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&Rt.setValue(G,"center",Q.center),Rt.setValue(G,"modelViewMatrix",Q.modelViewMatrix),Rt.setValue(G,"normalMatrix",Q.normalMatrix),Rt.setValue(G,"modelMatrix",Q.matrixWorld),te.uniformsGroups!==void 0){const Lt=te.uniformsGroups;for(let fi=0,Ai=Lt.length;fi<Ai;fi++){const Yr=Lt[fi];fe.update(Yr,Nn),fe.bind(Yr,Nn)}}return Nn}function Ec(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function Tc(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return ae},this.getActiveMipmapLevel=function(){return de},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(A,X,re){const te=N.get(A);te.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),N.get(A.texture).__webglTexture=X,N.get(A.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:re,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,X){const re=N.get(A);re.__webglFramebuffer=X,re.__useDefaultFramebuffer=X===void 0};const qt=G.createFramebuffer();this.setRenderTarget=function(A,X=0,re=0){j=A,ae=X,de=re;let te=null,Q=!1,Pe=!1;if(A){const Re=N.get(A);if(Re.__useDefaultFramebuffer!==void 0){De.bindFramebuffer(G.FRAMEBUFFER,Re.__webglFramebuffer),K.copy(A.viewport),ce.copy(A.scissor),le=A.scissorTest,De.viewport(K),De.scissor(ce),De.setScissorTest(le),ie=-1;return}else if(Re.__webglFramebuffer===void 0)E.setupRenderTarget(A);else if(Re.__hasExternalTextures)E.rebindTextures(A,N.get(A.texture).__webglTexture,N.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const ot=A.depthTexture;if(Re.__boundDepthTexture!==ot){if(ot!==null&&N.has(ot)&&(A.width!==ot.image.width||A.height!==ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(A)}}const Ye=A.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(Pe=!0);const Ze=N.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ze[X])?te=Ze[X][re]:te=Ze[X],Q=!0):A.samples>0&&E.useMultisampledRTT(A)===!1?te=N.get(A).__webglMultisampledFramebuffer:Array.isArray(Ze)?te=Ze[re]:te=Ze,K.copy(A.viewport),ce.copy(A.scissor),le=A.scissorTest}else K.copy(me).multiplyScalar(Ie).floor(),ce.copy(Ue).multiplyScalar(Ie).floor(),le=Je;if(re!==0&&(te=qt),De.bindFramebuffer(G.FRAMEBUFFER,te)&&De.drawBuffers(A,te),De.viewport(K),De.scissor(ce),De.setScissorTest(le),Q){const Re=N.get(A.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+X,Re.__webglTexture,re)}else if(Pe){const Re=X;for(let Ye=0;Ye<A.textures.length;Ye++){const Ze=N.get(A.textures[Ye]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Ye,Ze.__webglTexture,re,Re)}}else if(A!==null&&re!==0){const Re=N.get(A.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Re.__webglTexture,re)}ie=-1},this.readRenderTargetPixels=function(A,X,re,te,Q,Pe,Ve,Re=0){if(!(A&&A.isWebGLRenderTarget)){Et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ye=N.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ve!==void 0&&(Ye=Ye[Ve]),Ye){De.bindFramebuffer(G.FRAMEBUFFER,Ye);try{const Ze=A.textures[Re],ot=Ze.format,lt=Ze.type;if(A.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Re),!Ct.textureFormatReadable(ot)){Et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ct.textureTypeReadable(lt)){Et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-te&&re>=0&&re<=A.height-Q&&G.readPixels(X,re,te,Q,V.convert(ot),V.convert(lt),Pe)}finally{const Ze=j!==null?N.get(j).__webglFramebuffer:null;De.bindFramebuffer(G.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(A,X,re,te,Q,Pe,Ve,Re=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ye=N.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ve!==void 0&&(Ye=Ye[Ve]),Ye)if(X>=0&&X<=A.width-te&&re>=0&&re<=A.height-Q){De.bindFramebuffer(G.FRAMEBUFFER,Ye);const Ze=A.textures[Re],ot=Ze.format,lt=Ze.type;if(A.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Re),!Ct.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ct.textureTypeReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $e=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,$e),G.bufferData(G.PIXEL_PACK_BUFFER,Pe.byteLength,G.STREAM_READ),G.readPixels(X,re,te,Q,V.convert(ot),V.convert(lt),0);const Mt=j!==null?N.get(j).__webglFramebuffer:null;De.bindFramebuffer(G.FRAMEBUFFER,Mt);const Bt=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await tS(G,Bt,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,$e),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,Pe),G.deleteBuffer($e),G.deleteSync(Bt),Pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,X=null,re=0){const te=Math.pow(2,-re),Q=Math.floor(A.image.width*te),Pe=Math.floor(A.image.height*te),Ve=X!==null?X.x:0,Re=X!==null?X.y:0;E.setTexture2D(A,0),G.copyTexSubImage2D(G.TEXTURE_2D,re,0,0,Ve,Re,Q,Pe),De.unbindTexture()};const wc=G.createFramebuffer(),ya=G.createFramebuffer();this.copyTextureToTexture=function(A,X,re=null,te=null,Q=0,Pe=0){let Ve,Re,Ye,Ze,ot,lt,$e,Mt,Bt;const jt=A.isCompressedTexture?A.mipmaps[Pe]:A.image;if(re!==null)Ve=re.max.x-re.min.x,Re=re.max.y-re.min.y,Ye=re.isBox3?re.max.z-re.min.z:1,Ze=re.min.x,ot=re.min.y,lt=re.isBox3?re.min.z:0;else{const Vt=Math.pow(2,-Q);Ve=Math.floor(jt.width*Vt),Re=Math.floor(jt.height*Vt),A.isDataArrayTexture?Ye=jt.depth:A.isData3DTexture?Ye=Math.floor(jt.depth*Vt):Ye=1,Ze=0,ot=0,lt=0}te!==null?($e=te.x,Mt=te.y,Bt=te.z):($e=0,Mt=0,Bt=0);const Pt=V.convert(X.format),tn=V.convert(X.type);let ze;X.isData3DTexture?(E.setTexture3D(X,0),ze=G.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(E.setTexture2DArray(X,0),ze=G.TEXTURE_2D_ARRAY):(E.setTexture2D(X,0),ze=G.TEXTURE_2D),De.activeTexture(G.TEXTURE0),De.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,X.flipY),De.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),De.pixelStorei(G.UNPACK_ALIGNMENT,X.unpackAlignment);const gn=De.getParameter(G.UNPACK_ROW_LENGTH),gt=De.getParameter(G.UNPACK_IMAGE_HEIGHT),Nn=De.getParameter(G.UNPACK_SKIP_PIXELS),In=De.getParameter(G.UNPACK_SKIP_ROWS),_t=De.getParameter(G.UNPACK_SKIP_IMAGES);De.pixelStorei(G.UNPACK_ROW_LENGTH,jt.width),De.pixelStorei(G.UNPACK_IMAGE_HEIGHT,jt.height),De.pixelStorei(G.UNPACK_SKIP_PIXELS,Ze),De.pixelStorei(G.UNPACK_SKIP_ROWS,ot),De.pixelStorei(G.UNPACK_SKIP_IMAGES,lt);const Gi=A.isDataArrayTexture||A.isData3DTexture,Rt=X.isDataArrayTexture||X.isData3DTexture;if(A.isDepthTexture){const Vt=N.get(A),di=N.get(X),Lt=N.get(Vt.__renderTarget),fi=N.get(di.__renderTarget);De.bindFramebuffer(G.READ_FRAMEBUFFER,Lt.__webglFramebuffer),De.bindFramebuffer(G.DRAW_FRAMEBUFFER,fi.__webglFramebuffer);for(let Ai=0;Ai<Ye;Ai++)Gi&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,N.get(A).__webglTexture,Q,lt+Ai),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,N.get(X).__webglTexture,Pe,Bt+Ai)),G.blitFramebuffer(Ze,ot,Ve,Re,$e,Mt,Ve,Re,G.DEPTH_BUFFER_BIT,G.NEAREST);De.bindFramebuffer(G.READ_FRAMEBUFFER,null),De.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(Q!==0||A.isRenderTargetTexture||N.has(A)){const Vt=N.get(A),di=N.get(X);De.bindFramebuffer(G.READ_FRAMEBUFFER,wc),De.bindFramebuffer(G.DRAW_FRAMEBUFFER,ya);for(let Lt=0;Lt<Ye;Lt++)Gi?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Vt.__webglTexture,Q,lt+Lt):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Vt.__webglTexture,Q),Rt?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,di.__webglTexture,Pe,Bt+Lt):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,di.__webglTexture,Pe),Q!==0?G.blitFramebuffer(Ze,ot,Ve,Re,$e,Mt,Ve,Re,G.COLOR_BUFFER_BIT,G.NEAREST):Rt?G.copyTexSubImage3D(ze,Pe,$e,Mt,Bt+Lt,Ze,ot,Ve,Re):G.copyTexSubImage2D(ze,Pe,$e,Mt,Ze,ot,Ve,Re);De.bindFramebuffer(G.READ_FRAMEBUFFER,null),De.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else Rt?A.isDataTexture||A.isData3DTexture?G.texSubImage3D(ze,Pe,$e,Mt,Bt,Ve,Re,Ye,Pt,tn,jt.data):X.isCompressedArrayTexture?G.compressedTexSubImage3D(ze,Pe,$e,Mt,Bt,Ve,Re,Ye,Pt,jt.data):G.texSubImage3D(ze,Pe,$e,Mt,Bt,Ve,Re,Ye,Pt,tn,jt):A.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,Pe,$e,Mt,Ve,Re,Pt,tn,jt.data):A.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,Pe,$e,Mt,jt.width,jt.height,Pt,jt.data):G.texSubImage2D(G.TEXTURE_2D,Pe,$e,Mt,Ve,Re,Pt,tn,jt);De.pixelStorei(G.UNPACK_ROW_LENGTH,gn),De.pixelStorei(G.UNPACK_IMAGE_HEIGHT,gt),De.pixelStorei(G.UNPACK_SKIP_PIXELS,Nn),De.pixelStorei(G.UNPACK_SKIP_ROWS,In),De.pixelStorei(G.UNPACK_SKIP_IMAGES,_t),Pe===0&&X.generateMipmaps&&G.generateMipmap(ze),De.unbindTexture()},this.initRenderTarget=function(A){N.get(A).__webglFramebuffer===void 0&&E.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?E.setTextureCube(A,0):A.isData3DTexture?E.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?E.setTexture2DArray(A,0):E.setTexture2D(A,0),De.unbindTexture()},this.resetState=function(){ae=0,de=0,j=null,De.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=St._getDrawingBufferColorSpace(e),t.unpackColorSpace=St._getUnpackColorSpace()}}const a_={type:"change"},ch={type:"start"},s0={type:"end"},Zl=new yc,o_=new Ir,V1=Math.cos(70*rS.DEG2RAD),ln=new $,Vn=2*Math.PI,It={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Hd=1e-6;class G1 extends jS{constructor(e,t=null){super(e,t),this.state=It.NONE,this.target=new $,this.cursor=new $,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Br.ROTATE,MIDDLE:Br.DOLLY,RIGHT:Br.PAN},this.touches={ONE:na.ROTATE,TWO:na.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new $,this._lastQuaternion=new Hr,this._lastTargetPosition=new $,this._quat=new Hr().setFromUnitVectors(e.up,new $(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ig,this._sphericalDelta=new Ig,this._scale=1,this._panOffset=new $,this._rotateStart=new ut,this._rotateEnd=new ut,this._rotateDelta=new ut,this._panStart=new ut,this._panEnd=new ut,this._panDelta=new ut,this._dollyStart=new ut,this._dollyEnd=new ut,this._dollyDelta=new ut,this._dollyDirection=new $,this._mouse=new ut,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=j1.bind(this),this._onPointerDown=W1.bind(this),this._onPointerUp=X1.bind(this),this._onContextMenu=Q1.bind(this),this._onMouseWheel=$1.bind(this),this._onKeyDown=K1.bind(this),this._onTouchStart=Z1.bind(this),this._onTouchMove=J1.bind(this),this._onMouseDown=Y1.bind(this),this._onMouseMove=q1.bind(this),this._interceptControlDown=eb.bind(this),this._interceptControlUp=tb.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(a_),this.update(),this.state=It.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;ln.copy(t).sub(this.target),ln.applyQuaternion(this._quat),this._spherical.setFromVector3(ln),this.autoRotate&&this.state===It.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,o=this.maxAzimuthAngle;isFinite(r)&&isFinite(o)&&(r<-Math.PI?r+=Vn:r>Math.PI&&(r-=Vn),o<-Math.PI?o+=Vn:o>Math.PI&&(o-=Vn),r<=o?this._spherical.theta=Math.max(r,Math.min(o,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+o)/2?Math.max(r,this._spherical.theta):Math.min(o,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let l=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const u=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),l=u!=this._spherical.radius}if(ln.setFromSpherical(this._spherical),ln.applyQuaternion(this._quatInverse),t.copy(this.target).add(ln),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let u=null;if(this.object.isPerspectiveCamera){const f=ln.length();u=this._clampDistance(f*this._scale);const h=f-u;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),l=!!h}else if(this.object.isOrthographicCamera){const f=new $(this._mouse.x,this._mouse.y,0);f.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),l=h!==this.object.zoom;const p=new $(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(f),this.object.updateMatrixWorld(),u=ln.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;u!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(u).add(this.object.position):(Zl.origin.copy(this.object.position),Zl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Zl.direction))<V1?this.object.lookAt(this.target):(o_.setFromNormalAndCoplanarPoint(this.object.up,this.target),Zl.intersectPlane(o_,this.target))))}else if(this.object.isOrthographicCamera){const u=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),u!==this.object.zoom&&(this.object.updateProjectionMatrix(),l=!0)}return this._scale=1,this._performCursorZoom=!1,l||this._lastPosition.distanceToSquared(this.object.position)>Hd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Hd||this._lastTargetPosition.distanceToSquared(this.target)>Hd?(this.dispatchEvent(a_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Vn/60*this.autoRotateSpeed*e:Vn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){ln.setFromMatrixColumn(t,0),ln.multiplyScalar(-e),this._panOffset.add(ln)}_panUp(e,t){this.screenSpacePanning===!0?ln.setFromMatrixColumn(t,1):(ln.setFromMatrixColumn(t,0),ln.crossVectors(this.object.up,ln)),ln.multiplyScalar(e),this._panOffset.add(ln)}_pan(e,t){const r=this.domElement;if(this.object.isPerspectiveCamera){const o=this.object.position;ln.copy(o).sub(this.target);let l=ln.length();l*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*l/r.clientHeight,this.object.matrix),this._panUp(2*t*l/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),o=e-r.left,l=t-r.top,u=r.width,f=r.height;this._mouse.x=o/u*2-1,this._mouse.y=-(l/f)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);this._rotateStart.set(r,o)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);this._panStart.set(r,o)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),r=e.pageX-t.x,o=e.pageY-t.y,l=Math.sqrt(r*r+o*o);this._dollyStart.set(0,l)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),o=.5*(e.pageX+r.x),l=.5*(e.pageY+r.y);this._rotateEnd.set(o,l)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);this._panEnd.set(r,o)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),r=e.pageX-t.x,o=e.pageY-t.y,l=Math.sqrt(r*r+o*o);this._dollyEnd.set(0,l),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const u=(e.pageX+t.x)*.5,f=(e.pageY+t.y)*.5;this._updateZoomParameters(u,f)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ut,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function W1(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function j1(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function X1(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(s0),this.state=It.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Y1(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Br.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=It.DOLLY;break;case Br.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=It.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=It.ROTATE}break;case Br.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=It.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=It.PAN}break;default:this.state=It.NONE}this.state!==It.NONE&&this.dispatchEvent(ch)}function q1(s){switch(this.state){case It.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case It.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case It.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function $1(s){this.enabled===!1||this.enableZoom===!1||this.state!==It.NONE||(s.preventDefault(),this.dispatchEvent(ch),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(s0))}function K1(s){this.enabled!==!1&&this._handleKeyDown(s)}function Z1(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case na.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=It.TOUCH_ROTATE;break;case na.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=It.TOUCH_PAN;break;default:this.state=It.NONE}break;case 2:switch(this.touches.TWO){case na.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=It.TOUCH_DOLLY_PAN;break;case na.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=It.TOUCH_DOLLY_ROTATE;break;default:this.state=It.NONE}break;default:this.state=It.NONE}this.state!==It.NONE&&this.dispatchEvent(ch)}function J1(s){switch(this._trackPointer(s),this.state){case It.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case It.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case It.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case It.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=It.NONE}}function Q1(s){this.enabled!==!1&&s.preventDefault()}function eb(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function tb(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Vd=5,sa={floor:{label:"Floor",color:"#7a6a58",hex:8022616,cat:"Terrain"},stone:{label:"Wall",color:"#383530",hex:3683632,cat:"Terrain"},corridor:{label:"Corridor",color:"#5a4a38",hex:5917240,cat:"Terrain"},water:{label:"Water",color:"#1a4060",hex:1720416,cat:"Terrain"},lava:{label:"Lava",color:"#8a2a0a",hex:9054730,cat:"Terrain"},pillar:{label:"Pillar",color:"#4a4840",hex:4868160,cat:"Structure"},bars:{label:"Iron Bars",color:"#585858",hex:5789784,cat:"Structure"},stairs:{label:"Stairs",color:"#8a7050",hex:9072720,cat:"Structure"},door:{label:"Door ―",color:"#8a5530",hex:9065776,cat:"Structure",geo:"door_h"},door_v:{label:"Door |",color:"#8a5530",hex:9065776,cat:"Structure",geo:"door_v"},altar:{label:"Altar",color:"#5a3a7a",hex:5913210,cat:"Feature"},chest:{label:"Chest",color:"#8a7018",hex:9072664,cat:"Feature"},trap:{label:"Trap",color:"#7a2a2a",hex:8006186,cat:"Feature"},entry:{label:"Entry",color:"#2a6a2a",hex:2779690,cat:"Markers"},exit_tile:{label:"Exit",color:"#6a2a2a",hex:6957610,cat:"Markers"}},nb=["Terrain","Structure","Feature","Markers"];class ib{constructor(e,t={}){this.container=e,this.callbacks=t,this.tool="rect",this.block="floor",this.paintY=0,this._voxels=new Map,this._meshes=new Map,this._undoStack=[],this._redoStack=[],this._mouse={down:!1,lastKey:null},this._rectState=null,this._panState=null,this._spacePanning=!1,this._setup(),this._initFloor(),this._initGhost(),this._initRectGhost(),this._initEvents(),this._loop()}_setup(){const e=this.container.clientWidth||800,t=this.container.clientHeight||600;this.scene=new vS,this.scene.background=new yt(592144),this.scene.fog=new ah(592144,40,100),this.camera=new ci(28,e/t,.1,200),this.camera.position.set(8,40,8),this.camera.up.set(0,0,-1),this.renderer=new H1({antialias:!0}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.setSize(e,t),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=E_,this.container.appendChild(this.renderer.domElement),this.scene.add(new zS(16777215,.65));const r=new Lg(16774632,1.1);r.position.set(2,4,1.5),r.castShadow=!0,r.shadow.mapSize.setScalar(1024),r.shadow.camera.near=.1,r.shadow.camera.far=120,r.shadow.camera.left=r.shadow.camera.bottom=-30,r.shadow.camera.right=r.shadow.camera.top=30,this.scene.add(r);const o=new Lg(13691135,.35);o.position.set(-2,2,-2),this.scene.add(o);const l=new WS(40,40,1579040,1315864);l.position.set(.5,-.501,.5),this.scene.add(l),this.controls=new G1(this.camera,this.renderer.domElement),this.controls.target.set(8,0,8),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.minDistance=3,this.controls.maxDistance=120,this.controls.minPolarAngle=0,this.controls.maxPolarAngle=Math.PI/2-.02,this.controls.mouseButtons={LEFT:null,MIDDLE:Br.DOLLY,RIGHT:Br.ROTATE},this.controls.update(),this.raycaster=new GS,this._geo=new rr(1,1,1),this._specialGeos={door_h:new rr(.9,.9,.1),door_v:new rr(.1,.9,.9)},this._mats={};for(const[u,f]of Object.entries(sa))this._mats[u]=new bg({color:f.hex});this._ro=new ResizeObserver(()=>{const u=this.container.clientWidth,f=this.container.clientHeight;this.camera.aspect=u/f,this.camera.updateProjectionMatrix(),this.renderer.setSize(u,f)}),this._ro.observe(this.container)}_initFloor(){const e=new dc({visible:!1,side:Ei});this._floorMesh=new Jn(new ua(200,200),e),this._floorMesh.rotation.x=-Math.PI/2,this._floorMesh.position.y=-.5,this.scene.add(this._floorMesh)}_initGhost(){const e=new bg({color:13215820,transparent:!0,opacity:.35,depthWrite:!1});this._ghost=new Jn(this._geo,e),this._ghost.visible=!1,this.scene.add(this._ghost);const t=new fc({color:13215820,opacity:.8,transparent:!0});this._ghostEdge=new j_(new PS(new rr(1.02,1.02,1.02)),t),this._ghostEdge.visible=!1,this.scene.add(this._ghostEdge)}_initRectGhost(){const e=new dc({color:13215820,transparent:!0,opacity:.18,side:Ei,depthWrite:!1});this._rectFill=new Jn(new ua(1,1),e),this._rectFill.rotation.x=-Math.PI/2,this._rectFill.visible=!1,this.scene.add(this._rectFill);const t=new Qn;t.setAttribute("position",new wi(new Float32Array(12),3)),this._rectLine=new RS(t,new fc({color:13215820})),this._rectLine.visible=!1,this.scene.add(this._rectLine)}_initEvents(){const e=this.renderer.domElement;e.style.cursor="crosshair",e.addEventListener("pointermove",t=>this._onMove(t)),e.addEventListener("pointerdown",t=>this._onDown(t)),e.addEventListener("pointerup",t=>this._onUp(t)),e.addEventListener("pointerleave",()=>{this._mouse.down=!1,this._panState=null,this._ghost.visible=!1,this._ghostEdge.visible=!1,this._rectState&&(this._rectState=null,this._hideRectGhost())}),e.addEventListener("contextmenu",t=>t.preventDefault()),this._spaceKeyDown=t=>{t.code!=="Space"||t.repeat||t.target.tagName==="INPUT"||(t.preventDefault(),!this._spacePanning&&this.tool!=="pan"&&(this._spacePanning=!0,e.style.cursor="grab"))},this._spaceKeyUp=t=>{t.code!=="Space"||!this._spacePanning||(this._spacePanning=!1,this._panState=null,e.style.cursor=this.tool==="pan"?"grab":"crosshair")},window.addEventListener("keydown",this._spaceKeyDown),window.addEventListener("keyup",this._spaceKeyUp)}_setRay(e,t){const r=this.renderer.domElement.getBoundingClientRect(),o=(e-r.left)/r.width*2-1,l=-((t-r.top)/r.height)*2+1;this.raycaster.setFromCamera({x:o,y:l},this.camera)}_pick(e,t){this._setRay(e,t);const r=this.raycaster.intersectObjects([...this._meshes.values()]);if(r.length>0){const l=r[0],u=l.object.userData.pos,f=l.face.normal;return{type:"block",place:{x:u.x+Math.round(f.x),y:u.y+Math.round(f.y),z:u.z+Math.round(f.z)},remove:u}}const o=this.raycaster.intersectObject(this._floorMesh);if(o.length>0){const l=o[0].point;return{type:"ground",place:{x:Math.round(l.x),y:this.paintY,z:Math.round(l.z)},remove:null}}return null}_pickGround(e,t){this._setRay(e,t);const r=this.raycaster.intersectObject(this._floorMesh);if(r.length>0){const o=r[0].point;return{x:Math.round(o.x),z:Math.round(o.z)}}return null}_pickRectStart(e,t){this._setRay(e,t);const r=this.raycaster.intersectObjects([...this._meshes.values()]);if(r.length>0){const l=r[0];if(l.face.normal.y>.5){const f=l.object.userData.pos;return{x:Math.round(l.point.x),z:Math.round(l.point.z),y:f.y+1}}}const o=this.raycaster.intersectObject(this._floorMesh);if(o.length>0){const l=o[0].point;return{x:Math.round(l.x),z:Math.round(l.z),y:this.paintY}}return null}_pickY0(e,t){this._setRay(e,t);const{origin:r,direction:o}=this.raycaster.ray;if(Math.abs(o.y)<1e-4)return null;const l=-r.y/o.y;return l<0?null:new $(r.x+o.x*l,0,r.z+o.z*l)}_startPan(e,t){const r=this._pickY0(e,t);r&&(this._panState={worldStart:r,camStart:this.camera.position.clone(),targetStart:this.controls.target.clone()})}_doPan(e,t){if(!this._panState)return;const r=this._pickY0(e,t);if(!r)return;const o=this._panState.worldStart.clone().sub(r);o.y=0,this.camera.position.copy(this._panState.camStart).add(o),this.controls.target.copy(this._panState.targetStart).add(o),this.controls.update()}_isPanMode(){return this._spacePanning||this.tool==="pan"}_onMove(e){if(this._isPanMode()){this._ghost.visible=this._ghostEdge.visible=!1,this._doPan(e.clientX,e.clientY);return}if(this.tool==="rect"){this._onMoveRect(e);return}const t=this._pick(e.clientX,e.clientY),r=this.tool==="erase";if(t){const o=r?t.remove:t.place;if(o?(this._ghost.position.set(o.x,o.y,o.z),this._ghostEdge.position.copy(this._ghost.position),this._ghost.material.color.setHex(r?12603456:13215820),this._ghost.visible=!0,this._ghostEdge.visible=!0):this._ghost.visible=this._ghostEdge.visible=!1,this._mouse.down){const l=r?t.remove:t.place;if(l){const u=`${l.x},${l.y},${l.z}`;u!==this._mouse.lastKey&&(this._mouse.lastKey=u,r&&t.remove?this._doRemove(t.remove):r||this._doPlace(t.place))}}}else this._ghost.visible=this._ghostEdge.visible=!1}_onMoveRect(e){if(this._rectState){const t=this._pickGround(e.clientX,e.clientY);if(!t)return;this._rectState.endX=t.x,this._rectState.endZ=t.z,this._ghost.visible=this._ghostEdge.visible=!1,this._updateRectGhost()}else{const t=this._pickRectStart(e.clientX,e.clientY);if(!t){this._ghost.visible=this._ghostEdge.visible=!1;return}this._ghost.position.set(t.x,t.y,t.z),this._ghostEdge.position.copy(this._ghost.position),this._ghost.material.color.setHex(13215820),this._ghost.visible=!0,this._ghostEdge.visible=!0,this._hideRectGhost()}}_onDown(e){if(e.button!==0)return;if(this._isPanMode()){this._startPan(e.clientX,e.clientY),this.renderer.domElement.style.cursor="grabbing";return}if(this.tool==="rect"){const o=this._pickRectStart(e.clientX,e.clientY);o&&(this._mouse.down=!0,this._rectState={startX:o.x,startZ:o.z,endX:o.x,endZ:o.z,y:o.y},this._ghost.visible=this._ghostEdge.visible=!1,this._updateRectGhost());return}this._mouse.down=!0,this._mouse.lastKey=null;const t=this._pick(e.clientX,e.clientY),r=this.tool==="erase";t&&(r&&t.remove?(this._doRemove(t.remove),this._mouse.lastKey=`${t.remove.x},${t.remove.y},${t.remove.z}`):!r&&t.place&&(this._doPlace(t.place),this._mouse.lastKey=`${t.place.x},${t.place.y},${t.place.z}`))}_onUp(e){if(e.button===0){if(this._isPanMode()){this._panState=null,this.renderer.domElement.style.cursor="grab";return}if(this.tool==="rect"&&this._rectState){const{startX:t,startZ:r,endX:o,endZ:l,y:u}=this._rectState;this._commitRect(t,r,o,l,u),this._rectState=null,this._hideRectGhost(),this._mouse.down=!1;return}this._mouse.down=!1,this._mouse.lastKey=null}}_updateRectGhost(){if(!this._rectState)return;const{startX:e,startZ:t,endX:r,endZ:o}=this._rectState,l=Math.min(e,r),u=Math.max(e,r),f=Math.min(t,o),h=Math.max(t,o),p=(l+u)/2,v=(f+h)/2,x=(this._rectState.y??this.paintY)+.502;this._rectFill.scale.set(u-l+1,h-f+1,1),this._rectFill.position.set(p,x,v),this._rectFill.visible=!0;const g=this._rectLine.geometry.attributes.position;g.setXYZ(0,l-.5,x+.001,f-.5),g.setXYZ(1,u+.5,x+.001,f-.5),g.setXYZ(2,u+.5,x+.001,h+.5),g.setXYZ(3,l-.5,x+.001,h+.5),g.needsUpdate=!0,this._rectLine.visible=!0}_hideRectGhost(){this._rectFill.visible=!1,this._rectLine.visible=!1}_key(e){return`${e.x},${e.y},${e.z}`}_doPlace(e){if(!e)return;const t=this._key(e),r=this._voxels.get(t)??null;r!==this.block&&(this._applyPlace(e,this.block),this._undoStack.push({op:"place",pos:{...e},newB:this.block,oldB:r}),this._redoStack=[],this._notifyHistory())}_doRemove(e){if(!e)return;const t=this._key(e),r=this._voxels.get(t);r&&(this._applyRemove(e),this._undoStack.push({op:"remove",pos:{...e},oldB:r}),this._redoStack=[],this._notifyHistory())}_commitRect(e,t,r,o,l=this.paintY){const u=Math.min(e,r),f=Math.max(e,r),h=Math.min(t,o),p=Math.max(t,o),v=[];for(let x=u;x<=f;x++)for(let g=h;g<=p;g++){const S={x,y:l,z:g},M=this._key(S),b=this._voxels.get(M)??null;b!==this.block&&(v.push({op:"place",pos:{...S},newB:this.block,oldB:b}),this._applyPlace(S,this.block))}v.length>0&&(this._undoStack.push({op:"batch",cmds:v}),this._redoStack=[],this._notifyHistory())}_applyPlace(e,t){var f;const r=this._key(e);this._meshes.has(r)&&(this.scene.remove(this._meshes.get(r)),this._meshes.delete(r));const o=(f=sa[t])==null?void 0:f.geo,l=o&&this._specialGeos[o]||this._geo,u=new Jn(l,this._mats[t]);u.position.set(e.x,e.y,e.z),u.userData.pos={...e},u.castShadow=!0,u.receiveShadow=!0,this.scene.add(u),this._voxels.set(r,t),this._meshes.set(r,u)}_applyRemove(e){const t=this._key(e);this._meshes.has(t)&&(this.scene.remove(this._meshes.get(t)),this._meshes.delete(t)),this._voxels.delete(t)}_notifyHistory(){var e,t;(t=(e=this.callbacks).onHistory)==null||t.call(e,{canUndo:this._undoStack.length>0,canRedo:this._redoStack.length>0})}_undoCmd(e){if(e.op==="batch")for(const t of[...e.cmds].reverse())this._undoCmd(t);else e.op==="place"?e.oldB?this._applyPlace(e.pos,e.oldB):this._applyRemove(e.pos):this._applyPlace(e.pos,e.oldB)}_redoCmd(e){if(e.op==="batch")for(const t of e.cmds)this._redoCmd(t);else e.op==="place"?this._applyPlace(e.pos,e.newB):this._applyRemove(e.pos)}undo(){if(!this._undoStack.length)return;const e=this._undoStack.pop();this._redoStack.push(e),this._undoCmd(e),this._notifyHistory()}redo(){if(!this._redoStack.length)return;const e=this._redoStack.pop();this._undoStack.push(e),this._redoCmd(e),this._notifyHistory()}setTool(e){e!=="rect"&&this._rectState&&(this._rectState=null,this._hideRectGhost()),this.tool=e,this.renderer.domElement.style.cursor=e==="pan"?"grab":"crosshair"}setBlock(e){this.block=e}setPaintY(e){this.paintY=e}clear(){for(const e of this._meshes.values())this.scene.remove(e);this._meshes.clear(),this._voxels.clear(),this._undoStack=[],this._redoStack=[],this._rectState=null,this._panState=null,this._hideRectGhost(),this._notifyHistory()}toJSON(){const e=[];for(const[t,r]of this._voxels){const[o,l,u]=t.split(",").map(Number);e.push({x:o,y:l,z:u,b:r})}return{voxels:e}}fromJSON(e){this.clear();for(const{x:t,y:r,z:o,b:l}of(e==null?void 0:e.voxels)??[])sa[l]&&this._applyPlace({x:t,y:r,z:o},l);this._notifyHistory()}_loop(){this._rafId=requestAnimationFrame(()=>this._loop()),this.controls.update(),this.renderer.render(this.scene,this.camera)}destroy(){cancelAnimationFrame(this._rafId),this._ro.disconnect(),this.controls.dispose(),this.renderer.dispose(),this.renderer.domElement.remove(),window.removeEventListener("keydown",this._spaceKeyDown),window.removeEventListener("keyup",this._spaceKeyUp)}}const rb=7;function sb(){var I,z;const[s]=_c(),e=s.get("id")||null,t=ge.useRef(null),r=ge.useRef(null),o=ge.useRef(null),[l,u]=ge.useState("rect"),[f,h]=ge.useState("floor"),[p,v]=ge.useState(0),[x,g]=ge.useState(!1),[S,M]=ge.useState(!1);ge.useEffect(()=>{const T=new ib(t.current,{onHistory:({canUndo:B,canRedo:F})=>{g(B),M(F)}});if(r.current=T,e){const B=Yf(e);B&&(o.current&&(o.current.value=B.name||"Untitled Map"),T.fromJSON(B.data||{}))}const D=B=>{if(B.target.tagName==="INPUT")return;const F=B.ctrlKey||B.metaKey;F&&B.key==="z"&&(B.preventDefault(),T.undo()),F&&(B.key==="y"||B.shiftKey&&B.key==="Z")&&(B.preventDefault(),T.redo()),F||((B.key==="p"||B.key==="P")&&(u("paint"),T.setTool("paint")),(B.key==="e"||B.key==="E")&&(u("erase"),T.setTool("erase")),(B.key==="r"||B.key==="R")&&(u("rect"),T.setTool("rect")),(B.key==="h"||B.key==="H")&&(u("pan"),T.setTool("pan")))};return window.addEventListener("keydown",D),()=>{window.removeEventListener("keydown",D),T.destroy(),r.current=null}},[e]);function b(T){var D;u(T),(D=r.current)==null||D.setTool(T)}function _(T){var D;h(T),(D=r.current)==null||D.setBlock(T)}function y(T){var D;v(T),(D=r.current)==null||D.setPaintY(T)}function C(){var B;const T=r.current;if(!T)return;const D=((B=o.current)==null?void 0:B.value.trim())||"Untitled Map";M_({id:e||crypto.randomUUID(),type:"voxel3d",name:D,data:T.toJSON()})}function L(){var q;const T=r.current;if(!T)return;const D=((q=o.current)==null?void 0:q.value.trim())||"Untitled Map",B=JSON.stringify({name:D,...T.toJSON()},null,2),F=document.createElement("a");F.href=URL.createObjectURL(new Blob([B],{type:"application/json"})),F.download=`${D.replace(/\s+/g,"_")}.json`,F.click()}function P(){const T=document.createElement("input");T.type="file",T.accept=".json",T.onchange=D=>{const B=D.target.files[0];if(!B)return;const F=new FileReader;F.onload=q=>{var ae;try{const de=JSON.parse(q.target.result);de.name&&o.current&&(o.current.value=de.name),(ae=r.current)==null||ae.fromJSON(de)}catch{alert("Invalid JSON file")}},F.readAsText(B)},T.click()}function k(){var T;confirm("Start a new map? Unsaved changes will be lost.")&&(o.current&&(o.current.value="Untitled Map"),(T=r.current)==null||T.clear())}return R.jsxs("div",{id:"v3d-root",children:[R.jsxs("div",{id:"v3d-header",children:[R.jsx("h1",{children:"3D Battlemap"}),R.jsx("div",{className:"v3d-sep"}),R.jsx("span",{className:"v3d-label",children:"Name"}),R.jsx("input",{ref:o,type:"text",defaultValue:"Untitled Map",maxLength:60,spellCheck:!1}),R.jsx("div",{className:"v3d-sep"}),R.jsx("button",{className:"v3d-btn warn",onClick:k,children:"New"}),R.jsx("button",{className:"v3d-btn",onClick:P,children:"Load JSON"}),R.jsx("button",{className:"v3d-btn primary",onClick:C,children:"Save"}),R.jsx("button",{className:"v3d-btn",onClick:L,children:"Export JSON"})]}),R.jsxs("div",{id:"v3d-toolbar",children:[R.jsxs("button",{className:`v3d-tool${l==="pan"?" active":""}`,onClick:()=>b("pan"),children:["Pan ",R.jsx("span",{className:"v3d-key",children:"H"})]}),R.jsx("div",{className:"v3d-tbsep"}),R.jsxs("button",{className:`v3d-tool${l==="paint"?" active":""}`,onClick:()=>b("paint"),children:["Paint ",R.jsx("span",{className:"v3d-key",children:"P"})]}),R.jsxs("button",{className:`v3d-tool${l==="rect"?" active":""}`,onClick:()=>b("rect"),children:["Rect ",R.jsx("span",{className:"v3d-key",children:"R"})]}),R.jsxs("button",{className:`v3d-tool${l==="erase"?" active":""}`,onClick:()=>b("erase"),children:["Erase ",R.jsx("span",{className:"v3d-key",children:"E"})]}),R.jsx("div",{className:"v3d-tbsep"}),R.jsx("button",{className:"v3d-icon-btn",disabled:!x,onClick:()=>{var T;return(T=r.current)==null?void 0:T.undo()},children:"↩ Undo"}),R.jsx("button",{className:"v3d-icon-btn",disabled:!S,onClick:()=>{var T;return(T=r.current)==null?void 0:T.redo()},children:"↪ Redo"}),R.jsx("div",{className:"v3d-tbsep"}),R.jsx("span",{className:"v3d-label",children:"Height:"}),Array.from({length:rb+1},(T,D)=>R.jsxs("button",{className:`v3d-ylevel${p===D?" active":""}`,onClick:()=>y(D),title:`Place blocks at ${D*Vd}ft`,children:[D*Vd,"ft"]},D)),R.jsxs("span",{className:"v3d-scale-note",children:["1 block = ",Vd,"ft"]}),R.jsx("div",{className:"v3d-tbsep"}),R.jsxs("span",{className:"v3d-selected-block",children:[R.jsx("span",{className:"v3d-selected-swatch",style:{background:(I=sa[f])==null?void 0:I.color}}),(z=sa[f])==null?void 0:z.label]}),R.jsx("div",{id:"v3d-hint",children:"Space · Pan  |  Right-drag · Rotate  |  Scroll · Zoom"})]}),R.jsxs("div",{id:"v3d-main",children:[R.jsx("div",{id:"v3d-palette",children:nb.map(T=>{const D=Object.entries(sa).filter(([,B])=>B.cat===T);return D.length?R.jsxs("div",{children:[R.jsx("div",{className:"v3d-cat",children:T}),D.map(([B,F])=>R.jsxs("button",{className:`v3d-tile${f===B?" selected":""}`,onClick:()=>_(B),children:[R.jsx("span",{className:"v3d-swatch",style:{background:F.color}}),R.jsx("span",{className:"v3d-tile-label",children:F.label})]},B))]},T):null})}),R.jsx("div",{id:"v3d-canvas-wrap",ref:t})]})]})}const ab=[{to:"/",label:"Play"},{to:"/create",label:"Create"},{to:"/library",label:"Library"}];function ob(){const{pathname:s}=ha();return R.jsxs("nav",{style:{position:"fixed",top:0,left:0,right:0,padding:"8px 16px",background:"rgba(12,12,20,0.93)",borderBottom:"1px solid #3a3a50",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:200},children:[R.jsx("div",{style:{color:"#c9a84c",fontFamily:"Georgia, serif",fontSize:"1rem",letterSpacing:"0.15em"},children:"Hexcrawl"}),R.jsx("div",{style:{display:"flex",gap:8},children:ab.map(({to:e,label:t})=>{const r=s===e||e!=="/"&&s.startsWith(e);return R.jsx(sc,{to:e,style:{color:r?"#c9a84c":"#6a6050",background:r?"rgba(201,168,76,0.08)":"rgba(0,0,0,0.5)",border:`1px solid ${r?"#c9a84c":"#3a3a50"}`,borderRadius:4,padding:"4px 12px",textDecoration:"none",fontSize:"0.8rem",fontFamily:"Georgia, serif",transition:"color 0.12s, border-color 0.12s"},children:t},e)})})]})}function lb(){return R.jsxs(R.Fragment,{children:[R.jsx(ob,{}),R.jsx(Vx,{})]})}function cb(){return R.jsx(Jx,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:R.jsx(Wx,{children:R.jsxs(Mi,{element:R.jsx(lb,{}),children:[R.jsx(Mi,{path:"/",element:R.jsx(ny,{})}),R.jsx(Mi,{path:"/hexmap",element:R.jsx(iy,{})}),R.jsx(Mi,{path:"/article",element:R.jsx(Zm,{})}),R.jsx(Mi,{path:"/create",element:R.jsx(cy,{})}),R.jsx(Mi,{path:"/create/battlemap",element:R.jsx(ay,{})}),R.jsx(Mi,{path:"/create/article",element:R.jsx(Zm,{})}),R.jsx(Mi,{path:"/create/hexmap",element:R.jsx(Sy,{})}),R.jsx(Mi,{path:"/create/voxel3d",element:R.jsx(sb,{})}),R.jsx(Mi,{path:"/library",element:R.jsx(gy,{})})]})})})}$v.createRoot(document.getElementById("root")).render(R.jsx(ge.StrictMode,{children:R.jsx(cb,{})}));
