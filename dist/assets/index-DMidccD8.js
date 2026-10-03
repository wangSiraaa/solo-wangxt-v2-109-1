var w0=Object.defineProperty;var T0=(t,e,n)=>e in t?w0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var at=(t,e,n)=>T0(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function A0(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Eg={exports:{}},ic={},wg={exports:{}},qe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jo=Symbol.for("react.element"),C0=Symbol.for("react.portal"),R0=Symbol.for("react.fragment"),b0=Symbol.for("react.strict_mode"),P0=Symbol.for("react.profiler"),L0=Symbol.for("react.provider"),D0=Symbol.for("react.context"),N0=Symbol.for("react.forward_ref"),I0=Symbol.for("react.suspense"),U0=Symbol.for("react.memo"),F0=Symbol.for("react.lazy"),jh=Symbol.iterator;function O0(t){return t===null||typeof t!="object"?null:(t=jh&&t[jh]||t["@@iterator"],typeof t=="function"?t:null)}var Tg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ag=Object.assign,Cg={};function Bs(t,e,n){this.props=t,this.context=e,this.refs=Cg,this.updater=n||Tg}Bs.prototype.isReactComponent={};Bs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Bs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Rg(){}Rg.prototype=Bs.prototype;function wd(t,e,n){this.props=t,this.context=e,this.refs=Cg,this.updater=n||Tg}var Td=wd.prototype=new Rg;Td.constructor=wd;Ag(Td,Bs.prototype);Td.isPureReactComponent=!0;var Xh=Array.isArray,bg=Object.prototype.hasOwnProperty,Ad={current:null},Pg={key:!0,ref:!0,__self:!0,__source:!0};function Lg(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)bg.call(e,i)&&!Pg.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:jo,type:t,key:s,ref:o,props:r,_owner:Ad.current}}function k0(t,e){return{$$typeof:jo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Cd(t){return typeof t=="object"&&t!==null&&t.$$typeof===jo}function z0(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Yh=/\/+/g;function Lc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?z0(""+t.key):e.toString(36)}function qa(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case jo:case C0:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Lc(o,0):i,Xh(r)?(n="",t!=null&&(n=t.replace(Yh,"$&/")+"/"),qa(r,e,n,"",function(c){return c})):r!=null&&(Cd(r)&&(r=k0(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Yh,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Xh(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+Lc(s,a);o+=qa(s,e,n,l,r)}else if(l=O0(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+Lc(s,a++),o+=qa(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ra(t,e,n){if(t==null)return t;var i=[],r=0;return qa(t,i,"","",function(s){return e.call(n,s,r++)}),i}function B0(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var tn={current:null},Ka={transition:null},H0={ReactCurrentDispatcher:tn,ReactCurrentBatchConfig:Ka,ReactCurrentOwner:Ad};function Dg(){throw Error("act(...) is not supported in production builds of React.")}qe.Children={map:ra,forEach:function(t,e,n){ra(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ra(t,function(){e++}),e},toArray:function(t){return ra(t,function(e){return e})||[]},only:function(t){if(!Cd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};qe.Component=Bs;qe.Fragment=R0;qe.Profiler=P0;qe.PureComponent=wd;qe.StrictMode=b0;qe.Suspense=I0;qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=H0;qe.act=Dg;qe.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Ag({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Ad.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)bg.call(e,l)&&!Pg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:jo,type:t.type,key:r,ref:s,props:i,_owner:o}};qe.createContext=function(t){return t={$$typeof:D0,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:L0,_context:t},t.Consumer=t};qe.createElement=Lg;qe.createFactory=function(t){var e=Lg.bind(null,t);return e.type=t,e};qe.createRef=function(){return{current:null}};qe.forwardRef=function(t){return{$$typeof:N0,render:t}};qe.isValidElement=Cd;qe.lazy=function(t){return{$$typeof:F0,_payload:{_status:-1,_result:t},_init:B0}};qe.memo=function(t,e){return{$$typeof:U0,type:t,compare:e===void 0?null:e}};qe.startTransition=function(t){var e=Ka.transition;Ka.transition={};try{t()}finally{Ka.transition=e}};qe.unstable_act=Dg;qe.useCallback=function(t,e){return tn.current.useCallback(t,e)};qe.useContext=function(t){return tn.current.useContext(t)};qe.useDebugValue=function(){};qe.useDeferredValue=function(t){return tn.current.useDeferredValue(t)};qe.useEffect=function(t,e){return tn.current.useEffect(t,e)};qe.useId=function(){return tn.current.useId()};qe.useImperativeHandle=function(t,e,n){return tn.current.useImperativeHandle(t,e,n)};qe.useInsertionEffect=function(t,e){return tn.current.useInsertionEffect(t,e)};qe.useLayoutEffect=function(t,e){return tn.current.useLayoutEffect(t,e)};qe.useMemo=function(t,e){return tn.current.useMemo(t,e)};qe.useReducer=function(t,e,n){return tn.current.useReducer(t,e,n)};qe.useRef=function(t){return tn.current.useRef(t)};qe.useState=function(t){return tn.current.useState(t)};qe.useSyncExternalStore=function(t,e,n){return tn.current.useSyncExternalStore(t,e,n)};qe.useTransition=function(){return tn.current.useTransition()};qe.version="18.3.1";wg.exports=qe;var se=wg.exports;const V0=A0(se);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var G0=se,W0=Symbol.for("react.element"),j0=Symbol.for("react.fragment"),X0=Object.prototype.hasOwnProperty,Y0=G0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,$0={key:!0,ref:!0,__self:!0,__source:!0};function Ng(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)X0.call(e,i)&&!$0.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:W0,type:t,key:s,ref:o,props:r,_owner:Y0.current}}ic.Fragment=j0;ic.jsx=Ng;ic.jsxs=Ng;Eg.exports=ic;var P=Eg.exports,Bu={},Ig={exports:{}},xn={},Ug={exports:{}},Fg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(U,J){var ie=U.length;U.push(J);e:for(;0<ie;){var ce=ie-1>>>1,be=U[ce];if(0<r(be,J))U[ce]=J,U[ie]=be,ie=ce;else break e}}function n(U){return U.length===0?null:U[0]}function i(U){if(U.length===0)return null;var J=U[0],ie=U.pop();if(ie!==J){U[0]=ie;e:for(var ce=0,be=U.length,Be=be>>>1;ce<Be;){var K=2*(ce+1)-1,oe=U[K],Z=K+1,Q=U[Z];if(0>r(oe,ie))Z<be&&0>r(Q,oe)?(U[ce]=Q,U[Z]=ie,ce=Z):(U[ce]=oe,U[K]=ie,ce=K);else if(Z<be&&0>r(Q,ie))U[ce]=Q,U[Z]=ie,ce=Z;else break e}}return J}function r(U,J){var ie=U.sortIndex-J.sortIndex;return ie!==0?ie:U.id-J.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],f=1,d=null,h=3,p=!1,v=!1,y=!1,m=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function _(U){for(var J=n(c);J!==null;){if(J.callback===null)i(c);else if(J.startTime<=U)i(c),J.sortIndex=J.expirationTime,e(l,J);else break;J=n(c)}}function S(U){if(y=!1,_(U),!v)if(n(l)!==null)v=!0,X(D);else{var J=n(c);J!==null&&q(S,J.startTime-U)}}function D(U,J){v=!1,y&&(y=!1,u(C),C=-1),p=!0;var ie=h;try{for(_(J),d=n(l);d!==null&&(!(d.expirationTime>J)||U&&!E());){var ce=d.callback;if(typeof ce=="function"){d.callback=null,h=d.priorityLevel;var be=ce(d.expirationTime<=J);J=t.unstable_now(),typeof be=="function"?d.callback=be:d===n(l)&&i(l),_(J)}else i(l);d=n(l)}if(d!==null)var Be=!0;else{var K=n(c);K!==null&&q(S,K.startTime-J),Be=!1}return Be}finally{d=null,h=ie,p=!1}}var b=!1,T=null,C=-1,Y=5,x=-1;function E(){return!(t.unstable_now()-x<Y)}function N(){if(T!==null){var U=t.unstable_now();x=U;var J=!0;try{J=T(!0,U)}finally{J?H():(b=!1,T=null)}}else b=!1}var H;if(typeof g=="function")H=function(){g(N)};else if(typeof MessageChannel<"u"){var $=new MessageChannel,te=$.port2;$.port1.onmessage=N,H=function(){te.postMessage(null)}}else H=function(){m(N,0)};function X(U){T=U,b||(b=!0,H())}function q(U,J){C=m(function(){U(t.unstable_now())},J)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(U){U.callback=null},t.unstable_continueExecution=function(){v||p||(v=!0,X(D))},t.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Y=0<U?Math.floor(1e3/U):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(U){switch(h){case 1:case 2:case 3:var J=3;break;default:J=h}var ie=h;h=J;try{return U()}finally{h=ie}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(U,J){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var ie=h;h=U;try{return J()}finally{h=ie}},t.unstable_scheduleCallback=function(U,J,ie){var ce=t.unstable_now();switch(typeof ie=="object"&&ie!==null?(ie=ie.delay,ie=typeof ie=="number"&&0<ie?ce+ie:ce):ie=ce,U){case 1:var be=-1;break;case 2:be=250;break;case 5:be=1073741823;break;case 4:be=1e4;break;default:be=5e3}return be=ie+be,U={id:f++,callback:J,priorityLevel:U,startTime:ie,expirationTime:be,sortIndex:-1},ie>ce?(U.sortIndex=ie,e(c,U),n(l)===null&&U===n(c)&&(y?(u(C),C=-1):y=!0,q(S,ie-ce))):(U.sortIndex=be,e(l,U),v||p||(v=!0,X(D))),U},t.unstable_shouldYield=E,t.unstable_wrapCallback=function(U){var J=h;return function(){var ie=h;h=J;try{return U.apply(this,arguments)}finally{h=ie}}}})(Fg);Ug.exports=Fg;var q0=Ug.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var K0=se,_n=q0;function ae(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Og=new Set,To={};function Lr(t,e){Ts(t,e),Ts(t+"Capture",e)}function Ts(t,e){for(To[t]=e,t=0;t<e.length;t++)Og.add(e[t])}var vi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Hu=Object.prototype.hasOwnProperty,Z0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,$h={},qh={};function Q0(t){return Hu.call(qh,t)?!0:Hu.call($h,t)?!1:Z0.test(t)?qh[t]=!0:($h[t]=!0,!1)}function J0(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function ex(t,e,n,i){if(e===null||typeof e>"u"||J0(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function nn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Bt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Bt[t]=new nn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Bt[e]=new nn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Bt[t]=new nn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Bt[t]=new nn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Bt[t]=new nn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Bt[t]=new nn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Bt[t]=new nn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Bt[t]=new nn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Bt[t]=new nn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Rd=/[\-:]([a-z])/g;function bd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Rd,bd);Bt[e]=new nn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Rd,bd);Bt[e]=new nn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Rd,bd);Bt[e]=new nn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Bt[t]=new nn(t,1,!1,t.toLowerCase(),null,!1,!1)});Bt.xlinkHref=new nn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Bt[t]=new nn(t,1,!1,t.toLowerCase(),null,!0,!0)});function Pd(t,e,n,i){var r=Bt.hasOwnProperty(e)?Bt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(ex(e,n,r,i)&&(n=null),i||r===null?Q0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Mi=K0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sa=Symbol.for("react.element"),ns=Symbol.for("react.portal"),is=Symbol.for("react.fragment"),Ld=Symbol.for("react.strict_mode"),Vu=Symbol.for("react.profiler"),kg=Symbol.for("react.provider"),zg=Symbol.for("react.context"),Dd=Symbol.for("react.forward_ref"),Gu=Symbol.for("react.suspense"),Wu=Symbol.for("react.suspense_list"),Nd=Symbol.for("react.memo"),Di=Symbol.for("react.lazy"),Bg=Symbol.for("react.offscreen"),Kh=Symbol.iterator;function js(t){return t===null||typeof t!="object"?null:(t=Kh&&t[Kh]||t["@@iterator"],typeof t=="function"?t:null)}var xt=Object.assign,Dc;function lo(t){if(Dc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Dc=e&&e[1]||""}return`
`+Dc+t}var Nc=!1;function Ic(t,e){if(!t||Nc)return"";Nc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{Nc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?lo(t):""}function tx(t){switch(t.tag){case 5:return lo(t.type);case 16:return lo("Lazy");case 13:return lo("Suspense");case 19:return lo("SuspenseList");case 0:case 2:case 15:return t=Ic(t.type,!1),t;case 11:return t=Ic(t.type.render,!1),t;case 1:return t=Ic(t.type,!0),t;default:return""}}function ju(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case is:return"Fragment";case ns:return"Portal";case Vu:return"Profiler";case Ld:return"StrictMode";case Gu:return"Suspense";case Wu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case zg:return(t.displayName||"Context")+".Consumer";case kg:return(t._context.displayName||"Context")+".Provider";case Dd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Nd:return e=t.displayName||null,e!==null?e:ju(t.type)||"Memo";case Di:e=t._payload,t=t._init;try{return ju(t(e))}catch{}}return null}function nx(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ju(e);case 8:return e===Ld?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Ki(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Hg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function ix(t){var e=Hg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function oa(t){t._valueTracker||(t._valueTracker=ix(t))}function Vg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Hg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function vl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Xu(t,e){var n=e.checked;return xt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Zh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Ki(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Gg(t,e){e=e.checked,e!=null&&Pd(t,"checked",e,!1)}function Yu(t,e){Gg(t,e);var n=Ki(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?$u(t,e.type,n):e.hasOwnProperty("defaultValue")&&$u(t,e.type,Ki(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Qh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function $u(t,e,n){(e!=="number"||vl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var co=Array.isArray;function gs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Ki(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function qu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ae(91));return xt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Jh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ae(92));if(co(n)){if(1<n.length)throw Error(ae(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Ki(n)}}function Wg(t,e){var n=Ki(e.value),i=Ki(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function ep(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function jg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ku(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?jg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var aa,Xg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(aa=aa||document.createElement("div"),aa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=aa.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Ao(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var po={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rx=["Webkit","ms","Moz","O"];Object.keys(po).forEach(function(t){rx.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),po[e]=po[t]})});function Yg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||po.hasOwnProperty(t)&&po[t]?(""+e).trim():e+"px"}function $g(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Yg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var sx=xt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Zu(t,e){if(e){if(sx[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ae(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ae(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ae(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ae(62))}}function Qu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ju=null;function Id(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ef=null,vs=null,_s=null;function tp(t){if(t=$o(t)){if(typeof ef!="function")throw Error(ae(280));var e=t.stateNode;e&&(e=lc(e),ef(t.stateNode,t.type,e))}}function qg(t){vs?_s?_s.push(t):_s=[t]:vs=t}function Kg(){if(vs){var t=vs,e=_s;if(_s=vs=null,tp(t),e)for(t=0;t<e.length;t++)tp(e[t])}}function Zg(t,e){return t(e)}function Qg(){}var Uc=!1;function Jg(t,e,n){if(Uc)return t(e,n);Uc=!0;try{return Zg(t,e,n)}finally{Uc=!1,(vs!==null||_s!==null)&&(Qg(),Kg())}}function Co(t,e){var n=t.stateNode;if(n===null)return null;var i=lc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ae(231,e,typeof n));return n}var tf=!1;if(vi)try{var Xs={};Object.defineProperty(Xs,"passive",{get:function(){tf=!0}}),window.addEventListener("test",Xs,Xs),window.removeEventListener("test",Xs,Xs)}catch{tf=!1}function ox(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var mo=!1,_l=null,xl=!1,nf=null,ax={onError:function(t){mo=!0,_l=t}};function lx(t,e,n,i,r,s,o,a,l){mo=!1,_l=null,ox.apply(ax,arguments)}function cx(t,e,n,i,r,s,o,a,l){if(lx.apply(this,arguments),mo){if(mo){var c=_l;mo=!1,_l=null}else throw Error(ae(198));xl||(xl=!0,nf=c)}}function Dr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function ev(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function np(t){if(Dr(t)!==t)throw Error(ae(188))}function ux(t){var e=t.alternate;if(!e){if(e=Dr(t),e===null)throw Error(ae(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return np(r),t;if(s===i)return np(r),e;s=s.sibling}throw Error(ae(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(ae(189))}}if(n.alternate!==i)throw Error(ae(190))}if(n.tag!==3)throw Error(ae(188));return n.stateNode.current===n?t:e}function tv(t){return t=ux(t),t!==null?nv(t):null}function nv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=nv(t);if(e!==null)return e;t=t.sibling}return null}var iv=_n.unstable_scheduleCallback,ip=_n.unstable_cancelCallback,fx=_n.unstable_shouldYield,dx=_n.unstable_requestPaint,Tt=_n.unstable_now,hx=_n.unstable_getCurrentPriorityLevel,Ud=_n.unstable_ImmediatePriority,rv=_n.unstable_UserBlockingPriority,yl=_n.unstable_NormalPriority,px=_n.unstable_LowPriority,sv=_n.unstable_IdlePriority,rc=null,Qn=null;function mx(t){if(Qn&&typeof Qn.onCommitFiberRoot=="function")try{Qn.onCommitFiberRoot(rc,t,void 0,(t.current.flags&128)===128)}catch{}}var Gn=Math.clz32?Math.clz32:_x,gx=Math.log,vx=Math.LN2;function _x(t){return t>>>=0,t===0?32:31-(gx(t)/vx|0)|0}var la=64,ca=4194304;function uo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Sl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=uo(a):(s&=o,s!==0&&(i=uo(s)))}else o=n&~r,o!==0?i=uo(o):s!==0&&(i=uo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Gn(e),r=1<<n,i|=t[n],e&=~r;return i}function xx(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function yx(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Gn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=xx(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function rf(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function ov(){var t=la;return la<<=1,!(la&4194240)&&(la=64),t}function Fc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Xo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Gn(e),t[e]=n}function Sx(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Gn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Fd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Gn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var st=0;function av(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var lv,Od,cv,uv,fv,sf=!1,ua=[],Bi=null,Hi=null,Vi=null,Ro=new Map,bo=new Map,Ui=[],Mx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function rp(t,e){switch(t){case"focusin":case"focusout":Bi=null;break;case"dragenter":case"dragleave":Hi=null;break;case"mouseover":case"mouseout":Vi=null;break;case"pointerover":case"pointerout":Ro.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":bo.delete(e.pointerId)}}function Ys(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=$o(e),e!==null&&Od(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Ex(t,e,n,i,r){switch(e){case"focusin":return Bi=Ys(Bi,t,e,n,i,r),!0;case"dragenter":return Hi=Ys(Hi,t,e,n,i,r),!0;case"mouseover":return Vi=Ys(Vi,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Ro.set(s,Ys(Ro.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,bo.set(s,Ys(bo.get(s)||null,t,e,n,i,r)),!0}return!1}function dv(t){var e=vr(t.target);if(e!==null){var n=Dr(e);if(n!==null){if(e=n.tag,e===13){if(e=ev(n),e!==null){t.blockedOn=e,fv(t.priority,function(){cv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Za(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=of(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Ju=i,n.target.dispatchEvent(i),Ju=null}else return e=$o(n),e!==null&&Od(e),t.blockedOn=n,!1;e.shift()}return!0}function sp(t,e,n){Za(t)&&n.delete(e)}function wx(){sf=!1,Bi!==null&&Za(Bi)&&(Bi=null),Hi!==null&&Za(Hi)&&(Hi=null),Vi!==null&&Za(Vi)&&(Vi=null),Ro.forEach(sp),bo.forEach(sp)}function $s(t,e){t.blockedOn===e&&(t.blockedOn=null,sf||(sf=!0,_n.unstable_scheduleCallback(_n.unstable_NormalPriority,wx)))}function Po(t){function e(r){return $s(r,t)}if(0<ua.length){$s(ua[0],t);for(var n=1;n<ua.length;n++){var i=ua[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Bi!==null&&$s(Bi,t),Hi!==null&&$s(Hi,t),Vi!==null&&$s(Vi,t),Ro.forEach(e),bo.forEach(e),n=0;n<Ui.length;n++)i=Ui[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Ui.length&&(n=Ui[0],n.blockedOn===null);)dv(n),n.blockedOn===null&&Ui.shift()}var xs=Mi.ReactCurrentBatchConfig,Ml=!0;function Tx(t,e,n,i){var r=st,s=xs.transition;xs.transition=null;try{st=1,kd(t,e,n,i)}finally{st=r,xs.transition=s}}function Ax(t,e,n,i){var r=st,s=xs.transition;xs.transition=null;try{st=4,kd(t,e,n,i)}finally{st=r,xs.transition=s}}function kd(t,e,n,i){if(Ml){var r=of(t,e,n,i);if(r===null)Xc(t,e,i,El,n),rp(t,i);else if(Ex(r,t,e,n,i))i.stopPropagation();else if(rp(t,i),e&4&&-1<Mx.indexOf(t)){for(;r!==null;){var s=$o(r);if(s!==null&&lv(s),s=of(t,e,n,i),s===null&&Xc(t,e,i,El,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Xc(t,e,i,null,n)}}var El=null;function of(t,e,n,i){if(El=null,t=Id(i),t=vr(t),t!==null)if(e=Dr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=ev(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return El=t,null}function hv(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(hx()){case Ud:return 1;case rv:return 4;case yl:case px:return 16;case sv:return 536870912;default:return 16}default:return 16}}var ki=null,zd=null,Qa=null;function pv(){if(Qa)return Qa;var t,e=zd,n=e.length,i,r="value"in ki?ki.value:ki.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Qa=r.slice(t,1<i?1-i:void 0)}function Ja(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function fa(){return!0}function op(){return!1}function yn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?fa:op,this.isPropagationStopped=op,this}return xt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=fa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=fa)},persist:function(){},isPersistent:fa}),e}var Hs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bd=yn(Hs),Yo=xt({},Hs,{view:0,detail:0}),Cx=yn(Yo),Oc,kc,qs,sc=xt({},Yo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==qs&&(qs&&t.type==="mousemove"?(Oc=t.screenX-qs.screenX,kc=t.screenY-qs.screenY):kc=Oc=0,qs=t),Oc)},movementY:function(t){return"movementY"in t?t.movementY:kc}}),ap=yn(sc),Rx=xt({},sc,{dataTransfer:0}),bx=yn(Rx),Px=xt({},Yo,{relatedTarget:0}),zc=yn(Px),Lx=xt({},Hs,{animationName:0,elapsedTime:0,pseudoElement:0}),Dx=yn(Lx),Nx=xt({},Hs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Ix=yn(Nx),Ux=xt({},Hs,{data:0}),lp=yn(Ux),Fx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ox={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function zx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=kx[t])?!!e[t]:!1}function Hd(){return zx}var Bx=xt({},Yo,{key:function(t){if(t.key){var e=Fx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ja(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ox[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hd,charCode:function(t){return t.type==="keypress"?Ja(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ja(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Hx=yn(Bx),Vx=xt({},sc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),cp=yn(Vx),Gx=xt({},Yo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hd}),Wx=yn(Gx),jx=xt({},Hs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xx=yn(jx),Yx=xt({},sc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),$x=yn(Yx),qx=[9,13,27,32],Vd=vi&&"CompositionEvent"in window,go=null;vi&&"documentMode"in document&&(go=document.documentMode);var Kx=vi&&"TextEvent"in window&&!go,mv=vi&&(!Vd||go&&8<go&&11>=go),up=" ",fp=!1;function gv(t,e){switch(t){case"keyup":return qx.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function vv(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var rs=!1;function Zx(t,e){switch(t){case"compositionend":return vv(e);case"keypress":return e.which!==32?null:(fp=!0,up);case"textInput":return t=e.data,t===up&&fp?null:t;default:return null}}function Qx(t,e){if(rs)return t==="compositionend"||!Vd&&gv(t,e)?(t=pv(),Qa=zd=ki=null,rs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return mv&&e.locale!=="ko"?null:e.data;default:return null}}var Jx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Jx[t.type]:e==="textarea"}function _v(t,e,n,i){qg(i),e=wl(e,"onChange"),0<e.length&&(n=new Bd("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var vo=null,Lo=null;function ey(t){bv(t,0)}function oc(t){var e=as(t);if(Vg(e))return t}function ty(t,e){if(t==="change")return e}var xv=!1;if(vi){var Bc;if(vi){var Hc="oninput"in document;if(!Hc){var hp=document.createElement("div");hp.setAttribute("oninput","return;"),Hc=typeof hp.oninput=="function"}Bc=Hc}else Bc=!1;xv=Bc&&(!document.documentMode||9<document.documentMode)}function pp(){vo&&(vo.detachEvent("onpropertychange",yv),Lo=vo=null)}function yv(t){if(t.propertyName==="value"&&oc(Lo)){var e=[];_v(e,Lo,t,Id(t)),Jg(ey,e)}}function ny(t,e,n){t==="focusin"?(pp(),vo=e,Lo=n,vo.attachEvent("onpropertychange",yv)):t==="focusout"&&pp()}function iy(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return oc(Lo)}function ry(t,e){if(t==="click")return oc(e)}function sy(t,e){if(t==="input"||t==="change")return oc(e)}function oy(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Xn=typeof Object.is=="function"?Object.is:oy;function Do(t,e){if(Xn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Hu.call(e,r)||!Xn(t[r],e[r]))return!1}return!0}function mp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function gp(t,e){var n=mp(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=mp(n)}}function Sv(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Sv(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Mv(){for(var t=window,e=vl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=vl(t.document)}return e}function Gd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function ay(t){var e=Mv(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Sv(n.ownerDocument.documentElement,n)){if(i!==null&&Gd(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=gp(n,s);var o=gp(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var ly=vi&&"documentMode"in document&&11>=document.documentMode,ss=null,af=null,_o=null,lf=!1;function vp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;lf||ss==null||ss!==vl(i)||(i=ss,"selectionStart"in i&&Gd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),_o&&Do(_o,i)||(_o=i,i=wl(af,"onSelect"),0<i.length&&(e=new Bd("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=ss)))}function da(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var os={animationend:da("Animation","AnimationEnd"),animationiteration:da("Animation","AnimationIteration"),animationstart:da("Animation","AnimationStart"),transitionend:da("Transition","TransitionEnd")},Vc={},Ev={};vi&&(Ev=document.createElement("div").style,"AnimationEvent"in window||(delete os.animationend.animation,delete os.animationiteration.animation,delete os.animationstart.animation),"TransitionEvent"in window||delete os.transitionend.transition);function ac(t){if(Vc[t])return Vc[t];if(!os[t])return t;var e=os[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Ev)return Vc[t]=e[n];return t}var wv=ac("animationend"),Tv=ac("animationiteration"),Av=ac("animationstart"),Cv=ac("transitionend"),Rv=new Map,_p="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function er(t,e){Rv.set(t,e),Lr(e,[t])}for(var Gc=0;Gc<_p.length;Gc++){var Wc=_p[Gc],cy=Wc.toLowerCase(),uy=Wc[0].toUpperCase()+Wc.slice(1);er(cy,"on"+uy)}er(wv,"onAnimationEnd");er(Tv,"onAnimationIteration");er(Av,"onAnimationStart");er("dblclick","onDoubleClick");er("focusin","onFocus");er("focusout","onBlur");er(Cv,"onTransitionEnd");Ts("onMouseEnter",["mouseout","mouseover"]);Ts("onMouseLeave",["mouseout","mouseover"]);Ts("onPointerEnter",["pointerout","pointerover"]);Ts("onPointerLeave",["pointerout","pointerover"]);Lr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Lr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Lr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Lr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Lr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Lr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var fo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),fy=new Set("cancel close invalid load scroll toggle".split(" ").concat(fo));function xp(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,cx(i,e,void 0,t),t.currentTarget=null}function bv(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;xp(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;xp(r,a,c),s=l}}}if(xl)throw t=nf,xl=!1,nf=null,t}function ut(t,e){var n=e[hf];n===void 0&&(n=e[hf]=new Set);var i=t+"__bubble";n.has(i)||(Pv(e,t,2,!1),n.add(i))}function jc(t,e,n){var i=0;e&&(i|=4),Pv(n,t,i,e)}var ha="_reactListening"+Math.random().toString(36).slice(2);function No(t){if(!t[ha]){t[ha]=!0,Og.forEach(function(n){n!=="selectionchange"&&(fy.has(n)||jc(n,!1,t),jc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ha]||(e[ha]=!0,jc("selectionchange",!1,e))}}function Pv(t,e,n,i){switch(hv(e)){case 1:var r=Tx;break;case 4:r=Ax;break;default:r=kd}n=r.bind(null,e,n,t),r=void 0,!tf||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Xc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=vr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Jg(function(){var c=s,f=Id(n),d=[];e:{var h=Rv.get(t);if(h!==void 0){var p=Bd,v=t;switch(t){case"keypress":if(Ja(n)===0)break e;case"keydown":case"keyup":p=Hx;break;case"focusin":v="focus",p=zc;break;case"focusout":v="blur",p=zc;break;case"beforeblur":case"afterblur":p=zc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=ap;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=bx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=Wx;break;case wv:case Tv:case Av:p=Dx;break;case Cv:p=Xx;break;case"scroll":p=Cx;break;case"wheel":p=$x;break;case"copy":case"cut":case"paste":p=Ix;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=cp}var y=(e&4)!==0,m=!y&&t==="scroll",u=y?h!==null?h+"Capture":null:h;y=[];for(var g=c,_;g!==null;){_=g;var S=_.stateNode;if(_.tag===5&&S!==null&&(_=S,u!==null&&(S=Co(g,u),S!=null&&y.push(Io(g,S,_)))),m)break;g=g.return}0<y.length&&(h=new p(h,v,null,n,f),d.push({event:h,listeners:y}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",h&&n!==Ju&&(v=n.relatedTarget||n.fromElement)&&(vr(v)||v[_i]))break e;if((p||h)&&(h=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,p?(v=n.relatedTarget||n.toElement,p=c,v=v?vr(v):null,v!==null&&(m=Dr(v),v!==m||v.tag!==5&&v.tag!==6)&&(v=null)):(p=null,v=c),p!==v)){if(y=ap,S="onMouseLeave",u="onMouseEnter",g="mouse",(t==="pointerout"||t==="pointerover")&&(y=cp,S="onPointerLeave",u="onPointerEnter",g="pointer"),m=p==null?h:as(p),_=v==null?h:as(v),h=new y(S,g+"leave",p,n,f),h.target=m,h.relatedTarget=_,S=null,vr(f)===c&&(y=new y(u,g+"enter",v,n,f),y.target=_,y.relatedTarget=m,S=y),m=S,p&&v)t:{for(y=p,u=v,g=0,_=y;_;_=Ur(_))g++;for(_=0,S=u;S;S=Ur(S))_++;for(;0<g-_;)y=Ur(y),g--;for(;0<_-g;)u=Ur(u),_--;for(;g--;){if(y===u||u!==null&&y===u.alternate)break t;y=Ur(y),u=Ur(u)}y=null}else y=null;p!==null&&yp(d,h,p,y,!1),v!==null&&m!==null&&yp(d,m,v,y,!0)}}e:{if(h=c?as(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var D=ty;else if(dp(h))if(xv)D=sy;else{D=iy;var b=ny}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(D=ry);if(D&&(D=D(t,c))){_v(d,D,n,f);break e}b&&b(t,h,c),t==="focusout"&&(b=h._wrapperState)&&b.controlled&&h.type==="number"&&$u(h,"number",h.value)}switch(b=c?as(c):window,t){case"focusin":(dp(b)||b.contentEditable==="true")&&(ss=b,af=c,_o=null);break;case"focusout":_o=af=ss=null;break;case"mousedown":lf=!0;break;case"contextmenu":case"mouseup":case"dragend":lf=!1,vp(d,n,f);break;case"selectionchange":if(ly)break;case"keydown":case"keyup":vp(d,n,f)}var T;if(Vd)e:{switch(t){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else rs?gv(t,n)&&(C="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(mv&&n.locale!=="ko"&&(rs||C!=="onCompositionStart"?C==="onCompositionEnd"&&rs&&(T=pv()):(ki=f,zd="value"in ki?ki.value:ki.textContent,rs=!0)),b=wl(c,C),0<b.length&&(C=new lp(C,t,null,n,f),d.push({event:C,listeners:b}),T?C.data=T:(T=vv(n),T!==null&&(C.data=T)))),(T=Kx?Zx(t,n):Qx(t,n))&&(c=wl(c,"onBeforeInput"),0<c.length&&(f=new lp("onBeforeInput","beforeinput",null,n,f),d.push({event:f,listeners:c}),f.data=T))}bv(d,e)})}function Io(t,e,n){return{instance:t,listener:e,currentTarget:n}}function wl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Co(t,n),s!=null&&i.unshift(Io(t,s,r)),s=Co(t,e),s!=null&&i.push(Io(t,s,r))),t=t.return}return i}function Ur(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function yp(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Co(n,s),l!=null&&o.unshift(Io(n,l,a))):r||(l=Co(n,s),l!=null&&o.push(Io(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var dy=/\r\n?/g,hy=/\u0000|\uFFFD/g;function Sp(t){return(typeof t=="string"?t:""+t).replace(dy,`
`).replace(hy,"")}function pa(t,e,n){if(e=Sp(e),Sp(t)!==e&&n)throw Error(ae(425))}function Tl(){}var cf=null,uf=null;function ff(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var df=typeof setTimeout=="function"?setTimeout:void 0,py=typeof clearTimeout=="function"?clearTimeout:void 0,Mp=typeof Promise=="function"?Promise:void 0,my=typeof queueMicrotask=="function"?queueMicrotask:typeof Mp<"u"?function(t){return Mp.resolve(null).then(t).catch(gy)}:df;function gy(t){setTimeout(function(){throw t})}function Yc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Po(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Po(e)}function Gi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Ep(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Vs=Math.random().toString(36).slice(2),Zn="__reactFiber$"+Vs,Uo="__reactProps$"+Vs,_i="__reactContainer$"+Vs,hf="__reactEvents$"+Vs,vy="__reactListeners$"+Vs,_y="__reactHandles$"+Vs;function vr(t){var e=t[Zn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[_i]||n[Zn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Ep(t);t!==null;){if(n=t[Zn])return n;t=Ep(t)}return e}t=n,n=t.parentNode}return null}function $o(t){return t=t[Zn]||t[_i],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function as(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ae(33))}function lc(t){return t[Uo]||null}var pf=[],ls=-1;function tr(t){return{current:t}}function dt(t){0>ls||(t.current=pf[ls],pf[ls]=null,ls--)}function lt(t,e){ls++,pf[ls]=t.current,t.current=e}var Zi={},Xt=tr(Zi),on=tr(!1),wr=Zi;function As(t,e){var n=t.type.contextTypes;if(!n)return Zi;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function an(t){return t=t.childContextTypes,t!=null}function Al(){dt(on),dt(Xt)}function wp(t,e,n){if(Xt.current!==Zi)throw Error(ae(168));lt(Xt,e),lt(on,n)}function Lv(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ae(108,nx(t)||"Unknown",r));return xt({},n,i)}function Cl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Zi,wr=Xt.current,lt(Xt,t),lt(on,on.current),!0}function Tp(t,e,n){var i=t.stateNode;if(!i)throw Error(ae(169));n?(t=Lv(t,e,wr),i.__reactInternalMemoizedMergedChildContext=t,dt(on),dt(Xt),lt(Xt,t)):dt(on),lt(on,n)}var li=null,cc=!1,$c=!1;function Dv(t){li===null?li=[t]:li.push(t)}function xy(t){cc=!0,Dv(t)}function nr(){if(!$c&&li!==null){$c=!0;var t=0,e=st;try{var n=li;for(st=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}li=null,cc=!1}catch(r){throw li!==null&&(li=li.slice(t+1)),iv(Ud,nr),r}finally{st=e,$c=!1}}return null}var cs=[],us=0,Rl=null,bl=0,En=[],wn=0,Tr=null,ui=1,fi="";function fr(t,e){cs[us++]=bl,cs[us++]=Rl,Rl=t,bl=e}function Nv(t,e,n){En[wn++]=ui,En[wn++]=fi,En[wn++]=Tr,Tr=t;var i=ui;t=fi;var r=32-Gn(i)-1;i&=~(1<<r),n+=1;var s=32-Gn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,ui=1<<32-Gn(e)+r|n<<r|i,fi=s+t}else ui=1<<s|n<<r|i,fi=t}function Wd(t){t.return!==null&&(fr(t,1),Nv(t,1,0))}function jd(t){for(;t===Rl;)Rl=cs[--us],cs[us]=null,bl=cs[--us],cs[us]=null;for(;t===Tr;)Tr=En[--wn],En[wn]=null,fi=En[--wn],En[wn]=null,ui=En[--wn],En[wn]=null}var vn=null,gn=null,mt=!1,zn=null;function Iv(t,e){var n=Cn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Ap(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,vn=t,gn=Gi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,vn=t,gn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Tr!==null?{id:ui,overflow:fi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Cn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,vn=t,gn=null,!0):!1;default:return!1}}function mf(t){return(t.mode&1)!==0&&(t.flags&128)===0}function gf(t){if(mt){var e=gn;if(e){var n=e;if(!Ap(t,e)){if(mf(t))throw Error(ae(418));e=Gi(n.nextSibling);var i=vn;e&&Ap(t,e)?Iv(i,n):(t.flags=t.flags&-4097|2,mt=!1,vn=t)}}else{if(mf(t))throw Error(ae(418));t.flags=t.flags&-4097|2,mt=!1,vn=t}}}function Cp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;vn=t}function ma(t){if(t!==vn)return!1;if(!mt)return Cp(t),mt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!ff(t.type,t.memoizedProps)),e&&(e=gn)){if(mf(t))throw Uv(),Error(ae(418));for(;e;)Iv(t,e),e=Gi(e.nextSibling)}if(Cp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ae(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){gn=Gi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}gn=null}}else gn=vn?Gi(t.stateNode.nextSibling):null;return!0}function Uv(){for(var t=gn;t;)t=Gi(t.nextSibling)}function Cs(){gn=vn=null,mt=!1}function Xd(t){zn===null?zn=[t]:zn.push(t)}var yy=Mi.ReactCurrentBatchConfig;function Ks(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ae(309));var i=n.stateNode}if(!i)throw Error(ae(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(ae(284));if(!n._owner)throw Error(ae(290,t))}return t}function ga(t,e){throw t=Object.prototype.toString.call(e),Error(ae(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Rp(t){var e=t._init;return e(t._payload)}function Fv(t){function e(u,g){if(t){var _=u.deletions;_===null?(u.deletions=[g],u.flags|=16):_.push(g)}}function n(u,g){if(!t)return null;for(;g!==null;)e(u,g),g=g.sibling;return null}function i(u,g){for(u=new Map;g!==null;)g.key!==null?u.set(g.key,g):u.set(g.index,g),g=g.sibling;return u}function r(u,g){return u=Yi(u,g),u.index=0,u.sibling=null,u}function s(u,g,_){return u.index=_,t?(_=u.alternate,_!==null?(_=_.index,_<g?(u.flags|=2,g):_):(u.flags|=2,g)):(u.flags|=1048576,g)}function o(u){return t&&u.alternate===null&&(u.flags|=2),u}function a(u,g,_,S){return g===null||g.tag!==6?(g=tu(_,u.mode,S),g.return=u,g):(g=r(g,_),g.return=u,g)}function l(u,g,_,S){var D=_.type;return D===is?f(u,g,_.props.children,S,_.key):g!==null&&(g.elementType===D||typeof D=="object"&&D!==null&&D.$$typeof===Di&&Rp(D)===g.type)?(S=r(g,_.props),S.ref=Ks(u,g,_),S.return=u,S):(S=ol(_.type,_.key,_.props,null,u.mode,S),S.ref=Ks(u,g,_),S.return=u,S)}function c(u,g,_,S){return g===null||g.tag!==4||g.stateNode.containerInfo!==_.containerInfo||g.stateNode.implementation!==_.implementation?(g=nu(_,u.mode,S),g.return=u,g):(g=r(g,_.children||[]),g.return=u,g)}function f(u,g,_,S,D){return g===null||g.tag!==7?(g=Er(_,u.mode,S,D),g.return=u,g):(g=r(g,_),g.return=u,g)}function d(u,g,_){if(typeof g=="string"&&g!==""||typeof g=="number")return g=tu(""+g,u.mode,_),g.return=u,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case sa:return _=ol(g.type,g.key,g.props,null,u.mode,_),_.ref=Ks(u,null,g),_.return=u,_;case ns:return g=nu(g,u.mode,_),g.return=u,g;case Di:var S=g._init;return d(u,S(g._payload),_)}if(co(g)||js(g))return g=Er(g,u.mode,_,null),g.return=u,g;ga(u,g)}return null}function h(u,g,_,S){var D=g!==null?g.key:null;if(typeof _=="string"&&_!==""||typeof _=="number")return D!==null?null:a(u,g,""+_,S);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case sa:return _.key===D?l(u,g,_,S):null;case ns:return _.key===D?c(u,g,_,S):null;case Di:return D=_._init,h(u,g,D(_._payload),S)}if(co(_)||js(_))return D!==null?null:f(u,g,_,S,null);ga(u,_)}return null}function p(u,g,_,S,D){if(typeof S=="string"&&S!==""||typeof S=="number")return u=u.get(_)||null,a(g,u,""+S,D);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case sa:return u=u.get(S.key===null?_:S.key)||null,l(g,u,S,D);case ns:return u=u.get(S.key===null?_:S.key)||null,c(g,u,S,D);case Di:var b=S._init;return p(u,g,_,b(S._payload),D)}if(co(S)||js(S))return u=u.get(_)||null,f(g,u,S,D,null);ga(g,S)}return null}function v(u,g,_,S){for(var D=null,b=null,T=g,C=g=0,Y=null;T!==null&&C<_.length;C++){T.index>C?(Y=T,T=null):Y=T.sibling;var x=h(u,T,_[C],S);if(x===null){T===null&&(T=Y);break}t&&T&&x.alternate===null&&e(u,T),g=s(x,g,C),b===null?D=x:b.sibling=x,b=x,T=Y}if(C===_.length)return n(u,T),mt&&fr(u,C),D;if(T===null){for(;C<_.length;C++)T=d(u,_[C],S),T!==null&&(g=s(T,g,C),b===null?D=T:b.sibling=T,b=T);return mt&&fr(u,C),D}for(T=i(u,T);C<_.length;C++)Y=p(T,u,C,_[C],S),Y!==null&&(t&&Y.alternate!==null&&T.delete(Y.key===null?C:Y.key),g=s(Y,g,C),b===null?D=Y:b.sibling=Y,b=Y);return t&&T.forEach(function(E){return e(u,E)}),mt&&fr(u,C),D}function y(u,g,_,S){var D=js(_);if(typeof D!="function")throw Error(ae(150));if(_=D.call(_),_==null)throw Error(ae(151));for(var b=D=null,T=g,C=g=0,Y=null,x=_.next();T!==null&&!x.done;C++,x=_.next()){T.index>C?(Y=T,T=null):Y=T.sibling;var E=h(u,T,x.value,S);if(E===null){T===null&&(T=Y);break}t&&T&&E.alternate===null&&e(u,T),g=s(E,g,C),b===null?D=E:b.sibling=E,b=E,T=Y}if(x.done)return n(u,T),mt&&fr(u,C),D;if(T===null){for(;!x.done;C++,x=_.next())x=d(u,x.value,S),x!==null&&(g=s(x,g,C),b===null?D=x:b.sibling=x,b=x);return mt&&fr(u,C),D}for(T=i(u,T);!x.done;C++,x=_.next())x=p(T,u,C,x.value,S),x!==null&&(t&&x.alternate!==null&&T.delete(x.key===null?C:x.key),g=s(x,g,C),b===null?D=x:b.sibling=x,b=x);return t&&T.forEach(function(N){return e(u,N)}),mt&&fr(u,C),D}function m(u,g,_,S){if(typeof _=="object"&&_!==null&&_.type===is&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case sa:e:{for(var D=_.key,b=g;b!==null;){if(b.key===D){if(D=_.type,D===is){if(b.tag===7){n(u,b.sibling),g=r(b,_.props.children),g.return=u,u=g;break e}}else if(b.elementType===D||typeof D=="object"&&D!==null&&D.$$typeof===Di&&Rp(D)===b.type){n(u,b.sibling),g=r(b,_.props),g.ref=Ks(u,b,_),g.return=u,u=g;break e}n(u,b);break}else e(u,b);b=b.sibling}_.type===is?(g=Er(_.props.children,u.mode,S,_.key),g.return=u,u=g):(S=ol(_.type,_.key,_.props,null,u.mode,S),S.ref=Ks(u,g,_),S.return=u,u=S)}return o(u);case ns:e:{for(b=_.key;g!==null;){if(g.key===b)if(g.tag===4&&g.stateNode.containerInfo===_.containerInfo&&g.stateNode.implementation===_.implementation){n(u,g.sibling),g=r(g,_.children||[]),g.return=u,u=g;break e}else{n(u,g);break}else e(u,g);g=g.sibling}g=nu(_,u.mode,S),g.return=u,u=g}return o(u);case Di:return b=_._init,m(u,g,b(_._payload),S)}if(co(_))return v(u,g,_,S);if(js(_))return y(u,g,_,S);ga(u,_)}return typeof _=="string"&&_!==""||typeof _=="number"?(_=""+_,g!==null&&g.tag===6?(n(u,g.sibling),g=r(g,_),g.return=u,u=g):(n(u,g),g=tu(_,u.mode,S),g.return=u,u=g),o(u)):n(u,g)}return m}var Rs=Fv(!0),Ov=Fv(!1),Pl=tr(null),Ll=null,fs=null,Yd=null;function $d(){Yd=fs=Ll=null}function qd(t){var e=Pl.current;dt(Pl),t._currentValue=e}function vf(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function ys(t,e){Ll=t,Yd=fs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(sn=!0),t.firstContext=null)}function Pn(t){var e=t._currentValue;if(Yd!==t)if(t={context:t,memoizedValue:e,next:null},fs===null){if(Ll===null)throw Error(ae(308));fs=t,Ll.dependencies={lanes:0,firstContext:t}}else fs=fs.next=t;return e}var _r=null;function Kd(t){_r===null?_r=[t]:_r.push(t)}function kv(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Kd(e)):(n.next=r.next,r.next=n),e.interleaved=n,xi(t,i)}function xi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Ni=!1;function Zd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function zv(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function mi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Wi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Qe&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,xi(t,n)}return r=i.interleaved,r===null?(e.next=e,Kd(i)):(e.next=r.next,r.next=e),i.interleaved=e,xi(t,n)}function el(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Fd(t,n)}}function bp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Dl(t,e,n,i){var r=t.updateQueue;Ni=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var f=t.alternate;f!==null&&(f=f.updateQueue,a=f.lastBaseUpdate,a!==o&&(a===null?f.firstBaseUpdate=c:a.next=c,f.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,f=c=l=null,a=s;do{var h=a.lane,p=a.eventTime;if((i&h)===h){f!==null&&(f=f.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var v=t,y=a;switch(h=e,p=n,y.tag){case 1:if(v=y.payload,typeof v=="function"){d=v.call(p,d,h);break e}d=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=y.payload,h=typeof v=="function"?v.call(p,d,h):v,h==null)break e;d=xt({},d,h);break e;case 2:Ni=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},f===null?(c=f=p,l=d):f=f.next=p,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(f===null&&(l=d),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Cr|=o,t.lanes=o,t.memoizedState=d}}function Pp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ae(191,r));r.call(i)}}}var qo={},Jn=tr(qo),Fo=tr(qo),Oo=tr(qo);function xr(t){if(t===qo)throw Error(ae(174));return t}function Qd(t,e){switch(lt(Oo,e),lt(Fo,t),lt(Jn,qo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Ku(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Ku(e,t)}dt(Jn),lt(Jn,e)}function bs(){dt(Jn),dt(Fo),dt(Oo)}function Bv(t){xr(Oo.current);var e=xr(Jn.current),n=Ku(e,t.type);e!==n&&(lt(Fo,t),lt(Jn,n))}function Jd(t){Fo.current===t&&(dt(Jn),dt(Fo))}var gt=tr(0);function Nl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var qc=[];function eh(){for(var t=0;t<qc.length;t++)qc[t]._workInProgressVersionPrimary=null;qc.length=0}var tl=Mi.ReactCurrentDispatcher,Kc=Mi.ReactCurrentBatchConfig,Ar=0,vt=null,bt=null,Ut=null,Il=!1,xo=!1,ko=0,Sy=0;function Ht(){throw Error(ae(321))}function th(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Xn(t[n],e[n]))return!1;return!0}function nh(t,e,n,i,r,s){if(Ar=s,vt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,tl.current=t===null||t.memoizedState===null?Ty:Ay,t=n(i,r),xo){s=0;do{if(xo=!1,ko=0,25<=s)throw Error(ae(301));s+=1,Ut=bt=null,e.updateQueue=null,tl.current=Cy,t=n(i,r)}while(xo)}if(tl.current=Ul,e=bt!==null&&bt.next!==null,Ar=0,Ut=bt=vt=null,Il=!1,e)throw Error(ae(300));return t}function ih(){var t=ko!==0;return ko=0,t}function $n(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ut===null?vt.memoizedState=Ut=t:Ut=Ut.next=t,Ut}function Ln(){if(bt===null){var t=vt.alternate;t=t!==null?t.memoizedState:null}else t=bt.next;var e=Ut===null?vt.memoizedState:Ut.next;if(e!==null)Ut=e,bt=t;else{if(t===null)throw Error(ae(310));bt=t,t={memoizedState:bt.memoizedState,baseState:bt.baseState,baseQueue:bt.baseQueue,queue:bt.queue,next:null},Ut===null?vt.memoizedState=Ut=t:Ut=Ut.next=t}return Ut}function zo(t,e){return typeof e=="function"?e(t):e}function Zc(t){var e=Ln(),n=e.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=t;var i=bt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var f=c.lane;if((Ar&f)===f)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var d={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,vt.lanes|=f,Cr|=f}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,Xn(i,e.memoizedState)||(sn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,vt.lanes|=s,Cr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Qc(t){var e=Ln(),n=e.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Xn(s,e.memoizedState)||(sn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Hv(){}function Vv(t,e){var n=vt,i=Ln(),r=e(),s=!Xn(i.memoizedState,r);if(s&&(i.memoizedState=r,sn=!0),i=i.queue,rh(jv.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Ut!==null&&Ut.memoizedState.tag&1){if(n.flags|=2048,Bo(9,Wv.bind(null,n,i,r,e),void 0,null),Ft===null)throw Error(ae(349));Ar&30||Gv(n,e,r)}return r}function Gv(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=vt.updateQueue,e===null?(e={lastEffect:null,stores:null},vt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Wv(t,e,n,i){e.value=n,e.getSnapshot=i,Xv(e)&&Yv(t)}function jv(t,e,n){return n(function(){Xv(e)&&Yv(t)})}function Xv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Xn(t,n)}catch{return!0}}function Yv(t){var e=xi(t,1);e!==null&&Wn(e,t,1,-1)}function Lp(t){var e=$n();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:zo,lastRenderedState:t},e.queue=t,t=t.dispatch=wy.bind(null,vt,t),[e.memoizedState,t]}function Bo(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=vt.updateQueue,e===null?(e={lastEffect:null,stores:null},vt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function $v(){return Ln().memoizedState}function nl(t,e,n,i){var r=$n();vt.flags|=t,r.memoizedState=Bo(1|e,n,void 0,i===void 0?null:i)}function uc(t,e,n,i){var r=Ln();i=i===void 0?null:i;var s=void 0;if(bt!==null){var o=bt.memoizedState;if(s=o.destroy,i!==null&&th(i,o.deps)){r.memoizedState=Bo(e,n,s,i);return}}vt.flags|=t,r.memoizedState=Bo(1|e,n,s,i)}function Dp(t,e){return nl(8390656,8,t,e)}function rh(t,e){return uc(2048,8,t,e)}function qv(t,e){return uc(4,2,t,e)}function Kv(t,e){return uc(4,4,t,e)}function Zv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Qv(t,e,n){return n=n!=null?n.concat([t]):null,uc(4,4,Zv.bind(null,e,t),n)}function sh(){}function Jv(t,e){var n=Ln();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&th(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function e_(t,e){var n=Ln();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&th(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function t_(t,e,n){return Ar&21?(Xn(n,e)||(n=ov(),vt.lanes|=n,Cr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,sn=!0),t.memoizedState=n)}function My(t,e){var n=st;st=n!==0&&4>n?n:4,t(!0);var i=Kc.transition;Kc.transition={};try{t(!1),e()}finally{st=n,Kc.transition=i}}function n_(){return Ln().memoizedState}function Ey(t,e,n){var i=Xi(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},i_(t))r_(e,n);else if(n=kv(t,e,n,i),n!==null){var r=Jt();Wn(n,t,i,r),s_(n,e,i)}}function wy(t,e,n){var i=Xi(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(i_(t))r_(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Xn(a,o)){var l=e.interleaved;l===null?(r.next=r,Kd(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=kv(t,e,r,i),n!==null&&(r=Jt(),Wn(n,t,i,r),s_(n,e,i))}}function i_(t){var e=t.alternate;return t===vt||e!==null&&e===vt}function r_(t,e){xo=Il=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function s_(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Fd(t,n)}}var Ul={readContext:Pn,useCallback:Ht,useContext:Ht,useEffect:Ht,useImperativeHandle:Ht,useInsertionEffect:Ht,useLayoutEffect:Ht,useMemo:Ht,useReducer:Ht,useRef:Ht,useState:Ht,useDebugValue:Ht,useDeferredValue:Ht,useTransition:Ht,useMutableSource:Ht,useSyncExternalStore:Ht,useId:Ht,unstable_isNewReconciler:!1},Ty={readContext:Pn,useCallback:function(t,e){return $n().memoizedState=[t,e===void 0?null:e],t},useContext:Pn,useEffect:Dp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,nl(4194308,4,Zv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return nl(4194308,4,t,e)},useInsertionEffect:function(t,e){return nl(4,2,t,e)},useMemo:function(t,e){var n=$n();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=$n();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Ey.bind(null,vt,t),[i.memoizedState,t]},useRef:function(t){var e=$n();return t={current:t},e.memoizedState=t},useState:Lp,useDebugValue:sh,useDeferredValue:function(t){return $n().memoizedState=t},useTransition:function(){var t=Lp(!1),e=t[0];return t=My.bind(null,t[1]),$n().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=vt,r=$n();if(mt){if(n===void 0)throw Error(ae(407));n=n()}else{if(n=e(),Ft===null)throw Error(ae(349));Ar&30||Gv(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Dp(jv.bind(null,i,s,t),[t]),i.flags|=2048,Bo(9,Wv.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=$n(),e=Ft.identifierPrefix;if(mt){var n=fi,i=ui;n=(i&~(1<<32-Gn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=ko++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Sy++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Ay={readContext:Pn,useCallback:Jv,useContext:Pn,useEffect:rh,useImperativeHandle:Qv,useInsertionEffect:qv,useLayoutEffect:Kv,useMemo:e_,useReducer:Zc,useRef:$v,useState:function(){return Zc(zo)},useDebugValue:sh,useDeferredValue:function(t){var e=Ln();return t_(e,bt.memoizedState,t)},useTransition:function(){var t=Zc(zo)[0],e=Ln().memoizedState;return[t,e]},useMutableSource:Hv,useSyncExternalStore:Vv,useId:n_,unstable_isNewReconciler:!1},Cy={readContext:Pn,useCallback:Jv,useContext:Pn,useEffect:rh,useImperativeHandle:Qv,useInsertionEffect:qv,useLayoutEffect:Kv,useMemo:e_,useReducer:Qc,useRef:$v,useState:function(){return Qc(zo)},useDebugValue:sh,useDeferredValue:function(t){var e=Ln();return bt===null?e.memoizedState=t:t_(e,bt.memoizedState,t)},useTransition:function(){var t=Qc(zo)[0],e=Ln().memoizedState;return[t,e]},useMutableSource:Hv,useSyncExternalStore:Vv,useId:n_,unstable_isNewReconciler:!1};function On(t,e){if(t&&t.defaultProps){e=xt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function _f(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:xt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var fc={isMounted:function(t){return(t=t._reactInternals)?Dr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=Jt(),r=Xi(t),s=mi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Wi(t,s,r),e!==null&&(Wn(e,t,r,i),el(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=Jt(),r=Xi(t),s=mi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Wi(t,s,r),e!==null&&(Wn(e,t,r,i),el(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Jt(),i=Xi(t),r=mi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Wi(t,r,i),e!==null&&(Wn(e,t,i,n),el(e,t,i))}};function Np(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Do(n,i)||!Do(r,s):!0}function o_(t,e,n){var i=!1,r=Zi,s=e.contextType;return typeof s=="object"&&s!==null?s=Pn(s):(r=an(e)?wr:Xt.current,i=e.contextTypes,s=(i=i!=null)?As(t,r):Zi),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=fc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Ip(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&fc.enqueueReplaceState(e,e.state,null)}function xf(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Zd(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Pn(s):(s=an(e)?wr:Xt.current,r.context=As(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(_f(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&fc.enqueueReplaceState(r,r.state,null),Dl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Ps(t,e){try{var n="",i=e;do n+=tx(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Jc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function yf(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Ry=typeof WeakMap=="function"?WeakMap:Map;function a_(t,e,n){n=mi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Ol||(Ol=!0,Pf=i),yf(t,e)},n}function l_(t,e,n){n=mi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){yf(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){yf(t,e),typeof i!="function"&&(ji===null?ji=new Set([this]):ji.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Up(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Ry;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Vy.bind(null,t,e,n),e.then(t,t))}function Fp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Op(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=mi(-1,1),e.tag=2,Wi(n,e,1))),n.lanes|=1),t)}var by=Mi.ReactCurrentOwner,sn=!1;function Kt(t,e,n,i){e.child=t===null?Ov(e,null,n,i):Rs(e,t.child,n,i)}function kp(t,e,n,i,r){n=n.render;var s=e.ref;return ys(e,r),i=nh(t,e,n,i,s,r),n=ih(),t!==null&&!sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,yi(t,e,r)):(mt&&n&&Wd(e),e.flags|=1,Kt(t,e,i,r),e.child)}function zp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!hh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,c_(t,e,s,i,r)):(t=ol(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Do,n(o,i)&&t.ref===e.ref)return yi(t,e,r)}return e.flags|=1,t=Yi(s,i),t.ref=e.ref,t.return=e,e.child=t}function c_(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Do(s,i)&&t.ref===e.ref)if(sn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(sn=!0);else return e.lanes=t.lanes,yi(t,e,r)}return Sf(t,e,n,i,r)}function u_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},lt(hs,mn),mn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,lt(hs,mn),mn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,lt(hs,mn),mn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,lt(hs,mn),mn|=i;return Kt(t,e,r,n),e.child}function f_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Sf(t,e,n,i,r){var s=an(n)?wr:Xt.current;return s=As(e,s),ys(e,r),n=nh(t,e,n,i,s,r),i=ih(),t!==null&&!sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,yi(t,e,r)):(mt&&i&&Wd(e),e.flags|=1,Kt(t,e,n,r),e.child)}function Bp(t,e,n,i,r){if(an(n)){var s=!0;Cl(e)}else s=!1;if(ys(e,r),e.stateNode===null)il(t,e),o_(e,n,i),xf(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Pn(c):(c=an(n)?wr:Xt.current,c=As(e,c));var f=n.getDerivedStateFromProps,d=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&Ip(e,o,i,c),Ni=!1;var h=e.memoizedState;o.state=h,Dl(e,i,o,r),l=e.memoizedState,a!==i||h!==l||on.current||Ni?(typeof f=="function"&&(_f(e,n,f,i),l=e.memoizedState),(a=Ni||Np(e,n,a,i,h,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,zv(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:On(e.type,a),o.props=c,d=e.pendingProps,h=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Pn(l):(l=an(n)?wr:Xt.current,l=As(e,l));var p=n.getDerivedStateFromProps;(f=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||h!==l)&&Ip(e,o,i,l),Ni=!1,h=e.memoizedState,o.state=h,Dl(e,i,o,r);var v=e.memoizedState;a!==d||h!==v||on.current||Ni?(typeof p=="function"&&(_f(e,n,p,i),v=e.memoizedState),(c=Ni||Np(e,n,c,i,h,v,l)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,v,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,v,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),o.props=i,o.state=v,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Mf(t,e,n,i,s,r)}function Mf(t,e,n,i,r,s){f_(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&Tp(e,n,!1),yi(t,e,s);i=e.stateNode,by.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Rs(e,t.child,null,s),e.child=Rs(e,null,a,s)):Kt(t,e,a,s),e.memoizedState=i.state,r&&Tp(e,n,!0),e.child}function d_(t){var e=t.stateNode;e.pendingContext?wp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&wp(t,e.context,!1),Qd(t,e.containerInfo)}function Hp(t,e,n,i,r){return Cs(),Xd(r),e.flags|=256,Kt(t,e,n,i),e.child}var Ef={dehydrated:null,treeContext:null,retryLane:0};function wf(t){return{baseLanes:t,cachePool:null,transitions:null}}function h_(t,e,n){var i=e.pendingProps,r=gt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),lt(gt,r&1),t===null)return gf(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=pc(o,i,0,null),t=Er(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=wf(n),e.memoizedState=Ef,t):oh(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return Py(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Yi(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Yi(a,s):(s=Er(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?wf(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Ef,i}return s=t.child,t=s.sibling,i=Yi(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function oh(t,e){return e=pc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function va(t,e,n,i){return i!==null&&Xd(i),Rs(e,t.child,null,n),t=oh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Py(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Jc(Error(ae(422))),va(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=pc({mode:"visible",children:i.children},r,0,null),s=Er(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Rs(e,t.child,null,o),e.child.memoizedState=wf(o),e.memoizedState=Ef,s);if(!(e.mode&1))return va(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ae(419)),i=Jc(s,i,void 0),va(t,e,o,i)}if(a=(o&t.childLanes)!==0,sn||a){if(i=Ft,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,xi(t,r),Wn(i,t,r,-1))}return dh(),i=Jc(Error(ae(421))),va(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Gy.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,gn=Gi(r.nextSibling),vn=e,mt=!0,zn=null,t!==null&&(En[wn++]=ui,En[wn++]=fi,En[wn++]=Tr,ui=t.id,fi=t.overflow,Tr=e),e=oh(e,i.children),e.flags|=4096,e)}function Vp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),vf(t.return,e,n)}function eu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function p_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Kt(t,e,i.children,n),i=gt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Vp(t,n,e);else if(t.tag===19)Vp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(lt(gt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Nl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),eu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Nl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}eu(e,!0,n,null,s);break;case"together":eu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function il(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function yi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Cr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ae(153));if(e.child!==null){for(t=e.child,n=Yi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Yi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Ly(t,e,n){switch(e.tag){case 3:d_(e),Cs();break;case 5:Bv(e);break;case 1:an(e.type)&&Cl(e);break;case 4:Qd(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;lt(Pl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(lt(gt,gt.current&1),e.flags|=128,null):n&e.child.childLanes?h_(t,e,n):(lt(gt,gt.current&1),t=yi(t,e,n),t!==null?t.sibling:null);lt(gt,gt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return p_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),lt(gt,gt.current),i)break;return null;case 22:case 23:return e.lanes=0,u_(t,e,n)}return yi(t,e,n)}var m_,Tf,g_,v_;m_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Tf=function(){};g_=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,xr(Jn.current);var s=null;switch(n){case"input":r=Xu(t,r),i=Xu(t,i),s=[];break;case"select":r=xt({},r,{value:void 0}),i=xt({},i,{value:void 0}),s=[];break;case"textarea":r=qu(t,r),i=qu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Tl)}Zu(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(To.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(To.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ut("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};v_=function(t,e,n,i){n!==i&&(e.flags|=4)};function Zs(t,e){if(!mt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Vt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Dy(t,e,n){var i=e.pendingProps;switch(jd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Vt(e),null;case 1:return an(e.type)&&Al(),Vt(e),null;case 3:return i=e.stateNode,bs(),dt(on),dt(Xt),eh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(ma(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,zn!==null&&(Nf(zn),zn=null))),Tf(t,e),Vt(e),null;case 5:Jd(e);var r=xr(Oo.current);if(n=e.type,t!==null&&e.stateNode!=null)g_(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ae(166));return Vt(e),null}if(t=xr(Jn.current),ma(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Zn]=e,i[Uo]=s,t=(e.mode&1)!==0,n){case"dialog":ut("cancel",i),ut("close",i);break;case"iframe":case"object":case"embed":ut("load",i);break;case"video":case"audio":for(r=0;r<fo.length;r++)ut(fo[r],i);break;case"source":ut("error",i);break;case"img":case"image":case"link":ut("error",i),ut("load",i);break;case"details":ut("toggle",i);break;case"input":Zh(i,s),ut("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ut("invalid",i);break;case"textarea":Jh(i,s),ut("invalid",i)}Zu(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&pa(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&pa(i.textContent,a,t),r=["children",""+a]):To.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ut("scroll",i)}switch(n){case"input":oa(i),Qh(i,s,!0);break;case"textarea":oa(i),ep(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Tl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=jg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[Zn]=e,t[Uo]=i,m_(t,e,!1,!1),e.stateNode=t;e:{switch(o=Qu(n,i),n){case"dialog":ut("cancel",t),ut("close",t),r=i;break;case"iframe":case"object":case"embed":ut("load",t),r=i;break;case"video":case"audio":for(r=0;r<fo.length;r++)ut(fo[r],t);r=i;break;case"source":ut("error",t),r=i;break;case"img":case"image":case"link":ut("error",t),ut("load",t),r=i;break;case"details":ut("toggle",t),r=i;break;case"input":Zh(t,i),r=Xu(t,i),ut("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=xt({},i,{value:void 0}),ut("invalid",t);break;case"textarea":Jh(t,i),r=qu(t,i),ut("invalid",t);break;default:r=i}Zu(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?$g(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Xg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ao(t,l):typeof l=="number"&&Ao(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(To.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ut("scroll",t):l!=null&&Pd(t,s,l,o))}switch(n){case"input":oa(t),Qh(t,i,!1);break;case"textarea":oa(t),ep(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Ki(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?gs(t,!!i.multiple,s,!1):i.defaultValue!=null&&gs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Tl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Vt(e),null;case 6:if(t&&e.stateNode!=null)v_(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ae(166));if(n=xr(Oo.current),xr(Jn.current),ma(e)){if(i=e.stateNode,n=e.memoizedProps,i[Zn]=e,(s=i.nodeValue!==n)&&(t=vn,t!==null))switch(t.tag){case 3:pa(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&pa(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Zn]=e,e.stateNode=i}return Vt(e),null;case 13:if(dt(gt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(mt&&gn!==null&&e.mode&1&&!(e.flags&128))Uv(),Cs(),e.flags|=98560,s=!1;else if(s=ma(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ae(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ae(317));s[Zn]=e}else Cs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Vt(e),s=!1}else zn!==null&&(Nf(zn),zn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||gt.current&1?Pt===0&&(Pt=3):dh())),e.updateQueue!==null&&(e.flags|=4),Vt(e),null);case 4:return bs(),Tf(t,e),t===null&&No(e.stateNode.containerInfo),Vt(e),null;case 10:return qd(e.type._context),Vt(e),null;case 17:return an(e.type)&&Al(),Vt(e),null;case 19:if(dt(gt),s=e.memoizedState,s===null)return Vt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Zs(s,!1);else{if(Pt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Nl(t),o!==null){for(e.flags|=128,Zs(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return lt(gt,gt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Tt()>Ls&&(e.flags|=128,i=!0,Zs(s,!1),e.lanes=4194304)}else{if(!i)if(t=Nl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Zs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!mt)return Vt(e),null}else 2*Tt()-s.renderingStartTime>Ls&&n!==1073741824&&(e.flags|=128,i=!0,Zs(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Tt(),e.sibling=null,n=gt.current,lt(gt,i?n&1|2:n&1),e):(Vt(e),null);case 22:case 23:return fh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?mn&1073741824&&(Vt(e),e.subtreeFlags&6&&(e.flags|=8192)):Vt(e),null;case 24:return null;case 25:return null}throw Error(ae(156,e.tag))}function Ny(t,e){switch(jd(e),e.tag){case 1:return an(e.type)&&Al(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return bs(),dt(on),dt(Xt),eh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Jd(e),null;case 13:if(dt(gt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ae(340));Cs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return dt(gt),null;case 4:return bs(),null;case 10:return qd(e.type._context),null;case 22:case 23:return fh(),null;case 24:return null;default:return null}}var _a=!1,jt=!1,Iy=typeof WeakSet=="function"?WeakSet:Set,Ee=null;function ds(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){St(t,e,i)}else n.current=null}function Af(t,e,n){try{n()}catch(i){St(t,e,i)}}var Gp=!1;function Uy(t,e){if(cf=Ml,t=Mv(),Gd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,f=0,d=t,h=null;t:for(;;){for(var p;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(p=d.firstChild)!==null;)h=d,d=p;for(;;){if(d===t)break t;if(h===n&&++c===r&&(a=o),h===s&&++f===i&&(l=o),(p=d.nextSibling)!==null)break;d=h,h=d.parentNode}d=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(uf={focusedElem:t,selectionRange:n},Ml=!1,Ee=e;Ee!==null;)if(e=Ee,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Ee=t;else for(;Ee!==null;){e=Ee;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var y=v.memoizedProps,m=v.memoizedState,u=e.stateNode,g=u.getSnapshotBeforeUpdate(e.elementType===e.type?y:On(e.type,y),m);u.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var _=e.stateNode.containerInfo;_.nodeType===1?_.textContent="":_.nodeType===9&&_.documentElement&&_.removeChild(_.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ae(163))}}catch(S){St(e,e.return,S)}if(t=e.sibling,t!==null){t.return=e.return,Ee=t;break}Ee=e.return}return v=Gp,Gp=!1,v}function yo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Af(e,n,s)}r=r.next}while(r!==i)}}function dc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Cf(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function __(t){var e=t.alternate;e!==null&&(t.alternate=null,__(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Zn],delete e[Uo],delete e[hf],delete e[vy],delete e[_y])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function x_(t){return t.tag===5||t.tag===3||t.tag===4}function Wp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||x_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Rf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Tl));else if(i!==4&&(t=t.child,t!==null))for(Rf(t,e,n),t=t.sibling;t!==null;)Rf(t,e,n),t=t.sibling}function bf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(bf(t,e,n),t=t.sibling;t!==null;)bf(t,e,n),t=t.sibling}var kt=null,kn=!1;function Ti(t,e,n){for(n=n.child;n!==null;)y_(t,e,n),n=n.sibling}function y_(t,e,n){if(Qn&&typeof Qn.onCommitFiberUnmount=="function")try{Qn.onCommitFiberUnmount(rc,n)}catch{}switch(n.tag){case 5:jt||ds(n,e);case 6:var i=kt,r=kn;kt=null,Ti(t,e,n),kt=i,kn=r,kt!==null&&(kn?(t=kt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):kt.removeChild(n.stateNode));break;case 18:kt!==null&&(kn?(t=kt,n=n.stateNode,t.nodeType===8?Yc(t.parentNode,n):t.nodeType===1&&Yc(t,n),Po(t)):Yc(kt,n.stateNode));break;case 4:i=kt,r=kn,kt=n.stateNode.containerInfo,kn=!0,Ti(t,e,n),kt=i,kn=r;break;case 0:case 11:case 14:case 15:if(!jt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Af(n,e,o),r=r.next}while(r!==i)}Ti(t,e,n);break;case 1:if(!jt&&(ds(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){St(n,e,a)}Ti(t,e,n);break;case 21:Ti(t,e,n);break;case 22:n.mode&1?(jt=(i=jt)||n.memoizedState!==null,Ti(t,e,n),jt=i):Ti(t,e,n);break;default:Ti(t,e,n)}}function jp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Iy),e.forEach(function(i){var r=Wy.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Nn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:kt=a.stateNode,kn=!1;break e;case 3:kt=a.stateNode.containerInfo,kn=!0;break e;case 4:kt=a.stateNode.containerInfo,kn=!0;break e}a=a.return}if(kt===null)throw Error(ae(160));y_(s,o,r),kt=null,kn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){St(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)S_(e,t),e=e.sibling}function S_(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Nn(e,t),Yn(t),i&4){try{yo(3,t,t.return),dc(3,t)}catch(y){St(t,t.return,y)}try{yo(5,t,t.return)}catch(y){St(t,t.return,y)}}break;case 1:Nn(e,t),Yn(t),i&512&&n!==null&&ds(n,n.return);break;case 5:if(Nn(e,t),Yn(t),i&512&&n!==null&&ds(n,n.return),t.flags&32){var r=t.stateNode;try{Ao(r,"")}catch(y){St(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Gg(r,s),Qu(a,o);var c=Qu(a,s);for(o=0;o<l.length;o+=2){var f=l[o],d=l[o+1];f==="style"?$g(r,d):f==="dangerouslySetInnerHTML"?Xg(r,d):f==="children"?Ao(r,d):Pd(r,f,d,c)}switch(a){case"input":Yu(r,s);break;case"textarea":Wg(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?gs(r,!!s.multiple,p,!1):h!==!!s.multiple&&(s.defaultValue!=null?gs(r,!!s.multiple,s.defaultValue,!0):gs(r,!!s.multiple,s.multiple?[]:"",!1))}r[Uo]=s}catch(y){St(t,t.return,y)}}break;case 6:if(Nn(e,t),Yn(t),i&4){if(t.stateNode===null)throw Error(ae(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(y){St(t,t.return,y)}}break;case 3:if(Nn(e,t),Yn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Po(e.containerInfo)}catch(y){St(t,t.return,y)}break;case 4:Nn(e,t),Yn(t);break;case 13:Nn(e,t),Yn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(ch=Tt())),i&4&&jp(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(jt=(c=jt)||f,Nn(e,t),jt=c):Nn(e,t),Yn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(Ee=t,f=t.child;f!==null;){for(d=Ee=f;Ee!==null;){switch(h=Ee,p=h.child,h.tag){case 0:case 11:case 14:case 15:yo(4,h,h.return);break;case 1:ds(h,h.return);var v=h.stateNode;if(typeof v.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(y){St(i,n,y)}}break;case 5:ds(h,h.return);break;case 22:if(h.memoizedState!==null){Yp(d);continue}}p!==null?(p.return=h,Ee=p):Yp(d)}f=f.sibling}e:for(f=null,d=t;;){if(d.tag===5){if(f===null){f=d;try{r=d.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Yg("display",o))}catch(y){St(t,t.return,y)}}}else if(d.tag===6){if(f===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(y){St(t,t.return,y)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;f===d&&(f=null),d=d.return}f===d&&(f=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Nn(e,t),Yn(t),i&4&&jp(t);break;case 21:break;default:Nn(e,t),Yn(t)}}function Yn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(x_(n)){var i=n;break e}n=n.return}throw Error(ae(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Ao(r,""),i.flags&=-33);var s=Wp(t);bf(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Wp(t);Rf(t,a,o);break;default:throw Error(ae(161))}}catch(l){St(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Fy(t,e,n){Ee=t,M_(t)}function M_(t,e,n){for(var i=(t.mode&1)!==0;Ee!==null;){var r=Ee,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||_a;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||jt;a=_a;var c=jt;if(_a=o,(jt=l)&&!c)for(Ee=r;Ee!==null;)o=Ee,l=o.child,o.tag===22&&o.memoizedState!==null?$p(r):l!==null?(l.return=o,Ee=l):$p(r);for(;s!==null;)Ee=s,M_(s),s=s.sibling;Ee=r,_a=a,jt=c}Xp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Ee=s):Xp(t)}}function Xp(t){for(;Ee!==null;){var e=Ee;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:jt||dc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!jt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:On(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Pp(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Pp(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var d=f.dehydrated;d!==null&&Po(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ae(163))}jt||e.flags&512&&Cf(e)}catch(h){St(e,e.return,h)}}if(e===t){Ee=null;break}if(n=e.sibling,n!==null){n.return=e.return,Ee=n;break}Ee=e.return}}function Yp(t){for(;Ee!==null;){var e=Ee;if(e===t){Ee=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Ee=n;break}Ee=e.return}}function $p(t){for(;Ee!==null;){var e=Ee;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{dc(4,e)}catch(l){St(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){St(e,r,l)}}var s=e.return;try{Cf(e)}catch(l){St(e,s,l)}break;case 5:var o=e.return;try{Cf(e)}catch(l){St(e,o,l)}}}catch(l){St(e,e.return,l)}if(e===t){Ee=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Ee=a;break}Ee=e.return}}var Oy=Math.ceil,Fl=Mi.ReactCurrentDispatcher,ah=Mi.ReactCurrentOwner,bn=Mi.ReactCurrentBatchConfig,Qe=0,Ft=null,Ct=null,zt=0,mn=0,hs=tr(0),Pt=0,Ho=null,Cr=0,hc=0,lh=0,So=null,rn=null,ch=0,Ls=1/0,ai=null,Ol=!1,Pf=null,ji=null,xa=!1,zi=null,kl=0,Mo=0,Lf=null,rl=-1,sl=0;function Jt(){return Qe&6?Tt():rl!==-1?rl:rl=Tt()}function Xi(t){return t.mode&1?Qe&2&&zt!==0?zt&-zt:yy.transition!==null?(sl===0&&(sl=ov()),sl):(t=st,t!==0||(t=window.event,t=t===void 0?16:hv(t.type)),t):1}function Wn(t,e,n,i){if(50<Mo)throw Mo=0,Lf=null,Error(ae(185));Xo(t,n,i),(!(Qe&2)||t!==Ft)&&(t===Ft&&(!(Qe&2)&&(hc|=n),Pt===4&&Fi(t,zt)),ln(t,i),n===1&&Qe===0&&!(e.mode&1)&&(Ls=Tt()+500,cc&&nr()))}function ln(t,e){var n=t.callbackNode;yx(t,e);var i=Sl(t,t===Ft?zt:0);if(i===0)n!==null&&ip(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&ip(n),e===1)t.tag===0?xy(qp.bind(null,t)):Dv(qp.bind(null,t)),my(function(){!(Qe&6)&&nr()}),n=null;else{switch(av(i)){case 1:n=Ud;break;case 4:n=rv;break;case 16:n=yl;break;case 536870912:n=sv;break;default:n=yl}n=P_(n,E_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function E_(t,e){if(rl=-1,sl=0,Qe&6)throw Error(ae(327));var n=t.callbackNode;if(Ss()&&t.callbackNode!==n)return null;var i=Sl(t,t===Ft?zt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=zl(t,i);else{e=i;var r=Qe;Qe|=2;var s=T_();(Ft!==t||zt!==e)&&(ai=null,Ls=Tt()+500,Mr(t,e));do try{By();break}catch(a){w_(t,a)}while(!0);$d(),Fl.current=s,Qe=r,Ct!==null?e=0:(Ft=null,zt=0,e=Pt)}if(e!==0){if(e===2&&(r=rf(t),r!==0&&(i=r,e=Df(t,r))),e===1)throw n=Ho,Mr(t,0),Fi(t,i),ln(t,Tt()),n;if(e===6)Fi(t,i);else{if(r=t.current.alternate,!(i&30)&&!ky(r)&&(e=zl(t,i),e===2&&(s=rf(t),s!==0&&(i=s,e=Df(t,s))),e===1))throw n=Ho,Mr(t,0),Fi(t,i),ln(t,Tt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ae(345));case 2:dr(t,rn,ai);break;case 3:if(Fi(t,i),(i&130023424)===i&&(e=ch+500-Tt(),10<e)){if(Sl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){Jt(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=df(dr.bind(null,t,rn,ai),e);break}dr(t,rn,ai);break;case 4:if(Fi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Gn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Tt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Oy(i/1960))-i,10<i){t.timeoutHandle=df(dr.bind(null,t,rn,ai),i);break}dr(t,rn,ai);break;case 5:dr(t,rn,ai);break;default:throw Error(ae(329))}}}return ln(t,Tt()),t.callbackNode===n?E_.bind(null,t):null}function Df(t,e){var n=So;return t.current.memoizedState.isDehydrated&&(Mr(t,e).flags|=256),t=zl(t,e),t!==2&&(e=rn,rn=n,e!==null&&Nf(e)),t}function Nf(t){rn===null?rn=t:rn.push.apply(rn,t)}function ky(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Xn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Fi(t,e){for(e&=~lh,e&=~hc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Gn(e),i=1<<n;t[n]=-1,e&=~i}}function qp(t){if(Qe&6)throw Error(ae(327));Ss();var e=Sl(t,0);if(!(e&1))return ln(t,Tt()),null;var n=zl(t,e);if(t.tag!==0&&n===2){var i=rf(t);i!==0&&(e=i,n=Df(t,i))}if(n===1)throw n=Ho,Mr(t,0),Fi(t,e),ln(t,Tt()),n;if(n===6)throw Error(ae(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,dr(t,rn,ai),ln(t,Tt()),null}function uh(t,e){var n=Qe;Qe|=1;try{return t(e)}finally{Qe=n,Qe===0&&(Ls=Tt()+500,cc&&nr())}}function Rr(t){zi!==null&&zi.tag===0&&!(Qe&6)&&Ss();var e=Qe;Qe|=1;var n=bn.transition,i=st;try{if(bn.transition=null,st=1,t)return t()}finally{st=i,bn.transition=n,Qe=e,!(Qe&6)&&nr()}}function fh(){mn=hs.current,dt(hs)}function Mr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,py(n)),Ct!==null)for(n=Ct.return;n!==null;){var i=n;switch(jd(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Al();break;case 3:bs(),dt(on),dt(Xt),eh();break;case 5:Jd(i);break;case 4:bs();break;case 13:dt(gt);break;case 19:dt(gt);break;case 10:qd(i.type._context);break;case 22:case 23:fh()}n=n.return}if(Ft=t,Ct=t=Yi(t.current,null),zt=mn=e,Pt=0,Ho=null,lh=hc=Cr=0,rn=So=null,_r!==null){for(e=0;e<_r.length;e++)if(n=_r[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}_r=null}return t}function w_(t,e){do{var n=Ct;try{if($d(),tl.current=Ul,Il){for(var i=vt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Il=!1}if(Ar=0,Ut=bt=vt=null,xo=!1,ko=0,ah.current=null,n===null||n.return===null){Pt=1,Ho=e,Ct=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=zt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,f=a,d=f.tag;if(!(f.mode&1)&&(d===0||d===11||d===15)){var h=f.alternate;h?(f.updateQueue=h.updateQueue,f.memoizedState=h.memoizedState,f.lanes=h.lanes):(f.updateQueue=null,f.memoizedState=null)}var p=Fp(o);if(p!==null){p.flags&=-257,Op(p,o,a,s,e),p.mode&1&&Up(s,c,e),e=p,l=c;var v=e.updateQueue;if(v===null){var y=new Set;y.add(l),e.updateQueue=y}else v.add(l);break e}else{if(!(e&1)){Up(s,c,e),dh();break e}l=Error(ae(426))}}else if(mt&&a.mode&1){var m=Fp(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Op(m,o,a,s,e),Xd(Ps(l,a));break e}}s=l=Ps(l,a),Pt!==4&&(Pt=2),So===null?So=[s]:So.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=a_(s,l,e);bp(s,u);break e;case 1:a=l;var g=s.type,_=s.stateNode;if(!(s.flags&128)&&(typeof g.getDerivedStateFromError=="function"||_!==null&&typeof _.componentDidCatch=="function"&&(ji===null||!ji.has(_)))){s.flags|=65536,e&=-e,s.lanes|=e;var S=l_(s,a,e);bp(s,S);break e}}s=s.return}while(s!==null)}C_(n)}catch(D){e=D,Ct===n&&n!==null&&(Ct=n=n.return);continue}break}while(!0)}function T_(){var t=Fl.current;return Fl.current=Ul,t===null?Ul:t}function dh(){(Pt===0||Pt===3||Pt===2)&&(Pt=4),Ft===null||!(Cr&268435455)&&!(hc&268435455)||Fi(Ft,zt)}function zl(t,e){var n=Qe;Qe|=2;var i=T_();(Ft!==t||zt!==e)&&(ai=null,Mr(t,e));do try{zy();break}catch(r){w_(t,r)}while(!0);if($d(),Qe=n,Fl.current=i,Ct!==null)throw Error(ae(261));return Ft=null,zt=0,Pt}function zy(){for(;Ct!==null;)A_(Ct)}function By(){for(;Ct!==null&&!fx();)A_(Ct)}function A_(t){var e=b_(t.alternate,t,mn);t.memoizedProps=t.pendingProps,e===null?C_(t):Ct=e,ah.current=null}function C_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Ny(n,e),n!==null){n.flags&=32767,Ct=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Pt=6,Ct=null;return}}else if(n=Dy(n,e,mn),n!==null){Ct=n;return}if(e=e.sibling,e!==null){Ct=e;return}Ct=e=t}while(e!==null);Pt===0&&(Pt=5)}function dr(t,e,n){var i=st,r=bn.transition;try{bn.transition=null,st=1,Hy(t,e,n,i)}finally{bn.transition=r,st=i}return null}function Hy(t,e,n,i){do Ss();while(zi!==null);if(Qe&6)throw Error(ae(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ae(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Sx(t,s),t===Ft&&(Ct=Ft=null,zt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||xa||(xa=!0,P_(yl,function(){return Ss(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=bn.transition,bn.transition=null;var o=st;st=1;var a=Qe;Qe|=4,ah.current=null,Uy(t,n),S_(n,t),ay(uf),Ml=!!cf,uf=cf=null,t.current=n,Fy(n),dx(),Qe=a,st=o,bn.transition=s}else t.current=n;if(xa&&(xa=!1,zi=t,kl=r),s=t.pendingLanes,s===0&&(ji=null),mx(n.stateNode),ln(t,Tt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Ol)throw Ol=!1,t=Pf,Pf=null,t;return kl&1&&t.tag!==0&&Ss(),s=t.pendingLanes,s&1?t===Lf?Mo++:(Mo=0,Lf=t):Mo=0,nr(),null}function Ss(){if(zi!==null){var t=av(kl),e=bn.transition,n=st;try{if(bn.transition=null,st=16>t?16:t,zi===null)var i=!1;else{if(t=zi,zi=null,kl=0,Qe&6)throw Error(ae(331));var r=Qe;for(Qe|=4,Ee=t.current;Ee!==null;){var s=Ee,o=s.child;if(Ee.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(Ee=c;Ee!==null;){var f=Ee;switch(f.tag){case 0:case 11:case 15:yo(8,f,s)}var d=f.child;if(d!==null)d.return=f,Ee=d;else for(;Ee!==null;){f=Ee;var h=f.sibling,p=f.return;if(__(f),f===c){Ee=null;break}if(h!==null){h.return=p,Ee=h;break}Ee=p}}}var v=s.alternate;if(v!==null){var y=v.child;if(y!==null){v.child=null;do{var m=y.sibling;y.sibling=null,y=m}while(y!==null)}}Ee=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Ee=o;else e:for(;Ee!==null;){if(s=Ee,s.flags&2048)switch(s.tag){case 0:case 11:case 15:yo(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,Ee=u;break e}Ee=s.return}}var g=t.current;for(Ee=g;Ee!==null;){o=Ee;var _=o.child;if(o.subtreeFlags&2064&&_!==null)_.return=o,Ee=_;else e:for(o=g;Ee!==null;){if(a=Ee,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:dc(9,a)}}catch(D){St(a,a.return,D)}if(a===o){Ee=null;break e}var S=a.sibling;if(S!==null){S.return=a.return,Ee=S;break e}Ee=a.return}}if(Qe=r,nr(),Qn&&typeof Qn.onPostCommitFiberRoot=="function")try{Qn.onPostCommitFiberRoot(rc,t)}catch{}i=!0}return i}finally{st=n,bn.transition=e}}return!1}function Kp(t,e,n){e=Ps(n,e),e=a_(t,e,1),t=Wi(t,e,1),e=Jt(),t!==null&&(Xo(t,1,e),ln(t,e))}function St(t,e,n){if(t.tag===3)Kp(t,t,n);else for(;e!==null;){if(e.tag===3){Kp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ji===null||!ji.has(i))){t=Ps(n,t),t=l_(e,t,1),e=Wi(e,t,1),t=Jt(),e!==null&&(Xo(e,1,t),ln(e,t));break}}e=e.return}}function Vy(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=Jt(),t.pingedLanes|=t.suspendedLanes&n,Ft===t&&(zt&n)===n&&(Pt===4||Pt===3&&(zt&130023424)===zt&&500>Tt()-ch?Mr(t,0):lh|=n),ln(t,e)}function R_(t,e){e===0&&(t.mode&1?(e=ca,ca<<=1,!(ca&130023424)&&(ca=4194304)):e=1);var n=Jt();t=xi(t,e),t!==null&&(Xo(t,e,n),ln(t,n))}function Gy(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),R_(t,n)}function Wy(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ae(314))}i!==null&&i.delete(e),R_(t,n)}var b_;b_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||on.current)sn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return sn=!1,Ly(t,e,n);sn=!!(t.flags&131072)}else sn=!1,mt&&e.flags&1048576&&Nv(e,bl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;il(t,e),t=e.pendingProps;var r=As(e,Xt.current);ys(e,n),r=nh(null,e,i,t,r,n);var s=ih();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,an(i)?(s=!0,Cl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Zd(e),r.updater=fc,e.stateNode=r,r._reactInternals=e,xf(e,i,t,n),e=Mf(null,e,i,!0,s,n)):(e.tag=0,mt&&s&&Wd(e),Kt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(il(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=Xy(i),t=On(i,t),r){case 0:e=Sf(null,e,i,t,n);break e;case 1:e=Bp(null,e,i,t,n);break e;case 11:e=kp(null,e,i,t,n);break e;case 14:e=zp(null,e,i,On(i.type,t),n);break e}throw Error(ae(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:On(i,r),Sf(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:On(i,r),Bp(t,e,i,r,n);case 3:e:{if(d_(e),t===null)throw Error(ae(387));i=e.pendingProps,s=e.memoizedState,r=s.element,zv(t,e),Dl(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Ps(Error(ae(423)),e),e=Hp(t,e,i,n,r);break e}else if(i!==r){r=Ps(Error(ae(424)),e),e=Hp(t,e,i,n,r);break e}else for(gn=Gi(e.stateNode.containerInfo.firstChild),vn=e,mt=!0,zn=null,n=Ov(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Cs(),i===r){e=yi(t,e,n);break e}Kt(t,e,i,n)}e=e.child}return e;case 5:return Bv(e),t===null&&gf(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,ff(i,r)?o=null:s!==null&&ff(i,s)&&(e.flags|=32),f_(t,e),Kt(t,e,o,n),e.child;case 6:return t===null&&gf(e),null;case 13:return h_(t,e,n);case 4:return Qd(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Rs(e,null,i,n):Kt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:On(i,r),kp(t,e,i,r,n);case 7:return Kt(t,e,e.pendingProps,n),e.child;case 8:return Kt(t,e,e.pendingProps.children,n),e.child;case 12:return Kt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,lt(Pl,i._currentValue),i._currentValue=o,s!==null)if(Xn(s.value,o)){if(s.children===r.children&&!on.current){e=yi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=mi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?l.next=l:(l.next=f.next,f.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),vf(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ae(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),vf(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Kt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,ys(e,n),r=Pn(r),i=i(r),e.flags|=1,Kt(t,e,i,n),e.child;case 14:return i=e.type,r=On(i,e.pendingProps),r=On(i.type,r),zp(t,e,i,r,n);case 15:return c_(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:On(i,r),il(t,e),e.tag=1,an(i)?(t=!0,Cl(e)):t=!1,ys(e,n),o_(e,i,r),xf(e,i,r,n),Mf(null,e,i,!0,t,n);case 19:return p_(t,e,n);case 22:return u_(t,e,n)}throw Error(ae(156,e.tag))};function P_(t,e){return iv(t,e)}function jy(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Cn(t,e,n,i){return new jy(t,e,n,i)}function hh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Xy(t){if(typeof t=="function")return hh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Dd)return 11;if(t===Nd)return 14}return 2}function Yi(t,e){var n=t.alternate;return n===null?(n=Cn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function ol(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")hh(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case is:return Er(n.children,r,s,e);case Ld:o=8,r|=8;break;case Vu:return t=Cn(12,n,e,r|2),t.elementType=Vu,t.lanes=s,t;case Gu:return t=Cn(13,n,e,r),t.elementType=Gu,t.lanes=s,t;case Wu:return t=Cn(19,n,e,r),t.elementType=Wu,t.lanes=s,t;case Bg:return pc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case kg:o=10;break e;case zg:o=9;break e;case Dd:o=11;break e;case Nd:o=14;break e;case Di:o=16,i=null;break e}throw Error(ae(130,t==null?t:typeof t,""))}return e=Cn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Er(t,e,n,i){return t=Cn(7,t,i,e),t.lanes=n,t}function pc(t,e,n,i){return t=Cn(22,t,i,e),t.elementType=Bg,t.lanes=n,t.stateNode={isHidden:!1},t}function tu(t,e,n){return t=Cn(6,t,null,e),t.lanes=n,t}function nu(t,e,n){return e=Cn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Yy(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Fc(0),this.expirationTimes=Fc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Fc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function ph(t,e,n,i,r,s,o,a,l){return t=new Yy(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Cn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Zd(s),t}function $y(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ns,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function L_(t){if(!t)return Zi;t=t._reactInternals;e:{if(Dr(t)!==t||t.tag!==1)throw Error(ae(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(an(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ae(171))}if(t.tag===1){var n=t.type;if(an(n))return Lv(t,n,e)}return e}function D_(t,e,n,i,r,s,o,a,l){return t=ph(n,i,!0,t,r,s,o,a,l),t.context=L_(null),n=t.current,i=Jt(),r=Xi(n),s=mi(i,r),s.callback=e??null,Wi(n,s,r),t.current.lanes=r,Xo(t,r,i),ln(t,i),t}function mc(t,e,n,i){var r=e.current,s=Jt(),o=Xi(r);return n=L_(n),e.context===null?e.context=n:e.pendingContext=n,e=mi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Wi(r,e,o),t!==null&&(Wn(t,r,o,s),el(t,r,o)),o}function Bl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Zp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function mh(t,e){Zp(t,e),(t=t.alternate)&&Zp(t,e)}function qy(){return null}var N_=typeof reportError=="function"?reportError:function(t){console.error(t)};function gh(t){this._internalRoot=t}gc.prototype.render=gh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ae(409));mc(t,e,null,null)};gc.prototype.unmount=gh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Rr(function(){mc(null,t,null,null)}),e[_i]=null}};function gc(t){this._internalRoot=t}gc.prototype.unstable_scheduleHydration=function(t){if(t){var e=uv();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Ui.length&&e!==0&&e<Ui[n].priority;n++);Ui.splice(n,0,t),n===0&&dv(t)}};function vh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function vc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Qp(){}function Ky(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Bl(o);s.call(c)}}var o=D_(e,i,t,0,null,!1,!1,"",Qp);return t._reactRootContainer=o,t[_i]=o.current,No(t.nodeType===8?t.parentNode:t),Rr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Bl(l);a.call(c)}}var l=ph(t,0,!1,null,null,!1,!1,"",Qp);return t._reactRootContainer=l,t[_i]=l.current,No(t.nodeType===8?t.parentNode:t),Rr(function(){mc(e,l,n,i)}),l}function _c(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Bl(o);a.call(l)}}mc(e,o,t,r)}else o=Ky(n,e,t,r,i);return Bl(o)}lv=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=uo(e.pendingLanes);n!==0&&(Fd(e,n|1),ln(e,Tt()),!(Qe&6)&&(Ls=Tt()+500,nr()))}break;case 13:Rr(function(){var i=xi(t,1);if(i!==null){var r=Jt();Wn(i,t,1,r)}}),mh(t,1)}};Od=function(t){if(t.tag===13){var e=xi(t,134217728);if(e!==null){var n=Jt();Wn(e,t,134217728,n)}mh(t,134217728)}};cv=function(t){if(t.tag===13){var e=Xi(t),n=xi(t,e);if(n!==null){var i=Jt();Wn(n,t,e,i)}mh(t,e)}};uv=function(){return st};fv=function(t,e){var n=st;try{return st=t,e()}finally{st=n}};ef=function(t,e,n){switch(e){case"input":if(Yu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=lc(i);if(!r)throw Error(ae(90));Vg(i),Yu(i,r)}}}break;case"textarea":Wg(t,n);break;case"select":e=n.value,e!=null&&gs(t,!!n.multiple,e,!1)}};Zg=uh;Qg=Rr;var Zy={usingClientEntryPoint:!1,Events:[$o,as,lc,qg,Kg,uh]},Qs={findFiberByHostInstance:vr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Qy={bundleType:Qs.bundleType,version:Qs.version,rendererPackageName:Qs.rendererPackageName,rendererConfig:Qs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Mi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=tv(t),t===null?null:t.stateNode},findFiberByHostInstance:Qs.findFiberByHostInstance||qy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ya=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ya.isDisabled&&ya.supportsFiber)try{rc=ya.inject(Qy),Qn=ya}catch{}}xn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Zy;xn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!vh(e))throw Error(ae(200));return $y(t,e,null,n)};xn.createRoot=function(t,e){if(!vh(t))throw Error(ae(299));var n=!1,i="",r=N_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=ph(t,1,!1,null,null,n,!1,i,r),t[_i]=e.current,No(t.nodeType===8?t.parentNode:t),new gh(e)};xn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ae(188)):(t=Object.keys(t).join(","),Error(ae(268,t)));return t=tv(e),t=t===null?null:t.stateNode,t};xn.flushSync=function(t){return Rr(t)};xn.hydrate=function(t,e,n){if(!vc(e))throw Error(ae(200));return _c(null,t,e,!0,n)};xn.hydrateRoot=function(t,e,n){if(!vh(t))throw Error(ae(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=N_;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=D_(e,null,t,1,n??null,r,!1,s,o),t[_i]=e.current,No(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new gc(e)};xn.render=function(t,e,n){if(!vc(e))throw Error(ae(200));return _c(null,t,e,!1,n)};xn.unmountComponentAtNode=function(t){if(!vc(t))throw Error(ae(40));return t._reactRootContainer?(Rr(function(){_c(null,null,t,!1,function(){t._reactRootContainer=null,t[_i]=null})}),!0):!1};xn.unstable_batchedUpdates=uh;xn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!vc(n))throw Error(ae(200));if(t==null||t._reactInternals===void 0)throw Error(ae(38));return _c(t,e,n,!1,i)};xn.version="18.3.1-next-f1338f8080-20240426";function I_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(I_)}catch(t){console.error(t)}}I_(),Ig.exports=xn;var Jy=Ig.exports,Jp=Jy;Bu.createRoot=Jp.createRoot,Bu.hydrateRoot=Jp.hydrateRoot;function Ko(t,e=0){return{x:Math.sin(t)*Math.cos(e),y:Math.sin(e),z:-Math.cos(t)*Math.cos(e)}}function _h(t){return{x:Math.cos(t),y:0,z:Math.sin(t)}}function xh(t,e){return{x:t.x-e.x,y:t.y-e.y,z:t.z-e.z}}function em(t,e){return t.x*e.x+t.y*e.y+t.z*e.z}function eS(t){return Math.hypot(t.x,t.y,t.z)}function tS(t){return(t*180/Math.PI%360+360)%360}function nS(t,e){const n=xh(t,e.position),i=Ko(e.yaw,0),r=_h(e.yaw),s=em(n,i),o=em(n,r),a=Math.atan2(o,s)*(180/Math.PI);return a>180?a-360:a<-180?a+360:a}function iS(t,e){return eS(xh(t,e))}function rS(t,e){const n=xh(t,e),i=Math.hypot(n.x,n.z);return Math.atan2(n.y,i)*180/Math.PI}function sS(t){const e=Math.abs(t);let n;return e<5?n="正前":e>175?n="正后":n=t>0?`右偏 ${e.toFixed(0)}°`:`左偏 ${e.toFixed(0)}°`,n}function oS(t,e,n,i,r){const s=Math.max(t,1e-4);let o=1;switch(e){case"linear":o=1-i*((s-n)/(r-n));break;case"inverse":o=n/(n+i*Math.max(s-n,0));break;case"exponential":o=Math.pow(Math.max(s,n)/n,-i);break}return Math.min(1,Math.max(0,o))}function Hl(t){return t<=1e-4?"-∞":`${(20*Math.log10(t)).toFixed(1)} dB`}function aS(t){let e=t>>>0;return()=>{e|=0,e=e+1831565813|0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function lS(t){const e=t.sampleRate,i=t.createBuffer(1,Math.floor(e*1.6),e),r=i.getChannelData(0),s=[.05,.55,1.05];for(const o of s){const a=Math.floor(o*e),l=Math.floor(.05*e);for(let c=0;c<l;c++){const f=c/e,d=Math.pow(1-c/l,1.6);r[a+c]=Math.sin(2*Math.PI*1200*f)*d*.9}}return i}function cS(t){const e=t.sampleRate,n=3,i=t.createBuffer(1,Math.floor(e*n),e),r=i.getChannelData(0),s=r.length;for(let o=0;o<s;o++){const a=o/e,l=Math.min(1,a/.02,(n-a)/.05);r[o]=Math.sin(2*Math.PI*440*a)*.5*l}return i}function tm(t,e){const n=t.sampleRate,i=4,r=t.createBuffer(1,Math.floor(n*i),n),s=r.getChannelData(0),o=aS(20260929);for(let a=0;a<s.length;a++){const l=a/n,c=(o()*2-1)*.18,f=Math.sin(2*Math.PI*330*l)*.28,d=.5+.5*Math.sin(2*Math.PI*2*l),h=Math.min(1,l/.05,(i-l)/.1);s[a]=(c+f)*(.6+.4*d)*h}return r}function uS(t,e){switch(e){case"pulse":return lS(t);case"tone":return cS(t);case"duoA":return tm(t);case"duoB":return tm(t);default:throw new Error(`非内置样例类型: ${e}`)}}const fS={pulse:"脉冲样例（方位测试）",tone:"单音样例（声像/距离）",duoA:"双声源 A（同步左）",duoB:"双声源 B（同步右）"},dS=["position","orientation","gain"];let nm=0;function U_(t){return nm+=1,`${t}-${Date.now().toString(36)}-${nm}`}function yh(){return{schema:1,keyframes:[],revision:0,updatedAt:0}}function F_(){return{version:1,undo:[],redo:[]}}class Lt extends Error{constructor(n,i){super(i);at(this,"code");this.name="AutomationError",this.code=n}}const hS=100;function di(t){return typeof t=="number"&&Number.isFinite(t)}function Vl(t){return!!t&&typeof t=="object"&&di(t.x)&&di(t.y)&&di(t.z)}function O_(t){if(t.position&&!Vl(t.position))throw new Lt("BAD_VALUE","位置必须是有限的三维坐标");if(t.orientation){if(!Vl(t.orientation))throw new Lt("BAD_VALUE","朝向必须是有限的三维向量");const{x:e,y:n,z:i}=t.orientation;if(Math.hypot(e,n,i)<1e-6)throw new Lt("BAD_VALUE","朝向向量不能为零向量")}if(t.gain!==void 0&&(!di(t.gain)||t.gain<0||t.gain>1.5))throw new Lt("BAD_VALUE","增益必须是 0..1.5 之间的有限数")}function k_(t){if(!di(t)||t<0)throw new Lt("BAD_VALUE","关键帧时间必须是非负有限秒数")}function Gl(t){return{schema:1,revision:t.revision,updatedAt:t.updatedAt,keyframes:t.keyframes.map(e=>({id:e.id,time:e.time,params:Wl(e.params)}))}}function Wl(t){return{...t.position?{position:{...t.position}}:{},...t.orientation?{orientation:{...t.orientation}}:{},...t.gain!==void 0?{gain:t.gain}:{}}}function pS(t){var s,o,a;if(!t||typeof t!="object")return yh();const e=t,n=Array.isArray(e.keyframes)?e.keyframes:[],i=new Set,r=[];for(const l of n){if(!l||typeof l!="object")continue;const c=l;if(typeof c.id!="string"||!c.id||i.has(c.id)||!di(c.time)||c.time<0)continue;const f={};if(Vl((s=c.params)==null?void 0:s.position)&&(f.position={...c.params.position}),Vl((o=c.params)==null?void 0:o.orientation)){const d=c.params.orientation;Math.hypot(d.x,d.y,d.z)>=1e-6&&(f.orientation={...d})}di((a=c.params)==null?void 0:a.gain)&&c.params.gain>=0&&c.params.gain<=1.5&&(f.gain=c.params.gain),Object.keys(f).length!==0&&(i.add(c.id),r.push({id:c.id,time:c.time,params:f}))}return r.sort((l,c)=>l.time-c.time),{schema:1,keyframes:r,revision:di(e.revision)?Math.max(0,Math.floor(e.revision)):0,updatedAt:di(e.updatedAt)?e.updatedAt:0}}function xc(t,e){return{schema:1,keyframes:e,revision:t.revision+1,updatedAt:Date.now()}}function im(t,e){if(k_(e.time),O_(e.params),Object.keys(e.params).length===0)throw new Lt("BAD_VALUE","关键帧至少需要一个参数");if(t.keyframes.some(r=>r.time===e.time))throw new Lt("DUP_TIME",`时间 ${e.time.toFixed(3)}s 已有关键帧；拒绝在同一时刻重复提交`);const n={id:e.id??U_("kf"),time:e.time,params:Wl(e.params)},i=[...t.keyframes,n].sort((r,s)=>r.time-s.time);return xc(t,i)}function mS(t,e){const n=t.keyframes.findIndex(f=>f.id===e.id);if(n<0)throw new Lt("NOT_FOUND","关键帧不存在或已被删除");const i=t.keyframes[n],r=e.time??i.time;k_(r);const s=e.params?e.patch?{...i.params,...Wl(e.params)}:Wl(e.params):i.params;if(O_(s),Object.keys(s).length===0)throw new Lt("BAD_VALUE","关键帧至少需要一个参数");const o=t.keyframes[n-1],a=t.keyframes[n+1];if(o&&r<=o.time)throw new Lt("ORDER_VIOLATION",`新时间 ${r.toFixed(3)}s 不早于前一关键帧 ${o.time.toFixed(3)}s；拒绝逆序重排`);if(a&&r>=a.time)throw new Lt("ORDER_VIOLATION",`新时间 ${r.toFixed(3)}s 不晚于后一关键帧 ${a.time.toFixed(3)}s；拒绝逆序重排`);const l={id:i.id,time:r,params:s},c=t.keyframes.slice();return c[n]=l,c.sort((f,d)=>f.time-d.time),xc(t,c)}function gS(t,e){if(!t.keyframes.some(n=>n.id===e))throw new Lt("NOT_FOUND","关键帧不存在或已被删除");return xc(t,t.keyframes.filter(n=>n.id!==e))}function vS(t){return t.keyframes.length===0?t:xc(t,[])}function al(t,e,n){return t+(e-t)*n}function _S(t,e,n){return{x:al(t.x,e.x,n),y:al(t.y,e.y,n),z:al(t.z,e.z,n)}}function Ds(t,e){const n=t.keyframes,i={};if(n.length===0)return i;for(const r of dS){let s=-1,o=-1;for(let d=0;d<n.length;d++)ts(n[d].params,r)!==void 0&&(s<0&&(s=d),o=d);if(s<0||e<n[s].time)continue;if(e>=n[o].time){iu(i,r,ts(n[o].params,r));continue}let a=-1,l=-1;for(let d=0;d<n.length;d++)ts(n[d].params,r)!==void 0&&(n[d].time<=e&&(a=d),n[d].time>=e&&l<0&&(l=d));const c=ts(n[a].params,r),f=l>=0?ts(n[l].params,r):void 0;if(f===void 0||l===a)iu(i,r,c);else{const d=n[l].time-n[a].time,h=d>0?(e-n[a].time)/d:0;r==="gain"?i.gain=al(c,f,h):iu(i,r,_S(c,f,h))}}return i}function jl(t,e,n){if(!Number.isFinite(n)||n<=0)return Ds(t,e);const i=(e%n+n)%n;return Ds(t,i)}function ts(t,e){return t[e]}function iu(t,e,n){n!==void 0&&(e==="gain"?t.gain=n:e==="position"?t.position={...n}:t.orientation={...n})}function ll(t,e){return t.keyframes.some(n=>ts(n.params,e)!==void 0)}function If(t){return t.keyframes.reduce((e,n)=>Math.max(e,n.time),0)}function xS(t,e){const n={...e,before:Gl(e.before),after:Gl(e.after),id:U_("hist"),at:Date.now()},i=[...t.undo,n];for(;i.length>hS;)i.shift();return{version:1,undo:i,redo:[]}}function yS(t,e){const n=t.undo[t.undo.length-1];if(!n)throw new Lt("NOT_FOUND","没有可撤销的自动化编辑");if(!e.has(n.trackId))throw new Lt("NOT_FOUND","目标声轨已不存在");if(e.get(n.trackId).revision!==n.after.revision)throw new Lt("REVISION_MISMATCH","自动化轨已被其他编辑改动（版本不一致），拒绝覆盖撤销");return{history:{version:1,undo:t.undo.slice(0,-1),redo:[...t.redo,n]},trackId:n.trackId,lane:Gl(n.before),entry:n}}function SS(t,e){const n=t.redo[t.redo.length-1];if(!n)throw new Lt("NOT_FOUND","没有可重做的自动化编辑");if(!e.has(n.trackId))throw new Lt("NOT_FOUND","目标声轨已不存在");if(e.get(n.trackId).revision!==n.before.revision)throw new Lt("REVISION_MISMATCH","自动化轨已被其他编辑改动（版本不一致），拒绝覆盖重做");return{history:{version:1,undo:[...t.undo,n],redo:t.redo.slice(0,-1)},trackId:n.trackId,lane:Gl(n.after),entry:n}}function rm(t){if(!t||typeof t!="object")return null;const e=t;if(!Array.isArray(e.tracks)||!e.listener||!e.spatial)return null;const n=e.tracks.map(r=>({...r,automation:pS(r.automation)})),i=e.automationHistory&&typeof e.automationHistory=="object"&&Array.isArray(e.automationHistory.undo)?{version:1,undo:e.automationHistory.undo,redo:Array.isArray(e.automationHistory.redo)?e.automationHistory.redo:[]}:F_();return{version:2,tracks:n,listener:e.listener,spatial:e.spatial,busGain:typeof e.busGain=="number"?e.busGain:1,masterGain:typeof e.masterGain=="number"?e.masterGain:.9,savedAt:typeof e.savedAt=="number"?e.savedAt:0,name:e.name,automationHistory:i}}function Fr(t){return t.automation??{schema:1,keyframes:[],revision:0,updatedAt:0}}class hr extends Error{constructor(n,i){super(i);at(this,"trackId");this.name="DecodeError",this.trackId=n}}const MS=25,ES=.3,Sa=1e-6;class wS{constructor(){at(this,"ctx",null);at(this,"unlock","locked");at(this,"busGain",null);at(this,"masterGain",null);at(this,"soloBus",null);at(this,"muteBus",null);at(this,"analyser",null);at(this,"timeDomainBuf",new Float32Array(new ArrayBuffer(8192)));at(this,"peakWorklet",null);at(this,"workletFailed",!1);at(this,"autoTimer",null);at(this,"voices",new Map);at(this,"buffers",new Map);at(this,"pendingFiles",new Map);at(this,"spatial",null);at(this,"anySolo",!1);at(this,"unlockListeners",new Set);at(this,"levelListeners",new Set);at(this,"endedListeners",new Set);at(this,"rafHandle",0);at(this,"clipLatchL",!1);at(this,"clipLatchR",!1);at(this,"lastPeak",{l:0,r:0,clipL:!1,clipR:!1})}onUnlock(e){return this.unlockListeners.add(e),e(this.unlock),()=>{this.unlockListeners.delete(e)}}onLevels(e){return this.levelListeners.add(e),()=>{this.levelListeners.delete(e)}}onEnded(e){return this.endedListeners.add(e),()=>{this.endedListeners.delete(e)}}emitUnlock(){this.unlockListeners.forEach(e=>e(this.unlock))}async resume(){if(this.unlock==="unlocked"&&this.ctx){this.ctx.state==="suspended"&&await this.ctx.resume();return}this.unlock="unlocking",this.emitUnlock();try{const e=window.AudioContext??window.webkitAudioContext;if(!e)throw new Error("当前浏览器不支持 Web Audio API");const n=new e;if(this.ctx=n,this.buildGraph(n),n.state==="suspended"&&await n.resume(),n.state!=="running")throw new Error("AudioContext 被浏览器策略阻止，未能进入 running 状态");this.unlock="unlocked",this.emitUnlock(),this.startMeterLoop(),this.startAutomationClock(),this.ensurePeakWorklet(n)}catch(e){throw this.unlock="failed",this.emitUnlock(),e}}buildGraph(e){this.soloBus=e.createGain(),this.muteBus=e.createGain(),this.muteBus.gain.value=0,this.busGain=e.createGain(),this.masterGain=e.createGain(),this.analyser=e.createAnalyser(),this.analyser.fftSize=2048,this.timeDomainBuf=new Float32Array(new ArrayBuffer(this.analyser.fftSize*4)),this.soloBus.connect(this.busGain),this.muteBus.connect(this.busGain),this.busGain.connect(this.masterGain),this.masterGain.connect(this.analyser),this.analyser.connect(e.destination)}async ensurePeakWorklet(e){if(this.peakWorklet||this.workletFailed)return!!this.peakWorklet;try{const n=`
class PeakMeterProcessor extends AudioWorkletProcessor {
  process(inputs, outputs) {
    const in0 = inputs[0];
    const out0 = outputs[0];
    if (!in0 || in0.length === 0) {
      // 上游静默优化时输出保持零填充即可
      return true;
    }
    let peakL = 0, peakR = 0, clipL = false, clipR = false;
    const l = in0[0];
    const r = in0[1] || in0[0];
    const ol = out0[0];
    const or = out0[1] || out0[0];
    for (let i = 0; i < l.length; i++) {
      const vl = l[i];
      const al = Math.abs(vl);
      if (al > peakL) peakL = al;
      if (al >= 1.0) clipL = true;
      if (ol) ol[i] = vl; // 必须显式透传，否则输出静音
    }
    if (r && or) for (let i = 0; i < r.length; i++) {
      const vr = r[i];
      const ar = Math.abs(vr);
      if (ar > peakR) peakR = ar;
      if (ar >= 1.0) clipR = true;
      if (out0[1]) or[i] = vr;
    }
    this.port.postMessage({ l: peakL, r: peakR, clipL, clipR });
    return true;
  }
}
registerProcessor('peak-meter', PeakMeterProcessor);
`,i=new Blob([n],{type:"application/javascript"}),r=URL.createObjectURL(i);try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}const s=new AudioWorkletNode(e,"peak-meter",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});return s.channelCount=2,s.channelInterpretation="speakers",this.masterGain.disconnect(),this.masterGain.connect(s),this.analyser.disconnect(),s.connect(this.analyser),this.analyser.connect(e.destination),s.port.onmessage=o=>{const a=o.data;a.clipL&&(this.clipLatchL=!0),a.clipR&&(this.clipLatchR=!0),this.lastPeak={l:a.l,r:a.r,clipL:this.clipLatchL,clipR:this.clipLatchR}},this.peakWorklet=s,!0}catch{return this.workletFailed=!0,!1}}clearClipLatch(){this.clipLatchL=!1,this.clipLatchR=!1}startMeterLoop(){const e=()=>{if(!this.peakWorklet&&this.analyser){this.analyser.getFloatTimeDomainData(this.timeDomainBuf);let i=0;for(let r=0;r<this.timeDomainBuf.length;r++){const s=Math.abs(this.timeDomainBuf[r]);s>i&&(i=s)}i>=1&&(this.clipLatchL=!0,this.clipLatchR=!0),this.lastPeak={l:i,r:i,clipL:this.clipLatchL,clipR:this.clipLatchR}}const n=this.lastPeak;this.levelListeners.forEach(i=>i({...n})),this.rafHandle=requestAnimationFrame(e)};this.rafHandle=requestAnimationFrame(e)}setSpatialSettings(e){if(this.spatial=e,!!this.ctx)for(const n of this.voices.values())n.panner.distanceModel=e.distanceModel,n.panner.refDistance=e.refDistance,n.panner.rolloffFactor=e.rolloffFactor,n.panner.maxDistance=e.maxDistance}setBusGain(e){this.busGain&&this.ctx&&this.busGain.gain.setTargetAtTime(e,this.ctx.currentTime,.01)}setMasterGain(e){this.masterGain&&this.ctx&&this.masterGain.gain.setTargetAtTime(e,this.ctx.currentTime,.01)}setListener(e){if(!this.ctx)return;const n=this.ctx.currentTime,i=Ko(e.yaw,e.pitch),r=TS(e.yaw,e.pitch),s=this.ctx.listener,o=(a,l)=>{a&&a.setTargetAtTime(l,n,.02)};o(s.positionX,e.position.x),o(s.positionY,e.position.y),o(s.positionZ,e.position.z),o(s.forwardX,i.x),o(s.forwardY,i.y),o(s.forwardZ,i.z),o(s.upX,r.x),o(s.upY,r.y),o(s.upZ,r.z)}async ensureTrack(e){if(!this.ctx||this.unlock!=="unlocked")return;let n=this.buffers.get(e.id);if(!n){if(e.sourceType==="file"){const r=this.pendingFiles.get(e.id);if(!r)return;try{const s=await r.arrayBuffer();n=await this.ctx.decodeAudioData(s.slice(0))}catch(s){throw new hr(e.id,`音频解码失败：${s instanceof Error?s.message:"不支持的编码或文件损坏"}`)}}else n=uS(this.ctx,e.sourceType);this.buffers.set(e.id,n)}const i=this.voices.get(e.id);i?this.updateVoiceLive(i,e):this.voices.set(e.id,this.createVoice(e,n))}setFileBlob(e,n){this.pendingFiles.set(e,n)}dropBuffer(e){this.buffers.delete(e)}createVoice(e,n){var c,f,d,h;const i=this.ctx,r=i.createBufferSource();r.loop=e.loop;const s=i.createGain();s.gain.value=e.muted?0:e.gain;const o=new PannerNode(i,{panningModel:"HRTF",distanceModel:((c=this.spatial)==null?void 0:c.distanceModel)??"inverse",refDistance:((f=this.spatial)==null?void 0:f.refDistance)??1,rolloffFactor:((d=this.spatial)==null?void 0:d.rolloffFactor)??1,maxDistance:((h=this.spatial)==null?void 0:h.maxDistance)??100,positionX:e.position.x,positionY:e.position.y,positionZ:e.position.z});if(n.numberOfChannels<=1)r.connect(s);else{const p=i.createChannelSplitter(n.numberOfChannels);r.connect(p);const v=Math.min(e.channel,n.numberOfChannels-1);p.connect(s,v)}s.connect(o);const a=this.shouldBeAudible(e);o.connect(a?this.soloBus:this.muteBus);const l={trackId:e.id,spec:e,source:r,trackGain:s,panner:o,audiblyRouted:a,playing:!1,consumed:!1,startedAt:0,offset:0,duration:n.duration,auto:null};return r.onended=()=>{if(!l.playing)return;const p=l.spec;l.playing=!1,l.consumed=!0,l.offset=0,l.auto=null;const v=this.createVoice(p,n);v.offset=0,this.voices.set(e.id,v),this.endedListeners.forEach(y=>y(e.id))},l}shouldBeAudible(e){return e.muted?!1:this.anySolo?e.solo:!0}updateVoiceLive(e,n){var l,c;const r=this.ctx.currentTime,s=Math.max(.005,((l=this.spatial)==null?void 0:l.positionTimeConstant)??.05);!!(e.auto&&!e.auto.override)||(e.panner.positionX.setTargetAtTime(n.position.x,r,s),e.panner.positionY.setTargetAtTime(n.position.y,r,s),e.panner.positionZ.setTargetAtTime(n.position.z,r,s),e.trackGain.gain.setTargetAtTime(n.muted?0:n.gain,r,.01)),e.panner.distanceModel=((c=this.spatial)==null?void 0:c.distanceModel)??e.panner.distanceModel,e.source.loop!==n.loop&&(e.source.loop=n.loop);const a=this.shouldBeAudible(n);a!==e.audiblyRouted&&(e.panner.disconnect(),e.panner.connect(a?this.soloBus:this.muteBus),e.audiblyRouted=a),e.auto&&!e.auto.override&&e.playing&&(e.spec.loop!==n.loop||e.spec.muted!==n.muted)&&this.armAutomation(e,Fr(n),this.currentOffset(e)),e.spec=n}reevaluateRouting(e){if(this.anySolo=e.some(n=>n.solo),!!this.ctx)for(const n of e){const i=this.voices.get(n.id);if(!i)continue;const r=this.shouldBeAudible(n);r!==i.audiblyRouted&&(i.panner.disconnect(),i.panner.connect(r?this.soloBus:this.muteBus),i.audiblyRouted=r),i.auto&&!i.auto.override||i.trackGain.gain.setTargetAtTime(n.muted?0:n.gain,this.ctx.currentTime,.01),i.spec=n}}syncTracks(e){if(this.ctx){this.anySolo=e.some(n=>n.solo);for(const n of e){const i=this.voices.get(n.id);i&&(i.playing&&i.auto&&i.auto.lane.revision!==Fr(n).revision&&this.armAutomation(i,Fr(n),this.currentOffset(i)),this.updateVoiceLive(i,n))}}}getChannelCount(e){var n;return((n=this.buffers.get(e))==null?void 0:n.numberOfChannels)??null}async rebuildVoiceGraph(e){await this.ensureTrack(e);const n=this.voices.get(e.id),i=this.buffers.get(e.id);if(!n||!i)return;const r=n.playing,s=!!(n.auto&&!n.auto.override),o=r?this.currentOffset(n):n.offset,a=this.replaceVoice(n,e,i,o);if(r){a.source.start(this.ctx.currentTime,o),a.startedAt=this.ctx.currentTime,a.playing=!0,a.consumed=!0;const l=Fr(e);s&&l.keyframes.length>0&&this.armAutomation(a,l,o)}}armAutomation(e,n,i){var d,h,p,v,y,m;const s=this.ctx.currentTime,o=e.source.loop,a=e.duration,l=o?(i%a+a)%a:Math.min(Math.max(0,i),a),c=jl(n,l,a),f=[[e.panner.positionX,(d=c.position)==null?void 0:d.x,"position"],[e.panner.positionY,(h=c.position)==null?void 0:h.y,"position"],[e.panner.positionZ,(p=c.position)==null?void 0:p.z,"position"],[e.panner.orientationX,(v=c.orientation)==null?void 0:v.x,"orientation"],[e.panner.orientationY,(y=c.orientation)==null?void 0:y.y,"orientation"],[e.panner.orientationZ,(m=c.orientation)==null?void 0:m.z,"orientation"],[e.trackGain.gain,c.gain,"gain"]];for(const[u,g]of f)g!==void 0&&(u.cancelScheduledValues(s),u.setValueAtTime(g,s));e.auto={lane:n,startCtx:s,startOffset:l,override:!1,loop:o,position:{untilVirtual:l},orientation:{untilVirtual:l},gain:{untilVirtual:l}}}disarmAutomation(e){var i,r,s;if(!e.auto||!this.ctx){e.auto=null;return}const n=this.ctx.currentTime;e.panner.positionX.cancelScheduledValues(n),e.panner.positionY.cancelScheduledValues(n),e.panner.positionZ.cancelScheduledValues(n),(i=e.panner.orientationX)==null||i.cancelScheduledValues(n),(r=e.panner.orientationY)==null||r.cancelScheduledValues(n),(s=e.panner.orientationZ)==null||s.cancelScheduledValues(n),e.trackGain.gain.cancelScheduledValues(n),e.auto=null}beginOverride(e){const n=this.voices.get(e);if(!n||!n.playing||!n.auto||n.auto.override)return!1;n.auto.override=!0;const r=this.ctx.currentTime;for(const s of[n.panner.positionX,n.panner.positionY,n.panner.positionZ,n.panner.orientationX,n.panner.orientationY,n.panner.orientationZ,n.trackGain.gain])s==null||s.cancelScheduledValues(r);return this.updateVoiceLive(n,n.spec),!0}cancelOverride(e){const n=this.voices.get(e);if(!n||!n.playing||!n.auto||!n.auto.override)return!1;const i=n.auto.lane;return this.armAutomation(n,i,this.currentOffset(n)),!0}isOverride(e){var n,i;return((i=(n=this.voices.get(e))==null?void 0:n.auto)==null?void 0:i.override)??!1}isAutomationArmed(e){var i;const n=(i=this.voices.get(e))==null?void 0:i.auto;return!!n&&!n.override}startAutomationClock(){this.autoTimer==null&&(this.autoTimer=setInterval(()=>{if(this.ctx){for(const e of this.voices.values())if(!(!e.playing||!e.auto||e.auto.override))try{this.pumpAutomation(e)}catch{}}},MS))}pumpAutomation(e){const n=e.auto,i=this.ctx;if(!n||!i||n.override)return;const s=i.currentTime+ES,o=n.lane,a=e.duration,l=n.loop?1/0:n.startCtx+(a-n.startOffset),c=Math.min(s,l);ll(o,"position")&&this.scheduleParam(e,"position",o,n,c),ll(o,"orientation")&&this.scheduleParam(e,"orientation",o,n,c),ll(o,"gain")&&(e.spec.muted||this.scheduleParam(e,"gain",o,n,c))}scheduleParam(e,n,i,r,s){const o=e.duration,a=r[n],l=i.keyframes.filter(f=>f.params[n]!==void 0);if(l.length===0)return;let c=0;for(;!(c++>2e3);){const f=a.untilVirtual;let d=1/0;for(let _=0;_<l.length;_++){const S=l[_].time;let D;if(r.loop){const b=Math.floor((f-S)/o)+1;D=S+Math.max(0,b)*o,D<=f+Sa&&(D+=o)}else if(D=S,D<=f+Sa)continue;D<d&&(d=D)}let h=1/0;if(r.loop){const _=Math.floor((f-r.startOffset)/o)+1;h=r.startOffset+_*o,h<=f+Sa&&(h+=o)}const p=Math.min(d,h);if(!Number.isFinite(p))break;const v=r.startCtx+(p-r.startOffset);if(v>s+Sa)break;const y=h<=d,m=r.loop?(p%o+o)%o:p,u=Ds(i,y?0:m),g=n==="gain"?u.gain:u[n];if(g===void 0){a.untilVirtual=p;continue}if(n==="gain"){const _=e.trackGain.gain;y?_.setValueAtTime(g,v):_.linearRampToValueAtTime(g,v)}else{const _=g,S=n==="position"?[e.panner.positionX,e.panner.positionY,e.panner.positionZ]:[e.panner.orientationX,e.panner.orientationY,e.panner.orientationZ],D=[_.x,_.y,_.z];for(let b=0;b<3;b++)y?S[b].setValueAtTime(D[b],v):S[b].linearRampToValueAtTime(D[b],v)}a.untilVirtual=p}}async playTrack(e){await this.ensureTrack(e);let n=this.voices.get(e.id);if(!n||n.playing)return;if(n.consumed){const s=this.buffers.get(e.id);n=this.replaceVoice(n,e,s,n.offset)}const i=this.ctx;n.source.start(i.currentTime,n.offset%n.duration),n.startedAt=i.currentTime,n.playing=!0,n.consumed=!0;const r=Fr(e);r.keyframes.length>0&&this.armAutomation(n,r,n.offset)}pauseTrack(e){const n=this.voices.get(e.id);!n||!n.playing||(n.offset=this.currentOffset(n),this.replaceVoice(n,e,this.buffers.get(e.id),n.offset))}stopTrack(e){const n=this.voices.get(e.id);n&&(n.playing||n.consumed?this.replaceVoice(n,e,this.buffers.get(e.id),0):n.offset=0)}async seekTrack(e,n,i){await this.ensureTrack(e);const r=this.voices.get(e.id),s=this.buffers.get(e.id);if(!r||!s)return;const o=e.loop?(n%s.duration+s.duration)%s.duration:Math.min(Math.max(0,n),s.duration),a=this.replaceVoice(r,e,s,o);if(i){a.source.start(this.ctx.currentTime,o),a.startedAt=this.ctx.currentTime,a.playing=!0,a.consumed=!0;const l=Fr(e);l.keyframes.length>0&&this.armAutomation(a,l,o)}}replaceVoice(e,n,i,r){this.disarmAutomation(e);try{e.source.onended=null,e.source.stop()}catch{}e.source.disconnect(),e.trackGain.disconnect(),e.panner.disconnect();const s=this.createVoice(n,i);return s.offset=r,this.voices.set(n.id,s),s}currentOffset(e){let n=e.offset+(this.ctx.currentTime-e.startedAt);return n=e.spec.loop?(n%e.duration+e.duration)%e.duration:Math.min(n,e.duration),n}removeTrack(e){const n=this.voices.get(e);if(n){this.disarmAutomation(n);try{n.source.onended=null,n.source.stop()}catch{}n.source.disconnect(),n.trackGain.disconnect(),n.panner.disconnect()}this.voices.delete(e),this.buffers.delete(e),this.pendingFiles.delete(e)}getProgress(e){const n=this.voices.get(e);return n?n.playing?this.currentOffset(n):n.offset:null}getDuration(e){var n;return((n=this.buffers.get(e))==null?void 0:n.duration)??null}isPlaying(e){var n;return((n=this.voices.get(e))==null?void 0:n.playing)??!1}dispose(){var e;cancelAnimationFrame(this.rafHandle),this.autoTimer!=null&&(clearInterval(this.autoTimer),this.autoTimer=null);for(const n of[...this.voices.keys()])this.removeTrack(n);(e=this.ctx)==null||e.close(),this.ctx=null,this.unlock="locked"}}function TS(t,e){const n=Math.cos(e),i=Math.sin(e);return{x:-i*Math.sin(t),y:n,z:i*Math.cos(t)}}const Me=new wS,AS="spatial-audio-workbench",CS=1,Xl="session",Ns="projects",Vo="blobs";function RS(){return new Promise((t,e)=>{const n=indexedDB.open(AS,CS);n.onupgradeneeded=()=>{const i=n.result;i.objectStoreNames.contains(Xl)||i.createObjectStore(Xl),i.objectStoreNames.contains(Ns)||i.createObjectStore(Ns,{keyPath:"id"}).createIndex("savedAt","savedAt"),i.objectStoreNames.contains(Vo)||i.createObjectStore(Vo)},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}function Ei(t,e,n){return RS().then(i=>new Promise((r,s)=>{const o=i.transaction(t,e),a=n(o.objectStore(t));a.onsuccess=()=>r(a.result),a.onerror=()=>s(a.error),o.oncomplete=()=>i.close()}))}async function bS(t){await Ei(Xl,"readwrite",e=>e.put(t,"current"))}async function PS(){return Ei(Xl,"readonly",t=>t.get("current"))}async function LS(t,e){await Ei(Vo,"readwrite",n=>n.put(e,t))}async function sm(t){return Ei(Vo,"readonly",e=>e.get(t))}async function DS(t){await Ei(Vo,"readwrite",e=>e.delete(t))}async function om(){return(await Ei(Ns,"readonly",e=>e.getAll())).sort((e,n)=>n.savedAt-e.savedAt)}async function NS(t){await Ei(Ns,"readwrite",e=>e.put(t))}async function IS(t){await Ei(Ns,"readwrite",e=>e.delete(t))}async function US(t){return Ei(Ns,"readonly",e=>e.get(t))}const Yl=["#e8734a","#4ecdc4","#ffe066","#a78bfa","#f472b6","#34d399","#60a5fa"],FS={distanceModel:"inverse",refDistance:1,rolloffFactor:1,maxDistance:30,positionTimeConstant:.06,hrtfIR:"none"},am={position:{x:0,y:0,z:3},yaw:0,pitch:0,earHeight:0};let lm=0;function cl(t){return lm+=1,`${t}-${Date.now().toString(36)}-${lm}`}function OS(t,e){const i={pulse:{position:{x:-3,y:0,z:0},loop:!0},tone:{position:{x:3,y:0,z:0},loop:!0},duoA:{position:{x:-2,y:0,z:0},loop:!0},duoB:{position:{x:2,y:0,z:0},loop:!0}}[t];return{id:cl("trk"),name:fS[t],sourceType:t,loop:i.loop??!0,muted:!1,solo:!1,gain:.9,channel:0,color:Yl[e%Yl.length],position:{...i.position},automation:yh(),status:"pending"}}function cm(){return{version:2,tracks:[],listener:{...am,position:{...am.position}},spatial:{...FS},busGain:1,masterGain:.9,savedAt:0,automationHistory:F_()}}function ru(t,e,n){return t.map(i=>{if(!e.has(i.id)||i.automation.keyframes.length===0||n.has(i.id))return i;const r=Me.getProgress(i.id);if(r==null)return i;const s=i.duration&&i.duration>0?i.duration:Math.max(If(i.automation),.001),o=i.loop?jl(i.automation,r,s):Ds(i.automation,r);return{...i,position:o.position?{...o.position}:i.position,gain:o.gain!==void 0?o.gain:i.gain,effectiveOrientation:o.orientation?{...o.orientation}:void 0}})}function kS(){const[t,e]=se.useState(cm),[n,i]=se.useState("locked"),[r,s]=se.useState(null),[o,a]=se.useState(new Set),[l,c]=se.useState(new Set),[f,d]=se.useState({l:0,r:0,clipL:!1,clipR:!1}),[h,p]=se.useState(null),[v,y]=se.useState([]),[m,u]=se.useState(null),[g,_]=se.useState(null),[S,D]=se.useState("idle"),[b,T]=se.useState(null),[C,Y]=se.useState(null),[x,E]=se.useState([]),N=se.useRef(t);N.current=t;const H=se.useRef(o);H.current=o;const $=se.useRef(l);$.current=l;const te=se.useRef(!1);se.useEffect(()=>{if(o.size===0){E(ru(N.current.tracks,new Set,$.current));return}let A=0;const L=()=>{E(ru(N.current.tracks,H.current,$.current)),A=requestAnimationFrame(L)};return A=requestAnimationFrame(L),()=>cancelAnimationFrame(A)},[o]),se.useEffect(()=>{o.size===0&&E(ru(t.tracks,new Set,l))},[t,o,l]),se.useEffect(()=>{if(te.current)return;te.current=!0;let A=!1;return(async()=>{try{const[L,O]=await Promise.all([PS(),om()]);if(A)return;O&&y(O);const V=rm(L);V&&e({...V,tracks:V.tracks.map(fe=>({...fe,status:"pending",errorMessage:void 0}))})}catch(L){A||T(`读取本地工程失败：${L instanceof Error?L.message:String(L)}`)}})(),()=>{A=!0}},[]),se.useEffect(()=>Me.onUnlock(i),[]),se.useEffect(()=>Me.onLevels(d),[]),se.useEffect(()=>Me.onEnded(A=>{a(L=>{if(!L.has(A))return L;const O=new Set(L);return O.delete(A),O}),c(L=>{if(!L.has(A))return L;const O=new Set(L);return O.delete(A),O})}),[]),se.useEffect(()=>{Me.setSpatialSettings(t.spatial)},[t.spatial]),se.useEffect(()=>{Me.setListener(t.listener)},[t.listener]),se.useEffect(()=>{Me.setBusGain(t.busGain)},[t.busGain]),se.useEffect(()=>{Me.setMasterGain(t.masterGain)},[t.masterGain]),se.useEffect(()=>{Me.syncTracks(t.tracks)},[t.tracks]),se.useEffect(()=>{if(n!=="unlocked")return;let A=!1;return(async()=>{Me.setSpatialSettings(N.current.spatial),Me.setListener(N.current.listener),Me.setBusGain(N.current.busGain),Me.setMasterGain(N.current.masterGain);for(const L of N.current.tracks)if(L.sourceType==="file"&&L.blobKey&&L.status!=="ready")try{const O=await sm(L.blobKey);O?Me.setFileBlob(L.id,O):A||q(L.id,{status:"decode-error",errorMessage:"本地音频 Blob 缺失"})}catch{A||q(L.id,{status:"decode-error",errorMessage:"读取本地音频失败"})}for(const L of N.current.tracks){if(A)return;try{if(await Me.ensureTrack(L),A)return;if(!N.current.tracks.some(fe=>fe.id===L.id)){Me.removeTrack(L.id);continue}const O=Me.getDuration(L.id),V=Me.getChannelCount(L.id);q(L.id,{status:"ready",errorMessage:void 0,duration:O??L.duration,channels:V??L.channels})}catch(O){if(A)return;O instanceof hr&&q(L.id,{status:"decode-error",errorMessage:O.message})}}})(),()=>{A=!0}},[n]);const X=se.useRef(void 0);se.useEffect(()=>{if(te.current)return D("saving"),window.clearTimeout(X.current),X.current=window.setTimeout(async()=>{const A={...N.current,savedAt:Date.now()};try{await bS(A),D("saved"),window.setTimeout(()=>D("idle"),1200)}catch{D("idle")}},500),()=>window.clearTimeout(X.current)},[t]);function q(A,L){e(O=>({...O,tracks:O.tracks.map(V=>V.id===A?{...V,...L}:V)}))}const U=se.useCallback(A=>p(A),[]),J=se.useCallback(async()=>{s(null);try{await Me.resume()}catch(A){s(A instanceof Error?A.message:String(A))}},[]),ie=se.useCallback(async A=>{if(Me.unlock!=="unlocked"&&(await J(),Me.unlock!=="unlocked"))return;const L=OS(A,N.current.tracks.length);if(e(O=>({...O,tracks:[...O.tracks,L]})),Me.unlock==="unlocked")try{await Me.ensureTrack(L);const O=Me.getDuration(L.id),V=Me.getChannelCount(L.id);q(L.id,{status:"ready",duration:O??void 0,channels:V??void 0})}catch{q(L.id,{status:"decode-error",errorMessage:"样例合成失败"})}p(L.id)},[n,J]),ce=se.useCallback(async A=>{const L=[...A];if(L.length!==0&&!(Me.unlock!=="unlocked"&&(await J(),Me.unlock!=="unlocked")))for(let O=0;O<L.length;O++){const V=L[O],fe=cl("blob"),De=N.current.tracks.length+O,Ge={id:cl("trk"),name:V.name,sourceType:"file",blobKey:fe,originalFileName:V.name,loop:!1,muted:!1,solo:!1,gain:.9,channel:0,color:Yl[De%Yl.length],position:{x:Math.cos(De*2*Math.PI/Math.max(L.length,1))*2.5,y:0,z:Math.sin(De*2*Math.PI/Math.max(L.length,1))*2.5},automation:yh(),status:Me.unlock==="unlocked"?"loading":"pending"};e(Ne=>({...Ne,tracks:[...Ne.tracks,Ge]}));try{await LS(fe,V)}catch{q(Ge.id,{status:"decode-error",errorMessage:"音频写入本地 IndexedDB 失败（浏览器存储可能已满）"});continue}if(Me.unlock==="unlocked"){Me.setFileBlob(Ge.id,V);try{if(!N.current.tracks.some(un=>un.id===Ge.id))continue;if(await Me.ensureTrack(Ge),!N.current.tracks.some(un=>un.id===Ge.id)){Me.removeTrack(Ge.id);continue}const Ne=Me.getDuration(Ge.id),Et=Me.getChannelCount(Ge.id);q(Ge.id,{status:"ready",duration:Ne??void 0,channels:Et??void 0})}catch(Ne){if(!N.current.tracks.some(Et=>Et.id===Ge.id))continue;Ne instanceof hr?q(Ge.id,{status:"decode-error",errorMessage:Ne.message}):q(Ge.id,{status:"decode-error",errorMessage:Ne instanceof Error?Ne.message:String(Ne)})}}}},[n,J]),be=se.useCallback(async A=>{const L=N.current.tracks.find(O=>O.id===A);if(Me.removeTrack(A),L!=null&&L.blobKey)try{await DS(L.blobKey)}catch{}a(O=>{const V=new Set(O);return V.delete(A),V}),c(O=>{const V=new Set(O);return V.delete(A),V}),e(O=>({...O,tracks:O.tracks.filter(V=>V.id!==A),automationHistory:{version:1,undo:O.automationHistory.undo.filter(V=>V.trackId!==A),redo:O.automationHistory.redo.filter(V=>V.trackId!==A)}})),p(O=>O===A?null:O)},[]),Be=se.useCallback(A=>{Me.isPlaying(A)&&Me.isAutomationArmed(A)&&(Me.beginOverride(A),c(L=>{if(L.has(A))return L;const O=new Set(L);return O.add(A),O}))},[]),K=se.useCallback((A,L)=>{const O=N.current.tracks.find(V=>V.id===A);if(O&&(L.gain!==void 0&&L.gain!==O.gain&&Be(A),q(A,L),L.channel!==void 0&&L.channel!==O.channel&&Me.unlock==="unlocked")){const V={...O,...L};Me.rebuildVoiceGraph(V).catch(fe=>{fe instanceof hr&&q(A,{status:"decode-error",errorMessage:fe.message})})}},[Be]),oe=se.useCallback((A,L)=>{Be(A),e(O=>({...O,tracks:O.tracks.map(V=>V.id===A?{...V,position:{...L}}:V)}))},[Be]),Z=se.useCallback(A=>{e(L=>"position"in A?{...L,listener:{...L.listener,position:{...L.listener.position,...A.position}}}:{...L,listener:{...L.listener,...A}})},[]),Q=se.useCallback(A=>{e(L=>({...L,spatial:{...L.spatial,...A}}))},[]),ge=se.useCallback(A=>{e(L=>({...L,busGain:A}))},[]),de=se.useCallback(A=>{e(L=>({...L,masterGain:A}))},[]),he=se.useCallback((A,L)=>{c(O=>{if(!O.has(A))return O;const V=N.current.tracks.find(De=>De.id===A);if(V&&V.automation.keyframes.length>0){const De=L??(V.duration&&V.duration>0?Math.min(Me.getProgress(A)??0,V.duration):0),Ge=V.loop&&V.duration?jl(V.automation,De,V.duration):Ds(V.automation,De);q(A,{...Ge.position?{position:{...Ge.position}}:{},...Ge.gain!==void 0?{gain:Ge.gain}:{}})}const fe=new Set(O);return fe.delete(A),fe})},[]),Te=se.useCallback(async A=>{Me.unlock!=="unlocked"&&await J();const L=N.current.tracks.find(O=>O.id===A);if(!(!L||L.status==="decode-error"))try{await Me.playTrack(L),a(O=>{const V=new Set(O);return V.add(A),V})}catch(O){O instanceof hr?q(A,{status:"decode-error",errorMessage:O.message}):T(O instanceof Error?O.message:String(O))}},[J]),He=se.useCallback(A=>{const L=N.current.tracks.find(V=>V.id===A);if(!L)return;const O=Me.getProgress(A)??0;Me.pauseTrack(L),he(A,O),a(V=>{const fe=new Set(V);return fe.delete(A),fe})},[he]),I=se.useCallback(A=>{const L=N.current.tracks.find(O=>O.id===A);L&&(Me.stopTrack(L),he(A,0),a(O=>{const V=new Set(O);return V.delete(A),V}))},[he]),pt=se.useCallback(async(A,L)=>{const O=N.current.tracks.find(fe=>fe.id===A);if(!O)return;const V=Me.isPlaying(A);await Me.seekTrack(O,L,V),he(A,L),a(fe=>{const De=new Set(fe);return V?De.add(A):De.delete(A),De})},[he]),Ve=se.useCallback(async A=>{Me.isPlaying(A)?He(A):await Te(A)},[He,Te]),Ke=se.useCallback(async()=>{Me.unlock!=="unlocked"&&await J();for(const A of N.current.tracks)if(A.status!=="decode-error")try{await Me.playTrack(A),a(L=>new Set(L).add(A.id))}catch(L){L instanceof hr&&q(A.id,{status:"decode-error",errorMessage:L.message})}},[J]),Ie=se.useCallback(()=>{for(const A of N.current.tracks)Me.stopTrack(A),he(A.id,0);a(new Set)},[he]),ot=se.useCallback(()=>{Me.clearClipLatch(),d(A=>({...A,clipL:!1,clipR:!1}))},[]),Le=se.useCallback(A=>{A instanceof Lt?Y(A.message):Y(A instanceof Error?A.message:String(A))},[]),R=se.useCallback((A,L,O)=>{const V=N.current.tracks.find(De=>De.id===A);if(!V)return!1;let fe;try{fe=O(V.automation)}catch(De){return Le(De),!1}return fe===V.automation||(e(De=>({...De,tracks:De.tracks.map(Ge=>Ge.id===A?{...Ge,automation:fe}:Ge),automationHistory:xS(De.automationHistory,{trackId:A,label:L,before:V.automation,after:fe})})),Y(null)),!0},[Le]),M=se.useCallback((A,L,O)=>R(A,"添加关键帧",V=>im(V,{time:L,params:O})),[R]),G=se.useCallback((A,L,O)=>R(A,"编辑关键帧",V=>mS(V,{id:L,...O})),[R]),ne=se.useCallback((A,L)=>R(A,"删除关键帧",O=>gS(O,L)),[R]),re=se.useCallback(A=>{R(A,"清空自动化轨",L=>vS(L))},[R]),ee=se.useCallback(()=>{const A=new Map(N.current.tracks.map(L=>[L.id,L.automation]));try{const L=yS(N.current.automationHistory,A);e(O=>({...O,automationHistory:L.history,tracks:O.tracks.map(V=>V.id===L.trackId?{...V,automation:L.lane}:V)})),Y(null)}catch(L){Le(L)}},[Le]),Ae=se.useCallback(()=>{const A=new Map(N.current.tracks.map(L=>[L.id,L.automation]));try{const L=SS(N.current.automationHistory,A);e(O=>({...O,automationHistory:L.history,tracks:O.tracks.map(V=>V.id===L.trackId?{...V,automation:L.lane}:V)})),Y(null)}catch(L){Le(L)}},[Le]),pe=se.useCallback(()=>Y(null),[]),ye=se.useCallback(A=>Be(A),[Be]),Ze=se.useCallback(A=>{const L=N.current.tracks.find(V=>V.id===A);if(!L)return;const O=Me.getProgress(A)??0;if(Me.isOverride(A)&&Me.cancelOverride(A),L.automation.keyframes.length>0){const V=L.loop&&L.duration?jl(L.automation,O,L.duration):Ds(L.automation,O);q(A,{...V.position?{position:{...V.position}}:{},...V.gain!==void 0?{gain:V.gain}:{}})}c(V=>{const fe=new Set(V);return fe.delete(A),fe})},[]),le=se.useCallback((A,L)=>{const O=N.current.tracks.find(Ne=>Ne.id===A);if(!O)return!1;const V=L??Me.getProgress(A)??0,fe=Math.round(V*1e3)/1e3;if(O.automation.keyframes.some(Ne=>Math.abs(Ne.time-fe)<.001))return Y(`时间 ${fe.toFixed(3)}s 已存在关键帧：提交被拒绝，原自动化轨保持不变`),!1;const De={position:{...O.position}};ll(O.automation,"gain")&&(De.gain=O.gain);const Ge=R(A,"提交临时覆盖",Ne=>im(Ne,{time:fe,params:De}));return Ge&&c(Ne=>{const Et=new Set(Ne);return Et.delete(A),Et}),Ge},[R]),_e=se.useCallback(async()=>{y(await om())},[]),Ue=se.useCallback(async A=>{const L=m??cl("proj"),O={id:L,name:A.trim()||`工程 ${new Date().toLocaleString()}`,savedAt:Date.now(),doc:{...N.current,savedAt:Date.now()}};await NS(O),u(L),_(O.name),await _e()},[m,_e]),Fe=se.useCallback(async A=>{const L=await US(A);if(!L)return;const O=rm(L);if(!O){T("工程文件结构损坏，无法载入");return}for(const fe of N.current.tracks)Me.removeTrack(fe.id);a(new Set),c(new Set);const V={...O,tracks:O.tracks.map(fe=>({...fe,status:"pending",errorMessage:void 0}))};if(e(V),u(L.id),_(L.name),p(null),Me.unlock==="unlocked")for(const fe of V.tracks){if(fe.sourceType==="file"&&fe.blobKey)try{const De=await sm(fe.blobKey);De?Me.setFileBlob(fe.id,De):q(fe.id,{status:"decode-error",errorMessage:"本地音频 Blob 缺失"})}catch{q(fe.id,{status:"decode-error",errorMessage:"读取本地音频失败"})}try{await Me.ensureTrack(fe),q(fe.id,{status:"ready",duration:Me.getDuration(fe.id)??fe.duration,channels:Me.getChannelCount(fe.id)??fe.channels,errorMessage:void 0})}catch(De){De instanceof hr&&q(fe.id,{status:"decode-error",errorMessage:De.message})}}},[]),Se=se.useCallback(async A=>{await IS(A),m===A&&(u(null),_(null)),await _e()},[m,_e]),$e=se.useCallback(async()=>{for(const A of N.current.tracks)Me.removeTrack(A.id);a(new Set),c(new Set),e(cm()),u(null),_(null),p(null)},[]),ze=se.useCallback(()=>T(null),[]),nt=t.automationHistory.undo.length>0,F=t.automationHistory.redo.length>0;return se.useMemo(()=>({doc:t,displayTracks:x,unlock:n,unlockError:r,playingIds:o,overrideIds:l,levels:f,selectedId:h,projects:v,loadedProjectId:m,loadedProjectName:g,saveState:S,globalError:b,automationError:C,canUndoAutomation:nt,canRedoAutomation:F,selectTrack:U,unlockAudio:J,addSample:ie,addFiles:ce,removeTrack:be,updateTrack:K,moveTrack:oe,setListener:Z,setSpatial:Q,setBusGain:ge,setMasterGain:de,play:Te,pause:He,stop:I,seek:pt,togglePlay:Ve,playAll:Ke,stopAll:Ie,clearClips:ot,addAutomationKeyframe:M,updateAutomationKeyframe:G,removeAutomationKeyframe:ne,clearAutomation:re,undoAutomation:ee,redoAutomation:Ae,dismissAutomationError:pe,beginManualOverride:ye,cancelOverride:Ze,commitOverride:le,saveProjectAs:Ue,loadProject:Fe,deleteProject:Se,newProject:$e,dismissGlobalError:ze}),[t,x,n,r,o,l,f,h,v,m,g,S,b,C,nt,F,U,J,ie,ce,be,K,oe,Z,Q,ge,de,Te,He,I,pt,Ve,Ke,Ie,ot,M,G,ne,re,ee,Ae,pe,ye,Ze,le,Ue,Fe,Se,$e,ze])}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sh="169",zS=0,um=1,BS=2,z_=1,B_=2,oi=3,Qi=0,cn=1,ci=2,$i=0,Ms=1,fm=2,dm=3,hm=4,HS=5,mr=100,VS=101,GS=102,WS=103,jS=104,XS=200,YS=201,$S=202,qS=203,Uf=204,Ff=205,KS=206,ZS=207,QS=208,JS=209,eM=210,tM=211,nM=212,iM=213,rM=214,Of=0,kf=1,zf=2,Is=3,Bf=4,Hf=5,Vf=6,Gf=7,H_=0,sM=1,oM=2,qi=0,aM=1,lM=2,cM=3,uM=4,fM=5,dM=6,hM=7,V_=300,Us=301,Fs=302,Wf=303,jf=304,yc=306,Xf=1e3,yr=1001,Yf=1002,Rn=1003,pM=1004,Ma=1005,Bn=1006,su=1007,Sr=1008,Si=1009,G_=1010,W_=1011,Go=1012,Mh=1013,br=1014,hi=1015,Zo=1016,Eh=1017,wh=1018,Os=1020,j_=35902,X_=1021,Y_=1022,Vn=1023,$_=1024,q_=1025,Es=1026,ks=1027,K_=1028,Th=1029,Z_=1030,Ah=1031,Ch=1033,ul=33776,fl=33777,dl=33778,hl=33779,$f=35840,qf=35841,Kf=35842,Zf=35843,Qf=36196,Jf=37492,ed=37496,td=37808,nd=37809,id=37810,rd=37811,sd=37812,od=37813,ad=37814,ld=37815,cd=37816,ud=37817,fd=37818,dd=37819,hd=37820,pd=37821,pl=36492,md=36494,gd=36495,Q_=36283,vd=36284,_d=36285,xd=36286,mM=3200,gM=3201,J_=0,vM=1,Oi="",qn="srgb",ir="srgb-linear",Rh="display-p3",Sc="display-p3-linear",$l="linear",ft="srgb",ql="rec709",Kl="p3",Or=7680,pm=519,_M=512,xM=513,yM=514,e0=515,SM=516,MM=517,EM=518,wM=519,yd=35044,mm="300 es",pi=2e3,Zl=2001;class Gs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let gm=1234567;const Eo=Math.PI/180,Wo=180/Math.PI;function gi(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Gt[t&255]+Gt[t>>8&255]+Gt[t>>16&255]+Gt[t>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[n&63|128]+Gt[n>>8&255]+"-"+Gt[n>>16&255]+Gt[n>>24&255]+Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]).toLowerCase()}function Zt(t,e,n){return Math.max(e,Math.min(n,t))}function bh(t,e){return(t%e+e)%e}function TM(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function AM(t,e,n){return t!==e?(n-t)/(e-t):0}function wo(t,e,n){return(1-n)*t+n*e}function CM(t,e,n,i){return wo(t,e,1-Math.exp(-n*i))}function RM(t,e=1){return e-Math.abs(bh(t,e*2)-e)}function bM(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function PM(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function LM(t,e){return t+Math.floor(Math.random()*(e-t+1))}function DM(t,e){return t+Math.random()*(e-t)}function NM(t){return t*(.5-Math.random())}function IM(t){t!==void 0&&(gm=t);let e=gm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function UM(t){return t*Eo}function FM(t){return t*Wo}function OM(t){return(t&t-1)===0&&t!==0}function kM(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function zM(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function BM(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),f=o((e+i)/2),d=s((e-i)/2),h=o((e-i)/2),p=s((i-e)/2),v=o((i-e)/2);switch(r){case"XYX":t.set(a*f,l*d,l*h,a*c);break;case"YZY":t.set(l*h,a*f,l*d,a*c);break;case"ZXZ":t.set(l*d,l*h,a*f,a*c);break;case"XZX":t.set(a*f,l*v,l*p,a*c);break;case"YXY":t.set(l*p,a*f,l*v,a*c);break;case"ZYZ":t.set(l*v,l*p,a*f,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Hn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function rt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const vm={DEG2RAD:Eo,RAD2DEG:Wo,generateUUID:gi,clamp:Zt,euclideanModulo:bh,mapLinear:TM,inverseLerp:AM,lerp:wo,damp:CM,pingpong:RM,smoothstep:bM,smootherstep:PM,randInt:LM,randFloat:DM,randFloatSpread:NM,seededRandom:IM,degToRad:UM,radToDeg:FM,isPowerOfTwo:OM,ceilPowerOfTwo:kM,floorPowerOfTwo:zM,setQuaternionFromProperEuler:BM,normalize:rt,denormalize:Hn};class Ye{constructor(e=0,n=0){Ye.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Zt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class je{constructor(e,n,i,r,s,o,a,l,c){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=a,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=o,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],f=i[4],d=i[7],h=i[2],p=i[5],v=i[8],y=r[0],m=r[3],u=r[6],g=r[1],_=r[4],S=r[7],D=r[2],b=r[5],T=r[8];return s[0]=o*y+a*g+l*D,s[3]=o*m+a*_+l*b,s[6]=o*u+a*S+l*T,s[1]=c*y+f*g+d*D,s[4]=c*m+f*_+d*b,s[7]=c*u+f*S+d*T,s[2]=h*y+p*g+v*D,s[5]=h*m+p*_+v*b,s[8]=h*u+p*S+v*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8];return n*o*f-n*a*c-i*s*f+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8],d=f*o-a*c,h=a*l-f*s,p=c*s-o*l,v=n*d+i*h+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/v;return e[0]=d*y,e[1]=(r*c-f*i)*y,e[2]=(a*i-r*o)*y,e[3]=h*y,e[4]=(f*n-r*l)*y,e[5]=(r*s-a*n)*y,e[6]=p*y,e[7]=(i*l-c*n)*y,e[8]=(o*n-i*s)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(ou.makeScale(e,n)),this}rotate(e){return this.premultiply(ou.makeRotation(-e)),this}translate(e,n){return this.premultiply(ou.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ou=new je;function t0(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Ql(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function HM(){const t=Ql("canvas");return t.style.display="block",t}const _m={};function ml(t){t in _m||(_m[t]=!0,console.warn(t))}function VM(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function GM(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function WM(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const xm=new je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ym=new je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Js={[ir]:{transfer:$l,primaries:ql,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t,fromReference:t=>t},[qn]:{transfer:ft,primaries:ql,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[Sc]:{transfer:$l,primaries:Kl,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.applyMatrix3(ym),fromReference:t=>t.applyMatrix3(xm)},[Rh]:{transfer:ft,primaries:Kl,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.convertSRGBToLinear().applyMatrix3(ym),fromReference:t=>t.applyMatrix3(xm).convertLinearToSRGB()}},jM=new Set([ir,Sc]),tt={enabled:!0,_workingColorSpace:ir,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!jM.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=Js[e].toReference,r=Js[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return Js[t].primaries},getTransfer:function(t){return t===Oi?$l:Js[t].transfer},getLuminanceCoefficients:function(t,e=this._workingColorSpace){return t.fromArray(Js[e].luminanceCoefficients)}};function ws(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function au(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let kr;class XM{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{kr===void 0&&(kr=Ql("canvas")),kr.width=e.width,kr.height=e.height;const i=kr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=kr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Ql("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ws(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ws(n[i]/255)*255):n[i]=ws(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let YM=0;class n0{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:YM++}),this.uuid=gi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(lu(r[o].image)):s.push(lu(r[o]))}else s=lu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function lu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?XM.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $M=0;class en extends Gs{constructor(e=en.DEFAULT_IMAGE,n=en.DEFAULT_MAPPING,i=yr,r=yr,s=Bn,o=Sr,a=Vn,l=Si,c=en.DEFAULT_ANISOTROPY,f=Oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$M++}),this.uuid=gi(),this.name="",this.source=new n0(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==V_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xf:e.x=e.x-Math.floor(e.x);break;case yr:e.x=e.x<0?0:1;break;case Yf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xf:e.y=e.y-Math.floor(e.y);break;case yr:e.y=e.y<0?0:1;break;case Yf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=V_;en.DEFAULT_ANISOTROPY=1;class Mt{constructor(e=0,n=0,i=0,r=1){Mt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],f=l[4],d=l[8],h=l[1],p=l[5],v=l[9],y=l[2],m=l[6],u=l[10];if(Math.abs(f-h)<.01&&Math.abs(d-y)<.01&&Math.abs(v-m)<.01){if(Math.abs(f+h)<.1&&Math.abs(d+y)<.1&&Math.abs(v+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const _=(c+1)/2,S=(p+1)/2,D=(u+1)/2,b=(f+h)/4,T=(d+y)/4,C=(v+m)/4;return _>S&&_>D?_<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(_),r=b/i,s=T/i):S>D?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=b/r,s=C/r):D<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),i=T/s,r=C/s),this.set(i,r,s,n),this}let g=Math.sqrt((m-v)*(m-v)+(d-y)*(d-y)+(h-f)*(h-f));return Math.abs(g)<.001&&(g=1),this.x=(m-v)/g,this.y=(d-y)/g,this.z=(h-f)/g,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qM extends Gs{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Mt(0,0,e,n),this.scissorTest=!1,this.viewport=new Mt(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new en(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new n0(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pr extends qM{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class i0 extends en{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class KM extends en{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qo{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],f=i[r+2],d=i[r+3];const h=s[o+0],p=s[o+1],v=s[o+2],y=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=f,e[n+3]=d;return}if(a===1){e[n+0]=h,e[n+1]=p,e[n+2]=v,e[n+3]=y;return}if(d!==y||l!==h||c!==p||f!==v){let m=1-a;const u=l*h+c*p+f*v+d*y,g=u>=0?1:-1,_=1-u*u;if(_>Number.EPSILON){const D=Math.sqrt(_),b=Math.atan2(D,u*g);m=Math.sin(m*b)/D,a=Math.sin(a*b)/D}const S=a*g;if(l=l*m+h*S,c=c*m+p*S,f=f*m+v*S,d=d*m+y*S,m===1-a){const D=1/Math.sqrt(l*l+c*c+f*f+d*d);l*=D,c*=D,f*=D,d*=D}}e[n]=l,e[n+1]=c,e[n+2]=f,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],f=i[r+3],d=s[o],h=s[o+1],p=s[o+2],v=s[o+3];return e[n]=a*v+f*d+l*p-c*h,e[n+1]=l*v+f*h+c*d-a*p,e[n+2]=c*v+f*p+a*h-l*d,e[n+3]=f*v-a*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),f=a(r/2),d=a(s/2),h=l(i/2),p=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=h*f*d+c*p*v,this._y=c*p*d-h*f*v,this._z=c*f*v+h*p*d,this._w=c*f*d-h*p*v;break;case"YXZ":this._x=h*f*d+c*p*v,this._y=c*p*d-h*f*v,this._z=c*f*v-h*p*d,this._w=c*f*d+h*p*v;break;case"ZXY":this._x=h*f*d-c*p*v,this._y=c*p*d+h*f*v,this._z=c*f*v+h*p*d,this._w=c*f*d-h*p*v;break;case"ZYX":this._x=h*f*d-c*p*v,this._y=c*p*d+h*f*v,this._z=c*f*v-h*p*d,this._w=c*f*d+h*p*v;break;case"YZX":this._x=h*f*d+c*p*v,this._y=c*p*d+h*f*v,this._z=c*f*v-h*p*d,this._w=c*f*d-h*p*v;break;case"XZY":this._x=h*f*d-c*p*v,this._y=c*p*d-h*f*v,this._z=c*f*v+h*p*d,this._w=c*f*d+h*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],f=n[6],d=n[10],h=i+a+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(f-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(f-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+f)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Zt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+o*a+r*c-s*l,this._y=r*f+o*l+s*a-i*c,this._z=s*f+o*c+i*l-r*a,this._w=o*f-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),f=Math.atan2(c,a),d=Math.sin((1-n)*f)/c,h=Math.sin(n*f)/c;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,n=0,i=0){B.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Sm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Sm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),f=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*c+o*d-a*f,this.y=i+l*f+a*c-s*d,this.z=r+l*d+s*f-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return cu.copy(this).projectOnVector(e),this.sub(cu)}reflect(e){return this.sub(cu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Zt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const cu=new B,Sm=new Qo;class Jo{constructor(e=new B(1/0,1/0,1/0),n=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(In.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(In.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=In.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,In):In.fromBufferAttribute(s,o),In.applyMatrix4(e.matrixWorld),this.expandByPoint(In);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ea.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ea.copy(i.boundingBox)),Ea.applyMatrix4(e.matrixWorld),this.union(Ea)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,In),In.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(eo),wa.subVectors(this.max,eo),zr.subVectors(e.a,eo),Br.subVectors(e.b,eo),Hr.subVectors(e.c,eo),Ai.subVectors(Br,zr),Ci.subVectors(Hr,Br),sr.subVectors(zr,Hr);let n=[0,-Ai.z,Ai.y,0,-Ci.z,Ci.y,0,-sr.z,sr.y,Ai.z,0,-Ai.x,Ci.z,0,-Ci.x,sr.z,0,-sr.x,-Ai.y,Ai.x,0,-Ci.y,Ci.x,0,-sr.y,sr.x,0];return!uu(n,zr,Br,Hr,wa)||(n=[1,0,0,0,1,0,0,0,1],!uu(n,zr,Br,Hr,wa))?!1:(Ta.crossVectors(Ai,Ci),n=[Ta.x,Ta.y,Ta.z],uu(n,zr,Br,Hr,wa))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,In).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(In).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ti=[new B,new B,new B,new B,new B,new B,new B,new B],In=new B,Ea=new Jo,zr=new B,Br=new B,Hr=new B,Ai=new B,Ci=new B,sr=new B,eo=new B,wa=new B,Ta=new B,or=new B;function uu(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){or.fromArray(t,s);const a=r.x*Math.abs(or.x)+r.y*Math.abs(or.y)+r.z*Math.abs(or.z),l=e.dot(or),c=n.dot(or),f=i.dot(or);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>a)return!1}return!0}const ZM=new Jo,to=new B,fu=new B;class Mc{constructor(e=new B,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):ZM.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;to.subVectors(e,this.center);const n=to.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(to,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(to.copy(e.center).add(fu)),this.expandByPoint(to.copy(e.center).sub(fu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ni=new B,du=new B,Aa=new B,Ri=new B,hu=new B,Ca=new B,pu=new B;class Ph{constructor(e=new B,n=new B(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ni)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ni.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ni.copy(this.origin).addScaledVector(this.direction,n),ni.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){du.copy(e).add(n).multiplyScalar(.5),Aa.copy(n).sub(e).normalize(),Ri.copy(this.origin).sub(du);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Aa),a=Ri.dot(this.direction),l=-Ri.dot(Aa),c=Ri.lengthSq(),f=Math.abs(1-o*o);let d,h,p,v;if(f>0)if(d=o*l-a,h=o*a-l,v=s*f,d>=0)if(h>=-v)if(h<=v){const y=1/f;d*=y,h*=y,p=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h<=-v?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c):h<=v?(d=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(du).addScaledVector(Aa,h),p}intersectSphere(e,n){ni.subVectors(e.center,this.origin);const i=ni.dot(this.direction),r=ni.dot(ni)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),f>=0?(s=(e.min.y-h.y)*f,o=(e.max.y-h.y)*f):(s=(e.max.y-h.y)*f,o=(e.min.y-h.y)*f),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,ni)!==null}intersectTriangle(e,n,i,r,s){hu.subVectors(n,e),Ca.subVectors(i,e),pu.crossVectors(hu,Ca);let o=this.direction.dot(pu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ri.subVectors(this.origin,e);const l=a*this.direction.dot(Ca.crossVectors(Ri,Ca));if(l<0)return null;const c=a*this.direction.dot(hu.cross(Ri));if(c<0||l+c>o)return null;const f=-a*Ri.dot(pu);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ht{constructor(e,n,i,r,s,o,a,l,c,f,d,h,p,v,y,m){ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,f,d,h,p,v,y,m)}set(e,n,i,r,s,o,a,l,c,f,d,h,p,v,y,m){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=f,u[10]=d,u[14]=h,u[3]=p,u[7]=v,u[11]=y,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ht().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Vr.setFromMatrixColumn(e,0).length(),s=1/Vr.setFromMatrixColumn(e,1).length(),o=1/Vr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*f,p=o*d,v=a*f,y=a*d;n[0]=l*f,n[4]=-l*d,n[8]=c,n[1]=p+v*c,n[5]=h-y*c,n[9]=-a*l,n[2]=y-h*c,n[6]=v+p*c,n[10]=o*l}else if(e.order==="YXZ"){const h=l*f,p=l*d,v=c*f,y=c*d;n[0]=h+y*a,n[4]=v*a-p,n[8]=o*c,n[1]=o*d,n[5]=o*f,n[9]=-a,n[2]=p*a-v,n[6]=y+h*a,n[10]=o*l}else if(e.order==="ZXY"){const h=l*f,p=l*d,v=c*f,y=c*d;n[0]=h-y*a,n[4]=-o*d,n[8]=v+p*a,n[1]=p+v*a,n[5]=o*f,n[9]=y-h*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const h=o*f,p=o*d,v=a*f,y=a*d;n[0]=l*f,n[4]=v*c-p,n[8]=h*c+y,n[1]=l*d,n[5]=y*c+h,n[9]=p*c-v,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*c,v=a*l,y=a*c;n[0]=l*f,n[4]=y-h*d,n[8]=v*d+p,n[1]=d,n[5]=o*f,n[9]=-a*f,n[2]=-c*f,n[6]=p*d+v,n[10]=h-y*d}else if(e.order==="XZY"){const h=o*l,p=o*c,v=a*l,y=a*c;n[0]=l*f,n[4]=-d,n[8]=c*f,n[1]=h*d+y,n[5]=o*f,n[9]=p*d-v,n[2]=v*d-p,n[6]=a*f,n[10]=y*d+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(QM,e,JM)}lookAt(e,n,i){const r=this.elements;return hn.subVectors(e,n),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),bi.crossVectors(i,hn),bi.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),bi.crossVectors(i,hn)),bi.normalize(),Ra.crossVectors(hn,bi),r[0]=bi.x,r[4]=Ra.x,r[8]=hn.x,r[1]=bi.y,r[5]=Ra.y,r[9]=hn.y,r[2]=bi.z,r[6]=Ra.z,r[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],f=i[1],d=i[5],h=i[9],p=i[13],v=i[2],y=i[6],m=i[10],u=i[14],g=i[3],_=i[7],S=i[11],D=i[15],b=r[0],T=r[4],C=r[8],Y=r[12],x=r[1],E=r[5],N=r[9],H=r[13],$=r[2],te=r[6],X=r[10],q=r[14],U=r[3],J=r[7],ie=r[11],ce=r[15];return s[0]=o*b+a*x+l*$+c*U,s[4]=o*T+a*E+l*te+c*J,s[8]=o*C+a*N+l*X+c*ie,s[12]=o*Y+a*H+l*q+c*ce,s[1]=f*b+d*x+h*$+p*U,s[5]=f*T+d*E+h*te+p*J,s[9]=f*C+d*N+h*X+p*ie,s[13]=f*Y+d*H+h*q+p*ce,s[2]=v*b+y*x+m*$+u*U,s[6]=v*T+y*E+m*te+u*J,s[10]=v*C+y*N+m*X+u*ie,s[14]=v*Y+y*H+m*q+u*ce,s[3]=g*b+_*x+S*$+D*U,s[7]=g*T+_*E+S*te+D*J,s[11]=g*C+_*N+S*X+D*ie,s[15]=g*Y+_*H+S*q+D*ce,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],f=e[2],d=e[6],h=e[10],p=e[14],v=e[3],y=e[7],m=e[11],u=e[15];return v*(+s*l*d-r*c*d-s*a*h+i*c*h+r*a*p-i*l*p)+y*(+n*l*p-n*c*h+s*o*h-r*o*p+r*c*f-s*l*f)+m*(+n*c*d-n*a*p-s*o*d+i*o*p+s*a*f-i*c*f)+u*(-r*a*f-n*l*d+n*a*h+r*o*d-i*o*h+i*l*f)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8],d=e[9],h=e[10],p=e[11],v=e[12],y=e[13],m=e[14],u=e[15],g=d*m*c-y*h*c+y*l*p-a*m*p-d*l*u+a*h*u,_=v*h*c-f*m*c-v*l*p+o*m*p+f*l*u-o*h*u,S=f*y*c-v*d*c+v*a*p-o*y*p-f*a*u+o*d*u,D=v*d*l-f*y*l-v*a*h+o*y*h+f*a*m-o*d*m,b=n*g+i*_+r*S+s*D;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/b;return e[0]=g*T,e[1]=(y*h*s-d*m*s-y*r*p+i*m*p+d*r*u-i*h*u)*T,e[2]=(a*m*s-y*l*s+y*r*c-i*m*c-a*r*u+i*l*u)*T,e[3]=(d*l*s-a*h*s-d*r*c+i*h*c+a*r*p-i*l*p)*T,e[4]=_*T,e[5]=(f*m*s-v*h*s+v*r*p-n*m*p-f*r*u+n*h*u)*T,e[6]=(v*l*s-o*m*s-v*r*c+n*m*c+o*r*u-n*l*u)*T,e[7]=(o*h*s-f*l*s+f*r*c-n*h*c-o*r*p+n*l*p)*T,e[8]=S*T,e[9]=(v*d*s-f*y*s-v*i*p+n*y*p+f*i*u-n*d*u)*T,e[10]=(o*y*s-v*a*s+v*i*c-n*y*c-o*i*u+n*a*u)*T,e[11]=(f*a*s-o*d*s-f*i*c+n*d*c+o*i*p-n*a*p)*T,e[12]=D*T,e[13]=(f*y*r-v*d*r+v*i*h-n*y*h-f*i*m+n*d*m)*T,e[14]=(v*a*r-o*y*r-v*i*l+n*y*l+o*i*m-n*a*m)*T,e[15]=(o*d*r-f*a*r+f*i*l-n*d*l-o*i*h+n*a*h)*T,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,f=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,f*a+i,f*l-r*o,0,c*l-r*a,f*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,f=o+o,d=a+a,h=s*c,p=s*f,v=s*d,y=o*f,m=o*d,u=a*d,g=l*c,_=l*f,S=l*d,D=i.x,b=i.y,T=i.z;return r[0]=(1-(y+u))*D,r[1]=(p+S)*D,r[2]=(v-_)*D,r[3]=0,r[4]=(p-S)*b,r[5]=(1-(h+u))*b,r[6]=(m+g)*b,r[7]=0,r[8]=(v+_)*T,r[9]=(m-g)*T,r[10]=(1-(h+y))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Vr.set(r[0],r[1],r[2]).length();const o=Vr.set(r[4],r[5],r[6]).length(),a=Vr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Un.copy(this);const c=1/s,f=1/o,d=1/a;return Un.elements[0]*=c,Un.elements[1]*=c,Un.elements[2]*=c,Un.elements[4]*=f,Un.elements[5]*=f,Un.elements[6]*=f,Un.elements[8]*=d,Un.elements[9]*=d,Un.elements[10]*=d,n.setFromRotationMatrix(Un),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=pi){const l=this.elements,c=2*s/(n-e),f=2*s/(i-r),d=(n+e)/(n-e),h=(i+r)/(i-r);let p,v;if(a===pi)p=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Zl)p=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=pi){const l=this.elements,c=1/(n-e),f=1/(i-r),d=1/(o-s),h=(n+e)*c,p=(i+r)*f;let v,y;if(a===pi)v=(o+s)*d,y=-2*d;else if(a===Zl)v=s*d,y=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*f,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Vr=new B,Un=new ht,QM=new B(0,0,0),JM=new B(1,1,1),bi=new B,Ra=new B,hn=new B,Mm=new ht,Em=new Qo;class ei{constructor(e=0,n=0,i=0,r=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],f=r[9],d=r[2],h=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Zt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Mm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Em.setFromEuler(this),this.setFromQuaternion(Em,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class Lh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let eE=0;const wm=new B,Gr=new Qo,ii=new ht,ba=new B,no=new B,tE=new B,nE=new Qo,Tm=new B(1,0,0),Am=new B(0,1,0),Cm=new B(0,0,1),Rm={type:"added"},iE={type:"removed"},Wr={type:"childadded",child:null},mu={type:"childremoved",child:null};class Rt extends Gs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:eE++}),this.uuid=gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new B,n=new ei,i=new Qo,r=new B(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ht},normalMatrix:{value:new je}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Gr.setFromAxisAngle(e,n),this.quaternion.multiply(Gr),this}rotateOnWorldAxis(e,n){return Gr.setFromAxisAngle(e,n),this.quaternion.premultiply(Gr),this}rotateX(e){return this.rotateOnAxis(Tm,e)}rotateY(e){return this.rotateOnAxis(Am,e)}rotateZ(e){return this.rotateOnAxis(Cm,e)}translateOnAxis(e,n){return wm.copy(e).applyQuaternion(this.quaternion),this.position.add(wm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Tm,e)}translateY(e){return this.translateOnAxis(Am,e)}translateZ(e){return this.translateOnAxis(Cm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?ba.copy(e):ba.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),no.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ii.lookAt(no,ba,this.up):ii.lookAt(ba,no,this.up),this.quaternion.setFromRotationMatrix(ii),r&&(ii.extractRotation(r.matrixWorld),Gr.setFromRotationMatrix(ii),this.quaternion.premultiply(Gr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Rm),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(iE),mu.child=e,this.dispatchEvent(mu),mu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ii.multiply(e.parent.matrixWorld)),e.applyMatrix4(ii),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Rm),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(no,e,tE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(no,nE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),f=o(e.images),d=o(e.shapes),h=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const c in a){const f=a[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Rt.DEFAULT_UP=new B(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Fn=new B,ri=new B,gu=new B,si=new B,jr=new B,Xr=new B,bm=new B,vu=new B,_u=new B,xu=new B,yu=new Mt,Su=new Mt,Mu=new Mt;class An{constructor(e=new B,n=new B,i=new B){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Fn.subVectors(e,n),r.cross(Fn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Fn.subVectors(r,n),ri.subVectors(i,n),gu.subVectors(e,n);const o=Fn.dot(Fn),a=Fn.dot(ri),l=Fn.dot(gu),c=ri.dot(ri),f=ri.dot(gu),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,p=(c*l-a*f)*h,v=(o*f-a*l)*h;return s.set(1-p-v,v,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,si)===null?!1:si.x>=0&&si.y>=0&&si.x+si.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,si.x),l.addScaledVector(o,si.y),l.addScaledVector(a,si.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return yu.setScalar(0),Su.setScalar(0),Mu.setScalar(0),yu.fromBufferAttribute(e,n),Su.fromBufferAttribute(e,i),Mu.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(yu,s.x),o.addScaledVector(Su,s.y),o.addScaledVector(Mu,s.z),o}static isFrontFacing(e,n,i,r){return Fn.subVectors(i,n),ri.subVectors(e,n),Fn.cross(ri).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Fn.subVectors(this.c,this.b),ri.subVectors(this.a,this.b),Fn.cross(ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return An.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return An.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return An.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return An.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return An.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;jr.subVectors(r,i),Xr.subVectors(s,i),vu.subVectors(e,i);const l=jr.dot(vu),c=Xr.dot(vu);if(l<=0&&c<=0)return n.copy(i);_u.subVectors(e,r);const f=jr.dot(_u),d=Xr.dot(_u);if(f>=0&&d<=f)return n.copy(r);const h=l*d-f*c;if(h<=0&&l>=0&&f<=0)return o=l/(l-f),n.copy(i).addScaledVector(jr,o);xu.subVectors(e,s);const p=jr.dot(xu),v=Xr.dot(xu);if(v>=0&&p<=v)return n.copy(s);const y=p*c-l*v;if(y<=0&&c>=0&&v<=0)return a=c/(c-v),n.copy(i).addScaledVector(Xr,a);const m=f*v-p*d;if(m<=0&&d-f>=0&&p-v>=0)return bm.subVectors(s,r),a=(d-f)/(d-f+(p-v)),n.copy(r).addScaledVector(bm,a);const u=1/(m+y+h);return o=y*u,a=h*u,n.copy(i).addScaledVector(jr,o).addScaledVector(Xr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const r0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},Pa={h:0,s:0,l:0};function Eu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Xe{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=qn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=tt.workingColorSpace){return this.r=e,this.g=n,this.b=i,tt.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=tt.workingColorSpace){if(e=bh(e,1),n=Zt(n,0,1),i=Zt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Eu(o,s,e+1/3),this.g=Eu(o,s,e),this.b=Eu(o,s,e-1/3)}return tt.toWorkingColorSpace(this,r),this}setStyle(e,n=qn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=qn){const i=r0[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ws(e.r),this.g=ws(e.g),this.b=ws(e.b),this}copyLinearToSRGB(e){return this.r=au(e.r),this.g=au(e.g),this.b=au(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qn){return tt.fromWorkingColorSpace(Wt.copy(this),e),Math.round(Zt(Wt.r*255,0,255))*65536+Math.round(Zt(Wt.g*255,0,255))*256+Math.round(Zt(Wt.b*255,0,255))}getHexString(e=qn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=tt.workingColorSpace){tt.fromWorkingColorSpace(Wt.copy(this),n);const i=Wt.r,r=Wt.g,s=Wt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const f=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=f<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,n=tt.workingColorSpace){return tt.fromWorkingColorSpace(Wt.copy(this),n),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=qn){tt.fromWorkingColorSpace(Wt.copy(this),e);const n=Wt.r,i=Wt.g,r=Wt.b;return e!==qn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+n,Pi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Pi),e.getHSL(Pa);const i=wo(Pi.h,Pa.h,n),r=wo(Pi.s,Pa.s,n),s=wo(Pi.l,Pa.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new Xe;Xe.NAMES=r0;let rE=0;class Nr extends Gs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rE++}),this.uuid=gi(),this.name="",this.type="Material",this.blending=Ms,this.side=Qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Uf,this.blendDst=Ff,this.blendEquation=mr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=Is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Or,this.stencilZFail=Or,this.stencilZPass=Or,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ms&&(i.blending=this.blending),this.side!==Qi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Uf&&(i.blendSrc=this.blendSrc),this.blendDst!==Ff&&(i.blendDst=this.blendDst),this.blendEquation!==mr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Is&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Or&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Or&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Or&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ec extends Nr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=H_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new B,La=new Ye;class jn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=yd,this.updateRanges=[],this.gpuType=hi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)La.fromBufferAttribute(this,n),La.applyMatrix3(e),this.setXY(n,La.x,La.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.applyMatrix3(e),this.setXYZ(n,At.x,At.y,At.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.applyMatrix4(e),this.setXYZ(n,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.applyNormalMatrix(e),this.setXYZ(n,At.x,At.y,At.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.transformDirection(e),this.setXYZ(n,At.x,At.y,At.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Hn(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=rt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Hn(n,this.array)),n}setX(e,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Hn(n,this.array)),n}setY(e,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Hn(n,this.array)),n}setZ(e,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Hn(n,this.array)),n}setW(e,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=rt(n,this.array),i=rt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=rt(n,this.array),i=rt(i,this.array),r=rt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=rt(n,this.array),i=rt(i,this.array),r=rt(r,this.array),s=rt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==yd&&(e.usage=this.usage),e}}class s0 extends jn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class o0 extends jn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class _t extends jn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let sE=0;const Mn=new ht,wu=new Rt,Yr=new B,pn=new Jo,io=new Jo,It=new B;class Yt extends Gs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sE++}),this.uuid=gi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(t0(e)?o0:s0)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Mn.makeRotationFromQuaternion(e),this.applyMatrix4(Mn),this}rotateX(e){return Mn.makeRotationX(e),this.applyMatrix4(Mn),this}rotateY(e){return Mn.makeRotationY(e),this.applyMatrix4(Mn),this}rotateZ(e){return Mn.makeRotationZ(e),this.applyMatrix4(Mn),this}translate(e,n,i){return Mn.makeTranslation(e,n,i),this.applyMatrix4(Mn),this}scale(e,n,i){return Mn.makeScale(e,n,i),this.applyMatrix4(Mn),this}lookAt(e){return wu.lookAt(e),wu.updateMatrix(),this.applyMatrix4(wu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yr).negate(),this.translate(Yr.x,Yr.y,Yr.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new _t(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];pn.setFromBufferAttribute(s),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(pn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];io.setFromBufferAttribute(a),this.morphTargetsRelative?(It.addVectors(pn.min,io.min),pn.expandByPoint(It),It.addVectors(pn.max,io.max),pn.expandByPoint(It)):(pn.expandByPoint(io.min),pn.expandByPoint(io.max))}pn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)It.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(It));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,f=a.count;c<f;c++)It.fromBufferAttribute(a,c),l&&(Yr.fromBufferAttribute(e,c),It.add(Yr)),r=Math.max(r,i.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<i.count;C++)a[C]=new B,l[C]=new B;const c=new B,f=new B,d=new B,h=new Ye,p=new Ye,v=new Ye,y=new B,m=new B;function u(C,Y,x){c.fromBufferAttribute(i,C),f.fromBufferAttribute(i,Y),d.fromBufferAttribute(i,x),h.fromBufferAttribute(s,C),p.fromBufferAttribute(s,Y),v.fromBufferAttribute(s,x),f.sub(c),d.sub(c),p.sub(h),v.sub(h);const E=1/(p.x*v.y-v.x*p.y);isFinite(E)&&(y.copy(f).multiplyScalar(v.y).addScaledVector(d,-p.y).multiplyScalar(E),m.copy(d).multiplyScalar(p.x).addScaledVector(f,-v.x).multiplyScalar(E),a[C].add(y),a[Y].add(y),a[x].add(y),l[C].add(m),l[Y].add(m),l[x].add(m))}let g=this.groups;g.length===0&&(g=[{start:0,count:e.count}]);for(let C=0,Y=g.length;C<Y;++C){const x=g[C],E=x.start,N=x.count;for(let H=E,$=E+N;H<$;H+=3)u(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const _=new B,S=new B,D=new B,b=new B;function T(C){D.fromBufferAttribute(r,C),b.copy(D);const Y=a[C];_.copy(Y),_.sub(D.multiplyScalar(D.dot(Y))).normalize(),S.crossVectors(b,Y);const E=S.dot(l[C])<0?-1:1;o.setXYZW(C,_.x,_.y,_.z,E)}for(let C=0,Y=g.length;C<Y;++C){const x=g[C],E=x.start,N=x.count;for(let H=E,$=E+N;H<$;H+=3)T(e.getX(H+0)),T(e.getX(H+1)),T(e.getX(H+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new jn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new B,s=new B,o=new B,a=new B,l=new B,c=new B,f=new B,d=new B;if(e)for(let h=0,p=e.count;h<p;h+=3){const v=e.getX(h+0),y=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,y),o.fromBufferAttribute(n,m),f.subVectors(o,s),d.subVectors(r,s),f.cross(d),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),a.add(f),l.add(f),c.add(f),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),f.subVectors(o,s),d.subVectors(r,s),f.cross(d),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)It.fromBufferAttribute(e,n),It.normalize(),e.setXYZ(n,It.x,It.y,It.z)}toNonIndexed(){function e(a,l){const c=a.array,f=a.itemSize,d=a.normalized,h=new c.constructor(l.length*f);let p=0,v=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*f;for(let u=0;u<f;u++)h[v++]=c[p++]}return new jn(h,f,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Yt,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let f=0,d=c.length;f<d;f++){const h=c[f],p=e(h,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];f.push(p.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(n))}const s=e.morphAttributes;for(const c in s){const f=[],d=s[c];for(let h=0,p=d.length;h<p;h++)f.push(d[h].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,f=o.length;c<f;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Pm=new ht,ar=new Ph,Da=new Mc,Lm=new B,Na=new B,Ia=new B,Ua=new B,Tu=new B,Fa=new B,Dm=new B,Oa=new B;class Qt extends Rt{constructor(e=new Yt,n=new Ec){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Fa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=a[l],d=s[l];f!==0&&(Tu.fromBufferAttribute(d,e),o?Fa.addScaledVector(Tu,f):Fa.addScaledVector(Tu.sub(n),f))}n.add(Fa)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Da.copy(i.boundingSphere),Da.applyMatrix4(s),ar.copy(e.ray).recast(e.near),!(Da.containsPoint(ar.origin)===!1&&(ar.intersectSphere(Da,Lm)===null||ar.origin.distanceToSquared(Lm)>(e.far-e.near)**2))&&(Pm.copy(s).invert(),ar.copy(e.ray).applyMatrix4(Pm),!(i.boundingBox!==null&&ar.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,ar)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,y=h.length;v<y;v++){const m=h[v],u=o[m.materialIndex],g=Math.max(m.start,p.start),_=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=g,D=_;S<D;S+=3){const b=a.getX(S),T=a.getX(S+1),C=a.getX(S+2);r=ka(this,u,e,i,c,f,d,b,T,C),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=v,u=y;m<u;m+=3){const g=a.getX(m),_=a.getX(m+1),S=a.getX(m+2);r=ka(this,o,e,i,c,f,d,g,_,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,y=h.length;v<y;v++){const m=h[v],u=o[m.materialIndex],g=Math.max(m.start,p.start),_=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=g,D=_;S<D;S+=3){const b=S,T=S+1,C=S+2;r=ka(this,u,e,i,c,f,d,b,T,C),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=v,u=y;m<u;m+=3){const g=m,_=m+1,S=m+2;r=ka(this,o,e,i,c,f,d,g,_,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function oE(t,e,n,i,r,s,o,a){let l;if(e.side===cn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Qi,a),l===null)return null;Oa.copy(a),Oa.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Oa);return c<n.near||c>n.far?null:{distance:c,point:Oa.clone(),object:t}}function ka(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,Na),t.getVertexPosition(l,Ia),t.getVertexPosition(c,Ua);const f=oE(t,e,n,i,Na,Ia,Ua,Dm);if(f){const d=new B;An.getBarycoord(Dm,Na,Ia,Ua,d),r&&(f.uv=An.getInterpolatedAttribute(r,a,l,c,d,new Ye)),s&&(f.uv1=An.getInterpolatedAttribute(s,a,l,c,d,new Ye)),o&&(f.normal=An.getInterpolatedAttribute(o,a,l,c,d,new B),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new B,materialIndex:0};An.getNormal(Na,Ia,Ua,h.normal),f.face=h,f.barycoord=d}return f}class ea extends Yt{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],f=[],d=[];let h=0,p=0;v("z","y","x",-1,-1,i,n,e,o,s,0),v("z","y","x",1,-1,i,n,-e,o,s,1),v("x","z","y",1,1,e,i,n,r,o,2),v("x","z","y",1,-1,e,i,-n,r,o,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(f,3)),this.setAttribute("uv",new _t(d,2));function v(y,m,u,g,_,S,D,b,T,C,Y){const x=S/T,E=D/C,N=S/2,H=D/2,$=b/2,te=T+1,X=C+1;let q=0,U=0;const J=new B;for(let ie=0;ie<X;ie++){const ce=ie*E-H;for(let be=0;be<te;be++){const Be=be*x-N;J[y]=Be*g,J[m]=ce*_,J[u]=$,c.push(J.x,J.y,J.z),J[y]=0,J[m]=0,J[u]=b>0?1:-1,f.push(J.x,J.y,J.z),d.push(be/T),d.push(1-ie/C),q+=1}}for(let ie=0;ie<C;ie++)for(let ce=0;ce<T;ce++){const be=h+ce+te*ie,Be=h+ce+te*(ie+1),K=h+(ce+1)+te*(ie+1),oe=h+(ce+1)+te*ie;l.push(be,Be,oe),l.push(Be,K,oe),U+=6}a.addGroup(p,U,Y),p+=U,h+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ea(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function zs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function qt(t){const e={};for(let n=0;n<t.length;n++){const i=zs(t[n]);for(const r in i)e[r]=i[r]}return e}function aE(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function a0(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const lE={clone:zs,merge:qt};var cE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,uE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ji extends Nr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cE,this.fragmentShader=uE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zs(e.uniforms),this.uniformsGroups=aE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class l0 extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=pi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Li=new B,Nm=new Ye,Im=new Ye;class Tn extends l0{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Wo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Eo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wo*2*Math.atan(Math.tan(Eo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Li.x,Li.y).multiplyScalar(-e/Li.z),Li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Li.x,Li.y).multiplyScalar(-e/Li.z)}getViewSize(e,n){return this.getViewBounds(e,Nm,Im),n.subVectors(Im,Nm)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Eo*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const $r=-90,qr=1;class fE extends Rt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Tn($r,qr,e,n);r.layers=this.layers,this.add(r);const s=new Tn($r,qr,e,n);s.layers=this.layers,this.add(s);const o=new Tn($r,qr,e,n);o.layers=this.layers,this.add(o);const a=new Tn($r,qr,e,n);a.layers=this.layers,this.add(a);const l=new Tn($r,qr,e,n);l.layers=this.layers,this.add(l);const c=new Tn($r,qr,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===pi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Zl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,f]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(n,f),e.setRenderTarget(d,h,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class c0 extends en{constructor(e,n,i,r,s,o,a,l,c,f){e=e!==void 0?e:[],n=n!==void 0?n:Us,super(e,n,i,r,s,o,a,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class dE extends Pr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new c0(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Bn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ea(5,5,5),s=new Ji({name:"CubemapFromEquirect",uniforms:zs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:$i});s.uniforms.tEquirect.value=n;const o=new Qt(r,s),a=n.minFilter;return n.minFilter===Sr&&(n.minFilter=Bn),new fE(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const Au=new B,hE=new B,pE=new je;class Ii{constructor(e=new B(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Au.subVectors(i,n).cross(hE.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Au),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||pE.getNormalMatrix(e),r=this.coplanarPoint(Au).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const lr=new Mc,za=new B;class Dh{constructor(e=new Ii,n=new Ii,i=new Ii,r=new Ii,s=new Ii,o=new Ii){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=pi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],f=r[5],d=r[6],h=r[7],p=r[8],v=r[9],y=r[10],m=r[11],u=r[12],g=r[13],_=r[14],S=r[15];if(i[0].setComponents(l-s,h-c,m-p,S-u).normalize(),i[1].setComponents(l+s,h+c,m+p,S+u).normalize(),i[2].setComponents(l+o,h+f,m+v,S+g).normalize(),i[3].setComponents(l-o,h-f,m-v,S-g).normalize(),i[4].setComponents(l-a,h-d,m-y,S-_).normalize(),n===pi)i[5].setComponents(l+a,h+d,m+y,S+_).normalize();else if(n===Zl)i[5].setComponents(a,d,y,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),lr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(lr)}intersectsSprite(e){return lr.center.set(0,0,0),lr.radius=.7071067811865476,lr.applyMatrix4(e.matrixWorld),this.intersectsSphere(lr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(za.x=r.normal.x>0?e.max.x:e.min.x,za.y=r.normal.y>0?e.max.y:e.min.y,za.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(za)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function u0(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function mE(t){const e=new WeakMap;function n(a,l){const c=a.array,f=a.usage,d=c.byteLength,h=t.createBuffer();t.bindBuffer(l,h),t.bufferData(l,c,f),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const f=l.array,d=l.updateRanges;if(t.bindBuffer(c,a),d.length===0)t.bufferSubData(c,0,f);else{d.sort((p,v)=>p.start-v.start);let h=0;for(let p=1;p<d.length;p++){const v=d[h],y=d[p];y.start<=v.start+v.count+1?v.count=Math.max(v.count,y.start+y.count-v.start):(++h,d[h]=y)}d.length=h+1;for(let p=0,v=d.length;p<v;p++){const y=d[p];t.bufferSubData(c,y.start*f.BYTES_PER_ELEMENT,f,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const f=e.get(a);(!f||f.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class wc extends Yt{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,f=l+1,d=e/a,h=n/l,p=[],v=[],y=[],m=[];for(let u=0;u<f;u++){const g=u*h-o;for(let _=0;_<c;_++){const S=_*d-s;v.push(S,-g,0),y.push(0,0,1),m.push(_/a),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let g=0;g<a;g++){const _=g+c*u,S=g+c*(u+1),D=g+1+c*(u+1),b=g+1+c*u;p.push(_,S,b),p.push(S,D,b)}this.setIndex(p),this.setAttribute("position",new _t(v,3)),this.setAttribute("normal",new _t(y,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wc(e.width,e.height,e.widthSegments,e.heightSegments)}}var gE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vE=`#ifdef USE_ALPHAHASH
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
#endif`,_E=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,SE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ME=`#ifdef USE_AOMAP
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
#endif`,EE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wE=`#ifdef USE_BATCHING
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
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,TE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,AE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,CE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,RE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,bE=`#ifdef USE_IRIDESCENCE
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
#endif`,PE=`#ifdef USE_BUMPMAP
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
#endif`,LE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,DE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,NE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,IE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,UE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,FE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,OE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,kE=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,zE=`#define PI 3.141592653589793
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
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
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
} // validated`,BE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,HE=`vec3 transformedNormal = objectNormal;
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
#endif`,VE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,GE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,WE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,XE="gl_FragColor = linearToOutputTexel( gl_FragColor );",YE=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$E=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,qE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,KE=`#ifdef USE_ENVMAP
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
#endif`,ZE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,QE=`#ifdef USE_ENVMAP
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
#endif`,JE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ew=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,iw=`#ifdef USE_GRADIENTMAP
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
}`,rw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ow=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,aw=`uniform bool receiveShadow;
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
#endif`,lw=`#ifdef USE_ENVMAP
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
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
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
#endif`,cw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,uw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hw=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,pw=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,mw=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,gw=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
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
#endif`,vw=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_w=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xw=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yw=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sw=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Mw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ew=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ww=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Tw=`#if defined( USE_POINTS_UV )
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
#endif`,Aw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lw=`#ifdef USE_MORPHTARGETS
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
#endif`,Dw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Iw=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Uw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ow=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kw=`#ifdef USE_NORMALMAP
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
#endif`,zw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ww=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,jw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$w=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Kw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
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
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
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
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
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
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Qw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
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
#endif`,eT=`float getShadowMask() {
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
	#if NUM_POINT_LIGHT_SHADOWS > 0
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
}`,tT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nT=`#ifdef USE_SKINNING
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
#endif`,iT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rT=`#ifdef USE_SKINNING
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
#endif`,sT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,oT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,aT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cT=`#ifdef USE_TRANSMISSION
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
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,uT=`#ifdef USE_TRANSMISSION
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
#endif`,fT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gT=`uniform sampler2D t2D;
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
}`,vT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_T=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ST=`#include <common>
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
}`,MT=`#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ET=`#define DISTANCE
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
}`,wT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
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
	gl_FragColor = packDepthToRGBA( dist );
}`,TT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,AT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CT=`uniform float scale;
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
}`,RT=`uniform vec3 diffuse;
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
}`,bT=`#include <common>
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
}`,PT=`uniform vec3 diffuse;
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
}`,LT=`#define LAMBERT
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
}`,DT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,NT=`#define MATCAP
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
}`,IT=`#define MATCAP
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
}`,UT=`#define NORMAL
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
}`,FT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
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
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,OT=`#define PHONG
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
}`,kT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,zT=`#define STANDARD
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
}`,BT=`#define STANDARD
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
#include <packing>
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,HT=`#define TOON
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
}`,VT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`,GT=`uniform float size;
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
}`,WT=`uniform vec3 diffuse;
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
}`,jT=`#include <common>
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
}`,XT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,YT=`uniform float rotation;
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
}`,$T=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:gE,alphahash_pars_fragment:vE,alphamap_fragment:_E,alphamap_pars_fragment:xE,alphatest_fragment:yE,alphatest_pars_fragment:SE,aomap_fragment:ME,aomap_pars_fragment:EE,batching_pars_vertex:wE,batching_vertex:TE,begin_vertex:AE,beginnormal_vertex:CE,bsdfs:RE,iridescence_fragment:bE,bumpmap_pars_fragment:PE,clipping_planes_fragment:LE,clipping_planes_pars_fragment:DE,clipping_planes_pars_vertex:NE,clipping_planes_vertex:IE,color_fragment:UE,color_pars_fragment:FE,color_pars_vertex:OE,color_vertex:kE,common:zE,cube_uv_reflection_fragment:BE,defaultnormal_vertex:HE,displacementmap_pars_vertex:VE,displacementmap_vertex:GE,emissivemap_fragment:WE,emissivemap_pars_fragment:jE,colorspace_fragment:XE,colorspace_pars_fragment:YE,envmap_fragment:$E,envmap_common_pars_fragment:qE,envmap_pars_fragment:KE,envmap_pars_vertex:ZE,envmap_physical_pars_fragment:lw,envmap_vertex:QE,fog_vertex:JE,fog_pars_vertex:ew,fog_fragment:tw,fog_pars_fragment:nw,gradientmap_pars_fragment:iw,lightmap_pars_fragment:rw,lights_lambert_fragment:sw,lights_lambert_pars_fragment:ow,lights_pars_begin:aw,lights_toon_fragment:cw,lights_toon_pars_fragment:uw,lights_phong_fragment:fw,lights_phong_pars_fragment:dw,lights_physical_fragment:hw,lights_physical_pars_fragment:pw,lights_fragment_begin:mw,lights_fragment_maps:gw,lights_fragment_end:vw,logdepthbuf_fragment:_w,logdepthbuf_pars_fragment:xw,logdepthbuf_pars_vertex:yw,logdepthbuf_vertex:Sw,map_fragment:Mw,map_pars_fragment:Ew,map_particle_fragment:ww,map_particle_pars_fragment:Tw,metalnessmap_fragment:Aw,metalnessmap_pars_fragment:Cw,morphinstance_vertex:Rw,morphcolor_vertex:bw,morphnormal_vertex:Pw,morphtarget_pars_vertex:Lw,morphtarget_vertex:Dw,normal_fragment_begin:Nw,normal_fragment_maps:Iw,normal_pars_fragment:Uw,normal_pars_vertex:Fw,normal_vertex:Ow,normalmap_pars_fragment:kw,clearcoat_normal_fragment_begin:zw,clearcoat_normal_fragment_maps:Bw,clearcoat_pars_fragment:Hw,iridescence_pars_fragment:Vw,opaque_fragment:Gw,packing:Ww,premultiplied_alpha_fragment:jw,project_vertex:Xw,dithering_fragment:Yw,dithering_pars_fragment:$w,roughnessmap_fragment:qw,roughnessmap_pars_fragment:Kw,shadowmap_pars_fragment:Zw,shadowmap_pars_vertex:Qw,shadowmap_vertex:Jw,shadowmask_pars_fragment:eT,skinbase_vertex:tT,skinning_pars_vertex:nT,skinning_vertex:iT,skinnormal_vertex:rT,specularmap_fragment:sT,specularmap_pars_fragment:oT,tonemapping_fragment:aT,tonemapping_pars_fragment:lT,transmission_fragment:cT,transmission_pars_fragment:uT,uv_pars_fragment:fT,uv_pars_vertex:dT,uv_vertex:hT,worldpos_vertex:pT,background_vert:mT,background_frag:gT,backgroundCube_vert:vT,backgroundCube_frag:_T,cube_vert:xT,cube_frag:yT,depth_vert:ST,depth_frag:MT,distanceRGBA_vert:ET,distanceRGBA_frag:wT,equirect_vert:TT,equirect_frag:AT,linedashed_vert:CT,linedashed_frag:RT,meshbasic_vert:bT,meshbasic_frag:PT,meshlambert_vert:LT,meshlambert_frag:DT,meshmatcap_vert:NT,meshmatcap_frag:IT,meshnormal_vert:UT,meshnormal_frag:FT,meshphong_vert:OT,meshphong_frag:kT,meshphysical_vert:zT,meshphysical_frag:BT,meshtoon_vert:HT,meshtoon_frag:VT,points_vert:GT,points_frag:WT,shadow_vert:jT,shadow_frag:XT,sprite_vert:YT,sprite_frag:$T},me={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Kn={basic:{uniforms:qt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:qt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Xe(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:qt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:qt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:qt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Xe(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:qt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:qt([me.points,me.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:qt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:qt([me.common,me.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:qt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:qt([me.sprite,me.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:qt([me.common,me.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:qt([me.lights,me.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Kn.physical={uniforms:qt([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Ba={r:0,b:0,g:0},cr=new ei,qT=new ht;function KT(t,e,n,i,r,s,o){const a=new Xe(0);let l=s===!0?0:1,c,f,d=null,h=0,p=null;function v(g){let _=g.isScene===!0?g.background:null;return _&&_.isTexture&&(_=(g.backgroundBlurriness>0?n:e).get(_)),_}function y(g){let _=!1;const S=v(g);S===null?u(a,l):S&&S.isColor&&(u(S,1),_=!0);const D=t.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(g,_){const S=v(_);S&&(S.isCubeTexture||S.mapping===yc)?(f===void 0&&(f=new Qt(new ea(1,1,1),new Ji({name:"BackgroundCubeMaterial",uniforms:zs(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(D,b,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),cr.copy(_.backgroundRotation),cr.x*=-1,cr.y*=-1,cr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(cr.y*=-1,cr.z*=-1),f.material.uniforms.envMap.value=S,f.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(qT.makeRotationFromEuler(cr)),f.material.toneMapped=tt.getTransfer(S.colorSpace)!==ft,(d!==S||h!==S.version||p!==t.toneMapping)&&(f.material.needsUpdate=!0,d=S,h=S.version,p=t.toneMapping),f.layers.enableAll(),g.unshift(f,f.geometry,f.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Qt(new wc(2,2),new Ji({name:"BackgroundMaterial",uniforms:zs(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:Qi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=tt.getTransfer(S.colorSpace)!==ft,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||h!==S.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,d=S,h=S.version,p=t.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null))}function u(g,_){g.getRGB(Ba,a0(t)),i.buffers.color.setClear(Ba.r,Ba.g,Ba.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(g,_=1){a.set(g),l=_,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,u(a,l)},render:y,addToRenderList:m}}function ZT(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(x,E,N,H,$){let te=!1;const X=d(H,N,E);s!==X&&(s=X,c(s.object)),te=p(x,H,N,$),te&&v(x,H,N,$),$!==null&&e.update($,t.ELEMENT_ARRAY_BUFFER),(te||o)&&(o=!1,S(x,E,N,H),$!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return t.createVertexArray()}function c(x){return t.bindVertexArray(x)}function f(x){return t.deleteVertexArray(x)}function d(x,E,N){const H=N.wireframe===!0;let $=i[x.id];$===void 0&&($={},i[x.id]=$);let te=$[E.id];te===void 0&&(te={},$[E.id]=te);let X=te[H];return X===void 0&&(X=h(l()),te[H]=X),X}function h(x){const E=[],N=[],H=[];for(let $=0;$<n;$++)E[$]=0,N[$]=0,H[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:N,attributeDivisors:H,object:x,attributes:{},index:null}}function p(x,E,N,H){const $=s.attributes,te=E.attributes;let X=0;const q=N.getAttributes();for(const U in q)if(q[U].location>=0){const ie=$[U];let ce=te[U];if(ce===void 0&&(U==="instanceMatrix"&&x.instanceMatrix&&(ce=x.instanceMatrix),U==="instanceColor"&&x.instanceColor&&(ce=x.instanceColor)),ie===void 0||ie.attribute!==ce||ce&&ie.data!==ce.data)return!0;X++}return s.attributesNum!==X||s.index!==H}function v(x,E,N,H){const $={},te=E.attributes;let X=0;const q=N.getAttributes();for(const U in q)if(q[U].location>=0){let ie=te[U];ie===void 0&&(U==="instanceMatrix"&&x.instanceMatrix&&(ie=x.instanceMatrix),U==="instanceColor"&&x.instanceColor&&(ie=x.instanceColor));const ce={};ce.attribute=ie,ie&&ie.data&&(ce.data=ie.data),$[U]=ce,X++}s.attributes=$,s.attributesNum=X,s.index=H}function y(){const x=s.newAttributes;for(let E=0,N=x.length;E<N;E++)x[E]=0}function m(x){u(x,0)}function u(x,E){const N=s.newAttributes,H=s.enabledAttributes,$=s.attributeDivisors;N[x]=1,H[x]===0&&(t.enableVertexAttribArray(x),H[x]=1),$[x]!==E&&(t.vertexAttribDivisor(x,E),$[x]=E)}function g(){const x=s.newAttributes,E=s.enabledAttributes;for(let N=0,H=E.length;N<H;N++)E[N]!==x[N]&&(t.disableVertexAttribArray(N),E[N]=0)}function _(x,E,N,H,$,te,X){X===!0?t.vertexAttribIPointer(x,E,N,$,te):t.vertexAttribPointer(x,E,N,H,$,te)}function S(x,E,N,H){y();const $=H.attributes,te=N.getAttributes(),X=E.defaultAttributeValues;for(const q in te){const U=te[q];if(U.location>=0){let J=$[q];if(J===void 0&&(q==="instanceMatrix"&&x.instanceMatrix&&(J=x.instanceMatrix),q==="instanceColor"&&x.instanceColor&&(J=x.instanceColor)),J!==void 0){const ie=J.normalized,ce=J.itemSize,be=e.get(J);if(be===void 0)continue;const Be=be.buffer,K=be.type,oe=be.bytesPerElement,Z=K===t.INT||K===t.UNSIGNED_INT||J.gpuType===Mh;if(J.isInterleavedBufferAttribute){const Q=J.data,ge=Q.stride,de=J.offset;if(Q.isInstancedInterleavedBuffer){for(let he=0;he<U.locationSize;he++)u(U.location+he,Q.meshPerAttribute);x.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let he=0;he<U.locationSize;he++)m(U.location+he);t.bindBuffer(t.ARRAY_BUFFER,Be);for(let he=0;he<U.locationSize;he++)_(U.location+he,ce/U.locationSize,K,ie,ge*oe,(de+ce/U.locationSize*he)*oe,Z)}else{if(J.isInstancedBufferAttribute){for(let Q=0;Q<U.locationSize;Q++)u(U.location+Q,J.meshPerAttribute);x.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Q=0;Q<U.locationSize;Q++)m(U.location+Q);t.bindBuffer(t.ARRAY_BUFFER,Be);for(let Q=0;Q<U.locationSize;Q++)_(U.location+Q,ce/U.locationSize,K,ie,ce*oe,ce/U.locationSize*Q*oe,Z)}}else if(X!==void 0){const ie=X[q];if(ie!==void 0)switch(ie.length){case 2:t.vertexAttrib2fv(U.location,ie);break;case 3:t.vertexAttrib3fv(U.location,ie);break;case 4:t.vertexAttrib4fv(U.location,ie);break;default:t.vertexAttrib1fv(U.location,ie)}}}}g()}function D(){C();for(const x in i){const E=i[x];for(const N in E){const H=E[N];for(const $ in H)f(H[$].object),delete H[$];delete E[N]}delete i[x]}}function b(x){if(i[x.id]===void 0)return;const E=i[x.id];for(const N in E){const H=E[N];for(const $ in H)f(H[$].object),delete H[$];delete E[N]}delete i[x.id]}function T(x){for(const E in i){const N=i[E];if(N[x.id]===void 0)continue;const H=N[x.id];for(const $ in H)f(H[$].object),delete H[$];delete N[x.id]}}function C(){Y(),o=!0,s!==r&&(s=r,c(s.object))}function Y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:Y,dispose:D,releaseStatesOfGeometry:b,releaseStatesOfProgram:T,initAttributes:y,enableAttribute:m,disableUnusedAttributes:g}}function QT(t,e,n){let i;function r(c){i=c}function s(c,f){t.drawArrays(i,c,f),n.update(f,i,1)}function o(c,f,d){d!==0&&(t.drawArraysInstanced(i,c,f,d),n.update(f,i,d))}function a(c,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,f,0,d);let p=0;for(let v=0;v<d;v++)p+=f[v];n.update(p,i,1)}function l(c,f,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<c.length;v++)o(c[v],f[v],h[v]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,f,0,h,0,d);let v=0;for(let y=0;y<d;y++)v+=f[y];for(let y=0;y<h.length;y++)n.update(v,i,h[y])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function JT(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(T){return!(T!==Vn&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const C=T===Zo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Si&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==hi&&!C)}function l(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const f=l(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const d=n.logarithmicDepthBuffer===!0,h=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(h===!0){const T=e.get("EXT_clip_control");T.clipControlEXT(T.LOWER_LEFT_EXT,T.ZERO_TO_ONE_EXT)}const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),u=t.getParameter(t.MAX_VERTEX_ATTRIBS),g=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),_=t.getParameter(t.MAX_VARYING_VECTORS),S=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),D=v>0,b=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:v,maxTextureSize:y,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:g,maxVaryings:_,maxFragmentUniforms:S,vertexTextures:D,maxSamples:b}}function e1(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Ii,a=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||i!==0||r;return r=h,i=d.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){n=f(d,h,0)},this.setState=function(d,h,p){const v=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,u=t.get(d);if(!r||v===null||v.length===0||s&&!m)s?f(null):c();else{const g=s?0:i,_=g*4;let S=u.clippingState||null;l.value=S,S=f(v,h,_,p);for(let D=0;D!==_;++D)S[D]=n[D];u.clippingState=S,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(d,h,p,v){const y=d!==null?d.length:0;let m=null;if(y!==0){if(m=l.value,v!==!0||m===null){const u=p+y*4,g=h.matrixWorldInverse;a.getNormalMatrix(g),(m===null||m.length<u)&&(m=new Float32Array(u));for(let _=0,S=p;_!==y;++_,S+=4)o.copy(d[_]).applyMatrix4(g,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function t1(t){let e=new WeakMap;function n(o,a){return a===Wf?o.mapping=Us:a===jf&&(o.mapping=Fs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Wf||a===jf)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new dE(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class f0 extends l0{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=f*this.view.offsetY,l=a-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const ps=4,Um=[.125,.215,.35,.446,.526,.582],gr=20,Cu=new f0,Fm=new Xe;let Ru=null,bu=0,Pu=0,Lu=!1;const pr=(1+Math.sqrt(5))/2,Kr=1/pr,Om=[new B(-pr,Kr,0),new B(pr,Kr,0),new B(-Kr,0,pr),new B(Kr,0,pr),new B(0,pr,-Kr),new B(0,pr,Kr),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)];class km{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){Ru=this._renderer.getRenderTarget(),bu=this._renderer.getActiveCubeFace(),Pu=this._renderer.getActiveMipmapLevel(),Lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ru,bu,Pu),this._renderer.xr.enabled=Lu,e.scissorTest=!1,Ha(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Us||e.mapping===Fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ru=this._renderer.getRenderTarget(),bu=this._renderer.getActiveCubeFace(),Pu=this._renderer.getActiveMipmapLevel(),Lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Bn,minFilter:Bn,generateMipmaps:!1,type:Zo,format:Vn,colorSpace:ir,depthBuffer:!1},r=zm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zm(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=n1(s)),this._blurMaterial=i1(s,e,n)}return r}_compileMaterial(e){const n=new Qt(this._lodPlanes[0],e);this._renderer.compile(n,Cu)}_sceneToCubeUV(e,n,i,r){const a=new Tn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,h=f.toneMapping;f.getClearColor(Fm),f.toneMapping=qi,f.autoClear=!1;const p=new Ec({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),v=new Qt(new ea,p);let y=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,y=!0):(p.color.copy(Fm),y=!0);for(let u=0;u<6;u++){const g=u%3;g===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):g===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));const _=this._cubeSize;Ha(r,g*_,u>2?_:0,_,_),f.setRenderTarget(r),y&&f.render(v,a),f.render(e,a)}v.geometry.dispose(),v.material.dispose(),f.toneMapping=h,f.autoClear=d,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Us||e.mapping===Fs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bm());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Qt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ha(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Cu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Om[(r-s-1)%Om.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,d=new Qt(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*gr-1),y=s/v,m=isFinite(s)?1+Math.floor(f*y):gr;m>gr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gr}`);const u=[];let g=0;for(let T=0;T<gr;++T){const C=T/y,Y=Math.exp(-C*C/2);u.push(Y),T===0?g+=Y:T<m&&(g+=2*Y)}for(let T=0;T<u.length;T++)u[T]=u[T]/g;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=u,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:_}=this;h.dTheta.value=v,h.mipInt.value=_-i;const S=this._sizeLods[r],D=3*S*(r>_-ps?r-_+ps:0),b=4*(this._cubeSize-S);Ha(n,D,b,3*S,2*S),l.setRenderTarget(n),l.render(d,Cu)}}function n1(t){const e=[],n=[],i=[];let r=t;const s=t-ps+1+Um.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-ps?l=Um[o-t+ps-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),f=-c,d=1+c,h=[f,f,d,f,d,d,f,f,d,d,f,d],p=6,v=6,y=3,m=2,u=1,g=new Float32Array(y*v*p),_=new Float32Array(m*v*p),S=new Float32Array(u*v*p);for(let b=0;b<p;b++){const T=b%3*2/3-1,C=b>2?0:-1,Y=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];g.set(Y,y*v*b),_.set(h,m*v*b);const x=[b,b,b,b,b,b];S.set(x,u*v*b)}const D=new Yt;D.setAttribute("position",new jn(g,y)),D.setAttribute("uv",new jn(_,m)),D.setAttribute("faceIndex",new jn(S,u)),e.push(D),r>ps&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function zm(t,e,n){const i=new Pr(t,e,n);return i.texture.mapping=yc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ha(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function i1(t,e,n){const i=new Float32Array(gr),r=new B(0,1,0);return new Ji({name:"SphericalGaussianBlur",defines:{n:gr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Nh(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Bm(){return new Ji({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nh(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Hm(){return new Ji({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Nh(){return`

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
	`}function r1(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Wf||l===jf,f=l===Us||l===Fs;if(c||f){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return n===null&&(n=new km(t)),d=c?n.fromEquirectangular(a,d):n.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||f&&p&&r(p)?(n===null&&(n=new km(t)),d=c?n.fromEquirectangular(a):n.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0;const c=6;for(let f=0;f<c;f++)a[f]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function s1(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&ml("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function o1(t,e,n,i){const r={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const v in h.attributes)e.remove(h.attributes[v]);for(const v in h.morphAttributes){const y=h.morphAttributes[v];for(let m=0,u=y.length;m<u;m++)e.remove(y[m])}h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function l(d){const h=d.attributes;for(const v in h)e.update(h[v],t.ARRAY_BUFFER);const p=d.morphAttributes;for(const v in p){const y=p[v];for(let m=0,u=y.length;m<u;m++)e.update(y[m],t.ARRAY_BUFFER)}}function c(d){const h=[],p=d.index,v=d.attributes.position;let y=0;if(p!==null){const g=p.array;y=p.version;for(let _=0,S=g.length;_<S;_+=3){const D=g[_+0],b=g[_+1],T=g[_+2];h.push(D,b,b,T,T,D)}}else if(v!==void 0){const g=v.array;y=v.version;for(let _=0,S=g.length/3-1;_<S;_+=3){const D=_+0,b=_+1,T=_+2;h.push(D,b,b,T,T,D)}}else return;const m=new(t0(h)?o0:s0)(h,1);m.version=y;const u=s.get(d);u&&e.remove(u),s.set(d,m)}function f(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:f}}function a1(t,e,n){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,p){t.drawElements(i,p,s,h*o),n.update(p,i,1)}function c(h,p,v){v!==0&&(t.drawElementsInstanced(i,p,s,h*o,v),n.update(p,i,v))}function f(h,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,v);let m=0;for(let u=0;u<v;u++)m+=p[u];n.update(m,i,1)}function d(h,p,v,y){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<h.length;u++)c(h[u]/o,p[u],y[u]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,y,0,v);let u=0;for(let g=0;g<v;g++)u+=p[g];for(let g=0;g<y.length;g++)n.update(u,i,y[g])}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=d}function l1(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function c1(t,e,n){const i=new WeakMap,r=new Mt;function s(o,a,l){const c=o.morphTargetInfluences,f=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=f!==void 0?f.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let x=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",x)};var p=x;h!==void 0&&h.texture.dispose();const v=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let S=0;v===!0&&(S=1),y===!0&&(S=2),m===!0&&(S=3);let D=a.attributes.position.count*S,b=1;D>e.maxTextureSize&&(b=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const T=new Float32Array(D*b*4*d),C=new i0(T,D,b,d);C.type=hi,C.needsUpdate=!0;const Y=S*4;for(let E=0;E<d;E++){const N=u[E],H=g[E],$=_[E],te=D*b*4*E;for(let X=0;X<N.count;X++){const q=X*Y;v===!0&&(r.fromBufferAttribute(N,X),T[te+q+0]=r.x,T[te+q+1]=r.y,T[te+q+2]=r.z,T[te+q+3]=0),y===!0&&(r.fromBufferAttribute(H,X),T[te+q+4]=r.x,T[te+q+5]=r.y,T[te+q+6]=r.z,T[te+q+7]=0),m===!0&&(r.fromBufferAttribute($,X),T[te+q+8]=r.x,T[te+q+9]=r.y,T[te+q+10]=r.z,T[te+q+11]=$.itemSize===4?r.w:1)}}h={count:d,texture:C,size:new Ye(D,b)},i.set(a,h),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let v=0;for(let m=0;m<c.length;m++)v+=c[m];const y=a.morphTargetsRelative?1:1-v;l.getUniforms().setValue(t,"morphTargetBaseInfluence",y),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function u1(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,f=l.geometry,d=e.get(l,f);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class d0 extends en{constructor(e,n,i,r,s,o,a,l,c,f=Es){if(f!==Es&&f!==ks)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&f===Es&&(i=br),i===void 0&&f===ks&&(i=Os),super(null,r,s,o,a,l,f,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:Rn,this.minFilter=l!==void 0?l:Rn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const h0=new en,Vm=new d0(1,1),p0=new i0,m0=new KM,g0=new c0,Gm=[],Wm=[],jm=new Float32Array(16),Xm=new Float32Array(9),Ym=new Float32Array(4);function Ws(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Gm[r];if(s===void 0&&(s=new Float32Array(r),Gm[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Dt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Nt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Tc(t,e){let n=Wm[e];n===void 0&&(n=new Int32Array(e),Wm[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function f1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function d1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Dt(n,e))return;t.uniform2fv(this.addr,e),Nt(n,e)}}function h1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Dt(n,e))return;t.uniform3fv(this.addr,e),Nt(n,e)}}function p1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Dt(n,e))return;t.uniform4fv(this.addr,e),Nt(n,e)}}function m1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Dt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Nt(n,e)}else{if(Dt(n,i))return;Ym.set(i),t.uniformMatrix2fv(this.addr,!1,Ym),Nt(n,i)}}function g1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Dt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Nt(n,e)}else{if(Dt(n,i))return;Xm.set(i),t.uniformMatrix3fv(this.addr,!1,Xm),Nt(n,i)}}function v1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Dt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Nt(n,e)}else{if(Dt(n,i))return;jm.set(i),t.uniformMatrix4fv(this.addr,!1,jm),Nt(n,i)}}function _1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function x1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Dt(n,e))return;t.uniform2iv(this.addr,e),Nt(n,e)}}function y1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Dt(n,e))return;t.uniform3iv(this.addr,e),Nt(n,e)}}function S1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Dt(n,e))return;t.uniform4iv(this.addr,e),Nt(n,e)}}function M1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function E1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Dt(n,e))return;t.uniform2uiv(this.addr,e),Nt(n,e)}}function w1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Dt(n,e))return;t.uniform3uiv(this.addr,e),Nt(n,e)}}function T1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Dt(n,e))return;t.uniform4uiv(this.addr,e),Nt(n,e)}}function A1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Vm.compareFunction=e0,s=Vm):s=h0,n.setTexture2D(e||s,r)}function C1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||m0,r)}function R1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||g0,r)}function b1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||p0,r)}function P1(t){switch(t){case 5126:return f1;case 35664:return d1;case 35665:return h1;case 35666:return p1;case 35674:return m1;case 35675:return g1;case 35676:return v1;case 5124:case 35670:return _1;case 35667:case 35671:return x1;case 35668:case 35672:return y1;case 35669:case 35673:return S1;case 5125:return M1;case 36294:return E1;case 36295:return w1;case 36296:return T1;case 35678:case 36198:case 36298:case 36306:case 35682:return A1;case 35679:case 36299:case 36307:return C1;case 35680:case 36300:case 36308:case 36293:return R1;case 36289:case 36303:case 36311:case 36292:return b1}}function L1(t,e){t.uniform1fv(this.addr,e)}function D1(t,e){const n=Ws(e,this.size,2);t.uniform2fv(this.addr,n)}function N1(t,e){const n=Ws(e,this.size,3);t.uniform3fv(this.addr,n)}function I1(t,e){const n=Ws(e,this.size,4);t.uniform4fv(this.addr,n)}function U1(t,e){const n=Ws(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function F1(t,e){const n=Ws(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function O1(t,e){const n=Ws(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function k1(t,e){t.uniform1iv(this.addr,e)}function z1(t,e){t.uniform2iv(this.addr,e)}function B1(t,e){t.uniform3iv(this.addr,e)}function H1(t,e){t.uniform4iv(this.addr,e)}function V1(t,e){t.uniform1uiv(this.addr,e)}function G1(t,e){t.uniform2uiv(this.addr,e)}function W1(t,e){t.uniform3uiv(this.addr,e)}function j1(t,e){t.uniform4uiv(this.addr,e)}function X1(t,e,n){const i=this.cache,r=e.length,s=Tc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),Nt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||h0,s[o])}function Y1(t,e,n){const i=this.cache,r=e.length,s=Tc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),Nt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||m0,s[o])}function $1(t,e,n){const i=this.cache,r=e.length,s=Tc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),Nt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||g0,s[o])}function q1(t,e,n){const i=this.cache,r=e.length,s=Tc(n,r);Dt(i,s)||(t.uniform1iv(this.addr,s),Nt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||p0,s[o])}function K1(t){switch(t){case 5126:return L1;case 35664:return D1;case 35665:return N1;case 35666:return I1;case 35674:return U1;case 35675:return F1;case 35676:return O1;case 5124:case 35670:return k1;case 35667:case 35671:return z1;case 35668:case 35672:return B1;case 35669:case 35673:return H1;case 5125:return V1;case 36294:return G1;case 36295:return W1;case 36296:return j1;case 35678:case 36198:case 36298:case 36306:case 35682:return X1;case 35679:case 36299:case 36307:return Y1;case 35680:case 36300:case 36308:case 36293:return $1;case 36289:case 36303:case 36311:case 36292:return q1}}class Z1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=P1(n.type)}}class Q1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=K1(n.type)}}class J1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const Du=/(\w+)(\])?(\[|\.)?/g;function $m(t,e){t.seq.push(e),t.map[e.id]=e}function eA(t,e,n){const i=t.name,r=i.length;for(Du.lastIndex=0;;){const s=Du.exec(i),o=Du.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){$m(n,c===void 0?new Z1(a,t,e):new Q1(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new J1(a),$m(n,d)),n=d}}}class gl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);eA(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function qm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const tA=37297;let nA=0;function iA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function rA(t){const e=tt.getPrimaries(tt.workingColorSpace),n=tt.getPrimaries(t);let i;switch(e===n?i="":e===Kl&&n===ql?i="LinearDisplayP3ToLinearSRGB":e===ql&&n===Kl&&(i="LinearSRGBToLinearDisplayP3"),t){case ir:case Sc:return[i,"LinearTransferOETF"];case qn:case Rh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function Km(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+iA(t.getShaderSource(e),o)}else return r}function sA(t,e){const n=rA(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function oA(t,e){let n;switch(e){case aM:n="Linear";break;case lM:n="Reinhard";break;case cM:n="Cineon";break;case uM:n="ACESFilmic";break;case dM:n="AgX";break;case hM:n="Neutral";break;case fM:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Va=new B;function aA(){tt.getLuminanceCoefficients(Va);const t=Va.x.toFixed(4),e=Va.y.toFixed(4),n=Va.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ho).join(`
`)}function cA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function uA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function ho(t){return t!==""}function Zm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const fA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sd(t){return t.replace(fA,hA)}const dA=new Map;function hA(t,e){let n=We[e];if(n===void 0){const i=dA.get(e);if(i!==void 0)n=We[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Sd(n)}const pA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jm(t){return t.replace(pA,mA)}function mA(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function eg(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function gA(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===z_?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===B_?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===oi&&(e="SHADOWMAP_TYPE_VSM"),e}function vA(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Us:case Fs:e="ENVMAP_TYPE_CUBE";break;case yc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function _A(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Fs:e="ENVMAP_MODE_REFRACTION";break}return e}function xA(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case H_:e="ENVMAP_BLENDING_MULTIPLY";break;case sM:e="ENVMAP_BLENDING_MIX";break;case oM:e="ENVMAP_BLENDING_ADD";break}return e}function yA(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function SA(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=gA(n),c=vA(n),f=_A(n),d=xA(n),h=yA(n),p=lA(n),v=cA(s),y=r.createProgram();let m,u,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(ho).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(ho).join(`
`),u.length>0&&(u+=`
`)):(m=[eg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ho).join(`
`),u=[eg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==qi?"#define TONE_MAPPING":"",n.toneMapping!==qi?We.tonemapping_pars_fragment:"",n.toneMapping!==qi?oA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,sA("linearToOutputTexel",n.outputColorSpace),aA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ho).join(`
`)),o=Sd(o),o=Zm(o,n),o=Qm(o,n),a=Sd(a),a=Zm(a,n),a=Qm(a,n),o=Jm(o),a=Jm(a),n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",n.glslVersion===mm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===mm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const _=g+m+o,S=g+u+a,D=qm(r,r.VERTEX_SHADER,_),b=qm(r,r.FRAGMENT_SHADER,S);r.attachShader(y,D),r.attachShader(y,b),n.index0AttributeName!==void 0?r.bindAttribLocation(y,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function T(E){if(t.debug.checkShaderErrors){const N=r.getProgramInfoLog(y).trim(),H=r.getShaderInfoLog(D).trim(),$=r.getShaderInfoLog(b).trim();let te=!0,X=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(te=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,y,D,b);else{const q=Km(r,D,"vertex"),U=Km(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+N+`
`+q+`
`+U)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(H===""||$==="")&&(X=!1);X&&(E.diagnostics={runnable:te,programLog:N,vertexShader:{log:H,prefix:m},fragmentShader:{log:$,prefix:u}})}r.deleteShader(D),r.deleteShader(b),C=new gl(r,y),Y=uA(r,y)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let Y;this.getAttributes=function(){return Y===void 0&&T(this),Y};let x=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(y,tA)),x},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=nA++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=D,this.fragmentShader=b,this}let MA=0;class EA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new wA(e),n.set(e,i)),i}}class wA{constructor(e){this.id=MA++,this.code=e,this.usedTimes=0}}function TA(t,e,n,i,r,s,o){const a=new Lh,l=new EA,c=new Set,f=[],d=r.logarithmicDepthBuffer,h=r.reverseDepthBuffer,p=r.vertexTextures;let v=r.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function u(x,E,N,H,$){const te=H.fog,X=$.geometry,q=x.isMeshStandardMaterial?H.environment:null,U=(x.isMeshStandardMaterial?n:e).get(x.envMap||q),J=U&&U.mapping===yc?U.image.height:null,ie=y[x.type];x.precision!==null&&(v=r.getMaxPrecision(x.precision),v!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",v,"instead."));const ce=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,be=ce!==void 0?ce.length:0;let Be=0;X.morphAttributes.position!==void 0&&(Be=1),X.morphAttributes.normal!==void 0&&(Be=2),X.morphAttributes.color!==void 0&&(Be=3);let K,oe,Z,Q;if(ie){const Et=Kn[ie];K=Et.vertexShader,oe=Et.fragmentShader}else K=x.vertexShader,oe=x.fragmentShader,l.update(x),Z=l.getVertexShaderID(x),Q=l.getFragmentShaderID(x);const ge=t.getRenderTarget(),de=$.isInstancedMesh===!0,he=$.isBatchedMesh===!0,Te=!!x.map,He=!!x.matcap,I=!!U,pt=!!x.aoMap,Ve=!!x.lightMap,Ke=!!x.bumpMap,Ie=!!x.normalMap,ot=!!x.displacementMap,Le=!!x.emissiveMap,R=!!x.metalnessMap,M=!!x.roughnessMap,G=x.anisotropy>0,ne=x.clearcoat>0,re=x.dispersion>0,ee=x.iridescence>0,Ae=x.sheen>0,pe=x.transmission>0,ye=G&&!!x.anisotropyMap,Ze=ne&&!!x.clearcoatMap,le=ne&&!!x.clearcoatNormalMap,_e=ne&&!!x.clearcoatRoughnessMap,Ue=ee&&!!x.iridescenceMap,Fe=ee&&!!x.iridescenceThicknessMap,Se=Ae&&!!x.sheenColorMap,$e=Ae&&!!x.sheenRoughnessMap,ze=!!x.specularMap,nt=!!x.specularColorMap,F=!!x.specularIntensityMap,xe=pe&&!!x.transmissionMap,A=pe&&!!x.thicknessMap,L=!!x.gradientMap,O=!!x.alphaMap,V=x.alphaTest>0,fe=!!x.alphaHash,De=!!x.extensions;let Ge=qi;x.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(Ge=t.toneMapping);const Ne={shaderID:ie,shaderType:x.type,shaderName:x.name,vertexShader:K,fragmentShader:oe,defines:x.defines,customVertexShaderID:Z,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:v,batching:he,batchingColor:he&&$._colorsTexture!==null,instancing:de,instancingColor:de&&$.instanceColor!==null,instancingMorph:de&&$.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ge===null?t.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:ir,alphaToCoverage:!!x.alphaToCoverage,map:Te,matcap:He,envMap:I,envMapMode:I&&U.mapping,envMapCubeUVHeight:J,aoMap:pt,lightMap:Ve,bumpMap:Ke,normalMap:Ie,displacementMap:p&&ot,emissiveMap:Le,normalMapObjectSpace:Ie&&x.normalMapType===vM,normalMapTangentSpace:Ie&&x.normalMapType===J_,metalnessMap:R,roughnessMap:M,anisotropy:G,anisotropyMap:ye,clearcoat:ne,clearcoatMap:Ze,clearcoatNormalMap:le,clearcoatRoughnessMap:_e,dispersion:re,iridescence:ee,iridescenceMap:Ue,iridescenceThicknessMap:Fe,sheen:Ae,sheenColorMap:Se,sheenRoughnessMap:$e,specularMap:ze,specularColorMap:nt,specularIntensityMap:F,transmission:pe,transmissionMap:xe,thicknessMap:A,gradientMap:L,opaque:x.transparent===!1&&x.blending===Ms&&x.alphaToCoverage===!1,alphaMap:O,alphaTest:V,alphaHash:fe,combine:x.combine,mapUv:Te&&m(x.map.channel),aoMapUv:pt&&m(x.aoMap.channel),lightMapUv:Ve&&m(x.lightMap.channel),bumpMapUv:Ke&&m(x.bumpMap.channel),normalMapUv:Ie&&m(x.normalMap.channel),displacementMapUv:ot&&m(x.displacementMap.channel),emissiveMapUv:Le&&m(x.emissiveMap.channel),metalnessMapUv:R&&m(x.metalnessMap.channel),roughnessMapUv:M&&m(x.roughnessMap.channel),anisotropyMapUv:ye&&m(x.anisotropyMap.channel),clearcoatMapUv:Ze&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:le&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:Fe&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:$e&&m(x.sheenRoughnessMap.channel),specularMapUv:ze&&m(x.specularMap.channel),specularColorMapUv:nt&&m(x.specularColorMap.channel),specularIntensityMapUv:F&&m(x.specularIntensityMap.channel),transmissionMapUv:xe&&m(x.transmissionMap.channel),thicknessMapUv:A&&m(x.thicknessMap.channel),alphaMapUv:O&&m(x.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Ie||G),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:$.isPoints===!0&&!!X.attributes.uv&&(Te||O),fog:!!te,useFog:x.fog===!0,fogExp2:!!te&&te.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:h,skinning:$.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:Be,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:t.shadowMap.enabled&&N.length>0,shadowMapType:t.shadowMap.type,toneMapping:Ge,decodeVideoTexture:Te&&x.map.isVideoTexture===!0&&tt.getTransfer(x.map.colorSpace)===ft,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ci,flipSided:x.side===cn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:De&&x.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&x.extensions.multiDraw===!0||he)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function g(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const N in x.defines)E.push(N),E.push(x.defines[N]);return x.isRawShaderMaterial===!1&&(_(E,x),S(E,x),E.push(t.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function _(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function S(x,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reverseDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.alphaToCoverage&&a.enable(20),x.push(a.mask)}function D(x){const E=y[x.type];let N;if(E){const H=Kn[E];N=lE.clone(H.uniforms)}else N=x.uniforms;return N}function b(x,E){let N;for(let H=0,$=f.length;H<$;H++){const te=f[H];if(te.cacheKey===E){N=te,++N.usedTimes;break}}return N===void 0&&(N=new SA(t,E,x,s),f.push(N)),N}function T(x){if(--x.usedTimes===0){const E=f.indexOf(x);f[E]=f[f.length-1],f.pop(),x.destroy()}}function C(x){l.remove(x)}function Y(){l.dispose()}return{getParameters:u,getProgramCacheKey:g,getUniforms:D,acquireProgram:b,releaseProgram:T,releaseShaderCache:C,programs:f,dispose:Y}}function AA(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function CA(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function tg(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function ng(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(d,h,p,v,y,m){let u=t[e];return u===void 0?(u={id:d.id,object:d,geometry:h,material:p,groupOrder:v,renderOrder:d.renderOrder,z:y,group:m},t[e]=u):(u.id=d.id,u.object=d,u.geometry=h,u.material=p,u.groupOrder=v,u.renderOrder=d.renderOrder,u.z=y,u.group=m),e++,u}function a(d,h,p,v,y,m){const u=o(d,h,p,v,y,m);p.transmission>0?i.push(u):p.transparent===!0?r.push(u):n.push(u)}function l(d,h,p,v,y,m){const u=o(d,h,p,v,y,m);p.transmission>0?i.unshift(u):p.transparent===!0?r.unshift(u):n.unshift(u)}function c(d,h){n.length>1&&n.sort(d||CA),i.length>1&&i.sort(h||tg),r.length>1&&r.sort(h||tg)}function f(){for(let d=e,h=t.length;d<h;d++){const p=t[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:f,sort:c}}function RA(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new ng,t.set(i,[o])):r>=s.length?(o=new ng,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function bA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new B,color:new Xe};break;case"SpotLight":n={position:new B,direction:new B,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new B,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new B,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":n={color:new Xe,position:new B,halfWidth:new B,halfHeight:new B};break}return t[e.id]=n,n}}}function PA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let LA=0;function DA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function NA(t){const e=new bA,n=PA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);const r=new B,s=new ht,o=new ht;function a(c){let f=0,d=0,h=0;for(let Y=0;Y<9;Y++)i.probe[Y].set(0,0,0);let p=0,v=0,y=0,m=0,u=0,g=0,_=0,S=0,D=0,b=0,T=0;c.sort(DA);for(let Y=0,x=c.length;Y<x;Y++){const E=c[Y],N=E.color,H=E.intensity,$=E.distance,te=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)f+=N.r*H,d+=N.g*H,h+=N.b*H;else if(E.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(E.sh.coefficients[X],H);T++}else if(E.isDirectionalLight){const X=e.get(E);if(X.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){const q=E.shadow,U=n.get(E);U.shadowIntensity=q.intensity,U.shadowBias=q.bias,U.shadowNormalBias=q.normalBias,U.shadowRadius=q.radius,U.shadowMapSize=q.mapSize,i.directionalShadow[p]=U,i.directionalShadowMap[p]=te,i.directionalShadowMatrix[p]=E.shadow.matrix,g++}i.directional[p]=X,p++}else if(E.isSpotLight){const X=e.get(E);X.position.setFromMatrixPosition(E.matrixWorld),X.color.copy(N).multiplyScalar(H),X.distance=$,X.coneCos=Math.cos(E.angle),X.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),X.decay=E.decay,i.spot[y]=X;const q=E.shadow;if(E.map&&(i.spotLightMap[D]=E.map,D++,q.updateMatrices(E),E.castShadow&&b++),i.spotLightMatrix[y]=q.matrix,E.castShadow){const U=n.get(E);U.shadowIntensity=q.intensity,U.shadowBias=q.bias,U.shadowNormalBias=q.normalBias,U.shadowRadius=q.radius,U.shadowMapSize=q.mapSize,i.spotShadow[y]=U,i.spotShadowMap[y]=te,S++}y++}else if(E.isRectAreaLight){const X=e.get(E);X.color.copy(N).multiplyScalar(H),X.halfWidth.set(E.width*.5,0,0),X.halfHeight.set(0,E.height*.5,0),i.rectArea[m]=X,m++}else if(E.isPointLight){const X=e.get(E);if(X.color.copy(E.color).multiplyScalar(E.intensity),X.distance=E.distance,X.decay=E.decay,E.castShadow){const q=E.shadow,U=n.get(E);U.shadowIntensity=q.intensity,U.shadowBias=q.bias,U.shadowNormalBias=q.normalBias,U.shadowRadius=q.radius,U.shadowMapSize=q.mapSize,U.shadowCameraNear=q.camera.near,U.shadowCameraFar=q.camera.far,i.pointShadow[v]=U,i.pointShadowMap[v]=te,i.pointShadowMatrix[v]=E.shadow.matrix,_++}i.point[v]=X,v++}else if(E.isHemisphereLight){const X=e.get(E);X.skyColor.copy(E.color).multiplyScalar(H),X.groundColor.copy(E.groundColor).multiplyScalar(H),i.hemi[u]=X,u++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=h;const C=i.hash;(C.directionalLength!==p||C.pointLength!==v||C.spotLength!==y||C.rectAreaLength!==m||C.hemiLength!==u||C.numDirectionalShadows!==g||C.numPointShadows!==_||C.numSpotShadows!==S||C.numSpotMaps!==D||C.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=y,i.rectArea.length=m,i.point.length=v,i.hemi.length=u,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=S+D-b,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=T,C.directionalLength=p,C.pointLength=v,C.spotLength=y,C.rectAreaLength=m,C.hemiLength=u,C.numDirectionalShadows=g,C.numPointShadows=_,C.numSpotShadows=S,C.numSpotMaps=D,C.numLightProbes=T,i.version=LA++)}function l(c,f){let d=0,h=0,p=0,v=0,y=0;const m=f.matrixWorldInverse;for(let u=0,g=c.length;u<g;u++){const _=c[u];if(_.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(_.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(_.isRectAreaLight){const S=i.rectArea[v];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),o.identity(),s.copy(_.matrixWorld),s.premultiply(m),o.extractRotation(s),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),v++}else if(_.isPointLight){const S=i.point[h];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),h++}else if(_.isHemisphereLight){const S=i.hemi[y];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(m),y++}}}return{setup:a,setupView:l,state:i}}function ig(t){const e=new NA(t),n=[],i=[];function r(f){c.camera=f,n.length=0,i.length=0}function s(f){n.push(f)}function o(f){i.push(f)}function a(){e.setup(n)}function l(f){e.setupView(n,f)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function IA(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new ig(t),e.set(r,[a])):s>=o.length?(a=new ig(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class UA extends Nr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class FA extends Nr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const OA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function zA(t,e,n){let i=new Dh;const r=new Ye,s=new Ye,o=new Mt,a=new UA({depthPacking:gM}),l=new FA,c={},f=n.maxTextureSize,d={[Qi]:cn,[cn]:Qi,[ci]:ci},h=new Ji({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:OA,fragmentShader:kA}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const v=new Yt;v.setAttribute("position",new jn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Qt(v,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=z_;let u=this.type;this.render=function(b,T,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const Y=t.getRenderTarget(),x=t.getActiveCubeFace(),E=t.getActiveMipmapLevel(),N=t.state;N.setBlending($i),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const H=u!==oi&&this.type===oi,$=u===oi&&this.type!==oi;for(let te=0,X=b.length;te<X;te++){const q=b[te],U=q.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;r.copy(U.mapSize);const J=U.getFrameExtents();if(r.multiply(J),s.copy(U.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/J.x),r.x=s.x*J.x,U.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/J.y),r.y=s.y*J.y,U.mapSize.y=s.y)),U.map===null||H===!0||$===!0){const ce=this.type!==oi?{minFilter:Rn,magFilter:Rn}:{};U.map!==null&&U.map.dispose(),U.map=new Pr(r.x,r.y,ce),U.map.texture.name=q.name+".shadowMap",U.camera.updateProjectionMatrix()}t.setRenderTarget(U.map),t.clear();const ie=U.getViewportCount();for(let ce=0;ce<ie;ce++){const be=U.getViewport(ce);o.set(s.x*be.x,s.y*be.y,s.x*be.z,s.y*be.w),N.viewport(o),U.updateMatrices(q,ce),i=U.getFrustum(),S(T,C,U.camera,q,this.type)}U.isPointLightShadow!==!0&&this.type===oi&&g(U,C),U.needsUpdate=!1}u=this.type,m.needsUpdate=!1,t.setRenderTarget(Y,x,E)};function g(b,T){const C=e.update(y);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Pr(r.x,r.y)),h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,t.setRenderTarget(b.mapPass),t.clear(),t.renderBufferDirect(T,null,C,h,y,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,t.setRenderTarget(b.map),t.clear(),t.renderBufferDirect(T,null,C,p,y,null)}function _(b,T,C,Y){let x=null;const E=C.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(E!==void 0)x=E;else if(x=C.isPointLight===!0?l:a,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const N=x.uuid,H=T.uuid;let $=c[N];$===void 0&&($={},c[N]=$);let te=$[H];te===void 0&&(te=x.clone(),$[H]=te,T.addEventListener("dispose",D)),x=te}if(x.visible=T.visible,x.wireframe=T.wireframe,Y===oi?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:d[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,C.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const N=t.properties.get(x);N.light=C}return x}function S(b,T,C,Y,x){if(b.visible===!1)return;if(b.layers.test(T.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&x===oi)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,b.matrixWorld);const H=e.update(b),$=b.material;if(Array.isArray($)){const te=H.groups;for(let X=0,q=te.length;X<q;X++){const U=te[X],J=$[U.materialIndex];if(J&&J.visible){const ie=_(b,J,Y,x);b.onBeforeShadow(t,b,T,C,H,ie,U),t.renderBufferDirect(C,null,H,ie,b,U),b.onAfterShadow(t,b,T,C,H,ie,U)}}}else if($.visible){const te=_(b,$,Y,x);b.onBeforeShadow(t,b,T,C,H,te,null),t.renderBufferDirect(C,null,H,te,b,null),b.onAfterShadow(t,b,T,C,H,te,null)}}const N=b.children;for(let H=0,$=N.length;H<$;H++)S(N[H],T,C,Y,x)}function D(b){b.target.removeEventListener("dispose",D);for(const C in c){const Y=c[C],x=b.target.uuid;x in Y&&(Y[x].dispose(),delete Y[x])}}}const BA={[Of]:kf,[zf]:Vf,[Bf]:Gf,[Is]:Hf,[kf]:Of,[Vf]:zf,[Gf]:Bf,[Hf]:Is};function HA(t){function e(){let F=!1;const xe=new Mt;let A=null;const L=new Mt(0,0,0,0);return{setMask:function(O){A!==O&&!F&&(t.colorMask(O,O,O,O),A=O)},setLocked:function(O){F=O},setClear:function(O,V,fe,De,Ge){Ge===!0&&(O*=De,V*=De,fe*=De),xe.set(O,V,fe,De),L.equals(xe)===!1&&(t.clearColor(O,V,fe,De),L.copy(xe))},reset:function(){F=!1,A=null,L.set(-1,0,0,0)}}}function n(){let F=!1,xe=!1,A=null,L=null,O=null;return{setReversed:function(V){xe=V},setTest:function(V){V?Z(t.DEPTH_TEST):Q(t.DEPTH_TEST)},setMask:function(V){A!==V&&!F&&(t.depthMask(V),A=V)},setFunc:function(V){if(xe&&(V=BA[V]),L!==V){switch(V){case Of:t.depthFunc(t.NEVER);break;case kf:t.depthFunc(t.ALWAYS);break;case zf:t.depthFunc(t.LESS);break;case Is:t.depthFunc(t.LEQUAL);break;case Bf:t.depthFunc(t.EQUAL);break;case Hf:t.depthFunc(t.GEQUAL);break;case Vf:t.depthFunc(t.GREATER);break;case Gf:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}L=V}},setLocked:function(V){F=V},setClear:function(V){O!==V&&(t.clearDepth(V),O=V)},reset:function(){F=!1,A=null,L=null,O=null}}}function i(){let F=!1,xe=null,A=null,L=null,O=null,V=null,fe=null,De=null,Ge=null;return{setTest:function(Ne){F||(Ne?Z(t.STENCIL_TEST):Q(t.STENCIL_TEST))},setMask:function(Ne){xe!==Ne&&!F&&(t.stencilMask(Ne),xe=Ne)},setFunc:function(Ne,Et,un){(A!==Ne||L!==Et||O!==un)&&(t.stencilFunc(Ne,Et,un),A=Ne,L=Et,O=un)},setOp:function(Ne,Et,un){(V!==Ne||fe!==Et||De!==un)&&(t.stencilOp(Ne,Et,un),V=Ne,fe=Et,De=un)},setLocked:function(Ne){F=Ne},setClear:function(Ne){Ge!==Ne&&(t.clearStencil(Ne),Ge=Ne)},reset:function(){F=!1,xe=null,A=null,L=null,O=null,V=null,fe=null,De=null,Ge=null}}}const r=new e,s=new n,o=new i,a=new WeakMap,l=new WeakMap;let c={},f={},d=new WeakMap,h=[],p=null,v=!1,y=null,m=null,u=null,g=null,_=null,S=null,D=null,b=new Xe(0,0,0),T=0,C=!1,Y=null,x=null,E=null,N=null,H=null;const $=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let te=!1,X=0;const q=t.getParameter(t.VERSION);q.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(q)[1]),te=X>=1):q.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),te=X>=2);let U=null,J={};const ie=t.getParameter(t.SCISSOR_BOX),ce=t.getParameter(t.VIEWPORT),be=new Mt().fromArray(ie),Be=new Mt().fromArray(ce);function K(F,xe,A,L){const O=new Uint8Array(4),V=t.createTexture();t.bindTexture(F,V),t.texParameteri(F,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(F,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let fe=0;fe<A;fe++)F===t.TEXTURE_3D||F===t.TEXTURE_2D_ARRAY?t.texImage3D(xe,0,t.RGBA,1,1,L,0,t.RGBA,t.UNSIGNED_BYTE,O):t.texImage2D(xe+fe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,O);return V}const oe={};oe[t.TEXTURE_2D]=K(t.TEXTURE_2D,t.TEXTURE_2D,1),oe[t.TEXTURE_CUBE_MAP]=K(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[t.TEXTURE_2D_ARRAY]=K(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),oe[t.TEXTURE_3D]=K(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),Z(t.DEPTH_TEST),s.setFunc(Is),Ve(!1),Ke(um),Z(t.CULL_FACE),I($i);function Z(F){c[F]!==!0&&(t.enable(F),c[F]=!0)}function Q(F){c[F]!==!1&&(t.disable(F),c[F]=!1)}function ge(F,xe){return f[F]!==xe?(t.bindFramebuffer(F,xe),f[F]=xe,F===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=xe),F===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=xe),!0):!1}function de(F,xe){let A=h,L=!1;if(F){A=d.get(xe),A===void 0&&(A=[],d.set(xe,A));const O=F.textures;if(A.length!==O.length||A[0]!==t.COLOR_ATTACHMENT0){for(let V=0,fe=O.length;V<fe;V++)A[V]=t.COLOR_ATTACHMENT0+V;A.length=O.length,L=!0}}else A[0]!==t.BACK&&(A[0]=t.BACK,L=!0);L&&t.drawBuffers(A)}function he(F){return p!==F?(t.useProgram(F),p=F,!0):!1}const Te={[mr]:t.FUNC_ADD,[VS]:t.FUNC_SUBTRACT,[GS]:t.FUNC_REVERSE_SUBTRACT};Te[WS]=t.MIN,Te[jS]=t.MAX;const He={[XS]:t.ZERO,[YS]:t.ONE,[$S]:t.SRC_COLOR,[Uf]:t.SRC_ALPHA,[eM]:t.SRC_ALPHA_SATURATE,[QS]:t.DST_COLOR,[KS]:t.DST_ALPHA,[qS]:t.ONE_MINUS_SRC_COLOR,[Ff]:t.ONE_MINUS_SRC_ALPHA,[JS]:t.ONE_MINUS_DST_COLOR,[ZS]:t.ONE_MINUS_DST_ALPHA,[tM]:t.CONSTANT_COLOR,[nM]:t.ONE_MINUS_CONSTANT_COLOR,[iM]:t.CONSTANT_ALPHA,[rM]:t.ONE_MINUS_CONSTANT_ALPHA};function I(F,xe,A,L,O,V,fe,De,Ge,Ne){if(F===$i){v===!0&&(Q(t.BLEND),v=!1);return}if(v===!1&&(Z(t.BLEND),v=!0),F!==HS){if(F!==y||Ne!==C){if((m!==mr||_!==mr)&&(t.blendEquation(t.FUNC_ADD),m=mr,_=mr),Ne)switch(F){case Ms:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case fm:t.blendFunc(t.ONE,t.ONE);break;case dm:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case hm:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Ms:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case fm:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case dm:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case hm:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}u=null,g=null,S=null,D=null,b.set(0,0,0),T=0,y=F,C=Ne}return}O=O||xe,V=V||A,fe=fe||L,(xe!==m||O!==_)&&(t.blendEquationSeparate(Te[xe],Te[O]),m=xe,_=O),(A!==u||L!==g||V!==S||fe!==D)&&(t.blendFuncSeparate(He[A],He[L],He[V],He[fe]),u=A,g=L,S=V,D=fe),(De.equals(b)===!1||Ge!==T)&&(t.blendColor(De.r,De.g,De.b,Ge),b.copy(De),T=Ge),y=F,C=!1}function pt(F,xe){F.side===ci?Q(t.CULL_FACE):Z(t.CULL_FACE);let A=F.side===cn;xe&&(A=!A),Ve(A),F.blending===Ms&&F.transparent===!1?I($i):I(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),s.setFunc(F.depthFunc),s.setTest(F.depthTest),s.setMask(F.depthWrite),r.setMask(F.colorWrite);const L=F.stencilWrite;o.setTest(L),L&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),ot(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Z(t.SAMPLE_ALPHA_TO_COVERAGE):Q(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(F){Y!==F&&(F?t.frontFace(t.CW):t.frontFace(t.CCW),Y=F)}function Ke(F){F!==zS?(Z(t.CULL_FACE),F!==x&&(F===um?t.cullFace(t.BACK):F===BS?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Q(t.CULL_FACE),x=F}function Ie(F){F!==E&&(te&&t.lineWidth(F),E=F)}function ot(F,xe,A){F?(Z(t.POLYGON_OFFSET_FILL),(N!==xe||H!==A)&&(t.polygonOffset(xe,A),N=xe,H=A)):Q(t.POLYGON_OFFSET_FILL)}function Le(F){F?Z(t.SCISSOR_TEST):Q(t.SCISSOR_TEST)}function R(F){F===void 0&&(F=t.TEXTURE0+$-1),U!==F&&(t.activeTexture(F),U=F)}function M(F,xe,A){A===void 0&&(U===null?A=t.TEXTURE0+$-1:A=U);let L=J[A];L===void 0&&(L={type:void 0,texture:void 0},J[A]=L),(L.type!==F||L.texture!==xe)&&(U!==A&&(t.activeTexture(A),U=A),t.bindTexture(F,xe||oe[F]),L.type=F,L.texture=xe)}function G(){const F=J[U];F!==void 0&&F.type!==void 0&&(t.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ne(){try{t.compressedTexImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function re(){try{t.compressedTexImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ee(){try{t.texSubImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ae(){try{t.texSubImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pe(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ye(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ze(){try{t.texStorage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function le(){try{t.texStorage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function _e(){try{t.texImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ue(){try{t.texImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Fe(F){be.equals(F)===!1&&(t.scissor(F.x,F.y,F.z,F.w),be.copy(F))}function Se(F){Be.equals(F)===!1&&(t.viewport(F.x,F.y,F.z,F.w),Be.copy(F))}function $e(F,xe){let A=l.get(xe);A===void 0&&(A=new WeakMap,l.set(xe,A));let L=A.get(F);L===void 0&&(L=t.getUniformBlockIndex(xe,F.name),A.set(F,L))}function ze(F,xe){const L=l.get(xe).get(F);a.get(xe)!==L&&(t.uniformBlockBinding(xe,L,F.__bindingPointIndex),a.set(xe,L))}function nt(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),c={},U=null,J={},f={},d=new WeakMap,h=[],p=null,v=!1,y=null,m=null,u=null,g=null,_=null,S=null,D=null,b=new Xe(0,0,0),T=0,C=!1,Y=null,x=null,E=null,N=null,H=null,be.set(0,0,t.canvas.width,t.canvas.height),Be.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:Z,disable:Q,bindFramebuffer:ge,drawBuffers:de,useProgram:he,setBlending:I,setMaterial:pt,setFlipSided:Ve,setCullFace:Ke,setLineWidth:Ie,setPolygonOffset:ot,setScissorTest:Le,activeTexture:R,bindTexture:M,unbindTexture:G,compressedTexImage2D:ne,compressedTexImage3D:re,texImage2D:_e,texImage3D:Ue,updateUBOMapping:$e,uniformBlockBinding:ze,texStorage2D:Ze,texStorage3D:le,texSubImage2D:ee,texSubImage3D:Ae,compressedTexSubImage2D:pe,compressedTexSubImage3D:ye,scissor:Fe,viewport:Se,reset:nt}}function rg(t,e,n,i){const r=VA(i);switch(n){case X_:return t*e;case $_:return t*e;case q_:return t*e*2;case K_:return t*e/r.components*r.byteLength;case Th:return t*e/r.components*r.byteLength;case Z_:return t*e*2/r.components*r.byteLength;case Ah:return t*e*2/r.components*r.byteLength;case Y_:return t*e*3/r.components*r.byteLength;case Vn:return t*e*4/r.components*r.byteLength;case Ch:return t*e*4/r.components*r.byteLength;case ul:case fl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case dl:case hl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case qf:case Zf:return Math.max(t,16)*Math.max(e,8)/4;case $f:case Kf:return Math.max(t,8)*Math.max(e,8)/2;case Qf:case Jf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case ed:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case td:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case nd:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case id:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case rd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case sd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case od:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case ad:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case ld:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case cd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case ud:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case fd:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case dd:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case hd:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case pd:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case pl:case md:case gd:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Q_:case vd:return Math.ceil(t/4)*Math.ceil(e/4)*8;case _d:case xd:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function VA(t){switch(t){case Si:case G_:return{byteLength:1,components:1};case Go:case W_:case Zo:return{byteLength:2,components:1};case Eh:case wh:return{byteLength:2,components:4};case br:case Mh:case hi:return{byteLength:4,components:1};case j_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function GA(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ye,f=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,M){return p?new OffscreenCanvas(R,M):Ql("canvas")}function y(R,M,G){let ne=1;const re=Le(R);if((re.width>G||re.height>G)&&(ne=G/Math.max(re.width,re.height)),ne<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ee=Math.floor(ne*re.width),Ae=Math.floor(ne*re.height);d===void 0&&(d=v(ee,Ae));const pe=M?v(ee,Ae):d;return pe.width=ee,pe.height=Ae,pe.getContext("2d").drawImage(R,0,0,ee,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+ee+"x"+Ae+")."),pe}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),R;return R}function m(R){return R.generateMipmaps&&R.minFilter!==Rn&&R.minFilter!==Bn}function u(R){t.generateMipmap(R)}function g(R,M,G,ne,re=!1){if(R!==null){if(t[R]!==void 0)return t[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ee=M;if(M===t.RED&&(G===t.FLOAT&&(ee=t.R32F),G===t.HALF_FLOAT&&(ee=t.R16F),G===t.UNSIGNED_BYTE&&(ee=t.R8)),M===t.RED_INTEGER&&(G===t.UNSIGNED_BYTE&&(ee=t.R8UI),G===t.UNSIGNED_SHORT&&(ee=t.R16UI),G===t.UNSIGNED_INT&&(ee=t.R32UI),G===t.BYTE&&(ee=t.R8I),G===t.SHORT&&(ee=t.R16I),G===t.INT&&(ee=t.R32I)),M===t.RG&&(G===t.FLOAT&&(ee=t.RG32F),G===t.HALF_FLOAT&&(ee=t.RG16F),G===t.UNSIGNED_BYTE&&(ee=t.RG8)),M===t.RG_INTEGER&&(G===t.UNSIGNED_BYTE&&(ee=t.RG8UI),G===t.UNSIGNED_SHORT&&(ee=t.RG16UI),G===t.UNSIGNED_INT&&(ee=t.RG32UI),G===t.BYTE&&(ee=t.RG8I),G===t.SHORT&&(ee=t.RG16I),G===t.INT&&(ee=t.RG32I)),M===t.RGB_INTEGER&&(G===t.UNSIGNED_BYTE&&(ee=t.RGB8UI),G===t.UNSIGNED_SHORT&&(ee=t.RGB16UI),G===t.UNSIGNED_INT&&(ee=t.RGB32UI),G===t.BYTE&&(ee=t.RGB8I),G===t.SHORT&&(ee=t.RGB16I),G===t.INT&&(ee=t.RGB32I)),M===t.RGBA_INTEGER&&(G===t.UNSIGNED_BYTE&&(ee=t.RGBA8UI),G===t.UNSIGNED_SHORT&&(ee=t.RGBA16UI),G===t.UNSIGNED_INT&&(ee=t.RGBA32UI),G===t.BYTE&&(ee=t.RGBA8I),G===t.SHORT&&(ee=t.RGBA16I),G===t.INT&&(ee=t.RGBA32I)),M===t.RGB&&G===t.UNSIGNED_INT_5_9_9_9_REV&&(ee=t.RGB9_E5),M===t.RGBA){const Ae=re?$l:tt.getTransfer(ne);G===t.FLOAT&&(ee=t.RGBA32F),G===t.HALF_FLOAT&&(ee=t.RGBA16F),G===t.UNSIGNED_BYTE&&(ee=Ae===ft?t.SRGB8_ALPHA8:t.RGBA8),G===t.UNSIGNED_SHORT_4_4_4_4&&(ee=t.RGBA4),G===t.UNSIGNED_SHORT_5_5_5_1&&(ee=t.RGB5_A1)}return(ee===t.R16F||ee===t.R32F||ee===t.RG16F||ee===t.RG32F||ee===t.RGBA16F||ee===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function _(R,M){let G;return R?M===null||M===br||M===Os?G=t.DEPTH24_STENCIL8:M===hi?G=t.DEPTH32F_STENCIL8:M===Go&&(G=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===br||M===Os?G=t.DEPTH_COMPONENT24:M===hi?G=t.DEPTH_COMPONENT32F:M===Go&&(G=t.DEPTH_COMPONENT16),G}function S(R,M){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Rn&&R.minFilter!==Bn?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function D(R){const M=R.target;M.removeEventListener("dispose",D),T(M),M.isVideoTexture&&f.delete(M)}function b(R){const M=R.target;M.removeEventListener("dispose",b),Y(M)}function T(R){const M=i.get(R);if(M.__webglInit===void 0)return;const G=R.source,ne=h.get(G);if(ne){const re=ne[M.__cacheKey];re.usedTimes--,re.usedTimes===0&&C(R),Object.keys(ne).length===0&&h.delete(G)}i.remove(R)}function C(R){const M=i.get(R);t.deleteTexture(M.__webglTexture);const G=R.source,ne=h.get(G);delete ne[M.__cacheKey],o.memory.textures--}function Y(R){const M=i.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(M.__webglFramebuffer[ne]))for(let re=0;re<M.__webglFramebuffer[ne].length;re++)t.deleteFramebuffer(M.__webglFramebuffer[ne][re]);else t.deleteFramebuffer(M.__webglFramebuffer[ne]);M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer[ne])}else{if(Array.isArray(M.__webglFramebuffer))for(let ne=0;ne<M.__webglFramebuffer.length;ne++)t.deleteFramebuffer(M.__webglFramebuffer[ne]);else t.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&t.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ne=0;ne<M.__webglColorRenderbuffer.length;ne++)M.__webglColorRenderbuffer[ne]&&t.deleteRenderbuffer(M.__webglColorRenderbuffer[ne]);M.__webglDepthRenderbuffer&&t.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const G=R.textures;for(let ne=0,re=G.length;ne<re;ne++){const ee=i.get(G[ne]);ee.__webglTexture&&(t.deleteTexture(ee.__webglTexture),o.memory.textures--),i.remove(G[ne])}i.remove(R)}let x=0;function E(){x=0}function N(){const R=x;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),x+=1,R}function H(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function $(R,M){const G=i.get(R);if(R.isVideoTexture&&Ie(R),R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){const ne=R.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Be(G,R,M);return}}n.bindTexture(t.TEXTURE_2D,G.__webglTexture,t.TEXTURE0+M)}function te(R,M){const G=i.get(R);if(R.version>0&&G.__version!==R.version){Be(G,R,M);return}n.bindTexture(t.TEXTURE_2D_ARRAY,G.__webglTexture,t.TEXTURE0+M)}function X(R,M){const G=i.get(R);if(R.version>0&&G.__version!==R.version){Be(G,R,M);return}n.bindTexture(t.TEXTURE_3D,G.__webglTexture,t.TEXTURE0+M)}function q(R,M){const G=i.get(R);if(R.version>0&&G.__version!==R.version){K(G,R,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,G.__webglTexture,t.TEXTURE0+M)}const U={[Xf]:t.REPEAT,[yr]:t.CLAMP_TO_EDGE,[Yf]:t.MIRRORED_REPEAT},J={[Rn]:t.NEAREST,[pM]:t.NEAREST_MIPMAP_NEAREST,[Ma]:t.NEAREST_MIPMAP_LINEAR,[Bn]:t.LINEAR,[su]:t.LINEAR_MIPMAP_NEAREST,[Sr]:t.LINEAR_MIPMAP_LINEAR},ie={[_M]:t.NEVER,[wM]:t.ALWAYS,[xM]:t.LESS,[e0]:t.LEQUAL,[yM]:t.EQUAL,[EM]:t.GEQUAL,[SM]:t.GREATER,[MM]:t.NOTEQUAL};function ce(R,M){if(M.type===hi&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Bn||M.magFilter===su||M.magFilter===Ma||M.magFilter===Sr||M.minFilter===Bn||M.minFilter===su||M.minFilter===Ma||M.minFilter===Sr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(R,t.TEXTURE_WRAP_S,U[M.wrapS]),t.texParameteri(R,t.TEXTURE_WRAP_T,U[M.wrapT]),(R===t.TEXTURE_3D||R===t.TEXTURE_2D_ARRAY)&&t.texParameteri(R,t.TEXTURE_WRAP_R,U[M.wrapR]),t.texParameteri(R,t.TEXTURE_MAG_FILTER,J[M.magFilter]),t.texParameteri(R,t.TEXTURE_MIN_FILTER,J[M.minFilter]),M.compareFunction&&(t.texParameteri(R,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(R,t.TEXTURE_COMPARE_FUNC,ie[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Rn||M.minFilter!==Ma&&M.minFilter!==Sr||M.type===hi&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");t.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function be(R,M){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",D));const ne=M.source;let re=h.get(ne);re===void 0&&(re={},h.set(ne,re));const ee=H(M);if(ee!==R.__cacheKey){re[ee]===void 0&&(re[ee]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,G=!0),re[ee].usedTimes++;const Ae=re[R.__cacheKey];Ae!==void 0&&(re[R.__cacheKey].usedTimes--,Ae.usedTimes===0&&C(M)),R.__cacheKey=ee,R.__webglTexture=re[ee].texture}return G}function Be(R,M,G){let ne=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ne=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ne=t.TEXTURE_3D);const re=be(R,M),ee=M.source;n.bindTexture(ne,R.__webglTexture,t.TEXTURE0+G);const Ae=i.get(ee);if(ee.version!==Ae.__version||re===!0){n.activeTexture(t.TEXTURE0+G);const pe=tt.getPrimaries(tt.workingColorSpace),ye=M.colorSpace===Oi?null:tt.getPrimaries(M.colorSpace),Ze=M.colorSpace===Oi||pe===ye?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze);let le=y(M.image,!1,r.maxTextureSize);le=ot(M,le);const _e=s.convert(M.format,M.colorSpace),Ue=s.convert(M.type);let Fe=g(M.internalFormat,_e,Ue,M.colorSpace,M.isVideoTexture);ce(ne,M);let Se;const $e=M.mipmaps,ze=M.isVideoTexture!==!0,nt=Ae.__version===void 0||re===!0,F=ee.dataReady,xe=S(M,le);if(M.isDepthTexture)Fe=_(M.format===ks,M.type),nt&&(ze?n.texStorage2D(t.TEXTURE_2D,1,Fe,le.width,le.height):n.texImage2D(t.TEXTURE_2D,0,Fe,le.width,le.height,0,_e,Ue,null));else if(M.isDataTexture)if($e.length>0){ze&&nt&&n.texStorage2D(t.TEXTURE_2D,xe,Fe,$e[0].width,$e[0].height);for(let A=0,L=$e.length;A<L;A++)Se=$e[A],ze?F&&n.texSubImage2D(t.TEXTURE_2D,A,0,0,Se.width,Se.height,_e,Ue,Se.data):n.texImage2D(t.TEXTURE_2D,A,Fe,Se.width,Se.height,0,_e,Ue,Se.data);M.generateMipmaps=!1}else ze?(nt&&n.texStorage2D(t.TEXTURE_2D,xe,Fe,le.width,le.height),F&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,le.width,le.height,_e,Ue,le.data)):n.texImage2D(t.TEXTURE_2D,0,Fe,le.width,le.height,0,_e,Ue,le.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){ze&&nt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,xe,Fe,$e[0].width,$e[0].height,le.depth);for(let A=0,L=$e.length;A<L;A++)if(Se=$e[A],M.format!==Vn)if(_e!==null)if(ze){if(F)if(M.layerUpdates.size>0){const O=rg(Se.width,Se.height,M.format,M.type);for(const V of M.layerUpdates){const fe=Se.data.subarray(V*O/Se.data.BYTES_PER_ELEMENT,(V+1)*O/Se.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,A,0,0,V,Se.width,Se.height,1,_e,fe,0,0)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,A,0,0,0,Se.width,Se.height,le.depth,_e,Se.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,A,Fe,Se.width,Se.height,le.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?F&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,A,0,0,0,Se.width,Se.height,le.depth,_e,Ue,Se.data):n.texImage3D(t.TEXTURE_2D_ARRAY,A,Fe,Se.width,Se.height,le.depth,0,_e,Ue,Se.data)}else{ze&&nt&&n.texStorage2D(t.TEXTURE_2D,xe,Fe,$e[0].width,$e[0].height);for(let A=0,L=$e.length;A<L;A++)Se=$e[A],M.format!==Vn?_e!==null?ze?F&&n.compressedTexSubImage2D(t.TEXTURE_2D,A,0,0,Se.width,Se.height,_e,Se.data):n.compressedTexImage2D(t.TEXTURE_2D,A,Fe,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?F&&n.texSubImage2D(t.TEXTURE_2D,A,0,0,Se.width,Se.height,_e,Ue,Se.data):n.texImage2D(t.TEXTURE_2D,A,Fe,Se.width,Se.height,0,_e,Ue,Se.data)}else if(M.isDataArrayTexture)if(ze){if(nt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,xe,Fe,le.width,le.height,le.depth),F)if(M.layerUpdates.size>0){const A=rg(le.width,le.height,M.format,M.type);for(const L of M.layerUpdates){const O=le.data.subarray(L*A/le.data.BYTES_PER_ELEMENT,(L+1)*A/le.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,L,le.width,le.height,1,_e,Ue,O)}M.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,_e,Ue,le.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Fe,le.width,le.height,le.depth,0,_e,Ue,le.data);else if(M.isData3DTexture)ze?(nt&&n.texStorage3D(t.TEXTURE_3D,xe,Fe,le.width,le.height,le.depth),F&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,_e,Ue,le.data)):n.texImage3D(t.TEXTURE_3D,0,Fe,le.width,le.height,le.depth,0,_e,Ue,le.data);else if(M.isFramebufferTexture){if(nt)if(ze)n.texStorage2D(t.TEXTURE_2D,xe,Fe,le.width,le.height);else{let A=le.width,L=le.height;for(let O=0;O<xe;O++)n.texImage2D(t.TEXTURE_2D,O,Fe,A,L,0,_e,Ue,null),A>>=1,L>>=1}}else if($e.length>0){if(ze&&nt){const A=Le($e[0]);n.texStorage2D(t.TEXTURE_2D,xe,Fe,A.width,A.height)}for(let A=0,L=$e.length;A<L;A++)Se=$e[A],ze?F&&n.texSubImage2D(t.TEXTURE_2D,A,0,0,_e,Ue,Se):n.texImage2D(t.TEXTURE_2D,A,Fe,_e,Ue,Se);M.generateMipmaps=!1}else if(ze){if(nt){const A=Le(le);n.texStorage2D(t.TEXTURE_2D,xe,Fe,A.width,A.height)}F&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,_e,Ue,le)}else n.texImage2D(t.TEXTURE_2D,0,Fe,_e,Ue,le);m(M)&&u(ne),Ae.__version=ee.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function K(R,M,G){if(M.image.length!==6)return;const ne=be(R,M),re=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,R.__webglTexture,t.TEXTURE0+G);const ee=i.get(re);if(re.version!==ee.__version||ne===!0){n.activeTexture(t.TEXTURE0+G);const Ae=tt.getPrimaries(tt.workingColorSpace),pe=M.colorSpace===Oi?null:tt.getPrimaries(M.colorSpace),ye=M.colorSpace===Oi||Ae===pe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const Ze=M.isCompressedTexture||M.image[0].isCompressedTexture,le=M.image[0]&&M.image[0].isDataTexture,_e=[];for(let L=0;L<6;L++)!Ze&&!le?_e[L]=y(M.image[L],!0,r.maxCubemapSize):_e[L]=le?M.image[L].image:M.image[L],_e[L]=ot(M,_e[L]);const Ue=_e[0],Fe=s.convert(M.format,M.colorSpace),Se=s.convert(M.type),$e=g(M.internalFormat,Fe,Se,M.colorSpace),ze=M.isVideoTexture!==!0,nt=ee.__version===void 0||ne===!0,F=re.dataReady;let xe=S(M,Ue);ce(t.TEXTURE_CUBE_MAP,M);let A;if(Ze){ze&&nt&&n.texStorage2D(t.TEXTURE_CUBE_MAP,xe,$e,Ue.width,Ue.height);for(let L=0;L<6;L++){A=_e[L].mipmaps;for(let O=0;O<A.length;O++){const V=A[O];M.format!==Vn?Fe!==null?ze?F&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+L,O,0,0,V.width,V.height,Fe,V.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+L,O,$e,V.width,V.height,0,V.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+L,O,0,0,V.width,V.height,Fe,Se,V.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+L,O,$e,V.width,V.height,0,Fe,Se,V.data)}}}else{if(A=M.mipmaps,ze&&nt){A.length>0&&xe++;const L=Le(_e[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,xe,$e,L.width,L.height)}for(let L=0;L<6;L++)if(le){ze?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,0,0,_e[L].width,_e[L].height,Fe,Se,_e[L].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,$e,_e[L].width,_e[L].height,0,Fe,Se,_e[L].data);for(let O=0;O<A.length;O++){const fe=A[O].image[L].image;ze?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+L,O+1,0,0,fe.width,fe.height,Fe,Se,fe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+L,O+1,$e,fe.width,fe.height,0,Fe,Se,fe.data)}}else{ze?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,0,0,Fe,Se,_e[L]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,$e,Fe,Se,_e[L]);for(let O=0;O<A.length;O++){const V=A[O];ze?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+L,O+1,0,0,Fe,Se,V.image[L]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+L,O+1,$e,Fe,Se,V.image[L])}}}m(M)&&u(t.TEXTURE_CUBE_MAP),ee.__version=re.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function oe(R,M,G,ne,re,ee){const Ae=s.convert(G.format,G.colorSpace),pe=s.convert(G.type),ye=g(G.internalFormat,Ae,pe,G.colorSpace);if(!i.get(M).__hasExternalTextures){const le=Math.max(1,M.width>>ee),_e=Math.max(1,M.height>>ee);re===t.TEXTURE_3D||re===t.TEXTURE_2D_ARRAY?n.texImage3D(re,ee,ye,le,_e,M.depth,0,Ae,pe,null):n.texImage2D(re,ee,ye,le,_e,0,Ae,pe,null)}n.bindFramebuffer(t.FRAMEBUFFER,R),Ke(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ne,re,i.get(G).__webglTexture,0,Ve(M)):(re===t.TEXTURE_2D||re>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ne,re,i.get(G).__webglTexture,ee),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Z(R,M,G){if(t.bindRenderbuffer(t.RENDERBUFFER,R),M.depthBuffer){const ne=M.depthTexture,re=ne&&ne.isDepthTexture?ne.type:null,ee=_(M.stencilBuffer,re),Ae=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,pe=Ve(M);Ke(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,pe,ee,M.width,M.height):G?t.renderbufferStorageMultisample(t.RENDERBUFFER,pe,ee,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,ee,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Ae,t.RENDERBUFFER,R)}else{const ne=M.textures;for(let re=0;re<ne.length;re++){const ee=ne[re],Ae=s.convert(ee.format,ee.colorSpace),pe=s.convert(ee.type),ye=g(ee.internalFormat,Ae,pe,ee.colorSpace),Ze=Ve(M);G&&Ke(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ze,ye,M.width,M.height):Ke(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ze,ye,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,ye,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Q(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),$(M.depthTexture,0);const ne=i.get(M.depthTexture).__webglTexture,re=Ve(M);if(M.depthTexture.format===Es)Ke(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ne,0,re):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ne,0);else if(M.depthTexture.format===ks)Ke(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ne,0,re):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function ge(R){const M=i.get(R),G=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const ne=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),ne){const re=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,ne.removeEventListener("dispose",re)};ne.addEventListener("dispose",re),M.__depthDisposeCallback=re}M.__boundDepthTexture=ne}if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Q(M.__webglFramebuffer,R)}else if(G){M.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[ne]),M.__webglDepthbuffer[ne]===void 0)M.__webglDepthbuffer[ne]=t.createRenderbuffer(),Z(M.__webglDepthbuffer[ne],R,!1);else{const re=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ee=M.__webglDepthbuffer[ne];t.bindRenderbuffer(t.RENDERBUFFER,ee),t.framebufferRenderbuffer(t.FRAMEBUFFER,re,t.RENDERBUFFER,ee)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=t.createRenderbuffer(),Z(M.__webglDepthbuffer,R,!1);else{const ne=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,re=M.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,re),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,re)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function de(R,M,G){const ne=i.get(R);M!==void 0&&oe(ne.__webglFramebuffer,R,R.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),G!==void 0&&ge(R)}function he(R){const M=R.texture,G=i.get(R),ne=i.get(M);R.addEventListener("dispose",b);const re=R.textures,ee=R.isWebGLCubeRenderTarget===!0,Ae=re.length>1;if(Ae||(ne.__webglTexture===void 0&&(ne.__webglTexture=t.createTexture()),ne.__version=M.version,o.memory.textures++),ee){G.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer[pe]=[];for(let ye=0;ye<M.mipmaps.length;ye++)G.__webglFramebuffer[pe][ye]=t.createFramebuffer()}else G.__webglFramebuffer[pe]=t.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer=[];for(let pe=0;pe<M.mipmaps.length;pe++)G.__webglFramebuffer[pe]=t.createFramebuffer()}else G.__webglFramebuffer=t.createFramebuffer();if(Ae)for(let pe=0,ye=re.length;pe<ye;pe++){const Ze=i.get(re[pe]);Ze.__webglTexture===void 0&&(Ze.__webglTexture=t.createTexture(),o.memory.textures++)}if(R.samples>0&&Ke(R)===!1){G.__webglMultisampledFramebuffer=t.createFramebuffer(),G.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let pe=0;pe<re.length;pe++){const ye=re[pe];G.__webglColorRenderbuffer[pe]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,G.__webglColorRenderbuffer[pe]);const Ze=s.convert(ye.format,ye.colorSpace),le=s.convert(ye.type),_e=g(ye.internalFormat,Ze,le,ye.colorSpace,R.isXRRenderTarget===!0),Ue=Ve(R);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ue,_e,R.width,R.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+pe,t.RENDERBUFFER,G.__webglColorRenderbuffer[pe])}t.bindRenderbuffer(t.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=t.createRenderbuffer(),Z(G.__webglDepthRenderbuffer,R,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ee){n.bindTexture(t.TEXTURE_CUBE_MAP,ne.__webglTexture),ce(t.TEXTURE_CUBE_MAP,M);for(let pe=0;pe<6;pe++)if(M.mipmaps&&M.mipmaps.length>0)for(let ye=0;ye<M.mipmaps.length;ye++)oe(G.__webglFramebuffer[pe][ye],R,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,ye);else oe(G.__webglFramebuffer[pe],R,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);m(M)&&u(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ae){for(let pe=0,ye=re.length;pe<ye;pe++){const Ze=re[pe],le=i.get(Ze);n.bindTexture(t.TEXTURE_2D,le.__webglTexture),ce(t.TEXTURE_2D,Ze),oe(G.__webglFramebuffer,R,Ze,t.COLOR_ATTACHMENT0+pe,t.TEXTURE_2D,0),m(Ze)&&u(t.TEXTURE_2D)}n.unbindTexture()}else{let pe=t.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(pe=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(pe,ne.__webglTexture),ce(pe,M),M.mipmaps&&M.mipmaps.length>0)for(let ye=0;ye<M.mipmaps.length;ye++)oe(G.__webglFramebuffer[ye],R,M,t.COLOR_ATTACHMENT0,pe,ye);else oe(G.__webglFramebuffer,R,M,t.COLOR_ATTACHMENT0,pe,0);m(M)&&u(pe),n.unbindTexture()}R.depthBuffer&&ge(R)}function Te(R){const M=R.textures;for(let G=0,ne=M.length;G<ne;G++){const re=M[G];if(m(re)){const ee=R.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Ae=i.get(re).__webglTexture;n.bindTexture(ee,Ae),u(ee),n.unbindTexture()}}}const He=[],I=[];function pt(R){if(R.samples>0){if(Ke(R)===!1){const M=R.textures,G=R.width,ne=R.height;let re=t.COLOR_BUFFER_BIT;const ee=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ae=i.get(R),pe=M.length>1;if(pe)for(let ye=0;ye<M.length;ye++)n.bindFramebuffer(t.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Ae.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let ye=0;ye<M.length;ye++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(re|=t.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(re|=t.STENCIL_BUFFER_BIT)),pe){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Ae.__webglColorRenderbuffer[ye]);const Ze=i.get(M[ye]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ze,0)}t.blitFramebuffer(0,0,G,ne,0,0,G,ne,re,t.NEAREST),l===!0&&(He.length=0,I.length=0,He.push(t.COLOR_ATTACHMENT0+ye),R.depthBuffer&&R.resolveDepthBuffer===!1&&(He.push(ee),I.push(ee),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,I)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,He))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),pe)for(let ye=0;ye<M.length;ye++){n.bindFramebuffer(t.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.RENDERBUFFER,Ae.__webglColorRenderbuffer[ye]);const Ze=i.get(M[ye]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Ae.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.TEXTURE_2D,Ze,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const M=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[M])}}}function Ve(R){return Math.min(r.maxSamples,R.samples)}function Ke(R){const M=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ie(R){const M=o.render.frame;f.get(R)!==M&&(f.set(R,M),R.update())}function ot(R,M){const G=R.colorSpace,ne=R.format,re=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==ir&&G!==Oi&&(tt.getTransfer(G)===ft?(ne!==Vn||re!==Si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),M}function Le(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=E,this.setTexture2D=$,this.setTexture2DArray=te,this.setTexture3D=X,this.setTextureCube=q,this.rebindTextures=de,this.setupRenderTarget=he,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=pt,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=Ke}function WA(t,e){function n(i,r=Oi){let s;const o=tt.getTransfer(r);if(i===Si)return t.UNSIGNED_BYTE;if(i===Eh)return t.UNSIGNED_SHORT_4_4_4_4;if(i===wh)return t.UNSIGNED_SHORT_5_5_5_1;if(i===j_)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===G_)return t.BYTE;if(i===W_)return t.SHORT;if(i===Go)return t.UNSIGNED_SHORT;if(i===Mh)return t.INT;if(i===br)return t.UNSIGNED_INT;if(i===hi)return t.FLOAT;if(i===Zo)return t.HALF_FLOAT;if(i===X_)return t.ALPHA;if(i===Y_)return t.RGB;if(i===Vn)return t.RGBA;if(i===$_)return t.LUMINANCE;if(i===q_)return t.LUMINANCE_ALPHA;if(i===Es)return t.DEPTH_COMPONENT;if(i===ks)return t.DEPTH_STENCIL;if(i===K_)return t.RED;if(i===Th)return t.RED_INTEGER;if(i===Z_)return t.RG;if(i===Ah)return t.RG_INTEGER;if(i===Ch)return t.RGBA_INTEGER;if(i===ul||i===fl||i===dl||i===hl)if(o===ft)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ul)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===fl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===dl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===hl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ul)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===fl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===dl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===hl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===$f||i===qf||i===Kf||i===Zf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===$f)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===qf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Kf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Zf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Qf||i===Jf||i===ed)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Qf||i===Jf)return o===ft?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ed)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===td||i===nd||i===id||i===rd||i===sd||i===od||i===ad||i===ld||i===cd||i===ud||i===fd||i===dd||i===hd||i===pd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===td)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===nd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===id)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===rd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===sd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===od)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ad)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ld)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===cd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ud)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===fd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===dd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===hd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===pd)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===pl||i===md||i===gd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===pl)return o===ft?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===md)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===gd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Q_||i===vd||i===_d||i===xd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===pl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===vd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===_d)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===xd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Os?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class jA extends Tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ms extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const XA={type:"move"};class Nu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ms,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ms,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ms,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const m=n.getJointPose(y,i),u=this._getHandJoint(c,y);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const f=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=f.position.distanceTo(d.position),p=.02,v=.005;c.inputState.pinching&&h>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(XA)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new ms;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const YA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$A=`
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

}`;class qA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new en,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Ji({vertexShader:YA,fragmentShader:$A,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Qt(new wc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class KA extends Gs{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,f=null,d=null,h=null,p=null,v=null;const y=new qA,m=n.getContextAttributes();let u=null,g=null;const _=[],S=[],D=new Ye;let b=null;const T=new Tn;T.layers.enable(1),T.viewport=new Mt;const C=new Tn;C.layers.enable(2),C.viewport=new Mt;const Y=[T,C],x=new jA;x.layers.enable(1),x.layers.enable(2);let E=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let oe=_[K];return oe===void 0&&(oe=new Nu,_[K]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(K){let oe=_[K];return oe===void 0&&(oe=new Nu,_[K]=oe),oe.getGripSpace()},this.getHand=function(K){let oe=_[K];return oe===void 0&&(oe=new Nu,_[K]=oe),oe.getHandSpace()};function H(K){const oe=S.indexOf(K.inputSource);if(oe===-1)return;const Z=_[oe];Z!==void 0&&(Z.update(K.inputSource,K.frame,c||o),Z.dispatchEvent({type:K.type,data:K.inputSource}))}function $(){r.removeEventListener("select",H),r.removeEventListener("selectstart",H),r.removeEventListener("selectend",H),r.removeEventListener("squeeze",H),r.removeEventListener("squeezestart",H),r.removeEventListener("squeezeend",H),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",te);for(let K=0;K<_.length;K++){const oe=S[K];oe!==null&&(S[K]=null,_[K].disconnect(oe))}E=null,N=null,y.reset(),e.setRenderTarget(u),p=null,h=null,d=null,r=null,g=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(u=e.getRenderTarget(),r.addEventListener("select",H),r.addEventListener("selectstart",H),r.addEventListener("selectend",H),r.addEventListener("squeeze",H),r.addEventListener("squeezestart",H),r.addEventListener("squeezeend",H),r.addEventListener("end",$),r.addEventListener("inputsourceschange",te),m.xrCompatible!==!0&&await n.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(D),r.renderState.layers===void 0){const oe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,oe),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),g=new Pr(p.framebufferWidth,p.framebufferHeight,{format:Vn,type:Si,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let oe=null,Z=null,Q=null;m.depth&&(Q=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,oe=m.stencil?ks:Es,Z=m.stencil?Os:br);const ge={colorFormat:n.RGBA8,depthFormat:Q,scaleFactor:s};d=new XRWebGLBinding(r,n),h=d.createProjectionLayer(ge),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),g=new Pr(h.textureWidth,h.textureHeight,{format:Vn,type:Si,depthTexture:new d0(h.textureWidth,h.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}g.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Be.setContext(r),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function te(K){for(let oe=0;oe<K.removed.length;oe++){const Z=K.removed[oe],Q=S.indexOf(Z);Q>=0&&(S[Q]=null,_[Q].disconnect(Z))}for(let oe=0;oe<K.added.length;oe++){const Z=K.added[oe];let Q=S.indexOf(Z);if(Q===-1){for(let de=0;de<_.length;de++)if(de>=S.length){S.push(Z),Q=de;break}else if(S[de]===null){S[de]=Z,Q=de;break}if(Q===-1)break}const ge=_[Q];ge&&ge.connect(Z)}}const X=new B,q=new B;function U(K,oe,Z){X.setFromMatrixPosition(oe.matrixWorld),q.setFromMatrixPosition(Z.matrixWorld);const Q=X.distanceTo(q),ge=oe.projectionMatrix.elements,de=Z.projectionMatrix.elements,he=ge[14]/(ge[10]-1),Te=ge[14]/(ge[10]+1),He=(ge[9]+1)/ge[5],I=(ge[9]-1)/ge[5],pt=(ge[8]-1)/ge[0],Ve=(de[8]+1)/de[0],Ke=he*pt,Ie=he*Ve,ot=Q/(-pt+Ve),Le=ot*-pt;if(oe.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Le),K.translateZ(ot),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),ge[10]===-1)K.projectionMatrix.copy(oe.projectionMatrix),K.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const R=he+ot,M=Te+ot,G=Ke-Le,ne=Ie+(Q-Le),re=He*Te/M*R,ee=I*Te/M*R;K.projectionMatrix.makePerspective(G,ne,re,ee,R,M),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function J(K,oe){oe===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(oe.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let oe=K.near,Z=K.far;y.texture!==null&&(y.depthNear>0&&(oe=y.depthNear),y.depthFar>0&&(Z=y.depthFar)),x.near=C.near=T.near=oe,x.far=C.far=T.far=Z,(E!==x.near||N!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),E=x.near,N=x.far);const Q=K.parent,ge=x.cameras;J(x,Q);for(let de=0;de<ge.length;de++)J(ge[de],Q);ge.length===2?U(x,T,C):x.projectionMatrix.copy(T.projectionMatrix),ie(K,x,Q)};function ie(K,oe,Z){Z===null?K.matrix.copy(oe.matrixWorld):(K.matrix.copy(Z.matrixWorld),K.matrix.invert(),K.matrix.multiply(oe.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(oe.projectionMatrix),K.projectionMatrixInverse.copy(oe.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Wo*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(K){l=K,h!==null&&(h.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(x)};let ce=null;function be(K,oe){if(f=oe.getViewerPose(c||o),v=oe,f!==null){const Z=f.views;p!==null&&(e.setRenderTargetFramebuffer(g,p.framebuffer),e.setRenderTarget(g));let Q=!1;Z.length!==x.cameras.length&&(x.cameras.length=0,Q=!0);for(let de=0;de<Z.length;de++){const he=Z[de];let Te=null;if(p!==null)Te=p.getViewport(he);else{const I=d.getViewSubImage(h,he);Te=I.viewport,de===0&&(e.setRenderTargetTextures(g,I.colorTexture,h.ignoreDepthValues?void 0:I.depthStencilTexture),e.setRenderTarget(g))}let He=Y[de];He===void 0&&(He=new Tn,He.layers.enable(de),He.viewport=new Mt,Y[de]=He),He.matrix.fromArray(he.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(he.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(Te.x,Te.y,Te.width,Te.height),de===0&&(x.matrix.copy(He.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),Q===!0&&x.cameras.push(He)}const ge=r.enabledFeatures;if(ge&&ge.includes("depth-sensing")){const de=d.getDepthInformation(Z[0]);de&&de.isValid&&de.texture&&y.init(e,de,r.renderState)}}for(let Z=0;Z<_.length;Z++){const Q=S[Z],ge=_[Z];Q!==null&&ge!==void 0&&ge.update(Q,oe,c||o)}ce&&ce(K,oe),oe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:oe}),v=null}const Be=new u0;Be.setAnimationLoop(be),this.setAnimationLoop=function(K){ce=K},this.dispose=function(){}}}const ur=new ei,ZA=new ht;function QA(t,e){function n(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,a0(t)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function r(m,u,g,_,S){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(m,u):u.isMeshToonMaterial?(s(m,u),d(m,u)):u.isMeshPhongMaterial?(s(m,u),f(m,u)):u.isMeshStandardMaterial?(s(m,u),h(m,u),u.isMeshPhysicalMaterial&&p(m,u,S)):u.isMeshMatcapMaterial?(s(m,u),v(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),y(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(o(m,u),u.isLineDashedMaterial&&a(m,u)):u.isPointsMaterial?l(m,u,g,_):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,n(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===cn&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,n(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===cn&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,n(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,n(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const g=e.get(u),_=g.envMap,S=g.envMapRotation;_&&(m.envMap.value=_,ur.copy(S),ur.x*=-1,ur.y*=-1,ur.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ur.y*=-1,ur.z*=-1),m.envMapRotation.value.setFromMatrix4(ZA.makeRotationFromEuler(ur)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,m.aoMapTransform))}function o(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform))}function a(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,g,_){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*g,m.scale.value=_*.5,u.map&&(m.map.value=u.map,n(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function f(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function d(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function h(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,g){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===cn&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=g.texture,m.transmissionSamplerSize.value.set(g.width,g.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,u){u.matcap&&(m.matcap.value=u.matcap)}function y(m,u){const g=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(g.matrixWorld),m.nearDistance.value=g.shadow.camera.near,m.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function JA(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(g,_){const S=_.program;i.uniformBlockBinding(g,S)}function c(g,_){let S=r[g.id];S===void 0&&(v(g),S=f(g),r[g.id]=S,g.addEventListener("dispose",m));const D=_.program;i.updateUBOMapping(g,D);const b=e.render.frame;s[g.id]!==b&&(h(g),s[g.id]=b)}function f(g){const _=d();g.__bindingPointIndex=_;const S=t.createBuffer(),D=g.__size,b=g.usage;return t.bindBuffer(t.UNIFORM_BUFFER,S),t.bufferData(t.UNIFORM_BUFFER,D,b),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,_,S),S}function d(){for(let g=0;g<a;g++)if(o.indexOf(g)===-1)return o.push(g),g;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(g){const _=r[g.id],S=g.uniforms,D=g.__cache;t.bindBuffer(t.UNIFORM_BUFFER,_);for(let b=0,T=S.length;b<T;b++){const C=Array.isArray(S[b])?S[b]:[S[b]];for(let Y=0,x=C.length;Y<x;Y++){const E=C[Y];if(p(E,b,Y,D)===!0){const N=E.__offset,H=Array.isArray(E.value)?E.value:[E.value];let $=0;for(let te=0;te<H.length;te++){const X=H[te],q=y(X);typeof X=="number"||typeof X=="boolean"?(E.__data[0]=X,t.bufferSubData(t.UNIFORM_BUFFER,N+$,E.__data)):X.isMatrix3?(E.__data[0]=X.elements[0],E.__data[1]=X.elements[1],E.__data[2]=X.elements[2],E.__data[3]=0,E.__data[4]=X.elements[3],E.__data[5]=X.elements[4],E.__data[6]=X.elements[5],E.__data[7]=0,E.__data[8]=X.elements[6],E.__data[9]=X.elements[7],E.__data[10]=X.elements[8],E.__data[11]=0):(X.toArray(E.__data,$),$+=q.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,N,E.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(g,_,S,D){const b=g.value,T=_+"_"+S;if(D[T]===void 0)return typeof b=="number"||typeof b=="boolean"?D[T]=b:D[T]=b.clone(),!0;{const C=D[T];if(typeof b=="number"||typeof b=="boolean"){if(C!==b)return D[T]=b,!0}else if(C.equals(b)===!1)return C.copy(b),!0}return!1}function v(g){const _=g.uniforms;let S=0;const D=16;for(let T=0,C=_.length;T<C;T++){const Y=Array.isArray(_[T])?_[T]:[_[T]];for(let x=0,E=Y.length;x<E;x++){const N=Y[x],H=Array.isArray(N.value)?N.value:[N.value];for(let $=0,te=H.length;$<te;$++){const X=H[$],q=y(X),U=S%D,J=U%q.boundary,ie=U+J;S+=J,ie!==0&&D-ie<q.storage&&(S+=D-ie),N.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=S,S+=q.storage}}}const b=S%D;return b>0&&(S+=D-b),g.__size=S,g.__cache={},this}function y(g){const _={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(_.boundary=4,_.storage=4):g.isVector2?(_.boundary=8,_.storage=8):g.isVector3||g.isColor?(_.boundary=16,_.storage=12):g.isVector4?(_.boundary=16,_.storage=16):g.isMatrix3?(_.boundary=48,_.storage=48):g.isMatrix4?(_.boundary=64,_.storage=64):g.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",g),_}function m(g){const _=g.target;_.removeEventListener("dispose",m);const S=o.indexOf(_.__bindingPointIndex);o.splice(S,1),t.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function u(){for(const g in r)t.deleteBuffer(r[g]);o=[],r={},s={}}return{bind:l,update:c,dispose:u}}class eC{constructor(e={}){const{canvas:n=HM(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=o;const p=new Uint32Array(4),v=new Int32Array(4);let y=null,m=null;const u=[],g=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=qn,this.toneMapping=qi,this.toneMappingExposure=1;const _=this;let S=!1,D=0,b=0,T=null,C=-1,Y=null;const x=new Mt,E=new Mt;let N=null;const H=new Xe(0);let $=0,te=n.width,X=n.height,q=1,U=null,J=null;const ie=new Mt(0,0,te,X),ce=new Mt(0,0,te,X);let be=!1;const Be=new Dh;let K=!1,oe=!1;const Z=new ht,Q=new ht,ge=new B,de=new Mt,he={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Te=!1;function He(){return T===null?q:1}let I=i;function pt(w,k){return n.getContext(w,k)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Sh}`),n.addEventListener("webglcontextlost",L,!1),n.addEventListener("webglcontextrestored",O,!1),n.addEventListener("webglcontextcreationerror",V,!1),I===null){const k="webgl2";if(I=pt(k,w),I===null)throw pt(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Ve,Ke,Ie,ot,Le,R,M,G,ne,re,ee,Ae,pe,ye,Ze,le,_e,Ue,Fe,Se,$e,ze,nt,F;function xe(){Ve=new s1(I),Ve.init(),ze=new WA(I,Ve),Ke=new JT(I,Ve,e,ze),Ie=new HA(I),Ke.reverseDepthBuffer&&Ie.buffers.depth.setReversed(!0),ot=new l1(I),Le=new AA,R=new GA(I,Ve,Ie,Le,Ke,ze,ot),M=new t1(_),G=new r1(_),ne=new mE(I),nt=new ZT(I,ne),re=new o1(I,ne,ot,nt),ee=new u1(I,re,ne,ot),Fe=new c1(I,Ke,R),le=new e1(Le),Ae=new TA(_,M,G,Ve,Ke,nt,le),pe=new QA(_,Le),ye=new RA,Ze=new IA(Ve),Ue=new KT(_,M,G,Ie,ee,h,l),_e=new zA(_,ee,Ke),F=new JA(I,ot,Ke,Ie),Se=new QT(I,Ve,ot),$e=new a1(I,Ve,ot),ot.programs=Ae.programs,_.capabilities=Ke,_.extensions=Ve,_.properties=Le,_.renderLists=ye,_.shadowMap=_e,_.state=Ie,_.info=ot}xe();const A=new KA(_,I);this.xr=A,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const w=Ve.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ve.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(w){w!==void 0&&(q=w,this.setSize(te,X,!1))},this.getSize=function(w){return w.set(te,X)},this.setSize=function(w,k,W=!0){if(A.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}te=w,X=k,n.width=Math.floor(w*q),n.height=Math.floor(k*q),W===!0&&(n.style.width=w+"px",n.style.height=k+"px"),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(te*q,X*q).floor()},this.setDrawingBufferSize=function(w,k,W){te=w,X=k,q=W,n.width=Math.floor(w*W),n.height=Math.floor(k*W),this.setViewport(0,0,w,k)},this.getCurrentViewport=function(w){return w.copy(x)},this.getViewport=function(w){return w.copy(ie)},this.setViewport=function(w,k,W,j){w.isVector4?ie.set(w.x,w.y,w.z,w.w):ie.set(w,k,W,j),Ie.viewport(x.copy(ie).multiplyScalar(q).round())},this.getScissor=function(w){return w.copy(ce)},this.setScissor=function(w,k,W,j){w.isVector4?ce.set(w.x,w.y,w.z,w.w):ce.set(w,k,W,j),Ie.scissor(E.copy(ce).multiplyScalar(q).round())},this.getScissorTest=function(){return be},this.setScissorTest=function(w){Ie.setScissorTest(be=w)},this.setOpaqueSort=function(w){U=w},this.setTransparentSort=function(w){J=w},this.getClearColor=function(w){return w.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor.apply(Ue,arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha.apply(Ue,arguments)},this.clear=function(w=!0,k=!0,W=!0){let j=0;if(w){let z=!1;if(T!==null){const ue=T.texture.format;z=ue===Ch||ue===Ah||ue===Th}if(z){const ue=T.texture.type,ve=ue===Si||ue===br||ue===Go||ue===Os||ue===Eh||ue===wh,we=Ue.getClearColor(),Ce=Ue.getClearAlpha(),Oe=we.r,ke=we.g,Re=we.b;ve?(p[0]=Oe,p[1]=ke,p[2]=Re,p[3]=Ce,I.clearBufferuiv(I.COLOR,0,p)):(v[0]=Oe,v[1]=ke,v[2]=Re,v[3]=Ce,I.clearBufferiv(I.COLOR,0,v))}else j|=I.COLOR_BUFFER_BIT}k&&(j|=I.DEPTH_BUFFER_BIT,I.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),W&&(j|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",L,!1),n.removeEventListener("webglcontextrestored",O,!1),n.removeEventListener("webglcontextcreationerror",V,!1),ye.dispose(),Ze.dispose(),Le.dispose(),M.dispose(),G.dispose(),ee.dispose(),nt.dispose(),F.dispose(),Ae.dispose(),A.dispose(),A.removeEventListener("sessionstart",Oh),A.removeEventListener("sessionend",kh),rr.stop()};function L(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function O(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const w=ot.autoReset,k=_e.enabled,W=_e.autoUpdate,j=_e.needsUpdate,z=_e.type;xe(),ot.autoReset=w,_e.enabled=k,_e.autoUpdate=W,_e.needsUpdate=j,_e.type=z}function V(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function fe(w){const k=w.target;k.removeEventListener("dispose",fe),De(k)}function De(w){Ge(w),Le.remove(w)}function Ge(w){const k=Le.get(w).programs;k!==void 0&&(k.forEach(function(W){Ae.releaseProgram(W)}),w.isShaderMaterial&&Ae.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,W,j,z,ue){k===null&&(k=he);const ve=z.isMesh&&z.matrixWorld.determinant()<0,we=y0(w,k,W,j,z);Ie.setMaterial(j,ve);let Ce=W.index,Oe=1;if(j.wireframe===!0){if(Ce=re.getWireframeAttribute(W),Ce===void 0)return;Oe=2}const ke=W.drawRange,Re=W.attributes.position;let it=ke.start*Oe,ct=(ke.start+ke.count)*Oe;ue!==null&&(it=Math.max(it,ue.start*Oe),ct=Math.min(ct,(ue.start+ue.count)*Oe)),Ce!==null?(it=Math.max(it,0),ct=Math.min(ct,Ce.count)):Re!=null&&(it=Math.max(it,0),ct=Math.min(ct,Re.count));const yt=ct-it;if(yt<0||yt===1/0)return;nt.setup(z,j,we,W,Ce);let fn,Je=Se;if(Ce!==null&&(fn=ne.get(Ce),Je=$e,Je.setIndex(fn)),z.isMesh)j.wireframe===!0?(Ie.setLineWidth(j.wireframeLinewidth*He()),Je.setMode(I.LINES)):Je.setMode(I.TRIANGLES);else if(z.isLine){let Pe=j.linewidth;Pe===void 0&&(Pe=1),Ie.setLineWidth(Pe*He()),z.isLineSegments?Je.setMode(I.LINES):z.isLineLoop?Je.setMode(I.LINE_LOOP):Je.setMode(I.LINE_STRIP)}else z.isPoints?Je.setMode(I.POINTS):z.isSprite&&Je.setMode(I.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)Je.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))Je.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Pe=z._multiDrawStarts,Ot=z._multiDrawCounts,et=z._multiDrawCount,Dn=Ce?ne.get(Ce).bytesPerElement:1,Ir=Le.get(j).currentProgram.getUniforms();for(let dn=0;dn<et;dn++)Ir.setValue(I,"_gl_DrawID",dn),Je.render(Pe[dn]/Dn,Ot[dn])}else if(z.isInstancedMesh)Je.renderInstances(it,yt,z.count);else if(W.isInstancedBufferGeometry){const Pe=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Ot=Math.min(W.instanceCount,Pe);Je.renderInstances(it,yt,Ot)}else Je.render(it,yt)};function Ne(w,k,W){w.transparent===!0&&w.side===ci&&w.forceSinglePass===!1?(w.side=cn,w.needsUpdate=!0,ia(w,k,W),w.side=Qi,w.needsUpdate=!0,ia(w,k,W),w.side=ci):ia(w,k,W)}this.compile=function(w,k,W=null){W===null&&(W=w),m=Ze.get(W),m.init(k),g.push(m),W.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),w!==W&&w.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights();const j=new Set;return w.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ue=z.material;if(ue)if(Array.isArray(ue))for(let ve=0;ve<ue.length;ve++){const we=ue[ve];Ne(we,W,z),j.add(we)}else Ne(ue,W,z),j.add(ue)}),g.pop(),m=null,j},this.compileAsync=function(w,k,W=null){const j=this.compile(w,k,W);return new Promise(z=>{function ue(){if(j.forEach(function(ve){Le.get(ve).currentProgram.isReady()&&j.delete(ve)}),j.size===0){z(w);return}setTimeout(ue,10)}Ve.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let Et=null;function un(w){Et&&Et(w)}function Oh(){rr.stop()}function kh(){rr.start()}const rr=new u0;rr.setAnimationLoop(un),typeof self<"u"&&rr.setContext(self),this.setAnimationLoop=function(w){Et=w,A.setAnimationLoop(w),w===null?rr.stop():rr.start()},A.addEventListener("sessionstart",Oh),A.addEventListener("sessionend",kh),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),A.enabled===!0&&A.isPresenting===!0&&(A.cameraAutoUpdate===!0&&A.updateCamera(k),k=A.getCamera()),w.isScene===!0&&w.onBeforeRender(_,w,k,T),m=Ze.get(w,g.length),m.init(k),g.push(m),Q.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Be.setFromProjectionMatrix(Q),oe=this.localClippingEnabled,K=le.init(this.clippingPlanes,oe),y=ye.get(w,u.length),y.init(),u.push(y),A.enabled===!0&&A.isPresenting===!0){const ue=_.xr.getDepthSensingMesh();ue!==null&&Cc(ue,k,-1/0,_.sortObjects)}Cc(w,k,0,_.sortObjects),y.finish(),_.sortObjects===!0&&y.sort(U,J),Te=A.enabled===!1||A.isPresenting===!1||A.hasDepthSensing()===!1,Te&&Ue.addToRenderList(y,w),this.info.render.frame++,K===!0&&le.beginShadows();const W=m.state.shadowsArray;_e.render(W,w,k),K===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=y.opaque,z=y.transmissive;if(m.setupLights(),k.isArrayCamera){const ue=k.cameras;if(z.length>0)for(let ve=0,we=ue.length;ve<we;ve++){const Ce=ue[ve];Bh(j,z,w,Ce)}Te&&Ue.render(w);for(let ve=0,we=ue.length;ve<we;ve++){const Ce=ue[ve];zh(y,w,Ce,Ce.viewport)}}else z.length>0&&Bh(j,z,w,k),Te&&Ue.render(w),zh(y,w,k);T!==null&&(R.updateMultisampleRenderTarget(T),R.updateRenderTargetMipmap(T)),w.isScene===!0&&w.onAfterRender(_,w,k),nt.resetDefaultState(),C=-1,Y=null,g.pop(),g.length>0?(m=g[g.length-1],K===!0&&le.setGlobalState(_.clippingPlanes,m.state.camera)):m=null,u.pop(),u.length>0?y=u[u.length-1]:y=null};function Cc(w,k,W,j){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)W=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Be.intersectsSprite(w)){j&&de.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Q);const ve=ee.update(w),we=w.material;we.visible&&y.push(w,ve,we,W,de.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Be.intersectsObject(w))){const ve=ee.update(w),we=w.material;if(j&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),de.copy(w.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),de.copy(ve.boundingSphere.center)),de.applyMatrix4(w.matrixWorld).applyMatrix4(Q)),Array.isArray(we)){const Ce=ve.groups;for(let Oe=0,ke=Ce.length;Oe<ke;Oe++){const Re=Ce[Oe],it=we[Re.materialIndex];it&&it.visible&&y.push(w,ve,it,W,de.z,Re)}}else we.visible&&y.push(w,ve,we,W,de.z,null)}}const ue=w.children;for(let ve=0,we=ue.length;ve<we;ve++)Cc(ue[ve],k,W,j)}function zh(w,k,W,j){const z=w.opaque,ue=w.transmissive,ve=w.transparent;m.setupLightsView(W),K===!0&&le.setGlobalState(_.clippingPlanes,W),j&&Ie.viewport(x.copy(j)),z.length>0&&na(z,k,W),ue.length>0&&na(ue,k,W),ve.length>0&&na(ve,k,W),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function Bh(w,k,W,j){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[j.id]===void 0&&(m.state.transmissionRenderTarget[j.id]=new Pr(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?Zo:Si,minFilter:Sr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const ue=m.state.transmissionRenderTarget[j.id],ve=j.viewport||x;ue.setSize(ve.z,ve.w);const we=_.getRenderTarget();_.setRenderTarget(ue),_.getClearColor(H),$=_.getClearAlpha(),$<1&&_.setClearColor(16777215,.5),_.clear(),Te&&Ue.render(W);const Ce=_.toneMapping;_.toneMapping=qi;const Oe=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),m.setupLightsView(j),K===!0&&le.setGlobalState(_.clippingPlanes,j),na(w,W,j),R.updateMultisampleRenderTarget(ue),R.updateRenderTargetMipmap(ue),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let Re=0,it=k.length;Re<it;Re++){const ct=k[Re],yt=ct.object,fn=ct.geometry,Je=ct.material,Pe=ct.group;if(Je.side===ci&&yt.layers.test(j.layers)){const Ot=Je.side;Je.side=cn,Je.needsUpdate=!0,Hh(yt,W,j,fn,Je,Pe),Je.side=Ot,Je.needsUpdate=!0,ke=!0}}ke===!0&&(R.updateMultisampleRenderTarget(ue),R.updateRenderTargetMipmap(ue))}_.setRenderTarget(we),_.setClearColor(H,$),Oe!==void 0&&(j.viewport=Oe),_.toneMapping=Ce}function na(w,k,W){const j=k.isScene===!0?k.overrideMaterial:null;for(let z=0,ue=w.length;z<ue;z++){const ve=w[z],we=ve.object,Ce=ve.geometry,Oe=j===null?ve.material:j,ke=ve.group;we.layers.test(W.layers)&&Hh(we,k,W,Ce,Oe,ke)}}function Hh(w,k,W,j,z,ue){w.onBeforeRender(_,k,W,j,z,ue),w.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),z.onBeforeRender(_,k,W,j,w,ue),z.transparent===!0&&z.side===ci&&z.forceSinglePass===!1?(z.side=cn,z.needsUpdate=!0,_.renderBufferDirect(W,k,j,z,w,ue),z.side=Qi,z.needsUpdate=!0,_.renderBufferDirect(W,k,j,z,w,ue),z.side=ci):_.renderBufferDirect(W,k,j,z,w,ue),w.onAfterRender(_,k,W,j,z,ue)}function ia(w,k,W){k.isScene!==!0&&(k=he);const j=Le.get(w),z=m.state.lights,ue=m.state.shadowsArray,ve=z.state.version,we=Ae.getParameters(w,z.state,ue,k,W),Ce=Ae.getProgramCacheKey(we);let Oe=j.programs;j.environment=w.isMeshStandardMaterial?k.environment:null,j.fog=k.fog,j.envMap=(w.isMeshStandardMaterial?G:M).get(w.envMap||j.environment),j.envMapRotation=j.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,Oe===void 0&&(w.addEventListener("dispose",fe),Oe=new Map,j.programs=Oe);let ke=Oe.get(Ce);if(ke!==void 0){if(j.currentProgram===ke&&j.lightsStateVersion===ve)return Gh(w,we),ke}else we.uniforms=Ae.getUniforms(w),w.onBeforeCompile(we,_),ke=Ae.acquireProgram(we,Ce),Oe.set(Ce,ke),j.uniforms=we.uniforms;const Re=j.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Re.clippingPlanes=le.uniform),Gh(w,we),j.needsLights=M0(w),j.lightsStateVersion=ve,j.needsLights&&(Re.ambientLightColor.value=z.state.ambient,Re.lightProbe.value=z.state.probe,Re.directionalLights.value=z.state.directional,Re.directionalLightShadows.value=z.state.directionalShadow,Re.spotLights.value=z.state.spot,Re.spotLightShadows.value=z.state.spotShadow,Re.rectAreaLights.value=z.state.rectArea,Re.ltc_1.value=z.state.rectAreaLTC1,Re.ltc_2.value=z.state.rectAreaLTC2,Re.pointLights.value=z.state.point,Re.pointLightShadows.value=z.state.pointShadow,Re.hemisphereLights.value=z.state.hemi,Re.directionalShadowMap.value=z.state.directionalShadowMap,Re.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Re.spotShadowMap.value=z.state.spotShadowMap,Re.spotLightMatrix.value=z.state.spotLightMatrix,Re.spotLightMap.value=z.state.spotLightMap,Re.pointShadowMap.value=z.state.pointShadowMap,Re.pointShadowMatrix.value=z.state.pointShadowMatrix),j.currentProgram=ke,j.uniformsList=null,ke}function Vh(w){if(w.uniformsList===null){const k=w.currentProgram.getUniforms();w.uniformsList=gl.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function Gh(w,k){const W=Le.get(w);W.outputColorSpace=k.outputColorSpace,W.batching=k.batching,W.batchingColor=k.batchingColor,W.instancing=k.instancing,W.instancingColor=k.instancingColor,W.instancingMorph=k.instancingMorph,W.skinning=k.skinning,W.morphTargets=k.morphTargets,W.morphNormals=k.morphNormals,W.morphColors=k.morphColors,W.morphTargetsCount=k.morphTargetsCount,W.numClippingPlanes=k.numClippingPlanes,W.numIntersection=k.numClipIntersection,W.vertexAlphas=k.vertexAlphas,W.vertexTangents=k.vertexTangents,W.toneMapping=k.toneMapping}function y0(w,k,W,j,z){k.isScene!==!0&&(k=he),R.resetTextureUnits();const ue=k.fog,ve=j.isMeshStandardMaterial?k.environment:null,we=T===null?_.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:ir,Ce=(j.isMeshStandardMaterial?G:M).get(j.envMap||ve),Oe=j.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,ke=!!W.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Re=!!W.morphAttributes.position,it=!!W.morphAttributes.normal,ct=!!W.morphAttributes.color;let yt=qi;j.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(yt=_.toneMapping);const fn=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Je=fn!==void 0?fn.length:0,Pe=Le.get(j),Ot=m.state.lights;if(K===!0&&(oe===!0||w!==Y)){const Sn=w===Y&&j.id===C;le.setState(j,w,Sn)}let et=!1;j.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==Ot.state.version||Pe.outputColorSpace!==we||z.isBatchedMesh&&Pe.batching===!1||!z.isBatchedMesh&&Pe.batching===!0||z.isBatchedMesh&&Pe.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Pe.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Pe.instancing===!1||!z.isInstancedMesh&&Pe.instancing===!0||z.isSkinnedMesh&&Pe.skinning===!1||!z.isSkinnedMesh&&Pe.skinning===!0||z.isInstancedMesh&&Pe.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Pe.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Pe.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Pe.instancingMorph===!1&&z.morphTexture!==null||Pe.envMap!==Ce||j.fog===!0&&Pe.fog!==ue||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==le.numPlanes||Pe.numIntersection!==le.numIntersection)||Pe.vertexAlphas!==Oe||Pe.vertexTangents!==ke||Pe.morphTargets!==Re||Pe.morphNormals!==it||Pe.morphColors!==ct||Pe.toneMapping!==yt||Pe.morphTargetsCount!==Je)&&(et=!0):(et=!0,Pe.__version=j.version);let Dn=Pe.currentProgram;et===!0&&(Dn=ia(j,k,z));let Ir=!1,dn=!1,Rc=!1;const wt=Dn.getUniforms(),wi=Pe.uniforms;if(Ie.useProgram(Dn.program)&&(Ir=!0,dn=!0,Rc=!0),j.id!==C&&(C=j.id,dn=!0),Ir||Y!==w){Ke.reverseDepthBuffer?(Z.copy(w.projectionMatrix),GM(Z),WM(Z),wt.setValue(I,"projectionMatrix",Z)):wt.setValue(I,"projectionMatrix",w.projectionMatrix),wt.setValue(I,"viewMatrix",w.matrixWorldInverse);const Sn=wt.map.cameraPosition;Sn!==void 0&&Sn.setValue(I,ge.setFromMatrixPosition(w.matrixWorld)),Ke.logarithmicDepthBuffer&&wt.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&wt.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),Y!==w&&(Y=w,dn=!0,Rc=!0)}if(z.isSkinnedMesh){wt.setOptional(I,z,"bindMatrix"),wt.setOptional(I,z,"bindMatrixInverse");const Sn=z.skeleton;Sn&&(Sn.boneTexture===null&&Sn.computeBoneTexture(),wt.setValue(I,"boneTexture",Sn.boneTexture,R))}z.isBatchedMesh&&(wt.setOptional(I,z,"batchingTexture"),wt.setValue(I,"batchingTexture",z._matricesTexture,R),wt.setOptional(I,z,"batchingIdTexture"),wt.setValue(I,"batchingIdTexture",z._indirectTexture,R),wt.setOptional(I,z,"batchingColorTexture"),z._colorsTexture!==null&&wt.setValue(I,"batchingColorTexture",z._colorsTexture,R));const bc=W.morphAttributes;if((bc.position!==void 0||bc.normal!==void 0||bc.color!==void 0)&&Fe.update(z,W,Dn),(dn||Pe.receiveShadow!==z.receiveShadow)&&(Pe.receiveShadow=z.receiveShadow,wt.setValue(I,"receiveShadow",z.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(wi.envMap.value=Ce,wi.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&k.environment!==null&&(wi.envMapIntensity.value=k.environmentIntensity),dn&&(wt.setValue(I,"toneMappingExposure",_.toneMappingExposure),Pe.needsLights&&S0(wi,Rc),ue&&j.fog===!0&&pe.refreshFogUniforms(wi,ue),pe.refreshMaterialUniforms(wi,j,q,X,m.state.transmissionRenderTarget[w.id]),gl.upload(I,Vh(Pe),wi,R)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(gl.upload(I,Vh(Pe),wi,R),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&wt.setValue(I,"center",z.center),wt.setValue(I,"modelViewMatrix",z.modelViewMatrix),wt.setValue(I,"normalMatrix",z.normalMatrix),wt.setValue(I,"modelMatrix",z.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const Sn=j.uniformsGroups;for(let Pc=0,E0=Sn.length;Pc<E0;Pc++){const Wh=Sn[Pc];F.update(Wh,Dn),F.bind(Wh,Dn)}}return Dn}function S0(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function M0(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(w,k,W){Le.get(w.texture).__webglTexture=k,Le.get(w.depthTexture).__webglTexture=W;const j=Le.get(w);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=W===void 0,j.__autoAllocateDepthBuffer||Ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,k){const W=Le.get(w);W.__webglFramebuffer=k,W.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(w,k=0,W=0){T=w,D=k,b=W;let j=!0,z=null,ue=!1,ve=!1;if(w){const Ce=Le.get(w);if(Ce.__useDefaultFramebuffer!==void 0)Ie.bindFramebuffer(I.FRAMEBUFFER,null),j=!1;else if(Ce.__webglFramebuffer===void 0)R.setupRenderTarget(w);else if(Ce.__hasExternalTextures)R.rebindTextures(w,Le.get(w.texture).__webglTexture,Le.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Re=w.depthTexture;if(Ce.__boundDepthTexture!==Re){if(Re!==null&&Le.has(Re)&&(w.width!==Re.image.width||w.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(w)}}const Oe=w.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(ve=!0);const ke=Le.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(ke[k])?z=ke[k][W]:z=ke[k],ue=!0):w.samples>0&&R.useMultisampledRTT(w)===!1?z=Le.get(w).__webglMultisampledFramebuffer:Array.isArray(ke)?z=ke[W]:z=ke,x.copy(w.viewport),E.copy(w.scissor),N=w.scissorTest}else x.copy(ie).multiplyScalar(q).floor(),E.copy(ce).multiplyScalar(q).floor(),N=be;if(Ie.bindFramebuffer(I.FRAMEBUFFER,z)&&j&&Ie.drawBuffers(w,z),Ie.viewport(x),Ie.scissor(E),Ie.setScissorTest(N),ue){const Ce=Le.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ce.__webglTexture,W)}else if(ve){const Ce=Le.get(w.texture),Oe=k||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ce.__webglTexture,W||0,Oe)}C=-1},this.readRenderTargetPixels=function(w,k,W,j,z,ue,ve){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=Le.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ve!==void 0&&(we=we[ve]),we){Ie.bindFramebuffer(I.FRAMEBUFFER,we);try{const Ce=w.texture,Oe=Ce.format,ke=Ce.type;if(!Ke.textureFormatReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ke.textureTypeReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-j&&W>=0&&W<=w.height-z&&I.readPixels(k,W,j,z,ze.convert(Oe),ze.convert(ke),ue)}finally{const Ce=T!==null?Le.get(T).__webglFramebuffer:null;Ie.bindFramebuffer(I.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(w,k,W,j,z,ue,ve){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=Le.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ve!==void 0&&(we=we[ve]),we){const Ce=w.texture,Oe=Ce.format,ke=Ce.type;if(!Ke.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ke.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=w.width-j&&W>=0&&W<=w.height-z){Ie.bindFramebuffer(I.FRAMEBUFFER,we);const Re=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Re),I.bufferData(I.PIXEL_PACK_BUFFER,ue.byteLength,I.STREAM_READ),I.readPixels(k,W,j,z,ze.convert(Oe),ze.convert(ke),0);const it=T!==null?Le.get(T).__webglFramebuffer:null;Ie.bindFramebuffer(I.FRAMEBUFFER,it);const ct=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await VM(I,ct,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Re),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ue),I.deleteBuffer(Re),I.deleteSync(ct),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,k=null,W=0){w.isTexture!==!0&&(ml("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,w=arguments[1]);const j=Math.pow(2,-W),z=Math.floor(w.image.width*j),ue=Math.floor(w.image.height*j),ve=k!==null?k.x:0,we=k!==null?k.y:0;R.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,ve,we,z,ue),Ie.unbindTexture()},this.copyTextureToTexture=function(w,k,W=null,j=null,z=0){w.isTexture!==!0&&(ml("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,w=arguments[1],k=arguments[2],z=arguments[3]||0,W=null);let ue,ve,we,Ce,Oe,ke;W!==null?(ue=W.max.x-W.min.x,ve=W.max.y-W.min.y,we=W.min.x,Ce=W.min.y):(ue=w.image.width,ve=w.image.height,we=0,Ce=0),j!==null?(Oe=j.x,ke=j.y):(Oe=0,ke=0);const Re=ze.convert(k.format),it=ze.convert(k.type);R.setTexture2D(k,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,k.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,k.unpackAlignment);const ct=I.getParameter(I.UNPACK_ROW_LENGTH),yt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),fn=I.getParameter(I.UNPACK_SKIP_PIXELS),Je=I.getParameter(I.UNPACK_SKIP_ROWS),Pe=I.getParameter(I.UNPACK_SKIP_IMAGES),Ot=w.isCompressedTexture?w.mipmaps[z]:w.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,Ot.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ot.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,we),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ce),w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,z,Oe,ke,ue,ve,Re,it,Ot.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,z,Oe,ke,Ot.width,Ot.height,Re,Ot.data):I.texSubImage2D(I.TEXTURE_2D,z,Oe,ke,ue,ve,Re,it,Ot),I.pixelStorei(I.UNPACK_ROW_LENGTH,ct),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,yt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,fn),I.pixelStorei(I.UNPACK_SKIP_ROWS,Je),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Pe),z===0&&k.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),Ie.unbindTexture()},this.copyTextureToTexture3D=function(w,k,W=null,j=null,z=0){w.isTexture!==!0&&(ml("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,j=arguments[1]||null,w=arguments[2],k=arguments[3],z=arguments[4]||0);let ue,ve,we,Ce,Oe,ke,Re,it,ct;const yt=w.isCompressedTexture?w.mipmaps[z]:w.image;W!==null?(ue=W.max.x-W.min.x,ve=W.max.y-W.min.y,we=W.max.z-W.min.z,Ce=W.min.x,Oe=W.min.y,ke=W.min.z):(ue=yt.width,ve=yt.height,we=yt.depth,Ce=0,Oe=0,ke=0),j!==null?(Re=j.x,it=j.y,ct=j.z):(Re=0,it=0,ct=0);const fn=ze.convert(k.format),Je=ze.convert(k.type);let Pe;if(k.isData3DTexture)R.setTexture3D(k,0),Pe=I.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)R.setTexture2DArray(k,0),Pe=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,k.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,k.unpackAlignment);const Ot=I.getParameter(I.UNPACK_ROW_LENGTH),et=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Dn=I.getParameter(I.UNPACK_SKIP_PIXELS),Ir=I.getParameter(I.UNPACK_SKIP_ROWS),dn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,yt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,yt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ce),I.pixelStorei(I.UNPACK_SKIP_ROWS,Oe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ke),w.isDataTexture||w.isData3DTexture?I.texSubImage3D(Pe,z,Re,it,ct,ue,ve,we,fn,Je,yt.data):k.isCompressedArrayTexture?I.compressedTexSubImage3D(Pe,z,Re,it,ct,ue,ve,we,fn,yt.data):I.texSubImage3D(Pe,z,Re,it,ct,ue,ve,we,fn,Je,yt),I.pixelStorei(I.UNPACK_ROW_LENGTH,Ot),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,et),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Dn),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ir),I.pixelStorei(I.UNPACK_SKIP_IMAGES,dn),z===0&&k.generateMipmaps&&I.generateMipmap(Pe),Ie.unbindTexture()},this.initRenderTarget=function(w){Le.get(w).__webglFramebuffer===void 0&&R.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?R.setTextureCube(w,0):w.isData3DTexture?R.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?R.setTexture2DArray(w,0):R.setTexture2D(w,0),Ie.unbindTexture()},this.resetState=function(){D=0,b=0,T=null,Ie.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===Rh?"display-p3":"srgb",n.unpackColorSpace=tt.workingColorSpace===Sc?"display-p3":"srgb"}}class tC extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class nC{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=yd,this.updateRanges=[],this.version=0,this.uuid=gi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=n.array[i+r];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const $t=new B;class Jl{constructor(e,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)$t.fromBufferAttribute(this,n),$t.applyMatrix4(e),this.setXYZ(n,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)$t.fromBufferAttribute(this,n),$t.applyNormalMatrix(e),this.setXYZ(n,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)$t.fromBufferAttribute(this,n),$t.transformDirection(e),this.setXYZ(n,$t.x,$t.y,$t.z);return this}getComponent(e,n){let i=this.array[e*this.data.stride+this.offset+n];return this.normalized&&(i=Hn(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=rt(i,this.array)),this.data.array[e*this.data.stride+this.offset+n]=i,this}setX(e,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=Hn(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=Hn(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=Hn(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=Hn(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=rt(n,this.array),i=rt(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(n=rt(n,this.array),i=rt(i,this.array),r=rt(r,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=rt(n,this.array),i=rt(i,this.array),r=rt(r,this.array),s=rt(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new jn(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Jl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Md extends Nr{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Zr;const ro=new B,Qr=new B,Jr=new B,es=new Ye,so=new Ye,v0=new ht,Ga=new B,oo=new B,Wa=new B,sg=new Ye,Iu=new Ye,og=new Ye;class ag extends Rt{constructor(e=new Md){if(super(),this.isSprite=!0,this.type="Sprite",Zr===void 0){Zr=new Yt;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new nC(n,5);Zr.setIndex([0,1,2,0,2,3]),Zr.setAttribute("position",new Jl(i,3,0,!1)),Zr.setAttribute("uv",new Jl(i,2,3,!1))}this.geometry=Zr,this.material=e,this.center=new Ye(.5,.5)}raycast(e,n){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Qr.setFromMatrixScale(this.matrixWorld),v0.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Jr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Qr.multiplyScalar(-Jr.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const o=this.center;ja(Ga.set(-.5,-.5,0),Jr,o,Qr,r,s),ja(oo.set(.5,-.5,0),Jr,o,Qr,r,s),ja(Wa.set(.5,.5,0),Jr,o,Qr,r,s),sg.set(0,0),Iu.set(1,0),og.set(1,1);let a=e.ray.intersectTriangle(Ga,oo,Wa,!1,ro);if(a===null&&(ja(oo.set(-.5,.5,0),Jr,o,Qr,r,s),Iu.set(0,1),a=e.ray.intersectTriangle(Ga,Wa,oo,!1,ro),a===null))return;const l=e.ray.origin.distanceTo(ro);l<e.near||l>e.far||n.push({distance:l,point:ro.clone(),uv:An.getInterpolation(ro,Ga,oo,Wa,sg,Iu,og,new Ye),face:null,object:this})}copy(e,n){return super.copy(e,n),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ja(t,e,n,i,r,s){es.subVectors(t,n).addScalar(.5).multiply(i),r!==void 0?(so.x=s*es.x-r*es.y,so.y=r*es.x+s*es.y):so.copy(es),t.copy(e),t.x+=so.x,t.y+=so.y,t.applyMatrix4(v0)}class ta extends Nr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ec=new B,tc=new B,lg=new ht,ao=new Ph,Xa=new Mc,Uu=new B,cg=new B;class Ih extends Rt{constructor(e=new Yt,n=new ta){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)ec.fromBufferAttribute(n,r-1),tc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=ec.distanceTo(tc);e.setAttribute("lineDistance",new _t(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Xa.copy(i.boundingSphere),Xa.applyMatrix4(r),Xa.radius+=s,e.ray.intersectsSphere(Xa)===!1)return;lg.copy(r).invert(),ao.copy(e.ray).applyMatrix4(lg);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,f=i.index,h=i.attributes.position;if(f!==null){const p=Math.max(0,o.start),v=Math.min(f.count,o.start+o.count);for(let y=p,m=v-1;y<m;y+=c){const u=f.getX(y),g=f.getX(y+1),_=Ya(this,e,ao,l,u,g);_&&n.push(_)}if(this.isLineLoop){const y=f.getX(v-1),m=f.getX(p),u=Ya(this,e,ao,l,y,m);u&&n.push(u)}}else{const p=Math.max(0,o.start),v=Math.min(h.count,o.start+o.count);for(let y=p,m=v-1;y<m;y+=c){const u=Ya(this,e,ao,l,y,y+1);u&&n.push(u)}if(this.isLineLoop){const y=Ya(this,e,ao,l,v-1,p);y&&n.push(y)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Ya(t,e,n,i,r,s){const o=t.geometry.attributes.position;if(ec.fromBufferAttribute(o,r),tc.fromBufferAttribute(o,s),n.distanceSqToSegment(ec,tc,Uu,cg)>i)return;Uu.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(Uu);if(!(l<e.near||l>e.far))return{distance:l,point:cg.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const ug=new B,fg=new B;class _0 extends Ih{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)ug.fromBufferAttribute(n,r),fg.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+ug.distanceTo(fg);e.setAttribute("lineDistance",new _t(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class dg extends en{constructor(e,n,i,r,s,o,a,l,c){super(e,n,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ac extends Yt{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const f=[],d=[],h=[],p=[];let v=0;const y=[],m=i/2;let u=0;g(),o===!1&&(e>0&&_(!0),n>0&&_(!1)),this.setIndex(f),this.setAttribute("position",new _t(d,3)),this.setAttribute("normal",new _t(h,3)),this.setAttribute("uv",new _t(p,2));function g(){const S=new B,D=new B;let b=0;const T=(n-e)/i;for(let C=0;C<=s;C++){const Y=[],x=C/s,E=x*(n-e)+e;for(let N=0;N<=r;N++){const H=N/r,$=H*l+a,te=Math.sin($),X=Math.cos($);D.x=E*te,D.y=-x*i+m,D.z=E*X,d.push(D.x,D.y,D.z),S.set(te,T,X).normalize(),h.push(S.x,S.y,S.z),p.push(H,1-x),Y.push(v++)}y.push(Y)}for(let C=0;C<r;C++)for(let Y=0;Y<s;Y++){const x=y[Y][C],E=y[Y+1][C],N=y[Y+1][C+1],H=y[Y][C+1];e>0&&(f.push(x,E,H),b+=3),n>0&&(f.push(E,N,H),b+=3)}c.addGroup(u,b,0),u+=b}function _(S){const D=v,b=new Ye,T=new B;let C=0;const Y=S===!0?e:n,x=S===!0?1:-1;for(let N=1;N<=r;N++)d.push(0,m*x,0),h.push(0,x,0),p.push(.5,.5),v++;const E=v;for(let N=0;N<=r;N++){const $=N/r*l+a,te=Math.cos($),X=Math.sin($);T.x=Y*X,T.y=m*x,T.z=Y*te,d.push(T.x,T.y,T.z),h.push(0,x,0),b.x=te*.5+.5,b.y=X*.5*x+.5,p.push(b.x,b.y),v++}for(let N=0;N<r;N++){const H=D+N,$=E+N;S===!0?f.push($,$+1,H):f.push($+1,$,H),C+=3}c.addGroup(u,C,S===!0?1:2),u+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ac(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Uh extends Ac{constructor(e=1,n=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,n,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Uh(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class nc extends Yt{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const f=[],d=new B,h=new B,p=[],v=[],y=[],m=[];for(let u=0;u<=i;u++){const g=[],_=u/i;let S=0;u===0&&o===0?S=.5/n:u===i&&l===Math.PI&&(S=-.5/n);for(let D=0;D<=n;D++){const b=D/n;d.x=-e*Math.cos(r+b*s)*Math.sin(o+_*a),d.y=e*Math.cos(o+_*a),d.z=e*Math.sin(r+b*s)*Math.sin(o+_*a),v.push(d.x,d.y,d.z),h.copy(d).normalize(),y.push(h.x,h.y,h.z),m.push(b+S,1-_),g.push(c++)}f.push(g)}for(let u=0;u<i;u++)for(let g=0;g<n;g++){const _=f[u][g+1],S=f[u][g],D=f[u+1][g],b=f[u+1][g+1];(u!==0||o>0)&&p.push(_,S,b),(u!==i-1||l<Math.PI)&&p.push(S,D,b)}this.setIndex(p),this.setAttribute("position",new _t(v,3)),this.setAttribute("normal",new _t(y,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Fh extends Yt{constructor(e=1,n=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],f=new B,d=new B,h=new B;for(let p=0;p<=i;p++)for(let v=0;v<=r;v++){const y=v/r*s,m=p/i*Math.PI*2;d.x=(e+n*Math.cos(m))*Math.cos(y),d.y=(e+n*Math.cos(m))*Math.sin(y),d.z=n*Math.sin(m),a.push(d.x,d.y,d.z),f.x=e*Math.cos(y),f.y=e*Math.sin(y),h.subVectors(d,f).normalize(),l.push(h.x,h.y,h.z),c.push(v/r),c.push(p/i)}for(let p=1;p<=i;p++)for(let v=1;v<=r;v++){const y=(r+1)*p+v-1,m=(r+1)*(p-1)+v-1,u=(r+1)*(p-1)+v,g=(r+1)*p+v;o.push(y,m,g),o.push(m,u,g)}this.setIndex(o),this.setAttribute("position",new _t(a,3)),this.setAttribute("normal",new _t(l,3)),this.setAttribute("uv",new _t(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fh(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Fu extends Nr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=J_,this.normalScale=new Ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class iC extends ta{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class x0 extends Rt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class rC extends x0{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xe(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const Ou=new ht,hg=new B,pg=new B;class sC{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ye(512,512),this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Dh,this._frameExtents=new Ye(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;hg.setFromMatrixPosition(e.matrixWorld),n.position.copy(hg),pg.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(pg),n.updateMatrixWorld(),Ou.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ou),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ou)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class oC extends sC{constructor(){super(new f0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class aC extends x0{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new oC}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class lC{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=mg(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=mg();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function mg(){return performance.now()}const gg=new ht;class cC{constructor(e,n,i=0,r=1/0){this.ray=new Ph(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Lh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return gg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gg),this}intersectObject(e,n=!0,i=[]){return Ed(e,this,i,n),i.sort(vg),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Ed(e[r],this,i,n);return i.sort(vg),i}}function vg(t,e){return t.distance-e.distance}function Ed(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let o=0,a=s.length;o<a;o++)Ed(s[o],e,n,!0)}}class uC extends _0{constructor(e=10,n=10,i=4473924,r=8947848){i=new Xe(i),r=new Xe(r);const s=n/2,o=e/n,a=e/2,l=[],c=[];for(let h=0,p=0,v=-a;h<=n;h++,v+=o){l.push(-a,0,v,a,0,v),l.push(v,0,-a,v,0,a);const y=h===s?i:r;y.toArray(c,p),p+=3,y.toArray(c,p),p+=3,y.toArray(c,p),p+=3,y.toArray(c,p),p+=3}const f=new Yt;f.setAttribute("position",new _t(l,3)),f.setAttribute("color",new _t(c,3));const d=new ta({vertexColors:!0,toneMapped:!1});super(f,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const _g=new B;let $a,ku;class fC extends Rt{constructor(e=new B(0,0,1),n=new B(0,0,0),i=1,r=16776960,s=i*.2,o=s*.2){super(),this.type="ArrowHelper",$a===void 0&&($a=new Yt,$a.setAttribute("position",new _t([0,0,0,0,1,0],3)),ku=new Ac(0,.5,1,5,1),ku.translate(0,-.5,0)),this.position.copy(n),this.line=new Ih($a,new ta({color:r,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Qt(ku,new Ec({color:r,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(i,s,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{_g.set(e.z,0,-e.x).normalize();const n=Math.acos(e.y);this.quaternion.setFromAxisAngle(_g,n)}}setLength(e,n=e*.2,i=n*.2){this.line.scale.set(1,Math.max(1e-4,e-n),1),this.line.updateMatrix(),this.cone.scale.set(i,n,i),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class dC extends _0{constructor(e=1){const n=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new Yt;r.setAttribute("position",new _t(n,3)),r.setAttribute("color",new _t(i,3));const s=new ta({vertexColors:!0,toneMapped:!1});super(r,s),this.type="AxesHelper"}setColors(e,n,i){const r=new Xe,s=this.geometry.attributes.color.array;return r.set(e),r.toArray(s,0),r.toArray(s,3),r.set(n),r.toArray(s,6),r.toArray(s,9),r.set(i),r.toArray(s,12),r.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sh);function hC(t,e){const n=new tC;n.background=new Xe("#0e1116");const i=new Tn(55,1,.05,200),r=new B(0,11.5,13.5);i.position.copy(r),i.lookAt(0,0,0);const s=new eC({antialias:!0});s.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.shadowMap.enabled=!0,s.shadowMap.type=B_,t.appendChild(s.domElement);const o=new rC(12571903,2105384,1.1);n.add(o);const a=new aC(16777215,1.4);a.position.set(6,12,8),a.castShadow=!0,a.shadow.mapSize.set(1024,1024),a.shadow.camera.left=-15,a.shadow.camera.right=15,a.shadow.camera.top=15,a.shadow.camera.bottom=-15,n.add(a);const l=12,c=new uC(l*2,l*2,3818066,2238515);c.material.transparent=!0,c.material.opacity=.55,n.add(c);const f=(Z,Q)=>{const ge=document.createElement("canvas");ge.width=256,ge.height=128;const de=ge.getContext("2d");de.fillStyle=Q,de.font="bold 56px system-ui, sans-serif",de.textAlign="center",de.textBaseline="middle",de.fillText(Z,128,64);const he=new dg(ge),Te=new Md({map:he,transparent:!0,depthTest:!1});return new ag(Te)},d=(Z,Q,ge="#8fa3bf")=>{const de=f(Z,ge);de.position.set(Q.x,Q.y,Q.z),de.scale.set(2.2,1.1,1),n.add(de)};d("前 -Z",{x:0,y:.2,z:-l+1},"#7fd1ff"),d("后 +Z",{x:0,y:.2,z:l-1},"#ffb37f"),d("左 -X",{x:-l+1,y:.2,z:0}),d("右 +X",{x:l-1,y:.2,z:0});const h=new dC(1.2);h.position.set(-l+.6,.02,l-.6),n.add(h);const p=new ms,v=new Uh(.32,.9,24);v.rotateX(-Math.PI/2);const y=new Fu({color:16777215,emissive:2241348}),m=new Qt(v,y);m.position.z=-.15,m.castShadow=!0,p.add(m);const u=new Qt(new nc(.28,24,16),new Fu({color:14674165}));u.position.set(0,.42,.1),u.castShadow=!0,p.add(u);const g=new Yt().setFromPoints([new B(0,.32,-.5),new B(0,.32,-2.2)]),_=new Ih(g,new iC({color:8376831,dashSize:.2,gapSize:.15}));_.computeLineDistances(),p.add(_),n.add(p);const S=new Map;function D(Z,Q){const ge=document.createElement("canvas");ge.width=512,ge.height=128;const de=ge.getContext("2d");de.clearRect(0,0,512,128),de.font="bold 44px system-ui, sans-serif",de.textAlign="center",de.textBaseline="middle",de.lineWidth=8,de.strokeStyle="rgba(0,0,0,0.65)",de.strokeText(Z,256,56),de.fillStyle=Q,de.fillText(Z,256,56);const he=new dg(ge),Te=new ag(new Md({map:he,transparent:!0,depthTest:!1}));return Te.scale.set(2.6,.65,1),Te}function b(Z){const Q=new ms,ge=new Xe(Z.color),de=new Qt(new nc(.3,24,16),new Fu({color:ge,emissive:ge.clone().multiplyScalar(.35),roughness:.4}));de.position.y=.3,de.castShadow=!0,Q.add(de);const he=new Qt(new Fh(.46,.03,10,40),new Ec({color:16777215,transparent:!0,opacity:.9}));he.rotation.x=Math.PI/2,he.position.y=.05,he.visible=!1,Q.add(he);const Te=new fC(new B(1,0,0),new B(0,.3,0),.7,Z.color,.18,.11);Te.visible=!1,Q.add(Te);const He=D(Z.name,Z.color);return He.position.y=.95,Q.add(He),Q.position.set(Z.position.x,Z.position.y,Z.position.z),Q.userData.trackId=Z.id,n.add(Q),{group:Q,sphere:de,ring:he,label:He,orientArrow:Te,trackId:Z.id}}function T(Z){n.remove(Z.group),Z.group.traverse(Q=>{if(Q instanceof Qt){Q.geometry.dispose();const ge=Q.material;Array.isArray(ge)?ge.forEach(de=>de.dispose()):ge.dispose()}})}const C=new cC,Y=new Ye,x=new Ii(new B(0,1,0),0),E=new B;let N=null,H=null;function $(Z){const Q=s.domElement.getBoundingClientRect();Y.x=(Z.clientX-Q.left)/Q.width*2-1,Y.y=-((Z.clientY-Q.top)/Q.height)*2+1}function te(Z){$(Z),C.setFromCamera(Y,i);const Q=[...S.values()].map(he=>he.sphere),ge=C.intersectObjects(Q,!1)[0];if(ge){const he=[...S.values()].find(Te=>Te.sphere===ge.object);if(!he)return;N={kind:"source",trackId:he.trackId,pointerId:Z.pointerId,planeY:he.group.position.y},x.constant=-N.planeY,s.domElement.setPointerCapture(Z.pointerId),e.onSelectSource(he.trackId),H={x:Z.clientX,y:Z.clientY};return}C.intersectObjects([m,u],!1)[0]&&(N={kind:"listener",pointerId:Z.pointerId,planeY:p.position.y},x.constant=-N.planeY,s.domElement.setPointerCapture(Z.pointerId),e.onSelectSource(null),H={x:Z.clientX,y:Z.clientY})}function X(Z){if(!(!N||Z.pointerId!==N.pointerId)&&($(Z),C.setFromCamera(Y,i),C.ray.intersectPlane(x,E))){const Q=vm.clamp(E.x,-l,l),ge=vm.clamp(E.z,-l,l);N.kind==="source"&&N.trackId?e.onMoveSource(N.trackId,{x:Q,y:N.planeY,z:ge}):N.kind==="listener"&&e.onMoveListener({x:Q,y:N.planeY,z:ge})}}function q(Z){if(N&&Z.pointerId===N.pointerId){try{s.domElement.releasePointerCapture(Z.pointerId)}catch{}N=null}}function U(Z){if(H&&Math.hypot(Z.clientX-H.x,Z.clientY-H.y)>4)return;$(Z),C.setFromCamera(Y,i),C.intersectObjects([...[...S.values()].map(ge=>ge.sphere),m,u],!1)[0]||e.onSelectSource(null),H=null}s.domElement.addEventListener("pointerdown",te),s.domElement.addEventListener("pointermove",X),s.domElement.addEventListener("pointerup",q),s.domElement.addEventListener("pointercancel",q),s.domElement.addEventListener("click",U);function J(){const Z=t.clientWidth,Q=t.clientHeight;Z===0||Q===0||(s.setSize(Z,Q,!1),i.aspect=Z/Q,i.updateProjectionMatrix())}const ie=new ResizeObserver(J);ie.observe(t),J();let ce=0;const be=new lC;function Be(){ce=requestAnimationFrame(Be);const Z=be.getElapsedTime();for(const Q of S.values())Q.ring.visible&&(Q.ring.rotation.z=Z*.8);s.render(n,i)}Be();let K=null;function oe(Z,Q,ge){const de=new Set(Z.map(he=>he.id));for(const[he,Te]of[...S.entries()])de.has(he)||(T(Te),S.delete(he));for(const he of Z){let Te=S.get(he.id);Te||(Te=b(he),S.set(he.id,Te)),Te.group.position.set(he.position.x,he.position.y,he.position.z),Te.ring.visible=he.id===ge;const He=new Xe(he.color),I=he.muted;Te.sphere.material.color.set(I?5593699:he.color),Te.sphere.material.emissive.set(I?0:He.clone().multiplyScalar(.35));const pt=he.effectiveOrientation;if(pt){const Ve=Math.hypot(pt.x,pt.y,pt.z);Ve>1e-6?(Te.orientArrow.visible=!0,Te.orientArrow.position.set(0,.3,0),Te.orientArrow.setDirection(new B(pt.x/Ve,pt.y/Ve,pt.z/Ve)),Te.orientArrow.line.material.color.set(I?5593699:he.color)):Te.orientArrow.visible=!1}else Te.orientArrow.visible=!1}(!K||Q!==K)&&(p.position.set(Q.position.x,Q.position.y,Q.position.z),p.rotation.order="YXZ",p.rotation.y=-Q.yaw,p.rotation.x=Q.pitch,Ko(Q.yaw,Q.pitch),K=Q)}return{destroy(){cancelAnimationFrame(ce),ie.disconnect(),s.domElement.removeEventListener("pointerdown",te),s.domElement.removeEventListener("pointermove",X),s.domElement.removeEventListener("pointerup",q),s.domElement.removeEventListener("pointercancel",q),s.domElement.removeEventListener("click",U);for(const Z of S.values())T(Z);s.dispose(),s.domElement.remove()},sync:oe}}function pC({api:t,tracks:e,onMoveSource:n,onMoveListener:i}){const r=se.useRef(null),s=se.useRef(null);return se.useEffect(()=>{if(r.current)return s.current=hC(r.current,{onSelectSource:t.selectTrack,onMoveSource:n,onMoveListener:i}),()=>{var o;(o=s.current)==null||o.destroy(),s.current=null}},[]),se.useEffect(()=>{var o;(o=s.current)==null||o.sync(e,t.doc.listener,t.selectedId)},[e,t.doc.listener,t.selectedId]),P.jsx("div",{className:"scene3d",ref:r})}function mC({tracks:t,listener:e,selectedId:n,onSelect:i,onMoveSource:r,onMoveListener:s,onRotateListener:o}){const a=se.useRef(null),[l,c]=se.useState(null),f=10,d=520,h=d/(f*2),p=C=>d/2+C*h,v=C=>d/2+C*h,y=se.useCallback(C=>{const x=a.current.getBoundingClientRect(),E=(C.clientX-x.left)/x.width*d,N=(C.clientY-x.top)/x.height*d;return{x:(E-d/2)/h,z:(N-d/2)/h}},[h]);se.useEffect(()=>{if(!l)return;const C=x=>{const E=y(x),N=H=>Math.max(-f,Math.min(f,H));if(l.kind==="source"){const H=t.find($=>$.id===l.id);r(l.id,{x:N(E.x),y:(H==null?void 0:H.position.y)??0,z:N(E.z)})}else if(l.kind==="listener")s({x:N(E.x),y:e.position.y,z:N(E.z)});else if(l.kind==="rotate"){const H=E.x-e.position.x,$=E.z-e.position.z,te=Math.atan2(H,-$);o(te)}},Y=()=>c(null);return window.addEventListener("pointermove",C),window.addEventListener("pointerup",Y),()=>{window.removeEventListener("pointermove",C),window.removeEventListener("pointerup",Y)}},[l,y,t,r,s,o,e.position]);const m=Ko(e.yaw,0),u=_h(e.yaw),g=e.position,_={x:g.x+m.x*.8,z:g.z+m.z*.8},S={x:g.x-m.x*.45+u.x*.42,z:g.z-m.z*.45+u.z*.42},D={x:g.x-m.x*.45-u.x*.42,z:g.z-m.z*.45-u.z*.42},b={x:g.x+m.x*1.5,z:g.z+m.z*1.5},T=[];for(let C=-f;C<=f;C+=2)T.push(P.jsx("line",{x1:p(C),y1:0,x2:p(C),y2:d,stroke:"#222a36",strokeWidth:1},`v${C}`)),T.push(P.jsx("line",{x1:0,y1:v(C),x2:d,y2:v(C),stroke:"#222a36",strokeWidth:1},`h${C}`));return P.jsxs("div",{className:"plan2d",children:[P.jsxs("svg",{ref:a,viewBox:`0 0 ${d} ${d}`,className:"plan-svg",onPointerDown:C=>{C.target===a.current&&i(null)},children:[T,P.jsx("rect",{x:0,y:0,width:d,height:d/2,fill:"rgba(127,209,255,0.05)"}),P.jsx("text",{x:d/2,y:18,textAnchor:"middle",className:"plan-axis-label front",children:"前 · -Z"}),P.jsx("text",{x:d/2,y:d-6,textAnchor:"middle",className:"plan-axis-label back",children:"后 · +Z"}),P.jsx("text",{x:10,y:d/2,className:"plan-axis-label",children:"左 -X"}),P.jsx("text",{x:d-10,y:d/2,textAnchor:"end",className:"plan-axis-label",children:"右 +X"}),P.jsx("line",{x1:d/2,y1:d/2,x2:p(g.x),y2:v(g.z),stroke:"#2c3647",strokeDasharray:"4 4"}),t.map(C=>{const Y=C.id===n,x=C.effectiveOrientation,E=x?Math.hypot(x.x,x.z):0;return P.jsxs("g",{className:"plan-source",onPointerDown:N=>{N.stopPropagation(),i(C.id),c({kind:"source",id:C.id})},children:[Y&&P.jsx("circle",{cx:p(C.position.x),cy:v(C.position.z),r:14,fill:"none",stroke:"#fff",strokeWidth:1.5}),x&&E>1e-6&&P.jsx("line",{x1:p(C.position.x),y1:v(C.position.z),x2:p(C.position.x+x.x/E*.7),y2:v(C.position.z+x.z/E*.7),stroke:C.muted?"#555a63":C.color,strokeWidth:2,strokeDasharray:"3 3",opacity:.85}),P.jsx("circle",{cx:p(C.position.x),cy:v(C.position.z),r:9,fill:C.muted?"#555a63":C.color,stroke:C.solo?"#ffe066":"rgba(0,0,0,0.4)",strokeWidth:C.solo?2.5:1}),P.jsx("text",{x:p(C.position.x),y:v(C.position.z)-14,textAnchor:"middle",className:"plan-source-label",fill:C.muted?"#8a909c":C.color,children:C.name.length>10?`${C.name.slice(0,10)}…`:C.name})]},C.id)}),P.jsx("g",{onPointerDown:C=>{C.stopPropagation(),i(null),c({kind:"listener"})},className:"plan-listener",children:P.jsx("polygon",{points:`${p(_.x)},${v(_.z)} ${p(S.x)},${v(S.z)} ${p(D.x)},${v(D.z)}`,fill:"#e6edf7",stroke:"#7fd1ff",strokeWidth:1.5})}),P.jsx("circle",{cx:p(b.x),cy:v(b.z),r:7,fill:"none",stroke:"#7fd1ff",strokeWidth:2,className:"plan-rotate-handle",onPointerDown:C=>{C.stopPropagation(),c({kind:"rotate"})}})]}),P.jsx("div",{className:"plan-hint",children:"拖动彩色圆点移动声源 · 拖动白色三角移动听者 · 拖蓝色圆环手柄旋转朝向"})]})}function xg(t){return`${t.toFixed(2)}s`}function gC({track:t,playhead:e,currentPosition:n,currentGain:i,api:r}){const s=t.automation,[o,a]=se.useState(null),[l,c]=se.useState(!1),f=se.useRef(null),d=t.duration&&t.duration>0?Math.max(t.duration,If(s)):Math.max(1,If(s)),h=Math.max(d,.5);se.useEffect(()=>{o&&!s.keyframes.some(u=>u.id===o)&&a(null)},[s.keyframes,o]);const p=u=>`${Math.min(100,Math.max(0,u/h*100))}%`,v=u=>r.addAutomationKeyframe(t.id,Math.max(0,Math.round(u*1e3)/1e3),{position:{...n},gain:i}),y=u=>{if(!f.current)return;const g=f.current.getBoundingClientRect(),_=(u.clientX-g.left)/g.width*h;v(_)},m=s.keyframes.find(u=>u.id===o)??null;return P.jsxs("div",{className:"automation-panel",children:[P.jsxs("div",{className:"automation-head",children:[P.jsxs("button",{className:"btn mini ghost",onClick:()=>c(u=>!u),title:"展开/收起空间自动化轨",children:[l?"▾":"▸"," 空间自动化"]}),P.jsxs("span",{className:"muted small",children:[s.keyframes.length," 帧 · v",s.revision]}),l&&P.jsxs(P.Fragment,{children:[P.jsx("button",{className:"btn mini",onClick:()=>v(r.playingIds.has(t.id)?e:0),title:"在当前播放头（未播放时为 0）以当前位置/增益添加关键帧",children:"＋ 此处"}),P.jsx("button",{className:"btn mini",disabled:!r.canUndoAutomation,onClick:()=>r.undoAutomation(),title:"撤销上一次自动化编辑",children:"↶ 撤销"}),P.jsx("button",{className:"btn mini",disabled:!r.canRedoAutomation,onClick:()=>r.redoAutomation(),title:"重做",children:"↷"}),P.jsx("button",{className:"btn mini ghost danger",disabled:s.keyframes.length===0,onClick:()=>{confirm("清空该轨全部关键帧？（可撤销）")&&(r.clearAutomation(t.id),a(null))},children:"清空"})]})]}),l&&P.jsxs(P.Fragment,{children:[r.automationError&&t.id===r.selectedId&&P.jsxs("div",{className:"automation-error",children:["⚠ ",r.automationError]}),P.jsxs("div",{ref:f,className:"automation-strip",onClick:y,title:"点击空白处在该时间以当前位置/增益添加关键帧",children:[s.keyframes.map(u=>P.jsx("button",{className:`automation-kf ${o===u.id?"selected":""}`,style:{left:p(u.time)},title:`${xg(u.time)} · ${u.id.slice(-5)}`,onClick:g=>{g.stopPropagation(),a(u.id),r.selectTrack(t.id)}},u.id)),r.playingIds.has(t.id)&&P.jsx("div",{className:"automation-playhead",style:{left:p(e)}})]}),P.jsxs("div",{className:"automation-hint small muted",children:["点击时间轴添加关键帧（工程相对时间 ",xg(h)," 量程）",r.playingIds.has(t.id)?" · 播放中拖拽声源/推子为临时覆盖，可取消或提交为新关键帧":""]}),m&&P.jsx(vC,{track:t,kf:m,api:r,onClose:()=>a(null)},m.id)]})]})}function vC({track:t,kf:e,api:n,onClose:i}){const r=!!e.params.position,s=e.params.gain!==void 0,o=!!e.params.orientation,a=(l,c)=>{n.updateAutomationKeyframe(t.id,e.id,{time:c})};return P.jsxs("div",{className:"kf-editor",onClick:l=>l.stopPropagation(),children:[P.jsxs("div",{className:"kf-editor-row",children:[P.jsxs("label",{className:"kf-field",children:[P.jsx("span",{children:"时间"}),P.jsx("input",{type:"number",min:0,step:.05,defaultValue:Number(e.time.toFixed(3)),onBlur:l=>{const c=Number(l.target.value);Number.isFinite(c)&&Math.abs(c-e.time)>1e-6&&a("time",c)},onKeyDown:l=>{l.key==="Enter"&&l.target.blur()}})]}),P.jsxs("span",{className:"muted small",children:["id …",e.id.slice(-6)]}),P.jsx("button",{className:"btn mini ghost danger",onClick:()=>{n.removeAutomationKeyframe(t.id,e.id),i()},children:"删帧"})]}),r&&P.jsx("div",{className:"kf-editor-row",children:["x","y","z"].map(l=>P.jsxs("label",{className:"kf-field",children:[P.jsxs("span",{children:["位置 ",l.toUpperCase()]}),P.jsx("input",{type:"number",step:.1,defaultValue:Number(e.params.position[l].toFixed(3)),onBlur:c=>{const f=Number(c.target.value);Number.isFinite(f)&&n.updateAutomationKeyframe(t.id,e.id,{patch:!0,params:{position:{...e.params.position,[l]:f}}})}})]},l))}),s&&P.jsx("div",{className:"kf-editor-row",children:P.jsxs("label",{className:"kf-field grow",children:[P.jsx("span",{children:"增益 0..1.5"}),P.jsx("input",{type:"number",min:0,max:1.5,step:.01,defaultValue:Number(e.params.gain.toFixed(3)),onBlur:l=>{const c=Number(l.target.value);Number.isFinite(c)&&n.updateAutomationKeyframe(t.id,e.id,{patch:!0,params:{gain:c}})}})]})}),o&&P.jsx("div",{className:"kf-editor-row",children:["x","y","z"].map(l=>P.jsxs("label",{className:"kf-field",children:[P.jsxs("span",{children:["朝向 ",l.toUpperCase()]}),P.jsx("input",{type:"number",step:.1,defaultValue:Number(e.params.orientation[l].toFixed(3)),onBlur:c=>{const f=Number(c.target.value);Number.isFinite(f)&&n.updateAutomationKeyframe(t.id,e.id,{patch:!0,params:{orientation:{...e.params.orientation,[l]:f}}})}})]},l))})]})}function yg(t){if(t==null||!isFinite(t))return"--:--";const e=Math.floor(t/60),n=Math.floor(t%60);return`${e}:${n.toString().padStart(2,"0")}`}function _C({track:t,api:e}){const{doc:n,playingIds:i,displayTracks:r}=e,s=i.has(t.id),o=e.overrideIds.has(t.id),a=r.find(u=>u.id===t.id)??t,[l,c]=se.useState(0),f=n.listener,d=n.spatial;se.useEffect(()=>{if(!s){c(Me.getProgress(t.id)??0);return}let u=0;const g=()=>{c(Me.getProgress(t.id)??0),u=requestAnimationFrame(g)};return u=requestAnimationFrame(g),()=>cancelAnimationFrame(u)},[s,t.id]);const h=nS(a.position,f),p=iS(a.position,f.position),v=rS(a.position,f.position),y=oS(p,d.distanceModel,d.refDistance,d.rolloffFactor,d.maxDistance),m=t.status==="decode-error"?"解码失败":t.status==="loading"?"解码中…":t.status==="pending"&&e.unlock==="locked"?"待解锁":"就绪";return P.jsxs("div",{className:`track-row ${e.selectedId===t.id?"selected":""}`,children:[P.jsxs("div",{className:"track-head",children:[P.jsx("span",{className:"track-color",style:{background:t.muted?"#555a63":t.color}}),P.jsx("button",{className:"track-name",onClick:()=>e.selectTrack(e.selectedId===t.id?null:t.id),title:t.originalFileName??t.name,children:t.name}),P.jsx("span",{className:`track-status ${t.status==="decode-error"?"error":""}`,children:m})]}),t.status==="decode-error"&&P.jsxs("div",{className:"track-error",title:t.errorMessage,children:["⚠ ",t.errorMessage??"解码失败"]}),o&&P.jsxs("div",{className:"override-banner",children:[P.jsx("span",{children:"✋ 临时覆盖中：计划自动化已暂停，未改动关键帧"}),P.jsxs("span",{className:"override-actions",children:[P.jsx("button",{className:"btn mini",onClick:()=>e.cancelOverride(t.id),title:"取消拖拽改动，回到当前播放头的计划位置",children:"取消（回轨迹）"}),P.jsx("button",{className:"btn mini primary",onClick:()=>e.commitOverride(t.id),title:"在当前播放头提交为新关键帧（同刻冲突会被拒绝）",children:"提交为关键帧"})]})]}),P.jsxs("div",{className:"track-transport",children:[P.jsx("button",{className:"btn small",onClick:()=>e.togglePlay(t.id),disabled:t.status==="decode-error",title:s?"暂停":"播放",children:s?"⏸":"▶"}),P.jsx("button",{className:"btn small",onClick:()=>e.stop(t.id),title:"停止",children:"⏹"}),P.jsxs("label",{className:"loop-toggle",title:"循环",children:[P.jsx("input",{type:"checkbox",checked:t.loop,onChange:u=>e.updateTrack(t.id,{loop:u.target.checked})}),"循环"]}),P.jsx("button",{className:`btn small ${t.muted?"active":""}`,onClick:()=>e.updateTrack(t.id,{muted:!t.muted}),children:"M"}),P.jsx("button",{className:`btn small ${t.solo?"solo":""}`,onClick:()=>e.updateTrack(t.id,{solo:!t.solo}),children:"S"}),P.jsx("button",{className:"btn small ghost danger",onClick:()=>e.removeTrack(t.id),title:"删除",children:"✕"})]}),P.jsxs("div",{className:"track-gain",children:[P.jsx("input",{type:"range",min:0,max:1.5,step:.01,value:a.gain,onChange:u=>e.updateTrack(t.id,{gain:Number(u.target.value)})}),P.jsx("span",{className:"gain-readout",children:Hl(t.muted?0:a.gain)}),t.automation.keyframes.length>0&&P.jsx("span",{className:"auto-badge",title:"该轨存在增益/空间自动化",children:"AUTO"})]}),P.jsxs("div",{className:"track-progress",onClick:u=>{if(t.duration==null)return;const g=u.currentTarget.getBoundingClientRect(),_=(u.clientX-g.left)/g.width;e.seek(t.id,_*t.duration)},children:[P.jsx("div",{className:"track-progress-fill",style:{width:`${t.duration?l/t.duration*100:0}%`}}),P.jsxs("span",{className:"track-time",children:[yg(l)," / ",yg(t.duration??null)]})]}),P.jsxs("div",{className:"track-spatial-readout",children:[P.jsx("span",{className:h>0?"side-r":h<0?"side-l":"",children:sS(h)}),P.jsxs("span",{children:[p.toFixed(2)," m"]}),P.jsxs("span",{children:["仰角 ",v.toFixed(0),"°"]}),P.jsxs("span",{title:"距离模型造成的理论衰减（真实衰减由 PannerNode 执行）",children:["距离增益 ",Hl(y)]})]}),t.channels&&t.channels>1?P.jsxs("div",{className:"track-channel",children:["输入声道：",Array.from({length:t.channels}).map((u,g)=>P.jsx("button",{className:`btn mini ${t.channel===g?"active":""}`,onClick:()=>e.updateTrack(t.id,{channel:g}),title:g===0?"文件原始左声道 L":g===1?"文件原始右声道 R":`声道 ${g+1}`,children:g===0?"L（原始左）":g===1?"R（原始右）":`CH${g+1}`},g))]}):null,P.jsx(gC,{track:t,playhead:l,currentPosition:a.position,currentGain:a.gain,api:e})]})}function zu({label:t,value:e,step:n=.1,onChange:i,hint:r}){return P.jsxs("label",{className:"num-field",title:r,children:[P.jsx("span",{children:t}),P.jsx("input",{type:"number",step:n,value:Number.isFinite(e)?Number(e.toFixed(3)):0,onChange:s=>i(Number(s.target.value))})]})}function xC({api:t}){const e=t.doc.tracks.find(i=>i.id===t.selectedId);if(!e)return P.jsxs("div",{className:"panel inspector empty",children:[P.jsx("p",{children:"在 3D 场景或 2D 俯视图中点击一个声源以编辑精确坐标。"}),P.jsxs("p",{className:"muted",children:["坐标约定：",P.jsx("b",{children:"+X 右"}),"、",P.jsx("b",{children:"+Y 上"}),"、",P.jsx("b",{children:"+Z 后"}),"；听者 yaw=0 时朝向 ",P.jsx("b",{children:"-Z（前方）"}),"。 声源在听者右侧时右耳更响。"]})]});const n=i=>t.moveTrack(e.id,{...e.position,...i});return P.jsxs("div",{className:"panel inspector",children:[P.jsxs("div",{className:"panel-title",children:[P.jsx("span",{className:"track-color",style:{background:e.color}}),"声源参数 · ",e.name]}),P.jsxs("div",{className:"num-grid",children:[P.jsx(zu,{label:"X 右 (m)",value:e.position.x,onChange:i=>n({x:i})}),P.jsx(zu,{label:"Y 上 (m)",value:e.position.y,onChange:i=>n({y:i})}),P.jsx(zu,{label:"Z 后 (m)",value:e.position.z,onChange:i=>n({z:i})})]}),P.jsxs("label",{className:"num-field wide",children:[P.jsx("span",{children:"名称"}),P.jsx("input",{type:"text",value:e.name,onChange:i=>t.updateTrack(e.id,{name:i.target.value})})]})]})}function yC({api:t}){const e=t.doc.listener,n=Ko(e.yaw,e.pitch),i=_h(e.yaw),r=tS(e.yaw),s=e.pitch*180/Math.PI;return P.jsxs("div",{className:"panel",children:[P.jsx("div",{className:"panel-title",children:"听者（头相关位置）"}),P.jsxs("div",{className:"num-grid",children:[P.jsxs("label",{className:"num-field",children:[P.jsx("span",{children:"X (m)"}),P.jsx("input",{type:"number",step:.1,value:Number(e.position.x.toFixed(3)),onChange:o=>t.setListener({position:{x:Number(o.target.value)}})})]}),P.jsxs("label",{className:"num-field",children:[P.jsx("span",{children:"Y (m)"}),P.jsx("input",{type:"number",step:.1,value:Number(e.position.y.toFixed(3)),onChange:o=>t.setListener({position:{y:Number(o.target.value)}})})]}),P.jsxs("label",{className:"num-field",children:[P.jsx("span",{children:"Z (m)"}),P.jsx("input",{type:"number",step:.1,value:Number(e.position.z.toFixed(3)),onChange:o=>t.setListener({position:{z:Number(o.target.value)}})})]})]}),P.jsxs("label",{className:"slider-field",children:[P.jsxs("span",{children:["偏航 yaw ",P.jsxs("b",{children:[r.toFixed(0),"°"]}),P.jsx("em",{className:"muted",children:"（0° 朝 -Z，+90° 朝 +X 即右转）"})]}),P.jsx("input",{type:"range",min:-180,max:180,step:1,value:Math.round(r>180?r-360:r),onChange:o=>t.setListener({yaw:Number(o.target.value)*Math.PI/180})})]}),P.jsxs("label",{className:"slider-field",children:[P.jsxs("span",{children:["俯仰 pitch ",P.jsxs("b",{children:[s.toFixed(0),"°"]}),P.jsx("em",{className:"muted",children:"（正为向上）"})]}),P.jsx("input",{type:"range",min:-60,max:60,step:1,value:Math.round(s),onChange:o=>t.setListener({pitch:Number(o.target.value)*Math.PI/180})})]}),P.jsxs("div",{className:"listener-vec muted",children:[P.jsxs("span",{children:["前方 (",n.x.toFixed(2),", ",n.y.toFixed(2),", ",n.z.toFixed(2),")"]}),P.jsxs("span",{children:["右方 (",i.x.toFixed(2),", ",i.y.toFixed(2),", ",i.z.toFixed(2),")"]})]}),P.jsxs("div",{className:"listener-actions",children:[P.jsx("button",{className:"btn small",onClick:()=>{t.setListener({yaw:0,pitch:0})},children:"朝向归零"}),P.jsx("button",{className:"btn small",onClick:()=>t.setListener({position:{x:0,y:0,z:3}}),children:"位置归位"}),P.jsx("button",{className:"btn small",onClick:()=>t.setListener({yaw:e.yaw-Math.PI/12}),children:"↺ 左转 15°"}),P.jsx("button",{className:"btn small",onClick:()=>t.setListener({yaw:e.yaw+Math.PI/12}),children:"右转 15° ↻"})]})]})}const Sg=[{value:"inverse",label:"inverse 反距离",formula:"g = refDistance / (refDistance + rolloff · max(d − ref, 0))"},{value:"linear",label:"linear 线性",formula:"g = 1 − rolloff · (d − ref) / (max − ref)"},{value:"exponential",label:"exponential 指数",formula:"g = (max(d, ref) / ref) ^ (−rolloff)"}];function SC({api:t}){const e=t.doc.spatial,n=Sg.find(i=>i.value===e.distanceModel);return P.jsxs("div",{className:"panel",children:[P.jsx("div",{className:"panel-title",children:"HRTF 与距离衰减"}),P.jsxs("label",{className:"num-field wide",children:[P.jsx("span",{children:"距离模型（PannerNode.distanceModel）"}),P.jsx("select",{value:e.distanceModel,onChange:i=>t.setSpatial({distanceModel:i.target.value}),children:Sg.map(i=>P.jsx("option",{value:i.value,children:i.label},i.value))})]}),P.jsx("div",{className:"formula muted",children:n.formula}),P.jsxs("div",{className:"num-grid three",children:[P.jsxs("label",{className:"num-field",children:[P.jsx("span",{children:"refDistance (m)"}),P.jsx("input",{type:"number",min:.01,step:.1,value:e.refDistance,onChange:i=>t.setSpatial({refDistance:Math.max(.01,Number(i.target.value))})})]}),P.jsxs("label",{className:"num-field",children:[P.jsx("span",{children:"rolloffFactor"}),P.jsx("input",{type:"number",min:0,step:.05,value:e.rolloffFactor,onChange:i=>t.setSpatial({rolloffFactor:Math.max(0,Number(i.target.value))})})]}),P.jsxs("label",{className:"num-field",children:[P.jsx("span",{children:"maxDistance (m)"}),P.jsx("input",{type:"number",min:.01,step:1,value:e.maxDistance,onChange:i=>t.setSpatial({maxDistance:Math.max(.01,Number(i.target.value))})})]})]}),P.jsxs("label",{className:"slider-field",children:[P.jsxs("span",{children:["移动平滑时间常数 ",P.jsxs("b",{children:[(e.positionTimeConstant*1e3).toFixed(0)," ms"]}),P.jsx("em",{className:"muted",children:"（仅平滑参数，不重启声源）"})]}),P.jsx("input",{type:"range",min:5,max:300,step:5,value:e.positionTimeConstant*1e3,onChange:i=>t.setSpatial({positionTimeConstant:Number(i.target.value)/1e3})})]}),P.jsxs("p",{className:"muted small",children:["定位模型固定为 ",P.jsx("code",{children:"HRTF"}),"（PannerNode.panningModel），衰减由浏览器在音频线程实时计算； 界面显示的距离增益仅为同公式的理论值。"]})]})}function MC({levels:t,onClear:e}){return P.jsxs("div",{className:"meter",children:[P.jsx(Mg,{label:"L",peak:t.l,clip:t.clipL}),P.jsx(Mg,{label:"R",peak:t.r,clip:t.clipR}),P.jsx("button",{className:`clip-clear ${t.clipL||t.clipR?"armed":""}`,onClick:e,title:"清除削波锁存",children:t.clipL||t.clipR?"CLIP!":"PEAK"})]})}function Mg({label:t,peak:e,clip:n}){const i=e<=1e-5?-1/0:20*Math.log10(e),r=Math.max(0,Math.min(1,(i+48)/51)),s=24,o=Math.round(r*s);return P.jsxs("div",{className:`meter-bar ${n?"clip":""}`,children:[P.jsx("span",{className:"meter-label",children:t}),P.jsx("div",{className:"meter-segments",children:Array.from({length:s}).map((a,l)=>{const c=l<o,f=l>=s-3;return P.jsx("span",{className:`meter-seg ${c?"on":""} ${f?"danger":""}`},l)})}),P.jsx("span",{className:"meter-db",children:i===-1/0?"-∞":`${i.toFixed(1)}`})]})}function EC({api:t}){const e=se.useRef(null),n=i=>{i&&t.addFiles(i),e.current&&(e.current.value="")};return P.jsxs("div",{className:"master-bar",children:[P.jsxs("div",{className:"master-add",children:[P.jsxs("label",{className:"btn",children:["＋ 导入本地音轨",P.jsx("input",{ref:e,type:"file",accept:"audio/*",multiple:!0,hidden:!0,onChange:i=>n(i.target.files)})]}),P.jsxs("div",{className:"sample-buttons",children:[P.jsx("button",{className:"btn",onClick:()=>t.addSample("pulse"),children:"脉冲"}),P.jsx("button",{className:"btn",onClick:()=>t.addSample("tone"),children:"单音"}),P.jsx("button",{className:"btn",onClick:()=>wC(t),children:"双声源 A+B"})]})]}),P.jsxs("div",{className:"master-transport",children:[P.jsx("button",{className:"btn primary",onClick:()=>t.playAll(),children:"▶ 全部播放（同步检查）"}),P.jsx("button",{className:"btn",onClick:()=>t.stopAll(),children:"⏹ 全部停止"})]}),P.jsxs("div",{className:"master-gains",children:[P.jsxs("label",{className:"gain-fader",children:[P.jsx("span",{children:"总线"}),P.jsx("input",{type:"range",min:0,max:1.5,step:.01,value:t.doc.busGain,onChange:i=>t.setBusGain(Number(i.target.value))}),P.jsx("b",{children:Hl(t.doc.busGain)})]}),P.jsxs("label",{className:"gain-fader master",children:[P.jsx("span",{children:"主输出"}),P.jsx("input",{type:"range",min:0,max:1.5,step:.01,value:t.doc.masterGain,onChange:i=>t.setMasterGain(Number(i.target.value))}),P.jsx("b",{children:Hl(t.doc.masterGain)})]})]}),P.jsx(MC,{levels:t.levels,onClear:t.clearClips})]})}async function wC(t){const e="duoA",n="duoB";await t.addSample(e),await t.addSample(n)}function TC({api:t}){const[e,n]=se.useState(t.loadedProjectName??""),[i,r]=se.useState(!1);return P.jsxs("div",{className:"project-bar",children:[P.jsxs("div",{className:"project-current",children:[P.jsx("span",{className:"muted",children:"工程："}),P.jsx("b",{children:t.loadedProjectName??"未命名会话（自动保存）"}),P.jsx("span",{className:`save-state ${t.saveState}`,children:t.saveState==="saving"?"保存中…":t.saveState==="saved"?"已本地保存":""})]}),P.jsxs("div",{className:"project-actions",children:[P.jsx("input",{className:"project-name-input",placeholder:"工程名称",value:e,onChange:s=>n(s.target.value)}),P.jsx("button",{className:"btn small",onClick:()=>t.saveProjectAs(e),children:"另存工程"}),P.jsx("button",{className:"btn small",onClick:()=>r(s=>!s),children:i?"收起列表":"工程列表"}),P.jsx("button",{className:"btn small ghost",onClick:()=>{confirm("新建将清空当前布局（已另存的工程不受影响），继续？")&&t.newProject()},children:"新建"})]}),i&&P.jsxs("div",{className:"project-list",children:[t.projects.length===0&&P.jsx("div",{className:"muted small",children:"还没有保存过工程。"}),t.projects.map(s=>P.jsxs("div",{className:`project-item ${t.loadedProjectId===s.id?"active":""}`,children:[P.jsx("span",{className:"project-item-name",children:s.name}),P.jsx("span",{className:"muted small",children:new Date(s.savedAt).toLocaleString()}),P.jsx("button",{className:"btn mini",onClick:()=>{t.loadProject(s.id),r(!1)},children:"载入"}),P.jsx("button",{className:"btn mini ghost danger",onClick:()=>{confirm(`删除工程「${s.name}」？`)&&t.deleteProject(s.id)},children:"删"})]},s.id))]})]})}function AC({api:t}){const[e,n]=se.useState(!1);if(t.unlock==="unlocked")return null;const i=t.unlock==="failed";return e?P.jsx("button",{className:`unlock-pill ${i?"failed":""}`,onClick:()=>n(!1),title:"展开音频解锁",children:i?"⚠ 音频解锁失败，点击重试":"🔇 音频未解锁，点击启用"}):P.jsx("div",{className:"unlock-overlay",children:P.jsxs("div",{className:`unlock-card ${i?"failed":""}`,children:[P.jsx("h2",{children:i?"音频解锁失败":"启用空间音频"}),P.jsx("p",{children:"浏览器要求先由一次点击来解锁音频输出。所有音频文件只保存在本机 IndexedDB， 不会上传到任何服务器。"}),i&&P.jsxs("p",{className:"unlock-error",children:["⚠ ",t.unlockError??"AudioContext 无法启动，请检查浏览器自动播放策略后重试。"]}),P.jsx("button",{className:"btn primary big",onClick:()=>void t.unlockAudio(),children:i?"重新解锁音频":"点击解锁并开始试听"}),P.jsxs("p",{className:"muted small",children:["解锁前你仍可",P.jsx("a",{onClick:()=>n(!0),className:"dismiss-link",children:"先编辑布局"}),"； 参数会本地保存，但重载后不会自动播放。"]})]})})}function CC(){const t=kS(),[e,n]=se.useState("3d"),i=se.useCallback((o,a)=>t.moveTrack(o,a),[t]),r=se.useCallback(o=>t.setListener({position:o}),[t]),s=se.useCallback(o=>t.setListener({yaw:o}),[t]);return P.jsxs("div",{className:"app",children:[P.jsxs("header",{className:"app-header",children:[P.jsxs("div",{className:"brand",children:[P.jsx("span",{className:"brand-mark",children:"◉"})," 空间声像工作台",P.jsx("span",{className:"brand-sub",children:"HRTF · PannerNode · 纯本地浏览器"})]}),P.jsxs("div",{className:"view-switch",children:[P.jsx("button",{className:`btn small ${e==="3d"?"active":""}`,onClick:()=>n("3d"),children:"3D 场景"}),P.jsx("button",{className:`btn small ${e==="2d"?"active":""}`,onClick:()=>n("2d"),children:"2D 俯视"})]}),P.jsxs("div",{className:"coords-help",children:["右手坐标：",P.jsx("b",{children:"+X 右耳方向"})," · ",P.jsx("b",{children:"+Y 上"})," · ",P.jsx("b",{children:"听者前方 −Z"})," · yaw 正值向右转身"]})]}),P.jsx(TC,{api:t}),P.jsxs("div",{className:"layout",children:[P.jsxs("aside",{className:"sidebar left",children:[P.jsx(EC,{api:t}),P.jsxs("div",{className:"track-list",children:[t.doc.tracks.length===0&&P.jsxs("div",{className:"empty-hint",children:["还没有声轨。",P.jsx("br",{}),"导入本地音频，或添加",P.jsx("button",{className:"btn inline",onClick:()=>t.addSample("pulse"),children:"脉冲"}),"/",P.jsx("button",{className:"btn inline",onClick:()=>t.addSample("tone"),children:"单音"}),"/",P.jsx("button",{className:"btn inline",onClick:()=>RC(t),children:"双声源"}),"样例检查方位与同步。"]}),t.doc.tracks.map(o=>P.jsx(_C,{track:o,api:t},o.id))]})]}),P.jsxs("main",{className:"stage",children:[P.jsx("div",{className:`view-container ${e==="3d"?"show":""}`,children:P.jsx(pC,{api:t,tracks:t.displayTracks,onMoveSource:i,onMoveListener:r})}),P.jsx("div",{className:`view-container ${e==="2d"?"show":""}`,children:P.jsx(mC,{tracks:t.displayTracks,listener:t.doc.listener,selectedId:t.selectedId,onSelect:t.selectTrack,onMoveSource:i,onMoveListener:r,onRotateListener:s})})]}),P.jsxs("aside",{className:"sidebar right",children:[P.jsx(yC,{api:t}),P.jsx(xC,{api:t}),P.jsx(SC,{api:t})]})]}),t.globalError&&P.jsxs("div",{className:"global-toast",children:["⚠ ",t.globalError,P.jsx("button",{className:"btn mini",onClick:t.dismissGlobalError,children:"知道了"})]}),t.automationError&&P.jsxs("div",{className:"global-toast automation-toast",children:["⚠ 自动化提交被拒绝：",t.automationError,P.jsx("button",{className:"btn mini",onClick:t.dismissAutomationError,children:"知道了"})]}),P.jsx(AC,{api:t})]})}function RC(t){t.addSample("duoA").then(()=>t.addSample("duoB"))}Bu.createRoot(document.getElementById("root")).render(P.jsx(V0.StrictMode,{children:P.jsx(CC,{})}));
