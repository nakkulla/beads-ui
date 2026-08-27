var P_=Object.create;var si=Object.defineProperty;var D_=Object.getOwnPropertyDescriptor;var N_=Object.getOwnPropertyNames;var q_=Object.getPrototypeOf,F_=Object.prototype.hasOwnProperty;var j_=(e,t,n)=>t in e?si(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var oi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var B_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of N_(t))!F_.call(e,s)&&s!==n&&si(e,s,{get:()=>t[s],enumerable:!(r=D_(t,s))||r.enumerable});return e};var U_=(e,t,n)=>(n=e!=null?P_(q_(e)):{},B_(t||!e||!e.__esModule?si(n,"default",{value:e,enumerable:!0}):n,e));var Bt=(e,t,n)=>j_(e,typeof t!="symbol"?t+"":t,n);var Fc=oi((hw,qc)=>{var Ur=1e3,Wr=Ur*60,zr=Wr*60,Sr=zr*24,H_=Sr*7,G_=Sr*365.25;qc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return K_(e);if(n==="number"&&isFinite(e))return t.long?Y_(e):V_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function K_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*G_;case"weeks":case"week":case"w":return n*H_;case"days":case"day":case"d":return n*Sr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*zr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Wr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Ur;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function V_(e){var t=Math.abs(e);return t>=Sr?Math.round(e/Sr)+"d":t>=zr?Math.round(e/zr)+"h":t>=Wr?Math.round(e/Wr)+"m":t>=Ur?Math.round(e/Ur)+"s":e+"ms"}function Y_(e){var t=Math.abs(e);return t>=Sr?xo(e,t,Sr,"day"):t>=zr?xo(e,t,zr,"hour"):t>=Wr?xo(e,t,Wr,"minute"):t>=Ur?xo(e,t,Ur,"second"):e+" ms"}function xo(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Bc=oi((yw,jc)=>{function Z_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Fc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let _=0;for(let h=0;h<d.length;h++)_=(_<<5)-_+d.charCodeAt(h),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(d){let _,h=null,b,w;function F(...W){if(!F.enabled)return;let K=F,ie=Number(new Date),Y=ie-(_||ie);K.diff=Y,K.prev=_,K.curr=ie,_=ie,W[0]=n.coerce(W[0]),typeof W[0]!="string"&&W.unshift("%O");let j=0;W[0]=W[0].replace(/%([a-zA-Z%])/g,(z,L)=>{if(z==="%%")return"%";j++;let I=n.formatters[L];if(typeof I=="function"){let re=W[j];z=I.call(K,re),W.splice(j,1),j--}return z}),n.formatArgs.call(K,W),(K.log||n.log).apply(K,W)}return F.namespace=d,F.useColors=n.useColors(),F.color=n.selectColor(d),F.extend=r,F.destroy=n.destroy,Object.defineProperty(F,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(b!==n.namespaces&&(b=n.namespaces,w=n.enabled(d)),w),set:W=>{h=W}}),typeof n.init=="function"&&n.init(F),F}function r(d,_){let h=n(this.namespace+(typeof _>"u"?":":_)+d);return h.log=this.log,h}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let _=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(d,_){let h=0,b=0,w=-1,F=0;for(;h<d.length;)if(b<_.length&&(_[b]===d[h]||_[b]==="*"))_[b]==="*"?(w=b,F=h,b++):(h++,b++);else if(w!==-1)b=w+1,F++,h=F;else return!1;for(;b<_.length&&_[b]==="*";)b++;return b===_.length}function a(){let d=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),d}function i(d){for(let _ of n.skips)if(o(d,_))return!1;for(let _ of n.names)if(o(d,_))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}jc.exports=Z_});var Uc=oi((Sn,Ao)=>{Sn.formatArgs=Q_;Sn.save=J_;Sn.load=em;Sn.useColors=X_;Sn.storage=tm();Sn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Sn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function X_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Q_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ao.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}Sn.log=console.debug||console.log||(()=>{});function J_(e){try{e?Sn.storage.setItem("debug",e):Sn.storage.removeItem("debug")}catch{}}function em(){let e;try{e=Sn.storage.getItem("debug")||Sn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function tm(){try{return localStorage}catch{}}Ao.exports=Bc()(Sn);var{formatters:nm}=Ao.exports;nm.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var ps=globalThis,bo=ps.trustedTypes,kc=bo?bo.createPolicy("lit-html",{createHTML:e=>e}):void 0,ii="$lit$",tr=`lit$${Math.random().toFixed(9).slice(2)}$`,li="?"+tr,W_=`<${li}>`,kr=document,fs=()=>kr.createComment(""),_s=e=>e===null||typeof e!="object"&&typeof e!="function",ci=Array.isArray,Tc=e=>ci(e)||typeof e?.[Symbol.iterator]=="function",ai=`[ 	
\f\r]`,ds=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$c=/-->/g,xc=/>/g,vr=RegExp(`>|${ai}(?:([^\\s"'>=/]+)(${ai}*=${ai}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ac=/'/g,Sc=/"/g,Cc=/^(?:script|style|textarea|title)$/i,ui=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ui(1),gs=ui(2),dw=ui(3),Mn=Symbol.for("lit-noChange"),Vt=Symbol.for("lit-nothing"),Ec=new WeakMap,wr=kr.createTreeWalker(kr,129);function Rc(e,t){if(!ci(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return kc!==void 0?kc.createHTML(t):t}var Oc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=ds;for(let i=0;i<n;i++){let l=e[i],u,d,_=-1,h=0;for(;h<l.length&&(a.lastIndex=h,d=a.exec(l),d!==null);)h=a.lastIndex,a===ds?d[1]==="!--"?a=$c:d[1]!==void 0?a=xc:d[2]!==void 0?(Cc.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=vr):d[3]!==void 0&&(a=vr):a===vr?d[0]===">"?(a=s??ds,_=-1):d[1]===void 0?_=-2:(_=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?vr:d[3]==='"'?Sc:Ac):a===Sc||a===Ac?a=vr:a===$c||a===xc?a=ds:(a=vr,s=void 0);let b=a===vr&&e[i+1].startsWith("/>")?" ":"";o+=a===ds?l+W_:_>=0?(r.push(u),l.slice(0,_)+ii+l.slice(_)+tr+b):l+tr+(_===-2?i:b)}return[Rc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ms=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,d]=Oc(t,n);if(this.el=e.createElement(u,r),wr.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=wr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(ii)){let h=d[a++],b=s.getAttribute(_).split(tr),w=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?yo:w[1]==="?"?vo:w[1]==="@"?wo:xr}),s.removeAttribute(_)}else _.startsWith(tr)&&(l.push({type:6,index:o}),s.removeAttribute(_));if(Cc.test(s.tagName)){let _=s.textContent.split(tr),h=_.length-1;if(h>0){s.textContent=bo?bo.emptyScript:"";for(let b=0;b<h;b++)s.append(_[b],fs()),wr.nextNode(),l.push({type:2,index:++o});s.append(_[h],fs())}}}else if(s.nodeType===8)if(s.data===li)l.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(tr,_+1))!==-1;)l.push({type:7,index:o}),_+=tr.length-1}o++}}static createElement(t,n){let r=kr.createElement("template");return r.innerHTML=t,r}};function $r(e,t,n=e,r){if(t===Mn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=_s(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=$r(e,s._$AS(e,t.values),s,r)),t}var ho=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??kr).importNode(n,!0);wr.currentNode=s;let o=wr.nextNode(),a=0,i=0,l=r[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new jr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new ko(o,this,t)),this._$AV.push(u),l=r[++i]}a!==l?.index&&(o=wr.nextNode(),a++)}return wr.currentNode=kr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},jr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Vt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=$r(this,t,n),_s(t)?t===Vt||t==null||t===""?(this._$AH!==Vt&&this._$AR(),this._$AH=Vt):t!==this._$AH&&t!==Mn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Tc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Vt&&_s(this._$AH)?this._$AA.nextSibling.data=t:this.T(kr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ms.createElement(Rc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new ho(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Ec.get(t.strings);return n===void 0&&Ec.set(t.strings,n=new ms(t)),n}k(t){ci(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(fs()),this.O(fs()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},xr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Vt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Vt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=$r(this,t,n,0),a=!_s(t)||t!==this._$AH&&t!==Mn,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=$r(this,i[r+l],n,l),u===Mn&&(u=this._$AH[l]),a||(a=!_s(u)||u!==this._$AH[l]),u===Vt?t=Vt:t!==Vt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===Vt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},yo=class extends xr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Vt?void 0:t}},vo=class extends xr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Vt)}},wo=class extends xr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=$r(this,t,n,0)??Vt)===Mn)return;let r=this._$AH,s=t===Vt&&r!==Vt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Vt&&(r===Vt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ko=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){$r(this,t)}},Lc={M:ii,P:tr,A:li,C:1,L:Oc,R:ho,D:Tc,V:$r,I:jr,H:xr,N:vo,U:wo,B:yo,F:ko},z_=ps.litHtmlPolyfillSupport;z_?.(ms,jr),(ps.litHtmlVersions??(ps.litHtmlVersions=[])).push("3.3.1");var lt=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new jr(t.insertBefore(fs(),o),o,void 0,n??{})}return s._$AI(e),s};var $o="today",Ic=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Br=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Zn(e){return e==="today"?"today":"7d"}function di(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Ar(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Mc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Pc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Dc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Nc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Wc=U_(Uc(),1);function Gt(e){return(0,Wc.default)(`beads-ui:${e}`)}function qn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Er(e,t){let n=qn(e.created_at),r=qn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Gc(e,t){let n=qn(e.created_at),r=qn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function So(e,t){let n=qn(e.updated_at),r=qn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Kc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=qn(e.created_at),o=qn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Vc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var rm=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function zc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Hc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=rm.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Yc(e,t){let n=zc(e),r=zc(t);if(n!==r)return n<r?-1:1;let s=Hc(e),o=Hc(t);if(s!==o)return s<o?-1:1;let a=qn(e&&e.created_at),i=qn(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var pi=2**20;function Hr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-qn(e&&e.created_at)}function Eo(e){return(t,n)=>{let r=Hr(t,e),s=Hr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function fi(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Hr(i,n)-pi};if(!i)return{rank:Hr(a,n)+pi};let l=Hr(a,n),u=Hr(i,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((_,h)=>({bead_id:_.id,rank:h*pi}))}}function _i(e,t={}){let n=Gt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||Er;function u(){for(let h of Array.from(a))try{h()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function _(h){if(i||!h||h.id!==e)return;let b=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,b),!(b<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(b<=o)return;r.clear();let w=Array.isArray(h.issues)?h.issues:[];for(let F of w)F&&typeof F.id=="string"&&F.id.length>0&&r.set(F.id,F);d(),o=b,u();return}if(h.type==="upsert"){let w=h.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let F=r.get(w.id);if(!F)r.set(w.id,w);else{let W=Number.isFinite(F.updated_at)?F.updated_at:0,K=Number.isFinite(w.updated_at)?w.updated_at:0;if(W<=K){for(let ie of Object.keys(F))ie in w||delete F[ie];for(let[ie,Y]of Object.entries(w))F[ie]=Y}}d()}o=b,u()}else if(h.type==="delete"){let w=String(h.issue_id||"");w&&(r.delete(w),d()),o=b,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:_,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function To(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Zc(e){let t=Gt("subs"),n=new Map,r=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],_=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let w=n.get(b);if(!w)continue;let F=w.itemsById;for(let W of d)typeof W=="string"&&W.length>0&&F.set(W,!0);for(let W of _)typeof W=="string"&&W.length>0&&F.set(W,!0);for(let W of h)typeof W=="string"&&W.length>0&&F.delete(W)}}async function o(i,l){let u=To(l);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let _=n.get(i);if(_&&_.key!==u){let h=r.get(_.key);h&&(h.delete(i),h.size===0&&r.delete(_.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(_){let h=n.get(i)||null;if(h){let b=r.get(h.key);b&&(b.delete(i),b.size===0&&r.delete(h.key))}throw n.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let _=n.get(i)||null;if(_){let h=r.get(_.key);h&&(h.delete(i),h.size===0&&r.delete(_.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:To,selectors:{getIds(i){let l=n.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=n.get(i);return u?u.itemsById.has(l):!1},count(i){let l=n.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=n.get(i),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function Xc(){let e=Gt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function a(l,u,d){let _=u?To(u):"",h=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,_,h),b&&h&&_&&h!==_){let w=t.get(l);if(w)try{w.dispose()}catch{}let F=s.get(l);if(F){try{F()}catch{}s.delete(l)}let W=_i(l,d);t.set(l,W);let K=W.subscribe(()=>o());s.set(l,K)}else if(!b){let w=_i(l,d);t.set(l,w);let F=w.subscribe(()=>o());s.set(l,F)}return n.set(l,_),()=>i(l)}function i(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function Qc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Jc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function eu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function mi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function sm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function om(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function tu(e){let t=Gt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):sm(r),a=om(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=mi(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?mi(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var am=Object.freeze({workspace_config:{default_workspace:null}});function nu(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:am.workspace_config.default_workspace}}}function ru(e={}){let t=Gt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:nu(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?nu(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!l||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function su(e){let t=Gt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(_,h)=>{let b=s++,w=Date.now();r.set(b,{type:_,start_ts:w}),t("request start id=%d type=%s count=%d",b,_,n+1),a();let F=!1,W=()=>{F||(F=!0,r.delete(b),i())},K=setTimeout(()=>{F||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,_,Date.now()-w),W())},3e4);try{let ie=await u(_,h),Y=Date.now()-w;return t("request done id=%d type=%s elapsed=%dms",b,_,Y),ie}catch(ie){let Y=Date.now()-w;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,_,Y,ie),ie}finally{clearTimeout(K),W()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,_])=>({id:d,type:_.type,elapsed_ms:u-_.start_ts}))}}}function ue(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Co(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Vc),l;switch(i){case"created_desc":return l.sort(Er),l;case"created_asc":return l.sort(Gc),l;case"updated_desc":return l.sort(So),l;case"priority":return l.sort(Kc),l;case"manual":default:{let u=n();return u?l.sort(Eo(u)):l.sort(Er),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Fn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function fn(e){let t=Fn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function En(e,t){let n=Fn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function ou(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Fn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Ro(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Oo(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=Ro(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Lo(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=ou(n);return{total:n.length,count:r,current:s,children:n}}function Io(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(fi(i,l,u.order),a);s(u,d);let _=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(h);let b=r(fi(i,l,h.order),a);s(h,b);let w=await t("ui-order-set",{expected_revision:h.revision,entries:b});w&&w.applied&&n.set({revision:typeof w.revision=="number"?w.revision:0,order:w.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function au(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Mo(e,t){let n=au(e),r=au(t);return n.length===0||r.length===0?!1:n!==r}function Po(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function gi(e,t){return!t||typeof e!="string"||e.length===0||Po(t.visible_labels).includes(e)?!0:Po(t.hidden_labels).includes(e)?!1:!Po(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function iu(e,t){return Po(e).filter(n=>gi(n,t))}function dr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function im(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function lm(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function cm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${im(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Do(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Yc):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?lm(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((l,u)=>cm(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var um={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},cu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},lu={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},dm={review:"\u2713",skip:"\u2298"},pr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function pm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function uu(e){let t=e&&e.fill||"none";return t==="none"?pr.none:e&&e.stale===!0?pr.stale:t==="dim"?pr.dim:e&&e.glyph==="review"?pr.review:e&&e.glyph==="skip"?pr.skip:pr.done}function fm(e){if(!e||e.fill==="none"||!e.approval_state)return uu(e);let t=[];return e.glyph==="review"?t.push(pr.review):e.glyph==="skip"&&t.push(pr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function _m(e,t,n,r){let s=um[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=dm[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),a&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",_=cu[e]||e,h=r?du(t):null;if(!h)return c`
      <div class="seg">
        <div class=${l} style=${d}>${i}</div>
        <div class=${u}>${_}</div>
      </div>
    `;let b=`${_} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${w=>{w.preventDefault(),w.stopPropagation(),r(w,h,e)}}
    >
      <div class=${l} style=${d}>${i}</div>
      <div class=${u}>${_}</div>
    </button>
  `}function du(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function No(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=lu[e.route]||lu.spec_backed,o=e.stages,a=pm(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${cu[u]||u} ${u==="plan"?fm(o[u]||{}):uu(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>du(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>_m(u,o[u]||{},u===a,r))}
    </div>
  `}function mm(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var pu=2;function fu(e){let t=e.slice(0,pu).join(", "),n=e.length-pu;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function gm(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(Mo(e,a)?o:s).push(a);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${fu(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${fu(o)}</span
      >`),n}function bi(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function qo(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function nr(e){return`${e.kind}:${qo(e)}@${e.sha}`}function Fo(e,t){if(!e)return null;let n=bi(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=bi(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${nr(t)}`:"";return{kind:e.kind,label:i,title:`${l}${u}`}}function _u(e,t){let n=Fo(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function bm(e){if(!e)return null;let t=bi(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${nr(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function hm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&dr(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&dr(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&dr(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=_u(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${nr(i)}`}
        >${`exec ${i.kind==="delegated"?qo(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of iu(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&dr(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),dr(n,"blocked")&&s.push(...gm(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&dr(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function ym(e){let t=En(e.created_at),n=En(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${fn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${fn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function vm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Do(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:ym(e),empty_label:"children \uC5C6\uC74C",childChips:hi,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function hi(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Fo(t,n)?c`<span class="board-card__roll-child-chips">
    ${_u(t,n)}
    ${bm(n)}
  </span>`:null}function jo(e,t){let n=mm(e.priority);return c`
    <article
      class="board-card"
      data-issue-id=${e.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${r=>t.onCardClick(r,e.id)}
      @dragstart=${r=>t.onDragStart(r,e.id)}
      @dragend=${t.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${e.id} \uBCF5\uC0AC`}
          @click=${r=>t.onCopyId(r,e.id)}
        >
          ${e.id}
        </button>
        ${n?c`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${hm(e,t)}
      ${e.workflow&&dr(t.policy||null,"stepper")?No(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${vm(e,t)}
    </article>
  `}function Gr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
    <section class=${r?"board-column board-column--closed":"board-column"} id=${e.id}>
      <header
        class="board-column__header"
        id=${e.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${e.title}</span>
          <span class="board-column__count" aria-label=${`${n}\uAC74`}
            >${n}</span
          >
        </div>
        ${r?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Ic.map(o=>c`<option
                    value=${o.value}
                    ?selected=${o.value===e.closed_range}
                  >
                    ${o.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${e.id+"-header"}
      >
        ${e.items.map(o=>jo(o,t))}
      </div>
    </section>
  `}function mu(e,t,n){return c`
    <dialog
      id="deferred-popup"
      class="deferred-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deferred-popup-title"
      @click=${n.onOverlayClick}
      @cancel=${n.onClose}
    >
      <div class="deferred-popup__container">
        <header class="deferred-popup__header">
          <div class="deferred-popup__title" id="deferred-popup-title">
            Deferred ${e.count}
          </div>
          <button
            type="button"
            class="deferred-popup__close"
            aria-label="닫기"
            @click=${n.onClose}
          >
            ×
          </button>
        </header>
        <div
          class="deferred-popup__body"
          role="list"
          aria-labelledby="deferred-popup-title"
        >
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>jo(r,t))}
        </div>
      </div>
    </dialog>
  `}var wm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],km=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],$m=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function xm(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${r>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${n.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${n.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${r>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function gu(e,t,n){return c`
    <div class="board-filter">
      <input
        class="board-filter__search"
        type="search"
        placeholder="ID·제목 검색"
        aria-label="이슈 검색"
        .value=${e.search}
        @input=${t.onSearchInput}
      />
      <select
        class="board-filter__select"
        aria-label="우선순위 필터"
        @change=${t.onPriorityChange}
      >
        ${wm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.priority===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${t.onTypeChange}
      >
        ${km.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${xm(e,t,n)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${n.deferred_popup_open?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-haspopup="dialog"
        aria-expanded=${n.deferred_popup_open?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${n.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${$m.map(r=>c`<option
              value=${r.value}
              ?selected=${n.sort_mode===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      <button
        type="button"
        class="board-filter__new"
        @click=${t.onNewIssue}
      >
        + 새 이슈
      </button>
    </div>
  `}var Am=200,Sm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Em=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),bu="beads-ui.board.sort",hu=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Tm(){try{let e=window.localStorage.getItem(bu);if(e&&hu.has(e))return e}catch{}return"created_desc"}function yu(e,t){let n=Gt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,_=t.openDoc,h=t.closedRange||$o,b=s?Co(s,a):null,w=Io({transport:o,uiOrderStore:a}),F=[],W=[],K=[],ie=[],Y=[],j=[],q=!1,z=0,L=Tm(),I=new Map,re=new Map,ge=new Map,$e=new Set,ce={search:"",priority:"",type:"",labels:[]},be=!1,we=null;function Ge(O){return String(O.status||"open")==="open"}function he(O){let H=String(O.status||"open");return H==="open"||H==="blocked"}function J(O){let H=ce.search.trim().toLowerCase(),Ce=ce.priority,A=ce.type,C=ce.labels;return O.filter(Q=>{if(H){let me=String(Q.id||"").toLowerCase(),oe=String(Q.title||"").toLowerCase();if(!me.includes(H)&&!oe.includes(H))return!1}if(Ce!==""&&String(Q.priority)!==Ce||A!==""&&String(Q.issue_type||"")!==A)return!1;if(C.length>0){let me=Array.isArray(Q.labels)?Q.labels:[];if(!C.some(oe=>me.includes(oe)))return!1}return!0})}function Re(){let O=new Set;for(let H of[F,W,K,ie,Y,j])for(let Ce of H){let A=Array.isArray(Ce.labels)?Ce.labels:[];for(let C of A)typeof C=="string"&&C.length>0&&O.add(C)}return Array.from(O).sort()}function De(){return ce.search.trim()!==""||ce.priority!==""||ce.type!==""||ce.labels.length>0}function T(){try{if(b){let O=b.selectBoardColumn("tab:board:in-progress","in_progress",L),H=b.selectBoardColumn("tab:board:blocked","blocked",L).filter(he),Ce=new Set(O.map(U=>U.id)),A=b.selectBoardColumn("tab:board:ready","ready",L).filter(U=>Ge(U)&&!Ce.has(U.id)),C=b.selectBoardColumn("tab:board:resolved","resolved",L),Q=b.selectBoardColumn("tab:board:deferred","deferred",L),me=b.selectBoardColumn("tab:board:closed","closed").slice(0,Am),oe=[...H,...A,...O,...C,...me];te(oe);let Pe=new Set;for(let U of oe)U&&U.id&&!Ro(U)&&Pe.add(U.id);let E=!De();F=E?bs(H,Pe):H,W=E?bs(A,Pe):A,K=E?bs(O,Pe):O,ie=E?bs(C,Pe):C,Y=Q,z=Q.length,j=E?bs(me,Pe):me,I=new Map;for(let U of F)I.set(U.id,"open");for(let U of W)I.set(U.id,"open");for(let U of K)I.set(U.id,"in_progress");for(let U of ie)I.set(U.id,"resolved");for(let U of Y)I.set(U.id,"deferred");for(let U of j)I.set(U.id,"closed");re=new Map;for(let U of F)re.set(U.id,"blocked-col");for(let U of W)re.set(U.id,"ready-col");for(let U of K)re.set(U.id,"in-progress-col");for(let U of ie)re.set(U.id,"resolved-col");for(let U of j)re.set(U.id,"closed-col")}gt()}catch{F=[],W=[],K=[],ie=[],Y=[],j=[],ge=new Map,gt()}}function te(O){ge=Oo(O)}function Se(O){return Lo(ge,O)}function ke(O){return!$e.has(O)}function Ne(O,H){O.preventDefault(),O.stopPropagation(),$e.has(H)?$e.delete(H):$e.add(H),gt()}function pe(O,H){O.preventDefault(),O.stopPropagation(),r(H)}function Le(O,H){O.preventDefault(),O.stopPropagation(),r(H)}function et(O,H){we||r(H)}function Et(O,H){O.preventDefault(),O.stopPropagation(),Cm(H).then(Ce=>{Ce&&ue("\uBCF5\uC0AC\uB428","success",1200)})}function xt(O,H){we=H,O.dataTransfer&&(O.dataTransfer.setData("text/plain",H),O.dataTransfer.effectAllowed="move"),O.target.classList.add("board-card--dragging")}function ht(O){O.target.classList.remove("board-card--dragging"),Rt(),setTimeout(()=>{we=null},0)}function M(O){let H=String(O.target.value||"");!H||H===h||(h=H,u&&u(H),gt())}function ae(){return i?i.get():null}function Ie(O){let H=l?l.get():null,Ce=H?H.cleanup_failed:null;if(!Ce||typeof Ce!="object"||Array.isArray(Ce))return null;let A=Ce[O];return!A||typeof A!="object"||Array.isArray(A)?null:A}let qe={onCardClick:et,onCopyId:Et,onDragStart:xt,onDragEnd:ht,onClosedRangeChange:M,rollupFor:Se,isExpanded:ke,onRollupToggle:Ne,onChildClick:pe,onFromChipClick:Le,onOpenDoc:_?(O,H)=>_(H):void 0,cleanupFailureFor:Ie,get policy(){return ae()}};function Ye(O,H){we||(ve(),r(H))}function rt(O,H){O.preventDefault(),O.stopPropagation(),ve(),r(H)}let yt={...qe,onCardClick:Ye,onChildClick:rt,onFromChipClick:rt,onOpenDoc:_?(O,H)=>{ve(),_(H)}:void 0,get policy(){return ae()}};function vt(O){let H=O.target,Ce=e.querySelector(".board-filter__labels");H&&Ce&&Ce.contains(H)||Ue()}function se(O){O.key==="Escape"&&Ue()}function X(){be||(be=!0,document.addEventListener("mousedown",vt),document.addEventListener("keydown",se),gt())}function Ue(){be&&(be=!1,document.removeEventListener("mousedown",vt),document.removeEventListener("keydown",se),gt())}function dt(O){O.key==="Escape"&&ve()}function ze(){q||(q=!0,document.addEventListener("keydown",dt),gt())}function ve(){q&&(q=!1,document.removeEventListener("keydown",dt),gt())}let Qe={onClose:ve,onOverlayClick(O){O.target===O.currentTarget&&ve()}},ct={onSearchInput(O){ce.search=String(O.target.value||""),T()},onPriorityChange(O){ce.priority=String(O.target.value||""),T()},onTypeChange(O){ce.type=String(O.target.value||""),T()},onSortChange(O){let H=String(O.target.value||"");if(!(!hu.has(H)||H===L)){L=H;try{window.localStorage.setItem(bu,H)}catch{}T()}},onDeferredToggle(){q?ve():ze()},onLabelMenuToggle(){be?Ue():X()},onLabelToggle(O){let H=ce.labels.indexOf(O);H===-1?ce.labels.push(O):ce.labels.splice(H,1),T()},onLabelClear(){ce.labels.length!==0&&(ce.labels=[],T())},onNewIssue(){d&&d()}};function mt(){return c`
      <div class="board-view">
        ${gu(ce,ct,{sort_mode:L,deferred_popup_open:q,deferred_count:z,label_options:Re(),label_menu_open:be})}
        <div class="board-root">
          ${Gr({title:"Blocked",id:"blocked-col",items:J(F)},qe)}
          ${Gr({title:"Ready",id:"ready-col",items:J(W)},qe)}
          ${Gr({title:"In progress",id:"in-progress-col",items:J(K)},qe)}
          ${Gr({title:"Resolved",id:"resolved-col",items:J(ie)},qe)}
          ${Gr({title:"Closed",id:"closed-col",items:J(j),is_closed:!0,closed_range:h},qe)}
        </div>
        ${q?mu({items:J(Y),count:z},yt,Qe):""}
      </div>
    `}function gt(){lt(mt(),e),zt()}function zt(){try{let O=e.querySelector("#deferred-popup");O&&!O.open&&(typeof O.showModal=="function"?O.showModal():O.setAttribute("open",""));let H=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ce of H)Array.from(Ce.querySelectorAll(".board-card")).forEach((C,Q)=>{C.tabIndex=Q===0?0:-1})}catch{}}async function qt(O,H){if(!o){ue("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:O,status:H}),ue("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ce){n("update-status failed: %o",Ce),ue("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Kt(O){switch(O){case"blocked-col":return F;case"ready-col":return W;case"in-progress-col":return K;case"resolved-col":return ie;default:return[]}}function Ct(O,H,Ce){if(!o||!a)return;let A=Kt(O),C=A.find(E=>E.id===H);if(!C)return;let Q=A.filter(E=>E.id!==H),me=Ce.closest?Ce.closest(".board-card"):null,oe=Q.length;if(me){let E=me.getAttribute("data-issue-id");if(E===H)return;let U=Q.findIndex(xe=>xe.id===E);U>=0&&(oe=U)}let Pe=Q.slice();Pe.splice(oe,0,C),w.applyReorder(H,Pe,oe)}function Rt(){for(let O of Array.from(e.querySelectorAll(".board-column--drag-over")))O.classList.remove("board-column--drag-over")}let at=null;e.addEventListener("dragover",O=>{O.preventDefault(),O.dataTransfer&&(O.dataTransfer.dropEffect="move");let Ce=O.target.closest(".board-column");Ce&&Ce!==at&&(at&&at.classList.remove("board-column--drag-over"),Ce.classList.add("board-column--drag-over"),at=Ce)}),e.addEventListener("dragleave",O=>{let H=O.relatedTarget;(!H||!e.contains(H))&&at&&(at.classList.remove("board-column--drag-over"),at=null)}),e.addEventListener("drop",O=>{O.preventDefault(),at&&(at.classList.remove("board-column--drag-over"),at=null);let H=O.target,Ce=H.closest(".board-column");if(!Ce)return;let A=O.dataTransfer?.getData("text/plain")||"";if(!A)return;let C=Ce.id,Q=re.get(A);if(Q&&Q===C){if(Em.has(C)){if(L!=="manual"){ue("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ct(C,A,H)}return}let me=Sm[C];if(!me){ue("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}I.get(A)!==me&&qt(A,me)}),e.addEventListener("keydown",O=>{let H=O.target;if(!(H instanceof HTMLElement))return;let Ce=String(H.tagName||"").toLowerCase();if(Ce==="input"||Ce==="textarea"||Ce==="select"||Ce==="button"||Ce==="a"||H.isContentEditable===!0)return;let A=H.closest(".board-card");if(!A)return;let C=String(O.key||"");if(C==="Enter"||C===" "){O.preventDefault();let Pe=A.getAttribute("data-issue-id");Pe&&r(Pe);return}if(C!=="ArrowUp"&&C!=="ArrowDown"&&C!=="ArrowLeft"&&C!=="ArrowRight")return;O.preventDefault();let Q=A.closest(".board-column");if(!Q)return;let me=Array.from(Q.querySelectorAll(".board-card")),oe=me.indexOf(A);if(C==="ArrowDown"&&oe<me.length-1){We(A,me[oe+1]);return}if(C==="ArrowUp"&&oe>0){We(A,me[oe-1]);return}if(C==="ArrowLeft"||C==="ArrowRight"){let Pe=Array.from(e.querySelectorAll(".board-column")),E=Pe.indexOf(Q),U=C==="ArrowRight"?1:-1,xe=E+U;for(;xe>=0&&xe<Pe.length;){let tt=Pe[xe].querySelector(".board-card");if(tt){We(A,tt);return}xe+=U}}});function We(O,H){try{O.tabIndex=-1,H.tabIndex=0,H.focus()}catch{}}let P=null;b&&b.subscribe&&(P=b.subscribe(()=>{try{T()}catch{}}));let ee=null;i&&i.subscribe&&(ee=i.subscribe(()=>{try{T()}catch{}}));let ye=null;return l&&l.subscribe&&(ye=l.subscribe(()=>{gt()})),{async load(){n("load"),T()},clear(){Ue(),ve(),P&&(P(),P=null),ee&&(ee(),ee=null),ye&&(ye(),ye=null),e.replaceChildren(),F=[],W=[],K=[],ie=[],Y=[],j=[],I=new Map,re=new Map}}}function bs(e,t){return e.filter(n=>{let r=Ro(n);return!(r&&t.has(r))})}async function Cm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var Tn=e=>e??Vt;async function On(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function Tr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function hs(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Rm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Tr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Tr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function rr(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await Rm(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var Om=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],vu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Lm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function ln(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Yt(e){return typeof e=="string"&&e.length>0?e:null}function Kr(e){return e.startsWith("gpt-")?e.slice(4):e}function Ut(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function ku(e,t,n){let r=Yt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Yt(n[e]);return s===null?null:{value:s,source:"global"}}function ys(e,t,n,r){return ku(e,t,n)||{value:r,source:"base"}}function yi(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&ln(s?.[t])){let a=Yt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&ln(s)){for(let a of Object.values(s))if(ln(a)){let i=Yt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Yt(r?.runners?.[o]?.models?.[e]?.id)||e}function Im(e,t){return Yt(t?.review?.reviewers?.[e]?.model)||e}function Vr(e,t,n=!1){if(e==="default")return Ut(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Kr(e):e;return Ut(e,t,r,e,"explicit")}function $u(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];ln(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(ln(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function Mm(e,t){let n=[],r=e?.implementation?.model_catalog;ln(r)&&n.push(...Object.keys(r));let s=t?.runners;if(ln(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function Pm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of Mm(t,n)){let o=$u(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function vi(e){return Ut(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function wu(e,t,n){let r=ku(e,t,n);return r?Vr(r.value,r.source):Ut(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Cn(e){let t=ln(e.pin)?e.pin:{},n=ln(e.global)?e.global:{},r=ln(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&ln(r.session)?r.session:null,o=r?.supported===!0&&ln(r.orchestration)?r.orchestration:null,a=ln(e.runner_catalog)?e.runner_catalog:null,i=Yt(n.quick_fix_impl_model),l=Pm(i,s,a),u={};if(s){let d=ys("workflow_mode",t,n,Yt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Ut(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Vr(d.value,d.source);for(let Y of["spec_review","plan_review","impl_review"]){let j=`${Y}_model`,q=Yt(Y==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),z=ys(j,t,n,q);if(z.value===null)u[j]=Ut(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(z.value!=="self"&&z.value!=="skip"&&!ln(s.review?.reviewers?.[z.value]))u[j]=vi(Ut(z.value,z.source,"",null,"explicit"));else{let L=Im(z.value,s);u[j]=Ut(z.value,z.source,Kr(L),L,z.source==="base"?"default":"explicit")}}for(let[Y,j]of Object.entries(vu)){let q=u[j].value;if(q==="self"||q==="skip"){u[Y]=Ut(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let z=Yt(s.review?.reviewers?.[q||""]?.effort),L=ys(Y,t,n,z);u[Y]=L.value===null?Ut(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ut(L.value,L.source,L.value,L.value,L.source==="base"?"default":"explicit")}let _=ln(s.implementation?.default)?s.implementation.default:{},h=Yt(e.route),b=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),w=ln(s.implementation?.route_defaults)?s.implementation.route_defaults:{},F=b&&ln(w[h])?w[h]:{};for(let Y of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let j=ys(Y,t,n,Y==="impl_dispatch"?Yt(F.dispatch)||Yt(_.dispatch):Yt(_[Y.replace("impl_","")]));u[Y]=j.value===null?Ut(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ut(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit")}let W=Yt(t.impl_runtime),K=W==="inherit"?Yt(e.controller_runtime):W,ie=h==="quick_fix"&&Yt(t.impl_dispatch)===null&&l.runtime!==null&&(W===null||K===l.runtime);if(ie){let Y=l.runtime,j=i;u.impl_dispatch=Ut("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),W===null&&(u.impl_runtime=Ut(Y,"global",`${Y} (\uC720\uB3C4)`,Y,"explicit")),Yt(t.impl_model)===null&&(u.impl_model=Ut(j,"global",j,j,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let Y of["impl_runtime","impl_model","impl_effort","impl_speed"])u[Y]=Ut(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ie&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let Y=u.impl_runtime.value==="inherit"?Yt(e.controller_runtime):u.impl_runtime.value,j=Y?$u(Y,s,a):[];if(u.impl_model.value!=="auto"&&j.length>0&&!j.includes(u.impl_model.value))u.impl_model=vi(u.impl_model);else{let q=yi(u.impl_model.value,Y,s,a);u.impl_model.display=Kr(q),u.impl_model.full_value=q}}if(u.impl_effort.value==="auto"){let Y=Yt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),j=Y?Yt(s.implementation?.effort_by_transport?.[Y]?.auto):null;j&&!Lm.has(j)?(u.impl_effort.display=`${j} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=j,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Ut("default","base","default (\uC77C\uBC18)","default","default"):Vr("default",u.impl_speed.source))}}else for(let d of Om.filter(_=>!_.startsWith("orchestration_")))u[d]=wu(d,t,n);if(!s){for(let[d,_]of Object.entries(vu))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=Ut(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Ut(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=wu(d,t,n);continue}let _=d.replace("orchestration_",""),h=Yt(o[_]),b=ys(d,t,n,h);if(d==="orchestration_effort"&&b.source==="base"){u[d]=Ut(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[d]=Ut(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let w=b.source==="base"?Yt(o.model_id)||b.value:yi(b.value,null,s,a);u[d]=Ut(b.value,b.source,Kr(w),w,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[d]=b.source==="base"?Ut("default","base","default (\uC77C\uBC18)","default","default"):Vr("default",b.source);continue}u[d]=Vr(b.value,b.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Ut(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Kr(d)})`,null,"default")}else if(l.runtime!==null){let d=yi(i,l.runtime,s,a);u.quick_fix_impl_model=Ut(i,"global",Kr(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=vi(Ut(i,"global","",null,"explicit")):u.quick_fix_impl_model=Vr(i,"global");return u}function Dm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Bo(e){let t=ln(e.pin)?e.pin:{},n=ln(e.global)?e.global:{},r=ln(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=_=>{let h={...r,..._};return Cn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],l=s(o)[e.key],u=Yt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Dm(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(_=>{let h=s({...o,[e.key]:_})[e.key];return{value:_,label:h.display,full_value:h.full_value}})}}function Yr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let l=!1,u=_=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(_))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),d())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function wi(e){return`session:${e.provider}:${e.session_id}`}function vs(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Nm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Zr(e,t,n,r){return{attempt_id:wi(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:vs(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Nm(e,n)}}}var ki="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",qm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",xu="\uBD84\uD574 \uC5C6\uB294 leg";function nn(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Qn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Xr=[...Qn,"reasoning_output_tokens"],Fm={codex:["implementation","review-consult"],claude:["subagent"]};function $i(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Qn.some(t=>Number.isFinite(e[t]))}function jm(e){return!e||typeof e!="object"?!1:Xr.some(t=>Number.isFinite(e[t]))}function xi(e){let t=0;for(let n of Qn)t+=nn(e?.[n]);return t}function Bm(e){return!e||typeof e!="object"?!1:Qn.some(t=>Number.isFinite(e[t]))}function Au(e){return!e||typeof e!="object"?!1:Xr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Um(e){let t={};for(let n of Xr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Su(e){let t={};for(let n of Xr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Eu(e,t){return $i(t)?nn(t.total_tokens):e==="codex"?nn(t.input_tokens)+nn(t.output_tokens):xi(t)}function Wm(e){return e==="claude"?"Claude":"Codex"}function zm(e){return`\u03C4 ${Cu(e)}`}function Hm(e,t){let n=t.breakdown||{},r=nn(t.total_only_subtotal);if($i(n)||r>0&&!jm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,qm];return t.replayed&&u.push(ki),u.join(`
`)}let s=[`\uC785\uB825 ${nn(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${nn(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${nn(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${nn(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${nn(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${nn(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${nn(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${xu} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${xu}`:o,l=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(ki),l.join(`
`)}function _n(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Wm(n)} ${zm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Hm(n,r)})}return t}function Wo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=nn(i.total_only_subtotal)+nn(a.total_only_subtotal));for(let l of Xr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=nn(i.breakdown[l])+nn(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ai(e){return!e||typeof e!="object"?null:Pn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Gm(e){return e==="codex"?"codex":"claude"}function Xn(){return{subtotal:0,breakdown:Um(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Uo(e,t,n){e.subtotal+=t.subtotal,$i(t.usage)&&(e.total_only+=t.subtotal);for(let r of Xr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=nn(e.breakdown[r])+nn(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Tu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Cu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Qr(e){return Bm(e)?`\u03C4 ${Cu(xi(e))}`:null}function sr(e){let t=Qr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ws(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${nn(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${nn(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${nn(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${nn(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${xi(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ki),n.join(`
`)}function Pn(e,t){let n={claude:Xn(),codex:Xn()},r={orchestrator:{claude:Xn(),codex:Xn()},implementation:{claude:Xn(),codex:Xn()},"review-consult":{claude:Xn(),codex:Xn()},subagent:{claude:Xn(),codex:Xn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(Au(l)){let d=Gm(i.runner),_=Su(l),h={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Eu(d,_)};_.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),Uo(n[d],h,!0),Uo(r.orchestrator[d],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let _=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Fm[_].includes(d.role)||!Au(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let b=Su(d.usage),w={provider:_,role:d.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:Eu(_,b)};w.receipt_id=h,typeof d.agent_type=="string"&&(w.agent_type=d.agent_type),typeof d.agent_id=="string"&&(w.agent_id=d.agent_id),typeof d.model=="string"&&(w.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(w.effort=d.effort),typeof d.session_id=="string"?w.session_id=d.session_id:typeof d.thread_id=="string"&&(w.session_id=d.thread_id),typeof d.turn_id=="string"&&(w.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(w.completed_at=d.completed_at),b.replayed===!0&&(w.replayed=!0),Uo(n[_],w,!1),Uo(r[w.role][_],w,!1)}}let o={};for(let i of["claude","codex"]){let l=n[i];if(l.legs.length===0)continue;let u=Tu(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(l[u]={...Tu(d,!0),legs:d.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}function Ru(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let a=[],i=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let d of r.get(l)){let _=Number(n.get(l))<Number(n.get(d)),h=Number(i.get(l))>Number(i.get(d));_&&h&&(u===null||Number(i.get(d))>Number(i.get(u)))&&(u=d)}u!==null&&a.push({bead_id:l,after:u})}return{order:o,corrections:a,cycle:!1}}var Km="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ho="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Vm="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Ym="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Jr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function ks(e,t){return`${e}\0${t}`}function Zm(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,a=o instanceof Map?o.get(s):void 0;if(!Array.isArray(a))return null;r.set(s,a.filter(i=>i!==s&&n.has(i)))}return r}function Xm(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function As(e,t){let n=e.entries,r=n.map(_=>_.bead_id),s=Zm(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[_,h]of s)for(let b of h)o.push({blocker:b,blockee:_});let a=Xm(e,t),i=new Map(r.map((_,h)=>[_,h])),l=r.slice(0,a).filter(_=>s.get(_).some(h=>Number(i.get(h))>Number(i.get(_)))),u=Ru(r.slice(a),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(_=>[_.bead_id,_]));return{entries:[...n.slice(0,a),...u.order.map(_=>d.get(_))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function Ou(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:As(n,t)}function Qm(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Jm(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function eg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Si(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function tg(e,t){let n=new Set;for(let[a,i]of t)for(let l of i)n.add(ks(a,l));let r=new Map,s=new Map;for(let a of e){let i=ks(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=ks(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function ng(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function rg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function zo(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Ei(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Ss(e){let t=eg(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=Jm(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,d,_)=>{if(s.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let b=o(u);if(b!==null){if(Si(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),_!==void 0&&r.add(ks(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:b,..._===void 0?{}:{lane_id:_}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let _=t.get(u)||[];if(!_.includes(d))return;let h=o(u);h!==null&&(t.set(u,_.filter(b=>b!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(ks(u,d))}}function Es(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=tg(e.dep_ops,t.blocked_by_map),a=o.filter(d=>d.type==="dep-remove"),i=o.filter(d=>d.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:Qm(s.lane_id,s.correction);return{lane_ops:n,ops:[...a,...l,...i,...r],lane_op_index:a.length+l.length,...u===void 0?{}:{correction:u}}}function Lu(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function $s(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Iu(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let a of r){let i=e.owner_of.get(a.bead_id)||a.root_dir;typeof i!="string"||i.length===0||o.set(i,[...o.get(i)||[],a.bead_id])}for(let[a,i]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:i,lane_id:n},root_dir:a});return s}function Mu(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(zo(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function xs(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Go(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ti(e,t,n){let r=Ss(n),s=[],o=[],a=[],i,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Km};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Vm};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ei(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Jr}}if(e.kind==="chain"&&d===void 0)return{refused:Jr};let _=()=>{if(d===void 0||d.status!=="confirmed")return;let w=d.entries.findIndex(Y=>Y.bead_id===e.bead_id);if(w<0)return;let F=w>0?d.entries[w-1]:null,W=w+1<d.entries.length?d.entries[w+1]:null,K=$s(d,w),ie=W!==null&&$s(d,w+1);K&&F!==null&&r.removeDep(e.bead_id,F.bead_id),ie&&W!==null&&r.removeDep(W.bead_id,e.bead_id),(K||ie)&&F!==null&&W!==null&&r.addDep(W.bead_id,F.bead_id,u)},h=(w,F)=>{let W=n.cross_lanes.get(w),K=W.entries.findIndex(ge=>ge.bead_id===e.bead_id),ie=W.entries.filter(ge=>ge.bead_id!==e.bead_id),Y=Math.max(0,Math.min(ie.length,K>=0&&F>K?F-1:F)),j=-1;if(ie.forEach((ge,$e)=>{n.fixed_members.has(ge.bead_id)&&(j=$e)}),Y<=j){r.state.refusal=Ym;return}let q=K>=0?W.entries[K]:d?.entries.find(ge=>ge.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};i=As({status:W.status,entries:[...ie.slice(0,Y),q,...ie.slice(Y)]},n);let z=i.entries;if(Go(z,W.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:w,entries:xs(z)}}),W.status!=="confirmed")return;let L=z.findIndex(ge=>ge.bead_id===e.bead_id),I=L>0?z[L-1].bead_id:null,re=L+1<z.length?z[L+1].bead_id:null;if(I===null){re!==null&&r.addDep(re,e.bead_id,w);return}if(r.addDep(e.bead_id,I,w),re!==null&&(r.graph.get(re)||[]).includes(I)){let ge=W.entries.findIndex($e=>$e.bead_id===re);(r.laneCreated(re,I)||ge>0&&W.entries[ge-1].bead_id===I&&$s(W,ge))&&r.removeDep(re,I),r.addDep(re,e.bead_id,w)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(_(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(a.push(...Iu(n,d,u,d.entries.filter(w=>w.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:xs(d.entries.filter(w=>w.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=ng(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(zo(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let F=n.parallel_rows,W=F[Math.max(0,Math.min(F.length,t.marker_index))];if(!(!!W&&W.bead_id===e.bead_id)&&rg(n,e.root_dir)&&b!==void 0){let ie=b>w?w:w-1;ie>=0&&ie!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ie},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let w=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&w.status==="confirmed"&&o.push(zo(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let w=b>t.index?t.index:t.index-1;w>=0&&w!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else o.push(zo(e.bead_id,e.root_dir,t.index,t.lane_id));return Es(r,n,s,o,{disarm_ops:a,...t.kind==="chain"?{lane_id:t.lane_id,correction:i}:{}})}function Pu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Jr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=As(n,t);if(r.held)return{refused:Ho};let s=r.entries,o=Ss(t),a=[];Lu(o,s,e),o.state.refusal===null&&Mu(o,t,s,a);let i=Go(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:xs(s)}}];return i.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Es(o,t,i,a,{lane_id:e,correction:r})}function Du(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Jr};let r=As(n,t),s=r.entries,o=Ss(t),a=[];Lu(o,s,e),o.state.refusal===null&&Mu(o,t,s,a);let i=Go(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:xs(s)}}];return Es(o,t,i,a,{lane_id:e,correction:r})}function Nu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Jr};let r=As(n,t),s=r.entries;return Es(Ss(t),t,Go(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:xs(s)}}],[],{lane_id:e,correction:r})}function qu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Jr};let r=Ss(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)$s(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Es(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Iu(t,n,e,n.entries)})}function Fu(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let a=1;a<n.entries.length;a+=1){let i=`  ${n.entries[a].bead_id} \u2190 ${n.entries[a-1].bead_id}`;$s(n,a)?r.push(i):s.push(`${i} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${Ei(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function ju(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Bu(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function Ci(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ei(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Uu={running:3,paused:2,failed:1};function Cr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Wu(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function zu(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Cr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Cr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),_=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!_&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=Uu[u.run_state],_=Uu[i];if(d>_||d===_&&(u.started_at??0)>(l??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:l})}return{winners:o,resumed_from_ids:r}}var Ko=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Oi=[...Ko.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],or=["orchestration_model","orchestration_effort","orchestration_speed"],Vo=[...Ko,...or],sg=Oi.filter(e=>Vo.includes(e)),Hu=["delegated","main"],Yo=["inherit","claude","codex"],Ts=["default","fast"],Cs=["standard","fast_track"],Rs=["codex","opus","fable","self","skip"],Zo=["codex","fable","skip"],Xo=["low","medium","high","xhigh"],In="auto";function Ln(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Gu(e){if(!Ln(e)||!Ln(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))Ln(r)&&Ln(r.models)&&t.push([n,Object.keys(r.models)]);return t}function es(e,t){let n=Gu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[In,...r.flatMap(([,s])=>s)]}function Ku(e,t,n,r){if(!Ln(e)||!Ln(e.runners))return[In];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!Ln(a)||!Ln(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,l]of Object.entries(a.models)){if(n&&n!==In&&i!==n)continue;let u=r(a,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[In,...s]}function ts(e,t,n){return Ku(e,t,n,(r,s)=>Ln(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Li(e,t,n){return Ku(e,t,n,(r,s)=>Ln(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:Ln(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Os(e,t){let n=Gu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Vu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!es(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!ts(t,s,r.impl_model||In).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var og={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ri=[...sg,...or],ag=[...Vo,...Oi].filter((e,t,n)=>n.indexOf(e)===t&&!Ri.includes(e));function Yu(e,t){let n=Ln(e)?e:{},r=Ln(t)?t:{},s=[];for(let a of Ri){let i=n[a]??null,l=r[a]??null;i!==l&&s.push({key:a,label:og[a]||a,before:i,after:l,kind:i===null?"added":l===null?"removed":"changed"})}let o=[];for(let a of[...ag,...Object.keys(r)])!Ri.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Ii(e,t,n,r,s,o){return Bo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Zu(e,t){let n={};for(let r of Oi){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Xu(e,t){let n={};for(let r of or){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Mi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...or]}],fr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Qo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Pi(e,t,n,r,s,o=null){let a=Cn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Qu(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of Pi(e,t,n,r,s,o))a[i.source]+=1;return a}function Ju(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function ed(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Zk=[...Ko,...or];var td=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Ls(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Jo(e){if(!Ls(e)||!Ls(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Ls(n)&&Ls(n.models));return t.length>0?t:null}function jn(e,t){let n=Jo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function nd(e,t){return Ls(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function rd(e,t){let n=Jo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return nd(r,r.models[t]);return[]}function ig(e){let t=Jo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of nd(r,s))n.includes(o)||n.push(o);return n}function lg(e,t){if(!t)return ig(e);let r=Jo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of rd(e,o))s.includes(a)||s.push(a);return s}function sd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=jn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?rd(t,r.impl_model):lg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}var Di=new Set(["unavailable","not_applicable"]);function _r(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function od(e){return e.filter(t=>t!==null).join(" \xB7 ")}function mr(e,t){return t===null?null:`${fr[e]}: ${t.display} (${Qo[t.source]})`}function Ni(e){return e.filter(t=>t!==null).join(`
`)}function Is(e){if(typeof e!="object"||e===null)return null;let t=Tr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Ni(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(fr.orchestration_model,e.model),n(fr.orchestration_effort,e.effort),n(fr.orchestration_speed,e.speed)])}}function Rr(e,t){let n=_r(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=_r(e,"orchestration_effort"),s=_r(e,"orchestration_speed"),o=od([jn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Ni(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",mr("orchestration_model",n),mr("orchestration_effort",r),mr("orchestration_speed",s)])}}function cg(e,t){return e===null||e.value===null||Di.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function ug(e){return e===null||Di.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function dg(e){return e===null?null:e.value==="auto"?"auto":Di.has(e.resolution)?null:e.display}function gr(e,t){if(typeof e!="object"||e===null)return null;let n=_r(e,"impl_dispatch"),r=_r(e,"impl_runtime"),s=_r(e,"impl_model"),o=_r(e,"impl_effort"),a=_r(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":od([cg(r,t??null),ug(s),dg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Ni(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",mr("impl_dispatch",n),mr("impl_runtime",r),mr("impl_model",s),mr("impl_effort",o),mr("impl_speed",a)])}}var pg=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var ad={orchestration_model:["fable"],impl_runtime:["claude"]},fg={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function id(e){return typeof e=="object"&&e!==null?e:null}function ld(e,t){return typeof e=="string"&&t.includes(e)?e:""}function _g(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>pg.includes(t))}function ns(e,t=e){let n=id(e);if(!n)return null;let r=ld(n.rec_orchestration_model,ad.orchestration_model);if(r.length===0)return null;let s=ld(n.rec_impl_runtime,ad.impl_runtime),o={orchestration_model:r};s.length>0&&(o.impl_runtime=s);let a=id(t)||{},i=Object.keys(o),l=0,u=0;for(let _ of i){let h=a[_];typeof h=="string"&&h.length>0&&(l+=1,h===o[_]&&(u+=1))}let d=l===0?"unapplied":u===i.length?"applied":"diverged";return{reasons:_g(n.rec_reason),rec:o,state:d}}function ea(e){if(!e||typeof e!="object")return"";let t=Array.isArray(e.reasons)?e.reasons:[],n=fg[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(", ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function ta(e){return e.replace(/\/+$/,"")}function mg(e,t){let n=ta(e),r=ta(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function na(e,t){let n=new Set;for(let r of e)for(let s of t){if(!mg(r,s))continue;let o=ta(r),a=ta(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}function ra(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ud(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Ps(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function sa(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function oa(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function aa(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function gg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:ra(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function dd(e,t){let n=gg(e,t);return n?c`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${n.deploy?c`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${n.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${n.deploy.at?fn(n.deploy.at):""}
            >${aa(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Ps(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function rs(e){let t=En(e.created_at),n=En(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${fn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${fn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function bg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ds(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ia(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Bn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,h)=>(_.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?bg(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function Ms(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?c`<code>백업: ${r}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var hg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function pd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:hg[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function la(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return c`${e.orchestration?c`<span
        class="exec-chip exec-chip--orch${n}"
        title=${`${e.orchestration.title}${r}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?c`<span
        class="exec-chip exec-chip--worker${n}"
        title=${`${e.worker.title}${r}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function yg(e){return c`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${e.rows.map(t=>c`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${t.id}</span>
            <span class="mon-overlap__rtitle">${t.title}</span>
            <span class="mon-overlap__rwhere">${t.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${t.prefixes.map(n=>c`<li>${n}</li>`)}
          </ul>
          ${t.action.kind==="note"?c`<p class="mon-overlap__note">${t.action.text}</p>`:c`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${t.id}
                ?disabled=${t.action.kind==="disabled"}
                title=${t.action.title}
              >
                ${t.action.label}
              </button>`}
        </div>`)}
  </div>`}function ca(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.scope_missing===!0,s=e.popover||null,o=e.cross_lane||null,a=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&!o&&!a?"":c`<div class="worker-deps">
    ${o?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${o.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${o.label}
        </button>`:""}
    ${a?c`<span
          class=${`worker-dep worker-dep--armed${a.orphan?" worker-dep--armed-orphan":""}`}
          title=${a.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
          >${a.orphan?c`${a.label}<button
                  type="button"
                  class="worker-dep__label mon2-arm__release"
                  data-lane-id=${a.lane_id}
                >
                  해제
                </button>`:a.label}</span
        >`:""}
    ${t.map(i=>c`<span
          class=${`worker-dep worker-dep--pred${i.foreign?" worker-dep--foreign":""}`}
          title=${i.title||""}
          >${i.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${i.id}
                data-root-dir=${i.root_dir||""}
              >
                ${i.label}
              </button>`:i.label}</span
        >`)}${n.map(i=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${i.id}
          aria-label=${`scope \uACB9\uCE68 ${i.id} (${i.location_label})`}
          title=${[`\uACB9\uCE68 ${i.id} (${i.location_label})`,...i.prefixes].join(`
`)}
        >
          ⧉ ${i.id}
        </button>`)}${r?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${s?yg(s):""}
  </div>`}function ua(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function vg(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function fd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function da(e){return e?c`<span
    class="ctl-chip ctl-chip--label worker-card__rec"
    data-state=${e.state}
    title=${ea(e)}
    >${"\uBCF5\uC7A1"}</span
  >`:""}function _d(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function pa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function wg(e){let t=Array.isArray(e.badges)?e.badges:[],n=_n(e.usage),r=sr(e.usage),s=En(e.done_at);return c`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${_d(e.pr_url,e.pr_number)}${s?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${fn(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(o=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(o=>c`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):r?c`<span class="worker-usage" title=${ws(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${ud(e.work_kind)}
            >작업 ${Ps(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Un(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return wg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],s=_n(e.usage),o=sr(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!i,u=l?En(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",w=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,F=e.lane==="done"?"":ua(e.workflow),W=e.lane==="done"?"":fd(e.from_id),K=pa(e.priority),ie=c`<span class="worker-mini__title">${e.title}</span>`,Y=_d(e.pr_url,e.pr_number),j=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",q=r.map(pe=>pe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${pe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${pe===e.completion_badge&&e.completion_title||""}
          >${pe}</span
        >`),z=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",L=s.length>0?s.map(pe=>c`<span class="worker-usage" title=${pe.tooltip}
              >${pe.label}</span
            >`):o?c`<span class="worker-usage" title=${ws(e.usage)}
            >${o}</span
          >`:"",I=a?c`<span
        class="merge-step${a.failed?" merge-step--failed":""}"
        style=${`--progress: ${a.percent}%`}
        >${a.label}${a.index>0?c`<span class="merge-step__n"
              >${a.index}/${a.total}</span
            >`:""}</span
      >`:"",re=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",ge=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",$e=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ce=e.discard,be=ce?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ce?.attempt_id||""}
          data-operation-id=${ce?.operation?.operation_id||""}
          data-discard-mode=${ce?.confirmation||"unmerged"}
          ?disabled=${ce?!ce.enabled:e.discard_enabled===!1}
          title=${ce?ce.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ce?.label||"\uD3D0\uAE30"}
        </button>`:"",we=e.stale_work||null,Ge=we?c`${we.can_resume||we.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${we.action_id}
            ?disabled=${we.locked}
          >
            기존 작업 이어가기
          </button>`:""}${we.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${we.action_id}
            ?disabled=${we.locked}
          >
            백업 후 새로 시작
          </button>`:""}${we.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${we.action_id}
            ?disabled=${we.locked}
          >
            다시 확인
          </button>`:""}`:"",he=we?c`<div class="worker-mini__stale">
        <strong>${we.title}</strong>
        <span>${we.summary}</span>
        <span>${we.cause}</span>
        ${we.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",J=e.revise_action?c`<button
          type="button"
          class="worker-mini__revise-fix"
          data-bead-id=${e.id}
          ?disabled=${e.revise_enabled===!1}
          title=${e.revise_title||"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        >
          finding 수용·수정
        </button>
        <button
          type="button"
          class="worker-mini__revise-approve"
          data-bead-id=${e.id}
          ?disabled=${e.revise_enabled===!1}
          title="델타를 사용자 권한으로 승인해 영수증을 갱신하고 파킹을 해제합니다 (세션 없음)"
        >
          승인하고 진행
        </button>`:"",Re=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),De=da(e.rec),T=b||F||W||Re||De||L?c`<div class="worker-chips">
          ${b}${F}${W}${Re?la(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${De}${L}
        </div>`:"",te=ca(e.dependency_chips),Se=Ms(e),ke=t.actions?t.actions:"",Ne=!!(a||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ce?.operation||e.revise_action||we);return c`<div
    class="worker-mini${i?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${a?" worker-mini--merging":""}${a?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">
            ${b}${w}${K}${W}${Y}${ie}${ke}
          </div>
          <div class="worker-mini__row2">
            ${L}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${fn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${ud(e.work_kind)}
                  >작업 ${Ps(e.work_ms)}</span
                >`:""}${q}${I}
            <span class="worker-mini__actions"
              >${re}${ge}${$e}${be}</span
            >
            ${rs(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${d}${_}${w}${K}${Y}${j}${q}${h}${z}${ke}
            </div>
            <div class="worker-mini__body">${ie}${he}</div>
            ${te}${T}${Ne?c`<div class="worker-mini__foot">
                  ${I}
                  <span class="worker-mini__actions"
                    >${re}${ge}${$e}${be}${J}${Ge}</span
                  >
                  ${Ms(e)}
                </div>`:""}
            ${rs(e)}`:c`<div class="worker-mini__line">
              ${d}${_}${w}${K}${ie}${Y}${j}${q}${h}${z}${I}${re}${ge}${$e}${be}${ke}
            </div>
            ${te}${T}${Se} ${rs(e)}`}
  </div>`}function kg(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var $g={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"};function Fi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,i=$g[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),_=ca(e.dependency_chips),h=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=ua(l),w=fd(e.from_id),F=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${pa(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:a?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${i}
              >세션 권장</span
            >`:""}${da(e.rec)}${vg(l)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?No(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${_}
    ${h||b||w||F?c`<div class="worker-chips">
          ${h}${b}${w}${la(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${kg(t.lanes,e.id)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:c`${e.reason?c`<span
                  class="worker-card__reason${d?" worker-card__reason--danger":""}"
                  >${e.reason}</span
                >`:""}
            <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 드래그의 보완재이지 대체재가
                 아니므로 자격 조건은 드래그와 완전히 같다 — spec 없는 후보만 막고,
                 blocked-with-spec은 드래그와 마찬가지로 적재할 수 있다. 표시 조건
                 (coarse pointer / 좁은 화면)은 CSS가 소유한다. -->
            <button
              type="button"
              class="worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!s}
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":u?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${rs(e)}
  </div>`}function Jn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${Tn(e.id||void 0)}
    data-lane=${e.lane}
  >
    ${e.collapsible?c`<header class="worker-pane__hd">
          <button
            type="button"
            class="worker-pane__toggle"
            data-lane=${e.lane}
            aria-expanded=${t?"false":"true"}
          >
            <span class="worker-pane__caret" aria-hidden="true"
              >${t?"\u25B8":"\u25BE"}</span
            >
            ${r}
          </button>
          ${t||!e.header_control?"":e.header_control}
        </header>`:c`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(s=>e.lane==="candidate"?Fi(s,e.place_menu,{onOpenDoc:e.onOpenDoc}):Un(s))}
          </div>`}
  </section>`}function cd(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function fa(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${cd("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${Tn(r.drop)}
            data-root-dir=${Tn(r.root_dir)}
            data-lane-id=${Tn(r.lane_id)}
            data-lane-length=${Tn(r.lane_length)}
          >
            ${t.rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:t.rows}
          </div>`}
    </section>
    <section
      class="worker-wait__area worker-wait__area--serial${n.collapsed?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="worker-wait__area-hd">
        ${cd("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(s=>xg(s))}
          </div>`}
    </section>
  </div>`}function xg(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Jn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${Tn(t.drop)}
        data-root-dir=${Tn(t.root_dir)}
        data-lane-id=${Tn(t.lane_id)}
        data-lane-length=${Tn(t.lane_length)}
      >
        ${e.rows.length===0?c`<div class="worker-pane__empty">
              비어 있음 — 행을 여기로 드래그
            </div>`:e.rows}
      </div>`})}
    ${e.empty?c`<div class="worker-wait__hint">${e.title} · 비어 있음</div>`:""}
    ${e.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:""}
    ${e.after?e.after:""}
  </div>`}function _a(e){return e.count?c`<section
    class="worker-now${e.live?" worker-pane--live":""}"
    id="worker-now"
  >
    <header class="worker-now__hd">
      <span
        class="worker-pane__dot worker-pane__dot--running"
        aria-hidden="true"
      ></span>
      <span class="worker-now__title">지금</span>
      <span class="worker-now__count">${e.count}</span>
    </header>
    ${e.running_body?e.running_body:""}
    ${e.pr_wait_rows?e.pr_wait_rows:""}
  </section>`:""}var md=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ns=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ma(e,t){let n=md.find(s=>s.step===e);if(!n)return null;let r=md.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function gd(e){let t=Ns.findIndex(n=>n.step===e);return Ns.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Or(e){let t=Ns.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Ag(e){let t=Ns.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ns.length}}function ga(e){let t=Ag(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Bi=new Set(["queued","running","retry_pending","repairing"]),bd=new Set(["failed","succeeded"]),Sg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},qs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Eg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:qs.base_containment,child_sweep:qs.child_sweep,branch_cleanup:qs.branch_cleanup,parent_close:qs.parent_close};function Tg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Cg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Bi,...bd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Rg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function ji(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Sg[s];if(!o)return null;let a=ma(n,`${r} ${o}`);return a?{...a,active:Bi.has(s),failed:s==="failed"}:null}function Og(e){return!e||typeof e!="object"?null:Eg[e.step]||null}function Fs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Og(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=Tg(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(w=>w&&typeof w=="object"&&Cg(w,t,i)).sort(Rg):[],u=a?l:[],d=u.find(w=>Bi.has(w.state));if(d)return ji(d);if(s)return s.step==="repo_operations"&&l[0]?ji(l[0],!0):null;let _=u.find(w=>bd.has(w.state)?w.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return ji(_);if(r){let w=ma(r.step,r.label);return w?{...w,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?qs[e.cleanup_cursor]:null;if(!h)return null;let b=ma(h.step,h.label);return b?{...b,active:!0,failed:!1}:null}function ba(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Lg="\uBBF8\uC801\uC7AC";function Ui(e,t){let n=Mo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function hd(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,a]of e){if(typeof o!="string"||o.length===0)continue;let i=[];for(let l of Array.isArray(a)?a:[]){if(typeof l!="string"||l.length===0)continue;let u=Ui(o,{id:l,location_label:s.get(l)||Lg}),d=n[l];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),i.push(u)}i.length>0&&r.set(o,i)}return r}function Wi(e,t){return`${e}\0${t}`}function yd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function zi(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function js(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function vd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${js(s)})`,location_label:js(s),scope:null,same_lane_ahead:!1};let a=zi(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function wd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Wi(i.root_dir,l.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Wi(i.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=s.get(u);if(b)for(let w of h){let F=r.get(w);F&&F!==u&&!b.includes(F)&&b.push(F)}}let o=(i,l)=>{let u=new Set,d=[i];for(;d.length>0;){let _=d.pop();if(_===l)return!0;!_||u.has(_)||(u.add(_),d.push(...s.get(_)||[]))}return!1},a=new Map;for(let[i,l]of s){let u=[];for(let d of l){let _=n.get(d);o(d,i)&&_&&u.push(_)}u.length>0&&a.set(i,u)}return a}function kd(e,t){return Wi(e,t)}var $d=1,Bs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Gi=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ss={show_blocked:!0,spec:"all"},xd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Ig(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Cr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Mg(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Cr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Pg(e,t){let{winners:n,resumed_from_ids:r}=zu(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,l=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:Pn(e,i.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(i.attempt_id)})}return s}function Ad(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Wt(e){return e&&typeof e=="object"?e:{}}function Dg(e,t,n){let r=Wt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>Cn({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=i(r),u=i(null)}catch{return null}let d=Sd(Rr(l,o),Rr(u,o)),_=Sd(gr(l,null),gr(u,null));return d||_?{orchestration:d,worker:_}:null}function Sd(e,t){return!e||t&&t.text===e.text?null:e}function Ed(e,t){let n=zi(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Ng(e,t,n){let r=t.get(e);if(!r)return Ed(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return js(r)}function qg(e,t,n,r){let s=t.get(e);if(!s)return{label:Ed(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),i=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${i} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":js(s),title:""}}function Fg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function jg(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(a=>o.failed_by_bead.get(a.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(a=>o.armed_by_bead.get(a.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Bg(e,t,n,r,s,o,a){let i=[];return e.forEach((l,u)=>{let d=typeof l.id=="string"?l.id:"";if(d.length===0)return;let _=l.status==="confirmed"?"confirmed":"draft",h=Array.isArray(l.entries)?l.entries:[],b=[];h.forEach((K,ie)=>{let Y=K&&typeof K.bead_id=="string"?K.bead_id:"";if(Y.length===0)return;let j=K&&typeof K.root_dir=="string"?K.root_dir:"",q=n.get(Y),z=q?q.state:void 0,L=z==="running"||z==="pr_wait"||z==="done",I=!q||z==="runnable",re=q&&q.lane==="parallel"&&typeof q.position=="number"?q.position-1:null,ge=qg(Y,n,r,t),$e=b.length>0?b[b.length-1].id:null,ce=_==="confirmed"&&$e!==null&&!(t.get(Y)||[]).includes($e);b.push({id:Y,title:s.get(Y)||Y,root_dir:q?q.root_dir:j,workspace_name:q?q.workspace_name:o.get(j)||"",seq:ie+1,location_label:ge.label,location_title:ge.title,draggable:!L,fixed:L,done:z==="done",unplaced:I,mismatch:ce,...re!==null?{queue_index:re}:{}})}),b.forEach((K,ie)=>{K.seq=ie+1});let w=b.length>0&&b.every(K=>K.done),F=b.filter(K=>!K.fixed&&a.armed_by_bead.get(K.id)!==d).map(K=>K.id),W=jg(d,_,b,w,F,a);i.push({lane_id:d,status:_,draft:_==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:w,can_confirm:_==="draft"&&b.length>=2,has_mismatch:_==="confirmed"&&b.some(K=>K.mismatch||K.unplaced),unlaunched:F,...W})}),i}function Ug(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Wg(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=o.get(u);if(d){d.cards.push(l);continue}let{scope:_,state:h}=Ug(l,t,n);h!==void 0&&(l.scope_state=h),o.set(u,{cards:[l],scope:_})}let a=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let h of l.cards)h.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,_=a.get(d);_?_.push(l):a.set(d,[l])}let i=(l,u,d)=>{let _=u.cards[0],h={id:_.id,title:_.title,location_label:Ng(_.id,r,s),prefixes:d};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(h):b.overlap_chips=[h]};for(let l of a.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let _=na(l[u].scope,l[d].scope);_.length!==0&&(i(l[u],l[d],_),i(l[d],l[u],_))}}function Hi(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ha(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Us(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...ss,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&Bs.some(M=>M.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let M of s)M&&typeof M.root_dir=="string"&&u.set(M.root_dir,M);let d=new Map;for(let M of s)M&&typeof M.root_dir=="string"&&d.set(M.root_dir,M.name||M.root_dir);for(let M of r)M&&typeof M.root_dir=="string"&&d.set(M.root_dir,M.name||M.root_dir);let _=[],h=[],b=[],w=[],F=[],W=[],K=new Map,ie=new Map,Y=new Map,j=new Map,q=new Map,z=new Map,L=new Map,I=new Set,re=new Map,ge=new Map,$e=new Map;for(let M of r){if(!M||typeof M.root_dir!="string")continue;let ae=M.root_dir,Ie=M.name||ae,qe=u.get(ae),Ye=qe&&typeof qe.revision=="number"?qe.revision:typeof M.revision=="number"?M.revision:0,rt=Wt(M.attempts),yt=Wt(M.bead_titles);for(let[E,U]of Object.entries(yt))typeof U=="string"&&U.length>0&&$e.set(E,U);let vt=Wt(M.bead_times),se=Wt(M.pr_observations),X=Wt(M.admission),Ue=Wt(M.revise_parked),dt=Wt(M.merge_queue_state),ze=Wt(M.cleanup_failed),ve=Wt(M.discard_operations),Qe=Wt(M.bead_blocked_by);Object.hasOwn(M,"bead_scope")&&re.set(ae,Wt(M.bead_scope));let ct=Wt(M.bead_workflow),mt=Wt(M.pr_activity),gt=Array.isArray(M.repo_operations)?M.repo_operations:[],zt=Array.isArray(M.merge_queue)?M.merge_queue:[],qt=new Set(zt.filter(E=>E&&typeof E.bead_id=="string").map(E=>E.bead_id)),Kt=new Map(zt.filter(E=>E&&typeof E.bead_id=="string").map(E=>[E.bead_id,E])),Ct=Array.isArray(M.queue)?M.queue:[];for(let E of[...Ct,...Array.isArray(M.pr_wait)?M.pr_wait:[]])E&&typeof E.bead_id=="string"&&typeof E.armed_by_lane=="string"&&E.armed_by_lane.length>0&&z.set(E.bead_id,E.armed_by_lane);for(let E of Array.isArray(M.disarmed_on_load)?M.disarmed_on_load:[])typeof E=="string"&&E.length>0&&I.add(E);let Rt=(Array.isArray(M.serial_lanes)?M.serial_lanes:[]).filter(E=>E&&/^s[1-5]$/.test(E.id)&&Array.isArray(E.entries)),at=Wt(M.lane_states),We=typeof M.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(M.serial_lane_count))):Math.min(5,Rt.length);Y.set(ae,We),j.set(ae,Ct.length);let P=new Map(Rt.map(E=>[E.id,E])),ee=new Map;for(let E of Rt)for(let U of E.entries)U&&typeof U.bead_id=="string"&&ee.set(U.bead_id,E.id);for(let[E,U]of Object.entries(Qe))Array.isArray(U)&&q.set(E,U.filter(xe=>typeof xe=="string"&&xe.length>0));let ye=Array.isArray(M.done)?M.done:[];for(let E of ye)E&&typeof E.bead_id=="string"&&W.push({id:E.bead_id,root_dir:ae,workspace_name:Ie});let O=new Map;for(let E of ye)E&&typeof E.bead_id=="string"&&typeof E.added_at=="number"&&O.set(E.bead_id,E.added_at);let H=E=>({id:E,title:yt[E]||E,root_dir:ae,workspace_name:Ie,expected_revision:Ye,draggable:!1,...Wt(vt[E]).created_at?{created_at:Wt(vt[E]).created_at}:{},...Wt(vt[E]).updated_at?{updated_at:Wt(vt[E]).updated_at}:{}}),Ce=E=>{let U=ct[E]?.chips?.pr;return U&&typeof U.number=="number"&&typeof U.url=="string"?{pr_number:U.number,pr_url:U.url}:{}},A=E=>Object.hasOwn(Qe,E)?{blocked_by:Array.isArray(Qe[E])?Qe[E].filter(U=>typeof U=="string"&&U.length>0):[]}:{},C=new Set;for(let[E,U]of Pg(rt,O)){C.add(E);let xe=U.run_state==="failed"?Fg(rt,U.attempt_id):null;xe!==null&&L.set(E,xe),h.push({...H(E),lane:"running",...A(E),...ee.has(E)?{serial_lane_id:ee.get(E)}:{},attempt_id:U.attempt_id,run_state:U.run_state,status:U.status||void 0,workflow:ct[E]||null,can_pause:U.can_pause,can_resume:U.can_resume,started_at:U.started_at,last_event_at:U.last_event_at,last_activity:U.last_activity,legs:U.legs,runner:U.runner,model:U.model,effort:U.effort,speed:U.speed,resumed_from:U.resumed_from,continuation_mode:U.continuation_mode,usage:U.usage,exec_chips:{orchestration:Is(U),worker:null},discard:Bn(ve,E,{attempt_id:U.attempt_id}),badges:U.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:U.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:U.run_state==="failed"})}for(let[E,U]of Wu(rt)){if(h.some(_e=>_e.id===E))continue;let xe=U.attempt,tt=U.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";h.push({...H(E),lane:"running",kind:"session",...A(E),attempt_id:typeof xe.attempt_id=="string"?xe.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ct[E]||null,can_pause:!1,can_resume:!1,started_at:U.started_at,last_event_at:typeof xe.last_event_at=="number"?xe.last_event_at:null,last_activity:xe.last_activity&&typeof xe.last_activity=="object"?xe.last_activity:null,legs:Array.isArray(xe.legs)?xe.legs:[],runner:typeof xe.runner=="string"?xe.runner:null,model:typeof xe.model=="string"?xe.model:null,effort:typeof xe.effort=="string"?xe.effort:null,speed:typeof xe.speed=="string"?xe.speed:null,resumed_from:null,continuation_mode:null,usage:xe.usage&&typeof xe.usage=="object"?xe.usage:null,exec_chips:{orchestration:Is(xe),worker:null},discard:Bn(ve,E,{merge_queued:!0}),badges:[U.origin==="auto"?`${tt} \xB7 \uC790\uB3D9`:tt],alert:!1})}for(let E of Array.isArray(M.session_active)?M.session_active:[]){let U=E&&E.bead_id;typeof U!="string"||C.has(U)||(C.add(U),Array.isArray(E.blocked_by)&&E.blocked_by.length>0&&q.set(U,E.blocked_by.filter(xe=>typeof xe=="string"&&xe.length>0)),typeof E.title=="string"&&E.title.length>0&&$e.set(U,E.title),h.push({...H(U),title:E.title||yt[U]||U,lane:"running",kind:"session",status:"in_progress",started_at:Hi(E.started_at)??Hi(E.updated_at)??void 0,updated_at:Hi(E.updated_at)??void 0,workflow:E.workflow||null,labels:Array.isArray(E.labels)?E.labels:[],spec_id:typeof E.spec_id=="string"?E.spec_id:"",blocked:E.blocked===!0,...Array.isArray(E.blocked_by)?{blocked_by:E.blocked_by.filter(xe=>typeof xe=="string"&&xe.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(E.session_refs)?E.session_refs:[],badges:[],alert:!1}))}for(let E of Array.isArray(M.pr_wait)?M.pr_wait:[]){let U=E&&E.bead_id;if(typeof U!="string"||C.has(U))continue;C.add(U);let xe=Wt(se[U]),tt=Wt(xe.pr),_e=xe.gate?Wt(xe.gate):null,Xe=qt.has(U),pt=Kt.get(U)?.continuation_action||null,At=!!pt&&pt.continuation===null,Mt=dt.active===U,Zt=E.external===!0,Ft=ze[U]||null,cn=Wt(mt[U]),It=Fs({bead_id:U,merge_sha:E.merge_sha,cleanup_cursor:E.cleanup_cursor,merge_progress:cn.merge_progress||null,cleanup_failed:Ft,repo_operations:gt}),hn=ba(It),yn=!!_e&&_e.base_badge==="\uCDA9\uB3CC",Xt=!!Ft&&["child_sweep","branch_cleanup","parent_close"].includes(Ft.step)&&!!_e&&_e.tier==="merged",sn=Zt&&!!Ft&&!!_e&&_e.tier==="merged",nt=!!_e&&["closed_unmerged","review","undecidable"].includes(_e.tier)&&_e.reason!=="review_receipt_undetermined",Be=Bn(ve,U,{external:Zt,merge_active:Mt||It?.step==="merge",merge_queued:Xe,cleanup_active:hn,merged:!!Ft||_e?.tier==="merged"}),$=!!Be.operation;b.push({...H(U),lane:"pr_wait",...A(U),workflow:ct[U]||null,pr_number:typeof tt.number=="number"?tt.number:null,pr_url:typeof tt.url=="string"?tt.url:void 0,external:Zt,usage:Pn(rt,U),merge_step:It,badges:At?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:It?[_e?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Ft?[Or(Ft.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Or(Ft.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof _e?.gate_badge=="string"&&_e.gate_badge.length>0?[_e.gate_badge]:[],alert:It?It.failed===!0:!!Ft||nt,reason:Ft&&It?.active!==!0?ga(Ft.step):"PR \uB300\uAE30",merge_action:_e?.tier==="merged"&&!Xt&&!sn?!1:!Xe||At,merge_enabled:!$&&(At||_e?.enabled===!0||yn||Xt||sn),merge_label:At?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":sn||Xt?"\uC815\uB9AC \uC7AC\uAC1C":yn&&!Xt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:At?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":$?Be.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Be.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Be.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:sn?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Xt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":yn?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":_e?.enabled===!0?`\uBA38\uC9C0 (${_e.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${_e?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Xe&&!At,cancel_enabled:!Mt,continuation_mismatch:pt?.mismatch||null,discard:Be,discard_action:Be.action,discard_enabled:Be.enabled,discard_title:Be.title})}let Q=(E,U,xe,tt)=>{let _e=E&&E.bead_id;if(typeof _e!="string"||C.has(_e))return null;C.add(_e);let Xe=Ue[_e],pt=Bn(ve,_e),At=pt.operation?pt:null,Mt={...H(_e),lane:U,workflow:ct[_e]||null,draggable:!At,discard:At||void 0,reason:Ad(X,_e),seq:xe+1,queue_position:xe+1,queue_index:xe,queue_length:tt,badges:Xe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Xe,revise_action:!!Xe,revise_enabled:!!Xe&&!At,revise_title:Xe?Xe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Xe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Zt=A(_e);return Object.hasOwn(Zt,"blocked_by")&&(Mt.blocked_by=Zt.blocked_by),Mt};for(let E=0;E<Ct.length;E++){let U=Q(Ct[E],"queue",E,Ct.length);if(!U)continue;w.push(U);let xe=K.get(ae);xe?xe.push(U):K.set(ae,[U])}let me=E=>{let U=b.find(Xe=>Xe.id===E&&Xe.root_dir===ae);if(U)return{id:E,title:U.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let xe=h.find(Xe=>Xe.id===E&&Xe.root_dir===ae),tt=xe?xe.run_state:Ig(rt,E),_e=tt==="failed"||tt==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":tt==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:E,title:xe?xe.title:H(E).title,badge:_e}},oe=[];for(let E=0;E<Math.max(We,Rt.length);E++){let U=`s${E+1}`,xe=P.get(U),tt=xe&&Array.isArray(xe.entries)?xe.entries:[],_e=Wt(at[U]),Xe=Array.isArray(_e.occupied_by)?_e.occupied_by.filter(Mt=>typeof Mt=="string"):[],pt=new Set(Xe),At=[];for(let Mt=0;Mt<tt.length;Mt++){let Zt=tt[Mt]&&tt[Mt].bead_id;if(typeof Zt=="string"&&pt.has(Zt)){C.add(Zt);continue}let Ft=Q(tt[Mt],U,Mt,tt.length);Ft&&(At.push(Ft),w.push(Ft))}At.length===0&&Xe.length===0&&(We<=1||E>=We)||oe.push({id:U,index:E,items:At,raw_length:tt.length,occupied_by:Xe,occupants:Xe.map(Mt=>me(Mt)),corrections:Array.isArray(_e.corrections)?_e.corrections.length:0,cycle:_e.cycle===!0,...At.length===0&&Xe.length===0?{empty:!0}:{}})}ie.set(ae,oe);let Pe=Array.from({length:We},(E,U)=>{let xe=`s${U+1}`,tt=P.get(xe),_e=tt&&Array.isArray(tt.entries)?tt.entries:[],Xe=Wt(at[xe]);return{id:xe,index:_e.length,length:_e.length,occupied_by:Array.isArray(Xe.occupied_by)?Xe.occupied_by.filter(pt=>typeof pt=="string"):[]}});for(let E of Array.isArray(M.runnable)?M.runnable:[]){let U=E&&E.bead_id;if(typeof U!="string"||C.has(U))continue;C.add(U);let xe=E.workflow&&typeof E.workflow=="object"?E.workflow:null,tt=xe&&typeof xe.route=="string"&&xe.route||(typeof E.route=="string"?E.route:null),_e=Dg(Wt(qe),E.exec_pins,tt),Xe=ns(E.rec,E.exec_pins);Array.isArray(E.blocked_by)&&E.blocked_by.length>0&&q.set(U,E.blocked_by.filter(pt=>typeof pt=="string"&&pt.length>0)),typeof E.title=="string"&&E.title.length>0&&$e.set(U,E.title),Array.isArray(E.scope)&&ge.set(U,E.scope.filter(pt=>typeof pt=="string"&&pt.length>0)),_.push({...H(U),title:E.title||yt[U]||U,lane:"runnable",draggable:!0,reason:Ad(X,U),created_at:E.created_at??void 0,updated_at:E.updated_at??void 0,status:typeof E.status=="string"?E.status:void 0,labels:Array.isArray(E.labels)?E.labels:[],spec_id:typeof E.spec_id=="string"?E.spec_id:"",published:E.published===!0,workflow:xe||(tt?{route:tt,chips:{route:tt}}:null),..._e?{exec_chips:_e}:{},...Xe?{rec:Xe}:{},blocked:E.blocked===!0,...Array.isArray(E.blocked_by)?{blocked_by:E.blocked_by.filter(pt=>typeof pt=="string"&&pt.length>0)}:{},place_index:Ct.length,place_lanes:Pe})}for(let E of ye){let U=E&&E.bead_id;if(typeof U!="string"||C.has(U)||(C.add(U),o!==void 0&&typeof E.added_at=="number"&&E.added_at<o))continue;let xe=Mg(rt,U),tt=xe&&typeof xe.done_kind=="string"?xe.done_kind:null;F.push({...H(U),lane:"done",done:!0,done_layout:"three_line",usage:Pn(rt,U),work_ms:oa(rt,U),done_at:typeof E.added_at=="number"?E.added_at:void 0,done_kind:tt,...Ce(U),badges:[...tt&&xd[tt]?[xd[tt]]:[],...sa(rt,U)]})}}let ce=new Map;s.forEach((M,ae)=>{M&&typeof M.root_dir=="string"&&ce.set(M.root_dir,ae)});let be=n&&n.running_sort==="repo"?"repo":"started";h.sort((M,ae)=>{let Ie=M.kind==="session",qe=ae.kind==="session";if(Ie!==qe)return Ie?1:-1;if(Ie&&qe){let yt=ha(ae.updated_at)-ha(M.updated_at);return yt!==0?yt:M.id.localeCompare(ae.id)}if(be==="repo"){let yt=ce.get(M.root_dir)??Number.MAX_SAFE_INTEGER,vt=ce.get(ae.root_dir)??Number.MAX_SAFE_INTEGER;if(yt!==vt)return yt-vt}let Ye=typeof M.started_at=="number"&&Number.isFinite(M.started_at)?M.started_at:null,rt=typeof ae.started_at=="number"&&Number.isFinite(ae.started_at)?ae.started_at:null;return Ye!==null&&rt!==null&&Ye!==rt?Ye-rt:Ye===null&&rt!==null?1:Ye!==null&&rt===null?-1:M.id.localeCompare(ae.id)}),F.sort((M,ae)=>(ae.done_at??0)-(M.done_at??0));let we=s.length>0?s:r.map(M=>({root_dir:M&&M.root_dir,name:M&&M.name,auto_advance:M&&M.auto_advance,auto_merge:M&&M.auto_merge,slots:M&&M.slots,revision:M&&M.revision,runner_catalog:M&&M.runner_catalog})),Ge=new Set(_.map(M=>M.root_dir)),he=[];for(let M of we){if(!M||typeof M.root_dir!="string")continue;let ae=K.get(M.root_dir)||[],Ie=ie.get(M.root_dir)||[];!(ae.length>0||Ie.some(Ye=>Ye.items.length>0||Ye.occupied_by.length>0))&&!Ge.has(M.root_dir)||he.push({root_dir:M.root_dir,name:M.name||M.root_dir,auto_advance:M.auto_advance===!0,auto_merge:M.auto_merge===!0,slots:typeof M.slots=="number"&&M.slots>=$d?M.slots:$d,revision:typeof M.revision=="number"?M.revision:0,runner_catalog:Wt(M.runner_catalog),items:ae,sublanes:{parallel:ae,serial:Ie},serial_lane_count:Y.get(M.root_dir)||0,raw_queue_length:j.get(M.root_dir)||0})}let J={runnable:_,runnable_all:_,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:w,queue_groups:he,running:h,pr_wait:b,done:F,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(j),owner_of:{}},Re=yd(J);for(let M of W)Re.has(M.id)||Re.set(M.id,{root_dir:M.root_dir,workspace_name:M.workspace_name,lane:"done",state:"done"});for(let M of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){if(!Object.hasOwn(M,"blocked_by"))continue;let ae=Re.get(M.id);M.blockers=(M.blocked_by||[]).map(Ie=>vd(Ie,ae,Re,s))}for(let M of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){let ae=(M.blockers||[]).map(qe=>{let Ye=Re.get(qe.id)?.root_dir;return{...Ui(M.id,qe),openable:!0,...typeof Ye=="string"&&Ye.length>0?{root_dir:Ye}:{}}});if(ae.length===0)continue;let Ie={predecessors:ae};M.dependency_chips=Ie}Wg(J,re,ge,Re,s);let De=wd(J.queue_groups);for(let M of J.queue_groups)for(let ae of M.sublanes.serial){let Ie=De.get(kd(M.root_dir,ae.id));Ie&&(ae.cross_wait_peers=Ie)}J.chain_lanes=Bg(i&&Array.isArray(i.lanes)?i.lanes:[],q,Re,s,$e,d,{armed_by_bead:z,failed_by_bead:L,disarmed_lanes:I});let T=new Map;for(let M of[...J.queue,...J.runnable])T.has(M.id)||T.set(M.id,M);let te=new Set;for(let M of J.chain_lanes)for(let ae of M.rows){if(M.status==="confirmed"&&!ae.unplaced&&!ae.fixed&&te.add(ae.id),!M.draft&&!ae.unplaced)continue;let Ie=T.get(ae.id);Ie&&(Ie.cross_lane_chip={lane_id:M.lane_id,number:M.number,status:M.status,label:M.draft?`\uC5F0\uACB0 ${M.number} (draft)`:`\uC5F0\uACB0 ${M.number}`})}let Se=new Map(J.chain_lanes.map(M=>[M.lane_id,M.number]));for(let M of[...J.queue,...J.running]){let ae=z.get(M.id);if(typeof ae!="string"||ae.length===0)continue;let Ie=Se.get(ae);M.armed_lane_chip=Ie===void 0?{lane_id:ae,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:ae,label:`\u25B6 \uC5F0\uACB0 ${Ie}`,orphan:!1}}let ke=[];for(let M of K.values())for(let ae of M)te.has(ae.id)||ke.push(ae);ke.sort((M,ae)=>{let Ie=M.workspace_name.localeCompare(ae.workspace_name);return Ie!==0?Ie:(M.queue_index??0)-(ae.queue_index??0)}),J.parallel_rows=ke;let Ne={};for(let[M,ae]of Re)typeof ae.root_dir=="string"&&ae.root_dir.length>0&&(Ne[M]=ae.root_dir);for(let M of J.chain_lanes)for(let ae of M.rows)!Object.hasOwn(Ne,ae.id)&&ae.root_dir.length>0&&d.has(ae.root_dir)&&(Ne[ae.id]=ae.root_dir);J.owner_of=Ne;let pe=J.runnable.length;J.runnable_all=J.runnable.slice();let Le=J.runnable;a.show_blocked||(Le=Le.filter(M=>M.blocked!==!0));let et=Le.length;a.spec==="with"?Le=Le.filter(M=>M.published===!0):a.spec==="without"&&(Le=Le.filter(M=>M.published!==!0)),J.runnable_hidden={blocked:pe-et,spec:et-Le.length};let Et=(M,ae)=>{let Ie=ha(ae.updated_at)-ha(M.updated_at);return Ie!==0?Ie:M.id.localeCompare(ae.id)},ht=l==="repo_spec"?(M,ae)=>{let Ie=M.published===!0?0:1,qe=ae.published===!0?0:1;return Ie!==qe?Ie-qe:Et(M,ae)}:Et;if(l==="updated_flat")J.runnable=Le.slice().sort(Et),J.runnable_sections=[];else{let M=new Map;for(let qe of Le){let Ye=M.get(qe.root_dir);Ye?Ye.push(qe):M.set(qe.root_dir,[qe])}let ae=[],Ie=[];for(let qe of we){if(!qe||typeof qe.root_dir!="string")continue;let Ye=(M.get(qe.root_dir)||[]).slice().sort(ht);M.delete(qe.root_dir),Ye.length!==0&&(ae.push({root_dir:qe.root_dir,name:qe.name||qe.root_dir,items:Ye.map(rt=>({...rt,workspace_name:""}))}),Ie.push(...Ye))}for(let[qe,Ye]of M){let rt=Ye.slice().sort(ht);ae.push({root_dir:qe,name:rt[0]?.workspace_name||qe,items:rt.map(yt=>({...yt,workspace_name:""}))}),Ie.push(...rt)}J.runnable=Ie,J.runnable_sections=ae}return J}var zg="\uC0AC\uC774\uD074";function Hg(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(s=>typeof s=="string"&&s.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let s=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[o,a]of Object.entries(s))Array.isArray(a)&&t.set(o,n(a));for(let o of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])o&&typeof o.bead_id=="string"&&Array.isArray(o.blocked_by)&&o.blocked_by.length>0&&t.set(o.bead_id,n(o.blocked_by))}return t}function Ki(e,t,n){let r=Us(e,t),s=[],o=new Set,a=(l,u)=>{for(let d of l)o.has(d.id)||(o.add(d.id),s.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};a(r.running,"running"),a(r.pr_wait,"pr_wait"),a(r.queue,"queue"),a(r.runnable_all,"runnable");let i=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:i===null?s:s.filter(l=>l.root_dir===i),blocked_by_map:Hg(e)}}function Td(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=Si(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:zg}:{}})}return o.sort((a,i)=>{let l=r!==void 0&&a.root_dir===r,u=r!==void 0&&i.root_dir===r;return l!==u?l?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function Cd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:qd,setPrototypeOf:Rd,isFrozen:Gg,getPrototypeOf:Kg,getOwnPropertyDescriptor:Vg}=Object,{freeze:$n,seal:Dn,create:el}=Object,{apply:tl,construct:nl}=typeof Reflect<"u"&&Reflect;$n||($n=function(t){return t});Dn||(Dn=function(t){return t});tl||(tl=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});nl||(nl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var ya=xn(Array.prototype.forEach),Yg=xn(Array.prototype.lastIndexOf),Od=xn(Array.prototype.pop),Ws=xn(Array.prototype.push),Zg=xn(Array.prototype.splice),wa=xn(String.prototype.toLowerCase),Vi=xn(String.prototype.toString),Yi=xn(String.prototype.match),zs=xn(String.prototype.replace),Xg=xn(String.prototype.indexOf),Qg=xn(String.prototype.trim),Wn=xn(Object.prototype.hasOwnProperty),kn=xn(RegExp.prototype.test),Hs=Jg(TypeError);function xn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return tl(e,t,r)}}function Jg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return nl(e,n)}}function $t(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:wa;Rd&&Rd(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(Gg(t)||(t[r]=o),s=o)}e[s]=!0}return e}function eb(e){for(let t=0;t<e.length;t++)Wn(e,t)||(e[t]=null);return e}function ar(e){let t=el(null);for(let[n,r]of qd(e))Wn(e,n)&&(Array.isArray(r)?t[n]=eb(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=ar(r):t[n]=r);return t}function Gs(e,t){for(;e!==null;){let r=Vg(e,t);if(r){if(r.get)return xn(r.get);if(typeof r.value=="function")return xn(r.value)}e=Kg(e)}function n(){return null}return n}var Ld=$n(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Zi=$n(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Xi=$n(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),tb=$n(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Qi=$n(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),nb=$n(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Id=$n(["#text"]),Md=$n(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ji=$n(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Pd=$n(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),va=$n(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),rb=Dn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),sb=Dn(/<%[\w\W]*|[\w\W]*%>/gm),ob=Dn(/\$\{[\w\W]*/gm),ab=Dn(/^data-[\-\w.\u00B7-\uFFFF]+$/),ib=Dn(/^aria-[\-\w]+$/),Fd=Dn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),lb=Dn(/^(?:\w+script|data):/i),cb=Dn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),jd=Dn(/^html$/i),ub=Dn(/^[a-z][.\w]*(-[.\w]+)+$/i),Dd=Object.freeze({__proto__:null,ARIA_ATTR:ib,ATTR_WHITESPACE:cb,CUSTOM_ELEMENT:ub,DATA_ATTR:ab,DOCTYPE_NAME:jd,ERB_EXPR:sb,IS_ALLOWED_URI:Fd,IS_SCRIPT_OR_DATA:lb,MUSTACHE_EXPR:rb,TMPLIT_EXPR:ob}),Ks={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},db=function(){return typeof window>"u"?null:window},pb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Nd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Bd(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:db(),t=Be=>Bd(Be);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Ks.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:b}=e,w=l.prototype,F=Gs(w,"cloneNode"),W=Gs(w,"remove"),K=Gs(w,"nextSibling"),ie=Gs(w,"childNodes"),Y=Gs(w,"parentNode");if(typeof a=="function"){let Be=n.createElement("template");Be.content&&Be.content.ownerDocument&&(n=Be.content.ownerDocument)}let j,q="",{implementation:z,createNodeIterator:L,createDocumentFragment:I,getElementsByTagName:re}=n,{importNode:ge}=r,$e=Nd();t.isSupported=typeof qd=="function"&&typeof Y=="function"&&z&&z.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ce,ERB_EXPR:be,TMPLIT_EXPR:we,DATA_ATTR:Ge,ARIA_ATTR:he,IS_SCRIPT_OR_DATA:J,ATTR_WHITESPACE:Re,CUSTOM_ELEMENT:De}=Dd,{IS_ALLOWED_URI:T}=Dd,te=null,Se=$t({},[...Ld,...Zi,...Xi,...Qi,...Id]),ke=null,Ne=$t({},[...Md,...Ji,...Pd,...va]),pe=Object.seal(el(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Le=null,et=null,Et=Object.seal(el(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),xt=!0,ht=!0,M=!1,ae=!0,Ie=!1,qe=!0,Ye=!1,rt=!1,yt=!1,vt=!1,se=!1,X=!1,Ue=!0,dt=!1,ze="user-content-",ve=!0,Qe=!1,ct={},mt=null,gt=$t({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),zt=null,qt=$t({},["audio","video","img","source","image","track"]),Kt=null,Ct=$t({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Rt="http://www.w3.org/1998/Math/MathML",at="http://www.w3.org/2000/svg",We="http://www.w3.org/1999/xhtml",P=We,ee=!1,ye=null,O=$t({},[Rt,at,We],Vi),H=$t({},["mi","mo","mn","ms","mtext"]),Ce=$t({},["annotation-xml"]),A=$t({},["title","style","font","a","script"]),C=null,Q=["application/xhtml+xml","text/html"],me="text/html",oe=null,Pe=null,E=n.createElement("form"),U=function($){return $ instanceof RegExp||$ instanceof Function},xe=function(){let $=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Pe&&Pe===$)){if((!$||typeof $!="object")&&($={}),$=ar($),C=Q.indexOf($.PARSER_MEDIA_TYPE)===-1?me:$.PARSER_MEDIA_TYPE,oe=C==="application/xhtml+xml"?Vi:wa,te=Wn($,"ALLOWED_TAGS")?$t({},$.ALLOWED_TAGS,oe):Se,ke=Wn($,"ALLOWED_ATTR")?$t({},$.ALLOWED_ATTR,oe):Ne,ye=Wn($,"ALLOWED_NAMESPACES")?$t({},$.ALLOWED_NAMESPACES,Vi):O,Kt=Wn($,"ADD_URI_SAFE_ATTR")?$t(ar(Ct),$.ADD_URI_SAFE_ATTR,oe):Ct,zt=Wn($,"ADD_DATA_URI_TAGS")?$t(ar(qt),$.ADD_DATA_URI_TAGS,oe):qt,mt=Wn($,"FORBID_CONTENTS")?$t({},$.FORBID_CONTENTS,oe):gt,Le=Wn($,"FORBID_TAGS")?$t({},$.FORBID_TAGS,oe):ar({}),et=Wn($,"FORBID_ATTR")?$t({},$.FORBID_ATTR,oe):ar({}),ct=Wn($,"USE_PROFILES")?$.USE_PROFILES:!1,xt=$.ALLOW_ARIA_ATTR!==!1,ht=$.ALLOW_DATA_ATTR!==!1,M=$.ALLOW_UNKNOWN_PROTOCOLS||!1,ae=$.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ie=$.SAFE_FOR_TEMPLATES||!1,qe=$.SAFE_FOR_XML!==!1,Ye=$.WHOLE_DOCUMENT||!1,vt=$.RETURN_DOM||!1,se=$.RETURN_DOM_FRAGMENT||!1,X=$.RETURN_TRUSTED_TYPE||!1,yt=$.FORCE_BODY||!1,Ue=$.SANITIZE_DOM!==!1,dt=$.SANITIZE_NAMED_PROPS||!1,ve=$.KEEP_CONTENT!==!1,Qe=$.IN_PLACE||!1,T=$.ALLOWED_URI_REGEXP||Fd,P=$.NAMESPACE||We,H=$.MATHML_TEXT_INTEGRATION_POINTS||H,Ce=$.HTML_INTEGRATION_POINTS||Ce,pe=$.CUSTOM_ELEMENT_HANDLING||{},$.CUSTOM_ELEMENT_HANDLING&&U($.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(pe.tagNameCheck=$.CUSTOM_ELEMENT_HANDLING.tagNameCheck),$.CUSTOM_ELEMENT_HANDLING&&U($.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(pe.attributeNameCheck=$.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),$.CUSTOM_ELEMENT_HANDLING&&typeof $.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(pe.allowCustomizedBuiltInElements=$.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ie&&(ht=!1),se&&(vt=!0),ct&&(te=$t({},Id),ke=[],ct.html===!0&&($t(te,Ld),$t(ke,Md)),ct.svg===!0&&($t(te,Zi),$t(ke,Ji),$t(ke,va)),ct.svgFilters===!0&&($t(te,Xi),$t(ke,Ji),$t(ke,va)),ct.mathMl===!0&&($t(te,Qi),$t(ke,Pd),$t(ke,va))),$.ADD_TAGS&&(typeof $.ADD_TAGS=="function"?Et.tagCheck=$.ADD_TAGS:(te===Se&&(te=ar(te)),$t(te,$.ADD_TAGS,oe))),$.ADD_ATTR&&(typeof $.ADD_ATTR=="function"?Et.attributeCheck=$.ADD_ATTR:(ke===Ne&&(ke=ar(ke)),$t(ke,$.ADD_ATTR,oe))),$.ADD_URI_SAFE_ATTR&&$t(Kt,$.ADD_URI_SAFE_ATTR,oe),$.FORBID_CONTENTS&&(mt===gt&&(mt=ar(mt)),$t(mt,$.FORBID_CONTENTS,oe)),ve&&(te["#text"]=!0),Ye&&$t(te,["html","head","body"]),te.table&&($t(te,["tbody"]),delete Le.tbody),$.TRUSTED_TYPES_POLICY){if(typeof $.TRUSTED_TYPES_POLICY.createHTML!="function")throw Hs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof $.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Hs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=$.TRUSTED_TYPES_POLICY,q=j.createHTML("")}else j===void 0&&(j=pb(b,s)),j!==null&&typeof q=="string"&&(q=j.createHTML(""));$n&&$n($),Pe=$}},tt=$t({},[...Zi,...Xi,...tb]),_e=$t({},[...Qi,...nb]),Xe=function($){let fe=Y($);(!fe||!fe.tagName)&&(fe={namespaceURI:P,tagName:"template"});let Fe=wa($.tagName),kt=wa(fe.tagName);return ye[$.namespaceURI]?$.namespaceURI===at?fe.namespaceURI===We?Fe==="svg":fe.namespaceURI===Rt?Fe==="svg"&&(kt==="annotation-xml"||H[kt]):!!tt[Fe]:$.namespaceURI===Rt?fe.namespaceURI===We?Fe==="math":fe.namespaceURI===at?Fe==="math"&&Ce[kt]:!!_e[Fe]:$.namespaceURI===We?fe.namespaceURI===at&&!Ce[kt]||fe.namespaceURI===Rt&&!H[kt]?!1:!_e[Fe]&&(A[Fe]||!tt[Fe]):!!(C==="application/xhtml+xml"&&ye[$.namespaceURI]):!1},pt=function($){Ws(t.removed,{element:$});try{Y($).removeChild($)}catch{W($)}},At=function($,fe){try{Ws(t.removed,{attribute:fe.getAttributeNode($),from:fe})}catch{Ws(t.removed,{attribute:null,from:fe})}if(fe.removeAttribute($),$==="is")if(vt||se)try{pt(fe)}catch{}else try{fe.setAttribute($,"")}catch{}},Mt=function($){let fe=null,Fe=null;if(yt)$="<remove></remove>"+$;else{let Ot=Yi($,/^[\r\n\t ]+/);Fe=Ot&&Ot[0]}C==="application/xhtml+xml"&&P===We&&($='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+$+"</body></html>");let kt=j?j.createHTML($):$;if(P===We)try{fe=new h().parseFromString(kt,C)}catch{}if(!fe||!fe.documentElement){fe=z.createDocument(P,"template",null);try{fe.documentElement.innerHTML=ee?q:kt}catch{}}let jt=fe.body||fe.documentElement;return $&&Fe&&jt.insertBefore(n.createTextNode(Fe),jt.childNodes[0]||null),P===We?re.call(fe,Ye?"html":"body")[0]:Ye?fe.documentElement:jt},Zt=function($){return L.call($.ownerDocument||$,$,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Ft=function($){return $ instanceof _&&(typeof $.nodeName!="string"||typeof $.textContent!="string"||typeof $.removeChild!="function"||!($.attributes instanceof d)||typeof $.removeAttribute!="function"||typeof $.setAttribute!="function"||typeof $.namespaceURI!="string"||typeof $.insertBefore!="function"||typeof $.hasChildNodes!="function")},cn=function($){return typeof i=="function"&&$ instanceof i};function It(Be,$,fe){ya(Be,Fe=>{Fe.call(t,$,fe,Pe)})}let hn=function($){let fe=null;if(It($e.beforeSanitizeElements,$,null),Ft($))return pt($),!0;let Fe=oe($.nodeName);if(It($e.uponSanitizeElement,$,{tagName:Fe,allowedTags:te}),qe&&$.hasChildNodes()&&!cn($.firstElementChild)&&kn(/<[/\w!]/g,$.innerHTML)&&kn(/<[/\w!]/g,$.textContent)||$.nodeType===Ks.progressingInstruction||qe&&$.nodeType===Ks.comment&&kn(/<[/\w]/g,$.data))return pt($),!0;if(!(Et.tagCheck instanceof Function&&Et.tagCheck(Fe))&&(!te[Fe]||Le[Fe])){if(!Le[Fe]&&Xt(Fe)&&(pe.tagNameCheck instanceof RegExp&&kn(pe.tagNameCheck,Fe)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(Fe)))return!1;if(ve&&!mt[Fe]){let kt=Y($)||$.parentNode,jt=ie($)||$.childNodes;if(jt&&kt){let Ot=jt.length;for(let en=Ot-1;en>=0;--en){let on=F(jt[en],!0);on.__removalCount=($.__removalCount||0)+1,kt.insertBefore(on,K($))}}}return pt($),!0}return $ instanceof l&&!Xe($)||(Fe==="noscript"||Fe==="noembed"||Fe==="noframes")&&kn(/<\/no(script|embed|frames)/i,$.innerHTML)?(pt($),!0):(Ie&&$.nodeType===Ks.text&&(fe=$.textContent,ya([ce,be,we],kt=>{fe=zs(fe,kt," ")}),$.textContent!==fe&&(Ws(t.removed,{element:$.cloneNode()}),$.textContent=fe)),It($e.afterSanitizeElements,$,null),!1)},yn=function($,fe,Fe){if(Ue&&(fe==="id"||fe==="name")&&(Fe in n||Fe in E))return!1;if(!(ht&&!et[fe]&&kn(Ge,fe))){if(!(xt&&kn(he,fe))){if(!(Et.attributeCheck instanceof Function&&Et.attributeCheck(fe,$))){if(!ke[fe]||et[fe]){if(!(Xt($)&&(pe.tagNameCheck instanceof RegExp&&kn(pe.tagNameCheck,$)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck($))&&(pe.attributeNameCheck instanceof RegExp&&kn(pe.attributeNameCheck,fe)||pe.attributeNameCheck instanceof Function&&pe.attributeNameCheck(fe,$))||fe==="is"&&pe.allowCustomizedBuiltInElements&&(pe.tagNameCheck instanceof RegExp&&kn(pe.tagNameCheck,Fe)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(Fe))))return!1}else if(!Kt[fe]){if(!kn(T,zs(Fe,Re,""))){if(!((fe==="src"||fe==="xlink:href"||fe==="href")&&$!=="script"&&Xg(Fe,"data:")===0&&zt[$])){if(!(M&&!kn(J,zs(Fe,Re,"")))){if(Fe)return!1}}}}}}}return!0},Xt=function($){return $!=="annotation-xml"&&Yi($,De)},sn=function($){It($e.beforeSanitizeAttributes,$,null);let{attributes:fe}=$;if(!fe||Ft($))return;let Fe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ke,forceKeepAttr:void 0},kt=fe.length;for(;kt--;){let jt=fe[kt],{name:Ot,namespaceURI:en,value:on}=jt,un=oe(Ot),vn=on,Ht=Ot==="value"?vn:Qg(vn);if(Fe.attrName=un,Fe.attrValue=Ht,Fe.keepAttr=!0,Fe.forceKeepAttr=void 0,It($e.uponSanitizeAttribute,$,Fe),Ht=Fe.attrValue,dt&&(un==="id"||un==="name")&&(At(Ot,$),Ht=ze+Ht),qe&&kn(/((--!?|])>)|<\/(style|title|textarea)/i,Ht)){At(Ot,$);continue}if(un==="attributename"&&Yi(Ht,"href")){At(Ot,$);continue}if(Fe.forceKeepAttr)continue;if(!Fe.keepAttr){At(Ot,$);continue}if(!ae&&kn(/\/>/i,Ht)){At(Ot,$);continue}Ie&&ya([ce,be,we],gn=>{Ht=zs(Ht,gn," ")});let dn=oe($.nodeName);if(!yn(dn,un,Ht)){At(Ot,$);continue}if(j&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!en)switch(b.getAttributeType(dn,un)){case"TrustedHTML":{Ht=j.createHTML(Ht);break}case"TrustedScriptURL":{Ht=j.createScriptURL(Ht);break}}if(Ht!==vn)try{en?$.setAttributeNS(en,Ot,Ht):$.setAttribute(Ot,Ht),Ft($)?pt($):Od(t.removed)}catch{At(Ot,$)}}It($e.afterSanitizeAttributes,$,null)},nt=function Be($){let fe=null,Fe=Zt($);for(It($e.beforeSanitizeShadowDOM,$,null);fe=Fe.nextNode();)It($e.uponSanitizeShadowNode,fe,null),hn(fe),sn(fe),fe.content instanceof o&&Be(fe.content);It($e.afterSanitizeShadowDOM,$,null)};return t.sanitize=function(Be){let $=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},fe=null,Fe=null,kt=null,jt=null;if(ee=!Be,ee&&(Be="<!-->"),typeof Be!="string"&&!cn(Be))if(typeof Be.toString=="function"){if(Be=Be.toString(),typeof Be!="string")throw Hs("dirty is not a string, aborting")}else throw Hs("toString is not a function");if(!t.isSupported)return Be;if(rt||xe($),t.removed=[],typeof Be=="string"&&(Qe=!1),Qe){if(Be.nodeName){let on=oe(Be.nodeName);if(!te[on]||Le[on])throw Hs("root node is forbidden and cannot be sanitized in-place")}}else if(Be instanceof i)fe=Mt("<!---->"),Fe=fe.ownerDocument.importNode(Be,!0),Fe.nodeType===Ks.element&&Fe.nodeName==="BODY"||Fe.nodeName==="HTML"?fe=Fe:fe.appendChild(Fe);else{if(!vt&&!Ie&&!Ye&&Be.indexOf("<")===-1)return j&&X?j.createHTML(Be):Be;if(fe=Mt(Be),!fe)return vt?null:X?q:""}fe&&yt&&pt(fe.firstChild);let Ot=Zt(Qe?Be:fe);for(;kt=Ot.nextNode();)hn(kt),sn(kt),kt.content instanceof o&&nt(kt.content);if(Qe)return Be;if(vt){if(se)for(jt=I.call(fe.ownerDocument);fe.firstChild;)jt.appendChild(fe.firstChild);else jt=fe;return(ke.shadowroot||ke.shadowrootmode)&&(jt=ge.call(r,jt,!0)),jt}let en=Ye?fe.outerHTML:fe.innerHTML;return Ye&&te["!doctype"]&&fe.ownerDocument&&fe.ownerDocument.doctype&&fe.ownerDocument.doctype.name&&kn(jd,fe.ownerDocument.doctype.name)&&(en="<!DOCTYPE "+fe.ownerDocument.doctype.name+`>
`+en),Ie&&ya([ce,be,we],on=>{en=zs(en,on," ")}),j&&X?j.createHTML(en):en},t.setConfig=function(){let Be=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xe(Be),rt=!0},t.clearConfig=function(){Pe=null,rt=!1},t.isValidAttribute=function(Be,$,fe){Pe||xe({});let Fe=oe(Be),kt=oe($);return yn(Fe,kt,fe)},t.addHook=function(Be,$){typeof $=="function"&&Ws($e[Be],$)},t.removeHook=function(Be,$){if($!==void 0){let fe=Yg($e[Be],$);return fe===-1?void 0:Zg($e[Be],fe,1)[0]}return Od($e[Be])},t.removeHooks=function(Be){$e[Be]=[]},t.removeAllHooks=function(){$e=Nd()},t}var Ud=Bd();var ir={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ka=e=>(...t)=>({_$litDirective$:e,values:t}),os=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Vs=class extends os{constructor(t){if(super(t),this.it=Vt,t.type!==ir.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Vt||t==null)return this._t=void 0,this.it=t;if(t===Mn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Vs.directiveName="unsafeHTML",Vs.resultType=1;var Wd=ka(Vs);function al(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ir=al();function Zd(e){Ir=e}var Qs={exec:()=>null};function Lt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(An.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var fb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),An={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},_b=/^(?:[ \t]*(?:\n|$))+/,mb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,gb=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Js=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,bb=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,il=/(?:[*+-]|\d{1,9}[.)])/,Xd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Qd=Lt(Xd).replace(/bull/g,il).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),hb=Lt(Xd).replace(/bull/g,il).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ll=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,yb=/^[^\n]+/,cl=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,vb=Lt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",cl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),wb=Lt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,il).getRegex(),Ta="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ul=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,kb=Lt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ul).replace("tag",Ta).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Jd=Lt(ll).replace("hr",Js).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ta).getRegex(),$b=Lt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Jd).getRegex(),dl={blockquote:$b,code:mb,def:vb,fences:gb,heading:bb,hr:Js,html:kb,lheading:Qd,list:wb,newline:_b,paragraph:Jd,table:Qs,text:yb},zd=Lt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Js).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ta).getRegex(),xb={...dl,lheading:hb,table:zd,paragraph:Lt(ll).replace("hr",Js).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",zd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ta).getRegex()},Ab={...dl,html:Lt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ul).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Qs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Lt(ll).replace("hr",Js).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Qd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Sb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Eb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ep=/^( {2,}|\\)\n(?!\s*$)/,Tb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ca=/[\p{P}\p{S}]/u,pl=/[\s\p{P}\p{S}]/u,tp=/[^\s\p{P}\p{S}]/u,Cb=Lt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,pl).getRegex(),np=/(?!~)[\p{P}\p{S}]/u,Rb=/(?!~)[\s\p{P}\p{S}]/u,Ob=/(?:[^\s\p{P}\p{S}]|~)/u,Lb=Lt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",fb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),rp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ib=Lt(rp,"u").replace(/punct/g,Ca).getRegex(),Mb=Lt(rp,"u").replace(/punct/g,np).getRegex(),sp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Pb=Lt(sp,"gu").replace(/notPunctSpace/g,tp).replace(/punctSpace/g,pl).replace(/punct/g,Ca).getRegex(),Db=Lt(sp,"gu").replace(/notPunctSpace/g,Ob).replace(/punctSpace/g,Rb).replace(/punct/g,np).getRegex(),Nb=Lt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,tp).replace(/punctSpace/g,pl).replace(/punct/g,Ca).getRegex(),qb=Lt(/\\(punct)/,"gu").replace(/punct/g,Ca).getRegex(),Fb=Lt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),jb=Lt(ul).replace("(?:-->|$)","-->").getRegex(),Bb=Lt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",jb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Aa=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ub=Lt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Aa).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),op=Lt(/^!?\[(label)\]\[(ref)\]/).replace("label",Aa).replace("ref",cl).getRegex(),ap=Lt(/^!?\[(ref)\](?:\[\])?/).replace("ref",cl).getRegex(),Wb=Lt("reflink|nolink(?!\\()","g").replace("reflink",op).replace("nolink",ap).getRegex(),Hd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,fl={_backpedal:Qs,anyPunctuation:qb,autolink:Fb,blockSkip:Lb,br:ep,code:Eb,del:Qs,emStrongLDelim:Ib,emStrongRDelimAst:Pb,emStrongRDelimUnd:Nb,escape:Sb,link:Ub,nolink:ap,punctuation:Cb,reflink:op,reflinkSearch:Wb,tag:Bb,text:Tb,url:Qs},zb={...fl,link:Lt(/^!?\[(label)\]\((.*?)\)/).replace("label",Aa).getRegex(),reflink:Lt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Aa).getRegex()},rl={...fl,emStrongRDelimAst:Db,emStrongLDelim:Mb,url:Lt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Hd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Lt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Hd).getRegex()},Hb={...rl,br:Lt(ep).replace("{2,}","*").getRegex(),text:Lt(rl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},$a={normal:dl,gfm:xb,pedantic:Ab},Ys={normal:fl,gfm:rl,breaks:Hb,pedantic:zb},Gb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Gd=e=>Gb[e];function lr(e,t){if(t){if(An.escapeTest.test(e))return e.replace(An.escapeReplace,Gd)}else if(An.escapeTestNoEncode.test(e))return e.replace(An.escapeReplaceNoEncode,Gd);return e}function Kd(e){try{e=encodeURI(e).replace(An.percentDecode,"%")}catch{return null}return e}function Vd(e,t){let n=e.replace(An.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(An.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(An.slashPipe,"|");return r}function Zs(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Kb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Yd(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,l}function Vb(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Sa=class{constructor(e){Bt(this,"options");Bt(this,"rules");Bt(this,"lexer");this.options=e||Ir}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Zs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Vb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Zs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Zs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Zs(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))i.push(n[l]),a=!0;else if(!a)i.push(n[l]);else break;n=n.slice(l);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=_,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let b=h,w=b.raw+`
`+n.join(`
`),F=this.blockquote(w);o[o.length-1]=F,r=r.substring(0,r.length-b.raw.length)+F.raw,s=s.substring(0,s.length-b.text.length)+F.text;break}else if(h?.type==="list"){let b=h,w=b.raw+`
`+n.join(`
`),F=this.list(w);o[o.length-1]=F,r=r.substring(0,r.length-h.raw.length)+F.raw,s=s.substring(0,s.length-b.raw.length)+F.raw,n=w.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,F=>" ".repeat(3*F.length)),h=e.split(`
`,1)[0],b=!_.trim(),w=0;if(this.options.pedantic?(w=2,d=_.trimStart()):b?w=t[1].length+1:(w=t[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,d=_.slice(w),w+=t[1].length),b&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let F=this.rules.other.nextBulletRegex(w),W=this.rules.other.hrRegex(w),K=this.rules.other.fencesBeginRegex(w),ie=this.rules.other.headingBeginRegex(w),Y=this.rules.other.htmlBeginRegex(w);for(;e;){let j=e.split(`
`,1)[0],q;if(h=j,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),q=h):q=h.replace(this.rules.other.tabCharGlobal,"    "),K.test(h)||ie.test(h)||Y.test(h)||F.test(h)||W.test(h))break;if(q.search(this.rules.other.nonSpaceChar)>=w||!h.trim())d+=`
`+q.slice(w);else{if(b||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(_)||ie.test(_)||W.test(_))break;d+=`
`+h}!b&&!h.trim()&&(b=!0),u+=j+`
`,e=e.substring(j.length+1),_=q.slice(w)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(_=>_.type==="space"),d=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Vd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Vd(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Zs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Kb(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Yd(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Yd(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let d=[...r[0]][0].length,_=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let b=_.slice(1,-1);return{type:"em",raw:_,text:b,tokens:this.lexer.inlineTokens(b)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},zn=class sl{constructor(t){Bt(this,"tokens");Bt(this,"options");Bt(this,"state");Bt(this,"inlineQueue");Bt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ir,this.options.tokenizer=this.options.tokenizer||new Sa,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:An,block:$a.normal,inline:Ys.normal};this.options.pedantic?(n.block=$a.pedantic,n.inline=Ys.pedantic):this.options.gfm&&(n.block=$a.gfm,this.options.breaks?n.inline=Ys.breaks:n.inline=Ys.gfm),this.tokenizer.rules=n}static get rules(){return{block:$a,inline:Ys}}static lex(t,n){return new sl(n).lex(t)}static lexInline(t,n){return new sl(n).inlineTokens(t)}lex(t){t=t.replace(An.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(An.tabCharGlobal,"    ").replace(An.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},i),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,i)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(b=>{h=b.call({lexer:this},_),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Ea=class{constructor(e){Bt(this,"options");Bt(this,"parser");this.options=e||Ir}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(An.notSpaceStart)?.[0],s=e.replace(An.endingNewline,"")+`
`;return r?'<pre><code class="language-'+lr(r)+'">'+(n?s:lr(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:lr(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let i=e.items[a];r+=this.listitem(i)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let a=0;a<o.length;a++)n+=this.tablecell(o[a]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${lr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Kd(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+lr(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Kd(e);if(s===null)return lr(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${lr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:lr(e.text)}},_l=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Hn=class ol{constructor(t){Bt(this,"options");Bt(this,"renderer");Bt(this,"textRenderer");this.options=t||Ir,this.options.renderer=this.options.renderer||new Ea,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new _l}static parse(t,n){return new ol(n).parse(t)}static parseInline(t,n){return new ol(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},xa,Xs=(xa=class{constructor(e){Bt(this,"options");Bt(this,"block");this.options=e||Ir}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?zn.lex:zn.lexInline}provideParser(){return this.block?Hn.parse:Hn.parseInline}},Bt(xa,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Bt(xa,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),xa),Yb=class{constructor(...e){Bt(this,"defaults",al());Bt(this,"options",this.setOptions);Bt(this,"parse",this.parseMarkdown(!0));Bt(this,"parseInline",this.parseMarkdown(!1));Bt(this,"Parser",Hn);Bt(this,"Renderer",Ea);Bt(this,"TextRenderer",_l);Bt(this,"Lexer",zn);Bt(this,"Tokenizer",Sa);Bt(this,"Hooks",Xs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Ea(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Sa(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Xs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],l=s[a];Xs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Xs.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,u);return l.call(s,_)})();let d=i.call(s,u);return l.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,u);return _===!1&&(_=await l.apply(s,u)),_})();let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return zn.lex(e,t??this.defaults)}parser(e,t){return Hn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?zn.lex:zn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Hn.parse:Hn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?zn.lex:zn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?Hn.parse:Hn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+lr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Lr=new Yb;function Pt(e,t){return Lr.parse(e,t)}Pt.options=Pt.setOptions=function(e){return Lr.setOptions(e),Pt.defaults=Lr.defaults,Zd(Pt.defaults),Pt};Pt.getDefaults=al;Pt.defaults=Ir;Pt.use=function(...e){return Lr.use(...e),Pt.defaults=Lr.defaults,Zd(Pt.defaults),Pt};Pt.walkTokens=function(e,t){return Lr.walkTokens(e,t)};Pt.parseInline=Lr.parseInline;Pt.Parser=Hn;Pt.parser=Hn.parse;Pt.Renderer=Ea;Pt.TextRenderer=_l;Pt.Lexer=zn;Pt.lexer=zn.lex;Pt.Tokenizer=Sa;Pt.Hooks=Xs;Pt.parse=Pt;var j$=Pt.options,B$=Pt.setOptions,U$=Pt.use,W$=Pt.walkTokens,z$=Pt.parseInline;var H$=Hn.parse,G$=zn.lex;function br(e){let t=Pt.parse(e),n=Ud.sanitize(t);return Wd(n)}function cr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function as(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ra(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var lp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Zb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Xb=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Qb=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Gn(e){return!!e&&typeof e=="object"}function ml(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function gl(e,t){let n=ml(e),r=ml(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function cp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Gn(s)&&typeof s.text=="string"?s.text:"").join(""):Gn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Jb(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:lp[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=ml(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=gl(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let l=gl(Gn(i)?i.old_string:"",Gn(i)?i.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function bl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var eh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function up(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Gn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(eh,"").trim();return n.length>0?{kind:"user",text:n}:null}function hl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Xb.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Qb.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function th(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function nh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Gn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(hl(a.text));else if(a.type==="thinking"){let i=bl(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Jb(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?ip(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let a of s)if(Gn(a)&&a.type==="tool_result"){let i=t.get(String(a.tool_use_id));if(i){let l=cp(a.content);i.result=l,i.output=typeof a.content=="string"?a.content:l,a.is_error===!0&&(i.is_error=!0)}}let o=up(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?ip([s],n):[s]}return[]}function ip(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function rh(e){let t=typeof e.command=="string"?e.command:"",n=cp(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:lp.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function sh(e){if(e.type==="item.completed"&&Gn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[hl(t.text)];if(t.type==="user_message"){let n=up(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=bl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[rh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function oh(e){if(e.schema!=="codex-delegation-monitor-v1"||!Gn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Gn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[hl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=bl(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Zb[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function ah(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ih(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Gn(t)?t:null}function dp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=ih(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return th(o,r);let a=o.schema==="codex-delegation-monitor-v1"?oh(o):ah(o)?sh(o):nh(o,n);return a.length>0&&(r.progress=null),a}}}function yl(e){let t=[],n=dp(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var lh=5,ch=10,uh=/Task\s+#(\d+)/,dh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,ph=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function eo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function fh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function _h(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function mh(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=uh.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function gh(e){if(e.tool==="Bash"){let t=e.command||"";return dh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":ph.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function bh(e){let t=e.filter(s=>s.kind==="tool").slice(-ch),n=new Map;t.forEach((s,o)=>{let a=gh(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function hh(e){let t=_h(e);if(t)return{text:t,guess:!1};let n=mh(e);if(n)return{text:n,guess:!1};let r=bh(e);return r?{text:r,guess:!0}:null}function yh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:En(e,t)}function is(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,l=null,u=null,d=!1,_={},h=!0,b=new Set,w=new Set,F=null,W=null,K=!1,ie=!1,Y=!1,j=null,q=null;function z(){K=!1,ie=!1,Y=!1,j=null,q=null}async function L(se){if(n){ie=!0,Y=!1,Le();try{let X=await Promise.resolve(n("get-attempt-prompt",{attempt_id:se,...u?{root_dir:u}:{}}));if(o!==se)return;!X||typeof X!="object"||Array.isArray(X)?Y=!0:(j=X,q=se)}catch{o===se&&(Y=!0)}finally{o===se&&(ie=!1,Le())}}}function I(){if(K=!K,K&&o&&q!==o){L(o);return}Le()}function re(){if(!K)return"";let se=as({loading:ie,error:Y});if(se)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${se}
      </div>`;if(!j)return"";if(j.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let X=Ra(j.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${X?c`<div class="prompt-block__meta">${X} 발송</div>`:""}
      ${typeof j.task_prompt=="string"?cr("\uACFC\uC5C5 (user)",j.task_prompt):""}
      ${typeof j.system_prompt=="string"?cr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",j.system_prompt):""}
    </div>`}function ge(){if(!l||!r)return[];let se=r.get(l);return yl(se?se.lines:[])}function $e(){if(!l||!r)return null;let se=r.get(l),X=se?se.last_event_at:null;return typeof X=="number"?X:null}function ce(){return _.status==="running"}function be(){if(ce()&&o){W||(W=setInterval(()=>Le(),1e3));return}we()}function we(){W&&(clearInterval(W),W=null)}function Ge(se){let X=[],Ue=0;for(;Ue<se.length;){let{idx:dt,line:ze}=se[Ue];if(ze.kind==="tool"){let ve=Ue;for(;ve<se.length&&se[ve].line.kind==="tool"&&se[ve].line.tool===ze.tool;)ve+=1;if(ve-Ue>=lh&&!w.has(dt)){X.push({kind:"group",idx:dt,tool:ze.tool||"",lines:se.slice(Ue,ve)}),Ue=ve;continue}}X.push({kind:"line",idx:dt,line:ze}),Ue+=1}return X}function he(se){let X=[],Ue=new Map;for(let ve=0;ve<se.length;ve+=1){let Qe=se[ve],ct=Qe.parent_tool_use_id;if(typeof ct=="string"&&ct.length>0){let mt=Ue.get(ct);mt||(mt={kind:"subagent",idx:ve,launch_id:ct,agent_type:null,header:null,lines:[]},Ue.set(ct,mt),X.push(mt)),mt.lines.push({idx:ve,line:Qe});continue}if(Qe.kind==="tool"&&Qe.tool==="Agent"&&typeof Qe.launch_id=="string"&&Qe.launch_id.length>0){let mt=J(Qe),gt=Ue.get(Qe.launch_id);if(gt){gt.header={idx:ve,line:Qe},gt.agent_type=mt;continue}let zt={kind:"subagent",idx:ve,launch_id:Qe.launch_id,agent_type:mt,header:{idx:ve,line:Qe},lines:[]};Ue.set(Qe.launch_id,zt),X.push(zt);continue}X.push({kind:"entry",idx:ve,line:Qe})}let dt=[],ze=0;for(;ze<X.length;){if(X[ze].kind!=="entry"){dt.push(X[ze]),ze+=1;continue}let ve=ze;for(;ve<X.length&&X[ve].kind==="entry";)ve+=1;dt.push(...Ge(X.slice(ze,ve))),ze=ve}return dt}function J(se){let X=se.input;return X&&typeof X.subagent_type=="string"?X.subagent_type:null}function Re(se){for(let X=se.length-1;X>=0;X-=1){let Ue=se[X];if(Ue.kind==="result"||Ue.kind==="error")return null;if(Ue.kind==="tool"&&!Object.hasOwn(Ue,"result"))return Ue}return null}function De(se){for(let X=se.length-1;X>=0;X-=1)if(se[X].kind==="thinking")return se[X];return null}function T(se,X){if(X.kind==="gate")return c`<div class="sv__gate">${X.text}</div>`;if(X.kind==="phase")return c`<div class="sv__phase">${X.text}</div>`;if(X.kind==="result")return c`<div
        class="sv__result${X.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${X.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${br(X.text||(X.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(X.kind==="thinking"){let Ue=b.has(se);return c`<div
        class="sv__think${Ue?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Et(se)}
      >
        <span class="sv__think-line">💭 ${eo(X.text)}</span>
        ${Ue?c`<pre class="sv__think-expand">${X.text}</pre>`:""}
      </div>`}if(X.kind==="user"){let Ue=b.has(se);return c`<div
        class="sv__line sv__line--user${Ue?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Et(se)}
      >
        <span class="sv__user-line">▷ ${eo(X.text)}</span>
        ${Ue?c`<pre class="sv__user-expand">${X.text}</pre>`:""}
      </div>`}if(X.kind==="error")return c`<div class="sv__error">⛔ ${X.text}</div>`;if(X.kind==="blocker")return c`<div class="sv__error">⛔ ${X.text}</div>`;if(X.kind==="tool"){let Ue=b.has(se),dt=X.tool==="Bash"?fh(X.command):0,ze=X.tool==="Bash"?dt>1?eo(X.command):X.command:X.path||X.command||"";return c`<div
        class="sv__tool${Ue?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Et(se)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${X.icon}</span>
          <span class="sv__tool-name">${X.tool}</span>
          ${ze?c`<span class="sv__tool-detail">${ze}</span>`:""}
          ${dt>1?c`<span class="sv__tool-more">⋯ ${dt}줄</span>`:""}
          ${typeof X.added=="number"?c`<span class="sv__diff-add">+${X.added}</span>`:""}
          ${typeof X.removed=="number"?c`<span class="sv__diff-del">−${X.removed}</span>`:""}
          ${X.result?c`<span class="sv__tool-ok">→ ${X.result}</span>`:""}
        </span>
        ${Ue?c`<pre class="sv__tool-expand">${te(X)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${br(X.text||"")}</div>`}function te(se){let X=[];if(se.tool==="Bash"&&typeof se.command=="string"&&se.command.length>0)X.push(se.command);else if(se.input!==void 0)try{X.push(`input: ${JSON.stringify(se.input,null,2)}`)}catch{}return typeof se.output=="string"&&se.output.length>0&&X.push(`output:
${se.output}`),X.join(`

`)}function Se(){if(!o)return c``;let se=ge(),X=(a?[_.agent_type,_.model,_.effort]:[_.runner,_.model,_.effort]).filter(Boolean).join(" \xB7 "),Ue=_.session_id||"",dt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,ze=ce(),ve=ze?yh($e(),Date.now()):"",Qe=ze?Re(se):null,ct=ze?De(se):null,mt=hh(se);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${_.label||(a?_.role||"":o)}</span
        >
        ${mt?c`<span
              class="sv__stage${mt.guess?" sv__stage--guess":""}"
              title=${mt.text}
              >${mt.text}</span
            >`:""}
        ${ze?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ve?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ve}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ve?c`<span class="sv__live-ago">${ve}</span>`:""}</span
            >`:""}
        ${Ue?c`<button
              type="button"
              class="sv__session"
              title=${Ue}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ue}`}
              @click=${()=>ht(Ue)}
            >
              ⧉ ${Ue.slice(0,8)}
            </button>`:""}
        ${_.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${_.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${_.resume_command}`}
              @click=${()=>ht(_.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${X?c`<span class="sv__meta">${X}</span>`:""}
        ${_.worktree?c`<span class="sv__wt" title=${_.worktree}
              >${_.worktree}</span
            >`:""}
        ${a||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${K?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${K?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${I}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${dt}
          @click=${xt}
        >
          <span class="sv__follow-full">⇣ ${dt}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>vt()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":re()}
      <div class="sv__body">
        ${se.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:he(se).map(gt=>gt.kind==="subagent"?Ne(gt):gt.kind==="group"?ke(gt):T(gt.idx,gt.line))}
      </div>
      ${Qe||ct?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Qe?c`<span class="sv__now-icon">${Qe.icon}</span>
                  <span class="sv__now-name">${Qe.tool}</span>
                  <span class="sv__now-detail"
                    >${Qe.tool==="Bash"?eo(Qe.command):Qe.path||Qe.command||""}</span
                  >`:""}
            ${ct?c`<span class="sv__now-think"
                  >💭 ${eo(ct.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ke(se){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>pe(se.idx)}
    >
      <span class="sv__group-icon">${se.lines[0].line.icon}</span>
      <span class="sv__group-name">${se.tool}</span>
      <span class="sv__group-count">${se.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ne(se){let X=w.has(se.idx),Ue=se.header?se.header.line:null,dt=Ue?Ue.is_error===!0?"\u2717":typeof Ue.result=="string"?"\u2713":"\u27F3":"",ze=Ue&&Ue.command?Ue.command:"";return c`<div class="sv__sub${X?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>pe(se.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${se.agent_type||"subagent"}</span>
        ${ze?c`<span class="sv__sub-detail">${ze}</span>`:""}
        <span class="sv__sub-count">${se.lines.length}줄</span>
        ${dt?c`<span class="sv__sub-state">${dt}</span>`:""}
        ${X?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${X?c`<div class="sv__sub-body">
            ${Ge(se.lines).map(ve=>ve.kind==="group"?ke(ve):T(ve.idx,ve.line))}
          </div>`:""}
    </div>`}function pe(se){w.add(se),Le()}function Le(){lt(Se(),e),be(),h&&et()}function et(){let se=e.querySelector(".sv__body");se&&(se.scrollTop=se.scrollHeight)}function Et(se){b.has(se)?b.delete(se):b.add(se),Le()}function xt(){h=!h,Le()}function ht(se){On(se).then(X=>{X?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function M(se){!o||!se||(_={..._,...se},Le())}function ae(se){let X=se.target;if(!X||!X.classList||!X.classList.contains("sv__body"))return;!(X.scrollHeight-X.scrollTop-X.clientHeight<=4)&&h&&(h=!1,Le())}e.addEventListener("scroll",ae,!0);function Ie(se){let X=se.target;!X||typeof X.closest!="function"||e.contains(X)||X.closest("dialog")||X.closest(".md-viewer-root")||vt()}let qe=!1;function Ye(){qe||(document.addEventListener("mousedown",Ie),qe=!0)}function rt(){qe&&(document.removeEventListener("mousedown",Ie),qe=!1)}function yt(se){let X=se&&se.attempt_id;if(!X)return;let Ue=typeof se.launch_id=="string"&&se.launch_id.length>0?se.launch_id:null,dt=se.session_ref&&typeof se.session_ref=="object"?se.session_ref:null;if(Ue&&dt)return;let ze=l;o=X,a=Ue,i=dt,l=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&ze&&ze!==l&&Promise.resolve(n("unsubscribe-session-log",{id:ze})).catch(()=>{}),u=typeof se.root_dir=="string"&&se.root_dir.length>0?se.root_dir:null,_=se.meta||{},d=se.hide_prompt===!0,h=!0,b.clear(),w.clear(),z(),!F&&r&&(F=r.subscribe(Le)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{},...i?{session_ref:i}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Ye(),Le()}function vt(){let se=l;rt(),o=null,a=null,i=null,l=null,u=null,d=!1,b.clear(),w.clear(),z(),we(),n&&se&&Promise.resolve(n("unsubscribe-session-log",{id:se})).catch(()=>{}),lt(c``,e),s&&s()}return{open:yt,updateMeta:M,close:vt,isOpen(){return o!==null},destroy(){we(),rt(),F&&(F(),F=null),e.removeEventListener("scroll",ae,!0),o=null,a=null,i=null,l=null,u=null,d=!1,lt(c``,e)}}}function vh(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Oa(t.spec_id),s=Oa(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Oa(e){return typeof e=="string"?e.trim():""}function wh(e){let t=vh(e);if(t.path)return t;let n=Oa(pp(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function pp(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var kh=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function to(e){let t=wh(e),n=Oa(pp(e).spec_review),r=kh.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function $h(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function xh(e){let t=e&&e.metadata||{},n=to(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:$h(t)?null:"plan_pending"}),r}function fp(e,t){let n=xh(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?c`<span class="detail-art__badge">draft</span>`:null}
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,r.path,r.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Ah="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Sh=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Eh=/^\*\*결론\*\* — (.+)$/;function La(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Ah)return null;let n=Sh.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Eh.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var _p=20;function mp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Th(e){return e.length>_p?`${e.slice(0,_p)}\u2026`:e}function Ch(e,t,n,r){let s=`${t.lane} ${Th(t.identifier)}`;return c`<div class="detail-report">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${r?"true":"false"}
      @click=${()=>n.onToggle&&n.onToggle(e.id)}
    >
      <span class="detail-report__tri">${r?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🤖</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">작업 보고서</span>
        <span
          class="detail-report__lane${t.lane==="worker"?" detail-report__lane--worker":""}"
          title=${`${t.lane} ${t.identifier} \xB7 ${t.timestamp}`}
          >${s}</span
        >
        <span class="detail-report__time">${mp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${br(t.body)}
        </div>`:""}
  </div>`}function Rh(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${mp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${br(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function gp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=La(typeof l.text=="string"?l.text:"");return u?Ch(l,u,t,s.has(l.id)):Rh(l)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${l=>t.onDraftInput&&t.onDraftInput(l.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${a||o.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:Ex}=Lc;var bp=e=>e.strings===void 0;var Oh={},hp=(e,t=Oh)=>e._$AH=t;var Mr=ka(class extends os{constructor(e){if(super(e),e.type!==ir.PROPERTY&&e.type!==ir.ATTRIBUTE&&e.type!==ir.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!bp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Mn||t===Vt)return t;let n=e.element,r=e.name;if(e.type===ir.PROPERTY){if(t===n[r])return Mn}else if(e.type===ir.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Mn}else if(e.type===ir.ATTRIBUTE&&n.getAttribute(r)===t+"")return Mn;return hp(e),t}});var Lh=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],vl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},yp={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Ih={pin:"pin",global:"global",base:"base"};function Mh(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Ih[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Ph(e,t,n){switch(e){case"workflow_mode":return Cs;case"spec_review_model":case"impl_review_model":return Rs;case"plan_review_model":return Zo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Xo;case"impl_dispatch":return Hu;case"impl_runtime":return Yo;case"impl_model":return es(n,t.impl_runtime);case"impl_effort":return ts(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Ts;case"orchestration_model":return Os(n,null);case"orchestration_effort":return ts(n,void 0,t.orchestration_model||In).filter(r=>r!==In);default:return[]}}function Dh(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Mh(e.source)}
    <span class="detail-effective__k"
      >${fr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Qo[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${fr[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${n=>{let r=String(n.target.value);t.onEdit(e.key,r.length===0?null:r)}}
        >
          <option
            value=""
            title=${t.default_full_value||""}
            ?selected=${e.source!=="pin"}
          >
            ${t.default_label}
          </option>
          ${t.options.map(n=>c`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function vp(e,t){let n=Mi.flatMap(l=>l.keys),r=Pi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Qu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),a=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${l=>t.onToggle(l.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${l=>{l.preventDefault();let u=l.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${Nh(o)}</span
      >
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${s.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${s.global}</span
        >
        <span class="detail-effective__count detail-effective__count--base"
          >기본 ${s.base}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </summary>
    ${e.expanded?c`<div class="detail-effective__body">
          ${Mi.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=Bo({key:u.key,choices:Ph(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Dh(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Mr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${l=>t.onPresetSelect(String(l.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(l=>c`<option
                    value=${l.id}
                    ?selected=${l.id===e.preset_id}
                  >
                    ${l.name}${l.compatible===!1?" (\uBE44\uD638\uD658)":""}
                  </option>`)}
            </select>
            <button
              type="button"
              data-apply-impl-preset
              ?disabled=${e.preset_id.length===0||e.preset_busy}
              @click=${t.onPresetApply}
            >
              이 이슈에 적용
            </button>
            <span class="detail-effective__hint"
              >세션 키 12개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function Nh(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function qh(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function wp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},s=r.stages||{},o=r.route||n.route||null,a=typeof n.pr_url=="string"?n.pr_url:"",i=typeof n.exec_receipt=="string"?n.exec_receipt:"",l=qh(r.exec_receipt),u=l?nr(l):i,d=l?`${l.kind}:${l.actor}`:i.split("@")[0],_=Fo(r.planned_execution,r.exec_receipt),h=r.chips?.pr?.number,b=typeof h=="number"?`PR #${h}`:"PR",w=ns(n),F=t.onApplyRec;return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${o?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${o}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${a?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${a}
            target="_blank"
            rel="noreferrer"
            >${b}</a
          >`:""}
      ${_?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${_.kind}
            title=${_.title}
            >${_.label}</span
          >`:""}
      ${u?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${l?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${l.effort}</span
                  >`:""}</span
          >`:""}
      ${w?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec"
            data-state=${w.state}
            title=${ea(w)}
            ?disabled=${w.state==="applied"}
            @click=${()=>F?.(w.rec,w.state)}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Fh(o).map(W=>jh(W,n,s,{label:W.id==="pr"?b:W.label,href:W.id==="pr"?a:""}))}
    </div>
  </section>`}function Fh(e){let n=typeof e=="string"&&Object.hasOwn(vl,e)&&vl[e]||vl.spec_backed;return Lh.filter(r=>n.includes(r.id))}var Ia={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function jh(e,t,n,r){let s=Bh(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,l=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",_=u?Ia.stale:i?Ia.on:l?Ia.current:Ia.none,h=Uh(e,n),b=`${r.label} \xB7 ${_}${h?` \xB7 ${h}`:""}${s?` \xB7 ${s}`:""}`,w=`detail-summary__gate${i?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,F=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${w}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${b}
      >${F}</a
    >`:c`<span
    class=${w}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${F}</span
  >`}function Bh(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Uh(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(yp,n)?yp[n]:""}function Ma(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function kp(e){return Ma(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function $p(e,t){let n=e&&e[t];if(!Ma(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(kp),s=kp(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Sp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Pa(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Sp(e)}${t}`}function ls(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Sp(e)}`}function Wh(e,t,n){if(n!==null){let s=e==="claude"?Pa:ls,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:ls({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function xp(e,t){if(!Ma(e)||e.state!=="usable"||!Ma(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Ap(e){let t=e.provider_key==="claude"?Pa:ls,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Wh(e.provider_key,e.provider,e.workspace_default)}
        </option>
        ${e.selected&&!n?c`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(r=>c`<option
              value=${r.key}
              ?selected=${r.key===e.selected}
            >
              ${t(r)}
            </option>`)||""}
      </select>
      ${e.hint?c`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":c`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function Ep({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Ap({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:$p(t,"claude"),selected:s,workspace_default:xp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Ap({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:$p(t,"codex"),selected:o,workspace_default:xp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function zh(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Hh(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Da(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,l="";function u(F){F.key==="Escape"&&s&&(F.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${zh(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>b()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${l}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${i===null?null:c`<pre class="mv__front">
${i}</pre
                        >`}${br(a)}`}
          </div>
        </div>
      </div>
    `:c``}function _(){lt(d(),e)}async function h(F,W={}){s=F,o="loading",a="",i=null,l="",_();let K=W.workspace||(n?n():"");if(!K){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let ie="/api/doc?workspace="+encodeURIComponent(K)+"&path="+encodeURIComponent(F);try{let Y=await r(ie),j=await Y.json().catch(()=>({}));if(!Y.ok||!j||j.ok!==!0){if(j?.error==="not_found"&&W.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(j&&j.error||Y.status)+")",_();return}let q=Hh(String(j.content||""));i=q.front,a=q.body,o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function b(){s=null,lt(c``,e)}function w(){document.removeEventListener("keydown",u),b()}return{open:h,close:b,destroy:w}}var Gh=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Rp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Na=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Kh=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Tp(e){return typeof e=="string"&&Kh.has(e)}var Vh=["running","done","failed","interrupted"],Yh={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Zh(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Xh(e){let t=_n(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Qr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Rp}
          >부분 집계</span
        >`:""}`}function Cp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function $l(e){if(typeof e=="number")return no(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?no(t):""}function Qh(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Jh(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function wl(e){return e===null||typeof e=="string"&&e.trim().length>0}function kl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function ey(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Na.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?wl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||wl(t.effort))||!(!("agent_type"in t)||wl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Vh.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!kl(t.started_at)||!kl(t.last_event_at)||!kl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function ty(e,t,n){let s=_n({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${n.session_id?c`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${n.session_id}
          >${n.session_id.slice(0,8)}</span
        >`:""}
    ${$l(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${$l(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function ny(e,t,n,r){let s=e.status==="running"?null:t,a=(s?_n({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?no(e.last_event_at):s?$l(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Qh(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Jh(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Yh[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${l}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${u.title}
      >${u.text}</span
    >
    ${i?c`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?c`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function ry(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function sy(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let _=ey(d);!_||s.has(_.launch_id)||Tp(_.agent_type)||(s.add(_.launch_id),r.push(_))}r.sort((d,_)=>(d.started_at||0)-(_.started_at||0));let a={};for(let{role:d,provider:_}of Na){let h=t?t.roles[d]?.[_]:null;a[d]=h?[...h.legs]:[]}let i=Na.flatMap(({role:d})=>a[d]),l=new Set,u=[];for(let{role:d,provider:_}of Na){for(let h of r.filter(b=>b.role===d&&b.provider===_)){let b=i.find(w=>w.receipt_id===h.launch_id)||null;b&&!ry(h,b)||(b&&l.add(b.receipt_id),u.push(ny(h,b,e.attempt_id,n)))}for(let h of a[d])!l.has(h.receipt_id)&&!Tp(h.agent_type)&&u.push(ty(d,_,h))}return u}function oy(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Gh,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Zh(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Rp}</span>`:""}
  </div>`}var ay={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function no(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function iy(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var ly={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function cy(e,t){let n=ly[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${wi(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${vs(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${no(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Op(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],a=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,w)=>w.index-b.index)],i=a.map(b=>cy(b,t)),l=n.expanded||new Set;if(s.length===0&&a.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let d=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let F=typeof b.session_id=="string"&&b.session_id.length>0,W=u.has(b.attempt_id),K=F&&!W,ie=F?W?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!K}
      title=${ie}
      @click=${Y=>{Y.stopPropagation(),K&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},_=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let F=b.cause_detail,W=F&&typeof F.reason=="string"&&F.reason.length>0?typeof F.command=="string"&&F.command.length>0?`${F.reason} \xB7 ${F.command}`:F.reason:b.cause;return c`<div class="detail-session__cause" title=${W}>
      ${b.cause}
    </div>`},h=b=>{let w=Cp(Ai(b));if(_n(w).length===0&&!Qr(b.usage))return"";let F=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${F?"true":"false"}
      title=${F?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${W=>{W.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Xh(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${i}${s.map(b=>{let w=Ai(b),F=Cp(w),W=_n(F);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${ay[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${hs(b)?c`<span
                  class="detail-session__resumed"
                  title=${hs(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Tr(b)}</span>
            ${W.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${W.length>0?W.map(K=>c`<span
                      class="detail-session__usage"
                      title=${K.tooltip}
                      >${K.label}</span
                    >`):Qr(b.usage)?c`<span class="detail-session__usage"
                    >${Qr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${no(b.started_at)}</span>
          </button>
          ${h(b)} ${d(b)} ${_(b)} ${iy(b)}
          ${l.has(b.attempt_id)&&b.usage?oy(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${sy(b,w,t)}
        </div>`})}
    </div>
  `}function Lp(e,t={}){return c`
    <div class="detail-section-label">
      과업 프롬프트
      <button
        type="button"
        class="detail-prompt__toggle"
        data-seam="task-prompt-toggle"
        aria-expanded=${e.expanded?"true":"false"}
        title=${e.expanded?"\uC811\uAE30":"\uC6CC\uCEE4\uAC00 \uBCF4\uB0B8 \uD504\uB86C\uD504\uD2B8 \uBCF4\uAE30"}
        @click=${()=>t.onToggle&&t.onToggle()}
      >
        ${e.expanded?"\uC811\uAE30":"\uD3BC\uCE58\uAE30"}
      </button>
    </div>
    ${e.expanded?c`<div class="detail-prompt" data-seam="task-prompt">
          ${uy(e)}
        </div>`:""}
  `}function uy(e){let t=as(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?cr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ra(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?cr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?cr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var dy=["open","in_progress","deferred","resolved","closed"],py=[0,1,2,3,4];function Ip(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,_={},h="",b=!1,w=[],F=!1,W={},K={claude:null,codex:null},ie=null,Y=null,j=0,q=!1,z=!1,L="",I="",re="",ge="",$e=!1;function ce(){q=!1,z=!1,L="",I="",re="",ge="",$e=!1}function be(){K={claude:null,codex:null},ie=null,Y=null,j+=1}async function we(){if(!s)return null;try{let y=await Promise.resolve(s("get-workspace-accounts",{}));return y&&typeof y.state=="string"?y:null}catch{return null}}async function Ge(y){try{let V=await fetch(y);if(!V.ok)return null;let N=await V.json();if(!N||typeof N!="object"||!Array.isArray(N.accounts))return null;let Ae=N.accounts.filter(st=>st!==null&&typeof st=="object"&&!Array.isArray(st));return{accounts:Ae,active:Ae.find(st=>st.active===!0)||null}}catch{return null}}async function he(y){Y=y;let V=++j,[N,Ae,st]=await Promise.all([Ge("/api/claude-usage"),Ge("/api/codex-usage"),we()]);V!==j||y!==u||(K={claude:N,codex:Ae},ie=st,Ke())}let J=[],Re=null,De=null,T=!1,te="",Se=!1,ke=0,Ne=new Set;function pe(){J=[],Re=null,De=null,T=!1,te="",Se=!1,ke+=1,Ne.clear()}async function Le(y){if(!s)return;let V=++ke;try{let N=await Promise.resolve(s("get-comments",{id:y}));if(V!==ke||y!==u)return;J=Array.isArray(N)?N:[],T=!1}catch{if(V!==ke||y!==u)return;T=!0}Ke()}function et(){if(!s||!u)return;let y=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Re!==u){Re=u,De=y,Le(u);return}y!==null&&y!==De&&(De=y,Le(u))}function Et(y){Ne.has(y)?Ne.delete(y):Ne.add(y),Ke()}function xt(y){let V=te.trim().length===0;te=y,V!==(y.trim().length===0)&&Ke()}async function ht(){let y=te.trim();if(!s||!u||y.length===0||Se)return;let V=u;Se=!0,Ke();let N=!1;try{let Ae=await Promise.resolve(s("add-comment",{id:V,text:y}));Array.isArray(Ae)&&Ae.length>0&&(N=!0,V===u&&(J=Ae,T=!1,te="",De=Ae.length))}catch{N=!1}N||ue("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),V===u&&(Se=!1),Ke()}let M={onToggle:Et,onDraftInput:xt,onSubmit:ht},ae=t.mdViewer||null,Ie=null;ae||(Ie=document.createElement("div"),Ie.className="md-viewer-root",document.body.appendChild(Ie));let qe=ae||Da(Ie,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ye=document.createElement("div");Ye.className="session-log-root",document.body.appendChild(Ye);let rt=is(Ye,{transport:s?(y,V)=>Promise.resolve(s(y,V)):void 0,sessionLogStore:l}),yt=!1,vt=!1,se=!1,X=null,Ue=null,dt=0;function ze(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function ve(){yt=!1,vt=!1,se=!1,X=null,Ue=null,dt+=1}async function Qe(y){if(!s)return;let V=++dt;vt=!0,se=!1,Ke();try{let N=await Promise.resolve(s("get-bead-prompt",{bead_id:y}));if(V!==dt)return;!N||typeof N!="object"||Array.isArray(N)?se=!0:(X=N,Ue=ze(y))}catch{V===dt&&(se=!0)}finally{V===dt&&(vt=!1,Ke())}}let ct=[],mt=null,gt=0;function zt(y,V){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}::${V}`}function qt(){ct=[],mt=null,gt+=1}async function Kt(y,V){if(!s)return;let N=++gt,Ae;try{Ae=await Promise.resolve(s("get-session-refs",{bead_id:y}))}catch{Ae=null}N!==gt||V!==mt||(ct=Ae&&Array.isArray(Ae.sessions)?Ae.sessions:[],Ke())}function Ct(){if(!s||!u)return;let y=d&&d.metadata,V=y&&typeof y=="object"&&typeof y.session_ref=="string"?y.session_ref:null;if(V===null){qt();return}let N=zt(u,V);mt!==N&&(ct=[],mt=N,Kt(u,N))}function Rt(){if(yt=!yt,yt&&u&&Ue!==ze(u)){X=null,Qe(u);return}Ke()}function at(){if(!a||!u)return[];let y=a.get();return(y&&y.attempts?Object.values(y.attempts):[]).filter(N=>N&&N.bead_id===u).sort((N,Ae)=>(Ae.started_at||0)-(N.started_at||0)).map(N=>({attempt_id:N.attempt_id,bead_id:N.bead_id,status:N.status,started_at:typeof N.started_at=="number"?N.started_at:null,runner:N.runner||null,model:N.model||null,effort:N.effort||N.observed_effort||null,speed:N.speed||null,session_id:N.session_id||null,resumed_from:N.resumed_from||null,continuation_mode:N.continuation_mode||null,dismissed_at:typeof N.dismissed_at=="number"?N.dismissed_at:null,cause:typeof N.cause=="string"?N.cause:null,cause_detail:N.cause_detail||null,exec_default_preset_id:typeof N.exec_default_preset_id=="string"?N.exec_default_preset_id:null,exec_default_preset_revision:typeof N.exec_default_preset_revision=="number"?N.exec_default_preset_revision:null,exec_values:N.exec_values&&typeof N.exec_values=="object"?N.exec_values:null,usage:N.usage||null,usage_legs:Array.isArray(N.usage_legs)?N.usage_legs:[],delegation_sessions:Array.isArray(N.delegation_sessions)?N.delegation_sessions:[]}))}function We(){if(!a||!u)return null;let y=a.get();return Pn(y&&y.attempts||{},u)}let P=new Set;function ee(y){P.has(y)?P.delete(y):P.add(y),Ke()}function ye(y){let V=a?a.get():null,N=V&&V.attempts?V.attempts[y]:null;rt.open({attempt_id:y,meta:N?{runner:N.runner||void 0,model:N.model||void 0,effort:N.effort||void 0,status:N.status||void 0,session_id:N.session_id||void 0}:{}})}function O(y,V){let N=a?a.get():null,Ae=N&&N.attempts?N.attempts[y]:null,ot=(Ae&&Array.isArray(Ae.delegation_sessions)?Ae.delegation_sessions:[]).find(wt=>wt&&typeof wt=="object"&&wt.launch_id===V);ot&&rt.open({attempt_id:y,launch_id:V,meta:{runner:ot.provider==="claude"?"claude":"codex",role:ot.role,...typeof ot.agent_type=="string"?{agent_type:ot.agent_type}:{},model:ot.model,effort:ot.effort,session_id:ot.session_id,status:ot.status}})}async function H(y){if(!s||!y)return;let V=await Yr();if(V===null)return;let N=()=>{let wt=a?a.get():null;return wt&&typeof wt.revision=="number"?wt.revision:0},Ae=async(wt={},Ve=N())=>await s("worker-attempt-resume",{attempt_id:y,expected_revision:Ve,...V!==""?{instructions:V}:{},...wt}),st=wt=>{wt?.queue&&a?.set&&a.set(wt.queue)},ot=await Ae();if(st(ot),ot&&ot.conflict){let wt=ot.queue&&typeof ot.queue.revision=="number"?ot.queue.revision:N();ot=await Ae({},wt),st(ot)}ot=await rr(ot,(wt,Ve)=>Ae({continuation:wt,decision_token:Ve}),{onResult:st,refresh:()=>Ae()}),ot&&ot.resumed===!1&&!ot.conflict&&ot.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ot.reason}`,"error",2400)}function Ce(y){!y||!u||rt.open(Zr(y,u,d&&d.status))}let A={onOpen:ye,onOpenDelegation:O,onResume:H,onToggleUsage:ee,onOpenSessionRef:Ce,onCopyResumeCommand:cn};function C(){let y=a?a.get():null,V={...W};for(let N of["orchestration_model","orchestration_effort","orchestration_speed"]){let Ae=y&&y[N];typeof Ae=="string"&&(V[N]=Ae)}return V}async function Q(){if(s){try{let y=await Promise.resolve(s("get-session-defaults",{}));W=y&&y.values&&typeof y.values=="object"?y.values:{}}catch{W={}}Ke()}}function me(){let y=a?a.get():null;return y&&y.runner_catalog||null}function oe(){let y=a?a.get():null;return y&&typeof y.execution_defaults=="object"?y.execution_defaults:null}function Pe(){let y=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},N=Cn({pin:{...y,..._},global:C(),execution_defaults:oe(),runner_catalog:me(),route:typeof y.route=="string"?y.route:null}).orchestration_model.value||"";return jn(me(),N)}function E(){let y=i?i.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function U(y){return y?.compatible===!1}function xe(y){i&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&i.set({revision:y.revision,presets:y.presets})}async function tt(){let y=E(),V=y?.presets.find(N=>N.id===h);if(!(!s||!u||!y||!V||U(V)||b)){b=!0,w=[],Ke();try{let N=await Promise.resolve(s("apply-impl-preset",ed(u,V.id,y.revision)));if(N&&N.conflict){xe(N),ue("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Ae=N&&Array.isArray(N.issue)?N.issue[0]:N?.issue;if(N&&N.applied&&Ae&&typeof Ae=="object"){d=Ae,w=Array.isArray(N.skipped_orchestration_keys)?N.skipped_orchestration_keys.filter(st=>typeof st=="string"):[];for(let st of td)delete _[st];ue(w.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}N&&N.error==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(N){N&&typeof N=="object"&&N.code==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,Ke()}}}let _e=null;n&&n.subscribe&&(_e=n.subscribe(()=>Ft()));let Xe=null;a&&typeof a.subscribe=="function"&&(Xe=a.subscribe(()=>{u&&Ke()}));let pt=null,At=null;function Mt(){At&&(At(),At=null)}i&&typeof i.subscribe=="function"&&(pt=i.subscribe(()=>{u&&Ke()}));function Zt(y){y.key==="Escape"&&u&&(y.preventDefault(),r())}document.addEventListener("keydown",Zt);function Ft(){if(u){if(n&&typeof n.snapshotFor=="function"){let y=n.snapshotFor("detail:"+u)||[];d=y.find(N=>N&&N.id===u)||y[0]||d}et(),Ct(),Ke()}}function cn(y){On(y).then(V=>{V?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function It(y){y.preventDefault(),y.stopPropagation(),u&&cn(u)}function hn(y,V){y.preventDefault(),y.stopPropagation(),cn(V)}function yn(y,V,N){y.preventDefault(),y.stopPropagation(),qe.open(V,{missing_state:N})}async function Xt(y,V){let N=Object.hasOwn(_,y),Ae=_[y];if(_[y]=V,Ke(),!(!s||!u))try{let st=await Promise.resolve(s("update-exec-settings",Ju(u,y,V.length===0?null:V))),ot=Array.isArray(st)?st[0]:st;if(!ot||typeof ot!="object"||!ot.id)throw new Error("exec settings readback failed");d=ot,delete _[y],Ke()}catch(st){throw N?_[y]=Ae:delete _[y],Ke(),ue("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),st}}function sn(y){y.catch(()=>{})}async function nt(y,V){let N=d||{},Ae=N.metadata&&typeof N.metadata=="object"?N.metadata:{},st={};for(let Ve of["impl_runtime","impl_model","impl_effort"])st[Ve]=Object.hasOwn(_,Ve)?_[Ve]:typeof Ae[Ve]=="string"?Ae[Ve]:"";st[y]=V;let ot=sd(st,me(),Pe()),wt={};for(let Ve of["impl_runtime","impl_model","impl_effort"])wt[Ve]=_[Ve],_[Ve]=ot[Ve]||"";if(Ke(),!(!s||!u))return Promise.resolve(s("update-impl-target",{id:u,...ot,orchestration_runtime:Pe()})).then(Ve=>{let _t=Array.isArray(Ve)?Ve[0]:Ve;if(!_t||typeof _t!="object"||!_t.id)throw new Error("implementation target readback failed");d=_t;for(let Ee of["impl_runtime","impl_model","impl_effort"])delete _[Ee];Ke()}).catch(Ve=>{for(let _t of["impl_runtime","impl_model","impl_effort"])wt[_t]===void 0?delete _[_t]:_[_t]=wt[_t];throw Ke(),ue("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ve})}async function Be(y,V){if(!(!y||typeof y!="object")&&!(V==="diverged"&&!window.confirm("\uCD94\uCC9C \uC2E4\uD589 \uC124\uC815\uC744 \uC801\uC6A9\uD560\uAE4C\uC694? \uD604\uC7AC \uC218\uB3D9 \uC124\uC815\uC744 \uB36E\uC5B4\uC501\uB2C8\uB2E4."))){try{await Xt("orchestration_model",y.orchestration_model)}catch{return}if(typeof y.impl_runtime=="string"&&y.impl_runtime.length>0)try{await nt("impl_runtime",y.impl_runtime)}catch{}}}async function $(y,V,N){if(!s||!u)return!1;try{let Ae=await Promise.resolve(s(y,V)),st=Array.isArray(Ae)?Ae[0]:Ae;return st&&typeof st=="object"&&st.id?(d=st,!0):(ue(N,"error"),!1)}catch(Ae){return Ae&&typeof Ae=="object"&&Ae.code==="bd_readback_failed"?(ue("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ue(N,"error"),!1)}}function fe(y){setTimeout(()=>{try{let V=e.querySelector(y);V&&typeof V.focus=="function"&&V.focus()}catch{}},0)}function Fe(){q=!0,L=d&&d.title||"",Ke(),fe('.detail-edit__input[data-edit="title"]')}function kt(y){L=y.target.value}function jt(){q=!1,L="",Ke()}function Ot(){$("edit-text",{id:u,field:"title",value:L},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(V=>{V===!0&&(q=!1,L=""),Ke()})}function en(){z=!0,I=d&&d.description||"",Ke(),fe('.detail-edit__textarea[data-edit="description"]')}function on(y){I=y.target.value}function un(){z=!1,I="",Ke()}function vn(){$("edit-text",{id:u,field:"description",value:I},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(V=>{V===!0&&(z=!1,I=""),Ke()})}function Ht(y,V,N,Ae){if(y.key==="Escape"){y.stopPropagation(),N();return}y.key==="Enter"&&(!Ae||y.ctrlKey||y.metaKey)&&(y.preventDefault(),V())}function dn(y){let V=y.target.value;$("update-status",{id:u,status:V},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Ke())}function gn(y){let V=Number(y.target.value);$("update-priority",{id:u,priority:V},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Ke())}function bn(y){re=y.target.value}function Vn(){let y=re.trim();y.length!==0&&$("label-add",{id:u,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(V=>{V===!0&&(re=""),Ke()})}function Yn(y){if(y.key==="Escape"){y.stopPropagation(),re="",Ke();return}y.key==="Enter"&&(y.preventDefault(),Vn())}function S(y){$("label-remove",{id:u,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Ke())}let R={onCopyPath:hn,onOpenDoc:yn};function Oe(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function je(y){return y&&typeof y=="object"?String(y.dependency_type||y.type||""):""}function ut(y){switch(y){case"discovered-from":return"\u21A9 \uBC1C\uACAC ";case"parent-child":return"\u2338 \uC0C1\uC704 ";case"related":return"\uAD00\uB828 ";default:return y.length>0?`${y} `:""}}function St(y){if(!y||typeof y!="object")return;let V=typeof y.status=="string"?y.status:"",N=typeof y.title=="string"?y.title:"";return V.length>0&&N.length>0?`${V} \xB7 ${N}`:void 0}function tn(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function m(){return t.depCandidates?t.depCandidates():null}async function k(y,V,N){let Ae=tn(),st=u;if(!st)return;if(Ae.length===0){ue("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let ot=await $(y,{a:st,b:V,view_id:st,root_dir:Ae},N),wt=ot===!0||ot!==!1&&ot.saved===!0;wt&&t.onDepChanged&&t.onDepChanged({type:y,a:st,b:V}),y==="dep-add"&&wt&&(ge="",$e=!1),Ke()}function G(y){if(!u)return;let V=globalThis.confirm;typeof V=="function"&&!V(`${y}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||k("dep-remove",y,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function de(y){y.disabled||k("dep-add",y.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Te(y){ge=y.target.value,$e=!0,Ke()}function bt(){$e||($e=!0,Ke())}function it(y,V){if(y.key==="Escape"){y.stopPropagation(),ge="",$e=!1,Ke();return}y.key==="Enter"&&(y.preventDefault(),V.length===1&&!V[0].disabled&&de(V[0]))}function Qt(y){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${ge}
        @focus=${bt}
        @input=${Te}
        @keydown=${V=>it(V,y)}
      />
      ${$e||ge.length>0?c`<div class="detail-dep-add__list">
            ${y.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:y.map(V=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${V.bead_id}
                      ?disabled=${V.disabled}
                      title=${Tn(V.reason)}
                      @click=${()=>de(V)}
                    >
                      <span class="detail-dep-add__repo"
                        >${V.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${V.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${V.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function rn(y,V){let N=V.get(y.id),Ae=o?c`<button
          type="button"
          class="detail-dep__link"
          title=${Tn(y.title)}
          @click=${()=>N===void 0?o(y.id):o(y.id,N)}
        >
          ${y.label}
        </button>`:c`<span class="detail-dep__link" title=${Tn(y.title)}
          >${y.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${y.kind}${o?" detail-dep--link":""}`}
      >${Ae}${y.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${y.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+y.id}
            @click=${()=>G(y.id)}
          >
            ✕
          </button>`:""}</span
    >`}function an(y){let V=Array.isArray(y.dependencies)?y.dependencies:[],N=Array.isArray(y.dependents)?y.dependents:[],Ae=[];for(let Ve of V){let _t=Oe(Ve);_t.length>0&&je(Ve)==="blocks"&&Ae.push({id:_t,label:`\u26D3 \uB9C9\uB294 ${_t}`,kind:"pred",title:St(Ve)})}for(let Ve of N){let _t=Oe(Ve);_t.length>0&&je(Ve)==="blocks"&&Ae.push({id:_t,label:`\u26D3 \uB9C9\uD788\uB294 ${_t}`,kind:"succ",title:St(Ve)})}for(let Ve of V){let _t=Oe(Ve),Ee=je(Ve);_t.length>0&&Ee!=="blocks"&&Ae.push({id:_t,label:`${ut(Ee)}${_t}`,kind:"other",title:St(Ve)})}let st=m(),ot=new Map;if(st)for(let Ve of st.issues)ot.has(Ve.bead_id)||ot.set(Ve.bead_id,Ve.root_dir);let wt=st&&u?Cd(Td(u,st),ge):[];return c`
      <div class="detail-section-label">의존성</div>
      ${Ae.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${Ae.map(Ve=>rn(Ve,ot))}
          </div>`}
      ${st===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:Qt(wt)}
    `}function wn(y){let V=y.metadata||{},N=y.workflow||{},Ae=N.stages||{},st=Ae.spec&&Ae.spec.stale,ot=Ae.impl&&Ae.impl.stale,wt=N.quick_fix_review?.state==="stale",Ve=Ae.plan||null,_t=N.route_source==="derived",Ee=N.route||V.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${_t?" detail-kv__v--derived":""}"
          title=${_t?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${_t?"unset":Ee}</span
        >
      </div>
      ${N.route!=="quick_fix"||Object.hasOwn(V,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${V.spec_review||"\uC5C6\uC74C"}${st?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${N.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ve?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ve?.approval_receipt||"\uC5C6\uC74C"}${Ve?.approval_state==="stale"?" \xB7 stale":Ve?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${N.route!=="quick_fix"||Object.hasOwn(V,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${V.impl_review||"\uC5C6\uC74C"}${ot?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${N.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${N.resolver.attempt} \xB7 ${N.resolver.prior_sha} \u2192 ${N.resolver.sha}`}
              >${`${N.resolver.prior_sha.slice(0,7)} \u2192 ${N.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${N.route==="quick_fix"||Object.hasOwn(V,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${V.quick_fix_review||"\uC5C6\uC74C"}${wt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${N.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${N.planned_execution.kind}</span>
            </div>
            ${N.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${N.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${N.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${nr(N.exec_receipt)}</span
            >
          </div>`:""}
      ${N.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${N.impl_entry.actor}@${N.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${V.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${V.pr_url}</span>
          </div>`:""}
    `}let p={route:["quick_fix","spec_backed","full_plan"]};async function g(y,V){let N=V.target.value;if(y==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&N!=="full_plan"&&!window.confirm(`full_plan \u2192 ${N||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Ke();return}await $("update-workflow-meta",{id:u,key:y,value:N},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Ke()}function v(y){let V=y.metadata||{};return c` ${((Ae,st)=>{let ot=p[Ae],wt=typeof V[Ae]=="string"?V[Ae]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Ae}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Ae}
          data-edit=${`wfmeta-${Ae}`}
          @change=${Ve=>g(Ae,Ve)}
        >
          <option value="" ?selected=${!ot.includes(wt)}>
            ${st}
          </option>
          ${ot.map(Ve=>c`<option value=${Ve} ?selected=${wt===Ve}>${Ve}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function x(y,V){return q?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${L}
            @input=${kt}
            @keydown=${N=>Ht(N,Ot,jt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ot}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${jt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${y}</h2>
        ${_n(V).map(N=>c`<span class="detail-usage-total" title=${N.tooltip}
              >${N.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Fe}
        >
          ✎
        </button>
      </div>
    `}function B(y){let V=fn(y.created_at),N=fn(y.updated_at);return!V&&!N?c``:c`
      ${V?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${V}</span>
          </div>`:""}
      ${N?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${N}</span>
          </div>`:""}
    `}function Z(y,V){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${dn}
        >
          ${dy.map(N=>c`<option value=${N} ?selected=${N===y}>${N}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${gn}
        >
          ${py.map(N=>c`<option value=${String(N)} ?selected=${N===V}>
                P${N}
              </option>`)}
        </select>
      </div>
    `}function ne(y){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${z?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${en}
            >
              ✎
            </button>`}
      </div>
      ${z?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${I}
              @input=${on}
              @keydown=${V=>Ht(V,vn,un,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${vn}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${un}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Me(y){let V=typeof y.notes=="string"?y.notes:"";return V.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${V}</div>
    `}function Ze(y){let V=Array.isArray(y.labels)?y.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${V.map(N=>c`<span class="detail-label-chip"
              >${N}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${N}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+N}
                @click=${()=>S(N)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${re}
            @input=${bn}
            @keydown=${Yn}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Vn}
          >
            추가
          </button>
        </span>
      </div>
    `}function ft(){if(!u)return c``;let y=d||{},V=String(y.id||u),N=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Ae=We(),st=y.status||"open",ot=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",wt=y.description||"",Ve={...y,metadata:{...y.metadata||{},..._}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${It}
            >
              ${V}
            </button>
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>r()}
            >
              ✕
            </button>
          </div>
          ${x(N,Ae)}
          ${wp(Ve,{onApplyRec:Be})}
          ${vp({metadata:Ve.metadata,workspace_values:C(),catalog:me(),execution_defaults:oe(),expanded:F,presets:E()?.presets||[],preset_id:h,preset_busy:b,skipped_orchestration_keys:w},{onToggle:_t=>{F=_t,Ke()},onEdit:(_t,Ee)=>{if(_t==="impl_runtime"||_t==="impl_model"||_t==="impl_effort"){sn(nt(_t,Ee??""));return}sn(Xt(_t,Ee??""))},onPresetSelect:_t=>{h=_t,w=[],Ke()},onPresetApply:()=>{tt()}})}
          ${Ep({md:Ve.metadata,catalog:K,workspace_defaults:ie,handlers:{onExecChange:(_t,Ee)=>sn(Xt(_t,Ee))}})}
          ${Z(st,ot)} ${B(y)}
          ${ne(wt)}
          ${gp(J,M,{expanded:Ne,draft:te,sending:Se,error:T})}
          ${Me(y)} ${Ze(y)} ${an(y)}
          ${wn(y)} ${v(y)}
          ${fp(y,R)}
          ${Lp({expanded:yt,loading:vt,error:se,data:X},{onToggle:Rt})}
          ${Op(at(),A,{total:Ae,expanded:P},ct)}
        </div>
      </div>
    `}function Ke(){lt(ft(),e)}return{load(y){y!==u&&(_={},h="",w=[],F=!1,ce(),pe(),ve(),qt(),be()),u=y,d=null,!At&&t.subscribeCandidates&&(At=t.subscribeCandidates(()=>{u&&Ke()})),Ft(),Q(),Y!==y&&he(y)},clear(){u=null,d=null,_={},h="",b=!1,w=[],F=!1,ce(),pe(),ve(),qt(),be(),Mt(),qe.close(),rt.close(),lt(c``,e)},destroy(){_e&&(_e(),_e=null),Xe&&(Xe(),Xe=null),pt&&(pt(),pt=null),Mt(),document.removeEventListener("keydown",Zt),ae||(qe.destroy(),Ie&&Ie.parentNode&&Ie.parentNode.removeChild(Ie)),rt.destroy(),Ye.parentNode&&Ye.parentNode.removeChild(Ye),u=null,d=null,be(),h="",b=!1,w=[],pe(),ve(),qt(),lt(c``,e)}}}function Mp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
    <div class="fatal-error">
      <div class="fatal-error__icon" aria-hidden="true">!</div>
      <div class="fatal-error__body">
        <p class="fatal-error__eyebrow">Critical</p>
        <h2 class="fatal-error__title" id="fatal-error-title">Command failed</h2>
        <p class="fatal-error__message" id="fatal-error-message"></p>
        <pre class="fatal-error__detail" id="fatal-error-detail"></pre>
        <div class="fatal-error__actions">
          <button type="button" class="btn primary" id="fatal-error-reload">Reload</button>
          <button type="button" class="btn" id="fatal-error-close">Dismiss</button>
        </div>
      </div>
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,_="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}var fy="(max-width: 640px)";function qa(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(fy),n=!!t.matches;e(n);let r=s=>{let a=!!(typeof s=="object"&&s!==null&&typeof s.matches=="boolean"?s.matches:t.matches);a!==n&&(n=a,e(a))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function _y(){return{lanes:{done:!0},areas:{}}}function ro(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function my(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:ro(r.lanes),areas:ro(r.areas)}:{lanes:ro(r),areas:{}}}catch{return null}}function Pp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Fa(e,t=_y()){let n={lanes:ro(t.lanes),areas:ro(t.areas)},r=my(e),s={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(o){return s.lanes[o]===!0},isAreaCollapsed(o){return s.areas[o]===!0},toggle(o){let a=s.lanes[o]!==!0;return s={...s,lanes:{...s.lanes,[o]:a}},Pp(e,s),a},toggleArea(o){let a=s.areas[o]!==!0;return s={...s,areas:{...s.areas,[o]:a}},Pp(e,s),a}}}function Np(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let l=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:l})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let l=na(s[a].scope,s[i].scope);if(l.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Dp=["parallel","serial","candidate"];function so(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function xl(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=Dp.includes(r.kind),l=Dp.includes(s.kind);if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&l&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&l&&a===null){let u=gy(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:`${so(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${so(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function gy(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var qp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Fp={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function jp(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Al(e){for(let t of jp(e))if(Object.hasOwn(qp,t))return qp[t];return null}function Sl(e){let t=null;for(let n of jp(e))Object.hasOwn(Fp,n)&&(t=Fp[n]);return t}function ja(e){let t=Al(e),n=Sl(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Bp(e,t){let n=Al(e)??Al(t),r=Sl(t)??Sl(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Up=160;function by(e){return e.length>Up?`${e.slice(0,Up)}\u2026`:e}function hy(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${by(e.command)}</code>`:""}
  </div>`}function yy(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function vy(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Wp(e){let t=e.failure?ja(e.failure.reason):"";return c`<div class="worker-banners">
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?c`<button
                type="button"
                class="worker-banner__discard"
                data-bead-id=${e.failure.bead_id}
                data-attempt-id=${e.failure.resume_attempt_id||""}
                data-operation-id=${e.failure.discard.operation?.operation_id||""}
                data-confirmation=${e.failure.discard.confirmation}
                ?disabled=${!e.failure.discard.enabled}
                title=${e.failure.discard.title}
              >
                ${e.failure.discard.label}
              </button>`:""}
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${hy(e.failure.cause_detail,e.failure.reason)}
          ${yy(e.failure.reason)}
          ${Ms({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function wy(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var ky=new Set(["codex-runner"]);function $y(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&ky.has(b.agent_type))),l=i.filter(b=>b&&b.state==="live"),u=i.filter(b=>b&&b.state!=="live"),d=r&&typeof r.last_event_at=="number"?En(r.last_event_at,t):"",_=r?En(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:_?`\uAC31\uC2E0 ${_}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?c`<span class="rtile__activity-age"
              >${En(a,t)}</span
            >`:""}
      </div>`:h?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${h}</span>
        </div>`:""}${l.length>0||u.length>0?c`<div class="rtile__legs">
        ${l.map(b=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${b.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(b=>b.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var xy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Ay(e){if(!e)return"";let t=xy[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function El(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(we=>we&&we.current===!0)||null,a=e.failed===!0,i=!!e.paused,l=a?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):i?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?vy(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=hs(e),_=_n(e.usage),h=sr(e.usage),b=e.conflict_resolution?i?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,w=e.base_exception||null,F=e.landing,W=e.attempt_id&&e.attempt_id===n,K=r.monitor||null,ie=wy(K),Y=K?ca(K.dependency_chips):"",j=$y(K,t,i,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),q=s&&e.workflow?.chips?.exec_receipt||null,z=ua(e.workflow),L=da(e.rec),I=q?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${nr(q)}`}
        >${`${q.kind}:${qo(q)}`}</span
      >`:"",re=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${vs(o)}</span
      >`:"",ge=ie||z||re||I||L?c`<div class="rtile__meta">
          ${ie}${z}${re}${I}${L}
        </div>`:"",$e=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${w?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${w}</span
      >`:""}`,ce=s?"":rs(e),be=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${W?" rtile--sel":""}${i?" rtile--paused":""}${a?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${pa(e.priority)}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}${$e}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${Ay(o)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${l}</span>`}
        ${s?"":a?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${be}
                <button
                  type="button"
                  class="rtile__dismiss"
                  title="실패 알림 닫기 — 레인에는 남습니다"
                  aria-label="실패 기록 닫기"
                >
                  ✕
                </button>`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${i?c`<button
                      type="button"
                      class="rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶
                    </button>`:c`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${e.can_pause===!1}
                      title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${be}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${j}${e.rollup?Do(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:hi}):""}
    ${F?c`<div class="rtile__landing">
          <span
            class="merge-step${F.failed?" merge-step--failed":""}"
            style=${`--progress: ${F.percent}%`}
            >${F.label}${F.index>0?c`<span class="merge-step__n"
                  >${F.index}/${F.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${Y}
    ${s?ge:ie||z||u||L||_.length>0||h?c`<div class="rtile__meta">
            ${ie}${z}${la(e.exec_chips)}${L}
            ${_.length>0?_.map(we=>c`<span class="worker-usage" title=${we.tooltip}
                      >${we.label}</span
                    >`):h?c`<span
                    class="worker-usage"
                    title=${ws(e.usage)}
                    >${h}</span
                  >`:""}
          </div>`:""}
    ${Ms(e)} ${ce}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${a||i?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function zp(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>El(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var mn="",Sy=["impl_runtime","impl_model","impl_effort"],Ey=["claude_account","codex_account"],Ty=5,Ba=1;function Rn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ua(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>ue(P,"error",4e3)),o={},a={},i=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},_={},h=Promise.resolve(),b={claude:null,codex:null},w=!1,F=null,W={},K="",ie="",Y=!1,j=!1,q=!1,z=null,L=!1;function I(){let P=t.queue?t.queue():null;return Rn(P)?P:null}function re(){let P=I();return P?P.runner_catalog:null}function ge(){let P=I();return P&&Rn(P.execution_defaults)?P.execution_defaults:null}function $e(){let P=t.implPresetStore?.get();return Rn(P)&&Array.isArray(P.presets)?P:null}function ce(){return r===null?{}:{root_dir:r}}async function be(P,ee){return L||!n?null:await n(P,ee)}function we(P){P&&Rn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function Ge(P,ee){let ye=I();if(!ye||L)return null;let O=await be(P,{...ee,...ce(),expected_revision:ye.revision});if(we(O),r!==null&&O&&O.conflict){let H=O.queue&&typeof O.queue.revision=="number"?O.queue.revision:I()?.revision??ye.revision;O=await be(P,{...ee,...ce(),expected_revision:H}),we(O)}return O}async function he(){l=!0,We();try{let P=await be("get-session-defaults",{...ce()});o=Rn(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{l=!1,We()}}async function J(){let P=Zu(o,a);if(Object.keys(P).length!==0){try{let ee=await be("set-session-defaults",{values:P,...ce()});o=Rn(ee?.values)?{...ee.values}:{},a={...o},i=Array.isArray(ee?.warnings)?ee.warnings:[]}catch(ee){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}We()}}function Re(P,ee){if(!Rn(P))return;let ye=P.state;u={state:ye==="usable"||ye==="unusable"||ye==="absent"?ye:"absent",values:Rn(P.values)?{...P.values}:{},warnings:Array.isArray(P.warnings)?P.warnings:[]},_={...u.values},ee&&(d={..._})}async function De(){try{Re(await be("get-workspace-accounts",{...ce()}),!0)}catch(P){u={state:"unusable",values:{},warnings:["kv_read_failed"]},_={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}We()}async function T(P){try{let ee=await fetch(P);if(!ee.ok)return null;let ye=await ee.json();if(!Rn(ye)||!Array.isArray(ye.accounts))return null;let O=ye.accounts.filter(H=>Rn(H)&&typeof H.key=="string"&&H.key.length>0&&typeof H.email=="string"&&H.email.length>0);return{accounts:O,active:O.find(H=>H.active===!0)||null}}catch{return null}}async function te(){w=!0;let[P,ee]=await Promise.all([T("/api/claude-usage"),T("/api/codex-usage")]);L||(b={claude:P,codex:ee},We())}function Se(){let P={};for(let ee of Ey){let ye=Object.hasOwn(d,ee)?d[ee]:null,O=Object.hasOwn(_,ee)?_[ee]:null;ye!==O&&(P[ee]=ye)}return P}async function ke(){let P=Se();if(Object.keys(P).length!==0){try{Re(await be("set-workspace-accounts",{values:P,...ce()}),!1)}catch(ee){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}We()}}function Ne(P,ee){ee===mn?delete d[P]:d[P]=ee,We(),h=h.then(()=>ke())}function pe(P,ee){if(Sy.includes(P)){Et(P,ee);return}ee===mn?delete a[P]:a[P]=ee,We(),J()}function Le(){let P=Rt().orchestration_model,ee=Cn({global:{orchestration_model:P??void 0},execution_defaults:ge(),runner_catalog:re()}).orchestration_model.value;return ee?jn(re(),ee):null}function et(P,ee){typeof ee=="string"&&ee.length>0?a[P]=ee:delete a[P]}function Et(P,ee){let ye=ee===mn?void 0:ee,O=Vu({impl_runtime:P==="impl_runtime"?ye:a.impl_runtime,impl_model:P==="impl_model"?ye:a.impl_model,impl_effort:P==="impl_effort"?ye:a.impl_effort},re(),Le());et("impl_runtime",O.impl_runtime),et("impl_model",O.impl_model),et("impl_effort",O.impl_effort),We(),J()}async function xt(){let P=I();if(!P)return;let ee={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},ye=Xu(ee,{...ee,...W});if(Object.keys(ye).length!==0){try{let O=await Ge("worker-queue-set-orchestration-defaults",{values:ye});if(O&&O.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}W={}}catch(O){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}We()}}function ht(P,ee){W[P]=ee===mn?null:ee,We(),xt()}function M(P){if(F=P,!P){We();return}let ee=re(),ye=Rt(),O=ye.orchestration_model;O&&!Os(ee,P).includes(O)&&(W.orchestration_model=null,O=null);let H=ye.orchestration_effort;H&&!Li(ee,P,O||In).includes(H)&&(W.orchestration_effort=null),We(),xt()}async function ae(P){if(!(!I()||P<Ba)){try{await Ge("worker-queue-set-slots",{slots:P})}catch(ee){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}We()}}async function Ie(P){if(!(!I()||P<Ba||P>Ty)){try{await Ge("worker-queue-set-serial-lane-count",{count:P})}catch(ee){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}We()}}async function qe(P,ee){let ye=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Ge(ye,{on:ee})}catch(O){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}We()}function Ye(){let P={},ee=Rt();for(let ye of Vo){let O=or.includes(ye)?ee[ye]:a[ye];typeof O=="string"&&O.length>0&&(P[ye]=O)}return P}async function rt(){let P=$e();if(!P)return;let ee=Ye();if(Object.keys(ee).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ye=(P.presets||[]).find(H=>H.id===K),O=ie.trim()||(ye?ye.name:"");if(!O){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let H=ye?await be("impl-preset-update",{expected_revision:P.revision,id:ye.id,name:O,settings:ee}):await be("impl-preset-create",{expected_revision:P.revision,name:O,settings:ee});if(H&&H.applied){if(ie="",!ye&&Array.isArray(H.presets)){let Ce=H.presets.find(A=>A.name===O);K=Ce?Ce.id:K}We()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We()}catch(H){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}}async function yt(){let P=$e();if(!(!P||K.length===0))try{let ee=await be("impl-preset-delete",{expected_revision:P.revision,id:K});ee&&ee.applied?(K="",We()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We())}catch(ee){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}}function vt(P){o=Rn(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],Rn(P.queue)&&(t.onQueueAdopt?.(P.queue),W={})}async function se(){let P=$e(),ee=I();if(!P||!ee||K.length===0)return;let ye=O=>({preset_id:K,expected_revision:P.revision,expected_queue_revision:O,...ce()});try{let O=await be("apply-impl-preset-global",ye(ee.revision));if(O&&O.applied&&vt(O),r!==null&&O&&O.queue_applied===!1){let H=O.queue&&typeof O.queue.revision=="number"?O.queue.revision:I()?.revision??ee.revision;O=await be("apply-impl-preset-global",ye(H)),O&&O.applied&&vt(O)}O&&O.applied?O.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):O&&O.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(O){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}We()}async function X(){j=!0,q=!1,We();try{let P=await be("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?q=!0:z=P}catch{q=!0}finally{j=!1,We()}}function Ue(){if(Y=!Y,Y&&!z){X();return}We()}function dt(){let P=as({loading:j,error:q});if(P)return P;if(!z)return"";let ee=Array.isArray(z.variants)?z.variants:[];return c`<div class="settings-dialog__sp-body">
      ${z.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${z.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${ee.map(ye=>c`<div class="settings-dialog__sp-variant" data-variant=${ye.key}>
            <div class="settings-dialog__sp-cond">${ye.condition}</div>
            ${cr(ye.label,ye.system_prompt)}
          </div>`)}
    </div>`}function ze(){return c`<section
      class="settings-dialog__group"
      data-seam="system-prompt"
    >
      <div class="settings-dialog__group-title">
        워커 시스템 프롬프트
        <span class="settings-dialog__hint">읽기 전용 — 서버가 조립</span>
      </div>
      <button
        type="button"
        class="settings-dialog__btn"
        data-seam="system-prompt-toggle"
        aria-expanded=${Y?"true":"false"}
        @click=${Ue}
      >
        ${Y?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Y?dt():""}
    </section>`}function ve(P,ee,ye,O,H,Ce,A){let C=H[P]??mn,Q=Ii(P,ye,H,ge(),re(),A),me=Q.options.find(Pe=>Pe.value===C),oe=C===mn?Q.full_value:me?.full_value;return c`<select
        class=${C===mn?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${ee}
        title=${oe||""}
        ?disabled=${Ce===!0||Q.disabled}
        .value=${Mr(String(C))}
        @change=${Pe=>O(P,String(Pe.target.value))}
      >
        <option value=${mn} ?selected=${C===mn}>
          ${Q.unset_label}
        </option>
        ${Q.options.map(Pe=>c`<option
              value=${Pe.value}
              title=${Pe.full_value||""}
              ?selected=${Pe.value===C}
            >
              ${Pe.label}
            </option>`)}
      </select>
      ${C===mn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Qe(P,ee,ye,O,H,Ce=!1,A){return c`<div
      class=${`settings-dialog__row${Ce?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        ${ve(P,ee,ye,O,H,Ce,A)}
      </span>
    </div>`}function ct(P,ee){let ye=ee?ee.active:null;return Rn(ye)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${P==="claude"?ye.email:ls({...ye,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function mt(P,ee,ye){let O=b[ye],H=Object.hasOwn(d,P)?d[P]:mn,Ce=ye==="claude"?Pa:ls,A=!!O?.accounts.some(C=>C.key===H);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${ee}
          data-account-key=${P}
          @change=${C=>Ne(P,String(C.target.value))}
        >
          <option value=${mn} ?selected=${H.length===0}>
            ${ct(ye,O)}
          </option>
          ${H.length>0&&!A?c`<option value=${H} selected>
                ${H} (목록에 없음)
              </option>`:""}
          ${O?.accounts.map(C=>c`<option value=${C.key} ?selected=${C.key===H}>
                ${Ce(C)}
              </option>`)||""}
        </select>
        ${O?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function gt(){let P=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${P} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${P}`:null}function zt(P,ee,ye,O,H){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${ee}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${ve(ye,`${P} \uBAA8\uB378`,O,pe,a,!1)}
        ${ve(H,`${P} effort`,Xo,pe,a,!1)}
      </span>
    </div>`}function qt(P,ee,ye,O){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${O?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${O?"true":"false"}
          aria-label=${ee}
          @click=${()=>qe(P,!O)}
        >
          ${O?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ye}</span>
      </span>
    </div>`}function Kt(P,ee,ye,O){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${ee} \uAC10\uC18C`}
            @click=${()=>O(ye-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ye}</span>
          <button
            type="button"
            aria-label=${`${ee} \uC99D\uAC00`}
            @click=${()=>O(ye+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ct(P){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${P.rows.length>0?`\uBCC0\uACBD ${P.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${P.rows.map(ee=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${ee.kind}
          >
            <span class="settings-dialog__preset-diff-label">${ee.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${ee.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${ee.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${P.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${P.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Rt(){let P=I(),ee={};for(let ye of or)ee[ye]=Object.prototype.hasOwnProperty.call(W,ye)?W[ye]:P&&typeof P[ye]=="string"?P[ye]:null;return ee}function at(){let P=re(),ee=a.impl_runtime,ye=a.impl_model,O=$e(),H=I(),Ce=Rt(),A=Os(P,F),C=es(P,void 0).filter(_e=>_e!==In),Q=Li(P,F,Ce.orchestration_model||In).filter(_e=>_e!==In),me=K?(O?.presets||[]).find(_e=>_e.id===K):null,oe=me?Yu(Ye(),Rn(me.settings)?me.settings:{}):null,Pe=H&&typeof H.slots=="number"?H.slots:Ba+1,E=H&&typeof H.serial_lane_count=="number"?H.serial_lane_count:Ba,U=ge()?.supported===!0,xe=gt(),tt=Ii("workflow_mode",Cs,a,ge(),P);return c`
      ${i.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${xe?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${xe}
          </div>`:""}
      ${U?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${l?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${Mr(K)}
                @change=${_e=>{K=String(_e.target.value),We()}}
              >
                <option value="" ?selected=${K===""}>
                  실행 프리셋…
                </option>
                ${(O?.presets||[]).map(_e=>c`<option
                      value=${_e.id}
                      ?selected=${_e.id===K}
                    >
                      ${_e.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!oe||oe.rows.length===0}
                @click=${se}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${K?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Mr(ie)}
                @input=${_e=>{ie=String(_e.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${K?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${rt}
              >
                ${K?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${K.length===0}
                @click=${yt}
              >
                삭제
              </button>
            </div>
            ${oe?Ct(oe):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Mr(F||mn)}
                    @change=${_e=>{let Xe=String(_e.target.value);M(Xe===mn?null:Xe)}}
                  >
                    <option value=${mn} ?selected=${!F}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${F==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${F==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Qe("orchestration_model","\uBAA8\uB378",A,ht,Ce)}
              ${Qe("orchestration_effort","effort",Q,ht,Ce)}
              ${Qe("orchestration_speed","\uC18D\uB3C4",Ts,ht,Ce)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${mt("claude_account","Claude","claude")}
              ${mt("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${mn}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>pe("workflow_mode",mn)}
                    >
                      ${tt.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Cs.map(_e=>c`<button
                          type="button"
                          data-mode=${_e}
                          aria-pressed=${String(a.workflow_mode===_e)}
                          @click=${()=>pe("workflow_mode",_e)}
                        >
                          ${_e}
                        </button>`)}
                  </span>
                </span>
              </div>
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort</span>
              </div>
              ${zt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Rs,"spec_review_effort")}
              ${zt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Zo,"plan_review_effort")}
              ${zt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Rs,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Qe("impl_runtime","\uC704\uC784 \uB300\uC0C1",Yo,pe,a)}
              ${Qe("impl_model","\uBAA8\uB378",es(P,ee),pe,a)}
              ${Qe("impl_effort","effort",ts(P,ee,ye),pe,a)}
              ${Qe("impl_speed","\uC18D\uB3C4",Ts,pe,a)}
              ${Qe("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",C,pe,a,!1,{...a,...Ce})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${qt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",H?.auto_advance===!0)}
              ${qt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",H?.auto_merge===!0)}
              ${qt("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",H?.auto_repair===!0)}
              ${Kt("slots","\uB3D9\uC2DC \uC2E4\uD589",Pe,_e=>ae(_e))}
              ${Kt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",E,_e=>Ie(_e))}
            </div>
            ${ze()}
          `}
    `}function We(){L||lt(at(),e)}return{load(){W={};let P=[he(),De()];return w||P.push(te()),Promise.all(P).then(()=>{})},render:We,sessionDraft:()=>({...a}),destroy(){L=!0,lt(c``,e)}}}function Wa(e){return c`<svg
    class="mon-i"
    viewBox="0 0 16 16"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    ${e}
  </svg>`}function Hp(){return Wa(gs`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Gp(){return Wa(gs`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Kp(){return Wa(gs`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Vp(){return Wa(gs`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Yp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Zp(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return _n(Wo(t));let n={};for(let i of Qn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Qn){let _=l[d];typeof _=="number"&&Number.isFinite(_)&&(n[d]+=_,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?sr(n):null}function Kn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Tl(e,t){let n=Kn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Cy(e,t){if(!Kn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function Ry(e){if(!Kn(e)||!Kn(e.execution_defaults)||!Kn(e.runner_catalog)||!Kn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=Cn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=jn(e.runner_catalog,n.orchestration_model.value??""),s=Rr(n,e.runner_catalog),o=gr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Xp(e,t){let n=t.notify||(T=>ue(T,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,_=null,h=new Map;function b(){let T=t.workspacesState?t.workspacesState():[];return Array.isArray(T)?T.filter(te=>Kn(te)):[]}function w(T){return b().find(te=>te.root_dir===T)||null}function F(T){return Cy(w(T),h.get(T))}function W(){for(let T of b()){let te=h.get(T.root_dir);te&&typeof te.revision=="number"&&typeof T.revision=="number"&&T.revision>=te.revision&&h.delete(T.root_dir)}}async function K(T,te,Se){let ke=t.transport,Ne=F(te);if(!(!ke||!Kn(Ne))){try{let pe=await ke(T,{...Se,root_dir:te,expected_revision:Ne.revision});if(Kn(pe?.queue)&&h.set(te,pe.queue),pe&&pe.conflict){let Le=Kn(pe.queue)&&typeof pe.queue.revision=="number"?pe.queue.revision:F(te)?.revision;pe=await ke(T,{...Se,root_dir:te,expected_revision:Le}),Kn(pe?.queue)&&h.set(te,pe.queue)}}catch(pe){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${pe instanceof Error?pe.message:String(pe)}`)}J()}}function ie(T){u!==T&&(u=T,t.onFocusChange?.(u),J())}function Y(T){ie(u===T?null:T)}function j(T){if(d===T){z();return}q(),d=T;let te=w(T);a.textContent=`${te?.name||T} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,_=Ua(l,{root_dir:T,queue:()=>F(T),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Se=>{h.set(T,Se),J()}}),_.load(),J()}function q(){_?.destroy(),_=null}function z(T){q(),d=null,s.hidden=!0,a.textContent="",T!==!0&&J()}let L=()=>z();i.addEventListener("click",L);function I(T){T.key==="Escape"&&u!==null&&ie(null)}document.addEventListener("keydown",I);function re(T,te){let Se=Math.max(te,T,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${te}\uAC1C \uC911 ${T}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Se},(ke,Ne)=>Ne<T?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function ge(T){let te=T.auto_advance===!0,Se=T.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${te?" is-on":""}`}
        data-act="auto"
        aria-pressed=${te?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9\uD654`}
        title=${te?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${te?Gp():Hp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Se?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Se?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Se?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Kp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===T.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===T.root_dir?"true":"false"}
        aria-label=${`${T.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Vp()}
      </button>`}function $e(T){let te=Ry(T);return te?c`<div class="mon2-deck__chips">
      ${te.orchestration?c`<span class="mon2-deck__chip" title=${te.orchestration.title}
            >오케 ${te.orchestration.text}</span
          >`:""}
      ${te.worker?c`<span class="mon2-deck__chip" title=${te.worker.title}
            >워커 ${te.worker.text}</span
          >`:""}
    </div>`:""}function ce(T){let te=[];for(let[Se,ke]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ne=Tl(T,Se);Ne>0&&te.push(`${ke} ${Ne}`)}return te.join(" \xB7 ")}function be(T){let te=Tl(T,"running"),Se=typeof T.slots=="number"?T.slots:1;return c`<div
      class=${`mon2-deck__tile${u===T.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${T.root_dir}
      aria-pressed=${u===T.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${T.root_dir}>${T.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Se}\uAC1C \uC911 ${te}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${te}/${Se}</span>
          ${re(te,Se)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${T.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${ge(T)}</div>
        <span class="mon2-deck__counts">${ce(T)}</span>
        ${$e(T)}
      </div>
    </div>`}function we(T){let te=t.doneItems?t.doneItems():[],Se=t.rangeLabel?t.rangeLabel():"",ke=Zp(Array.isArray(te)?te:[]),Ne=pe=>T.reduce((Le,et)=>Le+Tl(et,pe),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${T.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Se}`}
        >실행 ${Ne("running")} · 대기 ${Ne("queue")} · PR
        ${Ne("pr_wait")}${Ne("session_active")>0?` \xB7 \uC138\uC158 ${Ne("session_active")}`:""}
        · ${Se} 완료
        ${Array.isArray(te)?te.length:0}</span
      >
      ${ke===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ke=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Yp(Se)}
                  >${ke}</span
                >`:ke.map(pe=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${pe.provider}
                      title=${pe.tooltip}
                      >${pe.label}</span
                    >`)}
          </span>`}
    </div>`}function Ge(){let T=b();return T.length===0?"":c`${we(T)}
      <div class="mon2-deck__strip">
        ${T.map(te=>be(te))}
      </div>`}function he(){u!==null&&!w(u)&&(u=null,t.onFocusChange?.(null))}function J(){W(),he(),d!==null&&!w(d)&&z(!0),lt(Ge(),r),_?.render()}function Re(T){let te=T.target;if(!te||typeof te.closest!="function")return;let Se=te.closest("[data-root-dir]");if(!Se)return;let ke=Se.getAttribute("data-root-dir")||"",Ne=te.closest("[data-act]")?.getAttribute("data-act");if(Ne==="worker"){t.gotoWorkerTab?.(ke);return}if(Ne==="auto"){K("worker-automation-toggle",ke,{on:F(ke)?.auto_advance!==!0});return}if(Ne==="merge"){K("worker-merge-auto-toggle",ke,{on:F(ke)?.auto_merge!==!0});return}if(Ne==="gear"){j(ke);return}Y(ke)}function De(T){if(T.key!=="Enter"&&T.key!==" ")return;let te=T.target;if(!te||typeof te.closest!="function")return;let Se=te.closest('[data-root-dir][role="button"]');!Se||Se!==te||(T.preventDefault(),Y(Se.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Re),r.addEventListener("keydown",De),{render:J,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",I),r.removeEventListener("click",Re),r.removeEventListener("keydown",De),i.removeEventListener("click",L),q(),lt(c``,r),e.replaceChildren()}}}var Qp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",Oy=1e4;function Jp(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function ef(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var sf="bdui.monitor.done-range",of="bdui.monitor.running_sort",af="bdui.monitor.candidate_sort",lf="beads-ui.monitor.candidate-filter",cf="beads-ui.monitor.sections";function Ly(){try{let e=window.localStorage.getItem(lf);if(!e)return{...ss};let t=JSON.parse(e);return!t||typeof t!="object"?{...ss}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:ss.show_blocked,spec:Gi.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...ss}}}function tf(e){try{window.localStorage.setItem(lf,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Iy(){try{let e=window.localStorage.getItem(af);return Bs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function My(e){try{window.localStorage.setItem(af,e)}catch{}}function Py(){try{let e=window.localStorage.getItem(cf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Dy(e){try{window.localStorage.setItem(cf,JSON.stringify(e))}catch{}}function Ny(){try{let e=window.localStorage.getItem(sf);return e===null?"today":Zn(e)}catch{return"today"}}function qy(e){try{window.localStorage.setItem(sf,e)}catch{}}function Fy(){try{return window.localStorage.getItem(of)==="repo"?"repo":"started"}catch{return"started"}}function jy(e){try{window.localStorage.setItem(of,e)}catch{}}var uf="tab:monitor:pipeline",By=1e3,nf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Uy=["queue","runnable","done"],rf="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Wy(e){return e>=1&&e<=rf.length?rf[e-1]:`(${e})`}function df(e,t){let n=Gt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),_=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),h=Ny(),b=Fy(),w=Ly(),F=Iy(),W=Py(),K=Fa("beads-ui.monitor.lane-collapsed"),ie=!1,Y=null,j=null,q=null,z=null,L=[],I=null,re=null,ge=null,$e=null;function ce(p){return $e===null&&($e=cn()),Ou(p,$e)}function be(p,g){we(),!(g<=0)&&(re={lane_id:p,corrected:g},ge=setTimeout(()=>{ge=null,re=null,oe()},Oy))}function we(){ge!==null&&(clearTimeout(ge),ge=null),re=null}function Ge(){let p=Br.find(g=>g.value===h);return p?p.label:""}let he=document.createElement("div");he.className="mon",e.appendChild(he);let J=document.createElement("div");J.className="worker-drawer-overlay",J.hidden=!0;let Re=document.createElement("div");Re.className="worker-drawer-overlay__backdrop";let De=document.createElement("div");De.className="worker-drawer-host mon2-drawer",J.append(Re,De),e.appendChild(J);let T=Us(null,null),te=new Map,Se=new Map,ke=null,Ne=null,pe=null,Le=is(De,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{j=null,J.hidden=!0,oe()}});async function et(p,g,v,x,B=!0){if(!o||!v)return null;let Z=await o(p,{...g,root_dir:v,expected_revision:x});if(Z&&Z.conflict&&B){Z.queue&&Se.set(v,Z.queue);let ne=Z.queue&&typeof Z.queue.revision=="number"?Z.queue.revision:x;Z=await o(p,{...g,root_dir:v,expected_revision:ne})}return Z&&Z.queue&&v&&Se.set(v,Z.queue),Z}function Et(p,g){let v=Se.get(p),x=s&&s.get?s.get():null,B=(Array.isArray(x)?x:[]).find(ne=>ne?.root_dir===p);return(v||B)?.merge_queue?.find(ne=>ne.bead_id===g)?.continuation_action}async function xt(p,g,v,x){let B=await et(p,g,v,x),Z=Se.get(v)?.revision??B?.queue?.revision??x;return rr(B,(ne,Me)=>et(p,{...g,continuation:ne,decision_token:Me},v,Z,!1),{refresh:ne=>et(p,g,v,ne?.queue?.revision??Se.get(v)?.revision??Z,!1)})}async function ht(p,g,v,x){let B=await rr({continuation_mismatch:x},(ne,Me)=>et("worker-merge-queue-add",{bead_id:g,continuation:ne,decision_token:Me},p,v,!1)),Z=B?.queue?.merge_queue?.find(ne=>ne.bead_id===g)?.continuation_action;B?.applied!==!0&&Z?.continuation===null&&Z.mismatch&&await ht(p,g,B.queue.revision,Z.mismatch)}async function M(p,g,v){let x=await et("worker-discard",p,g,v);if(x&&x.discarded===!0){ue(ia(x),"success",5e3);return}if(x&&x.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${x.reason}`,"error");return}if(x&&x.accepted&&x.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(x&&x.accepted){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${x.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}x&&!x.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ae(p,g,v){return!o||!v?null:await o(p,{...g,root_dir:v})}async function Ie(){let p=new Map;for(let g of T.pr_wait)p.has(g.root_dir)||p.set(g.root_dir,g.expected_revision);for(let[g,v]of p)await et("worker-merge-queue-add-all",{},g,v)}function qe(p){let g=W[p];return!!(g&&g.runnable===!0)}function Ye(p){let g={...W[p]||{}};g.runnable=!g.runnable,W={...W,[p]:g},Dy(W),oe()}function rt(p){K.toggle(p),oe()}function yt(p){K.toggleArea(p),oe()}function vt(p){let g=T.queue_groups.find(v=>v.root_dir===p);if(!g)return null;for(let v=0;v<g.serial_lane_count;v+=1){let x=`s${v+1}`,B=g.sublanes.serial.find(Z=>Z.id===x);if(!B||B.raw_length===0&&B.occupied_by.length===0)return x}return null}function se(p,g){let v=T.queue_groups.find(B=>B.root_dir===p),x=v?v.sublanes.serial.find(B=>B.id===g):void 0;return x?x.raw_length:0}function X(p,g){let v=te.get(p),x=te.get(g);if(!v||!x)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let B=Jp(v),Z=Jp(x);if(B!==null&&B===Z&&v.root_dir===x.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let ne=ef(v),Me=ef(x);if(ne&&Z!==null){let Ze=Z;return{kind:"ops",title:`${Ze} \uB05D\uC5D0 ${p}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:x.root_dir,ops:[{bead_id:p,lane:Ze,index:se(x.root_dir,Ze)}]}}if(B!==null&&Me&&Z===null){let Ze=B;return{kind:"ops",title:`${Ze} \uB05D\uC5D0 ${g}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:g,lane:Ze,index:se(v.root_dir,Ze)}]}}if(ne&&B===null&&Me&&Z===null){let Ze=vt(v.root_dir);return Ze===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Ze} \uB808\uC778\uC5D0 ${g} \u2192 ${p} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:g,lane:Ze,index:0},{bead_id:p,lane:Ze,index:1}]}}return!ne&&!Me?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:ne?{kind:"note",text:`${so(x.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${so(v.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Ue(p,g){let v=X(p,g.id);return{id:g.id,title:g.title,location_label:g.location_label,prefixes:g.prefixes,action:v.kind==="note"?{kind:"note",text:v.text}:v.kind==="disabled"?{kind:"disabled",label:Qp,title:v.title}:{kind:"place",label:Qp,title:v.title}}}function dt(p,g){if(!z||z.bead_id!==p)return null;let v=z.counterpart_id,x=g.filter(B=>B.id===v);return x.length===0?null:{rows:x.map(B=>Ue(p,B))}}function ze(p){let g=p.dependency_chips||null,v=p.overlap_chips||[],x=p.scope_state==="missing",B=p.cross_lane_chip,Z=p.armed_lane_chip;if(!g&&v.length===0&&!x&&!B&&!Z)return null;let ne=dt(p.id,v);return{...g||{},...v.length>0?{overlaps:v}:{},...x?{scope_missing:!0}:{},...B?{cross_lane:{lane_id:B.lane_id,label:B.label}}:{},...Z?{armed_lane:Z}:{},...ne?{popover:ne}:{}}}function ve(p){let g=ze(p);return g?{...p,dependency_chips:g}:p}async function Qe(p,g){let v=X(p,g);if(z=null,v.kind!=="ops"){oe();return}let x=hn(v.root_dir,v.ops[0].bead_id);for(let B of v.ops){let Z=await ct(B,v.root_dir,x);if(Z===null)break;x=Z}oe()}async function ct(p,g,v){try{let x=await et("worker-queue-place",p,g,v,!1);if(x&&x.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!x||x.applied!==!0)return ue(x&&typeof x.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${x.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let B=x.queue?x.queue.revision:void 0;return typeof B!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):B}catch(x){return ue(pt(x),"error"),null}}function mt(p){let g=qe(p.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${p.root_dir}
        data-section="runnable"
        aria-expanded=${g?"false":"true"}
        aria-label=${`${p.name} \uC139\uC158 ${g?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${g?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${p.root_dir}>${p.name}</span>
      <span class="mon2-sec__count">${p.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function gt(p,g){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${g}
    </div>`}function zt(p){if(q!==p.id)return null;let g=T.queue_groups.find(Z=>Z.root_dir===p.root_dir),v=p.place_lanes||[],x=T.cross_lanes_revision!==null,B=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let Z of T.chain_lanes)B.push({id:`lane:${Z.lane_id}`,label:`\uC5F0\uACB0 ${Z.number} (${Z.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:Z.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!x});B.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!x,title:x?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let Z of v)B.push({id:`serial:${Z.id}`,label:`\uC9C1\uB82C ${Number(Z.id.slice(1))}`,count:Z.length,group:`${g?g.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:B}}function qt(p){return gt(p,c`${Fi(ve(p),zt(p),{exec_chips_mode:"pinned_only",onOpenDoc:i?(g,v)=>i(v,p.root_dir):void 0})}`)}function Kt(){return T.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${T.runnable.map(p=>qt(p))}
      </div>`:c`${T.runnable_sections.map(p=>{let g=qe(p.root_dir);return c`<section
        class="mon2-sec${g?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${mt({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${g?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(v=>qt(v))}
            </div>`}
      </section>`})}`}function Ct(p,g=!1){return c`<span class="worker-mini__rowops">
      ${g?c`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${p.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${p.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${p.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function Rt(p,g){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${g}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Un(ve(p),{actions:Ct(p,!0)})}
    </div>`}function at(p,g,v,x){return c`<div
      class="mon2-crow${g.fixed?" mon2-crow--fixed":""}"
      draggable=${g.draggable?"true":"false"}
      data-bead-id=${g.id}
      data-drag-kind="chain"
      data-root-dir=${g.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${v}
      data-queue-index=${typeof g.queue_index=="number"?String(g.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Wy(g.seq)}</span
      >
      ${g.workspace_name?c`<span class="worker-mini__repo" title=${g.root_dir}
            >${g.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${g.id}</span>
      <span class="mon2-crow__title">${g.title}</span>
      ${g.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${x.includes(g.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${g.location_title}
        >${g.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${g.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function We(p){let g=T.cross_lanes_revision!==null,v=ce(p.lane_id),x=v?.held===!0,B=v?.cycle===!0,Z=v?v.mismatched:[],ne=re&&re.lane_id===p.lane_id?re.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${ne>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${ne}건 자동 교정</span
            >`:""}
        ${B?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${x?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Ho}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!g||!p.can_confirm||x}
              title=${x?Ho:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${p.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${p.run_label}
            </button>`:""}
        ${p.state==="confirmed"&&p.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${p.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${p.lane_id}
          ?disabled=${!g}
          title=${p.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${p.lane_id}
      >
        ${p.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:p.rows.map((Me,Ze)=>at(p,Me,Ze,Z))}
      </div>
    </div>`}function P(p,g,v){return c`<div
      class="mon2-item"
      data-bead-id=${g.id}
      data-drag-kind="repo-serial"
      data-root-dir=${g.root_dir}
      data-lane-id=${p.id}
      data-row-index=${v}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${Un(ve(g),{actions:Ct(g)})}
    </div>`}function ee(p){if(p.length===0)return"";let g=p.length-1;return`${p[0].id} \uC810\uC720${g>0?` +${g}`:""}`}function ye(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${Un({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function O(p,g){let v=g.occupants,x=g.cross_wait_peers||[];return{id:g.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${g.index+1}`,rows:[...v.map(B=>ye(B)),...g.items.map((B,Z)=>P(g,B,Z))],count:g.items.length,empty:g.empty===!0,...v.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${v.map(B=>`${B.id} \u2014 ${B.badge}`).join(`
`)}
              >${ee(v)}</span
            >`,held:!0}:{},cycle:g.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...x.length>0?{after:c`${x.map(B=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${B.workspace_name}·${B.lane}과 교차 대기
                </div>`)}`}:{}}}function H(){let p=T.cross_lanes_revision!==null,g=T.chain_lanes.some(v=>v.draft&&v.rows.length===0);return fa({parallel:{rows:T.parallel_rows.map((v,x)=>Rt(v,x)),count:T.parallel_rows.length,collapsed:K.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:T.queue_groups.flatMap(v=>v.sublanes.serial.map(x=>({...O(v,x),drop:{drop:"repo-serial",root_dir:v.root_dir,lane_id:x.id,lane_length:String(x.raw_length)}}))),collapsed:K.isAreaCollapsed("serial"),extra_panes:T.chain_lanes.map(v=>We(v)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${g||!p}
          title=${p?g?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...T.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function Ce(p){return c`<div class="worker-rungrid">
      ${T.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:T.running.map(g=>El({bead_id:g.id,attempt_id:g.attempt_id||"",title:g.title,runner:g.runner??null,model:g.model??null,effort:g.effort??null,speed:g.speed??null,started_at:g.started_at??null,kind:g.kind,...g.kind==="session"?{updated_at:g.updated_at,session_refs:g.session_refs||[]}:{},workflow:g.workflow||null,resumed_from:g.resumed_from??null,continuation_mode:g.continuation_mode??null,paused:g.run_state==="paused",failed:g.run_state==="failed",status:g.status,status_label:g.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:g.can_resume!==!1,can_pause:g.can_pause!==!1,exec_chips:g.exec_chips||null,usage:g.usage||null,discard:g.discard},p,j,{monitor:{repo:g.workspace_name,root_dir:g.root_dir,serial_lane_id:g.serial_lane_id,last_activity:g.last_activity||null,legs:g.legs||[],dependency_chips:ze(g)}}))}
    </div>`}function A(p){let g={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done},v=x=>{let B=g[x.lane],Z=x.lane==="runnable"?T.runnable_flat?B.length>0?Kt():void 0:T.runnable_sections.length>0?Kt():void 0:x.lane==="queue"?T.queue_groups.length>0||T.chain_lanes.length>0||T.parallel_rows.length>0||T.cross_lanes_unreadable?H():void 0:x.lane==="running"?Ce(p):B.length>0?c`${B.map(ne=>Un(ne))}`:void 0;return Jn({id:`monitor-${x.lane}`,lane:x.pane,title:x.title,items:B,count:B.length,src:x.lane==="runnable",empty:x.empty,body:Z,live:x.lane==="running"&&B.length>0,collapsible:!0,collapsed:K.isCollapsed(x.pane),controls:x.lane==="runnable"?C():void 0,header_control:Q(x.lane,B.length)})};if(ie){let x=Uy.map(B=>nf.find(Z=>Z.lane===B)).filter(B=>B!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${_a({live:T.running.length>0,running_body:T.running.length>0?Ce(p):"",pr_wait_rows:T.pr_wait.map(B=>Un(B)),count:T.running.length+T.pr_wait.length})}
            ${x.map(B=>v(B))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${nf.map(x=>v(x))}
        </div>
      </div>`}function C(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${w.show_blocked}
        />
        🔒
        blocked${T.runnable_hidden.blocked>0?` ${T.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Gi.map(p=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${w.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${w.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${T.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${T.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Q(p,g){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${F}
      >
        ${Bs.map(v=>c`<option
              value=${v.value}
              ?selected=${F===v.value}
            >
              ${v.label}
            </option>`)}
      </select>`:p==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${b}
      >
        <option value="started" ?selected=${b==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${b==="repo"}>
          레포순
        </option>
      </select>`:p==="pr_wait"&&g>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:p==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${Br.map(v=>c`<option value=${v.value} ?selected=${h===v.value}>
              ${v.label}
            </option>`)}
      </select>`:""}function me(p){let g=s&&s.get?s.get():null,v=s&&s.getWorkspacesState?s.getWorkspacesState():[],x=p===void 0?s&&s.crossLanes?s.crossLanes():void 0:p,B={done_since:Ar(h,d()),running_sort:b,candidate_filter:w,candidate_sort:F};return x!==void 0&&(B.cross_lanes=x),Us(g,v,B)}function oe(){let p=d();T=me(),$e=null,te=new Map;for(let g of[...T.runnable,...T.queue,...T.running,...T.pr_wait,...T.done])!g.non_occupying&&!te.has(g.id)&&te.set(g.id,g);lt(A(p),he),E()?.render(),Pe(),U()}function Pe(){let p=new Map;for(let g of T.queue_groups)p.set(g.root_dir,g.auto_advance);for(let g of Array.from(he.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let v=g.closest(".mon2-item")?.getAttribute("data-root-dir")||"",x=p.get(v);typeof x=="boolean"&&g.setAttribute("title",`${g.textContent||""} \xB7 ${x?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function E(){if(pe)return pe;let p=he.querySelector(".mon2-deck");return p?(pe=Xp(p,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>T.done,rangeLabel:Ge,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:tt,onFocusChange:g=>{I=g,U()}}),pe):null}function U(){he.classList.toggle("has-focus",I!==null);for(let p of Array.from(he.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",I!==null&&p.getAttribute("data-root-dir")===I);for(let p of Array.from(he.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let g=te.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",I!==null&&!!g&&g.root_dir===I)}for(let p of Array.from(he.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",I!==null&&p.getAttribute("data-root-dir")===I)}function xe(p,g){let v=a?a():void 0;if(!g||!v||g===v||!l){r(p);return}l(g).then(()=>{r(p)}).catch(x=>{n("workspace switch for %s failed: %o",g,x)})}function tt(p){if(!p)return;let g=a?a():void 0,v=()=>{try{u?.gotoView("worker")}catch(x){n("gotoView(worker) failed: %o",x)}};if(!l||g&&g===p){v();return}l(p).then(v).catch(x=>{n("workspace switch for %s failed: %o",p,x),ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function _e(p){On(p).then(g=>{ue(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)})}function Xe(p){let g=te.get(p)||null;return{item:g,root_dir:g?g.root_dir:"",revision:g?g.expected_revision:0}}function pt(p){if(typeof p=="string"&&p.length>0)return p;if(p&&typeof p=="object"){let g=p;if(typeof g.message=="string"&&g.message.length>0)return g.message;if(typeof g.error=="string"&&g.error.length>0)return g.error;if(g.error&&typeof g.error=="object"&&typeof g.error.message=="string")return g.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function At(p,g,v){if(p!=="dep-add")return;let x=T.chain_lanes.find(B=>B.rows.some(Z=>Z.id===g));!x||!x.rows.some(B=>B.id===v)||await fe(B=>Nu(x.lane_id,B),"",[{type:p,a:g,b:v}])}function Mt(){let p=new Map,g=s&&s.get?s.get():null,v=x=>Array.isArray(x)?x.filter(B=>typeof B=="string"&&B.length>0):[];for(let x of Array.isArray(g)?g:[]){if(!x||typeof x!="object")continue;let B=x.bead_blocked_by&&typeof x.bead_blocked_by=="object"?x.bead_blocked_by:{};for(let[Z,ne]of Object.entries(B))Array.isArray(ne)&&p.set(Z,v(ne));for(let Z of[...Array.isArray(x.runnable)?x.runnable:[],...Array.isArray(x.session_active)?x.session_active:[]])Z&&typeof Z.bead_id=="string"&&Array.isArray(Z.blocked_by)&&Z.blocked_by.length>0&&p.set(Z.bead_id,v(Z.blocked_by))}return p}function Zt(){let p=new Map,g=new Map,v=s&&s.get?s.get():null,x=B=>Array.isArray(B)?B.filter(Z=>typeof Z=="string"&&Z.length>0):[];for(let B of Array.isArray(v)?v:[]){if(!B||typeof B!="object")continue;let Z=B.bead_blocked_by&&typeof B.bead_blocked_by=="object"?B.bead_blocked_by:{};for(let[ne,Me]of Object.entries(Z))Array.isArray(Me)&&p.set(ne,x(Me));for(let ne of Array.isArray(B.runnable)?B.runnable:[])ne&&typeof ne.bead_id=="string"&&Array.isArray(ne.blocked_by)&&g.set(ne.bead_id,x(ne.blocked_by))}for(let B of L)for(let Z of[p,g]){let ne=Z.get(B.a);ne!==void 0&&Z.set(B.a,B.type==="dep-remove"?ne.filter(Me=>Me!==B.b):ne.includes(B.b)?ne:[...ne,B.b])}return{snapshot:p,runnable:g}}function Ft(){let p=Mt();for(let g of L){let v=(p.get(g.a)||[]).slice();g.type==="dep-remove"?p.set(g.a,v.filter(x=>x!==g.b)):v.includes(g.b)||p.set(g.a,[...v,g.b])}return p}function cn(p=T,g=It()){let v=new Map;for(let ft of Array.isArray(g?.lanes)?g.lanes:[]){let Ke=new Map;for(let y of Array.isArray(ft?.entries)?ft.entries:[])y&&typeof y.bead_id=="string"&&Ke.set(y.bead_id,y.dep_created_by_lane===!0);v.set(typeof ft?.id=="string"?ft.id:"",Ke)}let x=new Map,B=new Map,Z=new Set,ne=new Set;for(let ft of p.chain_lanes){let Ke=v.get(ft.lane_id);x.set(ft.lane_id,{status:ft.status,entries:ft.rows.map((y,V)=>({bead_id:y.id,root_dir:y.root_dir,...V===0?{}:{dep_created_by_lane:Ke?.get(y.id)===!0}}))});for(let y of ft.rows)B.set(y.id,ft.lane_id),y.fixed&&Z.add(y.id),y.unplaced||ne.add(y.id)}let Me=new Map;for(let ft of p.parallel_rows)typeof ft.queue_index=="number"&&Me.set(ft.id,ft.queue_index);for(let ft of p.queue_groups)for(let Ke of ft.sublanes.serial)for(let y of Ke.items)typeof y.queue_index=="number"&&Me.set(y.id,y.queue_index);let Ze=Zt();return{blocked_by_map:Ft(),snapshot_blocked_by:Ze.snapshot,runnable_blocked_by:Ze.runnable,owner_of:new Map(Object.entries(p.owner_of)),cross_lanes:x,owner_lane_of:B,fixed_members:Z,placed_members:ne,parallel_rows:p.parallel_rows.map(ft=>({bead_id:ft.id,root_dir:ft.root_dir,queue_index:ft.queue_index??0})),parallel_raw_length:new Map(Object.entries(p.parallel_raw_length)),queue_index_of:Me}}function It(){return(s&&s.crossLanes?s.crossLanes():null)??null}function hn(p,g){let v=te.get(g);if(v&&v.root_dir===p)return v.expected_revision;let x=T.queue_groups.find(B=>B.root_dir===p);return x?x.revision:0}async function yn(p,g,v){if(p.type==="worker-queue-disarm"){try{let x=await et(p.type,p.payload,p.root_dir,v.get(p.root_dir)??hn(p.root_dir,g));x&&x.queue&&typeof x.queue.revision=="number"&&v.set(p.root_dir,x.queue.revision)}catch{}return!0}if(p.type==="worker-queue-place"||p.type==="worker-queue-reorder"||p.type==="worker-queue-remove")return await Xt(p.type,p.payload,p.root_dir,v,{bead_id:g})!==null;try{return(p.type==="dep-add"||p.type==="dep-remove")&&await ae(p.type,{a:p.a,b:p.b},p.root_dir),!0}catch(x){return ue(pt(x),"error"),!1}}async function Xt(p,g,v,x,B){try{let Z=await et(p,g,v,x.get(v)??hn(v,B.bead_id));return!Z||typeof Z.applied!="boolean"?(ue("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(Z.queue&&typeof Z.queue.revision=="number"&&x.set(v,Z.queue.revision),Z.conflict?(ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):Z.applied===!1?(ue(Z.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${Z.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):Z.queue&&typeof Z.queue.revision=="number"?Z.queue.revision:x.get(v)??0)}catch(Z){return ue(pt(Z),"error"),null}}function sn(p){(p.type==="dep-add"||p.type==="dep-remove")&&(L=[...L,{type:p.type,a:p.a,b:p.b}])}async function nt(p,g){if(!o)return{ok:!1};try{let v=await o(p.type,{...p.payload,expected_revision:g});return!v||typeof v.revision!="number"?(ue("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:v.revision}}catch(v){let x=v,B=x&&x.code==="conflict"?x.details?.cross_lanes:null;return B&&typeof B.revision=="number"&&Array.isArray(B.lanes)?{ok:!1,conflict:B}:(ue(pt(v),"error"),{ok:!1})}}async function Be(p,g,v){let x=new Map,B=[],Z=p.ops.slice(0,p.lane_op_index),ne=p.ops.slice(p.lane_op_index);for(let Ze of Z){if(!await yn(Ze,v,x))return{done:!0};sn(Ze)}let Me=g;for(let Ze of p.lane_ops){if(Me===null)return ue("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let ft=await nt(Ze,Me);if(!ft.ok)return ft.conflict?{done:!1,conflict:ft.conflict}:{done:!0};Me=ft.revision}for(let Ze of ne){if(!await yn(Ze,v,x))return{done:!0};sn(Ze),Ze.type==="dep-add"&&B.push(Ze)}for(let Ze of ju(B))Me=await $(Ze,Me);return{done:!0}}async function $(p,g){if(g===null||!o)return g;let v=p.pairs,x=g;for(let B=0;B<2;B+=1){if(v.length===0)return x;try{let Z=await o("monitor-lane-provenance",{lane_id:p.lane_id,pairs:v.map(ne=>({bead_id:ne.bead_id,after:ne.after,value:!0})),expected_revision:x});return Z&&typeof Z.revision=="number"?Z.revision:x}catch(Z){let ne=Z,Me=ne&&ne.code==="conflict"?ne.details?.cross_lanes:null;if(!Me||typeof Me.revision!="number"||!Array.isArray(Me.lanes))return x;let Ze=Me.lanes.find(ft=>ft&&ft.id===p.lane_id);v=Bu(Array.isArray(Ze?.entries)?Ze.entries:[],v),x=Me.revision}}return x}async function fe(p,g,v=[]){L=v,we();let x=T,B=It();for(let Z=0;;Z+=1){let ne=p(cn(x,B));if("refused"in ne){ue(ne.refused,"error");break}let Me=await Be(ne,x.cross_lanes_revision,g);if(Me.done){ne.correction&&be(ne.correction.lane_id,ne.correction.corrected);break}if(Z>=1){ue("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}x=me(Me.conflict),B=Me.conflict}L=[],oe()}async function Fe(p,g){await fe(v=>Ti(p,g,v),p.bead_id)}async function kt(p,g){if(p==="run"){await Ot(g);return}if(p==="stop"){await en(g);return}if(p==="create"){await fe(v=>Ci(null,v),"");return}if(p==="remove"){let v=Fu(g,cn());if(v!==null&&!_(v))return;await fe(x=>qu(g,x),"");return}await fe(v=>p==="confirm"?Pu(g,v):Du(g,v),"")}function jt(p){let g=new Map;for(let v of p.rows){let x=T.owner_of[v.id]||v.root_dir;typeof x!="string"||x.length===0||g.set(x,[...g.get(x)||[],v.id])}return g}async function Ot(p){let g=T.chain_lanes.find(Z=>Z.lane_id===p);if(!g||T.cross_lanes_revision===null){oe();return}we();let v=new Map,x=new Map,B=jt(g);for(let Z of g.rows){if(!Z.unplaced)continue;let ne=T.owner_of[Z.id]||Z.root_dir;if(typeof ne!="string"||ne.length===0){ue(`${Z.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),oe();return}let Me=x.get(ne)??0;if(await Xt("worker-queue-place",{bead_id:Z.id,lane:"parallel",index:(T.parallel_raw_length[ne]??0)+Me},ne,v,{bead_id:Z.id})===null){oe();return}x.set(ne,Me+1)}for(let[Z,ne]of B)if(await Xt("worker-queue-arm",{bead_ids:ne,lane_id:p},Z,v,{bead_id:ne[0]})===null){ue("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),oe();return}oe()}async function en(p){let g=T.chain_lanes.find(x=>x.lane_id===p);if(!g||T.cross_lanes_revision===null){oe();return}we();let v=new Map;for(let[x,B]of jt(g))if(await Xt("worker-queue-disarm",{lane_id:p},x,v,{bead_id:B[0]})===null)break;oe()}async function on(p,g){let{root_dir:v,revision:x}=Xe(p);if(v.length===0){oe();return}await Xt("worker-queue-disarm",{bead_ids:[p],lane_id:g},v,new Map([[v,x]]),{bead_id:p}),oe()}async function un(p,g){let v=te.get(p);if(!v){oe();return}let x={kind:"candidate",bead_id:p,root_dir:v.root_dir};if(g==="new-lane"){await fe(B=>Ci({bead_id:p,root_dir:v.root_dir},B),p);return}if(g.startsWith("lane:")){let B=g.slice(5);if(!T.chain_lanes.find(ne=>ne.lane_id===B)){oe();return}await fe(ne=>Ti(x,{kind:"chain",lane_id:B,marker_index:(ne.cross_lanes.get(B)?.entries??[]).length},ne),p);return}if(g.startsWith("serial:")){let B=g.slice(7),Z=(v.place_lanes||[]).find(ne=>ne.id===B);await Fe(x,{kind:"repo-serial",root_dir:v.root_dir,lane_id:B,index:Z?Z.index:0});return}await Fe(x,{kind:"parallel",marker_index:T.parallel_rows.length})}async function vn(p,g){let v=T.parallel_rows,x=v.findIndex(ft=>ft.id===p);if(x<0)return;let B=v[x].root_dir,Z=[];v.forEach((ft,Ke)=>{ft.root_dir===B&&Z.push(Ke)});let ne=Z.indexOf(x),Me=Z[ne+g];if(typeof Me!="number")return;let Ze=g===-1?Me:Z[ne+2]??Math.min(v.length,Me+1);await Fe({kind:"parallel",bead_id:p,root_dir:B,queue_index:v[x].queue_index??0},{kind:"parallel",marker_index:Ze})}async function Ht(p){for(let g of T.chain_lanes){let v=g.rows.find(x=>x.id===p);if(v){await Fe({kind:"chain",bead_id:p,root_dir:v.root_dir,lane_id:g.lane_id,...typeof v.queue_index=="number"?{queue_index:v.queue_index}:{}},{kind:"parallel",marker_index:T.parallel_rows.length});return}}}let dn=null,gn=!1,bn=null;function Vn(){bn!==null&&clearTimeout(bn),bn=setTimeout(()=>{bn=null,gn=!1},0)}function Yn(p,g){let v=g&&typeof g.closest=="function"?g.closest("[data-row-index]"):null;if(v&&p.contains(v)){let x=Number(v.getAttribute("data-row-index"));return Number.isFinite(x)?x:0}return p.querySelectorAll("[data-row-index]").length}function S(p){let g=typeof p?.closest=="function"?p.closest(".worker-pane--collapsed[data-lane]"):null;if(!g)return null;let v=g.getAttribute("data-lane");return v==="queue"?{zone:g,target:{kind:"parallel",marker_index:T.parallel_rows.length}}:v==="candidate"?{zone:g,target:{kind:"candidate"}}:null}function R(p){let g=p.target;if(!dn)return null;let v=typeof g?.closest=="function"?g.closest("[data-drop]"):null;if(!v)return S(g);let x=v.getAttribute("data-drop");if(x==="candidate")return{zone:v,target:{kind:"candidate"}};if(x==="parallel")return{zone:v,target:{kind:"parallel",marker_index:Yn(v,g)}};if(x==="chain")return{zone:v,target:{kind:"chain",lane_id:v.getAttribute("data-lane-id")||"",marker_index:Yn(v,g)}};if(x==="repo-serial"){let B=v.getAttribute("data-root-dir")||"";if(B!==dn.root_dir)return null;let Z=typeof g?.closest=="function"?g.closest("[data-queue-index]"):null,ne=Z&&v.contains(Z)?Z.getAttribute("data-queue-index"):v.getAttribute("data-lane-length"),Me=Number(ne);return{zone:v,target:{kind:"repo-serial",root_dir:B,lane_id:v.getAttribute("data-lane-id")||"",index:Number.isFinite(Me)?Me:0}}}return null}function Oe(){for(let p of Array.from(he.querySelectorAll(".is-drop-over")))p.classList.remove("is-drop-over")}let je=null;function ut(p){je=p.target instanceof Element?p.target:null}function St(p){let g=p.target,v=typeof g?.closest=="function"?g.closest('[draggable="true"][data-bead-id]'):null,x=v?v.closest("[data-drag-kind]"):null;if(!x)return;if(v&&je&&v.contains(je)&&typeof je.closest=="function"&&je.closest("input, button, a")){p.preventDefault();return}let B=x.getAttribute("data-bead-id")||"",Z=x.getAttribute("data-drag-kind")||"",ne=x.getAttribute("data-root-dir")||"";if(!B||!Z||!ne)return;let Me=x.getAttribute("data-queue-index")||"",Ze=Number(Me),ft=x.getAttribute("data-lane-id")||"";dn={kind:Z,bead_id:B,root_dir:ne,...Me!==""&&Number.isFinite(Ze)?{queue_index:Ze}:{},...ft?{lane_id:ft}:{}},gn=!0,q=null,he.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",B),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function tn(p){let g=R(p);g&&(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),g.zone.classList.add("is-drop-over"))}function m(p){let g=p.target;typeof g?.closest=="function"&&(g.closest("[data-drop]")?.classList.remove("is-drop-over"),g.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function k(){dn=null,Oe(),he.classList.remove("is-dragging"),Vn()}function G(p){let g=R(p),v=dn;dn=null,Oe(),he.classList.remove("is-dragging"),!(!g||!v)&&(p.preventDefault(),Fe(v,g.target))}function de(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function Te(p,g){let{item:v,root_dir:x,revision:B}=Xe(g),Z=v?.attempt_id||"",ne=p.classList;if(ne.contains("worker-mini__rowops-up")||ne.contains("worker-mini__rowops-down")){vn(g,ne.contains("worker-mini__rowops-up")?-1:1);return}if(ne.contains("worker-mini__rowops-remove")){et("worker-queue-remove",{bead_id:g},x,B);return}if(ne.contains("mon2-crow__detach")){Ht(g);return}if(ne.contains("worker-dep__open")){xe(p.getAttribute("data-dep-id")||"",p.getAttribute("data-root-dir")||"");return}if(ne.contains("mon2-arm__release")){on(g,p.getAttribute("data-lane-id")||"");return}if(ne.contains("mon-lane__chip")){let Me=p.getAttribute("data-lane-id")||"";he.querySelector(`.mon2-clane[data-lane-id="${Me}"]`)?.scrollIntoView({block:"nearest"});return}if(ne.contains("mon-overlap__chip")){let Me=p.getAttribute("data-overlap-id")||"";z=!!z&&z.bead_id===g&&z.counterpart_id===Me?null:{bead_id:g,counterpart_id:Me},oe();return}if(ne.contains("mon-overlap__place")){Qe(g,p.getAttribute("data-counterpart-id")||"");return}if(ne.contains("worker-card__place")){q=q===g?null:g,oe();return}if(ne.contains("worker-card__place-cancel")){q=null,oe();return}if(ne.contains("worker-card__place-lane")){let Me=p.getAttribute("data-lane")||"parallel";q=null,un(g,Me);return}if(ne.contains("rtile__session")){if(v&&v.kind==="session"){let Me=(v.session_refs||[]).find(Ze=>Ze&&Ze.current===!0);Me&&(J.hidden=!1,Le.open(Zr(Me,g,"in_progress",x)),oe());return}j=Z,Z&&v&&(J.hidden=!1,Le.open({attempt_id:Z,root_dir:x,meta:de(v)})),oe();return}if(ne.contains("rtile__pause")){ae("worker-attempt-pause",{attempt_id:Z},x);return}if(ne.contains("rtile__resume")){Yr().then(Me=>{if(Me!==null)return xt("worker-attempt-resume",{attempt_id:Z,...Me!==""?{instructions:Me}:{}},x,B)});return}if(ne.contains("rtile__dismiss")){et("worker-attempt-dismiss",{attempt_id:Z},x,B);return}if(ne.contains("rtile__discard")){if(!_(Ds(g,"unmerged")))return;M({bead_id:g,...Z?{attempt_id:Z}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},x,B);return}if(ne.contains("worker-mini__merge")){let Me=Et(x,g);Me?.mismatch&&Me.continuation===null?ht(x,g,B,Me.mismatch):et("worker-merge-queue-add",{bead_id:g},x,B);return}if(ne.contains("worker-mini__merge-cancel")){et("worker-merge-queue-remove",{bead_id:g},x,B);return}if(ne.contains("worker-mini__discard")){let Me=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!_(Ds(g,Me)))return;M({bead_id:g,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},x,B);return}if(ne.contains("worker-mini__revise-fix")){xt("worker-revise-fix",{bead_id:g},x,B);return}ne.contains("worker-mini__revise-approve")&&et("worker-revise-approve",{bead_id:g},x,B)}function bt(p){let g=gn;gn=!1;let v=p.target;if(!v||typeof v.closest!="function"||v.closest("dialog")||v.closest(".worker-drawer-overlay")||v.closest("a"))return;let x=v.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(x){p.preventDefault();let Ae=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||x.textContent?.trim()||"";Ae&&_e(Ae);return}let B=v.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(B){p.preventDefault();let N=B.getAttribute("data-root-dir")||te.get(v.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||B.getAttribute("title")||"";tt(N);return}let Z=v.closest(".mon2-sec__toggle");if(Z){p.preventDefault(),Ye(Z.getAttribute("data-root-dir")||"");return}let ne=v.closest(".worker-pane__toggle[data-lane]");if(ne){p.preventDefault();let N=ne.getAttribute("data-lane")||"";(N==="candidate"||N==="queue"||N==="running"||N==="pr_wait"||N==="done")&&rt(N);return}let Me=v.closest(".worker-wait__area-toggle[data-area]");if(Me){p.preventDefault(),yt(Me.getAttribute("data-area")||"parallel");return}if(v.closest(".mon2-newlane")){p.preventDefault(),kt("create","");return}let Ze=v.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ze){p.preventDefault();let N=Ze.getAttribute("data-lane-id")||"",Ae=Ze.classList;kt(Ae.contains("mon2-clane__confirm")?"confirm":Ae.contains("mon2-clane__reapply")?"reapply":Ae.contains("mon2-clane__run")?"run":Ae.contains("mon2-clane__stop")?"stop":"remove",N);return}if(v.closest(".mon-merge-all")){p.preventDefault(),Ie();return}let ft=v.closest(".mon-filter__spec");if(ft){p.preventDefault(),w={...w,spec:ft.getAttribute("data-spec")||"all"},tf(w),oe();return}let Ke=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Ke)return;let y=Ke.getAttribute("data-bead-id")||"",V=v.closest("button");if(V){p.preventDefault(),Te(V,y);return}y&&!g&&(p.preventDefault(),xe(y,Ke.getAttribute("data-root-dir")||Xe(y).root_dir))}function it(p){let g=p.target;if(!g||typeof g.closest!="function")return;let v=g.closest(".mon-filter__blocked");if(v){w={...w,show_blocked:v.checked},tf(w),oe();return}let x=g.closest(".mon-candidate-sort");if(x){F=Bs.some(ne=>ne.value===x.value)?x.value:"repo_spec",My(F),oe();return}let B=g.closest(".mon-running-sort");if(B){b=B.value==="repo"?"repo":"started",jy(b),oe();return}let Z=g.closest(".mon-done-range");Z&&(h=Zn(Z.value),qy(h),oe())}function Qt(p){let g=p.target,v=g&&typeof g.closest=="function"?B=>g.closest(B):()=>null,x=!1;z&&!v(".mon-overlap__popover, .mon-overlap__chip")&&(z=null,x=!0),x&&oe()}function rn(p){p.key!=="Escape"||!z||(z=null,oe())}e.addEventListener("click",bt),e.addEventListener("change",it),e.addEventListener("pointerdown",ut),document.addEventListener("click",Qt),document.addEventListener("keydown",rn),e.addEventListener("dragstart",St),e.addEventListener("dragover",tn),e.addEventListener("dragleave",m),e.addEventListener("drop",G),e.addEventListener("dragend",k);{let p=!0;Y=qa(g=>{if(ie=g,p){p=!1;return}oe()})}s&&typeof s.subscribe=="function"&&(ke=s.subscribe(()=>{try{Se.clear(),oe()}catch{}}));function an(){Ne!==null&&(clearInterval(Ne),Ne=null)}function wn(){bn!==null&&(clearTimeout(bn),bn=null)}return{recorrectSharedLane:At,load(){n("load"),oe(),Ne===null&&(Ne=setInterval(()=>{try{oe()}catch{}},By))},pause(){an()},clear(){an(),wn(),ke&&(ke(),ke=null),Y&&(Y(),Y=null),Le.destroy(),J.hidden=!0,pe?.destroy(),pe=null,e.removeEventListener("click",bt),e.removeEventListener("change",it),e.removeEventListener("pointerdown",ut),document.removeEventListener("click",Qt),document.removeEventListener("keydown",rn),e.removeEventListener("dragstart",St),e.removeEventListener("dragover",tn),e.removeEventListener("dragleave",m),e.removeEventListener("drop",G),e.removeEventListener("dragend",k),e.replaceChildren()}}}function pf(e,t,n){let r=Gt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return b=>{b.preventDefault();let w=h==="monitor"&&l()==="monitor"?"worker":h;r("click tab %s",w),n.gotoView(w)}}function l(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=l();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${h==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let h=l();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${h==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${h==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function _(){s&&lt(u(),s),o&&lt(d(),o)}return _(),a=t.subscribe(()=>_()),{destroy(){a&&(a(),a=null),s&&lt(c``,s),o&&lt(c``,o)}}}var ff=["bug","feature","task","epic","chore"];function _f(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var mf=["Critical","High","Medium","Low","Backlog"];function gf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
    <div class="new-issue__container" part="container">
      <header class="new-issue__header">
        <div class="new-issue__title">New Issue</div>
        <button type="button" class="new-issue__close" aria-label="Close">\xD7</button>
      </header>
      <div class="new-issue__body">
        <form id="new-issue-form" class="new-issue__form">
          <label for="new-title">Title</label>
          <input id="new-title" name="title" type="text" required placeholder="Short summary" />

          <label for="new-type">Type</label>
          <select id="new-type" name="type" aria-label="Issue type"></select>

          <label for="new-priority">Priority</label>
          <select id="new-priority" name="priority" aria-label="Priority"></select>

          <label for="new-labels">Labels</label>
          <input id="new-labels" name="labels" type="text" placeholder="comma,separated" />

          <label for="new-description">Description</label>
          <textarea id="new-description" name="description" rows="6" placeholder="Optional markdown description"></textarea>

          <div aria-live="polite" role="status" class="new-issue__error" id="new-issue-error"></div>

          <div class="new-issue__actions" style="grid-column: 1 / -1">
            <button type="button" id="btn-cancel">Cancel (Esc)</button>
            <button type="submit" id="btn-create">Create</button>
          </div>
        </form>
      </div>
    </div>
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let q=document.createElement("option");q.value="",q.textContent="\u2014 Select \u2014",o.appendChild(q);for(let z of ff){let L=document.createElement("option");L.value=z,L.textContent=_f(z),o.appendChild(L)}a.replaceChildren();for(let z=0;z<=4;z+=1){let L=document.createElement("option");L.value=String(z);let I=mf[z]||"Medium";L.textContent=`${z} \u2013 ${I}`,a.appendChild(L)}}b();function w(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function F(q){s.disabled=q,o.disabled=q,a.disabled=q,i.disabled=q,l.disabled=q,d.disabled=q,_.disabled=q,_.textContent=q?"Creating\u2026":"Create"}function W(){u.textContent=""}function K(q){u.textContent=q}function ie(){try{let q=window.localStorage.getItem("beads-ui.new.type");q?o.value=q:o.value="";let z=window.localStorage.getItem("beads-ui.new.priority");z&&/^\d$/.test(z)?a.value=z:a.value="2"}catch{o.value="",a.value="2"}}function Y(){let q=o.value||"",z=a.value||"";q.length>0&&window.localStorage.setItem("beads-ui.new.type",q),z.length>0&&window.localStorage.setItem("beads-ui.new.priority",z)}async function j(){W();let q=String(s.value||"").trim();if(q.length===0){K("Title is required"),s.focus();return}let z=Number(a.value||"2");if(!(z>=0&&z<=4)){K("Priority must be 0..4"),a.focus();return}let L=String(o.value||""),I=String(l.value||""),re={title:q};L.length>0&&(re.type=L),String(z).length>0&&(re.priority=z),I.length>0&&(re.description=I),F(!0);try{await t("create-issue",re)}catch{F(!1),K("Failed to create issue");return}Y(),F(!1),w()}return n.addEventListener("cancel",q=>{q.preventDefault(),w()}),h.addEventListener("click",()=>w()),d.addEventListener("click",()=>w()),n.addEventListener("keydown",q=>{q.key==="Enter"&&(q.ctrlKey||q.metaKey)&&(q.preventDefault(),j())}),r.addEventListener("submit",q=>{q.preventDefault(),j()}),{open(){r.reset(),W(),ie();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){w()}}}var zy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Hy(e,t){return gi(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function bf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=Hy(r,e);return c`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${r}
                data-state=${s}
                @click=${()=>n(r)}
              >
                ${r}
              </button>`})}
          </div>`}
    </section>
  `}function hf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(r=>c`<span class="settings-dialog__prefix">
              ${r}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${r} \uADDC\uCE59 \uC81C\uAC70`}
                @click=${()=>n.onRemove(r)}
              >
                ×
              </button>
            </span>`)}
      </div>
      <div class="settings-dialog__prefix-add">
        <input
          type="text"
          class="settings-dialog__prefix-input"
          aria-label="숨길 prefix"
          placeholder="예: reviewed:"
          .value=${t}
          @input=${r=>n.onDraft(String(r.target.value||""))}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${n.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `}function yf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${zy.map(([n,r])=>c`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${n}
                .checked=${e.chips[n]!==!1}
                @change=${()=>t(n)}
              />
              <span>${r}</span>
            </label>`)}
      </div>
    </section>
  `}var Gy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function vf(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(be=>ue(be,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,u="",d=null;function _(){if(d)return d;let be=a.querySelector('[data-pane="execution"]');return be?(d=Ua(be,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:we=>t.queueStore?.set?.(we)}),d):null}function h(){return c`
      <section
        class=${`settings-dialog__pane${i==="execution"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        <div class="settings-dialog__pane-body" data-pane="execution"></div>
      </section>
    `}function b(){let be=r.get();return c`
      <section
        class=${`settings-dialog__pane${i==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${be?c`
              ${bf(be,s(),K)}
              ${hf(be,u,{onDraft:we=>{u=we},onAdd:ie,onRemove:Y})}
              ${yf(be,j)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function w(be){let we=r.get();if(we)try{let Ge=await n("display-policy-set",{expected_revision:we.revision,policy:be(we)});F(Ge),Ge&&Ge.conflict&&Ge.policy&&(Ge=await n("display-policy-set",{expected_revision:Ge.policy.revision,policy:be(Ge.policy)}),F(Ge)),Ge&&Ge.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function F(be){be&&be.policy&&typeof be.policy=="object"&&r.set(be.policy)}function W(be){w(be)}function K(be){let we=r.get();if(!we)return;let Ge=!Ky(be,we);W(he=>Vy(be,he,Ge))}function ie(){let be=u.trim();be.length!==0&&(u="",W(we=>we.hidden_prefixes.includes(be)?{hidden_prefixes:we.hidden_prefixes}:{hidden_prefixes:[...we.hidden_prefixes,be]}),q())}function Y(be){W(we=>({hidden_prefixes:we.hidden_prefixes.filter(Ge=>Ge!==be)}))}function j(be){let we=r.get();if(!we)return;let Ge=we.chips[be]===!1;W(()=>({chips:{[be]:Ge}}))}function q(){lt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Gy.map(be=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${be.id}
                  aria-selected=${String(i===be.id)}
                  aria-controls=${`settings-pane-${be.id}`}
                  @click=${()=>z(be.id)}
                >
                  <span class="settings-dialog__glyph">${be.glyph}</span>
                  ${be.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ce}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${b()}
          </div>
        </div>
      `,a),_()}function z(be){i=be,q()}let L=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",L),a.addEventListener("cancel",L);let I=be=>{be.target===a&&ce()};a.addEventListener("click",I);let re=null;r.subscribe&&(re=r.subscribe(()=>{l&&q()}));let ge=null;t.implPresetStore?.subscribe&&(ge=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function $e(be="execution"){l||(l=!0,t.onOpenChange?.(!0),i=be,u="",q(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),_()?.load())}function ce(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:$e,close:ce,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,a.removeEventListener("close",L),a.removeEventListener("cancel",L),a.removeEventListener("click",I),re&&(re(),re=null),ge&&(ge(),ge=null),d?.destroy(),d=null,a.remove()}}}function Ky(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Vy(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Yy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wf="usage-meter-card",Zy="usage-meter-layer",Cl=600,Xy=["token_expired","relogin_required"];function kf(e){return String(e).padStart(2,"0")}function Qy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function $f(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${kf(r.getHours())}:${kf(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Yy[r.getMonth()]} ${r.getDate()} ${o}`;return`${Qy(n,t)} \xB7 ${i}`}function Jy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function xf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Af(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Sf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Tf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function ev(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Tf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function tv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=ev(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?Tf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function nv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=tv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Cf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function rv(e,t){return!e.held||Cf(e,t)<=Cl?e:{...e,available:!1,windows:[],accounts:[]}}function Ef(e,t){return`${e}:${t}`}function Rf(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,l=null;function u(){lt(c``,e),e.hidden=!0,_()}function d(){if(l===null){let he=e.ownerDocument;l=he.createElement("div"),l.id=Zy,l.className="usage-meter__layer",he.body.appendChild(l)}return l}function _(){l!==null&&(lt(c``,l),l.remove(),l=null)}function h(he){n!==he&&(n===null&&(document.addEventListener("mousedown",w),document.addEventListener("keydown",W),window.addEventListener("resize",F)),n=he)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",W),window.removeEventListener("resize",F))}function w(he){let J=he.target;J&&(e.contains(J)||l!==null&&l.contains(J))||(b(),ce())}function F(){ce()}function W(he){he.key==="Escape"&&(b(),ce())}function K(he){n===he?b():h(he),ce()}function ie(){b(),ce()}async function Y(he,J){if(r.has(he.key))return;let Re=Ef(he.key,J);r.set(he.key,J),a.delete(Re),ce();let De=null;try{De=await(await fetch(he.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:J})})).json()}catch{De=null}if(t)return;if(r.delete(he.key),!De||De.ok!==!0){let te=De&&typeof De.error=="string"&&De.error.length>0?De.error:"network_error";a.set(Re,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${te}`}),ce();return}let T=Array.isArray(De.warnings)?De.warnings.filter(te=>typeof te=="string"&&te.length>0):[];T.length>0&&a.set(Re,{kind:"warn",text:T.join(" \xB7 ")}),ce(),await Ge()}function j(he,J,Re,De){let T=Af(he.pct),Se=`resets ${$f(he.resetsAt,De)}${J?` \xB7 ${Re}`:""}`;return c`<span
      class="usage-meter__window ${xf(T)}"
      style=${`--progress: ${T}%`}
      title=${Se}
    >
      <span class="usage-meter__label">${he.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${T}%</span>
    </span>`}function q(he,J,Re){let De=Cf(J,Re),T=J.available&&(J.held||De>Cl),te=T?`${Math.floor(De/60)}\uBD84 \uC804 \uCE21\uC815`:"",Se=J.accounts.filter(Le=>!Le.active).length,ke=`usage-meter__group${T?" usage-meter__group--stale":""}`,Ne=c`<span class="usage-meter__provider"
        >${he.label}</span
      >
      ${J.available?J.windows.map(Le=>j(Le,T,te,Re)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Se>0?c`<span class="usage-meter__badge">+${Se}</span>`:""}`;if(J.accounts.length===0)return c`<span
        class=${ke}
        aria-label=${`${he.label} usage`}
        >${Ne}</span
      >`;let pe=n===he.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ke}`}
      aria-label=${`${he.label} usage`}
      aria-expanded=${pe?"true":"false"}
      aria-controls=${wf}
      @click=${()=>K(he.key)}
    >
      ${Ne}
    </button>`}function z(he,J){return c`<span class="usage-meter" aria-label="Usage">
      ${he.map(Re=>q(Re.provider,Re.snapshot,J))}
    </span>`}function L(he,J){let Re=Af(he.pct),De=$f(he.resetsAt,J);return c`<span
      class="usage-meter__account-window ${xf(Re)}"
      style=${`--progress: ${Re}%`}
    >
      <span class="usage-meter__account-key">${he.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Re}%</span>
      <span class="usage-meter__account-reset"
        >${De.length>0?`\u21BB ${De}`:""}</span
      >
    </span>`}function I(he,J){return Xy.includes(J)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${he.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function re(he,J,Re){let De=J.status==="ok",T=typeof J.ageSeconds=="number"&&J.ageSeconds>Cl,te=a.get(Ef(he.key,J.number)),Se=r.get(he.key),ke=Se!==void 0,Ne=Se===J.number,pe=["usage-meter__account"];return J.active&&pe.push("usage-meter__account--active"),De||pe.push("usage-meter__account--unavailable"),T&&pe.push("usage-meter__account--stale"),c`<div class=${pe.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${J.email}
          >${J.alias===null?J.email:J.alias}</span
        >
        ${J.plan===null?"":c`<span class="usage-meter__account-tag">${J.plan}</span>`}
        ${J.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${J.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Jy(J.ageSeconds)}</span
            >`}
        ${J.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ke}
              @click=${()=>{Y(he,J.number)}}
            >
              ${Ne?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${De?c`<div class="usage-meter__account-windows">
            ${J.windows.map(Le=>L(Le,Re))}
          </div>`:c`<div class="usage-meter__account-status">
            ${I(he,J.status)}
          </div>`}
      ${te===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${te.kind}"
          >
            ${te.text}
          </div>`}
    </div>`}function ge(he,J,Re){let De=J.accounts.filter(T=>T.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${he.label} · 활성 ${De} / 전체
        ${J.accounts.length}
      </h2>
      ${J.accounts.map(T=>re(he,T,Re))}
    </section>`}function $e(he,J){return c`<div
      class="usage-meter__card"
      id=${wf}
      role="dialog"
      aria-label=${`${he.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${ge(he.provider,he.snapshot,J)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ce(){let he=Date.now(),J=[];for(let De of Sf){let T=o.get(De.key);T&&J.push({provider:De,snapshot:rv(T,he)})}if(J.length===0){b(),u();return}let Re=J.find(De=>De.provider.key===n&&De.snapshot.accounts.length>0);Re||b(),lt(z(J,he),e),e.hidden=!1,Re?be(Re,he):_()}function be(he,J){let Re=d(),De=e.getBoundingClientRect(),T=e.ownerDocument.documentElement.clientWidth;Re.style.setProperty("--usage-meter-anchor-top",`${De.bottom}px`),Re.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,T-De.right)}px`),lt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ie}
        ></div>
        ${$e(he,J)}`,Re)}async function we(he){try{let J=await fetch(he.endpoint);return J.ok?nv(await J.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ge(){i+=1;let he=i,J=await Promise.all(Sf.map(async Re=>({provider:Re,read:await we(Re)})));if(!(t||he!==i)){for(let Re of J){let De=Re.provider.key;if(Re.read.kind==="ok"){o.set(De,Re.read.snapshot);continue}if(Re.read.kind==="empty"){o.delete(De);continue}let T=o.get(De);T!==void 0&&!T.held&&o.set(De,{...T,held:!0})}ce()}}return u(),Ge(),s=setInterval(()=>{Ge()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function Of(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var sv="worker-ineligible";function oo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Lf(e){return oo(e).includes(sv)}var ov="session-preferred",av=["exclusive_machine","iterative_user_judgment","visual_verification"];function If(e,t){if(!oo(e).includes(ov)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&av.includes(n)?n:""}var iv="worker-serial";function Rl(e){return oo(e).includes(iv)}function Ol(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var lv=new Set(["done","failed","orphaned","stopped","discarded"]),cv={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},uv={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},dv={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ll(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:dv[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Mf(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,u=new Map,d=!1,_=null,h=null,b=null,w=new Set,F=!1,W=0,K=null,ie=new Set;function Y(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function j(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function q(){return o&&o()||""}async function z(){if(!s)return;let A=++W;F=!0,b=null,w.clear(),at();try{let C=await s("worker-parallel-analysis-targets",{root_dir:q()});if(A!==W||!We)return;let Q=Array.isArray(C?.qualified)?C.qualified:[],me=Array.isArray(C?.excluded)?C.excluded:[];b={qualified:Q,excluded:me};for(let oe of Q)oe&&typeof oe.id=="string"&&w.add(oe.id)}catch{A===W&&We&&(b={qualified:[],excluded:[]},ue("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{A===W&&(F=!1,We&&at())}}function L(A){return Array.isArray(A.runs)?A.runs:[]}function I(){let A=Y(),C=new Set;for(let Q of Object.values(A.attempts||{})){let me=Q;me&&typeof me.bead_id=="string"&&!lv.has(me.status)&&C.add(me.bead_id)}for(let Q of Array.isArray(A.pr_wait)?A.pr_wait:[])Q&&typeof Q.bead_id=="string"&&C.add(Q.bead_id);for(let Q of Object.values(A.discard_operations||{})){let me=Q;me&&me.phase!=="done"&&typeof me.bead_id=="string"&&C.add(me.bead_id)}return C}function re(A){return A.filter(C=>ge(C)===null)}function ge(A){let C=Y();for(let Q of Array.isArray(C.serial_lanes)?C.serial_lanes:[])if(Array.isArray(Q?.entries)&&Q.entries.some(me=>me.bead_id===A))return Q.id;return(Array.isArray(C.queue)?C.queue:[]).some(Q=>Q.bead_id===A)?"parallel":null}function $e(A,C){let Q=l.get(A);return Q||[...C.order]}function ce(A){if(A.length<2)return!1;let C=ge(A[0]);if(!C||C==="parallel")return!1;let Q=Y(),me=(Array.isArray(Q.serial_lanes)?Q.serial_lanes:[]).find(Pe=>Pe.id===C)?.entries.map(Pe=>Pe.bead_id);if(!Array.isArray(me))return!1;let oe=A.map(Pe=>me.indexOf(Pe));return oe.every(Pe=>Pe>=0)&&oe.every((Pe,E)=>E===0||Pe>oe[E-1])}function be(){let A=Y(),C=Array.isArray(A.serial_lanes)?A.serial_lanes:[],Q=C.find(me=>Array.isArray(me.entries)&&me.entries.length===0);return Q?Q.id:C[0]?.id||"s1"}function we(A){let C=Y().bead_titles||{};return typeof C[A]=="string"?C[A]:A}async function Ge(A,C){if(!s||d)return null;d=!0,at();try{return await s(A,C)}finally{d=!1,at()}}async function he(A){r?.setPending?.(!0);try{let C=await Ge("worker-parallel-analysis-start",{force:A,target_ids:Array.from(w)});C&&C.applied===!1&&C.reason&&(C.reason==="target_not_qualified"&&Array.isArray(C.detail)?ue(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${C.detail.join(", ")}`,"error",3200):ue(`\uBD84\uC11D \uC2E4\uD328: ${C.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function J(){let A=j().job;!s||!A||await s("worker-parallel-analysis-cancel",{job_id:A.job_id})}async function Re(A){if(!(!s||ie.has(A))){ie.add(A),at();try{let C=await s("worker-parallel-analysis-prompt",{root_dir:q(),run_id:A});if(!We)return;if(C?.ok===!0&&typeof C.prompt=="string"){K={run_id:A,prompt:C.prompt};return}ue(C?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{ie.delete(A),at()}}}function De(){K=null,at()}async function T(){if(!K)return;let A=await On(K.prompt);ue(A?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",A?"success":"error",1400)}function te(A,C){a&&a(A,Ll(C))}function Se(){return Y().runner_catalog}function ke(A){return Object.keys(Se()?.runners?.[A]?.models||{})}function Ne(A){let C=ke(A),Q=Se()?.runners?.[A]?.default_model;return typeof Q=="string"&&C.includes(Q)?Q:C[0]||""}function pe(){let A=j().settings,C=_||A.runner||"claude",Q=ke(C),me=_?Ne(C):A.model||Q[0]||"",oe=Ol(Se(),C,me),Pe=A.effort||"",E=oe.includes(Pe)?Pe:oe[0]||"";return{runner:C,model:me,effort:E,models:Q,efforts:oe}}async function Le(A){let C=j().settings,Q=await Ge("worker-parallel-analysis-settings-update",{expected_revision:C.revision,runner:A.runner,model:A.model,effort:A.effort});(!Q||Q.applied!==!0)&&(_=null,at(),Q&&Q.reason&&ue(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${Q.reason}`,"error",2800))}function et(A){_=A,at();let C=pe();Le({runner:A,model:C.model,effort:C.effort})}function Et(A){let C=pe(),Q=Ol(Se(),C.runner,A);Le({runner:C.runner,model:A,effort:Q.includes(C.effort)?C.effort:Q[0]||""})}function xt(A){let C=pe();Le({runner:C.runner,model:C.model,effort:A})}async function ht(A,C){if(!s||d)return;let Q=$e(A,C),me=j();if(Q.length<2||!me.last_good){ue("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let oe=u.get(A)||be(),Pe=()=>({snapshot_digest:me.last_good.identity_digest,group_index:A,lane:oe,ordered_bead_ids:Q,expected_revision:Y().revision});d=!0,at();try{let E=await s("worker-parallel-analysis-submit",Pe());E&&E.queue&&n&&n.set(E.queue),E&&E.applied!==!0&&E.conflict===!0&&(E=await s("worker-parallel-analysis-submit",Pe()),E&&E.queue&&n&&n.set(E.queue)),E&&E.applied===!0?(l.delete(A),ue(`\uC9C1\uB82C \uB808\uC778 ${oe}\uC5D0 ${Q.length}\uAC1C \uBC30\uCE58`,"success")):ue(`\uC81C\uCD9C \uAC70\uBD80: ${E?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,at()}}function M(A,C,Q){l.set(A,$e(A,C).filter(me=>me!==Q)),at()}function ae(A){l.delete(A),at()}function Ie(A,C,Q,me){let oe=[...$e(A,C)],Pe=oe.indexOf(Q),E=Pe+me;Pe<0||E<0||E>=oe.length||(oe.splice(E,0,...oe.splice(Pe,1)),l.set(A,oe),at())}function qe(){let A=j().settings,C=Object.keys(Se()?.runners||{}),Q=pe();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${me=>et(me.target.value)}
        >
          ${C.map(me=>c`<option
                value=${me}
                ?selected=${Q.runner===me}
              >
                ${me}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${me=>Et(me.target.value)}
        >
          ${Q.models.map(me=>c`<option
                value=${me}
                ?selected=${Q.model===me}
              >
                ${me}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${me=>xt(me.target.value)}
        >
          ${Q.efforts.map(me=>c`<option
                value=${me}
                ?selected=${Q.effort===me}
              >
                ${me}
              </option>`)}
        </select>
      </label>
      ${Ye(A)}
    </div>`}function Ye(A){return!yt(A)||rt(A)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:A.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${A.runner}/${A.model} · effort
        ${A.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:A.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function rt(A){return A.is_default===!0&&A.compatible===!1}function yt(A){return!!(A.runner&&A.model&&A.effort)}function vt(A){return yt(A)&&A.compatible!==!1}function se(A){let C=Math.max(0,Math.floor(A/1e3)),Q=Math.floor(C/60),me=C%60;return`${Q}:${String(me).padStart(2,"0")}`}function X(A){let C=A.job;if(C){let Q=typeof C.started_at=="number"?C.started_at:0,me=`${C.runner||"?"}/${C.model||"?"}`,oe=Q?` \xB7 \uACBD\uACFC ${se(Date.now()-Q)}`:"",Pe=typeof C.session_id=="string"?C.session_id:"",E=L(A).find(U=>U.run_id===C.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${me} · effort ${C.effort||"?"}${oe}</span
        >
        ${Pe?c`<code class="pa-session-id" title=${Pe}
              >${Pe.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>te(C.job_id,E||C)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${E?.prompt_saved!==!0||ie.has(C.job_id)}
          @click=${()=>{Re(C.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return dt()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Ue(A){let C=X(A);return C===""?"":c`<div class="pa__strip">${C}</div>`}function dt(){return r?.isPending?.()===!0}function ze(A){let C=!!A.job,Q=vt(A.settings),me=b!==null&&w.size===0,oe=C||d||dt()||F;return c`<div class="pa-meta">
      ${A.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(A.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!Q||oe||me}
        @click=${()=>{he(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!Q||oe||me}
        @click=${()=>{he(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!C}
        @click=${()=>{J()}}
      >
        취소
      </button>
    </div>`}function ve(A){return typeof A=="string"&&A.length>0?A:"\uBBF8\uBC30\uCE58"}function Qe(A,C){C?w.add(A):w.delete(A),at()}function ct(A){let C=Array.isArray(A.scope)?A.scope:[],Q=Array.isArray(A.overlaps)?A.overlaps:[];return C.length===0&&Q.length===0?c``:c`<span class="pa-target__signals">
      ${C.length>0?c`<details class="pa-target__scope" title=${C.join(`
`)}>
            <summary>scope ${C.length}</summary>
            <ul>
              ${C.map(me=>c`<li><code>${me}</code></li>`)}
            </ul>
          </details>`:""}
      ${Q.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${Q.join(", ")}`}
            >겹침 ${Q.join(", ")}</span
          >`:""}
    </span>`}function mt(){let A=b?.qualified||[],C=b?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${F?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${A.length} \xB7 \uC81C\uC678 ${C.length}`}</span
        >
      </header>
      ${b&&A.length>0?c`<ul class="pa-targets__list">
            ${A.map(Q=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${Q.id}
                      .checked=${w.has(Q.id)}
                      @change=${me=>Qe(Q.id,me.target.checked)}
                    />
                    <span class="pa-target__title">${Q.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${ct(Q)}
                    <span class="pa-target__route">${Q.route}</span>
                    <span class="pa-target__lane"
                      >${ve(Q.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:b&&A.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${b&&C.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${C.length}</summary>
            <ul class="pa-targets__list">
              ${C.map(Q=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${Q.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${cv[Q.reason]||Q.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ve(Q.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function gt(A){let C=typeof A.session_id=="string"&&A.session_id.length>0,Q=C?A.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${A.outcome}"
        >${uv[A.outcome]||A.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(A.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${A.runner||"?"} / ${A.model||"?"} / ${A.effort||"?"}</span
      >
      ${C?c`<code class="pa-session-id" title=${Q}
            >${Q.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${A.outcome==="failure"&&A.reason?c`<span class="pa-run-row__reason">${A.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>te(A.run_id,A)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${A.prompt_saved!==!0||ie.has(A.run_id)}
          @click=${()=>{Re(A.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function zt(A){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${A.length>0?c`<ul class="pa-runs__list">
            ${A.map(C=>gt(C))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function qt(){return K?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${De}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${K.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{T()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${De}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${K.prompt}</pre
        >
      </section>
    </div>`:""}function Kt(A,C){let Q=$e(A,C),me=I(),oe=Q.filter(_e=>me.has(_e)),Pe=re(Q),E=ce(Q),U=Array.isArray(Y().serial_lanes)?Y().serial_lanes:[],xe=u.get(A)||be(),tt=C.eligible!==!0||Q.length<2||oe.length>0||Pe.length>0||E||d;return c`<section class="pa-group" data-group-index=${String(A)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${C.confidence}</span>
        ${C.categories.map(_e=>c`<span class="pa-group__category">${_e}</span>`)}
        ${E?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${C.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${Pe.length>0?c`<span class="pa-group__stale"
              >stale — ${Pe.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${C.reason}</p>
      <ol class="pa-group__members">
        ${Q.map((_e,Xe)=>c`<li class="pa-member" data-bead-id=${_e}>
              <span class="pa-member__seq">${Xe+1}</span>
              <span class="pa-member__title">${we(_e)}</span>
              ${me.has(_e)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${_e}
                ?disabled=${Xe===0}
                aria-label=${`${_e} \uC704\uB85C`}
                @click=${()=>Ie(A,C,_e,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${_e}
                ?disabled=${Xe===Q.length-1}
                aria-label=${`${_e} \uC544\uB798\uB85C`}
                @click=${()=>Ie(A,C,_e,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${_e}
                aria-label=${`${_e} \uC81C\uC678`}
                @click=${()=>M(A,C,_e)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${C.evidence.map(_e=>c`<li class="pa-evidence">
              <code>${_e.path}</code>
              <span class="pa-evidence__locator">${_e.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>ae(A)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${_e=>{u.set(A,_e.target.value),at()}}
          >
            ${U.map((_e,Xe)=>c`<option
                  value=${_e.id}
                  ?selected=${xe===_e.id}
                >
                  직렬 ${Xe+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${tt}
          @click=${()=>{ht(A,C)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Ct(A){let C=Array.isArray(A.issues)?A.issues:[],Q=C.filter(oe=>oe.verdict==="parallel_ok").length,me=C.filter(oe=>oe.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${Q}</span>
      <span>uncertain ${me}</span>
    </div>`}function Rt(){let A=We&&!!j().job;if(A&&h===null){h=setInterval(()=>at(),1e3);return}!A&&h!==null&&(clearInterval(h),h=null)}function at(){let A=j();_&&A.settings.runner===_&&(_=null);let C=A.last_good?.result;Rt(),lt(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Ce}
            >
              ×
            </button>
          </header>
          ${Ue(A)}
          <div class="pa__body">
            ${qe()} ${ze(A)} ${mt()}
            ${C?c`${C.groups.map((Q,me)=>Kt(me,Q))}
                ${C.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Ct(C)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${zt(L(A))}
          </div>
        </div>
        ${qt()}
      `,i)}let We=!1,P=()=>{We=!1,K=null,W+=1,Rt()},ee=A=>{A.target===A.currentTarget&&Ce()};i.addEventListener("close",P),i.addEventListener("cancel",P),i.addEventListener("click",ee);let ye=null;n&&n.subscribe&&(ye=n.subscribe(()=>{We&&at()}));let O=null;r&&r.subscribe&&(O=r.subscribe(()=>{We&&at()}));function H(){We||(We=!0,at(),z(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Ce(){We&&(We=!1,K=null,W+=1,Rt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:H,close:Ce,destroy(){We=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",P),i.removeEventListener("cancel",P),i.removeEventListener("click",ee),ye&&(ye(),ye=null),O&&(O(),O=null),i.remove()}}}var Pf=new Set(["sh","bash","zsh","dash","ksh"]),Df=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Nf(e){let t=e.split("/");return t[t.length-1]||""}function pv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Nf(n[0]);if(r!=="env")return Pf.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Pf.has(Nf(s))}function fv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function _v(e){let t=[],n=0;Df.lastIndex=0;for(let r of e.matchAll(Df)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:fv(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function mv(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function qf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",l=0,u=null,d=!1;function _(q,z){return z?_v(q).map(L=>L.kind==="plain"?L.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${L.kind}"
            >${L.text}</span
          >`):q}function h(){if(!s)return c``;let q=o==="ready"&&pv(a),z=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>Y()}
      ></div>
      <section class="repo-ops-script-viewer__panel">
        <header class="repo-ops-script-viewer__header">
          <div class="repo-ops-script-viewer__identity">
            <span
              class="repo-ops-script-viewer__path"
              title=${s.path}
              >${s.path}</span
            >
            <span class="repo-ops-script-viewer__ref"
              >${s.base_ref}@${s.base_sha.slice(0,7)}</span
            >
          </div>
          <div class="repo-ops-script-viewer__actions">
            <button
              type="button"
              class="repo-ops-script-viewer__copy"
              ?disabled=${o!=="ready"}
              @click=${()=>{w()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>Y()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${z.map((L,I)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${I+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(L,q)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){lt(h(),r)}async function w(){if(o!=="ready")return;let q=await On(a);ue(q?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",q?"success":"error")}function F(q){q.key==="Escape"&&s&&(q.preventDefault(),Y())}function W(){d||(document.addEventListener("keydown",F),d=!0)}function K(){d&&(document.removeEventListener("keydown",F),d=!1)}async function ie(q,z=null){let L=++l;W(),s={...q},u=z||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let re=t?t():"";if(!re){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let ge="/api/repo-ops-script?workspace="+encodeURIComponent(re)+"&lane="+encodeURIComponent(q.lane)+"&base_sha="+encodeURIComponent(q.base_sha);try{let $e=await n(ge),ce=await $e.json().catch(()=>({}));if(L!==l)return;if((t?t():"")!==re){Y();return}if(!$e.ok||!ce||ce.ok!==!0){o="error",i=mv(ce&&typeof ce.error=="string"?ce.error:""),b();return}s={lane:ce.lane,base_sha:ce.base_sha,path:ce.path,base_ref:ce.base_ref},a=String(ce.content),o="ready",b()}catch{if(L!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function Y(){l+=1,K(),s=null,a="",b();let q=u;u=null,q?.isConnected&&q.focus()}function j(){Y(),r.remove()}return{open:ie,close:Y,destroy:j}}function Ff(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let L=o();return typeof L.revision=="number"?L.revision:0}function i(L){t&&L&&L.queue&&typeof L.queue=="object"&&t.set(L.queue)}function l(){let L=o().workspace_info;return L&&typeof L=="object"?L:{}}function u(L,I){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${L}"
      >${I}</span
    >`}function d(L){if(typeof L!="number"||!Number.isFinite(L))return"";let I=L/6e4;return Number.isInteger(I)?`timeout ${I}\uBD84`:`timeout ${Math.round(L/1e3)}\uCD08`}function _(L){let I=d(L);return I?u("config",I):""}function h(L,I,re){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${re.script}
      @click=${ge=>{s&&s({lane:L,base_sha:I.base_sha,path:re.script,base_ref:I.base_ref},ge.currentTarget)}}
    ></button>`}function b(){let L=o().repo_ops_opt_out;return{verify:L?.verify===!0,deploy:L?.deploy===!0}}function w(L,I){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!I}
        @change=${re=>{ie(L,!re.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function F(L){let I=typeof L.base_sha=="string"?L.base_sha:"",re=`${L.source_path||"repo-ops/config.toml"} @ ${L.base_ref||"?"}${I?`@${I.slice(0,7)}`:""}`,ge=b(),$e=!!L.verify&&ge.verify,ce=!!L.deploy&&ge.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${re}</span>
      </p>
      <div
        class="worker-repo-ops__lane${$e?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${L.verify?c`${h("verify",L,L.verify)}
              ${_(L.verify.timeout_ms)}
              ${$e?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${$e?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":L.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${L.verify?w("verify",ge.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ce?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${L.deploy?c`${h("deploy",L,L.deploy)}
              ${_(L.deploy.timeout_ms)}
              ${ce?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ce?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":L.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${L.deploy?w("deploy",ge.deploy):""}
      </div>
    </section>`}function W(L){let I=L.repo_ops&&typeof L.repo_ops=="object"?L.repo_ops:null;return I&&(I.status==="resolved"||I.status==="absent")?F(I):I&&(I.status==="pending"||I.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
        <p class="worker-repo-ops__vd-title">
          저장소 작업 선언
          <span class="worker-repo-ops__vd-ro"
            >읽기 전용 — config에서 정의</span
          >
        </p>
        <div
          class="worker-repo-ops__vd-line worker-repo-ops__vd-absent"
          data-seam="repo-ops-status"
        >
          ${I.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${I.error_code?c` — <code>${I.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function K(L){if(!n)return;let I=await n("worker-auto-repair-toggle",{on:L,expected_revision:a()});if(i(I),I&&I.conflict){let re=await n("worker-auto-repair-toggle",{on:L,expected_revision:a()});i(re)}r()}async function ie(L,I){if(!n)return;let re=await n("worker-repo-ops-opt-out-toggle",{kind:L,opted_out:I,expected_revision:a()});if(i(re),re&&re.conflict){let ge=await n("worker-repo-ops-opt-out-toggle",{kind:L,opted_out:I,expected_revision:a()});i(ge)}r()}let Y={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function j(L,I,re){return c`<div class="worker-repo-ops__policy-group" data-policy=${re}>
      <div class="worker-repo-ops__policy-label">${L}</div>
      <ul class="worker-repo-ops__policy-list">
        ${I.map(ge=>c`<li data-token=${ge}>
              ${Y[ge]||ge}
            </li>`)}
      </ul>
    </div>`}function q(L){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${L.map(I=>{let re=[Y[I.trigger]||I.trigger];return Number.isInteger(I.attempts_per_operation_attempt)?re.push(`operation\uB2F9 ${I.attempts_per_operation_attempt}\uD68C`):Number.isInteger(I.attempts)?re.push(`${Y[I.budget]||I.budget} ${I.attempts}\uD68C`):Number.isInteger(I.sessions_per_user_action)&&re.push(`${I.sessions_per_user_action}\uD68C`,Y[I.user_actions]||I.user_actions),I.applies_when&&re.push(Y[I.applies_when]||I.applies_when),c`<li data-token=${I.id}>
            <strong>${Y[I.id]||I.id}</strong>
            <span>${re.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function z(){let L=o(),I=L.auto_repair!==!1,re=L.repo_operation_policy&&typeof L.repo_operation_policy=="object"?L.repo_operation_policy:null,ge=Array.isArray(L.repo_operations)?L.repo_operations:[],$e=ge.find(Ge=>Ge.state==="repairing"),ce=ge.filter(Ge=>Ge.state==="failed"||Ge.state==="repairing"),be=ce.length?Math.min(...ce.map(Ge=>typeof Ge.repair?.remaining=="number"?Ge.repair.remaining:0)):re?.auto_repair?.resolution_ladder?.find(Ge=>Ge.id==="auto_repair_session")?.attempts??1,we=Array.isArray(re?.auto_repair?.resolution_ladder)?re.auto_repair.resolution_ladder:[];return c`<section
      class="worker-repo-ops__repair"
      data-seam="auto-repair"
    >
      <p class="worker-repo-ops__vd-title">
        자동 해결
        <span class="worker-repo-ops__vd-ro"
          >자동화(대기열·머지)와 독립된 스위치</span
        >
      </p>
      <label class="worker-repo-ops__repair-toggle">
        <input
          type="checkbox"
          class="worker-repo-ops__repair-input"
          .checked=${I}
          @change=${Ge=>{K(Ge.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${I?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${be}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${$e?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${$e.repair?.owner_bead||$e.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${re?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(re.worker_automatic||[]).length} · 해결 사다리
                ${we.length} · 금지
                ${(re.never_automatic||[]).length}</span
              >
            </summary>
            ${j("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",re.worker_automatic||[],"worker-automatic")}
            ${re.supported===!1||re.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${re.schema_version})`}
                </div>`:q(we)}
            ${j("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",re.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${W(l())} ${z()}
      </details>`}}}var Wf=20,gv=5,bv=new Set(["failed","repairing","running","queued","retry_pending"]),jf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Bf={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function hv(e,t,n=Wf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function yv(e){if(e.type==="cleanup")return!0;let t=e.operation;return bv.has(t.state)&&!t.dismissed&&!t.superseded_by}function vv(e,t,n={}){let r=hv(e,t,1/0),s=n.expanded===!0?Wf:gv,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||yv(i));return{visible:a,hidden:r.length-a.length}}function Uf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function wv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function zf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Hf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function kv(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Bf,r)?Bf[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${n}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function $v(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?fn(e.at):""}
      >${aa(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Uf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(jf,t.kind)?jf[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ra(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Ps(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Uf(e)}"
          >${wv(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?Hf(Bp(t.failure_kind,r)):""}
      ${kv(t)}
      ${zf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ra(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function xv(e){let t=e.cleanup,n=Or(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?fn(e.at):""}
      >${aa(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--warn"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${t.bead_id} 머지 후 정리</span>
        <span class="worker-ev__st worker-ev__st--warn">멈춤</span>
      </div>
      <ol class="worker-stepper" aria-label="정리 단계">
        ${gd(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Hf(ja(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?c`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${zf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Av(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
    <div class="worker-repo-drawer__hd">
      <h3>저장소 작업 타임라인</h3>
      <span class="worker-repo-drawer__hint">${e.repo}</span>
      <span class="worker-repo-drawer__spacer"></span>
      <button
        type="button"
        class="worker-repo-drawer__close"
        aria-label="닫기"
        data-seam="repo-ops-close"
      >
        ✕
      </button>
    </div>
    ${e.events.length===0?c`<div class="worker-repo-drawer__empty">기록 없음</div>`:c`<ul class="worker-rail">
          ${e.events.map(r=>r.type==="cleanup"?xv(r):$v(r))}
        </ul>`}
    ${t>0||n?c`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${n?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function Gf(e,t={}){let n=null;function r(){if(n===null){lt(c``,e);return}let a=vv(n.operations,n.cleanup_failures,{expanded:n.expanded});lt(Av({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var Sv=Gt("views:worker"),Ev="tab:worker:ready",Tv="tab:worker:blocked",Cv="tab:worker:in-progress",Rv="tab:worker:resolved",Ov="tab:worker:closed",za=1,Kf=5;function Vf(e){return to(e).evidence==="published"}var Lv=new Set(["quick_fix","spec_backed","full_plan"]);function Yf(e){return typeof e=="string"&&Lv.has(e)}var Qf="beads-ui.worker.candidate-filter",Il={show_blocked:!1,spec:"all"};function Iv(){try{let e=window.localStorage.getItem(Qf);if(!e)return{...Il};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Il};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Il}}}function Mv(e){try{window.localStorage.setItem(Qf,JSON.stringify(e))}catch{}}function Pv(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=n(i),u=r(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Dv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Jf="bdui.worker.candidate_sort",e_=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],Pl="spec";function t_(e){return e_.some(t=>t.value===e)?e:Pl}function Nv(){try{return t_(window.localStorage.getItem(Jf))}catch{return Pl}}function qv(e){try{window.localStorage.setItem(Jf,e)}catch{}}var n_="bdui.worker.done-range";function Fv(){try{let e=window.localStorage.getItem(n_);return e===null?"today":Zn(e)}catch{return"today"}}function jv(e){try{window.localStorage.setItem(n_,e)}catch{}}function Zf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Bv(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(Er):t==="updated"?r.sort(So):(r.sort(Eo(n)),t==="board"?r:[...r.filter(Vf),...r.filter(s=>!Vf(s))])}function Uv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Wv(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var zv="\u{1F512} blocked";function Xf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Hv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Gv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Kv(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Vv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Yv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function Ml(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Zv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Xv=new Set(["waiting_metadata","reviewing","retrying"]);function Qv(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?fn(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Jv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function ew(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=Jv(e.terminal_reason);l&&i.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!Zv.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function tw(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function nw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,o={})=>{let a=[o.title||"",t].filter(Boolean);return{label:s,title:a.join(`
`),live:o.live===!0,alert:o.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});let r=tw(e.receipt_check);if(r.length>0)return n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let s=Hv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${s.label}`,{title:e.head_review.failure_reason?`${s.action} (${e.head_review.failure_reason})`:s.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Xf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Xf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function rw(e,t,n,r,s=null,o=null,a=null,i=!1,l=null,u=!0,d=null,_=null,h=null,b={},w=!1,F=!1,W={},K=null){let ie=!!l&&l.position>0,Y=!!l?.continuation_action&&l.continuation_action.continuation===null,j=!!l&&l.active===!0,q=l&&l.failure||null,z=Kv(l?l.waiting:null,h),L=n[e]||null,I=L&&L.gate?L.gate:null,re=L&&L.pr?L.pr:null,ge=Vv(l?l.resolution:null),$e=Yv(l?l.head_review:null),ce=l&&l.head_review||null,be=Qv(h,ce),we=ew(h,be),Ge=l&&l.authority||null,he=!!ce&&["pending","reviewing","revising"].includes(ce.state),J=!!h&&typeof h=="object"&&Xv.has(h.phase),Re=ie&&!j&&(ce?.state==="failed"||!Ge||J||Ge.source==="automatic"&&!F),De=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ge?ge.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":z,T=!!I&&I.base_badge==="\uCDA9\uB3CC",te=!!I&&I.enabled===!0,Se=Fs({bead_id:e,merge_sha:W.merge_sha,cleanup_cursor:W.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:W.repo_operations}),ke=ba(Se),Ne=o&&!Se&&(o.queueing??null)?o.queueing:null,pe=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!I&&I.tier==="merged",Le=i&&!!r&&!!I&&I.tier==="merged",et=Re&&(te||T||I?.reason==="base_behind"||I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"||I?.reason==="review_receipt_undetermined"||pe||Le),Et=i&&T&&u===!1,xt=Bn(b,e,{external:i,merge_active:j||Se?.step==="merge",merge_queued:ie,conflict_active:!!a,cleanup_active:ke,merged:!!r||I?.tier==="merged"}),ht=!!xt.operation,M=!pe&&!!r&&r.step==="repo_operations",ae=nw({continuation_required:Y,queueing:Ne,merge_step:Se,conflict_badge:De,conflict_live:ge?.live===!0||a==="running",head_review:ce&&$e?{...$e,state:ce.state,failure_reason:ce.failure_reason}:null,auto_resolution:be,recovery:we,cleanup_failed:r,cleanup_label:r?Or(r.step):null,base_exception:_,conflicting:T,gate:I,receipt_check:L&&L.receipt_check?L.receipt_check:null,queue_failure:q,auto_skip:d,queued:ie,queue_active:j,queue_position:l?l.position:0,activity:De?null:o&&o.activity||null}),Ie=ae?.live===!0&&ae.title?c`<span title=${ae.title}>${ae.label}</span>`:ae?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&Se?.active!==!0?ga(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:w,...K?{dependency_chips:K}:{},external:i,pr_number:re&&typeof re.number=="number"?re.number:null,pr_url:re&&typeof re.url=="string"?re.url:"",completion_badge:ae?.live!==!0&&ae?.title?ae.label:null,completion_title:ae?.title||"",completion_repair_pr_url:we?we.repair_pr_url:"",completion_repair_pr_number:we?we.repair_pr_number:null,badges:Ie?[Ie]:[],live_badge:ae?.live===!0?Ie:null,usage:s,alert:ae?.alert===!0,merge_action:I?.tier==="merged"&&!pe&&!Le||M?!1:!ie||Y||Re,timeline_action:M,cancel_action:ie&&!Y,cancel_enabled:(!j||he)&&!(we&&we.lock_actions),cancel_title:we&&we.lock_actions?`${we.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:j&&!he?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":he?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:xt,discard_action:xt.action,merge_step:Se,discard_enabled:xt.enabled,discard_title:xt.title,merge_enabled:!Se&&!Ne&&!a&&!ht&&!_&&!(we&&we.lock_actions)&&!Et&&!M&&(te||T||I?.reason==="base_behind"||I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"||I?.reason==="review_receipt_undetermined"||pe||Le||et||J&&!j),merge_label:Y?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":pe||Le?"\uC815\uB9AC \uC7AC\uAC1C":T&&!Se&&!pe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":I?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Re?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ht?xt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${xt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${xt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Y?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ne?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":Se?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Se.label}`:Le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Et?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":pe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":T?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":I?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":te?`\uBA38\uC9C0 (${I.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:I&&I.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${I&&I.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Dl(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,switchWorkspace:d,openDoc:_,doneRange:h,onDoneRangeChange:b}=t,w=r?Co(r,i):null,F=Io({transport:n,uiOrderStore:i}),W=null,K=[],ie=Iv(),Y=null,j=null,q={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},z=Nv(),L=h?Zn(h):Fv(),I=new Map;function re(){let m=Br.find(k=>k.value===L);return m?m.label:"\uC624\uB298"}let ge=Fa("beads-ui.worker.lane-collapsed"),$e=!1,ce=new Set,be=new Set,we=new Set,Ge=new Set,he=new Set,J={},Re=null,De=0,T=null,te=[];function Se(m){return Re===m?J:{}}async function ke(){if(!n)return;let m=u?.()||"";if(Re===m||T&&T.key===m&&T.generation===De)return;let k=++De;T={key:m,generation:k};let G=null;try{G=await Promise.resolve(n("get-session-defaults",{}))}catch(de){if(k!==De)return;T=null,Sv("get-session-defaults failed: %o",de),nt();return}k===De&&(J=G&&typeof G.values=="object"&&G.values!==null?{...G.values}:{},Re=m,T=null,nt())}function Ne(){Re=null,De+=1,ke()}let pe=document.createElement("div");pe.className="worker-console";let Le=document.createElement("div");Le.className="worker-top";let et=document.createElement("div");et.className="worker-drawer-overlay",et.hidden=!0;let Et=document.createElement("div");Et.className="worker-drawer-overlay__backdrop";let xt=document.createElement("div");xt.className="worker-drawer-host";let ht=document.createElement("div");ht.className="worker-drawer-host",ht.hidden=!0,et.append(Et,xt,ht);let M=document.createElement("div");M.className="worker-lanes-host",pe.append(Le,et,M),e.appendChild(pe);let ae=null,Ie=null,qe=is(xt,{transport:n,sessionLogStore:a,onClose:()=>{ae=null,Ie=null,et.hidden=!0,nt()}}),Ye=Gf(ht,{onClose:()=>{ht.hidden=!0,et.hidden=!0,nt()}}),rt=qf({getWorkspacePath:u||(()=>"")}),yt=u&&u()||"",vt=Ff({queueStore:s,transport:n,onChanged:()=>nt(),onOpenScript:(m,k)=>{rt.open(m,k)}}),se=o?Mf(pe,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(m,k)=>R(m,k)}):null;function X(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:za,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Ue(){let m=X(),k=typeof m.serial_lane_count=="number"&&Number.isInteger(m.serial_lane_count)&&m.serial_lane_count>0?Math.min(m.serial_lane_count,5):0,G=Array.isArray(m.serial_lanes)?m.serial_lanes:[],de=[];for(let bt of G){if(de.length>=k)break;!bt||typeof bt.id!="string"||!/^s[1-5]$/.test(bt.id)||!Array.isArray(bt.entries)||de.push({id:bt.id,label:`\uC9C1\uB82C ${bt.id.slice(1)}`,count:bt.entries.length})}return de.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(m.queue)?m.queue:[]).length},...de]}function dt(m){if(!Y||!m.some(G=>G.id===Y))return null;let k=Ue();return k?{bead_id:Y,lanes:k}:null}function ze(){let m=X();return typeof m.revision=="number"?m.revision:0}function ve(m){m&&m.queue&&s&&s.set(m.queue)}function Qe(){let m=X().queue;return Array.isArray(m)?m.length:0}async function ct(m,k,G){if(!n)return;let de=()=>({bead_id:m,...k==="parallel"?{}:{lane:k},...G===void 0?{}:{index:G},expected_revision:ze()}),Te=await n("worker-queue-place",de());ve(Te),Te&&Te.conflict&&await n("worker-queue-place",de()).then(ve)}async function mt(m,k,G){if(!n)return;let de=()=>({bead_id:m,...k==="parallel"?{}:{lane:k},to_index:G,expected_revision:ze()}),Te=await n("worker-queue-reorder",de());ve(Te),Te&&Te.conflict&&await n("worker-queue-reorder",de()).then(ve)}async function gt(m){if(!n)return;let k=await n("worker-queue-remove",{bead_id:m,expected_revision:ze()});ve(k),k&&k.conflict&&await n("worker-queue-remove",{bead_id:m,expected_revision:ze()}).then(ve)}async function zt(m){if(!n||!m)return;let k=await n("worker-attempt-pause",{attempt_id:m});k&&k.paused===!1&&k.reason&&ue(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function qt(m){if(!n||!m)return;let k=await Yr();if(k===null)return;let G=async(Te={})=>await n("worker-attempt-resume",{attempt_id:m,expected_revision:ze(),...k!==""?{instructions:k}:{},...Te}),de=await G();ve(de),de&&de.conflict&&(de=await G(),ve(de)),de=await rr(de,(Te,bt)=>G({continuation:Te,decision_token:bt}),{onResult:ve,refresh:()=>G()}),de&&de.resumed===!1&&!de.conflict&&de.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${de.reason}`,"error",2400)}async function Kt(m){if(!n||!m)return;let k=await n("worker-attempt-dismiss",{attempt_id:m,expected_revision:ze()});ve(k),k&&k.conflict&&(k=await n("worker-attempt-dismiss",{attempt_id:m,expected_revision:ze()}),ve(k)),k&&k.dismissed===!1&&!k.conflict&&k.reason&&ue(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Ct(m,k,G=!0){if(!n)return null;let de=n,Te=await de(m,{...k,expected_revision:ze()});return ve(Te),Te&&Te.conflict&&G&&(Te=await de(m,{...k,expected_revision:ze()}),ve(Te)),Te}async function Rt(m){if(!n||!m)return;let k=X().merge_queue?.find(de=>de.bead_id===m)?.continuation_action;if(k?.mismatch&&k.continuation===null){await We(m,k.mismatch);return}ce.add(m),nt();let G;try{G=await Ct("worker-merge-queue-add",{bead_id:m})}catch{ue("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ce.delete(m),nt()}if(!(!G||G.applied)){if(G.conflict){ue("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ue(Gv(G.reason),"error",2400)}}async function at(m){if(!(!n||!m||be.has(m))){be.add(m),nt();try{let k=await n("worker-cleanup-retry",{bead_id:m,expected_revision:ze()});ve(k),k&&!k.retried&&!k.conflict&&k.reason&&ue(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${k.reason}`,"error",2400)}finally{be.delete(m),nt()}}}async function We(m,k){let G=await rr({continuation_mismatch:k},(Te,bt)=>Ct("worker-merge-queue-add",{bead_id:m,continuation:Te,decision_token:bt},!1)),de=G?.queue?.merge_queue?.find(Te=>Te.bead_id===m)?.continuation_action;if(G?.applied!==!0&&de?.continuation===null&&de.mismatch){await We(m,de.mismatch);return}G&&G.applied===!1&&!G.conflict&&ue("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function P(m){if(!n)return;let k=await Ct("worker-merge-auto-toggle",{on:m});!k||k.conflict||ue(m?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",m?"success":"info",2400)}async function ee(m){if(!n||!m)return;let k=await Ct("worker-merge-queue-remove",{bead_id:m});k&&!k.conflict&&!k.applied&&k.reason==="merge_active"&&ue("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ye(){await Ct("worker-merge-queue-remove",{all:!0})}async function O(m,k=null,G="unmerged",de=null){if(!n||!m)return;let Te=Ds(m,G);if(!(!!de||typeof globalThis.confirm!="function"||globalThis.confirm(Te)))return;let it=await n("worker-discard",{bead_id:m,...k?{attempt_id:k}:{},...de?{operation_id:de}:{},expected_revision:ze()});if(ve(it),it&&it.conflict&&(it=await n("worker-discard",{bead_id:m,...k?{attempt_id:k}:{},...de?{operation_id:de}:{},expected_revision:ze()}),ve(it)),it&&it.discarded===!0){ue(ia(it),"success",5e3);return}if(it&&it.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${it.reason}`,"error",2800);return}if(it&&it.accepted&&it.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(it&&it.accepted&&!it.discarded){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${it.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}it&&!it.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function H(m,k,G){if(!(!n||!k||!G||Ge.has(k))){Ge.add(k),nt();try{let de=await n(m,{bead_id:k,action_id:G,expected_revision:ze()});ve(de),de?.conflict?ue("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!de?.ok&&de?.reason&&ue(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(de.reason)}`,"error",2800)}finally{Ge.delete(k),nt()}}}async function Ce(m,k){if(!n||!k||we.has(k))return;we.add(k),nt();let G;try{let de=async(Te={})=>await n(m,{bead_id:k,expected_revision:ze(),...Te});G=await de(),ve(G),G&&G.conflict&&(G=await n(m,{bead_id:k,expected_revision:ze()}),ve(G)),m==="worker-revise-fix"&&(G=await rr(G,(Te,bt)=>de({continuation:Te,decision_token:bt}),{onResult:ve,refresh:()=>de()}))}finally{we.delete(k),nt()}if(!(!G||G.conflict)){if(G.ok){ue(m==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ue(`\uCC98\uBD84 \uAC70\uBD80: ${G.reason||""}`,"error",3e3)}}async function A(m){if(!n)return;let k=await n("worker-automation-toggle",{on:m,expected_revision:ze()});ve(k),k&&k.conflict&&await n("worker-automation-toggle",{on:m,expected_revision:ze()}).then(ve)}async function C(m){if(!n||!m)return;let k=await n("worker-repo-operation-repair",{operation_id:m});if(ve(k),k&&k.ok===!1){ue(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${k.reason||""}`,"error",3e3);return}k&&k.ok===!0&&ue("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Q(m){if(!n||!m)return;let k=await n("worker-repo-operation-dismiss",{operation_id:m});ve(k),k&&k.ok===!1&&ue(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${k.reason||""}`,"error",3e3)}async function me(m){if(!n||!Number.isFinite(m))return;let k=Math.max(za,Math.floor(m)),G=await n("worker-queue-set-slots",{slots:k,expected_revision:ze()});ve(G),G&&G.conflict&&await n("worker-queue-set-slots",{slots:k,expected_revision:ze()}).then(ve)}async function oe(m){if(!n||!Number.isInteger(m)||m<1||m>Kf)return;let k=X(),G=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).slice(m).reduce((bt,it)=>bt+(Array.isArray(it?.entries)?it.entries.length:0),0),de=()=>({count:m,expected_revision:ze()}),Te=await n("worker-queue-set-serial-lane-count",de());ve(Te),Te&&Te.conflict&&(Te=await n("worker-queue-set-serial-lane-count",de()),ve(Te)),Te&&Te.applied&&G>0&&ue(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${G}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let Pe="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function E(m,k){let G=xl(m,k.id,q);return{id:k.id,title:k.title,location_label:k.location_label,prefixes:k.prefixes,action:G.kind==="note"?{kind:"note",text:G.text}:G.kind==="disabled"?{kind:"disabled",label:Pe,title:G.title}:{kind:"place",label:Pe,title:G.title}}}function U(m,k){if(!j||j.bead_id!==m)return null;let G=j.counterpart_id,de=k.filter(Te=>Te.id===G);return de.length===0?null:{rows:de.map(Te=>E(m,Te))}}async function xe(m,k){let G=xl(m,k,q);if(j=null,G.kind!=="ops"){nt();return}let de=ze();for(let Te of G.ops){let bt=await tt(Te,de);if(bt===null)break;de=bt}nt()}async function tt(m,k){if(!n)return null;try{let G=await n("worker-queue-place",{bead_id:m.bead_id,lane:m.lane,index:m.index,expected_revision:k});if(ve(G),G&&G.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!G||G.applied!==!0)return ue(G&&typeof G.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${G.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let de=G.queue?G.queue.revision:void 0;return typeof de!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):de}catch(G){return ue(G instanceof Error&&G.message?G.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function _e(){let m=X(),k=w?w.selectBoardColumn(Ev,"ready"):[],G=w?w.selectBoardColumn(Tv,"blocked"):[],de=w?w.selectBoardColumn(Ov,"closed"):[],Te=w?w.selectBoardColumn(Cv,"in_progress"):[],bt=w?w.selectBoardColumn(Rv,"resolved"):[],it=Oo([...k,...G,...Te,...bt,...de]),Qt=new Map;for(let f of[...k,...G,...Te])f&&f.id&&!Qt.has(f.id)&&Qt.set(f.id,f);let rn={...Se(u?.()||"")};for(let f of["orchestration_model","orchestration_effort","orchestration_speed"]){let D=m[f];typeof D=="string"&&(rn[f]=D)}function an(f,D){let le=Qt.get(f);if(!le)return null;let He=le.metadata&&typeof le.metadata=="object"?le.metadata:{},Je=le.workflow?.route,Jt=He.route,Dt=Yf(Je)?Je:Yf(Jt)?Jt:null;return Cn({pin:He,global:rn,execution_defaults:m.execution_defaults??null,runner_catalog:m.runner_catalog??null,route:Dt,controller_runtime:D})}function wn(f){let D=f.runner||null,le=an(f.bead_id,D),He=Is(f),Je=le?gr(le,D):null;return He||Je?{orchestration:He,worker:Je}:null}let p=new Map;function g(f){if(p.has(f))return p.get(f)??null;let D=an(f,null),le=null;if(D){let He=jn(m.runner_catalog??null,D.orchestration_model.value??""),Je=He===null?D:an(f,He),Jt=Rr(Je,m.runner_catalog??null),Dt=gr(Je,He);le=Jt||Dt?{orchestration:Jt,worker:Dt}:null}return p.set(f,le),le}let v=new Map;function x(f){if(v.has(f))return v.get(f)??null;let D=Qt.get(f),le=D&&D.metadata&&typeof D.metadata=="object"?D.metadata:null,He=le?ns(le):null;return v.set(f,He),He}function B(f){let D=Lo(it,f);return D.total===0?null:D}let Z=m.bead_titles||{},ne=new Map;for(let[f,D]of Object.entries(Z))typeof D=="string"&&D.length>0&&ne.set(f,D);for(let f of[...k,...G])ne.set(f.id,f.title||f.id);let Me=new Map;for(let f of[...k,...G,...Te,...bt,...de])f&&f.id&&typeof f.from_id=="string"&&Me.set(f.id,f.from_id);let Ze=new Map;for(let f of[...k,...G,...Te,...bt,...de])f&&f.id&&typeof f.priority=="number"&&Ze.set(f.id,f.priority);let ft=m.bead_times&&typeof m.bead_times=="object"&&!Array.isArray(m.bead_times)?m.bead_times:{},Ke=m.bead_labels&&typeof m.bead_labels=="object"&&!Array.isArray(m.bead_labels)?m.bead_labels:{},y=m.bead_workflow&&typeof m.bead_workflow=="object"&&!Array.isArray(m.bead_workflow)?m.bead_workflow:{},V=new Map;for(let[f,D]of Object.entries(Ke))Array.isArray(D)&&V.set(f,Rl(D));for(let f of[...k,...G]){let D=f.labels;Array.isArray(D)&&!V.has(f.id)&&V.set(f.id,Rl(D))}let N=new Map,Ae=o?.get()?.last_good?.result?.groups;for(let f of Array.isArray(Ae)?Ae:[]){if(f?.eligible!==!0||!Array.isArray(f.members))continue;let D=f.members.map(He=>{let Je=(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).find(Jt=>Jt.entries.some(Dt=>Dt.bead_id===He));return Je?Je.id:null});if(!(D.every(He=>He!==null)&&new Set(D).size===1))for(let He of f.members)N.set(He,f.members.filter(Je=>Je!==He))}let st=m.bead_blocked_by&&typeof m.bead_blocked_by=="object"&&!Array.isArray(m.bead_blocked_by)?m.bead_blocked_by:{},ot=m.blocker_workspaces&&typeof m.blocker_workspaces=="object"&&!Array.isArray(m.blocker_workspaces)?m.blocker_workspaces:{},wt=new Map;for(let[f,D]of Object.entries(ft))D&&typeof D=="object"&&wt.set(f,D);for(let f of[...k,...G])wt.set(f.id,{created_at:f.created_at,updated_at:f.updated_at});let Ve=f=>wt.get(f)||{},_t=m.pr_wait||[],Ee=m.pr_observations||{},Tt=m.pr_activity||{},pn=m.cleanup_failed||{},jl=Object.entries(pn).map(([f,D])=>({bead_id:f,step:D&&D.step?D.step:"",reason:D&&D.reason?D.reason:"",at:D&&typeof D.at=="number"?D.at:null,detail:D&&typeof D.detail=="string"?D.detail:null,output_tail:D&&typeof D.output_tail=="string"&&D.output_tail?D.output_tail:void 0,log_path:D&&typeof D.log_path=="string"&&D.log_path?D.log_path:void 0,retry_count:D&&typeof D.retry_count=="number"&&Number.isInteger(D.retry_count)&&D.retry_count>0?D.retry_count:0,failure_code:D&&typeof D.failure_code=="string"?D.failure_code:void 0,subject_id:D&&typeof D.subject_id=="string"?D.subject_id:void 0,repair_eligible:!!(D&&D.repair_eligible),repair:D&&D.repair?D.repair:void 0})),Bl=m.queue||[],m_=new Set([...Bl.map(f=>f.bead_id),...(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).flatMap(f=>(Array.isArray(f?.entries)?f.entries:[]).map(D=>D.bead_id)),..._t.map(f=>f.bead_id),...m.done.map(f=>f.bead_id)]),g_=new Set(G.map(f=>f.id)),b_=i?i.get()?.order||{}:{},Ul=new Set,Wl=[];for(let f of[...k,...G])m_.has(f.id)||Ul.has(f.id)||Uv(f)||(Ul.add(f.id),Wl.push(f));K=Bv(Wl,z,b_);let h_=m.admission||{},zl=f=>{let D=h_[f];if(!D)return"";if(D.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof D.reason=="string"?D.reason:"",He=le.indexOf(":");return He>0&&He<le.length-1?`\u26D4 ${le.slice(0,He)} (${le.slice(He+1)})`:`\u26D4 ${le}`},Hl=new Map,y_=K.map(f=>{let D=to(f),le=D.evidence==="published",He=f.workflow?.route==="quick_fix"||f.metadata&&f.metadata.route==="quick_fix",Je=!Object.hasOwn(f,"description")||typeof f.description=="string"&&f.description.trim().length>0,Jt=Object.hasOwn(f,"labels")&&Lf(f.labels),Dt=Jt||!Object.hasOwn(f,"labels")?"":If(f.labels,f.metadata),qr=Dt.length>0,Nt=!Jt&&(He?Je:le&&!D.conflict),mo=g_.has(f.id),er=[];if(mo){let go=Wv(f);go.length>0?Hl.set(f.id,go):er.push(zv)}He&&!Je?er.push("missing_description"):!He&&D.conflict?er.push("spec_id_conflict"):!He&&D.evidence==="none"?er.push("spec \uC5C6\uC74C"):!He&&D.evidence==="draft"&&er.push("spec \uBBF8\uBC1C\uD589(draft)");let Fr=zl(f.id);return Fr&&er.push(Fr),{id:f.id,title:f.title||f.id,reason:er.join(" \xB7 "),draggable:Nt,lane:"candidate",created_at:f.created_at,updated_at:f.updated_at,workflow:f.workflow,is_quick_fix:He,status:f.status,worker_ineligible:Jt,session_preferred:qr,session_preferred_reason:Dt,blocked:mo,has_spec:le,exec_chips:g(f.id),rec:x(f.id),from_id:f.from_id||void 0,priority:Ze.get(f.id)}}),Ha=Pv(y_,ie),Ga=Ha.visible,v_=m.revise_parked||{},ao=m.discard_operations&&typeof m.discard_operations=="object"&&!Array.isArray(m.discard_operations)?m.discard_operations:{},w_=f=>{let D=y[f]?.chips?.pr;return D&&typeof D.number=="number"&&typeof D.url=="string"?{pr_number:D.number,pr_url:D.url}:{}},Ka=(f,D)=>f.map((le,He)=>{let Je=D!=="done",Jt=D!=="done"&&D!=="queue",Dt=Je?v_[le.bead_id]:null,qr=Je?Bn(ao,le.bead_id):null,Nt=qr?.operation?qr:null,mo=Je&&V.get(le.bead_id)===!0,er=m.admission&&typeof m.admission=="object"?m.admission[le.bead_id]:null,Fr=Je?pd(er,!!Nt||Ge.has(le.bead_id)):null,go=Je&&!Fr?zl(le.bead_id):null,M_=Je?[go]:[],wc=[],ri=Je?N.get(le.bead_id):void 0;return ri&&ri.length>0&&wc.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${ri.join(", ")}\uC640`),{id:le.bead_id,title:ne.get(le.bead_id)||le.bead_id,reason:M_.filter(Boolean).join(" \xB7 "),draggable:Je&&!Nt&&!Fr,done:D==="done",lane:D,seq:Jt?He+1:void 0,worker_serial:mo,discard:Nt,stale_work:Fr,badges:[...wc,...Dt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...D==="done"?sa(m.attempts||{},le.bead_id):[]],alert:!!Dt,revise_action:!!Dt,revise_enabled:!!Dt&&!Nt&&!we.has(le.bead_id),revise_title:Dt?Dt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Dt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:D==="done"?Pn(m.attempts||{},le.bead_id):null,work_ms:D==="done"?oa(m.attempts||{},le.bead_id):null,done_at:D==="done"&&typeof le.added_at=="number"?le.added_at:void 0,exec_chips:Je?g(le.bead_id):null,rec:x(le.bead_id),workflow:Je&&y[le.bead_id]||null,...D==="done"?w_(le.bead_id):{},from_id:Me.get(le.bead_id)||void 0,priority:Ze.get(le.bead_id),...Ve(le.bead_id)}}),Pr=m.attempts?Object.values(m.attempts).filter(Cr):[],Va=new Set;for(let f of Pr)f&&typeof f.resumed_from=="string"&&f.resumed_from.length>0&&Va.add(f.resumed_from);let Gl=new Map;for(let f of Pr)Gl.set(f.bead_id,f.attempt_id);let cs=new Map;for(let f of Pr)cs.set(f.attempt_id,f);function Ya(f){let D=new Set,le=f;for(;le&&!D.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;D.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&cs.get(le.resumed_from)||null}return!1}let io=typeof m.declared_base=="string"?m.declared_base:null;function k_(f){let D=null;for(let le of Pr)!le||le.bead_id!==f||Ya(le)||(D===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof D.started_at=="number"?D.started_at:0))&&(D=le);return D&&typeof D.target_base=="string"?D.target_base:null}let Za=[],lo=[],$_=Of(m),Kl=f=>{let D=typeof f.session_id=="string"&&f.session_id.length>0,le=Va.has(f.attempt_id);return{eligible:D&&!le,reason:D?le?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Nn=null;for(let f of Pr){let D=f.status==="paused"&&!Va.has(f.attempt_id);if(f.status==="running"||D)lo.push({bead_id:f.bead_id,attempt_id:f.attempt_id,title:ne.get(f.bead_id)||f.bead_id,runner:f.runner||null,model:f.model||null,effort:f.effort||null,speed:f.speed||null,continuation_mode:f.continuation_mode||null,started_at:typeof f.started_at=="number"?f.started_at:null,resumed_from:f.resumed_from||null,paused:D,conflict_resolution:Ya(f),base_exception:Ml(io,f.target_base),can_pause:typeof f.session_id=="string"&&f.session_id.length>0,discard:Bn(ao,f.bead_id,{attempt_id:f.attempt_id}),workflow:y[f.bead_id]||null,priority:Ze.get(f.bead_id),usage:Pn(m.attempts||{},f.bead_id),rollup:B(f.bead_id),rollup_expanded:he.has(f.bead_id),exec_chips:wn(f),rec:x(f.bead_id),...Ve(f.bead_id)});else if((f.status==="failed"||f.status==="orphaned")&&$_(f)){let le=Kl(f);Za.push({bead_id:f.bead_id,attempt_id:f.attempt_id,title:ne.get(f.bead_id)||f.bead_id,runner:f.runner||null,model:f.model||null,effort:f.effort||null,speed:f.speed||null,continuation_mode:f.continuation_mode||null,started_at:typeof f.started_at=="number"?f.started_at:null,resumed_from:f.resumed_from||null,failed:!0,status:f.status,status_label:f.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Bn(ao,f.bead_id,{attempt_id:f.attempt_id}),resume_eligible:le.eligible,resume_reason:le.reason,conflict_resolution:Ya(f),base_exception:Ml(io,f.target_base),workflow:y[f.bead_id]||null,priority:Ze.get(f.bead_id),usage:Pn(m.attempts||{},f.bead_id),rollup:B(f.bead_id),rollup_expanded:he.has(f.bead_id),exec_chips:wn(f),rec:x(f.bead_id),...Ve(f.bead_id)}),Nn=f}}let Vl=new Set([...Za,...lo].map(f=>f.bead_id)),Yl=new Map;for(let f of Array.isArray(m.session_active)?m.session_active:[]){let D=f&&f.bead_id;if(!(typeof D!="string"||D.length===0||Vl.has(D))){if(Vl.add(D),Array.isArray(f.blocked_by)){let le=f.blocked_by.filter(He=>typeof He=="string"&&He.length>0);le.length>0&&Yl.set(D,le)}lo.push({bead_id:D,attempt_id:null,kind:"session",title:f.title||ne.get(D)||D,status:"in_progress",started_at:Fn(f.started_at)??Fn(f.updated_at),updated_at:Fn(f.updated_at),workflow:f.workflow||null,session_refs:Array.isArray(f.session_refs)?f.session_refs:[],priority:Ze.get(D),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,rec:x(D),usage:null,rollup:null,rollup_expanded:!1})}}let Dr=[...Za,...lo].map(f=>{let D=cs.get(f.attempt_id),le=D?.quickfix_landing;if(D?.quickfix_lane!==!0||!le||typeof le!="object")return f;let He=typeof le.reason=="string"&&le.reason.length>0?le.reason:null,Je=Fs({bead_id:D.bead_id,merge_sha:le.head_sha,cleanup_cursor:le.cursor,cleanup_failed:He?{step:le.cursor,reason:He}:null,repo_operations:Array.isArray(m.repo_operations)?m.repo_operations:[]});return Je?{...f,landing:Je}:f}),Zl=null;if(Nn){let f=Kl(Nn),D=Nn.cause_detail;Zl={bead_id:Nn.bead_id,repo:Nn.repo||"",reason:Nn.cause||Nn.status,cause_detail:D&&typeof D.reason=="string"?{reason:D.reason,command:typeof D.command=="string"?D.command:null}:null,resume_attempt_id:Nn.attempt_id,resume_eligible:f.eligible,resume_reason:f.reason,discard:Bn(ao,Nn.bead_id,{attempt_id:Nn.attempt_id})}}let Xl=new Set(Dr.map(f=>f.bead_id)),Xa=Array.isArray(m.merge_queue)?m.merge_queue:[],Ql=new Map,Jl=new Map,ec=new Map,tc=new Map,nc=new Map;Xa.forEach((f,D)=>{f&&typeof f.bead_id=="string"&&(Ql.set(f.bead_id,D+1),Jl.set(f.bead_id,f.resolution),ec.set(f.bead_id,f.continuation_action||null),tc.set(f.bead_id,f.head_review||null),nc.set(f.bead_id,f.authority||null))});let Nr=m.merge_queue_state||{active:null,failures:{}},x_=Nr.failures||{},rc=Nr.waiting&&typeof Nr.waiting.bead_id=="string"&&typeof Nr.waiting.reason=="string"?Nr.waiting:null,A_=m.auto_merge_skips||{},sc=f=>{let D=A_[f];if(!D)return null;let le=Ee[f],He=le&&le.pr?le.pr.head_sha:null;return He&&He===D.head_sha?D.reason||"":null},co=new Map;for(let f of Dr)f.failed!==!0&&f.conflict_resolution&&(f.paused?co.has(f.bead_id)||co.set(f.bead_id,"paused"):co.set(f.bead_id,"running"));let oc=Dr.filter(f=>f.kind!=="session"&&!f.paused&&f.failed!==!0).length,ac=(m.workspace_info||{}).slots,ic=typeof ac=="number"?ac:typeof m.slots=="number"?m.slots:za,S_=oc>ic,uo=Ar(L),E_=(Array.isArray(m.done)?m.done.slice():[]).filter(f=>uo===void 0||typeof f.added_at!="number"||f.added_at>=uo).sort((f,D)=>(D.added_at||0)-(f.added_at||0)),us=Ka(E_,"done"),T_=new Set((Array.isArray(m.done)?m.done:[]).map(f=>f?.bead_id).filter(f=>typeof f=="string")),lc=[],C_=u?.()||"";for(let f of de){let D=Fn(f.closed_at);if(typeof f.id!="string"||T_.has(f.id)||D===null||uo!==void 0&&D<uo||typeof f.comment_count!="number"||f.comment_count<=0)continue;let le=`${C_}\0${f.id}\0${String(f.updated_at)}\0${f.comment_count}`,He=I.get(le);if(He===void 0&&n&&(I.set(le,"pending"),Promise.resolve(n("get-comments",{id:f.id})).then(Je=>{let Jt=Array.isArray(Je)&&Je.some(Dt=>La(typeof Dt?.text=="string"?Dt.text:"")?.lane==="session");I.set(le,Jt?"session":"not-session"),nt()}).catch(()=>{I.set(le,"failed"),nt()})),He==="session"){let Je=Fn(f.started_at);lc.push({id:f.id,title:f.title||f.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:Je!==null&&D>=Je?D-Je:null,work_kind:"session",done_at:D,created_at:f.created_at,updated_at:f.updated_at})}}us.push(...lc),us.sort((f,D)=>(D.done_at||0)-(f.done_at||0));let po={};for(let f of Qn)po[f]=0;let cc=!1,uc=0,Qa=0,dc=0;for(let f of us){let D=f.usage;if(D&&typeof D=="object"){let le=!1;for(let He of Qn)Number.isFinite(D[He])&&(po[He]+=D[He],cc=!0,le=!0);le&&(Qa+=1,Number.isFinite(D.total_cost_usd)&&(uc+=D.total_cost_usd,dc+=1))}}Qa>0&&dc===Qa&&(po.total_cost_usd=uc);let pc=us.map(f=>f.usage).filter(f=>f&&typeof f=="object"&&f.providers),R_=pc.length>0?_n(Wo(pc)):cc?sr(po):null,fc=m.lane_states&&typeof m.lane_states=="object"&&!Array.isArray(m.lane_states)?m.lane_states:{},_c=Array.isArray(m.serial_lanes)?m.serial_lanes:[],mc=f=>{if(_t.some(He=>He.bead_id===f))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let D=Pr.filter(He=>He&&He.bead_id===f),le=D.length>0?D[D.length-1].status:null;return le==="failed"||le==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":le==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},fo=_c.filter(f=>f&&typeof f.id=="string"&&Array.isArray(f.entries)).map((f,D)=>{let le=fc[f.id]||{},He=new Map((Array.isArray(le.corrections)?le.corrections:[]).filter(Nt=>Nt&&typeof Nt.bead_id=="string"&&typeof Nt.after=="string").map(Nt=>[Nt.bead_id,Nt.after])),Je=Array.isArray(le.occupied_by)?le.occupied_by.filter(Nt=>typeof Nt=="string"):[],Jt=new Set(Je),Dt=Ka(f.entries.filter(Nt=>!Xl.has(Nt.bead_id)&&!Jt.has(Nt.bead_id)),f.id).map(Nt=>He.has(Nt.id)?{...Nt,badges:[`\u{1F517} ${He.get(Nt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Nt.badges]}:Nt),qr=Je.map(Nt=>({id:Nt,title:ne.get(Nt)||Nt,draggable:!1,lane:f.id,ghost:!0,badges:[mc(Nt)]}));return{id:f.id,index:D+1,rows:[...qr,...Dt],occupied:Je.length>0,badge:Je.length>0?mc(Je[0]):"\uB300\uAE30",cycle:le.cycle===!0}}),gc=typeof m.serial_lane_count=="number"?m.serial_lane_count:fo.length,Ja=Ka(Bl.filter(f=>!Xl.has(f.bead_id)),"queue"),bc=new Map,hc=new Set;for(let[f,D]of Object.entries(fc)){if(!/^s[1-5]$/.test(f))continue;let le=D&&Array.isArray(D.occupied_by)?D.occupied_by:[];for(let He of le)typeof He=="string"&&bc.set(He,f);le.length>0&&hc.add(f)}let ur=[];for(let f of Dr)typeof f.bead_id=="string"&&ur.push({id:f.bead_id,title:ne.get(f.bead_id)||f.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:bc.get(f.bead_id)??null});for(let f of _t){let D=f&&f.bead_id;typeof D!="string"||D.length===0||ur.push({id:D,title:ne.get(D)||D,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let f of fo)for(let D of f.rows)D.ghost!==!0&&ur.push({id:D.id,title:D.title,location_label:`${f.id} #${D.seq??""}`.trim(),kind:"serial",lane_id:f.id});Ja.forEach((f,D)=>{ur.push({id:f.id,title:f.title,location_label:`#${D+1}`,kind:"parallel",lane_id:null})});for(let f of Ga)ur.push({id:f.id,title:f.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let yc={};for(let f of _c)f&&typeof f.id=="string"&&Array.isArray(f.entries)&&(yc[f.id]=f.entries.length);let ei=new Map;for(let f of ur)ei.has(f.id)||ei.set(f.id,f);q={members_by_id:ei,serial_raw_lengths:yc,serial_lane_count:gc,occupied_lanes:hc};let O_=Np(m.bead_scope,ur),_o=new Map;for(let[f,D]of Yl)_o.set(f,D);for(let[f,D]of Hl)_o.set(f,D);for(let[f,D]of Object.entries(st))Array.isArray(D)&&_o.set(f,D.filter(le=>typeof le=="string"&&le.length>0));let L_=hd(_o,ur,ot),ti=(f,D=null)=>{let le=O_.get(f),He=L_.get(f)||null,Je=le&&le.overlaps.length>0?le.overlaps:null,Jt=!!le&&le.scope_missing;if(!He&&!Je&&!Jt)return D;let Dt=Je?U(f,Je):null;return{...D||{},...He?{predecessors:He}:{},...Je?{overlaps:Je}:{},...Jt?{scope_missing:!0}:{},...Dt?{popover:Dt}:{}}},ni=f=>{let D=ti(f.id,f.dependency_chips||null);return D&&(f.dependency_chips=D),f};for(let f of Ja)ni(f);for(let f of fo)for(let D of f.rows)D.ghost!==!0&&ni(D);for(let f of Ga)ni(f);let vc=new Map;for(let f of Dr){let D=typeof f.bead_id=="string"?f.bead_id:"";if(D.length===0)continue;let le=f.kind==="session",He=ti(D),Je=typeof f.attempt_id=="string"&&f.attempt_id.length>0?cs.get(f.attempt_id):void 0,Jt=Je&&Je.last_activity&&typeof Je.last_activity=="object"?Je.last_activity:null,Dt=Je&&Array.isArray(Je.legs)?Je.legs:[];!He&&!Jt&&Dt.length===0&&!le||vc.set(D,{...Jt?{last_activity:Jt}:{},...Dt.length>0?{legs:Dt}:{},...He?{dependency_chips:He}:{}})}let I_=_t.map(f=>rw(f.bead_id,ne.get(f.bead_id)||f.bead_id,Ee,pn[f.bead_id]||null,Pn(m.attempts||{},f.bead_id),Tt[f.bead_id]||(ce.has(f.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:be.has(f.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),co.get(f.bead_id)||null,f.external===!0,{position:Ql.get(f.bead_id)||0,active:Nr.active===f.bead_id,failure:x_[f.bead_id]||null,waiting:rc?.bead_id===f.bead_id?rc.reason:null,resolution:Jl.get(f.bead_id),continuation_action:ec.get(f.bead_id),head_review:tc.get(f.bead_id)||null,authority:nc.get(f.bead_id)||null},f.wt_present!==!1,m.auto_merge===!0?sc(f.bead_id):null,Ml(io,k_(f.bead_id)),m.completion_status&&typeof m.completion_status=="object"&&!Array.isArray(m.completion_status)&&m.completion_status[f.bead_id]||null,m.discard_operations&&typeof m.discard_operations=="object"&&!Array.isArray(m.discard_operations)?m.discard_operations:{},cs.get(Gl.get(f.bead_id)||"")?.worker_serial===!0,m.auto_merge===!0,{merge_sha:f.merge_sha,cleanup_cursor:f.cleanup_cursor,repo_operations:Array.isArray(m.repo_operations)?m.repo_operations:[]},ti(f.bead_id))).map(f=>({...f,workflow:y[f.id]||null,priority:Ze.get(f.id),...Ve(f.id)}));return{queue:m,idToTitle:ne,candidates:Ga,candidate_hidden:{blocked:Ha.hidden_blocked,spec:Ha.hidden_spec},running:Dr,live_count:oc,slots:ic,over_cap:S_,failure:Zl,waiting:Ja,serial_lanes:fo,serial_lane_count:gc,running_overlays:vc,pr_wait:I_,merge_queue_length:Xa.length,merge_queue_running:Xa.length>0,auto_excluded:_t.map(f=>f.bead_id).filter(f=>sc(f)!==null),declared_base:io,done:us,token_total:R_,cleanup_failures:jl,repo_operations:Array.isArray(m.repo_operations)?m.repo_operations:[]}}function Xe(){let k=!!o?.get()?.job,G=!k&&o?.isPending?.()===!0,de=k?"\uBD84\uC11D \uC911":G?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${de?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${de?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${de?c`<span class="worker-analysis-btn__badge">${de}</span>`:""}
    </button>`}function pt(m){let k=m.waiting.length>0?m.waiting[0].id:"\u2014",G=c`<button
      type="button"
      class="worker-play${m.queue.auto_advance?" is-active":""}"
    >
      ${m.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,de=Ft(m),Te=m.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",bt=m.queue.auto_advance?0:(Array.isArray(m.queue.queue)?m.queue.queue:[]).filter(g=>g&&typeof g.armed_by_lane=="string"&&g.armed_by_lane.length>0).length,it=bt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${bt}건 진행 중</span
          >`:"",Qt=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${m.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${m.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${re()} 완료 <b>${m.done.length}</b></span
      >`,rn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${m.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${m.declared_base||"?"}</span
    >`,an=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${za}
          step="1"
          .value=${String(m.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Kf},(g,v)=>v+1).map(g=>c`<option
                value=${String(g)}
                ?selected=${m.serial_lane_count===g}
              >
                ${g}
              </option>`)}
        </select>
      </label>
      ${o?Xe():""} `,wn=Wp({failure:m.failure}),p=dd(m.repo_operations,m.cleanup_failures);return $e?c`<div class="worker-ribbon">
          ${G} ${de}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Te}${it}${Qt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${an}</div>
          <div class="worker-kpi">${rn}</div>
        </div>
        ${p}${vt.template()}${wn}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${G}${de}${an}</div>
        <div class="worker-kpi">
          ${Te}${it}${Qt}${rn}
          ${(Array.isArray(m.token_total)?m.token_total:m.token_total?[{label:m.token_total,tooltip:`${re()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(g=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${g.tooltip}
                >${re()} 완료 · 누적 ${g.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${k}</b></span
          >
        </div>
      </div>
      ${p}${vt.template()}${wn}`}function At(m){let k=m.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${ie.show_blocked}
        />
        🔒 blocked${k.blocked>0?` ${k.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Dv.map(G=>c`<button
              type="button"
              class="worker-filter__chip${ie.spec===G.value?" is-active":""}"
              data-spec=${G.value}
              aria-pressed=${ie.spec===G.value?"true":"false"}
            >
              ${G.label}
            </button>`)}
        ${k.spec>0?c`<span class="worker-filter__hidden">숨김 ${k.spec}</span>`:""}
      </div>
    </div>`}function Mt(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${z}
    >
      ${e_.map(m=>c`<option value=${m.value} ?selected=${z===m.value}>
            ${m.label}
          </option>`)}
    </select>`}function Zt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${L}
      >
        ${Br.map(m=>c`<option value=${m.value} ?selected=${L===m.value}>
              ${m.label}
            </option>`)}
      </select>
    </div>`}function Ft(m){let k=m.queue.auto_merge===!0;if(m.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${k?" is-active":""}"
        title=${k?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${k?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${m.merge_queue_length}
      </button>`;if(k)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let G=new Set(m.auto_excluded),de=m.pr_wait.filter(Te=>Te.merge_action&&Te.merge_enabled&&!G.has(Te.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${de>0?` ${de}`:""}
    </button>`}function cn(m){return fa({parallel:{rows:m.waiting.map(k=>Un(k)),count:m.waiting.length,collapsed:ge.isAreaCollapsed("parallel")},serial:{lanes:m.serial_lanes.map(k=>({id:k.id,title:`\uC9C1\uB82C ${k.index}`,rows:k.rows.map(G=>Un(G)),count:k.rows.length,empty:k.rows.length===0,badge:k.badge,held:k.occupied,cycle:k.cycle})),collapsed:ge.isAreaCollapsed("serial")}})}function It(m){return zp(m.running,Date.now(),ae,m.running_overlays)}function hn(m){return m.running.some(k=>k.kind!=="session"&&!k.paused&&k.failed!==!0)}function yn(m){let k=Jn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:m.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Mt(),controls:At(m),collapsible:!0,collapsed:ge.isCollapsed("candidate"),place_menu:dt(m.candidates),onOpenDoc:_?(de,Te)=>_(Te):void 0}),G=Jn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:m.done,empty:`${re()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Zt(),collapsible:!0,collapsed:ge.isCollapsed("done"),preview:$e?Array.isArray(m.token_total)?m.token_total.map(de=>de.label).join(" \xB7 "):m.token_total||Zf(m.done):void 0});return $e?c`<div class="worker-lanes worker-lanes--mobile">
        ${_a({live:hn(m),running_body:m.running.length>0?It(m):"",pr_wait_rows:m.pr_wait.map(de=>Un(de)),count:m.running.length+m.pr_wait.length})}
        ${Jn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:m.waiting,count:m.waiting.length,collapsible:!0,collapsed:ge.isCollapsed("queue"),preview:Zf(m.waiting),body:cn(m)})}
        ${k} ${G}
      </div>`:c`<div class="worker-lanes">
      ${k}
      ${Jn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:m.waiting,count:m.waiting.length,collapsible:!0,collapsed:ge.isCollapsed("queue"),body:cn(m)})}
      ${Jn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:m.running,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${m.slots}</span
        >`,live:hn(m),collapsible:!0,collapsed:ge.isCollapsed("running"),body:It(m)})}
      ${Jn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:m.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:ge.isCollapsed("pr_wait")})}
      ${G}
    </div>`}function Xt(m){ge.toggle(m),nt()}function sn(m){ge.toggleArea(m),nt()}function nt(){let m=_e();lt(pt(m),Le),lt(yn(m),M)}function Be(){let m=!0,k=qa(G=>{if($e=G,m){m=!1;return}nt()});te.push(k)}let $=null;function fe(m){$=m.target instanceof Element?m.target:null}function Fe(m){let G=m.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!G)return;if($&&G.contains($)&&$.closest("input, button, a")){m.preventDefault();return}let de=G.dataset.beadId||"",Te=G.dataset.lane||"";W={bead_id:de,from_lane:Te},pe.classList.add("is-dragging");try{m.dataTransfer?.setData("text/plain",de),m.dataTransfer&&(m.dataTransfer.effectAllowed="move")}catch{}}function kt(m){let k=m.target?.closest?.(".worker-pane");if(!k)return;let G=k.dataset.lane||"";G!=="candidate"&&G!=="queue"&&!/^s[1-5]$/.test(G)||(m.preventDefault(),m.dataTransfer&&(m.dataTransfer.dropEffect="move"),k.classList.add("worker-pane--drag-over"))}function jt(m){m.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ot(){pe.classList.remove("is-dragging")}function en(m,k){let G=K.find(it=>it.id===m);if(!G)return;let de=K.filter(it=>it.id!==m),Te=de.length;if(k){let it=k.dataset.beadId;if(it===m)return;let Qt=de.findIndex(rn=>rn.id===it);Qt>=0&&(Te=Qt)}let bt=de.slice();bt.splice(Te,0,G),F.applyReorder(m,bt,Te)}function on(m){let k=m.target?.closest?.(".worker-pane");if(!k)return;m.preventDefault(),k.classList.remove("worker-pane--drag-over"),pe.classList.remove("is-dragging");let G=k.dataset.lane||"",de=W?.bead_id||m.dataTransfer?.getData("text/plain")||"",Te=W?.from_lane||"";if(W=null,!de)return;let bt=m.target?.closest?.(".worker-mini, .worker-card"),it=G==="queue"&&k.querySelector(".worker-wait__area--parallel > .worker-wait__area-body")||k,Qt=Array.from(it.querySelectorAll(".worker-mini, .worker-card")),rn=Qt.length;if(bt){let an=Qt.indexOf(bt);an>=0&&(rn=an)}if(rn=Math.max(0,rn-it.querySelectorAll(".worker-mini--ghost").length),k.classList.contains("worker-pane--collapsed")&&(rn=Qe()),G==="candidate"){if(Te==="candidate"){en(de,bt);return}(Te==="queue"||/^s[1-5]$/.test(Te))&&gt(de);return}if(G==="queue"||/^s[1-5]$/.test(G)){let an=G==="queue"?"parallel":G;Te===G?mt(de,an,rn):ct(de,an)}}function un(m){ie=m,Mv(m),nt()}function vn(m){z=t_(m),qv(z),nt()}function Ht(m){L=Zn(m),jv(L),b?.(L),nt()}function dn(m){let k=m.target?.closest?.(".worker-serial-lane-count");if(k){let Qt=Number.parseInt(k.value,10);Number.isFinite(Qt)&&oe(Qt).then(nt);return}let G=m.target?.closest?.(".worker-filter__blocked");if(G){un({...ie,show_blocked:G.checked});return}let de=m.target?.closest?.(".worker-done-range");if(de){Ht(de.value);return}let Te=m.target?.closest?.(".worker-sort");if(Te){vn(Te.value||Pl);return}let bt=m.target?.closest?.(".worker-slots__input");if(!bt)return;let it=Number.parseInt(bt.value,10);if(!Number.isFinite(it)){nt();return}me(it).then(nt)}function gn(m){return m?{runner:m.runner||void 0,model:m.model||void 0,effort:m.effort||void 0,worktree:m.worktree||void 0,status:m.status||void 0,session_id:m.session_id||void 0}:{}}function bn(){let m=_e();return{operations:m.repo_operations,cleanup_failures:m.cleanup_failures,repo:u&&u()||""}}function Vn(){ae&&qe.close(),ht.hidden=!1,et.hidden=!1,Ye.open(bn()),nt()}function Yn(m){let k=X(),G=k.attempts?k.attempts[m]:null;ae=m,Ie=null,Ye.close(),ht.hidden=!0,et.hidden=!1,qe.open({attempt_id:m,meta:gn(G)}),nt()}function S(m){let k=X(),G=(Array.isArray(k.session_active)?k.session_active:[]).find(Te=>Te&&Te.bead_id===m),de=(G&&Array.isArray(G.session_refs)?G.session_refs:[]).find(Te=>Te&&Te.current===!0);de&&(Ye.close(),ht.hidden=!0,et.hidden=!1,qe.open(Zr(de,m,"in_progress")),nt())}function R(m,k){ae=null,Ie=m,Ye.close(),ht.hidden=!0,et.hidden=!1,qe.open({attempt_id:m,meta:k,hide_prompt:!0}),nt()}function Oe(){if(Ye.isOpen()&&Ye.refresh(bn()),Ie){let G=(o?.get()?.runs||[]).find(de=>de.run_id===Ie);G?qe.updateMeta(Ll(G)):qe.close();return}if(!ae)return;let m=X(),k=m.attempts?m.attempts[ae]:null;if(k){qe.updateMeta(gn(k));return}qe.close()}function je(m,k){if(m.length===0||!l)return;let G=u?u():void 0;if(k.length===0||!G||k===G||!d){l(m);return}Promise.resolve(d(k)).then(()=>{l(m)}).catch(()=>{ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function ut(m){let k=m.target;if(k?.closest?.(".worker-mini__serial, .worker-mini__grip")||k?.closest?.("#worker-parallel-analysis-dialog"))return;let G=k?.closest?.(".worker-dep__open");if(G){je(G.getAttribute("data-dep-id")||"",G.getAttribute("data-root-dir")||"");return}let de=k?.closest?.(".mon-overlap__chip");if(de){let Ee=de.closest("[data-bead-id]"),Tt=Ee&&Ee.getAttribute("data-bead-id")||"";if(Tt){let pn=de.getAttribute("data-overlap-id")||"";j=!!j&&j.bead_id===Tt&&j.counterpart_id===pn?null:{bead_id:Tt,counterpart_id:pn},nt()}return}let Te=k?.closest?.(".mon-overlap__place");if(Te){let Ee=Te.closest("[data-bead-id]"),Tt=Ee&&Ee.getAttribute("data-bead-id")||"";Tt&&xe(Tt,Te.getAttribute("data-counterpart-id")||"");return}if(k?.closest?.(".mon-overlap__popover"))return;if(k?.closest?.(".worker-analysis-btn")){se?.open();return}if(k?.closest?.(".worker-repo-strip")||k?.closest?.(".worker-mini__timeline")){Vn();return}let bt=k?.closest?.(".worker-repo-op__session");if(bt){let Ee=bt.dataset.attemptId;Ee&&Yn(Ee);return}let it=k?.closest?.(".worker-repo-op__resolve");if(it){C(it.dataset.operationId||"");return}let Qt=k?.closest?.(".worker-repo-op__dismiss");if(Qt){Q(Qt.dataset.operationId||"");return}let rn=k?.closest?.(".worker-cleanup__resume");if(rn){let Ee=rn.dataset.beadId;Ee&&at(Ee);return}let an=k?.closest?.(".worker-banner__resume");if(an){let Ee=an.dataset.attemptId;Ee&&qt(Ee);return}let wn=k?.closest?.(".worker-banner__discard");if(wn){let Ee=wn.dataset.confirmation==="merged"?"merged":"unmerged";O(wn.dataset.beadId||"",wn.dataset.attemptId||null,Ee,wn.dataset.operationId||null);return}let p=k?.closest?.(".worker-banner__dismiss");if(p){let Ee=p.dataset.attemptId;Ee&&Kt(Ee);return}if(k?.closest?.(".worker-play")){A(!X().auto_advance);return}let g=k?.closest?.(".worker-merge-all");if(g){g.classList.contains("worker-merge-all--stop")?X().auto_merge===!0?P(!1):ye():P(!0);return}let v=k?.closest?.(".worker-pane__toggle[data-lane]");if(v){let Ee=v.dataset.lane;(Ee==="candidate"||Ee==="queue"||Ee==="running"||Ee==="pr_wait"||Ee==="done")&&Xt(Ee);return}let x=k?.closest?.(".worker-wait__area-toggle[data-area]");if(x){let Ee=x.dataset.area;(Ee==="parallel"||Ee==="serial")&&sn(Ee);return}let B=k?.closest?.(".worker-card__place-lane");if(B){let Ee=B.dataset.beadId,Tt=B.dataset.lane;Ee&&(Tt==="parallel"||/^s[1-5]$/.test(Tt||""))&&(Y=null,nt(),ct(Ee,Tt));return}if(k?.closest?.(".worker-card__place-cancel")){Y=null,nt();return}let ne=k?.closest?.(".worker-card__place");if(ne){let Ee=ne.dataset.beadId;Ee&&!ne.disabled&&(Ue()?(Y=Ee,nt()):ct(Ee,"parallel"));return}let Me=k?.closest?.(".worker-filter__chip");if(Me){let Ee=Me.dataset.spec;(Ee==="all"||Ee==="with"||Ee==="without")&&un({...ie,spec:Ee});return}let Ze=k?.closest?.(".worker-mini__merge");if(Ze){let Ee=Ze.dataset.beadId||"";X().cleanup_failed?.[Ee]?at(Ee):Rt(Ee);return}let ft=k?.closest?.(".worker-mini__merge-cancel");if(ft){ee(ft.dataset.beadId||"");return}let Ke=k?.closest?.(".worker-mini__discard");if(Ke){O(Ke.dataset.beadId||"",Ke.dataset.attemptId||null,Ke.dataset.discardMode==="merged"?"merged":"unmerged",Ke.dataset.operationId||null);return}let y=k?.closest?.(".worker-mini__stale-continue");if(y){H("worker-stale-work-continue",y.dataset.beadId||"",y.dataset.actionId||"");return}let V=k?.closest?.(".worker-mini__stale-backup");if(V){H("worker-stale-work-backup-fresh",V.dataset.beadId||"",V.dataset.actionId||"");return}let N=k?.closest?.(".worker-mini__stale-recheck");if(N){H("worker-stale-work-recheck",N.dataset.beadId||"",N.dataset.actionId||"");return}let Ae=k?.closest?.(".worker-mini__revise-fix");if(Ae){Ce("worker-revise-fix",Ae.dataset.beadId||"");return}let st=k?.closest?.(".worker-mini__revise-approve");if(st){Ce("worker-revise-approve",st.dataset.beadId||"");return}if(k?.closest?.(".worker-mini__pr"))return;if(k?.closest?.(".rtile__discard")){let Ee=k?.closest?.(".rtile"),Tt=Ee?.dataset?.beadId,pn=Ee?.dataset?.attemptId;Tt&&O(Tt,pn||null,"unmerged",k?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(k?.closest?.(".rtile__dismiss")){let Tt=k?.closest?.(".rtile")?.dataset?.attemptId;Tt&&Kt(Tt);return}if(k?.closest?.(".rtile__pause")){let Tt=k?.closest?.(".rtile")?.dataset?.attemptId;Tt&&zt(Tt);return}if(k?.closest?.(".rtile__resume")){let Tt=k?.closest?.(".rtile")?.dataset?.attemptId;Tt&&qt(Tt);return}if(k?.closest?.(".rtile__session")){let Ee=k?.closest?.(".rtile"),Tt=Ee?.dataset?.attemptId;if(Tt){Yn(Tt);return}let pn=Ee?.dataset?.beadId;pn&&S(pn);return}if(k?.closest?.(".worker-drawer-overlay__backdrop")){Ye.close(),qe.close();return}if(k?.closest?.(".worker-drawer-host"))return;let ot=k?.closest?.(".rtile .board-card__roll-toggle");if(ot){let Ee=ot.dataset.rollParent;Ee&&(he.has(Ee)?he.delete(Ee):he.add(Ee),nt());return}let wt=k?.closest?.(".rtile .board-card__roll-child");if(wt){let Ee=wt.dataset.childId;Ee&&l&&l(Ee);return}let Ve=k?.closest?.(".rtile");if(Ve){if(k?.closest?.(".rtile__id")){let Tt=Ve.dataset.beadId;Tt&&On(Tt).then(pn=>{pn?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ee=Ve.dataset.beadId;Ee&&l&&l(Ee);return}let _t=k?.closest?.(".worker-mini, .worker-card");if(_t){let Ee=_t.dataset.beadId;if(k?.closest?.(".worker-mini__id, .worker-card__id")){Ee&&On(Ee).then(pn=>{pn?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Tt=k?.closest?.(".ctl-chip--from");if(Tt){let pn=Tt.dataset.fromId;pn&&l&&l(pn);return}Ee&&l&&l(Ee)}}e.addEventListener("pointerdown",fe),e.addEventListener("dragstart",Fe),e.addEventListener("dragover",kt),e.addEventListener("dragleave",jt),e.addEventListener("dragend",Ot),e.addEventListener("drop",on),e.addEventListener("click",ut),e.addEventListener("change",dn);function St(m){if(!j)return;let k=m.target;k&&typeof k.closest=="function"&&k.closest(".mon-overlap__popover, .mon-overlap__chip")||(j=null,nt())}function tn(m){m.key!=="Escape"||!j||(j=null,nt())}return document.addEventListener("click",St),document.addEventListener("keydown",tn),te.push(()=>{document.removeEventListener("click",St),document.removeEventListener("keydown",tn)}),Be(),w&&te.push(w.subscribe(()=>{for(let[m,k]of I)k==="failed"&&I.delete(m);nt()})),s&&te.push(s.subscribe(()=>{let m=u&&u()||"";m!==yt&&(yt=m,rt.close()),nt(),Oe()})),o&&typeof o.subscribe=="function"&&te.push(o.subscribe(()=>{Oe(),nt()})),nt(),{load(){ke(),nt()},refreshSessionDefaults:Ne,destroy(){for(let m of te.splice(0))try{m()}catch{}e.removeEventListener("pointerdown",fe),e.removeEventListener("dragstart",Fe),e.removeEventListener("dragover",kt),e.removeEventListener("dragleave",jt),e.removeEventListener("dragend",Ot),e.removeEventListener("drop",on),e.removeEventListener("click",ut),e.removeEventListener("change",dn);try{qe.destroy()}catch{}et.hidden=!0;try{se?.destroy()}catch{}try{rt.destroy()}catch{}lt(c``,e)}}}function Nl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function r_(e,t,n,r=async()=>{},s=async()=>{}){let o=Gt("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function d(z){let I=z.target.value,ge=t.getState().workspace?.current?.path||"";if(I&&I!==ge){o("switching workspace to %s",I),i=!0,q();try{await n(I)}catch($e){o("workspace switch failed: %o",$e)}finally{i=!1,q()}}}async function _(){let z=t.getState(),L=z.workspace?.current?.path||z.workspace?.available?.[0]?.path||"";if(!(!L||l)){o("git-pulling workspace %s",L),l=!0,q();try{await r(L)}catch(I){o("workspace git pull failed: %o",I)}finally{l=!1,q()}}}function h(z){let L=z.target;L&&e.contains(L)||F()}function b(z){z.key==="Escape"&&F()}function w(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",b),q())}function F(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),q())}function W(){u?F():w()}async function K(z){let L=z.target,I=L.value,re=L.checked;o("toggling visibility %s \u2192 %s",I,String(re));try{await s(I,re)}catch(ge){o("workspace visibility toggle failed: %o",ge)}}function ie(z){return z?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function Y(z,L){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${W}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${z.map(I=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${I.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${I.path}"
                        .checked=${!L.has(I.path)}
                        @change=${K}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Nl(I.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function j(){let z=t.getState(),L=z.workspace?.current,I=z.workspace?.available||[],re=new Set(z.workspace?.hidden||[]),ge=L?.path||I[0]?.path||"";if(I.length===0)return c``;let $e=I.filter(ce=>!re.has(ce.path)||ce.path===ge);if($e.length<=1){let ce=$e[0]||I[0],be=Nl(ce.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ce.path}"
            >${be}</span
          >
          ${Y(I,re)}
          ${ie(ge)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${$e.map(ce=>c`
              <option
                value="${ce.path}"
                ?selected=${ce.path===ge}
                title="${ce.path}"
              >
                ${Nl(ce.path)}
              </option>
            `)}
        </select>
        ${Y(I,re)}
        ${ie(ge)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function q(){lt(j(),e)}return q(),a=t.subscribe(()=>q()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),lt(c``,e)}}}var s_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function ql(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function o_(e,t,n=ql()){return{id:n,type:e,payload:t}}function a_(e={}){let t=Gt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,d=[],_=new Map,h=new Set;function b(j){for(let q of Array.from(h))try{q(j)}catch{}}function w(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let j=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),q=(n.jitterRatio||0)*j,z=Math.max(0,Math.round(j+(Math.random()*2-1)*q));t("ws retry in %d ms (attempt %d)",z,a+1),i=setTimeout(()=>{i=null,Y()},z)}function F(j){try{s?.send(JSON.stringify(j))}catch(q){t("ws send failed",q)}}function W(){for(o="open",t("ws open"),b(o),a=0;d.length;){let j=d.shift();j&&F(j)}}function K(j){let q;try{q=JSON.parse(String(j.data))}catch{t("ws received non-JSON message");return}if(!q||typeof q.id!="string"||typeof q.type!="string"){t("ws received invalid envelope");return}if(u.has(q.id)){let L=u.get(q.id);u.delete(q.id),q.ok?L?.resolve(q.payload):L?.reject(q.error||new Error("ws error"));return}let z=_.get(q.type);if(z&&z.size>0)for(let L of Array.from(z))try{L(q.payload)}catch(I){t("ws event handler error",I)}else t("ws received unhandled message type: %s",q.type)}function ie(){o="closed",t("ws closed"),b(o);for(let[j,q]of u.entries())q.reject(new Error("ws disconnected")),u.delete(j);a+=1,w()}function Y(){if(!l)return;let j=r();try{s=new WebSocket(j),t("ws connecting %s",j),o="connecting",b(o),s.addEventListener("open",W),s.addEventListener("message",K),s.addEventListener("error",()=>{}),s.addEventListener("close",ie)}catch(q){t("ws connect failed %o",q),w()}}return Y(),{send(j,q){if(!s_.includes(j))return Promise.reject(new Error(`unknown message type: ${j}`));let z=ql(),L=o_(j,q,z);return t("send %s id=%s",j,z),new Promise((I,re)=>{u.set(z,{resolve:I,reject:re,type:j}),s&&s.readyState===s.OPEN?F(L):(t("queue %s id=%s (state=%s)",j,z,o),d.push(L))})},on(j,q){_.has(j)||_.set(j,new Set);let z=_.get(j);return z?.add(q),()=>{z?.delete(q)}},onConnection(j){return h.add(j),()=>{h.delete(j)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,Y()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function sw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function ow(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Fl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],i_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],hr="tab:worker:closed",aw="bdui.worker.done-range",l_=uf,c_="worker:queue",u_="worker:parallel-analysis",d_="ui:order",p_="ui:display-policy",f_="exec:presets",yr="tab:board:closed",__="beads-ui.board.closed-range";function iw(e){let t=Gt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;lt(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&Rf(a),i&&l&&u&&d){let Se=function(S,R){let Oe="Request failed",je="";if(S&&typeof S=="object"){let St=S;if(typeof St.message=="string"&&St.message.length>0&&(Oe=St.message),typeof St.details=="string")je=St.details;else if(St.details&&typeof St.details=="object")try{je=JSON.stringify(St.details,null,2)}catch{je=""}}else typeof S=="string"&&S.length>0&&(Oe=S);let ut=R&&R.length>0?`Failed to load ${R}`:"Request failed";te.open(ut,Oe,je)},dt=function(S){return`${$.getState().workspace.current?.path||""}\0${S}`},ze=function(){qe&&(qe().catch(()=>{}),qe=null),Ye=null,rt=null},Qe=function(S){yt=S;let R=()=>{yt!==S||$.getState().selected_id!==S||(yt=null,ve(S))};if(!X){se.then(R);return}R()},zt=function(S,R,Oe,je,ut){return Oe!==gt[R]?(ut().catch(()=>{}),!1):(S.set(je,ut),!0)},Kt=function(){let S=$.getState();P(S.view==="board"),A(S.view==="worker"),E(Pe(S)),Q(S.view==="board"||S.view==="worker"||qt||!!S.selected_id)},at=function(){let S=Ar(Ct);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},We=function(){let S=Ar(Rt);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},P=function(S){if(S)for(let[R,Oe]of Fl){if(ct.has(R)||mt.has(R))continue;let je=R===yr?at():{type:Oe};try{Le.register(R,je)}catch(tn){t("register %s store failed: %o",R,tn)}mt.add(R);let ut=gt.board,St=!1;pe.subscribeList(R,je).then(tn=>{St=!zt(ct,"board",ut,R,tn)}).catch(tn=>{t("subscribe %s failed: %o",R,tn),Se(tn,"board")}).finally(()=>{mt.delete(R),St&&Kt()})}else O()},O=function(){gt.board+=1;for(let[S]of Fl){let R=ct.get(S);R&&(R().catch(()=>{}),ct.delete(S));try{Le.unregister(S)}catch(Oe){t("unregister %s failed: %o",S,Oe)}}},A=function(S){if(!S){C();return}for(let[R,Oe]of i_){if(H.has(R)||mt.has(R))continue;let je=R===hr?We():{type:Oe};try{Le.register(R,je)}catch(tn){t("register %s store failed: %o",R,tn)}mt.add(R);let ut=gt.worker,St=!1;pe.subscribeList(R,je).then(tn=>{St=!zt(H,"worker",ut,R,tn)}).catch(tn=>{t("subscribe %s failed: %o",R,tn),Se(tn,"worker")}).finally(()=>{mt.delete(R),St&&Kt()})}},C=function(){gt.worker+=1;for(let[S]of i_){let R=H.get(S);R&&(R().catch(()=>{}),H.delete(S));try{Le.unregister(S)}catch(Oe){t("unregister %s failed: %o",S,Oe)}}},Q=function(S){if(!S){me();return}Ce||(Ne("subscribe-worker-queue",{id:c_}).catch(R=>{t("subscribe-worker-queue failed: %o",R)}),Ne("subscribe-worker-parallel-analysis",{id:u_}).catch(R=>{t("subscribe-worker-parallel-analysis failed: %o",R)}),Ce=()=>(Ne("unsubscribe-worker-parallel-analysis",{id:u_}),Ne("unsubscribe-worker-queue",{id:c_})))},me=function(){Ce&&(Ce().catch(()=>{}),Ce=null),Et.clear()},Pe=function(S){return S.view==="monitor"||S.selected_id!=null},E=function(S){if(!S){U();return}oe||(Ne("subscribe-monitor-pipeline",{id:l_}).catch(R=>{t("subscribe-monitor-pipeline failed: %o",R)}),oe=()=>Ne("unsubscribe-monitor-pipeline",{id:l_}))},U=function(){oe&&(oe().catch(()=>{}),oe=null)},tt=function(){xe||(Ne("subscribe-ui-order",{id:d_}).catch(S=>{t("subscribe-ui-order failed: %o",S)}),xe=()=>Ne("unsubscribe-ui-order",{id:d_}))},_e=function(){xe&&(xe().catch(()=>{}),xe=null),ht.clear()},pt=function(){Xe||(Ne("subscribe-display-policy",{id:p_}).catch(S=>{t("subscribe-display-policy failed: %o",S)}),Xe=()=>Ne("unsubscribe-display-policy",{id:p_}))},At=function(){Xe&&(Xe().catch(()=>{}),Xe=null),M.clear()},Zt=function(){Mt||(Ne("subscribe-impl-presets",{id:f_}).catch(S=>{t("subscribe-impl-presets failed: %o",S)}),Mt=()=>Ne("unsubscribe-impl-presets",{id:f_}))},Xt=function(S){if(!S)return"Unknown";let R=S.split("/").filter(Boolean);return R.length>0?R[R.length-1]:"Unknown"},vn=function(S,R){un.open(S.path,{missing_state:S.missing_state,...R?{workspace:R}:{}})};var _=Se,h=dt,b=ze,w=Qe,F=zt,W=Kt,K=at,ie=We,Y=P,j=O,q=A,z=C,L=Q,I=me,re=Pe,ge=E,$e=U,ce=tt,be=_e,we=pt,Ge=At,he=Zt,J=Xt,Re=vn;let De=document.getElementById("header-loading"),T=su(De),te=Mp(e),ke=a_(),Ne=T.wrapSend((S,R)=>ke.send(S,R)),pe=Zc(Ne),Le=Xc(),et=eu(),Et=Jc(),xt=Dc(),ht=Qc(),M=Mc(),ae=Pc(),Ie=Nc();ke.on("impl-presets-snapshot",S=>{let R=S;R&&typeof R.revision=="number"&&Array.isArray(R.presets)&&ae.set({revision:R.revision,presets:R.presets})}),ke.on("monitor-pipeline-snapshot",S=>{let R=S;if(!(!R||!Array.isArray(R.workspaces)))try{xt.set(R.workspaces,R.workspaces_state,R.cross_lanes)}catch{}}),ke.on("ui-order-snapshot",S=>{let R=S;if(R&&typeof R.revision=="number")try{ht.set({revision:R.revision,order:R.order&&typeof R.order=="object"?R.order:{}})}catch{}}),ke.on("display-policy-snapshot",S=>{let R=S;if(R&&R.policy&&typeof R.policy=="object")try{M.set(R.policy)}catch{}}),ke.on("session-log-snapshot",S=>{let R=S;if(R&&typeof R.id=="string")try{Ie.set(R.id,Array.isArray(R.lines)?R.lines:[],typeof R.last_event_at=="number"?R.last_event_at:null)}catch{}}),ke.on("session-log-append",S=>{let R=S;if(R&&typeof R.id=="string")try{Ie.append(R.id,R.event)}catch{}}),ke.on("snapshot",S=>{let R=S,Oe=R&&typeof R.id=="string"?R.id:"",je=Oe?Le.getStore(Oe):null;if(je&&R&&R.type==="snapshot")try{je.applyPush(R)}catch{}}),ke.on("upsert",S=>{let R=S,Oe=R&&typeof R.id=="string"?R.id:"",je=Oe?Le.getStore(Oe):null;if(je&&R&&R.type==="upsert")try{je.applyPush(R)}catch{}}),ke.on("delete",S=>{let R=S,Oe=R&&typeof R.id=="string"?R.id:"",je=Oe?Le.getStore(Oe):null;if(je&&R&&R.type==="delete")try{je.applyPush(R)}catch{}});let qe=null,Ye=null,rt=null,yt=null,vt=()=>{},se=new Promise(S=>{vt=()=>S(void 0)}),X=!1,Ue=!1;async function ve(S){let R=dt(S);if(R===Ye||R===rt)return;rt=R;let Oe=`detail:${S}`,je={type:"issue-detail",params:{id:S}};try{Le.register(Oe,je)}catch(ut){t("register detail store failed: %o",ut)}try{let ut=await pe.subscribeList(Oe,je);if($.getState().selected_id!==S||dt(S)!==R){await ut().catch(()=>{});return}qe&&await qe().catch(()=>{}),qe=ut,Ye=R}catch(ut){t("detail subscribe failed: %o",ut),Se(ut,"issue details")}finally{rt===R&&(rt=null)}}let ct=new Map,mt=new Set,gt={board:0,worker:0},qt=!1,Ct=$o;try{let S=window.localStorage.getItem(__);di(S)&&(Ct=S)}catch{}let Rt="today";try{let S=window.localStorage.getItem(aw);S!==null&&(Rt=Zn(S))}catch{}async function ee(S){if(!di(S)||S===Ct)return;Ct=S;try{window.localStorage.setItem(__,S)}catch{}let R=ct.get(yr);if(!R)return;ct.delete(yr),await R().catch(()=>{});let Oe=at();try{Le.register(yr,Oe)}catch(je){t("register %s store failed: %o",yr,je)}try{let je=await pe.subscribeList(yr,Oe);ct.set(yr,je)}catch(je){t("re-subscribe %s failed: %o",yr,je),Se(je,"board")}}async function ye(S){let R=Zn(S);if(R===Rt)return;Rt=R;let Oe=H.get(hr);if(!Oe)return;H.delete(hr),await Oe().catch(()=>{});let je=We();try{Le.register(hr,je)}catch(ut){t("register %s store failed: %o",hr,ut)}try{let ut=await pe.subscribeList(hr,je);H.set(hr,ut)}catch(ut){t("re-subscribe %s failed: %o",hr,ut),Se(ut,"worker")}}let H=new Map,Ce=null,oe=null,xe=null,Xe=null,Mt=null;async function Ft(){Xe=null,M.clear(),Mt=null,ae.clear(),Ce=null,oe=null,ct.clear(),H.clear(),gt.board+=1,gt.worker+=1,Zt();let S=$.getState().workspace.current?.path;if(S)try{await ke.send("set-workspace",{path:S})}catch(Oe){t("workspace restore after reconnect failed: %o",Oe);return}pt();let R=$.getState();P(R.view==="board"),A(R.view==="worker"),E(Pe(R)),Q(R.view==="board"||R.view==="worker"||!!R.selected_id)}async function cn(){t("clearing all subscriptions for workspace switch"),O(),C(),me(),et.clear(),_e(),tt(),At(),pt(),ze();let S=$.getState();if(S.selected_id)try{Le.unregister(`detail:${S.selected_id}`)}catch{}let R=$.getState();P(R.view==="board"),A(R.view==="worker"),E(Pe(R)),Q(R.view==="board"||R.view==="worker"||!!R.selected_id),R.selected_id&&Qe(R.selected_id)}async function It(S){t("requesting workspace switch to %s",S),Ue=!0;try{let R=await ke.send("set-workspace",{path:S});t("workspace switch result: %o",R),R&&R.workspace&&($.setState({workspace:{current:{path:R.workspace.root_dir,database:R.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",S),R.changed&&(await cn(),ue("Switched to "+Xt(S),"success",2e3)))}catch(R){throw t("workspace switch failed: %o",R),ue("Failed to switch workspace","error",3e3),R}finally{Ue=!1}}async function hn(S){t("requesting workspace git pull for %s",S);try{let R=await ke.send("git-pull-workspace",{});t("workspace git pull result: %o",R);let Oe=R?.status;if(Oe==="up_to_date"){ue("Already up to date","success",2e3);return}if(Oe==="stash_pop_conflict"){ue("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ue("Git pulled "+Xt(S),"success",2e3)}catch(R){t("workspace git pull failed: %o",R);let Oe=R?.code,je=R?.message;if(Oe==="rebase_conflict"){ue("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Oe==="rebase_conflict_abort_failed"){ue("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Oe==="busy"){ue("Git pull skipped: another operation is running","warning",3e3);return}let ut=je?`: ${je}`:"";throw ue(`Git pull failed${ut}`,"error",3e3),R}}async function yn(S,R){t("setting workspace visibility %s \u2192 %s",S,String(R));try{await ke.send("set-workspace-visibility",{path:S,visible:R}),await sn()}catch(Oe){t("workspace visibility update failed: %o",Oe),ue("Failed to update project visibility","error",3e3)}}async function sn(){try{let S=await ke.send("list-workspaces",{});if(t("workspaces loaded: %o",S),S&&Array.isArray(S.workspaces)){let R=S.workspaces.map(St=>({path:St.path,database:St.database,pid:St.pid,version:St.version})),Oe=S.current?{path:S.current.root_dir,database:S.current.db_path}:null,je=Array.isArray(S.hidden)?S.hidden.filter(St=>typeof St=="string"):[];$.setState({workspace:{current:Oe,available:R,hidden:je}});let ut=window.localStorage.getItem("beads-ui.workspace");ut&&(!R.some(tn=>tn.path===ut)||je.includes(ut)?window.localStorage.removeItem("beads-ui.workspace"):Oe&&ut!==Oe.path&&(t("restoring saved workspace preference: %s",ut),await It(ut)))}}catch(S){t("failed to load workspaces: %o",S)}}ke.on("workspace-changed",S=>{t("workspace-changed event: %o",S),S&&S.root_dir&&($.setState({workspace:{current:{path:S.root_dir,database:S.db_path}}}),sn(),cn())});let nt=!1;if(typeof ke.onConnection=="function"){let S=R=>{t("ws state %s",R),R==="reconnecting"||R==="closed"?(nt=!0,ue("Connection lost. Reconnecting\u2026","error",4e3)):R==="open"&&nt&&(nt=!1,ue("Reconnected","success",2200),ow($,(Oe,je)=>{t(`${Oe}: %o`,je)}),Ft())};ke.onConnection(S)}let Be="board";try{let S=window.localStorage.getItem("beads-ui.view");(S==="board"||S==="worker"||S==="monitor")&&(Be=S)}catch(S){t("view parse error: %o",S)}let $=ru({config:sw(),view:Be});ke.on("worker-queue-snapshot",S=>{let R=S;if(!R||!R.queue)return;let Oe=$.getState().workspace.current?.path;if(typeof Oe=="string"&&Oe.length>0&&R.root_dir!==Oe){t("dropping worker-queue snapshot for %s",String(R.root_dir));return}try{et.set(R.queue)}catch{}}),ke.on("worker-parallel-analysis-snapshot",S=>{let R=S;if(!R)return;let Oe=$.getState().workspace.current?.path;if(!(typeof Oe=="string"&&Oe.length>0&&typeof R.root_dir=="string"&&R.root_dir!==Oe))try{Et.set({settings:R.settings,job:R.job??null,runs:Array.isArray(R.runs)?R.runs:[],last_good:R.last_good??null})}catch{}});let fe=tu($);fe.start();let Fe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),kt=async(S,R)=>{try{return await Ne(S,R)}catch(Oe){if(Fe.has(S))throw Oe;return[]}};pf({global_element:r,repo_element:s},$,fe);let jt=document.getElementById("workspace-picker");jt&&r_(jt,$,It,hn,yn);let Ot=gf(e,(S,R)=>Ne(S,R));try{let S=document.getElementById("new-issue-btn");S&&S.addEventListener("click",()=>Ot.open())}catch{}let en=vf(e,{policyStore:M,queueStore:et,implPresetStore:ae,transport:(S,R)=>Ne(S,R),onOpenChange:S=>{let R=qt;qt=S,Kt(),R&&S===!1&&dn.refreshSessionDefaults()},labelOptions:()=>{let S=new Set;for(let[R]of Fl)for(let Oe of Le.snapshotFor(R)||[]){let je=Oe.labels;if(Array.isArray(je))for(let ut of je)typeof ut=="string"&&ut.length>0&&S.add(ut)}return Array.from(S).sort()}});try{let S=document.getElementById("display-settings-btn");S&&(S.setAttribute("aria-label","\uC124\uC815"),S.setAttribute("title","\uC124\uC815"),S.addEventListener("click",()=>en.open()))}catch{}let on=document.createElement("div");on.className="md-viewer-root",document.body.appendChild(on);let un=Da(on,{getWorkspacePath:()=>$.getState().workspace.current?.path}),Ht=yu(i,{gotoIssue:S=>fe.gotoIssue(S),issueStores:Le,transport:kt,workerQueueStore:et,uiOrderStore:ht,displayPolicyStore:M,closedRange:Ct,onClosedRangeChange:S=>{ee(S)},onNewIssue:()=>Ot.open(),openDoc:vn}),dn=Dl(l,{transport:kt,issueStores:Le,queueStore:et,analysisStore:Et,sessionLogStore:Ie,uiOrderStore:ht,gotoIssue:S=>$.setState({selected_id:S}),getWorkspacePath:()=>$.getState().workspace.current?.path,switchWorkspace:S=>It(S),openDoc:vn,doneRange:Rt,onDoneRangeChange:S=>{ye(S)}}),gn=df(u,{transport:kt,pipelineStore:xt,execPresetStore:ae,sessionLogStore:Ie,router:fe,gotoIssue:S=>fe.gotoIssue(S),getWorkspacePath:()=>$.getState().workspace.current?.path,switchWorkspace:S=>It(S),openDoc:vn}),bn=Ip(d,{issueStores:Le,transport:kt,queueStore:et,execPresetStore:ae,sessionLogStore:Ie,getWorkspacePath:()=>$.getState().workspace.current?.path,mdViewer:un,depCandidates:()=>{let S=xt.get();if(S===null)return null;let R=xt.getWorkspacesState(),Oe=$.getState();if(Oe.view==="monitor")return Ki(S,R);let je=Oe.workspace.current?.path;return je?Ki(S,R,{root_dir:je}):null},subscribeCandidates:S=>xt.subscribe(S),onDepChanged:({type:S,a:R,b:Oe})=>{let je=gn;S==="dep-add"&&je&&typeof je.recorrectSharedLane=="function"&&je.recorrectSharedLane(S,R,Oe)},onNavigate:(S,R)=>{let Oe=()=>{$.getState().view==="worker"?$.setState({selected_id:S}):fe.gotoIssue(S)},je=$.getState().workspace.current?.path;if(typeof R!="string"||R.length===0||!je||R===je){Oe();return}Promise.resolve(It(R)).then(Oe).catch(()=>{ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let S=$.getState();$.setState({selected_id:null});try{fe.gotoView(S.view==="worker"||S.view==="monitor"?S.view:"board")}catch{}},onOpenExecPresets:()=>{en.open("execution")}}),Vn=$.getState().selected_id;Vn&&(d.hidden=!1,bn.load(Vn),Qe(Vn)),$.subscribe(S=>{let R=S.selected_id;R?(d.hidden=!1,bn.load(R),Ue||Qe(R)):(bn.clear(),d.hidden=!0,ze())});let Yn=S=>{i.hidden=S.view!=="board",l.hidden=S.view!=="worker",u.hidden=S.view!=="monitor",o&&o.classList.toggle("is-quiet",S.view==="monitor"),P(S.view==="board"),A(S.view==="worker"),E(Pe(S)),Q(S.view==="board"||S.view==="worker"||qt||!!S.selected_id),!S.selected_id&&S.view==="board"&&Ht.load(),S.view==="worker"&&dn.load(),S.view==="monitor"?gn.load():gn.pause(),window.localStorage.setItem("beads-ui.view",S.view)};$.subscribe(Yn),Yn($.getState()),tt(),pt(),Zt(),sn().finally(()=>{X=!0,vt()}),window.addEventListener("keydown",S=>{let R=S.ctrlKey||S.metaKey,Oe=String(S.key||"").toLowerCase(),je=S.target,ut=je&&je.tagName?String(je.tagName).toLowerCase():"",St=ut==="input"||ut==="textarea"||ut==="select"||je&&typeof je.isContentEditable=="boolean"&&je.isContentEditable;R&&Oe==="n"&&(St||(S.preventDefault(),Ot.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&iw(t)});export{iw as bootstrap,sw as readBootstrapConfig,ow as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
