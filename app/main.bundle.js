var kc=Object.create;var ks=Object.defineProperty;var $c=Object.getOwnPropertyDescriptor;var xc=Object.getOwnPropertyNames;var Sc=Object.getPrototypeOf,Ac=Object.prototype.hasOwnProperty;var Tc=(e,t,r)=>t in e?ks(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var $s=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ec=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of xc(t))!Ac.call(e,s)&&s!==r&&ks(e,s,{get:()=>t[s],enumerable:!(n=$c(t,s))||n.enumerable});return e};var Cc=(e,t,r)=>(r=e!=null?kc(Sc(e)):{},Ec(t||!e||!e.__esModule?ks(r,"default",{value:e,enumerable:!0}):r,e));var et=(e,t,r)=>Tc(e,typeof t!="symbol"?t+"":t,r);var ha=$s((s_,ga)=>{var Or=1e3,Dr=Or*60,Mr=Dr*60,$r=Mr*24,Dc=$r*7,Mc=$r*365.25;ga.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Pc(e);if(r==="number"&&isFinite(e))return t.long?Fc(e):Nc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Pc(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Mc;case"weeks":case"week":case"w":return r*Dc;case"days":case"day":case"d":return r*$r;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Mr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Dr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Or;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Nc(e){var t=Math.abs(e);return t>=$r?Math.round(e/$r)+"d":t>=Mr?Math.round(e/Mr)+"h":t>=Dr?Math.round(e/Dr)+"m":t>=Or?Math.round(e/Or)+"s":e+"ms"}function Fc(e){var t=Math.abs(e);return t>=$r?Rn(e,t,$r,"day"):t>=Mr?Rn(e,t,Mr,"hour"):t>=Dr?Rn(e,t,Dr,"minute"):t>=Or?Rn(e,t,Or,"second"):e+" ms"}function Rn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var va=$s((o_,ba)=>{function qc(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=i,r.humanize=ha(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let h=0;h<f.length;h++)_=(_<<5)-_+f.charCodeAt(h),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,h=null,T,$;function E(...U){if(!E.enabled)return;let x=E,Y=Number(new Date),te=Y-(_||Y);x.diff=te,x.prev=_,x.curr=Y,_=Y,U[0]=r.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let R=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(A,j)=>{if(A==="%%")return"%";R++;let D=r.formatters[j];if(typeof D=="function"){let se=U[R];A=D.call(x,se),U.splice(R,1),R--}return A}),r.formatArgs.call(x,U),(x.log||r.log).apply(x,U)}return E.namespace=f,E.useColors=r.useColors(),E.color=r.selectColor(f),E.extend=n,E.destroy=r.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(T!==r.namespaces&&(T=r.namespaces,$=r.enabled(f)),$),set:U=>{h=U}}),typeof r.init=="function"&&r.init(E),E}function n(f,_){let h=r(this.namespace+(typeof _>"u"?":":_)+f);return h.log=this.log,h}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(f,_){let h=0,T=0,$=-1,E=0;for(;h<f.length;)if(T<_.length&&(_[T]===f[h]||_[T]==="*"))_[T]==="*"?($=T,E=h,T++):(h++,T++);else if($!==-1)T=$+1,E++,h=E;else return!1;for(;T<_.length&&_[T]==="*";)T++;return T===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function i(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ba.exports=qc});var ya=$s((St,In)=>{St.formatArgs=Uc;St.save=jc;St.load=zc;St.useColors=Bc;St.storage=Hc();St.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();St.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Bc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Uc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+In.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}St.log=console.debug||console.log||(()=>{});function jc(e){try{e?St.storage.setItem("debug",e):St.storage.removeItem("debug")}catch{}}function zc(){let e;try{e=St.storage.getItem("debug")||St.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Hc(){try{return localStorage}catch{}}In.exports=va()(St);var{formatters:Wc}=In.exports;Wc.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Vr=globalThis,Cn=Vr.trustedTypes,ra=Cn?Cn.createPolicy("lit-html",{createHTML:e=>e}):void 0,la="$lit$",ir=`lit$${Math.random().toFixed(9).slice(2)}$`,ca="?"+ir,Rc=`<${ca}>`,yr=document,Kr=()=>yr.createComment(""),Zr=e=>e===null||typeof e!="object"&&typeof e!="function",Rs=Array.isArray,Ic=e=>Rs(e)||typeof e?.[Symbol.iterator]=="function",xs=`[ 	
\f\r]`,Yr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,na=/-->/g,sa=/>/g,br=RegExp(`>|${xs}(?:([^\\s"'>=/]+)(${xs}*=${xs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),oa=/'/g,aa=/"/g,da=/^(?:script|style|textarea|title)$/i,Is=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=Is(1),Xt=Is(2),Xf=Is(3),wr=Symbol.for("lit-noChange"),ct=Symbol.for("lit-nothing"),ia=new WeakMap,vr=yr.createTreeWalker(yr,129);function ua(e,t){if(!Rs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ra!==void 0?ra.createHTML(t):t}var Lc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Yr;for(let i=0;i<r;i++){let c=e[i],u,f,_=-1,h=0;for(;h<c.length&&(a.lastIndex=h,f=a.exec(c),f!==null);)h=a.lastIndex,a===Yr?f[1]==="!--"?a=na:f[1]!==void 0?a=sa:f[2]!==void 0?(da.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=br):f[3]!==void 0&&(a=br):a===br?f[0]===">"?(a=s??Yr,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?br:f[3]==='"'?aa:oa):a===aa||a===oa?a=br:a===na||a===sa?a=Yr:(a=br,s=void 0);let T=a===br&&e[i+1].startsWith("/>")?" ":"";o+=a===Yr?c+Rc:_>=0?(n.push(u),c.slice(0,_)+la+c.slice(_)+ir+T):c+ir+(_===-2?i:T)}return[ua(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Xr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,f]=Lc(t,r);if(this.el=e.createElement(u,n),vr.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=vr.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(la)){let h=f[a++],T=s.getAttribute(_).split(ir),$=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:$[2],strings:T,ctor:$[1]==="."?As:$[1]==="?"?Ts:$[1]==="@"?Es:Lr}),s.removeAttribute(_)}else _.startsWith(ir)&&(c.push({type:6,index:o}),s.removeAttribute(_));if(da.test(s.tagName)){let _=s.textContent.split(ir),h=_.length-1;if(h>0){s.textContent=Cn?Cn.emptyScript:"";for(let T=0;T<h;T++)s.append(_[T],Kr()),vr.nextNode(),c.push({type:2,index:++o});s.append(_[h],Kr())}}}else if(s.nodeType===8)if(s.data===ca)c.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(ir,_+1))!==-1;)c.push({type:7,index:o}),_+=ir.length-1}o++}}static createElement(t,r){let n=yr.createElement("template");return n.innerHTML=t,n}};function Ir(e,t,r=e,n){if(t===wr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Zr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Ir(e,s._$AS(e,t.values),s,n)),t}var Ss=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??yr).importNode(r,!0);vr.currentNode=s;let o=vr.nextNode(),a=0,i=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Qr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Cs(o,this,t)),this._$AV.push(u),c=n[++i]}a!==c?.index&&(o=vr.nextNode(),a++)}return vr.currentNode=yr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Qr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ct,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Ir(this,t,r),Zr(t)?t===ct||t==null||t===""?(this._$AH!==ct&&this._$AR(),this._$AH=ct):t!==this._$AH&&t!==wr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ic(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ct&&Zr(this._$AH)?this._$AA.nextSibling.data=t:this.T(yr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Xr.createElement(ua(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ss(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=ia.get(t.strings);return r===void 0&&ia.set(t.strings,r=new Xr(t)),r}k(t){Rs(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Kr()),this.O(Kr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Lr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ct,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ct}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Ir(this,t,r,0),a=!Zr(t)||t!==this._$AH&&t!==wr,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Ir(this,i[n+c],r,c),u===wr&&(u=this._$AH[c]),a||(a=!Zr(u)||u!==this._$AH[c]),u===ct?t=ct:t!==ct&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},As=class extends Lr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ct?void 0:t}},Ts=class extends Lr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ct)}},Es=class extends Lr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Ir(this,t,r,0)??ct)===wr)return;let n=this._$AH,s=t===ct&&n!==ct||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ct&&(n===ct||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Cs=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Ir(this,t)}};var Oc=Vr.litHtmlPolyfillSupport;Oc?.(Xr,Qr),(Vr.litHtmlVersions??(Vr.litHtmlVersions=[])).push("3.3.1");var Ue=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Qr(t.insertBefore(Kr(),o),o,void 0,r??{})}return s._$AI(e),s};var At="today",Ht=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Rt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function kr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function pa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function fa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function _a(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ma(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var wa=Cc(ya(),1);function ot(e){return(0,wa.default)(`beads-ui:${e}`)}function Mt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function xr(e,t){let r=Mt(e.created_at),n=Mt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function xa(e,t){let r=Mt(e.created_at),n=Mt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Sa(e,t){let r=Mt(e.updated_at),n=Mt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Aa(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Mt(e.created_at),o=Mt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ta(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Gc=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ka(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function $a(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Gc.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ea(e,t){let r=ka(e),n=ka(t);if(r!==n)return r<n?-1:1;let s=$a(e),o=$a(t);if(s!==o)return s<o?-1:1;let a=Mt(e&&e.created_at),i=Mt(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Ls=2**20;function Pr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Mt(e&&e.created_at)}function Ln(e){return(t,r)=>{let n=Pr(t,e),s=Pr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Os(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Pr(i,r)-Ls};if(!i)return{rank:Pr(a,r)+Ls};let c=Pr(a,r),u=Pr(i,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((_,h)=>({bead_id:_.id,rank:h*Ls}))}}function Ds(e,t={}){let r=ot(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||xr;function u(){for(let h of Array.from(a))try{h()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function _(h){if(i||!h||h.id!==e)return;let T=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,T),!(T<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(T<=o)return;n.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let E of $)E&&typeof E.id=="string"&&E.id.length>0&&n.set(E.id,E);f(),o=T,u();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let E=n.get($.id);if(!E)n.set($.id,$);else{let U=Number.isFinite(E.updated_at)?E.updated_at:0,x=Number.isFinite($.updated_at)?$.updated_at:0;if(U<=x){for(let Y of Object.keys(E))Y in $||delete E[Y];for(let[Y,te]of Object.entries($))E[Y]=te}}f()}o=T,u()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(n.delete($),f()),o=T,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function On(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ca(e){let t=ot("subs"),r=new Map,n=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],_=Array.isArray(c.updated)?c.updated:[],h=Array.isArray(c.removed)?c.removed:[];for(let T of Array.from(u)){let $=r.get(T);if(!$)continue;let E=$.itemsById;for(let U of f)typeof U=="string"&&U.length>0&&E.set(U,!0);for(let U of _)typeof U=="string"&&U.length>0&&E.set(U,!0);for(let U of h)typeof U=="string"&&U.length>0&&E.delete(U)}}async function o(i,c){let u=On(c);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let _=r.get(i);if(_&&_.key!==u){let h=n.get(_.key);h&&(h.delete(i),h.size===0&&n.delete(_.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(_){let h=r.get(i)||null;if(h){let T=n.get(h.key);T&&(T.delete(i),T.size===0&&n.delete(h.key))}throw r.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let _=r.get(i)||null;if(_){let h=n.get(_.key);h&&(h.delete(i),h.size===0&&n.delete(_.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:On,selectors:{getIds(i){let c=r.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=r.get(i);return u?u.itemsById.has(c):!1},count(i){let c=r.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=r.get(i),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function Ra(){let e=ot("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let _=u?On(u):"",h=r.get(c)||"",T=t.has(c);if(e("register %s key=%s (prev=%s)",c,_,h),T&&h&&_&&h!==_){let $=t.get(c);if($)try{$.dispose()}catch{}let E=s.get(c);if(E){try{E()}catch{}s.delete(c)}let U=Ds(c,f);t.set(c,U);let x=U.subscribe(()=>o());s.set(c,x)}else if(!T){let $=Ds(c,f);t.set(c,$);let E=$.subscribe(()=>o());s.set(c,E)}return r.set(c,_),()=>i(c)}function i(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function Ia(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function La(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ms(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Yc(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Vc(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Oa(e){let t=ot("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Yc(n),a=Vc(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ms(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ms(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Kc=Object.freeze({workspace_config:{default_workspace:null}});function Da(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Kc.workspace_config.default_workspace}}}function Ma(e={}){let t=ot("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Da(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Da(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!i&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Pa(e){let t=ot("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(_,h)=>{let T=s++,$=Date.now();n.set(T,{type:_,start_ts:$}),t("request start id=%d type=%s count=%d",T,_,r+1),a();let E=!1,U=()=>{E||(E=!0,n.delete(T),i())},x=setTimeout(()=>{E||(t("request TIMEOUT id=%d type=%s elapsed=%dms",T,_,Date.now()-$),U())},3e4);try{let Y=await u(_,h),te=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",T,_,te),Y}catch(Y){let te=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",T,_,te,Y),Y}finally{clearTimeout(x),U()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:u-_.start_ts}))}}}function ee(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Dn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(Ta),c;switch(i){case"created_desc":return c.sort(xr),c;case"created_asc":return c.sort(xa),c;case"updated_desc":return c.sort(Sa),c;case"priority":return c.sort(Aa),c;case"manual":default:{let u=r();return u?c.sort(Ln(u)):c.sort(xr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Qt(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function pt(e){let t=Qt(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Tt(e,t){let r=Qt(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Mn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Qt(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Pn(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(Os(i,c,u.order),a);s(u,f);let _=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(h);let T=n(Os(i,c,h.order),a);s(h,T);let $=await t("ui-order-set",{expected_revision:h.revision,entries:T});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Nn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ps(e,t){return!t||typeof e!="string"||e.length===0||Nn(t.visible_labels).includes(e)?!0:Nn(t.hidden_labels).includes(e)?!1:!Nn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Fn(e,t){return Nn(e).filter(r=>Ps(r,t))}function lr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Zc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Fa={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Na={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Xc={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Qc(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function qa(e){let t=e&&e.fill||"none";return t==="none"?cr.none:e&&e.stale===!0?cr.stale:t==="dim"?cr.dim:e&&e.glyph==="review"?cr.review:e&&e.glyph==="skip"?cr.skip:cr.done}function Jc(e){if(!e||e.fill==="none"||!e.approval_state)return qa(e);let t=[];return e.glyph==="review"?t.push(cr.review):e.glyph==="skip"&&t.push(cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function ed(e,t,r){let n=Zc[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Xc[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${c}>
        ${Fa[e]||e}
      </div>
    </div>
  `}function qn(e,t){if(!e||!e.stages)return"";let r=Na[e.route]||Na.spec_backed,n=e.stages,s=Qc(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Fa[a]||a} ${a==="plan"?Jc(n[a]||{}):qa(n[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>ed(a,n[a]||{},a===s))}
    </div>
  `}function td(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ba=2;function rd(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ba).join(", "),s=r.length-Ba,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function nd(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&lr(r,"route")){let a=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&lr(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&lr(r,"pr")){let a=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}for(let a of Fn(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&lr(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),lr(r,"blocked")&&s.push(...rd(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&lr(r,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function sd(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function od(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${pt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${pt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function ad(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ea):r.children;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?l`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:l`<span class="board-card__roll-none">children 없음</span>`}
        ${od(e)}
      </div>
      ${n>0&&r.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?l`<div class="board-card__roll-list">
            ${o.map((a,i)=>l`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${c=>t.onChildClick&&t.onChildClick(c,a.id)}
                >
                  <span class=${sd(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Bn(e,t){let r=td(e.priority);return l`
    <article
      class="board-card"
      data-issue-id=${e.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${n=>t.onCardClick(n,e.id)}
      @dragstart=${n=>t.onDragStart(n,e.id)}
      @dragend=${t.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${e.id} \uBCF5\uC0AC`}
          @click=${n=>t.onCopyId(n,e.id)}
        >
          ${e.id}
        </button>
        ${r?l`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${nd(e,t)}
      ${e.workflow&&lr(t.policy||null,"stepper")?qn(e.workflow,e.status):""}
      ${ad(e,t)}
    </article>
  `}function Nr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
    <section class=${n?"board-column board-column--closed":"board-column"} id=${e.id}>
      <header
        class="board-column__header"
        id=${e.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${e.title}</span>
          <span class="board-column__count" aria-label=${`${r}\uAC74`}
            >${r}</span
          >
        </div>
        ${n?l`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Ht.map(o=>l`<option
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
        ${e.items.map(o=>Bn(o,t))}
      </div>
    </section>
  `}function Ua(e,t,r){return l`
    <dialog
      id="deferred-popup"
      class="deferred-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deferred-popup-title"
      @click=${r.onOverlayClick}
      @cancel=${r.onClose}
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
            @click=${r.onClose}
          >
            ×
          </button>
        </header>
        <div
          class="deferred-popup__body"
          role="list"
          aria-labelledby="deferred-popup-title"
        >
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Bn(n,t))}
        </div>
      </div>
    </dialog>
  `}var id=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ld=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],cd=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function dd(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${n>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${r.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${r.label_menu_open?l`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?l`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>l`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?l`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function ja(e,t,r){return l`
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
        ${id.map(n=>l`<option
              value=${n.value}
              ?selected=${e.priority===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${t.onTypeChange}
      >
        ${ld.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${dd(e,t,r)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${r.deferred_popup_open?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-haspopup="dialog"
        aria-expanded=${r.deferred_popup_open?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${r.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${cd.map(n=>l`<option
              value=${n.value}
              ?selected=${r.sort_mode===n.value}
            >
              ${n.label}
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
  `}var ud=200,pd={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},fd=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),za="beads-ui.board.sort",Ha=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function _d(){try{let e=window.localStorage.getItem(za);if(e&&Ha.has(e))return e}catch{}return"created_desc"}function Wa(e,t){let r=ot("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||At,h=s?Dn(s,a):null,T=Pn({transport:o,uiOrderStore:a}),$=[],E=[],U=[],x=[],Y=[],te=[],R=!1,I=0,A=_d(),j=new Map,D=new Map,se=new Map,Ee=new Set,ie={search:"",priority:"",type:"",labels:[]},he=!1,ke=null;function Qe(B){return String(B.status||"open")==="open"}function Je(B){let V=String(B.status||"open");return V==="open"||V==="blocked"}function Le(B){let V=ie.search.trim().toLowerCase(),Z=ie.priority,pe=ie.type,ye=ie.labels;return B.filter(Ce=>{if(V){let We=String(Ce.id||"").toLowerCase(),rt=String(Ce.title||"").toLowerCase();if(!We.includes(V)&&!rt.includes(V))return!1}if(Z!==""&&String(Ce.priority)!==Z||pe!==""&&String(Ce.issue_type||"")!==pe)return!1;if(ye.length>0){let We=Array.isArray(Ce.labels)?Ce.labels:[];if(!ye.some(rt=>We.includes(rt)))return!1}return!0})}function De(){let B=new Set;for(let V of[$,E,U,x,Y,te])for(let Z of V){let pe=Array.isArray(Z.labels)?Z.labels:[];for(let ye of pe)typeof ye=="string"&&ye.length>0&&B.add(ye)}return Array.from(B).sort()}function $e(){return ie.search.trim()!==""||ie.priority!==""||ie.type!==""||ie.labels.length>0}function fe(){try{if(h){let B=h.selectBoardColumn("tab:board:in-progress","in_progress",A),V=h.selectBoardColumn("tab:board:blocked","blocked",A).filter(Je),Z=new Set(B.map(we=>we.id)),pe=h.selectBoardColumn("tab:board:ready","ready",A).filter(we=>Qe(we)&&!Z.has(we.id)),ye=h.selectBoardColumn("tab:board:resolved","resolved",A),Ce=h.selectBoardColumn("tab:board:deferred","deferred",A),We=h.selectBoardColumn("tab:board:closed","closed").slice(0,ud),rt=[...V,...pe,...B,...ye,...We];be(rt);let Ae=new Set;for(let we of rt)we&&we.id&&!Ns(we)&&Ae.add(we.id);let Ge=!$e();$=Ge?Jr(V,Ae):V,E=Ge?Jr(pe,Ae):pe,U=Ge?Jr(B,Ae):B,x=Ge?Jr(ye,Ae):ye,Y=Ce,I=Ce.length,te=Ge?Jr(We,Ae):We,j=new Map;for(let we of $)j.set(we.id,"open");for(let we of E)j.set(we.id,"open");for(let we of U)j.set(we.id,"in_progress");for(let we of x)j.set(we.id,"resolved");for(let we of Y)j.set(we.id,"deferred");for(let we of te)j.set(we.id,"closed");D=new Map;for(let we of $)D.set(we.id,"blocked-col");for(let we of E)D.set(we.id,"ready-col");for(let we of U)D.set(we.id,"in-progress-col");for(let we of x)D.set(we.id,"resolved-col");for(let we of te)D.set(we.id,"closed-col")}Te()}catch{$=[],E=[],U=[],x=[],Y=[],te=[],se=new Map,Te()}}function be(B){let V=new Map;for(let pe of B)pe&&pe.id&&!V.has(pe.id)&&V.set(pe.id,pe);let Z=new Map;for(let pe of V.values()){let ye=Ns(pe);if(!ye)continue;let Ce=Z.get(ye);Ce||(Ce=[],Z.set(ye,Ce)),Ce.push({id:pe.id,title:pe.title,status:pe.status,metadata:pe.metadata,created_at:pe.created_at,updated_at:pe.updated_at})}se=Z}function me(B){let V=se.get(B)||[],Z=0;for(let ye of V)(ye.status==="resolved"||ye.status==="closed")&&(Z+=1);let pe=Mn(V);return{total:V.length,count:Z,current:pe,children:V}}function G(B){return!Ee.has(B)}function K(B,V){B.preventDefault(),B.stopPropagation(),Ee.has(V)?Ee.delete(V):Ee.add(V),Te()}function Ie(B,V){B.preventDefault(),B.stopPropagation(),n(V)}function ce(B,V){B.preventDefault(),B.stopPropagation(),n(V)}function le(B,V){ke||n(V)}function C(B,V){B.preventDefault(),B.stopPropagation(),md(V).then(Z=>{Z&&ee("\uBCF5\uC0AC\uB428","success",1200)})}function q(B,V){ke=V,B.dataTransfer&&(B.dataTransfer.setData("text/plain",V),B.dataTransfer.effectAllowed="move"),B.target.classList.add("board-card--dragging")}function de(B){B.target.classList.remove("board-card--dragging"),$t(),setTimeout(()=>{ke=null},0)}function qe(B){let V=String(B.target.value||"");!V||V===_||(_=V,u&&u(V),Te())}function Re(){return i?i.get():null}function ve(B){let V=c?c.get():null,Z=V?V.cleanup_failed:null;if(!Z||typeof Z!="object"||Array.isArray(Z))return null;let pe=Z[B];return!pe||typeof pe!="object"||Array.isArray(pe)?null:pe}let xe={onCardClick:le,onCopyId:C,onDragStart:q,onDragEnd:de,onClosedRangeChange:qe,rollupFor:me,isExpanded:G,onRollupToggle:K,onChildClick:Ie,onFromChipClick:ce,cleanupFailureFor:ve,get policy(){return Re()}};function Ke(B,V){ke||(W(),n(V))}function Be(B,V){B.preventDefault(),B.stopPropagation(),W(),n(V)}let He={...xe,onCardClick:Ke,onChildClick:Be,onFromChipClick:Be,get policy(){return Re()}};function L(B){let V=B.target,Z=e.querySelector(".board-filter__labels");V&&Z&&Z.contains(V)||v()}function z(B){B.key==="Escape"&&v()}function N(){he||(he=!0,document.addEventListener("mousedown",L),document.addEventListener("keydown",z),Te())}function v(){he&&(he=!1,document.removeEventListener("mousedown",L),document.removeEventListener("keydown",z),Te())}function P(B){B.key==="Escape"&&W()}function M(){R||(R=!0,document.addEventListener("keydown",P),Te())}function W(){R&&(R=!1,document.removeEventListener("keydown",P),Te())}let J={onClose:W,onOverlayClick(B){B.target===B.currentTarget&&W()}},Me={onSearchInput(B){ie.search=String(B.target.value||""),fe()},onPriorityChange(B){ie.priority=String(B.target.value||""),fe()},onTypeChange(B){ie.type=String(B.target.value||""),fe()},onSortChange(B){let V=String(B.target.value||"");if(!(!Ha.has(V)||V===A)){A=V;try{window.localStorage.setItem(za,V)}catch{}fe()}},onDeferredToggle(){R?W():M()},onLabelMenuToggle(){he?v():N()},onLabelToggle(B){let V=ie.labels.indexOf(B);V===-1?ie.labels.push(B):ie.labels.splice(V,1),fe()},onLabelClear(){ie.labels.length!==0&&(ie.labels=[],fe())},onNewIssue(){f&&f()}};function Se(){return l`
      <div class="board-view">
        ${ja(ie,Me,{sort_mode:A,deferred_popup_open:R,deferred_count:I,label_options:De(),label_menu_open:he})}
        <div class="board-root">
          ${Nr({title:"Blocked",id:"blocked-col",items:Le($)},xe)}
          ${Nr({title:"Ready",id:"ready-col",items:Le(E)},xe)}
          ${Nr({title:"In progress",id:"in-progress-col",items:Le(U)},xe)}
          ${Nr({title:"Resolved",id:"resolved-col",items:Le(x)},xe)}
          ${Nr({title:"Closed",id:"closed-col",items:Le(te),is_closed:!0,closed_range:_},xe)}
        </div>
        ${R?Ua({items:Le(Y),count:I},He,J):""}
      </div>
    `}function Te(){Ue(Se(),e),dt()}function dt(){try{let B=e.querySelector("#deferred-popup");B&&!B.open&&(typeof B.showModal=="function"?B.showModal():B.setAttribute("open",""));let V=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Z of V)Array.from(Z.querySelectorAll(".board-card")).forEach((ye,Ce)=>{ye.tabIndex=Ce===0?0:-1})}catch{}}async function at(B,V){if(!o){ee("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:B,status:V}),ee("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Z){r("update-status failed: %o",Z),ee("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function tt(B){switch(B){case"blocked-col":return $;case"ready-col":return E;case"in-progress-col":return U;case"resolved-col":return x;default:return[]}}function _t(B,V,Z){if(!o||!a)return;let pe=tt(B),ye=pe.find(Ge=>Ge.id===V);if(!ye)return;let Ce=pe.filter(Ge=>Ge.id!==V),We=Z.closest?Z.closest(".board-card"):null,rt=Ce.length;if(We){let Ge=We.getAttribute("data-issue-id");if(Ge===V)return;let we=Ce.findIndex(ut=>ut.id===Ge);we>=0&&(rt=we)}let Ae=Ce.slice();Ae.splice(rt,0,ye),T.applyReorder(V,Ae,rt)}function $t(){for(let B of Array.from(e.querySelectorAll(".board-column--drag-over")))B.classList.remove("board-column--drag-over")}let st=null;e.addEventListener("dragover",B=>{B.preventDefault(),B.dataTransfer&&(B.dataTransfer.dropEffect="move");let Z=B.target.closest(".board-column");Z&&Z!==st&&(st&&st.classList.remove("board-column--drag-over"),Z.classList.add("board-column--drag-over"),st=Z)}),e.addEventListener("dragleave",B=>{let V=B.relatedTarget;(!V||!e.contains(V))&&st&&(st.classList.remove("board-column--drag-over"),st=null)}),e.addEventListener("drop",B=>{B.preventDefault(),st&&(st.classList.remove("board-column--drag-over"),st=null);let V=B.target,Z=V.closest(".board-column");if(!Z)return;let pe=B.dataTransfer?.getData("text/plain")||"";if(!pe)return;let ye=Z.id,Ce=D.get(pe);if(Ce&&Ce===ye){if(fd.has(ye)){if(A!=="manual"){ee("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}_t(ye,pe,V)}return}let We=pd[ye];if(!We){ee("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}j.get(pe)!==We&&at(pe,We)}),e.addEventListener("keydown",B=>{let V=B.target;if(!(V instanceof HTMLElement))return;let Z=String(V.tagName||"").toLowerCase();if(Z==="input"||Z==="textarea"||Z==="select"||Z==="button"||Z==="a"||V.isContentEditable===!0)return;let pe=V.closest(".board-card");if(!pe)return;let ye=String(B.key||"");if(ye==="Enter"||ye===" "){B.preventDefault();let Ae=pe.getAttribute("data-issue-id");Ae&&n(Ae);return}if(ye!=="ArrowUp"&&ye!=="ArrowDown"&&ye!=="ArrowLeft"&&ye!=="ArrowRight")return;B.preventDefault();let Ce=pe.closest(".board-column");if(!Ce)return;let We=Array.from(Ce.querySelectorAll(".board-card")),rt=We.indexOf(pe);if(ye==="ArrowDown"&&rt<We.length-1){it(pe,We[rt+1]);return}if(ye==="ArrowUp"&&rt>0){it(pe,We[rt-1]);return}if(ye==="ArrowLeft"||ye==="ArrowRight"){let Ae=Array.from(e.querySelectorAll(".board-column")),Ge=Ae.indexOf(Ce),we=ye==="ArrowRight"?1:-1,ut=Ge+we;for(;ut>=0&&ut<Ae.length;){let bt=Ae[ut].querySelector(".board-card");if(bt){it(pe,bt);return}ut+=we}}});function it(B,V){try{B.tabIndex=-1,V.tabIndex=0,V.focus()}catch{}}let nt=null;h&&h.subscribe&&(nt=h.subscribe(()=>{try{fe()}catch{}}));let lt=null;i&&i.subscribe&&(lt=i.subscribe(()=>{try{fe()}catch{}}));let ht=null;return c&&c.subscribe&&(ht=c.subscribe(()=>{Te()})),{async load(){r("load"),fe()},clear(){v(),W(),nt&&(nt(),nt=null),lt&&(lt(),lt=null),ht&&(ht(),ht=null),e.replaceChildren(),$=[],E=[],U=[],x=[],Y=[],te=[],j=new Map,D=new Map}}}function Ns(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Jr(e,t){return e.filter(r=>{let n=Ns(r);return!(n&&t.has(n))})}async function md(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Sr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Wt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function dr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function gd(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Wt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Wt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function Jt(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await gd(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Za="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var er=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],en=[...er,"reasoning_output_tokens"],hd=["implementation","review-consult"];function Fs(e){let t=0;for(let r of er)t+=ft(e?.[r]);return t}function bd(e){return!e||typeof e!="object"?!1:er.some(t=>Number.isFinite(e[t]))}function Ga(e){return!e||typeof e!="object"?!1:en.some(t=>Number.isFinite(e[t]))}function vd(e){let t={};for(let r of en)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Ya(e){let t={};for(let r of en)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Va(e,t){return e==="codex"?ft(t.input_tokens)+ft(t.output_tokens):Fs(t)}function yd(e){return e==="claude"?"Claude":"Codex"}function wd(e){return`\u03C4 ${Xa(e)}`}function kd(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${ft(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${ft(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Za),o.join(`
`)}function gt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${yd(r)} ${wd(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:kd(r,n)})}return t}function jn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of en)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=ft(i.breakdown[c])+ft(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function qs(e){return!e||typeof e!="object"?null:It({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function $d(e){return e==="codex"?"codex":"claude"}function ur(){return{subtotal:0,breakdown:vd(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Un(e,t,r){e.subtotal+=t.subtotal;for(let n of en)Number.isFinite(t.usage[n])&&(e.breakdown[n]=ft(e.breakdown[n])+ft(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ka(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Xa(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Fr(e){return bd(e)?`\u03C4 ${Xa(Fs(e))}`:null}function Pt(e){let t=Fr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function qr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Fs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Za),r.join(`
`)}function It(e,t){let r={claude:ur(),codex:ur()},n={orchestrator:{claude:ur(),codex:ur()},implementation:{claude:ur(),codex:ur()},"review-consult":{claude:ur(),codex:ur()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Ga(c)){let f=$d(i.runner),_=Ya(c),h={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Va(f,_)};_.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),Un(r[f],h,!0),Un(n.orchestrator[f],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!hd.includes(f.role)||!Ga(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let h=Ya(f.usage),T={provider:"codex",role:f.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:Va("codex",h)};T.receipt_id=_,typeof f.model=="string"&&(T.model=f.model),typeof f.session_id=="string"?T.session_id=f.session_id:typeof f.thread_id=="string"&&(T.session_id=f.thread_id),typeof f.turn_id=="string"&&(T.turn_id=f.turn_id),typeof f.completed_at=="string"&&(T.completed_at=f.completed_at),h.replayed===!0&&(T.replayed=!0),Un(r.codex,T,!1),Un(n[T.role].codex,T,!1)}}let o={};for(let i of["claude","codex"]){let c=r[i];if(c.legs.length===0)continue;let u=Ka(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[i][u];f.legs.length>0&&(c[u]={...Ka(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:ai,setPrototypeOf:Qa,isFrozen:xd,getPrototypeOf:Sd,getOwnPropertyDescriptor:Ad}=Object,{freeze:yt,seal:Lt,create:Gs}=Object,{apply:Ys,construct:Vs}=typeof Reflect<"u"&&Reflect;yt||(yt=function(t){return t});Lt||(Lt=function(t){return t});Ys||(Ys=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Vs||(Vs=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var zn=wt(Array.prototype.forEach),Td=wt(Array.prototype.lastIndexOf),Ja=wt(Array.prototype.pop),tn=wt(Array.prototype.push),Ed=wt(Array.prototype.splice),Wn=wt(String.prototype.toLowerCase),Bs=wt(String.prototype.toString),Us=wt(String.prototype.match),rn=wt(String.prototype.replace),Cd=wt(String.prototype.indexOf),Rd=wt(String.prototype.trim),Nt=wt(Object.prototype.hasOwnProperty),vt=wt(RegExp.prototype.test),nn=Id(TypeError);function wt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Ys(e,t,n)}}function Id(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Vs(e,r)}}function Fe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Wn;Qa&&Qa(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(xd(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Ld(e){for(let t=0;t<e.length;t++)Nt(e,t)||(e[t]=null);return e}function tr(e){let t=Gs(null);for(let[r,n]of ai(e))Nt(e,r)&&(Array.isArray(n)?t[r]=Ld(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=tr(n):t[r]=n);return t}function sn(e,t){for(;e!==null;){let n=Ad(e,t);if(n){if(n.get)return wt(n.get);if(typeof n.value=="function")return wt(n.value)}e=Sd(e)}function r(){return null}return r}var ei=yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),js=yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),zs=yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Od=yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Hs=yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Dd=yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ti=yt(["#text"]),ri=yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ws=yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ni=yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Hn=yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Md=Lt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Pd=Lt(/<%[\w\W]*|[\w\W]*%>/gm),Nd=Lt(/\$\{[\w\W]*/gm),Fd=Lt(/^data-[\-\w.\u00B7-\uFFFF]+$/),qd=Lt(/^aria-[\-\w]+$/),ii=Lt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Bd=Lt(/^(?:\w+script|data):/i),Ud=Lt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),li=Lt(/^html$/i),jd=Lt(/^[a-z][.\w]*(-[.\w]+)+$/i),si=Object.freeze({__proto__:null,ARIA_ATTR:qd,ATTR_WHITESPACE:Ud,CUSTOM_ELEMENT:jd,DATA_ATTR:Fd,DOCTYPE_NAME:li,ERB_EXPR:Pd,IS_ALLOWED_URI:ii,IS_SCRIPT_OR_DATA:Bd,MUSTACHE_EXPR:Md,TMPLIT_EXPR:Nd}),on={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},zd=function(){return typeof window>"u"?null:window},Hd=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},oi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ci(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:zd(),t=X=>ci(X);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==on.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:T}=e,$=c.prototype,E=sn($,"cloneNode"),U=sn($,"remove"),x=sn($,"nextSibling"),Y=sn($,"childNodes"),te=sn($,"parentNode");if(typeof a=="function"){let X=r.createElement("template");X.content&&X.content.ownerDocument&&(r=X.content.ownerDocument)}let R,I="",{implementation:A,createNodeIterator:j,createDocumentFragment:D,getElementsByTagName:se}=r,{importNode:Ee}=n,ie=oi();t.isSupported=typeof ai=="function"&&typeof te=="function"&&A&&A.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:he,ERB_EXPR:ke,TMPLIT_EXPR:Qe,DATA_ATTR:Je,ARIA_ATTR:Le,IS_SCRIPT_OR_DATA:De,ATTR_WHITESPACE:$e,CUSTOM_ELEMENT:fe}=si,{IS_ALLOWED_URI:be}=si,me=null,G=Fe({},[...ei,...js,...zs,...Hs,...ti]),K=null,Ie=Fe({},[...ri,...Ws,...ni,...Hn]),ce=Object.seal(Gs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),le=null,C=null,q=Object.seal(Gs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),de=!0,qe=!0,Re=!1,ve=!0,xe=!1,Ke=!0,Be=!1,He=!1,L=!1,z=!1,N=!1,v=!1,P=!0,M=!1,W="user-content-",J=!0,Me=!1,Se={},Te=null,dt=Fe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),at=null,tt=Fe({},["audio","video","img","source","image","track"]),_t=null,$t=Fe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),st="http://www.w3.org/1998/Math/MathML",it="http://www.w3.org/2000/svg",nt="http://www.w3.org/1999/xhtml",lt=nt,ht=!1,B=null,V=Fe({},[st,it,nt],Bs),Z=Fe({},["mi","mo","mn","ms","mtext"]),pe=Fe({},["annotation-xml"]),ye=Fe({},["title","style","font","a","script"]),Ce=null,We=["application/xhtml+xml","text/html"],rt="text/html",Ae=null,Ge=null,we=r.createElement("form"),ut=function(b){return b instanceof RegExp||b instanceof Function},bt=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ge&&Ge===b)){if((!b||typeof b!="object")&&(b={}),b=tr(b),Ce=We.indexOf(b.PARSER_MEDIA_TYPE)===-1?rt:b.PARSER_MEDIA_TYPE,Ae=Ce==="application/xhtml+xml"?Bs:Wn,me=Nt(b,"ALLOWED_TAGS")?Fe({},b.ALLOWED_TAGS,Ae):G,K=Nt(b,"ALLOWED_ATTR")?Fe({},b.ALLOWED_ATTR,Ae):Ie,B=Nt(b,"ALLOWED_NAMESPACES")?Fe({},b.ALLOWED_NAMESPACES,Bs):V,_t=Nt(b,"ADD_URI_SAFE_ATTR")?Fe(tr($t),b.ADD_URI_SAFE_ATTR,Ae):$t,at=Nt(b,"ADD_DATA_URI_TAGS")?Fe(tr(tt),b.ADD_DATA_URI_TAGS,Ae):tt,Te=Nt(b,"FORBID_CONTENTS")?Fe({},b.FORBID_CONTENTS,Ae):dt,le=Nt(b,"FORBID_TAGS")?Fe({},b.FORBID_TAGS,Ae):tr({}),C=Nt(b,"FORBID_ATTR")?Fe({},b.FORBID_ATTR,Ae):tr({}),Se=Nt(b,"USE_PROFILES")?b.USE_PROFILES:!1,de=b.ALLOW_ARIA_ATTR!==!1,qe=b.ALLOW_DATA_ATTR!==!1,Re=b.ALLOW_UNKNOWN_PROTOCOLS||!1,ve=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,xe=b.SAFE_FOR_TEMPLATES||!1,Ke=b.SAFE_FOR_XML!==!1,Be=b.WHOLE_DOCUMENT||!1,z=b.RETURN_DOM||!1,N=b.RETURN_DOM_FRAGMENT||!1,v=b.RETURN_TRUSTED_TYPE||!1,L=b.FORCE_BODY||!1,P=b.SANITIZE_DOM!==!1,M=b.SANITIZE_NAMED_PROPS||!1,J=b.KEEP_CONTENT!==!1,Me=b.IN_PLACE||!1,be=b.ALLOWED_URI_REGEXP||ii,lt=b.NAMESPACE||nt,Z=b.MATHML_TEXT_INTEGRATION_POINTS||Z,pe=b.HTML_INTEGRATION_POINTS||pe,ce=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&ut(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ce.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&ut(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ce.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ce.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),xe&&(qe=!1),N&&(z=!0),Se&&(me=Fe({},ti),K=[],Se.html===!0&&(Fe(me,ei),Fe(K,ri)),Se.svg===!0&&(Fe(me,js),Fe(K,Ws),Fe(K,Hn)),Se.svgFilters===!0&&(Fe(me,zs),Fe(K,Ws),Fe(K,Hn)),Se.mathMl===!0&&(Fe(me,Hs),Fe(K,ni),Fe(K,Hn))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?q.tagCheck=b.ADD_TAGS:(me===G&&(me=tr(me)),Fe(me,b.ADD_TAGS,Ae))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?q.attributeCheck=b.ADD_ATTR:(K===Ie&&(K=tr(K)),Fe(K,b.ADD_ATTR,Ae))),b.ADD_URI_SAFE_ATTR&&Fe(_t,b.ADD_URI_SAFE_ATTR,Ae),b.FORBID_CONTENTS&&(Te===dt&&(Te=tr(Te)),Fe(Te,b.FORBID_CONTENTS,Ae)),J&&(me["#text"]=!0),Be&&Fe(me,["html","head","body"]),me.table&&(Fe(me,["tbody"]),delete le.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw nn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw nn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');R=b.TRUSTED_TYPES_POLICY,I=R.createHTML("")}else R===void 0&&(R=Hd(T,s)),R!==null&&typeof I=="string"&&(I=R.createHTML(""));yt&&yt(b),Ge=b}},Vt=Fe({},[...js,...zs,...Od]),Bt=Fe({},[...Hs,...Dd]),Ut=function(b){let H=te(b);(!H||!H.tagName)&&(H={namespaceURI:lt,tagName:"template"});let oe=Wn(b.tagName),Oe=Wn(H.tagName);return B[b.namespaceURI]?b.namespaceURI===it?H.namespaceURI===nt?oe==="svg":H.namespaceURI===st?oe==="svg"&&(Oe==="annotation-xml"||Z[Oe]):!!Vt[oe]:b.namespaceURI===st?H.namespaceURI===nt?oe==="math":H.namespaceURI===it?oe==="math"&&pe[Oe]:!!Bt[oe]:b.namespaceURI===nt?H.namespaceURI===it&&!pe[Oe]||H.namespaceURI===st&&!Z[Oe]?!1:!Bt[oe]&&(ye[oe]||!Vt[oe]):!!(Ce==="application/xhtml+xml"&&B[b.namespaceURI]):!1},mt=function(b){tn(t.removed,{element:b});try{te(b).removeChild(b)}catch{U(b)}},xt=function(b,H){try{tn(t.removed,{attribute:H.getAttributeNode(b),from:H})}catch{tn(t.removed,{attribute:null,from:H})}if(H.removeAttribute(b),b==="is")if(z||N)try{mt(H)}catch{}else try{H.setAttribute(b,"")}catch{}},jt=function(b){let H=null,oe=null;if(L)b="<remove></remove>"+b;else{let Ye=Us(b,/^[\r\n\t ]+/);oe=Ye&&Ye[0]}Ce==="application/xhtml+xml"&&lt===nt&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let Oe=R?R.createHTML(b):b;if(lt===nt)try{H=new h().parseFromString(Oe,Ce)}catch{}if(!H||!H.documentElement){H=A.createDocument(lt,"template",null);try{H.documentElement.innerHTML=ht?I:Oe}catch{}}let Ze=H.body||H.documentElement;return b&&oe&&Ze.insertBefore(r.createTextNode(oe),Ze.childNodes[0]||null),lt===nt?se.call(H,Be?"html":"body")[0]:Be?H.documentElement:Ze},Ot=function(b){return j.call(b.ownerDocument||b,b,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},p=function(b){return b instanceof _&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof f)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},w=function(b){return typeof i=="function"&&b instanceof i};function S(X,b,H){zn(X,oe=>{oe.call(t,b,H,Ge)})}let ne=function(b){let H=null;if(S(ie.beforeSanitizeElements,b,null),p(b))return mt(b),!0;let oe=Ae(b.nodeName);if(S(ie.uponSanitizeElement,b,{tagName:oe,allowedTags:me}),Ke&&b.hasChildNodes()&&!w(b.firstElementChild)&&vt(/<[/\w!]/g,b.innerHTML)&&vt(/<[/\w!]/g,b.textContent)||b.nodeType===on.progressingInstruction||Ke&&b.nodeType===on.comment&&vt(/<[/\w]/g,b.data))return mt(b),!0;if(!(q.tagCheck instanceof Function&&q.tagCheck(oe))&&(!me[oe]||le[oe])){if(!le[oe]&&ge(oe)&&(ce.tagNameCheck instanceof RegExp&&vt(ce.tagNameCheck,oe)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(oe)))return!1;if(J&&!Te[oe]){let Oe=te(b)||b.parentNode,Ze=Y(b)||b.childNodes;if(Ze&&Oe){let Ye=Ze.length;for(let m=Ye-1;m>=0;--m){let d=E(Ze[m],!0);d.__removalCount=(b.__removalCount||0)+1,Oe.insertBefore(d,x(b))}}}return mt(b),!0}return b instanceof c&&!Ut(b)||(oe==="noscript"||oe==="noembed"||oe==="noframes")&&vt(/<\/no(script|embed|frames)/i,b.innerHTML)?(mt(b),!0):(xe&&b.nodeType===on.text&&(H=b.textContent,zn([he,ke,Qe],Oe=>{H=rn(H,Oe," ")}),b.textContent!==H&&(tn(t.removed,{element:b.cloneNode()}),b.textContent=H)),S(ie.afterSanitizeElements,b,null),!1)},_e=function(b,H,oe){if(P&&(H==="id"||H==="name")&&(oe in r||oe in we))return!1;if(!(qe&&!C[H]&&vt(Je,H))){if(!(de&&vt(Le,H))){if(!(q.attributeCheck instanceof Function&&q.attributeCheck(H,b))){if(!K[H]||C[H]){if(!(ge(b)&&(ce.tagNameCheck instanceof RegExp&&vt(ce.tagNameCheck,b)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(b))&&(ce.attributeNameCheck instanceof RegExp&&vt(ce.attributeNameCheck,H)||ce.attributeNameCheck instanceof Function&&ce.attributeNameCheck(H,b))||H==="is"&&ce.allowCustomizedBuiltInElements&&(ce.tagNameCheck instanceof RegExp&&vt(ce.tagNameCheck,oe)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(oe))))return!1}else if(!_t[H]){if(!vt(be,rn(oe,$e,""))){if(!((H==="src"||H==="xlink:href"||H==="href")&&b!=="script"&&Cd(oe,"data:")===0&&at[b])){if(!(Re&&!vt(De,rn(oe,$e,"")))){if(oe)return!1}}}}}}}return!0},ge=function(b){return b!=="annotation-xml"&&Us(b,fe)},ue=function(b){S(ie.beforeSanitizeAttributes,b,null);let{attributes:H}=b;if(!H||p(b))return;let oe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:K,forceKeepAttr:void 0},Oe=H.length;for(;Oe--;){let Ze=H[Oe],{name:Ye,namespaceURI:m,value:d}=Ze,k=Ae(Ye),y=d,O=Ye==="value"?y:Rd(y);if(oe.attrName=k,oe.attrValue=O,oe.keepAttr=!0,oe.forceKeepAttr=void 0,S(ie.uponSanitizeAttribute,b,oe),O=oe.attrValue,M&&(k==="id"||k==="name")&&(xt(Ye,b),O=W+O),Ke&&vt(/((--!?|])>)|<\/(style|title|textarea)/i,O)){xt(Ye,b);continue}if(k==="attributename"&&Us(O,"href")){xt(Ye,b);continue}if(oe.forceKeepAttr)continue;if(!oe.keepAttr){xt(Ye,b);continue}if(!ve&&vt(/\/>/i,O)){xt(Ye,b);continue}xe&&zn([he,ke,Qe],Q=>{O=rn(O,Q," ")});let re=Ae(b.nodeName);if(!_e(re,k,O)){xt(Ye,b);continue}if(R&&typeof T=="object"&&typeof T.getAttributeType=="function"&&!m)switch(T.getAttributeType(re,k)){case"TrustedHTML":{O=R.createHTML(O);break}case"TrustedScriptURL":{O=R.createScriptURL(O);break}}if(O!==y)try{m?b.setAttributeNS(m,Ye,O):b.setAttribute(Ye,O),p(b)?mt(b):Ja(t.removed)}catch{xt(Ye,b)}}S(ie.afterSanitizeAttributes,b,null)},je=function X(b){let H=null,oe=Ot(b);for(S(ie.beforeSanitizeShadowDOM,b,null);H=oe.nextNode();)S(ie.uponSanitizeShadowNode,H,null),ne(H),ue(H),H.content instanceof o&&X(H.content);S(ie.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(X){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},H=null,oe=null,Oe=null,Ze=null;if(ht=!X,ht&&(X="<!-->"),typeof X!="string"&&!w(X))if(typeof X.toString=="function"){if(X=X.toString(),typeof X!="string")throw nn("dirty is not a string, aborting")}else throw nn("toString is not a function");if(!t.isSupported)return X;if(He||bt(b),t.removed=[],typeof X=="string"&&(Me=!1),Me){if(X.nodeName){let d=Ae(X.nodeName);if(!me[d]||le[d])throw nn("root node is forbidden and cannot be sanitized in-place")}}else if(X instanceof i)H=jt("<!---->"),oe=H.ownerDocument.importNode(X,!0),oe.nodeType===on.element&&oe.nodeName==="BODY"||oe.nodeName==="HTML"?H=oe:H.appendChild(oe);else{if(!z&&!xe&&!Be&&X.indexOf("<")===-1)return R&&v?R.createHTML(X):X;if(H=jt(X),!H)return z?null:v?I:""}H&&L&&mt(H.firstChild);let Ye=Ot(Me?X:H);for(;Oe=Ye.nextNode();)ne(Oe),ue(Oe),Oe.content instanceof o&&je(Oe.content);if(Me)return X;if(z){if(N)for(Ze=D.call(H.ownerDocument);H.firstChild;)Ze.appendChild(H.firstChild);else Ze=H;return(K.shadowroot||K.shadowrootmode)&&(Ze=Ee.call(n,Ze,!0)),Ze}let m=Be?H.outerHTML:H.innerHTML;return Be&&me["!doctype"]&&H.ownerDocument&&H.ownerDocument.doctype&&H.ownerDocument.doctype.name&&vt(li,H.ownerDocument.doctype.name)&&(m="<!DOCTYPE "+H.ownerDocument.doctype.name+`>
`+m),xe&&zn([he,ke,Qe],d=>{m=rn(m,d," ")}),R&&v?R.createHTML(m):m},t.setConfig=function(){let X=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};bt(X),He=!0},t.clearConfig=function(){Ge=null,He=!1},t.isValidAttribute=function(X,b,H){Ge||bt({});let oe=Ae(X),Oe=Ae(b);return _e(oe,Oe,H)},t.addHook=function(X,b){typeof b=="function"&&tn(ie[X],b)},t.removeHook=function(X,b){if(b!==void 0){let H=Td(ie[X],b);return H===-1?void 0:Ed(ie[X],H,1)[0]}return Ja(ie[X])},t.removeHooks=function(X){ie[X]=[]},t.removeAllHooks=function(){ie=oi()},t}var di=ci();var ui={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},pi=e=>(...t)=>({_$litDirective$:e,values:t}),Gn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var an=class extends Gn{constructor(t){if(super(t),this.it=ct,t.type!==ui.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ct||t==null)return this._t=void 0,this.it=t;if(t===wr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};an.directiveName="unsafeHTML",an.resultType=1;var fi=pi(an);function Qs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Qs();function yi(e){Tr=e}var un={exec:()=>null};function ze(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(kt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Wd=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),kt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Gd=/^(?:[ \t]*(?:\n|$))+/,Yd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Vd=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,pn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Kd=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Js=/(?:[*+-]|\d{1,9}[.)])/,wi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ki=ze(wi).replace(/bull/g,Js).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Zd=ze(wi).replace(/bull/g,Js).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),eo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Xd=/^[^\n]+/,to=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Qd=ze(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",to).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Jd=ze(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Js).getRegex(),Qn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ro=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,eu=ze("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ro).replace("tag",Qn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),$i=ze(eo).replace("hr",pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qn).getRegex(),tu=ze(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",$i).getRegex(),no={blockquote:tu,code:Yd,def:Qd,fences:Vd,heading:Kd,hr:pn,html:eu,lheading:ki,list:Jd,newline:Gd,paragraph:$i,table:un,text:Xd},_i=ze("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qn).getRegex(),ru={...no,lheading:Zd,table:_i,paragraph:ze(eo).replace("hr",pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",_i).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qn).getRegex()},nu={...no,html:ze(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ro).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:un,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ze(eo).replace("hr",pn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ki).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},su=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ou=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,xi=/^( {2,}|\\)\n(?!\s*$)/,au=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Jn=/[\p{P}\p{S}]/u,so=/[\s\p{P}\p{S}]/u,Si=/[^\s\p{P}\p{S}]/u,iu=ze(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,so).getRegex(),Ai=/(?!~)[\p{P}\p{S}]/u,lu=/(?!~)[\s\p{P}\p{S}]/u,cu=/(?:[^\s\p{P}\p{S}]|~)/u,du=ze(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Wd?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ti=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,uu=ze(Ti,"u").replace(/punct/g,Jn).getRegex(),pu=ze(Ti,"u").replace(/punct/g,Ai).getRegex(),Ei="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",fu=ze(Ei,"gu").replace(/notPunctSpace/g,Si).replace(/punctSpace/g,so).replace(/punct/g,Jn).getRegex(),_u=ze(Ei,"gu").replace(/notPunctSpace/g,cu).replace(/punctSpace/g,lu).replace(/punct/g,Ai).getRegex(),mu=ze("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Si).replace(/punctSpace/g,so).replace(/punct/g,Jn).getRegex(),gu=ze(/\\(punct)/,"gu").replace(/punct/g,Jn).getRegex(),hu=ze(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),bu=ze(ro).replace("(?:-->|$)","-->").getRegex(),vu=ze("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",bu).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Kn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,yu=ze(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Kn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ci=ze(/^!?\[(label)\]\[(ref)\]/).replace("label",Kn).replace("ref",to).getRegex(),Ri=ze(/^!?\[(ref)\](?:\[\])?/).replace("ref",to).getRegex(),wu=ze("reflink|nolink(?!\\()","g").replace("reflink",Ci).replace("nolink",Ri).getRegex(),mi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,oo={_backpedal:un,anyPunctuation:gu,autolink:hu,blockSkip:du,br:xi,code:ou,del:un,emStrongLDelim:uu,emStrongRDelimAst:fu,emStrongRDelimUnd:mu,escape:su,link:yu,nolink:Ri,punctuation:iu,reflink:Ci,reflinkSearch:wu,tag:vu,text:au,url:un},ku={...oo,link:ze(/^!?\[(label)\]\((.*?)\)/).replace("label",Kn).getRegex(),reflink:ze(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Kn).getRegex()},Ks={...oo,emStrongRDelimAst:_u,emStrongLDelim:pu,url:ze(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",mi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ze(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",mi).getRegex()},$u={...Ks,br:ze(xi).replace("{2,}","*").getRegex(),text:ze(Ks.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Yn={normal:no,gfm:ru,pedantic:nu},ln={normal:oo,gfm:Ks,breaks:$u,pedantic:ku},xu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},gi=e=>xu[e];function rr(e,t){if(t){if(kt.escapeTest.test(e))return e.replace(kt.escapeReplace,gi)}else if(kt.escapeTestNoEncode.test(e))return e.replace(kt.escapeReplaceNoEncode,gi);return e}function hi(e){try{e=encodeURI(e).replace(kt.percentDecode,"%")}catch{return null}return e}function bi(e,t){let r=e.replace(kt.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(kt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(kt.slashPipe,"|");return n}function cn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Su(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function vi(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,c}function Au(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Zn=class{constructor(e){et(this,"options");et(this,"rules");et(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:cn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Au(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=cn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:cn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=cn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))i.push(r[c]),a=!0;else if(!a)i.push(r[c]);else break;r=r.slice(c);let u=i.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let T=h,$=T.raw+`
`+r.join(`
`),E=this.blockquote($);o[o.length-1]=E,n=n.substring(0,n.length-T.raw.length)+E.raw,s=s.substring(0,s.length-T.text.length)+E.text;break}else if(h?.type==="list"){let T=h,$=T.raw+`
`+r.join(`
`),E=this.list($);o[o.length-1]=E,n=n.substring(0,n.length-h.raw.length)+E.raw,s=s.substring(0,s.length-T.raw.length)+E.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),h=e.split(`
`,1)[0],T=!_.trim(),$=0;if(this.options.pedantic?($=2,f=_.trimStart()):T?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=_.slice($),$+=t[1].length),T&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),c=!0),!c){let E=this.rules.other.nextBulletRegex($),U=this.rules.other.hrRegex($),x=this.rules.other.fencesBeginRegex($),Y=this.rules.other.headingBeginRegex($),te=this.rules.other.htmlBeginRegex($);for(;e;){let R=e.split(`
`,1)[0],I;if(h=R,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),I=h):I=h.replace(this.rules.other.tabCharGlobal,"    "),x.test(h)||Y.test(h)||te.test(h)||E.test(h)||U.test(h))break;if(I.search(this.rules.other.nonSpaceChar)>=$||!h.trim())f+=`
`+I.slice($);else{if(T||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(_)||Y.test(_)||U.test(_))break;f+=`
`+h}!T&&!h.trim()&&(T=!0),u+=R+`
`,e=e.substring(R.length+1),_=I.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(_=>_.type==="space"),f=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=bi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(bi(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=cn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Su(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),vi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return vi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let T=_.slice(1,-1);return{type:"em",raw:_,text:T,tokens:this.lexer.inlineTokens(T)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ft=class Zs{constructor(t){et(this,"tokens");et(this,"options");et(this,"state");et(this,"inlineQueue");et(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new Zn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:kt,block:Yn.normal,inline:ln.normal};this.options.pedantic?(r.block=Yn.pedantic,r.inline=ln.pedantic):this.options.gfm&&(r.block=Yn.gfm,this.options.breaks?r.inline=ln.breaks:r.inline=ln.gfm),this.tokenizer.rules=r}static get rules(){return{block:Yn,inline:ln}}static lex(t,r){return new Zs(r).lex(t)}static lexInline(t,r){return new Zs(r).inlineTokens(t)}lex(t){t=t.replace(kt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(kt.tabCharGlobal,"    ").replace(kt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},i),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,i)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(T=>{h=T.call({lexer:this},_),typeof h=="number"&&h>=0&&(f=Math.min(f,h))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Xn=class{constructor(e){et(this,"options");et(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(kt.notSpaceStart)?.[0],s=e.replace(kt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+rr(n)+'">'+(r?s:rr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:rr(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let i=e.items[a];n+=this.listitem(i)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
`+n+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",r="";for(let s=0;s<e.header.length;s++)r+=this.tablecell(e.header[s]);t+=this.tablerow({text:r});let n="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];r="";for(let a=0;a<o.length;a++)r+=this.tablecell(o[a]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),r=e.header?"th":"td";return(e.align?`<${r} align="${e.align}">`:`<${r}>`)+t+`</${r}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${rr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=hi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+rr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=hi(e);if(s===null)return rr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${rr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:rr(e.text)}},ao=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},qt=class Xs{constructor(t){et(this,"options");et(this,"renderer");et(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new Xn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ao}static parse(t,r){return new Xs(r).parse(t)}static parseInline(t,r){return new Xs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Vn,dn=(Vn=class{constructor(e){et(this,"options");et(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ft.lex:Ft.lexInline}provideParser(){return this.block?qt.parse:qt.parseInline}},et(Vn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),et(Vn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Vn),Tu=class{constructor(...e){et(this,"defaults",Qs());et(this,"options",this.setOptions);et(this,"parse",this.parseMarkdown(!0));et(this,"parseInline",this.parseMarkdown(!1));et(this,"Parser",qt);et(this,"Renderer",Xn);et(this,"TextRenderer",ao);et(this,"Lexer",Ft);et(this,"Tokenizer",Zn);et(this,"Hooks",dn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Xn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Zn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new dn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],c=s[a];dn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&dn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,u);return c.call(s,_)})();let f=i.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,u);return _===!1&&(_=await c.apply(s,u)),_})();let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ft.lex(e,t??this.defaults)}parser(e,t){return qt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?qt.parse:qt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?qt.parse:qt.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+rr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ar=new Tu;function Xe(e,t){return Ar.parse(e,t)}Xe.options=Xe.setOptions=function(e){return Ar.setOptions(e),Xe.defaults=Ar.defaults,yi(Xe.defaults),Xe};Xe.getDefaults=Qs;Xe.defaults=Tr;Xe.use=function(...e){return Ar.use(...e),Xe.defaults=Ar.defaults,yi(Xe.defaults),Xe};Xe.walkTokens=function(e,t){return Ar.walkTokens(e,t)};Xe.parseInline=Ar.parseInline;Xe.Parser=qt;Xe.parser=qt.parse;Xe.Renderer=Xn;Xe.TextRenderer=ao;Xe.Lexer=Ft;Xe.lexer=Ft.lex;Xe.Tokenizer=Zn;Xe.Hooks=dn;Xe.parse=Xe;var ym=Xe.options,wm=Xe.setOptions,km=Xe.use,$m=Xe.walkTokens,xm=Xe.parseInline;var Sm=qt.parse,Am=Ft.lex;function pr(e){let t=Xe.parse(e),r=di.sanitize(t);return fi(r)}function nr(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Br(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function es(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Eu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Cu=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ru=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function fr(e){return!!e&&typeof e=="object"}function io(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ii(e,t){let r=io(e),n=io(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Iu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>fr(s)&&typeof s.text=="string"?s.text:"").join(""):fr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Lu(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Eu[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=io(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ii(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let c=Ii(fr(i)?i.old_string:"",fr(i)?i.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Li(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Oi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Cu.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Ru.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Ou(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(fr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Oi(o.text));else if(o.type==="thinking"){let a=Li(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Lu(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(fr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Iu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Du(e){if(e.type==="item.completed"&&fr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Oi(t.text)];if(t.type==="reasoning"){let r=Li(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Mu(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Di(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!fr(o))continue;let a=Mu(o)?Du(o):Ou(o,r);for(let i of a)t.push(i)}return t}var Pu=5,Nu=10,Fu=/Task\s+#(\d+)/,qu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Bu=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ts(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Uu(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function ju(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function zu(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Fu.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Hu(e){if(e.tool==="Bash"){let t=e.command||"";return qu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Bu.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Wu(e){let t=e.filter(s=>s.kind==="tool").slice(-Nu),r=new Map;t.forEach((s,o)=>{let a=Hu(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Gu(e){let t=ju(e);if(t)return{text:t,guess:!1};let r=zu(e);if(r)return{text:r,guess:!1};let n=Wu(e);return n?{text:n,guess:!0}:null}function Yu(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Tt(e,t)}function rs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,c=new Set,u=new Set,f=null,_=null,h=!1,T=!1,$=!1,E=null,U=null;function x(){h=!1,T=!1,$=!1,E=null,U=null}async function Y(C){if(r){T=!0,$=!1,$e();try{let q=await Promise.resolve(r("get-attempt-prompt",{attempt_id:C}));if(o!==C)return;!q||typeof q!="object"||Array.isArray(q)?$=!0:(E=q,U=C)}catch{o===C&&($=!0)}finally{o===C&&(T=!1,$e())}}}function te(){if(h=!h,h&&o&&U!==o){Y(o);return}$e()}function R(){if(!h)return"";let C=Br({loading:T,error:$});if(C)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${C}
      </div>`;if(!E)return"";if(E.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let q=es(E.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${q?l`<div class="prompt-block__meta">${q} 발송</div>`:""}
      ${typeof E.task_prompt=="string"?nr("\uACFC\uC5C5 (user)",E.task_prompt):""}
      ${typeof E.system_prompt=="string"?nr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",E.system_prompt):""}
    </div>`}function I(){if(!o||!n)return[];let C=n.get(o);return Di(C?C.lines:[])}function A(){if(!o||!n)return null;let C=n.get(o),q=C?C.last_event_at:null;return typeof q=="number"?q:null}function j(){return a.status==="running"}function D(){if(j()&&o){_||(_=setInterval(()=>$e(),1e3));return}se()}function se(){_&&(clearInterval(_),_=null)}function Ee(C){let q=[],de=0;for(;de<C.length;){let qe=C[de];if(qe.kind==="tool"){let Re=de;for(;Re<C.length&&C[Re].kind==="tool"&&C[Re].tool===qe.tool;)Re+=1;if(Re-de>=Pu&&!u.has(de)){q.push({kind:"group",idx:de,tool:qe.tool||"",lines:C.slice(de,Re).map((ve,xe)=>({idx:de+xe,line:ve}))}),de=Re;continue}}q.push({kind:"line",idx:de,line:qe}),de+=1}return q}function ie(C){for(let q=C.length-1;q>=0;q-=1){let de=C[q];if(de.kind==="result"||de.kind==="error")return null;if(de.kind==="tool"&&!Object.hasOwn(de,"result"))return de}return null}function he(C){for(let q=C.length-1;q>=0;q-=1)if(C[q].kind==="thinking")return C[q];return null}function ke(C,q){if(q.kind==="gate")return l`<div class="sv__gate">${q.text}</div>`;if(q.kind==="phase")return l`<div class="sv__phase">${q.text}</div>`;if(q.kind==="result")return l`<div
        class="sv__result${q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${pr(q.text||(q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(q.kind==="thinking"){let de=c.has(C);return l`<div
        class="sv__think${de?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>be(C)}
      >
        <span class="sv__think-line">💭 ${ts(q.text)}</span>
        ${de?l`<pre class="sv__think-expand">${q.text}</pre>`:""}
      </div>`}if(q.kind==="error")return l`<div class="sv__error">⛔ ${q.text}</div>`;if(q.kind==="blocker")return l`<div class="sv__error">⛔ ${q.text}</div>`;if(q.kind==="tool"){let de=c.has(C),qe=q.tool==="Bash"?Uu(q.command):0,Re=q.tool==="Bash"?qe>1?ts(q.command):q.command:q.path||q.command||"";return l`<div
        class="sv__tool${de?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>be(C)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${q.icon}</span>
          <span class="sv__tool-name">${q.tool}</span>
          ${Re?l`<span class="sv__tool-detail">${Re}</span>`:""}
          ${qe>1?l`<span class="sv__tool-more">⋯ ${qe}줄</span>`:""}
          ${typeof q.added=="number"?l`<span class="sv__diff-add">+${q.added}</span>`:""}
          ${typeof q.removed=="number"?l`<span class="sv__diff-del">−${q.removed}</span>`:""}
          ${q.result?l`<span class="sv__tool-ok">→ ${q.result}</span>`:""}
        </span>
        ${de?l`<pre class="sv__tool-expand">${Qe(q)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${pr(q.text||"")}</div>`}function Qe(C){let q=[];if(C.tool==="Bash"&&typeof C.command=="string"&&C.command.length>0)q.push(C.command);else if(C.input!==void 0)try{q.push(`input: ${JSON.stringify(C.input,null,2)}`)}catch{}return typeof C.output=="string"&&C.output.length>0&&q.push(`output:
${C.output}`),q.join(`

`)}function Je(){if(!o)return l``;let C=I(),q=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),de=a.session_id||"",qe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,Re=j(),ve=Re?Yu(A(),Date.now()):"",xe=Re?ie(C):null,Ke=Re?he(C):null,Be=Gu(C);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Be?l`<span
              class="sv__stage${Be.guess?" sv__stage--guess":""}"
              title=${Be.text}
              >${Be.text}</span
            >`:""}
        ${Re?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ve?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ve}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ve?l`<span class="sv__live-ago">${ve}</span>`:""}</span
            >`:""}
        ${de?l`<button
              type="button"
              class="sv__session"
              title=${de}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${de}`}
              @click=${()=>G(de)}
            >
              ⧉ ${de.slice(0,8)}
            </button>`:""}
        ${q?l`<span class="sv__meta">${q}</span>`:""}
        ${a.worktree?l`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${h?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${h?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${te}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${i?" sv__follow--on":""}"
          aria-pressed=${i?"true":"false"}
          aria-label=${qe}
          @click=${me}
        >
          <span class="sv__follow-full">⇣ ${qe}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>le()}
        >
          ✕
        </button>
      </div>
      ${R()}
      <div class="sv__body">
        ${C.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:Ee(C).map(He=>He.kind==="group"?Le(He):ke(He.idx,He.line))}
      </div>
      ${xe||Ke?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${xe?l`<span class="sv__now-icon">${xe.icon}</span>
                  <span class="sv__now-name">${xe.tool}</span>
                  <span class="sv__now-detail"
                    >${xe.tool==="Bash"?ts(xe.command):xe.path||xe.command||""}</span
                  >`:""}
            ${Ke?l`<span class="sv__now-think"
                  >💭 ${ts(Ke.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Le(C){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>De(C.idx)}
    >
      <span class="sv__group-icon">${C.lines[0].line.icon}</span>
      <span class="sv__group-name">${C.tool}</span>
      <span class="sv__group-count">${C.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function De(C){u.add(C),$e()}function $e(){Ue(Je(),e),D(),i&&fe()}function fe(){let C=e.querySelector(".sv__body");C&&(C.scrollTop=C.scrollHeight)}function be(C){c.has(C)?c.delete(C):c.add(C),$e()}function me(){i=!i,$e()}function G(C){Sr(C).then(q=>{q?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function K(C){!o||!C||(a={...a,...C},$e())}function Ie(C){let q=C.target;if(!q||!q.classList||!q.classList.contains("sv__body"))return;!(q.scrollHeight-q.scrollTop-q.clientHeight<=4)&&i&&(i=!1,$e())}e.addEventListener("scroll",Ie,!0);function ce(C){let q=C&&C.attempt_id;q&&(o=q,a=C.meta||{},i=!0,c.clear(),u.clear(),x(),!f&&n&&(f=n.subscribe($e)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),$e())}function le(){let C=o;o=null,c.clear(),u.clear(),x(),se(),r&&C&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${C}`})).catch(()=>{}),Ue(l``,e),s&&s()}return{open:ce,updateMeta:K,close:le,isOpen(){return o!==null},destroy(){se(),f&&(f(),f=null),e.removeEventListener("scroll",Ie,!0),o=null,Ue(l``,e)}}}function fn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Mi(t.spec_id),s=Mi(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Mi(e){return typeof e=="string"?e.trim():""}function Vu(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Ku(e){let t=e&&e.metadata||{},r=fn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Vu(t)?null:"plan_pending"}),n}function Pi(e,t){let r=Ku(e);return l`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?l`<div class="detail-empty">산출물 없음</div>`:l`
          ${r.map(n=>l`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,n.path,n.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Zu="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Xu=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Qu=/^\*\*결론\*\* — (.+)$/;function ns(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Zu)return null;let r=Xu.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Qu.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Ni=20;function Fi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Ju(e){return e.length>Ni?`${e.slice(0,Ni)}\u2026`:e}function ep(e,t,r,n){let s=`${t.lane} ${Ju(t.identifier)}`;return l`<div class="detail-report">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${n?"true":"false"}
      @click=${()=>r.onToggle&&r.onToggle(e.id)}
    >
      <span class="detail-report__tri">${n?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🤖</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">작업 보고서</span>
        <span
          class="detail-report__lane${t.lane==="worker"?" detail-report__lane--worker":""}"
          title=${`${t.lane} ${t.identifier} \xB7 ${t.timestamp}`}
          >${s}</span
        >
        <span class="detail-report__time">${Fi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${pr(t.body)}
        </div>`:""}
  </div>`}function tp(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Fi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${pr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function qi(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=ns(typeof c.text=="string"?c.text:"");return u?ep(c,u,t,s.has(c.id)):tp(c)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${c=>t.onDraftInput&&t.onDraftInput(c.target.value)}
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
  `}var rp=["codex","opus","fable","self","skip"],np=["codex","fable","skip"],sp=["low","medium","high","xhigh"],op=["standard","fast_track"],Er=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],co=["impl_runtime","orchestration_model"],_n=[{id:"worker-detail",label:"\uC6CC\uCEE4 \uC0C1\uC138",keys:["orchestration_effort","orchestration_speed"]},{id:"implementation-detail",label:"\uAD6C\uD604 \uC0C1\uC138",keys:["impl_model","impl_effort"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]}],uo={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},Bi={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},ap=["self","skip"],ip="opus",po={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function fo(e){let t=uo[e]||{title:e};return l`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?l`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function lp(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:po[e]||"(\uAE30\uBCF8)"}function Ur(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Cr(e){if(!Ur(e)||!Ur(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Ur(r)&&Ur(r.models));return t.length>0?t:null}function lo(e){return{value:e,label:e}}function _o(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Ui(e,t,r=null){let n=Cr(e);if(!n)return t?[{label:null,options:[lo(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(lo)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[_o(t),...s]:s}function _r(e,t){let r={label:null,options:e.map(lo)};return t&&!e.includes(t)?[_o(t),r]:[r]}function sr(e,t){let r=Cr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function mo(e,t){return Ur(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function cp(e,t){return Ur(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():mo(e,t)}function dp(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return cp(n,n.models[t]);return[]}function up(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function go(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return mo(n,n.models[t]);return[]}function Hi(e){let t=Cr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of mo(n,s))r.includes(o)||r.push(o);return r}function Wi(e,t){if(!t)return Hi(e);let n=Cr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of go(e,o))s.includes(a)||s.push(a);return s}function os(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=sr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?go(t,n.impl_model):Wi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function jr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||ip,a=r("impl_model"),i=r("impl_runtime"),c=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?sr(n,o):s:null;return Er.map(u=>{let f=t(u),_,h=!1;return u==="orchestration_model"?_=Ui(n,f):u==="impl_runtime"?_=_r(["inherit","claude","codex"],f):u==="impl_model"?(_=c?Ui(n,f,c):f?[_o(f)]:[],h=i==="inherit"&&c===null):u==="orchestration_effort"?_=_r(dp(n,o),f):u==="orchestration_speed"?_=pp(up(n,o),f):u==="impl_effort"?(_=_r(a?go(n,a):c?Wi(n,c):Hi(n),f),h=i==="inherit"&&c===null):u==="plan_review_model"?_=_r(np,f):Object.hasOwn(Bi,u)?(_=_r(sp,f),h=ap.includes(r(Bi[u]))):_=_r(rp,f),{key:u,groups:_,selected:f,disabled:h,runner:u==="orchestration_model"?sr(n,o):null}})}function ss(e,t,r){return l`
    ${typeof r=="string"?l`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>ji(s,t)):l`<optgroup label=${n.label}>
            ${n.options.map(s=>ji(s,t))}
          </optgroup>`)}
  `}function pp(e,t){return _r(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function ji(e,t){return l`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function zi(e,t,r,n,s,o,a){return l`
    <div class="detail-kv">
      <span class="detail-kv__k">${fo(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${n?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${i=>(e==="impl_runtime"||e==="impl_model"||e==="impl_effort")&&a.onImplTargetChange?a.onImplTargetChange(e,i.target.value):a.onChange(e,i.target.value)}
        >
          ${t}
        </select>
        ${o?l`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function fp(e,t,r,n){return e.some(s=>t(s))?"\uC774\uC288 \uD540":e.some(s=>r(s))?`\uD504\uB9AC\uC14B \u300C${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"}\u300D`:"\uAE30\uBCF8"}function _p(e,t,r){let n=[t("orchestration_model")||"opus"],s=t("orchestration_effort"),o=t("orchestration_speed");s&&n.push(`effort ${s}`),o&&o!=="default"&&n.push(`speed ${o==="fast"?"Fast":o}`);let a=`${t("impl_runtime")||"inherit"} \xB7 ${t("impl_model")||"auto"}`,i=[["\uC2A4\uD399","spec_review_model","spec_review_effort"],["\uACC4\uD68D","plan_review_model","plan_review_effort"],["\uAD6C\uD604","impl_review_model","impl_review_effort"]].map(([u,f,_])=>{let h=t(f)||"codex",T=t(_);return`${u} ${h}${T?`/${T}`:""}`}),c=[{id:"worker",label:"\uC6CC\uCEE4",keys:Er.slice(0,3),value:n.join(" \xB7 ")},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_runtime","impl_model","impl_effort"],value:a},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"],value:i.join(" \xB7 ")}];return l`<section
    class="detail-exec-presets exec-settings-summary"
    data-exec-settings-summary
  >
    ${c.map(u=>l`<div
          class="workflow-summary__row exec-settings-summary__row"
          data-exec-summary=${u.id}
        >
          <span class="workflow-summary__label">${u.label}</span>
          <span class="detail-kv__vgroup">
            <span class="workflow-summary__value">${u.value}</span>
            <span class="detail-kv__v" data-exec-source
              >${fp(u.keys,e,t,r)}</span
            >
          </span>
        </div>`)}
  </section>`}function Gi(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=$=>typeof o[$]=="string"?o[$]:"",c=$=>{let E=i($);return E||(typeof a[$]=="string"?a[$]:"")},u=jr({selectedOf:i,effectiveOf:c,runner_catalog:n}),f=o.workflow_mode==="fast_track"?"fast_track":"standard",_=new Map(u.map($=>[$.key,$])),h=_n.flatMap($=>$.keys).filter($=>i($)).length,T=$=>{let E=_.get($);return E?zi(E.key,ss(E.groups,E.selected,lp(E.key,a,s)),E.selected,!!E.selected,E.disabled,E.runner,t):""};return l`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${_p(i,c,s)}
    <section class="exec-settings-core" data-exec-settings-core>
      ${zi("workflow_mode",ss(_r(op,f),f),f,o.workflow_mode==="fast_track",!1,null,t)}
      ${co.map(T)}
    </section>
    <details
      class="detail-exec-presets exec-settings-advanced"
      data-exec-settings-advanced
    >
      <summary>고급 설정 — ${h}개 변경됨</summary>
      ${_n.map($=>l`<section
            class="exec-settings-advanced__group"
            data-exec-settings-group=${$.id}
          >
            <h4>${$.label}</h4>
            ${$.keys.map(T)}
          </section>`)}
    </details>
  `}function mp(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Yi(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function c($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",c);function u(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${mp(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>h()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${i}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:pr(a)}
          </div>
        </div>
      </div>
    `:l``}function f(){Ue(u(),e)}async function _($,E={}){s=$,o="loading",a="",i="",f();let U=r?r():"";if(!U){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let x="/api/doc?workspace="+encodeURIComponent(U)+"&path="+encodeURIComponent($);try{let Y=await n(x),te=await Y.json().catch(()=>({}));if(!Y.ok||!te||te.ok!==!0){if(te?.error==="not_found"&&E.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(te&&te.error||Y.status)+")",f();return}a=String(te.content||""),o="ready",f()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function h(){s=null,Ue(l``,e)}function T(){document.removeEventListener("keydown",c),h()}return{open:_,close:h,destroy:T}}var gp=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Zi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function hp(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function bp(e){let t=gt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Fr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Zi}
          >부분 집계</span
        >`:""}`}function Vi(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ki(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Xi(t):""}function vp(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=gt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${r}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?l`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${Ki(s.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
              >${Ki(s.completed_at)}</span
            >`:""}
        ${a?l`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function yp(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...gp,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${n.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${hp(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Zi}</span>`:""}
  </div>`}var wp={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Xi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function kp(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Qi(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),T=_&&!h,$=_?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!T}
      title=${$}
      @click=${E=>{E.stopPropagation(),T&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,h=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return l`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},c=u=>{let f=Vi(qs(u));if(gt(f).length===0&&!Fr(u.usage))return"";let _=s.has(u.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${bp(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=qs(u),_=Vi(f),h=gt(_);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${wp[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${dr(u)?l`<span
                  class="detail-session__resumed"
                  title=${dr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Wt(u)}</span>
            ${h.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?l`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(T=>l`<span
                      class="detail-session__usage"
                      title=${T.tooltip}
                      >${T.label}</span
                    >`):Fr(u.usage)?l`<span class="detail-session__usage"
                    >${Fr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Xi(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${kp(u)}
          ${s.has(u.attempt_id)&&u.usage?yp(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${vp(f)}
        </div>`})}
    </div>
  `}function Ji(e,t={}){return l`
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
    ${e.expanded?l`<div class="detail-prompt" data-seam="task-prompt">
          ${$p(e)}
        </div>`:""}
  `}function $p(e){let t=Br(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?nr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=es(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?nr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?nr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var xp=["open","in_progress","deferred","resolved","closed"],Sp=[0,1,2,3,4];function el(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,_={},h="",T=!1,$=!1,E=!1,U="",x="",Y="";function te(){$=!1,E=!1,U="",x="",Y=""}let R=[],I=null,A=null,j=!1,D="",se=!1,Ee=0,ie=new Set;function he(){R=[],I=null,A=null,j=!1,D="",se=!1,Ee+=1,ie.clear()}async function ke(d){if(!s)return;let k=++Ee;try{let y=await Promise.resolve(s("get-comments",{id:d}));if(k!==Ee||d!==u)return;R=Array.isArray(y)?y:[],j=!1}catch{if(k!==Ee||d!==u)return;j=!0}m()}function Qe(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(I!==u){I=u,A=d,ke(u);return}d!==null&&d!==A&&(A=d,ke(u))}function Je(d){ie.has(d)?ie.delete(d):ie.add(d),m()}function Le(d){let k=D.trim().length===0;D=d,k!==(d.trim().length===0)&&m()}async function De(){let d=D.trim();if(!s||!u||d.length===0||se)return;let k=u;se=!0,m();let y=!1;try{let O=await Promise.resolve(s("add-comment",{id:k,text:d}));Array.isArray(O)&&O.length>0&&(y=!0,k===u&&(R=O,j=!1,D="",A=O.length))}catch{y=!1}y||ee("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),k===u&&(se=!1),m()}let $e={onToggle:Je,onDraftInput:Le,onSubmit:De},fe=document.createElement("div");fe.className="md-viewer-root",document.body.appendChild(fe);let be=Yi(fe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),me=document.createElement("div");me.className="session-log-root",document.body.appendChild(me);let G=rs(me,{transport:s?(d,k)=>Promise.resolve(s(d,k)):void 0,sessionLogStore:c}),K=!1,Ie=!1,ce=!1,le=null,C=null,q=0;function de(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function qe(){K=!1,Ie=!1,ce=!1,le=null,C=null,q+=1}async function Re(d){if(!s)return;let k=++q;Ie=!0,ce=!1,m();try{let y=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(k!==q)return;!y||typeof y!="object"||Array.isArray(y)?ce=!0:(le=y,C=de(d))}catch{k===q&&(ce=!0)}finally{k===q&&(Ie=!1,m())}}function ve(){if(K=!K,K&&u&&C!==de(u)){le=null,Re(u);return}m()}function xe(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(y=>y&&y.bead_id===u).sort((y,O)=>(O.started_at||0)-(y.started_at||0)).map(y=>({attempt_id:y.attempt_id,bead_id:y.bead_id,status:y.status,started_at:typeof y.started_at=="number"?y.started_at:null,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,session_id:y.session_id||null,resumed_from:y.resumed_from||null,continuation_mode:y.continuation_mode||null,dismissed_at:typeof y.dismissed_at=="number"?y.dismissed_at:null,cause:typeof y.cause=="string"?y.cause:null,cause_detail:y.cause_detail||null,exec_default_preset_id:typeof y.exec_default_preset_id=="string"?y.exec_default_preset_id:null,exec_default_preset_revision:typeof y.exec_default_preset_revision=="number"?y.exec_default_preset_revision:null,exec_values:y.exec_values&&typeof y.exec_values=="object"?y.exec_values:null,usage:y.usage||null,usage_legs:Array.isArray(y.usage_legs)?y.usage_legs:[]}))}function Ke(){if(!a||!u)return null;let d=a.get();return It(d&&d.attempts||{},u)}let Be=new Set;function He(d){Be.has(d)?Be.delete(d):Be.add(d),m()}function L(d){let k=a?a.get():null,y=k&&k.attempts?k.attempts[d]:null;G.open({attempt_id:d,meta:y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}})}async function z(d){if(!s||!d)return;let k=()=>{let Q=a?a.get():null;return Q&&typeof Q.revision=="number"?Q.revision:0},y=async(Q={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:k(),...Q}),O=Q=>{Q?.queue&&a?.set&&a.set(Q.queue)},re=await y();if(O(re),re&&re.conflict){let Q=re.queue&&typeof re.queue.revision=="number"?re.queue.revision:k();re=await s("worker-attempt-resume",{attempt_id:d,expected_revision:Q}),O(re)}re=await Jt(re,(Q,Ne)=>y({continuation:Q,decision_token:Ne}),{onResult:O,refresh:()=>y()}),re&&re.resumed===!1&&!re.conflict&&re.reason&&ee(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${re.reason}`,"error",2400)}let N={onOpen:L,onResume:z,onToggleUsage:He};function v(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,y=typeof k=="string"?J()?.presets.find(O=>O.id===k):null;return y&&y.compatible!==!1&&y.settings?y.settings:{}}function P(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,y=typeof k=="string"?J()?.presets.find(O=>O.id===k):null;return y&&y.compatible!==!1&&typeof y.name=="string"?y.name:""}function M(){let d=a?a.get():null;return d&&d.runner_catalog||null}function W(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},y=(Object.hasOwn(_,"orchestration_model")?_.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof v().orchestration_model=="string"?v().orchestration_model:"")||"opus";return sr(M(),y)}function J(){let d=i?i.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function Me(d){let k=d&&d.settings&&typeof d.settings=="object"?d.settings:{},y=O=>typeof k[O]=="string"?k[O]:O==="impl_runtime"&&typeof k.impl_model=="string"&&sr(M(),k.impl_model)||"";return jr({selectedOf:y,effectiveOf:y,runner_catalog:M()}).some(O=>O.groups.some(re=>re.options.some(Q=>Q.value===O.selected&&Q.label.endsWith("(\uBE44\uD638\uD658)"))))}function Se(d){i&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&i.set({revision:d.revision,presets:d.presets})}async function Te(){let d=J(),k=d?.presets.find(y=>y.id===h);if(!(!s||!u||!d||!k||Me(k)||T)){T=!0,m();try{let y=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:k.id,expected_revision:d.revision}));if(y&&y.conflict){Se(y),ee("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let O=y&&Array.isArray(y.issue)?y.issue[0]:y?.issue;if(y&&y.applied&&O&&typeof O=="object"){f=O;for(let re of Er)delete _[re];ee("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}y&&y.error==="bd_readback_failed"?ee("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ee("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(y){y&&typeof y=="object"&&y.code==="bd_readback_failed"?ee("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ee("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{T=!1,m()}}}function dt(){let d=J();if(d&&d.presets.length===0)return l`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let k=d?d.presets:[],y=k.find(re=>re.id===h),O=y?Me(y):!1;return l`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||T}
          @change=${re=>{h=re.target.value,m()}}
        >
          <option value="" ?selected=${h===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${k.map(re=>{let Q=Me(re);return l`<option
              value=${re.id}
              ?selected=${re.id===h}
            >
              ${re.name}${Q?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!y||O||T}
          @click=${()=>{Te()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let at=null;r&&r.subscribe&&(at=r.subscribe(()=>st()));let tt=null;a&&typeof a.subscribe=="function"&&(tt=a.subscribe(()=>{u&&m()}));let _t=null;i&&typeof i.subscribe=="function"&&(_t=i.subscribe(()=>{u&&m()}));function $t(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",$t);function st(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(y=>y&&y.id===u)||d[0]||f}Qe(),m()}}function it(d){Sr(d).then(k=>{k?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function nt(d){d.preventDefault(),d.stopPropagation(),u&&it(u)}function lt(d,k){d.preventDefault(),d.stopPropagation(),it(k)}function ht(d,k,y){d.preventDefault(),d.stopPropagation(),be.open(k,{missing_state:y})}function B(d,k){_[d]=k,m(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:k})).catch(()=>{ee("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function V(d,k){let y=f||{},O=y.metadata&&typeof y.metadata=="object"?y.metadata:{},re={};for(let Pe of["impl_runtime","impl_model","impl_effort"])re[Pe]=Object.hasOwn(_,Pe)?_[Pe]:typeof O[Pe]=="string"?O[Pe]:"";re[d]=k;let Q=os(re,M(),W()),Ne={};for(let Pe of["impl_runtime","impl_model","impl_effort"])Ne[Pe]=_[Pe],_[Pe]=Q[Pe]||"";m(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Q,orchestration_runtime:W()})).then(Pe=>{let Kt=Array.isArray(Pe)?Pe[0]:Pe;if(!Kt||typeof Kt!="object"||!Kt.id)throw new Error("implementation target readback failed");f=Kt;for(let _s of["impl_runtime","impl_model","impl_effort"])delete _[_s];m()}).catch(()=>{for(let Pe of["impl_runtime","impl_model","impl_effort"])Ne[Pe]===void 0?delete _[Pe]:_[Pe]=Ne[Pe];m(),ee("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Z(d,k,y){if(!s||!u)return!1;try{let O=await Promise.resolve(s(d,k)),re=Array.isArray(O)?O[0]:O;return re&&typeof re=="object"&&re.id?(f=re,!0):(ee(y,"error"),!1)}catch{return ee(y,"error"),!1}}function pe(d){setTimeout(()=>{try{let k=e.querySelector(d);k&&typeof k.focus=="function"&&k.focus()}catch{}},0)}function ye(){$=!0,U=f&&f.title||"",m(),pe('.detail-edit__input[data-edit="title"]')}function Ce(d){U=d.target.value}function We(){$=!1,U="",m()}function rt(){Z("edit-text",{id:u,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&($=!1,U=""),m()})}function Ae(){E=!0,x=f&&f.description||"",m(),pe('.detail-edit__textarea[data-edit="description"]')}function Ge(d){x=d.target.value}function we(){E=!1,x="",m()}function ut(){Z("edit-text",{id:u,field:"description",value:x},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&(E=!1,x=""),m()})}function bt(d,k,y,O){if(d.key==="Escape"){d.stopPropagation(),y();return}d.key==="Enter"&&(!O||d.ctrlKey||d.metaKey)&&(d.preventDefault(),k())}function Vt(d){let k=d.target.value;Z("update-status",{id:u,status:k},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function Bt(d){let k=Number(d.target.value);Z("update-priority",{id:u,priority:k},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function Ut(d){Y=d.target.value}function mt(){let d=Y.trim();d.length!==0&&Z("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(k=>{k&&(Y=""),m()})}function xt(d){if(d.key==="Escape"){d.stopPropagation(),Y="",m();return}d.key==="Enter"&&(d.preventDefault(),mt())}function jt(d){Z("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>m())}let Ot={onCopyPath:lt,onOpenDoc:ht},p={onChange:B,onImplTargetChange:V};function w(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function S(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function ne(d){let y=(Array.isArray(d.dependencies)?d.dependencies:[]).map(O=>({id:w(O),icon:S(O)})).filter(O=>O.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${y.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${y.map(O=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(O.id)}
                  >
                    ${O.icon?`${O.icon} `:""}${O.id}
                  </button>`:l`<span class="detail-dep"
                    >${O.icon?`${O.icon} `:""}${O.id}</span
                  >`)}
          </div>`}
    `}function _e(d){let k=d.metadata||{},y=d.workflow||{},O=y.stages||{},re=O.spec&&O.spec.stale,Q=O.impl&&O.impl.stale,Ne=O.plan||null,Pe=y.route_source==="derived",Kt=y.route||k.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Pe?" detail-kv__v--derived":""}"
          title=${Pe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Pe?"unset":Kt}</span
        >
      </div>
      ${y.route!=="quick_fix"||Object.hasOwn(k,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${k.spec_review||"\uC5C6\uC74C"}${re?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${y.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ne?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ne?.approval_receipt||"\uC5C6\uC74C"}${Ne?.approval_state==="stale"?" \xB7 stale":Ne?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${y.route!=="quick_fix"||Object.hasOwn(k,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${k.impl_review||"\uC5C6\uC74C"}${Q?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${k.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${k.pr_url}</span>
          </div>`:""}
    `}let ge={route:["quick_fix","spec_backed","full_plan"]};async function ue(d,k){let y=k.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&y!=="full_plan"&&!window.confirm(`full_plan \u2192 ${y||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){m();return}await Z("update-workflow-meta",{id:u,key:d,value:y},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),m()}function je(d){let k=d.metadata||{};return l` ${((O,re)=>{let Q=ge[O],Ne=typeof k[O]=="string"?k[O]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${O}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${O}
          data-edit=${`wfmeta-${O}`}
          @change=${Pe=>ue(O,Pe)}
        >
          <option value="" ?selected=${!Q.includes(Ne)}>
            ${re}
          </option>
          ${Q.map(Pe=>l`<option value=${Pe} ?selected=${Ne===Pe}>${Pe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function X(d,k){return $?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${Ce}
            @keydown=${y=>bt(y,rt,We,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${rt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${We}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${d}</h2>
        ${gt(k).map(y=>l`<span class="detail-usage-total" title=${y.tooltip}
              >${y.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ye}
        >
          ✎
        </button>
      </div>
    `}function b(d){let k=pt(d.created_at),y=pt(d.updated_at);return!k&&!y?l``:l`
      ${k?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${k}</span>
          </div>`:""}
      ${y?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${y}</span>
          </div>`:""}
    `}function H(d,k){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Vt}
        >
          ${xp.map(y=>l`<option value=${y} ?selected=${y===d}>${y}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Bt}
        >
          ${Sp.map(y=>l`<option value=${String(y)} ?selected=${y===k}>
                P${y}
              </option>`)}
        </select>
      </div>
    `}function oe(d){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${E?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ae}
            >
              ✎
            </button>`}
      </div>
      ${E?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${x}
              @input=${Ge}
              @keydown=${k=>bt(k,ut,we,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ut}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${we}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Oe(d){let k=typeof d.notes=="string"?d.notes:"";return k.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${k}</div>
    `}function Ze(d){let k=Array.isArray(d.labels)?d.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${k.map(y=>l`<span class="detail-label-chip"
              >${y}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${y}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+y}
                @click=${()=>jt(y)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${Y}
            @input=${Ut}
            @keydown=${xt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${mt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ye(){if(!u)return l``;let d=f||{},k=String(d.id||u),y=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",O=Ke(),re=d.status||"open",Q=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",Ne=d.description||"",Pe={...d,metadata:{...d.metadata||{},..._}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>n()}></div>
        <div class="detail-overlay__panel">
          <button
            type="button"
            class="detail-overlay__close"
            aria-label="닫기"
            @click=${()=>n()}
          >
            ✕
          </button>
          <button
            type="button"
            class="detail-overlay__id"
            title="ID 복사"
            @click=${nt}
          >
            ${k}
          </button>
          ${X(y,O)}
          ${H(re,Q)} ${b(d)}
          ${oe(Ne)}
          ${qi(R,$e,{expanded:ie,draft:D,sending:se,error:j})}
          ${Oe(d)} ${Ze(d)} ${ne(d)}
          ${_e(d)} ${je(d)}
          ${Pi(d,Ot)}
          ${dt()}
          ${Gi(Pe,p,v(),M(),P())}
          ${Ji({expanded:K,loading:Ie,error:ce,data:le},{onToggle:ve})}
          ${Qi(xe(),N,{total:O,expanded:Be})}
        </div>
      </div>
    `}function m(){Ue(Ye(),e)}return{load(d){d!==u&&(_={},h="",te(),he(),qe()),u=d,f=null,st()},clear(){u=null,f=null,_={},h="",T=!1,te(),he(),qe(),be.close(),G.close(),Ue(l``,e)},destroy(){at&&(at(),at=null),tt&&(tt(),tt=null),_t&&(_t(),_t=null),document.removeEventListener("keydown",$t),be.destroy(),fe.parentNode&&fe.parentNode.removeChild(fe),G.destroy(),me.parentNode&&me.parentNode.removeChild(me),u=null,f=null,h="",T=!1,he(),qe(),Ue(l``,e)}}}var Ap=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function tl(e,t){return Ps(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Tp(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function rl(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(A){let j=r.get();if(j)try{let D=await n("display-policy-set",{expected_revision:j.revision,policy:A(j)});c(D),D&&D.conflict&&D.policy&&(D=await n("display-policy-set",{expected_revision:D.policy.revision,policy:A(D.policy)}),c(D)),D&&D.conflict&&ee("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ee("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function c(A){A&&A.policy&&typeof A.policy=="object"&&r.set(A.policy)}function u(A){let j=r.get();if(!j)return;let D=tl(A,j)!=="shown";i(se=>Tp(A,se,D))}function f(){let A=a.trim();A.length!==0&&(a="",i(j=>j.hidden_prefixes.includes(A)?{hidden_prefixes:j.hidden_prefixes}:{hidden_prefixes:[...j.hidden_prefixes,A]}),U())}function _(A){i(j=>({hidden_prefixes:j.hidden_prefixes.filter(D=>D!==A)}))}function h(A){let j=r.get();if(!j)return;let D=j.chips[A]===!1;i(()=>({chips:{[A]:D}}))}function T(A){let j=s();return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${j.length===0?l`<div class="display-settings__empty">라벨 없음</div>`:l`<div class="display-settings__pills">
              ${j.map(D=>{let se=tl(D,A);return l`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${se}`}
                  data-label=${D}
                  data-state=${se}
                  @click=${()=>u(D)}
                >
                  ${D}
                </button>`})}
            </div>`}
      </section>
    `}function $(A){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${A.hidden_prefixes.map(j=>l`<span class="display-settings__prefix">
                ${j}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${j} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(j)}
                >
                  ×
                </button>
              </span>`)}
        </div>
        <div class="display-settings__prefix-add">
          <input
            type="text"
            class="display-settings__prefix-input"
            aria-label="숨길 prefix"
            placeholder="예: reviewed:"
            .value=${a}
            @input=${j=>{a=String(j.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function E(A){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Ap.map(([j,D])=>l`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${j}
                  .checked=${A.chips[j]!==!1}
                  @change=${()=>h(j)}
                />
                <span>${D}</span>
              </label>`)}
        </div>
      </section>
    `}function U(){let A=r.get();Ue(l`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${I}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${A?l`${T(A)} ${$(A)}
                ${E(A)}`:l`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let x=!1,Y=()=>{x=!1};o.addEventListener("close",Y),o.addEventListener("cancel",Y);let te=null;r.subscribe&&(te=r.subscribe(()=>{x&&U()}));function R(){x||(a="",x=!0,U(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function I(){x&&(x=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:R,close:I,destroy(){x=!1,o.removeEventListener("close",Y),o.removeEventListener("cancel",Y),te&&(te(),te=null),o.remove()}}}function nl(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,_="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Ep(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Cp(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}function as(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,c=!1;function u(){return r&&r.get()||{revision:0,exec_defaults:{}}}function f(){let v=u();return typeof v.revision=="number"?v.revision:0}function _(){let v=n?n.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function h(v){n&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&n.set({revision:v.revision,presets:v.presets})}function T(v){v&&v.queue&&r&&r.set(v.queue)}function $(){return u().runner_catalog??null}let E=null;function U(){if(E!==null)return E;let v=u().default_exec_preset_id;return typeof v=="string"&&v.length>0?v:null}async function x(v){if(!s)return;let P=_();if(!P)return;E=v||"";let M=I(v);if(ve(),!M.viable){ee(M.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3),E=null,ve();return}try{let W=await s("worker-queue-set-default-exec-preset",{preset_id:v||null,expected_queue_revision:f(),expected_preset_revision:P.revision});T(W),W&&W.presets&&n&&n.set(W.presets),W&&W.conflict?ee("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3):W&&W.applied||ee("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{ee("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}E=null,ve()}function Y(v){i={id:v.id,name:v.name,settings:{...v.settings||{}}},j(),c=!1,ve()}function te(){i={id:null,name:"",settings:{}},c=!1,ve()}function R(v){let P=v&&v.settings&&typeof v.settings=="object"?v.settings:{},M=W=>typeof P[W]=="string"?P[W]:W==="impl_runtime"&&typeof P.impl_model=="string"&&sr($(),P.impl_model)||"";return jr({selectedOf:M,effectiveOf:M,runner_catalog:$()}).some(W=>W.groups.some(J=>J.options.some(Me=>Me.value===W.selected&&Me.label.endsWith("(\uBE44\uD638\uD658)"))))}function I(v){if(!v)return{viable:!0,missing:!1,incompatible:!1,preset:null};let M=_()?.presets.find(J=>J.id===v);if(!M||M.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let W=M.compatible===!1||R(M);return{viable:!W,missing:!1,incompatible:W,preset:M}}function A(){let v=i?.settings.orchestration_model;return typeof v!="string"?null:sr($(),v)}function j(){if(!i)return;let v=os({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},$(),A());for(let P of["impl_runtime","impl_model","impl_effort"])v[P]?i.settings[P]=v[P]:delete i.settings[P]}function D(v){let P=v&&v.settings&&typeof v.settings=="object"?v.settings:{},M=Er.filter(J=>typeof P[J]=="string").length,W=Er.filter(J=>typeof P[J]=="string").map(J=>`${uo[J]?.title||J}: ${P[J]}`);return{count:`${M}/12 \uC9C0\uC815`,choices:W.length>0?W.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function se(v){if(!s||!window.confirm(`\u201C${v.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let P=_();if(P)try{let M=await s("exec-preset-delete",{expected_revision:P.revision,id:v.id});h(M),M&&M.conflict&&ee("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{ee("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function Ee(v=!1){if(!s||!i)return;let P=_();if(!P)return;let M=v||i.id===null,W={expected_revision:P.revision,...M?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let J=await s(M?"exec-preset-create":"exec-preset-update",W);if(h(J),J&&J.conflict){c=!0,ve();return}if(J&&J.applied){i=null,c=!1,ve();return}ee("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{ee("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function ie(v){return l`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${fo(v.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${v.key}
        ?disabled=${v.disabled}
        @change=${P=>{if(!i)return;let M=P.target.value;M?i.settings[v.key]=M:delete i.settings[v.key],(v.key==="impl_runtime"||v.key==="impl_model"||v.key==="impl_effort"||v.key==="orchestration_model")&&j(),c=!1,ve()}}
      >
        ${ss(v.groups,v.selected,po[v.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function he(){if(!i)return"";let v=Se=>typeof i?.settings[Se]=="string"?i.settings[Se]:"",P=jr({selectedOf:v,effectiveOf:v,runner_catalog:$(),controller_runtime:A()}),M=_n.flatMap(Se=>Se.keys).filter(Se=>typeof i?.settings[Se]=="string").length,W=Se=>{let Te=P.find(dt=>dt.key===Se);return Te?ie(Te):""},J=_(),Me=i.id!==null&&J!==null&&!J.presets.some(Se=>Se.id===i?.id);return l`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${Se=>{i&&(i.name=Se.target.value,c=!1)}}
        />
      </label>
      ${c?l`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${Me?l`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      <section class="exec-preset-editor__core" data-preset-core>
        ${co.map(W)}
      </section>
      <details class="exec-preset-editor__advanced" data-preset-advanced>
        <summary>고급 설정 — ${M}개 변경됨</summary>
        ${_n.map(Se=>l`<section
              class="exec-preset-editor__group"
              data-preset-group=${Se.id}
            >
              <h4>${Se.label}</h4>
              ${Se.keys.map(W)}
            </section>`)}
      </details>
      <div class="exec-preset-editor__actions">
        ${Me?l`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{Ee(!0)}}
            >
              새 프리셋으로 저장
            </button>`:l`<button
              type="button"
              data-preset-save
              @click=${()=>{Ee(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{i=null,c=!1,ve()}}
        >
          취소
        </button>
      </div>
    </div>`}function ke(){let v=_(),P=v?v.presets.filter(J=>J?.migration_pending!==!0):[],M=U()||"",W=I(M);return l`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${te}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${v===null?l`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:P.length===0?l`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:P.map(J=>{let Me=D(J),Se=I(J.id),Te=J.id===M,dt=Se.missing?"\uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Se.incompatible?"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"",at=typeof J.reference_count=="number",tt=at?J.reference_count:null,_t=Array.isArray(J.reference_summary)?J.reference_summary.map($t=>$t?.display_name||$t?.workspace_key).filter(Boolean).join(", "):"";return l`<article
                class="exec-preset-card"
                data-preset-id=${J.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${J.name}</strong>
                  ${Te?l`<span
                        class="exec-defaults__vd-badge"
                        data-workspace-default-badge
                        >워크스페이스 기본</span
                      >`:""}
                  <span>${Me.count}</span>
                  <span data-preset-references=${J.id}
                    >${at?`\uCC38\uC870 ${tt}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${Se.incompatible?l`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${Me.choices}</small>
                  ${_t?l`<small data-preset-impact=${J.id}
                        >업데이트 영향: ${_t}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  ${Te?l`<button
                        type="button"
                        data-workspace-preset-release=${J.id}
                        @click=${()=>{x("")}}
                      >
                        기본 해제
                      </button>`:l`<button
                        type="button"
                        data-workspace-preset-assign=${J.id}
                        ?disabled=${!Se.viable}
                        title=${dt}
                        @click=${()=>{x(J.id)}}
                      >
                        기본으로
                      </button>`}
                  <button
                    type="button"
                    data-preset-edit=${J.id}
                    @click=${()=>Y(J)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${J.id}
                    ?disabled=${tt===null||tt>0||J.reference_scan_complete===!1}
                    title=${tt===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":tt>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":J.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{se(J)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${v!==null&&M&&W.missing?l`<article class="exec-preset-card" data-workspace-preset-missing>
            <div class="exec-preset-card__main">
              <strong>워크스페이스 기본 프리셋을 찾을 수 없습니다</strong>
              <span class="exec-defaults__vd-badge" data-workspace-default-badge
                >워크스페이스 기본</span
              >
              <small>
                참조 ${M} · 실행이 차단됩니다. 기본을 해제하거나 다른
                프리셋을 지정하세요.
              </small>
            </div>
            <div class="exec-preset-card__actions">
              <button
                type="button"
                data-workspace-preset-release=${M}
                @click=${()=>{x("")}}
              >
                기본 해제
              </button>
            </div>
          </article>`:""}
      ${he()}
    </section>`}function Qe(){let v=u().workspace_info;return v&&typeof v=="object"?v:{}}function Je(v,P){return l`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${v}"
      >${P}</span
    >`}function Le(v){let P=v?Cp(v.cmd):"",M=v?Ep(v.timeout_ms):"",W=o&&o()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${P?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${P}</span>
            ${Je("config","config")}
            ${M?l`<span class="exec-defaults__vd-meta"
                  >timeout ${M}</span
                >`:""}
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            ${Je("absent","\uC548 \uD568")} 검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${W}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}let De=!1,$e=!1,fe=!1,be=null;async function me(){if(s){$e=!0,fe=!1,ve();try{let v=await Promise.resolve(s("get-worker-system-prompt",{}));!v||typeof v!="object"||Array.isArray(v)?fe=!0:be=v}catch{fe=!0}finally{$e=!1,ve()}}}function G(){if(De=!De,De&&!be){me();return}ve()}function K(){return l`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${De?"true":"false"}
          @click=${G}
        >
          ${De?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${De?Ie():""}
    </section>`}function Ie(){let v=Br({loading:$e,error:fe});if(v)return v;if(!be)return"";let P=Array.isArray(be.variants)?be.variants:[];return l`<div class="exec-defaults__sp-body">
      ${be.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${be.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${P.map(M=>l`<div class="exec-defaults__sp-variant" data-variant=${M.key}>
            <div class="exec-defaults__sp-cond">${M.condition}</div>
            ${nr(M.label,M.system_prompt)}
          </div>`)}
    </div>`}function ce(v){if(typeof v!="number"||!Number.isFinite(v))return"";let P=v/6e4;return Number.isInteger(P)?`timeout ${P}\uBD84`:`timeout ${Math.round(v/1e3)}\uCD08`}function le(v){let P=typeof v.base_sha=="string"?v.base_sha:"",M=`${v.source_path||"repo-ops/config.toml"} @ ${v.base_ref||"?"}${P?`@${P.slice(0,7)}`:""}`;return l`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">
        저장소 작업 선언
        <span class="exec-defaults__vd-src">${M}</span>
      </p>
      <div class="exec-defaults__lane" data-lane="verify">
        <span class="exec-defaults__lane-k">머지 전 검증</span>
        <span class="exec-defaults__lane-v"
          >${v.verify?l`<code class="exec-defaults__vd-cmd"
                  >${v.verify.script}</code
                >${Je("config",ce(v.verify.timeout_ms))}`:l`선언 없음${Je("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${v.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="exec-defaults__lane" data-lane="deploy">
        <span class="exec-defaults__lane-k">머지 후 배포</span>
        <span class="exec-defaults__lane-v"
          >${v.deploy?l`<code class="exec-defaults__vd-cmd"
                  >${v.deploy.script}</code
                >${Je("config",ce(v.deploy.timeout_ms))}`:l`선언 없음${Je("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${v.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function C(v){let P=v.repo_ops&&typeof v.repo_ops=="object"?v.repo_ops:null;return P&&P.status==="resolved"?le(P):P&&(P.status==="pending"||P.status==="error")?l`<section class="exec-defaults__vd" data-seam="repo-ops">
        <p class="exec-defaults__vd-title">
          저장소 작업 선언
          <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
        </p>
        <div
          class="exec-defaults__vd-line exec-defaults__vd-absent"
          data-seam="repo-ops-status"
        >
          ${P.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${P.error_code?l` — <code>${P.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증 설정
        <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
      </p>
      ${Le(v.verify_cmd)}
    </section>`}async function q(v){if(!s)return;let P=await s("worker-auto-repair-toggle",{on:v,expected_revision:f()});if(T(P),P&&P.conflict){let M=await s("worker-auto-repair-toggle",{on:v,expected_revision:f()});T(M)}ve()}let de={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5",whole_command_retry:"\uBA85\uB839 \uD1B5\uC9F8 \uC7AC\uC2DC\uB3C4",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function qe(v,P,M){return l`<div class="exec-defaults__policy-group" data-policy=${M}>
      <div class="exec-defaults__policy-label">${v}</div>
      <ul class="exec-defaults__policy-list">
        ${P.map(W=>l`<li data-token=${W}>
              ${de[W]||W}
            </li>`)}
      </ul>
    </div>`}function Re(){let v=u(),P=v.auto_repair!==!1,M=v.repo_operation_policy&&typeof v.repo_operation_policy=="object"?v.repo_operation_policy:null,W=Array.isArray(v.repo_operations)?v.repo_operations:[],J=W.find(Te=>Te.state==="repairing"),Me=W.filter(Te=>Te.state==="failed"||Te.state==="repairing"),Se=Me.length?Math.min(...Me.map(Te=>typeof Te.repair?.remaining=="number"?Te.repair.remaining:0)):M?.auto_repair?.budget_per_completion_chain??1;return l`<section class="exec-defaults__repair" data-seam="auto-repair">
      <p class="exec-defaults__vd-title">
        자동 해결
        <span class="exec-defaults__vd-ro"
          >자동화(대기열·머지)와 독립된 스위치</span
        >
      </p>
      <label class="exec-defaults__repair-toggle">
        <input
          type="checkbox"
          class="exec-defaults__repair-input"
          .checked=${P}
          @change=${Te=>{q(Te.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="exec-defaults__repair-state">
        <span class="exec-defaults__repair-value" data-seam="auto-repair-value"
          >${P?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="exec-defaults__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${Se}회</span
        >
        <span
          class="exec-defaults__repair-session"
          data-seam="auto-repair-session"
          >${J?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${J.repair?.owner_bead||J.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${M?l`<details class="exec-defaults__policy" data-seam="policy-lists">
            <summary>
              Worker 자동 처리 기준
              <span class="exec-defaults__policy-count"
                >자동 ${(M.worker_automatic||[]).length} · 해결 세션
                ${(M.auto_repair?.eligible||[]).length} (체인당
                ${M.auto_repair?.budget_per_completion_chain??1}회) ·
                금지 ${(M.never_automatic||[]).length}</span
              >
            </summary>
            ${qe("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",M.worker_automatic||[],"worker-automatic")}
            ${qe(`\uC790\uB3D9 \uD574\uACB0 \uC138\uC158 (\uC644\uB8CC \uCCB4\uC778\uB2F9 \uCD5C\uB300 ${M.auto_repair?.budget_per_completion_chain??1}\uD68C)`,M.auto_repair?.eligible||[],"auto-repair-eligible")}
            ${qe("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",M.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}function ve(){Ue(l`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${N}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${ke()} ${C(Qe())}
            ${Re()} ${K()}
          </div>
        </div>
      `,a)}let xe=!1,Ke=()=>{xe=!1},Be=v=>{v.target===v.currentTarget&&N()};a.addEventListener("close",Ke),a.addEventListener("cancel",Ke),a.addEventListener("click",Be);let He=null;r&&r.subscribe&&(He=r.subscribe(()=>{xe&&ve()}));let L=null;n&&n.subscribe&&(L=n.subscribe(()=>{xe&&ve()}));function z(){xe||(xe=!0,ve(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function N(){xe&&(xe=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:z,close:N,destroy(){xe=!1,a.removeEventListener("close",Ke),a.removeEventListener("cancel",Ke),a.removeEventListener("click",Be),He&&(He(),He=null),L&&(L(),L=null),a.remove()}}}function is(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ho(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function ls(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Rp(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:is(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function sl(e,t){let r=Rp(e,t);return r?l`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?l`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?pt(r.deploy.at):""}
            >${ls(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${ho(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function zr(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${pt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${pt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Ip(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function mn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function cs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Gt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,_)=>(f.requested_at||0)-(_.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?Ip(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:u}}function or(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return l`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?l`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?l`<code>백업: ${n}</code>`:t.error?l`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?l`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?l`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}function bo(e){let t=e.draggable&&!e.done,r=t&&e.lane==="queue",n=Array.isArray(e.badges)?e.badges:[],s=gt(e.usage),o=Pt(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action,c=e.lane==="done"&&!i,u=c?Tt(e.done_at):"",f=e.selectable?l`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC120\uD0DD`}
        .checked=${e.selected===!0}
      />`:"",_=r?l`<button
        type="button"
        class="worker-mini__grip"
        draggable="true"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC21C\uC11C \uBCC0\uACBD`}
        title="순서 변경"
      >
        ⠿
      </button>`:t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",h=e.worker_serial===!0?l`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?l`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",T=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,E=l`<span class="worker-mini__title">${e.title}</span>`,U=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",x=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",Y=n.map(ke=>ke===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ke}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ke===e.completion_badge&&e.completion_title||""}
          >${ke}</span
        >`),te=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",R=s.length>0?s.map(ke=>l`<span class="worker-usage" title=${ke.tooltip}
              >${ke.label}</span
            >`):o?l`<span class="worker-usage" title=${qr(e.usage)}
            >${o}</span
          >`:"",I=a?l`<span class="merge-step"
        >${a.label}<span class="merge-step__n"
          >${a.index}/${a.total}</span
        ></span
      >`:"",A=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",j=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",D=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",se=e.discard,Ee=se?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${se?.attempt_id||""}
          data-operation-id=${se?.operation?.operation_id||""}
          data-discard-mode=${se?.confirmation||"unmerged"}
          ?disabled=${se?!se.enabled:e.discard_enabled===!1}
          title=${se?se.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${se?.label||"\uD3D0\uAE30"}
        </button>`:"",ie=e.revise_action?l`<button
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
        </button>`:"",he=!!(o||a||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||se?.operation||e.revise_action);return l`<div
    class="worker-mini${i?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${a?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${t&&!r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?l`<div class="worker-mini__row1">${T}${$}${E}</div>
          <div class="worker-mini__row2">
            ${R}${u?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${pt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${Y}${I}
            <span class="worker-mini__actions"
              >${A}${j}${D}${Ee}</span
            >
            ${zr(e)}
          </div>`:i?l`<div class="worker-mini__head">
              ${f}${_}${T}${$}${U}${x}${Y}${h}${te}
            </div>
            <div class="worker-mini__body">${E}</div>
            ${he?l`<div class="worker-mini__foot">
                  ${R}${I}
                  <span class="worker-mini__actions"
                    >${A}${j}${D}${Ee}${ie}</span
                  >
                  ${or(e)}
                </div>`:""}
            ${zr(e)}`:l`<div class="worker-mini__line">
              ${f}${_}${T}${$}${E}${U}${x}${Y}${h}${te}${R}${I}${A}${j}${D}${Ee}
            </div>
            ${or(e)} ${zr(e)}`}
  </div>`}function Lp(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?l`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?qn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?l`<span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
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
        ?disabled=${!t}
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":a?"quick_fix route\uB294 \uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${zr(e)}
  </div>`}function Yt(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?l`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return l`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?l`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:l`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":l`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?l`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?Lp(n):bo(n))}
          </div>`}
  </section>`}var ol=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],gn=ol.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function vo(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=ol.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function al(e){let t=gn.findIndex(r=>r.step===e);return gn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Rr(e){let t=gn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Op(e){let t=gn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:gn.length}}function ds(e){let t=Op(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var il={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},ll={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4."};function cl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Dp(e){for(let t of cl(e))if(il[t])return il[t];return null}function Mp(e){let t=null;for(let r of cl(e))ll[r]&&(t=ll[r]);return t}function us(e){let t=Dp(e),r=Mp(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}var dl=160;function Pp(e){return e.length>dl?`${e.slice(0,dl)}\u2026`:e}function Np(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${Pp(e.command)}</code>`:""}
  </div>`}function Fp(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function yo(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function ul(e){let t=e.failure?us(e.failure.reason):"";return l`<div class="worker-banners">
    ${e.failure?l`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?l`<button
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
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Np(e.failure.cause_detail)}
          ${Fp(e.failure.reason)}
          ${or({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function qp(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?yo(t-e.started_at):"\u2014",a=Wt(e),i=dr(e),c=gt(e.usage),u=Pt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,T=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${h?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?l`<span class="rtile__resumed" title=${i}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?l`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${T}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 기록 닫기"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:l`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?l`<button
                  type="button"
                  class="rtile__resume"
                  title="같은 세션으로 이어서 재개"
                  aria-label="재개"
                >
                  ▶
                </button>`:l`<button
                  type="button"
                  class="rtile__pause"
                  ?disabled=${e.can_pause===!1}
                  title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                  aria-label="일시정지"
                >
                  ⏸
                </button>`}
            ${T}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?l`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||c.length>0||u||f||_?l`<div class="rtile__meta">
          ${f?l`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?l`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?l`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map($=>l`<span class="worker-usage" title=${$.tooltip}
                    >${$.label}</span
                  >`):u?l`<span
                  class="worker-usage"
                  title=${qr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${zr(e)} ${or(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function wo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>qp(s,t,r))}
  </div>`}function mr(e){return l`<svg
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
  </svg>`}function ko(){return mr(Xt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function $o(){return mr(Xt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function pl(){return mr(Xt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function fl(){return mr(Xt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function _l(){return mr(Xt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ml(){return mr(Xt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function gl(){return mr(Xt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function hl(){return mr(Xt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var hn=1,Bp=6e4,Up={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},jp=new Set(["auto_merge","merged","merge","done"]),bl={running:3,paused:2,failed:1};function zp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Hp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),h=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let _=bl[u.run_state],h=bl[i];if(_>h||_===h&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:It(e,a.bead_id),can_pause:i==="running"&&f,can_resume:i!=="running"&&f&&!n.has(a.attempt_id)})}return o}function vl(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Et(e){return e&&typeof e=="object"?e:{}}function xo(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let x of s)x&&typeof x.root_dir=="string"&&a.set(x.root_dir,x);let i=[],c=[],u=[],f=[],_=[],h=new Map;for(let x of n){if(!x||typeof x.root_dir!="string")continue;let Y=x.root_dir,te=x.name||Y,R=a.get(Y),I=R&&typeof R.revision=="number"?R.revision:typeof x.revision=="number"?x.revision:0,A=Et(x.attempts),j=Et(x.bead_titles),D=Et(x.pr_observations),se=Et(x.admission),Ee=Et(x.revise_parked),ie=Et(x.merge_queue_state),he=Et(x.cleanup_failed),ke=Et(x.discard_operations),Qe=Array.isArray(x.merge_queue)?x.merge_queue:[],Je=new Set(Qe.filter(G=>G&&typeof G.bead_id=="string").map(G=>G.bead_id)),Le=new Map(Qe.filter(G=>G&&typeof G.bead_id=="string").map(G=>[G.bead_id,G])),De=Array.isArray(x.queue)?x.queue:[],$e=Array.isArray(x.done)?x.done:[],fe=new Map;for(let G of $e)G&&typeof G.bead_id=="string"&&typeof G.added_at=="number"&&fe.set(G.bead_id,G.added_at);let be=G=>({id:G,title:j[G]||G,root_dir:Y,workspace_name:te,expected_revision:I,draggable:!1}),me=new Set;for(let[G,K]of Hp(A,fe))me.add(G),c.push({...be(G),lane:"running",attempt_id:K.attempt_id,run_state:K.run_state,can_pause:K.can_pause,can_resume:K.can_resume,started_at:K.started_at,last_event_at:K.last_event_at,runner:K.runner,model:K.model,effort:K.effort,speed:K.speed,resumed_from:K.resumed_from,continuation_mode:K.continuation_mode,usage:K.usage,discard:Gt(ke,G,{attempt_id:K.attempt_id}),badges:K.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:K.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:K.run_state==="failed"});for(let G of Array.isArray(x.pr_wait)?x.pr_wait:[]){let K=G&&G.bead_id;if(typeof K!="string"||me.has(K))continue;me.add(K);let Ie=Et(D[K]),ce=Et(Ie.pr),le=Ie.gate?Et(Ie.gate):null,C=Je.has(K),q=Le.get(K)?.continuation_action||null,de=!!q&&q.continuation===null,qe=ie.active===K,Re=G.external===!0,ve=he[K]||null,xe=!!le&&le.base_badge==="\uCDA9\uB3CC",Ke=!!ve&&["child_sweep","branch_cleanup","parent_close"].includes(ve.step)&&!!le&&le.tier==="merged",Be=Re&&!!le&&le.tier==="merged",He=!!le&&["closed_unmerged","review","undecidable"].includes(le.tier),L=Gt(ke,K,{external:Re,merge_active:qe,merge_queued:C,merged:!!ve||le?.tier==="merged"}),z=!!L.operation;u.push({...be(K),lane:"pr_wait",pr_number:typeof ce.number=="number"?ce.number:null,pr_url:typeof ce.url=="string"?ce.url:void 0,external:Re,usage:It(A,K),badges:de?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ve?[Rr(ve.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Rr(ve.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof le?.gate_badge=="string"&&le.gate_badge.length>0?[le.gate_badge]:[],alert:!!ve||He,reason:ve?ds(ve.step):"PR \uB300\uAE30",merge_action:!C||de,merge_enabled:!z&&(de||le?.enabled===!0||xe||Ke||Be),merge_label:de?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Be||Ke?"\uC815\uB9AC \uC7AC\uAC1C":xe&&!Ke?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:de?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":z?L.error?`\uD3D0\uAE30 \uC2E4\uD328: ${L.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${L.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Be?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":xe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":le?.enabled===!0?`\uBA38\uC9C0 (${le.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${le?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:C&&!de,cancel_enabled:!qe,continuation_mismatch:q?.mismatch||null,discard:L,discard_action:L.action,discard_enabled:L.enabled,discard_title:L.title})}for(let G=0;G<De.length;G++){let K=De[G],Ie=K&&K.bead_id;if(typeof Ie!="string"||me.has(Ie))continue;me.add(Ie);let ce=Ee[Ie],le=Gt(ke,Ie),C=le.operation?le:null,q={...be(Ie),lane:"queue",draggable:!C,discard:C||void 0,reason:vl(se,Ie),queue_position:G+1,queue_index:G,queue_length:De.length,badges:ce?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ce,revise_action:!!ce,revise_enabled:!!ce&&!C,revise_title:ce?ce.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ce.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(q);let de=h.get(Y);de?de.push(q):h.set(Y,[q])}for(let G of Array.isArray(x.runnable)?x.runnable:[]){let K=G&&G.bead_id;typeof K!="string"||me.has(K)||(me.add(K),i.push({...be(K),title:G.title||j[K]||K,lane:"runnable",draggable:!0,reason:vl(se,K),created_at:G.created_at??void 0,updated_at:G.updated_at??void 0,labels:Array.isArray(G.labels)?G.labels:[],spec_reviewer:typeof G.spec_reviewer=="string"?G.spec_reviewer:void 0,plan_state:G.plan_state==="approved"||G.plan_state==="authored"?G.plan_state:"none",workflow:G.route?{route:G.route,chips:{route:G.route}}:null,place_index:De.length}))}for(let G of $e){let K=G&&G.bead_id;if(typeof K!="string"||me.has(K)||(me.add(K),o!==void 0&&typeof G.added_at=="number"&&G.added_at<o))continue;let Ie=zp(A,K);_.push({...be(K),lane:"done",done:!0,usage:It(A,K),done_at:typeof G.added_at=="number"?G.added_at:void 0,done_kind:Ie&&typeof Ie.done_kind=="string"?Ie.done_kind:null})}}let T=new Map;s.forEach((x,Y)=>{x&&typeof x.root_dir=="string"&&T.set(x.root_dir,Y)});let $=r&&r.running_sort==="repo"?"repo":"started";c.sort((x,Y)=>{if($==="repo"){let I=T.get(x.root_dir)??Number.MAX_SAFE_INTEGER,A=T.get(Y.root_dir)??Number.MAX_SAFE_INTEGER;if(I!==A)return I-A}let te=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,R=typeof Y.started_at=="number"&&Number.isFinite(Y.started_at)?Y.started_at:null;return te!==null&&R!==null&&te!==R?te-R:te===null&&R!==null?1:te!==null&&R===null?-1:x.id.localeCompare(Y.id)}),_.sort((x,Y)=>(Y.done_at??0)-(x.done_at??0));let E=s.length>0?s:n.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,exec_defaults:x&&x.exec_defaults,default_exec_preset_id:x&&x.default_exec_preset_id,runner_catalog:x&&x.runner_catalog})),U=[];for(let x of E)!x||typeof x.root_dir!="string"||U.push({root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:typeof x.slots=="number"&&x.slots>=hn?x.slots:hn,revision:typeof x.revision=="number"?x.revision:0,exec_defaults:Et(x.exec_defaults),default_exec_preset_id:typeof x.default_exec_preset_id=="string"?x.default_exec_preset_id:null,runner_catalog:Et(x.runner_catalog),items:h.get(x.root_dir)||[]});return{runnable:i,queue:f,queue_groups:U,running:c,pr_wait:u,done:_,automation:{total:U.length,both_on:U.filter(x=>x.auto_advance&&x.auto_merge).length}}}function Wp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Bp;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${pt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${Tt(e,t)}</span
        >`}</span
  >`}function bn(e){return l`<div class="mon-c__title">${e.title}</div>`}function vn(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function ps(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function So(e){let t=gt(e.usage),r=Pt(e.usage);return t.length>0?t.map(n=>l`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?l`<span class="mon-c__usage" title=${qr(e.usage)}
        >${r}</span
      >`:""}function Ao(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Gp(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${$o()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${ko()}
        </button>`}
    ${e.discard?.action?l`<button
          type="button"
          class="mon-op mon-op--discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-discard-mode=${e.discard.confirmation}
          ?disabled=${!e.discard.enabled}
          aria-label=${e.discard.label}
          title=${e.discard.title}
        >
          ${e.discard.label}
        </button>`:""}
    ${e.run_state==="failed"?l`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${fl()}
        </button>`:""}
  </span>`}function Yp(e,t){let r=typeof e.started_at=="number"?yo(t-e.started_at):"";return l`${bn(e)}
    <div class="mon-c__meta">
      ${Ao(e)}${Wp(e.last_event_at,t)}${vn(e)}${ps(e)}
      ${Wt(e)?l`<span class="mon-c__model">${Wt(e)}</span>`:""}
      ${dr(e)?l`<span
            class="rtile__resumed"
            title=${dr(e)}
            >↻</span
          >`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${So(e)}${Gp(e)}${or(e)}
    </div>`}function Vp(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Tt(e.updated_at);return l`${bn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${vn(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?l`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?l`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Fn(e.labels,null).map(c=>l`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${ps(e)}
      ${i?l`<span title=${`\uC218\uC815 ${pt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?l`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="worker-card__place"
          data-bead-id=${e.id}
          title="대기 큐 맨 뒤에 추가"
        >
          대기로 ↴
        </button>
      </span>
    </div>`}function Kp(e){let t=!!e.discard?.operation;return l`${bn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${vn(e)}
      ${Ao(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="mon-op mon-op--up"
          ?disabled=${t||(e.queue_position??1)<=1}
          aria-label="한 칸 앞으로"
          title="한 칸 앞으로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon-op mon-op--down"
          ?disabled=${t||(e.queue_index??0)>=(e.queue_length??1)-1}
          aria-label="한 칸 뒤로"
          title="한 칸 뒤로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon-op mon-op--remove"
          ?disabled=${t}
          aria-label="대기 큐에서 제거"
          title="대기 큐에서 제거"
        >
          ✕
        </button>
        ${t?l`<button
              type="button"
              class="worker-mini__discard"
              data-bead-id=${e.id}
              data-attempt-id=${e.discard?.attempt_id||""}
              data-operation-id=${e.discard?.operation?.operation_id||""}
              data-discard-mode=${e.discard?.confirmation||"unmerged"}
              ?disabled=${!e.discard?.enabled}
              aria-label=${e.discard?.label||"\uD3D0\uAE30"}
              title=${e.discard?.title||""}
            >
              ${e.discard?.label||"\uD3D0\uAE30"}
            </button>`:""}
      </span>
    </div>
    ${or(e)}
    ${e.revise_action?l`<div class="mon-c__tail">
          <button
            type="button"
            class="worker-mini__revise-fix"
            data-bead-id=${e.id}
            ?disabled=${e.revise_enabled===!1}
            title=${e.revise_title||""}
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
          </button>
        </div>`:""}`}function Zp(e){let t=!!(Pt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return l`${bn(e)}
    <div class="mon-c__meta">
      ${vn(e)}${ps(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Ao(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?l`<div class="mon-c__tail">
          ${So(e)}
          ${e.merge_action?l`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?l`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?l`<button
                type="button"
                class="worker-mini__discard"
                data-bead-id=${e.id}
                data-attempt-id=${e.discard?.attempt_id||""}
                data-operation-id=${e.discard?.operation?.operation_id||""}
                data-discard-mode=${e.discard?.confirmation||"unmerged"}
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_title}
              >
                ${e.discard?.label||"\uD3D0\uAE30"}
              </button>`:""}
          ${or(e)}
        </div>`:""}`}function Xp(e,t){let r=e.done_kind||"",n=r?Up[r]||r:"",s=Tt(e.done_at,t);return l`${bn(e)}
    <div class="mon-c__meta">
      ${vn(e)}${ps(e)}
      ${n?l`<span
            class="mon-live__kind${jp.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${So(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${pt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function yl(e,t){return e.lane==="running"?Yp(e,t):e.lane==="runnable"?Vp(e):e.lane==="queue"?Kp(e):e.lane==="pr_wait"?Zp(e):Xp(e,t)}function wl(e){let t=String(e.revision);return l`<header
    class="mon-group__hd${e.items.length===0?" is-empty":""}"
    data-root-dir=${e.root_dir}
    data-revision=${t}
  >
    <span class="mon-group__name" title=${e.root_dir}>${e.name}</span>
    <span class="mon-group__count">${e.items.length}</span>
    <span class="mon-group__ops">
      <button
        type="button"
        class="mon-ctl mon-ctl--advance${e.auto_advance?" is-active":""}"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        data-on=${e.auto_advance?"false":"true"}
        aria-pressed=${e.auto_advance?"true":"false"}
        title=${e.auto_advance?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      >
        ${e.auto_advance?$o():ko()}
        <span class="mon-ctl__label">자동화</span>
      </button>
      <button
        type="button"
        class="mon-ctl mon-ctl--merge-auto${e.auto_merge?" is-active":""}"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        data-on=${e.auto_merge?"false":"true"}
        aria-pressed=${e.auto_merge?"true":"false"}
        title=${e.auto_merge?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uB044\uACE0 \uC774 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uC744 \uBE44\uC6C1\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4"}
      >
        ${_l()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${ml()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${hn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
      <button
        type="button"
        class="mon-ctl mon-ctl--exec"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        aria-haspopup="dialog"
        aria-label=${`${e.name} \uC2E4\uD589 \uAE30\uBCF8\uAC12`}
        title="실행 기본값"
      >
        ${gl()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function kl(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Ht.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?pl():hl()}
      <span class="mon-auto-all__label"
        >${n?"\uC804\uCCB4 \uC790\uB3D9\uD654 \uBA48\uCDA4":`\uC804\uCCB4 \uC790\uB3D9\uD654 ${r}/${t}`}</span
      >
    </button>
    <div class="mon-kpi">
      <span
        class="mon-running-sort-group"
        role="group"
        aria-label="실행중 정렬"
      >
        <button
          type="button"
          class="mon-running-sort${s==="started"?" is-active":""}"
          data-sort="started"
          aria-pressed=${s==="started"?"true":"false"}
        >
          시작순
        </button>
        <span aria-hidden="true">|</span>
        <button
          type="button"
          class="mon-running-sort${s==="repo"?" is-active":""}"
          data-sort="repo"
          aria-pressed=${s==="repo"?"true":"false"}
        >
          레포순
        </button>
      </span>
      <span class="mon-kpi__chip mon-kpi__chip--running"
        >실행 <b>${e.counts.running}</b></span
      >
      <span class="mon-kpi__chip mon-kpi__chip--queue"
        >대기 <b>${e.counts.queue}</b></span
      >
      <span class="mon-kpi__chip mon-kpi__chip--pr"
        >PR <b>${e.counts.pr_wait}</b></span
      >
      <select
        class="mon-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${e.done_range}
      >
        ${Ht.map(i=>l`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>l`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function $l(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function xl(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return gt(jn(t));let r={};for(let i of er)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let f of er){let _=c[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Pt(r):null}var Al="bdui.monitor.done-range",Tl="bdui.monitor.running_sort";function Qp(){try{let e=window.localStorage.getItem(Al);return Rt(e)?e:At}catch{return At}}function Jp(e){try{window.localStorage.setItem(Al,e)}catch{}}function ef(){try{return window.localStorage.getItem(Tl)==="repo"?"repo":"started"}catch{return"started"}}function tf(e){try{window.localStorage.setItem(Tl,e)}catch{}}var El="tab:monitor:pipeline",rf=1e3,nf=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Sl(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return l`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}"
    draggable=${r?"true":"false"}
    data-issue-id=${e.id}
    data-root-dir=${e.root_dir}
    data-revision=${String(e.expected_revision)}
    data-lane=${e.lane}
    data-attempt-id=${e.attempt_id||""}
    data-place-index=${String(e.place_index??"")}
    data-queue-index=${String(e.queue_index??"")}
    data-queue-length=${String(e.queue_length??"")}
  >
    ${yl(e,t)}
  </div>`}function Cl(e,t){let r=ot("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),f=t.confirm||(L=>typeof globalThis.confirm!="function"||globalThis.confirm(L)),_=Qp(),h=ef();function T(){let L=Ht.find(z=>z.value===_);return L?L.label:""}let $=document.createElement("div");$.className="mon",e.appendChild($);let E=xo(null,null),U=null,x=new Map,Y=new Set;function te(L){return E.queue_groups.find(z=>z.root_dir===L)||null}let I=as(e,{queueStore:{get(){if(!U)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let L=x.get(U);if(L)return L;let z=te(U),N=s&&s.get?s.get():null,v=(Array.isArray(N)?N:[]).find(P=>P&&P.root_dir===U);return{revision:z?z.revision:0,exec_defaults:z?z.exec_defaults:{},default_exec_preset_id:z?z.default_exec_preset_id:null,runner_catalog:z?z.runner_catalog:null,workspace_info:v?v.workspace_info:void 0}},set(L){U&&x.set(U,L);for(let z of Array.from(Y))z()},subscribe(L){return Y.add(L),()=>Y.delete(L)}},presetStore:a,transport:o?(L,z)=>o(L,L==="worker-queue-set-default-exec-preset"||L==="get-worker-system-prompt"?{...z||{},root_dir:U}:z):void 0,getWorkspacePath:()=>U||void 0}),A=null,j=null;async function D(L,z,N,v,P=!0){if(!o||!N)return null;let M=await o(L,{...z,root_dir:N,expected_revision:v});if(M&&M.conflict&&P){M.queue&&x.set(N,M.queue);let W=M.queue&&typeof M.queue.revision=="number"?M.queue.revision:v;M=await o(L,{...z,root_dir:N,expected_revision:W})}return M&&M.queue&&N&&x.set(N,M.queue),M}function se(L,z){let N=x.get(L),v=s&&s.get?s.get():null,P=(Array.isArray(v)?v:[]).find(W=>W?.root_dir===L);return(N||P)?.merge_queue?.find(W=>W.bead_id===z)?.continuation_action}async function Ee(L,z,N,v){let P=await D(L,z,N,v),M=x.get(N)?.revision??P?.queue?.revision??v;return Jt(P,(W,J)=>D(L,{...z,continuation:W,decision_token:J},N,M,!1),{refresh:W=>D(L,z,N,W?.queue?.revision??x.get(N)?.revision??M,!1)})}async function ie(L,z,N,v){let P=await Jt({continuation_mismatch:v},(W,J)=>D("worker-merge-queue-add",{bead_id:z,continuation:W,decision_token:J},L,N,!1)),M=P?.queue?.merge_queue?.find(W=>W.bead_id===z)?.continuation_action;P?.applied!==!0&&M?.continuation===null&&M.mismatch&&await ie(L,z,P.queue.revision,M.mismatch)}async function he(L,z,N){let v=await D("worker-discard",L,z,N);if(v&&v.discarded===!0){ee(cs(v),"success",5e3);return}if(v&&v.reason){ee(`\uD3D0\uAE30 \uC2E4\uD328: ${v.reason}`,"error");return}if(v&&v.accepted&&v.pending==="merged_revert"){ee("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(v&&v.accepted){ee(`\uD3D0\uAE30 \uC9C4\uD589: ${v.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}v&&!v.conflict&&ee("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ke(L,z,N){return!o||!N?null:await o(L,{...z,root_dir:N})}async function Qe(L){if(!o||!L&&!f("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let z=await o("monitor-auto-toggle",{on:L}),N=z&&Array.isArray(z.failed)?z.failed:[];N.length>0&&ee(`\uC790\uB3D9\uD654 ${L?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${N.map(v=>v.root_dir).join(", ")}`,"error",3200)}async function Je(){let L=new Map;for(let z of E.pr_wait)L.has(z.root_dir)||L.set(z.root_dir,z.expected_revision);for(let[z,N]of L)await D("worker-merge-queue-add-all",{},z,N)}let Le=null,De=!1,$e=null;function fe(){$e!==null&&clearTimeout($e),$e=setTimeout(()=>{$e=null,De=!1},0)}function be(L){let z=L.target;return typeof z?.closest=="function"?z.closest(".mon-group"):null}function me(L){let z=be(L);return!z||!Le?null:(z.getAttribute("data-root-dir")||"")===Le.root_dir?z:null}function G(){for(let L of Array.from($.querySelectorAll(".mon-group--drag-over")))L.classList.remove("mon-group--drag-over")}function K(L){let z=L.target,N=typeof z?.closest=="function"?z.closest('.mon-card[draggable="true"]'):null;if(N){Le={bead_id:N.getAttribute("data-issue-id")||"",lane:N.getAttribute("data-lane")||"",root_dir:N.getAttribute("data-root-dir")||"",revision:Number(N.getAttribute("data-revision")||0)||0,queue_index:Number(N.getAttribute("data-queue-index")),queue_length:Number(N.getAttribute("data-queue-length")),place_index:Number(N.getAttribute("data-place-index"))},De=!0;try{L.dataTransfer?.setData("text/plain",Le.bead_id),L.dataTransfer&&(L.dataTransfer.effectAllowed="move")}catch{}}}function Ie(L){let z=me(L);z&&(L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move"),z.classList.add("mon-group--drag-over"))}function ce(L){be(L)?.classList.remove("mon-group--drag-over")}function le(){Le=null,G(),fe()}function C(L){let z=me(L),N=Le;if(Le=null,G(),!z||!N||!N.bead_id)return;L.preventDefault();let v=L.target,P=typeof v?.closest=="function"?v.closest('.mon-card[data-lane="queue"]'):null,M=P&&z.contains(P)?Number(P.getAttribute("data-queue-index")):NaN;if(N.lane==="runnable"){let Me=Number.isFinite(M)?M:N.place_index;if(!Number.isFinite(Me))return;D("worker-queue-place",{bead_id:N.bead_id,index:Me},N.root_dir,N.revision);return}if(N.lane!=="queue"||P&&P.getAttribute("data-issue-id")===N.bead_id)return;let W=N.queue_index,J=Number.isFinite(M)?W>M?M:M-1:N.queue_length-1;!Number.isFinite(J)||J<0||J===W||D("worker-queue-reorder",{bead_id:N.bead_id,to_index:J},N.root_dir,N.revision)}function q(L){let z={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done};return l`${kl({automation:E.automation,counts:{running:E.running.length,queue:E.queue.length,pr_wait:E.pr_wait.length},running_sort:h,done_range:_,token_total:xl(E.done),token_tooltip:$l(T())})}
      <div class="worker-lanes mon-lanes">
        ${nf.map(N=>{let v=z[N.lane],P=N.lane==="queue"?E.queue_groups.length>0?l`${E.queue_groups.map(M=>l`<div
                        class="mon-group"
                        data-root-dir=${M.root_dir}
                      >
                        ${wl(M)}
                        <div class="mon-group__list">
                          ${M.items.map(W=>Sl(W,L))}
                        </div>
                      </div>`)}`:void 0:v.length>0?l`${v.map(M=>Sl(M,L))}`:void 0;return Yt({id:`monitor-${N.lane}`,lane:N.pane,title:N.lane==="done"?`\uC644\uB8CC\xB7${T()}`:N.title,items:v,empty:N.empty,body:P,live:N.lane==="running"&&v.length>0,header_control:N.lane==="pr_wait"&&v.length>0?l`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function de(){let L=s&&s.get?s.get():null,z=s&&s.getWorkspacesState?s.getWorkspacesState():[],N=u();E=xo(L,z,{done_since:kr(_,N),running_sort:h}),Ue(q(N),$)}function qe(L,z){let N=i?i():void 0;if(!z||!N||z===N||!c){n(L);return}c(z).then(()=>{n(L)}).catch(v=>{r("workspace switch for %s failed: %o",z,v)})}function Re(L){return{root_dir:L.getAttribute("data-root-dir")||"",revision:Number(L.getAttribute("data-revision")||0)||0}}function ve(L,z){let{root_dir:N,revision:v}=Re(L),P=L.getAttribute("data-issue-id")||"",M=z.dataset.attemptId||L.getAttribute("data-attempt-id")||"",W=z.classList;if(W.contains("worker-card__place")){D("worker-queue-place",{bead_id:P,index:Number(L.getAttribute("data-place-index")||0)||0},N,v);return}if(W.contains("mon-op--up")||W.contains("mon-op--down")){let J=Number(L.getAttribute("data-queue-index")||0)||0,Me=W.contains("mon-op--up")?J-1:J+1;if(Me<0)return;D("worker-queue-reorder",{bead_id:P,to_index:Me},N,v);return}if(W.contains("mon-op--remove")){D("worker-queue-remove",{bead_id:P},N,v);return}if(W.contains("mon-op--pause")){ke("worker-attempt-pause",{attempt_id:M},N);return}if(W.contains("mon-op--discard")){if(!f(mn(P,"unmerged")))return;he({bead_id:P,...M?{attempt_id:M}:{},...z.dataset.operationId?{operation_id:z.dataset.operationId}:{}},N,v);return}if(W.contains("mon-op--resume")){Ee("worker-attempt-resume",{attempt_id:M},N,v);return}if(W.contains("mon-op--dismiss")){D("worker-attempt-dismiss",{attempt_id:M},N,v);return}if(W.contains("worker-mini__merge")){let J=se(N,P);J?.mismatch&&J.continuation===null?ie(N,P,v,J.mismatch):D("worker-merge-queue-add",{bead_id:P},N,v);return}if(W.contains("worker-mini__merge-cancel")){D("worker-merge-queue-remove",{bead_id:P},N,v);return}if(W.contains("worker-mini__discard")){let J=z.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(mn(P,J)))return;he({bead_id:P,...M?{attempt_id:M}:{},...z.dataset.operationId?{operation_id:z.dataset.operationId}:{}},N,v);return}if(W.contains("worker-mini__revise-fix")){Ee("worker-revise-fix",{bead_id:P},N,v);return}W.contains("worker-mini__revise-approve")&&D("worker-revise-approve",{bead_id:P},N,v)}function xe(L){let z=De;De=!1;let N=L.target;if(!N||typeof N.closest!="function"||N.closest("dialog")||N.closest("a"))return;let v=N.closest(".mon-running-sort");if(v){L.preventDefault(),h=v.getAttribute("data-sort")==="repo"?"repo":"started",tf(h),de();return}let P=N.closest(".mon-auto-all");if(P){L.preventDefault(),Qe(P.getAttribute("data-on")==="true");return}if(N.closest(".mon-merge-all")){L.preventDefault(),Je();return}let W=N.closest(".mon-ctl--advance");if(W){L.preventDefault();let{root_dir:at,revision:tt}=Re(W);D("worker-automation-toggle",{on:W.getAttribute("data-on")==="true"},at,tt);return}let J=N.closest(".mon-ctl--merge-auto");if(J){L.preventDefault();let{root_dir:at,revision:tt}=Re(J);D("worker-merge-auto-toggle",{on:J.getAttribute("data-on")==="true"},at,tt);return}let Me=N.closest(".mon-ctl--exec");if(Me){L.preventDefault(),U=Me.getAttribute("data-root-dir")||null,x.delete(U||""),I.open();return}let Se=N.closest(".mon-card");if(!Se)return;let Te=N.closest("button");if(Te){L.preventDefault(),ve(Se,Te);return}let dt=Se.getAttribute("data-issue-id");dt&&!z&&(L.preventDefault(),qe(dt,Se.getAttribute("data-root-dir")||""))}function Ke(L){let z=L.target;if(!z||typeof z.closest!="function")return;let N=z.closest(".mon-done-range");if(N){_=Rt(N.value)?N.value:At,Jp(_),de();return}let v=z.closest(".mon-slots__input");if(!v)return;let{root_dir:P,revision:M}=Re(v),W=Number(v.value);if(!Number.isFinite(W))return;let J=Math.max(hn,Math.floor(W));D("worker-queue-set-slots",{slots:J},P,M)}e.addEventListener("click",xe),e.addEventListener("change",Ke),e.addEventListener("dragstart",K),e.addEventListener("dragover",Ie),e.addEventListener("dragleave",ce),e.addEventListener("drop",C),e.addEventListener("dragend",le),s&&typeof s.subscribe=="function"&&(A=s.subscribe(()=>{try{x.clear(),de();for(let L of Array.from(Y))L()}catch{}}));function Be(){j!==null&&(clearInterval(j),j=null)}function He(){$e!==null&&(clearTimeout($e),$e=null)}return{load(){r("load"),de(),j===null&&(j=setInterval(()=>{try{de()}catch{}},rf))},pause(){Be()},clear(){Be(),He(),A&&(A(),A=null),e.removeEventListener("click",xe),e.removeEventListener("change",Ke),e.removeEventListener("dragstart",K),e.removeEventListener("dragover",Ie),e.removeEventListener("dragleave",ce),e.removeEventListener("drop",C),e.removeEventListener("dragend",le),I.destroy(),Y.clear(),e.replaceChildren()}}}function Rl(e,t,r){let n=ot("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return l`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${u==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${u==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
        <a
          href="#/monitor"
          class="ctl-tab ${u==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function i(){Ue(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Ue(l``,e)}}}var Il=["bug","feature","task","epic","chore"];function Ll(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Ol=["Critical","High","Medium","Low","Backlog"];function Dl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function T(){o.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",o.appendChild(I);for(let A of Il){let j=document.createElement("option");j.value=A,j.textContent=Ll(A),o.appendChild(j)}a.replaceChildren();for(let A=0;A<=4;A+=1){let j=document.createElement("option");j.value=String(A);let D=Ol[A]||"Medium";j.textContent=`${A} \u2013 ${D}`,a.appendChild(j)}}T();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function E(I){s.disabled=I,o.disabled=I,a.disabled=I,i.disabled=I,c.disabled=I,f.disabled=I,_.disabled=I,_.textContent=I?"Creating\u2026":"Create"}function U(){u.textContent=""}function x(I){u.textContent=I}function Y(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?o.value=I:o.value="";let A=window.localStorage.getItem("beads-ui.new.priority");A&&/^\d$/.test(A)?a.value=A:a.value="2"}catch{o.value="",a.value="2"}}function te(){let I=o.value||"",A=a.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),A.length>0&&window.localStorage.setItem("beads-ui.new.priority",A)}async function R(){U();let I=String(s.value||"").trim();if(I.length===0){x("Title is required"),s.focus();return}let A=Number(a.value||"2");if(!(A>=0&&A<=4)){x("Priority must be 0..4"),a.focus();return}let j=String(o.value||""),D=String(c.value||""),se={title:I};j.length>0&&(se.type=j),String(A).length>0&&(se.priority=A),D.length>0&&(se.description=D),E(!0);try{await t("create-issue",se)}catch{E(!1),x("Failed to create issue");return}te(),E(!1),$()}return r.addEventListener("cancel",I=>{I.preventDefault(),$()}),h.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),R())}),n.addEventListener("submit",I=>{I.preventDefault(),R()}),{open(){n.reset(),U(),Y();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var sf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ml(e){return String(e).padStart(2,"0")}function of(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function af(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Ml(n.getHours())}:${Ml(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${sf[n.getMonth()]} ${n.getDate()} ${o}`;return`${of(r,t)} \xB7 ${i}`}function lf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Pl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Nl(e){let t=!1,r=null,n=new Map;function s(){Ue(l``,e),e.hidden=!0}function o(){let c=Pl.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();Ue(l`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let _=n.get(f.key),h=typeof _.ageSeconds=="number"&&_.ageSeconds>600,T=h?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return l`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${_.windows.map($=>{let E=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,U=Math.min(100,Math.max(0,E)),Y=`resets ${af($.resetsAt,u)}${h?` \xB7 ${T}`:""}`;return l`<span
                class="usage-meter__window ${lf(U)}"
                style=${`--progress: ${U}%`}
                title=${Y}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${U}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function i(){let c=await Promise.all(Pl.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var cf="worker-ineligible";function To(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fl(e){return To(e).includes(cf)}var Eo="worker-serial";function yn(e){return To(e).includes(Eo)}var df=20,uf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},ql={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8",other:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"};function pf(e,t,r=df){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Bl(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function ff(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Ul(e){let t=e.filter(r=>r.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>l`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function jl(e,t="",r=!1){let n=us(e);return!n&&!t?"":l`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${n}</span>${t?l`<br />${t}`:""}
  </p>`}function _f(e){if(e.state!=="failed"||e.dismissed)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=typeof t.auto_budget=="number"?t.auto_budget:1,s=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"other",o=r<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||"other"}
      ?disabled=${o}
      title=${o?"\uC790\uB3D9 \uD574\uACB0 \uD69F\uC218\uB97C \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB3D9\uC73C\uB85C \uD574\uACB0\uD558\uC138\uC694":"\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uC2E4\uD328\uD55C \uBA85\uB839\uC744 \uADF8\uB300\uB85C \uB2E4\uC2DC \uB3CC\uB9AC\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)"}
    >
      ${ql[s]||ql.other}
    </button>
    <span class="worker-ev__btn-sub"
      >${o?"\uC790\uB3D9 \uD574\uACB0 \uD69F\uC218\uB97C \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB3D9\uC73C\uB85C \uD574\uACB0\uD558\uC138\uC694":`repair \uC138\uC158 1\uD68C\uB97C \uC501\uB2C8\uB2E4 \xB7 \uB0A8\uC74C ${r}/${n}`}</span
    >
    ${t.attempt_id?l`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function mf(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?pt(e.at):""}
      >${ls(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Bl(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${uf[t.kind]||t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${is(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ho(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Bl(e)}"
          >${ff(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
      </div>
      ${r?jl(n):""}
      ${_f(t)}
      ${Ul([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${is(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function gf(e){let t=e.cleanup,r=Rr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?pt(e.at):""}
      >${ls(e.at)||"\u2014"}</span
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
        ${al(t.step).map(n=>l`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${jl(t.reason,typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${Ul([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function hf(e){return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?l`<div class="worker-repo-drawer__empty">기록 없음</div>`:l`<ul class="worker-rail">
          ${e.events.map(t=>t.type==="cleanup"?gf(t):mf(t))}
        </ul>`}
  </section>`}function zl(e,t={}){let r=null;function n(){Ue(r?hf(r):l``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:pf(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var bf="tab:worker:ready",vf="tab:worker:blocked",yf="tab:worker:in-progress",wf="tab:worker:closed",wn=1,kf=new Set(["done","failed","orphaned","stopped","discarded"]);function Hl(e){return fn(e).path.length>0}var Yl="beads-ui.worker.candidate-filter",Co={show_blocked:!1,spec:"all"};function $f(){try{let e=window.localStorage.getItem(Yl);if(!e)return{...Co};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Co};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Co}}}function xf(e){try{window.localStorage.setItem(Yl,JSON.stringify(e))}catch{}}function Sf(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=r(i),u=n(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Af=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Vl="bdui.worker.candidate_sort",Tf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],fs="spec";function Ef(){try{let e=window.localStorage.getItem(Vl);return e==="board"||e==="created"||e==="spec"?e:fs}catch{return fs}}function Cf(e){try{window.localStorage.setItem(Vl,e)}catch{}}var Kl="bdui.worker.done-range";function Rf(){try{let e=window.localStorage.getItem(Kl);return Rt(e)?e:At}catch{return At}}function If(e){try{window.localStorage.setItem(Kl,e)}catch{}}var Lf="(max-width: 640px)",Zl="beads-ui.worker.lane-collapsed",kn={queue:!0,done:!0};function Of(){try{let e=window.localStorage.getItem(Zl);if(!e)return{...kn};let t=JSON.parse(e);return!t||typeof t!="object"?{...kn}:{queue:typeof t.queue=="boolean"?t.queue:kn.queue,done:typeof t.done=="boolean"?t.done:kn.done}}catch{return{...kn}}}function Df(e){try{window.localStorage.setItem(Zl,JSON.stringify(e))}catch{}}function Wl(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Mf(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(xr):(n.sort(Ln(r)),t==="board"?n:[...n.filter(Hl),...n.filter(s=>!Hl(s))])}function Pf(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Nf(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ff(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var qf=["closed_unmerged","review","undecidable"],Bf=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function Uf(e,t){for(let r of Bf)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function Gl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function jf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Ro(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function zf(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Hf(e,t,r,n,s=null,o=null,a=null,i=!1,c=null,u=!0,f=null,_=null,h=null,T={},$=!1){let E=!!c&&c.position>0,U=!!c?.continuation_action&&c.continuation_action.continuation===null,x=!!c&&c.active===!0,Y=c&&c.failure||null,te=r[e]||null,R=te&&te.gate?te.gate:null,I=te&&te.pr?te.pr:null,A=zf(h),j=jf(c?c.resolution:null),D=[];i&&D.push("\uC138\uC158");let se=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":j?j.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,Ee=Uf(i&&R&&R.tier==="closed_unmerged"?"\uB2EB\uD798":R&&R.gate_badge||"",se?null:o&&o.activity||null);if(se&&D.push(se),Ee.label&&D.push(Ee.label),R&&R.base_badge&&R.base_badge!==R.gate_badge&&D.push(R.base_badge),_&&D.push(_),n){let be=Rr(n.step);D.push(be?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${be}`:"\uC815\uB9AC \uBA48\uCDA4")}A&&D.push(A.badge),E&&!x&&D.push(`\uBA38\uC9C0 \uB300\uAE30 #${c.position}`),Y&&D.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Gl(Y)}`),U&&D.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&D.push(`\uC790\uB3D9 \uC81C\uC678: ${Gl(f)}`);let ie=!!R&&R.base_badge==="\uCDA9\uB3CC",he=!!R&&R.enabled===!0,ke=vo(o&&o.merge_progress?o.merge_progress.step:null),Qe=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!R&&R.tier==="merged",Je=i&&!!R&&R.tier==="merged",Le=i&&ie&&u===!1,De=Gt(T,e,{external:i,merge_active:x||!!ke,merge_queued:E,conflict_active:!!a,cleanup_active:!1,merged:!!n||R?.tier==="merged"}),$e=!!De.operation,fe=!Qe&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?ds(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:i,pr_number:I&&typeof I.number=="number"?I.number:null,pr_url:I&&typeof I.url=="string"?I.url:"",completion_badge:A?A.badge:null,completion_title:A?A.title:"",completion_repair_pr_url:A?A.repair_pr_url:"",completion_repair_pr_number:A?A.repair_pr_number:null,badges:D,live_badge:a==="paused"?null:j?.live||a==="running"?se:Ee.live?Ee.label:null,usage:s,alert:!!R&&qf.includes(R.tier)||!!n||!!Y||!!(A&&A.alert),merge_action:fe?!1:!E||U,timeline_action:fe,cancel_action:E&&!U,cancel_enabled:!x&&!(A&&A.lock_actions),cancel_title:A&&A.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":x?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:De,discard_action:De.action,merge_step:ke,discard_enabled:De.enabled,discard_title:De.title,merge_enabled:!ke&&!a&&!$e&&!(A&&A.lock_actions)&&!Le&&!fe&&(he||ie||Qe||Je),merge_label:U?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Qe||Je?"\uC815\uB9AC \uC7AC\uAC1C":ie&&!ke&&!Qe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:$e?De.error?`\uD3D0\uAE30 \uC2E4\uD328: ${De.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${De.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:U?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ke?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ke.label}`:Je?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Le?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Qe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ie?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":he?`\uBA38\uC9C0 (${R.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:R&&R.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${R&&R.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Io(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:_}=t,h=n?Dn(n,i):null,T=Pn({transport:r,uiOrderStore:i}),$=null,E=[],U=$f(),x=Ef(),Y=Rt(f)?f:Rf(),te=new Map;function R(){let p=Ht.find(w=>w.value===Y);return p?p.label:"\uC624\uB298"}let I=Of(),A=!1,j=new Set,D=new Set,se=new Set,Ee="ordinary",ie=!1,he=new Map,ke=[],Qe=document.createElement("div");Qe.className="worker-console";let Je=document.createElement("div");Je.className="worker-top";let Le=document.createElement("div");Le.className="worker-drawer-overlay",Le.hidden=!0;let De=document.createElement("div");De.className="worker-drawer-overlay__backdrop";let $e=document.createElement("div");$e.className="worker-drawer-host";let fe=document.createElement("div");fe.className="worker-drawer-host",fe.hidden=!0,Le.append(De,$e,fe);let be=document.createElement("div");be.className="worker-lanes-host",Qe.append(Je,Le,be),e.appendChild(Qe);let me=null,G=rs($e,{transport:r,sessionLogStore:a,onClose:()=>{me=null,Le.hidden=!0,Z()}}),K=zl(fe,{onClose:()=>{fe.hidden=!0,Le.hidden=!0,Z()}}),Ie=as(Qe,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:u});function ce(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:wn,queue:[],pr_wait:[],done:[]}}function le(){let p=ce();return typeof p.revision=="number"?p.revision:0}function C(p){p&&p.queue&&s&&s.set(p.queue)}function q(){let p=ce().queue;return Array.isArray(p)?p.length:0}async function de(p,w){if(!r)return;let S=await r("worker-queue-place",{bead_id:p,index:w,expected_revision:le()});C(S),S&&S.conflict&&await r("worker-queue-place",{bead_id:p,index:w,expected_revision:le()}).then(C)}async function qe(p,w){if(!r)return;let S=await r("worker-queue-reorder",{bead_id:p,to_index:w,expected_revision:le()});C(S),S&&S.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:w,expected_revision:le()}).then(C)}async function Re(p){if(!r)return;let w=await r("worker-queue-remove",{bead_id:p,expected_revision:le()});C(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:le()}).then(C)}async function ve(){if(!r||ie)return;let w=(Array.isArray(ce().queue)?ce().queue:[]).map(ue=>ue.bead_id).filter(ue=>se.has(ue));if(w.length===0)return;if(w.some(ue=>{let je=he.get(ue);return je!==!0&&je!==!1})){ee("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let S=Ee==="serial",ne=w.filter(ue=>he.get(ue)!==S);if(ne.length===0){se.clear(),Z(),ee("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}ie=!0,Z();let _e=[],ge=0;try{for(let ue of ne){let je=await Promise.resolve(r(S?"label-add":"label-remove",{id:ue,label:Eo})).catch(()=>[]),X=Array.isArray(je)?je[0]:je,b=X&&typeof X=="object"?X.labels:null;X&&typeof X=="object"&&X.id===ue&&Array.isArray(b)&&yn(b)===S?ge+=1:_e.push(ue)}if(_e.length===0){se.clear(),ee(`${ge}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}se.clear();for(let ue of _e)se.add(ue);ee(`${ne.length}\uAC1C \uC911 ${ge}\uAC1C \uBCC0\uACBD \xB7 ${_e.length}\uAC1C \uC2E4\uD328 (${_e.join(", ")})`,"error")}finally{ie=!1,Z()}}async function xe(p){if(!r||!p)return;let w=await r("worker-attempt-pause",{attempt_id:p});w&&w.paused===!1&&w.reason&&ee(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Ke(p){if(!r||!p)return;let w=async(ne={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:le(),...ne}),S=await w();C(S),S&&S.conflict&&(S=await r("worker-attempt-resume",{attempt_id:p,expected_revision:le()}),C(S)),S=await Jt(S,(ne,_e)=>w({continuation:ne,decision_token:_e}),{onResult:C,refresh:()=>w()}),S&&S.resumed===!1&&!S.conflict&&S.reason&&ee(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}async function Be(p){if(!r||!p)return;let w=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:le()});C(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:le()}),C(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&ee(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function He(p,w,S=!0){if(!r)return null;let ne=r,_e=await ne(p,{...w,expected_revision:le()});return C(_e),_e&&_e.conflict&&S&&(_e=await ne(p,{...w,expected_revision:le()}),C(_e)),_e}async function L(p){if(!r||!p)return;let w=ce().merge_queue?.find(ne=>ne.bead_id===p)?.continuation_action;if(w?.mismatch&&w.continuation===null){await z(p,w.mismatch);return}j.add(p),Z();let S;try{S=await He("worker-merge-queue-add",{bead_id:p})}finally{j.delete(p),Z()}!S||S.conflict||S.applied||ee("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function z(p,w){let S=await Jt({continuation_mismatch:w},(_e,ge)=>He("worker-merge-queue-add",{bead_id:p,continuation:_e,decision_token:ge},!1)),ne=S?.queue?.merge_queue?.find(_e=>_e.bead_id===p)?.continuation_action;if(S?.applied!==!0&&ne?.continuation===null&&ne.mismatch){await z(p,ne.mismatch);return}S&&S.applied===!1&&!S.conflict&&ee("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function N(p){if(!r)return;let w=await He("worker-merge-auto-toggle",{on:p});!w||w.conflict||ee(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function v(p){if(!r||!p)return;let w=await He("worker-merge-queue-remove",{bead_id:p});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&ee("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function P(){await He("worker-merge-queue-remove",{all:!0})}async function M(p,w=null,S="unmerged",ne=null){if(!r||!p)return;let _e=mn(p,S);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(_e)))return;let ue=await r("worker-discard",{bead_id:p,...w?{attempt_id:w}:{},...ne?{operation_id:ne}:{},expected_revision:le()});if(C(ue),ue&&ue.conflict&&(ue=await r("worker-discard",{bead_id:p,...w?{attempt_id:w}:{},...ne?{operation_id:ne}:{},expected_revision:le()}),C(ue)),ue&&ue.discarded===!0){ee(cs(ue),"success",5e3);return}if(ue&&ue.reason){ee(`\uD3D0\uAE30 \uC2E4\uD328: ${ue.reason}`,"error",2800);return}if(ue&&ue.accepted&&ue.pending==="merged_revert"){ee("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ue&&ue.accepted&&!ue.discarded){ee(`\uD3D0\uAE30 \uC9C4\uD589: ${ue.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ue&&!ue.conflict&&ee("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function W(p,w){if(!r||!w||D.has(w))return;D.add(w),Z();let S;try{let ne=async(_e={})=>await r(p,{bead_id:w,expected_revision:le(),..._e});S=await ne(),C(S),S&&S.conflict&&(S=await r(p,{bead_id:w,expected_revision:le()}),C(S)),p==="worker-revise-fix"&&(S=await Jt(S,(_e,ge)=>ne({continuation:_e,decision_token:ge}),{onResult:C,refresh:()=>ne()}))}finally{D.delete(w),Z()}if(!(!S||S.conflict)){if(S.ok){ee(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ee(`\uCC98\uBD84 \uAC70\uBD80: ${S.reason||""}`,"error",3e3)}}async function J(p){if(!r)return;let w=await r("worker-automation-toggle",{on:p,expected_revision:le()});C(w),w&&w.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:le()}).then(C)}async function Me(p){if(!r||!p)return;let w=await r("worker-repo-operation-repair",{operation_id:p});if(C(w),w&&w.ok===!1){ee(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&ee("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Se(p){if(!r||!p)return;let w=await r("worker-repo-operation-dismiss",{operation_id:p});C(w),w&&w.ok===!1&&ee(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function Te(p){if(!r||!Number.isFinite(p))return;let w=Math.max(wn,Math.floor(p)),S=await r("worker-queue-set-slots",{slots:w,expected_revision:le()});C(S),S&&S.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:le()}).then(C)}async function dt(p){if(!r)return;let w=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:le()});C(w),w&&w.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:le()}).then(C)}function at(){let p=ce(),w=h?h.selectBoardColumn(bf,"ready"):[],S=h?h.selectBoardColumn(vf,"blocked"):[],ne=h?h.selectBoardColumn(wf,"closed"):[],_e=h?h.selectBoardColumn(yf,"in_progress"):[],ge=new Map;for(let g of _e){let F=Nf(g);if(!F)continue;let ae=ge.get(F);ae?ae.push(g):ge.set(F,[g])}let ue=g=>{let F=Mn(ge.get(g)||[]);return F?F.title||F.id:null},je=p.bead_titles||{},X=new Map;for(let[g,F]of Object.entries(je))typeof F=="string"&&F.length>0&&X.set(g,F);for(let g of[...w,...S])X.set(g.id,g.title||g.id);he.clear();let b=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},H=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[g,F]of Object.entries(H))Array.isArray(F)&&he.set(g,yn(F));for(let g of[...w,...S]){let F=g.labels;if(!Array.isArray(F))continue;if(!he.has(g.id)){he.set(g.id,yn(F));continue}let ae=b[g.id],Ve=Qt(ae&&typeof ae=="object"?ae.updated_at:null),zt=Qt(g.updated_at);zt!==null&&Ve!==null&&zt>Ve&&he.set(g.id,yn(F))}let oe=new Map;for(let[g,F]of Object.entries(b))F&&typeof F=="object"&&oe.set(g,F);for(let g of[...w,...S])oe.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let Oe=g=>oe.get(g)||{},Ze=p.pr_wait||[],Ye=p.pr_observations||{},m=p.pr_activity||{},d=p.cleanup_failed||{},k=Object.entries(d).map(([g,F])=>({bead_id:g,step:F&&F.step?F.step:"",reason:F&&F.reason?F.reason:"",at:F&&typeof F.at=="number"?F.at:null,detail:F&&typeof F.detail=="string"?F.detail:null,output_tail:F&&typeof F.output_tail=="string"&&F.output_tail?F.output_tail:void 0,log_path:F&&typeof F.log_path=="string"&&F.log_path?F.log_path:void 0,retry_count:F&&typeof F.retry_count=="number"&&Number.isInteger(F.retry_count)&&F.retry_count>0?F.retry_count:0})),y=p.queue||[],O=new Set(y.map(g=>g.bead_id));for(let g of se)O.has(g)||se.delete(g);let re=new Set([...y.map(g=>g.bead_id),...Ze.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),Q=new Set(S.map(g=>g.id)),Ne=i?i.get()?.order||{}:{},Pe=new Set,Kt=[];for(let g of[...w,...S])re.has(g.id)||Pe.has(g.id)||Pf(g)||Fl(g.labels)||(Pe.add(g.id),Kt.push(g));E=Mf(Kt,x,Ne);let _s=p.admission||{},Mo=g=>{let F=_s[g];if(!F)return"";if(F.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof F.reason=="string"?F.reason:"",Ve=ae.indexOf(":");return Ve>0&&Ve<ae.length-1?`\u26D4 ${ae.slice(0,Ve)} (${ae.slice(Ve+1)})`:`\u26D4 ${ae}`},lc=E.map(g=>{let F=fn(g),ae=F.path.length>0,Ve=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",zt=!Ve&&ae&&!F.conflict,ar=Q.has(g.id),Ct=[];ar&&Ct.push(Ff(g)),Ve?Ct.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):F.conflict?Ct.push("spec_id_conflict"):ae||Ct.push("spec \uC5C6\uC74C");let En=Mo(g.id);return En&&Ct.push(En),{id:g.id,title:g.title||g.id,reason:Ct.join(" \xB7 "),draggable:zt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ve,status:g.status,blocked:ar,has_spec:ae}}),ms=Sf(lc,U),cc=ms.visible,dc=p.revise_parked||{},Hr=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Po=(g,F)=>g.map(ae=>{let Ve=F==="queue"?dc[ae.bead_id]:null,zt=F==="queue"?Gt(Hr,ae.bead_id):null,ar=zt?.operation?zt:null,Ct=F==="queue"?he.has(ae.bead_id)?he.get(ae.bead_id)||!1:null:!1,En=Ct===!0&&(Object.values(p.attempts||{}).some(Zt=>Zt&&Zt.bead_id!==ae.bead_id&&!kf.has(Zt.status))||Ze.some(Zt=>Zt.bead_id!==ae.bead_id)||Object.values(Hr).some(Zt=>Zt&&Zt.bead_id!==ae.bead_id&&Zt.phase!=="done")),ta=F==="done"?[]:[Mo(ae.bead_id)];return En&&ta.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:ae.bead_id,title:X.get(ae.bead_id)||ae.bead_id,reason:ta.filter(Boolean).join(" \xB7 "),draggable:F!=="done"&&!ar,done:F==="done",lane:F,selectable:F==="queue",selected:F==="queue"&&se.has(ae.bead_id),worker_serial:Ct,discard:ar,badges:Ve?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ve,revise_action:!!Ve,revise_enabled:!!Ve&&!ar&&!D.has(ae.bead_id),revise_title:Ve?Ve.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ve.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:F==="done"?It(p.attempts||{},ae.bead_id):null,done_at:F==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,...Oe(ae.bead_id)}}),No=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&No.set(g.bead_id,g.added_at);let Wr=p.attempts?Object.values(p.attempts):[],gs=new Set;for(let g of Wr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&gs.add(g.resumed_from);let hs=new Map;for(let g of Wr)hs.set(g.bead_id,g.attempt_id);let bs=new Map;for(let g of Wr)bs.set(g.attempt_id,g);function vs(g){let F=new Set,ae=g;for(;ae&&!F.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;F.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&bs.get(ae.resumed_from)||null}return!1}let $n=typeof p.declared_base=="string"?p.declared_base:null;function uc(g){let F=null;for(let ae of Wr)!ae||ae.bead_id!==g||vs(ae)||(F===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof F.started_at=="number"?F.started_at:0))&&(F=ae);return F&&typeof F.target_base=="string"?F.target_base:null}let Fo=[],qo=[],pc=g=>{let F=hs.get(g.bead_id)!==g.attempt_id,ae=No.get(g.bead_id),Ve=typeof ae=="number"&&ae>0&&typeof g.finished_at=="number"&&ae>=g.finished_at;return!F&&!Ve&&typeof g.dismissed_at!="number"},Bo=g=>{let F=typeof g.session_id=="string"&&g.session_id.length>0,ae=gs.has(g.attempt_id);return{eligible:F&&!ae,reason:F?ae?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Dt=null;for(let g of Wr){let F=g.status==="paused"&&!gs.has(g.attempt_id);if(g.status==="running"||F)qo.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:X.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:F,conflict_resolution:vs(g),base_exception:Ro($n,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Gt(Hr,g.bead_id,{attempt_id:g.attempt_id}),usage:It(p.attempts||{},g.bead_id),current_child:ue(g.bead_id),...Oe(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&pc(g)){let ae=Bo(g);Fo.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:X.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Gt(Hr,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ae.eligible,resume_reason:ae.reason,conflict_resolution:vs(g),base_exception:Ro($n,g.target_base),usage:It(p.attempts||{},g.bead_id),current_child:ue(g.bead_id),...Oe(g.bead_id)}),Dt=g}}let xn=[...Fo,...qo],Uo=null;if(Dt){let g=Bo(Dt),F=Dt.cause_detail;Uo={bead_id:Dt.bead_id,repo:Dt.repo||"",reason:Dt.cause||Dt.status,cause_detail:F&&typeof F.reason=="string"?{reason:F.reason,command:typeof F.command=="string"?F.command:null}:null,resume_attempt_id:Dt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Gt(Hr,Dt.bead_id,{attempt_id:Dt.attempt_id})}}let fc=new Set(xn.map(g=>g.bead_id)),ys=Array.isArray(p.merge_queue)?p.merge_queue:[],jo=new Map,zo=new Map,Ho=new Map;ys.forEach((g,F)=>{g&&typeof g.bead_id=="string"&&(jo.set(g.bead_id,F+1),zo.set(g.bead_id,g.resolution),Ho.set(g.bead_id,g.continuation_action||null))});let Wo=p.merge_queue_state||{active:null,failures:{}},_c=Wo.failures||{},mc=p.auto_merge_skips||{},Go=g=>{let F=mc[g];if(!F)return null;let ae=Ye[g],Ve=ae&&ae.pr?ae.pr.head_sha:null;return Ve&&Ve===F.head_sha?F.reason||"":null},Sn=new Map;for(let g of xn)g.failed!==!0&&g.conflict_resolution&&(g.paused?Sn.has(g.bead_id)||Sn.set(g.bead_id,"paused"):Sn.set(g.bead_id,"running"));let Yo=xn.filter(g=>!g.paused&&g.failed!==!0).length,Vo=(p.workspace_info||{}).slots,gc=typeof Vo=="number"?Vo:typeof p.slots=="number"?p.slots:wn,Ko=p.pr_wait_holds_slot===!0?wn:gc,hc=Yo>Ko,An=kr(Y),bc=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>An===void 0||typeof g.added_at!="number"||g.added_at>=An).sort((g,F)=>(F.added_at||0)-(g.added_at||0)),Gr=Po(bc,"done"),vc=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Zo=[],yc=u?.()||"";for(let g of ne){let F=Qt(g.closed_at);if(typeof g.id!="string"||vc.has(g.id)||F===null||An!==void 0&&F<An||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ae=`${yc}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ve=te.get(ae);Ve===void 0&&r&&(te.set(ae,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(zt=>{let ar=Array.isArray(zt)&&zt.some(Ct=>ns(typeof Ct?.text=="string"?Ct.text:"")?.lane==="session");te.set(ae,ar?"session":"not-session"),Z()}).catch(()=>{te.set(ae,"failed"),Z()})),Ve==="session"&&Zo.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:F,created_at:g.created_at,updated_at:g.updated_at})}Gr.push(...Zo),Gr.sort((g,F)=>(F.done_at||0)-(g.done_at||0));let Tn={};for(let g of er)Tn[g]=0;let Xo=!1,Qo=0,ws=0,Jo=0;for(let g of Gr){let F=g.usage;if(F&&typeof F=="object"){let ae=!1;for(let Ve of er)Number.isFinite(F[Ve])&&(Tn[Ve]+=F[Ve],Xo=!0,ae=!0);ae&&(ws+=1,Number.isFinite(F.total_cost_usd)&&(Qo+=F.total_cost_usd,Jo+=1))}}ws>0&&Jo===ws&&(Tn.total_cost_usd=Qo);let ea=Gr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),wc=ea.length>0?gt(jn(ea)):Xo?Pt(Tn):null;return{queue:p,idToTitle:X,candidates:cc,candidate_hidden:{blocked:ms.hidden_blocked,spec:ms.hidden_spec},running:xn,live_count:Yo,slots:Ko,over_cap:hc,failure:Uo,waiting:Po(y.filter(g=>!fc.has(g.bead_id)),"queue"),pr_wait:Ze.map(g=>Hf(g.bead_id,X.get(g.bead_id)||g.bead_id,Ye,d[g.bead_id]||null,It(p.attempts||{},g.bead_id),m[g.bead_id]||(j.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Sn.get(g.bead_id)||null,g.external===!0,{position:jo.get(g.bead_id)||0,active:Wo.active===g.bead_id,failure:_c[g.bead_id]||null,resolution:zo.get(g.bead_id),continuation_action:Ho.get(g.bead_id)},g.wt_present!==!1,p.auto_merge===!0?Go(g.bead_id):null,Ro($n,uc(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},bs.get(hs.get(g.bead_id)||"")?.worker_serial===!0)).map(g=>({...g,...Oe(g.id)})),merge_queue_length:ys.length,merge_queue_running:ys.length>0,auto_excluded:Ze.map(g=>g.bead_id).filter(g=>Go(g)!==null),verify_cmd_present:!!(p.workspace_info||{}).verify_cmd,declared_base:$n,done:Gr,token_total:wc,cleanup_failures:k,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function tt(p){let w=p.waiting.length>0?p.waiting[0].id:"\u2014",S=l`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ne=ht(p),_e=p.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ge=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${R()} 완료 <b>${p.done.length}</b></span
      >`,ue=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,je=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${wn}
          step="1"
          .value=${String(p.slots)}
          ?disabled=${p.queue.pr_wait_holds_slot===!0}
          title=${p.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${p.queue.pr_wait_holds_slot===!0}
        />
        머지까지 순차 실행
      </label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,X=ul({failure:p.failure}),b=sl(p.repo_operations,p.cleanup_failures);return A?l`<div class="worker-ribbon">
          ${S} ${ne}
          <div class="worker-kpi worker-kpi--ribbon">${_e}${ge}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${je}</div>
          <div class="worker-kpi">${ue}</div>
        </div>
        ${b}${X}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${S}${ne}${je}</div>
        <div class="worker-kpi">
          ${_e}${ge}${ue}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${R()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(H=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${H.tooltip}
                >${R()} 완료 · 누적 ${H.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${b}${X}`}function _t(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let w=p.running.some(S=>!S.paused&&S.failed!==!0);return l`<section
      class="worker-now${w?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${p.running.length+p.pr_wait.length}</span
        >
      </header>
      ${p.running.length>0?wo(p.running,Date.now(),me):""}
      ${p.pr_wait.map(S=>bo(S))}
    </section>`}function $t(p){let w=p.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${U.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Af.map(S=>l`<button
              type="button"
              class="worker-filter__chip${U.spec===S.value?" is-active":""}"
              data-spec=${S.value}
              aria-pressed=${U.spec===S.value?"true":"false"}
            >
              ${S.label}
            </button>`)}
        ${w.spec>0?l`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function st(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${x}
    >
      ${Tf.map(p=>l`<option value=${p.value} ?selected=${x===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function it(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${Y}
      >
        ${Ht.map(p=>l`<option value=${p.value} ?selected=${Y===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function nt(){if(se.size===0)return"";let p=Array.from(se),w=p.some(S=>{let ne=he.get(S);return ne!==!0&&ne!==!1});return l`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${Ee}
        ?disabled=${ie}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${w||ie}
        title=${w?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":ie?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function lt(p){let w=(p.queue.pr_wait||[]).filter(ge=>ge&&ge.external!==!0&&typeof ge.bead_id=="string"),S=new Set(p.running.filter(ge=>!ge.paused&&ge.failed!==!0).map(ge=>ge.bead_id));for(let ge of w)S.add(ge.bead_id);let ne=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||w.length===0||p.waiting.length===0||S.size<p.slots),_e=p.pr_wait.some(ge=>ge.worker_serial===!0);if(!(!ne&&!(_e&&p.queue.auto_merge!==!0)))return l`${ne?l`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${_e&&p.queue.auto_merge!==!0?l`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function ht(p){let w=p.queue.auto_merge===!0;if(p.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(w)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let S=new Set(p.auto_excluded),ne=p.pr_wait.filter(_e=>_e.merge_action&&_e.merge_enabled&&!S.has(_e.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title=${p.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 verify \uC120\uC5B8\uC774 \uC5C6\uC5B4 \uCD94\uAC00 \uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${ne>0?` ${ne}`:""}
    </button>`}function B(p){let w=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:st(),controls:$t(p)});return A?l`<div class="worker-lanes worker-lanes--mobile">
        ${_t(p)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:l`${nt()}${lt(p)}`,collapsible:!0,collapsed:I.queue,preview:Wl(p.waiting)})}
        ${w}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:it(),collapsible:!0,collapsed:I.done,preview:Array.isArray(p.token_total)?p.token_total.map(S=>S.label).join(" \xB7 "):p.token_total||Wl(p.done)})}
      </div>`:l`<div class="worker-lanes">
      ${w}
      ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:l`${nt()}${lt(p)}`})}
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(S=>!S.paused&&S.failed!==!0),body:wo(p.running,Date.now(),me)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${R()} ${p.done.length}`,items:p.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:it()})}
    </div>`}function V(p){I={...I,[p]:!I[p]},Df(I),Z()}function Z(){let p=at();Ue(tt(p),Je),Ue(B(p),be)}function pe(){let p=document.querySelector(".app-header");if(!p)return;let w=()=>{let S=Math.round(p.getBoundingClientRect().height);Qe.style.setProperty("--worker-ribbon-top",`${S}px`)};if(w(),typeof ResizeObserver=="function"){let S=new ResizeObserver(w);S.observe(p),ke.push(()=>S.disconnect())}else window.addEventListener("resize",w),ke.push(()=>window.removeEventListener("resize",w))}function ye(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Lf);A=!!p.matches;let w=S=>{let ne=!!(S&&typeof S.matches=="boolean"?S.matches:p.matches);ne!==A&&(A=ne,Z())};typeof p.addEventListener=="function"?(p.addEventListener("change",w),ke.push(()=>p.removeEventListener("change",w))):typeof p.addListener=="function"&&(p.addListener(w),ke.push(()=>p.removeListener(w)))}function Ce(p){let w=p.target,S=w?.closest?.(".worker-mini__grip"),ne=S?S.closest('.worker-mini[data-lane="queue"]'):w?.closest?.('.worker-card[draggable="true"]');if(!ne)return;let _e=ne.dataset.beadId||"",ge=ne.dataset.lane||"";$={bead_id:_e,from_lane:ge};try{p.dataTransfer?.setData("text/plain",_e),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function We(p){let w=p.target?.closest?.(".worker-pane");if(!w)return;let S=w.dataset.lane||"";S!=="candidate"&&S!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function rt(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ae(p,w){let S=E.find(ue=>ue.id===p);if(!S)return;let ne=E.filter(ue=>ue.id!==p),_e=ne.length;if(w){let ue=w.dataset.beadId;if(ue===p)return;let je=ne.findIndex(X=>X.id===ue);je>=0&&(_e=je)}let ge=ne.slice();ge.splice(_e,0,S),T.applyReorder(p,ge,_e)}function Ge(p){let w=p.target?.closest?.(".worker-pane");if(!w)return;p.preventDefault(),w.classList.remove("worker-pane--drag-over");let S=w.dataset.lane||"",ne=$?.bead_id||p.dataTransfer?.getData("text/plain")||"",_e=$?.from_lane||"";if($=null,!ne)return;let ge=p.target?.closest?.(".worker-mini, .worker-card"),ue=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),je=ue.length;if(ge){let X=ue.indexOf(ge);X>=0&&(je=X)}if(w.classList.contains("worker-pane--collapsed")&&(je=q()),S==="candidate"){if(_e==="candidate"){Ae(ne,ge);return}_e==="queue"&&Re(ne);return}S==="queue"&&(_e==="queue"?qe(ne,je):de(ne,je))}function we(p){U=p,xf(p),Z()}function ut(p){x=p==="board"||p==="created"||p==="spec"?p:fs,Cf(x),Z()}function bt(p){Y=Rt(p)?p:At,If(Y),_?.(Y),Z()}function Vt(p){let w=p.target?.closest?.(".worker-mini__select");if(w){let b=w.dataset.beadId||"";b&&(w.checked?se.add(b):se.delete(b),Z());return}let S=p.target?.closest?.(".worker-bulk__mode");if(S){Ee=S.value==="serial"?"serial":"ordinary";return}let ne=p.target?.closest?.(".worker-filter__blocked");if(ne){we({...U,show_blocked:ne.checked});return}let _e=p.target?.closest?.(".worker-done-range");if(_e){bt(_e.value);return}let ge=p.target?.closest?.(".worker-sort");if(ge){ut(ge.value||fs);return}let ue=p.target?.closest?.(".worker-pr-wait-hold");if(ue){dt(ue.checked);return}let je=p.target?.closest?.(".worker-slots__input");if(!je)return;let X=Number.parseInt(je.value,10);if(!Number.isFinite(X)){Z();return}Te(X).then(Z)}function Bt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function Ut(){let p=at();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function mt(){me&&G.close(),fe.hidden=!1,Le.hidden=!1,K.open(Ut()),Z()}function xt(p){let w=ce(),S=w.attempts?w.attempts[p]:null;me=p,K.close(),fe.hidden=!0,Le.hidden=!1,G.open({attempt_id:p,meta:Bt(S)}),Z()}function jt(){if(K.isOpen()&&K.refresh(Ut()),!me)return;let p=ce(),w=p.attempts?p.attempts[me]:null;if(w){G.updateMeta(Bt(w));return}G.close()}function Ot(p){let w=p.target,S=w?.closest?.(".worker-bulk__apply");if(S){S.disabled||ve();return}if(w?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-exec-defaults-dialog"))return;if(w?.closest?.(".worker-exec-defaults-btn")){Ie.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){mt();return}let ne=w?.closest?.(".worker-repo-op__session");if(ne){let Q=ne.dataset.attemptId;Q&&xt(Q);return}let _e=w?.closest?.(".worker-repo-op__resolve");if(_e){Me(_e.dataset.operationId||"");return}let ge=w?.closest?.(".worker-repo-op__dismiss");if(ge){Se(ge.dataset.operationId||"");return}let ue=w?.closest?.(".worker-cleanup__resume");if(ue){let Q=ue.dataset.beadId;Q&&L(Q);return}let je=w?.closest?.(".worker-banner__resume");if(je){let Q=je.dataset.attemptId;Q&&Ke(Q);return}let X=w?.closest?.(".worker-banner__discard");if(X){let Q=X.dataset.confirmation==="merged"?"merged":"unmerged";M(X.dataset.beadId||"",X.dataset.attemptId||null,Q,X.dataset.operationId||null);return}let b=w?.closest?.(".worker-banner__dismiss");if(b){let Q=b.dataset.attemptId;Q&&Be(Q);return}if(w?.closest?.(".worker-play")){J(!ce().auto_advance);return}let H=w?.closest?.(".worker-merge-all");if(H){H.classList.contains("worker-merge-all--stop")?ce().auto_merge===!0?N(!1):P():N(!0);return}let oe=w?.closest?.(".worker-pane__hd--toggle");if(oe){let Q=oe.dataset.lane;(Q==="queue"||Q==="done")&&V(Q);return}let Oe=w?.closest?.(".worker-card__place");if(Oe){let Q=Oe.dataset.beadId;Q&&!Oe.disabled&&de(Q,q());return}let Ze=w?.closest?.(".worker-filter__chip");if(Ze){let Q=Ze.dataset.spec;(Q==="all"||Q==="with"||Q==="without")&&we({...U,spec:Q});return}let Ye=w?.closest?.(".worker-mini__merge");if(Ye){L(Ye.dataset.beadId||"");return}let m=w?.closest?.(".worker-mini__merge-cancel");if(m){v(m.dataset.beadId||"");return}let d=w?.closest?.(".worker-mini__discard");if(d){M(d.dataset.beadId||"",d.dataset.attemptId||null,d.dataset.discardMode==="merged"?"merged":"unmerged",d.dataset.operationId||null);return}let k=w?.closest?.(".worker-mini__revise-fix");if(k){W("worker-revise-fix",k.dataset.beadId||"");return}let y=w?.closest?.(".worker-mini__revise-approve");if(y){W("worker-revise-approve",y.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let Q=w?.closest?.(".rtile"),Ne=Q?.dataset?.beadId,Pe=Q?.dataset?.attemptId;Ne&&M(Ne,Pe||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let Ne=w?.closest?.(".rtile")?.dataset?.attemptId;Ne&&Be(Ne);return}if(w?.closest?.(".rtile__pause")){let Ne=w?.closest?.(".rtile")?.dataset?.attemptId;Ne&&xe(Ne);return}if(w?.closest?.(".rtile__resume")){let Ne=w?.closest?.(".rtile")?.dataset?.attemptId;Ne&&Ke(Ne);return}if(w?.closest?.(".rtile__session")){let Ne=w?.closest?.(".rtile")?.dataset?.attemptId;Ne&&xt(Ne);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){K.close(),G.close();return}if(w?.closest?.(".worker-drawer-host"))return;let O=w?.closest?.(".rtile");if(O){if(w?.closest?.(".rtile__id")){let Ne=O.dataset.beadId;Ne&&Sr(Ne).then(Pe=>{Pe?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Q=O.dataset.beadId;Q&&c&&c(Q);return}let re=w?.closest?.(".worker-mini, .worker-card");if(re){let Q=re.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){Q&&Sr(Q).then(Ne=>{Ne?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Q&&c&&c(Q)}}return e.addEventListener("dragstart",Ce),e.addEventListener("dragover",We),e.addEventListener("dragleave",rt),e.addEventListener("drop",Ge),e.addEventListener("click",Ot),e.addEventListener("change",Vt),ye(),pe(),h&&ke.push(h.subscribe(()=>{for(let[p,w]of te)w==="failed"&&te.delete(p);Z()})),s&&ke.push(s.subscribe(()=>{Z(),jt()})),Z(),{load(){Z()},openExecDefaults(){Ie.open()},destroy(){for(let p of ke.splice(0))try{p()}catch{}e.removeEventListener("dragstart",Ce),e.removeEventListener("dragover",We),e.removeEventListener("dragleave",rt),e.removeEventListener("drop",Ge),e.removeEventListener("click",Ot),e.removeEventListener("change",Vt);try{G.destroy()}catch{}Le.hidden=!0;try{Ie.destroy()}catch{}Ue(l``,e)}}}function Lo(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Xl(e,t,r,n=async()=>{},s=async()=>{}){let o=ot("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function f(A){let D=A.target.value,Ee=t.getState().workspace?.current?.path||"";if(D&&D!==Ee){o("switching workspace to %s",D),i=!0,I();try{await r(D)}catch(ie){o("workspace switch failed: %o",ie)}finally{i=!1,I()}}}async function _(){let A=t.getState(),j=A.workspace?.current?.path||A.workspace?.available?.[0]?.path||"";if(!(!j||c)){o("git-pulling workspace %s",j),c=!0,I();try{await n(j)}catch(D){o("workspace git pull failed: %o",D)}finally{c=!1,I()}}}function h(A){let j=A.target;j&&e.contains(j)||E()}function T(A){A.key==="Escape"&&E()}function $(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",T),I())}function E(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",T),I())}function U(){u?E():$()}async function x(A){let j=A.target,D=j.value,se=j.checked;o("toggling visibility %s \u2192 %s",D,String(se));try{await s(D,se)}catch(Ee){o("workspace visibility toggle failed: %o",Ee)}}function Y(A){return A?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function te(A,j){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${U}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${A.map(D=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${D.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${D.path}"
                        .checked=${!j.has(D.path)}
                        @change=${x}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Lo(D.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function R(){let A=t.getState(),j=A.workspace?.current,D=A.workspace?.available||[],se=new Set(A.workspace?.hidden||[]),Ee=j?.path||D[0]?.path||"";if(D.length===0)return l``;let ie=D.filter(he=>!se.has(he.path)||he.path===Ee);if(ie.length<=1){let he=ie[0]||D[0],ke=Lo(he.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${he.path}"
            >${ke}</span
          >
          ${te(D,se)}
          ${Y(Ee)}
          ${c?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${i||c}
          aria-label="Select project workspace"
        >
          ${ie.map(he=>l`
              <option
                value="${he.path}"
                ?selected=${he.path===Ee}
                title="${he.path}"
              >
                ${Lo(he.path)}
              </option>
            `)}
        </select>
        ${te(D,se)}
        ${Y(Ee)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){Ue(R(),e)}return I(),a=t.subscribe(()=>I()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",T),Ue(l``,e)}}}var Ql=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Oo(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Jl(e,t,r=Oo()){return{id:r,type:e,payload:t}}function ec(e={}){let t=ot("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,f=[],_=new Map,h=new Set;function T(R){for(let I of Array.from(h))try{I(R)}catch{}}function $(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),T(o);let R=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),I=(r.jitterRatio||0)*R,A=Math.max(0,Math.round(R+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",A,a+1),i=setTimeout(()=>{i=null,te()},A)}function E(R){try{s?.send(JSON.stringify(R))}catch(I){t("ws send failed",I)}}function U(){for(o="open",t("ws open"),T(o),a=0;f.length;){let R=f.shift();R&&E(R)}}function x(R){let I;try{I=JSON.parse(String(R.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(u.has(I.id)){let j=u.get(I.id);u.delete(I.id),I.ok?j?.resolve(I.payload):j?.reject(I.error||new Error("ws error"));return}let A=_.get(I.type);if(A&&A.size>0)for(let j of Array.from(A))try{j(I.payload)}catch(D){t("ws event handler error",D)}else t("ws received unhandled message type: %s",I.type)}function Y(){o="closed",t("ws closed"),T(o);for(let[R,I]of u.entries())I.reject(new Error("ws disconnected")),u.delete(R);a+=1,$()}function te(){if(!c)return;let R=n();try{s=new WebSocket(R),t("ws connecting %s",R),o="connecting",T(o),s.addEventListener("open",U),s.addEventListener("message",x),s.addEventListener("error",()=>{}),s.addEventListener("close",Y)}catch(I){t("ws connect failed %o",I),$()}}return te(),{send(R,I){if(!Ql.includes(R))return Promise.reject(new Error(`unknown message type: ${R}`));let A=Oo(),j=Jl(R,I,A);return t("send %s id=%s",R,A),new Promise((D,se)=>{u.set(A,{resolve:D,reject:se,type:R}),s&&s.readyState===s.OPEN?E(j):(t("queue %s id=%s (state=%s)",R,A,o),f.push(j))})},on(R,I){_.has(R)||_.set(R,new Set);let A=_.get(R);return A?.add(I),()=>{A?.delete(I)}},onConnection(R){return h.add(R),()=>{h.delete(R)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,te()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Wf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Gf(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Do=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],tc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",Yf="bdui.worker.done-range",rc=El,nc="worker:queue",sc="ui:order",oc="ui:display-policy",ac="exec:presets",hr="tab:board:closed",ic="beads-ui.board.closed-range";function Vf(e){let t=ot("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ue(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Nl(s),o&&a&&i&&c){let $e=function(m,d){let k="Request failed",y="";if(m&&typeof m=="object"){let re=m;if(typeof re.message=="string"&&re.message.length>0&&(k=re.message),typeof re.details=="string")y=re.details;else if(re.details&&typeof re.details=="object")try{y=JSON.stringify(re.details,null,2)}catch{y=""}}else typeof m=="string"&&m.length>0&&(k=m);let O=d&&d.length>0?`Failed to load ${d}`:"Request failed";De.open(O,k,y)},L=function(m){return`${S.getState().workspace.current?.path||""}\0${m}`},z=function(){de&&(de().catch(()=>{}),de=null),qe=null,Re=null},v=function(m){ve=m;let d=()=>{ve!==m||S.getState().selected_id!==m||(ve=null,N(m))};if(!Be){Ke.then(d);return}d()},J=function(m,d,k,y,O){return k!==W[d]?(O().catch(()=>{}),!1):(m.set(y,O),!0)},Me=function(){let m=S.getState();tt(m.view==="board"),lt(m.view==="worker"),pe(m.view==="monitor"),B(m.view==="board"||m.view==="worker"||!!m.selected_id)},dt=function(){let m=kr(Se);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},at=function(){let m=kr(Te);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},tt=function(m){if(m)for(let[d,k]of Do){if(P.has(d)||M.has(d))continue;let y=d===hr?dt():{type:k};try{G.register(d,y)}catch(Q){t("register %s store failed: %o",d,Q)}M.add(d);let O=W.board,re=!1;me.subscribeList(d,y).then(Q=>{re=!J(P,"board",O,d,Q)}).catch(Q=>{t("subscribe %s failed: %o",d,Q),$e(Q,"board")}).finally(()=>{M.delete(d),re&&Me()})}else st()},st=function(){W.board+=1;for(let[m]of Do){let d=P.get(m);d&&(d().catch(()=>{}),P.delete(m));try{G.unregister(m)}catch(k){t("unregister %s failed: %o",m,k)}}},lt=function(m){if(!m){ht();return}for(let[d,k]of tc){if(it.has(d)||M.has(d))continue;let y=d===gr?at():{type:k};try{G.register(d,y)}catch(Q){t("register %s store failed: %o",d,Q)}M.add(d);let O=W.worker,re=!1;me.subscribeList(d,y).then(Q=>{re=!J(it,"worker",O,d,Q)}).catch(Q=>{t("subscribe %s failed: %o",d,Q),$e(Q,"worker")}).finally(()=>{M.delete(d),re&&Me()})}},ht=function(){W.worker+=1;for(let[m]of tc){let d=it.get(m);d&&(d().catch(()=>{}),it.delete(m));try{G.unregister(m)}catch(k){t("unregister %s failed: %o",m,k)}}},B=function(m){if(!m){V();return}nt||(be("subscribe-worker-queue",{id:nc}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),nt=()=>be("unsubscribe-worker-queue",{id:nc}))},V=function(){nt&&(nt().catch(()=>{}),nt=null)},pe=function(m){if(!m){ye();return}Z||(be("subscribe-monitor-pipeline",{id:rc}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),Z=()=>be("unsubscribe-monitor-pipeline",{id:rc}))},ye=function(){Z&&(Z().catch(()=>{}),Z=null)},We=function(){Ce||(be("subscribe-ui-order",{id:sc}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),Ce=()=>be("unsubscribe-ui-order",{id:sc}))},rt=function(){Ce&&(Ce().catch(()=>{}),Ce=null),ce.clear()},Ge=function(){Ae||(be("subscribe-display-policy",{id:oc}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),Ae=()=>be("unsubscribe-display-policy",{id:oc}))},we=function(){Ae&&(Ae().catch(()=>{}),Ae=null),le.clear()},bt=function(){ut||(be("subscribe-exec-presets",{id:ac}).catch(m=>{t("subscribe-exec-presets failed: %o",m)}),ut=()=>be("unsubscribe-exec-presets",{id:ac}))},jt=function(m){if(!m)return"Unknown";let d=m.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=$e,f=L,_=z,h=v,T=J,$=Me,E=dt,U=at,x=tt,Y=st,te=lt,R=ht,I=B,A=V,j=pe,D=ye,se=We,Ee=rt,ie=Ge,he=we,ke=bt,Qe=jt;let Je=document.getElementById("header-loading"),Le=Pa(Je),De=nl(e),fe=ec(),be=Le.wrapSend((m,d)=>fe.send(m,d)),me=Ca(be),G=Ra(),K=La(),Ie=_a(),ce=Ia(),le=pa(),C=fa(),q=ma();fe.on("exec-presets-snapshot",m=>{let d=m;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&C.set({revision:d.revision,presets:d.presets})}),fe.on("monitor-pipeline-snapshot",m=>{let d=m;if(!(!d||!Array.isArray(d.workspaces)))try{Ie.set(d.workspaces,d.workspaces_state)}catch{}}),fe.on("ui-order-snapshot",m=>{let d=m;if(d&&typeof d.revision=="number")try{ce.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),fe.on("display-policy-snapshot",m=>{let d=m;if(d&&d.policy&&typeof d.policy=="object")try{le.set(d.policy)}catch{}}),fe.on("session-log-snapshot",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{q.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),fe.on("session-log-append",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{q.append(d.attempt_id,d.event)}catch{}}),fe.on("snapshot",m=>{let d=m,k=d&&typeof d.id=="string"?d.id:"",y=k?G.getStore(k):null;if(y&&d&&d.type==="snapshot")try{y.applyPush(d)}catch{}}),fe.on("upsert",m=>{let d=m,k=d&&typeof d.id=="string"?d.id:"",y=k?G.getStore(k):null;if(y&&d&&d.type==="upsert")try{y.applyPush(d)}catch{}}),fe.on("delete",m=>{let d=m,k=d&&typeof d.id=="string"?d.id:"",y=k?G.getStore(k):null;if(y&&d&&d.type==="delete")try{y.applyPush(d)}catch{}});let de=null,qe=null,Re=null,ve=null,xe=()=>{},Ke=new Promise(m=>{xe=()=>m(void 0)}),Be=!1,He=!1;async function N(m){let d=L(m);if(d===qe||d===Re)return;Re=d;let k=`detail:${m}`,y={type:"issue-detail",params:{id:m}};try{G.register(k,y)}catch(O){t("register detail store failed: %o",O)}try{let O=await me.subscribeList(k,y);if(S.getState().selected_id!==m||L(m)!==d){await O().catch(()=>{});return}de&&await de().catch(()=>{}),de=O,qe=d}catch(O){t("detail subscribe failed: %o",O),$e(O,"issue details")}finally{Re===d&&(Re=null)}}let P=new Map,M=new Set,W={board:0,worker:0},Se=At;try{let m=window.localStorage.getItem(ic);Rt(m)&&(Se=m)}catch{}let Te=At;try{let m=window.localStorage.getItem(Yf);Rt(m)&&(Te=m)}catch{}async function _t(m){if(!Rt(m)||m===Se)return;Se=m;try{window.localStorage.setItem(ic,m)}catch{}let d=P.get(hr);if(!d)return;P.delete(hr),await d().catch(()=>{});let k=dt();try{G.register(hr,k)}catch(y){t("register %s store failed: %o",hr,y)}try{let y=await me.subscribeList(hr,k);P.set(hr,y)}catch(y){t("re-subscribe %s failed: %o",hr,y),$e(y,"board")}}async function $t(m){if(!Rt(m)||m===Te)return;Te=m;let d=it.get(gr);if(!d)return;it.delete(gr),await d().catch(()=>{});let k=at();try{G.register(gr,k)}catch(y){t("register %s store failed: %o",gr,y)}try{let y=await me.subscribeList(gr,k);it.set(gr,y)}catch(y){t("re-subscribe %s failed: %o",gr,y),$e(y,"worker")}}let it=new Map,nt=null,Z=null,Ce=null,Ae=null,ut=null;async function Vt(){Ae=null,le.clear(),ut=null,C.clear(),nt=null,Z=null,P.clear(),it.clear(),W.board+=1,W.worker+=1,bt();let m=S.getState().workspace.current?.path;if(m)try{await fe.send("set-workspace",{path:m})}catch(k){t("workspace restore after reconnect failed: %o",k);return}Ge();let d=S.getState();tt(d.view==="board"),lt(d.view==="worker"),pe(d.view==="monitor"),B(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function Bt(){t("clearing all subscriptions for workspace switch"),st(),ht(),V(),K.clear(),rt(),We(),we(),Ge(),z();let m=S.getState();if(m.selected_id)try{G.unregister(`detail:${m.selected_id}`)}catch{}let d=S.getState();tt(d.view==="board"),lt(d.view==="worker"),pe(d.view==="monitor"),B(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&v(d.selected_id)}async function Ut(m){t("requesting workspace switch to %s",m),He=!0;try{let d=await fe.send("set-workspace",{path:m});t("workspace switch result: %o",d),d&&d.workspace&&(S.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),d.changed&&(await Bt(),ee("Switched to "+jt(m),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),ee("Failed to switch workspace","error",3e3),d}finally{He=!1}}async function mt(m){t("requesting workspace git pull for %s",m);try{let d=await fe.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let k=d?.status;if(k==="up_to_date"){ee("Already up to date","success",2e3);return}if(k==="stash_pop_conflict"){ee("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ee("Git pulled "+jt(m),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let k=d?.code,y=d?.message;if(k==="rebase_conflict"){ee("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(k==="rebase_conflict_abort_failed"){ee("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(k==="busy"){ee("Git pull skipped: another operation is running","warning",3e3);return}let O=y?`: ${y}`:"";throw ee(`Git pull failed${O}`,"error",3e3),d}}async function xt(m,d){t("setting workspace visibility %s \u2192 %s",m,String(d));try{await fe.send("set-workspace-visibility",{path:m,visible:d}),await Ot()}catch(k){t("workspace visibility update failed: %o",k),ee("Failed to update project visibility","error",3e3)}}async function Ot(){try{let m=await fe.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let d=m.workspaces.map(re=>({path:re.path,database:re.database,pid:re.pid,version:re.version})),k=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,y=Array.isArray(m.hidden)?m.hidden.filter(re=>typeof re=="string"):[];S.setState({workspace:{current:k,available:d,hidden:y}});let O=window.localStorage.getItem("beads-ui.workspace");O&&(!d.some(Q=>Q.path===O)||y.includes(O)?window.localStorage.removeItem("beads-ui.workspace"):k&&O!==k.path&&(t("restoring saved workspace preference: %s",O),await Ut(O)))}}catch(m){t("failed to load workspaces: %o",m)}}fe.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(S.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),Ot(),Bt())});let p=!1;if(typeof fe.onConnection=="function"){let m=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(p=!0,ee("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&p&&(p=!1,ee("Reconnected","success",2200),Gf(S,(k,y)=>{t(`${k}: %o`,y)}),Vt())};fe.onConnection(m)}let w="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(w=m)}catch(m){t("view parse error: %o",m)}let S=Ma({config:Wf(),view:w});fe.on("worker-queue-snapshot",m=>{let d=m;if(!d||!d.queue)return;let k=S.getState().workspace.current?.path;if(typeof k=="string"&&k.length>0&&d.root_dir!==k){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{K.set(d.queue)}catch{}});let ne=Oa(S);ne.start();let _e=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),ge=async(m,d)=>{try{return await be(m,d)}catch(k){if(_e.has(m))throw k;return[]}};n&&Rl(n,S,ne);let ue=document.getElementById("workspace-picker");ue&&Xl(ue,S,Ut,mt,xt);let je=Dl(e,(m,d)=>be(m,d));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>je.open())}catch{}let X=rl(e,{policyStore:le,transport:(m,d)=>be(m,d),labelOptions:()=>{let m=new Set;for(let[d]of Do)for(let k of G.snapshotFor(d)||[]){let y=k.labels;if(Array.isArray(y))for(let O of y)typeof O=="string"&&O.length>0&&m.add(O)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>X.open())}catch{}let b=Wa(o,{gotoIssue:m=>ne.gotoIssue(m),issueStores:G,transport:ge,workerQueueStore:K,uiOrderStore:ce,displayPolicyStore:le,closedRange:Se,onClosedRangeChange:m=>{_t(m)},onNewIssue:()=>je.open()}),H=Io(a,{transport:ge,issueStores:G,queueStore:K,execPresetStore:C,sessionLogStore:q,uiOrderStore:ce,gotoIssue:m=>S.setState({selected_id:m}),getWorkspacePath:()=>S.getState().workspace.current?.path,doneRange:Te,onDoneRangeChange:m=>{$t(m)}}),oe=Cl(i,{transport:ge,pipelineStore:Ie,execPresetStore:C,gotoIssue:m=>ne.gotoIssue(m),getWorkspacePath:()=>S.getState().workspace.current?.path,switchWorkspace:m=>Ut(m)}),Oe=el(c,{issueStores:G,transport:ge,queueStore:K,execPresetStore:C,sessionLogStore:q,getWorkspacePath:()=>S.getState().workspace.current?.path,onNavigate:m=>{S.getState().view==="worker"?S.setState({selected_id:m}):ne.gotoIssue(m)},onClose:()=>{let m=S.getState();S.setState({selected_id:null});try{ne.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}},onOpenExecPresets:()=>{S.setState({selected_id:null}),ne.gotoView("worker"),H.openExecDefaults()}}),Ze=S.getState().selected_id;Ze&&(c.hidden=!1,Oe.load(Ze),v(Ze)),S.subscribe(m=>{let d=m.selected_id;d?(c.hidden=!1,Oe.load(d),He||v(d)):(Oe.clear(),c.hidden=!0,z())});let Ye=m=>{o.hidden=m.view!=="board",a.hidden=m.view!=="worker",i.hidden=m.view!=="monitor",tt(m.view==="board"),lt(m.view==="worker"),pe(m.view==="monitor"),B(m.view==="board"||m.view==="worker"||!!m.selected_id),!m.selected_id&&m.view==="board"&&b.load(),m.view==="worker"&&H.load(),m.view==="monitor"?oe.load():oe.pause(),window.localStorage.setItem("beads-ui.view",m.view)};S.subscribe(Ye),Ye(S.getState()),We(),Ge(),bt(),Ot().finally(()=>{Be=!0,xe()}),window.addEventListener("keydown",m=>{let d=m.ctrlKey||m.metaKey,k=String(m.key||"").toLowerCase(),y=m.target,O=y&&y.tagName?String(y.tagName).toLowerCase():"",re=O==="input"||O==="textarea"||O==="select"||y&&typeof y.isContentEditable=="boolean"&&y.isContentEditable;d&&k==="n"&&(re||(m.preventDefault(),je.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Vf(t)});export{Vf as bootstrap,Wf as readBootstrapConfig,Gf as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
